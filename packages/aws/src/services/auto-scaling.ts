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
const ns = /*@__PURE__*/ T.XmlNamespace("http://autoscaling.amazonaws.com/doc/2011-01-01/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Auto Scaling",
  serviceShapeName: "AutoScaling_2011_01_01",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "autoscaling" });
const ver = /*@__PURE__*/ T.ServiceVersion("2011-01-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsQuery();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://autoscaling.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://autoscaling.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://autoscaling.{R}.{D}","properties":{},"headers":{}}');

export class ActiveInstanceRefreshNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ActiveInstanceRefreshNotFoundFault>()(
    "ActiveInstanceRefreshNotFoundFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ActiveInstanceRefreshNotFound",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsFault>()(
    "AlreadyExistsFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AlreadyExists", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class AutoScalingGroupNotFound
  extends /*@__PURE__*/ S.TaggedError<AutoScalingGroupNotFound>()(
    "AutoScalingGroupNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({ from: "ValidationError", message: { includes: "not found" } }),
  ) {}
export class IdempotentCallInProgressFault
  extends /*@__PURE__*/ S.TaggedError<IdempotentCallInProgressFault>()(
    "IdempotentCallInProgressFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "IdempotentCallInProgress", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class IdempotentParameterMismatchError
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchError>()(
    "IdempotentParameterMismatchError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "IdempotentParameterMismatch", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InstanceRefreshInProgressFault
  extends /*@__PURE__*/ S.TaggedError<InstanceRefreshInProgressFault>()(
    "InstanceRefreshInProgressFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InstanceRefreshInProgress", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidIamInstanceProfile
  extends /*@__PURE__*/ S.TaggedError<InvalidIamInstanceProfile>()(
    "InvalidIamInstanceProfile",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationError",
      message: { includes: "Invalid IAM Instance Profile" },
    }),
  ) {}
export class InvalidNextToken
  extends /*@__PURE__*/ S.TaggedError<InvalidNextToken>()(
    "InvalidNextToken",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IrreversibleInstanceRefreshFault
  extends /*@__PURE__*/ S.TaggedError<IrreversibleInstanceRefreshFault>()(
    "IrreversibleInstanceRefreshFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "IrreversibleInstanceRefresh", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<LimitExceededFault>()(
    "LimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceContentionFault
  extends /*@__PURE__*/ S.TaggedError<ResourceContentionFault>()(
    "ResourceContentionFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceContention", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceInUseFault
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseFault>()(
    "ResourceInUseFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceInUse", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScalingActivityInProgressFault
  extends /*@__PURE__*/ S.TaggedError<ScalingActivityInProgressFault>()(
    "ScalingActivityInProgressFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ScalingActivityInProgress", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleFailure
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleFailure>()(
    "ServiceLinkedRoleFailure",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ServiceLinkedRoleFailure", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
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
export type FailedScheduledUpdateGroupActionRequests = FailedScheduledUpdateGroupActionRequest[];
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
export type ScheduledUpdateGroupActionRequests = ScheduledUpdateGroupActionRequest[];
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
export type CpuManufacturer = "intel" | "amd" | "amazon-web-services" | "apple" | (string & {});
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
export type BurstablePerformance = "included" | "excluded" | "required" | (string & {});
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
export type PerformanceFactorReferenceSetRequest = PerformanceFactorReferenceRequest[];
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
export type InstanceMetadataHttpTokensState = "optional" | "required" | (string & {});
export type InstanceMetadataHttpPutResponseHopLimit = number;
export type InstanceMetadataEndpointState = "disabled" | "enabled" | (string & {});
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
export type WarmPoolState = "Stopped" | "Running" | "Hibernated" | (string & {});
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
    TrafficSources: (TrafficSourceIdentifier & { Identifier: XmlStringMaxLen511 })[];
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
export type ScaleInProtectedInstances = "Refresh" | "Ignore" | "Wait" | (string & {});
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
    BlockDeviceMappings: (BlockDeviceMapping & { DeviceName: XmlStringMaxLen255 })[];
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
export type PredictiveScalingMetricSpecifications = PredictiveScalingMetricSpecification[];
export type PredictiveScalingMode = "ForecastAndScale" | "ForecastOnly" | (string & {});
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
    StepAdjustments: (StepAdjustment & { ScalingAdjustment: PolicyIncrement })[];
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
export type RetryStrategy = "retry-with-group-configuration" | "none" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<AttachInstancesQuery>,
  output: __S(1, __c0, 1) as any as S.Schema<AttachInstancesResponse>,
  errors: [ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachInstances",
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<AttachLoadBalancersType>,
  output: __S(65, __c2, 1) as any as S.Schema<AttachLoadBalancersResultType>,
  errors: [InstanceRefreshInProgressFault, ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancers",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<AttachLoadBalancerTargetGroupsType>,
  output: __S(129, __c4, 1) as any as S.Schema<AttachLoadBalancerTargetGroupsResultType>,
  errors: [InstanceRefreshInProgressFault, ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancerTargetGroups",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<AttachTrafficSourcesType>,
  output: __S(193, __c6, 1) as any as S.Schema<AttachTrafficSourcesResultType>,
  errors: [InstanceRefreshInProgressFault, ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachTrafficSources",
}));

export type BatchDeleteScheduledActionError = ResourceContentionFault | CommonErrors;
/**
 * Deletes one or more scheduled actions for the specified Auto Scaling group.
 */
export const batchDeleteScheduledAction: API.OperationMethod<
  BatchDeleteScheduledActionType,
  BatchDeleteScheduledActionAnswer,
  BatchDeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<BatchDeleteScheduledActionType>,
  output: __S(257, __c8, 1) as any as S.Schema<BatchDeleteScheduledActionAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteScheduledAction",
}));

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
  input: __S(354, __c11, 2) as any as S.Schema<BatchPutScheduledUpdateGroupActionType>,
  output: __S(355, __c11, 3) as any as S.Schema<BatchPutScheduledUpdateGroupActionAnswer>,
  errors: [AlreadyExistsFault, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutScheduledUpdateGroupAction",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<CancelInstanceRefreshType>,
  output: __S(385, __c12, 1) as any as S.Schema<CancelInstanceRefreshAnswer>,
  errors: [ActiveInstanceRefreshNotFoundFault, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelInstanceRefresh",
}));

export type CompleteLifecycleActionError = ResourceContentionFault | CommonErrors;
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
  input: __S(416, __c13, 0) as any as S.Schema<CompleteLifecycleActionType>,
  output: __S(417, __c13, 1) as any as S.Schema<CompleteLifecycleActionAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteLifecycleAction",
}));

export type CreateAutoScalingGroupError =
  | AlreadyExistsFault
  | LimitExceededFault
  | ResourceContentionFault
  | ServiceLinkedRoleFailure
  | InvalidIamInstanceProfile
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
  input: __S(450, __c14, 2) as any as S.Schema<CreateAutoScalingGroupType>,
  output: __S(451, __c14, 3) as any as S.Schema<CreateAutoScalingGroupResponse>,
  errors: [
    AlreadyExistsFault,
    LimitExceededFault,
    ResourceContentionFault,
    ServiceLinkedRoleFailure,
    InvalidIamInstanceProfile,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoScalingGroup",
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<CreateLaunchConfigurationType>,
  output: __S(673, __c21, 1) as any as S.Schema<CreateLaunchConfigurationResponse>,
  errors: [AlreadyExistsFault, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLaunchConfiguration",
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<CreateOrUpdateTagsType>,
  output: __S(737, __c23, 1) as any as S.Schema<CreateOrUpdateTagsResponse>,
  errors: [AlreadyExistsFault, LimitExceededFault, ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrUpdateTags",
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DeleteAutoScalingGroupType>,
  output: __S(769, __c24, 1) as any as S.Schema<DeleteAutoScalingGroupResponse>,
  errors: [ResourceContentionFault, ResourceInUseFault, ScalingActivityInProgressFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutoScalingGroup",
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<LaunchConfigurationNameType>,
  output: __S(801, __c25, 1) as any as S.Schema<DeleteLaunchConfigurationResponse>,
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLaunchConfiguration",
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteLifecycleHookType>,
  output: __S(833, __c26, 1) as any as S.Schema<DeleteLifecycleHookAnswer>,
  errors: [ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecycleHook",
}));

export type DeleteNotificationConfigurationError = ResourceContentionFault | CommonErrors;
/**
 * Deletes the specified notification.
 */
export const deleteNotificationConfiguration: API.OperationMethod<
  DeleteNotificationConfigurationType,
  DeleteNotificationConfigurationResponse,
  DeleteNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<DeleteNotificationConfigurationType>,
  output: __S(865, __c27, 1) as any as S.Schema<DeleteNotificationConfigurationResponse>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationConfiguration",
}));

export type DeletePolicyError = ResourceContentionFault | ServiceLinkedRoleFailure | CommonErrors;
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
  input: __S(896, __c28, 0) as any as S.Schema<DeletePolicyType>,
  output: __S(897, __c28, 1) as any as S.Schema<DeletePolicyResponse>,
  errors: [ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DeleteScheduledActionType>,
  output: __S(929, __c29, 1) as any as S.Schema<DeleteScheduledActionResponse>,
  errors: [ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
}));

export type DeleteTagsError = ResourceContentionFault | ResourceInUseFault | CommonErrors;
/**
 * Deletes the specified tags.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsType,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<DeleteTagsType>,
  output: __S(961, __c30, 1) as any as S.Schema<DeleteTagsResponse>,
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DeleteWarmPoolType>,
  output: __S(993, __c31, 1) as any as S.Schema<DeleteWarmPoolAnswer>,
  errors: [
    LimitExceededFault,
    ResourceContentionFault,
    ResourceInUseFault,
    ScalingActivityInProgressFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWarmPool",
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DescribeAccountLimitsRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<DescribeAccountLimitsAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
}));

export type DescribeAdjustmentTypesError = ResourceContentionFault | CommonErrors;
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
  input: __S(1056, __c33, 0) as any as S.Schema<DescribeAdjustmentTypesRequest>,
  output: __S(1059, __c33, 3) as any as S.Schema<DescribeAdjustmentTypesAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAdjustmentTypes",
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<AutoScalingGroupNamesType>,
  output: __S(1095, __c34, 7) as any as S.Schema<AutoScalingGroupsType>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<DescribeAutoScalingInstancesType>,
  output: __S(1283, __c40, 3) as any as S.Schema<AutoScalingInstancesType>,
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

export type DescribeAutoScalingNotificationTypesError = ResourceContentionFault | CommonErrors;
/**
 * Describes the notification types that are supported by Amazon EC2 Auto Scaling.
 */
export const describeAutoScalingNotificationTypes: API.OperationMethod<
  DescribeAutoScalingNotificationTypesRequest,
  DescribeAutoScalingNotificationTypesAnswer,
  DescribeAutoScalingNotificationTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<DescribeAutoScalingNotificationTypesRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<DescribeAutoScalingNotificationTypesAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoScalingNotificationTypes",
}));

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
  input: __S(1377, __c43, 1) as any as S.Schema<DescribeInstanceRefreshesType>,
  output: __S(1384, __c43, 8) as any as S.Schema<DescribeInstanceRefreshesAnswer>,
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
  input: __S(1441, __c45, 1) as any as S.Schema<LaunchConfigurationNamesType>,
  output: __S(1444, __c45, 4) as any as S.Schema<LaunchConfigurationsType>,
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
  input: __S(1473, __c46, 1) as any as S.Schema<DescribeLifecycleHooksType>,
  output: __S(1476, __c46, 4) as any as S.Schema<DescribeLifecycleHooksAnswer>,
  errors: [ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLifecycleHooks",
}));

