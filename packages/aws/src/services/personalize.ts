import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Personalize",
  serviceShapeName: "AmazonPersonalize",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "personalize" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-22");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://personalize.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://personalize.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://personalize.{R}.{D}","properties":{},"headers":{}}');

export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError, C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagKeysException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagKeysException>()(
    "TooManyTagKeysException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type BatchInferenceJobMode = "BATCH_INFERENCE" | "THEME_GENERATION" | (string & {});
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
export type FeatureTransformationParameters = { [key: string]: string | undefined };
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
export type ObjectiveSensitivity = "LOW" | "MEDIUM" | "HIGH" | "OFF" | (string & {});
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
export type DefaultIntegerHyperParameterRanges = DefaultIntegerHyperParameterRange[];
export interface DefaultContinuousHyperParameterRange {
  name?: string;
  minValue?: number;
  maxValue?: number;
  isTunable?: boolean;
}
export type DefaultContinuousHyperParameterRanges = DefaultContinuousHyperParameterRange[];
export interface DefaultCategoricalHyperParameterRange {
  name?: string;
  values?: string[];
  isTunable?: boolean;
}
export type DefaultCategoricalHyperParameterRanges = DefaultCategoricalHyperParameterRange[];
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
  input: __S(1392, __c87, 0) as any as S.Schema<CreateBatchInferenceJobRequest>,
  output: __S(1393, __c87, 1) as any as S.Schema<CreateBatchInferenceJobResponse>,
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
}));

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
  input: __S(1520, __c95, 0) as any as S.Schema<CreateBatchSegmentJobRequest>,
  output: __S(1521, __c95, 1) as any as S.Schema<CreateBatchSegmentJobResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateCampaignRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<CreateCampaignResponse>,
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
}));

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
 * on the users' data and no longer considers the users when generating user segments.
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
  input: __S(48, __c3, 0) as any as S.Schema<CreateDataDeletionJobRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateDataDeletionJobResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<CreateDatasetRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateDatasetResponse>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<CreateDatasetExportJobRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<CreateDatasetExportJobResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<CreateDatasetGroupRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<CreateDatasetGroupResponse>,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetGroup",
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<CreateDatasetImportJobRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<CreateDatasetImportJobResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<CreateEventTrackerRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<CreateEventTrackerResponse>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<CreateFilterRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<CreateFilterResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<CreateMetricAttributionRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<CreateMetricAttributionResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<CreateRecommenderRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<CreateRecommenderResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<CreateSchemaRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<CreateSchemaResponse>,
  errors: [InvalidInputException, LimitExceededException, ResourceAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<CreateSolutionRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<CreateSolutionResponse>,
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
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<CreateSolutionVersionRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<CreateSolutionVersionResponse>,
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
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<DeleteCampaignRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteCampaignResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

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
  input: __S(464, __c29, 0) as any as S.Schema<DeleteDatasetRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteDatasetResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

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
  input: __S(480, __c30, 0) as any as S.Schema<DeleteDatasetGroupRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteDatasetGroupResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetGroup",
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<DeleteEventTrackerRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteEventTrackerResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventTracker",
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<DeleteFilterRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteFilterResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFilter",
}));

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
  input: __S(528, __c33, 0) as any as S.Schema<DeleteMetricAttributionRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteMetricAttributionResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricAttribution",
}));

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
  input: __S(544, __c34, 0) as any as S.Schema<DeleteRecommenderRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteRecommenderResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommender",
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<DeleteSchemaRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteSchemaResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<DeleteSolutionRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteSolutionResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolution",
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<DescribeAlgorithmRequest>,
  output: __S(600, __c37, 8) as any as S.Schema<DescribeAlgorithmResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlgorithm",
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<DescribeBatchInferenceJobRequest>,
  output: __S(610, __c38, 2) as any as S.Schema<DescribeBatchInferenceJobResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchInferenceJob",
}));

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
  input: __S(624, __c39, 0) as any as S.Schema<DescribeBatchSegmentJobRequest>,
  output: __S(626, __c39, 2) as any as S.Schema<DescribeBatchSegmentJobResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchSegmentJob",
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<DescribeCampaignRequest>,
  output: __S(643, __c40, 3) as any as S.Schema<DescribeCampaignResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<DescribeDataDeletionJobRequest>,
  output: __S(658, __c41, 2) as any as S.Schema<DescribeDataDeletionJobResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataDeletionJob",
}));

