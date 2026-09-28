import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "EMR",
  target: "ElasticMapReduce",
  version: "2009-03-31",
  sigv4: "elasticmapreduce",
  protocol: awsJson1_1Protocol,
  xmlns: "http://elasticmapreduce.amazonaws.com/doc/2009-03-31",
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
                `https://elasticmapreduce-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://elasticmapreduce.${Region}.amazonaws.com`);
              }
              return e(
                `https://elasticmapreduce-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://elasticmapreduce.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://elasticmapreduce.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ClusterNotFound
  extends /*@__PURE__*/ TE.TaggedError("ClusterNotFound", ["NotFoundError"], {
    synthetic: {
      from: "InvalidRequestException",
      message: { matches: "^Cluster id .* is not valid" },
    },
  })<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError", ["ServerError"], {
    code: "InternalFailure",
    status: 500,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException")<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly ErrorCode?: string;
    readonly message?: string;
  }> {}
export class JobFlowNotFound
  extends /*@__PURE__*/ TE.TaggedError("JobFlowNotFound", ["NotFoundError"], {
    synthetic: {
      from: "ValidationException",
      message: { includes: "Specified job flow ID not valid" },
    },
  })<{ readonly message?: string }> {}
export class SecurityConfigurationAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "SecurityConfigurationAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: {
          matches: "^SecurityConfiguration with name .* already exists",
        },
      },
    },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class SecurityConfigurationNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "SecurityConfigurationNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: {
          matches: "^Security configuration with name .* does not exist",
        },
      },
    },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class StudioNotFound
  extends /*@__PURE__*/ TE.TaggedError("StudioNotFound", ["NotFoundError"], {
    synthetic: {
      from: "InvalidRequestException",
      message: { includes: "Studio does not exist" },
    },
  })<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class StudioServiceRoleMissingS3Access
  extends /*@__PURE__*/ TE.TaggedError(
    "StudioServiceRoleMissingS3Access",
    ["RetryableError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: {
          includes: "does not have permission to access the 'S3 Location'",
        },
      },
    },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export class StudioServiceRoleNotAssumable
  extends /*@__PURE__*/ TE.TaggedError(
    "StudioServiceRoleNotAssumable",
    ["RetryableError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { includes: "does not have permissions to assume role" },
      },
    },
  )<{ readonly ErrorCode?: string; readonly message?: string }> {}
export type XmlStringMaxLen256 = string;
export type InstanceFleetType = "MASTER" | "CORE" | "TASK" | (string & {});
export type WholeNumber = number;
export type InstanceType = string;
export type NonNegativeDouble = number;
export type ThroughputVal = number;
export interface VolumeSpecification {
  VolumeType?: string;
  Iops?: number;
  SizeInGB?: number;
  Throughput?: number;
}
export interface EbsBlockDeviceConfig {
  VolumeSpecification?: VolumeSpecification;
  VolumesPerInstance?: number;
}
export type EbsBlockDeviceConfigList = EbsBlockDeviceConfig[];
export interface EbsConfiguration {
  EbsBlockDeviceConfigs?: EbsBlockDeviceConfig[];
  EbsOptimized?: boolean;
}
export type StringMap = { [key: string]: string | undefined };
export interface Configuration {
  Classification?: string;
  Configurations?: Configuration[];
  Properties?: { [key: string]: string | undefined };
}
export type ConfigurationList = Configuration[];
export interface InstanceTypeConfig {
  InstanceType?: string;
  WeightedCapacity?: number;
  BidPrice?: string;
  BidPriceAsPercentageOfOnDemandPrice?: number;
  EbsConfiguration?: EbsConfiguration;
  Configurations?: Configuration[];
  CustomAmiId?: string;
  Priority?: number;
}
export type InstanceTypeConfigList = InstanceTypeConfig[];
export type SpotProvisioningTimeoutAction =
  | "SWITCH_TO_ON_DEMAND"
  | "TERMINATE_CLUSTER"
  | (string & {});
export type SpotProvisioningAllocationStrategy =
  | "capacity-optimized"
  | "price-capacity-optimized"
  | "lowest-price"
  | "diversified"
  | "capacity-optimized-prioritized"
  | (string & {});
export interface SpotProvisioningSpecification {
  TimeoutDurationMinutes?: number;
  TimeoutAction?: SpotProvisioningTimeoutAction;
  BlockDurationMinutes?: number;
  AllocationStrategy?: SpotProvisioningAllocationStrategy;
}
export type OnDemandProvisioningAllocationStrategy =
  | "lowest-price"
  | "prioritized"
  | (string & {});
export type OnDemandCapacityReservationUsageStrategy =
  | "use-capacity-reservations-first"
  | (string & {});
export type OnDemandCapacityReservationPreference =
  | "open"
  | "none"
  | (string & {});
export interface OnDemandCapacityReservationOptions {
  UsageStrategy?: OnDemandCapacityReservationUsageStrategy;
  CapacityReservationPreference?: OnDemandCapacityReservationPreference;
  CapacityReservationResourceGroupArn?: string;
}
export interface OnDemandProvisioningSpecification {
  AllocationStrategy?: OnDemandProvisioningAllocationStrategy;
  CapacityReservationOptions?: OnDemandCapacityReservationOptions;
}
export interface InstanceFleetProvisioningSpecifications {
  SpotSpecification?: SpotProvisioningSpecification;
  OnDemandSpecification?: OnDemandProvisioningSpecification;
}
export interface SpotResizingSpecification {
  TimeoutDurationMinutes?: number;
  AllocationStrategy?: SpotProvisioningAllocationStrategy;
}
export interface OnDemandResizingSpecification {
  TimeoutDurationMinutes?: number;
  AllocationStrategy?: OnDemandProvisioningAllocationStrategy;
  CapacityReservationOptions?: OnDemandCapacityReservationOptions;
}
export interface InstanceFleetResizingSpecifications {
  SpotResizeSpecification?: SpotResizingSpecification;
  OnDemandResizeSpecification?: OnDemandResizingSpecification;
}
export interface InstanceFleetConfig {
  Name?: string;
  InstanceFleetType?: InstanceFleetType;
  TargetOnDemandCapacity?: number;
  TargetSpotCapacity?: number;
  InstanceTypeConfigs?: InstanceTypeConfig[];
  LaunchSpecifications?: InstanceFleetProvisioningSpecifications;
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  Context?: string;
}
export interface AddInstanceFleetInput {
  ClusterId?: string;
  InstanceFleet?: InstanceFleetConfig;
}
export type InstanceFleetId = string;
export type ArnType = string;
export interface AddInstanceFleetOutput {
  ClusterId?: string;
  InstanceFleetId?: string;
  ClusterArn?: string;
}
export type MarketType = "ON_DEMAND" | "SPOT" | (string & {});
export type InstanceRoleType = "MASTER" | "CORE" | "TASK" | (string & {});
export interface ScalingConstraints {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export type AdjustmentType =
  | "CHANGE_IN_CAPACITY"
  | "PERCENT_CHANGE_IN_CAPACITY"
  | "EXACT_CAPACITY"
  | (string & {});
export interface SimpleScalingPolicyConfiguration {
  AdjustmentType?: AdjustmentType;
  ScalingAdjustment?: number;
  CoolDown?: number;
}
export interface ScalingAction {
  Market?: MarketType;
  SimpleScalingPolicyConfiguration?: SimpleScalingPolicyConfiguration;
}
export type ComparisonOperator =
  | "GREATER_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUAL"
  | (string & {});
export type Statistic =
  | "SAMPLE_COUNT"
  | "AVERAGE"
  | "SUM"
  | "MINIMUM"
  | "MAXIMUM"
  | (string & {});
export type Unit =
  | "NONE"
  | "SECONDS"
  | "MICRO_SECONDS"
  | "MILLI_SECONDS"
  | "BYTES"
  | "KILO_BYTES"
  | "MEGA_BYTES"
  | "GIGA_BYTES"
  | "TERA_BYTES"
  | "BITS"
  | "KILO_BITS"
  | "MEGA_BITS"
  | "GIGA_BITS"
  | "TERA_BITS"
  | "PERCENT"
  | "COUNT"
  | "BYTES_PER_SECOND"
  | "KILO_BYTES_PER_SECOND"
  | "MEGA_BYTES_PER_SECOND"
  | "GIGA_BYTES_PER_SECOND"
  | "TERA_BYTES_PER_SECOND"
  | "BITS_PER_SECOND"
  | "KILO_BITS_PER_SECOND"
  | "MEGA_BITS_PER_SECOND"
  | "GIGA_BITS_PER_SECOND"
  | "TERA_BITS_PER_SECOND"
  | "COUNT_PER_SECOND"
  | (string & {});
export interface MetricDimension {
  Key?: string;
  Value?: string;
}
export type MetricDimensionList = MetricDimension[];
export interface CloudWatchAlarmDefinition {
  ComparisonOperator?: ComparisonOperator;
  EvaluationPeriods?: number;
  MetricName?: string;
  Namespace?: string;
  Period?: number;
  Statistic?: Statistic;
  Threshold?: number;
  Unit?: Unit;
  Dimensions?: MetricDimension[];
}
export interface ScalingTrigger {
  CloudWatchAlarmDefinition?: CloudWatchAlarmDefinition;
}
export interface ScalingRule {
  Name?: string;
  Description?: string;
  Action?: ScalingAction;
  Trigger?: ScalingTrigger;
}
export type ScalingRuleList = ScalingRule[];
export interface AutoScalingPolicy {
  Constraints?: ScalingConstraints;
  Rules?: ScalingRule[];
}
export interface InstanceGroupConfig {
  Name?: string;
  Market?: MarketType;
  InstanceRole?: InstanceRoleType;
  BidPrice?: string;
  InstanceType?: string;
  InstanceCount?: number;
  Configurations?: Configuration[];
  EbsConfiguration?: EbsConfiguration;
  AutoScalingPolicy?: AutoScalingPolicy;
  CustomAmiId?: string;
}
export type InstanceGroupConfigList = InstanceGroupConfig[];
export interface AddInstanceGroupsInput {
  InstanceGroups?: InstanceGroupConfig[];
  JobFlowId?: string;
}
export type InstanceGroupIdsList = string[];
export interface AddInstanceGroupsOutput {
  JobFlowId?: string;
  InstanceGroupIds?: string[];
  ClusterArn?: string;
}
export type ActionOnFailure =
  | "TERMINATE_JOB_FLOW"
  | "TERMINATE_CLUSTER"
  | "CANCEL_AND_WAIT"
  | "CONTINUE"
  | (string & {});
export type XmlString = string;
export interface KeyValue {
  Key?: string;
  Value?: string;
}
export type KeyValueList = KeyValue[];
export type XmlStringList = string[];
export interface HadoopJarStepConfig {
  Properties?: KeyValue[];
  Jar?: string;
  MainClass?: string;
  Args?: string[];
}
export interface S3MonitoringConfiguration {
  LogUri?: string;
  EncryptionKeyArn?: string;
}
export interface StepMonitoringConfiguration {
  S3MonitoringConfiguration?: S3MonitoringConfiguration;
}
export interface StepConfig {
  Name?: string;
  ActionOnFailure?: ActionOnFailure;
  HadoopJarStep?: HadoopJarStepConfig;
  StepMonitoringConfiguration?: StepMonitoringConfiguration;
}
export type StepConfigList = StepConfig[];
export interface AddJobFlowStepsInput {
  JobFlowId?: string;
  Steps?: StepConfig[];
  ExecutionRoleArn?: string;
}
export type StepIdsList = string[];
export interface AddJobFlowStepsOutput {
  StepIds?: string[];
}
export type ResourceId = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export type ClusterId = string;
export interface AddTagsInput {
  ResourceId?: string;
  Tags?: Tag[];
  ClusterId?: string;
}
export interface AddTagsOutput {}
export type StepCancellationOption =
  | "SEND_INTERRUPT"
  | "TERMINATE_PROCESS"
  | (string & {});
export interface CancelStepsInput {
  ClusterId?: string;
  StepIds?: string[];
  StepCancellationOption?: StepCancellationOption;
}
export type StepId = string;
export type CancelStepsRequestStatus = "SUBMITTED" | "FAILED" | (string & {});
export interface CancelStepsInfo {
  StepId?: string;
  Status?: CancelStepsRequestStatus;
  Reason?: string;
}
export type CancelStepsInfoList = CancelStepsInfo[];
export interface CancelStepsOutput {
  CancelStepsInfoList?: CancelStepsInfo[];
}
export interface EMRContainersConfig {
  JobRunId?: string;
}
export type ProfilerType = "SHS" | "TEZUI" | "YTS" | (string & {});
export interface CreatePersistentAppUIInput {
  TargetResourceArn?: string;
  EMRContainersConfig?: EMRContainersConfig;
  Tags?: Tag[];
  XReferer?: string;
  ProfilerType?: ProfilerType;
}
export interface CreatePersistentAppUIOutput {
  PersistentAppUIId?: string;
  RuntimeRoleEnabledCluster?: boolean;
}
export interface CreateSecurityConfigurationInput {
  Name?: string;
  SecurityConfiguration?: string;
}
export interface CreateSecurityConfigurationOutput {
  Name: string;
  CreationDateTime: Date;
}
export type AuthMode = "SSO" | "IAM" | (string & {});
export type SubnetIdList = string[];
export type IdcUserAssignment = "REQUIRED" | "OPTIONAL" | (string & {});
export interface CreateStudioInput {
  Name?: string;
  Description?: string;
  AuthMode?: AuthMode;
  VpcId?: string;
  SubnetIds?: string[];
  ServiceRole?: string;
  UserRole?: string;
  WorkspaceSecurityGroupId?: string;
  EngineSecurityGroupId?: string;
  DefaultS3Location?: string;
  IdpAuthUrl?: string;
  IdpRelayStateParameterName?: string;
  Tags?: Tag[];
  TrustedIdentityPropagationEnabled?: boolean;
  IdcUserAssignment?: IdcUserAssignment;
  IdcInstanceArn?: string;
  EncryptionKeyArn?: string;
}
export interface CreateStudioOutput {
  StudioId?: string;
  Url?: string;
}
export type IdentityType = "USER" | "GROUP" | (string & {});
export interface CreateStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
}
export interface CreateStudioSessionMappingResponse {}
export interface DeleteSecurityConfigurationInput {
  Name?: string;
}
export interface DeleteSecurityConfigurationOutput {}
export interface DeleteStudioInput {
  StudioId?: string;
}
export interface DeleteStudioResponse {}
export interface DeleteStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
}
export interface DeleteStudioSessionMappingResponse {}
export interface DescribeClusterInput {
  ClusterId?: string;
}
export type ClusterState =
  | "STARTING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "WAITING"
  | "TERMINATING"
  | "TERMINATED"
  | "TERMINATED_WITH_ERRORS"
  | (string & {});
export type ClusterStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "INSTANCE_FLEET_TIMEOUT"
  | "BOOTSTRAP_FAILURE"
  | "USER_REQUEST"
  | "STEP_FAILURE"
  | "ALL_STEPS_COMPLETED"
  | (string & {});
export interface ClusterStateChangeReason {
  Code?: ClusterStateChangeReasonCode;
  Message?: string;
}
export interface ClusterTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export type ErrorData = { [key: string]: string | undefined }[];
export interface ErrorDetail {
  ErrorCode?: string;
  ErrorData?: { [key: string]: string | undefined }[];
  ErrorMessage?: string;
}
export type ErrorDetailList = ErrorDetail[];
export interface ClusterStatus {
  State?: ClusterState;
  StateChangeReason?: ClusterStateChangeReason;
  Timeline?: ClusterTimeline;
  ErrorDetails?: ErrorDetail[];
}
export type XmlStringMaxLen256List = string[];
export type StringList = string[];
export interface Ec2InstanceAttributes {
  Ec2KeyName?: string;
  Ec2SubnetId?: string;
  RequestedEc2SubnetIds?: string[];
  Ec2AvailabilityZone?: string;
  RequestedEc2AvailabilityZones?: string[];
  IamInstanceProfile?: string;
  EmrManagedMasterSecurityGroup?: string;
  EmrManagedSlaveSecurityGroup?: string;
  ServiceAccessSecurityGroup?: string;
  AdditionalMasterSecurityGroups?: string[];
  AdditionalSlaveSecurityGroups?: string[];
}
export type InstanceCollectionType =
  | "INSTANCE_FLEET"
  | "INSTANCE_GROUP"
  | (string & {});
export interface Application {
  Name?: string;
  Version?: string;
  Args?: string[];
  AdditionalInfo?: { [key: string]: string | undefined };
}
export type ApplicationList = Application[];
export type ScaleDownBehavior =
  | "TERMINATE_AT_INSTANCE_HOUR"
  | "TERMINATE_AT_TASK_COMPLETION"
  | (string & {});
export type RepoUpgradeOnBoot = "SECURITY" | "NONE" | (string & {});
export interface KerberosAttributes {
  Realm?: string;
  KdcAdminPassword?: string | redacted.Redacted<string>;
  CrossRealmTrustPrincipalPassword?: string | redacted.Redacted<string>;
  ADDomainJoinUser?: string;
  ADDomainJoinPassword?: string | redacted.Redacted<string>;
}
export type OptionalArnType = string;
export type PlacementGroupStrategy =
  | "SPREAD"
  | "PARTITION"
  | "CLUSTER"
  | "NONE"
  | (string & {});
export interface PlacementGroupConfig {
  InstanceRole?: InstanceRoleType;
  PlacementStrategy?: PlacementGroupStrategy;
}
export type PlacementGroupConfigList = PlacementGroupConfig[];
export type LogTypesMap = { [key: string]: string[] | undefined };
export interface CloudWatchLogConfiguration {
  Enabled?: boolean;
  LogGroupName?: string;
  LogStreamNamePrefix?: string;
  EncryptionKeyArn?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export type LogType =
  | "system-logs"
  | "application-logs"
  | "persistent-ui-logs"
  | (string & {});
export type LogUploadPolicyValue =
  | "emr-managed"
  | "on-customer-s3only"
  | "disabled"
  | (string & {});
export type LogTypeMap = { [key in LogType]?: LogUploadPolicyValue };
export interface S3LoggingConfiguration {
  LogTypeUploadPolicy?: { [key: string]: LogUploadPolicyValue | undefined };
}
export interface MonitoringConfiguration {
  CloudWatchLogConfiguration?: CloudWatchLogConfiguration;
  S3LoggingConfiguration?: S3LoggingConfiguration;
}
export interface Cluster {
  Id?: string;
  Name?: string;
  Status?: ClusterStatus;
  Ec2InstanceAttributes?: Ec2InstanceAttributes;
  InstanceCollectionType?: InstanceCollectionType;
  LogUri?: string;
  LogEncryptionKmsKeyId?: string;
  RequestedAmiVersion?: string;
  RunningAmiVersion?: string;
  ReleaseLabel?: string;
  AutoTerminate?: boolean;
  TerminationProtected?: boolean;
  UnhealthyNodeReplacement?: boolean;
  VisibleToAllUsers?: boolean;
  Applications?: Application[];
  Tags?: Tag[];
  ServiceRole?: string;
  NormalizedInstanceHours?: number;
  MasterPublicDnsName?: string;
  Configurations?: Configuration[];
  SecurityConfiguration?: string;
  AutoScalingRole?: string;
  ScaleDownBehavior?: ScaleDownBehavior;
  CustomAmiId?: string;
  EbsRootVolumeSize?: number;
  RepoUpgradeOnBoot?: RepoUpgradeOnBoot;
  KerberosAttributes?: KerberosAttributes;
  ClusterArn?: string;
  OutpostArn?: string;
  StepConcurrencyLevel?: number;
  PlacementGroups?: PlacementGroupConfig[];
  OSReleaseLabel?: string;
  EbsRootVolumeIops?: number;
  EbsRootVolumeThroughput?: number;
  ExtendedSupport?: boolean;
  MonitoringConfiguration?: MonitoringConfiguration;
  SessionEnabled?: boolean;
}
export interface DescribeClusterOutput {
  Cluster?: Cluster & {
    KerberosAttributes: KerberosAttributes & {
      Realm: XmlStringMaxLen256;
      KdcAdminPassword: XmlStringMaxLen256;
    };
    PlacementGroups: (PlacementGroupConfig & {
      InstanceRole: InstanceRoleType;
    })[];
    MonitoringConfiguration: MonitoringConfiguration & {
      CloudWatchLogConfiguration: CloudWatchLogConfiguration & {
        Enabled: boolean;
      };
    };
  };
}
export type JobFlowExecutionState =
  | "STARTING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "WAITING"
  | "SHUTTING_DOWN"
  | "TERMINATED"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type JobFlowExecutionStateList = JobFlowExecutionState[];
export interface DescribeJobFlowsInput {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  JobFlowIds?: string[];
  JobFlowStates?: JobFlowExecutionState[];
}
export interface JobFlowExecutionStatusDetail {
  State?: JobFlowExecutionState;
  CreationDateTime?: Date;
  StartDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
  LastStateChangeReason?: string;
}
export type InstanceGroupState =
  | "PROVISIONING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "RECONFIGURING"
  | "RESIZING"
  | "SUSPENDED"
  | "TERMINATING"
  | "TERMINATED"
  | "ARRESTED"
  | "SHUTTING_DOWN"
  | "ENDED"
  | (string & {});
export interface InstanceGroupDetail {
  InstanceGroupId?: string;
  Name?: string;
  Market?: MarketType;
  InstanceRole?: InstanceRoleType;
  BidPrice?: string;
  InstanceType?: string;
  InstanceRequestCount?: number;
  InstanceRunningCount?: number;
  State?: InstanceGroupState;
  LastStateChangeReason?: string;
  CreationDateTime?: Date;
  StartDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
  CustomAmiId?: string;
}
export type InstanceGroupDetailList = InstanceGroupDetail[];
export interface PlacementType {
  AvailabilityZone?: string;
  AvailabilityZones?: string[];
}
export interface JobFlowInstancesDetail {
  MasterInstanceType?: string;
  MasterPublicDnsName?: string;
  MasterInstanceId?: string;
  SlaveInstanceType?: string;
  InstanceCount?: number;
  InstanceGroups?: InstanceGroupDetail[];
  NormalizedInstanceHours?: number;
  Ec2KeyName?: string;
  Ec2SubnetId?: string;
  Placement?: PlacementType;
  KeepJobFlowAliveWhenNoSteps?: boolean;
  TerminationProtected?: boolean;
  UnhealthyNodeReplacement?: boolean;
  HadoopVersion?: string;
}
export type StepExecutionState =
  | "PENDING"
  | "RUNNING"
  | "CONTINUE"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED"
  | "INTERRUPTED"
  | (string & {});
export interface StepExecutionStatusDetail {
  State?: StepExecutionState;
  CreationDateTime?: Date;
  StartDateTime?: Date;
  EndDateTime?: Date;
  LastStateChangeReason?: string;
}
export interface StepDetail {
  StepConfig?: StepConfig;
  ExecutionStatusDetail?: StepExecutionStatusDetail;
}
export type StepDetailList = StepDetail[];
export interface ScriptBootstrapActionConfig {
  Path?: string;
  Args?: string[];
}
export interface BootstrapActionConfig {
  Name?: string;
  ScriptBootstrapAction?: ScriptBootstrapActionConfig;
}
export interface BootstrapActionDetail {
  BootstrapActionConfig?: BootstrapActionConfig;
}
export type BootstrapActionDetailList = BootstrapActionDetail[];
export type SupportedProductsList = string[];
export interface JobFlowDetail {
  JobFlowId?: string;
  Name?: string;
  LogUri?: string;
  LogEncryptionKmsKeyId?: string;
  AmiVersion?: string;
  ExecutionStatusDetail?: JobFlowExecutionStatusDetail;
  Instances?: JobFlowInstancesDetail;
  Steps?: StepDetail[];
  BootstrapActions?: BootstrapActionDetail[];
  SupportedProducts?: string[];
  VisibleToAllUsers?: boolean;
  JobFlowRole?: string;
  ServiceRole?: string;
  AutoScalingRole?: string;
  ScaleDownBehavior?: ScaleDownBehavior;
}
export type JobFlowDetailList = JobFlowDetail[];
export interface DescribeJobFlowsOutput {
  JobFlows?: (JobFlowDetail & {
    JobFlowId: XmlStringMaxLen256;
    Name: XmlStringMaxLen256;
    ExecutionStatusDetail: JobFlowExecutionStatusDetail & {
      State: JobFlowExecutionState;
      CreationDateTime: Date;
    };
    Instances: JobFlowInstancesDetail & {
      MasterInstanceType: InstanceType;
      SlaveInstanceType: InstanceType;
      InstanceCount: number;
      InstanceGroups: (InstanceGroupDetail & {
        Market: MarketType;
        InstanceRole: InstanceRoleType;
        InstanceType: InstanceType;
        InstanceRequestCount: number;
        InstanceRunningCount: number;
        State: InstanceGroupState;
        CreationDateTime: Date;
      })[];
    };
    Steps: (StepDetail & {
      StepConfig: StepConfig & {
        Name: XmlStringMaxLen256;
        HadoopJarStep: HadoopJarStepConfig & { Jar: XmlString };
      };
      ExecutionStatusDetail: StepExecutionStatusDetail & {
        State: StepExecutionState;
        CreationDateTime: Date;
      };
    })[];
    BootstrapActions: (BootstrapActionDetail & {
      BootstrapActionConfig: BootstrapActionConfig & {
        Name: XmlStringMaxLen256;
        ScriptBootstrapAction: ScriptBootstrapActionConfig & {
          Path: XmlString;
        };
      };
    })[];
  })[];
}
export interface DescribeNotebookExecutionInput {
  NotebookExecutionId?: string;
}
export type ExecutionEngineType = "EMR" | (string & {});
export type IAMRoleArn = string;
export interface ExecutionEngineConfig {
  Id?: string;
  Type?: ExecutionEngineType;
  MasterInstanceSecurityGroupId?: string;
  ExecutionRoleArn?: string;
}
export type NotebookExecutionStatus =
  | "START_PENDING"
  | "STARTING"
  | "RUNNING"
  | "FINISHING"
  | "FINISHED"
  | "FAILING"
  | "FAILED"
  | "STOP_PENDING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export type UriString = string;
export interface NotebookS3LocationForOutput {
  Bucket?: string;
  Key?: string;
}
export interface OutputNotebookS3LocationForOutput {
  Bucket?: string;
  Key?: string;
}
export type OutputNotebookFormat = "HTML" | (string & {});
export type EnvironmentVariablesMap = { [key: string]: string | undefined };
export interface NotebookExecution {
  NotebookExecutionId?: string;
  EditorId?: string;
  ExecutionEngine?: ExecutionEngineConfig;
  NotebookExecutionName?: string;
  NotebookParams?: string;
  Status?: NotebookExecutionStatus;
  StartTime?: Date;
  EndTime?: Date;
  Arn?: string;
  OutputNotebookURI?: string;
  LastStateChangeReason?: string;
  NotebookInstanceSecurityGroupId?: string;
  Tags?: Tag[];
  NotebookS3Location?: NotebookS3LocationForOutput;
  OutputNotebookS3Location?: OutputNotebookS3LocationForOutput;
  OutputNotebookFormat?: OutputNotebookFormat;
  EnvironmentVariables?: { [key: string]: string | undefined };
}
export interface DescribeNotebookExecutionOutput {
  NotebookExecution?: NotebookExecution & {
    ExecutionEngine: ExecutionEngineConfig & { Id: XmlStringMaxLen256 };
  };
}
export interface DescribePersistentAppUIInput {
  PersistentAppUIId?: string;
}
export type PersistentAppUIType = "SHS" | "TEZ" | "YTS" | (string & {});
export type PersistentAppUITypeList = PersistentAppUIType[];
export interface PersistentAppUI {
  PersistentAppUIId?: string;
  PersistentAppUITypeList?: PersistentAppUIType[];
  PersistentAppUIStatus?: string;
  AuthorId?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
  LastStateChangeReason?: string;
  Tags?: Tag[];
}
export interface DescribePersistentAppUIOutput {
  PersistentAppUI?: PersistentAppUI;
}
export type MaxResultsNumber = number;
export interface DescribeReleaseLabelInput {
  ReleaseLabel?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface SimplifiedApplication {
  Name?: string;
  Version?: string;
}
export type SimplifiedApplicationList = SimplifiedApplication[];
export interface OSRelease {
  Label?: string;
}
export type OSReleaseList = OSRelease[];
export interface DescribeReleaseLabelOutput {
  ReleaseLabel?: string;
  Applications?: SimplifiedApplication[];
  NextToken?: string;
  AvailableOSReleases?: OSRelease[];
}
export interface DescribeSecurityConfigurationInput {
  Name?: string;
}
export interface DescribeSecurityConfigurationOutput {
  Name?: string;
  SecurityConfiguration?: string;
  CreationDateTime?: Date;
}
export interface DescribeStepInput {
  ClusterId?: string;
  StepId?: string;
}
export interface HadoopStepConfig {
  Jar?: string;
  Properties?: { [key: string]: string | undefined };
  MainClass?: string;
  Args?: string[];
}
export type StepState =
  | "PENDING"
  | "CANCEL_PENDING"
  | "RUNNING"
  | "COMPLETED"
  | "CANCELLED"
  | "FAILED"
  | "INTERRUPTED"
  | (string & {});
export type StepStateChangeReasonCode = "NONE" | (string & {});
export interface StepStateChangeReason {
  Code?: StepStateChangeReasonCode;
  Message?: string;
}
export interface FailureDetails {
  Reason?: string;
  Message?: string;
  LogFile?: string;
}
export interface StepTimeline {
  CreationDateTime?: Date;
  StartDateTime?: Date;
  EndDateTime?: Date;
}
export interface StepStatus {
  State?: StepState;
  StateChangeReason?: StepStateChangeReason;
  FailureDetails?: FailureDetails;
  Timeline?: StepTimeline;
}
export interface Step {
  Id?: string;
  Name?: string;
  Config?: HadoopStepConfig;
  ActionOnFailure?: ActionOnFailure;
  Status?: StepStatus;
  ExecutionRoleArn?: string;
  LogUri?: string;
  EncryptionKeyArn?: string;
}
export interface DescribeStepOutput {
  Step?: Step;
}
export interface DescribeStudioInput {
  StudioId?: string;
}
export interface Studio {
  StudioId?: string;
  StudioArn?: string;
  Name?: string;
  Description?: string;
  AuthMode?: AuthMode;
  VpcId?: string;
  SubnetIds?: string[];
  ServiceRole?: string;
  UserRole?: string;
  WorkspaceSecurityGroupId?: string;
  EngineSecurityGroupId?: string;
  Url?: string;
  CreationTime?: Date;
  DefaultS3Location?: string;
  IdpAuthUrl?: string;
  IdpRelayStateParameterName?: string;
  Tags?: Tag[];
  IdcInstanceArn?: string;
  TrustedIdentityPropagationEnabled?: boolean;
  IdcUserAssignment?: IdcUserAssignment;
  EncryptionKeyArn?: string;
}
export interface DescribeStudioOutput {
  Studio?: Studio;
}
export interface GetAutoTerminationPolicyInput {
  ClusterId?: string;
}
export interface AutoTerminationPolicy {
  IdleTimeout?: number;
}
export interface GetAutoTerminationPolicyOutput {
  AutoTerminationPolicy?: AutoTerminationPolicy;
}
export interface GetBlockPublicAccessConfigurationInput {}
export type Port = number;
export interface PortRange {
  MinRange?: number;
  MaxRange?: number;
}
export type PortRanges = PortRange[];
export interface BlockPublicAccessConfiguration {
  BlockPublicSecurityGroupRules?: boolean;
  PermittedPublicSecurityGroupRuleRanges?: PortRange[];
  Classification?: string;
  Configurations?: Configuration[];
  Properties?: { [key: string]: string | undefined };
}
export interface BlockPublicAccessConfigurationMetadata {
  CreationDateTime?: Date;
  CreatedByArn?: string;
}
export interface GetBlockPublicAccessConfigurationOutput {
  BlockPublicAccessConfiguration: BlockPublicAccessConfiguration & {
    BlockPublicSecurityGroupRules: boolean;
    PermittedPublicSecurityGroupRuleRanges: (PortRange & { MinRange: Port })[];
  };
  BlockPublicAccessConfigurationMetadata: BlockPublicAccessConfigurationMetadata & {
    CreationDateTime: Date;
    CreatedByArn: ArnType;
  };
}
export interface GetClusterSessionCredentialsInput {
  ClusterId?: string;
  ExecutionRoleArn?: string;
}
export interface UsernamePassword {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
}
export type Credentials = { UsernamePassword: UsernamePassword };
export interface GetClusterSessionCredentialsOutput {
  Credentials?: Credentials;
  ExpiresAt?: Date;
}
export interface GetManagedScalingPolicyInput {
  ClusterId?: string;
}
export type ComputeLimitsUnitType =
  | "InstanceFleetUnits"
  | "Instances"
  | "VCPU"
  | (string & {});
export interface ComputeLimits {
  UnitType?: ComputeLimitsUnitType;
  MinimumCapacityUnits?: number;
  MaximumCapacityUnits?: number;
  MaximumOnDemandCapacityUnits?: number;
  MaximumCoreCapacityUnits?: number;
}
export type UtilizationPerformanceIndexInteger = number;
export type ScalingStrategy = "DEFAULT" | "ADVANCED" | (string & {});
export interface ManagedScalingPolicy {
  ComputeLimits?: ComputeLimits;
  UtilizationPerformanceIndex?: number;
  ScalingStrategy?: ScalingStrategy;
}
export interface GetManagedScalingPolicyOutput {
  ManagedScalingPolicy?: ManagedScalingPolicy & {
    ComputeLimits: ComputeLimits & {
      UnitType: ComputeLimitsUnitType;
      MinimumCapacityUnits: number;
      MaximumCapacityUnits: number;
    };
  };
}
export type OnClusterAppUIType =
  | "SparkHistoryServer"
  | "YarnTimelineService"
  | "TezUI"
  | "ApplicationMaster"
  | "JobHistoryServer"
  | "ResourceManager"
  | (string & {});
export interface GetOnClusterAppUIPresignedURLInput {
  ClusterId?: string;
  OnClusterAppUIType?: OnClusterAppUIType;
  ApplicationId?: string;
  DryRun?: boolean;
  ExecutionRoleArn?: string;
}
export interface GetOnClusterAppUIPresignedURLOutput {
  PresignedURLReady?: boolean;
  PresignedURL?: string;
}
export interface GetPersistentAppUIPresignedURLInput {
  PersistentAppUIId?: string;
  PersistentAppUIType?: PersistentAppUIType;
  ApplicationId?: string;
  AuthProxyCall?: boolean;
  ExecutionRoleArn?: string;
}
export interface GetPersistentAppUIPresignedURLOutput {
  PresignedURLReady?: boolean;
  PresignedURL?: string;
}
export type SessionId = string;
export interface GetSessionInput {
  ClusterId?: string;
  SessionId?: string;
}
export type SessionState =
  | "SUBMITTED"
  | "STARTING"
  | "STARTED"
  | "IDLE"
  | "BUSY"
  | "TERMINATING"
  | "TERMINATED"
  | "FAILED"
  | (string & {});
export interface SessionCloudWatchLoggingConfiguration {
  Enabled?: boolean;
  LogGroup?: string;
  LogStreamNamePrefix?: string;
  EncryptionKeyArn?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export interface SessionManagedLoggingConfiguration {
  Enabled?: boolean;
  EncryptionKeyArn?: string;
}
export interface SessionS3LoggingConfiguration {
  Enabled?: boolean;
  LogUri?: string;
  EncryptionKeyArn?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export interface SessionMonitoringConfiguration {
  CloudWatchLoggingConfiguration?: SessionCloudWatchLoggingConfiguration;
  ManagedLoggingConfiguration?: SessionManagedLoggingConfiguration;
  S3LoggingConfiguration?: SessionS3LoggingConfiguration;
}
export interface Session {
  Id?: string;
  ClusterId?: string;
  Name?: string;
  Arn?: string;
  State?: SessionState;
  StateChangeReason?: string;
  ReleaseLabel?: string;
  ExecutionRoleArn?: string;
  AccountId?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  StartedAt?: Date;
  EndedAt?: Date;
  IdleSince?: Date;
  EngineConfigurations?: Configuration[];
  MonitoringConfiguration?: SessionMonitoringConfiguration;
  SessionIdleTimeoutInMinutes?: number;
  ServerUrl?: string;
  Tags?: Tag[];
}
export interface GetSessionOutput {
  Session: Session & {
    Id: SessionId;
    ClusterId: ClusterId;
    Arn: ArnType;
    State: SessionState;
  };
}
export interface GetSessionEndpointInput {
  ClusterId?: string;
  SessionId?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface GetSessionEndpointOutput {
  Endpoint: string;
  AuthToken?: string | redacted.Redacted<string>;
  AuthTokenExpirationTime?: Date;
  Credentials?: Credentials;
}
export interface GetStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
}
export interface SessionMappingDetail {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
  CreationTime?: Date;
  LastModifiedTime?: Date;
}
export interface GetStudioSessionMappingOutput {
  SessionMapping?: SessionMappingDetail;
}
export type Marker = string;
export interface ListBootstrapActionsInput {
  ClusterId?: string;
  Marker?: string;
}
export interface Command {
  Name?: string;
  ScriptPath?: string;
  Args?: string[];
}
export type CommandList = Command[];
export interface ListBootstrapActionsOutput {
  BootstrapActions?: Command[];
  Marker?: string;
}
export type ClusterStateList = ClusterState[];
export interface ListClustersInput {
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  ClusterStates?: ClusterState[];
  Marker?: string;
}
export interface ClusterSummary {
  Id?: string;
  Name?: string;
  Status?: ClusterStatus;
  NormalizedInstanceHours?: number;
  ClusterArn?: string;
  OutpostArn?: string;
}
export type ClusterSummaryList = ClusterSummary[];
export interface ListClustersOutput {
  Clusters?: ClusterSummary[];
  Marker?: string;
}
export interface ListInstanceFleetsInput {
  ClusterId?: string;
  Marker?: string;
}
export type InstanceFleetState =
  | "PROVISIONING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "RESIZING"
  | "RECONFIGURING"
  | "SUSPENDED"
  | "TERMINATING"
  | "TERMINATED"
  | (string & {});
export type InstanceFleetStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "CLUSTER_TERMINATED"
  | (string & {});
export interface InstanceFleetStateChangeReason {
  Code?: InstanceFleetStateChangeReasonCode;
  Message?: string;
}
export interface InstanceFleetTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export interface InstanceFleetStatus {
  State?: InstanceFleetState;
  StateChangeReason?: InstanceFleetStateChangeReason;
  Timeline?: InstanceFleetTimeline;
}
export interface EbsBlockDevice {
  VolumeSpecification?: VolumeSpecification;
  Device?: string;
}
export type EbsBlockDeviceList = EbsBlockDevice[];
export interface InstanceTypeSpecification {
  InstanceType?: string;
  WeightedCapacity?: number;
  BidPrice?: string;
  BidPriceAsPercentageOfOnDemandPrice?: number;
  Configurations?: Configuration[];
  EbsBlockDevices?: EbsBlockDevice[];
  EbsOptimized?: boolean;
  CustomAmiId?: string;
  Priority?: number;
}
export type InstanceTypeSpecificationList = InstanceTypeSpecification[];
export interface InstanceFleet {
  Id?: string;
  Name?: string;
  Status?: InstanceFleetStatus;
  InstanceFleetType?: InstanceFleetType;
  TargetOnDemandCapacity?: number;
  TargetSpotCapacity?: number;
  ProvisionedOnDemandCapacity?: number;
  ProvisionedSpotCapacity?: number;
  InstanceTypeSpecifications?: InstanceTypeSpecification[];
  LaunchSpecifications?: InstanceFleetProvisioningSpecifications;
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  Context?: string;
}
export type InstanceFleetList = InstanceFleet[];
export interface ListInstanceFleetsOutput {
  InstanceFleets?: (InstanceFleet & {
    InstanceTypeSpecifications: (InstanceTypeSpecification & {
      EbsBlockDevices: (EbsBlockDevice & {
        VolumeSpecification: VolumeSpecification & {
          VolumeType: string;
          SizeInGB: number;
        };
      })[];
    })[];
    LaunchSpecifications: InstanceFleetProvisioningSpecifications & {
      SpotSpecification: SpotProvisioningSpecification & {
        TimeoutDurationMinutes: WholeNumber;
        TimeoutAction: SpotProvisioningTimeoutAction;
      };
      OnDemandSpecification: OnDemandProvisioningSpecification & {
        AllocationStrategy: OnDemandProvisioningAllocationStrategy;
      };
    };
  })[];
  Marker?: string;
}
export interface ListInstanceGroupsInput {
  ClusterId?: string;
  Marker?: string;
}
export type InstanceGroupId = string;
export type InstanceGroupType = "MASTER" | "CORE" | "TASK" | (string & {});
export type InstanceGroupStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "CLUSTER_TERMINATED"
  | (string & {});
export interface InstanceGroupStateChangeReason {
  Code?: InstanceGroupStateChangeReasonCode;
  Message?: string;
}
export interface InstanceGroupTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export interface InstanceGroupStatus {
  State?: InstanceGroupState;
  StateChangeReason?: InstanceGroupStateChangeReason;
  Timeline?: InstanceGroupTimeline;
}
export type InstanceId = string;
export type EC2InstanceIdsList = string[];
export interface InstanceResizePolicy {
  InstancesToTerminate?: string[];
  InstancesToProtect?: string[];
  InstanceTerminationTimeout?: number;
}
export interface ShrinkPolicy {
  DecommissionTimeout?: number;
  InstanceResizePolicy?: InstanceResizePolicy;
}
export type AutoScalingPolicyState =
  | "PENDING"
  | "ATTACHING"
  | "ATTACHED"
  | "DETACHING"
  | "DETACHED"
  | "FAILED"
  | (string & {});
export type AutoScalingPolicyStateChangeReasonCode =
  | "USER_REQUEST"
  | "PROVISION_FAILURE"
  | "CLEANUP_FAILURE"
  | (string & {});
export interface AutoScalingPolicyStateChangeReason {
  Code?: AutoScalingPolicyStateChangeReasonCode;
  Message?: string;
}
export interface AutoScalingPolicyStatus {
  State?: AutoScalingPolicyState;
  StateChangeReason?: AutoScalingPolicyStateChangeReason;
}
export interface AutoScalingPolicyDescription {
  Status?: AutoScalingPolicyStatus;
  Constraints?: ScalingConstraints;
  Rules?: ScalingRule[];
}
export interface InstanceGroup {
  Id?: string;
  Name?: string;
  Market?: MarketType;
  InstanceGroupType?: InstanceGroupType;
  BidPrice?: string;
  InstanceType?: string;
  RequestedInstanceCount?: number;
  RunningInstanceCount?: number;
  Status?: InstanceGroupStatus;
  Configurations?: Configuration[];
  ConfigurationsVersion?: number;
  LastSuccessfullyAppliedConfigurations?: Configuration[];
  LastSuccessfullyAppliedConfigurationsVersion?: number;
  EbsBlockDevices?: EbsBlockDevice[];
  EbsOptimized?: boolean;
  ShrinkPolicy?: ShrinkPolicy;
  AutoScalingPolicy?: AutoScalingPolicyDescription;
  CustomAmiId?: string;
}
export type InstanceGroupList = InstanceGroup[];
export interface ListInstanceGroupsOutput {
  InstanceGroups?: (InstanceGroup & {
    EbsBlockDevices: (EbsBlockDevice & {
      VolumeSpecification: VolumeSpecification & {
        VolumeType: string;
        SizeInGB: number;
      };
    })[];
    AutoScalingPolicy: AutoScalingPolicyDescription & {
      Constraints: ScalingConstraints & {
        MinCapacity: number;
        MaxCapacity: number;
      };
      Rules: (ScalingRule & {
        Name: string;
        Action: ScalingAction & {
          SimpleScalingPolicyConfiguration: SimpleScalingPolicyConfiguration & {
            ScalingAdjustment: number;
          };
        };
        Trigger: ScalingTrigger & {
          CloudWatchAlarmDefinition: CloudWatchAlarmDefinition & {
            ComparisonOperator: ComparisonOperator;
            MetricName: string;
            Period: number;
            Threshold: NonNegativeDouble;
          };
        };
      })[];
    };
  })[];
  Marker?: string;
}
export type InstanceGroupTypeList = InstanceGroupType[];
export type InstanceState =
  | "AWAITING_FULFILLMENT"
  | "PROVISIONING"
  | "BOOTSTRAPPING"
  | "RUNNING"
  | "TERMINATED"
  | (string & {});
export type InstanceStateList = InstanceState[];
export interface ListInstancesInput {
  ClusterId?: string;
  InstanceGroupId?: string;
  InstanceGroupTypes?: InstanceGroupType[];
  InstanceFleetId?: string;
  InstanceFleetType?: InstanceFleetType;
  InstanceStates?: InstanceState[];
  Marker?: string;
}
export type InstanceStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "INSTANCE_FAILURE"
  | "BOOTSTRAP_FAILURE"
  | "CLUSTER_TERMINATED"
  | (string & {});
export interface InstanceStateChangeReason {
  Code?: InstanceStateChangeReasonCode;
  Message?: string;
}
export interface InstanceTimeline {
  CreationDateTime?: Date;
  ReadyDateTime?: Date;
  EndDateTime?: Date;
}
export interface InstanceStatus {
  State?: InstanceState;
  StateChangeReason?: InstanceStateChangeReason;
  Timeline?: InstanceTimeline;
}
export interface EbsVolume {
  Device?: string;
  VolumeId?: string;
}
export type EbsVolumeList = EbsVolume[];
export interface Instance {
  Id?: string;
  Ec2InstanceId?: string;
  PublicDnsName?: string;
  PublicIpAddress?: string;
  PrivateDnsName?: string;
  PrivateIpAddress?: string;
  Status?: InstanceStatus;
  InstanceGroupId?: string;
  InstanceFleetId?: string;
  Market?: MarketType;
  InstanceType?: string;
  EbsVolumes?: EbsVolume[];
}
export type InstanceList = Instance[];
export interface ListInstancesOutput {
  Instances?: Instance[];
  Marker?: string;
}
export interface ListNotebookExecutionsInput {
  EditorId?: string;
  Status?: NotebookExecutionStatus;
  From?: Date;
  To?: Date;
  Marker?: string;
  ExecutionEngineId?: string;
}
export interface NotebookExecutionSummary {
  NotebookExecutionId?: string;
  EditorId?: string;
  NotebookExecutionName?: string;
  Status?: NotebookExecutionStatus;
  StartTime?: Date;
  EndTime?: Date;
  NotebookS3Location?: NotebookS3LocationForOutput;
  ExecutionEngineId?: string;
}
export type NotebookExecutionSummaryList = NotebookExecutionSummary[];
export interface ListNotebookExecutionsOutput {
  NotebookExecutions?: NotebookExecutionSummary[];
  Marker?: string;
}
export interface ReleaseLabelFilter {
  Prefix?: string;
  Application?: string;
}
export interface ListReleaseLabelsInput {
  Filters?: ReleaseLabelFilter;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListReleaseLabelsOutput {
  ReleaseLabels?: string[];
  NextToken?: string;
}
export interface ListSecurityConfigurationsInput {
  Marker?: string;
}
export interface SecurityConfigurationSummary {
  Name?: string;
  CreationDateTime?: Date;
}
export type SecurityConfigurationList = SecurityConfigurationSummary[];
export interface ListSecurityConfigurationsOutput {
  SecurityConfigurations?: SecurityConfigurationSummary[];
  Marker?: string;
}
export type SessionStateList = SessionState[];
export interface ListSessionsInput {
  ClusterId?: string;
  SessionStates?: SessionState[];
  NextToken?: string;
  MaxResults?: number;
}
export type SessionList = Session[];
export interface ListSessionsOutput {
  Sessions?: (Session & {
    Id: SessionId;
    ClusterId: ClusterId;
    Arn: ArnType;
    State: SessionState;
  })[];
  NextToken?: string;
}
export type StepStateList = StepState[];
export interface ListStepsInput {
  ClusterId?: string;
  StepStates?: StepState[];
  StepIds?: string[];
  Marker?: string;
}
export interface StepSummary {
  Id?: string;
  Name?: string;
  Config?: HadoopStepConfig;
  ActionOnFailure?: ActionOnFailure;
  Status?: StepStatus;
  LogUri?: string;
  EncryptionKeyArn?: string;
}
export type StepSummaryList = StepSummary[];
export interface ListStepsOutput {
  Steps?: StepSummary[];
  Marker?: string;
}
export interface ListStudiosInput {
  Marker?: string;
}
export interface StudioSummary {
  StudioId?: string;
  Name?: string;
  VpcId?: string;
  Description?: string;
  Url?: string;
  AuthMode?: AuthMode;
  CreationTime?: Date;
}
export type StudioSummaryList = StudioSummary[];
export interface ListStudiosOutput {
  Studios?: StudioSummary[];
  Marker?: string;
}
export interface ListStudioSessionMappingsInput {
  StudioId?: string;
  IdentityType?: IdentityType;
  Marker?: string;
}
export interface SessionMappingSummary {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
  CreationTime?: Date;
}
export type SessionMappingSummaryList = SessionMappingSummary[];
export interface ListStudioSessionMappingsOutput {
  SessionMappings?: SessionMappingSummary[];
  Marker?: string;
}
export interface ListSupportedInstanceTypesInput {
  ReleaseLabel?: string;
  Marker?: string;
}
export interface SupportedInstanceType {
  Type?: string;
  MemoryGB?: number;
  StorageGB?: number;
  VCPU?: number;
  Is64BitsOnly?: boolean;
  InstanceFamilyId?: string;
  EbsOptimizedAvailable?: boolean;
  EbsOptimizedByDefault?: boolean;
  NumberOfDisks?: number;
  EbsStorageOnly?: boolean;
  Architecture?: string;
}
export type SupportedInstanceTypesList = SupportedInstanceType[];
export interface ListSupportedInstanceTypesOutput {
  SupportedInstanceTypes?: SupportedInstanceType[];
  Marker?: string;
}
export interface ModifyClusterInput {
  ClusterId?: string;
  StepConcurrencyLevel?: number;
  ExtendedSupport?: boolean;
}
export interface ModifyClusterOutput {
  StepConcurrencyLevel?: number;
  ExtendedSupport?: boolean;
}
export interface InstanceFleetModifyConfig {
  InstanceFleetId?: string;
  TargetOnDemandCapacity?: number;
  TargetSpotCapacity?: number;
  ResizeSpecifications?: InstanceFleetResizingSpecifications;
  InstanceTypeConfigs?: InstanceTypeConfig[];
  Context?: string;
}
export interface ModifyInstanceFleetInput {
  ClusterId?: string;
  InstanceFleet?: InstanceFleetModifyConfig;
}
export interface ModifyInstanceFleetResponse {}
export type EC2InstanceIdsToTerminateList = string[];
export type ReconfigurationType = "OVERWRITE" | "MERGE" | (string & {});
export interface InstanceGroupModifyConfig {
  InstanceGroupId?: string;
  InstanceCount?: number;
  EC2InstanceIdsToTerminate?: string[];
  ShrinkPolicy?: ShrinkPolicy;
  ReconfigurationType?: ReconfigurationType;
  Configurations?: Configuration[];
}
export type InstanceGroupModifyConfigList = InstanceGroupModifyConfig[];
export interface ModifyInstanceGroupsInput {
  ClusterId?: string;
  InstanceGroups?: InstanceGroupModifyConfig[];
}
export interface ModifyInstanceGroupsResponse {}
export interface PutAutoScalingPolicyInput {
  ClusterId?: string;
  InstanceGroupId?: string;
  AutoScalingPolicy?: AutoScalingPolicy;
}
export interface PutAutoScalingPolicyOutput {
  ClusterId?: string;
  InstanceGroupId?: string;
  AutoScalingPolicy?: AutoScalingPolicyDescription & {
    Constraints: ScalingConstraints & {
      MinCapacity: number;
      MaxCapacity: number;
    };
    Rules: (ScalingRule & {
      Name: string;
      Action: ScalingAction & {
        SimpleScalingPolicyConfiguration: SimpleScalingPolicyConfiguration & {
          ScalingAdjustment: number;
        };
      };
      Trigger: ScalingTrigger & {
        CloudWatchAlarmDefinition: CloudWatchAlarmDefinition & {
          ComparisonOperator: ComparisonOperator;
          MetricName: string;
          Period: number;
          Threshold: NonNegativeDouble;
        };
      };
    })[];
  };
  ClusterArn?: string;
}
export interface PutAutoTerminationPolicyInput {
  ClusterId?: string;
  AutoTerminationPolicy?: AutoTerminationPolicy;
}
export interface PutAutoTerminationPolicyOutput {}
export interface PutBlockPublicAccessConfigurationInput {
  BlockPublicAccessConfiguration?: BlockPublicAccessConfiguration;
}
export interface PutBlockPublicAccessConfigurationOutput {}
export interface PutManagedScalingPolicyInput {
  ClusterId?: string;
  ManagedScalingPolicy?: ManagedScalingPolicy;
}
export interface PutManagedScalingPolicyOutput {}
export interface RemoveAutoScalingPolicyInput {
  ClusterId?: string;
  InstanceGroupId?: string;
}
export interface RemoveAutoScalingPolicyOutput {}
export interface RemoveAutoTerminationPolicyInput {
  ClusterId?: string;
}
export interface RemoveAutoTerminationPolicyOutput {}
export interface RemoveManagedScalingPolicyInput {
  ClusterId?: string;
}
export interface RemoveManagedScalingPolicyOutput {}
export interface RemoveTagsInput {
  ResourceId?: string;
  TagKeys?: string[];
  ClusterId?: string;
}
export interface RemoveTagsOutput {}
export type InstanceFleetConfigList = InstanceFleetConfig[];
export type SecurityGroupsList = string[];
export interface JobFlowInstancesConfig {
  MasterInstanceType?: string;
  SlaveInstanceType?: string;
  InstanceCount?: number;
  InstanceGroups?: InstanceGroupConfig[];
  InstanceFleets?: InstanceFleetConfig[];
  Ec2KeyName?: string;
  Placement?: PlacementType;
  KeepJobFlowAliveWhenNoSteps?: boolean;
  TerminationProtected?: boolean;
  UnhealthyNodeReplacement?: boolean;
  HadoopVersion?: string;
  Ec2SubnetId?: string;
  Ec2SubnetIds?: string[];
  EmrManagedMasterSecurityGroup?: string;
  EmrManagedSlaveSecurityGroup?: string;
  ServiceAccessSecurityGroup?: string;
  AdditionalMasterSecurityGroups?: string[];
  AdditionalSlaveSecurityGroups?: string[];
}
export type BootstrapActionConfigList = BootstrapActionConfig[];
export interface SupportedProductConfig {
  Name?: string;
  Args?: string[];
}
export type NewSupportedProductsList = SupportedProductConfig[];
export interface RunJobFlowInput {
  Name?: string;
  LogUri?: string;
  LogEncryptionKmsKeyId?: string;
  AdditionalInfo?: string;
  AmiVersion?: string;
  ReleaseLabel?: string;
  Instances?: JobFlowInstancesConfig;
  Steps?: StepConfig[];
  StepExecutionRoleArn?: string;
  BootstrapActions?: BootstrapActionConfig[];
  SupportedProducts?: string[];
  NewSupportedProducts?: SupportedProductConfig[];
  Applications?: Application[];
  Configurations?: Configuration[];
  VisibleToAllUsers?: boolean;
  JobFlowRole?: string;
  ServiceRole?: string;
  Tags?: Tag[];
  SecurityConfiguration?: string;
  AutoScalingRole?: string;
  ScaleDownBehavior?: ScaleDownBehavior;
  CustomAmiId?: string;
  EbsRootVolumeSize?: number;
  RepoUpgradeOnBoot?: RepoUpgradeOnBoot;
  KerberosAttributes?: KerberosAttributes;
  StepConcurrencyLevel?: number;
  ManagedScalingPolicy?: ManagedScalingPolicy;
  PlacementGroupConfigs?: PlacementGroupConfig[];
  AutoTerminationPolicy?: AutoTerminationPolicy;
  OSReleaseLabel?: string;
  EbsRootVolumeIops?: number;
  EbsRootVolumeThroughput?: number;
  ExtendedSupport?: boolean;
  MonitoringConfiguration?: MonitoringConfiguration;
  SessionEnabled?: boolean;
}
export interface RunJobFlowOutput {
  JobFlowId?: string;
  ClusterArn?: string;
}
export interface SetKeepJobFlowAliveWhenNoStepsInput {
  JobFlowIds?: string[];
  KeepJobFlowAliveWhenNoSteps?: boolean;
}
export interface SetKeepJobFlowAliveWhenNoStepsResponse {}
export interface SetTerminationProtectionInput {
  JobFlowIds?: string[];
  TerminationProtected?: boolean;
}
export interface SetTerminationProtectionResponse {}
export interface SetUnhealthyNodeReplacementInput {
  JobFlowIds?: string[];
  UnhealthyNodeReplacement?: boolean;
}
export interface SetUnhealthyNodeReplacementResponse {}
export interface SetVisibleToAllUsersInput {
  JobFlowIds?: string[];
  VisibleToAllUsers?: boolean;
}
export interface SetVisibleToAllUsersResponse {}
export interface NotebookS3LocationFromInput {
  Bucket?: string;
  Key?: string;
}
export interface OutputNotebookS3LocationFromInput {
  Bucket?: string;
  Key?: string;
}
export interface StartNotebookExecutionInput {
  EditorId?: string;
  RelativePath?: string;
  NotebookExecutionName?: string;
  NotebookParams?: string;
  ExecutionEngine?: ExecutionEngineConfig;
  ServiceRole?: string;
  NotebookInstanceSecurityGroupId?: string;
  Tags?: Tag[];
  NotebookS3Location?: NotebookS3LocationFromInput;
  OutputNotebookS3Location?: OutputNotebookS3LocationFromInput;
  OutputNotebookFormat?: OutputNotebookFormat;
  EnvironmentVariables?: { [key: string]: string | undefined };
}
export interface StartNotebookExecutionOutput {
  NotebookExecutionId?: string;
}
export type ClientRequestToken = string;
export interface StartSessionInput {
  Name?: string;
  ClusterId?: string;
  ExecutionRoleArn?: string;
  EngineConfigurations?: Configuration[];
  MonitoringConfiguration?: SessionMonitoringConfiguration;
  SessionIdleTimeoutInMinutes?: number;
  ClientRequestToken?: string;
  Tags?: Tag[];
}
export interface StartSessionOutput {
  Id: string;
  ClusterId?: string;
  Arn?: string;
  AccountId?: string;
  State?: SessionState;
}
export interface StopNotebookExecutionInput {
  NotebookExecutionId?: string;
}
export interface StopNotebookExecutionResponse {}
export interface TerminateJobFlowsInput {
  JobFlowIds?: string[];
}
export interface TerminateJobFlowsResponse {}
export interface TerminateSessionInput {
  ClusterId?: string;
  SessionId?: string;
}
export interface TerminateSessionOutput {
  ClusterId: string;
  SessionId: string;
  State: SessionState;
}
export interface UpdateStudioInput {
  StudioId?: string;
  Name?: string;
  Description?: string;
  SubnetIds?: string[];
  DefaultS3Location?: string;
  EncryptionKeyArn?: string;
}
export interface UpdateStudioResponse {}
export interface UpdateStudioSessionMappingInput {
  StudioId?: string;
  IdentityId?: string;
  IdentityName?: string;
  IdentityType?: IdentityType;
  SessionPolicyArn?: string;
}
export interface UpdateStudioSessionMappingResponse {}
export type ErrorMessage = string;
export type ErrorCode = string;
export type AddInstanceFleetError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Adds an instance fleet to a running cluster.
 *
 * The instance fleet configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x.
 */
export const addInstanceFleet: API.OperationMethod<
  AddInstanceFleetInput,
  AddInstanceFleetOutput,
  AddInstanceFleetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, InstanceFleet: i_InstanceFleetConfig },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddInstanceFleet",
})) as any;

export type AddInstanceGroupsError = InternalServerError | CommonErrors;
/**
 * Adds one or more instance groups to a running cluster.
 */
export const addInstanceGroups: API.OperationMethod<
  AddInstanceGroupsInput,
  AddInstanceGroupsOutput,
  AddInstanceGroupsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InstanceGroups: D.list(i_InstanceGroupConfig), JobFlowId: 0 },
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddInstanceGroups",
})) as any;

export type AddJobFlowStepsError = InternalServerError | CommonErrors;
/**
 * AddJobFlowSteps adds new steps to a running cluster. A maximum of 256 steps are allowed
 * in each job flow.
 *
 * If your cluster is long-running (such as a Hive data warehouse) or complex, you may
 * require more than 256 steps to process your data. You can bypass the 256-step limitation in
 * various ways, including using SSH to connect to the master node and submitting queries
 * directly to the software running on the master node, such as Hive and Hadoop.
 *
 * A step specifies the location of a JAR file stored either on the master node of the
 * cluster or in Amazon S3. Each step is performed by the main function of the main
 * class of the JAR file. The main class can be specified either in the manifest of the JAR or
 * by using the MainFunction parameter of the step.
 *
 * Amazon EMR executes each step in the order listed. For a step to be considered
 * complete, the main function must exit with a zero exit code and all Hadoop jobs started
 * while the step was running must have completed and run successfully.
 *
 * You can only add steps to a cluster that is in one of the following states: STARTING,
 * BOOTSTRAPPING, RUNNING, or WAITING.
 *
 * The string values passed into `HadoopJarStep` object cannot exceed a total
 * of 10240 characters.
 */
export const addJobFlowSteps: API.OperationMethod<
  AddJobFlowStepsInput,
  AddJobFlowStepsOutput,
  AddJobFlowStepsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobFlowId: 0, Steps: D.list(i_StepConfig), ExecutionRoleArn: 0 },
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddJobFlowSteps",
})) as any;

export type AddTagsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Adds tags to an Amazon EMR resource, such as a cluster or an Amazon EMR
 * Studio. Tags make it easier to associate resources in various ways, such as grouping
 * clusters to track your Amazon EMR resource allocation costs. For more information,
 * see Tag
 * Clusters.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, Tags: D.list(i_Tag), ClusterId: 0 },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
})) as any;

export type CancelStepsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Cancels a pending step or steps in a running cluster. Available only in Amazon EMR versions 4.8.0 and later, excluding version 5.0.0. A maximum of 256 steps are allowed in
 * each CancelSteps request. CancelSteps is idempotent but asynchronous; it does not guarantee
 * that a step will be canceled, even if the request is successfully submitted. When you use
 * Amazon EMR releases 5.28.0 and later, you can cancel steps that are in a
 * `PENDING` or `RUNNING` state. In earlier versions of Amazon EMR, you can only cancel steps that are in a `PENDING` state.
 */
export const cancelSteps: API.OperationMethod<
  CancelStepsInput,
  CancelStepsOutput,
  CancelStepsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, StepIds: 0, StepCancellationOption: 0 },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSteps",
})) as any;

export type CreatePersistentAppUIError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a persistent application user interface.
 */
export const createPersistentAppUI: API.OperationMethod<
  CreatePersistentAppUIInput,
  CreatePersistentAppUIOutput,
  CreatePersistentAppUIError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TargetResourceArn: 0,
      EMRContainersConfig: { JobRunId: 0 },
      Tags: D.list(i_Tag),
      XReferer: 0,
      ProfilerType: 0,
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePersistentAppUI",
})) as any;

export type CreateSecurityConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | SecurityConfigurationAlreadyExists
  | CommonErrors;
/**
 * Creates a security configuration, which is stored in the service and can be specified
 * when a cluster is created.
 */
export const createSecurityConfiguration: API.OperationMethod<
  CreateSecurityConfigurationInput,
  CreateSecurityConfigurationOutput,
  CreateSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0, SecurityConfiguration: 0 },
    output: { CreationDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    SecurityConfigurationAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfiguration",
})) as any;

export type CreateStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioServiceRoleNotAssumable
  | StudioServiceRoleMissingS3Access
  | CommonErrors;
/**
 * Creates a new Amazon EMR Studio.
 */
export const createStudio: API.OperationMethod<
  CreateStudioInput,
  CreateStudioOutput,
  CreateStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      AuthMode: 0,
      VpcId: 0,
      SubnetIds: 0,
      ServiceRole: 0,
      UserRole: 0,
      WorkspaceSecurityGroupId: 0,
      EngineSecurityGroupId: 0,
      DefaultS3Location: 0,
      IdpAuthUrl: 0,
      IdpRelayStateParameterName: 0,
      Tags: D.list(i_Tag),
      TrustedIdentityPropagationEnabled: 0,
      IdcUserAssignment: 0,
      IdcInstanceArn: 0,
      EncryptionKeyArn: 0,
    },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    StudioServiceRoleNotAssumable,
    StudioServiceRoleMissingS3Access,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStudio",
})) as any;

export type CreateStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Maps a user or group to the Amazon EMR Studio specified by
 * `StudioId`, and applies a session policy to refine Studio permissions for that
 * user or group. Use `CreateStudioSessionMapping` to assign users to a Studio when
 * you use IAM Identity Center authentication. For instructions on how to assign users to a
 * Studio when you use IAM authentication, see Assign a user or group to your EMR Studio.
 */
export const createStudioSessionMapping: API.OperationMethod<
  CreateStudioSessionMappingInput,
  CreateStudioSessionMappingResponse,
  CreateStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StudioId: 0,
      IdentityId: 0,
      IdentityName: 0,
      IdentityType: 0,
      SessionPolicyArn: 0,
    },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStudioSessionMapping",
})) as any;

export type DeleteSecurityConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | SecurityConfigurationNotFound
  | CommonErrors;
/**
 * Deletes a security configuration.
 */
export const deleteSecurityConfiguration: API.OperationMethod<
  DeleteSecurityConfigurationInput,
  DeleteSecurityConfigurationOutput,
  DeleteSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    InternalServerException,
    InvalidRequestException,
    SecurityConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
})) as any;

export type DeleteStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioNotFound
  | CommonErrors;
/**
 * Removes an Amazon EMR Studio from the Studio metadata store.
 */
export const deleteStudio: API.OperationMethod<
  DeleteStudioInput,
  DeleteStudioResponse,
  DeleteStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { StudioId: 0 } },
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStudio",
})) as any;

export type DeleteStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes a user or group from an Amazon EMR Studio.
 */
export const deleteStudioSessionMapping: API.OperationMethod<
  DeleteStudioSessionMappingInput,
  DeleteStudioSessionMappingResponse,
  DeleteStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StudioId: 0, IdentityId: 0, IdentityName: 0, IdentityType: 0 },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStudioSessionMapping",
})) as any;

export type DescribeClusterError =
  | InternalServerException
  | InvalidRequestException
  | ClusterNotFound
  | CommonErrors;
/**
 * Provides cluster-level details including status, hardware and software configuration,
 * VPC settings, and so on.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterInput,
  DescribeClusterOutput,
  DescribeClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0 },
    output: {
      Cluster: {
        Status: o_ClusterStatus,
        KerberosAttributes: {
          KdcAdminPassword: D.secret,
          CrossRealmTrustPrincipalPassword: D.secret,
          ADDomainJoinPassword: D.secret,
        },
      },
    },
  },
  errors: [InternalServerException, InvalidRequestException, ClusterNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
})) as any;

export type DescribeJobFlowsError = InternalServerError | CommonErrors;
/**
 * This API is no longer supported and will eventually be removed. We recommend you use
 * ListClusters, DescribeCluster, ListSteps, ListInstanceGroups and ListBootstrapActions instead.
 *
 * DescribeJobFlows returns a list of job flows that match all of the supplied parameters.
 * The parameters can include a list of job flow IDs, job flow states, and restrictions on job
 * flow creation date and time.
 *
 * Regardless of supplied parameters, only job flows created within the last two months are
 * returned.
 *
 * If no parameters are supplied, then job flows matching either of the following criteria
 * are returned:
 *
 * - Job flows created and completed in the last two weeks
 *
 * - Job flows created within the last two months that are in one of the following
 * states: `RUNNING`, `WAITING`, `SHUTTING_DOWN`,
 * `STARTING`
 *
 * Amazon EMR can return a maximum of 512 job flow descriptions.
 */
export const describeJobFlows: API.OperationMethod<
  DescribeJobFlowsInput,
  DescribeJobFlowsOutput,
  DescribeJobFlowsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatedAfter: 0,
      CreatedBefore: 0,
      JobFlowIds: 0,
      JobFlowStates: 0,
    },
    output: {
      JobFlows: D.list({
        ExecutionStatusDetail: {
          CreationDateTime: D.ts,
          StartDateTime: D.ts,
          ReadyDateTime: D.ts,
          EndDateTime: D.ts,
        },
        Instances: {
          InstanceGroups: D.list({
            CreationDateTime: D.ts,
            StartDateTime: D.ts,
            ReadyDateTime: D.ts,
            EndDateTime: D.ts,
          }),
        },
        Steps: D.list({
          ExecutionStatusDetail: {
            CreationDateTime: D.ts,
            StartDateTime: D.ts,
            EndDateTime: D.ts,
          },
        }),
      }),
    },
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobFlows",
})) as any;

export type DescribeNotebookExecutionError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides details of a notebook execution.
 */
export const describeNotebookExecution: API.OperationMethod<
  DescribeNotebookExecutionInput,
  DescribeNotebookExecutionOutput,
  DescribeNotebookExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NotebookExecutionId: 0 },
    output: { NotebookExecution: { StartTime: D.ts, EndTime: D.ts } },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotebookExecution",
})) as any;

export type DescribePersistentAppUIError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Describes a persistent application user interface.
 */
export const describePersistentAppUI: API.OperationMethod<
  DescribePersistentAppUIInput,
  DescribePersistentAppUIOutput,
  DescribePersistentAppUIError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PersistentAppUIId: 0 },
    output: { PersistentAppUI: { CreationTime: D.ts, LastModifiedTime: D.ts } },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePersistentAppUI",
})) as any;

export type DescribeReleaseLabelError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides Amazon EMR release label details, such as the releases available the
 * Region where the API request is run, and the available applications for a specific Amazon EMR release label. Can also list Amazon EMR releases that support a
 * specified version of Spark.
 */
export const describeReleaseLabel: API.OperationMethod<
  DescribeReleaseLabelInput,
  DescribeReleaseLabelOutput,
  DescribeReleaseLabelError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ReleaseLabel: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReleaseLabel",
})) as any;

export type DescribeSecurityConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | SecurityConfigurationNotFound
  | CommonErrors;
/**
 * Provides the details of a security configuration by returning the configuration
 * JSON.
 */
export const describeSecurityConfiguration: API.OperationMethod<
  DescribeSecurityConfigurationInput,
  DescribeSecurityConfigurationOutput,
  DescribeSecurityConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CreationDateTime: D.ts },
  },
  errors: [
    InternalServerException,
    InvalidRequestException,
    SecurityConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityConfiguration",
})) as any;

export type DescribeStepError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides more detail about the cluster step.
 */
export const describeStep: API.OperationMethod<
  DescribeStepInput,
  DescribeStepOutput,
  DescribeStepError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, StepId: 0 },
    output: { Step: { Status: o_StepStatus } },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStep",
})) as any;

export type DescribeStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioNotFound
  | CommonErrors;
/**
 * Returns details for the specified Amazon EMR Studio including ID, Name, VPC,
 * Studio access URL, and so on.
 */
export const describeStudio: API.OperationMethod<
  DescribeStudioInput,
  DescribeStudioOutput,
  DescribeStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StudioId: 0 },
    output: { Studio: { CreationTime: D.ts } },
  },
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStudio",
})) as any;

export type GetAutoTerminationPolicyError = CommonErrors;
/**
 * Returns the auto-termination policy for an Amazon EMR cluster.
 */
export const getAutoTerminationPolicy: API.OperationMethod<
  GetAutoTerminationPolicyInput,
  GetAutoTerminationPolicyOutput,
  GetAutoTerminationPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoTerminationPolicy",
})) as any;

export type GetBlockPublicAccessConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the Amazon EMR block public access configuration for your Amazon Web Services account in the current Region. For more information see Configure Block
 * Public Access for Amazon EMR in the Amazon EMR
 * Management Guide.
 */
export const getBlockPublicAccessConfiguration: API.OperationMethod<
  GetBlockPublicAccessConfigurationInput,
  GetBlockPublicAccessConfigurationOutput,
  GetBlockPublicAccessConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: {
      BlockPublicAccessConfigurationMetadata: { CreationDateTime: D.ts },
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlockPublicAccessConfiguration",
})) as any;

export type GetClusterSessionCredentialsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides temporary, HTTP basic credentials that are associated with a given runtime
 * IAM role and used by a cluster with fine-grained access control
 * activated. You can use these credentials to connect to cluster endpoints that support
 * username and password authentication.
 */
export const getClusterSessionCredentials: API.OperationMethod<
  GetClusterSessionCredentialsInput,
  GetClusterSessionCredentialsOutput,
  GetClusterSessionCredentialsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, ExecutionRoleArn: 0 },
    output: { Credentials: o_Credentials, ExpiresAt: D.ts },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterSessionCredentials",
})) as any;

export type GetManagedScalingPolicyError = CommonErrors;
/**
 * Fetches the attached managed scaling policy for an Amazon EMR cluster.
 */
export const getManagedScalingPolicy: API.OperationMethod<
  GetManagedScalingPolicyInput,
  GetManagedScalingPolicyOutput,
  GetManagedScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedScalingPolicy",
})) as any;

export type GetOnClusterAppUIPresignedURLError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * The presigned URL properties for the cluster's application user interface.
 */
export const getOnClusterAppUIPresignedURL: API.OperationMethod<
  GetOnClusterAppUIPresignedURLInput,
  GetOnClusterAppUIPresignedURLOutput,
  GetOnClusterAppUIPresignedURLError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterId: 0,
      OnClusterAppUIType: 0,
      ApplicationId: 0,
      DryRun: 0,
      ExecutionRoleArn: 0,
    },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOnClusterAppUIPresignedURL",
})) as any;

export type GetPersistentAppUIPresignedURLError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * The presigned URL properties for the cluster's application user interface.
 */
export const getPersistentAppUIPresignedURL: API.OperationMethod<
  GetPersistentAppUIPresignedURLInput,
  GetPersistentAppUIPresignedURLOutput,
  GetPersistentAppUIPresignedURLError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PersistentAppUIId: 0,
      PersistentAppUIType: 0,
      ApplicationId: 0,
      AuthProxyCall: 0,
      ExecutionRoleArn: 0,
    },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersistentAppUIPresignedURL",
})) as any;

export type GetSessionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns detailed information about a session.
 */
export const getSession: API.OperationMethod<
  GetSessionInput,
  GetSessionOutput,
  GetSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, SessionId: 0 },
    output: { Session: o_Session },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

export type GetSessionEndpointError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the Spark Connect endpoint URL and a time-limited authentication token for the specified session. Use the endpoint and token to connect a PySpark client to the session. Call this operation again when the token expires to obtain a new one.
 */
export const getSessionEndpoint: API.OperationMethod<
  GetSessionEndpointInput,
  GetSessionEndpointOutput,
  GetSessionEndpointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, SessionId: 0 },
    output: {
      AuthToken: D.secret,
      AuthTokenExpirationTime: D.ts,
      Credentials: o_Credentials,
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
})) as any;

export type GetStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Fetches mapping details for the specified Amazon EMR Studio and identity (user
 * or group).
 */
export const getStudioSessionMapping: API.OperationMethod<
  GetStudioSessionMappingInput,
  GetStudioSessionMappingOutput,
  GetStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { StudioId: 0, IdentityId: 0, IdentityName: 0, IdentityType: 0 },
    output: { SessionMapping: { CreationTime: D.ts, LastModifiedTime: D.ts } },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStudioSessionMapping",
})) as any;

export type ListBootstrapActionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides information about the bootstrap actions associated with a cluster.
 */
export const listBootstrapActions: API.PaginatedOperationMethod<
  ListBootstrapActionsInput,
  ListBootstrapActionsOutput,
  ListBootstrapActionsError,
  Creds | HttpClient.HttpClient,
  Command
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { ClusterId: 0, Marker: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBootstrapActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "BootstrapActions",
  } as const,
})) as any;

export type ListClustersError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides the status of all clusters visible to this Amazon Web Services account. Allows
 * you to filter the list of clusters based on certain criteria; for example, filtering by
 * cluster creation date and time or by status. This call returns a maximum of 50 clusters in
 * unsorted order per call, but returns a marker to track the paging of the cluster list
 * across multiple ListClusters calls.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersInput,
  ListClustersOutput,
  ListClustersError,
  Creds | HttpClient.HttpClient,
  ClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CreatedAfter: 0, CreatedBefore: 0, ClusterStates: 0, Marker: 0 },
    output: { Clusters: D.list({ Status: o_ClusterStatus }) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Clusters",
  } as const,
})) as any;

export type ListInstanceFleetsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists all available details about the instance fleets in a cluster.
 *
 * The instance fleet configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x versions.
 */
export const listInstanceFleets: API.PaginatedOperationMethod<
  ListInstanceFleetsInput,
  ListInstanceFleetsOutput,
  ListInstanceFleetsError,
  Creds | HttpClient.HttpClient,
  InstanceFleet
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, Marker: 0 },
    output: {
      InstanceFleets: D.list({
        Status: {
          Timeline: {
            CreationDateTime: D.ts,
            ReadyDateTime: D.ts,
            EndDateTime: D.ts,
          },
        },
      }),
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceFleets",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InstanceFleets",
  } as const,
})) as any;

export type ListInstanceGroupsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides all available details about the instance groups in a cluster.
 */
export const listInstanceGroups: API.PaginatedOperationMethod<
  ListInstanceGroupsInput,
  ListInstanceGroupsOutput,
  ListInstanceGroupsError,
  Creds | HttpClient.HttpClient,
  InstanceGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, Marker: 0 },
    output: {
      InstanceGroups: D.list({
        Status: {
          Timeline: {
            CreationDateTime: D.ts,
            ReadyDateTime: D.ts,
            EndDateTime: D.ts,
          },
        },
      }),
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InstanceGroups",
  } as const,
})) as any;

export type ListInstancesError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides information for all active Amazon EC2 instances and Amazon EC2
 * instances terminated in the last 30 days, up to a maximum of 2,000. Amazon EC2
 * instances in any of the following states are considered active: AWAITING_FULFILLMENT,
 * PROVISIONING, BOOTSTRAPPING, RUNNING.
 */
export const listInstances: API.PaginatedOperationMethod<
  ListInstancesInput,
  ListInstancesOutput,
  ListInstancesError,
  Creds | HttpClient.HttpClient,
  Instance
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterId: 0,
      InstanceGroupId: 0,
      InstanceGroupTypes: 0,
      InstanceFleetId: 0,
      InstanceFleetType: 0,
      InstanceStates: 0,
      Marker: 0,
    },
    output: {
      Instances: D.list({
        Status: {
          Timeline: {
            CreationDateTime: D.ts,
            ReadyDateTime: D.ts,
            EndDateTime: D.ts,
          },
        },
      }),
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Instances",
  } as const,
})) as any;

export type ListNotebookExecutionsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides summaries of all notebook executions. You can filter the list based on multiple
 * criteria such as status, time range, and editor id. Returns a maximum of 50 notebook
 * executions and a marker to track the paging of a longer notebook execution list across
 * multiple `ListNotebookExecutions` calls.
 */
export const listNotebookExecutions: API.PaginatedOperationMethod<
  ListNotebookExecutionsInput,
  ListNotebookExecutionsOutput,
  ListNotebookExecutionsError,
  Creds | HttpClient.HttpClient,
  NotebookExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EditorId: 0,
      Status: 0,
      From: 0,
      To: 0,
      Marker: 0,
      ExecutionEngineId: 0,
    },
    output: { NotebookExecutions: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookExecutions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "NotebookExecutions",
  } as const,
})) as any;

export type ListReleaseLabelsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Retrieves release labels of Amazon EMR services in the Region where the API is
 * called.
 */
export const listReleaseLabels: API.PaginatedOperationMethod<
  ListReleaseLabelsInput,
  ListReleaseLabelsOutput,
  ListReleaseLabelsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: { Prefix: 0, Application: 0 },
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReleaseLabels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecurityConfigurationsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists all the security configurations visible to this account, providing their creation
 * dates and times, and their names. This call returns a maximum of 50 clusters per call, but
 * returns a marker to track the paging of the cluster list across multiple
 * ListSecurityConfigurations calls.
 */
export const listSecurityConfigurations: API.PaginatedOperationMethod<
  ListSecurityConfigurationsInput,
  ListSecurityConfigurationsOutput,
  ListSecurityConfigurationsError,
  Creds | HttpClient.HttpClient,
  SecurityConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Marker: 0 },
    output: { SecurityConfigurations: D.list({ CreationDateTime: D.ts }) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityConfigurations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SecurityConfigurations",
  } as const,
})) as any;

export type ListSessionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the sessions on a cluster. You can filter the results by session state. Newer sessions are returned first.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsInput,
  ListSessionsOutput,
  ListSessionsError,
  Creds | HttpClient.HttpClient,
  Session
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, SessionStates: 0, NextToken: 0, MaxResults: 0 },
    output: { Sessions: D.list(o_Session) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sessions",
  } as const,
})) as any;

export type ListStepsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides a list of steps for the cluster in reverse order unless you specify
 * `stepIds` with the request or filter by `StepStates`. You can
 * specify a maximum of 10 `stepIDs`. The CLI automatically
 * paginates results to return a list greater than 50 steps. To return more than 50 steps
 * using the CLI, specify a `Marker`, which is a pagination token
 * that indicates the next set of steps to retrieve.
 */
export const listSteps: API.PaginatedOperationMethod<
  ListStepsInput,
  ListStepsOutput,
  ListStepsError,
  Creds | HttpClient.HttpClient,
  StepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, StepStates: 0, StepIds: 0, Marker: 0 },
    output: { Steps: D.list({ Status: o_StepStatus }) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSteps",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Steps",
  } as const,
})) as any;

export type ListStudiosError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of all Amazon EMR Studios associated with the Amazon Web Services account. The list includes details such as ID, Studio Access URL, and
 * creation time for each Studio.
 */
export const listStudios: API.PaginatedOperationMethod<
  ListStudiosInput,
  ListStudiosOutput,
  ListStudiosError,
  Creds | HttpClient.HttpClient,
  StudioSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Marker: 0 },
    output: { Studios: D.list({ CreationTime: D.ts }) },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStudios",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Studios",
  } as const,
})) as any;

export type ListStudioSessionMappingsError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of all user or group session mappings for the Amazon EMR Studio
 * specified by `StudioId`.
 */
export const listStudioSessionMappings: API.PaginatedOperationMethod<
  ListStudioSessionMappingsInput,
  ListStudioSessionMappingsOutput,
  ListStudioSessionMappingsError,
  Creds | HttpClient.HttpClient,
  SessionMappingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { StudioId: 0, IdentityType: 0, Marker: 0 },
    output: { SessionMappings: D.list({ CreationTime: D.ts }) },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStudioSessionMappings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SessionMappings",
  } as const,
})) as any;

export type ListSupportedInstanceTypesError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * A list of the instance types that Amazon EMR supports. You can filter the
 * list by Amazon Web Services Region and Amazon EMR release.
 */
export const listSupportedInstanceTypes: API.PaginatedOperationMethod<
  ListSupportedInstanceTypesInput,
  ListSupportedInstanceTypesOutput,
  ListSupportedInstanceTypesError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { ReleaseLabel: 0, Marker: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportedInstanceTypes",
  pagination: { inputToken: "Marker", outputToken: "Marker" } as const,
})) as any;

export type ModifyClusterError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the number of steps that can be executed concurrently for the cluster specified
 * using ClusterID.
 */
export const modifyCluster: API.OperationMethod<
  ModifyClusterInput,
  ModifyClusterOutput,
  ModifyClusterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, StepConcurrencyLevel: 0, ExtendedSupport: 0 },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
})) as any;

export type ModifyInstanceFleetError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Modifies the target On-Demand and target Spot capacities for the instance fleet with the
 * specified InstanceFleetID within the cluster specified using ClusterID. The call either
 * succeeds or fails atomically.
 *
 * The instance fleet configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x versions.
 */
export const modifyInstanceFleet: API.OperationMethod<
  ModifyInstanceFleetInput,
  ModifyInstanceFleetResponse,
  ModifyInstanceFleetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterId: 0,
      InstanceFleet: {
        InstanceFleetId: 0,
        TargetOnDemandCapacity: 0,
        TargetSpotCapacity: 0,
        ResizeSpecifications: i_InstanceFleetResizingSpecifications,
        InstanceTypeConfigs: D.list(i_InstanceTypeConfig),
        Context: 0,
      },
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceFleet",
})) as any;

export type ModifyInstanceGroupsError = InternalServerError | CommonErrors;
/**
 * ModifyInstanceGroups modifies the number of nodes and configuration settings of an
 * instance group. The input parameters include the new target instance count for the group
 * and the instance group ID. The call will either succeed or fail atomically.
 */
export const modifyInstanceGroups: API.OperationMethod<
  ModifyInstanceGroupsInput,
  ModifyInstanceGroupsResponse,
  ModifyInstanceGroupsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterId: 0,
      InstanceGroups: D.list({
        InstanceGroupId: 0,
        InstanceCount: 0,
        EC2InstanceIdsToTerminate: 0,
        ShrinkPolicy: {
          DecommissionTimeout: 0,
          InstanceResizePolicy: {
            InstancesToTerminate: 0,
            InstancesToProtect: 0,
            InstanceTerminationTimeout: 0,
          },
        },
        ReconfigurationType: 0,
        Configurations: D.list(i_Configuration),
      }),
    },
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceGroups",
})) as any;

export type PutAutoScalingPolicyError = CommonErrors;
/**
 * Creates or updates an automatic scaling policy for a core instance group or task
 * instance group in an Amazon EMR cluster. The automatic scaling policy defines how
 * an instance group dynamically adds and terminates Amazon EC2 instances in response
 * to the value of a CloudWatch metric.
 */
export const putAutoScalingPolicy: API.OperationMethod<
  PutAutoScalingPolicyInput,
  PutAutoScalingPolicyOutput,
  PutAutoScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClusterId: 0,
      InstanceGroupId: 0,
      AutoScalingPolicy: i_AutoScalingPolicy,
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAutoScalingPolicy",
})) as any;

export type PutAutoTerminationPolicyError = CommonErrors;
/**
 * Auto-termination is supported in Amazon EMR releases 5.30.0 and 6.1.0 and
 * later. For more information, see Using an
 * auto-termination policy.
 *
 * Creates or updates an auto-termination policy for an Amazon EMR cluster. An
 * auto-termination policy defines the amount of idle time in seconds after which a cluster
 * automatically terminates. For alternative cluster termination options, see Control
 * cluster termination.
 */
export const putAutoTerminationPolicy: API.OperationMethod<
  PutAutoTerminationPolicyInput,
  PutAutoTerminationPolicyOutput,
  PutAutoTerminationPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, AutoTerminationPolicy: i_AutoTerminationPolicy },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAutoTerminationPolicy",
})) as any;

export type PutBlockPublicAccessConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates or updates an Amazon EMR block public access configuration for your
 * Amazon Web Services account in the current Region. For more information see Configure Block
 * Public Access for Amazon EMR in the Amazon EMR
 * Management Guide.
 */
export const putBlockPublicAccessConfiguration: API.OperationMethod<
  PutBlockPublicAccessConfigurationInput,
  PutBlockPublicAccessConfigurationOutput,
  PutBlockPublicAccessConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      BlockPublicAccessConfiguration: {
        BlockPublicSecurityGroupRules: 0,
        PermittedPublicSecurityGroupRuleRanges: D.list({
          MinRange: 0,
          MaxRange: 0,
        }),
        Classification: 0,
        Configurations: D.list(i_Configuration),
        Properties: 0,
      },
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBlockPublicAccessConfiguration",
})) as any;

export type PutManagedScalingPolicyError = CommonErrors;
/**
 * Creates or updates a managed scaling policy for an Amazon EMR cluster. The
 * managed scaling policy defines the limits for resources, such as Amazon EC2
 * instances that can be added or terminated from a cluster. The policy only applies to the
 * core and task nodes. The master node cannot be scaled after initial configuration.
 */
export const putManagedScalingPolicy: API.OperationMethod<
  PutManagedScalingPolicyInput,
  PutManagedScalingPolicyOutput,
  PutManagedScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClusterId: 0, ManagedScalingPolicy: i_ManagedScalingPolicy },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutManagedScalingPolicy",
})) as any;

export type RemoveAutoScalingPolicyError = CommonErrors;
/**
 * Removes an automatic scaling policy from a specified instance group within an Amazon EMR cluster.
 */
export const removeAutoScalingPolicy: API.OperationMethod<
  RemoveAutoScalingPolicyInput,
  RemoveAutoScalingPolicyOutput,
  RemoveAutoScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterId: 0, InstanceGroupId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAutoScalingPolicy",
})) as any;

export type RemoveAutoTerminationPolicyError = CommonErrors;
/**
 * Removes an auto-termination policy from an Amazon EMR cluster.
 */
export const removeAutoTerminationPolicy: API.OperationMethod<
  RemoveAutoTerminationPolicyInput,
  RemoveAutoTerminationPolicyOutput,
  RemoveAutoTerminationPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAutoTerminationPolicy",
})) as any;

export type RemoveManagedScalingPolicyError = CommonErrors;
/**
 * Removes a managed scaling policy from a specified Amazon EMR cluster.
 */
export const removeManagedScalingPolicy: API.OperationMethod<
  RemoveManagedScalingPolicyInput,
  RemoveManagedScalingPolicyOutput,
  RemoveManagedScalingPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterId: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveManagedScalingPolicy",
})) as any;

export type RemoveTagsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Removes tags from an Amazon EMR resource, such as a cluster or Amazon EMR Studio. Tags make it easier to associate resources in various ways, such as grouping
 * clusters to track your Amazon EMR resource allocation costs. For more information,
 * see Tag
 * Clusters.
 *
 * The following example removes the stack tag with value Prod from a cluster:
 */
export const removeTags: API.OperationMethod<
  RemoveTagsInput,
  RemoveTagsOutput,
  RemoveTagsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, TagKeys: 0, ClusterId: 0 },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
})) as any;

export type RunJobFlowError = InternalServerError | CommonErrors;
/**
 * RunJobFlow creates and starts running a new cluster (job flow). The cluster runs the
 * steps specified. After the steps complete, the cluster stops and the HDFS partition is
 * lost. To prevent loss of data, configure the last step of the job flow to store results in
 * Amazon S3. If the JobFlowInstancesConfig
 * `KeepJobFlowAliveWhenNoSteps` parameter is set to `TRUE`, the cluster
 * transitions to the WAITING state rather than shutting down after the steps have completed.
 *
 * For additional protection, you can set the JobFlowInstancesConfig
 * `TerminationProtected` parameter to `TRUE` to lock the cluster and
 * prevent it from being terminated by API call, user intervention, or in the event of a job
 * flow error.
 *
 * A maximum of 256 steps are allowed in each job flow.
 *
 * If your cluster is long-running (such as a Hive data warehouse) or complex, you may
 * require more than 256 steps to process your data. You can bypass the 256-step limitation in
 * various ways, including using the SSH shell to connect to the master node and submitting
 * queries directly to the software running on the master node, such as Hive and
 * Hadoop.
 *
 * For long-running clusters, we recommend that you periodically store your results.
 *
 * The instance fleets configuration is available only in Amazon EMR releases
 * 4.8.0 and later, excluding 5.0.x versions. The RunJobFlow request can contain
 * InstanceFleets parameters or InstanceGroups parameters, but not both.
 */
export const runJobFlow: API.OperationMethod<
  RunJobFlowInput,
  RunJobFlowOutput,
  RunJobFlowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      LogUri: 0,
      LogEncryptionKmsKeyId: 0,
      AdditionalInfo: 0,
      AmiVersion: 0,
      ReleaseLabel: 0,
      Instances: {
        MasterInstanceType: 0,
        SlaveInstanceType: 0,
        InstanceCount: 0,
        InstanceGroups: D.list(i_InstanceGroupConfig),
        InstanceFleets: D.list(i_InstanceFleetConfig),
        Ec2KeyName: 0,
        Placement: { AvailabilityZone: 0, AvailabilityZones: 0 },
        KeepJobFlowAliveWhenNoSteps: 0,
        TerminationProtected: 0,
        UnhealthyNodeReplacement: 0,
        HadoopVersion: 0,
        Ec2SubnetId: 0,
        Ec2SubnetIds: 0,
        EmrManagedMasterSecurityGroup: 0,
        EmrManagedSlaveSecurityGroup: 0,
        ServiceAccessSecurityGroup: 0,
        AdditionalMasterSecurityGroups: 0,
        AdditionalSlaveSecurityGroups: 0,
      },
      Steps: D.list(i_StepConfig),
      StepExecutionRoleArn: 0,
      BootstrapActions: D.list({
        Name: 0,
        ScriptBootstrapAction: { Path: 0, Args: 0 },
      }),
      SupportedProducts: 0,
      NewSupportedProducts: D.list({ Name: 0, Args: 0 }),
      Applications: D.list({ Name: 0, Version: 0, Args: 0, AdditionalInfo: 0 }),
      Configurations: D.list(i_Configuration),
      VisibleToAllUsers: 0,
      JobFlowRole: 0,
      ServiceRole: 0,
      Tags: D.list(i_Tag),
      SecurityConfiguration: 0,
      AutoScalingRole: 0,
      ScaleDownBehavior: 0,
      CustomAmiId: 0,
      EbsRootVolumeSize: 0,
      RepoUpgradeOnBoot: 0,
      KerberosAttributes: {
        Realm: 0,
        KdcAdminPassword: 0,
        CrossRealmTrustPrincipalPassword: 0,
        ADDomainJoinUser: 0,
        ADDomainJoinPassword: 0,
      },
      StepConcurrencyLevel: 0,
      ManagedScalingPolicy: i_ManagedScalingPolicy,
      PlacementGroupConfigs: D.list({ InstanceRole: 0, PlacementStrategy: 0 }),
      AutoTerminationPolicy: i_AutoTerminationPolicy,
      OSReleaseLabel: 0,
      EbsRootVolumeIops: 0,
      EbsRootVolumeThroughput: 0,
      ExtendedSupport: 0,
      MonitoringConfiguration: {
        CloudWatchLogConfiguration: {
          Enabled: 0,
          LogGroupName: 0,
          LogStreamNamePrefix: 0,
          EncryptionKeyArn: 0,
          LogTypes: 0,
        },
        S3LoggingConfiguration: { LogTypeUploadPolicy: 0 },
      },
      SessionEnabled: 0,
    },
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunJobFlow",
})) as any;

export type SetKeepJobFlowAliveWhenNoStepsError =
  | InternalServerError
  | CommonErrors;
/**
 * You can use the `SetKeepJobFlowAliveWhenNoSteps` to configure a cluster (job flow) to terminate after the step execution, i.e., all your
 * steps are executed. If you want a transient cluster that shuts down after the last of the current executing steps are completed,
 * you can configure `SetKeepJobFlowAliveWhenNoSteps` to false. If you want a long running cluster, configure `SetKeepJobFlowAliveWhenNoSteps` to true.
 *
 * For more information, see Managing Cluster Termination in the *Amazon EMR Management Guide*.
 */
export const setKeepJobFlowAliveWhenNoSteps: API.OperationMethod<
  SetKeepJobFlowAliveWhenNoStepsInput,
  SetKeepJobFlowAliveWhenNoStepsResponse,
  SetKeepJobFlowAliveWhenNoStepsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobFlowIds: 0, KeepJobFlowAliveWhenNoSteps: 0 },
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetKeepJobFlowAliveWhenNoSteps",
})) as any;

export type SetTerminationProtectionError =
  | InternalServerError
  | JobFlowNotFound
  | CommonErrors;
/**
 * SetTerminationProtection locks a cluster (job flow) so the Amazon EC2 instances
 * in the cluster cannot be terminated by user intervention, an API call, or in the event of a
 * job-flow error. The cluster still terminates upon successful completion of the job flow.
 * Calling `SetTerminationProtection` on a cluster is similar to calling the
 * Amazon EC2
 * `DisableAPITermination` API on all Amazon EC2 instances in a
 * cluster.
 *
 * `SetTerminationProtection` is used to prevent accidental termination of a
 * cluster and to ensure that in the event of an error, the instances persist so that you can
 * recover any data stored in their ephemeral instance storage.
 *
 * To terminate a cluster that has been locked by setting
 * `SetTerminationProtection` to `true`, you must first unlock the
 * job flow by a subsequent call to `SetTerminationProtection` in which you set the
 * value to `false`.
 *
 * For more information, see Managing Cluster
 * Termination in the *Amazon EMR Management Guide*.
 */
export const setTerminationProtection: API.OperationMethod<
  SetTerminationProtectionInput,
  SetTerminationProtectionResponse,
  SetTerminationProtectionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobFlowIds: 0, TerminationProtected: 0 },
  },
  errors: [InternalServerError, JobFlowNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTerminationProtection",
})) as any;

export type SetUnhealthyNodeReplacementError =
  | InternalServerError
  | CommonErrors;
/**
 * Specify whether to enable unhealthy node replacement, which lets Amazon EMR gracefully
 * replace core nodes on a cluster if any nodes become unhealthy. For example, a node becomes
 * unhealthy if disk usage is above 90%. If unhealthy node replacement is on and `TerminationProtected` are off,
 * Amazon EMR immediately terminates the unhealthy core nodes. To use unhealthy node replacement
 * and retain unhealthy core nodes, use to turn on
 * termination protection. In such cases, Amazon EMR adds
 * the unhealthy nodes to a denylist, reducing job interruptions and failures.
 *
 * If unhealthy node replacement is on, Amazon EMR
 * notifies YARN and other applications on the cluster to stop scheduling tasks
 * with these nodes, moves the data, and then terminates the nodes.
 *
 * For more information, see graceful
 * node replacement in the *Amazon EMR Management Guide*.
 */
export const setUnhealthyNodeReplacement: API.OperationMethod<
  SetUnhealthyNodeReplacementInput,
  SetUnhealthyNodeReplacementResponse,
  SetUnhealthyNodeReplacementError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { JobFlowIds: 0, UnhealthyNodeReplacement: 0 },
  },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUnhealthyNodeReplacement",
})) as any;

export type SetVisibleToAllUsersError = InternalServerError | CommonErrors;
/**
 * The SetVisibleToAllUsers parameter is no longer supported. Your cluster may be
 * visible to all users in your account. To restrict cluster access using an IAM policy, see Identity and Access
 * Management for Amazon EMR.
 *
 * Sets the Cluster$VisibleToAllUsers value for an Amazon EMR
 * cluster. When `true`, IAM principals in the Amazon Web Services account can perform Amazon EMR cluster actions that their IAM policies allow. When `false`, only the IAM
 * principal that created the cluster and the Amazon Web Services account root user can perform
 * Amazon EMR actions on the cluster, regardless of IAM permissions
 * policies attached to other IAM principals.
 *
 * This action works on running clusters. When you create a cluster, use the RunJobFlowInput$VisibleToAllUsers parameter.
 *
 * For more information, see Understanding the Amazon EMR Cluster VisibleToAllUsers Setting in the
 * *Amazon EMR Management Guide*.
 */
export const setVisibleToAllUsers: API.OperationMethod<
  SetVisibleToAllUsersInput,
  SetVisibleToAllUsersResponse,
  SetVisibleToAllUsersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobFlowIds: 0, VisibleToAllUsers: 0 } },
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetVisibleToAllUsers",
})) as any;

export type StartNotebookExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Starts a notebook execution.
 */
export const startNotebookExecution: API.OperationMethod<
  StartNotebookExecutionInput,
  StartNotebookExecutionOutput,
  StartNotebookExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EditorId: 0,
      RelativePath: 0,
      NotebookExecutionName: 0,
      NotebookParams: 0,
      ExecutionEngine: {
        Id: 0,
        Type: 0,
        MasterInstanceSecurityGroupId: 0,
        ExecutionRoleArn: 0,
      },
      ServiceRole: 0,
      NotebookInstanceSecurityGroupId: 0,
      Tags: D.list(i_Tag),
      NotebookS3Location: { Bucket: 0, Key: 0 },
      OutputNotebookS3Location: { Bucket: 0, Key: 0 },
      OutputNotebookFormat: 0,
      EnvironmentVariables: 0,
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookExecution",
})) as any;

export type StartSessionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates and starts a new Spark Connect session on the specified cluster. The cluster must be in the `RUNNING` or `WAITING` state and have sessions enabled. This operation is supported in Amazon EMR Spark 8.0.0 and later.
 */
export const startSession: API.OperationMethod<
  StartSessionInput,
  StartSessionOutput,
  StartSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      ClusterId: 0,
      ExecutionRoleArn: 0,
      EngineConfigurations: D.list(i_Configuration),
      MonitoringConfiguration: {
        CloudWatchLoggingConfiguration: {
          Enabled: 0,
          LogGroup: 0,
          LogStreamNamePrefix: 0,
          EncryptionKeyArn: 0,
          LogTypes: 0,
        },
        ManagedLoggingConfiguration: { Enabled: 0, EncryptionKeyArn: 0 },
        S3LoggingConfiguration: {
          Enabled: 0,
          LogUri: 0,
          EncryptionKeyArn: 0,
          LogTypes: 0,
        },
      },
      SessionIdleTimeoutInMinutes: 0,
      ClientRequestToken: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
})) as any;

export type StopNotebookExecutionError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Stops a notebook execution.
 */
export const stopNotebookExecution: API.OperationMethod<
  StopNotebookExecutionInput,
  StopNotebookExecutionResponse,
  StopNotebookExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { NotebookExecutionId: 0 } },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopNotebookExecution",
})) as any;

export type TerminateJobFlowsError =
  | InternalServerError
  | JobFlowNotFound
  | CommonErrors;
/**
 * TerminateJobFlows shuts a list of clusters (job flows) down. When a job flow is shut
 * down, any step not yet completed is canceled and the Amazon EC2 instances on which
 * the cluster is running are stopped. Any log files not already saved are uploaded to Amazon S3 if a LogUri was specified when the cluster was created.
 *
 * The maximum number of clusters allowed is 10. The call to `TerminateJobFlows`
 * is asynchronous. Depending on the configuration of the cluster, it may take up to 1-5
 * minutes for the cluster to completely terminate and release allocated resources, such as
 * Amazon EC2 instances.
 */
export const terminateJobFlows: API.OperationMethod<
  TerminateJobFlowsInput,
  TerminateJobFlowsResponse,
  TerminateJobFlowsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { JobFlowIds: 0 } },
  errors: [InternalServerError, JobFlowNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateJobFlows",
})) as any;

export type TerminateSessionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Terminates an active session. After you call this operation, the session enters the `TERMINATING` state and then transitions to `TERMINATED`.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionInput,
  TerminateSessionOutput,
  TerminateSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ClusterId: 0, SessionId: 0 } },
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
})) as any;

export type UpdateStudioError =
  | InternalServerException
  | InvalidRequestException
  | StudioNotFound
  | CommonErrors;
/**
 * Updates an Amazon EMR Studio configuration, including attributes such as name,
 * description, and subnets.
 */
export const updateStudio: API.OperationMethod<
  UpdateStudioInput,
  UpdateStudioResponse,
  UpdateStudioError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StudioId: 0,
      Name: 0,
      Description: 0,
      SubnetIds: 0,
      DefaultS3Location: 0,
      EncryptionKeyArn: 0,
    },
  },
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStudio",
})) as any;

export type UpdateStudioSessionMappingError =
  | InternalServerError
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the session policy attached to the user or group for the specified Amazon EMR Studio.
 */
export const updateStudioSessionMapping: API.OperationMethod<
  UpdateStudioSessionMappingInput,
  UpdateStudioSessionMappingResponse,
  UpdateStudioSessionMappingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StudioId: 0,
      IdentityId: 0,
      IdentityName: 0,
      IdentityType: 0,
      SessionPolicyArn: 0,
    },
  },
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStudioSessionMapping",
})) as any;

const i_AutoScalingPolicy: D.LazyStruct = () => ({
  Constraints: { MinCapacity: 0, MaxCapacity: 0 },
  Rules: D.list({
    Name: 0,
    Description: 0,
    Action: {
      Market: 0,
      SimpleScalingPolicyConfiguration: {
        AdjustmentType: 0,
        ScalingAdjustment: 0,
        CoolDown: 0,
      },
    },
    Trigger: {
      CloudWatchAlarmDefinition: {
        ComparisonOperator: 0,
        EvaluationPeriods: 0,
        MetricName: 0,
        Namespace: 0,
        Period: 0,
        Statistic: 0,
        Threshold: 0,
        Unit: 0,
        Dimensions: D.list({ Key: 0, Value: 0 }),
      },
    },
  }),
});
const i_AutoTerminationPolicy: D.LazyStruct = () => ({ IdleTimeout: 0 });
const i_Configuration: D.LazyStruct = () => ({
  Classification: 0,
  Configurations: D.list(i_Configuration),
  Properties: 0,
});
const i_InstanceFleetConfig: D.LazyStruct = () => ({
  Name: 0,
  InstanceFleetType: 0,
  TargetOnDemandCapacity: 0,
  TargetSpotCapacity: 0,
  InstanceTypeConfigs: D.list(i_InstanceTypeConfig),
  LaunchSpecifications: {
    SpotSpecification: {
      TimeoutDurationMinutes: 0,
      TimeoutAction: 0,
      BlockDurationMinutes: 0,
      AllocationStrategy: 0,
    },
    OnDemandSpecification: {
      AllocationStrategy: 0,
      CapacityReservationOptions: i_OnDemandCapacityReservationOptions,
    },
  },
  ResizeSpecifications: i_InstanceFleetResizingSpecifications,
  Context: 0,
});
const i_InstanceFleetResizingSpecifications: D.LazyStruct = () => ({
  SpotResizeSpecification: { TimeoutDurationMinutes: 0, AllocationStrategy: 0 },
  OnDemandResizeSpecification: {
    TimeoutDurationMinutes: 0,
    AllocationStrategy: 0,
    CapacityReservationOptions: i_OnDemandCapacityReservationOptions,
  },
});
const i_InstanceGroupConfig: D.LazyStruct = () => ({
  Name: 0,
  Market: 0,
  InstanceRole: 0,
  BidPrice: 0,
  InstanceType: 0,
  InstanceCount: 0,
  Configurations: D.list(i_Configuration),
  EbsConfiguration: i_EbsConfiguration,
  AutoScalingPolicy: i_AutoScalingPolicy,
  CustomAmiId: 0,
});
const i_InstanceTypeConfig: D.LazyStruct = () => ({
  InstanceType: 0,
  WeightedCapacity: 0,
  BidPrice: 0,
  BidPriceAsPercentageOfOnDemandPrice: 0,
  EbsConfiguration: i_EbsConfiguration,
  Configurations: D.list(i_Configuration),
  CustomAmiId: 0,
  Priority: 0,
});
const i_ManagedScalingPolicy: D.LazyStruct = () => ({
  ComputeLimits: {
    UnitType: 0,
    MinimumCapacityUnits: 0,
    MaximumCapacityUnits: 0,
    MaximumOnDemandCapacityUnits: 0,
    MaximumCoreCapacityUnits: 0,
  },
  UtilizationPerformanceIndex: 0,
  ScalingStrategy: 0,
});
const i_StepConfig: D.LazyStruct = () => ({
  Name: 0,
  ActionOnFailure: 0,
  HadoopJarStep: {
    Properties: D.list({ Key: 0, Value: 0 }),
    Jar: 0,
    MainClass: 0,
    Args: 0,
  },
  StepMonitoringConfiguration: {
    S3MonitoringConfiguration: { LogUri: 0, EncryptionKeyArn: 0 },
  },
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ClusterStatus: D.LazyStruct = () => ({
  Timeline: { CreationDateTime: D.ts, ReadyDateTime: D.ts, EndDateTime: D.ts },
});
const o_Credentials: D.LazyStruct = () => ({
  UsernamePassword: { Password: D.secret },
});
const o_Session: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  UpdatedAt: D.ts,
  StartedAt: D.ts,
  EndedAt: D.ts,
  IdleSince: D.ts,
});
const o_StepStatus: D.LazyStruct = () => ({
  Timeline: { CreationDateTime: D.ts, StartDateTime: D.ts, EndDateTime: D.ts },
});
const i_EbsConfiguration: D.LazyStruct = () => ({
  EbsBlockDeviceConfigs: D.list({
    VolumeSpecification: { VolumeType: 0, Iops: 0, SizeInGB: 0, Throughput: 0 },
    VolumesPerInstance: 0,
  }),
  EbsOptimized: 0,
});
const i_OnDemandCapacityReservationOptions: D.LazyStruct = () => ({
  UsageStrategy: 0,
  CapacityReservationPreference: 0,
  CapacityReservationResourceGroupArn: 0,
});
