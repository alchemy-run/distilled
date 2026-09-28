import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "finspace",
  target: "AWSHabaneroManagementService",
  version: "2021-03-12",
  sigv4: "finspace",
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
                `https://finspace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://finspace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://finspace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://finspace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string; readonly reason?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type EnvironmentName = string;
export type Description = string;
export type KmsKeyId = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type FederationMode = "FEDERATED" | "LOCAL" | (string & {});
export type SamlMetadataDocument = string;
export type Url = string;
export type Urn = string;
export type FederationProviderName = string;
export type FederationAttributeKey = string;
export type FederationAttributeValue = string;
export type AttributeMap = { [key: string]: string | undefined };
export interface FederationParameters {
  samlMetadataDocument?: string;
  samlMetadataURL?: string;
  applicationCallBackURL?: string;
  federationURN?: string;
  federationProviderName?: string;
  attributeMap?: { [key: string]: string | undefined };
}
export type EmailId = string | redacted.Redacted<string>;
export type NameString = string;
export interface SuperuserParameters {
  emailAddress: string | redacted.Redacted<string>;
  firstName: string;
  lastName: string;
}
export type DataBundleArn = string;
export type DataBundleArns = string[];
export interface CreateEnvironmentRequest {
  name: string;
  description?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  federationMode?: FederationMode;
  federationParameters?: FederationParameters;
  superuserParameters?: SuperuserParameters;
  dataBundles?: string[];
}
export type IdType = string;
export type EnvironmentArn = string;
export interface CreateEnvironmentResponse {
  environmentId?: string;
  environmentArn?: string;
  environmentUrl?: string;
}
export type EnvironmentId = string;
export type DatabaseName = string;
export type ChangeType = "PUT" | "DELETE" | (string & {});
export type S3Path = string;
export type DbPath = string;
export interface ChangeRequest {
  changeType: ChangeType;
  s3Path?: string;
  dbPath: string;
}
export type ChangeRequests = ChangeRequest[];
export type ClientTokenString = string;
export interface CreateKxChangesetRequest {
  environmentId: string;
  databaseName: string;
  changeRequests: ChangeRequest[];
  clientToken: string;
}
export type ChangesetId = string;
export type ChangesetStatus =
  | "PENDING"
  | "PROCESSING"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export type ErrorMessage = string;
export type ErrorDetails =
  | "The inputs to this request are invalid."
  | "Service limits have been exceeded."
  | "Missing required permission to perform this request."
  | "One or more inputs to this request were not found."
  | "The system temporarily lacks sufficient resources to process the request."
  | "An internal error has occurred."
  | "Cancelled"
  | "A user recoverable error has occurred"
  | (string & {});
export interface ErrorInfo {
  errorMessage?: string;
  errorType?: ErrorDetails;
}
export interface CreateKxChangesetResponse {
  changesetId?: string;
  databaseName?: string;
  environmentId?: string;
  changeRequests?: ChangeRequest[];
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: ChangesetStatus;
  errorInfo?: ErrorInfo;
}
export type ClientToken = string;
export type KxEnvironmentId = string;
export type KxClusterName = string;
export type KxClusterType =
  | "HDB"
  | "RDB"
  | "GATEWAY"
  | "GP"
  | "TICKERPLANT"
  | (string & {});
export type VolumeName = string;
export type TickerplantLogVolumes = string[];
export interface TickerplantLogConfiguration {
  tickerplantLogVolumes?: string[];
}
export type KxCacheStorageType = string;
export type DbPaths = string[];
export type KxDataviewName = string;
export interface KxDatabaseCacheConfiguration {
  cacheType: string;
  dbPaths: string[];
  dataviewName?: string;
}
export type KxDatabaseCacheConfigurations = KxDatabaseCacheConfiguration[];
export type VersionId = string;
export type SegmentConfigurationDbPathList = string[];
export type KxVolumeName = string;
export interface KxDataviewSegmentConfiguration {
  dbPaths: string[];
  volumeName: string;
  onDemand?: boolean;
}
export type KxDataviewSegmentConfigurationList =
  KxDataviewSegmentConfiguration[];
export interface KxDataviewConfiguration {
  dataviewName?: string;
  dataviewVersionId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
}
export interface KxDatabaseConfiguration {
  databaseName: string;
  cacheConfigurations?: KxDatabaseCacheConfiguration[];
  changesetId?: string;
  dataviewName?: string;
  dataviewConfiguration?: KxDataviewConfiguration;
}
export type KxDatabaseConfigurations = KxDatabaseConfiguration[];
export type KxCacheStorageSize = number;
export interface KxCacheStorageConfiguration {
  type: string;
  size: number;
}
export type KxCacheStorageConfigurations = KxCacheStorageConfiguration[];
export type NodeCount = number;
export type AutoScalingMetric = "CPU_UTILIZATION_PERCENTAGE" | (string & {});
export type AutoScalingMetricTarget = number;
export type CooldownTime = number;
export interface AutoScalingConfiguration {
  minNodeCount?: number;
  maxNodeCount?: number;
  autoScalingMetric?: AutoScalingMetric;
  metricTarget?: number;
  scaleInCooldownSeconds?: number;
  scaleOutCooldownSeconds?: number;
}
export type KxClusterDescription = string;
export type NodeType = string;
export interface CapacityConfiguration {
  nodeType?: string;
  nodeCount?: number;
}
export type ReleaseLabel = string;
export type VpcIdString = string;
export type SecurityGroupIdString = string;
export type SecurityGroupIdList = string[];
export type SubnetIdString = string;
export type SubnetIdList = string[];
export type IPAddressType = "IP_V4" | (string & {});
export interface VpcConfiguration {
  vpcId?: string;
  securityGroupIds?: string[];
  subnetIds?: string[];
  ipAddressType?: IPAddressType;
}
export type InitializationScriptFilePath = string;
export type KxCommandLineArgumentKey = string;
export type KxCommandLineArgumentValue = string;
export interface KxCommandLineArgument {
  key?: string;
  value?: string;
}
export type KxCommandLineArguments = KxCommandLineArgument[];
export type S3Bucket = string;
export type S3Key = string;
export type S3ObjectVersion = string;
export interface CodeConfiguration {
  s3Bucket?: string;
  s3Key?: string;
  s3ObjectVersion?: string;
}
export type ExecutionRoleArn = string;
export type KxSavedownStorageType = "SDS01" | (string & {});
export type KxSavedownStorageSize = number;
export interface KxSavedownStorageConfiguration {
  type?: KxSavedownStorageType;
  size?: number;
  volumeName?: string;
}
export type KxAzMode = "SINGLE" | "MULTI" | (string & {});
export type AvailabilityZoneId = string;
export type KxScalingGroupName = string;
export type MemoryMib = number;
export type ClusterNodeCount = number;
export type CpuCount = number;
export interface KxScalingGroupConfiguration {
  scalingGroupName: string;
  memoryLimit?: number;
  memoryReservation: number;
  nodeCount: number;
  cpu?: number;
}
export interface CreateKxClusterRequest {
  clientToken?: string;
  environmentId: string;
  clusterName: string;
  clusterType: KxClusterType;
  tickerplantLogConfiguration?: TickerplantLogConfiguration;
  databases?: KxDatabaseConfiguration[];
  cacheStorageConfigurations?: KxCacheStorageConfiguration[];
  autoScalingConfiguration?: AutoScalingConfiguration;
  clusterDescription?: string;
  capacityConfiguration?: CapacityConfiguration;
  releaseLabel: string;
  vpcConfiguration: VpcConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArgument[];
  code?: CodeConfiguration;
  executionRole?: string;
  savedownStorageConfiguration?: KxSavedownStorageConfiguration;
  azMode: KxAzMode;
  availabilityZoneId?: string;
  tags?: { [key: string]: string | undefined };
  scalingGroupConfiguration?: KxScalingGroupConfiguration;
}
export type KxClusterStatus =
  | "PENDING"
  | "CREATING"
  | "CREATE_FAILED"
  | "RUNNING"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "DELETE_FAILED"
  | (string & {});
export type KxClusterStatusReason = string;
export type VolumeType = "NAS_1" | (string & {});
export interface Volume {
  volumeName?: string;
  volumeType?: VolumeType;
}
export type Volumes = Volume[];
export interface CreateKxClusterResponse {
  environmentId?: string;
  status?: KxClusterStatus;
  statusReason?: string;
  clusterName?: string;
  clusterType?: KxClusterType;
  tickerplantLogConfiguration?: TickerplantLogConfiguration;
  volumes?: Volume[];
  databases?: KxDatabaseConfiguration[];
  cacheStorageConfigurations?: KxCacheStorageConfiguration[];
  autoScalingConfiguration?: AutoScalingConfiguration;
  clusterDescription?: string;
  capacityConfiguration?: CapacityConfiguration;
  releaseLabel?: string;
  vpcConfiguration?: VpcConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArgument[];
  code?: CodeConfiguration;
  executionRole?: string;
  lastModifiedTimestamp?: Date;
  savedownStorageConfiguration?: KxSavedownStorageConfiguration;
  azMode?: KxAzMode;
  availabilityZoneId?: string;
  createdTimestamp?: Date;
  scalingGroupConfiguration?: KxScalingGroupConfiguration;
}
export interface CreateKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export type DatabaseArn = string;
export interface CreateKxDatabaseResponse {
  databaseName?: string;
  databaseArn?: string;
  environmentId?: string;
  description?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export interface CreateKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
  azMode: KxAzMode;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
  autoUpdate?: boolean;
  readWrite?: boolean;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken: string;
}
export type KxDataviewStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "FAILED"
  | "DELETING"
  | (string & {});
export interface CreateKxDataviewResponse {
  dataviewName?: string;
  databaseName?: string;
  environmentId?: string;
  azMode?: KxAzMode;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
  description?: string;
  autoUpdate?: boolean;
  readWrite?: boolean;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: KxDataviewStatus;
}
export type KxEnvironmentName = string;
export type KmsKeyARN = string;
export interface CreateKxEnvironmentRequest {
  name: string;
  description?: string;
  kmsKeyId: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type EnvironmentStatus =
  | "CREATE_REQUESTED"
  | "CREATING"
  | "CREATED"
  | "DELETE_REQUESTED"
  | "DELETING"
  | "DELETED"
  | "FAILED_CREATION"
  | "RETRY_DELETION"
  | "FAILED_DELETION"
  | "UPDATE_NETWORK_REQUESTED"
  | "UPDATING_NETWORK"
  | "FAILED_UPDATING_NETWORK"
  | "SUSPENDED"
  | (string & {});
export interface CreateKxEnvironmentResponse {
  name?: string;
  status?: EnvironmentStatus;
  environmentId?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  creationTimestamp?: Date;
}
export type KxHostType = string;
export interface CreateKxScalingGroupRequest {
  clientToken: string;
  environmentId: string;
  scalingGroupName: string;
  hostType: string;
  availabilityZoneId: string;
  tags?: { [key: string]: string | undefined };
}
export type KxScalingGroupStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateKxScalingGroupResponse {
  environmentId?: string;
  scalingGroupName?: string;
  hostType?: string;
  availabilityZoneId?: string;
  status?: KxScalingGroupStatus;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export type KxUserNameString = string;
export type RoleArn = string;
export interface CreateKxUserRequest {
  environmentId: string;
  userName: string;
  iamRole: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type KxUserArn = string;
export interface CreateKxUserResponse {
  userName?: string;
  userArn?: string;
  environmentId?: string;
  iamRole?: string;
}
export type KxVolumeType = "NAS_1" | (string & {});
export type KxNAS1Type = "SSD_1000" | "SSD_250" | "HDD_12" | (string & {});
export type KxNAS1Size = number;
export interface KxNAS1Configuration {
  type?: KxNAS1Type;
  size?: number;
}
export type AvailabilityZoneIds = string[];
export interface CreateKxVolumeRequest {
  clientToken?: string;
  environmentId: string;
  volumeType: KxVolumeType;
  volumeName: string;
  description?: string;
  nas1Configuration?: KxNAS1Configuration;
  azMode: KxAzMode;
  availabilityZoneIds: string[];
  tags?: { [key: string]: string | undefined };
}
export type KxVolumeArn = string;
export type KxVolumeStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "UPDATING"
  | "UPDATED"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETED"
  | "DELETE_FAILED"
  | (string & {});
export type KxVolumeStatusReason = string;
export interface CreateKxVolumeResponse {
  environmentId?: string;
  volumeName?: string;
  volumeType?: KxVolumeType;
  volumeArn?: string;
  nas1Configuration?: KxNAS1Configuration;
  status?: KxVolumeStatus;
  statusReason?: string;
  azMode?: KxAzMode;
  description?: string;
  availabilityZoneIds?: string[];
  createdTimestamp?: Date;
}
export interface DeleteEnvironmentRequest {
  environmentId: string;
}
export interface DeleteEnvironmentResponse {}
export interface DeleteKxClusterRequest {
  environmentId: string;
  clusterName: string;
  clientToken?: string;
}
export interface DeleteKxClusterResponse {}
export type KxClusterNodeIdString = string;
export interface DeleteKxClusterNodeRequest {
  environmentId: string;
  clusterName: string;
  nodeId: string;
}
export interface DeleteKxClusterNodeResponse {}
export interface DeleteKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
  clientToken: string;
}
export interface DeleteKxDatabaseResponse {}
export interface DeleteKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
  clientToken: string;
}
export interface DeleteKxDataviewResponse {}
export interface DeleteKxEnvironmentRequest {
  environmentId: string;
  clientToken?: string;
}
export interface DeleteKxEnvironmentResponse {}
export interface DeleteKxScalingGroupRequest {
  environmentId: string;
  scalingGroupName: string;
  clientToken?: string;
}
export interface DeleteKxScalingGroupResponse {}
export interface DeleteKxUserRequest {
  userName: string;
  environmentId: string;
  clientToken?: string;
}
export interface DeleteKxUserResponse {}
export interface DeleteKxVolumeRequest {
  environmentId: string;
  volumeName: string;
  clientToken?: string;
}
export interface DeleteKxVolumeResponse {}
export interface GetEnvironmentRequest {
  environmentId: string;
}
export type SmsDomainUrl = string;
export interface Environment {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: EnvironmentStatus;
  environmentUrl?: string;
  description?: string;
  environmentArn?: string;
  sageMakerStudioDomainUrl?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  federationMode?: FederationMode;
  federationParameters?: FederationParameters;
}
export interface GetEnvironmentResponse {
  environment?: Environment;
}
export interface GetKxChangesetRequest {
  environmentId: string;
  databaseName: string;
  changesetId: string;
}
export interface GetKxChangesetResponse {
  changesetId?: string;
  databaseName?: string;
  environmentId?: string;
  changeRequests?: ChangeRequest[];
  createdTimestamp?: Date;
  activeFromTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: ChangesetStatus;
  errorInfo?: ErrorInfo;
}
export interface GetKxClusterRequest {
  environmentId: string;
  clusterName: string;
}
export interface GetKxClusterResponse {
  status?: KxClusterStatus;
  statusReason?: string;
  clusterName?: string;
  clusterType?: KxClusterType;
  tickerplantLogConfiguration?: TickerplantLogConfiguration;
  volumes?: Volume[];
  databases?: KxDatabaseConfiguration[];
  cacheStorageConfigurations?: KxCacheStorageConfiguration[];
  autoScalingConfiguration?: AutoScalingConfiguration;
  clusterDescription?: string;
  capacityConfiguration?: CapacityConfiguration;
  releaseLabel?: string;
  vpcConfiguration?: VpcConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArgument[];
  code?: CodeConfiguration;
  executionRole?: string;
  lastModifiedTimestamp?: Date;
  savedownStorageConfiguration?: KxSavedownStorageConfiguration;
  azMode?: KxAzMode;
  availabilityZoneId?: string;
  createdTimestamp?: Date;
  scalingGroupConfiguration?: KxScalingGroupConfiguration;
}
export interface GetKxConnectionStringRequest {
  userArn: string;
  environmentId: string;
  clusterName: string;
}
export type SignedKxConnectionString = string | redacted.Redacted<string>;
export interface GetKxConnectionStringResponse {
  signedConnectionString?: string | redacted.Redacted<string>;
}
export interface GetKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
}
export type NumBytes = number;
export type NumChangesets = number;
export type NumFiles = number;
export interface GetKxDatabaseResponse {
  databaseName?: string;
  databaseArn?: string;
  environmentId?: string;
  description?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  lastCompletedChangesetId?: string;
  numBytes?: number;
  numChangesets?: number;
  numFiles?: number;
}
export interface GetKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
}
export type AttachedClusterList = string[];
export interface KxDataviewActiveVersion {
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
  attachedClusters?: string[];
  createdTimestamp?: Date;
  versionId?: string;
}
export type KxDataviewActiveVersionList = KxDataviewActiveVersion[];
export type KxDataviewStatusReason = string;
export interface GetKxDataviewResponse {
  databaseName?: string;
  dataviewName?: string;
  azMode?: KxAzMode;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
  activeVersions?: KxDataviewActiveVersion[];
  description?: string;
  autoUpdate?: boolean;
  readWrite?: boolean;
  environmentId?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: KxDataviewStatus;
  statusReason?: string;
}
export interface GetKxEnvironmentRequest {
  environmentId: string;
}
export type TgwStatus =
  | "NONE"
  | "UPDATE_REQUESTED"
  | "UPDATING"
  | "FAILED_UPDATE"
  | "SUCCESSFULLY_UPDATED"
  | (string & {});
export type DnsStatus =
  | "NONE"
  | "UPDATE_REQUESTED"
  | "UPDATING"
  | "FAILED_UPDATE"
  | "SUCCESSFULLY_UPDATED"
  | (string & {});
export type EnvironmentErrorMessage = string;
export type TransitGatewayID = string;
export type ValidCIDRSpace = string;
export type RuleNumber = number;
export type Protocol = string;
export type RuleAction = "allow" | "deny" | (string & {});
export type Port = number;
export interface PortRange {
  from: number;
  to: number;
}
export type IcmpTypeOrCode = number;
export interface IcmpTypeCode {
  type: number;
  code: number;
}
export type ValidCIDRBlock = string;
export interface NetworkACLEntry {
  ruleNumber: number;
  protocol: string;
  ruleAction: RuleAction;
  portRange?: PortRange;
  icmpTypeCode?: IcmpTypeCode;
  cidrBlock: string;
}
export type NetworkACLConfiguration = NetworkACLEntry[];
export interface TransitGatewayConfiguration {
  transitGatewayID: string;
  routableCIDRSpace: string;
  attachmentNetworkAclConfiguration?: NetworkACLEntry[];
}
export type ValidHostname = string;
export type ValidIPAddress = string;
export interface CustomDNSServer {
  customDNSServerName: string;
  customDNSServerIP: string;
}
export type CustomDNSConfiguration = CustomDNSServer[];
export type StringValueLength1to255 = string;
export interface GetKxEnvironmentResponse {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: EnvironmentStatus;
  tgwStatus?: TgwStatus;
  dnsStatus?: DnsStatus;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSServer[];
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: string[];
  certificateAuthorityArn?: string;
}
export interface GetKxScalingGroupRequest {
  environmentId: string;
  scalingGroupName: string;
}
export type Arn = string;
export type KxClusterNameList = string[];
export interface GetKxScalingGroupResponse {
  scalingGroupName?: string;
  scalingGroupArn?: string;
  hostType?: string;
  clusters?: string[];
  availabilityZoneId?: string;
  status?: KxScalingGroupStatus;
  statusReason?: string;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export interface GetKxUserRequest {
  userName: string;
  environmentId: string;
}
export interface GetKxUserResponse {
  userName?: string;
  userArn?: string;
  environmentId?: string;
  iamRole?: string;
}
export interface GetKxVolumeRequest {
  environmentId: string;
  volumeName: string;
}
export interface KxAttachedCluster {
  clusterName?: string;
  clusterType?: KxClusterType;
  clusterStatus?: KxClusterStatus;
}
export type KxAttachedClusters = KxAttachedCluster[];
export interface GetKxVolumeResponse {
  environmentId?: string;
  volumeName?: string;
  volumeType?: KxVolumeType;
  volumeArn?: string;
  nas1Configuration?: KxNAS1Configuration;
  status?: KxVolumeStatus;
  statusReason?: string;
  createdTimestamp?: Date;
  description?: string;
  azMode?: KxAzMode;
  availabilityZoneIds?: string[];
  lastModifiedTimestamp?: Date;
  attachedClusters?: KxAttachedCluster[];
}
export type PaginationToken = string;
export type ResultLimit = number;
export interface ListEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type EnvironmentList = Environment[];
export interface ListEnvironmentsResponse {
  environments?: Environment[];
  nextToken?: string;
}
export type MaxResults = number;
export interface ListKxChangesetsRequest {
  environmentId: string;
  databaseName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface KxChangesetListEntry {
  changesetId?: string;
  createdTimestamp?: Date;
  activeFromTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  status?: ChangesetStatus;
}
export type KxChangesets = KxChangesetListEntry[];
export interface ListKxChangesetsResponse {
  kxChangesets?: KxChangesetListEntry[];
  nextToken?: string;
}
export interface ListKxClusterNodesRequest {
  environmentId: string;
  clusterName: string;
  nextToken?: string;
  maxResults?: number;
}
export type KxNodeStatus = "RUNNING" | "PROVISIONING" | (string & {});
export interface KxNode {
  nodeId?: string;
  availabilityZoneId?: string;
  launchTime?: Date;
  status?: KxNodeStatus;
}
export type KxNodeSummaries = KxNode[];
export interface ListKxClusterNodesResponse {
  nodes?: KxNode[];
  nextToken?: string;
}
export interface ListKxClustersRequest {
  environmentId: string;
  clusterType?: KxClusterType;
  maxResults?: number;
  nextToken?: string;
}
export interface KxCluster {
  status?: KxClusterStatus;
  statusReason?: string;
  clusterName?: string;
  clusterType?: KxClusterType;
  clusterDescription?: string;
  releaseLabel?: string;
  volumes?: Volume[];
  initializationScript?: string;
  executionRole?: string;
  azMode?: KxAzMode;
  availabilityZoneId?: string;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export type KxClusters = KxCluster[];
export interface ListKxClustersResponse {
  kxClusterSummaries?: KxCluster[];
  nextToken?: string;
}
export interface ListKxDatabasesRequest {
  environmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface KxDatabaseListEntry {
  databaseName?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export type KxDatabases = KxDatabaseListEntry[];
export interface ListKxDatabasesResponse {
  kxDatabases?: KxDatabaseListEntry[];
  nextToken?: string;
}
export interface ListKxDataviewsRequest {
  environmentId: string;
  databaseName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface KxDataviewListEntry {
  environmentId?: string;
  databaseName?: string;
  dataviewName?: string;
  azMode?: KxAzMode;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
  activeVersions?: KxDataviewActiveVersion[];
  status?: KxDataviewStatus;
  description?: string;
  autoUpdate?: boolean;
  readWrite?: boolean;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
  statusReason?: string;
}
export type KxDataviews = KxDataviewListEntry[];
export interface ListKxDataviewsResponse {
  kxDataviews?: KxDataviewListEntry[];
  nextToken?: string;
}
export type BoxedInteger = number;
export interface ListKxEnvironmentsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface KxEnvironment {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: EnvironmentStatus;
  tgwStatus?: TgwStatus;
  dnsStatus?: DnsStatus;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSServer[];
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: string[];
  certificateAuthorityArn?: string;
}
export type KxEnvironmentList = KxEnvironment[];
export interface ListKxEnvironmentsResponse {
  environments?: KxEnvironment[];
  nextToken?: string;
}
export interface ListKxScalingGroupsRequest {
  environmentId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface KxScalingGroup {
  scalingGroupName?: string;
  hostType?: string;
  clusters?: string[];
  availabilityZoneId?: string;
  status?: KxScalingGroupStatus;
  statusReason?: string;
  lastModifiedTimestamp?: Date;
  createdTimestamp?: Date;
}
export type KxScalingGroupList = KxScalingGroup[];
export interface ListKxScalingGroupsResponse {
  scalingGroups?: KxScalingGroup[];
  nextToken?: string;
}
export interface ListKxUsersRequest {
  environmentId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface KxUser {
  userArn?: string;
  userName?: string;
  iamRole?: string;
  createTimestamp?: Date;
  updateTimestamp?: Date;
}
export type KxUserList = KxUser[];
export interface ListKxUsersResponse {
  users?: KxUser[];
  nextToken?: string;
}
export interface ListKxVolumesRequest {
  environmentId: string;
  maxResults?: number;
  nextToken?: string;
  volumeType?: KxVolumeType;
}
export interface KxVolume {
  volumeName?: string;
  volumeType?: KxVolumeType;
  status?: KxVolumeStatus;
  description?: string;
  statusReason?: string;
  azMode?: KxAzMode;
  availabilityZoneIds?: string[];
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export type KxVolumes = KxVolume[];
export interface ListKxVolumesResponse {
  kxVolumeSummaries?: KxVolume[];
  nextToken?: string;
}
export type FinSpaceTaggableArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateEnvironmentRequest {
  environmentId: string;
  name?: string;
  description?: string;
  federationMode?: FederationMode;
  federationParameters?: FederationParameters;
}
export interface UpdateEnvironmentResponse {
  environment?: Environment;
}
export type KxClusterCodeDeploymentStrategy =
  | "NO_RESTART"
  | "ROLLING"
  | "FORCE"
  | (string & {});
export interface KxClusterCodeDeploymentConfiguration {
  deploymentStrategy: KxClusterCodeDeploymentStrategy;
}
export interface UpdateKxClusterCodeConfigurationRequest {
  environmentId: string;
  clusterName: string;
  clientToken?: string;
  code: CodeConfiguration;
  initializationScript?: string;
  commandLineArguments?: KxCommandLineArgument[];
  deploymentConfiguration?: KxClusterCodeDeploymentConfiguration;
}
export interface UpdateKxClusterCodeConfigurationResponse {}
export type KxDeploymentStrategy = "NO_RESTART" | "ROLLING" | (string & {});
export interface KxDeploymentConfiguration {
  deploymentStrategy: KxDeploymentStrategy;
}
export interface UpdateKxClusterDatabasesRequest {
  environmentId: string;
  clusterName: string;
  clientToken?: string;
  databases: KxDatabaseConfiguration[];
  deploymentConfiguration?: KxDeploymentConfiguration;
}
export interface UpdateKxClusterDatabasesResponse {}
export interface UpdateKxDatabaseRequest {
  environmentId: string;
  databaseName: string;
  description?: string;
  clientToken: string;
}
export interface UpdateKxDatabaseResponse {
  databaseName?: string;
  environmentId?: string;
  description?: string;
  lastModifiedTimestamp?: Date;
}
export interface UpdateKxDataviewRequest {
  environmentId: string;
  databaseName: string;
  dataviewName: string;
  description?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
  clientToken: string;
}
export interface UpdateKxDataviewResponse {
  environmentId?: string;
  databaseName?: string;
  dataviewName?: string;
  azMode?: KxAzMode;
  availabilityZoneId?: string;
  changesetId?: string;
  segmentConfigurations?: KxDataviewSegmentConfiguration[];
  activeVersions?: KxDataviewActiveVersion[];
  status?: KxDataviewStatus;
  autoUpdate?: boolean;
  readWrite?: boolean;
  description?: string;
  createdTimestamp?: Date;
  lastModifiedTimestamp?: Date;
}
export interface UpdateKxEnvironmentRequest {
  environmentId: string;
  name?: string;
  description?: string;
  clientToken?: string;
}
export interface UpdateKxEnvironmentResponse {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: EnvironmentStatus;
  tgwStatus?: TgwStatus;
  dnsStatus?: DnsStatus;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSServer[];
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: string[];
}
export interface UpdateKxEnvironmentNetworkRequest {
  environmentId: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSServer[];
  clientToken?: string;
}
export interface UpdateKxEnvironmentNetworkResponse {
  name?: string;
  environmentId?: string;
  awsAccountId?: string;
  status?: EnvironmentStatus;
  tgwStatus?: TgwStatus;
  dnsStatus?: DnsStatus;
  errorMessage?: string;
  description?: string;
  environmentArn?: string;
  kmsKeyId?: string;
  dedicatedServiceAccountId?: string;
  transitGatewayConfiguration?: TransitGatewayConfiguration;
  customDNSConfiguration?: CustomDNSServer[];
  creationTimestamp?: Date;
  updateTimestamp?: Date;
  availabilityZoneIds?: string[];
}
export interface UpdateKxUserRequest {
  environmentId: string;
  userName: string;
  iamRole: string;
  clientToken?: string;
}
export interface UpdateKxUserResponse {
  userName?: string;
  userArn?: string;
  environmentId?: string;
  iamRole?: string;
}
export interface UpdateKxVolumeRequest {
  environmentId: string;
  volumeName: string;
  description?: string;
  clientToken?: string;
  nas1Configuration?: KxNAS1Configuration;
}
export interface UpdateKxVolumeResponse {
  environmentId?: string;
  volumeName?: string;
  volumeType?: KxVolumeType;
  volumeArn?: string;
  nas1Configuration?: KxNAS1Configuration;
  status?: KxVolumeStatus;
  description?: string;
  statusReason?: string;
  createdTimestamp?: Date;
  azMode?: KxAzMode;
  availabilityZoneIds?: string[];
  lastModifiedTimestamp?: Date;
  attachedClusters?: KxAttachedCluster[];
}
export type ErrorMessage2 = string;
export type CreateEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new FinSpace environment.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /environment",
    input: {
      name: 0,
      description: 0,
      kmsKeyId: 0,
      tags: 0,
      federationMode: 0,
      federationParameters: i_FederationParameters,
      superuserParameters: { emailAddress: 0, firstName: 0, lastName: 0 },
      dataBundles: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
})) as any;

export type CreateKxChangesetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a changeset for a kdb database. A changeset allows you to add and delete existing files by using an ordered list of change requests.
 */
export const createKxChangeset: API.OperationMethod<
  CreateKxChangesetRequest,
  CreateKxChangesetResponse,
  CreateKxChangesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments/{environmentId}/databases/{databaseName}/changesets",
    input: {
      environmentId: 0,
      databaseName: 0,
      changeRequests: D.list({ changeType: 0, s3Path: 0, dbPath: 0 }),
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdTimestamp: D.ts, lastModifiedTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxChangeset",
})) as any;

export type CreateKxClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new kdb cluster.
 */
export const createKxCluster: API.OperationMethod<
  CreateKxClusterRequest,
  CreateKxClusterResponse,
  CreateKxClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments/{environmentId}/clusters",
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      clusterName: 0,
      clusterType: 0,
      tickerplantLogConfiguration: { tickerplantLogVolumes: 0 },
      databases: D.list(i_KxDatabaseConfiguration),
      cacheStorageConfigurations: D.list({ type: 0, size: 0 }),
      autoScalingConfiguration: {
        minNodeCount: 0,
        maxNodeCount: 0,
        autoScalingMetric: 0,
        metricTarget: 0,
        scaleInCooldownSeconds: 0,
        scaleOutCooldownSeconds: 0,
      },
      clusterDescription: 0,
      capacityConfiguration: { nodeType: 0, nodeCount: 0 },
      releaseLabel: 0,
      vpcConfiguration: {
        vpcId: 0,
        securityGroupIds: 0,
        subnetIds: 0,
        ipAddressType: 0,
      },
      initializationScript: 0,
      commandLineArguments: D.list(i_KxCommandLineArgument),
      code: i_CodeConfiguration,
      executionRole: 0,
      savedownStorageConfiguration: { type: 0, size: 0, volumeName: 0 },
      azMode: 0,
      availabilityZoneId: 0,
      tags: 0,
      scalingGroupConfiguration: {
        scalingGroupName: 0,
        memoryLimit: 0,
        memoryReservation: 0,
        nodeCount: 0,
        cpu: 0,
      },
    },
    output: { lastModifiedTimestamp: D.ts, createdTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxCluster",
})) as any;

export type CreateKxDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new kdb database in the environment.
 */
export const createKxDatabase: API.OperationMethod<
  CreateKxDatabaseRequest,
  CreateKxDatabaseResponse,
  CreateKxDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments/{environmentId}/databases",
    input: {
      environmentId: 0,
      databaseName: 0,
      description: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdTimestamp: D.ts, lastModifiedTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxDatabase",
})) as any;

export type CreateKxDataviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of kdb database with tiered storage capabilities and a pre-warmed cache, ready for mounting on kdb clusters. Dataviews are only available for clusters running on a scaling group. They are not supported on dedicated clusters.
 */
export const createKxDataview: API.OperationMethod<
  CreateKxDataviewRequest,
  CreateKxDataviewResponse,
  CreateKxDataviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments/{environmentId}/databases/{databaseName}/dataviews",
    input: {
      environmentId: 0,
      databaseName: 0,
      dataviewName: 0,
      azMode: 0,
      availabilityZoneId: 0,
      changesetId: 0,
      segmentConfigurations: D.list(i_KxDataviewSegmentConfiguration),
      autoUpdate: 0,
      readWrite: 0,
      description: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdTimestamp: D.ts, lastModifiedTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxDataview",
})) as any;

export type CreateKxEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a managed kdb environment for the account.
 */
export const createKxEnvironment: API.OperationMethod<
  CreateKxEnvironmentRequest,
  CreateKxEnvironmentResponse,
  CreateKxEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments",
    input: {
      name: 0,
      description: 0,
      kmsKeyId: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { creationTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxEnvironment",
})) as any;

export type CreateKxScalingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new scaling group.
 */
export const createKxScalingGroup: API.OperationMethod<
  CreateKxScalingGroupRequest,
  CreateKxScalingGroupResponse,
  CreateKxScalingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments/{environmentId}/scalingGroups",
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      scalingGroupName: 0,
      hostType: 0,
      availabilityZoneId: 0,
      tags: 0,
    },
    output: { lastModifiedTimestamp: D.ts, createdTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxScalingGroup",
})) as any;

export type CreateKxUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user in FinSpace kdb environment with an associated IAM role.
 */
export const createKxUser: API.OperationMethod<
  CreateKxUserRequest,
  CreateKxUserResponse,
  CreateKxUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments/{environmentId}/users",
    input: {
      environmentId: 0,
      userName: 0,
      iamRole: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxUser",
})) as any;

export type CreateKxVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new volume with a specific amount of throughput and storage capacity.
 */
export const createKxVolume: API.OperationMethod<
  CreateKxVolumeRequest,
  CreateKxVolumeResponse,
  CreateKxVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /kx/environments/{environmentId}/kxvolumes",
    input: {
      clientToken: D.m({ idempotency: true }),
      environmentId: 0,
      volumeType: 0,
      volumeName: 0,
      description: 0,
      nas1Configuration: i_KxNAS1Configuration,
      azMode: 0,
      availabilityZoneIds: 0,
      tags: 0,
    },
    output: { createdTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKxVolume",
})) as any;

export type DeleteEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an FinSpace environment.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /environment/{environmentId}",
    input: { environmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
})) as any;

export type DeleteKxClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a kdb cluster.
 */
export const deleteKxCluster: API.OperationMethod<
  DeleteKxClusterRequest,
  DeleteKxClusterResponse,
  DeleteKxClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}/clusters/{clusterName}",
    input: {
      environmentId: 0,
      clusterName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxCluster",
})) as any;

export type DeleteKxClusterNodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified nodes from a cluster.
 */
export const deleteKxClusterNode: API.OperationMethod<
  DeleteKxClusterNodeRequest,
  DeleteKxClusterNodeResponse,
  DeleteKxClusterNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}/clusters/{clusterName}/nodes/{nodeId}",
    input: { environmentId: 0, clusterName: 0, nodeId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxClusterNode",
})) as any;

export type DeleteKxDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified database and all of its associated data. This action is irreversible. You must copy any data out of the database before deleting it if the data is to be retained.
 */
export const deleteKxDatabase: API.OperationMethod<
  DeleteKxDatabaseRequest,
  DeleteKxDatabaseResponse,
  DeleteKxDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}/databases/{databaseName}",
    input: {
      environmentId: 0,
      databaseName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxDatabase",
})) as any;

export type DeleteKxDataviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified dataview. Before deleting a dataview, make sure that it is not in use by any cluster.
 */
export const deleteKxDataview: API.OperationMethod<
  DeleteKxDataviewRequest,
  DeleteKxDataviewResponse,
  DeleteKxDataviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
    input: {
      environmentId: 0,
      databaseName: 0,
      dataviewName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxDataview",
})) as any;

export type DeleteKxEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the kdb environment. This action is irreversible. Deleting a kdb environment will remove all the associated data and any services running in it.
 */
export const deleteKxEnvironment: API.OperationMethod<
  DeleteKxEnvironmentRequest,
  DeleteKxEnvironmentResponse,
  DeleteKxEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}",
    input: {
      environmentId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxEnvironment",
})) as any;

export type DeleteKxScalingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scaling group. This action is irreversible. You cannot delete a scaling group until all the clusters running on it have been deleted.
 */
export const deleteKxScalingGroup: API.OperationMethod<
  DeleteKxScalingGroupRequest,
  DeleteKxScalingGroupResponse,
  DeleteKxScalingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}/scalingGroups/{scalingGroupName}",
    input: {
      environmentId: 0,
      scalingGroupName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxScalingGroup",
})) as any;

export type DeleteKxUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user in the specified kdb environment.
 */
export const deleteKxUser: API.OperationMethod<
  DeleteKxUserRequest,
  DeleteKxUserResponse,
  DeleteKxUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}/users/{userName}",
    input: {
      userName: 0,
      environmentId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxUser",
})) as any;

export type DeleteKxVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a volume. You can only delete a volume if it's not attached to a cluster or a dataview. When a volume is deleted, any data on the volume is lost. This action is irreversible.
 */
export const deleteKxVolume: API.OperationMethod<
  DeleteKxVolumeRequest,
  DeleteKxVolumeResponse,
  DeleteKxVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /kx/environments/{environmentId}/kxvolumes/{volumeName}",
    input: {
      environmentId: 0,
      volumeName: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKxVolume",
})) as any;

export type GetEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the FinSpace environment object.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  GetEnvironmentResponse,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environment/{environmentId}",
    input: { environmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
})) as any;

export type GetKxChangesetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a kdb changeset.
 */
export const getKxChangeset: API.OperationMethod<
  GetKxChangesetRequest,
  GetKxChangesetResponse,
  GetKxChangesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/databases/{databaseName}/changesets/{changesetId}",
    input: { environmentId: 0, databaseName: 0, changesetId: 0 },
    output: {
      createdTimestamp: D.ts,
      activeFromTimestamp: D.ts,
      lastModifiedTimestamp: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxChangeset",
})) as any;

export type GetKxClusterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a kdb cluster.
 */
export const getKxCluster: API.OperationMethod<
  GetKxClusterRequest,
  GetKxClusterResponse,
  GetKxClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/clusters/{clusterName}",
    input: { environmentId: 0, clusterName: 0 },
    output: { lastModifiedTimestamp: D.ts, createdTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxCluster",
})) as any;

export type GetKxConnectionStringError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a connection string for a user to connect to a kdb cluster. You must call this API using the same role that you have defined while creating a user.
 */
export const getKxConnectionString: API.OperationMethod<
  GetKxConnectionStringRequest,
  GetKxConnectionStringResponse,
  GetKxConnectionStringError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/connectionString",
    input: {
      userArn: D.m({ query: "userArn" }),
      environmentId: 0,
      clusterName: D.m({ query: "clusterName" }),
    },
    output: { signedConnectionString: D.secret },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxConnectionString",
})) as any;

export type GetKxDatabaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns database information for the specified environment ID.
 */
export const getKxDatabase: API.OperationMethod<
  GetKxDatabaseRequest,
  GetKxDatabaseResponse,
  GetKxDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/databases/{databaseName}",
    input: { environmentId: 0, databaseName: 0 },
    output: { createdTimestamp: D.ts, lastModifiedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxDatabase",
})) as any;

export type GetKxDataviewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of the dataview.
 */
export const getKxDataview: API.OperationMethod<
  GetKxDataviewRequest,
  GetKxDataviewResponse,
  GetKxDataviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
    input: { environmentId: 0, databaseName: 0, dataviewName: 0 },
    output: {
      activeVersions: D.list(o_KxDataviewActiveVersion),
      createdTimestamp: D.ts,
      lastModifiedTimestamp: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxDataview",
})) as any;

export type GetKxEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all the information for the specified kdb environment.
 */
export const getKxEnvironment: API.OperationMethod<
  GetKxEnvironmentRequest,
  GetKxEnvironmentResponse,
  GetKxEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}",
    input: { environmentId: 0 },
    output: { creationTimestamp: D.ts, updateTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxEnvironment",
})) as any;

export type GetKxScalingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of a scaling group.
 */
export const getKxScalingGroup: API.OperationMethod<
  GetKxScalingGroupRequest,
  GetKxScalingGroupResponse,
  GetKxScalingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/scalingGroups/{scalingGroupName}",
    input: { environmentId: 0, scalingGroupName: 0 },
    output: { lastModifiedTimestamp: D.ts, createdTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxScalingGroup",
})) as any;

export type GetKxUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified kdb user.
 */
export const getKxUser: API.OperationMethod<
  GetKxUserRequest,
  GetKxUserResponse,
  GetKxUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/users/{userName}",
    input: { userName: 0, environmentId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxUser",
})) as any;

export type GetKxVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the information about the volume.
 */
export const getKxVolume: API.OperationMethod<
  GetKxVolumeRequest,
  GetKxVolumeResponse,
  GetKxVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/kxvolumes/{volumeName}",
    input: { environmentId: 0, volumeName: 0 },
    output: { createdTimestamp: D.ts, lastModifiedTimestamp: D.ts },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKxVolume",
})) as any;

export type ListEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * A list of all of your FinSpace environments.
 */
export const listEnvironments: API.OperationMethod<
  ListEnvironmentsRequest,
  ListEnvironmentsResponse,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /environment",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
})) as any;

export type ListKxChangesetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the changesets for a database.
 */
export const listKxChangesets: API.PaginatedOperationMethod<
  ListKxChangesetsRequest,
  ListKxChangesetsResponse,
  ListKxChangesetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/databases/{databaseName}/changesets",
    input: {
      environmentId: 0,
      databaseName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      kxChangesets: D.list({
        createdTimestamp: D.ts,
        activeFromTimestamp: D.ts,
        lastModifiedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxChangesets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKxClusterNodesError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the nodes in a kdb cluster.
 */
export const listKxClusterNodes: API.PaginatedOperationMethod<
  ListKxClusterNodesRequest,
  ListKxClusterNodesResponse,
  ListKxClusterNodesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/clusters/{clusterName}/nodes",
    input: {
      environmentId: 0,
      clusterName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { nodes: D.list({ launchTime: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxClusterNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKxClustersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of clusters.
 */
export const listKxClusters: API.OperationMethod<
  ListKxClustersRequest,
  ListKxClustersResponse,
  ListKxClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/clusters",
    input: {
      environmentId: 0,
      clusterType: D.m({ query: "clusterType" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      kxClusterSummaries: D.list({
        lastModifiedTimestamp: D.ts,
        createdTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxClusters",
})) as any;

export type ListKxDatabasesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the databases in the kdb environment.
 */
export const listKxDatabases: API.PaginatedOperationMethod<
  ListKxDatabasesRequest,
  ListKxDatabasesResponse,
  ListKxDatabasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/databases",
    input: {
      environmentId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      kxDatabases: D.list({
        createdTimestamp: D.ts,
        lastModifiedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxDatabases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKxDataviewsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the dataviews in the database.
 */
export const listKxDataviews: API.PaginatedOperationMethod<
  ListKxDataviewsRequest,
  ListKxDataviewsResponse,
  ListKxDataviewsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/databases/{databaseName}/dataviews",
    input: {
      environmentId: 0,
      databaseName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      kxDataviews: D.list({
        activeVersions: D.list(o_KxDataviewActiveVersion),
        createdTimestamp: D.ts,
        lastModifiedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxDataviews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKxEnvironmentsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of kdb environments created in an account.
 */
export const listKxEnvironments: API.PaginatedOperationMethod<
  ListKxEnvironmentsRequest,
  ListKxEnvironmentsResponse,
  ListKxEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  KxEnvironment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      environments: D.list({ creationTimestamp: D.ts, updateTimestamp: D.ts }),
    },
  },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "environments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKxScalingGroupsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of scaling groups in a kdb environment.
 */
export const listKxScalingGroups: API.PaginatedOperationMethod<
  ListKxScalingGroupsRequest,
  ListKxScalingGroupsResponse,
  ListKxScalingGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/scalingGroups",
    input: {
      environmentId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      scalingGroups: D.list({
        lastModifiedTimestamp: D.ts,
        createdTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxScalingGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKxUsersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the users in a kdb environment.
 */
export const listKxUsers: API.OperationMethod<
  ListKxUsersRequest,
  ListKxUsersResponse,
  ListKxUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/users",
    input: {
      environmentId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { users: D.list({ createTimestamp: D.ts, updateTimestamp: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxUsers",
})) as any;

export type ListKxVolumesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the volumes in a kdb environment.
 */
export const listKxVolumes: API.OperationMethod<
  ListKxVolumesRequest,
  ListKxVolumesResponse,
  ListKxVolumesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /kx/environments/{environmentId}/kxvolumes",
    input: {
      environmentId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      volumeType: D.m({ query: "volumeType" }),
    },
    output: {
      kxVolumeSummaries: D.list({
        createdTimestamp: D.ts,
        lastModifiedTimestamp: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKxVolumes",
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * A list of all tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds metadata tags to a FinSpace resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes metadata tags from a FinSpace resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateEnvironmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update your FinSpace environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  UpdateEnvironmentResponse,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /environment/{environmentId}",
    input: {
      environmentId: 0,
      name: 0,
      description: 0,
      federationMode: 0,
      federationParameters: i_FederationParameters,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
})) as any;

export type UpdateKxClusterCodeConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to update code configuration on a running cluster. By using this API you can update the code, the initialization script path, and the command line arguments for a specific cluster.
 * The configuration that you want to update will override any existing configurations on the cluster.
 */
export const updateKxClusterCodeConfiguration: API.OperationMethod<
  UpdateKxClusterCodeConfigurationRequest,
  UpdateKxClusterCodeConfigurationResponse,
  UpdateKxClusterCodeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /kx/environments/{environmentId}/clusters/{clusterName}/configuration/code",
    input: {
      environmentId: 0,
      clusterName: 0,
      clientToken: D.m({ idempotency: true }),
      code: i_CodeConfiguration,
      initializationScript: 0,
      commandLineArguments: D.list(i_KxCommandLineArgument),
      deploymentConfiguration: { deploymentStrategy: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxClusterCodeConfiguration",
})) as any;

export type UpdateKxClusterDatabasesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the databases mounted on a kdb cluster, which includes the `changesetId` and all the dbPaths to be cached. This API does not allow you to change a database name or add a database if you created a cluster without one.
 *
 * Using this API you can point a cluster to a different changeset and modify a list of partitions being cached.
 */
export const updateKxClusterDatabases: API.OperationMethod<
  UpdateKxClusterDatabasesRequest,
  UpdateKxClusterDatabasesResponse,
  UpdateKxClusterDatabasesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /kx/environments/{environmentId}/clusters/{clusterName}/configuration/databases",
    input: {
      environmentId: 0,
      clusterName: 0,
      clientToken: D.m({ idempotency: true }),
      databases: D.list(i_KxDatabaseConfiguration),
      deploymentConfiguration: { deploymentStrategy: 0 },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxClusterDatabases",
})) as any;

export type UpdateKxDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information for the given kdb database.
 */
export const updateKxDatabase: API.OperationMethod<
  UpdateKxDatabaseRequest,
  UpdateKxDatabaseResponse,
  UpdateKxDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /kx/environments/{environmentId}/databases/{databaseName}",
    input: {
      environmentId: 0,
      databaseName: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { lastModifiedTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxDatabase",
})) as any;

export type UpdateKxDataviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified dataview. The dataviews get automatically updated when any new changesets are ingested. Each update of the dataview creates a new version, including changeset details and cache configurations
 */
export const updateKxDataview: API.OperationMethod<
  UpdateKxDataviewRequest,
  UpdateKxDataviewResponse,
  UpdateKxDataviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
    input: {
      environmentId: 0,
      databaseName: 0,
      dataviewName: 0,
      description: 0,
      changesetId: 0,
      segmentConfigurations: D.list(i_KxDataviewSegmentConfiguration),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      activeVersions: D.list(o_KxDataviewActiveVersion),
      createdTimestamp: D.ts,
      lastModifiedTimestamp: D.ts,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxDataview",
})) as any;

export type UpdateKxEnvironmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information for the given kdb environment.
 */
export const updateKxEnvironment: API.OperationMethod<
  UpdateKxEnvironmentRequest,
  UpdateKxEnvironmentResponse,
  UpdateKxEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /kx/environments/{environmentId}",
    input: {
      environmentId: 0,
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { creationTimestamp: D.ts, updateTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxEnvironment",
})) as any;

export type UpdateKxEnvironmentNetworkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates environment network to connect to your internal network by using a transit gateway. This API supports request to create a transit gateway attachment from FinSpace VPC to your transit gateway ID and create a custom Route-53 outbound resolvers.
 *
 * Once you send a request to update a network, you cannot change it again. Network update might require termination of any clusters that are running in the existing network.
 */
export const updateKxEnvironmentNetwork: API.OperationMethod<
  UpdateKxEnvironmentNetworkRequest,
  UpdateKxEnvironmentNetworkResponse,
  UpdateKxEnvironmentNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /kx/environments/{environmentId}/network",
    input: {
      environmentId: 0,
      transitGatewayConfiguration: {
        transitGatewayID: 0,
        routableCIDRSpace: 0,
        attachmentNetworkAclConfiguration: D.list({
          ruleNumber: 0,
          protocol: 0,
          ruleAction: 0,
          portRange: { from: 0, to: 0 },
          icmpTypeCode: { type: 0, code: 0 },
          cidrBlock: 0,
        }),
      },
      customDNSConfiguration: D.list({
        customDNSServerName: 0,
        customDNSServerIP: 0,
      }),
      clientToken: D.m({ idempotency: true }),
    },
    output: { creationTimestamp: D.ts, updateTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxEnvironmentNetwork",
})) as any;

export type UpdateKxUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the user details. You can only update the IAM role associated with a user.
 */
export const updateKxUser: API.OperationMethod<
  UpdateKxUserRequest,
  UpdateKxUserResponse,
  UpdateKxUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /kx/environments/{environmentId}/users/{userName}",
    input: {
      environmentId: 0,
      userName: 0,
      iamRole: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxUser",
})) as any;

export type UpdateKxVolumeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the throughput or capacity of a volume. During the update process, the filesystem
 * might be unavailable for a few minutes. You can retry any operations after the update is complete.
 */
export const updateKxVolume: API.OperationMethod<
  UpdateKxVolumeRequest,
  UpdateKxVolumeResponse,
  UpdateKxVolumeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /kx/environments/{environmentId}/kxvolumes/{volumeName}",
    input: {
      environmentId: 0,
      volumeName: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      nas1Configuration: i_KxNAS1Configuration,
    },
    output: { createdTimestamp: D.ts, lastModifiedTimestamp: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKxVolume",
})) as any;

const i_CodeConfiguration: D.LazyStruct = () => ({
  s3Bucket: 0,
  s3Key: 0,
  s3ObjectVersion: 0,
});
const i_FederationParameters: D.LazyStruct = () => ({
  samlMetadataDocument: 0,
  samlMetadataURL: 0,
  applicationCallBackURL: 0,
  federationURN: 0,
  federationProviderName: 0,
  attributeMap: 0,
});
const i_KxCommandLineArgument: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_KxDatabaseConfiguration: D.LazyStruct = () => ({
  databaseName: 0,
  cacheConfigurations: D.list({ cacheType: 0, dbPaths: 0, dataviewName: 0 }),
  changesetId: 0,
  dataviewName: 0,
  dataviewConfiguration: {
    dataviewName: 0,
    dataviewVersionId: 0,
    changesetId: 0,
    segmentConfigurations: D.list(i_KxDataviewSegmentConfiguration),
  },
});
const i_KxDataviewSegmentConfiguration: D.LazyStruct = () => ({
  dbPaths: 0,
  volumeName: 0,
  onDemand: 0,
});
const i_KxNAS1Configuration: D.LazyStruct = () => ({ type: 0, size: 0 });
const o_KxDataviewActiveVersion: D.LazyStruct = () => ({
  createdTimestamp: D.ts,
});