export type DescribeDatasetError = InvalidInputException | ResourceNotFoundException | CommonErrors;
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
  input: __S(672, __c42, 0) as any as S.Schema<DescribeDatasetRequest>,
  output: __S(675, __c42, 3) as any as S.Schema<DescribeDatasetResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<DescribeDatasetExportJobRequest>,
  output: __S(690, __c43, 2) as any as S.Schema<DescribeDatasetExportJobResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetExportJob",
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<DescribeDatasetGroupRequest>,
  output: __S(706, __c44, 2) as any as S.Schema<DescribeDatasetGroupResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetGroup",
}));

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
  input: __S(720, __c45, 0) as any as S.Schema<DescribeDatasetImportJobRequest>,
  output: __S(722, __c45, 2) as any as S.Schema<DescribeDatasetImportJobResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetImportJob",
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<DescribeEventTrackerRequest>,
  output: __S(738, __c46, 2) as any as S.Schema<DescribeEventTrackerResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventTracker",
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<DescribeFeatureTransformationRequest>,
  output: __S(754, __c47, 2) as any as S.Schema<DescribeFeatureTransformationResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFeatureTransformation",
}));

export type DescribeFilterError = InvalidInputException | ResourceNotFoundException | CommonErrors;
/**
 * Describes a filter's properties.
 */
export const describeFilter: API.OperationMethod<
  DescribeFilterRequest,
  DescribeFilterResponse,
  DescribeFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<DescribeFilterRequest>,
  output: __S(770, __c48, 2) as any as S.Schema<DescribeFilterResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFilter",
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<DescribeMetricAttributionRequest>,
  output: __S(786, __c49, 2) as any as S.Schema<DescribeMetricAttributionResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricAttribution",
}));

export type DescribeRecipeError = InvalidInputException | ResourceNotFoundException | CommonErrors;
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
  input: __S(800, __c50, 0) as any as S.Schema<DescribeRecipeRequest>,
  output: __S(802, __c50, 2) as any as S.Schema<DescribeRecipeResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecipe",
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<DescribeRecommenderRequest>,
  output: __S(819, __c51, 3) as any as S.Schema<DescribeRecommenderResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecommender",
}));

export type DescribeSchemaError = InvalidInputException | ResourceNotFoundException | CommonErrors;
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
  input: __S(848, __c53, 0) as any as S.Schema<DescribeSchemaRequest>,
  output: __S(850, __c53, 2) as any as S.Schema<DescribeSchemaResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchema",
}));

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
  input: __S(864, __c54, 0) as any as S.Schema<DescribeSolutionRequest>,
  output: __S(868, __c54, 4) as any as S.Schema<DescribeSolutionResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSolution",
}));

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
  input: __S(912, __c57, 0) as any as S.Schema<DescribeSolutionVersionRequest>,
  output: __S(915, __c57, 3) as any as S.Schema<DescribeSolutionVersionResponse>,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSolutionVersion",
}));

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
  input: __S(928, __c58, 0) as any as S.Schema<GetSolutionMetricsRequest>,
  output: __S(929, __c58, 1) as any as S.Schema<GetSolutionMetricsResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolutionMetrics",
}));

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
  input: __S(944, __c59, 0) as any as S.Schema<ListBatchInferenceJobsRequest>,
  output: __S(947, __c59, 3) as any as S.Schema<ListBatchInferenceJobsResponse>,
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
  input: __S(960, __c60, 0) as any as S.Schema<ListBatchSegmentJobsRequest>,
  output: __S(963, __c60, 3) as any as S.Schema<ListBatchSegmentJobsResponse>,
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

export type ListCampaignsError = InvalidInputException | InvalidNextTokenException | CommonErrors;
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
  input: __S(976, __c61, 0) as any as S.Schema<ListCampaignsRequest>,
  output: __S(979, __c61, 3) as any as S.Schema<ListCampaignsResponse>,
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
  input: __S(992, __c62, 0) as any as S.Schema<ListDataDeletionJobsRequest>,
  output: __S(995, __c62, 3) as any as S.Schema<ListDataDeletionJobsResponse>,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataDeletionJobs",
}));

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
  input: __S(1008, __c63, 0) as any as S.Schema<ListDatasetExportJobsRequest>,
  output: __S(1011, __c63, 3) as any as S.Schema<ListDatasetExportJobsResponse>,
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
  input: __S(1024, __c64, 0) as any as S.Schema<ListDatasetGroupsRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<ListDatasetGroupsResponse>,
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
  input: __S(1040, __c65, 0) as any as S.Schema<ListDatasetImportJobsRequest>,
  output: __S(1043, __c65, 3) as any as S.Schema<ListDatasetImportJobsResponse>,
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

export type ListDatasetsError = InvalidInputException | InvalidNextTokenException | CommonErrors;
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
  input: __S(1056, __c66, 0) as any as S.Schema<ListDatasetsRequest>,
  output: __S(1059, __c66, 3) as any as S.Schema<ListDatasetsResponse>,
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
  input: __S(1072, __c67, 0) as any as S.Schema<ListEventTrackersRequest>,
  output: __S(1075, __c67, 3) as any as S.Schema<ListEventTrackersResponse>,
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

