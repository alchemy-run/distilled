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
const ns = /*@__PURE__*/ T.XmlNamespace("http://es.amazonaws.com/doc/2015-01-01/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Elasticsearch Service",
  serviceShapeName: "AmazonElasticsearchService2015",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "es" });
const ver = /*@__PURE__*/ T.ServiceVersion("2015-01-01");
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
              `https://es-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://es-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
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
            return e(`https://es.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://es.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://es.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BaseException
  extends /*@__PURE__*/ S.TaggedError<BaseException>()("BaseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DisabledOperationException
  extends /*@__PURE__*/ S.TaggedError<DisabledOperationException>()(
    "DisabledOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTypeException>()(
    "InvalidTypeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DeploymentStrategy = "Default" | "CapacityOptimized" | (string & {});
export interface DeploymentStrategyOptions {
  DeploymentStrategy: DeploymentStrategy;
}
export type UpdateTimestamp = Date;
export interface AutomatedSnapshotPauseRequestOptions {
  Enabled: boolean;
  StartTime?: Date;
  EndTime?: Date;
}
export type DomainUseCase = "SEARCH" | "VECTOR" | "OBSERVABILITY" | "MIXED" | (string & {});
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
export type PropertyValueType = "PLAIN_TEXT" | "STRINGIFIED_JSON" | (string & {});
export interface ModifyingProperties {
  Name?: string;
  ActiveValue?: string;
  PendingValue?: string;
  ValueType?: PropertyValueType;
}
export type ModifyingPropertiesList = ModifyingProperties[];
export type PauseState = "Active" | "Completed" | "Scheduled" | "Disabled" | (string & {});
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
export type ScheduledAutoTuneSeverityType = "LOW" | "MEDIUM" | "HIGH" | (string & {});
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
export type OverallChangeStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | (string & {});
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
export type OptionState = "RequiresIndexDocuments" | "Processing" | "Active" | (string & {});
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
export type RollbackOnDisable = "NO_ROLLBACK" | "DEFAULT_ROLLBACK" | (string & {});
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
export type InboundCrossClusterSearchConnections = InboundCrossClusterSearchConnection[];
export interface DescribeInboundCrossClusterSearchConnectionsResponse {
  CrossClusterSearchConnections?: InboundCrossClusterSearchConnection[];
  NextToken?: string;
}
export interface DescribeOutboundCrossClusterSearchConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type OutboundCrossClusterSearchConnections = OutboundCrossClusterSearchConnection[];
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
export type ReservedElasticsearchInstanceOfferingList = ReservedElasticsearchInstanceOffering[];
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
export type VpcEndpointErrorCode = "ENDPOINT_NOT_FOUND" | "SERVER_ERROR" | (string & {});
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
export type UpgradeStep = "PRE_UPGRADE_CHECK" | "SNAPSHOT" | "UPGRADE" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AcceptInboundCrossClusterSearchConnectionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<AcceptInboundCrossClusterSearchConnectionResponse>,
  errors: [DisabledOperationException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInboundCrossClusterSearchConnection",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<AddTagsRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<AddTagsResponse>,
  errors: [BaseException, InternalException, LimitExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<AssociatePackageRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<AssociatePackageResponse>,
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
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<AuthorizeVpcEndpointAccessRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<AuthorizeVpcEndpointAccessResponse>,
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
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<CancelDomainConfigChangeRequest>,
  output: __S(419, __c13, 3) as any as S.Schema<CancelDomainConfigChangeResponse>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<CancelElasticsearchServiceSoftwareUpdateRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<CancelElasticsearchServiceSoftwareUpdateResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelElasticsearchServiceSoftwareUpdate",
}));

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
  input: __S(577, __c18, 1) as any as S.Schema<CreateElasticsearchDomainRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateElasticsearchDomainResponse>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<CreateOutboundCrossClusterSearchConnectionRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<CreateOutboundCrossClusterSearchConnectionResponse>,
  errors: [
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutboundCrossClusterSearchConnection",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<CreatePackageRequest>,
  output: __S(960, __c30, 0) as any as S.Schema<CreatePackageResponse>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<CreateVpcEndpointRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<CreateVpcEndpointResponse>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<DeleteElasticsearchDomainRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<DeleteElasticsearchDomainResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteElasticsearchDomain",
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<DeleteElasticsearchServiceRoleRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<DeleteElasticsearchServiceRoleResponse>,
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteElasticsearchServiceRole",
}));

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
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteInboundCrossClusterSearchConnectionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteInboundCrossClusterSearchConnectionResponse>,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInboundCrossClusterSearchConnection",
}));

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
  input: __S(1216, __c38, 0) as any as S.Schema<DeleteOutboundCrossClusterSearchConnectionRequest>,
  output: __S(
    1217,
    __c38,
    1,
  ) as any as S.Schema<DeleteOutboundCrossClusterSearchConnectionResponse>,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutboundCrossClusterSearchConnection",
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<DeletePackageRequest>,
  output: __S(960, __c30, 0) as any as S.Schema<DeletePackageResponse>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<DeleteVpcEndpointRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<DeleteVpcEndpointResponse>,
  errors: [BaseException, DisabledOperationException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcEndpoint",
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<DescribeDomainAutoTunesRequest>,
  output: __S(1381, __c43, 5) as any as S.Schema<DescribeDomainAutoTunesResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
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
  input: __S(1408, __c44, 0) as any as S.Schema<DescribeDomainChangeProgressRequest>,
  output: __S(1412, __c44, 4) as any as S.Schema<DescribeDomainChangeProgressResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainChangeProgress",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<DescribeElasticsearchDomainRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<DescribeElasticsearchDomainResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomain",
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<DescribeElasticsearchDomainConfigRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<DescribeElasticsearchDomainConfigResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomainConfig",
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<DescribeElasticsearchDomainsRequest>,
  output: __S(1538, __c48, 2) as any as S.Schema<DescribeElasticsearchDomainsResponse>,
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeElasticsearchDomains",
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<DescribeElasticsearchInstanceTypeLimitsRequest>,
  output: __S(1577, __c49, 9) as any as S.Schema<DescribeElasticsearchInstanceTypeLimitsResponse>,
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
}));

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
  input: __S(
    1600,
    __c50,
    0,
  ) as any as S.Schema<DescribeInboundCrossClusterSearchConnectionsRequest>,
  output: __S(
    1602,
    __c50,
    2,
  ) as any as S.Schema<DescribeInboundCrossClusterSearchConnectionsResponse>,
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
  input: __S(
    1664,
    __c52,
    0,
  ) as any as S.Schema<DescribeOutboundCrossClusterSearchConnectionsRequest>,
  output: __S(
    1666,
    __c52,
    2,
  ) as any as S.Schema<DescribeOutboundCrossClusterSearchConnectionsResponse>,
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
  input: __S(1698, __c53, 2) as any as S.Schema<DescribePackagesRequest>,
  output: __S(1700, __c53, 4) as any as S.Schema<DescribePackagesResponse>,
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
  input: __S(
    1728,
    __c54,
    0,
  ) as any as S.Schema<DescribeReservedElasticsearchInstanceOfferingsRequest>,
  output: __S(
    1731,
    __c54,
    3,
  ) as any as S.Schema<DescribeReservedElasticsearchInstanceOfferingsResponse>,
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
  input: __S(1792, __c56, 0) as any as S.Schema<DescribeReservedElasticsearchInstancesRequest>,
  output: __S(1795, __c56, 3) as any as S.Schema<DescribeReservedElasticsearchInstancesResponse>,
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
  input: __S(1824, __c57, 0) as any as S.Schema<DescribeVpcEndpointsRequest>,
  output: __S(1828, __c57, 4) as any as S.Schema<DescribeVpcEndpointsResponse>,
  errors: [BaseException, DisabledOperationException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcEndpoints",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<DissociatePackageRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DissociatePackageResponse>,
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
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<GetCompatibleElasticsearchVersionsRequest>,
  output: __S(1891, __c59, 3) as any as S.Schema<GetCompatibleElasticsearchVersionsResponse>,
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
}));

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
  input: __S(1920, __c60, 0) as any as S.Schema<GetPackageVersionHistoryRequest>,
  output: __S(1923, __c60, 3) as any as S.Schema<GetPackageVersionHistoryResponse>,
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
  input: __S(1952, __c61, 0) as any as S.Schema<GetUpgradeHistoryRequest>,
  output: __S(1957, __c61, 5) as any as S.Schema<GetUpgradeHistoryResponse>,
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
  input: __S(1984, __c62, 0) as any as S.Schema<GetUpgradeStatusRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<GetUpgradeStatusResponse>,
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
}));

