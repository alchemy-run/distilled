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
  sdkId: "forecast",
  target: "AmazonForecast",
  version: "2018-06-26",
  sigv4: "forecast",
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
                `https://forecast-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://forecast-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://forecast.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://forecast.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
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
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["AuthError", "AlreadyExistsError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export type Name = string;
export type ForecastType = string;
export type ForecastTypes = string[];
export type ForecastDimensions = string[];
export type Frequency = string;
export type Arn = string;
export type Value = string;
export type Transformations = { [key: string]: string | undefined };
export interface AttributeConfig {
  AttributeName: string;
  Transformations: { [key: string]: string | undefined };
}
export type AttributeConfigs = AttributeConfig[];
export type Values = string[];
export type Configuration = { [key: string]: string[] | undefined };
export interface AdditionalDataset {
  Name: string;
  Configuration?: { [key: string]: string[] | undefined };
}
export type AdditionalDatasets = AdditionalDataset[];
export interface DataConfig {
  DatasetGroupArn: string;
  AttributeConfigs?: AttributeConfig[];
  AdditionalDatasets?: AdditionalDataset[];
}
export type KMSKeyArn = string;
export interface EncryptionConfig {
  RoleArn: string;
  KMSKeyArn: string;
}
export type OptimizationMetric =
  | "WAPE"
  | "RMSE"
  | "AverageWeightedQuantileLoss"
  | "MASE"
  | "MAPE"
  | (string & {});
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export type Tags = Tag[];
export interface MonitorConfig {
  MonitorName: string;
}
export type Month =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER"
  | (string & {});
export type DayOfMonth = number;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export type Hour = number;
export interface TimeAlignmentBoundary {
  Month?: Month;
  DayOfMonth?: number;
  DayOfWeek?: DayOfWeek;
  Hour?: number;
}
export interface CreateAutoPredictorRequest {
  PredictorName: string;
  ForecastHorizon?: number;
  ForecastTypes?: string[];
  ForecastDimensions?: string[];
  ForecastFrequency?: string;
  DataConfig?: DataConfig;
  EncryptionConfig?: EncryptionConfig;
  ReferencePredictorArn?: string;
  OptimizationMetric?: OptimizationMetric;
  ExplainPredictor?: boolean;
  Tags?: Tag[];
  MonitorConfig?: MonitorConfig;
  TimeAlignmentBoundary?: TimeAlignmentBoundary;
}
export interface CreateAutoPredictorResponse {
  PredictorArn?: string;
}
export type Domain =
  | "RETAIL"
  | "CUSTOM"
  | "INVENTORY_PLANNING"
  | "EC2_CAPACITY"
  | "WORK_FORCE"
  | "WEB_TRAFFIC"
  | "METRICS"
  | (string & {});
export type DatasetType =
  | "TARGET_TIME_SERIES"
  | "RELATED_TIME_SERIES"
  | "ITEM_METADATA"
  | (string & {});
export type AttributeType =
  | "string"
  | "integer"
  | "float"
  | "timestamp"
  | "geolocation"
  | (string & {});
export interface SchemaAttribute {
  AttributeName?: string;
  AttributeType?: AttributeType;
}
export type SchemaAttributes = SchemaAttribute[];
export interface Schema {
  Attributes?: SchemaAttribute[];
}
export interface CreateDatasetRequest {
  DatasetName: string;
  Domain: Domain;
  DatasetType: DatasetType;
  DataFrequency?: string;
  Schema: Schema;
  EncryptionConfig?: EncryptionConfig;
  Tags?: Tag[];
}
export interface CreateDatasetResponse {
  DatasetArn?: string;
}
export type ArnList = string[];
export interface CreateDatasetGroupRequest {
  DatasetGroupName: string;
  Domain: Domain;
  DatasetArns?: string[];
  Tags?: Tag[];
}
export interface CreateDatasetGroupResponse {
  DatasetGroupArn?: string;
}
export type S3Path = string;
export interface S3Config {
  Path: string;
  RoleArn: string;
  KMSKeyArn?: string;
}
export interface DataSource {
  S3Config: S3Config;
}
export type TimestampFormat = string;
export type TimeZone = string;
export type UseGeolocationForTimeZone = boolean;
export type GeolocationFormat = string;
export type Format = string;
export type ImportMode = "FULL" | "INCREMENTAL" | (string & {});
export interface CreateDatasetImportJobRequest {
  DatasetImportJobName: string;
  DatasetArn: string;
  DataSource: DataSource;
  TimestampFormat?: string;
  TimeZone?: string;
  UseGeolocationForTimeZone?: boolean;
  GeolocationFormat?: string;
  Tags?: Tag[];
  Format?: string;
  ImportMode?: ImportMode;
}
export interface CreateDatasetImportJobResponse {
  DatasetImportJobArn?: string;
}
export type TimeSeriesGranularity = "ALL" | "SPECIFIC" | (string & {});
export type TimePointGranularity = "ALL" | "SPECIFIC" | (string & {});
export interface ExplainabilityConfig {
  TimeSeriesGranularity: TimeSeriesGranularity;
  TimePointGranularity: TimePointGranularity;
}
export type LocalDateTime = string;
export interface CreateExplainabilityRequest {
  ExplainabilityName: string;
  ResourceArn: string;
  ExplainabilityConfig: ExplainabilityConfig;
  DataSource?: DataSource;
  Schema?: Schema;
  EnableVisualization?: boolean;
  StartDateTime?: string;
  EndDateTime?: string;
  Tags?: Tag[];
}
export interface CreateExplainabilityResponse {
  ExplainabilityArn?: string;
}
export interface DataDestination {
  S3Config: S3Config;
}
export interface CreateExplainabilityExportRequest {
  ExplainabilityExportName: string;
  ExplainabilityArn: string;
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export interface CreateExplainabilityExportResponse {
  ExplainabilityExportArn?: string;
}
export interface TimeSeriesIdentifiers {
  DataSource?: DataSource;
  Schema?: Schema;
  Format?: string;
}
export interface TimeSeriesSelector {
  TimeSeriesIdentifiers?: TimeSeriesIdentifiers;
}
export interface CreateForecastRequest {
  ForecastName: string;
  PredictorArn: string;
  ForecastTypes?: string[];
  Tags?: Tag[];
  TimeSeriesSelector?: TimeSeriesSelector;
}
export interface CreateForecastResponse {
  ForecastArn?: string;
}
export interface CreateForecastExportJobRequest {
  ForecastExportJobName: string;
  ForecastArn: string;
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export interface CreateForecastExportJobResponse {
  ForecastExportJobArn?: string;
}
export interface CreateMonitorRequest {
  MonitorName: string;
  ResourceArn: string;
  Tags?: Tag[];
}
export interface CreateMonitorResponse {
  MonitorArn?: string;
}
export type AutoMLOverrideStrategy =
  | "LatencyOptimized"
  | "AccuracyOptimized"
  | (string & {});
export type ParameterKey = string;
export type ParameterValue = string;
export type TrainingParameters = { [key: string]: string | undefined };
export interface EvaluationParameters {
  NumberOfBacktestWindows?: number;
  BackTestWindowOffset?: number;
}
export interface CategoricalParameterRange {
  Name: string;
  Values: string[];
}
export type CategoricalParameterRanges = CategoricalParameterRange[];
export type ScalingType =
  | "Auto"
  | "Linear"
  | "Logarithmic"
  | "ReverseLogarithmic"
  | (string & {});
export interface ContinuousParameterRange {
  Name: string;
  MaxValue: number;
  MinValue: number;
  ScalingType?: ScalingType;
}
export type ContinuousParameterRanges = ContinuousParameterRange[];
export interface IntegerParameterRange {
  Name: string;
  MaxValue: number;
  MinValue: number;
  ScalingType?: ScalingType;
}
export type IntegerParameterRanges = IntegerParameterRange[];
export interface ParameterRanges {
  CategoricalParameterRanges?: CategoricalParameterRange[];
  ContinuousParameterRanges?: ContinuousParameterRange[];
  IntegerParameterRanges?: IntegerParameterRange[];
}
export interface HyperParameterTuningJobConfig {
  ParameterRanges?: ParameterRanges;
}
export interface SupplementaryFeature {
  Name: string;
  Value: string;
}
export type SupplementaryFeatures = SupplementaryFeature[];
export interface InputDataConfig {
  DatasetGroupArn: string;
  SupplementaryFeatures?: SupplementaryFeature[];
}
export type FeaturizationMethodName = "filling" | (string & {});
export type FeaturizationMethodParameters = {
  [key: string]: string | undefined;
};
export interface FeaturizationMethod {
  FeaturizationMethodName: FeaturizationMethodName;
  FeaturizationMethodParameters?: { [key: string]: string | undefined };
}
export type FeaturizationPipeline = FeaturizationMethod[];
export interface Featurization {
  AttributeName: string;
  FeaturizationPipeline?: FeaturizationMethod[];
}
export type Featurizations = Featurization[];
export interface FeaturizationConfig {
  ForecastFrequency: string;
  ForecastDimensions?: string[];
  Featurizations?: Featurization[];
}
export interface CreatePredictorRequest {
  PredictorName: string;
  AlgorithmArn?: string;
  ForecastHorizon: number;
  ForecastTypes?: string[];
  PerformAutoML?: boolean;
  AutoMLOverrideStrategy?: AutoMLOverrideStrategy;
  PerformHPO?: boolean;
  TrainingParameters?: { [key: string]: string | undefined };
  EvaluationParameters?: EvaluationParameters;
  HPOConfig?: HyperParameterTuningJobConfig;
  InputDataConfig: InputDataConfig;
  FeaturizationConfig: FeaturizationConfig;
  EncryptionConfig?: EncryptionConfig;
  Tags?: Tag[];
  OptimizationMetric?: OptimizationMetric;
}
export interface CreatePredictorResponse {
  PredictorArn?: string;
}
export interface CreatePredictorBacktestExportJobRequest {
  PredictorBacktestExportJobName: string;
  PredictorArn: string;
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export interface CreatePredictorBacktestExportJobResponse {
  PredictorBacktestExportJobArn?: string;
}
export interface CreateWhatIfAnalysisRequest {
  WhatIfAnalysisName: string;
  ForecastArn: string;
  TimeSeriesSelector?: TimeSeriesSelector;
  Tags?: Tag[];
}
export interface CreateWhatIfAnalysisResponse {
  WhatIfAnalysisArn?: string;
}
export type Operation =
  | "ADD"
  | "SUBTRACT"
  | "MULTIPLY"
  | "DIVIDE"
  | (string & {});
export interface Action {
  AttributeName: string;
  Operation: Operation;
  Value: number;
}
export type AttributeValue = string;
export type Condition =
  | "EQUALS"
  | "NOT_EQUALS"
  | "LESS_THAN"
  | "GREATER_THAN"
  | (string & {});
export interface TimeSeriesCondition {
  AttributeName: string;
  AttributeValue: string;
  Condition: Condition;
}
export type TimeSeriesConditions = TimeSeriesCondition[];
export interface TimeSeriesTransformation {
  Action?: Action;
  TimeSeriesConditions?: TimeSeriesCondition[];
}
export type TimeSeriesTransformations = TimeSeriesTransformation[];
export interface TimeSeriesReplacementsDataSource {
  S3Config: S3Config;
  Schema: Schema;
  Format?: string;
  TimestampFormat?: string;
}
export interface CreateWhatIfForecastRequest {
  WhatIfForecastName: string;
  WhatIfAnalysisArn: string;
  TimeSeriesTransformations?: TimeSeriesTransformation[];
  TimeSeriesReplacementsDataSource?: TimeSeriesReplacementsDataSource;
  Tags?: Tag[];
}
export type LongArn = string;
export interface CreateWhatIfForecastResponse {
  WhatIfForecastArn?: string;
}
export type WhatIfForecastArnListForExport = string[];
export interface CreateWhatIfForecastExportRequest {
  WhatIfForecastExportName: string;
  WhatIfForecastArns: string[];
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export interface CreateWhatIfForecastExportResponse {
  WhatIfForecastExportArn?: string;
}
export interface DeleteDatasetRequest {
  DatasetArn: string;
}
export interface DeleteDatasetResponse {}
export interface DeleteDatasetGroupRequest {
  DatasetGroupArn: string;
}
export interface DeleteDatasetGroupResponse {}
export interface DeleteDatasetImportJobRequest {
  DatasetImportJobArn: string;
}
export interface DeleteDatasetImportJobResponse {}
export interface DeleteExplainabilityRequest {
  ExplainabilityArn: string;
}
export interface DeleteExplainabilityResponse {}
export interface DeleteExplainabilityExportRequest {
  ExplainabilityExportArn: string;
}
export interface DeleteExplainabilityExportResponse {}
export interface DeleteForecastRequest {
  ForecastArn: string;
}
export interface DeleteForecastResponse {}
export interface DeleteForecastExportJobRequest {
  ForecastExportJobArn: string;
}
export interface DeleteForecastExportJobResponse {}
export interface DeleteMonitorRequest {
  MonitorArn: string;
}
export interface DeleteMonitorResponse {}
export interface DeletePredictorRequest {
  PredictorArn: string;
}
export interface DeletePredictorResponse {}
export interface DeletePredictorBacktestExportJobRequest {
  PredictorBacktestExportJobArn: string;
}
export interface DeletePredictorBacktestExportJobResponse {}
export interface DeleteResourceTreeRequest {
  ResourceArn: string;
}
export interface DeleteResourceTreeResponse {}
export interface DeleteWhatIfAnalysisRequest {
  WhatIfAnalysisArn: string;
}
export interface DeleteWhatIfAnalysisResponse {}
export interface DeleteWhatIfForecastRequest {
  WhatIfForecastArn: string;
}
export interface DeleteWhatIfForecastResponse {}
export interface DeleteWhatIfForecastExportRequest {
  WhatIfForecastExportArn: string;
}
export interface DeleteWhatIfForecastExportResponse {}
export interface DescribeAutoPredictorRequest {
  PredictorArn: string;
}
export type State = "Active" | "Deleted" | (string & {});
export interface ReferencePredictorSummary {
  Arn?: string;
  State?: State;
}
export type Status = string;
export type Message = string;
export interface ExplainabilityInfo {
  ExplainabilityArn?: string;
  Status?: string;
}
export interface MonitorInfo {
  MonitorArn?: string;
  Status?: string;
}
export interface DescribeAutoPredictorResponse {
  PredictorArn?: string;
  PredictorName?: string;
  ForecastHorizon?: number;
  ForecastTypes?: string[];
  ForecastFrequency?: string;
  ForecastDimensions?: string[];
  DatasetImportJobArns?: string[];
  DataConfig?: DataConfig;
  EncryptionConfig?: EncryptionConfig;
  ReferencePredictorSummary?: ReferencePredictorSummary;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  OptimizationMetric?: OptimizationMetric;
  ExplainabilityInfo?: ExplainabilityInfo;
  MonitorInfo?: MonitorInfo;
  TimeAlignmentBoundary?: TimeAlignmentBoundary;
}
export interface DescribeDatasetRequest {
  DatasetArn: string;
}
export interface DescribeDatasetResponse {
  DatasetArn?: string;
  DatasetName?: string;
  Domain?: Domain;
  DatasetType?: DatasetType;
  DataFrequency?: string;
  Schema?: Schema;
  EncryptionConfig?: EncryptionConfig;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export interface DescribeDatasetGroupRequest {
  DatasetGroupArn: string;
}
export interface DescribeDatasetGroupResponse {
  DatasetGroupName?: string;
  DatasetGroupArn?: string;
  DatasetArns?: string[];
  Domain?: Domain;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export interface DescribeDatasetImportJobRequest {
  DatasetImportJobArn: string;
}
export interface Statistics {
  Count?: number;
  CountDistinct?: number;
  CountNull?: number;
  CountNan?: number;
  Min?: string;
  Max?: string;
  Avg?: number;
  Stddev?: number;
  CountLong?: number;
  CountDistinctLong?: number;
  CountNullLong?: number;
  CountNanLong?: number;
}
export type FieldStatistics = { [key: string]: Statistics | undefined };
export interface DescribeDatasetImportJobResponse {
  DatasetImportJobName?: string;
  DatasetImportJobArn?: string;
  DatasetArn?: string;
  TimestampFormat?: string;
  TimeZone?: string;
  UseGeolocationForTimeZone?: boolean;
  GeolocationFormat?: string;
  DataSource?: DataSource;
  EstimatedTimeRemainingInMinutes?: number;
  FieldStatistics?: { [key: string]: Statistics | undefined };
  DataSize?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
  ImportMode?: ImportMode;
}
export interface DescribeExplainabilityRequest {
  ExplainabilityArn: string;
}
export interface DescribeExplainabilityResponse {
  ExplainabilityArn?: string;
  ExplainabilityName?: string;
  ResourceArn?: string;
  ExplainabilityConfig?: ExplainabilityConfig;
  EnableVisualization?: boolean;
  DataSource?: DataSource;
  Schema?: Schema;
  StartDateTime?: string;
  EndDateTime?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export interface DescribeExplainabilityExportRequest {
  ExplainabilityExportArn: string;
}
export interface DescribeExplainabilityExportResponse {
  ExplainabilityExportArn?: string;
  ExplainabilityExportName?: string;
  ExplainabilityArn?: string;
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
}
export interface DescribeForecastRequest {
  ForecastArn: string;
}
export type ErrorMessage = string;
export interface DescribeForecastResponse {
  ForecastArn?: string;
  ForecastName?: string;
  ForecastTypes?: string[];
  PredictorArn?: string;
  DatasetGroupArn?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  TimeSeriesSelector?: TimeSeriesSelector;
}
export interface DescribeForecastExportJobRequest {
  ForecastExportJobArn: string;
}
export interface DescribeForecastExportJobResponse {
  ForecastExportJobArn?: string;
  ForecastExportJobName?: string;
  ForecastArn?: string;
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
}
export interface DescribeMonitorRequest {
  MonitorArn: string;
}
export type EvaluationState = string;
export interface BaselineMetric {
  Name?: string;
  Value?: number;
}
export type BaselineMetrics = BaselineMetric[];
export interface PredictorBaseline {
  BaselineMetrics?: BaselineMetric[];
}
export interface Baseline {
  PredictorBaseline?: PredictorBaseline;
}
export interface DescribeMonitorResponse {
  MonitorName?: string;
  MonitorArn?: string;
  ResourceArn?: string;
  Status?: string;
  LastEvaluationTime?: Date;
  LastEvaluationState?: string;
  Baseline?: Baseline;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  EstimatedEvaluationTimeRemainingInMinutes?: number;
}
export interface DescribePredictorRequest {
  PredictorArn: string;
}
export interface TestWindowSummary {
  TestWindowStart?: Date;
  TestWindowEnd?: Date;
  Status?: string;
  Message?: string;
}
export type TestWindowDetails = TestWindowSummary[];
export interface PredictorExecution {
  AlgorithmArn?: string;
  TestWindows?: TestWindowSummary[];
}
export type PredictorExecutions = PredictorExecution[];
export interface PredictorExecutionDetails {
  PredictorExecutions?: PredictorExecution[];
}
export interface DescribePredictorResponse {
  PredictorArn?: string;
  PredictorName?: string;
  AlgorithmArn?: string;
  AutoMLAlgorithmArns?: string[];
  ForecastHorizon?: number;
  ForecastTypes?: string[];
  PerformAutoML?: boolean;
  AutoMLOverrideStrategy?: AutoMLOverrideStrategy;
  PerformHPO?: boolean;
  TrainingParameters?: { [key: string]: string | undefined };
  EvaluationParameters?: EvaluationParameters;
  HPOConfig?: HyperParameterTuningJobConfig;
  InputDataConfig?: InputDataConfig;
  FeaturizationConfig?: FeaturizationConfig;
  EncryptionConfig?: EncryptionConfig;
  PredictorExecutionDetails?: PredictorExecutionDetails;
  EstimatedTimeRemainingInMinutes?: number;
  IsAutoPredictor?: boolean;
  DatasetImportJobArns?: string[];
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  OptimizationMetric?: OptimizationMetric;
}
export interface DescribePredictorBacktestExportJobRequest {
  PredictorBacktestExportJobArn: string;
}
export interface DescribePredictorBacktestExportJobResponse {
  PredictorBacktestExportJobArn?: string;
  PredictorBacktestExportJobName?: string;
  PredictorArn?: string;
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
}
export interface DescribeWhatIfAnalysisRequest {
  WhatIfAnalysisArn: string;
}
export interface DescribeWhatIfAnalysisResponse {
  WhatIfAnalysisName?: string;
  WhatIfAnalysisArn?: string;
  ForecastArn?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  TimeSeriesSelector?: TimeSeriesSelector;
}
export interface DescribeWhatIfForecastRequest {
  WhatIfForecastArn: string;
}
export interface DescribeWhatIfForecastResponse {
  WhatIfForecastName?: string;
  WhatIfForecastArn?: string;
  WhatIfAnalysisArn?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  TimeSeriesTransformations?: TimeSeriesTransformation[];
  TimeSeriesReplacementsDataSource?: TimeSeriesReplacementsDataSource;
  ForecastTypes?: string[];
}
export interface DescribeWhatIfForecastExportRequest {
  WhatIfForecastExportArn: string;
}
export type LongArnList = string[];
export interface DescribeWhatIfForecastExportResponse {
  WhatIfForecastExportArn?: string;
  WhatIfForecastExportName?: string;
  WhatIfForecastArns?: string[];
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  EstimatedTimeRemainingInMinutes?: number;
  LastModificationTime?: Date;
  Format?: string;
}
export interface GetAccuracyMetricsRequest {
  PredictorArn: string;
}
export type EvaluationType = "SUMMARY" | "COMPUTED" | (string & {});
export interface WeightedQuantileLoss {
  Quantile?: number;
  LossValue?: number;
}
export type WeightedQuantileLosses = WeightedQuantileLoss[];
export interface ErrorMetric {
  ForecastType?: string;
  WAPE?: number;
  RMSE?: number;
  MASE?: number;
  MAPE?: number;
}
export type ErrorMetrics = ErrorMetric[];
export interface Metrics {
  RMSE?: number;
  WeightedQuantileLosses?: WeightedQuantileLoss[];
  ErrorMetrics?: ErrorMetric[];
  AverageWeightedQuantileLoss?: number;
}
export interface WindowSummary {
  TestWindowStart?: Date;
  TestWindowEnd?: Date;
  ItemCount?: number;
  EvaluationType?: EvaluationType;
  Metrics?: Metrics;
}
export type TestWindows = WindowSummary[];
export interface EvaluationResult {
  AlgorithmArn?: string;
  TestWindows?: WindowSummary[];
}
export type PredictorEvaluationResults = EvaluationResult[];
export interface GetAccuracyMetricsResponse {
  PredictorEvaluationResults?: EvaluationResult[];
  IsAutoPredictor?: boolean;
  AutoMLOverrideStrategy?: AutoMLOverrideStrategy;
  OptimizationMetric?: OptimizationMetric;
}
export type NextToken = string;
export type MaxResults = number;
export interface ListDatasetGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface DatasetGroupSummary {
  DatasetGroupArn?: string;
  DatasetGroupName?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type DatasetGroups = DatasetGroupSummary[];
export interface ListDatasetGroupsResponse {
  DatasetGroups?: DatasetGroupSummary[];
  NextToken?: string;
}
export type FilterConditionString = "IS" | "IS_NOT" | (string & {});
export interface Filter {
  Key: string;
  Value: string;
  Condition: FilterConditionString;
}
export type Filters = Filter[];
export interface ListDatasetImportJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface DatasetImportJobSummary {
  DatasetImportJobArn?: string;
  DatasetImportJobName?: string;
  DataSource?: DataSource;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  ImportMode?: ImportMode;
}
export type DatasetImportJobs = DatasetImportJobSummary[];
export interface ListDatasetImportJobsResponse {
  DatasetImportJobs?: DatasetImportJobSummary[];
  NextToken?: string;
}
export interface ListDatasetsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface DatasetSummary {
  DatasetArn?: string;
  DatasetName?: string;
  DatasetType?: DatasetType;
  Domain?: Domain;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type Datasets = DatasetSummary[];
export interface ListDatasetsResponse {
  Datasets?: DatasetSummary[];
  NextToken?: string;
}
export interface ListExplainabilitiesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface ExplainabilitySummary {
  ExplainabilityArn?: string;
  ExplainabilityName?: string;
  ResourceArn?: string;
  ExplainabilityConfig?: ExplainabilityConfig;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type Explainabilities = ExplainabilitySummary[];
export interface ListExplainabilitiesResponse {
  Explainabilities?: ExplainabilitySummary[];
  NextToken?: string;
}
export interface ListExplainabilityExportsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface ExplainabilityExportSummary {
  ExplainabilityExportArn?: string;
  ExplainabilityExportName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type ExplainabilityExports = ExplainabilityExportSummary[];
export interface ListExplainabilityExportsResponse {
  ExplainabilityExports?: ExplainabilityExportSummary[];
  NextToken?: string;
}
export interface ListForecastExportJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface ForecastExportJobSummary {
  ForecastExportJobArn?: string;
  ForecastExportJobName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type ForecastExportJobs = ForecastExportJobSummary[];
export interface ListForecastExportJobsResponse {
  ForecastExportJobs?: ForecastExportJobSummary[];
  NextToken?: string;
}
export interface ListForecastsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface ForecastSummary {
  ForecastArn?: string;
  ForecastName?: string;
  PredictorArn?: string;
  CreatedUsingAutoPredictor?: boolean;
  DatasetGroupArn?: string;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type Forecasts = ForecastSummary[];
export interface ListForecastsResponse {
  Forecasts?: ForecastSummary[];
  NextToken?: string;
}
export interface ListMonitorEvaluationsRequest {
  NextToken?: string;
  MaxResults?: number;
  MonitorArn: string;
  Filters?: Filter[];
}
export type Detail = string;
export interface PredictorEvent {
  Detail?: string;
  Datetime?: Date;
}
export interface MonitorDataSource {
  DatasetImportJobArn?: string;
  ForecastArn?: string;
  PredictorArn?: string;
}
export type MetricName = string;
export interface MetricResult {
  MetricName?: string;
  MetricValue?: number;
}
export type MetricResults = MetricResult[];
export interface PredictorMonitorEvaluation {
  ResourceArn?: string;
  MonitorArn?: string;
  EvaluationTime?: Date;
  EvaluationState?: string;
  WindowStartDatetime?: Date;
  WindowEndDatetime?: Date;
  PredictorEvent?: PredictorEvent;
  MonitorDataSource?: MonitorDataSource;
  MetricResults?: MetricResult[];
  NumItemsEvaluated?: number;
  Message?: string;
}
export type PredictorMonitorEvaluations = PredictorMonitorEvaluation[];
export interface ListMonitorEvaluationsResponse {
  NextToken?: string;
  PredictorMonitorEvaluations?: PredictorMonitorEvaluation[];
}
export interface ListMonitorsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface MonitorSummary {
  MonitorArn?: string;
  MonitorName?: string;
  ResourceArn?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type Monitors = MonitorSummary[];
export interface ListMonitorsResponse {
  Monitors?: MonitorSummary[];
  NextToken?: string;
}
export interface ListPredictorBacktestExportJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface PredictorBacktestExportJobSummary {
  PredictorBacktestExportJobArn?: string;
  PredictorBacktestExportJobName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type PredictorBacktestExportJobs = PredictorBacktestExportJobSummary[];
export interface ListPredictorBacktestExportJobsResponse {
  PredictorBacktestExportJobs?: PredictorBacktestExportJobSummary[];
  NextToken?: string;
}
export interface ListPredictorsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface PredictorSummary {
  PredictorArn?: string;
  PredictorName?: string;
  DatasetGroupArn?: string;
  IsAutoPredictor?: boolean;
  ReferencePredictorSummary?: ReferencePredictorSummary;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type Predictors = PredictorSummary[];
export interface ListPredictorsResponse {
  Predictors?: PredictorSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ListWhatIfAnalysesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface WhatIfAnalysisSummary {
  WhatIfAnalysisArn?: string;
  WhatIfAnalysisName?: string;
  ForecastArn?: string;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type WhatIfAnalyses = WhatIfAnalysisSummary[];
export interface ListWhatIfAnalysesResponse {
  WhatIfAnalyses?: WhatIfAnalysisSummary[];
  NextToken?: string;
}
export interface ListWhatIfForecastExportsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface WhatIfForecastExportSummary {
  WhatIfForecastExportArn?: string;
  WhatIfForecastArns?: string[];
  WhatIfForecastExportName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type WhatIfForecastExports = WhatIfForecastExportSummary[];
export interface ListWhatIfForecastExportsResponse {
  WhatIfForecastExports?: WhatIfForecastExportSummary[];
  NextToken?: string;
}
export interface ListWhatIfForecastsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export interface WhatIfForecastSummary {
  WhatIfForecastArn?: string;
  WhatIfForecastName?: string;
  WhatIfAnalysisArn?: string;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export type WhatIfForecasts = WhatIfForecastSummary[];
export interface ListWhatIfForecastsResponse {
  WhatIfForecasts?: WhatIfForecastSummary[];
  NextToken?: string;
}
export interface ResumeResourceRequest {
  ResourceArn: string;
}
export interface ResumeResourceResponse {}
export interface StopResourceRequest {
  ResourceArn: string;
}
export interface StopResourceResponse {}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export interface UpdateDatasetGroupRequest {
  DatasetGroupArn: string;
  DatasetArns: string[];
}
export interface UpdateDatasetGroupResponse {}
export type CreateAutoPredictorError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Amazon Forecast predictor.
 *
 * Amazon Forecast creates predictors with AutoPredictor, which involves applying the
 * optimal combination of algorithms to each time series in your datasets. You can use
 * CreateAutoPredictor to create new predictors or upgrade/retrain
 * existing predictors.
 *
 * **Creating new predictors**
 *
 * The following parameters are required when creating a new predictor:
 *
 * - `PredictorName` - A unique name for the predictor.
 *
 * - `DatasetGroupArn` - The ARN of the dataset group used to train the
 * predictor.
 *
 * - `ForecastFrequency` - The granularity of your forecasts (hourly,
 * daily, weekly, etc).
 *
 * - `ForecastHorizon` - The number of time-steps that the model
 * predicts. The forecast horizon is also called the prediction length.
 *
 * When creating a new predictor, do not specify a value for
 * `ReferencePredictorArn`.
 *
 * **Upgrading and retraining predictors**
 *
 * The following parameters are required when retraining or upgrading a predictor:
 *
 * - `PredictorName` - A unique name for the predictor.
 *
 * - `ReferencePredictorArn` - The ARN of the predictor to retrain or
 * upgrade.
 *
 * When upgrading or retraining a predictor, only specify values for the
 * `ReferencePredictorArn` and `PredictorName`.
 */
export const createAutoPredictor: API.OperationMethod<
  CreateAutoPredictorRequest,
  CreateAutoPredictorResponse,
  CreateAutoPredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PredictorName: 0,
      ForecastHorizon: 0,
      ForecastTypes: 0,
      ForecastDimensions: 0,
      ForecastFrequency: 0,
      DataConfig: {
        DatasetGroupArn: 0,
        AttributeConfigs: D.list({ AttributeName: 0, Transformations: 0 }),
        AdditionalDatasets: D.list({ Name: 0, Configuration: 0 }),
      },
      EncryptionConfig: i_EncryptionConfig,
      ReferencePredictorArn: 0,
      OptimizationMetric: 0,
      ExplainPredictor: 0,
      Tags: D.list(i_Tag),
      MonitorConfig: { MonitorName: 0 },
      TimeAlignmentBoundary: { Month: 0, DayOfMonth: 0, DayOfWeek: 0, Hour: 0 },
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoPredictor",
})) as any;

export type CreateDatasetError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates an Amazon Forecast dataset. The information about the dataset that you provide helps
 * Forecast understand how to consume the data for model training. This includes the
 * following:
 *
 * -
 * `DataFrequency`
 * - How frequently your historical
 * time-series data is collected.
 *
 * -
 * `Domain`
 * and
 *
 * `DatasetType`
 * - Each dataset has an associated dataset
 * domain and a type within the domain. Amazon Forecast provides a list of predefined domains and
 * types within each domain. For each unique dataset domain and type within the domain,
 * Amazon Forecast requires your data to include a minimum set of predefined fields.
 *
 * -
 * `Schema`
 * - A schema specifies the fields in the dataset,
 * including the field name and data type.
 *
 * After creating a dataset, you import your training data into it and add the dataset to a
 * dataset group. You use the dataset group to create a predictor. For more information, see
 * Importing datasets.
 *
 * To get a list of all your datasets, use the ListDatasets operation.
 *
 * For example Forecast datasets, see the Amazon Forecast Sample GitHub
 * repository.
 *
 * The `Status` of a dataset must be `ACTIVE` before you can import
 * training data. Use the DescribeDataset operation to get
 * the status.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatasetName: 0,
      Domain: 0,
      DatasetType: 0,
      DataFrequency: 0,
      Schema: i_Schema,
      EncryptionConfig: i_EncryptionConfig,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
})) as any;

export type CreateDatasetGroupError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a dataset group, which holds a collection of related datasets. You can add
 * datasets to the dataset group when you create the dataset group, or later by using the UpdateDatasetGroup operation.
 *
 * After creating a dataset group and adding datasets, you use the dataset group when you
 * create a predictor. For more information, see Dataset groups.
 *
 * To get a list of all your datasets groups, use the ListDatasetGroups
 * operation.
 *
 * The `Status` of a dataset group must be `ACTIVE` before you can
 * use the dataset group to create a predictor. To get the status, use the DescribeDatasetGroup operation.
 */
export const createDatasetGroup: API.OperationMethod<
  CreateDatasetGroupRequest,
  CreateDatasetGroupResponse,
  CreateDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatasetGroupName: 0,
      Domain: 0,
      DatasetArns: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetGroup",
})) as any;

export type CreateDatasetImportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports your training data to an Amazon Forecast dataset. You provide the location of your
 * training data in an Amazon Simple Storage Service (Amazon S3) bucket and the Amazon Resource Name (ARN) of the dataset
 * that you want to import the data to.
 *
 * You must specify a DataSource object that includes an
 * Identity and Access Management (IAM) role that Amazon Forecast can assume to access the data, as Amazon Forecast makes a copy
 * of your data and processes it in an internal Amazon Web Services system. For more information, see Set up
 * permissions.
 *
 * The training data must be in CSV or Parquet format. The delimiter must be a comma (,).
 *
 * You can specify the path to a specific file, the S3 bucket, or to a folder in the S3
 * bucket. For the latter two cases, Amazon Forecast imports all files up to the limit of 10,000
 * files.
 *
 * Because dataset imports are not aggregated, your most recent dataset import is the one
 * that is used when training a predictor or generating a forecast. Make sure that your most
 * recent dataset import contains all of the data you want to model off of, and not just the new
 * data collected since the previous import.
 *
 * To get a list of all your dataset import jobs, filtered by specified criteria, use the
 * ListDatasetImportJobs operation.
 */
export const createDatasetImportJob: API.OperationMethod<
  CreateDatasetImportJobRequest,
  CreateDatasetImportJobResponse,
  CreateDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatasetImportJobName: 0,
      DatasetArn: 0,
      DataSource: i_DataSource,
      TimestampFormat: 0,
      TimeZone: 0,
      UseGeolocationForTimeZone: 0,
      GeolocationFormat: 0,
      Tags: D.list(i_Tag),
      Format: 0,
      ImportMode: 0,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetImportJob",
})) as any;

export type CreateExplainabilityError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Explainability is only available for Forecasts and Predictors generated from an
 * AutoPredictor (CreateAutoPredictor)
 *
 * Creates an Amazon Forecast Explainability.
 *
 * Explainability helps you better understand how the attributes in your datasets impact
 * forecast. Amazon Forecast uses a metric called Impact scores to quantify the relative
 * impact of each attribute and determine whether they increase or decrease forecast
 * values.
 *
 * To enable Forecast Explainability, your predictor must include at least one of the
 * following: related time series, item metadata, or additional datasets like Holidays and
 * the Weather Index.
 *
 * CreateExplainability accepts either a Predictor ARN or Forecast ARN. To receive
 * aggregated Impact scores for all time series and time points in your datasets, provide a
 * Predictor ARN. To receive Impact scores for specific time series and time points,
 * provide a Forecast ARN.
 *
 * **CreateExplainability with a Predictor ARN**
 *
 * You can only have one Explainability resource per predictor. If you already
 * enabled `ExplainPredictor` in CreateAutoPredictor, that
 * predictor already has an Explainability resource.
 *
 * The following parameters are required when providing a Predictor ARN:
 *
 * - `ExplainabilityName` - A unique name for the Explainability.
 *
 * - `ResourceArn` - The Arn of the predictor.
 *
 * - `TimePointGranularity` - Must be set to “ALL”.
 *
 * - `TimeSeriesGranularity` - Must be set to “ALL”.
 *
 * Do not specify a value for the following parameters:
 *
 * - `DataSource` - Only valid when TimeSeriesGranularity is
 * “SPECIFIC”.
 *
 * - `Schema` - Only valid when TimeSeriesGranularity is
 * “SPECIFIC”.
 *
 * - `StartDateTime` - Only valid when TimePointGranularity is
 * “SPECIFIC”.
 *
 * - `EndDateTime` - Only valid when TimePointGranularity is
 * “SPECIFIC”.
 *
 * **CreateExplainability with a Forecast ARN**
 *
 * You can specify a maximum of 50 time series and 500 time points.
 *
 * The following parameters are required when providing a Predictor ARN:
 *
 * - `ExplainabilityName` - A unique name for the Explainability.
 *
 * - `ResourceArn` - The Arn of the forecast.
 *
 * - `TimePointGranularity` - Either “ALL” or “SPECIFIC”.
 *
 * - `TimeSeriesGranularity` - Either “ALL” or “SPECIFIC”.
 *
 * If you set TimeSeriesGranularity to “SPECIFIC”, you must also provide the
 * following:
 *
 * - `DataSource` - The S3 location of the CSV file specifying your time
 * series.
 *
 * - `Schema` - The Schema defines the attributes and attribute types
 * listed in the Data Source.
 *
 * If you set TimePointGranularity to “SPECIFIC”, you must also provide the
 * following:
 *
 * - `StartDateTime` - The first timestamp in the range of time
 * points.
 *
 * - `EndDateTime` - The last timestamp in the range of time
 * points.
 */
export const createExplainability: API.OperationMethod<
  CreateExplainabilityRequest,
  CreateExplainabilityResponse,
  CreateExplainabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ExplainabilityName: 0,
      ResourceArn: 0,
      ExplainabilityConfig: {
        TimeSeriesGranularity: 0,
        TimePointGranularity: 0,
      },
      DataSource: i_DataSource,
      Schema: i_Schema,
      EnableVisualization: 0,
      StartDateTime: 0,
      EndDateTime: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExplainability",
})) as any;

export type CreateExplainabilityExportError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports an Explainability resource created by the CreateExplainability operation. Exported files are exported to an Amazon Simple Storage Service (Amazon
 * S3) bucket.
 *
 * You must specify a DataDestination object that includes an Amazon S3
 * bucket and an Identity and Access Management (IAM) role that Amazon Forecast can assume to access the Amazon S3
 * bucket. For more information, see aws-forecast-iam-roles.
 *
 * The `Status` of the export job must be `ACTIVE` before you
 * can access the export in your Amazon S3 bucket. To get the status, use the DescribeExplainabilityExport operation.
 */
export const createExplainabilityExport: API.OperationMethod<
  CreateExplainabilityExportRequest,
  CreateExplainabilityExportResponse,
  CreateExplainabilityExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ExplainabilityExportName: 0,
      ExplainabilityArn: 0,
      Destination: i_DataDestination,
      Tags: D.list(i_Tag),
      Format: 0,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExplainabilityExport",
})) as any;

export type CreateForecastError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a forecast for each item in the `TARGET_TIME_SERIES` dataset that was
 * used to train the predictor. This is known as inference. To retrieve the forecast for a single
 * item at low latency, use the operation. To
 * export the complete forecast into your Amazon Simple Storage Service (Amazon S3) bucket, use the CreateForecastExportJob operation.
 *
 * The range of the forecast is determined by the `ForecastHorizon` value, which
 * you specify in the CreatePredictor request. When you query a forecast, you
 * can request a specific date range within the forecast.
 *
 * To get a list of all your forecasts, use the ListForecasts
 * operation.
 *
 * The forecasts generated by Amazon Forecast are in the same time zone as the dataset that was
 * used to create the predictor.
 *
 * For more information, see howitworks-forecast.
 *
 * The `Status` of the forecast must be `ACTIVE` before you can query
 * or export the forecast. Use the DescribeForecast operation to get the
 * status.
 *
 * By default, a forecast includes predictions for every item (`item_id`) in the dataset group that was used to train the predictor.
 * However, you can use the `TimeSeriesSelector` object to generate a forecast on a subset of time series. Forecast creation is skipped for any time series that you specify that are not in the input dataset. The forecast export file will not contain these time series or their forecasted values.
 */
export const createForecast: API.OperationMethod<
  CreateForecastRequest,
  CreateForecastResponse,
  CreateForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ForecastName: 0,
      PredictorArn: 0,
      ForecastTypes: 0,
      Tags: D.list(i_Tag),
      TimeSeriesSelector: i_TimeSeriesSelector,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateForecast",
})) as any;

export type CreateForecastExportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports a forecast created by the CreateForecast operation to your
 * Amazon Simple Storage Service (Amazon S3) bucket. The forecast file name will match the following conventions:
 *
 * __
 *
 * where the component is in Java SimpleDateFormat
 * (yyyy-MM-ddTHH-mm-ssZ).
 *
 * You must specify a DataDestination object that includes an Identity and Access Management
 * (IAM) role that Amazon Forecast can assume to access the Amazon S3 bucket. For more information, see
 * aws-forecast-iam-roles.
 *
 * For more information, see howitworks-forecast.
 *
 * To get a list of all your forecast export jobs, use the ListForecastExportJobs operation.
 *
 * The `Status` of the forecast export job must be `ACTIVE` before
 * you can access the forecast in your Amazon S3 bucket. To get the status, use the DescribeForecastExportJob operation.
 */
export const createForecastExportJob: API.OperationMethod<
  CreateForecastExportJobRequest,
  CreateForecastExportJobResponse,
  CreateForecastExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ForecastExportJobName: 0,
      ForecastArn: 0,
      Destination: i_DataDestination,
      Tags: D.list(i_Tag),
      Format: 0,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateForecastExportJob",
})) as any;

export type CreateMonitorError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a predictor monitor resource for an existing auto predictor. Predictor monitoring allows you to see how your predictor's performance changes over time.
 * For more information, see Predictor Monitoring.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorRequest,
  CreateMonitorResponse,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MonitorName: 0, ResourceArn: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
})) as any;

export type CreatePredictorError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation creates a legacy predictor that does not include all the predictor
 * functionalities provided by Amazon Forecast. To create a predictor that is compatible with all
 * aspects of Forecast, use CreateAutoPredictor.
 *
 * Creates an Amazon Forecast predictor.
 *
 * In the request, provide a dataset group and either specify an algorithm or let Amazon Forecast
 * choose an algorithm for you using AutoML. If you specify an algorithm, you also can override
 * algorithm-specific hyperparameters.
 *
 * Amazon Forecast uses the algorithm to train a predictor using the latest version of the datasets
 * in the specified dataset group. You can then generate a forecast using the CreateForecast operation.
 *
 * To see the evaluation metrics, use the GetAccuracyMetrics operation.
 *
 * You can specify a featurization configuration to fill and aggregate the data fields in the
 * `TARGET_TIME_SERIES` dataset to improve model training. For more information, see
 * FeaturizationConfig.
 *
 * For RELATED_TIME_SERIES datasets, `CreatePredictor` verifies that the
 * `DataFrequency` specified when the dataset was created matches the
 * `ForecastFrequency`. TARGET_TIME_SERIES datasets don't have this restriction.
 * Amazon Forecast also verifies the delimiter and timestamp format. For more information, see howitworks-datasets-groups.
 *
 * By default, predictors are trained and evaluated at the 0.1 (P10), 0.5 (P50), and 0.9
 * (P90) quantiles. You can choose custom forecast types to train and evaluate your predictor by
 * setting the `ForecastTypes`.
 *
 * **AutoML**
 *
 * If you want Amazon Forecast to evaluate each algorithm and choose the one that minimizes the
 * `objective function`, set `PerformAutoML` to `true`. The
 * `objective function` is defined as the mean of the weighted losses over the
 * forecast types. By default, these are the p10, p50, and p90 quantile losses. For more
 * information, see EvaluationResult.
 *
 * When AutoML is enabled, the following properties are disallowed:
 *
 * - `AlgorithmArn`
 *
 * - `HPOConfig`
 *
 * - `PerformHPO`
 *
 * - `TrainingParameters`
 *
 * To get a list of all of your predictors, use the ListPredictors
 * operation.
 *
 * Before you can use the predictor to create a forecast, the `Status` of the
 * predictor must be `ACTIVE`, signifying that training has completed. To get the
 * status, use the DescribePredictor operation.
 */
export const createPredictor: API.OperationMethod<
  CreatePredictorRequest,
  CreatePredictorResponse,
  CreatePredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PredictorName: 0,
      AlgorithmArn: 0,
      ForecastHorizon: 0,
      ForecastTypes: 0,
      PerformAutoML: 0,
      AutoMLOverrideStrategy: 0,
      PerformHPO: 0,
      TrainingParameters: 0,
      EvaluationParameters: {
        NumberOfBacktestWindows: 0,
        BackTestWindowOffset: 0,
      },
      HPOConfig: {
        ParameterRanges: {
          CategoricalParameterRanges: D.list({ Name: 0, Values: 0 }),
          ContinuousParameterRanges: D.list({
            Name: 0,
            MaxValue: 0,
            MinValue: 0,
            ScalingType: 0,
          }),
          IntegerParameterRanges: D.list({
            Name: 0,
            MaxValue: 0,
            MinValue: 0,
            ScalingType: 0,
          }),
        },
      },
      InputDataConfig: {
        DatasetGroupArn: 0,
        SupplementaryFeatures: D.list({ Name: 0, Value: 0 }),
      },
      FeaturizationConfig: {
        ForecastFrequency: 0,
        ForecastDimensions: 0,
        Featurizations: D.list({
          AttributeName: 0,
          FeaturizationPipeline: D.list({
            FeaturizationMethodName: 0,
            FeaturizationMethodParameters: 0,
          }),
        }),
      },
      EncryptionConfig: i_EncryptionConfig,
      Tags: D.list(i_Tag),
      OptimizationMetric: 0,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePredictor",
})) as any;

export type CreatePredictorBacktestExportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports backtest forecasts and accuracy metrics generated by the CreateAutoPredictor or CreatePredictor operations. Two
 * folders containing CSV or Parquet files are exported to your specified S3 bucket.
 *
 * The export file names will match the following conventions:
 *
 * `__.csv`
 *
 * The component is in Java SimpleDate format
 * (yyyy-MM-ddTHH-mm-ssZ).
 *
 * You must specify a DataDestination object that includes an Amazon S3
 * bucket and an Identity and Access Management (IAM) role that Amazon Forecast can assume to access the Amazon S3
 * bucket. For more information, see aws-forecast-iam-roles.
 *
 * The `Status` of the export job must be `ACTIVE` before you
 * can access the export in your Amazon S3 bucket. To get the status, use the DescribePredictorBacktestExportJob operation.
 */
export const createPredictorBacktestExportJob: API.OperationMethod<
  CreatePredictorBacktestExportJobRequest,
  CreatePredictorBacktestExportJobResponse,
  CreatePredictorBacktestExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PredictorBacktestExportJobName: 0,
      PredictorArn: 0,
      Destination: i_DataDestination,
      Tags: D.list(i_Tag),
      Format: 0,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePredictorBacktestExportJob",
})) as any;

export type CreateWhatIfAnalysisError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * What-if analysis is a scenario modeling technique where you make a hypothetical change to a time series and
 * compare the forecasts generated by these changes against the baseline, unchanged time series. It is important to
 * remember that the purpose of a what-if analysis is to understand how a forecast can change given different
 * modifications to the baseline time series.
 *
 * For example, imagine you are a clothing retailer who is considering an end of season sale
 * to clear space for new styles. After creating a baseline forecast, you can use a what-if
 * analysis to investigate how different sales tactics might affect your goals.
 *
 * You could create a scenario where everything is given a 25% markdown, and another where
 * everything is given a fixed dollar markdown. You could create a scenario where the sale lasts for one week and
 * another where the sale lasts for one month.
 * With a what-if analysis, you can compare many different scenarios against each other.
 *
 * Note that a what-if analysis is meant to display what the forecasting model has learned and how it will behave in the scenarios that you are evaluating. Do not blindly use the results of the what-if analysis to make business decisions. For instance, forecasts might not be accurate for novel scenarios where there is no reference available to determine whether a forecast is good.
 *
 * The TimeSeriesSelector object defines the items that you want in the what-if analysis.
 */
export const createWhatIfAnalysis: API.OperationMethod<
  CreateWhatIfAnalysisRequest,
  CreateWhatIfAnalysisResponse,
  CreateWhatIfAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WhatIfAnalysisName: 0,
      ForecastArn: 0,
      TimeSeriesSelector: i_TimeSeriesSelector,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatIfAnalysis",
})) as any;

export type CreateWhatIfForecastError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * A what-if forecast is a forecast that is created from a modified version of the baseline forecast. Each
 * what-if forecast incorporates either a replacement dataset or a set of transformations to the original dataset.
 */
export const createWhatIfForecast: API.OperationMethod<
  CreateWhatIfForecastRequest,
  CreateWhatIfForecastResponse,
  CreateWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WhatIfForecastName: 0,
      WhatIfAnalysisArn: 0,
      TimeSeriesTransformations: D.list({
        Action: { AttributeName: 0, Operation: 0, Value: 0 },
        TimeSeriesConditions: D.list({
          AttributeName: 0,
          AttributeValue: 0,
          Condition: 0,
        }),
      }),
      TimeSeriesReplacementsDataSource: {
        S3Config: i_S3Config,
        Schema: i_Schema,
        Format: 0,
        TimestampFormat: 0,
      },
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatIfForecast",
})) as any;

export type CreateWhatIfForecastExportError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports a forecast created by the CreateWhatIfForecast operation to your
 * Amazon Simple Storage Service (Amazon S3) bucket. The forecast file name will match the following conventions:
 *
 * `≈__`
 *
 * The component is in Java SimpleDateFormat
 * (yyyy-MM-ddTHH-mm-ssZ).
 *
 * You must specify a DataDestination object that includes an Identity and Access Management
 * (IAM) role that Amazon Forecast can assume to access the Amazon S3 bucket. For more information, see
 * aws-forecast-iam-roles.
 *
 * For more information, see howitworks-forecast.
 *
 * To get a list of all your what-if forecast export jobs, use the ListWhatIfForecastExports
 * operation.
 *
 * The `Status` of the forecast export job must be `ACTIVE` before
 * you can access the forecast in your Amazon S3 bucket. To get the status, use the DescribeWhatIfForecastExport operation.
 */
export const createWhatIfForecastExport: API.OperationMethod<
  CreateWhatIfForecastExportRequest,
  CreateWhatIfForecastExportResponse,
  CreateWhatIfForecastExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      WhatIfForecastExportName: 0,
      WhatIfForecastArns: 0,
      Destination: i_DataDestination,
      Tags: D.list(i_Tag),
      Format: 0,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatIfForecastExport",
})) as any;

export type DeleteDatasetError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Amazon Forecast dataset that was created using the CreateDataset operation. You can
 * only delete datasets that have a status of `ACTIVE` or `CREATE_FAILED`.
 * To get the status use the DescribeDataset operation.
 *
 * Forecast does not automatically update any dataset groups that contain the deleted dataset.
 * In order to update the dataset group, use the UpdateDatasetGroup operation,
 * omitting the deleted dataset's ARN.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatasetArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
})) as any;

export type DeleteDatasetGroupError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataset group created using the CreateDatasetGroup operation.
 * You can only delete dataset groups that have a status of `ACTIVE`,
 * `CREATE_FAILED`, or `UPDATE_FAILED`. To get the status, use the DescribeDatasetGroup operation.
 *
 * This operation deletes only the dataset group, not the datasets in the group.
 */
export const deleteDatasetGroup: API.OperationMethod<
  DeleteDatasetGroupRequest,
  DeleteDatasetGroupResponse,
  DeleteDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatasetGroupArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetGroup",
})) as any;

export type DeleteDatasetImportJobError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataset import job created using the CreateDatasetImportJob
 * operation. You can delete only dataset import jobs that have a status of `ACTIVE`
 * or `CREATE_FAILED`. To get the status, use the DescribeDatasetImportJob
 * operation.
 */
export const deleteDatasetImportJob: API.OperationMethod<
  DeleteDatasetImportJobRequest,
  DeleteDatasetImportJobResponse,
  DeleteDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatasetImportJobArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetImportJob",
})) as any;

export type DeleteExplainabilityError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Explainability resource.
 *
 * You can delete only predictor that have a status of `ACTIVE` or
 * `CREATE_FAILED`. To get the status, use the DescribeExplainability operation.
 */
export const deleteExplainability: API.OperationMethod<
  DeleteExplainabilityRequest,
  DeleteExplainabilityResponse,
  DeleteExplainabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ExplainabilityArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExplainability",
})) as any;

export type DeleteExplainabilityExportError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Explainability export.
 */
export const deleteExplainabilityExport: API.OperationMethod<
  DeleteExplainabilityExportRequest,
  DeleteExplainabilityExportResponse,
  DeleteExplainabilityExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ExplainabilityExportArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExplainabilityExport",
})) as any;

export type DeleteForecastError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a forecast created using the CreateForecast operation. You can
 * delete only forecasts that have a status of `ACTIVE` or `CREATE_FAILED`.
 * To get the status, use the DescribeForecast operation.
 *
 * You can't delete a forecast while it is being exported. After a forecast is deleted, you
 * can no longer query the forecast.
 */
export const deleteForecast: API.OperationMethod<
  DeleteForecastRequest,
  DeleteForecastResponse,
  DeleteForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ForecastArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteForecast",
})) as any;

export type DeleteForecastExportJobError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a forecast export job created using the CreateForecastExportJob
 * operation. You can delete only export jobs that have a status of `ACTIVE` or
 * `CREATE_FAILED`. To get the status, use the DescribeForecastExportJob operation.
 */
export const deleteForecastExportJob: API.OperationMethod<
  DeleteForecastExportJobRequest,
  DeleteForecastExportJobResponse,
  DeleteForecastExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ForecastExportJobArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteForecastExportJob",
})) as any;

export type DeleteMonitorError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a monitor resource. You can only delete a monitor resource with a status of `ACTIVE`, `ACTIVE_STOPPED`, `CREATE_FAILED`, or `CREATE_STOPPED`.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorRequest,
  DeleteMonitorResponse,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MonitorArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitor",
})) as any;

export type DeletePredictorError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a predictor created using the DescribePredictor or CreatePredictor operations. You can delete only predictor that have a status of
 * `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribePredictor operation.
 */