export type ListFiltersError = InvalidInputException | InvalidNextTokenException | CommonErrors;
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
  input: __S(1088, __c68, 0) as any as S.Schema<ListFiltersRequest>,
  output: __S(1091, __c68, 3) as any as S.Schema<ListFiltersResponse>,
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
  input: __S(1104, __c69, 0) as any as S.Schema<ListMetricAttributionMetricsRequest>,
  output: __S(1105, __c69, 1) as any as S.Schema<ListMetricAttributionMetricsResponse>,
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
  input: __S(1120, __c70, 0) as any as S.Schema<ListMetricAttributionsRequest>,
  output: __S(1123, __c70, 3) as any as S.Schema<ListMetricAttributionsResponse>,
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

export type ListRecipesError = InvalidInputException | InvalidNextTokenException | CommonErrors;
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
  input: __S(1136, __c71, 0) as any as S.Schema<ListRecipesRequest>,
  output: __S(1139, __c71, 3) as any as S.Schema<ListRecipesResponse>,
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
  input: __S(1152, __c72, 0) as any as S.Schema<ListRecommendersRequest>,
  output: __S(1155, __c72, 3) as any as S.Schema<ListRecommendersResponse>,
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
  input: __S(1168, __c73, 0) as any as S.Schema<ListSchemasRequest>,
  output: __S(1171, __c73, 3) as any as S.Schema<ListSchemasResponse>,
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

