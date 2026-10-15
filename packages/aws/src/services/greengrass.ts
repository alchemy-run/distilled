import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Greengrass", serviceShapeName: "Greengrass" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "greengrass" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-06-07");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://greengrass-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-east-1") {
              return e("https://greengrass.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://greengrass.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://greengrass-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        if (Region === "dataplane-us-gov-east-1") {
          return e(
            "https://greengrass-ats.iot.us-gov-east-1.amazonaws.com",
            {
              authSchemes: [
                { name: "sigv4", signingName: "greengrass", signingRegion: "us-gov-east-1" },
              ],
            },
            {},
          );
        }
        if (Region === "dataplane-us-gov-west-1") {
          return e(
            "https://greengrass-ats.iot.us-gov-west-1.amazonaws.com",
            {
              authSchemes: [
                { name: "sigv4", signingName: "greengrass", signingRegion: "us-gov-west-1" },
              ],
            },
            {},
          );
        }
        return e(`https://greengrass.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://greengrass.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      ErrorDetails: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({ identifier: "ErrorDetails" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      ErrorDetails: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({ identifier: "ErrorDetails" }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export interface AssociateRoleToGroupRequest {
  GroupId: string;
  RoleArn?: string;
}
export interface AssociateRoleToGroupResponse {
  AssociatedAt?: string;
}
export interface AssociateServiceRoleToAccountRequest {
  RoleArn?: string;
}
export interface AssociateServiceRoleToAccountResponse {
  AssociatedAt?: string;
}
export type __mapOf__string = { [key: string]: string | undefined };
const __mapOf__string = /*@__PURE__*/ __L.at(__c52, 0);
export interface Connector {
  ConnectorArn?: string;
  Id?: string;
  Parameters?: { [key: string]: string | undefined };
}
export type __listOfConnector = Connector[];
const __listOfConnector = /*@__PURE__*/ __L.at(__c51, 1);
export interface ConnectorDefinitionVersion {
  Connectors?: Connector[];
}
export type Tags = { [key: string]: string | undefined };
const Tags = __mapOf__string as any as S.Schema<Tags>;
export interface CreateConnectorDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: ConnectorDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateConnectorDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateConnectorDefinitionVersionRequest {
  AmznClientToken?: string;
  ConnectorDefinitionId: string;
  Connectors?: Connector[];
}
export interface CreateConnectorDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export interface Core {
  CertificateArn?: string;
  Id?: string;
  SyncShadow?: boolean;
  ThingArn?: string;
}
export type __listOfCore = Core[];
const __listOfCore = /*@__PURE__*/ __L.at(__c80, 1);
export interface CoreDefinitionVersion {
  Cores?: Core[];
}
export interface CreateCoreDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: CoreDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateCoreDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateCoreDefinitionVersionRequest {
  AmznClientToken?: string;
  CoreDefinitionId: string;
  Cores?: Core[];
}
export interface CreateCoreDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export type DeploymentType =
  | "NewDeployment"
  | "Redeployment"
  | "ResetDeployment"
  | "ForceResetDeployment"
  | (string & {});
export interface CreateDeploymentRequest {
  AmznClientToken?: string;
  DeploymentId?: string;
  DeploymentType?: DeploymentType;
  GroupId: string;
  GroupVersionId?: string;
}
export interface CreateDeploymentResponse {
  DeploymentArn?: string;
  DeploymentId?: string;
}
export interface Device {
  CertificateArn?: string;
  Id?: string;
  SyncShadow?: boolean;
  ThingArn?: string;
}
export type __listOfDevice = Device[];
const __listOfDevice = __listOfCore as any as S.Schema<__listOfDevice>;
export interface DeviceDefinitionVersion {
  Devices?: Device[];
}
export interface CreateDeviceDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: DeviceDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDeviceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateDeviceDefinitionVersionRequest {
  AmznClientToken?: string;
  DeviceDefinitionId: string;
  Devices?: Device[];
}
export interface CreateDeviceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export type FunctionIsolationMode = "GreengrassContainer" | "NoContainer" | (string & {});
export interface FunctionRunAsConfig {
  Gid?: number;
  Uid?: number;
}
export interface FunctionDefaultExecutionConfig {
  IsolationMode?: FunctionIsolationMode;
  RunAs?: FunctionRunAsConfig;
}
export interface FunctionDefaultConfig {
  Execution?: FunctionDefaultExecutionConfig;
}
export type EncodingType = "binary" | "json" | (string & {});
export interface FunctionExecutionConfig {
  IsolationMode?: FunctionIsolationMode;
  RunAs?: FunctionRunAsConfig;
}
export type Permission = "ro" | "rw" | (string & {});
export interface ResourceAccessPolicy {
  Permission?: Permission;
  ResourceId?: string;
}
export type __listOfResourceAccessPolicy = ResourceAccessPolicy[];
const __listOfResourceAccessPolicy = /*@__PURE__*/ __L.at(__c3, 4);
export interface FunctionConfigurationEnvironment {
  AccessSysfs?: boolean;
  Execution?: FunctionExecutionConfig;
  ResourceAccessPolicies?: ResourceAccessPolicy[];
  Variables?: { [key: string]: string | undefined };
}
export interface FunctionConfiguration {
  EncodingType?: EncodingType;
  Environment?: FunctionConfigurationEnvironment;
  ExecArgs?: string;
  Executable?: string;
  MemorySize?: number;
  Pinned?: boolean;
  Timeout?: number;
  FunctionRuntimeOverride?: string;
}
export interface Function {
  FunctionArn?: string;
  FunctionConfiguration?: FunctionConfiguration;
  Id?: string;
}
export type __listOfFunction = Function[];
const __listOfFunction = /*@__PURE__*/ __L.at(__c3, 8);
export interface FunctionDefinitionVersion {
  DefaultConfig?: FunctionDefaultConfig;
  Functions?: Function[];
}
export interface CreateFunctionDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: FunctionDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateFunctionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateFunctionDefinitionVersionRequest {
  AmznClientToken?: string;
  DefaultConfig?: FunctionDefaultConfig;
  FunctionDefinitionId: string;
  Functions?: Function[];
}
export interface CreateFunctionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export interface GroupVersion {
  ConnectorDefinitionVersionArn?: string;
  CoreDefinitionVersionArn?: string;
  DeviceDefinitionVersionArn?: string;
  FunctionDefinitionVersionArn?: string;
  LoggerDefinitionVersionArn?: string;
  ResourceDefinitionVersionArn?: string;
  SubscriptionDefinitionVersionArn?: string;
}
export interface CreateGroupRequest {
  AmznClientToken?: string;
  InitialVersion?: GroupVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateGroupResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateGroupCertificateAuthorityRequest {
  AmznClientToken?: string;
  GroupId: string;
}
export interface CreateGroupCertificateAuthorityResponse {
  GroupCertificateAuthorityArn?: string;
}
export interface CreateGroupVersionRequest {
  AmznClientToken?: string;
  ConnectorDefinitionVersionArn?: string;
  CoreDefinitionVersionArn?: string;
  DeviceDefinitionVersionArn?: string;
  FunctionDefinitionVersionArn?: string;
  GroupId: string;
  LoggerDefinitionVersionArn?: string;
  ResourceDefinitionVersionArn?: string;
  SubscriptionDefinitionVersionArn?: string;
}
export interface CreateGroupVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export type LoggerComponent = "GreengrassSystem" | "Lambda" | (string & {});
export type LoggerLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL" | (string & {});
export type LoggerType = "FileSystem" | "AWSCloudWatch" | (string & {});
export interface Logger {
  Component?: LoggerComponent;
  Id?: string;
  Level?: LoggerLevel;
  Space?: number;
  Type?: LoggerType;
}
export type __listOfLogger = Logger[];
const __listOfLogger = /*@__PURE__*/ __L.at(__c11, 1);
export interface LoggerDefinitionVersion {
  Loggers?: Logger[];
}
export interface CreateLoggerDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: LoggerDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateLoggerDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateLoggerDefinitionVersionRequest {
  AmznClientToken?: string;
  LoggerDefinitionId: string;
  Loggers?: Logger[];
}
export interface CreateLoggerDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export interface GroupOwnerSetting {
  AutoAddGroupOwner?: boolean;
  GroupOwner?: string;
}
export interface LocalDeviceResourceData {
  GroupOwnerSetting?: GroupOwnerSetting;
  SourcePath?: string;
}
export interface LocalVolumeResourceData {
  DestinationPath?: string;
  GroupOwnerSetting?: GroupOwnerSetting;
  SourcePath?: string;
}
export interface ResourceDownloadOwnerSetting {
  GroupOwner?: string;
  GroupPermission?: Permission;
}
export interface S3MachineLearningModelResourceData {
  DestinationPath?: string;
  OwnerSetting?: ResourceDownloadOwnerSetting;
  S3Uri?: string;
}
export interface SageMakerMachineLearningModelResourceData {
  DestinationPath?: string;
  OwnerSetting?: ResourceDownloadOwnerSetting;
  SageMakerJobArn?: string;
}
export type __listOf__string = string[];
const __listOf__string = /*@__PURE__*/ __L.at(__c15, 0);
export interface SecretsManagerSecretResourceData {
  ARN?: string;
  AdditionalStagingLabelsToDownload?: string[];
}
export interface ResourceDataContainer {
  LocalDeviceResourceData?: LocalDeviceResourceData;
  LocalVolumeResourceData?: LocalVolumeResourceData;
  S3MachineLearningModelResourceData?: S3MachineLearningModelResourceData;
  SageMakerMachineLearningModelResourceData?: SageMakerMachineLearningModelResourceData;
  SecretsManagerSecretResourceData?: SecretsManagerSecretResourceData;
}
export interface Resource {
  Id?: string;
  Name?: string;
  ResourceDataContainer?: ResourceDataContainer;
}
export type __listOfResource = Resource[];
const __listOfResource = /*@__PURE__*/ __L.at(__c16, 9);
export interface ResourceDefinitionVersion {
  Resources?: Resource[];
}
export interface CreateResourceDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: ResourceDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateResourceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateResourceDefinitionVersionRequest {
  AmznClientToken?: string;
  ResourceDefinitionId: string;
  Resources?: Resource[];
}
export interface CreateResourceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export type S3UrlSignerRole = string;
export type SoftwareToUpdate = "core" | "ota_agent" | (string & {});
export type UpdateAgentLogLevel =
  | "NONE"
  | "TRACE"
  | "DEBUG"
  | "VERBOSE"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export type UpdateTargets = string[];
const UpdateTargets = __listOf__string as any as S.Schema<UpdateTargets>;
export type UpdateTargetsArchitecture = "armv6l" | "armv7l" | "x86_64" | "aarch64" | (string & {});
export type UpdateTargetsOperatingSystem =
  | "ubuntu"
  | "raspbian"
  | "amazon_linux"
  | "openwrt"
  | (string & {});
export interface CreateSoftwareUpdateJobRequest {
  AmznClientToken?: string;
  S3UrlSignerRole?: string;
  SoftwareToUpdate?: SoftwareToUpdate;
  UpdateAgentLogLevel?: UpdateAgentLogLevel;
  UpdateTargets?: string[];
  UpdateTargetsArchitecture?: UpdateTargetsArchitecture;
  UpdateTargetsOperatingSystem?: UpdateTargetsOperatingSystem;
}
export interface CreateSoftwareUpdateJobResponse {
  IotJobArn?: string;
  IotJobId?: string;
  PlatformSoftwareVersion?: string;
}
export interface Subscription {
  Id?: string;
  Source?: string;
  Subject?: string;
  Target?: string;
}
export type __listOfSubscription = Subscription[];
const __listOfSubscription = /*@__PURE__*/ __L.at(__c23, 1);
export interface SubscriptionDefinitionVersion {
  Subscriptions?: Subscription[];
}
export interface CreateSubscriptionDefinitionRequest {
  AmznClientToken?: string;
  InitialVersion?: SubscriptionDefinitionVersion;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateSubscriptionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export interface CreateSubscriptionDefinitionVersionRequest {
  AmznClientToken?: string;
  SubscriptionDefinitionId: string;
  Subscriptions?: Subscription[];
}
export interface CreateSubscriptionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export interface DeleteConnectorDefinitionRequest {
  ConnectorDefinitionId: string;
}
export interface DeleteConnectorDefinitionResponse {}
export interface DeleteCoreDefinitionRequest {
  CoreDefinitionId: string;
}
export interface DeleteCoreDefinitionResponse {}
export interface DeleteDeviceDefinitionRequest {
  DeviceDefinitionId: string;
}
export interface DeleteDeviceDefinitionResponse {}
export interface DeleteFunctionDefinitionRequest {
  FunctionDefinitionId: string;
}
export interface DeleteFunctionDefinitionResponse {}
export interface DeleteGroupRequest {
  GroupId: string;
}
export interface DeleteGroupResponse {}
export interface DeleteLoggerDefinitionRequest {
  LoggerDefinitionId: string;
}
export interface DeleteLoggerDefinitionResponse {}
export interface DeleteResourceDefinitionRequest {
  ResourceDefinitionId: string;
}
export interface DeleteResourceDefinitionResponse {}
export interface DeleteSubscriptionDefinitionRequest {
  SubscriptionDefinitionId: string;
}
export interface DeleteSubscriptionDefinitionResponse {}
export interface DisassociateRoleFromGroupRequest {
  GroupId: string;
}
export interface DisassociateRoleFromGroupResponse {
  DisassociatedAt?: string;
}
export interface DisassociateServiceRoleFromAccountRequest {}
export interface DisassociateServiceRoleFromAccountResponse {
  DisassociatedAt?: string;
}
export interface GetAssociatedRoleRequest {
  GroupId: string;
}
export interface GetAssociatedRoleResponse {
  AssociatedAt?: string;
  RoleArn?: string;
}
export interface GetBulkDeploymentStatusRequest {
  BulkDeploymentId: string;
}
export interface BulkDeploymentMetrics {
  InvalidInputRecords?: number;
  RecordsProcessed?: number;
  RetryAttempts?: number;
}
export type BulkDeploymentStatus =
  | "Initializing"
  | "Running"
  | "Completed"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | (string & {});
export interface ErrorDetail {
  DetailedErrorCode?: string;
  DetailedErrorMessage?: string;
}
export type ErrorDetails = ErrorDetail[];
export interface GetBulkDeploymentStatusResponse {
  BulkDeploymentMetrics?: BulkDeploymentMetrics;
  BulkDeploymentStatus?: BulkDeploymentStatus;
  CreatedAt?: string;
  ErrorDetails?: ErrorDetail[];
  ErrorMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetConnectivityInfoRequest {
  ThingName: string;
}
export interface ConnectivityInfo {
  HostAddress?: string;
  Id?: string;
  Metadata?: string;
  PortNumber?: number;
}
export type __listOfConnectivityInfo = ConnectivityInfo[];
const __listOfConnectivityInfo = /*@__PURE__*/ __L.at(__c43, 1);
export interface GetConnectivityInfoResponse {
  ConnectivityInfo?: ConnectivityInfo[];
  Message?: string;
}
export interface GetConnectorDefinitionRequest {
  ConnectorDefinitionId: string;
}
export interface GetConnectorDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetConnectorDefinitionVersionRequest {
  ConnectorDefinitionId: string;
  ConnectorDefinitionVersionId: string;
  NextToken?: string;
}
export interface GetConnectorDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: ConnectorDefinitionVersion & {
    Connectors: (Connector & { ConnectorArn: string; Id: string })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export interface GetCoreDefinitionRequest {
  CoreDefinitionId: string;
}
export interface GetCoreDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetCoreDefinitionVersionRequest {
  CoreDefinitionId: string;
  CoreDefinitionVersionId: string;
}
export interface GetCoreDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: CoreDefinitionVersion & {
    Cores: (Core & { CertificateArn: string; Id: string; ThingArn: string })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export interface GetDeploymentStatusRequest {
  DeploymentId: string;
  GroupId: string;
}
export interface GetDeploymentStatusResponse {
  DeploymentStatus?: string;
  DeploymentType?: DeploymentType;
  ErrorDetails?: ErrorDetail[];
  ErrorMessage?: string;
  UpdatedAt?: string;
}
export interface GetDeviceDefinitionRequest {
  DeviceDefinitionId: string;
}
export interface GetDeviceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetDeviceDefinitionVersionRequest {
  DeviceDefinitionId: string;
  DeviceDefinitionVersionId: string;
  NextToken?: string;
}
export interface GetDeviceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: DeviceDefinitionVersion & {
    Devices: (Device & { CertificateArn: string; Id: string; ThingArn: string })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export interface GetFunctionDefinitionRequest {
  FunctionDefinitionId: string;
}
export interface GetFunctionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetFunctionDefinitionVersionRequest {
  FunctionDefinitionId: string;
  FunctionDefinitionVersionId: string;
  NextToken?: string;
}
export interface GetFunctionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: FunctionDefinitionVersion & {
    Functions: (Function & {
      Id: string;
      FunctionConfiguration: FunctionConfiguration & {
        Environment: FunctionConfigurationEnvironment & {
          ResourceAccessPolicies: (ResourceAccessPolicy & { ResourceId: string })[];
        };
      };
    })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export interface GetGroupRequest {
  GroupId: string;
}
export interface GetGroupResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetGroupCertificateAuthorityRequest {
  CertificateAuthorityId: string;
  GroupId: string;
}
export interface GetGroupCertificateAuthorityResponse {
  GroupCertificateAuthorityArn?: string;
  GroupCertificateAuthorityId?: string;
  PemEncodedCertificate?: string;
}
export interface GetGroupCertificateConfigurationRequest {
  GroupId: string;
}
export interface GetGroupCertificateConfigurationResponse {
  CertificateAuthorityExpiryInMilliseconds?: string;
  CertificateExpiryInMilliseconds?: string;
  GroupId?: string;
}
export interface GetGroupVersionRequest {
  GroupId: string;
  GroupVersionId: string;
}
export interface GetGroupVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: GroupVersion;
  Id?: string;
  Version?: string;
}
export interface GetLoggerDefinitionRequest {
  LoggerDefinitionId: string;
}
export interface GetLoggerDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetLoggerDefinitionVersionRequest {
  LoggerDefinitionId: string;
  LoggerDefinitionVersionId: string;
  NextToken?: string;
}
export interface GetLoggerDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: LoggerDefinitionVersion & {
    Loggers: (Logger & {
      Component: LoggerComponent;
      Id: string;
      Level: LoggerLevel;
      Type: LoggerType;
    })[];
  };
  Id?: string;
  Version?: string;
}
export interface GetResourceDefinitionRequest {
  ResourceDefinitionId: string;
}
export interface GetResourceDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetResourceDefinitionVersionRequest {
  ResourceDefinitionId: string;
  ResourceDefinitionVersionId: string;
}
export interface GetResourceDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: ResourceDefinitionVersion & {
    Resources: (Resource & {
      Id: string;
      Name: string;
      ResourceDataContainer: ResourceDataContainer & {
        S3MachineLearningModelResourceData: S3MachineLearningModelResourceData & {
          OwnerSetting: ResourceDownloadOwnerSetting & {
            GroupOwner: string;
            GroupPermission: Permission;
          };
        };
        SageMakerMachineLearningModelResourceData: SageMakerMachineLearningModelResourceData & {
          OwnerSetting: ResourceDownloadOwnerSetting & {
            GroupOwner: string;
            GroupPermission: Permission;
          };
        };
      };
    })[];
  };
  Id?: string;
  Version?: string;
}
export interface GetServiceRoleForAccountRequest {}
export interface GetServiceRoleForAccountResponse {
  AssociatedAt?: string;
  RoleArn?: string;
}
export interface GetSubscriptionDefinitionRequest {
  SubscriptionDefinitionId: string;
}
export interface GetSubscriptionDefinitionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetSubscriptionDefinitionVersionRequest {
  NextToken?: string;
  SubscriptionDefinitionId: string;
  SubscriptionDefinitionVersionId: string;
}
export interface GetSubscriptionDefinitionVersionResponse {
  Arn?: string;
  CreationTimestamp?: string;
  Definition?: SubscriptionDefinitionVersion & {
    Subscriptions: (Subscription & {
      Id: string;
      Source: string;
      Subject: string;
      Target: string;
    })[];
  };
  Id?: string;
  NextToken?: string;
  Version?: string;
}
export interface GetThingRuntimeConfigurationRequest {
  ThingName: string;
}
export type ConfigurationSyncStatus = "InSync" | "OutOfSync" | (string & {});
export type Telemetry = "On" | "Off" | (string & {});
export interface TelemetryConfiguration {
  ConfigurationSyncStatus?: ConfigurationSyncStatus;
  Telemetry?: Telemetry;
}
export interface RuntimeConfiguration {
  TelemetryConfiguration?: TelemetryConfiguration;
}
export interface GetThingRuntimeConfigurationResponse {
  RuntimeConfiguration?: RuntimeConfiguration & {
    TelemetryConfiguration: TelemetryConfiguration & { Telemetry: Telemetry };
  };
}
export interface ListBulkDeploymentDetailedReportsRequest {
  BulkDeploymentId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface BulkDeploymentResult {
  CreatedAt?: string;
  DeploymentArn?: string;
  DeploymentId?: string;
  DeploymentStatus?: string;
  DeploymentType?: DeploymentType;
  ErrorDetails?: ErrorDetail[];
  ErrorMessage?: string;
  GroupArn?: string;
}
export type BulkDeploymentResults = BulkDeploymentResult[];
export interface ListBulkDeploymentDetailedReportsResponse {
  Deployments?: BulkDeploymentResult[];
  NextToken?: string;
}
export interface ListBulkDeploymentsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface BulkDeployment {
  BulkDeploymentArn?: string;
  BulkDeploymentId?: string;
  CreatedAt?: string;
}
export type BulkDeployments = BulkDeployment[];
export interface ListBulkDeploymentsResponse {
  BulkDeployments?: BulkDeployment[];
  NextToken?: string;
}
export interface ListConnectorDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface DefinitionInformation {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export type __listOfDefinitionInformation = DefinitionInformation[];
const __listOfDefinitionInformation = /*@__PURE__*/ __L.at(__c77, 1);
export interface ListConnectorDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export interface ListConnectorDefinitionVersionsRequest {
  ConnectorDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface VersionInformation {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  Version?: string;
}
export type __listOfVersionInformation = VersionInformation[];
const __listOfVersionInformation = /*@__PURE__*/ __L.at(__c82, 0);
export interface ListConnectorDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListCoreDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface ListCoreDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export interface ListCoreDefinitionVersionsRequest {
  CoreDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface ListCoreDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListDeploymentsRequest {
  GroupId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface Deployment {
  CreatedAt?: string;
  DeploymentArn?: string;
  DeploymentId?: string;
  DeploymentType?: DeploymentType;
  GroupArn?: string;
}
export type Deployments = Deployment[];
export interface ListDeploymentsResponse {
  Deployments?: Deployment[];
  NextToken?: string;
}
export interface ListDeviceDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface ListDeviceDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export interface ListDeviceDefinitionVersionsRequest {
  DeviceDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface ListDeviceDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListFunctionDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface ListFunctionDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export interface ListFunctionDefinitionVersionsRequest {
  FunctionDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface ListFunctionDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListGroupCertificateAuthoritiesRequest {
  GroupId: string;
}
export interface GroupCertificateAuthorityProperties {
  GroupCertificateAuthorityArn?: string;
  GroupCertificateAuthorityId?: string;
}
export type __listOfGroupCertificateAuthorityProperties = GroupCertificateAuthorityProperties[];
const __listOfGroupCertificateAuthorityProperties = /*@__PURE__*/ __L.at(__c90, 2);
export interface ListGroupCertificateAuthoritiesResponse {
  GroupCertificateAuthorities?: GroupCertificateAuthorityProperties[];
}
export interface ListGroupsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface GroupInformation {
  Arn?: string;
  CreationTimestamp?: string;
  Id?: string;
  LastUpdatedTimestamp?: string;
  LatestVersion?: string;
  LatestVersionArn?: string;
  Name?: string;
}
export type __listOfGroupInformation = GroupInformation[];
const __listOfGroupInformation = /*@__PURE__*/ __L.at(__c91, 1);
export interface ListGroupsResponse {
  Groups?: GroupInformation[];
  NextToken?: string;
}
export interface ListGroupVersionsRequest {
  GroupId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface ListGroupVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListLoggerDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface ListLoggerDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export interface ListLoggerDefinitionVersionsRequest {
  LoggerDefinitionId: string;
  MaxResults?: string;
  NextToken?: string;
}
export interface ListLoggerDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListResourceDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface ListResourceDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export interface ListResourceDefinitionVersionsRequest {
  MaxResults?: string;
  NextToken?: string;
  ResourceDefinitionId: string;
}
export interface ListResourceDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListSubscriptionDefinitionsRequest {
  MaxResults?: string;
  NextToken?: string;
}
export interface ListSubscriptionDefinitionsResponse {
  Definitions?: DefinitionInformation[];
  NextToken?: string;
}
export interface ListSubscriptionDefinitionVersionsRequest {
  MaxResults?: string;
  NextToken?: string;
  SubscriptionDefinitionId: string;
}
export interface ListSubscriptionDefinitionVersionsResponse {
  NextToken?: string;
  Versions?: VersionInformation[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ResetDeploymentsRequest {
  AmznClientToken?: string;
  Force?: boolean;
  GroupId: string;
}
export interface ResetDeploymentsResponse {
  DeploymentArn?: string;
  DeploymentId?: string;
}
export interface StartBulkDeploymentRequest {
  AmznClientToken?: string;
  ExecutionRoleArn?: string;
  InputFileUri?: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartBulkDeploymentResponse {
  BulkDeploymentArn?: string;
  BulkDeploymentId?: string;
}
export interface StopBulkDeploymentRequest {
  BulkDeploymentId: string;
}
export interface StopBulkDeploymentResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateConnectivityInfoRequest {
  ConnectivityInfo?: ConnectivityInfo[];
  ThingName: string;
}
export interface UpdateConnectivityInfoResponse {
  Message?: string;
  Version?: string;
}
export interface UpdateConnectorDefinitionRequest {
  ConnectorDefinitionId: string;
  Name?: string;
}
export interface UpdateConnectorDefinitionResponse {}
export interface UpdateCoreDefinitionRequest {
  CoreDefinitionId: string;
  Name?: string;
}
export interface UpdateCoreDefinitionResponse {}
export interface UpdateDeviceDefinitionRequest {
  DeviceDefinitionId: string;
  Name?: string;
}
export interface UpdateDeviceDefinitionResponse {}
export interface UpdateFunctionDefinitionRequest {
  FunctionDefinitionId: string;
  Name?: string;
}
export interface UpdateFunctionDefinitionResponse {}
export interface UpdateGroupRequest {
  GroupId: string;
  Name?: string;
}
export interface UpdateGroupResponse {}
export interface UpdateGroupCertificateConfigurationRequest {
  CertificateExpiryInMilliseconds?: string;
  GroupId: string;
}
export interface UpdateGroupCertificateConfigurationResponse {
  CertificateAuthorityExpiryInMilliseconds?: string;
  CertificateExpiryInMilliseconds?: string;
  GroupId?: string;
}
export interface UpdateLoggerDefinitionRequest {
  LoggerDefinitionId: string;
  Name?: string;
}
export interface UpdateLoggerDefinitionResponse {}
export interface UpdateResourceDefinitionRequest {
  Name?: string;
  ResourceDefinitionId: string;
}
export interface UpdateResourceDefinitionResponse {}
export interface UpdateSubscriptionDefinitionRequest {
  Name?: string;
  SubscriptionDefinitionId: string;
}
export interface UpdateSubscriptionDefinitionResponse {}
export interface TelemetryConfigurationUpdate {
  Telemetry?: Telemetry;
}
export interface UpdateThingRuntimeConfigurationRequest {
  TelemetryConfiguration?: TelemetryConfigurationUpdate;
  ThingName: string;
}
export interface UpdateThingRuntimeConfigurationResponse {}
export type AssociateRoleToGroupError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Associates a role with a group. Your Greengrass core will use the role to access AWS cloud services. The role's permissions should allow Greengrass core Lambda functions to perform actions against the cloud.
 */
export const associateRoleToGroup: API.OperationMethod<
  AssociateRoleToGroupRequest,
  AssociateRoleToGroupResponse,
  AssociateRoleToGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<AssociateRoleToGroupRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<AssociateRoleToGroupResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateRoleToGroup",
}));

export type AssociateServiceRoleToAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Associates a role with your account. AWS IoT Greengrass will use the role to access your Lambda functions and AWS IoT resources. This is necessary for deployments to succeed. The role must have at least minimum permissions in the policy ''AWSGreengrassResourceAccessRolePolicy''.
 */
export const associateServiceRoleToAccount: API.OperationMethod<
  AssociateServiceRoleToAccountRequest,
  AssociateServiceRoleToAccountResponse,
  AssociateServiceRoleToAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<AssociateServiceRoleToAccountRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<AssociateServiceRoleToAccountResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceRoleToAccount",
}));

export type CreateConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a connector definition. You may provide the initial version of the connector definition now or use ''CreateConnectorDefinitionVersion'' at a later time.
 */
export const createConnectorDefinition: API.OperationMethod<
  CreateConnectorDefinitionRequest,
  CreateConnectorDefinitionResponse,
  CreateConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<CreateConnectorDefinitionRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateConnectorDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDefinition",
}));

export type CreateConnectorDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a connector definition which has already been defined.
 */
export const createConnectorDefinitionVersion: API.OperationMethod<
  CreateConnectorDefinitionVersionRequest,
  CreateConnectorDefinitionVersionResponse,
  CreateConnectorDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<CreateConnectorDefinitionVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateConnectorDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDefinitionVersion",
}));

export type CreateCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a core definition. You may provide the initial version of the core definition now or use ''CreateCoreDefinitionVersion'' at a later time. Greengrass groups must each contain exactly one Greengrass core.
 */
export const createCoreDefinition: API.OperationMethod<
  CreateCoreDefinitionRequest,
  CreateCoreDefinitionResponse,
  CreateCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<CreateCoreDefinitionRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateCoreDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreDefinition",
}));

export type CreateCoreDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a core definition that has already been defined. Greengrass groups must each contain exactly one Greengrass core.
 */
export const createCoreDefinitionVersion: API.OperationMethod<
  CreateCoreDefinitionVersionRequest,
  CreateCoreDefinitionVersionResponse,
  CreateCoreDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<CreateCoreDefinitionVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateCoreDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreDefinitionVersion",
}));

export type CreateDeploymentError = BadRequestException | CommonErrors;
/**
 * Creates a deployment. ''CreateDeployment'' requests are idempotent with respect to the ''X-Amzn-Client-Token'' token and the request parameters.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentRequest,
  CreateDeploymentResponse,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<CreateDeploymentRequest>,
  output: __S(1664, __c104, 0) as any as S.Schema<CreateDeploymentResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a device definition. You may provide the initial version of the device definition now or use ''CreateDeviceDefinitionVersion'' at a later time.
 */
export const createDeviceDefinition: API.OperationMethod<
  CreateDeviceDefinitionRequest,
  CreateDeviceDefinitionResponse,
  CreateDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1840, __c115, 0) as any as S.Schema<CreateDeviceDefinitionRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateDeviceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceDefinition",
}));

export type CreateDeviceDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a device definition that has already been defined.
 */
export const createDeviceDefinitionVersion: API.OperationMethod<
  CreateDeviceDefinitionVersionRequest,
  CreateDeviceDefinitionVersionResponse,
  CreateDeviceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<CreateDeviceDefinitionVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateDeviceDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceDefinitionVersion",
}));

export type CreateFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a Lambda function definition which contains a list of Lambda functions and their configurations to be used in a group. You can create an initial version of the definition by providing a list of Lambda functions and their configurations now, or use ''CreateFunctionDefinitionVersion'' later.
 */
export const createFunctionDefinition: API.OperationMethod<
  CreateFunctionDefinitionRequest,
  CreateFunctionDefinitionResponse,
  CreateFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateFunctionDefinitionRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateFunctionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionDefinition",
}));

export type CreateFunctionDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a Lambda function definition that has already been defined.
 */
export const createFunctionDefinitionVersion: API.OperationMethod<
  CreateFunctionDefinitionVersionRequest,
  CreateFunctionDefinitionVersionResponse,
  CreateFunctionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateFunctionDefinitionVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateFunctionDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionDefinitionVersion",
}));

export type CreateGroupError = BadRequestException | CommonErrors;
/**
 * Creates a group. You may provide the initial version of the group or use ''CreateGroupVersion'' at a later time. Tip: You can use the ''gg_group_setup'' package (https://github.com/awslabs/aws-greengrass-group-setup) as a library or command-line application to create and deploy Greengrass groups.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateGroupRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateGroupResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type CreateGroupCertificateAuthorityError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a CA for the group. If a CA already exists, it will rotate the existing CA.
 */
export const createGroupCertificateAuthority: API.OperationMethod<
  CreateGroupCertificateAuthorityRequest,
  CreateGroupCertificateAuthorityResponse,
  CreateGroupCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateGroupCertificateAuthorityRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateGroupCertificateAuthorityResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupCertificateAuthority",
}));

export type CreateGroupVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a group which has already been defined.
 */
export const createGroupVersion: API.OperationMethod<
  CreateGroupVersionRequest,
  CreateGroupVersionResponse,
  CreateGroupVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateGroupVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateGroupVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupVersion",
}));

export type CreateLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a logger definition. You may provide the initial version of the logger definition now or use ''CreateLoggerDefinitionVersion'' at a later time.
 */
export const createLoggerDefinition: API.OperationMethod<
  CreateLoggerDefinitionRequest,
  CreateLoggerDefinitionResponse,
  CreateLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateLoggerDefinitionRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateLoggerDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggerDefinition",
}));

export type CreateLoggerDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a logger definition that has already been defined.
 */
export const createLoggerDefinitionVersion: API.OperationMethod<
  CreateLoggerDefinitionVersionRequest,
  CreateLoggerDefinitionVersionResponse,
  CreateLoggerDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<CreateLoggerDefinitionVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateLoggerDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggerDefinitionVersion",
}));

export type CreateResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a resource definition which contains a list of resources to be used in a group. You can create an initial version of the definition by providing a list of resources now, or use ''CreateResourceDefinitionVersion'' later.
 */
export const createResourceDefinition: API.OperationMethod<
  CreateResourceDefinitionRequest,
  CreateResourceDefinitionResponse,
  CreateResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<CreateResourceDefinitionRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateResourceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDefinition",
}));

export type CreateResourceDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a resource definition that has already been defined.
 */
export const createResourceDefinitionVersion: API.OperationMethod<
  CreateResourceDefinitionVersionRequest,
  CreateResourceDefinitionVersionResponse,
  CreateResourceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<CreateResourceDefinitionVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateResourceDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDefinitionVersion",
}));

export type CreateSoftwareUpdateJobError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a software update for a core or group of cores (specified as an IoT thing group.) Use this to update the OTA Agent as well as the Greengrass core software. It makes use of the IoT Jobs feature which provides additional commands to manage a Greengrass core software update job.
 */
export const createSoftwareUpdateJob: API.OperationMethod<
  CreateSoftwareUpdateJobRequest,
  CreateSoftwareUpdateJobResponse,
  CreateSoftwareUpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<CreateSoftwareUpdateJobRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateSoftwareUpdateJobResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSoftwareUpdateJob",
}));

export type CreateSubscriptionDefinitionError = BadRequestException | CommonErrors;
/**
 * Creates a subscription definition. You may provide the initial version of the subscription definition now or use ''CreateSubscriptionDefinitionVersion'' at a later time.
 */
export const createSubscriptionDefinition: API.OperationMethod<
  CreateSubscriptionDefinitionRequest,
  CreateSubscriptionDefinitionResponse,
  CreateSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<CreateSubscriptionDefinitionRequest>,
  output: __S(848, __c53, 0) as any as S.Schema<CreateSubscriptionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionDefinition",
}));

export type CreateSubscriptionDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Creates a version of a subscription definition which has already been defined.
 */
export const createSubscriptionDefinitionVersion: API.OperationMethod<
  CreateSubscriptionDefinitionVersionRequest,
  CreateSubscriptionDefinitionVersionResponse,
  CreateSubscriptionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<CreateSubscriptionDefinitionVersionRequest>,
  output: __S(1056, __c66, 0) as any as S.Schema<CreateSubscriptionDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionDefinitionVersion",
}));

export type DeleteConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a connector definition.
 */
export const deleteConnectorDefinition: API.OperationMethod<
  DeleteConnectorDefinitionRequest,
  DeleteConnectorDefinitionResponse,
  DeleteConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteConnectorDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteConnectorDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectorDefinition",
}));

export type DeleteCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a core definition.
 */
export const deleteCoreDefinition: API.OperationMethod<
  DeleteCoreDefinitionRequest,
  DeleteCoreDefinitionResponse,
  DeleteCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteCoreDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteCoreDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCoreDefinition",
}));

export type DeleteDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a device definition.
 */
export const deleteDeviceDefinition: API.OperationMethod<
  DeleteDeviceDefinitionRequest,
  DeleteDeviceDefinitionResponse,
  DeleteDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DeleteDeviceDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteDeviceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeviceDefinition",
}));

export type DeleteFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a Lambda function definition.
 */
export const deleteFunctionDefinition: API.OperationMethod<
  DeleteFunctionDefinitionRequest,
  DeleteFunctionDefinitionResponse,
  DeleteFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DeleteFunctionDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteFunctionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionDefinition",
}));

export type DeleteGroupError = BadRequestException | CommonErrors;
/**
 * Deletes a group.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteGroupResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DeleteLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a logger definition.
 */
export const deleteLoggerDefinition: API.OperationMethod<
  DeleteLoggerDefinitionRequest,
  DeleteLoggerDefinitionResponse,
  DeleteLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<DeleteLoggerDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteLoggerDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggerDefinition",
}));

export type DeleteResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a resource definition.
 */
export const deleteResourceDefinition: API.OperationMethod<
  DeleteResourceDefinitionRequest,
  DeleteResourceDefinitionResponse,
  DeleteResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<DeleteResourceDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteResourceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceDefinition",
}));

export type DeleteSubscriptionDefinitionError = BadRequestException | CommonErrors;
/**
 * Deletes a subscription definition.
 */
export const deleteSubscriptionDefinition: API.OperationMethod<
  DeleteSubscriptionDefinitionRequest,
  DeleteSubscriptionDefinitionResponse,
  DeleteSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<DeleteSubscriptionDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<DeleteSubscriptionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionDefinition",
}));

export type DisassociateRoleFromGroupError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the role from a group.
 */
export const disassociateRoleFromGroup: API.OperationMethod<
  DisassociateRoleFromGroupRequest,
  DisassociateRoleFromGroupResponse,
  DisassociateRoleFromGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<DisassociateRoleFromGroupRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<DisassociateRoleFromGroupResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateRoleFromGroup",
}));

export type DisassociateServiceRoleFromAccountError = InternalServerErrorException | CommonErrors;
/**
 * Disassociates the service role from your account. Without a service role, deployments will not work.
 */
export const disassociateServiceRoleFromAccount: API.OperationMethod<
  DisassociateServiceRoleFromAccountRequest,
  DisassociateServiceRoleFromAccountResponse,
  DisassociateServiceRoleFromAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<DisassociateServiceRoleFromAccountRequest>,
  output: __S(592, __c37, 0) as any as S.Schema<DisassociateServiceRoleFromAccountResponse>,
  errors: [InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceRoleFromAccount",
}));

export type GetAssociatedRoleError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the role associated with a particular group.
 */
export const getAssociatedRole: API.OperationMethod<
  GetAssociatedRoleRequest,
  GetAssociatedRoleResponse,
  GetAssociatedRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<GetAssociatedRoleRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<GetAssociatedRoleResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedRole",
}));

export type GetBulkDeploymentStatusError = BadRequestException | CommonErrors;
/**
 * Returns the status of a bulk deployment.
 */
export const getBulkDeploymentStatus: API.OperationMethod<
  GetBulkDeploymentStatusRequest,
  GetBulkDeploymentStatusResponse,
  GetBulkDeploymentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<GetBulkDeploymentStatusRequest>,
  output: __S(658, __c41, 2) as any as S.Schema<GetBulkDeploymentStatusResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBulkDeploymentStatus",
}));

export type GetConnectivityInfoError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the connectivity information for a core.
 */
export const getConnectivityInfo: API.OperationMethod<
  GetConnectivityInfoRequest,
  GetConnectivityInfoResponse,
  GetConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<GetConnectivityInfoRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<GetConnectivityInfoResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectivityInfo",
}));

export type GetConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a connector definition.
 */
export const getConnectorDefinition: API.OperationMethod<
  GetConnectorDefinitionRequest,
  GetConnectorDefinitionResponse,
  GetConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<GetConnectorDefinitionRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetConnectorDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDefinition",
}));

export type GetConnectorDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a connector definition version, including the connectors that the version contains. Connectors are prebuilt modules that interact with local infrastructure, device protocols, AWS, and other cloud services.
 */
export const getConnectorDefinitionVersion: API.OperationMethod<
  GetConnectorDefinitionVersionRequest,
  GetConnectorDefinitionVersionResponse,
  GetConnectorDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<GetConnectorDefinitionVersionRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<GetConnectorDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDefinitionVersion",
}));

export type GetCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a core definition version.
 */
export const getCoreDefinition: API.OperationMethod<
  GetCoreDefinitionRequest,
  GetCoreDefinitionResponse,
  GetCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<GetCoreDefinitionRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetCoreDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreDefinition",
}));

export type GetCoreDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a core definition version.
 */
export const getCoreDefinitionVersion: API.OperationMethod<
  GetCoreDefinitionVersionRequest,
  GetCoreDefinitionVersionResponse,
  GetCoreDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<GetCoreDefinitionVersionRequest>,
  output: __S(769, __c48, 1) as any as S.Schema<GetCoreDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreDefinitionVersion",
}));

export type GetDeploymentStatusError = BadRequestException | CommonErrors;
/**
 * Returns the status of a deployment.
 */
export const getDeploymentStatus: API.OperationMethod<
  GetDeploymentStatusRequest,
  GetDeploymentStatusResponse,
  GetDeploymentStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<GetDeploymentStatusRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<GetDeploymentStatusResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentStatus",
}));

export type GetDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a device definition.
 */
export const getDeviceDefinition: API.OperationMethod<
  GetDeviceDefinitionRequest,
  GetDeviceDefinitionResponse,
  GetDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<GetDeviceDefinitionRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetDeviceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDefinition",
}));

export type GetDeviceDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a device definition version.
 */
export const getDeviceDefinitionVersion: API.OperationMethod<
  GetDeviceDefinitionVersionRequest,
  GetDeviceDefinitionVersionResponse,
  GetDeviceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<GetDeviceDefinitionVersionRequest>,
  output: __S(897, __c56, 1) as any as S.Schema<GetDeviceDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDefinitionVersion",
}));

export type GetFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a Lambda function definition, including its creation time and latest version.
 */
export const getFunctionDefinition: API.OperationMethod<
  GetFunctionDefinitionRequest,
  GetFunctionDefinitionResponse,
  GetFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<GetFunctionDefinitionRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetFunctionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionDefinition",
}));

export type GetFunctionDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a Lambda function definition version, including which Lambda functions are included in the version and their configurations.
 */
export const getFunctionDefinitionVersion: API.OperationMethod<
  GetFunctionDefinitionVersionRequest,
  GetFunctionDefinitionVersionResponse,
  GetFunctionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<GetFunctionDefinitionVersionRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<GetFunctionDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionDefinitionVersion",
}));

export type GetGroupError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a group.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<GetGroupRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetGroupResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type GetGroupCertificateAuthorityError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retreives the CA associated with a group. Returns the public key of the CA.
 */
export const getGroupCertificateAuthority: API.OperationMethod<
  GetGroupCertificateAuthorityRequest,
  GetGroupCertificateAuthorityResponse,
  GetGroupCertificateAuthorityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<GetGroupCertificateAuthorityRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<GetGroupCertificateAuthorityResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupCertificateAuthority",
}));

export type GetGroupCertificateConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the current configuration for the CA used by the group.
 */
export const getGroupCertificateConfiguration: API.OperationMethod<
  GetGroupCertificateConfigurationRequest,
  GetGroupCertificateConfigurationResponse,
  GetGroupCertificateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<GetGroupCertificateConfigurationRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<GetGroupCertificateConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupCertificateConfiguration",
}));

export type GetGroupVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a group version.
 */
export const getGroupVersion: API.OperationMethod<
  GetGroupVersionRequest,
  GetGroupVersionResponse,
  GetGroupVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<GetGroupVersionRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<GetGroupVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupVersion",
}));

export type GetLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a logger definition.
 */
export const getLoggerDefinition: API.OperationMethod<
  GetLoggerDefinitionRequest,
  GetLoggerDefinitionResponse,
  GetLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<GetLoggerDefinitionRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetLoggerDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggerDefinition",
}));

export type GetLoggerDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a logger definition version.
 */
export const getLoggerDefinitionVersion: API.OperationMethod<
  GetLoggerDefinitionVersionRequest,
  GetLoggerDefinitionVersionResponse,
  GetLoggerDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<GetLoggerDefinitionVersionRequest>,
  output: __S(1073, __c67, 1) as any as S.Schema<GetLoggerDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggerDefinitionVersion",
}));

export type GetResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a resource definition, including its creation time and latest version.
 */
export const getResourceDefinition: API.OperationMethod<
  GetResourceDefinitionRequest,
  GetResourceDefinitionResponse,
  GetResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<GetResourceDefinitionRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetResourceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDefinition",
}));

export type GetResourceDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a resource definition version, including which resources are included in the version.
 */
export const getResourceDefinitionVersion: API.OperationMethod<
  GetResourceDefinitionVersionRequest,
  GetResourceDefinitionVersionResponse,
  GetResourceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<GetResourceDefinitionVersionRequest>,
  output: __S(1105, __c69, 1) as any as S.Schema<GetResourceDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDefinitionVersion",
}));

export type GetServiceRoleForAccountError = InternalServerErrorException | CommonErrors;
/**
 * Retrieves the service role that is attached to your account.
 */
export const getServiceRoleForAccount: API.OperationMethod<
  GetServiceRoleForAccountRequest,
  GetServiceRoleForAccountResponse,
  GetServiceRoleForAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<GetServiceRoleForAccountRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<GetServiceRoleForAccountResponse>,
  errors: [InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceRoleForAccount",
}));

export type GetSubscriptionDefinitionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a subscription definition.
 */
export const getSubscriptionDefinition: API.OperationMethod<
  GetSubscriptionDefinitionRequest,
  GetSubscriptionDefinitionResponse,
  GetSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<GetSubscriptionDefinitionRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<GetSubscriptionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionDefinition",
}));

export type GetSubscriptionDefinitionVersionError = BadRequestException | CommonErrors;
/**
 * Retrieves information about a subscription definition version.
 */
export const getSubscriptionDefinitionVersion: API.OperationMethod<
  GetSubscriptionDefinitionVersionRequest,
  GetSubscriptionDefinitionVersionResponse,
  GetSubscriptionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<GetSubscriptionDefinitionVersionRequest>,
  output: __S(1153, __c72, 1) as any as S.Schema<GetSubscriptionDefinitionVersionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionDefinitionVersion",
}));

export type GetThingRuntimeConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Get the runtime configuration of a thing.
 */
export const getThingRuntimeConfiguration: API.OperationMethod<
  GetThingRuntimeConfigurationRequest,
  GetThingRuntimeConfigurationResponse,
  GetThingRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<GetThingRuntimeConfigurationRequest>,
  output: __S(1171, __c73, 3) as any as S.Schema<GetThingRuntimeConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThingRuntimeConfiguration",
}));

export type ListBulkDeploymentDetailedReportsError = BadRequestException | CommonErrors;
/**
 * Gets a paginated list of the deployments that have been started in a bulk deployment operation, and their current deployment status.
 */
export const listBulkDeploymentDetailedReports: API.OperationMethod<
  ListBulkDeploymentDetailedReportsRequest,
  ListBulkDeploymentDetailedReportsResponse,
  ListBulkDeploymentDetailedReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<ListBulkDeploymentDetailedReportsRequest>,
  output: __S(1187, __c74, 3) as any as S.Schema<ListBulkDeploymentDetailedReportsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkDeploymentDetailedReports",
}));

export type ListBulkDeploymentsError = BadRequestException | CommonErrors;
/**
 * Returns a list of bulk deployments.
 */
export const listBulkDeployments: API.OperationMethod<
  ListBulkDeploymentsRequest,
  ListBulkDeploymentsResponse,
  ListBulkDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<ListBulkDeploymentsRequest>,
  output: __S(1203, __c75, 3) as any as S.Schema<ListBulkDeploymentsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkDeployments",
}));

export type ListConnectorDefinitionsError = CommonErrors;
/**
 * Retrieves a list of connector definitions.
 */
export const listConnectorDefinitions: API.OperationMethod<
  ListConnectorDefinitionsRequest,
  ListConnectorDefinitionsResponse,
  ListConnectorDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<ListConnectorDefinitionsRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListConnectorDefinitionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDefinitions",
}));

export type ListConnectorDefinitionVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a connector definition, which are containers for connectors. Connectors run on the Greengrass core and contain built-in integration with local infrastructure, device protocols, AWS, and other cloud services.
 */
export const listConnectorDefinitionVersions: API.OperationMethod<
  ListConnectorDefinitionVersionsRequest,
  ListConnectorDefinitionVersionsResponse,
  ListConnectorDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<ListConnectorDefinitionVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListConnectorDefinitionVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDefinitionVersions",
}));

export type ListCoreDefinitionsError = CommonErrors;
/**
 * Retrieves a list of core definitions.
 */
export const listCoreDefinitions: API.OperationMethod<
  ListCoreDefinitionsRequest,
  ListCoreDefinitionsResponse,
  ListCoreDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<ListCoreDefinitionsRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListCoreDefinitionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDefinitions",
}));

export type ListCoreDefinitionVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a core definition.
 */
export const listCoreDefinitionVersions: API.OperationMethod<
  ListCoreDefinitionVersionsRequest,
  ListCoreDefinitionVersionsResponse,
  ListCoreDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<ListCoreDefinitionVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListCoreDefinitionVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDefinitionVersions",
}));

export type ListDeploymentsError = BadRequestException | CommonErrors;
/**
 * Returns a history of deployments for the group.
 */
export const listDeployments: API.OperationMethod<
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<ListDeploymentsRequest>,
  output: __S(1363, __c85, 3) as any as S.Schema<ListDeploymentsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
}));

export type ListDeviceDefinitionsError = CommonErrors;
/**
 * Retrieves a list of device definitions.
 */
export const listDeviceDefinitions: API.OperationMethod<
  ListDeviceDefinitionsRequest,
  ListDeviceDefinitionsResponse,
  ListDeviceDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<ListDeviceDefinitionsRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListDeviceDefinitionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDefinitions",
}));

export type ListDeviceDefinitionVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a device definition.
 */
export const listDeviceDefinitionVersions: API.OperationMethod<
  ListDeviceDefinitionVersionsRequest,
  ListDeviceDefinitionVersionsResponse,
  ListDeviceDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<ListDeviceDefinitionVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListDeviceDefinitionVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDefinitionVersions",
}));

export type ListFunctionDefinitionsError = CommonErrors;
/**
 * Retrieves a list of Lambda function definitions.
 */
export const listFunctionDefinitions: API.OperationMethod<
  ListFunctionDefinitionsRequest,
  ListFunctionDefinitionsResponse,
  ListFunctionDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<ListFunctionDefinitionsRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListFunctionDefinitionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionDefinitions",
}));

export type ListFunctionDefinitionVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a Lambda function definition.
 */
export const listFunctionDefinitionVersions: API.OperationMethod<
  ListFunctionDefinitionVersionsRequest,
  ListFunctionDefinitionVersionsResponse,
  ListFunctionDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<ListFunctionDefinitionVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListFunctionDefinitionVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionDefinitionVersions",
}));

export type ListGroupCertificateAuthoritiesError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the current CAs for a group.
 */
export const listGroupCertificateAuthorities: API.OperationMethod<
  ListGroupCertificateAuthoritiesRequest,
  ListGroupCertificateAuthoritiesResponse,
  ListGroupCertificateAuthoritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<ListGroupCertificateAuthoritiesRequest>,
  output: __S(1443, __c90, 3) as any as S.Schema<ListGroupCertificateAuthoritiesResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupCertificateAuthorities",
}));

export type ListGroupsError = CommonErrors;
/**
 * Retrieves a list of groups.
 */
export const listGroups: API.OperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<ListGroupsRequest>,
  output: __S(1458, __c91, 2) as any as S.Schema<ListGroupsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
}));

export type ListGroupVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a group.
 */
export const listGroupVersions: API.OperationMethod<
  ListGroupVersionsRequest,
  ListGroupVersionsResponse,
  ListGroupVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<ListGroupVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListGroupVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupVersions",
}));

export type ListLoggerDefinitionsError = CommonErrors;
/**
 * Retrieves a list of logger definitions.
 */
export const listLoggerDefinitions: API.OperationMethod<
  ListLoggerDefinitionsRequest,
  ListLoggerDefinitionsResponse,
  ListLoggerDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<ListLoggerDefinitionsRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListLoggerDefinitionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggerDefinitions",
}));

export type ListLoggerDefinitionVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a logger definition.
 */
export const listLoggerDefinitionVersions: API.OperationMethod<
  ListLoggerDefinitionVersionsRequest,
  ListLoggerDefinitionVersionsResponse,
  ListLoggerDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<ListLoggerDefinitionVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListLoggerDefinitionVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggerDefinitionVersions",
}));

export type ListResourceDefinitionsError = CommonErrors;
/**
 * Retrieves a list of resource definitions.
 */
export const listResourceDefinitions: API.OperationMethod<
  ListResourceDefinitionsRequest,
  ListResourceDefinitionsResponse,
  ListResourceDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<ListResourceDefinitionsRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListResourceDefinitionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDefinitions",
}));

export type ListResourceDefinitionVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a resource definition.
 */
export const listResourceDefinitionVersions: API.OperationMethod<
  ListResourceDefinitionVersionsRequest,
  ListResourceDefinitionVersionsResponse,
  ListResourceDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<ListResourceDefinitionVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListResourceDefinitionVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDefinitionVersions",
}));

export type ListSubscriptionDefinitionsError = CommonErrors;
/**
 * Retrieves a list of subscription definitions.
 */
export const listSubscriptionDefinitions: API.OperationMethod<
  ListSubscriptionDefinitionsRequest,
  ListSubscriptionDefinitionsResponse,
  ListSubscriptionDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<ListSubscriptionDefinitionsRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<ListSubscriptionDefinitionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionDefinitions",
}));

export type ListSubscriptionDefinitionVersionsError = BadRequestException | CommonErrors;
/**
 * Lists the versions of a subscription definition.
 */
export const listSubscriptionDefinitionVersions: API.OperationMethod<
  ListSubscriptionDefinitionVersionsRequest,
  ListSubscriptionDefinitionVersionsResponse,
  ListSubscriptionDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<ListSubscriptionDefinitionVersionsRequest>,
  output: __S(1313, __c82, 1) as any as S.Schema<ListSubscriptionDefinitionVersionsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionDefinitionVersions",
}));

export type ListTagsForResourceError = BadRequestException | CommonErrors;
/**
 * Retrieves a list of resource tags for a resource arn.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1601, __c100, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ResetDeploymentsError = BadRequestException | CommonErrors;
/**
 * Resets a group's deployments.
 */
export const resetDeployments: API.OperationMethod<
  ResetDeploymentsRequest,
  ResetDeploymentsResponse,
  ResetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<ResetDeploymentsRequest>,
  output: __S(1664, __c104, 0) as any as S.Schema<ResetDeploymentsResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDeployments",
}));

export type StartBulkDeploymentError = BadRequestException | CommonErrors;
/**
 * Deploys multiple groups in one operation. This action starts the bulk deployment of a specified set of group versions. Each group version deployment will be triggered with an adaptive rate that has a fixed upper limit. We recommend that you include an ''X-Amzn-Client-Token'' token in every ''StartBulkDeployment'' request. These requests are idempotent with respect to the token and the request parameters.
 */
export const startBulkDeployment: API.OperationMethod<
  StartBulkDeploymentRequest,
  StartBulkDeploymentResponse,
  StartBulkDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<StartBulkDeploymentRequest>,
  output: __S(1633, __c102, 1) as any as S.Schema<StartBulkDeploymentResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBulkDeployment",
}));

export type StopBulkDeploymentError = BadRequestException | CommonErrors;
/**
 * Stops the execution of a bulk deployment. This action returns a status of ''Stopping'' until the deployment is stopped. You cannot start a new bulk deployment while a previous deployment is in the ''Stopping'' state. This action doesn't rollback completed deployments or cancel pending deployments.
 */
export const stopBulkDeployment: API.OperationMethod<
  StopBulkDeploymentRequest,
  StopBulkDeploymentResponse,
  StopBulkDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<StopBulkDeploymentRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<StopBulkDeploymentResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBulkDeployment",
}));

export type TagResourceError = BadRequestException | CommonErrors;
/**
 * Adds tags to a Greengrass resource. Valid resources are 'Group', 'ConnectorDefinition', 'CoreDefinition', 'DeviceDefinition', 'FunctionDefinition', 'LoggerDefinition', 'SubscriptionDefinition', 'ResourceDefinition', and 'BulkDeployment'.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c106, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<TagResourceResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = BadRequestException | CommonErrors;
/**
 * Remove resource tags from a Greengrass Resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConnectivityInfoError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the connectivity information for the core. Any devices that belong to the group which has this core will receive this information in order to find the location of the core and connect to it.
 */
export const updateConnectivityInfo: API.OperationMethod<
  UpdateConnectivityInfoRequest,
  UpdateConnectivityInfoResponse,
  UpdateConnectivityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<UpdateConnectivityInfoRequest>,
  output: __S(1729, __c108, 1) as any as S.Schema<UpdateConnectivityInfoResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectivityInfo",
}));

export type UpdateConnectorDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a connector definition.
 */
export const updateConnectorDefinition: API.OperationMethod<
  UpdateConnectorDefinitionRequest,
  UpdateConnectorDefinitionResponse,
  UpdateConnectorDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<UpdateConnectorDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateConnectorDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectorDefinition",
}));

export type UpdateCoreDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a core definition.
 */
export const updateCoreDefinition: API.OperationMethod<
  UpdateCoreDefinitionRequest,
  UpdateCoreDefinitionResponse,
  UpdateCoreDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<UpdateCoreDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateCoreDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCoreDefinition",
}));

export type UpdateDeviceDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a device definition.
 */
export const updateDeviceDefinition: API.OperationMethod<
  UpdateDeviceDefinitionRequest,
  UpdateDeviceDefinitionResponse,
  UpdateDeviceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<UpdateDeviceDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateDeviceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceDefinition",
}));

export type UpdateFunctionDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a Lambda function definition.
 */
export const updateFunctionDefinition: API.OperationMethod<
  UpdateFunctionDefinitionRequest,
  UpdateFunctionDefinitionResponse,
  UpdateFunctionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<UpdateFunctionDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateFunctionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionDefinition",
}));

export type UpdateGroupError = BadRequestException | CommonErrors;
/**
 * Updates a group.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<UpdateGroupRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateGroupResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateGroupCertificateConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the Certificate expiry time for a group.
 */
export const updateGroupCertificateConfiguration: API.OperationMethod<
  UpdateGroupCertificateConfigurationRequest,
  UpdateGroupCertificateConfigurationResponse,
  UpdateGroupCertificateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<UpdateGroupCertificateConfigurationRequest>,
  output: __S(992, __c62, 0) as any as S.Schema<UpdateGroupCertificateConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupCertificateConfiguration",
}));

export type UpdateLoggerDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a logger definition.
 */
export const updateLoggerDefinition: API.OperationMethod<
  UpdateLoggerDefinitionRequest,
  UpdateLoggerDefinitionResponse,
  UpdateLoggerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1872, __c117, 0) as any as S.Schema<UpdateLoggerDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateLoggerDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggerDefinition",
}));

export type UpdateResourceDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a resource definition.
 */
export const updateResourceDefinition: API.OperationMethod<
  UpdateResourceDefinitionRequest,
  UpdateResourceDefinitionResponse,
  UpdateResourceDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c118, 0) as any as S.Schema<UpdateResourceDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateResourceDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceDefinition",
}));

export type UpdateSubscriptionDefinitionError = BadRequestException | CommonErrors;
/**
 * Updates a subscription definition.
 */
export const updateSubscriptionDefinition: API.OperationMethod<
  UpdateSubscriptionDefinitionRequest,
  UpdateSubscriptionDefinitionResponse,
  UpdateSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1904, __c119, 0) as any as S.Schema<UpdateSubscriptionDefinitionRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateSubscriptionDefinitionResponse>,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionDefinition",
}));

export type UpdateThingRuntimeConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the runtime configuration of a thing.
 */
export const updateThingRuntimeConfiguration: API.OperationMethod<
  UpdateThingRuntimeConfigurationRequest,
  UpdateThingRuntimeConfigurationResponse,
  UpdateThingRuntimeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1921, __c120, 1) as any as S.Schema<UpdateThingRuntimeConfigurationRequest>,
  output: __S(432, __c27, 0) as any as S.Schema<UpdateThingRuntimeConfigurationResponse>,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingRuntimeConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DetailedErrorCode: S.optional(S.String),
          DetailedErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ErrorDetail" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
          Devices: S.optional(__listOfDevice),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/definition/devices/{DeviceDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeviceDefinitionVersionRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(64, __c4, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/definition/functions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFunctionDefinitionRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Gid: S.optional(S.Number), Uid: S.optional(S.Number) }),
      ).annotate({ identifier: "FunctionRunAsConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IsolationMode: S.optional(S.String), RunAs: S.optional(__S(48, __c3, 0)) }),
      ).annotate({ identifier: "FunctionDefaultExecutionConfig" });
    case 2:
      return S.suspend(() => S.Struct({ Execution: S.optional(__S(49, __c3, 1)) })).annotate({
        identifier: "FunctionDefaultConfig",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ Permission: S.optional(S.String), ResourceId: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceAccessPolicy" });
    case 4:
      return S.Array(__S(51, __c3, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AccessSysfs: S.optional(S.Boolean),
          Execution: S.optional(__S(49, __c3, 1)),
          ResourceAccessPolicies: S.optional(__listOfResourceAccessPolicy),
          Variables: S.optional(__mapOf__string),
        }),
      ).annotate({ identifier: "FunctionConfigurationEnvironment" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          EncodingType: S.optional(S.String),
          Environment: S.optional(__S(53, __c3, 5)),
          ExecArgs: S.optional(S.String),
          Executable: S.optional(S.String),
          MemorySize: S.optional(S.Number),
          Pinned: S.optional(S.Boolean),
          Timeout: S.optional(S.Number),
          FunctionRuntimeOverride: S.optional(S.String),
        }),
      ).annotate({ identifier: "FunctionConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          FunctionArn: S.optional(S.String),
          FunctionConfiguration: S.optional(__S(54, __c3, 6)),
          Id: S.optional(S.String),
        }),
      ).annotate({ identifier: "Function" });
    case 8:
      return S.Array(__S(55, __c3, 7));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DefaultConfig: S.optional(__S(50, __c3, 2)),
          Functions: S.optional(__listOfFunction),
        }),
      ).annotate({ identifier: "FunctionDefinitionVersion" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          DefaultConfig: S.optional(__S(50, __c3, 2)),
          FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
          Functions: S.optional(__listOfFunction),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/definition/functions/{FunctionDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFunctionDefinitionVersionRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(112, __c7, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/groups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGroupRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorDefinitionVersionArn: S.optional(S.String),
          CoreDefinitionVersionArn: S.optional(S.String),
          DeviceDefinitionVersionArn: S.optional(S.String),
          FunctionDefinitionVersionArn: S.optional(S.String),
          LoggerDefinitionVersionArn: S.optional(S.String),
          ResourceDefinitionVersionArn: S.optional(S.String),
          SubscriptionDefinitionVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupVersion" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/groups/{GroupId}/certificateauthorities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGroupCertificateAuthorityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GroupCertificateAuthorityArn: S.optional(S.String) }),
      ).annotate({ identifier: "CreateGroupCertificateAuthorityResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          ConnectorDefinitionVersionArn: S.optional(S.String),
          CoreDefinitionVersionArn: S.optional(S.String),
          DeviceDefinitionVersionArn: S.optional(S.String),
          FunctionDefinitionVersionArn: S.optional(S.String),
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
          LoggerDefinitionVersionArn: S.optional(S.String),
          ResourceDefinitionVersionArn: S.optional(S.String),
          SubscriptionDefinitionVersionArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/groups/{GroupId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGroupVersionRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(192, __c12, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/definition/loggers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLoggerDefinitionRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Component: S.optional(S.String),
          Id: S.optional(S.String),
          Level: S.optional(S.String),
          Space: S.optional(S.Number),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "Logger" });
    case 1:
      return S.Array(__S(176, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Loggers: S.optional(__listOfLogger) })).annotate({
        identifier: "LoggerDefinitionVersion",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
          Loggers: S.optional(__listOfLogger),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/definition/loggers/{LoggerDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLoggerDefinitionVersionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(272, __c17, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/definition/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResourceDefinitionRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoAddGroupOwner: S.optional(S.Boolean), GroupOwner: S.optional(S.String) }),
      ).annotate({ identifier: "GroupOwnerSetting" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupOwnerSetting: S.optional(__S(256, __c16, 0)),
          SourcePath: S.optional(S.String),
        }),
      ).annotate({ identifier: "LocalDeviceResourceData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DestinationPath: S.optional(S.String),
          GroupOwnerSetting: S.optional(__S(256, __c16, 0)),
          SourcePath: S.optional(S.String),
        }),
      ).annotate({ identifier: "LocalVolumeResourceData" });
    case 3:
      return S.suspend(() =>
        S.Struct({ GroupOwner: S.optional(S.String), GroupPermission: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceDownloadOwnerSetting" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          DestinationPath: S.optional(S.String),
          OwnerSetting: S.optional(__S(259, __c16, 3)),
          S3Uri: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3MachineLearningModelResourceData" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DestinationPath: S.optional(S.String),
          OwnerSetting: S.optional(__S(259, __c16, 3)),
          SageMakerJobArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SageMakerMachineLearningModelResourceData" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ARN: S.optional(S.String),
          AdditionalStagingLabelsToDownload: S.optional(__listOf__string),
        }),
      ).annotate({ identifier: "SecretsManagerSecretResourceData" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          LocalDeviceResourceData: S.optional(__S(257, __c16, 1)),
          LocalVolumeResourceData: S.optional(__S(258, __c16, 2)),
          S3MachineLearningModelResourceData: S.optional(__S(260, __c16, 4)),
          SageMakerMachineLearningModelResourceData: S.optional(__S(261, __c16, 5)),
          SecretsManagerSecretResourceData: S.optional(__S(262, __c16, 6)),
        }),
      ).annotate({ identifier: "ResourceDataContainer" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          ResourceDataContainer: S.optional(__S(263, __c16, 7)),
        }),
      ).annotate({ identifier: "Resource" });
    case 9:
      return S.Array(__S(264, __c16, 8));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Resources: S.optional(__listOfResource) })).annotate({
        identifier: "ResourceDefinitionVersion",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
          Resources: S.optional(__listOfResource),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/definition/resources/{ResourceDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResourceDefinitionVersionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
          RoleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/groups/{GroupId}/role" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateRoleToGroupRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AssociatedAt: S.optional(S.String) })).annotate({
        identifier: "AssociateRoleToGroupResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          S3UrlSignerRole: S.optional(S.String),
          SoftwareToUpdate: S.optional(S.String),
          UpdateAgentLogLevel: S.optional(S.String),
          UpdateTargets: S.optional(UpdateTargets),
          UpdateTargetsArchitecture: S.optional(S.String),
          UpdateTargetsOperatingSystem: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/updates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSoftwareUpdateJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IotJobArn: S.optional(S.String),
          IotJobId: S.optional(S.String),
          PlatformSoftwareVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateSoftwareUpdateJobResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(384, __c24, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/definition/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionDefinitionRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Source: S.optional(S.String),
          Subject: S.optional(S.String),
          Target: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subscription" });
    case 1:
      return S.Array(__S(368, __c23, 0));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Subscriptions: S.optional(__listOfSubscription) }),
      ).annotate({ identifier: "SubscriptionDefinitionVersion" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          SubscriptionDefinitionId: S.String.pipe(T.HttpLabel("SubscriptionDefinitionId")),
          Subscriptions: S.optional(__listOfSubscription),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSubscriptionDefinitionVersionRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConnectorDefinitionRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteConnectorDefinitionResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/definition/cores/{CoreDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCoreDefinitionRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/greengrass/definition/devices/{DeviceDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDeviceDefinitionRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/greengrass/definition/functions/{FunctionDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionDefinitionRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/groups/{GroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/greengrass/definition/loggers/{LoggerDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLoggerDefinitionRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/greengrass/definition/resources/{ResourceDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourceDefinitionRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RoleArn: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/servicerole" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateServiceRoleToAccountRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionDefinitionId: S.String.pipe(T.HttpLabel("SubscriptionDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSubscriptionDefinitionRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/groups/{GroupId}/role" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateRoleFromGroupRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DisassociatedAt: S.optional(S.String) })).annotate({
        identifier: "DisassociateRoleFromGroupResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/greengrass/servicerole" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateServiceRoleFromAccountRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}/role" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssociatedRoleRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AssociatedAt: S.optional(S.String), RoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "GetAssociatedRoleResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BulkDeploymentId: S.String.pipe(T.HttpLabel("BulkDeploymentId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/bulk/deployments/{BulkDeploymentId}/status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBulkDeploymentStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InvalidInputRecords: S.optional(S.Number),
          RecordsProcessed: S.optional(S.Number),
          RetryAttempts: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BulkDeploymentMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BulkDeploymentMetrics: S.optional(__S(657, __c41, 1)),
          BulkDeploymentStatus: S.optional(S.String),
          CreatedAt: S.optional(S.String),
          ErrorDetails: S.optional(__S(1, __c0, 1)),
          ErrorMessage: S.optional(S.String),
          tags: S.optional(Tags),
        }),
      ).annotate({ identifier: "GetBulkDeploymentStatusResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ThingName: S.String.pipe(T.HttpLabel("ThingName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/things/{ThingName}/connectivityInfo" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectivityInfoRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConnectivityInfo: S.optional(__listOfConnectivityInfo),
          Message: S.optional(S.String),
        }).pipe(S.encodeKeys({ Message: "message" })),
      ).annotate({ identifier: "GetConnectivityInfoResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          HostAddress: S.optional(S.String),
          Id: S.optional(S.String),
          Metadata: S.optional(S.String),
          PortNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ConnectivityInfo" });
    case 1:
      return S.Array(__S(688, __c43, 0));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorDefinitionRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Id: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.String),
          LatestVersion: S.optional(S.String),
          LatestVersionArn: S.optional(S.String),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }),
      ).annotate({ identifier: "GetConnectorDefinitionResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
          ConnectorDefinitionVersionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionVersionId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}/versions/{ConnectorDefinitionVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetConnectorDefinitionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(800, __c50, 0)),
          Id: S.optional(S.String),
          NextToken: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetConnectorDefinitionVersionResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/cores/{CoreDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCoreDefinitionRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
          CoreDefinitionVersionId: S.String.pipe(T.HttpLabel("CoreDefinitionVersionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/cores/{CoreDefinitionId}/versions/{CoreDefinitionVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCoreDefinitionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(1264, __c79, 0)),
          Id: S.optional(S.String),
          NextToken: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCoreDefinitionVersionResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(800, __c50, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/definition/connectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectorDefinitionRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Connectors: S.optional(__listOfConnector) })).annotate({
        identifier: "ConnectorDefinitionVersion",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorArn: S.optional(S.String),
          Id: S.optional(S.String),
          Parameters: S.optional(__mapOf__string),
        }),
      ).annotate({ identifier: "Connector" });
    case 1:
      return S.Array(__S(816, __c51, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Id: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.String),
          LatestVersion: S.optional(S.String),
          LatestVersionArn: S.optional(S.String),
          Name: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConnectorDefinitionResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeploymentId: S.String.pipe(T.HttpLabel("DeploymentId")),
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/groups/{GroupId}/deployments/{DeploymentId}/status",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeploymentStatus: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          ErrorDetails: S.optional(__S(1, __c0, 1)),
          ErrorMessage: S.optional(S.String),
          UpdatedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDeploymentStatusResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/devices/{DeviceDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeviceDefinitionRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
          DeviceDefinitionVersionId: S.String.pipe(T.HttpLabel("DeviceDefinitionVersionId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/devices/{DeviceDefinitionId}/versions/{DeviceDefinitionVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeviceDefinitionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(1856, __c116, 0)),
          Id: S.optional(S.String),
          NextToken: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDeviceDefinitionVersionResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/functions/{FunctionDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionDefinitionRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
          FunctionDefinitionVersionId: S.String.pipe(T.HttpLabel("FunctionDefinitionVersionId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/functions/{FunctionDefinitionId}/versions/{FunctionDefinitionVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFunctionDefinitionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(64, __c4, 0)),
          Id: S.optional(S.String),
          NextToken: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetFunctionDefinitionVersionResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateAuthorityId: S.String.pipe(T.HttpLabel("CertificateAuthorityId")),
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/groups/{GroupId}/certificateauthorities/{CertificateAuthorityId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupCertificateAuthorityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupCertificateAuthorityArn: S.optional(S.String),
          GroupCertificateAuthorityId: S.optional(S.String),
          PemEncodedCertificate: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetGroupCertificateAuthorityResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/groups/{GroupId}/certificateauthorities/configuration/expiry",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupCertificateConfigurationRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateAuthorityExpiryInMilliseconds: S.optional(S.String),
          CertificateExpiryInMilliseconds: S.optional(S.String),
          GroupId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetGroupCertificateConfigurationResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
          GroupVersionId: S.String.pipe(T.HttpLabel("GroupVersionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/groups/{GroupId}/versions/{GroupVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(112, __c7, 0)),
          Id: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetGroupVersionResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/loggers/{LoggerDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLoggerDefinitionRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
          Connectors: S.optional(__listOfConnector),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConnectorDefinitionVersionRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Id: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateConnectorDefinitionVersionResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
          LoggerDefinitionVersionId: S.String.pipe(T.HttpLabel("LoggerDefinitionVersionId")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/loggers/{LoggerDefinitionId}/versions/{LoggerDefinitionVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLoggerDefinitionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(192, __c12, 0)),
          Id: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetLoggerDefinitionVersionResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")) }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/resources/{ResourceDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceDefinitionRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
          ResourceDefinitionVersionId: S.String.pipe(T.HttpLabel("ResourceDefinitionVersionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/resources/{ResourceDefinitionId}/versions/{ResourceDefinitionVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceDefinitionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(272, __c17, 0)),
          Id: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourceDefinitionVersionResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/servicerole" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceRoleForAccountRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionDefinitionId: S.String.pipe(T.HttpLabel("SubscriptionDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionDefinitionRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          SubscriptionDefinitionId: S.String.pipe(T.HttpLabel("SubscriptionDefinitionId")),
          SubscriptionDefinitionVersionId: S.String.pipe(
            T.HttpLabel("SubscriptionDefinitionVersionId"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions/{SubscriptionDefinitionVersionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSubscriptionDefinitionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Definition: S.optional(__S(384, __c24, 0)),
          Id: S.optional(S.String),
          NextToken: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSubscriptionDefinitionVersionResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ThingName: S.String.pipe(T.HttpLabel("ThingName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/things/{ThingName}/runtimeconfig" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetThingRuntimeConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationSyncStatus: S.optional(S.String),
          Telemetry: S.optional(S.String),
        }),
      ).annotate({ identifier: "TelemetryConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ TelemetryConfiguration: S.optional(__S(1169, __c73, 1)) }),
      ).annotate({ identifier: "RuntimeConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ RuntimeConfiguration: S.optional(__S(1170, __c73, 2)) }),
      ).annotate({ identifier: "GetThingRuntimeConfigurationResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BulkDeploymentId: S.String.pipe(T.HttpLabel("BulkDeploymentId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/bulk/deployments/{BulkDeploymentId}/detailed-reports",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBulkDeploymentDetailedReportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(S.String),
          DeploymentArn: S.optional(S.String),
          DeploymentId: S.optional(S.String),
          DeploymentStatus: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          ErrorDetails: S.optional(__S(1, __c0, 1)),
          ErrorMessage: S.optional(S.String),
          GroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "BulkDeploymentResult" });
    case 2:
      return S.Array(__S(1185, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Deployments: S.optional(__S(1186, __c74, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBulkDeploymentDetailedReportsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/bulk/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBulkDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BulkDeploymentArn: S.optional(S.String),
          BulkDeploymentId: S.optional(S.String),
          CreatedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "BulkDeployment" });
    case 2:
      return S.Array(__S(1201, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BulkDeployments: S.optional(__S(1202, __c75, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBulkDeploymentsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/connectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectorDefinitionsRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTimestamp: S.optional(S.String),
          Id: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.String),
          LatestVersion: S.optional(S.String),
          LatestVersionArn: S.optional(S.String),
          Name: S.optional(S.String),
          Tags: S.optional(Tags),
        }).pipe(S.encodeKeys({ Tags: "tags" })),
      ).annotate({ identifier: "DefinitionInformation" });
    case 1:
      return S.Array(__S(1232, __c77, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Definitions: S.optional(__listOfDefinitionInformation),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListConnectorDefinitionsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(1264, __c79, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/definition/cores" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCoreDefinitionRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Cores: S.optional(__listOfCore) })).annotate({
        identifier: "CoreDefinitionVersion",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          Id: S.optional(S.String),
          SyncShadow: S.optional(S.Boolean),
          ThingArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Core" });
    case 1:
      return S.Array(__S(1280, __c80, 0));
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConnectorDefinitionVersionsRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1056, __c66, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          Versions: S.optional(__listOfVersionInformation),
        }),
      ).annotate({ identifier: "ListConnectorDefinitionVersionsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/cores" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCoreDefinitionsRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/cores/{CoreDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCoreDefinitionVersionsRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(S.String),
          DeploymentArn: S.optional(S.String),
          DeploymentId: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          GroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Deployment" });
    case 2:
      return S.Array(__S(1361, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Deployments: S.optional(__S(1362, __c85, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDeploymentsResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeviceDefinitionsRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/devices/{DeviceDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeviceDefinitionVersionsRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/functions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionDefinitionsRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/functions/{FunctionDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFunctionDefinitionVersionsRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupId: S.String.pipe(T.HttpLabel("GroupId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}/certificateauthorities" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupCertificateAuthoritiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupCertificateAuthorityArn: S.optional(S.String),
          GroupCertificateAuthorityId: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupCertificateAuthorityProperties" });
    case 2:
      return S.Array(__S(1441, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GroupCertificateAuthorities: S.optional(__listOfGroupCertificateAuthorityProperties),
        }),
      ).annotate({ identifier: "ListGroupCertificateAuthoritiesResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/greengrass/groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGroupsRequest" });
    case 1:
      return S.Array(__S(848, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Groups: S.optional(__listOfGroupInformation), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGroupsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
          Cores: S.optional(__listOfCore),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/greengrass/definition/cores/{CoreDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCoreDefinitionVersionRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/groups/{GroupId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupVersionsRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/loggers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLoggerDefinitionsRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/loggers/{LoggerDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLoggerDefinitionVersionsRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceDefinitionsRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/resources/{ResourceDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceDefinitionVersionsRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/greengrass/definition/subscriptions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionDefinitionsRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.String).pipe(T.HttpQuery("MaxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          SubscriptionDefinitionId: S.String.pipe(T.HttpLabel("SubscriptionDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSubscriptionDefinitionVersionsRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(Tags) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          Force: S.optional(S.Boolean),
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/groups/{GroupId}/deployments/$reset" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResetDeploymentsRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          ExecutionRoleArn: S.optional(S.String),
          InputFileUri: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/bulk/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartBulkDeploymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BulkDeploymentArn: S.optional(S.String),
          BulkDeploymentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartBulkDeploymentResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          DeploymentId: S.optional(S.String),
          DeploymentType: S.optional(S.String),
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
          GroupVersionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/groups/{GroupId}/deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeploymentRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeploymentArn: S.optional(S.String), DeploymentId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDeploymentResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BulkDeploymentId: S.String.pipe(T.HttpLabel("BulkDeploymentId")) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/bulk/deployments/{BulkDeploymentId}/$stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopBulkDeploymentRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectivityInfo: S.optional(__listOfConnectivityInfo),
          ThingName: S.String.pipe(T.HttpLabel("ThingName")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/things/{ThingName}/connectivityInfo" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectivityInfoRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Message: S.optional(S.String), Version: S.optional(S.String) }).pipe(
          S.encodeKeys({ Message: "message" }),
        ),
      ).annotate({ identifier: "UpdateConnectivityInfoResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConnectorDefinitionId: S.String.pipe(T.HttpLabel("ConnectorDefinitionId")),
          Name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/greengrass/definition/connectors/{ConnectorDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConnectorDefinitionRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CoreDefinitionId: S.String.pipe(T.HttpLabel("CoreDefinitionId")),
          Name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/definition/cores/{CoreDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCoreDefinitionRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DeviceDefinitionId: S.String.pipe(T.HttpLabel("DeviceDefinitionId")),
          Name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/definition/devices/{DeviceDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDeviceDefinitionRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FunctionDefinitionId: S.String.pipe(T.HttpLabel("FunctionDefinitionId")),
          Name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/greengrass/definition/functions/{FunctionDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFunctionDefinitionRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
          Name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/groups/{GroupId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGroupRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateExpiryInMilliseconds: S.optional(S.String),
          GroupId: S.String.pipe(T.HttpLabel("GroupId")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/greengrass/groups/{GroupId}/certificateauthorities/configuration/expiry",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGroupCertificateConfigurationRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AmznClientToken: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Client-Token")),
          InitialVersion: S.optional(__S(1856, __c116, 0)),
          Name: S.optional(S.String),
          tags: S.optional(Tags),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/greengrass/definition/devices" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeviceDefinitionRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Devices: S.optional(__listOfDevice) })).annotate({
        identifier: "DeviceDefinitionVersion",
      });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoggerDefinitionId: S.String.pipe(T.HttpLabel("LoggerDefinitionId")),
          Name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/definition/loggers/{LoggerDefinitionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLoggerDefinitionRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ResourceDefinitionId: S.String.pipe(T.HttpLabel("ResourceDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/greengrass/definition/resources/{ResourceDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResourceDefinitionRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SubscriptionDefinitionId: S.String.pipe(T.HttpLabel("SubscriptionDefinitionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSubscriptionDefinitionRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Telemetry: S.optional(S.String) })).annotate({
        identifier: "TelemetryConfigurationUpdate",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TelemetryConfiguration: S.optional(__S(1920, __c120, 0)),
          ThingName: S.String.pipe(T.HttpLabel("ThingName")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/greengrass/things/{ThingName}/runtimeconfig" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateThingRuntimeConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