export const deletePredictor: API.OperationMethod<
  DeletePredictorRequest,
  DeletePredictorResponse,
  DeletePredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PredictorArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePredictor",
})) as any;

export type DeletePredictorBacktestExportJobError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a predictor backtest export job.
 */
export const deletePredictorBacktestExportJob: API.OperationMethod<
  DeletePredictorBacktestExportJobRequest,
  DeletePredictorBacktestExportJobResponse,
  DeletePredictorBacktestExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PredictorBacktestExportJobArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePredictorBacktestExportJob",
})) as any;

export type DeleteResourceTreeError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an entire resource tree. This operation will delete the parent resource and
 * its child resources.
 *
 * Child resources are resources that were created from another resource. For example,
 * when a forecast is generated from a predictor, the forecast is the child resource and
 * the predictor is the parent resource.
 *
 * Amazon Forecast resources possess the following parent-child resource hierarchies:
 *
 * - **Dataset**: dataset import jobs
 *
 * - **Dataset Group**: predictors, predictor backtest
 * export jobs, forecasts, forecast export jobs
 *
 * - **Predictor**: predictor backtest export jobs,
 * forecasts, forecast export jobs
 *
 * - **Forecast**: forecast export jobs
 *
 * `DeleteResourceTree` will only delete Amazon Forecast resources, and will not
 * delete datasets or exported files stored in Amazon S3.
 */
