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
  sdkId: "Personalize",
  target: "AmazonPersonalize",
  version: "2018-05-22",
  sigv4: "personalize",
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
                `https://personalize-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://personalize-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://personalize.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://personalize.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class TooManyTagKeysException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagKeysException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type Name = string;
export type Arn = string;
export type NumBatchResults = number;
export type S3Location = string;
export type KmsKeyArn = string;
export interface S3DataConfig {
  path: string;
  kmsKeyArn?: string;
}
export interface BatchInferenceJobInput {
  s3DataSource: S3DataConfig;
}
export interface BatchInferenceJobOutput {
  s3DataDestination: S3DataConfig;
}
export type RoleArn = string;
export type ParameterName = string;
export type ParameterValue = string;
export type HyperParameters = { [key: string]: string | undefined };
export type RankingInfluenceType = "POPULARITY" | "FRESHNESS" | (string & {});
export type RankingInfluenceWeight = number;
export type RankingInfluence = { [key in RankingInfluenceType]?: number };
export interface BatchInferenceJobConfig {
  itemExplorationConfig?: { [key: string]: string | undefined };
  rankingInfluence?: { [key: string]: number | undefined };
}
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  tagKey: string | redacted.Redacted<string>;
  tagValue: string | redacted.Redacted<string>;
}
export type Tags = Tag[];
export type BatchInferenceJobMode =
  | "BATCH_INFERENCE"
  | "THEME_GENERATION"
  | (string & {});
export type ColumnName = string;
export interface FieldsForThemeGeneration {
  itemName: string;
}
export interface ThemeGenerationConfig {
  fieldsForThemeGeneration: FieldsForThemeGeneration;
}
export interface CreateBatchInferenceJobRequest {
  jobName: string;
  solutionVersionArn: string;
  filterArn?: string;
  numResults?: number;
  jobInput: BatchInferenceJobInput;
  jobOutput: BatchInferenceJobOutput;
  roleArn: string;
  batchInferenceJobConfig?: BatchInferenceJobConfig;
  tags?: Tag[];
  batchInferenceJobMode?: BatchInferenceJobMode;
  themeGenerationConfig?: ThemeGenerationConfig;
}
export interface CreateBatchInferenceJobResponse {
  batchInferenceJobArn?: string;
}
export interface BatchSegmentJobInput {
  s3DataSource: S3DataConfig;
}
export interface BatchSegmentJobOutput {
  s3DataDestination: S3DataConfig;
}
export interface CreateBatchSegmentJobRequest {
  jobName: string;
  solutionVersionArn: string;
  filterArn?: string;
  numResults?: number;
  jobInput: BatchSegmentJobInput;
  jobOutput: BatchSegmentJobOutput;
  roleArn: string;
  tags?: Tag[];
}
export interface CreateBatchSegmentJobResponse {
  batchSegmentJobArn?: string;
}
export type TransactionsPerSecond = number;
export interface CampaignConfig {
  itemExplorationConfig?: { [key: string]: string | undefined };
  enableMetadataWithRecommendations?: boolean;
  syncWithLatestSolutionVersion?: boolean;
  rankingInfluence?: { [key: string]: number | undefined };
}
export interface CreateCampaignRequest {
  name: string;
  solutionVersionArn: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
  tags?: Tag[];
}
export interface CreateCampaignResponse {
  campaignArn?: string;
}
export interface DataSource {
  dataLocation?: string;
}
export interface CreateDataDeletionJobRequest {
  jobName: string;
  datasetGroupArn: string;
  dataSource: DataSource;
  roleArn: string;
  tags?: Tag[];
}
export interface CreateDataDeletionJobResponse {
  dataDeletionJobArn?: string;
}
export type DatasetType = string;
export interface CreateDatasetRequest {
  name: string;
  schemaArn: string;
  datasetGroupArn: string;
  datasetType: string;
  tags?: Tag[];
}
export interface CreateDatasetResponse {
  datasetArn?: string;
}
export type IngestionMode = "BULK" | "PUT" | "ALL" | (string & {});
export interface DatasetExportJobOutput {
  s3DataDestination: S3DataConfig;
}
export interface CreateDatasetExportJobRequest {
  jobName: string;
  datasetArn: string;
  ingestionMode?: IngestionMode;
  roleArn: string;
  jobOutput: DatasetExportJobOutput;
  tags?: Tag[];
}
export interface CreateDatasetExportJobResponse {
  datasetExportJobArn?: string;
}
export type Domain = "ECOMMERCE" | "VIDEO_ON_DEMAND" | (string & {});
export interface CreateDatasetGroupRequest {
  name: string;
  roleArn?: string;
  kmsKeyArn?: string;
  domain?: Domain;
  tags?: Tag[];
}
export interface CreateDatasetGroupResponse {
  datasetGroupArn?: string;
  domain?: Domain;
}
export type ImportMode = "FULL" | "INCREMENTAL" | (string & {});
export interface CreateDatasetImportJobRequest {
  jobName: string;
  datasetArn: string;
  dataSource: DataSource;
  roleArn?: string;
  tags?: Tag[];
  importMode?: ImportMode;
  publishAttributionMetricsToS3?: boolean;
}
export interface CreateDatasetImportJobResponse {
  datasetImportJobArn?: string;
}
export interface CreateEventTrackerRequest {
  name: string;
  datasetGroupArn: string;
  tags?: Tag[];
}
export type TrackingId = string;
export interface CreateEventTrackerResponse {
  eventTrackerArn?: string;
  trackingId?: string;
}
export type FilterExpression = string | redacted.Redacted<string>;
export interface CreateFilterRequest {
  name: string;
  datasetGroupArn: string;
  filterExpression: string | redacted.Redacted<string>;
  tags?: Tag[];
}
export interface CreateFilterResponse {
  filterArn?: string;
}
export type EventType = string;
export type MetricName = string;
export type MetricExpression = string;
export interface MetricAttribute {
  eventType: string;
  metricName: string;
  expression: string;
}
export type MetricAttributes = MetricAttribute[];
export interface MetricAttributionOutput {
  s3DataDestination?: S3DataConfig;
  roleArn: string;
}
export interface CreateMetricAttributionRequest {
  name: string;
  datasetGroupArn: string;
  metrics: MetricAttribute[];
  metricsOutputConfig: MetricAttributionOutput;
}
export interface CreateMetricAttributionResponse {
  metricAttributionArn?: string;
}
export type ColumnNamesList = string[];
export type ExcludedDatasetColumns = { [key: string]: string[] | undefined };
export type IncludedDatasetColumns = { [key: string]: string[] | undefined };
export interface TrainingDataConfig {
  excludedDatasetColumns?: { [key: string]: string[] | undefined };
  includedDatasetColumns?: { [key: string]: string[] | undefined };
}
export interface RecommenderConfig {
  itemExplorationConfig?: { [key: string]: string | undefined };
  minRecommendationRequestsPerSecond?: number;
  trainingDataConfig?: TrainingDataConfig;
  enableMetadataWithRecommendations?: boolean;
}
export interface CreateRecommenderRequest {
  name: string;
  datasetGroupArn: string;
  recipeArn: string;
  recommenderConfig?: RecommenderConfig;
  tags?: Tag[];
}
export interface CreateRecommenderResponse {
  recommenderArn?: string;
}
export type AvroSchema = string;
export interface CreateSchemaRequest {
  name: string;
  schema: string;
  domain?: Domain;
}
export interface CreateSchemaResponse {
  schemaArn?: string;
}
export type PerformAutoML = boolean;
export type PerformAutoTraining = boolean;
export type PerformIncrementalUpdate = boolean;
export type EventValueThreshold = string;
export type HPOObjectiveType = string;
export type MetricRegex = string;
export interface HPOObjective {
  type?: string;
  metricName?: string;
  metricRegex?: string;
}
export type HPOResource = string;
export interface HPOResourceConfig {
  maxNumberOfTrainingJobs?: string;
  maxParallelTrainingJobs?: string;
}
export type IntegerMinValue = number;
export type IntegerMaxValue = number;
export interface IntegerHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
}
export type IntegerHyperParameterRanges = IntegerHyperParameterRange[];
export type ContinuousMinValue = number;
export type ContinuousMaxValue = number;
export interface ContinuousHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
}
export type ContinuousHyperParameterRanges = ContinuousHyperParameterRange[];
export type CategoricalValue = string;
export type CategoricalValues = string[];
export interface CategoricalHyperParameterRange {
  name?: string;
  values?: string[];
}
export type CategoricalHyperParameterRanges = CategoricalHyperParameterRange[];
export interface HyperParameterRanges {
  integerHyperParameterRanges?: IntegerHyperParameterRange[];
  continuousHyperParameterRanges?: ContinuousHyperParameterRange[];
  categoricalHyperParameterRanges?: CategoricalHyperParameterRange[];
}
export interface HPOConfig {
  hpoObjective?: HPOObjective;
  hpoResourceConfig?: HPOResourceConfig;
  algorithmHyperParameterRanges?: HyperParameterRanges;
}
export type FeatureTransformationParameters = {
  [key: string]: string | undefined;
};
export type ArnList = string[];
export interface AutoMLConfig {
  metricName?: string;
  recipeList?: string[];
}
export type EventTypeThresholdValue = number;
export type EventTypeWeight = number;
export interface EventParameters {
  eventType?: string;
  eventValueThreshold?: number;
  weight?: number;
}
export type EventParametersList = EventParameters[];
export interface EventsConfig {
  eventParametersList?: EventParameters[];
}
export type ItemAttribute = string;
export type ObjectiveSensitivity =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "OFF"
  | (string & {});
export interface OptimizationObjective {
  itemAttribute?: string;
  objectiveSensitivity?: ObjectiveSensitivity;
}
export type SchedulingExpression = string;
export interface AutoTrainingConfig {
  schedulingExpression?: string;
}
export interface SolutionConfig {
  eventValueThreshold?: string;
  hpoConfig?: HPOConfig;
  algorithmHyperParameters?: { [key: string]: string | undefined };
  featureTransformationParameters?: { [key: string]: string | undefined };
  autoMLConfig?: AutoMLConfig;
  eventsConfig?: EventsConfig;
  optimizationObjective?: OptimizationObjective;
  trainingDataConfig?: TrainingDataConfig;
  autoTrainingConfig?: AutoTrainingConfig;
}
export interface CreateSolutionRequest {
  name: string;
  performHPO?: boolean;
  performAutoML?: boolean;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  recipeArn?: string;
  datasetGroupArn: string;
  eventType?: string;
  solutionConfig?: SolutionConfig;
  tags?: Tag[];
}
export interface CreateSolutionResponse {
  solutionArn?: string;
}
export type TrainingMode = "FULL" | "UPDATE" | "AUTOTRAIN" | (string & {});
export interface CreateSolutionVersionRequest {
  name?: string;
  solutionArn: string;
  trainingMode?: TrainingMode;
  tags?: Tag[];
}
export interface CreateSolutionVersionResponse {
  solutionVersionArn?: string;
}
export interface DeleteCampaignRequest {
  campaignArn: string;
}
export interface DeleteCampaignResponse {}
export interface DeleteDatasetRequest {
  datasetArn: string;
}
export interface DeleteDatasetResponse {}
export interface DeleteDatasetGroupRequest {
  datasetGroupArn: string;
}
export interface DeleteDatasetGroupResponse {}
export interface DeleteEventTrackerRequest {
  eventTrackerArn: string;
}
export interface DeleteEventTrackerResponse {}
export interface DeleteFilterRequest {
  filterArn: string;
}
export interface DeleteFilterResponse {}
export interface DeleteMetricAttributionRequest {
  metricAttributionArn: string;
}
export interface DeleteMetricAttributionResponse {}
export interface DeleteRecommenderRequest {
  recommenderArn: string;
}
export interface DeleteRecommenderResponse {}
export interface DeleteSchemaRequest {
  schemaArn: string;
}
export interface DeleteSchemaResponse {}
export interface DeleteSolutionRequest {
  solutionArn: string;
}
export interface DeleteSolutionResponse {}
export interface DescribeAlgorithmRequest {
  algorithmArn: string;
}
export type DockerURI = string;
export interface AlgorithmImage {
  name?: string;
  dockerURI: string;
}
export type Tunable = boolean;
export interface DefaultIntegerHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
  isTunable?: boolean;
}
export type DefaultIntegerHyperParameterRanges =
  DefaultIntegerHyperParameterRange[];
export interface DefaultContinuousHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
  isTunable?: boolean;
}
export type DefaultContinuousHyperParameterRanges =
  DefaultContinuousHyperParameterRange[];
export interface DefaultCategoricalHyperParameterRange {
  name?: string;
  values?: string[];
  isTunable?: boolean;
}
export type DefaultCategoricalHyperParameterRanges =
  DefaultCategoricalHyperParameterRange[];
export interface DefaultHyperParameterRanges {
  integerHyperParameterRanges?: DefaultIntegerHyperParameterRange[];
  continuousHyperParameterRanges?: DefaultContinuousHyperParameterRange[];
  categoricalHyperParameterRanges?: DefaultCategoricalHyperParameterRange[];
}
export type ResourceConfig = { [key: string]: string | undefined };
export type TrainingInputMode = string;
export interface Algorithm {
  name?: string;
  algorithmArn?: string;
  algorithmImage?: AlgorithmImage;
  defaultHyperParameters?: { [key: string]: string | undefined };
  defaultHyperParameterRanges?: DefaultHyperParameterRanges;
  defaultResourceConfig?: { [key: string]: string | undefined };
  trainingInputMode?: string;
  roleArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeAlgorithmResponse {
  algorithm?: Algorithm;
}
export interface DescribeBatchInferenceJobRequest {
  batchInferenceJobArn: string;
}
export type FailureReason = string;
export type Status = string;
export interface BatchInferenceJob {
  jobName?: string;
  batchInferenceJobArn?: string;
  filterArn?: string;
  failureReason?: string;
  solutionVersionArn?: string;
  numResults?: number;
  jobInput?: BatchInferenceJobInput;
  jobOutput?: BatchInferenceJobOutput;
  batchInferenceJobConfig?: BatchInferenceJobConfig;
  roleArn?: string;
  batchInferenceJobMode?: BatchInferenceJobMode;
  themeGenerationConfig?: ThemeGenerationConfig;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeBatchInferenceJobResponse {
  batchInferenceJob?: BatchInferenceJob;
}
export interface DescribeBatchSegmentJobRequest {
  batchSegmentJobArn: string;
}
export interface BatchSegmentJob {
  jobName?: string;
  batchSegmentJobArn?: string;
  filterArn?: string;
  failureReason?: string;
  solutionVersionArn?: string;
  numResults?: number;
  jobInput?: BatchSegmentJobInput;
  jobOutput?: BatchSegmentJobOutput;
  roleArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeBatchSegmentJobResponse {
  batchSegmentJob?: BatchSegmentJob;
}
export interface DescribeCampaignRequest {
  campaignArn: string;
}
export interface CampaignUpdateSummary {
  solutionVersionArn?: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface Campaign {
  name?: string;
  campaignArn?: string;
  solutionVersionArn?: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  latestCampaignUpdate?: CampaignUpdateSummary;
}
export interface DescribeCampaignResponse {
  campaign?: Campaign;
}
export interface DescribeDataDeletionJobRequest {
  dataDeletionJobArn: string;
}
export interface DataDeletionJob {
  jobName?: string;
  dataDeletionJobArn?: string;
  datasetGroupArn?: string;
  dataSource?: DataSource;
  roleArn?: string;
  status?: string;
  numDeleted?: number;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export interface DescribeDataDeletionJobResponse {
  dataDeletionJob?: DataDeletionJob;
}
export interface DescribeDatasetRequest {
  datasetArn: string;
}
export interface DatasetUpdateSummary {
  schemaArn?: string;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface Dataset {
  name?: string;
  datasetArn?: string;
  datasetGroupArn?: string;
  datasetType?: string;
  schemaArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  latestDatasetUpdate?: DatasetUpdateSummary;
  trackingId?: string;
}
export interface DescribeDatasetResponse {
  dataset?: Dataset;
}
export interface DescribeDatasetExportJobRequest {
  datasetExportJobArn: string;
}
export interface DatasetExportJob {
  jobName?: string;
  datasetExportJobArn?: string;
  datasetArn?: string;
  ingestionMode?: IngestionMode;
  roleArn?: string;
  status?: string;
  jobOutput?: DatasetExportJobOutput;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export interface DescribeDatasetExportJobResponse {
  datasetExportJob?: DatasetExportJob;
}
export interface DescribeDatasetGroupRequest {
  datasetGroupArn: string;
}
export interface DatasetGroup {
  name?: string;
  datasetGroupArn?: string;
  status?: string;
  roleArn?: string;
  kmsKeyArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  domain?: Domain;
}
export interface DescribeDatasetGroupResponse {
  datasetGroup?: DatasetGroup;
}
export interface DescribeDatasetImportJobRequest {
  datasetImportJobArn: string;
}
export interface DatasetImportJob {
  jobName?: string;
  datasetImportJobArn?: string;
  datasetArn?: string;
  dataSource?: DataSource;
  roleArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  importMode?: ImportMode;
  publishAttributionMetricsToS3?: boolean;
}
export interface DescribeDatasetImportJobResponse {
  datasetImportJob?: DatasetImportJob;
}
export interface DescribeEventTrackerRequest {
  eventTrackerArn: string;
}
export type AccountId = string;
export interface EventTracker {
  name?: string;
  eventTrackerArn?: string;
  accountId?: string;
  trackingId?: string;
  datasetGroupArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export interface DescribeEventTrackerResponse {
  eventTracker?: EventTracker;
}
export interface DescribeFeatureTransformationRequest {
  featureTransformationArn: string;
}
export type FeaturizationParameters = { [key: string]: string | undefined };
export interface FeatureTransformation {
  name?: string;
  featureTransformationArn?: string;
  defaultParameters?: { [key: string]: string | undefined };
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  status?: string;
}
export interface DescribeFeatureTransformationResponse {
  featureTransformation?: FeatureTransformation;
}
export interface DescribeFilterRequest {
  filterArn: string;
}
export interface Filter {
  name?: string;
  filterArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  datasetGroupArn?: string;
  failureReason?: string;
  filterExpression?: string | redacted.Redacted<string>;
  status?: string;
}
export interface DescribeFilterResponse {
  filter?: Filter;
}
export interface DescribeMetricAttributionRequest {
  metricAttributionArn: string;
}
export interface MetricAttribution {
  name?: string;
  metricAttributionArn?: string;
  datasetGroupArn?: string;
  metricsOutputConfig?: MetricAttributionOutput;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export interface DescribeMetricAttributionResponse {
  metricAttribution?: MetricAttribution;
}
export interface DescribeRecipeRequest {
  recipeArn: string;
}
export type Description = string;
export type RecipeType = string;
export interface Recipe {
  name?: string;
  recipeArn?: string;
  algorithmArn?: string;
  featureTransformationArn?: string;
  status?: string;
  description?: string;
  creationDateTime?: Date;
  recipeType?: string;
  lastUpdatedDateTime?: Date;
}
export interface DescribeRecipeResponse {
  recipe?: Recipe;
}
export interface DescribeRecommenderRequest {
  recommenderArn: string;
}
export interface RecommenderUpdateSummary {
  recommenderConfig?: RecommenderConfig;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  status?: string;
  failureReason?: string;
}
export type MetricValue = number;
export type Metrics = { [key: string]: number | undefined };
export interface Recommender {
  recommenderArn?: string;
  datasetGroupArn?: string;
  name?: string;
  recipeArn?: string;
  recommenderConfig?: RecommenderConfig;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  status?: string;
  failureReason?: string;
  latestRecommenderUpdate?: RecommenderUpdateSummary;
  modelMetrics?: { [key: string]: number | undefined };
}
export interface DescribeRecommenderResponse {
  recommender?: Recommender;
}
export interface DescribeSchemaRequest {
  schemaArn: string;
}
export interface DatasetSchema {
  name?: string;
  schemaArn?: string;
  schema?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  domain?: Domain;
}
export interface DescribeSchemaResponse {
  schema?: DatasetSchema;
}
export interface DescribeSolutionRequest {
  solutionArn: string;
}
export type PerformHPO = boolean;
export interface AutoMLResult {
  bestRecipeArn?: string;
}
export type TrainingType = "AUTOMATIC" | "MANUAL" | (string & {});
export interface SolutionVersionSummary {
  solutionVersionArn?: string;
  status?: string;
  trainingMode?: TrainingMode;
  trainingType?: TrainingType;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export interface SolutionUpdateConfig {
  autoTrainingConfig?: AutoTrainingConfig;
  eventsConfig?: EventsConfig;
}
export interface SolutionUpdateSummary {
  solutionUpdateConfig?: SolutionUpdateConfig;
  status?: string;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export interface Solution {
  name?: string;
  solutionArn?: string;
  performHPO?: boolean;
  performAutoML?: boolean;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  recipeArn?: string;
  datasetGroupArn?: string;
  eventType?: string;
  solutionConfig?: SolutionConfig;
  autoMLResult?: AutoMLResult;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  latestSolutionVersion?: SolutionVersionSummary;
  latestSolutionUpdate?: SolutionUpdateSummary;
}
export interface DescribeSolutionResponse {
  solution?: Solution;
}
export interface DescribeSolutionVersionRequest {
  solutionVersionArn: string;
}
export type TrainingHours = number;
export interface TunedHPOParams {
  algorithmHyperParameters?: { [key: string]: string | undefined };
}
export interface SolutionVersion {
  name?: string;
  solutionVersionArn?: string;
  solutionArn?: string;
  performHPO?: boolean;
  performAutoML?: boolean;
  performIncrementalUpdate?: boolean;
  recipeArn?: string;
  eventType?: string;
  datasetGroupArn?: string;
  solutionConfig?: SolutionConfig;
  trainingHours?: number;
  trainingMode?: TrainingMode;
  tunedHPOParams?: TunedHPOParams;
  status?: string;
  failureReason?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  trainingType?: TrainingType;
}
export interface DescribeSolutionVersionResponse {
  solutionVersion?: SolutionVersion;
}
export interface GetSolutionMetricsRequest {
  solutionVersionArn: string;
}
export interface GetSolutionMetricsResponse {
  solutionVersionArn?: string;
  metrics?: { [key: string]: number | undefined };
}
export type NextToken = string;
export type MaxResults = number;
export interface ListBatchInferenceJobsRequest {
  solutionVersionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface BatchInferenceJobSummary {
  batchInferenceJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  solutionVersionArn?: string;
  batchInferenceJobMode?: BatchInferenceJobMode;
}
export type BatchInferenceJobs = BatchInferenceJobSummary[];
export interface ListBatchInferenceJobsResponse {
  batchInferenceJobs?: BatchInferenceJobSummary[];
  nextToken?: string;
}
export interface ListBatchSegmentJobsRequest {
  solutionVersionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface BatchSegmentJobSummary {
  batchSegmentJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  solutionVersionArn?: string;
}
export type BatchSegmentJobs = BatchSegmentJobSummary[];
export interface ListBatchSegmentJobsResponse {
  batchSegmentJobs?: BatchSegmentJobSummary[];
  nextToken?: string;
}
export interface ListCampaignsRequest {
  solutionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CampaignSummary {
  name?: string;
  campaignArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export type Campaigns = CampaignSummary[];
export interface ListCampaignsResponse {
  campaigns?: CampaignSummary[];
  nextToken?: string;
}
export interface ListDataDeletionJobsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DataDeletionJobSummary {
  dataDeletionJobArn?: string;
  datasetGroupArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export type DataDeletionJobs = DataDeletionJobSummary[];
export interface ListDataDeletionJobsResponse {
  dataDeletionJobs?: DataDeletionJobSummary[];
  nextToken?: string;
}
export interface ListDatasetExportJobsRequest {
  datasetArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetExportJobSummary {
  datasetExportJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export type DatasetExportJobs = DatasetExportJobSummary[];
export interface ListDatasetExportJobsResponse {
  datasetExportJobs?: DatasetExportJobSummary[];
  nextToken?: string;
}
export interface ListDatasetGroupsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetGroupSummary {
  name?: string;
  datasetGroupArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  domain?: Domain;
}
export type DatasetGroups = DatasetGroupSummary[];
export interface ListDatasetGroupsResponse {
  datasetGroups?: DatasetGroupSummary[];
  nextToken?: string;
}
export interface ListDatasetImportJobsRequest {
  datasetArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetImportJobSummary {
  datasetImportJobArn?: string;
  jobName?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
  importMode?: ImportMode;
}
export type DatasetImportJobs = DatasetImportJobSummary[];
export interface ListDatasetImportJobsResponse {
  datasetImportJobs?: DatasetImportJobSummary[];
  nextToken?: string;
}
export interface ListDatasetsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetSummary {
  name?: string;
  datasetArn?: string;
  datasetType?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type Datasets = DatasetSummary[];
export interface ListDatasetsResponse {
  datasets?: DatasetSummary[];
  nextToken?: string;
}
export interface ListEventTrackersRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface EventTrackerSummary {
  name?: string;
  eventTrackerArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type EventTrackers = EventTrackerSummary[];
export interface ListEventTrackersResponse {
  eventTrackers?: EventTrackerSummary[];
  nextToken?: string;
}
export interface ListFiltersRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface FilterSummary {
  name?: string;
  filterArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  datasetGroupArn?: string;
  failureReason?: string;
  status?: string;
}
export type Filters = FilterSummary[];
export interface ListFiltersResponse {
  Filters?: FilterSummary[];
  nextToken?: string;
}
export interface ListMetricAttributionMetricsRequest {
  metricAttributionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListMetricAttributionMetricsResponse {
  metrics?: MetricAttribute[];
  nextToken?: string;
}
export interface ListMetricAttributionsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface MetricAttributionSummary {
  name?: string;
  metricAttributionArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReason?: string;
}
export type MetricAttributions = MetricAttributionSummary[];
export interface ListMetricAttributionsResponse {
  metricAttributions?: MetricAttributionSummary[];
  nextToken?: string;
}
export type RecipeProvider = "SERVICE" | (string & {});
export interface ListRecipesRequest {
  recipeProvider?: RecipeProvider;
  nextToken?: string;
  maxResults?: number;
  domain?: Domain;
}
export interface RecipeSummary {
  name?: string;
  recipeArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  domain?: Domain;
}
export type Recipes = RecipeSummary[];
export interface ListRecipesResponse {
  recipes?: RecipeSummary[];
  nextToken?: string;
}
export interface ListRecommendersRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface RecommenderSummary {
  name?: string;
  recommenderArn?: string;
  datasetGroupArn?: string;
  recipeArn?: string;
  recommenderConfig?: RecommenderConfig;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export type Recommenders = RecommenderSummary[];
export interface ListRecommendersResponse {
  recommenders?: RecommenderSummary[];
  nextToken?: string;
}
export interface ListSchemasRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface DatasetSchemaSummary {
  name?: string;
  schemaArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  domain?: Domain;
}
export type Schemas = DatasetSchemaSummary[];
export interface ListSchemasResponse {
  schemas?: DatasetSchemaSummary[];
  nextToken?: string;
}
export interface ListSolutionsRequest {
  datasetGroupArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface SolutionSummary {
  name?: string;
  solutionArn?: string;
  status?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  recipeArn?: string;
}
export type Solutions = SolutionSummary[];
export interface ListSolutionsResponse {
  solutions?: SolutionSummary[];
  nextToken?: string;
}
export interface ListSolutionVersionsRequest {
  solutionArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export type SolutionVersions = SolutionVersionSummary[];
export interface ListSolutionVersionsResponse {
  solutionVersions?: SolutionVersionSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface StartRecommenderRequest {
  recommenderArn: string;
}
export interface StartRecommenderResponse {
  recommenderArn?: string;
}
export interface StopRecommenderRequest {
  recommenderArn: string;
}
export interface StopRecommenderResponse {
  recommenderArn?: string;
}
export interface StopSolutionVersionCreationRequest {
  solutionVersionArn: string;
}
export interface StopSolutionVersionCreationResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeys = (string | redacted.Redacted<string>)[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: (string | redacted.Redacted<string>)[];
}
export interface UntagResourceResponse {}
export interface UpdateCampaignRequest {
  campaignArn: string;
  solutionVersionArn?: string;
  minProvisionedTPS?: number;
  campaignConfig?: CampaignConfig;
}
export interface UpdateCampaignResponse {
  campaignArn?: string;
}
export interface UpdateDatasetRequest {
  datasetArn: string;
  schemaArn: string;
}
export interface UpdateDatasetResponse {
  datasetArn?: string;
}
export type MetricAttributesNamesList = string[];
export interface UpdateMetricAttributionRequest {
  addMetrics?: MetricAttribute[];
  removeMetrics?: string[];
  metricsOutputConfig?: MetricAttributionOutput;
  metricAttributionArn?: string;
}
export interface UpdateMetricAttributionResponse {
  metricAttributionArn?: string;
}
export interface UpdateRecommenderRequest {
  recommenderArn: string;
  recommenderConfig: RecommenderConfig;
}
export interface UpdateRecommenderResponse {
  recommenderArn?: string;
}
export interface UpdateSolutionRequest {
  solutionArn: string;
  performAutoTraining?: boolean;
  performIncrementalUpdate?: boolean;
  solutionUpdateConfig?: SolutionUpdateConfig;
}
export interface UpdateSolutionResponse {
  solutionArn?: string;
}
export type ErrorMessage = string;
export type CreateBatchInferenceJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Generates batch recommendations based on a list of items or users stored in Amazon S3
 * and exports the recommendations to an Amazon S3 bucket.
 *
 * To generate batch recommendations, specify the ARN of a solution version and an Amazon S3 URI for the input and output data.
 * For user personalization, popular items, and personalized ranking solutions, the batch inference job generates a list of
 * recommended items for each user ID in the input file. For related items solutions, the job generates a list of recommended
 * items for each item ID in the input file.
 *
 * For more information, see Creating a batch inference job
 * .
 *
 * If you use the Similar-Items recipe, Amazon Personalize can add descriptive themes to batch recommendations.
 * To generate themes, set the job's mode to
 * `THEME_GENERATION` and specify the name of the field that contains item names in the
 * input data.
 *
 * For more information about generating themes, see Batch recommendations with themes from Content Generator
 * .
 *
 * You can't get batch recommendations with the Trending-Now or Next-Best-Action recipes.
 */
export const createBatchInferenceJob: API.OperationMethod<
  CreateBatchInferenceJobRequest,
  CreateBatchInferenceJobResponse,
  CreateBatchInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobName: 0,
      solutionVersionArn: 0,
      filterArn: 0,
      numResults: 0,
      jobInput: { s3DataSource: i_S3DataConfig },
      jobOutput: { s3DataDestination: i_S3DataConfig },
      roleArn: 0,
      batchInferenceJobConfig: {
        itemExplorationConfig: 0,
        rankingInfluence: 0,
      },
      tags: D.list(i_Tag),
      batchInferenceJobMode: 0,
      themeGenerationConfig: { fieldsForThemeGeneration: { itemName: 0 } },
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchInferenceJob",
})) as any;

export type CreateBatchSegmentJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a batch segment job. The operation can handle up to 50 million records and the
 * input file must be in JSON format. For more information, see
 * Getting batch recommendations and user segments.
 */
export const createBatchSegmentJob: API.OperationMethod<
  CreateBatchSegmentJobRequest,
  CreateBatchSegmentJobResponse,
  CreateBatchSegmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobName: 0,
      solutionVersionArn: 0,
      filterArn: 0,
      numResults: 0,
      jobInput: { s3DataSource: i_S3DataConfig },
      jobOutput: { s3DataDestination: i_S3DataConfig },
      roleArn: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchSegmentJob",
})) as any;

export type CreateCampaignError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * You incur campaign costs while it is active. To avoid unnecessary costs, make sure to delete the campaign when you are finished. For information about campaign
 * costs, see Amazon Personalize pricing.
 *
 * Creates a campaign that deploys a solution version. When a client calls the
 * GetRecommendations
 * and
 * GetPersonalizedRanking
 * APIs, a campaign is specified in the request.
 *
 * **Minimum Provisioned TPS and Auto-Scaling**
 *
 * A high `minProvisionedTPS` will increase your cost. We recommend starting with 1 for `minProvisionedTPS` (the default). Track
 * your usage using Amazon CloudWatch metrics, and increase the `minProvisionedTPS`
 * as necessary.
 *
 * When you create an Amazon Personalize campaign, you can specify the minimum provisioned transactions per second
 * (`minProvisionedTPS`) for the campaign. This is the baseline transaction throughput for the campaign provisioned by
 * Amazon Personalize. It sets the minimum billing charge for the campaign while it is active. A transaction is a single `GetRecommendations` or
 * `GetPersonalizedRanking` request. The default `minProvisionedTPS` is 1.
 *
 * If your TPS increases beyond the `minProvisionedTPS`, Amazon Personalize auto-scales the provisioned capacity up
 * and down, but never below `minProvisionedTPS`.
 * There's a short time delay while the capacity is increased
 * that might cause loss of transactions. When your traffic reduces, capacity returns to the `minProvisionedTPS`.
 *
 * You are charged for the
 * the minimum provisioned TPS or, if your requests exceed the `minProvisionedTPS`, the actual TPS.
 * The actual TPS is the total number of recommendation requests you make.
 * We recommend starting with a low `minProvisionedTPS`, track
 * your usage using Amazon CloudWatch metrics, and then increase the `minProvisionedTPS` as necessary.
 *
 * For more information about campaign costs, see Amazon Personalize pricing.
 *
 * **Status**
 *
 * A campaign can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the campaign status, call DescribeCampaign.
 *
 * Wait until the `status` of the campaign
 * is `ACTIVE` before asking the campaign for recommendations.
 *
 * **Related APIs**
 *
 * - ListCampaigns
 *
 * - DescribeCampaign
 *
 * - UpdateCampaign
 *
 * - DeleteCampaign
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      solutionVersionArn: 0,
      minProvisionedTPS: 0,
      campaignConfig: i_CampaignConfig,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
})) as any;

export type CreateDataDeletionJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a batch job that deletes all
 * references to specific users from an Amazon Personalize dataset group in batches. You specify the users to delete in a CSV file of userIds in
 * an Amazon S3 bucket. After a job completes, Amazon Personalize no longer trains
 * on the users’ data and no longer considers the users when generating user segments.
 * For more information about creating a data deletion job, see Deleting users.
 *
 * - Your input file must be a CSV file with a single USER_ID column that lists the users IDs. For more information
 * about preparing the CSV file, see Preparing your data deletion file and uploading it to Amazon S3.
 *
 * - To give Amazon Personalize permission to access your input CSV file of userIds, you must specify an IAM service role that has permission to
 * read from the data source. This role
 * needs `GetObject` and `ListBucket` permissions for the bucket and its content.
 * These permissions are the same as importing data. For information on granting access to your Amazon S3
 * bucket, see Giving
 * Amazon Personalize Access to Amazon S3 Resources.
 *
 * After you create a job, it can take up to a day to delete all references to the users from datasets and models. Until the job completes,
 * Amazon Personalize continues to use the data when training. And if you use a User Segmentation recipe, the users might appear in user segments.
 *
 * **Status**
 *
 * A data deletion job can have one of the following statuses:
 *
 * - PENDING > IN_PROGRESS > COMPLETED -or- FAILED
 *
 * To get the status of the data deletion job, call DescribeDataDeletionJob API operation and specify the Amazon Resource Name
 * (ARN) of the job. If the status is FAILED, the response
 * includes a `failureReason` key, which describes why the job
 * failed.
 *
 * **Related APIs**
 *
 * - ListDataDeletionJobs
 *
 * - DescribeDataDeletionJob
 */
export const createDataDeletionJob: API.OperationMethod<
  CreateDataDeletionJobRequest,
  CreateDataDeletionJobResponse,
  CreateDataDeletionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobName: 0,
      datasetGroupArn: 0,
      dataSource: i_DataSource,
      roleArn: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataDeletionJob",
})) as any;

export type CreateDatasetError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an empty dataset and adds it to the specified dataset group.
 * Use CreateDatasetImportJob to import your training data to a
 * dataset.
 *
 * There are 5 types of datasets:
 *
 * - Item interactions
 *
 * - Items
 *
 * - Users
 *
 * - Action interactions
 *
 * - Actions
 *
 * Each dataset type has an associated schema with required field types.
 * Only the `Item interactions` dataset is required in order to train a
 * model (also referred to as creating a solution).
 *
 * A dataset can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the status of the dataset, call DescribeDataset.
 *
 * **Related APIs**
 *
 * - CreateDatasetGroup
 *
 * - ListDatasets
 *
 * - DescribeDataset
 *
 * - DeleteDataset
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
      name: 0,
      schemaArn: 0,
      datasetGroupArn: 0,
      datasetType: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
})) as any;

export type CreateDatasetExportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a job that exports data from your dataset to an Amazon S3 bucket.
 * To allow Amazon Personalize to export the training data, you must specify an
 * service-linked IAM role that gives Amazon Personalize `PutObject`
 * permissions for your Amazon S3 bucket. For information, see Exporting a dataset in the Amazon Personalize developer guide.
 *
 * **Status**
 *
 * A dataset export job can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * To get the status of the export job, call DescribeDatasetExportJob, and specify the Amazon Resource Name
 * (ARN) of the dataset export job. The dataset export is complete when the
 * status shows as ACTIVE. If the status shows as CREATE FAILED, the response
 * includes a `failureReason` key, which describes why the job
 * failed.
 */
export const createDatasetExportJob: API.OperationMethod<
  CreateDatasetExportJobRequest,
  CreateDatasetExportJobResponse,
  CreateDatasetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobName: 0,
      datasetArn: 0,
      ingestionMode: 0,
      roleArn: 0,
      jobOutput: { s3DataDestination: i_S3DataConfig },
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetExportJob",
})) as any;

export type CreateDatasetGroupError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an empty dataset group. A dataset group is a container for
 * Amazon Personalize resources. A dataset group can contain at most three datasets, one
 * for each type of dataset:
 *
 * - Item interactions
 *
 * - Items
 *
 * - Users
 *
 * - Actions
 *
 * - Action interactions
 *
 * A dataset group can be a Domain dataset group, where you specify a
 * domain and use pre-configured resources like recommenders, or a
 * Custom dataset group, where you use custom resources, such as a solution
 * with a solution version, that you deploy with a campaign. If you start
 * with a Domain dataset group, you can still add custom resources such as
 * solutions and solution versions trained with recipes for custom use cases
 * and deployed with campaigns.
 *
 * A dataset group can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * - DELETE PENDING
 *
 * To get the status of the dataset group, call DescribeDatasetGroup. If the status shows as CREATE FAILED, the
 * response includes a `failureReason` key, which describes why
 * the creation failed.
 *
 * You must wait until the `status` of the dataset group is
 * `ACTIVE` before adding a dataset to the group.
 *
 * You can specify an Key Management Service (KMS) key to encrypt the datasets in
 * the group. If you specify a KMS key, you must also include an Identity and Access Management
 * (IAM) role that has permission to access the key.
 *
 * **APIs that require a dataset group ARN in the request**
 *
 * - CreateDataset
 *
 * - CreateEventTracker
 *
 * - CreateSolution
 *
 * **Related APIs**
 *
 * - ListDatasetGroups
 *
 * - DescribeDatasetGroup
 *
 * - DeleteDatasetGroup
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
      name: 0,
      roleArn: 0,
      kmsKeyArn: 0,
      domain: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    TooManyTagsException,
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
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a job that imports training data from your data source (an
 * Amazon S3 bucket) to an Amazon Personalize dataset. To allow Amazon Personalize to import the
 * training data, you must specify an IAM service role that has permission to
 * read from the data source, as Amazon Personalize makes a copy of your data and
 * processes it internally. For information on granting access to your Amazon S3
 * bucket, see Giving
 * Amazon Personalize Access to Amazon S3 Resources.
 *
 * If you already created a recommender or deployed a custom solution version with a campaign, how new bulk records
 * influence recommendations depends on the domain use case or recipe that you use. For more information, see How new data influences
 * real-time recommendations.
 *
 * By default, a dataset import job replaces any existing data in the
 * dataset that you imported in bulk. To add new records without replacing
 * existing data, specify INCREMENTAL for the import mode in the
 * CreateDatasetImportJob operation.
 *
 * **Status**
 *
 * A dataset import job can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE
 * FAILED
 *
 * To get the status of the import job, call DescribeDatasetImportJob, providing the Amazon Resource Name
 * (ARN) of the dataset import job. The dataset import is complete when the
 * status shows as ACTIVE. If the status shows as CREATE FAILED, the response
 * includes a `failureReason` key, which describes why the job
 * failed.
 *
 * Importing takes time. You must wait until the status shows as ACTIVE
 * before training a model using the dataset.
 *
 * **Related APIs**
 *
 * - ListDatasetImportJobs
 *
 * - DescribeDatasetImportJob
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
      jobName: 0,
      datasetArn: 0,
      dataSource: i_DataSource,
      roleArn: 0,
      tags: D.list(i_Tag),
      importMode: 0,
      publishAttributionMetricsToS3: 0,
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetImportJob",
})) as any;

export type CreateEventTrackerError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an event tracker that you use when adding event data to a specified dataset
 * group using the
 * PutEvents API.
 *
 * Only one event tracker can be associated with a dataset group. You will get
 * an error if you call `CreateEventTracker` using the same dataset group as an
 * existing event tracker.
 *
 * When you create an event tracker, the response includes a tracking ID, which you pass as a parameter when you use the
 * PutEvents operation.
 * Amazon Personalize then appends the event data to the Item interactions dataset of the dataset group you specify
 * in your event tracker.
 *
 * The event tracker can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the status of the event tracker, call DescribeEventTracker.
 *
 * The event tracker must be in the ACTIVE state before using the tracking ID.
 *
 * **Related APIs**
 *
 * - ListEventTrackers
 *
 * - DescribeEventTracker
 *
 * - DeleteEventTracker
 */
export const createEventTracker: API.OperationMethod<
  CreateEventTrackerRequest,
  CreateEventTrackerResponse,
  CreateEventTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, datasetGroupArn: 0, tags: D.list(i_Tag) },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventTracker",
})) as any;

export type CreateFilterError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a recommendation filter. For more information, see Filtering recommendations and user segments.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      datasetGroupArn: 0,
      filterExpression: 0,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFilter",
})) as any;

export type CreateMetricAttributionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a metric attribution.
 * A metric attribution creates reports on the data that you import into Amazon Personalize. Depending on how you imported the data, you can view reports in Amazon CloudWatch or Amazon S3.
 * For more information, see Measuring impact of recommendations.
 */
export const createMetricAttribution: API.OperationMethod<
  CreateMetricAttributionRequest,
  CreateMetricAttributionResponse,
  CreateMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      datasetGroupArn: 0,
      metrics: D.list(i_MetricAttribute),
      metricsOutputConfig: i_MetricAttributionOutput,
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
  operationName: "CreateMetricAttribution",
})) as any;

export type CreateRecommenderError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a recommender with the recipe (a Domain dataset group use case) you specify.
 * You create recommenders for a Domain dataset group and specify the recommender's Amazon Resource Name (ARN) when you make a
 * GetRecommendations
 * request.
 *
 * **Minimum recommendation requests per second**
 *
 * A high `minRecommendationRequestsPerSecond` will increase your bill. We recommend starting with 1 for `minRecommendationRequestsPerSecond` (the default). Track
 * your usage using Amazon CloudWatch metrics, and increase the `minRecommendationRequestsPerSecond`
 * as necessary.
 *
 * When you create a recommender, you can configure the recommender's minimum recommendation requests per second. The minimum recommendation requests per second
 * (`minRecommendationRequestsPerSecond`) specifies the baseline recommendation request throughput provisioned by
 * Amazon Personalize. The default minRecommendationRequestsPerSecond is `1`. A recommendation request is a single `GetRecommendations` operation.
 * Request throughput is measured in requests per second and Amazon Personalize uses your requests per second to derive
 * your requests per hour and the price of your recommender usage.
 *
 * If your requests per second increases beyond
 * `minRecommendationRequestsPerSecond`, Amazon Personalize auto-scales the provisioned capacity up and down,
 * but never below `minRecommendationRequestsPerSecond`.
 * There's a short time delay while the capacity is increased that might cause loss of
 * requests.
 *
 * Your bill is the greater of either the minimum requests per hour (based on minRecommendationRequestsPerSecond)
 * or the actual number of requests. The actual request throughput used is calculated as the average requests/second within a one-hour window.
 *
 * We recommend starting with the default `minRecommendationRequestsPerSecond`, track
 * your usage using Amazon CloudWatch metrics, and then increase the `minRecommendationRequestsPerSecond`
 * as necessary.
 *
 * **Status**
 *
 * A recommender can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - STOP PENDING > STOP IN_PROGRESS > INACTIVE > START PENDING > START IN_PROGRESS > ACTIVE
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the recommender status, call DescribeRecommender.
 *
 * Wait until the `status` of the recommender
 * is `ACTIVE` before asking the recommender for recommendations.
 *
 * **Related APIs**
 *
 * - ListRecommenders
 *
 * - DescribeRecommender
 *
 * - UpdateRecommender
 *
 * - DeleteRecommender
 */
export const createRecommender: API.OperationMethod<
  CreateRecommenderRequest,
  CreateRecommenderResponse,
  CreateRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      datasetGroupArn: 0,
      recipeArn: 0,
      recommenderConfig: i_RecommenderConfig,
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecommender",
})) as any;

export type CreateSchemaError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates an Amazon Personalize schema from the specified schema string. The schema you create
 * must be in Avro JSON format.
 *
 * Amazon Personalize recognizes three schema variants. Each schema is associated with a dataset
 * type and has a set of required field and keywords. If you are creating a schema for a dataset in a Domain dataset group, you
 * provide the domain of the Domain dataset group.
 * You specify a schema when you call CreateDataset.
 *
 * **Related APIs**
 *
 * - ListSchemas
 *
 * - DescribeSchema
 *
 * - DeleteSchema
 */
export const createSchema: API.OperationMethod<
  CreateSchemaRequest,
  CreateSchemaResponse,
  CreateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0, schema: 0, domain: 0 } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
})) as any;

export type CreateSolutionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * By default, all new solutions use automatic training. With automatic training, you incur training costs while
 * your solution is active. To avoid unnecessary costs, when you are finished you can
 * update the solution to turn off automatic training.
 * For information about training
 * costs, see Amazon Personalize pricing.
 *
 * Creates the configuration for training a model (creating a solution version). This configuration
 * includes the recipe to use for model training and optional training configuration, such as columns to use
 * in training and feature transformation parameters. For more information about configuring a solution, see Creating and configuring a solution.
 *
 * By default, new solutions use automatic training to create solution versions every 7 days. You can change the training frequency.
 * Automatic solution version creation starts within one hour after the solution is ACTIVE. If you manually create a solution version within
 * the hour, the solution skips the first automatic training. For more information,
 * see Configuring automatic training.
 *
 * To turn off automatic training, set `performAutoTraining` to false. If you turn off automatic training, you must manually create a solution version
 * by calling the CreateSolutionVersion operation.
 *
 * After training starts, you can
 * get the solution version's Amazon Resource Name (ARN) with the ListSolutionVersions API operation.
 * To get its status, use the DescribeSolutionVersion.
 *
 * After training completes you can evaluate model accuracy by calling
 * GetSolutionMetrics. When you are satisfied with the solution version, you
 * deploy it using CreateCampaign. The campaign provides recommendations
 * to a client through the
 * GetRecommendations API.
 *
 * Amazon Personalize doesn't support configuring the `hpoObjective`
 * for solution hyperparameter optimization at this time.
 *
 * **Status**
 *
 * A solution can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * To get the status of the solution, call DescribeSolution. If you use
 * manual training, the status must be ACTIVE before you call `CreateSolutionVersion`.
 *
 * **Related APIs**
 *
 * - UpdateSolution
 *
 * - ListSolutions
 *
 * - CreateSolutionVersion
 *
 * - DescribeSolution
 *
 * - DeleteSolution
 *
 * - ListSolutionVersions
 *
 * - DescribeSolutionVersion
 */
export const createSolution: API.OperationMethod<
  CreateSolutionRequest,
  CreateSolutionResponse,
  CreateSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      performHPO: 0,
      performAutoML: 0,
      performAutoTraining: 0,
      performIncrementalUpdate: 0,
      recipeArn: 0,
      datasetGroupArn: 0,
      eventType: 0,
      solutionConfig: {
        eventValueThreshold: 0,
        hpoConfig: {
          hpoObjective: { type: 0, metricName: 0, metricRegex: 0 },
          hpoResourceConfig: {
            maxNumberOfTrainingJobs: 0,
            maxParallelTrainingJobs: 0,
          },
          algorithmHyperParameterRanges: {
            integerHyperParameterRanges: D.list({
              name: 0,
              minValue: 0,
              maxValue: 0,
            }),
            continuousHyperParameterRanges: D.list({
              name: 0,
              minValue: 0,
              maxValue: 0,
            }),
            categoricalHyperParameterRanges: D.list({ name: 0, values: 0 }),
          },
        },
        algorithmHyperParameters: 0,
        featureTransformationParameters: 0,
        autoMLConfig: { metricName: 0, recipeList: 0 },
        eventsConfig: i_EventsConfig,
        optimizationObjective: { itemAttribute: 0, objectiveSensitivity: 0 },
        trainingDataConfig: i_TrainingDataConfig,
        autoTrainingConfig: i_AutoTrainingConfig,
      },
      tags: D.list(i_Tag),
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolution",
})) as any;

export type CreateSolutionVersionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Trains or retrains an active solution in a Custom dataset group. A solution is created using the CreateSolution
 * operation and must be in the ACTIVE state before calling
 * `CreateSolutionVersion`. A new version of the solution is created every time you
 * call this operation.
 *
 * **Status**
 *
 * A solution version can be in one of the following states:
 *
 * - CREATE PENDING
 *
 * - CREATE IN_PROGRESS
 *
 * - ACTIVE
 *
 * - CREATE FAILED
 *
 * - CREATE STOPPING
 *
 * - CREATE STOPPED
 *
 * To get the status of the version, call DescribeSolutionVersion. Wait
 * until the status shows as ACTIVE before calling `CreateCampaign`.
 *
 * If the status shows as CREATE FAILED, the response includes a `failureReason`
 * key, which describes why the job failed.
 *
 * **Related APIs**
 *
 * - ListSolutionVersions
 *
 * - DescribeSolutionVersion
 *
 * - ListSolutions
 *
 * - CreateSolution
 *
 * - DescribeSolution
 *
 * - DeleteSolution
 */
export const createSolutionVersion: API.OperationMethod<
  CreateSolutionVersionRequest,
  CreateSolutionVersionResponse,
  CreateSolutionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, solutionArn: 0, trainingMode: 0, tags: D.list(i_Tag) },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolutionVersion",
})) as any;

export type DeleteCampaignError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes a campaign by deleting the solution deployment. The solution that
 * the campaign is based on is not deleted and can be redeployed when needed. A deleted campaign can no
 * longer be specified in a
 * GetRecommendations
 * request.
 * For information on creating campaigns, see CreateCampaign.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { campaignArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
})) as any;

export type DeleteDatasetError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataset. You can't delete a dataset if an associated
 * `DatasetImportJob` or `SolutionVersion` is in the
 * CREATE PENDING or IN PROGRESS state. For more information about deleting datasets,
 * see Deleting a dataset.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { datasetArn: 0 } },
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
 * Deletes a dataset group. Before you delete a dataset group, you must
 * delete the following:
 *
 * - All associated event trackers.
 *
 * - All associated solutions.
 *
 * - All datasets in the dataset group.
 */
export const deleteDatasetGroup: API.OperationMethod<
  DeleteDatasetGroupRequest,
  DeleteDatasetGroupResponse,
  DeleteDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { datasetGroupArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetGroup",
})) as any;

export type DeleteEventTrackerError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the event tracker. Does not delete the dataset from
 * the dataset group. For more
 * information on event trackers, see CreateEventTracker.
 */
export const deleteEventTracker: API.OperationMethod<
  DeleteEventTrackerRequest,
  DeleteEventTrackerResponse,
  DeleteEventTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { eventTrackerArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventTracker",
})) as any;

export type DeleteFilterError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a filter.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { filterArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFilter",
})) as any;

export type DeleteMetricAttributionError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a metric attribution.
 */
export const deleteMetricAttribution: API.OperationMethod<
  DeleteMetricAttributionRequest,
  DeleteMetricAttributionResponse,
  DeleteMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { metricAttributionArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricAttribution",
})) as any;

export type DeleteRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deactivates and removes a recommender. A deleted recommender can no longer be specified in a GetRecommendations
 * request.
 */
export const deleteRecommender: API.OperationMethod<
  DeleteRecommenderRequest,
  DeleteRecommenderResponse,
  DeleteRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { recommenderArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommender",
})) as any;

export type DeleteSchemaError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a schema. Before deleting a schema, you must delete all
 * datasets referencing the schema. For more information on schemas, see
 * CreateSchema.
 */
export const deleteSchema: API.OperationMethod<
  DeleteSchemaRequest,
  DeleteSchemaResponse,
  DeleteSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { schemaArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
})) as any;

export type DeleteSolutionError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes all versions of a solution and the `Solution` object itself.
 * Before deleting a solution, you must delete all campaigns based on
 * the solution. To determine what campaigns are using the solution, call
 * ListCampaigns and supply the Amazon Resource Name (ARN) of the solution.
 * You can't delete a solution if an associated `SolutionVersion` is in the
 * CREATE PENDING or IN PROGRESS state.
 * For more information on solutions, see CreateSolution.
 */
export const deleteSolution: API.OperationMethod<
  DeleteSolutionRequest,
  DeleteSolutionResponse,
  DeleteSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { solutionArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolution",
})) as any;

export type DescribeAlgorithmError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given algorithm.
 */
export const describeAlgorithm: API.OperationMethod<
  DescribeAlgorithmRequest,
  DescribeAlgorithmResponse,
  DescribeAlgorithmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { algorithmArn: 0 },
    output: {
      algorithm: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlgorithm",
})) as any;

export type DescribeBatchInferenceJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the properties of a batch inference job including name, Amazon Resource Name (ARN),
 * status, input and output configurations, and the ARN of the solution version used to generate
 * the recommendations.
 */
export const describeBatchInferenceJob: API.OperationMethod<
  DescribeBatchInferenceJobRequest,
  DescribeBatchInferenceJobResponse,
  DescribeBatchInferenceJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { batchInferenceJobArn: 0 },
    output: {
      batchInferenceJob: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchInferenceJob",
})) as any;

export type DescribeBatchSegmentJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the properties of a batch segment job including name, Amazon Resource Name (ARN),
 * status, input and output configurations, and the ARN of the solution version used to generate
 * segments.
 */
export const describeBatchSegmentJob: API.OperationMethod<
  DescribeBatchSegmentJobRequest,
  DescribeBatchSegmentJobResponse,
  DescribeBatchSegmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { batchSegmentJobArn: 0 },
    output: {
      batchSegmentJob: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchSegmentJob",
})) as any;

export type DescribeCampaignError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given campaign, including its status.
 *
 * A campaign can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * When the `status` is `CREATE FAILED`, the response includes the
 * `failureReason` key, which describes why.
 *
 * For more information on campaigns, see CreateCampaign.
 */
export const describeCampaign: API.OperationMethod<
  DescribeCampaignRequest,
  DescribeCampaignResponse,
  DescribeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { campaignArn: 0 },
    output: {
      campaign: {
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
        latestCampaignUpdate: {
          creationDateTime: D.ts,
          lastUpdatedDateTime: D.ts,
        },
      },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
})) as any;

export type DescribeDataDeletionJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the data deletion job created by CreateDataDeletionJob, including the job status.
 */
export const describeDataDeletionJob: API.OperationMethod<
  DescribeDataDeletionJobRequest,
  DescribeDataDeletionJobResponse,
  DescribeDataDeletionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { dataDeletionJobArn: 0 },
    output: {
      dataDeletionJob: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataDeletionJob",
})) as any;

export type DescribeDatasetError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given dataset. For more information on datasets, see
 * CreateDataset.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { datasetArn: 0 },
    output: {
      dataset: {
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
        latestDatasetUpdate: {
          creationDateTime: D.ts,
          lastUpdatedDateTime: D.ts,
        },
      },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
})) as any;

export type DescribeDatasetExportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the dataset export job created by CreateDatasetExportJob, including the export job status.
 */
export const describeDatasetExportJob: API.OperationMethod<
  DescribeDatasetExportJobRequest,
  DescribeDatasetExportJobResponse,
  DescribeDatasetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { datasetExportJobArn: 0 },
    output: {
      datasetExportJob: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetExportJob",
})) as any;

export type DescribeDatasetGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given dataset group. For more information on dataset
 * groups, see CreateDatasetGroup.
 */
export const describeDatasetGroup: API.OperationMethod<
  DescribeDatasetGroupRequest,
  DescribeDatasetGroupResponse,
  DescribeDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { datasetGroupArn: 0 },
    output: {
      datasetGroup: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
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
 * Describes the dataset import job created by CreateDatasetImportJob, including the import job status.
 */
export const describeDatasetImportJob: API.OperationMethod<
  DescribeDatasetImportJobRequest,
  DescribeDatasetImportJobResponse,
  DescribeDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { datasetImportJobArn: 0 },
    output: {
      datasetImportJob: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetImportJob",
})) as any;

export type DescribeEventTrackerError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an event tracker. The response includes the `trackingId` and
 * `status` of the event tracker.
 * For more information on event trackers, see CreateEventTracker.
 */
export const describeEventTracker: API.OperationMethod<
  DescribeEventTrackerRequest,
  DescribeEventTrackerResponse,
  DescribeEventTrackerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { eventTrackerArn: 0 },
    output: {
      eventTracker: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventTracker",
})) as any;

export type DescribeFeatureTransformationError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given feature transformation.
 */
export const describeFeatureTransformation: API.OperationMethod<
  DescribeFeatureTransformationRequest,
  DescribeFeatureTransformationResponse,
  DescribeFeatureTransformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { featureTransformationArn: 0 },
    output: {
      featureTransformation: {
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFeatureTransformation",
})) as any;

export type DescribeFilterError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a filter's properties.
 */
export const describeFilter: API.OperationMethod<
  DescribeFilterRequest,
  DescribeFilterResponse,
  DescribeFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { filterArn: 0 },
    output: {
      filter: {
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
        filterExpression: D.secret,
      },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFilter",
})) as any;

export type DescribeMetricAttributionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a metric attribution.
 */
export const describeMetricAttribution: API.OperationMethod<
  DescribeMetricAttributionRequest,
  DescribeMetricAttributionResponse,
  DescribeMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { metricAttributionArn: 0 },
    output: {
      metricAttribution: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricAttribution",
})) as any;

export type DescribeRecipeError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a recipe.
 *
 * A recipe contains three items:
 *
 * - An algorithm that trains a model.
 *
 * - Hyperparameters that govern the training.
 *
 * - Feature transformation information for modifying the input data before training.
 *
 * Amazon Personalize provides a set of predefined recipes. You specify a recipe when you create a
 * solution with the CreateSolution API.
 * `CreateSolution` trains a model by using the algorithm
 * in the specified recipe and a training dataset. The solution, when deployed as a campaign,
 * can provide recommendations using the
 * GetRecommendations API.
 */
export const describeRecipe: API.OperationMethod<
  DescribeRecipeRequest,
  DescribeRecipeResponse,
  DescribeRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { recipeArn: 0 },
    output: { recipe: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts } },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecipe",
})) as any;

export type DescribeRecommenderError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the given recommender, including its status.
 *
 * A recommender can be in one of the following states:
 *
 * - CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * - STOP PENDING > STOP IN_PROGRESS > INACTIVE > START PENDING > START IN_PROGRESS > ACTIVE
 *
 * - DELETE PENDING > DELETE IN_PROGRESS
 *
 * When the `status` is `CREATE FAILED`, the response includes the
 * `failureReason` key, which describes why.
 *
 * The `modelMetrics` key is null when
 * the recommender is being created or deleted.
 *
 * For more information on recommenders, see CreateRecommender.
 */
export const describeRecommender: API.OperationMethod<
  DescribeRecommenderRequest,
  DescribeRecommenderResponse,
  DescribeRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { recommenderArn: 0 },
    output: {
      recommender: {
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
        latestRecommenderUpdate: {
          creationDateTime: D.ts,
          lastUpdatedDateTime: D.ts,
        },
      },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommender",
})) as any;

export type DescribeSchemaError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a schema. For more information on schemas, see
 * CreateSchema.
 */
export const describeSchema: API.OperationMethod<
  DescribeSchemaRequest,
  DescribeSchemaResponse,
  DescribeSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { schemaArn: 0 },
    output: { schema: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts } },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchema",
})) as any;

export type DescribeSolutionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a solution.
 * For more information on solutions, see CreateSolution.
 */
export const describeSolution: API.OperationMethod<
  DescribeSolutionRequest,
  DescribeSolutionResponse,
  DescribeSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { solutionArn: 0 },
    output: {
      solution: {
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
        latestSolutionVersion: o_SolutionVersionSummary,
        latestSolutionUpdate: {
          creationDateTime: D.ts,
          lastUpdatedDateTime: D.ts,
        },
      },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSolution",
})) as any;

export type DescribeSolutionVersionError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a specific version of a solution. For more information on solutions, see CreateSolution
 */
export const describeSolutionVersion: API.OperationMethod<
  DescribeSolutionVersionRequest,
  DescribeSolutionVersionResponse,
  DescribeSolutionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { solutionVersionArn: 0 },
    output: {
      solutionVersion: { creationDateTime: D.ts, lastUpdatedDateTime: D.ts },
    },
  },
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSolutionVersion",
})) as any;

export type GetSolutionMetricsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the metrics for the specified solution version.
 */
export const getSolutionMetrics: API.OperationMethod<
  GetSolutionMetricsRequest,
  GetSolutionMetricsResponse,
  GetSolutionMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { solutionVersionArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolutionMetrics",
})) as any;

export type ListBatchInferenceJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Gets a list of the batch inference jobs that have been performed off of a solution
 * version.
 */
export const listBatchInferenceJobs: API.PaginatedOperationMethod<
  ListBatchInferenceJobsRequest,
  ListBatchInferenceJobsResponse,
  ListBatchInferenceJobsError,
  Credentials | HttpClient.HttpClient,
  BatchInferenceJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { solutionVersionArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      batchInferenceJobs: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchInferenceJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchInferenceJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchSegmentJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Gets a list of the batch segment jobs that have been performed off of a solution
 * version that you specify.
 */
export const listBatchSegmentJobs: API.PaginatedOperationMethod<
  ListBatchSegmentJobsRequest,
  ListBatchSegmentJobsResponse,
  ListBatchSegmentJobsError,
  Credentials | HttpClient.HttpClient,
  BatchSegmentJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { solutionVersionArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      batchSegmentJobs: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchSegmentJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchSegmentJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCampaignsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of campaigns that use the given solution.
 * When a solution is not specified, all the campaigns associated with the account are listed.
 * The response provides the properties for each campaign, including the Amazon Resource Name (ARN).
 * For more information on campaigns, see CreateCampaign.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { solutionArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      campaigns: D.list({ creationDateTime: D.ts, lastUpdatedDateTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaigns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataDeletionJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of data deletion jobs for a dataset group ordered by creation time,
 * with the most recent first.
 * When
 * a dataset group is not specified, all the data deletion jobs associated with
 * the account are listed. The response provides the properties for each
 * job, including the Amazon Resource Name (ARN). For more
 * information on data deletion jobs, see Deleting users.
 */
export const listDataDeletionJobs: API.OperationMethod<
  ListDataDeletionJobsRequest,
  ListDataDeletionJobsResponse,
  ListDataDeletionJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { datasetGroupArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      dataDeletionJobs: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataDeletionJobs",
})) as any;

export type ListDatasetExportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of dataset export jobs that use the given dataset. When
 * a dataset is not specified, all the dataset export jobs associated with
 * the account are listed. The response provides the properties for each
 * dataset export job, including the Amazon Resource Name (ARN). For more
 * information on dataset export jobs, see CreateDatasetExportJob. For more information on datasets, see
 * CreateDataset.
 */
export const listDatasetExportJobs: API.PaginatedOperationMethod<
  ListDatasetExportJobsRequest,
  ListDatasetExportJobsResponse,
  ListDatasetExportJobsError,
  Credentials | HttpClient.HttpClient,
  DatasetExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { datasetArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      datasetExportJobs: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetExportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetExportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetGroupsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns a list of dataset groups. The response provides the properties
 * for each dataset group, including the Amazon Resource Name (ARN). For more
 * information on dataset groups, see CreateDatasetGroup.
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
    input: { nextToken: 0, maxResults: 0 },
    output: {
      datasetGroups: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetImportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of dataset import jobs that use the given dataset. When
 * a dataset is not specified, all the dataset import jobs associated with
 * the account are listed. The response provides the properties for each
 * dataset import job, including the Amazon Resource Name (ARN). For more
 * information on dataset import jobs, see CreateDatasetImportJob. For more information on datasets, see
 * CreateDataset.
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
    input: { datasetArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      datasetImportJobs: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetImportJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns the list of datasets contained in the given dataset group. The
 * response provides the properties for each dataset, including the Amazon
 * Resource Name (ARN). For more information on datasets, see CreateDataset.
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
    input: { datasetGroupArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      datasets: D.list({ creationDateTime: D.ts, lastUpdatedDateTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventTrackersError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns the list of event trackers associated with the account.
 * The response provides the properties for each event tracker, including the Amazon Resource
 * Name (ARN) and tracking ID. For more
 * information on event trackers, see CreateEventTracker.
 */
export const listEventTrackers: API.PaginatedOperationMethod<
  ListEventTrackersRequest,
  ListEventTrackersResponse,
  ListEventTrackersError,
  Credentials | HttpClient.HttpClient,
  EventTrackerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { datasetGroupArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      eventTrackers: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventTrackers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "eventTrackers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFiltersError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists all filters that belong to a given dataset group.
 */
export const listFilters: API.PaginatedOperationMethod<
  ListFiltersRequest,
  ListFiltersResponse,
  ListFiltersError,
  Credentials | HttpClient.HttpClient,
  FilterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { datasetGroupArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      Filters: D.list({ creationDateTime: D.ts, lastUpdatedDateTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFilters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "Filters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetricAttributionMetricsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the metrics for the metric attribution.
 */
export const listMetricAttributionMetrics: API.PaginatedOperationMethod<
  ListMetricAttributionMetricsRequest,
  ListMetricAttributionMetricsResponse,
  ListMetricAttributionMetricsError,
  Credentials | HttpClient.HttpClient,
  MetricAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { metricAttributionArn: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricAttributionMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metrics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetricAttributionsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists metric attributions.
 */
export const listMetricAttributions: API.PaginatedOperationMethod<
  ListMetricAttributionsRequest,
  ListMetricAttributionsResponse,
  ListMetricAttributionsError,
  Credentials | HttpClient.HttpClient,
  MetricAttributionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { datasetGroupArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      metricAttributions: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricAttributions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricAttributions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecipesError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of available recipes. The response provides the properties
 * for each recipe, including the recipe's Amazon Resource Name (ARN).
 */
export const listRecipes: API.PaginatedOperationMethod<
  ListRecipesRequest,
  ListRecipesResponse,
  ListRecipesError,
  Credentials | HttpClient.HttpClient,
  RecipeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { recipeProvider: 0, nextToken: 0, maxResults: 0, domain: 0 },
    output: {
      recipes: D.list({ creationDateTime: D.ts, lastUpdatedDateTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecipes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recipes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendersError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of recommenders in a given Domain dataset group.
 * When a Domain dataset group is not specified, all the recommenders associated with the account are listed.
 * The response provides the properties for each recommender, including the Amazon Resource Name (ARN).
 * For more information on recommenders, see CreateRecommender.
 */
export const listRecommenders: API.PaginatedOperationMethod<
  ListRecommendersRequest,
  ListRecommendersResponse,
  ListRecommendersError,
  Credentials | HttpClient.HttpClient,
  RecommenderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { datasetGroupArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      recommenders: D.list({
        creationDateTime: D.ts,
        lastUpdatedDateTime: D.ts,
      }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommenders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommenders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchemasError = InvalidNextTokenException | CommonErrors;
/**
 * Returns the list of schemas associated with the account. The response provides the
 * properties for each schema, including the Amazon Resource Name (ARN).
 * For more information on schemas, see CreateSchema.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasRequest,
  ListSchemasResponse,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  DatasetSchemaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { nextToken: 0, maxResults: 0 },
    output: {
      schemas: D.list({ creationDateTime: D.ts, lastUpdatedDateTime: D.ts }),
    },
  },
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schemas",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolutionsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of solutions in a given dataset group.
 * When a dataset group is not specified, all the solutions associated with the account are listed.
 * The response provides the properties for each solution, including the Amazon Resource Name (ARN).
 * For more information on solutions, see CreateSolution.
 */
export const listSolutions: API.PaginatedOperationMethod<
  ListSolutionsRequest,
  ListSolutionsResponse,
  ListSolutionsError,
  Credentials | HttpClient.HttpClient,
  SolutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { datasetGroupArn: 0, nextToken: 0, maxResults: 0 },
    output: {
      solutions: D.list({ creationDateTime: D.ts, lastUpdatedDateTime: D.ts }),
    },
  },
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "solutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolutionVersionsError =
  | InvalidInputException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of solution versions for the given solution. When a solution is not
 * specified, all the solution versions associated with the account are listed. The response
 * provides the properties for each solution version, including the Amazon Resource Name (ARN).
 */
export const listSolutionVersions: API.PaginatedOperationMethod<
  ListSolutionVersionsRequest,
  ListSolutionVersionsResponse,
  ListSolutionVersionsError,
  Credentials | HttpClient.HttpClient,
  SolutionVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { solutionArn: 0, nextToken: 0, maxResults: 0 },
    output: { solutionVersions: D.list(o_SolutionVersionSummary) },
  },
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolutionVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "solutionVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Get a list of tags attached to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { resourceArn: 0 },
    output: { tags: D.list({ tagKey: D.secret, tagValue: D.secret }) },
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type StartRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a recommender that is INACTIVE. Starting a recommender does not
 * create any new models, but resumes billing and automatic retraining for the recommender.
 */
export const startRecommender: API.OperationMethod<
  StartRecommenderRequest,
  StartRecommenderResponse,
  StartRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { recommenderArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommender",
})) as any;

export type StopRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a recommender that is ACTIVE. Stopping a recommender halts billing and automatic retraining for the recommender.
 */
export const stopRecommender: API.OperationMethod<
  StopRecommenderRequest,
  StopRecommenderResponse,
  StopRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { recommenderArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRecommender",
})) as any;

export type StopSolutionVersionCreationError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops creating a solution version that is in a state of CREATE_PENDING or CREATE IN_PROGRESS.
 *
 * Depending on the current state of the solution version, the solution version state changes as follows:
 *
 * - CREATE_PENDING > CREATE_STOPPED
 *
 * or
 *
 * - CREATE_IN_PROGRESS > CREATE_STOPPING > CREATE_STOPPED
 *
 * You are billed for all of the training completed up
 * until you stop the solution version creation. You cannot resume creating a solution version once it has been stopped.
 */
export const stopSolutionVersionCreation: API.OperationMethod<
  StopSolutionVersionCreationRequest,
  StopSolutionVersionCreationResponse,
  StopSolutionVersionCreationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { solutionVersionArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSolutionVersionCreation",
})) as any;

export type TagResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Add a list of tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagKeysException
  | CommonErrors;
/**
 * Removes the specified tags that are attached to a resource. For more information, see Removing tags from Amazon Personalize resources.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagKeysException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateCampaignError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a campaign to deploy a retrained solution version with an existing campaign, change your campaign's `minProvisionedTPS`,
 * or modify your campaign's configuration. For example, you can set `enableMetadataWithRecommendations` to true for an existing campaign.
 *
 * To update a campaign to start automatically using the latest solution version, specify the following:
 *
 * - For the `SolutionVersionArn` parameter, specify the Amazon Resource Name (ARN) of your solution in
 * `SolutionArn/$LATEST` format.
 *
 * - In the `campaignConfig`, set `syncWithLatestSolutionVersion` to `true`.
 *
 * To update a campaign, the campaign status must be ACTIVE or CREATE FAILED.
 * Check the campaign status using the DescribeCampaign operation.
 *
 * You can still get recommendations from a campaign while an update is in progress.
 * The campaign will use the previous solution version and campaign configuration to generate recommendations until the latest campaign update status is `Active`.
 *
 * For more information about updating a campaign, including code samples, see Updating a campaign.
 * For more information about campaigns, see Creating a campaign.
 */
export const updateCampaign: API.OperationMethod<
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  UpdateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      campaignArn: 0,
      solutionVersionArn: 0,
      minProvisionedTPS: 0,
      campaignConfig: i_CampaignConfig,
    },
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
})) as any;

export type UpdateDatasetError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Update a dataset to replace its schema with a new or existing one. For more information, see Replacing a dataset's schema.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { datasetArn: 0, schemaArn: 0 } },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
})) as any;

export type UpdateMetricAttributionError =
  | InvalidInputException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a metric attribution.
 */
export const updateMetricAttribution: API.OperationMethod<
  UpdateMetricAttributionRequest,
  UpdateMetricAttributionResponse,
  UpdateMetricAttributionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      addMetrics: D.list(i_MetricAttribute),
      removeMetrics: 0,
      metricsOutputConfig: i_MetricAttributionOutput,
      metricAttributionArn: 0,
    },
  },
  errors: [
    InvalidInputException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMetricAttribution",
})) as any;

export type UpdateRecommenderError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the recommender to modify the recommender configuration.
 * If you update the recommender to modify the columns used in training, Amazon Personalize automatically starts a full retraining of
 * the models backing your recommender. While the update completes, you can still get recommendations from the recommender. The recommender
 * uses the previous configuration until the update completes.
 * To track the status of this update,
 * use the `latestRecommenderUpdate` returned in the DescribeRecommender
 * operation.
 */
export const updateRecommender: API.OperationMethod<
  UpdateRecommenderRequest,
  UpdateRecommenderResponse,
  UpdateRecommenderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { recommenderArn: 0, recommenderConfig: i_RecommenderConfig },
  },
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommender",
})) as any;

export type UpdateSolutionError =
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an Amazon Personalize solution to use a different automatic training configuration. When you update a solution,
 * you can change whether the solution uses
 * automatic training, and you can change the training frequency. For more information about updating a solution, see
 * Updating a solution.
 *
 * A solution update can be in one of the
 * following states:
 *
 * CREATE PENDING > CREATE IN_PROGRESS > ACTIVE -or- CREATE FAILED
 *
 * To get the status of a solution update, call the
 * DescribeSolution API operation and find the status
 * in the `latestSolutionUpdate`.
 */
export const updateSolution: API.OperationMethod<
  UpdateSolutionRequest,
  UpdateSolutionResponse,
  UpdateSolutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      solutionArn: 0,
      performAutoTraining: 0,
      performIncrementalUpdate: 0,
      solutionUpdateConfig: {
        autoTrainingConfig: i_AutoTrainingConfig,
        eventsConfig: i_EventsConfig,
      },
    },
  },
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolution",
})) as any;

const i_AutoTrainingConfig: D.LazyStruct = () => ({ schedulingExpression: 0 });
const i_CampaignConfig: D.LazyStruct = () => ({
  itemExplorationConfig: 0,
  enableMetadataWithRecommendations: 0,
  syncWithLatestSolutionVersion: 0,
  rankingInfluence: 0,
});
const i_DataSource: D.LazyStruct = () => ({ dataLocation: 0 });
const i_EventsConfig: D.LazyStruct = () => ({
  eventParametersList: D.list({
    eventType: 0,
    eventValueThreshold: 0,
    weight: 0,
  }),
});
const i_MetricAttribute: D.LazyStruct = () => ({
  eventType: 0,
  metricName: 0,
  expression: 0,
});
const i_MetricAttributionOutput: D.LazyStruct = () => ({
  s3DataDestination: i_S3DataConfig,
  roleArn: 0,
});
const i_RecommenderConfig: D.LazyStruct = () => ({
  itemExplorationConfig: 0,
  minRecommendationRequestsPerSecond: 0,
  trainingDataConfig: i_TrainingDataConfig,
  enableMetadataWithRecommendations: 0,
});
const i_S3DataConfig: D.LazyStruct = () => ({ path: 0, kmsKeyArn: 0 });
const i_Tag: D.LazyStruct = () => ({ tagKey: 0, tagValue: 0 });
const i_TrainingDataConfig: D.LazyStruct = () => ({
  excludedDatasetColumns: 0,
  includedDatasetColumns: 0,
});
const o_SolutionVersionSummary: D.LazyStruct = () => ({
  creationDateTime: D.ts,
  lastUpdatedDateTime: D.ts,
});
