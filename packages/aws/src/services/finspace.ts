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
  sdkId: "finspace",
  serviceShapeName: "AWSHabaneroManagementService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "finspace" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-03-12");
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
              `https://finspace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://finspace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://finspace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://finspace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://finspace.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ChangesetStatus = "PENDING" | "PROCESSING" | "FAILED" | "COMPLETED" | (string & {});
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
export type KxClusterType = "HDB" | "RDB" | "GATEWAY" | "GP" | "TICKERPLANT" | (string & {});
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
export type KxDataviewSegmentConfigurationList = KxDataviewSegmentConfiguration[];
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
export type KxClusterCodeDeploymentStrategy = "NO_RESTART" | "ROLLING" | "FORCE" | (string & {});
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
  input: __S(1, __c0, 1) as any as S.Schema<CreateEnvironmentRequest>,
  output: __S(2, __c0, 2) as any as S.Schema<CreateEnvironmentResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<CreateKxChangesetRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<CreateKxChangesetResponse>,
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
}));

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
  input: __S(48, __c6, 0) as any as S.Schema<CreateKxClusterRequest>,
  output: __S(49, __c6, 1) as any as S.Schema<CreateKxClusterResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<CreateKxDatabaseRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<CreateKxDatabaseResponse>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<CreateKxDataviewRequest>,
  output: __S(105, __c13, 1) as any as S.Schema<CreateKxDataviewResponse>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<CreateKxEnvironmentRequest>,
  output: __S(113, __c14, 1) as any as S.Schema<CreateKxEnvironmentResponse>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<CreateKxScalingGroupRequest>,
  output: __S(121, __c15, 1) as any as S.Schema<CreateKxScalingGroupResponse>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<CreateKxUserRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<CreateKxUserResponse>,
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
}));

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
  input: __S(144, __c18, 0) as any as S.Schema<CreateKxVolumeRequest>,
  output: __S(145, __c18, 1) as any as S.Schema<CreateKxVolumeResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<DeleteEnvironmentRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteEnvironmentResponse>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<DeleteKxClusterRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxClusterResponse>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<DeleteKxClusterNodeRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxClusterNodeResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<DeleteKxDatabaseRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxDatabaseResponse>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<DeleteKxDataviewRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxDataviewResponse>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<DeleteKxEnvironmentRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxEnvironmentResponse>,
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
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<DeleteKxScalingGroupRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxScalingGroupResponse>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<DeleteKxUserRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxUserResponse>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<DeleteKxVolumeRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<DeleteKxVolumeResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<GetEnvironmentRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<GetEnvironmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<GetKxChangesetRequest>,
  output: __S(265, __c33, 1) as any as S.Schema<GetKxChangesetResponse>,
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
}));

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
  input: __S(272, __c34, 0) as any as S.Schema<GetKxClusterRequest>,
  output: __S(273, __c34, 1) as any as S.Schema<GetKxClusterResponse>,
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
}));

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
  input: __S(280, __c35, 0) as any as S.Schema<GetKxConnectionStringRequest>,
  output: __S(281, __c35, 1) as any as S.Schema<GetKxConnectionStringResponse>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<GetKxDatabaseRequest>,
  output: __S(289, __c36, 1) as any as S.Schema<GetKxDatabaseResponse>,
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
}));

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
  input: __S(296, __c37, 0) as any as S.Schema<GetKxDataviewRequest>,
  output: __S(297, __c37, 1) as any as S.Schema<GetKxDataviewResponse>,
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
}));

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
  input: __S(312, __c39, 0) as any as S.Schema<GetKxEnvironmentRequest>,
  output: __S(320, __c40, 0) as any as S.Schema<GetKxEnvironmentResponse>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<GetKxScalingGroupRequest>,
  output: __S(337, __c42, 1) as any as S.Schema<GetKxScalingGroupResponse>,
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
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<GetKxUserRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<GetKxUserResponse>,
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
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<GetKxVolumeRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<GetKxVolumeResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<ListEnvironmentsRequest>,
  output: __S(370, __c46, 2) as any as S.Schema<ListEnvironmentsResponse>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<ListKxChangesetsRequest>,
  output: __S(379, __c47, 3) as any as S.Schema<ListKxChangesetsResponse>,
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
  input: __S(384, __c48, 0) as any as S.Schema<ListKxClusterNodesRequest>,
  output: __S(387, __c48, 3) as any as S.Schema<ListKxClusterNodesResponse>,
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
  input: __S(392, __c49, 0) as any as S.Schema<ListKxClustersRequest>,
  output: __S(395, __c49, 3) as any as S.Schema<ListKxClustersResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<ListKxDatabasesRequest>,
  output: __S(403, __c50, 3) as any as S.Schema<ListKxDatabasesResponse>,
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
  input: __S(408, __c51, 0) as any as S.Schema<ListKxDataviewsRequest>,
  output: __S(411, __c51, 3) as any as S.Schema<ListKxDataviewsResponse>,
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
  input: __S(416, __c52, 0) as any as S.Schema<ListKxEnvironmentsRequest>,
  output: __S(418, __c52, 2) as any as S.Schema<ListKxEnvironmentsResponse>,
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
  input: __S(424, __c53, 0) as any as S.Schema<ListKxScalingGroupsRequest>,
  output: __S(427, __c53, 3) as any as S.Schema<ListKxScalingGroupsResponse>,
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
  input: __S(432, __c54, 0) as any as S.Schema<ListKxUsersRequest>,
  output: __S(435, __c54, 3) as any as S.Schema<ListKxUsersResponse>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<ListKxVolumesRequest>,
  output: __S(443, __c55, 3) as any as S.Schema<ListKxVolumesResponse>,
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
}));

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
  input: __S(448, __c56, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(449, __c56, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(456, __c57, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<TagResourceResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, InvalidRequestException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(472, __c59, 0) as any as S.Schema<UpdateEnvironmentRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<UpdateEnvironmentResponse>,
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
}));

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
  input: __S(480, __c60, 0) as any as S.Schema<UpdateKxClusterCodeConfigurationRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UpdateKxClusterCodeConfigurationResponse>,
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
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<UpdateKxClusterDatabasesRequest>,
  output: __S(168, __c21, 0) as any as S.Schema<UpdateKxClusterDatabasesResponse>,
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
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<UpdateKxDatabaseRequest>,
  output: __S(505, __c63, 1) as any as S.Schema<UpdateKxDatabaseResponse>,
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
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<UpdateKxDataviewRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<UpdateKxDataviewResponse>,
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
}));

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
  input: __S(520, __c65, 0) as any as S.Schema<UpdateKxEnvironmentRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<UpdateKxEnvironmentResponse>,
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
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<UpdateKxEnvironmentNetworkRequest>,
  output: __S(528, __c66, 0) as any as S.Schema<UpdateKxEnvironmentNetworkResponse>,
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
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<UpdateKxUserRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<UpdateKxUserResponse>,
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
}));

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
  input: __S(552, __c69, 0) as any as S.Schema<UpdateKxVolumeRequest>,
  output: __S(553, __c69, 1) as any as S.Schema<UpdateKxVolumeResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ emailAddress: SensitiveString, firstName: S.String, lastName: S.String }),
      ).annotate({ identifier: "SuperuserParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(8, __c1, 0)),
          federationMode: S.optional(S.String),
          federationParameters: S.optional(__S(24, __c3, 0)),
          superuserParameters: S.optional(__S(0, __c0, 0)),
          dataBundles: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/environment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEnvironmentRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          environmentArn: S.optional(S.String),
          environmentUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateEnvironmentResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          samlMetadataDocument: S.optional(S.String),
          samlMetadataURL: S.optional(S.String),
          applicationCallBackURL: S.optional(S.String),
          federationURN: S.optional(S.String),
          federationProviderName: S.optional(S.String),
          attributeMap: S.optional(__S(8, __c1, 0)),
        }),
      ).annotate({ identifier: "FederationParameters" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          changeRequests: __S(41, __c5, 1),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/changesets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKxChangesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          changesetId: S.optional(S.String),
          databaseName: S.optional(S.String),
          environmentId: S.optional(S.String),
          changeRequests: S.optional(__S(41, __c5, 1)),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          errorInfo: S.optional(__S(42, __c5, 2)),
        }),
      ).annotate({ identifier: "CreateKxChangesetResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ changeType: S.String, s3Path: S.optional(S.String), dbPath: S.String }),
      ).annotate({ identifier: "ChangeRequest" });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ errorMessage: S.optional(S.String), errorType: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorInfo" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String,
          clusterType: S.String,
          tickerplantLogConfiguration: S.optional(__S(64, __c8, 0)),
          databases: S.optional(__S(92, __c11, 4)),
          cacheStorageConfigurations: S.optional(__S(66, __c8, 2)),
          autoScalingConfiguration: S.optional(__S(67, __c8, 3)),
          clusterDescription: S.optional(S.String),
          capacityConfiguration: S.optional(__S(68, __c8, 4)),
          releaseLabel: S.String,
          vpcConfiguration: __S(69, __c8, 5),
          initializationScript: S.optional(S.String),
          commandLineArguments: S.optional(__S(81, __c10, 1)),
          code: S.optional(__S(82, __c10, 2)),
          executionRole: S.optional(S.String),
          savedownStorageConfiguration: S.optional(__S(70, __c8, 6)),
          azMode: S.String,
          availabilityZoneId: S.optional(S.String),
          tags: S.optional(__S(8, __c1, 0)),
          scalingGroupConfiguration: S.optional(__S(71, __c8, 7)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/kx/environments/{environmentId}/clusters" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKxClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          clusterName: S.optional(S.String),
          clusterType: S.optional(S.String),
          tickerplantLogConfiguration: S.optional(__S(64, __c8, 0)),
          volumes: S.optional(__S(73, __c9, 1)),
          databases: S.optional(__S(92, __c11, 4)),
          cacheStorageConfigurations: S.optional(__S(66, __c8, 2)),
          autoScalingConfiguration: S.optional(__S(67, __c8, 3)),
          clusterDescription: S.optional(S.String),
          capacityConfiguration: S.optional(__S(68, __c8, 4)),
          releaseLabel: S.optional(S.String),
          vpcConfiguration: S.optional(__S(69, __c8, 5)),
          initializationScript: S.optional(S.String),
          commandLineArguments: S.optional(__S(81, __c10, 1)),
          code: S.optional(__S(82, __c10, 2)),
          executionRole: S.optional(S.String),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          savedownStorageConfiguration: S.optional(__S(70, __c8, 6)),
          azMode: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scalingGroupConfiguration: S.optional(__S(71, __c8, 7)),
        }),
      ).annotate({ identifier: "CreateKxClusterResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dbPaths: __S(16, __c2, 0),
          volumeName: S.String,
          onDemand: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "KxDataviewSegmentConfiguration" });
    case 1:
      return S.Array(__S(56, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tickerplantLogVolumes: S.optional(__S(16, __c2, 0)) }),
      ).annotate({ identifier: "TickerplantLogConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ type: S.String, size: S.Number })).annotate({
        identifier: "KxCacheStorageConfiguration",
      });
    case 2:
      return S.Array(__S(65, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          minNodeCount: S.optional(S.Number),
          maxNodeCount: S.optional(S.Number),
          autoScalingMetric: S.optional(S.String),
          metricTarget: S.optional(S.Number),
          scaleInCooldownSeconds: S.optional(S.Number),
          scaleOutCooldownSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutoScalingConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ nodeType: S.optional(S.String), nodeCount: S.optional(S.Number) }),
      ).annotate({ identifier: "CapacityConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.optional(S.String),
          securityGroupIds: S.optional(__S(16, __c2, 0)),
          subnetIds: S.optional(__S(16, __c2, 0)),
          ipAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          size: S.optional(S.Number),
          volumeName: S.optional(S.String),
        }),
      ).annotate({ identifier: "KxSavedownStorageConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          scalingGroupName: S.String,
          memoryLimit: S.optional(S.Number),
          memoryReservation: S.Number,
          nodeCount: S.Number,
          cpu: S.optional(S.Number),
        }),
      ).annotate({ identifier: "KxScalingGroupConfiguration" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ volumeName: S.optional(S.String), volumeType: S.optional(S.String) }),
      ).annotate({ identifier: "Volume" });
    case 1:
      return S.Array(__S(72, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "KxCommandLineArgument" });
    case 1:
      return S.Array(__S(80, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          s3Bucket: S.optional(S.String),
          s3Key: S.optional(S.String),
          s3ObjectVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "CodeConfiguration" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cacheType: S.String,
          dbPaths: __S(16, __c2, 0),
          dataviewName: S.optional(S.String),
        }),
      ).annotate({ identifier: "KxDatabaseCacheConfiguration" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          dataviewName: S.optional(S.String),
          dataviewVersionId: S.optional(S.String),
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
        }),
      ).annotate({ identifier: "KxDataviewConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.String,
          cacheConfigurations: S.optional(__S(89, __c11, 1)),
          changesetId: S.optional(S.String),
          dataviewName: S.optional(S.String),
          dataviewConfiguration: S.optional(__S(90, __c11, 2)),
        }),
      ).annotate({ identifier: "KxDatabaseConfiguration" });
    case 4:
      return S.Array(__S(91, __c11, 3));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(8, __c1, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/kx/environments/{environmentId}/databases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKxDatabaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.optional(S.String),
          databaseArn: S.optional(S.String),
          environmentId: S.optional(S.String),
          description: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateKxDatabaseResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          dataviewName: S.String,
          azMode: S.String,
          availabilityZoneId: S.optional(S.String),
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
          autoUpdate: S.optional(S.Boolean),
          readWrite: S.optional(S.Boolean),
          description: S.optional(S.String),
          tags: S.optional(__S(8, __c1, 0)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKxDataviewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataviewName: S.optional(S.String),
          databaseName: S.optional(S.String),
          environmentId: S.optional(S.String),
          azMode: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
          description: S.optional(S.String),
          autoUpdate: S.optional(S.Boolean),
          readWrite: S.optional(S.Boolean),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateKxDataviewResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          kmsKeyId: S.String,
          tags: S.optional(__S(8, __c1, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/kx/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateKxEnvironmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          status: S.optional(S.String),
          environmentId: S.optional(S.String),
          description: S.optional(S.String),
          environmentArn: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateKxEnvironmentResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String.pipe(T.IdempotencyToken()),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          scalingGroupName: S.String,
          hostType: S.String,
          availabilityZoneId: S.String,
          tags: S.optional(__S(8, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/kx/environments/{environmentId}/scalingGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKxScalingGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          scalingGroupName: S.optional(S.String),
          hostType: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          status: S.optional(S.String),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateKxScalingGroupResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          userName: S.String,
          iamRole: S.String,
          tags: S.optional(__S(8, __c1, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/kx/environments/{environmentId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKxUserRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userName: S.optional(S.String),
          userArn: S.optional(S.String),
          environmentId: S.optional(S.String),
          iamRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateKxUserResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          volumeType: S.String,
          volumeName: S.String,
          description: S.optional(S.String),
          nas1Configuration: S.optional(__S(152, __c19, 0)),
          azMode: S.String,
          availabilityZoneIds: __S(16, __c2, 0),
          tags: S.optional(__S(8, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/kx/environments/{environmentId}/kxvolumes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateKxVolumeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          volumeName: S.optional(S.String),
          volumeType: S.optional(S.String),
          volumeArn: S.optional(S.String),
          nas1Configuration: S.optional(__S(152, __c19, 0)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          azMode: S.optional(S.String),
          description: S.optional(S.String),
          availabilityZoneIds: S.optional(__S(16, __c2, 0)),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateKxVolumeResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), size: S.optional(S.Number) }),
      ).annotate({ identifier: "KxNAS1Configuration" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/environment/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnvironmentRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteEnvironmentResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/kx/environments/{environmentId}/clusters/{clusterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxClusterRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nodeId: S.String.pipe(T.HttpLabel("nodeId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/kx/environments/{environmentId}/clusters/{clusterName}/nodes/{nodeId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxClusterNodeRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          clientToken: S.String.pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxDatabaseRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          dataviewName: S.String.pipe(T.HttpLabel("dataviewName")),
          clientToken: S.String.pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxDataviewRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/kx/environments/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxEnvironmentRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          scalingGroupName: S.String.pipe(T.HttpLabel("scalingGroupName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/kx/environments/{environmentId}/scalingGroups/{scalingGroupName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxScalingGroupRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userName: S.String.pipe(T.HttpLabel("userName")),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/kx/environments/{environmentId}/users/{userName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxUserRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          volumeName: S.String.pipe(T.HttpLabel("volumeName")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/kx/environments/{environmentId}/kxvolumes/{volumeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKxVolumeRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/environment/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEnvironmentRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          environmentId: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          status: S.optional(S.String),
          environmentUrl: S.optional(S.String),
          description: S.optional(S.String),
          environmentArn: S.optional(S.String),
          sageMakerStudioDomainUrl: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          dedicatedServiceAccountId: S.optional(S.String),
          federationMode: S.optional(S.String),
          federationParameters: S.optional(__S(24, __c3, 0)),
        }),
      ).annotate({ identifier: "Environment" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ environment: S.optional(__S(248, __c31, 0)) })).annotate({
        identifier: "GetEnvironmentResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          changesetId: S.String.pipe(T.HttpLabel("changesetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/changesets/{changesetId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxChangesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          changesetId: S.optional(S.String),
          databaseName: S.optional(S.String),
          environmentId: S.optional(S.String),
          changeRequests: S.optional(__S(41, __c5, 1)),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          activeFromTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          errorInfo: S.optional(__S(42, __c5, 2)),
        }),
      ).annotate({ identifier: "GetKxChangesetResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/clusters/{clusterName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxClusterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          clusterName: S.optional(S.String),
          clusterType: S.optional(S.String),
          tickerplantLogConfiguration: S.optional(__S(64, __c8, 0)),
          volumes: S.optional(__S(73, __c9, 1)),
          databases: S.optional(__S(92, __c11, 4)),
          cacheStorageConfigurations: S.optional(__S(66, __c8, 2)),
          autoScalingConfiguration: S.optional(__S(67, __c8, 3)),
          clusterDescription: S.optional(S.String),
          capacityConfiguration: S.optional(__S(68, __c8, 4)),
          releaseLabel: S.optional(S.String),
          vpcConfiguration: S.optional(__S(69, __c8, 5)),
          initializationScript: S.optional(S.String),
          commandLineArguments: S.optional(__S(81, __c10, 1)),
          code: S.optional(__S(82, __c10, 2)),
          executionRole: S.optional(S.String),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          savedownStorageConfiguration: S.optional(__S(70, __c8, 6)),
          azMode: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scalingGroupConfiguration: S.optional(__S(71, __c8, 7)),
        }),
      ).annotate({ identifier: "GetKxClusterResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userArn: S.String.pipe(T.HttpQuery("userArn")),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String.pipe(T.HttpQuery("clusterName")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/connectionString" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxConnectionStringRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ signedConnectionString: S.optional(SensitiveString) }),
      ).annotate({ identifier: "GetKxConnectionStringResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxDatabaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.optional(S.String),
          databaseArn: S.optional(S.String),
          environmentId: S.optional(S.String),
          description: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastCompletedChangesetId: S.optional(S.String),
          numBytes: S.optional(S.Number),
          numChangesets: S.optional(S.Number),
          numFiles: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetKxDatabaseResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          dataviewName: S.String.pipe(T.HttpLabel("dataviewName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxDataviewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.optional(S.String),
          dataviewName: S.optional(S.String),
          azMode: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
          activeVersions: S.optional(__S(305, __c38, 1)),
          description: S.optional(S.String),
          autoUpdate: S.optional(S.Boolean),
          readWrite: S.optional(S.Boolean),
          environmentId: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetKxDataviewResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
          attachedClusters: S.optional(__S(16, __c2, 0)),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          versionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "KxDataviewActiveVersion" });
    case 1:
      return S.Array(__S(304, __c38, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ environmentId: S.String.pipe(T.HttpLabel("environmentId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxEnvironmentRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          environmentId: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          status: S.optional(S.String),
          tgwStatus: S.optional(S.String),
          dnsStatus: S.optional(S.String),
          errorMessage: S.optional(S.String),
          description: S.optional(S.String),
          environmentArn: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          dedicatedServiceAccountId: S.optional(S.String),
          transitGatewayConfiguration: S.optional(__S(332, __c41, 4)),
          customDNSConfiguration: S.optional(__S(334, __c41, 6)),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          availabilityZoneIds: S.optional(__S(16, __c2, 0)),
          certificateAuthorityArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetKxEnvironmentResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ from: S.Number, to: S.Number })).annotate({
        identifier: "PortRange",
      });
    case 1:
      return S.suspend(() => S.Struct({ type: S.Number, code: S.Number })).annotate({
        identifier: "IcmpTypeCode",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ruleNumber: S.Number,
          protocol: S.String,
          ruleAction: S.String,
          portRange: S.optional(__S(328, __c41, 0)),
          icmpTypeCode: S.optional(__S(329, __c41, 1)),
          cidrBlock: S.String,
        }),
      ).annotate({ identifier: "NetworkACLEntry" });
    case 3:
      return S.Array(__S(330, __c41, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          transitGatewayID: S.String,
          routableCIDRSpace: S.String,
          attachmentNetworkAclConfiguration: S.optional(__S(331, __c41, 3)),
        }),
      ).annotate({ identifier: "TransitGatewayConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ customDNSServerName: S.String, customDNSServerIP: S.String }),
      ).annotate({ identifier: "CustomDNSServer" });
    case 6:
      return S.Array(__S(333, __c41, 5));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          scalingGroupName: S.String.pipe(T.HttpLabel("scalingGroupName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/scalingGroups/{scalingGroupName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxScalingGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scalingGroupName: S.optional(S.String),
          scalingGroupArn: S.optional(S.String),
          hostType: S.optional(S.String),
          clusters: S.optional(__S(16, __c2, 0)),
          availabilityZoneId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetKxScalingGroupResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userName: S.String.pipe(T.HttpLabel("userName")),
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/users/{userName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxUserRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          volumeName: S.String.pipe(T.HttpLabel("volumeName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/kxvolumes/{volumeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKxVolumeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          volumeName: S.optional(S.String),
          volumeType: S.optional(S.String),
          volumeArn: S.optional(S.String),
          nas1Configuration: S.optional(__S(152, __c19, 0)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          description: S.optional(S.String),
          azMode: S.optional(S.String),
          availabilityZoneIds: S.optional(__S(16, __c2, 0)),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          attachedClusters: S.optional(__S(361, __c45, 1)),
        }),
      ).annotate({ identifier: "GetKxVolumeResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.optional(S.String),
          clusterType: S.optional(S.String),
          clusterStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "KxAttachedCluster" });
    case 1:
      return S.Array(__S(360, __c45, 0));
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/environment" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEnvironmentsRequest" });
    case 1:
      return S.Array(__S(248, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ environments: S.optional(__S(369, __c46, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnvironmentsResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/changesets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxChangesetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          changesetId: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          activeFromTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "KxChangesetListEntry" });
    case 2:
      return S.Array(__S(377, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ kxChangesets: S.optional(__S(378, __c47, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKxChangesetsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/clusters/{clusterName}/nodes",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxClusterNodesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          nodeId: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          launchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "KxNode" });
    case 2:
      return S.Array(__S(385, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nodes: S.optional(__S(386, __c48, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKxClusterNodesResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterType: S.optional(S.String).pipe(T.HttpQuery("clusterType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/clusters" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxClustersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          clusterName: S.optional(S.String),
          clusterType: S.optional(S.String),
          clusterDescription: S.optional(S.String),
          releaseLabel: S.optional(S.String),
          volumes: S.optional(__S(73, __c9, 1)),
          initializationScript: S.optional(S.String),
          executionRole: S.optional(S.String),
          azMode: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "KxCluster" });
    case 2:
      return S.Array(__S(393, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          kxClusterSummaries: S.optional(__S(394, __c49, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListKxClustersResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/databases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxDatabasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "KxDatabaseListEntry" });
    case 2:
      return S.Array(__S(401, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ kxDatabases: S.optional(__S(402, __c50, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKxDatabasesResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxDataviewsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          databaseName: S.optional(S.String),
          dataviewName: S.optional(S.String),
          azMode: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
          activeVersions: S.optional(__S(305, __c38, 1)),
          status: S.optional(S.String),
          description: S.optional(S.String),
          autoUpdate: S.optional(S.Boolean),
          readWrite: S.optional(S.Boolean),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "KxDataviewListEntry" });
    case 2:
      return S.Array(__S(409, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ kxDataviews: S.optional(__S(410, __c51, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKxDataviewsResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/kx/environments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListKxEnvironmentsRequest" });
    case 1:
      return S.Array(__S(320, __c40, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ environments: S.optional(__S(417, __c52, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKxEnvironmentsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/scalingGroups" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxScalingGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          scalingGroupName: S.optional(S.String),
          hostType: S.optional(S.String),
          clusters: S.optional(__S(16, __c2, 0)),
          availabilityZoneId: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "KxScalingGroup" });
    case 2:
      return S.Array(__S(425, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          scalingGroups: S.optional(__S(426, __c53, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListKxScalingGroupsResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/users" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxUsersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userArn: S.optional(S.String),
          userName: S.optional(S.String),
          iamRole: S.optional(S.String),
          createTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "KxUser" });
    case 2:
      return S.Array(__S(433, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ users: S.optional(__S(434, __c54, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKxUsersResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          volumeType: S.optional(S.String).pipe(T.HttpQuery("volumeType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/kx/environments/{environmentId}/kxvolumes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKxVolumesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          volumeName: S.optional(S.String),
          volumeType: S.optional(S.String),
          status: S.optional(S.String),
          description: S.optional(S.String),
          statusReason: S.optional(S.String),
          azMode: S.optional(S.String),
          availabilityZoneIds: S.optional(__S(16, __c2, 0)),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "KxVolume" });
    case 2:
      return S.Array(__S(441, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          kxVolumeSummaries: S.optional(__S(442, __c55, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListKxVolumesResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(8, __c1, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(8, __c1, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(16, __c2, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          federationMode: S.optional(S.String),
          federationParameters: S.optional(__S(24, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/environment/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateEnvironmentRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          code: __S(82, __c10, 2),
          initializationScript: S.optional(S.String),
          commandLineArguments: S.optional(__S(81, __c10, 1)),
          deploymentConfiguration: S.optional(__S(488, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/kx/environments/{environmentId}/clusters/{clusterName}/configuration/code",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxClusterCodeConfigurationRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ deploymentStrategy: S.String })).annotate({
        identifier: "KxClusterCodeDeploymentConfiguration",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          clusterName: S.String.pipe(T.HttpLabel("clusterName")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          databases: __S(92, __c11, 4),
          deploymentConfiguration: S.optional(__S(488, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/kx/environments/{environmentId}/clusters/{clusterName}/configuration/databases",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxClusterDatabasesRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          description: S.optional(S.String),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxDatabaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          databaseName: S.optional(S.String),
          environmentId: S.optional(S.String),
          description: S.optional(S.String),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateKxDatabaseResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          databaseName: S.String.pipe(T.HttpLabel("databaseName")),
          dataviewName: S.String.pipe(T.HttpLabel("dataviewName")),
          description: S.optional(S.String),
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/kx/environments/{environmentId}/databases/{databaseName}/dataviews/{dataviewName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxDataviewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          databaseName: S.optional(S.String),
          dataviewName: S.optional(S.String),
          azMode: S.optional(S.String),
          availabilityZoneId: S.optional(S.String),
          changesetId: S.optional(S.String),
          segmentConfigurations: S.optional(__S(57, __c7, 1)),
          activeVersions: S.optional(__S(305, __c38, 1)),
          status: S.optional(S.String),
          autoUpdate: S.optional(S.Boolean),
          readWrite: S.optional(S.Boolean),
          description: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateKxDataviewResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/kx/environments/{environmentId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxEnvironmentRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          environmentId: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          status: S.optional(S.String),
          tgwStatus: S.optional(S.String),
          dnsStatus: S.optional(S.String),
          errorMessage: S.optional(S.String),
          description: S.optional(S.String),
          environmentArn: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          dedicatedServiceAccountId: S.optional(S.String),
          transitGatewayConfiguration: S.optional(__S(332, __c41, 4)),
          customDNSConfiguration: S.optional(__S(334, __c41, 6)),
          creationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updateTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          availabilityZoneIds: S.optional(__S(16, __c2, 0)),
        }),
      ).annotate({ identifier: "UpdateKxEnvironmentResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          transitGatewayConfiguration: S.optional(__S(332, __c41, 4)),
          customDNSConfiguration: S.optional(__S(334, __c41, 6)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/kx/environments/{environmentId}/network" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxEnvironmentNetworkRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          userName: S.String.pipe(T.HttpLabel("userName")),
          iamRole: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/kx/environments/{environmentId}/users/{userName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxUserRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.String.pipe(T.HttpLabel("environmentId")),
          volumeName: S.String.pipe(T.HttpLabel("volumeName")),
          description: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          nas1Configuration: S.optional(__S(152, __c19, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/kx/environments/{environmentId}/kxvolumes/{volumeName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKxVolumeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          environmentId: S.optional(S.String),
          volumeName: S.optional(S.String),
          volumeType: S.optional(S.String),
          volumeArn: S.optional(S.String),
          nas1Configuration: S.optional(__S(152, __c19, 0)),
          status: S.optional(S.String),
          description: S.optional(S.String),
          statusReason: S.optional(S.String),
          createdTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          azMode: S.optional(S.String),
          availabilityZoneIds: S.optional(__S(16, __c2, 0)),
          lastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          attachedClusters: S.optional(__S(361, __c45, 1)),
        }),
      ).annotate({ identifier: "UpdateKxVolumeResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