export const deleteResourceTree: API.OperationMethod<
  DeleteResourceTreeRequest,
  DeleteResourceTreeResponse,
  DeleteResourceTreeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceTree",
})) as any;

export type DeleteWhatIfAnalysisError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a what-if analysis created using the CreateWhatIfAnalysis
 * operation. You can delete only what-if analyses that have a status of `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribeWhatIfAnalysis operation.
 *
 * You can't delete a what-if analysis while any of its forecasts are being exported.
 */
export const deleteWhatIfAnalysis: API.OperationMethod<
  DeleteWhatIfAnalysisRequest,
  DeleteWhatIfAnalysisResponse,
  DeleteWhatIfAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WhatIfAnalysisArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatIfAnalysis",
})) as any;

export type DeleteWhatIfForecastError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a what-if forecast created using the CreateWhatIfForecast
 * operation. You can delete only what-if forecasts that have a status of `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribeWhatIfForecast operation.
 *
 * You can't delete a what-if forecast while it is being exported. After a what-if forecast is deleted, you can no longer query the what-if analysis.
 */
export const deleteWhatIfForecast: API.OperationMethod<
  DeleteWhatIfForecastRequest,
  DeleteWhatIfForecastResponse,
  DeleteWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WhatIfForecastArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatIfForecast",
})) as any;

