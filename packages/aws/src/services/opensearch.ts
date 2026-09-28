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
  sdkId: "OpenSearch",
  target: "AmazonOpenSearchService",
  version: "2021-01-01",
  sigv4: "es",
  protocol: restJson1Protocol,
  xmlns: "http://es.amazonaws.com/doc/2021-01-01/",
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
export class DependencyFailureException
  extends /*@__PURE__*/ TE.TaggedError("DependencyFailureException", [], {
    status: 424,
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class SlotNotAvailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "SlotNotAvailableException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly SlotSuggestions?: number[]; readonly message?: string }> {}
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
export type ConnectionId = string;
export interface AcceptInboundConnectionRequest {
  ConnectionId: string;
}
export type OwnerId = string;
export type DomainName = string;
export type Region = string;
export interface AWSDomainInformation {
  OwnerId?: string;
  DomainName: string;
  Region?: string;
}
export interface DomainInformationContainer {
  AWSDomainInformation?: AWSDomainInformation;
}
export type InboundConnectionStatusCode =
  | "PENDING_ACCEPTANCE"
  | "APPROVED"
  | "PROVISIONING"
  | "ACTIVE"
  | "REJECTING"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type ConnectionStatusMessage = string;
export interface InboundConnectionStatus {
  StatusCode?: InboundConnectionStatusCode;
  Message?: string;
}
export type ConnectionMode = "DIRECT" | "VPC_ENDPOINT" | (string & {});
export interface InboundConnection {
  LocalDomainInfo?: DomainInformationContainer;
  RemoteDomainInfo?: DomainInformationContainer;
  ConnectionId?: string;
  ConnectionStatus?: InboundConnectionStatus;
  ConnectionMode?: ConnectionMode;
}
export interface AcceptInboundConnectionResponse {
  Connection?: InboundConnection;
}
export type DataSourceName = string;
export type RoleArn = string;
export interface S3GlueDataCatalog {
  RoleArn?: string;
}
export type DataSourceType = { S3GlueDataCatalog: S3GlueDataCatalog };
export type DataSourceDescription = string;
export interface AddDataSourceRequest {
  DomainName: string;
  Name: string;
  DataSourceType: DataSourceType;
  Description?: string;
}
export interface AddDataSourceResponse {
  Message?: string;
}
export type DirectQueryDataSourceName = string;
export type DirectQueryDataSourceRoleArn = string;
export interface CloudWatchDirectQueryDataSource {
  RoleArn: string;
}
export interface SecurityLakeDirectQueryDataSource {
  RoleArn: string;
}
export type AMPWorkspaceArn = string;
export interface PrometheusDirectQueryDataSource {
  RoleArn: string;
  WorkspaceArn: string;
}
export type DirectQueryDataSourceType =
  | {
      CloudWatchLog: CloudWatchDirectQueryDataSource;
      SecurityLake?: never;
      Prometheus?: never;
    }
  | {
      CloudWatchLog?: never;
      SecurityLake: SecurityLakeDirectQueryDataSource;
      Prometheus?: never;
    }
  | {
      CloudWatchLog?: never;
      SecurityLake?: never;
      Prometheus: PrometheusDirectQueryDataSource;
    };
export type DirectQueryDataSourceDescription = string;
export type ARN = string;
export type DirectQueryOpenSearchARNList = string[];
export type PolicyDocument = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface AddDirectQueryDataSourceRequest {
  DataSourceName: string;
  DataSourceType: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceAccessPolicy?: string;
  TagList?: Tag[];
}
export interface AddDirectQueryDataSourceResponse {
  DataSourceArn?: string;
}
export interface AddTagsRequest {
  ARN: string;
  TagList: Tag[];
}
export interface AddTagsResponse {}
export type PackageID = string;
export type PackageIDList = string[];
export interface KeyStoreAccessOption {
  KeyAccessRoleArn?: string;
  KeyStoreAccessEnabled: boolean;
}
export interface PackageAssociationConfiguration {
  KeyStoreAccessOption?: KeyStoreAccessOption;
}
export interface AssociatePackageRequest {
  PackageID: string;
  DomainName: string;
  PrerequisitePackageIDList?: string[];
  AssociationConfiguration?: PackageAssociationConfiguration;
}
export type PackageName = string;
export type PackageType =
  | "TXT-DICTIONARY"
  | "ZIP-PLUGIN"
  | "PACKAGE-LICENSE"
  | "PACKAGE-CONFIG"
  | (string & {});
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
  PrerequisitePackageIDList?: string[];
  ReferencePath?: string;
  ErrorDetails?: ErrorDetails;
  AssociationConfiguration?: PackageAssociationConfiguration;
}
export interface AssociatePackageResponse {
  DomainPackageDetails?: DomainPackageDetails;
}
export interface PackageDetailsForAssociation {
  PackageID: string;
  PrerequisitePackageIDList?: string[];
  AssociationConfiguration?: PackageAssociationConfiguration;
}
export type PackageDetailsForAssociationList = PackageDetailsForAssociation[];
export interface AssociatePackagesRequest {
  PackageList: PackageDetailsForAssociation[];
  DomainName: string;
}
export type DomainPackageDetailsList = DomainPackageDetails[];
export interface AssociatePackagesResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
}
export type Id = string;
export interface WorkspaceConfigurationInput {
  name: string;
  workspaceType: string;
}
export type ClientToken = string;
export interface AttachDataSourceRequest {
  id: string;
  dataSourceArn: string;
  workspaceId?: string;
  workspaceConfiguration?: WorkspaceConfigurationInput;
  clientToken?: string;
}
export type DataSourceAttachmentStatus =
  | "PENDING"
  | "ATTACHED"
  | "FAILED"
  | (string & {});
export interface AttachDataSourceResponse {
  attachmentId?: string;
  id?: string;
  arn?: string;
  dataSourceArn?: string;
  status?: DataSourceAttachmentStatus;
}
export type AWSAccount = string;
export type AWSServicePrincipal =
  | "application.opensearchservice.amazonaws.com"
  | (string & {});
export type RegionsList = string[];
export interface ServiceOptions {
  SupportedRegions?: string[];
}
export interface AuthorizeVpcEndpointAccessRequest {
  DomainName: string;
  Account?: string;
  Service?: AWSServicePrincipal;
  ServiceOptions?: ServiceOptions;
}
export type PrincipalType = "AWS_ACCOUNT" | "AWS_SERVICE" | (string & {});
export interface AuthorizedPrincipal {
  PrincipalType?: PrincipalType;
  Principal?: string;
  ServiceOptions?: ServiceOptions;
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
  CancelledChangeIds?: string[];
  CancelledChangeProperties?: CancelledChangeProperty[];
  DryRun?: boolean;
}
export interface CancelServiceSoftwareUpdateRequest {
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
export interface CancelServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export type ApplicationName = string;
export interface DataSource {
  dataSourceArn?: string;
  dataSourceDescription?: string;
  iamRoleForDataSourceArn?: string;
}
export type DataSources = DataSource[];
export interface IamIdentityCenterOptionsInput {
  enabled?: boolean;
  iamIdentityCenterInstanceArn?: string;
  iamRoleForIdentityCenterApplicationArn?: string;
}
export type AppConfigType =
  | "opensearchDashboards.dashboardAdmin.users"
  | "opensearchDashboards.dashboardAdmin.groups"
  | (string & {});
export type AppConfigValue = string;
export interface AppConfig {
  key?: AppConfigType;
  value?: string;
}
export type AppConfigs = AppConfig[];
export type KmsKeyArn = string;
export interface CreateApplicationRequest {
  clientToken?: string;
  name: string;
  dataSources?: DataSource[];
  iamIdentityCenterOptions?: IamIdentityCenterOptionsInput;
  appConfigs?: AppConfig[];
  tagList?: Tag[];
  kmsKeyArn?: string;
}
export interface IamIdentityCenterOptions {
  enabled?: boolean;
  iamIdentityCenterInstanceArn?: string;
  iamRoleForIdentityCenterApplicationArn?: string;
  iamIdentityCenterApplicationArn?: string;
}
export interface CreateApplicationResponse {
  id?: string;
  name?: string;
  arn?: string;
  dataSources?: DataSource[];
  iamIdentityCenterOptions?: IamIdentityCenterOptions;
  appConfigs?: AppConfig[];
  tagList?: Tag[];
  createdAt?: Date;
  kmsKeyArn?: string;
}
export type VersionString = string;
export type OpenSearchPartitionInstanceType =
  | "m3.medium.search"
  | "m3.large.search"
  | "m3.xlarge.search"
  | "m3.2xlarge.search"
  | "m4.large.search"
  | "m4.xlarge.search"
  | "m4.2xlarge.search"
  | "m4.4xlarge.search"
  | "m4.10xlarge.search"
  | "m5.large.search"
  | "m5.xlarge.search"
  | "m5.2xlarge.search"
  | "m5.4xlarge.search"
  | "m5.12xlarge.search"
  | "m5.24xlarge.search"
  | "r5.large.search"
  | "r5.xlarge.search"
  | "r5.2xlarge.search"
  | "r5.4xlarge.search"
  | "r5.12xlarge.search"
  | "r5.24xlarge.search"
  | "c5.large.search"
  | "c5.xlarge.search"
  | "c5.2xlarge.search"
  | "c5.4xlarge.search"
  | "c5.9xlarge.search"
  | "c5.18xlarge.search"
  | "t3.nano.search"
  | "t3.micro.search"
  | "t3.small.search"
  | "t3.medium.search"
  | "t3.large.search"
  | "t3.xlarge.search"
  | "t3.2xlarge.search"
  | "or1.medium.search"
  | "or1.large.search"
  | "or1.xlarge.search"
  | "or1.2xlarge.search"
  | "or1.4xlarge.search"
  | "or1.8xlarge.search"
  | "or1.12xlarge.search"
  | "or1.16xlarge.search"
  | "ultrawarm1.medium.search"
  | "ultrawarm1.large.search"
  | "ultrawarm1.xlarge.search"
  | "t2.micro.search"
  | "t2.small.search"
  | "t2.medium.search"
  | "r3.large.search"
  | "r3.xlarge.search"
  | "r3.2xlarge.search"
  | "r3.4xlarge.search"
  | "r3.8xlarge.search"
  | "i2.xlarge.search"
  | "i2.2xlarge.search"
  | "d2.xlarge.search"
  | "d2.2xlarge.search"
  | "d2.4xlarge.search"
  | "d2.8xlarge.search"
  | "c4.large.search"
  | "c4.xlarge.search"
  | "c4.2xlarge.search"
  | "c4.4xlarge.search"
  | "c4.8xlarge.search"
  | "r4.large.search"
  | "r4.xlarge.search"
  | "r4.2xlarge.search"
  | "r4.4xlarge.search"
  | "r4.8xlarge.search"
  | "r4.16xlarge.search"
  | "i3.large.search"
  | "i3.xlarge.search"
  | "i3.2xlarge.search"
  | "i3.4xlarge.search"
  | "i3.8xlarge.search"
  | "i3.16xlarge.search"
  | "r6g.large.search"
  | "r6g.xlarge.search"
  | "r6g.2xlarge.search"
  | "r6g.4xlarge.search"
  | "r6g.8xlarge.search"
  | "r6g.12xlarge.search"
  | "m6g.large.search"
  | "m6g.xlarge.search"
  | "m6g.2xlarge.search"
  | "m6g.4xlarge.search"
  | "m6g.8xlarge.search"
  | "m6g.12xlarge.search"
  | "c6g.large.search"
  | "c6g.xlarge.search"
  | "c6g.2xlarge.search"
  | "c6g.4xlarge.search"
  | "c6g.8xlarge.search"
  | "c6g.12xlarge.search"
  | "r6gd.large.search"
  | "r6gd.xlarge.search"
  | "r6gd.2xlarge.search"
  | "r6gd.4xlarge.search"
  | "r6gd.8xlarge.search"
  | "r6gd.12xlarge.search"
  | "r6gd.16xlarge.search"
  | "t4g.small.search"
  | "t4g.medium.search"
  | (string & {});
export type IntegerClass = number;
export interface ZoneAwarenessConfig {
  AvailabilityZoneCount?: number;
}
export type OpenSearchWarmPartitionInstanceType =
  | "ultrawarm1.medium.search"
  | "ultrawarm1.large.search"
  | "ultrawarm1.xlarge.search"
  | (string & {});
export interface ColdStorageOptions {
  Enabled: boolean;
}
export type NodeOptionsNodeType = "coordinator" | (string & {});
export interface NodeConfig {
  Enabled?: boolean;
  Type?: OpenSearchPartitionInstanceType;
  Count?: number;
}
export interface NodeOption {
  NodeType?: NodeOptionsNodeType;
  NodeConfig?: NodeConfig;
}
export type NodeOptionsList = NodeOption[];
export interface ClusterConfig {
  InstanceType?: OpenSearchPartitionInstanceType;
  InstanceCount?: number;
  DedicatedMasterEnabled?: boolean;
  ZoneAwarenessEnabled?: boolean;
  ZoneAwarenessConfig?: ZoneAwarenessConfig;
  DedicatedMasterType?: OpenSearchPartitionInstanceType;
  DedicatedMasterCount?: number;
  WarmEnabled?: boolean;
  WarmType?: OpenSearchWarmPartitionInstanceType;
  WarmCount?: number;
  ColdStorageOptions?: ColdStorageOptions;
  MultiAZWithStandbyEnabled?: boolean;
  NodeOptions?: NodeOption[];
}
export type VolumeType = "standard" | "gp2" | "io1" | "gp3" | (string & {});
export interface EBSOptions {
  EBSEnabled?: boolean;
  VolumeType?: VolumeType;
  VolumeSize?: number;
  Iops?: number;
  Throughput?: number;
}
export type IPAddressType = "ipv4" | "dualstack" | (string & {});
export interface SnapshotOptions {
  AutomatedSnapshotStartHour?: number;
}
export type StringList = string[];
export interface VPCOptions {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  EgressEnabled?: boolean;
}
export type UserPoolId = string;
export type IdentityPoolId = string;
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
export type SubjectKey = string;
export type RolesKey = string;
export type JwksUrl = string;
export interface JWTOptionsInput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
  JwksUrl?: string;
  PublicKey?: string;
}
export type IAMFederationSubjectKey = string;
export type IAMFederationRolesKey = string;
export interface IAMFederationOptionsInput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
}
export interface AdvancedSecurityOptionsInput {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  MasterUserOptions?: MasterUserOptions;
  SAMLOptions?: SAMLOptionsInput;
  JWTOptions?: JWTOptionsInput;
  IAMFederationOptions?: IAMFederationOptionsInput;
  AnonymousAuthEnabled?: boolean;
}
export type IdentityCenterInstanceARN = string;
export type SubjectKeyIdCOption =
  | "UserName"
  | "UserId"
  | "Email"
  | (string & {});