export type DescribeLifecycleHookTypesError = ResourceContentionFault | CommonErrors;
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
  input: __S(1504, __c47, 0) as any as S.Schema<DescribeLifecycleHookTypesRequest>,
  output: __S(1505, __c47, 1) as any as S.Schema<DescribeLifecycleHookTypesAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLifecycleHookTypes",
}));

export type DescribeLoadBalancersError = InvalidNextToken | ResourceContentionFault | CommonErrors;
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
  input: __S(1536, __c48, 0) as any as S.Schema<DescribeLoadBalancersRequest>,
  output: __S(1539, __c48, 3) as any as S.Schema<DescribeLoadBalancersResponse>,
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
  input: __S(1568, __c49, 0) as any as S.Schema<DescribeLoadBalancerTargetGroupsRequest>,
  output: __S(1571, __c49, 3) as any as S.Schema<DescribeLoadBalancerTargetGroupsResponse>,
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

export type DescribeMetricCollectionTypesError = ResourceContentionFault | CommonErrors;
/**
 * Describes the available CloudWatch metrics for Amazon EC2 Auto Scaling.
 */
export const describeMetricCollectionTypes: API.OperationMethod<
  DescribeMetricCollectionTypesRequest,
  DescribeMetricCollectionTypesAnswer,
  DescribeMetricCollectionTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DescribeMetricCollectionTypesRequest>,
  output: __S(1605, __c50, 5) as any as S.Schema<DescribeMetricCollectionTypesAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricCollectionTypes",
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<DescribeNotificationConfigurationsType>,
  output: __S(1635, __c51, 3) as any as S.Schema<DescribeNotificationConfigurationsAnswer>,
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
  input: __S(1666, __c52, 2) as any as S.Schema<DescribePoliciesType>,
  output: __S(1669, __c52, 5) as any as S.Schema<PoliciesType>,
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
  input: __S(1761, __c55, 1) as any as S.Schema<DescribeScalingActivitiesType>,
  output: __S(1762, __c55, 2) as any as S.Schema<ActivitiesType>,
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

export type DescribeScalingProcessTypesError = ResourceContentionFault | CommonErrors;
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
  input: __S(1824, __c57, 0) as any as S.Schema<DescribeScalingProcessTypesRequest>,
  output: __S(1827, __c57, 3) as any as S.Schema<ProcessesType>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingProcessTypes",
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<DescribeScheduledActionsType>,
  output: __S(1859, __c58, 3) as any as S.Schema<ScheduledActionsType>,
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

export type DescribeTagsError = InvalidNextToken | ResourceContentionFault | CommonErrors;
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
  input: __S(1888, __c59, 0) as any as S.Schema<DescribeTagsType>,
  output: __S(1889, __c59, 1) as any as S.Schema<TagsType>,
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

export type DescribeTerminationPolicyTypesError = ResourceContentionFault | CommonErrors;
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
  input: __S(1920, __c60, 0) as any as S.Schema<DescribeTerminationPolicyTypesRequest>,
  output: __S(1921, __c60, 1) as any as S.Schema<DescribeTerminationPolicyTypesAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTerminationPolicyTypes",
}));

export type DescribeTrafficSourcesError = InvalidNextToken | ResourceContentionFault | CommonErrors;
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
  input: __S(1952, __c61, 0) as any as S.Schema<DescribeTrafficSourcesRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<DescribeTrafficSourcesResponse>,
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
  input: __S(1984, __c62, 0) as any as S.Schema<DescribeWarmPoolType>,
  output: __S(1985, __c62, 1) as any as S.Schema<DescribeWarmPoolAnswer>,
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
  input: __S(2016, __c63, 0) as any as S.Schema<DetachInstancesQuery>,
  output: __S(2017, __c63, 1) as any as S.Schema<DetachInstancesAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachInstances",
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<DetachLoadBalancersType>,
  output: __S(2049, __c64, 1) as any as S.Schema<DetachLoadBalancersResultType>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachLoadBalancers",
}));

export type DetachLoadBalancerTargetGroupsError = ResourceContentionFault | CommonErrors;
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
  input: __S(2080, __c65, 0) as any as S.Schema<DetachLoadBalancerTargetGroupsType>,
  output: __S(2081, __c65, 1) as any as S.Schema<DetachLoadBalancerTargetGroupsResultType>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachLoadBalancerTargetGroups",
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<DetachTrafficSourcesType>,
  output: __S(2113, __c66, 1) as any as S.Schema<DetachTrafficSourcesResultType>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachTrafficSources",
}));

export type DisableMetricsCollectionError = ResourceContentionFault | CommonErrors;
/**
 * Disables group metrics collection for the specified Auto Scaling group.
 */
