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
  sdkId: "AppStream",
  target: "PhotonAdminProxyService",
  version: "2016-12-01",
  sigv4: "appstream",
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
                `https://appstream2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://appstream2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://appstream2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if ("aws" === _.getAttr(PartitionResult, "name")) {
            return e(`https://appstream2.${Region}.amazonaws.com`);
          }
          if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
            return e(`https://appstream2.${Region}.amazonaws.com`);
          }
          return e(
            `https://appstream2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DryRunOperationException
  extends /*@__PURE__*/ TE.TaggedError("DryRunOperationException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class EntitlementAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "EntitlementAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class EntitlementNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "EntitlementNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IncompatibleImageException
  extends /*@__PURE__*/ TE.TaggedError(
    "IncompatibleImageException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidAccountStatusException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidAccountStatusException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterCombinationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRoleException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRoleException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotPermittedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class RequestLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["BadRequestError", "AlreadyExistsError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotAvailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotAvailableException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export type Name = string;
export interface AssociateAppBlockBuilderAppBlockRequest {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
}
export interface AppBlockBuilderAppBlockAssociation {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
}
export interface AssociateAppBlockBuilderAppBlockResult {
  AppBlockBuilderAppBlockAssociation?: AppBlockBuilderAppBlockAssociation & {
    AppBlockArn: Arn;
    AppBlockBuilderName: Name;
  };
}
export interface AssociateApplicationFleetRequest {
  FleetName?: string;
  ApplicationArn?: string;
}
export interface ApplicationFleetAssociation {
  FleetName?: string;
  ApplicationArn?: string;
}
export interface AssociateApplicationFleetResult {
  ApplicationFleetAssociation?: ApplicationFleetAssociation & {
    FleetName: string;
    ApplicationArn: Arn;
  };
}
export interface AssociateApplicationToEntitlementRequest {
  StackName?: string;
  EntitlementName?: string;
  ApplicationIdentifier?: string;
}
export interface AssociateApplicationToEntitlementResult {}
export interface AssociateFleetRequest {
  FleetName?: string;
  StackName?: string;
}
export interface AssociateFleetResult {}
export type StringList = string[];
export interface AssociateSoftwareToImageBuilderRequest {
  ImageBuilderName?: string;
  SoftwareNames?: string[];
}
export interface AssociateSoftwareToImageBuilderResult {}
export type Username = string | redacted.Redacted<string>;
export type AuthenticationType =
  | "API"
  | "SAML"
  | "USERPOOL"
  | "AWS_AD"
  | (string & {});
export interface UserStackAssociation {
  StackName?: string;
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
  SendEmailNotification?: boolean;
}
export type UserStackAssociationList = UserStackAssociation[];
export interface BatchAssociateUserStackRequest {
  UserStackAssociations?: UserStackAssociation[];
}
export type UserStackAssociationErrorCode =
  | "STACK_NOT_FOUND"
  | "USER_NAME_NOT_FOUND"
  | "DIRECTORY_NOT_FOUND"
  | "INTERNAL_ERROR"
  | (string & {});
export interface UserStackAssociationError {
  UserStackAssociation?: UserStackAssociation;
  ErrorCode?: UserStackAssociationErrorCode;
  ErrorMessage?: string;
}
export type UserStackAssociationErrorList = UserStackAssociationError[];
export interface BatchAssociateUserStackResult {
  errors?: (UserStackAssociationError & {
    UserStackAssociation: UserStackAssociation & {
      StackName: string;
      UserName: Username;
      AuthenticationType: AuthenticationType;
    };
  })[];
}
export interface BatchDisassociateUserStackRequest {
  UserStackAssociations?: UserStackAssociation[];
}
export interface BatchDisassociateUserStackResult {
  errors?: (UserStackAssociationError & {
    UserStackAssociation: UserStackAssociation & {
      StackName: string;
      UserName: Username;
      AuthenticationType: AuthenticationType;
    };
  })[];
}
export type RegionName = string;
export type Description = string;
export interface CopyImageRequest {
  SourceImageName?: string;
  DestinationImageName?: string;
  DestinationRegion?: string;
  DestinationImageDescription?: string;
}
export interface CopyImageResponse {
  DestinationImageName?: string;
}
export type DisplayName = string;
export type S3Bucket = string;
export type S3Key = string;
export interface S3Location {
  S3Bucket?: string;
  S3Key?: string;
}
export interface ScriptDetails {
  ScriptS3Location?: S3Location;
  ExecutablePath?: string;
  ExecutableParameters?: string;
  TimeoutInSeconds?: number;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type PackagingType = "CUSTOM" | "APPSTREAM2" | (string & {});
export interface CreateAppBlockRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  SourceS3Location?: S3Location;
  SetupScriptDetails?: ScriptDetails;
  Tags?: { [key: string]: string | undefined };
  PostSetupScriptDetails?: ScriptDetails;
  PackagingType?: PackagingType;
}
export type AppBlockState = "INACTIVE" | "ACTIVE" | (string & {});
export interface ErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type ErrorDetailsList = ErrorDetails[];
export interface AppBlock {
  Name?: string;
  Arn?: string;
  Description?: string;
  DisplayName?: string;
  SourceS3Location?: S3Location;
  SetupScriptDetails?: ScriptDetails;
  CreatedTime?: Date;
  PostSetupScriptDetails?: ScriptDetails;
  PackagingType?: PackagingType;
  State?: AppBlockState;
  AppBlockErrors?: ErrorDetails[];
}
export interface CreateAppBlockResult {
  AppBlock?: AppBlock & {
    Name: string;
    Arn: Arn;
    SourceS3Location: S3Location & { S3Bucket: S3Bucket };
    SetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
    PostSetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
  };
}
export type AppBlockBuilderPlatformType = "WINDOWS_SERVER_2019" | (string & {});
export type SubnetIdList = string[];
export type SecurityGroupIdList = string[];
export interface VpcConfig {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export type AccessEndpointType = "STREAMING" | (string & {});
export interface AccessEndpoint {
  EndpointType?: AccessEndpointType;
  VpceId?: string;
}
export type AccessEndpointList = AccessEndpoint[];
export interface CreateAppBlockBuilderRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  Tags?: { [key: string]: string | undefined };
  Platform?: AppBlockBuilderPlatformType;
  InstanceType?: string;
  VpcConfig?: VpcConfig;
  EnableDefaultInternetAccess?: boolean;
  IamRoleArn?: string;
  AccessEndpoints?: AccessEndpoint[];
  DisableIMDSV1?: boolean;
}
export type AppBlockBuilderState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export type FleetErrorCode =
  | "IAM_SERVICE_ROLE_MISSING_ENI_DESCRIBE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_CREATE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_DELETE_ACTION"
  | "NETWORK_INTERFACE_LIMIT_EXCEEDED"
  | "INTERNAL_SERVICE_ERROR"
  | "IAM_SERVICE_ROLE_IS_MISSING"
  | "MACHINE_ROLE_IS_MISSING"
  | "STS_DISABLED_IN_REGION"
  | "SUBNET_HAS_INSUFFICIENT_IP_ADDRESSES"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SUBNET_ACTION"
  | "SUBNET_NOT_FOUND"
  | "IMAGE_NOT_FOUND"
  | "INVALID_SUBNET_CONFIGURATION"
  | "SECURITY_GROUPS_NOT_FOUND"
  | "IGW_NOT_ATTACHED"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SECURITY_GROUPS_ACTION"
  | "FLEET_STOPPED"
  | "FLEET_INSTANCE_PROVISIONING_FAILURE"
  | "DOMAIN_JOIN_ERROR_FILE_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_ACCESS_DENIED"
  | "DOMAIN_JOIN_ERROR_LOGON_FAILURE"
  | "DOMAIN_JOIN_ERROR_INVALID_PARAMETER"
  | "DOMAIN_JOIN_ERROR_MORE_DATA"
  | "DOMAIN_JOIN_ERROR_NO_SUCH_DOMAIN"
  | "DOMAIN_JOIN_ERROR_NOT_SUPPORTED"
  | "DOMAIN_JOIN_NERR_INVALID_WORKGROUP_NAME"
  | "DOMAIN_JOIN_NERR_WORKSTATION_NOT_STARTED"
  | "DOMAIN_JOIN_ERROR_DS_MACHINE_ACCOUNT_QUOTA_EXCEEDED"
  | "DOMAIN_JOIN_NERR_PASSWORD_EXPIRED"
  | "DOMAIN_JOIN_INTERNAL_SERVICE_ERROR"
  | "VALIDATION_ERROR"
  | (string & {});
export interface ResourceError {
  ErrorCode?: FleetErrorCode;
  ErrorMessage?: string;
  ErrorTimestamp?: Date;
}
export type ResourceErrors = ResourceError[];
export type AppBlockBuilderStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | (string & {});
export interface AppBlockBuilderStateChangeReason {
  Code?: AppBlockBuilderStateChangeReasonCode;
  Message?: string;
}
export interface AppBlockBuilder {
  Arn?: string;
  Name?: string;
  DisplayName?: string;
  Description?: string;
  Platform?: AppBlockBuilderPlatformType;
  InstanceType?: string;
  EnableDefaultInternetAccess?: boolean;
  IamRoleArn?: string;
  VpcConfig?: VpcConfig;
  State?: AppBlockBuilderState;
  CreatedTime?: Date;
  AppBlockBuilderErrors?: ResourceError[];
  StateChangeReason?: AppBlockBuilderStateChangeReason;
  AccessEndpoints?: AccessEndpoint[];
  DisableIMDSV1?: boolean;
}
export interface CreateAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export interface CreateAppBlockBuilderStreamingURLRequest {
  AppBlockBuilderName?: string;
  Validity?: number;
}
export interface CreateAppBlockBuilderStreamingURLResult {
  StreamingURL?: string;
  Expires?: Date;
}
export type PlatformType =
  | "WINDOWS"
  | "WINDOWS_SERVER_2016"
  | "WINDOWS_SERVER_2019"
  | "WINDOWS_SERVER_2022"
  | "WINDOWS_SERVER_2025"
  | "AMAZON_LINUX2"
  | "RHEL8"
  | "ROCKY_LINUX8"
  | "UBUNTU_PRO_2404"
  | (string & {});
export type Platforms = PlatformType[];
export interface CreateApplicationRequest {
  Name?: string;
  DisplayName?: string;
  Description?: string;
  IconS3Location?: S3Location;
  LaunchPath?: string;
  WorkingDirectory?: string;
  LaunchParameters?: string;
  Platforms?: PlatformType[];
  InstanceFamilies?: string[];
  AppBlockArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export type Metadata = { [key: string]: string | undefined };
export interface Application {
  Name?: string;
  DisplayName?: string;
  IconURL?: string;
  LaunchPath?: string;
  LaunchParameters?: string;
  Enabled?: boolean;
  Metadata?: { [key: string]: string | undefined };
  WorkingDirectory?: string;
  Description?: string;
  Arn?: string;
  AppBlockArn?: string;
  IconS3Location?: S3Location;
  Platforms?: PlatformType[];
  InstanceFamilies?: string[];
  CreatedTime?: Date;
}
export interface CreateApplicationResult {
  Application?: Application & {
    IconS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export type DirectoryName = string;
export type OrganizationalUnitDistinguishedName = string;
export type OrganizationalUnitDistinguishedNamesList = string[];
export type AccountName = string | redacted.Redacted<string>;
export type AccountPassword = string | redacted.Redacted<string>;
export interface ServiceAccountCredentials {
  AccountName?: string | redacted.Redacted<string>;
  AccountPassword?: string | redacted.Redacted<string>;
}
export type CertificateBasedAuthStatus =
  | "DISABLED"
  | "ENABLED"
  | "ENABLED_NO_DIRECTORY_LOGIN_FALLBACK"
  | (string & {});
export interface CertificateBasedAuthProperties {
  Status?: CertificateBasedAuthStatus;
  CertificateAuthorityArn?: string;
}
export interface CreateDirectoryConfigRequest {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedNames?: string[];
  ServiceAccountCredentials?: ServiceAccountCredentials;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
}
export interface DirectoryConfig {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedNames?: string[];
  ServiceAccountCredentials?: ServiceAccountCredentials;
  CreatedTime?: Date;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
}
export interface CreateDirectoryConfigResult {
  DirectoryConfig?: DirectoryConfig & {
    DirectoryName: DirectoryName;
    ServiceAccountCredentials: ServiceAccountCredentials & {
      AccountName: AccountName;
      AccountPassword: AccountPassword;
    };
  };
}
export type AppVisibility = "ALL" | "ASSOCIATED" | (string & {});
export interface EntitlementAttribute {
  Name?: string;
  Value?: string;
}
export type EntitlementAttributeList = EntitlementAttribute[];
export interface CreateEntitlementRequest {
  Name?: string;
  StackName?: string;
  Description?: string;
  AppVisibility?: AppVisibility;
  Attributes?: EntitlementAttribute[];
}
export interface Entitlement {
  Name?: string;
  StackName?: string;
  Description?: string;
  AppVisibility?: AppVisibility;
  Attributes?: EntitlementAttribute[];
  CreatedTime?: Date;
  LastModifiedTime?: Date;
}
export interface CreateEntitlementResult {
  Entitlement?: Entitlement & {
    Name: Name;
    StackName: Name;
    AppVisibility: AppVisibility;
    Attributes: (EntitlementAttribute & { Name: string; Value: string })[];
  };
}
export type AmiName = string;
export interface CreateExportImageTaskRequest {
  ImageName?: string;
  AmiName?: string;
  IamRoleArn?: string;
  TagSpecifications?: { [key: string]: string | undefined };
  AmiDescription?: string;
}
export type UUID = string;
export type ExportImageTaskState =
  | "EXPORTING"
  | "COMPLETED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export type PhotonAmiId = string;
export interface ExportImageTask {
  TaskId?: string;
  ImageArn?: string;
  AmiName?: string;
  CreatedDate?: Date;
  AmiDescription?: string;
  State?: ExportImageTaskState;
  AmiId?: string;
  TagSpecifications?: { [key: string]: string | undefined };
  ErrorDetails?: ErrorDetails[];
}
export interface CreateExportImageTaskResult {
  ExportImageTask?: ExportImageTask & {
    TaskId: UUID;
    ImageArn: Arn;
    AmiName: AmiName;
    CreatedDate: Date;
  };
}
export type FleetType = "ALWAYS_ON" | "ON_DEMAND" | "ELASTIC" | (string & {});
export interface ComputeCapacity {
  DesiredInstances?: number;
  DesiredSessions?: number;
}
export interface DomainJoinInfo {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedName?: string;
}
export type StreamView = "APP" | "DESKTOP" | (string & {});
export type UsbDeviceFilterString = string;
export type UsbDeviceFilterStrings = string[];
export interface VolumeConfig {
  VolumeSizeInGb?: number;
}
export interface CreateFleetRequest {
  Name?: string;
  ImageName?: string;
  ImageArn?: string;
  InstanceType?: string;
  FleetType?: FleetType;
  ComputeCapacity?: ComputeCapacity;
  VpcConfig?: VpcConfig;
  MaxUserDurationInSeconds?: number;
  DisconnectTimeoutInSeconds?: number;
  Description?: string;
  DisplayName?: string;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  Tags?: { [key: string]: string | undefined };
  IdleDisconnectTimeoutInSeconds?: number;
  IamRoleArn?: string;
  StreamView?: StreamView;
  Platform?: PlatformType;
  MaxConcurrentSessions?: number;
  UsbDeviceFilterStrings?: string[];
  SessionScriptS3Location?: S3Location;
  MaxSessionsPerInstance?: number;
  RootVolumeConfig?: VolumeConfig;
  DisableIMDSV1?: boolean;
}
export interface ComputeCapacityStatus {
  Desired?: number;
  Running?: number;
  InUse?: number;
  Available?: number;
  DesiredUserSessions?: number;
  AvailableUserSessions?: number;
  ActiveUserSessions?: number;
  ActualUserSessions?: number;
  Draining?: number;
  DrainModeActiveUserSessions?: number;
  DrainModeUnusedUserSessions?: number;
}
export type FleetState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface FleetError {
  ErrorCode?: FleetErrorCode;
  ErrorMessage?: string;
}
export type FleetErrors = FleetError[];
export interface Fleet {
  Arn?: string;
  Name?: string;
  DisplayName?: string;
  Description?: string;
  ImageName?: string;
  ImageArn?: string;
  InstanceType?: string;
  FleetType?: FleetType;
  ComputeCapacityStatus?: ComputeCapacityStatus;
  MaxUserDurationInSeconds?: number;
  DisconnectTimeoutInSeconds?: number;
  State?: FleetState;
  VpcConfig?: VpcConfig;
  CreatedTime?: Date;
  FleetErrors?: FleetError[];
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  IdleDisconnectTimeoutInSeconds?: number;
  IamRoleArn?: string;
  StreamView?: StreamView;
  Platform?: PlatformType;
  MaxConcurrentSessions?: number;
  UsbDeviceFilterStrings?: string[];
  SessionScriptS3Location?: S3Location;
  MaxSessionsPerInstance?: number;
  RootVolumeConfig?: VolumeConfig;
  DisableIMDSV1?: boolean;
}
export interface CreateFleetResult {
  Fleet?: Fleet & {
    Arn: Arn;
    Name: string;
    InstanceType: string;
    ComputeCapacityStatus: ComputeCapacityStatus & { Desired: number };
    State: FleetState;
    SessionScriptS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export type AppstreamAgentVersion = string;
export interface CreateImageBuilderRequest {
  Name?: string;
  ImageName?: string;
  ImageArn?: string;
  InstanceType?: string;
  Description?: string;
  DisplayName?: string;
  VpcConfig?: VpcConfig;
  IamRoleArn?: string;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  AppstreamAgentVersion?: string;
  Tags?: { [key: string]: string | undefined };
  AccessEndpoints?: AccessEndpoint[];
  RootVolumeConfig?: VolumeConfig;
  SoftwaresToInstall?: string[];
  SoftwaresToUninstall?: string[];
  DisableIMDSV1?: boolean;
}
export type ImageBuilderState =
  | "PENDING"
  | "UPDATING_AGENT"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "REBOOTING"
  | "SNAPSHOTTING"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "PENDING_QUALIFICATION"
  | "PENDING_SYNCING_APPS"
  | "SYNCING_APPS"
  | "PENDING_IMAGE_IMPORT"
  | (string & {});
export type ImageBuilderStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "IMAGE_UNAVAILABLE"
  | (string & {});
export interface ImageBuilderStateChangeReason {
  Code?: ImageBuilderStateChangeReasonCode;
  Message?: string;
}
export interface NetworkAccessConfiguration {
  EniPrivateIpAddress?: string;
  EniIpv6Addresses?: string[];
  EniId?: string;
}
export type LatestAppstreamAgentVersion = "TRUE" | "FALSE" | (string & {});
export interface ImageBuilder {
  Name?: string;
  Arn?: string;
  ImageArn?: string;
  Description?: string;
  DisplayName?: string;
  VpcConfig?: VpcConfig;
  InstanceType?: string;
  Platform?: PlatformType;
  IamRoleArn?: string;
  State?: ImageBuilderState;
  StateChangeReason?: ImageBuilderStateChangeReason;
  CreatedTime?: Date;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  NetworkAccessConfiguration?: NetworkAccessConfiguration;
  ImageBuilderErrors?: ResourceError[];
  AppstreamAgentVersion?: string;
  AccessEndpoints?: AccessEndpoint[];
  RootVolumeConfig?: VolumeConfig;
  LatestAppstreamAgentVersion?: LatestAppstreamAgentVersion;
  DisableIMDSV1?: boolean;
}
export interface CreateImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export interface CreateImageBuilderStreamingURLRequest {
  Name?: string;
  Validity?: number;
}
export interface CreateImageBuilderStreamingURLResult {
  StreamingURL?: string;
  Expires?: Date;
}
export type WorkspaceImageId = string;
export type ImageImportDescription = string;
export type ImageImportDisplayName = string;
export type InstanceType = string;
export interface RuntimeValidationConfig {
  IntendedInstanceType?: string;
}
export type AgentSoftwareVersion =
  | "CURRENT_LATEST"
  | "ALWAYS_LATEST"
  | (string & {});
export type AppName = string;
export type AppDisplayName = string;
export type FilePath = string | redacted.Redacted<string>;
export type LaunchParameters = string | redacted.Redacted<string>;
export interface ApplicationConfig {
  Name?: string;
  DisplayName?: string;
  AbsoluteAppPath?: string | redacted.Redacted<string>;
  AbsoluteIconPath?: string | redacted.Redacted<string>;
  AbsoluteManifestPath?: string | redacted.Redacted<string>;
  WorkingDirectory?: string | redacted.Redacted<string>;
  LaunchParameters?: string | redacted.Redacted<string>;
}
export type AppCatalogConfig = ApplicationConfig[];
export interface CreateImportedImageRequest {
  Name?: string;
  SourceAmiId?: string;
  WorkspaceImageId?: string;
  IamRoleArn?: string;
  Description?: string;
  DisplayName?: string;
  Tags?: { [key: string]: string | undefined };
  RuntimeValidationConfig?: RuntimeValidationConfig;
  AgentSoftwareVersion?: AgentSoftwareVersion;
  AppCatalogConfig?: ApplicationConfig[];
  DryRun?: boolean;
}
export type ImageState =
  | "PENDING"
  | "AVAILABLE"
  | "FAILED"
  | "COPYING"
  | "DELETING"
  | "CREATING"
  | "IMPORTING"
  | "VALIDATING"
  | (string & {});
export type VisibilityType = "PUBLIC" | "PRIVATE" | "SHARED" | (string & {});
export type ImageStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "IMAGE_BUILDER_NOT_AVAILABLE"
  | "IMAGE_COPY_FAILURE"
  | "IMAGE_UPDATE_FAILURE"
  | "IMAGE_IMPORT_FAILURE"
  | (string & {});
export interface ImageStateChangeReason {
  Code?: ImageStateChangeReasonCode;
  Message?: string;
}
export type Applications = Application[];
export interface ImagePermissions {
  allowFleet?: boolean;
  allowImageBuilder?: boolean;
}
export type DynamicAppProvidersEnabled = "ENABLED" | "DISABLED" | (string & {});
export type ImageSharedWithOthers = "TRUE" | "FALSE" | (string & {});
export type ImageType = "CUSTOM" | "NATIVE" | "BYOL" | (string & {});
export interface Image {
  Name?: string;
  Arn?: string;
  BaseImageArn?: string;
  DisplayName?: string;
  State?: ImageState;
  Visibility?: VisibilityType;
  ImageBuilderSupported?: boolean;
  ImageBuilderName?: string;
  Platform?: PlatformType;
  Description?: string;
  StateChangeReason?: ImageStateChangeReason;
  Applications?: Application[];
  CreatedTime?: Date;
  PublicBaseImageReleasedDate?: Date;
  AppstreamAgentVersion?: string;
  ImagePermissions?: ImagePermissions;
  ImageErrors?: ResourceError[];
  LatestAppstreamAgentVersion?: LatestAppstreamAgentVersion;
  SupportedInstanceFamilies?: string[];
  DynamicAppProvidersEnabled?: DynamicAppProvidersEnabled;
  ImageSharedWithOthers?: ImageSharedWithOthers;
  ManagedSoftwareIncluded?: boolean;
  ImageType?: ImageType;
}
export interface CreateImportedImageResult {
  Image?: Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  };
}
export type StorageConnectorType =
  | "HOMEFOLDERS"
  | "GOOGLE_DRIVE"
  | "ONE_DRIVE"
  | (string & {});
export type ResourceIdentifier = string;
export type Domain = string;
export type DomainList = string[];
export interface StorageConnector {
  ConnectorType?: StorageConnectorType;
  ResourceIdentifier?: string;
  Domains?: string[];
  DomainsRequireAdminConsent?: string[];
}
export type StorageConnectorList = StorageConnector[];
export type RedirectURL = string;
export type FeedbackURL = string;
export type Action =
  | "CLIPBOARD_COPY_FROM_LOCAL_DEVICE"
  | "CLIPBOARD_COPY_TO_LOCAL_DEVICE"
  | "FILE_UPLOAD"
  | "FILE_DOWNLOAD"
  | "PRINTING_TO_LOCAL_DEVICE"
  | "DOMAIN_PASSWORD_SIGNIN"
  | "DOMAIN_SMART_CARD_SIGNIN"
  | "AUTO_TIME_ZONE_REDIRECTION"
  | (string & {});
export type Permission = "ENABLED" | "DISABLED" | (string & {});
export interface UserSetting {
  Action?: Action;
  Permission?: Permission;
  MaximumLength?: number;
}
export type UserSettingList = UserSetting[];
export type SettingsGroup = string;
export interface ApplicationSettings {
  Enabled?: boolean;
  SettingsGroup?: string;
}
export type EmbedHostDomain = string;
export type EmbedHostDomains = string[];
export type PreferredProtocol = "TCP" | "UDP" | (string & {});
export interface StreamingExperienceSettings {
  PreferredProtocol?: PreferredProtocol;
}
export type UrlPattern = string;
export type UrlPatternList = string[];
export interface UrlRedirectionConfig {
  Enabled?: boolean;
  AllowedUrls?: string[];
  DeniedUrls?: string[];
}
export interface ContentRedirection {
  HostToClient?: UrlRedirectionConfig;
}
export type AgentAction =
  | "COMPUTER_VISION"
  | "COMPUTER_INPUT"
  | "FORWARD_MCP_TOOLS"
  | (string & {});
export interface AgentAccessSetting {
  AgentAction?: AgentAction;
  Permission?: Permission;
}
export type AgentAccessSettingList = AgentAccessSetting[];
export type S3BucketArn = string;
export type ScreenResolution = "W_1280xH_720" | (string & {});
export type ScreenImageFormat = "PNG" | "JPEG" | (string & {});
export type UserControlMode =
  | "VIEW_ONLY"
  | "VIEW_STOP"
  | "DISABLED"
  | (string & {});
export interface AgentAccessConfig {
  Settings?: AgentAccessSetting[];
  S3BucketArn?: string;
  ScreenshotsUploadEnabled?: boolean;
  ScreenResolution?: ScreenResolution;
  ScreenImageFormat?: ScreenImageFormat;
  UserControlMode?: UserControlMode;
}
export interface CreateStackRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  StorageConnectors?: StorageConnector[];
  RedirectURL?: string;
  FeedbackURL?: string;
  UserSettings?: UserSetting[];
  ApplicationSettings?: ApplicationSettings;
  Tags?: { [key: string]: string | undefined };
  AccessEndpoints?: AccessEndpoint[];
  EmbedHostDomains?: string[];
  StreamingExperienceSettings?: StreamingExperienceSettings;
  ContentRedirection?: ContentRedirection;
  AgentAccessConfig?: AgentAccessConfig;
}
export type StackErrorCode =
  | "STORAGE_CONNECTOR_ERROR"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export interface StackError {
  ErrorCode?: StackErrorCode;
  ErrorMessage?: string;
}
export type StackErrors = StackError[];
export interface ApplicationSettingsResponse {
  Enabled?: boolean;
  SettingsGroup?: string;
  S3BucketName?: string;
}
export interface Stack {
  Arn?: string;
  Name?: string;
  Description?: string;
  DisplayName?: string;
  CreatedTime?: Date;
  StorageConnectors?: StorageConnector[];
  RedirectURL?: string;
  FeedbackURL?: string;
  StackErrors?: StackError[];
  UserSettings?: UserSetting[];
  ApplicationSettings?: ApplicationSettingsResponse;
  AccessEndpoints?: AccessEndpoint[];
  EmbedHostDomains?: string[];
  StreamingExperienceSettings?: StreamingExperienceSettings;
  ContentRedirection?: ContentRedirection;
  AgentAccessConfig?: AgentAccessConfig;
}
export interface CreateStackResult {
  Stack?: Stack & {
    Name: string;
    StorageConnectors: (StorageConnector & {
      ConnectorType: StorageConnectorType;
    })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & {
        AgentAction: AgentAction;
        Permission: Permission;
      })[];
      ScreenResolution: ScreenResolution;
      ScreenImageFormat: ScreenImageFormat;
    };
  };
}
export type StreamingUrlUserId = string;
export interface CreateStreamingURLRequest {
  StackName?: string;
  FleetName?: string;
  UserId?: string;
  ApplicationId?: string;
  Validity?: number;
  SessionContext?: string;
}
export interface CreateStreamingURLResult {
  StreamingURL?: string;
  Expires?: Date;
}
export type ThemeFooterLinkDisplayName = string;
export type ThemeFooterLinkURL = string;
export interface ThemeFooterLink {
  DisplayName?: string;
  FooterLinkURL?: string;
}
export type ThemeFooterLinks = ThemeFooterLink[];
export type ThemeTitleText = string;
export type ThemeStyling =
  | "LIGHT_BLUE"
  | "BLUE"
  | "PINK"
  | "RED"
  | (string & {});
export interface CreateThemeForStackRequest {
  StackName?: string;
  FooterLinks?: ThemeFooterLink[];
  TitleText?: string;
  ThemeStyling?: ThemeStyling;
  OrganizationLogoS3Location?: S3Location;
  FaviconS3Location?: S3Location;
}
export type ThemeState = "ENABLED" | "DISABLED" | (string & {});
export interface Theme {
  StackName?: string;
  State?: ThemeState;
  ThemeTitleText?: string;
  ThemeStyling?: ThemeStyling;
  ThemeFooterLinks?: ThemeFooterLink[];
  ThemeOrganizationLogoURL?: string;
  ThemeFaviconURL?: string;
  CreatedTime?: Date;
}
export interface CreateThemeForStackResult {
  Theme?: Theme;
}
export interface CreateUpdatedImageRequest {
  existingImageName?: string;
  newImageName?: string;
  newImageDescription?: string;
  newImageDisplayName?: string;
  newImageTags?: { [key: string]: string | undefined };
  dryRun?: boolean;
}
export interface CreateUpdatedImageResult {
  image?: Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  };
  canUpdateImage?: boolean;
}
export interface CreateUsageReportSubscriptionRequest {}
export type UsageReportSchedule = "DAILY" | (string & {});
export interface CreateUsageReportSubscriptionResult {
  S3BucketName?: string;
  Schedule?: UsageReportSchedule;
}
export type MessageAction = "SUPPRESS" | "RESEND" | (string & {});
export type UserAttributeValue = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  UserName?: string | redacted.Redacted<string>;
  MessageAction?: MessageAction;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export interface CreateUserResult {}
export interface DeleteAppBlockRequest {
  Name?: string;
}
export interface DeleteAppBlockResult {}
export interface DeleteAppBlockBuilderRequest {
  Name?: string;
}
export interface DeleteAppBlockBuilderResult {}
export interface DeleteApplicationRequest {
  Name?: string;
}
export interface DeleteApplicationResult {}
export interface DeleteDirectoryConfigRequest {
  DirectoryName?: string;
}
export interface DeleteDirectoryConfigResult {}
export interface DeleteEntitlementRequest {
  Name?: string;
  StackName?: string;
}
export interface DeleteEntitlementResult {}
export interface DeleteFleetRequest {
  Name?: string;
}
export interface DeleteFleetResult {}
export interface DeleteImageRequest {
  Name?: string;
}
export interface DeleteImageResult {
  Image?: Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  };
}
export interface DeleteImageBuilderRequest {
  Name?: string;
}
export interface DeleteImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export type AwsAccountId = string;
export interface DeleteImagePermissionsRequest {
  Name?: string;
  SharedAccountId?: string;
}
export interface DeleteImagePermissionsResult {}
export interface DeleteStackRequest {
  Name?: string;
}
export interface DeleteStackResult {}
export interface DeleteThemeForStackRequest {
  StackName?: string;
}
export interface DeleteThemeForStackResult {}
export interface DeleteUsageReportSubscriptionRequest {}
export interface DeleteUsageReportSubscriptionResult {}
export interface DeleteUserRequest {
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export interface DeleteUserResult {}
export interface DescribeAppBlockBuilderAppBlockAssociationsRequest {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type AppBlockBuilderAppBlockAssociationsList =
  AppBlockBuilderAppBlockAssociation[];
export interface DescribeAppBlockBuilderAppBlockAssociationsResult {
  AppBlockBuilderAppBlockAssociations?: (AppBlockBuilderAppBlockAssociation & {
    AppBlockArn: Arn;
    AppBlockBuilderName: Name;
  })[];
  NextToken?: string;
}
export interface DescribeAppBlockBuildersRequest {
  Names?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export type AppBlockBuilderList = AppBlockBuilder[];
export interface DescribeAppBlockBuildersResult {
  AppBlockBuilders?: (AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  })[];
  NextToken?: string;
}
export type ArnList = string[];
export interface DescribeAppBlocksRequest {
  Arns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export type AppBlocks = AppBlock[];
export interface DescribeAppBlocksResult {
  AppBlocks?: (AppBlock & {
    Name: string;
    Arn: Arn;
    SourceS3Location: S3Location & { S3Bucket: S3Bucket };
    SetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
    PostSetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
  })[];
  NextToken?: string;
}
export interface DescribeApplicationFleetAssociationsRequest {
  FleetName?: string;
  ApplicationArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ApplicationFleetAssociationList = ApplicationFleetAssociation[];
export interface DescribeApplicationFleetAssociationsResult {
  ApplicationFleetAssociations?: (ApplicationFleetAssociation & {
    FleetName: string;
    ApplicationArn: Arn;
  })[];
  NextToken?: string;
}
export interface DescribeApplicationsRequest {
  Arns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface DescribeApplicationsResult {
  Applications?: (Application & {
    IconS3Location: S3Location & { S3Bucket: S3Bucket };
  })[];
  NextToken?: string;
}
export interface DescribeAppLicenseUsageRequest {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface AdminAppLicenseUsageRecord {
  UserArn?: string;
  BillingPeriod?: string;
  OwnerAWSAccountId?: string;
  SubscriptionFirstUsedDate?: Date;
  SubscriptionLastUsedDate?: Date;
  LicenseType?: string;
  UserId?: string;
}
export type AdminAppLicenseUsageList = AdminAppLicenseUsageRecord[];
export interface DescribeAppLicenseUsageResult {
  AppLicenseUsages?: (AdminAppLicenseUsageRecord & {
    UserArn: string;
    BillingPeriod: string;
    OwnerAWSAccountId: AwsAccountId;
    SubscriptionFirstUsedDate: Date;
    SubscriptionLastUsedDate: Date;
    LicenseType: string;
    UserId: string;
  })[];
  NextToken?: string;
}
export type DirectoryNameList = string[];
export interface DescribeDirectoryConfigsRequest {
  DirectoryNames?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type DirectoryConfigList = DirectoryConfig[];
export interface DescribeDirectoryConfigsResult {
  DirectoryConfigs?: (DirectoryConfig & {
    DirectoryName: DirectoryName;
    ServiceAccountCredentials: ServiceAccountCredentials & {
      AccountName: AccountName;
      AccountPassword: AccountPassword;
    };
  })[];
  NextToken?: string;
}
export interface DescribeEntitlementsRequest {
  Name?: string;
  StackName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type EntitlementList = Entitlement[];
export interface DescribeEntitlementsResult {
  Entitlements?: (Entitlement & {
    Name: Name;
    StackName: Name;
    AppVisibility: AppVisibility;
    Attributes: (EntitlementAttribute & { Name: string; Value: string })[];
  })[];
  NextToken?: string;
}
export interface DescribeFleetsRequest {
  Names?: string[];
  NextToken?: string;
}
export type FleetList = Fleet[];
export interface DescribeFleetsResult {
  Fleets?: (Fleet & {
    Arn: Arn;
    Name: string;
    InstanceType: string;
    ComputeCapacityStatus: ComputeCapacityStatus & { Desired: number };
    State: FleetState;
    SessionScriptS3Location: S3Location & { S3Bucket: S3Bucket };
  })[];
  NextToken?: string;
}
export interface DescribeImageBuildersRequest {
  Names?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type ImageBuilderList = ImageBuilder[];
export interface DescribeImageBuildersResult {
  ImageBuilders?: (ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  })[];
  NextToken?: string;
}
export type MaxResults = number;
export type AwsAccountIdList = string[];
export interface DescribeImagePermissionsRequest {
  Name?: string;
  MaxResults?: number;
  SharedAwsAccountIds?: string[];
  NextToken?: string;
}
export interface SharedImagePermissions {
  sharedAccountId?: string;
  imagePermissions?: ImagePermissions;
}
export type SharedImagePermissionsList = SharedImagePermissions[];
export interface DescribeImagePermissionsResult {
  Name?: string;
  SharedImagePermissionsList?: (SharedImagePermissions & {
    sharedAccountId: AwsAccountId;
    imagePermissions: ImagePermissions;
  })[];
  NextToken?: string;
}
export type DescribeImagesMaxResults = number;
export interface DescribeImagesRequest {
  Names?: string[];
  Arns?: string[];
  Type?: VisibilityType;
  NextToken?: string;
  MaxResults?: number;
}
export type ImageList = Image[];
export interface DescribeImagesResult {
  Images?: (Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  })[];
  NextToken?: string;
}
export type UserId = string;
export interface DescribeSessionsRequest {
  StackName?: string;
  FleetName?: string;
  UserId?: string;
  NextToken?: string;
  Limit?: number;
  AuthenticationType?: AuthenticationType;
  InstanceId?: string;
}
export type SessionState = "ACTIVE" | "PENDING" | "EXPIRED" | (string & {});
export type SessionConnectionState =
  | "CONNECTED"
  | "NOT_CONNECTED"
  | (string & {});
export type InstanceDrainStatus =
  | "ACTIVE"
  | "DRAINING"
  | "NOT_APPLICABLE"
  | (string & {});
export interface Session {
  Id?: string;
  UserId?: string;
  StackName?: string;
  FleetName?: string;
  State?: SessionState;
  ConnectionState?: SessionConnectionState;
  StartTime?: Date;
  MaxExpirationTime?: Date;
  AuthenticationType?: AuthenticationType;
  NetworkAccessConfiguration?: NetworkAccessConfiguration;
  InstanceId?: string;
  InstanceDrainStatus?: InstanceDrainStatus;
}
export type SessionList = Session[];
export interface DescribeSessionsResult {
  Sessions?: (Session & {
    Id: string;
    UserId: UserId;
    StackName: string;
    FleetName: string;
    State: SessionState;
  })[];
  NextToken?: string;
}
export interface DescribeSoftwareAssociationsRequest {
  AssociatedResource?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type SoftwareDeploymentStatus =
  | "STAGED_FOR_INSTALLATION"
  | "PENDING_INSTALLATION"
  | "INSTALLED"
  | "STAGED_FOR_UNINSTALLATION"
  | "PENDING_UNINSTALLATION"
  | "FAILED_TO_INSTALL"
  | "FAILED_TO_UNINSTALL"
  | (string & {});
export interface SoftwareAssociations {
  SoftwareName?: string;
  Status?: SoftwareDeploymentStatus;
  DeploymentError?: ErrorDetails[];
}
export type SoftwareAssociationsList = SoftwareAssociations[];
export interface DescribeSoftwareAssociationsResult {
  AssociatedResource?: string;
  SoftwareAssociations?: SoftwareAssociations[];
  NextToken?: string;
}
export interface DescribeStacksRequest {
  Names?: string[];
  NextToken?: string;
}
export type StackList = Stack[];
export interface DescribeStacksResult {
  Stacks?: (Stack & {
    Name: string;
    StorageConnectors: (StorageConnector & {
      ConnectorType: StorageConnectorType;
    })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & {
        AgentAction: AgentAction;
        Permission: Permission;
      })[];
      ScreenResolution: ScreenResolution;
      ScreenImageFormat: ScreenImageFormat;
    };
  })[];
  NextToken?: string;
}
export interface DescribeThemeForStackRequest {
  StackName?: string;
}
export interface DescribeThemeForStackResult {
  Theme?: Theme;
}
export interface DescribeUsageReportSubscriptionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type UsageReportExecutionErrorCode =
  | "RESOURCE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export interface LastReportGenerationExecutionError {
  ErrorCode?: UsageReportExecutionErrorCode;
  ErrorMessage?: string;
}
export type LastReportGenerationExecutionErrors =
  LastReportGenerationExecutionError[];
export interface UsageReportSubscription {
  S3BucketName?: string;
  Schedule?: UsageReportSchedule;
  LastGeneratedReportDate?: Date;
  SubscriptionErrors?: LastReportGenerationExecutionError[];
}
export type UsageReportSubscriptionList = UsageReportSubscription[];
export interface DescribeUsageReportSubscriptionsResult {
  UsageReportSubscriptions?: UsageReportSubscription[];
  NextToken?: string;
}
export interface DescribeUsersRequest {
  AuthenticationType?: AuthenticationType;
  MaxResults?: number;
  NextToken?: string;
}
export interface User {
  Arn?: string;
  UserName?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  Status?: string;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  CreatedTime?: Date;
  AuthenticationType?: AuthenticationType;
}
export type UserList = User[];
export interface DescribeUsersResult {
  Users?: (User & { AuthenticationType: AuthenticationType })[];
  NextToken?: string;
}
export interface DescribeUserStackAssociationsRequest {
  StackName?: string;
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
  MaxResults?: number;
  NextToken?: string;
}
export interface DescribeUserStackAssociationsResult {
  UserStackAssociations?: (UserStackAssociation & {
    StackName: string;
    UserName: Username;
    AuthenticationType: AuthenticationType;
  })[];
  NextToken?: string;
}
export interface DisableUserRequest {
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export interface DisableUserResult {}
export interface DisassociateAppBlockBuilderAppBlockRequest {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
}
export interface DisassociateAppBlockBuilderAppBlockResult {}
export interface DisassociateApplicationFleetRequest {
  FleetName?: string;
  ApplicationArn?: string;
}
export interface DisassociateApplicationFleetResult {}
export interface DisassociateApplicationFromEntitlementRequest {
  StackName?: string;
  EntitlementName?: string;
  ApplicationIdentifier?: string;
}
export interface DisassociateApplicationFromEntitlementResult {}
export interface DisassociateFleetRequest {
  FleetName?: string;
  StackName?: string;
}
export interface DisassociateFleetResult {}
export interface DisassociateSoftwareFromImageBuilderRequest {
  ImageBuilderName?: string;
  SoftwareNames?: string[];
}
export interface DisassociateSoftwareFromImageBuilderResult {}
export interface DrainSessionInstanceRequest {
  SessionId?: string;
}
export interface DrainSessionInstanceResult {}
export interface EnableUserRequest {
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export interface EnableUserResult {}
export interface ExpireSessionRequest {
  SessionId?: string;
}
export interface ExpireSessionResult {}
export interface GetExportImageTaskRequest {
  TaskId?: string;
}
export interface GetExportImageTaskResult {
  ExportImageTask?: ExportImageTask & {
    TaskId: UUID;
    ImageArn: Arn;
    AmiName: AmiName;
    CreatedDate: Date;
  };
}
export interface ListAssociatedFleetsRequest {
  StackName?: string;
  NextToken?: string;
}
export interface ListAssociatedFleetsResult {
  Names?: string[];
  NextToken?: string;
}
export interface ListAssociatedStacksRequest {
  FleetName?: string;
  NextToken?: string;
}
export interface ListAssociatedStacksResult {
  Names?: string[];
  NextToken?: string;
}
export interface ListEntitledApplicationsRequest {
  StackName?: string;
  EntitlementName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface EntitledApplication {
  ApplicationIdentifier?: string;
}
export type EntitledApplicationList = EntitledApplication[];
export interface ListEntitledApplicationsResult {
  EntitledApplications?: (EntitledApplication & {
    ApplicationIdentifier: string;
  })[];
  NextToken?: string;
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type Filters = Filter[];
export interface ListExportImageTasksRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type ExportImageTasks = ExportImageTask[];
export interface ListExportImageTasksResult {
  ExportImageTasks?: (ExportImageTask & {
    TaskId: UUID;
    ImageArn: Arn;
    AmiName: AmiName;
    CreatedDate: Date;
  })[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface StartAppBlockBuilderRequest {
  Name?: string;
}
export interface StartAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export interface StartFleetRequest {
  Name?: string;
}
export interface StartFleetResult {}
export interface StartImageBuilderRequest {
  Name?: string;
  AppstreamAgentVersion?: string;
}
export interface StartImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export interface StartSoftwareDeploymentToImageBuilderRequest {
  ImageBuilderName?: string;
  RetryFailedDeployments?: boolean;
}
export interface StartSoftwareDeploymentToImageBuilderResult {}
export interface StopAppBlockBuilderRequest {
  Name?: string;
}
export interface StopAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export interface StopFleetRequest {
  Name?: string;
}
export interface StopFleetResult {}
export interface StopImageBuilderRequest {
  Name?: string;
}
export interface StopImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export interface TagResourceRequest {
  ResourceArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn?: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export type AppBlockBuilderAttribute =
  | "IAM_ROLE_ARN"
  | "ACCESS_ENDPOINTS"
  | "VPC_CONFIGURATION_SECURITY_GROUP_IDS"
  | (string & {});
export type AppBlockBuilderAttributes = AppBlockBuilderAttribute[];
export interface UpdateAppBlockBuilderRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  Platform?: PlatformType;
  InstanceType?: string;
  VpcConfig?: VpcConfig;
  EnableDefaultInternetAccess?: boolean;
  IamRoleArn?: string;
  AccessEndpoints?: AccessEndpoint[];
  AttributesToDelete?: AppBlockBuilderAttribute[];
  DisableIMDSV1?: boolean;
}
export interface UpdateAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export type ApplicationAttribute =
  | "LAUNCH_PARAMETERS"
  | "WORKING_DIRECTORY"
  | (string & {});
export type ApplicationAttributes = ApplicationAttribute[];
export interface UpdateApplicationRequest {
  Name?: string;
  DisplayName?: string;
  Description?: string;
  IconS3Location?: S3Location;
  LaunchPath?: string;
  WorkingDirectory?: string;
  LaunchParameters?: string;
  AppBlockArn?: string;
  AttributesToDelete?: ApplicationAttribute[];
}
export interface UpdateApplicationResult {
  Application?: Application & {
    IconS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export interface UpdateDirectoryConfigRequest {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedNames?: string[];
  ServiceAccountCredentials?: ServiceAccountCredentials;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
}
export interface UpdateDirectoryConfigResult {
  DirectoryConfig?: DirectoryConfig & {
    DirectoryName: DirectoryName;
    ServiceAccountCredentials: ServiceAccountCredentials & {
      AccountName: AccountName;
      AccountPassword: AccountPassword;
    };
  };
}
export interface UpdateEntitlementRequest {
  Name?: string;
  StackName?: string;
  Description?: string;
  AppVisibility?: AppVisibility;
  Attributes?: EntitlementAttribute[];
}
export interface UpdateEntitlementResult {
  Entitlement?: Entitlement & {
    Name: Name;
    StackName: Name;
    AppVisibility: AppVisibility;
    Attributes: (EntitlementAttribute & { Name: string; Value: string })[];
  };
}
export type FleetAttribute =
  | "VPC_CONFIGURATION"
  | "VPC_CONFIGURATION_SECURITY_GROUP_IDS"
  | "DOMAIN_JOIN_INFO"
  | "IAM_ROLE_ARN"
  | "USB_DEVICE_FILTER_STRINGS"
  | "SESSION_SCRIPT_S3_LOCATION"
  | "MAX_SESSIONS_PER_INSTANCE"
  | "VOLUME_CONFIGURATION"
  | (string & {});
export type FleetAttributes = FleetAttribute[];
export interface UpdateFleetRequest {
  ImageName?: string;
  ImageArn?: string;
  Name?: string;
  InstanceType?: string;
  ComputeCapacity?: ComputeCapacity;
  VpcConfig?: VpcConfig;
  MaxUserDurationInSeconds?: number;
  DisconnectTimeoutInSeconds?: number;
  DeleteVpcConfig?: boolean;
  Description?: string;
  DisplayName?: string;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  IdleDisconnectTimeoutInSeconds?: number;
  AttributesToDelete?: FleetAttribute[];
  IamRoleArn?: string;
  StreamView?: StreamView;
  Platform?: PlatformType;
  MaxConcurrentSessions?: number;
  UsbDeviceFilterStrings?: string[];
  SessionScriptS3Location?: S3Location;
  MaxSessionsPerInstance?: number;
  RootVolumeConfig?: VolumeConfig;
  DisableIMDSV1?: boolean;
}
export interface UpdateFleetResult {
  Fleet?: Fleet & {
    Arn: Arn;
    Name: string;
    InstanceType: string;
    ComputeCapacityStatus: ComputeCapacityStatus & { Desired: number };
    State: FleetState;
    SessionScriptS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export interface UpdateImagePermissionsRequest {
  Name?: string;
  SharedAccountId?: string;
  ImagePermissions?: ImagePermissions;
}
export interface UpdateImagePermissionsResult {}
export type StackAttribute =
  | "STORAGE_CONNECTORS"
  | "STORAGE_CONNECTOR_HOMEFOLDERS"
  | "STORAGE_CONNECTOR_GOOGLE_DRIVE"
  | "STORAGE_CONNECTOR_ONE_DRIVE"
  | "REDIRECT_URL"
  | "FEEDBACK_URL"
  | "THEME_NAME"
  | "USER_SETTINGS"
  | "EMBED_HOST_DOMAINS"
  | "IAM_ROLE_ARN"
  | "ACCESS_ENDPOINTS"
  | "STREAMING_EXPERIENCE_SETTINGS"
  | "CONTENT_REDIRECTION"
  | "AGENT_ACCESS_CONFIG"
  | (string & {});
export type StackAttributes = StackAttribute[];
export interface AgentAccessConfigForUpdate {
  Settings?: AgentAccessSetting[];
  S3BucketArn?: string;
  ScreenshotsUploadEnabled?: boolean;
  ScreenResolution?: ScreenResolution;
  ScreenImageFormat?: ScreenImageFormat;
  UserControlMode?: UserControlMode;
}
export interface UpdateStackRequest {
  DisplayName?: string;
  Description?: string;
  Name?: string;
  StorageConnectors?: StorageConnector[];
  DeleteStorageConnectors?: boolean;
  RedirectURL?: string;
  FeedbackURL?: string;
  AttributesToDelete?: StackAttribute[];
  UserSettings?: UserSetting[];
  ApplicationSettings?: ApplicationSettings;
  AccessEndpoints?: AccessEndpoint[];
  EmbedHostDomains?: string[];
  StreamingExperienceSettings?: StreamingExperienceSettings;
  ContentRedirection?: ContentRedirection;
  AgentAccessConfig?: AgentAccessConfigForUpdate;
}
export interface UpdateStackResult {
  Stack?: Stack & {
    Name: string;
    StorageConnectors: (StorageConnector & {
      ConnectorType: StorageConnectorType;
    })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & {
        AgentAction: AgentAction;
        Permission: Permission;
      })[];
      ScreenResolution: ScreenResolution;
      ScreenImageFormat: ScreenImageFormat;
    };
  };
}
export type ThemeAttribute = "FOOTER_LINKS" | (string & {});
export type ThemeAttributes = ThemeAttribute[];
export interface UpdateThemeForStackRequest {
  StackName?: string;
  FooterLinks?: ThemeFooterLink[];
  TitleText?: string;
  ThemeStyling?: ThemeStyling;
  OrganizationLogoS3Location?: S3Location;
  FaviconS3Location?: S3Location;
  State?: ThemeState;
  AttributesToDelete?: ThemeAttribute[];
}
export interface UpdateThemeForStackResult {
  Theme?: Theme;
}
export type ErrorMessage = string;
export type AssociateAppBlockBuilderAppBlockError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified app block builder with the specified app block.
 */
export const associateAppBlockBuilderAppBlock: API.OperationMethod<
  AssociateAppBlockBuilderAppBlockRequest,
  AssociateAppBlockBuilderAppBlockResult,
  AssociateAppBlockBuilderAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AppBlockArn: 0, AppBlockBuilderName: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAppBlockBuilderAppBlock",
})) as any;

export type AssociateApplicationFleetError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified application with the specified fleet. This is only supported for Elastic fleets.
 */
export const associateApplicationFleet: API.OperationMethod<
  AssociateApplicationFleetRequest,
  AssociateApplicationFleetResult,
  AssociateApplicationFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FleetName: 0, ApplicationArn: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplicationFleet",
})) as any;

export type AssociateApplicationToEntitlementError =
  | EntitlementNotFoundException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates an application to entitle.
 */
export const associateApplicationToEntitlement: API.OperationMethod<
  AssociateApplicationToEntitlementRequest,
  AssociateApplicationToEntitlementResult,
  AssociateApplicationToEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, EntitlementName: 0, ApplicationIdentifier: 0 },
  },
  errors: [
    EntitlementNotFoundException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplicationToEntitlement",
})) as any;

export type AssociateFleetError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified fleet with the specified stack.
 */
export const associateFleet: API.OperationMethod<
  AssociateFleetRequest,
  AssociateFleetResult,
  AssociateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FleetName: 0, StackName: 0 } },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFleet",
})) as any;

export type AssociateSoftwareToImageBuilderError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates license included application(s) with an existing image builder instance.
 */
export const associateSoftwareToImageBuilder: API.OperationMethod<
  AssociateSoftwareToImageBuilderRequest,
  AssociateSoftwareToImageBuilderResult,
  AssociateSoftwareToImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageBuilderName: 0, SoftwareNames: 0 },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSoftwareToImageBuilder",
})) as any;

export type BatchAssociateUserStackError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Associates the specified users with the specified stacks. Users in a user pool cannot be assigned to stacks with fleets that are joined to an Active Directory domain.
 */
export const batchAssociateUserStack: API.OperationMethod<
  BatchAssociateUserStackRequest,
  BatchAssociateUserStackResult,
  BatchAssociateUserStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserStackAssociations: D.list(i_UserStackAssociation) },
    output: { errors: D.list(o_UserStackAssociationError) },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateUserStack",
})) as any;

export type BatchDisassociateUserStackError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Disassociates the specified users from the specified stacks.
 */
export const batchDisassociateUserStack: API.OperationMethod<
  BatchDisassociateUserStackRequest,
  BatchDisassociateUserStackResult,
  BatchDisassociateUserStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserStackAssociations: D.list(i_UserStackAssociation) },
    output: { errors: D.list(o_UserStackAssociationError) },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateUserStack",
})) as any;

export type CopyImageError =
  | IncompatibleImageException
  | InvalidAccountStatusException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Copies the image within the same region or to a new region within the same AWS account. Note that any tags you added to the image will not be copied.
 */
export const copyImage: API.OperationMethod<
  CopyImageRequest,
  CopyImageResponse,
  CopyImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SourceImageName: 0,
      DestinationImageName: 0,
      DestinationRegion: 0,
      DestinationImageDescription: 0,
    },
  },
  errors: [
    IncompatibleImageException,
    InvalidAccountStatusException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyImage",
})) as any;

export type CreateAppBlockError =
  | ConcurrentModificationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates an app block.
 *
 * App blocks are a WorkSpaces Applications resource that stores the details about the
 * virtual hard disk in an S3 bucket. It also stores the setup script with details about
 * how to mount the virtual hard disk. The virtual hard disk includes the application
 * binaries and other files necessary to launch your applications. Multiple applications
 * can be assigned to a single app block.
 *
 * This is only supported for Elastic fleets.
 */
export const createAppBlock: API.OperationMethod<
  CreateAppBlockRequest,
  CreateAppBlockResult,
  CreateAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      DisplayName: 0,
      SourceS3Location: i_S3Location,
      SetupScriptDetails: i_ScriptDetails,
      Tags: 0,
      PostSetupScriptDetails: i_ScriptDetails,
      PackagingType: 0,
    },
    output: { AppBlock: o_AppBlock },
  },
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlock",
})) as any;

export type CreateAppBlockBuilderError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an app block builder.
 */
export const createAppBlockBuilder: API.OperationMethod<
  CreateAppBlockBuilderRequest,
  CreateAppBlockBuilderResult,
  CreateAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      DisplayName: 0,
      Tags: 0,
      Platform: 0,
      InstanceType: 0,
      VpcConfig: i_VpcConfig,
      EnableDefaultInternetAccess: 0,
      IamRoleArn: 0,
      AccessEndpoints: D.list(i_AccessEndpoint),
      DisableIMDSV1: 0,
    },
    output: { AppBlockBuilder: o_AppBlockBuilder },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlockBuilder",
})) as any;

export type CreateAppBlockBuilderStreamingURLError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a URL to start a create app block builder streaming session.
 */
export const createAppBlockBuilderStreamingURL: API.OperationMethod<
  CreateAppBlockBuilderStreamingURLRequest,
  CreateAppBlockBuilderStreamingURLResult,
  CreateAppBlockBuilderStreamingURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AppBlockBuilderName: 0, Validity: 0 },
    output: { Expires: D.ts },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlockBuilderStreamingURL",
})) as any;

export type CreateApplicationError =
  | ConcurrentModificationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an application.
 *
 * Applications are a WorkSpaces Applications resource that stores the details about how to
 * launch applications on Elastic fleet streaming instances. An application consists of the
 * launch details, icon, and display name. Applications are associated with an app block
 * that contains the application binaries and other files. The applications assigned to an
 * Elastic fleet are the applications users can launch.
 *
 * This is only supported for Elastic fleets.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResult,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      DisplayName: 0,
      Description: 0,
      IconS3Location: i_S3Location,
      LaunchPath: 0,
      WorkingDirectory: 0,
      LaunchParameters: 0,
      Platforms: 0,
      InstanceFamilies: 0,
      AppBlockArn: 0,
      Tags: 0,
    },
    output: { Application: o_Application },
  },
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateDirectoryConfigError =
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a Directory Config object in WorkSpaces Applications. This object includes the configuration information required to join fleets and image builders to Microsoft Active Directory domains.
 */
export const createDirectoryConfig: API.OperationMethod<
  CreateDirectoryConfigRequest,
  CreateDirectoryConfigResult,
  CreateDirectoryConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryName: 0,
      OrganizationalUnitDistinguishedNames: 0,
      ServiceAccountCredentials: i_ServiceAccountCredentials,
      CertificateBasedAuthProperties: i_CertificateBasedAuthProperties,
    },
    output: { DirectoryConfig: o_DirectoryConfig },
  },
  errors: [
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectoryConfig",
})) as any;

export type CreateEntitlementError =
  | EntitlementAlreadyExistsException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new entitlement. Entitlements control access to specific applications within
 * a stack, based on user attributes. Entitlements apply to SAML 2.0 federated user
 * identities. WorkSpaces Applications user pool and streaming URL users are entitled to all
 * applications in a stack. Entitlements don't apply to the desktop stream view
 * application, or to applications managed by a dynamic app provider using the Dynamic
 * Application Framework.
 */
export const createEntitlement: API.OperationMethod<
  CreateEntitlementRequest,
  CreateEntitlementResult,
  CreateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      StackName: 0,
      Description: 0,
      AppVisibility: 0,
      Attributes: D.list(i_EntitlementAttribute),
    },
    output: { Entitlement: o_Entitlement },
  },
  errors: [
    EntitlementAlreadyExistsException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntitlement",
})) as any;

export type CreateExportImageTaskError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a task to export a WorkSpaces Applications image to an EC2 AMI. This allows you to use your customized WorkSpaces Applications images with other AWS services or for backup purposes.
 */
export const createExportImageTask: API.OperationMethod<
  CreateExportImageTaskRequest,
  CreateExportImageTaskResult,
  CreateExportImageTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ImageName: 0,
      AmiName: 0,
      IamRoleArn: 0,
      TagSpecifications: 0,
      AmiDescription: 0,
    },
    output: { ExportImageTask: o_ExportImageTask },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportImageTask",
})) as any;

export type CreateFleetError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a fleet. A fleet consists of streaming instances that your users access for their applications and desktops.
 */
export const createFleet: API.OperationMethod<
  CreateFleetRequest,
  CreateFleetResult,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ImageName: 0,
      ImageArn: 0,
      InstanceType: 0,
      FleetType: 0,
      ComputeCapacity: i_ComputeCapacity,
      VpcConfig: i_VpcConfig,
      MaxUserDurationInSeconds: 0,
      DisconnectTimeoutInSeconds: 0,
      Description: 0,
      DisplayName: 0,
      EnableDefaultInternetAccess: 0,
      DomainJoinInfo: i_DomainJoinInfo,
      Tags: 0,
      IdleDisconnectTimeoutInSeconds: 0,
      IamRoleArn: 0,
      StreamView: 0,
      Platform: 0,
      MaxConcurrentSessions: 0,
      UsbDeviceFilterStrings: 0,
      SessionScriptS3Location: i_S3Location,
      MaxSessionsPerInstance: 0,
      RootVolumeConfig: i_VolumeConfig,
      DisableIMDSV1: 0,
    },
    output: { Fleet: o_Fleet },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
})) as any;

export type CreateImageBuilderError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an image builder. An image builder is a virtual machine that is used to create an image.
 *
 * The initial state of the builder is `PENDING`. When it is ready, the state is `RUNNING`.
 */
export const createImageBuilder: API.OperationMethod<
  CreateImageBuilderRequest,
  CreateImageBuilderResult,
  CreateImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ImageName: 0,
      ImageArn: 0,
      InstanceType: 0,
      Description: 0,
      DisplayName: 0,
      VpcConfig: i_VpcConfig,
      IamRoleArn: 0,
      EnableDefaultInternetAccess: 0,
      DomainJoinInfo: i_DomainJoinInfo,
      AppstreamAgentVersion: 0,
      Tags: 0,
      AccessEndpoints: D.list(i_AccessEndpoint),
      RootVolumeConfig: i_VolumeConfig,
      SoftwaresToInstall: 0,
      SoftwaresToUninstall: 0,
      DisableIMDSV1: 0,
    },
    output: { ImageBuilder: o_ImageBuilder },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImageBuilder",
})) as any;

export type CreateImageBuilderStreamingURLError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a URL to start an image builder streaming session.
 */
export const createImageBuilderStreamingURL: API.OperationMethod<
  CreateImageBuilderStreamingURLRequest,
  CreateImageBuilderStreamingURLResult,
  CreateImageBuilderStreamingURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, Validity: 0 },
    output: { Expires: D.ts },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImageBuilderStreamingURL",
})) as any;

export type CreateImportedImageError =
  | DryRunOperationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a custom WorkSpaces Applications image by importing an EC2 AMI. This allows you to use your own customized AMI to create WorkSpaces Applications images that support additional instance types beyond the standard stream.* instances.
 */
export const createImportedImage: API.OperationMethod<
  CreateImportedImageRequest,
  CreateImportedImageResult,
  CreateImportedImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      SourceAmiId: 0,
      WorkspaceImageId: 0,
      IamRoleArn: 0,
      Description: 0,
      DisplayName: 0,
      Tags: 0,
      RuntimeValidationConfig: { IntendedInstanceType: 0 },
      AgentSoftwareVersion: 0,
      AppCatalogConfig: D.list({
        Name: 0,
        DisplayName: 0,
        AbsoluteAppPath: 0,
        AbsoluteIconPath: 0,
        AbsoluteManifestPath: 0,
        WorkingDirectory: 0,
        LaunchParameters: 0,
      }),
      DryRun: 0,
    },
    output: { Image: o_Image },
  },
  errors: [
    DryRunOperationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportedImage",
})) as any;

export type CreateStackError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a stack to start streaming applications to users. A stack consists of an associated fleet, user access policies, and storage configurations.
 */
export const createStack: API.OperationMethod<
  CreateStackRequest,
  CreateStackResult,
  CreateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      DisplayName: 0,
      StorageConnectors: D.list(i_StorageConnector),
      RedirectURL: 0,
      FeedbackURL: 0,
      UserSettings: D.list(i_UserSetting),
      ApplicationSettings: i_ApplicationSettings,
      Tags: 0,
      AccessEndpoints: D.list(i_AccessEndpoint),
      EmbedHostDomains: 0,
      StreamingExperienceSettings: i_StreamingExperienceSettings,
      ContentRedirection: i_ContentRedirection,
      AgentAccessConfig: {
        Settings: D.list(i_AgentAccessSetting),
        S3BucketArn: 0,
        ScreenshotsUploadEnabled: 0,
        ScreenResolution: 0,
        ScreenImageFormat: 0,
        UserControlMode: 0,
      },
    },
    output: { Stack: o_Stack },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStack",
})) as any;

export type CreateStreamingURLError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a temporary URL to start an WorkSpaces Applications streaming session for the specified user. A streaming URL enables application streaming to be tested without user setup.
 */
export const createStreamingURL: API.OperationMethod<
  CreateStreamingURLRequest,
  CreateStreamingURLResult,
  CreateStreamingURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      FleetName: 0,
      UserId: 0,
      ApplicationId: 0,
      Validity: 0,
      SessionContext: 0,
    },
    output: { Expires: D.ts },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamingURL",
})) as any;

export type CreateThemeForStackError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates custom branding that customizes the appearance of the streaming application catalog page.
 */
export const createThemeForStack: API.OperationMethod<
  CreateThemeForStackRequest,
  CreateThemeForStackResult,
  CreateThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      FooterLinks: D.list(i_ThemeFooterLink),
      TitleText: 0,
      ThemeStyling: 0,
      OrganizationLogoS3Location: i_S3Location,
      FaviconS3Location: i_S3Location,
    },
    output: { Theme: o_Theme },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThemeForStack",
})) as any;

export type CreateUpdatedImageError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new image with the latest Windows operating system updates, driver updates, and WorkSpaces Applications agent software.
 *
 * For more information, see the "Update an Image by Using
 * Managed WorkSpaces Applications Image Updates" section in Administer Your WorkSpaces Applications Images, in the *Amazon WorkSpaces Applications Administration Guide*.
 */
export const createUpdatedImage: API.OperationMethod<
  CreateUpdatedImageRequest,
  CreateUpdatedImageResult,
  CreateUpdatedImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      existingImageName: 0,
      newImageName: 0,
      newImageDescription: 0,
      newImageDisplayName: 0,
      newImageTags: 0,
      dryRun: 0,
    },
    output: { image: o_Image },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUpdatedImage",
})) as any;

export type CreateUsageReportSubscriptionError =
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a usage report subscription. Usage reports are generated daily.
 */
export const createUsageReportSubscription: API.OperationMethod<
  CreateUsageReportSubscriptionRequest,
  CreateUsageReportSubscriptionResult,
  CreateUsageReportSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageReportSubscription",
})) as any;

export type CreateUserError =
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a new user in the user pool.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResult,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserName: 0,
      MessageAction: 0,
      FirstName: 0,
      LastName: 0,
      AuthenticationType: 0,
    },
  },
  errors: [
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
})) as any;

export type DeleteAppBlockError =
  | ConcurrentModificationException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an app block.
 */
export const deleteAppBlock: API.OperationMethod<
  DeleteAppBlockRequest,
  DeleteAppBlockResult,
  DeleteAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBlock",
})) as any;

export type DeleteAppBlockBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an app block builder.
 *
 * An app block builder can only be deleted when it has no association with an app
 * block.
 */
export const deleteAppBlockBuilder: API.OperationMethod<
  DeleteAppBlockBuilderRequest,
  DeleteAppBlockBuilderResult,
  DeleteAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBlockBuilder",
})) as any;

export type DeleteApplicationError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResult,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteDirectoryConfigError =
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified Directory Config object from WorkSpaces Applications. This object includes the information required to join streaming instances to an Active Directory domain.
 */
export const deleteDirectoryConfig: API.OperationMethod<
  DeleteDirectoryConfigRequest,
  DeleteDirectoryConfigResult,
  DeleteDirectoryConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DirectoryName: 0 } },
  errors: [ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectoryConfig",
})) as any;

export type DeleteEntitlementError =
  | ConcurrentModificationException
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified entitlement.
 */
export const deleteEntitlement: API.OperationMethod<
  DeleteEntitlementRequest,
  DeleteEntitlementResult,
  DeleteEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, StackName: 0 } },
  errors: [
    ConcurrentModificationException,
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntitlement",
})) as any;

export type DeleteFleetError =
  | ConcurrentModificationException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified fleet.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetRequest,
  DeleteFleetResult,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
})) as any;

export type DeleteImageError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified image. You cannot delete an image when it is in use.
 * After you delete an image, you cannot provision new capacity using the image.
 */
export const deleteImage: API.OperationMethod<
  DeleteImageRequest,
  DeleteImageResult,
  DeleteImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 }, output: { Image: o_Image } },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImage",
})) as any;

export type DeleteImageBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified image builder and releases the capacity.
 */
export const deleteImageBuilder: API.OperationMethod<
  DeleteImageBuilderRequest,
  DeleteImageBuilderResult,
  DeleteImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { ImageBuilder: o_ImageBuilder },
  },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImageBuilder",
})) as any;

export type DeleteImagePermissionsError =
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes permissions for the specified private image. After you delete permissions for an image, AWS accounts to which you previously granted these permissions can no longer use the image.
 */
export const deleteImagePermissions: API.OperationMethod<
  DeleteImagePermissionsRequest,
  DeleteImagePermissionsResult,
  DeleteImagePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0, SharedAccountId: 0 } },
  errors: [ResourceNotAvailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImagePermissions",
})) as any;

export type DeleteStackError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified stack. After the stack is deleted, the application streaming environment provided by the stack is no longer available to users. Also, any reservations made for application streaming sessions for the stack are released.
 */
export const deleteStack: API.OperationMethod<
  DeleteStackRequest,
  DeleteStackResult,
  DeleteStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStack",
})) as any;

export type DeleteThemeForStackError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes custom branding that customizes the appearance of the streaming application catalog page.
 */
export const deleteThemeForStack: API.OperationMethod<
  DeleteThemeForStackRequest,
  DeleteThemeForStackResult,
  DeleteThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StackName: 0 } },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThemeForStack",
})) as any;

export type DeleteUsageReportSubscriptionError =
  | InvalidAccountStatusException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables usage report generation.
 */
export const deleteUsageReportSubscription: API.OperationMethod<
  DeleteUsageReportSubscriptionRequest,
  DeleteUsageReportSubscriptionResult,
  DeleteUsageReportSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageReportSubscription",
})) as any;

export type DeleteUserError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes a user from the user pool.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResult,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, AuthenticationType: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DescribeAppBlockBuilderAppBlockAssociationsError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more app block builder associations.
 */
export const describeAppBlockBuilderAppBlockAssociations: API.PaginatedOperationMethod<
  DescribeAppBlockBuilderAppBlockAssociationsRequest,
  DescribeAppBlockBuilderAppBlockAssociationsResult,
  DescribeAppBlockBuilderAppBlockAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AppBlockArn: 0,
      AppBlockBuilderName: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppBlockBuilderAppBlockAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAppBlockBuildersError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more app block builders.
 */
export const describeAppBlockBuilders: API.PaginatedOperationMethod<
  DescribeAppBlockBuildersRequest,
  DescribeAppBlockBuildersResult,
  DescribeAppBlockBuildersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, NextToken: 0, MaxResults: 0 },
    output: { AppBlockBuilders: D.list(o_AppBlockBuilder) },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppBlockBuilders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAppBlocksError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more app blocks.
 */
export const describeAppBlocks: API.OperationMethod<
  DescribeAppBlocksRequest,
  DescribeAppBlocksResult,
  DescribeAppBlocksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arns: 0, NextToken: 0, MaxResults: 0 },
    output: { AppBlocks: D.list(o_AppBlock) },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppBlocks",
})) as any;

export type DescribeApplicationFleetAssociationsError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more application fleet associations. Either ApplicationArn or FleetName must be specified.
 */
export const describeApplicationFleetAssociations: API.OperationMethod<
  DescribeApplicationFleetAssociationsRequest,
  DescribeApplicationFleetAssociationsResult,
  DescribeApplicationFleetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FleetName: 0, ApplicationArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationFleetAssociations",
})) as any;

export type DescribeApplicationsError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more applications.
 */
export const describeApplications: API.OperationMethod<
  DescribeApplicationsRequest,
  DescribeApplicationsResult,
  DescribeApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arns: 0, NextToken: 0, MaxResults: 0 },
    output: { Applications: D.list(o_Application) },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplications",
})) as any;

export type DescribeAppLicenseUsageError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves license included application usage information.
 */
export const describeAppLicenseUsage: API.OperationMethod<
  DescribeAppLicenseUsageRequest,
  DescribeAppLicenseUsageResult,
  DescribeAppLicenseUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { BillingPeriod: 0, MaxResults: 0, NextToken: 0 },
    output: {
      AppLicenseUsages: D.list({
        SubscriptionFirstUsedDate: D.ts,
        SubscriptionLastUsedDate: D.ts,
      }),
    },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppLicenseUsage",
})) as any;

export type DescribeDirectoryConfigsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified Directory Config objects for WorkSpaces Applications, if the names for these objects are provided. Otherwise, all Directory Config objects in the account are described. These objects include the configuration information required to join fleets and image builders to Microsoft Active Directory domains.
 *
 * Although the response syntax in this topic includes the account password, this password is not returned in the actual response.
 */
export const describeDirectoryConfigs: API.OperationMethod<
  DescribeDirectoryConfigsRequest,
  DescribeDirectoryConfigsResult,
  DescribeDirectoryConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DirectoryNames: 0, MaxResults: 0, NextToken: 0 },
    output: { DirectoryConfigs: D.list(o_DirectoryConfig) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectoryConfigs",
})) as any;

export type DescribeEntitlementsError =
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one of more entitlements.
 */
export const describeEntitlements: API.OperationMethod<
  DescribeEntitlementsRequest,
  DescribeEntitlementsResult,
  DescribeEntitlementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, StackName: 0, NextToken: 0, MaxResults: 0 },
    output: { Entitlements: D.list(o_Entitlement) },
  },
  errors: [
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntitlements",
})) as any;

export type DescribeFleetsError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves a list that describes one or more specified fleets, if the fleet names are provided. Otherwise, all fleets in the account are described.
 */
export const describeFleets: API.OperationMethod<
  DescribeFleetsRequest,
  DescribeFleetsResult,
  DescribeFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, NextToken: 0 },
    output: { Fleets: D.list(o_Fleet) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleets",
})) as any;

export type DescribeImageBuildersError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified image builders, if the image builder names are provided. Otherwise, all image builders in the account are described.
 */
export const describeImageBuilders: API.OperationMethod<
  DescribeImageBuildersRequest,
  DescribeImageBuildersResult,
  DescribeImageBuildersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, MaxResults: 0, NextToken: 0 },
    output: { ImageBuilders: D.list(o_ImageBuilder) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageBuilders",
})) as any;

export type DescribeImagePermissionsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes the permissions for shared AWS account IDs on a private image that you own.
 */
export const describeImagePermissions: API.PaginatedOperationMethod<
  DescribeImagePermissionsRequest,
  DescribeImagePermissionsResult,
  DescribeImagePermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, MaxResults: 0, SharedAwsAccountIds: 0, NextToken: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImagePermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeImagesError =
  | InvalidParameterCombinationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified images, if the image names or image ARNs are provided. Otherwise, all images in the account are described.
 */
export const describeImages: API.PaginatedOperationMethod<
  DescribeImagesRequest,
  DescribeImagesResult,
  DescribeImagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, Arns: 0, Type: 0, NextToken: 0, MaxResults: 0 },
    output: { Images: D.list(o_Image) },
  },
  errors: [InvalidParameterCombinationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSessionsError =
  | InvalidParameterCombinationException
  | CommonErrors;
/**
 * Retrieves a list that describes the streaming sessions for a specified stack and fleet. If a UserId is provided for the stack and fleet,
 * only streaming sessions for that user are described. If an authentication type is not provided,
 * the default is to authenticate users using a streaming URL.
 */
export const describeSessions: API.OperationMethod<
  DescribeSessionsRequest,
  DescribeSessionsResult,
  DescribeSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      FleetName: 0,
      UserId: 0,
      NextToken: 0,
      Limit: 0,
      AuthenticationType: 0,
      InstanceId: 0,
    },
    output: { Sessions: D.list({ StartTime: D.ts, MaxExpirationTime: D.ts }) },
  },
  errors: [InvalidParameterCombinationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSessions",
})) as any;

export type DescribeSoftwareAssociationsError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves license included application associations for a specified resource.
 */
export const describeSoftwareAssociations: API.OperationMethod<
  DescribeSoftwareAssociationsRequest,
  DescribeSoftwareAssociationsResult,
  DescribeSoftwareAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AssociatedResource: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSoftwareAssociations",
})) as any;

export type DescribeStacksError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves a list that describes one or more specified stacks, if the stack names are provided. Otherwise, all stacks in the account are described.
 */
export const describeStacks: API.OperationMethod<
  DescribeStacksRequest,
  DescribeStacksResult,
  DescribeStacksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Names: 0, NextToken: 0 },
    output: { Stacks: D.list(o_Stack) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStacks",
})) as any;

export type DescribeThemeForStackError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes the theme for a specified stack. A theme is custom branding that customizes the appearance of the streaming application catalog page.
 */
export const describeThemeForStack: API.OperationMethod<
  DescribeThemeForStackRequest,
  DescribeThemeForStackResult,
  DescribeThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0 },
    output: { Theme: o_Theme },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThemeForStack",
})) as any;

export type DescribeUsageReportSubscriptionsError =
  | InvalidAccountStatusException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more usage report subscriptions.
 */
export const describeUsageReportSubscriptions: API.OperationMethod<
  DescribeUsageReportSubscriptionsRequest,
  DescribeUsageReportSubscriptionsResult,
  DescribeUsageReportSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: {
      UsageReportSubscriptions: D.list({ LastGeneratedReportDate: D.ts }),
    },
  },
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsageReportSubscriptions",
})) as any;

export type DescribeUsersError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified users in the user pool.
 */
export const describeUsers: API.OperationMethod<
  DescribeUsersRequest,
  DescribeUsersResult,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AuthenticationType: 0, MaxResults: 0, NextToken: 0 },
    output: {
      Users: D.list({
        UserName: D.secret,
        FirstName: D.secret,
        LastName: D.secret,
        CreatedTime: D.ts,
      }),
    },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
})) as any;

export type DescribeUserStackAssociationsError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Retrieves a list that describes the UserStackAssociation objects. You must specify either or both of the following:
 *
 * - The stack name
 *
 * - The user name (email address of the user associated with the stack) and the authentication type for the user
 */
export const describeUserStackAssociations: API.OperationMethod<
  DescribeUserStackAssociationsRequest,
  DescribeUserStackAssociationsResult,
  DescribeUserStackAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      UserName: 0,
      AuthenticationType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { UserStackAssociations: D.list(o_UserStackAssociation) },
  },
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserStackAssociations",
})) as any;

export type DisableUserError = ResourceNotFoundException | CommonErrors;
/**
 * Disables the specified user in the user pool. Users can't sign in to WorkSpaces Applications until they are re-enabled. This action does not delete the user.
 */
export const disableUser: API.OperationMethod<
  DisableUserRequest,
  DisableUserResult,
  DisableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, AuthenticationType: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableUser",
})) as any;

export type DisassociateAppBlockBuilderAppBlockError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a specified app block builder from a specified app block.
 */
export const disassociateAppBlockBuilderAppBlock: API.OperationMethod<
  DisassociateAppBlockBuilderAppBlockRequest,
  DisassociateAppBlockBuilderAppBlockResult,
  DisassociateAppBlockBuilderAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AppBlockArn: 0, AppBlockBuilderName: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAppBlockBuilderAppBlock",
})) as any;

export type DisassociateApplicationFleetError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Disassociates the specified application from the fleet.
 */
export const disassociateApplicationFleet: API.OperationMethod<
  DisassociateApplicationFleetRequest,
  DisassociateApplicationFleetResult,
  DisassociateApplicationFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FleetName: 0, ApplicationArn: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplicationFleet",
})) as any;

export type DisassociateApplicationFromEntitlementError =
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified application from the specified entitlement.
 */
export const disassociateApplicationFromEntitlement: API.OperationMethod<
  DisassociateApplicationFromEntitlementRequest,
  DisassociateApplicationFromEntitlementResult,
  DisassociateApplicationFromEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, EntitlementName: 0, ApplicationIdentifier: 0 },
  },
  errors: [
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplicationFromEntitlement",
})) as any;

export type DisassociateFleetError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified fleet from the specified stack.
 */
export const disassociateFleet: API.OperationMethod<
  DisassociateFleetRequest,
  DisassociateFleetResult,
  DisassociateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FleetName: 0, StackName: 0 } },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFleet",
})) as any;

export type DisassociateSoftwareFromImageBuilderError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes license included application(s) association(s) from an image builder instance.
 */
export const disassociateSoftwareFromImageBuilder: API.OperationMethod<
  DisassociateSoftwareFromImageBuilderRequest,
  DisassociateSoftwareFromImageBuilderResult,
  DisassociateSoftwareFromImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageBuilderName: 0, SoftwareNames: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSoftwareFromImageBuilder",
})) as any;

export type DrainSessionInstanceError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Drains the instance hosting the specified streaming session. The instance stops accepting new sessions while existing sessions continue uninterrupted. Once all sessions end, the instance is reclaimed and replaced. This only applies to multi-session fleets.
 */
export const drainSessionInstance: API.OperationMethod<
  DrainSessionInstanceRequest,
  DrainSessionInstanceResult,
  DrainSessionInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SessionId: 0 } },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DrainSessionInstance",
})) as any;

export type EnableUserError =
  | InvalidAccountStatusException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables a user in the user pool. After being enabled, users can sign in to WorkSpaces Applications and open applications from the stacks to which they are assigned.
 */
export const enableUser: API.OperationMethod<
  EnableUserRequest,
  EnableUserResult,
  EnableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserName: 0, AuthenticationType: 0 } },
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableUser",
})) as any;

export type ExpireSessionError = CommonErrors;
/**
 * Immediately stops the specified streaming session.
 */
export const expireSession: API.OperationMethod<
  ExpireSessionRequest,
  ExpireSessionResult,
  ExpireSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SessionId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExpireSession",
})) as any;

export type GetExportImageTaskError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an export image task, including its current state, progress, and any error details.
 */
export const getExportImageTask: API.OperationMethod<
  GetExportImageTaskRequest,
  GetExportImageTaskResult,
  GetExportImageTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TaskId: 0 },
    output: { ExportImageTask: o_ExportImageTask },
  },
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportImageTask",
})) as any;

export type ListAssociatedFleetsError = CommonErrors;
/**
 * Retrieves the name of the fleet that is associated with the specified stack.
 */
export const listAssociatedFleets: API.OperationMethod<
  ListAssociatedFleetsRequest,
  ListAssociatedFleetsResult,
  ListAssociatedFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StackName: 0, NextToken: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedFleets",
})) as any;

export type ListAssociatedStacksError = CommonErrors;
/**
 * Retrieves the name of the stack with which the specified fleet is associated.
 */
export const listAssociatedStacks: API.OperationMethod<
  ListAssociatedStacksRequest,
  ListAssociatedStacksResult,
  ListAssociatedStacksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FleetName: 0, NextToken: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedStacks",
})) as any;

export type ListEntitledApplicationsError =
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of entitled applications.
 */
export const listEntitledApplications: API.OperationMethod<
  ListEntitledApplicationsRequest,
  ListEntitledApplicationsResult,
  ListEntitledApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StackName: 0, EntitlementName: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitledApplications",
})) as any;

export type ListExportImageTasksError =
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Lists export image tasks, with optional filtering and pagination. Use this operation to monitor the status of multiple export operations.
 */
export const listExportImageTasks: API.OperationMethod<
  ListExportImageTasksRequest,
  ListExportImageTasksResult,
  ListExportImageTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { ExportImageTasks: D.list(o_ExportImageTask) },
  },
  errors: [OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportImageTasks",
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves a list of all tags for the specified WorkSpaces Applications resource. You can tag WorkSpaces Applications image builders, images, fleets, and stacks.
 *
 * For more information about tags, see Tagging Your Resources in the *Amazon WorkSpaces Applications Administration Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartAppBlockBuilderError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts an app block builder.
 *
 * An app block builder can only be started when it's associated with an app
 * block.
 *
 * Starting an app block builder starts a new instance, which is equivalent to an elastic
 * fleet instance with application builder assistance functionality.
 */
export const startAppBlockBuilder: API.OperationMethod<
  StartAppBlockBuilderRequest,
  StartAppBlockBuilderResult,
  StartAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { AppBlockBuilder: o_AppBlockBuilder },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAppBlockBuilder",
})) as any;

export type StartFleetError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the specified fleet.
 */
export const startFleet: API.OperationMethod<
  StartFleetRequest,
  StartFleetResult,
  StartFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFleet",
})) as any;

export type StartImageBuilderError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the specified image builder.
 */
export const startImageBuilder: API.OperationMethod<
  StartImageBuilderRequest,
  StartImageBuilderResult,
  StartImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, AppstreamAgentVersion: 0 },
    output: { ImageBuilder: o_ImageBuilder },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImageBuilder",
})) as any;

export type StartSoftwareDeploymentToImageBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates license included applications deployment to an image builder instance.
 */
export const startSoftwareDeploymentToImageBuilder: API.OperationMethod<
  StartSoftwareDeploymentToImageBuilderRequest,
  StartSoftwareDeploymentToImageBuilderResult,
  StartSoftwareDeploymentToImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ImageBuilderName: 0, RetryFailedDeployments: 0 },
  },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSoftwareDeploymentToImageBuilder",
})) as any;

export type StopAppBlockBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops an app block builder.
 *
 * Stopping an app block builder terminates the instance, and the instance state is not
 * persisted.
 */
export const stopAppBlockBuilder: API.OperationMethod<
  StopAppBlockBuilderRequest,
  StopAppBlockBuilderResult,
  StopAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { AppBlockBuilder: o_AppBlockBuilder },
  },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAppBlockBuilder",
})) as any;

export type StopFleetError =
  | ConcurrentModificationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops the specified fleet.
 */
export const stopFleet: API.OperationMethod<
  StopFleetRequest,
  StopFleetResult,
  StopFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [ConcurrentModificationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFleet",
})) as any;

export type StopImageBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops the specified image builder.
 */
export const stopImageBuilder: API.OperationMethod<
  StopImageBuilderRequest,
  StopImageBuilderResult,
  StopImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { ImageBuilder: o_ImageBuilder },
  },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopImageBuilder",
})) as any;

export type TagResourceError =
  | InvalidAccountStatusException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified WorkSpaces Applications resource. You can tag WorkSpaces Applications image builders, images, fleets, and stacks.
 *
 * Each tag consists of a key and an optional value. If a resource already has a tag with the same key,
 * this operation updates its value.
 *
 * To list the current tags for your resources, use ListTagsForResource.
 * To disassociate tags from your resources, use UntagResource.
 *
 * For more information about tags, see Tagging Your Resources in the *Amazon WorkSpaces Applications Administration Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: 0 } },
  errors: [
    InvalidAccountStatusException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Disassociates one or more specified tags from the specified WorkSpaces Applications resource.
 *
 * To list the current tags for your resources, use ListTagsForResource.
 *
 * For more information about tags, see Tagging Your Resources in the *Amazon WorkSpaces Applications Administration Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAppBlockBuilderError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceInUseException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an app block builder.
 *
 * If the app block builder is in the `STARTING` or `STOPPING`
 * state, you can't update it. If the app block builder is in the `RUNNING`
 * state, you can only update the DisplayName and Description. If the app block builder is
 * in the `STOPPED` state, you can update any attribute except the Name.
 */
export const updateAppBlockBuilder: API.OperationMethod<
  UpdateAppBlockBuilderRequest,
  UpdateAppBlockBuilderResult,
  UpdateAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      DisplayName: 0,
      Platform: 0,
      InstanceType: 0,
      VpcConfig: i_VpcConfig,
      EnableDefaultInternetAccess: 0,
      IamRoleArn: 0,
      AccessEndpoints: D.list(i_AccessEndpoint),
      AttributesToDelete: 0,
      DisableIMDSV1: 0,
    },
    output: { AppBlockBuilder: o_AppBlockBuilder },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceInUseException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppBlockBuilder",
})) as any;

export type UpdateApplicationError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResult,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      DisplayName: 0,
      Description: 0,
      IconS3Location: i_S3Location,
      LaunchPath: 0,
      WorkingDirectory: 0,
      LaunchParameters: 0,
      AppBlockArn: 0,
      AttributesToDelete: 0,
    },
    output: { Application: o_Application },
  },
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateDirectoryConfigError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidRoleException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified Directory Config object in WorkSpaces Applications. This object includes the configuration information required to join fleets and image builders to Microsoft Active Directory domains.
 */
export const updateDirectoryConfig: API.OperationMethod<
  UpdateDirectoryConfigRequest,
  UpdateDirectoryConfigResult,
  UpdateDirectoryConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DirectoryName: 0,
      OrganizationalUnitDistinguishedNames: 0,
      ServiceAccountCredentials: i_ServiceAccountCredentials,
      CertificateBasedAuthProperties: i_CertificateBasedAuthProperties,
    },
    output: { DirectoryConfig: o_DirectoryConfig },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidRoleException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectoryConfig",
})) as any;

export type UpdateEntitlementError =
  | ConcurrentModificationException
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified entitlement.
 */
export const updateEntitlement: API.OperationMethod<
  UpdateEntitlementRequest,
  UpdateEntitlementResult,
  UpdateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      StackName: 0,
      Description: 0,
      AppVisibility: 0,
      Attributes: D.list(i_EntitlementAttribute),
    },
    output: { Entitlement: o_Entitlement },
  },
  errors: [
    ConcurrentModificationException,
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEntitlement",
})) as any;

export type UpdateFleetError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceInUseException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified fleet.
 *
 * If the fleet is in the `STOPPED` state, you can update any attribute except
 * the fleet name.
 *
 * If the fleet is in the `RUNNING` state, you can update the following based
 * on the fleet type:
 *
 * - Always-On and On-Demand fleet types
 *
 * You can update the `DisplayName`, `ComputeCapacity`,
 * `ImageARN`, `ImageName`,
 * `IdleDisconnectTimeoutInSeconds`, and
 * `DisconnectTimeoutInSeconds` attributes.
 *
 * - Elastic fleet type
 *
 * You can update the `DisplayName`,
 * `IdleDisconnectTimeoutInSeconds`,
 * `DisconnectTimeoutInSeconds`, `MaxConcurrentSessions`, `SessionScriptS3Location`
 * and `UsbDeviceFilterStrings` attributes.
 *
 * If the fleet is in the `STARTING` or `STOPPED` state, you can't update it.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetRequest,
  UpdateFleetResult,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ImageName: 0,
      ImageArn: 0,
      Name: 0,
      InstanceType: 0,
      ComputeCapacity: i_ComputeCapacity,
      VpcConfig: i_VpcConfig,
      MaxUserDurationInSeconds: 0,
      DisconnectTimeoutInSeconds: 0,
      DeleteVpcConfig: 0,
      Description: 0,
      DisplayName: 0,
      EnableDefaultInternetAccess: 0,
      DomainJoinInfo: i_DomainJoinInfo,
      IdleDisconnectTimeoutInSeconds: 0,
      AttributesToDelete: 0,
      IamRoleArn: 0,
      StreamView: 0,
      Platform: 0,
      MaxConcurrentSessions: 0,
      UsbDeviceFilterStrings: 0,
      SessionScriptS3Location: i_S3Location,
      MaxSessionsPerInstance: 0,
      RootVolumeConfig: i_VolumeConfig,
      DisableIMDSV1: 0,
    },
    output: { Fleet: o_Fleet },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceInUseException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
})) as any;

export type UpdateImagePermissionsError =
  | LimitExceededException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates permissions for the specified private image.
 */
export const updateImagePermissions: API.OperationMethod<
  UpdateImagePermissionsRequest,
  UpdateImagePermissionsResult,
  UpdateImagePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      SharedAccountId: 0,
      ImagePermissions: { allowFleet: 0, allowImageBuilder: 0 },
    },
  },
  errors: [
    LimitExceededException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImagePermissions",
})) as any;

export type UpdateStackError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified fields for the specified stack.
 */
export const updateStack: API.OperationMethod<
  UpdateStackRequest,
  UpdateStackResult,
  UpdateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DisplayName: 0,
      Description: 0,
      Name: 0,
      StorageConnectors: D.list(i_StorageConnector),
      DeleteStorageConnectors: 0,
      RedirectURL: 0,
      FeedbackURL: 0,
      AttributesToDelete: 0,
      UserSettings: D.list(i_UserSetting),
      ApplicationSettings: i_ApplicationSettings,
      AccessEndpoints: D.list(i_AccessEndpoint),
      EmbedHostDomains: 0,
      StreamingExperienceSettings: i_StreamingExperienceSettings,
      ContentRedirection: i_ContentRedirection,
      AgentAccessConfig: {
        Settings: D.list(i_AgentAccessSetting),
        S3BucketArn: 0,
        ScreenshotsUploadEnabled: 0,
        ScreenResolution: 0,
        ScreenImageFormat: 0,
        UserControlMode: 0,
      },
    },
    output: { Stack: o_Stack },
  },
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStack",
})) as any;

export type UpdateThemeForStackError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates custom branding that customizes the appearance of the streaming application catalog page.
 */
export const updateThemeForStack: API.OperationMethod<
  UpdateThemeForStackRequest,
  UpdateThemeForStackResult,
  UpdateThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StackName: 0,
      FooterLinks: D.list(i_ThemeFooterLink),
      TitleText: 0,
      ThemeStyling: 0,
      OrganizationLogoS3Location: i_S3Location,
      FaviconS3Location: i_S3Location,
      State: 0,
      AttributesToDelete: 0,
    },
    output: { Theme: o_Theme },
  },
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThemeForStack",
})) as any;

const i_AccessEndpoint: D.LazyStruct = () => ({ EndpointType: 0, VpceId: 0 });
const i_AgentAccessSetting: D.LazyStruct = () => ({
  AgentAction: 0,
  Permission: 0,
});
const i_ApplicationSettings: D.LazyStruct = () => ({
  Enabled: 0,
  SettingsGroup: 0,
});
const i_CertificateBasedAuthProperties: D.LazyStruct = () => ({
  Status: 0,
  CertificateAuthorityArn: 0,
});
const i_ComputeCapacity: D.LazyStruct = () => ({
  DesiredInstances: 0,
  DesiredSessions: 0,
});
const i_ContentRedirection: D.LazyStruct = () => ({
  HostToClient: { Enabled: 0, AllowedUrls: 0, DeniedUrls: 0 },
});
const i_DomainJoinInfo: D.LazyStruct = () => ({
  DirectoryName: 0,
  OrganizationalUnitDistinguishedName: 0,
});
const i_EntitlementAttribute: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_S3Location: D.LazyStruct = () => ({ S3Bucket: 0, S3Key: 0 });
const i_ScriptDetails: D.LazyStruct = () => ({
  ScriptS3Location: i_S3Location,
  ExecutablePath: 0,
  ExecutableParameters: 0,
  TimeoutInSeconds: 0,
});
const i_ServiceAccountCredentials: D.LazyStruct = () => ({
  AccountName: 0,
  AccountPassword: 0,
});
const i_StorageConnector: D.LazyStruct = () => ({
  ConnectorType: 0,
  ResourceIdentifier: 0,
  Domains: 0,
  DomainsRequireAdminConsent: 0,
});
const i_StreamingExperienceSettings: D.LazyStruct = () => ({
  PreferredProtocol: 0,
});
const i_ThemeFooterLink: D.LazyStruct = () => ({
  DisplayName: 0,
  FooterLinkURL: 0,
});
const i_UserSetting: D.LazyStruct = () => ({
  Action: 0,
  Permission: 0,
  MaximumLength: 0,
});
const i_UserStackAssociation: D.LazyStruct = () => ({
  StackName: 0,
  UserName: 0,
  AuthenticationType: 0,
  SendEmailNotification: 0,
});
const i_VolumeConfig: D.LazyStruct = () => ({ VolumeSizeInGb: 0 });
const i_VpcConfig: D.LazyStruct = () => ({ SubnetIds: 0, SecurityGroupIds: 0 });
const o_AppBlock: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_AppBlockBuilder: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  AppBlockBuilderErrors: D.list(o_ResourceError),
});
const o_Application: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_DirectoryConfig: D.LazyStruct = () => ({
  ServiceAccountCredentials: {
    AccountName: D.secret,
    AccountPassword: D.secret,
  },
  CreatedTime: D.ts,
});
const o_Entitlement: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  LastModifiedTime: D.ts,
});
const o_ExportImageTask: D.LazyStruct = () => ({ CreatedDate: D.ts });
const o_Fleet: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_Image: D.LazyStruct = () => ({
  Applications: D.list(o_Application),
  CreatedTime: D.ts,
  PublicBaseImageReleasedDate: D.ts,
  ImageErrors: D.list(o_ResourceError),
});
const o_ImageBuilder: D.LazyStruct = () => ({
  CreatedTime: D.ts,
  ImageBuilderErrors: D.list(o_ResourceError),
});
const o_Stack: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_Theme: D.LazyStruct = () => ({ CreatedTime: D.ts });
const o_UserStackAssociation: D.LazyStruct = () => ({ UserName: D.secret });
const o_UserStackAssociationError: D.LazyStruct = () => ({
  UserStackAssociation: o_UserStackAssociation,
});
const o_ResourceError: D.LazyStruct = () => ({ ErrorTimestamp: D.ts });
