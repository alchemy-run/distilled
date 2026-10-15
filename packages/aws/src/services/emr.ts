import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://elasticmapreduce.amazonaws.com/doc/2009-03-31");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "EMR", serviceShapeName: "ElasticMapReduce" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "elasticmapreduce" });
const ver = /*@__PURE__*/ T.ServiceVersion("2009-03-31");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticmapreduce.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://elasticmapreduce.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://elasticmapreduce.{R}.{D}","properties":{},"headers":{}}');

export class ClusterNotFound
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFound>()(
    "ClusterNotFound",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^Cluster id .* is not valid" },
    }),
  ).pipe(C.withNotFoundError) {}
export class EmrInstanceProfileNotReady
  extends /*@__PURE__*/ S.TaggedError<EmrInstanceProfileNotReady>()(
    "EmrInstanceProfileNotReady",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Invalid InstanceProfile" },
    }),
  ).pipe(C.withRetryableError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalFailure", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()("InternalServerException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    ErrorCode: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class JobFlowNotFound
  extends /*@__PURE__*/ S.TaggedError<JobFlowNotFound>()(
    "JobFlowNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Specified job flow ID not valid" },
    }),
  ).pipe(C.withNotFoundError) {}
export class SecurityConfigurationAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<SecurityConfigurationAlreadyExists>()(
    "SecurityConfigurationAlreadyExists",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^SecurityConfiguration with name .* already exists" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class SecurityConfigurationNotFound
  extends /*@__PURE__*/ S.TaggedError<SecurityConfigurationNotFound>()(
    "SecurityConfigurationNotFound",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "^Security configuration with name .* does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class StudioNotFound
  extends /*@__PURE__*/ S.TaggedError<StudioNotFound>()(
    "StudioNotFound",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "Studio does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class StudioServiceRoleMissingS3Access
  extends /*@__PURE__*/ S.TaggedError<StudioServiceRoleMissingS3Access>()(
    "StudioServiceRoleMissingS3Access",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "does not have permission to access the 'S3 Location'" },
    }),
  ).pipe(C.withRetryableError) {}
export class StudioServiceRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<StudioServiceRoleNotAssumable>()(
    "StudioServiceRoleNotAssumable",
    {
      ErrorCode: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "does not have permissions to assume role" },
    }),
  ).pipe(C.withRetryableError) {}
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
export type OnDemandProvisioningAllocationStrategy = "lowest-price" | "prioritized" | (string & {});
export type OnDemandCapacityReservationUsageStrategy =
  | "use-capacity-reservations-first"
  | (string & {});
export type OnDemandCapacityReservationPreference = "open" | "none" | (string & {});
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
export type Statistic = "SAMPLE_COUNT" | "AVERAGE" | "SUM" | "MINIMUM" | "MAXIMUM" | (string & {});
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
export type StepCancellationOption = "SEND_INTERRUPT" | "TERMINATE_PROCESS" | (string & {});
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
export type InstanceCollectionType = "INSTANCE_FLEET" | "INSTANCE_GROUP" | (string & {});
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
export type PlacementGroupStrategy = "SPREAD" | "PARTITION" | "CLUSTER" | "NONE" | (string & {});
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
export type LogType = "system-logs" | "application-logs" | "persistent-ui-logs" | (string & {});
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
    PlacementGroups: (PlacementGroupConfig & { InstanceRole: InstanceRoleType })[];
    MonitoringConfiguration: MonitoringConfiguration & {
      CloudWatchLogConfiguration: CloudWatchLogConfiguration & { Enabled: boolean };
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
        ScriptBootstrapAction: ScriptBootstrapActionConfig & { Path: XmlString };
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
export type ComputeLimitsUnitType = "InstanceFleetUnits" | "Instances" | "VCPU" | (string & {});
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
  Session: Session & { Id: SessionId; ClusterId: ClusterId; Arn: ArnType; State: SessionState };
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
        VolumeSpecification: VolumeSpecification & { VolumeType: string; SizeInGB: number };
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
      VolumeSpecification: VolumeSpecification & { VolumeType: string; SizeInGB: number };
    })[];
    AutoScalingPolicy: AutoScalingPolicyDescription & {
      Constraints: ScalingConstraints & { MinCapacity: number; MaxCapacity: number };
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
    Constraints: ScalingConstraints & { MinCapacity: number; MaxCapacity: number };
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
  input: __S(0, __c0, 0) as any as S.Schema<AddInstanceFleetInput>,
  output: __S(1, __c0, 1) as any as S.Schema<AddInstanceFleetOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddInstanceFleet",
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<AddInstanceGroupsInput>,
  output: __S(145, __c9, 1) as any as S.Schema<AddInstanceGroupsOutput>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddInstanceGroups",
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<AddJobFlowStepsInput>,
  output: __S(241, __c15, 1) as any as S.Schema<AddJobFlowStepsOutput>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddJobFlowSteps",
}));

export type AddTagsError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(288, __c18, 0) as any as S.Schema<AddTagsInput>,
  output: __S(304, __c19, 0) as any as S.Schema<AddTagsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type CancelStepsError = InternalServerError | InvalidRequestException | CommonErrors;
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
  input: __S(320, __c20, 0) as any as S.Schema<CancelStepsInput>,
  output: __S(323, __c20, 3) as any as S.Schema<CancelStepsOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSteps",
}));

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
  input: __S(337, __c21, 1) as any as S.Schema<CreatePersistentAppUIInput>,
  output: __S(338, __c21, 2) as any as S.Schema<CreatePersistentAppUIOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePersistentAppUI",
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<CreateSecurityConfigurationInput>,
  output: __S(353, __c22, 1) as any as S.Schema<CreateSecurityConfigurationOutput>,
  errors: [InternalServerException, InvalidRequestException, SecurityConfigurationAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfiguration",
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<CreateStudioInput>,
  output: __S(369, __c23, 1) as any as S.Schema<CreateStudioOutput>,
  errors: [
    InternalServerException,
    InvalidRequestException,
    StudioServiceRoleNotAssumable,
    StudioServiceRoleMissingS3Access,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStudio",
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<CreateStudioSessionMappingInput>,
  output: __S(304, __c19, 0) as any as S.Schema<CreateStudioSessionMappingResponse>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStudioSessionMapping",
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<DeleteSecurityConfigurationInput>,
  output: __S(304, __c19, 0) as any as S.Schema<DeleteSecurityConfigurationOutput>,
  errors: [InternalServerException, InvalidRequestException, SecurityConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<DeleteStudioInput>,
  output: __S(304, __c19, 0) as any as S.Schema<DeleteStudioResponse>,
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStudio",
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<DeleteStudioSessionMappingInput>,
  output: __S(304, __c19, 0) as any as S.Schema<DeleteStudioSessionMappingResponse>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStudioSessionMapping",
}));

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
  input: __S(448, __c28, 0) as any as S.Schema<DescribeClusterInput>,
  output: __S(451, __c28, 3) as any as S.Schema<DescribeClusterOutput>,
  errors: [InternalServerException, InvalidRequestException, ClusterNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<DescribeJobFlowsInput>,
  output: __S(556, __c34, 12) as any as S.Schema<DescribeJobFlowsOutput>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobFlows",
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<DescribeNotebookExecutionInput>,
  output: __S(594, __c37, 2) as any as S.Schema<DescribeNotebookExecutionOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotebookExecution",
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<DescribePersistentAppUIInput>,
  output: __S(642, __c40, 2) as any as S.Schema<DescribePersistentAppUIOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePersistentAppUI",
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<DescribeReleaseLabelInput>,
  output: __S(661, __c41, 5) as any as S.Schema<DescribeReleaseLabelOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReleaseLabel",
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<DescribeSecurityConfigurationInput>,
  output: __S(673, __c42, 1) as any as S.Schema<DescribeSecurityConfigurationOutput>,
  errors: [InternalServerException, InvalidRequestException, SecurityConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityConfiguration",
}));