export type RolesKeyIdCOption = "GroupName" | "GroupId" | (string & {});
export interface IdentityCenterOptionsInput {
  EnabledAPIAccess?: boolean;
  IdentityCenterInstanceARN?: string;
  IdentityCenterInstanceRegion?: string;
  SubjectKey?: SubjectKeyIdCOption;
  RolesKey?: RolesKeyIdCOption;
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
  UseOffPeakWindow?: boolean;
}
export type StartTimeHours = number;
export type StartTimeMinutes = number;
export interface WindowStartTime {
  Hours: number;
  Minutes: number;
}
export interface OffPeakWindow {
  WindowStartTime?: WindowStartTime;
}
export interface OffPeakWindowOptions {
  Enabled?: boolean;
  OffPeakWindow?: OffPeakWindow;
}
export interface SoftwareUpdateOptions {
  AutoSoftwareUpdateEnabled?: boolean;
  UseLatestServiceSoftwareForBlueGreen?: boolean;
}
export type NaturalLanguageQueryGenerationDesiredState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface NaturalLanguageQueryGenerationOptionsInput {
  DesiredState?: NaturalLanguageQueryGenerationDesiredState;
}
export interface S3VectorsEngine {
  Enabled?: boolean;
}
export interface ServerlessVectorAcceleration {
  Enabled?: boolean;
}
export interface AIMLOptionsInput {
  NaturalLanguageQueryGenerationOptions?: NaturalLanguageQueryGenerationOptionsInput;
  S3VectorsEngine?: S3VectorsEngine;
  ServerlessVectorAcceleration?: ServerlessVectorAcceleration;
}
export type DeploymentStrategy =
  | "Default"
  | "CapacityOptimized"
  | (string & {});
