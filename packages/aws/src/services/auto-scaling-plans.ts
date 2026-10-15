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
  sdkId: "Auto Scaling Plans",
  serviceShapeName: "AnyScaleScalingPlannerFrontendService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "autoscaling-plans" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-01-06");
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
              return e("https://autoscaling-plans.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://autoscaling-plans.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://autoscaling-plans-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://autoscaling-plans.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://autoscaling-plans.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://autoscaling-plans.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentUpdateException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentUpdateException>()(
    "ConcurrentUpdateException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ConcurrentUpdateException", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
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
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export type ServiceNamespace = "autoscaling" | "ecs" | "ec2" | "rds" | "dynamodb" | (string & {});
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
export type PredictiveScalingMode = "ForecastAndScale" | "ForecastOnly" | (string & {});
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
export type ScalingStatusCode = "Inactive" | "PartiallyActive" | "Active" | (string & {});
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
  input: __S(16, __c2, 0) as any as S.Schema<CreateScalingPlanRequest>,
  output: __S(17, __c2, 1) as any as S.Schema<CreateScalingPlanResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScalingPlan",
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<DeleteScalingPlanRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteScalingPlanResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScalingPlan",
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<DescribeScalingPlanResourcesRequest>,
  output: __S(61, __c7, 5) as any as S.Schema<DescribeScalingPlanResourcesResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPlanResources",
}));

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
  input: __S(65, __c8, 1) as any as S.Schema<DescribeScalingPlansRequest>,
  output: __S(68, __c8, 4) as any as S.Schema<DescribeScalingPlansResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    InvalidNextTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingPlans",
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<GetScalingPlanResourceForecastDataRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<GetScalingPlanResourceForecastDataResponse>,
  errors: [InternalServiceException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScalingPlanResourceForecastData",
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<UpdateScalingPlanRequest>,
  output: __S(48, __c6, 0) as any as S.Schema<UpdateScalingPlanResponse>,
  errors: [
    ConcurrentUpdateException,
    InternalServiceException,
    ObjectNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScalingPlan",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanName: S.String,
          ScalingPlanVersion: S.Number,
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          ForecastDataType: S.String,
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetScalingPlanResourceForecastDataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Value: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Datapoint" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() => S.Struct({ Datapoints: __S(2, __c0, 2) })).annotate({
        identifier: "GetScalingPlanResourceForecastDataResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanName: S.String,
          ScalingPlanVersion: S.Number,
          ApplicationSource: S.optional(__S(35, __c4, 3)),
          ScalingInstructions: S.optional(__S(39, __c4, 7)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateScalingPlanRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanName: S.String,
          ApplicationSource: __S(35, __c4, 3),
          ScalingInstructions: __S(39, __c4, 7),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScalingPlanRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ScalingPlanVersion: S.Number })).annotate({
        identifier: "CreateScalingPlanResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PredefinedScalingMetricType: S.String, ResourceLabel: S.optional(S.String) }),
      ).annotate({ identifier: "PredefinedScalingMetricSpecification" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "MetricDimension",
      });
    case 2:
      return S.Array(__S(25, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.String,
          Namespace: S.String,
          Dimensions: S.optional(__S(26, __c3, 2)),
          Statistic: S.String,
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomizedScalingMetricSpecification" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PredefinedScalingMetricSpecification: S.optional(__S(24, __c3, 0)),
          CustomizedScalingMetricSpecification: S.optional(__S(27, __c3, 3)),
          TargetValue: S.Number,
          DisableScaleIn: S.optional(S.Boolean),
          ScaleOutCooldown: S.optional(S.Number),
          ScaleInCooldown: S.optional(S.Number),
          EstimatedInstanceWarmup: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TargetTrackingConfiguration" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Values: S.optional(__S(32, __c4, 0)) }),
      ).annotate({ identifier: "TagFilter" });
    case 2:
      return S.Array(__S(33, __c4, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CloudFormationStackARN: S.optional(S.String),
          TagFilters: S.optional(__S(34, __c4, 2)),
        }),
      ).annotate({ identifier: "ApplicationSource" });
    case 4:
      return S.Array(__S(28, __c3, 4));
    case 5:
      return S.suspend(() =>
        S.Struct({ PredefinedLoadMetricType: S.String, ResourceLabel: S.optional(S.String) }),
      ).annotate({ identifier: "PredefinedLoadMetricSpecification" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          MinCapacity: S.Number,
          MaxCapacity: S.Number,
          TargetTrackingConfigurations: __S(36, __c4, 4),
          PredefinedLoadMetricSpecification: S.optional(__S(37, __c4, 5)),
          CustomizedLoadMetricSpecification: S.optional(__S(27, __c3, 3)),
          ScheduledActionBufferTime: S.optional(S.Number),
          PredictiveScalingMaxCapacityBehavior: S.optional(S.String),
          PredictiveScalingMaxCapacityBuffer: S.optional(S.Number),
          PredictiveScalingMode: S.optional(S.String),
          ScalingPolicyUpdateBehavior: S.optional(S.String),
          DisableDynamicScaling: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ScalingInstruction" });
    case 7:
      return S.Array(__S(38, __c4, 6));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScalingPlanName: S.String, ScalingPlanVersion: S.Number }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScalingPlanRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteScalingPlanResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanName: S.String,
          ScalingPlanVersion: S.Number,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScalingPlanResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PolicyName: S.String,
          PolicyType: S.String,
          TargetTrackingConfiguration: S.optional(__S(28, __c3, 4)),
        }),
      ).annotate({ identifier: "ScalingPolicy" });
    case 2:
      return S.Array(__S(57, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanName: S.String,
          ScalingPlanVersion: S.Number,
          ServiceNamespace: S.String,
          ResourceId: S.String,
          ScalableDimension: S.String,
          ScalingPolicies: S.optional(__S(58, __c7, 2)),
          ScalingStatusCode: S.String,
          ScalingStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScalingPlanResource" });
    case 4:
      return S.Array(__S(59, __c7, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanResources: S.optional(__S(60, __c7, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeScalingPlanResourcesResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(35, __c4, 3));
    case 1:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanNames: S.optional(__S(32, __c4, 0)),
          ScalingPlanVersion: S.optional(S.Number),
          ApplicationSources: S.optional(__S(64, __c8, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeScalingPlansRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ScalingPlanName: S.String,
          ScalingPlanVersion: S.Number,
          ApplicationSource: __S(35, __c4, 3),
          ScalingInstructions: __S(39, __c4, 7),
          StatusCode: S.String,
          StatusMessage: S.optional(S.String),
          StatusStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ScalingPlan" });
    case 3:
      return S.Array(__S(66, __c8, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ ScalingPlans: S.optional(__S(67, __c8, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeScalingPlansResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
