import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Application Auto Scaling",
  target: "AnyScaleFrontendService",
  version: "2016-02-06",
  sigv4: "application-autoscaling",
  protocol: awsJson1_1Protocol,
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
                `https://application-autoscaling-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(
                  `https://application-autoscaling.${Region}.amazonaws.com`,
                );
              }
              return e(
                `https://application-autoscaling-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://application-autoscaling.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://application-autoscaling.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentUpdateException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentUpdateException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class FailedResourceAccessException
  extends /*@__PURE__*/ TE.TaggedError(
    "FailedResourceAccessException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ObjectNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ObjectNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PredictiveScalingForecastNotSupported
  extends /*@__PURE__*/ TE.TaggedError(
    "PredictiveScalingForecastNotSupported",
    [],
    {
      synthetic: {
        from: "AccessDeniedException",
        message: { includes: "GetPredictiveScalingForecast is not supported" },
      },
    },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ResourceIdMaxLen1600 = string;
export type ServiceNamespace =
  | "ecs"
  | "elasticmapreduce"
  | "ec2"
  | "appstream"
  | "dynamodb"
  | "rds"
  | "sagemaker"
  | "custom-resource"
  | "comprehend"
  | "lambda"
  | "cassandra"
  | "kafka"
  | "elasticache"
  | "neptune"
  | "workspaces"
  | (string & {});
export type ScalableDimension =
  | "ecs:service:DesiredCount"
  | "ec2:spot-fleet-request:TargetCapacity"
  | "elasticmapreduce:instancegroup:InstanceCount"
  | "appstream:fleet:DesiredCapacity"
  | "dynamodb:table:ReadCapacityUnits"
  | "dynamodb:table:WriteCapacityUnits"
  | "dynamodb:index:ReadCapacityUnits"
  | "dynamodb:index:WriteCapacityUnits"
  | "rds:cluster:ReadReplicaCount"
  | "sagemaker:variant:DesiredInstanceCount"
  | "custom-resource:ResourceType:Property"
  | "comprehend:document-classifier-endpoint:DesiredInferenceUnits"
  | "comprehend:entity-recognizer-endpoint:DesiredInferenceUnits"
  | "lambda:function:ProvisionedConcurrency"
  | "cassandra:table:ReadCapacityUnits"
  | "cassandra:table:WriteCapacityUnits"
  | "kafka:broker-storage:VolumeSize"
  | "elasticache:cache-cluster:Nodes"
  | "elasticache:replication-group:NodeGroups"
  | "elasticache:replication-group:Replicas"
  | "neptune:cluster:ReadReplicaCount"
  | "sagemaker:variant:DesiredProvisionedConcurrency"
  | "sagemaker:inference-component:DesiredCopyCount"
  | "workspaces:workspacespool:DesiredUserSessions"
  | (string & {});
export interface DeleteScalingPolicyRequest {
  PolicyName: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
}
export interface DeleteScalingPolicyResponse {}
export interface DeleteScheduledActionRequest {
  ServiceNamespace: ServiceNamespace;
  ScheduledActionName: string;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
}
export interface DeleteScheduledActionResponse {}
export interface DeregisterScalableTargetRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
}
export interface DeregisterScalableTargetResponse {}
export type ResourceIdsMaxLen1600 = string[];
export type MaxResults = number;
export type XmlString = string;
export interface DescribeScalableTargetsRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceIds?: string[];
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceCapacity = number;
export type ScalingSuspended = boolean;
export interface SuspendedState {
  DynamicScalingInSuspended?: boolean;
  DynamicScalingOutSuspended?: boolean;
  ScheduledScalingSuspended?: boolean;
}
export interface ScalableTarget {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  MinCapacity: number;
  MaxCapacity: number;
  PredictedCapacity?: number;
  RoleARN: string;
  CreationTime: Date;
  SuspendedState?: SuspendedState;
  ScalableTargetARN?: string;
}
export type ScalableTargets = ScalableTarget[];
export interface DescribeScalableTargetsResponse {
  ScalableTargets?: ScalableTarget[];
  NextToken?: string;
}
export type IncludeNotScaledActivities = boolean;
export interface DescribeScalingActivitiesRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId?: string;
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
  IncludeNotScaledActivities?: boolean;
}
export type ResourceId = string;
export type ScalingActivityStatusCode =
  | "Pending"
  | "InProgress"
  | "Successful"
  | "Overridden"
  | "Unfulfilled"
  | "Failed"
  | (string & {});
export interface NotScaledReason {
  Code: string;
  MaxCapacity?: number;
  MinCapacity?: number;
  CurrentCapacity?: number;
}
export type NotScaledReasons = NotScaledReason[];
export interface ScalingActivity {
  ActivityId: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  Description: string;
  Cause: string;
  StartTime: Date;
  EndTime?: Date;
  StatusCode: ScalingActivityStatusCode;
  StatusMessage?: string;
  Details?: string;
  NotScaledReasons?: NotScaledReason[];
}
export type ScalingActivities = ScalingActivity[];
export interface DescribeScalingActivitiesResponse {
  ScalingActivities?: ScalingActivity[];
  NextToken?: string;
}
export interface DescribeScalingPoliciesRequest {
  PolicyNames?: string[];
  ServiceNamespace: ServiceNamespace;
  ResourceId?: string;
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
}
export type PolicyName = string;
export type PolicyType =
  | "StepScaling"
  | "TargetTrackingScaling"
  | "PredictiveScaling"
  | (string & {});
export type AdjustmentType =
  | "ChangeInCapacity"
  | "PercentChangeInCapacity"
  | "ExactCapacity"
  | (string & {});
export type MetricScale = number;
export type ScalingAdjustment = number;
export interface StepAdjustment {
  MetricIntervalLowerBound?: number;
  MetricIntervalUpperBound?: number;
  ScalingAdjustment: number;
}
export type StepAdjustments = StepAdjustment[];
export type MinAdjustmentMagnitude = number;
export type Cooldown = number;
export type MetricAggregationType =
  | "Average"
  | "Minimum"
  | "Maximum"
  | (string & {});
export interface StepScalingPolicyConfiguration {
  AdjustmentType?: AdjustmentType;
  StepAdjustments?: StepAdjustment[];
  MinAdjustmentMagnitude?: number;
  Cooldown?: number;
  MetricAggregationType?: MetricAggregationType;
}
export type MetricType =
  | "DynamoDBReadCapacityUtilization"
  | "DynamoDBWriteCapacityUtilization"
  | "ALBRequestCountPerTarget"
  | "RDSReaderAverageCPUUtilization"
  | "RDSReaderAverageDatabaseConnections"
  | "EC2SpotFleetRequestAverageCPUUtilization"
  | "EC2SpotFleetRequestAverageNetworkIn"
  | "EC2SpotFleetRequestAverageNetworkOut"
  | "SageMakerVariantInvocationsPerInstance"
  | "ECSServiceAverageCPUUtilization"
  | "ECSServiceAverageMemoryUtilization"
  | "AppStreamAverageCapacityUtilization"
  | "ComprehendInferenceUtilization"
  | "LambdaProvisionedConcurrencyUtilization"
  | "CassandraReadCapacityUtilization"
  | "CassandraWriteCapacityUtilization"
  | "KafkaBrokerStorageUtilization"
  | "ElastiCacheEngineCPUUtilization"
  | "ElastiCacheDatabaseMemoryUsagePercentage"
  | "ElastiCachePrimaryEngineCPUUtilization"
  | "ElastiCacheReplicaEngineCPUUtilization"
  | "ElastiCacheDatabaseMemoryUsageCountedForEvictPercentage"
  | "NeptuneReaderAverageCPUUtilization"
  | "SageMakerVariantProvisionedConcurrencyUtilization"
  | "ElastiCacheDatabaseCapacityUsageCountedForEvictPercentage"
  | "SageMakerInferenceComponentInvocationsPerCopy"
  | "WorkSpacesAverageUserSessionsCapacityUtilization"
  | "SageMakerInferenceComponentConcurrentRequestsPerCopyHighResolution"
  | "SageMakerVariantConcurrentRequestsPerModelHighResolution"
  | "ECSServiceAverageCPUUtilizationHighResolution"
  | "ECSServiceAverageMemoryUtilizationHighResolution"
  | (string & {});
export type ResourceLabel = string;
export interface PredefinedMetricSpecification {
  PredefinedMetricType: MetricType;
  ResourceLabel?: string;
}
export type MetricName = string;
export type MetricNamespace = string;
export type MetricDimensionName = string;
export type MetricDimensionValue = string;
export interface MetricDimension {
  Name: string;
  Value: string;
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
export type Expression = string;
export type Id = string;
export type TargetTrackingMetricDimensionName = string;
export type TargetTrackingMetricDimensionValue = string;
export interface TargetTrackingMetricDimension {
  Name: string;
  Value: string;
}
export type TargetTrackingMetricDimensions = TargetTrackingMetricDimension[];
export type TargetTrackingMetricName = string;
export type TargetTrackingMetricNamespace = string;
export interface TargetTrackingMetric {
  Dimensions?: TargetTrackingMetricDimension[];
  MetricName?: string;
  Namespace?: string;
}
export type TargetTrackingMetricUnit = string;
export interface TargetTrackingMetricStat {
  Metric: TargetTrackingMetric;
  Stat: string;
  Unit?: string;
}
export type ReturnData = boolean;
export interface TargetTrackingMetricDataQuery {
  Expression?: string;
  Id: string;
  Label?: string;
  MetricStat?: TargetTrackingMetricStat;
  ReturnData?: boolean;
}
export type TargetTrackingMetricDataQueries = TargetTrackingMetricDataQuery[];
export interface CustomizedMetricSpecification {
  MetricName?: string;
  Namespace?: string;
  Dimensions?: MetricDimension[];
  Statistic?: MetricStatistic;
  Unit?: string;
  Metrics?: TargetTrackingMetricDataQuery[];
}
export type DisableScaleIn = boolean;
export interface TargetTrackingScalingPolicyConfiguration {
  TargetValue: number;
  PredefinedMetricSpecification?: PredefinedMetricSpecification;
  CustomizedMetricSpecification?: CustomizedMetricSpecification;
  ScaleOutCooldown?: number;
  ScaleInCooldown?: number;
  DisableScaleIn?: boolean;
}
export type PredictiveScalingMetricType = string;
export interface PredictiveScalingPredefinedMetricPairSpecification {
  PredefinedMetricType: string;
  ResourceLabel?: string;
}
export interface PredictiveScalingPredefinedScalingMetricSpecification {
  PredefinedMetricType: string;
  ResourceLabel?: string;
}
export interface PredictiveScalingPredefinedLoadMetricSpecification {
  PredefinedMetricType: string;
  ResourceLabel?: string;
}
export type PredictiveScalingMetricDimensionName = string;
export type PredictiveScalingMetricDimensionValue = string;
export interface PredictiveScalingMetricDimension {
  Name: string;
  Value: string;
}
export type PredictiveScalingMetricDimensions =
  PredictiveScalingMetricDimension[];
export type PredictiveScalingMetricName = string;
export type PredictiveScalingMetricNamespace = string;
export interface PredictiveScalingMetric {
  Dimensions?: PredictiveScalingMetricDimension[];
  MetricName?: string;
  Namespace?: string;
}
export type PredictiveScalingMetricUnit = string;
export interface PredictiveScalingMetricStat {
  Metric: PredictiveScalingMetric;
  Stat: string;
  Unit?: string;
}
export interface PredictiveScalingMetricDataQuery {
  Id: string;
  Expression?: string;
  MetricStat?: PredictiveScalingMetricStat;
  Label?: string;
  ReturnData?: boolean;
}
export type PredictiveScalingMetricDataQueries =
  PredictiveScalingMetricDataQuery[];
export interface PredictiveScalingCustomizedMetricSpecification {
  MetricDataQueries: PredictiveScalingMetricDataQuery[];
}
export interface PredictiveScalingMetricSpecification {
  TargetValue: number;
  PredefinedMetricPairSpecification?: PredictiveScalingPredefinedMetricPairSpecification;
  PredefinedScalingMetricSpecification?: PredictiveScalingPredefinedScalingMetricSpecification;
  PredefinedLoadMetricSpecification?: PredictiveScalingPredefinedLoadMetricSpecification;
  CustomizedScalingMetricSpecification?: PredictiveScalingCustomizedMetricSpecification;
  CustomizedLoadMetricSpecification?: PredictiveScalingCustomizedMetricSpecification;
  CustomizedCapacityMetricSpecification?: PredictiveScalingCustomizedMetricSpecification;
}
export type PredictiveScalingMetricSpecifications =
  PredictiveScalingMetricSpecification[];
export type PredictiveScalingMode =
  | "ForecastOnly"
  | "ForecastAndScale"
  | (string & {});
export type PredictiveScalingSchedulingBufferTime = number;
export type PredictiveScalingMaxCapacityBreachBehavior =
  | "HonorMaxCapacity"
  | "IncreaseMaxCapacity"
  | (string & {});
export type PredictiveScalingMaxCapacityBuffer = number;
export interface PredictiveScalingPolicyConfiguration {
  MetricSpecifications: PredictiveScalingMetricSpecification[];
  Mode?: PredictiveScalingMode;
  SchedulingBufferTime?: number;
  MaxCapacityBreachBehavior?: PredictiveScalingMaxCapacityBreachBehavior;
  MaxCapacityBuffer?: number;
}
export interface Alarm {
  AlarmName: string;
  AlarmARN: string;
}
export type Alarms = Alarm[];
export interface ScalingPolicy {
  PolicyARN: string;
  PolicyName: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  PolicyType: PolicyType;
  StepScalingPolicyConfiguration?: StepScalingPolicyConfiguration;
  TargetTrackingScalingPolicyConfiguration?: TargetTrackingScalingPolicyConfiguration;
  PredictiveScalingPolicyConfiguration?: PredictiveScalingPolicyConfiguration;
  Alarms?: Alarm[];
  CreationTime: Date;
}
export type ScalingPolicies = ScalingPolicy[];
export interface DescribeScalingPoliciesResponse {
  ScalingPolicies?: ScalingPolicy[];
  NextToken?: string;
}
export interface DescribeScheduledActionsRequest {
  ScheduledActionNames?: string[];
  ServiceNamespace: ServiceNamespace;
  ResourceId?: string;
  ScalableDimension?: ScalableDimension;
  MaxResults?: number;
  NextToken?: string;
}
export type ScheduledActionName = string;
export interface ScalableTargetAction {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export interface ScheduledAction {
  ScheduledActionName: string;
  ScheduledActionARN: string;
  ServiceNamespace: ServiceNamespace;
  Schedule: string;
  Timezone?: string;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  StartTime?: Date;
  EndTime?: Date;
  ScalableTargetAction?: ScalableTargetAction;
  CreationTime: Date;
}
export type ScheduledActions = ScheduledAction[];
export interface DescribeScheduledActionsResponse {
  ScheduledActions?: ScheduledAction[];
  NextToken?: string;
}
export interface GetPredictiveScalingForecastRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  PolicyName: string;
  StartTime: Date;
  EndTime: Date;
}
export type PredictiveScalingForecastTimestamps = Date[];
export type PredictiveScalingForecastValues = number[];
export interface LoadForecast {
  Timestamps: Date[];
  Values: number[];
  MetricSpecification: PredictiveScalingMetricSpecification;
}
export type LoadForecasts = LoadForecast[];
export interface CapacityForecast {
  Timestamps: Date[];
  Values: number[];
}
export interface GetPredictiveScalingForecastResponse {
  LoadForecast?: LoadForecast[];
  CapacityForecast?: CapacityForecast;
  UpdateTime?: Date;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface PutScalingPolicyRequest {
  PolicyName: string;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  PolicyType?: PolicyType;
  StepScalingPolicyConfiguration?: StepScalingPolicyConfiguration;
  TargetTrackingScalingPolicyConfiguration?: TargetTrackingScalingPolicyConfiguration;
  PredictiveScalingPolicyConfiguration?: PredictiveScalingPolicyConfiguration;
}
export interface PutScalingPolicyResponse {
  PolicyARN: string;
  Alarms?: Alarm[];
}
export interface PutScheduledActionRequest {
  ServiceNamespace: ServiceNamespace;
  Schedule?: string;
  Timezone?: string;
  ScheduledActionName: string;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  StartTime?: Date;
  EndTime?: Date;
  ScalableTargetAction?: ScalableTargetAction;
}
export interface PutScheduledActionResponse {}
export interface RegisterScalableTargetRequest {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  MinCapacity?: number;
  MaxCapacity?: number;
  RoleARN?: string;
  SuspendedState?: SuspendedState;
  Tags?: { [key: string]: string | undefined };
}
export interface RegisterScalableTargetResponse {
  ScalableTargetARN?: string;
}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type ExceptionMessage = string;
export type DeleteScalingPolicyError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scaling policy for an Application Auto Scaling scalable target.
 *
 * Deleting a step scaling policy deletes the underlying alarm action, but does not delete
 * the CloudWatch alarm associated with the scaling policy, even if it no longer has an associated
 * action.
 *
 * For more information, see Delete a step scaling policy and Delete a target tracking scaling policy in the
 * *Application Auto Scaling User Guide*.
 */
export const deleteScalingPolicy: API.OperationMethod<
  DeleteScalingPolicyRequest,
  DeleteScalingPolicyResponse,
  DeleteScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicyName: 0,
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
    },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPolicy",
})) as any;

export type DeleteScheduledActionError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scheduled action for an Application Auto Scaling scalable target.
 *
 * For more information, see Delete a scheduled action in the *Application Auto Scaling User Guide*.
 */
export const deleteScheduledAction: API.OperationMethod<
  DeleteScheduledActionRequest,
  DeleteScheduledActionResponse,
  DeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceNamespace: 0,
      ScheduledActionName: 0,
      ResourceId: 0,
      ScalableDimension: 0,
    },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
})) as any;

export type DeregisterScalableTargetError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters an Application Auto Scaling scalable target when you have finished using it. To see which
 * resources have been registered, use DescribeScalableTargets.
 *
 * Deregistering a scalable target deletes the scaling policies and the scheduled
 * actions that are associated with it.
 */
export const deregisterScalableTarget: API.OperationMethod<
  DeregisterScalableTargetRequest,
  DeregisterScalableTargetResponse,
  DeregisterScalableTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceNamespace: 0, ResourceId: 0, ScalableDimension: 0 },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterScalableTarget",
})) as any;

export type DescribeScalableTargetsError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the scalable targets in the specified namespace.
 *
 * You can filter the results using `ResourceIds` and
 * `ScalableDimension`.
 */
export const describeScalableTargets: API.PaginatedOperationMethod<
  DescribeScalableTargetsRequest,
  DescribeScalableTargetsResponse,
  DescribeScalableTargetsError,
  Credentials | HttpClient.HttpClient,
  ScalableTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceNamespace: 0,
      ResourceIds: 0,
      ScalableDimension: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { ScalableTargets: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalableTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalableTargets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeScalingActivitiesError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Provides descriptive information about the scaling activities in the specified namespace
 * from the previous six weeks.
 *
 * You can filter the results using `ResourceId` and
 * `ScalableDimension`.
 *
 * For information about viewing scaling activities using the Amazon Web Services CLI, see Scaling activities for Application Auto Scaling.
 */
export const describeScalingActivities: API.PaginatedOperationMethod<
  DescribeScalingActivitiesRequest,
  DescribeScalingActivitiesResponse,
  DescribeScalingActivitiesError,
  Credentials | HttpClient.HttpClient,
  ScalingActivity
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      MaxResults: 0,
      NextToken: 0,
      IncludeNotScaledActivities: 0,
    },
    output: { ScalingActivities: D.list({ StartTime: D.ts, EndTime: D.ts }) },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingActivities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalingActivities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeScalingPoliciesError =
  | ConcurrentUpdateException
  | FailedResourceAccessException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes the Application Auto Scaling scaling policies for the specified service namespace.
 *
 * You can filter the results using `ResourceId`,
 * `ScalableDimension`, and `PolicyNames`.
 *
 * For more information, see Target tracking scaling policies and Step scaling policies in the *Application Auto Scaling User Guide*.
 */
export const describeScalingPolicies: API.PaginatedOperationMethod<
  DescribeScalingPoliciesRequest,
  DescribeScalingPoliciesResponse,
  DescribeScalingPoliciesError,
  Credentials | HttpClient.HttpClient,
  ScalingPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicyNames: 0,
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { ScalingPolicies: D.list({ CreationTime: D.ts }) },
  },
  errors: [
    ConcurrentUpdateException,
    FailedResourceAccessException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScalingPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeScheduledActionsError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes the Application Auto Scaling scheduled actions for the specified service namespace.
 *
 * You can filter the results using the `ResourceId`,
 * `ScalableDimension`, and `ScheduledActionNames` parameters.
 *
 * For more information, see Scheduled scaling in the *Application Auto Scaling User Guide*.
 */
export const describeScheduledActions: API.PaginatedOperationMethod<
  DescribeScheduledActionsRequest,
  DescribeScheduledActionsResponse,
  DescribeScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ScheduledActionNames: 0,
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      ScheduledActions: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        CreationTime: D.ts,
      }),
    },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduledActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPredictiveScalingForecastError =
  | InternalServiceException
  | ValidationException
  | PredictiveScalingForecastNotSupported
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
 */
export const getPredictiveScalingForecast: API.OperationMethod<
  GetPredictiveScalingForecastRequest,
  GetPredictiveScalingForecastResponse,
  GetPredictiveScalingForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      PolicyName: 0,
      StartTime: 0,
      EndTime: 0,
    },
    output: {
      LoadForecast: D.list({ Timestamps: D.list(D.ts) }),
      CapacityForecast: { Timestamps: D.list(D.ts) },
      UpdateTime: D.ts,
    },
  },
  errors: [
    InternalServiceException,
    ValidationException,
    PredictiveScalingForecastNotSupported,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPredictiveScalingForecast",
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Returns all the tags on the specified Application Auto Scaling scalable target.
 *
 * For general information about tags, including the format and syntax, see Tagging your Amazon Web Services
 * resources in the *Amazon Web Services General Reference*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutScalingPolicyError =
  | ConcurrentUpdateException
  | FailedResourceAccessException
  | InternalServiceException
  | LimitExceededException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a scaling policy for an Application Auto Scaling scalable target.
 *
 * Each scalable target is identified by a service namespace, resource ID, and scalable
 * dimension. A scaling policy applies to the scalable target identified by those three
 * attributes. You cannot create a scaling policy until you have registered the resource as a
 * scalable target.
 *
 * Multiple scaling policies can be in force at the same time for the same scalable target.
 * You can have one or more target tracking scaling policies, one or more step scaling
 * policies, or both. However, there is a chance that multiple policies could conflict,
 * instructing the scalable target to scale out or in at the same time. Application Auto Scaling gives
 * precedence to the policy that provides the largest capacity for both scale out and scale
 * in. For example, if one policy increases capacity by 3, another policy increases capacity
 * by 200 percent, and the current capacity is 10, Application Auto Scaling uses the policy with the highest
 * calculated capacity (200% of 10 = 20) and scales out to 30.
 *
 * We recommend caution, however, when using target tracking scaling policies with step
 * scaling policies because conflicts between these policies can cause undesirable behavior.
 * For example, if the step scaling policy initiates a scale-in activity before the target
 * tracking policy is ready to scale in, the scale-in activity will not be blocked. After the
 * scale-in activity completes, the target tracking policy could instruct the scalable target
 * to scale out again.
 *
 * For more information, see Target tracking scaling policies, Step scaling policies, and Predictive scaling policies
 * in the *Application Auto Scaling User Guide*.
 *
 * If a scalable target is deregistered, the scalable target is no longer available to
 * use scaling policies. Any scaling policies that were specified for the scalable target
 * are deleted.
 */
export const putScalingPolicy: API.OperationMethod<
  PutScalingPolicyRequest,
  PutScalingPolicyResponse,
  PutScalingPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicyName: 0,
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      PolicyType: 0,
      StepScalingPolicyConfiguration: {
        AdjustmentType: 0,
        StepAdjustments: D.list({
          MetricIntervalLowerBound: 0,
          MetricIntervalUpperBound: 0,
          ScalingAdjustment: 0,
        }),
        MinAdjustmentMagnitude: 0,
        Cooldown: 0,
        MetricAggregationType: 0,
      },
      TargetTrackingScalingPolicyConfiguration: {
        TargetValue: 0,
        PredefinedMetricSpecification: {
          PredefinedMetricType: 0,
          ResourceLabel: 0,
        },
        CustomizedMetricSpecification: {
          MetricName: 0,
          Namespace: 0,
          Dimensions: D.list({ Name: 0, Value: 0 }),
          Statistic: 0,
          Unit: 0,
          Metrics: D.list({
            Expression: 0,
            Id: 0,
            Label: 0,
            MetricStat: {
              Metric: {
                Dimensions: D.list({ Name: 0, Value: 0 }),
                MetricName: 0,
                Namespace: 0,
              },
              Stat: 0,
              Unit: 0,
            },
            ReturnData: 0,
          }),
        },
        ScaleOutCooldown: 0,
        ScaleInCooldown: 0,
        DisableScaleIn: 0,
      },
      PredictiveScalingPolicyConfiguration: {
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
          CustomizedScalingMetricSpecification:
            i_PredictiveScalingCustomizedMetricSpecification,
          CustomizedLoadMetricSpecification:
            i_PredictiveScalingCustomizedMetricSpecification,
          CustomizedCapacityMetricSpecification:
            i_PredictiveScalingCustomizedMetricSpecification,
        }),
        Mode: 0,
        SchedulingBufferTime: 0,
        MaxCapacityBreachBehavior: 0,
        MaxCapacityBuffer: 0,
      },
    },
  },
  errors: [
    ConcurrentUpdateException,
    FailedResourceAccessException,
    InternalServiceException,
    LimitExceededException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScalingPolicy",
})) as any;

export type PutScheduledActionError =
  | ConcurrentUpdateException
  | InternalServiceException
  | LimitExceededException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a scheduled action for an Application Auto Scaling scalable target.
 *
 * Each scalable target is identified by a service namespace, resource ID, and scalable
 * dimension. A scheduled action applies to the scalable target identified by those three
 * attributes. You cannot create a scheduled action until you have registered the resource as
 * a scalable target.
 *
 * When you specify start and end times with a recurring schedule using a cron expression
 * or rates, they form the boundaries for when the recurring action starts and stops.
 *
 * To update a scheduled action, specify the parameters that you want to change. If you
 * don't specify start and end times, the old values are deleted.
 *
 * For more information, see Scheduled scaling in the *Application Auto Scaling User Guide*.
 *
 * If a scalable target is deregistered, the scalable target is no longer available to
 * run scheduled actions. Any scheduled actions that were specified for the scalable target
 * are deleted.
 */
export const putScheduledAction: API.OperationMethod<
  PutScheduledActionRequest,
  PutScheduledActionResponse,
  PutScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceNamespace: 0,
      Schedule: 0,
      Timezone: 0,
      ScheduledActionName: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      StartTime: 0,
      EndTime: 0,
      ScalableTargetAction: { MinCapacity: 0, MaxCapacity: 0 },
    },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    LimitExceededException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutScheduledAction",
})) as any;

export type RegisterScalableTargetError =
  | ConcurrentUpdateException
  | InternalServiceException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Registers or updates a scalable target, which is the resource that you want to
 * scale.
 *
 * Scalable targets are uniquely identified by the combination of resource ID, scalable
 * dimension, and namespace, which represents some capacity dimension of the underlying
 * service.
 *
 * When you register a new scalable target, you must specify values for the minimum and
 * maximum capacity. If the specified resource is not active in the target service, this
 * operation does not change the resource's current capacity. Otherwise, it changes the
 * resource's current capacity to a value that is inside of this range.
 *
 * If you add a scaling policy, current capacity is adjustable within the specified range
 * when scaling starts. Application Auto Scaling scaling policies will not scale capacity to values that are
 * outside of the minimum and maximum range.
 *
 * After you register a scalable target, you do not need to register it again to use other
 * Application Auto Scaling operations. To see which resources have been registered, use DescribeScalableTargets. You can also view the scaling policies for a service
 * namespace by using DescribeScalableTargets. If you no longer need a scalable target, you can
 * deregister it by using DeregisterScalableTarget.
 *
 * To update a scalable target, specify the parameters that you want to change. Include the
 * parameters that identify the scalable target: resource ID, scalable dimension, and
 * namespace. Any parameters that you don't specify are not changed by this update request.
 *
 * If you call the `RegisterScalableTarget` API operation to create a
 * scalable target, there might be a brief delay until the operation achieves eventual
 * consistency. You might become aware of this brief delay if you get unexpected
 * errors when performing sequential operations. The typical strategy is to retry the
 * request, and some Amazon Web Services SDKs include automatic backoff and retry logic.
 *
 * If you call the `RegisterScalableTarget` API operation to update an
 * existing scalable target, Application Auto Scaling retrieves the current capacity of the resource. If
 * it's below the minimum capacity or above the maximum capacity, Application Auto Scaling adjusts the
 * capacity of the scalable target to place it within these bounds, even if you don't
 * include the `MinCapacity` or `MaxCapacity` request
 * parameters.
 */
export const registerScalableTarget: API.OperationMethod<
  RegisterScalableTargetRequest,
  RegisterScalableTargetResponse,
  RegisterScalableTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      MinCapacity: 0,
      MaxCapacity: 0,
      RoleARN: 0,
      SuspendedState: {
        DynamicScalingInSuspended: 0,
        DynamicScalingOutSuspended: 0,
        ScheduledScalingSuspended: 0,
      },
      Tags: 0,
    },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterScalableTarget",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds or edits tags on an Application Auto Scaling scalable target.
 *
 * Each tag consists of a tag key and a tag value, which are both case-sensitive strings.
 * To add a tag, specify a new tag key and a tag value. To edit a tag, specify an existing tag
 * key and a new tag value.
 *
 * You can use this operation to tag an Application Auto Scaling scalable target, but you cannot tag a
 * scaling policy or scheduled action.
 *
 * You can also add tags to an Application Auto Scaling scalable target while creating it
 * (`RegisterScalableTarget`).
 *
 * For general information about tags, including the format and syntax, see Tagging your Amazon Web Services
 * resources in the *Amazon Web Services General Reference*.
 *
 * Use tags to control access to a scalable target. For more information, see Tagging support
 * for Application Auto Scaling in the *Application Auto Scaling User Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: 0 } },
  errors: [
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tags from an Application Auto Scaling scalable target. To delete a tag, specify the tag key and
 * the Application Auto Scaling scalable target.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_PredictiveScalingCustomizedMetricSpecification: D.LazyStruct = () => ({
  MetricDataQueries: D.list({
    Id: 0,
    Expression: 0,
    MetricStat: {
      Metric: {
        Dimensions: D.list({ Name: 0, Value: 0 }),
        MetricName: 0,
        Namespace: 0,
      },
      Stat: 0,
      Unit: 0,
    },
    Label: 0,
    ReturnData: 0,
  }),
});