export interface DeploymentStrategyOptions {
  DeploymentStrategy: DeploymentStrategy;
}
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
export type EngineMode = "GENERAL" | "OPTIMIZED" | (string & {});
export interface CreateDomainRequest {
  DomainName: string;
  EngineVersion?: string;
  ClusterConfig?: ClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  IPAddressType?: IPAddressType;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  DomainEndpointOptions?: DomainEndpointOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  IdentityCenterOptions?: IdentityCenterOptionsInput;
  TagList?: Tag[];
  AutoTuneOptions?: AutoTuneOptionsInput;
  OffPeakWindowOptions?: OffPeakWindowOptions;
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  AIMLOptions?: AIMLOptionsInput;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
  UseCase?: DomainUseCase;
  EngineMode?: EngineMode;
}
export type DomainId = string;
export type ServiceUrl = string;
export type EndpointsMap = { [key: string]: string | undefined };
export type HostedZoneId = string;
export interface VPCDerivedInfo {
  VPCId?: string;
  SubnetIds?: string[];
  AvailabilityZones?: string[];
  SecurityGroupIds?: string[];
  EgressEnabled?: boolean;
}
export interface SAMLOptionsOutput {
  Enabled?: boolean;
  Idp?: SAMLIdp;
  SubjectKey?: string;
  RolesKey?: string;
  SessionTimeoutMinutes?: number;
}
export interface JWTOptionsOutput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
  JwksUrl?: string;
  PublicKey?: string;
}
export interface IAMFederationOptionsOutput {
  Enabled?: boolean;
  SubjectKey?: string;
  RolesKey?: string;
}
export type DisableTimestamp = Date;
export interface AdvancedSecurityOptions {
  Enabled?: boolean;
  InternalUserDatabaseEnabled?: boolean;
  SAMLOptions?: SAMLOptionsOutput;
  JWTOptions?: JWTOptionsOutput;
  IAMFederationOptions?: IAMFederationOptionsOutput;
  AnonymousAuthDisableDate?: Date;
  AnonymousAuthEnabled?: boolean;
}
export type IdentityCenterApplicationARN = string;
export type IdentityStoreId = string;
export interface IdentityCenterOptions {
  EnabledAPIAccess?: boolean;
  IdentityCenterInstanceARN?: string;
  IdentityCenterInstanceRegion?: string;
  SubjectKey?: SubjectKeyIdCOption;
  RolesKey?: RolesKeyIdCOption;
  IdentityCenterApplicationARN?: string;
  IdentityStoreId?: string;
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
  UseOffPeakWindow?: boolean;
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
export type UpdateTimestamp = Date;
export interface ChangeProgressDetails {
  ChangeId?: string;
  Message?: string;
  ConfigChangeStatus?: ConfigChangeStatus;
  InitiatedBy?: InitiatedBy;
  StartTime?: Date;
  LastUpdatedTime?: Date;
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
export type NaturalLanguageQueryGenerationCurrentState =
  | "NOT_ENABLED"
  | "ENABLE_COMPLETE"
  | "ENABLE_IN_PROGRESS"
  | "ENABLE_FAILED"
  | "DISABLE_COMPLETE"
  | "DISABLE_IN_PROGRESS"
  | "DISABLE_FAILED"
  | (string & {});
export interface NaturalLanguageQueryGenerationOptionsOutput {
  DesiredState?: NaturalLanguageQueryGenerationDesiredState;
  CurrentState?: NaturalLanguageQueryGenerationCurrentState;
}
export interface AIMLOptionsOutput {
  NaturalLanguageQueryGenerationOptions?: NaturalLanguageQueryGenerationOptionsOutput;
  S3VectorsEngine?: S3VectorsEngine;
  ServerlessVectorAcceleration?: ServerlessVectorAcceleration;
}
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
export interface DomainStatus {
  DomainId: string;
  DomainName: string;
  ARN: string;
  Created?: boolean;
  Deleted?: boolean;
  Endpoint?: string;
  EndpointV2?: string;
  Endpoints?: { [key: string]: string | undefined };
  DomainEndpointV2HostedZoneId?: string;
  Processing?: boolean;
  UpgradeProcessing?: boolean;
  EngineVersion?: string;
  ClusterConfig: ClusterConfig;
  EBSOptions?: EBSOptions;
  AccessPolicies?: string;
  IPAddressType?: IPAddressType;
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
  IdentityCenterOptions?: IdentityCenterOptions;
  AutoTuneOptions?: AutoTuneOptionsOutput;
  ChangeProgressDetails?: ChangeProgressDetails;
  OffPeakWindowOptions?: OffPeakWindowOptions;
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  DomainProcessingStatus?: DomainProcessingStatusType;
  ModifyingProperties?: ModifyingProperties[];
  AIMLOptions?: AIMLOptionsOutput;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptions;
  UseCase?: DomainUseCase;
  EngineMode?: EngineMode;
}
export interface CreateDomainResponse {
  DomainStatus?: DomainStatus;
}
export type IndexName = string;
export type IndexSchema = unknown;
export interface CreateIndexRequest {
  DomainName: string;
  IndexName: string;
  IndexSchema: any;
}
export type IndexStatus = "CREATED" | "UPDATED" | "DELETED" | (string & {});
export interface CreateIndexResponse {
  Status: IndexStatus;
}
export type ConnectionAlias = string;
export type Endpoint = string;
export type SkipUnavailableStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CrossClusterSearchConnectionProperties {
  SkipUnavailable?: SkipUnavailableStatus;
}
export interface ConnectionProperties {
  Endpoint?: string;
  CrossClusterSearch?: CrossClusterSearchConnectionProperties;
}
export interface CreateOutboundConnectionRequest {
  LocalDomainInfo: DomainInformationContainer;
  RemoteDomainInfo: DomainInformationContainer;
  ConnectionAlias: string;
  ConnectionMode?: ConnectionMode;
  ConnectionProperties?: ConnectionProperties;
}
export type OutboundConnectionStatusCode =
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "PENDING_ACCEPTANCE"
  | "APPROVED"
  | "PROVISIONING"
  | "ACTIVE"
  | "REJECTING"
  | "REJECTED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface OutboundConnectionStatus {
  StatusCode?: OutboundConnectionStatusCode;
  Message?: string;
}
export interface CreateOutboundConnectionResponse {
  LocalDomainInfo?: DomainInformationContainer;
  RemoteDomainInfo?: DomainInformationContainer;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundConnectionStatus;
  ConnectionId?: string;
  ConnectionMode?: ConnectionMode;
  ConnectionProperties?: ConnectionProperties;
}
export type PackageDescription = string;
export type S3BucketName = string;
export type S3Key = string;
export interface PackageSource {
  S3BucketName?: string;
  S3Key?: string;
}
export type RequirementLevel = "REQUIRED" | "OPTIONAL" | "NONE" | (string & {});
export type LicenseFilepath = string;
export interface PackageConfiguration {
  LicenseRequirement: RequirementLevel;
  LicenseFilepath?: string;
  ConfigurationRequirement: RequirementLevel;
  RequiresRestartForConfigurationUpdate?: boolean;
}
export type EngineVersion = string;
export interface PackageVendingOptions {
  VendingEnabled: boolean;
}
export interface PackageEncryptionOptions {
  KmsKeyIdentifier?: string;
  EncryptionEnabled: boolean;
}
export interface CreatePackageRequest {
  PackageName: string;
  PackageType: PackageType;
  PackageDescription?: string;
  PackageSource: PackageSource;
  PackageConfiguration?: PackageConfiguration;
  EngineVersion?: string;
  PackageVendingOptions?: PackageVendingOptions;
  PackageEncryptionOptions?: PackageEncryptionOptions;
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
export type PluginName = string;
export type PluginDescription = string;
export type PluginVersion = string;
export type PluginClassName = string;
export type UncompressedPluginSizeInBytes = number;
export interface PluginProperties {
  Name?: string;
  Description?: string;
  Version?: string;
  ClassName?: string;
  UncompressedSizeInBytes?: number;
}
export type PackageUser = string;
export type PackageUserList = string[];
export type PackageOwner = string;
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
  EngineVersion?: string;
  AvailablePluginProperties?: PluginProperties;
  AvailablePackageConfiguration?: PackageConfiguration;
  AllowListedUserList?: string[];
  PackageOwner?: string;
  PackageVendingOptions?: PackageVendingOptions;
  PackageEncryptionOptions?: PackageEncryptionOptions;
}
export interface CreatePackageResponse {
  PackageDetails?: PackageDetails;
}
export type DomainArn = string;
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
export interface DeleteApplicationRequest {
  id: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteDataSourceRequest {
  DomainName: string;
  Name: string;
}
export interface DeleteDataSourceResponse {
  Message?: string;
}
export interface DeleteDirectQueryDataSourceRequest {
  DataSourceName: string;
}
export interface DeleteDirectQueryDataSourceResponse {}
export interface DeleteDomainRequest {
  DomainName: string;
}
export interface DeleteDomainResponse {
  DomainStatus?: DomainStatus;
}
export interface DeleteInboundConnectionRequest {
  ConnectionId: string;
}
export interface DeleteInboundConnectionResponse {
  Connection?: InboundConnection;
}
export interface DeleteIndexRequest {
  DomainName: string;
  IndexName: string;
}
export interface DeleteIndexResponse {
  Status: IndexStatus;
}
export interface DeleteOutboundConnectionRequest {
  ConnectionId: string;
}
export interface OutboundConnection {
  LocalDomainInfo?: DomainInformationContainer;
  RemoteDomainInfo?: DomainInformationContainer;
  ConnectionId?: string;
  ConnectionAlias?: string;
  ConnectionStatus?: OutboundConnectionStatus;
  ConnectionMode?: ConnectionMode;
  ConnectionProperties?: ConnectionProperties;
}
export interface DeleteOutboundConnectionResponse {
  Connection?: OutboundConnection;
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
export type ApplicationId = string;
export type CapabilityName = string;
export interface DeregisterCapabilityRequest {
  applicationId: string;
  capabilityName: string;
}
export type CapabilityStatus =
  | "creating"
  | "create_failed"
  | "active"
  | "updating"
  | "update_failed"
  | "deleting"
  | "delete_failed"
  | (string & {});
export interface DeregisterCapabilityResponse {
  status?: CapabilityStatus;
}
export interface DescribeDataSourceAttachmentRequest {
  id: string;
  dataSourceArn: string;
}
export interface DescribeDataSourceAttachmentResponse {
  attachmentId?: string;
  id?: string;
  arn?: string;
  dataSourceArn?: string;
  status?: DataSourceAttachmentStatus;
}
export interface DescribeDomainRequest {
  DomainName: string;
}
export interface DescribeDomainResponse {
  DomainStatus: DomainStatus;
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
  LastUpdatedTime?: Date;
  ConfigChangeStatus?: ConfigChangeStatus;
  InitiatedBy?: InitiatedBy;
}
export interface DescribeDomainChangeProgressResponse {
  ChangeProgressStatus?: ChangeProgressStatusDetails;
}
export interface DescribeDomainConfigRequest {
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
export interface VersionStatus {
  Options: string;
  Status: OptionStatus;
}
export interface ClusterConfigStatus {
  Options: ClusterConfig;
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
export interface IPAddressTypeStatus {
  Options: IPAddressType;
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
export interface IdentityCenterOptionsStatus {
  Options: IdentityCenterOptions;
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
  UseOffPeakWindow?: boolean;
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
export interface OffPeakWindowOptionsStatus {
  Options?: OffPeakWindowOptions;
  Status?: OptionStatus;
}
export interface SoftwareUpdateOptionsStatus {
  Options?: SoftwareUpdateOptions;
  Status?: OptionStatus;
}
export interface AIMLOptionsStatus {
  Options?: AIMLOptionsOutput;
  Status?: OptionStatus;
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
  Options: EngineMode;
  Status: OptionStatus;
}
export interface DomainConfig {
  EngineVersion?: VersionStatus;
  ClusterConfig?: ClusterConfigStatus;
  EBSOptions?: EBSOptionsStatus;
  AccessPolicies?: AccessPoliciesStatus;
  IPAddressType?: IPAddressTypeStatus;
  SnapshotOptions?: SnapshotOptionsStatus;
  VPCOptions?: VPCDerivedInfoStatus;
  CognitoOptions?: CognitoOptionsStatus;
  EncryptionAtRestOptions?: EncryptionAtRestOptionsStatus;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptionsStatus;
  AdvancedOptions?: AdvancedOptionsStatus;
  LogPublishingOptions?: LogPublishingOptionsStatus;
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsStatus;
  IdentityCenterOptions?: IdentityCenterOptionsStatus;
  AutoTuneOptions?: AutoTuneOptionsStatus;
  ChangeProgressDetails?: ChangeProgressDetails;
  OffPeakWindowOptions?: OffPeakWindowOptionsStatus;
  SoftwareUpdateOptions?: SoftwareUpdateOptionsStatus;
  ModifyingProperties?: ModifyingProperties[];
  AIMLOptions?: AIMLOptionsStatus;
  DeploymentStrategyOptions?: DeploymentStrategyOptionsStatus;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseOptionsStatus;
  UseCase?: UseCaseStatus;
  EngineMode?: EngineModeStatus;
}
export interface DescribeDomainConfigResponse {
  DomainConfig: DomainConfig;
}
export interface DescribeDomainHealthRequest {
  DomainName: string;
}
export type DomainState =
  | "Active"
  | "Processing"
  | "NotAvailable"
  | (string & {});
export type NumberOfAZs = string;
export type NumberOfNodes = string;
export type MasterNodeStatus = "Available" | "UnAvailable" | (string & {});
export type DomainHealth =
  | "Red"
  | "Yellow"
  | "Green"
  | "NotAvailable"
  | (string & {});
export type NumberOfShards = string;
export type AvailabilityZone = string;
export type ZoneStatus = "Active" | "StandBy" | "NotAvailable" | (string & {});
export interface AvailabilityZoneInfo {
  AvailabilityZoneName?: string;
  ZoneStatus?: ZoneStatus;
  ConfiguredDataNodeCount?: string;
  AvailableDataNodeCount?: string;
  TotalShards?: string;
  TotalUnAssignedShards?: string;
}
export type AvailabilityZoneInfoList = AvailabilityZoneInfo[];
export interface EnvironmentInfo {
  AvailabilityZoneInformation?: AvailabilityZoneInfo[];
}
export type EnvironmentInfoList = EnvironmentInfo[];
export interface DescribeDomainHealthResponse {
  DomainState?: DomainState;
  AvailabilityZoneCount?: string;
  ActiveAvailabilityZoneCount?: string;
  StandByAvailabilityZoneCount?: string;
  DataNodeCount?: string;
  DedicatedMaster?: boolean;
  MasterEligibleNodeCount?: string;
  WarmNodeCount?: string;
  MasterNode?: MasterNodeStatus;
  ClusterHealth?: DomainHealth;
  TotalShards?: string;
  TotalUnAssignedShards?: string;
  EnvironmentInformation?: EnvironmentInfo[];
}
export interface DescribeDomainNodesRequest {
  DomainName: string;
}
export type NodeId = string;
export type NodeType = "Data" | "Ultrawarm" | "Master" | "Warm" | (string & {});
export type NodeStatus = "Active" | "StandBy" | "NotAvailable" | (string & {});
export type StorageTypeName = string;
export type VolumeSize = string;
export interface DomainNodesStatus {
  NodeId?: string;
  NodeType?: NodeType;
  AvailabilityZone?: string;
  InstanceType?: OpenSearchPartitionInstanceType;
  NodeStatus?: NodeStatus;
  StorageType?: string;
  StorageVolumeType?: VolumeType;
  StorageSize?: string;
}
export type DomainNodesStatusList = DomainNodesStatus[];
export interface DescribeDomainNodesResponse {
  DomainNodesStatusList?: DomainNodesStatus[];
}
export type DomainNameList = string[];
export interface DescribeDomainsRequest {
  DomainNames: string[];
}
export type DomainStatusList = DomainStatus[];
export interface DescribeDomainsResponse {
  DomainStatusList: DomainStatus[];
}
export interface DescribeDryRunProgressRequest {
  DomainName: string;
  DryRunId?: string;
  LoadDryRunConfig?: boolean;
}
export interface ValidationFailure {
  Code?: string;
  Message?: string;
}
export type ValidationFailures = ValidationFailure[];
export interface DryRunProgressStatus {
  DryRunId: string;
  DryRunStatus: string;
  CreationDate: string;
  UpdateDate: string;
  ValidationFailures?: ValidationFailure[];
}
export type DeploymentType = string;
export interface DryRunResults {
  DeploymentType?: string;
  Message?: string;
}
export interface DescribeDryRunProgressResponse {
  DryRunProgressStatus?: DryRunProgressStatus;
  DryRunConfig?: DomainStatus;
  DryRunResults?: DryRunResults;
}
export type NonEmptyString = string;
export type ValueStringList = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type FilterList = Filter[];
export interface DescribeInboundConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type InboundConnections = InboundConnection[];
export interface DescribeInboundConnectionsResponse {
  Connections?: InboundConnection[];
  NextToken?: string;
}
export type InsightEntityType = "Account" | "DomainName" | (string & {});
export type InsightEntityValue = string;
export interface InsightEntity {
  Type: InsightEntityType;
  Value?: string;
}
export interface DescribeInsightDetailsRequest {
  Entity: InsightEntity;
  InsightId: string;
  ShowHtmlContent?: boolean;
}
export type InsightFieldType = "text" | "metric" | (string & {});
export interface InsightField {
  Name: string;
  Type: InsightFieldType;
  Value: string;
}
export type InsightFieldList = InsightField[];
export interface DescribeInsightDetailsResponse {
  Fields: InsightField[];
}
export interface DescribeInstanceTypeLimitsRequest {
  DomainName?: string;
  InstanceType: OpenSearchPartitionInstanceType;
  EngineVersion: string;
}
export type InstanceRole = string;
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
export interface DescribeInstanceTypeLimitsResponse {
  LimitsByRole?: { [key: string]: Limits | undefined };
}
export interface DescribeOutboundConnectionsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export type OutboundConnections = OutboundConnection[];
export interface DescribeOutboundConnectionsResponse {
  Connections?: OutboundConnection[];
  NextToken?: string;
}
export type DescribePackagesFilterName =
  | "PackageID"
  | "PackageName"
  | "PackageStatus"
  | "PackageType"
  | "EngineVersion"
  | "PackageOwner"
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
export interface DescribeReservedInstanceOfferingsRequest {
  ReservedInstanceOfferingId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ReservedInstancePaymentOption =
  | "ALL_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "NO_UPFRONT"
  | (string & {});
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export type RecurringChargeList = RecurringCharge[];
export interface ReservedInstanceOffering {
  ReservedInstanceOfferingId?: string;
  InstanceType?: OpenSearchPartitionInstanceType;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  PaymentOption?: ReservedInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedInstanceOfferingList = ReservedInstanceOffering[];
export interface DescribeReservedInstanceOfferingsResponse {
  NextToken?: string;
  ReservedInstanceOfferings?: ReservedInstanceOffering[];
}
export interface DescribeReservedInstancesRequest {
  ReservedInstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ReservationToken = string;
export interface ReservedInstance {
  ReservationName?: string;
  ReservedInstanceId?: string;
  BillingSubscriptionId?: number;
  ReservedInstanceOfferingId?: string;
  InstanceType?: OpenSearchPartitionInstanceType;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  InstanceCount?: number;
  State?: string;
  PaymentOption?: ReservedInstancePaymentOption;
  RecurringCharges?: RecurringCharge[];
}
export type ReservedInstanceList = ReservedInstance[];
export interface DescribeReservedInstancesResponse {
  NextToken?: string;
  ReservedInstances?: ReservedInstance[];
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
export interface DetachDataSourceRequest {
  id: string;
  dataSourceArn: string;
}
export interface DetachDataSourceResponse {
  id?: string;
  arn?: string;
  dataSourceArn?: string;
}
export interface DissociatePackageRequest {
  PackageID: string;
  DomainName: string;
}
export interface DissociatePackageResponse {
  DomainPackageDetails?: DomainPackageDetails;
}
export interface DissociatePackagesRequest {
  PackageList: string[];
  DomainName: string;
}
export interface DissociatePackagesResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
}
export interface GetApplicationRequest {
  id: string;
}
export type ApplicationStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export interface GetApplicationResponse {
  id?: string;
  arn?: string;
  name?: string;
  endpoint?: string;
  status?: ApplicationStatus;
  iamIdentityCenterOptions?: IamIdentityCenterOptions;
  dataSources?: DataSource[];
  appConfigs?: AppConfig[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  kmsKeyArn?: string;
}
export interface GetCapabilityRequest {
  applicationId: string;
  capabilityName: string;
}
export interface AIConfig {}
export type CapabilityExtendedResponseConfig = { aiConfig: AIConfig };
export type CapabilityFailureReason =
  | "KMS_KEY_INSUFFICIENT_PERMISSION"
  | (string & {});
export type CapabilityFailureDetails = string;
export interface CapabilityFailure {
  reason?: CapabilityFailureReason;
  details?: string;
}
export type CapabilityFailures = CapabilityFailure[];
export interface GetCapabilityResponse {
  capabilityName?: string;
  applicationId?: string;
  status?: CapabilityStatus;
  capabilityConfig?: CapabilityExtendedResponseConfig;
  failures?: CapabilityFailure[];
}
export interface GetCompatibleVersionsRequest {
  DomainName?: string;
}
export type VersionList = string[];
export interface CompatibleVersionsMap {
  SourceVersion?: string;
  TargetVersions?: string[];
}
export type CompatibleVersionsList = CompatibleVersionsMap[];
export interface GetCompatibleVersionsResponse {
  CompatibleVersions?: CompatibleVersionsMap[];
}
export interface GetDataSourceRequest {
  DomainName: string;
  Name: string;
}
export type DataSourceStatus = "ACTIVE" | "DISABLED" | (string & {});
export interface GetDataSourceResponse {
  DataSourceType?: DataSourceType;
  Name?: string;
  Description?: string;
  Status?: DataSourceStatus;
}
export interface GetDefaultApplicationSettingRequest {}
export interface GetDefaultApplicationSettingResponse {
  applicationArn?: string;
}
export interface GetDirectQueryDataSourceRequest {
  DataSourceName: string;
}
export interface GetDirectQueryDataSourceResponse {
  DataSourceName?: string;
  DataSourceType?: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceAccessPolicy?: string;
  DataSourceArn?: string;
}
export type RequestId = string;
export interface GetDomainMaintenanceStatusRequest {
  DomainName: string;
  MaintenanceId: string;
}
export type MaintenanceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export type MaintenanceStatusMessage = string;
export type MaintenanceType =
  | "REBOOT_NODE"
  | "RESTART_SEARCH_PROCESS"
  | "RESTART_DASHBOARD"
  | (string & {});
export interface GetDomainMaintenanceStatusResponse {
  Status?: MaintenanceStatus;
  StatusMessage?: string;
  NodeId?: string;
  Action?: MaintenanceType;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetIndexRequest {
  DomainName: string;
  IndexName: string;
}
export interface GetIndexResponse {
  IndexSchema: any;
}
export interface GetMigrationRequest {
  migrationId: string;
}
export interface MigrationSource {
  datasourceArn: string;
}
export interface MigrationError {
  code?: string;
  message?: string;
}
export interface GetMigrationResponse {
  migrationId?: string;
  status?: string;
  applicationId?: string;
  source?: MigrationSource;
  exportedCount?: number;
  importedCount?: number;
  error?: MigrationError;
  createdAt?: Date;
  updatedAt?: Date;
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
  PluginProperties?: PluginProperties;
  PackageConfiguration?: PackageConfiguration;
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
export type InsightFeedbackEntityType = "DomainName" | (string & {});
export interface InsightFeedbackEntity {
  Type: InsightFeedbackEntityType;
  Value: string;
}
export type InsightFeedbackThumbs = "Up" | "Down" | (string & {});
export type InsightFeedbackText = string;
export interface InsightFeedbackRequest {
  Entity: InsightFeedbackEntity;
  InsightId: string;
  Thumbs: InsightFeedbackThumbs;
  FeedbackText?: string;
}
export type InsightResponseStatus = "SUCCESS" | "ERROR" | (string & {});
export interface InsightFeedbackResponse {
  Status?: InsightResponseStatus;
}
export type ApplicationStatuses = ApplicationStatus[];
export interface ListApplicationsRequest {
  nextToken?: string;
  statuses?: ApplicationStatus[];
  maxResults?: number;
}
export interface ApplicationSummary {
  id?: string;
  arn?: string;
  name?: string;
  endpoint?: string;
  status?: ApplicationStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type ApplicationSummaries = ApplicationSummary[];
export interface ListApplicationsResponse {
  ApplicationSummaries?: ApplicationSummary[];
  nextToken?: string;
}
export interface ListDataSourceAttachmentsRequest {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DataSourceAttachmentSummary {
  attachmentId?: string;
  dataSourceArn?: string;
  status?: DataSourceAttachmentStatus;
}
export type DataSourceAttachmentSummaryList = DataSourceAttachmentSummary[];
export interface ListDataSourceAttachmentsResponse {
  attachments?: DataSourceAttachmentSummary[];
  nextToken?: string;
}
export interface ListDataSourcesRequest {
  DomainName: string;
}
export interface DataSourceDetails {
  DataSourceType?: DataSourceType;
  Name?: string;
  Description?: string;
  Status?: DataSourceStatus;
}
export type DataSourceList = DataSourceDetails[];
export interface ListDataSourcesResponse {
  DataSources?: DataSourceDetails[];
}
export interface ListDirectQueryDataSourcesRequest {
  NextToken?: string;
}
export interface DirectQueryDataSource {
  DataSourceName?: string;
  DataSourceType?: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceArn?: string;
  TagList?: Tag[];
}
export type DirectQueryDataSourceList = DirectQueryDataSource[];
export interface ListDirectQueryDataSourcesResponse {
  NextToken?: string;
  DirectQueryDataSources?: DirectQueryDataSource[];
}
export interface ListDomainMaintenancesRequest {
  DomainName: string;
  Action?: MaintenanceType;
  Status?: MaintenanceStatus;
  MaxResults?: number;
  NextToken?: string;
}
export interface DomainMaintenanceDetails {
  MaintenanceId?: string;
  DomainName?: string;
  Action?: MaintenanceType;
  NodeId?: string;
  Status?: MaintenanceStatus;
  StatusMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type DomainMaintenanceList = DomainMaintenanceDetails[];
export interface ListDomainMaintenancesResponse {
  DomainMaintenances?: DomainMaintenanceDetails[];
  NextToken?: string;
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
export interface ListDomainsForPackageResponse {
  DomainPackageDetailsList?: DomainPackageDetails[];
  NextToken?: string;
}
export interface InsightTimeRange {
  From: number;
  To: number;
}
export type InsightSortOrder = "ASC" | "DESC" | (string & {});
export type InsightPageSize = number;
export interface ListInsightsRequest {
  Entity: InsightEntity;
  TimeRange?: InsightTimeRange;
  SortOrder?: InsightSortOrder;
  MaxResults?: number;
  NextToken?: string;
}
export type InsightType = "EVENT" | "RECOMMENDATION" | (string & {});
export type InsightPriorityLevel =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | (string & {});
export type InsightStatus = "ACTIVE" | "RESOLVED" | "DISMISSED" | (string & {});
export interface Insight {
  InsightId?: string;
  DisplayName?: string;
  Type?: InsightType;
  Priority?: InsightPriorityLevel;
  Status?: InsightStatus;
  CreationTime?: Date;
  UpdateTime?: Date;
  IsExperimental?: boolean;
}
export type InsightList = Insight[];
export interface ListInsightsResponse {
  Insights?: Insight[];
  NextToken?: string;
}
export type InstanceTypeString = string;
export interface ListInstanceTypeDetailsRequest {
  EngineVersion: string;
  DomainName?: string;
  MaxResults?: number;
  NextToken?: string;
  RetrieveAZs?: boolean;
  InstanceType?: string;
}
export type InstanceRoleList = string[];
export type AvailabilityZoneList = string[];
export interface InstanceTypeDetails {
  InstanceType?: OpenSearchPartitionInstanceType;
  EncryptionEnabled?: boolean;
  CognitoEnabled?: boolean;
  AppLogsEnabled?: boolean;
  AdvancedSecurityEnabled?: boolean;
  WarmEnabled?: boolean;
  InstanceRole?: string[];
  AvailabilityZones?: string[];
}
export type InstanceTypeDetailsList = InstanceTypeDetails[];
export interface ListInstanceTypeDetailsResponse {
  InstanceTypeDetails?: InstanceTypeDetails[];
  NextToken?: string;
}
export interface ListMigrationsRequest {
  applicationId: string;
  status?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface MigrationSummary {
  migrationId?: string;
  status?: string;
  applicationId?: string;
  source?: MigrationSource;
  exportedCount?: number;
  importedCount?: number;
  error?: MigrationError;
  createdAt?: Date;
  updatedAt?: Date;
}
export type MigrationSummaryList = MigrationSummary[];
export interface ListMigrationsResponse {
  migrations?: MigrationSummary[];
  nextToken?: string;
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
export interface ListScheduledActionsRequest {
  DomainName: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ActionType =
  | "SERVICE_SOFTWARE_UPDATE"
  | "JVM_HEAP_SIZE_TUNING"
  | "JVM_YOUNG_GEN_TUNING"
  | (string & {});
export type ActionSeverity = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export type ScheduledBy = "CUSTOMER" | "SYSTEM" | (string & {});
export type ActionStatus =
  | "PENDING_UPDATE"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | "NOT_ELIGIBLE"
  | "ELIGIBLE"
  | (string & {});
export interface ScheduledAction {
  Id: string;
  Type: ActionType;
  Severity: ActionSeverity;
  ScheduledTime: number;
  Description?: string;
  ScheduledBy?: ScheduledBy;
  Status?: ActionStatus;
  Mandatory?: boolean;
  Cancellable?: boolean;
}
export type ScheduledActionsList = ScheduledAction[];
export interface ListScheduledActionsResponse {
  ScheduledActions?: ScheduledAction[];
  NextToken?: string;
}
export interface ListTagsRequest {
  ARN: string;
}
export interface ListTagsResponse {
  TagList?: Tag[];
}
export interface ListVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ListVersionsResponse {
  Versions?: string[];
  NextToken?: string;
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
export interface PurchaseReservedInstanceOfferingRequest {
  ReservedInstanceOfferingId: string;
  ReservationName: string;
  InstanceCount?: number;
}
export interface PurchaseReservedInstanceOfferingResponse {
  ReservedInstanceId?: string;
  ReservationName?: string;
}
export interface PutDefaultApplicationSettingRequest {
  applicationArn: string;
  setAsDefault: boolean;
}
export interface PutDefaultApplicationSettingResponse {
  applicationArn?: string;
}
export type CapabilityBaseRequestConfig = { aiConfig: AIConfig };
export interface RegisterCapabilityRequest {
  applicationId: string;
  capabilityName: string;
  capabilityConfig: CapabilityBaseRequestConfig;
}
export type CapabilityBaseResponseConfig = { aiConfig: AIConfig };
export interface RegisterCapabilityResponse {
  capabilityName?: string;
  applicationId?: string;
  status?: CapabilityStatus;
  capabilityConfig?: CapabilityBaseResponseConfig;
}
export interface RejectInboundConnectionRequest {
  ConnectionId: string;
}
export interface RejectInboundConnectionResponse {
  Connection?: InboundConnection;
}
export interface RemoveTagsRequest {
  ARN: string;
  TagKeys: string[];
}
export interface RemoveTagsResponse {}
export interface RevokeVpcEndpointAccessRequest {
  DomainName: string;
  Account?: string;
  Service?: AWSServicePrincipal;
  ServiceOptions?: ServiceOptions;
}
export interface RevokeVpcEndpointAccessResponse {}
export interface RollbackServiceSoftwareUpdateRequest {
  DomainName: string;
}
export interface RollbackServiceSoftwareOptions {
  CurrentVersion?: string;
  NewVersion?: string;
  RollbackAvailable?: boolean;
  Description?: string;
}
export interface RollbackServiceSoftwareUpdateResponse {
  RollbackServiceSoftwareOptions?: RollbackServiceSoftwareOptions;
}
export interface StartDomainMaintenanceRequest {
  DomainName: string;
  Action: MaintenanceType;
  NodeId?: string;
}
export interface StartDomainMaintenanceResponse {
  MaintenanceId?: string;
}
export interface MigrationWorkspace {
  workspaceId?: string;
  createWorkspace?: boolean;
  name?: string;
  type?: string;
}
export interface SavedObjectIdentifier {
  type: string;
  id: string;
}
export type SavedObjectIdentifierList = SavedObjectIdentifier[];
export interface ExportOptions {
  types?: string[];
  objects?: SavedObjectIdentifier[];
  includeReferencesDeep?: boolean;
}
export interface MigrationOptions {
  source: MigrationSource;
  workspace: MigrationWorkspace;
  exportOptions?: ExportOptions;
  conflictResolution?: string;
}
export interface StartMigrationRequest {
  applicationId: string;
  migrationOptions: MigrationOptions;
  clientToken?: string;
}
export interface StartMigrationResponse {
  migrationId?: string;
  status?: string;
}
export type ScheduleAt =
  | "NOW"
  | "TIMESTAMP"
  | "OFF_PEAK_WINDOW"
  | (string & {});
export interface StartServiceSoftwareUpdateRequest {
  DomainName: string;
  ScheduleAt?: ScheduleAt;
  DesiredStartTime?: number;
}
export interface StartServiceSoftwareUpdateResponse {
  ServiceSoftwareOptions?: ServiceSoftwareOptions;
}
export interface UpdateApplicationRequest {
  id: string;
  dataSources?: DataSource[];
  appConfigs?: AppConfig[];
  iamIdentityCenterOptions?: IamIdentityCenterOptionsInput;
}
export interface UpdateApplicationResponse {
  id?: string;
  name?: string;
  arn?: string;
  dataSources?: DataSource[];
  iamIdentityCenterOptions?: IamIdentityCenterOptions;
  appConfigs?: AppConfig[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export interface UpdateDataSourceRequest {
  DomainName: string;
  Name: string;
  DataSourceType: DataSourceType;
  Description?: string;
  Status?: DataSourceStatus;
}
export interface UpdateDataSourceResponse {
  Message?: string;
}
export interface UpdateDirectQueryDataSourceRequest {
  DataSourceName: string;
  DataSourceType: DirectQueryDataSourceType;
  Description?: string;
  OpenSearchArns?: string[];
  DataSourceAccessPolicy?: string;
}
export interface UpdateDirectQueryDataSourceResponse {
  DataSourceArn?: string;
}
export type DryRunMode = "Basic" | "Verbose" | (string & {});
export interface UpdateDomainConfigRequest {
  DomainName: string;
  ClusterConfig?: ClusterConfig;
  EBSOptions?: EBSOptions;
  SnapshotOptions?: SnapshotOptions;
  VPCOptions?: VPCOptions;
  CognitoOptions?: CognitoOptions;
  AdvancedOptions?: { [key: string]: string | undefined };
  AccessPolicies?: string;
  IPAddressType?: IPAddressType;
  LogPublishingOptions?: { [key: string]: LogPublishingOption | undefined };
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  DomainEndpointOptions?: DomainEndpointOptions;
  NodeToNodeEncryptionOptions?: NodeToNodeEncryptionOptions;
  AdvancedSecurityOptions?: AdvancedSecurityOptionsInput;
  IdentityCenterOptions?: IdentityCenterOptionsInput;
  AutoTuneOptions?: AutoTuneOptions;
  DryRun?: boolean;
  DryRunMode?: DryRunMode;
  OffPeakWindowOptions?: OffPeakWindowOptions;
  SoftwareUpdateOptions?: SoftwareUpdateOptions;
  AIMLOptions?: AIMLOptionsInput;
  DeploymentStrategyOptions?: DeploymentStrategyOptions;
  AutomatedSnapshotPauseOptions?: AutomatedSnapshotPauseRequestOptions;
  UseCase?: DomainUseCase;
  EngineMode?: EngineMode;
}
export interface UpdateDomainConfigResponse {
  DomainConfig: DomainConfig;
  DryRunResults?: DryRunResults;
  DryRunProgressStatus?: DryRunProgressStatus;
}
export interface UpdateIndexRequest {
  DomainName: string;
  IndexName: string;
  IndexSchema: any;
}
export interface UpdateIndexResponse {
  Status: IndexStatus;
}
export interface UpdatePackageRequest {
  PackageID: string;
  PackageSource: PackageSource;
  PackageDescription?: string;
  CommitMessage?: string;
  PackageConfiguration?: PackageConfiguration;
  PackageEncryptionOptions?: PackageEncryptionOptions;
}
export interface UpdatePackageResponse {
  PackageDetails?: PackageDetails;
}
export type PackageScopeOperationEnum =
  | "ADD"
  | "OVERRIDE"
  | "REMOVE"
  | (string & {});
export interface UpdatePackageScopeRequest {
  PackageID: string;
  Operation: PackageScopeOperationEnum;
  PackageUserList: string[];
}
export interface UpdatePackageScopeResponse {
  PackageID?: string;
  Operation?: PackageScopeOperationEnum;
  PackageUserList?: string[];
}
export interface UpdateScheduledActionRequest {
  DomainName: string;
  ActionID: string;
  ActionType: ActionType;
  ScheduleAt: ScheduleAt;
  DesiredStartTime?: number;
}
export interface UpdateScheduledActionResponse {
  ScheduledAction?: ScheduledAction;
}
export interface UpdateVpcEndpointRequest {
  VpcEndpointId: string;
  VpcOptions: VPCOptions;
}
export interface UpdateVpcEndpointResponse {
  VpcEndpoint: VpcEndpoint;
}
export interface UpgradeDomainRequest {
  DomainName: string;
  TargetVersion: string;
  PerformCheckOnly?: boolean;
  AdvancedOptions?: { [key: string]: string | undefined };
}
export interface UpgradeDomainResponse {
  UpgradeId?: string;
  DomainName?: string;
  TargetVersion?: string;
  PerformCheckOnly?: boolean;
  AdvancedOptions?: { [key: string]: string | undefined };
  ChangeProgressDetails?: ChangeProgressDetails;
}
export type SlotList = number[];
export type AcceptInboundConnectionError =
  | DisabledOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination Amazon OpenSearch Service domain owner to accept an inbound
 * cross-cluster search connection request. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const acceptInboundConnection: API.OperationMethod<
  AcceptInboundConnectionRequest,
  AcceptInboundConnectionResponse,
  AcceptInboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/cc/inboundConnection/{ConnectionId}/accept",
    input: { ConnectionId: 0 },
  },
  errors: [
    DisabledOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInboundConnection",
})) as any;

export type AddDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new direct-query data source to the specified domain. For more information,
 * see Creating Amazon OpenSearch Service data source integrations with Amazon
 * S3.
 */
export const addDataSource: API.OperationMethod<
  AddDataSourceRequest,
  AddDataSourceResponse,
  AddDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain/{DomainName}/dataSource",
    input: {
      DomainName: 0,
      Name: 0,
      DataSourceType: i_DataSourceType,
      Description: 0,
    },
    body: true,
  },
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddDataSource",
})) as any;

export type AddDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new data source in Amazon OpenSearch Service so that you can perform direct
 * queries on external data.
 */
export const addDirectQueryDataSource: API.OperationMethod<
  AddDirectQueryDataSourceRequest,
  AddDirectQueryDataSourceResponse,
  AddDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/directQueryDataSource",
    input: {
      DataSourceName: 0,
      DataSourceType: i_DirectQueryDataSourceType,
      Description: 0,
      OpenSearchArns: 0,
      DataSourceAccessPolicy: 0,
      TagList: D.list(i_Tag),
    },
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
  operationName: "AddDirectQueryDataSource",
})) as any;

export type AddTagsError =
  | BaseException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Attaches tags to an existing Amazon OpenSearch Service domain, data source, or
 * application.
 *
 * Tags are a set of case-sensitive key-value pairs. A domain, data source, or
 * application can have up to 10 tags. For more information, see Tagging Amazon OpenSearch Service resources.
 */
export const addTags: API.OperationMethod<
  AddTagsRequest,
  AddTagsResponse,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/tags",
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
 * Associates a package with an Amazon OpenSearch Service domain. For more information,
 * see Custom packages
 * for Amazon OpenSearch Service.
 */
export const associatePackage: API.OperationMethod<
  AssociatePackageRequest,
  AssociatePackageResponse,
  AssociatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/packages/associate/{PackageID}/{DomainName}",
    input: {
      PackageID: 0,
      DomainName: 0,
      PrerequisitePackageIDList: 0,
      AssociationConfiguration: i_PackageAssociationConfiguration,
    },
    output: { DomainPackageDetails: o_DomainPackageDetails },
    body: true,
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

export type AssociatePackagesError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Operation in the Amazon OpenSearch Service API for associating multiple packages with
 * a domain simultaneously.
 */
export const associatePackages: API.OperationMethod<
  AssociatePackagesRequest,
  AssociatePackagesResponse,
  AssociatePackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/packages/associateMultiple",
    input: {
      PackageList: D.list({
        PackageID: 0,
        PrerequisitePackageIDList: 0,
        AssociationConfiguration: i_PackageAssociationConfiguration,
      }),
      DomainName: 0,
    },
    output: { DomainPackageDetailsList: D.list(o_DomainPackageDetails) },
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
  operationName: "AssociatePackages",
})) as any;

export type AttachDataSourceError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a data source to an OpenSearch application. The data source must be an Amazon OpenSearch Service domain. If both the application and the data source are active, the attachment completes immediately with a status of `ATTACHED`. Otherwise, the operation returns `PENDING` and completes the attachment automatically once both become active. If the attachment cannot be completed, its status becomes `FAILED`. This operation is idempotent: If the data source is already attached or pending, the operation returns the existing attachment.
 */
export const attachDataSource: API.OperationMethod<
  AttachDataSourceRequest,
  AttachDataSourceResponse,
  AttachDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/application/{id}/attachDataSource",
    input: {
      id: 0,
      dataSourceArn: 0,
      workspaceId: 0,
      workspaceConfiguration: { name: 0, workspaceType: 0 },
      clientToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachDataSource",
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
 * Provides access to an Amazon OpenSearch Service domain through the use of an interface
 * VPC endpoint.
 */
export const authorizeVpcEndpointAccess: API.OperationMethod<
  AuthorizeVpcEndpointAccessRequest,
  AuthorizeVpcEndpointAccessResponse,
  AuthorizeVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain/{DomainName}/authorizeVpcEndpointAccess",
    input: {
      DomainName: 0,
      Account: 0,
      Service: 0,
      ServiceOptions: i_ServiceOptions,
    },
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
    http: "POST /2021-01-01/opensearch/domain/{DomainName}/config/cancel",
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

export type CancelServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a scheduled service software update for an Amazon OpenSearch Service domain.
 * You can only perform this operation before the `AutomatedUpdateDate` and when
 * the domain's `UpdateStatus` is `PENDING_UPDATE`. For more
 * information, see Service
 * software updates in Amazon OpenSearch Service.
 */
export const cancelServiceSoftwareUpdate: API.OperationMethod<
  CancelServiceSoftwareUpdateRequest,
  CancelServiceSoftwareUpdateResponse,
  CancelServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/serviceSoftwareUpdate/cancel",
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
  operationName: "CancelServiceSoftwareUpdate",
})) as any;

export type CreateApplicationError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OpenSearch UI application. For more information, see Using the OpenSearch user interface in Amazon OpenSearch Service.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/application",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      dataSources: D.list(i_DataSource),
      iamIdentityCenterOptions: i_IamIdentityCenterOptionsInput,
      appConfigs: D.list(i_AppConfig),
      tagList: D.list(i_Tag),
      kmsKeyArn: 0,
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon OpenSearch Service domain. For more information, see Creating and
 * managing Amazon OpenSearch Service domains.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain",
    input: {
      DomainName: 0,
      EngineVersion: 0,
      ClusterConfig: i_ClusterConfig,
      EBSOptions: i_EBSOptions,
      AccessPolicies: 0,
      IPAddressType: 0,
      SnapshotOptions: i_SnapshotOptions,
      VPCOptions: i_VPCOptions,
      CognitoOptions: i_CognitoOptions,
      EncryptionAtRestOptions: i_EncryptionAtRestOptions,
      NodeToNodeEncryptionOptions: i_NodeToNodeEncryptionOptions,
      AdvancedOptions: 0,
      LogPublishingOptions: D.map(i_LogPublishingOption),
      DomainEndpointOptions: i_DomainEndpointOptions,
      AdvancedSecurityOptions: i_AdvancedSecurityOptionsInput,
      IdentityCenterOptions: i_IdentityCenterOptionsInput,
      TagList: D.list(i_Tag),
      AutoTuneOptions: {
        DesiredState: 0,
        MaintenanceSchedules: D.list(i_AutoTuneMaintenanceSchedule),
        UseOffPeakWindow: 0,
      },
      OffPeakWindowOptions: i_OffPeakWindowOptions,
      SoftwareUpdateOptions: i_SoftwareUpdateOptions,
      AIMLOptions: i_AIMLOptionsInput,
      DeploymentStrategyOptions: i_DeploymentStrategyOptions,
      AutomatedSnapshotPauseOptions: i_AutomatedSnapshotPauseRequestOptions,
      UseCase: 0,
      EngineMode: 0,
    },
    output: { DomainStatus: o_DomainStatus },
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
  operationName: "CreateDomain",
})) as any;

export type CreateIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OpenSearch index with optional automatic semantic enrichment for specified text fields. Automatic semantic enrichment enables semantic search capabilities without requiring machine learning expertise, improving search relevance by up to 20% by understanding search intent and contextual meaning beyond keyword matching. The semantic enrichment process has zero impact on search latency as sparse encodings are stored directly within the index during indexing. For more information, see Automatic semantic enrichment.
 */
export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain/{DomainName}/index",
    input: { DomainName: 0, IndexName: 0, IndexSchema: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
})) as any;

export type CreateOutboundConnectionError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a new cross-cluster search connection from a source Amazon OpenSearch Service domain
 * to a destination domain. For more information, see Cross-cluster search
 * for Amazon OpenSearch Service.
 */
export const createOutboundConnection: API.OperationMethod<
  CreateOutboundConnectionRequest,
  CreateOutboundConnectionResponse,
  CreateOutboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/cc/outboundConnection",
    input: {
      LocalDomainInfo: i_DomainInformationContainer,
      RemoteDomainInfo: i_DomainInformationContainer,
      ConnectionAlias: 0,
      ConnectionMode: 0,
      ConnectionProperties: {
        Endpoint: 0,
        CrossClusterSearch: { SkipUnavailable: 0 },
      },
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
  operationName: "CreateOutboundConnection",
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
 * Creates a package for use with Amazon OpenSearch Service domains. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
 */
export const createPackage: API.OperationMethod<
  CreatePackageRequest,
  CreatePackageResponse,
  CreatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/packages",
    input: {
      PackageName: 0,
      PackageType: 0,
      PackageDescription: 0,
      PackageSource: i_PackageSource,
      PackageConfiguration: i_PackageConfiguration,
      EngineVersion: 0,
      PackageVendingOptions: { VendingEnabled: 0 },
      PackageEncryptionOptions: i_PackageEncryptionOptions,
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
    http: "POST /2021-01-01/opensearch/vpcEndpoints",
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

export type DeleteApplicationError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified OpenSearch application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/application/{id}",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a direct-query data source. For more information, see Deleting
 * an Amazon OpenSearch Service data source with Amazon S3.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/domain/{DomainName}/dataSource/{Name}",
    input: { DomainName: 0, Name: 0 },
  },
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
})) as any;

export type DeleteDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a previously configured direct query data source from Amazon OpenSearch
 * Service.
 */
export const deleteDirectQueryDataSource: API.OperationMethod<
  DeleteDirectQueryDataSourceRequest,
  DeleteDirectQueryDataSourceResponse,
  DeleteDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/directQueryDataSource/{DataSourceName}",
    input: { DataSourceName: 0 },
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
  operationName: "DeleteDirectQueryDataSource",
})) as any;

