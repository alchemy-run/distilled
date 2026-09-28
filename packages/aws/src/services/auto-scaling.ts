import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Auto Scaling",
  target: "AutoScaling_2011_01_01",
  version: "2011-01-01",
  sigv4: "autoscaling",
  protocol: awsQueryProtocol,
  xmlns: "http://autoscaling.amazonaws.com/doc/2011-01-01/",
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
                `https://autoscaling-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://autoscaling.${Region}.amazonaws.com`);
              }
              return e(
                `https://autoscaling-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://autoscaling.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://autoscaling.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ActiveInstanceRefreshNotFoundFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ActiveInstanceRefreshNotFoundFault",
    ["BadRequestError"],
    { code: "ActiveInstanceRefreshNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class AlreadyExistsFault
  extends /*@__PURE__*/ TE.TaggedError(
    "AlreadyExistsFault",
    ["BadRequestError", "AlreadyExistsError"],
    { code: "AlreadyExists", status: 400 },
  )<{ readonly message?: string }> {}
export class AutoScalingGroupNotFound
  extends /*@__PURE__*/ TE.TaggedError("AutoScalingGroupNotFound", [], {
    synthetic: { from: "ValidationError", message: { includes: "not found" } },
  })<{ readonly message?: string }> {}
export class IdempotentCallInProgressFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotentCallInProgressFault",
    ["ServerError"],
    { code: "IdempotentCallInProgress", status: 500 },
  )<{ readonly message?: string }> {}
export class IdempotentParameterMismatchError
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotentParameterMismatchError",
    ["BadRequestError"],
    { code: "IdempotentParameterMismatch", status: 400 },
  )<{ readonly message?: string }> {}
export class InstanceRefreshInProgressFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InstanceRefreshInProgressFault",
    ["BadRequestError"],
    { code: "InstanceRefreshInProgress", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextToken
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextToken",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class IrreversibleInstanceRefreshFault
  extends /*@__PURE__*/ TE.TaggedError(
    "IrreversibleInstanceRefreshFault",
    ["BadRequestError"],
    { code: "IrreversibleInstanceRefresh", status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededFault",
    ["BadRequestError"],
    { code: "LimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceContentionFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceContentionFault",
    ["ServerError"],
    { code: "ResourceContention", status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceInUseFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseFault",
    ["BadRequestError"],
    { code: "ResourceInUse", status: 400 },
  )<{ readonly message?: string }> {}
export class ScalingActivityInProgressFault
  extends /*@__PURE__*/ TE.TaggedError(
    "ScalingActivityInProgressFault",
    ["BadRequestError"],
    { code: "ScalingActivityInProgress", status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceLinkedRoleFailure
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceLinkedRoleFailure",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export type XmlStringMaxLen19 = string;
export type InstanceIds = string[];
export type XmlStringMaxLen255 = string;
export interface AttachInstancesQuery {
  InstanceIds?: string[];
  AutoScalingGroupName?: string;
}
export interface AttachInstancesResponse {}
export type LoadBalancerNames = string[];
export interface AttachLoadBalancersType {
  AutoScalingGroupName?: string;
  LoadBalancerNames?: string[];
}
export interface AttachLoadBalancersResultType {}
export type XmlStringMaxLen511 = string;
export type TargetGroupARNs = string[];
export interface AttachLoadBalancerTargetGroupsType {
  AutoScalingGroupName?: string;
  TargetGroupARNs?: string[];
}
export interface AttachLoadBalancerTargetGroupsResultType {}
export interface TrafficSourceIdentifier {
  Identifier?: string;
  Type?: string;
}
export type TrafficSources = TrafficSourceIdentifier[];
export type SkipZonalShiftValidation = boolean;
export interface AttachTrafficSourcesType {
  AutoScalingGroupName?: string;
  TrafficSources?: TrafficSourceIdentifier[];
  SkipZonalShiftValidation?: boolean;
}
export interface AttachTrafficSourcesResultType {}
export type ScheduledActionNames = string[];
export interface BatchDeleteScheduledActionType {
  AutoScalingGroupName?: string;
  ScheduledActionNames?: string[];
}
export type XmlStringMaxLen64 = string;
export type XmlString = string;
export interface FailedScheduledUpdateGroupActionRequest {
  ScheduledActionName?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type FailedScheduledUpdateGroupActionRequests =
  FailedScheduledUpdateGroupActionRequest[];
export interface BatchDeleteScheduledActionAnswer {
  FailedScheduledActions?: (FailedScheduledUpdateGroupActionRequest & {
    ScheduledActionName: XmlStringMaxLen255;
  })[];
}
export type AutoScalingGroupMinSize = number;
export type AutoScalingGroupMaxSize = number;
export type AutoScalingGroupDesiredCapacity = number;
export interface ScheduledUpdateGroupActionRequest {
  ScheduledActionName?: string;
  StartTime?: Date;
  EndTime?: Date;
  Recurrence?: string;
  MinSize?: number;
  MaxSize?: number;
  DesiredCapacity?: number;
  TimeZone?: string;
}
export type ScheduledUpdateGroupActionRequests =
  ScheduledUpdateGroupActionRequest[];
export interface BatchPutScheduledUpdateGroupActionType {
  AutoScalingGroupName?: string;
  ScheduledUpdateGroupActions?: ScheduledUpdateGroupActionRequest[];
}
export interface BatchPutScheduledUpdateGroupActionAnswer {
  FailedScheduledUpdateGroupActions?: (FailedScheduledUpdateGroupActionRequest & {
    ScheduledActionName: XmlStringMaxLen255;
  })[];
}
export interface CancelInstanceRefreshType {
  AutoScalingGroupName?: string;
  WaitForTransitioningInstances?: boolean;
}
export interface CancelInstanceRefreshAnswer {
  InstanceRefreshId?: string;
}
export type AsciiStringMaxLen255 = string;
export type ResourceName = string;
export type LifecycleActionToken = string;
export type LifecycleActionResult = string;
export interface CompleteLifecycleActionType {
  LifecycleHookName?: string;
  AutoScalingGroupName?: string;
  LifecycleActionToken?: string;
  LifecycleActionResult?: string;
  InstanceId?: string;
}
export interface CompleteLifecycleActionAnswer {}
export type LaunchTemplateName = string;
export interface LaunchTemplateSpecification {
  LaunchTemplateId?: string;
  LaunchTemplateName?: string;
  Version?: string;
}
export type XmlStringMaxLen32 = string;
export type NullablePositiveInteger = number;
export interface VCpuCountRequest {
  Min?: number;
  Max?: number;
}
export interface MemoryMiBRequest {
  Min?: number;
  Max?: number;
}
export type CpuManufacturer =
  | "intel"
  | "amd"
  | "amazon-web-services"
  | "apple"
  | (string & {});
export type CpuManufacturers = CpuManufacturer[];
export type NullablePositiveDouble = number;
export interface MemoryGiBPerVCpuRequest {
  Min?: number;
  Max?: number;
}
export type ExcludedInstance = string;
export type ExcludedInstanceTypes = string[];
export type InstanceGeneration = "current" | "previous" | (string & {});
export type InstanceGenerations = InstanceGeneration[];
export type BareMetal = "included" | "excluded" | "required" | (string & {});
export type BurstablePerformance =
  | "included"
  | "excluded"
  | "required"
  | (string & {});
export interface NetworkInterfaceCountRequest {
  Min?: number;
  Max?: number;
}
export type LocalStorage = "included" | "excluded" | "required" | (string & {});
export type LocalStorageType = "hdd" | "ssd" | (string & {});
export type LocalStorageTypes = LocalStorageType[];
export interface TotalLocalStorageGBRequest {
  Min?: number;
  Max?: number;
}
export interface BaselineEbsBandwidthMbpsRequest {
  Min?: number;
  Max?: number;
}
export type AcceleratorType = "gpu" | "fpga" | "inference" | (string & {});
export type AcceleratorTypes = AcceleratorType[];
export interface AcceleratorCountRequest {
  Min?: number;
  Max?: number;
}
export type AcceleratorManufacturer =
  | "nvidia"
  | "amd"
  | "amazon-web-services"
  | "xilinx"
  | (string & {});
export type AcceleratorManufacturers = AcceleratorManufacturer[];
export type AcceleratorName =
  | "a100"
  | "v100"
  | "k80"
  | "t4"
  | "m60"
  | "radeon-pro-v520"
  | "vu9p"
  | (string & {});
export type AcceleratorNames = AcceleratorName[];
export interface AcceleratorTotalMemoryMiBRequest {
  Min?: number;
  Max?: number;
}
export interface NetworkBandwidthGbpsRequest {
  Min?: number;
  Max?: number;
}
export type AllowedInstanceType = string;
export type AllowedInstanceTypes = string[];
export interface PerformanceFactorReferenceRequest {
  InstanceFamily?: string;
}
export type PerformanceFactorReferenceSetRequest =
  PerformanceFactorReferenceRequest[];
export interface CpuPerformanceFactorRequest {
  References?: PerformanceFactorReferenceRequest[];
}
export interface BaselinePerformanceFactorsRequest {
  Cpu?: CpuPerformanceFactorRequest;
}
export interface InstanceRequirements {
  VCpuCount?: VCpuCountRequest;
  MemoryMiB?: MemoryMiBRequest;
  CpuManufacturers?: CpuManufacturer[];
  MemoryGiBPerVCpu?: MemoryGiBPerVCpuRequest;
  ExcludedInstanceTypes?: string[];
  InstanceGenerations?: InstanceGeneration[];
  SpotMaxPricePercentageOverLowestPrice?: number;
  MaxSpotPriceAsPercentageOfOptimalOnDemandPrice?: number;
  OnDemandMaxPricePercentageOverLowestPrice?: number;
  BareMetal?: BareMetal;
  BurstablePerformance?: BurstablePerformance;
  RequireHibernateSupport?: boolean;
  NetworkInterfaceCount?: NetworkInterfaceCountRequest;
  LocalStorage?: LocalStorage;
  LocalStorageTypes?: LocalStorageType[];
  TotalLocalStorageGB?: TotalLocalStorageGBRequest;
  BaselineEbsBandwidthMbps?: BaselineEbsBandwidthMbpsRequest;
  AcceleratorTypes?: AcceleratorType[];
  AcceleratorCount?: AcceleratorCountRequest;
  AcceleratorManufacturers?: AcceleratorManufacturer[];
  AcceleratorNames?: AcceleratorName[];
  AcceleratorTotalMemoryMiB?: AcceleratorTotalMemoryMiBRequest;
  NetworkBandwidthGbps?: NetworkBandwidthGbpsRequest;
  AllowedInstanceTypes?: string[];
  BaselinePerformanceFactors?: BaselinePerformanceFactorsRequest;
}
export type ImageId = string;
export interface LaunchTemplateOverrides {
  InstanceType?: string;
  WeightedCapacity?: string;
  LaunchTemplateSpecification?: LaunchTemplateSpecification;
  InstanceRequirements?: InstanceRequirements;
  ImageId?: string;
}
export type Overrides = LaunchTemplateOverrides[];
export interface LaunchTemplate {
  LaunchTemplateSpecification?: LaunchTemplateSpecification;
  Overrides?: LaunchTemplateOverrides[];
}
export type OnDemandBaseCapacity = number;
export type OnDemandPercentageAboveBaseCapacity = number;
export type SpotInstancePools = number;
export type MixedInstanceSpotPrice = string;
export type TargetCapacityType =
  | "on-demand-capacity-reservation"
  | "capacity-block"
  | "interruptible-capacity-reservation"
  | "on-demand"
  | (string & {});
export type TargetCapacityTypes = TargetCapacityType[];
export interface DistributionSegment {
  TargetCapacityTypes?: TargetCapacityType[];
}
export type DistributionSegments = DistributionSegment[];
export interface InstancesDistribution {
  OnDemandAllocationStrategy?: string;
  OnDemandBaseCapacity?: number;
  OnDemandPercentageAboveBaseCapacity?: number;
  SpotAllocationStrategy?: string;
  SpotInstancePools?: number;
  SpotMaxPrice?: string;
  DistributionSegments?: DistributionSegment[];
}
export interface MixedInstancesPolicy {
  LaunchTemplate?: LaunchTemplate;
  InstancesDistribution?: InstancesDistribution;
}
export type Cooldown = number;
export type AvailabilityZones = string[];
export type AvailabilityZoneIds = string[];
export type HealthCheckGracePeriod = number;
export type XmlStringMaxLen5000 = string;
export type XmlStringMaxLen1600 = string;
export type TerminationPolicies = string[];
export type InstanceProtected = boolean;
export type CapacityRebalanceEnabled = boolean;
export type LifecycleTransition = string;
export type AnyPrintableAsciiStringMaxLen4000 = string;
export type HeartbeatTimeout = number;
export type NotificationTargetResourceName = string;
export interface LifecycleHookSpecification {
  LifecycleHookName?: string;
  LifecycleTransition?: string;
  NotificationMetadata?: string;
  HeartbeatTimeout?: number;
  DefaultResult?: string;
  NotificationTargetARN?: string;
  RoleARN?: string;
}
export type LifecycleHookSpecifications = LifecycleHookSpecification[];
export type DeletionProtection =
  | "none"
  | "prevent-force-deletion"
  | "prevent-all-deletion"
  | (string & {});
export type TagKey = string;
export type TagValue = string;
export type PropagateAtLaunch = boolean;
export interface Tag {
  ResourceId?: string;
  ResourceType?: string;
  Key?: string;
  Value?: string;
  PropagateAtLaunch?: boolean;
}
export type Tags = Tag[];
export type MaxInstanceLifetime = number;
export type Context = string;
export type DefaultInstanceWarmup = number;
export type IntPercentResettable = number;
export type IntPercent100To200Resettable = number;
export interface InstanceMaintenancePolicy {
  MinHealthyPercentage?: number;
  MaxHealthyPercentage?: number;
}
export type CapacityDistributionStrategy =
  | "balanced-only"
  | "balanced-best-effort"
  | "reservations-then-balanced"
  | (string & {});
export interface AvailabilityZoneDistribution {
  CapacityDistributionStrategy?: CapacityDistributionStrategy;
}
export type ZonalShiftEnabled = boolean;
export type ImpairedZoneHealthCheckBehavior =
  | "ReplaceUnhealthy"
  | "IgnoreUnhealthy"
  | (string & {});
export interface AvailabilityZoneImpairmentPolicy {
  ZonalShiftEnabled?: boolean;
  ImpairedZoneHealthCheckBehavior?: ImpairedZoneHealthCheckBehavior;
}
export type CapacityReservationPreference =
  | "capacity-reservations-only"
  | "capacity-reservations-first"
  | "none"
  | "default"
  | (string & {});
export type CapacityReservationIds = string[];
export type CapacityReservationResourceGroupArns = string[];
export interface CapacityReservationTarget {
  CapacityReservationIds?: string[];
  CapacityReservationResourceGroupArns?: string[];
}
export interface CapacityReservationSpecification {
  CapacityReservationPreference?: CapacityReservationPreference;
  CapacityReservationTarget?: CapacityReservationTarget;
}
export type RetentionAction = "retain" | "terminate" | (string & {});
export interface RetentionTriggers {
  TerminateHookAbandon?: RetentionAction;
}
export interface InstanceLifecyclePolicy {
  RetentionTriggers?: RetentionTriggers;
}
export type ManagerIdentifier = string;
export interface Operator {
  Principal?: string;
}
export interface CreateAutoScalingGroupType {
  AutoScalingGroupName?: string;
  LaunchConfigurationName?: string;
  LaunchTemplate?: LaunchTemplateSpecification;
  MixedInstancesPolicy?: MixedInstancesPolicy;
  InstanceId?: string;
  MinSize?: number;
  MaxSize?: number;
  DesiredCapacity?: number;
  DefaultCooldown?: number;
  AvailabilityZones?: string[];
  AvailabilityZoneIds?: string[];
  LoadBalancerNames?: string[];
  TargetGroupARNs?: string[];
  HealthCheckType?: string;
  HealthCheckGracePeriod?: number;
  PlacementGroup?: string;
  VPCZoneIdentifier?: string;
  TerminationPolicies?: string[];
  NewInstancesProtectedFromScaleIn?: boolean;
  CapacityRebalance?: boolean;
  LifecycleHookSpecificationList?: LifecycleHookSpecification[];
  DeletionProtection?: DeletionProtection;
  Tags?: Tag[];
  ServiceLinkedRoleARN?: string;
  MaxInstanceLifetime?: number;
  Context?: string;
  DesiredCapacityType?: string;
  DefaultInstanceWarmup?: number;
  TrafficSources?: TrafficSourceIdentifier[];
  InstanceMaintenancePolicy?: InstanceMaintenancePolicy;
  AvailabilityZoneDistribution?: AvailabilityZoneDistribution;
  AvailabilityZoneImpairmentPolicy?: AvailabilityZoneImpairmentPolicy;
  SkipZonalShiftValidation?: boolean;
  CapacityReservationSpecification?: CapacityReservationSpecification;
  InstanceLifecyclePolicy?: InstanceLifecyclePolicy;
  Operator?: Operator;
}
export interface CreateAutoScalingGroupResponse {}
export type SecurityGroups = string[];
export type ClassicLinkVPCSecurityGroups = string[];
export type XmlStringUserData = string;
export type BlockDeviceEbsVolumeSize = number;
export type BlockDeviceEbsVolumeType = string;
export type BlockDeviceEbsDeleteOnTermination = boolean;
export type BlockDeviceEbsIops = number;
export type BlockDeviceEbsEncrypted = boolean;
export type BlockDeviceEbsThroughput = number;
export interface Ebs {
  SnapshotId?: string;
  VolumeSize?: number;
  VolumeType?: string;
  DeleteOnTermination?: boolean;
  Iops?: number;
  Encrypted?: boolean;
  Throughput?: number;
}
export type NoDevice = boolean;
export interface BlockDeviceMapping {
  VirtualName?: string;
  DeviceName?: string;
  Ebs?: Ebs;
  NoDevice?: boolean;
}
export type BlockDeviceMappings = BlockDeviceMapping[];
export type MonitoringEnabled = boolean;
export interface InstanceMonitoring {
  Enabled?: boolean;
}
export type SpotPrice = string;
export type EbsOptimized = boolean;
export type AssociatePublicIpAddress = boolean;
export type InstanceMetadataHttpTokensState =
  | "optional"
  | "required"
  | (string & {});
export type InstanceMetadataHttpPutResponseHopLimit = number;
export type InstanceMetadataEndpointState =
  | "disabled"
  | "enabled"
  | (string & {});
export interface InstanceMetadataOptions {
  HttpTokens?: InstanceMetadataHttpTokensState;
  HttpPutResponseHopLimit?: number;
  HttpEndpoint?: InstanceMetadataEndpointState;
}
export interface CreateLaunchConfigurationType {
  LaunchConfigurationName?: string;
  ImageId?: string;
  KeyName?: string;
  SecurityGroups?: string[];
  ClassicLinkVPCId?: string;
  ClassicLinkVPCSecurityGroups?: string[];
  UserData?: string;
  InstanceId?: string;
  InstanceType?: string;
  KernelId?: string;
  RamdiskId?: string;
  BlockDeviceMappings?: BlockDeviceMapping[];
  InstanceMonitoring?: InstanceMonitoring;
  SpotPrice?: string;
  IamInstanceProfile?: string;
  EbsOptimized?: boolean;
  AssociatePublicIpAddress?: boolean;
  PlacementTenancy?: string;
  MetadataOptions?: InstanceMetadataOptions;
}
export interface CreateLaunchConfigurationResponse {}
export interface CreateOrUpdateTagsType {
  Tags?: Tag[];
}
export interface CreateOrUpdateTagsResponse {}
export type ForceDelete = boolean;
export interface DeleteAutoScalingGroupType {
  AutoScalingGroupName?: string;
  ForceDelete?: boolean;
}
export interface DeleteAutoScalingGroupResponse {}
export interface LaunchConfigurationNameType {
  LaunchConfigurationName?: string;
}
export interface DeleteLaunchConfigurationResponse {}
export interface DeleteLifecycleHookType {
  LifecycleHookName?: string;
  AutoScalingGroupName?: string;
}
export interface DeleteLifecycleHookAnswer {}
export interface DeleteNotificationConfigurationType {
  AutoScalingGroupName?: string;
  TopicARN?: string;
}
export interface DeleteNotificationConfigurationResponse {}
export interface DeletePolicyType {
  AutoScalingGroupName?: string;
  PolicyName?: string;
}
export interface DeletePolicyResponse {}
export interface DeleteScheduledActionType {
  AutoScalingGroupName?: string;
  ScheduledActionName?: string;
}
export interface DeleteScheduledActionResponse {}
export interface DeleteTagsType {
  Tags?: Tag[];
}
export interface DeleteTagsResponse {}
export interface DeleteWarmPoolType {
  AutoScalingGroupName?: string;
  ForceDelete?: boolean;
}
export interface DeleteWarmPoolAnswer {}
export interface DescribeAccountLimitsRequest {}
export type MaxNumberOfAutoScalingGroups = number;
export type MaxNumberOfLaunchConfigurations = number;
export type NumberOfAutoScalingGroups = number;
export type NumberOfLaunchConfigurations = number;
export interface DescribeAccountLimitsAnswer {
  MaxNumberOfAutoScalingGroups?: number;
  MaxNumberOfLaunchConfigurations?: number;
  NumberOfAutoScalingGroups?: number;
  NumberOfLaunchConfigurations?: number;
}
export interface DescribeAdjustmentTypesRequest {}
export interface AdjustmentType {
  AdjustmentType?: string;
}
export type AdjustmentTypes = AdjustmentType[];
export interface DescribeAdjustmentTypesAnswer {
  AdjustmentTypes?: AdjustmentType[];
}
export type AutoScalingGroupNames = string[];
export type IncludeInstances = boolean;
export type MaxRecords = number;
export type Values = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type Filters = Filter[];
export interface AutoScalingGroupNamesType {
  AutoScalingGroupNames?: string[];
  IncludeInstances?: boolean;
  NextToken?: string;
  MaxRecords?: number;
  Filters?: Filter[];
}
export type AutoScalingGroupPredictedCapacity = number;
export type LifecycleState =
  | "Pending"
  | "Pending:Wait"
  | "Pending:Proceed"
  | "Quarantined"
  | "InService"
  | "Terminating"
  | "Terminating:Wait"
  | "Terminating:Proceed"
  | "Terminating:Retained"
  | "Terminated"
  | "Detaching"
  | "Detached"
  | "EnteringStandby"
  | "Standby"
  | "ReplacingRootVolume"
  | "ReplacingRootVolume:Wait"
  | "ReplacingRootVolume:Proceed"
  | "RootVolumeReplaced"
  | "Warmed:Pending"
  | "Warmed:Pending:Wait"
  | "Warmed:Pending:Proceed"
  | "Warmed:Pending:Retained"
  | "Warmed:Terminating"
  | "Warmed:Terminating:Wait"
  | "Warmed:Terminating:Proceed"
  | "Warmed:Terminating:Retained"
  | "Warmed:Terminated"
  | "Warmed:Stopped"
  | "Warmed:Running"
  | "Warmed:Hibernated"
  | (string & {});
export interface Instance {
  InstanceId?: string;
  InstanceType?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  LifecycleState?: LifecycleState;
  HealthStatus?: string;
  LaunchConfigurationName?: string;
  LaunchTemplate?: LaunchTemplateSpecification;
  ImageId?: string;
  ProtectedFromScaleIn?: boolean;
  WeightedCapacity?: string;
}
export type Instances = Instance[];
export interface SuspendedProcess {
  ProcessName?: string;
  SuspensionReason?: string;
}
export type SuspendedProcesses = SuspendedProcess[];
export interface EnabledMetric {
  Metric?: string;
  Granularity?: string;
}
export type EnabledMetrics = EnabledMetric[];
export interface TagDescription {
  ResourceId?: string;
  ResourceType?: string;
  Key?: string;
  Value?: string;
  PropagateAtLaunch?: boolean;
}
export type TagDescriptionList = TagDescription[];
export type MaxGroupPreparedCapacity = number;
export type WarmPoolMinSize = number;
export type WarmPoolState =
  | "Stopped"
  | "Running"
  | "Hibernated"
  | (string & {});
export type WarmPoolStatus = "PendingDelete" | (string & {});
export type ReuseOnScaleIn = boolean;
export interface InstanceReusePolicy {
  ReuseOnScaleIn?: boolean;
}
export interface WarmPoolConfiguration {
  MaxGroupPreparedCapacity?: number;
  MinSize?: number;
  PoolState?: WarmPoolState;
  Status?: WarmPoolStatus;
  InstanceReusePolicy?: InstanceReusePolicy;
}
export type WarmPoolSize = number;
export interface AutoScalingGroup {
  AutoScalingGroupName?: string;
  AutoScalingGroupARN?: string;
  LaunchConfigurationName?: string;
  LaunchTemplate?: LaunchTemplateSpecification;
  MixedInstancesPolicy?: MixedInstancesPolicy;
  MinSize?: number;
  MaxSize?: number;
  DesiredCapacity?: number;
  PredictedCapacity?: number;
  DefaultCooldown?: number;
  AvailabilityZones?: string[];
  AvailabilityZoneIds?: string[];
  LoadBalancerNames?: string[];
  TargetGroupARNs?: string[];
  HealthCheckType?: string;
  HealthCheckGracePeriod?: number;
  Instances?: Instance[];
  CreatedTime?: Date;
  SuspendedProcesses?: SuspendedProcess[];
  PlacementGroup?: string;
  VPCZoneIdentifier?: string;
  EnabledMetrics?: EnabledMetric[];
  Status?: string;
  Tags?: TagDescription[];
  TerminationPolicies?: string[];
  NewInstancesProtectedFromScaleIn?: boolean;
  ServiceLinkedRoleARN?: string;
  MaxInstanceLifetime?: number;
  CapacityRebalance?: boolean;
  WarmPoolConfiguration?: WarmPoolConfiguration;
  WarmPoolSize?: number;
  Context?: string;
  DesiredCapacityType?: string;
  DefaultInstanceWarmup?: number;
  TrafficSources?: TrafficSourceIdentifier[];
  InstanceMaintenancePolicy?: InstanceMaintenancePolicy;
  DeletionProtection?: DeletionProtection;
  AvailabilityZoneDistribution?: AvailabilityZoneDistribution;
  AvailabilityZoneImpairmentPolicy?: AvailabilityZoneImpairmentPolicy;
  CapacityReservationSpecification?: CapacityReservationSpecification;
  InstanceLifecyclePolicy?: InstanceLifecyclePolicy;
  Operator?: Operator;
}
export type AutoScalingGroups = AutoScalingGroup[];
export interface AutoScalingGroupsType {
  AutoScalingGroups: (AutoScalingGroup & {
    AutoScalingGroupName: XmlStringMaxLen255;
    MinSize: AutoScalingGroupMinSize;
    MaxSize: AutoScalingGroupMaxSize;
    DesiredCapacity: AutoScalingGroupDesiredCapacity;
    DefaultCooldown: Cooldown;
    AvailabilityZones: AvailabilityZones;
    HealthCheckType: XmlStringMaxLen32;
    CreatedTime: Date;
    MixedInstancesPolicy: MixedInstancesPolicy & {
      LaunchTemplate: LaunchTemplate & {
        Overrides: (LaunchTemplateOverrides & {
          InstanceRequirements: InstanceRequirements & {
            VCpuCount: VCpuCountRequest & { Min: NullablePositiveInteger };
            MemoryMiB: MemoryMiBRequest & { Min: NullablePositiveInteger };
          };
        })[];
      };
    };
    Instances: (Instance & {
      InstanceId: XmlStringMaxLen19;
      AvailabilityZone: XmlStringMaxLen255;
      LifecycleState: LifecycleState;
      HealthStatus: XmlStringMaxLen32;
      ProtectedFromScaleIn: InstanceProtected;
    })[];
    TrafficSources: (TrafficSourceIdentifier & {
      Identifier: XmlStringMaxLen511;
    })[];
    Operator: Operator & { Principal: ManagerIdentifier };
  })[];
  NextToken?: string;
}
export interface DescribeAutoScalingInstancesType {
  InstanceIds?: string[];
  MaxRecords?: number;
  NextToken?: string;
}
export interface AutoScalingInstanceDetails {
  InstanceId?: string;
  InstanceType?: string;
  AutoScalingGroupName?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  LifecycleState?: string;
  HealthStatus?: string;
  LaunchConfigurationName?: string;
  LaunchTemplate?: LaunchTemplateSpecification;
  ImageId?: string;
  ProtectedFromScaleIn?: boolean;
  WeightedCapacity?: string;
}
export type AutoScalingInstances = AutoScalingInstanceDetails[];
export interface AutoScalingInstancesType {
  AutoScalingInstances?: (AutoScalingInstanceDetails & {
    InstanceId: XmlStringMaxLen19;
    AutoScalingGroupName: XmlStringMaxLen255;
    AvailabilityZone: XmlStringMaxLen255;
    LifecycleState: XmlStringMaxLen32;
    HealthStatus: XmlStringMaxLen32;
    ProtectedFromScaleIn: InstanceProtected;
  })[];
  NextToken?: string;
}
export interface DescribeAutoScalingNotificationTypesRequest {}
export type AutoScalingNotificationTypes = string[];
export interface DescribeAutoScalingNotificationTypesAnswer {
  AutoScalingNotificationTypes?: string[];
}
export type InstanceRefreshIds = string[];
export interface DescribeInstanceRefreshesType {
  AutoScalingGroupName?: string;
  InstanceRefreshIds?: string[];
  NextToken?: string;
  MaxRecords?: number;
}
export type InstanceRefreshStatus =
  | "Pending"
  | "InProgress"
  | "Successful"
  | "Failed"
  | "Cancelling"
  | "Cancelled"
  | "RollbackInProgress"
  | "RollbackFailed"
  | "RollbackSuccessful"
  | "Baking"
  | (string & {});
export type XmlStringMaxLen1023 = string;
export type IntPercent = number;
export type InstancesToUpdate = number;
export interface InstanceRefreshLivePoolProgress {
  PercentageComplete?: number;
  InstancesToUpdate?: number;
}
export interface InstanceRefreshWarmPoolProgress {
  PercentageComplete?: number;
  InstancesToUpdate?: number;
}
export interface InstanceRefreshProgressDetails {
  LivePoolProgress?: InstanceRefreshLivePoolProgress;
  WarmPoolProgress?: InstanceRefreshWarmPoolProgress;
}
export type RefreshInstanceWarmup = number;
export type NonZeroIntPercent = number;
export type CheckpointPercentages = number[];
export type CheckpointDelay = number;
export type SkipMatching = boolean;
export type AutoRollback = boolean;
export type ScaleInProtectedInstances =
  | "Refresh"
  | "Ignore"
  | "Wait"
  | (string & {});
export type StandbyInstances = "Terminate" | "Ignore" | "Wait" | (string & {});
export type AlarmList = string[];
export interface AlarmSpecification {
  Alarms?: string[];
}
export type IntPercent100To200 = number;
export type BakeTime = number;
export interface RefreshPreferences {
  MinHealthyPercentage?: number;
  InstanceWarmup?: number;
  CheckpointPercentages?: number[];
  CheckpointDelay?: number;
  SkipMatching?: boolean;
  AutoRollback?: boolean;
  ScaleInProtectedInstances?: ScaleInProtectedInstances;
  StandbyInstances?: StandbyInstances;
  AlarmSpecification?: AlarmSpecification;
  MaxHealthyPercentage?: number;
  BakeTime?: number;
}
export interface DesiredConfiguration {
  LaunchTemplate?: LaunchTemplateSpecification;
  MixedInstancesPolicy?: MixedInstancesPolicy;
}
export interface RollbackDetails {
  RollbackReason?: string;
  RollbackStartTime?: Date;
  PercentageCompleteOnRollback?: number;
  InstancesToUpdateOnRollback?: number;
  ProgressDetailsOnRollback?: InstanceRefreshProgressDetails;
}
export type RefreshStrategy = "Rolling" | "ReplaceRootVolume" | (string & {});
export interface InstanceRefresh {
  InstanceRefreshId?: string;
  AutoScalingGroupName?: string;
  Status?: InstanceRefreshStatus;
  StatusReason?: string;
  StartTime?: Date;
  EndTime?: Date;
  PercentageComplete?: number;
  InstancesToUpdate?: number;
  ProgressDetails?: InstanceRefreshProgressDetails;
  Preferences?: RefreshPreferences;
  DesiredConfiguration?: DesiredConfiguration;
  RollbackDetails?: RollbackDetails;
  Strategy?: RefreshStrategy;
}
export type InstanceRefreshes = InstanceRefresh[];
export interface DescribeInstanceRefreshesAnswer {
  InstanceRefreshes?: (InstanceRefresh & {
    DesiredConfiguration: DesiredConfiguration & {
      MixedInstancesPolicy: MixedInstancesPolicy & {
        LaunchTemplate: LaunchTemplate & {
          Overrides: (LaunchTemplateOverrides & {
            InstanceRequirements: InstanceRequirements & {
              VCpuCount: VCpuCountRequest & { Min: NullablePositiveInteger };
              MemoryMiB: MemoryMiBRequest & { Min: NullablePositiveInteger };
            };
          })[];
        };
      };
    };
  })[];
  NextToken?: string;
}
export type LaunchConfigurationNames = string[];
export interface LaunchConfigurationNamesType {
  LaunchConfigurationNames?: string[];
  NextToken?: string;
  MaxRecords?: number;
}
export interface LaunchConfiguration {
  LaunchConfigurationName?: string;
  LaunchConfigurationARN?: string;
  ImageId?: string;
  KeyName?: string;
  SecurityGroups?: string[];
  ClassicLinkVPCId?: string;
  ClassicLinkVPCSecurityGroups?: string[];
  UserData?: string;
  InstanceType?: string;
  KernelId?: string;
  RamdiskId?: string;
  BlockDeviceMappings?: BlockDeviceMapping[];
  InstanceMonitoring?: InstanceMonitoring;
  SpotPrice?: string;
  IamInstanceProfile?: string;
  CreatedTime?: Date;
  EbsOptimized?: boolean;
  AssociatePublicIpAddress?: boolean;
  PlacementTenancy?: string;
  MetadataOptions?: InstanceMetadataOptions;
}
export type LaunchConfigurations = LaunchConfiguration[];
export interface LaunchConfigurationsType {
  LaunchConfigurations: (LaunchConfiguration & {
    LaunchConfigurationName: XmlStringMaxLen255;
    ImageId: XmlStringMaxLen255;
    InstanceType: XmlStringMaxLen255;
    CreatedTime: Date;
    BlockDeviceMappings: (BlockDeviceMapping & {
      DeviceName: XmlStringMaxLen255;
    })[];
  })[];
  NextToken?: string;
}
export type LifecycleHookNames = string[];
export interface DescribeLifecycleHooksType {
  AutoScalingGroupName?: string;
  LifecycleHookNames?: string[];
}
export type GlobalTimeout = number;
export interface LifecycleHook {
  LifecycleHookName?: string;
  AutoScalingGroupName?: string;
  LifecycleTransition?: string;
  NotificationTargetARN?: string;
  RoleARN?: string;
  NotificationMetadata?: string;
  HeartbeatTimeout?: number;
  GlobalTimeout?: number;
  DefaultResult?: string;
}
export type LifecycleHooks = LifecycleHook[];
export interface DescribeLifecycleHooksAnswer {
  LifecycleHooks?: LifecycleHook[];
}
export interface DescribeLifecycleHookTypesRequest {}
export interface DescribeLifecycleHookTypesAnswer {
  LifecycleHookTypes?: string[];
}
export interface DescribeLoadBalancersRequest {
  AutoScalingGroupName?: string;
  NextToken?: string;
  MaxRecords?: number;
}
export interface LoadBalancerState {
  LoadBalancerName?: string;
  State?: string;
}
export type LoadBalancerStates = LoadBalancerState[];
export interface DescribeLoadBalancersResponse {
  LoadBalancers?: LoadBalancerState[];
  NextToken?: string;
}
export interface DescribeLoadBalancerTargetGroupsRequest {
  AutoScalingGroupName?: string;
  NextToken?: string;
  MaxRecords?: number;
}
export interface LoadBalancerTargetGroupState {
  LoadBalancerTargetGroupARN?: string;
  State?: string;
}
export type LoadBalancerTargetGroupStates = LoadBalancerTargetGroupState[];
export interface DescribeLoadBalancerTargetGroupsResponse {
  LoadBalancerTargetGroups?: LoadBalancerTargetGroupState[];
  NextToken?: string;
}
export interface DescribeMetricCollectionTypesRequest {}
export interface MetricCollectionType {
  Metric?: string;
}
export type MetricCollectionTypes = MetricCollectionType[];
export interface MetricGranularityType {
  Granularity?: string;
}
export type MetricGranularityTypes = MetricGranularityType[];
export interface DescribeMetricCollectionTypesAnswer {
  Metrics?: MetricCollectionType[];
  Granularities?: MetricGranularityType[];
}
export interface DescribeNotificationConfigurationsType {
  AutoScalingGroupNames?: string[];
  NextToken?: string;
  MaxRecords?: number;
}
export interface NotificationConfiguration {
  AutoScalingGroupName?: string;
  TopicARN?: string;
  NotificationType?: string;
}
export type NotificationConfigurations = NotificationConfiguration[];
export interface DescribeNotificationConfigurationsAnswer {
  NotificationConfigurations: NotificationConfiguration[];
  NextToken?: string;
}
export type PolicyNames = string[];
export type PolicyTypes = string[];
export interface DescribePoliciesType {
  AutoScalingGroupName?: string;
  PolicyNames?: string[];
  PolicyTypes?: string[];
  NextToken?: string;
  MaxRecords?: number;
}
export type MinAdjustmentStep = number;
export type MinAdjustmentMagnitude = number;
export type PolicyIncrement = number;
export type MetricScale = number;
export interface StepAdjustment {
  MetricIntervalLowerBound?: number;
  MetricIntervalUpperBound?: number;
  ScalingAdjustment?: number;
}
export type StepAdjustments = StepAdjustment[];
export type EstimatedInstanceWarmup = number;
export interface Alarm {
  AlarmName?: string;
  AlarmARN?: string;
}
export type Alarms = Alarm[];
export type MetricType =
  | "ASGAverageCPUUtilization"
  | "ASGAverageNetworkIn"
  | "ASGAverageNetworkOut"
  | "ALBRequestCountPerTarget"
  | (string & {});
export interface PredefinedMetricSpecification {
  PredefinedMetricType?: MetricType;
  ResourceLabel?: string;
}
export type MetricName = string;
export type MetricNamespace = string;
export type MetricDimensionName = string;
export type MetricDimensionValue = string;
export interface MetricDimension {
  Name?: string;
  Value?: string;
}
export type MetricDimensions = MetricDimension[];
export type MetricStatistic =
  | "Average"
  | "Minimum"
  | "Maximum"
  | "SampleCount"
  | "Sum"
  | (string & {});
export type MetricUnit = string;
export type MetricGranularityInSeconds = number;
export type XmlStringMaxLen2047 = string;
export interface Metric {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: MetricDimension[];
}
export type XmlStringMetricStat = string;
export interface TargetTrackingMetricStat {
  Metric?: Metric;
  Stat?: string;
  Unit?: string;
  Period?: number;
}
export type XmlStringMetricLabel = string;
export type ReturnData = boolean;
export interface TargetTrackingMetricDataQuery {
  Id?: string;
  Expression?: string;
  MetricStat?: TargetTrackingMetricStat;
  Label?: string;
  Period?: number;
  ReturnData?: boolean;
}
export type TargetTrackingMetricDataQueries = TargetTrackingMetricDataQuery[];
export interface CustomizedMetricSpecification {
  MetricName?: string;
  Namespace?: string;
  Dimensions?: MetricDimension[];
  Statistic?: MetricStatistic;
  Unit?: string;
  Period?: number;
  Metrics?: TargetTrackingMetricDataQuery[];
}
export type DisableScaleIn = boolean;
export interface TargetTrackingConfiguration {
  PredefinedMetricSpecification?: PredefinedMetricSpecification;
  CustomizedMetricSpecification?: CustomizedMetricSpecification;
  TargetValue?: number;
  DisableScaleIn?: boolean;
}
export type ScalingPolicyEnabled = boolean;
export type PredefinedMetricPairType =
  | "ASGCPUUtilization"
  | "ASGNetworkIn"
  | "ASGNetworkOut"
  | "ALBRequestCount"
  | (string & {});
export interface PredictiveScalingPredefinedMetricPair {
  PredefinedMetricType?: PredefinedMetricPairType;
  ResourceLabel?: string;
}
export type PredefinedScalingMetricType =
  | "ASGAverageCPUUtilization"
  | "ASGAverageNetworkIn"
  | "ASGAverageNetworkOut"
  | "ALBRequestCountPerTarget"
  | (string & {});
export interface PredictiveScalingPredefinedScalingMetric {
  PredefinedMetricType?: PredefinedScalingMetricType;
  ResourceLabel?: string;
}
export type PredefinedLoadMetricType =
  | "ASGTotalCPUUtilization"
  | "ASGTotalNetworkIn"
  | "ASGTotalNetworkOut"
  | "ALBTargetGroupRequestCount"
  | (string & {});
export interface PredictiveScalingPredefinedLoadMetric {
  PredefinedMetricType?: PredefinedLoadMetricType;
  ResourceLabel?: string;
}
export interface MetricStat {
  Metric?: Metric;
  Stat?: string;
  Unit?: string;
}
export interface MetricDataQuery {
  Id?: string;
  Expression?: string;
  MetricStat?: MetricStat;
  Label?: string;
  ReturnData?: boolean;
}
export type MetricDataQueries = MetricDataQuery[];
export interface PredictiveScalingCustomizedScalingMetric {
  MetricDataQueries?: MetricDataQuery[];
}
export interface PredictiveScalingCustomizedLoadMetric {
  MetricDataQueries?: MetricDataQuery[];
}
export interface PredictiveScalingCustomizedCapacityMetric {
  MetricDataQueries?: MetricDataQuery[];
}
export interface PredictiveScalingMetricSpecification {
  TargetValue?: number;
  PredefinedMetricPairSpecification?: PredictiveScalingPredefinedMetricPair;
  PredefinedScalingMetricSpecification?: PredictiveScalingPredefinedScalingMetric;
  PredefinedLoadMetricSpecification?: PredictiveScalingPredefinedLoadMetric;
  CustomizedScalingMetricSpecification?: PredictiveScalingCustomizedScalingMetric;
  CustomizedLoadMetricSpecification?: PredictiveScalingCustomizedLoadMetric;
  CustomizedCapacityMetricSpecification?: PredictiveScalingCustomizedCapacityMetric;
}
export type PredictiveScalingMetricSpecifications =
  PredictiveScalingMetricSpecification[];
export type PredictiveScalingMode =
  | "ForecastAndScale"
  | "ForecastOnly"
  | (string & {});
export type PredictiveScalingSchedulingBufferTime = number;
export type PredictiveScalingMaxCapacityBreachBehavior =
  | "HonorMaxCapacity"
  | "IncreaseMaxCapacity"
  | (string & {});
export type PredictiveScalingMaxCapacityBuffer = number;
export interface PredictiveScalingConfiguration {
  MetricSpecifications?: PredictiveScalingMetricSpecification[];
  Mode?: PredictiveScalingMode;
  SchedulingBufferTime?: number;
  MaxCapacityBreachBehavior?: PredictiveScalingMaxCapacityBreachBehavior;
  MaxCapacityBuffer?: number;
}
export interface ScalingPolicy {
  AutoScalingGroupName?: string;
  PolicyName?: string;
  PolicyARN?: string;
  PolicyType?: string;
  AdjustmentType?: string;
  MinAdjustmentStep?: number;
  MinAdjustmentMagnitude?: number;
  ScalingAdjustment?: number;
  Cooldown?: number;
  StepAdjustments?: StepAdjustment[];
  MetricAggregationType?: string;
  EstimatedInstanceWarmup?: number;
  Alarms?: Alarm[];
  TargetTrackingConfiguration?: TargetTrackingConfiguration;
  Enabled?: boolean;
  PredictiveScalingConfiguration?: PredictiveScalingConfiguration;
}
export type ScalingPolicies = ScalingPolicy[];
export interface PoliciesType {
  ScalingPolicies?: (ScalingPolicy & {
    StepAdjustments: (StepAdjustment & {
      ScalingAdjustment: PolicyIncrement;
    })[];
    TargetTrackingConfiguration: TargetTrackingConfiguration & {
      TargetValue: MetricScale;
      PredefinedMetricSpecification: PredefinedMetricSpecification & {
        PredefinedMetricType: MetricType;
      };
      CustomizedMetricSpecification: CustomizedMetricSpecification & {
        Dimensions: (MetricDimension & {
          Name: MetricDimensionName;
          Value: MetricDimensionValue;
        })[];
        Metrics: (TargetTrackingMetricDataQuery & {
          Id: XmlStringMaxLen64;
          MetricStat: TargetTrackingMetricStat & {
            Metric: Metric & {
              Namespace: MetricNamespace;
              MetricName: MetricName;
              Dimensions: (MetricDimension & {
                Name: MetricDimensionName;
                Value: MetricDimensionValue;
              })[];
            };
            Stat: XmlStringMetricStat;
          };
        })[];
      };
    };
    PredictiveScalingConfiguration: PredictiveScalingConfiguration & {
      MetricSpecifications: (PredictiveScalingMetricSpecification & {
        TargetValue: MetricScale;
        PredefinedMetricPairSpecification: PredictiveScalingPredefinedMetricPair & {
          PredefinedMetricType: PredefinedMetricPairType;
        };
        PredefinedScalingMetricSpecification: PredictiveScalingPredefinedScalingMetric & {
          PredefinedMetricType: PredefinedScalingMetricType;
        };
        PredefinedLoadMetricSpecification: PredictiveScalingPredefinedLoadMetric & {
          PredefinedMetricType: PredefinedLoadMetricType;
        };
        CustomizedScalingMetricSpecification: PredictiveScalingCustomizedScalingMetric & {
          MetricDataQueries: (MetricDataQuery & {
            Id: XmlStringMaxLen255;
            MetricStat: MetricStat & {
              Metric: Metric & {
                Namespace: MetricNamespace;
                MetricName: MetricName;
                Dimensions: (MetricDimension & {
                  Name: MetricDimensionName;
                  Value: MetricDimensionValue;
                })[];
              };
              Stat: XmlStringMetricStat;
            };
          })[];
        };
        CustomizedLoadMetricSpecification: PredictiveScalingCustomizedLoadMetric & {
          MetricDataQueries: (MetricDataQuery & {
            Id: XmlStringMaxLen255;
            MetricStat: MetricStat & {
              Metric: Metric & {
                Namespace: MetricNamespace;
                MetricName: MetricName;
                Dimensions: (MetricDimension & {
                  Name: MetricDimensionName;
                  Value: MetricDimensionValue;
                })[];
              };
              Stat: XmlStringMetricStat;
            };
          })[];
        };
        CustomizedCapacityMetricSpecification: PredictiveScalingCustomizedCapacityMetric & {
          MetricDataQueries: (MetricDataQuery & {
            Id: XmlStringMaxLen255;
            MetricStat: MetricStat & {
              Metric: Metric & {
                Namespace: MetricNamespace;
                MetricName: MetricName;
                Dimensions: (MetricDimension & {
                  Name: MetricDimensionName;
                  Value: MetricDimensionValue;
                })[];
              };
              Stat: XmlStringMetricStat;
            };
          })[];
        };
      })[];
    };
  })[];
  NextToken?: string;
}
export type ActivityIds = string[];
export type IncludeDeletedGroups = boolean;
export interface DescribeScalingActivitiesType {
  ActivityIds?: string[];
  AutoScalingGroupName?: string;
  IncludeDeletedGroups?: boolean;
  MaxRecords?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type ScalingActivityStatusCode =
  | "PendingSpotBidPlacement"
  | "WaitingForSpotInstanceRequestId"
  | "WaitingForSpotInstanceId"
  | "WaitingForInstanceId"
  | "PreInService"
  | "InProgress"
  | "WaitingForELBConnectionDraining"
  | "MidLifecycleAction"
  | "WaitingForInstanceWarmup"
  | "Successful"
  | "Failed"
  | "Cancelled"
  | "WaitingForConnectionDraining"
  | "WaitingForInPlaceUpdateToStart"
  | "WaitingForInPlaceUpdateToFinalize"
  | "InPlaceUpdateInProgress"
  | (string & {});
export type Progress = number;
export type AutoScalingGroupState = string;
export interface Activity {
  ActivityId?: string;
  AutoScalingGroupName?: string;
  Description?: string;
  Cause?: string;
  StartTime?: Date;
  EndTime?: Date;
  StatusCode?: ScalingActivityStatusCode;
  StatusMessage?: string;
  Progress?: number;
  Details?: string;
  AutoScalingGroupState?: string;
  AutoScalingGroupARN?: string;
}
export type Activities = Activity[];
export interface ActivitiesType {
  Activities: (Activity & {
    ActivityId: XmlString;
    AutoScalingGroupName: XmlStringMaxLen255;
    Cause: XmlStringMaxLen1023;
    StartTime: Date;
    StatusCode: ScalingActivityStatusCode;
  })[];
  NextToken?: string;
}
export interface DescribeScalingProcessTypesRequest {}
export interface ProcessType {
  ProcessName?: string;
}
export type Processes = ProcessType[];
export interface ProcessesType {
  Processes?: (ProcessType & { ProcessName: XmlStringMaxLen255 })[];
}
export interface DescribeScheduledActionsType {
  AutoScalingGroupName?: string;
  ScheduledActionNames?: string[];
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxRecords?: number;
}
export interface ScheduledUpdateGroupAction {
  AutoScalingGroupName?: string;
  ScheduledActionName?: string;
  ScheduledActionARN?: string;
  Time?: Date;
  StartTime?: Date;
  EndTime?: Date;
  Recurrence?: string;
  MinSize?: number;
  MaxSize?: number;
  DesiredCapacity?: number;
  TimeZone?: string;
}
export type ScheduledUpdateGroupActions = ScheduledUpdateGroupAction[];
export interface ScheduledActionsType {
  ScheduledUpdateGroupActions?: ScheduledUpdateGroupAction[];
  NextToken?: string;
}
export interface DescribeTagsType {
  Filters?: Filter[];
  NextToken?: string;
  MaxRecords?: number;
}
export interface TagsType {
  Tags?: TagDescription[];
  NextToken?: string;
}
export interface DescribeTerminationPolicyTypesRequest {}
export interface DescribeTerminationPolicyTypesAnswer {
  TerminationPolicyTypes?: string[];
}
export interface DescribeTrafficSourcesRequest {
  AutoScalingGroupName?: string;
  TrafficSourceType?: string;
  NextToken?: string;
  MaxRecords?: number;
}
export interface TrafficSourceState {
  TrafficSource?: string;
  State?: string;
  Identifier?: string;
  Type?: string;
}
export type TrafficSourceStates = TrafficSourceState[];
export interface DescribeTrafficSourcesResponse {
  TrafficSources?: TrafficSourceState[];
  NextToken?: string;
}
export interface DescribeWarmPoolType {
  AutoScalingGroupName?: string;
  MaxRecords?: number;
  NextToken?: string;
}
export interface DescribeWarmPoolAnswer {
  WarmPoolConfiguration?: WarmPoolConfiguration;
  Instances?: (Instance & {
    InstanceId: XmlStringMaxLen19;
    AvailabilityZone: XmlStringMaxLen255;
    LifecycleState: LifecycleState;
    HealthStatus: XmlStringMaxLen32;
    ProtectedFromScaleIn: InstanceProtected;
  })[];
  NextToken?: string;
}
export type ShouldDecrementDesiredCapacity = boolean;
export interface DetachInstancesQuery {
  InstanceIds?: string[];
  AutoScalingGroupName?: string;
  ShouldDecrementDesiredCapacity?: boolean;
}
export interface DetachInstancesAnswer {
  Activities?: (Activity & {
    ActivityId: XmlString;
    AutoScalingGroupName: XmlStringMaxLen255;
    Cause: XmlStringMaxLen1023;
    StartTime: Date;
    StatusCode: ScalingActivityStatusCode;
  })[];
}
export interface DetachLoadBalancersType {
  AutoScalingGroupName?: string;
  LoadBalancerNames?: string[];
}
export interface DetachLoadBalancersResultType {}
export interface DetachLoadBalancerTargetGroupsType {
  AutoScalingGroupName?: string;
  TargetGroupARNs?: string[];
}
export interface DetachLoadBalancerTargetGroupsResultType {}
export interface DetachTrafficSourcesType {
  AutoScalingGroupName?: string;
  TrafficSources?: TrafficSourceIdentifier[];
}
export interface DetachTrafficSourcesResultType {}
export type Metrics = string[];
export interface DisableMetricsCollectionQuery {
  AutoScalingGroupName?: string;
  Metrics?: string[];
}
export interface DisableMetricsCollectionResponse {}
export interface EnableMetricsCollectionQuery {
  AutoScalingGroupName?: string;
  Metrics?: string[];
  Granularity?: string;
}
export interface EnableMetricsCollectionResponse {}
export interface EnterStandbyQuery {
  InstanceIds?: string[];
  AutoScalingGroupName?: string;
  ShouldDecrementDesiredCapacity?: boolean;
}
export interface EnterStandbyAnswer {
  Activities?: (Activity & {
    ActivityId: XmlString;
    AutoScalingGroupName: XmlStringMaxLen255;
    Cause: XmlStringMaxLen1023;
    StartTime: Date;
    StatusCode: ScalingActivityStatusCode;
  })[];
}
export type HonorCooldown = boolean;
export interface ExecutePolicyType {
  AutoScalingGroupName?: string;
  PolicyName?: string;
  HonorCooldown?: boolean;
  MetricValue?: number;
  BreachThreshold?: number;
}
export interface ExecutePolicyResponse {}
export interface ExitStandbyQuery {
  InstanceIds?: string[];
  AutoScalingGroupName?: string;
}
export interface ExitStandbyAnswer {
  Activities?: (Activity & {
    ActivityId: XmlString;
    AutoScalingGroupName: XmlStringMaxLen255;
    Cause: XmlStringMaxLen1023;
    StartTime: Date;
    StatusCode: ScalingActivityStatusCode;
  })[];
}
export interface GetPredictiveScalingForecastType {
  AutoScalingGroupName?: string;
  PolicyName?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export type PredictiveScalingForecastTimestamps = Date[];
export type PredictiveScalingForecastValues = number[];
export interface LoadForecast {
  Timestamps?: Date[];
  Values?: number[];
  MetricSpecification?: PredictiveScalingMetricSpecification;
}
export type LoadForecasts = LoadForecast[];
export interface CapacityForecast {
  Timestamps?: Date[];
  Values?: number[];
}
export interface GetPredictiveScalingForecastAnswer {
  LoadForecast: (LoadForecast & {
    Timestamps: PredictiveScalingForecastTimestamps;
    Values: PredictiveScalingForecastValues;
    MetricSpecification: PredictiveScalingMetricSpecification & {
      TargetValue: MetricScale;
      PredefinedMetricPairSpecification: PredictiveScalingPredefinedMetricPair & {
        PredefinedMetricType: PredefinedMetricPairType;
      };
      PredefinedScalingMetricSpecification: PredictiveScalingPredefinedScalingMetric & {
        PredefinedMetricType: PredefinedScalingMetricType;
      };
      PredefinedLoadMetricSpecification: PredictiveScalingPredefinedLoadMetric & {
        PredefinedMetricType: PredefinedLoadMetricType;
      };
      CustomizedScalingMetricSpecification: PredictiveScalingCustomizedScalingMetric & {
        MetricDataQueries: (MetricDataQuery & {
          Id: XmlStringMaxLen255;
          MetricStat: MetricStat & {
            Metric: Metric & {
              Namespace: MetricNamespace;
              MetricName: MetricName;
              Dimensions: (MetricDimension & {
                Name: MetricDimensionName;
                Value: MetricDimensionValue;
              })[];
            };
            Stat: XmlStringMetricStat;
          };
        })[];
      };
      CustomizedLoadMetricSpecification: PredictiveScalingCustomizedLoadMetric & {
        MetricDataQueries: (MetricDataQuery & {
          Id: XmlStringMaxLen255;
          MetricStat: MetricStat & {
            Metric: Metric & {
              Namespace: MetricNamespace;
              MetricName: MetricName;
              Dimensions: (MetricDimension & {
                Name: MetricDimensionName;
                Value: MetricDimensionValue;
              })[];
            };
            Stat: XmlStringMetricStat;
          };
        })[];
      };
      CustomizedCapacityMetricSpecification: PredictiveScalingCustomizedCapacityMetric & {
        MetricDataQueries: (MetricDataQuery & {
          Id: XmlStringMaxLen255;
          MetricStat: MetricStat & {
            Metric: Metric & {
              Namespace: MetricNamespace;
              MetricName: MetricName;
              Dimensions: (MetricDimension & {
                Name: MetricDimensionName;
                Value: MetricDimensionValue;
              })[];
            };
            Stat: XmlStringMetricStat;
          };
        })[];
      };
    };
  })[];
  CapacityForecast: CapacityForecast & {
    Timestamps: PredictiveScalingForecastTimestamps;
    Values: PredictiveScalingForecastValues;
  };
  UpdateTime: Date;
}
export type RequestedCapacity = number;
export type ClientToken = string;
export type AvailabilityZonesLimit1 = string[];
export type AvailabilityZoneIdsLimit1 = string[];
export type SubnetIdsLimit1 = string[];
export type RetryStrategy =
  | "retry-with-group-configuration"
  | "none"
  | (string & {});
export interface LaunchInstancesRequest {
  AutoScalingGroupName?: string;
  RequestedCapacity?: number;
  ClientToken?: string;
  AvailabilityZones?: string[];
  AvailabilityZoneIds?: string[];
  SubnetIds?: string[];
  RetryStrategy?: RetryStrategy;
}
export interface InstanceCollection {
  InstanceType?: string;
  MarketType?: string;
  SubnetId?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  InstanceIds?: string[];
}
export type InstanceCollections = InstanceCollection[];
export interface LaunchInstancesError_ {
  InstanceType?: string;
  MarketType?: string;
  SubnetId?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type LaunchInstancesErrors = LaunchInstancesError_[];
export interface LaunchInstancesResult {
  AutoScalingGroupName?: string;
  ClientToken?: string;
  Instances?: InstanceCollection[];
  Errors?: LaunchInstancesError_[];
}
export interface PutLifecycleHookType {
  LifecycleHookName?: string;
  AutoScalingGroupName?: string;
  LifecycleTransition?: string;
  RoleARN?: string;
  NotificationTargetARN?: string;
  NotificationMetadata?: string;
  HeartbeatTimeout?: number;
  DefaultResult?: string;
}
export interface PutLifecycleHookAnswer {}
export interface PutNotificationConfigurationType {
  AutoScalingGroupName?: string;
  TopicARN?: string;
  NotificationTypes?: string[];
}
export interface PutNotificationConfigurationResponse {}
export interface PutScalingPolicyType {
  AutoScalingGroupName?: string;
  PolicyName?: string;
  PolicyType?: string;
  AdjustmentType?: string;
  MinAdjustmentStep?: number;
  MinAdjustmentMagnitude?: number;
  ScalingAdjustment?: number;
  Cooldown?: number;
  MetricAggregationType?: string;
  StepAdjustments?: StepAdjustment[];
  EstimatedInstanceWarmup?: number;
  TargetTrackingConfiguration?: TargetTrackingConfiguration;
  Enabled?: boolean;
  PredictiveScalingConfiguration?: PredictiveScalingConfiguration;
}
export interface PolicyARNType {
  PolicyARN?: string;
  Alarms?: Alarm[];
}
export interface PutScheduledUpdateGroupActionType {
  AutoScalingGroupName?: string;
  ScheduledActionName?: string;
  Time?: Date;
  StartTime?: Date;
  EndTime?: Date;
  Recurrence?: string;
  MinSize?: number;
  MaxSize?: number;
  DesiredCapacity?: number;
  TimeZone?: string;
}
export interface PutScheduledUpdateGroupActionResponse {}
export interface PutWarmPoolType {
  AutoScalingGroupName?: string;
  MaxGroupPreparedCapacity?: number;
  MinSize?: number;
  PoolState?: WarmPoolState;
  InstanceReusePolicy?: InstanceReusePolicy;
}
export interface PutWarmPoolAnswer {}
export interface RecordLifecycleActionHeartbeatType {
  LifecycleHookName?: string;
  AutoScalingGroupName?: string;
  LifecycleActionToken?: string;
  InstanceId?: string;
}
export interface RecordLifecycleActionHeartbeatAnswer {}
export type ProcessNames = string[];
export interface ScalingProcessQuery {
  AutoScalingGroupName?: string;
  ScalingProcesses?: string[];
}
export interface ResumeProcessesResponse {}
export interface RollbackInstanceRefreshType {
  AutoScalingGroupName?: string;
}
export interface RollbackInstanceRefreshAnswer {
  InstanceRefreshId?: string;
}
export interface SetDesiredCapacityType {
  AutoScalingGroupName?: string;
  DesiredCapacity?: number;
  HonorCooldown?: boolean;
}
export interface SetDesiredCapacityResponse {}
export type ShouldRespectGracePeriod = boolean;
export interface SetInstanceHealthQuery {
  InstanceId?: string;
  HealthStatus?: string;
  ShouldRespectGracePeriod?: boolean;
}
export interface SetInstanceHealthResponse {}
export type ProtectedFromScaleIn = boolean;
export interface SetInstanceProtectionQuery {
  InstanceIds?: string[];
  AutoScalingGroupName?: string;
  ProtectedFromScaleIn?: boolean;
}
export interface SetInstanceProtectionAnswer {}
export interface StartInstanceRefreshType {
  AutoScalingGroupName?: string;
  Strategy?: RefreshStrategy;
  DesiredConfiguration?: DesiredConfiguration;
  Preferences?: RefreshPreferences;
}
export interface StartInstanceRefreshAnswer {
  InstanceRefreshId?: string;
}
export interface SuspendProcessesResponse {}
export type TerminationInstanceIds = string[];
export interface TerminateInstanceInAutoScalingGroupType {
  InstanceId?: string;
  InstanceIds?: string[];
  AutoScalingGroupName?: string;
  ShouldDecrementDesiredCapacity?: boolean;
}
export interface ActivityType {
  Activity?: Activity & {
    ActivityId: XmlString;
    AutoScalingGroupName: XmlStringMaxLen255;
    Cause: XmlStringMaxLen1023;
    StartTime: Date;
    StatusCode: ScalingActivityStatusCode;
  };
  Activities?: (Activity & {
    ActivityId: XmlString;
    AutoScalingGroupName: XmlStringMaxLen255;
    Cause: XmlStringMaxLen1023;
    StartTime: Date;
    StatusCode: ScalingActivityStatusCode;
  })[];
}
export type UpdatePlacementGroupParam = string;
export interface UpdateAutoScalingGroupType {
  AutoScalingGroupName?: string;
  LaunchConfigurationName?: string;
  LaunchTemplate?: LaunchTemplateSpecification;
  MixedInstancesPolicy?: MixedInstancesPolicy;
  MinSize?: number;
  MaxSize?: number;
  DesiredCapacity?: number;
  DefaultCooldown?: number;
  AvailabilityZones?: string[];
  AvailabilityZoneIds?: string[];
  HealthCheckType?: string;
  HealthCheckGracePeriod?: number;
  PlacementGroup?: string;
  VPCZoneIdentifier?: string;
  TerminationPolicies?: string[];
  NewInstancesProtectedFromScaleIn?: boolean;
  ServiceLinkedRoleARN?: string;
  MaxInstanceLifetime?: number;
  CapacityRebalance?: boolean;
  Context?: string;
  DesiredCapacityType?: string;
  DefaultInstanceWarmup?: number;
  InstanceMaintenancePolicy?: InstanceMaintenancePolicy;
  AvailabilityZoneDistribution?: AvailabilityZoneDistribution;
  AvailabilityZoneImpairmentPolicy?: AvailabilityZoneImpairmentPolicy;
  SkipZonalShiftValidation?: boolean;
  CapacityReservationSpecification?: CapacityReservationSpecification;
  InstanceLifecyclePolicy?: InstanceLifecyclePolicy;
  DeletionProtection?: DeletionProtection;
}
export interface UpdateAutoScalingGroupResponse {}
export type AttachInstancesError =
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * Attaches one or more EC2 instances to the specified Auto Scaling group.
 *
 * When you attach instances, Amazon EC2 Auto Scaling increases the desired capacity of the group by the
 * number of instances being attached. If the number of instances being attached plus the
 * desired capacity of the group exceeds the maximum size of the group, the operation
 * fails.
 *
 * If there is a Classic Load Balancer attached to your Auto Scaling group, the instances are
 * also registered with the load balancer. If there are target groups attached to your Auto Scaling
 * group, the instances are also registered with the target groups.
 *
 * For more information, see Detach
 * or attach instances in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const attachInstances: API.OperationMethod<
  AttachInstancesQuery,
  AttachInstancesResponse,
  AttachInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceIds: 0, AutoScalingGroupName: 0 },
  },
  errors: [ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachInstances",
})) as any;

export type AttachLoadBalancersError =
  | InstanceRefreshInProgressFault
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * This API operation is superseded by AttachTrafficSources, which
 * can attach multiple traffic sources types. We recommend using
 * `AttachTrafficSources` to simplify how you manage traffic sources.
 * However, we continue to support `AttachLoadBalancers`. You can use both
 * the original `AttachLoadBalancers` API operation and
 * `AttachTrafficSources` on the same Auto Scaling group.
 *
 * Attaches one or more Classic Load Balancers to the specified Auto Scaling group. Amazon EC2 Auto Scaling registers the
 * running instances with these Classic Load Balancers.
 *
 * To describe the load balancers for an Auto Scaling group, call the DescribeLoadBalancers API.
 * To detach a load balancer from the Auto Scaling group, call the DetachLoadBalancers
 * API.
 *
 * This operation is additive and does not detach existing Classic Load Balancers or
 * target groups from the Auto Scaling group.
 *
 * For more information, see Use Elastic Load Balancing to
 * distribute traffic across the instances in your Auto Scaling group in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const attachLoadBalancers: API.OperationMethod<
  AttachLoadBalancersType,
  AttachLoadBalancersResultType,
  AttachLoadBalancersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, LoadBalancerNames: 0 },
  },
  errors: [
    InstanceRefreshInProgressFault,
    ResourceContentionFault,
    ServiceLinkedRoleFailure,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancers",
})) as any;

export type AttachLoadBalancerTargetGroupsError =
  | InstanceRefreshInProgressFault
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * This API operation is superseded by AttachTrafficSources, which
 * can attach multiple traffic sources types. We recommend using
 * `AttachTrafficSources` to simplify how you manage traffic sources.
 * However, we continue to support `AttachLoadBalancerTargetGroups`. You can
 * use both the original `AttachLoadBalancerTargetGroups` API operation and
 * `AttachTrafficSources` on the same Auto Scaling group.
 *
 * Attaches one or more target groups to the specified Auto Scaling group.
 *
 * This operation is used with the following load balancer types:
 *
 * - Application Load Balancer - Operates at the application layer (layer 7) and supports HTTP and
 * HTTPS.
 *
 * - Network Load Balancer - Operates at the transport layer (layer 4) and supports TCP, TLS, and
 * UDP.
 *
 * - Gateway Load Balancer - Operates at the network layer (layer 3).
 *
 * To describe the target groups for an Auto Scaling group, call the DescribeLoadBalancerTargetGroups
 * API. To detach the target group from
 * the Auto Scaling group, call the DetachLoadBalancerTargetGroups API.
 *
 * This operation is additive and does not detach existing target groups or Classic Load
 * Balancers from the Auto Scaling group.
 *
 * For more information, see Use Elastic Load Balancing to
 * distribute traffic across the instances in your Auto Scaling group in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const attachLoadBalancerTargetGroups: API.OperationMethod<
  AttachLoadBalancerTargetGroupsType,
  AttachLoadBalancerTargetGroupsResultType,
  AttachLoadBalancerTargetGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, TargetGroupARNs: 0 },
  },
  errors: [
    InstanceRefreshInProgressFault,
    ResourceContentionFault,
    ServiceLinkedRoleFailure,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancerTargetGroups",
})) as any;

export type AttachTrafficSourcesError =
  | InstanceRefreshInProgressFault
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * Attaches one or more traffic sources to the specified Auto Scaling group.
 *
 * You can use any of the following as traffic sources for an Auto Scaling group:
 *
 * - Application Load Balancer
 *
 * - Classic Load Balancer
 *
 * - Gateway Load Balancer
 *
 * - Network Load Balancer
 *
 * - VPC Lattice
 *
 * This operation is additive and does not detach existing traffic sources from the Auto Scaling
 * group.
 *
 * After the operation completes, use the DescribeTrafficSources API to
 * return details about the state of the attachments between traffic sources and your Auto Scaling
 * group. To detach a traffic source from the Auto Scaling group, call the
 * DetachTrafficSources API.
 */
export const attachTrafficSources: API.OperationMethod<
  AttachTrafficSourcesType,
  AttachTrafficSourcesResultType,
  AttachTrafficSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      TrafficSources: D.list(i_TrafficSourceIdentifier),
      SkipZonalShiftValidation: 0,
    },
  },
  errors: [
    InstanceRefreshInProgressFault,
    ResourceContentionFault,
    ServiceLinkedRoleFailure,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachTrafficSources",
})) as any;

export type BatchDeleteScheduledActionError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Deletes one or more scheduled actions for the specified Auto Scaling group.
 */
export const batchDeleteScheduledAction: API.OperationMethod<
  BatchDeleteScheduledActionType,
  BatchDeleteScheduledActionAnswer,
  BatchDeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, ScheduledActionNames: 0 },
    output: { FailedScheduledActions: D.list({}) },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteScheduledAction",
})) as any;

export type BatchPutScheduledUpdateGroupActionError =
  | AlreadyExistsFault
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Creates or updates one or more scheduled scaling actions for an Auto Scaling group.
 */
export const batchPutScheduledUpdateGroupAction: API.OperationMethod<
  BatchPutScheduledUpdateGroupActionType,
  BatchPutScheduledUpdateGroupActionAnswer,
  BatchPutScheduledUpdateGroupActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      ScheduledUpdateGroupActions: D.list({
        ScheduledActionName: 0,
        StartTime: 0,
        EndTime: 0,
        Recurrence: 0,
        MinSize: 0,
        MaxSize: 0,
        DesiredCapacity: 0,
        TimeZone: 0,
      }),
    },
    output: { FailedScheduledUpdateGroupActions: D.list({}) },
  },
  errors: [AlreadyExistsFault, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutScheduledUpdateGroupAction",
})) as any;

export type CancelInstanceRefreshError =
  | ActiveInstanceRefreshNotFoundFault
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Cancels an instance refresh or rollback that is in progress. If an instance refresh or
 * rollback is not in progress, an `ActiveInstanceRefreshNotFound` error
 * occurs.
 *
 * This operation is part of the instance refresh
 * feature in Amazon EC2 Auto Scaling, which helps you update instances in your Auto Scaling group
 * after you make configuration changes.
 *
 * When you cancel an instance refresh, this does not roll back any changes that it made.
 * Use the RollbackInstanceRefresh API to roll back instead.
 */
export const cancelInstanceRefresh: API.OperationMethod<
  CancelInstanceRefreshType,
  CancelInstanceRefreshAnswer,
  CancelInstanceRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, WaitForTransitioningInstances: 0 },
  },
  errors: [
    ActiveInstanceRefreshNotFoundFault,
    LimitExceededFault,
    ResourceContentionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelInstanceRefresh",
})) as any;

export type CompleteLifecycleActionError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Completes the lifecycle action for the specified token or instance with the specified
 * result.
 *
 * This step is a part of the procedure for adding a lifecycle hook to an Auto Scaling
 * group:
 *
 * - (Optional) Create a launch template or launch configuration with a user data
 * script that runs while an instance is in a wait state due to a lifecycle
 * hook.
 *
 * - (Optional) Create a Lambda function and a rule that allows Amazon EventBridge to invoke
 * your Lambda function when an instance is put into a wait state due to a
 * lifecycle hook.
 *
 * - (Optional) Create a notification target and an IAM role. The target can be
 * either an Amazon SQS queue or an Amazon SNS topic. The role allows Amazon EC2 Auto Scaling to publish
 * lifecycle notifications to the target.
 *
 * - Create the lifecycle hook. Specify whether the hook is used when the instances
 * launch or terminate.
 *
 * - If you need more time, record the lifecycle action heartbeat to keep the
 * instance in a wait state.
 *
 * - If you finish before the timeout period ends, send a
 * callback by using the CompleteLifecycleAction API
 * call.
 *
 * For more information, see Complete a lifecycle
 * action in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const completeLifecycleAction: API.OperationMethod<
  CompleteLifecycleActionType,
  CompleteLifecycleActionAnswer,
  CompleteLifecycleActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LifecycleHookName: 0,
      AutoScalingGroupName: 0,
      LifecycleActionToken: 0,
      LifecycleActionResult: 0,
      InstanceId: 0,
    },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteLifecycleAction",
})) as any;

export type CreateAutoScalingGroupError =
  | AlreadyExistsFault
  | LimitExceededFault
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * **We strongly recommend using a launch template when calling this operation to ensure full functionality for Amazon EC2 Auto Scaling and Amazon EC2.**
 *
 * Creates an Auto Scaling group with the specified name and attributes.
 *
 * If you exceed your maximum limit of Auto Scaling groups, the call fails. To query this limit,
 * call the DescribeAccountLimits API. For information about updating
 * this limit, see Quotas for
 * Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * If you're new to Amazon EC2 Auto Scaling, see the introductory tutorials in Get started
 * with Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * Every Auto Scaling group has three size properties (`DesiredCapacity`,
 * `MaxSize`, and `MinSize`). Usually, you set these sizes based
 * on a specific number of instances. However, if you configure a mixed instances policy
 * that defines weights for the instance types, you must specify these sizes with the same
 * units that you use for weighting instances.
 */
export const createAutoScalingGroup: API.OperationMethod<
  CreateAutoScalingGroupType,
  CreateAutoScalingGroupResponse,
  CreateAutoScalingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      LaunchConfigurationName: 0,
      LaunchTemplate: i_LaunchTemplateSpecification,
      MixedInstancesPolicy: i_MixedInstancesPolicy,
      InstanceId: 0,
      MinSize: 0,
      MaxSize: 0,
      DesiredCapacity: 0,
      DefaultCooldown: 0,
      AvailabilityZones: 0,
      AvailabilityZoneIds: 0,
      LoadBalancerNames: 0,
      TargetGroupARNs: 0,
      HealthCheckType: 0,
      HealthCheckGracePeriod: 0,
      PlacementGroup: 0,
      VPCZoneIdentifier: 0,
      TerminationPolicies: 0,
      NewInstancesProtectedFromScaleIn: 0,
      CapacityRebalance: 0,
      LifecycleHookSpecificationList: D.list({
        LifecycleHookName: 0,
        LifecycleTransition: 0,
        NotificationMetadata: 0,
        HeartbeatTimeout: 0,
        DefaultResult: 0,
        NotificationTargetARN: 0,
        RoleARN: 0,
      }),
      DeletionProtection: 0,
      Tags: D.list(i_Tag),
      ServiceLinkedRoleARN: 0,
      MaxInstanceLifetime: 0,
      Context: 0,
      DesiredCapacityType: 0,
      DefaultInstanceWarmup: 0,
      TrafficSources: D.list(i_TrafficSourceIdentifier),
      InstanceMaintenancePolicy: i_InstanceMaintenancePolicy,
      AvailabilityZoneDistribution: i_AvailabilityZoneDistribution,
      AvailabilityZoneImpairmentPolicy: i_AvailabilityZoneImpairmentPolicy,
      SkipZonalShiftValidation: 0,
      CapacityReservationSpecification: i_CapacityReservationSpecification,
      InstanceLifecyclePolicy: i_InstanceLifecyclePolicy,
      Operator: { Principal: 0 },
    },
  },
  errors: [
    AlreadyExistsFault,
    LimitExceededFault,
    ResourceContentionFault,
    ServiceLinkedRoleFailure,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoScalingGroup",
})) as any;

export type CreateLaunchConfigurationError =
  | AlreadyExistsFault
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Creates a launch configuration.
 *
 * If you exceed your maximum limit of launch configurations, the call fails. To query
 * this limit, call the DescribeAccountLimits API.
 * For information about updating this limit, see Quotas for
 * Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * For more information, see Launch
 * configurations in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * Amazon EC2 Auto Scaling configures instances launched as part of an Auto Scaling group using either a
 * launch template or a launch configuration. We strongly recommend that you do not use
 * launch configurations. They do not provide full functionality for Amazon EC2 Auto Scaling or Amazon EC2.
 * For information about using launch templates, see Launch templates in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const createLaunchConfiguration: API.OperationMethod<
  CreateLaunchConfigurationType,
  CreateLaunchConfigurationResponse,
  CreateLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LaunchConfigurationName: 0,
      ImageId: 0,
      KeyName: 0,
      SecurityGroups: 0,
      ClassicLinkVPCId: 0,
      ClassicLinkVPCSecurityGroups: 0,
      UserData: 0,
      InstanceId: 0,
      InstanceType: 0,
      KernelId: 0,
      RamdiskId: 0,
      BlockDeviceMappings: D.list({
        VirtualName: 0,
        DeviceName: 0,
        Ebs: {
          SnapshotId: 0,
          VolumeSize: 0,
          VolumeType: 0,
          DeleteOnTermination: 0,
          Iops: 0,
          Encrypted: 0,
          Throughput: 0,
        },
        NoDevice: 0,
      }),
      InstanceMonitoring: { Enabled: 0 },
      SpotPrice: 0,
      IamInstanceProfile: 0,
      EbsOptimized: 0,
      AssociatePublicIpAddress: 0,
      PlacementTenancy: 0,
      MetadataOptions: {
        HttpTokens: 0,
        HttpPutResponseHopLimit: 0,
        HttpEndpoint: 0,
      },
    },
  },
  errors: [AlreadyExistsFault, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLaunchConfiguration",
})) as any;

export type CreateOrUpdateTagsError =
  | AlreadyExistsFault
  | LimitExceededFault
  | ResourceContentionFault
  | ResourceInUseFault
  | CommonErrors;
/**
 * Creates or updates tags for the specified Auto Scaling group.
 *
 * When you specify a tag with a key that already exists, the operation overwrites the
 * previous tag definition, and you do not get an error message.
 *
 * For more information, see Tag Auto Scaling groups and
 * instances in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const createOrUpdateTags: API.OperationMethod<
  CreateOrUpdateTagsType,
  CreateOrUpdateTagsResponse,
  CreateOrUpdateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Tags: D.list(i_Tag) } },
  errors: [
    AlreadyExistsFault,
    LimitExceededFault,
    ResourceContentionFault,
    ResourceInUseFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrUpdateTags",
})) as any;

export type DeleteAutoScalingGroupError =
  | ResourceContentionFault
  | ResourceInUseFault
  | ScalingActivityInProgressFault
  | CommonErrors;
/**
 * Deletes the specified Auto Scaling group.
 *
 * If the group has instances or scaling activities in progress, you must specify the
 * option to force the deletion in order for it to succeed. The force delete operation will
 * also terminate the EC2 instances. If the group has a warm pool, the force delete option
 * also deletes the warm pool.
 *
 * To remove instances from the Auto Scaling group before deleting it, call the
 * DetachInstances API with the list of instances and the option to
 * decrement the desired capacity. This ensures that Amazon EC2 Auto Scaling does not launch replacement
 * instances.
 *
 * To terminate all instances before deleting the Auto Scaling group, call the
 * UpdateAutoScalingGroup API and set the minimum size and desired capacity
 * of the Auto Scaling group to
 * zero.
 *
 * If the group has scaling policies, deleting the group deletes the policies, the
 * underlying alarm actions, and any alarm that no longer has an associated action.
 *
 * For more information, see Delete your Auto Scaling
 * infrastructure in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const deleteAutoScalingGroup: API.OperationMethod<
  DeleteAutoScalingGroupType,
  DeleteAutoScalingGroupResponse,
  DeleteAutoScalingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, ForceDelete: 0 },
  },
  errors: [
    ResourceContentionFault,
    ResourceInUseFault,
    ScalingActivityInProgressFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutoScalingGroup",
})) as any;

export type DeleteLaunchConfigurationError =
  | ResourceContentionFault
  | ResourceInUseFault
  | CommonErrors;
/**
 * Deletes the specified launch configuration.
 *
 * The launch configuration must not be attached to an Auto Scaling group. When this call
 * completes, the launch configuration is no longer available for use.
 */
export const deleteLaunchConfiguration: API.OperationMethod<
  LaunchConfigurationNameType,
  DeleteLaunchConfigurationResponse,
  DeleteLaunchConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { LaunchConfigurationName: 0 } },
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchConfiguration",
})) as any;

export type DeleteLifecycleHookError =
  | ResourceContentionFault
  | AutoScalingGroupNotFound
  | CommonErrors;
/**
 * Deletes the specified lifecycle hook.
 *
 * If there are any outstanding lifecycle actions, they are completed first
 * (`ABANDON` for launching instances, `CONTINUE` for terminating
 * instances).
 */
export const deleteLifecycleHook: API.OperationMethod<
  DeleteLifecycleHookType,
  DeleteLifecycleHookAnswer,
  DeleteLifecycleHookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LifecycleHookName: 0, AutoScalingGroupName: 0 },
  },
  errors: [ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecycleHook",
})) as any;

export type DeleteNotificationConfigurationError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Deletes the specified notification.
 */
export const deleteNotificationConfiguration: API.OperationMethod<
  DeleteNotificationConfigurationType,
  DeleteNotificationConfigurationResponse,
  DeleteNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AutoScalingGroupName: 0, TopicARN: 0 } },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationConfiguration",
})) as any;

export type DeletePolicyError =
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * Deletes the specified scaling policy.
 *
 * Deleting either a step scaling policy or a simple scaling policy deletes the
 * underlying alarm action, but does not delete the alarm, even if it no longer has an
 * associated action.
 *
 * For more information, see Delete a scaling
 * policy in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyType,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, PolicyName: 0 },
  },
  errors: [ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
})) as any;

export type DeleteScheduledActionError =
  | ResourceContentionFault
  | AutoScalingGroupNotFound
  | CommonErrors;
/**
 * Deletes the specified scheduled action.
 */
export const deleteScheduledAction: API.OperationMethod<
  DeleteScheduledActionType,
  DeleteScheduledActionResponse,
  DeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, ScheduledActionName: 0 },
  },
  errors: [ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
})) as any;

export type DeleteTagsError =
  | ResourceContentionFault
  | ResourceInUseFault
  | CommonErrors;
/**
 * Deletes the specified tags.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsType,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Tags: D.list(i_Tag) } },
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

export type DeleteWarmPoolError =
  | LimitExceededFault
  | ResourceContentionFault
  | ResourceInUseFault
  | ScalingActivityInProgressFault
  | CommonErrors;
/**
 * Deletes the warm pool for the specified Auto Scaling group.
 *
 * For more information, see Warm pools for
 * Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const deleteWarmPool: API.OperationMethod<
  DeleteWarmPoolType,
  DeleteWarmPoolAnswer,
  DeleteWarmPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, ForceDelete: 0 },
  },
  errors: [
    LimitExceededFault,
    ResourceContentionFault,
    ResourceInUseFault,
    ScalingActivityInProgressFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWarmPool",
})) as any;

export type DescribeAccountLimitsError = ResourceContentionFault | CommonErrors;
/**
 * Describes the current Amazon EC2 Auto Scaling resource quotas for your account.
 *
 * When you establish an Amazon Web Services account, the account has initial quotas on the maximum
 * number of Auto Scaling groups and launch configurations that you can create in a given Region.
 * For more information, see Quotas for
 * Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const describeAccountLimits: API.OperationMethod<
  DescribeAccountLimitsRequest,
  DescribeAccountLimitsAnswer,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: {
      MaxNumberOfAutoScalingGroups: D.num,
      MaxNumberOfLaunchConfigurations: D.num,
      NumberOfAutoScalingGroups: D.num,
      NumberOfLaunchConfigurations: D.num,
    },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
})) as any;

export type DescribeAdjustmentTypesError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Describes the available adjustment types for step scaling and simple scaling
 * policies.
 *
 * The following adjustment types are supported:
 *
 * - `ChangeInCapacity`
 *
 * - `ExactCapacity`
 *
 * - `PercentChangeInCapacity`
 */
export const describeAdjustmentTypes: API.OperationMethod<
  DescribeAdjustmentTypesRequest,
  DescribeAdjustmentTypesAnswer,
  DescribeAdjustmentTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { AdjustmentTypes: D.list({}) } },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAdjustmentTypes",
})) as any;

export type DescribeAutoScalingGroupsError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about the Auto Scaling groups in the account and Region.
 *
 * If you specify Auto Scaling group names, the output includes information for only the
 * specified Auto Scaling groups. If you specify filters, the output includes information for only
 * those Auto Scaling groups that meet the filter criteria. If you do not specify group names or
 * filters, the output includes information for all Auto Scaling groups.
 *
 * This operation also returns information about instances in Auto Scaling groups. To retrieve
 * information about the instances in a warm pool, you must call the
 * DescribeWarmPool API.
 */
export const describeAutoScalingGroups: API.PaginatedOperationMethod<
  AutoScalingGroupNamesType,
  AutoScalingGroupsType,
  DescribeAutoScalingGroupsError,
  Credentials | HttpClient.HttpClient,
  AutoScalingGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupNames: 0,
      IncludeInstances: 0,
      NextToken: 0,
      MaxRecords: 0,
      Filters: D.list(i_Filter),
    },
    output: {
      AutoScalingGroups: D.list({
        LaunchTemplate: {},
        MixedInstancesPolicy: o_MixedInstancesPolicy,
        MinSize: D.num,
        MaxSize: D.num,
        DesiredCapacity: D.num,
        PredictedCapacity: D.num,
        DefaultCooldown: D.num,
        AvailabilityZones: D.list(),
        AvailabilityZoneIds: D.list(),
        LoadBalancerNames: D.list(),
        TargetGroupARNs: D.list(),
        HealthCheckGracePeriod: D.num,
        Instances: D.list(o_Instance),
        CreatedTime: D.ts,
        SuspendedProcesses: D.list({}),
        EnabledMetrics: D.list({}),
        Tags: D.list(o_TagDescription),
        TerminationPolicies: D.list(),
        NewInstancesProtectedFromScaleIn: D.bool,
        MaxInstanceLifetime: D.num,
        CapacityRebalance: D.bool,
        WarmPoolConfiguration: o_WarmPoolConfiguration,
        WarmPoolSize: D.num,
        DefaultInstanceWarmup: D.num,
        TrafficSources: D.list({}),
        InstanceMaintenancePolicy: {
          MinHealthyPercentage: D.num,
          MaxHealthyPercentage: D.num,
        },
        AvailabilityZoneDistribution: {},
        AvailabilityZoneImpairmentPolicy: { ZonalShiftEnabled: D.bool },
        CapacityReservationSpecification: {
          CapacityReservationTarget: {
            CapacityReservationIds: D.list(),
            CapacityReservationResourceGroupArns: D.list(),
          },
        },
        InstanceLifecyclePolicy: { RetentionTriggers: {} },
        Operator: {},
      }),
    },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoScalingGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AutoScalingGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeAutoScalingInstancesError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about the Auto Scaling instances in the account and Region.
 */
export const describeAutoScalingInstances: API.PaginatedOperationMethod<
  DescribeAutoScalingInstancesType,
  AutoScalingInstancesType,
  DescribeAutoScalingInstancesError,
  Credentials | HttpClient.HttpClient,
  AutoScalingInstanceDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { InstanceIds: 0, MaxRecords: 0, NextToken: 0 },
    output: {
      AutoScalingInstances: D.list({
        LaunchTemplate: {},
        ProtectedFromScaleIn: D.bool,
      }),
    },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoScalingInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AutoScalingInstances",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeAutoScalingNotificationTypesError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Describes the notification types that are supported by Amazon EC2 Auto Scaling.
 */
export const describeAutoScalingNotificationTypes: API.OperationMethod<
  DescribeAutoScalingNotificationTypesRequest,
  DescribeAutoScalingNotificationTypesAnswer,
  DescribeAutoScalingNotificationTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: { AutoScalingNotificationTypes: D.list() },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoScalingNotificationTypes",
})) as any;

export type DescribeInstanceRefreshesError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about the instance refreshes for the specified Auto Scaling group from the
 * previous six weeks.
 *
 * This operation is part of the instance refresh
 * feature in Amazon EC2 Auto Scaling, which helps you update instances in your Auto Scaling group
 * after you make configuration changes.
 *
 * To help you determine the status of an instance refresh, Amazon EC2 Auto Scaling returns information
 * about the instance refreshes you previously initiated, including their status, start
 * time, end time, the percentage of the instance refresh that is complete, and the number
 * of instances remaining to update before the instance refresh is complete. If a rollback
 * is initiated while an instance refresh is in progress, Amazon EC2 Auto Scaling also returns information
 * about the rollback of the instance refresh.
 */
export const describeInstanceRefreshes: API.PaginatedOperationMethod<
  DescribeInstanceRefreshesType,
  DescribeInstanceRefreshesAnswer,
  DescribeInstanceRefreshesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      InstanceRefreshIds: 0,
      NextToken: 0,
      MaxRecords: 0,
    },
    output: {
      InstanceRefreshes: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        PercentageComplete: D.num,
        InstancesToUpdate: D.num,
        ProgressDetails: o_InstanceRefreshProgressDetails,
        Preferences: {
          MinHealthyPercentage: D.num,
          InstanceWarmup: D.num,
          CheckpointPercentages: D.list(D.num),
          CheckpointDelay: D.num,
          SkipMatching: D.bool,
          AutoRollback: D.bool,
          AlarmSpecification: { Alarms: D.list() },
          MaxHealthyPercentage: D.num,
          BakeTime: D.num,
        },
        DesiredConfiguration: {
          LaunchTemplate: {},
          MixedInstancesPolicy: o_MixedInstancesPolicy,
        },
        RollbackDetails: {
          RollbackStartTime: D.ts,
          PercentageCompleteOnRollback: D.num,
          InstancesToUpdateOnRollback: D.num,
          ProgressDetailsOnRollback: o_InstanceRefreshProgressDetails,
        },
      }),
    },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceRefreshes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeLaunchConfigurationsError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about the launch configurations in the account and Region.
 */
export const describeLaunchConfigurations: API.PaginatedOperationMethod<
  LaunchConfigurationNamesType,
  LaunchConfigurationsType,
  DescribeLaunchConfigurationsError,
  Credentials | HttpClient.HttpClient,
  LaunchConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { LaunchConfigurationNames: 0, NextToken: 0, MaxRecords: 0 },
    output: {
      LaunchConfigurations: D.list({
        SecurityGroups: D.list(),
        ClassicLinkVPCSecurityGroups: D.list(),
        BlockDeviceMappings: D.list({
          Ebs: {
            VolumeSize: D.num,
            DeleteOnTermination: D.bool,
            Iops: D.num,
            Encrypted: D.bool,
            Throughput: D.num,
          },
          NoDevice: D.bool,
        }),
        InstanceMonitoring: { Enabled: D.bool },
        CreatedTime: D.ts,
        EbsOptimized: D.bool,
        AssociatePublicIpAddress: D.bool,
        MetadataOptions: { HttpPutResponseHopLimit: D.num },
      }),
    },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLaunchConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LaunchConfigurations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeLifecycleHooksError =
  | ResourceContentionFault
  | AutoScalingGroupNotFound
  | CommonErrors;
/**
 * Gets information about the lifecycle hooks for the specified Auto Scaling group.
 */
export const describeLifecycleHooks: API.OperationMethod<
  DescribeLifecycleHooksType,
  DescribeLifecycleHooksAnswer,
  DescribeLifecycleHooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, LifecycleHookNames: 0 },
    output: {
      LifecycleHooks: D.list({ HeartbeatTimeout: D.num, GlobalTimeout: D.num }),
    },
  },
  errors: [ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLifecycleHooks",
})) as any;

export type DescribeLifecycleHookTypesError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Describes the available types of lifecycle hooks.
 *
 * The following hook types are supported:
 *
 * - `autoscaling:EC2_INSTANCE_LAUNCHING`
 *
 * - `autoscaling:EC2_INSTANCE_TERMINATING`
 */
export const describeLifecycleHookTypes: API.OperationMethod<
  DescribeLifecycleHookTypesRequest,
  DescribeLifecycleHookTypesAnswer,
  DescribeLifecycleHookTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { LifecycleHookTypes: D.list() } },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLifecycleHookTypes",
})) as any;

export type DescribeLoadBalancersError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * This API operation is superseded by DescribeTrafficSources,
 * which can describe multiple traffic sources types. We recommend using
 * `DescribeTrafficSources` to simplify how you manage traffic sources.
 * However, we continue to support `DescribeLoadBalancers`. You can use both
 * the original `DescribeLoadBalancers` API operation and
 * `DescribeTrafficSources` on the same Auto Scaling group.
 *
 * Gets information about the load balancers for the specified Auto Scaling group.
 *
 * This operation describes only Classic Load Balancers. If you have Application Load Balancers, Network Load Balancers, or Gateway Load Balancers, use the
 * DescribeLoadBalancerTargetGroups API instead.
 *
 * To determine the attachment status of the load balancer, use the `State`
 * element in the response. When you attach a load balancer to an Auto Scaling group, the initial
 * `State` value is `Adding`. The state transitions to
 * `Added` after all Auto Scaling instances are registered with the load balancer.
 * If Elastic Load Balancing health checks are enabled for the Auto Scaling group, the state transitions to
 * `InService` after at least one Auto Scaling instance passes the health check.
 * When the load balancer is in the `InService` state, Amazon EC2 Auto Scaling can terminate
 * and replace any instances that are reported as unhealthy. If no registered instances
 * pass the health checks, the load balancer doesn't enter the `InService`
 * state.
 *
 * Load balancers also have an `InService` state if you attach them in the
 * CreateAutoScalingGroup API call. If your load balancer state is
 * `InService`, but it is not working properly, check the scaling activities
 * by calling DescribeScalingActivities and take any corrective actions
 * necessary.
 *
 * For help with failed health checks, see Troubleshooting Amazon EC2 Auto Scaling:
 * Health checks in the *Amazon EC2 Auto Scaling User Guide*. For more
 * information, see Use Elastic Load Balancing to
 * distribute traffic across the instances in your Auto Scaling group in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const describeLoadBalancers: API.PaginatedOperationMethod<
  DescribeLoadBalancersRequest,
  DescribeLoadBalancersResponse,
  DescribeLoadBalancersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, NextToken: 0, MaxRecords: 0 },
    output: { LoadBalancers: D.list({}) },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeLoadBalancerTargetGroupsError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * This API operation is superseded by DescribeTrafficSources,
 * which can describe multiple traffic sources types. We recommend using
 * `DetachTrafficSources` to simplify how you manage traffic sources.
 * However, we continue to support `DescribeLoadBalancerTargetGroups`. You
 * can use both the original `DescribeLoadBalancerTargetGroups` API
 * operation and `DescribeTrafficSources` on the same Auto Scaling group.
 *
 * Gets information about the Elastic Load Balancing target groups for the specified Auto Scaling group.
 *
 * To determine the attachment status of the target group, use the `State`
 * element in the response. When you attach a target group to an Auto Scaling group, the initial
 * `State` value is `Adding`. The state transitions to
 * `Added` after all Auto Scaling instances are registered with the target group. If
 * Elastic Load Balancing health checks are enabled for the Auto Scaling group, the state transitions to
 * `InService` after at least one Auto Scaling instance passes the health check.
 * When the target group is in the `InService` state, Amazon EC2 Auto Scaling can terminate and
 * replace any instances that are reported as unhealthy. If no registered instances pass
 * the health checks, the target group doesn't enter the `InService` state.
 *
 * Target groups also have an `InService` state if you attach them in the
 * CreateAutoScalingGroup API call. If your target group state is
 * `InService`, but it is not working properly, check the scaling activities
 * by calling DescribeScalingActivities and take any corrective actions
 * necessary.
 *
 * For help with failed health checks, see Troubleshooting Amazon EC2 Auto Scaling:
 * Health checks in the *Amazon EC2 Auto Scaling User Guide*. For more
 * information, see Use Elastic Load Balancing to
 * distribute traffic across the instances in your Auto Scaling group in the
 * *Amazon EC2 Auto Scaling User Guide*.
 *
 * You can use this operation to describe target groups that were attached by using
 * AttachLoadBalancerTargetGroups, but not for target groups that
 * were attached by using AttachTrafficSources.
 */
export const describeLoadBalancerTargetGroups: API.PaginatedOperationMethod<
  DescribeLoadBalancerTargetGroupsRequest,
  DescribeLoadBalancerTargetGroupsResponse,
  DescribeLoadBalancerTargetGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, NextToken: 0, MaxRecords: 0 },
    output: { LoadBalancerTargetGroups: D.list({}) },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerTargetGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeMetricCollectionTypesError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Describes the available CloudWatch metrics for Amazon EC2 Auto Scaling.
 */
export const describeMetricCollectionTypes: API.OperationMethod<
  DescribeMetricCollectionTypesRequest,
  DescribeMetricCollectionTypesAnswer,
  DescribeMetricCollectionTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    output: { Metrics: D.list({}), Granularities: D.list({}) },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricCollectionTypes",
})) as any;

export type DescribeNotificationConfigurationsError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about the Amazon SNS notifications that are configured for one or more
 * Auto Scaling groups.
 */
export const describeNotificationConfigurations: API.PaginatedOperationMethod<
  DescribeNotificationConfigurationsType,
  DescribeNotificationConfigurationsAnswer,
  DescribeNotificationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  NotificationConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupNames: 0, NextToken: 0, MaxRecords: 0 },
    output: { NotificationConfigurations: D.list({}) },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotificationConfigurations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePoliciesError =
  | InvalidNextToken
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * Gets information about the scaling policies in the account and Region.
 */
export const describePolicies: API.PaginatedOperationMethod<
  DescribePoliciesType,
  PoliciesType,
  DescribePoliciesError,
  Credentials | HttpClient.HttpClient,
  ScalingPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      PolicyNames: 0,
      PolicyTypes: 0,
      NextToken: 0,
      MaxRecords: 0,
    },
    output: {
      ScalingPolicies: D.list({
        MinAdjustmentStep: D.num,
        MinAdjustmentMagnitude: D.num,
        ScalingAdjustment: D.num,
        Cooldown: D.num,
        StepAdjustments: D.list({
          MetricIntervalLowerBound: D.num,
          MetricIntervalUpperBound: D.num,
          ScalingAdjustment: D.num,
        }),
        EstimatedInstanceWarmup: D.num,
        Alarms: D.list({}),
        TargetTrackingConfiguration: {
          PredefinedMetricSpecification: {},
          CustomizedMetricSpecification: {
            Dimensions: D.list({}),
            Period: D.num,
            Metrics: D.list({
              MetricStat: { Metric: o_Metric, Period: D.num },
              Period: D.num,
              ReturnData: D.bool,
            }),
          },
          TargetValue: D.num,
          DisableScaleIn: D.bool,
        },
        Enabled: D.bool,
        PredictiveScalingConfiguration: {
          MetricSpecifications: D.list(o_PredictiveScalingMetricSpecification),
          SchedulingBufferTime: D.num,
          MaxCapacityBuffer: D.num,
        },
      }),
    },
  },
  errors: [InvalidNextToken, ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalingPolicies",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeScalingActivitiesError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about the scaling activities in the account and Region.
 *
 * When scaling events occur, you see a record of the scaling activity in the scaling
 * activities. For more information, see Verify a scaling
 * activity for an Auto Scaling group in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * If the scaling event succeeds, the value of the `StatusCode` element in the
 * response is `Successful`. If an attempt to launch instances failed, the
 * `StatusCode` value is `Failed` or `Cancelled` and
 * the `StatusMessage` element in the response indicates the cause of the
 * failure. For help interpreting the `StatusMessage`, see Troubleshooting Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const describeScalingActivities: API.PaginatedOperationMethod<
  DescribeScalingActivitiesType,
  ActivitiesType,
  DescribeScalingActivitiesError,
  Credentials | HttpClient.HttpClient,
  Activity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ActivityIds: 0,
      AutoScalingGroupName: 0,
      IncludeDeletedGroups: 0,
      MaxRecords: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
    },
    output: { Activities: D.list(o_Activity) },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingActivities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Activities",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeScalingProcessTypesError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Describes the scaling process types for use with the ResumeProcesses
 * and SuspendProcesses APIs.
 */
export const describeScalingProcessTypes: API.OperationMethod<
  DescribeScalingProcessTypesRequest,
  ProcessesType,
  DescribeScalingProcessTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { Processes: D.list({}) } },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingProcessTypes",
})) as any;

export type DescribeScheduledActionsError =
  | InvalidNextToken
  | ResourceContentionFault
  | AutoScalingGroupNotFound
  | CommonErrors;
/**
 * Gets information about the scheduled actions that haven't run or that have not reached
 * their end time.
 *
 * To describe the scaling activities for scheduled actions that have already run, call
 * the DescribeScalingActivities API.
 */
export const describeScheduledActions: API.PaginatedOperationMethod<
  DescribeScheduledActionsType,
  ScheduledActionsType,
  DescribeScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledUpdateGroupAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      ScheduledActionNames: 0,
      StartTime: 0,
      EndTime: 0,
      NextToken: 0,
      MaxRecords: 0,
    },
    output: {
      ScheduledUpdateGroupActions: D.list({
        Time: D.ts,
        StartTime: D.ts,
        EndTime: D.ts,
        MinSize: D.num,
        MaxSize: D.num,
        DesiredCapacity: D.num,
      }),
    },
  },
  errors: [InvalidNextToken, ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduledUpdateGroupActions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTagsError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Describes the specified tags.
 *
 * You can use filters to limit the results. For example, you can query for the tags for
 * a specific Auto Scaling group. You can specify multiple values for a filter. A tag must match at
 * least one of the specified values for it to be included in the results.
 *
 * You can also specify multiple filters. The result includes information for a
 * particular tag only if it matches all the filters. If there's no match, no special
 * message is returned.
 *
 * For more information, see Tag Auto Scaling groups and
 * instances in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsType,
  TagsType,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  TagDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Filters: D.list(i_Filter), NextToken: 0, MaxRecords: 0 },
    output: { Tags: D.list(o_TagDescription) },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTerminationPolicyTypesError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Describes the termination policies supported by Amazon EC2 Auto Scaling.
 *
 * For more information, see Configure
 * termination policies for Amazon EC2 Auto Scaling in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const describeTerminationPolicyTypes: API.OperationMethod<
  DescribeTerminationPolicyTypesRequest,
  DescribeTerminationPolicyTypesAnswer,
  DescribeTerminationPolicyTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, output: { TerminationPolicyTypes: D.list() } },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTerminationPolicyTypes",
})) as any;

export type DescribeTrafficSourcesError =
  | InvalidNextToken
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about the traffic sources for the specified Auto Scaling group.
 *
 * You can optionally provide a traffic source type. If you provide a traffic source
 * type, then the results only include that traffic source type.
 *
 * If you do not provide a traffic source type, then the results include all the traffic
 * sources for the specified Auto Scaling group.
 */
export const describeTrafficSources: API.PaginatedOperationMethod<
  DescribeTrafficSourcesRequest,
  DescribeTrafficSourcesResponse,
  DescribeTrafficSourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      TrafficSourceType: 0,
      NextToken: 0,
      MaxRecords: 0,
    },
    output: { TrafficSources: D.list({}) },
  },
  errors: [InvalidNextToken, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrafficSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeWarmPoolError =
  | InvalidNextToken
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Gets information about a warm pool and its instances.
 *
 * For more information, see Warm pools for
 * Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const describeWarmPool: API.PaginatedOperationMethod<
  DescribeWarmPoolType,
  DescribeWarmPoolAnswer,
  DescribeWarmPoolError,
  Credentials | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, MaxRecords: 0, NextToken: 0 },
    output: {
      WarmPoolConfiguration: o_WarmPoolConfiguration,
      Instances: D.list(o_Instance),
    },
  },
  errors: [InvalidNextToken, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWarmPool",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Instances",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DetachInstancesError = ResourceContentionFault | CommonErrors;
/**
 * Removes one or more instances from the specified Auto Scaling group.
 *
 * After the instances are detached, you can manage them independent of the Auto Scaling
 * group.
 *
 * If you do not specify the option to decrement the desired capacity, Amazon EC2 Auto Scaling launches
 * instances to replace the ones that are detached.
 *
 * If there is a Classic Load Balancer attached to the Auto Scaling group, the instances are
 * deregistered from the load balancer. If there are target groups attached to the Auto Scaling
 * group, the instances are deregistered from the target groups.
 *
 * For more information, see Detach
 * or attach instances in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const detachInstances: API.OperationMethod<
  DetachInstancesQuery,
  DetachInstancesAnswer,
  DetachInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceIds: 0,
      AutoScalingGroupName: 0,
      ShouldDecrementDesiredCapacity: 0,
    },
    output: { Activities: D.list(o_Activity) },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachInstances",
})) as any;

export type DetachLoadBalancersError = ResourceContentionFault | CommonErrors;
/**
 * This API operation is superseded by DetachTrafficSources, which
 * can detach multiple traffic sources types. We recommend using
 * `DetachTrafficSources` to simplify how you manage traffic sources.
 * However, we continue to support `DetachLoadBalancers`. You can use both
 * the original `DetachLoadBalancers` API operation and
 * `DetachTrafficSources` on the same Auto Scaling group.
 *
 * Detaches one or more Classic Load Balancers from the specified Auto Scaling group.
 *
 * This operation detaches only Classic Load Balancers. If you have Application Load Balancers, Network Load Balancers, or
 * Gateway Load Balancers, use the DetachLoadBalancerTargetGroups API instead.
 *
 * When you detach a load balancer, it enters the `Removing` state while
 * deregistering the instances in the group. When all instances are deregistered, then you
 * can no longer describe the load balancer using the DescribeLoadBalancers
 * API call. The instances remain running.
 */
export const detachLoadBalancers: API.OperationMethod<
  DetachLoadBalancersType,
  DetachLoadBalancersResultType,
  DetachLoadBalancersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, LoadBalancerNames: 0 },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachLoadBalancers",
})) as any;

export type DetachLoadBalancerTargetGroupsError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * This API operation is superseded by DetachTrafficSources, which
 * can detach multiple traffic sources types. We recommend using
 * `DetachTrafficSources` to simplify how you manage traffic sources.
 * However, we continue to support `DetachLoadBalancerTargetGroups`. You can
 * use both the original `DetachLoadBalancerTargetGroups` API operation and
 * `DetachTrafficSources` on the same Auto Scaling group.
 *
 * Detaches one or more target groups from the specified Auto Scaling group.
 *
 * When you detach a target group, it enters the `Removing` state while
 * deregistering the instances in the group. When all instances are deregistered, then you
 * can no longer describe the target group using the
 * DescribeLoadBalancerTargetGroups
 * API call. The instances remain running.
 *
 * You can use this operation to detach target groups that were attached by using
 * AttachLoadBalancerTargetGroups, but not for target groups that
 * were attached by using AttachTrafficSources.
 */
export const detachLoadBalancerTargetGroups: API.OperationMethod<
  DetachLoadBalancerTargetGroupsType,
  DetachLoadBalancerTargetGroupsResultType,
  DetachLoadBalancerTargetGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, TargetGroupARNs: 0 },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachLoadBalancerTargetGroups",
})) as any;

export type DetachTrafficSourcesError = ResourceContentionFault | CommonErrors;
/**
 * Detaches one or more traffic sources from the specified Auto Scaling group.
 *
 * When you detach a traffic source, it enters the `Removing` state while
 * deregistering the instances in the group. When all instances are deregistered, then you
 * can no longer describe the traffic source using the
 * DescribeTrafficSources
 * API call. The instances continue to run.
 */
export const detachTrafficSources: API.OperationMethod<
  DetachTrafficSourcesType,
  DetachTrafficSourcesResultType,
  DetachTrafficSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      TrafficSources: D.list(i_TrafficSourceIdentifier),
    },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachTrafficSources",
})) as any;

export type DisableMetricsCollectionError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Disables group metrics collection for the specified Auto Scaling group.
 */
export const disableMetricsCollection: API.OperationMethod<
  DisableMetricsCollectionQuery,
  DisableMetricsCollectionResponse,
  DisableMetricsCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AutoScalingGroupName: 0, Metrics: 0 } },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableMetricsCollection",
})) as any;

export type EnableMetricsCollectionError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Enables group metrics collection for the specified Auto Scaling group.
 *
 * You can use these metrics to track changes in an Auto Scaling group and to set alarms on
 * threshold values. You can view group metrics using the Amazon EC2 Auto Scaling console or the CloudWatch
 * console. For more information, see Monitor
 * CloudWatch metrics for your Auto Scaling groups and instances in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const enableMetricsCollection: API.OperationMethod<
  EnableMetricsCollectionQuery,
  EnableMetricsCollectionResponse,
  EnableMetricsCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, Metrics: 0, Granularity: 0 },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableMetricsCollection",
})) as any;

export type EnterStandbyError = ResourceContentionFault | CommonErrors;
/**
 * Moves the specified instances into the standby state.
 *
 * If you choose to decrement the desired capacity of the Auto Scaling group, the instances can
 * enter standby as long as the desired capacity of the Auto Scaling group after the instances are
 * placed into standby is equal to or greater than the minimum capacity of the
 * group.
 *
 * If you choose not to decrement the desired capacity of the Auto Scaling group, the Auto Scaling group
 * launches new instances to replace the instances on standby.
 *
 * For more information, see Temporarily removing
 * instances from your Auto Scaling group in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const enterStandby: API.OperationMethod<
  EnterStandbyQuery,
  EnterStandbyAnswer,
  EnterStandbyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceIds: 0,
      AutoScalingGroupName: 0,
      ShouldDecrementDesiredCapacity: 0,
    },
    output: { Activities: D.list(o_Activity) },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnterStandby",
})) as any;

export type ExecutePolicyError =
  | ResourceContentionFault
  | ScalingActivityInProgressFault
  | CommonErrors;
/**
 * Executes the specified policy. This can be useful for testing the design of your
 * scaling policy.
 */
export const executePolicy: API.OperationMethod<
  ExecutePolicyType,
  ExecutePolicyResponse,
  ExecutePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      PolicyName: 0,
      HonorCooldown: 0,
      MetricValue: 0,
      BreachThreshold: 0,
    },
  },
  errors: [ResourceContentionFault, ScalingActivityInProgressFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecutePolicy",
})) as any;

export type ExitStandbyError = ResourceContentionFault | CommonErrors;
/**
 * Moves the specified instances out of the standby state.
 *
 * After you put the instances back in service, the desired capacity is
 * incremented.
 *
 * For more information, see Temporarily removing
 * instances from your Auto Scaling group in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const exitStandby: API.OperationMethod<
  ExitStandbyQuery,
  ExitStandbyAnswer,
  ExitStandbyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceIds: 0, AutoScalingGroupName: 0 },
    output: { Activities: D.list(o_Activity) },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExitStandby",
})) as any;

export type GetPredictiveScalingForecastError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Retrieves the forecast data for a predictive scaling policy.
 *
 * Load forecasts are predictions of the hourly load values using historical load data
 * from CloudWatch and an analysis of historical trends. Capacity forecasts are represented as
 * predicted values for the minimum capacity that is needed on an hourly basis, based on
 * the hourly load forecast.
 *
 * A minimum of 24 hours of data is required to create the initial forecasts. However,
 * having a full 14 days of historical data results in more accurate forecasts.
 *
 * For more information, see Predictive
 * scaling for Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const getPredictiveScalingForecast: API.OperationMethod<
  GetPredictiveScalingForecastType,
  GetPredictiveScalingForecastAnswer,
  GetPredictiveScalingForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, PolicyName: 0, StartTime: 0, EndTime: 0 },
    output: {
      LoadForecast: D.list({
        Timestamps: D.list(D.ts),
        Values: D.list(D.num),
        MetricSpecification: o_PredictiveScalingMetricSpecification,
      }),
      CapacityForecast: { Timestamps: D.list(D.ts), Values: D.list(D.num) },
      UpdateTime: D.ts,
    },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPredictiveScalingForecast",
})) as any;

export type LaunchInstancesError =
  | IdempotentCallInProgressFault
  | IdempotentParameterMismatchError
  | ResourceContentionFault
  | CommonErrors;
/**
 * Launches a specified number of instances in an Auto Scaling group. Returns instance IDs and
 * other details if launch is successful or error details if launch is unsuccessful.
 */
export const launchInstances: API.OperationMethod<
  LaunchInstancesRequest,
  LaunchInstancesResult,
  LaunchInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      RequestedCapacity: 0,
      ClientToken: D.m({ idempotency: true }),
      AvailabilityZones: 0,
      AvailabilityZoneIds: 0,
      SubnetIds: 0,
      RetryStrategy: 0,
    },
    output: {
      Instances: D.list({ InstanceIds: D.list() }),
      Errors: D.list({}),
    },
  },
  errors: [
    IdempotentCallInProgressFault,
    IdempotentParameterMismatchError,
    ResourceContentionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LaunchInstances",
})) as any;

export type PutLifecycleHookError =
  | LimitExceededFault
  | ResourceContentionFault
  | AutoScalingGroupNotFound
  | CommonErrors;
/**
 * Creates or updates a lifecycle hook for the specified Auto Scaling group.
 *
 * Lifecycle hooks let you create solutions that are aware of events in the Auto Scaling instance
 * lifecycle, and then perform a custom action on instances when the corresponding
 * lifecycle event occurs.
 *
 * This step is a part of the procedure for adding a lifecycle hook to an Auto Scaling
 * group:
 *
 * - (Optional) Create a launch template or launch configuration with a user data
 * script that runs while an instance is in a wait state due to a lifecycle
 * hook.
 *
 * - (Optional) Create a Lambda function and a rule that allows Amazon EventBridge to invoke
 * your Lambda function when an instance is put into a wait state due to a
 * lifecycle hook.
 *
 * - (Optional) Create a notification target and an IAM role. The target can be
 * either an Amazon SQS queue or an Amazon SNS topic. The role allows Amazon EC2 Auto Scaling to publish
 * lifecycle notifications to the target.
 *
 * - Create the lifecycle hook. Specify whether the hook is
 * used when the instances launch or terminate.
 *
 * - If you need more time, record the lifecycle action heartbeat to keep the
 * instance in a wait state using the RecordLifecycleActionHeartbeat API call.
 *
 * - If you finish before the timeout period ends, send a callback by using the
 * CompleteLifecycleAction API call.
 *
 * For more information, see Amazon EC2 Auto Scaling lifecycle
 * hooks in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * If you exceed your maximum limit of lifecycle hooks, which by default is 50 per Auto Scaling
 * group, the call fails.
 *
 * You can view the lifecycle hooks for an Auto Scaling group using the
 * DescribeLifecycleHooks API call. If you are no longer using a lifecycle
 * hook, you can delete it by calling the DeleteLifecycleHook API.
 */
export const putLifecycleHook: API.OperationMethod<
  PutLifecycleHookType,
  PutLifecycleHookAnswer,
  PutLifecycleHookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LifecycleHookName: 0,
      AutoScalingGroupName: 0,
      LifecycleTransition: 0,
      RoleARN: 0,
      NotificationTargetARN: 0,
      NotificationMetadata: 0,
      HeartbeatTimeout: 0,
      DefaultResult: 0,
    },
  },
  errors: [
    LimitExceededFault,
    ResourceContentionFault,
    AutoScalingGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecycleHook",
})) as any;

export type PutNotificationConfigurationError =
  | LimitExceededFault
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * Configures an Auto Scaling group to send notifications when specified events take place.
 * Subscribers to the specified topic can have messages delivered to an endpoint such as a
 * web server or an email address.
 *
 * This configuration overwrites any existing configuration.
 *
 * For more information, see Amazon SNS
 * notification options for Amazon EC2 Auto Scaling in the
 * *Amazon EC2 Auto Scaling User Guide*.
 *
 * If you exceed your maximum limit of SNS topics, which is 10 per Auto Scaling group, the call
 * fails.
 */
export const putNotificationConfiguration: API.OperationMethod<
  PutNotificationConfigurationType,
  PutNotificationConfigurationResponse,
  PutNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, TopicARN: 0, NotificationTypes: 0 },
  },
  errors: [
    LimitExceededFault,
    ResourceContentionFault,
    ServiceLinkedRoleFailure,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutNotificationConfiguration",
})) as any;

export type PutScalingPolicyError =
  | LimitExceededFault
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * Creates or updates a scaling policy for an Auto Scaling group. Scaling policies are used to
 * scale an Auto Scaling group based on configurable metrics. If no policies are defined, the
 * dynamic scaling and predictive scaling features are not used.
 *
 * For more information about using dynamic scaling, see Target tracking
 * scaling policies and Step and simple scaling
 * policies in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * For more information about using predictive scaling, see Predictive
 * scaling for Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * You can view the scaling policies for an Auto Scaling group using the
 * DescribePolicies API call. If you are no longer using a scaling policy,
 * you can delete it by calling the DeletePolicy API.
 */
export const putScalingPolicy: API.OperationMethod<
  PutScalingPolicyType,
  PolicyARNType,
  PutScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      PolicyName: 0,
      PolicyType: 0,
      AdjustmentType: 0,
      MinAdjustmentStep: 0,
      MinAdjustmentMagnitude: 0,
      ScalingAdjustment: 0,
      Cooldown: 0,
      MetricAggregationType: 0,
      StepAdjustments: D.list({
        MetricIntervalLowerBound: 0,
        MetricIntervalUpperBound: 0,
        ScalingAdjustment: 0,
      }),
      EstimatedInstanceWarmup: 0,
      TargetTrackingConfiguration: {
        PredefinedMetricSpecification: {
          PredefinedMetricType: 0,
          ResourceLabel: 0,
        },
        CustomizedMetricSpecification: {
          MetricName: 0,
          Namespace: 0,
          Dimensions: D.list(i_MetricDimension),
          Statistic: 0,
          Unit: 0,
          Period: 0,
          Metrics: D.list({
            Id: 0,
            Expression: 0,
            MetricStat: { Metric: i_Metric, Stat: 0, Unit: 0, Period: 0 },
            Label: 0,
            Period: 0,
            ReturnData: 0,
          }),
        },
        TargetValue: 0,
        DisableScaleIn: 0,
      },
      Enabled: 0,
      PredictiveScalingConfiguration: {
        MetricSpecifications: D.list({
          TargetValue: 0,
          PredefinedMetricPairSpecification: {
            PredefinedMetricType: 0,
            ResourceLabel: 0,
          },
          PredefinedScalingMetricSpecification: {
            PredefinedMetricType: 0,
            ResourceLabel: 0,
          },
          PredefinedLoadMetricSpecification: {
            PredefinedMetricType: 0,
            ResourceLabel: 0,
          },
          CustomizedScalingMetricSpecification: {
            MetricDataQueries: D.list(i_MetricDataQuery),
          },
          CustomizedLoadMetricSpecification: {
            MetricDataQueries: D.list(i_MetricDataQuery),
          },
          CustomizedCapacityMetricSpecification: {
            MetricDataQueries: D.list(i_MetricDataQuery),
          },
        }),
        Mode: 0,
        SchedulingBufferTime: 0,
        MaxCapacityBreachBehavior: 0,
        MaxCapacityBuffer: 0,
      },
    },
    output: { Alarms: D.list({}) },
  },
  errors: [
    LimitExceededFault,
    ResourceContentionFault,
    ServiceLinkedRoleFailure,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScalingPolicy",
})) as any;

export type PutScheduledUpdateGroupActionError =
  | AlreadyExistsFault
  | LimitExceededFault
  | ResourceContentionFault
  | AutoScalingGroupNotFound
  | CommonErrors;
/**
 * Creates or updates a scheduled scaling action for an Auto Scaling group.
 *
 * For more information, see Scheduled scaling in the
 * *Amazon EC2 Auto Scaling User Guide*.
 *
 * You can view the scheduled actions for an Auto Scaling group using the
 * DescribeScheduledActions
 * API call. If you are no longer using a scheduled action, you can delete it by calling the
 * DeleteScheduledAction API.
 *
 * If you try to schedule your action in the past, Amazon EC2 Auto Scaling returns an error
 * message.
 */
export const putScheduledUpdateGroupAction: API.OperationMethod<
  PutScheduledUpdateGroupActionType,
  PutScheduledUpdateGroupActionResponse,
  PutScheduledUpdateGroupActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      ScheduledActionName: 0,
      Time: 0,
      StartTime: 0,
      EndTime: 0,
      Recurrence: 0,
      MinSize: 0,
      MaxSize: 0,
      DesiredCapacity: 0,
      TimeZone: 0,
    },
  },
  errors: [
    AlreadyExistsFault,
    LimitExceededFault,
    ResourceContentionFault,
    AutoScalingGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScheduledUpdateGroupAction",
})) as any;

export type PutWarmPoolError =
  | InstanceRefreshInProgressFault
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Creates or updates a warm pool for the specified Auto Scaling group. A warm pool is a pool of
 * pre-initialized EC2 instances that sits alongside the Auto Scaling group. Whenever your
 * application needs to scale out, the Auto Scaling group can draw on the warm pool to meet its new
 * desired capacity.
 *
 * This operation must be called from the Region in which the Auto Scaling group was
 * created.
 *
 * You can view the instances in the warm pool using the DescribeWarmPool API call.
 * If you are no longer using a warm pool, you can delete it by calling the DeleteWarmPool API.
 *
 * For more information, see Warm pools for
 * Amazon EC2 Auto Scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const putWarmPool: API.OperationMethod<
  PutWarmPoolType,
  PutWarmPoolAnswer,
  PutWarmPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      MaxGroupPreparedCapacity: 0,
      MinSize: 0,
      PoolState: 0,
      InstanceReusePolicy: { ReuseOnScaleIn: 0 },
    },
  },
  errors: [
    InstanceRefreshInProgressFault,
    LimitExceededFault,
    ResourceContentionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWarmPool",
})) as any;

export type RecordLifecycleActionHeartbeatError =
  | ResourceContentionFault
  | CommonErrors;
/**
 * Records a heartbeat for the lifecycle action associated with the specified token or
 * instance. This extends the timeout by the length of time defined using the
 * PutLifecycleHook API call.
 *
 * This step is a part of the procedure for adding a lifecycle hook to an Auto Scaling
 * group:
 *
 * - (Optional) Create a launch template or launch configuration with a user data
 * script that runs while an instance is in a wait state due to a lifecycle
 * hook.
 *
 * - (Optional) Create a Lambda function and a rule that allows Amazon EventBridge to invoke
 * your Lambda function when an instance is put into a wait state due to a
 * lifecycle hook.
 *
 * - (Optional) Create a notification target and an IAM role. The target can be
 * either an Amazon SQS queue or an Amazon SNS topic. The role allows Amazon EC2 Auto Scaling to publish
 * lifecycle notifications to the target.
 *
 * - Create the lifecycle hook. Specify whether the hook is used when the instances
 * launch or terminate.
 *
 * - If you need more time, record the lifecycle action
 * heartbeat to keep the instance in a wait state.
 *
 * - If you finish before the timeout period ends, send a callback by using the
 * CompleteLifecycleAction API call.
 *
 * For more information, see Amazon EC2 Auto Scaling lifecycle
 * hooks in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const recordLifecycleActionHeartbeat: API.OperationMethod<
  RecordLifecycleActionHeartbeatType,
  RecordLifecycleActionHeartbeatAnswer,
  RecordLifecycleActionHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      LifecycleHookName: 0,
      AutoScalingGroupName: 0,
      LifecycleActionToken: 0,
      InstanceId: 0,
    },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecordLifecycleActionHeartbeat",
})) as any;

export type ResumeProcessesError =
  | ResourceContentionFault
  | ResourceInUseFault
  | CommonErrors;
/**
 * Resumes the specified suspended auto scaling processes, or all suspended process, for
 * the specified Auto Scaling group.
 *
 * For more information, see Suspend and resume
 * Amazon EC2 Auto Scaling processes in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const resumeProcesses: API.OperationMethod<
  ScalingProcessQuery,
  ResumeProcessesResponse,
  ResumeProcessesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, ScalingProcesses: 0 },
  },
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeProcesses",
})) as any;

export type RollbackInstanceRefreshError =
  | ActiveInstanceRefreshNotFoundFault
  | IrreversibleInstanceRefreshFault
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Cancels an instance refresh that is in progress and rolls back any changes that it
 * made. Amazon EC2 Auto Scaling replaces any instances that were replaced during the instance refresh.
 * This restores your Auto Scaling group to the configuration that it was using before the start of
 * the instance refresh.
 *
 * This operation is part of the instance refresh
 * feature in Amazon EC2 Auto Scaling, which helps you update instances in your Auto Scaling group
 * after you make configuration changes.
 *
 * A rollback is not supported in the following situations:
 *
 * - There is no desired configuration specified for the instance refresh.
 *
 * - The Auto Scaling group has a launch template that uses an Amazon Web Services Systems Manager parameter instead
 * of an AMI ID for the `ImageId` property.
 *
 * - The Auto Scaling group uses the launch template's `$Latest` or
 * `$Default` version.
 *
 * When you receive a successful response from this operation, Amazon EC2 Auto Scaling immediately
 * begins replacing instances. You can check the status of this operation through the
 * DescribeInstanceRefreshes API operation.
 */
export const rollbackInstanceRefresh: API.OperationMethod<
  RollbackInstanceRefreshType,
  RollbackInstanceRefreshAnswer,
  RollbackInstanceRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AutoScalingGroupName: 0 } },
  errors: [
    ActiveInstanceRefreshNotFoundFault,
    IrreversibleInstanceRefreshFault,
    LimitExceededFault,
    ResourceContentionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackInstanceRefresh",
})) as any;

export type SetDesiredCapacityError =
  | ResourceContentionFault
  | ScalingActivityInProgressFault
  | CommonErrors;
/**
 * Sets the size of the specified Auto Scaling group.
 *
 * If a scale-in activity occurs as a result of a new `DesiredCapacity` value
 * that is lower than the current size of the group, the Auto Scaling group uses its termination
 * policy to determine which instances to terminate.
 *
 * For more information, see Manual
 * scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const setDesiredCapacity: API.OperationMethod<
  SetDesiredCapacityType,
  SetDesiredCapacityResponse,
  SetDesiredCapacityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, DesiredCapacity: 0, HonorCooldown: 0 },
  },
  errors: [ResourceContentionFault, ScalingActivityInProgressFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDesiredCapacity",
})) as any;

export type SetInstanceHealthError = ResourceContentionFault | CommonErrors;
/**
 * Sets the health status of the specified instance.
 *
 * For more information, see Set up a custom
 * health check for your Auto Scaling group in the
 * *Amazon EC2 Auto Scaling User Guide*.
 */
export const setInstanceHealth: API.OperationMethod<
  SetInstanceHealthQuery,
  SetInstanceHealthResponse,
  SetInstanceHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceId: 0, HealthStatus: 0, ShouldRespectGracePeriod: 0 },
  },
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetInstanceHealth",
})) as any;

export type SetInstanceProtectionError =
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Updates the instance protection settings of the specified instances. This operation
 * cannot be called on instances in a warm pool.
 *
 * For more information, see Use
 * instance scale-in protection in the
 * *Amazon EC2 Auto Scaling User Guide*.
 *
 * If you exceed your maximum limit of instance IDs, which is 50 per Auto Scaling group, the call
 * fails.
 */
export const setInstanceProtection: API.OperationMethod<
  SetInstanceProtectionQuery,
  SetInstanceProtectionAnswer,
  SetInstanceProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceIds: 0, AutoScalingGroupName: 0, ProtectedFromScaleIn: 0 },
  },
  errors: [LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetInstanceProtection",
})) as any;

export type StartInstanceRefreshError =
  | InstanceRefreshInProgressFault
  | LimitExceededFault
  | ResourceContentionFault
  | CommonErrors;
/**
 * Starts an instance refresh.
 *
 * This operation is part of the instance refresh
 * feature in Amazon EC2 Auto Scaling, which helps you update instances in your Auto Scaling group.
 * This feature is helpful, for example, when you have a new AMI or a new user data script.
 * You just need to create a new launch template that specifies the new AMI or user data
 * script. Then start an instance refresh to immediately begin the process of updating
 * instances in the group.
 *
 * If successful, the request's response contains a unique ID that you can use to track
 * the progress of the instance refresh. To query its status, call the DescribeInstanceRefreshes API.
 * To describe the instance refreshes that
 * have already run, call the DescribeInstanceRefreshes API. To cancel an
 * instance refresh that is in progress, use the CancelInstanceRefresh
 * API.
 *
 * An instance refresh might fail for several reasons, such as EC2 launch failures,
 * misconfigured health checks, or not ignoring or allowing the termination of instances
 * that are in `Standby` state or protected from scale in. You can monitor for
 * failed EC2 launches using the scaling activities. To find the scaling activities, call
 * the DescribeScalingActivities API.
 *
 * If you enable auto rollback, your Auto Scaling group will be rolled back automatically when
 * the instance refresh fails. You can enable this feature before starting an instance
 * refresh by specifying the `AutoRollback` property in the instance refresh
 * preferences. Otherwise, to roll back an instance refresh before it finishes, use the
 * RollbackInstanceRefresh API.
 */
export const startInstanceRefresh: API.OperationMethod<
  StartInstanceRefreshType,
  StartInstanceRefreshAnswer,
  StartInstanceRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      Strategy: 0,
      DesiredConfiguration: {
        LaunchTemplate: i_LaunchTemplateSpecification,
        MixedInstancesPolicy: i_MixedInstancesPolicy,
      },
      Preferences: {
        MinHealthyPercentage: 0,
        InstanceWarmup: 0,
        CheckpointPercentages: 0,
        CheckpointDelay: 0,
        SkipMatching: 0,
        AutoRollback: 0,
        ScaleInProtectedInstances: 0,
        StandbyInstances: 0,
        AlarmSpecification: { Alarms: 0 },
        MaxHealthyPercentage: 0,
        BakeTime: 0,
      },
    },
  },
  errors: [
    InstanceRefreshInProgressFault,
    LimitExceededFault,
    ResourceContentionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInstanceRefresh",
})) as any;

export type SuspendProcessesError =
  | ResourceContentionFault
  | ResourceInUseFault
  | CommonErrors;
/**
 * Suspends the specified auto scaling processes, or all processes, for the specified
 * Auto Scaling group.
 *
 * If you suspend either the `Launch` or `Terminate` process types,
 * it can prevent other process types from functioning properly. For more information, see
 * Suspend and resume
 * Amazon EC2 Auto Scaling processes in the *Amazon EC2 Auto Scaling User Guide*.
 *
 * To resume processes that have been suspended, call the ResumeProcesses API.
 */
export const suspendProcesses: API.OperationMethod<
  ScalingProcessQuery,
  SuspendProcessesResponse,
  SuspendProcessesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AutoScalingGroupName: 0, ScalingProcesses: 0 },
  },
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SuspendProcesses",
})) as any;

export type TerminateInstanceInAutoScalingGroupError =
  | ResourceContentionFault
  | ScalingActivityInProgressFault
  | CommonErrors;
/**
 * Terminates the specified instance and optionally adjusts the desired group size. This
 * operation cannot be called on instances in a warm pool.
 *
 * This call simply makes a termination request. The instances are not terminated
 * immediately. When an instance is terminated, the instance status changes to
 * `terminated`. You can't connect to or start an instance after you've
 * terminated it.
 *
 * If you do not specify the option to decrement the desired capacity, Amazon EC2 Auto Scaling launches
 * instances to replace the ones that are terminated.
 *
 * To terminate multiple instances in a single call, use the `InstanceIds`
 * and `AutoScalingGroupName` parameters instead of `InstanceId`.
 * When terminating multiple instances, the response populates
 * `Activities` instead of `Activity`.
 *
 * By default, Amazon EC2 Auto Scaling balances instances across all Availability Zones. If you
 * decrement the desired capacity, your Auto Scaling group can become unbalanced between
 * Availability Zones. Amazon EC2 Auto Scaling tries to rebalance the group, and rebalancing might
 * terminate instances in other zones. For more information, see Manual
 * scaling in the *Amazon EC2 Auto Scaling User Guide*.
 */
export const terminateInstanceInAutoScalingGroup: API.OperationMethod<
  TerminateInstanceInAutoScalingGroupType,
  ActivityType,
  TerminateInstanceInAutoScalingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InstanceId: 0,
      InstanceIds: 0,
      AutoScalingGroupName: 0,
      ShouldDecrementDesiredCapacity: 0,
    },
    output: { Activity: o_Activity, Activities: D.list(o_Activity) },
  },
  errors: [ResourceContentionFault, ScalingActivityInProgressFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateInstanceInAutoScalingGroup",
})) as any;

export type UpdateAutoScalingGroupError =
  | ResourceContentionFault
  | ScalingActivityInProgressFault
  | ServiceLinkedRoleFailure
  | CommonErrors;
/**
 * **We strongly recommend that all Auto Scaling groups use launch templates to ensure full functionality for Amazon EC2 Auto Scaling and Amazon EC2.**
 *
 * Updates the configuration for the specified Auto Scaling group.
 *
 * To update an Auto Scaling group, specify the name of the group and the property that you want
 * to change. Any properties that you don't specify are not changed by this update request.
 * The new settings take effect on any scaling activities after this call returns.
 *
 * If you associate a new launch configuration or template with an Auto Scaling group, all new
 * instances will get the updated configuration. Existing instances continue to run with
 * the configuration that they were originally launched with. When you update a group to
 * specify a mixed instances policy instead of a launch configuration or template, existing
 * instances may be replaced to match the new purchasing options that you specified in the
 * policy. For example, if the group currently has 100% On-Demand capacity and the policy
 * specifies 50% Spot capacity, this means that half of your instances will be gradually
 * terminated and relaunched as Spot Instances. When replacing instances, Amazon EC2 Auto Scaling launches
 * new instances before terminating the old ones, so that updating your group does not
 * compromise the performance or availability of your application.
 *
 * Note the following about changing `DesiredCapacity`, `MaxSize`,
 * or `MinSize`:
 *
 * - If a scale-in activity occurs as a result of a new
 * `DesiredCapacity` value that is lower than the current size of
 * the group, the Auto Scaling group uses its termination policy to determine which
 * instances to terminate.
 *
 * - If you specify a new value for `MinSize` without specifying a value
 * for `DesiredCapacity`, and the new `MinSize` is larger
 * than the current size of the group, this sets the group's
 * `DesiredCapacity` to the new `MinSize` value.
 *
 * - If you specify a new value for `MaxSize` without specifying a value
 * for `DesiredCapacity`, and the new `MaxSize` is smaller
 * than the current size of the group, this sets the group's
 * `DesiredCapacity` to the new `MaxSize` value.
 *
 * To see which properties have been set, call the DescribeAutoScalingGroups API.
 * To view the scaling policies for an Auto Scaling
 * group, call the DescribePolicies API. If the group has scaling
 * policies, you can update them by calling the PutScalingPolicy API.
 */
export const updateAutoScalingGroup: API.OperationMethod<
  UpdateAutoScalingGroupType,
  UpdateAutoScalingGroupResponse,
  UpdateAutoScalingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AutoScalingGroupName: 0,
      LaunchConfigurationName: 0,
      LaunchTemplate: i_LaunchTemplateSpecification,
      MixedInstancesPolicy: i_MixedInstancesPolicy,
      MinSize: 0,
      MaxSize: 0,
      DesiredCapacity: 0,
      DefaultCooldown: 0,
      AvailabilityZones: 0,
      AvailabilityZoneIds: 0,
      HealthCheckType: 0,
      HealthCheckGracePeriod: 0,
      PlacementGroup: 0,
      VPCZoneIdentifier: 0,
      TerminationPolicies: 0,
      NewInstancesProtectedFromScaleIn: 0,
      ServiceLinkedRoleARN: 0,
      MaxInstanceLifetime: 0,
      CapacityRebalance: 0,
      Context: 0,
      DesiredCapacityType: 0,
      DefaultInstanceWarmup: 0,
      InstanceMaintenancePolicy: i_InstanceMaintenancePolicy,
      AvailabilityZoneDistribution: i_AvailabilityZoneDistribution,
      AvailabilityZoneImpairmentPolicy: i_AvailabilityZoneImpairmentPolicy,
      SkipZonalShiftValidation: 0,
      CapacityReservationSpecification: i_CapacityReservationSpecification,
      InstanceLifecyclePolicy: i_InstanceLifecyclePolicy,
      DeletionProtection: 0,
    },
  },
  errors: [
    ResourceContentionFault,
    ScalingActivityInProgressFault,
    ServiceLinkedRoleFailure,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutoScalingGroup",
})) as any;

const i_AvailabilityZoneDistribution: D.LazyStruct = () => ({
  CapacityDistributionStrategy: 0,
});
const i_AvailabilityZoneImpairmentPolicy: D.LazyStruct = () => ({
  ZonalShiftEnabled: 0,
  ImpairedZoneHealthCheckBehavior: 0,
});
const i_CapacityReservationSpecification: D.LazyStruct = () => ({
  CapacityReservationPreference: 0,
  CapacityReservationTarget: {
    CapacityReservationIds: 0,
    CapacityReservationResourceGroupArns: 0,
  },
});
const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_InstanceLifecyclePolicy: D.LazyStruct = () => ({
  RetentionTriggers: { TerminateHookAbandon: 0 },
});
const i_InstanceMaintenancePolicy: D.LazyStruct = () => ({
  MinHealthyPercentage: 0,
  MaxHealthyPercentage: 0,
});
const i_LaunchTemplateSpecification: D.LazyStruct = () => ({
  LaunchTemplateId: 0,
  LaunchTemplateName: 0,
  Version: 0,
});
const i_Metric: D.LazyStruct = () => ({
  Namespace: 0,
  MetricName: 0,
  Dimensions: D.list(i_MetricDimension),
});
const i_MetricDataQuery: D.LazyStruct = () => ({
  Id: 0,
  Expression: 0,
  MetricStat: { Metric: i_Metric, Stat: 0, Unit: 0 },
  Label: 0,
  ReturnData: 0,
});
const i_MetricDimension: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_MixedInstancesPolicy: D.LazyStruct = () => ({
  LaunchTemplate: {
    LaunchTemplateSpecification: i_LaunchTemplateSpecification,
    Overrides: D.list({
      InstanceType: 0,
      WeightedCapacity: 0,
      LaunchTemplateSpecification: i_LaunchTemplateSpecification,
      InstanceRequirements: {
        VCpuCount: { Min: 0, Max: 0 },
        MemoryMiB: { Min: 0, Max: 0 },
        CpuManufacturers: 0,
        MemoryGiBPerVCpu: { Min: 0, Max: 0 },
        ExcludedInstanceTypes: 0,
        InstanceGenerations: 0,
        SpotMaxPricePercentageOverLowestPrice: 0,
        MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: 0,
        OnDemandMaxPricePercentageOverLowestPrice: 0,
        BareMetal: 0,
        BurstablePerformance: 0,
        RequireHibernateSupport: 0,
        NetworkInterfaceCount: { Min: 0, Max: 0 },
        LocalStorage: 0,
        LocalStorageTypes: 0,
        TotalLocalStorageGB: { Min: 0, Max: 0 },
        BaselineEbsBandwidthMbps: { Min: 0, Max: 0 },
        AcceleratorTypes: 0,
        AcceleratorCount: { Min: 0, Max: 0 },
        AcceleratorManufacturers: 0,
        AcceleratorNames: 0,
        AcceleratorTotalMemoryMiB: { Min: 0, Max: 0 },
        NetworkBandwidthGbps: { Min: 0, Max: 0 },
        AllowedInstanceTypes: 0,
        BaselinePerformanceFactors: {
          Cpu: {
            References: D.m({
              wire: "Reference",
              shape: D.list({ InstanceFamily: 0 }, { item: "item" }),
            }),
          },
        },
      },
      ImageId: 0,
    }),
  },
  InstancesDistribution: {
    OnDemandAllocationStrategy: 0,
    OnDemandBaseCapacity: 0,
    OnDemandPercentageAboveBaseCapacity: 0,
    SpotAllocationStrategy: 0,
    SpotInstancePools: 0,
    SpotMaxPrice: 0,
    DistributionSegments: D.list({ TargetCapacityTypes: 0 }),
  },
});
const i_Tag: D.LazyStruct = () => ({
  ResourceId: 0,
  ResourceType: 0,
  Key: 0,
  Value: 0,
  PropagateAtLaunch: 0,
});
const i_TrafficSourceIdentifier: D.LazyStruct = () => ({
  Identifier: 0,
  Type: 0,
});
const o_Activity: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  Progress: D.num,
});
const o_Instance: D.LazyStruct = () => ({
  LaunchTemplate: {},
  ProtectedFromScaleIn: D.bool,
});
const o_InstanceRefreshProgressDetails: D.LazyStruct = () => ({
  LivePoolProgress: { PercentageComplete: D.num, InstancesToUpdate: D.num },
  WarmPoolProgress: { PercentageComplete: D.num, InstancesToUpdate: D.num },
});
const o_Metric: D.LazyStruct = () => ({ Dimensions: D.list({}) });
const o_MixedInstancesPolicy: D.LazyStruct = () => ({
  LaunchTemplate: {
    LaunchTemplateSpecification: {},
    Overrides: D.list({
      LaunchTemplateSpecification: {},
      InstanceRequirements: {
        VCpuCount: { Min: D.num, Max: D.num },
        MemoryMiB: { Min: D.num, Max: D.num },
        CpuManufacturers: D.list(),
        MemoryGiBPerVCpu: { Min: D.num, Max: D.num },
        ExcludedInstanceTypes: D.list(),
        InstanceGenerations: D.list(),
        SpotMaxPricePercentageOverLowestPrice: D.num,
        MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: D.num,
        OnDemandMaxPricePercentageOverLowestPrice: D.num,
        RequireHibernateSupport: D.bool,
        NetworkInterfaceCount: { Min: D.num, Max: D.num },
        LocalStorageTypes: D.list(),
        TotalLocalStorageGB: { Min: D.num, Max: D.num },
        BaselineEbsBandwidthMbps: { Min: D.num, Max: D.num },
        AcceleratorTypes: D.list(),
        AcceleratorCount: { Min: D.num, Max: D.num },
        AcceleratorManufacturers: D.list(),
        AcceleratorNames: D.list(),
        AcceleratorTotalMemoryMiB: { Min: D.num, Max: D.num },
        NetworkBandwidthGbps: { Min: D.num, Max: D.num },
        AllowedInstanceTypes: D.list(),
        BaselinePerformanceFactors: {
          Cpu: {
            References: D.m({
              wire: "Reference",
              shape: D.list({}, { item: "item" }),
            }),
          },
        },
      },
    }),
  },
  InstancesDistribution: {
    OnDemandBaseCapacity: D.num,
    OnDemandPercentageAboveBaseCapacity: D.num,
    SpotInstancePools: D.num,
    DistributionSegments: D.list({ TargetCapacityTypes: D.list() }),
  },
});
const o_PredictiveScalingMetricSpecification: D.LazyStruct = () => ({
  TargetValue: D.num,
  PredefinedMetricPairSpecification: {},
  PredefinedScalingMetricSpecification: {},
  PredefinedLoadMetricSpecification: {},
  CustomizedScalingMetricSpecification: {
    MetricDataQueries: D.list(o_MetricDataQuery),
  },
  CustomizedLoadMetricSpecification: {
    MetricDataQueries: D.list(o_MetricDataQuery),
  },
  CustomizedCapacityMetricSpecification: {
    MetricDataQueries: D.list(o_MetricDataQuery),
  },
});
const o_TagDescription: D.LazyStruct = () => ({ PropagateAtLaunch: D.bool });
const o_WarmPoolConfiguration: D.LazyStruct = () => ({
  MaxGroupPreparedCapacity: D.num,
  MinSize: D.num,
  InstanceReusePolicy: { ReuseOnScaleIn: D.bool },
});
const o_MetricDataQuery: D.LazyStruct = () => ({
  MetricStat: { Metric: o_Metric },
  ReturnData: D.bool,
});
