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
  sdkId: "Auto Scaling Plans",
  target: "AnyScaleScalingPlannerFrontendService",
  version: "2018-01-06",
  sigv4: "autoscaling-plans",
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
                `https://autoscaling-plans-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e(
                  "https://autoscaling-plans.us-gov-east-1.amazonaws.com",
                );
              }
              if (Region === "us-gov-west-1") {
                return e(
                  "https://autoscaling-plans.us-gov-west-1.amazonaws.com",
                );
              }
              return e(
                `https://autoscaling-plans-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://autoscaling-plans.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://autoscaling-plans.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ScalingPlanName = string;
export type XmlString = string;
export type XmlStringMaxLen128 = string;
export type XmlStringMaxLen256 = string;
export type TagValues = string[];
export interface TagFilter {
  Key?: string;
  Values?: string[];
}
export type TagFilters = TagFilter[];
export interface ApplicationSource {
  CloudFormationStackARN?: string;
  TagFilters?: TagFilter[];
}
export type ServiceNamespace =
  | "autoscaling"
  | "ecs"
  | "ec2"
  | "rds"
  | "dynamodb"
  | (string & {});
export type ResourceIdMaxLen1600 = string;
export type ScalableDimension =
  | "autoscaling:autoScalingGroup:DesiredCapacity"
  | "ecs:service:DesiredCount"
  | "ec2:spot-fleet-request:TargetCapacity"
  | "rds:cluster:ReadReplicaCount"
  | "dynamodb:table:ReadCapacityUnits"
  | "dynamodb:table:WriteCapacityUnits"
  | "dynamodb:index:ReadCapacityUnits"
  | "dynamodb:index:WriteCapacityUnits"
  | (string & {});
export type ResourceCapacity = number;
export type ScalingMetricType =
  | "ASGAverageCPUUtilization"
  | "ASGAverageNetworkIn"
  | "ASGAverageNetworkOut"
  | "DynamoDBReadCapacityUtilization"
  | "DynamoDBWriteCapacityUtilization"
  | "ECSServiceAverageCPUUtilization"
  | "ECSServiceAverageMemoryUtilization"
  | "ALBRequestCountPerTarget"
  | "RDSReaderAverageCPUUtilization"
  | "RDSReaderAverageDatabaseConnections"
  | "EC2SpotFleetRequestAverageCPUUtilization"
  | "EC2SpotFleetRequestAverageNetworkIn"
  | "EC2SpotFleetRequestAverageNetworkOut"
  | (string & {});
export type ResourceLabel = string;
export interface PredefinedScalingMetricSpecification {
  PredefinedScalingMetricType: ScalingMetricType;
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
export interface CustomizedScalingMetricSpecification {
  MetricName: string;
  Namespace: string;
  Dimensions?: MetricDimension[];
  Statistic: MetricStatistic;
  Unit?: string;
}
export type MetricScale = number;
export type DisableScaleIn = boolean;
export type Cooldown = number;
export interface TargetTrackingConfiguration {
  PredefinedScalingMetricSpecification?: PredefinedScalingMetricSpecification;
  CustomizedScalingMetricSpecification?: CustomizedScalingMetricSpecification;
  TargetValue: number;
  DisableScaleIn?: boolean;
  ScaleOutCooldown?: number;
  ScaleInCooldown?: number;
  EstimatedInstanceWarmup?: number;
}
export type TargetTrackingConfigurations = TargetTrackingConfiguration[];
export type LoadMetricType =
  | "ASGTotalCPUUtilization"
  | "ASGTotalNetworkIn"
  | "ASGTotalNetworkOut"
  | "ALBTargetGroupRequestCount"
  | (string & {});
export interface PredefinedLoadMetricSpecification {
  PredefinedLoadMetricType: LoadMetricType;
  ResourceLabel?: string;
}
export interface CustomizedLoadMetricSpecification {
  MetricName: string;
  Namespace: string;
  Dimensions?: MetricDimension[];
  Statistic: MetricStatistic;
  Unit?: string;
}
export type ScheduledActionBufferTime = number;
export type PredictiveScalingMaxCapacityBehavior =
  | "SetForecastCapacityToMaxCapacity"
  | "SetMaxCapacityToForecastCapacity"
  | "SetMaxCapacityAboveForecastCapacity"
  | (string & {});
export type PredictiveScalingMode =
  | "ForecastAndScale"
  | "ForecastOnly"
  | (string & {});
export type ScalingPolicyUpdateBehavior =
  | "KeepExternalPolicies"
  | "ReplaceExternalPolicies"
  | (string & {});
export type DisableDynamicScaling = boolean;
export interface ScalingInstruction {
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  MinCapacity: number;
  MaxCapacity: number;
  TargetTrackingConfigurations: TargetTrackingConfiguration[];
  PredefinedLoadMetricSpecification?: PredefinedLoadMetricSpecification;
  CustomizedLoadMetricSpecification?: CustomizedLoadMetricSpecification;
  ScheduledActionBufferTime?: number;
  PredictiveScalingMaxCapacityBehavior?: PredictiveScalingMaxCapacityBehavior;
  PredictiveScalingMaxCapacityBuffer?: number;
  PredictiveScalingMode?: PredictiveScalingMode;
  ScalingPolicyUpdateBehavior?: ScalingPolicyUpdateBehavior;
  DisableDynamicScaling?: boolean;
}
export type ScalingInstructions = ScalingInstruction[];
export interface CreateScalingPlanRequest {
  ScalingPlanName: string;
  ApplicationSource: ApplicationSource;
  ScalingInstructions: ScalingInstruction[];
}
export type ScalingPlanVersion = number;
export interface CreateScalingPlanResponse {
  ScalingPlanVersion: number;
}
export interface DeleteScalingPlanRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
}
export interface DeleteScalingPlanResponse {}
export type MaxResults = number;
export type NextToken = string;
export interface DescribeScalingPlanResourcesRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  MaxResults?: number;
  NextToken?: string;
}
export type PolicyName = string;
export type PolicyType = "TargetTrackingScaling" | (string & {});
export interface ScalingPolicy {
  PolicyName: string;
  PolicyType: PolicyType;
  TargetTrackingConfiguration?: TargetTrackingConfiguration;
}
export type ScalingPolicies = ScalingPolicy[];
export type ScalingStatusCode =
  | "Inactive"
  | "PartiallyActive"
  | "Active"
  | (string & {});