export type DeleteDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon OpenSearch Service domain and all of its data. You can't recover a
 * domain after you delete it.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/domain/{DomainName}",
    input: { DomainName: 0 },
    output: { DomainStatus: o_DomainStatus },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
})) as any;

export type DeleteInboundConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the destination Amazon OpenSearch Service domain owner to delete an existing
 * inbound cross-cluster search connection. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const deleteInboundConnection: API.OperationMethod<
  DeleteInboundConnectionRequest,
  DeleteInboundConnectionResponse,
  DeleteInboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/cc/inboundConnection/{ConnectionId}",
    input: { ConnectionId: 0 },
  },
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInboundConnection",
})) as any;

export type DeleteIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch index. This operation permanently removes the index and cannot be undone.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/domain/{DomainName}/index/{IndexName}",
    input: { DomainName: 0, IndexName: 0 },
  },
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndex",
})) as any;

export type DeleteOutboundConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the source Amazon OpenSearch Service domain owner to delete an existing
 * outbound cross-cluster search connection. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const deleteOutboundConnection: API.OperationMethod<
  DeleteOutboundConnectionRequest,
  DeleteOutboundConnectionResponse,
  DeleteOutboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/cc/outboundConnection/{ConnectionId}",
    input: { ConnectionId: 0 },
  },
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutboundConnection",
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
 * Deletes an Amazon OpenSearch Service package. For more information, see Custom packages
 * for Amazon OpenSearch Service.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResponse,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/packages/{PackageID}",
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
    http: "DELETE /2021-01-01/opensearch/vpcEndpoints/{VpcEndpointId}",
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