export type DescribeStepError = InternalServerException | InvalidRequestException | CommonErrors;
/**
 * Provides more detail about the cluster step.
 */
export const describeStep: API.OperationMethod<
  DescribeStepInput,
  DescribeStepOutput,
  DescribeStepError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<DescribeStepInput>,
  output: __S(690, __c43, 2) as any as S.Schema<DescribeStepOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStep",
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<DescribeStudioInput>,
  output: __S(722, __c45, 2) as any as S.Schema<DescribeStudioOutput>,
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStudio",
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<GetAutoTerminationPolicyInput>,
  output: __S(737, __c46, 1) as any as S.Schema<GetAutoTerminationPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoTerminationPolicy",
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<GetBlockPublicAccessConfigurationInput>,
  output: __S(770, __c48, 2) as any as S.Schema<GetBlockPublicAccessConfigurationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlockPublicAccessConfiguration",
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<GetClusterSessionCredentialsInput>,
  output: __S(801, __c50, 1) as any as S.Schema<GetClusterSessionCredentialsOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterSessionCredentials",
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<GetManagedScalingPolicyInput>,
  output: __S(833, __c52, 1) as any as S.Schema<GetManagedScalingPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedScalingPolicy",
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<GetOnClusterAppUIPresignedURLInput>,
  output: __S(880, __c55, 0) as any as S.Schema<GetOnClusterAppUIPresignedURLOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOnClusterAppUIPresignedURL",
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<GetPersistentAppUIPresignedURLInput>,
  output: __S(880, __c55, 0) as any as S.Schema<GetPersistentAppUIPresignedURLOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersistentAppUIPresignedURL",
}));

export type GetSessionError = InternalServerException | InvalidRequestException | CommonErrors;
/**
 * Returns detailed information about a session.
 */
export const getSession: API.OperationMethod<
  GetSessionInput,
  GetSessionOutput,
  GetSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<GetSessionInput>,
  output: __S(913, __c57, 1) as any as S.Schema<GetSessionOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

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
  input: __S(960, __c60, 0) as any as S.Schema<GetSessionEndpointInput>,
  output: __S(961, __c60, 1) as any as S.Schema<GetSessionEndpointOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
}));

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
  input: __S(976, __c61, 0) as any as S.Schema<GetStudioSessionMappingInput>,
  output: __S(978, __c61, 2) as any as S.Schema<GetStudioSessionMappingOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStudioSessionMapping",
}));

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
  input: __S(992, __c62, 0) as any as S.Schema<ListBootstrapActionsInput>,
  output: __S(995, __c62, 3) as any as S.Schema<ListBootstrapActionsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBootstrapActions",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "BootstrapActions" } as const,
})) as any;

export type ListClustersError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(1008, __c63, 0) as any as S.Schema<ListClustersInput>,
  output: __S(1011, __c63, 3) as any as S.Schema<ListClustersOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "Clusters" } as const,
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
  input: __S(1024, __c64, 0) as any as S.Schema<ListInstanceFleetsInput>,
  output: __S(1029, __c64, 5) as any as S.Schema<ListInstanceFleetsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceFleets",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "InstanceFleets" } as const,
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
  input: __S(1072, __c67, 0) as any as S.Schema<ListInstanceGroupsInput>,
  output: __S(1075, __c67, 3) as any as S.Schema<ListInstanceGroupsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstanceGroups",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "InstanceGroups" } as const,
})) as any;

export type ListInstancesError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(1120, __c70, 0) as any as S.Schema<ListInstancesInput>,
  output: __S(1125, __c70, 5) as any as S.Schema<ListInstancesOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstances",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "Instances" } as const,
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
  input: __S(1136, __c71, 0) as any as S.Schema<ListNotebookExecutionsInput>,
  output: __S(1139, __c71, 3) as any as S.Schema<ListNotebookExecutionsOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookExecutions",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "NotebookExecutions" } as const,
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
  input: __S(1153, __c72, 1) as any as S.Schema<ListReleaseLabelsInput>,
  output: __S(1154, __c72, 2) as any as S.Schema<ListReleaseLabelsOutput>,
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
  input: __S(1168, __c73, 0) as any as S.Schema<ListSecurityConfigurationsInput>,
  output: __S(1171, __c73, 3) as any as S.Schema<ListSecurityConfigurationsOutput>,
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

export type ListSessionsError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(1184, __c74, 0) as any as S.Schema<ListSessionsInput>,
  output: __S(1186, __c74, 2) as any as S.Schema<ListSessionsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Sessions" } as const,
})) as any;

export type ListStepsError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(1200, __c75, 0) as any as S.Schema<ListStepsInput>,
  output: __S(1203, __c75, 3) as any as S.Schema<ListStepsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSteps",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "Steps" } as const,
})) as any;

export type ListStudiosError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(1216, __c76, 0) as any as S.Schema<ListStudiosInput>,
  output: __S(1219, __c76, 3) as any as S.Schema<ListStudiosOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStudios",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "Studios" } as const,
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
  input: __S(1232, __c77, 0) as any as S.Schema<ListStudioSessionMappingsInput>,
  output: __S(1235, __c77, 3) as any as S.Schema<ListStudioSessionMappingsOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStudioSessionMappings",
  pagination: { inputToken: "Marker", outputToken: "Marker", items: "SessionMappings" } as const,
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
  input: __S(1248, __c78, 0) as any as S.Schema<ListSupportedInstanceTypesInput>,
  output: __S(1251, __c78, 3) as any as S.Schema<ListSupportedInstanceTypesOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportedInstanceTypes",
  pagination: { inputToken: "Marker", outputToken: "Marker" } as const,
})) as any;

export type ModifyClusterError = InternalServerError | InvalidRequestException | CommonErrors;
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
  input: __S(1264, __c79, 0) as any as S.Schema<ModifyClusterInput>,
  output: __S(1265, __c79, 1) as any as S.Schema<ModifyClusterOutput>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
}));

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
  input: __S(1281, __c80, 1) as any as S.Schema<ModifyInstanceFleetInput>,
  output: __S(304, __c19, 0) as any as S.Schema<ModifyInstanceFleetResponse>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceFleet",
}));

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
  input: __S(1298, __c81, 2) as any as S.Schema<ModifyInstanceGroupsInput>,
  output: __S(304, __c19, 0) as any as S.Schema<ModifyInstanceGroupsResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyInstanceGroups",
}));

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
  input: __S(1312, __c82, 0) as any as S.Schema<PutAutoScalingPolicyInput>,
  output: __S(1313, __c82, 1) as any as S.Schema<PutAutoScalingPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAutoScalingPolicy",
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<PutAutoTerminationPolicyInput>,
  output: __S(304, __c19, 0) as any as S.Schema<PutAutoTerminationPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAutoTerminationPolicy",
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<PutBlockPublicAccessConfigurationInput>,
  output: __S(304, __c19, 0) as any as S.Schema<PutBlockPublicAccessConfigurationOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBlockPublicAccessConfiguration",
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<PutManagedScalingPolicyInput>,
  output: __S(304, __c19, 0) as any as S.Schema<PutManagedScalingPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutManagedScalingPolicy",
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<RemoveAutoScalingPolicyInput>,
  output: __S(304, __c19, 0) as any as S.Schema<RemoveAutoScalingPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAutoScalingPolicy",
}));

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
  input: __S(1392, __c87, 0) as any as S.Schema<RemoveAutoTerminationPolicyInput>,
  output: __S(304, __c19, 0) as any as S.Schema<RemoveAutoTerminationPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAutoTerminationPolicy",
}));

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
  input: __S(1408, __c88, 0) as any as S.Schema<RemoveManagedScalingPolicyInput>,
  output: __S(304, __c19, 0) as any as S.Schema<RemoveManagedScalingPolicyOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveManagedScalingPolicy",
}));