export interface ScalingPlanResource {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  ScalingPolicies?: ScalingPolicy[];
  ScalingStatusCode: ScalingStatusCode;
  ScalingStatusMessage?: string;
}
export type ScalingPlanResources = ScalingPlanResource[];
export interface DescribeScalingPlanResourcesResponse {
  ScalingPlanResources?: ScalingPlanResource[];
  NextToken?: string;
}
export type ScalingPlanNames = string[];
export type ApplicationSources = ApplicationSource[];
export interface DescribeScalingPlansRequest {
  ScalingPlanNames?: string[];
  ScalingPlanVersion?: number;
  ApplicationSources?: ApplicationSource[];
  MaxResults?: number;
  NextToken?: string;
}
export type ScalingPlanStatusCode =
  | "Active"
  | "ActiveWithProblems"
  | "CreationInProgress"
  | "CreationFailed"
  | "DeletionInProgress"
  | "DeletionFailed"
  | "UpdateInProgress"
  | "UpdateFailed"
  | (string & {});
export interface ScalingPlan {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ApplicationSource: ApplicationSource;
  ScalingInstructions: ScalingInstruction[];
  StatusCode: ScalingPlanStatusCode;
  StatusMessage?: string;
  StatusStartTime?: Date;
  CreationTime?: Date;
}
export type ScalingPlans = ScalingPlan[];
export interface DescribeScalingPlansResponse {
  ScalingPlans?: ScalingPlan[];
  NextToken?: string;
}
export type ForecastDataType =
  | "CapacityForecast"
  | "LoadForecast"
  | "ScheduledActionMinCapacity"
  | "ScheduledActionMaxCapacity"
  | (string & {});
export interface GetScalingPlanResourceForecastDataRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ServiceNamespace: ServiceNamespace;
  ResourceId: string;
  ScalableDimension: ScalableDimension;
  ForecastDataType: ForecastDataType;
  StartTime: Date;
  EndTime: Date;
}
export interface Datapoint {
  Timestamp?: Date;
  Value?: number;
}
export type Datapoints = Datapoint[];
export interface GetScalingPlanResourceForecastDataResponse {
  Datapoints: Datapoint[];
}
export interface UpdateScalingPlanRequest {
  ScalingPlanName: string;
  ScalingPlanVersion: number;
  ApplicationSource?: ApplicationSource;
  ScalingInstructions?: ScalingInstruction[];
}
export interface UpdateScalingPlanResponse {}
export type ErrorMessage = string;
export type CreateScalingPlanError =
  | ConcurrentUpdateException
  | InternalServiceException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scaling plan.
 */
export const createScalingPlan: API.OperationMethod<
  CreateScalingPlanRequest,
  CreateScalingPlanResponse,
  CreateScalingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScalingPlanName: 0,
      ApplicationSource: i_ApplicationSource,
      ScalingInstructions: D.list(i_ScalingInstruction),
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
  operationName: "CreateScalingPlan",
})) as any;

export type DeleteScalingPlanError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scaling plan.
 *
 * Deleting a scaling plan deletes the underlying ScalingInstruction for
 * all of the scalable resources that are covered by the plan.
 *
 * If the plan has launched resources or has scaling activities in progress, you must
 * delete those resources separately.
 */
