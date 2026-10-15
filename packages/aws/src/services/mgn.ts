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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "mgn",
  serviceShapeName: "ApplicationMigrationService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "mgn" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-02-26");
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
              `https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://mgn-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://mgn.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://mgn.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://mgn.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      errors: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "ConflictExceptionErrors",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      quotaValue: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UninitializedAccountException
  extends /*@__PURE__*/ S.TaggedError<UninitializedAccountException>()(
    "UninitializedAccountException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.String),
      reason: /*@__PURE__*/ S.optional(S.String),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(2913, __c91, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DataReplicationInfoReplicatedDisks = DataReplicationInfoReplicatedDisk[];
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
export type SsmDocumentParameters = { [key: string]: SsmParameterStoreParameter[] | undefined };
export type JmesPathString = string;
export type SsmExternalParameter = { dynamicPath: string };
export type SsmDocumentExternalParameters = { [key: string]: SsmExternalParameter | undefined };
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
export type VolumeInitializationRate = number;
export interface LaunchTemplateDiskConf {
  volumeType?: string;
  iops?: number;
  throughput?: number;
  volumeInitializationRate?: number;
  deleteOnTermination?: boolean;
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
export type VpcProvisioningStrategy = string;
export interface CidrMapping {
  originalCidr: string;
  updatedCidr: string;
}
export type CidrMappingsList = CidrMapping[];
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
  vpcProvisioningStrategy?: string;
  cidrMappings?: CidrMapping[];
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
  vpcProvisioningStrategy?: string;
  cidrMappings?: CidrMapping[];
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
export type PostLaunchActionsLaunchStatusList = JobPostLaunchActionsLaunchStatus[];
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
export type ReplicationConfigurationTemplates = ReplicationConfigurationTemplate[];
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
export type ReplicationConfigurationReplicatedDisks = ReplicationConfigurationReplicatedDisk[];
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
export type NetworkMigrationAnalysisResultsList = NetworkMigrationAnalysisResult[];
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
export type NetworkMigrationCodeGenerationsList = NetworkMigrationCodeGenerationJobDetails[];
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
export type NetworkMigrationCodeGenerationArtifacts = NetworkMigrationCodeGenerationArtifact[];
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
export type NetworkMigrationCodeGenerationSegmentsList = NetworkMigrationCodeGenerationSegment[];
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
export type NetworkMigrationDefinitionSummariesList = NetworkMigrationDefinitionSummary[];
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
export type NetworkMigrationFailedResourcesList = NetworkMigrationFailedResourceDetails[];
export interface NetworkMigrationDeployedStackDetails {
  status?: string;
  stackPhysicalID?: string;
  stackLogicalID?: string;
  segmentID?: string;
  targetAccount?: string;
  failedResources?: NetworkMigrationFailedResourceDetails[];
}
export type NetworkMigrationDeployedStacksList = NetworkMigrationDeployedStackDetails[];
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
export type NetworkMigrationDeployerJobList = NetworkMigrationDeployerJobDetails[];
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
export type NetworkMigrationMapperSegmentConstructs = NetworkMigrationMapperSegmentConstruct[];
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
export type NetworkMigrationMapperSegmentsList = NetworkMigrationMapperSegment[];
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
export type NetworkMigrationMappingUpdatesList = NetworkMigrationMappingUpdateJobDetails[];
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
  vpcProvisioningStrategy?: string;
  cidrMappings?: CidrMapping[];
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
  input: __S(3328, __c104, 0) as any as S.Schema<ArchiveApplicationRequest>,
  output: __S(3361, __c105, 1) as any as S.Schema<Application>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveApplication",
}));

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
  input: __S(3744, __c117, 0) as any as S.Schema<ArchiveWaveRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<Wave>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveWave",
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<AssociateApplicationsRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<AssociateApplicationsResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplications",
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<AssociateSourceServersRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<AssociateSourceServersResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceServers",
}));

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
  input: __S(257, __c8, 1) as any as S.Schema<ChangeServerLifeCycleStateRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangeServerLifeCycleState",
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<CreateApplicationRequest>,
  output: __S(3361, __c105, 1) as any as S.Schema<Application>,
  errors: [ConflictException, ServiceQuotaExceededException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<CreateConnectorRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<Connector>,
  errors: [UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<CreateLaunchConfigurationTemplateRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<LaunchConfigurationTemplate>,
  errors: [AccessDeniedException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLaunchConfigurationTemplate",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<CreateNetworkMigrationDefinitionRequest>,
  output: __S(646, __c20, 6) as any as S.Schema<NetworkMigrationDefinition>,
  errors: [ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetworkMigrationDefinition",
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<CreateReplicationConfigurationTemplateRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<ReplicationConfigurationTemplate>,
  errors: [AccessDeniedException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfigurationTemplate",
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<CreateWaveRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<Wave>,
  errors: [ConflictException, ServiceQuotaExceededException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWave",
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DeleteApplicationRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteApplicationResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteConnectorRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteConnectorResponse>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnector",
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DeleteJobRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteJobResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DeleteLaunchConfigurationTemplateRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteLaunchConfigurationTemplateResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchConfigurationTemplate",
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DeleteNetworkMigrationDefinitionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteNetworkMigrationDefinitionResponse>,
  errors: [AccessDeniedException, ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkMigrationDefinition",
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DeleteReplicationConfigurationTemplateRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteReplicationConfigurationTemplateResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfigurationTemplate",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DeleteSourceServerRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteSourceServerResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceServer",
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteVcenterClientRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteVcenterClientResponse>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVcenterClient",
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<DeleteWaveRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DeleteWaveResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWave",
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<DescribeJobLogItemsRequest>,
  output: __S(1092, __c34, 4) as any as S.Schema<DescribeJobLogItemsResponse>,
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

export type DescribeJobsError = UninitializedAccountException | ValidationException | CommonErrors;
/**
 * Returns a list of Jobs. Use the jobIDs and fromDate and toDate filters to limit which jobs are returned. The response is sorted by creationDateTime - latest date first. Jobs are normally created by the StartTest, StartCutover, and TerminateTargetInstances APIs. Jobs are also created by DiagnosticLaunch and TerminateDiagnosticInstances, which are APIs available only to *Support* and only used in response to relevant support tickets.
 */
export const describeJobs: API.PaginatedOperationMethod<
  DescribeJobsRequest,
  DescribeJobsResponse,
  DescribeJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1121, __c35, 1) as any as S.Schema<DescribeJobsRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<DescribeJobsResponse>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<DescribeLaunchConfigurationTemplatesRequest>,
  output: __S(1186, __c37, 2) as any as S.Schema<DescribeLaunchConfigurationTemplatesResponse>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
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
 * Lists all ReplicationConfigurationTemplates, filtered by replication configuration template IDs.
 */
export const describeReplicationConfigurationTemplates: API.PaginatedOperationMethod<
  DescribeReplicationConfigurationTemplatesRequest,
  DescribeReplicationConfigurationTemplatesResponse,
  DescribeReplicationConfigurationTemplatesError,
  Credentials | HttpClient.HttpClient,
  ReplicationConfigurationTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<DescribeReplicationConfigurationTemplatesRequest>,
  output: __S(1218, __c38, 2) as any as S.Schema<DescribeReplicationConfigurationTemplatesResponse>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
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
  input: __S(1249, __c39, 1) as any as S.Schema<DescribeSourceServersRequest>,
  output: __S(1251, __c39, 3) as any as S.Schema<DescribeSourceServersResponse>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<DescribeVcenterClientsRequest>,
  output: __S(1283, __c40, 3) as any as S.Schema<DescribeVcenterClientsResponse>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
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
  input: __S(1312, __c41, 0) as any as S.Schema<DisassociateApplicationsRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DisassociateApplicationsResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplications",
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<DisassociateSourceServersRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<DisassociateSourceServersResponse>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceServers",
}));

export type DisconnectFromServiceError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disconnects specific Source Servers from Application Migration Service. Data replication is stopped immediately. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. If the agent on the source server has not been prevented from communicating with Application Migration Service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectFromService: API.OperationMethod<
  DisconnectFromServiceRequest,
  SourceServer,
  DisconnectFromServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<DisconnectFromServiceRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectFromService",
}));

export type FinalizeCutoverError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Finalizes the cutover immediately for specific Source Servers. All AWS resources created by Application Migration Service for enabling the replication of these source servers will be terminated / deleted within 90 minutes. Launched Test or Cutover instances will NOT be terminated. The AWS Replication Agent will receive a command to uninstall itself (within 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be changed to DISCONNECTED; The SourceServer.lifeCycle.state will be changed to CUTOVER; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const finalizeCutover: API.OperationMethod<
  FinalizeCutoverRequest,
  SourceServer,
  FinalizeCutoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<FinalizeCutoverRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FinalizeCutover",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<GetLaunchConfigurationRequest>,
  output: __S(1472, __c46, 0) as any as S.Schema<LaunchConfiguration>,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLaunchConfiguration",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<GetNetworkMigrationDefinitionRequest>,
  output: __S(646, __c20, 6) as any as S.Schema<NetworkMigrationDefinition>,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkMigrationDefinition",
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<GetNetworkMigrationMapperSegmentConstructRequest>,
  output: __S(1537, __c48, 1) as any as S.Schema<GetNetworkMigrationMapperSegmentConstructResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkMigrationMapperSegmentConstruct",
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<GetReplicationConfigurationRequest>,
  output: __S(1634, __c51, 2) as any as S.Schema<ReplicationConfiguration>,
  errors: [ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReplicationConfiguration",
}));

export type InitializeServiceError = AccessDeniedException | ValidationException | CommonErrors;
/**
 * Initialize Application Migration Service.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceRequest,
  InitializeServiceResponse,
  InitializeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<InitializeServiceRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<InitializeServiceResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
}));

export type ListApplicationsError = UninitializedAccountException | CommonErrors;
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
  input: __S(1697, __c53, 1) as any as S.Schema<ListApplicationsRequest>,
  output: __S(1699, __c53, 3) as any as S.Schema<ListApplicationsResponse>,
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
  input: __S(1729, __c54, 1) as any as S.Schema<ListConnectorsRequest>,
  output: __S(1731, __c54, 3) as any as S.Schema<ListConnectorsResponse>,
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
  input: __S(1760, __c55, 0) as any as S.Schema<ListExportErrorsRequest>,
  output: __S(1764, __c55, 4) as any as S.Schema<ListExportErrorsResponse>,
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
  input: __S(1793, __c56, 1) as any as S.Schema<ListExportsRequest>,
  output: __S(1795, __c56, 3) as any as S.Schema<ListExportsResponse>,
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
  input: __S(1856, __c58, 0) as any as S.Schema<ListImportErrorsRequest>,
  output: __S(1860, __c58, 4) as any as S.Schema<ListImportErrorsResponse>,
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
  input: __S(1888, __c59, 0) as any as S.Schema<ListImportFileEnrichmentsRequest>,
  output: __S(1891, __c59, 3) as any as S.Schema<ListImportFileEnrichmentsResponse>,
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

export type ListImportsError = UninitializedAccountException | ValidationException | CommonErrors;
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
  input: __S(1985, __c62, 1) as any as S.Schema<ListImportsRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<ListImportsResponse>,
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
  input: __S(2048, __c64, 0) as any as S.Schema<ListManagedAccountsRequest>,
  output: __S(2051, __c64, 3) as any as S.Schema<ListManagedAccountsResponse>,
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
  input: __S(2080, __c65, 0) as any as S.Schema<ListNetworkMigrationAnalysesRequest>,
  output: __S(2114, __c66, 2) as any as S.Schema<ListNetworkMigrationAnalysesResponse>,
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
  input: __S(2145, __c67, 1) as any as S.Schema<ListNetworkMigrationAnalysisResultsRequest>,
  output: __S(2149, __c67, 5) as any as S.Schema<ListNetworkMigrationAnalysisResultsResponse>,
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
  input: __S(2176, __c68, 0) as any as S.Schema<ListNetworkMigrationCodeGenerationsRequest>,
  output: __S(2181, __c68, 5) as any as S.Schema<ListNetworkMigrationCodeGenerationsResponse>,
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
  input: __S(2208, __c69, 0) as any as S.Schema<ListNetworkMigrationCodeGenerationSegmentsRequest>,
  output: __S(
    2213,
    __c69,
    5,
  ) as any as S.Schema<ListNetworkMigrationCodeGenerationSegmentsResponse>,
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

export type ListNetworkMigrationDefinitionsError = AccessDeniedException | CommonErrors;
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
  input: __S(2305, __c72, 1) as any as S.Schema<ListNetworkMigrationDefinitionsRequest>,
  output: __S(2308, __c72, 4) as any as S.Schema<ListNetworkMigrationDefinitionsResponse>,
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
  input: __S(2336, __c73, 0) as any as S.Schema<ListNetworkMigrationDeployedStacksRequest>,
  output: __S(2341, __c73, 5) as any as S.Schema<ListNetworkMigrationDeployedStacksResponse>,
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
  input: __S(2368, __c74, 0) as any as S.Schema<ListNetworkMigrationDeploymentsRequest>,
  output: __S(2114, __c66, 2) as any as S.Schema<ListNetworkMigrationDeployerJobResponse>,
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
  input: __S(2401, __c75, 1) as any as S.Schema<ListNetworkMigrationExecutionsRequest>,
  output: __S(2404, __c75, 4) as any as S.Schema<ListNetworkMigrationExecutionsResponse>,
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
  input: __S(2433, __c76, 1) as any as S.Schema<ListNetworkMigrationMapperSegmentConstructsRequest>,
  output: __S(
    2435,
    __c76,
    3,
  ) as any as S.Schema<ListNetworkMigrationMapperSegmentConstructsResponse>,
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
  input: __S(2464, __c77, 0) as any as S.Schema<ListNetworkMigrationMapperSegmentsRequest>,
  output: __S(2466, __c77, 2) as any as S.Schema<ListNetworkMigrationMapperSegmentsResponse>,
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
  input: __S(2528, __c79, 0) as any as S.Schema<ListNetworkMigrationMappingsRequest>,
  output: __S(2114, __c66, 2) as any as S.Schema<ListNetworkMigrationMappingsResponse>,
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
  input: __S(2560, __c80, 0) as any as S.Schema<ListNetworkMigrationMappingUpdatesRequest>,
  output: __S(2114, __c66, 2) as any as S.Schema<ListNetworkMigrationMappingUpdatesResponse>,
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
  input: __S(2592, __c81, 0) as any as S.Schema<ListSourceServerActionsRequest>,
  output: __S(2594, __c81, 2) as any as S.Schema<ListSourceServerActionsResponse>,
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
  input: __S(2688, __c84, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(2720, __c85, 0) as any as S.Schema<ListTemplateActionsRequest>,
  output: __S(2722, __c85, 2) as any as S.Schema<ListTemplateActionsResponse>,
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
  input: __S(2785, __c87, 1) as any as S.Schema<ListWavesRequest>,
  output: __S(2787, __c87, 3) as any as S.Schema<ListWavesResponse>,
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
 * Archives specific Source Servers by setting the SourceServer.isArchived property to true for specified SourceServers by ID. This command only works for SourceServers with a lifecycle state that equals DISCONNECTED or CUTOVER.
 */
export const markAsArchived: API.OperationMethod<
  MarkAsArchivedRequest,
  SourceServer,
  MarkAsArchivedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<MarkAsArchivedRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MarkAsArchived",
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<PauseReplicationRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
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
}));

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
  input: __S(2880, __c90, 0) as any as S.Schema<PutSourceServerActionRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<SourceServerActionDocument>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSourceServerAction",
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<PutTemplateActionRequest>,
  output: __S(2752, __c86, 0) as any as S.Schema<TemplateActionDocument>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTemplateAction",
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<RemoveSourceServerActionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<RemoveSourceServerActionResponse>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSourceServerAction",
}));

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
  input: __S(3008, __c94, 0) as any as S.Schema<RemoveTemplateActionRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<RemoveTemplateActionResponse>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTemplateAction",
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<ResumeReplicationRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
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
}));

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
  input: __S(3072, __c96, 0) as any as S.Schema<RetryDataReplicationRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryDataReplication",
}));

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
  input: __S(3104, __c97, 0) as any as S.Schema<StartCutoverRequest>,
  output: __S(3136, __c98, 0) as any as S.Schema<StartCutoverResponse>,
  errors: [ConflictException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCutover",
}));

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
  input: __S(3168, __c99, 0) as any as S.Schema<StartExportRequest>,
  output: __S(3169, __c99, 1) as any as S.Schema<StartExportResponse>,
  errors: [ServiceQuotaExceededException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExport",
}));

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
  input: __S(3200, __c100, 0) as any as S.Schema<StartImportRequest>,
  output: __S(3201, __c100, 1) as any as S.Schema<StartImportResponse>,
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
}));

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
  input: __S(3232, __c101, 0) as any as S.Schema<StartImportFileEnrichmentRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<StartImportFileEnrichmentResponse>,
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
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<StartNetworkMigrationAnalysisRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<StartNetworkMigrationAnalysisResponse>,
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
}));

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
  input: __S(3424, __c107, 0) as any as S.Schema<StartNetworkMigrationCodeGenerationRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<StartNetworkMigrationCodeGenerationResponse>,
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
}));

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
  input: __S(3456, __c108, 0) as any as S.Schema<StartNetworkMigrationDeploymentRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<StartNetworkMigrationDeployerJobResponse>,
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
}));

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
  input: __S(3488, __c109, 0) as any as S.Schema<StartNetworkMigrationMappingRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<StartNetworkMigrationMappingResponse>,
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
}));

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
  input: __S(3532, __c110, 12) as any as S.Schema<StartNetworkMigrationMappingUpdateRequest>,
  output: __S(3264, __c102, 0) as any as S.Schema<StartNetworkMigrationMappingUpdateResponse>,
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
}));

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
  input: __S(3552, __c111, 0) as any as S.Schema<StartReplicationRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
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
}));

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
  input: __S(3584, __c112, 0) as any as S.Schema<StartTestRequest>,
  output: __S(3136, __c98, 0) as any as S.Schema<StartTestResponse>,
  errors: [ConflictException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTest",
}));

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
  input: __S(3616, __c113, 0) as any as S.Schema<StopReplicationRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
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
}));

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
  input: __S(3648, __c114, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(3680, __c115, 0) as any as S.Schema<TerminateTargetInstancesRequest>,
  output: __S(3136, __c98, 0) as any as S.Schema<TerminateTargetInstancesResponse>,
  errors: [ConflictException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateTargetInstances",
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<UnarchiveApplicationRequest>,
  output: __S(3361, __c105, 1) as any as S.Schema<Application>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveApplication",
}));

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
  input: __S(3808, __c119, 0) as any as S.Schema<UnarchiveWaveRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<Wave>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveWave",
}));

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
  input: __S(3840, __c120, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(96, __c3, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(3872, __c121, 0) as any as S.Schema<UpdateApplicationRequest>,
  output: __S(3361, __c105, 1) as any as S.Schema<Application>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

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
  input: __S(3904, __c122, 0) as any as S.Schema<UpdateConnectorRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<Connector>,
  errors: [ResourceNotFoundException, UninitializedAccountException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnector",
}));

export type UpdateLaunchConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple LaunchConfigurations by Source Server ID.
 *
 * bootMode valid values are `LEGACY_BIOS | UEFI | USE_SOURCE`
 */
export const updateLaunchConfiguration: API.OperationMethod<
  UpdateLaunchConfigurationRequest,
  LaunchConfiguration,
  UpdateLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<UpdateLaunchConfigurationRequest>,
  output: __S(1472, __c46, 0) as any as S.Schema<LaunchConfiguration>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfiguration",
}));

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
  input: __S(3968, __c124, 0) as any as S.Schema<UpdateLaunchConfigurationTemplateRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<LaunchConfigurationTemplate>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfigurationTemplate",
}));

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
  input: __S(4002, __c125, 2) as any as S.Schema<UpdateNetworkMigrationDefinitionRequest>,
  output: __S(646, __c20, 6) as any as S.Schema<NetworkMigrationDefinition>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkMigrationDefinition",
}));

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
  input: __S(4032, __c126, 0) as any as S.Schema<UpdateNetworkMigrationMapperSegmentRequest>,
  output: __S(2496, __c78, 0) as any as S.Schema<NetworkMigrationMapperSegment>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkMigrationMapperSegment",
}));

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
  input: __S(4064, __c127, 0) as any as S.Schema<UpdateReplicationConfigurationRequest>,
  output: __S(1634, __c51, 2) as any as S.Schema<ReplicationConfiguration>,
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
}));

export type UpdateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | ResourceNotFoundException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates a ReplicationConfigurationTemplate by ID.
 */
export const updateReplicationConfigurationTemplate: API.OperationMethod<
  UpdateReplicationConfigurationTemplateRequest,
  ReplicationConfigurationTemplate,
  UpdateReplicationConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<UpdateReplicationConfigurationTemplateRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<ReplicationConfigurationTemplate>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfigurationTemplate",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<UpdateSourceServerRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceServer",
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<UpdateSourceServerReplicationTypeRequest>,
  output: __S(312, __c9, 24) as any as S.Schema<SourceServer>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceServerReplicationType",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<UpdateWaveRequest>,
  output: __S(3777, __c118, 1) as any as S.Schema<Wave>,
  errors: [ConflictException, ResourceNotFoundException, UninitializedAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWave",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          message: S.optional(S.String),
          code: S.optional(S.String),
          resourceId: S.optional(S.String),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ErrorDetails" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          waveID: S.String,
          applicationIDs: __S(64, __c2, 0),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AssociateApplications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateApplicationsRequest" });
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
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AssociateApplicationsResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountID: S.optional(S.String),
          sourceServerID: S.String,
          connectorAction: S.optional(__S(311, __c9, 23)),
          userProvidedID: S.optional(S.String),
          fqdnForActionFramework: S.optional(S.String),
          platform: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateSourceServer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSourceServerRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          replicationType: S.String,
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateSourceServerReplicationType" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSourceServerReplicationTypeRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          waveID: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateWave" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateWaveRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationID: S.String,
          sourceServerIDs: __S(64, __c2, 0),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AssociateSourceServers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateSourceServersRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ state: S.String })).annotate({
        identifier: "ChangeServerLifeCycleStateSourceServerLifecycle",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          lifeCycle: __S(256, __c8, 0),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ChangeServerLifeCycleState" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ChangeServerLifeCycleStateRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          name: S.optional(S.String),
          status: S.optional(S.String),
          error: S.optional(S.String),
          checkedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "LastKnownCheck" });
    case 1:
      return S.Array(__S(288, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ec2InstanceID: S.optional(S.String),
          jobID: S.optional(S.String),
          firstBoot: S.optional(S.String),
          lastKnownChecks: S.optional(__S(289, __c9, 1)),
          lastKnownFsxChecksStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchedInstance" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          deviceName: S.optional(S.String),
          totalStorageBytes: S.optional(S.Number),
          replicatedStorageBytes: S.optional(S.Number),
          rescannedStorageBytes: S.optional(S.Number),
          backloggedStorageBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DataReplicationInfoReplicatedDisk" });
    case 4:
      return S.Array(__S(291, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "DataReplicationInitiationStep" });
    case 6:
      return S.Array(__S(293, __c9, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          startDateTime: S.optional(S.String),
          nextAttemptDateTime: S.optional(S.String),
          steps: S.optional(__S(294, __c9, 6)),
        }),
      ).annotate({ identifier: "DataReplicationInitiation" });
    case 8:
      return S.suspend(() =>
        S.Struct({ error: S.optional(S.String), rawError: S.optional(S.String) }),
      ).annotate({ identifier: "DataReplicationError" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          lagDuration: S.optional(S.String),
          etaDateTime: S.optional(S.String),
          replicatedDisks: S.optional(__S(292, __c9, 4)),
          dataReplicationState: S.optional(S.String),
          dataReplicationInitiation: S.optional(__S(295, __c9, 7)),
          dataReplicationError: S.optional(__S(296, __c9, 8)),
          lastSnapshotDateTime: S.optional(S.String),
          replicatorId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataReplicationInfo" });
    case 10:
      return S.suspend(() =>
        S.Struct({ apiCallDateTime: S.optional(S.String), jobID: S.optional(S.String) }),
      ).annotate({ identifier: "LifeCycleLastTestInitiated" });
    case 11:
      return S.suspend(() => S.Struct({ apiCallDateTime: S.optional(S.String) })).annotate({
        identifier: "LifeCycleLastTestReverted",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          initiated: S.optional(__S(298, __c9, 10)),
          reverted: S.optional(__S(299, __c9, 11)),
          finalized: S.optional(__S(299, __c9, 11)),
        }),
      ).annotate({ identifier: "LifeCycleLastTest" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          addedToServiceDateTime: S.optional(S.String),
          firstByteDateTime: S.optional(S.String),
          elapsedReplicationDuration: S.optional(S.String),
          lastSeenByServiceDateTime: S.optional(S.String),
          lastTest: S.optional(__S(300, __c9, 12)),
          lastCutover: S.optional(__S(300, __c9, 12)),
          state: S.optional(S.String),
        }),
      ).annotate({ identifier: "LifeCycle" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          fqdn: S.optional(S.String),
          hostname: S.optional(S.String),
          vmWareUuid: S.optional(S.String),
          awsInstanceID: S.optional(S.String),
          vmPath: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdentificationHints" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          macAddress: S.optional(S.String),
          ips: S.optional(__S(64, __c2, 0)),
          isPrimary: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 16:
      return S.Array(__S(303, __c9, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ deviceName: S.optional(S.String), bytes: S.optional(S.Number) }),
      ).annotate({ identifier: "Disk" });
    case 18:
      return S.Array(__S(305, __c9, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({ cores: S.optional(S.Number), modelName: S.optional(S.String) }),
      ).annotate({ identifier: "CPU" });
    case 20:
      return S.Array(__S(307, __c9, 19));
    case 21:
      return S.suspend(() => S.Struct({ fullString: S.optional(S.String) })).annotate({
        identifier: "OS",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({
          lastUpdatedDateTime: S.optional(S.String),
          recommendedInstanceType: S.optional(S.String),
          identificationHints: S.optional(__S(302, __c9, 14)),
          networkInterfaces: S.optional(__S(304, __c9, 16)),
          disks: S.optional(__S(306, __c9, 18)),
          cpus: S.optional(__S(308, __c9, 20)),
          ramBytes: S.optional(S.Number),
          os: S.optional(__S(309, __c9, 21)),
        }),
      ).annotate({ identifier: "SourceProperties" });
    case 23:
      return S.suspend(() =>
        S.Struct({
          credentialsSecretArn: S.optional(S.String),
          connectorArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceServerConnectorAction" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.optional(S.String),
          arn: S.optional(S.String),
          isArchived: S.optional(S.Boolean),
          tags: S.optional(__S(3392, __c106, 0)),
          launchedInstance: S.optional(__S(290, __c9, 2)),
          dataReplicationInfo: S.optional(__S(297, __c9, 9)),
          lifeCycle: S.optional(__S(301, __c9, 13)),
          sourceProperties: S.optional(__S(310, __c9, 22)),
          replicationType: S.optional(S.String),
          vcenterClientID: S.optional(S.String),
          applicationID: S.optional(S.String),
          userProvidedID: S.optional(S.String),
          fqdnForActionFramework: S.optional(S.String),
          connectorAction: S.optional(__S(311, __c9, 23)),
        }),
      ).annotate({ identifier: "SourceServer" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateApplicationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          ssmInstanceID: S.String,
          tags: S.optional(__S(3392, __c106, 0)),
          ssmCommandConfig: S.optional(__S(384, __c12, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateConnector" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateConnectorRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3OutputEnabled: S.Boolean,
          outputS3BucketName: S.optional(S.String),
          cloudWatchOutputEnabled: S.Boolean,
          cloudWatchLogGroupName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConnectorSsmCommandConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          connectorID: S.optional(S.String),
          name: S.optional(S.String),
          ssmInstanceID: S.optional(S.String),
          arn: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
          ssmCommandConfig: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "Connector" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          postLaunchActions: S.optional(__S(513, __c16, 1)),
          enableMapAutoTagging: S.optional(S.Boolean),
          mapAutoTaggingMpeID: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
          launchDisposition: S.optional(S.String),
          targetInstanceTypeRightSizingMethod: S.optional(S.String),
          copyPrivateIp: S.optional(S.Boolean),
          associatePublicIpAddress: S.optional(S.Boolean),
          copyTags: S.optional(S.Boolean),
          licensing: S.optional(__S(514, __c16, 2)),
          bootMode: S.optional(S.String),
          smallVolumeMaxSize: S.optional(S.Number),
          smallVolumeConf: S.optional(__S(544, __c17, 0)),
          largeVolumeConf: S.optional(__S(544, __c17, 0)),
          enableParametersEncryption: S.optional(S.Boolean),
          parametersEncryptionKey: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateLaunchConfigurationTemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLaunchConfigurationTemplateRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ parameterType: S.String, parameterName: S.String }),
      ).annotate({ identifier: "SsmParameterStoreParameter" });
    case 1:
      return S.Array(__S(448, __c14, 0));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(449, __c14, 1).pipe(S.optional));
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ dynamicPath: S.String })]);
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(451, __c14, 3).pipe(S.optional));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionName: S.String,
          ssmDocumentName: S.String,
          timeoutSeconds: S.optional(S.Number),
          mustSucceedForCutover: S.optional(S.Boolean),
          parameters: S.optional(__S(450, __c14, 2)),
          externalParameters: S.optional(__S(452, __c14, 4)),
        }),
      ).annotate({ identifier: "SsmDocument" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(480, __c15, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          deployment: S.optional(S.String),
          s3LogBucket: S.optional(S.String),
          s3OutputKeyPrefix: S.optional(S.String),
          cloudWatchLogGroupName: S.optional(S.String),
          ssmDocuments: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "PostLaunchActions" });
    case 2:
      return S.suspend(() => S.Struct({ osByol: S.optional(S.Boolean) })).annotate({
        identifier: "Licensing",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          volumeType: S.optional(S.String),
          iops: S.optional(S.Number),
          throughput: S.optional(S.Number),
          volumeInitializationRate: S.optional(S.Number),
          deleteOnTermination: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LaunchTemplateDiskConf" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          launchConfigurationTemplateID: S.String,
          arn: S.optional(S.String),
          postLaunchActions: S.optional(__S(513, __c16, 1)),
          enableMapAutoTagging: S.optional(S.Boolean),
          mapAutoTaggingMpeID: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
          ec2LaunchTemplateID: S.optional(S.String),
          launchDisposition: S.optional(S.String),
          targetInstanceTypeRightSizingMethod: S.optional(S.String),
          copyPrivateIp: S.optional(S.Boolean),
          associatePublicIpAddress: S.optional(S.Boolean),
          copyTags: S.optional(S.Boolean),
          licensing: S.optional(__S(514, __c16, 2)),
          bootMode: S.optional(S.String),
          smallVolumeMaxSize: S.optional(S.Number),
          smallVolumeConf: S.optional(__S(544, __c17, 0)),
          largeVolumeConf: S.optional(__S(544, __c17, 0)),
          enableParametersEncryption: S.optional(S.Boolean),
          parametersEncryptionKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchConfigurationTemplate" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          sourceConfigurations: S.optional(__S(641, __c20, 1)),
          targetS3Configuration: __S(642, __c20, 2),
          targetNetwork: __S(643, __c20, 3),
          targetDeployment: S.optional(S.String),
          vpcProvisioningStrategy: S.optional(S.String),
          cidrMappings: S.optional(__S(645, __c20, 5)),
          tags: S.optional(__S(3392, __c106, 0)),
          scopeTags: S.optional(__S(3392, __c106, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/CreateNetworkMigrationDefinition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNetworkMigrationDefinitionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ s3Bucket: S.String, s3BucketOwner: S.String, s3Key: S.String }),
      ).annotate({ identifier: "SourceS3Configuration" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceEnvironment: S.String, sourceS3Configuration: __S(608, __c19, 0) }),
      ).annotate({ identifier: "SourceConfiguration" });
    case 1:
      return S.Array(__S(640, __c20, 0));
    case 2:
      return S.suspend(() => S.Struct({ s3Bucket: S.String, s3BucketOwner: S.String })).annotate({
        identifier: "TargetS3Configuration",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          topology: S.String,
          inboundCidr: S.optional(S.String),
          outboundCidr: S.optional(S.String),
          inspectionCidr: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetNetwork" });
    case 4:
      return S.suspend(() => S.Struct({ originalCidr: S.String, updatedCidr: S.String })).annotate({
        identifier: "CidrMapping",
      });
    case 5:
      return S.Array(__S(644, __c20, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          networkMigrationDefinitionID: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          sourceConfigurations: S.optional(__S(641, __c20, 1)),
          targetS3Configuration: S.optional(__S(642, __c20, 2)),
          targetNetwork: S.optional(__S(643, __c20, 3)),
          targetDeployment: S.optional(S.String),
          vpcProvisioningStrategy: S.optional(S.String),
          cidrMappings: S.optional(__S(645, __c20, 5)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(3392, __c106, 0)),
          scopeTags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "NetworkMigrationDefinition" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          stagingAreaSubnetId: S.String,
          associateDefaultSecurityGroup: S.Boolean,
          replicationServersSecurityGroupsIDs: __S(64, __c2, 0),
          replicationServerInstanceType: S.String,
          useDedicatedReplicationServer: S.Boolean,
          defaultLargeStagingDiskType: S.String,
          ebsEncryption: S.String,
          ebsEncryptionKeyArn: S.optional(S.String),
          bandwidthThrottling: S.Number,
          dataPlaneRouting: S.String,
          createPublicIP: S.Boolean,
          stagingAreaTags: __S(3392, __c106, 0),
          useFipsEndpoint: S.optional(S.Boolean),
          tags: S.optional(__S(3392, __c106, 0)),
          internetProtocol: S.optional(S.String),
          storeSnapshotOnLocalZone: S.optional(S.Boolean),
          storageConfiguration: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateReplicationConfigurationTemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateReplicationConfigurationTemplateRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ storageVirtualMachineId: S.String, credentialsSecretArn: S.String }),
      ).annotate({ identifier: "FsxOntapConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ storageType: S.String, fsxOntapConfiguration: S.optional(__S(704, __c22, 0)) }),
      ).annotate({ identifier: "StorageConfiguration" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          replicationConfigurationTemplateID: S.String,
          arn: S.optional(S.String),
          stagingAreaSubnetId: S.optional(S.String),
          associateDefaultSecurityGroup: S.optional(S.Boolean),
          replicationServersSecurityGroupsIDs: S.optional(__S(64, __c2, 0)),
          replicationServerInstanceType: S.optional(S.String),
          useDedicatedReplicationServer: S.optional(S.Boolean),
          defaultLargeStagingDiskType: S.optional(S.String),
          ebsEncryption: S.optional(S.String),
          ebsEncryptionKeyArn: S.optional(S.String),
          bandwidthThrottling: S.optional(S.Number),
          dataPlaneRouting: S.optional(S.String),
          createPublicIP: S.optional(S.Boolean),
          stagingAreaTags: S.optional(__S(3392, __c106, 0)),
          useFipsEndpoint: S.optional(S.Boolean),
          tags: S.optional(__S(3392, __c106, 0)),
          internetProtocol: S.optional(S.String),
          storeSnapshotOnLocalZone: S.optional(S.Boolean),
          storageConfiguration: S.optional(__S(705, __c22, 1)),
        }),
      ).annotate({ identifier: "ReplicationConfigurationTemplate" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateWave" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWaveRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteApplicationRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ connectorID: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteConnector" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteConnectorRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteJob" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteJobRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ launchConfigurationTemplateID: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteLaunchConfigurationTemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLaunchConfigurationTemplateRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkMigrationDefinitionID: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/DeleteNetworkMigrationDefinition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNetworkMigrationDefinitionRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ replicationConfigurationTemplateID: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteReplicationConfigurationTemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteReplicationConfigurationTemplateRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteSourceServer" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSourceServerRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ vcenterClientID: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteVcenterClient" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVcenterClientRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteWave" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteWaveRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobID: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DescribeJobLogItems" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobLogItemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.optional(S.String),
          conversionServerID: S.optional(S.String),
          targetInstanceID: S.optional(S.String),
          rawError: S.optional(S.String),
          attemptCount: S.optional(S.Number),
          maxAttemptsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobLogEventData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          logDateTime: S.optional(S.String),
          event: S.optional(S.String),
          eventData: S.optional(__S(1089, __c34, 1)),
        }),
      ).annotate({ identifier: "JobLog" });
    case 3:
      return S.Array(__S(1090, __c34, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1091, __c34, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeJobLogItemsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobIDs: S.optional(__S(64, __c2, 0)),
          fromDate: S.optional(S.String),
          toDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeJobsRequestFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1120, __c35, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DescribeJobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeJobsRequest" });
    case 2:
      return S.Array(__S(1157, __c36, 5));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1122, __c35, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeJobsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ssmDocument: S.optional(__S(480, __c15, 0)),
          ssmDocumentType: S.optional(S.String),
          executionID: S.optional(S.String),
          executionStatus: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobPostLaunchActionsLaunchStatus" });
    case 1:
      return S.Array(__S(1152, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ssmAgentDiscoveryDatetime: S.optional(S.String),
          postLaunchActionsLaunchStatusList: S.optional(__S(1153, __c36, 1)),
        }),
      ).annotate({ identifier: "PostLaunchActionsStatus" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          launchStatus: S.optional(S.String),
          launchedEc2InstanceID: S.optional(S.String),
          postLaunchActionsStatus: S.optional(__S(1154, __c36, 2)),
        }),
      ).annotate({ identifier: "ParticipatingServer" });
    case 4:
      return S.Array(__S(1155, __c36, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          jobID: S.String,
          arn: S.optional(S.String),
          type: S.optional(S.String),
          initiatedBy: S.optional(S.String),
          creationDateTime: S.optional(S.String),
          endDateTime: S.optional(S.String),
          status: S.optional(S.String),
          participatingServers: S.optional(__S(1156, __c36, 4)),
          tags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "Job" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          launchConfigurationTemplateIDs: S.optional(__S(64, __c2, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DescribeLaunchConfigurationTemplates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeLaunchConfigurationTemplatesRequest" });
    case 1:
      return S.Array(__S(545, __c17, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1185, __c37, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeLaunchConfigurationTemplatesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          replicationConfigurationTemplateIDs: S.optional(__S(64, __c2, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DescribeReplicationConfigurationTemplates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeReplicationConfigurationTemplatesRequest" });
    case 1:
      return S.Array(__S(736, __c23, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1217, __c38, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeReplicationConfigurationTemplatesResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerIDs: S.optional(__S(64, __c2, 0)),
          isArchived: S.optional(S.Boolean),
          replicationTypes: S.optional(__S(64, __c2, 0)),
          lifeCycleStates: S.optional(__S(64, __c2, 0)),
          applicationIDs: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "DescribeSourceServersRequestFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1248, __c39, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DescribeSourceServers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSourceServersRequest" });
    case 2:
      return S.Array(__S(312, __c9, 24));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1250, __c39, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeSourceServersResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/DescribeVcenterClients" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeVcenterClientsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vcenterClientID: S.optional(S.String),
          arn: S.optional(S.String),
          hostname: S.optional(S.String),
          vcenterUUID: S.optional(S.String),
          datacenterName: S.optional(S.String),
          lastSeenDatetime: S.optional(S.String),
          sourceServerTags: S.optional(__S(3392, __c106, 0)),
          tags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "VcenterClient" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1282, __c40, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeVcenterClientsResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          waveID: S.String,
          applicationIDs: __S(64, __c2, 0),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DisassociateApplications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateApplicationsRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationID: S.String,
          sourceServerIDs: __S(64, __c2, 0),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DisassociateSourceServers" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateSourceServersRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DisconnectFromService" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisconnectFromServiceRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/FinalizeCutover" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "FinalizeCutoverRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetLaunchConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLaunchConfigurationRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.optional(S.String),
          name: S.optional(S.String),
          ec2LaunchTemplateID: S.optional(S.String),
          launchDisposition: S.optional(S.String),
          targetInstanceTypeRightSizingMethod: S.optional(S.String),
          copyPrivateIp: S.optional(S.Boolean),
          copyTags: S.optional(S.Boolean),
          licensing: S.optional(__S(514, __c16, 2)),
          bootMode: S.optional(S.String),
          postLaunchActions: S.optional(__S(513, __c16, 1)),
          enableMapAutoTagging: S.optional(S.Boolean),
          mapAutoTaggingMpeID: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchConfiguration" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkMigrationDefinitionID: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/GetNetworkMigrationDefinition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkMigrationDefinitionRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationDefinitionID: S.String,
          networkMigrationExecutionID: S.String,
          segmentID: S.String,
          constructID: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/GetNetworkMigrationMapperSegmentConstruct",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetNetworkMigrationMapperSegmentConstructRequest" });
    case 1:
      return S.suspend(() => S.Struct({ construct: S.optional(__S(1568, __c49, 0)) })).annotate({
        identifier: "GetNetworkMigrationMapperSegmentConstructResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          constructID: S.optional(S.String),
          constructType: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          logicalID: S.optional(S.String),
          excluded: S.optional(S.Boolean),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          properties: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "NetworkMigrationMapperSegmentConstruct" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetReplicationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetReplicationConfigurationRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deviceName: S.optional(S.String),
          isBootDisk: S.optional(S.Boolean),
          stagingDiskType: S.optional(S.String),
          iops: S.optional(S.Number),
          throughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ReplicationConfigurationReplicatedDisk" });
    case 1:
      return S.Array(__S(1632, __c51, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.optional(S.String),
          name: S.optional(S.String),
          stagingAreaSubnetId: S.optional(S.String),
          associateDefaultSecurityGroup: S.optional(S.Boolean),
          replicationServersSecurityGroupsIDs: S.optional(__S(64, __c2, 0)),
          replicationServerInstanceType: S.optional(S.String),
          useDedicatedReplicationServer: S.optional(S.Boolean),
          defaultLargeStagingDiskType: S.optional(S.String),
          replicatedDisks: S.optional(__S(1633, __c51, 1)),
          ebsEncryption: S.optional(S.String),
          ebsEncryptionKeyArn: S.optional(S.String),
          bandwidthThrottling: S.optional(S.Number),
          dataPlaneRouting: S.optional(S.String),
          createPublicIP: S.optional(S.Boolean),
          stagingAreaTags: S.optional(__S(3392, __c106, 0)),
          useFipsEndpoint: S.optional(S.Boolean),
          internetProtocol: S.optional(S.String),
          storeSnapshotOnLocalZone: S.optional(S.Boolean),
          storageConfiguration: S.optional(__S(705, __c22, 1)),
        }),
      ).annotate({ identifier: "ReplicationConfiguration" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/InitializeService" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InitializeServiceRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationIDs: S.optional(__S(64, __c2, 0)),
          isArchived: S.optional(S.Boolean),
          waveIDs: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "ListApplicationsRequestFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1696, __c53, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListApplications" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListApplicationsRequest" });
    case 2:
      return S.Array(__S(3361, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1698, __c53, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListApplicationsResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ connectorIDs: S.optional(__S(64, __c2, 0)) })).annotate({
        identifier: "ListConnectorsRequestFilters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1728, __c54, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListConnectors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListConnectorsRequest" });
    case 2:
      return S.Array(__S(385, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1730, __c54, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListConnectorsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          exportID: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListExportErrors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListExportErrorsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ rawError: S.optional(S.String) })).annotate({
        identifier: "ExportErrorData",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          errorDateTime: S.optional(S.String),
          errorData: S.optional(__S(1761, __c55, 1)),
        }),
      ).annotate({ identifier: "ExportTaskError" });
    case 3:
      return S.Array(__S(1762, __c55, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1763, __c55, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExportErrorsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ exportIDs: S.optional(__S(64, __c2, 0)) })).annotate({
        identifier: "ListExportsRequestFilters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1792, __c56, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListExports" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListExportsRequest" });
    case 2:
      return S.Array(__S(1825, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1794, __c56, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListExportsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serversCount: S.optional(S.Number),
          applicationsCount: S.optional(S.Number),
          wavesCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExportTaskSummary" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          exportID: S.optional(S.String),
          arn: S.optional(S.String),
          s3Bucket: S.optional(S.String),
          s3Key: S.optional(S.String),
          s3BucketOwner: S.optional(S.String),
          creationDateTime: S.optional(S.String),
          endDateTime: S.optional(S.String),
          status: S.optional(S.String),
          progressPercentage: S.optional(S.Number),
          summary: S.optional(__S(1824, __c57, 0)),
          tags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "ExportTask" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importID: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListImportErrors" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListImportErrorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.optional(S.String),
          applicationID: S.optional(S.String),
          waveID: S.optional(S.String),
          ec2LaunchTemplateID: S.optional(S.String),
          rowNumber: S.optional(S.Number),
          rawError: S.optional(S.String),
          accountID: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportErrorData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          errorDateTime: S.optional(S.String),
          errorType: S.optional(S.String),
          errorData: S.optional(__S(1857, __c58, 1)),
        }),
      ).annotate({ identifier: "ImportTaskError" });
    case 3:
      return S.Array(__S(1858, __c58, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1859, __c58, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportErrorsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1920, __c60, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/ListImportFileEnrichments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImportFileEnrichmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobID: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          statusDetails: S.optional(S.String),
          checksum: S.optional(__S(1952, __c61, 0)),
          s3BucketTarget: S.optional(__S(608, __c19, 0)),
        }),
      ).annotate({ identifier: "ImportFileEnrichment" });
    case 2:
      return S.Array(__S(1889, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1890, __c59, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportFileEnrichmentsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobIDs: S.optional(__S(64, __c2, 0)) })).annotate({
        identifier: "ListImportFileEnrichmentsFilters",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ encryptionAlgorithm: S.optional(S.String), hash: S.optional(S.String) }),
      ).annotate({ identifier: "Checksum" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ importIDs: S.optional(__S(64, __c2, 0)) })).annotate({
        identifier: "ListImportsRequestFilters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1984, __c62, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListImports" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListImportsRequest" });
    case 2:
      return S.Array(__S(2019, __c63, 3));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1986, __c62, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ s3Bucket: S.String, s3Key: S.String, s3BucketOwner: S.optional(S.String) }),
      ).annotate({ identifier: "S3BucketSource" });
    case 1:
      return S.suspend(() =>
        S.Struct({ createdCount: S.optional(S.Number), modifiedCount: S.optional(S.Number) }),
      ).annotate({ identifier: "ImportTaskSummaryWaves" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          waves: S.optional(__S(2017, __c63, 1)),
          applications: S.optional(__S(2017, __c63, 1)),
          servers: S.optional(__S(2017, __c63, 1)),
        }),
      ).annotate({ identifier: "ImportTaskSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          importID: S.optional(S.String),
          arn: S.optional(S.String),
          s3BucketSource: S.optional(__S(2016, __c63, 0)),
          creationDateTime: S.optional(S.String),
          endDateTime: S.optional(S.String),
          status: S.optional(S.String),
          progressPercentage: S.optional(S.Number),
          summary: S.optional(__S(2018, __c63, 2)),
          tags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "ImportTask" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListManagedAccounts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedAccountsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ accountId: S.optional(S.String) })).annotate({
        identifier: "ManagedAccount",
      });
    case 2:
      return S.Array(__S(2049, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(2050, __c64, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListManagedAccountsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(1920, __c60, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/ListNetworkMigrationAnalyses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationAnalysesRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobID: S.optional(S.String),
          networkMigrationExecutionID: S.optional(S.String),
          networkMigrationDefinitionID: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          statusDetails: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkMigrationAnalysisJobDetails" });
    case 1:
      return S.Array(__S(2112, __c66, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2113, __c66, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationAnalysesResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ vpcIDs: S.optional(__S(64, __c2, 0)) })).annotate({
        identifier: "ListNetworkMigrationAnalysisResultsFilters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(2144, __c67, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/ListNetworkMigrationAnalysisResults",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationAnalysisResultsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ vpcID: S.optional(S.String), subnetID: S.optional(S.String) }),
      ).annotate({ identifier: "NetworkMigrationAnalysisResultSource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobID: S.optional(S.String),
          networkMigrationExecutionID: S.optional(S.String),
          networkMigrationDefinitionID: S.optional(S.String),
          analyzerType: S.optional(S.String),
          source: S.optional(__S(2146, __c67, 2)),
          target: S.optional(__S(2146, __c67, 2)),
          status: S.optional(S.String),
          analysisResult: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkMigrationAnalysisResult" });
    case 4:
      return S.Array(__S(2147, __c67, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2148, __c67, 4)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationAnalysisResultsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(1920, __c60, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/ListNetworkMigrationCodeGenerations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationCodeGenerationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.optional(S.String), statusDetailList: S.optional(S.String) }),
      ).annotate({ identifier: "CodeGenerationOutputFormatStatusDetails" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(2177, __c68, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobID: S.optional(S.String),
          networkMigrationExecutionID: S.optional(S.String),
          networkMigrationDefinitionID: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          statusDetails: S.optional(S.String),
          codeGenerationOutputFormatStatusDetailsMap: S.optional(__S(2178, __c68, 2)),
        }),
      ).annotate({ identifier: "NetworkMigrationCodeGenerationJobDetails" });
    case 4:
      return S.Array(__S(2179, __c68, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2180, __c68, 4)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationCodeGenerationsResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(2240, __c70, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/ListNetworkMigrationCodeGenerationSegments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationCodeGenerationSegmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          artifactID: S.optional(S.String),
          artifactType: S.optional(S.String),
          artifactSubType: S.optional(S.String),
          logicalID: S.optional(S.String),
          outputS3Configuration: S.optional(__S(2272, __c71, 0)),
          checksum: S.optional(__S(1952, __c61, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "NetworkMigrationCodeGenerationArtifact" });
    case 2:
      return S.Array(__S(2209, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobID: S.optional(S.String),
          networkMigrationExecutionID: S.optional(S.String),
          networkMigrationDefinitionID: S.optional(S.String),
          segmentID: S.optional(S.String),
          segmentType: S.optional(S.String),
          logicalID: S.optional(S.String),
          mapperSegmentID: S.optional(S.String),
          artifacts: S.optional(__S(2210, __c69, 2)),
          referencedSegments: S.optional(__S(64, __c2, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "NetworkMigrationCodeGenerationSegment" });
    case 4:
      return S.Array(__S(2211, __c69, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2212, __c69, 4)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationCodeGenerationSegmentsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ segmentIDs: S.optional(__S(64, __c2, 0)) })).annotate({
        identifier: "ListNetworkMigrationCodeGenerationSegmentsFilters",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3Bucket: S.optional(S.String),
          s3BucketOwner: S.optional(S.String),
          s3Key: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Configuration" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ networkMigrationDefinitionIDs: S.optional(__S(64, __c2, 0)) }),
      ).annotate({ identifier: "ListNetworkMigrationDefinitionsRequestFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(2304, __c72, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/ListNetworkMigrationDefinitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationDefinitionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          networkMigrationDefinitionID: S.optional(S.String),
          name: S.optional(S.String),
          sourceEnvironment: S.optional(S.String),
          arn: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
          scopeTags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "NetworkMigrationDefinitionSummary" });
    case 3:
      return S.Array(__S(2306, __c72, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2307, __c72, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationDefinitionsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/ListNetworkMigrationDeployedStacks",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationDeployedStacksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logicalID: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkMigrationFailedResourceDetails" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          stackPhysicalID: S.optional(S.String),
          stackLogicalID: S.optional(S.String),
          segmentID: S.optional(S.String),
          targetAccount: S.optional(S.String),
          failedResources: S.optional(__S(2338, __c73, 2)),
        }),
      ).annotate({ identifier: "NetworkMigrationDeployedStackDetails" });
    case 4:
      return S.Array(__S(2339, __c73, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2340, __c73, 4)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationDeployedStacksResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(1920, __c60, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/ListNetworkMigrationDeployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationDeploymentsRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionIDs: S.optional(__S(64, __c2, 0)),
          networkMigrationExecutionStatuses: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "ListNetworkMigrationExecutionRequestFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(2400, __c75, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/ListNetworkMigrationExecutions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationExecutionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          networkMigrationDefinitionID: S.optional(S.String),
          networkMigrationExecutionID: S.optional(S.String),
          status: S.optional(S.String),
          stage: S.optional(S.String),
          activity: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "NetworkMigrationExecution" });
    case 3:
      return S.Array(__S(2402, __c75, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2403, __c75, 3)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationExecutionsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          constructIDs: S.optional(__S(64, __c2, 0)),
          constructTypes: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "ListNetworkMigrationMapperSegmentConstructsFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          segmentID: S.String,
          filters: S.optional(__S(2432, __c76, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/ListNetworkMigrationMapperSegmentConstructs",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationMapperSegmentConstructsRequest" });
    case 2:
      return S.Array(__S(1568, __c49, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2434, __c76, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationMapperSegmentConstructsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(2240, __c70, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/ListNetworkMigrationMapperSegments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationMapperSegmentsRequest" });
    case 1:
      return S.Array(__S(2496, __c78, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2465, __c77, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListNetworkMigrationMapperSegmentsResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobID: S.optional(S.String),
          networkMigrationExecutionID: S.optional(S.String),
          networkMigrationDefinitionID: S.optional(S.String),
          segmentID: S.optional(S.String),
          segmentType: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          logicalID: S.optional(S.String),
          checksum: S.optional(__S(1952, __c61, 0)),
          outputS3Configuration: S.optional(__S(2272, __c71, 0)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scopeTags: S.optional(__S(3392, __c106, 0)),
          targetAccount: S.optional(S.String),
          referencedSegments: S.optional(__S(64, __c2, 0)),
        }),
      ).annotate({ identifier: "NetworkMigrationMapperSegment" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(1920, __c60, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/ListNetworkMigrationMappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationMappingsRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          filters: S.optional(__S(1920, __c60, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/ListNetworkMigrationMappingUpdates",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNetworkMigrationMappingUpdatesRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          filters: S.optional(__S(2624, __c82, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListSourceServerActions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSourceServerActionsRequest" });
    case 1:
      return S.Array(__S(2656, __c83, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2593, __c81, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSourceServerActionsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ actionIDs: S.optional(__S(64, __c2, 0)) })).annotate({
        identifier: "SourceServerActionsRequestFilters",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionID: S.optional(S.String),
          actionName: S.optional(S.String),
          documentIdentifier: S.optional(S.String),
          order: S.optional(S.Number),
          documentVersion: S.optional(S.String),
          active: S.optional(S.Boolean),
          timeoutSeconds: S.optional(S.Number),
          mustSucceedForCutover: S.optional(S.Boolean),
          parameters: S.optional(__S(450, __c14, 2)),
          externalParameters: S.optional(__S(452, __c14, 4)),
          description: S.optional(S.String),
          category: S.optional(S.String),
        }),
      ).annotate({ identifier: "SourceServerActionDocument" });
  }
}
function __c84(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(3392, __c106, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          launchConfigurationTemplateID: S.String,
          filters: S.optional(__S(2624, __c82, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTemplateActions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTemplateActionsRequest" });
    case 1:
      return S.Array(__S(2752, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2721, __c85, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTemplateActionsResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actionID: S.optional(S.String),
          actionName: S.optional(S.String),
          documentIdentifier: S.optional(S.String),
          order: S.optional(S.Number),
          documentVersion: S.optional(S.String),
          active: S.optional(S.Boolean),
          timeoutSeconds: S.optional(S.Number),
          mustSucceedForCutover: S.optional(S.Boolean),
          parameters: S.optional(__S(450, __c14, 2)),
          operatingSystem: S.optional(S.String),
          externalParameters: S.optional(__S(452, __c14, 4)),
          description: S.optional(S.String),
          category: S.optional(S.String),
        }),
      ).annotate({ identifier: "TemplateActionDocument" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ waveIDs: S.optional(__S(64, __c2, 0)), isArchived: S.optional(S.Boolean) }),
      ).annotate({ identifier: "ListWavesRequestFilters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(2784, __c87, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/ListWaves" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListWavesRequest" });
    case 2:
      return S.Array(__S(3777, __c118, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(2786, __c87, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWavesResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/MarkAsArchived" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "MarkAsArchivedRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/PauseReplication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PauseReplicationRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          actionName: S.String,
          documentIdentifier: S.String,
          order: S.Number,
          actionID: S.String,
          documentVersion: S.optional(S.String),
          active: S.optional(S.Boolean),
          timeoutSeconds: S.optional(S.Number),
          mustSucceedForCutover: S.optional(S.Boolean),
          parameters: S.optional(__S(450, __c14, 2)),
          externalParameters: S.optional(__S(452, __c14, 4)),
          description: S.optional(S.String),
          category: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutSourceServerAction" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutSourceServerActionRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(2912, __c91, 0));
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          launchConfigurationTemplateID: S.String,
          actionName: S.String,
          documentIdentifier: S.String,
          order: S.Number,
          actionID: S.String,
          documentVersion: S.optional(S.String),
          active: S.optional(S.Boolean),
          timeoutSeconds: S.optional(S.Number),
          mustSucceedForCutover: S.optional(S.Boolean),
          parameters: S.optional(__S(450, __c14, 2)),
          operatingSystem: S.optional(S.String),
          externalParameters: S.optional(__S(452, __c14, 4)),
          description: S.optional(S.String),
          category: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutTemplateAction" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTemplateActionRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          actionID: S.String,
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/RemoveSourceServerAction" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveSourceServerActionRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ launchConfigurationTemplateID: S.String, actionID: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/RemoveTemplateAction" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveTemplateActionRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ResumeReplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResumeReplicationRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/RetryDataReplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RetryDataReplicationRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerIDs: __S(64, __c2, 0),
          tags: S.optional(__S(3392, __c106, 0)),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/StartCutover" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartCutoverRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ job: S.optional(__S(1157, __c36, 5)) })).annotate({
        identifier: "StartCutoverResponse",
      });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3Bucket: S.String,
          s3Key: S.String,
          s3BucketOwner: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/StartExport" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartExportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ exportTask: S.optional(__S(1825, __c57, 1)) })).annotate({
        identifier: "StartExportResponse",
      });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          s3BucketSource: __S(2016, __c63, 0),
          tags: S.optional(__S(3392, __c106, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/StartImport" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartImportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ importTask: S.optional(__S(2019, __c63, 3)) })).annotate({
        identifier: "StartImportResponse",
      });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          s3BucketSource: __S(608, __c19, 0),
          s3BucketTarget: __S(608, __c19, 0),
          ipAssignmentStrategy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/StartImportFileEnrichment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartImportFileEnrichmentRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobID: S.optional(S.String) })).annotate({
        identifier: "StartImportFileEnrichmentResponse",
      });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/StartNetworkMigrationAnalysis" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNetworkMigrationAnalysisRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ArchiveApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ArchiveApplicationRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lastUpdateDateTime: S.optional(S.String),
          healthStatus: S.optional(S.String),
          progressStatus: S.optional(S.String),
          totalSourceServers: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ApplicationAggregatedStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          applicationID: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          isArchived: S.optional(S.Boolean),
          applicationAggregatedStatus: S.optional(__S(3360, __c105, 0)),
          creationDateTime: S.optional(S.String),
          lastModifiedDateTime: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
          waveID: S.optional(S.String),
        }),
      ).annotate({ identifier: "Application" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          codeGenerationOutputFormatTypes: S.optional(__S(64, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/StartNetworkMigrationCodeGeneration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNetworkMigrationCodeGenerationRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/StartNetworkMigrationDeployment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNetworkMigrationDeploymentRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          securityGroupMappingStrategy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/StartNetworkMigrationMapping" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNetworkMigrationMappingRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ segmentID: S.optional(S.String), constructID: S.optional(S.String) }),
      ).annotate({ identifier: "MergeConstruct" });
    case 1:
      return S.Array(__S(3520, __c110, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ mergeConstructs: S.optional(__S(3521, __c110, 1)) }),
      ).annotate({ identifier: "MergeOperation" });
    case 3:
      return S.suspend(() => S.Struct({ cidrBlock: S.optional(S.String) })).annotate({
        identifier: "SplitConstruct",
      });
    case 4:
      return S.Array(__S(3523, __c110, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ splitConstructs: S.optional(__S(3524, __c110, 4)) }),
      ).annotate({ identifier: "SplitOperation" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          excluded: S.optional(S.Boolean),
          properties: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "UpdateOperation" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ merge: __S(3522, __c110, 2) }),
        /*@__PURE__*/ S.Struct({ split: __S(3525, __c110, 5) }),
        /*@__PURE__*/ S.Struct({ delete: __S(96, __c3, 0) }),
        /*@__PURE__*/ S.Struct({ update: __S(3526, __c110, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          segmentID: S.String,
          constructID: S.String,
          constructType: S.String,
          operation: S.optional(__S(3527, __c110, 7)),
        }),
      ).annotate({ identifier: "StartNetworkMigrationMappingUpdateConstruct" });
    case 9:
      return S.Array(__S(3528, __c110, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          segmentID: S.String,
          targetAccount: S.optional(S.String),
          scopeTags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "StartNetworkMigrationMappingUpdateSegment" });
    case 11:
      return S.Array(__S(3530, __c110, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          networkMigrationExecutionID: S.String,
          networkMigrationDefinitionID: S.String,
          constructs: S.optional(__S(3529, __c110, 9)),
          segments: S.optional(__S(3531, __c110, 11)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/StartNetworkMigrationMappingUpdate",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartNetworkMigrationMappingUpdateRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/StartReplication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartReplicationRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerIDs: __S(64, __c2, 0),
          tags: S.optional(__S(3392, __c106, 0)),
          accountID: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/StartTest" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartTestRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sourceServerID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/StopReplication" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopReplicationRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(3392, __c106, 0),
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
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerIDs: __S(64, __c2, 0),
          tags: S.optional(__S(3392, __c106, 0)),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/TerminateTargetInstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateTargetInstancesRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ applicationID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UnarchiveApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UnarchiveApplicationRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ArchiveWave" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ArchiveWaveRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          lastUpdateDateTime: S.optional(S.String),
          replicationStartedDateTime: S.optional(S.String),
          healthStatus: S.optional(S.String),
          progressStatus: S.optional(S.String),
          totalApplications: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WaveAggregatedStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          waveID: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          isArchived: S.optional(S.Boolean),
          waveAggregatedStatus: S.optional(__S(3776, __c118, 0)),
          creationDateTime: S.optional(S.String),
          lastModifiedDateTime: S.optional(S.String),
          tags: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "Wave" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ waveID: S.String, accountID: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UnarchiveWave" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UnarchiveWaveRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(64, __c2, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          applicationID: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateApplicationRequest" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          connectorID: S.String,
          name: S.optional(S.String),
          ssmCommandConfig: S.optional(__S(384, __c12, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateConnector" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateConnectorRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          name: S.optional(S.String),
          launchDisposition: S.optional(S.String),
          targetInstanceTypeRightSizingMethod: S.optional(S.String),
          copyPrivateIp: S.optional(S.Boolean),
          copyTags: S.optional(S.Boolean),
          licensing: S.optional(__S(514, __c16, 2)),
          bootMode: S.optional(S.String),
          postLaunchActions: S.optional(__S(513, __c16, 1)),
          enableMapAutoTagging: S.optional(S.Boolean),
          mapAutoTaggingMpeID: S.optional(S.String),
          accountID: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateLaunchConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLaunchConfigurationRequest" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          launchConfigurationTemplateID: S.String,
          postLaunchActions: S.optional(__S(513, __c16, 1)),
          enableMapAutoTagging: S.optional(S.Boolean),
          mapAutoTaggingMpeID: S.optional(S.String),
          launchDisposition: S.optional(S.String),
          targetInstanceTypeRightSizingMethod: S.optional(S.String),
          copyPrivateIp: S.optional(S.Boolean),
          associatePublicIpAddress: S.optional(S.Boolean),
          copyTags: S.optional(S.Boolean),
          licensing: S.optional(__S(514, __c16, 2)),
          bootMode: S.optional(S.String),
          smallVolumeMaxSize: S.optional(S.Number),
          smallVolumeConf: S.optional(__S(544, __c17, 0)),
          largeVolumeConf: S.optional(__S(544, __c17, 0)),
          enableParametersEncryption: S.optional(S.Boolean),
          parametersEncryptionKey: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateLaunchConfigurationTemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLaunchConfigurationTemplateRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ s3Bucket: S.optional(S.String), s3BucketOwner: S.optional(S.String) }),
      ).annotate({ identifier: "TargetS3ConfigurationUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          topology: S.optional(S.String),
          inboundCidr: S.optional(S.String),
          outboundCidr: S.optional(S.String),
          inspectionCidr: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetNetworkUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          networkMigrationDefinitionID: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          sourceConfigurations: S.optional(__S(641, __c20, 1)),
          targetS3Configuration: S.optional(__S(4000, __c125, 0)),
          targetNetwork: S.optional(__S(4001, __c125, 1)),
          targetDeployment: S.optional(S.String),
          vpcProvisioningStrategy: S.optional(S.String),
          cidrMappings: S.optional(__S(645, __c20, 5)),
          scopeTags: S.optional(__S(3392, __c106, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/network-migration/UpdateNetworkMigrationDefinition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkMigrationDefinitionRequest" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          networkMigrationDefinitionID: S.String,
          networkMigrationExecutionID: S.String,
          segmentID: S.String,
          scopeTags: S.optional(__S(3392, __c106, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/network-migration/UpdateNetworkMigrationMapperSegment",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNetworkMigrationMapperSegmentRequest" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceServerID: S.String,
          name: S.optional(S.String),
          stagingAreaSubnetId: S.optional(S.String),
          associateDefaultSecurityGroup: S.optional(S.Boolean),
          replicationServersSecurityGroupsIDs: S.optional(__S(64, __c2, 0)),
          replicationServerInstanceType: S.optional(S.String),
          useDedicatedReplicationServer: S.optional(S.Boolean),
          defaultLargeStagingDiskType: S.optional(S.String),
          replicatedDisks: S.optional(__S(1633, __c51, 1)),
          ebsEncryption: S.optional(S.String),
          ebsEncryptionKeyArn: S.optional(S.String),
          bandwidthThrottling: S.optional(S.Number),
          dataPlaneRouting: S.optional(S.String),
          createPublicIP: S.optional(S.Boolean),
          stagingAreaTags: S.optional(__S(3392, __c106, 0)),
          useFipsEndpoint: S.optional(S.Boolean),
          accountID: S.optional(S.String),
          internetProtocol: S.optional(S.String),
          storeSnapshotOnLocalZone: S.optional(S.Boolean),
          storageConfiguration: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateReplicationConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateReplicationConfigurationRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          replicationConfigurationTemplateID: S.String,
          arn: S.optional(S.String),
          stagingAreaSubnetId: S.optional(S.String),
          associateDefaultSecurityGroup: S.optional(S.Boolean),
          replicationServersSecurityGroupsIDs: S.optional(__S(64, __c2, 0)),
          replicationServerInstanceType: S.optional(S.String),
          useDedicatedReplicationServer: S.optional(S.Boolean),
          defaultLargeStagingDiskType: S.optional(S.String),
          ebsEncryption: S.optional(S.String),
          ebsEncryptionKeyArn: S.optional(S.String),
          bandwidthThrottling: S.optional(S.Number),
          dataPlaneRouting: S.optional(S.String),
          createPublicIP: S.optional(S.Boolean),
          stagingAreaTags: S.optional(__S(3392, __c106, 0)),
          useFipsEndpoint: S.optional(S.Boolean),
          internetProtocol: S.optional(S.String),
          storeSnapshotOnLocalZone: S.optional(S.Boolean),
          storageConfiguration: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateReplicationConfigurationTemplate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateReplicationConfigurationTemplateRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