export type DeregisterCapabilityError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters a capability from an OpenSearch UI application. This operation removes the capability and its associated configuration.
 */
export const deregisterCapability: API.OperationMethod<
  DeregisterCapabilityRequest,
  DeregisterCapabilityResponse,
  DeregisterCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /2021-01-01/opensearch/application/{applicationId}/capability/deregister/{capabilityName}",
    input: { applicationId: 0, capabilityName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterCapability",
})) as any;

export type DescribeDataSourceAttachmentError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current status and details of a specific data source attachment for an OpenSearch application. Throws a `ResourceNotFoundException` if no attachment record exists for the specified application and data source combination.
 */
export const describeDataSourceAttachment: API.OperationMethod<
  DescribeDataSourceAttachmentRequest,
  DescribeDataSourceAttachmentResponse,
  DescribeDataSourceAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/application/{id}/describeDataSourceAttachment",
    input: { id: 0, dataSourceArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSourceAttachment",
})) as any;

export type DescribeDomainError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the domain configuration for the specified Amazon OpenSearch Service domain,
 * including the domain ID, domain service endpoint, and domain ARN.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainRequest,
  DescribeDomainResponse,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}",
    input: { DomainName: 0 },
    output: { DomainStatus: o_DomainStatus },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomain",
})) as any;

export type DescribeDomainAutoTunesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of optimizations that Auto-Tune has made to an Amazon OpenSearch
 * Service domain. For more information, see Auto-Tune for Amazon
 * OpenSearch Service.
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
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/autoTunes",
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
 * Returns information about the current blue/green deployment happening on an Amazon
 * OpenSearch Service domain. For more information, see Making configuration changes in Amazon OpenSearch Service.
 */
export const describeDomainChangeProgress: API.OperationMethod<
  DescribeDomainChangeProgressRequest,
  DescribeDomainChangeProgressResponse,
  DescribeDomainChangeProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/progress",
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

export type DescribeDomainConfigError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the configuration of an Amazon OpenSearch Service domain.
 */
export const describeDomainConfig: API.OperationMethod<
  DescribeDomainConfigRequest,
  DescribeDomainConfigResponse,
  DescribeDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/config",
    input: { DomainName: 0 },
    output: { DomainConfig: o_DomainConfig },
  },
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainConfig",
})) as any;

export type DescribeDomainHealthError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about domain and node health, the standby Availability Zone,
 * number of nodes per Availability Zone, and shard count per node.
 */
export const describeDomainHealth: API.OperationMethod<
  DescribeDomainHealthRequest,
  DescribeDomainHealthResponse,
  DescribeDomainHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/health",
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
  operationName: "DescribeDomainHealth",
})) as any;

export type DescribeDomainNodesError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about domain and nodes, including data nodes, master nodes,
 * ultrawarm nodes, Availability Zone(s), standby nodes, node configurations, and node
 * states.
 */
export const describeDomainNodes: API.OperationMethod<
  DescribeDomainNodesRequest,
  DescribeDomainNodesResponse,
  DescribeDomainNodesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/nodes",
    input: { DomainName: 0 },
  },
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainNodes",
})) as any;

export type DescribeDomainsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Returns domain configuration information about the specified Amazon OpenSearch Service
 * domains.
 */
export const describeDomains: API.OperationMethod<
  DescribeDomainsRequest,
  DescribeDomainsResponse,
  DescribeDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain-info",
    input: { DomainNames: 0 },
    output: { DomainStatusList: D.list(o_DomainStatus) },
    body: true,
  },
  errors: [BaseException, InternalException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomains",
})) as any;

export type DescribeDryRunProgressError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the progress of a pre-update dry run analysis on an Amazon OpenSearch
 * Service domain. For more information, see Determining whether a change will cause a blue/green deployment.
 */
export const describeDryRunProgress: API.OperationMethod<
  DescribeDryRunProgressRequest,
  DescribeDryRunProgressResponse,
  DescribeDryRunProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/dryRun",
    input: {
      DomainName: 0,
      DryRunId: D.m({ query: "dryRunId" }),
      LoadDryRunConfig: D.m({ query: "loadDryRunConfig" }),
    },
    output: { DryRunConfig: o_DomainStatus },
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
  operationName: "DescribeDryRunProgress",
})) as any;

export type DescribeInboundConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the inbound cross-cluster search connections for a destination (remote)
 * Amazon OpenSearch Service domain. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const describeInboundConnections: API.PaginatedOperationMethod<
  DescribeInboundConnectionsRequest,
  DescribeInboundConnectionsResponse,
  DescribeInboundConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/cc/inboundConnection/search",
    input: { Filters: D.list(i_Filter), MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInsightDetailsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the details of an existing insight for an Amazon OpenSearch Service domain.
 * Returns detailed fields associated with the specified insight, such as text descriptions
 * and metric data.
 */
export const describeInsightDetails: API.OperationMethod<
  DescribeInsightDetailsRequest,
  DescribeInsightDetailsResponse,
  DescribeInsightDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/insight-details",
    input: { Entity: i_InsightEntity, InsightId: 0, ShowHtmlContent: 0 },
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
  operationName: "DescribeInsightDetails",
})) as any;

export type DescribeInstanceTypeLimitsError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the instance count, storage, and master node limits for a given OpenSearch
 * or Elasticsearch version and instance type.
 */
export const describeInstanceTypeLimits: API.OperationMethod<
  DescribeInstanceTypeLimitsRequest,
  DescribeInstanceTypeLimitsResponse,
  DescribeInstanceTypeLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/instanceTypeLimits/{EngineVersion}/{InstanceType}",
    input: {
      DomainName: D.m({ query: "domainName" }),
      InstanceType: 0,
      EngineVersion: 0,
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
  operationName: "DescribeInstanceTypeLimits",
})) as any;

export type DescribeOutboundConnectionsError =
  | DisabledOperationException
  | InvalidPaginationTokenException
  | CommonErrors;
/**
 * Lists all the outbound cross-cluster connections for a local (source) Amazon
 * OpenSearch Service domain. For more information, see Cross-cluster search for Amazon OpenSearch Service.
 */
export const describeOutboundConnections: API.PaginatedOperationMethod<
  DescribeOutboundConnectionsRequest,
  DescribeOutboundConnectionsResponse,
  DescribeOutboundConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/cc/outboundConnection/search",
    input: { Filters: D.list(i_Filter), MaxResults: 0, NextToken: 0 },
    body: true,
  },
  errors: [DisabledOperationException, InvalidPaginationTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOutboundConnections",
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
 * Describes all packages available to OpenSearch Service. For more information, see
 * Custom packages
 * for Amazon OpenSearch Service.
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
    http: "POST /2021-01-01/packages/describe",
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

export type DescribeReservedInstanceOfferingsError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the available Amazon OpenSearch Service Reserved Instance offerings for a
 * given Region. For more information, see Reserved Instances in Amazon
 * OpenSearch Service.
 */
export const describeReservedInstanceOfferings: API.PaginatedOperationMethod<
  DescribeReservedInstanceOfferingsRequest,
  DescribeReservedInstanceOfferingsResponse,
  DescribeReservedInstanceOfferingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/reservedInstanceOfferings",
    input: {
      ReservedInstanceOfferingId: D.m({ query: "offeringId" }),
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
  operationName: "DescribeReservedInstanceOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeReservedInstancesError =
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the Amazon OpenSearch Service instances that you have reserved in a given
 * Region. For more information, see Reserved Instances in Amazon
 * OpenSearch Service.
 */
export const describeReservedInstances: API.PaginatedOperationMethod<
  DescribeReservedInstancesRequest,
  DescribeReservedInstancesResponse,
  DescribeReservedInstancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/reservedInstances",
    input: {
      ReservedInstanceId: D.m({ query: "reservationId" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { ReservedInstances: D.list({ StartTime: D.ts }) },
  },
  errors: [
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedInstances",
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
    http: "POST /2021-01-01/opensearch/vpcEndpoints/describe",
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

export type DetachDataSourceError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a data source from an OpenSearch application. The application must be in the `ACTIVE` state. This operation removes the data source saved object from the application and deletes the attachment record. Throws a `ConflictException` if the specified data source has a `PENDING` attachment, and a `ResourceNotFoundException` if the data source is not currently attached to the application.
 */
export const detachDataSource: API.OperationMethod<
  DetachDataSourceRequest,
  DetachDataSourceResponse,
  DetachDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/application/{id}/detachDataSource",
    input: { id: 0, dataSourceArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachDataSource",
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
 * Removes a package from the specified Amazon OpenSearch Service domain. The package
 * can't be in use with any OpenSearch index for the dissociation to succeed. The package
 * is still available in OpenSearch Service for association later. For more information,
 * see Custom packages
 * for Amazon OpenSearch Service.
 */
export const dissociatePackage: API.OperationMethod<
  DissociatePackageRequest,
  DissociatePackageResponse,
  DissociatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/packages/dissociate/{PackageID}/{DomainName}",
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

export type DissociatePackagesError =
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Dissociates multiple packages from a domain simultaneously.
 */
export const dissociatePackages: API.OperationMethod<
  DissociatePackagesRequest,
  DissociatePackagesResponse,
  DissociatePackagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/packages/dissociateMultiple",
    input: { PackageList: 0, DomainName: 0 },
    output: { DomainPackageDetailsList: D.list(o_DomainPackageDetails) },
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
  operationName: "DissociatePackages",
})) as any;

export type GetApplicationError =
  | AccessDeniedException
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration and status of an existing OpenSearch application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/application/{id}",
    input: { id: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
})) as any;

export type GetCapabilityError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a registered capability for an OpenSearch UI application, including its configuration and current status.
 */
export const getCapability: API.OperationMethod<
  GetCapabilityRequest,
  GetCapabilityResponse,
  GetCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/application/{applicationId}/capability/{capabilityName}",
    input: { applicationId: 0, capabilityName: 0 },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapability",
})) as any;

export type GetCompatibleVersionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a map of OpenSearch or Elasticsearch versions and the versions you can upgrade
 * them to.
 */
export const getCompatibleVersions: API.OperationMethod<
  GetCompatibleVersionsRequest,
  GetCompatibleVersionsResponse,
  GetCompatibleVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/compatibleVersions",
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
  operationName: "GetCompatibleVersions",
})) as any;

export type GetDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a direct query data source.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceRequest,
  GetDataSourceResponse,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/dataSource/{Name}",
    input: { DomainName: 0, Name: 0 },
  },
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
})) as any;

export type GetDefaultApplicationSettingError =
  | AccessDeniedException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the ARN of the current default application.
 *
 * If the default application isn't set, the operation returns a resource not found
 * error.
 */
export const getDefaultApplicationSetting: API.OperationMethod<
  GetDefaultApplicationSettingRequest,
  GetDefaultApplicationSettingResponse,
  GetDefaultApplicationSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/defaultApplicationSetting",
    input: {},
  },
  errors: [
    AccessDeniedException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultApplicationSetting",
})) as any;

export type GetDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed configuration information for a specific direct query data source in
 * Amazon OpenSearch Service.
 */
export const getDirectQueryDataSource: API.OperationMethod<
  GetDirectQueryDataSourceRequest,
  GetDirectQueryDataSourceResponse,
  GetDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/directQueryDataSource/{DataSourceName}",
    input: { DataSourceName: 0 },
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
  operationName: "GetDirectQueryDataSource",
})) as any;

export type GetDomainMaintenanceStatusError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The status of the maintenance action.
 */
export const getDomainMaintenanceStatus: API.OperationMethod<
  GetDomainMaintenanceStatusRequest,
  GetDomainMaintenanceStatusResponse,
  GetDomainMaintenanceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/domainMaintenance",
    input: { DomainName: 0, MaintenanceId: D.m({ query: "maintenanceId" }) },
    output: { CreatedAt: D.ts, UpdatedAt: D.ts },
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
  operationName: "GetDomainMaintenanceStatus",
})) as any;