export type RemoveTagsError = InternalServerException | InvalidRequestException | CommonErrors;
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
  input: __S(1424, __c89, 0) as any as S.Schema<RemoveTagsInput>,
  output: __S(304, __c19, 0) as any as S.Schema<RemoveTagsOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
}));

export type RunJobFlowError = InternalServerError | EmrInstanceProfileNotReady | CommonErrors;
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
  input: __S(1445, __c90, 5) as any as S.Schema<RunJobFlowInput>,
  output: __S(1446, __c90, 6) as any as S.Schema<RunJobFlowOutput>,
  errors: [InternalServerError, EmrInstanceProfileNotReady],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunJobFlow",
}));

export type SetKeepJobFlowAliveWhenNoStepsError = InternalServerError | CommonErrors;
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
  input: __S(1456, __c91, 0) as any as S.Schema<SetKeepJobFlowAliveWhenNoStepsInput>,
  output: __S(304, __c19, 0) as any as S.Schema<SetKeepJobFlowAliveWhenNoStepsResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetKeepJobFlowAliveWhenNoSteps",
}));

export type SetTerminationProtectionError = InternalServerError | JobFlowNotFound | CommonErrors;
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
  input: __S(1472, __c92, 0) as any as S.Schema<SetTerminationProtectionInput>,
  output: __S(304, __c19, 0) as any as S.Schema<SetTerminationProtectionResponse>,
  errors: [InternalServerError, JobFlowNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTerminationProtection",
}));

export type SetUnhealthyNodeReplacementError = InternalServerError | CommonErrors;
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
  input: __S(1488, __c93, 0) as any as S.Schema<SetUnhealthyNodeReplacementInput>,
  output: __S(304, __c19, 0) as any as S.Schema<SetUnhealthyNodeReplacementResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUnhealthyNodeReplacement",
}));

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
  input: __S(1504, __c94, 0) as any as S.Schema<SetVisibleToAllUsersInput>,
  output: __S(304, __c19, 0) as any as S.Schema<SetVisibleToAllUsersResponse>,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetVisibleToAllUsers",
}));

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
  input: __S(1520, __c95, 0) as any as S.Schema<StartNotebookExecutionInput>,
  output: __S(1521, __c95, 1) as any as S.Schema<StartNotebookExecutionOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartNotebookExecution",
}));

export type StartSessionError = InternalServerException | InvalidRequestException | CommonErrors;
/**
 * Creates and starts a new Spark Connect session on the specified cluster. The cluster must be in the `RUNNING` or `WAITING` state and have sessions enabled. This operation is supported in Amazon EMR Spark 8.0.0 and later.
 */
export const startSession: API.OperationMethod<
  StartSessionInput,
  StartSessionOutput,
  StartSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<StartSessionInput>,
  output: __S(1537, __c96, 1) as any as S.Schema<StartSessionOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
}));

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
  input: __S(1552, __c97, 0) as any as S.Schema<StopNotebookExecutionInput>,
  output: __S(304, __c19, 0) as any as S.Schema<StopNotebookExecutionResponse>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopNotebookExecution",
}));