export const deleteScalingPlan: API.OperationMethod<
  DeleteScalingPlanRequest,
  DeleteScalingPlanResponse,
  DeleteScalingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ScalingPlanName: 0, ScalingPlanVersion: 0 },
  },
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPlan",
})) as any;

export type DescribeScalingPlanResourcesError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes the scalable resources in the specified scaling plan.
 */
export const describeScalingPlanResources: API.OperationMethod<
  DescribeScalingPlanResourcesRequest,
  DescribeScalingPlanResourcesResponse,
  DescribeScalingPlanResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScalingPlanName: 0,
      ScalingPlanVersion: 0,
      MaxResults: 0,
      NextToken: 0,
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
  operationName: "DescribeScalingPlanResources",
})) as any;

export type DescribeScalingPlansError =
  | ConcurrentUpdateException
  | InternalServiceException
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Describes one or more of your scaling plans.
 */
export const describeScalingPlans: API.OperationMethod<
  DescribeScalingPlansRequest,
  DescribeScalingPlansResponse,
  DescribeScalingPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScalingPlanNames: 0,
      ScalingPlanVersion: 0,
      ApplicationSources: D.list(i_ApplicationSource),
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      ScalingPlans: D.list({ StatusStartTime: D.ts, CreationTime: D.ts }),
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
  operationName: "DescribeScalingPlans",
})) as any;

export type GetScalingPlanResourceForecastDataError =
  | InternalServiceException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the forecast data for a scalable resource.
 *
 * Capacity forecasts are represented as predicted values, or data points, that are
 * calculated using historical data points from a specified CloudWatch load metric. Data points are
 * available for up to 56 days.
 */
export const getScalingPlanResourceForecastData: API.OperationMethod<
  GetScalingPlanResourceForecastDataRequest,
  GetScalingPlanResourceForecastDataResponse,
  GetScalingPlanResourceForecastDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScalingPlanName: 0,
      ScalingPlanVersion: 0,
      ServiceNamespace: 0,
      ResourceId: 0,
      ScalableDimension: 0,
      ForecastDataType: 0,
      StartTime: 0,
      EndTime: 0,
    },
    output: { Datapoints: D.list({ Timestamp: D.ts }) },
  },
  errors: [InternalServiceException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScalingPlanResourceForecastData",
})) as any;

export type UpdateScalingPlanError =
  | ConcurrentUpdateException
  | InternalServiceException
  | ObjectNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified scaling plan.
 *
 * You cannot update a scaling plan if it is in the process of being created, updated, or
 * deleted.
 */
export const updateScalingPlan: API.OperationMethod<
  UpdateScalingPlanRequest,
  UpdateScalingPlanResponse,
  UpdateScalingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ScalingPlanName: 0,
      ScalingPlanVersion: 0,
      ApplicationSource: i_ApplicationSource,
      ScalingInstructions: D.list(i_ScalingInstruction),
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
  operationName: "UpdateScalingPlan",
})) as any;

const i_ApplicationSource: D.LazyStruct = () => ({
  CloudFormationStackARN: 0,
  TagFilters: D.list({ Key: 0, Values: 0 }),
});
const i_ScalingInstruction: D.LazyStruct = () => ({
  ServiceNamespace: 0,
  ResourceId: 0,
  ScalableDimension: 0,
  MinCapacity: 0,
  MaxCapacity: 0,
  TargetTrackingConfigurations: D.list({
    PredefinedScalingMetricSpecification: {
      PredefinedScalingMetricType: 0,
      ResourceLabel: 0,
    },
    CustomizedScalingMetricSpecification: {
      MetricName: 0,
      Namespace: 0,
      Dimensions: D.list(i_MetricDimension),
      Statistic: 0,
      Unit: 0,
    },
    TargetValue: 0,
    DisableScaleIn: 0,
    ScaleOutCooldown: 0,
    ScaleInCooldown: 0,
    EstimatedInstanceWarmup: 0,
  }),
  PredefinedLoadMetricSpecification: {
    PredefinedLoadMetricType: 0,
    ResourceLabel: 0,
  },
  CustomizedLoadMetricSpecification: {
    MetricName: 0,
    Namespace: 0,
    Dimensions: D.list(i_MetricDimension),
    Statistic: 0,
    Unit: 0,
  },
  ScheduledActionBufferTime: 0,
  PredictiveScalingMaxCapacityBehavior: 0,
  PredictiveScalingMaxCapacityBuffer: 0,
  PredictiveScalingMode: 0,
  ScalingPolicyUpdateBehavior: 0,
  DisableDynamicScaling: 0,
});
const i_MetricDimension: D.LazyStruct = () => ({ Name: 0, Value: 0 });
