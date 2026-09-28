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
  sdkId: "Greengrass",
  target: "Greengrass",
  version: "2017-06-07",
  sigv4: "greengrass",
  protocol: restJson1Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (Region === "dataplane-us-gov-east-1") {
            return e(
              "https://greengrass-ats.iot.us-gov-east-1.amazonaws.com",
              {
                authSchemes: [
                  {
                    name: "sigv4",
                    signingName: "greengrass",
                    signingRegion: "us-gov-east-1",
                  },
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
                  {
                    name: "sigv4",
                    signingName: "greengrass",
                    signingRegion: "us-gov-west-1",
                  },
                ],
              },
              {},
            );
          }
          return e(
            `https://greengrass.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly ErrorDetails?: ErrorDetail[]; readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly ErrorDetails?: ErrorDetail[]; readonly message?: string }> {}
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
export interface Connector {
  ConnectorArn?: string;
  Id?: string;
  Parameters?: { [key: string]: string | undefined };
}
export type __listOfConnector = Connector[];
export interface ConnectorDefinitionVersion {
  Connectors?: Connector[];
}
export type Tags = { [key: string]: string | undefined };
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
export type FunctionIsolationMode =
  | "GreengrassContainer"
  | "NoContainer"
  | (string & {});
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
export type LoggerLevel =
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export type LoggerType = "FileSystem" | "AWSCloudWatch" | (string & {});
export interface Logger {
  Component?: LoggerComponent;
  Id?: string;
  Level?: LoggerLevel;
  Space?: number;
  Type?: LoggerType;
}
export type __listOfLogger = Logger[];
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
export type UpdateTargetsArchitecture =
  | "armv6l"
  | "armv7l"
  | "x86_64"
  | "aarch64"
  | (string & {});
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
    Devices: (Device & {
      CertificateArn: string;
      Id: string;
      ThingArn: string;
    })[];
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
          ResourceAccessPolicies: (ResourceAccessPolicy & {
            ResourceId: string;
          })[];
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
export type __listOfGroupCertificateAuthorityProperties =
  GroupCertificateAuthorityProperties[];
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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/groups/{GroupId}/role",
    input: { GroupId: 0, RoleArn: 0 },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateRoleToGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/servicerole",
    input: { RoleArn: 0 },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceRoleToAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/connectors",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: { Connectors: D.list(i_Connector) },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDefinition",
})) as any;

export type CreateConnectorDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a connector definition which has already been defined.
 */
export const createConnectorDefinitionVersion: API.OperationMethod<
  CreateConnectorDefinitionVersionRequest,
  CreateConnectorDefinitionVersionResponse,
  CreateConnectorDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/connectors/{ConnectorDefinitionId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      ConnectorDefinitionId: 0,
      Connectors: D.list(i_Connector),
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnectorDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/cores",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: { Cores: D.list(i_Core) },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreDefinition",
})) as any;

export type CreateCoreDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a core definition that has already been defined. Greengrass groups must each contain exactly one Greengrass core.
 */
export const createCoreDefinitionVersion: API.OperationMethod<
  CreateCoreDefinitionVersionRequest,
  CreateCoreDefinitionVersionResponse,
  CreateCoreDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/cores/{CoreDefinitionId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      CoreDefinitionId: 0,
      Cores: D.list(i_Core),
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCoreDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/groups/{GroupId}/deployments",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      DeploymentId: 0,
      DeploymentType: 0,
      GroupId: 0,
      GroupVersionId: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/devices",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: { Devices: D.list(i_Device) },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceDefinition",
})) as any;

export type CreateDeviceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a device definition that has already been defined.
 */
export const createDeviceDefinitionVersion: API.OperationMethod<
  CreateDeviceDefinitionVersionRequest,
  CreateDeviceDefinitionVersionResponse,
  CreateDeviceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/devices/{DeviceDefinitionId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      DeviceDefinitionId: 0,
      Devices: D.list(i_Device),
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeviceDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/functions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: {
        DefaultConfig: i_FunctionDefaultConfig,
        Functions: D.list(i_Function),
      },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionDefinition",
})) as any;

export type CreateFunctionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a Lambda function definition that has already been defined.
 */
export const createFunctionDefinitionVersion: API.OperationMethod<
  CreateFunctionDefinitionVersionRequest,
  CreateFunctionDefinitionVersionResponse,
  CreateFunctionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/functions/{FunctionDefinitionId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      DefaultConfig: i_FunctionDefaultConfig,
      FunctionDefinitionId: 0,
      Functions: D.list(i_Function),
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/groups",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: {
        ConnectorDefinitionVersionArn: 0,
        CoreDefinitionVersionArn: 0,
        DeviceDefinitionVersionArn: 0,
        FunctionDefinitionVersionArn: 0,
        LoggerDefinitionVersionArn: 0,
        ResourceDefinitionVersionArn: 0,
        SubscriptionDefinitionVersionArn: 0,
      },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/groups/{GroupId}/certificateauthorities",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      GroupId: 0,
    },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupCertificateAuthority",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/groups/{GroupId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      ConnectorDefinitionVersionArn: 0,
      CoreDefinitionVersionArn: 0,
      DeviceDefinitionVersionArn: 0,
      FunctionDefinitionVersionArn: 0,
      GroupId: 0,
      LoggerDefinitionVersionArn: 0,
      ResourceDefinitionVersionArn: 0,
      SubscriptionDefinitionVersionArn: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroupVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/loggers",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: { Loggers: D.list(i_Logger) },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggerDefinition",
})) as any;

export type CreateLoggerDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a logger definition that has already been defined.
 */
export const createLoggerDefinitionVersion: API.OperationMethod<
  CreateLoggerDefinitionVersionRequest,
  CreateLoggerDefinitionVersionResponse,
  CreateLoggerDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/loggers/{LoggerDefinitionId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      LoggerDefinitionId: 0,
      Loggers: D.list(i_Logger),
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggerDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/resources",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: { Resources: D.list(i_Resource) },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDefinition",
})) as any;

export type CreateResourceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a resource definition that has already been defined.
 */
export const createResourceDefinitionVersion: API.OperationMethod<
  CreateResourceDefinitionVersionRequest,
  CreateResourceDefinitionVersionResponse,
  CreateResourceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/resources/{ResourceDefinitionId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      ResourceDefinitionId: 0,
      Resources: D.list(i_Resource),
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/updates",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      S3UrlSignerRole: 0,
      SoftwareToUpdate: 0,
      UpdateAgentLogLevel: 0,
      UpdateTargets: 0,
      UpdateTargetsArchitecture: 0,
      UpdateTargetsOperatingSystem: 0,
    },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSoftwareUpdateJob",
})) as any;

export type CreateSubscriptionDefinitionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a subscription definition. You may provide the initial version of the subscription definition now or use ''CreateSubscriptionDefinitionVersion'' at a later time.
 */
export const createSubscriptionDefinition: API.OperationMethod<
  CreateSubscriptionDefinitionRequest,
  CreateSubscriptionDefinitionResponse,
  CreateSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/subscriptions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      InitialVersion: { Subscriptions: D.list(i_Subscription) },
      Name: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionDefinition",
})) as any;

export type CreateSubscriptionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Creates a version of a subscription definition which has already been defined.
 */
export const createSubscriptionDefinitionVersion: API.OperationMethod<
  CreateSubscriptionDefinitionVersionRequest,
  CreateSubscriptionDefinitionVersionResponse,
  CreateSubscriptionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      SubscriptionDefinitionId: 0,
      Subscriptions: D.list(i_Subscription),
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriptionDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/definition/connectors/{ConnectorDefinitionId}",
    input: { ConnectorDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectorDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/definition/cores/{CoreDefinitionId}",
    input: { CoreDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCoreDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/definition/devices/{DeviceDefinitionId}",
    input: { DeviceDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeviceDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/definition/functions/{FunctionDefinitionId}",
    input: { FunctionDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/groups/{GroupId}",
    input: { GroupId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/definition/loggers/{LoggerDefinitionId}",
    input: { LoggerDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggerDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/definition/resources/{ResourceDefinitionId}",
    input: { ResourceDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceDefinition",
})) as any;

export type DeleteSubscriptionDefinitionError =
  | BadRequestException
  | CommonErrors;
/**
 * Deletes a subscription definition.
 */
export const deleteSubscriptionDefinition: API.OperationMethod<
  DeleteSubscriptionDefinitionRequest,
  DeleteSubscriptionDefinitionResponse,
  DeleteSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
    input: { SubscriptionDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriptionDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/groups/{GroupId}/role",
    input: { GroupId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateRoleFromGroup",
})) as any;

export type DisassociateServiceRoleFromAccountError =
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the service role from your account. Without a service role, deployments will not work.
 */
export const disassociateServiceRoleFromAccount: API.OperationMethod<
  DisassociateServiceRoleFromAccountRequest,
  DisassociateServiceRoleFromAccountResponse,
  DisassociateServiceRoleFromAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /greengrass/servicerole",
    input: {},
  },
  errors: [InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceRoleFromAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/role",
    input: { GroupId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociatedRole",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/bulk/deployments/{BulkDeploymentId}/status",
    input: { BulkDeploymentId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBulkDeploymentStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/things/{ThingName}/connectivityInfo",
    input: { ThingName: 0 },
    output: { Message: D.m({ wire: "message" }) },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectivityInfo",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/connectors/{ConnectorDefinitionId}",
    input: { ConnectorDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDefinition",
})) as any;

export type GetConnectorDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a connector definition version, including the connectors that the version contains. Connectors are prebuilt modules that interact with local infrastructure, device protocols, AWS, and other cloud services.
 */
export const getConnectorDefinitionVersion: API.OperationMethod<
  GetConnectorDefinitionVersionRequest,
  GetConnectorDefinitionVersionResponse,
  GetConnectorDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/connectors/{ConnectorDefinitionId}/versions/{ConnectorDefinitionVersionId}",
    input: {
      ConnectorDefinitionId: 0,
      ConnectorDefinitionVersionId: 0,
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectorDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/cores/{CoreDefinitionId}",
    input: { CoreDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/cores/{CoreDefinitionId}/versions/{CoreDefinitionVersionId}",
    input: { CoreDefinitionId: 0, CoreDefinitionVersionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoreDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/deployments/{DeploymentId}/status",
    input: { DeploymentId: 0, GroupId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/devices/{DeviceDefinitionId}",
    input: { DeviceDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDefinition",
})) as any;

export type GetDeviceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a device definition version.
 */
export const getDeviceDefinitionVersion: API.OperationMethod<
  GetDeviceDefinitionVersionRequest,
  GetDeviceDefinitionVersionResponse,
  GetDeviceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/devices/{DeviceDefinitionId}/versions/{DeviceDefinitionVersionId}",
    input: {
      DeviceDefinitionId: 0,
      DeviceDefinitionVersionId: 0,
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/functions/{FunctionDefinitionId}",
    input: { FunctionDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionDefinition",
})) as any;

export type GetFunctionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a Lambda function definition version, including which Lambda functions are included in the version and their configurations.
 */
export const getFunctionDefinitionVersion: API.OperationMethod<
  GetFunctionDefinitionVersionRequest,
  GetFunctionDefinitionVersionResponse,
  GetFunctionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/functions/{FunctionDefinitionId}/versions/{FunctionDefinitionVersionId}",
    input: {
      FunctionDefinitionId: 0,
      FunctionDefinitionVersionId: 0,
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}",
    input: { GroupId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/certificateauthorities/{CertificateAuthorityId}",
    input: { CertificateAuthorityId: 0, GroupId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupCertificateAuthority",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/certificateauthorities/configuration/expiry",
    input: { GroupId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupCertificateConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/versions/{GroupVersionId}",
    input: { GroupId: 0, GroupVersionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/loggers/{LoggerDefinitionId}",
    input: { LoggerDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggerDefinition",
})) as any;

export type GetLoggerDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a logger definition version.
 */
export const getLoggerDefinitionVersion: API.OperationMethod<
  GetLoggerDefinitionVersionRequest,
  GetLoggerDefinitionVersionResponse,
  GetLoggerDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/loggers/{LoggerDefinitionId}/versions/{LoggerDefinitionVersionId}",
    input: {
      LoggerDefinitionId: 0,
      LoggerDefinitionVersionId: 0,
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggerDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/resources/{ResourceDefinitionId}",
    input: { ResourceDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDefinition",
})) as any;

export type GetResourceDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a resource definition version, including which resources are included in the version.
 */
export const getResourceDefinitionVersion: API.OperationMethod<
  GetResourceDefinitionVersionRequest,
  GetResourceDefinitionVersionResponse,
  GetResourceDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/resources/{ResourceDefinitionId}/versions/{ResourceDefinitionVersionId}",
    input: { ResourceDefinitionId: 0, ResourceDefinitionVersionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDefinitionVersion",
})) as any;

export type GetServiceRoleForAccountError =
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the service role that is attached to your account.
 */
export const getServiceRoleForAccount: API.OperationMethod<
  GetServiceRoleForAccountRequest,
  GetServiceRoleForAccountResponse,
  GetServiceRoleForAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /greengrass/servicerole", input: {} },
  errors: [InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceRoleForAccount",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
    input: { SubscriptionDefinitionId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionDefinition",
})) as any;

export type GetSubscriptionDefinitionVersionError =
  | BadRequestException
  | CommonErrors;
/**
 * Retrieves information about a subscription definition version.
 */
export const getSubscriptionDefinitionVersion: API.OperationMethod<
  GetSubscriptionDefinitionVersionRequest,
  GetSubscriptionDefinitionVersionResponse,
  GetSubscriptionDefinitionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions/{SubscriptionDefinitionVersionId}",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      SubscriptionDefinitionId: 0,
      SubscriptionDefinitionVersionId: 0,
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriptionDefinitionVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/things/{ThingName}/runtimeconfig",
    input: { ThingName: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThingRuntimeConfiguration",
})) as any;

export type ListBulkDeploymentDetailedReportsError =
  | BadRequestException
  | CommonErrors;
/**
 * Gets a paginated list of the deployments that have been started in a bulk deployment operation, and their current deployment status.
 */
export const listBulkDeploymentDetailedReports: API.OperationMethod<
  ListBulkDeploymentDetailedReportsRequest,
  ListBulkDeploymentDetailedReportsResponse,
  ListBulkDeploymentDetailedReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/bulk/deployments/{BulkDeploymentId}/detailed-reports",
    input: {
      BulkDeploymentId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkDeploymentDetailedReports",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/bulk/deployments",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkDeployments",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/connectors",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Definitions: D.list(o_DefinitionInformation) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDefinitions",
})) as any;

export type ListConnectorDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a connector definition, which are containers for connectors. Connectors run on the Greengrass core and contain built-in integration with local infrastructure, device protocols, AWS, and other cloud services.
 */
export const listConnectorDefinitionVersions: API.OperationMethod<
  ListConnectorDefinitionVersionsRequest,
  ListConnectorDefinitionVersionsResponse,
  ListConnectorDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/connectors/{ConnectorDefinitionId}/versions",
    input: {
      ConnectorDefinitionId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectorDefinitionVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/cores",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Definitions: D.list(o_DefinitionInformation) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDefinitions",
})) as any;

export type ListCoreDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a core definition.
 */
export const listCoreDefinitionVersions: API.OperationMethod<
  ListCoreDefinitionVersionsRequest,
  ListCoreDefinitionVersionsResponse,
  ListCoreDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/cores/{CoreDefinitionId}/versions",
    input: {
      CoreDefinitionId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoreDefinitionVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/deployments",
    input: {
      GroupId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/devices",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Definitions: D.list(o_DefinitionInformation) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDefinitions",
})) as any;

export type ListDeviceDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a device definition.
 */
export const listDeviceDefinitionVersions: API.OperationMethod<
  ListDeviceDefinitionVersionsRequest,
  ListDeviceDefinitionVersionsResponse,
  ListDeviceDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/devices/{DeviceDefinitionId}/versions",
    input: {
      DeviceDefinitionId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceDefinitionVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/functions",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Definitions: D.list(o_DefinitionInformation) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionDefinitions",
})) as any;

export type ListFunctionDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a Lambda function definition.
 */
export const listFunctionDefinitionVersions: API.OperationMethod<
  ListFunctionDefinitionVersionsRequest,
  ListFunctionDefinitionVersionsResponse,
  ListFunctionDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/functions/{FunctionDefinitionId}/versions",
    input: {
      FunctionDefinitionId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionDefinitionVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/certificateauthorities",
    input: { GroupId: 0 },
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupCertificateAuthorities",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/groups/{GroupId}/versions",
    input: {
      GroupId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/loggers",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Definitions: D.list(o_DefinitionInformation) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggerDefinitions",
})) as any;

export type ListLoggerDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a logger definition.
 */
export const listLoggerDefinitionVersions: API.OperationMethod<
  ListLoggerDefinitionVersionsRequest,
  ListLoggerDefinitionVersionsResponse,
  ListLoggerDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/loggers/{LoggerDefinitionId}/versions",
    input: {
      LoggerDefinitionId: 0,
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggerDefinitionVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/resources",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Definitions: D.list(o_DefinitionInformation) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDefinitions",
})) as any;

export type ListResourceDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a resource definition.
 */
export const listResourceDefinitionVersions: API.OperationMethod<
  ListResourceDefinitionVersionsRequest,
  ListResourceDefinitionVersionsResponse,
  ListResourceDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/resources/{ResourceDefinitionId}/versions",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      ResourceDefinitionId: 0,
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDefinitionVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/subscriptions",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
    },
    output: { Definitions: D.list(o_DefinitionInformation) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionDefinitions",
})) as any;

export type ListSubscriptionDefinitionVersionsError =
  | BadRequestException
  | CommonErrors;
/**
 * Lists the versions of a subscription definition.
 */
export const listSubscriptionDefinitionVersions: API.OperationMethod<
  ListSubscriptionDefinitionVersionsRequest,
  ListSubscriptionDefinitionVersionsResponse,
  ListSubscriptionDefinitionVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /greengrass/definition/subscriptions/{SubscriptionDefinitionId}/versions",
    input: {
      MaxResults: D.m({ query: "MaxResults" }),
      NextToken: D.m({ query: "NextToken" }),
      SubscriptionDefinitionId: 0,
    },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscriptionDefinitionVersions",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/groups/{GroupId}/deployments/$reset",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      Force: 0,
      GroupId: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDeployments",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /greengrass/bulk/deployments",
    input: {
      AmznClientToken: D.m({ header: "X-Amzn-Client-Token" }),
      ExecutionRoleArn: 0,
      InputFileUri: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBulkDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/bulk/deployments/{BulkDeploymentId}/$stop",
    input: { BulkDeploymentId: 0 },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBulkDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/things/{ThingName}/connectivityInfo",
    input: {
      ConnectivityInfo: D.list({
        HostAddress: 0,
        Id: 0,
        Metadata: 0,
        PortNumber: 0,
      }),
      ThingName: 0,
    },
    output: { Message: D.m({ wire: "message" }) },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectivityInfo",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/definition/connectors/{ConnectorDefinitionId}",
    input: { ConnectorDefinitionId: 0, Name: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectorDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/definition/cores/{CoreDefinitionId}",
    input: { CoreDefinitionId: 0, Name: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCoreDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/definition/devices/{DeviceDefinitionId}",
    input: { DeviceDefinitionId: 0, Name: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/definition/functions/{FunctionDefinitionId}",
    input: { FunctionDefinitionId: 0, Name: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/groups/{GroupId}",
    input: { GroupId: 0, Name: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/groups/{GroupId}/certificateauthorities/configuration/expiry",
    input: { CertificateExpiryInMilliseconds: 0, GroupId: 0 },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupCertificateConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/definition/loggers/{LoggerDefinitionId}",
    input: { LoggerDefinitionId: 0, Name: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggerDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/definition/resources/{ResourceDefinitionId}",
    input: { Name: 0, ResourceDefinitionId: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceDefinition",
})) as any;

export type UpdateSubscriptionDefinitionError =
  | BadRequestException
  | CommonErrors;
/**
 * Updates a subscription definition.
 */
export const updateSubscriptionDefinition: API.OperationMethod<
  UpdateSubscriptionDefinitionRequest,
  UpdateSubscriptionDefinitionResponse,
  UpdateSubscriptionDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /greengrass/definition/subscriptions/{SubscriptionDefinitionId}",
    input: { Name: 0, SubscriptionDefinitionId: 0 },
    body: true,
  },
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriptionDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /greengrass/things/{ThingName}/runtimeconfig",
    input: { TelemetryConfiguration: { Telemetry: 0 }, ThingName: 0 },
    body: true,
  },
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingRuntimeConfiguration",
})) as any;

const i_Connector: D.LazyStruct = () => ({
  ConnectorArn: 0,
  Id: 0,
  Parameters: 0,
});
const i_Core: D.LazyStruct = () => ({
  CertificateArn: 0,
  Id: 0,
  SyncShadow: 0,
  ThingArn: 0,
});
const i_Device: D.LazyStruct = () => ({
  CertificateArn: 0,
  Id: 0,
  SyncShadow: 0,
  ThingArn: 0,
});
const i_Function: D.LazyStruct = () => ({
  FunctionArn: 0,
  FunctionConfiguration: {
    EncodingType: 0,
    Environment: {
      AccessSysfs: 0,
      Execution: { IsolationMode: 0, RunAs: i_FunctionRunAsConfig },
      ResourceAccessPolicies: D.list({ Permission: 0, ResourceId: 0 }),
      Variables: 0,
    },
    ExecArgs: 0,
    Executable: 0,
    MemorySize: 0,
    Pinned: 0,
    Timeout: 0,
    FunctionRuntimeOverride: 0,
  },
  Id: 0,
});
const i_FunctionDefaultConfig: D.LazyStruct = () => ({
  Execution: { IsolationMode: 0, RunAs: i_FunctionRunAsConfig },
});
const i_Logger: D.LazyStruct = () => ({
  Component: 0,
  Id: 0,
  Level: 0,
  Space: 0,
  Type: 0,
});
const i_Resource: D.LazyStruct = () => ({
  Id: 0,
  Name: 0,
  ResourceDataContainer: {
    LocalDeviceResourceData: {
      GroupOwnerSetting: i_GroupOwnerSetting,
      SourcePath: 0,
    },
    LocalVolumeResourceData: {
      DestinationPath: 0,
      GroupOwnerSetting: i_GroupOwnerSetting,
      SourcePath: 0,
    },
    S3MachineLearningModelResourceData: {
      DestinationPath: 0,
      OwnerSetting: i_ResourceDownloadOwnerSetting,
      S3Uri: 0,
    },
    SageMakerMachineLearningModelResourceData: {
      DestinationPath: 0,
      OwnerSetting: i_ResourceDownloadOwnerSetting,
      SageMakerJobArn: 0,
    },
    SecretsManagerSecretResourceData: {
      ARN: 0,
      AdditionalStagingLabelsToDownload: 0,
    },
  },
});
const i_Subscription: D.LazyStruct = () => ({
  Id: 0,
  Source: 0,
  Subject: 0,
  Target: 0,
});
const o_DefinitionInformation: D.LazyStruct = () => ({
  Tags: D.m({ wire: "tags" }),
});
const i_FunctionRunAsConfig: D.LazyStruct = () => ({ Gid: 0, Uid: 0 });
const i_GroupOwnerSetting: D.LazyStruct = () => ({
  AutoAddGroupOwner: 0,
  GroupOwner: 0,
});
const i_ResourceDownloadOwnerSetting: D.LazyStruct = () => ({
  GroupOwner: 0,
  GroupPermission: 0,
});