export type DeleteWhatIfForecastExportError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a what-if forecast export created using the CreateWhatIfForecastExport
 * operation. You can delete only what-if forecast exports that have a status of `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribeWhatIfForecastExport operation.
 */
export const deleteWhatIfForecastExport: API.OperationMethod<
  DeleteWhatIfForecastExportRequest,
  DeleteWhatIfForecastExportResponse,
  DeleteWhatIfForecastExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { WhatIfForecastExportArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatIfForecastExport",
})) as any;

export type DescribeAutoPredictorError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a predictor created using the CreateAutoPredictor operation.
 */
export const describeAutoPredictor: API.OperationMethod<
  DescribeAutoPredictorRequest,
  DescribeAutoPredictorResponse,
  DescribeAutoPredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PredictorArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoPredictor",
})) as any;

export type DescribeDatasetError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an Amazon Forecast dataset created using the CreateDataset operation.
 *
 * In addition to listing the parameters specified in the `CreateDataset` request,
 * this operation includes the following dataset properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatasetArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
})) as any;

export type DescribeDatasetGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a dataset group created using the CreateDatasetGroup
 * operation.
 *
 * In addition to listing the parameters provided in the `CreateDatasetGroup`
 * request, this operation includes the following properties:
 *
 * - `DatasetArns` - The datasets belonging to the group.
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 */
export const describeDatasetGroup: API.OperationMethod<
  DescribeDatasetGroupRequest,
  DescribeDatasetGroupResponse,
  DescribeDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatasetGroupArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetGroup",
})) as any;

export type DescribeDatasetImportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a dataset import job created using the CreateDatasetImportJob
 * operation.
 *
 * In addition to listing the parameters provided in the `CreateDatasetImportJob`
 * request, this operation includes the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `DataSize`
 *
 * - `FieldStatistics`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describeDatasetImportJob: API.OperationMethod<
  DescribeDatasetImportJobRequest,
  DescribeDatasetImportJobResponse,
  DescribeDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatasetImportJobArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetImportJob",
})) as any;

export type DescribeExplainabilityError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an Explainability resource created using the CreateExplainability operation.
 */
export const describeExplainability: API.OperationMethod<
  DescribeExplainabilityRequest,
  DescribeExplainabilityResponse,
  DescribeExplainabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExplainabilityArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExplainability",
})) as any;

export type DescribeExplainabilityExportError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an Explainability export created using the CreateExplainabilityExport operation.
 */
export const describeExplainabilityExport: API.OperationMethod<
  DescribeExplainabilityExportRequest,
  DescribeExplainabilityExportResponse,
  DescribeExplainabilityExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ExplainabilityExportArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExplainabilityExport",
})) as any;

export type DescribeForecastError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a forecast created using the CreateForecast operation.
 *
 * In addition to listing the properties provided in the `CreateForecast` request,
 * this operation lists the following properties:
 *
 * - `DatasetGroupArn` - The dataset group that provided the training
 * data.
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describeForecast: API.OperationMethod<
  DescribeForecastRequest,
  DescribeForecastResponse,
  DescribeForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ForecastArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeForecast",
})) as any;

export type DescribeForecastExportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a forecast export job created using the CreateForecastExportJob operation.
 *
 * In addition to listing the properties provided by the user in the
 * `CreateForecastExportJob` request, this operation lists the following
 * properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describeForecastExportJob: API.OperationMethod<
  DescribeForecastExportJobRequest,
  DescribeForecastExportJobResponse,
  DescribeForecastExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ForecastExportJobArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeForecastExportJob",
})) as any;

export type DescribeMonitorError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a monitor resource. In addition to listing the properties provided in the CreateMonitor request, this operation lists the following properties:
 *
 * - `Baseline`
 *
 * - `CreationTime`
 *
 * - `LastEvaluationTime`
 *
 * - `LastEvaluationState`
 *
 * - `LastModificationTime`
 *
 * - `Message`
 *
 * - `Status`
 */
export const describeMonitor: API.OperationMethod<
  DescribeMonitorRequest,
  DescribeMonitorResponse,
  DescribeMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MonitorArn: 0 },
    output: {
      LastEvaluationTime: D.ts,
      CreationTime: D.ts,
      LastModificationTime: D.ts,
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMonitor",
})) as any;

export type DescribePredictorError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation is only valid for legacy predictors created with CreatePredictor. If you
 * are not using a legacy predictor, use DescribeAutoPredictor.
 *
 * Describes a predictor created using the CreatePredictor
 * operation.
 *
 * In addition to listing the properties provided in the `CreatePredictor`
 * request, this operation lists the following properties:
 *
 * - `DatasetImportJobArns` - The dataset import jobs used to import training
 * data.
 *
 * - `AutoMLAlgorithmArns` - If AutoML is performed, the algorithms that were
 * evaluated.
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describePredictor: API.OperationMethod<
  DescribePredictorRequest,
  DescribePredictorResponse,
  DescribePredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PredictorArn: 0 },
    output: {
      PredictorExecutionDetails: {
        PredictorExecutions: D.list({
          TestWindows: D.list({ TestWindowStart: D.ts, TestWindowEnd: D.ts }),
        }),
      },
      CreationTime: D.ts,
      LastModificationTime: D.ts,
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePredictor",
})) as any;

export type DescribePredictorBacktestExportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a predictor backtest export job created using the CreatePredictorBacktestExportJob operation.
 *
 * In addition to listing the properties provided by the user in the
 * `CreatePredictorBacktestExportJob` request, this operation lists the
 * following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` (if an error occurred)
 */