export const disableMetricsCollection: API.OperationMethod<
  DisableMetricsCollectionQuery,
  DisableMetricsCollectionResponse,
  DisableMetricsCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<DisableMetricsCollectionQuery>,
  output: __S(2145, __c67, 1) as any as S.Schema<DisableMetricsCollectionResponse>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableMetricsCollection",
}));

export type EnableMetricsCollectionError = ResourceContentionFault | CommonErrors;
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
  input: __S(2208, __c69, 0) as any as S.Schema<EnableMetricsCollectionQuery>,
  output: __S(2209, __c69, 1) as any as S.Schema<EnableMetricsCollectionResponse>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableMetricsCollection",
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<EnterStandbyQuery>,
  output: __S(2241, __c70, 1) as any as S.Schema<EnterStandbyAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnterStandby",
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<ExecutePolicyType>,
  output: __S(2273, __c71, 1) as any as S.Schema<ExecutePolicyResponse>,
  errors: [ResourceContentionFault, ScalingActivityInProgressFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecutePolicy",
}));

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
  input: __S(2304, __c72, 0) as any as S.Schema<ExitStandbyQuery>,
  output: __S(2305, __c72, 1) as any as S.Schema<ExitStandbyAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExitStandby",
}));

export type GetPredictiveScalingForecastError = ResourceContentionFault | CommonErrors;
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
  input: __S(2336, __c73, 0) as any as S.Schema<GetPredictiveScalingForecastType>,
  output: __S(2342, __c73, 6) as any as S.Schema<GetPredictiveScalingForecastAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPredictiveScalingForecast",
}));

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
  input: __S(2371, __c74, 3) as any as S.Schema<LaunchInstancesRequest>,
  output: __S(2376, __c74, 8) as any as S.Schema<LaunchInstancesResult>,
  errors: [
    IdempotentCallInProgressFault,
    IdempotentParameterMismatchError,
    ResourceContentionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LaunchInstances",
}));

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
  input: __S(2400, __c75, 0) as any as S.Schema<PutLifecycleHookType>,
  output: __S(2401, __c75, 1) as any as S.Schema<PutLifecycleHookAnswer>,
  errors: [LimitExceededFault, ResourceContentionFault, AutoScalingGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecycleHook",
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<PutNotificationConfigurationType>,
  output: __S(2433, __c76, 1) as any as S.Schema<PutNotificationConfigurationResponse>,
  errors: [LimitExceededFault, ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutNotificationConfiguration",
}));

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
  input: __S(2464, __c77, 0) as any as S.Schema<PutScalingPolicyType>,
  output: __S(2465, __c77, 1) as any as S.Schema<PolicyARNType>,
  errors: [LimitExceededFault, ResourceContentionFault, ServiceLinkedRoleFailure],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScalingPolicy",
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<PutScheduledUpdateGroupActionType>,
  output: __S(2497, __c78, 1) as any as S.Schema<PutScheduledUpdateGroupActionResponse>,
  errors: [
    AlreadyExistsFault,
    LimitExceededFault,
    ResourceContentionFault,
    AutoScalingGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScheduledUpdateGroupAction",
}));

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
  input: __S(2528, __c79, 0) as any as S.Schema<PutWarmPoolType>,
  output: __S(2529, __c79, 1) as any as S.Schema<PutWarmPoolAnswer>,
  errors: [InstanceRefreshInProgressFault, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWarmPool",
}));

export type RecordLifecycleActionHeartbeatError = ResourceContentionFault | CommonErrors;
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
  input: __S(2560, __c80, 0) as any as S.Schema<RecordLifecycleActionHeartbeatType>,
  output: __S(2561, __c80, 1) as any as S.Schema<RecordLifecycleActionHeartbeatAnswer>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecordLifecycleActionHeartbeat",
}));

export type ResumeProcessesError = ResourceContentionFault | ResourceInUseFault | CommonErrors;
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
  input: __S(2625, __c82, 1) as any as S.Schema<ScalingProcessQuery>,
  output: __S(2592, __c81, 0) as any as S.Schema<ResumeProcessesResponse>,
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeProcesses",
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<RollbackInstanceRefreshType>,
  output: __S(2657, __c83, 1) as any as S.Schema<RollbackInstanceRefreshAnswer>,
  errors: [
    ActiveInstanceRefreshNotFoundFault,
    IrreversibleInstanceRefreshFault,
    LimitExceededFault,
    ResourceContentionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackInstanceRefresh",
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<SetDesiredCapacityType>,
  output: __S(2689, __c84, 1) as any as S.Schema<SetDesiredCapacityResponse>,
  errors: [ResourceContentionFault, ScalingActivityInProgressFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDesiredCapacity",
}));

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
  input: __S(2720, __c85, 0) as any as S.Schema<SetInstanceHealthQuery>,
  output: __S(2721, __c85, 1) as any as S.Schema<SetInstanceHealthResponse>,
  errors: [ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetInstanceHealth",
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<SetInstanceProtectionQuery>,
  output: __S(2753, __c86, 1) as any as S.Schema<SetInstanceProtectionAnswer>,
  errors: [LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetInstanceProtection",
}));

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
  input: __S(2784, __c87, 0) as any as S.Schema<StartInstanceRefreshType>,
  output: __S(2785, __c87, 1) as any as S.Schema<StartInstanceRefreshAnswer>,
  errors: [InstanceRefreshInProgressFault, LimitExceededFault, ResourceContentionFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInstanceRefresh",
}));

export type SuspendProcessesError = ResourceContentionFault | ResourceInUseFault | CommonErrors;
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
  input: __S(2625, __c82, 1) as any as S.Schema<ScalingProcessQuery>,
  output: __S(2816, __c88, 0) as any as S.Schema<SuspendProcessesResponse>,
  errors: [ResourceContentionFault, ResourceInUseFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SuspendProcesses",
}));

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
  input: __S(2849, __c89, 1) as any as S.Schema<TerminateInstanceInAutoScalingGroupType>,
  output: __S(2850, __c89, 2) as any as S.Schema<ActivityType>,
  errors: [ResourceContentionFault, ScalingActivityInProgressFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateInstanceInAutoScalingGroup",
}));

