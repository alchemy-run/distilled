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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Application Auto Scaling",
  serviceShapeName: "AnyScaleFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "application-autoscaling" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-02-06");
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
              return e(`https://application-autoscaling.${Region}.amazonaws.com`);
            }
            return e(
              `https://application-autoscaling-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://application-autoscaling.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://application-autoscaling.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://application-autoscaling.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentUpdateException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentUpdateException>()(
    "ConcurrentUpdateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConcurrentUpdateException", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class FailedResourceAccessException
  extends /*@__PURE__*/ S.TaggedError<FailedResourceAccessException>()(
    "FailedResourceAccessException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "FailedResourceAccessException",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalServiceException", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNextTokenException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceededException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ObjectNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ObjectNotFoundException>()(
    "ObjectNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ObjectNotFoundException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PredictiveScalingForecastNotSupported
  extends /*@__PURE__*/ S.TaggedError<PredictiveScalingForecastNotSupported>()(
    "PredictiveScalingForecastNotSupported",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "AccessDeniedException",
      message: { includes: "GetPredictiveScalingForecast is not supported" },
    }),
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export type MetricAggregationType = "Average" | "Minimum" | "Maximum" | (string & {});
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
export type PredictiveScalingMetricDimensions = PredictiveScalingMetricDimension[];
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
export type PredictiveScalingMetricDataQueries = PredictiveScalingMetricDataQuery[];
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
export type PredictiveScalingMetricSpecifications = PredictiveScalingMetricSpecification[];
export type PredictiveScalingMode = "ForecastOnly" | "ForecastAndScale" | (string & {});
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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteScalingPolicyRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteScalingPolicyResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPolicy",
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<DeleteScheduledActionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeleteScheduledActionResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<DeregisterScalableTargetRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<DeregisterScalableTargetResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterScalableTarget",
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<DescribeScalableTargetsRequest>,
  output: __S(67, __c4, 3) as any as S.Schema<DescribeScalableTargetsResponse>,
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
  input: __S(112, __c7, 0) as any as S.Schema<DescribeScalingActivitiesRequest>,
  output: __S(117, __c7, 5) as any as S.Schema<DescribeScalingActivitiesResponse>,
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
  input: __S(128, __c8, 0) as any as S.Schema<DescribeScalingPoliciesRequest>,
  output: __S(131, __c8, 3) as any as S.Schema<DescribeScalingPoliciesResponse>,
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
  input: __S(176, __c11, 0) as any as S.Schema<DescribeScheduledActionsRequest>,
  output: __S(179, __c11, 3) as any as S.Schema<DescribeScheduledActionsResponse>,
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
  input: __S(208, __c13, 0) as any as S.Schema<GetPredictiveScalingForecastRequest>,
  output: __S(214, __c13, 6) as any as S.Schema<GetPredictiveScalingForecastResponse>,
  errors: [InternalServiceException, ValidationException, PredictiveScalingForecastNotSupported],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPredictiveScalingForecast",
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(225, __c14, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<PutScalingPolicyRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<PutScalingPolicyResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<PutScheduledActionRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<PutScheduledActionResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<RegisterScalableTargetRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<RegisterScalableTargetResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterScalableTarget",
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, TooManyTagsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(320, __c20, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(16, __c1, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyName: S.String,
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteScalingPolicyRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteScalingPolicyResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ScheduledActionName: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteScheduledActionRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeregisterScalableTargetRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ResourceIds: S.optional(__S(80, __c5, 0)),
          ScalableDimension: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScalableTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          MinCapacity: S.Number,
          MaxCapacity: S.Number,
          PredictedCapacity: S.optional(S.Number),
          RoleARN: S.String,
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SuspendedState: S.optional(__S(96, __c6, 0)),
          ScalableTargetARN: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScalableTarget" });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScalableTargets: S.optional(__S(66, __c4, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeScalableTargetsResponse" });
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
          DynamicScalingInSuspended: S.optional(S.Boolean),
          DynamicScalingOutSuspended: S.optional(S.Boolean),
          ScheduledScalingSuspended: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SuspendedState" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ResourceId: S.optional(S.String),
          ScalableDimension: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          IncludeNotScaledActivities: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScalingActivitiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Code: S.String,
          MaxCapacity: S.optional(S.Number),
          MinCapacity: S.optional(S.Number),
          CurrentCapacity: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NotScaledReason" });
    case 2:
      return S.Array(__S(113, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ActivityId: S.String,
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          Description: S.String,
          Cause: S.String,
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StatusCode: S.String,
          StatusMessage: S.optional(S.String),
          Details: S.optional(S.String),
          NotScaledReasons: S.optional(__S(114, __c7, 2)),
        }),
      ).annotate({ identifier: "ScalingActivity" });
    case 4:
      return S.Array(__S(115, __c7, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ScalingActivities: S.optional(__S(116, __c7, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeScalingActivitiesResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyNames: S.optional(__S(80, __c5, 0)),
          ServiceNamespace: S.String,
          ResourceId: S.optional(S.String),
          ScalableDimension: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScalingPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyARN: S.String,
          PolicyName: S.String,
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          PolicyType: S.String,
          StepScalingPolicyConfiguration: S.optional(__S(162, __c10, 2)),
          TargetTrackingScalingPolicyConfiguration: S.optional(__S(167, __c10, 7)),
          PredictiveScalingPolicyConfiguration: S.optional(__S(169, __c10, 9)),
          Alarms: S.optional(__S(171, __c10, 11)),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ScalingPolicy" });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScalingPolicies: S.optional(__S(130, __c8, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeScalingPoliciesResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "MetricDimension",
      });
    case 1:
      return S.Array(__S(144, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Dimensions: S.optional(__S(145, __c9, 1)),
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetTrackingMetric" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Metric: __S(146, __c9, 2), Stat: S.String, Unit: S.optional(S.String) }),
      ).annotate({ identifier: "TargetTrackingMetricStat" });
    case 4:
      return S.suspend(() =>
        S.Struct({ PredefinedMetricType: S.String, ResourceLabel: S.optional(S.String) }),
      ).annotate({ identifier: "PredictiveScalingPredefinedMetricPairSpecification" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Expression: S.optional(S.String),
          MetricStat: S.optional(__S(147, __c9, 3)),
          Label: S.optional(S.String),
          ReturnData: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "PredictiveScalingMetricDataQuery" });
    case 6:
      return S.Array(__S(149, __c9, 5));
    case 7:
      return S.suspend(() => S.Struct({ MetricDataQueries: __S(150, __c9, 6) })).annotate({
        identifier: "PredictiveScalingCustomizedMetricSpecification",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          TargetValue: S.Number,
          PredefinedMetricPairSpecification: S.optional(__S(148, __c9, 4)),
          PredefinedScalingMetricSpecification: S.optional(__S(148, __c9, 4)),
          PredefinedLoadMetricSpecification: S.optional(__S(148, __c9, 4)),
          CustomizedScalingMetricSpecification: S.optional(__S(151, __c9, 7)),
          CustomizedLoadMetricSpecification: S.optional(__S(151, __c9, 7)),
          CustomizedCapacityMetricSpecification: S.optional(__S(151, __c9, 7)),
        }),
      ).annotate({ identifier: "PredictiveScalingMetricSpecification" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetricIntervalLowerBound: S.optional(S.Number),
          MetricIntervalUpperBound: S.optional(S.Number),
          ScalingAdjustment: S.Number,
        }),
      ).annotate({ identifier: "StepAdjustment" });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AdjustmentType: S.optional(S.String),
          StepAdjustments: S.optional(__S(161, __c10, 1)),
          MinAdjustmentMagnitude: S.optional(S.Number),
          Cooldown: S.optional(S.Number),
          MetricAggregationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "StepScalingPolicyConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ PredefinedMetricType: S.String, ResourceLabel: S.optional(S.String) }),
      ).annotate({ identifier: "PredefinedMetricSpecification" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Expression: S.optional(S.String),
          Id: S.String,
          Label: S.optional(S.String),
          MetricStat: S.optional(__S(147, __c9, 3)),
          ReturnData: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TargetTrackingMetricDataQuery" });
    case 5:
      return S.Array(__S(164, __c10, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
          Dimensions: S.optional(__S(145, __c9, 1)),
          Statistic: S.optional(S.String),
          Unit: S.optional(S.String),
          Metrics: S.optional(__S(165, __c10, 5)),
        }),
      ).annotate({ identifier: "CustomizedMetricSpecification" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          TargetValue: S.Number,
          PredefinedMetricSpecification: S.optional(__S(163, __c10, 3)),
          CustomizedMetricSpecification: S.optional(__S(166, __c10, 6)),
          ScaleOutCooldown: S.optional(S.Number),
          ScaleInCooldown: S.optional(S.Number),
          DisableScaleIn: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "TargetTrackingScalingPolicyConfiguration" });
    case 8:
      return S.Array(__S(152, __c9, 8));
    case 9:
      return S.suspend(() =>
        S.Struct({
          MetricSpecifications: __S(168, __c10, 8),
          Mode: S.optional(S.String),
          SchedulingBufferTime: S.optional(S.Number),
          MaxCapacityBreachBehavior: S.optional(S.String),
          MaxCapacityBuffer: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PredictiveScalingPolicyConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ AlarmName: S.String, AlarmARN: S.String })).annotate({
        identifier: "Alarm",
      });
    case 11:
      return S.Array(__S(170, __c10, 10));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionNames: S.optional(__S(80, __c5, 0)),
          ServiceNamespace: S.String,
          ResourceId: S.optional(S.String),
          ScalableDimension: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScheduledActionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ScheduledActionName: S.String,
          ScheduledActionARN: S.String,
          ServiceNamespace: S.String,
          Schedule: S.String,
          Timezone: S.optional(S.String),
          ResourceId: S.String,
          ScalableDimension: S.String,
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScalableTargetAction: S.optional(__S(192, __c12, 0)),
          CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ScheduledAction" });
    case 2:
      return S.Array(__S(177, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScheduledActions: S.optional(__S(178, __c11, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeScheduledActionsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MinCapacity: S.optional(S.Number), MaxCapacity: S.optional(S.Number) }),
      ).annotate({ identifier: "ScalableTargetAction" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          PolicyName: S.String,
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetPredictiveScalingForecastRequest" });
    case 1:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 2:
      return S.Array(S.Number);
    case 3:
      return S.suspend(() =>
        S.Struct({
          Timestamps: __S(209, __c13, 1),
          Values: __S(210, __c13, 2),
          MetricSpecification: __S(152, __c9, 8),
        }),
      ).annotate({ identifier: "LoadForecast" });
    case 4:
      return S.Array(__S(211, __c13, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Timestamps: __S(209, __c13, 1), Values: __S(210, __c13, 2) }),
      ).annotate({ identifier: "CapacityForecast" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          LoadForecast: S.optional(__S(212, __c13, 4)),
          CapacityForecast: S.optional(__S(213, __c13, 5)),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetPredictiveScalingForecastResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(240, __c15, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyName: S.String,
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          PolicyType: S.optional(S.String),
          StepScalingPolicyConfiguration: S.optional(__S(162, __c10, 2)),
          TargetTrackingScalingPolicyConfiguration: S.optional(__S(167, __c10, 7)),
          PredictiveScalingPolicyConfiguration: S.optional(__S(169, __c10, 9)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutScalingPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PolicyARN: S.String, Alarms: S.optional(__S(171, __c10, 11)) }),
      ).annotate({ identifier: "PutScalingPolicyResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          Schedule: S.optional(S.String),
          Timezone: S.optional(S.String),
          ScheduledActionName: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScalableTargetAction: S.optional(__S(192, __c12, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutScheduledActionRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          MinCapacity: S.optional(S.Number),
          MaxCapacity: S.optional(S.Number),
          RoleARN: S.optional(S.String),
          SuspendedState: S.optional(__S(96, __c6, 0)),
          Tags: S.optional(__S(240, __c15, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RegisterScalableTargetRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ScalableTargetARN: S.optional(S.String) })).annotate({
        identifier: "RegisterScalableTargetResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(240, __c15, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(80, __c5, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
