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
  sdkId: "Elasticsearch Service",
  target: "AmazonElasticsearchService2015",
  version: "2015-01-01",
  sigv4: "es",
  protocol: restJson1Protocol,
  xmlns: "http://es.amazonaws.com/doc/2015-01-01/",
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
                `https://es-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://es-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://aos.${Region}.api.aws`);
              }
              if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
                return e(`https://aos.${Region}.api.amazonwebservices.com.cn`);
              }
              if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
                return e(`https://aos.${Region}.api.aws`);
              }
              return e(
                `https://es.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://es.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BaseException
  extends /*@__PURE__*/ TE.TaggedError("BaseException")<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DisabledOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "DisabledOperationException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InternalException
  extends /*@__PURE__*/ TE.TaggedError("InternalException", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPaginationTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidTypeException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["ConflictError"],
    { status: 409 },
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
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type CrossClusterSearchConnectionId = string;
export interface AcceptInboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export type OwnerId = string;
export type DomainName = string;
export type Region = string;
export interface DomainInformation {
  OwnerId?: string;
  DomainName: string;
  Region?: string;
}
export type InboundCrossClusterSearchConnectionStatusCode =
  | "PENDING_ACCEPTANCE"
  | "APPROVED"
  | "REJECTING"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type CrossClusterSearchConnectionStatusMessage = string;
export interface InboundCrossClusterSearchConnectionStatus {
  StatusCode?: InboundCrossClusterSearchConnectionStatusCode;
  Message?: string;
}
export interface InboundCrossClusterSearchConnection {
  SourceDomainInfo?: DomainInformation;
  DestinationDomainInfo?: DomainInformation;
  CrossClusterSearchConnectionId?: string;
  ConnectionStatus?: InboundCrossClusterSearchConnectionStatus;
}
export interface AcceptInboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: InboundCrossClusterSearchConnection;
}
export type ARN = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface AddTagsRequest {
  ARN: string;
  TagList: Tag[];
}
export interface AddTagsResponse {}
export type PackageID = string;
export interface AssociatePackageRequest {
  PackageID: string;
  DomainName: string;
}
export type PackageName = string;
export type PackageType = "TXT-DICTIONARY" | (string & {});
export type LastUpdated = Date;
export type DomainPackageStatus =
  | "ASSOCIATING"
  | "ASSOCIATION_FAILED"
  | "ACTIVE"
  | "DISSOCIATING"
  | "DISSOCIATION_FAILED"
  | (string & {});
export type PackageVersion = string;
export type ReferencePath = string;
export type ErrorType = string;
export type ErrorMessage = string;
export interface ErrorDetails {
  ErrorType?: string;
  ErrorMessage?: string;
}
export interface DomainPackageDetails {
  PackageID?: string;
  PackageName?: string;
  PackageType?: PackageType;
  LastUpdated?: Date;
  DomainName?: string;
  DomainPackageStatus?: DomainPackageStatus;
  PackageVersion?: string;
  ReferencePath?: string;
  ErrorDetails?: ErrorDetails;
}
export interface AssociatePackageResponse {
  DomainPackageDetails?: DomainPackageDetails;
}
export type AWSAccount = string;
export interface AuthorizeVpcEndpointAccessRequest {
  DomainName: string;
  Account: string;
}
export type PrincipalType = "AWS_ACCOUNT" | "AWS_SERVICE" | (string & {});
export interface AuthorizedPrincipal {
  PrincipalType?: PrincipalType;
  Principal?: string;
}
export interface AuthorizeVpcEndpointAccessResponse {
  AuthorizedPrincipal: AuthorizedPrincipal;
}
export type DryRun = boolean;
export interface CancelDomainConfigChangeRequest {
  DomainName: string;
  DryRun?: boolean;
}
export type GUID = string;
export type GUIDList = string[];
export interface CancelledChangeProperty {
  PropertyName?: string;
  CancelledValue?: string;
  ActiveValue?: string;
}
export type CancelledChangePropertyList = CancelledChangeProperty[];
export interface CancelDomainConfigChangeResponse {
  DryRun?: boolean;
  CancelledChangeIds?: string[];
  CancelledChangeProperties?: CancelledChangeProperty[];
}
export interface CancelElasticsearchServiceSoftwareUpdateRequest {
  DomainName: string;
}
export type DeploymentStatus =
  | "PENDING_UPDATE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "NOT_ELIGIBLE"
  | "ELIGIBLE"
  | (string & {});
export type DeploymentCloseDateTimeStamp = Date;
export interface ServiceSoftwareOptions {
  CurrentVersion?: string;
  NewVersion?: string;
  UpdateAvailable?: boolean;
  Cancellable?: boolean;
  UpdateStatus?: DeploymentStatus;
  Description?: string;
  AutomatedUpdateDate?: Date;
  OptionalDeployment?: boolean;
}
export interface CancelElasticsearchServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export type ElasticsearchVersionString = string;
export type ESPartitionInstanceType =
  | "m3.medium.elasticsearch"
  | "m3.large.elasticsearch"
  | "m3.xlarge.elasticsearch"
  | "m3.2xlarge.elasticsearch"
  | "m4.large.elasticsearch"
  | "m4.xlarge.elasticsearch"
  | "m4.2xlarge.elasticsearch"
  | "m4.4xlarge.elasticsearch"
  | "m4.10xlarge.elasticsearch"
  | "m5.large.elasticsearch"
  | "m5.xlarge.elasticsearch"
  | "m5.2xlarge.elasticsearch"
  | "m5.4xlarge.elasticsearch"
  | "m5.12xlarge.elasticsearch"
  | "r5.large.elasticsearch"
  | "r5.xlarge.elasticsearch"
  | "r5.2xlarge.elasticsearch"
  | "r5.4xlarge.elasticsearch"
  | "r5.12xlarge.elasticsearch"
  | "c5.large.elasticsearch"
  | "c5.xlarge.elasticsearch"
  | "c5.2xlarge.elasticsearch"
  | "c5.4xlarge.elasticsearch"
  | "c5.9xlarge.elasticsearch"
  | "c5.18xlarge.elasticsearch"
  | "ultrawarm1.medium.elasticsearch"
  | "ultrawarm1.large.elasticsearch"
  | "t2.micro.elasticsearch"
  | "t2.small.elasticsearch"
  | "t2.medium.elasticsearch"
  | "r3.large.elasticsearch"
  | "r3.xlarge.elasticsearch"
  | "r3.2xlarge.elasticsearch"
  | "r3.4xlarge.elasticsearch"
  | "r3.8xlarge.elasticsearch"
  | "i2.xlarge.elasticsearch"
  | "i2.2xlarge.elasticsearch"
  | "d2.xlarge.elasticsearch"
  | "d2.2xlarge.elasticsearch"
  | "d2.4xlarge.elasticsearch"
  | "d2.8xlarge.elasticsearch"
  | "c4.large.elasticsearch"
  | "c4.xlarge.elasticsearch"
  | "c4.2xlarge.elasticsearch"
  | "c4.4xlarge.elasticsearch"
  | "c4.8xlarge.elasticsearch"
  | "r4.large.elasticsearch"
  | "r4.xlarge.elasticsearch"
  | "r4.2xlarge.elasticsearch"
  | "r4.4xlarge.elasticsearch"
  | "r4.8xlarge.elasticsearch"
  | "r4.16xlarge.elasticsearch"
  | "i3.large.elasticsearch"
  | "i3.xlarge.elasticsearch"
  | "i3.2xlarge.elasticsearch"
  | "i3.4xlarge.elasticsearch"
  | "i3.8xlarge.elasticsearch"
  | "i3.16xlarge.elasticsearch"
  | (string & {});
export type IntegerClass = number;
export interface ZoneAwarenessConfig {
  AvailabilityZoneCount?: number;
}
export type ESWarmPartitionInstanceType =
  | "ultrawarm1.medium.elasticsearch"
  | "ultrawarm1.large.elasticsearch"
  | (string & {});
export interface ColdStorageOptions {
  Enabled: boolean;
}
export interface ElasticsearchClusterConfig {
  InstanceType?: ESPartitionInstanceType;
  InstanceCount?: number;
  DedicatedMasterEnabled?: boolean;
  ZoneAwarenessEnabled?: boolean;
  ZoneAwarenessConfig?: ZoneAwarenessConfig;
  DedicatedMasterType?: ESPartitionInstanceType;
  DedicatedMasterCount?: number;
  WarmEnabled?: boolean;
  WarmType?: ESWarmPartitionInstanceType;
  WarmCount?: number;
  ColdStorageOptions?: ColdStorageOptions;
}
export type VolumeType = "standard" | "gp2" | "io1" | "gp3" | (string & {});
export interface EBSOptions {
  EBSEnabled?: boolean;
  VolumeType?: VolumeType;
  VolumeSize?: number;
  Iops?: number;
  Throughput?: number;
}
export type PolicyDocument = string;
export interface SnapshotOptions {
  AutomatedSnapshotStartHour?: number;
}
export type StringList = string[];
export interface VPCOptions {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export type UserPoolId = string;
export type IdentityPoolId = string;
export type RoleArn = string;
export interface CognitoOptions {
  Enabled?: boolean;
  UserPoolId?: string;
  IdentityPoolId?: string;
  RoleArn?: string;
}
export type KmsKeyId = string;
export interface EncryptionAtRestOptions {
  Enabled?: boolean;
  KmsKeyId?: string;
}
export interface NodeToNodeEncryptionOptions {
  Enabled?: boolean;
}
export type AdvancedOptions = { [key: string]: string | undefined };
export type LogType =
  | "INDEX_SLOW_LOGS"
  | "SEARCH_SLOW_LOGS"
  | "ES_APPLICATION_LOGS"
  | "AUDIT_LOGS"
  | (string & {});
export type CloudWatchLogsLogGroupArn = string;
export interface LogPublishingOption {
  CloudWatchLogsLogGroupArn?: string;
  Enabled?: boolean;
}
export type LogPublishingOptions = { [key in LogType]?: LogPublishingOption };
export type TLSSecurityPolicy =
  | "Policy-Min-TLS-1-0-2019-07"
  | "Policy-Min-TLS-1-2-2019-07"
  | "Policy-Min-TLS-1-2-PFS-2023-10"
  | "Policy-Min-TLS-1-2-RFC9151-FIPS-2024-08"
  | (string & {});
export type DomainNameFqdn = string;
export interface DomainEndpointOptions {
  EnforceHTTPS?: boolean;
  TLSSecurityPolicy?: TLSSecurityPolicy;
  CustomEndpointEnabled?: boolean;
  CustomEndpoint?: string;
  CustomEndpointCertificateArn?: string;
}
export type Username = string | redacted.Redacted<string>;
export type Password = string | redacted.Redacted<string>;
export interface MasterUserOptions {
  MasterUserARN?: string;
  MasterUserName?: string | redacted.Redacted<string>;
  MasterUserPassword?: string | redacted.Redacted<string>;
}
export type SAMLMetadata = string;
export type SAMLEntityId = string;
export interface SAMLIdp {
  MetadataContent: string;
  EntityId: string;
}
export type BackendRole = string;
export interface SAMLOptionsInput {
  Enabled?: boolean;
  Idp?: SAMLIdp;
  MasterUserName?: string | redacted.Redacted<string>;
  MasterBackendRole?: string;
  SubjectKey?: string;
  RolesKey?: string;
  SessionTimeoutMinutes?: number;
}
export interface AdvancedSecurityOptionsInput {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  MasterUserOptions?: MasterUserOptions;
  SAMLOptions?: SAMLOptionsInput;
  AnonymousAuthEnabled?: boolean;
}
export type AutoTuneDesiredState = "ENABLED" | "DISABLED" | (string & {});
export type StartAt = Date;
export type DurationValue = number;
export type TimeUnit = "HOURS" | (string & {});
export interface Duration {
  Value?: number;
  Unit?: TimeUnit;
}
export interface AutoTuneMaintenanceSchedule {
  StartAt?: Date;
  Duration?: Duration;
  CronExpressionForRecurrence?: string;
}
export type AutoTuneMaintenanceScheduleList = AutoTuneMaintenanceSchedule[];
export interface AutoTuneOptionsInput {
  DesiredState?: AutoTuneDesiredState;
  MaintenanceSchedules?: AutoTuneMaintenanceSchedule[];
}
export type DeploymentStrategy =
  | "Default"
  | "CapacityOptimized"
  | (string & {});
export interface DeploymentStrategyOptions {
  DeploymentStrategy: DeploymentStrategy;
}
export type UpdateTimestamp = Date;
export interface AutomatedSnapshotPauseRequestOptions {
  Enabled: boolean;
  StartTime?: Date;
  EndTime?: Date;
}
export type DomainUseCase =
  | "SEARCH"
  | "VECTOR"
  | "OBSERVABILITY"
  | "MIXED"
  | (string & {});
export type DomainEngineMode = "GENERAL" | "OPTIMIZED" | (string & {});
export interface CreateElasticsearchDomainRequest {
  DomainName: string;
  ElasticsearchVersion?: string;
  ElasticsearchClusterConfig?: ElasticsearchClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  AutoTuneOptions?: AutoTuneOptionsInput;
  TagList?: Tag[];
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
  UseCase?: DomainUseCase;
  EngineMode?: DomainEngineMode;
}
export type DomainId = string;
export type ServiceUrl = string;
export type EndpointsMap = { [key: string]: string | undefined };
export interface VPCDerivedInfo {
  VPCId?: string;
  SubnetIds?: string[];
  AvailabilityZones?: string[];
  SecurityGroupIds?: string[];
}
export interface SAMLOptionsOutput {
  Enabled?: boolean;
  Idp?: SAMLIdp;
  SubjectKey?: string;
  RolesKey?: string;
  SessionTimeoutMinutes?: number;
}
export type DisableTimestamp = Date;
export interface AdvancedSecurityOptions {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  SAMLOptions?: SAMLOptionsOutput;
  AnonymousAuthDisableDate?: Date;
  AnonymousAuthEnabled?: boolean;
}
export type AutoTuneState =
  | "ENABLED"
  | "DISABLED"
  | "ENABLE_IN_PROGRESS"
  | "DISABLE_IN_PROGRESS"
  | "DISABLED_AND_ROLLBACK_SCHEDULED"
  | "DISABLED_AND_ROLLBACK_IN_PROGRESS"
  | "DISABLED_AND_ROLLBACK_COMPLETE"
  | "DISABLED_AND_ROLLBACK_ERROR"
  | "ERROR"
  | (string & {});
export interface AutoTuneOptionsOutput {
  State?: AutoTuneState;
  ErrorMessage?: string;
}
export type Message = string;
export type ConfigChangeStatus =
  | "Pending"
  | "Initializing"
  | "Validating"
  | "ValidationFailed"
  | "ApplyingChanges"
  | "Completed"
  | "PendingUserInput"
  | "Cancelled"
  | (string & {});
export type InitiatedBy = "CUSTOMER" | "SERVICE" | (string & {});
export interface ChangeProgressDetails {
  ChangeId?: string;
  Message?: string;
  ConfigChangeStatus?: ConfigChangeStatus;
  StartTime?: Date;
  LastUpdatedTime?: Date;
  InitiatedBy?: InitiatedBy;
}
export type DomainProcessingStatusType =
  | "Creating"
  | "Active"
  | "Modifying"
  | "UpgradingEngineVersion"
  | "UpdatingServiceSoftware"
  | "Isolated"
  | "Deleting"
  | (string & {});
export type PropertyValueType =
  | "PLAIN_TEXT"
  | "STRINGIFIED_JSON"
  | (string & {});
export interface ModifyingProperties {
  Name?: string;
  ActiveValue?: string;
  PendingValue?: string;
  ValueType?: PropertyValueType;
}
export type ModifyingPropertiesList = ModifyingProperties[];
export type PauseState =
  | "Active"
  | "Completed"
  | "Scheduled"
  | "Disabled"
  | (string & {});
export interface AutomatedSnapshotPauseOptions {
  Enabled: boolean;
  StartTime?: Date;
  EndTime?: Date;
  State?: PauseState;
}
export interface ElasticsearchDomainStatus {
  DomainId: string;
  DomainName: string;
  ARN: string;
  Created?: boolean;
  Deleted?: boolean;
  Endpoint?: string;
  Endpoints?: { [key: string]: string | undefined };
  Processing?: boolean;
  UpgradeProcessing?: boolean;
  ElasticsearchVersion?: string;
  ElasticsearchClusterConfig: ElasticsearchClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCDerivedInfo;
  CognitoOptions?: CognitoOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptions;
  AutoTuneOptions?: AutoTuneOptionsOutput;
  ChangeProgressDetails?: ChangeProgressDetails;
  DomainProcessingStatus?: DomainProcessingStatusType;
  ModifyingProperties?: ModifyingProperties[];
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptions;
  UseCase?: DomainUseCase;
  EngineMode?: DomainEngineMode;
}
export interface CreateElasticsearchDomainResponse {
  DomainStatus?: ElasticsearchDomainStatus;
}
export type ConnectionAlias = string;
export interface CreateOutboundCrossClusterSearchConnectionRequest {
  SourceDomainInfo: DomainInformation;
  DestinationDomainInfo: DomainInformation;
  ConnectionAlias: string;
}
export type OutboundCrossClusterSearchConnectionStatusCode =
  | "PENDING_ACCEPTANCE"
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "PROVISIONING"
  | "ACTIVE"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface OutboundCrossClusterSearchConnectionStatus {
  StatusCode?: OutboundCrossClusterSearchConnectionStatusCode;
  Message?: string;
}
export interface CreateOutboundCrossClusterSearchConnectionResponse {
  SourceDomainInfo?: DomainInformation;
  DestinationDomainInfo?: DomainInformation;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundCrossClusterSearchConnectionStatus;
  CrossClusterSearchConnectionId?: string;
}
export type PackageDescription = string;
export type S3BucketName = string;
export type S3Key = string;
export interface PackageSource {
  S3BucketName?: string;
  S3Key?: string;
}
export interface CreatePackageRequest {
  PackageName: string;
  PackageType: PackageType;
  PackageDescription?: string;
  PackageSource: PackageSource;
}
export type PackageStatus =
  | "COPYING"
  | "COPY_FAILED"
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "AVAILABLE"
  | "DELETING"
  | "DELETED"
  | "DELETE_FAILED"
  | (string & {});
export type CreatedAt = Date;
export interface PackageDetails {
  PackageID?: string;
  PackageName?: string;
  PackageType?: PackageType;
  PackageDescription?: string;
  PackageStatus?: PackageStatus;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  AvailablePackageVersion?: string;
  ErrorDetails?: ErrorDetails;
}
export interface CreatePackageResponse {
  PackageDetails?: PackageDetails;
}
export type DomainArn = string;
export type ClientToken = string;
export interface CreateVpcEndpointRequest {
  DomainArn: string;
  VpcOptions: VPCOptions;
  ClientToken?: string;
}
export type VpcEndpointId = string;
export type VpcEndpointStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | (string & {});
export type Endpoint = string;
export interface VpcEndpoint {
  VpcEndpointId?: string;
  VpcEndpointOwner?: string;
  DomainArn?: string;
  VpcOptions?: VPCDerivedInfo;
  Status?: VpcEndpointStatus;
  Endpoint?: string;
}
export interface CreateVpcEndpointResponse {
  VpcEndpoint: VpcEndpoint;
}
export interface DeleteElasticsearchDomainRequest {
  DomainName: string;
}
export interface DeleteElasticsearchDomainResponse {
  DomainStatus?: ElasticsearchDomainStatus;
}
export interface DeleteElasticsearchServiceRoleRequest {}
export interface DeleteElasticsearchServiceRoleResponse {}
export interface DeleteInboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export interface DeleteInboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: InboundCrossClusterSearchConnection;
}
export interface DeleteOutboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export interface OutboundCrossClusterSearchConnection {
  SourceDomainInfo?: DomainInformation;
  DestinationDomainInfo?: DomainInformation;
  CrossClusterSearchConnectionId?: string;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundCrossClusterSearchConnectionStatus;
}
export interface DeleteOutboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: OutboundCrossClusterSearchConnection;
}
export interface DeletePackageRequest {
  PackageID: string;
}
export interface DeletePackageResponse {
  PackageDetails?: PackageDetails;
}
export interface DeleteVpcEndpointRequest {
  VpcEndpointId: string;
}
export interface VpcEndpointSummary {
  VpcEndpointId?: string;
  VpcEndpointOwner?: string;
  DomainArn?: string;
  Status?: VpcEndpointStatus;
}
export interface DeleteVpcEndpointResponse {
  VpcEndpointSummary: VpcEndpointSummary;
}
export type MaxResults = number;
export type NextToken = string;
export interface DescribeDomainAutoTunesRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type AutoTuneType = "SCHEDULED_ACTION" | (string & {});
export type AutoTuneDate = Date;
export type ScheduledAutoTuneActionType =
  | "JVM_HEAP_SIZE_TUNING"
  | "JVM_YOUNG_GEN_TUNING"
  | (string & {});
export type ScheduledAutoTuneDescription = string;
export type ScheduledAutoTuneSeverityType =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export interface ScheduledAutoTuneDetails {
  Date?: Date;
  ActionType?: ScheduledAutoTuneActionType;
  Action?: string;
  Severity?: ScheduledAutoTuneSeverityType;
}
export interface AutoTuneDetails {
  ScheduledAutoTuneDetails?: ScheduledAutoTuneDetails;
}
export interface AutoTune {
  AutoTuneType?: AutoTuneType;
  AutoTuneDetails?: AutoTuneDetails;
}
export type AutoTuneList = AutoTune[];
export interface DescribeDomainAutoTunesResponse {
  AutoTunes?: AutoTune[];
  NextToken?: string;
}
export interface DescribeDomainChangeProgressRequest {
  DomainName: string;
  ChangeId?: string;
}
export type OverallChangeStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type TotalNumberOfStages = number;
export type ChangeProgressStageName = string;
export type ChangeProgressStageStatus = string;
export type Description = string;
export interface ChangeProgressStage {
  Name?: string;
  Status?: string;
  Description?: string;
  LastUpdated?: Date;
}
export type ChangeProgressStageList = ChangeProgressStage[];
export interface ChangeProgressStatusDetails {
  ChangeId?: string;
  StartTime?: Date;
  Status?: OverallChangeStatus;
  PendingProperties?: string[];
  CompletedProperties?: string[];
  TotalNumberOfStages?: number;
  ChangeProgressStages?: ChangeProgressStage[];
  ConfigChangeStatus?: ConfigChangeStatus;
  LastUpdatedTime?: Date;
  InitiatedBy?: InitiatedBy;
}
export interface DescribeDomainChangeProgressResponse {
  ChangeProgressStatus?: ChangeProgressStatusDetails;
}
export interface DescribeElasticsearchDomainRequest {
  DomainName: string;
}
export interface DescribeElasticsearchDomainResponse {
  DomainStatus: ElasticsearchDomainStatus;
}
export interface DescribeElasticsearchDomainConfigRequest {
  DomainName: string;
}
export type UIntValue = number;
export type OptionState =
  | "RequiresIndexDocuments"
  | "Processing"
  | "Active"
  | (string & {});
export interface OptionStatus {
  CreationDate: Date;
  UpdateDate: Date;
  UpdateVersion?: number;
  State: OptionState;
  PendingDeletion?: boolean;
}
export interface ElasticsearchVersionStatus {
  Options: string;
  Status: OptionStatus;
}
export interface ElasticsearchClusterConfigStatus {
  Options: ElasticsearchClusterConfig;
  Status: OptionStatus;
}
export interface EBSOptionsStatus {
  Options: EBSOptions;
  Status: OptionStatus;
}
export interface AccessPoliciesStatus {
  Options: string;
  Status: OptionStatus;
}
export interface SnapshotOptionsStatus {
  Options: SnapshotOptions;
  Status: OptionStatus;
}
export interface VPCDerivedInfoStatus {
  Options: VPCDerivedInfo;
  Status: OptionStatus;
}
export interface CognitoOptionsStatus {
  Options: CognitoOptions;
  Status: OptionStatus;
}
export interface EncryptionAtRestOptionsStatus {
  Options: EncryptionAtRestOptions;
  Status: OptionStatus;
}
export interface NodeToNodeEncryptionOptionsStatus {
  Options: NodeToNodeEncryptionOptions;
  Status: OptionStatus;
}
export interface AdvancedOptionsStatus {
  Options: { [key: string]: string | undefined };
  Status: OptionStatus;
}
export interface LogPublishingOptionsStatus {
  Options?: { [key: string]: LogPublishingOption | undefined };
  Status?: OptionStatus;
}
export interface DomainEndpointOptionsStatus {
  Options: DomainEndpointOptions;
  Status: OptionStatus;
}
export interface AdvancedSecurityOptionsStatus {
  Options: AdvancedSecurityOptions;
  Status: OptionStatus;
}
export type RollbackOnDisable =
  | "NO_ROLLBACK"
  | "DEFAULT_ROLLBACK"
  | (string & {});
export interface AutoTuneOptions {
  DesiredState?: AutoTuneDesiredState;
  RollbackOnDisable?: RollbackOnDisable;
  MaintenanceSchedules?: AutoTuneMaintenanceSchedule[];
}
export interface AutoTuneStatus {
  CreationDate: Date;
  UpdateDate: Date;
  UpdateVersion?: number;
  State: AutoTuneState;
  ErrorMessage?: string;
  PendingDeletion?: boolean;
}
export interface AutoTuneOptionsStatus {
  Options?: AutoTuneOptions;
  Status?: AutoTuneStatus;
}
export interface DeploymentStrategyOptionsStatus {
  Options: DeploymentStrategyOptions;
  Status: OptionStatus;
}
export interface AutomatedSnapshotPauseOptionsStatus {
  Options: AutomatedSnapshotPauseOptions;
  Status: OptionStatus;
}
export interface UseCaseStatus {
  Options: DomainUseCase;
  Status: OptionStatus;
}
export interface EngineModeStatus {
  Options: DomainEngineMode;
  Status: OptionStatus;
}
export interface ElasticsearchDomainConfig {
  ElasticsearchVersion?: ElasticsearchVersionStatus;
  ElasticsearchClusterConfig?: ElasticsearchClusterConfigStatus;
  EBSOptions?: EBSOptionsStatus;
  AccessPolicies?: AccessPoliciesStatus;
  SnapshotOptions?: SnapshotOptionsStatus;
  VPCOptions?: VPCDerivedInfoStatus;
  CognitoOptions?: CognitoOptionsStatus;
  EncryptionAtRestOptions?: EncryptionAtRestOptionsStatus;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptionsStatus;
  AdvancedOptions?: AdvancedOptionsStatus;
  LogPublishingOptions?: LogPublishingOptionsStatus;
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsStatus;
  AutoTuneOptions?: AutoTuneOptionsStatus;
  ChangeProgressDetails?: ChangeProgressDetails;
  ModifyingProperties?: ModifyingProperties[];
  DeploymentStrategyOptions?: DeploymentStrategyOptionsStatus;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptionsStatus;
  UseCase?: UseCaseStatus;
  EngineMode?: EngineModeStatus;
}
export interface DescribeElasticsearchDomainConfigResponse {
  DomainConfig: ElasticsearchDomainConfig;
}
export type DomainNameList = string[];
export interface DescribeElasticsearchDomainsRequest {
  DomainNames: string[];
}
export type ElasticsearchDomainStatusList = ElasticsearchDomainStatus[];
export interface DescribeElasticsearchDomainsResponse {
  DomainStatusList: ElasticsearchDomainStatus[];
}
export interface DescribeElasticsearchInstanceTypeLimitsRequest {
  DomainName?: string;
  InstanceType: ESPartitionInstanceType;
  ElasticsearchVersion: string;
}
export type InstanceRole = string;
export type StorageTypeName = string;
export type StorageSubTypeName = string;
export type LimitName = string;
export type LimitValue = string;
export type LimitValueList = string[];
export interface StorageTypeLimit {
  LimitName?: string;
  LimitValues?: string[];
}
export type StorageTypeLimitList = StorageTypeLimit[];
export interface StorageType {
  StorageTypeName?: string;
  StorageSubTypeName?: string;
  StorageTypeLimits?: StorageTypeLimit[];
}
export type StorageTypeList = StorageType[];
export type MinimumInstanceCount = number;
export type MaximumInstanceCount = number;
export interface InstanceCountLimits {
  MinimumInstanceCount?: number;
  MaximumInstanceCount?: number;
}
export interface InstanceLimits {
  InstanceCountLimits?: InstanceCountLimits;
}
export interface AdditionalLimit {
  LimitName?: string;
  LimitValues?: string[];
}
export type AdditionalLimitList = AdditionalLimit[];
export interface Limits {
  StorageTypes?: StorageType[];
  InstanceLimits?: InstanceLimits;
  AdditionalLimits?: AdditionalLimit[];
}
export type LimitsByRole = { [key: string]: Limits | undefined };
export interface DescribeElasticsearchInstanceTypeLimitsResponse {
  LimitsByRole?: { [key: string]: Limits | undefined };
}
export type NonEmptyString = string;
export type ValueStringList = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type FilterList = Filter[];
export interface DescribeInboundCrossClusterSearchConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type InboundCrossClusterSearchConnections =
  InboundCrossClusterSearchConnection[];
export interface DescribeInboundCrossClusterSearchConnectionsResponse {
  CrossClusterSearchConnections?: InboundCrossClusterSearchConnection[];
  NextToken?: string;
}
export interface DescribeOutboundCrossClusterSearchConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type OutboundCrossClusterSearchConnections =
  OutboundCrossClusterSearchConnection[];
export interface DescribeOutboundCrossClusterSearchConnectionsResponse {
  CrossClusterSearchConnections?: OutboundCrossClusterSearchConnection[];
  NextToken?: string;
}
export type DescribePackagesFilterName =
  | "PackageID"
  | "PackageName"
  | "PackageStatus"
  | (string & {});
export type DescribePackagesFilterValue = string;
export type DescribePackagesFilterValues = string[];
export interface DescribePackagesFilter {
  Name?: DescribePackagesFilterName;
  Value?: string[];
}
export type DescribePackagesFilterList = DescribePackagesFilter[];
export interface DescribePackagesRequest {
  Filters?: DescribePackagesFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type PackageDetailsList = PackageDetails[];
export interface DescribePackagesResponse {
  PackageDetailsList?: PackageDetails[];
  NextToken?: string;
}
export interface DescribeReservedElasticsearchInstanceOfferingsRequest {
  ReservedElasticsearchInstanceOfferingId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ReservedElasticsearchInstancePaymentOption =
  | "ALL_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "NO_UPFRONT"
  | (string & {});
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export interface ReservedElasticsearchInstanceOffering {
  ReservedElasticsearchInstanceOfferingId?: string;
  ElasticsearchInstanceType?: ESPartitionInstanceType;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  PaymentOption?: ReservedElasticsearchInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedElasticsearchInstanceOfferingList =
  ReservedElasticsearchInstanceOffering[];
export interface DescribeReservedElasticsearchInstanceOfferingsResponse {
  NextToken?: string;
  ReservedElasticsearchInstanceOfferings?: ReservedElasticsearchInstanceOffering[];
}
export interface DescribeReservedElasticsearchInstancesRequest {
  ReservedElasticsearchInstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ReservationToken = string;
export interface ReservedElasticsearchInstance {
  ReservationName?: string;
  ReservedElasticsearchInstanceId?: string;
  ReservedElasticsearchInstanceOfferingId?: string;
  ElasticsearchInstanceType?: ESPartitionInstanceType;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  ElasticsearchInstanceCount?: number;
  State?: string;
  PaymentOption?: ReservedElasticsearchInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedElasticsearchInstanceList = ReservedElasticsearchInstance[];
export interface DescribeReservedElasticsearchInstancesResponse {
  NextToken?: string;
  ReservedElasticsearchInstances?: ReservedElasticsearchInstance[];
}
export type VpcEndpointIdList = string[];
export interface DescribeVpcEndpointsRequest {
  VpcEndpointIds: string[];
}
export type VpcEndpoints = VpcEndpoint[];
export type VpcEndpointErrorCode =
  | "ENDPOINT_NOT_FOUND"
  | "SERVER_ERROR"
  | (string & {});
export interface VpcEndpointError {
  VpcEndpointId?: string;
  ErrorCode?: VpcEndpointErrorCode;
  ErrorMessage?: string;
}
export type VpcEndpointErrorList = VpcEndpointError[];
export interface DescribeVpcEndpointsResponse {
  VpcEndpoints: VpcEndpoint[];
  VpcEndpointErrors: VpcEndpointError[];
}
export interface DissociatePackageRequest {
  PackageID: string;
  DomainName: string;
}
export interface DissociatePackageResponse {
  DomainPackageDetails?: DomainPackageDetails;
}
export interface GetCompatibleElasticsearchVersionsRequest {
  DomainName?: string;
}
export type ElasticsearchVersionList = string[];
export interface CompatibleVersionsMap {
  SourceVersion?: string;
  TargetVersions?: string[];
}
export type CompatibleElasticsearchVersionsList = CompatibleVersionsMap[];
export interface GetCompatibleElasticsearchVersionsResponse {
  CompatibleElasticsearchVersions?: CompatibleVersionsMap[];
}
export interface GetPackageVersionHistoryRequest {
  PackageID: string;
  MaxResults?: number;
  NextToken?: string;
}
export type CommitMessage = string;
export interface PackageVersionHistory {
  PackageVersion?: string;
  CommitMessage?: string;
  CreatedAt?: Date;
}
export type PackageVersionHistoryList = PackageVersionHistory[];
export interface GetPackageVersionHistoryResponse {
  PackageID?: string;
  PackageVersionHistoryList?: PackageVersionHistory[];
  NextToken?: string;
}
export interface GetUpgradeHistoryRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type UpgradeName = string;
export type StartTimestamp = Date;
export type UpgradeStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "SUCCEEDED_WITH_ISSUES"
  | "FAILED"
  | (string & {});
export type UpgradeStep =
  | "PRE_UPGRADE_CHECK"
  | "SNAPSHOT"
  | "UPGRADE"
  | (string & {});
export type Issue = string;
export type Issues = string[];
export interface UpgradeStepItem {
  UpgradeStep?: UpgradeStep;
  UpgradeStepStatus?: UpgradeStatus;
  Issues?: string[];
  ProgressPercent?: number;
}
export type UpgradeStepsList = UpgradeStepItem[];
export interface UpgradeHistory {
  UpgradeName?: string;
  StartTimestamp?: Date;
  UpgradeStatus?: UpgradeStatus;
  StepsList?: UpgradeStepItem[];
}
export type UpgradeHistoryList = UpgradeHistory[];
export interface GetUpgradeHistoryResponse {
  UpgradeHistories?: UpgradeHistory[];
  NextToken?: string;
}
export interface GetUpgradeStatusRequest {
  DomainName: string;
}
export interface GetUpgradeStatusResponse {
  UpgradeStep?: UpgradeStep;
  StepStatus?: UpgradeStatus;
  UpgradeName?: string;
}
export type EngineType = "OpenSearch" | "Elasticsearch" | (string & {});
export interface ListDomainNamesRequest {
  EngineType?: EngineType;
}
export interface DomainInfo {
  DomainName?: string;
  EngineType?: EngineType;
}
export type DomainInfoList = DomainInfo[];
export interface ListDomainNamesResponse {
  DomainNames?: DomainInfo[];
}
export interface ListDomainsForPackageRequest {
  PackageID: string;
  MaxResults?: number;
  NextToken?: string;
}
export type DomainPackageDetailsList = DomainPackageDetails[];
export interface ListDomainsForPackageResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
  NextToken?: string;
}
export interface ListElasticsearchInstanceTypesRequest {
  ElasticsearchVersion: string;
  DomainName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ElasticsearchInstanceTypeList = ESPartitionInstanceType[];
export interface ListElasticsearchInstanceTypesResponse {
  ElasticsearchInstanceTypes?: ESPartitionInstanceType[];
  NextToken?: string;
}
export interface ListElasticsearchVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListElasticsearchVersionsResponse {
  ElasticsearchVersions?: string[];
  NextToken?: string;
}
export interface ListPackagesForDomainRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPackagesForDomainResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
  NextToken?: string;
}
export interface ListTagsRequest {
  ARN: string;
}
export interface ListTagsResponse {
  TagList?: Tag[];
}
export interface ListVpcEndpointAccessRequest {
  DomainName: string;
  NextToken?: string;
}
export type AuthorizedPrincipalList = AuthorizedPrincipal[];
export interface ListVpcEndpointAccessResponse {
  AuthorizedPrincipalList: AuthorizedPrincipal[];
  NextToken: string;
}
export interface ListVpcEndpointsRequest {
  NextToken?: string;
}
export type VpcEndpointSummaryList = VpcEndpointSummary[];
export interface ListVpcEndpointsResponse {
  VpcEndpointSummaryList: VpcEndpointSummary[];
  NextToken: string;
}
export interface ListVpcEndpointsForDomainRequest {
  DomainName: string;
  NextToken?: string;
}
export interface ListVpcEndpointsForDomainResponse {
  VpcEndpointSummaryList: VpcEndpointSummary[];
  NextToken: string;
}
export type InstanceCount = number;
export interface PurchaseReservedElasticsearchInstanceOfferingRequest {
  ReservedElasticsearchInstanceOfferingId: string;
  ReservationName: string;
  InstanceCount?: number;
}
export interface PurchaseReservedElasticsearchInstanceOfferingResponse {
  ReservedElasticsearchInstanceId?: string;
  ReservationName?: string;
}
export interface RejectInboundCrossClusterSearchConnectionRequest {
  CrossClusterSearchConnectionId: string;
}
export interface RejectInboundCrossClusterSearchConnectionResponse {
  CrossClusterSearchConnection?: InboundCrossClusterSearchConnection;
}
export interface RemoveTagsRequest {
  ARN: string;
  TagKeys: string[];
}
export interface RemoveTagsResponse {}
export interface RevokeVpcEndpointAccessRequest {
  DomainName: string;
  Account: string;
}
export interface RevokeVpcEndpointAccessResponse {}
export interface StartElasticsearchServiceSoftwareUpdateRequest {
  DomainName: string;
}
export interface StartElasticsearchServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export interface UpdateElasticsearchDomainConfigRequest {
  DomainName: string;
  ElasticsearchClusterConfig?: ElasticsearchClusterConfig;
  EBSOptions?: EBSOptions;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  AccessPolicies?: string;
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  AutoTuneOptions?: AutoTuneOptions;
  DryRun?: boolean;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
  UseCase?: DomainUseCase;
  EngineMode?: DomainEngineMode;
}
export type DeploymentType = string;
export interface DryRunResults {
  DeploymentType?: string;
  Message?: string;
}
export interface UpdateElasticsearchDomainConfigResponse {
  DomainConfig: ElasticsearchDomainConfig;
  DryRunResults?: DryRunResults;
}
export interface UpdatePackageRequest {
  PackageID: string;
  PackageSource: PackageSource;
  PackageDescription?: string;
  CommitMessage?: string;
}
export interface UpdatePackageResponse {
  PackageDetails?: PackageDetails;
}
export interface UpdateVpcEndpointRequest {
  VpcEndpointId: string;
  VpcOptions: VPCOptions;
}
export interface UpdateVpcEndpointResponse {
  VpcEndpoint: VpcEndpoint;
}
export interface UpgradeElasticsearchDomainRequest {
  DomainName: string;
  TargetVersion: string;
  PerformCheckOnly?: boolean;
}
export interface UpgradeElasticsearchDomainResponse {
  DomainName?: string;
  TargetVersion?: string;
  PerformCheckOnly?: boolean;
  ChangeProgressDetails?: ChangeProgressDetails;
}
export type AcceptInboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination domain owner to accept an inbound cross-cluster search connection request.
 */
export const acceptInboundCrossClusterSearchConnection: API.OperationMethod<
  AcceptInboundCrossClusterSearchConnectionRequest,
  AcceptInboundCrossClusterSearchConnectionResponse,
  AcceptInboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}/accept",
    input: { CrossClusterSearchConnectionId: 0 },
  },
  errors: [
    DisabledOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInboundCrossClusterSearchConnection",
})) as any;

export type AddTagsError =
  | BaseException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Attaches tags to an existing Elasticsearch domain. Tags are a set of case-sensitive key value pairs. An Elasticsearch domain may have up to 10 tags. See
 * Tagging Amazon Elasticsearch Service Domains for more information.
 */
export const addTags: API.OperationMethod<
  AddTagsRequest,
  AddTagsResponse,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/tags",
    input: { ARN: 0, TagList: D.list(i_Tag) },
    body: true,
  },
  errors: [
    BaseException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
})) as any;

export type AssociatePackageError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates a package with an Amazon ES domain.
 */
export const associatePackage: API.OperationMethod<
  AssociatePackageRequest,
  AssociatePackageResponse,
  AssociatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/packages/associate/{PackageID}/{DomainName}",
    input: { PackageID: 0, DomainName: 0 },
    output: { DomainPackageDetails: o_DomainPackageDetails },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePackage",
})) as any;

export type AuthorizeVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides access to an Amazon OpenSearch Service domain through the use of an interface VPC endpoint.
 */
export const authorizeVpcEndpointAccess: API.OperationMethod<
  AuthorizeVpcEndpointAccessRequest,
  AuthorizeVpcEndpointAccessResponse,
  AuthorizeVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/domain/{DomainName}/authorizeVpcEndpointAccess",
    input: { DomainName: 0, Account: 0 },
    body: true,
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeVpcEndpointAccess",
})) as any;

export type CancelDomainConfigChangeError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a pending configuration change on an Amazon OpenSearch Service domain.
 */
export const cancelDomainConfigChange: API.OperationMethod<
  CancelDomainConfigChangeRequest,
  CancelDomainConfigChangeResponse,
  CancelDomainConfigChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/domain/{DomainName}/config/cancel",
    input: { DomainName: 0, DryRun: 0 },
    body: true,
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDomainConfigChange",
})) as any;

export type CancelElasticsearchServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a scheduled service software update for an Amazon ES domain. You can only perform this operation before the `AutomatedUpdateDate` and when the `UpdateStatus` is in the `PENDING_UPDATE` state.
 */
export const cancelElasticsearchServiceSoftwareUpdate: API.OperationMethod<
  CancelElasticsearchServiceSoftwareUpdateRequest,
  CancelElasticsearchServiceSoftwareUpdateResponse,
  CancelElasticsearchServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/serviceSoftwareUpdate/cancel",
    input: { DomainName: 0 },
    output: { ServiceSoftwareOptions: o_ServiceSoftwareOptions },
    body: true,
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelElasticsearchServiceSoftwareUpdate",
})) as any;

export type CreateElasticsearchDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Elasticsearch domain. For more information,
 * see Creating Elasticsearch Domains in the *Amazon Elasticsearch Service Developer Guide*.
 */
export const createElasticsearchDomain: API.OperationMethod<
  CreateElasticsearchDomainRequest,
  CreateElasticsearchDomainResponse,
  CreateElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/domain",
    input: {
      DomainName: 0,
      ElasticsearchVersion: 0,
      ElasticsearchClusterConfig: i_ElasticsearchClusterConfig,
      EBSOptions: i_EBSOptions,
      AccessPolicies: 0,
      SnapshotOptions: i_SnapshotOptions,
      VPCOptions: i_VPCOptions,
      CognitoOptions: i_CognitoOptions,
      EncryptionAtRestOptions: i_EncryptionAtRestOptions,
      NodeToNodeEncryptionOptions: i_NodeToNodeEncryptionOptions,
      AdvancedOptions: 0,
      LogPublishingOptions: D.map(i_LogPublishingOption),
      DomainEndpointOptions: i_DomainEndpointOptions,
      AdvancedSecurityOptions: i_AdvancedSecurityOptionsInput,
      AutoTuneOptions: {
        DesiredState: 0,
        MaintenanceSchedules: D.list(i_AutoTuneMaintenanceSchedule),
      },
      TagList: D.list(i_Tag),
      DeploymentStrategyOptions: i_DeploymentStrategyOptions,
      AutomatedSnapshotPauseOptions: i_AutomatedSnapshotPauseRequestOptions,
      UseCase: 0,
      EngineMode: 0,
    },
    output: { DomainStatus: o_ElasticsearchDomainStatus },
    body: true,
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateElasticsearchDomain",
})) as any;

export type CreateOutboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a new cross-cluster search connection from a source domain to a destination domain.
 */
export const createOutboundCrossClusterSearchConnection: API.OperationMethod<
  CreateOutboundCrossClusterSearchConnectionRequest,
  CreateOutboundCrossClusterSearchConnectionResponse,
  CreateOutboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/ccs/outboundConnection",
    input: {
      SourceDomainInfo: i_DomainInformation,
      DestinationDomainInfo: i_DomainInformation,
      ConnectionAlias: 0,
    },
    body: true,
  },
  errors: [
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutboundCrossClusterSearchConnection",
})) as any;

export type CreatePackageError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Create a package for use with Amazon ES domains.
 */
export const createPackage: API.OperationMethod<
  CreatePackageRequest,
  CreatePackageResponse,
  CreatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/packages",
    input: {
      PackageName: 0,
      PackageType: 0,
      PackageDescription: 0,
      PackageSource: i_PackageSource,
    },
    output: { PackageDetails: o_PackageDetails },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackage",
})) as any;

export type CreateVpcEndpointError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon OpenSearch Service-managed VPC endpoint.
 */
export const createVpcEndpoint: API.OperationMethod<
  CreateVpcEndpointRequest,
  CreateVpcEndpointResponse,
  CreateVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/vpcEndpoints",
    input: { DomainArn: 0, VpcOptions: i_VPCOptions, ClientToken: 0 },
    body: true,
  },
  errors: [
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcEndpoint",
})) as any;

export type DeleteElasticsearchDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes the specified Elasticsearch domain and all of its data. Once a domain is deleted, it cannot be recovered.
 */
export const deleteElasticsearchDomain: API.OperationMethod<
  DeleteElasticsearchDomainRequest,
  DeleteElasticsearchDomainResponse,
  DeleteElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-01-01/es/domain/{DomainName}",
    input: { DomainName: 0 },
    output: { DomainStatus: o_ElasticsearchDomainStatus },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteElasticsearchDomain",
})) as any;

export type DeleteElasticsearchServiceRoleError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the service-linked role that Elasticsearch Service uses to manage and maintain VPC domains. Role deletion will fail if any existing VPC domains use the role. You must delete any such Elasticsearch domains before deleting the role. See Deleting Elasticsearch Service Role in *VPC Endpoints for Amazon Elasticsearch Service Domains*.
 */
export const deleteElasticsearchServiceRole: API.OperationMethod<
  DeleteElasticsearchServiceRoleRequest,
  DeleteElasticsearchServiceRoleResponse,
  DeleteElasticsearchServiceRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /2015-01-01/es/role" },
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteElasticsearchServiceRole",
})) as any;

export type DeleteInboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination domain owner to delete an existing inbound cross-cluster search connection.
 */
export const deleteInboundCrossClusterSearchConnection: API.OperationMethod<
  DeleteInboundCrossClusterSearchConnectionRequest,
  DeleteInboundCrossClusterSearchConnectionResponse,
  DeleteInboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}",
    input: { CrossClusterSearchConnectionId: 0 },
  },
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInboundCrossClusterSearchConnection",
})) as any;

export type DeleteOutboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the source domain owner to delete an existing outbound cross-cluster search connection.
 */
export const deleteOutboundCrossClusterSearchConnection: API.OperationMethod<
  DeleteOutboundCrossClusterSearchConnectionRequest,
  DeleteOutboundCrossClusterSearchConnectionResponse,
  DeleteOutboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-01-01/es/ccs/outboundConnection/{CrossClusterSearchConnectionId}",
    input: { CrossClusterSearchConnectionId: 0 },
  },
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutboundCrossClusterSearchConnection",
})) as any;

export type DeletePackageError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete the package.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResponse,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-01-01/packages/{PackageID}",
    input: { PackageID: 0 },
    output: { PackageDetails: o_PackageDetails },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackage",
})) as any;

export type DeleteVpcEndpointError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Amazon OpenSearch Service-managed interface VPC endpoint.
 */
export const deleteVpcEndpoint: API.OperationMethod<
  DeleteVpcEndpointRequest,
  DeleteVpcEndpointResponse,
  DeleteVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2015-01-01/es/vpcEndpoints/{VpcEndpointId}",
    input: { VpcEndpointId: 0 },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcEndpoint",
})) as any;

export type DescribeDomainAutoTunesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides scheduled Auto-Tune action details for the Elasticsearch domain, such as Auto-Tune action type, description, severity, and scheduled date.
 */
export const describeDomainAutoTunes: API.PaginatedOperationMethod<
  DescribeDomainAutoTunesRequest,
  DescribeDomainAutoTunesResponse,
  DescribeDomainAutoTunesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/domain/{DomainName}/autoTunes",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      AutoTunes: D.list({
        AutoTuneDetails: { ScheduledAutoTuneDetails: { Date: D.ts } },
      }),
    },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainAutoTunes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeDomainChangeProgressError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the current blue/green deployment happening on a domain, including
 * a change ID, status, and progress stages.
 */
export const describeDomainChangeProgress: API.OperationMethod<
  DescribeDomainChangeProgressRequest,
  DescribeDomainChangeProgressResponse,
  DescribeDomainChangeProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/domain/{DomainName}/progress",
    input: { DomainName: 0, ChangeId: D.m({ query: "changeid" }) },
    output: {
      ChangeProgressStatus: {
        StartTime: D.ts,
        ChangeProgressStages: D.list({ LastUpdated: D.ts }),
        LastUpdatedTime: D.ts,
      },
    },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainChangeProgress",
})) as any;

export type DescribeElasticsearchDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns domain configuration information about the specified Elasticsearch domain, including the domain ID, domain endpoint, and domain ARN.
 */
export const describeElasticsearchDomain: API.OperationMethod<
  DescribeElasticsearchDomainRequest,
  DescribeElasticsearchDomainResponse,
  DescribeElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/domain/{DomainName}",
    input: { DomainName: 0 },
    output: { DomainStatus: o_ElasticsearchDomainStatus },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomain",
})) as any;

export type DescribeElasticsearchDomainConfigError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Provides cluster configuration information about the specified Elasticsearch domain, such as the state, creation date, update version, and update date for cluster options.
 */
export const describeElasticsearchDomainConfig: API.OperationMethod<
  DescribeElasticsearchDomainConfigRequest,
  DescribeElasticsearchDomainConfigResponse,
  DescribeElasticsearchDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/domain/{DomainName}/config",
    input: { DomainName: 0 },
    output: { DomainConfig: o_ElasticsearchDomainConfig },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomainConfig",
})) as any;

export type DescribeElasticsearchDomainsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Returns domain configuration information about the specified Elasticsearch domains, including the domain ID, domain endpoint, and domain ARN.
 */
export const describeElasticsearchDomains: API.OperationMethod<
  DescribeElasticsearchDomainsRequest,
  DescribeElasticsearchDomainsResponse,
  DescribeElasticsearchDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/domain-info",
    input: { DomainNames: 0 },
    output: { DomainStatusList: D.list(o_ElasticsearchDomainStatus) },
    body: true,
  },
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomains",
})) as any;

export type DescribeElasticsearchInstanceTypeLimitsError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describe Elasticsearch Limits for a given InstanceType and ElasticsearchVersion.
 * When modifying existing Domain, specify the
 *
 * DomainName
 *
 * to know what Limits are supported for modifying.
 */
export const describeElasticsearchInstanceTypeLimits: API.OperationMethod<
  DescribeElasticsearchInstanceTypeLimitsRequest,
  DescribeElasticsearchInstanceTypeLimitsResponse,
  DescribeElasticsearchInstanceTypeLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/instanceTypeLimits/{ElasticsearchVersion}/{InstanceType}",
    input: {
      DomainName: D.m({ query: "domainName" }),
      InstanceType: 0,
      ElasticsearchVersion: 0,
    },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchInstanceTypeLimits",
})) as any;

export type DescribeInboundCrossClusterSearchConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the inbound cross-cluster search connections for a destination domain.
 */
export const describeInboundCrossClusterSearchConnections: API.PaginatedOperationMethod<
  DescribeInboundCrossClusterSearchConnectionsRequest,
  DescribeInboundCrossClusterSearchConnectionsResponse,
  DescribeInboundCrossClusterSearchConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/ccs/inboundConnection/search",
    input: { Filters: D.list(i_Filter), MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundCrossClusterSearchConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOutboundCrossClusterSearchConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the outbound cross-cluster search connections for a source domain.
 */
export const describeOutboundCrossClusterSearchConnections: API.PaginatedOperationMethod<
  DescribeOutboundCrossClusterSearchConnectionsRequest,
  DescribeOutboundCrossClusterSearchConnectionsResponse,
  DescribeOutboundCrossClusterSearchConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/ccs/outboundConnection/search",
    input: { Filters: D.list(i_Filter), MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOutboundCrossClusterSearchConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePackagesError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes all packages available to Amazon ES. Includes options for filtering, limiting the number of results, and pagination.
 */
export const describePackages: API.PaginatedOperationMethod<
  DescribePackagesRequest,
  DescribePackagesResponse,
  DescribePackagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/packages/describe",
    input: {
      Filters: D.list({ Name: 0, Value: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { PackageDetailsList: D.list(o_PackageDetails) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedElasticsearchInstanceOfferingsError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists available reserved Elasticsearch instance offerings.
 */
export const describeReservedElasticsearchInstanceOfferings: API.PaginatedOperationMethod<
  DescribeReservedElasticsearchInstanceOfferingsRequest,
  DescribeReservedElasticsearchInstanceOfferingsResponse,
  DescribeReservedElasticsearchInstanceOfferingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/reservedInstanceOfferings",
    input: {
      ReservedElasticsearchInstanceOfferingId: D.m({ query: "offeringId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedElasticsearchInstanceOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedElasticsearchInstancesError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about reserved Elasticsearch instances for this account.
 */
export const describeReservedElasticsearchInstances: API.PaginatedOperationMethod<
  DescribeReservedElasticsearchInstancesRequest,
  DescribeReservedElasticsearchInstancesResponse,
  DescribeReservedElasticsearchInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/reservedInstances",
    input: {
      ReservedElasticsearchInstanceId: D.m({ query: "reservationId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { ReservedElasticsearchInstances: D.list({ StartTime: D.ts }) },
  },
  errors: [
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedElasticsearchInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeVpcEndpointsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Describes one or more Amazon OpenSearch Service-managed VPC endpoints.
 */
export const describeVpcEndpoints: API.OperationMethod<
  DescribeVpcEndpointsRequest,
  DescribeVpcEndpointsResponse,
  DescribeVpcEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/vpcEndpoints/describe",
    input: { VpcEndpointIds: 0 },
    body: true,
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcEndpoints",
})) as any;

export type DissociatePackageError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Dissociates a package from the Amazon ES domain.
 */
export const dissociatePackage: API.OperationMethod<
  DissociatePackageRequest,
  DissociatePackageResponse,
  DissociatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/packages/dissociate/{PackageID}/{DomainName}",
    input: { PackageID: 0, DomainName: 0 },
    output: { DomainPackageDetails: o_DomainPackageDetails },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DissociatePackage",
})) as any;

export type GetCompatibleElasticsearchVersionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of upgrade compatible Elastisearch versions.
 * You can optionally pass a
 *
 * DomainName
 *
 * to get all upgrade compatible Elasticsearch versions for that specific domain.
 */
export const getCompatibleElasticsearchVersions: API.OperationMethod<
  GetCompatibleElasticsearchVersionsRequest,
  GetCompatibleElasticsearchVersionsResponse,
  GetCompatibleElasticsearchVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/compatibleVersions",
    input: { DomainName: D.m({ query: "domainName" }) },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCompatibleElasticsearchVersions",
})) as any;

export type GetPackageVersionHistoryError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of versions of the package, along with their creation time and commit message.
 */
export const getPackageVersionHistory: API.PaginatedOperationMethod<
  GetPackageVersionHistoryRequest,
  GetPackageVersionHistoryResponse,
  GetPackageVersionHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/packages/{PackageID}/history",
    input: {
      PackageID: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { PackageVersionHistoryList: D.list({ CreatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageVersionHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUpgradeHistoryError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the complete history of the last 10 upgrades that were performed on the domain.
 */
export const getUpgradeHistory: API.PaginatedOperationMethod<
  GetUpgradeHistoryRequest,
  GetUpgradeHistoryResponse,
  GetUpgradeHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/upgradeDomain/{DomainName}/history",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { UpgradeHistories: D.list({ StartTimestamp: D.ts }) },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpgradeHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUpgradeStatusError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the latest status of the last upgrade or upgrade eligibility check that was performed on the domain.
 */
export const getUpgradeStatus: API.OperationMethod<
  GetUpgradeStatusRequest,
  GetUpgradeStatusResponse,
  GetUpgradeStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/upgradeDomain/{DomainName}/status",
    input: { DomainName: 0 },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpgradeStatus",
})) as any;

export type ListDomainNamesError =
  | BaseException
  | ValidationException
  | CommonErrors;
/**
 * Returns the name of all Elasticsearch domains owned by the current user's account.
 */
export const listDomainNames: API.OperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/domain",
    input: { EngineType: D.m({ query: "engineType" }) },
  },
  errors: [BaseException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainNames",
})) as any;

export type ListDomainsForPackageError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Amazon ES domains associated with the package.
 */
export const listDomainsForPackage: API.PaginatedOperationMethod<
  ListDomainsForPackageRequest,
  ListDomainsForPackageResponse,
  ListDomainsForPackageError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/packages/{PackageID}/domains",
    input: {
      PackageID: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { DomainPackageDetailsList: D.list(o_DomainPackageDetails) },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainsForPackage",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListElasticsearchInstanceTypesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List all Elasticsearch instance types that are supported for given ElasticsearchVersion
 */
export const listElasticsearchInstanceTypes: API.PaginatedOperationMethod<
  ListElasticsearchInstanceTypesRequest,
  ListElasticsearchInstanceTypesResponse,
  ListElasticsearchInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/instanceTypes/{ElasticsearchVersion}",
    input: {
      ElasticsearchVersion: 0,
      DomainName: D.m({ query: "domainName" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListElasticsearchInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListElasticsearchVersionsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List all supported Elasticsearch versions
 */
export const listElasticsearchVersions: API.PaginatedOperationMethod<
  ListElasticsearchVersionsRequest,
  ListElasticsearchVersionsResponse,
  ListElasticsearchVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/versions",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListElasticsearchVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackagesForDomainError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all packages associated with the Amazon ES domain.
 */
export const listPackagesForDomain: API.PaginatedOperationMethod<
  ListPackagesForDomainRequest,
  ListPackagesForDomainResponse,
  ListPackagesForDomainError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/domain/{DomainName}/packages",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { DomainPackageDetailsList: D.list(o_DomainPackageDetails) },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackagesForDomain",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns all tags for the given Elasticsearch domain.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/tags",
    input: { ARN: D.m({ query: "arn" }) },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
})) as any;

export type ListVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about each principal that is allowed to access a
 * given Amazon OpenSearch Service domain through the use of an interface VPC endpoint.
 */
export const listVpcEndpointAccess: API.OperationMethod<
  ListVpcEndpointAccessRequest,
  ListVpcEndpointAccessResponse,
  ListVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/domain/{DomainName}/listVpcEndpointAccess",
    input: { DomainName: 0, NextToken: D.m({ query: "nextToken" }) },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointAccess",
})) as any;

export type ListVpcEndpointsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | CommonErrors;
/**
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints in the current account and Region.
 */
export const listVpcEndpoints: API.OperationMethod<
  ListVpcEndpointsRequest,
  ListVpcEndpointsResponse,
  ListVpcEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/vpcEndpoints",
    input: { NextToken: D.m({ query: "nextToken" }) },
  },
  errors: [BaseException, DisabledOperationException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpoints",
})) as any;

export type ListVpcEndpointsForDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints associated with a particular domain.
 */
export const listVpcEndpointsForDomain: API.OperationMethod<
  ListVpcEndpointsForDomainRequest,
  ListVpcEndpointsForDomainResponse,
  ListVpcEndpointsForDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2015-01-01/es/domain/{DomainName}/vpcEndpoints",
    input: { DomainName: 0, NextToken: D.m({ query: "nextToken" }) },
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointsForDomain",
})) as any;

export type PurchaseReservedElasticsearchInstanceOfferingError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to purchase reserved Elasticsearch instances.
 */
export const purchaseReservedElasticsearchInstanceOffering: API.OperationMethod<
  PurchaseReservedElasticsearchInstanceOfferingRequest,
  PurchaseReservedElasticsearchInstanceOfferingResponse,
  PurchaseReservedElasticsearchInstanceOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/purchaseReservedInstanceOffering",
    input: {
      ReservedElasticsearchInstanceOfferingId: 0,
      ReservationName: 0,
      InstanceCount: 0,
    },
    body: true,
  },
  errors: [
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedElasticsearchInstanceOffering",
})) as any;

export type RejectInboundCrossClusterSearchConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination domain owner to reject an inbound cross-cluster search connection request.
 */
export const rejectInboundCrossClusterSearchConnection: API.OperationMethod<
  RejectInboundCrossClusterSearchConnectionRequest,
  RejectInboundCrossClusterSearchConnectionResponse,
  RejectInboundCrossClusterSearchConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}/reject",
    input: { CrossClusterSearchConnectionId: 0 },
  },
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInboundCrossClusterSearchConnection",
})) as any;

export type RemoveTagsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified set of tags from the specified Elasticsearch domain.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsRequest,
  RemoveTagsResponse,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/tags-removal",
    input: { ARN: 0, TagKeys: 0 },
    body: true,
  },
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
})) as any;

export type RevokeVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Revokes access to an Amazon OpenSearch Service domain that was provided through an interface
 * VPC endpoint.
 */
export const revokeVpcEndpointAccess: API.OperationMethod<
  RevokeVpcEndpointAccessRequest,
  RevokeVpcEndpointAccessResponse,
  RevokeVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/domain/{DomainName}/revokeVpcEndpointAccess",
    input: { DomainName: 0, Account: 0 },
    body: true,
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeVpcEndpointAccess",
})) as any;

export type StartElasticsearchServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Schedules a service software update for an Amazon ES domain.
 */
export const startElasticsearchServiceSoftwareUpdate: API.OperationMethod<
  StartElasticsearchServiceSoftwareUpdateRequest,
  StartElasticsearchServiceSoftwareUpdateResponse,
  StartElasticsearchServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/serviceSoftwareUpdate/start",
    input: { DomainName: 0 },
    output: { ServiceSoftwareOptions: o_ServiceSoftwareOptions },
    body: true,
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartElasticsearchServiceSoftwareUpdate",
})) as any;

export type UpdateElasticsearchDomainConfigError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the cluster configuration of the specified Elasticsearch domain, setting as setting the instance type and the number of instances.
 */
export const updateElasticsearchDomainConfig: API.OperationMethod<
  UpdateElasticsearchDomainConfigRequest,
  UpdateElasticsearchDomainConfigResponse,
  UpdateElasticsearchDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/domain/{DomainName}/config",
    input: {
      DomainName: 0,
      ElasticsearchClusterConfig: i_ElasticsearchClusterConfig,
      EBSOptions: i_EBSOptions,
      SnapshotOptions: i_SnapshotOptions,
      VPCOptions: i_VPCOptions,
      CognitoOptions: i_CognitoOptions,
      AdvancedOptions: 0,
      AccessPolicies: 0,
      LogPublishingOptions: D.map(i_LogPublishingOption),
      DomainEndpointOptions: i_DomainEndpointOptions,
      AdvancedSecurityOptions: i_AdvancedSecurityOptionsInput,
      NodeToNodeEncryptionOptions: i_NodeToNodeEncryptionOptions,
      EncryptionAtRestOptions: i_EncryptionAtRestOptions,
      AutoTuneOptions: {
        DesiredState: 0,
        RollbackOnDisable: 0,
        MaintenanceSchedules: D.list(i_AutoTuneMaintenanceSchedule),
      },
      DryRun: 0,
      DeploymentStrategyOptions: i_DeploymentStrategyOptions,
      AutomatedSnapshotPauseOptions: i_AutomatedSnapshotPauseRequestOptions,
      UseCase: 0,
      EngineMode: 0,
    },
    output: { DomainConfig: o_ElasticsearchDomainConfig },
    body: true,
  },
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateElasticsearchDomainConfig",
})) as any;

export type UpdatePackageError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a package for use with Amazon ES domains.
 */
export const updatePackage: API.OperationMethod<
  UpdatePackageRequest,
  UpdatePackageResponse,
  UpdatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/packages/update",
    input: {
      PackageID: 0,
      PackageSource: i_PackageSource,
      PackageDescription: 0,
      CommitMessage: 0,
    },
    output: { PackageDetails: o_PackageDetails },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BaseException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackage",
})) as any;

export type UpdateVpcEndpointError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an Amazon OpenSearch Service-managed interface VPC endpoint.
 */
export const updateVpcEndpoint: API.OperationMethod<
  UpdateVpcEndpointRequest,
  UpdateVpcEndpointResponse,
  UpdateVpcEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/vpcEndpoints/update",
    input: { VpcEndpointId: 0, VpcOptions: i_VPCOptions },
    body: true,
  },
  errors: [
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVpcEndpoint",
})) as any;

export type UpgradeElasticsearchDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to either upgrade your domain or perform an Upgrade eligibility check to a compatible Elasticsearch version.
 */
export const upgradeElasticsearchDomain: API.OperationMethod<
  UpgradeElasticsearchDomainRequest,
  UpgradeElasticsearchDomainResponse,
  UpgradeElasticsearchDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2015-01-01/es/upgradeDomain",
    input: { DomainName: 0, TargetVersion: 0, PerformCheckOnly: 0 },
    output: { ChangeProgressDetails: o_ChangeProgressDetails },
    body: true,
  },
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpgradeElasticsearchDomain",
})) as any;

const i_AdvancedSecurityOptionsInput: D.LazyStruct = () => ({
  Enabled: 0,
  InternalUserDatabaseEnabled: 0,
  MasterUserOptions: {
    MasterUserARN: 0,
    MasterUserName: 0,
    MasterUserPassword: 0,
  },
  SAMLOptions: {
    Enabled: 0,
    Idp: { MetadataContent: 0, EntityId: 0 },
    MasterUserName: 0,
    MasterBackendRole: 0,
    SubjectKey: 0,
    RolesKey: 0,
    SessionTimeoutMinutes: 0,
  },
  AnonymousAuthEnabled: 0,
});
const i_AutoTuneMaintenanceSchedule: D.LazyStruct = () => ({
  StartAt: 0,
  Duration: { Value: 0, Unit: 0 },
  CronExpressionForRecurrence: 0,
});
const i_AutomatedSnapshotPauseRequestOptions: D.LazyStruct = () => ({
  Enabled: 0,
  StartTime: 0,
  EndTime: 0,
});
const i_CognitoOptions: D.LazyStruct = () => ({
  Enabled: 0,
  UserPoolId: 0,
  IdentityPoolId: 0,
  RoleArn: 0,
});
const i_DeploymentStrategyOptions: D.LazyStruct = () => ({
  DeploymentStrategy: 0,
});
const i_DomainEndpointOptions: D.LazyStruct = () => ({
  EnforceHTTPS: 0,
  TLSSecurityPolicy: 0,
  CustomEndpointEnabled: 0,
  CustomEndpoint: 0,
  CustomEndpointCertificateArn: 0,
});
const i_DomainInformation: D.LazyStruct = () => ({
  OwnerId: 0,
  DomainName: 0,
  Region: 0,
});
const i_EBSOptions: D.LazyStruct = () => ({
  EBSEnabled: 0,
  VolumeType: 0,
  VolumeSize: 0,
  Iops: 0,
  Throughput: 0,
});
const i_ElasticsearchClusterConfig: D.LazyStruct = () => ({
  InstanceType: 0,
  InstanceCount: 0,
  DedicatedMasterEnabled: 0,
  ZoneAwarenessEnabled: 0,
  ZoneAwarenessConfig: { AvailabilityZoneCount: 0 },
  DedicatedMasterType: 0,
  DedicatedMasterCount: 0,
  WarmEnabled: 0,
  WarmType: 0,
  WarmCount: 0,
  ColdStorageOptions: { Enabled: 0 },
});
const i_EncryptionAtRestOptions: D.LazyStruct = () => ({
  Enabled: 0,
  KmsKeyId: 0,
});
const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_LogPublishingOption: D.LazyStruct = () => ({
  CloudWatchLogsLogGroupArn: 0,
  Enabled: 0,
});
const i_NodeToNodeEncryptionOptions: D.LazyStruct = () => ({ Enabled: 0 });
const i_PackageSource: D.LazyStruct = () => ({ S3BucketName: 0, S3Key: 0 });
const i_SnapshotOptions: D.LazyStruct = () => ({
  AutomatedSnapshotStartHour: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VPCOptions: D.LazyStruct = () => ({
  SubnetIds: 0,
  SecurityGroupIds: 0,
});
const o_ChangeProgressDetails: D.LazyStruct = () => ({
  StartTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_DomainPackageDetails: D.LazyStruct = () => ({ LastUpdated: D.ts });
const o_ElasticsearchDomainConfig: D.LazyStruct = () => ({
  ElasticsearchVersion: { Status: o_OptionStatus },
  ElasticsearchClusterConfig: { Status: o_OptionStatus },
  EBSOptions: { Status: o_OptionStatus },
  AccessPolicies: { Status: o_OptionStatus },
  SnapshotOptions: { Status: o_OptionStatus },
  VPCOptions: { Status: o_OptionStatus },
  CognitoOptions: { Status: o_OptionStatus },
  EncryptionAtRestOptions: { Status: o_OptionStatus },
  NodeToNodeEncryptionOptions: { Status: o_OptionStatus },
  AdvancedOptions: { Status: o_OptionStatus },
  LogPublishingOptions: { Status: o_OptionStatus },
  DomainEndpointOptions: { Status: o_OptionStatus },
  AdvancedSecurityOptions: {
    Options: o_AdvancedSecurityOptions,
    Status: o_OptionStatus,
  },
  AutoTuneOptions: {
    Options: { MaintenanceSchedules: D.list({ StartAt: D.ts }) },
    Status: { CreationDate: D.ts, UpdateDate: D.ts },
  },
  ChangeProgressDetails: o_ChangeProgressDetails,
  DeploymentStrategyOptions: { Status: o_OptionStatus },
  AutomatedSnapshotPauseOptions: {
    Options: o_AutomatedSnapshotPauseOptions,
    Status: o_OptionStatus,
  },
  UseCase: { Status: o_OptionStatus },
  EngineMode: { Status: o_OptionStatus },
});
const o_ElasticsearchDomainStatus: D.LazyStruct = () => ({
  ServiceSoftwareOptions: o_ServiceSoftwareOptions,
  AdvancedSecurityOptions: o_AdvancedSecurityOptions,
  ChangeProgressDetails: o_ChangeProgressDetails,
  AutomatedSnapshotPauseOptions: o_AutomatedSnapshotPauseOptions,
});
const o_PackageDetails: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  LastUpdatedAt: D.ts,
});
const o_ServiceSoftwareOptions: D.LazyStruct = () => ({
  AutomatedUpdateDate: D.ts,
});
const o_AdvancedSecurityOptions: D.LazyStruct = () => ({
  AnonymousAuthDisableDate: D.ts,
});
const o_AutomatedSnapshotPauseOptions: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_OptionStatus: D.LazyStruct = () => ({
  CreationDate: D.ts,
  UpdateDate: D.ts,
});
