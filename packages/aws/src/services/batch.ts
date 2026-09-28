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
  sdkId: "Batch",
  target: "AWSBatchV20160810",
  version: "2016-08-10",
  sigv4: "batch",
  protocol: restJson1Protocol,
  xmlns: "http://batch.amazonaws.com/doc/2016-08-10/",
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
              return e(
                `https://batch-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://batch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://batch.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ClientException
  extends /*@__PURE__*/ TE.TaggedError("ClientException", ["BadRequestError"], {
    status: 400,
  })<{ readonly message?: string }> {}
export class ComputeEnvironmentBeingModified
  extends /*@__PURE__*/ TE.TaggedError(
    "ComputeEnvironmentBeingModified",
    ["ConflictError", "RetryableError"],
    {
      synthetic: {
        from: "ClientException",
        message: { includes: "is being modified" },
      },
    },
  )<{ readonly message?: string }> {}
export class ComputeEnvironmentInUse
  extends /*@__PURE__*/ TE.TaggedError(
    "ComputeEnvironmentInUse",
    ["DependencyViolationError", "RetryableError"],
    {
      synthetic: {
        from: "ClientException",
        message: { includes: "found existing JobQueue relationship" },
      },
    },
  )<{ readonly message?: string }> {}
export class ComputeEnvironmentNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "ComputeEnvironmentNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "ClientException",
        message: { matches: "compute-environment/.* does not exist" },
      },
    },
  )<{ readonly message?: string }> {}
export class ComputeEnvironmentNotValid
  extends /*@__PURE__*/ TE.TaggedError(
    "ComputeEnvironmentNotValid",
    ["DependencyViolationError", "RetryableError"],
    {
      synthetic: {
        from: "ClientException",
        message: { matches: "must be (created and )?valid before attaching" },
      },
    },
  )<{ readonly message?: string }> {}
export class JobQueueAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "JobQueueAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "ClientException",
        message: { includes: "already exists" },
      },
    },
  )<{ readonly message?: string }> {}
export class JobQueueBeingModified
  extends /*@__PURE__*/ TE.TaggedError(
    "JobQueueBeingModified",
    ["ConflictError", "RetryableError"],
    {
      synthetic: {
        from: "ClientException",
        message: { includes: "is being modified" },
      },
    },
  )<{ readonly message?: string }> {}
export class JobQueueNotFound
  extends /*@__PURE__*/ TE.TaggedError("JobQueueNotFound", ["NotFoundError"], {
    synthetic: {
      from: "ClientException",
      message: { matches: "job-queue/.* does not exist" },
    },
  })<{ readonly message?: string }> {}
export class ServerException
  extends /*@__PURE__*/ TE.TaggedError("ServerException", ["ServerError"], {
    status: 500,
  })<{ readonly message?: string }> {}
export interface CancelJobRequest {
  jobId?: string;
  reason?: string;
}
export interface CancelJobResponse {}
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
export type StringList = string[];
export type TagsMap = { [key: string]: string | undefined };
export type UserdataType = "EKS_BOOTSTRAP_SH" | "EKS_NODEADM" | (string & {});
export interface LaunchTemplateSpecificationOverride {
  launchTemplateId?: string;
  launchTemplateName?: string;
  version?: string;
  targetInstanceTypes?: string[];
  userdataType?: UserdataType;
}
export type LaunchTemplateSpecificationOverrideList =
  LaunchTemplateSpecificationOverride[];
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
export interface EksConfiguration {
  eksClusterArn?: string;
  kubernetesNamespace?: string;
}
export type ContainerInsights =
  | "ENABLED"
  | "ENHANCED"
  | "DISABLED"
  | (string & {});
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
export type JobStateTimeLimitActionsAction =
  | "CANCEL"
  | "TERMINATE"
  | (string & {});
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
export type QuotaShareInSharePreemptionState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
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
export type FirelensConfigurationOptionsMap = {
  [key: string]: string | undefined;
};
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
export type EksContainerEnvironmentVariables =
  EksContainerEnvironmentVariable[];
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
export type PlatformCapability =
  | "EC2"
  | "FARGATE"
  | "MANAGED_INSTANCES"
  | (string & {});
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
    retryStrategy: RetryStrategy & {
      evaluateOnExit: (EvaluateOnExit & { action: RetryAction })[];
    };
    containerProperties: ContainerProperties & {
      volumes: (Volume & {
        efsVolumeConfiguration: EFSVolumeConfiguration & {
          fileSystemId: string;
        };
        s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
          fileSystemArn: string;
        };
      })[];
      ulimits: (Ulimit & {
        hardLimit: number;
        name: string;
        softLimit: number;
      })[];
      resourceRequirements: (ResourceRequirement & {
        value: string;
        type: ResourceType;
      })[];
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
      repositoryCredentials: RepositoryCredentials & {
        credentialsParameter: string;
      };
    };
    nodeProperties: NodeProperties & {
      numNodes: number;
      mainNode: number;
      nodeRangeProperties: (NodeRangeProperty & {
        targetNodes: string;
        container: ContainerProperties & {
          volumes: (Volume & {
            efsVolumeConfiguration: EFSVolumeConfiguration & {
              fileSystemId: string;
            };
            s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
              fileSystemArn: string;
            };
          })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
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
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
        };
        ecsProperties: EcsProperties & {
          taskProperties: (EcsTaskProperties & {
            containers: (TaskContainerProperties & {
              image: string;
              firelensConfiguration: FirelensConfiguration & {
                type: FirelensConfigurationType;
              };
              linuxParameters: LinuxParameters & {
                devices: (Device & { hostPath: string })[];
                tmpfs: (Tmpfs & { containerPath: string; size: number })[];
              };
              logConfiguration: LogConfiguration & {
                logDriver: LogDriver;
                secretOptions: (Secret & { name: string; valueFrom: string })[];
              };
              repositoryCredentials: RepositoryCredentials & {
                credentialsParameter: string;
              };
              resourceRequirements: (ResourceRequirement & {
                value: string;
                type: ResourceType;
              })[];
              secrets: (Secret & { name: string; valueFrom: string })[];
              ulimits: (Ulimit & {
                hardLimit: number;
                name: string;
                softLimit: number;
              })[];
            })[];
            ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
            volumes: (Volume & {
              efsVolumeConfiguration: EFSVolumeConfiguration & {
                fileSystemId: string;
              };
              s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
                fileSystemArn: string;
              };
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
              persistentVolumeClaim: EksPersistentVolumeClaim & {
                claimName: string;
              };
            })[];
          };
        };
      })[];
    };
    ecsProperties: EcsProperties & {
      taskProperties: (EcsTaskProperties & {
        containers: (TaskContainerProperties & {
          image: string;
          firelensConfiguration: FirelensConfiguration & {
            type: FirelensConfigurationType;
          };
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
          secrets: (Secret & { name: string; valueFrom: string })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
        })[];
        ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
        volumes: (Volume & {
          efsVolumeConfiguration: EFSVolumeConfiguration & {
            fileSystemId: string;
          };
          s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
            fileSystemArn: string;
          };
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
          persistentVolumeClaim: EksPersistentVolumeClaim & {
            claimName: string;
          };
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
    retryStrategy: RetryStrategy & {
      evaluateOnExit: (EvaluateOnExit & { action: RetryAction })[];
    };
    container: ContainerDetail & {
      volumes: (Volume & {
        efsVolumeConfiguration: EFSVolumeConfiguration & {
          fileSystemId: string;
        };
        s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
          fileSystemArn: string;
        };
      })[];
      ulimits: (Ulimit & {
        hardLimit: number;
        name: string;
        softLimit: number;
      })[];
      resourceRequirements: (ResourceRequirement & {
        value: string;
        type: ResourceType;
      })[];
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
      repositoryCredentials: RepositoryCredentials & {
        credentialsParameter: string;
      };
    };
    nodeProperties: NodeProperties & {
      numNodes: number;
      mainNode: number;
      nodeRangeProperties: (NodeRangeProperty & {
        targetNodes: string;
        container: ContainerProperties & {
          volumes: (Volume & {
            efsVolumeConfiguration: EFSVolumeConfiguration & {
              fileSystemId: string;
            };
            s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
              fileSystemArn: string;
            };
          })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
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
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
        };
        ecsProperties: EcsProperties & {
          taskProperties: (EcsTaskProperties & {
            containers: (TaskContainerProperties & {
              image: string;
              firelensConfiguration: FirelensConfiguration & {
                type: FirelensConfigurationType;
              };
              linuxParameters: LinuxParameters & {
                devices: (Device & { hostPath: string })[];
                tmpfs: (Tmpfs & { containerPath: string; size: number })[];
              };
              logConfiguration: LogConfiguration & {
                logDriver: LogDriver;
                secretOptions: (Secret & { name: string; valueFrom: string })[];
              };
              repositoryCredentials: RepositoryCredentials & {
                credentialsParameter: string;
              };
              resourceRequirements: (ResourceRequirement & {
                value: string;
                type: ResourceType;
              })[];
              secrets: (Secret & { name: string; valueFrom: string })[];
              ulimits: (Ulimit & {
                hardLimit: number;
                name: string;
                softLimit: number;
              })[];
            })[];
            ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
            volumes: (Volume & {
              efsVolumeConfiguration: EFSVolumeConfiguration & {
                fileSystemId: string;
              };
              s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
                fileSystemArn: string;
              };
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
              persistentVolumeClaim: EksPersistentVolumeClaim & {
                claimName: string;
              };
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
          persistentVolumeClaim: EksPersistentVolumeClaim & {
            claimName: string;
          };
        })[];
      };
    };
    ecsProperties: EcsPropertiesDetail & {
      taskProperties: (EcsTaskDetails & {
        containers: (TaskContainerDetails & {
          firelensConfiguration: FirelensConfiguration & {
            type: FirelensConfigurationType;
          };
          linuxParameters: LinuxParameters & {
            devices: (Device & { hostPath: string })[];
            tmpfs: (Tmpfs & { containerPath: string; size: number })[];
          };
          logConfiguration: LogConfiguration & {
            logDriver: LogDriver;
            secretOptions: (Secret & { name: string; valueFrom: string })[];
          };
          repositoryCredentials: RepositoryCredentials & {
            credentialsParameter: string;
          };
          resourceRequirements: (ResourceRequirement & {
            value: string;
            type: ResourceType;
          })[];
          secrets: (Secret & { name: string; valueFrom: string })[];
          ulimits: (Ulimit & {
            hardLimit: number;
            name: string;
            softLimit: number;
          })[];
        })[];
        ephemeralStorage: EphemeralStorage & { sizeInGiB: number };
        volumes: (Volume & {
          efsVolumeConfiguration: EFSVolumeConfiguration & {
            fileSystemId: string;
          };
          s3filesVolumeConfiguration: S3FilesVolumeConfiguration & {
            fileSystemArn: string;
          };
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
  capacityLimits?: (QuotaShareCapacityLimit & {
    maxCapacity: number;
    capacityUnit: string;
  })[];
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
    serviceResourceId: ServiceResourceId & {
      name: ServiceResourceIdName;
      value: string;
    };
  })[];
  capacityUsage?: ServiceJobCapacityUsageDetail[];
  createdAt?: number;
  isTerminated?: boolean;
  jobArn?: string;
  jobId: string;
  jobName: string;
  jobQueue: string;
  latestAttempt?: LatestServiceJobAttempt & {
    serviceResourceId: ServiceResourceId & {
      name: ServiceResourceIdName;
      value: string;
    };
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
      serviceResourceId: ServiceResourceId & {
        name: ServiceResourceIdName;
        value: string;
      };
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
export type ListJobsByConsumableResourceSummaryList =
  ListJobsByConsumableResourceSummary[];
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
    capacityLimits: (QuotaShareCapacityLimit & {
      maxCapacity: number;
      capacityUnit: string;
    })[];
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
export type ServiceJobCapacityUsageSummaryList =
  ServiceJobCapacityUsageSummary[];
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
}
export type ServiceJobSummaryList = ServiceJobSummary[];
export interface ListServiceJobsResponse {
  jobSummaryList: (ServiceJobSummary & {
    jobId: string;
    jobName: string;
    serviceJobType: ServiceJobType;
    latestAttempt: LatestServiceJobAttempt & {
      serviceResourceId: ServiceResourceId & {
        name: ServiceResourceIdName;
        value: string;
      };
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
export interface TerminateServiceJobRequest {
  jobId?: string;
  reason?: string;
}
export interface TerminateServiceJobResponse {}
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
export interface UpdateComputeEnvironmentRequest {
  computeEnvironment?: string;
  state?: CEState;
  unmanagedvCpus?: number;
  computeResources?: ComputeResourceUpdate;
  serviceRole?: string;
  updatePolicy?: UpdatePolicy;
  context?: string;
  ecsSettings?: EcsSettings;
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
 * A `PENDING` job is canceled after all dependency jobs are completed.
 * Therefore, it may take longer than expected to cancel a job in `PENDING`
 * status.
 *
 * When you try to cancel an array parent job in `PENDING`, Batch attempts to
 * cancel all child jobs. The array parent job is canceled when all child jobs are
 * completed.
 *
 * Jobs that progressed to the `STARTING` or
 * `RUNNING` state aren't canceled. However, the API operation still succeeds, even
 * if no job is canceled. These jobs must be terminated with the TerminateJob
 * operation.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/canceljob",
    input: { jobId: 0, reason: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
})) as any;

export type CreateComputeEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/createcomputeenvironment",
    input: {
      computeEnvironmentName: 0,
      type: 0,
      state: 0,
      unmanagedvCpus: 0,
      computeResources: {
        type: 0,
        allocationStrategy: 0,
        minvCpus: 0,
        maxvCpus: 0,
        desiredvCpus: 0,
        instanceTypes: 0,
        imageId: 0,
        subnets: 0,
        securityGroupIds: 0,
        ec2KeyPair: 0,
        instanceRole: 0,
        tags: 0,
        placementGroup: 0,
        bidPercentage: 0,
        spotIamFleetRole: 0,
        launchTemplate: i_LaunchTemplateSpecification,
        ec2Configuration: D.list(i_Ec2Configuration),
        scalingPolicy: i_ComputeScalingPolicy,
        managedInstancesProvider: {
          propagateTags: 0,
          infrastructureRoleArn: 0,
          instanceLaunchTemplate: {
            ec2InstanceProfileArn: 0,
            networkConfiguration: i_ManagedInstancesNetworkConfiguration,
            instanceRequirements: i_InstanceRequirementsRequest,
            capacityOptionType: 0,
            storageConfiguration: i_ManagedInstancesStorageConfiguration,
            monitoring: 0,
            fipsEnabled: 0,
            capacityReservations: i_CapacityReservationRequest,
            instanceMetadataTagsPropagation: 0,
            localStorageConfiguration:
              i_ManagedInstancesLocalStorageConfiguration,
          },
          infrastructureOptimization: i_InfrastructureOptimization,
        },
        capacityTags: 0,
      },
      serviceRole: 0,
      tags: 0,
      eksConfiguration: { eksClusterArn: 0, kubernetesNamespace: 0 },
      context: 0,
      ecsSettings: i_EcsSettings,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComputeEnvironment",
})) as any;

export type CreateConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates an Batch consumable resource.
 */
export const createConsumableResource: API.OperationMethod<
  CreateConsumableResourceRequest,
  CreateConsumableResourceResponse,
  CreateConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/createconsumableresource",
    input: {
      consumableResourceName: 0,
      totalQuantity: 0,
      resourceType: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConsumableResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/createjobqueue",
    input: {
      jobQueueName: 0,
      state: 0,
      schedulingPolicyArn: 0,
      priority: 0,
      computeEnvironmentOrder: D.list(i_ComputeEnvironmentOrder),
      serviceEnvironmentOrder: D.list(i_ServiceEnvironmentOrder),
      jobQueueType: 0,
      tags: 0,
      jobStateTimeLimitActions: D.list(i_JobStateTimeLimitAction),
    },
    body: true,
  },
  errors: [
    ClientException,
    ServerException,
    ComputeEnvironmentNotValid,
    JobQueueAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobQueue",
})) as any;

export type CreateQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates an Batch quota share. Each quota share operates as a virtual queue with a configured compute capacity, resource sharing strategy, and borrow limits.
 */
export const createQuotaShare: API.OperationMethod<
  CreateQuotaShareRequest,
  CreateQuotaShareResponse,
  CreateQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/createquotashare",
    input: {
      quotaShareName: 0,
      jobQueue: 0,
      capacityLimits: D.list(i_QuotaShareCapacityLimit),
      resourceSharingConfiguration: i_QuotaShareResourceSharingConfiguration,
      preemptionConfiguration: i_QuotaSharePreemptionConfiguration,
      state: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuotaShare",
})) as any;

export type CreateSchedulingPolicyError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates an Batch scheduling policy.
 */
export const createSchedulingPolicy: API.OperationMethod<
  CreateSchedulingPolicyRequest,
  CreateSchedulingPolicyResponse,
  CreateSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/createschedulingpolicy",
    input: {
      name: 0,
      quotaSharePolicy: i_QuotaSharePolicy,
      fairsharePolicy: i_FairsharePolicy,
      tags: 0,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchedulingPolicy",
})) as any;

export type CreateServiceEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Creates a service environment for running service jobs. Service environments define capacity limits for specific service types such as SageMaker Training jobs.
 */
export const createServiceEnvironment: API.OperationMethod<
  CreateServiceEnvironmentRequest,
  CreateServiceEnvironmentResponse,
  CreateServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/createserviceenvironment",
    input: {
      serviceEnvironmentName: 0,
      serviceEnvironmentType: 0,
      state: 0,
      capacityLimits: D.list(i_CapacityLimit),
      tags: 0,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceEnvironment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/deletecomputeenvironment",
    input: { computeEnvironment: 0 },
    body: true,
  },
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
})) as any;

export type DeleteConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes the specified consumable resource.
 */
export const deleteConsumableResource: API.OperationMethod<
  DeleteConsumableResourceRequest,
  DeleteConsumableResourceResponse,
  DeleteConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/deleteconsumableresource",
    input: { consumableResource: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConsumableResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/deletejobqueue",
    input: { jobQueue: 0 },
    body: true,
  },
  errors: [
    ClientException,
    ServerException,
    JobQueueNotFound,
    JobQueueBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobQueue",
})) as any;

export type DeleteQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/deletequotashare",
    input: { quotaShareArn: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuotaShare",
})) as any;

export type DeleteSchedulingPolicyError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/deleteschedulingpolicy",
    input: { arn: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedulingPolicy",
})) as any;

export type DeleteServiceEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes a Service environment. Before you can delete a service environment, you must first set its state to `DISABLED` with the `UpdateServiceEnvironment` API operation and disassociate it from any job queues with the `UpdateJobQueue` API operation.
 */
export const deleteServiceEnvironment: API.OperationMethod<
  DeleteServiceEnvironmentRequest,
  DeleteServiceEnvironmentResponse,
  DeleteServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/deleteserviceenvironment",
    input: { serviceEnvironment: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceEnvironment",
})) as any;

export type DeregisterJobDefinitionError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/deregisterjobdefinition",
    input: { jobDefinition: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterJobDefinition",
})) as any;

export type DescribeComputeEnvironmentsError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/describecomputeenvironments",
    input: { computeEnvironments: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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

export type DescribeConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a description of the specified consumable resource.
 */
export const describeConsumableResource: API.OperationMethod<
  DescribeConsumableResourceRequest,
  DescribeConsumableResourceResponse,
  DescribeConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/describeconsumableresource",
    input: { consumableResource: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConsumableResource",
})) as any;

export type DescribeJobDefinitionsError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/describejobdefinitions",
    input: {
      jobDefinitions: 0,
      maxResults: 0,
      jobDefinitionName: 0,
      status: 0,
      nextToken: 0,
    },
    body: true,
  },
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

export type DescribeJobQueuesError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/describejobqueues",
    input: { jobQueues: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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

export type DescribeJobsError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes a list of Batch jobs.
 */
export const describeJobs: API.OperationMethod<
  DescribeJobsRequest,
  DescribeJobsResponse,
  DescribeJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/describejobs",
    input: { jobs: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobs",
})) as any;

export type DescribeQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Returns a description of the specified quota share.
 */
export const describeQuotaShare: API.OperationMethod<
  DescribeQuotaShareRequest,
  DescribeQuotaShareResponse,
  DescribeQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/describequotashare",
    input: { quotaShareArn: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuotaShare",
})) as any;

export type DescribeSchedulingPoliciesError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more of your scheduling policies.
 */
export const describeSchedulingPolicies: API.OperationMethod<
  DescribeSchedulingPoliciesRequest,
  DescribeSchedulingPoliciesResponse,
  DescribeSchedulingPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/describeschedulingpolicies",
    input: { arns: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedulingPolicies",
})) as any;

export type DescribeServiceEnvironmentsError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/describeserviceenvironments",
    input: { serviceEnvironments: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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

export type DescribeServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * The details of a service job.
 */
export const describeServiceJob: API.OperationMethod<
  DescribeServiceJobRequest,
  DescribeServiceJobResponse,
  DescribeServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/describeservicejob",
    input: { jobId: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceJob",
})) as any;

export type GetJobQueueSnapshotError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/getjobqueuesnapshot",
    input: { jobQueue: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobQueueSnapshot",
})) as any;

export type ListConsumableResourcesError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/listconsumableresources",
    input: { filters: D.list(i_KeyValuesPair), maxResults: 0, nextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /v1/listjobs",
    input: {
      jobQueue: 0,
      arrayJobId: 0,
      multiNodeJobId: 0,
      jobStatus: 0,
      maxResults: 0,
      nextToken: 0,
      filters: D.list(i_KeyValuesPair),
    },
    body: true,
  },
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

export type ListJobsByConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/listjobsbyconsumableresource",
    input: {
      consumableResource: 0,
      filters: D.list(i_KeyValuesPair),
      maxResults: 0,
      nextToken: 0,
    },
    body: true,
  },
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

export type ListQuotaSharesError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/listquotashares",
    input: { jobQueue: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
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

export type ListSchedulingPoliciesError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/listschedulingpolicies",
    input: { maxResults: 0, nextToken: 0 },
    body: true,
  },
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

export type ListServiceJobsError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/listservicejobs",
    input: {
      jobQueue: 0,
      jobStatus: 0,
      maxResults: 0,
      nextToken: 0,
      filters: D.list(i_KeyValuesPair),
    },
    body: true,
  },
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

export type ListTagsForResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RegisterJobDefinitionError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Registers an Batch job definition.
 */
export const registerJobDefinition: API.OperationMethod<
  RegisterJobDefinitionRequest,
  RegisterJobDefinitionResponse,
  RegisterJobDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/registerjobdefinition",
    input: {
      jobDefinitionName: 0,
      type: 0,
      parameters: 0,
      schedulingPriority: 0,
      containerProperties: i_ContainerProperties,
      nodeProperties: {
        numNodes: 0,
        mainNode: 0,
        nodeRangeProperties: D.list({
          targetNodes: 0,
          container: i_ContainerProperties,
          instanceTypes: 0,
          ecsProperties: i_EcsProperties,
          eksProperties: i_EksProperties,
          consumableResourceProperties: i_ConsumableResourceProperties,
        }),
      },
      retryStrategy: i_RetryStrategy,
      propagateTags: 0,
      timeout: i_JobTimeout,
      tags: 0,
      platformCapabilities: 0,
      eksProperties: i_EksProperties,
      ecsProperties: i_EcsProperties,
      consumableResourceProperties: i_ConsumableResourceProperties,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterJobDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/submitjob",
    input: {
      jobName: 0,
      jobQueue: 0,
      shareIdentifier: 0,
      schedulingPriorityOverride: 0,
      arrayProperties: { size: 0 },
      dependsOn: D.list({ jobId: 0, type: 0 }),
      jobDefinition: 0,
      parameters: 0,
      containerOverrides: i_ContainerOverrides,
      nodeOverrides: {
        numNodes: 0,
        nodePropertyOverrides: D.list({
          targetNodes: 0,
          containerOverrides: i_ContainerOverrides,
          ecsPropertiesOverride: i_EcsPropertiesOverride,
          instanceTypes: 0,
          eksPropertiesOverride: i_EksPropertiesOverride,
          consumableResourcePropertiesOverride: i_ConsumableResourceProperties,
        }),
      },
      retryStrategy: i_RetryStrategy,
      propagateTags: 0,
      timeout: i_JobTimeout,
      tags: 0,
      eksPropertiesOverride: i_EksPropertiesOverride,
      ecsPropertiesOverride: i_EcsPropertiesOverride,
      consumableResourcePropertiesOverride: i_ConsumableResourceProperties,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitJob",
})) as any;

export type SubmitServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Submits a service job to a specified job queue to run on SageMaker AI. A service job is a unit of work that you submit to Batch for execution on SageMaker AI.
 */
export const submitServiceJob: API.OperationMethod<
  SubmitServiceJobRequest,
  SubmitServiceJobResponse,
  SubmitServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/submitservicejob",
    input: {
      jobName: 0,
      jobQueue: 0,
      retryStrategy: {
        attempts: 0,
        evaluateOnExit: D.list({ action: 0, onStatusReason: 0 }),
      },
      schedulingPriority: 0,
      serviceRequestPayload: 0,
      serviceJobType: 0,
      shareIdentifier: 0,
      quotaShareName: 0,
      preemptionConfiguration: { preemptionRetriesBeforeTermination: 0 },
      timeoutConfig: { attemptDurationSeconds: 0 },
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitServiceJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type TerminateJobError =
  | ClientException
  | ServerException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /v1/terminatejob",
    input: { jobId: 0, reason: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateJob",
})) as any;

export type TerminateServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Terminates a service job in a job queue.
 */
export const terminateServiceJob: API.OperationMethod<
  TerminateServiceJobRequest,
  TerminateServiceJobResponse,
  TerminateServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/terminateservicejob",
    input: { jobId: 0, reason: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateServiceJob",
})) as any;

export type UntagResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Deletes specified tags from an Batch resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/updatecomputeenvironment",
    input: {
      computeEnvironment: 0,
      state: 0,
      unmanagedvCpus: 0,
      computeResources: {
        minvCpus: 0,
        maxvCpus: 0,
        desiredvCpus: 0,
        subnets: 0,
        securityGroupIds: 0,
        allocationStrategy: 0,
        instanceTypes: 0,
        ec2KeyPair: 0,
        instanceRole: 0,
        tags: 0,
        placementGroup: 0,
        bidPercentage: 0,
        launchTemplate: i_LaunchTemplateSpecification,
        ec2Configuration: D.list(i_Ec2Configuration),
        updateToLatestImageVersion: 0,
        type: 0,
        imageId: 0,
        scalingPolicy: i_ComputeScalingPolicy,
        managedInstancesProvider: {
          propagateTags: 0,
          infrastructureRoleArn: 0,
          instanceLaunchTemplate: {
            ec2InstanceProfileArn: 0,
            networkConfiguration: i_ManagedInstancesNetworkConfiguration,
            instanceRequirements: i_InstanceRequirementsRequest,
            storageConfiguration: i_ManagedInstancesStorageConfiguration,
            monitoring: 0,
            capacityReservations: i_CapacityReservationRequest,
            instanceMetadataTagsPropagation: 0,
            localStorageConfiguration:
              i_ManagedInstancesLocalStorageConfiguration,
          },
          infrastructureOptimization: i_InfrastructureOptimization,
        },
        capacityTags: 0,
      },
      serviceRole: 0,
      updatePolicy: { terminateJobsOnUpdate: 0, jobExecutionTimeoutMinutes: 0 },
      context: 0,
      ecsSettings: i_EcsSettings,
    },
    body: true,
  },
  errors: [
    ClientException,
    ServerException,
    ComputeEnvironmentNotFound,
    ComputeEnvironmentBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComputeEnvironment",
})) as any;

export type UpdateConsumableResourceError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a consumable resource.
 */
export const updateConsumableResource: API.OperationMethod<
  UpdateConsumableResourceRequest,
  UpdateConsumableResourceResponse,
  UpdateConsumableResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/updateconsumableresource",
    input: {
      consumableResource: 0,
      operation: 0,
      quantity: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConsumableResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v1/updatejobqueue",
    input: {
      jobQueue: 0,
      state: 0,
      schedulingPolicyArn: 0,
      priority: 0,
      computeEnvironmentOrder: D.list(i_ComputeEnvironmentOrder),
      serviceEnvironmentOrder: D.list(i_ServiceEnvironmentOrder),
      jobStateTimeLimitActions: D.list(i_JobStateTimeLimitAction),
    },
    body: true,
  },
  errors: [
    ClientException,
    ServerException,
    JobQueueNotFound,
    JobQueueBeingModified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobQueue",
})) as any;

export type UpdateQuotaShareError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a quota share.
 */
export const updateQuotaShare: API.OperationMethod<
  UpdateQuotaShareRequest,
  UpdateQuotaShareResponse,
  UpdateQuotaShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/updatequotashare",
    input: {
      quotaShareArn: 0,
      capacityLimits: D.list(i_QuotaShareCapacityLimit),
      resourceSharingConfiguration: i_QuotaShareResourceSharingConfiguration,
      preemptionConfiguration: i_QuotaSharePreemptionConfiguration,
      state: 0,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuotaShare",
})) as any;

export type UpdateSchedulingPolicyError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a scheduling policy.
 */
export const updateSchedulingPolicy: API.OperationMethod<
  UpdateSchedulingPolicyRequest,
  UpdateSchedulingPolicyResponse,
  UpdateSchedulingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/updateschedulingpolicy",
    input: {
      arn: 0,
      quotaSharePolicy: i_QuotaSharePolicy,
      fairsharePolicy: i_FairsharePolicy,
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchedulingPolicy",
})) as any;

export type UpdateServiceEnvironmentError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates a service environment. You can update the state of a service environment from `ENABLED` to `DISABLED` to prevent new service jobs from being placed in the service environment.
 */
export const updateServiceEnvironment: API.OperationMethod<
  UpdateServiceEnvironmentRequest,
  UpdateServiceEnvironmentResponse,
  UpdateServiceEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/updateserviceenvironment",
    input: {
      serviceEnvironment: 0,
      state: 0,
      capacityLimits: D.list(i_CapacityLimit),
    },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceEnvironment",
})) as any;

export type UpdateServiceJobError =
  | ClientException
  | ServerException
  | CommonErrors;
/**
 * Updates the priority of a specified service job in an Batch job queue.
 */
export const updateServiceJob: API.OperationMethod<
  UpdateServiceJobRequest,
  UpdateServiceJobResponse,
  UpdateServiceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/updateservicejob",
    input: { jobId: 0, schedulingPriority: 0 },
    body: true,
  },
  errors: [ClientException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceJob",
})) as any;

const i_CapacityLimit: D.LazyStruct = () => ({
  maxCapacity: 0,
  capacityUnit: 0,
});
const i_CapacityReservationRequest: D.LazyStruct = () => ({
  reservationGroupArn: 0,
  reservationPreference: 0,
});
const i_ComputeEnvironmentOrder: D.LazyStruct = () => ({
  order: 0,
  computeEnvironment: 0,
});
const i_ComputeScalingPolicy: D.LazyStruct = () => ({
  minScaleDownDelayMinutes: 0,
});
const i_ConsumableResourceProperties: D.LazyStruct = () => ({
  consumableResourceList: D.list({ consumableResource: 0, quantity: 0 }),
});
const i_ContainerOverrides: D.LazyStruct = () => ({
  vcpus: 0,
  memory: 0,
  command: 0,
  instanceType: 0,
  environment: D.list(i_KeyValuePair),
  resourceRequirements: D.list(i_ResourceRequirement),
});
const i_ContainerProperties: D.LazyStruct = () => ({
  image: 0,
  vcpus: 0,
  memory: 0,
  command: 0,
  jobRoleArn: 0,
  executionRoleArn: 0,
  volumes: D.list(i_Volume),
  environment: D.list(i_KeyValuePair),
  mountPoints: D.list(i_MountPoint),
  readonlyRootFilesystem: 0,
  privileged: 0,
  ulimits: D.list(i_Ulimit),
  user: 0,
  instanceType: 0,
  resourceRequirements: D.list(i_ResourceRequirement),
  linuxParameters: i_LinuxParameters,
  logConfiguration: i_LogConfiguration,
  secrets: D.list(i_Secret),
  networkConfiguration: i_NetworkConfiguration,
  fargatePlatformConfiguration: { platformVersion: 0 },
  enableExecuteCommand: 0,
  ephemeralStorage: i_EphemeralStorage,
  runtimePlatform: i_RuntimePlatform,
  repositoryCredentials: i_RepositoryCredentials,
});
const i_Ec2Configuration: D.LazyStruct = () => ({
  imageType: 0,
  imageIdOverride: 0,
  batchImageStatus: 0,
  imageKubernetesVersion: 0,
});
const i_EcsProperties: D.LazyStruct = () => ({
  taskProperties: D.list({
    containers: D.list({
      command: 0,
      dependsOn: D.list({ containerName: 0, condition: 0 }),
      environment: D.list(i_KeyValuePair),
      essential: 0,
      firelensConfiguration: { type: 0, options: 0 },
      image: 0,
      linuxParameters: i_LinuxParameters,
      logConfiguration: i_LogConfiguration,
      mountPoints: D.list(i_MountPoint),
      name: 0,
      privileged: 0,
      readonlyRootFilesystem: 0,
      repositoryCredentials: i_RepositoryCredentials,
      resourceRequirements: D.list(i_ResourceRequirement),
      secrets: D.list(i_Secret),
      ulimits: D.list(i_Ulimit),
      user: 0,
      startTimeout: 0,
      stopTimeout: 0,
    }),
    ephemeralStorage: i_EphemeralStorage,
    executionRoleArn: 0,
    platformVersion: 0,
    ipcMode: 0,
    taskRoleArn: 0,
    pidMode: 0,
    networkConfiguration: i_NetworkConfiguration,
    runtimePlatform: i_RuntimePlatform,
    volumes: D.list(i_Volume),
    enableExecuteCommand: 0,
    networkMode: 0,
  }),
});
const i_EcsPropertiesOverride: D.LazyStruct = () => ({
  taskProperties: D.list({
    containers: D.list({
      command: 0,
      environment: D.list(i_KeyValuePair),
      name: 0,
      resourceRequirements: D.list(i_ResourceRequirement),
    }),
  }),
});
const i_EcsSettings: D.LazyStruct = () => ({ containerInsights: 0 });
const i_EksProperties: D.LazyStruct = () => ({
  podProperties: {
    serviceAccountName: 0,
    hostNetwork: 0,
    dnsPolicy: 0,
    imagePullSecrets: D.list({ name: 0 }),
    containers: D.list(i_EksContainer),
    initContainers: D.list(i_EksContainer),
    volumes: D.list({
      name: 0,
      hostPath: { path: 0 },
      emptyDir: { medium: 0, sizeLimit: 0 },
      secret: { secretName: 0, optional: 0 },
      persistentVolumeClaim: { claimName: 0, readOnly: 0 },
    }),
    metadata: i_EksMetadata,
    shareProcessNamespace: 0,
  },
});
const i_EksPropertiesOverride: D.LazyStruct = () => ({
  podProperties: {
    containers: D.list(i_EksContainerOverride),
    initContainers: D.list(i_EksContainerOverride),
    metadata: i_EksMetadata,
  },
});
const i_FairsharePolicy: D.LazyStruct = () => ({
  shareDecaySeconds: 0,
  computeReservation: 0,
  shareDistribution: D.list({ shareIdentifier: 0, weightFactor: 0 }),
});
const i_InfrastructureOptimization: D.LazyStruct = () => ({ scaleInAfter: 0 });
const i_InstanceRequirementsRequest: D.LazyStruct = () => ({
  allowedInstanceTypes: 0,
});
const i_JobStateTimeLimitAction: D.LazyStruct = () => ({
  reason: 0,
  state: 0,
  maxTimeSeconds: 0,
  action: 0,
});
const i_JobTimeout: D.LazyStruct = () => ({ attemptDurationSeconds: 0 });
const i_KeyValuesPair: D.LazyStruct = () => ({ name: 0, values: 0 });
const i_LaunchTemplateSpecification: D.LazyStruct = () => ({
  launchTemplateId: 0,
  launchTemplateName: 0,
  version: 0,
  overrides: D.list({
    launchTemplateId: 0,
    launchTemplateName: 0,
    version: 0,
    targetInstanceTypes: 0,
    userdataType: 0,
  }),
  userdataType: 0,
});
const i_ManagedInstancesLocalStorageConfiguration: D.LazyStruct = () => ({
  useLocalStorage: 0,
});
const i_ManagedInstancesNetworkConfiguration: D.LazyStruct = () => ({
  subnets: 0,
  securityGroups: 0,
});
const i_ManagedInstancesStorageConfiguration: D.LazyStruct = () => ({
  storageSizeGiB: 0,
});
const i_QuotaShareCapacityLimit: D.LazyStruct = () => ({
  maxCapacity: 0,
  capacityUnit: 0,
});
const i_QuotaSharePolicy: D.LazyStruct = () => ({
  idleResourceAssignmentStrategy: 0,
});
const i_QuotaSharePreemptionConfiguration: D.LazyStruct = () => ({
  inSharePreemption: 0,
});
const i_QuotaShareResourceSharingConfiguration: D.LazyStruct = () => ({
  strategy: 0,
  borrowLimit: 0,
});
const i_RetryStrategy: D.LazyStruct = () => ({
  attempts: 0,
  evaluateOnExit: D.list({
    onStatusReason: 0,
    onReason: 0,
    onExitCode: 0,
    action: 0,
  }),
});
const i_ServiceEnvironmentOrder: D.LazyStruct = () => ({
  order: 0,
  serviceEnvironment: 0,
});
const i_EksContainer: D.LazyStruct = () => ({
  name: 0,
  image: 0,
  imagePullPolicy: 0,
  command: 0,
  args: 0,
  env: D.list(i_EksContainerEnvironmentVariable),
  resources: i_EksContainerResourceRequirements,
  volumeMounts: D.list({ name: 0, mountPath: 0, subPath: 0, readOnly: 0 }),
  securityContext: {
    runAsUser: 0,
    runAsGroup: 0,
    privileged: 0,
    allowPrivilegeEscalation: 0,
    readOnlyRootFilesystem: 0,
    runAsNonRoot: 0,
  },
});
const i_EksContainerOverride: D.LazyStruct = () => ({
  name: 0,
  image: 0,
  command: 0,
  args: 0,
  env: D.list(i_EksContainerEnvironmentVariable),
  resources: i_EksContainerResourceRequirements,
});
const i_EksMetadata: D.LazyStruct = () => ({
  labels: 0,
  annotations: 0,
  namespace: 0,
});
const i_EphemeralStorage: D.LazyStruct = () => ({ sizeInGiB: 0 });
const i_KeyValuePair: D.LazyStruct = () => ({ name: 0, value: 0 });
const i_LinuxParameters: D.LazyStruct = () => ({
  devices: D.list({ hostPath: 0, containerPath: 0, permissions: 0 }),
  initProcessEnabled: 0,
  sharedMemorySize: 0,
  tmpfs: D.list({ containerPath: 0, size: 0, mountOptions: 0 }),
  maxSwap: 0,
  swappiness: 0,
});
const i_LogConfiguration: D.LazyStruct = () => ({
  logDriver: 0,
  options: 0,
  secretOptions: D.list(i_Secret),
});
const i_MountPoint: D.LazyStruct = () => ({
  containerPath: 0,
  readOnly: 0,
  sourceVolume: 0,
});
const i_NetworkConfiguration: D.LazyStruct = () => ({ assignPublicIp: 0 });
const i_RepositoryCredentials: D.LazyStruct = () => ({
  credentialsParameter: 0,
});
const i_ResourceRequirement: D.LazyStruct = () => ({ value: 0, type: 0 });
const i_RuntimePlatform: D.LazyStruct = () => ({
  operatingSystemFamily: 0,
  cpuArchitecture: 0,
});
const i_Secret: D.LazyStruct = () => ({ name: 0, valueFrom: 0 });
const i_Ulimit: D.LazyStruct = () => ({ hardLimit: 0, name: 0, softLimit: 0 });
const i_Volume: D.LazyStruct = () => ({
  host: { sourcePath: 0 },
  name: 0,
  efsVolumeConfiguration: {
    fileSystemId: 0,
    rootDirectory: 0,
    transitEncryption: 0,
    transitEncryptionPort: 0,
    authorizationConfig: { accessPointId: 0, iam: 0 },
  },
  s3filesVolumeConfiguration: {
    fileSystemArn: 0,
    rootDirectory: 0,
    transitEncryptionPort: 0,
    accessPointArn: 0,
  },
});
const i_EksContainerEnvironmentVariable: D.LazyStruct = () => ({
  name: 0,
  value: 0,
});
const i_EksContainerResourceRequirements: D.LazyStruct = () => ({
  limits: 0,
  requests: 0,
});
