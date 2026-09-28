import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "ECS",
  target: "AmazonEC2ContainerServiceV20141113",
  version: "2014-11-13",
  sigv4: "ecs",
  protocol: awsJson1_1Protocol,
  xmlns: "http://ecs.amazonaws.com/doc/2014-11-13/",
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
                `https://ecs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ecs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ecs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ecs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AttributeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("AttributeLimitExceededException", [
    "QuotaError",
  ])<{ readonly message?: string }> {}
export class BlockedException
  extends /*@__PURE__*/ TE.TaggedError("BlockedException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ClientException
  extends /*@__PURE__*/ TE.TaggedError("ClientException", ["BadRequestError"])<{
    readonly message?: string;
  }> {}
export class ClusterContainsCapacityProviderException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterContainsCapacityProviderException",
    ["DependencyViolationError"],
  )<{ readonly message?: string }> {}
export class ClusterContainsContainerInstancesException
  extends /*@__PURE__*/ TE.TaggedError(
    "ClusterContainsContainerInstancesException",
    ["DependencyViolationError"],
  )<{ readonly message?: string }> {}
export class ClusterContainsServicesException
  extends /*@__PURE__*/ TE.TaggedError("ClusterContainsServicesException", [
    "DependencyViolationError",
  ])<{ readonly message?: string }> {}
export class ClusterContainsTasksException
  extends /*@__PURE__*/ TE.TaggedError("ClusterContainsTasksException", [
    "DependencyViolationError",
  ])<{ readonly message?: string }> {}
export class ClusterNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ClusterNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"])<{
    readonly resourceIds?: string[];
    readonly message?: string;
  }> {}
export class DaemonNotActiveException
  extends /*@__PURE__*/ TE.TaggedError("DaemonNotActiveException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class DaemonNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("DaemonNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [
    "QuotaError",
  ])<{ readonly message?: string }> {}
export class MissingVersionException
  extends /*@__PURE__*/ TE.TaggedError("MissingVersionException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class NamespaceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("NamespaceNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class NoUpdateAvailableException
  extends /*@__PURE__*/ TE.TaggedError("NoUpdateAvailableException")<{
    readonly message?: string;
  }> {}
export class PlatformTaskDefinitionIncompatibilityException
  extends /*@__PURE__*/ TE.TaggedError(
    "PlatformTaskDefinitionIncompatibilityException",
    ["BadRequestError"],
  )<{ readonly message?: string }> {}
export class PlatformUnknownException
  extends /*@__PURE__*/ TE.TaggedError("PlatformUnknownException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ServerException
  extends /*@__PURE__*/ TE.TaggedError("ServerException", [
    "ServerError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ServiceDeploymentNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ServiceDeploymentNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ServiceNotActiveException
  extends /*@__PURE__*/ TE.TaggedError("ServiceNotActiveException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class ServiceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ServiceNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class TargetNotConnectedException
  extends /*@__PURE__*/ TE.TaggedError("TargetNotConnectedException", [
    "ConflictError",
  ])<{ readonly message?: string }> {}
export class TargetNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("TargetNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class TaskSetNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("TaskSetNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class UnsupportedFeatureException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedFeatureException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class UpdateInProgressException
  extends /*@__PURE__*/ TE.TaggedError("UpdateInProgressException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export type DeploymentLifecycleHookAction =
  | "ROLLBACK"
  | "CONTINUE"
  | (string & {});
export interface ContinueServiceDeploymentRequest {
  serviceDeploymentArn: string;
  hookId: string;
  action?: DeploymentLifecycleHookAction;
}
export interface ContinueServiceDeploymentResponse {
  serviceDeploymentArn?: string;
}
export type ManagedScalingStatus = "ENABLED" | "DISABLED" | (string & {});
export type ManagedScalingTargetCapacity = number;
export type ManagedScalingStepSize = number;
export type ManagedScalingInstanceWarmupPeriod = number;
export interface ManagedScaling {
  status?: ManagedScalingStatus;
  targetCapacity?: number;
  minimumScalingStepSize?: number;
  maximumScalingStepSize?: number;
  instanceWarmupPeriod?: number;
}
export type ManagedTerminationProtection =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type ManagedDraining = "ENABLED" | "DISABLED" | (string & {});
export interface AutoScalingGroupProvider {
  autoScalingGroupArn: string;
  managedScaling?: ManagedScaling;
  managedTerminationProtection?: ManagedTerminationProtection;
  managedDraining?: ManagedDraining;
}
export type StringList = string[];
export interface ManagedInstancesNetworkConfiguration {
  subnets?: string[];
  securityGroups?: string[];
}
export type TaskVolumeStorageGiB = number;
export interface ManagedInstancesStorageConfiguration {
  storageSizeGiB?: number;
}
export interface ManagedInstancesLocalStorageConfiguration {
  useLocalStorage?: boolean;
}
export type ManagedInstancesMonitoringOptions =
  | "BASIC"
  | "DETAILED"
  | (string & {});
export type CapacityOptionType =
  | "ON_DEMAND"
  | "SPOT"
  | "RESERVED"
  | (string & {});
export type BoxedBoolean = boolean;
export type BoxedInteger = number;
export interface VCpuCountRangeRequest {
  min: number;
  max?: number;
}
export interface MemoryMiBRequest {
  min: number;
  max?: number;
}
export type CpuManufacturer =
  | "intel"
  | "amd"
  | "amazon-web-services"
  | (string & {});
export type CpuManufacturerSet = CpuManufacturer[];
export type BoxedDouble = number;
export interface MemoryGiBPerVCpuRequest {
  min?: number;
  max?: number;
}
export type ExcludedInstanceType = string;
export type ExcludedInstanceTypeSet = string[];
export type InstanceGeneration = "current" | "previous" | (string & {});
export type InstanceGenerationSet = InstanceGeneration[];
export type BareMetal = "included" | "required" | "excluded" | (string & {});
export type BurstablePerformance =
  | "included"
  | "required"
  | "excluded"
  | (string & {});
export interface NetworkInterfaceCountRequest {
  min?: number;
  max?: number;
}
export type LocalStorage = "included" | "required" | "excluded" | (string & {});
export type LocalStorageType = "hdd" | "ssd" | (string & {});
export type LocalStorageTypeSet = LocalStorageType[];
export interface TotalLocalStorageGBRequest {
  min?: number;
  max?: number;
}
export interface BaselineEbsBandwidthMbpsRequest {
  min?: number;
  max?: number;
}
export type AcceleratorType = "gpu" | "fpga" | "inference" | (string & {});
export type AcceleratorTypeSet = AcceleratorType[];
export interface AcceleratorCountRequest {
  min?: number;
  max?: number;
}
export type AcceleratorManufacturer =
  | "amazon-web-services"
  | "amd"
  | "nvidia"
  | "xilinx"
  | "habana"
  | (string & {});
export type AcceleratorManufacturerSet = AcceleratorManufacturer[];
export type AcceleratorName =
  | "a100"
  | "inferentia"
  | "k520"
  | "k80"
  | "m60"
  | "radeon-pro-v520"
  | "t4"
  | "vu9p"
  | "v100"
  | "a10g"
  | "h100"
  | "t4g"
  | (string & {});
export type AcceleratorNameSet = AcceleratorName[];
export interface AcceleratorTotalMemoryMiBRequest {
  min?: number;
  max?: number;
}
export interface NetworkBandwidthGbpsRequest {
  min?: number;
  max?: number;
}
export type AllowedInstanceType = string;
export type AllowedInstanceTypeSet = string[];
export interface InstanceRequirementsRequest {
  vCpuCount: VCpuCountRangeRequest;
  memoryMiB: MemoryMiBRequest;
  cpuManufacturers?: CpuManufacturer[];
  memoryGiBPerVCpu?: MemoryGiBPerVCpuRequest;
  excludedInstanceTypes?: string[];
  instanceGenerations?: InstanceGeneration[];
  spotMaxPricePercentageOverLowestPrice?: number;
  onDemandMaxPricePercentageOverLowestPrice?: number;
  bareMetal?: BareMetal;
  burstablePerformance?: BurstablePerformance;
  requireHibernateSupport?: boolean;
  networkInterfaceCount?: NetworkInterfaceCountRequest;
  localStorage?: LocalStorage;
  localStorageTypes?: LocalStorageType[];
  totalLocalStorageGB?: TotalLocalStorageGBRequest;
  baselineEbsBandwidthMbps?: BaselineEbsBandwidthMbpsRequest;
  acceleratorTypes?: AcceleratorType[];
  acceleratorCount?: AcceleratorCountRequest;
  acceleratorManufacturers?: AcceleratorManufacturer[];
  acceleratorNames?: AcceleratorName[];
  acceleratorTotalMemoryMiB?: AcceleratorTotalMemoryMiBRequest;
  networkBandwidthGbps?: NetworkBandwidthGbpsRequest;
  allowedInstanceTypes?: string[];
  maxSpotPriceAsPercentageOfOptimalOnDemandPrice?: number;
}
export type CapacityReservationPreference =
  | "RESERVATIONS_ONLY"
  | "RESERVATIONS_FIRST"
  | "RESERVATIONS_EXCLUDED"
  | (string & {});
export interface CapacityReservationRequest {
  reservationGroupArn?: string;
  reservationPreference?: CapacityReservationPreference;
}
export interface InstanceLaunchTemplate {
  ec2InstanceProfileArn: string;
  networkConfiguration: ManagedInstancesNetworkConfiguration;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
  monitoring?: ManagedInstancesMonitoringOptions;
  capacityOptionType?: CapacityOptionType;
  instanceMetadataTagsPropagation?: boolean;
  instanceRequirements?: InstanceRequirementsRequest;
  fipsEnabled?: boolean;
  capacityReservations?: CapacityReservationRequest;
}
export type PropagateMITags = "CAPACITY_PROVIDER" | "NONE" | (string & {});
export interface InfrastructureOptimization {
  scaleInAfter?: number;
}
export type AutoRepairActionsStatus = "ENABLED" | "DISABLED" | (string & {});
export interface AutoRepairConfiguration {
  actionsStatus?: AutoRepairActionsStatus;
}
export interface CreateManagedInstancesProviderConfiguration {
  infrastructureRoleArn: string;
  instanceLaunchTemplate: InstanceLaunchTemplate;
  propagateTags?: PropagateMITags;
  infrastructureOptimization?: InfrastructureOptimization;
  autoRepairConfiguration?: AutoRepairConfiguration;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export type Tags = Tag[];
export interface CreateCapacityProviderRequest {
  name: string;
  cluster?: string;
  autoScalingGroupProvider?: AutoScalingGroupProvider;
  managedInstancesProvider?: CreateManagedInstancesProviderConfiguration;
  tags?: Tag[];
}
export type CapacityProviderStatus =
  | "PROVISIONING"
  | "ACTIVE"
  | "DEPROVISIONING"
  | "INACTIVE"
  | (string & {});
export interface ManagedInstancesProvider {
  infrastructureRoleArn?: string;
  instanceLaunchTemplate?: InstanceLaunchTemplate;
  propagateTags?: PropagateMITags;
  infrastructureOptimization?: InfrastructureOptimization;
  autoRepairConfiguration?: AutoRepairConfiguration;
}
export type CapacityProviderUpdateStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export type CapacityProviderType =
  | "EC2_AUTOSCALING"
  | "MANAGED_INSTANCES"
  | "FARGATE"
  | "FARGATE_SPOT"
  | (string & {});
export interface CapacityProvider {
  capacityProviderArn?: string;
  name?: string;
  cluster?: string;
  status?: CapacityProviderStatus;
  autoScalingGroupProvider?: AutoScalingGroupProvider;
  managedInstancesProvider?: ManagedInstancesProvider;
  updateStatus?: CapacityProviderUpdateStatus;
  updateStatusReason?: string;
  tags?: Tag[];
  type?: CapacityProviderType;
}
export interface CreateCapacityProviderResponse {
  capacityProvider?: CapacityProvider;
}
export type ClusterSettingName = "containerInsights" | (string & {});
export interface ClusterSetting {
  name?: ClusterSettingName;
  value?: string;
}
export type ClusterSettings = ClusterSetting[];
export type ExecuteCommandLogging =
  | "NONE"
  | "DEFAULT"
  | "OVERRIDE"
  | (string & {});
export interface ExecuteCommandLogConfiguration {
  cloudWatchLogGroupName?: string;
  cloudWatchEncryptionEnabled?: boolean;
  s3BucketName?: string;
  s3EncryptionEnabled?: boolean;
  s3KeyPrefix?: string;
}
export interface ExecuteCommandConfiguration {
  kmsKeyId?: string;
  logging?: ExecuteCommandLogging;
  logConfiguration?: ExecuteCommandLogConfiguration;
}
export interface ManagedStorageConfiguration {
  kmsKeyId?: string;
  fargateEphemeralStorageKmsKeyId?: string;
}
export interface ClusterConfiguration {
  executeCommandConfiguration?: ExecuteCommandConfiguration;
  managedStorageConfiguration?: ManagedStorageConfiguration;
}
export type CapacityProviderStrategyItemWeight = number;
export type CapacityProviderStrategyItemBase = number;
export interface CapacityProviderStrategyItem {
  capacityProvider: string;
  weight?: number;
  base?: number;
}
export type CapacityProviderStrategy = CapacityProviderStrategyItem[];
export interface ClusterServiceConnectDefaultsRequest {
  namespace: string;
}
export interface CreateClusterRequest {
  clusterName?: string;
  tags?: Tag[];
  settings?: ClusterSetting[];
  configuration?: ClusterConfiguration;
  capacityProviders?: string[];
  defaultCapacityProviderStrategy?: CapacityProviderStrategyItem[];
  serviceConnectDefaults?: ClusterServiceConnectDefaultsRequest;
}
export interface KeyValuePair {
  name?: string;
  value?: string;
}
export type Statistics = KeyValuePair[];
export type AttachmentDetails = KeyValuePair[];
export interface Attachment {
  id?: string;
  type?: string;
  status?: string;
  details?: KeyValuePair[];
}
export type Attachments = Attachment[];
export interface ClusterServiceConnectDefaults {
  namespace?: string;
}
export interface Cluster {
  clusterArn?: string;
  clusterName?: string;
  configuration?: ClusterConfiguration;
  status?: string;
  registeredContainerInstancesCount?: number;
  runningTasksCount?: number;
  pendingTasksCount?: number;
  activeServicesCount?: number;
  statistics?: KeyValuePair[];
  tags?: Tag[];
  settings?: ClusterSetting[];
  capacityProviders?: string[];
  defaultCapacityProviderStrategy?: CapacityProviderStrategyItem[];
  attachments?: Attachment[];
  attachmentsStatus?: string;
  serviceConnectDefaults?: ClusterServiceConnectDefaults;
}
export interface CreateClusterResponse {
  cluster?: Cluster;
}
export type DaemonDrainPercent = number;
export interface DaemonAlarmConfiguration {
  alarmNames?: string[];
  enable?: boolean;
}
export interface DaemonDeploymentConfiguration {
  drainPercent?: number;
  alarms?: DaemonAlarmConfiguration;
  bakeTimeInMinutes?: number;
}
export type DaemonPropagateTags = "DAEMON" | "NONE" | (string & {});
export interface CreateDaemonRequest {
  daemonName: string;
  clusterArn?: string;
  daemonTaskDefinitionArn: string;
  capacityProviderArns: string[];
  deploymentConfiguration?: DaemonDeploymentConfiguration;
  tags?: Tag[];
  propagateTags?: DaemonPropagateTags;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
  clientToken?: string;
}
export type DaemonStatus = "ACTIVE" | "DELETE_IN_PROGRESS" | (string & {});
export interface CreateDaemonResponse {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  deploymentArn?: string;
}
export interface ExpressGatewayServiceAwsLogsConfiguration {
  logGroup: string;
  logStreamPrefix: string;
}
export interface ExpressGatewayRepositoryCredentials {
  credentialsParameter?: string;
}
export type EnvironmentVariables = KeyValuePair[];
export interface Secret {
  name: string;
  valueFrom: string;
}
export type SecretList = Secret[];
export interface ExpressGatewayContainer {
  image: string;
  containerPort?: number;
  awsLogsConfiguration?: ExpressGatewayServiceAwsLogsConfiguration;
  repositoryCredentials?: ExpressGatewayRepositoryCredentials;
  command?: string[];
  environment?: KeyValuePair[];
  secrets?: Secret[];
}
export interface ExpressGatewayServiceNetworkConfiguration {
  securityGroups?: string[];
  subnets?: string[];
}
export type ExpressGatewayServiceScalingMetric =
  | "AVERAGE_CPU"
  | "AVERAGE_MEMORY"
  | "REQUEST_COUNT_PER_TARGET"
  | (string & {});
export interface ExpressGatewayScalingTarget {
  minTaskCount?: number;
  maxTaskCount?: number;
  autoScalingMetric?: ExpressGatewayServiceScalingMetric;
  autoScalingTargetValue?: number;
}
export interface CreateExpressGatewayServiceRequest {
  executionRoleArn?: string;
  infrastructureRoleArn: string;
  serviceName?: string;
  cluster?: string;
  healthCheckPath?: string;
  primaryContainer?: ExpressGatewayContainer;
  taskRoleArn?: string;
  networkConfiguration?: ExpressGatewayServiceNetworkConfiguration;
  cpu?: string;
  memory?: string;
  scalingTarget?: ExpressGatewayScalingTarget;
  tags?: Tag[];
  taskDefinitionArn?: string;
}
export type ExpressGatewayServiceStatusCode =
  | "ACTIVE"
  | "DRAINING"
  | "INACTIVE"
  | (string & {});
export interface ExpressGatewayServiceStatus {
  statusCode?: ExpressGatewayServiceStatusCode;
  statusReason?: string;
}
export type AccessType = "PUBLIC" | "PRIVATE" | (string & {});
export interface IngressPathSummary {
  accessType: AccessType;
  endpoint: string;
}
export type IngressPathSummaries = IngressPathSummary[];
export interface ExpressGatewayServiceConfiguration {
  serviceRevisionArn?: string;
  executionRoleArn?: string;
  taskRoleArn?: string;
  taskDefinitionArn?: string;
  cpu?: string;
  memory?: string;
  networkConfiguration?: ExpressGatewayServiceNetworkConfiguration;
  healthCheckPath?: string;
  primaryContainer?: ExpressGatewayContainer;
  scalingTarget?: ExpressGatewayScalingTarget;
  ingressPaths?: IngressPathSummary[];
  createdAt?: Date;
}
export type ExpressGatewayServiceConfigurations =
  ExpressGatewayServiceConfiguration[];
export interface ECSExpressGatewayService {
  cluster?: string;
  serviceName?: string;
  serviceArn?: string;
  infrastructureRoleArn?: string;
  status?: ExpressGatewayServiceStatus;
  currentDeployment?: string;
  activeConfigurations?: ExpressGatewayServiceConfiguration[];
  tags?: Tag[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateExpressGatewayServiceResponse {
  service?: ECSExpressGatewayService;
}
export type AvailabilityZoneRebalancing =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface AdvancedConfiguration {
  alternateTargetGroupArn?: string;
  productionListenerRule?: string;
  testListenerRule?: string;
  roleArn?: string;
}
export interface LoadBalancer {
  targetGroupArn?: string;
  loadBalancerName?: string;
  containerName?: string;
  containerPort?: number;
  advancedConfiguration?: AdvancedConfiguration;
}
export type LoadBalancers = LoadBalancer[];
export interface ServiceRegistry {
  registryArn?: string;
  port?: number;
  containerName?: string;
  containerPort?: number;
}
export type ServiceRegistries = ServiceRegistry[];
export type LaunchType =
  | "EC2"
  | "FARGATE"
  | "EXTERNAL"
  | "MANAGED_INSTANCES"
  | (string & {});
export type ThresholdType =
  | "COUNT"
  | "BOUNDED_PERCENT"
  | "UNBOUNDED_PERCENT"
  | (string & {});
export interface ThresholdConfiguration {
  type: ThresholdType;
  value: number;
}
export interface DeploymentCircuitBreaker {
  enable: boolean;
  rollback: boolean;
  resetOnHealthyTask?: boolean;
  thresholdConfiguration?: ThresholdConfiguration;
}
export interface DeploymentAlarms {
  alarmNames: string[];
  rollback: boolean;
  enable: boolean;
}
export type DeploymentStrategy =
  | "ROLLING"
  | "BLUE_GREEN"
  | "LINEAR"
  | "CANARY"
  | (string & {});
export type DeploymentLifecycleHookTargetType =
  | "AWS_LAMBDA"
  | "PAUSE"
  | (string & {});
export type IAMRoleArn = string;
export type DeploymentLifecycleHookStage =
  | "RECONCILE_SERVICE"
  | "PRE_SCALE_UP"
  | "POST_SCALE_UP"
  | "TEST_TRAFFIC_SHIFT"
  | "POST_TEST_TRAFFIC_SHIFT"
  | "PRE_PRODUCTION_TRAFFIC_SHIFT"
  | "PRODUCTION_TRAFFIC_SHIFT"
  | "POST_PRODUCTION_TRAFFIC_SHIFT"
  | (string & {});
export type DeploymentLifecycleHookStageList = DeploymentLifecycleHookStage[];
export type HookDetails = unknown;
export type DeploymentLifecycleHookDuration = number;
export interface DeploymentLifecycleHookTimeoutConfiguration {
  timeoutInMinutes?: number;
  action?: DeploymentLifecycleHookAction;
}
export interface DeploymentLifecycleHook {
  targetType?: DeploymentLifecycleHookTargetType;
  hookTargetArn?: string;
  roleArn?: string;
  lifecycleStages?: DeploymentLifecycleHookStage[];
  hookDetails?: any;
  timeoutConfiguration?: DeploymentLifecycleHookTimeoutConfiguration;
}
export type DeploymentLifecycleHookList = DeploymentLifecycleHook[];
export interface LinearConfiguration {
  stepPercent?: number;
  stepBakeTimeInMinutes?: number;
}
export interface CanaryConfiguration {
  canaryPercent?: number;
  canaryBakeTimeInMinutes?: number;
}
export type HealthyPercentInteger = number;
export type ServiceRevisionCleanup = "BLOCKING" | "DEFERRED" | (string & {});
export interface DeploymentEarlySuccessCriteria {
  enable: boolean;
  healthyPercent?: number;
  sourceServiceRevisionCleanup?: ServiceRevisionCleanup;
}
export interface DeploymentConfiguration {
  deploymentCircuitBreaker?: DeploymentCircuitBreaker;
  maximumPercent?: number;
  minimumHealthyPercent?: number;
  alarms?: DeploymentAlarms;
  strategy?: DeploymentStrategy;
  bakeTimeInMinutes?: number;
  lifecycleHooks?: DeploymentLifecycleHook[];
  linearConfiguration?: LinearConfiguration;
  canaryConfiguration?: CanaryConfiguration;
  earlySuccessCriteria?: DeploymentEarlySuccessCriteria;
}
export type PlacementConstraintType =
  | "distinctInstance"
  | "memberOf"
  | (string & {});
export interface PlacementConstraint {
  type?: PlacementConstraintType;
  expression?: string;
}
export type PlacementConstraints = PlacementConstraint[];
export type PlacementStrategyType =
  | "random"
  | "spread"
  | "binpack"
  | (string & {});
export interface PlacementStrategy {
  type?: PlacementStrategyType;
  field?: string;
}
export type PlacementStrategies = PlacementStrategy[];
export type AssignPublicIp = "ENABLED" | "DISABLED" | (string & {});
export interface AwsVpcConfiguration {
  subnets: string[];
  securityGroups?: string[];
  assignPublicIp?: AssignPublicIp;
}
export interface NetworkConfiguration {
  awsvpcConfiguration?: AwsVpcConfiguration;
}
export type SchedulingStrategy = "REPLICA" | "DAEMON" | (string & {});
export type DeploymentControllerType =
  | "ECS"
  | "CODE_DEPLOY"
  | "EXTERNAL"
  | (string & {});
export interface DeploymentController {
  type: DeploymentControllerType;
}
export type PropagateTags =
  | "TASK_DEFINITION"
  | "SERVICE"
  | "NONE"
  | (string & {});
export type PortNumber = number;
export interface ServiceConnectTestTrafficHeaderMatchRules {
  exact: string;
}
export interface ServiceConnectTestTrafficHeaderRules {
  name: string;
  value?: ServiceConnectTestTrafficHeaderMatchRules;
}
export interface ServiceConnectTestTrafficRules {
  header: ServiceConnectTestTrafficHeaderRules;
}
export interface ServiceConnectClientAlias {
  port: number;
  dnsName?: string;
  testTrafficRules?: ServiceConnectTestTrafficRules;
}
export type ServiceConnectClientAliasList = ServiceConnectClientAlias[];
export type Duration = number;
export interface TimeoutConfiguration {
  idleTimeoutSeconds?: number;
  perRequestTimeoutSeconds?: number;
}
export interface ServiceConnectTlsCertificateAuthority {
  awsPcaAuthorityArn?: string;
}
export interface ServiceConnectTlsConfiguration {
  issuerCertificateAuthority: ServiceConnectTlsCertificateAuthority;
  kmsKey?: string;
  roleArn?: string;
}
export interface ServiceConnectService {
  portName: string;
  discoveryName?: string;
  clientAliases?: ServiceConnectClientAlias[];
  ingressPortOverride?: number;
  timeout?: TimeoutConfiguration;
  tls?: ServiceConnectTlsConfiguration;
}
export type ServiceConnectServiceList = ServiceConnectService[];
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
export interface LogConfiguration {
  logDriver: LogDriver;
  options?: { [key: string]: string | undefined };
  secretOptions?: Secret[];
}
export type ServiceConnectAccessLoggingFormat = "TEXT" | "JSON" | (string & {});
export type ServiceConnectIncludeQueryParameters =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export interface ServiceConnectAccessLogConfiguration {
  format: ServiceConnectAccessLoggingFormat;
  includeQueryParameters?: ServiceConnectIncludeQueryParameters;
}
export interface ServiceConnectConfiguration {
  enabled: boolean;
  namespace?: string;
  services?: ServiceConnectService[];
  logConfiguration?: LogConfiguration;
  accessLogConfiguration?: ServiceConnectAccessLogConfiguration;
}
export type ECSVolumeName = string;
export type EBSKMSKeyId = string;
export type EBSVolumeType = string;
export type EBSSnapshotId = string;
export type EBSResourceType = "volume" | (string & {});
export interface EBSTagSpecification {
  resourceType: EBSResourceType;
  tags?: Tag[];
  propagateTags?: PropagateTags;
}
export type EBSTagSpecifications = EBSTagSpecification[];
export type TaskFilesystemType =
  | "ext3"
  | "ext4"
  | "xfs"
  | "ntfs"
  | (string & {});
export interface ServiceManagedEBSVolumeConfiguration {
  encrypted?: boolean;
  kmsKeyId?: string;
  volumeType?: string;
  sizeInGiB?: number;
  snapshotId?: string;
  volumeInitializationRate?: number;
  iops?: number;
  throughput?: number;
  tagSpecifications?: EBSTagSpecification[];
  roleArn: string;
  filesystemType?: TaskFilesystemType;
}
export interface ServiceVolumeConfiguration {
  name: string;
  managedEBSVolume?: ServiceManagedEBSVolumeConfiguration;
}
export type ServiceVolumeConfigurations = ServiceVolumeConfiguration[];
export interface VpcLatticeConfiguration {
  roleArn: string;
  targetGroupArn: string;
  portName: string;
}
export type VpcLatticeConfigurations = VpcLatticeConfiguration[];
export type MetricName = string;
export type MetricNamesList = string[];
export type MetricResolutionSeconds = number;
export interface MetricConfiguration {
  metricNames: string[];
  resolutionSeconds: number;
}
export type MetricConfigurationList = MetricConfiguration[];
export interface MonitoringConfiguration {
  metricConfigurations?: MetricConfiguration[];
}
export interface CreateServiceRequest {
  cluster?: string;
  serviceName: string;
  taskDefinition?: string;
  availabilityZoneRebalancing?: AvailabilityZoneRebalancing;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  desiredCount?: number;
  clientToken?: string;
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  role?: string;
  deploymentConfiguration?: DeploymentConfiguration;
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  networkConfiguration?: NetworkConfiguration;
  healthCheckGracePeriodSeconds?: number;
  schedulingStrategy?: SchedulingStrategy;
  deploymentController?: DeploymentController;
  tags?: Tag[];
  enableECSManagedTags?: boolean;
  propagateTags?: PropagateTags;
  enableExecuteCommand?: boolean;
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  volumeConfigurations?: ServiceVolumeConfiguration[];
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
  monitoring?: MonitoringConfiguration;
}
export type ScaleUnit = "PERCENT" | (string & {});
export interface Scale {
  value?: number;
  unit?: ScaleUnit;
}
export type StabilityStatus = "STEADY_STATE" | "STABILIZING" | (string & {});
export interface DeploymentEphemeralStorage {
  kmsKeyId?: string;
}
export interface TaskSet {
  id?: string;
  taskSetArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  startedBy?: string;
  externalId?: string;
  status?: string;
  taskDefinition?: string;
  computedDesiredCount?: number;
  pendingCount?: number;
  runningCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  platformFamily?: string;
  networkConfiguration?: NetworkConfiguration;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  scale?: Scale;
  stabilityStatus?: StabilityStatus;
  stabilityStatusAt?: Date;
  tags?: Tag[];
  fargateEphemeralStorage?: DeploymentEphemeralStorage;
}
export type TaskSets = TaskSet[];
export type DeploymentRolloutState =
  | "COMPLETED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export interface ServiceConnectServiceResource {
  discoveryName?: string;
  discoveryArn?: string;
}
export type ServiceConnectServiceResourceList = ServiceConnectServiceResource[];
export interface Deployment {
  id?: string;
  status?: string;
  taskDefinition?: string;
  desiredCount?: number;
  pendingCount?: number;
  runningCount?: number;
  failedTasks?: number;
  createdAt?: Date;
  updatedAt?: Date;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  launchType?: LaunchType;
  platformVersion?: string;
  platformFamily?: string;
  networkConfiguration?: NetworkConfiguration;
  rolloutState?: DeploymentRolloutState;
  rolloutStateReason?: string;
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  serviceConnectResources?: ServiceConnectServiceResource[];
  volumeConfigurations?: ServiceVolumeConfiguration[];
  fargateEphemeralStorage?: DeploymentEphemeralStorage;
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
}
export type Deployments = Deployment[];
export interface ServiceEvent {
  id?: string;
  createdAt?: Date;
  message?: string;
}
export type ServiceEvents = ServiceEvent[];
export interface ServiceCurrentRevisionSummary {
  arn?: string;
  requestedTaskCount?: number;
  runningTaskCount?: number;
  pendingTaskCount?: number;
}
export type ServiceCurrentRevisionSummaryList = ServiceCurrentRevisionSummary[];
export type ResourceManagementType = "CUSTOMER" | "ECS" | (string & {});
export interface Service {
  serviceArn?: string;
  serviceName?: string;
  clusterArn?: string;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  status?: string;
  desiredCount?: number;
  runningCount?: number;
  pendingCount?: number;
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  platformFamily?: string;
  taskDefinition?: string;
  deploymentConfiguration?: DeploymentConfiguration;
  taskSets?: TaskSet[];
  deployments?: Deployment[];
  roleArn?: string;
  events?: ServiceEvent[];
  createdAt?: Date;
  currentServiceDeployment?: string;
  currentServiceRevisions?: ServiceCurrentRevisionSummary[];
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  networkConfiguration?: NetworkConfiguration;
  healthCheckGracePeriodSeconds?: number;
  schedulingStrategy?: SchedulingStrategy;
  deploymentController?: DeploymentController;
  tags?: Tag[];
  createdBy?: string;
  enableECSManagedTags?: boolean;
  propagateTags?: PropagateTags;
  enableExecuteCommand?: boolean;
  availabilityZoneRebalancing?: AvailabilityZoneRebalancing;
  resourceManagementType?: ResourceManagementType;
}
export interface CreateServiceResponse {
  service?: Service;
}
export interface CreateTaskSetRequest {
  service: string;
  cluster: string;
  externalId?: string;
  taskDefinition: string;
  networkConfiguration?: NetworkConfiguration;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  launchType?: LaunchType;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  platformVersion?: string;
  scale?: Scale;
  clientToken?: string;
  tags?: Tag[];
}
export interface CreateTaskSetResponse {
  taskSet?: TaskSet;
}
export type SettingName =
  | "serviceLongArnFormat"
  | "taskLongArnFormat"
  | "containerInstanceLongArnFormat"
  | "awsvpcTrunking"
  | "containerInsights"
  | "fargateFIPSMode"
  | "tagResourceAuthorization"
  | "fargateTaskRetirementWaitPeriod"
  | "guardDutyActivate"
  | "defaultLogDriverMode"
  | "fargateEventWindows"
  | (string & {});
export interface DeleteAccountSettingRequest {
  name: SettingName;
  principalArn?: string;
}
export type SettingType = "user" | "aws_managed" | (string & {});
export interface Setting {
  name?: SettingName;
  value?: string;
  principalArn?: string;
  type?: SettingType;
}
export interface DeleteAccountSettingResponse {
  setting?: Setting;
}
export type TargetType = "container-instance" | (string & {});
export interface Attribute {
  name: string;
  value?: string;
  targetType?: TargetType;
  targetId?: string;
}
export type Attributes = Attribute[];
export interface DeleteAttributesRequest {
  cluster?: string;
  attributes: Attribute[];
}
export interface DeleteAttributesResponse {
  attributes?: Attribute[];
}
export interface DeleteCapacityProviderRequest {
  capacityProvider: string;
  cluster?: string;
}
export interface DeleteCapacityProviderResponse {
  capacityProvider?: CapacityProvider;
}
export interface DeleteClusterRequest {
  cluster: string;
}
export interface DeleteClusterResponse {
  cluster?: Cluster;
}
export interface DeleteDaemonRequest {
  daemonArn: string;
}
export interface DeleteDaemonResponse {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deploymentArn?: string;
}
export interface DeleteDaemonTaskDefinitionRequest {
  daemonTaskDefinition: string;
}
export interface DeleteDaemonTaskDefinitionResponse {
  daemonTaskDefinitionArn?: string;
}
export interface DeleteExpressGatewayServiceRequest {
  serviceArn: string;
}
export interface DeleteExpressGatewayServiceResponse {
  service?: ECSExpressGatewayService;
}
export interface DeleteServiceRequest {
  cluster?: string;
  service: string;
  force?: boolean;
}
export interface DeleteServiceResponse {
  service?: Service;
}
export interface DeleteTaskDefinitionsRequest {
  taskDefinitions: string[];
}
export interface RepositoryCredentials {
  credentialsParameter: string;
}
export type TransportProtocol = "tcp" | "udp" | (string & {});
export type ApplicationProtocol = "http" | "http2" | "grpc" | (string & {});
export interface PortMapping {
  containerPort?: number;
  hostPort?: number;
  protocol?: TransportProtocol;
  name?: string;
  appProtocol?: ApplicationProtocol;
  containerPortRange?: string;
}
export type PortMappingList = PortMapping[];
export type IntegerList = number[];
export interface ContainerRestartPolicy {
  enabled: boolean;
  ignoredExitCodes?: number[];
  restartAttemptPeriod?: number;
}
export type EnvironmentFileType = "s3" | (string & {});
export interface EnvironmentFile {
  value: string;
  type: EnvironmentFileType;
}
export type EnvironmentFiles = EnvironmentFile[];
export interface MountPoint {
  sourceVolume?: string;
  containerPath?: string;
  readOnly?: boolean;
}
export type MountPointList = MountPoint[];
export interface VolumeFrom {
  sourceContainer?: string;
  readOnly?: boolean;
}
export type VolumeFromList = VolumeFrom[];
export interface KernelCapabilities {
  add?: string[];
  drop?: string[];
}
export type DeviceCgroupPermission = "read" | "write" | "mknod" | (string & {});
export type DeviceCgroupPermissions = DeviceCgroupPermission[];
export interface Device {
  hostPath: string;
  containerPath?: string;
  permissions?: DeviceCgroupPermission[];
}
export type DevicesList = Device[];
export interface Tmpfs {
  containerPath: string;
  size: number;
  mountOptions?: string[];
}
export type TmpfsList = Tmpfs[];
export interface LinuxParameters {
  capabilities?: KernelCapabilities;
  devices?: Device[];
  initProcessEnabled?: boolean;
  sharedMemorySize?: number;
  tmpfs?: Tmpfs[];
  maxSwap?: number;
  swappiness?: number;
}
export type ContainerCondition =
  | "START"
  | "COMPLETE"
  | "SUCCESS"
  | "HEALTHY"
  | (string & {});
export interface ContainerDependency {
  containerName: string;
  condition: ContainerCondition;
}
export type ContainerDependencies = ContainerDependency[];
export type VersionConsistency = "enabled" | "disabled" | (string & {});
export interface HostEntry {
  hostname: string;
  ipAddress: string;
}
export type HostEntryList = HostEntry[];
export type DockerLabelsMap = { [key: string]: string | undefined };
export type UlimitName =
  | "core"
  | "cpu"
  | "data"
  | "fsize"
  | "locks"
  | "memlock"
  | "msgqueue"
  | "nice"
  | "nofile"
  | "nproc"
  | "rss"
  | "rtprio"
  | "rttime"
  | "sigpending"
  | "stack"
  | (string & {});
export interface Ulimit {
  name: UlimitName;
  softLimit: number;
  hardLimit: number;
}
export type UlimitList = Ulimit[];
export interface HealthCheck {
  command: string[];
  interval?: number;
  timeout?: number;
  retries?: number;
  startPeriod?: number;
}
export interface SystemControl {
  namespace?: string;
  value?: string;
}
export type SystemControls = SystemControl[];
export type ResourceType =
  | "GPU"
  | "InferenceAccelerator"
  | "NeuronDevice"
  | (string & {});
export interface ResourceRequirement {
  value: string;
  type: ResourceType;
}
export type ResourceRequirements = ResourceRequirement[];
export type FirelensConfigurationType = "fluentd" | "fluentbit" | (string & {});
export type FirelensConfigurationOptionsMap = {
  [key: string]: string | undefined;
};
export interface FirelensConfiguration {
  type: FirelensConfigurationType;
  options?: { [key: string]: string | undefined };
}
export interface ContainerDefinition {
  name?: string;
  image?: string;
  repositoryCredentials?: RepositoryCredentials;
  cpu?: number;
  memory?: number;
  memoryReservation?: number;
  links?: string[];
  portMappings?: PortMapping[];
  essential?: boolean;
  restartPolicy?: ContainerRestartPolicy;
  entryPoint?: string[];
  command?: string[];
  environment?: KeyValuePair[];
  environmentFiles?: EnvironmentFile[];
  mountPoints?: MountPoint[];
  volumesFrom?: VolumeFrom[];
  linuxParameters?: LinuxParameters;
  secrets?: Secret[];
  dependsOn?: ContainerDependency[];
  startTimeout?: number;
  stopTimeout?: number;
  versionConsistency?: VersionConsistency;
  hostname?: string;
  user?: string;
  workingDirectory?: string;
  disableNetworking?: boolean;
  privileged?: boolean;
  readonlyRootFilesystem?: boolean;
  dnsServers?: string[];
  dnsSearchDomains?: string[];
  extraHosts?: HostEntry[];
  dockerSecurityOptions?: string[];
  interactive?: boolean;
  pseudoTerminal?: boolean;
  dockerLabels?: { [key: string]: string | undefined };
  ulimits?: Ulimit[];
  logConfiguration?: LogConfiguration;
  healthCheck?: HealthCheck;
  systemControls?: SystemControl[];
  resourceRequirements?: ResourceRequirement[];
  firelensConfiguration?: FirelensConfiguration;
  credentialSpecs?: string[];
}
export type ContainerDefinitions = ContainerDefinition[];
export type NetworkMode = "bridge" | "host" | "awsvpc" | "none" | (string & {});
export interface HostVolumeProperties {
  sourcePath?: string;
}
export type Scope = "task" | "shared" | (string & {});
export type StringMap = { [key: string]: string | undefined };
export interface DockerVolumeConfiguration {
  scope?: Scope;
  autoprovision?: boolean;
  driver?: string;
  driverOpts?: { [key: string]: string | undefined };
  labels?: { [key: string]: string | undefined };
}
export type EFSTransitEncryption = "ENABLED" | "DISABLED" | (string & {});
export type EFSAuthorizationConfigIAM = "ENABLED" | "DISABLED" | (string & {});
export interface EFSAuthorizationConfig {
  accessPointId?: string;
  iam?: EFSAuthorizationConfigIAM;
}
export interface EFSVolumeConfiguration {
  fileSystemId: string;
  rootDirectory?: string;
  transitEncryption?: EFSTransitEncryption;
  transitEncryptionPort?: number;
  authorizationConfig?: EFSAuthorizationConfig;
}
export interface S3FilesVolumeConfiguration {
  fileSystemArn: string;
  rootDirectory?: string;
  transitEncryptionPort?: number;
  accessPointArn?: string;
}
export interface FSxWindowsFileServerAuthorizationConfig {
  credentialsParameter: string;
  domain: string;
}
export interface FSxWindowsFileServerVolumeConfiguration {
  fileSystemId: string;
  rootDirectory: string;
  authorizationConfig: FSxWindowsFileServerAuthorizationConfig;
}
export interface Volume {
  name?: string;
  host?: HostVolumeProperties;
  dockerVolumeConfiguration?: DockerVolumeConfiguration;
  efsVolumeConfiguration?: EFSVolumeConfiguration;
  s3filesVolumeConfiguration?: S3FilesVolumeConfiguration;
  fsxWindowsFileServerVolumeConfiguration?: FSxWindowsFileServerVolumeConfiguration;
  configuredAtLaunch?: boolean;
}
export type VolumeList = Volume[];
export type TaskDefinitionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export type RequiresAttributes = Attribute[];
export type TaskDefinitionPlacementConstraintType = "memberOf" | (string & {});
export interface TaskDefinitionPlacementConstraint {
  type?: TaskDefinitionPlacementConstraintType;
  expression?: string;
}
export type TaskDefinitionPlacementConstraints =
  TaskDefinitionPlacementConstraint[];
export type Compatibility =
  | "EC2"
  | "FARGATE"
  | "EXTERNAL"
  | "MANAGED_INSTANCES"
  | (string & {});
export type CompatibilityList = Compatibility[];
export type CPUArchitecture = "X86_64" | "ARM64" | (string & {});
export type OSFamily =
  | "WINDOWS_SERVER_2019_FULL"
  | "WINDOWS_SERVER_2019_CORE"
  | "WINDOWS_SERVER_2016_FULL"
  | "WINDOWS_SERVER_2004_CORE"
  | "WINDOWS_SERVER_2022_CORE"
  | "WINDOWS_SERVER_2022_FULL"
  | "WINDOWS_SERVER_2025_CORE"
  | "WINDOWS_SERVER_2025_FULL"
  | "WINDOWS_SERVER_20H2_CORE"
  | "LINUX"
  | (string & {});
export interface RuntimePlatform {
  cpuArchitecture?: CPUArchitecture;
  operatingSystemFamily?: OSFamily;
}
export interface InferenceAccelerator {
  deviceName: string;
  deviceType: string;
}
export type InferenceAccelerators = InferenceAccelerator[];
export type PidMode = "host" | "task" | (string & {});
export type IpcMode = "host" | "task" | "none" | (string & {});
export type ProxyConfigurationType = "APPMESH" | (string & {});
export type ProxyConfigurationProperties = KeyValuePair[];
export interface ProxyConfiguration {
  type?: ProxyConfigurationType;
  containerName: string;
  properties?: KeyValuePair[];
}
export interface EphemeralStorage {
  sizeInGiB: number;
}
export interface TaskDefinition {
  taskDefinitionArn?: string;
  containerDefinitions?: ContainerDefinition[];
  family?: string;
  taskRoleArn?: string;
  executionRoleArn?: string;
  networkMode?: NetworkMode;
  revision?: number;
  volumes?: Volume[];
  status?: TaskDefinitionStatus;
  requiresAttributes?: Attribute[];
  placementConstraints?: TaskDefinitionPlacementConstraint[];
  compatibilities?: Compatibility[];
  runtimePlatform?: RuntimePlatform;
  requiresCompatibilities?: Compatibility[];
  cpu?: string;
  memory?: string;
  inferenceAccelerators?: InferenceAccelerator[];
  pidMode?: PidMode;
  ipcMode?: IpcMode;
  proxyConfiguration?: ProxyConfiguration;
  registeredAt?: Date;
  deregisteredAt?: Date;
  deleteRequestedAt?: Date;
  registeredBy?: string;
  ephemeralStorage?: EphemeralStorage;
  enableFaultInjection?: boolean;
}
export type TaskDefinitionList = TaskDefinition[];
export interface Failure {
  arn?: string;
  reason?: string;
  detail?: string;
}
export type Failures = Failure[];
export interface DeleteTaskDefinitionsResponse {
  taskDefinitions?: TaskDefinition[];
  failures?: Failure[];
}
export interface DeleteTaskSetRequest {
  cluster: string;
  service: string;
  taskSet: string;
  force?: boolean;
}
export interface DeleteTaskSetResponse {
  taskSet?: TaskSet;
}
export interface DeregisterContainerInstanceRequest {
  cluster?: string;
  containerInstance: string;
  force?: boolean;
}
export interface VersionInfo {
  agentVersion?: string;
  agentHash?: string;
  dockerVersion?: string;
}
export interface Resource {
  name?: string;
  type?: string;
  doubleValue?: number;
  longValue?: number;
  integerValue?: number;
  stringSetValue?: string[];
}
export type Resources = Resource[];
export type AgentUpdateStatus =
  | "PENDING"
  | "STAGING"
  | "STAGED"
  | "UPDATING"
  | "UPDATED"
  | "FAILED"
  | (string & {});
export type InstanceHealthCheckState =
  | "OK"
  | "IMPAIRED"
  | "INSUFFICIENT_DATA"
  | "INITIALIZING"
  | (string & {});
export type InstanceHealthCheckType =
  | "CONTAINER_RUNTIME"
  | "ACCELERATED_COMPUTE"
  | "DAEMON"
  | "AGENT_CONNECTIVITY"
  | (string & {});
export interface InstanceHealthCheckResult {
  type?: InstanceHealthCheckType;
  status?: InstanceHealthCheckState;
  statusReason?: string;
  lastUpdated?: Date;
  lastStatusChange?: Date;
}
export type InstanceHealthCheckResultList = InstanceHealthCheckResult[];
export interface ContainerInstanceHealthStatus {
  overallStatus?: InstanceHealthCheckState;
  details?: InstanceHealthCheckResult[];
}
export interface ContainerInstance {
  containerInstanceArn?: string;
  ec2InstanceId?: string;
  capacityProviderName?: string;
  version?: number;
  versionInfo?: VersionInfo;
  remainingResources?: Resource[];
  registeredResources?: Resource[];
  status?: string;
  statusReason?: string;
  agentConnected?: boolean;
  runningTasksCount?: number;
  pendingTasksCount?: number;
  agentUpdateStatus?: AgentUpdateStatus;
  attributes?: Attribute[];
  registeredAt?: Date;
  attachments?: Attachment[];
  tags?: Tag[];
  healthStatus?: ContainerInstanceHealthStatus;
}
export interface DeregisterContainerInstanceResponse {
  containerInstance?: ContainerInstance;
}
export interface DeregisterTaskDefinitionRequest {
  taskDefinition: string;
}
export interface DeregisterTaskDefinitionResponse {
  taskDefinition?: TaskDefinition;
}
export type CapacityProviderField = "TAGS" | (string & {});
export type CapacityProviderFieldList = CapacityProviderField[];
export interface DescribeCapacityProvidersRequest {
  capacityProviders?: string[];
  cluster?: string;
  include?: CapacityProviderField[];
  maxResults?: number;
  nextToken?: string;
}
export type CapacityProviders = CapacityProvider[];
export interface DescribeCapacityProvidersResponse {
  capacityProviders?: CapacityProvider[];
  failures?: Failure[];
  nextToken?: string;
}
export type ClusterField =
  | "ATTACHMENTS"
  | "CONFIGURATIONS"
  | "SETTINGS"
  | "STATISTICS"
  | "TAGS"
  | (string & {});
export type ClusterFieldList = ClusterField[];
export interface DescribeClustersRequest {
  clusters?: string[];
  include?: ClusterField[];
}
export type Clusters = Cluster[];
export interface DescribeClustersResponse {
  clusters?: Cluster[];
  failures?: Failure[];
}
export type ContainerInstanceField =
  | "TAGS"
  | "CONTAINER_INSTANCE_HEALTH"
  | (string & {});
export type ContainerInstanceFieldList = ContainerInstanceField[];
export interface DescribeContainerInstancesRequest {
  cluster?: string;
  containerInstances: string[];
  include?: ContainerInstanceField[];
}
export type ContainerInstances = ContainerInstance[];
export interface DescribeContainerInstancesResponse {
  containerInstances?: ContainerInstance[];
  failures?: Failure[];
}
export interface DescribeDaemonRequest {
  daemonArn: string;
}
export interface DaemonCapacityProvider {
  arn?: string;
  runningCount?: number;
}
export type DaemonCapacityProviderList = DaemonCapacityProvider[];
export interface DaemonRevisionDetail {
  arn?: string;
  capacityProviders?: DaemonCapacityProvider[];
  totalRunningCount?: number;
}
export type DaemonRevisionDetailList = DaemonRevisionDetail[];
export interface DaemonDetail {
  daemonArn?: string;
  clusterArn?: string;
  status?: DaemonStatus;
  currentRevisions?: DaemonRevisionDetail[];
  deploymentArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface DescribeDaemonResponse {
  daemon?: DaemonDetail;
}
export interface DescribeDaemonDeploymentsRequest {
  daemonDeploymentArns: string[];
}
export type DaemonDeploymentStatus =
  | "PENDING"
  | "SUCCESSFUL"
  | "STOPPED"
  | "STOP_REQUESTED"
  | "IN_PROGRESS"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_SUCCESSFUL"
  | "ROLLBACK_FAILED"
  | (string & {});
export interface DaemonDeploymentCapacityProvider {
  arn?: string;
  runningInstanceCount?: number;
  drainingInstanceCount?: number;
}
export type DaemonDeploymentCapacityProviderList =
  DaemonDeploymentCapacityProvider[];
export interface DaemonDeploymentRevisionDetail {
  arn?: string;
  capacityProviders?: DaemonDeploymentCapacityProvider[];
  totalRunningInstanceCount?: number;
  totalDrainingInstanceCount?: number;
}
export type DaemonDeploymentRevisionDetailList =
  DaemonDeploymentRevisionDetail[];
export type DaemonDeploymentRollbackMonitorsStatus =
  | "TRIGGERED"
  | "MONITORING"
  | "MONITORING_COMPLETE"
  | "DISABLED"
  | (string & {});
export interface DaemonCircuitBreaker {
  failureCount?: number;
  status?: DaemonDeploymentRollbackMonitorsStatus;
  threshold?: number;
}
export interface DaemonDeploymentAlarms {
  status?: DaemonDeploymentRollbackMonitorsStatus;
  alarmNames?: string[];
  triggeredAlarmNames?: string[];
}
export interface DaemonRollback {
  reason?: string;
  startedAt?: Date;
  rollbackTargetDaemonRevisionArn?: string;
  rollbackCapacityProviders?: string[];
}
export interface DaemonDeployment {
  daemonDeploymentArn?: string;
  clusterArn?: string;
  status?: DaemonDeploymentStatus;
  statusReason?: string;
  targetDaemonRevision?: DaemonDeploymentRevisionDetail;
  sourceDaemonRevisions?: DaemonDeploymentRevisionDetail[];
  circuitBreaker?: DaemonCircuitBreaker;
  alarms?: DaemonDeploymentAlarms;
  rollback?: DaemonRollback;
  deploymentConfiguration?: DaemonDeploymentConfiguration;
  createdAt?: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}
export type DaemonDeploymentList = DaemonDeployment[];
export interface DescribeDaemonDeploymentsResponse {
  failures?: Failure[];
  daemonDeployments?: DaemonDeployment[];
}
export interface DescribeDaemonRevisionsRequest {
  daemonRevisionArns: string[];
}
export interface DaemonContainerImage {
  containerName?: string;
  imageDigest?: string;
  image?: string;
}
export type DaemonContainerImages = DaemonContainerImage[];
export interface DaemonRevision {
  daemonRevisionArn?: string;
  clusterArn?: string;
  daemonArn?: string;
  daemonTaskDefinitionArn?: string;
  createdAt?: Date;
  containerImages?: DaemonContainerImage[];
  propagateTags?: DaemonPropagateTags;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
}
export type DaemonRevisions = DaemonRevision[];
export interface DescribeDaemonRevisionsResponse {
  daemonRevisions?: DaemonRevision[];
  failures?: Failure[];
}
export interface DescribeDaemonTaskDefinitionRequest {
  daemonTaskDefinition: string;
}
export interface DaemonLinuxParameters {
  capabilities?: KernelCapabilities;
  devices?: Device[];
  initProcessEnabled?: boolean;
  tmpfs?: Tmpfs[];
}
export interface DaemonContainerDefinition {
  name?: string;
  image: string;
  memory?: number;
  memoryReservation?: number;
  repositoryCredentials?: RepositoryCredentials;
  healthCheck?: HealthCheck;
  cpu?: number;
  essential?: boolean;
  entryPoint?: string[];
  command?: string[];
  workingDirectory?: string;
  environmentFiles?: EnvironmentFile[];
  environment?: KeyValuePair[];
  secrets?: Secret[];
  readonlyRootFilesystem?: boolean;
  mountPoints?: MountPoint[];
  logConfiguration?: LogConfiguration;
  firelensConfiguration?: FirelensConfiguration;
  privileged?: boolean;
  user?: string;
  ulimits?: Ulimit[];
  linuxParameters?: DaemonLinuxParameters;
  dependsOn?: ContainerDependency[];
  startTimeout?: number;
  stopTimeout?: number;
  systemControls?: SystemControl[];
  interactive?: boolean;
  pseudoTerminal?: boolean;
  restartPolicy?: ContainerRestartPolicy;
}
export type DaemonContainerDefinitionList = DaemonContainerDefinition[];
export interface DaemonVolume {
  name?: string;
  host?: HostVolumeProperties;
}
export type DaemonVolumeList = DaemonVolume[];
export type DaemonTaskDefinitionStatus =
  | "ACTIVE"
  | "DELETE_IN_PROGRESS"
  | "DELETED"
  | (string & {});
export type DaemonPidMode = "none" | "shared" | (string & {});
export type DaemonIpcMode = "none" | "shared" | (string & {});
export interface DaemonTaskDefinition {
  daemonTaskDefinitionArn?: string;
  family?: string;
  revision?: number;
  taskRoleArn?: string;
  executionRoleArn?: string;
  containerDefinitions?: DaemonContainerDefinition[];
  volumes?: DaemonVolume[];
  cpu?: string;
  memory?: string;
  status?: DaemonTaskDefinitionStatus;
  registeredAt?: Date;
  deleteRequestedAt?: Date;
  registeredBy?: string;
  pidMode?: DaemonPidMode;
  ipcMode?: DaemonIpcMode;
}
export interface DescribeDaemonTaskDefinitionResponse {
  daemonTaskDefinition?: DaemonTaskDefinition;
}
export type ExpressGatewayServiceInclude = "TAGS" | (string & {});
export type ExpressGatewayServiceIncludeList = ExpressGatewayServiceInclude[];
export interface DescribeExpressGatewayServiceRequest {
  serviceArn: string;
  include?: ExpressGatewayServiceInclude[];
}
export interface DescribeExpressGatewayServiceResponse {
  service?: ECSExpressGatewayService;
}
export interface DescribeServiceDeploymentsRequest {
  serviceDeploymentArns: string[];
}
export interface ServiceRevisionSummary {
  arn?: string;
  requestedTaskCount?: number;
  runningTaskCount?: number;
  pendingTaskCount?: number;
  requestedTestTrafficWeight?: number;
  requestedProductionTrafficWeight?: number;
}
export type ServiceRevisionsSummaryList = ServiceRevisionSummary[];
export type ServiceDeploymentStatus =
  | "PENDING"
  | "SUCCESSFUL"
  | "STOPPED"
  | "STOP_REQUESTED"
  | "IN_PROGRESS"
  | "ROLLBACK_REQUESTED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_SUCCESSFUL"
  | "ROLLBACK_FAILED"
  | (string & {});
export type ServiceDeploymentLifecycleStage =
  | "RECONCILE_SERVICE"
  | "PRE_SCALE_UP"
  | "SCALE_UP"
  | "POST_SCALE_UP"
  | "TEST_TRAFFIC_SHIFT"
  | "POST_TEST_TRAFFIC_SHIFT"
  | "PRODUCTION_TRAFFIC_SHIFT"
  | "POST_PRODUCTION_TRAFFIC_SHIFT"
  | "BAKE_TIME"
  | "CLEAN_UP"
  | (string & {});
export type DeploymentLifecycleHookStatus =
  | "AWAITING_ACTION"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export interface DeploymentLifecycleHookDetail {
  hookId?: string;
  targetType?: DeploymentLifecycleHookTargetType;
  targetArn?: string;
  status?: DeploymentLifecycleHookStatus;
  expiresAt?: Date;
  timeoutAction?: DeploymentLifecycleHookAction;
}
export type DeploymentLifecycleHookDetailList = DeploymentLifecycleHookDetail[];
export interface Rollback {
  reason?: string;
  startedAt?: Date;
  serviceRevisionArn?: string;
}
export type ServiceDeploymentRollbackMonitorsStatus =
  | "TRIGGERED"
  | "MONITORING"
  | "MONITORING_COMPLETE"
  | "DISABLED"
  | (string & {});
export interface ServiceDeploymentCircuitBreaker {
  status?: ServiceDeploymentRollbackMonitorsStatus;
  failureCount?: number;
  threshold?: number;
}
export interface ServiceDeploymentAlarms {
  status?: ServiceDeploymentRollbackMonitorsStatus;
  alarmNames?: string[];
  triggeredAlarmNames?: string[];
}
export interface ServiceDeployment {
  serviceDeploymentArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  createdAt?: Date;
  startedAt?: Date;
  finishedAt?: Date;
  stoppedAt?: Date;
  updatedAt?: Date;
  sourceServiceRevisions?: ServiceRevisionSummary[];
  targetServiceRevision?: ServiceRevisionSummary;
  status?: ServiceDeploymentStatus;
  statusReason?: string;
  lifecycleStage?: ServiceDeploymentLifecycleStage;
  lifecycleHookDetails?: DeploymentLifecycleHookDetail[];
  deploymentConfiguration?: DeploymentConfiguration;
  rollback?: Rollback;
  deploymentCircuitBreaker?: ServiceDeploymentCircuitBreaker;
  alarms?: ServiceDeploymentAlarms;
}
export type ServiceDeployments = ServiceDeployment[];
export interface DescribeServiceDeploymentsResponse {
  serviceDeployments?: ServiceDeployment[];
  failures?: Failure[];
}
export interface DescribeServiceRevisionsRequest {
  serviceRevisionArns: string[];
}
export interface ContainerImage {
  containerName?: string;
  imageDigest?: string;
  image?: string;
}
export type ContainerImages = ContainerImage[];
export interface ServiceRevisionLoadBalancer {
  targetGroupArn?: string;
  productionListenerRule?: string;
}
export type ServiceRevisionLoadBalancers = ServiceRevisionLoadBalancer[];
export interface ResolvedConfiguration {
  loadBalancers?: ServiceRevisionLoadBalancer[];
}
export type ManagedResourceStatus =
  | "PROVISIONING"
  | "ACTIVE"
  | "DEPROVISIONING"
  | "DELETED"
  | "FAILED"
  | (string & {});
export interface ManagedLoadBalancer {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  scheme: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export interface ManagedSecurityGroup {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export type ManagedSecurityGroups = ManagedSecurityGroup[];
export interface ManagedCertificate {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  domainName: string;
}
export interface ManagedListener {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export interface ManagedListenerRule {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export interface ManagedTargetGroup {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  healthCheckPath: string;
  healthCheckPort: number;
  port: number;
}
export type ManagedTargetGroups = ManagedTargetGroup[];
export interface ManagedIngressPath {
  accessType: AccessType;
  endpoint: string;
  loadBalancer?: ManagedLoadBalancer;
  loadBalancerSecurityGroups?: ManagedSecurityGroup[];
  certificate?: ManagedCertificate;
  listener?: ManagedListener;
  rule?: ManagedListenerRule;
  targetGroups?: ManagedTargetGroup[];
}
export type ManagedIngressPaths = ManagedIngressPath[];
export interface ManagedScalableTarget {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  minCapacity: number;
  maxCapacity: number;
}
export interface ManagedApplicationAutoScalingPolicy {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  policyType: string;
  targetValue: number;
  metric: string;
}
export type ManagedApplicationAutoScalingPolicies =
  ManagedApplicationAutoScalingPolicy[];
export interface ManagedAutoScaling {
  scalableTarget?: ManagedScalableTarget;
  applicationAutoScalingPolicies?: ManagedApplicationAutoScalingPolicy[];
}
export interface ManagedMetricAlarm {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
}
export type ManagedMetricAlarms = ManagedMetricAlarm[];
export interface ManagedLogGroup {
  arn?: string;
  status: ManagedResourceStatus;
  statusReason?: string;
  updatedAt: Date;
  logGroupName: string;
}
export type ManagedLogGroups = ManagedLogGroup[];
export interface ECSManagedResources {
  ingressPaths?: ManagedIngressPath[];
  autoScaling?: ManagedAutoScaling;
  metricAlarms?: ManagedMetricAlarm[];
  serviceSecurityGroups?: ManagedSecurityGroup[];
  logGroups?: ManagedLogGroup[];
}
export interface RuntimePlatformOverride {
  cpuArchitecture?: string;
}
export interface ServiceRevisionOverrides {
  runtimePlatform?: RuntimePlatformOverride;
}
export interface ServiceRevision {
  serviceRevisionArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  taskDefinition?: string;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  launchType?: LaunchType;
  platformVersion?: string;
  platformFamily?: string;
  loadBalancers?: LoadBalancer[];
  serviceRegistries?: ServiceRegistry[];
  networkConfiguration?: NetworkConfiguration;
  containerImages?: ContainerImage[];
  guardDutyEnabled?: boolean;
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  volumeConfigurations?: ServiceVolumeConfiguration[];
  fargateEphemeralStorage?: DeploymentEphemeralStorage;
  createdAt?: Date;
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
  resolvedConfiguration?: ResolvedConfiguration;
  ecsManagedResources?: ECSManagedResources;
  overrides?: ServiceRevisionOverrides;
  monitoring?: MonitoringConfiguration;
}
export type ServiceRevisions = ServiceRevision[];
export interface DescribeServiceRevisionsResponse {
  serviceRevisions?: ServiceRevision[];
  failures?: Failure[];
}
export type ServiceField = "TAGS" | (string & {});
export type ServiceFieldList = ServiceField[];
export interface DescribeServicesRequest {
  cluster?: string;
  services: string[];
  include?: ServiceField[];
}
export type Services = Service[];
export interface DescribeServicesResponse {
  services?: Service[];
  failures?: Failure[];
}
export type TaskDefinitionField = "TAGS" | (string & {});
export type TaskDefinitionFieldList = TaskDefinitionField[];
export interface DescribeTaskDefinitionRequest {
  taskDefinition: string;
  include?: TaskDefinitionField[];
}
export interface DescribeTaskDefinitionResponse {
  taskDefinition?: TaskDefinition;
  tags?: Tag[];
}
export type TaskField = "TAGS" | (string & {});
export type TaskFieldList = TaskField[];
export interface DescribeTasksRequest {
  cluster?: string;
  tasks: string[];
  include?: TaskField[];
}
export type Connectivity = "CONNECTED" | "DISCONNECTED" | (string & {});
export interface NetworkBinding {
  bindIP?: string;
  containerPort?: number;
  hostPort?: number;
  protocol?: TransportProtocol;
  containerPortRange?: string;
  hostPortRange?: string;
}
export type NetworkBindings = NetworkBinding[];
export interface NetworkInterface {
  attachmentId?: string;
  privateIpv4Address?: string;
  ipv6Address?: string;
}
export type NetworkInterfaces = NetworkInterface[];
export type HealthStatus = "HEALTHY" | "UNHEALTHY" | "UNKNOWN" | (string & {});
export type ManagedAgentName = "ExecuteCommandAgent" | (string & {});
export interface ManagedAgent {
  lastStartedAt?: Date;
  name?: ManagedAgentName;
  reason?: string;
  lastStatus?: string;
}
export type ManagedAgents = ManagedAgent[];
export type GpuIds = string[];
export type NeuronDeviceIds = string[];
export interface Container {
  containerArn?: string;
  taskArn?: string;
  name?: string;
  image?: string;
  imageDigest?: string;
  runtimeId?: string;
  lastStatus?: string;
  exitCode?: number;
  reason?: string;
  networkBindings?: NetworkBinding[];
  networkInterfaces?: NetworkInterface[];
  healthStatus?: HealthStatus;
  managedAgents?: ManagedAgent[];
  cpu?: string;
  memory?: string;
  memoryReservation?: string;
  gpuIds?: string[];
  neuronDeviceIds?: string[];
}
export type Containers = Container[];
export interface ContainerOverride {
  name?: string;
  command?: string[];
  environment?: KeyValuePair[];
  environmentFiles?: EnvironmentFile[];
  cpu?: number;
  memory?: number;
  memoryReservation?: number;
  resourceRequirements?: ResourceRequirement[];
}
export type ContainerOverrides = ContainerOverride[];
export interface InferenceAcceleratorOverride {
  deviceName?: string;
  deviceType?: string;
}
export type InferenceAcceleratorOverrides = InferenceAcceleratorOverride[];
export interface TaskOverride {
  containerOverrides?: ContainerOverride[];
  cpu?: string;
  inferenceAcceleratorOverrides?: InferenceAcceleratorOverride[];
  executionRoleArn?: string;
  memory?: string;
  taskRoleArn?: string;
  ephemeralStorage?: EphemeralStorage;
}
export type TaskStopCode =
  | "TaskFailedToStart"
  | "EssentialContainerExited"
  | "UserInitiated"
  | "ServiceSchedulerInitiated"
  | "SpotInterruption"
  | "TerminationNotice"
  | "InfrastructureHealth"
  | (string & {});
export interface TaskEphemeralStorage {
  sizeInGiB?: number;
  kmsKeyId?: string;
}
export interface Task {
  attachments?: Attachment[];
  attributes?: Attribute[];
  availabilityZone?: string;
  capacityProviderName?: string;
  clusterArn?: string;
  connectivity?: Connectivity;
  connectivityAt?: Date;
  containerInstanceArn?: string;
  containers?: Container[];
  cpu?: string;
  createdAt?: Date;
  desiredStatus?: string;
  enableExecuteCommand?: boolean;
  executionStoppedAt?: Date;
  group?: string;
  healthStatus?: HealthStatus;
  inferenceAccelerators?: InferenceAccelerator[];
  lastStatus?: string;
  launchType?: LaunchType;
  memory?: string;
  overrides?: TaskOverride;
  platformVersion?: string;
  platformFamily?: string;
  pullStartedAt?: Date;
  pullStoppedAt?: Date;
  startedAt?: Date;
  startedBy?: string;
  stopCode?: TaskStopCode;
  stoppedAt?: Date;
  stoppedReason?: string;
  stoppingAt?: Date;
  tags?: Tag[];
  taskArn?: string;
  taskDefinitionArn?: string;
  version?: number;
  ephemeralStorage?: EphemeralStorage;
  fargateEphemeralStorage?: TaskEphemeralStorage;
}
export type Tasks = Task[];
export interface DescribeTasksResponse {
  tasks?: Task[];
  failures?: Failure[];
}
export type TaskSetField = "TAGS" | (string & {});
export type TaskSetFieldList = TaskSetField[];
export interface DescribeTaskSetsRequest {
  cluster: string;
  service: string;
  taskSets?: string[];
  include?: TaskSetField[];
}
export interface DescribeTaskSetsResponse {
  taskSets?: TaskSet[];
  failures?: Failure[];
}
export interface DiscoverPollEndpointRequest {
  containerInstance?: string;
  cluster?: string;
}
export interface DiscoverPollEndpointResponse {
  endpoint?: string;
  telemetryEndpoint?: string;
  serviceConnectEndpoint?: string;
}
export interface ExecuteCommandRequest {
  cluster?: string;
  container?: string;
  command: string;
  interactive: boolean;
  task: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface Session {
  sessionId?: string;
  streamUrl?: string;
  tokenValue?: string | redacted.Redacted<string>;
}
export interface ExecuteCommandResponse {
  clusterArn?: string;
  containerArn?: string;
  containerName?: string;
  interactive?: boolean;
  session?: Session;
  taskArn?: string;
}
export interface GetTaskProtectionRequest {
  cluster: string;
  tasks?: string[];
}
export interface ProtectedTask {
  taskArn?: string;
  protectionEnabled?: boolean;
  expirationDate?: Date;
}
export type ProtectedTasks = ProtectedTask[];
export interface GetTaskProtectionResponse {
  protectedTasks?: ProtectedTask[];
  failures?: Failure[];
}
export interface ListAccountSettingsRequest {
  name?: SettingName;
  value?: string;
  principalArn?: string;
  effectiveSettings?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export type Settings = Setting[];
export interface ListAccountSettingsResponse {
  settings?: Setting[];
  nextToken?: string;
}
export interface ListAttributesRequest {
  cluster?: string;
  targetType: TargetType;
  attributeName?: string;
  attributeValue?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListAttributesResponse {
  attributes?: Attribute[];
  nextToken?: string;
}
export interface ListClustersRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ListClustersResponse {
  clusterArns?: string[];
  nextToken?: string;
}
export type ContainerInstanceStatus =
  | "ACTIVE"
  | "DRAINING"
  | "REGISTERING"
  | "DEREGISTERING"
  | "REGISTRATION_FAILED"
  | (string & {});
export interface ListContainerInstancesRequest {
  cluster?: string;
  filter?: string;
  nextToken?: string;
  maxResults?: number;
  status?: ContainerInstanceStatus;
}
export interface ListContainerInstancesResponse {
  containerInstanceArns?: string[];
  nextToken?: string;
}
export type DaemonDeploymentStatusList = DaemonDeploymentStatus[];
export interface CreatedAt {
  before?: Date;
  after?: Date;
}
export interface ListDaemonDeploymentsRequest {
  daemonArn: string;
  status?: DaemonDeploymentStatus[];
  createdAt?: CreatedAt;
  maxResults?: number;
  nextToken?: string;
}
export interface DaemonDeploymentSummary {
  daemonDeploymentArn?: string;
  daemonArn?: string;
  clusterArn?: string;
  status?: DaemonDeploymentStatus;
  statusReason?: string;
  targetDaemonRevisionArn?: string;
  createdAt?: Date;
  startedAt?: Date;
  stoppedAt?: Date;
  finishedAt?: Date;
}
export type DaemonDeploymentSummaryList = DaemonDeploymentSummary[];
export interface ListDaemonDeploymentsResponse {
  nextToken?: string;
  daemonDeployments?: DaemonDeploymentSummary[];
}
export interface ListDaemonsRequest {
  clusterArn?: string;
  capacityProviderArns?: string[];
  maxResults?: number;
  nextToken?: string;
}
export interface DaemonSummary {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export type DaemonSummariesList = DaemonSummary[];
export interface ListDaemonsResponse {
  daemonSummariesList?: DaemonSummary[];
  nextToken?: string;
}
export type DaemonTaskDefinitionRevisionFilter =
  | "LAST_REGISTERED"
  | (string & {});
export type DaemonTaskDefinitionStatusFilter =
  | "ACTIVE"
  | "DELETE_IN_PROGRESS"
  | "ALL"
  | (string & {});
export type SortOrder = "ASC" | "DESC" | (string & {});
export interface ListDaemonTaskDefinitionsRequest {
  familyPrefix?: string;
  family?: string;
  revision?: DaemonTaskDefinitionRevisionFilter;
  status?: DaemonTaskDefinitionStatusFilter;
  sort?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface DaemonTaskDefinitionSummary {
  arn?: string;
  registeredAt?: Date;
  registeredBy?: string;
  deleteRequestedAt?: Date;
  status?: DaemonTaskDefinitionStatus;
}
export type DaemonTaskDefinitionSummaries = DaemonTaskDefinitionSummary[];
export interface ListDaemonTaskDefinitionsResponse {
  daemonTaskDefinitions?: DaemonTaskDefinitionSummary[];
  nextToken?: string;
}
export type ServiceDeploymentStatusList = ServiceDeploymentStatus[];
export interface ListServiceDeploymentsRequest {
  service: string;
  cluster?: string;
  status?: ServiceDeploymentStatus[];
  createdAt?: CreatedAt;
  nextToken?: string;
  maxResults?: number;
}
export interface ServiceDeploymentBrief {
  serviceDeploymentArn?: string;
  serviceArn?: string;
  clusterArn?: string;
  startedAt?: Date;
  createdAt?: Date;
  finishedAt?: Date;
  targetServiceRevisionArn?: string;
  status?: ServiceDeploymentStatus;
  statusReason?: string;
}
export type ServiceDeploymentsBrief = ServiceDeploymentBrief[];
export interface ListServiceDeploymentsResponse {
  serviceDeployments?: ServiceDeploymentBrief[];
  nextToken?: string;
}
export interface ListServicesRequest {
  cluster?: string;
  nextToken?: string;
  maxResults?: number;
  launchType?: LaunchType;
  schedulingStrategy?: SchedulingStrategy;
  resourceManagementType?: ResourceManagementType;
}
export interface ListServicesResponse {
  serviceArns?: string[];
  nextToken?: string;
}
export interface ListServicesByNamespaceRequest {
  namespace: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListServicesByNamespaceResponse {
  serviceArns?: string[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export type TaskDefinitionFamilyStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "ALL"
  | (string & {});
export interface ListTaskDefinitionFamiliesRequest {
  familyPrefix?: string;
  status?: TaskDefinitionFamilyStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTaskDefinitionFamiliesResponse {
  families?: string[];
  nextToken?: string;
}
export interface ListTaskDefinitionsRequest {
  familyPrefix?: string;
  status?: TaskDefinitionStatus;
  sort?: SortOrder;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTaskDefinitionsResponse {
  taskDefinitionArns?: string[];
  nextToken?: string;
}
export type DesiredStatus = "RUNNING" | "PENDING" | "STOPPED" | (string & {});
export interface ListTasksRequest {
  cluster?: string;
  containerInstance?: string;
  family?: string;
  nextToken?: string;
  maxResults?: number;
  startedBy?: string;
  serviceName?: string;
  desiredStatus?: DesiredStatus;
  launchType?: LaunchType;
  daemonName?: string;
}
export interface ListTasksResponse {
  taskArns?: string[];
  nextToken?: string;
}
export interface PutAccountSettingRequest {
  name: SettingName;
  value: string;
  principalArn?: string;
}
export interface PutAccountSettingResponse {
  setting?: Setting;
}
export interface PutAccountSettingDefaultRequest {
  name: SettingName;
  value: string;
}
export interface PutAccountSettingDefaultResponse {
  setting?: Setting;
}
export interface PutAttributesRequest {
  cluster?: string;
  attributes: Attribute[];
}
export interface PutAttributesResponse {
  attributes?: Attribute[];
}
export interface PutClusterCapacityProvidersRequest {
  cluster: string;
  capacityProviders: string[];
  defaultCapacityProviderStrategy: CapacityProviderStrategyItem[];
}
export interface PutClusterCapacityProvidersResponse {
  cluster?: Cluster;
}
export type PlatformDeviceType = "GPU" | "NEURON_DEVICE" | (string & {});
export interface PlatformDevice {
  id: string;
  type: PlatformDeviceType;
}
export type PlatformDevices = PlatformDevice[];
export interface RegisterContainerInstanceRequest {
  cluster?: string;
  instanceIdentityDocument?: string;
  instanceIdentityDocumentSignature?: string;
  totalResources?: Resource[];
  versionInfo?: VersionInfo;
  containerInstanceArn?: string;
  attributes?: Attribute[];
  platformDevices?: PlatformDevice[];
  tags?: Tag[];
}
export interface RegisterContainerInstanceResponse {
  containerInstance?: ContainerInstance;
}
export interface RegisterDaemonTaskDefinitionRequest {
  family: string;
  taskRoleArn?: string;
  executionRoleArn?: string;
  containerDefinitions: DaemonContainerDefinition[];
  cpu?: string;
  memory?: string;
  volumes?: DaemonVolume[];
  tags?: Tag[];
  pidMode?: DaemonPidMode;
  ipcMode?: DaemonIpcMode;
}
export interface RegisterDaemonTaskDefinitionResponse {
  daemonTaskDefinitionArn?: string;
}
export interface RegisterTaskDefinitionRequest {
  family: string;
  taskRoleArn?: string;
  executionRoleArn?: string;
  networkMode?: NetworkMode;
  containerDefinitions: ContainerDefinition[];
  volumes?: Volume[];
  placementConstraints?: TaskDefinitionPlacementConstraint[];
  requiresCompatibilities?: Compatibility[];
  cpu?: string;
  memory?: string;
  tags?: Tag[];
  pidMode?: PidMode;
  ipcMode?: IpcMode;
  proxyConfiguration?: ProxyConfiguration;
  inferenceAccelerators?: InferenceAccelerator[];
  ephemeralStorage?: EphemeralStorage;
  runtimePlatform?: RuntimePlatform;
  enableFaultInjection?: boolean;
}
export interface RegisterTaskDefinitionResponse {
  taskDefinition?: TaskDefinition;
  tags?: Tag[];
}
export interface TaskManagedEBSVolumeTerminationPolicy {
  deleteOnTermination: boolean;
}
export interface TaskManagedEBSVolumeConfiguration {
  encrypted?: boolean;
  kmsKeyId?: string;
  volumeType?: string;
  sizeInGiB?: number;
  snapshotId?: string;
  volumeInitializationRate?: number;
  iops?: number;
  throughput?: number;
  tagSpecifications?: EBSTagSpecification[];
  roleArn: string;
  terminationPolicy?: TaskManagedEBSVolumeTerminationPolicy;
  filesystemType?: TaskFilesystemType;
}
export interface TaskVolumeConfiguration {
  name: string;
  managedEBSVolume?: TaskManagedEBSVolumeConfiguration;
}
export type TaskVolumeConfigurations = TaskVolumeConfiguration[];
export interface RunTaskRequest {
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  cluster?: string;
  count?: number;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
  group?: string;
  launchType?: LaunchType;
  networkConfiguration?: NetworkConfiguration;
  overrides?: TaskOverride;
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  platformVersion?: string;
  propagateTags?: PropagateTags;
  referenceId?: string;
  startedBy?: string;
  tags?: Tag[];
  taskDefinition: string;
  clientToken?: string;
  volumeConfigurations?: TaskVolumeConfiguration[];
}
export interface RunTaskResponse {
  tasks?: Task[];
  failures?: Failure[];
}
export interface StartTaskRequest {
  cluster?: string;
  containerInstances: string[];
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
  group?: string;
  networkConfiguration?: NetworkConfiguration;
  overrides?: TaskOverride;
  propagateTags?: PropagateTags;
  referenceId?: string;
  startedBy?: string;
  tags?: Tag[];
  taskDefinition: string;
  volumeConfigurations?: TaskVolumeConfiguration[];
}
export interface StartTaskResponse {
  tasks?: Task[];
  failures?: Failure[];
}
export type StopServiceDeploymentStopType =
  | "ABORT"
  | "ROLLBACK"
  | (string & {});
export interface StopServiceDeploymentRequest {
  serviceDeploymentArn: string;
  stopType?: StopServiceDeploymentStopType;
}
export interface StopServiceDeploymentResponse {
  serviceDeploymentArn?: string;
}
export interface StopTaskRequest {
  cluster?: string;
  task: string;
  reason?: string;
}
export interface StopTaskResponse {
  task?: Task;
}
export interface AttachmentStateChange {
  attachmentArn: string;
  status: string;
}
export type AttachmentStateChanges = AttachmentStateChange[];
export interface SubmitAttachmentStateChangesRequest {
  cluster?: string;
  attachments: AttachmentStateChange[];
}
export interface SubmitAttachmentStateChangesResponse {
  acknowledgment?: string;
}
export interface SubmitContainerStateChangeRequest {
  cluster?: string;
  task?: string;
  containerName?: string;
  runtimeId?: string;
  status?: string;
  exitCode?: number;
  reason?: string;
  networkBindings?: NetworkBinding[];
}
export interface SubmitContainerStateChangeResponse {
  acknowledgment?: string;
}
export interface ContainerStateChange {
  containerName?: string;
  imageDigest?: string;
  runtimeId?: string;
  exitCode?: number;
  networkBindings?: NetworkBinding[];
  reason?: string;
  status?: string;
}
export type ContainerStateChanges = ContainerStateChange[];
export interface ManagedAgentStateChange {
  containerName: string;
  managedAgentName: ManagedAgentName;
  status: string;
  reason?: string;
}
export type ManagedAgentStateChanges = ManagedAgentStateChange[];
export interface SubmitTaskStateChangeRequest {
  cluster?: string;
  task?: string;
  status?: string;
  reason?: string;
  containers?: ContainerStateChange[];
  attachments?: AttachmentStateChange[];
  managedAgents?: ManagedAgentStateChange[];
  pullStartedAt?: Date;
  pullStoppedAt?: Date;
  executionStoppedAt?: Date;
}
export interface SubmitTaskStateChangeResponse {
  acknowledgment?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface AutoScalingGroupProviderUpdate {
  managedScaling?: ManagedScaling;
  managedTerminationProtection?: ManagedTerminationProtection;
  managedDraining?: ManagedDraining;
}
export interface InstanceLaunchTemplateUpdate {
  ec2InstanceProfileArn?: string;
  networkConfiguration?: ManagedInstancesNetworkConfiguration;
  storageConfiguration?: ManagedInstancesStorageConfiguration;
  instanceMetadataTagsPropagation?: boolean;
  localStorageConfiguration?: ManagedInstancesLocalStorageConfiguration;
  monitoring?: ManagedInstancesMonitoringOptions;
  instanceRequirements?: InstanceRequirementsRequest;
  capacityReservations?: CapacityReservationRequest;
}
export interface UpdateManagedInstancesProviderConfiguration {
  infrastructureRoleArn: string;
  instanceLaunchTemplate: InstanceLaunchTemplateUpdate;
  propagateTags?: PropagateMITags;
  infrastructureOptimization?: InfrastructureOptimization;
  autoRepairConfiguration?: AutoRepairConfiguration;
}
export interface UpdateCapacityProviderRequest {
  name: string;
  cluster?: string;
  autoScalingGroupProvider?: AutoScalingGroupProviderUpdate;
  managedInstancesProvider?: UpdateManagedInstancesProviderConfiguration;
}
export interface UpdateCapacityProviderResponse {
  capacityProvider?: CapacityProvider;
}
export interface UpdateClusterRequest {
  cluster: string;
  settings?: ClusterSetting[];
  configuration?: ClusterConfiguration;
  serviceConnectDefaults?: ClusterServiceConnectDefaultsRequest;
}
export interface UpdateClusterResponse {
  cluster?: Cluster;
}
export interface UpdateClusterSettingsRequest {
  cluster: string;
  settings: ClusterSetting[];
}
export interface UpdateClusterSettingsResponse {
  cluster?: Cluster;
}
export interface UpdateContainerAgentRequest {
  cluster?: string;
  containerInstance: string;
}
export interface UpdateContainerAgentResponse {
  containerInstance?: ContainerInstance;
}
export interface UpdateContainerInstancesStateRequest {
  cluster?: string;
  containerInstances: string[];
  status: ContainerInstanceStatus;
}
export interface UpdateContainerInstancesStateResponse {
  containerInstances?: ContainerInstance[];
  failures?: Failure[];
}
export interface UpdateDaemonRequest {
  daemonArn: string;
  daemonTaskDefinitionArn: string;
  capacityProviderArns: string[];
  deploymentConfiguration?: DaemonDeploymentConfiguration;
  propagateTags?: DaemonPropagateTags;
  enableECSManagedTags?: boolean;
  enableExecuteCommand?: boolean;
}
export interface UpdateDaemonResponse {
  daemonArn?: string;
  status?: DaemonStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deploymentArn?: string;
}
export interface UpdateExpressGatewayServiceRequest {
  serviceArn: string;
  executionRoleArn?: string;
  healthCheckPath?: string;
  primaryContainer?: ExpressGatewayContainer;
  taskRoleArn?: string;
  networkConfiguration?: ExpressGatewayServiceNetworkConfiguration;
  cpu?: string;
  memory?: string;
  scalingTarget?: ExpressGatewayScalingTarget;
  taskDefinitionArn?: string;
}
export interface UpdatedExpressGatewayService {
  serviceArn?: string;
  cluster?: string;
  serviceName?: string;
  status?: ExpressGatewayServiceStatus;
  targetConfiguration?: ExpressGatewayServiceConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UpdateExpressGatewayServiceResponse {
  service?: UpdatedExpressGatewayService;
}
export interface UpdateServiceRequest {
  cluster?: string;
  service: string;
  desiredCount?: number;
  taskDefinition?: string;
  capacityProviderStrategy?: CapacityProviderStrategyItem[];
  deploymentConfiguration?: DeploymentConfiguration;
  availabilityZoneRebalancing?: AvailabilityZoneRebalancing;
  networkConfiguration?: NetworkConfiguration;
  placementConstraints?: PlacementConstraint[];
  placementStrategy?: PlacementStrategy[];
  platformVersion?: string;
  forceNewDeployment?: boolean;
  healthCheckGracePeriodSeconds?: number;
  deploymentController?: DeploymentController;
  enableExecuteCommand?: boolean;
  enableECSManagedTags?: boolean;
  loadBalancers?: LoadBalancer[];
  propagateTags?: PropagateTags;
  serviceRegistries?: ServiceRegistry[];
  serviceConnectConfiguration?: ServiceConnectConfiguration;
  volumeConfigurations?: ServiceVolumeConfiguration[];
  vpcLatticeConfigurations?: VpcLatticeConfiguration[];
  monitoring?: MonitoringConfiguration;
}
export interface UpdateServiceResponse {
  service?: Service;
}
export interface UpdateServicePrimaryTaskSetRequest {
  cluster: string;
  service: string;
  primaryTaskSet: string;
}
export interface UpdateServicePrimaryTaskSetResponse {
  taskSet?: TaskSet;
}
export interface UpdateTaskProtectionRequest {
  cluster: string;
  tasks: string[];
  protectionEnabled: boolean;
  expiresInMinutes?: number;
}
export interface UpdateTaskProtectionResponse {
  protectedTasks?: ProtectedTask[];
  failures?: Failure[];
}
export interface UpdateTaskSetRequest {
  cluster: string;
  service: string;
  taskSet: string;
  scale: Scale;
}
export interface UpdateTaskSetResponse {
  taskSet?: TaskSet;
}
export type ResourceIds = string[];
export type ContinueServiceDeploymentError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | ServiceDeploymentNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Continues or rolls back an Amazon ECS service deployment that is paused at a lifecycle hook.
 *
 * When a service deployment reaches a lifecycle stage that has a `PAUSE` hook configured, the deployment pauses and waits for an explicit action. Use this API to either continue the deployment to the next stage or roll back to the previous service revision.
 *
 * To find the `hookId` of the paused hook, call DescribeServiceDeployments and inspect the `lifecycleHookDetails` field.
 *
 * For more information, see Continuing Amazon ECS service deployments in the *Amazon Elastic Container Service Developer Guide*.
 */
export const continueServiceDeployment: API.OperationMethod<
  ContinueServiceDeploymentRequest,
  ContinueServiceDeploymentResponse,
  ContinueServiceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceDeploymentArn: 0, hookId: 0, action: 0 },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
    ServiceDeploymentNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ContinueServiceDeployment",
})) as any;

export type CreateCapacityProviderError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | UnsupportedFeatureException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Creates a capacity provider. Capacity providers are associated with a cluster and are used in capacity provider strategies to facilitate cluster auto scaling. You can create capacity providers for Amazon ECS Managed Instances and EC2 instances. Fargate has the predefined `FARGATE` and `FARGATE_SPOT` capacity providers.
 */
export const createCapacityProvider: API.OperationMethod<
  CreateCapacityProviderRequest,
  CreateCapacityProviderResponse,
  CreateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      cluster: 0,
      autoScalingGroupProvider: {
        autoScalingGroupArn: 0,
        managedScaling: i_ManagedScaling,
        managedTerminationProtection: 0,
        managedDraining: 0,
      },
      managedInstancesProvider: {
        infrastructureRoleArn: 0,
        instanceLaunchTemplate: {
          ec2InstanceProfileArn: 0,
          networkConfiguration: i_ManagedInstancesNetworkConfiguration,
          storageConfiguration: i_ManagedInstancesStorageConfiguration,
          localStorageConfiguration:
            i_ManagedInstancesLocalStorageConfiguration,
          monitoring: 0,
          capacityOptionType: 0,
          instanceMetadataTagsPropagation: 0,
          instanceRequirements: i_InstanceRequirementsRequest,
          fipsEnabled: 0,
          capacityReservations: i_CapacityReservationRequest,
        },
        propagateTags: 0,
        infrastructureOptimization: i_InfrastructureOptimization,
        autoRepairConfiguration: i_AutoRepairConfiguration,
      },
      tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    UnsupportedFeatureException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityProvider",
})) as any;

export type CreateClusterError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Creates a new Amazon ECS cluster. By default, your account receives a `default` cluster when you launch your first container instance. However, you can create your own cluster with a unique name.
 *
 * When you call the CreateCluster API operation, Amazon ECS attempts to create the Amazon ECS service-linked role for your account. This is so that it can manage required resources in other Amazon Web Services services on your behalf. However, if the user that makes the call doesn't have permissions to create the service-linked role, it isn't created. For more information, see Using service-linked roles for Amazon ECS in the *Amazon Elastic Container Service Developer Guide*.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      clusterName: 0,
      tags: D.list(i_Tag),
      settings: D.list(i_ClusterSetting),
      configuration: i_ClusterConfiguration,
      capacityProviders: 0,
      defaultCapacityProviderStrategy: D.list(i_CapacityProviderStrategyItem),
      serviceConnectDefaults: i_ClusterServiceConnectDefaultsRequest,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
})) as any;

export type CreateDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Creates a new daemon in the specified cluster and capacity providers. A daemon deploys cross-cutting software agents such as security monitoring, telemetry, and logging independently across your Amazon ECS infrastructure.
 *
 * Amazon ECS deploys exactly one daemon task on each container instance of the specified capacity providers. When a container instance registers with the cluster, Amazon ECS automatically starts daemon tasks. Amazon ECS starts a daemon task before scheduling other tasks.
 *
 * Daemons are essential for instance health - if a daemon task stops, Amazon ECS automatically drains and replaces that container instance.
 *
 * ECS Managed Daemons is only supported for Amazon ECS Managed Instances Capacity Providers.
 */
export const createDaemon: API.OperationMethod<
  CreateDaemonRequest,
  CreateDaemonResponse,
  CreateDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      daemonName: 0,
      clusterArn: 0,
      daemonTaskDefinitionArn: 0,
      capacityProviderArns: 0,
      deploymentConfiguration: i_DaemonDeploymentConfiguration,
      tags: D.list(i_Tag),
      propagateTags: 0,
      enableECSManagedTags: 0,
      enableExecuteCommand: 0,
      clientToken: 0,
    },
    output: { createdAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDaemon",
})) as any;

export type CreateExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Creates an Express service that simplifies deploying containerized web applications on Amazon ECS with managed Amazon Web Services infrastructure. This operation provisions and configures Application Load Balancers, target groups, security groups, and auto-scaling policies automatically.
 *
 * Specify a primary container configuration with your application image and basic settings. Amazon ECS creates the necessary Amazon Web Services resources for traffic distribution, health monitoring, network access control, and capacity management.
 *
 * Provide an execution role for task operations and an infrastructure role for managing Amazon Web Services resources on your behalf.
 */
export const createExpressGatewayService: API.OperationMethod<
  CreateExpressGatewayServiceRequest,
  CreateExpressGatewayServiceResponse,
  CreateExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      executionRoleArn: 0,
      infrastructureRoleArn: 0,
      serviceName: 0,
      cluster: 0,
      healthCheckPath: 0,
      primaryContainer: i_ExpressGatewayContainer,
      taskRoleArn: 0,
      networkConfiguration: i_ExpressGatewayServiceNetworkConfiguration,
      cpu: 0,
      memory: 0,
      scalingTarget: i_ExpressGatewayScalingTarget,
      tags: D.list(i_Tag),
      taskDefinitionArn: 0,
    },
    output: { service: o_ECSExpressGatewayService },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExpressGatewayService",
})) as any;

export type CreateServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Runs and maintains your desired number of tasks from a specified task definition. If the number of tasks running in a service drops below the `desiredCount`, Amazon ECS runs another copy of the task in the specified cluster. To update an existing service, use UpdateService.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * Amazon Elastic Inference (EI) is no longer available to customers.
 *
 * In addition to maintaining the desired count of tasks in your service, you can optionally run your service behind one or more load balancers. The load balancers distribute traffic across the tasks that are associated with the service. For more information, see Service load balancing in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when creating or updating a service. `volumeConfigurations` is only supported for REPLICA service and not DAEMON service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Tasks for services that don't use a load balancer are considered healthy if they're in the `RUNNING` state. Tasks for services that use a load balancer are considered healthy if they're in the `RUNNING` state and are reported as healthy by the load balancer.
 *
 * There are two service scheduler strategies available:
 *
 * - `REPLICA` - The replica scheduling strategy places and maintains your desired number of tasks across your cluster. By default, the service scheduler spreads tasks across Availability Zones. You can use task placement strategies and constraints to customize task placement decisions. For more information, see Service scheduler concepts in the *Amazon Elastic Container Service Developer Guide*.
 *
 * - `DAEMON` - The daemon scheduling strategy deploys exactly one task on each active container instance that meets all of the task placement constraints that you specify in your cluster. The service scheduler also evaluates the task placement constraints for running tasks. It also stops tasks that don't meet the placement constraints. When using this strategy, you don't need to specify a desired number of tasks, a task placement strategy, or use Service Auto Scaling policies. For more information, see Amazon ECS services in the *Amazon Elastic Container Service Developer Guide*.
 *
 * The deployment controller is the mechanism that determines how tasks are deployed for your service. The valid options are:
 *
 * - ECS
 *
 * When you create a service which uses the `ECS` deployment controller, you can choose between the following deployment strategies (which you can set in the “`strategy`” field in “`deploymentConfiguration`”): :
 *
 * - `ROLLING`: When you create a service which uses the *rolling update* (`ROLLING`) deployment strategy, the Amazon ECS service scheduler replaces the currently running tasks with new tasks. The number of tasks that Amazon ECS adds or removes from the service during a rolling update is controlled by the service deployment configuration. For more information, see Deploy Amazon ECS services by replacing tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Rolling update deployments are best suited for the following scenarios:
 *
 * - Gradual service updates: You need to update your service incrementally without taking the entire service offline at once.
 *
 * - Limited resource requirements: You want to avoid the additional resource costs of running two complete environments simultaneously (as required by blue/green deployments).
 *
 * - Acceptable deployment time: Your application can tolerate a longer deployment process, as rolling updates replace tasks one by one.
 *
 * - No need for instant roll back: Your service can tolerate a rollback process that takes minutes rather than seconds.
 *
 * - Simple deployment process: You prefer a straightforward deployment approach without the complexity of managing multiple environments, target groups, and listeners.
 *
 * - No load balancer requirement: Your service doesn't use or require a load balancer, Application Load Balancer, Network Load Balancer, or Service Connect (which are required for blue/green deployments).
 *
 * - Stateful applications: Your application maintains state that makes it difficult to run two parallel environments.
 *
 * - Cost sensitivity: You want to minimize deployment costs by not running duplicate environments during deployment.
 *
 * Rolling updates are the default deployment strategy for services and provide a balance between deployment safety and resource efficiency for many common application scenarios.
 *
 * - `BLUE_GREEN`: A *blue/green* deployment strategy (`BLUE_GREEN`) is a release methodology that reduces downtime and risk by running two identical production environments called blue and green. With Amazon ECS blue/green deployments, you can validate new service revisions before directing production traffic to them. This approach provides a safer way to deploy changes with the ability to quickly roll back if needed. For more information, see Amazon ECS blue/green deployments in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Amazon ECS blue/green deployments are best suited for the following scenarios:
 *
 * - Service validation: When you need to validate new service revisions before directing production traffic to them
 *
 * - Zero downtime: When your service requires zero-downtime deployments
 *
 * - Instant roll back: When you need the ability to quickly roll back if issues are detected
 *
 * - Load balancer requirement: When your service uses Application Load Balancer, Network Load Balancer, or Service Connect
 *
 * - `LINEAR`: A *linear* deployment strategy (`LINEAR`) gradually shifts traffic from the current production environment to a new environment in equal percentage increments. With Amazon ECS linear deployments, you can control the pace of traffic shifting and validate new service revisions with increasing amounts of production traffic.
 *
 * Linear deployments are best suited for the following scenarios:
 *
 * - Gradual validation: When you want to gradually validate your new service version with increasing traffic
 *
 * - Performance monitoring: When you need time to monitor metrics and performance during the deployment
 *
 * - Risk minimization: When you want to minimize risk by exposing the new version to production traffic incrementally
 *
 * - Load balancer requirement: When your service uses Application Load Balancer or Service Connect
 *
 * - `CANARY`: A *canary* deployment strategy (`CANARY`) shifts a small percentage of traffic to the new service revision first, then shifts the remaining traffic all at once after a specified time period. This allows you to test the new version with a subset of users before full deployment.
 *
 * Canary deployments are best suited for the following scenarios:
 *
 * - Feature testing: When you want to test new features with a small subset of users before full rollout
 *
 * - Production validation: When you need to validate performance and functionality with real production traffic
 *
 * - Blast radius control: When you want to minimize blast radius if issues are discovered in the new version
 *
 * - Load balancer requirement: When your service uses Application Load Balancer or Service Connect
 *
 * - External
 *
 * Use a third-party deployment controller.
 *
 * - Blue/green deployment (powered by CodeDeploy)
 *
 * CodeDeploy installs an updated version of the application as a new replacement task set and reroutes production traffic from the original application task set to the replacement task set. The original task set is terminated after a successful deployment. Use this deployment controller to verify a new deployment of a service before sending production traffic to it.
 *
 * When creating a service that uses the `EXTERNAL` deployment controller, you can specify only parameters that aren't controlled at the task set level. The only required parameter is the service name. You control your services using the CreateTaskSet. For more information, see Amazon ECS deployment types in the *Amazon Elastic Container Service Developer Guide*.
 *
 * When the service scheduler launches new tasks, it determines task placement. For information about task placement and task placement strategies, see Amazon ECS task placement in the *Amazon Elastic Container Service Developer Guide*
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      serviceName: 0,
      taskDefinition: 0,
      availabilityZoneRebalancing: 0,
      loadBalancers: D.list(i_LoadBalancer),
      serviceRegistries: D.list(i_ServiceRegistry),
      desiredCount: 0,
      clientToken: 0,
      launchType: 0,
      capacityProviderStrategy: D.list(i_CapacityProviderStrategyItem),
      platformVersion: 0,
      role: 0,
      deploymentConfiguration: i_DeploymentConfiguration,
      placementConstraints: D.list(i_PlacementConstraint),
      placementStrategy: D.list(i_PlacementStrategy),
      networkConfiguration: i_NetworkConfiguration,
      healthCheckGracePeriodSeconds: 0,
      schedulingStrategy: 0,
      deploymentController: i_DeploymentController,
      tags: D.list(i_Tag),
      enableECSManagedTags: 0,
      propagateTags: 0,
      enableExecuteCommand: 0,
      serviceConnectConfiguration: i_ServiceConnectConfiguration,
      volumeConfigurations: D.list(i_ServiceVolumeConfiguration),
      vpcLatticeConfigurations: D.list(i_VpcLatticeConfiguration),
      monitoring: i_MonitoringConfiguration,
    },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
})) as any;

export type CreateTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | NamespaceNotFoundException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Create a task set in the specified cluster and service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS deployment types in the *Amazon Elastic Container Service Developer Guide*.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * For information about the maximum number of task sets and other quotas, see Amazon ECS service quotas in the *Amazon Elastic Container Service Developer Guide*.
 */
export const createTaskSet: API.OperationMethod<
  CreateTaskSetRequest,
  CreateTaskSetResponse,
  CreateTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      service: 0,
      cluster: 0,
      externalId: 0,
      taskDefinition: 0,
      networkConfiguration: i_NetworkConfiguration,
      loadBalancers: D.list(i_LoadBalancer),
      serviceRegistries: D.list(i_ServiceRegistry),
      launchType: 0,
      capacityProviderStrategy: D.list(i_CapacityProviderStrategyItem),
      platformVersion: 0,
      scale: i_Scale,
      clientToken: 0,
      tags: D.list(i_Tag),
    },
    output: { taskSet: o_TaskSet },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    NamespaceNotFoundException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTaskSet",
})) as any;

export type DeleteAccountSettingError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Disables an account setting for a specified user, role, or the root user for an account.
 */
export const deleteAccountSetting: API.OperationMethod<
  DeleteAccountSettingRequest,
  DeleteAccountSettingResponse,
  DeleteAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0, principalArn: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountSetting",
})) as any;

export type DeleteAttributesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | TargetNotFoundException
  | CommonErrors;
/**
 * Deletes one or more custom attributes from an Amazon ECS resource.
 */
export const deleteAttributes: API.OperationMethod<
  DeleteAttributesRequest,
  DeleteAttributesResponse,
  DeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, attributes: D.list(i_Attribute) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    TargetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributes",
})) as any;

export type DeleteCapacityProviderError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Deletes the specified capacity provider.
 *
 * The `FARGATE` and `FARGATE_SPOT` capacity providers are reserved and can't be deleted. You can disassociate them from a cluster using either PutClusterCapacityProviders or by deleting the cluster.
 *
 * Prior to a capacity provider being deleted, the capacity provider must be removed from the capacity provider strategy from all services. The UpdateService API can be used to remove a capacity provider from a service's capacity provider strategy. When updating a service, the `forceNewDeployment` option can be used to ensure that any tasks using the Amazon EC2 instance capacity provided by the capacity provider are transitioned to use the capacity from the remaining capacity providers. Only capacity providers that aren't associated with a cluster can be deleted. To remove a capacity provider from a cluster, you can either use PutClusterCapacityProviders or delete the cluster.
 */
export const deleteCapacityProvider: API.OperationMethod<
  DeleteCapacityProviderRequest,
  DeleteCapacityProviderResponse,
  DeleteCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { capacityProvider: 0, cluster: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityProvider",
})) as any;

export type DeleteClusterError =
  | AccessDeniedException
  | ClientException
  | ClusterContainsCapacityProviderException
  | ClusterContainsContainerInstancesException
  | ClusterContainsServicesException
  | ClusterContainsTasksException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Deletes the specified cluster. The cluster transitions to the `INACTIVE` state. Clusters with an `INACTIVE` status might remain discoverable in your account for a period of time. However, this behavior is subject to change in the future. We don't recommend that you rely on `INACTIVE` clusters persisting.
 *
 * You must deregister all container instances from this cluster before you may delete it. You can list the container instances in a cluster with ListContainerInstances and deregister them with DeregisterContainerInstance.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { cluster: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterContainsCapacityProviderException,
    ClusterContainsContainerInstancesException,
    ClusterContainsServicesException,
    ClusterContainsTasksException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
})) as any;

export type DeleteDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | DaemonNotActiveException
  | DaemonNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Deletes the specified daemon. The daemon must be in an `ACTIVE` state to be deleted. Deleting a daemon stops all running daemon tasks on the associated container instances. Amazon ECS drains existing container instances and provisions new instances without the deleted daemon. Amazon ECS automatically launches replacement tasks for your Amazon ECS services.
 *
 * ECS Managed Daemons is only supported for Amazon ECS Managed Instances Capacity Providers.
 */
export const deleteDaemon: API.OperationMethod<
  DeleteDaemonRequest,
  DeleteDaemonResponse,
  DeleteDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { daemonArn: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    DaemonNotActiveException,
    DaemonNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDaemon",
})) as any;

export type DeleteDaemonTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deletes the specified daemon task definition. After a daemon task definition is deleted, no new daemons can be created using this definition. Existing daemons that reference the deleted daemon task definition continue to run.
 *
 * A daemon task definition must be in an `ACTIVE` state to be deleted.
 */
export const deleteDaemonTaskDefinition: API.OperationMethod<
  DeleteDaemonTaskDefinitionRequest,
  DeleteDaemonTaskDefinitionResponse,
  DeleteDaemonTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { daemonTaskDefinition: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDaemonTaskDefinition",
})) as any;

export type DeleteExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Deletes an Express service and removes all associated Amazon Web Services resources. This operation stops service tasks, removes the Application Load Balancer, target groups, security groups, auto-scaling policies, and other managed infrastructure components.
 *
 * The service enters a `DRAINING` state where existing tasks complete current requests without starting new tasks. After all tasks stop, the service and infrastructure are permanently removed.
 *
 * This operation cannot be reversed. Back up important data and verify the service is no longer needed before deletion.
 */
export const deleteExpressGatewayService: API.OperationMethod<
  DeleteExpressGatewayServiceRequest,
  DeleteExpressGatewayServiceResponse,
  DeleteExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceArn: 0 },
    output: { service: o_ECSExpressGatewayService },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExpressGatewayService",
})) as any;

export type DeleteServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | CommonErrors;
/**
 * Deletes a specified service within a cluster. You can delete a service if you have no running tasks in it and the desired task count is zero. If the service is actively maintaining tasks, you can't delete it, and you must update the service to a desired task count of zero. For more information, see UpdateService.
 *
 * When you delete a service, if there are still running tasks that require cleanup, the service status moves from `ACTIVE` to `DRAINING`, and the service is no longer visible in the console or in the ListServices API operation. After all tasks have transitioned to either `STOPPING` or `STOPPED` status, the service status moves from `DRAINING` to `INACTIVE`. Services in the `DRAINING` or `INACTIVE` status can still be viewed with the DescribeServices API operation. However, in the future, `INACTIVE` services may be cleaned up and purged from Amazon ECS record keeping, and DescribeServices calls on those services return a `ServiceNotFoundException` error.
 *
 * If you attempt to create a new service with the same name as an existing service in either `ACTIVE` or `DRAINING` status, you receive an error.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, service: 0, force: 0 },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
})) as any;

export type DeleteTaskDefinitionsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deletes one or more task definitions.
 *
 * You must deregister a task definition revision before you delete it. For more information, see DeregisterTaskDefinition.
 *
 * When you delete a task definition revision, it is immediately transitions from the `INACTIVE` to `DELETE_IN_PROGRESS`. Existing tasks and services that reference a `DELETE_IN_PROGRESS` task definition revision continue to run without disruption. Existing services that reference a `DELETE_IN_PROGRESS` task definition revision can still scale up or down by modifying the service's desired count.
 *
 * You can't use a `DELETE_IN_PROGRESS` task definition revision to run new tasks or create new services. You also can't update an existing service to reference a `DELETE_IN_PROGRESS` task definition revision.
 *
 * A task definition revision will stay in `DELETE_IN_PROGRESS` status until all the associated tasks and services have been terminated.
 *
 * When you delete all `INACTIVE` task definition revisions, the task definition name is not displayed in the console and not returned in the API. If a task definition revisions are in the `DELETE_IN_PROGRESS` state, the task definition name is displayed in the console and returned in the API. The task definition name is retained by Amazon ECS and the revision is incremented the next time you create a task definition with that name.
 */
export const deleteTaskDefinitions: API.OperationMethod<
  DeleteTaskDefinitionsRequest,
  DeleteTaskDefinitionsResponse,
  DeleteTaskDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { taskDefinitions: 0 },
    output: { taskDefinitions: D.list(o_TaskDefinition) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaskDefinitions",
})) as any;

export type DeleteTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | TaskSetNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Deletes a specified task set within a service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS deployment types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const deleteTaskSet: API.OperationMethod<
  DeleteTaskSetRequest,
  DeleteTaskSetResponse,
  DeleteTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, service: 0, taskSet: 0, force: 0 },
    output: { taskSet: o_TaskSet },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    TaskSetNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaskSet",
})) as any;

export type DeregisterContainerInstanceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deregisters an Amazon ECS container instance from the specified cluster. This instance is no longer available to run tasks.
 *
 * If you intend to use the container instance for some other purpose after deregistration, we recommend that you stop all of the tasks running on the container instance before deregistration. That prevents any orphaned tasks from consuming resources.
 *
 * Deregistering a container instance removes the instance from a cluster, but it doesn't terminate the EC2 instance. If you are finished using the instance, be sure to terminate it in the Amazon EC2 console to stop billing.
 *
 * If you terminate a running container instance, Amazon ECS automatically deregisters the instance from your cluster (stopped container instances or instances with disconnected agents aren't automatically deregistered when terminated).
 */
export const deregisterContainerInstance: API.OperationMethod<
  DeregisterContainerInstanceRequest,
  DeregisterContainerInstanceResponse,
  DeregisterContainerInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, containerInstance: 0, force: 0 },
    output: { containerInstance: o_ContainerInstance },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterContainerInstance",
})) as any;

export type DeregisterTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Deregisters the specified task definition by family and revision. Upon deregistration, the task definition is marked as `INACTIVE`. Existing tasks and services that reference an `INACTIVE` task definition continue to run without disruption. Existing services that reference an `INACTIVE` task definition can still scale up or down by modifying the service's desired count. If you want to delete a task definition revision, you must first deregister the task definition revision.
 *
 * You can't use an `INACTIVE` task definition to run new tasks or create new services, and you can't update an existing service to reference an `INACTIVE` task definition. However, there may be up to a 10-minute window following deregistration where these restrictions have not yet taken effect.
 *
 * At this time, `INACTIVE` task definitions remain discoverable in your account indefinitely. However, this behavior is subject to change in the future. We don't recommend that you rely on `INACTIVE` task definitions persisting beyond the lifecycle of any associated tasks and services.
 *
 * You must deregister a task definition revision before you delete it. For more information, see DeleteTaskDefinitions.
 */
export const deregisterTaskDefinition: API.OperationMethod<
  DeregisterTaskDefinitionRequest,
  DeregisterTaskDefinitionResponse,
  DeregisterTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { taskDefinition: 0 },
    output: { taskDefinition: o_TaskDefinition },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTaskDefinition",
})) as any;

export type DescribeCapacityProvidersError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your capacity providers.
 */
export const describeCapacityProviders: API.OperationMethod<
  DescribeCapacityProvidersRequest,
  DescribeCapacityProvidersResponse,
  DescribeCapacityProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      capacityProviders: 0,
      cluster: 0,
      include: 0,
      maxResults: 0,
      nextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCapacityProviders",
})) as any;

export type DescribeClustersError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more of your clusters.
 *
 * For CLI examples, see describe-clusters.rst on GitHub.
 */
export const describeClusters: API.OperationMethod<
  DescribeClustersRequest,
  DescribeClustersResponse,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { clusters: 0, include: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
})) as any;

export type DescribeContainerInstancesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes one or more container instances. Returns metadata about each container instance requested.
 */
export const describeContainerInstances: API.OperationMethod<
  DescribeContainerInstancesRequest,
  DescribeContainerInstancesResponse,
  DescribeContainerInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, containerInstances: 0, include: 0 },
    output: { containerInstances: D.list(o_ContainerInstance) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerInstances",
})) as any;

export type DescribeDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | DaemonNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes the specified daemon.
 */
export const describeDaemon: API.OperationMethod<
  DescribeDaemonRequest,
  DescribeDaemonResponse,
  DescribeDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { daemonArn: 0 },
    output: { daemon: { createdAt: D.ts, updatedAt: D.ts } },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    DaemonNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemon",
})) as any;

export type DescribeDaemonDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your daemon deployments.
 *
 * A daemon deployment orchestrates the progressive rollout of daemon task updates across container instances managed by the daemon's capacity providers. Each deployment includes circuit breaker and alarm-based rollback capabilities.
 */
export const describeDaemonDeployments: API.OperationMethod<
  DescribeDaemonDeploymentsRequest,
  DescribeDaemonDeploymentsResponse,
  DescribeDaemonDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { daemonDeploymentArns: 0 },
    output: {
      daemonDeployments: D.list({
        rollback: { startedAt: D.ts },
        createdAt: D.ts,
        startedAt: D.ts,
        stoppedAt: D.ts,
        finishedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemonDeployments",
})) as any;

export type DescribeDaemonRevisionsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your daemon revisions.
 *
 * A daemon revision is a snapshot of a daemon's configuration at the time a deployment was initiated. It captures the daemon task definition, container images, tag propagation, and execute command settings. Daemon revisions are immutable.
 */
export const describeDaemonRevisions: API.OperationMethod<
  DescribeDaemonRevisionsRequest,
  DescribeDaemonRevisionsResponse,
  DescribeDaemonRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { daemonRevisionArns: 0 },
    output: { daemonRevisions: D.list({ createdAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemonRevisions",
})) as any;

export type DescribeDaemonTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes a daemon task definition. You can specify a `family` and `revision` to find information about a specific daemon task definition, or you can simply specify the family to find the latest `ACTIVE` revision in that family.
 */
export const describeDaemonTaskDefinition: API.OperationMethod<
  DescribeDaemonTaskDefinitionRequest,
  DescribeDaemonTaskDefinitionResponse,
  DescribeDaemonTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { daemonTaskDefinition: 0 },
    output: {
      daemonTaskDefinition: { registeredAt: D.ts, deleteRequestedAt: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemonTaskDefinition",
})) as any;

export type DescribeExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Retrieves detailed information about an Express service, including current status, configuration, managed infrastructure, and service revisions.
 *
 * Returns comprehensive service details, active service revisions, ingress paths with endpoints, and managed Amazon Web Services resource status including load balancers and auto-scaling policies.
 *
 * Use the `include` parameter to retrieve additional information such as resource tags.
 */
export const describeExpressGatewayService: API.OperationMethod<
  DescribeExpressGatewayServiceRequest,
  DescribeExpressGatewayServiceResponse,
  DescribeExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceArn: 0, include: 0 },
    output: { service: o_ECSExpressGatewayService },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExpressGatewayService",
})) as any;

export type DescribeServiceDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more of your service deployments.
 *
 * A service deployment happens when you release a software update for the service. For more information, see View service history using Amazon ECS service deployments.
 */
export const describeServiceDeployments: API.OperationMethod<
  DescribeServiceDeploymentsRequest,
  DescribeServiceDeploymentsResponse,
  DescribeServiceDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceDeploymentArns: 0 },
    output: {
      serviceDeployments: D.list({
        createdAt: D.ts,
        startedAt: D.ts,
        finishedAt: D.ts,
        stoppedAt: D.ts,
        updatedAt: D.ts,
        lifecycleHookDetails: D.list({ expiresAt: D.ts }),
        rollback: { startedAt: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceDeployments",
})) as any;

export type DescribeServiceRevisionsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes one or more service revisions.
 *
 * A service revision is a version of the service that includes the values for the Amazon ECS resources (for example, task definition) and the environment resources (for example, load balancers, subnets, and security groups). For more information, see Amazon ECS service revisions.
 *
 * You can't describe a service revision that was created before October 25, 2024.
 */
export const describeServiceRevisions: API.OperationMethod<
  DescribeServiceRevisionsRequest,
  DescribeServiceRevisionsResponse,
  DescribeServiceRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { serviceRevisionArns: 0 },
    output: {
      serviceRevisions: D.list({
        createdAt: D.ts,
        ecsManagedResources: {
          ingressPaths: D.list({
            loadBalancer: { updatedAt: D.ts },
            loadBalancerSecurityGroups: D.list(o_ManagedSecurityGroup),
            certificate: { updatedAt: D.ts },
            listener: { updatedAt: D.ts },
            rule: { updatedAt: D.ts },
            targetGroups: D.list({ updatedAt: D.ts }),
          }),
          autoScaling: {
            scalableTarget: { updatedAt: D.ts },
            applicationAutoScalingPolicies: D.list({ updatedAt: D.ts }),
          },
          metricAlarms: D.list({ updatedAt: D.ts }),
          serviceSecurityGroups: D.list(o_ManagedSecurityGroup),
          logGroups: D.list({ updatedAt: D.ts }),
        },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceRevisions",
})) as any;

export type DescribeServicesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes the specified services running in your cluster.
 */
export const describeServices: API.OperationMethod<
  DescribeServicesRequest,
  DescribeServicesResponse,
  DescribeServicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, services: 0, include: 0 },
    output: { services: D.list(o_Service) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServices",
})) as any;

export type DescribeTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes a task definition. You can specify a `family` and `revision` to find information about a specific task definition, or you can simply specify the family to find the latest `ACTIVE` revision in that family.
 *
 * You can only describe `INACTIVE` task definitions while an active task or service references them.
 */
export const describeTaskDefinition: API.OperationMethod<
  DescribeTaskDefinitionRequest,
  DescribeTaskDefinitionResponse,
  DescribeTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { taskDefinition: 0, include: 0 },
    output: { taskDefinition: o_TaskDefinition },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskDefinition",
})) as any;

export type DescribeTasksError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Describes a specified task or tasks.
 *
 * Currently, stopped tasks appear in the returned results for at least one hour.
 *
 * If you have tasks with tags, and then delete the cluster, the tagged tasks are returned in the response. If you create a new cluster with the same name as the deleted cluster, the tagged tasks are not included in the response.
 */
export const describeTasks: API.OperationMethod<
  DescribeTasksRequest,
  DescribeTasksResponse,
  DescribeTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, tasks: 0, include: 0 },
    output: { tasks: D.list(o_Task) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTasks",
})) as any;

export type DescribeTaskSetsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Describes the task sets in the specified cluster and service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS Deployment Types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const describeTaskSets: API.OperationMethod<
  DescribeTaskSetsRequest,
  DescribeTaskSetsResponse,
  DescribeTaskSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, service: 0, taskSets: 0, include: 0 },
    output: { taskSets: D.list(o_TaskSet) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskSets",
})) as any;

export type DiscoverPollEndpointError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Returns an endpoint for the Amazon ECS agent to poll for updates.
 */
export const discoverPollEndpoint: API.OperationMethod<
  DiscoverPollEndpointRequest,
  DiscoverPollEndpointResponse,
  DiscoverPollEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { containerInstance: 0, cluster: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverPollEndpoint",
})) as any;

export type ExecuteCommandError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | TargetNotConnectedException
  | CommonErrors;
/**
 * Runs a command remotely on a container within a task.
 *
 * If you use a condition key in your IAM policy to refine the conditions for the policy statement, for example limit the actions to a specific cluster, you receive an `AccessDeniedException` when there is a mismatch between the condition key value and the corresponding parameter value.
 *
 * For information about required permissions and considerations, see Using Amazon ECS Exec for debugging in the *Amazon ECS Developer Guide*.
 */
export const executeCommand: API.OperationMethod<
  ExecuteCommandRequest,
  ExecuteCommandResponse,
  ExecuteCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, container: 0, command: 0, interactive: 0, task: 0 },
    output: { session: { tokenValue: D.secret } },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    TargetNotConnectedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteCommand",
})) as any;

export type GetTaskProtectionError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Retrieves the protection status of tasks in an Amazon ECS service.
 */
export const getTaskProtection: API.OperationMethod<
  GetTaskProtectionRequest,
  GetTaskProtectionResponse,
  GetTaskProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, tasks: 0 },
    output: { protectedTasks: D.list(o_ProtectedTask) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaskProtection",
})) as any;

export type ListAccountSettingsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Lists the account settings for a specified principal.
 */
export const listAccountSettings: API.PaginatedOperationMethod<
  ListAccountSettingsRequest,
  ListAccountSettingsResponse,
  ListAccountSettingsError,
  Credentials | HttpClient.HttpClient,
  Setting
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      value: 0,
      principalArn: 0,
      effectiveSettings: 0,
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "settings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttributesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Lists the attributes for Amazon ECS resources within a specified target type and cluster. When you specify a target type and cluster, `ListAttributes` returns a list of attribute objects, one for each attribute on each resource. You can filter the list of results to a single attribute name to only return results that have that name. You can also filter the results by attribute name and value. You can do this, for example, to see which container instances in a cluster are running a Linux AMI (`ecs.os-type=linux`).
 */
export const listAttributes: API.PaginatedOperationMethod<
  ListAttributesRequest,
  ListAttributesResponse,
  ListAttributesError,
  Credentials | HttpClient.HttpClient,
  Attribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      targetType: 0,
      attributeName: 0,
      attributeValue: 0,
      nextToken: 0,
      maxResults: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttributes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attributes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListClustersError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of existing clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusterArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContainerInstancesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of container instances in a specified cluster. You can filter the results of a `ListContainerInstances` operation with cluster query language statements inside the `filter` parameter. For more information, see Cluster Query Language in the *Amazon Elastic Container Service Developer Guide*.
 */
export const listContainerInstances: API.PaginatedOperationMethod<
  ListContainerInstancesRequest,
  ListContainerInstancesResponse,
  ListContainerInstancesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, filter: 0, nextToken: 0, maxResults: 0, status: 0 },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "containerInstanceArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDaemonDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Returns a list of daemon deployments for a specified daemon. You can filter the results by status or creation time.
 */
export const listDaemonDeployments: API.OperationMethod<
  ListDaemonDeploymentsRequest,
  ListDaemonDeploymentsResponse,
  ListDaemonDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      daemonArn: 0,
      status: 0,
      createdAt: i_CreatedAt,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      daemonDeployments: D.list({
        createdAt: D.ts,
        startedAt: D.ts,
        stoppedAt: D.ts,
        finishedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDaemonDeployments",
})) as any;

export type ListDaemonsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Returns a list of daemons. You can filter the results by cluster or capacity provider.
 */
export const listDaemons: API.OperationMethod<
  ListDaemonsRequest,
  ListDaemonsResponse,
  ListDaemonsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      clusterArn: 0,
      capacityProviderArns: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      daemonSummariesList: D.list({ createdAt: D.ts, updatedAt: D.ts }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDaemons",
})) as any;

export type ListDaemonTaskDefinitionsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of daemon task definitions that are registered to your account. You can filter the results by family name, status, or both to find daemon task definitions that match your criteria.
 */
export const listDaemonTaskDefinitions: API.OperationMethod<
  ListDaemonTaskDefinitionsRequest,
  ListDaemonTaskDefinitionsResponse,
  ListDaemonTaskDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      familyPrefix: 0,
      family: 0,
      revision: 0,
      status: 0,
      sort: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      daemonTaskDefinitions: D.list({
        registeredAt: D.ts,
        deleteRequestedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDaemonTaskDefinitions",
})) as any;

export type ListServiceDeploymentsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * This operation lists all the service deployments that meet the specified filter criteria.
 *
 * A service deployment happens when you release a software update for the service. You route traffic from the running service revisions to the new service revison and control the number of running tasks.
 *
 * This API returns the values that you use for the request parameters in DescribeServiceRevisions.
 */
export const listServiceDeployments: API.OperationMethod<
  ListServiceDeploymentsRequest,
  ListServiceDeploymentsResponse,
  ListServiceDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      service: 0,
      cluster: 0,
      status: 0,
      createdAt: i_CreatedAt,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      serviceDeployments: D.list({
        startedAt: D.ts,
        createdAt: D.ts,
        finishedAt: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceDeployments",
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of services. You can filter the results by cluster, launch type, and scheduling strategy.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      nextToken: 0,
      maxResults: 0,
      launchType: 0,
      schedulingStrategy: 0,
      resourceManagementType: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServicesByNamespaceError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * This operation lists all of the services that are associated with a Cloud Map namespace. This list might include services in different clusters. In contrast, `ListServices` can only list services in one cluster at a time. If you need to filter the list of services in a single cluster by various parameters, use `ListServices`. For more information, see Service Connect in the *Amazon Elastic Container Service Developer Guide*.
 */
export const listServicesByNamespace: API.PaginatedOperationMethod<
  ListServicesByNamespaceRequest,
  ListServicesByNamespaceResponse,
  ListServicesByNamespaceError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { namespace: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServicesByNamespace",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * List the tags for an Amazon ECS resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTaskDefinitionFamiliesError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of task definition families that are registered to your account. This list includes task definition families that no longer have any `ACTIVE` task definition revisions.
 *
 * You can filter out task definition families that don't contain any `ACTIVE` task definition revisions by setting the `status` parameter to `ACTIVE`. You can also filter the results with the `familyPrefix` parameter.
 */
export const listTaskDefinitionFamilies: API.PaginatedOperationMethod<
  ListTaskDefinitionFamiliesRequest,
  ListTaskDefinitionFamiliesResponse,
  ListTaskDefinitionFamiliesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { familyPrefix: 0, status: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskDefinitionFamilies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "families",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTaskDefinitionsError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Returns a list of task definitions that are registered to your account. You can filter the results by family name with the `familyPrefix` parameter or by status with the `status` parameter.
 */
export const listTaskDefinitions: API.PaginatedOperationMethod<
  ListTaskDefinitionsRequest,
  ListTaskDefinitionsResponse,
  ListTaskDefinitionsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { familyPrefix: 0, status: 0, sort: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskDefinitionArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTasksError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tasks. You can filter the results by cluster, task definition family, container instance, launch type, what IAM principal started the task, or by the desired status of the task.
 *
 * Recently stopped tasks might appear in the returned results.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksRequest,
  ListTasksResponse,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      containerInstance: 0,
      family: 0,
      nextToken: 0,
      maxResults: 0,
      startedBy: 0,
      serviceName: 0,
      desiredStatus: 0,
      launchType: 0,
      daemonName: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskArns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutAccountSettingError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Modifies an account setting. Account settings are set on a per-Region basis.
 *
 * If you change the root user account setting, the default settings are reset for users and roles that do not have specified individual account settings. For more information, see Account Settings in the *Amazon Elastic Container Service Developer Guide*.
 */
export const putAccountSetting: API.OperationMethod<
  PutAccountSettingRequest,
  PutAccountSettingResponse,
  PutAccountSettingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0, value: 0, principalArn: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSetting",
})) as any;

export type PutAccountSettingDefaultError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Modifies an account setting for all users on an account for whom no individual account setting has been specified. Account settings are set on a per-Region basis.
 */
export const putAccountSettingDefault: API.OperationMethod<
  PutAccountSettingDefaultRequest,
  PutAccountSettingDefaultResponse,
  PutAccountSettingDefaultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0, value: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSettingDefault",
})) as any;

export type PutAttributesError =
  | AccessDeniedException
  | AttributeLimitExceededException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | TargetNotFoundException
  | CommonErrors;
/**
 * Create or update an attribute on an Amazon ECS resource. If the attribute doesn't exist, it's created. If the attribute exists, its value is replaced with the specified value. To delete an attribute, use DeleteAttributes. For more information, see Attributes in the *Amazon Elastic Container Service Developer Guide*.
 */
export const putAttributes: API.OperationMethod<
  PutAttributesRequest,
  PutAttributesResponse,
  PutAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, attributes: D.list(i_Attribute) },
  },
  errors: [
    AccessDeniedException,
    AttributeLimitExceededException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    TargetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttributes",
})) as any;

export type PutClusterCapacityProvidersError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceInUseException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Modifies the available capacity providers and the default capacity provider strategy for a cluster.
 *
 * You must specify both the available capacity providers and a default capacity provider strategy for the cluster. If the specified cluster has existing capacity providers associated with it, you must specify all existing capacity providers in addition to any new ones you want to add. Any existing capacity providers that are associated with a cluster that are omitted from a PutClusterCapacityProviders API call will be disassociated with the cluster. You can only disassociate an existing capacity provider from a cluster if it's not being used by any existing tasks.
 *
 * When creating a service or running a task on a cluster, if no capacity provider or launch type is specified, then the cluster's default capacity provider strategy is used. We recommend that you define a default capacity provider strategy for your cluster. However, you must specify an empty array (`[]`) to bypass defining a default strategy.
 *
 * Amazon ECS Managed Instances doesn't support this, because when you create a capacity provider with Amazon ECS Managed Instances, it becomes available only within the specified cluster.
 */
export const putClusterCapacityProviders: API.OperationMethod<
  PutClusterCapacityProvidersRequest,
  PutClusterCapacityProvidersResponse,
  PutClusterCapacityProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      capacityProviders: 0,
      defaultCapacityProviderStrategy: D.list(i_CapacityProviderStrategyItem),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceInUseException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterCapacityProviders",
})) as any;

export type RegisterContainerInstanceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Registers an EC2 instance into the specified cluster. This instance becomes available to place containers on.
 */
export const registerContainerInstance: API.OperationMethod<
  RegisterContainerInstanceRequest,
  RegisterContainerInstanceResponse,
  RegisterContainerInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      instanceIdentityDocument: 0,
      instanceIdentityDocumentSignature: 0,
      totalResources: D.list({
        name: 0,
        type: 0,
        doubleValue: 0,
        longValue: 0,
        integerValue: 0,
        stringSetValue: 0,
      }),
      versionInfo: { agentVersion: 0, agentHash: 0, dockerVersion: 0 },
      containerInstanceArn: 0,
      attributes: D.list(i_Attribute),
      platformDevices: D.list({ id: 0, type: 0 }),
      tags: D.list(i_Tag),
    },
    output: { containerInstance: o_ContainerInstance },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterContainerInstance",
})) as any;

export type RegisterDaemonTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | CommonErrors;
/**
 * Registers a new daemon task definition from the supplied `family` and `containerDefinitions`. Optionally, you can add data volumes to your containers with the `volumes` parameter. For more information, see Daemon task definitions in the *Amazon Elastic Container Service Developer Guide*.
 *
 * A daemon task definition is a template that describes the containers that form a daemon. Daemons deploy cross-cutting software agents such as security monitoring, telemetry, and logging across your Amazon ECS infrastructure.
 *
 * Each time you call `RegisterDaemonTaskDefinition`, a new revision of the daemon task definition is created. You can't modify a revision after you register it.
 */
export const registerDaemonTaskDefinition: API.OperationMethod<
  RegisterDaemonTaskDefinitionRequest,
  RegisterDaemonTaskDefinitionResponse,
  RegisterDaemonTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      family: 0,
      taskRoleArn: 0,
      executionRoleArn: 0,
      containerDefinitions: D.list({
        name: 0,
        image: 0,
        memory: 0,
        memoryReservation: 0,
        repositoryCredentials: i_RepositoryCredentials,
        healthCheck: i_HealthCheck,
        cpu: 0,
        essential: 0,
        entryPoint: 0,
        command: 0,
        workingDirectory: 0,
        environmentFiles: D.list(i_EnvironmentFile),
        environment: D.list(i_KeyValuePair),
        secrets: D.list(i_Secret),
        readonlyRootFilesystem: 0,
        mountPoints: D.list(i_MountPoint),
        logConfiguration: i_LogConfiguration,
        firelensConfiguration: i_FirelensConfiguration,
        privileged: 0,
        user: 0,
        ulimits: D.list(i_Ulimit),
        linuxParameters: {
          capabilities: i_KernelCapabilities,
          devices: D.list(i_Device),
          initProcessEnabled: 0,
          tmpfs: D.list(i_Tmpfs),
        },
        dependsOn: D.list(i_ContainerDependency),
        startTimeout: 0,
        stopTimeout: 0,
        systemControls: D.list(i_SystemControl),
        interactive: 0,
        pseudoTerminal: 0,
        restartPolicy: i_ContainerRestartPolicy,
      }),
      cpu: 0,
      memory: 0,
      volumes: D.list({ name: 0, host: i_HostVolumeProperties }),
      tags: D.list(i_Tag),
      pidMode: 0,
      ipcMode: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDaemonTaskDefinition",
})) as any;

export type RegisterTaskDefinitionError =
  | AccessDeniedException
  | ClientException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | CommonErrors;
/**
 * Registers a new task definition from the supplied `family` and `containerDefinitions`. Optionally, you can add data volumes to your containers with the `volumes` parameter. For more information about task definition parameters and defaults, see Amazon ECS Task Definitions in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can specify a role for your task with the `taskRoleArn` parameter. When you specify a role for a task, its containers can then use the latest versions of the CLI or SDKs to make API requests to the Amazon Web Services services that are specified in the policy that's associated with the role. For more information, see IAM Roles for Tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can specify a Docker networking mode for the containers in your task definition with the `networkMode` parameter. If you specify the `awsvpc` network mode, the task is allocated an elastic network interface, and you must specify a NetworkConfiguration when you create a service or run a task with the task definition. For more information, see Task Networking in the *Amazon Elastic Container Service Developer Guide*.
 */
export const registerTaskDefinition: API.OperationMethod<
  RegisterTaskDefinitionRequest,
  RegisterTaskDefinitionResponse,
  RegisterTaskDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      family: 0,
      taskRoleArn: 0,
      executionRoleArn: 0,
      networkMode: 0,
      containerDefinitions: D.list({
        name: 0,
        image: 0,
        repositoryCredentials: i_RepositoryCredentials,
        cpu: 0,
        memory: 0,
        memoryReservation: 0,
        links: 0,
        portMappings: D.list({
          containerPort: 0,
          hostPort: 0,
          protocol: 0,
          name: 0,
          appProtocol: 0,
          containerPortRange: 0,
        }),
        essential: 0,
        restartPolicy: i_ContainerRestartPolicy,
        entryPoint: 0,
        command: 0,
        environment: D.list(i_KeyValuePair),
        environmentFiles: D.list(i_EnvironmentFile),
        mountPoints: D.list(i_MountPoint),
        volumesFrom: D.list({ sourceContainer: 0, readOnly: 0 }),
        linuxParameters: {
          capabilities: i_KernelCapabilities,
          devices: D.list(i_Device),
          initProcessEnabled: 0,
          sharedMemorySize: 0,
          tmpfs: D.list(i_Tmpfs),
          maxSwap: 0,
          swappiness: 0,
        },
        secrets: D.list(i_Secret),
        dependsOn: D.list(i_ContainerDependency),
        startTimeout: 0,
        stopTimeout: 0,
        versionConsistency: 0,
        hostname: 0,
        user: 0,
        workingDirectory: 0,
        disableNetworking: 0,
        privileged: 0,
        readonlyRootFilesystem: 0,
        dnsServers: 0,
        dnsSearchDomains: 0,
        extraHosts: D.list({ hostname: 0, ipAddress: 0 }),
        dockerSecurityOptions: 0,
        interactive: 0,
        pseudoTerminal: 0,
        dockerLabels: 0,
        ulimits: D.list(i_Ulimit),
        logConfiguration: i_LogConfiguration,
        healthCheck: i_HealthCheck,
        systemControls: D.list(i_SystemControl),
        resourceRequirements: D.list(i_ResourceRequirement),
        firelensConfiguration: i_FirelensConfiguration,
        credentialSpecs: 0,
      }),
      volumes: D.list({
        name: 0,
        host: i_HostVolumeProperties,
        dockerVolumeConfiguration: {
          scope: 0,
          autoprovision: 0,
          driver: 0,
          driverOpts: 0,
          labels: 0,
        },
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
        fsxWindowsFileServerVolumeConfiguration: {
          fileSystemId: 0,
          rootDirectory: 0,
          authorizationConfig: { credentialsParameter: 0, domain: 0 },
        },
        configuredAtLaunch: 0,
      }),
      placementConstraints: D.list({ type: 0, expression: 0 }),
      requiresCompatibilities: 0,
      cpu: 0,
      memory: 0,
      tags: D.list(i_Tag),
      pidMode: 0,
      ipcMode: 0,
      proxyConfiguration: {
        type: 0,
        containerName: 0,
        properties: D.list(i_KeyValuePair),
      },
      inferenceAccelerators: D.list({ deviceName: 0, deviceType: 0 }),
      ephemeralStorage: i_EphemeralStorage,
      runtimePlatform: { cpuArchitecture: 0, operatingSystemFamily: 0 },
      enableFaultInjection: 0,
    },
    output: { taskDefinition: o_TaskDefinition },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTaskDefinition",
})) as any;

export type RunTaskError =
  | AccessDeniedException
  | BlockedException
  | ClientException
  | ClusterNotFoundException
  | ConflictException
  | InvalidParameterException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Starts a new task using the specified task definition.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * Amazon Elastic Inference (EI) is no longer available to customers.
 *
 * You can allow Amazon ECS to place tasks for you, or you can customize how Amazon ECS places tasks using placement constraints and placement strategies. For more information, see Scheduling Tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Alternatively, you can use `StartTask` to use your own scheduler or place tasks manually on specific container instances.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * The Amazon ECS API follows an eventual consistency model. This is because of the distributed nature of the system supporting the API. This means that the result of an API command you run that affects your Amazon ECS resources might not be immediately visible to all subsequent commands you run. Keep this in mind when you carry out an API command that immediately follows a previous API command.
 *
 * To manage eventual consistency, you can do the following:
 *
 * - Confirm the state of the resource before you run a command to modify it. Run the DescribeTasks command using an exponential backoff algorithm to ensure that you allow enough time for the previous command to propagate through the system. To do this, run the DescribeTasks command repeatedly, starting with a couple of seconds of wait time and increasing gradually up to five minutes of wait time.
 *
 * - Add wait time between subsequent commands, even if the DescribeTasks command returns an accurate response. Apply an exponential backoff algorithm starting with a couple of seconds of wait time, and increase gradually up to about five minutes of wait time.
 *
 * If you get a `ConflictException` error, the `RunTask` request could not be processed due to conflicts. The provided `clientToken` is already in use with a different `RunTask` request. The `resourceIds` are the existing task ARNs which are already associated with the `clientToken`.
 *
 * To fix this issue:
 *
 * - Run `RunTask` with a unique `clientToken`.
 *
 * - Run `RunTask` with the `clientToken` and the original set of parameters
 *
 * If you get a `ClientException`error, the `RunTask` could not be processed because you use managed scaling and there is a capacity error because the quota of tasks in the `PROVISIONING` per cluster has been reached. For information about the service quotas, see Amazon ECS service quotas.
 */
export const runTask: API.OperationMethod<
  RunTaskRequest,
  RunTaskResponse,
  RunTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      capacityProviderStrategy: D.list(i_CapacityProviderStrategyItem),
      cluster: 0,
      count: 0,
      enableECSManagedTags: 0,
      enableExecuteCommand: 0,
      group: 0,
      launchType: 0,
      networkConfiguration: i_NetworkConfiguration,
      overrides: i_TaskOverride,
      placementConstraints: D.list(i_PlacementConstraint),
      placementStrategy: D.list(i_PlacementStrategy),
      platformVersion: 0,
      propagateTags: 0,
      referenceId: 0,
      startedBy: 0,
      tags: D.list(i_Tag),
      taskDefinition: 0,
      clientToken: D.m({ idempotency: true }),
      volumeConfigurations: D.list(i_TaskVolumeConfiguration),
    },
    output: { tasks: D.list(o_Task) },
  },
  errors: [
    AccessDeniedException,
    BlockedException,
    ClientException,
    ClusterNotFoundException,
    ConflictException,
    InvalidParameterException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunTask",
})) as any;

export type StartTaskError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Starts a new task from the specified task definition on the specified container instance or instances.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * Amazon Elastic Inference (EI) is no longer available to customers.
 *
 * Alternatively, you can use`RunTask` to place tasks for you. For more information, see Scheduling Tasks in the *Amazon Elastic Container Service Developer Guide*.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 */
export const startTask: API.OperationMethod<
  StartTaskRequest,
  StartTaskResponse,
  StartTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      containerInstances: 0,
      enableECSManagedTags: 0,
      enableExecuteCommand: 0,
      group: 0,
      networkConfiguration: i_NetworkConfiguration,
      overrides: i_TaskOverride,
      propagateTags: 0,
      referenceId: 0,
      startedBy: 0,
      tags: D.list(i_Tag),
      taskDefinition: 0,
      volumeConfigurations: D.list(i_TaskVolumeConfiguration),
    },
    output: { tasks: D.list(o_Task) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTask",
})) as any;

export type StopServiceDeploymentError =
  | AccessDeniedException
  | ClientException
  | ConflictException
  | InvalidParameterException
  | ServerException
  | ServiceDeploymentNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Stops an ongoing service deployment.
 *
 * The following stop types are avaiable:
 *
 * - ROLLBACK - This option rolls back the service deployment to the previous service revision.
 *
 * You can use this option even if you didn't configure the service deployment for the rollback option.
 *
 * For more information, see Stopping Amazon ECS service deployments in the *Amazon Elastic Container Service Developer Guide*.
 */
export const stopServiceDeployment: API.OperationMethod<
  StopServiceDeploymentRequest,
  StopServiceDeploymentResponse,
  StopServiceDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { serviceDeploymentArn: 0, stopType: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    ConflictException,
    InvalidParameterException,
    ServerException,
    ServiceDeploymentNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopServiceDeployment",
})) as any;

export type StopTaskError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Stops a running task. Any tags associated with the task will be deleted.
 *
 * When you call `StopTask` on a task, the equivalent of `docker stop` is issued to the containers running in the task. This results in a stop signal value and a default 30-second timeout, after which the `SIGKILL` value is sent and the containers are forcibly stopped. This signal can be defined in your container image with the `STOPSIGNAL` instruction and will default to `SIGTERM`. If the container handles the `SIGTERM` value gracefully and exits within 30 seconds from receiving it, no `SIGKILL` value is sent.
 *
 * For Windows containers, POSIX signals do not work and runtime stops the container by sending a `CTRL_SHUTDOWN_EVENT`. For more information, see Unable to react to graceful shutdown of (Windows) container #25982 on GitHub.
 *
 * The default 30-second timeout can be configured on the Amazon ECS container agent with the `ECS_CONTAINER_STOP_TIMEOUT` variable. For more information, see Amazon ECS Container Agent Configuration in the *Amazon Elastic Container Service Developer Guide*.
 */
export const stopTask: API.OperationMethod<
  StopTaskRequest,
  StopTaskResponse,
  StopTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, task: 0, reason: 0 },
    output: { task: o_Task },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTask",
})) as any;

export type SubmitAttachmentStateChangesError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Sent to acknowledge that an attachment changed states.
 */
export const submitAttachmentStateChanges: API.OperationMethod<
  SubmitAttachmentStateChangesRequest,
  SubmitAttachmentStateChangesResponse,
  SubmitAttachmentStateChangesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, attachments: D.list(i_AttachmentStateChange) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitAttachmentStateChanges",
})) as any;

export type SubmitContainerStateChangeError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Sent to acknowledge that a container changed states.
 */
export const submitContainerStateChange: API.OperationMethod<
  SubmitContainerStateChangeRequest,
  SubmitContainerStateChangeResponse,
  SubmitContainerStateChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      task: 0,
      containerName: 0,
      runtimeId: 0,
      status: 0,
      exitCode: 0,
      reason: 0,
      networkBindings: D.list(i_NetworkBinding),
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitContainerStateChange",
})) as any;

export type SubmitTaskStateChangeError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * This action is only used by the Amazon ECS agent, and it is not intended for use outside of the agent.
 *
 * Sent to acknowledge that a task changed states.
 */
export const submitTaskStateChange: API.OperationMethod<
  SubmitTaskStateChangeRequest,
  SubmitTaskStateChangeResponse,
  SubmitTaskStateChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      task: 0,
      status: 0,
      reason: 0,
      containers: D.list({
        containerName: 0,
        imageDigest: 0,
        runtimeId: 0,
        exitCode: 0,
        networkBindings: D.list(i_NetworkBinding),
        reason: 0,
        status: 0,
      }),
      attachments: D.list(i_AttachmentStateChange),
      managedAgents: D.list({
        containerName: 0,
        managedAgentName: 0,
        status: 0,
        reason: 0,
      }),
      pullStartedAt: 0,
      pullStoppedAt: 0,
      executionStoppedAt: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitTaskStateChange",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags on a resource aren't specified in the request parameters, they aren't changed. When a resource is deleted, the tags that are associated with that resource are deleted as well.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCapacityProviderError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies the parameters for a capacity provider.
 *
 * These changes only apply to new Amazon ECS Managed Instances, or EC2 instances, not existing ones.
 */
export const updateCapacityProvider: API.OperationMethod<
  UpdateCapacityProviderRequest,
  UpdateCapacityProviderResponse,
  UpdateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      cluster: 0,
      autoScalingGroupProvider: {
        managedScaling: i_ManagedScaling,
        managedTerminationProtection: 0,
        managedDraining: 0,
      },
      managedInstancesProvider: {
        infrastructureRoleArn: 0,
        instanceLaunchTemplate: {
          ec2InstanceProfileArn: 0,
          networkConfiguration: i_ManagedInstancesNetworkConfiguration,
          storageConfiguration: i_ManagedInstancesStorageConfiguration,
          instanceMetadataTagsPropagation: 0,
          localStorageConfiguration:
            i_ManagedInstancesLocalStorageConfiguration,
          monitoring: 0,
          instanceRequirements: i_InstanceRequirementsRequest,
          capacityReservations: i_CapacityReservationRequest,
        },
        propagateTags: 0,
        infrastructureOptimization: i_InfrastructureOptimization,
        autoRepairConfiguration: i_AutoRepairConfiguration,
      },
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityProvider",
})) as any;

export type UpdateClusterError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | ServerException
  | CommonErrors;
/**
 * Updates the cluster.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      settings: D.list(i_ClusterSetting),
      configuration: i_ClusterConfiguration,
      serviceConnectDefaults: i_ClusterServiceConnectDefaultsRequest,
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
})) as any;

export type UpdateClusterSettingsError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Modifies the settings to use for a cluster.
 */
export const updateClusterSettings: API.OperationMethod<
  UpdateClusterSettingsRequest,
  UpdateClusterSettingsResponse,
  UpdateClusterSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, settings: D.list(i_ClusterSetting) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClusterSettings",
})) as any;

export type UpdateContainerAgentError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | MissingVersionException
  | NoUpdateAvailableException
  | ServerException
  | UpdateInProgressException
  | CommonErrors;
/**
 * Updates the Amazon ECS container agent on a specified container instance. Updating the Amazon ECS container agent doesn't interrupt running tasks or services on the container instance. The process for updating the agent differs depending on whether your container instance was launched with the Amazon ECS-optimized AMI or another operating system.
 *
 * The `UpdateContainerAgent` API isn't supported for container instances using the Amazon ECS-optimized Amazon Linux 2 (arm64) AMI. To update the container agent, you can update the `ecs-init` package. This updates the agent. For more information, see Updating the Amazon ECS container agent in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Agent updates with the `UpdateContainerAgent` API operation do not apply to Windows container instances. We recommend that you launch new container instances to update the agent version in your Windows clusters.
 *
 * The `UpdateContainerAgent` API requires an Amazon ECS-optimized AMI or Amazon Linux AMI with the `ecs-init` service installed and running. For help updating the Amazon ECS container agent on other operating systems, see Manually updating the Amazon ECS container agent in the *Amazon Elastic Container Service Developer Guide*.
 */
export const updateContainerAgent: API.OperationMethod<
  UpdateContainerAgentRequest,
  UpdateContainerAgentResponse,
  UpdateContainerAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, containerInstance: 0 },
    output: { containerInstance: o_ContainerInstance },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    MissingVersionException,
    NoUpdateAvailableException,
    ServerException,
    UpdateInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerAgent",
})) as any;

export type UpdateContainerInstancesStateError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | CommonErrors;
/**
 * Modifies the status of an Amazon ECS container instance.
 *
 * Once a container instance has reached an `ACTIVE` state, you can change the status of a container instance to `DRAINING` to manually remove an instance from a cluster, for example to perform system updates, update the Docker daemon, or scale down the cluster size.
 *
 * A container instance can't be changed to `DRAINING` until it has reached an `ACTIVE` status. If the instance is in any other status, an error will be received.
 *
 * When you set a container instance to `DRAINING`, Amazon ECS prevents new tasks from being scheduled for placement on the container instance and replacement service tasks are started on other container instances in the cluster if the resources are available. Service tasks on the container instance that are in the `PENDING` state are stopped immediately.
 *
 * Service tasks on the container instance that are in the `RUNNING` state are stopped and replaced according to the service's deployment configuration parameters, `minimumHealthyPercent` and `maximumPercent`. You can change the deployment configuration of your service using UpdateService.
 *
 * - If `minimumHealthyPercent` is below 100%, the scheduler can ignore `desiredCount` temporarily during task replacement. For example, `desiredCount` is four tasks, a minimum of 50% allows the scheduler to stop two existing tasks before starting two new tasks. If the minimum is 100%, the service scheduler can't remove existing tasks until the replacement tasks are considered healthy. Tasks for services that do not use a load balancer are considered healthy if they're in the `RUNNING` state. Tasks for services that use a load balancer are considered healthy if they're in the `RUNNING` state and are reported as healthy by the load balancer.
 *
 * - The `maximumPercent` parameter represents an upper limit on the number of running tasks during task replacement. You can use this to define the replacement batch size. For example, if `desiredCount` is four tasks, a maximum of 200% starts four new tasks before stopping the four tasks to be drained, provided that the cluster resources required to do this are available. If the maximum is 100%, then replacement tasks can't start until the draining tasks have stopped.
 *
 * Any `PENDING` or `RUNNING` tasks that do not belong to a service aren't affected. You must wait for them to finish or stop them manually.
 *
 * A container instance has completed draining when it has no more `RUNNING` tasks. You can verify this using ListTasks.
 *
 * When a container instance has been drained, you can set a container instance to `ACTIVE` status and once it has reached that status the Amazon ECS scheduler can begin scheduling tasks on the instance again.
 */
export const updateContainerInstancesState: API.OperationMethod<
  UpdateContainerInstancesStateRequest,
  UpdateContainerInstancesStateResponse,
  UpdateContainerInstancesStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, containerInstances: 0, status: 0 },
    output: { containerInstances: D.list(o_ContainerInstance) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerInstancesState",
})) as any;

export type UpdateDaemonError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | DaemonNotActiveException
  | DaemonNotFoundException
  | InvalidParameterException
  | PlatformUnknownException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Updates the specified daemon. When you update a daemon, a new deployment is triggered that progressively rolls out the changes to the container instances associated with the daemon's capacity providers. For more information, see Daemon deployments in the *Amazon Elastic Container Service Developer Guide*.
 *
 * Amazon ECS drains existing container instances and provisions new instances with the updated daemon. Amazon ECS automatically launches replacement tasks for your services.
 *
 * Updating a daemon triggers a rolling deployment that drains and replaces container instances. Plan updates during maintenance windows to minimize impact on running services.
 *
 * ECS Managed Daemons is only supported for Amazon ECS Managed Instances Capacity Providers.
 */
export const updateDaemon: API.OperationMethod<
  UpdateDaemonRequest,
  UpdateDaemonResponse,
  UpdateDaemonError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      daemonArn: 0,
      daemonTaskDefinitionArn: 0,
      capacityProviderArns: 0,
      deploymentConfiguration: i_DaemonDeploymentConfiguration,
      propagateTags: 0,
      enableECSManagedTags: 0,
      enableExecuteCommand: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    DaemonNotActiveException,
    DaemonNotFoundException,
    InvalidParameterException,
    PlatformUnknownException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDaemon",
})) as any;

export type UpdateExpressGatewayServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Updates an existing Express service configuration. Modifies container settings, resource allocation, auto-scaling configuration, and other service parameters without recreating the service.
 *
 * Amazon ECS creates a new service revision with updated configuration and performs a rolling deployment to replace existing tasks. The service remains available during updates, ensuring zero-downtime deployments.
 *
 * Some parameters like the infrastructure role cannot be modified after service creation and require creating a new service.
 */
export const updateExpressGatewayService: API.OperationMethod<
  UpdateExpressGatewayServiceRequest,
  UpdateExpressGatewayServiceResponse,
  UpdateExpressGatewayServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      serviceArn: 0,
      executionRoleArn: 0,
      healthCheckPath: 0,
      primaryContainer: i_ExpressGatewayContainer,
      taskRoleArn: 0,
      networkConfiguration: i_ExpressGatewayServiceNetworkConfiguration,
      cpu: 0,
      memory: 0,
      scalingTarget: i_ExpressGatewayScalingTarget,
      taskDefinitionArn: 0,
    },
    output: {
      service: {
        targetConfiguration: o_ExpressGatewayServiceConfiguration,
        createdAt: D.ts,
        updatedAt: D.ts,
      },
    },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExpressGatewayService",
})) as any;

export type UpdateServiceError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | NamespaceNotFoundException
  | PlatformTaskDefinitionIncompatibilityException
  | PlatformUnknownException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies the parameters of a service.
 *
 * On March 21, 2024, a change was made to resolve the task definition revision before authorization. When a task definition revision is not specified, authorization will occur using the latest revision of a task definition.
 *
 * For services using the rolling update (`ECS`) you can update the desired count, deployment configuration, network configuration, load balancers, service registries, enable ECS managed tags option, propagate tags option, task placement constraints and strategies, and task definition. When you update any of these parameters, Amazon ECS starts new tasks with the new configuration.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when starting or running a task, or when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*. You can update your volume configurations and trigger a new deployment. `volumeConfigurations` is only supported for REPLICA service and not DAEMON service. If you leave `volumeConfigurations` `null`, it doesn't trigger a new deployment. For more information on volumes, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * For services using the blue/green (`CODE_DEPLOY`) deployment controller, only the desired count, deployment configuration, health check grace period, task placement constraints and strategies, enable ECS managed tags option, and propagate tags can be updated using this API. If the network configuration, platform version, task definition, or load balancer need to be updated, create a new CodeDeploy deployment. For more information, see CreateDeployment in the *CodeDeploy API Reference*.
 *
 * For services using an external deployment controller, you can update only the desired count, task placement constraints and strategies, health check grace period, enable ECS managed tags option, and propagate tags option, using this API. If the launch type, load balancer, network configuration, platform version, or task definition need to be updated, create a new task set For more information, see CreateTaskSet.
 *
 * You can add to or subtract from the number of instantiations of a task definition in a service by specifying the cluster that the service is running in and a new `desiredCount` parameter.
 *
 * You can attach Amazon EBS volumes to Amazon ECS tasks by configuring the volume when starting or running a task, or when creating or updating a service. For more information, see Amazon EBS volumes in the *Amazon Elastic Container Service Developer Guide*.
 *
 * If you have updated the container image of your application, you can create a new task definition with that image and deploy it to your service. The service scheduler uses the minimum healthy percent and maximum percent parameters (in the service's deployment configuration) to determine the deployment strategy.
 *
 * If your updated Docker image uses the same tag as what is in the existing task definition for your service (for example, `my_image:latest`), you don't need to create a new revision of your task definition. You can update the service using the `forceNewDeployment` option. The new tasks launched by the deployment pull the current image/tag combination from your repository when they start.
 *
 * You can also update the deployment configuration of a service. When a deployment is triggered by updating the task definition of a service, the service scheduler uses the deployment configuration parameters, `minimumHealthyPercent` and `maximumPercent`, to determine the deployment strategy.
 *
 * - If `minimumHealthyPercent` is below 100%, the scheduler can ignore `desiredCount` temporarily during a deployment. For example, if `desiredCount` is four tasks, a minimum of 50% allows the scheduler to stop two existing tasks before starting two new tasks. Tasks for services that don't use a load balancer are considered healthy if they're in the `RUNNING` state. Tasks for services that use a load balancer are considered healthy if they're in the `RUNNING` state and are reported as healthy by the load balancer.
 *
 * - The `maximumPercent` parameter represents an upper limit on the number of running tasks during a deployment. You can use it to define the deployment batch size. For example, if `desiredCount` is four tasks, a maximum of 200% starts four new tasks before stopping the four older tasks (provided that the cluster resources required to do this are available).
 *
 * When UpdateService stops a task during a deployment, the equivalent of `docker stop` is issued to the containers running in the task. This results in a `SIGTERM` and a 30-second timeout. After this, `SIGKILL` is sent and the containers are forcibly stopped. If the container handles the `SIGTERM` gracefully and exits within 30 seconds from receiving it, no `SIGKILL` is sent.
 *
 * When the service scheduler launches new tasks, it determines task placement in your cluster with the following logic.
 *
 * - Determine which of the container instances in your cluster can support your service's task definition. For example, they have the required CPU, memory, ports, and container instance attributes.
 *
 * - By default, the service scheduler attempts to balance tasks across Availability Zones in this manner even though you can choose a different placement strategy.
 *
 * - Sort the valid container instances by the fewest number of running tasks for this service in the same Availability Zone as the instance. For example, if zone A has one running service task and zones B and C each have zero, valid container instances in either zone B or C are considered optimal for placement.
 *
 * - Place the new service task on a valid container instance in an optimal Availability Zone (based on the previous steps), favoring container instances with the fewest number of running tasks for this service.
 *
 * When the service scheduler stops running tasks, it attempts to maintain balance across the Availability Zones in your cluster using the following logic:
 *
 * - Sort the container instances by the largest number of running tasks for this service in the same Availability Zone as the instance. For example, if zone A has one running service task and zones B and C each have two, container instances in either zone B or C are considered optimal for termination.
 *
 * - Stop the task on a container instance in an optimal Availability Zone (based on the previous steps), favoring container instances with the largest number of running tasks for this service.
 */
export const updateService: API.OperationMethod<
  UpdateServiceRequest,
  UpdateServiceResponse,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      cluster: 0,
      service: 0,
      desiredCount: 0,
      taskDefinition: 0,
      capacityProviderStrategy: D.list(i_CapacityProviderStrategyItem),
      deploymentConfiguration: i_DeploymentConfiguration,
      availabilityZoneRebalancing: 0,
      networkConfiguration: i_NetworkConfiguration,
      placementConstraints: D.list(i_PlacementConstraint),
      placementStrategy: D.list(i_PlacementStrategy),
      platformVersion: 0,
      forceNewDeployment: 0,
      healthCheckGracePeriodSeconds: 0,
      deploymentController: i_DeploymentController,
      enableExecuteCommand: 0,
      enableECSManagedTags: 0,
      loadBalancers: D.list(i_LoadBalancer),
      propagateTags: 0,
      serviceRegistries: D.list(i_ServiceRegistry),
      serviceConnectConfiguration: i_ServiceConnectConfiguration,
      volumeConfigurations: D.list(i_ServiceVolumeConfiguration),
      vpcLatticeConfigurations: D.list(i_VpcLatticeConfiguration),
      monitoring: i_MonitoringConfiguration,
    },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    NamespaceNotFoundException,
    PlatformTaskDefinitionIncompatibilityException,
    PlatformUnknownException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
})) as any;

export type UpdateServicePrimaryTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | TaskSetNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies which task set in a service is the primary task set. Any parameters that are updated on the primary task set in a service will transition to the service. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS Deployment Types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const updateServicePrimaryTaskSet: API.OperationMethod<
  UpdateServicePrimaryTaskSetRequest,
  UpdateServicePrimaryTaskSetResponse,
  UpdateServicePrimaryTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, service: 0, primaryTaskSet: 0 },
    output: { taskSet: o_TaskSet },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    TaskSetNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServicePrimaryTaskSet",
})) as any;

export type UpdateTaskProtectionError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceNotFoundException
  | ServerException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Updates the protection status of a task. You can set `protectionEnabled` to `true` to protect your task from termination during scale-in events from Service Autoscaling or deployments.
 *
 * Task-protection, by default, expires after 2 hours at which point Amazon ECS clears the `protectionEnabled` property making the task eligible for termination by a subsequent scale-in event.
 *
 * You can specify a custom expiration period for task protection from 1 minute to up to 2,880 minutes (48 hours). To specify the custom expiration period, set the `expiresInMinutes` property. The `expiresInMinutes` property is always reset when you invoke this operation for a task that already has `protectionEnabled` set to `true`. You can keep extending the protection expiration period of a task by invoking this operation repeatedly.
 *
 * To learn more about Amazon ECS task protection, see Task scale-in protection in the * Amazon Elastic Container Service Developer Guide* .
 *
 * This operation is only supported for tasks belonging to an Amazon ECS service. Invoking this operation for a standalone task will result in an `TASK_NOT_VALID` failure. For more information, see API failure reasons.
 *
 * If you prefer to set task protection from within the container, we recommend using the Task scale-in protection endpoint.
 */
export const updateTaskProtection: API.OperationMethod<
  UpdateTaskProtectionRequest,
  UpdateTaskProtectionResponse,
  UpdateTaskProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, tasks: 0, protectionEnabled: 0, expiresInMinutes: 0 },
    output: { protectedTasks: D.list(o_ProtectedTask) },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceNotFoundException,
    ServerException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskProtection",
})) as any;

export type UpdateTaskSetError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | LimitExceededException
  | ServerException
  | ServiceNotActiveException
  | ServiceNotFoundException
  | TaskSetNotFoundException
  | UnsupportedFeatureException
  | CommonErrors;
/**
 * Modifies a task set. This is used when a service uses the `EXTERNAL` deployment controller type. For more information, see Amazon ECS Deployment Types in the *Amazon Elastic Container Service Developer Guide*.
 */
export const updateTaskSet: API.OperationMethod<
  UpdateTaskSetRequest,
  UpdateTaskSetResponse,
  UpdateTaskSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { cluster: 0, service: 0, taskSet: 0, scale: i_Scale },
    output: { taskSet: o_TaskSet },
  },
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    LimitExceededException,
    ServerException,
    ServiceNotActiveException,
    ServiceNotFoundException,
    TaskSetNotFoundException,
    UnsupportedFeatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTaskSet",
})) as any;

const i_AttachmentStateChange: D.LazyStruct = () => ({
  attachmentArn: 0,
  status: 0,
});
const i_Attribute: D.LazyStruct = () => ({
  name: 0,
  value: 0,
  targetType: 0,
  targetId: 0,
});
const i_AutoRepairConfiguration: D.LazyStruct = () => ({ actionsStatus: 0 });
const i_CapacityProviderStrategyItem: D.LazyStruct = () => ({
  capacityProvider: 0,
  weight: 0,
  base: 0,
});
const i_CapacityReservationRequest: D.LazyStruct = () => ({
  reservationGroupArn: 0,
  reservationPreference: 0,
});
const i_ClusterConfiguration: D.LazyStruct = () => ({
  executeCommandConfiguration: {
    kmsKeyId: 0,
    logging: 0,
    logConfiguration: {
      cloudWatchLogGroupName: 0,
      cloudWatchEncryptionEnabled: 0,
      s3BucketName: 0,
      s3EncryptionEnabled: 0,
      s3KeyPrefix: 0,
    },
  },
  managedStorageConfiguration: {
    kmsKeyId: 0,
    fargateEphemeralStorageKmsKeyId: 0,
  },
});
const i_ClusterServiceConnectDefaultsRequest: D.LazyStruct = () => ({
  namespace: 0,
});
const i_ClusterSetting: D.LazyStruct = () => ({ name: 0, value: 0 });
const i_ContainerDependency: D.LazyStruct = () => ({
  containerName: 0,
  condition: 0,
});
const i_ContainerRestartPolicy: D.LazyStruct = () => ({
  enabled: 0,
  ignoredExitCodes: 0,
  restartAttemptPeriod: 0,
});
const i_CreatedAt: D.LazyStruct = () => ({ before: 0, after: 0 });
const i_DaemonDeploymentConfiguration: D.LazyStruct = () => ({
  drainPercent: 0,
  alarms: { alarmNames: 0, enable: 0 },
  bakeTimeInMinutes: 0,
});
const i_DeploymentConfiguration: D.LazyStruct = () => ({
  deploymentCircuitBreaker: {
    enable: 0,
    rollback: 0,
    resetOnHealthyTask: 0,
    thresholdConfiguration: { type: 0, value: 0 },
  },
  maximumPercent: 0,
  minimumHealthyPercent: 0,
  alarms: { alarmNames: 0, rollback: 0, enable: 0 },
  strategy: 0,
  bakeTimeInMinutes: 0,
  lifecycleHooks: D.list({
    targetType: 0,
    hookTargetArn: 0,
    roleArn: 0,
    lifecycleStages: 0,
    hookDetails: 0,
    timeoutConfiguration: { timeoutInMinutes: 0, action: 0 },
  }),
  linearConfiguration: { stepPercent: 0, stepBakeTimeInMinutes: 0 },
  canaryConfiguration: { canaryPercent: 0, canaryBakeTimeInMinutes: 0 },
  earlySuccessCriteria: {
    enable: 0,
    healthyPercent: 0,
    sourceServiceRevisionCleanup: 0,
  },
});
const i_DeploymentController: D.LazyStruct = () => ({ type: 0 });
const i_Device: D.LazyStruct = () => ({
  hostPath: 0,
  containerPath: 0,
  permissions: 0,
});
const i_EnvironmentFile: D.LazyStruct = () => ({ value: 0, type: 0 });
const i_EphemeralStorage: D.LazyStruct = () => ({ sizeInGiB: 0 });
const i_ExpressGatewayContainer: D.LazyStruct = () => ({
  image: 0,
  containerPort: 0,
  awsLogsConfiguration: { logGroup: 0, logStreamPrefix: 0 },
  repositoryCredentials: { credentialsParameter: 0 },
  command: 0,
  environment: D.list(i_KeyValuePair),
  secrets: D.list(i_Secret),
});
const i_ExpressGatewayScalingTarget: D.LazyStruct = () => ({
  minTaskCount: 0,
  maxTaskCount: 0,
  autoScalingMetric: 0,
  autoScalingTargetValue: 0,
});
const i_ExpressGatewayServiceNetworkConfiguration: D.LazyStruct = () => ({
  securityGroups: 0,
  subnets: 0,
});
const i_FirelensConfiguration: D.LazyStruct = () => ({ type: 0, options: 0 });
const i_HealthCheck: D.LazyStruct = () => ({
  command: 0,
  interval: 0,
  timeout: 0,
  retries: 0,
  startPeriod: 0,
});
const i_HostVolumeProperties: D.LazyStruct = () => ({ sourcePath: 0 });
const i_InfrastructureOptimization: D.LazyStruct = () => ({ scaleInAfter: 0 });
const i_InstanceRequirementsRequest: D.LazyStruct = () => ({
  vCpuCount: { min: 0, max: 0 },
  memoryMiB: { min: 0, max: 0 },
  cpuManufacturers: 0,
  memoryGiBPerVCpu: { min: 0, max: 0 },
  excludedInstanceTypes: 0,
  instanceGenerations: 0,
  spotMaxPricePercentageOverLowestPrice: 0,
  onDemandMaxPricePercentageOverLowestPrice: 0,
  bareMetal: 0,
  burstablePerformance: 0,
  requireHibernateSupport: 0,
  networkInterfaceCount: { min: 0, max: 0 },
  localStorage: 0,
  localStorageTypes: 0,
  totalLocalStorageGB: { min: 0, max: 0 },
  baselineEbsBandwidthMbps: { min: 0, max: 0 },
  acceleratorTypes: 0,
  acceleratorCount: { min: 0, max: 0 },
  acceleratorManufacturers: 0,
  acceleratorNames: 0,
  acceleratorTotalMemoryMiB: { min: 0, max: 0 },
  networkBandwidthGbps: { min: 0, max: 0 },
  allowedInstanceTypes: 0,
  maxSpotPriceAsPercentageOfOptimalOnDemandPrice: 0,
});
const i_KernelCapabilities: D.LazyStruct = () => ({ add: 0, drop: 0 });
const i_KeyValuePair: D.LazyStruct = () => ({ name: 0, value: 0 });
const i_LoadBalancer: D.LazyStruct = () => ({
  targetGroupArn: 0,
  loadBalancerName: 0,
  containerName: 0,
  containerPort: 0,
  advancedConfiguration: {
    alternateTargetGroupArn: 0,
    productionListenerRule: 0,
    testListenerRule: 0,
    roleArn: 0,
  },
});
const i_LogConfiguration: D.LazyStruct = () => ({
  logDriver: 0,
  options: 0,
  secretOptions: D.list(i_Secret),
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
const i_ManagedScaling: D.LazyStruct = () => ({
  status: 0,
  targetCapacity: 0,
  minimumScalingStepSize: 0,
  maximumScalingStepSize: 0,
  instanceWarmupPeriod: 0,
});
const i_MonitoringConfiguration: D.LazyStruct = () => ({
  metricConfigurations: D.list({ metricNames: 0, resolutionSeconds: 0 }),
});
const i_MountPoint: D.LazyStruct = () => ({
  sourceVolume: 0,
  containerPath: 0,
  readOnly: 0,
});
const i_NetworkBinding: D.LazyStruct = () => ({
  bindIP: 0,
  containerPort: 0,
  hostPort: 0,
  protocol: 0,
  containerPortRange: 0,
  hostPortRange: 0,
});
const i_NetworkConfiguration: D.LazyStruct = () => ({
  awsvpcConfiguration: { subnets: 0, securityGroups: 0, assignPublicIp: 0 },
});
const i_PlacementConstraint: D.LazyStruct = () => ({ type: 0, expression: 0 });
const i_PlacementStrategy: D.LazyStruct = () => ({ type: 0, field: 0 });
const i_RepositoryCredentials: D.LazyStruct = () => ({
  credentialsParameter: 0,
});
const i_ResourceRequirement: D.LazyStruct = () => ({ value: 0, type: 0 });
const i_Scale: D.LazyStruct = () => ({ value: 0, unit: 0 });
const i_Secret: D.LazyStruct = () => ({ name: 0, valueFrom: 0 });
const i_ServiceConnectConfiguration: D.LazyStruct = () => ({
  enabled: 0,
  namespace: 0,
  services: D.list({
    portName: 0,
    discoveryName: 0,
    clientAliases: D.list({
      port: 0,
      dnsName: 0,
      testTrafficRules: { header: { name: 0, value: { exact: 0 } } },
    }),
    ingressPortOverride: 0,
    timeout: { idleTimeoutSeconds: 0, perRequestTimeoutSeconds: 0 },
    tls: {
      issuerCertificateAuthority: { awsPcaAuthorityArn: 0 },
      kmsKey: 0,
      roleArn: 0,
    },
  }),
  logConfiguration: i_LogConfiguration,
  accessLogConfiguration: { format: 0, includeQueryParameters: 0 },
});
const i_ServiceRegistry: D.LazyStruct = () => ({
  registryArn: 0,
  port: 0,
  containerName: 0,
  containerPort: 0,
});
const i_ServiceVolumeConfiguration: D.LazyStruct = () => ({
  name: 0,
  managedEBSVolume: {
    encrypted: 0,
    kmsKeyId: 0,
    volumeType: 0,
    sizeInGiB: 0,
    snapshotId: 0,
    volumeInitializationRate: 0,
    iops: 0,
    throughput: 0,
    tagSpecifications: D.list(i_EBSTagSpecification),
    roleArn: 0,
    filesystemType: 0,
  },
});
const i_SystemControl: D.LazyStruct = () => ({ namespace: 0, value: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_TaskOverride: D.LazyStruct = () => ({
  containerOverrides: D.list({
    name: 0,
    command: 0,
    environment: D.list(i_KeyValuePair),
    environmentFiles: D.list(i_EnvironmentFile),
    cpu: 0,
    memory: 0,
    memoryReservation: 0,
    resourceRequirements: D.list(i_ResourceRequirement),
  }),
  cpu: 0,
  inferenceAcceleratorOverrides: D.list({ deviceName: 0, deviceType: 0 }),
  executionRoleArn: 0,
  memory: 0,
  taskRoleArn: 0,
  ephemeralStorage: i_EphemeralStorage,
});
const i_TaskVolumeConfiguration: D.LazyStruct = () => ({
  name: 0,
  managedEBSVolume: {
    encrypted: 0,
    kmsKeyId: 0,
    volumeType: 0,
    sizeInGiB: 0,
    snapshotId: 0,
    volumeInitializationRate: 0,
    iops: 0,
    throughput: 0,
    tagSpecifications: D.list(i_EBSTagSpecification),
    roleArn: 0,
    terminationPolicy: { deleteOnTermination: 0 },
    filesystemType: 0,
  },
});
const i_Tmpfs: D.LazyStruct = () => ({
  containerPath: 0,
  size: 0,
  mountOptions: 0,
});
const i_Ulimit: D.LazyStruct = () => ({ name: 0, softLimit: 0, hardLimit: 0 });
const i_VpcLatticeConfiguration: D.LazyStruct = () => ({
  roleArn: 0,
  targetGroupArn: 0,
  portName: 0,
});
const o_ContainerInstance: D.LazyStruct = () => ({
  registeredAt: D.ts,
  healthStatus: {
    details: D.list({ lastUpdated: D.ts, lastStatusChange: D.ts }),
  },
});
const o_ECSExpressGatewayService: D.LazyStruct = () => ({
  activeConfigurations: D.list(o_ExpressGatewayServiceConfiguration),
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_ExpressGatewayServiceConfiguration: D.LazyStruct = () => ({
  createdAt: D.ts,
});
const o_ManagedSecurityGroup: D.LazyStruct = () => ({ updatedAt: D.ts });
const o_ProtectedTask: D.LazyStruct = () => ({ expirationDate: D.ts });
const o_Service: D.LazyStruct = () => ({
  taskSets: D.list(o_TaskSet),
  deployments: D.list({ createdAt: D.ts, updatedAt: D.ts }),
  events: D.list({ createdAt: D.ts }),
  createdAt: D.ts,
});
const o_Task: D.LazyStruct = () => ({
  connectivityAt: D.ts,
  containers: D.list({ managedAgents: D.list({ lastStartedAt: D.ts }) }),
  createdAt: D.ts,
  executionStoppedAt: D.ts,
  pullStartedAt: D.ts,
  pullStoppedAt: D.ts,
  startedAt: D.ts,
  stoppedAt: D.ts,
  stoppingAt: D.ts,
});
const o_TaskDefinition: D.LazyStruct = () => ({
  registeredAt: D.ts,
  deregisteredAt: D.ts,
  deleteRequestedAt: D.ts,
});
const o_TaskSet: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
  stabilityStatusAt: D.ts,
});
const i_EBSTagSpecification: D.LazyStruct = () => ({
  resourceType: 0,
  tags: D.list(i_Tag),
  propagateTags: 0,
});
