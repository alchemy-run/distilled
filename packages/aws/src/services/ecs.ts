import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
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
const ns = /*@__PURE__*/ T.XmlNamespace("http://ecs.amazonaws.com/doc/2014-11-13/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "ECS",
  serviceShapeName: "AmazonEC2ContainerServiceV20141113",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ecs" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-11-13");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
              `https://ecs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://ecs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://ecs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ecs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ecs.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ECS",
  service: "ECS",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AttributeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AttributeLimitExceededException>()(
    "AttributeLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withQuotaError) {}
export class BlockedException
  extends /*@__PURE__*/ S.TaggedError<BlockedException>()("BlockedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class ClientException
  extends /*@__PURE__*/ S.TaggedError<ClientException>()("ClientException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class ClusterContainsCapacityProviderException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsCapacityProviderException>()(
    "ClusterContainsCapacityProviderException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterContainsContainerInstancesException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsContainerInstancesException>()(
    "ClusterContainsContainerInstancesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterContainsServicesException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsServicesException>()(
    "ClusterContainsServicesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterContainsTasksException
  extends /*@__PURE__*/ S.TaggedError<ClusterContainsTasksException>()(
    "ClusterContainsTasksException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withDependencyViolationError) {}
export class ClusterNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFoundException>()("ClusterNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    resourceIds: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(3872, __c121, 0)).annotate({ identifier: "ResourceIds" }),
    ),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError) {}
export class DaemonNotActiveException
  extends /*@__PURE__*/ S.TaggedError<DaemonNotActiveException>()("DaemonNotActiveException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError) {}
export class DaemonNotFoundException
  extends /*@__PURE__*/ S.TaggedError<DaemonNotFoundException>()("DaemonNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withQuotaError) {}
export class MissingVersionException
  extends /*@__PURE__*/ S.TaggedError<MissingVersionException>()("MissingVersionException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class NamespaceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<NamespaceNotFoundException>()("NamespaceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class NoUpdateAvailableException
  extends /*@__PURE__*/ S.TaggedError<NoUpdateAvailableException>()("NoUpdateAvailableException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PlatformTaskDefinitionIncompatibilityException
  extends /*@__PURE__*/ S.TaggedError<PlatformTaskDefinitionIncompatibilityException>()(
    "PlatformTaskDefinitionIncompatibilityException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class PlatformUnknownException
  extends /*@__PURE__*/ S.TaggedError<PlatformUnknownException>()("PlatformUnknownException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()("ServerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceDeploymentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ServiceDeploymentNotFoundException>()(
    "ServiceDeploymentNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ServiceLinkedRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleNotAssumable>()(
    "ServiceLinkedRoleNotAssumable",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidParameterException",
      message: { includes: "Unable to assume the service linked role" },
    }),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class ServiceNotActiveException
  extends /*@__PURE__*/ S.TaggedError<ServiceNotActiveException>()("ServiceNotActiveException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError) {}
export class ServiceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ServiceNotFoundException>()("ServiceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class TargetNotConnectedException
  extends /*@__PURE__*/ S.TaggedError<TargetNotConnectedException>()(
    "TargetNotConnectedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class TargetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TargetNotFoundException>()("TargetNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class TaskSetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TaskSetNotFoundException>()("TaskSetNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class UnsupportedFeatureException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedFeatureException>()(
    "UnsupportedFeatureException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class UpdateInProgressException
  extends /*@__PURE__*/ S.TaggedError<UpdateInProgressException>()("UpdateInProgressException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError, C.withRetryableError) {}
export type DeploymentLifecycleHookAction = "ROLLBACK" | "CONTINUE" | (string & {});
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
export type ManagedTerminationProtection = "ENABLED" | "DISABLED" | (string & {});
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
export type ManagedInstancesMonitoringOptions = "BASIC" | "DETAILED" | (string & {});
export type CapacityOptionType = "ON_DEMAND" | "SPOT" | "RESERVED" | (string & {});
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
export type CpuManufacturer = "intel" | "amd" | "amazon-web-services" | (string & {});
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
export type BurstablePerformance = "included" | "required" | "excluded" | (string & {});
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
export type ExecuteCommandLogging = "NONE" | "DEFAULT" | "OVERRIDE" | (string & {});
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
  critical?: boolean;
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
export type ExpressCpuArchitecture = "X86_64" | "ARM64" | (string & {});
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
  cpuArchitecture?: ExpressCpuArchitecture;
  scalingTarget?: ExpressGatewayScalingTarget;
  tags?: Tag[];
  taskDefinitionArn?: string;
}
export type ExpressGatewayServiceStatusCode = "ACTIVE" | "DRAINING" | "INACTIVE" | (string & {});
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
  cpuArchitecture?: ExpressCpuArchitecture;
  networkConfiguration?: ExpressGatewayServiceNetworkConfiguration;
  healthCheckPath?: string;
  primaryContainer?: ExpressGatewayContainer;
  scalingTarget?: ExpressGatewayScalingTarget;
  ingressPaths?: IngressPathSummary[];
  createdAt?: Date;
}
export type ExpressGatewayServiceConfigurations = ExpressGatewayServiceConfiguration[];
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
export type AvailabilityZoneRebalancing = "ENABLED" | "DISABLED" | (string & {});
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
export type LaunchType = "EC2" | "FARGATE" | "EXTERNAL" | "MANAGED_INSTANCES" | (string & {});
export type ThresholdType = "COUNT" | "BOUNDED_PERCENT" | "UNBOUNDED_PERCENT" | (string & {});
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
export type DeploymentStrategy = "ROLLING" | "BLUE_GREEN" | "LINEAR" | "CANARY" | (string & {});
export type DeploymentLifecycleHookTargetType = "AWS_LAMBDA" | "PAUSE" | (string & {});
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
export type PlacementConstraintType = "distinctInstance" | "memberOf" | (string & {});
export interface PlacementConstraint {
  type?: PlacementConstraintType;
  expression?: string;
}
export type PlacementConstraints = PlacementConstraint[];
export type PlacementStrategyType = "random" | "spread" | "binpack" | (string & {});
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
export type DeploymentControllerType = "ECS" | "CODE_DEPLOY" | "EXTERNAL" | (string & {});
export interface DeploymentController {
  type: DeploymentControllerType;
}
export type PropagateTags = "TASK_DEFINITION" | "SERVICE" | "NONE" | (string & {});
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
export type ServiceConnectIncludeQueryParameters = "DISABLED" | "ENABLED" | (string & {});
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
export type TaskFilesystemType = "ext3" | "ext4" | "xfs" | "ntfs" | (string & {});
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
export interface VpcLatticeAdvancedConfiguration {
  alternateTargetGroupArn?: string;
  productionListenerRule?: string;
  testListenerRule?: string;
}
export interface VpcLatticeConfiguration {
  roleArn: string;
  targetGroupArn: string;
  portName: string;
  advancedConfiguration?: VpcLatticeAdvancedConfiguration;
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
export type DeploymentRolloutState = "COMPLETED" | "FAILED" | "IN_PROGRESS" | (string & {});
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
export type ContainerCondition = "START" | "COMPLETE" | "SUCCESS" | "HEALTHY" | (string & {});
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
export type ResourceType = "GPU" | "InferenceAccelerator" | "NeuronDevice" | (string & {});
export interface ResourceRequirement {
  value: string;
  type: ResourceType;
}
export type ResourceRequirements = ResourceRequirement[];
export type FirelensConfigurationType = "fluentd" | "fluentbit" | (string & {});
export type FirelensConfigurationOptionsMap = { [key: string]: string | undefined };
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
export type TaskDefinitionStatus = "ACTIVE" | "INACTIVE" | "DELETE_IN_PROGRESS" | (string & {});
export type RequiresAttributes = Attribute[];
export type TaskDefinitionPlacementConstraintType = "memberOf" | (string & {});
export interface TaskDefinitionPlacementConstraint {
  type?: TaskDefinitionPlacementConstraintType;
  expression?: string;
}
export type TaskDefinitionPlacementConstraints = TaskDefinitionPlacementConstraint[];
export type Compatibility = "EC2" | "FARGATE" | "EXTERNAL" | "MANAGED_INSTANCES" | (string & {});
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
export type ContainerInstanceField = "TAGS" | "CONTAINER_INSTANCE_HEALTH" | (string & {});
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
  withoutDaemonCount?: number;
}
export type DaemonCapacityProviderList = DaemonCapacityProvider[];
export interface DaemonRevisionDetail {
  arn?: string;
  capacityProviders?: DaemonCapacityProvider[];
  totalRunningCount?: number;
  totalWithoutDaemonCount?: number;
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
  withoutDaemonInstanceCount?: number;
  drainingInstanceCount?: number;
}
export type DaemonDeploymentCapacityProviderList = DaemonDeploymentCapacityProvider[];
export interface DaemonDeploymentRevisionDetail {
  arn?: string;
  capacityProviders?: DaemonDeploymentCapacityProvider[];
  totalRunningInstanceCount?: number;
  totalWithoutDaemonInstanceCount?: number;
  totalDrainingInstanceCount?: number;
}
export type DaemonDeploymentRevisionDetailList = DaemonDeploymentRevisionDetail[];
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
  critical?: boolean;
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
export interface ServiceRevisionVpcLatticeConfiguration {
  targetGroupArn?: string;
  productionListenerRule?: string;
}
export type ServiceRevisionVpcLatticeConfigurations = ServiceRevisionVpcLatticeConfiguration[];
export interface ResolvedConfiguration {
  loadBalancers?: ServiceRevisionLoadBalancer[];
  vpcLatticeConfigurations?: ServiceRevisionVpcLatticeConfiguration[];
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
export type ManagedApplicationAutoScalingPolicies = ManagedApplicationAutoScalingPolicy[];
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
export type DaemonTaskDefinitionRevisionFilter = "LAST_REGISTERED" | (string & {});
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
export type TaskDefinitionFamilyStatus = "ACTIVE" | "INACTIVE" | "ALL" | (string & {});
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
export type StopServiceDeploymentStopType = "ABORT" | "ROLLBACK" | (string & {});
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
  critical?: boolean;
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
  cpuArchitecture?: ExpressCpuArchitecture;
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
  input: __S(256, __c8, 0) as any as S.Schema<ContinueServiceDeploymentRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<ContinueServiceDeploymentResponse>,
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
  telemetry: TELEMETRY,
  span: "ContinueServiceDeployment",
}));

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
  input: __S(321, __c10, 1) as any as S.Schema<CreateCapacityProviderRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<CreateCapacityProviderResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateCapacityProvider",
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<CreateClusterRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<CreateClusterResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateCluster",
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<CreateDaemonRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<CreateDaemonResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateDaemon",
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<CreateExpressGatewayServiceRequest>,
  output: __S(802, __c25, 2) as any as S.Schema<CreateExpressGatewayServiceResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateExpressGatewayService",
}));

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
 * When you create a service which uses the `ECS` deployment controller, you can choose between the following deployment strategies (which you can set in the "`strategy`" field in "`deploymentConfiguration`"): :
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
  input: __S(864, __c27, 0) as any as S.Schema<CreateServiceRequest>,
  output: __S(992, __c31, 0) as any as S.Schema<CreateServiceResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateService",
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<CreateTaskSetRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<CreateTaskSetResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateTaskSet",
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<DeleteAccountSettingRequest>,
  output: __S(1472, __c46, 0) as any as S.Schema<DeleteAccountSettingResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountSetting",
  telemetry: TELEMETRY,
  span: "DeleteAccountSetting",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<DeleteAttributesRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<DeleteAttributesResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteAttributes",
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<DeleteCapacityProviderRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<DeleteCapacityProviderResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteCapacityProvider",
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<DeleteClusterRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<DeleteClusterResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteCluster",
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<DeleteDaemonRequest>,
  output: __S(1696, __c53, 0) as any as S.Schema<DeleteDaemonResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteDaemon",
}));

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
  input: __S(1728, __c54, 0) as any as S.Schema<DeleteDaemonTaskDefinitionRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<DeleteDaemonTaskDefinitionResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDaemonTaskDefinition",
  telemetry: TELEMETRY,
  span: "DeleteDaemonTaskDefinition",
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<DeleteExpressGatewayServiceRequest>,
  output: __S(802, __c25, 2) as any as S.Schema<DeleteExpressGatewayServiceResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteExpressGatewayService",
}));

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
  input: __S(1824, __c57, 0) as any as S.Schema<DeleteServiceRequest>,
  output: __S(992, __c31, 0) as any as S.Schema<DeleteServiceResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteService",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<DeleteTaskDefinitionsRequest>,
  output: __S(1858, __c58, 2) as any as S.Schema<DeleteTaskDefinitionsResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaskDefinitions",
  telemetry: TELEMETRY,
  span: "DeleteTaskDefinitions",
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<DeleteTaskSetRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<DeleteTaskSetResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteTaskSet",
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<DeregisterContainerInstanceRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<DeregisterContainerInstanceResponse>,
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
  telemetry: TELEMETRY,
  span: "DeregisterContainerInstance",
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<DeregisterTaskDefinitionRequest>,
  output: __S(2177, __c68, 1) as any as S.Schema<DeregisterTaskDefinitionResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTaskDefinition",
  telemetry: TELEMETRY,
  span: "DeregisterTaskDefinition",
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<DescribeCapacityProvidersRequest>,
  output: __S(2210, __c69, 2) as any as S.Schema<DescribeCapacityProvidersResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeCapacityProviders",
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<DescribeClustersRequest>,
  output: __S(2242, __c70, 2) as any as S.Schema<DescribeClustersResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  telemetry: TELEMETRY,
  span: "DescribeClusters",
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<DescribeContainerInstancesRequest>,
  output: __S(2305, __c72, 1) as any as S.Schema<DescribeContainerInstancesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeContainerInstances",
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<DescribeDaemonRequest>,
  output: __S(2342, __c73, 6) as any as S.Schema<DescribeDaemonResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeDaemon",
}));

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
  input: __S(2368, __c74, 0) as any as S.Schema<DescribeDaemonDeploymentsRequest>,
  output: __S(2377, __c74, 9) as any as S.Schema<DescribeDaemonDeploymentsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeDaemonDeployments",
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<DescribeDaemonRevisionsRequest>,
  output: __S(2435, __c76, 3) as any as S.Schema<DescribeDaemonRevisionsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeDaemonRevisions",
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<DescribeDaemonTaskDefinitionRequest>,
  output: __S(2498, __c78, 2) as any as S.Schema<DescribeDaemonTaskDefinitionResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDaemonTaskDefinition",
  telemetry: TELEMETRY,
  span: "DescribeDaemonTaskDefinition",
}));

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
  input: __S(2560, __c80, 0) as any as S.Schema<DescribeExpressGatewayServiceRequest>,
  output: __S(802, __c25, 2) as any as S.Schema<DescribeExpressGatewayServiceResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeExpressGatewayService",
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<DescribeServiceDeploymentsRequest>,
  output: __S(2601, __c81, 9) as any as S.Schema<DescribeServiceDeploymentsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeServiceDeployments",
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<DescribeServiceRevisionsRequest>,
  output: __S(2647, __c82, 23) as any as S.Schema<DescribeServiceRevisionsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeServiceRevisions",
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<DescribeServicesRequest>,
  output: __S(2658, __c83, 2) as any as S.Schema<DescribeServicesResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeServices",
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<DescribeTaskDefinitionRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<DescribeTaskDefinitionResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTaskDefinition",
  telemetry: TELEMETRY,
  span: "DescribeTaskDefinition",
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<DescribeTasksRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<DescribeTasksResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeTasks",
}));

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
  input: __S(2880, __c90, 0) as any as S.Schema<DescribeTaskSetsRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<DescribeTaskSetsResponse>,
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
  telemetry: TELEMETRY,
  span: "DescribeTaskSets",
}));

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
  input: __S(2912, __c91, 0) as any as S.Schema<DiscoverPollEndpointRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<DiscoverPollEndpointResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverPollEndpoint",
  telemetry: TELEMETRY,
  span: "DiscoverPollEndpoint",
}));

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
  input: __S(2944, __c92, 0) as any as S.Schema<ExecuteCommandRequest>,
  output: __S(2946, __c92, 2) as any as S.Schema<ExecuteCommandResponse>,
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
  telemetry: TELEMETRY,
  span: "ExecuteCommand",
}));

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
  input: __S(2976, __c93, 0) as any as S.Schema<GetTaskProtectionRequest>,
  output: __S(3010, __c94, 2) as any as S.Schema<GetTaskProtectionResponse>,
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
  telemetry: TELEMETRY,
  span: "GetTaskProtection",
}));

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
  input: __S(3040, __c95, 0) as any as S.Schema<ListAccountSettingsRequest>,
  output: __S(3042, __c95, 2) as any as S.Schema<ListAccountSettingsResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "settings",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAccountSettings",
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
  input: __S(3072, __c96, 0) as any as S.Schema<ListAttributesRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<ListAttributesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListAttributes",
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
  input: __S(3104, __c97, 0) as any as S.Schema<ListClustersRequest>,
  output: __S(3105, __c97, 1) as any as S.Schema<ListClustersResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusterArns",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListClusters",
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
  input: __S(3136, __c98, 0) as any as S.Schema<ListContainerInstancesRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<ListContainerInstancesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListContainerInstances",
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
  input: __S(3168, __c99, 0) as any as S.Schema<ListDaemonDeploymentsRequest>,
  output: __S(3171, __c99, 3) as any as S.Schema<ListDaemonDeploymentsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListDaemonDeployments",
}));

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
  input: __S(3232, __c101, 0) as any as S.Schema<ListDaemonsRequest>,
  output: __S(3235, __c101, 3) as any as S.Schema<ListDaemonsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListDaemons",
}));

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
  input: __S(3264, __c102, 0) as any as S.Schema<ListDaemonTaskDefinitionsRequest>,
  output: __S(3267, __c102, 3) as any as S.Schema<ListDaemonTaskDefinitionsResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDaemonTaskDefinitions",
  telemetry: TELEMETRY,
  span: "ListDaemonTaskDefinitions",
}));

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
  input: __S(3296, __c103, 0) as any as S.Schema<ListServiceDeploymentsRequest>,
  output: __S(3299, __c103, 3) as any as S.Schema<ListServiceDeploymentsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListServiceDeployments",
}));

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
  input: __S(3328, __c104, 0) as any as S.Schema<ListServicesRequest>,
  output: __S(3360, __c105, 0) as any as S.Schema<ListServicesResponse>,
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
  telemetry: TELEMETRY,
  span: "ListServices",
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
  input: __S(3392, __c106, 0) as any as S.Schema<ListServicesByNamespaceRequest>,
  output: __S(3360, __c105, 0) as any as S.Schema<ListServicesByNamespaceResponse>,
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
  telemetry: TELEMETRY,
  span: "ListServicesByNamespace",
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
  input: __S(3424, __c107, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3425, __c107, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

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
  input: __S(3456, __c108, 0) as any as S.Schema<ListTaskDefinitionFamiliesRequest>,
  output: __S(3457, __c108, 1) as any as S.Schema<ListTaskDefinitionFamiliesResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskDefinitionFamilies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "families",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTaskDefinitionFamilies",
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
  input: __S(3488, __c109, 0) as any as S.Schema<ListTaskDefinitionsRequest>,
  output: __S(3489, __c109, 1) as any as S.Schema<ListTaskDefinitionsResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaskDefinitions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskDefinitionArns",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTaskDefinitions",
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
  input: __S(3520, __c110, 0) as any as S.Schema<ListTasksRequest>,
  output: __S(3521, __c110, 1) as any as S.Schema<ListTasksResponse>,
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
  telemetry: TELEMETRY,
  span: "ListTasks",
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
  input: __S(3552, __c111, 0) as any as S.Schema<PutAccountSettingRequest>,
  output: __S(1472, __c46, 0) as any as S.Schema<PutAccountSettingResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSetting",
  telemetry: TELEMETRY,
  span: "PutAccountSetting",
}));

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
  input: __S(3584, __c112, 0) as any as S.Schema<PutAccountSettingDefaultRequest>,
  output: __S(1472, __c46, 0) as any as S.Schema<PutAccountSettingDefaultResponse>,
  errors: [AccessDeniedException, ClientException, InvalidParameterException, ServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSettingDefault",
  telemetry: TELEMETRY,
  span: "PutAccountSettingDefault",
}));

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
  input: __S(3616, __c113, 0) as any as S.Schema<PutAttributesRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<PutAttributesResponse>,
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
  telemetry: TELEMETRY,
  span: "PutAttributes",
}));

export type PutClusterCapacityProvidersError =
  | AccessDeniedException
  | ClientException
  | ClusterNotFoundException
  | InvalidParameterException
  | ResourceInUseException
  | ServerException
  | UpdateInProgressException
  | ServiceLinkedRoleNotAssumable
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
  input: __S(3648, __c114, 0) as any as S.Schema<PutClusterCapacityProvidersRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<PutClusterCapacityProvidersResponse>,
  errors: [
    AccessDeniedException,
    ClientException,
    ClusterNotFoundException,
    InvalidParameterException,
    ResourceInUseException,
    ServerException,
    UpdateInProgressException,
    ServiceLinkedRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterCapacityProviders",
  telemetry: TELEMETRY,
  span: "PutClusterCapacityProviders",
}));

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
  input: __S(3682, __c115, 2) as any as S.Schema<RegisterContainerInstanceRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<RegisterContainerInstanceResponse>,
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
  telemetry: TELEMETRY,
  span: "RegisterContainerInstance",
}));

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
  input: __S(3712, __c116, 0) as any as S.Schema<RegisterDaemonTaskDefinitionRequest>,
  output: __S(1760, __c55, 0) as any as S.Schema<RegisterDaemonTaskDefinitionResponse>,
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
  telemetry: TELEMETRY,
  span: "RegisterDaemonTaskDefinition",
}));

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
  input: __S(3744, __c117, 0) as any as S.Schema<RegisterTaskDefinitionRequest>,
  output: __S(2720, __c85, 0) as any as S.Schema<RegisterTaskDefinitionResponse>,
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
  telemetry: TELEMETRY,
  span: "RegisterTaskDefinition",
}));

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
  input: __S(3776, __c118, 0) as any as S.Schema<RunTaskRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<RunTaskResponse>,
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
  telemetry: TELEMETRY,
  span: "RunTask",
}));

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
  input: __S(3840, __c120, 0) as any as S.Schema<StartTaskRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<StartTaskResponse>,
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
  telemetry: TELEMETRY,
  span: "StartTask",
}));

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
  input: __S(3904, __c122, 0) as any as S.Schema<StopServiceDeploymentRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<StopServiceDeploymentResponse>,
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
  telemetry: TELEMETRY,
  span: "StopServiceDeployment",
}));

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
  input: __S(3936, __c123, 0) as any as S.Schema<StopTaskRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<StopTaskResponse>,
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
  telemetry: TELEMETRY,
  span: "StopTask",
}));

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
  input: __S(3968, __c124, 0) as any as S.Schema<SubmitAttachmentStateChangesRequest>,
  output: __S(4000, __c125, 0) as any as S.Schema<SubmitAttachmentStateChangesResponse>,
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
  telemetry: TELEMETRY,
  span: "SubmitAttachmentStateChanges",
}));

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
  input: __S(4064, __c127, 0) as any as S.Schema<SubmitContainerStateChangeRequest>,
  output: __S(4000, __c125, 0) as any as S.Schema<SubmitContainerStateChangeResponse>,
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
  telemetry: TELEMETRY,
  span: "SubmitContainerStateChange",
}));

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
  input: __S(4100, __c128, 4) as any as S.Schema<SubmitTaskStateChangeRequest>,
  output: __S(4000, __c125, 0) as any as S.Schema<SubmitTaskStateChangeResponse>,
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
  telemetry: TELEMETRY,
  span: "SubmitTaskStateChange",
}));

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
  input: __S(4128, __c129, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(4160, __c130, 0) as any as S.Schema<TagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "TagResource",
}));

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
  input: __S(4192, __c131, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(4160, __c130, 0) as any as S.Schema<UntagResourceResponse>,
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
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

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
  input: __S(4227, __c132, 3) as any as S.Schema<UpdateCapacityProviderRequest>,
  output: __S(416, __c13, 0) as any as S.Schema<UpdateCapacityProviderResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateCapacityProvider",
}));

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
  input: __S(4256, __c133, 0) as any as S.Schema<UpdateClusterRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateClusterResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateCluster",
}));

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
  input: __S(4288, __c134, 0) as any as S.Schema<UpdateClusterSettingsRequest>,
  output: __S(608, __c19, 0) as any as S.Schema<UpdateClusterSettingsResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateClusterSettings",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<UpdateContainerAgentRequest>,
  output: __S(2144, __c67, 0) as any as S.Schema<UpdateContainerAgentResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateContainerAgent",
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<UpdateContainerInstancesStateRequest>,
  output: __S(2305, __c72, 1) as any as S.Schema<UpdateContainerInstancesStateResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateContainerInstancesState",
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<UpdateDaemonRequest>,
  output: __S(1696, __c53, 0) as any as S.Schema<UpdateDaemonResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateDaemon",
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<UpdateExpressGatewayServiceRequest>,
  output: __S(98, __c3, 2) as any as S.Schema<UpdateExpressGatewayServiceResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateExpressGatewayService",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<UpdateServiceRequest>,
  output: __S(992, __c31, 0) as any as S.Schema<UpdateServiceResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateService",
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<UpdateServicePrimaryTaskSetRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<UpdateServicePrimaryTaskSetResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateServicePrimaryTaskSet",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<UpdateTaskProtectionRequest>,
  output: __S(3010, __c94, 2) as any as S.Schema<UpdateTaskProtectionResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateTaskProtection",
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<UpdateTaskSetRequest>,
  output: __S(1376, __c43, 0) as any as S.Schema<UpdateTaskSetResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateTaskSet",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.optional(S.String), containerInstance: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateContainerAgentRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          containerInstances: __S(3872, __c121, 0),
          status: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateContainerInstancesStateRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          daemonArn: S.String,
          daemonTaskDefinitionArn: S.String,
          capacityProviderArns: __S(3872, __c121, 0),
          deploymentConfiguration: S.optional(__S(705, __c22, 1)),
          propagateTags: S.optional(S.String),
          enableECSManagedTags: S.optional(S.Boolean),
          enableExecuteCommand: S.optional(S.Boolean),
          critical: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDaemonRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          executionRoleArn: S.optional(S.String),
          healthCheckPath: S.optional(S.String),
          primaryContainer: S.optional(__S(834, __c26, 2)),
          taskRoleArn: S.optional(S.String),
          networkConfiguration: S.optional(__S(835, __c26, 3)),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          cpuArchitecture: S.optional(S.String),
          scalingTarget: S.optional(__S(836, __c26, 4)),
          taskDefinitionArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateExpressGatewayServiceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.optional(S.String),
          cluster: S.optional(S.String),
          serviceName: S.optional(S.String),
          status: S.optional(__S(837, __c26, 5)),
          targetConfiguration: S.optional(__S(840, __c26, 8)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdatedExpressGatewayService" });
    case 2:
      return S.suspend(() => S.Struct({ service: S.optional(__S(97, __c3, 1)) }).pipe(ns)).annotate(
        { identifier: "UpdateExpressGatewayServiceResponse" },
      );
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          service: S.String,
          desiredCount: S.optional(S.Number),
          taskDefinition: S.optional(S.String),
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          deploymentConfiguration: S.optional(__S(1129, __c35, 9)),
          availabilityZoneRebalancing: S.optional(S.String),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          placementConstraints: S.optional(__S(1089, __c34, 1)),
          placementStrategy: S.optional(__S(1281, __c40, 1)),
          platformVersion: S.optional(S.String),
          forceNewDeployment: S.optional(S.Boolean),
          healthCheckGracePeriodSeconds: S.optional(S.Number),
          deploymentController: S.optional(__S(1216, __c38, 0)),
          enableExecuteCommand: S.optional(S.Boolean),
          enableECSManagedTags: S.optional(S.Boolean),
          loadBalancers: S.optional(__S(898, __c28, 2)),
          propagateTags: S.optional(S.String),
          serviceRegistries: S.optional(__S(900, __c28, 4)),
          serviceConnectConfiguration: S.optional(__S(1163, __c36, 11)),
          volumeConfigurations: S.optional(__S(1166, __c36, 14)),
          vpcLatticeConfigurations: S.optional(__S(1169, __c36, 17)),
          monitoring: S.optional(__S(1314, __c41, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateServiceRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.String, service: S.String, primaryTaskSet: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateServicePrimaryTaskSetRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.String,
          tasks: __S(3872, __c121, 0),
          protectionEnabled: S.Boolean,
          expiresInMinutes: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTaskProtectionRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.String,
          service: S.String,
          taskSet: S.String,
          scale: __S(960, __c30, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTaskSetRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceDeploymentArn: S.String,
          hookId: S.String,
          action: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ContinueServiceDeploymentRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceDeploymentArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ContinueServiceDeploymentResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          infrastructureRoleArn: S.String,
          instanceLaunchTemplate: __S(395, __c12, 11),
          propagateTags: S.optional(S.String),
          infrastructureOptimization: S.optional(__S(396, __c12, 12)),
          autoRepairConfiguration: S.optional(__S(397, __c12, 13)),
        }),
      ).annotate({ identifier: "CreateManagedInstancesProviderConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          cluster: S.optional(S.String),
          autoScalingGroupProvider: S.optional(__S(385, __c12, 1)),
          managedInstancesProvider: S.optional(__S(320, __c10, 0)),
          tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCapacityProviderRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(352, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          targetCapacity: S.optional(S.Number),
          minimumScalingStepSize: S.optional(S.Number),
          maximumScalingStepSize: S.optional(S.Number),
          instanceWarmupPeriod: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ManagedScaling" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          autoScalingGroupArn: S.String,
          managedScaling: S.optional(__S(384, __c12, 0)),
          managedTerminationProtection: S.optional(S.String),
          managedDraining: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoScalingGroupProvider" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          subnets: S.optional(__S(3872, __c121, 0)),
          securityGroups: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "ManagedInstancesNetworkConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ storageSizeGiB: S.optional(S.Number) })).annotate({
        identifier: "ManagedInstancesStorageConfiguration",
      });
    case 4:
      return S.suspend(() => S.Struct({ useLocalStorage: S.optional(S.Boolean) })).annotate({
        identifier: "ManagedInstancesLocalStorageConfiguration",
      });
    case 5:
      return S.suspend(() => S.Struct({ min: S.Number, max: S.optional(S.Number) })).annotate({
        identifier: "VCpuCountRangeRequest",
      });
    case 6:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("item")));
    case 7:
      return S.suspend(() =>
        S.Struct({ min: S.optional(S.Number), max: S.optional(S.Number) }),
      ).annotate({ identifier: "MemoryGiBPerVCpuRequest" });
    case 8:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("item")));
    case 9:
      return S.suspend(() =>
        S.Struct({
          vCpuCount: __S(389, __c12, 5),
          memoryMiB: __S(389, __c12, 5),
          cpuManufacturers: S.optional(__S(390, __c12, 6)).pipe(T.XmlName("CpuManufacturer")),
          memoryGiBPerVCpu: S.optional(__S(391, __c12, 7)),
          excludedInstanceTypes: S.optional(__S(392, __c12, 8)).pipe(
            T.XmlName("ExcludedInstanceType"),
          ),
          instanceGenerations: S.optional(__S(390, __c12, 6)).pipe(T.XmlName("InstanceGeneration")),
          spotMaxPricePercentageOverLowestPrice: S.optional(S.Number),
          onDemandMaxPricePercentageOverLowestPrice: S.optional(S.Number),
          bareMetal: S.optional(S.String),
          burstablePerformance: S.optional(S.String),
          requireHibernateSupport: S.optional(S.Boolean),
          networkInterfaceCount: S.optional(__S(391, __c12, 7)),
          localStorage: S.optional(S.String),
          localStorageTypes: S.optional(__S(390, __c12, 6)).pipe(T.XmlName("LocalStorageType")),
          totalLocalStorageGB: S.optional(__S(391, __c12, 7)),
          baselineEbsBandwidthMbps: S.optional(__S(391, __c12, 7)),
          acceleratorTypes: S.optional(__S(390, __c12, 6)).pipe(T.XmlName("AcceleratorType")),
          acceleratorCount: S.optional(__S(391, __c12, 7)),
          acceleratorManufacturers: S.optional(__S(390, __c12, 6)).pipe(
            T.XmlName("AcceleratorManufacturer"),
          ),
          acceleratorNames: S.optional(__S(390, __c12, 6)).pipe(T.XmlName("AcceleratorName")),
          acceleratorTotalMemoryMiB: S.optional(__S(391, __c12, 7)),
          networkBandwidthGbps: S.optional(__S(391, __c12, 7)),
          allowedInstanceTypes: S.optional(__S(392, __c12, 8)).pipe(
            T.XmlName("AllowedInstanceType"),
          ),
          maxSpotPriceAsPercentageOfOptimalOnDemandPrice: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceRequirementsRequest" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          reservationGroupArn: S.optional(S.String),
          reservationPreference: S.optional(S.String),
        }),
      ).annotate({ identifier: "CapacityReservationRequest" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          ec2InstanceProfileArn: S.String,
          networkConfiguration: __S(386, __c12, 2),
          storageConfiguration: S.optional(__S(387, __c12, 3)),
          localStorageConfiguration: S.optional(__S(388, __c12, 4)),
          monitoring: S.optional(S.String),
          capacityOptionType: S.optional(S.String),
          instanceMetadataTagsPropagation: S.optional(S.Boolean),
          instanceRequirements: S.optional(__S(393, __c12, 9)),
          fipsEnabled: S.optional(S.Boolean),
          capacityReservations: S.optional(__S(394, __c12, 10)),
        }),
      ).annotate({ identifier: "InstanceLaunchTemplate" });
    case 12:
      return S.suspend(() => S.Struct({ scaleInAfter: S.optional(S.Number) })).annotate({
        identifier: "InfrastructureOptimization",
      });
    case 13:
      return S.suspend(() => S.Struct({ actionsStatus: S.optional(S.String) })).annotate({
        identifier: "AutoRepairConfiguration",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          infrastructureRoleArn: S.optional(S.String),
          instanceLaunchTemplate: S.optional(__S(395, __c12, 11)),
          propagateTags: S.optional(S.String),
          infrastructureOptimization: S.optional(__S(396, __c12, 12)),
          autoRepairConfiguration: S.optional(__S(397, __c12, 13)),
        }),
      ).annotate({ identifier: "ManagedInstancesProvider" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          capacityProviderArn: S.optional(S.String),
          name: S.optional(S.String),
          cluster: S.optional(S.String),
          status: S.optional(S.String),
          autoScalingGroupProvider: S.optional(__S(385, __c12, 1)),
          managedInstancesProvider: S.optional(__S(398, __c12, 14)),
          updateStatus: S.optional(S.String),
          updateStatusReason: S.optional(S.String),
          tags: S.optional(__S(353, __c11, 1)),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "CapacityProvider" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ capacityProvider: S.optional(__S(399, __c12, 15)) }).pipe(ns),
      ).annotate({ identifier: "CreateCapacityProviderResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterName: S.optional(S.String),
          tags: S.optional(__S(353, __c11, 1)),
          settings: S.optional(__S(577, __c18, 1)),
          configuration: S.optional(__S(581, __c18, 5)),
          capacityProviders: S.optional(__S(3872, __c121, 0)),
          defaultCapacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          serviceConnectDefaults: S.optional(__S(640, __c20, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateClusterRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "KeyValuePair" });
    case 1:
      return S.Array(__S(480, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capacityProvider: S.String,
          weight: S.optional(S.Number),
          base: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CapacityProviderStrategyItem" });
    case 1:
      return S.Array(__S(512, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          details: S.optional(__S(481, __c15, 1)),
        }),
      ).annotate({ identifier: "Attachment" });
    case 1:
      return S.Array(__S(544, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "ClusterSetting" });
    case 1:
      return S.Array(__S(576, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          cloudWatchLogGroupName: S.optional(S.String),
          cloudWatchEncryptionEnabled: S.optional(S.Boolean),
          s3BucketName: S.optional(S.String),
          s3EncryptionEnabled: S.optional(S.Boolean),
          s3KeyPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExecuteCommandLogConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          kmsKeyId: S.optional(S.String),
          logging: S.optional(S.String),
          logConfiguration: S.optional(__S(578, __c18, 2)),
        }),
      ).annotate({ identifier: "ExecuteCommandConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          kmsKeyId: S.optional(S.String),
          fargateEphemeralStorageKmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedStorageConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          executeCommandConfiguration: S.optional(__S(579, __c18, 3)),
          managedStorageConfiguration: S.optional(__S(580, __c18, 4)),
        }),
      ).annotate({ identifier: "ClusterConfiguration" });
    case 6:
      return S.suspend(() => S.Struct({ namespace: S.optional(S.String) })).annotate({
        identifier: "ClusterServiceConnectDefaults",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.optional(S.String),
          clusterName: S.optional(S.String),
          configuration: S.optional(__S(581, __c18, 5)),
          status: S.optional(S.String),
          registeredContainerInstancesCount: S.optional(S.Number),
          runningTasksCount: S.optional(S.Number),
          pendingTasksCount: S.optional(S.Number),
          activeServicesCount: S.optional(S.Number),
          statistics: S.optional(__S(481, __c15, 1)),
          tags: S.optional(__S(353, __c11, 1)),
          settings: S.optional(__S(577, __c18, 1)),
          capacityProviders: S.optional(__S(3872, __c121, 0)),
          defaultCapacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          attachments: S.optional(__S(545, __c17, 1)),
          attachmentsStatus: S.optional(S.String),
          serviceConnectDefaults: S.optional(__S(582, __c18, 6)),
        }),
      ).annotate({ identifier: "Cluster" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.optional(__S(583, __c18, 7)) }).pipe(ns),
      ).annotate({ identifier: "CreateClusterResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ namespace: S.String })).annotate({
        identifier: "ClusterServiceConnectDefaultsRequest",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          daemonName: S.String,
          clusterArn: S.optional(S.String),
          daemonTaskDefinitionArn: S.String,
          capacityProviderArns: __S(3872, __c121, 0),
          deploymentConfiguration: S.optional(__S(705, __c22, 1)),
          tags: S.optional(__S(353, __c11, 1)),
          propagateTags: S.optional(S.String),
          enableECSManagedTags: S.optional(S.Boolean),
          enableExecuteCommand: S.optional(S.Boolean),
          clientToken: S.optional(S.String),
          critical: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDaemonRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          daemonArn: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deploymentArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateDaemonResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ alarmNames: S.optional(__S(3872, __c121, 0)), enable: S.optional(S.Boolean) }),
      ).annotate({ identifier: "DaemonAlarmConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          drainPercent: S.optional(S.Number),
          alarms: S.optional(__S(704, __c22, 0)),
          bakeTimeInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DaemonDeploymentConfiguration" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          executionRoleArn: S.optional(S.String),
          infrastructureRoleArn: S.String,
          serviceName: S.optional(S.String),
          cluster: S.optional(S.String),
          healthCheckPath: S.optional(S.String),
          primaryContainer: S.optional(__S(834, __c26, 2)),
          taskRoleArn: S.optional(S.String),
          networkConfiguration: S.optional(__S(835, __c26, 3)),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          cpuArchitecture: S.optional(S.String),
          scalingTarget: S.optional(__S(836, __c26, 4)),
          tags: S.optional(__S(353, __c11, 1)),
          taskDefinitionArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateExpressGatewayServiceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, valueFrom: S.String })).annotate({
        identifier: "Secret",
      });
    case 1:
      return S.Array(__S(768, __c24, 0));
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(840, __c26, 8));
    case 1:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          serviceName: S.optional(S.String),
          serviceArn: S.optional(S.String),
          infrastructureRoleArn: S.optional(S.String),
          status: S.optional(__S(837, __c26, 5)),
          currentDeployment: S.optional(S.String),
          activeConfigurations: S.optional(__S(800, __c25, 0)),
          tags: S.optional(__S(353, __c11, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ECSExpressGatewayService" });
    case 2:
      return S.suspend(() =>
        S.Struct({ service: S.optional(__S(801, __c25, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateExpressGatewayServiceResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ logGroup: S.String, logStreamPrefix: S.String })).annotate({
        identifier: "ExpressGatewayServiceAwsLogsConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ credentialsParameter: S.optional(S.String) })).annotate({
        identifier: "ExpressGatewayRepositoryCredentials",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          image: S.String,
          containerPort: S.optional(S.Number),
          awsLogsConfiguration: S.optional(__S(832, __c26, 0)),
          repositoryCredentials: S.optional(__S(833, __c26, 1)),
          command: S.optional(__S(3872, __c121, 0)),
          environment: S.optional(__S(481, __c15, 1)),
          secrets: S.optional(__S(769, __c24, 1)),
        }),
      ).annotate({ identifier: "ExpressGatewayContainer" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          securityGroups: S.optional(__S(3872, __c121, 0)),
          subnets: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "ExpressGatewayServiceNetworkConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          minTaskCount: S.optional(S.Number),
          maxTaskCount: S.optional(S.Number),
          autoScalingMetric: S.optional(S.String),
          autoScalingTargetValue: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExpressGatewayScalingTarget" });
    case 5:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.String), statusReason: S.optional(S.String) }),
      ).annotate({ identifier: "ExpressGatewayServiceStatus" });
    case 6:
      return S.suspend(() => S.Struct({ accessType: S.String, endpoint: S.String })).annotate({
        identifier: "IngressPathSummary",
      });
    case 7:
      return S.Array(__S(838, __c26, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          serviceRevisionArn: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          taskRoleArn: S.optional(S.String),
          taskDefinitionArn: S.optional(S.String),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          cpuArchitecture: S.optional(S.String),
          networkConfiguration: S.optional(__S(835, __c26, 3)),
          healthCheckPath: S.optional(S.String),
          primaryContainer: S.optional(__S(834, __c26, 2)),
          scalingTarget: S.optional(__S(836, __c26, 4)),
          ingressPaths: S.optional(__S(839, __c26, 7)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ExpressGatewayServiceConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          serviceName: S.String,
          taskDefinition: S.optional(S.String),
          availabilityZoneRebalancing: S.optional(S.String),
          loadBalancers: S.optional(__S(898, __c28, 2)),
          serviceRegistries: S.optional(__S(900, __c28, 4)),
          desiredCount: S.optional(S.Number),
          clientToken: S.optional(S.String),
          launchType: S.optional(S.String),
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          platformVersion: S.optional(S.String),
          role: S.optional(S.String),
          deploymentConfiguration: S.optional(__S(1129, __c35, 9)),
          placementConstraints: S.optional(__S(1089, __c34, 1)),
          placementStrategy: S.optional(__S(1281, __c40, 1)),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          healthCheckGracePeriodSeconds: S.optional(S.Number),
          schedulingStrategy: S.optional(S.String),
          deploymentController: S.optional(__S(1216, __c38, 0)),
          tags: S.optional(__S(353, __c11, 1)),
          enableECSManagedTags: S.optional(S.Boolean),
          propagateTags: S.optional(S.String),
          enableExecuteCommand: S.optional(S.Boolean),
          serviceConnectConfiguration: S.optional(__S(1163, __c36, 11)),
          volumeConfigurations: S.optional(__S(1166, __c36, 14)),
          vpcLatticeConfigurations: S.optional(__S(1169, __c36, 17)),
          monitoring: S.optional(__S(1314, __c41, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alternateTargetGroupArn: S.optional(S.String),
          productionListenerRule: S.optional(S.String),
          testListenerRule: S.optional(S.String),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdvancedConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetGroupArn: S.optional(S.String),
          loadBalancerName: S.optional(S.String),
          containerName: S.optional(S.String),
          containerPort: S.optional(S.Number),
          advancedConfiguration: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "LoadBalancer" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.optional(S.String),
          port: S.optional(S.Number),
          containerName: S.optional(S.String),
          containerPort: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServiceRegistry" });
    case 4:
      return S.Array(__S(899, __c28, 3));
    case 5:
      return S.suspend(() => S.Struct({ kmsKeyId: S.optional(S.String) })).annotate({
        identifier: "DeploymentEphemeralStorage",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subnets: __S(3872, __c121, 0),
          securityGroups: S.optional(__S(3872, __c121, 0)),
          assignPublicIp: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsVpcConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ awsvpcConfiguration: S.optional(__S(928, __c29, 0)) }),
      ).annotate({ identifier: "NetworkConfiguration" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ value: S.optional(S.Number), unit: S.optional(S.String) }),
      ).annotate({ identifier: "Scale" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          taskSetArn: S.optional(S.String),
          serviceArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          startedBy: S.optional(S.String),
          externalId: S.optional(S.String),
          status: S.optional(S.String),
          taskDefinition: S.optional(S.String),
          computedDesiredCount: S.optional(S.Number),
          pendingCount: S.optional(S.Number),
          runningCount: S.optional(S.Number),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          launchType: S.optional(S.String),
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          platformVersion: S.optional(S.String),
          platformFamily: S.optional(S.String),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          loadBalancers: S.optional(__S(898, __c28, 2)),
          serviceRegistries: S.optional(__S(900, __c28, 4)),
          scale: S.optional(__S(960, __c30, 0)),
          stabilityStatus: S.optional(S.String),
          stabilityStatusAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(353, __c11, 1)),
          fargateEphemeralStorage: S.optional(__S(901, __c28, 5)),
        }),
      ).annotate({ identifier: "TaskSet" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ service: S.optional(__S(1225, __c38, 9)) }).pipe(ns),
      ).annotate({ identifier: "CreateServiceResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          logDriver: S.String,
          options: S.optional(__S(1056, __c33, 0)),
          secretOptions: S.optional(__S(769, __c24, 1)),
        }),
      ).annotate({ identifier: "LogConfiguration" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), expression: S.optional(S.String) }),
      ).annotate({ identifier: "PlacementConstraint" });
    case 1:
      return S.Array(__S(1088, __c34, 0));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String, value: S.Number })).annotate({
        identifier: "ThresholdConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          enable: S.Boolean,
          rollback: S.Boolean,
          resetOnHealthyTask: S.optional(S.Boolean),
          thresholdConfiguration: S.optional(__S(1120, __c35, 0)),
        }),
      ).annotate({ identifier: "DeploymentCircuitBreaker" });
    case 2:
      return S.suspend(() =>
        S.Struct({ alarmNames: __S(3872, __c121, 0), rollback: S.Boolean, enable: S.Boolean }),
      ).annotate({ identifier: "DeploymentAlarms" });
    case 3:
      return S.suspend(() =>
        S.Struct({ timeoutInMinutes: S.optional(S.Number), action: S.optional(S.String) }),
      ).annotate({ identifier: "DeploymentLifecycleHookTimeoutConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          targetType: S.optional(S.String),
          hookTargetArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          lifecycleStages: S.optional(__S(1024, __c32, 0)),
          hookDetails: S.optional(S.Any),
          timeoutConfiguration: S.optional(__S(1123, __c35, 3)),
        }),
      ).annotate({ identifier: "DeploymentLifecycleHook" });
    case 5:
      return S.Array(__S(1124, __c35, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          stepPercent: S.optional(S.Number),
          stepBakeTimeInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LinearConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          canaryPercent: S.optional(S.Number),
          canaryBakeTimeInMinutes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CanaryConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          enable: S.Boolean,
          healthyPercent: S.optional(S.Number),
          sourceServiceRevisionCleanup: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentEarlySuccessCriteria" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          deploymentCircuitBreaker: S.optional(__S(1121, __c35, 1)),
          maximumPercent: S.optional(S.Number),
          minimumHealthyPercent: S.optional(S.Number),
          alarms: S.optional(__S(1122, __c35, 2)),
          strategy: S.optional(S.String),
          bakeTimeInMinutes: S.optional(S.Number),
          lifecycleHooks: S.optional(__S(1125, __c35, 5)),
          linearConfiguration: S.optional(__S(1126, __c35, 6)),
          canaryConfiguration: S.optional(__S(1127, __c35, 7)),
          earlySuccessCriteria: S.optional(__S(1128, __c35, 8)),
        }),
      ).annotate({ identifier: "DeploymentConfiguration" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ exact: S.String })).annotate({
        identifier: "ServiceConnectTestTrafficHeaderMatchRules",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, value: S.optional(__S(1152, __c36, 0)) }),
      ).annotate({ identifier: "ServiceConnectTestTrafficHeaderRules" });
    case 2:
      return S.suspend(() => S.Struct({ header: __S(1153, __c36, 1) })).annotate({
        identifier: "ServiceConnectTestTrafficRules",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          port: S.Number,
          dnsName: S.optional(S.String),
          testTrafficRules: S.optional(__S(1154, __c36, 2)),
        }),
      ).annotate({ identifier: "ServiceConnectClientAlias" });
    case 4:
      return S.Array(__S(1155, __c36, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          idleTimeoutSeconds: S.optional(S.Number),
          perRequestTimeoutSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TimeoutConfiguration" });
    case 6:
      return S.suspend(() => S.Struct({ awsPcaAuthorityArn: S.optional(S.String) })).annotate({
        identifier: "ServiceConnectTlsCertificateAuthority",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          issuerCertificateAuthority: __S(1158, __c36, 6),
          kmsKey: S.optional(S.String),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceConnectTlsConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          portName: S.String,
          discoveryName: S.optional(S.String),
          clientAliases: S.optional(__S(1156, __c36, 4)),
          ingressPortOverride: S.optional(S.Number),
          timeout: S.optional(__S(1157, __c36, 5)),
          tls: S.optional(__S(1159, __c36, 7)),
        }),
      ).annotate({ identifier: "ServiceConnectService" });
    case 9:
      return S.Array(__S(1160, __c36, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ format: S.String, includeQueryParameters: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceConnectAccessLogConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          namespace: S.optional(S.String),
          services: S.optional(__S(1161, __c36, 9)),
          logConfiguration: S.optional(__S(1057, __c33, 1)),
          accessLogConfiguration: S.optional(__S(1162, __c36, 10)),
        }),
      ).annotate({ identifier: "ServiceConnectConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          encrypted: S.optional(S.Boolean),
          kmsKeyId: S.optional(S.String),
          volumeType: S.optional(S.String),
          sizeInGiB: S.optional(S.Number),
          snapshotId: S.optional(S.String),
          volumeInitializationRate: S.optional(S.Number),
          iops: S.optional(S.Number),
          throughput: S.optional(S.Number),
          tagSpecifications: S.optional(__S(1185, __c37, 1)),
          roleArn: S.String,
          filesystemType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceManagedEBSVolumeConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ name: S.String, managedEBSVolume: S.optional(__S(1164, __c36, 12)) }),
      ).annotate({ identifier: "ServiceVolumeConfiguration" });
    case 14:
      return S.Array(__S(1165, __c36, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          alternateTargetGroupArn: S.optional(S.String),
          productionListenerRule: S.optional(S.String),
          testListenerRule: S.optional(S.String),
        }),
      ).annotate({ identifier: "VpcLatticeAdvancedConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          roleArn: S.String,
          targetGroupArn: S.String,
          portName: S.String,
          advancedConfiguration: S.optional(__S(1167, __c36, 15)),
        }),
      ).annotate({ identifier: "VpcLatticeConfiguration" });
    case 17:
      return S.Array(__S(1168, __c36, 16));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          tags: S.optional(__S(353, __c11, 1)),
          propagateTags: S.optional(S.String),
        }),
      ).annotate({ identifier: "EBSTagSpecification" });
    case 1:
      return S.Array(__S(1184, __c37, 0));
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({
        identifier: "DeploymentController",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ discoveryName: S.optional(S.String), discoveryArn: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceConnectServiceResource" });
    case 2:
      return S.Array(__S(1217, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          taskDefinition: S.optional(S.String),
          desiredCount: S.optional(S.Number),
          pendingCount: S.optional(S.Number),
          runningCount: S.optional(S.Number),
          failedTasks: S.optional(S.Number),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          launchType: S.optional(S.String),
          platformVersion: S.optional(S.String),
          platformFamily: S.optional(S.String),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          rolloutState: S.optional(S.String),
          rolloutStateReason: S.optional(S.String),
          serviceConnectConfiguration: S.optional(__S(1163, __c36, 11)),
          serviceConnectResources: S.optional(__S(1218, __c38, 2)),
          volumeConfigurations: S.optional(__S(1166, __c36, 14)),
          fargateEphemeralStorage: S.optional(__S(901, __c28, 5)),
          vpcLatticeConfigurations: S.optional(__S(1169, __c36, 17)),
        }),
      ).annotate({ identifier: "Deployment" });
    case 4:
      return S.Array(__S(1219, __c38, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceEvent" });
    case 6:
      return S.Array(__S(1221, __c38, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          requestedTaskCount: S.optional(S.Number),
          runningTaskCount: S.optional(S.Number),
          pendingTaskCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServiceCurrentRevisionSummary" });
    case 8:
      return S.Array(__S(1223, __c38, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.optional(S.String),
          serviceName: S.optional(S.String),
          clusterArn: S.optional(S.String),
          loadBalancers: S.optional(__S(898, __c28, 2)),
          serviceRegistries: S.optional(__S(900, __c28, 4)),
          status: S.optional(S.String),
          desiredCount: S.optional(S.Number),
          runningCount: S.optional(S.Number),
          pendingCount: S.optional(S.Number),
          launchType: S.optional(S.String),
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          platformVersion: S.optional(S.String),
          platformFamily: S.optional(S.String),
          taskDefinition: S.optional(S.String),
          deploymentConfiguration: S.optional(__S(1129, __c35, 9)),
          taskSets: S.optional(__S(1248, __c39, 0)),
          deployments: S.optional(__S(1220, __c38, 4)),
          roleArn: S.optional(S.String),
          events: S.optional(__S(1222, __c38, 6)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          currentServiceDeployment: S.optional(S.String),
          currentServiceRevisions: S.optional(__S(1224, __c38, 8)),
          placementConstraints: S.optional(__S(1089, __c34, 1)),
          placementStrategy: S.optional(__S(1281, __c40, 1)),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          healthCheckGracePeriodSeconds: S.optional(S.Number),
          schedulingStrategy: S.optional(S.String),
          deploymentController: S.optional(__S(1216, __c38, 0)),
          tags: S.optional(__S(353, __c11, 1)),
          createdBy: S.optional(S.String),
          enableECSManagedTags: S.optional(S.Boolean),
          propagateTags: S.optional(S.String),
          enableExecuteCommand: S.optional(S.Boolean),
          availabilityZoneRebalancing: S.optional(S.String),
          resourceManagementType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Service" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(961, __c30, 1));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), field: S.optional(S.String) }),
      ).annotate({ identifier: "PlacementStrategy" });
    case 1:
      return S.Array(__S(1280, __c40, 0));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricNames: __S(3872, __c121, 0), resolutionSeconds: S.Number }),
      ).annotate({ identifier: "MetricConfiguration" });
    case 1:
      return S.Array(__S(1312, __c41, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ metricConfigurations: S.optional(__S(1313, __c41, 1)) }),
      ).annotate({ identifier: "MonitoringConfiguration" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          service: S.String,
          cluster: S.String,
          externalId: S.optional(S.String),
          taskDefinition: S.String,
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          loadBalancers: S.optional(__S(898, __c28, 2)),
          serviceRegistries: S.optional(__S(900, __c28, 4)),
          launchType: S.optional(S.String),
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          platformVersion: S.optional(S.String),
          scale: S.optional(__S(960, __c30, 0)),
          clientToken: S.optional(S.String),
          tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTaskSetRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskSet: S.optional(__S(961, __c30, 1)) }).pipe(ns),
      ).annotate({ identifier: "CreateTaskSetResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, principalArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccountSettingRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          value: S.optional(S.String),
          principalArn: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "Setting" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ setting: S.optional(__S(1440, __c45, 0)) }).pipe(ns),
      ).annotate({ identifier: "DeleteAccountSettingResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.optional(S.String), attributes: __S(1537, __c48, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAttributesRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          value: S.optional(S.String),
          targetType: S.optional(S.String),
          targetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Attribute" });
    case 1:
      return S.Array(__S(1536, __c48, 0));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attributes: S.optional(__S(1537, __c48, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteAttributesResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ capacityProvider: S.String, cluster: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCapacityProviderRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteClusterRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ daemonArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDaemonRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          daemonArn: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deploymentArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteDaemonResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ daemonTaskDefinition: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDaemonTaskDefinitionRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ daemonTaskDefinitionArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "DeleteDaemonTaskDefinitionResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteExpressGatewayServiceRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          service: S.String,
          force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteServiceRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskDefinitions: __S(3872, __c121, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTaskDefinitionsRequest" });
    case 1:
      return S.Array(__S(2003, __c62, 19));
    case 2:
      return S.suspend(() =>
        S.Struct({
          taskDefinitions: S.optional(__S(1857, __c58, 1)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteTaskDefinitionsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.String, type: S.String })).annotate({
        identifier: "EnvironmentFile",
      });
    case 1:
      return S.Array(__S(1888, __c59, 0));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ credentialsParameter: S.String })).annotate({
        identifier: "RepositoryCredentials",
      });
    case 1:
      return S.Array(S.Number);
    case 2:
      return S.suspend(() =>
        S.Struct({
          enabled: S.Boolean,
          ignoredExitCodes: S.optional(__S(1921, __c60, 1)),
          restartAttemptPeriod: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ContainerRestartPolicy" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceVolume: S.optional(S.String),
          containerPath: S.optional(S.String),
          readOnly: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MountPoint" });
    case 4:
      return S.Array(__S(1923, __c60, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ add: S.optional(__S(3872, __c121, 0)), drop: S.optional(__S(3872, __c121, 0)) }),
      ).annotate({ identifier: "KernelCapabilities" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          hostPath: S.String,
          containerPath: S.optional(S.String),
          permissions: S.optional(__S(1024, __c32, 0)),
        }),
      ).annotate({ identifier: "Device" });
    case 7:
      return S.Array(__S(1926, __c60, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          containerPath: S.String,
          size: S.Number,
          mountOptions: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "Tmpfs" });
    case 9:
      return S.Array(__S(1928, __c60, 8));
    case 10:
      return S.suspend(() => S.Struct({ containerName: S.String, condition: S.String })).annotate({
        identifier: "ContainerDependency",
      });
    case 11:
      return S.Array(__S(1930, __c60, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ name: S.String, softLimit: S.Number, hardLimit: S.Number }),
      ).annotate({ identifier: "Ulimit" });
    case 13:
      return S.Array(__S(1932, __c60, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          command: __S(3872, __c121, 0),
          interval: S.optional(S.Number),
          timeout: S.optional(S.Number),
          retries: S.optional(S.Number),
          startPeriod: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HealthCheck" });
    case 15:
      return S.suspend(() =>
        S.Struct({ namespace: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "SystemControl" });
    case 16:
      return S.Array(__S(1935, __c60, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ type: S.String, options: S.optional(__S(1056, __c33, 0)) }),
      ).annotate({ identifier: "FirelensConfiguration" });
    case 18:
      return S.suspend(() => S.Struct({ sourcePath: S.optional(S.String) })).annotate({
        identifier: "HostVolumeProperties",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ deviceName: S.String, deviceType: S.String })).annotate({
        identifier: "InferenceAccelerator",
      });
    case 1:
      return S.Array(__S(1952, __c61, 0));
    case 2:
      return S.suspend(() => S.Struct({ sizeInGiB: S.Number })).annotate({
        identifier: "EphemeralStorage",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          containerPort: S.optional(S.Number),
          hostPort: S.optional(S.Number),
          protocol: S.optional(S.String),
          name: S.optional(S.String),
          appProtocol: S.optional(S.String),
          containerPortRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "PortMapping" });
    case 1:
      return S.Array(__S(1984, __c62, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ sourceContainer: S.optional(S.String), readOnly: S.optional(S.Boolean) }),
      ).annotate({ identifier: "VolumeFrom" });
    case 3:
      return S.Array(__S(1986, __c62, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          capabilities: S.optional(__S(1925, __c60, 5)),
          devices: S.optional(__S(1927, __c60, 7)),
          initProcessEnabled: S.optional(S.Boolean),
          sharedMemorySize: S.optional(S.Number),
          tmpfs: S.optional(__S(1929, __c60, 9)),
          maxSwap: S.optional(S.Number),
          swappiness: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LinuxParameters" });
    case 5:
      return S.suspend(() => S.Struct({ hostname: S.String, ipAddress: S.String })).annotate({
        identifier: "HostEntry",
      });
    case 6:
      return S.Array(__S(1989, __c62, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          image: S.optional(S.String),
          repositoryCredentials: S.optional(__S(1920, __c60, 0)),
          cpu: S.optional(S.Number),
          memory: S.optional(S.Number),
          memoryReservation: S.optional(S.Number),
          links: S.optional(__S(3872, __c121, 0)),
          portMappings: S.optional(__S(1985, __c62, 1)),
          essential: S.optional(S.Boolean),
          restartPolicy: S.optional(__S(1922, __c60, 2)),
          entryPoint: S.optional(__S(3872, __c121, 0)),
          command: S.optional(__S(3872, __c121, 0)),
          environment: S.optional(__S(481, __c15, 1)),
          environmentFiles: S.optional(__S(1889, __c59, 1)),
          mountPoints: S.optional(__S(1924, __c60, 4)),
          volumesFrom: S.optional(__S(1987, __c62, 3)),
          linuxParameters: S.optional(__S(1988, __c62, 4)),
          secrets: S.optional(__S(769, __c24, 1)),
          dependsOn: S.optional(__S(1931, __c60, 11)),
          startTimeout: S.optional(S.Number),
          stopTimeout: S.optional(S.Number),
          versionConsistency: S.optional(S.String),
          hostname: S.optional(S.String),
          user: S.optional(S.String),
          workingDirectory: S.optional(S.String),
          disableNetworking: S.optional(S.Boolean),
          privileged: S.optional(S.Boolean),
          readonlyRootFilesystem: S.optional(S.Boolean),
          dnsServers: S.optional(__S(3872, __c121, 0)),
          dnsSearchDomains: S.optional(__S(3872, __c121, 0)),
          extraHosts: S.optional(__S(1990, __c62, 6)),
          dockerSecurityOptions: S.optional(__S(3872, __c121, 0)),
          interactive: S.optional(S.Boolean),
          pseudoTerminal: S.optional(S.Boolean),
          dockerLabels: S.optional(__S(1056, __c33, 0)),
          ulimits: S.optional(__S(1933, __c60, 13)),
          logConfiguration: S.optional(__S(1057, __c33, 1)),
          healthCheck: S.optional(__S(1934, __c60, 14)),
          systemControls: S.optional(__S(1936, __c60, 16)),
          resourceRequirements: S.optional(__S(1889, __c59, 1)),
          firelensConfiguration: S.optional(__S(1937, __c60, 17)),
          credentialSpecs: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "ContainerDefinition" });
    case 8:
      return S.Array(__S(1991, __c62, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          scope: S.optional(S.String),
          autoprovision: S.optional(S.Boolean),
          driver: S.optional(S.String),
          driverOpts: S.optional(__S(1056, __c33, 0)),
          labels: S.optional(__S(1056, __c33, 0)),
        }),
      ).annotate({ identifier: "DockerVolumeConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({ accessPointId: S.optional(S.String), iam: S.optional(S.String) }),
      ).annotate({ identifier: "EFSAuthorizationConfig" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.String,
          rootDirectory: S.optional(S.String),
          transitEncryption: S.optional(S.String),
          transitEncryptionPort: S.optional(S.Number),
          authorizationConfig: S.optional(__S(1994, __c62, 10)),
        }),
      ).annotate({ identifier: "EFSVolumeConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          fileSystemArn: S.String,
          rootDirectory: S.optional(S.String),
          transitEncryptionPort: S.optional(S.Number),
          accessPointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3FilesVolumeConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({ credentialsParameter: S.String, domain: S.String }),
      ).annotate({ identifier: "FSxWindowsFileServerAuthorizationConfig" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          fileSystemId: S.String,
          rootDirectory: S.String,
          authorizationConfig: __S(1997, __c62, 13),
        }),
      ).annotate({ identifier: "FSxWindowsFileServerVolumeConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          host: S.optional(__S(1938, __c60, 18)),
          dockerVolumeConfiguration: S.optional(__S(1993, __c62, 9)),
          efsVolumeConfiguration: S.optional(__S(1995, __c62, 11)),
          s3filesVolumeConfiguration: S.optional(__S(1996, __c62, 12)),
          fsxWindowsFileServerVolumeConfiguration: S.optional(__S(1998, __c62, 14)),
          configuredAtLaunch: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Volume" });
    case 16:
      return S.Array(__S(1999, __c62, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          cpuArchitecture: S.optional(S.String),
          operatingSystemFamily: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuntimePlatform" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          containerName: S.String,
          properties: S.optional(__S(481, __c15, 1)),
        }),
      ).annotate({ identifier: "ProxyConfiguration" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          taskDefinitionArn: S.optional(S.String),
          containerDefinitions: S.optional(__S(1992, __c62, 8)),
          family: S.optional(S.String),
          taskRoleArn: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          networkMode: S.optional(S.String),
          revision: S.optional(S.Number),
          volumes: S.optional(__S(2000, __c62, 16)),
          status: S.optional(S.String),
          requiresAttributes: S.optional(__S(1537, __c48, 1)),
          placementConstraints: S.optional(__S(1089, __c34, 1)),
          compatibilities: S.optional(__S(1024, __c32, 0)),
          runtimePlatform: S.optional(__S(2001, __c62, 17)),
          requiresCompatibilities: S.optional(__S(1024, __c32, 0)),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          inferenceAccelerators: S.optional(__S(1953, __c61, 1)),
          pidMode: S.optional(S.String),
          ipcMode: S.optional(S.String),
          proxyConfiguration: S.optional(__S(2002, __c62, 18)),
          registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deregisteredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deleteRequestedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          registeredBy: S.optional(S.String),
          ephemeralStorage: S.optional(__S(1954, __c61, 2)),
          enableFaultInjection: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TaskDefinition" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          reason: S.optional(S.String),
          detail: S.optional(S.String),
        }),
      ).annotate({ identifier: "Failure" });
    case 1:
      return S.Array(__S(2016, __c63, 0));
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.String,
          service: S.String,
          taskSet: S.String,
          force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTaskSetRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          containerInstance: S.String,
          force: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeregisterContainerInstanceRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentVersion: S.optional(S.String),
          agentHash: S.optional(S.String),
          dockerVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "VersionInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          type: S.optional(S.String),
          doubleValue: S.optional(S.Number),
          longValue: S.optional(S.Number),
          integerValue: S.optional(S.Number),
          stringSetValue: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "Resource" });
    case 2:
      return S.Array(__S(2113, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          lastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastStatusChange: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "InstanceHealthCheckResult" });
    case 4:
      return S.Array(__S(2115, __c66, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ overallStatus: S.optional(S.String), details: S.optional(__S(2116, __c66, 4)) }),
      ).annotate({ identifier: "ContainerInstanceHealthStatus" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          containerInstanceArn: S.optional(S.String),
          ec2InstanceId: S.optional(S.String),
          capacityProviderName: S.optional(S.String),
          version: S.optional(S.Number),
          versionInfo: S.optional(__S(2112, __c66, 0)),
          remainingResources: S.optional(__S(2114, __c66, 2)),
          registeredResources: S.optional(__S(2114, __c66, 2)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          agentConnected: S.optional(S.Boolean),
          runningTasksCount: S.optional(S.Number),
          pendingTasksCount: S.optional(S.Number),
          agentUpdateStatus: S.optional(S.String),
          attributes: S.optional(__S(1537, __c48, 1)),
          registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          attachments: S.optional(__S(545, __c17, 1)),
          tags: S.optional(__S(353, __c11, 1)),
          healthStatus: S.optional(__S(2117, __c66, 5)),
        }),
      ).annotate({ identifier: "ContainerInstance" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ containerInstance: S.optional(__S(2118, __c66, 6)) }).pipe(ns),
      ).annotate({ identifier: "DeregisterContainerInstanceResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskDefinition: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterTaskDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ taskDefinition: S.optional(__S(2003, __c62, 19)) }).pipe(ns),
      ).annotate({ identifier: "DeregisterTaskDefinitionResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capacityProviders: S.optional(__S(3872, __c121, 0)),
          cluster: S.optional(S.String),
          include: S.optional(__S(1024, __c32, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeCapacityProvidersRequest" });
    case 1:
      return S.Array(__S(399, __c12, 15));
    case 2:
      return S.suspend(() =>
        S.Struct({
          capacityProviders: S.optional(__S(2209, __c69, 1)),
          failures: S.optional(__S(2017, __c63, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeCapacityProvidersResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusters: S.optional(__S(3872, __c121, 0)),
          include: S.optional(__S(1024, __c32, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeClustersRequest" });
    case 1:
      return S.Array(__S(583, __c18, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({
          clusters: S.optional(__S(2241, __c70, 1)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeClustersResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          containerInstances: __S(3872, __c121, 0),
          include: S.optional(__S(1024, __c32, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeContainerInstancesRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2118, __c66, 6));
    case 1:
      return S.suspend(() =>
        S.Struct({
          containerInstances: S.optional(__S(2304, __c72, 0)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeContainerInstancesResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ daemonArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDaemonRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          runningCount: S.optional(S.Number),
          withoutDaemonCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DaemonCapacityProvider" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          capacityProviders: S.optional(__S(2338, __c73, 2)),
          totalRunningCount: S.optional(S.Number),
          totalWithoutDaemonCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DaemonRevisionDetail" });
    case 4:
      return S.Array(__S(2339, __c73, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          daemonArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          status: S.optional(S.String),
          currentRevisions: S.optional(__S(2340, __c73, 4)),
          deploymentArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DaemonDetail" });
    case 6:
      return S.suspend(() =>
        S.Struct({ daemon: S.optional(__S(2341, __c73, 5)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDaemonResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ daemonDeploymentArns: __S(3872, __c121, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDaemonDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          runningInstanceCount: S.optional(S.Number),
          withoutDaemonInstanceCount: S.optional(S.Number),
          drainingInstanceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DaemonDeploymentCapacityProvider" });
    case 2:
      return S.Array(__S(2369, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          capacityProviders: S.optional(__S(2370, __c74, 2)),
          totalRunningInstanceCount: S.optional(S.Number),
          totalWithoutDaemonInstanceCount: S.optional(S.Number),
          totalDrainingInstanceCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DaemonDeploymentRevisionDetail" });
    case 4:
      return S.Array(__S(2371, __c74, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          failureCount: S.optional(S.Number),
          status: S.optional(S.String),
          threshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DaemonCircuitBreaker" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          reason: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          rollbackTargetDaemonRevisionArn: S.optional(S.String),
          rollbackCapacityProviders: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "DaemonRollback" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          daemonDeploymentArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          targetDaemonRevision: S.optional(__S(2371, __c74, 3)),
          sourceDaemonRevisions: S.optional(__S(2372, __c74, 4)),
          circuitBreaker: S.optional(__S(2373, __c74, 5)),
          alarms: S.optional(__S(2400, __c75, 0)),
          rollback: S.optional(__S(2374, __c74, 6)),
          deploymentConfiguration: S.optional(__S(705, __c22, 1)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DaemonDeployment" });
    case 8:
      return S.Array(__S(2375, __c74, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          failures: S.optional(__S(2017, __c63, 1)),
          daemonDeployments: S.optional(__S(2376, __c74, 8)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDaemonDeploymentsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          alarmNames: S.optional(__S(3872, __c121, 0)),
          triggeredAlarmNames: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "DaemonDeploymentAlarms" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ daemonRevisionArns: __S(3872, __c121, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDaemonRevisionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          daemonRevisionArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          daemonArn: S.optional(S.String),
          daemonTaskDefinitionArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          containerImages: S.optional(__S(2465, __c77, 1)),
          propagateTags: S.optional(S.String),
          enableECSManagedTags: S.optional(S.Boolean),
          enableExecuteCommand: S.optional(S.Boolean),
          critical: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DaemonRevision" });
    case 2:
      return S.Array(__S(2433, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          daemonRevisions: S.optional(__S(2434, __c76, 2)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDaemonRevisionsResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          containerName: S.optional(S.String),
          imageDigest: S.optional(S.String),
          image: S.optional(S.String),
        }),
      ).annotate({ identifier: "DaemonContainerImage" });
    case 1:
      return S.Array(__S(2464, __c77, 0));
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ daemonTaskDefinition: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDaemonTaskDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          daemonTaskDefinitionArn: S.optional(S.String),
          family: S.optional(S.String),
          revision: S.optional(S.Number),
          taskRoleArn: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          containerDefinitions: S.optional(__S(2530, __c79, 2)),
          volumes: S.optional(__S(2532, __c79, 4)),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          status: S.optional(S.String),
          registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          deleteRequestedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          registeredBy: S.optional(S.String),
          pidMode: S.optional(S.String),
          ipcMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DaemonTaskDefinition" });
    case 2:
      return S.suspend(() =>
        S.Struct({ daemonTaskDefinition: S.optional(__S(2497, __c78, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeDaemonTaskDefinitionResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capabilities: S.optional(__S(1925, __c60, 5)),
          devices: S.optional(__S(1927, __c60, 7)),
          initProcessEnabled: S.optional(S.Boolean),
          tmpfs: S.optional(__S(1929, __c60, 9)),
        }),
      ).annotate({ identifier: "DaemonLinuxParameters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          image: S.String,
          memory: S.optional(S.Number),
          memoryReservation: S.optional(S.Number),
          repositoryCredentials: S.optional(__S(1920, __c60, 0)),
          healthCheck: S.optional(__S(1934, __c60, 14)),
          cpu: S.optional(S.Number),
          essential: S.optional(S.Boolean),
          entryPoint: S.optional(__S(3872, __c121, 0)),
          command: S.optional(__S(3872, __c121, 0)),
          workingDirectory: S.optional(S.String),
          environmentFiles: S.optional(__S(1889, __c59, 1)),
          environment: S.optional(__S(481, __c15, 1)),
          secrets: S.optional(__S(769, __c24, 1)),
          readonlyRootFilesystem: S.optional(S.Boolean),
          mountPoints: S.optional(__S(1924, __c60, 4)),
          logConfiguration: S.optional(__S(1057, __c33, 1)),
          firelensConfiguration: S.optional(__S(1937, __c60, 17)),
          privileged: S.optional(S.Boolean),
          user: S.optional(S.String),
          ulimits: S.optional(__S(1933, __c60, 13)),
          linuxParameters: S.optional(__S(2528, __c79, 0)),
          dependsOn: S.optional(__S(1931, __c60, 11)),
          startTimeout: S.optional(S.Number),
          stopTimeout: S.optional(S.Number),
          systemControls: S.optional(__S(1936, __c60, 16)),
          interactive: S.optional(S.Boolean),
          pseudoTerminal: S.optional(S.Boolean),
          restartPolicy: S.optional(__S(1922, __c60, 2)),
        }),
      ).annotate({ identifier: "DaemonContainerDefinition" });
    case 2:
      return S.Array(__S(2529, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), host: S.optional(__S(1938, __c60, 18)) }),
      ).annotate({ identifier: "DaemonVolume" });
    case 4:
      return S.Array(__S(2531, __c79, 3));
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String, include: S.optional(__S(1024, __c32, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeExpressGatewayServiceRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceDeploymentArns: __S(3872, __c121, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeServiceDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          requestedTaskCount: S.optional(S.Number),
          runningTaskCount: S.optional(S.Number),
          pendingTaskCount: S.optional(S.Number),
          requestedTestTrafficWeight: S.optional(S.Number),
          requestedProductionTrafficWeight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServiceRevisionSummary" });
    case 2:
      return S.Array(__S(2593, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          hookId: S.optional(S.String),
          targetType: S.optional(S.String),
          targetArn: S.optional(S.String),
          status: S.optional(S.String),
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          timeoutAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeploymentLifecycleHookDetail" });
    case 4:
      return S.Array(__S(2595, __c81, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          reason: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          serviceRevisionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Rollback" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          failureCount: S.optional(S.Number),
          threshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServiceDeploymentCircuitBreaker" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          serviceDeploymentArn: S.optional(S.String),
          serviceArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sourceServiceRevisions: S.optional(__S(2594, __c81, 2)),
          targetServiceRevision: S.optional(__S(2593, __c81, 1)),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          lifecycleStage: S.optional(S.String),
          lifecycleHookDetails: S.optional(__S(2596, __c81, 4)),
          deploymentConfiguration: S.optional(__S(1129, __c35, 9)),
          rollback: S.optional(__S(2597, __c81, 5)),
          deploymentCircuitBreaker: S.optional(__S(2598, __c81, 6)),
          alarms: S.optional(__S(2400, __c75, 0)),
        }),
      ).annotate({ identifier: "ServiceDeployment" });
    case 8:
      return S.Array(__S(2599, __c81, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          serviceDeployments: S.optional(__S(2600, __c81, 8)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServiceDeploymentsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceRevisionArns: __S(3872, __c121, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeServiceRevisionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetGroupArn: S.optional(S.String),
          productionListenerRule: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceRevisionLoadBalancer" });
    case 2:
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          loadBalancers: S.optional(__S(2626, __c82, 2)),
          vpcLatticeConfigurations: S.optional(__S(2626, __c82, 2)),
        }),
      ).annotate({ identifier: "ResolvedConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          scheme: S.String,
          subnetIds: S.optional(__S(3872, __c121, 0)),
          securityGroupIds: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "ManagedLoadBalancer" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ManagedSecurityGroup" });
    case 6:
      return S.Array(__S(2629, __c82, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          domainName: S.String,
        }),
      ).annotate({ identifier: "ManagedCertificate" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          healthCheckPath: S.String,
          healthCheckPort: S.Number,
          port: S.Number,
        }),
      ).annotate({ identifier: "ManagedTargetGroup" });
    case 9:
      return S.Array(__S(2632, __c82, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          accessType: S.String,
          endpoint: S.String,
          loadBalancer: S.optional(__S(2628, __c82, 4)),
          loadBalancerSecurityGroups: S.optional(__S(2630, __c82, 6)),
          certificate: S.optional(__S(2631, __c82, 7)),
          listener: S.optional(__S(2629, __c82, 5)),
          rule: S.optional(__S(2629, __c82, 5)),
          targetGroups: S.optional(__S(2633, __c82, 9)),
        }),
      ).annotate({ identifier: "ManagedIngressPath" });
    case 11:
      return S.Array(__S(2634, __c82, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          minCapacity: S.Number,
          maxCapacity: S.Number,
        }),
      ).annotate({ identifier: "ManagedScalableTarget" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          policyType: S.String,
          targetValue: S.Number,
          metric: S.String,
        }),
      ).annotate({ identifier: "ManagedApplicationAutoScalingPolicy" });
    case 14:
      return S.Array(__S(2637, __c82, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          scalableTarget: S.optional(__S(2636, __c82, 12)),
          applicationAutoScalingPolicies: S.optional(__S(2638, __c82, 14)),
        }),
      ).annotate({ identifier: "ManagedAutoScaling" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          logGroupName: S.String,
        }),
      ).annotate({ identifier: "ManagedLogGroup" });
    case 17:
      return S.Array(__S(2640, __c82, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          ingressPaths: S.optional(__S(2635, __c82, 11)),
          autoScaling: S.optional(__S(2639, __c82, 15)),
          metricAlarms: S.optional(__S(2630, __c82, 6)),
          serviceSecurityGroups: S.optional(__S(2630, __c82, 6)),
          logGroups: S.optional(__S(2641, __c82, 17)),
        }),
      ).annotate({ identifier: "ECSManagedResources" });
    case 19:
      return S.suspend(() => S.Struct({ cpuArchitecture: S.optional(S.String) })).annotate({
        identifier: "RuntimePlatformOverride",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({ runtimePlatform: S.optional(__S(2643, __c82, 19)) }),
      ).annotate({ identifier: "ServiceRevisionOverrides" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          serviceRevisionArn: S.optional(S.String),
          serviceArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          taskDefinition: S.optional(S.String),
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          launchType: S.optional(S.String),
          platformVersion: S.optional(S.String),
          platformFamily: S.optional(S.String),
          loadBalancers: S.optional(__S(898, __c28, 2)),
          serviceRegistries: S.optional(__S(900, __c28, 4)),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          containerImages: S.optional(__S(2465, __c77, 1)),
          guardDutyEnabled: S.optional(S.Boolean),
          serviceConnectConfiguration: S.optional(__S(1163, __c36, 11)),
          volumeConfigurations: S.optional(__S(1166, __c36, 14)),
          fargateEphemeralStorage: S.optional(__S(901, __c28, 5)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vpcLatticeConfigurations: S.optional(__S(1169, __c36, 17)),
          resolvedConfiguration: S.optional(__S(2627, __c82, 3)),
          ecsManagedResources: S.optional(__S(2642, __c82, 18)),
          overrides: S.optional(__S(2644, __c82, 20)),
          monitoring: S.optional(__S(1314, __c41, 2)),
        }),
      ).annotate({ identifier: "ServiceRevision" });
    case 22:
      return S.Array(__S(2645, __c82, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          serviceRevisions: S.optional(__S(2646, __c82, 22)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServiceRevisionsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          services: __S(3872, __c121, 0),
          include: S.optional(__S(1024, __c32, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeServicesRequest" });
    case 1:
      return S.Array(__S(1225, __c38, 9));
    case 2:
      return S.suspend(() =>
        S.Struct({
          services: S.optional(__S(2657, __c83, 1)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeServicesResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ taskDefinition: S.String, include: S.optional(__S(1024, __c32, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTaskDefinitionRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskDefinition: S.optional(__S(2003, __c62, 19)),
          tags: S.optional(__S(353, __c11, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeTaskDefinitionResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          tasks: __S(3872, __c121, 0),
          include: S.optional(__S(1024, __c32, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTasksRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2828, __c88, 12));
    case 1:
      return S.suspend(() =>
        S.Struct({
          tasks: S.optional(__S(2784, __c87, 0)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeTasksResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          attachmentId: S.optional(S.String),
          privateIpv4Address: S.optional(S.String),
          ipv6Address: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkInterface" });
    case 1:
      return S.Array(__S(2816, __c88, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          lastStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          name: S.optional(S.String),
          reason: S.optional(S.String),
          lastStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedAgent" });
    case 3:
      return S.Array(__S(2818, __c88, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          containerArn: S.optional(S.String),
          taskArn: S.optional(S.String),
          name: S.optional(S.String),
          image: S.optional(S.String),
          imageDigest: S.optional(S.String),
          runtimeId: S.optional(S.String),
          lastStatus: S.optional(S.String),
          exitCode: S.optional(S.Number),
          reason: S.optional(S.String),
          networkBindings: S.optional(__S(2849, __c89, 1)),
          networkInterfaces: S.optional(__S(2817, __c88, 1)),
          healthStatus: S.optional(S.String),
          managedAgents: S.optional(__S(2819, __c88, 3)),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          memoryReservation: S.optional(S.String),
          gpuIds: S.optional(__S(3872, __c121, 0)),
          neuronDeviceIds: S.optional(__S(3872, __c121, 0)),
        }),
      ).annotate({ identifier: "Container" });
    case 5:
      return S.Array(__S(2820, __c88, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          command: S.optional(__S(3872, __c121, 0)),
          environment: S.optional(__S(481, __c15, 1)),
          environmentFiles: S.optional(__S(1889, __c59, 1)),
          cpu: S.optional(S.Number),
          memory: S.optional(S.Number),
          memoryReservation: S.optional(S.Number),
          resourceRequirements: S.optional(__S(1889, __c59, 1)),
        }),
      ).annotate({ identifier: "ContainerOverride" });
    case 7:
      return S.Array(__S(2822, __c88, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ deviceName: S.optional(S.String), deviceType: S.optional(S.String) }),
      ).annotate({ identifier: "InferenceAcceleratorOverride" });
    case 9:
      return S.Array(__S(2824, __c88, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          containerOverrides: S.optional(__S(2823, __c88, 7)),
          cpu: S.optional(S.String),
          inferenceAcceleratorOverrides: S.optional(__S(2825, __c88, 9)),
          executionRoleArn: S.optional(S.String),
          memory: S.optional(S.String),
          taskRoleArn: S.optional(S.String),
          ephemeralStorage: S.optional(__S(1954, __c61, 2)),
        }),
      ).annotate({ identifier: "TaskOverride" });
    case 11:
      return S.suspend(() =>
        S.Struct({ sizeInGiB: S.optional(S.Number), kmsKeyId: S.optional(S.String) }),
      ).annotate({ identifier: "TaskEphemeralStorage" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          attachments: S.optional(__S(545, __c17, 1)),
          attributes: S.optional(__S(1537, __c48, 1)),
          availabilityZone: S.optional(S.String),
          capacityProviderName: S.optional(S.String),
          clusterArn: S.optional(S.String),
          connectivity: S.optional(S.String),
          connectivityAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          containerInstanceArn: S.optional(S.String),
          containers: S.optional(__S(2821, __c88, 5)),
          cpu: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          desiredStatus: S.optional(S.String),
          enableExecuteCommand: S.optional(S.Boolean),
          executionStoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          group: S.optional(S.String),
          healthStatus: S.optional(S.String),
          inferenceAccelerators: S.optional(__S(1953, __c61, 1)),
          lastStatus: S.optional(S.String),
          launchType: S.optional(S.String),
          memory: S.optional(S.String),
          overrides: S.optional(__S(2826, __c88, 10)),
          platformVersion: S.optional(S.String),
          platformFamily: S.optional(S.String),
          pullStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          pullStoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedBy: S.optional(S.String),
          stopCode: S.optional(S.String),
          stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stoppedReason: S.optional(S.String),
          stoppingAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(353, __c11, 1)),
          taskArn: S.optional(S.String),
          taskDefinitionArn: S.optional(S.String),
          version: S.optional(S.Number),
          ephemeralStorage: S.optional(__S(1954, __c61, 2)),
          fargateEphemeralStorage: S.optional(__S(2827, __c88, 11)),
        }),
      ).annotate({ identifier: "Task" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bindIP: S.optional(S.String),
          containerPort: S.optional(S.Number),
          hostPort: S.optional(S.Number),
          protocol: S.optional(S.String),
          containerPortRange: S.optional(S.String),
          hostPortRange: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkBinding" });
    case 1:
      return S.Array(__S(2848, __c89, 0));
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.String,
          service: S.String,
          taskSets: S.optional(__S(3872, __c121, 0)),
          include: S.optional(__S(1024, __c32, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTaskSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskSets: S.optional(__S(1248, __c39, 0)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeTaskSetsResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ containerInstance: S.optional(S.String), cluster: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DiscoverPollEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          endpoint: S.optional(S.String),
          telemetryEndpoint: S.optional(S.String),
          serviceConnectEndpoint: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DiscoverPollEndpointResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          container: S.optional(S.String),
          command: S.String,
          interactive: S.Boolean,
          task: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteCommandRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.optional(S.String),
          streamUrl: S.optional(S.String),
          tokenValue: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Session" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.optional(S.String),
          containerArn: S.optional(S.String),
          containerName: S.optional(S.String),
          interactive: S.optional(S.Boolean),
          session: S.optional(__S(2945, __c92, 1)),
          taskArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ExecuteCommandResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.String, tasks: S.optional(__S(3872, __c121, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTaskProtectionRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          taskArn: S.optional(S.String),
          protectionEnabled: S.optional(S.Boolean),
          expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ProtectedTask" });
    case 1:
      return S.Array(__S(3008, __c94, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          protectedTasks: S.optional(__S(3009, __c94, 1)),
          failures: S.optional(__S(2017, __c63, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetTaskProtectionResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          value: S.optional(S.String),
          principalArn: S.optional(S.String),
          effectiveSettings: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccountSettingsRequest" });
    case 1:
      return S.Array(__S(1440, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          settings: S.optional(__S(3041, __c95, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccountSettingsResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          targetType: S.String,
          attributeName: S.optional(S.String),
          attributeValue: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAttributesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attributes: S.optional(__S(1537, __c48, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAttributesResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListClustersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clusterArns: S.optional(__S(3872, __c121, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListClustersResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          filter: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          status: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContainerInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          containerInstanceArns: S.optional(__S(3872, __c121, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListContainerInstancesResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          daemonArn: S.String,
          status: S.optional(__S(1024, __c32, 0)),
          createdAt: S.optional(__S(3200, __c100, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDaemonDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          daemonDeploymentArn: S.optional(S.String),
          daemonArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
          targetDaemonRevisionArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DaemonDeploymentSummary" });
    case 2:
      return S.Array(__S(3169, __c99, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          daemonDeployments: S.optional(__S(3170, __c99, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListDaemonDeploymentsResponse" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          before: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          after: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreatedAt" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.optional(S.String),
          capacityProviderArns: S.optional(__S(3872, __c121, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDaemonsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          daemonArn: S.optional(S.String),
          status: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DaemonSummary" });
    case 2:
      return S.Array(__S(3233, __c101, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          daemonSummariesList: S.optional(__S(3234, __c101, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDaemonsResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          familyPrefix: S.optional(S.String),
          family: S.optional(S.String),
          revision: S.optional(S.String),
          status: S.optional(S.String),
          sort: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDaemonTaskDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          registeredAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          registeredBy: S.optional(S.String),
          deleteRequestedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DaemonTaskDefinitionSummary" });
    case 2:
      return S.Array(__S(3265, __c102, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          daemonTaskDefinitions: S.optional(__S(3266, __c102, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDaemonTaskDefinitionsResponse" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          service: S.String,
          cluster: S.optional(S.String),
          status: S.optional(__S(1024, __c32, 0)),
          createdAt: S.optional(__S(3200, __c100, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServiceDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceDeploymentArn: S.optional(S.String),
          serviceArn: S.optional(S.String),
          clusterArn: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          finishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          targetServiceRevisionArn: S.optional(S.String),
          status: S.optional(S.String),
          statusReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceDeploymentBrief" });
    case 2:
      return S.Array(__S(3297, __c103, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          serviceDeployments: S.optional(__S(3298, __c103, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListServiceDeploymentsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          launchType: S.optional(S.String),
          schedulingStrategy: S.optional(S.String),
          resourceManagementType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServicesRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArns: S.optional(__S(3872, __c121, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListServicesResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          namespace: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServicesByNamespaceRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(353, __c11, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          familyPrefix: S.optional(S.String),
          status: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTaskDefinitionFamiliesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          families: S.optional(__S(3872, __c121, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTaskDefinitionFamiliesResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          familyPrefix: S.optional(S.String),
          status: S.optional(S.String),
          sort: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTaskDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskDefinitionArns: S.optional(__S(3872, __c121, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTaskDefinitionsResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          containerInstance: S.optional(S.String),
          family: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          startedBy: S.optional(S.String),
          serviceName: S.optional(S.String),
          desiredStatus: S.optional(S.String),
          launchType: S.optional(S.String),
          daemonName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskArns: S.optional(__S(3872, __c121, 0)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListTasksResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, value: S.String, principalArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAccountSettingRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, value: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAccountSettingDefaultRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.optional(S.String), attributes: __S(1537, __c48, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAttributesRequest" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.String,
          capacityProviders: __S(3872, __c121, 0),
          defaultCapacityProviderStrategy: __S(513, __c16, 1),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutClusterCapacityProvidersRequest" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, type: S.String })).annotate({
        identifier: "PlatformDevice",
      });
    case 1:
      return S.Array(__S(3680, __c115, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          instanceIdentityDocument: S.optional(S.String),
          instanceIdentityDocumentSignature: S.optional(S.String),
          totalResources: S.optional(__S(2114, __c66, 2)),
          versionInfo: S.optional(__S(2112, __c66, 0)),
          containerInstanceArn: S.optional(S.String),
          attributes: S.optional(__S(1537, __c48, 1)),
          platformDevices: S.optional(__S(3681, __c115, 1)),
          tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterContainerInstanceRequest" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          family: S.String,
          taskRoleArn: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          containerDefinitions: __S(2530, __c79, 2),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          volumes: S.optional(__S(2532, __c79, 4)),
          tags: S.optional(__S(353, __c11, 1)),
          pidMode: S.optional(S.String),
          ipcMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterDaemonTaskDefinitionRequest" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          family: S.String,
          taskRoleArn: S.optional(S.String),
          executionRoleArn: S.optional(S.String),
          networkMode: S.optional(S.String),
          containerDefinitions: __S(1992, __c62, 8),
          volumes: S.optional(__S(2000, __c62, 16)),
          placementConstraints: S.optional(__S(1089, __c34, 1)),
          requiresCompatibilities: S.optional(__S(1024, __c32, 0)),
          cpu: S.optional(S.String),
          memory: S.optional(S.String),
          tags: S.optional(__S(353, __c11, 1)),
          pidMode: S.optional(S.String),
          ipcMode: S.optional(S.String),
          proxyConfiguration: S.optional(__S(2002, __c62, 18)),
          inferenceAccelerators: S.optional(__S(1953, __c61, 1)),
          ephemeralStorage: S.optional(__S(1954, __c61, 2)),
          runtimePlatform: S.optional(__S(2001, __c62, 17)),
          enableFaultInjection: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterTaskDefinitionRequest" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capacityProviderStrategy: S.optional(__S(513, __c16, 1)),
          cluster: S.optional(S.String),
          count: S.optional(S.Number),
          enableECSManagedTags: S.optional(S.Boolean),
          enableExecuteCommand: S.optional(S.Boolean),
          group: S.optional(S.String),
          launchType: S.optional(S.String),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          overrides: S.optional(__S(2826, __c88, 10)),
          placementConstraints: S.optional(__S(1089, __c34, 1)),
          placementStrategy: S.optional(__S(1281, __c40, 1)),
          platformVersion: S.optional(S.String),
          propagateTags: S.optional(S.String),
          referenceId: S.optional(S.String),
          startedBy: S.optional(S.String),
          tags: S.optional(__S(353, __c11, 1)),
          taskDefinition: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          volumeConfigurations: S.optional(__S(3811, __c119, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RunTaskRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ deleteOnTermination: S.Boolean })).annotate({
        identifier: "TaskManagedEBSVolumeTerminationPolicy",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          encrypted: S.optional(S.Boolean),
          kmsKeyId: S.optional(S.String),
          volumeType: S.optional(S.String),
          sizeInGiB: S.optional(S.Number),
          snapshotId: S.optional(S.String),
          volumeInitializationRate: S.optional(S.Number),
          iops: S.optional(S.Number),
          throughput: S.optional(S.Number),
          tagSpecifications: S.optional(__S(1185, __c37, 1)),
          roleArn: S.String,
          terminationPolicy: S.optional(__S(3808, __c119, 0)),
          filesystemType: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaskManagedEBSVolumeConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ name: S.String, managedEBSVolume: S.optional(__S(3809, __c119, 1)) }),
      ).annotate({ identifier: "TaskVolumeConfiguration" });
    case 3:
      return S.Array(__S(3810, __c119, 2));
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          containerInstances: __S(3872, __c121, 0),
          enableECSManagedTags: S.optional(S.Boolean),
          enableExecuteCommand: S.optional(S.Boolean),
          group: S.optional(S.String),
          networkConfiguration: S.optional(__S(929, __c29, 1)),
          overrides: S.optional(__S(2826, __c88, 10)),
          propagateTags: S.optional(S.String),
          referenceId: S.optional(S.String),
          startedBy: S.optional(S.String),
          tags: S.optional(__S(353, __c11, 1)),
          taskDefinition: S.String,
          volumeConfigurations: S.optional(__S(3811, __c119, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartTaskRequest" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceDeploymentArn: S.String, stopType: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopServiceDeploymentRequest" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          task: S.String,
          reason: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StopTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ task: S.optional(__S(2828, __c88, 12)) }).pipe(ns),
      ).annotate({ identifier: "StopTaskResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.optional(S.String), attachments: __S(4033, __c126, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SubmitAttachmentStateChangesRequest" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ acknowledgment: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "SubmitAttachmentStateChangesResponse",
      });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ attachmentArn: S.String, status: S.String })).annotate({
        identifier: "AttachmentStateChange",
      });
    case 1:
      return S.Array(__S(4032, __c126, 0));
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          task: S.optional(S.String),
          containerName: S.optional(S.String),
          runtimeId: S.optional(S.String),
          status: S.optional(S.String),
          exitCode: S.optional(S.Number),
          reason: S.optional(S.String),
          networkBindings: S.optional(__S(2849, __c89, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SubmitContainerStateChangeRequest" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          containerName: S.optional(S.String),
          imageDigest: S.optional(S.String),
          runtimeId: S.optional(S.String),
          exitCode: S.optional(S.Number),
          networkBindings: S.optional(__S(2849, __c89, 1)),
          reason: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContainerStateChange" });
    case 1:
      return S.Array(__S(4096, __c128, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          containerName: S.String,
          managedAgentName: S.String,
          status: S.String,
          reason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedAgentStateChange" });
    case 3:
      return S.Array(__S(4098, __c128, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          cluster: S.optional(S.String),
          task: S.optional(S.String),
          status: S.optional(S.String),
          reason: S.optional(S.String),
          containers: S.optional(__S(4097, __c128, 1)),
          attachments: S.optional(__S(4033, __c126, 1)),
          managedAgents: S.optional(__S(4099, __c128, 3)),
          pullStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          pullStoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          executionStoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SubmitTaskStateChangeRequest" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(353, __c11, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(3872, __c121, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          managedScaling: S.optional(__S(384, __c12, 0)),
          managedTerminationProtection: S.optional(S.String),
          managedDraining: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoScalingGroupProviderUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ec2InstanceProfileArn: S.optional(S.String),
          networkConfiguration: S.optional(__S(386, __c12, 2)),
          storageConfiguration: S.optional(__S(387, __c12, 3)),
          instanceMetadataTagsPropagation: S.optional(S.Boolean),
          localStorageConfiguration: S.optional(__S(388, __c12, 4)),
          monitoring: S.optional(S.String),
          instanceRequirements: S.optional(__S(393, __c12, 9)),
          capacityReservations: S.optional(__S(394, __c12, 10)),
        }),
      ).annotate({ identifier: "InstanceLaunchTemplateUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          infrastructureRoleArn: S.String,
          instanceLaunchTemplate: __S(4225, __c132, 1),
          propagateTags: S.optional(S.String),
          infrastructureOptimization: S.optional(__S(396, __c12, 12)),
          autoRepairConfiguration: S.optional(__S(397, __c12, 13)),
        }),
      ).annotate({ identifier: "UpdateManagedInstancesProviderConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          cluster: S.optional(S.String),
          autoScalingGroupProvider: S.optional(__S(4224, __c132, 0)),
          managedInstancesProvider: S.optional(__S(4226, __c132, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCapacityProviderRequest" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cluster: S.String,
          settings: S.optional(__S(577, __c18, 1)),
          configuration: S.optional(__S(581, __c18, 5)),
          serviceConnectDefaults: S.optional(__S(640, __c20, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateClusterRequest" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ cluster: S.String, settings: __S(577, __c18, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateClusterSettingsRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
