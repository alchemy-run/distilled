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
const ns = /*@__PURE__*/ T.XmlNamespace("http://batch.amazonaws.com/doc/2016-08-10/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Batch",
  serviceShapeName: "AWSBatchV20160810",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "batch" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-08-10");
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
              `https://batch-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(`https://fips.batch.${Region}.amazonaws.com`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://batch.${Region}.amazonaws.com`);
            }
            return e(`https://batch-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://batch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://batch.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://batch.{R}.{D}","properties":{},"headers":{}}');

export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()(
    "ClientException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ComputeEnvironmentBeingModified
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentBeingModified>()(
    "ComputeEnvironmentBeingModified",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { includes: "is being modified" },
    }),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ComputeEnvironmentInUse
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentInUse>()(
    "ComputeEnvironmentInUse",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { includes: "found existing JobQueue relationship" },
    }),
  ).pipe(C.withDependencyViolationError, C.withRetryableError) {}
export class ComputeEnvironmentNotFound
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentNotFound>()(
    "ComputeEnvironmentNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { matches: "compute-environment/.* does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class ComputeEnvironmentNotValid
  extends /*@__PURE__*/ S.TaggedError<ComputeEnvironmentNotValid>()(
    "ComputeEnvironmentNotValid",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { matches: "must be (created and )?valid before attaching" },
    }),
  ).pipe(C.withDependencyViolationError, C.withRetryableError) {}
export class JobQueueAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<JobQueueAlreadyExists>()(
    "JobQueueAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { includes: "already exists" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class JobQueueBeingModified
  extends /*@__PURE__*/ S.TaggedError<JobQueueBeingModified>()(
    "JobQueueBeingModified",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { includes: "is being modified" },
    }),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class JobQueueNotFound
  extends /*@__PURE__*/ S.TaggedError<JobQueueNotFound>()(
    "JobQueueNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ClientException",
      message: { matches: "job-queue/.* does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()(
    "ServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export interface CancelJobRequest {
  jobId?: string;
  reason?: string;
}
export interface CancelJobResponse {}
export type StringList = string[];
export interface CancelJobsRequest {
  jobs?: string[];
  reason?: string;
}
export interface CancelJobsErrorDetail {
  job?: string;
  code?: string;
  message?: string;
}
export type CancelJobsErrorDetailList = CancelJobsErrorDetail[];
export interface CancelJobsResponse {
  successful: string[];
  errors: (CancelJobsErrorDetail & { job: string; code: string; message: string })[];
}
export type CEType = "MANAGED" | "UNMANAGED" | (string & {});
export type CEState = "ENABLED" | "DISABLED" | (string & {});
export type CRType =
  | "EC2"
  | "SPOT"
  | "FARGATE"
  | "FARGATE_SPOT"
  | "ECS_MANAGED_INSTANCES"
  | (string & {});
export type CRAllocationStrategy =
  | "BEST_FIT"
  | "BEST_FIT_PROGRESSIVE"
  | "BEST_FIT_PROGRESSIVE_ORDERED"
  | "SPOT_CAPACITY_OPTIMIZED"
  | "SPOT_PRICE_CAPACITY_OPTIMIZED"
  | "SPOT_CAPACITY_OPTIMIZED_PRIORITIZED"
  | (string & {});
export type TagsMap = { [key: string]: string | undefined };
export type UserdataType = "EKS_BOOTSTRAP_SH" | "EKS_NODEADM" | (string & {});
export interface LaunchTemplateSpecificationOverride {
  launchTemplateId?: string;
  launchTemplateName?: string;
  version?: string;
  targetInstanceTypes?: string[];
  userdataType?: UserdataType;
}
export type LaunchTemplateSpecificationOverrideList = LaunchTemplateSpecificationOverride[];
export interface LaunchTemplateSpecification {
  launchTemplateId?: string;
  launchTemplateName?: string;
  version?: string;
  overrides?: LaunchTemplateSpecificationOverride[];
  userdataType?: UserdataType;
}
export type ImageType = string;
export type ImageIdOverride = string;
export type KubernetesVersion = string;
export interface Ec2Configuration {
  imageType?: string;
  imageIdOverride?: string;
  batchImageStatus?: string;
  imageKubernetesVersion?: string;
}
export type Ec2ConfigurationList = Ec2Configuration[];
export interface ComputeScalingPolicy {
  minScaleDownDelayMinutes?: number;
}
export interface ManagedInstancesNetworkConfiguration {
  subnets?: string[];
  securityGroups?: string[];
}
export interface InstanceRequirementsRequest {
  allowedInstanceTypes?: string[];
}
export interface ManagedInstancesStorageConfiguration {
  storageSizeGiB?: number;
}
export interface CapacityReservationRequest {
  reservationGroupArn?: string;
  reservationPreference?: string;
}
export interface ManagedInstancesLocalStorageConfiguration {
  useLocalStorage?: boolean;
}
export interface InstanceLaunchTemplate {
  ec2InstanceProfileArn?: string;
  networkConfiguration?: ManagedInstancesNetworkConfiguration;
  instanceRequirements?: InstanceRequirementsRequest;
  capacityOptionType?: string;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  monitoring?: string;
  fipsEnabled?: boolean;
  capacityReservations?: CapacityReservationRequest;
  instanceMetadataTagsPropagation?: boolean;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
}
export interface InfrastructureOptimization {
  scaleInAfter?: number;
}
export interface ManagedInstancesProvider {
  propagateTags?: string;
  infrastructureRoleArn?: string;
  instanceLaunchTemplate?: InstanceLaunchTemplate;
  infrastructureOptimization?: InfrastructureOptimization;
}
export type TagKey = string;
export type TagValue = string;
export type TagrisTagsMap = { [key: string]: string | undefined };
export interface ComputeResource {
  type?: CRType;
  allocationStrategy?: CRAllocationStrategy;
  minvCpus?: number;
  maxvCpus?: number;
  desiredvCpus?: number;
  instanceTypes?: string[];
  imageId?: string;
  subnets?: string[];
  securityGroupIds?: string[];
  ec2KeyPair?: string;
  instanceRole?: string;
  tags?: { [key: string]: string | undefined };
  placementGroup?: string;
  bidPercentage?: number;
  spotIamFleetRole?: string;
  launchTemplate?: LaunchTemplateSpecification;
  ec2Configuration?: Ec2Configuration[];
  scalingPolicy?: ComputeScalingPolicy;
  managedInstancesProvider?: ManagedInstancesProvider;
  capacityTags?: { [key: string]: string | undefined };
}
export type EksAccessEntryDesiredState =
  | "ENABLED"
  | "DISABLED"
  | "INHERIT_FROM_CLUSTER"
  | (string & {});
export type EksAccessEntryStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface EksAccessEntry {
  desiredState?: EksAccessEntryDesiredState;
  status?: EksAccessEntryStatus;
}
export interface EksConfiguration {
  eksClusterArn?: string;
  kubernetesNamespace?: string;
  accessEntry?: EksAccessEntry;
}
export type ContainerInsights = "ENABLED" | "ENHANCED" | "DISABLED" | (string & {});
export interface EcsSettings {
  containerInsights?: ContainerInsights;
}
export interface CreateComputeEnvironmentRequest {
  computeEnvironmentName?: string;
  type?: CEType;
  state?: CEState;
  unmanagedvCpus?: number;
  computeResources?: ComputeResource;
  serviceRole?: string;
  tags?: { [key: string]: string | undefined };
  eksConfiguration?: EksConfiguration;
  context?: string;
  ecsSettings?: EcsSettings;
}
export interface CreateComputeEnvironmentResponse {
  computeEnvironmentName?: string;
  computeEnvironmentArn?: string;
}
export interface CreateConsumableResourceRequest {
  consumableResourceName?: string;
  totalQuantity?: number;
  resourceType?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateConsumableResourceResponse {
  consumableResourceName: string;
  consumableResourceArn: string;
}
export type JQState = "ENABLED" | "DISABLED" | (string & {});
export interface ComputeEnvironmentOrder {
  order?: number;
  computeEnvironment?: string;
}
export type ComputeEnvironmentOrders = ComputeEnvironmentOrder[];
export interface ServiceEnvironmentOrder {
  order?: number;
  serviceEnvironment?: string;
}
export type ServiceEnvironmentOrders = ServiceEnvironmentOrder[];
export type JobQueueType =
  | "EKS"
  | "ECS"
  | "ECS_FARGATE"
  | "SAGEMAKER_TRAINING"
  | "ECS_MANAGED_INSTANCES"
  | (string & {});
export type JobStateTimeLimitActionsState = "RUNNABLE" | (string & {});
export type JobStateTimeLimitActionsAction = "CANCEL" | "TERMINATE" | (string & {});
export interface JobStateTimeLimitAction {
  reason?: string;
  state?: JobStateTimeLimitActionsState;
  maxTimeSeconds?: number;
  action?: JobStateTimeLimitActionsAction;
}
export type JobStateTimeLimitActions = JobStateTimeLimitAction[];
export interface CreateJobQueueRequest {
  jobQueueName?: string;
  state?: JQState;
  schedulingPolicyArn?: string;
  priority?: number;
  computeEnvironmentOrder?: ComputeEnvironmentOrder[];
  serviceEnvironmentOrder?: ServiceEnvironmentOrder[];
  jobQueueType?: JobQueueType;
  tags?: { [key: string]: string | undefined };
  jobStateTimeLimitActions?: JobStateTimeLimitAction[];
}
export interface CreateJobQueueResponse {
  jobQueueName: string;
  jobQueueArn: string;
}
export interface QuotaShareCapacityLimit {
  maxCapacity?: number;
  capacityUnit?: string;
}
export type QuotaShareCapacityLimits = QuotaShareCapacityLimit[];
export type QuotaShareResourceSharingStrategy =
  | "RESERVE"
  | "LEND"
  | "LEND_AND_BORROW"
  | (string & {});
export interface QuotaShareResourceSharingConfiguration {
  strategy?: QuotaShareResourceSharingStrategy;
  borrowLimit?: number;
}
export type QuotaShareInSharePreemptionState = "ENABLED" | "DISABLED" | (string & {});
export interface QuotaSharePreemptionConfiguration {
  inSharePreemption?: QuotaShareInSharePreemptionState;
}
export type QuotaShareState = "ENABLED" | "DISABLED" | (string & {});
export interface CreateQuotaShareRequest {
  quotaShareName?: string;
  jobQueue?: string;
  capacityLimits?: QuotaShareCapacityLimit[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration;
  preemptionConfiguration?: QuotaSharePreemptionConfiguration;
  state?: QuotaShareState;
  tags?: { [key: string]: string | undefined };
}
export interface CreateQuotaShareResponse {
  quotaShareName?: string;
  quotaShareArn?: string;
}
export type QuotaShareIdleResourceAssignmentStrategy = "FIFO" | (string & {});
export interface QuotaSharePolicy {
  idleResourceAssignmentStrategy?: QuotaShareIdleResourceAssignmentStrategy;
}
export interface ShareAttributes {
  shareIdentifier?: string;
  weightFactor?: number;
}
export type ShareAttributesList = ShareAttributes[];
export interface FairsharePolicy {
  shareDecaySeconds?: number;
  computeReservation?: number;
  shareDistribution?: ShareAttributes[];
}
export interface CreateSchedulingPolicyRequest {
  name?: string;
  quotaSharePolicy?: QuotaSharePolicy;
  fairsharePolicy?: FairsharePolicy;
  tags?: { [key: string]: string | undefined };
}
export interface CreateSchedulingPolicyResponse {
  name: string;
  arn: string;
}
export type ServiceEnvironmentType = "SAGEMAKER_TRAINING" | (string & {});
export type ServiceEnvironmentState = "ENABLED" | "DISABLED" | (string & {});
export interface CapacityLimit {
  maxCapacity?: number;
  capacityUnit?: string;
}
export type CapacityLimits = CapacityLimit[];
export interface CreateServiceEnvironmentRequest {
  serviceEnvironmentName?: string;
  serviceEnvironmentType?: ServiceEnvironmentType;
  state?: ServiceEnvironmentState;
  capacityLimits?: CapacityLimit[];
  tags?: { [key: string]: string | undefined };
}
export interface CreateServiceEnvironmentResponse {
  serviceEnvironmentName: string;
  serviceEnvironmentArn: string;
}
export interface DeleteComputeEnvironmentRequest {
  computeEnvironment?: string;
}
export interface DeleteComputeEnvironmentResponse {}
export interface DeleteConsumableResourceRequest {
  consumableResource?: string;
}
export interface DeleteConsumableResourceResponse {}
export interface DeleteJobQueueRequest {
  jobQueue?: string;
}
export interface DeleteJobQueueResponse {}
export interface DeleteQuotaShareRequest {
  quotaShareArn?: string;
}
export interface DeleteQuotaShareResponse {}
export interface DeleteSchedulingPolicyRequest {
  arn?: string;
}
export interface DeleteSchedulingPolicyResponse {}
export interface DeleteServiceEnvironmentRequest {
  serviceEnvironment?: string;
}
export interface DeleteServiceEnvironmentResponse {}
export interface DeregisterJobDefinitionRequest {
  jobDefinition?: string;
}
export interface DeregisterJobDefinitionResponse {}
export interface DescribeComputeEnvironmentsRequest {
  computeEnvironments?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type CEStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "VALID"
  | "INVALID"
  | (string & {});
export type JobExecutionTimeoutMinutes = number;
export interface UpdatePolicy {
  terminateJobsOnUpdate?: boolean;
  jobExecutionTimeoutMinutes?: number;
}
export type OrchestrationType = "ECS" | "EKS" | (string & {});
export interface ComputeEnvironmentDetail {
  computeEnvironmentName?: string;
  computeEnvironmentArn?: string;
  unmanagedvCpus?: number;
  ecsClusterArn?: string;
  tags?: { [key: string]: string | undefined };
  type?: CEType;
  state?: CEState;
  status?: CEStatus;
  statusReason?: string;
  computeResources?: ComputeResource;
  serviceRole?: string;
  updatePolicy?: UpdatePolicy;
  eksConfiguration?: EksConfiguration;
  containerOrchestrationType?: OrchestrationType;
  uuid?: string;
  context?: string;
  ecsSettings?: EcsSettings;
}
export type ComputeEnvironmentDetailList = ComputeEnvironmentDetail[];
export interface DescribeComputeEnvironmentsResponse {
  computeEnvironments?: (ComputeEnvironmentDetail & {
    computeEnvironmentName: string;
    computeEnvironmentArn: string;
    computeResources: ComputeResource & {
      type: CRType;
      maxvCpus: number;
      ec2Configuration: (Ec2Configuration & { imageType: ImageType })[];
      managedInstancesProvider: ManagedInstancesProvider & {
        infrastructureRoleArn: string;
        instanceLaunchTemplate: InstanceLaunchTemplate & {
          ec2InstanceProfileArn: string;
          networkConfiguration: ManagedInstancesNetworkConfiguration & {
            subnets: StringList;
            securityGroups: StringList;
          };
        };
      };
    };
    eksConfiguration: EksConfiguration & {
      eksClusterArn: string;
      kubernetesNamespace: string;
      accessEntry: EksAccessEntry & { desiredState: EksAccessEntryDesiredState };
    };
  })[];
  nextToken?: string;
}
export interface DescribeConsumableResourceRequest {
  consumableResource?: string;
}
export interface DescribeConsumableResourceResponse {
  consumableResourceName: string;
  consumableResourceArn: string;
  totalQuantity?: number;
  inUseQuantity?: number;
  availableQuantity?: number;
  resourceType?: string;
  createdAt?: number;
  tags?: { [key: string]: string | undefined };
}
export interface DescribeJobDefinitionsRequest {
  jobDefinitions?: string[];
  maxResults?: number;
  jobDefinitionName?: string;
  status?: string;
  nextToken?: string;
}
export type ParametersMap = { [key: string]: string | undefined };
export type RetryAction = "RETRY" | "EXIT" | (string & {});
export interface EvaluateOnExit {
  onStatusReason?: string;
  onReason?: string;
  onExitCode?: string;
  action?: RetryAction;
}
export type EvaluateOnExitList = EvaluateOnExit[];
export interface RetryStrategy {
  attempts?: number;
  evaluateOnExit?: EvaluateOnExit[];
}
export interface Host {
  sourcePath?: string;
}
export type EFSTransitEncryption = "ENABLED" | "DISABLED" | (string & {});
export type EFSAuthorizationConfigIAM = "ENABLED" | "DISABLED" | (string & {});
export interface EFSAuthorizationConfig {
  accessPointId?: string;
  iam?: EFSAuthorizationConfigIAM;
}
export interface EFSVolumeConfiguration {
  fileSystemId?: string;
  rootDirectory?: string;
  transitEncryption?: EFSTransitEncryption;
  transitEncryptionPort?: number;
  authorizationConfig?: EFSAuthorizationConfig;
}
export interface S3FilesVolumeConfiguration {
  fileSystemArn?: string;
  rootDirectory?: string;
  transitEncryptionPort?: number;
  accessPointArn?: string;
}
export interface Volume {
  host?: Host;
  name?: string;
  efsVolumeConfiguration?: EFSVolumeConfiguration;
  s3filesVolumeConfiguration?: S3FilesVolumeConfiguration;
}
export type Volumes = Volume[];
export interface KeyValuePair {
  name?: string;
  value?: string;
}
export type EnvironmentVariables = KeyValuePair[];
export interface MountPoint {
  containerPath?: string;
  readOnly?: boolean;
  sourceVolume?: string;
}
export type MountPoints = MountPoint[];
export interface Ulimit {
  hardLimit?: number;
  name?: string;
  softLimit?: number;
}
export type Ulimits = Ulimit[];
export type ResourceType = "GPU" | "VCPU" | "MEMORY" | (string & {});
export interface ResourceRequirement {
  value?: string;
  type?: ResourceType;
}
export type ResourceRequirements = ResourceRequirement[];
export type DeviceCgroupPermission = "READ" | "WRITE" | "MKNOD" | (string & {});
export type DeviceCgroupPermissions = DeviceCgroupPermission[];
export interface Device {
  hostPath?: string;
  containerPath?: string;
  permissions?: DeviceCgroupPermission[];
}
export type DevicesList = Device[];
export interface Tmpfs {
  containerPath?: string;
  size?: number;
  mountOptions?: string[];
}
export type TmpfsList = Tmpfs[];
export interface LinuxParameters {
  devices?: Device[];
  initProcessEnabled?: boolean;
  sharedMemorySize?: number;
  tmpfs?: Tmpfs[];
  maxSwap?: number;
  swappiness?: number;
}
export type LogDriver =
  | "json-file"
  | "syslog"
  | "journald"
  | "gelf"
  | "fluentd"
  | "awslogs"
  | "splunk"
  | "awsfirelens"
  | (string & {});
export type LogConfigurationOptionsMap = { [key: string]: string | undefined };
export interface Secret {
  name?: string;
  valueFrom?: string;
}
export type SecretList = Secret[];
export interface LogConfiguration {
  logDriver?: LogDriver;
  options?: { [key: string]: string | undefined };
  secretOptions?: Secret[];
}
export type AssignPublicIp = "ENABLED" | "DISABLED" | (string & {});
export interface NetworkConfiguration {
  assignPublicIp?: AssignPublicIp;
}
export interface FargatePlatformConfiguration {
  platformVersion?: string;
}
export interface EphemeralStorage {
  sizeInGiB?: number;
}
export interface RuntimePlatform {
  operatingSystemFamily?: string;
  cpuArchitecture?: string;
}
export interface RepositoryCredentials {
  credentialsParameter?: string;
}
export interface ContainerProperties {
  image?: string;
  vcpus?: number;
  memory?: number;
  command?: string[];
  jobRoleArn?: string;
  executionRoleArn?: string;
  volumes?: Volume[];
  environment?: KeyValuePair[];
  mountPoints?: MountPoint[];
  readonlyRootFilesystem?: boolean;
  privileged?: boolean;
  ulimits?: Ulimit[];
  user?: string;
  instanceType?: string;
  resourceRequirements?: ResourceRequirement[];
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  secrets?: Secret[];
  networkConfiguration?: NetworkConfiguration;
  fargatePlatformConfiguration?: FargatePlatformConfiguration;
  enableExecuteCommand?: boolean;
  ephemeralStorage?: EphemeralStorage;
  runtimePlatform?: RuntimePlatform;
  repositoryCredentials?: RepositoryCredentials;
}
export interface JobTimeout {
  attemptDurationSeconds?: number;
}
export interface TaskContainerDependency {
  containerName?: string;
  condition?: string;
}
export type TaskContainerDependencyList = TaskContainerDependency[];
export type FirelensConfigurationType = "fluentd" | "fluentbit" | (string & {});
export type FirelensConfigurationOptionsMap = { [key: string]: string | undefined };
export interface FirelensConfiguration {
  type?: FirelensConfigurationType;
  options?: { [key: string]: string | undefined };
}
export interface TaskContainerProperties {
  command?: string[];
  dependsOn?: TaskContainerDependency[];
  environment?: KeyValuePair[];
  essential?: boolean;
  firelensConfiguration?: FirelensConfiguration;
  image?: string;
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  mountPoints?: MountPoint[];
  name?: string;
  privileged?: boolean;
  readonlyRootFilesystem?: boolean;
  repositoryCredentials?: RepositoryCredentials;
  resourceRequirements?: ResourceRequirement[];
  secrets?: Secret[];
  ulimits?: Ulimit[];
  user?: string;
  startTimeout?: number;
  stopTimeout?: number;
}
export type ListTaskContainerProperties = TaskContainerProperties[];
export interface EcsTaskProperties {
  containers?: TaskContainerProperties[];
  ephemeralStorage?: EphemeralStorage;
  executionRoleArn?: string;
  platformVersion?: string;
  ipcMode?: string;
  taskRoleArn?: string;
  pidMode?: string;
  networkConfiguration?: NetworkConfiguration;
  runtimePlatform?: RuntimePlatform;
  volumes?: Volume[];
  enableExecuteCommand?: boolean;
  networkMode?: string;
}
export type ListEcsTaskProperties = EcsTaskProperties[];
export interface EcsProperties {
  taskProperties?: EcsTaskProperties[];
}
export interface ImagePullSecret {
  name?: string;
}
export type ImagePullSecrets = ImagePullSecret[];
export interface EksContainerEnvironmentVariable {
  name?: string;
  value?: string;
}
export type EksContainerEnvironmentVariables = EksContainerEnvironmentVariable[];
export type Quantity = string;
export type EksLimits = { [key: string]: string | undefined };
export type EksRequests = { [key: string]: string | undefined };
export interface EksContainerResourceRequirements {
  limits?: { [key: string]: string | undefined };
  requests?: { [key: string]: string | undefined };
}
export interface EksContainerVolumeMount {
  name?: string;
  mountPath?: string;
  subPath?: string;
  readOnly?: boolean;
}
export type EksContainerVolumeMounts = EksContainerVolumeMount[];
export interface EksContainerSecurityContext {
  runAsUser?: number;
  runAsGroup?: number;
  privileged?: boolean;
  allowPrivilegeEscalation?: boolean;
  readOnlyRootFilesystem?: boolean;
  runAsNonRoot?: boolean;
}
export interface EksContainer {
  name?: string;
  image?: string;
  imagePullPolicy?: string;
  command?: string[];
  args?: string[];
  env?: EksContainerEnvironmentVariable[];
  resources?: EksContainerResourceRequirements;
  volumeMounts?: EksContainerVolumeMount[];
  securityContext?: EksContainerSecurityContext;
}
export type EksContainers = EksContainer[];
export interface EksHostPath {
  path?: string;
}
export interface EksEmptyDir {
  medium?: string;
  sizeLimit?: string;
}
export interface EksSecret {
  secretName?: string;
  optional?: boolean;
}
export interface EksPersistentVolumeClaim {
  claimName?: string;
  readOnly?: boolean;
}
export interface EksVolume {
  name?: string;
  hostPath?: EksHostPath;
  emptyDir?: EksEmptyDir;
  secret?: EksSecret;
  persistentVolumeClaim?: EksPersistentVolumeClaim;
}
export type EksVolumes = EksVolume[];
export type EksLabelsMap = { [key: string]: string | undefined };
export type EksAnnotationsMap = { [key: string]: string | undefined };
export interface EksMetadata {
  labels?: { [key: string]: string | undefined };
  annotations?: { [key: string]: string | undefined };
  namespace?: string;
}
export interface EksPodProperties {
  serviceAccountName?: string;
  hostNetwork?: boolean;
  dnsPolicy?: string;
  imagePullSecrets?: ImagePullSecret[];
  containers?: EksContainer[];
  initContainers?: EksContainer[];
  volumes?: EksVolume[];
  metadata?: EksMetadata;
  shareProcessNamespace?: boolean;
}
export interface EksProperties {
  podProperties?: EksPodProperties;
}
export interface ConsumableResourceRequirement {
  consumableResource?: string;
  quantity?: number;
}
export type ConsumableResourceList = ConsumableResourceRequirement[];
export interface ConsumableResourceProperties {
  consumableResourceList?: ConsumableResourceRequirement[];
}
export interface NodeRangeProperty {
  targetNodes?: string;
  container?: ContainerProperties;
  instanceTypes?: string[];
  ecsProperties?: EcsProperties;
  eksProperties?: EksProperties;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export type NodeRangeProperties = NodeRangeProperty[];
export interface NodeProperties {
  numNodes?: number;
  mainNode?: number;
  nodeRangeProperties?: NodeRangeProperty[];
}
export type PlatformCapability = "EC2" | "FARGATE" | "MANAGED_INSTANCES" | (string & {});
export type PlatformCapabilityList = PlatformCapability[];
export interface JobDefinition {
  jobDefinitionName?: string;
  jobDefinitionArn?: string;
  revision?: number;
  status?: string;
  type?: string;
  schedulingPriority?: number;
  parameters?: { [key: string]: string | undefined };
  retryStrategy?: RetryStrategy;
  containerProperties?: ContainerProperties;
  timeout?: JobTimeout;
  nodeProperties?: NodeProperties;
  tags?: { [key: string]: string | undefined };
  propagateTags?: boolean;
  platformCapabilities?: PlatformCapability[];
  ecsProperties?: EcsProperties;
  eksProperties?: EksProperties;
  containerOrchestrationType?: OrchestrationType;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export type JobDefinitionList = JobDefinition[];
export interface DescribeJobDefinitionsResponse {
  jobDefinitions?: (JobDefinition & {
    jobDefinitionName: string;
    jobDefinitionArn: string;
    revision: number;
    type: string;
    retryStrategy: RetryStrategy & { evaluateOnExit: (EvaluateOnExit & { action: RetryAction })[] };
    containerProperties: ContainerProperties & {
      volumes: (Volume & {
        efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
        s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
      })[];
      ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
      resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
      linuxParameters: LinuxParameters & {
        devices: (Device & { hostPath: string })[];
        tmpfs: (Tmpfs & { containerPath: string; size: number })[];
      };
      logConfiguration: LogConfiguration & {
        logDriver: LogDriver;
        secretOptions: (Secret & { name: string; valueFrom: string })[];
      };
      secrets: (Secret & { name: string; valueFrom: string })[];
      ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
      repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
    };
    nodeProperties: NodeProperties & {
      numNodes: number;
      mainNode: number;
      nodeRangeProperties: (NodeRangeProperty & {
        targetNodes: string;
        container: ContainerProperties & {
          volumes: (Volume & {
            efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
            s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
          })[];
          ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
          resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          secrets: (Secret & { name: string; valueFrom: string })[];
          ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
          repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
        };
        ecsProperties: EcsProperties & {
          taskProperties: (EcsTaskProperties & {
            containers: (TaskContainerProperties & {
              image: string;
              firelensConfiguration: FirelensConfiguration & { type: FirelensConfigurationType };
              linuxParameters: LinuxParameters & {
                devices: (Device & { hostPath: string })[];
                tmpfs: (Tmpfs & { containerPath: string; size: number })[];
              };
              logConfiguration: LogConfiguration & {
                logDriver: LogDriver;
                secretOptions: (Secret & { name: string; valueFrom: string })[];
              };
              repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
              resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
              secrets: (Secret & { name: string; valueFrom: string })[];
              ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
            })[];
            ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
            volumes: (Volume & {
              efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
              s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
            })[];
          })[];
        };
        eksProperties: EksProperties & {
          podProperties: EksPodProperties & {
            imagePullSecrets: (ImagePullSecret & { name: string })[];
            containers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            initContainers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            volumes: (EksVolume & {
              name: string;
              secret: EksSecret & { secretName: string };
              persistentVolumeClaim: EksPersistentVolumeClaim & { claimName: string };
            })[];
          };
        };
      })[];
    };
    ecsProperties: EcsProperties & {
      taskProperties: (EcsTaskProperties & {
        containers: (TaskContainerProperties & {
          image: string;
          firelensConfiguration: FirelensConfiguration & { type: FirelensConfigurationType };
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
          resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
          secrets: (Secret & { name: string; valueFrom: string })[];
          ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
        })[];
        ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
        volumes: (Volume & {
          efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
          s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
        })[];
      })[];
    };
    eksProperties: EksProperties & {
      podProperties: EksPodProperties & {
        imagePullSecrets: (ImagePullSecret & { name: string })[];
        containers: (EksContainer & {
          image: string;
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        initContainers: (EksContainer & {
          image: string;
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        volumes: (EksVolume & {
          name: string;
          secret: EksSecret & { secretName: string };
          persistentVolumeClaim: EksPersistentVolumeClaim & { claimName: string };
        })[];
      };
    };
  })[];
  nextToken?: string;
}
export interface DescribeJobQueuesRequest {
  jobQueues?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type JQStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "VALID"
  | "INVALID"
  | (string & {});
export interface JobQueueDetail {
  jobQueueName?: string;
  jobQueueArn?: string;
  state?: JQState;
  schedulingPolicyArn?: string;
  status?: JQStatus;
  statusReason?: string;
  priority?: number;
  computeEnvironmentOrder?: ComputeEnvironmentOrder[];
  serviceEnvironmentOrder?: ServiceEnvironmentOrder[];
  jobQueueType?: JobQueueType;
  tags?: { [key: string]: string | undefined };
  jobStateTimeLimitActions?: JobStateTimeLimitAction[];
}
export type JobQueueDetailList = JobQueueDetail[];
export interface DescribeJobQueuesResponse {
  jobQueues?: (JobQueueDetail & {
    jobQueueName: string;
    jobQueueArn: string;
    state: JQState;
    priority: number;
    computeEnvironmentOrder: (ComputeEnvironmentOrder & {
      order: number;
      computeEnvironment: string;
    })[];
    serviceEnvironmentOrder: (ServiceEnvironmentOrder & {
      order: number;
      serviceEnvironment: string;
    })[];
    jobStateTimeLimitActions: (JobStateTimeLimitAction & {
      reason: string;
      state: JobStateTimeLimitActionsState;
      maxTimeSeconds: number;
      action: JobStateTimeLimitActionsAction;
    })[];
  })[];
  nextToken?: string;
}
export interface DescribeJobsRequest {
  jobs?: string[];
}
export type JobStatus =
  | "SUBMITTED"
  | "PENDING"
  | "RUNNABLE"
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface NetworkInterface {
  attachmentId?: string;
  ipv6Address?: string;
  privateIpv4Address?: string;
}
export type NetworkInterfaceList = NetworkInterface[];
export interface AttemptContainerDetail {
  containerInstanceArn?: string;
  taskArn?: string;
  exitCode?: number;
  reason?: string;
  logStreamName?: string;
  networkInterfaces?: NetworkInterface[];
}
export interface AttemptTaskContainerDetails {
  exitCode?: number;
  name?: string;
  reason?: string;
  logStreamName?: string;
  networkInterfaces?: NetworkInterface[];
}
export type ListAttemptTaskContainerDetails = AttemptTaskContainerDetails[];
export interface AttemptEcsTaskDetails {
  containerInstanceArn?: string;
  taskArn?: string;
  containers?: AttemptTaskContainerDetails[];
}
export type ListAttemptEcsTaskDetails = AttemptEcsTaskDetails[];
export interface AttemptDetail {
  container?: AttemptContainerDetail;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
  taskProperties?: AttemptEcsTaskDetails[];
}
export type AttemptDetails = AttemptDetail[];
export type ArrayJobDependency = "N_TO_N" | "SEQUENTIAL" | (string & {});
export interface JobDependency {
  jobId?: string;
  type?: ArrayJobDependency;
}
export type JobDependencyList = JobDependency[];
export interface ContainerDetail {
  image?: string;
  vcpus?: number;
  memory?: number;
  command?: string[];
  jobRoleArn?: string;
  executionRoleArn?: string;
  volumes?: Volume[];
  environment?: KeyValuePair[];
  mountPoints?: MountPoint[];
  readonlyRootFilesystem?: boolean;
  ulimits?: Ulimit[];
  privileged?: boolean;
  user?: string;
  exitCode?: number;
  reason?: string;
  containerInstanceArn?: string;
  taskArn?: string;
  logStreamName?: string;
  instanceType?: string;
  networkInterfaces?: NetworkInterface[];
  resourceRequirements?: ResourceRequirement[];
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  secrets?: Secret[];
  networkConfiguration?: NetworkConfiguration;
  fargatePlatformConfiguration?: FargatePlatformConfiguration;
  ephemeralStorage?: EphemeralStorage;
  runtimePlatform?: RuntimePlatform;
  repositoryCredentials?: RepositoryCredentials;
  enableExecuteCommand?: boolean;
}
export interface NodeDetails {
  nodeIndex?: number;
  isMainNode?: boolean;
}
export type ArrayJobStatusSummary = { [key: string]: number | undefined };
export interface ArrayPropertiesDetail {
  statusSummary?: { [key: string]: number | undefined };
  statusSummaryLastUpdatedAt?: number;
  size?: number;
  index?: number;
}
export interface EksContainerDetail {
  name?: string;
  image?: string;
  imagePullPolicy?: string;
  command?: string[];
  args?: string[];
  env?: EksContainerEnvironmentVariable[];
  resources?: EksContainerResourceRequirements;
  exitCode?: number;
  reason?: string;
  volumeMounts?: EksContainerVolumeMount[];
  securityContext?: EksContainerSecurityContext;
}
export type EksContainerDetails = EksContainerDetail[];
export interface EksPodPropertiesDetail {
  serviceAccountName?: string;
  hostNetwork?: boolean;
  dnsPolicy?: string;
  imagePullSecrets?: ImagePullSecret[];
  containers?: EksContainerDetail[];
  initContainers?: EksContainerDetail[];
  volumes?: EksVolume[];
  podName?: string;
  nodeName?: string;
  metadata?: EksMetadata;
  shareProcessNamespace?: boolean;
}
export interface EksPropertiesDetail {
  podProperties?: EksPodPropertiesDetail;
}
export interface EksAttemptContainerDetail {
  name?: string;
  containerID?: string;
  exitCode?: number;
  reason?: string;
}
export type EksAttemptContainerDetails = EksAttemptContainerDetail[];
export interface EksAttemptDetail {
  containers?: EksAttemptContainerDetail[];
  initContainers?: EksAttemptContainerDetail[];
  eksClusterArn?: string;
  podName?: string;
  podNamespace?: string;
  nodeName?: string;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
}
export type EksAttemptDetails = EksAttemptDetail[];
export interface TaskContainerDetails {
  command?: string[];
  dependsOn?: TaskContainerDependency[];
  environment?: KeyValuePair[];
  essential?: boolean;
  firelensConfiguration?: FirelensConfiguration;
  image?: string;
  linuxParameters?: LinuxParameters;
  logConfiguration?: LogConfiguration;
  mountPoints?: MountPoint[];
  name?: string;
  privileged?: boolean;
  readonlyRootFilesystem?: boolean;
  repositoryCredentials?: RepositoryCredentials;
  resourceRequirements?: ResourceRequirement[];
  secrets?: Secret[];
  ulimits?: Ulimit[];
  user?: string;
  startTimeout?: number;
  stopTimeout?: number;
  exitCode?: number;
  reason?: string;
  logStreamName?: string;
  networkInterfaces?: NetworkInterface[];
}
export type ListTaskContainerDetails = TaskContainerDetails[];
export interface EcsTaskDetails {
  containers?: TaskContainerDetails[];
  containerInstanceArn?: string;
  taskArn?: string;
  ephemeralStorage?: EphemeralStorage;
  executionRoleArn?: string;
  platformVersion?: string;
  ipcMode?: string;
  taskRoleArn?: string;
  pidMode?: string;
  networkConfiguration?: NetworkConfiguration;
  runtimePlatform?: RuntimePlatform;
  volumes?: Volume[];
  enableExecuteCommand?: boolean;
  networkMode?: string;
}
export type ListEcsTaskDetails = EcsTaskDetails[];
export interface EcsPropertiesDetail {
  taskProperties?: EcsTaskDetails[];
}
export interface JobDetail {
  jobArn?: string;
  jobName?: string;
  jobId?: string;
  jobQueue?: string;
  status?: JobStatus;
  shareIdentifier?: string;
  schedulingPriority?: number;
  attempts?: AttemptDetail[];
  statusReason?: string;
  createdAt?: number;
  retryStrategy?: RetryStrategy;
  startedAt?: number;
  stoppedAt?: number;
  dependsOn?: JobDependency[];
  jobDefinition?: string;
  parameters?: { [key: string]: string | undefined };
  container?: ContainerDetail;
  nodeDetails?: NodeDetails;
  nodeProperties?: NodeProperties;
  arrayProperties?: ArrayPropertiesDetail;
  timeout?: JobTimeout;
  tags?: { [key: string]: string | undefined };
  propagateTags?: boolean;
  platformCapabilities?: PlatformCapability[];
  eksProperties?: EksPropertiesDetail;
  eksAttempts?: EksAttemptDetail[];
  ecsProperties?: EcsPropertiesDetail;
  isCancelled?: boolean;
  isTerminated?: boolean;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export type JobDetailList = JobDetail[];
export interface DescribeJobsResponse {
  jobs?: (JobDetail & {
    jobName: string;
    jobId: string;
    jobQueue: string;
    status: JobStatus;
    startedAt: number;
    jobDefinition: string;
    retryStrategy: RetryStrategy & { evaluateOnExit: (EvaluateOnExit & { action: RetryAction })[] };
    container: ContainerDetail & {
      volumes: (Volume & {
        efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
        s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
      })[];
      ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
      resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
      linuxParameters: LinuxParameters & {
        devices: (Device & { hostPath: string })[];
        tmpfs: (Tmpfs & { containerPath: string; size: number })[];
      };
      logConfiguration: LogConfiguration & {
        logDriver: LogDriver;
        secretOptions: (Secret & { name: string; valueFrom: string })[];
      };
      secrets: (Secret & { name: string; valueFrom: string })[];
      ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
      repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
    };
    nodeProperties: NodeProperties & {
      numNodes: number;
      mainNode: number;
      nodeRangeProperties: (NodeRangeProperty & {
        targetNodes: string;
        container: ContainerProperties & {
          volumes: (Volume & {
            efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
            s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
          })[];
          ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
          resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          secrets: (Secret & { name: string; valueFrom: string })[];
          ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
          repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
        };
        ecsProperties: EcsProperties & {
          taskProperties: (EcsTaskProperties & {
            containers: (TaskContainerProperties & {
              image: string;
              firelensConfiguration: FirelensConfiguration & { type: FirelensConfigurationType };
              linuxParameters: LinuxParameters & {
                devices: (Device & { hostPath: string })[];
                tmpfs: (Tmpfs & { containerPath: string; size: number })[];
              };
              logConfiguration: LogConfiguration & {
                logDriver: LogDriver;
                secretOptions: (Secret & { name: string; valueFrom: string })[];
              };
              repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
              resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
              secrets: (Secret & { name: string; valueFrom: string })[];
              ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
            })[];
            ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
            volumes: (Volume & {
              efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
              s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
            })[];
          })[];
        };
        eksProperties: EksProperties & {
          podProperties: EksPodProperties & {
            imagePullSecrets: (ImagePullSecret & { name: string })[];
            containers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            initContainers: (EksContainer & {
              image: string;
              env: (EksContainerEnvironmentVariable & { name: string })[];
            })[];
            volumes: (EksVolume & {
              name: string;
              secret: EksSecret & { secretName: string };
              persistentVolumeClaim: EksPersistentVolumeClaim & { claimName: string };
            })[];
          };
        };
      })[];
    };
    eksProperties: EksPropertiesDetail & {
      podProperties: EksPodPropertiesDetail & {
        imagePullSecrets: (ImagePullSecret & { name: string })[];
        containers: (EksContainerDetail & {
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        initContainers: (EksContainerDetail & {
          env: (EksContainerEnvironmentVariable & { name: string })[];
        })[];
        volumes: (EksVolume & {
          name: string;
          secret: EksSecret & { secretName: string };
          persistentVolumeClaim: EksPersistentVolumeClaim & { claimName: string };
        })[];
      };
    };
    ecsProperties: EcsPropertiesDetail & {
      taskProperties: (EcsTaskDetails & {
        containers: (TaskContainerDetails & {
          firelensConfiguration: FirelensConfiguration & { type: FirelensConfigurationType };
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          repositoryCredentials: RepositoryCredentials & { credentialsParameter: string };
          resourceRequirements: (ResourceRequirement & { value: string; type: ResourceType })[];
          secrets: (Secret & { name: string; valueFrom: string })[];
          ulimits: (Ulimit & { hardLimit: number; name: string; softLimit: number })[];
        })[];
        ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
        volumes: (Volume & {
          efsVolumeConfiguration: EFSVolumeConfiguration & { fileSystemId: string };
          s3filesVolumeConfiguration: S3FilesVolumeConfiguration & { fileSystemArn: string };
        })[];
      })[];
    };
  })[];
}
export interface DescribeQuotaShareRequest {
  quotaShareArn?: string;
}
export type QuotaShareStatus =
  | "CREATING"
  | "VALID"
  | "INVALID"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export interface DescribeQuotaShareResponse {
  quotaShareName?: string;
  quotaShareArn?: string;
  jobQueueArn?: string;
  capacityLimits?: (QuotaShareCapacityLimit & { maxCapacity: number; capacityUnit: string })[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration & {
    strategy: QuotaShareResourceSharingStrategy;
  };
  preemptionConfiguration?: QuotaSharePreemptionConfiguration & {
    inSharePreemption: QuotaShareInSharePreemptionState;
  };
  state?: QuotaShareState;
  status?: QuotaShareStatus;
  tags?: { [key: string]: string | undefined };
}
export interface DescribeSchedulingPoliciesRequest {
  arns?: string[];
}
export interface SchedulingPolicyDetail {
  name?: string;
  arn?: string;
  quotaSharePolicy?: QuotaSharePolicy;
  fairsharePolicy?: FairsharePolicy;
  tags?: { [key: string]: string | undefined };
}
export type SchedulingPolicyDetailList = SchedulingPolicyDetail[];
export interface DescribeSchedulingPoliciesResponse {
  schedulingPolicies?: (SchedulingPolicyDetail & {
    name: string;
    arn: string;
    quotaSharePolicy: QuotaSharePolicy & {
      idleResourceAssignmentStrategy: QuotaShareIdleResourceAssignmentStrategy;
    };
    fairsharePolicy: FairsharePolicy & {
      shareDistribution: (ShareAttributes & { shareIdentifier: string })[];
    };
  })[];
}
export interface DescribeServiceEnvironmentsRequest {
  serviceEnvironments?: string[];
  maxResults?: number;
  nextToken?: string;
}
export type ServiceEnvironmentStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "VALID"
  | "INVALID"
  | (string & {});
export interface ServiceEnvironmentDetail {
  serviceEnvironmentName?: string;
  serviceEnvironmentArn?: string;
  serviceEnvironmentType?: ServiceEnvironmentType;
  state?: ServiceEnvironmentState;
  status?: ServiceEnvironmentStatus;
  capacityLimits?: CapacityLimit[];
  tags?: { [key: string]: string | undefined };
}
export type ServiceEnvironmentDetailList = ServiceEnvironmentDetail[];
export interface DescribeServiceEnvironmentsResponse {
  serviceEnvironments?: (ServiceEnvironmentDetail & {
    serviceEnvironmentName: string;
    serviceEnvironmentArn: string;
    serviceEnvironmentType: ServiceEnvironmentType;
    capacityLimits: CapacityLimits;
  })[];
  nextToken?: string;
}
export interface DescribeServiceJobRequest {
  jobId?: string;
}
export type ServiceResourceIdName = "TrainingJobArn" | (string & {});
export interface ServiceResourceId {
  name?: ServiceResourceIdName;
  value?: string;
}
export interface ServiceJobAttemptDetail {
  serviceResourceId?: ServiceResourceId;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
}
export type ServiceJobAttemptDetails = ServiceJobAttemptDetail[];
export interface ServiceJobCapacityUsageDetail {
  capacityUnit?: string;
  quantity?: number;
}
export type ServiceJobCapacityUsageDetailList = ServiceJobCapacityUsageDetail[];
export interface LatestServiceJobAttempt {
  serviceResourceId?: ServiceResourceId;
}
export type ServiceJobRetryAction = "RETRY" | "EXIT" | (string & {});
export interface ServiceJobEvaluateOnExit {
  action?: ServiceJobRetryAction;
  onStatusReason?: string;
}
export type ServiceJobEvaluateOnExitList = ServiceJobEvaluateOnExit[];
export interface ServiceJobRetryStrategy {
  attempts?: number;
  evaluateOnExit?: ServiceJobEvaluateOnExit[];
}
export type ServiceJobType = "SAGEMAKER_TRAINING" | (string & {});
export interface ServiceJobPreemptionConfiguration {
  preemptionRetriesBeforeTermination?: number;
}
export interface ServiceJobPreemptedAttempt {
  serviceResourceId?: ServiceResourceId;
  startedAt?: number;
  stoppedAt?: number;
  statusReason?: string;
}
export type ServiceJobRecentPreemptedAttemptList = ServiceJobPreemptedAttempt[];
export interface ServiceJobPreemptionSummary {
  preemptedAttemptCount?: number;
  recentPreemptedAttempts?: ServiceJobPreemptedAttempt[];
}
export type ServiceJobStatus =
  | "SUBMITTED"
  | "PENDING"
  | "RUNNABLE"
  | "SCHEDULED"
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export interface ServiceJobTimeout {
  attemptDurationSeconds?: number;
}
export interface DescribeServiceJobResponse {
  attempts?: (ServiceJobAttemptDetail & {
    serviceResourceId: ServiceResourceId & { name: ServiceResourceIdName; value: string };
  })[];
  capacityUsage?: ServiceJobCapacityUsageDetail[];
  createdAt?: number;
  isTerminated?: boolean;
  jobArn?: string;
  jobId: string;
  jobName: string;
  jobQueue: string;
  latestAttempt?: LatestServiceJobAttempt & {
    serviceResourceId: ServiceResourceId & { name: ServiceResourceIdName; value: string };
  };
  retryStrategy?: ServiceJobRetryStrategy & { attempts: number };
  scheduledAt?: number;
  schedulingPriority?: number;
  serviceRequestPayload?: string;
  serviceJobType: ServiceJobType;
  shareIdentifier?: string;
  quotaShareName?: string;
  preemptionConfiguration?: ServiceJobPreemptionConfiguration;
  preemptionSummary?: ServiceJobPreemptionSummary & {
    recentPreemptedAttempts: (ServiceJobPreemptedAttempt & {
      serviceResourceId: ServiceResourceId & { name: ServiceResourceIdName; value: string };
    })[];
  };
  startedAt: number;
  status: ServiceJobStatus;
  statusReason?: string;
  stoppedAt?: number;
  tags?: { [key: string]: string | undefined };
  timeoutConfig?: ServiceJobTimeout;
}
export interface GetJobQueueSnapshotRequest {
  jobQueue?: string;
}
export interface FrontOfQueueJobSummary {
  jobArn?: string;
  earliestTimeAtPosition?: number;
}
export type FrontOfQueueJobSummaryList = FrontOfQueueJobSummary[];
export interface FrontOfQueueDetail {
  jobs?: FrontOfQueueJobSummary[];
  lastUpdatedAt?: number;
}
export interface FrontOfQuotaShareJobSummary {
  jobArn?: string;
  earliestTimeAtPosition?: number;
}
export type FrontOfQuotaShareJobSummaryList = FrontOfQuotaShareJobSummary[];
export type FrontOfQuotaSharesJobSummaryMap = {
  [key: string]: FrontOfQuotaShareJobSummary[] | undefined;
};
export interface FrontOfQuotaSharesDetail {
  quotaShares?: { [key: string]: FrontOfQuotaShareJobSummary[] | undefined };
  lastUpdatedAt?: number;
}
export interface QueueSnapshotCapacityUsage {
  capacityUnit?: string;
  quantity?: number;
}
export type QueueSnapshotCapacityUsageList = QueueSnapshotCapacityUsage[];
export interface FairshareCapacityUsage {
  capacityUnit?: string;
  quantity?: number;
}
export type FairshareCapacityUsageList = FairshareCapacityUsage[];
export interface FairshareCapacityUtilization {
  shareIdentifier?: string;
  capacityUsage?: FairshareCapacityUsage[];
}
export type FairshareCapacityUtilizationList = FairshareCapacityUtilization[];
export interface FairshareUtilizationDetail {
  activeShareCount?: number;
  topCapacityUtilization?: FairshareCapacityUtilization[];
}
export interface QuotaShareCapacityUsage {
  capacityUnit?: string;
  quantity?: number;
}
export type QuotaShareCapacityUsageList = QuotaShareCapacityUsage[];
export interface QuotaShareCapacityUtilization {
  quotaShareName?: string;
  capacityUsage?: QuotaShareCapacityUsage[];
}
export type QuotaShareCapacityUtilizationList = QuotaShareCapacityUtilization[];
export interface QuotaShareUtilizationDetail {
  topCapacityUtilization?: QuotaShareCapacityUtilization[];
}
export interface QueueSnapshotUtilizationDetail {
  totalCapacityUsage?: QueueSnapshotCapacityUsage[];
  fairshareUtilization?: FairshareUtilizationDetail;
  quotaShareUtilization?: QuotaShareUtilizationDetail;
  lastUpdatedAt?: number;
}
export interface GetJobQueueSnapshotResponse {
  frontOfQueue?: FrontOfQueueDetail;
  frontOfQuotaShares?: FrontOfQuotaSharesDetail;
  queueUtilization?: QueueSnapshotUtilizationDetail;
}
export interface KeyValuesPair {
  name?: string;
  values?: string[];
}
export type ListConsumableResourcesFilterList = KeyValuesPair[];
export interface ListConsumableResourcesRequest {
  filters?: KeyValuesPair[];
  maxResults?: number;
  nextToken?: string;
}
export interface ConsumableResourceSummary {
  consumableResourceArn?: string;
  consumableResourceName?: string;
  totalQuantity?: number;
  inUseQuantity?: number;
  resourceType?: string;
}
export type ConsumableResourceSummaryList = ConsumableResourceSummary[];
export interface ListConsumableResourcesResponse {
  consumableResources: (ConsumableResourceSummary & {
    consumableResourceArn: string;
    consumableResourceName: string;
  })[];
  nextToken?: string;
}
export type ListJobsFilterList = KeyValuesPair[];
export interface ListJobsRequest {
  jobQueue?: string;
  arrayJobId?: string;
  multiNodeJobId?: string;
  jobStatus?: JobStatus;
  maxResults?: number;
  nextToken?: string;
  filters?: KeyValuesPair[];
}
export interface JobCapacityUsageSummary {
  capacityUnit?: string;
  quantity?: number;
}
export type JobCapacityUsageSummaryList = JobCapacityUsageSummary[];
export interface ContainerSummary {
  exitCode?: number;
  reason?: string;
}
export interface ArrayPropertiesSummary {
  size?: number;
  index?: number;
  statusSummary?: { [key: string]: number | undefined };
  statusSummaryLastUpdatedAt?: number;
}
export interface NodePropertiesSummary {
  isMainNode?: boolean;
  numNodes?: number;
  nodeIndex?: number;
}
export interface JobSummary {
  jobArn?: string;
  jobId?: string;
  jobName?: string;
  capacityUsage?: JobCapacityUsageSummary[];
  createdAt?: number;
  scheduledAt?: number;
  shareIdentifier?: string;
  status?: JobStatus;
  statusReason?: string;
  startedAt?: number;
  stoppedAt?: number;
  container?: ContainerSummary;
  arrayProperties?: ArrayPropertiesSummary;
  nodeProperties?: NodePropertiesSummary;
  jobDefinition?: string;
  isCancelled?: boolean;
  isTerminated?: boolean;
}
export type JobSummaryList = JobSummary[];
export interface ListJobsResponse {
  jobSummaryList: (JobSummary & { jobId: string; jobName: string })[];
  nextToken?: string;
}
export type ListJobsByConsumableResourceFilterList = KeyValuesPair[];
export interface ListJobsByConsumableResourceRequest {
  consumableResource?: string;
  filters?: KeyValuesPair[];
  maxResults?: number;
  nextToken?: string;
}
export interface ListJobsByConsumableResourceSummary {
  jobArn?: string;
  jobQueueArn?: string;
  jobName?: string;
  jobDefinitionArn?: string;
  shareIdentifier?: string;
  jobStatus?: string;
  quantity?: number;
  statusReason?: string;
  startedAt?: number;
  createdAt?: number;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export type ListJobsByConsumableResourceSummaryList = ListJobsByConsumableResourceSummary[];
export interface ListJobsByConsumableResourceResponse {
  jobs: (ListJobsByConsumableResourceSummary & {
    jobArn: string;
    jobQueueArn: string;
    jobName: string;
    jobStatus: string;
    quantity: number;
    createdAt: number;
    consumableResourceProperties: ConsumableResourceProperties;
  })[];
  nextToken?: string;
}
export interface ListQuotaSharesRequest {
  jobQueue?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface QuotaShareDetail {
  quotaShareName?: string;
  quotaShareArn?: string;
  jobQueueArn?: string;
  capacityLimits?: QuotaShareCapacityLimit[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration;
  preemptionConfiguration?: QuotaSharePreemptionConfiguration;
  state?: QuotaShareState;
  status?: QuotaShareStatus;
}
export type QuotaShareList = QuotaShareDetail[];
export interface ListQuotaSharesResponse {
  quotaShares?: (QuotaShareDetail & {
    capacityLimits: (QuotaShareCapacityLimit & { maxCapacity: number; capacityUnit: string })[];
    resourceSharingConfiguration: QuotaShareResourceSharingConfiguration & {
      strategy: QuotaShareResourceSharingStrategy;
    };
    preemptionConfiguration: QuotaSharePreemptionConfiguration & {
      inSharePreemption: QuotaShareInSharePreemptionState;
    };
  })[];
  nextToken?: string;
}
export interface ListSchedulingPoliciesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface SchedulingPolicyListingDetail {
  arn?: string;
}
export type SchedulingPolicyListingDetailList = SchedulingPolicyListingDetail[];
export interface ListSchedulingPoliciesResponse {
  schedulingPolicies?: (SchedulingPolicyListingDetail & { arn: string })[];
  nextToken?: string;
}
export interface ListServiceJobsRequest {
  jobQueue?: string;
  jobStatus?: ServiceJobStatus;
  maxResults?: number;
  nextToken?: string;
  filters?: KeyValuesPair[];
}
export interface ServiceJobCapacityUsageSummary {
  capacityUnit?: string;
  quantity?: number;
}
export type ServiceJobCapacityUsageSummaryList = ServiceJobCapacityUsageSummary[];
export interface ServiceJobSummary {
  latestAttempt?: LatestServiceJobAttempt;
  capacityUsage?: ServiceJobCapacityUsageSummary[];
  createdAt?: number;
  jobArn?: string;
  jobId?: string;
  jobName?: string;
  scheduledAt?: number;
  serviceJobType?: ServiceJobType;
  shareIdentifier?: string;
  quotaShareName?: string;
  status?: ServiceJobStatus;
  statusReason?: string;
  startedAt?: number;
  stoppedAt?: number;
  isTerminated?: boolean;
}
export type ServiceJobSummaryList = ServiceJobSummary[];
export interface ListServiceJobsResponse {
  jobSummaryList: (ServiceJobSummary & {
    jobId: string;
    jobName: string;
    serviceJobType: ServiceJobType;
    latestAttempt: LatestServiceJobAttempt & {
      serviceResourceId: ServiceResourceId & { name: ServiceResourceIdName; value: string };
    };
  })[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type JobDefinitionType = "container" | "multinode" | (string & {});
export interface RegisterJobDefinitionRequest {
  jobDefinitionName?: string;
  type?: JobDefinitionType;
  parameters?: { [key: string]: string | undefined };
  schedulingPriority?: number;
  containerProperties?: ContainerProperties;
  nodeProperties?: NodeProperties;
  retryStrategy?: RetryStrategy;
  propagateTags?: boolean;
  timeout?: JobTimeout;
  tags?: { [key: string]: string | undefined };
  platformCapabilities?: PlatformCapability[];
  eksProperties?: EksProperties;
  ecsProperties?: EcsProperties;
  consumableResourceProperties?: ConsumableResourceProperties;
}
export interface RegisterJobDefinitionResponse {
  jobDefinitionName: string;
  jobDefinitionArn: string;
  revision: number;
}
export interface ArrayProperties {
  size?: number;
}
export interface ContainerOverrides {
  vcpus?: number;
  memory?: number;
  command?: string[];
  instanceType?: string;
  environment?: KeyValuePair[];
  resourceRequirements?: ResourceRequirement[];
}
export interface TaskContainerOverrides {
  command?: string[];
  environment?: KeyValuePair[];
  name?: string;
  resourceRequirements?: ResourceRequirement[];
}
export type ListTaskContainerOverrides = TaskContainerOverrides[];
export interface TaskPropertiesOverride {
  containers?: TaskContainerOverrides[];
}
export type ListTaskPropertiesOverride = TaskPropertiesOverride[];
export interface EcsPropertiesOverride {
  taskProperties?: TaskPropertiesOverride[];
}
export interface EksContainerOverride {
  name?: string;
  image?: string;
  command?: string[];
  args?: string[];
  env?: EksContainerEnvironmentVariable[];
  resources?: EksContainerResourceRequirements;
}
export type EksContainerOverrideList = EksContainerOverride[];
export interface EksPodPropertiesOverride {
  containers?: EksContainerOverride[];
  initContainers?: EksContainerOverride[];
  metadata?: EksMetadata;
}
export interface EksPropertiesOverride {
  podProperties?: EksPodPropertiesOverride;
}
export interface NodePropertyOverride {
  targetNodes?: string;
  containerOverrides?: ContainerOverrides;
  ecsPropertiesOverride?: EcsPropertiesOverride;
  instanceTypes?: string[];
  eksPropertiesOverride?: EksPropertiesOverride;
  consumableResourcePropertiesOverride?: ConsumableResourceProperties;
}
export type NodePropertyOverrides = NodePropertyOverride[];
export interface NodeOverrides {
  numNodes?: number;
  nodePropertyOverrides?: NodePropertyOverride[];
}
export interface SubmitJobRequest {
  jobName?: string;
  jobQueue?: string;
  shareIdentifier?: string;
  schedulingPriorityOverride?: number;
  arrayProperties?: ArrayProperties;
  dependsOn?: JobDependency[];
  jobDefinition?: string;
  parameters?: { [key: string]: string | undefined };
  containerOverrides?: ContainerOverrides;
  nodeOverrides?: NodeOverrides;
  retryStrategy?: RetryStrategy;
  propagateTags?: boolean;
  timeout?: JobTimeout;
  tags?: { [key: string]: string | undefined };
  eksPropertiesOverride?: EksPropertiesOverride;
  ecsPropertiesOverride?: EcsPropertiesOverride;
  consumableResourcePropertiesOverride?: ConsumableResourceProperties;
}
export interface SubmitJobResponse {
  jobArn?: string;
  jobName: string;
  jobId: string;
}
export type ClientRequestToken = string;
export interface SubmitServiceJobRequest {
  jobName?: string;
  jobQueue?: string;
  retryStrategy?: ServiceJobRetryStrategy;
  schedulingPriority?: number;
  serviceRequestPayload?: string;
  serviceJobType?: ServiceJobType;
  shareIdentifier?: string;
  quotaShareName?: string;
  preemptionConfiguration?: ServiceJobPreemptionConfiguration;
  timeoutConfig?: ServiceJobTimeout;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface SubmitServiceJobResponse {
  jobArn?: string;
  jobName: string;
  jobId: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export interface TerminateJobRequest {
  jobId?: string;
  reason?: string;
}
export interface TerminateJobResponse {}
export interface TerminateJobsRequest {
  jobs?: string[];
  reason?: string;
}
export interface TerminateJobsErrorDetail {
  job?: string;
  code?: string;
  message?: string;
}
export type TerminateJobsErrorDetailList = TerminateJobsErrorDetail[];
export interface TerminateJobsResponse {
  successful: string[];
  errors: (TerminateJobsErrorDetail & { job: string; code: string; message: string })[];
}
export interface TerminateServiceJobRequest {
  jobId?: string;
  reason?: string;
}
export interface TerminateServiceJobResponse {}
export interface TerminateServiceJobsRequest {
  jobs?: string[];
  reason?: string;
}
export interface TerminateServiceJobsErrorDetail {
  job?: string;
  code?: string;
  message?: string;
}
export type TerminateServiceJobsErrorDetailList = TerminateServiceJobsErrorDetail[];
export interface TerminateServiceJobsResponse {
  successful: string[];
  errors: (TerminateServiceJobsErrorDetail & { job: string; code: string; message: string })[];
}
export type TagKeysList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys?: string[];
}
export interface UntagResourceResponse {}
export type CRUpdateAllocationStrategy =
  | "BEST_FIT_PROGRESSIVE"
  | "BEST_FIT_PROGRESSIVE_ORDERED"
  | "SPOT_CAPACITY_OPTIMIZED"
  | "SPOT_PRICE_CAPACITY_OPTIMIZED"
  | "SPOT_CAPACITY_OPTIMIZED_PRIORITIZED"
  | (string & {});
export interface InstanceLaunchTemplateUpdate {
  ec2InstanceProfileArn?: string;
  networkConfiguration?: ManagedInstancesNetworkConfiguration;
  instanceRequirements?: InstanceRequirementsRequest;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  monitoring?: string;
  capacityReservations?: CapacityReservationRequest;
  instanceMetadataTagsPropagation?: boolean;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
}
export interface UpdateManagedInstancesProviderConfiguration {
  propagateTags?: string;
  infrastructureRoleArn?: string;
  instanceLaunchTemplate?: InstanceLaunchTemplateUpdate;
  infrastructureOptimization?: InfrastructureOptimization;
}
export interface ComputeResourceUpdate {
  minvCpus?: number;
  maxvCpus?: number;
  desiredvCpus?: number;
  subnets?: string[];
  securityGroupIds?: string[];
  allocationStrategy?: CRUpdateAllocationStrategy;
  instanceTypes?: string[];
  ec2KeyPair?: string;
  instanceRole?: string;
  tags?: { [key: string]: string | undefined };
  placementGroup?: string;
  bidPercentage?: number;
  launchTemplate?: LaunchTemplateSpecification;
  ec2Configuration?: Ec2Configuration[];
  updateToLatestImageVersion?: boolean;
  type?: CRType;
  imageId?: string;
  scalingPolicy?: ComputeScalingPolicy;
  managedInstancesProvider?: UpdateManagedInstancesProviderConfiguration;
  capacityTags?: { [key: string]: string | undefined };
}
export interface EksConfigurationUpdate {
  accessEntry?: EksAccessEntry;
}
export interface UpdateComputeEnvironmentRequest {
  computeEnvironment?: string;
  state?: CEState;
  unmanagedvCpus?: number;
  computeResources?: ComputeResourceUpdate;
  serviceRole?: string;
  updatePolicy?: UpdatePolicy;
  context?: string;
  ecsSettings?: EcsSettings;
  eksConfiguration?: EksConfigurationUpdate;
}
export interface UpdateComputeEnvironmentResponse {
  computeEnvironmentName?: string;
  computeEnvironmentArn?: string;
}
export interface UpdateConsumableResourceRequest {
  consumableResource?: string;
  operation?: string;
  quantity?: number;
  clientToken?: string;
}
export interface UpdateConsumableResourceResponse {
  consumableResourceName: string;
  consumableResourceArn: string;
  totalQuantity?: number;
}
export interface UpdateJobQueueRequest {
  jobQueue?: string;
  state?: JQState;
  schedulingPolicyArn?: string;
  priority?: number;
  computeEnvironmentOrder?: ComputeEnvironmentOrder[];
  serviceEnvironmentOrder?: ServiceEnvironmentOrder[];
  jobStateTimeLimitActions?: JobStateTimeLimitAction[];
}
export interface UpdateJobQueueResponse {
  jobQueueName?: string;
  jobQueueArn?: string;
}
export interface UpdateQuotaShareRequest {
  quotaShareArn?: string;
  capacityLimits?: QuotaShareCapacityLimit[];
  resourceSharingConfiguration?: QuotaShareResourceSharingConfiguration;
  preemptionConfiguration?: QuotaSharePreemptionConfiguration;
  state?: QuotaShareState;
}
export interface UpdateQuotaShareResponse {
  quotaShareName?: string;
  quotaShareArn?: string;
}
export interface UpdateSchedulingPolicyRequest {
  arn?: string;
  quotaSharePolicy?: QuotaSharePolicy;
  fairsharePolicy?: FairsharePolicy;
}
export interface UpdateSchedulingPolicyResponse {}
export interface UpdateServiceEnvironmentRequest {
  serviceEnvironment?: string;
  state?: ServiceEnvironmentState;
  capacityLimits?: CapacityLimit[];
}
export interface UpdateServiceEnvironmentResponse {
  serviceEnvironmentName: string;
  serviceEnvironmentArn: string;
}
export interface UpdateServiceJobRequest {
  jobId?: string;
  schedulingPriority?: number;
}
export interface UpdateServiceJobResponse {
  jobArn?: string;
  jobName?: string;
  jobId?: string;
}
export type CancelJobError = ClientException | ServerException | CommonErrors;
/**
 * Cancels a job in an Batch job queue. Jobs that are in a `SUBMITTED`, `PENDING`, or `RUNNABLE` state are cancelled and the job status is updated to `FAILED`.
 *
 * A `PENDING` job is cancelled after all dependency jobs are completed.
 * Therefore, it might take longer than expected to cancel a job in `PENDING`
 * status.
 *
 * When you try to cancel an array parent job in `PENDING`, Batch attempts to
 * cancel all child jobs. The array parent job is cancelled when all child jobs are
 * completed.
 *
 * Jobs that progressed to the `STARTING` or
 * `RUNNING` state aren't cancelled. However, the API operation still succeeds, even
 * if no job is cancelled. These jobs must be terminated with the TerminateJob or
 * TerminateJobs operation.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<CancelJobRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<CancelJobResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CancelJobsError = ClientException | ServerException | CommonErrors;
/**
 * Cancels up to 50 jobs in an Batch job queue. This is a bulk version of CancelJob. Jobs that are in a
 * `SUBMITTED`, `PENDING`, or `RUNNABLE` state are cancelled
 * and the job status is updated to `FAILED`.
 *
 * A `PENDING` job is cancelled after all dependency jobs are completed.
 * Therefore, it might take longer than expected to cancel a job in `PENDING`
 * status.
 *
 * When you try to cancel an array parent job in `PENDING`, Batch attempts to
 * cancel all child jobs. The array parent job is cancelled when all child jobs are
 * completed.
 *
 * Jobs that progressed to the `STARTING` or `RUNNING` state aren't
 * cancelled. These jobs must be terminated with the TerminateJob or
 * TerminateJobs operation.
 *
 * Batch reports the result for each job individually in the response. Jobs that
 * were processed successfully are reported in the `successful` list. Jobs that
 * encountered errors are reported in the `errors` list. The response returns an
 * HTTP status code of `200` even when some jobs encountered errors, so check the
 * `errors` list. Jobs that can't be found are treated as successfully
 * processed.
 *
 * This operation requires `batch:CancelJob` permission for each job in the
 * request. There is no separate `batch:CancelJobs` IAM action. If a caller's IAM
 * policy grants `batch:CancelJob`, they can use both the singular
 * CancelJob and bulk `CancelJobs` operations.
 */
export const cancelJobs: API.OperationMethod<
  CancelJobsRequest,
  CancelJobsResponse,
  CancelJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelJobsRequest>,
  output: __S(66, __c2, 2) as any as S.Schema<CancelJobsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobs",
}));

export type CreateComputeEnvironmentError = ClientException | ServerException | CommonErrors;
/**
 * Creates an Batch compute environment. You can create `MANAGED` or
 * `UNMANAGED` compute environments. `MANAGED` compute environments can
 * use Amazon EC2 or Fargate resources. `UNMANAGED` compute environments can only use
 * EC2 resources.
 *
 * In a managed compute environment, Batch manages the capacity and instance types of the
 * compute resources within the environment. This is based on the compute resource specification
 * that you define or the launch template that you
 * specify when you create the compute environment. Either, you can choose to use EC2 On-Demand
 * Instances and EC2 Spot Instances. Or, you can use Fargate and Fargate Spot capacity in
 * your managed compute environment. You can optionally set a maximum price so that Spot
 * Instances only launch when the Spot Instance price is less than a specified percentage of the
 * On-Demand price.
 *
 * In an unmanaged compute environment, you can manage your own EC2 compute resources and
 * have flexibility with how you configure your compute resources. For example, you can use
 * custom AMIs. However, you must verify that each of your AMIs meet the Amazon ECS container instance
 * AMI specification. For more information, see container instance AMIs in the
 * *Amazon Elastic Container Service Developer Guide*. After you created your unmanaged compute environment,
 * you can use the DescribeComputeEnvironments operation to find the Amazon ECS
 * cluster that's associated with it. Then, launch your container instances into that Amazon ECS
 * cluster. For more information, see Launching an Amazon ECS container
 * instance in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Batch doesn't automatically upgrade the AMIs in a compute environment after it's
 * created. For more information on how to update a compute environment's AMI, see Updating compute environments in the *Batch User Guide*.
 */
export const createComputeEnvironment: API.OperationMethod<
  CreateComputeEnvironmentRequest,
  CreateComputeEnvironmentResponse,
  CreateComputeEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<CreateComputeEnvironmentRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<CreateComputeEnvironmentResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComputeEnvironment",
}));

export type CreateConsumableResourceError = ClientException | ServerException | CommonErrors;
/**
 * Creates an Batch consumable resource.
 */
export const createConsumableResource: API.OperationMethod<
  CreateConsumableResourceRequest,
  CreateConsumableResourceResponse,
  CreateConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<CreateConsumableResourceRequest>,
  output: __S(257, __c8, 1) as any as S.Schema<CreateConsumableResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConsumableResource",
}));

export type CreateJobQueueError =
  | ClientException
  | ServerException
  | ComputeEnvironmentNotValid
  | JobQueueAlreadyExists
  | CommonErrors;
/**
 * Creates an Batch job queue. When you create a job queue, you associate one or more
 * compute environments to the queue and assign an order of preference for the compute
 * environments.
 *
 * You also set a priority to the job queue that determines the order that the Batch
 * scheduler places jobs onto its associated compute environments. For example, if a compute
 * environment is associated with more than one job queue, the job queue with a higher priority
 * is given preference for scheduling jobs to that compute environment.
 */
export const createJobQueue: API.OperationMethod<
  CreateJobQueueRequest,
  CreateJobQueueResponse,
  CreateJobQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<CreateJobQueueRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<CreateJobQueueResponse>,
  errors: [ClientException, ServerException, ComputeEnvironmentNotValid, JobQueueAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobQueue",
}));

export type CreateQuotaShareError = ClientException | ServerException | CommonErrors;
/**
 * Creates an Batch quota share. Each quota share operates as a virtual queue with a configured compute capacity, resource sharing strategy, and borrow limits.
 */
export const createQuotaShare: API.OperationMethod<
  CreateQuotaShareRequest,
  CreateQuotaShareResponse,
  CreateQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<CreateQuotaShareRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<CreateQuotaShareResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuotaShare",
}));

export type CreateSchedulingPolicyError = ClientException | ServerException | CommonErrors;
/**
 * Creates an Batch scheduling policy.
 */
export const createSchedulingPolicy: API.OperationMethod<
  CreateSchedulingPolicyRequest,
  CreateSchedulingPolicyResponse,
  CreateSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<CreateSchedulingPolicyRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<CreateSchedulingPolicyResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchedulingPolicy",
}));

export type CreateServiceEnvironmentError = ClientException | ServerException | CommonErrors;
/**
 * Creates a service environment for running service jobs. Service environments define capacity limits for specific service types such as SageMaker Training jobs.
 */
export const createServiceEnvironment: API.OperationMethod<
  CreateServiceEnvironmentRequest,
  CreateServiceEnvironmentResponse,
  CreateServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<CreateServiceEnvironmentRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<CreateServiceEnvironmentResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceEnvironment",
}));

export type DeleteComputeEnvironmentError =
  | ClientException
  | ServerException
  | ComputeEnvironmentNotFound
  | ComputeEnvironmentInUse
  | ComputeEnvironmentBeingModified
  | CommonErrors;
/**
 * Deletes an Batch compute environment.
 *
 * Before you can delete a compute environment, you must set its state to
 * `DISABLED` with the UpdateComputeEnvironment API operation and
 * disassociate it from any job queues with the UpdateJobQueue API operation.
 * Compute environments that use Fargate resources must terminate all active jobs on that
 * compute environment before deleting the compute environment. If this isn't done, the compute
 * environment enters an invalid state.
 */
export const deleteComputeEnvironment: API.OperationMethod<
  DeleteComputeEnvironmentRequest,
  DeleteComputeEnvironmentResponse,
  DeleteComputeEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<DeleteComputeEnvironmentRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<DeleteComputeEnvironmentResponse>,
  errors: [
    ClientException,
    ServerException,
    ComputeEnvironmentNotFound,
    ComputeEnvironmentInUse,
    ComputeEnvironmentBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComputeEnvironment",
}));

export type DeleteConsumableResourceError = ClientException | ServerException | CommonErrors;
/**
 * Deletes the specified consumable resource.
 */
export const deleteConsumableResource: API.OperationMethod<
  DeleteConsumableResourceRequest,
  DeleteConsumableResourceResponse,
  DeleteConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<DeleteConsumableResourceRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<DeleteConsumableResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConsumableResource",
}));

export type DeleteJobQueueError =
  | ClientException
  | ServerException
  | JobQueueNotFound
  | JobQueueBeingModified
  | CommonErrors;
/**
 * Deletes the specified job queue. You must first disable submissions for a queue with the
 * UpdateJobQueue operation. All jobs in the queue are eventually terminated
 * when you delete a job queue.
 *
 * It's not necessary to disassociate compute environments from a queue before submitting a
 * `DeleteJobQueue` request.
 */
export const deleteJobQueue: API.OperationMethod<
  DeleteJobQueueRequest,
  DeleteJobQueueResponse,
  DeleteJobQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<DeleteJobQueueRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<DeleteJobQueueResponse>,
  errors: [ClientException, ServerException, JobQueueNotFound, JobQueueBeingModified],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobQueue",
}));

export type DeleteQuotaShareError = ClientException | ServerException | CommonErrors;
/**
 * Deletes the specified quota share. You must first disable submissions for the share by
 * updating the state to `DISABLED` using the UpdateQuotaShare operation.
 * All jobs in the share are eventually terminated when you delete a quota share.
 */
export const deleteQuotaShare: API.OperationMethod<
  DeleteQuotaShareRequest,
  DeleteQuotaShareResponse,
  DeleteQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<DeleteQuotaShareRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<DeleteQuotaShareResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuotaShare",
}));

export type DeleteSchedulingPolicyError = ClientException | ServerException | CommonErrors;
/**
 * Deletes the specified scheduling policy.
 *
 * You can't delete a scheduling policy that's used in any job queues.
 */
export const deleteSchedulingPolicy: API.OperationMethod<
  DeleteSchedulingPolicyRequest,
  DeleteSchedulingPolicyResponse,
  DeleteSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<DeleteSchedulingPolicyRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<DeleteSchedulingPolicyResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedulingPolicy",
}));

export type DeleteServiceEnvironmentError = ClientException | ServerException | CommonErrors;
/**
 * Deletes a Service environment. Before you can delete a service environment, you must first set its state to `DISABLED` with the `UpdateServiceEnvironment` API operation and disassociate it from any job queues with the `UpdateJobQueue` API operation.
 */
export const deleteServiceEnvironment: API.OperationMethod<
  DeleteServiceEnvironmentRequest,
  DeleteServiceEnvironmentResponse,
  DeleteServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<DeleteServiceEnvironmentRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<DeleteServiceEnvironmentResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceEnvironment",
}));

export type DeregisterJobDefinitionError = ClientException | ServerException | CommonErrors;
/**
 * Deregisters an Batch job definition. Job definitions are permanently deleted after 180
 * days.
 */
export const deregisterJobDefinition: API.OperationMethod<
  DeregisterJobDefinitionRequest,
  DeregisterJobDefinitionResponse,
  DeregisterJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<DeregisterJobDefinitionRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<DeregisterJobDefinitionResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterJobDefinition",
}));

export type DescribeComputeEnvironmentsError = ClientException | ServerException | CommonErrors;
/**
 * Describes one or more of your compute environments.
 *
 * If you're using an unmanaged compute environment, you can use the
 * `DescribeComputeEnvironment` operation to determine the
 * `ecsClusterArn` that you launch your Amazon ECS container instances into.
 */
export const describeComputeEnvironments: API.PaginatedOperationMethod<
  DescribeComputeEnvironmentsRequest,
  DescribeComputeEnvironmentsResponse,
  DescribeComputeEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  ComputeEnvironmentDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<DescribeComputeEnvironmentsRequest>,
  output: __S(867, __c27, 3) as any as S.Schema<DescribeComputeEnvironmentsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComputeEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computeEnvironments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeConsumableResourceError = ClientException | ServerException | CommonErrors;
/**
 * Returns a description of the specified consumable resource.
 */
export const describeConsumableResource: API.OperationMethod<
  DescribeConsumableResourceRequest,
  DescribeConsumableResourceResponse,
  DescribeConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<DescribeConsumableResourceRequest>,
  output: __S(929, __c29, 1) as any as S.Schema<DescribeConsumableResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConsumableResource",
}));

export type DescribeJobDefinitionsError = ClientException | ServerException | CommonErrors;
/**
 * Describes a list of job definitions. You can specify a `status` (such as
 * `ACTIVE`) to only return job definitions that match that status.
 */
export const describeJobDefinitions: API.PaginatedOperationMethod<
  DescribeJobDefinitionsRequest,
  DescribeJobDefinitionsResponse,
  DescribeJobDefinitionsError,
  Credentials | HttpClient.HttpClient,
  JobDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<DescribeJobDefinitionsRequest>,
  output: __S(963, __c30, 3) as any as S.Schema<DescribeJobDefinitionsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobDefinitions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeJobQueuesError = ClientException | ServerException | CommonErrors;
/**
 * Describes one or more of your job queues.
 */
export const describeJobQueues: API.PaginatedOperationMethod<
  DescribeJobQueuesRequest,
  DescribeJobQueuesResponse,
  DescribeJobQueuesError,
  Credentials | HttpClient.HttpClient,
  JobQueueDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<DescribeJobQueuesRequest>,
  output: __S(1155, __c36, 3) as any as S.Schema<DescribeJobQueuesResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobQueues",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobQueues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeJobsError = ClientException | ServerException | CommonErrors;
/**
 * Describes a list of Batch jobs.
 */
export const describeJobs: API.OperationMethod<
  DescribeJobsRequest,
  DescribeJobsResponse,
  DescribeJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<DescribeJobsRequest>,
  output: __S(1212, __c37, 28) as any as S.Schema<DescribeJobsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobs",
}));

export type DescribeQuotaShareError = ClientException | ServerException | CommonErrors;
/**
 * Returns a description of the specified quota share.
 */
export const describeQuotaShare: API.OperationMethod<
  DescribeQuotaShareRequest,
  DescribeQuotaShareResponse,
  DescribeQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<DescribeQuotaShareRequest>,
  output: __S(1281, __c40, 1) as any as S.Schema<DescribeQuotaShareResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuotaShare",
}));

export type DescribeSchedulingPoliciesError = ClientException | ServerException | CommonErrors;
/**
 * Describes one or more of your scheduling policies.
 */
export const describeSchedulingPolicies: API.OperationMethod<
  DescribeSchedulingPoliciesRequest,
  DescribeSchedulingPoliciesResponse,
  DescribeSchedulingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<DescribeSchedulingPoliciesRequest>,
  output: __S(1315, __c41, 3) as any as S.Schema<DescribeSchedulingPoliciesResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedulingPolicies",
}));

export type DescribeServiceEnvironmentsError = ClientException | ServerException | CommonErrors;
/**
 * Describes one or more of your service environments.
 */
export const describeServiceEnvironments: API.PaginatedOperationMethod<
  DescribeServiceEnvironmentsRequest,
  DescribeServiceEnvironmentsResponse,
  DescribeServiceEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  ServiceEnvironmentDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<DescribeServiceEnvironmentsRequest>,
  output: __S(1347, __c42, 3) as any as S.Schema<DescribeServiceEnvironmentsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceEnvironments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceEnvironments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeServiceJobError = ClientException | ServerException | CommonErrors;
/**
 * The details of a service job.
 */
export const describeServiceJob: API.OperationMethod<
  DescribeServiceJobRequest,
  DescribeServiceJobResponse,
  DescribeServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<DescribeServiceJobRequest>,
  output: __S(1380, __c43, 4) as any as S.Schema<DescribeServiceJobResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceJob",
}));

export type GetJobQueueSnapshotError = ClientException | ServerException | CommonErrors;
/**
 * Provides a snapshot of job queue state, including ordering of `RUNNABLE` jobs, as well as capacity utilization for already dispatched jobs.
 * The first 100 `RUNNABLE` jobs in the job queue are listed in order of dispatch. For job queues with an attached
 * quota-share policy, the first `RUNNABLE` job in each quota share is also listed. Capacity utilization for the job queue is provided, as well as
 * break downs by share for job queues with attached fair-share or quota-share scheduling policies.
 */
export const getJobQueueSnapshot: API.OperationMethod<
  GetJobQueueSnapshotRequest,
  GetJobQueueSnapshotResponse,
  GetJobQueueSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<GetJobQueueSnapshotRequest>,
  output: __S(1517, __c47, 13) as any as S.Schema<GetJobQueueSnapshotResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobQueueSnapshot",
}));

export type ListConsumableResourcesError = ClientException | ServerException | CommonErrors;
/**
 * Returns a list of Batch consumable resources.
 */
export const listConsumableResources: API.PaginatedOperationMethod<
  ListConsumableResourcesRequest,
  ListConsumableResourcesResponse,
  ListConsumableResourcesError,
  Credentials | HttpClient.HttpClient,
  ConsumableResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<ListConsumableResourcesRequest>,
  output: __S(1539, __c48, 3) as any as S.Schema<ListConsumableResourcesResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConsumableResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "consumableResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError = ClientException | ServerException | CommonErrors;
/**
 * Returns a list of Batch jobs.
 *
 * You must specify only one of the following items:
 *
 * - A job queue ID to return a list of jobs in that job queue
 *
 * - A multi-node parallel job ID to return a list of nodes for that job
 *
 * - An array job ID to return a list of the children for that job
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(1606, __c50, 6) as any as S.Schema<ListJobsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsByConsumableResourceError = ClientException | ServerException | CommonErrors;
/**
 * Returns a list of Batch jobs that require a specific consumable resource.
 */
export const listJobsByConsumableResource: API.PaginatedOperationMethod<
  ListJobsByConsumableResourceRequest,
  ListJobsByConsumableResourceResponse,
  ListJobsByConsumableResourceError,
  Credentials | HttpClient.HttpClient,
  ListJobsByConsumableResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<ListJobsByConsumableResourceRequest>,
  output: __S(1635, __c51, 3) as any as S.Schema<ListJobsByConsumableResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobsByConsumableResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListQuotaSharesError = ClientException | ServerException | CommonErrors;
/**
 * Returns a list of Batch quota shares associated with a job queue.
 */
export const listQuotaShares: API.PaginatedOperationMethod<
  ListQuotaSharesRequest,
  ListQuotaSharesResponse,
  ListQuotaSharesError,
  Credentials | HttpClient.HttpClient,
  QuotaShareDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<ListQuotaSharesRequest>,
  output: __S(1667, __c52, 3) as any as S.Schema<ListQuotaSharesResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuotaShares",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "quotaShares",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchedulingPoliciesError = ClientException | ServerException | CommonErrors;
/**
 * Returns a list of Batch scheduling policies.
 */
export const listSchedulingPolicies: API.PaginatedOperationMethod<
  ListSchedulingPoliciesRequest,
  ListSchedulingPoliciesResponse,
  ListSchedulingPoliciesError,
  Credentials | HttpClient.HttpClient,
  SchedulingPolicyListingDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<ListSchedulingPoliciesRequest>,
  output: __S(1699, __c53, 3) as any as S.Schema<ListSchedulingPoliciesResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchedulingPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schedulingPolicies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceJobsError = ClientException | ServerException | CommonErrors;
/**
 * Returns a list of service jobs for a specified job queue.
 */
export const listServiceJobs: API.PaginatedOperationMethod<
  ListServiceJobsRequest,
  ListServiceJobsResponse,
  ListServiceJobsError,
  Credentials | HttpClient.HttpClient,
  ServiceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<ListServiceJobsRequest>,
  output: __S(1731, __c54, 3) as any as S.Schema<ListServiceJobsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ClientException | ServerException | CommonErrors;
/**
 * Lists the tags for an Batch resource. Batch resources that support tags are compute environments, jobs, job definitions, job queues,
 * and scheduling policies. ARNs for child jobs of array and multi-node parallel (MNP) jobs aren't supported.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterJobDefinitionError = ClientException | ServerException | CommonErrors;
/**
 * Registers an Batch job definition.
 */
export const registerJobDefinition: API.OperationMethod<
  RegisterJobDefinitionRequest,
  RegisterJobDefinitionResponse,
  RegisterJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<RegisterJobDefinitionRequest>,
  output: __S(1793, __c56, 1) as any as S.Schema<RegisterJobDefinitionResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterJobDefinition",
}));

export type SubmitJobError = ClientException | ServerException | CommonErrors;
/**
 * Submits an Batch job from a job definition. Parameters that are specified during SubmitJob override parameters defined in the job definition. vCPU and memory
 * requirements that are specified in the `resourceRequirements` objects in the job
 * definition are the exception. They can't be overridden this way using the `memory`
 * and `vcpus` parameters. Rather, you must specify updates to job definition
 * parameters in a `resourceRequirements` object that's included in the
 * `containerOverrides` parameter.
 *
 * Job queues with a scheduling policy are limited to 500 active share identifiers at
 * a time.
 *
 * Jobs that run on Fargate resources can't be guaranteed to run for more than 14 days.
 * This is because, after 14 days, Fargate resources might become unavailable and job might be
 * terminated.
 */
export const submitJob: API.OperationMethod<
  SubmitJobRequest,
  SubmitJobResponse,
  SubmitJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1838, __c57, 14) as any as S.Schema<SubmitJobRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<SubmitJobResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitJob",
}));

export type SubmitServiceJobError = ClientException | ServerException | CommonErrors;
/**
 * Submits a service job to a specified job queue to run on SageMaker AI. A service job is a unit of work that you submit to Batch for execution on SageMaker AI.
 */
export const submitServiceJob: API.OperationMethod<
  SubmitServiceJobRequest,
  SubmitServiceJobResponse,
  SubmitServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<SubmitServiceJobRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<SubmitServiceJobResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitServiceJob",
}));

export type TagResourceError = ClientException | ServerException | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource aren't specified in the request parameters, they aren't
 * changed. When a resource is deleted, the tags that are associated with that resource are
 * deleted as well. Batch resources that support tags are compute environments, jobs, job definitions, job queues,
 * and scheduling policies. ARNs for child jobs of array and multi-node parallel (MNP) jobs aren't supported.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateJobError = ClientException | ServerException | CommonErrors;
/**
 * Terminates a job in a job queue. Jobs that are in the `STARTING` or
 * `RUNNING` state are terminated, which causes them to transition to
 * `FAILED`. Jobs that have not progressed to the `STARTING` state are
 * cancelled.
 */
export const terminateJob: API.OperationMethod<
  TerminateJobRequest,
  TerminateJobResponse,
  TerminateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<TerminateJobRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<TerminateJobResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateJob",
}));

export type TerminateJobsError = ClientException | ServerException | CommonErrors;
/**
 * Terminates up to 50 jobs in a job queue. This is a bulk version of TerminateJob. Jobs that are in the `STARTING` or
 * `RUNNING` state are terminated, which causes them to transition to
 * `FAILED`. Jobs that have not progressed to the `STARTING` state are
 * cancelled.
 *
 * Batch reports the result for each job individually in the response. Jobs that
 * were processed successfully are reported in the `successful` list. Jobs that
 * encountered errors are reported in the `errors` list. The response returns an
 * HTTP status code of `200` even when some jobs encountered errors, so check the
 * `errors` list. Jobs that can't be found are treated as successfully
 * processed.
 *
 * This operation requires `batch:TerminateJob` permission for each job in the
 * request. There is no separate `batch:TerminateJobs` IAM action. If a caller's IAM
 * policy grants `batch:TerminateJob`, they can use both the singular
 * TerminateJob and bulk `TerminateJobs` operations.
 */
export const terminateJobs: API.OperationMethod<
  TerminateJobsRequest,
  TerminateJobsResponse,
  TerminateJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<TerminateJobsRequest>,
  output: __S(66, __c2, 2) as any as S.Schema<TerminateJobsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateJobs",
}));

export type TerminateServiceJobError = ClientException | ServerException | CommonErrors;
/**
 * Terminates a service job in a job queue.
 */
export const terminateServiceJob: API.OperationMethod<
  TerminateServiceJobRequest,
  TerminateServiceJobResponse,
  TerminateServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<TerminateServiceJobRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<TerminateServiceJobResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateServiceJob",
}));

export type TerminateServiceJobsError = ClientException | ServerException | CommonErrors;
/**
 * Terminates up to 50 service jobs in a job queue. This is a bulk version of TerminateServiceJob.
 *
 * Batch reports the result for each service job individually in the response. Service jobs that were processed successfully are reported in the `successful` list. Service jobs that encountered errors are reported in the `errors` list. The response returns an HTTP status code of `200` even when some service jobs encountered errors, so check the `errors` list. Service jobs that can't be found are treated as successfully processed.
 *
 * This operation requires `batch:TerminateServiceJob` permission for each service job in the
 * request. There is no separate `batch:TerminateServiceJobs` IAM action. If a caller's IAM
 * policy grants `batch:TerminateServiceJob`, they can use both the singular
 * `TerminateServiceJob` and bulk `TerminateServiceJobs` operations.
 */
export const terminateServiceJobs: API.OperationMethod<
  TerminateServiceJobsRequest,
  TerminateServiceJobsResponse,
  TerminateServiceJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<TerminateServiceJobsRequest>,
  output: __S(66, __c2, 2) as any as S.Schema<TerminateServiceJobsResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateServiceJobs",
}));

export type UntagResourceError = ClientException | ServerException | CommonErrors;
/**
 * Deletes specified tags from an Batch resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateComputeEnvironmentError =
  | ClientException
  | ServerException
  | ComputeEnvironmentNotFound
  | ComputeEnvironmentBeingModified
  | CommonErrors;
/**
 * Updates an Batch compute environment.
 */
export const updateComputeEnvironment: API.OperationMethod<
  UpdateComputeEnvironmentRequest,
  UpdateComputeEnvironmentResponse,
  UpdateComputeEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2116, __c66, 4) as any as S.Schema<UpdateComputeEnvironmentRequest>,
  output: __S(224, __c7, 0) as any as S.Schema<UpdateComputeEnvironmentResponse>,
  errors: [
    ClientException,
    ServerException,
    ComputeEnvironmentNotFound,
    ComputeEnvironmentBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComputeEnvironment",
}));

export type UpdateConsumableResourceError = ClientException | ServerException | CommonErrors;
/**
 * Updates a consumable resource.
 */
export const updateConsumableResource: API.OperationMethod<
  UpdateConsumableResourceRequest,
  UpdateConsumableResourceResponse,
  UpdateConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<UpdateConsumableResourceRequest>,
  output: __S(2145, __c67, 1) as any as S.Schema<UpdateConsumableResourceResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConsumableResource",
}));

export type UpdateJobQueueError =
  | ClientException
  | ServerException
  | JobQueueNotFound
  | JobQueueBeingModified
  | CommonErrors;
/**
 * Updates a job queue.
 */
export const updateJobQueue: API.OperationMethod<
  UpdateJobQueueRequest,
  UpdateJobQueueResponse,
  UpdateJobQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<UpdateJobQueueRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<UpdateJobQueueResponse>,
  errors: [ClientException, ServerException, JobQueueNotFound, JobQueueBeingModified],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobQueue",
}));

export type UpdateQuotaShareError = ClientException | ServerException | CommonErrors;
/**
 * Updates a quota share.
 */
export const updateQuotaShare: API.OperationMethod<
  UpdateQuotaShareRequest,
  UpdateQuotaShareResponse,
  UpdateQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<UpdateQuotaShareRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<UpdateQuotaShareResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuotaShare",
}));

export type UpdateSchedulingPolicyError = ClientException | ServerException | CommonErrors;
/**
 * Updates a scheduling policy.
 */
export const updateSchedulingPolicy: API.OperationMethod<
  UpdateSchedulingPolicyRequest,
  UpdateSchedulingPolicyResponse,
  UpdateSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<UpdateSchedulingPolicyRequest>,
  output: __S(2368, __c74, 0) as any as S.Schema<UpdateSchedulingPolicyResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchedulingPolicy",
}));

export type UpdateServiceEnvironmentError = ClientException | ServerException | CommonErrors;
/**
 * Updates a service environment. You can update the state of a service environment from `ENABLED` to `DISABLED` to prevent new service jobs from being placed in the service environment.
 */
export const updateServiceEnvironment: API.OperationMethod<
  UpdateServiceEnvironmentRequest,
  UpdateServiceEnvironmentResponse,
  UpdateServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<UpdateServiceEnvironmentRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateServiceEnvironmentResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceEnvironment",
}));

export type UpdateServiceJobError = ClientException | ServerException | CommonErrors;
/**
 * Updates the priority of a specified service job in an Batch job queue.
 */
export const updateServiceJob: API.OperationMethod<
  UpdateServiceJobRequest,
  UpdateServiceJobResponse,
  UpdateServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<UpdateServiceJobRequest>,
  output: __S(1856, __c58, 0) as any as S.Schema<UpdateServiceJobResponse>,
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceJob",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(32, __c1, 0)), reason: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/canceljobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelJobsRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          job: S.optional(S.String),
          code: S.optional(S.String),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "CancelJobsErrorDetail" });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          successful: S.optional(__S(32, __c1, 0)),
          errors: S.optional(__S(65, __c2, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "CancelJobsResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          computeEnvironmentName: S.optional(S.String),
          type: S.optional(S.String),
          state: S.optional(S.String),
          unmanagedvCpus: S.optional(S.Number),
          computeResources: S.optional(__S(162, __c5, 2)),
          serviceRole: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
          eksConfiguration: S.optional(__S(163, __c5, 3)),
          context: S.optional(S.String),
          ecsSettings: S.optional(__S(205, __c6, 13)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/createcomputeenvironment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateComputeEnvironmentRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ec2InstanceProfileArn: S.optional(S.String),
          networkConfiguration: S.optional(__S(198, __c6, 6)),
          instanceRequirements: S.optional(__S(199, __c6, 7)),
          capacityOptionType: S.optional(S.String),
          storageConfiguration: S.optional(__S(200, __c6, 8)),
          monitoring: S.optional(S.String),
          fipsEnabled: S.optional(S.Boolean),
          capacityReservations: S.optional(__S(201, __c6, 9)),
          instanceMetadataTagsPropagation: S.optional(S.Boolean),
          localStorageConfiguration: S.optional(__S(202, __c6, 10)),
        }),
      ).annotate({ identifier: "InstanceLaunchTemplate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          propagateTags: S.optional(S.String),
          infrastructureRoleArn: S.optional(S.String),
          instanceLaunchTemplate: S.optional(__S(160, __c5, 0)),
          infrastructureOptimization: S.optional(__S(203, __c6, 11)),
        }),
      ).annotate({ identifier: "ManagedInstancesProvider" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          allocationStrategy: S.optional(S.String),
          minvCpus: S.optional(S.Number),
          maxvCpus: S.optional(S.Number),
          desiredvCpus: S.optional(S.Number),
          instanceTypes: S.optional(__S(32, __c1, 0)),
          imageId: S.optional(S.String),
          subnets: S.optional(__S(32, __c1, 0)),
          securityGroupIds: S.optional(__S(32, __c1, 0)),
          ec2KeyPair: S.optional(S.String),
          instanceRole: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
          placementGroup: S.optional(S.String),
          bidPercentage: S.optional(S.Number),
          spotIamFleetRole: S.optional(S.String),
          launchTemplate: S.optional(__S(194, __c6, 2)),
          ec2Configuration: S.optional(__S(196, __c6, 4)),
          scalingPolicy: S.optional(__S(197, __c6, 5)),
          managedInstancesProvider: S.optional(__S(161, __c5, 1)),
          capacityTags: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "ComputeResource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          eksClusterArn: S.optional(S.String),
          kubernetesNamespace: S.optional(S.String),
          accessEntry: S.optional(__S(204, __c6, 12)),
        }),
      ).annotate({ identifier: "EksConfiguration" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          launchTemplateId: S.optional(S.String),
          launchTemplateName: S.optional(S.String),
          version: S.optional(S.String),
          targetInstanceTypes: S.optional(__S(32, __c1, 0)),
          userdataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchTemplateSpecificationOverride" });
    case 1:
      return S.Array(__S(192, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          launchTemplateId: S.optional(S.String),
          launchTemplateName: S.optional(S.String),
          version: S.optional(S.String),
          overrides: S.optional(__S(193, __c6, 1)),
          userdataType: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchTemplateSpecification" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          imageType: S.optional(S.String),
          imageIdOverride: S.optional(S.String),
          batchImageStatus: S.optional(S.String),
          imageKubernetesVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Ec2Configuration" });
    case 4:
      return S.Array(__S(195, __c6, 3));
    case 5:
      return S.suspend(() => S.Struct({ minScaleDownDelayMinutes: S.optional(S.Number) })).annotate(
        { identifier: "ComputeScalingPolicy" },
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          subnets: S.optional(__S(32, __c1, 0)),
          securityGroups: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "ManagedInstancesNetworkConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({ allowedInstanceTypes: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "InstanceRequirementsRequest" });
    case 8:
      return S.suspend(() => S.Struct({ storageSizeGiB: S.optional(S.Number) })).annotate({
        identifier: "ManagedInstancesStorageConfiguration",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          reservationGroupArn: S.optional(S.String),
          reservationPreference: S.optional(S.String),
        }),
      ).annotate({ identifier: "CapacityReservationRequest" });
    case 10:
      return S.suspend(() => S.Struct({ useLocalStorage: S.optional(S.Boolean) })).annotate({
        identifier: "ManagedInstancesLocalStorageConfiguration",
      });
    case 11:
      return S.suspend(() => S.Struct({ scaleInAfter: S.optional(S.Number) })).annotate({
        identifier: "InfrastructureOptimization",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ desiredState: S.optional(S.String), status: S.optional(S.String) }),
      ).annotate({ identifier: "EksAccessEntry" });
    case 13:
      return S.suspend(() => S.Struct({ containerInsights: S.optional(S.String) })).annotate({
        identifier: "EcsSettings",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          computeEnvironmentName: S.optional(S.String),
          computeEnvironmentArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateComputeEnvironmentResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          consumableResourceName: S.optional(S.String),
          totalQuantity: S.optional(S.Number),
          resourceType: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/createconsumableresource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateConsumableResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          consumableResourceName: S.optional(S.String),
          consumableResourceArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateConsumableResourceResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobQueueName: S.optional(S.String),
          state: S.optional(S.String),
          schedulingPolicyArn: S.optional(S.String),
          priority: S.optional(S.Number),
          computeEnvironmentOrder: S.optional(__S(321, __c10, 1)),
          serviceEnvironmentOrder: S.optional(__S(323, __c10, 3)),
          jobQueueType: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
          jobStateTimeLimitActions: S.optional(__S(325, __c10, 5)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/createjobqueue" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateJobQueueRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ order: S.optional(S.Number), computeEnvironment: S.optional(S.String) }),
      ).annotate({ identifier: "ComputeEnvironmentOrder" });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ order: S.optional(S.Number), serviceEnvironment: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceEnvironmentOrder" });
    case 3:
      return S.Array(__S(322, __c10, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          reason: S.optional(S.String),
          state: S.optional(S.String),
          maxTimeSeconds: S.optional(S.Number),
          action: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobStateTimeLimitAction" });
    case 5:
      return S.Array(__S(324, __c10, 4));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobQueueName: S.optional(S.String), jobQueueArn: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "CreateJobQueueResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          quotaShareName: S.optional(S.String),
          jobQueue: S.optional(S.String),
          capacityLimits: S.optional(__S(417, __c13, 1)),
          resourceSharingConfiguration: S.optional(__S(448, __c14, 0)),
          preemptionConfiguration: S.optional(__S(449, __c14, 1)),
          state: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/createquotashare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQuotaShareRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxCapacity: S.optional(S.Number), capacityUnit: S.optional(S.String) }),
      ).annotate({ identifier: "QuotaShareCapacityLimit" });
    case 1:
      return S.Array(__S(416, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ strategy: S.optional(S.String), borrowLimit: S.optional(S.Number) }),
      ).annotate({ identifier: "QuotaShareResourceSharingConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ inSharePreemption: S.optional(S.String) })).annotate({
        identifier: "QuotaSharePreemptionConfiguration",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          quotaShareName: S.optional(S.String),
          quotaShareArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateQuotaShareResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          quotaSharePolicy: S.optional(__S(544, __c17, 0)),
          fairsharePolicy: S.optional(__S(547, __c17, 3)),
          tags: S.optional(__S(128, __c4, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/createschedulingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSchedulingPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateSchedulingPolicyResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ idleResourceAssignmentStrategy: S.optional(S.String) }),
      ).annotate({ identifier: "QuotaSharePolicy" });
    case 1:
      return S.suspend(() =>
        S.Struct({ shareIdentifier: S.optional(S.String), weightFactor: S.optional(S.Number) }),
      ).annotate({ identifier: "ShareAttributes" });
    case 2:
      return S.Array(__S(545, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          shareDecaySeconds: S.optional(S.Number),
          computeReservation: S.optional(S.Number),
          shareDistribution: S.optional(__S(546, __c17, 2)),
        }),
      ).annotate({ identifier: "FairsharePolicy" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceEnvironmentName: S.optional(S.String),
          serviceEnvironmentType: S.optional(S.String),
          state: S.optional(S.String),
          capacityLimits: S.optional(__S(417, __c13, 1)),
          tags: S.optional(__S(128, __c4, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/createserviceenvironment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateServiceEnvironmentRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceEnvironmentName: S.optional(S.String),
          serviceEnvironmentArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateServiceEnvironmentResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ computeEnvironment: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/deletecomputeenvironment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteComputeEnvironmentRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ consumableResource: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/deleteconsumableresource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteConsumableResourceRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobQueue: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/deletejobqueue" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteJobQueueRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ quotaShareArn: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/deletequotashare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQuotaShareRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/deleteschedulingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSchedulingPolicyRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceEnvironment: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/deleteserviceenvironment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceEnvironmentRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobDefinition: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/deregisterjobdefinition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterJobDefinitionRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          computeEnvironments: S.optional(__S(32, __c1, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describecomputeenvironments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeComputeEnvironmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          computeEnvironmentName: S.optional(S.String),
          computeEnvironmentArn: S.optional(S.String),
          unmanagedvCpus: S.optional(S.Number),
          ecsClusterArn: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
          type: S.optional(S.String),
          state: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          computeResources: S.optional(__S(162, __c5, 2)),
          serviceRole: S.optional(S.String),
          updatePolicy: S.optional(__S(896, __c28, 0)),
          eksConfiguration: S.optional(__S(163, __c5, 3)),
          containerOrchestrationType: S.optional(S.String),
          uuid: S.optional(S.String),
          context: S.optional(S.String),
          ecsSettings: S.optional(__S(205, __c6, 13)),
        }),
      ).annotate({ identifier: "ComputeEnvironmentDetail" });
    case 2:
      return S.Array(__S(865, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          computeEnvironments: S.optional(__S(866, __c27, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeComputeEnvironmentsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          terminateJobsOnUpdate: S.optional(S.Boolean),
          jobExecutionTimeoutMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpdatePolicy" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ consumableResource: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describeconsumableresource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeConsumableResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          consumableResourceName: S.optional(S.String),
          consumableResourceArn: S.optional(S.String),
          totalQuantity: S.optional(S.Number),
          inUseQuantity: S.optional(S.Number),
          availableQuantity: S.optional(S.Number),
          resourceType: S.optional(S.String),
          createdAt: S.optional(S.Number),
          tags: S.optional(__S(128, __c4, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeConsumableResourceResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobDefinitions: S.optional(__S(32, __c1, 0)),
          maxResults: S.optional(S.Number),
          jobDefinitionName: S.optional(S.String),
          status: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describejobdefinitions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobDefinitionName: S.optional(S.String),
          jobDefinitionArn: S.optional(S.String),
          revision: S.optional(S.Number),
          status: S.optional(S.String),
          type: S.optional(S.String),
          schedulingPriority: S.optional(S.Number),
          parameters: S.optional(__S(128, __c4, 0)),
          retryStrategy: S.optional(__S(1122, __c35, 2)),
          containerProperties: S.optional(__S(1080, __c33, 24)),
          timeout: S.optional(__S(992, __c31, 0)),
          nodeProperties: S.optional(__S(1106, __c34, 18)),
          tags: S.optional(__S(128, __c4, 0)),
          propagateTags: S.optional(S.Boolean),
          platformCapabilities: S.optional(__S(1066, __c33, 10)),
          ecsProperties: S.optional(__S(1088, __c34, 0)),
          eksProperties: S.optional(__S(1103, __c34, 15)),
          containerOrchestrationType: S.optional(S.String),
          consumableResourceProperties: S.optional(__S(1026, __c32, 2)),
        }),
      ).annotate({ identifier: "JobDefinition" });
    case 2:
      return S.Array(__S(961, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobDefinitions: S.optional(__S(962, __c30, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeJobDefinitionsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ attemptDurationSeconds: S.optional(S.Number) })).annotate({
        identifier: "JobTimeout",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ consumableResource: S.optional(S.String), quantity: S.optional(S.Number) }),
      ).annotate({ identifier: "ConsumableResourceRequirement" });
    case 1:
      return S.Array(__S(1024, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ consumableResourceList: S.optional(__S(1025, __c32, 1)) }),
      ).annotate({ identifier: "ConsumableResourceProperties" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ sourcePath: S.optional(S.String) })).annotate({
        identifier: "Host",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ accessPointId: S.optional(S.String), iam: S.optional(S.String) }),
      ).annotate({ identifier: "EFSAuthorizationConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.optional(S.String),
          rootDirectory: S.optional(S.String),
          transitEncryption: S.optional(S.String),
          transitEncryptionPort: S.optional(S.Number),
          authorizationConfig: S.optional(__S(1057, __c33, 1)),
        }),
      ).annotate({ identifier: "EFSVolumeConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          fileSystemArn: S.optional(S.String),
          rootDirectory: S.optional(S.String),
          transitEncryptionPort: S.optional(S.Number),
          accessPointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3FilesVolumeConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          host: S.optional(__S(1056, __c33, 0)),
          name: S.optional(S.String),
          efsVolumeConfiguration: S.optional(__S(1058, __c33, 2)),
          s3filesVolumeConfiguration: S.optional(__S(1059, __c33, 3)),
        }),
      ).annotate({ identifier: "Volume" });
    case 5:
      return S.Array(__S(1060, __c33, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          containerPath: S.optional(S.String),
          readOnly: S.optional(S.Boolean),
          sourceVolume: S.optional(S.String),
        }),
      ).annotate({ identifier: "MountPoint" });
    case 7:
      return S.Array(__S(1062, __c33, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          hardLimit: S.optional(S.Number),
          name: S.optional(S.String),
          softLimit: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Ulimit" });
    case 9:
      return S.Array(__S(1064, __c33, 8));
    case 10:
      return S.Array(S.String);
    case 11:
      return S.suspend(() =>
        S.Struct({
          hostPath: S.optional(S.String),
          containerPath: S.optional(S.String),
          permissions: S.optional(__S(1066, __c33, 10)),
        }),
      ).annotate({ identifier: "Device" });
    case 12:
      return S.Array(__S(1067, __c33, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          containerPath: S.optional(S.String),
          size: S.optional(S.Number),
          mountOptions: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "Tmpfs" });
    case 14:
      return S.Array(__S(1069, __c33, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          devices: S.optional(__S(1068, __c33, 12)),
          initProcessEnabled: S.optional(S.Boolean),
          sharedMemorySize: S.optional(S.Number),
          tmpfs: S.optional(__S(1070, __c33, 14)),
          maxSwap: S.optional(S.Number),
          swappiness: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LinuxParameters" });
    case 16:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), valueFrom: S.optional(S.String) }),
      ).annotate({ identifier: "Secret" });
    case 17:
      return S.Array(__S(1072, __c33, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          logDriver: S.optional(S.String),
          options: S.optional(__S(128, __c4, 0)),
          secretOptions: S.optional(__S(1073, __c33, 17)),
        }),
      ).annotate({ identifier: "LogConfiguration" });
    case 19:
      return S.suspend(() => S.Struct({ assignPublicIp: S.optional(S.String) })).annotate({
        identifier: "NetworkConfiguration",
      });
    case 20:
      return S.suspend(() => S.Struct({ platformVersion: S.optional(S.String) })).annotate({
        identifier: "FargatePlatformConfiguration",
      });
    case 21:
      return S.suspend(() => S.Struct({ sizeInGiB: S.optional(S.Number) })).annotate({
        identifier: "EphemeralStorage",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({
          operatingSystemFamily: S.optional(S.String),
          cpuArchitecture: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuntimePlatform" });
    case 23:
      return S.suspend(() => S.Struct({ credentialsParameter: S.optional(S.String) })).annotate({
        identifier: "RepositoryCredentials",
      });
    case 24:
      return S.suspend(() =>
        S.Struct({
          image: S.optional(S.String),
          vcpus: S.optional(S.Number),
          memory: S.optional(S.Number),
          command: S.optional(__S(32, __c1, 0)),
          jobRoleArn: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          volumes: S.optional(__S(1061, __c33, 5)),
          environment: S.optional(__S(1124, __c35, 4)),
          mountPoints: S.optional(__S(1063, __c33, 7)),
          readonlyRootFilesystem: S.optional(S.Boolean),
          privileged: S.optional(S.Boolean),
          ulimits: S.optional(__S(1065, __c33, 9)),
          user: S.optional(S.String),
          instanceType: S.optional(S.String),
          resourceRequirements: S.optional(__S(1126, __c35, 6)),
          linuxParameters: S.optional(__S(1071, __c33, 15)),
          logConfiguration: S.optional(__S(1074, __c33, 18)),
          secrets: S.optional(__S(1073, __c33, 17)),
          networkConfiguration: S.optional(__S(1075, __c33, 19)),
          fargatePlatformConfiguration: S.optional(__S(1076, __c33, 20)),
          enableExecuteCommand: S.optional(S.Boolean),
          ephemeralStorage: S.optional(__S(1077, __c33, 21)),
          runtimePlatform: S.optional(__S(1078, __c33, 22)),
          repositoryCredentials: S.optional(__S(1079, __c33, 23)),
        }),
      ).annotate({ identifier: "ContainerProperties" });
    case 25:
      return S.suspend(() =>
        S.Struct({ containerName: S.optional(S.String), condition: S.optional(S.String) }),
      ).annotate({ identifier: "TaskContainerDependency" });
    case 26:
      return S.Array(__S(1081, __c33, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), options: S.optional(__S(128, __c4, 0)) }),
      ).annotate({ identifier: "FirelensConfiguration" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          command: S.optional(__S(32, __c1, 0)),
          dependsOn: S.optional(__S(1082, __c33, 26)),
          environment: S.optional(__S(1124, __c35, 4)),
          essential: S.optional(S.Boolean),
          firelensConfiguration: S.optional(__S(1083, __c33, 27)),
          image: S.optional(S.String),
          linuxParameters: S.optional(__S(1071, __c33, 15)),
          logConfiguration: S.optional(__S(1074, __c33, 18)),
          mountPoints: S.optional(__S(1063, __c33, 7)),
          name: S.optional(S.String),
          privileged: S.optional(S.Boolean),
          readonlyRootFilesystem: S.optional(S.Boolean),
          repositoryCredentials: S.optional(__S(1079, __c33, 23)),
          resourceRequirements: S.optional(__S(1126, __c35, 6)),
          secrets: S.optional(__S(1073, __c33, 17)),
          ulimits: S.optional(__S(1065, __c33, 9)),
          user: S.optional(S.String),
          startTimeout: S.optional(S.Number),
          stopTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TaskContainerProperties" });
    case 29:
      return S.Array(__S(1084, __c33, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({
          containers: S.optional(__S(1085, __c33, 29)),
          ephemeralStorage: S.optional(__S(1077, __c33, 21)),
          executionRoleArn: S.optional(S.String),
          platformVersion: S.optional(S.String),
          ipcMode: S.optional(S.String),
          taskRoleArn: S.optional(S.String),
          pidMode: S.optional(S.String),
          networkConfiguration: S.optional(__S(1075, __c33, 19)),
          runtimePlatform: S.optional(__S(1078, __c33, 22)),
          volumes: S.optional(__S(1061, __c33, 5)),
          enableExecuteCommand: S.optional(S.Boolean),
          networkMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "EcsTaskProperties" });
    case 31:
      return S.Array(__S(1086, __c33, 30));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskProperties: S.optional(__S(1087, __c33, 31)) }),
      ).annotate({ identifier: "EcsProperties" });
    case 1:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "ImagePullSecret",
      });
    case 2:
      return S.Array(__S(1089, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          mountPath: S.optional(S.String),
          subPath: S.optional(S.String),
          readOnly: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EksContainerVolumeMount" });
    case 4:
      return S.Array(__S(1091, __c34, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          runAsUser: S.optional(S.Number),
          runAsGroup: S.optional(S.Number),
          privileged: S.optional(S.Boolean),
          allowPrivilegeEscalation: S.optional(S.Boolean),
          readOnlyRootFilesystem: S.optional(S.Boolean),
          runAsNonRoot: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EksContainerSecurityContext" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          image: S.optional(S.String),
          imagePullPolicy: S.optional(S.String),
          command: S.optional(__S(32, __c1, 0)),
          args: S.optional(__S(32, __c1, 0)),
          env: S.optional(__S(1124, __c35, 4)),
          resources: S.optional(__S(1127, __c35, 7)),
          volumeMounts: S.optional(__S(1092, __c34, 4)),
          securityContext: S.optional(__S(1093, __c34, 5)),
        }),
      ).annotate({ identifier: "EksContainer" });
    case 7:
      return S.Array(__S(1094, __c34, 6));
    case 8:
      return S.suspend(() => S.Struct({ path: S.optional(S.String) })).annotate({
        identifier: "EksHostPath",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({ medium: S.optional(S.String), sizeLimit: S.optional(S.String) }),
      ).annotate({ identifier: "EksEmptyDir" });
    case 10:
      return S.suspend(() =>
        S.Struct({ secretName: S.optional(S.String), optional: S.optional(S.Boolean) }),
      ).annotate({ identifier: "EksSecret" });
    case 11:
      return S.suspend(() =>
        S.Struct({ claimName: S.optional(S.String), readOnly: S.optional(S.Boolean) }),
      ).annotate({ identifier: "EksPersistentVolumeClaim" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          hostPath: S.optional(__S(1096, __c34, 8)),
          emptyDir: S.optional(__S(1097, __c34, 9)),
          secret: S.optional(__S(1098, __c34, 10)),
          persistentVolumeClaim: S.optional(__S(1099, __c34, 11)),
        }),
      ).annotate({ identifier: "EksVolume" });
    case 13:
      return S.Array(__S(1100, __c34, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          serviceAccountName: S.optional(S.String),
          hostNetwork: S.optional(S.Boolean),
          dnsPolicy: S.optional(S.String),
          imagePullSecrets: S.optional(__S(1090, __c34, 2)),
          containers: S.optional(__S(1095, __c34, 7)),
          initContainers: S.optional(__S(1095, __c34, 7)),
          volumes: S.optional(__S(1101, __c34, 13)),
          metadata: S.optional(__S(1128, __c35, 8)),
          shareProcessNamespace: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EksPodProperties" });
    case 15:
      return S.suspend(() =>
        S.Struct({ podProperties: S.optional(__S(1102, __c34, 14)) }),
      ).annotate({ identifier: "EksProperties" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          targetNodes: S.optional(S.String),
          container: S.optional(__S(1080, __c33, 24)),
          instanceTypes: S.optional(__S(32, __c1, 0)),
          ecsProperties: S.optional(__S(1088, __c34, 0)),
          eksProperties: S.optional(__S(1103, __c34, 15)),
          consumableResourceProperties: S.optional(__S(1026, __c32, 2)),
        }),
      ).annotate({ identifier: "NodeRangeProperty" });
    case 17:
      return S.Array(__S(1104, __c34, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          numNodes: S.optional(S.Number),
          mainNode: S.optional(S.Number),
          nodeRangeProperties: S.optional(__S(1105, __c34, 17)),
        }),
      ).annotate({ identifier: "NodeProperties" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          onStatusReason: S.optional(S.String),
          onReason: S.optional(S.String),
          onExitCode: S.optional(S.String),
          action: S.optional(S.String),
        }),
      ).annotate({ identifier: "EvaluateOnExit" });
    case 1:
      return S.Array(__S(1120, __c35, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          attempts: S.optional(S.Number),
          evaluateOnExit: S.optional(__S(1121, __c35, 1)),
        }),
      ).annotate({ identifier: "RetryStrategy" });
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "KeyValuePair" });
    case 4:
      return S.Array(__S(1123, __c35, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ value: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceRequirement" });
    case 6:
      return S.Array(__S(1125, __c35, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          limits: S.optional(__S(128, __c4, 0)),
          requests: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "EksContainerResourceRequirements" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          labels: S.optional(__S(128, __c4, 0)),
          annotations: S.optional(__S(128, __c4, 0)),
          namespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "EksMetadata" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobQueues: S.optional(__S(32, __c1, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describejobqueues" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobQueuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobQueueName: S.optional(S.String),
          jobQueueArn: S.optional(S.String),
          state: S.optional(S.String),
          schedulingPolicyArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          priority: S.optional(S.Number),
          computeEnvironmentOrder: S.optional(__S(321, __c10, 1)),
          serviceEnvironmentOrder: S.optional(__S(323, __c10, 3)),
          jobQueueType: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
          jobStateTimeLimitActions: S.optional(__S(325, __c10, 5)),
        }),
      ).annotate({ identifier: "JobQueueDetail" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobQueues: S.optional(__S(1154, __c36, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeJobQueuesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(32, __c1, 0)) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describejobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attachmentId: S.optional(S.String),
          ipv6Address: S.optional(S.String),
          privateIpv4Address: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          containerInstanceArn: S.optional(S.String),
          taskArn: S.optional(S.String),
          exitCode: S.optional(S.Number),
          reason: S.optional(S.String),
          logStreamName: S.optional(S.String),
          networkInterfaces: S.optional(__S(1186, __c37, 2)),
        }),
      ).annotate({ identifier: "AttemptContainerDetail" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          exitCode: S.optional(S.Number),
          name: S.optional(S.String),
          reason: S.optional(S.String),
          logStreamName: S.optional(S.String),
          networkInterfaces: S.optional(__S(1186, __c37, 2)),
        }),
      ).annotate({ identifier: "AttemptTaskContainerDetails" });
    case 5:
      return S.Array(__S(1188, __c37, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          containerInstanceArn: S.optional(S.String),
          taskArn: S.optional(S.String),
          containers: S.optional(__S(1189, __c37, 5)),
        }),
      ).annotate({ identifier: "AttemptEcsTaskDetails" });
    case 7:
      return S.Array(__S(1190, __c37, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          container: S.optional(__S(1187, __c37, 3)),
          startedAt: S.optional(S.Number),
          stoppedAt: S.optional(S.Number),
          statusReason: S.optional(S.String),
          taskProperties: S.optional(__S(1191, __c37, 7)),
        }),
      ).annotate({ identifier: "AttemptDetail" });
    case 9:
      return S.Array(__S(1192, __c37, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          image: S.optional(S.String),
          vcpus: S.optional(S.Number),
          memory: S.optional(S.Number),
          command: S.optional(__S(32, __c1, 0)),
          jobRoleArn: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          volumes: S.optional(__S(1061, __c33, 5)),
          environment: S.optional(__S(1124, __c35, 4)),
          mountPoints: S.optional(__S(1063, __c33, 7)),
          readonlyRootFilesystem: S.optional(S.Boolean),
          ulimits: S.optional(__S(1065, __c33, 9)),
          privileged: S.optional(S.Boolean),
          user: S.optional(S.String),
          exitCode: S.optional(S.Number),
          reason: S.optional(S.String),
          containerInstanceArn: S.optional(S.String),
          taskArn: S.optional(S.String),
          logStreamName: S.optional(S.String),
          instanceType: S.optional(S.String),
          networkInterfaces: S.optional(__S(1186, __c37, 2)),
          resourceRequirements: S.optional(__S(1126, __c35, 6)),
          linuxParameters: S.optional(__S(1071, __c33, 15)),
          logConfiguration: S.optional(__S(1074, __c33, 18)),
          secrets: S.optional(__S(1073, __c33, 17)),
          networkConfiguration: S.optional(__S(1075, __c33, 19)),
          fargatePlatformConfiguration: S.optional(__S(1076, __c33, 20)),
          ephemeralStorage: S.optional(__S(1077, __c33, 21)),
          runtimePlatform: S.optional(__S(1078, __c33, 22)),
          repositoryCredentials: S.optional(__S(1079, __c33, 23)),
          enableExecuteCommand: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ContainerDetail" });
    case 11:
      return S.suspend(() =>
        S.Struct({ nodeIndex: S.optional(S.Number), isMainNode: S.optional(S.Boolean) }),
      ).annotate({ identifier: "NodeDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          statusSummary: S.optional(__S(1216, __c38, 0)),
          statusSummaryLastUpdatedAt: S.optional(S.Number),
          size: S.optional(S.Number),
          index: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ArrayPropertiesDetail" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          image: S.optional(S.String),
          imagePullPolicy: S.optional(S.String),
          command: S.optional(__S(32, __c1, 0)),
          args: S.optional(__S(32, __c1, 0)),
          env: S.optional(__S(1124, __c35, 4)),
          resources: S.optional(__S(1127, __c35, 7)),
          exitCode: S.optional(S.Number),
          reason: S.optional(S.String),
          volumeMounts: S.optional(__S(1092, __c34, 4)),
          securityContext: S.optional(__S(1093, __c34, 5)),
        }),
      ).annotate({ identifier: "EksContainerDetail" });
    case 14:
      return S.Array(__S(1197, __c37, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          serviceAccountName: S.optional(S.String),
          hostNetwork: S.optional(S.Boolean),
          dnsPolicy: S.optional(S.String),
          imagePullSecrets: S.optional(__S(1090, __c34, 2)),
          containers: S.optional(__S(1198, __c37, 14)),
          initContainers: S.optional(__S(1198, __c37, 14)),
          volumes: S.optional(__S(1101, __c34, 13)),
          podName: S.optional(S.String),
          nodeName: S.optional(S.String),
          metadata: S.optional(__S(1128, __c35, 8)),
          shareProcessNamespace: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EksPodPropertiesDetail" });
    case 16:
      return S.suspend(() =>
        S.Struct({ podProperties: S.optional(__S(1199, __c37, 15)) }),
      ).annotate({ identifier: "EksPropertiesDetail" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          containerID: S.optional(S.String),
          exitCode: S.optional(S.Number),
          reason: S.optional(S.String),
        }),
      ).annotate({ identifier: "EksAttemptContainerDetail" });
    case 18:
      return S.Array(__S(1201, __c37, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          containers: S.optional(__S(1202, __c37, 18)),
          initContainers: S.optional(__S(1202, __c37, 18)),
          eksClusterArn: S.optional(S.String),
          podName: S.optional(S.String),
          podNamespace: S.optional(S.String),
          nodeName: S.optional(S.String),
          startedAt: S.optional(S.Number),
          stoppedAt: S.optional(S.Number),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "EksAttemptDetail" });
    case 20:
      return S.Array(__S(1203, __c37, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          command: S.optional(__S(32, __c1, 0)),
          dependsOn: S.optional(__S(1082, __c33, 26)),
          environment: S.optional(__S(1124, __c35, 4)),
          essential: S.optional(S.Boolean),
          firelensConfiguration: S.optional(__S(1083, __c33, 27)),
          image: S.optional(S.String),
          linuxParameters: S.optional(__S(1071, __c33, 15)),
          logConfiguration: S.optional(__S(1074, __c33, 18)),
          mountPoints: S.optional(__S(1063, __c33, 7)),
          name: S.optional(S.String),
          privileged: S.optional(S.Boolean),
          readonlyRootFilesystem: S.optional(S.Boolean),
          repositoryCredentials: S.optional(__S(1079, __c33, 23)),
          resourceRequirements: S.optional(__S(1126, __c35, 6)),
          secrets: S.optional(__S(1073, __c33, 17)),
          ulimits: S.optional(__S(1065, __c33, 9)),
          user: S.optional(S.String),
          startTimeout: S.optional(S.Number),
          stopTimeout: S.optional(S.Number),
          exitCode: S.optional(S.Number),
          reason: S.optional(S.String),
          logStreamName: S.optional(S.String),
          networkInterfaces: S.optional(__S(1186, __c37, 2)),
        }),
      ).annotate({ identifier: "TaskContainerDetails" });
    case 22:
      return S.Array(__S(1205, __c37, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          containers: S.optional(__S(1206, __c37, 22)),
          containerInstanceArn: S.optional(S.String),
          taskArn: S.optional(S.String),
          ephemeralStorage: S.optional(__S(1077, __c33, 21)),
          executionRoleArn: S.optional(S.String),
          platformVersion: S.optional(S.String),
          ipcMode: S.optional(S.String),
          taskRoleArn: S.optional(S.String),
          pidMode: S.optional(S.String),
          networkConfiguration: S.optional(__S(1075, __c33, 19)),
          runtimePlatform: S.optional(__S(1078, __c33, 22)),
          volumes: S.optional(__S(1061, __c33, 5)),
          enableExecuteCommand: S.optional(S.Boolean),
          networkMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "EcsTaskDetails" });
    case 24:
      return S.Array(__S(1207, __c37, 23));
    case 25:
      return S.suspend(() =>
        S.Struct({ taskProperties: S.optional(__S(1208, __c37, 24)) }),
      ).annotate({ identifier: "EcsPropertiesDetail" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobName: S.optional(S.String),
          jobId: S.optional(S.String),
          jobQueue: S.optional(S.String),
          status: S.optional(S.String),
          shareIdentifier: S.optional(S.String),
          schedulingPriority: S.optional(S.Number),
          attempts: S.optional(__S(1193, __c37, 9)),
          statusReason: S.optional(S.String),
          createdAt: S.optional(S.Number),
          retryStrategy: S.optional(__S(1122, __c35, 2)),
          startedAt: S.optional(S.Number),
          stoppedAt: S.optional(S.Number),
          dependsOn: S.optional(__S(1249, __c39, 1)),
          jobDefinition: S.optional(S.String),
          parameters: S.optional(__S(128, __c4, 0)),
          container: S.optional(__S(1194, __c37, 10)),
          nodeDetails: S.optional(__S(1195, __c37, 11)),
          nodeProperties: S.optional(__S(1106, __c34, 18)),
          arrayProperties: S.optional(__S(1196, __c37, 12)),
          timeout: S.optional(__S(992, __c31, 0)),
          tags: S.optional(__S(128, __c4, 0)),
          propagateTags: S.optional(S.Boolean),
          platformCapabilities: S.optional(__S(1066, __c33, 10)),
          eksProperties: S.optional(__S(1200, __c37, 16)),
          eksAttempts: S.optional(__S(1204, __c37, 20)),
          ecsProperties: S.optional(__S(1209, __c37, 25)),
          isCancelled: S.optional(S.Boolean),
          isTerminated: S.optional(S.Boolean),
          consumableResourceProperties: S.optional(__S(1026, __c32, 2)),
        }),
      ).annotate({ identifier: "JobDetail" });
    case 27:
      return S.Array(__S(1210, __c37, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(1211, __c37, 27)) }).pipe(ns),
      ).annotate({ identifier: "DescribeJobsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "JobDependency" });
    case 1:
      return S.Array(__S(1248, __c39, 0));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ quotaShareArn: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describequotashare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeQuotaShareRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          quotaShareName: S.optional(S.String),
          quotaShareArn: S.optional(S.String),
          jobQueueArn: S.optional(S.String),
          capacityLimits: S.optional(__S(417, __c13, 1)),
          resourceSharingConfiguration: S.optional(__S(448, __c14, 0)),
          preemptionConfiguration: S.optional(__S(449, __c14, 1)),
          state: S.optional(S.String),
          status: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeQuotaShareResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arns: S.optional(__S(32, __c1, 0)) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describeschedulingpolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeSchedulingPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          arn: S.optional(S.String),
          quotaSharePolicy: S.optional(__S(544, __c17, 0)),
          fairsharePolicy: S.optional(__S(547, __c17, 3)),
          tags: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "SchedulingPolicyDetail" });
    case 2:
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ schedulingPolicies: S.optional(__S(1314, __c41, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeSchedulingPoliciesResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceEnvironments: S.optional(__S(32, __c1, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describeserviceenvironments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeServiceEnvironmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceEnvironmentName: S.optional(S.String),
          serviceEnvironmentArn: S.optional(S.String),
          serviceEnvironmentType: S.optional(S.String),
          state: S.optional(S.String),
          status: S.optional(S.String),
          capacityLimits: S.optional(__S(417, __c13, 1)),
          tags: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "ServiceEnvironmentDetail" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          serviceEnvironments: S.optional(__S(1346, __c42, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServiceEnvironmentsResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/describeservicejob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeServiceJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceResourceId: S.optional(__S(1440, __c45, 0)),
          startedAt: S.optional(S.Number),
          stoppedAt: S.optional(S.Number),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceJobAttemptDetail" });
    case 2:
      return S.Array(__S(1377, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          preemptedAttemptCount: S.optional(S.Number),
          recentPreemptedAttempts: S.optional(__S(1378, __c43, 2)),
        }),
      ).annotate({ identifier: "ServiceJobPreemptionSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          attempts: S.optional(__S(1378, __c43, 2)),
          capacityUsage: S.optional(__S(1409, __c44, 1)),
          createdAt: S.optional(S.Number),
          isTerminated: S.optional(S.Boolean),
          jobArn: S.optional(S.String),
          jobId: S.optional(S.String),
          jobName: S.optional(S.String),
          jobQueue: S.optional(S.String),
          latestAttempt: S.optional(__S(1441, __c45, 1)),
          retryStrategy: S.optional(__S(1474, __c46, 2)),
          scheduledAt: S.optional(S.Number),
          schedulingPriority: S.optional(S.Number),
          serviceRequestPayload: S.optional(S.String),
          serviceJobType: S.optional(S.String),
          shareIdentifier: S.optional(S.String),
          quotaShareName: S.optional(S.String),
          preemptionConfiguration: S.optional(__S(1475, __c46, 3)),
          preemptionSummary: S.optional(__S(1379, __c43, 3)),
          startedAt: S.optional(S.Number),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          stoppedAt: S.optional(S.Number),
          tags: S.optional(__S(128, __c4, 0)),
          timeoutConfig: S.optional(__S(992, __c31, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServiceJobResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ capacityUnit: S.optional(S.String), quantity: S.optional(S.Number) }),
      ).annotate({ identifier: "ServiceJobCapacityUsageDetail" });
    case 1:
      return S.Array(__S(1408, __c44, 0));
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceResourceId" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceResourceId: S.optional(__S(1440, __c45, 0)) }),
      ).annotate({ identifier: "LatestServiceJobAttempt" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ action: S.optional(S.String), onStatusReason: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceJobEvaluateOnExit" });
    case 1:
      return S.Array(__S(1472, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          attempts: S.optional(S.Number),
          evaluateOnExit: S.optional(__S(1473, __c46, 1)),
        }),
      ).annotate({ identifier: "ServiceJobRetryStrategy" });
    case 3:
      return S.suspend(() =>
        S.Struct({ preemptionRetriesBeforeTermination: S.optional(S.Number) }),
      ).annotate({ identifier: "ServiceJobPreemptionConfiguration" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobQueue: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/getjobqueuesnapshot" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetJobQueueSnapshotRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ jobArn: S.optional(S.String), earliestTimeAtPosition: S.optional(S.Number) }),
      ).annotate({ identifier: "FrontOfQueueJobSummary" });
    case 2:
      return S.Array(__S(1505, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(1506, __c47, 2)), lastUpdatedAt: S.optional(S.Number) }),
      ).annotate({ identifier: "FrontOfQueueDetail" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(1506, __c47, 2).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          quotaShares: S.optional(__S(1508, __c47, 4)),
          lastUpdatedAt: S.optional(S.Number),
        }),
      ).annotate({ identifier: "FrontOfQuotaSharesDetail" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          shareIdentifier: S.optional(S.String),
          capacityUsage: S.optional(__S(1409, __c44, 1)),
        }),
      ).annotate({ identifier: "FairshareCapacityUtilization" });
    case 7:
      return S.Array(__S(1510, __c47, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          activeShareCount: S.optional(S.Number),
          topCapacityUtilization: S.optional(__S(1511, __c47, 7)),
        }),
      ).annotate({ identifier: "FairshareUtilizationDetail" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          quotaShareName: S.optional(S.String),
          capacityUsage: S.optional(__S(1409, __c44, 1)),
        }),
      ).annotate({ identifier: "QuotaShareCapacityUtilization" });
    case 10:
      return S.Array(__S(1513, __c47, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ topCapacityUtilization: S.optional(__S(1514, __c47, 10)) }),
      ).annotate({ identifier: "QuotaShareUtilizationDetail" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          totalCapacityUsage: S.optional(__S(1409, __c44, 1)),
          fairshareUtilization: S.optional(__S(1512, __c47, 8)),
          quotaShareUtilization: S.optional(__S(1515, __c47, 11)),
          lastUpdatedAt: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueueSnapshotUtilizationDetail" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          frontOfQueue: S.optional(__S(1507, __c47, 3)),
          frontOfQuotaShares: S.optional(__S(1509, __c47, 5)),
          queueUtilization: S.optional(__S(1516, __c47, 12)),
        }).pipe(ns),
      ).annotate({ identifier: "GetJobQueueSnapshotResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1569, __c49, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/listconsumableresources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListConsumableResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          consumableResourceArn: S.optional(S.String),
          consumableResourceName: S.optional(S.String),
          totalQuantity: S.optional(S.Number),
          inUseQuantity: S.optional(S.Number),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConsumableResourceSummary" });
    case 2:
      return S.Array(__S(1537, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          consumableResources: S.optional(__S(1538, __c48, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListConsumableResourcesResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(32, __c1, 0)) }),
      ).annotate({ identifier: "KeyValuesPair" });
    case 1:
      return S.Array(__S(1568, __c49, 0));
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobQueue: S.optional(S.String),
          arrayJobId: S.optional(S.String),
          multiNodeJobId: S.optional(S.String),
          jobStatus: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(1569, __c49, 1)),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/v1/listjobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ exitCode: S.optional(S.Number), reason: S.optional(S.String) }),
      ).annotate({ identifier: "ContainerSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          size: S.optional(S.Number),
          index: S.optional(S.Number),
          statusSummary: S.optional(__S(1216, __c38, 0)),
          statusSummaryLastUpdatedAt: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ArrayPropertiesSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          isMainNode: S.optional(S.Boolean),
          numNodes: S.optional(S.Number),
          nodeIndex: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NodePropertiesSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobId: S.optional(S.String),
          jobName: S.optional(S.String),
          capacityUsage: S.optional(__S(1409, __c44, 1)),
          createdAt: S.optional(S.Number),
          scheduledAt: S.optional(S.Number),
          shareIdentifier: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          startedAt: S.optional(S.Number),
          stoppedAt: S.optional(S.Number),
          container: S.optional(__S(1601, __c50, 1)),
          arrayProperties: S.optional(__S(1602, __c50, 2)),
          nodeProperties: S.optional(__S(1603, __c50, 3)),
          jobDefinition: S.optional(S.String),
          isCancelled: S.optional(S.Boolean),
          isTerminated: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "JobSummary" });
    case 5:
      return S.Array(__S(1604, __c50, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          jobSummaryList: S.optional(__S(1605, __c50, 5)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          consumableResource: S.optional(S.String),
          filters: S.optional(__S(1569, __c49, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/listjobsbyconsumableresource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobsByConsumableResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobQueueArn: S.optional(S.String),
          jobName: S.optional(S.String),
          jobDefinitionArn: S.optional(S.String),
          shareIdentifier: S.optional(S.String),
          jobStatus: S.optional(S.String),
          quantity: S.optional(S.Number),
          statusReason: S.optional(S.String),
          startedAt: S.optional(S.Number),
          createdAt: S.optional(S.Number),
          consumableResourceProperties: S.optional(__S(1026, __c32, 2)),
        }),
      ).annotate({ identifier: "ListJobsByConsumableResourceSummary" });
    case 2:
      return S.Array(__S(1633, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(1634, __c51, 2)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListJobsByConsumableResourceResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobQueue: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/listquotashares" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQuotaSharesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          quotaShareName: S.optional(S.String),
          quotaShareArn: S.optional(S.String),
          jobQueueArn: S.optional(S.String),
          capacityLimits: S.optional(__S(417, __c13, 1)),
          resourceSharingConfiguration: S.optional(__S(448, __c14, 0)),
          preemptionConfiguration: S.optional(__S(449, __c14, 1)),
          state: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "QuotaShareDetail" });
    case 2:
      return S.Array(__S(1665, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          quotaShares: S.optional(__S(1666, __c52, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListQuotaSharesResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/listschedulingpolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSchedulingPoliciesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "SchedulingPolicyListingDetail",
      });
    case 2:
      return S.Array(__S(1697, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          schedulingPolicies: S.optional(__S(1698, __c53, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSchedulingPoliciesResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobQueue: S.optional(S.String),
          jobStatus: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filters: S.optional(__S(1569, __c49, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/listservicejobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListServiceJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          latestAttempt: S.optional(__S(1441, __c45, 1)),
          capacityUsage: S.optional(__S(1409, __c44, 1)),
          createdAt: S.optional(S.Number),
          jobArn: S.optional(S.String),
          jobId: S.optional(S.String),
          jobName: S.optional(S.String),
          scheduledAt: S.optional(S.Number),
          serviceJobType: S.optional(S.String),
          shareIdentifier: S.optional(S.String),
          quotaShareName: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          startedAt: S.optional(S.Number),
          stoppedAt: S.optional(S.Number),
          isTerminated: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ServiceJobSummary" });
    case 2:
      return S.Array(__S(1729, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobSummaryList: S.optional(__S(1730, __c54, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListServiceJobsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(128, __c4, 0)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobDefinitionName: S.optional(S.String),
          type: S.optional(S.String),
          parameters: S.optional(__S(128, __c4, 0)),
          schedulingPriority: S.optional(S.Number),
          containerProperties: S.optional(__S(1080, __c33, 24)),
          nodeProperties: S.optional(__S(1106, __c34, 18)),
          retryStrategy: S.optional(__S(1122, __c35, 2)),
          propagateTags: S.optional(S.Boolean),
          timeout: S.optional(__S(992, __c31, 0)),
          tags: S.optional(__S(128, __c4, 0)),
          platformCapabilities: S.optional(__S(1066, __c33, 10)),
          eksProperties: S.optional(__S(1103, __c34, 15)),
          ecsProperties: S.optional(__S(1088, __c34, 0)),
          consumableResourceProperties: S.optional(__S(1026, __c32, 2)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/registerjobdefinition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterJobDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobDefinitionName: S.optional(S.String),
          jobDefinitionArn: S.optional(S.String),
          revision: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "RegisterJobDefinitionResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ size: S.optional(S.Number) })).annotate({
        identifier: "ArrayProperties",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vcpus: S.optional(S.Number),
          memory: S.optional(S.Number),
          command: S.optional(__S(32, __c1, 0)),
          instanceType: S.optional(S.String),
          environment: S.optional(__S(1124, __c35, 4)),
          resourceRequirements: S.optional(__S(1126, __c35, 6)),
        }),
      ).annotate({ identifier: "ContainerOverrides" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          command: S.optional(__S(32, __c1, 0)),
          environment: S.optional(__S(1124, __c35, 4)),
          name: S.optional(S.String),
          resourceRequirements: S.optional(__S(1126, __c35, 6)),
        }),
      ).annotate({ identifier: "TaskContainerOverrides" });
    case 3:
      return S.Array(__S(1826, __c57, 2));
    case 4:
      return S.suspend(() => S.Struct({ containers: S.optional(__S(1827, __c57, 3)) })).annotate({
        identifier: "TaskPropertiesOverride",
      });
    case 5:
      return S.Array(__S(1828, __c57, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ taskProperties: S.optional(__S(1829, __c57, 5)) }),
      ).annotate({ identifier: "EcsPropertiesOverride" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          image: S.optional(S.String),
          command: S.optional(__S(32, __c1, 0)),
          args: S.optional(__S(32, __c1, 0)),
          env: S.optional(__S(1124, __c35, 4)),
          resources: S.optional(__S(1127, __c35, 7)),
        }),
      ).annotate({ identifier: "EksContainerOverride" });
    case 8:
      return S.Array(__S(1831, __c57, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          containers: S.optional(__S(1832, __c57, 8)),
          initContainers: S.optional(__S(1832, __c57, 8)),
          metadata: S.optional(__S(1128, __c35, 8)),
        }),
      ).annotate({ identifier: "EksPodPropertiesOverride" });
    case 10:
      return S.suspend(() => S.Struct({ podProperties: S.optional(__S(1833, __c57, 9)) })).annotate(
        { identifier: "EksPropertiesOverride" },
      );
    case 11:
      return S.suspend(() =>
        S.Struct({
          targetNodes: S.optional(S.String),
          containerOverrides: S.optional(__S(1825, __c57, 1)),
          ecsPropertiesOverride: S.optional(__S(1830, __c57, 6)),
          instanceTypes: S.optional(__S(32, __c1, 0)),
          eksPropertiesOverride: S.optional(__S(1834, __c57, 10)),
          consumableResourcePropertiesOverride: S.optional(__S(1026, __c32, 2)),
        }),
      ).annotate({ identifier: "NodePropertyOverride" });
    case 12:
      return S.Array(__S(1835, __c57, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          numNodes: S.optional(S.Number),
          nodePropertyOverrides: S.optional(__S(1836, __c57, 12)),
        }),
      ).annotate({ identifier: "NodeOverrides" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          jobQueue: S.optional(S.String),
          shareIdentifier: S.optional(S.String),
          schedulingPriorityOverride: S.optional(S.Number),
          arrayProperties: S.optional(__S(1824, __c57, 0)),
          dependsOn: S.optional(__S(1249, __c39, 1)),
          jobDefinition: S.optional(S.String),
          parameters: S.optional(__S(128, __c4, 0)),
          containerOverrides: S.optional(__S(1825, __c57, 1)),
          nodeOverrides: S.optional(__S(1837, __c57, 13)),
          retryStrategy: S.optional(__S(1122, __c35, 2)),
          propagateTags: S.optional(S.Boolean),
          timeout: S.optional(__S(992, __c31, 0)),
          tags: S.optional(__S(128, __c4, 0)),
          eksPropertiesOverride: S.optional(__S(1834, __c57, 10)),
          ecsPropertiesOverride: S.optional(__S(1830, __c57, 6)),
          consumableResourcePropertiesOverride: S.optional(__S(1026, __c32, 2)),
        }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/v1/submitjob" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SubmitJobRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobName: S.optional(S.String),
          jobId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "SubmitJobResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          jobQueue: S.optional(S.String),
          retryStrategy: S.optional(__S(1474, __c46, 2)),
          schedulingPriority: S.optional(S.Number),
          serviceRequestPayload: S.optional(S.String),
          serviceJobType: S.optional(S.String),
          shareIdentifier: S.optional(S.String),
          quotaShareName: S.optional(S.String),
          preemptionConfiguration: S.optional(__S(1475, __c46, 3)),
          timeoutConfig: S.optional(__S(992, __c31, 0)),
          tags: S.optional(__S(128, __c4, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/submitservicejob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SubmitServiceJobRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: S.optional(__S(128, __c4, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String), reason: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/terminatejob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateJobRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(32, __c1, 0)), reason: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/terminatejobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateJobsRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String), reason: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/terminateservicejob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateServiceJobRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(32, __c1, 0)), reason: S.optional(S.String) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/terminateservicejobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TerminateServiceJobsRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: S.optional(__S(32, __c1, 0)).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ec2InstanceProfileArn: S.optional(S.String),
          networkConfiguration: S.optional(__S(198, __c6, 6)),
          instanceRequirements: S.optional(__S(199, __c6, 7)),
          storageConfiguration: S.optional(__S(200, __c6, 8)),
          monitoring: S.optional(S.String),
          capacityReservations: S.optional(__S(201, __c6, 9)),
          instanceMetadataTagsPropagation: S.optional(S.Boolean),
          localStorageConfiguration: S.optional(__S(202, __c6, 10)),
        }),
      ).annotate({ identifier: "InstanceLaunchTemplateUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          propagateTags: S.optional(S.String),
          infrastructureRoleArn: S.optional(S.String),
          instanceLaunchTemplate: S.optional(__S(2112, __c66, 0)),
          infrastructureOptimization: S.optional(__S(203, __c6, 11)),
        }),
      ).annotate({ identifier: "UpdateManagedInstancesProviderConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          minvCpus: S.optional(S.Number),
          maxvCpus: S.optional(S.Number),
          desiredvCpus: S.optional(S.Number),
          subnets: S.optional(__S(32, __c1, 0)),
          securityGroupIds: S.optional(__S(32, __c1, 0)),
          allocationStrategy: S.optional(S.String),
          instanceTypes: S.optional(__S(32, __c1, 0)),
          ec2KeyPair: S.optional(S.String),
          instanceRole: S.optional(S.String),
          tags: S.optional(__S(128, __c4, 0)),
          placementGroup: S.optional(S.String),
          bidPercentage: S.optional(S.Number),
          launchTemplate: S.optional(__S(194, __c6, 2)),
          ec2Configuration: S.optional(__S(196, __c6, 4)),
          updateToLatestImageVersion: S.optional(S.Boolean),
          type: S.optional(S.String),
          imageId: S.optional(S.String),
          scalingPolicy: S.optional(__S(197, __c6, 5)),
          managedInstancesProvider: S.optional(__S(2113, __c66, 1)),
          capacityTags: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "ComputeResourceUpdate" });
    case 3:
      return S.suspend(() => S.Struct({ accessEntry: S.optional(__S(204, __c6, 12)) })).annotate({
        identifier: "EksConfigurationUpdate",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          computeEnvironment: S.optional(S.String),
          state: S.optional(S.String),
          unmanagedvCpus: S.optional(S.Number),
          computeResources: S.optional(__S(2114, __c66, 2)),
          serviceRole: S.optional(S.String),
          updatePolicy: S.optional(__S(896, __c28, 0)),
          context: S.optional(S.String),
          ecsSettings: S.optional(__S(205, __c6, 13)),
          eksConfiguration: S.optional(__S(2115, __c66, 3)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/updatecomputeenvironment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateComputeEnvironmentRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          consumableResource: S.optional(S.String),
          operation: S.optional(S.String),
          quantity: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/updateconsumableresource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateConsumableResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          consumableResourceName: S.optional(S.String),
          consumableResourceArn: S.optional(S.String),
          totalQuantity: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateConsumableResourceResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobQueue: S.optional(S.String),
          state: S.optional(S.String),
          schedulingPolicyArn: S.optional(S.String),
          priority: S.optional(S.Number),
          computeEnvironmentOrder: S.optional(__S(321, __c10, 1)),
          serviceEnvironmentOrder: S.optional(__S(323, __c10, 3)),
          jobStateTimeLimitActions: S.optional(__S(325, __c10, 5)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/updatejobqueue" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateJobQueueRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          quotaShareArn: S.optional(S.String),
          capacityLimits: S.optional(__S(417, __c13, 1)),
          resourceSharingConfiguration: S.optional(__S(448, __c14, 0)),
          preemptionConfiguration: S.optional(__S(449, __c14, 1)),
          state: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/updatequotashare" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQuotaShareRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          quotaSharePolicy: S.optional(__S(544, __c17, 0)),
          fairsharePolicy: S.optional(__S(547, __c17, 3)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/updateschedulingpolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSchedulingPolicyRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceEnvironment: S.optional(S.String),
          state: S.optional(S.String),
          capacityLimits: S.optional(__S(417, __c13, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/updateserviceenvironment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateServiceEnvironmentRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String), schedulingPriority: S.optional(S.Number) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v1/updateservicejob" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateServiceJobRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.optional(S.String), reason: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/v1/canceljob" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelJobRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "CancelJobResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
