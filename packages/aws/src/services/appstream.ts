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
  sdkId: "AppStream",
  serviceShapeName: "PhotonAdminProxyService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "appstream" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-12-01");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appstream2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://appstream2.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://appstream2.${Region}.amazonaws.com`);
        }
        return e(`https://appstream2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://appstream2.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DryRunOperationException
  extends /*@__PURE__*/ S.TaggedError<DryRunOperationException>()(
    "DryRunOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class EntitlementAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EntitlementAlreadyExistsException>()(
    "EntitlementAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EntitlementNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EntitlementNotFoundException>()(
    "EntitlementNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IncompatibleImageException
  extends /*@__PURE__*/ S.TaggedError<IncompatibleImageException>()(
    "IncompatibleImageException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidAccountStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidAccountStatusException>()(
    "InvalidAccountStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRoleException
  extends /*@__PURE__*/ S.TaggedError<InvalidRoleException>()(
    "InvalidRoleException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RequestLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceededException>()(
    "RequestLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotAvailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotAvailableException>()(
    "ResourceNotAvailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
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
export type AuthenticationType = "API" | "SAML" | "USERPOOL" | "AWS_AD" | (string & {});
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
export type AppBlockBuilderState = "STARTING" | "RUNNING" | "STOPPING" | "STOPPED" | (string & {});
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
export type AppBlockBuilderStateChangeReasonCode = "INTERNAL_ERROR" | (string & {});
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
  Application?: Application & { IconS3Location: S3Location & { S3Bucket: S3Bucket } };
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
export type FleetState = "STARTING" | "RUNNING" | "STOPPING" | "STOPPED" | (string & {});
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
export type AgentSoftwareVersion = "CURRENT_LATEST" | "ALWAYS_LATEST" | (string & {});
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
export type NvidiaGridDriverVersion = string;
export interface ImageSoftwareMetadata {
  nvidiaGridDriverVersion?: string;
}
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
  ImageSoftwareMetadata?: ImageSoftwareMetadata;
}
export interface CreateImportedImageResult {
  Image?: Image & {
    Name: string;
    Applications: (Application & { IconS3Location: S3Location & { S3Bucket: S3Bucket } })[];
  };
}
export type StorageConnectorType = "HOMEFOLDERS" | "GOOGLE_DRIVE" | "ONE_DRIVE" | (string & {});
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
export type UserControlMode = "VIEW_ONLY" | "VIEW_STOP" | "DISABLED" | (string & {});
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
export type StackErrorCode = "STORAGE_CONNECTOR_ERROR" | "INTERNAL_SERVICE_ERROR" | (string & {});
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
    StorageConnectors: (StorageConnector & { ConnectorType: StorageConnectorType })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & { AgentAction: AgentAction; Permission: Permission })[];
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
export type ThemeStyling = "LIGHT_BLUE" | "BLUE" | "PINK" | "RED" | (string & {});
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
    Applications: (Application & { IconS3Location: S3Location & { S3Bucket: S3Bucket } })[];
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
    Applications: (Application & { IconS3Location: S3Location & { S3Bucket: S3Bucket } })[];
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
export type AppBlockBuilderAppBlockAssociationsList = AppBlockBuilderAppBlockAssociation[];
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
  Applications?: (Application & { IconS3Location: S3Location & { S3Bucket: S3Bucket } })[];
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
    Applications: (Application & { IconS3Location: S3Location & { S3Bucket: S3Bucket } })[];
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
export type SessionConnectionState = "CONNECTED" | "NOT_CONNECTED" | (string & {});
export type InstanceDrainStatus = "ACTIVE" | "DRAINING" | "NOT_APPLICABLE" | (string & {});
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
    StorageConnectors: (StorageConnector & { ConnectorType: StorageConnectorType })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & { AgentAction: AgentAction; Permission: Permission })[];
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
export type LastReportGenerationExecutionErrors = LastReportGenerationExecutionError[];
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
  EntitledApplications?: (EntitledApplication & { ApplicationIdentifier: string })[];
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
export type ApplicationAttribute = "LAUNCH_PARAMETERS" | "WORKING_DIRECTORY" | (string & {});
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
  Application?: Application & { IconS3Location: S3Location & { S3Bucket: S3Bucket } };
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
    StorageConnectors: (StorageConnector & { ConnectorType: StorageConnectorType })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & { AgentAction: AgentAction; Permission: Permission })[];
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
  input: __S(64, __c4, 0) as any as S.Schema<AssociateAppBlockBuilderAppBlockRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<AssociateAppBlockBuilderAppBlockResult>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<AssociateApplicationFleetRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<AssociateApplicationFleetResult>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<AssociateApplicationToEntitlementRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<AssociateApplicationToEntitlementResult>,
  errors: [
    EntitlementNotFoundException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplicationToEntitlement",
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<AssociateFleetRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<AssociateFleetResult>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<AssociateSoftwareToImageBuilderRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<AssociateSoftwareToImageBuilderResult>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<BatchAssociateUserStackRequest>,
  output: __S(226, __c14, 2) as any as S.Schema<BatchAssociateUserStackResult>,
  errors: [InvalidParameterCombinationException, OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateUserStack",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<BatchDisassociateUserStackRequest>,
  output: __S(226, __c14, 2) as any as S.Schema<BatchDisassociateUserStackResult>,
  errors: [InvalidParameterCombinationException, OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateUserStack",
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<CopyImageRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<CopyImageResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<CreateAppBlockRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<CreateAppBlockResult>,
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlock",
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<CreateAppBlockBuilderRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<CreateAppBlockBuilderResult>,
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
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<CreateAppBlockBuilderStreamingURLRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<CreateAppBlockBuilderStreamingURLResult>,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlockBuilderStreamingURL",
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<CreateApplicationResult>,
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
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<CreateDirectoryConfigRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<CreateDirectoryConfigResult>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<CreateEntitlementRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<CreateEntitlementResult>,
  errors: [
    EntitlementAlreadyExistsException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntitlement",
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<CreateExportImageTaskRequest>,
  output: __S(672, __c42, 0) as any as S.Schema<CreateExportImageTaskResult>,
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
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<CreateFleetRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<CreateFleetResult>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<CreateImageBuilderRequest>,
  output: __S(832, __c52, 0) as any as S.Schema<CreateImageBuilderResult>,
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
}));

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
  input: __S(848, __c53, 0) as any as S.Schema<CreateImageBuilderStreamingURLRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<CreateImageBuilderStreamingURLResult>,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImageBuilderStreamingURL",
}));

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
  input: __S(867, __c54, 3) as any as S.Schema<CreateImportedImageRequest>,
  output: __S(928, __c58, 0) as any as S.Schema<CreateImportedImageResult>,
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
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<CreateStackRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<CreateStackResult>,
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
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<CreateStreamingURLRequest>,
  output: __S(480, __c30, 0) as any as S.Schema<CreateStreamingURLResult>,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamingURL",
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<CreateThemeForStackRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<CreateThemeForStackResult>,
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
}));

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
  input: __S(1040, __c65, 0) as any as S.Schema<CreateUpdatedImageRequest>,
  output: __S(1041, __c65, 1) as any as S.Schema<CreateUpdatedImageResult>,
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
}));

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
  input: __S(1056, __c66, 0) as any as S.Schema<CreateUsageReportSubscriptionRequest>,
  output: __S(1057, __c66, 1) as any as S.Schema<CreateUsageReportSubscriptionResult>,
  errors: [InvalidAccountStatusException, InvalidRoleException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageReportSubscription",
}));

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
  input: __S(1072, __c67, 0) as any as S.Schema<CreateUserRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<CreateUserResult>,
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
}));

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
  input: __S(1088, __c68, 0) as any as S.Schema<DeleteAppBlockRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteAppBlockResult>,
  errors: [ConcurrentModificationException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBlock",
}));

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
  input: __S(1104, __c69, 0) as any as S.Schema<DeleteAppBlockBuilderRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteAppBlockBuilderResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBlockBuilder",
}));

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
  input: __S(1120, __c70, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteApplicationResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

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
  input: __S(1136, __c71, 0) as any as S.Schema<DeleteDirectoryConfigRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteDirectoryConfigResult>,
  errors: [ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectoryConfig",
}));

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
  input: __S(1152, __c72, 0) as any as S.Schema<DeleteEntitlementRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteEntitlementResult>,
  errors: [
    ConcurrentModificationException,
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntitlement",
}));

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
  input: __S(1168, __c73, 0) as any as S.Schema<DeleteFleetRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteFleetResult>,
  errors: [ConcurrentModificationException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
}));

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
  input: __S(1184, __c74, 0) as any as S.Schema<DeleteImageRequest>,
  output: __S(928, __c58, 0) as any as S.Schema<DeleteImageResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImage",
}));

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
  input: __S(1200, __c75, 0) as any as S.Schema<DeleteImageBuilderRequest>,
  output: __S(832, __c52, 0) as any as S.Schema<DeleteImageBuilderResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImageBuilder",
}));

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
  input: __S(1216, __c76, 0) as any as S.Schema<DeleteImagePermissionsRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteImagePermissionsResult>,
  errors: [ResourceNotAvailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImagePermissions",
}));

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
  input: __S(1232, __c77, 0) as any as S.Schema<DeleteStackRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteStackResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStack",
}));

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
  input: __S(1248, __c78, 0) as any as S.Schema<DeleteThemeForStackRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteThemeForStackResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThemeForStack",
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<DeleteUsageReportSubscriptionRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteUsageReportSubscriptionResult>,
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageReportSubscription",
}));

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
  input: __S(1280, __c80, 0) as any as S.Schema<DeleteUserRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteUserResult>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

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
  input: __S(1296, __c81, 0) as any as S.Schema<DescribeAppBlockBuilderAppBlockAssociationsRequest>,
  output: __S(1298, __c81, 2) as any as S.Schema<DescribeAppBlockBuilderAppBlockAssociationsResult>,
  errors: [InvalidParameterCombinationException, OperationNotPermittedException],
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
  input: __S(1312, __c82, 0) as any as S.Schema<DescribeAppBlockBuildersRequest>,
  output: __S(1314, __c82, 2) as any as S.Schema<DescribeAppBlockBuildersResult>,
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
  input: __S(1328, __c83, 0) as any as S.Schema<DescribeAppBlocksRequest>,
  output: __S(1330, __c83, 2) as any as S.Schema<DescribeAppBlocksResult>,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppBlocks",
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<DescribeApplicationFleetAssociationsRequest>,
  output: __S(1346, __c84, 2) as any as S.Schema<DescribeApplicationFleetAssociationsResult>,
  errors: [InvalidParameterCombinationException, OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationFleetAssociations",
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<DescribeApplicationsRequest>,
  output: __S(1361, __c85, 1) as any as S.Schema<DescribeApplicationsResult>,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplications",
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<DescribeAppLicenseUsageRequest>,
  output: __S(1379, __c86, 3) as any as S.Schema<DescribeAppLicenseUsageResult>,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppLicenseUsage",
}));

export type DescribeDirectoryConfigsError = ResourceNotFoundException | CommonErrors;
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
  input: __S(1392, __c87, 0) as any as S.Schema<DescribeDirectoryConfigsRequest>,
  output: __S(1394, __c87, 2) as any as S.Schema<DescribeDirectoryConfigsResult>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectoryConfigs",
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<DescribeEntitlementsRequest>,
  output: __S(1410, __c88, 2) as any as S.Schema<DescribeEntitlementsResult>,
  errors: [EntitlementNotFoundException, OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntitlements",
}));

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
  input: __S(1424, __c89, 0) as any as S.Schema<DescribeFleetsRequest>,
  output: __S(1426, __c89, 2) as any as S.Schema<DescribeFleetsResult>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleets",
}));

export type DescribeImageBuildersError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves a list that describes one or more specified image builders, if the image builder names are provided. Otherwise, all image builders in the account are described.
 */
export const describeImageBuilders: API.OperationMethod<
  DescribeImageBuildersRequest,
  DescribeImageBuildersResult,
  DescribeImageBuildersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<DescribeImageBuildersRequest>,
  output: __S(1442, __c90, 2) as any as S.Schema<DescribeImageBuildersResult>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageBuilders",
}));

export type DescribeImagePermissionsError = ResourceNotFoundException | CommonErrors;
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
  input: __S(1456, __c91, 0) as any as S.Schema<DescribeImagePermissionsRequest>,
  output: __S(1459, __c91, 3) as any as S.Schema<DescribeImagePermissionsResult>,
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
  input: __S(1472, __c92, 0) as any as S.Schema<DescribeImagesRequest>,
  output: __S(1474, __c92, 2) as any as S.Schema<DescribeImagesResult>,
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

export type DescribeSessionsError = InvalidParameterCombinationException | CommonErrors;
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
  input: __S(1488, __c93, 0) as any as S.Schema<DescribeSessionsRequest>,
  output: __S(1491, __c93, 3) as any as S.Schema<DescribeSessionsResult>,
  errors: [InvalidParameterCombinationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSessions",
}));

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
  input: __S(1504, __c94, 0) as any as S.Schema<DescribeSoftwareAssociationsRequest>,
  output: __S(1507, __c94, 3) as any as S.Schema<DescribeSoftwareAssociationsResult>,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSoftwareAssociations",
}));

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
  input: __S(1520, __c95, 0) as any as S.Schema<DescribeStacksRequest>,
  output: __S(1522, __c95, 2) as any as S.Schema<DescribeStacksResult>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStacks",
}));

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
  input: __S(1536, __c96, 0) as any as S.Schema<DescribeThemeForStackRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<DescribeThemeForStackResult>,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThemeForStack",
}));

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
  input: __S(1552, __c97, 0) as any as S.Schema<DescribeUsageReportSubscriptionsRequest>,
  output: __S(1555, __c97, 3) as any as S.Schema<DescribeUsageReportSubscriptionsResult>,
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsageReportSubscriptions",
}));

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
  input: __S(1568, __c98, 0) as any as S.Schema<DescribeUsersRequest>,
  output: __S(1571, __c98, 3) as any as S.Schema<DescribeUsersResult>,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
}));

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
  input: __S(1584, __c99, 0) as any as S.Schema<DescribeUserStackAssociationsRequest>,
  output: __S(1585, __c99, 1) as any as S.Schema<DescribeUserStackAssociationsResult>,
  errors: [InvalidParameterCombinationException, OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserStackAssociations",
}));

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
  input: __S(1600, __c100, 0) as any as S.Schema<DisableUserRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DisableUserResult>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableUser",
}));

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
  input: __S(1616, __c101, 0) as any as S.Schema<DisassociateAppBlockBuilderAppBlockRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DisassociateAppBlockBuilderAppBlockResult>,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAppBlockBuilderAppBlock",
}));

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
  input: __S(1632, __c102, 0) as any as S.Schema<DisassociateApplicationFleetRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DisassociateApplicationFleetResult>,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplicationFleet",
}));

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
  input: __S(1648, __c103, 0) as any as S.Schema<DisassociateApplicationFromEntitlementRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DisassociateApplicationFromEntitlementResult>,
  errors: [EntitlementNotFoundException, OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplicationFromEntitlement",
}));

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
  input: __S(1664, __c104, 0) as any as S.Schema<DisassociateFleetRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DisassociateFleetResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFleet",
}));

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
  input: __S(1680, __c105, 0) as any as S.Schema<DisassociateSoftwareFromImageBuilderRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DisassociateSoftwareFromImageBuilderResult>,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSoftwareFromImageBuilder",
}));

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
  input: __S(1696, __c106, 0) as any as S.Schema<DrainSessionInstanceRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DrainSessionInstanceResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DrainSessionInstance",
}));

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
  input: __S(1712, __c107, 0) as any as S.Schema<EnableUserRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<EnableUserResult>,
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableUser",
}));

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
  input: __S(1728, __c108, 0) as any as S.Schema<ExpireSessionRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<ExpireSessionResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExpireSession",
}));

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
  input: __S(1744, __c109, 0) as any as S.Schema<GetExportImageTaskRequest>,
  output: __S(672, __c42, 0) as any as S.Schema<GetExportImageTaskResult>,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportImageTask",
}));

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
  input: __S(1760, __c110, 0) as any as S.Schema<ListAssociatedFleetsRequest>,
  output: __S(1776, __c111, 0) as any as S.Schema<ListAssociatedFleetsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedFleets",
}));

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
  input: __S(1792, __c112, 0) as any as S.Schema<ListAssociatedStacksRequest>,
  output: __S(1776, __c111, 0) as any as S.Schema<ListAssociatedStacksResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedStacks",
}));

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
  input: __S(1808, __c113, 0) as any as S.Schema<ListEntitledApplicationsRequest>,
  output: __S(1811, __c113, 3) as any as S.Schema<ListEntitledApplicationsResult>,
  errors: [EntitlementNotFoundException, OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitledApplications",
}));

export type ListExportImageTasksError = OperationNotPermittedException | CommonErrors;
/**
 * Lists export image tasks, with optional filtering and pagination. Use this operation to monitor the status of multiple export operations.
 */
export const listExportImageTasks: API.OperationMethod<
  ListExportImageTasksRequest,
  ListExportImageTasksResult,
  ListExportImageTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1826, __c114, 2) as any as S.Schema<ListExportImageTasksRequest>,
  output: __S(1828, __c114, 4) as any as S.Schema<ListExportImageTasksResult>,
  errors: [OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportImageTasks",
}));

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
  input: __S(1840, __c115, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1841, __c115, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(1856, __c116, 0) as any as S.Schema<StartAppBlockBuilderRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<StartAppBlockBuilderResult>,
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
}));

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
  input: __S(1872, __c117, 0) as any as S.Schema<StartFleetRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<StartFleetResult>,
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
}));

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
  input: __S(1888, __c118, 0) as any as S.Schema<StartImageBuilderRequest>,
  output: __S(832, __c52, 0) as any as S.Schema<StartImageBuilderResult>,
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
}));

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
  input: __S(1904, __c119, 0) as any as S.Schema<StartSoftwareDeploymentToImageBuilderRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<StartSoftwareDeploymentToImageBuilderResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSoftwareDeploymentToImageBuilder",
}));

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
  input: __S(1920, __c120, 0) as any as S.Schema<StopAppBlockBuilderRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<StopAppBlockBuilderResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAppBlockBuilder",
}));

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
  input: __S(1936, __c121, 0) as any as S.Schema<StopFleetRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<StopFleetResult>,
  errors: [ConcurrentModificationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFleet",
}));

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
  input: __S(1952, __c122, 0) as any as S.Schema<StopImageBuilderRequest>,
  output: __S(832, __c52, 0) as any as S.Schema<StopImageBuilderResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopImageBuilder",
}));

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
  input: __S(1968, __c123, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InvalidAccountStatusException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(1984, __c124, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(2000, __c125, 0) as any as S.Schema<UpdateAppBlockBuilderRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<UpdateAppBlockBuilderResult>,
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
}));

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
  input: __S(2016, __c126, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(544, __c34, 0) as any as S.Schema<UpdateApplicationResult>,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

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
  input: __S(2032, __c127, 0) as any as S.Schema<UpdateDirectoryConfigRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<UpdateDirectoryConfigResult>,
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
}));

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
  input: __S(2048, __c128, 0) as any as S.Schema<UpdateEntitlementRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<UpdateEntitlementResult>,
  errors: [
    ConcurrentModificationException,
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEntitlement",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<UpdateFleetRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<UpdateFleetResult>,
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
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<UpdateImagePermissionsRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<UpdateImagePermissionsResult>,
  errors: [LimitExceededException, ResourceNotAvailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImagePermissions",
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<UpdateStackRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<UpdateStackResult>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<UpdateThemeForStackRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<UpdateThemeForStackResult>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImageName: S.optional(S.String),
          ImageArn: S.optional(S.String),
          Name: S.optional(S.String),
          InstanceType: S.optional(S.String),
          ComputeCapacity: S.optional(__S(720, __c45, 0)),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          MaxUserDurationInSeconds: S.optional(S.Number),
          DisconnectTimeoutInSeconds: S.optional(S.Number),
          DeleteVpcConfig: S.optional(S.Boolean),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          DomainJoinInfo: S.optional(__S(736, __c46, 0)),
          IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
          AttributesToDelete: S.optional(__S(512, __c32, 0)),
          IamRoleArn: S.optional(S.String),
          StreamView: S.optional(S.String),
          Platform: S.optional(S.String),
          MaxConcurrentSessions: S.optional(S.Number),
          UsbDeviceFilterStrings: S.optional(__S(192, __c12, 0)),
          SessionScriptS3Location: S.optional(__S(320, __c20, 0)),
          MaxSessionsPerInstance: S.optional(S.Number),
          RootVolumeConfig: S.optional(__S(737, __c46, 1)),
          DisableIMDSV1: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFleetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SharedAccountId: S.optional(S.String),
          ImagePermissions: S.optional(__S(896, __c56, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateImagePermissionsRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          Name: S.optional(S.String),
          StorageConnectors: S.optional(__S(977, __c61, 1)),
          DeleteStorageConnectors: S.optional(S.Boolean),
          RedirectURL: S.optional(S.String),
          FeedbackURL: S.optional(S.String),
          AttributesToDelete: S.optional(__S(512, __c32, 0)),
          UserSettings: S.optional(__S(979, __c61, 3)),
          ApplicationSettings: S.optional(__S(960, __c60, 0)),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          EmbedHostDomains: S.optional(__S(192, __c12, 0)),
          StreamingExperienceSettings: S.optional(__S(980, __c61, 4)),
          ContentRedirection: S.optional(__S(982, __c61, 6)),
          AgentAccessConfig: S.optional(__S(985, __c61, 9)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateStackRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          FooterLinks: S.optional(__S(1025, __c64, 1)),
          TitleText: S.optional(S.String),
          ThemeStyling: S.optional(S.String),
          OrganizationLogoS3Location: S.optional(__S(320, __c20, 0)),
          FaviconS3Location: S.optional(__S(320, __c20, 0)),
          State: S.optional(S.String),
          AttributesToDelete: S.optional(__S(512, __c32, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateThemeForStackRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppBlockArn: S.optional(S.String),
          AppBlockBuilderName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateAppBlockBuilderAppBlockRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AppBlockBuilderAppBlockAssociation: S.optional(__S(80, __c5, 0)) }),
      ).annotate({ identifier: "AssociateAppBlockBuilderAppBlockResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppBlockArn: S.optional(S.String), AppBlockBuilderName: S.optional(S.String) }),
      ).annotate({ identifier: "AppBlockBuilderAppBlockAssociation" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetName: S.optional(S.String), ApplicationArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateApplicationFleetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ApplicationFleetAssociation: S.optional(__S(112, __c7, 0)) }),
      ).annotate({ identifier: "AssociateApplicationFleetResult" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetName: S.optional(S.String), ApplicationArn: S.optional(S.String) }),
      ).annotate({ identifier: "ApplicationFleetAssociation" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          EntitlementName: S.optional(S.String),
          ApplicationIdentifier: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateApplicationToEntitlementRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateApplicationToEntitlementResult",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetName: S.optional(S.String), StackName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateFleetRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImageBuilderName: S.optional(S.String),
          SoftwareNames: S.optional(__S(192, __c12, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateSoftwareToImageBuilderRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserStackAssociations: S.optional(__S(241, __c15, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchAssociateUserStackRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserStackAssociation: S.optional(__S(240, __c15, 0)),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "UserStackAssociationError" });
    case 1:
      return S.Array(__S(224, __c14, 0));
    case 2:
      return S.suspend(() => S.Struct({ errors: S.optional(__S(225, __c14, 1)) })).annotate({
        identifier: "BatchAssociateUserStackResult",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          UserName: S.optional(SensitiveString),
          AuthenticationType: S.optional(S.String),
          SendEmailNotification: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UserStackAssociation" });
    case 1:
      return S.Array(__S(240, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UserStackAssociations: S.optional(__S(241, __c15, 1)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchDisassociateUserStackRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceImageName: S.optional(S.String),
          DestinationImageName: S.optional(S.String),
          DestinationRegion: S.optional(S.String),
          DestinationImageDescription: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CopyImageRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DestinationImageName: S.optional(S.String) })).annotate({
        identifier: "CopyImageResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          SourceS3Location: S.optional(__S(320, __c20, 0)),
          SetupScriptDetails: S.optional(__S(352, __c22, 0)),
          Tags: S.optional(__S(304, __c19, 0)),
          PostSetupScriptDetails: S.optional(__S(352, __c22, 0)),
          PackagingType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAppBlockRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AppBlock: S.optional(__S(353, __c22, 1)) })).annotate({
        identifier: "CreateAppBlockResult",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3Bucket: S.optional(S.String), S3Key: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetails" });
    case 1:
      return S.Array(__S(336, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScriptS3Location: S.optional(__S(320, __c20, 0)),
          ExecutablePath: S.optional(S.String),
          ExecutableParameters: S.optional(S.String),
          TimeoutInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScriptDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          SourceS3Location: S.optional(__S(320, __c20, 0)),
          SetupScriptDetails: S.optional(__S(352, __c22, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PostSetupScriptDetails: S.optional(__S(352, __c22, 0)),
          PackagingType: S.optional(S.String),
          State: S.optional(S.String),
          AppBlockErrors: S.optional(__S(337, __c21, 1)),
        }),
      ).annotate({ identifier: "AppBlock" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Tags: S.optional(__S(304, __c19, 0)),
          Platform: S.optional(S.String),
          InstanceType: S.optional(S.String),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          IamRoleArn: S.optional(S.String),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          DisableIMDSV1: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAppBlockBuilderRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(192, __c12, 0)),
          SecurityGroupIds: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "VpcConfig" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ErrorTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ResourceError" });
    case 1:
      return S.Array(__S(400, __c25, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "AppBlockBuilderStateChangeReason" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EndpointType: S.optional(S.String), VpceId: S.optional(S.String) }),
      ).annotate({ identifier: "AccessEndpoint" });
    case 1:
      return S.Array(__S(416, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          Platform: S.optional(S.String),
          InstanceType: S.optional(S.String),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          IamRoleArn: S.optional(S.String),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          State: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AppBlockBuilderErrors: S.optional(__S(401, __c25, 1)),
          StateChangeReason: S.optional(__S(402, __c25, 2)),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          DisableIMDSV1: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AppBlockBuilder" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AppBlockBuilder: S.optional(__S(432, __c27, 0)) }),
      ).annotate({ identifier: "CreateAppBlockBuilderResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppBlockBuilderName: S.optional(S.String),
          Validity: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAppBlockBuilderStreamingURLRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamingURL: S.optional(S.String),
          Expires: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateAppBlockBuilderStreamingURLResult" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          IconS3Location: S.optional(__S(320, __c20, 0)),
          LaunchPath: S.optional(S.String),
          WorkingDirectory: S.optional(S.String),
          LaunchParameters: S.optional(S.String),
          Platforms: S.optional(__S(512, __c32, 0)),
          InstanceFamilies: S.optional(__S(192, __c12, 0)),
          AppBlockArn: S.optional(S.String),
          Tags: S.optional(__S(304, __c19, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateApplicationRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          IconURL: S.optional(S.String),
          LaunchPath: S.optional(S.String),
          LaunchParameters: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
          Metadata: S.optional(__S(304, __c19, 0)),
          WorkingDirectory: S.optional(S.String),
          Description: S.optional(S.String),
          Arn: S.optional(S.String),
          AppBlockArn: S.optional(S.String),
          IconS3Location: S.optional(__S(320, __c20, 0)),
          Platforms: S.optional(__S(512, __c32, 0)),
          InstanceFamilies: S.optional(__S(192, __c12, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Application" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Application: S.optional(__S(528, __c33, 0)) })).annotate({
        identifier: "CreateApplicationResult",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryName: S.optional(S.String),
          OrganizationalUnitDistinguishedNames: S.optional(__S(192, __c12, 0)),
          ServiceAccountCredentials: S.optional(__S(576, __c36, 0)),
          CertificateBasedAuthProperties: S.optional(__S(577, __c36, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDirectoryConfigRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountName: S.optional(SensitiveString),
          AccountPassword: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ServiceAccountCredentials" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Status: S.optional(S.String), CertificateAuthorityArn: S.optional(S.String) }),
      ).annotate({ identifier: "CertificateBasedAuthProperties" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryName: S.optional(S.String),
          OrganizationalUnitDistinguishedNames: S.optional(__S(192, __c12, 0)),
          ServiceAccountCredentials: S.optional(__S(576, __c36, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CertificateBasedAuthProperties: S.optional(__S(577, __c36, 1)),
        }),
      ).annotate({ identifier: "DirectoryConfig" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryConfig: S.optional(__S(578, __c36, 2)) }),
      ).annotate({ identifier: "CreateDirectoryConfigResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          StackName: S.optional(S.String),
          Description: S.optional(S.String),
          AppVisibility: S.optional(S.String),
          Attributes: S.optional(__S(625, __c39, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEntitlementRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "EntitlementAttribute" });
    case 1:
      return S.Array(__S(624, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          StackName: S.optional(S.String),
          Description: S.optional(S.String),
          AppVisibility: S.optional(S.String),
          Attributes: S.optional(__S(625, __c39, 1)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Entitlement" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Entitlement: S.optional(__S(626, __c39, 2)) })).annotate({
        identifier: "CreateEntitlementResult",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImageName: S.optional(S.String),
          AmiName: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          TagSpecifications: S.optional(__S(304, __c19, 0)),
          AmiDescription: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateExportImageTaskRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ExportImageTask: S.optional(__S(688, __c43, 0)) }),
      ).annotate({ identifier: "CreateExportImageTaskResult" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          ImageArn: S.optional(S.String),
          AmiName: S.optional(S.String),
          CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AmiDescription: S.optional(S.String),
          State: S.optional(S.String),
          AmiId: S.optional(S.String),
          TagSpecifications: S.optional(__S(304, __c19, 0)),
          ErrorDetails: S.optional(__S(337, __c21, 1)),
        }),
      ).annotate({ identifier: "ExportImageTask" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ImageName: S.optional(S.String),
          ImageArn: S.optional(S.String),
          InstanceType: S.optional(S.String),
          FleetType: S.optional(S.String),
          ComputeCapacity: S.optional(__S(720, __c45, 0)),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          MaxUserDurationInSeconds: S.optional(S.Number),
          DisconnectTimeoutInSeconds: S.optional(S.Number),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          DomainJoinInfo: S.optional(__S(736, __c46, 0)),
          Tags: S.optional(__S(304, __c19, 0)),
          IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
          IamRoleArn: S.optional(S.String),
          StreamView: S.optional(S.String),
          Platform: S.optional(S.String),
          MaxConcurrentSessions: S.optional(S.Number),
          UsbDeviceFilterStrings: S.optional(__S(192, __c12, 0)),
          SessionScriptS3Location: S.optional(__S(320, __c20, 0)),
          MaxSessionsPerInstance: S.optional(S.Number),
          RootVolumeConfig: S.optional(__S(737, __c46, 1)),
          DisableIMDSV1: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFleetRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DesiredInstances: S.optional(S.Number), DesiredSessions: S.optional(S.Number) }),
      ).annotate({ identifier: "ComputeCapacity" });
    case 1:
      return S.suspend(() => S.Struct({ Fleet: S.optional(__S(769, __c48, 1)) })).annotate({
        identifier: "CreateFleetResult",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryName: S.optional(S.String),
          OrganizationalUnitDistinguishedName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainJoinInfo" });
    case 1:
      return S.suspend(() => S.Struct({ VolumeSizeInGb: S.optional(S.Number) })).annotate({
        identifier: "VolumeConfig",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "FleetError" });
    case 1:
      return S.Array(__S(752, __c47, 0));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Desired: S.optional(S.Number),
          Running: S.optional(S.Number),
          InUse: S.optional(S.Number),
          Available: S.optional(S.Number),
          DesiredUserSessions: S.optional(S.Number),
          AvailableUserSessions: S.optional(S.Number),
          ActiveUserSessions: S.optional(S.Number),
          ActualUserSessions: S.optional(S.Number),
          Draining: S.optional(S.Number),
          DrainModeActiveUserSessions: S.optional(S.Number),
          DrainModeUnusedUserSessions: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ComputeCapacityStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          ImageName: S.optional(S.String),
          ImageArn: S.optional(S.String),
          InstanceType: S.optional(S.String),
          FleetType: S.optional(S.String),
          ComputeCapacityStatus: S.optional(__S(768, __c48, 0)),
          MaxUserDurationInSeconds: S.optional(S.Number),
          DisconnectTimeoutInSeconds: S.optional(S.Number),
          State: S.optional(S.String),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FleetErrors: S.optional(__S(753, __c47, 1)),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          DomainJoinInfo: S.optional(__S(736, __c46, 0)),
          IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
          IamRoleArn: S.optional(S.String),
          StreamView: S.optional(S.String),
          Platform: S.optional(S.String),
          MaxConcurrentSessions: S.optional(S.Number),
          UsbDeviceFilterStrings: S.optional(__S(192, __c12, 0)),
          SessionScriptS3Location: S.optional(__S(320, __c20, 0)),
          MaxSessionsPerInstance: S.optional(S.Number),
          RootVolumeConfig: S.optional(__S(737, __c46, 1)),
          DisableIMDSV1: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Fleet" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ImageName: S.optional(S.String),
          ImageArn: S.optional(S.String),
          InstanceType: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          IamRoleArn: S.optional(S.String),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          DomainJoinInfo: S.optional(__S(736, __c46, 0)),
          AppstreamAgentVersion: S.optional(S.String),
          Tags: S.optional(__S(304, __c19, 0)),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          RootVolumeConfig: S.optional(__S(737, __c46, 1)),
          SoftwaresToInstall: S.optional(__S(192, __c12, 0)),
          SoftwaresToUninstall: S.optional(__S(192, __c12, 0)),
          DisableIMDSV1: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateImageBuilderRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EniPrivateIpAddress: S.optional(S.String),
          EniIpv6Addresses: S.optional(__S(192, __c12, 0)),
          EniId: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkAccessConfiguration" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          ImageArn: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          InstanceType: S.optional(S.String),
          Platform: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          State: S.optional(S.String),
          StateChangeReason: S.optional(__S(402, __c25, 2)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          DomainJoinInfo: S.optional(__S(736, __c46, 0)),
          NetworkAccessConfiguration: S.optional(__S(800, __c50, 0)),
          ImageBuilderErrors: S.optional(__S(401, __c25, 1)),
          AppstreamAgentVersion: S.optional(S.String),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          RootVolumeConfig: S.optional(__S(737, __c46, 1)),
          LatestAppstreamAgentVersion: S.optional(S.String),
          DisableIMDSV1: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ImageBuilder" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ImageBuilder: S.optional(__S(816, __c51, 0)) })).annotate({
        identifier: "CreateImageBuilderResult",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Validity: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateImageBuilderStreamingURLRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IntendedInstanceType: S.optional(S.String) })).annotate({
        identifier: "RuntimeValidationConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          AbsoluteAppPath: S.optional(SensitiveString),
          AbsoluteIconPath: S.optional(SensitiveString),
          AbsoluteManifestPath: S.optional(SensitiveString),
          WorkingDirectory: S.optional(SensitiveString),
          LaunchParameters: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ApplicationConfig" });
    case 2:
      return S.Array(__S(865, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SourceAmiId: S.optional(S.String),
          WorkspaceImageId: S.optional(S.String),
          IamRoleArn: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Tags: S.optional(__S(304, __c19, 0)),
          RuntimeValidationConfig: S.optional(__S(864, __c54, 0)),
          AgentSoftwareVersion: S.optional(S.String),
          AppCatalogConfig: S.optional(__S(866, __c54, 2)),
          DryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateImportedImageRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(528, __c33, 0));
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ allowFleet: S.optional(S.Boolean), allowImageBuilder: S.optional(S.Boolean) }),
      ).annotate({ identifier: "ImagePermissions" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ nvidiaGridDriverVersion: S.optional(S.String) })).annotate({
        identifier: "ImageSoftwareMetadata",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          BaseImageArn: S.optional(S.String),
          DisplayName: S.optional(S.String),
          State: S.optional(S.String),
          Visibility: S.optional(S.String),
          ImageBuilderSupported: S.optional(S.Boolean),
          ImageBuilderName: S.optional(S.String),
          Platform: S.optional(S.String),
          Description: S.optional(S.String),
          StateChangeReason: S.optional(__S(402, __c25, 2)),
          Applications: S.optional(__S(880, __c55, 0)),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          PublicBaseImageReleasedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AppstreamAgentVersion: S.optional(S.String),
          ImagePermissions: S.optional(__S(896, __c56, 0)),
          ImageErrors: S.optional(__S(401, __c25, 1)),
          LatestAppstreamAgentVersion: S.optional(S.String),
          SupportedInstanceFamilies: S.optional(__S(192, __c12, 0)),
          DynamicAppProvidersEnabled: S.optional(S.String),
          ImageSharedWithOthers: S.optional(S.String),
          ManagedSoftwareIncluded: S.optional(S.Boolean),
          ImageType: S.optional(S.String),
          ImageSoftwareMetadata: S.optional(__S(912, __c57, 0)),
        }),
      ).annotate({ identifier: "Image" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Image: S.optional(__S(913, __c57, 1)) })).annotate({
        identifier: "CreateImportedImageResult",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          StorageConnectors: S.optional(__S(977, __c61, 1)),
          RedirectURL: S.optional(S.String),
          FeedbackURL: S.optional(S.String),
          UserSettings: S.optional(__S(979, __c61, 3)),
          ApplicationSettings: S.optional(__S(960, __c60, 0)),
          Tags: S.optional(__S(304, __c19, 0)),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          EmbedHostDomains: S.optional(__S(192, __c12, 0)),
          StreamingExperienceSettings: S.optional(__S(980, __c61, 4)),
          ContentRedirection: S.optional(__S(982, __c61, 6)),
          AgentAccessConfig: S.optional(__S(985, __c61, 9)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStackRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), SettingsGroup: S.optional(S.String) }),
      ).annotate({ identifier: "ApplicationSettings" });
    case 1:
      return S.suspend(() => S.Struct({ Stack: S.optional(__S(987, __c61, 11)) })).annotate({
        identifier: "CreateStackResult",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorType: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          Domains: S.optional(__S(192, __c12, 0)),
          DomainsRequireAdminConsent: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "StorageConnector" });
    case 1:
      return S.Array(__S(976, __c61, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Action: S.optional(S.String),
          Permission: S.optional(S.String),
          MaximumLength: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UserSetting" });
    case 3:
      return S.Array(__S(978, __c61, 2));
    case 4:
      return S.suspend(() => S.Struct({ PreferredProtocol: S.optional(S.String) })).annotate({
        identifier: "StreamingExperienceSettings",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          AllowedUrls: S.optional(__S(192, __c12, 0)),
          DeniedUrls: S.optional(__S(192, __c12, 0)),
        }),
      ).annotate({ identifier: "UrlRedirectionConfig" });
    case 6:
      return S.suspend(() => S.Struct({ HostToClient: S.optional(__S(981, __c61, 5)) })).annotate({
        identifier: "ContentRedirection",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ AgentAction: S.optional(S.String), Permission: S.optional(S.String) }),
      ).annotate({ identifier: "AgentAccessSetting" });
    case 8:
      return S.Array(__S(983, __c61, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Settings: S.optional(__S(984, __c61, 8)),
          S3BucketArn: S.optional(S.String),
          ScreenshotsUploadEnabled: S.optional(S.Boolean),
          ScreenResolution: S.optional(S.String),
          ScreenImageFormat: S.optional(S.String),
          UserControlMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgentAccessConfig" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          SettingsGroup: S.optional(S.String),
          S3BucketName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ApplicationSettingsResponse" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StorageConnectors: S.optional(__S(977, __c61, 1)),
          RedirectURL: S.optional(S.String),
          FeedbackURL: S.optional(S.String),
          StackErrors: S.optional(__S(753, __c47, 1)),
          UserSettings: S.optional(__S(979, __c61, 3)),
          ApplicationSettings: S.optional(__S(986, __c61, 10)),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          EmbedHostDomains: S.optional(__S(192, __c12, 0)),
          StreamingExperienceSettings: S.optional(__S(980, __c61, 4)),
          ContentRedirection: S.optional(__S(982, __c61, 6)),
          AgentAccessConfig: S.optional(__S(985, __c61, 9)),
        }),
      ).annotate({ identifier: "Stack" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          FleetName: S.optional(S.String),
          UserId: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          Validity: S.optional(S.Number),
          SessionContext: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStreamingURLRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          FooterLinks: S.optional(__S(1025, __c64, 1)),
          TitleText: S.optional(S.String),
          ThemeStyling: S.optional(S.String),
          OrganizationLogoS3Location: S.optional(__S(320, __c20, 0)),
          FaviconS3Location: S.optional(__S(320, __c20, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateThemeForStackRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DisplayName: S.optional(S.String), FooterLinkURL: S.optional(S.String) }),
      ).annotate({ identifier: "ThemeFooterLink" });
    case 1:
      return S.Array(__S(1024, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          State: S.optional(S.String),
          ThemeTitleText: S.optional(S.String),
          ThemeStyling: S.optional(S.String),
          ThemeFooterLinks: S.optional(__S(1025, __c64, 1)),
          ThemeOrganizationLogoURL: S.optional(S.String),
          ThemeFaviconURL: S.optional(S.String),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Theme" });
    case 3:
      return S.suspend(() => S.Struct({ Theme: S.optional(__S(1026, __c64, 2)) })).annotate({
        identifier: "CreateThemeForStackResult",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          existingImageName: S.optional(S.String),
          newImageName: S.optional(S.String),
          newImageDescription: S.optional(S.String),
          newImageDisplayName: S.optional(S.String),
          newImageTags: S.optional(__S(304, __c19, 0)),
          dryRun: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUpdatedImageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ image: S.optional(__S(913, __c57, 1)), canUpdateImage: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CreateUpdatedImageResult" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateUsageReportSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ S3BucketName: S.optional(S.String), Schedule: S.optional(S.String) }),
      ).annotate({ identifier: "CreateUsageReportSubscriptionResult" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(SensitiveString),
          MessageAction: S.optional(S.String),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          AuthenticationType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateUserRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAppBlockRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAppBlockBuilderRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DirectoryName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDirectoryConfigRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), StackName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEntitlementRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFleetRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteImageRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteImageBuilderRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), SharedAccountId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteImagePermissionsRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteStackRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StackName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteThemeForStackRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteUsageReportSubscriptionRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(SensitiveString),
          AuthenticationType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteUserRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppBlockArn: S.optional(S.String),
          AppBlockBuilderName: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAppBlockBuilderAppBlockAssociationsRequest" });
    case 1:
      return S.Array(__S(80, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AppBlockBuilderAppBlockAssociations: S.optional(__S(1297, __c81, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAppBlockBuilderAppBlockAssociationsResult" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(192, __c12, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAppBlockBuildersRequest" });
    case 1:
      return S.Array(__S(432, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AppBlockBuilders: S.optional(__S(1313, __c82, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAppBlockBuildersResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arns: S.optional(__S(192, __c12, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAppBlocksRequest" });
    case 1:
      return S.Array(__S(353, __c22, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ AppBlocks: S.optional(__S(1329, __c83, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeAppBlocksResult" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FleetName: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeApplicationFleetAssociationsRequest" });
    case 1:
      return S.Array(__S(112, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ApplicationFleetAssociations: S.optional(__S(1345, __c84, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeApplicationFleetAssociationsResult" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arns: S.optional(__S(192, __c12, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeApplicationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Applications: S.optional(__S(880, __c55, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeApplicationsResult" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BillingPeriod: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAppLicenseUsageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserArn: S.optional(S.String),
          BillingPeriod: S.optional(S.String),
          OwnerAWSAccountId: S.optional(S.String),
          SubscriptionFirstUsedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubscriptionLastUsedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LicenseType: S.optional(S.String),
          UserId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdminAppLicenseUsageRecord" });
    case 2:
      return S.Array(__S(1377, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AppLicenseUsages: S.optional(__S(1378, __c86, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAppLicenseUsageResult" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryNames: S.optional(__S(192, __c12, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDirectoryConfigsRequest" });
    case 1:
      return S.Array(__S(578, __c36, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DirectoryConfigs: S.optional(__S(1393, __c87, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDirectoryConfigsResult" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          StackName: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEntitlementsRequest" });
    case 1:
      return S.Array(__S(626, __c39, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Entitlements: S.optional(__S(1409, __c88, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeEntitlementsResult" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: S.optional(__S(192, __c12, 0)), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFleetsRequest" });
    case 1:
      return S.Array(__S(769, __c48, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Fleets: S.optional(__S(1425, __c89, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeFleetsResult" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(192, __c12, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeImageBuildersRequest" });
    case 1:
      return S.Array(__S(816, __c51, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ImageBuilders: S.optional(__S(1441, __c90, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeImageBuildersResult" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          SharedAwsAccountIds: S.optional(__S(192, __c12, 0)),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeImagePermissionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sharedAccountId: S.optional(S.String),
          imagePermissions: S.optional(__S(896, __c56, 0)),
        }),
      ).annotate({ identifier: "SharedImagePermissions" });
    case 2:
      return S.Array(__S(1457, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SharedImagePermissionsList: S.optional(__S(1458, __c91, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeImagePermissionsResult" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(192, __c12, 0)),
          Arns: S.optional(__S(192, __c12, 0)),
          Type: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeImagesRequest" });
    case 1:
      return S.Array(__S(913, __c57, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Images: S.optional(__S(1473, __c92, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeImagesResult" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          FleetName: S.optional(S.String),
          UserId: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
          AuthenticationType: S.optional(S.String),
          InstanceId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          UserId: S.optional(S.String),
          StackName: S.optional(S.String),
          FleetName: S.optional(S.String),
          State: S.optional(S.String),
          ConnectionState: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaxExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AuthenticationType: S.optional(S.String),
          NetworkAccessConfiguration: S.optional(__S(800, __c50, 0)),
          InstanceId: S.optional(S.String),
          InstanceDrainStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "Session" });
    case 2:
      return S.Array(__S(1489, __c93, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Sessions: S.optional(__S(1490, __c93, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSessionsResult" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AssociatedResource: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeSoftwareAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SoftwareName: S.optional(S.String),
          Status: S.optional(S.String),
          DeploymentError: S.optional(__S(337, __c21, 1)),
        }),
      ).annotate({ identifier: "SoftwareAssociations" });
    case 2:
      return S.Array(__S(1505, __c94, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AssociatedResource: S.optional(S.String),
          SoftwareAssociations: S.optional(__S(1506, __c94, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeSoftwareAssociationsResult" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: S.optional(__S(192, __c12, 0)), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeStacksRequest" });
    case 1:
      return S.Array(__S(987, __c61, 11));
    case 2:
      return S.suspend(() =>
        S.Struct({ Stacks: S.optional(__S(1521, __c95, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeStacksResult" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StackName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeThemeForStackRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeUsageReportSubscriptionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          S3BucketName: S.optional(S.String),
          Schedule: S.optional(S.String),
          LastGeneratedReportDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SubscriptionErrors: S.optional(__S(753, __c47, 1)),
        }),
      ).annotate({ identifier: "UsageReportSubscription" });
    case 2:
      return S.Array(__S(1553, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          UsageReportSubscriptions: S.optional(__S(1554, __c97, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeUsageReportSubscriptionsResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AuthenticationType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          UserName: S.optional(SensitiveString),
          Enabled: S.optional(S.Boolean),
          Status: S.optional(S.String),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AuthenticationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "User" });
    case 2:
      return S.Array(__S(1569, __c98, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Users: S.optional(__S(1570, __c98, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeUsersResult" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          UserName: S.optional(SensitiveString),
          AuthenticationType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeUserStackAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UserStackAssociations: S.optional(__S(241, __c15, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeUserStackAssociationsResult" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(SensitiveString),
          AuthenticationType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisableUserRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AppBlockArn: S.optional(S.String),
          AppBlockBuilderName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateAppBlockBuilderAppBlockRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetName: S.optional(S.String), ApplicationArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateApplicationFleetRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          EntitlementName: S.optional(S.String),
          ApplicationIdentifier: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateApplicationFromEntitlementRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetName: S.optional(S.String), StackName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateFleetRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImageBuilderName: S.optional(S.String),
          SoftwareNames: S.optional(__S(192, __c12, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateSoftwareFromImageBuilderRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DrainSessionInstanceRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UserName: S.optional(SensitiveString),
          AuthenticationType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnableUserRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SessionId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ExpireSessionRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetExportImageTaskRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StackName: S.optional(S.String), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAssociatedFleetsRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: S.optional(__S(192, __c12, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssociatedFleetsResult" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FleetName: S.optional(S.String), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAssociatedStacksRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StackName: S.optional(S.String),
          EntitlementName: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEntitledApplicationsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ApplicationIdentifier: S.optional(S.String) })).annotate({
        identifier: "EntitledApplication",
      });
    case 2:
      return S.Array(__S(1809, __c113, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          EntitledApplications: S.optional(__S(1810, __c113, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEntitledApplicationsResult" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(192, __c12, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(1824, __c114, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1825, __c114, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListExportImageTasksRequest" });
    case 3:
      return S.Array(__S(688, __c43, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ExportImageTasks: S.optional(__S(1827, __c114, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListExportImageTasksResult" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(304, __c19, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartAppBlockBuilderRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartFleetRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), AppstreamAgentVersion: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartImageBuilderRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ImageBuilderName: S.optional(S.String),
          RetryFailedDeployments: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSoftwareDeploymentToImageBuilderRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopAppBlockBuilderRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopFleetRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopImageBuilderRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(__S(304, __c19, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          TagKeys: S.optional(__S(192, __c12, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Platform: S.optional(S.String),
          InstanceType: S.optional(S.String),
          VpcConfig: S.optional(__S(384, __c24, 0)),
          EnableDefaultInternetAccess: S.optional(S.Boolean),
          IamRoleArn: S.optional(S.String),
          AccessEndpoints: S.optional(__S(417, __c26, 1)),
          AttributesToDelete: S.optional(__S(512, __c32, 0)),
          DisableIMDSV1: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAppBlockBuilderRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          IconS3Location: S.optional(__S(320, __c20, 0)),
          LaunchPath: S.optional(S.String),
          WorkingDirectory: S.optional(S.String),
          LaunchParameters: S.optional(S.String),
          AppBlockArn: S.optional(S.String),
          AttributesToDelete: S.optional(__S(512, __c32, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DirectoryName: S.optional(S.String),
          OrganizationalUnitDistinguishedNames: S.optional(__S(192, __c12, 0)),
          ServiceAccountCredentials: S.optional(__S(576, __c36, 0)),
          CertificateBasedAuthProperties: S.optional(__S(577, __c36, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDirectoryConfigRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          StackName: S.optional(S.String),
          Description: S.optional(S.String),
          AppVisibility: S.optional(S.String),
          Attributes: S.optional(__S(625, __c39, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEntitlementRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