export type GetIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an OpenSearch index including its schema and semantic enrichment configuration. Use this operation to view the current index structure and semantic search settings.
 */
export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexResponse,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/index/{IndexName}",
    input: { DomainName: 0, IndexName: 0 },
  },
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
})) as any;

export type GetMigrationError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current status and progress of a migration job, including the number of exported and imported objects and error details if the migration failed.
 */
export const getMigration: API.OperationMethod<
  GetMigrationRequest,
  GetMigrationResponse,
  GetMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/app-migrations/{migrationId}",
    input: { migrationId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMigration",
})) as any;

export type GetPackageVersionHistoryError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Amazon OpenSearch Service package versions, along with their creation
 * time, commit message, and plugin properties (if the package is a zip plugin package). For more
 * information, see Custom packages for Amazon
 * OpenSearch Service.
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
    http: "GET /2021-01-01/packages/{PackageID}/history",
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
 * Retrieves the complete history of the last 10 upgrades performed on an Amazon OpenSearch
 * Service domain.
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
    http: "GET /2021-01-01/opensearch/upgradeDomain/{DomainName}/history",
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
 * Returns the most recent status of the last upgrade or upgrade eligibility check performed on
 * an Amazon OpenSearch Service domain.
 */
export const getUpgradeStatus: API.OperationMethod<
  GetUpgradeStatusRequest,
  GetUpgradeStatusResponse,
  GetUpgradeStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/upgradeDomain/{DomainName}/status",
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

export type InsightFeedbackError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Submits feedback for an existing insight in an Amazon OpenSearch Service domain.
 * Allows users to provide a thumbs up or thumbs down rating and optional text feedback
 * for a specific insight.
 */
export const insightFeedback: API.OperationMethod<
  InsightFeedbackRequest,
  InsightFeedbackResponse,
  InsightFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/insight-feedback",
    input: {
      Entity: { Type: 0, Value: 0 },
      InsightId: 0,
      Thumbs: 0,
      FeedbackText: 0,
    },
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
  operationName: "InsightFeedback",
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all OpenSearch applications under your account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/list-applications",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      statuses: D.m({ query: "statuses" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      ApplicationSummaries: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    BaseException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ApplicationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourceAttachmentsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of all data source attachments for an OpenSearch application, including attachments in all states (`PENDING`, `ATTACHED`, and `FAILED`).
 */
export const listDataSourceAttachments: API.OperationMethod<
  ListDataSourceAttachmentsRequest,
  ListDataSourceAttachmentsResponse,
  ListDataSourceAttachmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/application/{id}/listDataSourceAttachments",
    input: { id: 0, nextToken: 0, maxResults: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSourceAttachments",
})) as any;

export type ListDataSourcesError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists direct-query data sources for a specific domain. For more information, see For
 * more information, see Working with
 * Amazon OpenSearch Service direct queries with Amazon S3.
 */
export const listDataSources: API.OperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/dataSource",
    input: { DomainName: 0 },
  },
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
})) as any;

export type ListDirectQueryDataSourcesError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists an inventory of all the direct query data sources that you have configured
 * within Amazon OpenSearch Service.
 */
export const listDirectQueryDataSources: API.OperationMethod<
  ListDirectQueryDataSourcesRequest,
  ListDirectQueryDataSourcesResponse,
  ListDirectQueryDataSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/directQueryDataSource",
    input: { NextToken: D.m({ query: "nexttoken" }) },
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
  operationName: "ListDirectQueryDataSources",
})) as any;

export type ListDomainMaintenancesError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * A list of maintenance actions for the domain.
 */
export const listDomainMaintenances: API.PaginatedOperationMethod<
  ListDomainMaintenancesRequest,
  ListDomainMaintenancesResponse,
  ListDomainMaintenancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/domainMaintenances",
    input: {
      DomainName: 0,
      Action: D.m({ query: "action" }),
      Status: D.m({ query: "status" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      DomainMaintenances: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
    },
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
  operationName: "ListDomainMaintenances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDomainNamesError =
  | BaseException
  | ValidationException
  | CommonErrors;
/**
 * Returns the names of all Amazon OpenSearch Service domains owned by the current user
 * in the active Region.
 */
export const listDomainNames: API.OperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/domain",
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
 * Lists all Amazon OpenSearch Service domains associated with a given package. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
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
    http: "GET /2021-01-01/packages/{PackageID}/domains",
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

export type ListInsightsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists insights for an Amazon OpenSearch Service domain or Amazon Web Services account.
 * Returns a paginated list of insights based on the specified entity, filters, time range,
 * and sort order.
 */
export const listInsights: API.OperationMethod<
  ListInsightsRequest,
  ListInsightsResponse,
  ListInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/insights",
    input: {
      Entity: i_InsightEntity,
      TimeRange: { From: 0, To: 0 },
      SortOrder: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Insights: D.list({ CreationTime: D.ts, UpdateTime: D.ts }) },
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
  operationName: "ListInsights",
})) as any;

export type ListInstanceTypeDetailsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all instance types and available features for a given OpenSearch or
 * Elasticsearch version.
 */
export const listInstanceTypeDetails: API.PaginatedOperationMethod<
  ListInstanceTypeDetailsRequest,
  ListInstanceTypeDetailsResponse,
  ListInstanceTypeDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/instanceTypeDetails/{EngineVersion}",
    input: {
      EngineVersion: 0,
      DomainName: D.m({ query: "domainName" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      RetrieveAZs: D.m({ query: "retrieveAZs" }),
      InstanceType: D.m({ query: "instanceType" }),
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
  operationName: "ListInstanceTypeDetails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMigrationsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists migration jobs for an Amazon OpenSearch Service application. You can filter results by migration status. Use pagination to ensure that the operation returns quickly and successfully.
 */
export const listMigrations: API.OperationMethod<
  ListMigrationsRequest,
  ListMigrationsResponse,
  ListMigrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/app-migrations",
    input: {
      applicationId: D.m({ query: "applicationId" }),
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { migrations: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMigrations",
})) as any;

export type ListPackagesForDomainError =
  | AccessDeniedException
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all packages associated with an Amazon OpenSearch Service domain. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
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
    http: "GET /2021-01-01/domain/{DomainName}/packages",
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

export type ListScheduledActionsError =
  | BaseException
  | InternalException
  | InvalidPaginationTokenException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of configuration changes that are scheduled for a domain. These
 * changes can be service
 * software updates or blue/green Auto-Tune enhancements.
 */
export const listScheduledActions: API.PaginatedOperationMethod<
  ListScheduledActionsRequest,
  ListScheduledActionsResponse,
  ListScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/scheduledActions",
    input: {
      DomainName: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    BaseException,
    InternalException,
    InvalidPaginationTokenException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledActions",
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
 * Returns all resource tags for an Amazon OpenSearch Service domain, data source, or
 * application. For more information, see Tagging Amazon OpenSearch Service resources.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/tags",
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

export type ListVersionsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all versions of OpenSearch and Elasticsearch that Amazon OpenSearch Service
 * supports.
 */
export const listVersions: API.PaginatedOperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/versions",
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
  operationName: "ListVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVpcEndpointAccessError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about each Amazon Web Services principal that is allowed to
 * access a given Amazon OpenSearch Service domain through the use of an interface VPC
 * endpoint.
 */
export const listVpcEndpointAccess: API.OperationMethod<
  ListVpcEndpointAccessRequest,
  ListVpcEndpointAccessResponse,
  ListVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/listVpcEndpointAccess",
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
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints in the current Amazon Web Services account and Region.
 */
export const listVpcEndpoints: API.OperationMethod<
  ListVpcEndpointsRequest,
  ListVpcEndpointsResponse,
  ListVpcEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/vpcEndpoints",
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
 * Retrieves all Amazon OpenSearch Service-managed VPC endpoints associated with a
 * particular domain.
 */
export const listVpcEndpointsForDomain: API.OperationMethod<
  ListVpcEndpointsForDomainRequest,
  ListVpcEndpointsForDomainResponse,
  ListVpcEndpointsForDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /2021-01-01/opensearch/domain/{DomainName}/vpcEndpoints",
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

export type PurchaseReservedInstanceOfferingError =
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to purchase Amazon OpenSearch Service Reserved Instances.
 */
export const purchaseReservedInstanceOffering: API.OperationMethod<
  PurchaseReservedInstanceOfferingRequest,
  PurchaseReservedInstanceOfferingResponse,
  PurchaseReservedInstanceOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/purchaseReservedInstanceOffering",
    input: {
      ReservedInstanceOfferingId: 0,
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
  operationName: "PurchaseReservedInstanceOffering",
})) as any;

export type PutDefaultApplicationSettingError =
  | AccessDeniedException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Sets the default application to the application with the specified ARN.
 *
 * To remove the default application, use the `GetDefaultApplicationSetting`
 * operation to get the current default and then call the
 * `PutDefaultApplicationSetting` with the current applications ARN and the
 * `setAsDefault` parameter set to `false`.
 */
export const putDefaultApplicationSetting: API.OperationMethod<
  PutDefaultApplicationSettingRequest,
  PutDefaultApplicationSettingResponse,
  PutDefaultApplicationSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/defaultApplicationSetting",
    input: { applicationArn: 0, setAsDefault: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDefaultApplicationSetting",
})) as any;

export type RegisterCapabilityError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Registers a capability for an OpenSearch UI application. Use this operation to enable specific capabilities, such as AI features, for a given application. The capability configuration defines the type and settings of the capability to register. For more information about the AI features, see Agentic AI for OpenSearch UI.
 */
export const registerCapability: API.OperationMethod<
  RegisterCapabilityRequest,
  RegisterCapabilityResponse,
  RegisterCapabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/application/{applicationId}/capability/register",
    input: {
      applicationId: 0,
      capabilityName: 0,
      capabilityConfig: { aiConfig: {} },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCapability",
})) as any;

export type RejectInboundConnectionError =
  | DisabledOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Allows the remote Amazon OpenSearch Service domain owner to reject an inbound
 * cross-cluster connection request.
 */
export const rejectInboundConnection: API.OperationMethod<
  RejectInboundConnectionRequest,
  RejectInboundConnectionResponse,
  RejectInboundConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/cc/inboundConnection/{ConnectionId}/reject",
    input: { ConnectionId: 0 },
  },
  errors: [DisabledOperationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInboundConnection",
})) as any;

export type RemoveTagsError =
  | BaseException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified set of tags from an Amazon OpenSearch Service domain, data
 * source, or application. For more information, see Tagging Amazon OpenSearch Service resources.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsRequest,
  RemoveTagsResponse,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/tags-removal",
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
 * Revokes access to an Amazon OpenSearch Service domain that was provided through an
 * interface VPC endpoint.
 */
export const revokeVpcEndpointAccess: API.OperationMethod<
  RevokeVpcEndpointAccessRequest,
  RevokeVpcEndpointAccessResponse,
  RevokeVpcEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain/{DomainName}/revokeVpcEndpointAccess",
    input: {
      DomainName: 0,
      Account: 0,
      Service: 0,
      ServiceOptions: i_ServiceOptions,
    },
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

export type RollbackServiceSoftwareUpdateError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Rolls back a service software update for a domain to the previous version. For more
 * information, see Service
 * software updates in Amazon OpenSearch Service.
 */
export const rollbackServiceSoftwareUpdate: API.OperationMethod<
  RollbackServiceSoftwareUpdateRequest,
  RollbackServiceSoftwareUpdateResponse,
  RollbackServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/serviceSoftwareUpdate/rollback",
    input: { DomainName: 0 },
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
  operationName: "RollbackServiceSoftwareUpdate",
})) as any;

export type StartDomainMaintenanceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the node maintenance process on the data node. These processes can include a
 * node reboot, an Opensearch or Elasticsearch process restart, or a Dashboard or Kibana
 * restart.
 */
export const startDomainMaintenance: API.OperationMethod<
  StartDomainMaintenanceRequest,
  StartDomainMaintenanceResponse,
  StartDomainMaintenanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain/{DomainName}/domainMaintenance",
    input: { DomainName: 0, Action: 0, NodeId: 0 },
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
  operationName: "StartDomainMaintenance",
})) as any;

export type StartMigrationError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a migration job to migrate saved objects from a data source to an Amazon OpenSearch Service application workspace. Saved objects include dashboards, visualizations, index patterns, and searches. You can specify export filters to control the scope of the migration and a conflict resolution strategy for handling existing objects in the target workspace.
 */
export const startMigration: API.OperationMethod<
  StartMigrationRequest,
  StartMigrationResponse,
  StartMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/app-migrations",
    input: {
      applicationId: 0,
      migrationOptions: {
        source: { datasourceArn: 0 },
        workspace: { workspaceId: 0, createWorkspace: 0, name: 0, type: 0 },
        exportOptions: {
          types: 0,
          objects: D.list({ type: 0, id: 0 }),
          includeReferencesDeep: 0,
        },
        conflictResolution: 0,
      },
      clientToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMigration",
})) as any;

export type StartServiceSoftwareUpdateError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Schedules a service software update for an Amazon OpenSearch Service domain. For more
 * information, see Service
 * software updates in Amazon OpenSearch Service.
 */