export type ListSolutionsError = InvalidInputException | InvalidNextTokenException | CommonErrors;
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
  input: __S(1184, __c74, 0) as any as S.Schema<ListSolutionsRequest>,
  output: __S(1187, __c74, 3) as any as S.Schema<ListSolutionsResponse>,
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
  input: __S(1200, __c75, 0) as any as S.Schema<ListSolutionVersionsRequest>,
  output: __S(1202, __c75, 2) as any as S.Schema<ListSolutionVersionsResponse>,
  errors: [InvalidInputException, InvalidNextTokenException, ResourceNotFoundException],
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
  input: __S(1216, __c76, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1217, __c76, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(1232, __c77, 0) as any as S.Schema<StartRecommenderRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<StartRecommenderResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartRecommender",
}));

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
  input: __S(1248, __c78, 0) as any as S.Schema<StopRecommenderRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<StopRecommenderResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRecommender",
}));

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
  input: __S(1264, __c79, 0) as any as S.Schema<StopSolutionVersionCreationRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<StopSolutionVersionCreationResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSolutionVersionCreation",
}));

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
  input: __S(1280, __c80, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1297, __c81, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagKeysException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1312, __c82, 0) as any as S.Schema<UpdateCampaignRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<UpdateCampaignResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
}));

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
  input: __S(1328, __c83, 0) as any as S.Schema<UpdateDatasetRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<UpdateDatasetResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
}));

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
  input: __S(1344, __c84, 0) as any as S.Schema<UpdateMetricAttributionRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<UpdateMetricAttributionResponse>,
  errors: [
    InvalidInputException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMetricAttribution",
}));

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
  input: __S(1360, __c85, 0) as any as S.Schema<UpdateRecommenderRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<UpdateRecommenderResponse>,
  errors: [InvalidInputException, ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommender",
}));

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
  input: __S(1376, __c86, 0) as any as S.Schema<UpdateSolutionRequest>,
  output: __S(400, __c25, 0) as any as S.Schema<UpdateSolutionResponse>,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolution",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          solutionVersionArn: S.String,
          minProvisionedTPS: S.optional(S.Number),
          campaignConfig: S.optional(__S(16, __c1, 0)),
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCampaignRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          itemExplorationConfig: S.optional(__S(1408, __c88, 0)),
          enableMetadataWithRecommendations: S.optional(S.Boolean),
          syncWithLatestSolutionVersion: S.optional(S.Boolean),
          rankingInfluence: S.optional(__S(1424, __c89, 0)),
        }),
      ).annotate({ identifier: "CampaignConfig" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ campaignArn: S.optional(S.String) })).annotate({
        identifier: "CreateCampaignResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          datasetGroupArn: S.String,
          dataSource: __S(64, __c4, 0),
          roleArn: S.String,
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataDeletionJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ dataDeletionJobArn: S.optional(S.String) })).annotate({
        identifier: "CreateDataDeletionJobResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ dataLocation: S.optional(S.String) })).annotate({
        identifier: "DataSource",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          schemaArn: S.String,
          datasetGroupArn: S.String,
          datasetType: S.String,
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatasetRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ datasetArn: S.optional(S.String) })).annotate({
        identifier: "CreateDatasetResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          datasetArn: S.String,
          ingestionMode: S.optional(S.String),
          roleArn: S.String,
          jobOutput: __S(1488, __c93, 0),
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatasetExportJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ datasetExportJobArn: S.optional(S.String) })).annotate({
        identifier: "CreateDatasetExportJobResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          roleArn: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          domain: S.optional(S.String),
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatasetGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ datasetGroupArn: S.optional(S.String), domain: S.optional(S.String) }),
      ).annotate({ identifier: "CreateDatasetGroupResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          datasetArn: S.String,
          dataSource: __S(64, __c4, 0),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(1457, __c91, 1)),
          importMode: S.optional(S.String),
          publishAttributionMetricsToS3: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatasetImportJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ datasetImportJobArn: S.optional(S.String) })).annotate({
        identifier: "CreateDatasetImportJobResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          datasetGroupArn: S.String,
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventTrackerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ eventTrackerArn: S.optional(S.String), trackingId: S.optional(S.String) }),
      ).annotate({ identifier: "CreateEventTrackerResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          datasetGroupArn: S.String,
          filterExpression: SensitiveString,
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFilterRequest" });
    case 1:
      return S.suspend(() => S.Struct({ filterArn: S.optional(S.String) })).annotate({
        identifier: "CreateFilterResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          datasetGroupArn: S.String,
          metrics: __S(225, __c14, 1),
          metricsOutputConfig: __S(208, __c13, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMetricAttributionRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ s3DataDestination: S.optional(__S(1472, __c92, 0)), roleArn: S.String }),
      ).annotate({ identifier: "MetricAttributionOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventType: S.String, metricName: S.String, expression: S.String }),
      ).annotate({ identifier: "MetricAttribute" });
    case 1:
      return S.Array(__S(224, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ metricAttributionArn: S.optional(S.String) })).annotate({
        identifier: "CreateMetricAttributionResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          datasetGroupArn: S.String,
          recipeArn: S.String,
          recommenderConfig: S.optional(__S(304, __c19, 0)),
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRecommenderRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(272, __c17, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          excludedDatasetColumns: S.optional(__S(288, __c18, 0)),
          includedDatasetColumns: S.optional(__S(288, __c18, 0)),
        }),
      ).annotate({ identifier: "TrainingDataConfig" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          itemExplorationConfig: S.optional(__S(1408, __c88, 0)),
          minRecommendationRequestsPerSecond: S.optional(S.Number),
          trainingDataConfig: S.optional(__S(289, __c18, 1)),
          enableMetadataWithRecommendations: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RecommenderConfig" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ recommenderArn: S.optional(S.String) })).annotate({
        identifier: "CreateRecommenderResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, schema: S.String, domain: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSchemaRequest" });
    case 1:
      return S.suspend(() => S.Struct({ schemaArn: S.optional(S.String) })).annotate({
        identifier: "CreateSchemaResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          performHPO: S.optional(S.Boolean),
          performAutoML: S.optional(S.Boolean),
          performAutoTraining: S.optional(S.Boolean),
          performIncrementalUpdate: S.optional(S.Boolean),
          recipeArn: S.optional(S.String),
          datasetGroupArn: S.String,
          eventType: S.optional(S.String),
          solutionConfig: S.optional(__S(378, __c23, 10)),
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSolutionRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          metricName: S.optional(S.String),
          metricRegex: S.optional(S.String),
        }),
      ).annotate({ identifier: "HPOObjective" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          maxNumberOfTrainingJobs: S.optional(S.String),
          maxParallelTrainingJobs: S.optional(S.String),
        }),
      ).annotate({ identifier: "HPOResourceConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          minValue: S.optional(S.Number),
          maxValue: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IntegerHyperParameterRange" });
    case 3:
      return S.Array(__S(370, __c23, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(272, __c17, 0)) }),
      ).annotate({ identifier: "CategoricalHyperParameterRange" });
    case 5:
      return S.Array(__S(372, __c23, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          integerHyperParameterRanges: S.optional(__S(371, __c23, 3)),
          continuousHyperParameterRanges: S.optional(__S(371, __c23, 3)),
          categoricalHyperParameterRanges: S.optional(__S(373, __c23, 5)),
        }),
      ).annotate({ identifier: "HyperParameterRanges" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          hpoObjective: S.optional(__S(368, __c23, 0)),
          hpoResourceConfig: S.optional(__S(369, __c23, 1)),
          algorithmHyperParameterRanges: S.optional(__S(374, __c23, 6)),
        }),
      ).annotate({ identifier: "HPOConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({ metricName: S.optional(S.String), recipeList: S.optional(__S(272, __c17, 0)) }),
      ).annotate({ identifier: "AutoMLConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          itemAttribute: S.optional(S.String),
          objectiveSensitivity: S.optional(S.String),
        }),
      ).annotate({ identifier: "OptimizationObjective" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          eventValueThreshold: S.optional(S.String),
          hpoConfig: S.optional(__S(375, __c23, 7)),
          algorithmHyperParameters: S.optional(__S(1408, __c88, 0)),
          featureTransformationParameters: S.optional(__S(1408, __c88, 0)),
          autoMLConfig: S.optional(__S(376, __c23, 8)),
          eventsConfig: S.optional(__S(386, __c24, 2)),
          optimizationObjective: S.optional(__S(377, __c23, 9)),
          trainingDataConfig: S.optional(__S(289, __c18, 1)),
          autoTrainingConfig: S.optional(__S(387, __c24, 3)),
        }),
      ).annotate({ identifier: "SolutionConfig" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventType: S.optional(S.String),
          eventValueThreshold: S.optional(S.Number),
          weight: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EventParameters" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ eventParametersList: S.optional(__S(385, __c24, 1)) }),
      ).annotate({ identifier: "EventsConfig" });
    case 3:
      return S.suspend(() => S.Struct({ schedulingExpression: S.optional(S.String) })).annotate({
        identifier: "AutoTrainingConfig",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ solutionArn: S.optional(S.String) })).annotate({
        identifier: "CreateSolutionResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          solutionArn: S.String,
          trainingMode: S.optional(S.String),
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSolutionVersionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ solutionVersionArn: S.optional(S.String) })).annotate({
        identifier: "CreateSolutionVersionResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ campaignArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCampaignRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteCampaignResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDatasetRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetGroupArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDatasetGroupRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventTrackerArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventTrackerRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filterArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFilterRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricAttributionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMetricAttributionRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommenderArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRecommenderRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ schemaArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSchemaRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ solutionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSolutionRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ algorithmArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAlgorithmRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), dockerURI: S.String }),
      ).annotate({ identifier: "AlgorithmImage" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          minValue: S.optional(S.Number),
          maxValue: S.optional(S.Number),
          isTunable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DefaultIntegerHyperParameterRange" });
    case 3:
      return S.Array(__S(594, __c37, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          values: S.optional(__S(272, __c17, 0)),
          isTunable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DefaultCategoricalHyperParameterRange" });
    case 5:
      return S.Array(__S(596, __c37, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          integerHyperParameterRanges: S.optional(__S(595, __c37, 3)),
          continuousHyperParameterRanges: S.optional(__S(595, __c37, 3)),
          categoricalHyperParameterRanges: S.optional(__S(597, __c37, 5)),
        }),
      ).annotate({ identifier: "DefaultHyperParameterRanges" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          algorithmArn: S.optional(S.String),
          algorithmImage: S.optional(__S(593, __c37, 1)),
          defaultHyperParameters: S.optional(__S(1408, __c88, 0)),
          defaultHyperParameterRanges: S.optional(__S(598, __c37, 6)),
          defaultResourceConfig: S.optional(__S(1408, __c88, 0)),
          trainingInputMode: S.optional(S.String),
          roleArn: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Algorithm" });
    case 8:
      return S.suspend(() => S.Struct({ algorithm: S.optional(__S(599, __c37, 7)) })).annotate({
        identifier: "DescribeAlgorithmResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ batchInferenceJobArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeBatchInferenceJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          batchInferenceJobArn: S.optional(S.String),
          filterArn: S.optional(S.String),
          failureReason: S.optional(S.String),
          solutionVersionArn: S.optional(S.String),
          numResults: S.optional(S.Number),
          jobInput: S.optional(__S(1504, __c94, 0)),
          jobOutput: S.optional(__S(1488, __c93, 0)),
          batchInferenceJobConfig: S.optional(__S(1440, __c90, 0)),
          roleArn: S.optional(S.String),
          batchInferenceJobMode: S.optional(S.String),
          themeGenerationConfig: S.optional(__S(1442, __c90, 2)),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BatchInferenceJob" });
    case 2:
      return S.suspend(() =>
        S.Struct({ batchInferenceJob: S.optional(__S(609, __c38, 1)) }),
      ).annotate({ identifier: "DescribeBatchInferenceJobResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ batchSegmentJobArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeBatchSegmentJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          batchSegmentJobArn: S.optional(S.String),
          filterArn: S.optional(S.String),
          failureReason: S.optional(S.String),
          solutionVersionArn: S.optional(S.String),
          numResults: S.optional(S.Number),
          jobInput: S.optional(__S(1504, __c94, 0)),
          jobOutput: S.optional(__S(1488, __c93, 0)),
          roleArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BatchSegmentJob" });
    case 2:
      return S.suspend(() =>
        S.Struct({ batchSegmentJob: S.optional(__S(625, __c39, 1)) }),
      ).annotate({ identifier: "DescribeBatchSegmentJobResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ campaignArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCampaignRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          solutionVersionArn: S.optional(S.String),
          minProvisionedTPS: S.optional(S.Number),
          campaignConfig: S.optional(__S(16, __c1, 0)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CampaignUpdateSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          campaignArn: S.optional(S.String),
          solutionVersionArn: S.optional(S.String),
          minProvisionedTPS: S.optional(S.Number),
          campaignConfig: S.optional(__S(16, __c1, 0)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          latestCampaignUpdate: S.optional(__S(641, __c40, 1)),
        }),
      ).annotate({ identifier: "Campaign" });
    case 3:
      return S.suspend(() => S.Struct({ campaign: S.optional(__S(642, __c40, 2)) })).annotate({
        identifier: "DescribeCampaignResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dataDeletionJobArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDataDeletionJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          dataDeletionJobArn: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          dataSource: S.optional(__S(64, __c4, 0)),
          roleArn: S.optional(S.String),
          status: S.optional(S.String),
          numDeleted: S.optional(S.Number),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataDeletionJob" });
    case 2:
      return S.suspend(() =>
        S.Struct({ dataDeletionJob: S.optional(__S(657, __c41, 1)) }),
      ).annotate({ identifier: "DescribeDataDeletionJobResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          schemaArn: S.optional(S.String),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DatasetUpdateSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          datasetArn: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          datasetType: S.optional(S.String),
          schemaArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          latestDatasetUpdate: S.optional(__S(673, __c42, 1)),
          trackingId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Dataset" });
    case 3:
      return S.suspend(() => S.Struct({ dataset: S.optional(__S(674, __c42, 2)) })).annotate({
        identifier: "DescribeDatasetResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetExportJobArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDatasetExportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          datasetExportJobArn: S.optional(S.String),
          datasetArn: S.optional(S.String),
          ingestionMode: S.optional(S.String),
          roleArn: S.optional(S.String),
          status: S.optional(S.String),
          jobOutput: S.optional(__S(1488, __c93, 0)),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatasetExportJob" });
    case 2:
      return S.suspend(() =>
        S.Struct({ datasetExportJob: S.optional(__S(689, __c43, 1)) }),
      ).annotate({ identifier: "DescribeDatasetExportJobResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetGroupArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDatasetGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          status: S.optional(S.String),
          roleArn: S.optional(S.String),
          kmsKeyArn: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
          domain: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatasetGroup" });
    case 2:
      return S.suspend(() => S.Struct({ datasetGroup: S.optional(__S(705, __c44, 1)) })).annotate({
        identifier: "DescribeDatasetGroupResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetImportJobArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDatasetImportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobName: S.optional(S.String),
          datasetImportJobArn: S.optional(S.String),
          datasetArn: S.optional(S.String),
          dataSource: S.optional(__S(64, __c4, 0)),
          roleArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
          importMode: S.optional(S.String),
          publishAttributionMetricsToS3: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DatasetImportJob" });
    case 2:
      return S.suspend(() =>
        S.Struct({ datasetImportJob: S.optional(__S(721, __c45, 1)) }),
      ).annotate({ identifier: "DescribeDatasetImportJobResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventTrackerArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEventTrackerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          eventTrackerArn: S.optional(S.String),
          accountId: S.optional(S.String),
          trackingId: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EventTracker" });
    case 2:
      return S.suspend(() => S.Struct({ eventTracker: S.optional(__S(737, __c46, 1)) })).annotate({
        identifier: "DescribeEventTrackerResponse",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ featureTransformationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFeatureTransformationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          featureTransformationArn: S.optional(S.String),
          defaultParameters: S.optional(__S(1408, __c88, 0)),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "FeatureTransformation" });
    case 2:
      return S.suspend(() =>
        S.Struct({ featureTransformation: S.optional(__S(753, __c47, 1)) }),
      ).annotate({ identifier: "DescribeFeatureTransformationResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ filterArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFilterRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          filterArn: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          datasetGroupArn: S.optional(S.String),
          failureReason: S.optional(S.String),
          filterExpression: S.optional(SensitiveString),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.suspend(() => S.Struct({ filter: S.optional(__S(769, __c48, 1)) })).annotate({
        identifier: "DescribeFilterResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricAttributionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeMetricAttributionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          metricAttributionArn: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          metricsOutputConfig: S.optional(__S(208, __c13, 0)),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricAttribution" });
    case 2:
      return S.suspend(() =>
        S.Struct({ metricAttribution: S.optional(__S(785, __c49, 1)) }),
      ).annotate({ identifier: "DescribeMetricAttributionResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recipeArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRecipeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          recipeArn: S.optional(S.String),
          algorithmArn: S.optional(S.String),
          featureTransformationArn: S.optional(S.String),
          status: S.optional(S.String),
          description: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          recipeType: S.optional(S.String),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Recipe" });
    case 2:
      return S.suspend(() => S.Struct({ recipe: S.optional(__S(801, __c50, 1)) })).annotate({
        identifier: "DescribeRecipeResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommenderArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRecommenderRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommenderConfig: S.optional(__S(304, __c19, 0)),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommenderUpdateSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          recommenderArn: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          name: S.optional(S.String),
          recipeArn: S.optional(S.String),
          recommenderConfig: S.optional(__S(304, __c19, 0)),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          latestRecommenderUpdate: S.optional(__S(817, __c51, 1)),
          modelMetrics: S.optional(__S(832, __c52, 0)),
        }),
      ).annotate({ identifier: "Recommender" });
    case 3:
      return S.suspend(() => S.Struct({ recommender: S.optional(__S(818, __c51, 2)) })).annotate({
        identifier: "DescribeRecommenderResponse",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ schemaArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSchemaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          schemaArn: S.optional(S.String),
          schema: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          domain: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatasetSchema" });
    case 2:
      return S.suspend(() => S.Struct({ schema: S.optional(__S(849, __c53, 1)) })).annotate({
        identifier: "DescribeSchemaResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ solutionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSolutionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ bestRecipeArn: S.optional(S.String) })).annotate({
        identifier: "AutoMLResult",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          solutionUpdateConfig: S.optional(__S(896, __c56, 0)),
          status: S.optional(S.String),
          performAutoTraining: S.optional(S.Boolean),
          performIncrementalUpdate: S.optional(S.Boolean),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "SolutionUpdateSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          solutionArn: S.optional(S.String),
          performHPO: S.optional(S.Boolean),
          performAutoML: S.optional(S.Boolean),
          performAutoTraining: S.optional(S.Boolean),
          performIncrementalUpdate: S.optional(S.Boolean),
          recipeArn: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          eventType: S.optional(S.String),
          solutionConfig: S.optional(__S(378, __c23, 10)),
          autoMLResult: S.optional(__S(865, __c54, 1)),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          latestSolutionVersion: S.optional(__S(880, __c55, 0)),
          latestSolutionUpdate: S.optional(__S(866, __c54, 2)),
        }),
      ).annotate({ identifier: "Solution" });
    case 4:
      return S.suspend(() => S.Struct({ solution: S.optional(__S(867, __c54, 3)) })).annotate({
        identifier: "DescribeSolutionResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          solutionVersionArn: S.optional(S.String),
          status: S.optional(S.String),
          trainingMode: S.optional(S.String),
          trainingType: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "SolutionVersionSummary" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          autoTrainingConfig: S.optional(__S(387, __c24, 3)),
          eventsConfig: S.optional(__S(386, __c24, 2)),
        }),
      ).annotate({ identifier: "SolutionUpdateConfig" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ solutionVersionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeSolutionVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ algorithmHyperParameters: S.optional(__S(1408, __c88, 0)) }),
      ).annotate({ identifier: "TunedHPOParams" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          solutionVersionArn: S.optional(S.String),
          solutionArn: S.optional(S.String),
          performHPO: S.optional(S.Boolean),
          performAutoML: S.optional(S.Boolean),
          performIncrementalUpdate: S.optional(S.Boolean),
          recipeArn: S.optional(S.String),
          eventType: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          solutionConfig: S.optional(__S(378, __c23, 10)),
          trainingHours: S.optional(S.Number),
          trainingMode: S.optional(S.String),
          tunedHPOParams: S.optional(__S(913, __c57, 1)),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          trainingType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SolutionVersion" });
    case 3:
      return S.suspend(() =>
        S.Struct({ solutionVersion: S.optional(__S(914, __c57, 2)) }),
      ).annotate({ identifier: "DescribeSolutionVersionResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ solutionVersionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSolutionMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          solutionVersionArn: S.optional(S.String),
          metrics: S.optional(__S(832, __c52, 0)),
        }),
      ).annotate({ identifier: "GetSolutionMetricsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          solutionVersionArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBatchInferenceJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          batchInferenceJobArn: S.optional(S.String),
          jobName: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
          solutionVersionArn: S.optional(S.String),
          batchInferenceJobMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchInferenceJobSummary" });
    case 2:
      return S.Array(__S(945, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          batchInferenceJobs: S.optional(__S(946, __c59, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBatchInferenceJobsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          solutionVersionArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBatchSegmentJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          batchSegmentJobArn: S.optional(S.String),
          jobName: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
          solutionVersionArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchSegmentJobSummary" });
    case 2:
      return S.Array(__S(961, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          batchSegmentJobs: S.optional(__S(962, __c60, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBatchSegmentJobsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          solutionArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCampaignsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          campaignArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "CampaignSummary" });
    case 2:
      return S.Array(__S(977, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ campaigns: S.optional(__S(978, __c61, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCampaignsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetGroupArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDataDeletionJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dataDeletionJobArn: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          jobName: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataDeletionJobSummary" });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          dataDeletionJobs: S.optional(__S(994, __c62, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDataDeletionJobsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatasetExportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datasetExportJobArn: S.optional(S.String),
          jobName: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatasetExportJobSummary" });
    case 2:
      return S.Array(__S(1009, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          datasetExportJobs: S.optional(__S(1010, __c63, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatasetExportJobsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDatasetGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
          domain: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatasetGroupSummary" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          datasetGroups: S.optional(__S(1026, __c64, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatasetGroupsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatasetImportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          datasetImportJobArn: S.optional(S.String),
          jobName: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
          importMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatasetImportJobSummary" });
    case 2:
      return S.Array(__S(1041, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          datasetImportJobs: S.optional(__S(1042, __c65, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListDatasetImportJobsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetGroupArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatasetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          datasetArn: S.optional(S.String),
          datasetType: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DatasetSummary" });
    case 2:
      return S.Array(__S(1057, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ datasets: S.optional(__S(1058, __c66, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDatasetsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetGroupArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventTrackersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          eventTrackerArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EventTrackerSummary" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          eventTrackers: S.optional(__S(1074, __c67, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListEventTrackersResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetGroupArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFiltersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          filterArn: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          datasetGroupArn: S.optional(S.String),
          failureReason: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "FilterSummary" });
    case 2:
      return S.Array(__S(1089, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Filters: S.optional(__S(1090, __c68, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFiltersResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          metricAttributionArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMetricAttributionMetricsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ metrics: S.optional(__S(225, __c14, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMetricAttributionMetricsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetGroupArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMetricAttributionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          metricAttributionArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          failureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricAttributionSummary" });
    case 2:
      return S.Array(__S(1121, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          metricAttributions: S.optional(__S(1122, __c70, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMetricAttributionsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recipeProvider: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          domain: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecipesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          recipeArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          domain: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecipeSummary" });
    case 2:
      return S.Array(__S(1137, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ recipes: S.optional(__S(1138, __c71, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRecipesResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetGroupArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecommendersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          recommenderArn: S.optional(S.String),
          datasetGroupArn: S.optional(S.String),
          recipeArn: S.optional(S.String),
          recommenderConfig: S.optional(__S(304, __c19, 0)),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RecommenderSummary" });
    case 2:
      return S.Array(__S(1153, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          recommenders: S.optional(__S(1154, __c72, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRecommendersResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSchemasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          schemaArn: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          domain: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatasetSchemaSummary" });
    case 2:
      return S.Array(__S(1169, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ schemas: S.optional(__S(1170, __c73, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSchemasResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          datasetGroupArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSolutionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          solutionArn: S.optional(S.String),
          status: S.optional(S.String),
          creationDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdatedDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          recipeArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "SolutionSummary" });
    case 2:
      return S.Array(__S(1185, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ solutions: S.optional(__S(1186, __c74, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSolutionsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          solutionArn: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSolutionVersionsRequest" });
    case 1:
      return S.Array(__S(880, __c55, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          solutionVersions: S.optional(__S(1201, __c75, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSolutionVersionsResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(1457, __c91, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommenderArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartRecommenderRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommenderArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopRecommenderRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ solutionVersionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopSolutionVersionCreationRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(1457, __c91, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(1296, __c81, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          campaignArn: S.String,
          solutionVersionArn: S.optional(S.String),
          minProvisionedTPS: S.optional(S.Number),
          campaignConfig: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCampaignRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ datasetArn: S.String, schemaArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDatasetRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          addMetrics: S.optional(__S(225, __c14, 1)),
          removeMetrics: S.optional(__S(272, __c17, 0)),
          metricsOutputConfig: S.optional(__S(208, __c13, 0)),
          metricAttributionArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMetricAttributionRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommenderArn: S.String, recommenderConfig: __S(304, __c19, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRecommenderRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          solutionArn: S.String,
          performAutoTraining: S.optional(S.Boolean),
          performIncrementalUpdate: S.optional(S.Boolean),
          solutionUpdateConfig: S.optional(__S(896, __c56, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSolutionRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          solutionVersionArn: S.String,
          filterArn: S.optional(S.String),
          numResults: S.optional(S.Number),
          jobInput: __S(1504, __c94, 0),
          jobOutput: __S(1488, __c93, 0),
          roleArn: S.String,
          batchInferenceJobConfig: S.optional(__S(1440, __c90, 0)),
          tags: S.optional(__S(1457, __c91, 1)),
          batchInferenceJobMode: S.optional(S.String),
          themeGenerationConfig: S.optional(__S(1442, __c90, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBatchInferenceJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ batchInferenceJobArn: S.optional(S.String) })).annotate({
        identifier: "CreateBatchInferenceJobResponse",
      });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          itemExplorationConfig: S.optional(__S(1408, __c88, 0)),
          rankingInfluence: S.optional(__S(1424, __c89, 0)),
        }),
      ).annotate({ identifier: "BatchInferenceJobConfig" });
    case 1:
      return S.suspend(() => S.Struct({ itemName: S.String })).annotate({
        identifier: "FieldsForThemeGeneration",
      });
    case 2:
      return S.suspend(() => S.Struct({ fieldsForThemeGeneration: __S(1441, __c90, 1) })).annotate({
        identifier: "ThemeGenerationConfig",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ tagKey: SensitiveString, tagValue: SensitiveString }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(1456, __c91, 0));
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ path: S.String, kmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "S3DataConfig" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3DataDestination: __S(1472, __c92, 0) })).annotate({
        identifier: "BatchInferenceJobOutput",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3DataSource: __S(1472, __c92, 0) })).annotate({
        identifier: "BatchInferenceJobInput",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          solutionVersionArn: S.String,
          filterArn: S.optional(S.String),
          numResults: S.optional(S.Number),
          jobInput: __S(1504, __c94, 0),
          jobOutput: __S(1488, __c93, 0),
          roleArn: S.String,
          tags: S.optional(__S(1457, __c91, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBatchSegmentJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ batchSegmentJobArn: S.optional(S.String) })).annotate({
        identifier: "CreateBatchSegmentJobResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
