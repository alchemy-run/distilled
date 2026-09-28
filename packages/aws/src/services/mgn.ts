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
  sdkId: "mgn",
  target: "ApplicationMigrationService",
  version: "2020-02-26",
  sigv4: "mgn",
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
                `https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://mgn.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://mgn.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string; readonly code?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly code?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly errors?: ErrorDetails[];
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly code?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly code?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly quotaValue?: number;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429, headers: { retryAfterSeconds: "Retry-After" } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: string;
  }> {}
export class UninitializedAccountException
  extends /*@__PURE__*/ TE.TaggedError(
    "UninitializedAccountException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly code?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly code?: string;
    readonly reason?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type ApplicationID = string;
export type AccountID = string;
export interface ArchiveApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export type ARN = string;
export type ApplicationName = string;
export type ApplicationDescription = string;
export type ISO8601DatetimeString = string;
export type ApplicationHealthStatus = string;
export type ApplicationProgressStatus = string;
export type PositiveInteger = number;
export interface ApplicationAggregatedStatus {
  lastUpdateDateTime?: string;
  healthStatus?: string;
  progressStatus?: string;
  totalSourceServers?: number;
}
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export type WaveID = string;
export interface Application {
  applicationID?: string;
  arn?: string;
  name?: string;
  description?: string;
  isArchived?: boolean;
  applicationAggregatedStatus?: ApplicationAggregatedStatus;
  creationDateTime?: string;
  lastModifiedDateTime?: string;
  tags?: { [key: string]: string | undefined };
  waveID?: string;
}
export interface ArchiveWaveRequest {
  waveID: string;
  accountID?: string;
}
export type WaveName = string;
export type WaveDescription = string;
export type WaveHealthStatus = string;
export type WaveProgressStatus = string;
export interface WaveAggregatedStatus {
  lastUpdateDateTime?: string;
  replicationStartedDateTime?: string;
  healthStatus?: string;
  progressStatus?: string;
  totalApplications?: number;
}
export interface Wave {
  waveID?: string;
  arn?: string;
  name?: string;
  description?: string;
  isArchived?: boolean;
  waveAggregatedStatus?: WaveAggregatedStatus;
  creationDateTime?: string;
  lastModifiedDateTime?: string;
  tags?: { [key: string]: string | undefined };
}
export type ApplicationIDs = string[];
export interface AssociateApplicationsRequest {
  waveID: string;
  applicationIDs: string[];
  accountID?: string;
}
export interface AssociateApplicationsResponse {}
export type SourceServerID = string;
export type AssociateSourceServersRequestSourceServerIDs = string[];
export interface AssociateSourceServersRequest {
  applicationID: string;
  sourceServerIDs: string[];
  accountID?: string;
}
export interface AssociateSourceServersResponse {}
export type ChangeServerLifeCycleStateSourceServerLifecycleState = string;
export interface ChangeServerLifeCycleStateSourceServerLifecycle {
  state: string;
}
export interface ChangeServerLifeCycleStateRequest {
  sourceServerID: string;
  lifeCycle: ChangeServerLifeCycleStateSourceServerLifecycle;
  accountID?: string;
}
export type EC2InstanceID = string;
export type JobID = string;
export type FirstBoot = string;
export type LastKnownCheckType = string;
export type BoundedString = string;
export type LastKnownCheckStatus = string;
export interface LastKnownCheck {
  type?: string;
  name?: string;
  status?: string;
  error?: string;
  checkedAt?: Date;
}
export type LastKnownChecksList = LastKnownCheck[];
export interface LaunchedInstance {
  ec2InstanceID?: string;
  jobID?: string;
  firstBoot?: string;
  lastKnownChecks?: LastKnownCheck[];
  lastKnownFsxChecksStatus?: string;
}
export type ISO8601DurationString = string;
export interface DataReplicationInfoReplicatedDisk {
  deviceName?: string;
  totalStorageBytes?: number;
  replicatedStorageBytes?: number;
  rescannedStorageBytes?: number;
  backloggedStorageBytes?: number;
}
export type DataReplicationInfoReplicatedDisks =
  DataReplicationInfoReplicatedDisk[];
export type DataReplicationState = string;
export type DataReplicationInitiationStepName = string;
export type DataReplicationInitiationStepStatus = string;
export interface DataReplicationInitiationStep {
  name?: string;
  status?: string;
}
export type DataReplicationInitiationSteps = DataReplicationInitiationStep[];
export interface DataReplicationInitiation {
  startDateTime?: string;
  nextAttemptDateTime?: string;
  steps?: DataReplicationInitiationStep[];
}
export type DataReplicationErrorString = string;
export type LargeBoundedString = string;
export interface DataReplicationError {
  error?: string;
  rawError?: string;
}
export type ReplicatorID = string;
export interface DataReplicationInfo {
  lagDuration?: string;
  etaDateTime?: string;
  replicatedDisks?: DataReplicationInfoReplicatedDisk[];
  dataReplicationState?: string;
  dataReplicationInitiation?: DataReplicationInitiation;
  dataReplicationError?: DataReplicationError;
  lastSnapshotDateTime?: string;
  replicatorId?: string;
}
export interface LifeCycleLastTestInitiated {
  apiCallDateTime?: string;
  jobID?: string;
}
export interface LifeCycleLastTestReverted {
  apiCallDateTime?: string;
}
export interface LifeCycleLastTestFinalized {
  apiCallDateTime?: string;
}
export interface LifeCycleLastTest {
  initiated?: LifeCycleLastTestInitiated;
  reverted?: LifeCycleLastTestReverted;
  finalized?: LifeCycleLastTestFinalized;
}
export interface LifeCycleLastCutoverInitiated {
  apiCallDateTime?: string;
  jobID?: string;
}
export interface LifeCycleLastCutoverReverted {
  apiCallDateTime?: string;
}
export interface LifeCycleLastCutoverFinalized {
  apiCallDateTime?: string;
}
export interface LifeCycleLastCutover {
  initiated?: LifeCycleLastCutoverInitiated;
  reverted?: LifeCycleLastCutoverReverted;
  finalized?: LifeCycleLastCutoverFinalized;
}
export type LifeCycleState = string;
export interface LifeCycle {
  addedToServiceDateTime?: string;
  firstByteDateTime?: string;
  elapsedReplicationDuration?: string;
  lastSeenByServiceDateTime?: string;
  lastTest?: LifeCycleLastTest;
  lastCutover?: LifeCycleLastCutover;
  state?: string;
}
export type EC2InstanceType = string;
export interface IdentificationHints {
  fqdn?: string;
  hostname?: string;
  vmWareUuid?: string;
  awsInstanceID?: string;
  vmPath?: string;
}
export type IPsList = string[];
export interface NetworkInterface {
  macAddress?: string;
  ips?: string[];
  isPrimary?: boolean;
}
export type NetworkInterfaces = NetworkInterface[];
export interface Disk {
  deviceName?: string;
  bytes?: number;
}
export type Disks = Disk[];
export interface CPU {
  cores?: number;
  modelName?: string;
}
export type Cpus = CPU[];
export interface OS {
  fullString?: string;
}
export interface SourceProperties {
  lastUpdatedDateTime?: string;
  recommendedInstanceType?: string;
  identificationHints?: IdentificationHints;
  networkInterfaces?: NetworkInterface[];
  disks?: Disk[];
  cpus?: CPU[];
  ramBytes?: number;
  os?: OS;
}
export type ReplicationType = string;
export type VcenterClientID = string;
export type UserProvidedId = string;
export type SecretArn = string;
export type ConnectorArn = string;
export interface SourceServerConnectorAction {
  credentialsSecretArn?: string;
  connectorArn?: string;
}
export interface SourceServer {
  sourceServerID?: string;
  arn?: string;
  isArchived?: boolean;
  tags?: { [key: string]: string | undefined };
  launchedInstance?: LaunchedInstance;
  dataReplicationInfo?: DataReplicationInfo;
  lifeCycle?: LifeCycle;
  sourceProperties?: SourceProperties;
  replicationType?: string;
  vcenterClientID?: string;
  applicationID?: string;
  userProvidedID?: string;
  fqdnForActionFramework?: string;
  connectorAction?: SourceServerConnectorAction;
}
export interface CreateApplicationRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export type ConnectorName = string;
export type SsmInstanceID = string;
export type S3BucketName = string;
export type CloudWatchLogGroupName = string;
export interface ConnectorSsmCommandConfig {
  s3OutputEnabled: boolean;
  outputS3BucketName?: string;
  cloudWatchOutputEnabled: boolean;
  cloudWatchLogGroupName?: string;
}
export interface CreateConnectorRequest {
  name: string;
  ssmInstanceID: string;
  tags?: { [key: string]: string | undefined };
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export type ConnectorID = string;
export interface Connector {
  connectorID?: string;
  name?: string;
  ssmInstanceID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export type PostLaunchActionsDeploymentType = string;
export type S3LogBucketName = string;
export type SsmDocumentName = string;
export type StrictlyPositiveInteger = number;
export type SsmDocumentParameterName = string;
export type SsmParameterStoreParameterType = string;
export type SsmParameterStoreParameterName = string;
export interface SsmParameterStoreParameter {
  parameterType: string;
  parameterName: string;
}
export type SsmParameterStoreParameters = SsmParameterStoreParameter[];
export type SsmDocumentParameters = {
  [key: string]: SsmParameterStoreParameter[] | undefined;
};
export type JmesPathString = string;
export type SsmExternalParameter = { dynamicPath: string };
export type SsmDocumentExternalParameters = {
  [key: string]: SsmExternalParameter | undefined;
};
export interface SsmDocument {
  actionName: string;
  ssmDocumentName: string;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
}
export type SsmDocuments = SsmDocument[];
export interface PostLaunchActions {
  deployment?: string;
  s3LogBucket?: string;
  s3OutputKeyPrefix?: string;
  cloudWatchLogGroupName?: string;
  ssmDocuments?: SsmDocument[];
}
export type LaunchDisposition = string;
export type TargetInstanceTypeRightSizingMethod = string;
export interface Licensing {
  osByol?: boolean;
}
export type BootMode = string;
export type VolumeType = string;
export type Iops = number;
export type Throughput = number;
export interface LaunchTemplateDiskConf {
  volumeType?: string;
  iops?: number;
  throughput?: number;
}
export type KmsKeyArn = string;
export interface CreateLaunchConfigurationTemplateRequest {
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  tags?: { [key: string]: string | undefined };
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export type LaunchConfigurationTemplateID = string;
export type EC2LaunchConfigurationTemplateID = string;
export interface LaunchConfigurationTemplate {
  launchConfigurationTemplateID: string;
  arn?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  tags?: { [key: string]: string | undefined };
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export type NetworkMigrationDefinitionName = string;
export type NetworkMigrationDefinitionDescription = string;
export type SourceEnvironment = string;
export type S3KeyName = string;
export interface SourceS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
  s3Key: string;
}
export interface SourceConfiguration {
  sourceEnvironment: string;
  sourceS3Configuration: SourceS3Configuration;
}
export type SourceConfigurationList = SourceConfiguration[];
export interface TargetS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
}
export type TargetNetworkTopology = string;
export type Cidr = string;
export interface TargetNetwork {
  topology: string;
  inboundCidr?: string;
  outboundCidr?: string;
  inspectionCidr?: string;
}
export type TargetDeployment = string;
export type ScopeTagKey = string;
export type ScopeTagValue = string;
export type ScopeTagsMap = { [key: string]: string | undefined };
export interface CreateNetworkMigrationDefinitionRequest {
  name: string;
  description?: string;
  sourceConfigurations?: SourceConfiguration[];
  targetS3Configuration: TargetS3Configuration;
  targetNetwork: TargetNetwork;
  targetDeployment?: string;
  tags?: { [key: string]: string | undefined };
  scopeTags?: { [key: string]: string | undefined };
}
export type NetworkMigrationDefinitionID = string;
export interface NetworkMigrationDefinition {
  arn?: string;
  networkMigrationDefinitionID?: string;
  name?: string;
  description?: string;
  sourceConfigurations?: SourceConfiguration[];
  targetS3Configuration?: TargetS3Configuration;
  targetNetwork?: TargetNetwork;
  targetDeployment?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  scopeTags?: { [key: string]: string | undefined };
}
export type SubnetID = string;
export type SecurityGroupID = string;
export type ReplicationServersSecurityGroupsIDs = string[];
export type ReplicationConfigurationDefaultLargeStagingDiskType = string;
export type ReplicationConfigurationEbsEncryption = string;
export type BandwidthThrottling = number;
export type ReplicationConfigurationDataPlaneRouting = string;
export type InternetProtocol = string;
export type StorageType = string;
export type StorageVirtualMachineId = string;
export interface FsxOntapConfiguration {
  storageVirtualMachineId: string;
  credentialsSecretArn: string;
}
export interface StorageConfiguration {
  storageType: string;
  fsxOntapConfiguration?: FsxOntapConfiguration;
}
export interface CreateReplicationConfigurationTemplateRequest {
  stagingAreaSubnetId: string;
  associateDefaultSecurityGroup: boolean;
  replicationServersSecurityGroupsIDs: string[];
  replicationServerInstanceType: string;
  useDedicatedReplicationServer: boolean;
  defaultLargeStagingDiskType: string;
  ebsEncryption: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling: number;
  dataPlaneRouting: string;
  createPublicIP: boolean;
  stagingAreaTags: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  tags?: { [key: string]: string | undefined };
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
}
export type ReplicationConfigurationTemplateID = string;
export interface ReplicationConfigurationTemplate {
  replicationConfigurationTemplateID: string;
  arn?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  tags?: { [key: string]: string | undefined };
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
}
export interface CreateWaveRequest {
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export interface DeleteApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export interface DeleteApplicationResponse {}
export interface DeleteConnectorRequest {
  connectorID: string;
}
export interface DeleteConnectorResponse {}
export interface DeleteJobRequest {
  jobID: string;
  accountID?: string;
}
export interface DeleteJobResponse {}
export interface DeleteLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
}
export interface DeleteLaunchConfigurationTemplateResponse {}
export interface DeleteNetworkMigrationDefinitionRequest {
  networkMigrationDefinitionID: string;
}
export interface DeleteNetworkMigrationDefinitionResponse {}
export interface DeleteReplicationConfigurationTemplateRequest {
  replicationConfigurationTemplateID: string;
}
export interface DeleteReplicationConfigurationTemplateResponse {}
export interface DeleteSourceServerRequest {
  sourceServerID: string;
  accountID?: string;
}
export interface DeleteSourceServerResponse {}
export interface DeleteVcenterClientRequest {
  vcenterClientID: string;
}
export interface DeleteVcenterClientResponse {}
export interface DeleteWaveRequest {
  waveID: string;
  accountID?: string;
}
export interface DeleteWaveResponse {}
export type MaxResultsType = number;
export type PaginationToken = string;
export interface DescribeJobLogItemsRequest {
  jobID: string;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export type JobLogEvent = string;
export interface JobLogEventData {
  sourceServerID?: string;
  conversionServerID?: string;
  targetInstanceID?: string;
  rawError?: string;
  attemptCount?: number;
  maxAttemptsCount?: number;
}
export interface JobLog {
  logDateTime?: string;
  event?: string;
  eventData?: JobLogEventData;
}
export type JobLogs = JobLog[];
export interface DescribeJobLogItemsResponse {
  items?: JobLog[];
  nextToken?: string;
}
export type DescribeJobsRequestFiltersJobIDs = string[];
export interface DescribeJobsRequestFilters {
  jobIDs?: string[];
  fromDate?: string;
  toDate?: string;
}
export interface DescribeJobsRequest {
  filters?: DescribeJobsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export type JobType = string;
export type InitiatedBy = string;
export type JobStatus = string;
export type LaunchStatus = string;
export type SsmDocumentType = string;
export type PostLaunchActionExecutionStatus = string;
export interface JobPostLaunchActionsLaunchStatus {
  ssmDocument?: SsmDocument;
  ssmDocumentType?: string;
  executionID?: string;
  executionStatus?: string;
  failureReason?: string;
}
export type PostLaunchActionsLaunchStatusList =
  JobPostLaunchActionsLaunchStatus[];
export interface PostLaunchActionsStatus {
  ssmAgentDiscoveryDatetime?: string;
  postLaunchActionsLaunchStatusList?: JobPostLaunchActionsLaunchStatus[];
}
export interface ParticipatingServer {
  sourceServerID: string;
  launchStatus?: string;
  launchedEc2InstanceID?: string;
  postLaunchActionsStatus?: PostLaunchActionsStatus;
}
export type ParticipatingServers = ParticipatingServer[];
export interface Job {
  jobID: string;
  arn?: string;
  type?: string;
  initiatedBy?: string;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  participatingServers?: ParticipatingServer[];
  tags?: { [key: string]: string | undefined };
}
export type JobsList = Job[];
export interface DescribeJobsResponse {
  items?: Job[];
  nextToken?: string;
}
export type LaunchConfigurationTemplateIDs = string[];
export interface DescribeLaunchConfigurationTemplatesRequest {
  launchConfigurationTemplateIDs?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type LaunchConfigurationTemplates = LaunchConfigurationTemplate[];
export interface DescribeLaunchConfigurationTemplatesResponse {
  items?: LaunchConfigurationTemplate[];
  nextToken?: string;
}
export type ReplicationConfigurationTemplateIDs = string[];
export interface DescribeReplicationConfigurationTemplatesRequest {
  replicationConfigurationTemplateIDs?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type ReplicationConfigurationTemplates =
  ReplicationConfigurationTemplate[];
export interface DescribeReplicationConfigurationTemplatesResponse {
  items?: ReplicationConfigurationTemplate[];
  nextToken?: string;
}
export type DescribeSourceServersRequestFiltersIDs = string[];
export type ReplicationTypes = string[];
export type LifeCycleStates = string[];
export type DescribeSourceServersRequestApplicationIDs = string[];
export interface DescribeSourceServersRequestFilters {
  sourceServerIDs?: string[];
  isArchived?: boolean;
  replicationTypes?: string[];
  lifeCycleStates?: string[];
  applicationIDs?: string[];
}
export interface DescribeSourceServersRequest {
  filters?: DescribeSourceServersRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export type SourceServersList = SourceServer[];
export interface DescribeSourceServersResponse {
  items?: SourceServer[];
  nextToken?: string;
}
export interface DescribeVcenterClientsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface VcenterClient {
  vcenterClientID?: string;
  arn?: string;
  hostname?: string;
  vcenterUUID?: string;
  datacenterName?: string;
  lastSeenDatetime?: string;
  sourceServerTags?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export type VcenterClientList = VcenterClient[];
export interface DescribeVcenterClientsResponse {
  items?: VcenterClient[];
  nextToken?: string;
}
export interface DisassociateApplicationsRequest {
  waveID: string;
  applicationIDs: string[];
  accountID?: string;
}
export interface DisassociateApplicationsResponse {}
export type DisassociateSourceServersRequestSourceServerIDs = string[];
export interface DisassociateSourceServersRequest {
  applicationID: string;
  sourceServerIDs: string[];
  accountID?: string;
}
export interface DisassociateSourceServersResponse {}
export interface DisconnectFromServiceRequest {
  sourceServerID: string;
  accountID?: string;
}
export interface FinalizeCutoverRequest {
  sourceServerID: string;
  accountID?: string;
}
export interface GetLaunchConfigurationRequest {
  sourceServerID: string;
  accountID?: string;
}
export type SmallBoundedString = string;
export interface LaunchConfiguration {
  sourceServerID?: string;
  name?: string;
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
}
export interface GetNetworkMigrationDefinitionRequest {
  networkMigrationDefinitionID: string;
}
export type NetworkMigrationExecutionID = string;
export type SegmentID = string;
export type ConstructID = string;
export interface GetNetworkMigrationMapperSegmentConstructRequest {
  networkMigrationDefinitionID: string;
  networkMigrationExecutionID: string;
  segmentID: string;
  constructID: string;
}
export type NetworkMigrationMapperSegmentConstructType = string;
export type SegmentConstructName = string;
export type SegmentConstructDescription = string;
export type LogicalID = string;
export type ConstructPropertyKey = string;
export type MarshalledResourceDefinition = string;
export type ConstructProperties = { [key: string]: string | undefined };
export interface NetworkMigrationMapperSegmentConstruct {
  constructID?: string;
  constructType?: string;
  name?: string;
  description?: string;
  logicalID?: string;
  excluded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  properties?: { [key: string]: string | undefined };
}
export interface GetNetworkMigrationMapperSegmentConstructResponse {
  construct?: NetworkMigrationMapperSegmentConstruct;
}
export interface GetReplicationConfigurationRequest {
  sourceServerID: string;
  accountID?: string;
}
export type ReplicationConfigurationReplicatedDiskStagingDiskType = string;
export interface ReplicationConfigurationReplicatedDisk {
  deviceName?: string;
  isBootDisk?: boolean;
  stagingDiskType?: string;
  iops?: number;
  throughput?: number;
}
export type ReplicationConfigurationReplicatedDisks =
  ReplicationConfigurationReplicatedDisk[];
export interface ReplicationConfiguration {
  sourceServerID?: string;
  name?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  replicatedDisks?: ReplicationConfigurationReplicatedDisk[];
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
}
export interface InitializeServiceRequest {}
export interface InitializeServiceResponse {}
export type ApplicationIDsFilter = string[];
export type WaveIDsFilter = string[];
export interface ListApplicationsRequestFilters {
  applicationIDs?: string[];
  isArchived?: boolean;
  waveIDs?: string[];
}
export interface ListApplicationsRequest {
  filters?: ListApplicationsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export type ApplicationsList = Application[];
export interface ListApplicationsResponse {
  items?: Application[];
  nextToken?: string;
}
export type ConnectorIDsFilter = string[];
export interface ListConnectorsRequestFilters {
  connectorIDs?: string[];
}
export interface ListConnectorsRequest {
  filters?: ListConnectorsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export type ConnectorsList = Connector[];
export interface ListConnectorsResponse {
  items?: Connector[];
  nextToken?: string;
}
export type ExportID = string;
export interface ListExportErrorsRequest {
  exportID: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ExportErrorData {
  rawError?: string;
}
export interface ExportTaskError {
  errorDateTime?: string;
  errorData?: ExportErrorData;
}
export type ExportErrors = ExportTaskError[];
export interface ListExportErrorsResponse {
  items?: ExportTaskError[];
  nextToken?: string;
}
export type ListExportsRequestFiltersExportIDs = string[];
export interface ListExportsRequestFilters {
  exportIDs?: string[];
}
export interface ListExportsRequest {
  filters?: ListExportsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export type S3Key = string;
export type ExportStatus = string;
export interface ExportTaskSummary {
  serversCount?: number;
  applicationsCount?: number;
  wavesCount?: number;
}
export interface ExportTask {
  exportID?: string;
  arn?: string;
  s3Bucket?: string;
  s3Key?: string;
  s3BucketOwner?: string;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  progressPercentage?: number;
  summary?: ExportTaskSummary;
  tags?: { [key: string]: string | undefined };
}
export type ExportsList = ExportTask[];
export interface ListExportsResponse {
  items?: ExportTask[];
  nextToken?: string;
}
export type ImportID = string;
export interface ListImportErrorsRequest {
  importID: string;
  maxResults?: number;
  nextToken?: string;
}
export type ImportErrorType = string;
export interface ImportErrorData {
  sourceServerID?: string;
  applicationID?: string;
  waveID?: string;
  ec2LaunchTemplateID?: string;
  rowNumber?: number;
  rawError?: string;
  accountID?: string;
}
export interface ImportTaskError {
  errorDateTime?: string;
  errorType?: string;
  errorData?: ImportErrorData;
}
export type ImportErrors = ImportTaskError[];
export interface ListImportErrorsResponse {
  items?: ImportTaskError[];
  nextToken?: string;
}
export type ImportFileEnrichmentJobID = string;
export type ImportFileEnrichmentsIDsFilter = string[];
export interface ListImportFileEnrichmentsFilters {
  jobIDs?: string[];
}
export interface ListImportFileEnrichmentsRequest {
  filters?: ListImportFileEnrichmentsFilters;
  maxResults?: number;
  nextToken?: string;
}
export type ImportFileEnrichmentStatus = string;
export type EncryptionAlgorithm = string;
export type Hash = string;
export interface Checksum {
  encryptionAlgorithm?: string;
  hash?: string;
}
export interface EnrichmentTargetS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
  s3Key: string;
}
export interface ImportFileEnrichment {
  jobID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
  checksum?: Checksum;
  s3BucketTarget?: EnrichmentTargetS3Configuration;
}
export type ImportFileEnrichmentsList = ImportFileEnrichment[];
export interface ListImportFileEnrichmentsResponse {
  items?: ImportFileEnrichment[];
  nextToken?: string;
}
export type ImportIDsFilter = string[];
export interface ListImportsRequestFilters {
  importIDs?: string[];
}
export interface ListImportsRequest {
  filters?: ListImportsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export interface S3BucketSource {
  s3Bucket: string;
  s3Key: string;
  s3BucketOwner?: string;
}
export type ImportStatus = string;
export interface ImportTaskSummaryWaves {
  createdCount?: number;
  modifiedCount?: number;
}
export interface ImportTaskSummaryApplications {
  createdCount?: number;
  modifiedCount?: number;
}
export interface ImportTaskSummaryServers {
  createdCount?: number;
  modifiedCount?: number;
}
export interface ImportTaskSummary {
  waves?: ImportTaskSummaryWaves;
  applications?: ImportTaskSummaryApplications;
  servers?: ImportTaskSummaryServers;
}
export interface ImportTask {
  importID?: string;
  arn?: string;
  s3BucketSource?: S3BucketSource;
  creationDateTime?: string;
  endDateTime?: string;
  status?: string;
  progressPercentage?: number;
  summary?: ImportTaskSummary;
  tags?: { [key: string]: string | undefined };
}
export type ImportList = ImportTask[];
export interface ListImportsResponse {
  items?: ImportTask[];
  nextToken?: string;
}
export interface ListManagedAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ManagedAccount {
  accountId?: string;
}
export type ManagedAccounts = ManagedAccount[];
export interface ListManagedAccountsResponse {
  items: ManagedAccount[];
  nextToken?: string;
}
export type NetworkMigrationJobID = string;
export type ListNetworkMigrationAnalysesIDsFilter = string[];
export interface ListNetworkMigrationAnalysesFilters {
  jobIDs?: string[];
}
export interface ListNetworkMigrationAnalysesRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationAnalysesFilters;
  maxResults?: number;
  nextToken?: string;
}
export type NetworkMigrationJobStatus = string;
export interface NetworkMigrationAnalysisJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export type NetworkMigrationAnalysesList = NetworkMigrationAnalysisJobDetails[];
export interface ListNetworkMigrationAnalysesResponse {
  items?: NetworkMigrationAnalysisJobDetails[];
  nextToken?: string;
}
export type VpcID = string;
export type VpcIDsFilter = string[];
export interface ListNetworkMigrationAnalysisResultsFilters {
  vpcIDs?: string[];
}
export interface ListNetworkMigrationAnalysisResultsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationAnalysisResultsFilters;
  maxResults?: number;
  nextToken?: string;
}
export type AnalyzerType = string;
export interface NetworkMigrationAnalysisResultSource {
  vpcID?: string;
  subnetID?: string;
}
export interface NetworkMigrationAnalysisResultTarget {
  vpcID?: string;
  subnetID?: string;
}
export type NetworkMigrationAnalysisResultStatus = string;
export interface NetworkMigrationAnalysisResult {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  analyzerType?: string;
  source?: NetworkMigrationAnalysisResultSource;
  target?: NetworkMigrationAnalysisResultTarget;
  status?: string;
  analysisResult?: string;
}
export type NetworkMigrationAnalysisResultsList =
  NetworkMigrationAnalysisResult[];
export interface ListNetworkMigrationAnalysisResultsResponse {
  items?: NetworkMigrationAnalysisResult[];
  nextToken?: string;
}
export type ListNetworkMigrationCodeGenerationsIDsFilter = string[];
export interface ListNetworkMigrationCodeGenerationsFilters {
  jobIDs?: string[];
}
export interface ListNetworkMigrationCodeGenerationsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationCodeGenerationsFilters;
  maxResults?: number;
  nextToken?: string;
}
export type CodeGenerationOutputFormatType = string;
export type CodeGenerationOutputFormatStatus = string;
export interface CodeGenerationOutputFormatStatusDetails {
  status?: string;
  statusDetailList?: string;
}
export type CodeGenerationOutputFormatStatusDetailsMap = {
  [key: string]: CodeGenerationOutputFormatStatusDetails | undefined;
};
export interface NetworkMigrationCodeGenerationJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
  codeGenerationOutputFormatStatusDetailsMap?: {
    [key: string]: CodeGenerationOutputFormatStatusDetails | undefined;
  };
}
export type NetworkMigrationCodeGenerationsList =
  NetworkMigrationCodeGenerationJobDetails[];
export interface ListNetworkMigrationCodeGenerationsResponse {
  items?: NetworkMigrationCodeGenerationJobDetails[];
  nextToken?: string;
}
export type ListNetworkMigrationCodeGenerationSegmentsIDsFilter = string[];
export interface ListNetworkMigrationCodeGenerationSegmentsFilters {
  segmentIDs?: string[];
}
export interface ListNetworkMigrationCodeGenerationSegmentsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationCodeGenerationSegmentsFilters;
  maxResults?: number;
  nextToken?: string;
}
export type NetworkMigrationCodeGenerationSegmentType = string;
export type NetworkMigrationCodeGenerationArtifactID = string;
export type NetworkMigrationCodeGenerationArtifactType = string;
export type NetworkMigrationCodeGenerationArtifactSubType = string;
export interface S3Configuration {
  s3Bucket?: string;
  s3BucketOwner?: string;
  s3Key?: string;
}
export interface NetworkMigrationCodeGenerationArtifact {
  artifactID?: string;
  artifactType?: string;
  artifactSubType?: string;
  logicalID?: string;
  outputS3Configuration?: S3Configuration;
  checksum?: Checksum;
  createdAt?: Date;
}
export type NetworkMigrationCodeGenerationArtifacts =
  NetworkMigrationCodeGenerationArtifact[];
export type ReferencedSegmentsList = string[];
export interface NetworkMigrationCodeGenerationSegment {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  segmentID?: string;
  segmentType?: string;
  logicalID?: string;
  mapperSegmentID?: string;
  artifacts?: NetworkMigrationCodeGenerationArtifact[];
  referencedSegments?: string[];
  createdAt?: Date;
}
export type NetworkMigrationCodeGenerationSegmentsList =
  NetworkMigrationCodeGenerationSegment[];
export interface ListNetworkMigrationCodeGenerationSegmentsResponse {
  items?: NetworkMigrationCodeGenerationSegment[];
  nextToken?: string;
}
export type NetworkMigrationDefintionsIDsFilter = string[];
export interface ListNetworkMigrationDefinitionsRequestFilters {
  networkMigrationDefinitionIDs?: string[];
}
export interface ListNetworkMigrationDefinitionsRequest {
  filters?: ListNetworkMigrationDefinitionsRequestFilters;
  nextToken?: string;
  maxResults?: number;
}
export interface NetworkMigrationDefinitionSummary {
  networkMigrationDefinitionID?: string;
  name?: string;
  sourceEnvironment?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  scopeTags?: { [key: string]: string | undefined };
}
export type NetworkMigrationDefinitionSummariesList =
  NetworkMigrationDefinitionSummary[];
export interface ListNetworkMigrationDefinitionsResponse {
  items?: NetworkMigrationDefinitionSummary[];
  nextToken?: string;
}
export interface ListNetworkMigrationDeployedStacksRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  maxResults?: number;
  nextToken?: string;
}
export type NetworkMigrationDeployedStackStatus = string;
export type PhysicalID = string;
export type NetworkMigrationFailedResourceStatus = string;
export interface NetworkMigrationFailedResourceDetails {
  logicalID?: string;
  status?: string;
  statusReason?: string;
}
export type NetworkMigrationFailedResourcesList =
  NetworkMigrationFailedResourceDetails[];
export interface NetworkMigrationDeployedStackDetails {
  status?: string;
  stackPhysicalID?: string;
  stackLogicalID?: string;
  segmentID?: string;
  targetAccount?: string;
  failedResources?: NetworkMigrationFailedResourceDetails[];
}
export type NetworkMigrationDeployedStacksList =
  NetworkMigrationDeployedStackDetails[];
export interface ListNetworkMigrationDeployedStacksResponse {
  items?: NetworkMigrationDeployedStackDetails[];
  nextToken?: string;
}
export type ListNetworkMigrationDeployerJobIDsFilters = string[];
export interface ListNetworkMigrationDeployerJobFilters {
  jobIDs?: string[];
}
export interface ListNetworkMigrationDeploymentsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationDeployerJobFilters;
  maxResults?: number;
  nextToken?: string;
}
export interface NetworkMigrationDeployerJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export type NetworkMigrationDeployerJobList =
  NetworkMigrationDeployerJobDetails[];
export interface ListNetworkMigrationDeployerJobResponse {
  items?: NetworkMigrationDeployerJobDetails[];
  nextToken?: string;
}
export type NetworkMigrationExecutionIDsFilter = string[];
export type ExecutionStatus = string;
export type NetworkMigrationExecutionStatusesFilter = string[];
export interface ListNetworkMigrationExecutionRequestFilters {
  networkMigrationExecutionIDs?: string[];
  networkMigrationExecutionStatuses?: string[];
}
export interface ListNetworkMigrationExecutionsRequest {
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationExecutionRequestFilters;
  nextToken?: string;
  maxResults?: number;
}
export type ExecutionStage = string;
export type ExecutionStageActivity = string;
export interface NetworkMigrationExecution {
  networkMigrationDefinitionID?: string;
  networkMigrationExecutionID?: string;
  status?: string;
  stage?: string;
  activity?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export type NetworkMigrationExecutionsList = NetworkMigrationExecution[];
export interface ListNetworkMigrationExecutionsResponse {
  items?: NetworkMigrationExecution[];
  nextToken?: string;
}
export type ListNetworkMigrationMapperSegmentConstructsIDsFilter = string[];
export type ListNetworkMigrationMapperSegmentConstructTypesFilter = string[];
export interface ListNetworkMigrationMapperSegmentConstructsFilters {
  constructIDs?: string[];
  constructTypes?: string[];
}
export interface ListNetworkMigrationMapperSegmentConstructsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  segmentID: string;
  filters?: ListNetworkMigrationMapperSegmentConstructsFilters;
  maxResults?: number;
  nextToken?: string;
}
export type NetworkMigrationMapperSegmentConstructs =
  NetworkMigrationMapperSegmentConstruct[];
export interface ListNetworkMigrationMapperSegmentConstructsResponse {
  items?: NetworkMigrationMapperSegmentConstruct[];
  nextToken?: string;
}
export type ListNetworkMigrationMapperSegmentsIDsFilter = string[];
export interface ListNetworkMigrationMapperSegmentsFilters {
  segmentIDs?: string[];
}
export interface ListNetworkMigrationMapperSegmentsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationMapperSegmentsFilters;
  maxResults?: number;
  nextToken?: string;
}
export type NetworkMigrationMapperSegmentType = string;
export type SegmentName = string;
export type SegmentDescription = string;
export interface NetworkMigrationMapperSegment {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  segmentID?: string;
  segmentType?: string;
  name?: string;
  description?: string;
  logicalID?: string;
  checksum?: Checksum;
  outputS3Configuration?: S3Configuration;
  createdAt?: Date;
  updatedAt?: Date;
  scopeTags?: { [key: string]: string | undefined };
  targetAccount?: string;
  referencedSegments?: string[];
}
export type NetworkMigrationMapperSegmentsList =
  NetworkMigrationMapperSegment[];
export interface ListNetworkMigrationMapperSegmentsResponse {
  items?: NetworkMigrationMapperSegment[];
  nextToken?: string;
}
export type ListNetworkMigrationMappingsIDsFilter = string[];
export interface ListNetworkMigrationMappingsFilters {
  jobIDs?: string[];
}
export interface ListNetworkMigrationMappingsRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationMappingsFilters;
  maxResults?: number;
  nextToken?: string;
}
export interface NetworkMigrationMappingJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export type NetworkMigrationMappingsList = NetworkMigrationMappingJobDetails[];
export interface ListNetworkMigrationMappingsResponse {
  items?: NetworkMigrationMappingJobDetails[];
  nextToken?: string;
}
export type ListNetworkMigrationMappingUpdatesIDsFilter = string[];
export interface ListNetworkMigrationMappingUpdatesFilters {
  jobIDs?: string[];
}
export interface ListNetworkMigrationMappingUpdatesRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  filters?: ListNetworkMigrationMappingUpdatesFilters;
  maxResults?: number;
  nextToken?: string;
}
export interface NetworkMigrationMappingUpdateJobDetails {
  jobID?: string;
  networkMigrationExecutionID?: string;
  networkMigrationDefinitionID?: string;
  createdAt?: Date;
  endedAt?: Date;
  status?: string;
  statusDetails?: string;
}
export type NetworkMigrationMappingUpdatesList =
  NetworkMigrationMappingUpdateJobDetails[];
export interface ListNetworkMigrationMappingUpdatesResponse {
  items?: NetworkMigrationMappingUpdateJobDetails[];
  nextToken?: string;
}
export type ActionID = string;
export type ActionIDs = string[];
export interface SourceServerActionsRequestFilters {
  actionIDs?: string[];
}
export interface ListSourceServerActionsRequest {
  sourceServerID: string;
  filters?: SourceServerActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export type ActionName = string;
export type OrderType = number;
export type DocumentVersion = string;
export type ActionDescription = string;
export type ActionCategory = string;
export interface SourceServerActionDocument {
  actionID?: string;
  actionName?: string;
  documentIdentifier?: string;
  order?: number;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export type SourceServerActionDocuments = SourceServerActionDocument[];
export interface ListSourceServerActionsResponse {
  items?: SourceServerActionDocument[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TemplateActionsRequestFilters {
  actionIDs?: string[];
}
export interface ListTemplateActionsRequest {
  launchConfigurationTemplateID: string;
  filters?: TemplateActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export type OperatingSystemString = string;
export interface TemplateActionDocument {
  actionID?: string;
  actionName?: string;
  documentIdentifier?: string;
  order?: number;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  operatingSystem?: string;
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export type TemplateActionDocuments = TemplateActionDocument[];
export interface ListTemplateActionsResponse {
  items?: TemplateActionDocument[];
  nextToken?: string;
}
export interface ListWavesRequestFilters {
  waveIDs?: string[];
  isArchived?: boolean;
}
export interface ListWavesRequest {
  filters?: ListWavesRequestFilters;
  maxResults?: number;
  nextToken?: string;
  accountID?: string;
}
export type WavesList = Wave[];
export interface ListWavesResponse {
  items?: Wave[];
  nextToken?: string;
}
export interface MarkAsArchivedRequest {
  sourceServerID: string;
  accountID?: string;
}
export interface PauseReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export interface PutSourceServerActionRequest {
  sourceServerID: string;
  actionName: string;
  documentIdentifier: string;
  order: number;
  actionID: string;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
  accountID?: string;
}
export interface PutTemplateActionRequest {
  launchConfigurationTemplateID: string;
  actionName: string;
  documentIdentifier: string;
  order: number;
  actionID: string;
  documentVersion?: string;
  active?: boolean;
  timeoutSeconds?: number;
  mustSucceedForCutover?: boolean;
  parameters?: { [key: string]: SsmParameterStoreParameter[] | undefined };
  operatingSystem?: string;
  externalParameters?: { [key: string]: SsmExternalParameter | undefined };
  description?: string;
  category?: string;
}
export interface RemoveSourceServerActionRequest {
  sourceServerID: string;
  actionID: string;
  accountID?: string;
}
export interface RemoveSourceServerActionResponse {}
export interface RemoveTemplateActionRequest {
  launchConfigurationTemplateID: string;
  actionID: string;
}
export interface RemoveTemplateActionResponse {}
export interface ResumeReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export interface RetryDataReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export type StartCutoverRequestSourceServerIDs = string[];
export interface StartCutoverRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export interface StartCutoverResponse {
  job?: Job;
}
export interface StartExportRequest {
  s3Bucket: string;
  s3Key: string;
  s3BucketOwner?: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartExportResponse {
  exportTask?: ExportTask;
}
export type ClientIdempotencyToken = string;
export interface StartImportRequest {
  clientToken?: string;
  s3BucketSource: S3BucketSource;
  tags?: { [key: string]: string | undefined };
}
export interface StartImportResponse {
  importTask?: ImportTask;
}
export interface EnrichmentSourceS3Configuration {
  s3Bucket: string;
  s3BucketOwner: string;
  s3Key: string;
}
export type IpAssignmentStrategy = string;
export interface StartImportFileEnrichmentRequest {
  clientToken?: string;
  s3BucketSource: EnrichmentSourceS3Configuration;
  s3BucketTarget: EnrichmentTargetS3Configuration;
  ipAssignmentStrategy?: string;
}
export interface StartImportFileEnrichmentResponse {
  jobID?: string;
}
export interface StartNetworkMigrationAnalysisRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
}
export interface StartNetworkMigrationAnalysisResponse {
  jobID?: string;
}
export type CodeGenerationOutputFormatTypes = string[];
export interface StartNetworkMigrationCodeGenerationRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  codeGenerationOutputFormatTypes?: string[];
}
export interface StartNetworkMigrationCodeGenerationResponse {
  jobID?: string;
}
export interface StartNetworkMigrationDeploymentRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
}
export interface StartNetworkMigrationDeployerJobResponse {
  jobID?: string;
}
export type SecurityGroupMappingStrategy = string;
export interface StartNetworkMigrationMappingRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  securityGroupMappingStrategy?: string;
}
export interface StartNetworkMigrationMappingResponse {
  jobID?: string;
}
export interface MergeConstruct {
  segmentID?: string;
  constructID?: string;
}
export type MergeConstructs = MergeConstruct[];
export interface MergeOperation {
  mergeConstructs?: MergeConstruct[];
}
export type CidrBlock = string;
export interface SplitConstruct {
  cidrBlock?: string;
}
export type SplitConstructs = SplitConstruct[];
export interface SplitOperation {
  splitConstructs?: SplitConstruct[];
}
export interface DeleteOperation {}
export interface UpdateOperation {
  name?: string;
  excluded?: boolean;
  properties?: { [key: string]: string | undefined };
}
export type OperationUnion =
  | { merge: MergeOperation; split?: never; delete?: never; update?: never }
  | { merge?: never; split: SplitOperation; delete?: never; update?: never }
  | { merge?: never; split?: never; delete: DeleteOperation; update?: never }
  | { merge?: never; split?: never; delete?: never; update: UpdateOperation };
export interface StartNetworkMigrationMappingUpdateConstruct {
  segmentID: string;
  constructID: string;
  constructType: string;
  operation?: OperationUnion;
}
export type StartNetworkMigrationMappingUpdateConstructs =
  StartNetworkMigrationMappingUpdateConstruct[];
export interface StartNetworkMigrationMappingUpdateSegment {
  segmentID: string;
  targetAccount?: string;
  scopeTags?: { [key: string]: string | undefined };
}
export type StartNetworkMigrationMappingUpdateSegments =
  StartNetworkMigrationMappingUpdateSegment[];
export interface StartNetworkMigrationMappingUpdateRequest {
  networkMigrationExecutionID: string;
  networkMigrationDefinitionID: string;
  constructs?: StartNetworkMigrationMappingUpdateConstruct[];
  segments?: StartNetworkMigrationMappingUpdateSegment[];
}
export interface StartNetworkMigrationMappingUpdateResponse {
  jobID?: string;
}
export interface StartReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export type StartTestRequestSourceServerIDs = string[];
export interface StartTestRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export interface StartTestResponse {
  job?: Job;
}
export interface StopReplicationRequest {
  sourceServerID: string;
  accountID?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TerminateTargetInstancesRequestSourceServerIDs = string[];
export interface TerminateTargetInstancesRequest {
  sourceServerIDs: string[];
  tags?: { [key: string]: string | undefined };
  accountID?: string;
}
export interface TerminateTargetInstancesResponse {
  job?: Job;
}
export interface UnarchiveApplicationRequest {
  applicationID: string;
  accountID?: string;
}
export interface UnarchiveWaveRequest {
  waveID: string;
  accountID?: string;
}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateApplicationRequest {
  applicationID: string;
  name?: string;
  description?: string;
  accountID?: string;
}
export interface UpdateConnectorRequest {
  connectorID: string;
  name?: string;
  ssmCommandConfig?: ConnectorSsmCommandConfig;
}
export interface UpdateLaunchConfigurationRequest {
  sourceServerID: string;
  name?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  accountID?: string;
}
export interface UpdateLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
  postLaunchActions?: PostLaunchActions;
  enableMapAutoTagging?: boolean;
  mapAutoTaggingMpeID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  associatePublicIpAddress?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  bootMode?: string;
  smallVolumeMaxSize?: number;
  smallVolumeConf?: LaunchTemplateDiskConf;
  largeVolumeConf?: LaunchTemplateDiskConf;
  enableParametersEncryption?: boolean;
  parametersEncryptionKey?: string;
}
export interface TargetS3ConfigurationUpdate {
  s3Bucket?: string;
  s3BucketOwner?: string;
}
export interface TargetNetworkUpdate {
  topology?: string;
  inboundCidr?: string;
  outboundCidr?: string;
  inspectionCidr?: string;
}
export interface UpdateNetworkMigrationDefinitionRequest {
  networkMigrationDefinitionID: string;
  name?: string;
  description?: string;
  sourceConfigurations?: SourceConfiguration[];
  targetS3Configuration?: TargetS3ConfigurationUpdate;
  targetNetwork?: TargetNetworkUpdate;
  targetDeployment?: string;
  scopeTags?: { [key: string]: string | undefined };
}
export interface UpdateNetworkMigrationMapperSegmentRequest {
  networkMigrationDefinitionID: string;
  networkMigrationExecutionID: string;
  segmentID: string;
  scopeTags?: { [key: string]: string | undefined };
}
export interface UpdateReplicationConfigurationRequest {
  sourceServerID: string;
  name?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  replicatedDisks?: ReplicationConfigurationReplicatedDisk[];
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  accountID?: string;
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
}
export interface UpdateReplicationConfigurationTemplateRequest {
  replicationConfigurationTemplateID: string;
  arn?: string;
  stagingAreaSubnetId?: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs?: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption?: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling?: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags?: { [key: string]: string | undefined };
  useFipsEndpoint?: boolean;
  internetProtocol?: string;
  storeSnapshotOnLocalZone?: boolean;
  storageConfiguration?: StorageConfiguration;
}
export type FqdnForActionFramework = string;
export interface UpdateSourceServerRequest {
  accountID?: string;
  sourceServerID: string;
  connectorAction?: SourceServerConnectorAction;
  userProvidedID?: string;
  fqdnForActionFramework?: string;
  platform?: string;
}
export interface UpdateSourceServerReplicationTypeRequest {
  sourceServerID: string;
  replicationType: string;
  accountID?: string;
}
export interface UpdateWaveRequest {
  waveID: string;
  name?: string;
  description?: string;
  accountID?: string;
}
export interface ErrorDetails {
  message?: string;
  code?: string;
  resourceId?: string;
  resourceType?: string;
}
export type ConflictExceptionErrors = ErrorDetails[];
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name?: string;
  message?: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type ArchiveApplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Archive application.
 */
export const archiveApplication: API.OperationMethod<
  ArchiveApplicationRequest,
  Application,
  ArchiveApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ArchiveApplication",
    input: { applicationID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveApplication",
})) as any;

export type ArchiveWaveError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Archive wave.
 */
export const archiveWave: API.OperationMethod<
  ArchiveWaveRequest,
  Wave,
  ArchiveWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ArchiveWave",
    input: { waveID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveWave",
})) as any;

export type AssociateApplicationsError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Associate applications to wave.
 */
export const associateApplications: API.OperationMethod<
  AssociateApplicationsRequest,
  AssociateApplicationsResponse,
  AssociateApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /AssociateApplications",
    input: { waveID: 0, applicationIDs: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplications",
})) as any;

export type AssociateSourceServersError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Associate source servers to application.
 */
export const associateSourceServers: API.OperationMethod<
  AssociateSourceServersRequest,
  AssociateSourceServersResponse,
  AssociateSourceServersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /AssociateSourceServers",
    input: { applicationID: 0, sourceServerIDs: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceServers",
})) as any;

export type ChangeServerLifeCycleStateError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows the user to set the SourceServer.LifeCycle.state property for specific Source Server IDs to one of the following: READY_FOR_TEST or READY_FOR_CUTOVER. This command only works if the Source Server is already launchable (dataReplicationInfo.lagDuration is not null.)
 */
export const changeServerLifeCycleState: API.OperationMethod<
  ChangeServerLifeCycleStateRequest,
  SourceServer,
  ChangeServerLifeCycleStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ChangeServerLifeCycleState",
    input: { sourceServerID: 0, lifeCycle: { state: 0 }, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeServerLifeCycleState",
})) as any;

export type CreateApplicationError =
  | ConflictException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Create application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  Application,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateApplication",
    input: { name: 0, description: 0, tags: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
})) as any;

export type CreateConnectorError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Create Connector.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  Connector,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateConnector",
    input: {
      name: 0,
      ssmInstanceID: 0,
      tags: 0,
      ssmCommandConfig: i_ConnectorSsmCommandConfig,
    },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
})) as any;

export type CreateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Launch Configuration Template.
 */
export const createLaunchConfigurationTemplate: API.OperationMethod<
  CreateLaunchConfigurationTemplateRequest,
  LaunchConfigurationTemplate,
  CreateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLaunchConfigurationTemplate",
    input: {
      postLaunchActions: i_PostLaunchActions,
      enableMapAutoTagging: 0,
      mapAutoTaggingMpeID: 0,
      tags: 0,
      launchDisposition: 0,
      targetInstanceTypeRightSizingMethod: 0,
      copyPrivateIp: 0,
      associatePublicIpAddress: 0,
      copyTags: 0,
      licensing: i_Licensing,
      bootMode: 0,
      smallVolumeMaxSize: 0,
      smallVolumeConf: i_LaunchTemplateDiskConf,
      largeVolumeConf: i_LaunchTemplateDiskConf,
      enableParametersEncryption: 0,
      parametersEncryptionKey: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLaunchConfigurationTemplate",
})) as any;

export type CreateNetworkMigrationDefinitionError =
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new network migration definition that specifies the source and target network configuration for a migration.
 */
export const createNetworkMigrationDefinition: API.OperationMethod<
  CreateNetworkMigrationDefinitionRequest,
  NetworkMigrationDefinition,
  CreateNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/CreateNetworkMigrationDefinition",
    input: {
      name: 0,
      description: 0,
      sourceConfigurations: D.list(i_SourceConfiguration),
      targetS3Configuration: { s3Bucket: 0, s3BucketOwner: 0 },
      targetNetwork: {
        topology: 0,
        inboundCidr: 0,
        outboundCidr: 0,
        inspectionCidr: 0,
      },
      targetDeployment: 0,
      tags: 0,
      scopeTags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkMigrationDefinition",
})) as any;

export type CreateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new ReplicationConfigurationTemplate.
 */
export const createReplicationConfigurationTemplate: API.OperationMethod<
  CreateReplicationConfigurationTemplateRequest,
  ReplicationConfigurationTemplate,
  CreateReplicationConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateReplicationConfigurationTemplate",
    input: {
      stagingAreaSubnetId: 0,
      associateDefaultSecurityGroup: 0,
      replicationServersSecurityGroupsIDs: 0,
      replicationServerInstanceType: 0,
      useDedicatedReplicationServer: 0,
      defaultLargeStagingDiskType: 0,
      ebsEncryption: 0,
      ebsEncryptionKeyArn: 0,
      bandwidthThrottling: 0,
      dataPlaneRouting: 0,
      createPublicIP: 0,
      stagingAreaTags: 0,
      useFipsEndpoint: 0,
      tags: 0,
      internetProtocol: 0,
      storeSnapshotOnLocalZone: 0,
      storageConfiguration: i_StorageConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfigurationTemplate",
})) as any;

export type CreateWaveError =
  | ConflictException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Create wave.
 */
export const createWave: API.OperationMethod<
  CreateWaveRequest,
  Wave,
  CreateWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateWave",
    input: { name: 0, description: 0, tags: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWave",
})) as any;

export type DeleteApplicationError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Delete application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteApplication",
    input: { applicationID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
})) as any;

export type DeleteConnectorError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Delete Connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteConnector",
    input: { connectorID: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
})) as any;

export type DeleteJobError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Job by ID.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteJob",
    input: { jobID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
})) as any;

export type DeleteLaunchConfigurationTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Launch Configuration Template by ID.
 */
export const deleteLaunchConfigurationTemplate: API.OperationMethod<
  DeleteLaunchConfigurationTemplateRequest,
  DeleteLaunchConfigurationTemplateResponse,
  DeleteLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLaunchConfigurationTemplate",
    input: { launchConfigurationTemplateID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchConfigurationTemplate",
})) as any;

export type DeleteNetworkMigrationDefinitionError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a network migration definition. This operation removes the migration definition and all associated metadata.
 */
export const deleteNetworkMigrationDefinition: API.OperationMethod<
  DeleteNetworkMigrationDefinitionRequest,
  DeleteNetworkMigrationDefinitionResponse,
  DeleteNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/DeleteNetworkMigrationDefinition",
    input: { networkMigrationDefinitionID: 0 },
    body: true,
  },
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkMigrationDefinition",
})) as any;

export type DeleteReplicationConfigurationTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Replication Configuration Template by ID
 */
export const deleteReplicationConfigurationTemplate: API.OperationMethod<
  DeleteReplicationConfigurationTemplateRequest,
  DeleteReplicationConfigurationTemplateResponse,
  DeleteReplicationConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteReplicationConfigurationTemplate",
    input: { replicationConfigurationTemplateID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfigurationTemplate",
})) as any;

export type DeleteSourceServerError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single source server by ID.
 */
export const deleteSourceServer: API.OperationMethod<
  DeleteSourceServerRequest,
  DeleteSourceServerResponse,
  DeleteSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteSourceServer",
    input: { sourceServerID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceServer",
})) as any;

export type DeleteVcenterClientError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given vCenter client by ID.
 */
export const deleteVcenterClient: API.OperationMethod<
  DeleteVcenterClientRequest,
  DeleteVcenterClientResponse,
  DeleteVcenterClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteVcenterClient",
    input: { vcenterClientID: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVcenterClient",
})) as any;

export type DeleteWaveError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Delete wave.
 */
export const deleteWave: API.OperationMethod<
  DeleteWaveRequest,
  DeleteWaveResponse,
  DeleteWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteWave",
    input: { waveID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWave",
})) as any;

export type DescribeJobLogItemsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed job log items with paging.
 */
export const describeJobLogItems: API.PaginatedOperationMethod<
  DescribeJobLogItemsRequest,
  DescribeJobLogItemsResponse,
  DescribeJobLogItemsError,
  Credentials | HttpClient.HttpClient,
  JobLog
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeJobLogItems",
    input: { jobID: 0, maxResults: 0, nextToken: 0, accountID: 0 },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobLogItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeJobsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Jobs. Use the JobsID and fromDate and toData filters to limit which jobs are returned. The response is sorted by creationDataTime - latest date first. Jobs are normally created by the StartTest, StartCutover, and TerminateTargetInstances APIs. Jobs are also created by DiagnosticLaunch and TerminateDiagnosticInstances, which are APIs available only to *Support* and only used in response to relevant support tickets.
 */
export const describeJobs: API.PaginatedOperationMethod<
  DescribeJobsRequest,
  DescribeJobsResponse,
  DescribeJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeJobs",
    input: {
      filters: { jobIDs: 0, fromDate: 0, toDate: 0 },
      maxResults: 0,
      nextToken: 0,
      accountID: 0,
    },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeLaunchConfigurationTemplatesError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Launch Configuration Templates, filtered by Launch Configuration Template IDs
 */
export const describeLaunchConfigurationTemplates: API.PaginatedOperationMethod<
  DescribeLaunchConfigurationTemplatesRequest,
  DescribeLaunchConfigurationTemplatesResponse,
  DescribeLaunchConfigurationTemplatesError,
  Credentials | HttpClient.HttpClient,
  LaunchConfigurationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeLaunchConfigurationTemplates",
    input: { launchConfigurationTemplateIDs: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLaunchConfigurationTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeReplicationConfigurationTemplatesError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all ReplicationConfigurationTemplates, filtered by Source Server IDs.
 */
export const describeReplicationConfigurationTemplates: API.PaginatedOperationMethod<
  DescribeReplicationConfigurationTemplatesRequest,
  DescribeReplicationConfigurationTemplatesResponse,
  DescribeReplicationConfigurationTemplatesError,
  Credentials | HttpClient.HttpClient,
  ReplicationConfigurationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeReplicationConfigurationTemplates",
    input: {
      replicationConfigurationTemplateIDs: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationConfigurationTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeSourceServersError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all SourceServers or multiple SourceServers by ID.
 */
export const describeSourceServers: API.PaginatedOperationMethod<
  DescribeSourceServersRequest,
  DescribeSourceServersResponse,
  DescribeSourceServersError,
  Credentials | HttpClient.HttpClient,
  SourceServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeSourceServers",
    input: {
      filters: {
        sourceServerIDs: 0,
        isArchived: 0,
        replicationTypes: 0,
        lifeCycleStates: 0,
        applicationIDs: 0,
      },
      maxResults: 0,
      nextToken: 0,
      accountID: 0,
    },
    output: { items: D.list({ launchedInstance: o_LaunchedInstance }) },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeVcenterClientsError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the installed vCenter clients.
 */
export const describeVcenterClients: API.PaginatedOperationMethod<
  DescribeVcenterClientsRequest,
  DescribeVcenterClientsResponse,
  DescribeVcenterClientsError,
  Credentials | HttpClient.HttpClient,
  VcenterClient
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /DescribeVcenterClients",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVcenterClients",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisassociateApplicationsError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disassociate applications from wave.
 */
export const disassociateApplications: API.OperationMethod<
  DisassociateApplicationsRequest,
  DisassociateApplicationsResponse,
  DisassociateApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DisassociateApplications",
    input: { waveID: 0, applicationIDs: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplications",
})) as any;

export type DisassociateSourceServersError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disassociate source servers from application.
 */
export const disassociateSourceServers: API.OperationMethod<
  DisassociateSourceServersRequest,
  DisassociateSourceServersResponse,
  DisassociateSourceServersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DisassociateSourceServers",
    input: { applicationID: 0, sourceServerIDs: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceServers",
})) as any;

export type DisconnectFromServiceError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disconnects specific Source Servers from Application Migration Service. Data replication is stopped immediately. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. If the agent on the source server has not been prevented from communicating with the Application Migration Service service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectFromService: API.OperationMethod<
  DisconnectFromServiceRequest,
  SourceServer,
  DisconnectFromServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DisconnectFromService",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectFromService",
})) as any;

export type FinalizeCutoverError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Finalizes the cutover immediately for specific Source Servers. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. The AWS Replication Agent will receive a command to uninstall itself (within 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be changed to DISCONNECTED; The SourceServer.lifeCycle.state will be changed to CUTOVER; The totalStorageBytes property fo each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const finalizeCutover: API.OperationMethod<
  FinalizeCutoverRequest,
  SourceServer,
  FinalizeCutoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /FinalizeCutover",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FinalizeCutover",
})) as any;

export type GetLaunchConfigurationError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all LaunchConfigurations available, filtered by Source Server IDs.
 */
export const getLaunchConfiguration: API.OperationMethod<
  GetLaunchConfigurationRequest,
  LaunchConfiguration,
  GetLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetLaunchConfiguration",
    input: { sourceServerID: 0, accountID: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLaunchConfiguration",
})) as any;

export type GetNetworkMigrationDefinitionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the details of a network migration definition including source and target configurations.
 */
export const getNetworkMigrationDefinition: API.OperationMethod<
  GetNetworkMigrationDefinitionRequest,
  NetworkMigrationDefinition,
  GetNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/GetNetworkMigrationDefinition",
    input: { networkMigrationDefinitionID: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkMigrationDefinition",
})) as any;

export type GetNetworkMigrationMapperSegmentConstructError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific construct within a mapper segment, including its properties and configuration data.
 */
export const getNetworkMigrationMapperSegmentConstruct: API.OperationMethod<
  GetNetworkMigrationMapperSegmentConstructRequest,
  GetNetworkMigrationMapperSegmentConstructResponse,
  GetNetworkMigrationMapperSegmentConstructError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/GetNetworkMigrationMapperSegmentConstruct",
    input: {
      networkMigrationDefinitionID: 0,
      networkMigrationExecutionID: 0,
      segmentID: 0,
      constructID: 0,
    },
    output: { construct: o_NetworkMigrationMapperSegmentConstruct },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkMigrationMapperSegmentConstruct",
})) as any;

export type GetReplicationConfigurationError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all ReplicationConfigurations, filtered by Source Server ID.
 */
export const getReplicationConfiguration: API.OperationMethod<
  GetReplicationConfigurationRequest,
  ReplicationConfiguration,
  GetReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetReplicationConfiguration",
    input: { sourceServerID: 0, accountID: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReplicationConfiguration",
})) as any;

export type InitializeServiceError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Initialize Application Migration Service.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceRequest,
  InitializeServiceResponse,
  InitializeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /InitializeService", input: {} },
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
})) as any;

export type ListApplicationsError =
  | UninitializedAccountException
  | CommonErrors;
/**
 * Retrieves all applications or multiple applications by ID.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListApplications",
    input: {
      filters: { applicationIDs: 0, isArchived: 0, waveIDs: 0 },
      maxResults: 0,
      nextToken: 0,
      accountID: 0,
    },
    body: true,
  },
  errors: [UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConnectorsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List Connectors.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  Connector
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListConnectors",
    input: { filters: { connectorIDs: 0 }, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExportErrorsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List export errors.
 */
export const listExportErrors: API.PaginatedOperationMethod<
  ListExportErrorsRequest,
  ListExportErrorsResponse,
  ListExportErrorsError,
  Credentials | HttpClient.HttpClient,
  ExportTaskError
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListExportErrors",
    input: { exportID: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportErrors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExportsError = UninitializedAccountException | CommonErrors;
/**
 * List exports.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  ExportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListExports",
    input: { filters: { exportIDs: 0 }, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportErrorsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List import errors.
 */
export const listImportErrors: API.PaginatedOperationMethod<
  ListImportErrorsRequest,
  ListImportErrorsResponse,
  ListImportErrorsError,
  Credentials | HttpClient.HttpClient,
  ImportTaskError
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListImportErrors",
    input: { importID: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportErrors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportFileEnrichmentsError = ValidationException | CommonErrors;
/**
 * Lists import file enrichment jobs with optional filtering by job IDs.
 */
export const listImportFileEnrichments: API.PaginatedOperationMethod<
  ListImportFileEnrichmentsRequest,
  ListImportFileEnrichmentsResponse,
  ListImportFileEnrichmentsError,
  Credentials | HttpClient.HttpClient,
  ImportFileEnrichment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListImportFileEnrichments",
    input: { filters: { jobIDs: 0 }, maxResults: 0, nextToken: 0 },
    output: { items: D.list({ createdAt: D.ts, endedAt: D.ts }) },
    body: true,
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportFileEnrichments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List imports.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsRequest,
  ListImportsResponse,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  ImportTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListImports",
    input: { filters: { importIDs: 0 }, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedAccountsError =
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * List Managed Accounts.
 */
export const listManagedAccounts: API.PaginatedOperationMethod<
  ListManagedAccountsRequest,
  ListManagedAccountsResponse,
  ListManagedAccountsError,
  Credentials | HttpClient.HttpClient,
  ManagedAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListManagedAccounts",
    input: { maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationAnalysesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration analysis jobs for a specified execution. Returns information about analysis job status and results.
 */
export const listNetworkMigrationAnalyses: API.PaginatedOperationMethod<
  ListNetworkMigrationAnalysesRequest,
  ListNetworkMigrationAnalysesResponse,
  ListNetworkMigrationAnalysesError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationAnalysisJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationAnalyses",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { jobIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, endedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationAnalyses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationAnalysisResultsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the results of network migration analyses, showing connectivity and compatibility findings for migrated resources.
 */
export const listNetworkMigrationAnalysisResults: API.PaginatedOperationMethod<
  ListNetworkMigrationAnalysisResultsRequest,
  ListNetworkMigrationAnalysisResultsResponse,
  ListNetworkMigrationAnalysisResultsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationAnalysisResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationAnalysisResults",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { vpcIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationAnalysisResults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationCodeGenerationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration code generation jobs, which convert network mappings into infrastructure-as-code templates.
 */
export const listNetworkMigrationCodeGenerations: API.PaginatedOperationMethod<
  ListNetworkMigrationCodeGenerationsRequest,
  ListNetworkMigrationCodeGenerationsResponse,
  ListNetworkMigrationCodeGenerationsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationCodeGenerationJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationCodeGenerations",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { jobIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, endedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationCodeGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationCodeGenerationSegmentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists code generation segments, which represent individual infrastructure components generated as code templates.
 */
export const listNetworkMigrationCodeGenerationSegments: API.PaginatedOperationMethod<
  ListNetworkMigrationCodeGenerationSegmentsRequest,
  ListNetworkMigrationCodeGenerationSegmentsResponse,
  ListNetworkMigrationCodeGenerationSegmentsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationCodeGenerationSegment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationCodeGenerationSegments",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { segmentIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      items: D.list({
        artifacts: D.list({ createdAt: D.ts }),
        createdAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationCodeGenerationSegments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationDefinitionsError =
  | AccessDeniedException
  | CommonErrors;
/**
 * Lists all network migration definitions in the account, with optional filtering.
 */
export const listNetworkMigrationDefinitions: API.PaginatedOperationMethod<
  ListNetworkMigrationDefinitionsRequest,
  ListNetworkMigrationDefinitionsResponse,
  ListNetworkMigrationDefinitionsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationDefinitions",
    input: {
      filters: { networkMigrationDefinitionIDs: 0 },
      nextToken: 0,
      maxResults: 0,
    },
    body: true,
  },
  errors: [AccessDeniedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationDeployedStacksError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists CloudFormation stacks that have been deployed as part of the network migration.
 */
export const listNetworkMigrationDeployedStacks: API.PaginatedOperationMethod<
  ListNetworkMigrationDeployedStacksRequest,
  ListNetworkMigrationDeployedStacksResponse,
  ListNetworkMigrationDeployedStacksError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationDeployedStackDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationDeployedStacks",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationDeployedStacks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationDeploymentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration deployment jobs and their current status.
 */
export const listNetworkMigrationDeployments: API.PaginatedOperationMethod<
  ListNetworkMigrationDeploymentsRequest,
  ListNetworkMigrationDeployerJobResponse,
  ListNetworkMigrationDeploymentsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationDeployerJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationDeployments",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { jobIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, endedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationExecutionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists network migration execution instances for a given definition, showing the status and progress of each execution.
 */
export const listNetworkMigrationExecutions: API.PaginatedOperationMethod<
  ListNetworkMigrationExecutionsRequest,
  ListNetworkMigrationExecutionsResponse,
  ListNetworkMigrationExecutionsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationExecutions",
    input: {
      networkMigrationDefinitionID: 0,
      filters: {
        networkMigrationExecutionIDs: 0,
        networkMigrationExecutionStatuses: 0,
      },
      nextToken: 0,
      maxResults: 0,
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMapperSegmentConstructsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists constructs within a mapper segment, representing individual infrastructure components like VPCs, subnets, or security groups.
 */
export const listNetworkMigrationMapperSegmentConstructs: API.PaginatedOperationMethod<
  ListNetworkMigrationMapperSegmentConstructsRequest,
  ListNetworkMigrationMapperSegmentConstructsResponse,
  ListNetworkMigrationMapperSegmentConstructsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMapperSegmentConstruct
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationMapperSegmentConstructs",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      segmentID: 0,
      filters: { constructIDs: 0, constructTypes: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list(o_NetworkMigrationMapperSegmentConstruct) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMapperSegmentConstructs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMapperSegmentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists mapper segments, which represent logical groupings of network resources to be migrated together.
 */
export const listNetworkMigrationMapperSegments: API.PaginatedOperationMethod<
  ListNetworkMigrationMapperSegmentsRequest,
  ListNetworkMigrationMapperSegmentsResponse,
  ListNetworkMigrationMapperSegmentsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMapperSegment
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationMapperSegments",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { segmentIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMapperSegments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMappingsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network migration mapping jobs, which analyze and create relationships between source and target network resources.
 */
export const listNetworkMigrationMappings: API.PaginatedOperationMethod<
  ListNetworkMigrationMappingsRequest,
  ListNetworkMigrationMappingsResponse,
  ListNetworkMigrationMappingsError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMappingJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationMappings",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { jobIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, endedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMappings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkMigrationMappingUpdatesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists mapping update jobs, which apply customer modifications to the generated network mappings.
 */
export const listNetworkMigrationMappingUpdates: API.PaginatedOperationMethod<
  ListNetworkMigrationMappingUpdatesRequest,
  ListNetworkMigrationMappingUpdatesResponse,
  ListNetworkMigrationMappingUpdatesError,
  Credentials | HttpClient.HttpClient,
  NetworkMigrationMappingUpdateJobDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/ListNetworkMigrationMappingUpdates",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      filters: { jobIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, endedAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkMigrationMappingUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceServerActionsError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * List source server post migration custom actions.
 */
export const listSourceServerActions: API.PaginatedOperationMethod<
  ListSourceServerActionsRequest,
  ListSourceServerActionsResponse,
  ListSourceServerActionsError,
  Credentials | HttpClient.HttpClient,
  SourceServerActionDocument
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListSourceServerActions",
    input: {
      sourceServerID: 0,
      filters: { actionIDs: 0 },
      maxResults: 0,
      nextToken: 0,
      accountID: 0,
    },
    body: true,
  },
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceServerActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all tags for your Application Migration Service resources.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTemplateActionsError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * List template post migration custom actions.
 */
export const listTemplateActions: API.PaginatedOperationMethod<
  ListTemplateActionsRequest,
  ListTemplateActionsResponse,
  ListTemplateActionsError,
  Credentials | HttpClient.HttpClient,
  TemplateActionDocument
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListTemplateActions",
    input: {
      launchConfigurationTemplateID: 0,
      filters: { actionIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWavesError = UninitializedAccountException | CommonErrors;
/**
 * Retrieves all waves or multiple waves by ID.
 */
export const listWaves: API.PaginatedOperationMethod<
  ListWavesRequest,
  ListWavesResponse,
  ListWavesError,
  Credentials | HttpClient.HttpClient,
  Wave
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListWaves",
    input: {
      filters: { waveIDs: 0, isArchived: 0 },
      maxResults: 0,
      nextToken: 0,
      accountID: 0,
    },
    body: true,
  },
  errors: [UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWaves",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type MarkAsArchivedError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Archives specific Source Servers by setting the SourceServer.isArchived property to true for specified SourceServers by ID. This command only works for SourceServers with a lifecycle. state which equals DISCONNECTED or CUTOVER.
 */
export const markAsArchived: API.OperationMethod<
  MarkAsArchivedRequest,
  SourceServer,
  MarkAsArchivedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /MarkAsArchived",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MarkAsArchived",
})) as any;

export type PauseReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Pause Replication.
 */
export const pauseReplication: API.OperationMethod<
  PauseReplicationRequest,
  SourceServer,
  PauseReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PauseReplication",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseReplication",
})) as any;

export type PutSourceServerActionError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Put source server post migration custom action.
 */
export const putSourceServerAction: API.OperationMethod<
  PutSourceServerActionRequest,
  SourceServerActionDocument,
  PutSourceServerActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutSourceServerAction",
    input: {
      sourceServerID: 0,
      actionName: 0,
      documentIdentifier: 0,
      order: 0,
      actionID: 0,
      documentVersion: 0,
      active: 0,
      timeoutSeconds: 0,
      mustSucceedForCutover: 0,
      parameters: D.map(D.list(i_SsmParameterStoreParameter)),
      externalParameters: D.map(i_SsmExternalParameter),
      description: 0,
      category: 0,
      accountID: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSourceServerAction",
})) as any;

export type PutTemplateActionError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Put template post migration custom action.
 */
export const putTemplateAction: API.OperationMethod<
  PutTemplateActionRequest,
  TemplateActionDocument,
  PutTemplateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutTemplateAction",
    input: {
      launchConfigurationTemplateID: 0,
      actionName: 0,
      documentIdentifier: 0,
      order: 0,
      actionID: 0,
      documentVersion: 0,
      active: 0,
      timeoutSeconds: 0,
      mustSucceedForCutover: 0,
      parameters: D.map(D.list(i_SsmParameterStoreParameter)),
      operatingSystem: 0,
      externalParameters: D.map(i_SsmExternalParameter),
      description: 0,
      category: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTemplateAction",
})) as any;

export type RemoveSourceServerActionError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Remove source server post migration custom action.
 */
export const removeSourceServerAction: API.OperationMethod<
  RemoveSourceServerActionRequest,
  RemoveSourceServerActionResponse,
  RemoveSourceServerActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RemoveSourceServerAction",
    input: { sourceServerID: 0, actionID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSourceServerAction",
})) as any;

export type RemoveTemplateActionError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Remove template post migration custom action.
 */
export const removeTemplateAction: API.OperationMethod<
  RemoveTemplateActionRequest,
  RemoveTemplateActionResponse,
  RemoveTemplateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RemoveTemplateAction",
    input: { launchConfigurationTemplateID: 0, actionID: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTemplateAction",
})) as any;

export type ResumeReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Resume Replication.
 */
export const resumeReplication: API.OperationMethod<
  ResumeReplicationRequest,
  SourceServer,
  ResumeReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ResumeReplication",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeReplication",
})) as any;

export type RetryDataReplicationError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Causes the data replication initiation sequence to begin immediately upon next Handshake for specified SourceServer IDs, regardless of when the previous initiation started. This command will not work if the SourceServer is not stalled or is in a DISCONNECTED or STOPPED state.
 */
export const retryDataReplication: API.OperationMethod<
  RetryDataReplicationRequest,
  SourceServer,
  RetryDataReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RetryDataReplication",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryDataReplication",
})) as any;

export type StartCutoverError =
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Launches a Cutover Instance for specific Source Servers. This command starts a LAUNCH job whose initiatedBy property is StartCutover and changes the SourceServer.lifeCycle.state property to CUTTING_OVER.
 */
export const startCutover: API.OperationMethod<
  StartCutoverRequest,
  StartCutoverResponse,
  StartCutoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartCutover",
    input: { sourceServerIDs: 0, tags: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCutover",
})) as any;

export type StartExportError =
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start export.
 */
export const startExport: API.OperationMethod<
  StartExportRequest,
  StartExportResponse,
  StartExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartExport",
    input: { s3Bucket: 0, s3Key: 0, s3BucketOwner: 0, tags: 0 },
    body: true,
  },
  errors: [
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExport",
})) as any;

export type StartImportError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start import.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  StartImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartImport",
    input: {
      clientToken: D.m({ idempotency: true }),
      s3BucketSource: { s3Bucket: 0, s3Key: 0, s3BucketOwner: 0 },
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
})) as any;

export type StartImportFileEnrichmentError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an import file enrichment job to process and enrich network migration import files with additional metadata and IP assignment strategies.
 */
export const startImportFileEnrichment: API.OperationMethod<
  StartImportFileEnrichmentRequest,
  StartImportFileEnrichmentResponse,
  StartImportFileEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/StartImportFileEnrichment",
    input: {
      clientToken: D.m({ idempotency: true }),
      s3BucketSource: { s3Bucket: 0, s3BucketOwner: 0, s3Key: 0 },
      s3BucketTarget: { s3Bucket: 0, s3BucketOwner: 0, s3Key: 0 },
      ipAssignmentStrategy: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportFileEnrichment",
})) as any;

export type StartNetworkMigrationAnalysisError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a network migration analysis job to evaluate connectivity and compatibility of the migration mappings.
 */
export const startNetworkMigrationAnalysis: API.OperationMethod<
  StartNetworkMigrationAnalysisRequest,
  StartNetworkMigrationAnalysisResponse,
  StartNetworkMigrationAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/StartNetworkMigrationAnalysis",
    input: { networkMigrationExecutionID: 0, networkMigrationDefinitionID: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationAnalysis",
})) as any;

export type StartNetworkMigrationCodeGenerationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a code generation job to convert network migration mappings into infrastructure-as-code templates.
 */
export const startNetworkMigrationCodeGeneration: API.OperationMethod<
  StartNetworkMigrationCodeGenerationRequest,
  StartNetworkMigrationCodeGenerationResponse,
  StartNetworkMigrationCodeGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/StartNetworkMigrationCodeGeneration",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      codeGenerationOutputFormatTypes: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationCodeGeneration",
})) as any;

export type StartNetworkMigrationDeploymentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a deployment job to create the target network infrastructure based on the generated code templates.
 */
export const startNetworkMigrationDeployment: API.OperationMethod<
  StartNetworkMigrationDeploymentRequest,
  StartNetworkMigrationDeployerJobResponse,
  StartNetworkMigrationDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/StartNetworkMigrationDeployment",
    input: { networkMigrationExecutionID: 0, networkMigrationDefinitionID: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationDeployment",
})) as any;

export type StartNetworkMigrationMappingError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the network migration mapping process for a given network migration execution.
 */
export const startNetworkMigrationMapping: API.OperationMethod<
  StartNetworkMigrationMappingRequest,
  StartNetworkMigrationMappingResponse,
  StartNetworkMigrationMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/StartNetworkMigrationMapping",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      securityGroupMappingStrategy: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationMapping",
})) as any;

export type StartNetworkMigrationMappingUpdateError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a job to apply customer modifications to network migration mappings, such as changing properties.
 */
export const startNetworkMigrationMappingUpdate: API.OperationMethod<
  StartNetworkMigrationMappingUpdateRequest,
  StartNetworkMigrationMappingUpdateResponse,
  StartNetworkMigrationMappingUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/StartNetworkMigrationMappingUpdate",
    input: {
      networkMigrationExecutionID: 0,
      networkMigrationDefinitionID: 0,
      constructs: D.list({
        segmentID: 0,
        constructID: 0,
        constructType: 0,
        operation: {
          merge: { mergeConstructs: D.list({ segmentID: 0, constructID: 0 }) },
          split: { splitConstructs: D.list({ cidrBlock: 0 }) },
          delete: {},
          update: { name: 0, excluded: 0, properties: 0 },
        },
      }),
      segments: D.list({ segmentID: 0, targetAccount: 0, scopeTags: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNetworkMigrationMappingUpdate",
})) as any;

export type StartReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start replication for source server irrespective of its replication type.
 */
export const startReplication: API.OperationMethod<
  StartReplicationRequest,
  SourceServer,
  StartReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartReplication",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplication",
})) as any;

export type StartTestError =
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Launches a Test Instance for specific Source Servers. This command starts a LAUNCH job whose initiatedBy property is StartTest and changes the SourceServer.lifeCycle.state property to TESTING.
 */
export const startTest: API.OperationMethod<
  StartTestRequest,
  StartTestResponse,
  StartTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartTest",
    input: { sourceServerIDs: 0, tags: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTest",
})) as any;

export type StopReplicationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Stop Replication.
 */
export const stopReplication: API.OperationMethod<
  StopReplicationRequest,
  SourceServer,
  StopReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopReplication",
    input: { sourceServerID: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplication",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified Application Migration Service resource or resources. When you specify an existing tag key, the value is overwritten with the new value. Each resource can have a maximum of 50 tags. Each tag consists of a key and optional value.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TerminateTargetInstancesError =
  | ConflictException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Starts a job that terminates specific launched EC2 Test and Cutover instances. This command will not work for any Source Server with a lifecycle.state of TESTING, CUTTING_OVER, or CUTOVER.
 */
export const terminateTargetInstances: API.OperationMethod<
  TerminateTargetInstancesRequest,
  TerminateTargetInstancesResponse,
  TerminateTargetInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TerminateTargetInstances",
    input: { sourceServerIDs: 0, tags: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateTargetInstances",
})) as any;

export type UnarchiveApplicationError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Unarchive application.
 */
export const unarchiveApplication: API.OperationMethod<
  UnarchiveApplicationRequest,
  Application,
  UnarchiveApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UnarchiveApplication",
    input: { applicationID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveApplication",
})) as any;

export type UnarchiveWaveError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Unarchive wave.
 */
export const unarchiveWave: API.OperationMethod<
  UnarchiveWaveRequest,
  Wave,
  UnarchiveWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UnarchiveWave",
    input: { waveID: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveWave",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified set of tags from the specified set of Application Migration Service resources.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateApplicationError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Update application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  Application,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateApplication",
    input: { applicationID: 0, name: 0, description: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
})) as any;

export type UpdateConnectorError =
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Update Connector.
 */
export const updateConnector: API.OperationMethod<
  UpdateConnectorRequest,
  Connector,
  UpdateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateConnector",
    input: {
      connectorID: 0,
      name: 0,
      ssmCommandConfig: i_ConnectorSsmCommandConfig,
    },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
})) as any;

export type UpdateLaunchConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple LaunchConfigurations by Source Server ID.
 *
 * bootMode valid values are `LEGACY_BIOS | UEFI`
 */
export const updateLaunchConfiguration: API.OperationMethod<
  UpdateLaunchConfigurationRequest,
  LaunchConfiguration,
  UpdateLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLaunchConfiguration",
    input: {
      sourceServerID: 0,
      name: 0,
      launchDisposition: 0,
      targetInstanceTypeRightSizingMethod: 0,
      copyPrivateIp: 0,
      copyTags: 0,
      licensing: i_Licensing,
      bootMode: 0,
      postLaunchActions: i_PostLaunchActions,
      enableMapAutoTagging: 0,
      mapAutoTaggingMpeID: 0,
      accountID: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfiguration",
})) as any;

export type UpdateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Launch Configuration Template by ID.
 */
export const updateLaunchConfigurationTemplate: API.OperationMethod<
  UpdateLaunchConfigurationTemplateRequest,
  LaunchConfigurationTemplate,
  UpdateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLaunchConfigurationTemplate",
    input: {
      launchConfigurationTemplateID: 0,
      postLaunchActions: i_PostLaunchActions,
      enableMapAutoTagging: 0,
      mapAutoTaggingMpeID: 0,
      launchDisposition: 0,
      targetInstanceTypeRightSizingMethod: 0,
      copyPrivateIp: 0,
      associatePublicIpAddress: 0,
      copyTags: 0,
      licensing: i_Licensing,
      bootMode: 0,
      smallVolumeMaxSize: 0,
      smallVolumeConf: i_LaunchTemplateDiskConf,
      largeVolumeConf: i_LaunchTemplateDiskConf,
      enableParametersEncryption: 0,
      parametersEncryptionKey: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfigurationTemplate",
})) as any;

export type UpdateNetworkMigrationDefinitionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing network migration definition with new source or target configurations.
 */
export const updateNetworkMigrationDefinition: API.OperationMethod<
  UpdateNetworkMigrationDefinitionRequest,
  NetworkMigrationDefinition,
  UpdateNetworkMigrationDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/UpdateNetworkMigrationDefinition",
    input: {
      networkMigrationDefinitionID: 0,
      name: 0,
      description: 0,
      sourceConfigurations: D.list(i_SourceConfiguration),
      targetS3Configuration: { s3Bucket: 0, s3BucketOwner: 0 },
      targetNetwork: {
        topology: 0,
        inboundCidr: 0,
        outboundCidr: 0,
        inspectionCidr: 0,
      },
      targetDeployment: 0,
      scopeTags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkMigrationDefinition",
})) as any;

export type UpdateNetworkMigrationMapperSegmentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a mapper segment's configuration, such as changing its scope tags.
 */
export const updateNetworkMigrationMapperSegment: API.OperationMethod<
  UpdateNetworkMigrationMapperSegmentRequest,
  NetworkMigrationMapperSegment,
  UpdateNetworkMigrationMapperSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /network-migration/UpdateNetworkMigrationMapperSegment",
    input: {
      networkMigrationDefinitionID: 0,
      networkMigrationExecutionID: 0,
      segmentID: 0,
      scopeTags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkMigrationMapperSegment",
})) as any;

export type UpdateReplicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to update multiple ReplicationConfigurations by Source Server ID.
 */
export const updateReplicationConfiguration: API.OperationMethod<
  UpdateReplicationConfigurationRequest,
  ReplicationConfiguration,
  UpdateReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateReplicationConfiguration",
    input: {
      sourceServerID: 0,
      name: 0,
      stagingAreaSubnetId: 0,
      associateDefaultSecurityGroup: 0,
      replicationServersSecurityGroupsIDs: 0,
      replicationServerInstanceType: 0,
      useDedicatedReplicationServer: 0,
      defaultLargeStagingDiskType: 0,
      replicatedDisks: D.list({
        deviceName: 0,
        isBootDisk: 0,
        stagingDiskType: 0,
        iops: 0,
        throughput: 0,
      }),
      ebsEncryption: 0,
      ebsEncryptionKeyArn: 0,
      bandwidthThrottling: 0,
      dataPlaneRouting: 0,
      createPublicIP: 0,
      stagingAreaTags: 0,
      useFipsEndpoint: 0,
      accountID: 0,
      internetProtocol: 0,
      storeSnapshotOnLocalZone: 0,
      storageConfiguration: i_StorageConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfiguration",
})) as any;

export type UpdateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple ReplicationConfigurationTemplates by ID.
 */
export const updateReplicationConfigurationTemplate: API.OperationMethod<
  UpdateReplicationConfigurationTemplateRequest,
  ReplicationConfigurationTemplate,
  UpdateReplicationConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateReplicationConfigurationTemplate",
    input: {
      replicationConfigurationTemplateID: 0,
      arn: 0,
      stagingAreaSubnetId: 0,
      associateDefaultSecurityGroup: 0,
      replicationServersSecurityGroupsIDs: 0,
      replicationServerInstanceType: 0,
      useDedicatedReplicationServer: 0,
      defaultLargeStagingDiskType: 0,
      ebsEncryption: 0,
      ebsEncryptionKeyArn: 0,
      bandwidthThrottling: 0,
      dataPlaneRouting: 0,
      createPublicIP: 0,
      stagingAreaTags: 0,
      useFipsEndpoint: 0,
      internetProtocol: 0,
      storeSnapshotOnLocalZone: 0,
      storageConfiguration: i_StorageConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfigurationTemplate",
})) as any;

export type UpdateSourceServerError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Update Source Server.
 */
export const updateSourceServer: API.OperationMethod<
  UpdateSourceServerRequest,
  SourceServer,
  UpdateSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateSourceServer",
    input: {
      accountID: 0,
      sourceServerID: 0,
      connectorAction: { credentialsSecretArn: 0, connectorArn: 0 },
      userProvidedID: 0,
      fqdnForActionFramework: 0,
      platform: 0,
    },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceServer",
})) as any;

export type UpdateSourceServerReplicationTypeError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to change between the AGENT_BASED replication type and the SNAPSHOT_SHIPPING replication type.
 *
 * SNAPSHOT_SHIPPING should be used for agentless replication.
 */
export const updateSourceServerReplicationType: API.OperationMethod<
  UpdateSourceServerReplicationTypeRequest,
  SourceServer,
  UpdateSourceServerReplicationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateSourceServerReplicationType",
    input: { sourceServerID: 0, replicationType: 0, accountID: 0 },
    output: { launchedInstance: o_LaunchedInstance },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceServerReplicationType",
})) as any;

export type UpdateWaveError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Update wave.
 */
export const updateWave: API.OperationMethod<
  UpdateWaveRequest,
  Wave,
  UpdateWaveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateWave",
    input: { waveID: 0, name: 0, description: 0, accountID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWave",
})) as any;

const i_ConnectorSsmCommandConfig: D.LazyStruct = () => ({
  s3OutputEnabled: 0,
  outputS3BucketName: 0,
  cloudWatchOutputEnabled: 0,
  cloudWatchLogGroupName: 0,
});
const i_LaunchTemplateDiskConf: D.LazyStruct = () => ({
  volumeType: 0,
  iops: 0,
  throughput: 0,
});
const i_Licensing: D.LazyStruct = () => ({ osByol: 0 });
const i_PostLaunchActions: D.LazyStruct = () => ({
  deployment: 0,
  s3LogBucket: 0,
  s3OutputKeyPrefix: 0,
  cloudWatchLogGroupName: 0,
  ssmDocuments: D.list({
    actionName: 0,
    ssmDocumentName: 0,
    timeoutSeconds: 0,
    mustSucceedForCutover: 0,
    parameters: D.map(D.list(i_SsmParameterStoreParameter)),
    externalParameters: D.map(i_SsmExternalParameter),
  }),
});
const i_SourceConfiguration: D.LazyStruct = () => ({
  sourceEnvironment: 0,
  sourceS3Configuration: { s3Bucket: 0, s3BucketOwner: 0, s3Key: 0 },
});
const i_SsmExternalParameter: D.LazyStruct = () => ({ dynamicPath: 0 });
const i_SsmParameterStoreParameter: D.LazyStruct = () => ({
  parameterType: 0,
  parameterName: 0,
});
const i_StorageConfiguration: D.LazyStruct = () => ({
  storageType: 0,
  fsxOntapConfiguration: {
    storageVirtualMachineId: 0,
    credentialsSecretArn: 0,
  },
});
const o_LaunchedInstance: D.LazyStruct = () => ({
  lastKnownChecks: D.list({ checkedAt: D.ts }),
});
const o_NetworkMigrationMapperSegmentConstruct: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