export type TerminateJobFlowsError = InternalServerError | JobFlowNotFound | CommonErrors;
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
  input: __S(1568, __c98, 0) as any as S.Schema<TerminateJobFlowsInput>,
  output: __S(304, __c19, 0) as any as S.Schema<TerminateJobFlowsResponse>,
  errors: [InternalServerError, JobFlowNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateJobFlows",
}));

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
  input: __S(1584, __c99, 0) as any as S.Schema<TerminateSessionInput>,
  output: __S(1585, __c99, 1) as any as S.Schema<TerminateSessionOutput>,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
}));

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
  input: __S(1600, __c100, 0) as any as S.Schema<UpdateStudioInput>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateStudioResponse>,
  errors: [InternalServerException, InvalidRequestException, StudioNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStudio",
}));

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
  input: __S(1616, __c101, 0) as any as S.Schema<UpdateStudioSessionMappingInput>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateStudioSessionMappingResponse>,
  errors: [InternalServerError, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStudioSessionMapping",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          InstanceFleet: S.optional(__S(128, __c8, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddInstanceFleetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          InstanceFleetId: S.optional(S.String),
          ClusterArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AddInstanceFleetOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Classification: S.optional(S.String),
          Configurations: S.optional(
            S.suspend(() => __S(33, __c2, 1)).annotate({ identifier: "ConfigurationList" }),
          ),
          Properties: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "Configuration" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Configuration> => __S(32, __c2, 0)).annotate({
          identifier: "Configuration",
        }),
      );
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeType: S.optional(S.String),
          Iops: S.optional(S.Number),
          SizeInGB: S.optional(S.Number),
          Throughput: S.optional(S.Number),
        }),
      ).annotate({ identifier: "VolumeSpecification" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeSpecification: S.optional(__S(48, __c3, 0)),
          VolumesPerInstance: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EbsBlockDeviceConfig" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EbsBlockDeviceConfigs: S.optional(__S(65, __c4, 1)),
          EbsOptimized: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EbsConfiguration" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UsageStrategy: S.optional(S.String),
          CapacityReservationPreference: S.optional(S.String),
          CapacityReservationResourceGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "OnDemandCapacityReservationOptions" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TimeoutDurationMinutes: S.optional(S.Number),
          AllocationStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpotResizingSpecification" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TimeoutDurationMinutes: S.optional(S.Number),
          AllocationStrategy: S.optional(S.String),
          CapacityReservationOptions: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "OnDemandResizingSpecification" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SpotResizeSpecification: S.optional(__S(81, __c5, 1)),
          OnDemandResizeSpecification: S.optional(__S(82, __c5, 2)),
        }),
      ).annotate({ identifier: "InstanceFleetResizingSpecifications" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimeoutDurationMinutes: S.optional(S.Number),
          TimeoutAction: S.optional(S.String),
          BlockDurationMinutes: S.optional(S.Number),
          AllocationStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpotProvisioningSpecification" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AllocationStrategy: S.optional(S.String),
          CapacityReservationOptions: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "OnDemandProvisioningSpecification" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SpotSpecification: S.optional(__S(96, __c6, 0)),
          OnDemandSpecification: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "InstanceFleetProvisioningSpecifications" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceType: S.optional(S.String),
          WeightedCapacity: S.optional(S.Number),
          BidPrice: S.optional(S.String),
          BidPriceAsPercentageOfOnDemandPrice: S.optional(S.Number),
          EbsConfiguration: S.optional(__S(66, __c4, 2)),
          Configurations: S.optional(__S(33, __c2, 1)),
          CustomAmiId: S.optional(S.String),
          Priority: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceTypeConfig" });
    case 1:
      return S.Array(__S(112, __c7, 0));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          InstanceFleetType: S.optional(S.String),
          TargetOnDemandCapacity: S.optional(S.Number),
          TargetSpotCapacity: S.optional(S.Number),
          InstanceTypeConfigs: S.optional(__S(113, __c7, 1)),
          LaunchSpecifications: S.optional(__S(98, __c6, 2)),
          ResizeSpecifications: S.optional(__S(83, __c5, 3)),
          Context: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceFleetConfig" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceGroups: S.optional(__S(225, __c14, 1)),
          JobFlowId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddInstanceGroupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobFlowId: S.optional(S.String),
          InstanceGroupIds: S.optional(__S(176, __c11, 0)),
          ClusterArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "AddInstanceGroupsOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "MetricDimension" });
    case 1:
      return S.Array(__S(160, __c10, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ScalingConstraints" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AdjustmentType: S.optional(S.String),
          ScalingAdjustment: S.optional(S.Number),
          CoolDown: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SimpleScalingPolicyConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Market: S.optional(S.String),
          SimpleScalingPolicyConfiguration: S.optional(__S(193, __c12, 1)),
        }),
      ).annotate({ identifier: "ScalingAction" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ComparisonOperator: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
          Period: S.optional(S.Number),
          Statistic: S.optional(S.String),
          Threshold: S.optional(S.Number),
          Unit: S.optional(S.String),
          Dimensions: S.optional(__S(161, __c10, 1)),
        }),
      ).annotate({ identifier: "CloudWatchAlarmDefinition" });
    case 4:
      return S.suspend(() =>
        S.Struct({ CloudWatchAlarmDefinition: S.optional(__S(195, __c12, 3)) }),
      ).annotate({ identifier: "ScalingTrigger" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Action: S.optional(__S(194, __c12, 2)),
          Trigger: S.optional(__S(196, __c12, 4)),
        }),
      ).annotate({ identifier: "ScalingRule" });
    case 6:
      return S.Array(__S(197, __c12, 5));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Constraints: S.optional(__S(192, __c12, 0)),
          Rules: S.optional(__S(198, __c12, 6)),
        }),
      ).annotate({ identifier: "AutoScalingPolicy" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Market: S.optional(S.String),
          InstanceRole: S.optional(S.String),
          BidPrice: S.optional(S.String),
          InstanceType: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          Configurations: S.optional(__S(33, __c2, 1)),
          EbsConfiguration: S.optional(__S(66, __c4, 2)),
          AutoScalingPolicy: S.optional(__S(208, __c13, 0)),
          CustomAmiId: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceGroupConfig" });
    case 1:
      return S.Array(__S(224, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobFlowId: S.optional(S.String),
          Steps: S.optional(__S(272, __c17, 0)),
          ExecutionRoleArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddJobFlowStepsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StepIds: S.optional(__S(176, __c11, 0)) }).pipe(ns),
      ).annotate({ identifier: "AddJobFlowStepsOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Properties: S.optional(__S(161, __c10, 1)),
          Jar: S.optional(S.String),
          MainClass: S.optional(S.String),
          Args: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "HadoopJarStepConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LogUri: S.optional(S.String), EncryptionKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "S3MonitoringConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ S3MonitoringConfiguration: S.optional(__S(257, __c16, 1)) }),
      ).annotate({ identifier: "StepMonitoringConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ActionOnFailure: S.optional(S.String),
          HadoopJarStep: S.optional(__S(256, __c16, 0)),
          StepMonitoringConfiguration: S.optional(__S(258, __c16, 2)),
        }),
      ).annotate({ identifier: "StepConfig" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(259, __c16, 3));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
          ClusterId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AddTagsInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "AddTagsOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          StepIds: S.optional(__S(176, __c11, 0)),
          StepCancellationOption: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelStepsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StepId: S.optional(S.String),
          Status: S.optional(S.String),
          Reason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CancelStepsInfo" });
    case 2:
      return S.Array(__S(321, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ CancelStepsInfoList: S.optional(__S(322, __c20, 2)) }).pipe(ns),
      ).annotate({ identifier: "CancelStepsOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ JobRunId: S.optional(S.String) })).annotate({
        identifier: "EMRContainersConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetResourceArn: S.optional(S.String),
          EMRContainersConfig: S.optional(__S(336, __c21, 0)),
          Tags: S.optional(__S(161, __c10, 1)),
          XReferer: S.optional(S.String),
          ProfilerType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePersistentAppUIInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PersistentAppUIId: S.optional(S.String),
          RuntimeRoleEnabledCluster: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "CreatePersistentAppUIOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), SecurityConfiguration: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSecurityConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "CreateSecurityConfigurationOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          AuthMode: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(176, __c11, 0)),
          ServiceRole: S.optional(S.String),
          UserRole: S.optional(S.String),
          WorkspaceSecurityGroupId: S.optional(S.String),
          EngineSecurityGroupId: S.optional(S.String),
          DefaultS3Location: S.optional(S.String),
          IdpAuthUrl: S.optional(S.String),
          IdpRelayStateParameterName: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
          TrustedIdentityPropagationEnabled: S.optional(S.Boolean),
          IdcUserAssignment: S.optional(S.String),
          IdcInstanceArn: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStudioInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ StudioId: S.optional(S.String), Url: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateStudioOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          IdentityId: S.optional(S.String),
          IdentityName: S.optional(S.String),
          IdentityType: S.optional(S.String),
          SessionPolicyArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateStudioSessionMappingInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSecurityConfigurationInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StudioId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteStudioInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          IdentityId: S.optional(S.String),
          IdentityName: S.optional(S.String),
          IdentityType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteStudioSessionMappingInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Ec2KeyName: S.optional(S.String),
          Ec2SubnetId: S.optional(S.String),
          RequestedEc2SubnetIds: S.optional(__S(176, __c11, 0)),
          Ec2AvailabilityZone: S.optional(S.String),
          RequestedEc2AvailabilityZones: S.optional(__S(176, __c11, 0)),
          IamInstanceProfile: S.optional(S.String),
          EmrManagedMasterSecurityGroup: S.optional(S.String),
          EmrManagedSlaveSecurityGroup: S.optional(S.String),
          ServiceAccessSecurityGroup: S.optional(S.String),
          AdditionalMasterSecurityGroups: S.optional(__S(176, __c11, 0)),
          AdditionalSlaveSecurityGroups: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "Ec2InstanceAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(__S(499, __c31, 3)),
          Ec2InstanceAttributes: S.optional(__S(449, __c28, 1)),
          InstanceCollectionType: S.optional(S.String),
          LogUri: S.optional(S.String),
          LogEncryptionKmsKeyId: S.optional(S.String),
          RequestedAmiVersion: S.optional(S.String),
          RunningAmiVersion: S.optional(S.String),
          ReleaseLabel: S.optional(S.String),
          AutoTerminate: S.optional(S.Boolean),
          TerminationProtected: S.optional(S.Boolean),
          UnhealthyNodeReplacement: S.optional(S.Boolean),
          VisibleToAllUsers: S.optional(S.Boolean),
          Applications: S.optional(__S(529, __c33, 1)),
          Tags: S.optional(__S(161, __c10, 1)),
          ServiceRole: S.optional(S.String),
          NormalizedInstanceHours: S.optional(S.Number),
          MasterPublicDnsName: S.optional(S.String),
          Configurations: S.optional(__S(33, __c2, 1)),
          SecurityConfiguration: S.optional(S.String),
          AutoScalingRole: S.optional(S.String),
          ScaleDownBehavior: S.optional(S.String),
          CustomAmiId: S.optional(S.String),
          EbsRootVolumeSize: S.optional(S.Number),
          RepoUpgradeOnBoot: S.optional(S.String),
          KerberosAttributes: S.optional(__S(530, __c33, 2)),
          ClusterArn: S.optional(S.String),
          OutpostArn: S.optional(S.String),
          StepConcurrencyLevel: S.optional(S.Number),
          PlacementGroups: S.optional(__S(532, __c33, 4)),
          OSReleaseLabel: S.optional(S.String),
          EbsRootVolumeIops: S.optional(S.Number),
          EbsRootVolumeThroughput: S.optional(S.Number),
          ExtendedSupport: S.optional(S.Boolean),
          MonitoringConfiguration: S.optional(__S(536, __c33, 8)),
          SessionEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Cluster" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Cluster: S.optional(__S(450, __c28, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeClusterOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "ClusterStateChangeReason" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(176, __c11, 0).pipe(S.optional));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(16, __c1, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ErrorCode: S.optional(S.String),
          ErrorData: S.optional(__S(496, __c31, 0)),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ErrorDetail" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateChangeReason: S.optional(__S(464, __c29, 0)),
          Timeline: S.optional(__S(512, __c32, 0)),
          ErrorDetails: S.optional(__S(498, __c31, 2)),
        }),
      ).annotate({ identifier: "ClusterStatus" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ClusterTimeline" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Version: S.optional(S.String),
          Args: S.optional(__S(176, __c11, 0)),
          AdditionalInfo: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "Application" });
    case 1:
      return S.Array(__S(528, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Realm: S.optional(S.String),
          KdcAdminPassword: S.optional(SensitiveString),
          CrossRealmTrustPrincipalPassword: S.optional(SensitiveString),
          ADDomainJoinUser: S.optional(S.String),
          ADDomainJoinPassword: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "KerberosAttributes" });
    case 3:
      return S.suspend(() =>
        S.Struct({ InstanceRole: S.optional(S.String), PlacementStrategy: S.optional(S.String) }),
      ).annotate({ identifier: "PlacementGroupConfig" });
    case 4:
      return S.Array(__S(531, __c33, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          LogGroupName: S.optional(S.String),
          LogStreamNamePrefix: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          LogTypes: S.optional(__S(480, __c30, 0)),
        }),
      ).annotate({ identifier: "CloudWatchLogConfiguration" });
    case 6:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 7:
      return S.suspend(() =>
        S.Struct({ LogTypeUploadPolicy: S.optional(__S(534, __c33, 6)) }),
      ).annotate({ identifier: "S3LoggingConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLogConfiguration: S.optional(__S(533, __c33, 5)),
          S3LoggingConfiguration: S.optional(__S(535, __c33, 7)),
        }),
      ).annotate({ identifier: "MonitoringConfiguration" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobFlowIds: S.optional(__S(176, __c11, 0)),
          JobFlowStates: S.optional(__S(560, __c35, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeJobFlowsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastStateChangeReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobFlowExecutionStatusDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          InstanceGroupId: S.optional(S.String),
          Name: S.optional(S.String),
          Market: S.optional(S.String),
          InstanceRole: S.optional(S.String),
          BidPrice: S.optional(S.String),
          InstanceType: S.optional(S.String),
          InstanceRequestCount: S.optional(S.Number),
          InstanceRunningCount: S.optional(S.Number),
          State: S.optional(S.String),
          LastStateChangeReason: S.optional(S.String),
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReadyDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CustomAmiId: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceGroupDetail" });
    case 3:
      return S.Array(__S(546, __c34, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          MasterInstanceType: S.optional(S.String),
          MasterPublicDnsName: S.optional(S.String),
          MasterInstanceId: S.optional(S.String),
          SlaveInstanceType: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          InstanceGroups: S.optional(__S(547, __c34, 3)),
          NormalizedInstanceHours: S.optional(S.Number),
          Ec2KeyName: S.optional(S.String),
          Ec2SubnetId: S.optional(S.String),
          Placement: S.optional(__S(576, __c36, 0)),
          KeepJobFlowAliveWhenNoSteps: S.optional(S.Boolean),
          TerminationProtected: S.optional(S.Boolean),
          UnhealthyNodeReplacement: S.optional(S.Boolean),
          HadoopVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobFlowInstancesDetail" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastStateChangeReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "StepExecutionStatusDetail" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          StepConfig: S.optional(__S(259, __c16, 3)),
          ExecutionStatusDetail: S.optional(__S(549, __c34, 5)),
        }),
      ).annotate({ identifier: "StepDetail" });
    case 7:
      return S.Array(__S(550, __c34, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ BootstrapActionConfig: S.optional(__S(578, __c36, 2)) }),
      ).annotate({ identifier: "BootstrapActionDetail" });
    case 9:
      return S.Array(__S(552, __c34, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          JobFlowId: S.optional(S.String),
          Name: S.optional(S.String),
          LogUri: S.optional(S.String),
          LogEncryptionKmsKeyId: S.optional(S.String),
          AmiVersion: S.optional(S.String),
          ExecutionStatusDetail: S.optional(__S(545, __c34, 1)),
          Instances: S.optional(__S(548, __c34, 4)),
          Steps: S.optional(__S(551, __c34, 7)),
          BootstrapActions: S.optional(__S(553, __c34, 9)),
          SupportedProducts: S.optional(__S(176, __c11, 0)),
          VisibleToAllUsers: S.optional(S.Boolean),
          JobFlowRole: S.optional(S.String),
          ServiceRole: S.optional(S.String),
          AutoScalingRole: S.optional(S.String),
          ScaleDownBehavior: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobFlowDetail" });
    case 11:
      return S.Array(__S(554, __c34, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ JobFlows: S.optional(__S(555, __c34, 11)) }).pipe(ns),
      ).annotate({ identifier: "DescribeJobFlowsOutput" });
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
      return S.suspend(() =>
        S.Struct({
          AvailabilityZone: S.optional(S.String),
          AvailabilityZones: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "PlacementType" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Path: S.optional(S.String), Args: S.optional(__S(176, __c11, 0)) }),
      ).annotate({ identifier: "ScriptBootstrapActionConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ScriptBootstrapAction: S.optional(__S(577, __c36, 1)),
        }),
      ).annotate({ identifier: "BootstrapActionConfig" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NotebookExecutionId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeNotebookExecutionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NotebookExecutionId: S.optional(S.String),
          EditorId: S.optional(S.String),
          ExecutionEngine: S.optional(__S(624, __c39, 0)),
          NotebookExecutionName: S.optional(S.String),
          NotebookParams: S.optional(S.String),
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Arn: S.optional(S.String),
          OutputNotebookURI: S.optional(S.String),
          LastStateChangeReason: S.optional(S.String),
          NotebookInstanceSecurityGroupId: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
          NotebookS3Location: S.optional(__S(608, __c38, 0)),
          OutputNotebookS3Location: S.optional(__S(608, __c38, 0)),
          OutputNotebookFormat: S.optional(S.String),
          EnvironmentVariables: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "NotebookExecution" });
    case 2:
      return S.suspend(() =>
        S.Struct({ NotebookExecution: S.optional(__S(593, __c37, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeNotebookExecutionOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Bucket: S.optional(S.String), Key: S.optional(S.String) }),
      ).annotate({ identifier: "NotebookS3LocationForOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Type: S.optional(S.String),
          MasterInstanceSecurityGroupId: S.optional(S.String),
          ExecutionRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExecutionEngineConfig" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PersistentAppUIId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribePersistentAppUIInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PersistentAppUIId: S.optional(S.String),
          PersistentAppUITypeList: S.optional(__S(560, __c35, 0)),
          PersistentAppUIStatus: S.optional(S.String),
          AuthorId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastStateChangeReason: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
        }),
      ).annotate({ identifier: "PersistentAppUI" });
    case 2:
      return S.suspend(() =>
        S.Struct({ PersistentAppUI: S.optional(__S(641, __c40, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribePersistentAppUIOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ReleaseLabel: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeReleaseLabelInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Version: S.optional(S.String) }),
      ).annotate({ identifier: "SimplifiedApplication" });
    case 2:
      return S.Array(__S(657, __c41, 1));
    case 3:
      return S.suspend(() => S.Struct({ Label: S.optional(S.String) })).annotate({
        identifier: "OSRelease",
      });
    case 4:
      return S.Array(__S(659, __c41, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ReleaseLabel: S.optional(S.String),
          Applications: S.optional(__S(658, __c41, 2)),
          NextToken: S.optional(S.String),
          AvailableOSReleases: S.optional(__S(660, __c41, 4)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeReleaseLabelOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSecurityConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          SecurityConfiguration: S.optional(S.String),
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeSecurityConfigurationOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), StepId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeStepInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Config: S.optional(__S(704, __c44, 0)),
          ActionOnFailure: S.optional(S.String),
          Status: S.optional(__S(707, __c44, 3)),
          ExecutionRoleArn: S.optional(S.String),
          LogUri: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Step" });
    case 2:
      return S.suspend(() => S.Struct({ Step: S.optional(__S(689, __c43, 1)) }).pipe(ns)).annotate({
        identifier: "DescribeStepOutput",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Jar: S.optional(S.String),
          Properties: S.optional(__S(16, __c1, 0)),
          MainClass: S.optional(S.String),
          Args: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "HadoopStepConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Reason: S.optional(S.String),
          Message: S.optional(S.String),
          LogFile: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailureDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StepTimeline" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateChangeReason: S.optional(__S(464, __c29, 0)),
          FailureDetails: S.optional(__S(705, __c44, 1)),
          Timeline: S.optional(__S(706, __c44, 2)),
        }),
      ).annotate({ identifier: "StepStatus" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StudioId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeStudioInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          StudioArn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          AuthMode: S.optional(S.String),
          VpcId: S.optional(S.String),
          SubnetIds: S.optional(__S(176, __c11, 0)),
          ServiceRole: S.optional(S.String),
          UserRole: S.optional(S.String),
          WorkspaceSecurityGroupId: S.optional(S.String),
          EngineSecurityGroupId: S.optional(S.String),
          Url: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DefaultS3Location: S.optional(S.String),
          IdpAuthUrl: S.optional(S.String),
          IdpRelayStateParameterName: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
          IdcInstanceArn: S.optional(S.String),
          TrustedIdentityPropagationEnabled: S.optional(S.Boolean),
          IdcUserAssignment: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Studio" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Studio: S.optional(__S(721, __c45, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeStudioOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAutoTerminationPolicyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AutoTerminationPolicy: S.optional(__S(752, __c47, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetAutoTerminationPolicyOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IdleTimeout: S.optional(S.Number) })).annotate({
        identifier: "AutoTerminationPolicy",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBlockPublicAccessConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedByArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "BlockPublicAccessConfigurationMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BlockPublicAccessConfiguration: S.optional(__S(786, __c49, 2)),
          BlockPublicAccessConfigurationMetadata: S.optional(__S(769, __c48, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetBlockPublicAccessConfigurationOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MinRange: S.optional(S.Number), MaxRange: S.optional(S.Number) }),
      ).annotate({ identifier: "PortRange" });
    case 1:
      return S.Array(__S(784, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BlockPublicSecurityGroupRules: S.optional(S.Boolean),
          PermittedPublicSecurityGroupRuleRanges: S.optional(__S(785, __c49, 1)),
          Classification: S.optional(S.String),
          Configurations: S.optional(__S(33, __c2, 1)),
          Properties: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "BlockPublicAccessConfiguration" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), ExecutionRoleArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetClusterSessionCredentialsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Credentials: S.optional(__S(817, __c51, 1)),
          ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetClusterSessionCredentialsOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Username: S.optional(S.String), Password: S.optional(SensitiveString) }),
      ).annotate({ identifier: "UsernamePassword" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ UsernamePassword: __S(816, __c51, 0) })]);
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetManagedScalingPolicyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ManagedScalingPolicy: S.optional(__S(849, __c53, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetManagedScalingPolicyOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UnitType: S.optional(S.String),
          MinimumCapacityUnits: S.optional(S.Number),
          MaximumCapacityUnits: S.optional(S.Number),
          MaximumOnDemandCapacityUnits: S.optional(S.Number),
          MaximumCoreCapacityUnits: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ComputeLimits" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ComputeLimits: S.optional(__S(848, __c53, 0)),
          UtilizationPerformanceIndex: S.optional(S.Number),
          ScalingStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "ManagedScalingPolicy" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          OnClusterAppUIType: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          ExecutionRoleArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOnClusterAppUIPresignedURLInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PresignedURLReady: S.optional(S.Boolean),
          PresignedURL: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOnClusterAppUIPresignedURLOutput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PersistentAppUIId: S.optional(S.String),
          PersistentAppUIType: S.optional(S.String),
          ApplicationId: S.optional(S.String),
          AuthProxyCall: S.optional(S.Boolean),
          ExecutionRoleArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPersistentAppUIPresignedURLInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), SessionId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSessionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Session: S.optional(__S(928, __c58, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetSessionOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ClusterId: S.optional(S.String),
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          State: S.optional(S.String),
          StateChangeReason: S.optional(S.String),
          ReleaseLabel: S.optional(S.String),
          ExecutionRoleArn: S.optional(S.String),
          AccountId: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          IdleSince: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EngineConfigurations: S.optional(__S(33, __c2, 1)),
          MonitoringConfiguration: S.optional(__S(947, __c59, 3)),
          SessionIdleTimeoutInMinutes: S.optional(S.Number),
          ServerUrl: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
        }),
      ).annotate({ identifier: "Session" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          LogGroup: S.optional(S.String),
          LogStreamNamePrefix: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          LogTypes: S.optional(__S(480, __c30, 0)),
        }),
      ).annotate({ identifier: "SessionCloudWatchLoggingConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Enabled: S.optional(S.Boolean), EncryptionKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "SessionManagedLoggingConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.optional(S.Boolean),
          LogUri: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          LogTypes: S.optional(__S(480, __c30, 0)),
        }),
      ).annotate({ identifier: "SessionS3LoggingConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CloudWatchLoggingConfiguration: S.optional(__S(944, __c59, 0)),
          ManagedLoggingConfiguration: S.optional(__S(945, __c59, 1)),
          S3LoggingConfiguration: S.optional(__S(946, __c59, 2)),
        }),
      ).annotate({ identifier: "SessionMonitoringConfiguration" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), SessionId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSessionEndpointInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Endpoint: S.optional(S.String),
          AuthToken: S.optional(SensitiveString),
          AuthTokenExpirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Credentials: S.optional(__S(817, __c51, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "GetSessionEndpointOutput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          IdentityId: S.optional(S.String),
          IdentityName: S.optional(S.String),
          IdentityType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetStudioSessionMappingInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          IdentityId: S.optional(S.String),
          IdentityName: S.optional(S.String),
          IdentityType: S.optional(S.String),
          SessionPolicyArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SessionMappingDetail" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SessionMapping: S.optional(__S(977, __c61, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetStudioSessionMappingOutput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), Marker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBootstrapActionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ScriptPath: S.optional(S.String),
          Args: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "Command" });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BootstrapActions: S.optional(__S(994, __c62, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListBootstrapActionsOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ClusterStates: S.optional(__S(560, __c35, 0)),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListClustersInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(__S(499, __c31, 3)),
          NormalizedInstanceHours: S.optional(S.Number),
          ClusterArn: S.optional(S.String),
          OutpostArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ClusterSummary" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Clusters: S.optional(__S(1010, __c63, 2)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListClustersOutput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), Marker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInstanceFleetsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceType: S.optional(S.String),
          WeightedCapacity: S.optional(S.Number),
          BidPrice: S.optional(S.String),
          BidPriceAsPercentageOfOnDemandPrice: S.optional(S.Number),
          Configurations: S.optional(__S(33, __c2, 1)),
          EbsBlockDevices: S.optional(__S(1041, __c65, 1)),
          EbsOptimized: S.optional(S.Boolean),
          CustomAmiId: S.optional(S.String),
          Priority: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceTypeSpecification" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(__S(1056, __c66, 0)),
          InstanceFleetType: S.optional(S.String),
          TargetOnDemandCapacity: S.optional(S.Number),
          TargetSpotCapacity: S.optional(S.Number),
          ProvisionedOnDemandCapacity: S.optional(S.Number),
          ProvisionedSpotCapacity: S.optional(S.Number),
          InstanceTypeSpecifications: S.optional(__S(1026, __c64, 2)),
          LaunchSpecifications: S.optional(__S(98, __c6, 2)),
          ResizeSpecifications: S.optional(__S(83, __c5, 3)),
          Context: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceFleet" });
    case 4:
      return S.Array(__S(1027, __c64, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          InstanceFleets: S.optional(__S(1028, __c64, 4)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListInstanceFleetsOutput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VolumeSpecification: S.optional(__S(48, __c3, 0)),
          Device: S.optional(S.String),
        }),
      ).annotate({ identifier: "EbsBlockDevice" });
    case 1:
      return S.Array(__S(1040, __c65, 0));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateChangeReason: S.optional(__S(464, __c29, 0)),
          Timeline: S.optional(__S(512, __c32, 0)),
        }),
      ).annotate({ identifier: "InstanceFleetStatus" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), Marker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListInstanceGroupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Market: S.optional(S.String),
          InstanceGroupType: S.optional(S.String),
          BidPrice: S.optional(S.String),
          InstanceType: S.optional(S.String),
          RequestedInstanceCount: S.optional(S.Number),
          RunningInstanceCount: S.optional(S.Number),
          Status: S.optional(__S(1056, __c66, 0)),
          Configurations: S.optional(__S(33, __c2, 1)),
          ConfigurationsVersion: S.optional(S.Number),
          LastSuccessfullyAppliedConfigurations: S.optional(__S(33, __c2, 1)),
          LastSuccessfullyAppliedConfigurationsVersion: S.optional(S.Number),
          EbsBlockDevices: S.optional(__S(1041, __c65, 1)),
          EbsOptimized: S.optional(S.Boolean),
          ShrinkPolicy: S.optional(__S(1089, __c68, 1)),
          AutoScalingPolicy: S.optional(__S(1105, __c69, 1)),
          CustomAmiId: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceGroup" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InstanceGroups: S.optional(__S(1074, __c67, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListInstanceGroupsOutput" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstancesToTerminate: S.optional(__S(176, __c11, 0)),
          InstancesToProtect: S.optional(__S(176, __c11, 0)),
          InstanceTerminationTimeout: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InstanceResizePolicy" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DecommissionTimeout: S.optional(S.Number),
          InstanceResizePolicy: S.optional(__S(1088, __c68, 0)),
        }),
      ).annotate({ identifier: "ShrinkPolicy" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          State: S.optional(S.String),
          StateChangeReason: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "AutoScalingPolicyStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(__S(1104, __c69, 0)),
          Constraints: S.optional(__S(192, __c12, 0)),
          Rules: S.optional(__S(198, __c12, 6)),
        }),
      ).annotate({ identifier: "AutoScalingPolicyDescription" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          InstanceGroupId: S.optional(S.String),
          InstanceGroupTypes: S.optional(__S(560, __c35, 0)),
          InstanceFleetId: S.optional(S.String),
          InstanceFleetType: S.optional(S.String),
          InstanceStates: S.optional(__S(560, __c35, 0)),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInstancesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Device: S.optional(S.String), VolumeId: S.optional(S.String) }),
      ).annotate({ identifier: "EbsVolume" });
    case 2:
      return S.Array(__S(1121, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Ec2InstanceId: S.optional(S.String),
          PublicDnsName: S.optional(S.String),
          PublicIpAddress: S.optional(S.String),
          PrivateDnsName: S.optional(S.String),
          PrivateIpAddress: S.optional(S.String),
          Status: S.optional(__S(1056, __c66, 0)),
          InstanceGroupId: S.optional(S.String),
          InstanceFleetId: S.optional(S.String),
          Market: S.optional(S.String),
          InstanceType: S.optional(S.String),
          EbsVolumes: S.optional(__S(1122, __c70, 2)),
        }),
      ).annotate({ identifier: "Instance" });
    case 4:
      return S.Array(__S(1123, __c70, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Instances: S.optional(__S(1124, __c70, 4)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListInstancesOutput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EditorId: S.optional(S.String),
          Status: S.optional(S.String),
          From: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          To: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Marker: S.optional(S.String),
          ExecutionEngineId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListNotebookExecutionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NotebookExecutionId: S.optional(S.String),
          EditorId: S.optional(S.String),
          NotebookExecutionName: S.optional(S.String),
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NotebookS3Location: S.optional(__S(608, __c38, 0)),
          ExecutionEngineId: S.optional(S.String),
        }),
      ).annotate({ identifier: "NotebookExecutionSummary" });
    case 2:
      return S.Array(__S(1137, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NotebookExecutions: S.optional(__S(1138, __c71, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListNotebookExecutionsOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Prefix: S.optional(S.String), Application: S.optional(S.String) }),
      ).annotate({ identifier: "ReleaseLabelFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(1152, __c72, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListReleaseLabelsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReleaseLabels: S.optional(__S(176, __c11, 0)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListReleaseLabelsOutput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSecurityConfigurationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SecurityConfigurationSummary" });
    case 2:
      return S.Array(__S(1169, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SecurityConfigurations: S.optional(__S(1170, __c73, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSecurityConfigurationsOutput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          SessionStates: S.optional(__S(560, __c35, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSessionsInput" });
    case 1:
      return S.Array(__S(928, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Sessions: S.optional(__S(1185, __c74, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSessionsOutput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          StepStates: S.optional(__S(560, __c35, 0)),
          StepIds: S.optional(__S(176, __c11, 0)),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListStepsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Config: S.optional(__S(704, __c44, 0)),
          ActionOnFailure: S.optional(S.String),
          Status: S.optional(__S(707, __c44, 3)),
          LogUri: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "StepSummary" });
    case 2:
      return S.Array(__S(1201, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Steps: S.optional(__S(1202, __c75, 2)), Marker: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "ListStepsOutput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListStudiosInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          Name: S.optional(S.String),
          VpcId: S.optional(S.String),
          Description: S.optional(S.String),
          Url: S.optional(S.String),
          AuthMode: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StudioSummary" });
    case 2:
      return S.Array(__S(1217, __c76, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Studios: S.optional(__S(1218, __c76, 2)), Marker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListStudiosOutput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          IdentityType: S.optional(S.String),
          Marker: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListStudioSessionMappingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          IdentityId: S.optional(S.String),
          IdentityName: S.optional(S.String),
          IdentityType: S.optional(S.String),
          SessionPolicyArn: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SessionMappingSummary" });
    case 2:
      return S.Array(__S(1233, __c77, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SessionMappings: S.optional(__S(1234, __c77, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListStudioSessionMappingsOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ReleaseLabel: S.optional(S.String), Marker: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSupportedInstanceTypesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          MemoryGB: S.optional(S.Number),
          StorageGB: S.optional(S.Number),
          VCPU: S.optional(S.Number),
          Is64BitsOnly: S.optional(S.Boolean),
          InstanceFamilyId: S.optional(S.String),
          EbsOptimizedAvailable: S.optional(S.Boolean),
          EbsOptimizedByDefault: S.optional(S.Boolean),
          NumberOfDisks: S.optional(S.Number),
          EbsStorageOnly: S.optional(S.Boolean),
          Architecture: S.optional(S.String),
        }),
      ).annotate({ identifier: "SupportedInstanceType" });
    case 2:
      return S.Array(__S(1249, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SupportedInstanceTypes: S.optional(__S(1250, __c78, 2)),
          Marker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListSupportedInstanceTypesOutput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          StepConcurrencyLevel: S.optional(S.Number),
          ExtendedSupport: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyClusterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StepConcurrencyLevel: S.optional(S.Number),
          ExtendedSupport: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "ModifyClusterOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceFleetId: S.optional(S.String),
          TargetOnDemandCapacity: S.optional(S.Number),
          TargetSpotCapacity: S.optional(S.Number),
          ResizeSpecifications: S.optional(__S(83, __c5, 3)),
          InstanceTypeConfigs: S.optional(__S(113, __c7, 1)),
          Context: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceFleetModifyConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          InstanceFleet: S.optional(__S(1280, __c80, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyInstanceFleetInput" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InstanceGroupId: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          EC2InstanceIdsToTerminate: S.optional(__S(176, __c11, 0)),
          ShrinkPolicy: S.optional(__S(1089, __c68, 1)),
          ReconfigurationType: S.optional(S.String),
          Configurations: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "InstanceGroupModifyConfig" });
    case 1:
      return S.Array(__S(1296, __c81, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          InstanceGroups: S.optional(__S(1297, __c81, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ModifyInstanceGroupsInput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          InstanceGroupId: S.optional(S.String),
          AutoScalingPolicy: S.optional(__S(208, __c13, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAutoScalingPolicyInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          InstanceGroupId: S.optional(S.String),
          AutoScalingPolicy: S.optional(__S(1105, __c69, 1)),
          ClusterArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PutAutoScalingPolicyOutput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          AutoTerminationPolicy: S.optional(__S(752, __c47, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAutoTerminationPolicyInput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BlockPublicAccessConfiguration: S.optional(__S(786, __c49, 2)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutBlockPublicAccessConfigurationInput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          ManagedScalingPolicy: S.optional(__S(849, __c53, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutManagedScalingPolicyInput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), InstanceGroupId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveAutoScalingPolicyInput" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveAutoTerminationPolicyInput" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveManagedScalingPolicyInput" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          TagKeys: S.optional(__S(176, __c11, 0)),
          ClusterId: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RemoveTagsInput" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(128, __c8, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          MasterInstanceType: S.optional(S.String),
          SlaveInstanceType: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          InstanceGroups: S.optional(__S(225, __c14, 1)),
          InstanceFleets: S.optional(__S(1440, __c90, 0)),
          Ec2KeyName: S.optional(S.String),
          Placement: S.optional(__S(576, __c36, 0)),
          KeepJobFlowAliveWhenNoSteps: S.optional(S.Boolean),
          TerminationProtected: S.optional(S.Boolean),
          UnhealthyNodeReplacement: S.optional(S.Boolean),
          HadoopVersion: S.optional(S.String),
          Ec2SubnetId: S.optional(S.String),
          Ec2SubnetIds: S.optional(__S(176, __c11, 0)),
          EmrManagedMasterSecurityGroup: S.optional(S.String),
          EmrManagedSlaveSecurityGroup: S.optional(S.String),
          ServiceAccessSecurityGroup: S.optional(S.String),
          AdditionalMasterSecurityGroups: S.optional(__S(176, __c11, 0)),
          AdditionalSlaveSecurityGroups: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "JobFlowInstancesConfig" });
    case 2:
      return S.Array(__S(578, __c36, 2));
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Args: S.optional(__S(176, __c11, 0)) }),
      ).annotate({ identifier: "SupportedProductConfig" });
    case 4:
      return S.Array(__S(1443, __c90, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          LogUri: S.optional(S.String),
          LogEncryptionKmsKeyId: S.optional(S.String),
          AdditionalInfo: S.optional(S.String),
          AmiVersion: S.optional(S.String),
          ReleaseLabel: S.optional(S.String),
          Instances: S.optional(__S(1441, __c90, 1)),
          Steps: S.optional(__S(272, __c17, 0)),
          StepExecutionRoleArn: S.optional(S.String),
          BootstrapActions: S.optional(__S(1442, __c90, 2)),
          SupportedProducts: S.optional(__S(176, __c11, 0)),
          NewSupportedProducts: S.optional(__S(1444, __c90, 4)),
          Applications: S.optional(__S(529, __c33, 1)),
          Configurations: S.optional(__S(33, __c2, 1)),
          VisibleToAllUsers: S.optional(S.Boolean),
          JobFlowRole: S.optional(S.String),
          ServiceRole: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
          SecurityConfiguration: S.optional(S.String),
          AutoScalingRole: S.optional(S.String),
          ScaleDownBehavior: S.optional(S.String),
          CustomAmiId: S.optional(S.String),
          EbsRootVolumeSize: S.optional(S.Number),
          RepoUpgradeOnBoot: S.optional(S.String),
          KerberosAttributes: S.optional(__S(530, __c33, 2)),
          StepConcurrencyLevel: S.optional(S.Number),
          ManagedScalingPolicy: S.optional(__S(849, __c53, 1)),
          PlacementGroupConfigs: S.optional(__S(532, __c33, 4)),
          AutoTerminationPolicy: S.optional(__S(752, __c47, 0)),
          OSReleaseLabel: S.optional(S.String),
          EbsRootVolumeIops: S.optional(S.Number),
          EbsRootVolumeThroughput: S.optional(S.Number),
          ExtendedSupport: S.optional(S.Boolean),
          MonitoringConfiguration: S.optional(__S(536, __c33, 8)),
          SessionEnabled: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RunJobFlowInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({ JobFlowId: S.optional(S.String), ClusterArn: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "RunJobFlowOutput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobFlowIds: S.optional(__S(176, __c11, 0)),
          KeepJobFlowAliveWhenNoSteps: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetKeepJobFlowAliveWhenNoStepsInput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobFlowIds: S.optional(__S(176, __c11, 0)),
          TerminationProtected: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetTerminationProtectionInput" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobFlowIds: S.optional(__S(176, __c11, 0)),
          UnhealthyNodeReplacement: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetUnhealthyNodeReplacementInput" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobFlowIds: S.optional(__S(176, __c11, 0)),
          VisibleToAllUsers: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetVisibleToAllUsersInput" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EditorId: S.optional(S.String),
          RelativePath: S.optional(S.String),
          NotebookExecutionName: S.optional(S.String),
          NotebookParams: S.optional(S.String),
          ExecutionEngine: S.optional(__S(624, __c39, 0)),
          ServiceRole: S.optional(S.String),
          NotebookInstanceSecurityGroupId: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
          NotebookS3Location: S.optional(__S(608, __c38, 0)),
          OutputNotebookS3Location: S.optional(__S(608, __c38, 0)),
          OutputNotebookFormat: S.optional(S.String),
          EnvironmentVariables: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartNotebookExecutionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NotebookExecutionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "StartNotebookExecutionOutput" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ClusterId: S.optional(S.String),
          ExecutionRoleArn: S.optional(S.String),
          EngineConfigurations: S.optional(__S(33, __c2, 1)),
          MonitoringConfiguration: S.optional(__S(947, __c59, 3)),
          SessionIdleTimeoutInMinutes: S.optional(S.Number),
          ClientRequestToken: S.optional(S.String),
          Tags: S.optional(__S(161, __c10, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartSessionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ClusterId: S.optional(S.String),
          Arn: S.optional(S.String),
          AccountId: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "StartSessionOutput" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NotebookExecutionId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopNotebookExecutionInput" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ JobFlowIds: S.optional(__S(176, __c11, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TerminateJobFlowsInput" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterId: S.optional(S.String), SessionId: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TerminateSessionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ClusterId: S.optional(S.String),
          SessionId: S.optional(S.String),
          State: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "TerminateSessionOutput" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          SubnetIds: S.optional(__S(176, __c11, 0)),
          DefaultS3Location: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateStudioInput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StudioId: S.optional(S.String),
          IdentityId: S.optional(S.String),
          IdentityName: S.optional(S.String),
          IdentityType: S.optional(S.String),
          SessionPolicyArn: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateStudioSessionMappingInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