export type ListDomainNamesError = BaseException | ValidationException | CommonErrors;
/**
 * Returns the name of all Elasticsearch domains owned by the current user's account.
 */
export const listDomainNames: API.OperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<ListDomainNamesRequest>,
  output: __S(2019, __c63, 3) as any as S.Schema<ListDomainNamesResponse>,
  errors: [BaseException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainNames",
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<ListDomainsForPackageRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<ListDomainsForPackageResponse>,
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
  input: __S(2112, __c66, 0) as any as S.Schema<ListElasticsearchInstanceTypesRequest>,
  output: __S(2114, __c66, 2) as any as S.Schema<ListElasticsearchInstanceTypesResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
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
  input: __S(2144, __c67, 0) as any as S.Schema<ListElasticsearchVersionsRequest>,
  output: __S(2145, __c67, 1) as any as S.Schema<ListElasticsearchVersionsResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
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
  input: __S(2176, __c68, 0) as any as S.Schema<ListPackagesForDomainRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<ListPackagesForDomainResponse>,
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
  input: __S(2208, __c69, 0) as any as S.Schema<ListTagsRequest>,
  output: __S(2209, __c69, 1) as any as S.Schema<ListTagsResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<ListVpcEndpointAccessRequest>,
  output: __S(2242, __c70, 2) as any as S.Schema<ListVpcEndpointAccessResponse>,
  errors: [BaseException, DisabledOperationException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointAccess",
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<ListVpcEndpointsRequest>,
  output: __S(2305, __c72, 1) as any as S.Schema<ListVpcEndpointsResponse>,
  errors: [BaseException, DisabledOperationException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpoints",
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<ListVpcEndpointsForDomainRequest>,
  output: __S(2305, __c72, 1) as any as S.Schema<ListVpcEndpointsForDomainResponse>,
  errors: [BaseException, DisabledOperationException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointsForDomain",
}));

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
  input: __S(
    2368,
    __c74,
    0,
  ) as any as S.Schema<PurchaseReservedElasticsearchInstanceOfferingRequest>,
  output: __S(
    2369,
    __c74,
    1,
  ) as any as S.Schema<PurchaseReservedElasticsearchInstanceOfferingResponse>,
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
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<RejectInboundCrossClusterSearchConnectionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<RejectInboundCrossClusterSearchConnectionResponse>,
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInboundCrossClusterSearchConnection",
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<RemoveTagsRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<RemoveTagsResponse>,
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
}));

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
  input: __S(2464, __c77, 0) as any as S.Schema<RevokeVpcEndpointAccessRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<RevokeVpcEndpointAccessResponse>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<StartElasticsearchServiceSoftwareUpdateRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<StartElasticsearchServiceSoftwareUpdateResponse>,
  errors: [BaseException, InternalException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartElasticsearchServiceSoftwareUpdate",
}));

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
  input: __S(2528, __c79, 0) as any as S.Schema<UpdateElasticsearchDomainConfigRequest>,
  output: __S(2530, __c79, 2) as any as S.Schema<UpdateElasticsearchDomainConfigResponse>,
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
}));

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
  input: __S(2560, __c80, 0) as any as S.Schema<UpdatePackageRequest>,
  output: __S(960, __c30, 0) as any as S.Schema<UpdatePackageResponse>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<UpdateVpcEndpointRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<UpdateVpcEndpointResponse>,
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
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<UpgradeElasticsearchDomainRequest>,
  output: __S(2625, __c82, 1) as any as S.Schema<UpgradeElasticsearchDomainResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CrossClusterSearchConnectionId: S.String.pipe(
            T.HttpLabel("CrossClusterSearchConnectionId"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}/accept",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptInboundCrossClusterSearchConnectionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OwnerId: S.optional(S.String),
          DomainName: S.String,
          Region: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainInformation" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StatusCode: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "InboundCrossClusterSearchConnectionStatus" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDomainInfo: S.optional(__S(32, __c1, 0)),
          DestinationDomainInfo: S.optional(__S(32, __c1, 0)),
          CrossClusterSearchConnectionId: S.optional(S.String),
          ConnectionStatus: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "InboundCrossClusterSearchConnection" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CrossClusterSearchConnection: S.optional(__S(64, __c2, 0)) }).pipe(ns),
      ).annotate({ identifier: "AcceptInboundCrossClusterSearchConnectionResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ARN: S.String, TagList: __S(161, __c5, 1) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/tags" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddTagsRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "AddTagsResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.String.pipe(T.HttpLabel("PackageID")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2015-01-01/packages/associate/{PackageID}/{DomainName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociatePackageRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorType: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetails" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainPackageDetails: S.optional(__S(320, __c10, 0)) }).pipe(ns),
      ).annotate({ identifier: "AssociatePackageResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.optional(S.String),
          PackageName: S.optional(S.String),
          PackageType: S.optional(S.String),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DomainName: S.optional(S.String),
          DomainPackageStatus: S.optional(S.String),
          PackageVersion: S.optional(S.String),
          ReferencePath: S.optional(S.String),
          ErrorDetails: S.optional(__S(256, __c8, 0)),
        }),
      ).annotate({ identifier: "DomainPackageDetails" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")), Account: S.String }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2015-01-01/es/domain/{DomainName}/authorizeVpcEndpointAccess",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AuthorizeVpcEndpointAccessRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AuthorizedPrincipal: __S(384, __c12, 0) }).pipe(ns),
      ).annotate({ identifier: "AuthorizeVpcEndpointAccessResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PrincipalType: S.optional(S.String), Principal: S.optional(S.String) }),
      ).annotate({ identifier: "AuthorizedPrincipal" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          DryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/domain/{DomainName}/config/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelDomainConfigChangeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PropertyName: S.optional(S.String),
          CancelledValue: S.optional(S.String),
          ActiveValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "CancelledChangeProperty" });
    case 2:
      return S.Array(__S(417, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DryRun: S.optional(S.Boolean),
          CancelledChangeIds: S.optional(__S(448, __c14, 0)),
          CancelledChangeProperties: S.optional(__S(418, __c13, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "CancelDomainConfigChangeResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/serviceSoftwareUpdate/cancel" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelElasticsearchServiceSoftwareUpdateRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CurrentVersion: S.optional(S.String),
          NewVersion: S.optional(S.String),
          UpdateAvailable: S.optional(S.Boolean),
          Cancellable: S.optional(S.Boolean),
          UpdateStatus: S.optional(S.String),
          Description: S.optional(S.String),
          AutomatedUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OptionalDeployment: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ServiceSoftwareOptions" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ServiceSoftwareOptions: S.optional(__S(512, __c16, 0)) }).pipe(ns),
      ).annotate({ identifier: "CancelElasticsearchServiceSoftwareUpdateResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DesiredState: S.optional(S.String),
          MaintenanceSchedules: S.optional(__S(802, __c25, 2)),
        }),
      ).annotate({ identifier: "AutoTuneOptionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          ElasticsearchVersion: S.optional(S.String),
          ElasticsearchClusterConfig: S.optional(__S(706, __c22, 2)),
          EBSOptions: S.optional(__S(707, __c22, 3)),
          AccessPolicies: S.optional(S.String),
          SnapshotOptions: S.optional(__S(708, __c22, 4)),
          VPCOptions: S.optional(__S(640, __c20, 0)),
          CognitoOptions: S.optional(__S(709, __c22, 5)),
          EncryptionAtRestOptions: S.optional(__S(710, __c22, 6)),
          NodeToNodeEncryptionOptions: S.optional(__S(711, __c22, 7)),
          AdvancedOptions: S.optional(__S(712, __c22, 8)),
          LogPublishingOptions: S.optional(__S(714, __c22, 10)),
          DomainEndpointOptions: S.optional(__S(715, __c22, 11)),
          AdvancedSecurityOptions: S.optional(__S(834, __c26, 2)),
          AutoTuneOptions: S.optional(__S(576, __c18, 0)),
          TagList: S.optional(__S(161, __c5, 1)),
          DeploymentStrategyOptions: S.optional(__S(717, __c22, 13)),
          AutomatedSnapshotPauseOptions: S.optional(__S(835, __c26, 3)),
          UseCase: S.optional(S.String),
          EngineMode: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/domain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateElasticsearchDomainRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VPCId: S.optional(S.String),
          SubnetIds: S.optional(__S(448, __c14, 0)),
          AvailabilityZones: S.optional(__S(448, __c14, 0)),
          SecurityGroupIds: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "VPCDerivedInfo" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetIds: S.optional(__S(448, __c14, 0)),
          SecurityGroupIds: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "VPCOptions" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainStatus: S.optional(__S(769, __c24, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateElasticsearchDomainResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AvailabilityZoneCount: S.optional(S.Number) })).annotate({
        identifier: "ZoneAwarenessConfig",
      });
    case 1:
      return S.suspend(() => S.Struct({ Enabled: S.Boolean })).annotate({
        identifier: "ColdStorageOptions",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          InstanceType: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          DedicatedMasterEnabled: S.optional(S.Boolean),
          ZoneAwarenessEnabled: S.optional(S.Boolean),
          ZoneAwarenessConfig: S.optional(__S(704, __c22, 0)),
          DedicatedMasterType: S.optional(S.String),
          DedicatedMasterCount: S.optional(S.Number),
          WarmEnabled: S.optional(S.Boolean),
          WarmType: S.optional(S.String),
          WarmCount: S.optional(S.Number),
          ColdStorageOptions: S.optional(__S(705, __c22, 1)),
        }),
      ).annotate({ identifier: "ElasticsearchClusterConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EBSEnabled: S.optional(S.Boolean),
          VolumeType: S.optional(S.String),
          VolumeSize: S.optional(S.Number),
          Iops: S.optional(S.Number),
          Throughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EBSOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({ AutomatedSnapshotStartHour: S.optional(S.Number) }),
      ).annotate({ identifier: "SnapshotOptions" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          UserPoolId: S.optional(S.String),
          IdentityPoolId: S.optional(S.String),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CognitoOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), KmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionAtRestOptions" });
    case 7:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "NodeToNodeEncryptionOptions",
      });
    case 8:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 9:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogsLogGroupArn: S.optional(S.String),
          Enabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LogPublishingOption" });
    case 10:
      return S.Record(S.String, /*@__PURE__*/ __S(713, __c22, 9).pipe(S.optional));
    case 11:
      return S.suspend(() =>
        S.Struct({
          EnforceHTTPS: S.optional(S.Boolean),
          TLSSecurityPolicy: S.optional(S.String),
          CustomEndpointEnabled: S.optional(S.Boolean),
          CustomEndpoint: S.optional(S.String),
          CustomEndpointCertificateArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DomainEndpointOptions" });
    case 12:
      return S.suspend(() => S.Struct({ MetadataContent: S.String, EntityId: S.String })).annotate({
        identifier: "SAMLIdp",
      });
    case 13:
      return S.suspend(() => S.Struct({ DeploymentStrategy: S.String })).annotate({
        identifier: "DeploymentStrategyOptions",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          Idp: S.optional(__S(716, __c22, 12)),
          SubjectKey: S.optional(S.String),
          RolesKey: S.optional(S.String),
          SessionTimeoutMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SAMLOptionsOutput" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          InternalUserDatabaseEnabled: S.optional(S.Boolean),
          SAMLOptions: S.optional(__S(718, __c22, 14)),
          AnonymousAuthDisableDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AnonymousAuthEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AdvancedSecurityOptions" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ActiveValue: S.optional(S.String),
          PendingValue: S.optional(S.String),
          ValueType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModifyingProperties" });
    case 17:
      return S.Array(__S(720, __c22, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutomatedSnapshotPauseOptions" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ChangeId: S.optional(S.String),
          Message: S.optional(S.String),
          ConfigChangeStatus: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InitiatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChangeProgressDetails" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ State: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "AutoTuneOptionsOutput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainId: S.String,
          DomainName: S.String,
          ARN: S.String,
          Created: S.optional(S.Boolean),
          Deleted: S.optional(S.Boolean),
          Endpoint: S.optional(S.String),
          Endpoints: S.optional(__S(712, __c22, 8)),
          Processing: S.optional(S.Boolean),
          UpgradeProcessing: S.optional(S.Boolean),
          ElasticsearchVersion: S.optional(S.String),
          ElasticsearchClusterConfig: __S(706, __c22, 2),
          EBSOptions: S.optional(__S(707, __c22, 3)),
          AccessPolicies: S.optional(S.String),
          SnapshotOptions: S.optional(__S(708, __c22, 4)),
          VPCOptions: S.optional(__S(608, __c19, 0)),
          CognitoOptions: S.optional(__S(709, __c22, 5)),
          EncryptionAtRestOptions: S.optional(__S(710, __c22, 6)),
          NodeToNodeEncryptionOptions: S.optional(__S(711, __c22, 7)),
          AdvancedOptions: S.optional(__S(712, __c22, 8)),
          LogPublishingOptions: S.optional(__S(714, __c22, 10)),
          ServiceSoftwareOptions: S.optional(__S(512, __c16, 0)),
          DomainEndpointOptions: S.optional(__S(715, __c22, 11)),
          AdvancedSecurityOptions: S.optional(__S(719, __c22, 15)),
          AutoTuneOptions: S.optional(__S(768, __c24, 0)),
          ChangeProgressDetails: S.optional(__S(736, __c23, 0)),
          DomainProcessingStatus: S.optional(S.String),
          ModifyingProperties: S.optional(__S(721, __c22, 17)),
          DeploymentStrategyOptions: S.optional(__S(717, __c22, 13)),
          AutomatedSnapshotPauseOptions: S.optional(__S(722, __c22, 18)),
          UseCase: S.optional(S.String),
          EngineMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ElasticsearchDomainStatus" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.Number), Unit: S.optional(S.String) }),
      ).annotate({ identifier: "Duration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Duration: S.optional(__S(800, __c25, 0)),
          CronExpressionForRecurrence: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoTuneMaintenanceSchedule" });
    case 2:
      return S.Array(__S(801, __c25, 1));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MasterUserARN: S.optional(S.String),
          MasterUserName: S.optional(SensitiveString),
          MasterUserPassword: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "MasterUserOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          Idp: S.optional(__S(716, __c22, 12)),
          MasterUserName: S.optional(SensitiveString),
          MasterBackendRole: S.optional(S.String),
          SubjectKey: S.optional(S.String),
          RolesKey: S.optional(S.String),
          SessionTimeoutMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SAMLOptionsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          InternalUserDatabaseEnabled: S.optional(S.Boolean),
          MasterUserOptions: S.optional(__S(832, __c26, 0)),
          SAMLOptions: S.optional(__S(833, __c26, 1)),
          AnonymousAuthEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AdvancedSecurityOptionsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AutomatedSnapshotPauseRequestOptions" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDomainInfo: __S(32, __c1, 0),
          DestinationDomainInfo: __S(32, __c1, 0),
          ConnectionAlias: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/ccs/outboundConnection" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOutboundCrossClusterSearchConnectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceDomainInfo: S.optional(__S(32, __c1, 0)),
          DestinationDomainInfo: S.optional(__S(32, __c1, 0)),
          ConnectionAlias: S.optional(S.String),
          ConnectionStatus: S.optional(__S(33, __c1, 1)),
          CrossClusterSearchConnectionId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateOutboundCrossClusterSearchConnectionResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageName: S.String,
          PackageType: S.String,
          PackageDescription: S.optional(S.String),
          PackageSource: __S(992, __c31, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/packages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePackageRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.optional(S.String),
          PackageName: S.optional(S.String),
          PackageType: S.optional(S.String),
          PackageDescription: S.optional(S.String),
          PackageStatus: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AvailablePackageVersion: S.optional(S.String),
          ErrorDetails: S.optional(__S(256, __c8, 0)),
        }),
      ).annotate({ identifier: "PackageDetails" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PackageDetails: S.optional(__S(928, __c29, 0)) }).pipe(ns),
      ).annotate({ identifier: "CreatePackageResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ S3BucketName: S.optional(S.String), S3Key: S.optional(S.String) }),
      ).annotate({ identifier: "PackageSource" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainArn: S.String,
          VpcOptions: __S(640, __c20, 0),
          ClientToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/vpcEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVpcEndpointRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointId: S.optional(S.String),
          VpcEndpointOwner: S.optional(S.String),
          DomainArn: S.optional(S.String),
          VpcOptions: S.optional(__S(608, __c19, 0)),
          Status: S.optional(S.String),
          Endpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcEndpoint" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VpcEndpoint: __S(1056, __c33, 0) }).pipe(ns)).annotate({
        identifier: "CreateVpcEndpointResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2015-01-01/es/domain/{DomainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteElasticsearchDomainRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2015-01-01/es/role" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteElasticsearchServiceRoleRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CrossClusterSearchConnectionId: S.String.pipe(
            T.HttpLabel("CrossClusterSearchConnectionId"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInboundCrossClusterSearchConnectionRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CrossClusterSearchConnectionId: S.String.pipe(
            T.HttpLabel("CrossClusterSearchConnectionId"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/2015-01-01/es/ccs/outboundConnection/{CrossClusterSearchConnectionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOutboundCrossClusterSearchConnectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CrossClusterSearchConnection: S.optional(__S(1248, __c39, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteOutboundCrossClusterSearchConnectionResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceDomainInfo: S.optional(__S(32, __c1, 0)),
          DestinationDomainInfo: S.optional(__S(32, __c1, 0)),
          CrossClusterSearchConnectionId: S.optional(S.String),
          ConnectionAlias: S.optional(S.String),
          ConnectionStatus: S.optional(__S(33, __c1, 1)),
        }),
      ).annotate({ identifier: "OutboundCrossClusterSearchConnection" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PackageID: S.String.pipe(T.HttpLabel("PackageID")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2015-01-01/packages/{PackageID}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePackageRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcEndpointId: S.String.pipe(T.HttpLabel("VpcEndpointId")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/2015-01-01/es/vpcEndpoints/{VpcEndpointId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVpcEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VpcEndpointSummary: __S(1344, __c42, 0) }).pipe(ns),
      ).annotate({ identifier: "DeleteVpcEndpointResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointId: S.optional(S.String),
          VpcEndpointOwner: S.optional(S.String),
          DomainArn: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcEndpointSummary" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/domain/{DomainName}/autoTunes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDomainAutoTunesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActionType: S.optional(S.String),
          Action: S.optional(S.String),
          Severity: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledAutoTuneDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ScheduledAutoTuneDetails: S.optional(__S(1377, __c43, 1)) }),
      ).annotate({ identifier: "AutoTuneDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutoTuneType: S.optional(S.String),
          AutoTuneDetails: S.optional(__S(1378, __c43, 2)),
        }),
      ).annotate({ identifier: "AutoTune" });
    case 4:
      return S.Array(__S(1379, __c43, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AutoTunes: S.optional(__S(1380, __c43, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDomainAutoTunesResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ChangeId: S.optional(S.String).pipe(T.HttpQuery("changeid")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/domain/{DomainName}/progress" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDomainChangeProgressRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Description: S.optional(S.String),
          LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ChangeProgressStage" });
    case 2:
      return S.Array(__S(1409, __c44, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ChangeId: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          PendingProperties: S.optional(__S(448, __c14, 0)),
          CompletedProperties: S.optional(__S(448, __c14, 0)),
          TotalNumberOfStages: S.optional(S.Number),
          ChangeProgressStages: S.optional(__S(1410, __c44, 2)),
          ConfigChangeStatus: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          InitiatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "ChangeProgressStatusDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({ ChangeProgressStatus: S.optional(__S(1411, __c44, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDomainChangeProgressResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/domain/{DomainName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeElasticsearchDomainRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DomainStatus: __S(769, __c24, 1) }).pipe(ns)).annotate({
        identifier: "DescribeElasticsearchDomainResponse",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/domain/{DomainName}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeElasticsearchDomainConfigRequest" });
    case 1:
      return S.suspend(() => S.Struct({ DomainConfig: __S(1523, __c47, 19) }).pipe(ns)).annotate({
        identifier: "DescribeElasticsearchDomainConfigResponse",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdateVersion: S.optional(S.Number),
          State: S.String,
          PendingDeletion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "OptionStatus" });
    case 1:
      return S.suspend(() => S.Struct({ Options: S.String, Status: __S(1504, __c47, 0) })).annotate(
        { identifier: "ElasticsearchVersionStatus" },
      );
    case 2:
      return S.suspend(() =>
        S.Struct({ Options: __S(706, __c22, 2), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "ElasticsearchClusterConfigStatus" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Options: __S(707, __c22, 3), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "EBSOptionsStatus" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Options: __S(708, __c22, 4), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "SnapshotOptionsStatus" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Options: __S(608, __c19, 0), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "VPCDerivedInfoStatus" });
    case 6:
      return S.suspend(() =>
        S.Struct({ Options: __S(709, __c22, 5), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "CognitoOptionsStatus" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Options: __S(710, __c22, 6), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "EncryptionAtRestOptionsStatus" });
    case 8:
      return S.suspend(() =>
        S.Struct({ Options: __S(711, __c22, 7), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "NodeToNodeEncryptionOptionsStatus" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Options: __S(712, __c22, 8), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "AdvancedOptionsStatus" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          Options: S.optional(__S(714, __c22, 10)),
          Status: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "LogPublishingOptionsStatus" });
    case 11:
      return S.suspend(() =>
        S.Struct({ Options: __S(715, __c22, 11), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "DomainEndpointOptionsStatus" });
    case 12:
      return S.suspend(() =>
        S.Struct({ Options: __S(719, __c22, 15), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "AdvancedSecurityOptionsStatus" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          DesiredState: S.optional(S.String),
          RollbackOnDisable: S.optional(S.String),
          MaintenanceSchedules: S.optional(__S(802, __c25, 2)),
        }),
      ).annotate({ identifier: "AutoTuneOptions" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          CreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          UpdateVersion: S.optional(S.Number),
          State: S.String,
          ErrorMessage: S.optional(S.String),
          PendingDeletion: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AutoTuneStatus" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Options: S.optional(__S(1517, __c47, 13)),
          Status: S.optional(__S(1518, __c47, 14)),
        }),
      ).annotate({ identifier: "AutoTuneOptionsStatus" });
    case 16:
      return S.suspend(() =>
        S.Struct({ Options: __S(717, __c22, 13), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "DeploymentStrategyOptionsStatus" });
    case 17:
      return S.suspend(() =>
        S.Struct({ Options: __S(722, __c22, 18), Status: __S(1504, __c47, 0) }),
      ).annotate({ identifier: "AutomatedSnapshotPauseOptionsStatus" });
    case 18:
      return S.suspend(() => S.Struct({ Options: S.String, Status: __S(1504, __c47, 0) })).annotate(
        { identifier: "UseCaseStatus" },
      );
    case 19:
      return S.suspend(() =>
        S.Struct({
          ElasticsearchVersion: S.optional(__S(1505, __c47, 1)),
          ElasticsearchClusterConfig: S.optional(__S(1506, __c47, 2)),
          EBSOptions: S.optional(__S(1507, __c47, 3)),
          AccessPolicies: S.optional(__S(1505, __c47, 1)),
          SnapshotOptions: S.optional(__S(1508, __c47, 4)),
          VPCOptions: S.optional(__S(1509, __c47, 5)),
          CognitoOptions: S.optional(__S(1510, __c47, 6)),
          EncryptionAtRestOptions: S.optional(__S(1511, __c47, 7)),
          NodeToNodeEncryptionOptions: S.optional(__S(1512, __c47, 8)),
          AdvancedOptions: S.optional(__S(1513, __c47, 9)),
          LogPublishingOptions: S.optional(__S(1514, __c47, 10)),
          DomainEndpointOptions: S.optional(__S(1515, __c47, 11)),
          AdvancedSecurityOptions: S.optional(__S(1516, __c47, 12)),
          AutoTuneOptions: S.optional(__S(1519, __c47, 15)),
          ChangeProgressDetails: S.optional(__S(736, __c23, 0)),
          ModifyingProperties: S.optional(__S(721, __c22, 17)),
          DeploymentStrategyOptions: S.optional(__S(1520, __c47, 16)),
          AutomatedSnapshotPauseOptions: S.optional(__S(1521, __c47, 17)),
          UseCase: S.optional(__S(1522, __c47, 18)),
          EngineMode: S.optional(__S(1522, __c47, 18)),
        }),
      ).annotate({ identifier: "ElasticsearchDomainConfig" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainNames: __S(448, __c14, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/domain-info" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeElasticsearchDomainsRequest" });
    case 1:
      return S.Array(__S(769, __c24, 1));
    case 2:
      return S.suspend(() => S.Struct({ DomainStatusList: __S(1537, __c48, 1) }).pipe(ns)).annotate(
        { identifier: "DescribeElasticsearchDomainsResponse" },
      );
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
          InstanceType: S.String.pipe(T.HttpLabel("InstanceType")),
          ElasticsearchVersion: S.String.pipe(T.HttpLabel("ElasticsearchVersion")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2015-01-01/es/instanceTypeLimits/{ElasticsearchVersion}/{InstanceType}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeElasticsearchInstanceTypeLimitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LimitName: S.optional(S.String), LimitValues: S.optional(__S(448, __c14, 0)) }),
      ).annotate({ identifier: "StorageTypeLimit" });
    case 2:
      return S.Array(__S(1569, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StorageTypeName: S.optional(S.String),
          StorageSubTypeName: S.optional(S.String),
          StorageTypeLimits: S.optional(__S(1570, __c49, 2)),
        }),
      ).annotate({ identifier: "StorageType" });
    case 4:
      return S.Array(__S(1571, __c49, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          MinimumInstanceCount: S.optional(S.Number),
          MaximumInstanceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceCountLimits" });
    case 6:
      return S.suspend(() =>
        S.Struct({ InstanceCountLimits: S.optional(__S(1573, __c49, 5)) }),
      ).annotate({ identifier: "InstanceLimits" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          StorageTypes: S.optional(__S(1572, __c49, 4)),
          InstanceLimits: S.optional(__S(1574, __c49, 6)),
          AdditionalLimits: S.optional(__S(1570, __c49, 2)),
        }),
      ).annotate({ identifier: "Limits" });
    case 8:
      return S.Record(S.String, /*@__PURE__*/ __S(1575, __c49, 7).pipe(S.optional));
    case 9:
      return S.suspend(() =>
        S.Struct({ LimitsByRole: S.optional(__S(1576, __c49, 8)) }).pipe(ns),
      ).annotate({ identifier: "DescribeElasticsearchInstanceTypeLimitsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1633, __c51, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/ccs/inboundConnection/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeInboundCrossClusterSearchConnectionsRequest" });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CrossClusterSearchConnections: S.optional(__S(1601, __c50, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInboundCrossClusterSearchConnectionsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(448, __c14, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(1632, __c51, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1633, __c51, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/ccs/outboundConnection/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeOutboundCrossClusterSearchConnectionsRequest" });
    case 1:
      return S.Array(__S(1248, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CrossClusterSearchConnections: S.optional(__S(1665, __c52, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeOutboundCrossClusterSearchConnectionsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(__S(448, __c14, 0)) }),
      ).annotate({ identifier: "DescribePackagesFilter" });
    case 1:
      return S.Array(__S(1696, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1697, __c53, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/packages/describe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribePackagesRequest" });
    case 3:
      return S.Array(__S(928, __c29, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PackageDetailsList: S.optional(__S(1699, __c53, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribePackagesResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedElasticsearchInstanceOfferingId: S.optional(S.String).pipe(
            T.HttpQuery("offeringId"),
          ),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/reservedInstanceOfferings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReservedElasticsearchInstanceOfferingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReservedElasticsearchInstanceOfferingId: S.optional(S.String),
          ElasticsearchInstanceType: S.optional(S.String),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          CurrencyCode: S.optional(S.String),
          PaymentOption: S.optional(S.String),
          RecurringCharges: S.optional(__S(1761, __c55, 1)),
        }),
      ).annotate({ identifier: "ReservedElasticsearchInstanceOffering" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1729, __c54, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ReservedElasticsearchInstanceOffering"))
          .annotate({ identifier: "ReservedElasticsearchInstanceOffering" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ReservedElasticsearchInstanceOfferings: S.optional(__S(1730, __c54, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReservedElasticsearchInstanceOfferingsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecurringChargeAmount: S.optional(S.Number),
          RecurringChargeFrequency: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecurringCharge" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1760, __c55, 0)
          .pipe(/*@__PURE__*/ T.XmlName("RecurringCharge"))
          .annotate({ identifier: "RecurringCharge" }),
      );
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedElasticsearchInstanceId: S.optional(S.String).pipe(T.HttpQuery("reservationId")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/reservedInstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReservedElasticsearchInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReservationName: S.optional(S.String),
          ReservedElasticsearchInstanceId: S.optional(S.String),
          ReservedElasticsearchInstanceOfferingId: S.optional(S.String),
          ElasticsearchInstanceType: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Duration: S.optional(S.Number),
          FixedPrice: S.optional(S.Number),
          UsagePrice: S.optional(S.Number),
          CurrencyCode: S.optional(S.String),
          ElasticsearchInstanceCount: S.optional(S.Number),
          State: S.optional(S.String),
          PaymentOption: S.optional(S.String),
          RecurringCharges: S.optional(__S(1761, __c55, 1)),
        }),
      ).annotate({ identifier: "ReservedElasticsearchInstance" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ReservedElasticsearchInstances: S.optional(__S(1794, __c56, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReservedElasticsearchInstancesResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcEndpointIds: __S(448, __c14, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/vpcEndpoints/describe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVpcEndpointsRequest" });
    case 1:
      return S.Array(__S(1056, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcEndpointError" });
    case 3:
      return S.Array(__S(1826, __c57, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          VpcEndpoints: __S(1825, __c57, 1),
          VpcEndpointErrors: __S(1827, __c57, 3),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeVpcEndpointsResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.String.pipe(T.HttpLabel("PackageID")),
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2015-01-01/packages/dissociate/{PackageID}/{DomainName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DissociatePackageRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/compatibleVersions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCompatibleElasticsearchVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceVersion: S.optional(S.String),
          TargetVersions: S.optional(__S(448, __c14, 0)),
        }),
      ).annotate({ identifier: "CompatibleVersionsMap" });
    case 2:
      return S.Array(__S(1889, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ CompatibleElasticsearchVersions: S.optional(__S(1890, __c59, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetCompatibleElasticsearchVersionsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.String.pipe(T.HttpLabel("PackageID")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/packages/{PackageID}/history" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPackageVersionHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PackageVersion: S.optional(S.String),
          CommitMessage: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PackageVersionHistory" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.optional(S.String),
          PackageVersionHistoryList: S.optional(__S(1922, __c60, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetPackageVersionHistoryResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/upgradeDomain/{DomainName}/history" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUpgradeHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpgradeStep: S.optional(S.String),
          UpgradeStepStatus: S.optional(S.String),
          Issues: S.optional(__S(448, __c14, 0)),
          ProgressPercent: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpgradeStepItem" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          UpgradeName: S.optional(S.String),
          StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpgradeStatus: S.optional(S.String),
          StepsList: S.optional(__S(1954, __c61, 2)),
        }),
      ).annotate({ identifier: "UpgradeHistory" });
    case 4:
      return S.Array(__S(1955, __c61, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          UpgradeHistories: S.optional(__S(1956, __c61, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetUpgradeHistoryResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/upgradeDomain/{DomainName}/status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUpgradeStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpgradeStep: S.optional(S.String),
          StepStatus: S.optional(S.String),
          UpgradeName: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetUpgradeStatusResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EngineType: S.optional(S.String).pipe(T.HttpQuery("engineType")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/domain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainNamesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DomainName: S.optional(S.String), EngineType: S.optional(S.String) }),
      ).annotate({ identifier: "DomainInfo" });
    case 2:
      return S.Array(__S(2017, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ DomainNames: S.optional(__S(2018, __c63, 2)) }).pipe(ns),
      ).annotate({ identifier: "ListDomainNamesResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.String.pipe(T.HttpLabel("PackageID")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/packages/{PackageID}/domains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDomainsForPackageRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(320, __c10, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainPackageDetailsList: S.optional(__S(2080, __c65, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDomainsForPackageResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ElasticsearchVersion: S.String.pipe(T.HttpLabel("ElasticsearchVersion")),
          DomainName: S.optional(S.String).pipe(T.HttpQuery("domainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/instanceTypes/{ElasticsearchVersion}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListElasticsearchInstanceTypesRequest" });
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          ElasticsearchInstanceTypes: S.optional(__S(2113, __c66, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListElasticsearchInstanceTypesResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListElasticsearchVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ElasticsearchVersions: S.optional(__S(448, __c14, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListElasticsearchVersionsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/domain/{DomainName}/packages" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPackagesForDomainRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/tags" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TagList: S.optional(__S(161, __c5, 1)) }).pipe(ns),
      ).annotate({ identifier: "ListTagsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/2015-01-01/es/domain/{DomainName}/listVpcEndpointAccess",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVpcEndpointAccessRequest" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ AuthorizedPrincipalList: __S(2241, __c70, 1), NextToken: S.String }).pipe(ns),
      ).annotate({ identifier: "ListVpcEndpointAccessResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/vpcEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVpcEndpointsRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1344, __c42, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ VpcEndpointSummaryList: __S(2304, __c72, 0), NextToken: S.String }).pipe(ns),
      ).annotate({ identifier: "ListVpcEndpointsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/2015-01-01/es/domain/{DomainName}/vpcEndpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVpcEndpointsForDomainRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReservedElasticsearchInstanceOfferingId: S.String,
          ReservationName: S.String,
          InstanceCount: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/purchaseReservedInstanceOffering" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PurchaseReservedElasticsearchInstanceOfferingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReservedElasticsearchInstanceId: S.optional(S.String),
          ReservationName: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PurchaseReservedElasticsearchInstanceOfferingResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CrossClusterSearchConnectionId: S.String.pipe(
            T.HttpLabel("CrossClusterSearchConnectionId"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/2015-01-01/es/ccs/inboundConnection/{CrossClusterSearchConnectionId}/reject",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectInboundCrossClusterSearchConnectionRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ARN: S.String, TagKeys: __S(448, __c14, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/tags-removal" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveTagsRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String.pipe(T.HttpLabel("DomainName")), Account: S.String }).pipe(
          T.all(
            ns,
            T.Http({
              method: "POST",
              uri: "/2015-01-01/es/domain/{DomainName}/revokeVpcEndpointAccess",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RevokeVpcEndpointAccessRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DomainName: S.String }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/serviceSoftwareUpdate/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartElasticsearchServiceSoftwareUpdateRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String.pipe(T.HttpLabel("DomainName")),
          ElasticsearchClusterConfig: S.optional(__S(706, __c22, 2)),
          EBSOptions: S.optional(__S(707, __c22, 3)),
          SnapshotOptions: S.optional(__S(708, __c22, 4)),
          VPCOptions: S.optional(__S(640, __c20, 0)),
          CognitoOptions: S.optional(__S(709, __c22, 5)),
          AdvancedOptions: S.optional(__S(712, __c22, 8)),
          AccessPolicies: S.optional(S.String),
          LogPublishingOptions: S.optional(__S(714, __c22, 10)),
          DomainEndpointOptions: S.optional(__S(715, __c22, 11)),
          AdvancedSecurityOptions: S.optional(__S(834, __c26, 2)),
          NodeToNodeEncryptionOptions: S.optional(__S(711, __c22, 7)),
          EncryptionAtRestOptions: S.optional(__S(710, __c22, 6)),
          AutoTuneOptions: S.optional(__S(1517, __c47, 13)),
          DryRun: S.optional(S.Boolean),
          DeploymentStrategyOptions: S.optional(__S(717, __c22, 13)),
          AutomatedSnapshotPauseOptions: S.optional(__S(835, __c26, 3)),
          UseCase: S.optional(S.String),
          EngineMode: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/domain/{DomainName}/config" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateElasticsearchDomainConfigRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DeploymentType: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "DryRunResults" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          DomainConfig: __S(1523, __c47, 19),
          DryRunResults: S.optional(__S(2529, __c79, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateElasticsearchDomainConfigResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PackageID: S.String,
          PackageSource: __S(992, __c31, 0),
          PackageDescription: S.optional(S.String),
          CommitMessage: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/packages/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePackageRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcEndpointId: S.String, VpcOptions: __S(640, __c20, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/vpcEndpoints/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateVpcEndpointRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.String,
          TargetVersion: S.String,
          PerformCheckOnly: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/2015-01-01/es/upgradeDomain" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpgradeElasticsearchDomainRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DomainName: S.optional(S.String),
          TargetVersion: S.optional(S.String),
          PerformCheckOnly: S.optional(S.Boolean),
          ChangeProgressDetails: S.optional(__S(736, __c23, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "UpgradeElasticsearchDomainResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