export const describePredictorBacktestExportJob: API.OperationMethod<
  DescribePredictorBacktestExportJobRequest,
  DescribePredictorBacktestExportJobResponse,
  DescribePredictorBacktestExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PredictorBacktestExportJobArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePredictorBacktestExportJob",
})) as any;

export type DescribeWhatIfAnalysisError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the what-if analysis created using the CreateWhatIfAnalysis operation.
 *
 * In addition to listing the properties provided in the `CreateWhatIfAnalysis` request, this operation lists the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Message` - If an error occurred, information about the error.
 *
 * - `Status`
 */
export const describeWhatIfAnalysis: API.OperationMethod<
  DescribeWhatIfAnalysisRequest,
  DescribeWhatIfAnalysisResponse,
  DescribeWhatIfAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WhatIfAnalysisArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWhatIfAnalysis",
})) as any;

export type DescribeWhatIfForecastError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the what-if forecast created using the CreateWhatIfForecast operation.
 *
 * In addition to listing the properties provided in the `CreateWhatIfForecast` request, this operation lists the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Message` - If an error occurred, information about the error.
 *
 * - `Status`
 */
export const describeWhatIfForecast: API.OperationMethod<
  DescribeWhatIfForecastRequest,
  DescribeWhatIfForecastResponse,
  DescribeWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WhatIfForecastArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWhatIfForecast",
})) as any;