export type UpdateAutoScalingGroupError =
  | ResourceContentionFault
  | ScalingActivityInProgressFault
  | ServiceLinkedRoleFailure
  | InvalidIamInstanceProfile
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
  input: __S(2880, __c90, 0) as any as S.Schema<UpdateAutoScalingGroupType>,
  output: __S(2881, __c90, 1) as any as S.Schema<UpdateAutoScalingGroupResponse>,
  errors: [
    ResourceContentionFault,
    ScalingActivityInProgressFault,
    ServiceLinkedRoleFailure,
    InvalidIamInstanceProfile,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutoScalingGroup",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(32, __c1, 0)),
          AutoScalingGroupName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachInstancesQuery" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AttachInstancesResponse",
      });
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
          AutoScalingGroupName: S.optional(S.String),
          LoadBalancerNames: S.optional(__S(96, __c3, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachLoadBalancersType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AttachLoadBalancersResultType",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TargetGroupARNs: S.optional(__S(160, __c5, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachLoadBalancerTargetGroupsType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AttachLoadBalancerTargetGroupsResultType",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TrafficSources: S.optional(__S(225, __c7, 1)),
          SkipZonalShiftValidation: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachTrafficSourcesType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AttachTrafficSourcesResultType",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "TrafficSourceIdentifier" });
    case 1:
      return S.Array(__S(224, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ScheduledActionNames: S.optional(__S(320, __c10, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchDeleteScheduledActionType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FailedScheduledActions: S.optional(__S(289, __c9, 1)) }).pipe(ns),
      ).annotate({ identifier: "BatchDeleteScheduledActionAnswer" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionName: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedScheduledUpdateGroupActionRequest" });
    case 1:
      return S.Array(__S(288, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionName: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Recurrence: S.optional(S.String),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          DesiredCapacity: S.optional(S.Number),
          TimeZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledUpdateGroupActionRequest" });
    case 1:
      return S.Array(__S(352, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ScheduledUpdateGroupActions: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchPutScheduledUpdateGroupActionType" });
    case 3:
      return S.suspend(() =>
        S.Struct({ FailedScheduledUpdateGroupActions: S.optional(__S(289, __c9, 1)) }).pipe(ns),
      ).annotate({ identifier: "BatchPutScheduledUpdateGroupActionAnswer" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          WaitForTransitioningInstances: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelInstanceRefreshType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ InstanceRefreshId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CancelInstanceRefreshAnswer" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LifecycleHookName: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
          LifecycleActionToken: S.optional(S.String),
          LifecycleActionResult: S.optional(S.String),
          InstanceId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CompleteLifecycleActionType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CompleteLifecycleActionAnswer",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LifecycleHookName: S.optional(S.String),
          LifecycleTransition: S.optional(S.String),
          NotificationMetadata: S.optional(S.String),
          HeartbeatTimeout: S.optional(S.Number),
          DefaultResult: S.optional(S.String),
          NotificationTargetARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "LifecycleHookSpecification" });
    case 1:
      return S.Array(__S(448, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          LaunchConfigurationName: S.optional(S.String),
          LaunchTemplate: S.optional(__S(544, __c17, 0)),
          MixedInstancesPolicy: S.optional(__S(605, __c18, 29)),
          InstanceId: S.optional(S.String),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          DesiredCapacity: S.optional(S.Number),
          DefaultCooldown: S.optional(S.Number),
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          AvailabilityZoneIds: S.optional(__S(641, __c20, 1)),
          LoadBalancerNames: S.optional(__S(96, __c3, 0)),
          TargetGroupARNs: S.optional(__S(160, __c5, 0)),
          HealthCheckType: S.optional(S.String),
          HealthCheckGracePeriod: S.optional(S.Number),
          PlacementGroup: S.optional(S.String),
          VPCZoneIdentifier: S.optional(S.String),
          TerminationPolicies: S.optional(__S(608, __c19, 0)),
          NewInstancesProtectedFromScaleIn: S.optional(S.Boolean),
          CapacityRebalance: S.optional(S.Boolean),
          LifecycleHookSpecificationList: S.optional(__S(449, __c14, 1)),
          DeletionProtection: S.optional(S.String),
          Tags: S.optional(__S(481, __c15, 1)),
          ServiceLinkedRoleARN: S.optional(S.String),
          MaxInstanceLifetime: S.optional(S.Number),
          Context: S.optional(S.String),
          DesiredCapacityType: S.optional(S.String),
          DefaultInstanceWarmup: S.optional(S.Number),
          TrafficSources: S.optional(__S(225, __c7, 1)),
          InstanceMaintenancePolicy: S.optional(__S(642, __c20, 2)),
          AvailabilityZoneDistribution: S.optional(__S(643, __c20, 3)),
          AvailabilityZoneImpairmentPolicy: S.optional(__S(644, __c20, 4)),
          SkipZonalShiftValidation: S.optional(S.Boolean),
          CapacityReservationSpecification: S.optional(__S(648, __c20, 8)),
          InstanceLifecyclePolicy: S.optional(__S(650, __c20, 10)),
          Operator: S.optional(__S(512, __c16, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAutoScalingGroupType" });
    case 3:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateAutoScalingGroupResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          PropagateAtLaunch: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(480, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Principal: S.optional(S.String) })).annotate({
        identifier: "Operator",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplateId: S.optional(S.String),
          LaunchTemplateName: S.optional(S.String),
          Version: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchTemplateSpecification" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "VCpuCountRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "MemoryMiBRequest" });
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "MemoryGiBPerVCpuRequest" });
    case 4:
      return S.Array(S.String);
    case 5:
      return S.Array(S.String);
    case 6:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "NetworkInterfaceCountRequest" });
    case 7:
      return S.Array(S.String);
    case 8:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "TotalLocalStorageGBRequest" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "BaselineEbsBandwidthMbpsRequest" });
    case 10:
      return S.Array(S.String);
    case 11:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "AcceleratorCountRequest" });
    case 12:
      return S.Array(S.String);
    case 13:
      return S.Array(S.String);
    case 14:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "AcceleratorTotalMemoryMiBRequest" });
    case 15:
      return S.suspend(() =>
        S.Struct({ Min: S.optional(S.Number), Max: S.optional(S.Number) }),
      ).annotate({ identifier: "NetworkBandwidthGbpsRequest" });
    case 16:
      return S.Array(S.String);
    case 17:
      return S.suspend(() => S.Struct({ InstanceFamily: S.optional(S.String) })).annotate({
        identifier: "PerformanceFactorReferenceRequest",
      });
    case 18:
      return S.Array(
        /*@__PURE__*/ __S(593, __c18, 17)
          .pipe(/*@__PURE__*/ T.XmlName("item"))
          .annotate({ identifier: "PerformanceFactorReferenceRequest" }),
      );
    case 19:
      return S.suspend(() =>
        S.Struct({ References: S.optional(__S(594, __c18, 18)).pipe(T.XmlName("Reference")) }),
      ).annotate({ identifier: "CpuPerformanceFactorRequest" });
    case 20:
      return S.suspend(() => S.Struct({ Cpu: S.optional(__S(595, __c18, 19)) })).annotate({
        identifier: "BaselinePerformanceFactorsRequest",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({
          VCpuCount: S.optional(__S(576, __c18, 0)),
          MemoryMiB: S.optional(__S(577, __c18, 1)),
          CpuManufacturers: S.optional(__S(578, __c18, 2)),
          MemoryGiBPerVCpu: S.optional(__S(579, __c18, 3)),
          ExcludedInstanceTypes: S.optional(__S(580, __c18, 4)),
          InstanceGenerations: S.optional(__S(581, __c18, 5)),
          SpotMaxPricePercentageOverLowestPrice: S.optional(S.Number),
          MaxSpotPriceAsPercentageOfOptimalOnDemandPrice: S.optional(S.Number),
          OnDemandMaxPricePercentageOverLowestPrice: S.optional(S.Number),
          BareMetal: S.optional(S.String),
          BurstablePerformance: S.optional(S.String),
          RequireHibernateSupport: S.optional(S.Boolean),
          NetworkInterfaceCount: S.optional(__S(582, __c18, 6)),
          LocalStorage: S.optional(S.String),
          LocalStorageTypes: S.optional(__S(583, __c18, 7)),
          TotalLocalStorageGB: S.optional(__S(584, __c18, 8)),
          BaselineEbsBandwidthMbps: S.optional(__S(585, __c18, 9)),
          AcceleratorTypes: S.optional(__S(586, __c18, 10)),
          AcceleratorCount: S.optional(__S(587, __c18, 11)),
          AcceleratorManufacturers: S.optional(__S(588, __c18, 12)),
          AcceleratorNames: S.optional(__S(589, __c18, 13)),
          AcceleratorTotalMemoryMiB: S.optional(__S(590, __c18, 14)),
          NetworkBandwidthGbps: S.optional(__S(591, __c18, 15)),
          AllowedInstanceTypes: S.optional(__S(592, __c18, 16)),
          BaselinePerformanceFactors: S.optional(__S(596, __c18, 20)),
        }),
      ).annotate({ identifier: "InstanceRequirements" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          InstanceType: S.optional(S.String),
          WeightedCapacity: S.optional(S.String),
          LaunchTemplateSpecification: S.optional(__S(544, __c17, 0)),
          InstanceRequirements: S.optional(__S(597, __c18, 21)),
          ImageId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchTemplateOverrides" });
    case 23:
      return S.Array(__S(598, __c18, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplateSpecification: S.optional(__S(544, __c17, 0)),
          Overrides: S.optional(__S(599, __c18, 23)),
        }),
      ).annotate({ identifier: "LaunchTemplate" });
    case 25:
      return S.Array(S.String);
    case 26:
      return S.suspend(() =>
        S.Struct({ TargetCapacityTypes: S.optional(__S(601, __c18, 25)) }),
      ).annotate({ identifier: "DistributionSegment" });
    case 27:
      return S.Array(__S(602, __c18, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          OnDemandAllocationStrategy: S.optional(S.String),
          OnDemandBaseCapacity: S.optional(S.Number),
          OnDemandPercentageAboveBaseCapacity: S.optional(S.Number),
          SpotAllocationStrategy: S.optional(S.String),
          SpotInstancePools: S.optional(S.Number),
          SpotMaxPrice: S.optional(S.String),
          DistributionSegments: S.optional(__S(603, __c18, 27)),
        }),
      ).annotate({ identifier: "InstancesDistribution" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplate: S.optional(__S(600, __c18, 24)),
          InstancesDistribution: S.optional(__S(604, __c18, 28)),
        }),
      ).annotate({ identifier: "MixedInstancesPolicy" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          MinHealthyPercentage: S.optional(S.Number),
          MaxHealthyPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceMaintenancePolicy" });
    case 3:
      return S.suspend(() =>
        S.Struct({ CapacityDistributionStrategy: S.optional(S.String) }),
      ).annotate({ identifier: "AvailabilityZoneDistribution" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ZonalShiftEnabled: S.optional(S.Boolean),
          ImpairedZoneHealthCheckBehavior: S.optional(S.String),
        }),
      ).annotate({ identifier: "AvailabilityZoneImpairmentPolicy" });
    case 5:
      return S.Array(S.String);
    case 6:
      return S.Array(S.String);
    case 7:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationIds: S.optional(__S(645, __c20, 5)),
          CapacityReservationResourceGroupArns: S.optional(__S(646, __c20, 6)),
        }),
      ).annotate({ identifier: "CapacityReservationTarget" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          CapacityReservationPreference: S.optional(S.String),
          CapacityReservationTarget: S.optional(__S(647, __c20, 7)),
        }),
      ).annotate({ identifier: "CapacityReservationSpecification" });
    case 9:
      return S.suspend(() => S.Struct({ TerminateHookAbandon: S.optional(S.String) })).annotate({
        identifier: "RetentionTriggers",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ RetentionTriggers: S.optional(__S(649, __c20, 9)) }),
      ).annotate({ identifier: "InstanceLifecyclePolicy" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LaunchConfigurationName: S.optional(S.String),
          ImageId: S.optional(S.String),
          KeyName: S.optional(S.String),
          SecurityGroups: S.optional(__S(704, __c22, 0)),
          ClassicLinkVPCId: S.optional(S.String),
          ClassicLinkVPCSecurityGroups: S.optional(__S(705, __c22, 1)),
          UserData: S.optional(S.String),
          InstanceId: S.optional(S.String),
          InstanceType: S.optional(S.String),
          KernelId: S.optional(S.String),
          RamdiskId: S.optional(S.String),
          BlockDeviceMappings: S.optional(__S(708, __c22, 4)),
          InstanceMonitoring: S.optional(__S(709, __c22, 5)),
          SpotPrice: S.optional(S.String),
          IamInstanceProfile: S.optional(S.String),
          EbsOptimized: S.optional(S.Boolean),
          AssociatePublicIpAddress: S.optional(S.Boolean),
          PlacementTenancy: S.optional(S.String),
          MetadataOptions: S.optional(__S(710, __c22, 6)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLaunchConfigurationType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateLaunchConfigurationResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          SnapshotId: S.optional(S.String),
          VolumeSize: S.optional(S.Number),
          VolumeType: S.optional(S.String),
          DeleteOnTermination: S.optional(S.Boolean),
          Iops: S.optional(S.Number),
          Encrypted: S.optional(S.Boolean),
          Throughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Ebs" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          VirtualName: S.optional(S.String),
          DeviceName: S.optional(S.String),
          Ebs: S.optional(__S(706, __c22, 2)),
          NoDevice: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "BlockDeviceMapping" });
    case 4:
      return S.Array(__S(707, __c22, 3));
    case 5:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "InstanceMonitoring",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          HttpTokens: S.optional(S.String),
          HttpPutResponseHopLimit: S.optional(S.Number),
          HttpEndpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceMetadataOptions" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(481, __c15, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateOrUpdateTagsType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateOrUpdateTagsResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ForceDelete: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAutoScalingGroupType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAutoScalingGroupResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LaunchConfigurationName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "LaunchConfigurationNameType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteLaunchConfigurationResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LifecycleHookName: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteLifecycleHookType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteLifecycleHookAnswer",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TopicARN: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteNotificationConfigurationType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteNotificationConfigurationResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          PolicyName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeletePolicyType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeletePolicyResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ScheduledActionName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteScheduledActionType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteScheduledActionResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(481, __c15, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTagsType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "DeleteTagsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ForceDelete: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteWarmPoolType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteWarmPoolAnswer",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountLimitsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaxNumberOfAutoScalingGroups: S.optional(S.Number),
          MaxNumberOfLaunchConfigurations: S.optional(S.Number),
          NumberOfAutoScalingGroups: S.optional(S.Number),
          NumberOfLaunchConfigurations: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAccountLimitsAnswer" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAdjustmentTypesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AdjustmentType: S.optional(S.String) })).annotate({
        identifier: "AdjustmentType",
      });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ AdjustmentTypes: S.optional(__S(1058, __c33, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAdjustmentTypesAnswer" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupNames: S.optional(__S(1120, __c35, 0)),
          IncludeInstances: S.optional(S.Boolean),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          Filters: S.optional(__S(1154, __c36, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AutoScalingGroupNamesType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ProcessName: S.optional(S.String), SuspensionReason: S.optional(S.String) }),
      ).annotate({ identifier: "SuspendedProcess" });
    case 2:
      return S.Array(__S(1089, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Metric: S.optional(S.String), Granularity: S.optional(S.String) }),
      ).annotate({ identifier: "EnabledMetric" });
    case 4:
      return S.Array(__S(1091, __c34, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          AutoScalingGroupARN: S.optional(S.String),
          LaunchConfigurationName: S.optional(S.String),
          LaunchTemplate: S.optional(__S(544, __c17, 0)),
          MixedInstancesPolicy: S.optional(__S(605, __c18, 29)),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          DesiredCapacity: S.optional(S.Number),
          PredictedCapacity: S.optional(S.Number),
          DefaultCooldown: S.optional(S.Number),
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          AvailabilityZoneIds: S.optional(__S(641, __c20, 1)),
          LoadBalancerNames: S.optional(__S(96, __c3, 0)),
          TargetGroupARNs: S.optional(__S(160, __c5, 0)),
          HealthCheckType: S.optional(S.String),
          HealthCheckGracePeriod: S.optional(S.Number),
          Instances: S.optional(__S(1217, __c38, 1)),
          CreatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          SuspendedProcesses: S.optional(__S(1090, __c34, 2)),
          PlacementGroup: S.optional(S.String),
          VPCZoneIdentifier: S.optional(S.String),
          EnabledMetrics: S.optional(__S(1092, __c34, 4)),
          Status: S.optional(S.String),
          Tags: S.optional(__S(1185, __c37, 1)),
          TerminationPolicies: S.optional(__S(608, __c19, 0)),
          NewInstancesProtectedFromScaleIn: S.optional(S.Boolean),
          ServiceLinkedRoleARN: S.optional(S.String),
          MaxInstanceLifetime: S.optional(S.Number),
          CapacityRebalance: S.optional(S.Boolean),
          WarmPoolConfiguration: S.optional(__S(1218, __c38, 2)),
          WarmPoolSize: S.optional(S.Number),
          Context: S.optional(S.String),
          DesiredCapacityType: S.optional(S.String),
          DefaultInstanceWarmup: S.optional(S.Number),
          TrafficSources: S.optional(__S(225, __c7, 1)),
          InstanceMaintenancePolicy: S.optional(__S(642, __c20, 2)),
          DeletionProtection: S.optional(S.String),
          AvailabilityZoneDistribution: S.optional(__S(643, __c20, 3)),
          AvailabilityZoneImpairmentPolicy: S.optional(__S(644, __c20, 4)),
          CapacityReservationSpecification: S.optional(__S(648, __c20, 8)),
          InstanceLifecyclePolicy: S.optional(__S(650, __c20, 10)),
          Operator: S.optional(__S(512, __c16, 0)),
        }),
      ).annotate({ identifier: "AutoScalingGroup" });
    case 6:
      return S.Array(__S(1093, __c34, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroups: S.optional(__S(1094, __c34, 6)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AutoScalingGroupsType" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(1152, __c36, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          PropagateAtLaunch: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TagDescription" });
    case 1:
      return S.Array(__S(1184, __c37, 0));
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          InstanceType: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          LifecycleState: S.optional(S.String),
          HealthStatus: S.optional(S.String),
          LaunchConfigurationName: S.optional(S.String),
          LaunchTemplate: S.optional(__S(544, __c17, 0)),
          ImageId: S.optional(S.String),
          ProtectedFromScaleIn: S.optional(S.Boolean),
          WeightedCapacity: S.optional(S.String),
        }),
      ).annotate({ identifier: "Instance" });
    case 1:
      return S.Array(__S(1216, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxGroupPreparedCapacity: S.optional(S.Number),
          MinSize: S.optional(S.Number),
          PoolState: S.optional(S.String),
          Status: S.optional(S.String),
          InstanceReusePolicy: S.optional(__S(1248, __c39, 0)),
        }),
      ).annotate({ identifier: "WarmPoolConfiguration" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ReuseOnScaleIn: S.optional(S.Boolean) })).annotate({
        identifier: "InstanceReusePolicy",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(32, __c1, 0)),
          MaxRecords: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAutoScalingInstancesType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          InstanceType: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          LifecycleState: S.optional(S.String),
          HealthStatus: S.optional(S.String),
          LaunchConfigurationName: S.optional(S.String),
          LaunchTemplate: S.optional(__S(544, __c17, 0)),
          ImageId: S.optional(S.String),
          ProtectedFromScaleIn: S.optional(S.Boolean),
          WeightedCapacity: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutoScalingInstanceDetails" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutoScalingInstances: S.optional(__S(1282, __c40, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AutoScalingInstancesType" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAutoScalingNotificationTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AutoScalingNotificationTypes: S.optional(__S(1344, __c42, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAutoScalingNotificationTypesAnswer" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          InstanceRefreshIds: S.optional(__S(1376, __c43, 0)),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeInstanceRefreshesType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PercentageComplete: S.optional(S.Number),
          InstancesToUpdate: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceRefreshLivePoolProgress" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PercentageComplete: S.optional(S.Number),
          InstancesToUpdate: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceRefreshWarmPoolProgress" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          LivePoolProgress: S.optional(__S(1378, __c43, 2)),
          WarmPoolProgress: S.optional(__S(1379, __c43, 3)),
        }),
      ).annotate({ identifier: "InstanceRefreshProgressDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          RollbackReason: S.optional(S.String),
          RollbackStartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PercentageCompleteOnRollback: S.optional(S.Number),
          InstancesToUpdateOnRollback: S.optional(S.Number),
          ProgressDetailsOnRollback: S.optional(__S(1380, __c43, 4)),
        }),
      ).annotate({ identifier: "RollbackDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          InstanceRefreshId: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          PercentageComplete: S.optional(S.Number),
          InstancesToUpdate: S.optional(S.Number),
          ProgressDetails: S.optional(__S(1380, __c43, 4)),
          Preferences: S.optional(__S(1411, __c44, 3)),
          DesiredConfiguration: S.optional(__S(1412, __c44, 4)),
          RollbackDetails: S.optional(__S(1381, __c43, 5)),
          Strategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceRefresh" });
    case 7:
      return S.Array(__S(1382, __c43, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          InstanceRefreshes: S.optional(__S(1383, __c43, 7)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInstanceRefreshesAnswer" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() => S.Struct({ Alarms: S.optional(__S(1409, __c44, 1)) })).annotate({
        identifier: "AlarmSpecification",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MinHealthyPercentage: S.optional(S.Number),
          InstanceWarmup: S.optional(S.Number),
          CheckpointPercentages: S.optional(__S(1408, __c44, 0)),
          CheckpointDelay: S.optional(S.Number),
          SkipMatching: S.optional(S.Boolean),
          AutoRollback: S.optional(S.Boolean),
          ScaleInProtectedInstances: S.optional(S.String),
          StandbyInstances: S.optional(S.String),
          AlarmSpecification: S.optional(__S(1410, __c44, 2)),
          MaxHealthyPercentage: S.optional(S.Number),
          BakeTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RefreshPreferences" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          LaunchTemplate: S.optional(__S(544, __c17, 0)),
          MixedInstancesPolicy: S.optional(__S(605, __c18, 29)),
        }),
      ).annotate({ identifier: "DesiredConfiguration" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          LaunchConfigurationNames: S.optional(__S(1440, __c45, 0)),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "LaunchConfigurationNamesType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LaunchConfigurationName: S.optional(S.String),
          LaunchConfigurationARN: S.optional(S.String),
          ImageId: S.optional(S.String),
          KeyName: S.optional(S.String),
          SecurityGroups: S.optional(__S(704, __c22, 0)),
          ClassicLinkVPCId: S.optional(S.String),
          ClassicLinkVPCSecurityGroups: S.optional(__S(705, __c22, 1)),
          UserData: S.optional(S.String),
          InstanceType: S.optional(S.String),
          KernelId: S.optional(S.String),
          RamdiskId: S.optional(S.String),
          BlockDeviceMappings: S.optional(__S(708, __c22, 4)),
          InstanceMonitoring: S.optional(__S(709, __c22, 5)),
          SpotPrice: S.optional(S.String),
          IamInstanceProfile: S.optional(S.String),
          CreatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EbsOptimized: S.optional(S.Boolean),
          AssociatePublicIpAddress: S.optional(S.Boolean),
          PlacementTenancy: S.optional(S.String),
          MetadataOptions: S.optional(__S(710, __c22, 6)),
        }),
      ).annotate({ identifier: "LaunchConfiguration" });
    case 3:
      return S.Array(__S(1442, __c45, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          LaunchConfigurations: S.optional(__S(1443, __c45, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "LaunchConfigurationsType" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          LifecycleHookNames: S.optional(__S(1472, __c46, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLifecycleHooksType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LifecycleHookName: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
          LifecycleTransition: S.optional(S.String),
          NotificationTargetARN: S.optional(S.String),
          RoleARN: S.optional(S.String),
          NotificationMetadata: S.optional(S.String),
          HeartbeatTimeout: S.optional(S.Number),
          GlobalTimeout: S.optional(S.Number),
          DefaultResult: S.optional(S.String),
        }),
      ).annotate({ identifier: "LifecycleHook" });
    case 3:
      return S.Array(__S(1474, __c46, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ LifecycleHooks: S.optional(__S(1475, __c46, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeLifecycleHooksAnswer" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLifecycleHookTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LifecycleHookTypes: S.optional(__S(1344, __c42, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeLifecycleHookTypesAnswer" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLoadBalancersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "LoadBalancerState" });
    case 2:
      return S.Array(__S(1537, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LoadBalancers: S.optional(__S(1538, __c48, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeLoadBalancersResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLoadBalancerTargetGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LoadBalancerTargetGroupARN: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "LoadBalancerTargetGroupState" });
    case 2:
      return S.Array(__S(1569, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerTargetGroups: S.optional(__S(1570, __c49, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeLoadBalancerTargetGroupsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeMetricCollectionTypesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Metric: S.optional(S.String) })).annotate({
        identifier: "MetricCollectionType",
      });
    case 2:
      return S.Array(__S(1601, __c50, 1));
    case 3:
      return S.suspend(() => S.Struct({ Granularity: S.optional(S.String) })).annotate({
        identifier: "MetricGranularityType",
      });
    case 4:
      return S.Array(__S(1603, __c50, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Metrics: S.optional(__S(1602, __c50, 2)),
          Granularities: S.optional(__S(1604, __c50, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeMetricCollectionTypesAnswer" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupNames: S.optional(__S(1120, __c35, 0)),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeNotificationConfigurationsType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TopicARN: S.optional(S.String),
          NotificationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotificationConfiguration" });
    case 2:
      return S.Array(__S(1633, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NotificationConfigurations: S.optional(__S(1634, __c51, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeNotificationConfigurationsAnswer" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          PolicyNames: S.optional(__S(1664, __c52, 0)),
          PolicyTypes: S.optional(__S(1665, __c52, 1)),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribePoliciesType" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          PolicyName: S.optional(S.String),
          PolicyARN: S.optional(S.String),
          PolicyType: S.optional(S.String),
          AdjustmentType: S.optional(S.String),
          MinAdjustmentStep: S.optional(S.Number),
          MinAdjustmentMagnitude: S.optional(S.Number),
          ScalingAdjustment: S.optional(S.Number),
          Cooldown: S.optional(S.Number),
          StepAdjustments: S.optional(__S(1729, __c54, 1)),
          MetricAggregationType: S.optional(S.String),
          EstimatedInstanceWarmup: S.optional(S.Number),
          Alarms: S.optional(__S(1731, __c54, 3)),
          TargetTrackingConfiguration: S.optional(__S(1737, __c54, 9)),
          Enabled: S.optional(S.Boolean),
          PredictiveScalingConfiguration: S.optional(__S(1739, __c54, 11)),
        }),
      ).annotate({ identifier: "ScalingPolicy" });
    case 4:
      return S.Array(__S(1667, __c52, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ScalingPolicies: S.optional(__S(1668, __c52, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PoliciesType" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "MetricDimension" });
    case 1:
      return S.Array(__S(1696, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(1697, __c53, 1)),
        }),
      ).annotate({ identifier: "Metric" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PredefinedMetricType: S.optional(S.String),
          ResourceLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "PredictiveScalingPredefinedMetricPair" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PredefinedMetricType: S.optional(S.String),
          ResourceLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "PredictiveScalingPredefinedScalingMetric" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          PredefinedMetricType: S.optional(S.String),
          ResourceLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "PredictiveScalingPredefinedLoadMetric" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Metric: S.optional(__S(1698, __c53, 2)),
          Stat: S.optional(S.String),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricStat" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Expression: S.optional(S.String),
          MetricStat: S.optional(__S(1702, __c53, 6)),
          Label: S.optional(S.String),
          ReturnData: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MetricDataQuery" });
    case 8:
      return S.Array(__S(1703, __c53, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ MetricDataQueries: S.optional(__S(1704, __c53, 8)) }),
      ).annotate({ identifier: "PredictiveScalingCustomizedScalingMetric" });
    case 10:
      return S.suspend(() =>
        S.Struct({ MetricDataQueries: S.optional(__S(1704, __c53, 8)) }),
      ).annotate({ identifier: "PredictiveScalingCustomizedLoadMetric" });
    case 11:
      return S.suspend(() =>
        S.Struct({ MetricDataQueries: S.optional(__S(1704, __c53, 8)) }),
      ).annotate({ identifier: "PredictiveScalingCustomizedCapacityMetric" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          TargetValue: S.optional(S.Number),
          PredefinedMetricPairSpecification: S.optional(__S(1699, __c53, 3)),
          PredefinedScalingMetricSpecification: S.optional(__S(1700, __c53, 4)),
          PredefinedLoadMetricSpecification: S.optional(__S(1701, __c53, 5)),
          CustomizedScalingMetricSpecification: S.optional(__S(1705, __c53, 9)),
          CustomizedLoadMetricSpecification: S.optional(__S(1706, __c53, 10)),
          CustomizedCapacityMetricSpecification: S.optional(__S(1707, __c53, 11)),
        }),
      ).annotate({ identifier: "PredictiveScalingMetricSpecification" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetricIntervalLowerBound: S.optional(S.Number),
          MetricIntervalUpperBound: S.optional(S.Number),
          ScalingAdjustment: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StepAdjustment" });
    case 1:
      return S.Array(__S(1728, __c54, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ AlarmName: S.optional(S.String), AlarmARN: S.optional(S.String) }),
      ).annotate({ identifier: "Alarm" });
    case 3:
      return S.Array(__S(1730, __c54, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PredefinedMetricType: S.optional(S.String),
          ResourceLabel: S.optional(S.String),
        }),
      ).annotate({ identifier: "PredefinedMetricSpecification" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Metric: S.optional(__S(1698, __c53, 2)),
          Stat: S.optional(S.String),
          Unit: S.optional(S.String),
          Period: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TargetTrackingMetricStat" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Expression: S.optional(S.String),
          MetricStat: S.optional(__S(1733, __c54, 5)),
          Label: S.optional(S.String),
          Period: S.optional(S.Number),
          ReturnData: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TargetTrackingMetricDataQuery" });
    case 7:
      return S.Array(__S(1734, __c54, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
          Dimensions: S.optional(__S(1697, __c53, 1)),
          Statistic: S.optional(S.String),
          Unit: S.optional(S.String),
          Period: S.optional(S.Number),
          Metrics: S.optional(__S(1735, __c54, 7)),
        }),
      ).annotate({ identifier: "CustomizedMetricSpecification" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          PredefinedMetricSpecification: S.optional(__S(1732, __c54, 4)),
          CustomizedMetricSpecification: S.optional(__S(1736, __c54, 8)),
          TargetValue: S.optional(S.Number),
          DisableScaleIn: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TargetTrackingConfiguration" });
    case 10:
      return S.Array(__S(1708, __c53, 12));
    case 11:
      return S.suspend(() =>
        S.Struct({
          MetricSpecifications: S.optional(__S(1738, __c54, 10)),
          Mode: S.optional(S.String),
          SchedulingBufferTime: S.optional(S.Number),
          MaxCapacityBreachBehavior: S.optional(S.String),
          MaxCapacityBuffer: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PredictiveScalingConfiguration" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActivityIds: S.optional(__S(1760, __c55, 0)),
          AutoScalingGroupName: S.optional(S.String),
          IncludeDeletedGroups: S.optional(S.Boolean),
          MaxRecords: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(1154, __c36, 2)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScalingActivitiesType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Activities: S.optional(__S(1793, __c56, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ActivitiesType" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActivityId: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
          Description: S.optional(S.String),
          Cause: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StatusCode: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          Progress: S.optional(S.Number),
          Details: S.optional(S.String),
          AutoScalingGroupState: S.optional(S.String),
          AutoScalingGroupARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "Activity" });
    case 1:
      return S.Array(__S(1792, __c56, 0));
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeScalingProcessTypesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ProcessName: S.optional(S.String) })).annotate({
        identifier: "ProcessType",
      });
    case 2:
      return S.Array(__S(1825, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Processes: S.optional(__S(1826, __c57, 2)) }).pipe(ns),
      ).annotate({ identifier: "ProcessesType" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ScheduledActionNames: S.optional(__S(320, __c10, 0)),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScheduledActionsType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ScheduledActionName: S.optional(S.String),
          ScheduledActionARN: S.optional(S.String),
          Time: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Recurrence: S.optional(S.String),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          DesiredCapacity: S.optional(S.Number),
          TimeZone: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledUpdateGroupAction" });
    case 2:
      return S.Array(__S(1857, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScheduledUpdateGroupActions: S.optional(__S(1858, __c58, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ScheduledActionsType" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1154, __c36, 2)),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTagsType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(1185, __c37, 1)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "TagsType" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTerminationPolicyTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TerminationPolicyTypes: S.optional(__S(608, __c19, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeTerminationPolicyTypesAnswer" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TrafficSourceType: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTrafficSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TrafficSource: S.optional(S.String),
          State: S.optional(S.String),
          Identifier: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "TrafficSourceState" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TrafficSources: S.optional(__S(1954, __c61, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeTrafficSourcesResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeWarmPoolType" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          WarmPoolConfiguration: S.optional(__S(1218, __c38, 2)),
          Instances: S.optional(__S(1217, __c38, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeWarmPoolAnswer" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(32, __c1, 0)),
          AutoScalingGroupName: S.optional(S.String),
          ShouldDecrementDesiredCapacity: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachInstancesQuery" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Activities: S.optional(__S(1793, __c56, 1)) }).pipe(ns),
      ).annotate({ identifier: "DetachInstancesAnswer" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          LoadBalancerNames: S.optional(__S(96, __c3, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachLoadBalancersType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DetachLoadBalancersResultType",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TargetGroupARNs: S.optional(__S(160, __c5, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachLoadBalancerTargetGroupsType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DetachLoadBalancerTargetGroupsResultType",
      });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TrafficSources: S.optional(__S(225, __c7, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachTrafficSourcesType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DetachTrafficSourcesResultType",
      });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          Metrics: S.optional(__S(2176, __c68, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisableMetricsCollectionQuery" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DisableMetricsCollectionResponse",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          Metrics: S.optional(__S(2176, __c68, 0)),
          Granularity: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnableMetricsCollectionQuery" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "EnableMetricsCollectionResponse",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(32, __c1, 0)),
          AutoScalingGroupName: S.optional(S.String),
          ShouldDecrementDesiredCapacity: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "EnterStandbyQuery" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Activities: S.optional(__S(1793, __c56, 1)) }).pipe(ns),
      ).annotate({ identifier: "EnterStandbyAnswer" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          PolicyName: S.optional(S.String),
          HonorCooldown: S.optional(S.Boolean),
          MetricValue: S.optional(S.Number),
          BreachThreshold: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecutePolicyType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "ExecutePolicyResponse",
      });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(32, __c1, 0)),
          AutoScalingGroupName: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExitStandbyQuery" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Activities: S.optional(__S(1793, __c56, 1)) }).pipe(ns),
      ).annotate({ identifier: "ExitStandbyAnswer" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          PolicyName: S.optional(S.String),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPredictiveScalingForecastType" });
    case 1:
      return S.Array(
        /*@__PURE__*/ T.DateFromString.pipe(/*@__PURE__*/ T.TimestampFormat("date-time")),
      );
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({
          Timestamps: S.optional(__S(2337, __c73, 1)),
          Values: S.optional(__S(2338, __c73, 2)),
          MetricSpecification: S.optional(__S(1708, __c53, 12)),
        }),
      ).annotate({ identifier: "LoadForecast" });
    case 4:
      return S.Array(__S(2339, __c73, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Timestamps: S.optional(__S(2337, __c73, 1)),
          Values: S.optional(__S(2338, __c73, 2)),
        }),
      ).annotate({ identifier: "CapacityForecast" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          LoadForecast: S.optional(__S(2340, __c73, 4)),
          CapacityForecast: S.optional(__S(2341, __c73, 5)),
          UpdateTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetPredictiveScalingForecastAnswer" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          RequestedCapacity: S.optional(S.Number),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          AvailabilityZones: S.optional(__S(2368, __c74, 0)),
          AvailabilityZoneIds: S.optional(__S(2369, __c74, 1)),
          SubnetIds: S.optional(__S(2370, __c74, 2)),
          RetryStrategy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "LaunchInstancesRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          InstanceType: S.optional(S.String),
          MarketType: S.optional(S.String),
          SubnetId: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          InstanceIds: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "InstanceCollection" });
    case 5:
      return S.Array(__S(2372, __c74, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          InstanceType: S.optional(S.String),
          MarketType: S.optional(S.String),
          SubnetId: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "LaunchInstancesError" });
    case 7:
      return S.Array(__S(2374, __c74, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ClientToken: S.optional(S.String),
          Instances: S.optional(__S(2373, __c74, 5)),
          Errors: S.optional(__S(2375, __c74, 7)),
        }).pipe(ns),
      ).annotate({ identifier: "LaunchInstancesResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LifecycleHookName: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
          LifecycleTransition: S.optional(S.String),
          RoleARN: S.optional(S.String),
          NotificationTargetARN: S.optional(S.String),
          NotificationMetadata: S.optional(S.String),
          HeartbeatTimeout: S.optional(S.Number),
          DefaultResult: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutLifecycleHookType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutLifecycleHookAnswer",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          TopicARN: S.optional(S.String),
          NotificationTypes: S.optional(__S(1344, __c42, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutNotificationConfigurationType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutNotificationConfigurationResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          PolicyName: S.optional(S.String),
          PolicyType: S.optional(S.String),
          AdjustmentType: S.optional(S.String),
          MinAdjustmentStep: S.optional(S.Number),
          MinAdjustmentMagnitude: S.optional(S.Number),
          ScalingAdjustment: S.optional(S.Number),
          Cooldown: S.optional(S.Number),
          MetricAggregationType: S.optional(S.String),
          StepAdjustments: S.optional(__S(1729, __c54, 1)),
          EstimatedInstanceWarmup: S.optional(S.Number),
          TargetTrackingConfiguration: S.optional(__S(1737, __c54, 9)),
          Enabled: S.optional(S.Boolean),
          PredictiveScalingConfiguration: S.optional(__S(1739, __c54, 11)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutScalingPolicyType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PolicyARN: S.optional(S.String), Alarms: S.optional(__S(1731, __c54, 3)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "PolicyARNType" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ScheduledActionName: S.optional(S.String),
          Time: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Recurrence: S.optional(S.String),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          DesiredCapacity: S.optional(S.Number),
          TimeZone: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutScheduledUpdateGroupActionType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutScheduledUpdateGroupActionResponse",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          MaxGroupPreparedCapacity: S.optional(S.Number),
          MinSize: S.optional(S.Number),
          PoolState: S.optional(S.String),
          InstanceReusePolicy: S.optional(__S(1248, __c39, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutWarmPoolType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "PutWarmPoolAnswer" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LifecycleHookName: S.optional(S.String),
          AutoScalingGroupName: S.optional(S.String),
          LifecycleActionToken: S.optional(S.String),
          InstanceId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RecordLifecycleActionHeartbeatType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "RecordLifecycleActionHeartbeatAnswer",
      });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "ResumeProcessesResponse",
      });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          ScalingProcesses: S.optional(__S(2624, __c82, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ScalingProcessQuery" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AutoScalingGroupName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RollbackInstanceRefreshType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ InstanceRefreshId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "RollbackInstanceRefreshAnswer" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          DesiredCapacity: S.optional(S.Number),
          HonorCooldown: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetDesiredCapacityType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetDesiredCapacityResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          HealthStatus: S.optional(S.String),
          ShouldRespectGracePeriod: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetInstanceHealthQuery" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetInstanceHealthResponse",
      });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceIds: S.optional(__S(32, __c1, 0)),
          AutoScalingGroupName: S.optional(S.String),
          ProtectedFromScaleIn: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetInstanceProtectionQuery" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetInstanceProtectionAnswer",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          Strategy: S.optional(S.String),
          DesiredConfiguration: S.optional(__S(1412, __c44, 4)),
          Preferences: S.optional(__S(1411, __c44, 3)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartInstanceRefreshType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ InstanceRefreshId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "StartInstanceRefreshAnswer" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SuspendProcessesResponse",
      });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          InstanceIds: S.optional(__S(2848, __c89, 0)),
          AutoScalingGroupName: S.optional(S.String),
          ShouldDecrementDesiredCapacity: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "TerminateInstanceInAutoScalingGroupType" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Activity: S.optional(__S(1792, __c56, 0)),
          Activities: S.optional(__S(1793, __c56, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "ActivityType" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AutoScalingGroupName: S.optional(S.String),
          LaunchConfigurationName: S.optional(S.String),
          LaunchTemplate: S.optional(__S(544, __c17, 0)),
          MixedInstancesPolicy: S.optional(__S(605, __c18, 29)),
          MinSize: S.optional(S.Number),
          MaxSize: S.optional(S.Number),
          DesiredCapacity: S.optional(S.Number),
          DefaultCooldown: S.optional(S.Number),
          AvailabilityZones: S.optional(__S(640, __c20, 0)),
          AvailabilityZoneIds: S.optional(__S(641, __c20, 1)),
          HealthCheckType: S.optional(S.String),
          HealthCheckGracePeriod: S.optional(S.Number),
          PlacementGroup: S.optional(S.String),
          VPCZoneIdentifier: S.optional(S.String),
          TerminationPolicies: S.optional(__S(608, __c19, 0)),
          NewInstancesProtectedFromScaleIn: S.optional(S.Boolean),
          ServiceLinkedRoleARN: S.optional(S.String),
          MaxInstanceLifetime: S.optional(S.Number),
          CapacityRebalance: S.optional(S.Boolean),
          Context: S.optional(S.String),
          DesiredCapacityType: S.optional(S.String),
          DefaultInstanceWarmup: S.optional(S.Number),
          InstanceMaintenancePolicy: S.optional(__S(642, __c20, 2)),
          AvailabilityZoneDistribution: S.optional(__S(643, __c20, 3)),
          AvailabilityZoneImpairmentPolicy: S.optional(__S(644, __c20, 4)),
          SkipZonalShiftValidation: S.optional(S.Boolean),
          CapacityReservationSpecification: S.optional(__S(648, __c20, 8)),
          InstanceLifecyclePolicy: S.optional(__S(650, __c20, 10)),
          DeletionProtection: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAutoScalingGroupType" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateAutoScalingGroupResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
