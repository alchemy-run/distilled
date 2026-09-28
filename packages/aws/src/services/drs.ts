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
  sdkId: "drs",
  target: "ElasticDisasterRecoveryService",
  version: "2020-02-26",
  sigv4: "drs",
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
                `https://drs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://drs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://drs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://drs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export type SourceNetworkID = string;
export type CfnStackName = string | redacted.Redacted<string>;
export interface AssociateSourceNetworkStackRequest {
  sourceNetworkID: string;
  cfnStackName: string | redacted.Redacted<string>;
}
export type JobID = string;
export type ARN = string;
export type JobType = string;
export type InitiatedBy = string;
export type ISO8601DatetimeString = string;
export type JobStatus = string;
export type SourceServerID = string;
export type RecoveryInstanceID = string;
export type LaunchStatus = string;
export type LaunchActionId = string;
export type SsmDocumentName = string;
export type LaunchActionType = string;
export type LaunchActionName = string;
export type LaunchActionOrder = number;
export type LaunchActionVersion = string;
export type LaunchActionParameterName = string;
export type LaunchActionParameterValue = string;
export type LaunchActionParameterType = string;
export interface LaunchActionParameter {
  value?: string;
  type?: string;
}
export type LaunchActionParameters = {
  [key: string]: LaunchActionParameter | undefined;
};
export type LaunchActionDescription = string;
export type LaunchActionCategory = string;
export interface LaunchAction {
  actionId?: string;
  actionCode?: string;
  type?: string;
  name?: string;
  active?: boolean;
  order?: number;
  actionVersion?: string;
  optional?: boolean;
  parameters?: { [key: string]: LaunchActionParameter | undefined };
  description?: string;
  category?: string;
}
export type LaunchActionRunId = string;
export type LaunchActionRunStatus = string;
export type FailureReason = string;
export interface LaunchActionRun {
  action?: LaunchAction;
  runId?: string;
  status?: string;
  failureReason?: string;
}
export type LaunchActionRuns = LaunchActionRun[];
export interface LaunchActionsStatus {
  ssmAgentDiscoveryDatetime?: string;
  runs?: LaunchActionRun[];
}
export interface ParticipatingServer {
  sourceServerID?: string;
  recoveryInstanceID?: string;
  launchStatus?: string;
  launchActionsStatus?: LaunchActionsStatus;
}
export type ParticipatingServers = ParticipatingServer[];
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export type ParticipatingResourceID = { sourceNetworkID: string };
export interface ParticipatingResource {
  participatingResourceID?: ParticipatingResourceID;
  launchStatus?: string;
}
export type ParticipatingResources = ParticipatingResource[];
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
  participatingResources?: ParticipatingResource[];
}
export interface AssociateSourceNetworkStackResponse {
  job?: Job;
}
export type StrictDRSARN = string;
export interface CancelRecoveryPlanExecutionRequest {
  recoveryPlanExecutionArn: string;
}
export type RecoveryPlanExecutionMode = string;
export type RecoveryPlanExecutionStatus = string;
export interface ErrorDetail {
  message: string;
  code: string;
}
export interface RecoveryPlanExecution {
  recoveryPlanExecutionArn: string;
  recoveryPlanArn: string;
  mode: string;
  status: string;
  startedAt: string;
  completedAt?: string;
  errorDetail?: ErrorDetail;
  tags?: { [key: string]: string | undefined };
}
export interface CancelRecoveryPlanExecutionResponse {
  recoveryPlanExecution: RecoveryPlanExecution;
}
export type SourceServerARN = string;
export interface CreateExtendedSourceServerRequest {
  sourceServerArn: string;
  tags?: { [key: string]: string | undefined };
}
export type LastLaunchResult = string;
export type ISO8601DurationString = string;
export type BoundedString = string;
export type PositiveInteger = number;
export type VolumeStatus = string;
export interface DataReplicationInfoReplicatedDisk {
  deviceName?: string;
  totalStorageBytes?: number;
  replicatedStorageBytes?: number;
  rescannedStorageBytes?: number;
  backloggedStorageBytes?: number;
  volumeStatus?: string;
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
export type AwsAvailabilityZone = string;
export type OutpostARN = string;
export interface DataReplicationInfo {
  lagDuration?: string;
  etaDateTime?: string;
  replicatedDisks?: DataReplicationInfoReplicatedDisk[];
  dataReplicationState?: string;
  dataReplicationInitiation?: DataReplicationInitiation;
  dataReplicationError?: DataReplicationError;
  stagingAvailabilityZone?: string;
  stagingOutpostArn?: string;
}
export type LastLaunchType = string;
export interface LifeCycleLastLaunchInitiated {
  apiCallDateTime?: string;
  jobID?: string;
  type?: string;
}
export interface LifeCycleLastLaunch {
  initiated?: LifeCycleLastLaunchInitiated;
  status?: string;
}
export interface LifeCycle {
  addedToServiceDateTime?: string;
  firstByteDateTime?: string;
  elapsedReplicationDuration?: string;
  lastSeenByServiceDateTime?: string;
  lastLaunch?: LifeCycleLastLaunch;
}
export type EC2InstanceType = string;
export type EC2InstanceID = string;
export interface IdentificationHints {
  fqdn?: string;
  hostname?: string;
  vmWareUuid?: string;
  awsInstanceID?: string;
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
  supportsNitroInstances?: boolean;
}
export type ExtensionStatus = string;
export type AccountID = string;
export interface StagingArea {
  status?: string;
  stagingAccountID?: string;
  stagingSourceServerArn?: string;
  errorMessage?: string;
}
export type AwsRegion = string;
export interface SourceCloudProperties {
  originAccountID?: string;
  originRegion?: string;
  originAvailabilityZone?: string;
  sourceOutpostArn?: string;
}
export type ReplicationDirection = string;
export type AgentVersion = string;
export interface SourceServer {
  sourceServerID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  recoveryInstanceId?: string;
  lastLaunchResult?: string;
  dataReplicationInfo?: DataReplicationInfo;
  lifeCycle?: LifeCycle;
  sourceProperties?: SourceProperties;
  stagingArea?: StagingArea;
  sourceCloudProperties?: SourceCloudProperties;
  replicationDirection?: string;
  reversedDirectionSourceServerArn?: string;
  sourceNetworkID?: string;
  agentVersion?: string;
}
export interface CreateExtendedSourceServerResponse {
  sourceServer?: SourceServer;
}
export type LaunchDisposition = string;
export type TargetInstanceTypeRightSizingMethod = string;
export interface Licensing {
  osByol?: boolean;
}
export type RecoveryMode = string;
export interface CreateLaunchConfigurationTemplateRequest {
  tags?: { [key: string]: string | undefined };
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  exportBucketArn?: string;
  postLaunchEnabled?: boolean;
  launchIntoSourceInstance?: boolean;
  recoveryMode?: string;
}
export type LaunchConfigurationTemplateID = string;
export interface LaunchConfigurationTemplate {
  launchConfigurationTemplateID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  exportBucketArn?: string;
  postLaunchEnabled?: boolean;
  launchIntoSourceInstance?: boolean;
  recoveryMode?: string;
}
export interface CreateLaunchConfigurationTemplateResponse {
  launchConfigurationTemplate?: LaunchConfigurationTemplate;
}
export type RecoveryPlanName = string;
export type RecoveryPlanDescription = string;
export type ClientIdempotencyToken = string;
export interface CreateRecoveryPlanRequest {
  name: string;
  description?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type RecoveryPlanStatus = string;
export interface RecoveryPlan {
  recoveryPlanArn: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateRecoveryPlanResponse {
  recoveryPlan: RecoveryPlan;
}
export type RecoveryPlanStepName = string;
export type RecoveryPlanStepOrder = number;
export type RecoveryPlanServerImpactLevel = string;
export interface RecoveryPlanServer {
  serverArn: string;
  impactLevel?: string;
}
export type RecoveryPlanServers = RecoveryPlanServer[];
export interface ServerStepConfiguration {
  servers: RecoveryPlanServer[];
}
export type WaitDurationMinutes = number;
export interface WaitStepConfiguration {
  waitDurationMinutes: number;
}
export type RecoveryPlanStepConfiguration =
  | {
      serverStepConfiguration: ServerStepConfiguration;
      waitStepConfiguration?: never;
    }
  | {
      serverStepConfiguration?: never;
      waitStepConfiguration: WaitStepConfiguration;
    };
export interface CreateRecoveryPlanStepRequest {
  recoveryPlanArn: string;
  stepName: string;
  stepOrder?: number;
  configuration: RecoveryPlanStepConfiguration;
  clientToken?: string;
}
export interface RecoveryPlanStep {
  recoveryPlanStepArn: string;
  stepOrder: number;
  stepName: string;
  configuration: RecoveryPlanStepConfiguration;
  createdAt: string;
  updatedAt: string;
}
export interface CreateRecoveryPlanStepResponse {
  recoveryPlanStep: RecoveryPlanStep;
}
export type SubnetID = string;
export type SecurityGroupID = string;
export type ReplicationServersSecurityGroupsIDs = string[];
export type ReplicationConfigurationDefaultLargeStagingDiskType = string;
export type ReplicationConfigurationEbsEncryption = string;
export type ReplicationConfigurationDataPlaneRouting = string;
export type PITPolicyRuleUnits = string;
export type StrictlyPositiveInteger = number;
export interface PITPolicyRule {
  ruleID?: number;
  units: string;
  interval: number;
  retentionDuration: number;
  enabled?: boolean;
}
export type PITPolicy = PITPolicyRule[];
export type InternetProtocol = string;
export interface CreateReplicationConfigurationTemplateRequest {
  stagingAreaSubnetId: string;
  associateDefaultSecurityGroup?: boolean;
  replicationServersSecurityGroupsIDs: string[];
  replicationServerInstanceType?: string;
  useDedicatedReplicationServer?: boolean;
  defaultLargeStagingDiskType?: string;
  ebsEncryption: string;
  ebsEncryptionKeyArn?: string;
  bandwidthThrottling: number;
  dataPlaneRouting?: string;
  createPublicIP?: boolean;
  stagingAreaTags: { [key: string]: string | undefined };
  pitPolicy: PITPolicyRule[];
  tags?: { [key: string]: string | undefined };
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
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
  tags?: { [key: string]: string | undefined };
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export type VpcID = string;
export interface CreateSourceNetworkRequest {
  vpcID: string;
  originAccountID: string;
  originRegion: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateSourceNetworkResponse {
  sourceNetworkID?: string;
}
export interface DeleteJobRequest {
  jobID: string;
}
export interface DeleteJobResponse {}
export type LaunchActionResourceId = string;
export interface DeleteLaunchActionRequest {
  resourceId: string;
  actionId: string;
}
export interface DeleteLaunchActionResponse {}
export interface DeleteLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
}
export interface DeleteLaunchConfigurationTemplateResponse {}
export interface DeleteRecoveryInstanceRequest {
  recoveryInstanceID: string;
}
export interface DeleteRecoveryInstanceResponse {}
export interface DeleteRecoveryPlanRequest {
  recoveryPlanArn: string;
}
export interface DeleteRecoveryPlanResponse {
  recoveryPlanArn: string;
}
export interface DeleteRecoveryPlanExecutionRequest {
  recoveryPlanExecutionArn: string;
}
export interface DeleteRecoveryPlanExecutionResponse {
  recoveryPlanExecutionArn: string;
}
export interface DeleteRecoveryPlanStepRequest {
  recoveryPlanStepArn: string;
}
export interface DeleteRecoveryPlanStepResponse {
  recoveryPlanStepArn: string;
}
export interface DeleteReplicationConfigurationTemplateRequest {
  replicationConfigurationTemplateID: string;
}
export interface DeleteReplicationConfigurationTemplateResponse {}
export interface DeleteSourceNetworkRequest {
  sourceNetworkID: string;
}
export interface DeleteSourceNetworkResponse {}
export interface DeleteSourceServerRequest {
  sourceServerID: string;
}
export interface DeleteSourceServerResponse {}
export type PaginationToken = string;
export interface DescribeJobLogItemsRequest {
  jobID: string;
  maxResults?: number;
  nextToken?: string;
}
export type JobLogEvent = string;
export type EbsSnapshot = string;
export type ConversionMap = { [key: string]: string | undefined };
export type VolumeToConversionMap = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export type VolumeToSizeMap = { [key: string]: number | undefined };
export type ProductCodeId = string;
export type ProductCodeMode = string;
export interface ProductCode {
  productCodeId?: string;
  productCodeMode?: string;
}
export type ProductCodes = ProductCode[];
export type VolumeToProductCodes = { [key: string]: ProductCode[] | undefined };
export interface ConversionProperties {
  volumeToConversionMap?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  rootVolumeName?: string;
  forceUefi?: boolean;
  dataTimestamp?: string;
  volumeToVolumeSize?: { [key: string]: number | undefined };
  volumeToProductCodes?: { [key: string]: ProductCode[] | undefined };
}
export interface SourceNetworkData {
  sourceNetworkID?: string;
  sourceVpc?: string;
  targetVpc?: string;
  stackName?: string;
}
export type EventResourceData = { sourceNetworkData: SourceNetworkData };
export type JobEventAttemptCount = number;
export interface JobLogEventData {
  sourceServerID?: string;
  conversionServerID?: string;
  targetInstanceID?: string;
  rawError?: string;
  conversionProperties?: ConversionProperties;
  eventResourceData?: EventResourceData;
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
}
export type JobsList = Job[];
export interface DescribeJobsResponse {
  items?: Job[];
  nextToken?: string;
}
export type LaunchConfigurationTemplateIDs = string[];
export type MaxResultsType = number;
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
export type RecoveryInstanceIDs = string[];
export type SourceServerIDs = string[];
export interface DescribeRecoveryInstancesRequestFilters {
  recoveryInstanceIDs?: string[];
  sourceServerIDs?: string[];
}
export interface DescribeRecoveryInstancesRequest {
  filters?: DescribeRecoveryInstancesRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export type EC2InstanceState = string;
export type FailbackState = string;
export type FailbackLaunchType = string;
export interface RecoveryInstanceFailback {
  failbackClientID?: string;
  failbackJobID?: string;
  failbackInitiationTime?: string;
  state?: string;
  agentLastSeenByServiceDateTime?: string;
  failbackClientLastSeenByServiceDateTime?: string;
  failbackToOriginalServer?: boolean;
  firstByteDateTime?: string;
  elapsedReplicationDuration?: string;
  failbackLaunchType?: string;
}
export interface RecoveryInstanceDataReplicationInfoReplicatedDisk {
  deviceName?: string;
  totalStorageBytes?: number;
  replicatedStorageBytes?: number;
  rescannedStorageBytes?: number;
  backloggedStorageBytes?: number;
}
export type RecoveryInstanceDataReplicationInfoReplicatedDisks =
  RecoveryInstanceDataReplicationInfoReplicatedDisk[];
export type RecoveryInstanceDataReplicationState = string;
export type RecoveryInstanceDataReplicationInitiationStepName = string;
export type RecoveryInstanceDataReplicationInitiationStepStatus = string;
export interface RecoveryInstanceDataReplicationInitiationStep {
  name?: string;
  status?: string;
}
export type RecoveryInstanceDataReplicationInitiationSteps =
  RecoveryInstanceDataReplicationInitiationStep[];
export interface RecoveryInstanceDataReplicationInitiation {
  startDateTime?: string;
  steps?: RecoveryInstanceDataReplicationInitiationStep[];
}
export type FailbackReplicationError = string;
export interface RecoveryInstanceDataReplicationError {
  error?: string;
  rawError?: string;
}
export interface RecoveryInstanceDataReplicationInfo {
  lagDuration?: string;
  etaDateTime?: string;
  replicatedDisks?: RecoveryInstanceDataReplicationInfoReplicatedDisk[];
  dataReplicationState?: string;
  dataReplicationInitiation?: RecoveryInstanceDataReplicationInitiation;
  dataReplicationError?: RecoveryInstanceDataReplicationError;
  stagingAvailabilityZone?: string;
  stagingOutpostArn?: string;
}
export type EbsVolumeID = string;
export interface RecoveryInstanceDisk {
  internalDeviceName?: string;
  bytes?: number;
  ebsVolumeID?: string;
}
export type RecoveryInstanceDisks = RecoveryInstanceDisk[];
export interface RecoveryInstanceProperties {
  lastUpdatedDateTime?: string;
  identificationHints?: IdentificationHints;
  networkInterfaces?: NetworkInterface[];
  disks?: RecoveryInstanceDisk[];
  cpus?: CPU[];
  ramBytes?: number;
  os?: OS;
}
export type OriginEnvironment = string;
export interface RecoveryInstance {
  ec2InstanceID?: string;
  ec2InstanceState?: string;
  jobID?: string;
  recoveryInstanceID?: string;
  sourceServerID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  failback?: RecoveryInstanceFailback;
  dataReplicationInfo?: RecoveryInstanceDataReplicationInfo;
  recoveryInstanceProperties?: RecoveryInstanceProperties;
  pointInTimeSnapshotDateTime?: string;
  isDrill?: boolean;
  originEnvironment?: string;
  originAvailabilityZone?: string;
  agentVersion?: string;
  sourceOutpostArn?: string;
}
export type DescribeRecoveryInstancesItems = RecoveryInstance[];
export interface DescribeRecoveryInstancesResponse {
  nextToken?: string;
  items?: RecoveryInstance[];
}
export interface DescribeRecoverySnapshotsRequestFilters {
  fromDateTime?: string;
  toDateTime?: string;
}
export type RecoverySnapshotsOrder = string;
export interface DescribeRecoverySnapshotsRequest {
  sourceServerID: string;
  filters?: DescribeRecoverySnapshotsRequestFilters;
  order?: string;
  maxResults?: number;
  nextToken?: string;
}
export type RecoverySnapshotID = string;
export type EbsSnapshotsList = string[];
export interface RecoverySnapshot {
  snapshotID: string;
  sourceServerID: string;
  expectedTimestamp: string;
  timestamp?: string;
  ebsSnapshots?: string[];
}
export type RecoverySnapshotsList = RecoverySnapshot[];
export interface DescribeRecoverySnapshotsResponse {
  items?: RecoverySnapshot[];
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
export type DescribeSourceNetworksRequestFiltersIDs = string[];
export interface DescribeSourceNetworksRequestFilters {
  sourceNetworkIDs?: string[];
  originAccountID?: string;
  originRegion?: string;
}
export interface DescribeSourceNetworksRequest {
  filters?: DescribeSourceNetworksRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export type ReplicationStatus = string;
export type SensitiveBoundedString = string | redacted.Redacted<string>;
export type RecoveryResult = string;
export interface RecoveryLifeCycle {
  apiCallDateTime?: Date;
  jobID?: string;
  lastRecoveryResult?: string;
}
export interface SourceNetwork {
  sourceNetworkID?: string;
  sourceVpcID?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
  replicationStatus?: string;
  replicationStatusDetails?: string | redacted.Redacted<string>;
  cfnStackName?: string | redacted.Redacted<string>;
  sourceRegion?: string;
  sourceAccountID?: string;
  lastRecovery?: RecoveryLifeCycle;
  launchedVpcID?: string;
}
export type SourceNetworksList = SourceNetwork[];
export interface DescribeSourceNetworksResponse {
  items?: SourceNetwork[];
  nextToken?: string;
}
export type DescribeSourceServersRequestFiltersIDs = string[];
export type AccountIDs = string[];
export interface DescribeSourceServersRequestFilters {
  sourceServerIDs?: string[];
  hardwareId?: string;
  stagingAccountIDs?: string[];
}
export interface DescribeSourceServersRequest {
  filters?: DescribeSourceServersRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export type SourceServersList = SourceServer[];
export interface DescribeSourceServersResponse {
  items?: SourceServer[];
  nextToken?: string;
}
export interface DisconnectRecoveryInstanceRequest {
  recoveryInstanceID: string;
}
export interface DisconnectRecoveryInstanceResponse {}
export interface DisconnectSourceServerRequest {
  sourceServerID: string;
}
export interface ExportSourceNetworkCfnTemplateRequest {
  sourceNetworkID: string;
}
export interface ExportSourceNetworkCfnTemplateResponse {
  s3DestinationUrl?: string;
}
export interface GetFailbackReplicationConfigurationRequest {
  recoveryInstanceID: string;
}
export interface GetFailbackReplicationConfigurationResponse {
  recoveryInstanceID: string;
  name?: string;
  bandwidthThrottling?: number;
  usePrivateIP?: boolean;
  internetProtocol?: string;
}
export interface GetLaunchConfigurationRequest {
  sourceServerID: string;
}
export type SmallBoundedString = string;
export interface LaunchIntoInstanceProperties {
  launchIntoEC2InstanceID?: string;
}
export interface LaunchConfiguration {
  sourceServerID?: string;
  name?: string;
  ec2LaunchTemplateID?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  postLaunchEnabled?: boolean;
  launchIntoInstanceProperties?: LaunchIntoInstanceProperties;
  recoveryMode?: string;
}
export interface GetRecoveryPlanRequest {
  recoveryPlanArn: string;
}
export interface GetRecoveryPlanResponse {
  recoveryPlan: RecoveryPlan;
}
export interface GetRecoveryPlanExecutionRequest {
  recoveryPlanExecutionArn: string;
}
export interface GetRecoveryPlanExecutionResponse {
  recoveryPlanExecution: RecoveryPlanExecution;
}
export interface GetRecoveryPlanExecutionStepRequest {
  recoveryPlanExecutionStepArn: string;
}
export type RecoveryPlanExecutionStepStatus = string;
export interface RecoveryPlanExecutionServer {
  serverArn: string;
  impactLevel?: string;
  jobID?: string;
}
export type RecoveryPlanExecutionServers = RecoveryPlanExecutionServer[];
export interface ExecutionServerStepConfiguration {
  servers: RecoveryPlanExecutionServer[];
}
export type RecoveryPlanExecutionStepConfiguration =
  | {
      executionServerStepConfiguration: ExecutionServerStepConfiguration;
      waitStepConfiguration?: never;
    }
  | {
      executionServerStepConfiguration?: never;
      waitStepConfiguration: WaitStepConfiguration;
    };
export interface RecoveryPlanExecutionStep {
  recoveryPlanExecutionStepArn: string;
  stepIndex: number;
  status: string;
  stepName: string;
  configuration: RecoveryPlanExecutionStepConfiguration;
  errorDetail?: ErrorDetail;
  attempt: number;
  createdAt: string;
  updatedAt: string;
}
export interface GetRecoveryPlanExecutionStepResponse {
  recoveryPlanExecutionStep: RecoveryPlanExecutionStep;
}
export interface GetRecoveryPlanStepRequest {
  recoveryPlanStepArn: string;
}
export interface GetRecoveryPlanStepResponse {
  recoveryPlanStep: RecoveryPlanStep;
}
export interface GetReplicationConfigurationRequest {
  sourceServerID: string;
}
export type ReplicationConfigurationReplicatedDiskStagingDiskType = string;
export interface ReplicationConfigurationReplicatedDisk {
  deviceName?: string;
  isBootDisk?: boolean;
  stagingDiskType?: string;
  iops?: number;
  throughput?: number;
  optimizedStagingDiskType?: string;
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
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export interface InitializeServiceRequest {}
export interface InitializeServiceResponse {}
export type MaxResultsReplicatingSourceServers = number;
export interface ListExtensibleSourceServersRequest {
  stagingAccountID: string;
  maxResults?: number;
  nextToken?: string;
}
export interface StagingSourceServer {
  hostname?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export type StagingSourceServersList = StagingSourceServer[];
export interface ListExtensibleSourceServersResponse {
  items?: StagingSourceServer[];
  nextToken?: string;
}
export type LaunchActionIds = string[];
export interface LaunchActionsRequestFilters {
  actionIds?: string[];
}
export interface ListLaunchActionsRequest {
  resourceId: string;
  filters?: LaunchActionsRequestFilters;
  maxResults?: number;
  nextToken?: string;
}
export type LaunchActions = LaunchAction[];
export interface ListLaunchActionsResponse {
  items?: LaunchAction[];
  nextToken?: string;
}
export interface ListRecoveryPlanExecutionsRequest {
  recoveryPlanArn?: string;
  status?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface RecoveryPlanExecutionSummary {
  recoveryPlanExecutionArn: string;
  recoveryPlanArn: string;
  mode: string;
  status: string;
  startedAt: string;
  errorDetail?: ErrorDetail;
}
export type RecoveryPlanExecutionSummaryList = RecoveryPlanExecutionSummary[];
export interface ListRecoveryPlanExecutionsResponse {
  recoveryPlanExecutions: RecoveryPlanExecutionSummary[];
  nextToken?: string;
}
export interface ListRecoveryPlanExecutionStepsFilter {
  status?: string;
}
export interface ListRecoveryPlanExecutionStepsRequest {
  recoveryPlanExecutionArn: string;
  filter?: ListRecoveryPlanExecutionStepsFilter;
  maxResults?: number;
  nextToken?: string;
}
export interface RecoveryPlanExecutionStepSummary {
  recoveryPlanExecutionStepArn: string;
  stepName: string;
  stepIndex: number;
  status: string;
  configuration: RecoveryPlanExecutionStepConfiguration;
  errorDetail?: ErrorDetail;
}
export type RecoveryPlanExecutionStepSummaryList =
  RecoveryPlanExecutionStepSummary[];
export interface ListRecoveryPlanExecutionStepsResponse {
  recoveryPlanExecutionSteps: RecoveryPlanExecutionStepSummary[];
  nextToken?: string;
}
export interface ListRecoveryPlansRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface RecoveryPlanSummary {
  recoveryPlanArn: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export type RecoveryPlanSummaryList = RecoveryPlanSummary[];
export interface ListRecoveryPlansResponse {
  recoveryPlans: RecoveryPlanSummary[];
  nextToken?: string;
}
export interface ListRecoveryPlanStepsRequest {
  recoveryPlanArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type RecoveryPlanStepList = RecoveryPlanStep[];
export interface ListRecoveryPlanStepsResponse {
  recoveryPlanSteps: RecoveryPlanStep[];
  nextToken?: string;
}
export interface ListStagingAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface Account {
  accountID?: string;
}
export type Accounts = Account[];
export interface ListStagingAccountsResponse {
  accounts?: Account[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface PutLaunchActionRequest {
  resourceId: string;
  actionCode: string;
  order: number;
  actionId: string;
  optional: boolean;
  active: boolean;
  name: string;
  actionVersion: string;
  category: string;
  parameters?: { [key: string]: LaunchActionParameter | undefined };
  description: string;
}
export interface PutLaunchActionResponse {
  resourceId?: string;
  actionId?: string;
  actionCode?: string;
  type?: string;
  name?: string;
  active?: boolean;
  order?: number;
  actionVersion?: string;
  optional?: boolean;
  parameters?: { [key: string]: LaunchActionParameter | undefined };
  description?: string;
  category?: string;
}
export type RecoveryPlanStepArnList = string[];
export interface ReorderRecoveryPlanStepsRequest {
  recoveryPlanArn: string;
  orderedStepArns: string[];
}
export interface ReorderRecoveryPlanStepsResponse {
  recoveryPlanSteps: RecoveryPlanStep[];
}
export interface RetryDataReplicationRequest {
  sourceServerID: string;
}
export interface RetryRecoveryPlanExecutionStepRequest {
  recoveryPlanExecutionStepArn: string;
}
export interface RetryRecoveryPlanExecutionStepResponse {
  recoveryPlanExecutionStep: RecoveryPlanExecutionStep;
}
export interface ReverseReplicationRequest {
  recoveryInstanceID: string;
}
export interface ReverseReplicationResponse {
  reversedDirectionSourceServerArn?: string;
}
export type StartFailbackRequestRecoveryInstanceIDs = string[];
export interface StartFailbackLaunchRequest {
  recoveryInstanceIDs: string[];
  tags?: { [key: string]: string | undefined };
}
export interface StartFailbackLaunchResponse {
  job?: Job;
}
export interface StartRecoveryRequestSourceServer {
  sourceServerID: string;
  recoverySnapshotID?: string;
}
export type StartRecoveryRequestSourceServers =
  StartRecoveryRequestSourceServer[];
export interface StartRecoveryRequest {
  sourceServers: StartRecoveryRequestSourceServer[];
  isDrill?: boolean;
  tags?: { [key: string]: string | undefined };
}
export interface StartRecoveryResponse {
  job?: Job;
}
export interface RecoveryPlanExecutionSourceServer {
  sourceServerID: string;
  recoverySnapshotID: string;
}
export type RecoveryPlanExecutionSourceServerList =
  RecoveryPlanExecutionSourceServer[];
export interface StartRecoveryPlanExecutionRequest {
  recoveryPlanArn: string;
  mode: string;
  clientToken?: string;
  sourceServers?: RecoveryPlanExecutionSourceServer[];
  tags?: { [key: string]: string | undefined };
}
export interface StartRecoveryPlanExecutionResponse {
  recoveryPlanExecution: RecoveryPlanExecution;
}
export interface StartReplicationRequest {
  sourceServerID: string;
}
export interface StartReplicationResponse {
  sourceServer?: SourceServer;
}
export interface StartSourceNetworkRecoveryRequestNetworkEntry {
  sourceNetworkID: string;
  cfnStackName?: string | redacted.Redacted<string>;
}
export type StartSourceNetworkRecoveryRequestNetworkEntries =
  StartSourceNetworkRecoveryRequestNetworkEntry[];
export interface StartSourceNetworkRecoveryRequest {
  sourceNetworks: StartSourceNetworkRecoveryRequestNetworkEntry[];
  deployAsNew?: boolean;
  tags?: { [key: string]: string | undefined };
}
export interface StartSourceNetworkRecoveryResponse {
  job?: Job;
}
export interface StartSourceNetworkReplicationRequest {
  sourceNetworkID: string;
}
export interface StartSourceNetworkReplicationResponse {
  sourceNetwork?: SourceNetwork;
}
export interface StopFailbackRequest {
  recoveryInstanceID: string;
}
export interface StopFailbackResponse {}
export interface StopReplicationRequest {
  sourceServerID: string;
}
export interface StopReplicationResponse {
  sourceServer?: SourceServer;
}
export interface StopSourceNetworkReplicationRequest {
  sourceNetworkID: string;
}
export interface StopSourceNetworkReplicationResponse {
  sourceNetwork?: SourceNetwork;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type RecoveryInstancesForTerminationRequest = string[];
export interface TerminateRecoveryInstancesRequest {
  recoveryInstanceIDs: string[];
}
export interface TerminateRecoveryInstancesResponse {
  job?: Job;
}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateFailbackReplicationConfigurationRequest {
  recoveryInstanceID: string;
  name?: string;
  bandwidthThrottling?: number;
  usePrivateIP?: boolean;
  internetProtocol?: string;
}
export interface UpdateFailbackReplicationConfigurationResponse {}
export interface UpdateLaunchConfigurationRequest {
  sourceServerID: string;
  name?: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  postLaunchEnabled?: boolean;
  launchIntoInstanceProperties?: LaunchIntoInstanceProperties;
  recoveryMode?: string;
}
export interface UpdateLaunchConfigurationTemplateRequest {
  launchConfigurationTemplateID: string;
  launchDisposition?: string;
  targetInstanceTypeRightSizingMethod?: string;
  copyPrivateIp?: boolean;
  copyTags?: boolean;
  licensing?: Licensing;
  exportBucketArn?: string;
  postLaunchEnabled?: boolean;
  launchIntoSourceInstance?: boolean;
  recoveryMode?: string;
}
export interface UpdateLaunchConfigurationTemplateResponse {
  launchConfigurationTemplate?: LaunchConfigurationTemplate;
}
export interface UpdateRecoveryPlanRequest {
  recoveryPlanArn: string;
  name?: string;
  description?: string;
}
export interface UpdateRecoveryPlanResponse {
  recoveryPlan: RecoveryPlan;
}
export interface UpdateRecoveryPlanExecutionStepRequest {
  recoveryPlanExecutionStepArn: string;
  status?: string;
  servers?: RecoveryPlanServer[];
  waitDurationMinutes?: number;
}
export interface UpdateRecoveryPlanExecutionStepResponse {
  recoveryPlanExecutionStep: RecoveryPlanExecutionStep;
}
export interface UpdateRecoveryPlanStepRequest {
  recoveryPlanStepArn: string;
  stepName?: string;
  configuration?: RecoveryPlanStepConfiguration;
}
export interface UpdateRecoveryPlanStepResponse {
  recoveryPlanStep: RecoveryPlanStep;
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
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
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
  pitPolicy?: PITPolicyRule[];
  autoReplicateNewDisks?: boolean;
  internetProtocol?: string;
}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name?: string;
  message?: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateSourceNetworkStackError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Associate a Source Network to an existing CloudFormation Stack and modify launch templates to use this network. Can be used for reverting to previously deployed CloudFormation stacks.
 */
export const associateSourceNetworkStack: API.OperationMethod<
  AssociateSourceNetworkStackRequest,
  AssociateSourceNetworkStackResponse,
  AssociateSourceNetworkStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /AssociateSourceNetworkStack",
    input: { sourceNetworkID: 0, cfnStackName: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceNetworkStack",
})) as any;

export type CancelRecoveryPlanExecutionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an in-progress Recovery Plan execution. Remaining steps are skipped.
 */
export const cancelRecoveryPlanExecution: API.OperationMethod<
  CancelRecoveryPlanExecutionRequest,
  CancelRecoveryPlanExecutionResponse,
  CancelRecoveryPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CancelRecoveryPlanExecution",
    input: { recoveryPlanExecutionArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRecoveryPlanExecution",
})) as any;

export type CreateExtendedSourceServerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Create an extended source server in the target Account based on the source server in staging account.
 */
export const createExtendedSourceServer: API.OperationMethod<
  CreateExtendedSourceServerRequest,
  CreateExtendedSourceServerResponse,
  CreateExtendedSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateExtendedSourceServer",
    input: { sourceServerArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtendedSourceServer",
})) as any;

export type CreateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Launch Configuration Template.
 */
export const createLaunchConfigurationTemplate: API.OperationMethod<
  CreateLaunchConfigurationTemplateRequest,
  CreateLaunchConfigurationTemplateResponse,
  CreateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateLaunchConfigurationTemplate",
    input: {
      tags: 0,
      launchDisposition: 0,
      targetInstanceTypeRightSizingMethod: 0,
      copyPrivateIp: 0,
      copyTags: 0,
      licensing: i_Licensing,
      exportBucketArn: 0,
      postLaunchEnabled: 0,
      launchIntoSourceInstance: 0,
      recoveryMode: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLaunchConfigurationTemplate",
})) as any;

export type CreateRecoveryPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Recovery Plan to orchestrate multi-server disaster recovery.
 */
export const createRecoveryPlan: API.OperationMethod<
  CreateRecoveryPlanRequest,
  CreateRecoveryPlanResponse,
  CreateRecoveryPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateRecoveryPlan",
    input: {
      name: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecoveryPlan",
})) as any;

export type CreateRecoveryPlanStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Creates a step in a Recovery Plan. A step is either `SERVER` type (servers to recover in parallel) or `WAIT` type (timed pause between steps).
 */
export const createRecoveryPlanStep: API.OperationMethod<
  CreateRecoveryPlanStepRequest,
  CreateRecoveryPlanStepResponse,
  CreateRecoveryPlanStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateRecoveryPlanStep",
    input: {
      recoveryPlanArn: 0,
      stepName: 0,
      stepOrder: 0,
      configuration: i_RecoveryPlanStepConfiguration,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecoveryPlanStep",
})) as any;

export type CreateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
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
      pitPolicy: D.list(i_PITPolicyRule),
      tags: 0,
      autoReplicateNewDisks: 0,
      internetProtocol: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationConfigurationTemplate",
})) as any;

export type CreateSourceNetworkError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Create a new Source Network resource for a provided VPC ID.
 */
export const createSourceNetwork: API.OperationMethod<
  CreateSourceNetworkRequest,
  CreateSourceNetworkResponse,
  CreateSourceNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateSourceNetwork",
    input: { vpcID: 0, originAccountID: 0, originRegion: 0, tags: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceNetwork",
})) as any;

export type DeleteJobError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
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
    input: { jobID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
})) as any;

export type DeleteLaunchActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource launch action.
 */
export const deleteLaunchAction: API.OperationMethod<
  DeleteLaunchActionRequest,
  DeleteLaunchActionResponse,
  DeleteLaunchActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteLaunchAction",
    input: { resourceId: 0, actionId: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchAction",
})) as any;

export type DeleteLaunchConfigurationTemplateError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchConfigurationTemplate",
})) as any;

export type DeleteRecoveryInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Recovery Instance by ID. This deletes the Recovery Instance resource from Elastic Disaster Recovery. The Recovery Instance must be disconnected first in order to delete it.
 */
export const deleteRecoveryInstance: API.OperationMethod<
  DeleteRecoveryInstanceRequest,
  DeleteRecoveryInstanceResponse,
  DeleteRecoveryInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteRecoveryInstance",
    input: { recoveryInstanceID: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryInstance",
})) as any;

export type DeleteRecoveryPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Recovery Plan. Cannot delete a plan that has an execution in a non-terminal status (`CREATED`, `IN_PROGRESS`).
 */
export const deleteRecoveryPlan: API.OperationMethod<
  DeleteRecoveryPlanRequest,
  DeleteRecoveryPlanResponse,
  DeleteRecoveryPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteRecoveryPlan",
    input: { recoveryPlanArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryPlan",
})) as any;

export type DeleteRecoveryPlanExecutionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Recovery Plan execution record. Must be in a terminal status.
 */
export const deleteRecoveryPlanExecution: API.OperationMethod<
  DeleteRecoveryPlanExecutionRequest,
  DeleteRecoveryPlanExecutionResponse,
  DeleteRecoveryPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteRecoveryPlanExecution",
    input: { recoveryPlanExecutionArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryPlanExecution",
})) as any;

export type DeleteRecoveryPlanStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a step from a Recovery Plan.
 */
export const deleteRecoveryPlanStep: API.OperationMethod<
  DeleteRecoveryPlanStepRequest,
  DeleteRecoveryPlanStepResponse,
  DeleteRecoveryPlanStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteRecoveryPlanStep",
    input: { recoveryPlanStepArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryPlanStep",
})) as any;

export type DeleteReplicationConfigurationTemplateError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationConfigurationTemplate",
})) as any;

export type DeleteSourceNetworkError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Delete Source Network resource.
 */
export const deleteSourceNetwork: API.OperationMethod<
  DeleteSourceNetworkRequest,
  DeleteSourceNetworkResponse,
  DeleteSourceNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteSourceNetwork",
    input: { sourceNetworkID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceNetwork",
})) as any;

export type DeleteSourceServerError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Deletes a single Source Server by ID. The Source Server must be disconnected first.
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
    input: { sourceServerID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceServer",
})) as any;

export type DescribeJobLogItemsError =
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a detailed Job log with pagination.
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
    input: { jobID: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
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
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Jobs. Use the JobsID and fromDate and toDate filters to limit which jobs are returned. The response is sorted by creationDataTime - latest date first. Jobs are created by the StartRecovery, TerminateRecoveryInstances and StartFailbackLaunch APIs. Jobs are also created by DiagnosticLaunch and TerminateDiagnosticInstances, which are APIs available only to *Support* and only used in response to relevant support tickets.
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
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
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

export type DescribeRecoveryInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all Recovery Instances or multiple Recovery Instances by ID.
 */
export const describeRecoveryInstances: API.PaginatedOperationMethod<
  DescribeRecoveryInstancesRequest,
  DescribeRecoveryInstancesResponse,
  DescribeRecoveryInstancesError,
  Credentials | HttpClient.HttpClient,
  RecoveryInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeRecoveryInstances",
    input: {
      filters: { recoveryInstanceIDs: 0, sourceServerIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecoveryInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRecoverySnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Recovery Snapshots for a single Source Server.
 */
export const describeRecoverySnapshots: API.PaginatedOperationMethod<
  DescribeRecoverySnapshotsRequest,
  DescribeRecoverySnapshotsResponse,
  DescribeRecoverySnapshotsError,
  Credentials | HttpClient.HttpClient,
  RecoverySnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeRecoverySnapshots",
    input: {
      sourceServerID: 0,
      filters: { fromDateTime: 0, toDateTime: 0 },
      order: 0,
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecoverySnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeReplicationConfigurationTemplatesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
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

export type DescribeSourceNetworksError =
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Source Networks or multiple Source Networks filtered by ID.
 */
export const describeSourceNetworks: API.PaginatedOperationMethod<
  DescribeSourceNetworksRequest,
  DescribeSourceNetworksResponse,
  DescribeSourceNetworksError,
  Credentials | HttpClient.HttpClient,
  SourceNetwork
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /DescribeSourceNetworks",
    input: {
      filters: { sourceNetworkIDs: 0, originAccountID: 0, originRegion: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list(o_SourceNetwork) },
    body: true,
  },
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceNetworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeSourceServersError =
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Source Servers or multiple Source Servers filtered by ID.
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
      filters: { sourceServerIDs: 0, hardwareId: 0, stagingAccountIDs: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
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

export type DisconnectRecoveryInstanceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disconnect a Recovery Instance from Elastic Disaster Recovery. Data replication is stopped immediately. All AWS resources created by Elastic Disaster Recovery for enabling the replication of the Recovery Instance will be terminated / deleted within 90 minutes. If the agent on the Recovery Instance has not been prevented from communicating with the Elastic Disaster Recovery service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the Recovery Instance will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectRecoveryInstance: API.OperationMethod<
  DisconnectRecoveryInstanceRequest,
  DisconnectRecoveryInstanceResponse,
  DisconnectRecoveryInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DisconnectRecoveryInstance",
    input: { recoveryInstanceID: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectRecoveryInstance",
})) as any;

export type DisconnectSourceServerError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Disconnects a specific Source Server from Elastic Disaster Recovery. Data replication is stopped immediately. All AWS resources created by Elastic Disaster Recovery for enabling the replication of the Source Server will be terminated / deleted within 90 minutes. You cannot disconnect a Source Server if it has a Recovery Instance. If the agent on the Source Server has not been prevented from communicating with the Elastic Disaster Recovery service, then it will receive a command to uninstall itself (within approximately 10 minutes). The following properties of the SourceServer will be changed immediately: dataReplicationInfo.dataReplicationState will be set to DISCONNECTED; The totalStorageBytes property for each of dataReplicationInfo.replicatedDisks will be set to zero; dataReplicationInfo.lagDuration and dataReplicationInfo.lagDuration will be nullified.
 */
export const disconnectSourceServer: API.OperationMethod<
  DisconnectSourceServerRequest,
  SourceServer,
  DisconnectSourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DisconnectSourceServer",
    input: { sourceServerID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectSourceServer",
})) as any;

export type ExportSourceNetworkCfnTemplateError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Export the Source Network CloudFormation template to an S3 bucket.
 */
export const exportSourceNetworkCfnTemplate: API.OperationMethod<
  ExportSourceNetworkCfnTemplateRequest,
  ExportSourceNetworkCfnTemplateResponse,
  ExportSourceNetworkCfnTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ExportSourceNetworkCfnTemplate",
    input: { sourceNetworkID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportSourceNetworkCfnTemplate",
})) as any;

export type GetFailbackReplicationConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists all Failback ReplicationConfigurations, filtered by Recovery Instance ID.
 */
export const getFailbackReplicationConfiguration: API.OperationMethod<
  GetFailbackReplicationConfigurationRequest,
  GetFailbackReplicationConfigurationResponse,
  GetFailbackReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetFailbackReplicationConfiguration",
    input: { recoveryInstanceID: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFailbackReplicationConfiguration",
})) as any;

export type GetLaunchConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Gets a LaunchConfiguration, filtered by Source Server IDs.
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
    input: { sourceServerID: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLaunchConfiguration",
})) as any;

export type GetRecoveryPlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Gets a Recovery Plan by ARN.
 */
export const getRecoveryPlan: API.OperationMethod<
  GetRecoveryPlanRequest,
  GetRecoveryPlanResponse,
  GetRecoveryPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetRecoveryPlan",
    input: { recoveryPlanArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPlan",
})) as any;

export type GetRecoveryPlanExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a Recovery Plan execution.
 */
export const getRecoveryPlanExecution: API.OperationMethod<
  GetRecoveryPlanExecutionRequest,
  GetRecoveryPlanExecutionResponse,
  GetRecoveryPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetRecoveryPlanExecution",
    input: { recoveryPlanExecutionArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPlanExecution",
})) as any;

export type GetRecoveryPlanExecutionStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a step within a Recovery Plan execution.
 */
export const getRecoveryPlanExecutionStep: API.OperationMethod<
  GetRecoveryPlanExecutionStepRequest,
  GetRecoveryPlanExecutionStepResponse,
  GetRecoveryPlanExecutionStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetRecoveryPlanExecutionStep",
    input: { recoveryPlanExecutionStepArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPlanExecutionStep",
})) as any;

export type GetRecoveryPlanStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Gets a Recovery Plan step by ARN.
 */
export const getRecoveryPlanStep: API.OperationMethod<
  GetRecoveryPlanStepRequest,
  GetRecoveryPlanStepResponse,
  GetRecoveryPlanStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetRecoveryPlanStep",
    input: { recoveryPlanStepArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryPlanStep",
})) as any;

export type GetReplicationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Gets a ReplicationConfiguration, filtered by Source Server ID.
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
    input: { sourceServerID: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReplicationConfiguration",
})) as any;

export type InitializeServiceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initialize Elastic Disaster Recovery.
 */
export const initializeService: API.OperationMethod<
  InitializeServiceRequest,
  InitializeServiceResponse,
  InitializeServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /InitializeService", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitializeService",
})) as any;

export type ListExtensibleSourceServersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of source servers on a staging account that are extensible, which means that: a. The source server is not already extended into this Account. b. The source server on the Account we’re reading from is not an extension of another source server.
 */
export const listExtensibleSourceServers: API.PaginatedOperationMethod<
  ListExtensibleSourceServersRequest,
  ListExtensibleSourceServersResponse,
  ListExtensibleSourceServersError,
  Credentials | HttpClient.HttpClient,
  StagingSourceServer
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListExtensibleSourceServers",
    input: { stagingAccountID: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExtensibleSourceServers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLaunchActionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Lists resource launch actions.
 */
export const listLaunchActions: API.PaginatedOperationMethod<
  ListLaunchActionsRequest,
  ListLaunchActionsResponse,
  ListLaunchActionsError,
  Credentials | HttpClient.HttpClient,
  LaunchAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListLaunchActions",
    input: {
      resourceId: 0,
      filters: { actionIds: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLaunchActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecoveryPlanExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists executions of Recovery Plans, optionally filtered by plan or status.
 */
export const listRecoveryPlanExecutions: API.PaginatedOperationMethod<
  ListRecoveryPlanExecutionsRequest,
  ListRecoveryPlanExecutionsResponse,
  ListRecoveryPlanExecutionsError,
  Credentials | HttpClient.HttpClient,
  RecoveryPlanExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListRecoveryPlanExecutions",
    input: { recoveryPlanArn: 0, status: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPlanExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recoveryPlanExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecoveryPlanExecutionStepsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all steps within a Recovery Plan execution.
 */
export const listRecoveryPlanExecutionSteps: API.PaginatedOperationMethod<
  ListRecoveryPlanExecutionStepsRequest,
  ListRecoveryPlanExecutionStepsResponse,
  ListRecoveryPlanExecutionStepsError,
  Credentials | HttpClient.HttpClient,
  RecoveryPlanExecutionStepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListRecoveryPlanExecutionSteps",
    input: {
      recoveryPlanExecutionArn: 0,
      filter: { status: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPlanExecutionSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recoveryPlanExecutionSteps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecoveryPlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Recovery Plans in the account.
 */
export const listRecoveryPlans: API.PaginatedOperationMethod<
  ListRecoveryPlansRequest,
  ListRecoveryPlansResponse,
  ListRecoveryPlansError,
  Credentials | HttpClient.HttpClient,
  RecoveryPlanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListRecoveryPlans",
    input: { maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recoveryPlans",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecoveryPlanStepsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Lists all steps in a Recovery Plan.
 */
export const listRecoveryPlanSteps: API.PaginatedOperationMethod<
  ListRecoveryPlanStepsRequest,
  ListRecoveryPlanStepsResponse,
  ListRecoveryPlanStepsError,
  Credentials | HttpClient.HttpClient,
  RecoveryPlanStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListRecoveryPlanSteps",
    input: { recoveryPlanArn: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryPlanSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recoveryPlanSteps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStagingAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array of staging accounts for existing extended source servers.
 */
export const listStagingAccounts: API.PaginatedOperationMethod<
  ListStagingAccountsRequest,
  ListStagingAccountsResponse,
  ListStagingAccountsError,
  Credentials | HttpClient.HttpClient,
  Account
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /ListStagingAccounts",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStagingAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accounts",
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
 * List all tags for your Elastic Disaster Recovery resources.
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

export type PutLaunchActionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Puts a resource launch action.
 */
export const putLaunchAction: API.OperationMethod<
  PutLaunchActionRequest,
  PutLaunchActionResponse,
  PutLaunchActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutLaunchAction",
    input: {
      resourceId: 0,
      actionCode: 0,
      order: 0,
      actionId: 0,
      optional: 0,
      active: 0,
      name: 0,
      actionVersion: 0,
      category: 0,
      parameters: D.map({ value: 0, type: 0 }),
      description: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLaunchAction",
})) as any;

export type ReorderRecoveryPlanStepsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Reorders steps in a Recovery Plan. Accepts a complete ordered list of step ARNs.
 */
export const reorderRecoveryPlanSteps: API.OperationMethod<
  ReorderRecoveryPlanStepsRequest,
  ReorderRecoveryPlanStepsResponse,
  ReorderRecoveryPlanStepsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ReorderRecoveryPlanSteps",
    input: { recoveryPlanArn: 0, orderedStepArns: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReorderRecoveryPlanSteps",
})) as any;

export type RetryDataReplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * WARNING: RetryDataReplication is deprecated. Causes the data replication initiation sequence to begin immediately upon next Handshake for the specified Source Server ID, regardless of when the previous initiation started. This command will work only if the Source Server is stalled or is in a DISCONNECTED or STOPPED state.
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
    input: { sourceServerID: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryDataReplication",
})) as any;

export type RetryRecoveryPlanExecutionStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Retries a failed `SERVER` type execution step.
 */
export const retryRecoveryPlanExecutionStep: API.OperationMethod<
  RetryRecoveryPlanExecutionStepRequest,
  RetryRecoveryPlanExecutionStepResponse,
  RetryRecoveryPlanExecutionStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /RetryRecoveryPlanExecutionStep",
    input: { recoveryPlanExecutionStepArn: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetryRecoveryPlanExecutionStep",
})) as any;

export type ReverseReplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Start replication to origin / target region - applies only to protected instances that originated in EC2. For recovery instances on target region - starts replication back to origin region. For failback instances on origin region - starts replication to target region to re-protect them.
 */
export const reverseReplication: API.OperationMethod<
  ReverseReplicationRequest,
  ReverseReplicationResponse,
  ReverseReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ReverseReplication",
    input: { recoveryInstanceID: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReverseReplication",
})) as any;

export type StartFailbackLaunchError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a Job for launching the machine that is being failed back to from the specified Recovery Instance. This will run conversion on the failback client and will reboot your machine, thus completing the failback process.
 */
export const startFailbackLaunch: API.OperationMethod<
  StartFailbackLaunchRequest,
  StartFailbackLaunchResponse,
  StartFailbackLaunchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartFailbackLaunch",
    input: { recoveryInstanceIDs: 0, tags: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFailbackLaunch",
})) as any;

export type StartRecoveryError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Launches Recovery Instances for the specified Source Servers. For each Source Server you may choose a point in time snapshot to launch from, or use an on demand snapshot.
 */
export const startRecovery: API.OperationMethod<
  StartRecoveryRequest,
  StartRecoveryResponse,
  StartRecoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartRecovery",
    input: {
      sourceServers: D.list({ sourceServerID: 0, recoverySnapshotID: 0 }),
      isDrill: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecovery",
})) as any;

export type StartRecoveryPlanExecutionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Starts executing a Recovery Plan in `DRILL` or `RECOVERY` mode. A plan cannot have more than one execution in a non-terminal status at a time.
 */
export const startRecoveryPlanExecution: API.OperationMethod<
  StartRecoveryPlanExecutionRequest,
  StartRecoveryPlanExecutionResponse,
  StartRecoveryPlanExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartRecoveryPlanExecution",
    input: {
      recoveryPlanArn: 0,
      mode: 0,
      clientToken: D.m({ idempotency: true }),
      sourceServers: D.list({ sourceServerID: 0, recoverySnapshotID: 0 }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecoveryPlanExecution",
})) as any;

export type StartReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Starts replication for a stopped Source Server. This action would make the Source Server protected again and restart billing for it.
 */
export const startReplication: API.OperationMethod<
  StartReplicationRequest,
  StartReplicationResponse,
  StartReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartReplication",
    input: { sourceServerID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartReplication",
})) as any;

export type StartSourceNetworkRecoveryError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Deploy VPC for the specified Source Network and modify launch templates to use this network. The VPC will be deployed using a dedicated CloudFormation stack.
 */
export const startSourceNetworkRecovery: API.OperationMethod<
  StartSourceNetworkRecoveryRequest,
  StartSourceNetworkRecoveryResponse,
  StartSourceNetworkRecoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartSourceNetworkRecovery",
    input: {
      sourceNetworks: D.list({ sourceNetworkID: 0, cfnStackName: 0 }),
      deployAsNew: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSourceNetworkRecovery",
})) as any;

export type StartSourceNetworkReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Starts replication for a Source Network. This action would make the Source Network protected.
 */
export const startSourceNetworkReplication: API.OperationMethod<
  StartSourceNetworkReplicationRequest,
  StartSourceNetworkReplicationResponse,
  StartSourceNetworkReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartSourceNetworkReplication",
    input: { sourceNetworkID: 0 },
    output: { sourceNetwork: o_SourceNetwork },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSourceNetworkReplication",
})) as any;

export type StopFailbackError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Stops the failback process for a specified Recovery Instance. This changes the Failback State of the Recovery Instance back to FAILBACK_NOT_STARTED.
 */
export const stopFailback: API.OperationMethod<
  StopFailbackRequest,
  StopFailbackResponse,
  StopFailbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopFailback",
    input: { recoveryInstanceID: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFailback",
})) as any;

export type StopReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Stops replication for a Source Server. This action would make the Source Server unprotected, delete its existing snapshots and stop billing for it.
 */
export const stopReplication: API.OperationMethod<
  StopReplicationRequest,
  StopReplicationResponse,
  StopReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopReplication",
    input: { sourceServerID: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplication",
})) as any;

export type StopSourceNetworkReplicationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Stops replication for a Source Network. This action would make the Source Network unprotected.
 */
export const stopSourceNetworkReplication: API.OperationMethod<
  StopSourceNetworkReplicationRequest,
  StopSourceNetworkReplicationResponse,
  StopSourceNetworkReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StopSourceNetworkReplication",
    input: { sourceNetworkID: 0 },
    output: { sourceNetwork: o_SourceNetwork },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSourceNetworkReplication",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified Elastic Disaster Recovery resource or resources. When you specify an existing tag key, the value is overwritten with the new value. Each resource can have a maximum of 50 tags. Each tag consists of a key and optional value.
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

export type TerminateRecoveryInstancesError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Initiates a Job for terminating the EC2 resources associated with the specified Recovery Instances, and then will delete the Recovery Instances from the Elastic Disaster Recovery service.
 */
export const terminateRecoveryInstances: API.OperationMethod<
  TerminateRecoveryInstancesRequest,
  TerminateRecoveryInstancesResponse,
  TerminateRecoveryInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TerminateRecoveryInstances",
    input: { recoveryInstanceIDs: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateRecoveryInstances",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified set of tags from the specified set of Elastic Disaster Recovery resources.
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

export type UpdateFailbackReplicationConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | CommonErrors;
/**
 * Allows you to update the failback replication configuration of a Recovery Instance by ID.
 */
export const updateFailbackReplicationConfiguration: API.OperationMethod<
  UpdateFailbackReplicationConfigurationRequest,
  UpdateFailbackReplicationConfigurationResponse,
  UpdateFailbackReplicationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateFailbackReplicationConfiguration",
    input: {
      recoveryInstanceID: 0,
      name: 0,
      bandwidthThrottling: 0,
      usePrivateIP: 0,
      internetProtocol: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFailbackReplicationConfiguration",
})) as any;

export type UpdateLaunchConfigurationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates a LaunchConfiguration by Source Server ID.
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
      postLaunchEnabled: 0,
      launchIntoInstanceProperties: { launchIntoEC2InstanceID: 0 },
      recoveryMode: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfiguration",
})) as any;

export type UpdateLaunchConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Launch Configuration Template by ID.
 */
export const updateLaunchConfigurationTemplate: API.OperationMethod<
  UpdateLaunchConfigurationTemplateRequest,
  UpdateLaunchConfigurationTemplateResponse,
  UpdateLaunchConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateLaunchConfigurationTemplate",
    input: {
      launchConfigurationTemplateID: 0,
      launchDisposition: 0,
      targetInstanceTypeRightSizingMethod: 0,
      copyPrivateIp: 0,
      copyTags: 0,
      licensing: i_Licensing,
      exportBucketArn: 0,
      postLaunchEnabled: 0,
      launchIntoSourceInstance: 0,
      recoveryMode: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLaunchConfigurationTemplate",
})) as any;

export type UpdateRecoveryPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Recovery Plan's name or description.
 */
export const updateRecoveryPlan: API.OperationMethod<
  UpdateRecoveryPlanRequest,
  UpdateRecoveryPlanResponse,
  UpdateRecoveryPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateRecoveryPlan",
    input: { recoveryPlanArn: 0, name: 0, description: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecoveryPlan",
})) as any;

export type UpdateRecoveryPlanExecutionStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates an execution step. Supports two actions: (1) skip a step that is in `NOT_STARTED` or `FAILED` status; (2) update the wait duration of a `WAIT` type step that is in `NOT_STARTED` status.
 */
export const updateRecoveryPlanExecutionStep: API.OperationMethod<
  UpdateRecoveryPlanExecutionStepRequest,
  UpdateRecoveryPlanExecutionStepResponse,
  UpdateRecoveryPlanExecutionStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateRecoveryPlanExecutionStep",
    input: {
      recoveryPlanExecutionStepArn: 0,
      status: 0,
      servers: D.list(i_RecoveryPlanServer),
      waitDurationMinutes: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecoveryPlanExecutionStep",
})) as any;

export type UpdateRecoveryPlanStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Updates a Recovery Plan step's name or configuration. Step type is immutable.
 */
export const updateRecoveryPlanStep: API.OperationMethod<
  UpdateRecoveryPlanStepRequest,
  UpdateRecoveryPlanStepResponse,
  UpdateRecoveryPlanStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateRecoveryPlanStep",
    input: {
      recoveryPlanStepArn: 0,
      stepName: 0,
      configuration: i_RecoveryPlanStepConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecoveryPlanStep",
})) as any;

export type UpdateReplicationConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UninitializedAccountException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to update a ReplicationConfiguration by Source Server ID.
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
        optimizedStagingDiskType: 0,
      }),
      ebsEncryption: 0,
      ebsEncryptionKeyArn: 0,
      bandwidthThrottling: 0,
      dataPlaneRouting: 0,
      createPublicIP: 0,
      stagingAreaTags: 0,
      pitPolicy: D.list(i_PITPolicyRule),
      autoReplicateNewDisks: 0,
      internetProtocol: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfiguration",
})) as any;

export type UpdateReplicationConfigurationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
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
      pitPolicy: D.list(i_PITPolicyRule),
      autoReplicateNewDisks: 0,
      internetProtocol: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UninitializedAccountException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReplicationConfigurationTemplate",
})) as any;

const i_Licensing: D.LazyStruct = () => ({ osByol: 0 });
const i_PITPolicyRule: D.LazyStruct = () => ({
  ruleID: 0,
  units: 0,
  interval: 0,
  retentionDuration: 0,
  enabled: 0,
});
const i_RecoveryPlanServer: D.LazyStruct = () => ({
  serverArn: 0,
  impactLevel: 0,
});
const i_RecoveryPlanStepConfiguration: D.LazyStruct = () => ({
  serverStepConfiguration: { servers: D.list(i_RecoveryPlanServer) },
  waitStepConfiguration: { waitDurationMinutes: 0 },
});
const o_SourceNetwork: D.LazyStruct = () => ({
  replicationStatusDetails: D.secret,
  cfnStackName: D.secret,
  lastRecovery: { apiCallDateTime: D.ts },
});