export const startServiceSoftwareUpdate: API.OperationMethod<
  StartServiceSoftwareUpdateRequest,
  StartServiceSoftwareUpdateResponse,
  StartServiceSoftwareUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/serviceSoftwareUpdate/start",
    input: { DomainName: 0, ScheduleAt: 0, DesiredStartTime: 0 },
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
  operationName: "StartServiceSoftwareUpdate",
})) as any;

export type UpdateApplicationError =
  | AccessDeniedException
  | BaseException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration and settings of an existing OpenSearch application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/application/{id}",
    input: {
      id: 0,
      dataSources: D.list(i_DataSource),
      appConfigs: D.list(i_AppConfig),
      iamIdentityCenterOptions: i_IamIdentityCenterOptionsInput,
    },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BaseException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateDataSourceError =
  | BaseException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a direct-query data source. For more information, see Working
 * with Amazon OpenSearch Service data source integrations with Amazon
 * S3.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/domain/{DomainName}/dataSource/{Name}",
    input: {
      DomainName: 0,
      Name: 0,
      DataSourceType: i_DataSourceType,
      Description: 0,
      Status: 0,
    },
    body: true,
  },
  errors: [
    BaseException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
})) as any;

export type UpdateDirectQueryDataSourceError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration or properties of an existing direct query data source in
 * Amazon OpenSearch Service.
 */
export const updateDirectQueryDataSource: API.OperationMethod<
  UpdateDirectQueryDataSourceRequest,
  UpdateDirectQueryDataSourceResponse,
  UpdateDirectQueryDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/directQueryDataSource/{DataSourceName}",
    input: {
      DataSourceName: 0,
      DataSourceType: i_DirectQueryDataSourceType,
      Description: 0,
      OpenSearchArns: 0,
      DataSourceAccessPolicy: 0,
    },
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
  operationName: "UpdateDirectQueryDataSource",
})) as any;

export type UpdateDomainConfigError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the cluster configuration of the specified Amazon OpenSearch Service
 * domain.
 */
export const updateDomainConfig: API.OperationMethod<
  UpdateDomainConfigRequest,
  UpdateDomainConfigResponse,
  UpdateDomainConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/domain/{DomainName}/config",
    input: {
      DomainName: 0,
      ClusterConfig: i_ClusterConfig,
      EBSOptions: i_EBSOptions,
      SnapshotOptions: i_SnapshotOptions,
      VPCOptions: i_VPCOptions,
      CognitoOptions: i_CognitoOptions,
      AdvancedOptions: 0,
      AccessPolicies: 0,
      IPAddressType: 0,
      LogPublishingOptions: D.map(i_LogPublishingOption),
      EncryptionAtRestOptions: i_EncryptionAtRestOptions,
      DomainEndpointOptions: i_DomainEndpointOptions,
      NodeToNodeEncryptionOptions: i_NodeToNodeEncryptionOptions,
      AdvancedSecurityOptions: i_AdvancedSecurityOptionsInput,
      IdentityCenterOptions: i_IdentityCenterOptionsInput,
      AutoTuneOptions: {
        DesiredState: 0,
        RollbackOnDisable: 0,
        MaintenanceSchedules: D.list(i_AutoTuneMaintenanceSchedule),
        UseOffPeakWindow: 0,
      },
      DryRun: 0,
      DryRunMode: 0,
      OffPeakWindowOptions: i_OffPeakWindowOptions,
      SoftwareUpdateOptions: i_SoftwareUpdateOptions,
      AIMLOptions: i_AIMLOptionsInput,
      DeploymentStrategyOptions: i_DeploymentStrategyOptions,
      AutomatedSnapshotPauseOptions: i_AutomatedSnapshotPauseRequestOptions,
      UseCase: 0,
      EngineMode: 0,
    },
    output: { DomainConfig: o_DomainConfig },
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
  operationName: "UpdateDomainConfig",
})) as any;

export type UpdateIndexError =
  | AccessDeniedException
  | DependencyFailureException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing OpenSearch index schema and semantic enrichment configuration. This operation allows modification of field mappings and semantic search settings for text fields. Changes to semantic enrichment configuration will apply to newly ingested documents.
 */
export const updateIndex: API.OperationMethod<
  UpdateIndexRequest,
  UpdateIndexResponse,
  UpdateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/domain/{DomainName}/index/{IndexName}",
    input: { DomainName: 0, IndexName: 0, IndexSchema: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    DependencyFailureException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndex",
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
 * Updates a package for use with Amazon OpenSearch Service domains. For more
 * information, see Custom packages
 * for Amazon OpenSearch Service.
 */
export const updatePackage: API.OperationMethod<
  UpdatePackageRequest,
  UpdatePackageResponse,
  UpdatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/packages/update",
    input: {
      PackageID: 0,
      PackageSource: i_PackageSource,
      PackageDescription: 0,
      CommitMessage: 0,
      PackageConfiguration: i_PackageConfiguration,
      PackageEncryptionOptions: i_PackageEncryptionOptions,
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

export type UpdatePackageScopeError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the scope of a package. Scope of the package defines users who can view and
 * associate a package.
 */
export const updatePackageScope: API.OperationMethod<
  UpdatePackageScopeRequest,
  UpdatePackageScopeResponse,
  UpdatePackageScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/packages/updateScope",
    input: { PackageID: 0, Operation: 0, PackageUserList: 0 },
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
  operationName: "UpdatePackageScope",
})) as any;

export type UpdateScheduledActionError =
  | BaseException
  | ConflictException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | SlotNotAvailableException
  | ValidationException
  | CommonErrors;
/**
 * Reschedules a planned domain configuration change for a later time. This change can be
 * a scheduled service
 * software update or a blue/green Auto-Tune enhancement.
 */
export const updateScheduledAction: API.OperationMethod<
  UpdateScheduledActionRequest,
  UpdateScheduledActionResponse,
  UpdateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /2021-01-01/opensearch/domain/{DomainName}/scheduledAction/update",
    input: {
      DomainName: 0,
      ActionID: 0,
      ActionType: 0,
      ScheduleAt: 0,
      DesiredStartTime: 0,
    },
    body: true,
  },
  errors: [
    BaseException,
    ConflictException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    SlotNotAvailableException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAction",
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
    http: "POST /2021-01-01/opensearch/vpcEndpoints/update",
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

export type UpgradeDomainError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to either upgrade your Amazon OpenSearch Service domain or perform an
 * upgrade eligibility check to a compatible version of OpenSearch or Elasticsearch.
 */
export const upgradeDomain: API.OperationMethod<
  UpgradeDomainRequest,
  UpgradeDomainResponse,
  UpgradeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /2021-01-01/opensearch/upgradeDomain",
    input: {
      DomainName: 0,
      TargetVersion: 0,
      PerformCheckOnly: 0,
      AdvancedOptions: 0,
    },
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
  operationName: "UpgradeDomain",
})) as any;

const i_AIMLOptionsInput: D.LazyStruct = () => ({
  NaturalLanguageQueryGenerationOptions: { DesiredState: 0 },
  S3VectorsEngine: { Enabled: 0 },
  ServerlessVectorAcceleration: { Enabled: 0 },
});
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
  JWTOptions: {
    Enabled: 0,
    SubjectKey: 0,
    RolesKey: 0,
    JwksUrl: 0,
    PublicKey: 0,
  },
  IAMFederationOptions: { Enabled: 0, SubjectKey: 0, RolesKey: 0 },
  AnonymousAuthEnabled: 0,
});
const i_AppConfig: D.LazyStruct = () => ({ key: 0, value: 0 });
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
const i_ClusterConfig: D.LazyStruct = () => ({
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
  MultiAZWithStandbyEnabled: 0,
  NodeOptions: D.list({
    NodeType: 0,
    NodeConfig: { Enabled: 0, Type: 0, Count: 0 },
  }),
});
const i_CognitoOptions: D.LazyStruct = () => ({
  Enabled: 0,
  UserPoolId: 0,
  IdentityPoolId: 0,
  RoleArn: 0,
});
const i_DataSource: D.LazyStruct = () => ({
  dataSourceArn: 0,
  dataSourceDescription: 0,
  iamRoleForDataSourceArn: 0,
});
const i_DataSourceType: D.LazyStruct = () => ({
  S3GlueDataCatalog: { RoleArn: 0 },
});
const i_DeploymentStrategyOptions: D.LazyStruct = () => ({
  DeploymentStrategy: 0,
});
const i_DirectQueryDataSourceType: D.LazyStruct = () => ({
  CloudWatchLog: { RoleArn: 0 },
  SecurityLake: { RoleArn: 0 },
  Prometheus: { RoleArn: 0, WorkspaceArn: 0 },
});
const i_DomainEndpointOptions: D.LazyStruct = () => ({
  EnforceHTTPS: 0,
  TLSSecurityPolicy: 0,
  CustomEndpointEnabled: 0,
  CustomEndpoint: 0,
  CustomEndpointCertificateArn: 0,
});
const i_DomainInformationContainer: D.LazyStruct = () => ({
  AWSDomainInformation: { OwnerId: 0, DomainName: 0, Region: 0 },
});
const i_EBSOptions: D.LazyStruct = () => ({
  EBSEnabled: 0,
  VolumeType: 0,
  VolumeSize: 0,
  Iops: 0,
  Throughput: 0,
});
const i_EncryptionAtRestOptions: D.LazyStruct = () => ({
  Enabled: 0,
  KmsKeyId: 0,
});
const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_IamIdentityCenterOptionsInput: D.LazyStruct = () => ({
  enabled: 0,
  iamIdentityCenterInstanceArn: 0,
  iamRoleForIdentityCenterApplicationArn: 0,
});
const i_IdentityCenterOptionsInput: D.LazyStruct = () => ({
  EnabledAPIAccess: 0,
  IdentityCenterInstanceARN: 0,
  IdentityCenterInstanceRegion: 0,
  SubjectKey: 0,
  RolesKey: 0,
});
const i_InsightEntity: D.LazyStruct = () => ({ Type: 0, Value: 0 });
const i_LogPublishingOption: D.LazyStruct = () => ({
  CloudWatchLogsLogGroupArn: 0,
  Enabled: 0,
});
const i_NodeToNodeEncryptionOptions: D.LazyStruct = () => ({ Enabled: 0 });
const i_OffPeakWindowOptions: D.LazyStruct = () => ({
  Enabled: 0,
  OffPeakWindow: { WindowStartTime: { Hours: 0, Minutes: 0 } },
});
const i_PackageAssociationConfiguration: D.LazyStruct = () => ({
  KeyStoreAccessOption: { KeyAccessRoleArn: 0, KeyStoreAccessEnabled: 0 },
});
const i_PackageConfiguration: D.LazyStruct = () => ({
  LicenseRequirement: 0,
  LicenseFilepath: 0,
  ConfigurationRequirement: 0,
  RequiresRestartForConfigurationUpdate: 0,
});
const i_PackageEncryptionOptions: D.LazyStruct = () => ({
  KmsKeyIdentifier: 0,
  EncryptionEnabled: 0,
});
const i_PackageSource: D.LazyStruct = () => ({ S3BucketName: 0, S3Key: 0 });
const i_ServiceOptions: D.LazyStruct = () => ({ SupportedRegions: 0 });
const i_SnapshotOptions: D.LazyStruct = () => ({
  AutomatedSnapshotStartHour: 0,
});
const i_SoftwareUpdateOptions: D.LazyStruct = () => ({
  AutoSoftwareUpdateEnabled: 0,
  UseLatestServiceSoftwareForBlueGreen: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_VPCOptions: D.LazyStruct = () => ({
  SubnetIds: 0,
  SecurityGroupIds: 0,
  EgressEnabled: 0,
});
const o_ChangeProgressDetails: D.LazyStruct = () => ({
  StartTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_DomainConfig: D.LazyStruct = () => ({
  EngineVersion: { Status: o_OptionStatus },
  ClusterConfig: { Status: o_OptionStatus },
  EBSOptions: { Status: o_OptionStatus },
  AccessPolicies: { Status: o_OptionStatus },
  IPAddressType: { Status: o_OptionStatus },
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
  IdentityCenterOptions: { Status: o_OptionStatus },
  AutoTuneOptions: {
    Options: { MaintenanceSchedules: D.list({ StartAt: D.ts }) },
    Status: { CreationDate: D.ts, UpdateDate: D.ts },
  },
  ChangeProgressDetails: o_ChangeProgressDetails,
  OffPeakWindowOptions: { Status: o_OptionStatus },
  SoftwareUpdateOptions: { Status: o_OptionStatus },
  AIMLOptions: { Status: o_OptionStatus },
  DeploymentStrategyOptions: { Status: o_OptionStatus },
  AutomatedSnapshotPauseOptions: {
    Options: o_AutomatedSnapshotPauseOptions,
    Status: o_OptionStatus,
  },
  UseCase: { Status: o_OptionStatus },
  EngineMode: { Status: o_OptionStatus },
});
const o_DomainPackageDetails: D.LazyStruct = () => ({ LastUpdated: D.ts });
const o_DomainStatus: D.LazyStruct = () => ({
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