export type DescribeWhatIfForecastExportError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the what-if forecast export created using the CreateWhatIfForecastExport operation.
 *
 * In addition to listing the properties provided in the `CreateWhatIfForecastExport` request, this operation lists the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Message` - If an error occurred, information about the error.
 *
 * - `Status`
 */
export const describeWhatIfForecastExport: API.OperationMethod<
  DescribeWhatIfForecastExportRequest,
  DescribeWhatIfForecastExportResponse,
  DescribeWhatIfForecastExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { WhatIfForecastExportArn: 0 },
    output: { CreationTime: D.ts, LastModificationTime: D.ts },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWhatIfForecastExport",
})) as any;

export type GetAccuracyMetricsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides metrics on the accuracy of the models that were trained by the CreatePredictor operation. Use metrics to see how well the model performed and
 * to decide whether to use the predictor to generate a forecast. For more information, see
 * Predictor
 * Metrics.
 *
 * This operation generates metrics for each backtest window that was evaluated. The number
 * of backtest windows (`NumberOfBacktestWindows`) is specified using the EvaluationParameters object, which is optionally included in the
 * `CreatePredictor` request. If `NumberOfBacktestWindows` isn't
 * specified, the number defaults to one.
 *
 * The parameters of the `filling` method determine which items contribute to the
 * metrics. If you want all items to contribute, specify `zero`. If you want only
 * those items that have complete data in the range being evaluated to contribute, specify
 * `nan`. For more information, see FeaturizationMethod.
 *
 * Before you can get accuracy metrics, the `Status` of the predictor must be
 * `ACTIVE`, signifying that training has completed. To get the status, use the
 * DescribePredictor operation.
 */
export const getAccuracyMetrics: API.OperationMethod<
  GetAccuracyMetricsRequest,
  GetAccuracyMetricsResponse,
  GetAccuracyMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PredictorArn: 0 },
    output: {
      PredictorEvaluationResults: D.list({
        TestWindows: D.list({ TestWindowStart: D.ts, TestWindowEnd: D.ts }),
      }),
    },
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccuracyMetrics",
})) as any;

export type ListDatasetGroupsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns a list of dataset groups created using the CreateDatasetGroup operation.
 * For each dataset group, this operation returns a summary of its properties, including its
 * Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the
 * dataset group ARN with the DescribeDatasetGroup
 * operation.
 */
export const listDatasetGroups: API.PaginatedOperationMethod<
  ListDatasetGroupsRequest,
  ListDatasetGroupsResponse,
  ListDatasetGroupsError,
  Credentials | HttpClient.HttpClient,
  DatasetGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      DatasetGroups: D.list({ CreationTime: D.ts, LastModificationTime: D.ts }),
    },
  },
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetImportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of dataset import jobs created using the CreateDatasetImportJob
 * operation. For each import job, this operation returns a summary of its properties, including
 * its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the
 * ARN with the DescribeDatasetImportJob
 * operation. You can filter the list by providing an array of Filter objects.
 */
export const listDatasetImportJobs: API.PaginatedOperationMethod<
  ListDatasetImportJobsRequest,
  ListDatasetImportJobsResponse,
  ListDatasetImportJobsError,
  Credentials | HttpClient.HttpClient,
  DatasetImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      DatasetImportJobs: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetImportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns a list of datasets created using the CreateDataset operation. For each
 * dataset, a summary of its properties, including its Amazon Resource Name (ARN), is returned.
 * To retrieve the complete set of properties, use the ARN with the DescribeDataset operation.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  DatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      Datasets: D.list({ CreationTime: D.ts, LastModificationTime: D.ts }),
    },
  },
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Datasets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExplainabilitiesError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of Explainability resources created using the CreateExplainability operation. This operation returns a summary for
 * each Explainability. You can filter the list using an array of Filter
 * objects.
 *
 * To retrieve the complete set of properties for a particular Explainability resource,
 * use the ARN with the DescribeExplainability operation.
 */
export const listExplainabilities: API.PaginatedOperationMethod<
  ListExplainabilitiesRequest,
  ListExplainabilitiesResponse,
  ListExplainabilitiesError,
  Credentials | HttpClient.HttpClient,
  ExplainabilitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      Explainabilities: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExplainabilities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Explainabilities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExplainabilityExportsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of Explainability exports created using the CreateExplainabilityExport operation. This operation returns a summary
 * for each Explainability export. You can filter the list using an array of Filter objects.
 *
 * To retrieve the complete set of properties for a particular Explainability export, use
 * the ARN with the DescribeExplainability operation.
 */
export const listExplainabilityExports: API.PaginatedOperationMethod<
  ListExplainabilityExportsRequest,
  ListExplainabilityExportsResponse,
  ListExplainabilityExportsError,
  Credentials | HttpClient.HttpClient,
  ExplainabilityExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      ExplainabilityExports: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExplainabilityExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExplainabilityExports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListForecastExportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of forecast export jobs created using the CreateForecastExportJob operation. For each forecast export job, this operation
 * returns a summary of its properties, including its Amazon Resource Name (ARN). To retrieve the
 * complete set of properties, use the ARN with the DescribeForecastExportJob
 * operation. You can filter the list using an array of Filter objects.
 */
export const listForecastExportJobs: API.PaginatedOperationMethod<
  ListForecastExportJobsRequest,
  ListForecastExportJobsResponse,
  ListForecastExportJobsError,
  Credentials | HttpClient.HttpClient,
  ForecastExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      ForecastExportJobs: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListForecastExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ForecastExportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListForecastsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of forecasts created using the CreateForecast operation.
 * For each forecast, this operation returns a summary of its properties, including its Amazon
 * Resource Name (ARN). To retrieve the complete set of properties, specify the ARN with the
 * DescribeForecast operation. You can filter the list using an array of
 * Filter objects.
 */
export const listForecasts: API.PaginatedOperationMethod<
  ListForecastsRequest,
  ListForecastsResponse,
  ListForecastsError,
  Credentials | HttpClient.HttpClient,
  ForecastSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      Forecasts: D.list({ CreationTime: D.ts, LastModificationTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListForecasts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Forecasts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitorEvaluationsError =
  | InvalidInputException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of the monitoring evaluation results and predictor events collected by
 * the monitor resource during different windows of time.
 *
 * For information about monitoring see predictor-monitoring. For
 * more information about retrieving monitoring results see Viewing Monitoring Results.
 */
export const listMonitorEvaluations: API.PaginatedOperationMethod<
  ListMonitorEvaluationsRequest,
  ListMonitorEvaluationsResponse,
  ListMonitorEvaluationsError,
  Credentials | HttpClient.HttpClient,
  PredictorMonitorEvaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      MonitorArn: 0,
      Filters: D.list(i_Filter),
    },
    output: {
      PredictorMonitorEvaluations: D.list({
        EvaluationTime: D.ts,
        WindowStartDatetime: D.ts,
        WindowEndDatetime: D.ts,
        PredictorEvent: { Datetime: D.ts },
      }),
    },
  },
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitorEvaluations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PredictorMonitorEvaluations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitorsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of monitors created with the CreateMonitor operation and CreateAutoPredictor operation. For each monitor resource, this operation returns of a summary of its properties, including its Amazon Resource Name (ARN). You
 * can retrieve a complete set of properties of a monitor resource by specify the monitor's ARN in the DescribeMonitor operation.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsRequest,
  ListMonitorsResponse,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  MonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      Monitors: D.list({ CreationTime: D.ts, LastModificationTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Monitors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPredictorBacktestExportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of predictor backtest export jobs created using the CreatePredictorBacktestExportJob operation. This operation returns a
 * summary for each backtest export job. You can filter the list using an array of Filter objects.
 *
 * To retrieve the complete set of properties for a particular backtest export job, use
 * the ARN with the DescribePredictorBacktestExportJob operation.
 */
export const listPredictorBacktestExportJobs: API.PaginatedOperationMethod<
  ListPredictorBacktestExportJobsRequest,
  ListPredictorBacktestExportJobsResponse,
  ListPredictorBacktestExportJobsError,
  Credentials | HttpClient.HttpClient,
  PredictorBacktestExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      PredictorBacktestExportJobs: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPredictorBacktestExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PredictorBacktestExportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPredictorsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of predictors created using the CreateAutoPredictor or
 * CreatePredictor operations. For each predictor, this operation returns a
 * summary of its properties, including its Amazon Resource Name (ARN).
 *
 * You can retrieve the complete set of properties by using the ARN with the DescribeAutoPredictor and DescribePredictor operations. You
 * can filter the list using an array of Filter objects.
 */
export const listPredictors: API.PaginatedOperationMethod<
  ListPredictorsRequest,
  ListPredictorsResponse,
  ListPredictorsError,
  Credentials | HttpClient.HttpClient,
  PredictorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      Predictors: D.list({ CreationTime: D.ts, LastModificationTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPredictors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Predictors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags for an Amazon Forecast resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0 },
    output: { Tags: D.list({ Key: D.secret, Value: D.secret }) },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListWhatIfAnalysesError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of what-if analyses created using the CreateWhatIfAnalysis operation. For each what-if analysis, this operation returns a summary of its properties, including its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the what-if analysis ARN with the DescribeWhatIfAnalysis operation.
 */
export const listWhatIfAnalyses: API.PaginatedOperationMethod<
  ListWhatIfAnalysesRequest,
  ListWhatIfAnalysesResponse,
  ListWhatIfAnalysesError,
  Credentials | HttpClient.HttpClient,
  WhatIfAnalysisSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      WhatIfAnalyses: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatIfAnalyses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WhatIfAnalyses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWhatIfForecastExportsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of what-if forecast exports created using the CreateWhatIfForecastExport operation. For each what-if forecast export, this operation returns a summary of its properties, including its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the what-if forecast export ARN with the DescribeWhatIfForecastExport operation.
 */
export const listWhatIfForecastExports: API.PaginatedOperationMethod<
  ListWhatIfForecastExportsRequest,
  ListWhatIfForecastExportsResponse,
  ListWhatIfForecastExportsError,
  Credentials | HttpClient.HttpClient,
  WhatIfForecastExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      WhatIfForecastExports: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatIfForecastExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WhatIfForecastExports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWhatIfForecastsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of what-if forecasts created using the CreateWhatIfForecast operation. For each what-if forecast, this operation returns a summary of its properties, including its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the what-if forecast ARN with the DescribeWhatIfForecast operation.
 */
export const listWhatIfForecasts: API.PaginatedOperationMethod<
  ListWhatIfForecastsRequest,
  ListWhatIfForecastsResponse,
  ListWhatIfForecastsError,
  Credentials | HttpClient.HttpClient,
  WhatIfForecastSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, Filters: D.list(i_Filter) },
    output: {
      WhatIfForecasts: D.list({
        CreationTime: D.ts,
        LastModificationTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatIfForecasts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WhatIfForecasts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ResumeResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Resumes a stopped monitor resource.
 */
export const resumeResource: API.OperationMethod<
  ResumeResourceRequest,
  ResumeResourceResponse,
  ResumeResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeResource",
})) as any;

export type StopResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a resource.
 *
 * The resource undergoes the following states: `CREATE_STOPPING` and
 * `CREATE_STOPPED`. You cannot resume a resource once it has been
 * stopped.
 *
 * This operation can be applied to the following resources (and their corresponding child
 * resources):
 *
 * - Dataset Import Job
 *
 * - Predictor Job
 *
 * - Forecast Job
 *
 * - Forecast Export Job
 *
 * - Predictor Backtest Export Job
 *
 * - Explainability Job
 *
 * - Explainability Export Job
 */
export const stopResource: API.OperationMethod<
  StopResourceRequest,
  StopResourceResponse,
  StopResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopResource",
})) as any;

export type TagResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource are not specified in the request parameters, they are not
 * changed. When a resource is deleted, the tags associated with that resource are also
 * deleted.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDatasetGroupError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Replaces the datasets in a dataset group with the specified datasets.
 *
 * The `Status` of the dataset group must be `ACTIVE` before you can
 * use the dataset group to create a predictor. Use the DescribeDatasetGroup
 * operation to get the status.
 */
export const updateDatasetGroup: API.OperationMethod<
  UpdateDatasetGroupRequest,
  UpdateDatasetGroupResponse,
  UpdateDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatasetGroupArn: 0, DatasetArns: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatasetGroup",
})) as any;

const i_DataDestination: D.LazyStruct = () => ({ S3Config: i_S3Config });
const i_DataSource: D.LazyStruct = () => ({ S3Config: i_S3Config });
const i_EncryptionConfig: D.LazyStruct = () => ({ RoleArn: 0, KMSKeyArn: 0 });
const i_Filter: D.LazyStruct = () => ({ Key: 0, Value: 0, Condition: 0 });
const i_S3Config: D.LazyStruct = () => ({ Path: 0, RoleArn: 0, KMSKeyArn: 0 });
const i_Schema: D.LazyStruct = () => ({
  Attributes: D.list({ AttributeName: 0, AttributeType: 0 }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TimeSeriesSelector: D.LazyStruct = () => ({
  TimeSeriesIdentifiers: {
    DataSource: i_DataSource,
    Schema: i_Schema,
    Format: 0,
  },
});
