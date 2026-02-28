// ==========================================================================
// BigQuery API (bigquery v2)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "bigquery",
  version: "v2",
  rootUrl: "https://bigquery.googleapis.com/",
  servicePath: "bigquery/v2/",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface MaterializedViewDefinition {
  /** Output only. The time when this materialized view was last refreshed, in milliseconds since the epoch. */
  lastRefreshTime?: string;
  /** Optional. Enable automatic refresh of the materialized view when the base table is updated. The default value is "true". */
  enableRefresh?: boolean;
  /** Optional. The maximum frequency at which this materialized view will be refreshed. The default value is "1800000" (30 minutes). */
  refreshIntervalMs?: string;
  /** Optional. This option declares the intention to construct a materialized view that isn't refreshed incrementally. Non-incremental materialized views support an expanded range of SQL queries. The `allow_non_incremental_definition` option can't be changed after the materialized view is created. */
  allowNonIncrementalDefinition?: boolean;
  /** Required. A query whose results are persisted. */
  query?: string;
  /** [Optional] Max staleness of data that could be returned when materizlized view is queried (formatted as Google SQL Interval type). */
  maxStaleness?: string;
}

export const MaterializedViewDefinition: Schema.Schema<MaterializedViewDefinition> = Schema.suspend(() => Schema.Struct({
  lastRefreshTime: Schema.optional(Schema.String),
  enableRefresh: Schema.optional(Schema.Boolean),
  refreshIntervalMs: Schema.optional(Schema.String),
  allowNonIncrementalDefinition: Schema.optional(Schema.Boolean),
  query: Schema.optional(Schema.String),
  maxStaleness: Schema.optional(Schema.String),
})).annotate({ identifier: "MaterializedViewDefinition" }) as any as Schema.Schema<MaterializedViewDefinition>;

export interface ProjectReference {
  /** Required. ID of the project. Can be either the numeric ID or the assigned ID of the project. */
  projectId?: string;
}

export const ProjectReference: Schema.Schema<ProjectReference> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "ProjectReference" }) as any as Schema.Schema<ProjectReference>;

export interface ProjectList {
  /** The resource type of the response. */
  kind?: string;
  /** Projects to which the user has at least READ access. */
  projects?: Array<{ id?: string; numericId?: string; kind?: string; projectReference?: ProjectReference; friendlyName?: string }>;
  /** A hash of the page of results. */
  etag?: string;
  /** Use this token to request the next page of results. */
  nextPageToken?: string;
  /** The total number of projects in the page. A wrapper is used here because the field should still be in the response when the value is 0. */
  totalItems?: number;
}

export const ProjectList: Schema.Schema<ProjectList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  projects: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), numericId: Schema.optional(Schema.String), kind: Schema.optional(Schema.String), projectReference: Schema.optional(ProjectReference), friendlyName: Schema.optional(Schema.String) }))),
  etag: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  totalItems: Schema.optional(Schema.Number),
})).annotate({ identifier: "ProjectList" }) as any as Schema.Schema<ProjectList>;

export interface CategoryCount {
  /** The count of training samples matching the category within the cluster. */
  count?: string;
  /** The name of category. */
  category?: string;
}

export const CategoryCount: Schema.Schema<CategoryCount> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
})).annotate({ identifier: "CategoryCount" }) as any as Schema.Schema<CategoryCount>;

export interface CategoricalValue {
  /** Counts of all categories for the categorical feature. If there are more than ten categories, we return top ten (by count) and return one more CategoryCount with category "_OTHER_" and count as aggregate counts of remaining categories. */
  categoryCounts?: Array<CategoryCount>;
}

export const CategoricalValue: Schema.Schema<CategoricalValue> = Schema.suspend(() => Schema.Struct({
  categoryCounts: Schema.optional(Schema.Array(CategoryCount)),
})).annotate({ identifier: "CategoricalValue" }) as any as Schema.Schema<CategoricalValue>;

export interface FeatureValue {
  /** The feature column name. */
  featureColumn?: string;
  /** The categorical feature value. */
  categoricalValue?: CategoricalValue;
  /** The numerical feature value. This is the centroid value for this feature. */
  numericalValue?: number;
}

export const FeatureValue: Schema.Schema<FeatureValue> = Schema.suspend(() => Schema.Struct({
  featureColumn: Schema.optional(Schema.String),
  categoricalValue: Schema.optional(CategoricalValue),
  numericalValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "FeatureValue" }) as any as Schema.Schema<FeatureValue>;

export interface TableReference {
  /** Required. The ID of the dataset containing this table. */
  datasetId?: string;
  /** Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`. */
  tableId?: string;
  /** Required. The ID of the project containing this table. */
  projectId?: string;
}

export const TableReference: Schema.Schema<TableReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "TableReference" }) as any as Schema.Schema<TableReference>;

export interface IndexUnusedReason {
  /** Specifies the name of the unused search index, if available. */
  indexName?: string;
  /** Specifies the high-level reason for the scenario when no search index was used. */
  code?: "CODE_UNSPECIFIED" | "INDEX_CONFIG_NOT_AVAILABLE" | "PENDING_INDEX_CREATION" | "BASE_TABLE_TRUNCATED" | "INDEX_CONFIG_MODIFIED" | "TIME_TRAVEL_QUERY" | "NO_PRUNING_POWER" | "UNINDEXED_SEARCH_FIELDS" | "UNSUPPORTED_SEARCH_PATTERN" | "OPTIMIZED_WITH_MATERIALIZED_VIEW" | "SECURED_BY_DATA_MASKING" | "MISMATCHED_TEXT_ANALYZER" | "BASE_TABLE_TOO_SMALL" | "BASE_TABLE_TOO_LARGE" | "ESTIMATED_PERFORMANCE_GAIN_TOO_LOW" | "COLUMN_METADATA_INDEX_NOT_USED" | "NOT_SUPPORTED_IN_STANDARD_EDITION" | "INDEX_SUPPRESSED_BY_FUNCTION_OPTION" | "QUERY_CACHE_HIT" | "STALE_INDEX" | "INTERNAL_ERROR" | "OTHER_REASON" | (string & {});
  /** Specifies the base table involved in the reason that no search index was used. */
  baseTable?: TableReference;
  /** Free form human-readable reason for the scenario when no search index was used. */
  message?: string;
}

export const IndexUnusedReason: Schema.Schema<IndexUnusedReason> = Schema.suspend(() => Schema.Struct({
  indexName: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  baseTable: Schema.optional(TableReference),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "IndexUnusedReason" }) as any as Schema.Schema<IndexUnusedReason>;

export interface IndexPruningStats {
  /** The base table reference. */
  baseTable?: TableReference;
  /** The number of parallel inputs after index pruning. */
  postIndexPruningParallelInputCount?: string;
  /** The index id. */
  indexId?: string;
  /** The number of parallel inputs before index pruning. */
  preIndexPruningParallelInputCount?: string;
}

export const IndexPruningStats: Schema.Schema<IndexPruningStats> = Schema.suspend(() => Schema.Struct({
  baseTable: Schema.optional(TableReference),
  postIndexPruningParallelInputCount: Schema.optional(Schema.String),
  indexId: Schema.optional(Schema.String),
  preIndexPruningParallelInputCount: Schema.optional(Schema.String),
})).annotate({ identifier: "IndexPruningStats" }) as any as Schema.Schema<IndexPruningStats>;

export interface SearchStatistics {
  /** Specifies the index usage mode for the query. */
  indexUsageMode?: "INDEX_USAGE_MODE_UNSPECIFIED" | "UNUSED" | "PARTIALLY_USED" | "FULLY_USED" | (string & {});
  /** When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated. */
  indexUnusedReasons?: Array<IndexUnusedReason>;
  /** Search index pruning statistics, one for each base table that has a search index. If a base table does not have a search index or the index does not help with pruning on the base table, then there is no pruning statistics for that table. */
  indexPruningStats?: Array<IndexPruningStats>;
}

export const SearchStatistics: Schema.Schema<SearchStatistics> = Schema.suspend(() => Schema.Struct({
  indexUsageMode: Schema.optional(Schema.String),
  indexUnusedReasons: Schema.optional(Schema.Array(IndexUnusedReason)),
  indexPruningStats: Schema.optional(Schema.Array(IndexPruningStats)),
})).annotate({ identifier: "SearchStatistics" }) as any as Schema.Schema<SearchStatistics>;

export interface RemoteModelInfo {
  /** Output only. Max number of rows in each batch sent to the remote service. If unset, the number of rows in each batch is set dynamically. */
  maxBatchingRows?: string;
  /** Output only. The name of the speech recognizer to use for speech recognition. The expected format is `projects/{project}/locations/{location}/recognizers/{recognizer}`. Customers can specify this field at model creation. If not specified, a default recognizer `projects/{model project}/locations/global/recognizers/_` will be used. See more details at [recognizers](https://cloud.google.com/speech-to-text/v2/docs/reference/rest/v2/projects.locations.recognizers) */
  speechRecognizer?: string;
  /** Output only. The model version for LLM. */
  remoteModelVersion?: string;
  /** Output only. Fully qualified name of the user-provided connection object of the remote model. Format: ```"projects/{project_id}/locations/{location_id}/connections/{connection_id}"``` */
  connection?: string;
  /** Output only. The remote service type for remote model. */
  remoteServiceType?: "REMOTE_SERVICE_TYPE_UNSPECIFIED" | "CLOUD_AI_TRANSLATE_V3" | "CLOUD_AI_VISION_V1" | "CLOUD_AI_NATURAL_LANGUAGE_V1" | "CLOUD_AI_SPEECH_TO_TEXT_V2" | (string & {});
  /** Output only. The endpoint for remote model. */
  endpoint?: string;
}

export const RemoteModelInfo: Schema.Schema<RemoteModelInfo> = Schema.suspend(() => Schema.Struct({
  maxBatchingRows: Schema.optional(Schema.String),
  speechRecognizer: Schema.optional(Schema.String),
  remoteModelVersion: Schema.optional(Schema.String),
  connection: Schema.optional(Schema.String),
  remoteServiceType: Schema.optional(Schema.String),
  endpoint: Schema.optional(Schema.String),
})).annotate({ identifier: "RemoteModelInfo" }) as any as Schema.Schema<RemoteModelInfo>;

export interface StandardSqlStructType {
  /** Fields within the struct. */
  fields?: Array<StandardSqlField>;
}

export const StandardSqlStructType: Schema.Schema<StandardSqlStructType> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(StandardSqlField)),
})).annotate({ identifier: "StandardSqlStructType" }) as any as Schema.Schema<StandardSqlStructType>;

export interface StandardSqlDataType {
  /** The type of the array's elements, if type_kind = "ARRAY". */
  arrayElementType?: StandardSqlDataType;
  /** Required. The top level type of this field. Can be any GoogleSQL data type (e.g., "INT64", "DATE", "ARRAY"). */
  typeKind?: "TYPE_KIND_UNSPECIFIED" | "INT64" | "BOOL" | "FLOAT64" | "STRING" | "BYTES" | "TIMESTAMP" | "DATE" | "TIME" | "DATETIME" | "INTERVAL" | "GEOGRAPHY" | "NUMERIC" | "BIGNUMERIC" | "JSON" | "ARRAY" | "STRUCT" | "RANGE" | (string & {});
  /** The fields of this struct, in order, if type_kind = "STRUCT". */
  structType?: StandardSqlStructType;
  /** The type of the range's elements, if type_kind = "RANGE". */
  rangeElementType?: StandardSqlDataType;
}

export const StandardSqlDataType: Schema.Schema<StandardSqlDataType> = Schema.suspend(() => Schema.Struct({
  arrayElementType: Schema.optional(StandardSqlDataType),
  typeKind: Schema.optional(Schema.String),
  structType: Schema.optional(StandardSqlStructType),
  rangeElementType: Schema.optional(StandardSqlDataType),
})).annotate({ identifier: "StandardSqlDataType" }) as any as Schema.Schema<StandardSqlDataType>;

export interface StandardSqlField {
  /** Optional. The name of this field. Can be absent for struct fields. */
  name?: string;
  /** Optional. The type of this parameter. Absent if not explicitly specified (e.g., CREATE FUNCTION statement can omit the return type; in this case the output parameter does not have this "type" field). */
  type?: StandardSqlDataType;
}

export const StandardSqlField: Schema.Schema<StandardSqlField> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(StandardSqlDataType),
})).annotate({ identifier: "StandardSqlField" }) as any as Schema.Schema<StandardSqlField>;

export interface DoubleCandidates {
  /** Candidates for the double parameter in increasing order. */
  candidates?: Array<number>;
}

export const DoubleCandidates: Schema.Schema<DoubleCandidates> = Schema.suspend(() => Schema.Struct({
  candidates: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "DoubleCandidates" }) as any as Schema.Schema<DoubleCandidates>;

export interface DoubleRange {
  /** Min value of the double parameter. */
  min?: number;
  /** Max value of the double parameter. */
  max?: number;
}

export const DoubleRange: Schema.Schema<DoubleRange> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
})).annotate({ identifier: "DoubleRange" }) as any as Schema.Schema<DoubleRange>;

export interface DoubleHparamSearchSpace {
  /** Candidates of the double hyperparameter. */
  candidates?: DoubleCandidates;
  /** Range of the double hyperparameter. */
  range?: DoubleRange;
}

export const DoubleHparamSearchSpace: Schema.Schema<DoubleHparamSearchSpace> = Schema.suspend(() => Schema.Struct({
  candidates: Schema.optional(DoubleCandidates),
  range: Schema.optional(DoubleRange),
})).annotate({ identifier: "DoubleHparamSearchSpace" }) as any as Schema.Schema<DoubleHparamSearchSpace>;

export interface IntCandidates {
  /** Candidates for the int parameter in increasing order. */
  candidates?: Array<string>;
}

export const IntCandidates: Schema.Schema<IntCandidates> = Schema.suspend(() => Schema.Struct({
  candidates: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IntCandidates" }) as any as Schema.Schema<IntCandidates>;

export interface IntRange {
  /** Max value of the int parameter. */
  max?: string;
  /** Min value of the int parameter. */
  min?: string;
}

export const IntRange: Schema.Schema<IntRange> = Schema.suspend(() => Schema.Struct({
  max: Schema.optional(Schema.String),
  min: Schema.optional(Schema.String),
})).annotate({ identifier: "IntRange" }) as any as Schema.Schema<IntRange>;

export interface IntHparamSearchSpace {
  /** Candidates of the int hyperparameter. */
  candidates?: IntCandidates;
  /** Range of the int hyperparameter. */
  range?: IntRange;
}

export const IntHparamSearchSpace: Schema.Schema<IntHparamSearchSpace> = Schema.suspend(() => Schema.Struct({
  candidates: Schema.optional(IntCandidates),
  range: Schema.optional(IntRange),
})).annotate({ identifier: "IntHparamSearchSpace" }) as any as Schema.Schema<IntHparamSearchSpace>;

export interface StringHparamSearchSpace {
  /** Canididates for the string or enum parameter in lower case. */
  candidates?: Array<string>;
}

export const StringHparamSearchSpace: Schema.Schema<StringHparamSearchSpace> = Schema.suspend(() => Schema.Struct({
  candidates: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "StringHparamSearchSpace" }) as any as Schema.Schema<StringHparamSearchSpace>;

export interface IntArray {
  /** Elements in the int array. */
  elements?: Array<string>;
}

export const IntArray: Schema.Schema<IntArray> = Schema.suspend(() => Schema.Struct({
  elements: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "IntArray" }) as any as Schema.Schema<IntArray>;

export interface IntArrayHparamSearchSpace {
  /** Candidates for the int array parameter. */
  candidates?: Array<IntArray>;
}

export const IntArrayHparamSearchSpace: Schema.Schema<IntArrayHparamSearchSpace> = Schema.suspend(() => Schema.Struct({
  candidates: Schema.optional(Schema.Array(IntArray)),
})).annotate({ identifier: "IntArrayHparamSearchSpace" }) as any as Schema.Schema<IntArrayHparamSearchSpace>;

export interface HparamSearchSpaces {
  /** Subsample the training data to grow tree to prevent overfitting for boosted tree models. */
  subsample?: DoubleHparamSearchSpace;
  /** Subsample ratio of columns when constructing each tree for boosted tree models. */
  colsampleBytree?: DoubleHparamSearchSpace;
  /** Hyperparameter for matrix factoration when implicit feedback type is specified. */
  walsAlpha?: DoubleHparamSearchSpace;
  /** Learning rate of training jobs. */
  learnRate?: DoubleHparamSearchSpace;
  /** Minimum sum of instance weight needed in a child for boosted tree models. */
  minTreeChildWeight?: IntHparamSearchSpace;
  /** Number of clusters for k-means. */
  numClusters?: IntHparamSearchSpace;
  /** Dart normalization type for boosted tree models. */
  dartNormalizeType?: StringHparamSearchSpace;
  /** Subsample ratio of columns for each node(split) for boosted tree models. */
  colsampleBynode?: DoubleHparamSearchSpace;
  /** Hidden units for neural network models. */
  hiddenUnits?: IntArrayHparamSearchSpace;
  /** Optimizer of TF models. */
  optimizer?: StringHparamSearchSpace;
  /** Number of latent factors to train on. */
  numFactors?: IntHparamSearchSpace;
  /** Tree construction algorithm for boosted tree models. */
  treeMethod?: StringHparamSearchSpace;
  /** Booster type for boosted tree models. */
  boosterType?: StringHparamSearchSpace;
  /** L1 regularization coefficient. */
  l1Reg?: DoubleHparamSearchSpace;
  /** Dropout probability for dnn model training and boosted tree models using dart booster. */
  dropout?: DoubleHparamSearchSpace;
  /** Number of parallel trees for boosted tree models. */
  numParallelTree?: IntHparamSearchSpace;
  /** L2 regularization coefficient. */
  l2Reg?: DoubleHparamSearchSpace;
  /** Maximum depth of a tree for boosted tree models. */
  maxTreeDepth?: IntHparamSearchSpace;
  /** Mini batch sample size. */
  batchSize?: IntHparamSearchSpace;
  /** Subsample ratio of columns for each level for boosted tree models. */
  colsampleBylevel?: DoubleHparamSearchSpace;
  /** Activation functions of neural network models. */
  activationFn?: StringHparamSearchSpace;
  /** Minimum split loss for boosted tree models. */
  minSplitLoss?: DoubleHparamSearchSpace;
}

export const HparamSearchSpaces: Schema.Schema<HparamSearchSpaces> = Schema.suspend(() => Schema.Struct({
  subsample: Schema.optional(DoubleHparamSearchSpace),
  colsampleBytree: Schema.optional(DoubleHparamSearchSpace),
  walsAlpha: Schema.optional(DoubleHparamSearchSpace),
  learnRate: Schema.optional(DoubleHparamSearchSpace),
  minTreeChildWeight: Schema.optional(IntHparamSearchSpace),
  numClusters: Schema.optional(IntHparamSearchSpace),
  dartNormalizeType: Schema.optional(StringHparamSearchSpace),
  colsampleBynode: Schema.optional(DoubleHparamSearchSpace),
  hiddenUnits: Schema.optional(IntArrayHparamSearchSpace),
  optimizer: Schema.optional(StringHparamSearchSpace),
  numFactors: Schema.optional(IntHparamSearchSpace),
  treeMethod: Schema.optional(StringHparamSearchSpace),
  boosterType: Schema.optional(StringHparamSearchSpace),
  l1Reg: Schema.optional(DoubleHparamSearchSpace),
  dropout: Schema.optional(DoubleHparamSearchSpace),
  numParallelTree: Schema.optional(IntHparamSearchSpace),
  l2Reg: Schema.optional(DoubleHparamSearchSpace),
  maxTreeDepth: Schema.optional(IntHparamSearchSpace),
  batchSize: Schema.optional(IntHparamSearchSpace),
  colsampleBylevel: Schema.optional(DoubleHparamSearchSpace),
  activationFn: Schema.optional(StringHparamSearchSpace),
  minSplitLoss: Schema.optional(DoubleHparamSearchSpace),
})).annotate({ identifier: "HparamSearchSpaces" }) as any as Schema.Schema<HparamSearchSpaces>;

export interface ModelReference {
  /** Required. The ID of the dataset containing this model. */
  datasetId?: string;
  /** Required. The ID of the model. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters. */
  modelId?: string;
  /** Required. The ID of the project containing this model. */
  projectId?: string;
}

export const ModelReference: Schema.Schema<ModelReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  modelId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "ModelReference" }) as any as Schema.Schema<ModelReference>;

export interface ArimaOrder {
  /** Order of the differencing part. */
  d?: string;
  /** Order of the autoregressive part. */
  p?: string;
  /** Order of the moving-average part. */
  q?: string;
}

export const ArimaOrder: Schema.Schema<ArimaOrder> = Schema.suspend(() => Schema.Struct({
  d: Schema.optional(Schema.String),
  p: Schema.optional(Schema.String),
  q: Schema.optional(Schema.String),
})).annotate({ identifier: "ArimaOrder" }) as any as Schema.Schema<ArimaOrder>;

export interface TrainingOptions {
  /** Column to be designated as time series data for ARIMA model. */
  timeSeriesDataColumn?: string;
  /** Whether to standardize numerical features. Default to true. */
  standardizeFeatures?: boolean;
  /** The strategy to determine learn rate for the current iteration. */
  learnRateStrategy?: "LEARN_RATE_STRATEGY_UNSPECIFIED" | "LINE_SEARCH" | "CONSTANT" | (string & {});
  /** The forecast limit lower bound that was used during ARIMA model training with limits. To see more details of the algorithm: https://otexts.com/fpp2/limits.html */
  forecastLimitLowerBound?: number;
  /** Whether to train a model from the last checkpoint. */
  warmStart?: boolean;
  /** When early_stop is true, stops training when accuracy improvement is less than 'min_relative_progress'. Used only for iterative training algorithms. */
  minRelativeProgress?: number;
  /** Maximum depth of a tree for boosted tree models. */
  maxTreeDepth?: string;
  /** Specifies the initial learning rate for the line search learn rate strategy. */
  initialLearnRate?: number;
  /** L1 regularization coefficient to activations. */
  l1RegActivation?: number;
  /** A list of geographical regions that are used for time series modeling. */
  holidayRegions?: Array<"HOLIDAY_REGION_UNSPECIFIED" | "GLOBAL" | "NA" | "JAPAC" | "EMEA" | "LAC" | "AE" | "AR" | "AT" | "AU" | "BE" | "BR" | "CA" | "CH" | "CL" | "CN" | "CO" | "CS" | "CZ" | "DE" | "DK" | "DZ" | "EC" | "EE" | "EG" | "ES" | "FI" | "FR" | "GB" | "GR" | "HK" | "HU" | "ID" | "IE" | "IL" | "IN" | "IR" | "IT" | "JP" | "KR" | "LV" | "MA" | "MX" | "MY" | "NG" | "NL" | "NO" | "NZ" | "PE" | "PH" | "PK" | "PL" | "PT" | "RO" | "RS" | "RU" | "SA" | "SE" | "SG" | "SI" | "SK" | "TH" | "TR" | "TW" | "UA" | "US" | "VE" | "VN" | "ZA" | (string & {})>;
  /** Name of the column used to determine the rows corresponding to control and test. Applies to contribution analysis models. */
  isTestColumn?: string;
  /** The data split type for training and evaluation, e.g. RANDOM. */
  dataSplitMethod?: "DATA_SPLIT_METHOD_UNSPECIFIED" | "RANDOM" | "CUSTOM" | "SEQUENTIAL" | "NO_SPLIT" | "AUTO_SPLIT" | (string & {});
  /** Name of the instance weight column for training data. This column isn't be used as a feature. */
  instanceWeightColumn?: string;
  /** The maximum number of iterations in training. Used only for iterative training algorithms. */
  maxIterations?: string;
  /** The geographical region based on which the holidays are considered in time series modeling. If a valid value is specified, then holiday effects modeling is enabled. */
  holidayRegion?: "HOLIDAY_REGION_UNSPECIFIED" | "GLOBAL" | "NA" | "JAPAC" | "EMEA" | "LAC" | "AE" | "AR" | "AT" | "AU" | "BE" | "BR" | "CA" | "CH" | "CL" | "CN" | "CO" | "CS" | "CZ" | "DE" | "DK" | "DZ" | "EC" | "EE" | "EG" | "ES" | "FI" | "FR" | "GB" | "GR" | "HK" | "HU" | "ID" | "IE" | "IL" | "IN" | "IR" | "IT" | "JP" | "KR" | "LV" | "MA" | "MX" | "MY" | "NG" | "NL" | "NO" | "NZ" | "PE" | "PH" | "PK" | "PL" | "PT" | "RO" | "RS" | "RU" | "SA" | "SE" | "SG" | "SI" | "SK" | "TH" | "TR" | "TW" | "UA" | "US" | "VE" | "VN" | "ZA" | (string & {});
  /** If true, clean spikes and dips in the input time series. */
  cleanSpikesAndDips?: boolean;
  /** The fraction of evaluation data over the whole input data. The rest of data will be used as training data. The format should be double. Accurate to two decimal places. Default value is 0.2. */
  dataSplitEvalFraction?: number;
  /** Maximum number of trials to run in parallel. */
  maxParallelTrials?: string;
  /** Smoothing window size for the trend component. When a positive value is specified, a center moving average smoothing is applied on the history trend. When the smoothing window is out of the boundary at the beginning or the end of the trend, the first element or the last element is padded to fill the smoothing window before the average is applied. */
  trendSmoothingWindowSize?: string;
  /** The version aliases to apply in Vertex AI model registry. Always overwrite if the version aliases exists in a existing model. */
  vertexAiModelVersionAliases?: Array<string>;
  /** Subsample ratio of columns for each node(split) for boosted tree models. */
  colsampleBynode?: number;
  /** The column to split data with. This column won't be used as a feature. 1. When data_split_method is CUSTOM, the corresponding column should be boolean. The rows with true value tag are eval data, and the false are training data. 2. When data_split_method is SEQ, the first DATA_SPLIT_EVAL_FRACTION rows (from smallest to largest) in the corresponding column are used as training data, and the rest are eval data. It respects the order in Orderable data types: https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties */
  dataSplitColumn?: string;
  /** Based on the selected TF version, the corresponding docker image is used to train external models. */
  tfVersion?: string;
  /** Optional. Names of the columns to slice on. Applies to contribution analysis models. */
  dimensionIdColumns?: Array<string>;
  /** L2 regularization coefficient. */
  l2Regularization?: number;
  /** User column specified for matrix factorization models. */
  userColumn?: string;
  /** Whether to enable auto ARIMA or not. */
  autoArima?: boolean;
  /** Categorical feature encoding method. */
  categoryEncodingMethod?: "ENCODING_METHOD_UNSPECIFIED" | "ONE_HOT_ENCODING" | "LABEL_ENCODING" | "DUMMY_ENCODING" | (string & {});
  /** Number of principal components to keep in the PCA model. Must be <= the number of features. */
  numPrincipalComponents?: string;
  /** If true, perform decompose time series and save the results. */
  decomposeTimeSeries?: boolean;
  /** Booster type for boosted tree models. */
  boosterType?: "BOOSTER_TYPE_UNSPECIFIED" | "GBTREE" | "DART" | (string & {});
  /** L1 regularization coefficient. */
  l1Regularization?: number;
  /** Learning rate in training. Used only for iterative training algorithms. */
  learnRate?: number;
  /** Num factors specified for matrix factorization models. */
  numFactors?: string;
  /** The minimum number of machine replicas that will be always deployed on an endpoint. This value must be greater than or equal to 1. The default value is 1. */
  minReplicaCount?: string;
  /** Activation function of the neural nets. */
  activationFn?: string;
  /** Specifies the reservation affinity type used to configure a Vertex AI resource. The default value is `NO_RESERVATION`. */
  reservationAffinityType?: "RESERVATION_AFFINITY_TYPE_UNSPECIFIED" | "NO_RESERVATION" | "ANY_RESERVATION" | "SPECIFIC_RESERVATION" | (string & {});
  /** Enums for color space, used for processing images in Object Table. See more details at https://www.tensorflow.org/io/tutorials/colorspace. */
  colorSpace?: "COLOR_SPACE_UNSPECIFIED" | "RGB" | "HSV" | "YIQ" | "YUV" | "GRAYSCALE" | (string & {});
  /** Distance type for clustering models. */
  distanceType?: "DISTANCE_TYPE_UNSPECIFIED" | "EUCLIDEAN" | "COSINE" | (string & {});
  /** The minimum ratio of cumulative explained variance that needs to be given by the PCA model. */
  pcaExplainedVarianceRatio?: number;
  /** Budget in hours for AutoML training. */
  budgetHours?: number;
  /** Subsample fraction of the training data to grow tree to prevent overfitting for boosted tree models. */
  subsample?: number;
  /** Include drift when fitting an ARIMA model. */
  includeDrift?: boolean;
  /** Type of loss function used during training run. */
  lossType?: "LOSS_TYPE_UNSPECIFIED" | "MEAN_SQUARED_LOSS" | "MEAN_LOG_LOSS" | (string & {});
  /** Google Cloud Storage URI from which the model was imported. Only applicable for imported models. */
  modelUri?: string;
  /** The method used to initialize the centroids for kmeans algorithm. */
  kmeansInitializationMethod?: "KMEANS_INITIALIZATION_METHOD_UNSPECIFIED" | "RANDOM" | "CUSTOM" | "KMEANS_PLUS_PLUS" | (string & {});
  /** Whether to stop early when the loss doesn't improve significantly any more (compared to min_relative_progress). Used only for iterative training algorithms. */
  earlyStop?: boolean;
  /** Whether to use approximate feature contribution method in XGBoost model explanation for global explain. */
  approxGlobalFeatureContrib?: boolean;
  /** The time series id column that was used during ARIMA model training. */
  timeSeriesIdColumn?: string;
  /** The time series id columns that were used during ARIMA model training. */
  timeSeriesIdColumns?: Array<string>;
  /** The solver for PCA. */
  pcaSolver?: "UNSPECIFIED" | "FULL" | "RANDOMIZED" | "AUTO" | (string & {});
  /** Number of paths for the sampled Shapley explain method. */
  sampledShapleyNumPaths?: string;
  /** The id of a Hugging Face model. For example, `google/gemma-2-2b-it`. */
  huggingFaceModelId?: string;
  /** The min value of the sum of non-seasonal p and q. */
  autoArimaMinOrder?: string;
  /** The data frequency of a time series. */
  dataFrequency?: "DATA_FREQUENCY_UNSPECIFIED" | "AUTO_FREQUENCY" | "YEARLY" | "QUARTERLY" | "MONTHLY" | "WEEKLY" | "DAILY" | "HOURLY" | "PER_MINUTE" | (string & {});
  /** Number of integral steps for the integrated gradients explain method. */
  integratedGradientsNumSteps?: string;
  /** The number of periods ahead that need to be forecasted. */
  horizon?: string;
  /** Whether to calculate class weights automatically based on the popularity of each label. */
  autoClassWeights?: boolean;
  /** Tree construction algorithm for boosted tree models. */
  treeMethod?: "TREE_METHOD_UNSPECIFIED" | "AUTO" | "EXACT" | "APPROX" | "HIST" | (string & {});
  /** The contribution metric. Applies to contribution analysis models. Allowed formats supported are for summable and summable ratio contribution metrics. These include expressions such as `SUM(x)` or `SUM(x)/SUM(y)`, where x and y are column names from the base table. */
  contributionMetric?: string;
  /** The fraction of the interpolated length of the time series that's used to model the time series trend component. All of the time points of the time series are used to model the non-trend component. This training option accelerates modeling training without sacrificing much forecasting accuracy. You can use this option with `minTimeSeriesLength` but not with `maxTimeSeriesLength`. */
  timeSeriesLengthFraction?: number;
  /** The target evaluation metrics to optimize the hyperparameters for. */
  hparamTuningObjectives?: Array<"HPARAM_TUNING_OBJECTIVE_UNSPECIFIED" | "MEAN_ABSOLUTE_ERROR" | "MEAN_SQUARED_ERROR" | "MEAN_SQUARED_LOG_ERROR" | "MEDIAN_ABSOLUTE_ERROR" | "R_SQUARED" | "EXPLAINED_VARIANCE" | "PRECISION" | "RECALL" | "ACCURACY" | "F1_SCORE" | "LOG_LOSS" | "ROC_AUC" | "DAVIES_BOULDIN_INDEX" | "MEAN_AVERAGE_PRECISION" | "NORMALIZED_DISCOUNTED_CUMULATIVE_GAIN" | "AVERAGE_RANK" | (string & {})>;
  /** A specification of the non-seasonal part of the ARIMA model: the three components (p, d, q) are the AR order, the degree of differencing, and the MA order. */
  nonSeasonalOrder?: ArimaOrder;
  /** Type of normalization algorithm for boosted tree models using dart booster. */
  dartNormalizeType?: "DART_NORMALIZE_TYPE_UNSPECIFIED" | "TREE" | "FOREST" | (string & {});
  /** The maximum number of time points in a time series that can be used in modeling the trend component of the time series. Don't use this option with the `timeSeriesLengthFraction` or `minTimeSeriesLength` options. */
  maxTimeSeriesLength?: string;
  /** The model registry. */
  modelRegistry?: "MODEL_REGISTRY_UNSPECIFIED" | "VERTEX_AI" | (string & {});
  /** User-selected XGBoost versions for training of XGBoost models. */
  xgboostVersion?: string;
  /** The name of a Vertex model garden publisher model. Format is `publishers/{publisher}/models/{model}@{optional_version_id}`. */
  modelGardenModelName?: string;
  /** Corresponds to the label key of a reservation resource used by Vertex AI. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value. */
  reservationAffinityKey?: string;
  /** Batch size for dnn models. */
  batchSize?: string;
  /** If true, scale the feature values by dividing the feature standard deviation. Currently only apply to PCA. */
  scaleFeatures?: boolean;
  /** Minimum sum of instance weight needed in a child for boosted tree models. */
  minTreeChildWeight?: string;
  /** Optimization strategy for training linear regression models. */
  optimizationStrategy?: "OPTIMIZATION_STRATEGY_UNSPECIFIED" | "BATCH_GRADIENT_DESCENT" | "NORMAL_EQUATION" | (string & {});
  /** The type of the machine used to deploy and serve the model. */
  machineType?: string;
  /** Column to be designated as time series timestamp for ARIMA model. */
  timeSeriesTimestampColumn?: string;
  /** The column used to provide the initial centroids for kmeans algorithm when kmeans_initialization_method is CUSTOM. */
  kmeansInitializationColumn?: string;
  /** Name of input label columns in training data. */
  inputLabelColumns?: Array<string>;
  /** The max value of the sum of non-seasonal p and q. */
  autoArimaMaxOrder?: string;
  /** If true, detect step changes and make data adjustment in the input time series. */
  adjustStepChanges?: boolean;
  /** Feedback type that specifies which algorithm to run for matrix factorization. */
  feedbackType?: "FEEDBACK_TYPE_UNSPECIFIED" | "IMPLICIT" | "EXPLICIT" | (string & {});
  /** The apriori support minimum. Applies to contribution analysis models. */
  minAprioriSupport?: number;
  /** The forecast limit upper bound that was used during ARIMA model training with limits. */
  forecastLimitUpperBound?: number;
  /** Whether or not p-value test should be computed for this model. Only available for linear and logistic regression models. */
  calculatePValues?: boolean;
  /** Subsample ratio of columns for each level for boosted tree models. */
  colsampleBylevel?: number;
  /** Optimizer used for training the neural nets. */
  optimizer?: string;
  /** Whether the model should include intercept during model training. */
  fitIntercept?: boolean;
  /** Corresponds to the label values of a reservation resource used by Vertex AI. This must be the full resource name of the reservation or reservation block. */
  reservationAffinityValues?: Array<string>;
  /** Number of parallel trees constructed during each iteration for boosted tree models. */
  numParallelTree?: string;
  /** Minimum split loss for boosted tree models. */
  minSplitLoss?: number;
  /** Number of trials to run this hyperparameter tuning job. */
  numTrials?: string;
  /** The minimum number of time points in a time series that are used in modeling the trend component of the time series. If you use this option you must also set the `timeSeriesLengthFraction` option. This training option ensures that enough time points are available when you use `timeSeriesLengthFraction` in trend modeling. This is particularly important when forecasting multiple time series in a single query using `timeSeriesIdColumn`. If the total number of time points is less than the `minTimeSeriesLength` value, then the query uses all available time points. */
  minTimeSeriesLength?: string;
  /** Hyperparameter for matrix factoration when implicit feedback type is specified. */
  walsAlpha?: number;
  /** Item column specified for matrix factorization models. */
  itemColumn?: string;
  /** Subsample ratio of columns when constructing each tree for boosted tree models. */
  colsampleBytree?: number;
  /** Weights associated with each label class, for rebalancing the training data. Only applicable for classification models. */
  labelClassWeights?: Record<string, number>;
  /** The idle TTL of the endpoint before the resources get destroyed. The default value is 6.5 hours. */
  endpointIdleTtl?: string;
  /** Dropout probability for dnn models. */
  dropout?: number;
  /** Number of clusters for clustering models. */
  numClusters?: string;
  /** The maximum number of machine replicas that will be deployed on an endpoint. The default value is equal to min_replica_count. */
  maxReplicaCount?: string;
  /** Hidden units for dnn models. */
  hiddenUnits?: Array<string>;
  /** If true, enable global explanation during training. */
  enableGlobalExplain?: boolean;
}

export const TrainingOptions: Schema.Schema<TrainingOptions> = Schema.suspend(() => Schema.Struct({
  timeSeriesDataColumn: Schema.optional(Schema.String),
  standardizeFeatures: Schema.optional(Schema.Boolean),
  learnRateStrategy: Schema.optional(Schema.String),
  forecastLimitLowerBound: Schema.optional(Schema.Number),
  warmStart: Schema.optional(Schema.Boolean),
  minRelativeProgress: Schema.optional(Schema.Number),
  maxTreeDepth: Schema.optional(Schema.String),
  initialLearnRate: Schema.optional(Schema.Number),
  l1RegActivation: Schema.optional(Schema.Number),
  holidayRegions: Schema.optional(Schema.Array(Schema.String)),
  isTestColumn: Schema.optional(Schema.String),
  dataSplitMethod: Schema.optional(Schema.String),
  instanceWeightColumn: Schema.optional(Schema.String),
  maxIterations: Schema.optional(Schema.String),
  holidayRegion: Schema.optional(Schema.String),
  cleanSpikesAndDips: Schema.optional(Schema.Boolean),
  dataSplitEvalFraction: Schema.optional(Schema.Number),
  maxParallelTrials: Schema.optional(Schema.String),
  trendSmoothingWindowSize: Schema.optional(Schema.String),
  vertexAiModelVersionAliases: Schema.optional(Schema.Array(Schema.String)),
  colsampleBynode: Schema.optional(Schema.Number),
  dataSplitColumn: Schema.optional(Schema.String),
  tfVersion: Schema.optional(Schema.String),
  dimensionIdColumns: Schema.optional(Schema.Array(Schema.String)),
  l2Regularization: Schema.optional(Schema.Number),
  userColumn: Schema.optional(Schema.String),
  autoArima: Schema.optional(Schema.Boolean),
  categoryEncodingMethod: Schema.optional(Schema.String),
  numPrincipalComponents: Schema.optional(Schema.String),
  decomposeTimeSeries: Schema.optional(Schema.Boolean),
  boosterType: Schema.optional(Schema.String),
  l1Regularization: Schema.optional(Schema.Number),
  learnRate: Schema.optional(Schema.Number),
  numFactors: Schema.optional(Schema.String),
  minReplicaCount: Schema.optional(Schema.String),
  activationFn: Schema.optional(Schema.String),
  reservationAffinityType: Schema.optional(Schema.String),
  colorSpace: Schema.optional(Schema.String),
  distanceType: Schema.optional(Schema.String),
  pcaExplainedVarianceRatio: Schema.optional(Schema.Number),
  budgetHours: Schema.optional(Schema.Number),
  subsample: Schema.optional(Schema.Number),
  includeDrift: Schema.optional(Schema.Boolean),
  lossType: Schema.optional(Schema.String),
  modelUri: Schema.optional(Schema.String),
  kmeansInitializationMethod: Schema.optional(Schema.String),
  earlyStop: Schema.optional(Schema.Boolean),
  approxGlobalFeatureContrib: Schema.optional(Schema.Boolean),
  timeSeriesIdColumn: Schema.optional(Schema.String),
  timeSeriesIdColumns: Schema.optional(Schema.Array(Schema.String)),
  pcaSolver: Schema.optional(Schema.String),
  sampledShapleyNumPaths: Schema.optional(Schema.String),
  huggingFaceModelId: Schema.optional(Schema.String),
  autoArimaMinOrder: Schema.optional(Schema.String),
  dataFrequency: Schema.optional(Schema.String),
  integratedGradientsNumSteps: Schema.optional(Schema.String),
  horizon: Schema.optional(Schema.String),
  autoClassWeights: Schema.optional(Schema.Boolean),
  treeMethod: Schema.optional(Schema.String),
  contributionMetric: Schema.optional(Schema.String),
  timeSeriesLengthFraction: Schema.optional(Schema.Number),
  hparamTuningObjectives: Schema.optional(Schema.Array(Schema.String)),
  nonSeasonalOrder: Schema.optional(ArimaOrder),
  dartNormalizeType: Schema.optional(Schema.String),
  maxTimeSeriesLength: Schema.optional(Schema.String),
  modelRegistry: Schema.optional(Schema.String),
  xgboostVersion: Schema.optional(Schema.String),
  modelGardenModelName: Schema.optional(Schema.String),
  reservationAffinityKey: Schema.optional(Schema.String),
  batchSize: Schema.optional(Schema.String),
  scaleFeatures: Schema.optional(Schema.Boolean),
  minTreeChildWeight: Schema.optional(Schema.String),
  optimizationStrategy: Schema.optional(Schema.String),
  machineType: Schema.optional(Schema.String),
  timeSeriesTimestampColumn: Schema.optional(Schema.String),
  kmeansInitializationColumn: Schema.optional(Schema.String),
  inputLabelColumns: Schema.optional(Schema.Array(Schema.String)),
  autoArimaMaxOrder: Schema.optional(Schema.String),
  adjustStepChanges: Schema.optional(Schema.Boolean),
  feedbackType: Schema.optional(Schema.String),
  minAprioriSupport: Schema.optional(Schema.Number),
  forecastLimitUpperBound: Schema.optional(Schema.Number),
  calculatePValues: Schema.optional(Schema.Boolean),
  colsampleBylevel: Schema.optional(Schema.Number),
  optimizer: Schema.optional(Schema.String),
  fitIntercept: Schema.optional(Schema.Boolean),
  reservationAffinityValues: Schema.optional(Schema.Array(Schema.String)),
  numParallelTree: Schema.optional(Schema.String),
  minSplitLoss: Schema.optional(Schema.Number),
  numTrials: Schema.optional(Schema.String),
  minTimeSeriesLength: Schema.optional(Schema.String),
  walsAlpha: Schema.optional(Schema.Number),
  itemColumn: Schema.optional(Schema.String),
  colsampleBytree: Schema.optional(Schema.Number),
  labelClassWeights: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  endpointIdleTtl: Schema.optional(Schema.String),
  dropout: Schema.optional(Schema.Number),
  numClusters: Schema.optional(Schema.String),
  maxReplicaCount: Schema.optional(Schema.String),
  hiddenUnits: Schema.optional(Schema.Array(Schema.String)),
  enableGlobalExplain: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TrainingOptions" }) as any as Schema.Schema<TrainingOptions>;

export interface RankingMetrics {
  /** Determines the goodness of a ranking by computing the percentile rank from the predicted confidence and dividing it by the original rank. */
  averageRank?: number;
  /** Calculates a precision per user for all the items by ranking them and then averages all the precisions across all the users. */
  meanAveragePrecision?: number;
  /** A metric to determine the goodness of a ranking calculated from the predicted confidence by comparing it to an ideal rank measured by the original ratings. */
  normalizedDiscountedCumulativeGain?: number;
  /** Similar to the mean squared error computed in regression and explicit recommendation models except instead of computing the rating directly, the output from evaluate is computed against a preference which is 1 or 0 depending on if the rating exists or not. */
  meanSquaredError?: number;
}

export const RankingMetrics: Schema.Schema<RankingMetrics> = Schema.suspend(() => Schema.Struct({
  averageRank: Schema.optional(Schema.Number),
  meanAveragePrecision: Schema.optional(Schema.Number),
  normalizedDiscountedCumulativeGain: Schema.optional(Schema.Number),
  meanSquaredError: Schema.optional(Schema.Number),
})).annotate({ identifier: "RankingMetrics" }) as any as Schema.Schema<RankingMetrics>;

export interface AggregateClassificationMetrics {
  /** Area Under a ROC Curve. For multiclass this is a macro-averaged metric. */
  rocAuc?: number;
  /** Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric. */
  recall?: number;
  /** Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold. */
  threshold?: number;
  /** Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier. */
  precision?: number;
  /** The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric. */
  f1Score?: number;
  /** Logarithmic Loss. For multiclass this is a macro-averaged metric. */
  logLoss?: number;
  /** Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric. */
  accuracy?: number;
}

export const AggregateClassificationMetrics: Schema.Schema<AggregateClassificationMetrics> = Schema.suspend(() => Schema.Struct({
  rocAuc: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  threshold: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  f1Score: Schema.optional(Schema.Number),
  logLoss: Schema.optional(Schema.Number),
  accuracy: Schema.optional(Schema.Number),
})).annotate({ identifier: "AggregateClassificationMetrics" }) as any as Schema.Schema<AggregateClassificationMetrics>;

export interface Entry {
  /** Number of items being predicted as this label. */
  itemCount?: string;
  /** The predicted label. For confidence_threshold > 0, we will also add an entry indicating the number of items under the confidence threshold. */
  predictedLabel?: string;
}

export const Entry: Schema.Schema<Entry> = Schema.suspend(() => Schema.Struct({
  itemCount: Schema.optional(Schema.String),
  predictedLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "Entry" }) as any as Schema.Schema<Entry>;

export interface Row {
  /** Info describing predicted label distribution. */
  entries?: Array<Entry>;
  /** The original label of this row. */
  actualLabel?: string;
}

export const Row: Schema.Schema<Row> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(Entry)),
  actualLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "Row" }) as any as Schema.Schema<Row>;

export interface ConfusionMatrix {
  /** Confidence threshold used when computing the entries of the confusion matrix. */
  confidenceThreshold?: number;
  /** One row per actual label. */
  rows?: Array<Row>;
}

export const ConfusionMatrix: Schema.Schema<ConfusionMatrix> = Schema.suspend(() => Schema.Struct({
  confidenceThreshold: Schema.optional(Schema.Number),
  rows: Schema.optional(Schema.Array(Row)),
})).annotate({ identifier: "ConfusionMatrix" }) as any as Schema.Schema<ConfusionMatrix>;

export interface MultiClassClassificationMetrics {
  /** Aggregate classification metrics. */
  aggregateClassificationMetrics?: AggregateClassificationMetrics;
  /** Confusion matrix at different thresholds. */
  confusionMatrixList?: Array<ConfusionMatrix>;
}

export const MultiClassClassificationMetrics: Schema.Schema<MultiClassClassificationMetrics> = Schema.suspend(() => Schema.Struct({
  aggregateClassificationMetrics: Schema.optional(AggregateClassificationMetrics),
  confusionMatrixList: Schema.optional(Schema.Array(ConfusionMatrix)),
})).annotate({ identifier: "MultiClassClassificationMetrics" }) as any as Schema.Schema<MultiClassClassificationMetrics>;

export interface BinaryConfusionMatrix {
  /** Number of false samples predicted as true. */
  falsePositives?: string;
  /** Number of true samples predicted as false. */
  trueNegatives?: string;
  /** Threshold value used when computing each of the following metric. */
  positiveClassThreshold?: number;
  /** The fraction of actual positive labels that were given a positive prediction. */
  recall?: number;
  /** The fraction of actual positive predictions that had positive actual labels. */
  precision?: number;
  /** The fraction of predictions given the correct label. */
  accuracy?: number;
  /** Number of true samples predicted as true. */
  truePositives?: string;
  /** The equally weighted average of recall and precision. */
  f1Score?: number;
  /** Number of false samples predicted as false. */
  falseNegatives?: string;
}

export const BinaryConfusionMatrix: Schema.Schema<BinaryConfusionMatrix> = Schema.suspend(() => Schema.Struct({
  falsePositives: Schema.optional(Schema.String),
  trueNegatives: Schema.optional(Schema.String),
  positiveClassThreshold: Schema.optional(Schema.Number),
  recall: Schema.optional(Schema.Number),
  precision: Schema.optional(Schema.Number),
  accuracy: Schema.optional(Schema.Number),
  truePositives: Schema.optional(Schema.String),
  f1Score: Schema.optional(Schema.Number),
  falseNegatives: Schema.optional(Schema.String),
})).annotate({ identifier: "BinaryConfusionMatrix" }) as any as Schema.Schema<BinaryConfusionMatrix>;

export interface BinaryClassificationMetrics {
  /** Binary confusion matrix at multiple thresholds. */
  binaryConfusionMatrixList?: Array<BinaryConfusionMatrix>;
  /** Label representing the negative class. */
  negativeLabel?: string;
  /** Aggregate classification metrics. */
  aggregateClassificationMetrics?: AggregateClassificationMetrics;
  /** Label representing the positive class. */
  positiveLabel?: string;
}

export const BinaryClassificationMetrics: Schema.Schema<BinaryClassificationMetrics> = Schema.suspend(() => Schema.Struct({
  binaryConfusionMatrixList: Schema.optional(Schema.Array(BinaryConfusionMatrix)),
  negativeLabel: Schema.optional(Schema.String),
  aggregateClassificationMetrics: Schema.optional(AggregateClassificationMetrics),
  positiveLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "BinaryClassificationMetrics" }) as any as Schema.Schema<BinaryClassificationMetrics>;

export interface RegressionMetrics {
  /** Mean squared error. */
  meanSquaredError?: number;
  /** Median absolute error. */
  medianAbsoluteError?: number;
  /** Mean absolute error. */
  meanAbsoluteError?: number;
  /** R^2 score. This corresponds to r2_score in ML.EVALUATE. */
  rSquared?: number;
  /** Mean squared log error. */
  meanSquaredLogError?: number;
}

export const RegressionMetrics: Schema.Schema<RegressionMetrics> = Schema.suspend(() => Schema.Struct({
  meanSquaredError: Schema.optional(Schema.Number),
  medianAbsoluteError: Schema.optional(Schema.Number),
  meanAbsoluteError: Schema.optional(Schema.Number),
  rSquared: Schema.optional(Schema.Number),
  meanSquaredLogError: Schema.optional(Schema.Number),
})).annotate({ identifier: "RegressionMetrics" }) as any as Schema.Schema<RegressionMetrics>;

export interface Cluster {
  /** Centroid id. */
  centroidId?: string;
  /** Count of training data rows that were assigned to this cluster. */
  count?: string;
  /** Values of highly variant features for this cluster. */
  featureValues?: Array<FeatureValue>;
}

export const Cluster: Schema.Schema<Cluster> = Schema.suspend(() => Schema.Struct({
  centroidId: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  featureValues: Schema.optional(Schema.Array(FeatureValue)),
})).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface ClusteringMetrics {
  /** Information for all clusters. */
  clusters?: Array<Cluster>;
  /** Davies-Bouldin index. */
  daviesBouldinIndex?: number;
  /** Mean of squared distances between each sample to its cluster centroid. */
  meanSquaredDistance?: number;
}

export const ClusteringMetrics: Schema.Schema<ClusteringMetrics> = Schema.suspend(() => Schema.Struct({
  clusters: Schema.optional(Schema.Array(Cluster)),
  daviesBouldinIndex: Schema.optional(Schema.Number),
  meanSquaredDistance: Schema.optional(Schema.Number),
})).annotate({ identifier: "ClusteringMetrics" }) as any as Schema.Schema<ClusteringMetrics>;

export interface DimensionalityReductionMetrics {
  /** Total percentage of variance explained by the selected principal components. */
  totalExplainedVarianceRatio?: number;
}

export const DimensionalityReductionMetrics: Schema.Schema<DimensionalityReductionMetrics> = Schema.suspend(() => Schema.Struct({
  totalExplainedVarianceRatio: Schema.optional(Schema.Number),
})).annotate({ identifier: "DimensionalityReductionMetrics" }) as any as Schema.Schema<DimensionalityReductionMetrics>;

export interface ArimaFittingMetrics {
  /** Log-likelihood. */
  logLikelihood?: number;
  /** AIC. */
  aic?: number;
  /** Variance. */
  variance?: number;
}

export const ArimaFittingMetrics: Schema.Schema<ArimaFittingMetrics> = Schema.suspend(() => Schema.Struct({
  logLikelihood: Schema.optional(Schema.Number),
  aic: Schema.optional(Schema.Number),
  variance: Schema.optional(Schema.Number),
})).annotate({ identifier: "ArimaFittingMetrics" }) as any as Schema.Schema<ArimaFittingMetrics>;

export interface ArimaSingleModelForecastingMetrics {
  /** Arima fitting metrics. */
  arimaFittingMetrics?: ArimaFittingMetrics;
  /** The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns. */
  timeSeriesIds?: Array<string>;
  /** If true, step_changes is a part of time series decomposition result. */
  hasStepChanges?: boolean;
  /** If true, holiday_effect is a part of time series decomposition result. */
  hasHolidayEffect?: boolean;
  /** If true, spikes_and_dips is a part of time series decomposition result. */
  hasSpikesAndDips?: boolean;
  /** Non-seasonal order. */
  nonSeasonalOrder?: ArimaOrder;
  /** Is arima model fitted with drift or not. It is always false when d is not 1. */
  hasDrift?: boolean;
  /** The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used. */
  timeSeriesId?: string;
  /** Seasonal periods. Repeated because multiple periods are supported for one time series. */
  seasonalPeriods?: Array<"SEASONAL_PERIOD_TYPE_UNSPECIFIED" | "NO_SEASONALITY" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "HOURLY" | (string & {})>;
}

export const ArimaSingleModelForecastingMetrics: Schema.Schema<ArimaSingleModelForecastingMetrics> = Schema.suspend(() => Schema.Struct({
  arimaFittingMetrics: Schema.optional(ArimaFittingMetrics),
  timeSeriesIds: Schema.optional(Schema.Array(Schema.String)),
  hasStepChanges: Schema.optional(Schema.Boolean),
  hasHolidayEffect: Schema.optional(Schema.Boolean),
  hasSpikesAndDips: Schema.optional(Schema.Boolean),
  nonSeasonalOrder: Schema.optional(ArimaOrder),
  hasDrift: Schema.optional(Schema.Boolean),
  timeSeriesId: Schema.optional(Schema.String),
  seasonalPeriods: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ArimaSingleModelForecastingMetrics" }) as any as Schema.Schema<ArimaSingleModelForecastingMetrics>;

export interface ArimaForecastingMetrics {
  /** Whether Arima model fitted with drift or not. It is always false when d is not 1. */
  hasDrift?: Array<boolean>;
  /** Id to differentiate different time series for the large-scale case. */
  timeSeriesId?: Array<string>;
  /** Non-seasonal order. */
  nonSeasonalOrder?: Array<ArimaOrder>;
  /** Seasonal periods. Repeated because multiple periods are supported for one time series. */
  seasonalPeriods?: Array<"SEASONAL_PERIOD_TYPE_UNSPECIFIED" | "NO_SEASONALITY" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "HOURLY" | (string & {})>;
  /** Repeated as there can be many metric sets (one for each model) in auto-arima and the large-scale case. */
  arimaSingleModelForecastingMetrics?: Array<ArimaSingleModelForecastingMetrics>;
  /** Arima model fitting metrics. */
  arimaFittingMetrics?: Array<ArimaFittingMetrics>;
}

export const ArimaForecastingMetrics: Schema.Schema<ArimaForecastingMetrics> = Schema.suspend(() => Schema.Struct({
  hasDrift: Schema.optional(Schema.Array(Schema.Boolean)),
  timeSeriesId: Schema.optional(Schema.Array(Schema.String)),
  nonSeasonalOrder: Schema.optional(Schema.Array(ArimaOrder)),
  seasonalPeriods: Schema.optional(Schema.Array(Schema.String)),
  arimaSingleModelForecastingMetrics: Schema.optional(Schema.Array(ArimaSingleModelForecastingMetrics)),
  arimaFittingMetrics: Schema.optional(Schema.Array(ArimaFittingMetrics)),
})).annotate({ identifier: "ArimaForecastingMetrics" }) as any as Schema.Schema<ArimaForecastingMetrics>;

export interface EvaluationMetrics {
  /** Populated for implicit feedback type matrix factorization models. */
  rankingMetrics?: RankingMetrics;
  /** Populated for multi-class classification/classifier models. */
  multiClassClassificationMetrics?: MultiClassClassificationMetrics;
  /** Populated for binary classification/classifier models. */
  binaryClassificationMetrics?: BinaryClassificationMetrics;
  /** Populated for regression models and explicit feedback type matrix factorization models. */
  regressionMetrics?: RegressionMetrics;
  /** Populated for clustering models. */
  clusteringMetrics?: ClusteringMetrics;
  /** Evaluation metrics when the model is a dimensionality reduction model, which currently includes PCA. */
  dimensionalityReductionMetrics?: DimensionalityReductionMetrics;
  /** Populated for ARIMA models. */
  arimaForecastingMetrics?: ArimaForecastingMetrics;
}

export const EvaluationMetrics: Schema.Schema<EvaluationMetrics> = Schema.suspend(() => Schema.Struct({
  rankingMetrics: Schema.optional(RankingMetrics),
  multiClassClassificationMetrics: Schema.optional(MultiClassClassificationMetrics),
  binaryClassificationMetrics: Schema.optional(BinaryClassificationMetrics),
  regressionMetrics: Schema.optional(RegressionMetrics),
  clusteringMetrics: Schema.optional(ClusteringMetrics),
  dimensionalityReductionMetrics: Schema.optional(DimensionalityReductionMetrics),
  arimaForecastingMetrics: Schema.optional(ArimaForecastingMetrics),
})).annotate({ identifier: "EvaluationMetrics" }) as any as Schema.Schema<EvaluationMetrics>;

export interface HparamTuningTrial {
  /** The hyperprameters selected for this trial. */
  hparams?: TrainingOptions;
  /** Loss computed on the training data at the end of trial. */
  trainingLoss?: number;
  /** Loss computed on the eval data at the end of trial. */
  evalLoss?: number;
  /** 1-based index of the trial. */
  trialId?: string;
  /** Starting time of the trial. */
  startTimeMs?: string;
  /** Ending time of the trial. */
  endTimeMs?: string;
  /** Evaluation metrics of this trial calculated on the test data. Empty in Job API. */
  evaluationMetrics?: EvaluationMetrics;
  /** Hyperparameter tuning evaluation metrics of this trial calculated on the eval data. Unlike evaluation_metrics, only the fields corresponding to the hparam_tuning_objectives are set. */
  hparamTuningEvaluationMetrics?: EvaluationMetrics;
  /** Error message for FAILED and INFEASIBLE trial. */
  errorMessage?: string;
  /** The status of the trial. */
  status?: "TRIAL_STATUS_UNSPECIFIED" | "NOT_STARTED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "INFEASIBLE" | "STOPPED_EARLY" | (string & {});
}

export const HparamTuningTrial: Schema.Schema<HparamTuningTrial> = Schema.suspend(() => Schema.Struct({
  hparams: Schema.optional(TrainingOptions),
  trainingLoss: Schema.optional(Schema.Number),
  evalLoss: Schema.optional(Schema.Number),
  trialId: Schema.optional(Schema.String),
  startTimeMs: Schema.optional(Schema.String),
  endTimeMs: Schema.optional(Schema.String),
  evaluationMetrics: Schema.optional(EvaluationMetrics),
  hparamTuningEvaluationMetrics: Schema.optional(EvaluationMetrics),
  errorMessage: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "HparamTuningTrial" }) as any as Schema.Schema<HparamTuningTrial>;

export interface TransformColumn {
  /** Output only. Name of the column. */
  name?: string;
  /** Output only. The SQL expression used in the column transform. */
  transformSql?: string;
  /** Output only. Data type of the column after the transform. */
  type?: StandardSqlDataType;
}

export const TransformColumn: Schema.Schema<TransformColumn> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  transformSql: Schema.optional(Schema.String),
  type: Schema.optional(StandardSqlDataType),
})).annotate({ identifier: "TransformColumn" }) as any as Schema.Schema<TransformColumn>;

export interface EncryptionConfiguration {
  /** Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key. */
  kmsKeyName?: string;
}

export const EncryptionConfiguration: Schema.Schema<EncryptionConfiguration> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfiguration" }) as any as Schema.Schema<EncryptionConfiguration>;

export interface Explanation {
  /** Attribution of feature. */
  attribution?: number;
  /** The full feature name. For non-numerical features, will be formatted like `.`. Overall size of feature name will always be truncated to first 120 characters. */
  featureName?: string;
}

export const Explanation: Schema.Schema<Explanation> = Schema.suspend(() => Schema.Struct({
  attribution: Schema.optional(Schema.Number),
  featureName: Schema.optional(Schema.String),
})).annotate({ identifier: "Explanation" }) as any as Schema.Schema<Explanation>;

export interface GlobalExplanation {
  /** A list of the top global explanations. Sorted by absolute value of attribution in descending order. */
  explanations?: Array<Explanation>;
  /** Class label for this set of global explanations. Will be empty/null for binary logistic and linear regression models. Sorted alphabetically in descending order. */
  classLabel?: string;
}

export const GlobalExplanation: Schema.Schema<GlobalExplanation> = Schema.suspend(() => Schema.Struct({
  explanations: Schema.optional(Schema.Array(Explanation)),
  classLabel: Schema.optional(Schema.String),
})).annotate({ identifier: "GlobalExplanation" }) as any as Schema.Schema<GlobalExplanation>;

export interface PrincipalComponentInfo {
  /** Explained_variance over the total explained variance. */
  explainedVarianceRatio?: number;
  /** The explained_variance is pre-ordered in the descending order to compute the cumulative explained variance ratio. */
  cumulativeExplainedVarianceRatio?: number;
  /** Id of the principal component. */
  principalComponentId?: string;
  /** Explained variance by this principal component, which is simply the eigenvalue. */
  explainedVariance?: number;
}

export const PrincipalComponentInfo: Schema.Schema<PrincipalComponentInfo> = Schema.suspend(() => Schema.Struct({
  explainedVarianceRatio: Schema.optional(Schema.Number),
  cumulativeExplainedVarianceRatio: Schema.optional(Schema.Number),
  principalComponentId: Schema.optional(Schema.String),
  explainedVariance: Schema.optional(Schema.Number),
})).annotate({ identifier: "PrincipalComponentInfo" }) as any as Schema.Schema<PrincipalComponentInfo>;

export interface ArimaCoefficients {
  /** Intercept coefficient, just a double not an array. */
  interceptCoefficient?: number;
  /** Moving-average coefficients, an array of double. */
  movingAverageCoefficients?: Array<number>;
  /** Auto-regressive coefficients, an array of double. */
  autoRegressiveCoefficients?: Array<number>;
}

export const ArimaCoefficients: Schema.Schema<ArimaCoefficients> = Schema.suspend(() => Schema.Struct({
  interceptCoefficient: Schema.optional(Schema.Number),
  movingAverageCoefficients: Schema.optional(Schema.Array(Schema.Number)),
  autoRegressiveCoefficients: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "ArimaCoefficients" }) as any as Schema.Schema<ArimaCoefficients>;

export interface ArimaModelInfo {
  /** Seasonal periods. Repeated because multiple periods are supported for one time series. */
  seasonalPeriods?: Array<"SEASONAL_PERIOD_TYPE_UNSPECIFIED" | "NO_SEASONALITY" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "HOURLY" | (string & {})>;
  /** The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns. */
  timeSeriesIds?: Array<string>;
  /** If true, spikes_and_dips is a part of time series decomposition result. */
  hasSpikesAndDips?: boolean;
  /** Non-seasonal order. */
  nonSeasonalOrder?: ArimaOrder;
  /** If true, holiday_effect is a part of time series decomposition result. */
  hasHolidayEffect?: boolean;
  /** Whether Arima model fitted with drift or not. It is always false when d is not 1. */
  hasDrift?: boolean;
  /** If true, step_changes is a part of time series decomposition result. */
  hasStepChanges?: boolean;
  /** The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used. */
  timeSeriesId?: string;
  /** Arima coefficients. */
  arimaCoefficients?: ArimaCoefficients;
  /** Arima fitting metrics. */
  arimaFittingMetrics?: ArimaFittingMetrics;
}

export const ArimaModelInfo: Schema.Schema<ArimaModelInfo> = Schema.suspend(() => Schema.Struct({
  seasonalPeriods: Schema.optional(Schema.Array(Schema.String)),
  timeSeriesIds: Schema.optional(Schema.Array(Schema.String)),
  hasSpikesAndDips: Schema.optional(Schema.Boolean),
  nonSeasonalOrder: Schema.optional(ArimaOrder),
  hasHolidayEffect: Schema.optional(Schema.Boolean),
  hasDrift: Schema.optional(Schema.Boolean),
  hasStepChanges: Schema.optional(Schema.Boolean),
  timeSeriesId: Schema.optional(Schema.String),
  arimaCoefficients: Schema.optional(ArimaCoefficients),
  arimaFittingMetrics: Schema.optional(ArimaFittingMetrics),
})).annotate({ identifier: "ArimaModelInfo" }) as any as Schema.Schema<ArimaModelInfo>;

export interface ArimaResult {
  /** Seasonal periods. Repeated because multiple periods are supported for one time series. */
  seasonalPeriods?: Array<"SEASONAL_PERIOD_TYPE_UNSPECIFIED" | "NO_SEASONALITY" | "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY" | "YEARLY" | "HOURLY" | (string & {})>;
  /** This message is repeated because there are multiple arima models fitted in auto-arima. For non-auto-arima model, its size is one. */
  arimaModelInfo?: Array<ArimaModelInfo>;
}

export const ArimaResult: Schema.Schema<ArimaResult> = Schema.suspend(() => Schema.Struct({
  seasonalPeriods: Schema.optional(Schema.Array(Schema.String)),
  arimaModelInfo: Schema.optional(Schema.Array(ArimaModelInfo)),
})).annotate({ identifier: "ArimaResult" }) as any as Schema.Schema<ArimaResult>;

export interface ClusterInfo {
  /** Cluster radius, the average distance from centroid to each point assigned to the cluster. */
  clusterRadius?: number;
  /** Centroid id. */
  centroidId?: string;
  /** Cluster size, the total number of points assigned to the cluster. */
  clusterSize?: string;
}

export const ClusterInfo: Schema.Schema<ClusterInfo> = Schema.suspend(() => Schema.Struct({
  clusterRadius: Schema.optional(Schema.Number),
  centroidId: Schema.optional(Schema.String),
  clusterSize: Schema.optional(Schema.String),
})).annotate({ identifier: "ClusterInfo" }) as any as Schema.Schema<ClusterInfo>;

export interface IterationResult {
  /** Time taken to run the iteration in milliseconds. */
  durationMs?: string;
  /** Loss computed on the eval data at the end of iteration. */
  evalLoss?: number;
  /** The information of the principal components. */
  principalComponentInfos?: Array<PrincipalComponentInfo>;
  /** Index of the iteration, 0 based. */
  index?: number;
  /** Learn rate used for this iteration. */
  learnRate?: number;
  /** Loss computed on the training data at the end of iteration. */
  trainingLoss?: number;
  /** Arima result. */
  arimaResult?: ArimaResult;
  /** Information about top clusters for clustering models. */
  clusterInfos?: Array<ClusterInfo>;
}

export const IterationResult: Schema.Schema<IterationResult> = Schema.suspend(() => Schema.Struct({
  durationMs: Schema.optional(Schema.String),
  evalLoss: Schema.optional(Schema.Number),
  principalComponentInfos: Schema.optional(Schema.Array(PrincipalComponentInfo)),
  index: Schema.optional(Schema.Number),
  learnRate: Schema.optional(Schema.Number),
  trainingLoss: Schema.optional(Schema.Number),
  arimaResult: Schema.optional(ArimaResult),
  clusterInfos: Schema.optional(Schema.Array(ClusterInfo)),
})).annotate({ identifier: "IterationResult" }) as any as Schema.Schema<IterationResult>;

export interface DataSplitResult {
  /** Table reference of the test data after split. */
  testTable?: TableReference;
  /** Table reference of the training data after split. */
  trainingTable?: TableReference;
  /** Table reference of the evaluation data after split. */
  evaluationTable?: TableReference;
}

export const DataSplitResult: Schema.Schema<DataSplitResult> = Schema.suspend(() => Schema.Struct({
  testTable: Schema.optional(TableReference),
  trainingTable: Schema.optional(TableReference),
  evaluationTable: Schema.optional(TableReference),
})).annotate({ identifier: "DataSplitResult" }) as any as Schema.Schema<DataSplitResult>;

export interface TrainingRun {
  /** Output only. Global explanation contains the explanation of top features on the class level. Applies to classification models only. */
  classLevelGlobalExplanations?: Array<GlobalExplanation>;
  /** Output only. The model version in the [Vertex AI Model Registry](https://cloud.google.com/vertex-ai/docs/model-registry/introduction) for this training run. */
  vertexAiModelVersion?: string;
  /** Output only. The start time of this training run, in milliseconds since epoch. */
  trainingStartTime?: string;
  /** Output only. The evaluation metrics over training/eval data that were computed at the end of training. */
  evaluationMetrics?: EvaluationMetrics;
  /** Output only. Global explanation contains the explanation of top features on the model level. Applies to both regression and classification models. */
  modelLevelGlobalExplanation?: GlobalExplanation;
  /** Output only. Output of each iteration run, results.size() <= max_iterations. */
  results?: Array<IterationResult>;
  /** The model id in the [Vertex AI Model Registry](https://cloud.google.com/vertex-ai/docs/model-registry/introduction) for this training run. */
  vertexAiModelId?: string;
  /** Output only. The start time of this training run. */
  startTime?: string;
  /** Output only. Data split result of the training run. Only set when the input data is actually split. */
  dataSplitResult?: DataSplitResult;
  /** Output only. Options that were used for this training run, includes user specified and default options that were used. */
  trainingOptions?: TrainingOptions;
}

export const TrainingRun: Schema.Schema<TrainingRun> = Schema.suspend(() => Schema.Struct({
  classLevelGlobalExplanations: Schema.optional(Schema.Array(GlobalExplanation)),
  vertexAiModelVersion: Schema.optional(Schema.String),
  trainingStartTime: Schema.optional(Schema.String),
  evaluationMetrics: Schema.optional(EvaluationMetrics),
  modelLevelGlobalExplanation: Schema.optional(GlobalExplanation),
  results: Schema.optional(Schema.Array(IterationResult)),
  vertexAiModelId: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  dataSplitResult: Schema.optional(DataSplitResult),
  trainingOptions: Schema.optional(TrainingOptions),
})).annotate({ identifier: "TrainingRun" }) as any as Schema.Schema<TrainingRun>;

export interface Model {
  /** Output only. Remote model info */
  remoteModelInfo?: RemoteModelInfo;
  /** Output only. Input feature columns for the model inference. If the model is trained with TRANSFORM clause, these are the input of the TRANSFORM clause. */
  featureColumns?: Array<StandardSqlField>;
  /** Output only. All hyperparameter search spaces in this model. */
  hparamSearchSpaces?: HparamSearchSpaces;
  /** The best trial_id across all training runs. */
  bestTrialId?: string;
  /** Output only. A hash of this resource. */
  etag?: string;
  /** Output only. The time when this model was created, in millisecs since the epoch. */
  creationTime?: string;
  /** The labels associated with this model. You can use these to organize and group your models. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key. */
  labels?: Record<string, string>;
  /** Optional. A descriptive name for this model. */
  friendlyName?: string;
  /** Output only. For single-objective [hyperparameter tuning](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, it only contains the best trial. For multi-objective [hyperparameter tuning](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, it contains all Pareto optimal trials sorted by trial_id. */
  optimalTrialIds?: Array<string>;
  /** Output only. The time when this model was last modified, in millisecs since the epoch. */
  lastModifiedTime?: string;
  /** Optional. A user-friendly description of this model. */
  description?: string;
  /** Required. Unique identifier for this model. */
  modelReference?: ModelReference;
  /** Output only. Trials of a [hyperparameter tuning](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) model sorted by trial_id. */
  hparamTrials?: Array<HparamTuningTrial>;
  /** Output only. Label columns that were used to train this model. The output of the model will have a "predicted_" prefix to these columns. */
  labelColumns?: Array<StandardSqlField>;
  /** Output only. The geographic location where the model resides. This value is inherited from the dataset. */
  location?: string;
  /** Output only. This field will be populated if a TRANSFORM clause was used to train a model. TRANSFORM clause (if used) takes feature_columns as input and outputs transform_columns. transform_columns then are used to train the model. */
  transformColumns?: Array<TransformColumn>;
  /** Custom encryption configuration (e.g., Cloud KMS keys). This shows the encryption configuration of the model data while stored in BigQuery storage. This field can be used with PatchModel to update encryption key for an already encrypted model. */
  encryptionConfiguration?: EncryptionConfiguration;
  /** Information for all training runs in increasing order of start_time. */
  trainingRuns?: Array<TrainingRun>;
  /** Output only. The default trial_id to use in TVFs when the trial_id is not passed in. For single-objective [hyperparameter tuning](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, this is the best trial ID. For multi-objective [hyperparameter tuning](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, this is the smallest trial ID among all Pareto optimal trials. */
  defaultTrialId?: string;
  /** Optional. The time when this model expires, in milliseconds since the epoch. If not present, the model will persist indefinitely. Expired models will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created models. */
  expirationTime?: string;
  /** Output only. Type of the model resource. */
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "LINEAR_REGRESSION" | "LOGISTIC_REGRESSION" | "KMEANS" | "MATRIX_FACTORIZATION" | "DNN_CLASSIFIER" | "TENSORFLOW" | "DNN_REGRESSOR" | "XGBOOST" | "BOOSTED_TREE_REGRESSOR" | "BOOSTED_TREE_CLASSIFIER" | "ARIMA" | "AUTOML_REGRESSOR" | "AUTOML_CLASSIFIER" | "PCA" | "DNN_LINEAR_COMBINED_CLASSIFIER" | "DNN_LINEAR_COMBINED_REGRESSOR" | "AUTOENCODER" | "ARIMA_PLUS" | "ARIMA_PLUS_XREG" | "RANDOM_FOREST_REGRESSOR" | "RANDOM_FOREST_CLASSIFIER" | "TENSORFLOW_LITE" | "ONNX" | "TRANSFORM_ONLY" | "CONTRIBUTION_ANALYSIS" | (string & {});
}

export const Model: Schema.Schema<Model> = Schema.suspend(() => Schema.Struct({
  remoteModelInfo: Schema.optional(RemoteModelInfo),
  featureColumns: Schema.optional(Schema.Array(StandardSqlField)),
  hparamSearchSpaces: Schema.optional(HparamSearchSpaces),
  bestTrialId: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  friendlyName: Schema.optional(Schema.String),
  optimalTrialIds: Schema.optional(Schema.Array(Schema.String)),
  lastModifiedTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  modelReference: Schema.optional(ModelReference),
  hparamTrials: Schema.optional(Schema.Array(HparamTuningTrial)),
  labelColumns: Schema.optional(Schema.Array(StandardSqlField)),
  location: Schema.optional(Schema.String),
  transformColumns: Schema.optional(Schema.Array(TransformColumn)),
  encryptionConfiguration: Schema.optional(EncryptionConfiguration),
  trainingRuns: Schema.optional(Schema.Array(TrainingRun)),
  defaultTrialId: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  modelType: Schema.optional(Schema.String),
})).annotate({ identifier: "Model" }) as any as Schema.Schema<Model>;

export interface ListModelsResponse {
  /** Models in the requested dataset. Only the following fields are populated: model_reference, model_type, creation_time, last_modified_time and labels. */
  models?: Array<Model>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListModelsResponse: Schema.Schema<ListModelsResponse> = Schema.suspend(() => Schema.Struct({
  models: Schema.optional(Schema.Array(Model)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListModelsResponse" }) as any as Schema.Schema<ListModelsResponse>;

export interface SparkLoggingInfo {
  /** Output only. Resource type used for logging. */
  resourceType?: string;
  /** Output only. Project ID where the Spark logs were written. */
  projectId?: string;
}

export const SparkLoggingInfo: Schema.Schema<SparkLoggingInfo> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "SparkLoggingInfo" }) as any as Schema.Schema<SparkLoggingInfo>;

export interface SparkStatistics {
  /** Output only. The Google Cloud Storage bucket that is used as the default file system by the Spark application. This field is only filled when the Spark procedure uses the invoker security mode. The `gcsStagingBucket` bucket is inferred from the `@@spark_proc_properties.staging_bucket` system variable (if it is provided). Otherwise, BigQuery creates a default staging bucket for the job and returns the bucket name in this field. Example: * `gs://[bucket_name]` */
  gcsStagingBucket?: string;
  /** Output only. The Cloud KMS encryption key that is used to protect the resources created by the Spark job. If the Spark procedure uses the invoker security mode, the Cloud KMS encryption key is either inferred from the provided system variable, `@@spark_proc_properties.kms_key_name`, or the default key of the BigQuery job's project (if the CMEK organization policy is enforced). Otherwise, the Cloud KMS key is either inferred from the Spark connection associated with the procedure (if it is provided), or from the default key of the Spark connection's project if the CMEK organization policy is enforced. Example: * `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]` */
  kmsKeyName?: string;
  /** Output only. Spark job ID if a Spark job is created successfully. */
  sparkJobId?: string;
  /** Output only. Logging info is used to generate a link to Cloud Logging. */
  loggingInfo?: SparkLoggingInfo;
  /** Output only. Endpoints returned from Dataproc. Key list: - history_server_endpoint: A link to Spark job UI. */
  endpoints?: Record<string, string>;
  /** Output only. Location where the Spark job is executed. A location is selected by BigQueury for jobs configured to run in a multi-region. */
  sparkJobLocation?: string;
}

export const SparkStatistics: Schema.Schema<SparkStatistics> = Schema.suspend(() => Schema.Struct({
  gcsStagingBucket: Schema.optional(Schema.String),
  kmsKeyName: Schema.optional(Schema.String),
  sparkJobId: Schema.optional(Schema.String),
  loggingInfo: Schema.optional(SparkLoggingInfo),
  endpoints: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  sparkJobLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "SparkStatistics" }) as any as Schema.Schema<SparkStatistics>;

export interface JobStatistics5 {
  /** Output only. Number of rows copied to the destination table. */
  copiedRows?: string;
  /** Output only. Number of logical bytes copied to the destination table. */
  copiedLogicalBytes?: string;
}

export const JobStatistics5: Schema.Schema<JobStatistics5> = Schema.suspend(() => Schema.Struct({
  copiedRows: Schema.optional(Schema.String),
  copiedLogicalBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "JobStatistics5" }) as any as Schema.Schema<JobStatistics5>;

export interface CloneDefinition {
  /** Required. Reference describing the ID of the table that was cloned. */
  baseTableReference?: TableReference;
  /** Required. The time at which the base table was cloned. This value is reported in the JSON response using RFC3339 format. */
  cloneTime?: string;
}

export const CloneDefinition: Schema.Schema<CloneDefinition> = Schema.suspend(() => Schema.Struct({
  baseTableReference: Schema.optional(TableReference),
  cloneTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CloneDefinition" }) as any as Schema.Schema<CloneDefinition>;

export type JsonValue = unknown;
export const JsonValue = Schema.Unknown;

export interface ScriptStackFrame {
  /** Output only. One-based end line. */
  endLine?: number;
  /** Output only. One-based start column. */
  startColumn?: number;
  /** Output only. One-based start line. */
  startLine?: number;
  /** Output only. Text of the current statement/expression. */
  text?: string;
  /** Output only. One-based end column. */
  endColumn?: number;
  /** Output only. Name of the active procedure, empty if in a top-level script. */
  procedureId?: string;
}

export const ScriptStackFrame: Schema.Schema<ScriptStackFrame> = Schema.suspend(() => Schema.Struct({
  endLine: Schema.optional(Schema.Number),
  startColumn: Schema.optional(Schema.Number),
  startLine: Schema.optional(Schema.Number),
  text: Schema.optional(Schema.String),
  endColumn: Schema.optional(Schema.Number),
  procedureId: Schema.optional(Schema.String),
})).annotate({ identifier: "ScriptStackFrame" }) as any as Schema.Schema<ScriptStackFrame>;

export interface SessionInfo {
  /** Output only. The id of the session. */
  sessionId?: string;
}

export const SessionInfo: Schema.Schema<SessionInfo> = Schema.suspend(() => Schema.Struct({
  sessionId: Schema.optional(Schema.String),
})).annotate({ identifier: "SessionInfo" }) as any as Schema.Schema<SessionInfo>;

export interface QueryTimelineSample {
  /** Cumulative slot-ms consumed by the query. */
  totalSlotMs?: string;
  /** Milliseconds elapsed since the start of query execution. */
  elapsedMs?: string;
  /** Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running. */
  pendingUnits?: string;
  /** Total parallel units of work completed by this query. */
  completedUnits?: string;
  /** Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots. */
  estimatedRunnableUnits?: string;
  /** Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample. */
  activeUnits?: string;
  /** Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only. */
  shuffleRamUsageRatio?: number;
}

export const QueryTimelineSample: Schema.Schema<QueryTimelineSample> = Schema.suspend(() => Schema.Struct({
  totalSlotMs: Schema.optional(Schema.String),
  elapsedMs: Schema.optional(Schema.String),
  pendingUnits: Schema.optional(Schema.String),
  completedUnits: Schema.optional(Schema.String),
  estimatedRunnableUnits: Schema.optional(Schema.String),
  activeUnits: Schema.optional(Schema.String),
  shuffleRamUsageRatio: Schema.optional(Schema.Number),
})).annotate({ identifier: "QueryTimelineSample" }) as any as Schema.Schema<QueryTimelineSample>;

export interface JobStatistics4 {
  /** Output only. Describes a timeline of job execution. */
  timeline?: Array<QueryTimelineSample>;
  /** Output only. Number of files per destination URI or URI pattern specified in the extract configuration. These values will be in the same order as the URIs specified in the 'destinationUris' field. */
  destinationUriFileCounts?: Array<string>;
  /** Output only. Number of user bytes extracted into the result. This is the byte count as computed by BigQuery for billing purposes and doesn't have any relationship with the number of actual result bytes extracted in the desired format. */
  inputBytes?: string;
}

export const JobStatistics4: Schema.Schema<JobStatistics4> = Schema.suspend(() => Schema.Struct({
  timeline: Schema.optional(Schema.Array(QueryTimelineSample)),
  destinationUriFileCounts: Schema.optional(Schema.Array(Schema.String)),
  inputBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "JobStatistics4" }) as any as Schema.Schema<JobStatistics4>;

export interface JobStatistics3 {
  /** Output only. Size of the loaded data in bytes. Note that while a load job is in the running state, this value may change. */
  outputBytes?: string;
  /** Output only. The number of bad records encountered. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data. */
  badRecords?: string;
  /** Output only. Number of bytes of source data in a load job. */
  inputFileBytes?: string;
  /** Output only. Describes a timeline of job execution. */
  timeline?: Array<QueryTimelineSample>;
  /** Output only. Number of rows imported in a load job. Note that while an import job is in the running state, this value may change. */
  outputRows?: string;
  /** Output only. Number of source files in a load job. */
  inputFiles?: string;
}

export const JobStatistics3: Schema.Schema<JobStatistics3> = Schema.suspend(() => Schema.Struct({
  outputBytes: Schema.optional(Schema.String),
  badRecords: Schema.optional(Schema.String),
  inputFileBytes: Schema.optional(Schema.String),
  timeline: Schema.optional(Schema.Array(QueryTimelineSample)),
  outputRows: Schema.optional(Schema.String),
  inputFiles: Schema.optional(Schema.String),
})).annotate({ identifier: "JobStatistics3" }) as any as Schema.Schema<JobStatistics3>;

export interface TransactionInfo {
  /** Output only. [Alpha] Id of the transaction. */
  transactionId?: string;
}

export const TransactionInfo: Schema.Schema<TransactionInfo> = Schema.suspend(() => Schema.Struct({
  transactionId: Schema.optional(Schema.String),
})).annotate({ identifier: "TransactionInfo" }) as any as Schema.Schema<TransactionInfo>;

export interface RowAccessPolicyReference {
  /** Required. The ID of the project containing this row access policy. */
  projectId?: string;
  /** Required. The ID of the table containing this row access policy. */
  tableId?: string;
  /** Required. The ID of the row access policy. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters. */
  policyId?: string;
  /** Required. The ID of the dataset containing this row access policy. */
  datasetId?: string;
}

export const RowAccessPolicyReference: Schema.Schema<RowAccessPolicyReference> = Schema.suspend(() => Schema.Struct({
  projectId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  policyId: Schema.optional(Schema.String),
  datasetId: Schema.optional(Schema.String),
})).annotate({ identifier: "RowAccessPolicyReference" }) as any as Schema.Schema<RowAccessPolicyReference>;

export interface MlStatistics {
  /** Output only. Trials of a [hyperparameter tuning job](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) sorted by trial_id. */
  hparamTrials?: Array<HparamTuningTrial>;
  /** Output only. Training type of the job. */
  trainingType?: "TRAINING_TYPE_UNSPECIFIED" | "SINGLE_TRAINING" | "HPARAM_TUNING" | (string & {});
  /** Output only. The type of the model that is being trained. */
  modelType?: "MODEL_TYPE_UNSPECIFIED" | "LINEAR_REGRESSION" | "LOGISTIC_REGRESSION" | "KMEANS" | "MATRIX_FACTORIZATION" | "DNN_CLASSIFIER" | "TENSORFLOW" | "DNN_REGRESSOR" | "XGBOOST" | "BOOSTED_TREE_REGRESSOR" | "BOOSTED_TREE_CLASSIFIER" | "ARIMA" | "AUTOML_REGRESSOR" | "AUTOML_CLASSIFIER" | "PCA" | "DNN_LINEAR_COMBINED_CLASSIFIER" | "DNN_LINEAR_COMBINED_REGRESSOR" | "AUTOENCODER" | "ARIMA_PLUS" | "ARIMA_PLUS_XREG" | "RANDOM_FOREST_REGRESSOR" | "RANDOM_FOREST_CLASSIFIER" | "TENSORFLOW_LITE" | "ONNX" | "TRANSFORM_ONLY" | "CONTRIBUTION_ANALYSIS" | (string & {});
  /** Output only. Maximum number of iterations specified as max_iterations in the 'CREATE MODEL' query. The actual number of iterations may be less than this number due to early stop. */
  maxIterations?: string;
  /** Results for all completed iterations. Empty for [hyperparameter tuning jobs](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview). */
  iterationResults?: Array<IterationResult>;
}

export const MlStatistics: Schema.Schema<MlStatistics> = Schema.suspend(() => Schema.Struct({
  hparamTrials: Schema.optional(Schema.Array(HparamTuningTrial)),
  trainingType: Schema.optional(Schema.String),
  modelType: Schema.optional(Schema.String),
  maxIterations: Schema.optional(Schema.String),
  iterationResults: Schema.optional(Schema.Array(IterationResult)),
})).annotate({ identifier: "MlStatistics" }) as any as Schema.Schema<MlStatistics>;

export interface QueryInfo {
  /** Output only. Information about query optimizations. */
  optimizationDetails?: Record<string, unknown>;
}

export const QueryInfo: Schema.Schema<QueryInfo> = Schema.suspend(() => Schema.Struct({
  optimizationDetails: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "QueryInfo" }) as any as Schema.Schema<QueryInfo>;

export interface DmlStatistics {
  /** Output only. Number of updated Rows. Populated by DML UPDATE and MERGE statements. */
  updatedRowCount?: string;
  /** Output only. Number of inserted Rows. Populated by DML INSERT and MERGE statements */
  insertedRowCount?: string;
  /** Output only. Number of deleted Rows. populated by DML DELETE, MERGE and TRUNCATE statements. */
  deletedRowCount?: string;
}

export const DmlStatistics: Schema.Schema<DmlStatistics> = Schema.suspend(() => Schema.Struct({
  updatedRowCount: Schema.optional(Schema.String),
  insertedRowCount: Schema.optional(Schema.String),
  deletedRowCount: Schema.optional(Schema.String),
})).annotate({ identifier: "DmlStatistics" }) as any as Schema.Schema<DmlStatistics>;

export interface BiEngineReason {
  /** Output only. High-level BI Engine reason for partial or disabled acceleration */
  code?: "CODE_UNSPECIFIED" | "NO_RESERVATION" | "INSUFFICIENT_RESERVATION" | "UNSUPPORTED_SQL_TEXT" | "INPUT_TOO_LARGE" | "OTHER_REASON" | "TABLE_EXCLUDED" | (string & {});
  /** Output only. Free form human-readable reason for partial or disabled acceleration. */
  message?: string;
}

export const BiEngineReason: Schema.Schema<BiEngineReason> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "BiEngineReason" }) as any as Schema.Schema<BiEngineReason>;

export interface BiEngineStatistics {
  /** In case of DISABLED or PARTIAL bi_engine_mode, these contain the explanatory reasons as to why BI Engine could not accelerate. In case the full query was accelerated, this field is not populated. */
  biEngineReasons?: Array<BiEngineReason>;
  /** Output only. Specifies which mode of BI Engine acceleration was performed (if any). */
  biEngineMode?: "ACCELERATION_MODE_UNSPECIFIED" | "DISABLED" | "PARTIAL" | "FULL" | (string & {});
  /** Output only. Specifies which mode of BI Engine acceleration was performed (if any). */
  accelerationMode?: "BI_ENGINE_ACCELERATION_MODE_UNSPECIFIED" | "BI_ENGINE_DISABLED" | "PARTIAL_INPUT" | "FULL_INPUT" | "FULL_QUERY" | (string & {});
}

export const BiEngineStatistics: Schema.Schema<BiEngineStatistics> = Schema.suspend(() => Schema.Struct({
  biEngineReasons: Schema.optional(Schema.Array(BiEngineReason)),
  biEngineMode: Schema.optional(Schema.String),
  accelerationMode: Schema.optional(Schema.String),
})).annotate({ identifier: "BiEngineStatistics" }) as any as Schema.Schema<BiEngineStatistics>;

export interface QueryParameterType {
  /** Optional. The type of the array's elements, if this is an array. */
  arrayType?: QueryParameterType;
  /** Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision) */
  timestampPrecision?: string;
  /** Required. The top level type of this field. */
  type?: string;
  /** Optional. The types of the fields of this struct, in order, if this is a struct. */
  structTypes?: Array<{ type?: QueryParameterType; description?: string; name?: string }>;
  /** Optional. The element type of the range, if this is a range. */
  rangeElementType?: QueryParameterType;
}

export const QueryParameterType: Schema.Schema<QueryParameterType> = Schema.suspend(() => Schema.Struct({
  arrayType: Schema.optional(QueryParameterType),
  timestampPrecision: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  structTypes: Schema.optional(Schema.Array(Schema.Struct({ type: Schema.optional(QueryParameterType), description: Schema.optional(Schema.String), name: Schema.optional(Schema.String) }))),
  rangeElementType: Schema.optional(QueryParameterType),
})).annotate({ identifier: "QueryParameterType" }) as any as Schema.Schema<QueryParameterType>;

export interface RangeValue {
  /** Optional. The start value of the range. A missing value represents an unbounded start. */
  start?: QueryParameterValue;
  /** Optional. The end value of the range. A missing value represents an unbounded end. */
  end?: QueryParameterValue;
}

export const RangeValue: Schema.Schema<RangeValue> = Schema.suspend(() => Schema.Struct({
  start: Schema.optional(QueryParameterValue),
  end: Schema.optional(QueryParameterValue),
})).annotate({ identifier: "RangeValue" }) as any as Schema.Schema<RangeValue>;

export interface QueryParameterValue {
  /** Optional. The range value, if this is a range type. */
  rangeValue?: RangeValue;
  /** The struct field values. */
  structValues?: Record<string, QueryParameterValue>;
  /** Optional. The value of this value, if a simple scalar type. */
  value?: string;
  /** Optional. The array values, if this is an array type. */
  arrayValues?: Array<QueryParameterValue>;
}

export const QueryParameterValue: Schema.Schema<QueryParameterValue> = Schema.suspend(() => Schema.Struct({
  rangeValue: Schema.optional(RangeValue),
  structValues: Schema.optional(Schema.Record(Schema.String, QueryParameterValue)),
  value: Schema.optional(Schema.String),
  arrayValues: Schema.optional(Schema.Array(QueryParameterValue)),
})).annotate({ identifier: "QueryParameterValue" }) as any as Schema.Schema<QueryParameterValue>;

export interface QueryParameter {
  /** Optional. If unset, this is a positional parameter. Otherwise, should be unique within a query. */
  name?: string;
  /** Required. The type of this parameter. */
  parameterType?: QueryParameterType;
  /** Required. The value of this parameter. */
  parameterValue?: QueryParameterValue;
}

export const QueryParameter: Schema.Schema<QueryParameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parameterType: Schema.optional(QueryParameterType),
  parameterValue: Schema.optional(QueryParameterValue),
})).annotate({ identifier: "QueryParameter" }) as any as Schema.Schema<QueryParameter>;

export interface DataPolicyOption {
  /** Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id. */
  name?: string;
}

export const DataPolicyOption: Schema.Schema<DataPolicyOption> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DataPolicyOption" }) as any as Schema.Schema<DataPolicyOption>;

export interface TableFieldSchema {
  /** Optional. Describes the nested schema fields if the type property is set to RECORD. */
  fields?: Array<TableFieldSchema>;
  /** Required. The field data type. Possible values include: * STRING * BYTES * INTEGER (or INT64) * FLOAT (or FLOAT64) * BOOLEAN (or BOOL) * TIMESTAMP * DATE * TIME * DATETIME * GEOGRAPHY * NUMERIC * BIGNUMERIC * JSON * RECORD (or STRUCT) * RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema. */
  type?: string;
  /** Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags. */
  policyTags?: { names?: Array<string> };
  /** Deprecated. */
  categories?: { names?: Array<string> };
  /** Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required. */
  foreignTypeDefinition?: string;
  /** Represents the type of a field element. */
  rangeElementType?: { type?: string };
  /** Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES". */
  maxLength?: string;
  /** Optional. Data policies attached to this field, used for field-level access control. */
  dataPolicies?: Array<DataPolicyOption>;
  /** Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: * 6 (Default, for TIMESTAMP type with microsecond precision) * 12 (For TIMESTAMP type with picosecond precision) */
  timestampPrecision?: string;
  /** Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: * Precision (P) and scale (S) are specified: [-10P-S + 10-S, 10P-S - 10-S] * Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): [-10P + 1, 10P - 1]. Acceptable values for precision and scale if both are specified: * If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. * If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): * If type = "NUMERIC": 1 ≤ precision ≤ 29. * If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid. */
  precision?: string;
  /** Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_), and must start with a letter or underscore. The maximum length is 300 characters. */
  name?: string;
  /** Optional. Field collation can be set only when the type of field is STRING. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior. */
  collation?: string;
  /** Optional. A SQL expression to specify the [default value] (https://cloud.google.com/bigquery/docs/default-values) for this field. */
  defaultValueExpression?: string;
  /** Optional. The field description. The maximum length is 1,024 characters. */
  description?: string;
  /** Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE. */
  mode?: string;
  /** Optional. See documentation for precision. */
  scale?: string;
  /** Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type. */
  roundingMode?: "ROUNDING_MODE_UNSPECIFIED" | "ROUND_HALF_AWAY_FROM_ZERO" | "ROUND_HALF_EVEN" | (string & {});
}

export const TableFieldSchema: Schema.Schema<TableFieldSchema> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(TableFieldSchema)),
  type: Schema.optional(Schema.String),
  policyTags: Schema.optional(Schema.Struct({ names: Schema.optional(Schema.Array(Schema.String)) })),
  categories: Schema.optional(Schema.Struct({ names: Schema.optional(Schema.Array(Schema.String)) })),
  foreignTypeDefinition: Schema.optional(Schema.String),
  rangeElementType: Schema.optional(Schema.Struct({ type: Schema.optional(Schema.String) })),
  maxLength: Schema.optional(Schema.String),
  dataPolicies: Schema.optional(Schema.Array(DataPolicyOption)),
  timestampPrecision: Schema.optional(Schema.String),
  precision: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  collation: Schema.optional(Schema.String),
  defaultValueExpression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.String),
  roundingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "TableFieldSchema" }) as any as Schema.Schema<TableFieldSchema>;

export interface ForeignTypeInfo {
  /** Required. Specifies the system which defines the foreign data type. */
  typeSystem?: "TYPE_SYSTEM_UNSPECIFIED" | "HIVE" | (string & {});
}

export const ForeignTypeInfo: Schema.Schema<ForeignTypeInfo> = Schema.suspend(() => Schema.Struct({
  typeSystem: Schema.optional(Schema.String),
})).annotate({ identifier: "ForeignTypeInfo" }) as any as Schema.Schema<ForeignTypeInfo>;

export interface TableSchema {
  /** Describes the fields in a table. */
  fields?: Array<TableFieldSchema>;
  /** Optional. Specifies metadata of the foreign data type definition in field schema (TableFieldSchema.foreign_type_definition). */
  foreignTypeInfo?: ForeignTypeInfo;
}

export const TableSchema: Schema.Schema<TableSchema> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(TableFieldSchema)),
  foreignTypeInfo: Schema.optional(ForeignTypeInfo),
})).annotate({ identifier: "TableSchema" }) as any as Schema.Schema<TableSchema>;

export interface BigQueryModelTraining {
  /** Deprecated. */
  currentIteration?: number;
  /** Deprecated. */
  expectedTotalIterations?: string;
}

export const BigQueryModelTraining: Schema.Schema<BigQueryModelTraining> = Schema.suspend(() => Schema.Struct({
  currentIteration: Schema.optional(Schema.Number),
  expectedTotalIterations: Schema.optional(Schema.String),
})).annotate({ identifier: "BigQueryModelTraining" }) as any as Schema.Schema<BigQueryModelTraining>;

export interface LoadQueryStatistics {
  /** Output only. Number of bytes of source data in a LOAD query. */
  inputFileBytes?: string;
  /** Output only. This field is deprecated. The number of bytes of source data copied over the network for a `LOAD` query. `transferred_bytes` has the canonical value for physical transferred bytes, which is used for BigQuery Omni billing. */
  bytesTransferred?: string;
  /** Output only. Number of rows imported in a LOAD query. Note that while a LOAD query is in the running state, this value may change. */
  outputRows?: string;
  /** Output only. The number of bad records encountered while processing a LOAD query. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data. */
  badRecords?: string;
  /** Output only. Size of the loaded data in bytes. Note that while a LOAD query is in the running state, this value may change. */
  outputBytes?: string;
  /** Output only. Number of source files in a LOAD query. */
  inputFiles?: string;
}

export const LoadQueryStatistics: Schema.Schema<LoadQueryStatistics> = Schema.suspend(() => Schema.Struct({
  inputFileBytes: Schema.optional(Schema.String),
  bytesTransferred: Schema.optional(Schema.String),
  outputRows: Schema.optional(Schema.String),
  badRecords: Schema.optional(Schema.String),
  outputBytes: Schema.optional(Schema.String),
  inputFiles: Schema.optional(Schema.String),
})).annotate({ identifier: "LoadQueryStatistics" }) as any as Schema.Schema<LoadQueryStatistics>;

export interface ExternalServiceCost {
  /** The billing method used for the external job. This field, set to `SERVICES_SKU`, is only used when billing under the services SKU. Otherwise, it is unspecified for backward compatibility. */
  billingMethod?: string;
  /** External service name. */
  externalService?: string;
  /** Non-preemptable reserved slots used for external job. For example, reserved slots for Cloua AI Platform job are the VM usages converted to BigQuery slot with equivalent mount of price. */
  reservedSlotCount?: string;
  /** External service cost in terms of bigquery bytes processed. */
  bytesProcessed?: string;
  /** External service cost in terms of bigquery bytes billed. */
  bytesBilled?: string;
  /** External service cost in terms of bigquery slot milliseconds. */
  slotMs?: string;
}

export const ExternalServiceCost: Schema.Schema<ExternalServiceCost> = Schema.suspend(() => Schema.Struct({
  billingMethod: Schema.optional(Schema.String),
  externalService: Schema.optional(Schema.String),
  reservedSlotCount: Schema.optional(Schema.String),
  bytesProcessed: Schema.optional(Schema.String),
  bytesBilled: Schema.optional(Schema.String),
  slotMs: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalServiceCost" }) as any as Schema.Schema<ExternalServiceCost>;

export interface ExplainQueryStep {
  /** Machine-readable operation type. */
  kind?: string;
  /** Human-readable description of the step(s). */
  substeps?: Array<string>;
}

export const ExplainQueryStep: Schema.Schema<ExplainQueryStep> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  substeps: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ExplainQueryStep" }) as any as Schema.Schema<ExplainQueryStep>;

export interface ExplainQueryStage {
  /** Human-readable name for the stage. */
  name?: string;
  /** Number of records written by the stage. */
  recordsWritten?: string;
  /** Milliseconds the average shard spent on writing output. */
  writeMsAvg?: string;
  /** Relative amount of time the average shard spent on writing output. */
  writeRatioAvg?: number;
  /** Relative amount of time the slowest shard spent on CPU-bound tasks. */
  computeRatioMax?: number;
  /** IDs for stages that are inputs to this stage. */
  inputStages?: Array<string>;
  /** Milliseconds the average shard spent on CPU-bound tasks. */
  computeMsAvg?: string;
  /** Milliseconds the slowest shard spent reading input. */
  readMsMax?: string;
  /** Milliseconds the slowest shard spent on writing output. */
  writeMsMax?: string;
  /** Relative amount of time the slowest shard spent on writing output. */
  writeRatioMax?: number;
  /** Relative amount of time the average shard spent reading input. */
  readRatioAvg?: number;
  /** Number of parallel input segments to be processed */
  parallelInputs?: string;
  /** Stage start time represented as milliseconds since the epoch. */
  startMs?: string;
  /** Relative amount of time the average shard spent waiting to be scheduled. */
  waitRatioAvg?: number;
  /** Unique ID for the stage within the plan. */
  id?: string;
  /** Total number of bytes written to shuffle and spilled to disk. */
  shuffleOutputBytesSpilled?: string;
  /** Total number of bytes written to shuffle. */
  shuffleOutputBytes?: string;
  /** Milliseconds the slowest shard spent on CPU-bound tasks. */
  computeMsMax?: string;
  /** Relative amount of time the average shard spent on CPU-bound tasks. */
  computeRatioAvg?: number;
  /** Current status for this stage. */
  status?: string;
  /** Relative amount of time the slowest shard spent waiting to be scheduled. */
  waitRatioMax?: number;
  /** Milliseconds the average shard spent reading input. */
  readMsAvg?: string;
  /** Output only. Compute mode for this stage. */
  computeMode?: "COMPUTE_MODE_UNSPECIFIED" | "BIGQUERY" | "BI_ENGINE" | (string & {});
  /** Relative amount of time the slowest shard spent reading input. */
  readRatioMax?: number;
  /** Stage end time represented as milliseconds since the epoch. */
  endMs?: string;
  /** List of operations within the stage in dependency order (approximately chronological). */
  steps?: Array<ExplainQueryStep>;
  /** Milliseconds the average shard spent waiting to be scheduled. */
  waitMsAvg?: string;
  /** Milliseconds the slowest shard spent waiting to be scheduled. */
  waitMsMax?: string;
  /** Number of parallel input segments completed. */
  completedParallelInputs?: string;
  /** Number of records read into the stage. */
  recordsRead?: string;
  /** Slot-milliseconds used by the stage. */
  slotMs?: string;
}

export const ExplainQueryStage: Schema.Schema<ExplainQueryStage> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  recordsWritten: Schema.optional(Schema.String),
  writeMsAvg: Schema.optional(Schema.String),
  writeRatioAvg: Schema.optional(Schema.Number),
  computeRatioMax: Schema.optional(Schema.Number),
  inputStages: Schema.optional(Schema.Array(Schema.String)),
  computeMsAvg: Schema.optional(Schema.String),
  readMsMax: Schema.optional(Schema.String),
  writeMsMax: Schema.optional(Schema.String),
  writeRatioMax: Schema.optional(Schema.Number),
  readRatioAvg: Schema.optional(Schema.Number),
  parallelInputs: Schema.optional(Schema.String),
  startMs: Schema.optional(Schema.String),
  waitRatioAvg: Schema.optional(Schema.Number),
  id: Schema.optional(Schema.String),
  shuffleOutputBytesSpilled: Schema.optional(Schema.String),
  shuffleOutputBytes: Schema.optional(Schema.String),
  computeMsMax: Schema.optional(Schema.String),
  computeRatioAvg: Schema.optional(Schema.Number),
  status: Schema.optional(Schema.String),
  waitRatioMax: Schema.optional(Schema.Number),
  readMsAvg: Schema.optional(Schema.String),
  computeMode: Schema.optional(Schema.String),
  readRatioMax: Schema.optional(Schema.Number),
  endMs: Schema.optional(Schema.String),
  steps: Schema.optional(Schema.Array(ExplainQueryStep)),
  waitMsAvg: Schema.optional(Schema.String),
  waitMsMax: Schema.optional(Schema.String),
  completedParallelInputs: Schema.optional(Schema.String),
  recordsRead: Schema.optional(Schema.String),
  slotMs: Schema.optional(Schema.String),
})).annotate({ identifier: "ExplainQueryStage" }) as any as Schema.Schema<ExplainQueryStage>;

export interface RoutineReference {
  /** Required. The ID of the dataset containing this routine. */
  datasetId?: string;
  /** Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 256 characters. */
  routineId?: string;
  /** Required. The ID of the project containing this routine. */
  projectId?: string;
}

export const RoutineReference: Schema.Schema<RoutineReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  routineId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "RoutineReference" }) as any as Schema.Schema<RoutineReference>;

export interface DatasetReference {
  /** Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters. */
  datasetId?: string;
  /** Optional. The ID of the project containing this dataset. */
  projectId?: string;
}

export const DatasetReference: Schema.Schema<DatasetReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "DatasetReference" }) as any as Schema.Schema<DatasetReference>;

export interface StoredColumnsUnusedReason {
  /** Specifies which columns were not covered by the stored columns for the specified code up to 20 columns. This is populated when the code is STORED_COLUMNS_COVER_INSUFFICIENT and BASE_TABLE_HAS_CLS. */
  uncoveredColumns?: Array<string>;
  /** Specifies the detailed description for the scenario. */
  message?: string;
  /** Specifies the high-level reason for the unused scenario, each reason must have a code associated. */
  code?: "CODE_UNSPECIFIED" | "STORED_COLUMNS_COVER_INSUFFICIENT" | "BASE_TABLE_HAS_RLS" | "BASE_TABLE_HAS_CLS" | "UNSUPPORTED_PREFILTER" | "INTERNAL_ERROR" | "OTHER_REASON" | (string & {});
}

export const StoredColumnsUnusedReason: Schema.Schema<StoredColumnsUnusedReason> = Schema.suspend(() => Schema.Struct({
  uncoveredColumns: Schema.optional(Schema.Array(Schema.String)),
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "StoredColumnsUnusedReason" }) as any as Schema.Schema<StoredColumnsUnusedReason>;

export interface StoredColumnsUsage {
  /** Specifies whether the query was accelerated with stored columns. */
  isQueryAccelerated?: boolean;
  /** Specifies the base table. */
  baseTable?: TableReference;
  /** If stored columns were not used, explain why. */
  storedColumnsUnusedReasons?: Array<StoredColumnsUnusedReason>;
}

export const StoredColumnsUsage: Schema.Schema<StoredColumnsUsage> = Schema.suspend(() => Schema.Struct({
  isQueryAccelerated: Schema.optional(Schema.Boolean),
  baseTable: Schema.optional(TableReference),
  storedColumnsUnusedReasons: Schema.optional(Schema.Array(StoredColumnsUnusedReason)),
})).annotate({ identifier: "StoredColumnsUsage" }) as any as Schema.Schema<StoredColumnsUsage>;

export interface VectorSearchStatistics {
  /** Specifies the index usage mode for the query. */
  indexUsageMode?: "INDEX_USAGE_MODE_UNSPECIFIED" | "UNUSED" | "PARTIALLY_USED" | "FULLY_USED" | (string & {});
  /** Specifies the usage of stored columns in the query when stored columns are used in the query. */
  storedColumnsUsages?: Array<StoredColumnsUsage>;
  /** When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the vector search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated. */
  indexUnusedReasons?: Array<IndexUnusedReason>;
}

export const VectorSearchStatistics: Schema.Schema<VectorSearchStatistics> = Schema.suspend(() => Schema.Struct({
  indexUsageMode: Schema.optional(Schema.String),
  storedColumnsUsages: Schema.optional(Schema.Array(StoredColumnsUsage)),
  indexUnusedReasons: Schema.optional(Schema.Array(IndexUnusedReason)),
})).annotate({ identifier: "VectorSearchStatistics" }) as any as Schema.Schema<VectorSearchStatistics>;

export interface ExportDataStatistics {
  /** Number of destination files generated in case of EXPORT DATA statement only. */
  fileCount?: string;
  /** [Alpha] Number of destination rows generated in case of EXPORT DATA statement only. */
  rowCount?: string;
}

export const ExportDataStatistics: Schema.Schema<ExportDataStatistics> = Schema.suspend(() => Schema.Struct({
  fileCount: Schema.optional(Schema.String),
  rowCount: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportDataStatistics" }) as any as Schema.Schema<ExportDataStatistics>;

export interface MaterializedView {
  /** The candidate materialized view. */
  tableReference?: TableReference;
  /** Whether the materialized view is chosen for the query. A materialized view can be chosen to rewrite multiple parts of the same query. If a materialized view is chosen to rewrite any part of the query, then this field is true, even if the materialized view was not chosen to rewrite others parts. */
  chosen?: boolean;
  /** If present, specifies a best-effort estimation of the bytes saved by using the materialized view rather than its base tables. */
  estimatedBytesSaved?: string;
  /** If present, specifies the reason why the materialized view was not chosen for the query. */
  rejectedReason?: "REJECTED_REASON_UNSPECIFIED" | "NO_DATA" | "COST" | "BASE_TABLE_TRUNCATED" | "BASE_TABLE_DATA_CHANGE" | "BASE_TABLE_PARTITION_EXPIRATION_CHANGE" | "BASE_TABLE_EXPIRED_PARTITION" | "BASE_TABLE_INCOMPATIBLE_METADATA_CHANGE" | "TIME_ZONE" | "OUT_OF_TIME_TRAVEL_WINDOW" | "BASE_TABLE_FINE_GRAINED_SECURITY_POLICY" | "BASE_TABLE_TOO_STALE" | (string & {});
}

export const MaterializedView: Schema.Schema<MaterializedView> = Schema.suspend(() => Schema.Struct({
  tableReference: Schema.optional(TableReference),
  chosen: Schema.optional(Schema.Boolean),
  estimatedBytesSaved: Schema.optional(Schema.String),
  rejectedReason: Schema.optional(Schema.String),
})).annotate({ identifier: "MaterializedView" }) as any as Schema.Schema<MaterializedView>;

export interface MaterializedViewStatistics {
  /** Materialized views considered for the query job. Only certain materialized views are used. For a detailed list, see the child message. If many materialized views are considered, then the list might be incomplete. */
  materializedView?: Array<MaterializedView>;
}

export const MaterializedViewStatistics: Schema.Schema<MaterializedViewStatistics> = Schema.suspend(() => Schema.Struct({
  materializedView: Schema.optional(Schema.Array(MaterializedView)),
})).annotate({ identifier: "MaterializedViewStatistics" }) as any as Schema.Schema<MaterializedViewStatistics>;

export interface SkewSource {
  /** Output only. Stage id of the skew source stage. */
  stageId?: string;
}

export const SkewSource: Schema.Schema<SkewSource> = Schema.suspend(() => Schema.Struct({
  stageId: Schema.optional(Schema.String),
})).annotate({ identifier: "SkewSource" }) as any as Schema.Schema<SkewSource>;

export interface PartitionSkew {
  /** Output only. Source stages which produce skewed data. */
  skewSources?: Array<SkewSource>;
}

export const PartitionSkew: Schema.Schema<PartitionSkew> = Schema.suspend(() => Schema.Struct({
  skewSources: Schema.optional(Schema.Array(SkewSource)),
})).annotate({ identifier: "PartitionSkew" }) as any as Schema.Schema<PartitionSkew>;

export interface HighCardinalityJoin {
  /** Output only. The index of the join operator in the ExplainQueryStep lists. */
  stepIndex?: number;
  /** Output only. Count of the output rows. */
  outputRows?: string;
  /** Output only. Count of left input rows. */
  leftRows?: string;
  /** Output only. Count of right input rows. */
  rightRows?: string;
}

export const HighCardinalityJoin: Schema.Schema<HighCardinalityJoin> = Schema.suspend(() => Schema.Struct({
  stepIndex: Schema.optional(Schema.Number),
  outputRows: Schema.optional(Schema.String),
  leftRows: Schema.optional(Schema.String),
  rightRows: Schema.optional(Schema.String),
})).annotate({ identifier: "HighCardinalityJoin" }) as any as Schema.Schema<HighCardinalityJoin>;

export interface StagePerformanceStandaloneInsight {
  /** Output only. True if the stage has a slot contention issue. */
  slotContention?: boolean;
  /** Output only. Partition skew in the stage. */
  partitionSkew?: PartitionSkew;
  /** Output only. The stage id that the insight mapped to. */
  stageId?: string;
  /** Output only. True if the stage has insufficient shuffle quota. */
  insufficientShuffleQuota?: boolean;
  /** Output only. High cardinality joins in the stage. */
  highCardinalityJoins?: Array<HighCardinalityJoin>;
  /** Output only. If present, the stage had the following reasons for being disqualified from BI Engine execution. */
  biEngineReasons?: Array<BiEngineReason>;
}

export const StagePerformanceStandaloneInsight: Schema.Schema<StagePerformanceStandaloneInsight> = Schema.suspend(() => Schema.Struct({
  slotContention: Schema.optional(Schema.Boolean),
  partitionSkew: Schema.optional(PartitionSkew),
  stageId: Schema.optional(Schema.String),
  insufficientShuffleQuota: Schema.optional(Schema.Boolean),
  highCardinalityJoins: Schema.optional(Schema.Array(HighCardinalityJoin)),
  biEngineReasons: Schema.optional(Schema.Array(BiEngineReason)),
})).annotate({ identifier: "StagePerformanceStandaloneInsight" }) as any as Schema.Schema<StagePerformanceStandaloneInsight>;

export interface InputDataChange {
  /** Output only. Records read difference percentage compared to a previous run. */
  recordsReadDiffPercentage?: number;
}

export const InputDataChange: Schema.Schema<InputDataChange> = Schema.suspend(() => Schema.Struct({
  recordsReadDiffPercentage: Schema.optional(Schema.Number),
})).annotate({ identifier: "InputDataChange" }) as any as Schema.Schema<InputDataChange>;

export interface StagePerformanceChangeInsight {
  /** Output only. The stage id that the insight mapped to. */
  stageId?: string;
  /** Output only. Input data change insight of the query stage. */
  inputDataChange?: InputDataChange;
}

export const StagePerformanceChangeInsight: Schema.Schema<StagePerformanceChangeInsight> = Schema.suspend(() => Schema.Struct({
  stageId: Schema.optional(Schema.String),
  inputDataChange: Schema.optional(InputDataChange),
})).annotate({ identifier: "StagePerformanceChangeInsight" }) as any as Schema.Schema<StagePerformanceChangeInsight>;

export interface PerformanceInsights {
  /** Output only. Average execution ms of previous runs. Indicates the job ran slow compared to previous executions. To find previous executions, use INFORMATION_SCHEMA tables and filter jobs with same query hash. */
  avgPreviousExecutionMs?: string;
  /** Output only. Standalone query stage performance insights, for exploring potential improvements. */
  stagePerformanceStandaloneInsights?: Array<StagePerformanceStandaloneInsight>;
  /** Output only. Query stage performance insights compared to previous runs, for diagnosing performance regression. */
  stagePerformanceChangeInsights?: Array<StagePerformanceChangeInsight>;
}

export const PerformanceInsights: Schema.Schema<PerformanceInsights> = Schema.suspend(() => Schema.Struct({
  avgPreviousExecutionMs: Schema.optional(Schema.String),
  stagePerformanceStandaloneInsights: Schema.optional(Schema.Array(StagePerformanceStandaloneInsight)),
  stagePerformanceChangeInsights: Schema.optional(Schema.Array(StagePerformanceChangeInsight)),
})).annotate({ identifier: "PerformanceInsights" }) as any as Schema.Schema<PerformanceInsights>;

export interface PruningStats {
  /** The number of parallel inputs scanned. */
  preCmetaPruningParallelInputCount?: string;
  /** The number of partitions matched. */
  postCmetaPruningPartitionCount?: string;
  /** The number of parallel inputs matched. */
  postCmetaPruningParallelInputCount?: string;
}

export const PruningStats: Schema.Schema<PruningStats> = Schema.suspend(() => Schema.Struct({
  preCmetaPruningParallelInputCount: Schema.optional(Schema.String),
  postCmetaPruningPartitionCount: Schema.optional(Schema.String),
  postCmetaPruningParallelInputCount: Schema.optional(Schema.String),
})).annotate({ identifier: "PruningStats" }) as any as Schema.Schema<PruningStats>;

export interface TableMetadataCacheUsage {
  /** Reason for not using metadata caching for the table. */
  unusedReason?: "UNUSED_REASON_UNSPECIFIED" | "EXCEEDED_MAX_STALENESS" | "METADATA_CACHING_NOT_ENABLED" | "OTHER_REASON" | (string & {});
  /** Metadata caching eligible table referenced in the query. */
  tableReference?: TableReference;
  /** Duration since last refresh as of this job for managed tables (indicates metadata cache staleness as seen by this job). */
  staleness?: string;
  /** The column metadata index pruning statistics. */
  pruningStats?: PruningStats;
  /** Free form human-readable reason metadata caching was unused for the job. */
  explanation?: string;
  /** [Table type](https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type). */
  tableType?: string;
}

export const TableMetadataCacheUsage: Schema.Schema<TableMetadataCacheUsage> = Schema.suspend(() => Schema.Struct({
  unusedReason: Schema.optional(Schema.String),
  tableReference: Schema.optional(TableReference),
  staleness: Schema.optional(Schema.String),
  pruningStats: Schema.optional(PruningStats),
  explanation: Schema.optional(Schema.String),
  tableType: Schema.optional(Schema.String),
})).annotate({ identifier: "TableMetadataCacheUsage" }) as any as Schema.Schema<TableMetadataCacheUsage>;

export interface MetadataCacheStatistics {
  /** Set for the Metadata caching eligible tables referenced in the query. */
  tableMetadataCacheUsage?: Array<TableMetadataCacheUsage>;
}

export const MetadataCacheStatistics: Schema.Schema<MetadataCacheStatistics> = Schema.suspend(() => Schema.Struct({
  tableMetadataCacheUsage: Schema.optional(Schema.Array(TableMetadataCacheUsage)),
})).annotate({ identifier: "MetadataCacheStatistics" }) as any as Schema.Schema<MetadataCacheStatistics>;

export interface IncrementalResultStats {
  /** Output only. Reason why incremental query results are/were not written by the query. */
  disabledReason?: "DISABLED_REASON_UNSPECIFIED" | "OTHER" | "UNSUPPORTED_OPERATOR" | (string & {});
  /** Output only. The time at which the result table's contents were completely replaced. May be absent if no results have been written or the query has completed. */
  resultSetLastReplaceTime?: string;
  /** Output only. The time at which the result table's contents were modified. May be absent if no results have been written or the query has completed. */
  resultSetLastModifyTime?: string;
}

export const IncrementalResultStats: Schema.Schema<IncrementalResultStats> = Schema.suspend(() => Schema.Struct({
  disabledReason: Schema.optional(Schema.String),
  resultSetLastReplaceTime: Schema.optional(Schema.String),
  resultSetLastModifyTime: Schema.optional(Schema.String),
})).annotate({ identifier: "IncrementalResultStats" }) as any as Schema.Schema<IncrementalResultStats>;

export interface JobStatistics2 {
  /** Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated. */
  reservationUsage?: Array<{ slotMs?: string; name?: string }>;
  /** Output only. The DDL target row access policy. Present only for CREATE/DROP ROW ACCESS POLICY queries. */
  ddlTargetRowAccessPolicy?: RowAccessPolicyReference;
  /** Output only. Statistics of a BigQuery ML training job. */
  mlStatistics?: MlStatistics;
  /** Output only. If the project is configured to use on-demand pricing, then this field contains the total bytes billed for the job. If the project is configured to use flat-rate pricing, then you are not billed for bytes and this field is informational only. */
  totalBytesBilled?: string;
  /** Output only. The type of query statement, if valid. Possible values: * `SELECT`: [`SELECT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#select_list) statement. * `ASSERT`: [`ASSERT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements#assert) statement. * `INSERT`: [`INSERT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement) statement. * `UPDATE`: [`UPDATE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_statement) statement. * `DELETE`: [`DELETE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. * `MERGE`: [`MERGE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. * `CREATE_TABLE`: [`CREATE TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement, without `AS SELECT`. * `CREATE_TABLE_AS_SELECT`: [`CREATE TABLE AS SELECT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement. * `CREATE_VIEW`: [`CREATE VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_view_statement) statement. * `CREATE_MODEL`: [`CREATE MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#create_model_statement) statement. * `CREATE_MATERIALIZED_VIEW`: [`CREATE MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_materialized_view_statement) statement. * `CREATE_FUNCTION`: [`CREATE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_function_statement) statement. * `CREATE_TABLE_FUNCTION`: [`CREATE TABLE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_function_statement) statement. * `CREATE_PROCEDURE`: [`CREATE PROCEDURE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_procedure) statement. * `CREATE_ROW_ACCESS_POLICY`: [`CREATE ROW ACCESS POLICY`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_row_access_policy_statement) statement. * `CREATE_SCHEMA`: [`CREATE SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_schema_statement) statement. * `CREATE_SNAPSHOT_TABLE`: [`CREATE SNAPSHOT TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_snapshot_table_statement) statement. * `CREATE_SEARCH_INDEX`: [`CREATE SEARCH INDEX`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_search_index_statement) statement. * `DROP_TABLE`: [`DROP TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_statement) statement. * `DROP_EXTERNAL_TABLE`: [`DROP EXTERNAL TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_external_table_statement) statement. * `DROP_VIEW`: [`DROP VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_view_statement) statement. * `DROP_MODEL`: [`DROP MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-drop-model) statement. * `DROP_MATERIALIZED_VIEW`: [`DROP MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_materialized_view_statement) statement. * `DROP_FUNCTION` : [`DROP FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_function_statement) statement. * `DROP_TABLE_FUNCTION` : [`DROP TABLE FUNCTION`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_function) statement. * `DROP_PROCEDURE`: [`DROP PROCEDURE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_procedure_statement) statement. * `DROP_SEARCH_INDEX`: [`DROP SEARCH INDEX`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_search_index) statement. * `DROP_SCHEMA`: [`DROP SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_schema_statement) statement. * `DROP_SNAPSHOT_TABLE`: [`DROP SNAPSHOT TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_snapshot_table_statement) statement. * `DROP_ROW_ACCESS_POLICY`: [`DROP [ALL] ROW ACCESS POLICY|POLICIES`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_row_access_policy_statement) statement. * `ALTER_TABLE`: [`ALTER TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_table_set_options_statement) statement. * `ALTER_VIEW`: [`ALTER VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_view_set_options_statement) statement. * `ALTER_MATERIALIZED_VIEW`: [`ALTER MATERIALIZED VIEW`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_materialized_view_set_options_statement) statement. * `ALTER_SCHEMA`: [`ALTER SCHEMA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_schema_set_options_statement) statement. * `SCRIPT`: [`SCRIPT`](https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language). * `TRUNCATE_TABLE`: [`TRUNCATE TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#truncate_table_statement) statement. * `CREATE_EXTERNAL_TABLE`: [`CREATE EXTERNAL TABLE`](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_table_statement) statement. * `EXPORT_DATA`: [`EXPORT DATA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements#export_data_statement) statement. * `EXPORT_MODEL`: [`EXPORT MODEL`](https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-export-model) statement. * `LOAD_DATA`: [`LOAD DATA`](https://cloud.google.com/bigquery/docs/reference/standard-sql/other-statements#load_data_statement) statement. * `CALL`: [`CALL`](https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#call) statement. */
  statementType?: string;
  /** Output only. The DDL operation performed, possibly dependent on the pre-existence of the DDL target. */
  ddlOperationPerformed?: string;
  /** Output only. Query optimization information for a QUERY job. */
  queryInfo?: QueryInfo;
  /** Output only. Detailed statistics for DML statements INSERT, UPDATE, DELETE, MERGE or TRUNCATE. */
  dmlStats?: DmlStatistics;
  /** Output only. BI Engine specific Statistics. */
  biEngineStatistics?: BiEngineStatistics;
  /** Output only. Statistics of a Spark procedure job. */
  sparkStatistics?: SparkStatistics;
  /** Output only. Describes a timeline of job execution. */
  timeline?: Array<QueryTimelineSample>;
  /** Output only. Referenced view for DCL statement. */
  dclTargetView?: TableReference;
  /** Output only. GoogleSQL only: list of undeclared query parameters detected during a dry run validation. */
  undeclaredQueryParameters?: Array<QueryParameter>;
  /** Output only. The original estimate of bytes processed for the job. */
  estimatedBytesProcessed?: string;
  /** Output only. Total bytes processed for the job. */
  totalBytesProcessed?: string;
  /** Output only. The schema of the results. Present only for successful dry run of non-legacy SQL queries. */
  schema?: TableSchema;
  /** Deprecated. */
  modelTraining?: BigQueryModelTraining;
  /** Deprecated. */
  modelTrainingCurrentIteration?: number;
  /** Output only. The number of row access policies affected by a DDL statement. Present only for DROP ALL ROW ACCESS POLICIES queries. */
  ddlAffectedRowAccessPolicyCount?: string;
  /** Output only. Referenced tables for the job. */
  referencedTables?: Array<TableReference>;
  /** Output only. Search query specific statistics. */
  searchStatistics?: SearchStatistics;
  /** Output only. Statistics for a LOAD query. */
  loadQueryStatistics?: LoadQueryStatistics;
  /** Output only. Job cost breakdown as bigquery internal cost and external service costs. */
  externalServiceCosts?: Array<ExternalServiceCost>;
  /** Output only. Billing tier for the job. This is a BigQuery-specific concept which is not related to the Google Cloud notion of "free tier". The value here is a measure of the query's resource consumption relative to the amount of data scanned. For on-demand queries, the limit is 100, and all queries within this limit are billed at the standard on-demand rates. On-demand queries that exceed this limit will fail with a billingTierLimitExceeded error. */
  billingTier?: number;
  /** Output only. Total bytes transferred for cross-cloud queries such as Cross Cloud Transfer and CREATE TABLE AS SELECT (CTAS). */
  transferredBytes?: string;
  /** Output only. Referenced table for DCL statement. */
  dclTargetTable?: TableReference;
  /** Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE. */
  numDmlAffectedRows?: string;
  /** Output only. Describes execution plan for the query. */
  queryPlan?: Array<ExplainQueryStage>;
  /** Output only. [Beta] The DDL target routine. Present only for CREATE/DROP FUNCTION/PROCEDURE queries. */
  ddlTargetRoutine?: RoutineReference;
  /** Output only. Referenced dataset for DCL statement. */
  dclTargetDataset?: DatasetReference;
  /** Output only. Referenced routines for the job. */
  referencedRoutines?: Array<RoutineReference>;
  /** Output only. The DDL target dataset. Present only for CREATE/ALTER/DROP SCHEMA(dataset) queries. */
  ddlTargetDataset?: DatasetReference;
  /** Output only. The DDL target table. Present only for CREATE/DROP TABLE/VIEW and DROP ALL ROW ACCESS POLICIES queries. */
  ddlTargetTable?: TableReference;
  /** Output only. Slot-milliseconds for the job. */
  totalSlotMs?: string;
  /** Output only. Vector Search query specific statistics. */
  vectorSearchStatistics?: VectorSearchStatistics;
  /** Output only. Stats for EXPORT DATA statement. */
  exportDataStatistics?: ExportDataStatistics;
  /** Output only. Statistics of materialized views of a query job. */
  materializedViewStatistics?: MaterializedViewStatistics;
  /** Output only. Total slot milliseconds for the job that ran on external services and billed on the services SKU. This field is only populated for jobs that have external service costs, and is the total of the usage for costs whose billing method is `"SERVICES_SKU"`. */
  totalServicesSkuSlotMs?: string;
  /** Output only. Whether the query result was fetched from the query cache. */
  cacheHit?: boolean;
  /** Output only. For dry-run jobs, totalBytesProcessed is an estimate and this field specifies the accuracy of the estimate. Possible values can be: UNKNOWN: accuracy of the estimate is unknown. PRECISE: estimate is precise. LOWER_BOUND: estimate is lower bound of what the query would cost. UPPER_BOUND: estimate is upper bound of what the query would cost. */
  totalBytesProcessedAccuracy?: string;
  /** Output only. Total number of partitions processed from all partitioned tables referenced in the job. */
  totalPartitionsProcessed?: string;
  /** Output only. Performance insights. */
  performanceInsights?: PerformanceInsights;
  /** Output only. Statistics of metadata cache usage in a query for BigLake tables. */
  metadataCacheStatistics?: MetadataCacheStatistics;
  /** Deprecated. */
  modelTrainingExpectedTotalIteration?: string;
  /** Output only. The table after rename. Present only for ALTER TABLE RENAME TO query. */
  ddlDestinationTable?: TableReference;
  /** Output only. Statistics related to incremental query results, if enabled for the query. This feature is not yet available. */
  incrementalResultStats?: IncrementalResultStats;
}

export const JobStatistics2: Schema.Schema<JobStatistics2> = Schema.suspend(() => Schema.Struct({
  reservationUsage: Schema.optional(Schema.Array(Schema.Struct({ slotMs: Schema.optional(Schema.String), name: Schema.optional(Schema.String) }))),
  ddlTargetRowAccessPolicy: Schema.optional(RowAccessPolicyReference),
  mlStatistics: Schema.optional(MlStatistics),
  totalBytesBilled: Schema.optional(Schema.String),
  statementType: Schema.optional(Schema.String),
  ddlOperationPerformed: Schema.optional(Schema.String),
  queryInfo: Schema.optional(QueryInfo),
  dmlStats: Schema.optional(DmlStatistics),
  biEngineStatistics: Schema.optional(BiEngineStatistics),
  sparkStatistics: Schema.optional(SparkStatistics),
  timeline: Schema.optional(Schema.Array(QueryTimelineSample)),
  dclTargetView: Schema.optional(TableReference),
  undeclaredQueryParameters: Schema.optional(Schema.Array(QueryParameter)),
  estimatedBytesProcessed: Schema.optional(Schema.String),
  totalBytesProcessed: Schema.optional(Schema.String),
  schema: Schema.optional(TableSchema),
  modelTraining: Schema.optional(BigQueryModelTraining),
  modelTrainingCurrentIteration: Schema.optional(Schema.Number),
  ddlAffectedRowAccessPolicyCount: Schema.optional(Schema.String),
  referencedTables: Schema.optional(Schema.Array(TableReference)),
  searchStatistics: Schema.optional(SearchStatistics),
  loadQueryStatistics: Schema.optional(LoadQueryStatistics),
  externalServiceCosts: Schema.optional(Schema.Array(ExternalServiceCost)),
  billingTier: Schema.optional(Schema.Number),
  transferredBytes: Schema.optional(Schema.String),
  dclTargetTable: Schema.optional(TableReference),
  numDmlAffectedRows: Schema.optional(Schema.String),
  queryPlan: Schema.optional(Schema.Array(ExplainQueryStage)),
  ddlTargetRoutine: Schema.optional(RoutineReference),
  dclTargetDataset: Schema.optional(DatasetReference),
  referencedRoutines: Schema.optional(Schema.Array(RoutineReference)),
  ddlTargetDataset: Schema.optional(DatasetReference),
  ddlTargetTable: Schema.optional(TableReference),
  totalSlotMs: Schema.optional(Schema.String),
  vectorSearchStatistics: Schema.optional(VectorSearchStatistics),
  exportDataStatistics: Schema.optional(ExportDataStatistics),
  materializedViewStatistics: Schema.optional(MaterializedViewStatistics),
  totalServicesSkuSlotMs: Schema.optional(Schema.String),
  cacheHit: Schema.optional(Schema.Boolean),
  totalBytesProcessedAccuracy: Schema.optional(Schema.String),
  totalPartitionsProcessed: Schema.optional(Schema.String),
  performanceInsights: Schema.optional(PerformanceInsights),
  metadataCacheStatistics: Schema.optional(MetadataCacheStatistics),
  modelTrainingExpectedTotalIteration: Schema.optional(Schema.String),
  ddlDestinationTable: Schema.optional(TableReference),
  incrementalResultStats: Schema.optional(IncrementalResultStats),
})).annotate({ identifier: "JobStatistics2" }) as any as Schema.Schema<JobStatistics2>;

export interface ScriptStatistics {
  /** Stack trace showing the line/column/procedure name of each frame on the stack at the point where the current evaluation happened. The leaf frame is first, the primary script is last. Never empty. */
  stackFrames?: Array<ScriptStackFrame>;
  /** Whether this child job was a statement or expression. */
  evaluationKind?: "EVALUATION_KIND_UNSPECIFIED" | "STATEMENT" | "EXPRESSION" | (string & {});
}

export const ScriptStatistics: Schema.Schema<ScriptStatistics> = Schema.suspend(() => Schema.Struct({
  stackFrames: Schema.optional(Schema.Array(ScriptStackFrame)),
  evaluationKind: Schema.optional(Schema.String),
})).annotate({ identifier: "ScriptStatistics" }) as any as Schema.Schema<ScriptStatistics>;

export interface RowLevelSecurityStatistics {
  /** Whether any accessed data was protected by row access policies. */
  rowLevelSecurityApplied?: boolean;
}

export const RowLevelSecurityStatistics: Schema.Schema<RowLevelSecurityStatistics> = Schema.suspend(() => Schema.Struct({
  rowLevelSecurityApplied: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RowLevelSecurityStatistics" }) as any as Schema.Schema<RowLevelSecurityStatistics>;

export interface DataMaskingStatistics {
  /** Whether any accessed data was protected by the data masking. */
  dataMaskingApplied?: boolean;
}

export const DataMaskingStatistics: Schema.Schema<DataMaskingStatistics> = Schema.suspend(() => Schema.Struct({
  dataMaskingApplied: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DataMaskingStatistics" }) as any as Schema.Schema<DataMaskingStatistics>;

export interface JobStatistics {
  /** Output only. [TrustedTester] Job progress (0.0 -> 1.0) for LOAD and EXTRACT jobs. */
  completionRatio?: number;
  /** Output only. Information of the session if this job is part of one. */
  sessionInfo?: SessionInfo;
  /** Output only. Quotas which delayed this job's start time. */
  quotaDeferments?: Array<string>;
  /** Output only. Statistics for an extract job. */
  extract?: JobStatistics4;
  /** Output only. Statistics for a copy job. */
  copy?: JobStatistics5;
  /** Output only. Statistics for a load job. */
  load?: JobStatistics3;
  /** Output only. If this is a child job, specifies the job ID of the parent. */
  parentJobId?: string;
  /** Output only. End time of this job, in milliseconds since the epoch. This field will be present whenever a job is in the DONE state. */
  endTime?: string;
  /** Output only. [Alpha] Information of the multi-statement transaction if this job is part of one. This property is only expected on a child job or a job that is in a session. A script parent job is not part of the transaction started in the script. */
  transactionInfo?: TransactionInfo;
  /** Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated. */
  reservationUsage?: Array<{ slotMs?: string; name?: string }>;
  /** Output only. Statistics for a query job. */
  query?: JobStatistics2;
  /** Output only. Start time of this job, in milliseconds since the epoch. This field will be present when the job transitions from the PENDING state to either RUNNING or DONE. */
  startTime?: string;
  /** Output only. Name of the primary reservation assigned to this job. Note that this could be different than reservations reported in the reservation usage field if parent reservations were used to execute this job. */
  reservation_id?: string;
  /** Output only. Name of edition corresponding to the reservation for this job at the time of this update. */
  edition?: "RESERVATION_EDITION_UNSPECIFIED" | "STANDARD" | "ENTERPRISE" | "ENTERPRISE_PLUS" | (string & {});
  /** Output only. If this a child job of a script, specifies information about the context of this job within the script. */
  scriptStatistics?: ScriptStatistics;
  /** Output only. Total bytes processed for the job. */
  totalBytesProcessed?: string;
  /** Output only. Number of child jobs executed. */
  numChildJobs?: string;
  /** Output only. Statistics for row-level security. Present only for query and extract jobs. */
  rowLevelSecurityStatistics?: RowLevelSecurityStatistics;
  /** Output only. Statistics for data-masking. Present only for query and extract jobs. */
  dataMaskingStatistics?: DataMaskingStatistics;
  /** Output only. The duration in milliseconds of the execution of the final attempt of this job, as BigQuery may internally re-attempt to execute the job. */
  finalExecutionDurationMs?: string;
  /** Output only. The reservation group path of the reservation assigned to this job. This field has a limit of 10 nested reservation groups. This is to maintain consistency between reservatins info schema and jobs info schema. The first reservation group is the root reservation group and the last is the leaf or lowest level reservation group. */
  reservationGroupPath?: Array<string>;
  /** Output only. Creation time of this job, in milliseconds since the epoch. This field will be present on all jobs. */
  creationTime?: string;
  /** Output only. Slot-milliseconds for the job. */
  totalSlotMs?: string;
}

export const JobStatistics: Schema.Schema<JobStatistics> = Schema.suspend(() => Schema.Struct({
  completionRatio: Schema.optional(Schema.Number),
  sessionInfo: Schema.optional(SessionInfo),
  quotaDeferments: Schema.optional(Schema.Array(Schema.String)),
  extract: Schema.optional(JobStatistics4),
  copy: Schema.optional(JobStatistics5),
  load: Schema.optional(JobStatistics3),
  parentJobId: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  transactionInfo: Schema.optional(TransactionInfo),
  reservationUsage: Schema.optional(Schema.Array(Schema.Struct({ slotMs: Schema.optional(Schema.String), name: Schema.optional(Schema.String) }))),
  query: Schema.optional(JobStatistics2),
  startTime: Schema.optional(Schema.String),
  reservation_id: Schema.optional(Schema.String),
  edition: Schema.optional(Schema.String),
  scriptStatistics: Schema.optional(ScriptStatistics),
  totalBytesProcessed: Schema.optional(Schema.String),
  numChildJobs: Schema.optional(Schema.String),
  rowLevelSecurityStatistics: Schema.optional(RowLevelSecurityStatistics),
  dataMaskingStatistics: Schema.optional(DataMaskingStatistics),
  finalExecutionDurationMs: Schema.optional(Schema.String),
  reservationGroupPath: Schema.optional(Schema.Array(Schema.String)),
  creationTime: Schema.optional(Schema.String),
  totalSlotMs: Schema.optional(Schema.String),
})).annotate({ identifier: "JobStatistics" }) as any as Schema.Schema<JobStatistics>;

export interface HivePartitioningOptions {
  /** Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: * AUTO: automatically infer partition key name(s) and type(s). * STRINGS: automatically infer partition key name(s). All types are strings. * CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet. */
  mode?: string;
  /** Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} * gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes. */
  sourceUriPrefix?: string;
  /** Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field. */
  fields?: Array<string>;
  /** Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail. */
  requirePartitionFilter?: boolean;
}

export const HivePartitioningOptions: Schema.Schema<HivePartitioningOptions> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
  sourceUriPrefix: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(Schema.String)),
  requirePartitionFilter: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "HivePartitioningOptions" }) as any as Schema.Schema<HivePartitioningOptions>;

export interface JsonOptions {
  /** Optional. The character encoding of the data. The supported values are UTF-8, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. */
  encoding?: string;
}

export const JsonOptions: Schema.Schema<JsonOptions> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(Schema.String),
})).annotate({ identifier: "JsonOptions" }) as any as Schema.Schema<JsonOptions>;

export interface BigtableProtoConfig {
  /** Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See [more details on Bigtable SchemaBundles](https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas). */
  schemaBundleId?: string;
  /** Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message". */
  protoMessageName?: string;
}

export const BigtableProtoConfig: Schema.Schema<BigtableProtoConfig> = Schema.suspend(() => Schema.Struct({
  schemaBundleId: Schema.optional(Schema.String),
  protoMessageName: Schema.optional(Schema.String),
})).annotate({ identifier: "BigtableProtoConfig" }) as any as Schema.Schema<BigtableProtoConfig>;

export interface BigtableColumn {
  /** Optional. Protobuf-specific configurations, only takes effect when the encoding is PROTO_BINARY. */
  protoConfig?: BigtableProtoConfig;
  /** Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. 'encoding' can also be set at the column family level. However, the setting at this level takes precedence if 'encoding' is set at both levels. */
  encoding?: string;
  /** Optional. The type to convert the value in cells of this column. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. 'type' can also be set at the column family level. However, the setting at this level takes precedence if 'type' is set at both levels. */
  type?: string;
  /** Optional. If this is set, only the latest version of value in this column are exposed. 'onlyReadLatest' can also be set at the column family level. However, the setting at this level takes precedence if 'onlyReadLatest' is set at both levels. */
  onlyReadLatest?: boolean;
  /** Optional. If the qualifier is not a valid BigQuery field identifier i.e. does not match a-zA-Z*, a valid identifier must be provided as the column field name and is used as field name in queries. */
  fieldName?: string;
  /** [Required] Qualifier of the column. Columns in the parent column family that has this exact qualifier are exposed as `.` field. If the qualifier is valid UTF-8 string, it can be specified in the qualifier_string field. Otherwise, a base-64 encoded value must be set to qualifier_encoded. The column field name is the same as the column qualifier. However, if the qualifier is not a valid BigQuery field identifier i.e. does not match a-zA-Z*, a valid identifier must be provided as field_name. */
  qualifierEncoded?: string;
  /** Qualifier string. */
  qualifierString?: string;
}

export const BigtableColumn: Schema.Schema<BigtableColumn> = Schema.suspend(() => Schema.Struct({
  protoConfig: Schema.optional(BigtableProtoConfig),
  encoding: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  onlyReadLatest: Schema.optional(Schema.Boolean),
  fieldName: Schema.optional(Schema.String),
  qualifierEncoded: Schema.optional(Schema.String),
  qualifierString: Schema.optional(Schema.String),
})).annotate({ identifier: "BigtableColumn" }) as any as Schema.Schema<BigtableColumn>;

export interface BigtableColumnFamily {
  /** Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. This can be overridden for a specific column by listing that column in 'columns' and specifying an encoding for it. */
  encoding?: string;
  /** Optional. Protobuf-specific configurations, only takes effect when the encoding is PROTO_BINARY. */
  protoConfig?: BigtableProtoConfig;
  /** Optional. The type to convert the value in cells of this column family. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): * BYTES * STRING * INTEGER * FLOAT * BOOLEAN * JSON Default type is BYTES. This can be overridden for a specific column by listing that column in 'columns' and specifying a type for it. */
  type?: string;
  /** Identifier of the column family. */
  familyId?: string;
  /** Optional. If this is set only the latest version of value are exposed for all columns in this column family. This can be overridden for a specific column by listing that column in 'columns' and specifying a different setting for that column. */
  onlyReadLatest?: boolean;
  /** Optional. Lists of columns that should be exposed as individual fields as opposed to a list of (column name, value) pairs. All columns whose qualifier matches a qualifier in this list can be accessed as `.`. Other columns can be accessed as a list through the `.Column` field. */
  columns?: Array<BigtableColumn>;
}

export const BigtableColumnFamily: Schema.Schema<BigtableColumnFamily> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(Schema.String),
  protoConfig: Schema.optional(BigtableProtoConfig),
  type: Schema.optional(Schema.String),
  familyId: Schema.optional(Schema.String),
  onlyReadLatest: Schema.optional(Schema.Boolean),
  columns: Schema.optional(Schema.Array(BigtableColumn)),
})).annotate({ identifier: "BigtableColumnFamily" }) as any as Schema.Schema<BigtableColumnFamily>;

export interface BigtableOptions {
  /** Optional. If field is true, then each column family will be read as a single JSON column. Otherwise they are read as a repeated cell structure containing timestamp/value tuples. The default value is false. */
  outputColumnFamiliesAsJson?: boolean;
  /** Optional. If field is true, then the rowkey column families will be read and converted to string. Otherwise they are read with BYTES type values and users need to manually cast them with CAST if necessary. The default value is false. */
  readRowkeyAsString?: boolean;
  /** Optional. List of column families to expose in the table schema along with their types. This list restricts the column families that can be referenced in queries and specifies their value types. You can use this list to do type conversions - see the 'type' field for more details. If you leave this list empty, all column families are present in the table schema and their values are read as BYTES. During a query only the column families referenced in that query are read from Bigtable. */
  columnFamilies?: Array<BigtableColumnFamily>;
  /** Optional. If field is true, then the column families that are not specified in columnFamilies list are not exposed in the table schema. Otherwise, they are read with BYTES type values. The default value is false. */
  ignoreUnspecifiedColumnFamilies?: boolean;
}

export const BigtableOptions: Schema.Schema<BigtableOptions> = Schema.suspend(() => Schema.Struct({
  outputColumnFamiliesAsJson: Schema.optional(Schema.Boolean),
  readRowkeyAsString: Schema.optional(Schema.Boolean),
  columnFamilies: Schema.optional(Schema.Array(BigtableColumnFamily)),
  ignoreUnspecifiedColumnFamilies: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BigtableOptions" }) as any as Schema.Schema<BigtableOptions>;

export interface ParquetOptions {
  /** Optional. Indicates how to represent a Parquet map if present. */
  mapTargetType?: "MAP_TARGET_TYPE_UNSPECIFIED" | "ARRAY_OF_STRUCT" | (string & {});
  /** Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default. */
  enumAsString?: boolean;
  /** Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type. */
  enableListInference?: boolean;
}

export const ParquetOptions: Schema.Schema<ParquetOptions> = Schema.suspend(() => Schema.Struct({
  mapTargetType: Schema.optional(Schema.String),
  enumAsString: Schema.optional(Schema.Boolean),
  enableListInference: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ParquetOptions" }) as any as Schema.Schema<ParquetOptions>;

export interface AvroOptions {
  /** Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER). */
  useAvroLogicalTypes?: boolean;
}

export const AvroOptions: Schema.Schema<AvroOptions> = Schema.suspend(() => Schema.Struct({
  useAvroLogicalTypes: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AvroOptions" }) as any as Schema.Schema<AvroOptions>;

export interface GoogleSheetsOptions {
  /** Optional. Range of a sheet to query from. Only used when non-empty. Typical format: sheet_name!top_left_cell_id:bottom_right_cell_id For example: sheet1!A1:B20 */
  range?: string;
  /** Optional. The number of rows at the top of a sheet that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema. */
  skipLeadingRows?: string;
}

export const GoogleSheetsOptions: Schema.Schema<GoogleSheetsOptions> = Schema.suspend(() => Schema.Struct({
  range: Schema.optional(Schema.String),
  skipLeadingRows: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleSheetsOptions" }) as any as Schema.Schema<GoogleSheetsOptions>;

export interface CsvOptions {
  /** Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. Acceptable values are: POSITION - matches by position. This assumes that the columns are ordered the same way as the schema. NAME - matches by name. This reads the header row as column names and reorders columns to match the field names in the schema. */
  sourceColumnMatch?: string;
  /** Optional. Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false. */
  allowQuotedNewlines?: boolean;
  /** Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types. */
  nullMarkers?: Array<string>;
  /** Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote ("). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' " ', use ' "" '. */
  quote?: string;
  /** Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the quote and fieldDelimiter properties. */
  encoding?: string;
  /** Optional. Indicates if the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\x00' to '\x1F') are preserved. */
  preserveAsciiControlCharacters?: boolean;
  /** Optional. Indicates if BigQuery should accept rows that are missing trailing optional columns. If true, BigQuery treats missing trailing columns as null values. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. */
  allowJaggedRows?: boolean;
  /** Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C). */
  fieldDelimiter?: string;
  /** Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\N", BigQuery interprets "\N" as a null value when querying a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value. */
  nullMarker?: string;
  /** Optional. The number of rows at the top of a CSV file that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema. */
  skipLeadingRows?: string;
}

export const CsvOptions: Schema.Schema<CsvOptions> = Schema.suspend(() => Schema.Struct({
  sourceColumnMatch: Schema.optional(Schema.String),
  allowQuotedNewlines: Schema.optional(Schema.Boolean),
  nullMarkers: Schema.optional(Schema.Array(Schema.String)),
  quote: Schema.optional(Schema.String),
  encoding: Schema.optional(Schema.String),
  preserveAsciiControlCharacters: Schema.optional(Schema.Boolean),
  allowJaggedRows: Schema.optional(Schema.Boolean),
  fieldDelimiter: Schema.optional(Schema.String),
  nullMarker: Schema.optional(Schema.String),
  skipLeadingRows: Schema.optional(Schema.String),
})).annotate({ identifier: "CsvOptions" }) as any as Schema.Schema<CsvOptions>;

export interface ExternalDataConfiguration {
  /** Optional. When set, configures hive partitioning support. Not all storage formats support hive partitioning -- requesting hive partitioning on an unsupported format will lead to an error, as will providing an invalid specification. */
  hivePartitioningOptions?: HivePartitioningOptions;
  /** Optional. Additional properties to set if sourceFormat is set to JSON. */
  jsonOptions?: JsonOptions;
  /** [Required] The data format. For CSV files, specify "CSV". For Google sheets, specify "GOOGLE_SHEETS". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro files, specify "AVRO". For Google Cloud Datastore backups, specify "DATASTORE_BACKUP". For Apache Iceberg tables, specify "ICEBERG". For ORC files, specify "ORC". For Parquet files, specify "PARQUET". [Beta] For Google Cloud Bigtable, specify "BIGTABLE". */
  sourceFormat?: string;
  /** Optional. Additional options if sourceFormat is set to BIGTABLE. */
  bigtableOptions?: BigtableOptions;
  /** Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats. */
  decimalTargetTypes?: Array<"DECIMAL_TARGET_TYPE_UNSPECIFIED" | "NUMERIC" | "BIGNUMERIC" | "STRING" | (string & {})>;
  /** Optional. Format used to parse DATE values. Supports C-style and SQL-style values. */
  dateFormat?: string;
  /** Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default source URIs are expanded against the underlying storage. Other options include specifying manifest files. Only applicable to object storage systems. */
  fileSetSpecType?: "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH" | "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST" | (string & {});
  /** Optional. Format used to parse TIMESTAMP values. Supports C-style and SQL-style values. */
  timestampFormat?: string;
  /** Try to detect schema and format options automatically. Any option specified explicitly will be honored. */
  autodetect?: boolean;
  /** Optional. Additional properties to set if sourceFormat is set to PARQUET. */
  parquetOptions?: ParquetOptions;
  /** [Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups, exactly one URI can be specified. Also, the '*' wildcard character is not allowed. */
  sourceUris?: Array<string>;
  /** Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names Google Cloud Bigtable: This setting is ignored. Google Cloud Datastore backups: This setting is ignored. Avro: This setting is ignored. ORC: This setting is ignored. Parquet: This setting is ignored. */
  ignoreUnknownValues?: boolean;
  /** Optional. The connection specifying the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or S3. The connection_id can have the form `{project_id}.{location_id};{connection_id}` or `projects/{project_id}/locations/{location_id}/connections/{connection_id}`. */
  connectionId?: string;
  /** Optional. The schema for the data. Schema is required for CSV and JSON formats if autodetect is not on. Schema is disallowed for Google Cloud Bigtable, Cloud Datastore backups, Avro, ORC and Parquet formats. */
  schema?: TableSchema;
  /** Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV. For the CSV Format, Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated. */
  timestampTargetPrecision?: Array<number>;
  /** Optional. Metadata Cache Mode for the table. Set this to enable caching of metadata from external data source. */
  metadataCacheMode?: "METADATA_CACHE_MODE_UNSPECIFIED" | "AUTOMATIC" | "MANUAL" | (string & {});
  /** Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON). */
  jsonExtension?: "JSON_EXTENSION_UNSPECIFIED" | "GEOJSON" | (string & {});
  /** Optional. Format used to parse TIME values. Supports C-style and SQL-style values. */
  timeFormat?: string;
  /** Optional. ObjectMetadata is used to create Object Tables. Object Tables contain a listing of objects (with their metadata) found at the source_uris. If ObjectMetadata is set, source_format should be omitted. Currently SIMPLE is the only supported Object Metadata type. */
  objectMetadata?: "OBJECT_METADATA_UNSPECIFIED" | "DIRECTORY" | "SIMPLE" | (string & {});
  /** Optional. Time zone used when parsing timestamp values that do not have specific time zone information (e.g. 2024-04-20 12:34:56). The expected format is a IANA timezone string (e.g. America/Los_Angeles). */
  timeZone?: string;
  /** Optional. Format used to parse DATETIME values. Supports C-style and SQL-style values. */
  datetimeFormat?: string;
  /** Optional. Additional properties to set if sourceFormat is set to AVRO. */
  avroOptions?: AvroOptions;
  /** Optional. Additional options if sourceFormat is set to GOOGLE_SHEETS. */
  googleSheetsOptions?: GoogleSheetsOptions;
  /** Optional. When creating an external table, the user can provide a reference file with the table schema. This is enabled for the following formats: AVRO, PARQUET, ORC. */
  referenceFileSchemaUri?: string;
  /** Optional. The compression type of the data source. Possible values include GZIP and NONE. The default value is NONE. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. An empty string is an invalid value. */
  compression?: string;
  /** Optional. Additional properties to set if sourceFormat is set to CSV. */
  csvOptions?: CsvOptions;
  /** Optional. The maximum number of bad records that BigQuery can ignore when reading data. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. */
  maxBadRecords?: number;
}

export const ExternalDataConfiguration: Schema.Schema<ExternalDataConfiguration> = Schema.suspend(() => Schema.Struct({
  hivePartitioningOptions: Schema.optional(HivePartitioningOptions),
  jsonOptions: Schema.optional(JsonOptions),
  sourceFormat: Schema.optional(Schema.String),
  bigtableOptions: Schema.optional(BigtableOptions),
  decimalTargetTypes: Schema.optional(Schema.Array(Schema.String)),
  dateFormat: Schema.optional(Schema.String),
  fileSetSpecType: Schema.optional(Schema.String),
  timestampFormat: Schema.optional(Schema.String),
  autodetect: Schema.optional(Schema.Boolean),
  parquetOptions: Schema.optional(ParquetOptions),
  sourceUris: Schema.optional(Schema.Array(Schema.String)),
  ignoreUnknownValues: Schema.optional(Schema.Boolean),
  connectionId: Schema.optional(Schema.String),
  schema: Schema.optional(TableSchema),
  timestampTargetPrecision: Schema.optional(Schema.Array(Schema.Number)),
  metadataCacheMode: Schema.optional(Schema.String),
  jsonExtension: Schema.optional(Schema.String),
  timeFormat: Schema.optional(Schema.String),
  objectMetadata: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  datetimeFormat: Schema.optional(Schema.String),
  avroOptions: Schema.optional(AvroOptions),
  googleSheetsOptions: Schema.optional(GoogleSheetsOptions),
  referenceFileSchemaUri: Schema.optional(Schema.String),
  compression: Schema.optional(Schema.String),
  csvOptions: Schema.optional(CsvOptions),
  maxBadRecords: Schema.optional(Schema.Number),
})).annotate({ identifier: "ExternalDataConfiguration" }) as any as Schema.Schema<ExternalDataConfiguration>;

export interface SparkOptions {
  /** Fully qualified name of the user-provided Spark connection object. Format: ```"projects/{project_id}/locations/{location_id}/connections/{connection_id}"``` */
  connection?: string;
  /** Configuration properties as a set of key/value pairs, which will be passed on to the Spark application. For more information, see [Apache Spark](https://spark.apache.org/docs/latest/index.html) and the [procedure option list](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#procedure_option_list). */
  properties?: Record<string, string>;
  /** The fully qualified name of a class in jar_uris, for example, com.example.wordcount. Exactly one of main_class and main_jar_uri field should be set for Java/Scala language type. */
  mainClass?: string;
  /** JARs to include on the driver and executor CLASSPATH. For more information about Apache Spark, see [Apache Spark](https://spark.apache.org/docs/latest/index.html). */
  jarUris?: Array<string>;
  /** Files to be placed in the working directory of each executor. For more information about Apache Spark, see [Apache Spark](https://spark.apache.org/docs/latest/index.html). */
  fileUris?: Array<string>;
  /** Custom container image for the runtime environment. */
  containerImage?: string;
  /** Python files to be placed on the PYTHONPATH for PySpark application. Supported file types: `.py`, `.egg`, and `.zip`. For more information about Apache Spark, see [Apache Spark](https://spark.apache.org/docs/latest/index.html). */
  pyFileUris?: Array<string>;
  /** Archive files to be extracted into the working directory of each executor. For more information about Apache Spark, see [Apache Spark](https://spark.apache.org/docs/latest/index.html). */
  archiveUris?: Array<string>;
  /** Runtime version. If not specified, the default runtime version is used. */
  runtimeVersion?: string;
  /** The main file/jar URI of the Spark application. Exactly one of the definition_body field and the main_file_uri field must be set for Python. Exactly one of main_class and main_file_uri field should be set for Java/Scala language type. */
  mainFileUri?: string;
}

export const SparkOptions: Schema.Schema<SparkOptions> = Schema.suspend(() => Schema.Struct({
  connection: Schema.optional(Schema.String),
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  mainClass: Schema.optional(Schema.String),
  jarUris: Schema.optional(Schema.Array(Schema.String)),
  fileUris: Schema.optional(Schema.Array(Schema.String)),
  containerImage: Schema.optional(Schema.String),
  pyFileUris: Schema.optional(Schema.Array(Schema.String)),
  archiveUris: Schema.optional(Schema.Array(Schema.String)),
  runtimeVersion: Schema.optional(Schema.String),
  mainFileUri: Schema.optional(Schema.String),
})).annotate({ identifier: "SparkOptions" }) as any as Schema.Schema<SparkOptions>;

export interface SerDeInfo {
  /** Required. Specifies a fully-qualified class name of the serialization library that is responsible for the translation of data between table representation and the underlying low-level input and output format structures. The maximum length is 256 characters. */
  serializationLibrary?: string;
  /** Optional. Key-value pairs that define the initialization parameters for the serialization library. Maximum size 10 Kib. */
  parameters?: Record<string, string>;
  /** Optional. Name of the SerDe. The maximum length is 256 characters. */
  name?: string;
}

export const SerDeInfo: Schema.Schema<SerDeInfo> = Schema.suspend(() => Schema.Struct({
  serializationLibrary: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "SerDeInfo" }) as any as Schema.Schema<SerDeInfo>;

export interface StorageDescriptor {
  /** Optional. Specifies the fully qualified class name of the OutputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcOutputFormat"). The maximum length is 128 characters. */
  outputFormat?: string;
  /** Optional. The physical location of the table (e.g. `gs://spark-dataproc-data/pangea-data/case_sensitive/` or `gs://spark-dataproc-data/pangea-data/*`). The maximum length is 2056 bytes. */
  locationUri?: string;
  /** Optional. Serializer and deserializer information. */
  serdeInfo?: SerDeInfo;
  /** Optional. Specifies the fully qualified class name of the InputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcInputFormat"). The maximum length is 128 characters. */
  inputFormat?: string;
}

export const StorageDescriptor: Schema.Schema<StorageDescriptor> = Schema.suspend(() => Schema.Struct({
  outputFormat: Schema.optional(Schema.String),
  locationUri: Schema.optional(Schema.String),
  serdeInfo: Schema.optional(SerDeInfo),
  inputFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "StorageDescriptor" }) as any as Schema.Schema<StorageDescriptor>;

export interface TableConstraints {
  /** Optional. Present only if the table has a foreign key. The foreign key is not enforced. */
  foreignKeys?: Array<{ columnReferences?: Array<{ referencedColumn?: string; referencingColumn?: string }>; referencedTable?: { datasetId?: string; tableId?: string; projectId?: string }; name?: string }>;
  /** Represents the primary key constraint on a table's columns. */
  primaryKey?: { columns?: Array<string> };
}

export const TableConstraints: Schema.Schema<TableConstraints> = Schema.suspend(() => Schema.Struct({
  foreignKeys: Schema.optional(Schema.Array(Schema.Struct({ columnReferences: Schema.optional(Schema.Array(Schema.Struct({ referencedColumn: Schema.optional(Schema.String), referencingColumn: Schema.optional(Schema.String) }))), referencedTable: Schema.optional(Schema.Struct({ datasetId: Schema.optional(Schema.String), tableId: Schema.optional(Schema.String), projectId: Schema.optional(Schema.String) })), name: Schema.optional(Schema.String) }))),
  primaryKey: Schema.optional(Schema.Struct({ columns: Schema.optional(Schema.Array(Schema.String)) })),
})).annotate({ identifier: "TableConstraints" }) as any as Schema.Schema<TableConstraints>;

export interface SystemVariables {
  /** Output only. Value for each system variable. */
  values?: Record<string, unknown>;
  /** Output only. Data type for each system variable. */
  types?: Record<string, StandardSqlDataType>;
}

export const SystemVariables: Schema.Schema<SystemVariables> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  types: Schema.optional(Schema.Record(Schema.String, StandardSqlDataType)),
})).annotate({ identifier: "SystemVariables" }) as any as Schema.Schema<SystemVariables>;

export interface ModelExtractOptions {
  /** The 1-based ID of the trial to be exported from a hyperparameter tuning model. If not specified, the trial with id = [Model](https://cloud.google.com/bigquery/docs/reference/rest/v2/models#resource:-model).defaultTrialId is exported. This field is ignored for models not trained with hyperparameter tuning. */
  trialId?: string;
}

export const ModelExtractOptions: Schema.Schema<ModelExtractOptions> = Schema.suspend(() => Schema.Struct({
  trialId: Schema.optional(Schema.String),
})).annotate({ identifier: "ModelExtractOptions" }) as any as Schema.Schema<ModelExtractOptions>;

export interface JobConfigurationExtract {
  /** Whether to use logical types when extracting to AVRO format. Not applicable when extracting models. */
  useAvroLogicalTypes?: boolean;
  /** A reference to the model being exported. */
  sourceModel?: ModelReference;
  /** Optional. When extracting data in CSV format, this defines the delimiter to use between fields in the exported data. Default is ','. Not applicable when extracting models. */
  fieldDelimiter?: string;
  /** [Pick one] A list of fully-qualified Google Cloud Storage URIs where the extracted table should be written. */
  destinationUris?: Array<string>;
  /** Optional. The exported file format. Possible values include CSV, NEWLINE_DELIMITED_JSON, PARQUET, or AVRO for tables and ML_TF_SAVED_MODEL or ML_XGBOOST_BOOSTER for models. The default value for tables is CSV. Tables with nested or repeated fields cannot be exported as CSV. The default value for models is ML_TF_SAVED_MODEL. */
  destinationFormat?: string;
  /** Optional. Model extract options only applicable when extracting models. */
  modelExtractOptions?: ModelExtractOptions;
  /** Optional. Whether to print out a header row in the results. Default is true. Not applicable when extracting models. */
  printHeader?: boolean;
  /** [Pick one] DEPRECATED: Use destinationUris instead, passing only one URI as necessary. The fully-qualified Google Cloud Storage URI where the extracted table should be written. */
  destinationUri?: string;
  /** Optional. The compression type to use for exported files. Possible values include DEFLATE, GZIP, NONE, SNAPPY, and ZSTD. The default value is NONE. Not all compression formats are support for all file formats. DEFLATE is only supported for Avro. ZSTD is only supported for Parquet. Not applicable when extracting models. */
  compression?: string;
  /** A reference to the table being exported. */
  sourceTable?: TableReference;
}

export const JobConfigurationExtract: Schema.Schema<JobConfigurationExtract> = Schema.suspend(() => Schema.Struct({
  useAvroLogicalTypes: Schema.optional(Schema.Boolean),
  sourceModel: Schema.optional(ModelReference),
  fieldDelimiter: Schema.optional(Schema.String),
  destinationUris: Schema.optional(Schema.Array(Schema.String)),
  destinationFormat: Schema.optional(Schema.String),
  modelExtractOptions: Schema.optional(ModelExtractOptions),
  printHeader: Schema.optional(Schema.Boolean),
  destinationUri: Schema.optional(Schema.String),
  compression: Schema.optional(Schema.String),
  sourceTable: Schema.optional(TableReference),
})).annotate({ identifier: "JobConfigurationExtract" }) as any as Schema.Schema<JobConfigurationExtract>;

export interface RangePartitioning {
  /** Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED. */
  field?: string;
  /** [Experimental] Defines the ranges for range partitioning. */
  range?: { start?: string; interval?: string; end?: string };
}

export const RangePartitioning: Schema.Schema<RangePartitioning> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  range: Schema.optional(Schema.Struct({ start: Schema.optional(Schema.String), interval: Schema.optional(Schema.String), end: Schema.optional(Schema.String) })),
})).annotate({ identifier: "RangePartitioning" }) as any as Schema.Schema<RangePartitioning>;

export interface Clustering {
  /** One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see [Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables#limitations). */
  fields?: Array<string>;
}

export const Clustering: Schema.Schema<Clustering> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Clustering" }) as any as Schema.Schema<Clustering>;

export interface ScriptOptions {
  /** Timeout period for each statement in a script. */
  statementTimeoutMs?: string;
  /** Limit on the number of bytes billed per statement. Exceeding this budget results in an error. */
  statementByteBudget?: string;
  /** Determines which statement in the script represents the "key result", used to populate the schema and query results of the script job. Default is LAST. */
  keyResultStatement?: "KEY_RESULT_STATEMENT_KIND_UNSPECIFIED" | "LAST" | "FIRST_SELECT" | (string & {});
}

export const ScriptOptions: Schema.Schema<ScriptOptions> = Schema.suspend(() => Schema.Struct({
  statementTimeoutMs: Schema.optional(Schema.String),
  statementByteBudget: Schema.optional(Schema.String),
  keyResultStatement: Schema.optional(Schema.String),
})).annotate({ identifier: "ScriptOptions" }) as any as Schema.Schema<ScriptOptions>;

export interface UserDefinedFunctionResource {
  /** [Pick one] A code resource to load from a Google Cloud Storage URI (gs://bucket/path). */
  resourceUri?: string;
  /** [Pick one] An inline resource that contains code for a user-defined function (UDF). Providing a inline code resource is equivalent to providing a URI for a file containing the same code. */
  inlineCode?: string;
}

export const UserDefinedFunctionResource: Schema.Schema<UserDefinedFunctionResource> = Schema.suspend(() => Schema.Struct({
  resourceUri: Schema.optional(Schema.String),
  inlineCode: Schema.optional(Schema.String),
})).annotate({ identifier: "UserDefinedFunctionResource" }) as any as Schema.Schema<UserDefinedFunctionResource>;

export interface TimePartitioning {
  /** Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively. */
  type?: string;
  /** Optional. If not set, the table is partitioned by pseudo column '_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value. */
  field?: string;
  /** Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value. */
  expirationMs?: string;
  /** If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it. */
  requirePartitionFilter?: boolean;
}

export const TimePartitioning: Schema.Schema<TimePartitioning> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  field: Schema.optional(Schema.String),
  expirationMs: Schema.optional(Schema.String),
  requirePartitionFilter: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "TimePartitioning" }) as any as Schema.Schema<TimePartitioning>;

export interface ConnectionProperty {
  /** The key of the property to set. */
  key?: string;
  /** The value of the property to set. */
  value?: string;
}

export const ConnectionProperty: Schema.Schema<ConnectionProperty> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "ConnectionProperty" }) as any as Schema.Schema<ConnectionProperty>;

export interface JobConfigurationQuery {
  /** Optional. This is only supported for a SELECT query using a temporary table. If set, the query is allowed to write results incrementally to the temporary result table. This may incur a performance penalty. This option cannot be used with Legacy SQL. This feature is not yet available. */
  writeIncrementalResults?: boolean;
  /** Optional. You can specify external table definitions, which operate as ephemeral tables that can be queried. These definitions are configured using a JSON map, where the string key represents the table identifier, and the value is the corresponding external data configuration object. */
  tableDefinitions?: Record<string, ExternalDataConfiguration>;
  /** Custom encryption configuration (e.g., Cloud KMS keys) */
  destinationEncryptionConfiguration?: EncryptionConfiguration;
  /** Optional. Specifies the default dataset to use for unqualified table names in the query. This setting does not alter behavior of unqualified dataset names. Setting the system variable `@@dataset_id` achieves the same behavior. See https://cloud.google.com/bigquery/docs/reference/system-variables for more information on system variables. */
  defaultDataset?: DatasetReference;
  /** Range partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. */
  rangePartitioning?: RangePartitioning;
  /** Optional. If true and query uses legacy SQL dialect, allows the query to produce arbitrarily large result tables at a slight cost in performance. Requires destinationTable to be set. For GoogleSQL queries, this flag is ignored and large results are always allowed. However, you must still set destinationTable when result size exceeds the allowed maximum response size. */
  allowLargeResults?: boolean;
  /** Optional. Describes the table where the query results should be stored. This property must be set for large results that exceed the maximum response size. For queries that produce anonymous (cached) results, this field will be populated by BigQuery. */
  destinationTable?: TableReference;
  /** [Optional] Specifies whether the query should be executed as a continuous query. The default value is false. */
  continuous?: boolean;
  /** Clustering specification for the destination table. */
  clustering?: Clustering;
  /** Optional. Specifies whether to use BigQuery's legacy SQL dialect for this query. The default value is true. If set to false, the query uses BigQuery's [GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql). When useLegacySql is set to false, the value of flattenResults is ignored; query will be run as if flattenResults is false. */
  useLegacySql?: boolean;
  /** Options controlling the execution of scripts. */
  scriptOptions?: ScriptOptions;
  /** Optional. Whether to look for the result in the query cache. The query cache is a best-effort cache that will be flushed whenever tables in the query are modified. Moreover, the query cache is only available when a query does not have a destination table specified. The default value is true. */
  useQueryCache?: boolean;
  /** Describes user-defined function resources used in the query. */
  userDefinedFunctionResources?: Array<UserDefinedFunctionResource>;
  /** Allows the schema of the destination table to be updated as a side effect of the query job. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: * ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. * ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable. */
  schemaUpdateOptions?: Array<string>;
  /** Optional. If true and query uses legacy SQL dialect, flattens all nested and repeated fields in the query results. allowLargeResults must be true if this is set to false. For GoogleSQL queries, this flag is ignored and results are never flattened. */
  flattenResults?: boolean;
  /** Query parameters for GoogleSQL queries. */
  queryParameters?: Array<QueryParameter>;
  /** [Deprecated] This property is deprecated. */
  preserveNulls?: boolean;
  /** Limits the bytes billed for this job. Queries that will have bytes billed beyond this limit will fail (without incurring a charge). If unspecified, this will be set to your project default. */
  maximumBytesBilled?: string;
  /** Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion. */
  createDisposition?: string;
  /** Optional. [Deprecated] Maximum billing tier allowed for this query. The billing tier controls the amount of compute resources allotted to the query, and multiplies the on-demand cost of the query accordingly. A query that runs within its allotted resources will succeed and indicate its billing tier in statistics.query.billingTier, but if the query exceeds its allotted resources, it will fail with billingTierLimitExceeded. WARNING: The billed byte amount can be multiplied by an amount up to this number! Most users should not need to alter this setting, and we recommend that you avoid introducing new uses of it. */
  maximumBillingTier?: number;
  /** If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic. */
  createSession?: boolean;
  /** Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints, and uses the schema from the query result. * WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion. */
  writeDisposition?: string;
  /** GoogleSQL only. Set to POSITIONAL to use positional (?) query parameters or to NAMED to use named (@myparam) query parameters in this query. */
  parameterMode?: string;
  /** [Required] SQL query text to execute. The useLegacySql field can be used to indicate whether the query uses legacy SQL or GoogleSQL. */
  query?: string;
  /** Optional. Specifies a priority for the query. Possible values include INTERACTIVE and BATCH. The default value is INTERACTIVE. */
  priority?: string;
  /** Time-based partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. */
  timePartitioning?: TimePartitioning;
  /** Output only. System variables for GoogleSQL queries. A system variable is output if the variable is settable and its value differs from the system default. "@@" prefix is not included in the name of the System variables. */
  systemVariables?: SystemVariables;
  /** Connection properties which can modify the query behavior. */
  connectionProperties?: Array<ConnectionProperty>;
}

export const JobConfigurationQuery: Schema.Schema<JobConfigurationQuery> = Schema.suspend(() => Schema.Struct({
  writeIncrementalResults: Schema.optional(Schema.Boolean),
  tableDefinitions: Schema.optional(Schema.Record(Schema.String, ExternalDataConfiguration)),
  destinationEncryptionConfiguration: Schema.optional(EncryptionConfiguration),
  defaultDataset: Schema.optional(DatasetReference),
  rangePartitioning: Schema.optional(RangePartitioning),
  allowLargeResults: Schema.optional(Schema.Boolean),
  destinationTable: Schema.optional(TableReference),
  continuous: Schema.optional(Schema.Boolean),
  clustering: Schema.optional(Clustering),
  useLegacySql: Schema.optional(Schema.Boolean),
  scriptOptions: Schema.optional(ScriptOptions),
  useQueryCache: Schema.optional(Schema.Boolean),
  userDefinedFunctionResources: Schema.optional(Schema.Array(UserDefinedFunctionResource)),
  schemaUpdateOptions: Schema.optional(Schema.Array(Schema.String)),
  flattenResults: Schema.optional(Schema.Boolean),
  queryParameters: Schema.optional(Schema.Array(QueryParameter)),
  preserveNulls: Schema.optional(Schema.Boolean),
  maximumBytesBilled: Schema.optional(Schema.String),
  createDisposition: Schema.optional(Schema.String),
  maximumBillingTier: Schema.optional(Schema.Number),
  createSession: Schema.optional(Schema.Boolean),
  writeDisposition: Schema.optional(Schema.String),
  parameterMode: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  priority: Schema.optional(Schema.String),
  timePartitioning: Schema.optional(TimePartitioning),
  systemVariables: Schema.optional(SystemVariables),
  connectionProperties: Schema.optional(Schema.Array(ConnectionProperty)),
})).annotate({ identifier: "JobConfigurationQuery" }) as any as Schema.Schema<JobConfigurationQuery>;

export interface JobConfigurationTableCopy {
  /** [Pick one] Source tables to copy. */
  sourceTables?: Array<TableReference>;
  /** Custom encryption configuration (e.g., Cloud KMS keys). */
  destinationEncryptionConfiguration?: EncryptionConfiguration;
  /** [Pick one] Source table to copy. */
  sourceTable?: TableReference;
  /** Optional. The time when the destination table expires. Expired tables will be deleted and their storage reclaimed. */
  destinationExpirationTime?: string;
  /** [Required] The destination table. */
  destinationTable?: TableReference;
  /** Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the table data and uses the schema and table constraints from the source table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion. */
  writeDisposition?: string;
  /** Optional. Supported operation types in table copy job. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "COPY" | "SNAPSHOT" | "RESTORE" | "CLONE" | (string & {});
  /** Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion. */
  createDisposition?: string;
}

export const JobConfigurationTableCopy: Schema.Schema<JobConfigurationTableCopy> = Schema.suspend(() => Schema.Struct({
  sourceTables: Schema.optional(Schema.Array(TableReference)),
  destinationEncryptionConfiguration: Schema.optional(EncryptionConfiguration),
  sourceTable: Schema.optional(TableReference),
  destinationExpirationTime: Schema.optional(Schema.String),
  destinationTable: Schema.optional(TableReference),
  writeDisposition: Schema.optional(Schema.String),
  operationType: Schema.optional(Schema.String),
  createDisposition: Schema.optional(Schema.String),
})).annotate({ identifier: "JobConfigurationTableCopy" }) as any as Schema.Schema<JobConfigurationTableCopy>;

export interface DestinationTableProperties {
  /** Optional. The description for the destination table. This will only be used if the destination table is newly created. If the table already exists and a value different than the current description is provided, the job will fail. */
  description?: string;
  /** Optional. The labels associated with this table. You can use these to organize and group your tables. This will only be used if the destination table is newly created. If the table already exists and labels are different than the current labels are provided, the job will fail. */
  labels?: Record<string, string>;
  /** Internal use only. */
  expirationTime?: string;
  /** Optional. Friendly name for the destination table. If the table already exists, it should be same as the existing friendly name. */
  friendlyName?: string;
}

export const DestinationTableProperties: Schema.Schema<DestinationTableProperties> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  expirationTime: Schema.optional(Schema.String),
  friendlyName: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationTableProperties" }) as any as Schema.Schema<DestinationTableProperties>;

export interface JobConfigurationLoad {
  /** Optional. The user can provide a reference file with the reader schema. This file is only loaded if it is part of source URIs, but is not loaded otherwise. It is enabled for the following formats: AVRO, PARQUET, ORC. */
  referenceFileSchemaUri?: string;
  /** Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C). */
  fieldDelimiter?: string;
  /** Optional. Accept rows that are missing trailing optional columns. The missing values are treated as nulls. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. Only applicable to CSV, ignored for other formats. */
  allowJaggedRows?: boolean;
  /** Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON). */
  jsonExtension?: "JSON_EXTENSION_UNSPECIFIED" | "GEOJSON" | (string & {});
  /** Optional. The maximum number of bad records that BigQuery can ignore when running the job. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This is only supported for CSV and NEWLINE_DELIMITED_JSON file formats. */
  maxBadRecords?: number;
  /** Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names in the table schema Avro, Parquet, ORC: Fields in the file schema that don't exist in the table schema. */
  ignoreUnknownValues?: boolean;
  /** Optional. When sourceFormat is set to "CSV", this indicates whether the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\x00' to '\x1F') are preserved. */
  preserveAsciiControlCharacters?: boolean;
  /** [Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups: Exactly one URI can be specified. Also, the '*' wildcard character is not allowed. */
  sourceUris?: Array<string>;
  /** Optional. Indicates if we should automatically infer the options and schema for CSV and JSON sources. */
  autodetect?: boolean;
  /** Optional. Default time zone that will apply when parsing timestamp values that have no specific time zone. */
  timeZone?: string;
  /** Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. */
  sourceColumnMatch?: "SOURCE_COLUMN_MATCH_UNSPECIFIED" | "POSITION" | "NAME" | (string & {});
  /** Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV. For the CSV Format, Possible values include: Not Specified, [], or [6]: timestamp(6) for all auto detected TIMESTAMP columns [6, 12]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. [12]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated. */
  timestampTargetPrecision?: Array<number>;
  /** Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false. */
  allowQuotedNewlines?: boolean;
  /** Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the `quote` and `fieldDelimiter` properties. If you don't specify an encoding, or if you specify a UTF-8 encoding when the CSV file is not UTF-8 encoded, BigQuery attempts to convert the data to UTF-8. Generally, your data loads successfully, but it may not match byte-for-byte what you expect. To avoid this, specify the correct encoding by using the `--encoding` flag. If BigQuery can't convert a character other than the ASCII `0` character, BigQuery converts the character to the standard Unicode replacement character: �. */
  encoding?: string;
  /** [Required] The destination table to load the data into. */
  destinationTable?: TableReference;
  /** Optional. Additional properties to set if sourceFormat is set to PARQUET. */
  parquetOptions?: ParquetOptions;
  /** Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default, source URIs are expanded against the underlying storage. You can also specify manifest files to control how the file set is constructed. This option is only applicable to object storage systems. */
  fileSetSpecType?: "FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH" | "FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST" | (string & {});
  /** Time-based partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. */
  timePartitioning?: TimePartitioning;
  /** Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\N", BigQuery interprets "\N" as a null value when loading a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value. */
  nullMarker?: string;
  /** Optional. [Experimental] Configures the load job to copy files directly to the destination BigLake managed table, bypassing file content reading and rewriting. Copying files only is supported when all the following are true: * `source_uris` are located in the same Cloud Storage location as the destination table's `storage_uri` location. * `source_format` is `PARQUET`. * `destination_table` is an existing BigLake managed table. The table's schema does not have flexible column names. The table's columns do not have type parameters other than precision and scale. * No options other than the above are specified. */
  copyFilesOnly?: boolean;
  /** Range partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. */
  rangePartitioning?: RangePartitioning;
  /** Optional. Date format used for parsing TIMESTAMP values. */
  timestampFormat?: string;
  /** Optional. Specifies whether the job is allowed to create new tables. The following values are supported: * CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. * CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion. */
  createDisposition?: string;
  /** Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types. */
  nullMarkers?: Array<string>;
  /** Custom encryption configuration (e.g., Cloud KMS keys) */
  destinationEncryptionConfiguration?: EncryptionConfiguration;
  /** If sourceFormat is set to "DATASTORE_BACKUP", indicates which entity properties to load into BigQuery from a Cloud Datastore backup. Property names are case sensitive and must be top-level properties. If no properties are specified, BigQuery loads all properties. If any named property isn't found in the Cloud Datastore backup, an invalid error is returned in the job result. */
  projectionFields?: Array<string>;
  /** Optional. Character map supported for column names in CSV/Parquet loads. Defaults to STRICT and can be overridden by Project Config Service. Using this option with unsupporting load formats will result in an error. */
  columnNameCharacterMap?: "COLUMN_NAME_CHARACTER_MAP_UNSPECIFIED" | "STRICT" | "V1" | "V2" | (string & {});
  /** Allows the schema of the destination table to be updated as a side effect of the load job if a schema is autodetected or supplied in the job configuration. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: * ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. * ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable. */
  schemaUpdateOptions?: Array<string>;
  /** Optional. The format of the data files. For CSV files, specify "CSV". For datastore backups, specify "DATASTORE_BACKUP". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro, specify "AVRO". For parquet, specify "PARQUET". For orc, specify "ORC". The default value is CSV. */
  sourceFormat?: string;
  /** Optional. The number of rows at the top of a CSV file that BigQuery will skip when loading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema. */
  skipLeadingRows?: number;
  /** Optional. When set, configures hive partitioning support. Not all storage formats support hive partitioning -- requesting hive partitioning on an unsupported format will lead to an error, as will providing an invalid specification. */
  hivePartitioningOptions?: HivePartitioningOptions;
  /** Optional. If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic. */
  createSession?: boolean;
  /** Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: * (38,9) -> NUMERIC; * (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); * (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); * (76,38) -> BIGNUMERIC; * (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats. */
  decimalTargetTypes?: Array<"DECIMAL_TARGET_TYPE_UNSPECIFIED" | "NUMERIC" | "BIGNUMERIC" | "STRING" | (string & {})>;
  /** Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote ('"'). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' " ', use ' "" '. @default " */
  quote?: string;
  /** Optional. Date format used for parsing DATE values. */
  dateFormat?: string;
  /** Optional. The schema for the destination table. The schema can be omitted if the destination table already exists, or if you're loading data from Google Cloud Datastore. */
  schema?: TableSchema;
  /** Clustering specification for the destination table. */
  clustering?: Clustering;
  /** Optional. [Experimental] Properties with which to create the destination table if it is new. */
  destinationTableProperties?: DestinationTableProperties;
  /** Optional. Date format used for parsing DATETIME values. */
  datetimeFormat?: string;
  /** Optional. Connection properties which can modify the load job behavior. Currently, only the 'session_id' connection property is supported, and is used to resolve _SESSION appearing as the dataset id. */
  connectionProperties?: Array<ConnectionProperty>;
  /** Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: * WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints and uses the schema from the load job. * WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. * WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. * WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_APPEND. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion. */
  writeDisposition?: string;
  /** Optional. Date format used for parsing TIME values. */
  timeFormat?: string;
  /** [Deprecated] The inline schema. For CSV schemas, specify as "Field1:Type1[,Field2:Type2]*". For example, "foo:STRING, bar:INTEGER, baz:FLOAT". */
  schemaInline?: string;
  /** Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER). */
  useAvroLogicalTypes?: boolean;
  /** [Deprecated] The format of the schemaInline property. */
  schemaInlineFormat?: string;
}

export const JobConfigurationLoad: Schema.Schema<JobConfigurationLoad> = Schema.suspend(() => Schema.Struct({
  referenceFileSchemaUri: Schema.optional(Schema.String),
  fieldDelimiter: Schema.optional(Schema.String),
  allowJaggedRows: Schema.optional(Schema.Boolean),
  jsonExtension: Schema.optional(Schema.String),
  maxBadRecords: Schema.optional(Schema.Number),
  ignoreUnknownValues: Schema.optional(Schema.Boolean),
  preserveAsciiControlCharacters: Schema.optional(Schema.Boolean),
  sourceUris: Schema.optional(Schema.Array(Schema.String)),
  autodetect: Schema.optional(Schema.Boolean),
  timeZone: Schema.optional(Schema.String),
  sourceColumnMatch: Schema.optional(Schema.String),
  timestampTargetPrecision: Schema.optional(Schema.Array(Schema.Number)),
  allowQuotedNewlines: Schema.optional(Schema.Boolean),
  encoding: Schema.optional(Schema.String),
  destinationTable: Schema.optional(TableReference),
  parquetOptions: Schema.optional(ParquetOptions),
  fileSetSpecType: Schema.optional(Schema.String),
  timePartitioning: Schema.optional(TimePartitioning),
  nullMarker: Schema.optional(Schema.String),
  copyFilesOnly: Schema.optional(Schema.Boolean),
  rangePartitioning: Schema.optional(RangePartitioning),
  timestampFormat: Schema.optional(Schema.String),
  createDisposition: Schema.optional(Schema.String),
  nullMarkers: Schema.optional(Schema.Array(Schema.String)),
  destinationEncryptionConfiguration: Schema.optional(EncryptionConfiguration),
  projectionFields: Schema.optional(Schema.Array(Schema.String)),
  columnNameCharacterMap: Schema.optional(Schema.String),
  schemaUpdateOptions: Schema.optional(Schema.Array(Schema.String)),
  sourceFormat: Schema.optional(Schema.String),
  skipLeadingRows: Schema.optional(Schema.Number),
  hivePartitioningOptions: Schema.optional(HivePartitioningOptions),
  createSession: Schema.optional(Schema.Boolean),
  decimalTargetTypes: Schema.optional(Schema.Array(Schema.String)),
  quote: Schema.optional(Schema.String),
  dateFormat: Schema.optional(Schema.String),
  schema: Schema.optional(TableSchema),
  clustering: Schema.optional(Clustering),
  destinationTableProperties: Schema.optional(DestinationTableProperties),
  datetimeFormat: Schema.optional(Schema.String),
  connectionProperties: Schema.optional(Schema.Array(ConnectionProperty)),
  writeDisposition: Schema.optional(Schema.String),
  timeFormat: Schema.optional(Schema.String),
  schemaInline: Schema.optional(Schema.String),
  useAvroLogicalTypes: Schema.optional(Schema.Boolean),
  schemaInlineFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "JobConfigurationLoad" }) as any as Schema.Schema<JobConfigurationLoad>;

export interface JobConfiguration {
  /** Output only. The type of the job. Can be QUERY, LOAD, EXTRACT, COPY or UNKNOWN. */
  jobType?: string;
  /** Optional. The reservation that job would use. User can specify a reservation to execute the job. If reservation is not set, reservation is determined based on the rules defined by the reservation assignments. The expected format is `projects/{project}/locations/{location}/reservations/{reservation}`. */
  reservation?: string;
  /** Optional. If set, don't actually run this job. A valid query will return a mostly empty response with some processing statistics, while an invalid query will return the same error it would if it wasn't a dry run. Behavior of non-query jobs is undefined. */
  dryRun?: boolean;
  /** [Pick one] Configures an extract job. */
  extract?: JobConfigurationExtract;
  /** The labels associated with this job. You can use these to organize and group your jobs. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key. */
  labels?: Record<string, string>;
  /** Optional. A target limit on the rate of slot consumption by this job. If set to a value > 0, BigQuery will attempt to limit the rate of slot consumption by this job to keep it below the configured limit, even if the job is eligible for more slots based on fair scheduling. The unused slots will be available for other jobs and queries to use. Note: This feature is not yet generally available. */
  maxSlots?: number;
  /** [Pick one] Configures a query job. */
  query?: JobConfigurationQuery;
  /** [Pick one] Copies a table. */
  copy?: JobConfigurationTableCopy;
  /** Optional. Job timeout in milliseconds relative to the job creation time. If this time limit is exceeded, BigQuery attempts to stop the job, but might not always succeed in canceling it before the job completes. For example, a job that takes more than 60 seconds to complete has a better chance of being stopped than a job that takes 10 seconds to complete. */
  jobTimeoutMs?: string;
  /** [Pick one] Configures a load job. */
  load?: JobConfigurationLoad;
}

export const JobConfiguration: Schema.Schema<JobConfiguration> = Schema.suspend(() => Schema.Struct({
  jobType: Schema.optional(Schema.String),
  reservation: Schema.optional(Schema.String),
  dryRun: Schema.optional(Schema.Boolean),
  extract: Schema.optional(JobConfigurationExtract),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  maxSlots: Schema.optional(Schema.Number),
  query: Schema.optional(JobConfigurationQuery),
  copy: Schema.optional(JobConfigurationTableCopy),
  jobTimeoutMs: Schema.optional(Schema.String),
  load: Schema.optional(JobConfigurationLoad),
})).annotate({ identifier: "JobConfiguration" }) as any as Schema.Schema<JobConfiguration>;

export interface ErrorProto {
  /** Debugging information. This property is internal to Google and should not be used. */
  debugInfo?: string;
  /** Specifies where the error occurred, if present. */
  location?: string;
  /** A short error code that summarizes the error. */
  reason?: string;
  /** A human-readable description of the error. */
  message?: string;
}

export const ErrorProto: Schema.Schema<ErrorProto> = Schema.suspend(() => Schema.Struct({
  debugInfo: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "ErrorProto" }) as any as Schema.Schema<ErrorProto>;

export interface JobStatus {
  /** Output only. The first errors encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has not completed or was unsuccessful. */
  errors?: Array<ErrorProto>;
  /** Output only. Running state of the job. Valid states include 'PENDING', 'RUNNING', and 'DONE'. */
  state?: string;
  /** Output only. Final error result of the job. If present, indicates that the job has completed and was unsuccessful. */
  errorResult?: ErrorProto;
}

export const JobStatus: Schema.Schema<JobStatus> = Schema.suspend(() => Schema.Struct({
  errors: Schema.optional(Schema.Array(ErrorProto)),
  state: Schema.optional(Schema.String),
  errorResult: Schema.optional(ErrorProto),
})).annotate({ identifier: "JobStatus" }) as any as Schema.Schema<JobStatus>;

export interface JobCreationReason {
  /** Output only. Specifies the high level reason why a Job was created. */
  code?: "CODE_UNSPECIFIED" | "REQUESTED" | "LONG_RUNNING" | "LARGE_RESULTS" | "OTHER" | (string & {});
}

export const JobCreationReason: Schema.Schema<JobCreationReason> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "JobCreationReason" }) as any as Schema.Schema<JobCreationReason>;

export interface JobReference {
  /** Required. The ID of the job. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (_), or dashes (-). The maximum length is 1,024 characters. */
  jobId?: string;
  /** Optional. The geographic location of the job. The default value is US. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations */
  location?: string;
  /** Required. The ID of the project containing this job. */
  projectId?: string;
}

export const JobReference: Schema.Schema<JobReference> = Schema.suspend(() => Schema.Struct({
  jobId: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "JobReference" }) as any as Schema.Schema<JobReference>;

export interface Job {
  /** Output only. The status of this job. Examine this value when polling an asynchronous job to see if the job is complete. */
  status?: JobStatus;
  /** Output only. [Full-projection-only] String representation of identity of requesting party. Populated for both first- and third-party identities. Only present for APIs that support third-party identities. */
  principal_subject?: string;
  /** Output only. A hash of this resource. */
  etag?: string;
  /** Output only. The type of the resource. */
  kind?: string;
  /** Output only. Information about the job, including starting time and ending time of the job. */
  statistics?: JobStatistics;
  /** Output only. Email address of the user who ran the job. */
  user_email?: string;
  /** Output only. A URL that can be used to access the resource again. */
  selfLink?: string;
  /** Required. Describes the job configuration. */
  configuration?: JobConfiguration;
  /** Output only. Opaque ID field of the job. */
  id?: string;
  /** Output only. The reason why a Job was created. */
  jobCreationReason?: JobCreationReason;
  /** Optional. Reference describing the unique-per-user name of the job. */
  jobReference?: JobReference;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  status: Schema.optional(JobStatus),
  principal_subject: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  statistics: Schema.optional(JobStatistics),
  user_email: Schema.optional(Schema.String),
  selfLink: Schema.optional(Schema.String),
  configuration: Schema.optional(JobConfiguration),
  id: Schema.optional(Schema.String),
  jobCreationReason: Schema.optional(JobCreationReason),
  jobReference: Schema.optional(JobReference),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface JobCancelResponse {
  /** The resource type of the response. */
  kind?: string;
  /** The final state of the job. */
  job?: Job;
}

export const JobCancelResponse: Schema.Schema<JobCancelResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  job: Schema.optional(Job),
})).annotate({ identifier: "JobCancelResponse" }) as any as Schema.Schema<JobCancelResponse>;

export interface JoinRestrictionPolicy {
  /** Optional. The only columns that joins are allowed on. This field is must be specified for join_conditions JOIN_ANY and JOIN_ALL and it cannot be set for JOIN_BLOCKED. */
  joinAllowedColumns?: Array<string>;
  /** Optional. Specifies if a join is required or not on queries for the view. Default is JOIN_CONDITION_UNSPECIFIED. */
  joinCondition?: "JOIN_CONDITION_UNSPECIFIED" | "JOIN_ANY" | "JOIN_ALL" | "JOIN_NOT_REQUIRED" | "JOIN_BLOCKED" | (string & {});
}

export const JoinRestrictionPolicy: Schema.Schema<JoinRestrictionPolicy> = Schema.suspend(() => Schema.Struct({
  joinAllowedColumns: Schema.optional(Schema.Array(Schema.String)),
  joinCondition: Schema.optional(Schema.String),
})).annotate({ identifier: "JoinRestrictionPolicy" }) as any as Schema.Schema<JoinRestrictionPolicy>;

export interface LinkedDatasetMetadata {
  /** Output only. Specifies whether Linked Dataset is currently in a linked state or not. */
  linkState?: "LINK_STATE_UNSPECIFIED" | "LINKED" | "UNLINKED" | (string & {});
}

export const LinkedDatasetMetadata: Schema.Schema<LinkedDatasetMetadata> = Schema.suspend(() => Schema.Struct({
  linkState: Schema.optional(Schema.String),
})).annotate({ identifier: "LinkedDatasetMetadata" }) as any as Schema.Schema<LinkedDatasetMetadata>;

export interface LocationMetadata {
  /** The legacy BigQuery location ID, e.g. “EU” for the “europe” location. This is for any API consumers that need the legacy “US” and “EU” locations. */
  legacyLocationId?: string;
}

export const LocationMetadata: Schema.Schema<LocationMetadata> = Schema.suspend(() => Schema.Struct({
  legacyLocationId: Schema.optional(Schema.String),
})).annotate({ identifier: "LocationMetadata" }) as any as Schema.Schema<LocationMetadata>;

export interface UndeleteDatasetRequest {
  /** Optional. The exact time when the dataset was deleted. If not specified, the most recently deleted version is undeleted. Undeleting a dataset using deletion time is not supported. */
  deletionTime?: string;
}

export const UndeleteDatasetRequest: Schema.Schema<UndeleteDatasetRequest> = Schema.suspend(() => Schema.Struct({
  deletionTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteDatasetRequest" }) as any as Schema.Schema<UndeleteDatasetRequest>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface GetServiceAccountResponse {
  /** The service account email address. */
  email?: string;
  /** The resource type of the response. */
  kind?: string;
}

export const GetServiceAccountResponse: Schema.Schema<GetServiceAccountResponse> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "GetServiceAccountResponse" }) as any as Schema.Schema<GetServiceAccountResponse>;

export interface ForeignViewDefinition {
  /** Optional. Represents the dialect of the query. */
  dialect?: string;
  /** Required. The query that defines the view. */
  query?: string;
}

export const ForeignViewDefinition: Schema.Schema<ForeignViewDefinition> = Schema.suspend(() => Schema.Struct({
  dialect: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "ForeignViewDefinition" }) as any as Schema.Schema<ForeignViewDefinition>;

export interface DifferentialPrivacyPolicy {
  /** Optional. The maximum groups contributed value that is used per query. Represents the maximum number of groups to which each protected entity can contribute. Changing this value does not improve or worsen privacy. The best value for accuracy and utility depends on the query and data. */
  maxGroupsContributed?: string;
  /** Optional. The delta value that is used per query. Delta represents the probability that any row will fail to be epsilon differentially private. Indicates the risk associated with exposing aggregate rows in the result of a query. */
  deltaPerQuery?: number;
  /** Optional. The total epsilon budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of epsilon they request in their query. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget. */
  epsilonBudget?: number;
  /** Optional. The maximum epsilon value that a query can consume. If the subscriber specifies epsilon as a parameter in a SELECT query, it must be less than or equal to this value. The epsilon parameter controls the amount of noise that is added to the groups — a higher epsilon means less noise. */
  maxEpsilonPerQuery?: number;
  /** Optional. The total delta budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of delta that is pre-defined by the contributor through the privacy policy delta_per_query field. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget. */
  deltaBudget?: number;
  /** Optional. The privacy unit column associated with this policy. Differential privacy policies can only have one privacy unit column per data source object (table, view). */
  privacyUnitColumn?: string;
  /** Output only. The epsilon budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase. */
  epsilonBudgetRemaining?: number;
  /** Output only. The delta budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase. */
  deltaBudgetRemaining?: number;
}

export const DifferentialPrivacyPolicy: Schema.Schema<DifferentialPrivacyPolicy> = Schema.suspend(() => Schema.Struct({
  maxGroupsContributed: Schema.optional(Schema.String),
  deltaPerQuery: Schema.optional(Schema.Number),
  epsilonBudget: Schema.optional(Schema.Number),
  maxEpsilonPerQuery: Schema.optional(Schema.Number),
  deltaBudget: Schema.optional(Schema.Number),
  privacyUnitColumn: Schema.optional(Schema.String),
  epsilonBudgetRemaining: Schema.optional(Schema.Number),
  deltaBudgetRemaining: Schema.optional(Schema.Number),
})).annotate({ identifier: "DifferentialPrivacyPolicy" }) as any as Schema.Schema<DifferentialPrivacyPolicy>;

export interface AggregationThresholdPolicy {
  /** Optional. The privacy unit column(s) associated with this policy. For now, only one column per data source object (table, view) is allowed as a privacy unit column. Representing as a repeated field in metadata for extensibility to multiple columns in future. Duplicates and Repeated struct fields are not allowed. For nested fields, use dot notation ("outer.inner") */
  privacyUnitColumns?: Array<string>;
  /** Optional. The threshold for the "aggregation threshold" policy. */
  threshold?: string;
}

export const AggregationThresholdPolicy: Schema.Schema<AggregationThresholdPolicy> = Schema.suspend(() => Schema.Struct({
  privacyUnitColumns: Schema.optional(Schema.Array(Schema.String)),
  threshold: Schema.optional(Schema.String),
})).annotate({ identifier: "AggregationThresholdPolicy" }) as any as Schema.Schema<AggregationThresholdPolicy>;

export interface PrivacyPolicy {
  /** Optional. Policy used for differential privacy. */
  differentialPrivacyPolicy?: DifferentialPrivacyPolicy;
  /** Optional. Policy used for aggregation thresholds. */
  aggregationThresholdPolicy?: AggregationThresholdPolicy;
  /** Optional. Join restriction policy is outside of the one of policies, since this policy can be set along with other policies. This policy gives data providers the ability to enforce joins on the 'join_allowed_columns' when data is queried from a privacy protected view. */
  joinRestrictionPolicy?: JoinRestrictionPolicy;
}

export const PrivacyPolicy: Schema.Schema<PrivacyPolicy> = Schema.suspend(() => Schema.Struct({
  differentialPrivacyPolicy: Schema.optional(DifferentialPrivacyPolicy),
  aggregationThresholdPolicy: Schema.optional(AggregationThresholdPolicy),
  joinRestrictionPolicy: Schema.optional(JoinRestrictionPolicy),
})).annotate({ identifier: "PrivacyPolicy" }) as any as Schema.Schema<PrivacyPolicy>;

export interface ViewDefinition {
  /** Specifies whether to use BigQuery's legacy SQL for this view. The default value is true. If set to false, the view uses BigQuery's [GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql). Queries and views that reference this view must use the same flag value. A wrapper is used here because the default value is True. */
  useLegacySql?: boolean;
  /** True if the column names are explicitly specified. For example by using the 'CREATE VIEW v(c1, c2) AS ...' syntax. Can only be set for GoogleSQL views. */
  useExplicitColumnNames?: boolean;
  /** Optional. Foreign view representations. */
  foreignDefinitions?: Array<ForeignViewDefinition>;
  /** Required. A query that BigQuery executes when the view is referenced. */
  query?: string;
  /** Describes user-defined function resources used in the query. */
  userDefinedFunctionResources?: Array<UserDefinedFunctionResource>;
  /** Optional. Specifies the privacy policy for the view. */
  privacyPolicy?: PrivacyPolicy;
}

export const ViewDefinition: Schema.Schema<ViewDefinition> = Schema.suspend(() => Schema.Struct({
  useLegacySql: Schema.optional(Schema.Boolean),
  useExplicitColumnNames: Schema.optional(Schema.Boolean),
  foreignDefinitions: Schema.optional(Schema.Array(ForeignViewDefinition)),
  query: Schema.optional(Schema.String),
  userDefinedFunctionResources: Schema.optional(Schema.Array(UserDefinedFunctionResource)),
  privacyPolicy: Schema.optional(PrivacyPolicy),
})).annotate({ identifier: "ViewDefinition" }) as any as Schema.Schema<ViewDefinition>;

export interface ExternalCatalogDatasetOptions {
  /** Optional. The storage location URI for all tables in the dataset. Equivalent to hive metastore's database locationUri. Maximum length of 1024 characters. */
  defaultStorageLocationUri?: string;
  /** Optional. A map of key value pairs defining the parameters and properties of the open source schema. Maximum size of 2MiB. */
  parameters?: Record<string, string>;
}

export const ExternalCatalogDatasetOptions: Schema.Schema<ExternalCatalogDatasetOptions> = Schema.suspend(() => Schema.Struct({
  defaultStorageLocationUri: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ExternalCatalogDatasetOptions" }) as any as Schema.Schema<ExternalCatalogDatasetOptions>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Binding {
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  members: Schema.optional(Schema.Array(Schema.String)),
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  bindings: Schema.optional(Schema.Array(Binding)),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface TableCell {
  v?: unknown;
}

export const TableCell: Schema.Schema<TableCell> = Schema.suspend(() => Schema.Struct({
  v: Schema.optional(Schema.Unknown),
})).annotate({ identifier: "TableCell" }) as any as Schema.Schema<TableCell>;

export interface TableRow {
  /** Represents a single row in the result set, consisting of one or more fields. */
  f?: Array<TableCell>;
}

export const TableRow: Schema.Schema<TableRow> = Schema.suspend(() => Schema.Struct({
  f: Schema.optional(Schema.Array(TableCell)),
})).annotate({ identifier: "TableRow" }) as any as Schema.Schema<TableRow>;

export interface RowAccessPolicy {
  /** Required. Reference describing the ID of this row access policy. */
  rowAccessPolicyReference?: RowAccessPolicyReference;
  /** Output only. The time when this row access policy was created, in milliseconds since the epoch. */
  creationTime?: string;
  /** Required. A SQL boolean expression that represents the rows defined by this row access policy, similar to the boolean expression in a WHERE clause of a SELECT query on a table. References to other tables, routines, and temporary functions are not supported. Examples: region="EU" date_field = CAST('2019-9-27' as DATE) nullable_field is not NULL numeric_field BETWEEN 1.0 AND 5.0 */
  filterPredicate?: string;
  /** Optional. Input only. The optional list of iam_member users or groups that specifies the initial members that the row-level access policy should be created with. grantees types: - "user:alice@example.com": An email address that represents a specific Google account. - "serviceAccount:my-other-app@appspot.gserviceaccount.com": An email address that represents a service account. - "group:admins@example.com": An email address that represents a Google group. - "domain:example.com":The Google Workspace domain (primary) that represents all the users of that domain. - "allAuthenticatedUsers": A special identifier that represents all service accounts and all users on the internet who have authenticated with a Google Account. This identifier includes accounts that aren't connected to a Google Workspace or Cloud Identity domain, such as personal Gmail accounts. Users who aren't authenticated, such as anonymous visitors, aren't included. - "allUsers":A special identifier that represents anyone who is on the internet, including authenticated and unauthenticated users. Because BigQuery requires authentication before a user can access the service, allUsers includes only authenticated users. */
  grantees?: Array<string>;
  /** Output only. A hash of this resource. */
  etag?: string;
  /** Output only. The time when this row access policy was last modified, in milliseconds since the epoch. */
  lastModifiedTime?: string;
}

export const RowAccessPolicy: Schema.Schema<RowAccessPolicy> = Schema.suspend(() => Schema.Struct({
  rowAccessPolicyReference: Schema.optional(RowAccessPolicyReference),
  creationTime: Schema.optional(Schema.String),
  filterPredicate: Schema.optional(Schema.String),
  grantees: Schema.optional(Schema.Array(Schema.String)),
  etag: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
})).annotate({ identifier: "RowAccessPolicy" }) as any as Schema.Schema<RowAccessPolicy>;

export interface ListRowAccessPoliciesResponse {
  /** Row access policies on the requested table. */
  rowAccessPolicies?: Array<RowAccessPolicy>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListRowAccessPoliciesResponse: Schema.Schema<ListRowAccessPoliciesResponse> = Schema.suspend(() => Schema.Struct({
  rowAccessPolicies: Schema.optional(Schema.Array(RowAccessPolicy)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListRowAccessPoliciesResponse" }) as any as Schema.Schema<ListRowAccessPoliciesResponse>;

export interface Argument {
  /** Optional. Defaults to FIXED_TYPE. */
  argumentKind?: "ARGUMENT_KIND_UNSPECIFIED" | "FIXED_TYPE" | "ANY_TYPE" | (string & {});
  /** Optional. Whether the argument is an aggregate function parameter. Must be Unset for routine types other than AGGREGATE_FUNCTION. For AGGREGATE_FUNCTION, if set to false, it is equivalent to adding "NOT AGGREGATE" clause in DDL; Otherwise, it is equivalent to omitting "NOT AGGREGATE" clause in DDL. */
  isAggregate?: boolean;
  /** Optional. The name of this argument. Can be absent for function return argument. */
  name?: string;
  /** Set if argument_kind == FIXED_TYPE. */
  dataType?: StandardSqlDataType;
  /** Optional. Specifies whether the argument is input or output. Can be set for procedures only. */
  mode?: "MODE_UNSPECIFIED" | "IN" | "OUT" | "INOUT" | (string & {});
}

export const Argument: Schema.Schema<Argument> = Schema.suspend(() => Schema.Struct({
  argumentKind: Schema.optional(Schema.String),
  isAggregate: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  dataType: Schema.optional(StandardSqlDataType),
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "Argument" }) as any as Schema.Schema<Argument>;

export interface ExternalRuntimeOptions {
  /** Optional. Amount of memory provisioned for a Python UDF container instance. Format: {number}{unit} where unit is one of "M", "G", "Mi" and "Gi" (e.g. 1G, 512Mi). If not specified, the default value is 512Mi. For more information, see [Configure container limits for Python UDFs](https://cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits) */
  containerMemory?: string;
  /** Optional. Amount of CPU provisioned for a Python UDF container instance. For more information, see [Configure container limits for Python UDFs](https://cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits) */
  containerCpu?: number;
  /** Optional. Language runtime version. Example: `python-3.11`. */
  runtimeVersion?: string;
  /** Optional. Fully qualified name of the connection whose service account will be used to execute the code in the container. Format: ```"projects/{project_id}/locations/{location_id}/connections/{connection_id}"``` */
  runtimeConnection?: string;
  /** Optional. Maximum number of rows in each batch sent to the external runtime. If absent or if 0, BigQuery dynamically decides the number of rows in a batch. */
  maxBatchingRows?: string;
}

export const ExternalRuntimeOptions: Schema.Schema<ExternalRuntimeOptions> = Schema.suspend(() => Schema.Struct({
  containerMemory: Schema.optional(Schema.String),
  containerCpu: Schema.optional(Schema.Number),
  runtimeVersion: Schema.optional(Schema.String),
  runtimeConnection: Schema.optional(Schema.String),
  maxBatchingRows: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalRuntimeOptions" }) as any as Schema.Schema<ExternalRuntimeOptions>;

export interface StandardSqlTableType {
  /** The columns in this table type */
  columns?: Array<StandardSqlField>;
}

export const StandardSqlTableType: Schema.Schema<StandardSqlTableType> = Schema.suspend(() => Schema.Struct({
  columns: Schema.optional(Schema.Array(StandardSqlField)),
})).annotate({ identifier: "StandardSqlTableType" }) as any as Schema.Schema<StandardSqlTableType>;

export interface RemoteFunctionOptions {
  /** Fully qualified name of the user-provided connection object which holds the authentication information to send requests to the remote service. Format: ```"projects/{projectId}/locations/{locationId}/connections/{connectionId}"``` */
  connection?: string;
  /** Max number of rows in each batch sent to the remote service. If absent or if 0, BigQuery dynamically decides the number of rows in a batch. */
  maxBatchingRows?: string;
  /** Endpoint of the user-provided remote service, e.g. ```https://us-east1-my_gcf_project.cloudfunctions.net/remote_add``` */
  endpoint?: string;
  /** User-defined context as a set of key/value pairs, which will be sent as function invocation context together with batched arguments in the requests to the remote service. The total number of bytes of keys and values must be less than 8KB. */
  userDefinedContext?: Record<string, string>;
}

export const RemoteFunctionOptions: Schema.Schema<RemoteFunctionOptions> = Schema.suspend(() => Schema.Struct({
  connection: Schema.optional(Schema.String),
  maxBatchingRows: Schema.optional(Schema.String),
  endpoint: Schema.optional(Schema.String),
  userDefinedContext: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "RemoteFunctionOptions" }) as any as Schema.Schema<RemoteFunctionOptions>;

export interface PythonOptions {
  /** Optional. A list of Python package names along with versions to be installed. Example: ["pandas>=2.1", "google-cloud-translate==3.11"]. For more information, see [Use third-party packages](https://cloud.google.com/bigquery/docs/user-defined-functions-python#third-party-packages). */
  packages?: Array<string>;
  /** Required. The name of the function defined in Python code as the entry point when the Python UDF is invoked. */
  entryPoint?: string;
}

export const PythonOptions: Schema.Schema<PythonOptions> = Schema.suspend(() => Schema.Struct({
  packages: Schema.optional(Schema.Array(Schema.String)),
  entryPoint: Schema.optional(Schema.String),
})).annotate({ identifier: "PythonOptions" }) as any as Schema.Schema<PythonOptions>;

export interface Routine {
  /** Optional if language = "SQL"; required otherwise. Cannot be set if routine_type = "TABLE_VALUED_FUNCTION". If absent, the return type is inferred from definition_body at query time in each query that references this routine. If present, then the evaluated result will be cast to the specified returned type at query time. For example, for the functions created with the following statements: * `CREATE FUNCTION Add(x FLOAT64, y FLOAT64) RETURNS FLOAT64 AS (x + y);` * `CREATE FUNCTION Increment(x FLOAT64) AS (Add(x, 1));` * `CREATE FUNCTION Decrement(x FLOAT64) RETURNS FLOAT64 AS (Add(x, -1));` The return_type is `{type_kind: "FLOAT64"}` for `Add` and `Decrement`, and is absent for `Increment` (inferred as FLOAT64 at query time). Suppose the function `Add` is replaced by `CREATE OR REPLACE FUNCTION Add(x INT64, y INT64) AS (x + y);` Then the inferred return type of `Increment` is automatically changed to INT64 at query time, while the return type of `Decrement` remains FLOAT64. */
  returnType?: StandardSqlDataType;
  /** Optional. Spark specific options. */
  sparkOptions?: SparkOptions;
  /** Optional. */
  arguments?: Array<Argument>;
  /** Optional. Options for the runtime of the external system executing the routine. This field is only applicable for Python UDFs. [Preview](https://cloud.google.com/products/#product-launch-stages) */
  externalRuntimeOptions?: ExternalRuntimeOptions;
  /** Optional. The description of the routine, if defined. */
  description?: string;
  /** Optional. Can be set only if routine_type = "TABLE_VALUED_FUNCTION". If absent, the return table type is inferred from definition_body at query time in each query that references this routine. If present, then the columns in the evaluated table result will be cast to match the column types specified in return table type, at query time. */
  returnTableType?: StandardSqlTableType;
  /** Optional. The security mode of the routine, if defined. If not defined, the security mode is automatically determined from the routine's configuration. */
  securityMode?: "SECURITY_MODE_UNSPECIFIED" | "DEFINER" | "INVOKER" | (string & {});
  /** Required. The body of the routine. For functions, this is the expression in the AS clause. If `language = "SQL"`, it is the substring inside (but excluding) the parentheses. For example, for the function created with the following statement: `CREATE FUNCTION JoinLines(x string, y string) as (concat(x, "\n", y))` The definition_body is `concat(x, "\n", y)` (\n is not replaced with linebreak). If `language="JAVASCRIPT"`, it is the evaluated string in the AS clause. For example, for the function created with the following statement: `CREATE FUNCTION f() RETURNS STRING LANGUAGE js AS 'return "\n";\n'` The definition_body is `return "\n";\n` Note that both \n are replaced with linebreaks. If `definition_body` references another routine, then that routine must be fully qualified with its project ID. */
  definitionBody?: string;
  /** Optional. Defaults to "SQL" if remote_function_options field is absent, not set otherwise. */
  language?: "LANGUAGE_UNSPECIFIED" | "SQL" | "JAVASCRIPT" | "PYTHON" | "JAVA" | "SCALA" | (string & {});
  /** Optional. Remote function specific options. */
  remoteFunctionOptions?: RemoteFunctionOptions;
  /** Required. Reference describing the ID of this routine. */
  routineReference?: RoutineReference;
  /** Optional. If set to `DATA_MASKING`, the function is validated and made available as a masking function. For more information, see [Create custom masking routines](https://cloud.google.com/bigquery/docs/user-defined-functions#custom-mask). */
  dataGovernanceType?: "DATA_GOVERNANCE_TYPE_UNSPECIFIED" | "DATA_MASKING" | (string & {});
  /** Output only. A hash of this resource. */
  etag?: string;
  /** Output only. The time when this routine was created, in milliseconds since the epoch. */
  creationTime?: string;
  /** Optional. Options for the Python UDF. [Preview](https://cloud.google.com/products/#product-launch-stages) */
  pythonOptions?: PythonOptions;
  /** Output only. The time when this routine was last modified, in milliseconds since the epoch. */
  lastModifiedTime?: string;
  /** Required. The type of routine. */
  routineType?: "ROUTINE_TYPE_UNSPECIFIED" | "SCALAR_FUNCTION" | "PROCEDURE" | "TABLE_VALUED_FUNCTION" | "AGGREGATE_FUNCTION" | (string & {});
  /** Optional. The determinism level of the JavaScript UDF, if defined. */
  determinismLevel?: "DETERMINISM_LEVEL_UNSPECIFIED" | "DETERMINISTIC" | "NOT_DETERMINISTIC" | (string & {});
  /** Optional. Use this option to catch many common errors. Error checking is not exhaustive, and successfully creating a procedure doesn't guarantee that the procedure will successfully execute at runtime. If `strictMode` is set to `TRUE`, the procedure body is further checked for errors such as non-existent tables or columns. The `CREATE PROCEDURE` statement fails if the body fails any of these checks. If `strictMode` is set to `FALSE`, the procedure body is checked only for syntax. For procedures that invoke themselves recursively, specify `strictMode=FALSE` to avoid non-existent procedure errors during validation. Default value is `TRUE`. */
  strictMode?: boolean;
  /** Optional. If language = "JAVASCRIPT", this field stores the path of the imported JAVASCRIPT libraries. */
  importedLibraries?: Array<string>;
}

export const Routine: Schema.Schema<Routine> = Schema.suspend(() => Schema.Struct({
  returnType: Schema.optional(StandardSqlDataType),
  sparkOptions: Schema.optional(SparkOptions),
  arguments: Schema.optional(Schema.Array(Argument)),
  externalRuntimeOptions: Schema.optional(ExternalRuntimeOptions),
  description: Schema.optional(Schema.String),
  returnTableType: Schema.optional(StandardSqlTableType),
  securityMode: Schema.optional(Schema.String),
  definitionBody: Schema.optional(Schema.String),
  language: Schema.optional(Schema.String),
  remoteFunctionOptions: Schema.optional(RemoteFunctionOptions),
  routineReference: Schema.optional(RoutineReference),
  dataGovernanceType: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  pythonOptions: Schema.optional(PythonOptions),
  lastModifiedTime: Schema.optional(Schema.String),
  routineType: Schema.optional(Schema.String),
  determinismLevel: Schema.optional(Schema.String),
  strictMode: Schema.optional(Schema.Boolean),
  importedLibraries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Routine" }) as any as Schema.Schema<Routine>;

export interface ListRoutinesResponse {
  /** A token to request the next page of results. */
  nextPageToken?: string;
  /** Routines in the requested dataset. Unless read_mask is set in the request, only the following fields are populated: etag, project_id, dataset_id, routine_id, routine_type, creation_time, last_modified_time, language, and remote_function_options. */
  routines?: Array<Routine>;
}

export const ListRoutinesResponse: Schema.Schema<ListRoutinesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  routines: Schema.optional(Schema.Array(Routine)),
})).annotate({ identifier: "ListRoutinesResponse" }) as any as Schema.Schema<ListRoutinesResponse>;

export interface BqmlIterationResult {
  /** Deprecated. */
  learnRate?: number;
  /** Deprecated. */
  evalLoss?: number;
  /** Deprecated. */
  durationMs?: string;
  /** Deprecated. */
  trainingLoss?: number;
  /** Deprecated. */
  index?: number;
}

export const BqmlIterationResult: Schema.Schema<BqmlIterationResult> = Schema.suspend(() => Schema.Struct({
  learnRate: Schema.optional(Schema.Number),
  evalLoss: Schema.optional(Schema.Number),
  durationMs: Schema.optional(Schema.String),
  trainingLoss: Schema.optional(Schema.Number),
  index: Schema.optional(Schema.Number),
})).annotate({ identifier: "BqmlIterationResult" }) as any as Schema.Schema<BqmlIterationResult>;

export interface BqmlTrainingRun {
  /** Deprecated. */
  startTime?: string;
  /** Deprecated. */
  iterationResults?: Array<BqmlIterationResult>;
  /** Deprecated. */
  state?: string;
  /** Deprecated. */
  trainingOptions?: { lineSearchInitLearnRate?: number; learnRateStrategy?: string; minRelProgress?: number; maxIteration?: string; l2Reg?: number; learnRate?: number; l1Reg?: number; warmStart?: boolean; earlyStop?: boolean };
}

export const BqmlTrainingRun: Schema.Schema<BqmlTrainingRun> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  iterationResults: Schema.optional(Schema.Array(BqmlIterationResult)),
  state: Schema.optional(Schema.String),
  trainingOptions: Schema.optional(Schema.Struct({ lineSearchInitLearnRate: Schema.optional(Schema.Number), learnRateStrategy: Schema.optional(Schema.String), minRelProgress: Schema.optional(Schema.Number), maxIteration: Schema.optional(Schema.String), l2Reg: Schema.optional(Schema.Number), learnRate: Schema.optional(Schema.Number), l1Reg: Schema.optional(Schema.Number), warmStart: Schema.optional(Schema.Boolean), earlyStop: Schema.optional(Schema.Boolean) })),
})).annotate({ identifier: "BqmlTrainingRun" }) as any as Schema.Schema<BqmlTrainingRun>;

export interface ModelDefinition {
  /** Deprecated. */
  modelOptions?: { lossType?: string; modelType?: string; labels?: Array<string> };
  /** Deprecated. */
  trainingRuns?: Array<BqmlTrainingRun>;
}

export const ModelDefinition: Schema.Schema<ModelDefinition> = Schema.suspend(() => Schema.Struct({
  modelOptions: Schema.optional(Schema.Struct({ lossType: Schema.optional(Schema.String), modelType: Schema.optional(Schema.String), labels: Schema.optional(Schema.Array(Schema.String)) })),
  trainingRuns: Schema.optional(Schema.Array(BqmlTrainingRun)),
})).annotate({ identifier: "ModelDefinition" }) as any as Schema.Schema<ModelDefinition>;

export type JsonObject = Record<string, JsonValue>;
export const JsonObject: Schema.Schema<JsonObject> = Schema.Record(Schema.String, JsonValue) as any as Schema.Schema<JsonObject>;

export interface TableDataInsertAllRequest {
  /** Optional. If specified, treats the destination table as a base template, and inserts the rows into an instance table named "{destination}{templateSuffix}". BigQuery will manage creation of the instance table, using the schema of the base template table. See https://cloud.google.com/bigquery/streaming-data-into-bigquery#template-tables for considerations when working with templates tables. */
  templateSuffix?: string;
  /** Optional. Accept rows that contain values that do not match the schema. The unknown values are ignored. Default is false, which treats unknown values as errors. */
  ignoreUnknownValues?: boolean;
  /** Optional. Insert all valid rows of a request, even if invalid rows exist. The default value is false, which causes the entire request to fail if any invalid rows exist. */
  skipInvalidRows?: boolean;
  /** Optional. Unique request trace id. Used for debugging purposes only. It is case-sensitive, limited to up to 36 ASCII characters. A UUID is recommended. */
  traceId?: string;
  /** Optional. The resource type of the response. The value is not checked at the backend. Historically, it has been set to "bigquery#tableDataInsertAllRequest" but you are not required to set it. */
  kind?: string;
  rows?: Array<{ insertId?: string; json?: JsonObject }>;
}

export const TableDataInsertAllRequest: Schema.Schema<TableDataInsertAllRequest> = Schema.suspend(() => Schema.Struct({
  templateSuffix: Schema.optional(Schema.String),
  ignoreUnknownValues: Schema.optional(Schema.Boolean),
  skipInvalidRows: Schema.optional(Schema.Boolean),
  traceId: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
  rows: Schema.optional(Schema.Array(Schema.Struct({ insertId: Schema.optional(Schema.String), json: Schema.optional(JsonObject) }))),
})).annotate({ identifier: "TableDataInsertAllRequest" }) as any as Schema.Schema<TableDataInsertAllRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface DatasetAccessEntry {
  /** The dataset this entry applies to */
  dataset?: DatasetReference;
  /** Which resources in the dataset this entry applies to. Currently, only views are supported, but additional target types may be added in the future. */
  targetTypes?: Array<"TARGET_TYPE_UNSPECIFIED" | "VIEWS" | "ROUTINES" | (string & {})>;
}

export const DatasetAccessEntry: Schema.Schema<DatasetAccessEntry> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(DatasetReference),
  targetTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DatasetAccessEntry" }) as any as Schema.Schema<DatasetAccessEntry>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface ExternalCatalogTableOptions {
  /** Optional. A map of the key-value pairs defining the parameters and properties of the open source table. Corresponds with Hive metastore table parameters. Maximum size of 4MiB. */
  parameters?: Record<string, string>;
  /** Optional. A connection ID that specifies the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or Amazon S3. This connection is needed to read the open source table from BigQuery. The connection_id format must be either `..` or `projects//locations//connections/`. */
  connectionId?: string;
  /** Optional. A storage descriptor containing information about the physical storage of this table. */
  storageDescriptor?: StorageDescriptor;
}

export const ExternalCatalogTableOptions: Schema.Schema<ExternalCatalogTableOptions> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  connectionId: Schema.optional(Schema.String),
  storageDescriptor: Schema.optional(StorageDescriptor),
})).annotate({ identifier: "ExternalCatalogTableOptions" }) as any as Schema.Schema<ExternalCatalogTableOptions>;

export interface TableDataInsertAllResponse {
  /** Returns "bigquery#tableDataInsertAllResponse". */
  kind?: string;
  /** Describes specific errors encountered while processing the request. */
  insertErrors?: Array<{ index?: number; errors?: Array<ErrorProto> }>;
}

export const TableDataInsertAllResponse: Schema.Schema<TableDataInsertAllResponse> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  insertErrors: Schema.optional(Schema.Array(Schema.Struct({ index: Schema.optional(Schema.Number), errors: Schema.optional(Schema.Array(ErrorProto)) }))),
})).annotate({ identifier: "TableDataInsertAllResponse" }) as any as Schema.Schema<TableDataInsertAllResponse>;

export interface LinkedDatasetSource {
  /** The source dataset reference contains project numbers and not project ids. */
  sourceDataset?: DatasetReference;
}

export const LinkedDatasetSource: Schema.Schema<LinkedDatasetSource> = Schema.suspend(() => Schema.Struct({
  sourceDataset: Schema.optional(DatasetReference),
})).annotate({ identifier: "LinkedDatasetSource" }) as any as Schema.Schema<LinkedDatasetSource>;

export interface GetQueryResultsResponse {
  /** Reference to the BigQuery Job that was created to run the query. This field will be present even if the original request timed out, in which case GetQueryResults can be used to read the results once the query has completed. Since this API only returns the first page of results, subsequent pages can be fetched via the same mechanism (GetQueryResults). */
  jobReference?: JobReference;
  /** Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE. */
  numDmlAffectedRows?: string;
  /** An object with as many results as can be contained within the maximum permitted reply size. To get any additional rows, you can call GetQueryResults and specify the jobReference returned above. Present only when the query completes successfully. The REST-based representation of this data leverages a series of JSON f,v objects for indicating fields and values. */
  rows?: Array<TableRow>;
  /** The schema of the results. Present only when the query completes successfully. */
  schema?: TableSchema;
  /** The resource type of the response. */
  kind?: string;
  /** Whether the query has completed or not. If rows or totalRows are present, this will always be true. If this is false, totalRows will not be available. */
  jobComplete?: boolean;
  /** A hash of this response. */
  etag?: string;
  /** The total number of rows in the complete query result set, which can be more than the number of rows in this single page of results. Present only when the query completes successfully. */
  totalRows?: string;
  /** A token used for paging results. When this token is non-empty, it indicates additional results are available. */
  pageToken?: string;
  /** Output only. The first errors or warnings encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has completed or was unsuccessful. For more information about error messages, see [Error messages](https://cloud.google.com/bigquery/docs/error-messages). */
  errors?: Array<ErrorProto>;
  /** Whether the query result was fetched from the query cache. */
  cacheHit?: boolean;
  /** The total number of bytes processed for this query. */
  totalBytesProcessed?: string;
}

export const GetQueryResultsResponse: Schema.Schema<GetQueryResultsResponse> = Schema.suspend(() => Schema.Struct({
  jobReference: Schema.optional(JobReference),
  numDmlAffectedRows: Schema.optional(Schema.String),
  rows: Schema.optional(Schema.Array(TableRow)),
  schema: Schema.optional(TableSchema),
  kind: Schema.optional(Schema.String),
  jobComplete: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
  totalRows: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  errors: Schema.optional(Schema.Array(ErrorProto)),
  cacheHit: Schema.optional(Schema.Boolean),
  totalBytesProcessed: Schema.optional(Schema.String),
})).annotate({ identifier: "GetQueryResultsResponse" }) as any as Schema.Schema<GetQueryResultsResponse>;

export interface ExternalDatasetReference {
  /** Required. The connection id that is used to access the external_source. Format: projects/{project_id}/locations/{location_id}/connections/{connection_id} */
  connection?: string;
  /** Required. External source that backs this dataset. */
  externalSource?: string;
}

export const ExternalDatasetReference: Schema.Schema<ExternalDatasetReference> = Schema.suspend(() => Schema.Struct({
  connection: Schema.optional(Schema.String),
  externalSource: Schema.optional(Schema.String),
})).annotate({ identifier: "ExternalDatasetReference" }) as any as Schema.Schema<ExternalDatasetReference>;

export interface RestrictionConfig {
  /** Output only. Specifies the type of dataset/table restriction. */
  type?: "RESTRICTION_TYPE_UNSPECIFIED" | "RESTRICTED_DATA_EGRESS" | (string & {});
}

export const RestrictionConfig: Schema.Schema<RestrictionConfig> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "RestrictionConfig" }) as any as Schema.Schema<RestrictionConfig>;

export interface Dataset {
  /** Optional. A descriptive name for the dataset. */
  friendlyName?: string;
  /** Optional. Defines the time travel window in hours. The value can be from 48 to 168 hours (2 to 7 days). The default value is 168 hours if this is not set. */
  maxTimeTravelHours?: string;
  /** The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. */
  location?: string;
  /** Optional. The [tags](https://cloud.google.com/bigquery/docs/tags) attached to this dataset. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/environment" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "Production". See [Tag definitions](https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details. */
  resourceTags?: Record<string, string>;
  /** Optional. Reference to a read-only external dataset defined in data catalogs outside of BigQuery. Filled out when the dataset type is EXTERNAL. */
  externalDatasetReference?: ExternalDatasetReference;
  /** The default encryption key for all tables in the dataset. After this property is set, the encryption key of all newly-created tables in the dataset is set to this value unless the table creation request or query explicitly overrides the key. */
  defaultEncryptionConfiguration?: EncryptionConfiguration;
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Output only. The time when this dataset was created, in milliseconds since the epoch. */
  creationTime?: string;
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Optional. Updates storage_billing_model for the dataset. */
  storageBillingModel?: "STORAGE_BILLING_MODEL_UNSPECIFIED" | "LOGICAL" | "PHYSICAL" | (string & {});
  /** Output only. The date when this dataset was last modified, in milliseconds since the epoch. */
  lastModifiedTime?: string;
  /** Optional. Output only. Restriction config for all tables and dataset. If set, restrict certain accesses on the dataset and all its tables based on the config. See [Data egress](https://cloud.google.com/bigquery/docs/analytics-hub-introduction#data_egress) for more details. */
  restrictions?: RestrictionConfig;
  /** Optional. An array of objects that define dataset access for one or more entities. You can set this property when inserting or updating a dataset in order to control who is allowed to access the data. If unspecified at dataset creation time, BigQuery adds default dataset access for the following entities: access.specialGroup: projectReaders; access.role: READER; access.specialGroup: projectWriters; access.role: WRITER; access.specialGroup: projectOwners; access.role: OWNER; access.userByEmail: [dataset creator email]; access.role: OWNER; If you patch a dataset, then this field is overwritten by the patched dataset's access field. To add entities, you must supply the entire existing access array in addition to any new entities that you want to add. */
  access?: Array<{ iamMember?: string; domain?: string; role?: string; specialGroup?: string; view?: TableReference; routine?: RoutineReference; userByEmail?: string; dataset?: DatasetAccessEntry; groupByEmail?: string; condition?: Expr }>;
  /** Output only. A hash of the resource. */
  etag?: string;
  /** Output only. Same as `type` in `ListFormatDataset`. The type of the dataset, one of: * DEFAULT - only accessible by owner and authorized accounts, * PUBLIC - accessible by everyone, * LINKED - linked dataset, * EXTERNAL - dataset with definition in external metadata catalog. */
  type?: string;
  /** Optional. TRUE if the dataset and its table names are case-insensitive, otherwise FALSE. By default, this is FALSE, which means the dataset and its table names are case-sensitive. This field does not affect routine references. */
  isCaseInsensitive?: boolean;
  /** Optional. Defines the default rounding mode specification of new tables created within this dataset. During table creation, if this field is specified, the table within this dataset will inherit the default rounding mode of the dataset. Setting the default rounding mode on a table overrides this option. Existing tables in the dataset are unaffected. If columns are defined during that table creation, they will immediately inherit the table's default rounding mode, unless otherwise specified. */
  defaultRoundingMode?: "ROUNDING_MODE_UNSPECIFIED" | "ROUND_HALF_AWAY_FROM_ZERO" | "ROUND_HALF_EVEN" | (string & {});
  /** Output only. Metadata about the LinkedDataset. Filled out when the dataset type is LINKED. */
  linkedDatasetMetadata?: LinkedDatasetMetadata;
  /** Required. A reference that identifies the dataset. */
  datasetReference?: DatasetReference;
  /** Optional. Defines the default collation specification of future tables created in the dataset. If a table is created in this dataset without table-level default collation, then the table inherits the dataset default collation, which is applied to the string fields that do not have explicit collation specified. A change to this field affects only tables created afterwards, and does not alter the existing tables. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior. */
  defaultCollation?: string;
  /** Output only. The fully-qualified unique name of the dataset in the format projectId:datasetId. The dataset name without the project name is given in the datasetId field. When creating a new dataset, leave this field blank, and instead specify the datasetId field. */
  id?: string;
  /** The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See [Creating and Updating Dataset Labels](https://cloud.google.com/bigquery/docs/creating-managing-labels#creating_and_updating_dataset_labels) for more information. */
  labels?: Record<string, string>;
  /** Output only. The resource type. */
  kind?: string;
  /** Optional. A user-friendly description of the dataset. */
  description?: string;
  /** Optional. Options defining open source compatible datasets living in the BigQuery catalog. Contains metadata of open source database, schema or namespace represented by the current dataset. */
  externalCatalogDatasetOptions?: ExternalCatalogDatasetOptions;
  /** Output only. A URL that can be used to access the resource again. You can use this URL in Get or Update requests to the resource. */
  selfLink?: string;
  /** Optional. The source dataset reference when the dataset is of type LINKED. For all other dataset types it is not set. This field cannot be updated once it is set. Any attempt to update this field using Update and Patch API Operations will be ignored. */
  linkedDatasetSource?: LinkedDatasetSource;
  /** Output only. Tags for the dataset. To provide tags as inputs, use the `resourceTags` field. */
  tags?: Array<{ tagValue?: string; tagKey?: string }>;
  /** Optional. The default lifetime of all tables in the dataset, in milliseconds. The minimum lifetime value is 3600000 milliseconds (one hour). To clear an existing default expiration with a PATCH request, set to 0. Once this property is set, all newly-created tables in the dataset will have an expirationTime property set to the creation time plus the value in this property, and changing the value will only affect new tables, not existing ones. When the expirationTime for a given table is reached, that table will be deleted automatically. If a table's expirationTime is modified or removed before the table expires, or if you provide an explicit expirationTime when creating a table, that value takes precedence over the default expiration time indicated by this property. */
  defaultTableExpirationMs?: string;
  /** This default partition expiration, expressed in milliseconds. When new time-partitioned tables are created in a dataset where this property is set, the table will inherit this value, propagated as the `TimePartitioning.expirationMs` property on the new table. If you set `TimePartitioning.expirationMs` explicitly when creating a table, the `defaultPartitionExpirationMs` of the containing dataset is ignored. When creating a partitioned table, if `defaultPartitionExpirationMs` is set, the `defaultTableExpirationMs` value is ignored and the table will not be inherit a table expiration deadline. */
  defaultPartitionExpirationMs?: string;
}

export const Dataset: Schema.Schema<Dataset> = Schema.suspend(() => Schema.Struct({
  friendlyName: Schema.optional(Schema.String),
  maxTimeTravelHours: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  resourceTags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  externalDatasetReference: Schema.optional(ExternalDatasetReference),
  defaultEncryptionConfiguration: Schema.optional(EncryptionConfiguration),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  creationTime: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  storageBillingModel: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  restrictions: Schema.optional(RestrictionConfig),
  access: Schema.optional(Schema.Array(Schema.Struct({ iamMember: Schema.optional(Schema.String), domain: Schema.optional(Schema.String), role: Schema.optional(Schema.String), specialGroup: Schema.optional(Schema.String), view: Schema.optional(TableReference), routine: Schema.optional(RoutineReference), userByEmail: Schema.optional(Schema.String), dataset: Schema.optional(DatasetAccessEntry), groupByEmail: Schema.optional(Schema.String), condition: Schema.optional(Expr) }))),
  etag: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  isCaseInsensitive: Schema.optional(Schema.Boolean),
  defaultRoundingMode: Schema.optional(Schema.String),
  linkedDatasetMetadata: Schema.optional(LinkedDatasetMetadata),
  datasetReference: Schema.optional(DatasetReference),
  defaultCollation: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kind: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  externalCatalogDatasetOptions: Schema.optional(ExternalCatalogDatasetOptions),
  selfLink: Schema.optional(Schema.String),
  linkedDatasetSource: Schema.optional(LinkedDatasetSource),
  tags: Schema.optional(Schema.Array(Schema.Struct({ tagValue: Schema.optional(Schema.String), tagKey: Schema.optional(Schema.String) }))),
  defaultTableExpirationMs: Schema.optional(Schema.String),
  defaultPartitionExpirationMs: Schema.optional(Schema.String),
})).annotate({ identifier: "Dataset" }) as any as Schema.Schema<Dataset>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface DataFormatOptions {
  /** Optional. Output timestamp as usec int64. Default is false. */
  useInt64Timestamp?: boolean;
  /** Optional. The API output format for a timestamp. This offers more explicit control over the timestamp output format as compared to the existing `use_int64_timestamp` option. */
  timestampOutputFormat?: "TIMESTAMP_OUTPUT_FORMAT_UNSPECIFIED" | "FLOAT64" | "INT64" | "ISO8601_STRING" | (string & {});
}

export const DataFormatOptions: Schema.Schema<DataFormatOptions> = Schema.suspend(() => Schema.Struct({
  useInt64Timestamp: Schema.optional(Schema.Boolean),
  timestampOutputFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "DataFormatOptions" }) as any as Schema.Schema<DataFormatOptions>;

export interface QueryRequest {
  /** Specifies whether to use BigQuery's legacy SQL dialect for this query. The default value is true. If set to false, the query uses BigQuery's [GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql). When useLegacySql is set to false, the value of flattenResults is ignored; query will be run as if flattenResults is false. */
  useLegacySql?: boolean;
  /** Optional. Connection properties which can modify the query behavior. */
  connectionProperties?: Array<ConnectionProperty>;
  /** GoogleSQL only. Set to POSITIONAL to use positional (?) query parameters or to NAMED to use named (@myparam) query parameters in this query. */
  parameterMode?: string;
  /** The geographic location where the job should run. For more information, see how to [specify locations](https://cloud.google.com/bigquery/docs/locations#specify_locations). */
  location?: string;
  /** Optional. The maximum number of rows of data to return per page of results. Setting this flag to a small value such as 1000 and then paging through results might improve reliability when the query result set is large. In addition to this limit, responses are also limited to 10 MB. By default, there is no maximum row count, and only the byte limit applies. */
  maxResults?: number;
  /** Optional. A unique user provided identifier to ensure idempotent behavior for queries. Note that this is different from the job_id. It has the following properties: 1. It is case-sensitive, limited to up to 36 ASCII characters. A UUID is recommended. 2. Read only queries can ignore this token since they are nullipotent by definition. 3. For the purposes of idempotency ensured by the request_id, a request is considered duplicate of another only if they have the same request_id and are actually duplicates. When determining whether a request is a duplicate of another request, all parameters in the request that may affect the result are considered. For example, query, connection_properties, query_parameters, use_legacy_sql are parameters that affect the result and are considered when determining whether a request is a duplicate, but properties like timeout_ms don't affect the result and are thus not considered. Dry run query requests are never considered duplicate of another request. 4. When a duplicate mutating query request is detected, it returns: a. the results of the mutation if it completes successfully within the timeout. b. the running operation if it is still in progress at the end of the timeout. 5. Its lifetime is limited to 15 minutes. In other words, if two requests are sent with the same request_id, but more than 15 minutes apart, idempotency is not guaranteed. */
  requestId?: string;
  /** Optional. Whether to look for the result in the query cache. The query cache is a best-effort cache that will be flushed whenever tables in the query are modified. The default value is true. */
  useQueryCache?: boolean;
  /** Optional. Custom encryption configuration (e.g., Cloud KMS keys) */
  destinationEncryptionConfiguration?: EncryptionConfiguration;
  /** The resource type of the request. */
  kind?: string;
  /** Optional. This is only supported for SELECT query. If set, the query is allowed to write results incrementally to the temporary result table. This may incur a performance penalty. This option cannot be used with Legacy SQL. This feature is not yet available. */
  writeIncrementalResults?: boolean;
  /** Optional. Optional: Specifies the maximum amount of time, in milliseconds, that the client is willing to wait for the query to complete. By default, this limit is 10 seconds (10,000 milliseconds). If the query is complete, the jobComplete field in the response is true. If the query has not yet completed, jobComplete is false. You can request a longer timeout period in the timeoutMs field. However, the call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete. If jobComplete is false, you can continue to wait for the query to complete by calling the getQueryResults method until the jobComplete field in the getQueryResults response is true. */
  timeoutMs?: number;
  /** Optional. Specifies the default datasetId and projectId to assume for any unqualified table names in the query. If not set, all table names in the query string must be qualified in the format 'datasetId.tableId'. */
  defaultDataset?: DatasetReference;
  /** Optional. Output format adjustments. */
  formatOptions?: DataFormatOptions;
  /** Optional. If true, creates a new session using a randomly generated session_id. If false, runs query with an existing session_id passed in ConnectionProperty, otherwise runs query in non-session mode. The session location will be set to QueryRequest.location if it is present, otherwise it's set to the default location based on existing routing logic. */
  createSession?: boolean;
  /** Required. A query string to execute, using Google Standard SQL or legacy SQL syntax. Example: "SELECT COUNT(f1) FROM myProjectId.myDatasetId.myTableId". */
  query?: string;
  /** Optional. The labels associated with this query. Labels can be used to organize and group query jobs. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label keys must start with a letter and each label in the list must have a different key. */
  labels?: Record<string, string>;
  /** Optional. If set to true, BigQuery doesn't run the job. Instead, if the query is valid, BigQuery returns statistics about the job such as how many bytes would be processed. If the query is invalid, an error returns. The default value is false. */
  dryRun?: boolean;
  /** Optional. If not set, jobs are always required. If set, the query request will follow the behavior described JobCreationMode. */
  jobCreationMode?: "JOB_CREATION_MODE_UNSPECIFIED" | "JOB_CREATION_REQUIRED" | "JOB_CREATION_OPTIONAL" | (string & {});
  /** [Optional] Specifies whether the query should be executed as a continuous query. The default value is false. */
  continuous?: boolean;
  /** Optional. Limits the bytes billed for this query. Queries with bytes billed above this limit will fail (without incurring a charge). If unspecified, the project default is used. */
  maximumBytesBilled?: string;
  /** This property is deprecated. */
  preserveNulls?: boolean;
  /** Query parameters for GoogleSQL queries. */
  queryParameters?: Array<QueryParameter>;
  /** Optional. The reservation that jobs.query request would use. User can specify a reservation to execute the job.query. The expected format is `projects/{project}/locations/{location}/reservations/{reservation}`. */
  reservation?: string;
  /** Optional. Job timeout in milliseconds. If this time limit is exceeded, BigQuery will attempt to stop a longer job, but may not always succeed in canceling it before the job completes. For example, a job that takes more than 60 seconds to complete has a better chance of being stopped than a job that takes 10 seconds to complete. This timeout applies to the query even if a job does not need to be created. */
  jobTimeoutMs?: string;
  /** Optional. A target limit on the rate of slot consumption by this query. If set to a value > 0, BigQuery will attempt to limit the rate of slot consumption by this query to keep it below the configured limit, even if the query is eligible for more slots based on fair scheduling. The unused slots will be available for other jobs and queries to use. Note: This feature is not yet generally available. */
  maxSlots?: number;
}

export const QueryRequest: Schema.Schema<QueryRequest> = Schema.suspend(() => Schema.Struct({
  useLegacySql: Schema.optional(Schema.Boolean),
  connectionProperties: Schema.optional(Schema.Array(ConnectionProperty)),
  parameterMode: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  maxResults: Schema.optional(Schema.Number),
  requestId: Schema.optional(Schema.String),
  useQueryCache: Schema.optional(Schema.Boolean),
  destinationEncryptionConfiguration: Schema.optional(EncryptionConfiguration),
  kind: Schema.optional(Schema.String),
  writeIncrementalResults: Schema.optional(Schema.Boolean),
  timeoutMs: Schema.optional(Schema.Number),
  defaultDataset: Schema.optional(DatasetReference),
  formatOptions: Schema.optional(DataFormatOptions),
  createSession: Schema.optional(Schema.Boolean),
  query: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  dryRun: Schema.optional(Schema.Boolean),
  jobCreationMode: Schema.optional(Schema.String),
  continuous: Schema.optional(Schema.Boolean),
  maximumBytesBilled: Schema.optional(Schema.String),
  preserveNulls: Schema.optional(Schema.Boolean),
  queryParameters: Schema.optional(Schema.Array(QueryParameter)),
  reservation: Schema.optional(Schema.String),
  jobTimeoutMs: Schema.optional(Schema.String),
  maxSlots: Schema.optional(Schema.Number),
})).annotate({ identifier: "QueryRequest" }) as any as Schema.Schema<QueryRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TableList {
  /** The type of list. */
  kind?: string;
  /** A token to request the next page of results. */
  nextPageToken?: string;
  /** Tables in the requested dataset. */
  tables?: Array<{ creationTime?: string; view?: { useLegacySql?: boolean; privacyPolicy?: PrivacyPolicy }; rangePartitioning?: RangePartitioning; requirePartitionFilter?: boolean; kind?: string; tableReference?: TableReference; friendlyName?: string; expirationTime?: string; timePartitioning?: TimePartitioning; clustering?: Clustering; id?: string; type?: string; labels?: Record<string, string> }>;
  /** The total number of tables in the dataset. */
  totalItems?: number;
  /** A hash of this page of results. */
  etag?: string;
}

export const TableList: Schema.Schema<TableList> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  tables: Schema.optional(Schema.Array(Schema.Struct({ creationTime: Schema.optional(Schema.String), view: Schema.optional(Schema.Struct({ useLegacySql: Schema.optional(Schema.Boolean), privacyPolicy: Schema.optional(PrivacyPolicy) })), rangePartitioning: Schema.optional(RangePartitioning), requirePartitionFilter: Schema.optional(Schema.Boolean), kind: Schema.optional(Schema.String), tableReference: Schema.optional(TableReference), friendlyName: Schema.optional(Schema.String), expirationTime: Schema.optional(Schema.String), timePartitioning: Schema.optional(TimePartitioning), clustering: Schema.optional(Clustering), id: Schema.optional(Schema.String), type: Schema.optional(Schema.String), labels: Schema.optional(Schema.Record(Schema.String, Schema.String)) }))),
  totalItems: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "TableList" }) as any as Schema.Schema<TableList>;

export interface SnapshotDefinition {
  /** Required. The time at which the base table was snapshot. This value is reported in the JSON response using RFC3339 format. */
  snapshotTime?: string;
  /** Required. Reference describing the ID of the table that was snapshot. */
  baseTableReference?: TableReference;
}

export const SnapshotDefinition: Schema.Schema<SnapshotDefinition> = Schema.suspend(() => Schema.Struct({
  snapshotTime: Schema.optional(Schema.String),
  baseTableReference: Schema.optional(TableReference),
})).annotate({ identifier: "SnapshotDefinition" }) as any as Schema.Schema<SnapshotDefinition>;

export interface MaterializedViewStatus {
  /** Output only. Error result of the last automatic refresh. If present, indicates that the last automatic refresh was unsuccessful. */
  lastRefreshStatus?: ErrorProto;
  /** Output only. Refresh watermark of materialized view. The base tables' data were collected into the materialized view cache until this time. */
  refreshWatermark?: string;
}

export const MaterializedViewStatus: Schema.Schema<MaterializedViewStatus> = Schema.suspend(() => Schema.Struct({
  lastRefreshStatus: Schema.optional(ErrorProto),
  refreshWatermark: Schema.optional(Schema.String),
})).annotate({ identifier: "MaterializedViewStatus" }) as any as Schema.Schema<MaterializedViewStatus>;

export interface BigLakeConfiguration {
  /** Optional. The fully qualified location prefix of the external folder where table data is stored. The '*' wildcard character is not allowed. The URI should be in the format `gs://bucket/path_to_table/` */
  storageUri?: string;
  /** Optional. The file format the table data is stored in. */
  fileFormat?: "FILE_FORMAT_UNSPECIFIED" | "PARQUET" | (string & {});
  /** Optional. The connection specifying the credentials to be used to read and write to external storage, such as Cloud Storage. The connection_id can have the form `{project}.{location}.{connection_id}` or `projects/{project}/locations/{location}/connections/{connection_id}". */
  connectionId?: string;
  /** Optional. The table format the metadata only snapshots are stored in. */
  tableFormat?: "TABLE_FORMAT_UNSPECIFIED" | "ICEBERG" | (string & {});
}

export const BigLakeConfiguration: Schema.Schema<BigLakeConfiguration> = Schema.suspend(() => Schema.Struct({
  storageUri: Schema.optional(Schema.String),
  fileFormat: Schema.optional(Schema.String),
  connectionId: Schema.optional(Schema.String),
  tableFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "BigLakeConfiguration" }) as any as Schema.Schema<BigLakeConfiguration>;

export interface PartitionedColumn {
  /** Required. The name of the partition column. */
  field?: string;
}

export const PartitionedColumn: Schema.Schema<PartitionedColumn> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
})).annotate({ identifier: "PartitionedColumn" }) as any as Schema.Schema<PartitionedColumn>;

export interface PartitioningDefinition {
  /** Optional. Details about each partitioning column. This field is output only for all partitioning types other than metastore partitioned tables. BigQuery native tables only support 1 partitioning column. Other table types may support 0, 1 or more partitioning columns. For metastore partitioned tables, the order must match the definition order in the Hive Metastore, where it must match the physical layout of the table. For example, CREATE TABLE a_table(id BIGINT, name STRING) PARTITIONED BY (city STRING, state STRING). In this case the values must be ['city', 'state'] in that order. */
  partitionedColumn?: Array<PartitionedColumn>;
}

export const PartitioningDefinition: Schema.Schema<PartitioningDefinition> = Schema.suspend(() => Schema.Struct({
  partitionedColumn: Schema.optional(Schema.Array(PartitionedColumn)),
})).annotate({ identifier: "PartitioningDefinition" }) as any as Schema.Schema<PartitioningDefinition>;

export interface Streamingbuffer {
  /** Output only. Contains the timestamp of the oldest entry in the streaming buffer, in milliseconds since the epoch, if the streaming buffer is available. */
  oldestEntryTime?: string;
  /** Output only. A lower-bound estimate of the number of bytes currently in the streaming buffer. */
  estimatedBytes?: string;
  /** Output only. A lower-bound estimate of the number of rows currently in the streaming buffer. */
  estimatedRows?: string;
}

export const Streamingbuffer: Schema.Schema<Streamingbuffer> = Schema.suspend(() => Schema.Struct({
  oldestEntryTime: Schema.optional(Schema.String),
  estimatedBytes: Schema.optional(Schema.String),
  estimatedRows: Schema.optional(Schema.String),
})).annotate({ identifier: "Streamingbuffer" }) as any as Schema.Schema<Streamingbuffer>;

export interface TableReplicationInfo {
  /** Optional. Output only. Replication error that will permanently stopped table replication. */
  replicationError?: ErrorProto;
  /** Optional. Output only. If source is a materialized view, this field signifies the last refresh time of the source. */
  replicatedSourceLastRefreshTime?: string;
  /** Optional. Output only. Replication status of configured replication. */
  replicationStatus?: "REPLICATION_STATUS_UNSPECIFIED" | "ACTIVE" | "SOURCE_DELETED" | "PERMISSION_DENIED" | "UNSUPPORTED_CONFIGURATION" | (string & {});
  /** Optional. Specifies the interval at which the source table is polled for updates. It's Optional. If not specified, default replication interval would be applied. */
  replicationIntervalMs?: string;
  /** Required. Source table reference that is replicated. */
  sourceTable?: TableReference;
}

export const TableReplicationInfo: Schema.Schema<TableReplicationInfo> = Schema.suspend(() => Schema.Struct({
  replicationError: Schema.optional(ErrorProto),
  replicatedSourceLastRefreshTime: Schema.optional(Schema.String),
  replicationStatus: Schema.optional(Schema.String),
  replicationIntervalMs: Schema.optional(Schema.String),
  sourceTable: Schema.optional(TableReference),
})).annotate({ identifier: "TableReplicationInfo" }) as any as Schema.Schema<TableReplicationInfo>;

export interface Table {
  /** Output only. Contains information about the snapshot. This value is set via snapshot creation. */
  snapshotDefinition?: SnapshotDefinition;
  /** Output only. A URL that can be used to access this resource again. */
  selfLink?: string;
  /** Optional. The view definition. */
  view?: ViewDefinition;
  /** Output only. Number of logical bytes that are more than 90 days old. */
  numLongTermLogicalBytes?: string;
  /** Output only. The size of this table in logical bytes, excluding any data in the streaming buffer. */
  numBytes?: string;
  /** Optional. Defines the default collation specification of new STRING fields in the table. During table creation or update, if a STRING field is added to this table without explicit collation specified, then the table inherits the table default collation. A change to this field affects only fields added afterwards, and does not alter the existing fields. The following values are supported: * 'und:ci': undetermined locale, case insensitive. * '': empty string. Default to case-sensitive behavior. */
  defaultCollation?: string;
  /** Required. Reference describing the ID of this table. */
  tableReference?: TableReference;
  /** Optional. The materialized view definition. */
  materializedView?: MaterializedViewDefinition;
  /** Deprecated. */
  model?: ModelDefinition;
  /** Output only. Number of logical bytes that are less than 90 days old. */
  numActiveLogicalBytes?: string;
  /** Optional. Describes the schema of this table. */
  schema?: TableSchema;
  /** Optional. A user-friendly description of this table. */
  description?: string;
  /** Output only. Number of physical bytes less than 90 days old. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. */
  numActivePhysicalBytes?: string;
  /** Optional. The maximum staleness of data that could be returned when the table (or stale MV) is queried. Staleness encoded as a string encoding of sql IntervalValue type. */
  maxStaleness?: string;
  /** Optional. A descriptive name for this table. */
  friendlyName?: string;
  /** If specified, configures time-based partitioning for this table. */
  timePartitioning?: TimePartitioning;
  /** Optional. If set, overrides the default managed table type configured in the dataset. */
  managedTableType?: "MANAGED_TABLE_TYPE_UNSPECIFIED" | "NATIVE" | "BIGLAKE" | (string & {});
  /** Output only. The materialized view status. */
  materializedViewStatus?: MaterializedViewStatus;
  /** Clustering specification for the table. Must be specified with time-based partitioning, data in the table will be first partitioned and subsequently clustered. */
  clustering?: Clustering;
  /** Output only. Total number of logical bytes in the table or materialized view. */
  numTotalLogicalBytes?: string;
  /** Output only. The time when this table was created, in milliseconds since the epoch. */
  creationTime?: string;
  /** Optional. Specifies the configuration of a BigQuery table for Apache Iceberg. */
  biglakeConfiguration?: BigLakeConfiguration;
  /** The type of resource ID. */
  kind?: string;
  /** Output only. The number of logical bytes in the table that are considered "long-term storage". */
  numLongTermBytes?: string;
  /** Output only. The geographic location where the table resides. This value is inherited from the dataset. */
  location?: string;
  /** If specified, configures range partitioning for this table. */
  rangePartitioning?: RangePartitioning;
  /** Custom encryption configuration (e.g., Cloud KMS keys). */
  encryptionConfiguration?: EncryptionConfiguration;
  /** Output only. The physical size of this table in bytes. This also includes storage used for time travel. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. */
  numTotalPhysicalBytes?: string;
  /** Output only. The time when this table was last modified, in milliseconds since the epoch. */
  lastModifiedTime?: string;
  /** Optional. Options defining open source compatible table. */
  externalCatalogTableOptions?: ExternalCatalogTableOptions;
  /** Output only. Number of physical bytes used by time travel storage (deleted or changed data). This data is not kept in real time, and might be delayed by a few seconds to a few minutes. */
  numTimeTravelPhysicalBytes?: string;
  /** Output only. The number of partitions present in the table or materialized view. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. */
  numPartitions?: string;
  /** Optional. Output only. Table references of all replicas currently active on the table. */
  replicas?: Array<TableReference>;
  /** Optional. Output only. Restriction config for table. If set, restrict certain accesses on the table based on the config. See [Data egress](https://cloud.google.com/bigquery/docs/analytics-hub-introduction#data_egress) for more details. */
  restrictions?: RestrictionConfig;
  /** Optional. The partition information for all table formats, including managed partitioned tables, hive partitioned tables, iceberg partitioned, and metastore partitioned tables. This field is only populated for metastore partitioned tables. For other table formats, this is an output only field. */
  partitionDefinition?: PartitioningDefinition;
  /** Output only. Number of physical bytes used by current live data storage. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. */
  numCurrentPhysicalBytes?: string;
  /** Output only. Contains information about the clone. This value is set via the clone operation. */
  cloneDefinition?: CloneDefinition;
  /** Output only. Contains information regarding this table's streaming buffer, if one is present. This field will be absent if the table is not being streamed to or if there is no data in the streaming buffer. */
  streamingBuffer?: Streamingbuffer;
  /** Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. */
  requirePartitionFilter?: boolean;
  /** Output only. The number of rows of data in this table, excluding any data in the streaming buffer. */
  numRows?: string;
  /** [Optional] The tags associated with this table. Tag keys are globally unique. See additional information on [tags](https://cloud.google.com/iam/docs/tags-access-control#definitions). An object containing a list of "key": value pairs. The key is the namespaced friendly name of the tag key, e.g. "12345/environment" where 12345 is parent id. The value is the friendly short name of the tag value, e.g. "production". */
  resourceTags?: Record<string, string>;
  /** Output only. Number of physical bytes more than 90 days old. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. */
  numLongTermPhysicalBytes?: string;
  /** Output only. A hash of this resource. */
  etag?: string;
  /** The labels associated with this table. You can use these to organize and group your tables. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key. */
  labels?: Record<string, string>;
  /** Output only. An opaque ID uniquely identifying the table. */
  id?: string;
  /** Output only. The physical size of this table in bytes. This includes storage used for time travel. */
  numPhysicalBytes?: string;
  /** Optional. The time when this table expires, in milliseconds since the epoch. If not present, the table will persist indefinitely. Expired tables will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created tables. */
  expirationTime?: string;
  /** Optional. Table replication info for table created `AS REPLICA` DDL like: `CREATE MATERIALIZED VIEW mv1 AS REPLICA OF src_mv` */
  tableReplicationInfo?: TableReplicationInfo;
  /** Optional. Describes the data format, location, and other properties of a table stored outside of BigQuery. By defining these properties, the data source can then be queried as if it were a standard BigQuery table. */
  externalDataConfiguration?: ExternalDataConfiguration;
  /** Optional. Tables Primary Key and Foreign Key information */
  tableConstraints?: TableConstraints;
  /** Output only. Describes the table type. The following values are supported: * `TABLE`: A normal BigQuery table. * `VIEW`: A virtual table defined by a SQL query. * `EXTERNAL`: A table that references data stored in an external storage system, such as Google Cloud Storage. * `MATERIALIZED_VIEW`: A precomputed view defined by a SQL query. * `SNAPSHOT`: An immutable BigQuery table that preserves the contents of a base table at a particular time. See additional information on [table snapshots](https://cloud.google.com/bigquery/docs/table-snapshots-intro). The default value is `TABLE`. */
  type?: string;
  /** Optional. Defines the default rounding mode specification of new decimal fields (NUMERIC OR BIGNUMERIC) in the table. During table creation or update, if a decimal field is added to this table without an explicit rounding mode specified, then the field inherits the table default rounding mode. Changing this field doesn't affect existing fields. */
  defaultRoundingMode?: "ROUNDING_MODE_UNSPECIFIED" | "ROUND_HALF_AWAY_FROM_ZERO" | "ROUND_HALF_EVEN" | (string & {});
}

export const Table: Schema.Schema<Table> = Schema.suspend(() => Schema.Struct({
  snapshotDefinition: Schema.optional(SnapshotDefinition),
  selfLink: Schema.optional(Schema.String),
  view: Schema.optional(ViewDefinition),
  numLongTermLogicalBytes: Schema.optional(Schema.String),
  numBytes: Schema.optional(Schema.String),
  defaultCollation: Schema.optional(Schema.String),
  tableReference: Schema.optional(TableReference),
  materializedView: Schema.optional(MaterializedViewDefinition),
  model: Schema.optional(ModelDefinition),
  numActiveLogicalBytes: Schema.optional(Schema.String),
  schema: Schema.optional(TableSchema),
  description: Schema.optional(Schema.String),
  numActivePhysicalBytes: Schema.optional(Schema.String),
  maxStaleness: Schema.optional(Schema.String),
  friendlyName: Schema.optional(Schema.String),
  timePartitioning: Schema.optional(TimePartitioning),
  managedTableType: Schema.optional(Schema.String),
  materializedViewStatus: Schema.optional(MaterializedViewStatus),
  clustering: Schema.optional(Clustering),
  numTotalLogicalBytes: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  biglakeConfiguration: Schema.optional(BigLakeConfiguration),
  kind: Schema.optional(Schema.String),
  numLongTermBytes: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  rangePartitioning: Schema.optional(RangePartitioning),
  encryptionConfiguration: Schema.optional(EncryptionConfiguration),
  numTotalPhysicalBytes: Schema.optional(Schema.String),
  lastModifiedTime: Schema.optional(Schema.String),
  externalCatalogTableOptions: Schema.optional(ExternalCatalogTableOptions),
  numTimeTravelPhysicalBytes: Schema.optional(Schema.String),
  numPartitions: Schema.optional(Schema.String),
  replicas: Schema.optional(Schema.Array(TableReference)),
  restrictions: Schema.optional(RestrictionConfig),
  partitionDefinition: Schema.optional(PartitioningDefinition),
  numCurrentPhysicalBytes: Schema.optional(Schema.String),
  cloneDefinition: Schema.optional(CloneDefinition),
  streamingBuffer: Schema.optional(Streamingbuffer),
  requirePartitionFilter: Schema.optional(Schema.Boolean),
  numRows: Schema.optional(Schema.String),
  resourceTags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  numLongTermPhysicalBytes: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  id: Schema.optional(Schema.String),
  numPhysicalBytes: Schema.optional(Schema.String),
  expirationTime: Schema.optional(Schema.String),
  tableReplicationInfo: Schema.optional(TableReplicationInfo),
  externalDataConfiguration: Schema.optional(ExternalDataConfiguration),
  tableConstraints: Schema.optional(TableConstraints),
  type: Schema.optional(Schema.String),
  defaultRoundingMode: Schema.optional(Schema.String),
})).annotate({ identifier: "Table" }) as any as Schema.Schema<Table>;

export interface JobList {
  /** A token to request the next page of results. */
  nextPageToken?: string;
  /** List of jobs that were requested. */
  jobs?: Array<{ id?: string; state?: string; user_email?: string; errorResult?: ErrorProto; principal_subject?: string; status?: JobStatus; jobReference?: JobReference; configuration?: JobConfiguration; statistics?: JobStatistics; kind?: string }>;
  /** A list of skipped locations that were unreachable. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations. Example: "europe-west5" */
  unreachable?: Array<string>;
  /** A hash of this page of results. */
  etag?: string;
  /** The resource type of the response. */
  kind?: string;
}

export const JobList: Schema.Schema<JobList> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  jobs: Schema.optional(Schema.Array(Schema.Struct({ id: Schema.optional(Schema.String), state: Schema.optional(Schema.String), user_email: Schema.optional(Schema.String), errorResult: Schema.optional(ErrorProto), principal_subject: Schema.optional(Schema.String), status: Schema.optional(JobStatus), jobReference: Schema.optional(JobReference), configuration: Schema.optional(JobConfiguration), statistics: Schema.optional(JobStatistics), kind: Schema.optional(Schema.String) }))),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  etag: Schema.optional(Schema.String),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "JobList" }) as any as Schema.Schema<JobList>;

export interface BatchDeleteRowAccessPoliciesRequest {
  /** If set to true, it deletes the row access policy even if it's the last row access policy on the table and the deletion will widen the access rather narrowing it. */
  force?: boolean;
  /** Required. Policy IDs of the row access policies. */
  policyIds?: Array<string>;
}

export const BatchDeleteRowAccessPoliciesRequest: Schema.Schema<BatchDeleteRowAccessPoliciesRequest> = Schema.suspend(() => Schema.Struct({
  force: Schema.optional(Schema.Boolean),
  policyIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeleteRowAccessPoliciesRequest" }) as any as Schema.Schema<BatchDeleteRowAccessPoliciesRequest>;

export interface DatasetList {
  /** A list of skipped locations that were unreachable. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations. Example: "europe-west5" */
  unreachable?: Array<string>;
  /** A token that can be used to request the next results page. This property is omitted on the final results page. */
  nextPageToken?: string;
  /** Output only. A hash value of the results page. You can use this property to determine if the page has changed since the last request. */
  etag?: string;
  /** An array of the dataset resources in the project. Each resource contains basic information. For full information about a particular dataset resource, use the Datasets: get method. This property is omitted when there are no datasets in the project. */
  datasets?: Array<{ kind?: string; id?: string; externalDatasetReference?: ExternalDatasetReference; datasetReference?: DatasetReference; friendlyName?: string; labels?: Record<string, string>; location?: string }>;
  /** Output only. The resource type. This property always returns the value "bigquery#datasetList" */
  kind?: string;
}

export const DatasetList: Schema.Schema<DatasetList> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  datasets: Schema.optional(Schema.Array(Schema.Struct({ kind: Schema.optional(Schema.String), id: Schema.optional(Schema.String), externalDatasetReference: Schema.optional(ExternalDatasetReference), datasetReference: Schema.optional(DatasetReference), friendlyName: Schema.optional(Schema.String), labels: Schema.optional(Schema.Record(Schema.String, Schema.String)), location: Schema.optional(Schema.String) }))),
  kind: Schema.optional(Schema.String),
})).annotate({ identifier: "DatasetList" }) as any as Schema.Schema<DatasetList>;

export interface TableDataList {
  /** Total rows of the entire table. In order to show default value 0 we have to present it as string. */
  totalRows?: string;
  /** A hash of this page of results. */
  etag?: string;
  /** Rows of results. */
  rows?: Array<TableRow>;
  /** The resource type of the response. */
  kind?: string;
  /** A token used for paging results. Providing this token instead of the startIndex parameter can help you retrieve stable results when an underlying table is changing. */
  pageToken?: string;
}

export const TableDataList: Schema.Schema<TableDataList> = Schema.suspend(() => Schema.Struct({
  totalRows: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  rows: Schema.optional(Schema.Array(TableRow)),
  kind: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "TableDataList" }) as any as Schema.Schema<TableDataList>;

export interface QueryResponse {
  /** Reference to the Job that was created to run the query. This field will be present even if the original request timed out, in which case GetQueryResults can be used to read the results once the query has completed. Since this API only returns the first page of results, subsequent pages can be fetched via the same mechanism (GetQueryResults). If job_creation_mode was set to `JOB_CREATION_OPTIONAL` and the query completes without creating a job, this field will be empty. */
  jobReference?: JobReference;
  /** Auto-generated ID for the query. */
  queryId?: string;
  /** Output only. Number of slot ms the user is actually billed for. */
  totalSlotMs?: string;
  /** Output only. Creation time of this query, in milliseconds since the epoch. This field will be present on all queries. */
  creationTime?: string;
  /** Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE. */
  numDmlAffectedRows?: string;
  /** Whether the query has completed or not. If rows or totalRows are present, this will always be true. If this is false, totalRows will not be available. */
  jobComplete?: boolean;
  /** The total number of bytes processed for this query. If this query was a dry run, this is the number of bytes that would be processed if the query were run. */
  totalBytesProcessed?: string;
  /** Optional. The reason why a Job was created. Only relevant when a job_reference is present in the response. If job_reference is not present it will always be unset. */
  jobCreationReason?: JobCreationReason;
  /** Output only. Detailed statistics for DML statements INSERT, UPDATE, DELETE, MERGE or TRUNCATE. */
  dmlStats?: DmlStatistics;
  /** Whether the query result was fetched from the query cache. */
  cacheHit?: boolean;
  /** Output only. The first errors or warnings encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has completed or was unsuccessful. For more information about error messages, see [Error messages](https://cloud.google.com/bigquery/docs/error-messages). */
  errors?: Array<ErrorProto>;
  /** Output only. The geographic location of the query. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations */
  location?: string;
  /** An object with as many results as can be contained within the maximum permitted reply size. To get any additional rows, you can call GetQueryResults and specify the jobReference returned above. */
  rows?: Array<TableRow>;
  /** Output only. End time of this query, in milliseconds since the epoch. This field will be present whenever a query job is in the DONE state. */
  endTime?: string;
  /** Output only. Information of the session if this job is part of one. */
  sessionInfo?: SessionInfo;
  /** The resource type. */
  kind?: string;
  /** The total number of rows in the complete query result set, which can be more than the number of rows in this single page of results. */
  totalRows?: string;
  /** Output only. If the project is configured to use on-demand pricing, then this field contains the total bytes billed for the job. If the project is configured to use flat-rate pricing, then you are not billed for bytes and this field is informational only. */
  totalBytesBilled?: string;
  /** A token used for paging results. A non-empty token indicates that additional results are available. To see additional results, query the [`jobs.getQueryResults`](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/getQueryResults) method. For more information, see [Paging through table data](https://cloud.google.com/bigquery/docs/paging-results). */
  pageToken?: string;
  /** The schema of the results. Present only when the query completes successfully. */
  schema?: TableSchema;
  /** Output only. Start time of this query, in milliseconds since the epoch. This field will be present when the query job transitions from the PENDING state to either RUNNING or DONE. */
  startTime?: string;
}

export const QueryResponse: Schema.Schema<QueryResponse> = Schema.suspend(() => Schema.Struct({
  jobReference: Schema.optional(JobReference),
  queryId: Schema.optional(Schema.String),
  totalSlotMs: Schema.optional(Schema.String),
  creationTime: Schema.optional(Schema.String),
  numDmlAffectedRows: Schema.optional(Schema.String),
  jobComplete: Schema.optional(Schema.Boolean),
  totalBytesProcessed: Schema.optional(Schema.String),
  jobCreationReason: Schema.optional(JobCreationReason),
  dmlStats: Schema.optional(DmlStatistics),
  cacheHit: Schema.optional(Schema.Boolean),
  errors: Schema.optional(Schema.Array(ErrorProto)),
  location: Schema.optional(Schema.String),
  rows: Schema.optional(Schema.Array(TableRow)),
  endTime: Schema.optional(Schema.String),
  sessionInfo: Schema.optional(SessionInfo),
  kind: Schema.optional(Schema.String),
  totalRows: Schema.optional(Schema.String),
  totalBytesBilled: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  schema: Schema.optional(TableSchema),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryResponse" }) as any as Schema.Schema<QueryResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Streams data into BigQuery one record at a time without needing to run a load job. */
export interface InsertAllTabledataRequest {
  /** Required. Project ID of the destination. */
  projectId: string;
  /** Required. Dataset ID of the destination. */
  datasetId: string;
  /** Required. Table ID of the destination. */
  tableId: string;
  /** Request body */
  body?: TableDataInsertAllRequest;
}

export const InsertAllTabledataRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  body: Schema.optional(TableDataInsertAllRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/insertAll", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertAllTabledataRequest>;

export type InsertAllTabledataResponse = TableDataInsertAllResponse;
export const InsertAllTabledataResponse = TableDataInsertAllResponse;

export type InsertAllTabledataError = CommonErrors;

export const insertAllTabledata: API.OperationMethod<InsertAllTabledataRequest, InsertAllTabledataResponse, InsertAllTabledataError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertAllTabledataRequest,
  output: InsertAllTabledataResponse,
  errors: [],
}));

/** List the content of a table in rows. */
export interface ListTabledataRequest {
  /** Subset of fields to return, supports select into sub fields. Example: selected_fields = "a,e.d.f"; */
  selectedFields?: string;
  /** To retrieve the next page of table data, set this field to the string provided in the pageToken field of the response body from your previous call to tabledata.list. */
  pageToken?: string;
  /** Required. Dataset id of the table to list. */
  datasetId: string;
  /** Required. Project id of the table to list. */
  projectId: string;
  /** Optional. Output timestamp as usec int64. Default is false. */
  "formatOptions.useInt64Timestamp"?: boolean;
  /** Start row index of the table. */
  startIndex?: string;
  /** Row limit of the table. */
  maxResults?: number;
  /** Optional. The API output format for a timestamp. This offers more explicit control over the timestamp output format as compared to the existing `use_int64_timestamp` option. */
  "formatOptions.timestampOutputFormat"?: "TIMESTAMP_OUTPUT_FORMAT_UNSPECIFIED" | "FLOAT64" | "INT64" | "ISO8601_STRING" | (string & {});
  /** Required. Table id of the table to list. */
  tableId: string;
}

export const ListTabledataRequest = Schema.Struct({
  selectedFields: Schema.optional(Schema.String).pipe(T.HttpQuery("selectedFields")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  "formatOptions.useInt64Timestamp": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("formatOptions.useInt64Timestamp")),
  startIndex: Schema.optional(Schema.String).pipe(T.HttpQuery("startIndex")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  "formatOptions.timestampOutputFormat": Schema.optional(Schema.String).pipe(T.HttpQuery("formatOptions.timestampOutputFormat")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/data" }),
  svc,
) as unknown as Schema.Schema<ListTabledataRequest>;

export type ListTabledataResponse = TableDataList;
export const ListTabledataResponse = TableDataList;

export type ListTabledataError = CommonErrors;

export const listTabledata: API.OperationMethod<ListTabledataRequest, ListTabledataResponse, ListTabledataError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListTabledataRequest,
  output: ListTabledataResponse,
  errors: [],
}));

/** RPC to get the service account for a project used for interactions with Google Cloud KMS */
export interface GetServiceAccountProjectsRequest {
  /** Required. ID of the project. */
  projectId: string;
}

export const GetServiceAccountProjectsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/serviceAccount" }),
  svc,
) as unknown as Schema.Schema<GetServiceAccountProjectsRequest>;

export type GetServiceAccountProjectsResponse = GetServiceAccountResponse;
export const GetServiceAccountProjectsResponse = GetServiceAccountResponse;

export type GetServiceAccountProjectsError = CommonErrors;

export const getServiceAccountProjects: API.OperationMethod<GetServiceAccountProjectsRequest, GetServiceAccountProjectsResponse, GetServiceAccountProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetServiceAccountProjectsRequest,
  output: GetServiceAccountProjectsResponse,
  errors: [],
}));

/** RPC to list projects to which the user has been granted any project role. Users of this method are encouraged to consider the [Resource Manager](https://cloud.google.com/resource-manager/docs/) API, which provides the underlying data for this method and has more capabilities. */
export interface ListProjectsRequest {
  /** Page token, returned by a previous call, to request the next page of results. If not present, no further pages are present. */
  pageToken?: string;
  /** `maxResults` unset returns all results, up to 50 per page. Additionally, the number of projects in a page may be fewer than `maxResults` because projects are retrieved and then filtered to only projects with the BigQuery API enabled. */
  maxResults?: number;
}

export const ListProjectsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "projects" }),
  svc,
) as unknown as Schema.Schema<ListProjectsRequest>;

export type ListProjectsResponse = ProjectList;
export const ListProjectsResponse = ProjectList;

export type ListProjectsError = CommonErrors;

export const listProjects = API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsTablesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsTablesRequest>;

export type TestIamPermissionsTablesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsTablesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsTablesError = CommonErrors;

export const testIamPermissionsTables: API.OperationMethod<TestIamPermissionsTablesRequest, TestIamPermissionsTablesResponse, TestIamPermissionsTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsTablesRequest,
  output: TestIamPermissionsTablesResponse,
  errors: [],
}));

/** Gets the specified table resource by table ID. This method does not return the data in the table, it only returns the table resource, which describes the structure of this table. */
export interface GetTablesRequest {
  /** Optional. Specifies the view that determines which table information is returned. By default, basic table information and storage statistics (STORAGE_STATS) are returned. */
  view?: "TABLE_METADATA_VIEW_UNSPECIFIED" | "BASIC" | "STORAGE_STATS" | "FULL" | (string & {});
  /** Required. Table ID of the requested table */
  tableId: string;
  /** List of table schema fields to return (comma-separated). If unspecified, all fields are returned. A fieldMask cannot be used here because the fields will automatically be converted from camelCase to snake_case and the conversion will fail if there are underscores. Since these are fields in BigQuery table schemas, underscores are allowed. */
  selectedFields?: string;
  /** Required. Dataset ID of the requested table */
  datasetId: string;
  /** Required. Project ID of the requested table */
  projectId: string;
}

export const GetTablesRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  selectedFields: Schema.optional(Schema.String).pipe(T.HttpQuery("selectedFields")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}" }),
  svc,
) as unknown as Schema.Schema<GetTablesRequest>;

export type GetTablesResponse = Table;
export const GetTablesResponse = Table;

export type GetTablesError = CommonErrors;

export const getTables: API.OperationMethod<GetTablesRequest, GetTablesResponse, GetTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTablesRequest,
  output: GetTablesResponse,
  errors: [],
}));

/** Lists all tables in the specified dataset. Requires the READER dataset role. */
export interface ListTablesRequest {
  /** Required. Dataset ID of the tables to list */
  datasetId: string;
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  maxResults?: number;
  /** Required. Project ID of the tables to list */
  projectId: string;
  /** Page token, returned by a previous call, to request the next page of results */
  pageToken?: string;
}

export const ListTablesRequest = Schema.Struct({
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/tables" }),
  svc,
) as unknown as Schema.Schema<ListTablesRequest>;

export type ListTablesResponse = TableList;
export const ListTablesResponse = TableList;

export type ListTablesError = CommonErrors;

export const listTables = API.makePaginated(() => ({
  input: ListTablesRequest,
  output: ListTablesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyTablesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyTablesRequest>;

export type GetIamPolicyTablesResponse = Policy;
export const GetIamPolicyTablesResponse = Policy;

export type GetIamPolicyTablesError = CommonErrors;

export const getIamPolicyTables: API.OperationMethod<GetIamPolicyTablesRequest, GetIamPolicyTablesResponse, GetIamPolicyTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyTablesRequest,
  output: GetIamPolicyTablesResponse,
  errors: [],
}));

/** Deletes the table specified by tableId from the dataset. If the table contains data, all the data will be deleted. */
export interface DeleteTablesRequest {
  /** Required. Project ID of the table to delete */
  projectId: string;
  /** Required. Dataset ID of the table to delete */
  datasetId: string;
  /** Required. Table ID of the table to delete */
  tableId: string;
}

export const DeleteTablesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
}).pipe(
  T.Http({ method: "DELETE", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTablesRequest>;

export interface DeleteTablesResponse {}
export const DeleteTablesResponse: Schema.Schema<DeleteTablesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteTablesResponse>;

export type DeleteTablesError = CommonErrors;

export const deleteTables: API.OperationMethod<DeleteTablesRequest, DeleteTablesResponse, DeleteTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTablesRequest,
  output: DeleteTablesResponse,
  errors: [],
}));

/** Updates information in an existing table. The update method replaces the entire table resource, whereas the patch method only replaces fields that are provided in the submitted table resource. This method supports RFC5789 patch semantics. */
export interface PatchTablesRequest {
  /** Required. Table ID of the table to update */
  tableId: string;
  /** Optional. When true will autodetect schema, else will keep original schema */
  autodetect_schema?: boolean;
  /** Required. Project ID of the table to update */
  projectId: string;
  /** Required. Dataset ID of the table to update */
  datasetId: string;
  /** Request body */
  body?: Table;
}

export const PatchTablesRequest = Schema.Struct({
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  autodetect_schema: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("autodetect_schema")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  body: Schema.optional(Table).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchTablesRequest>;

export type PatchTablesResponse = Table;
export const PatchTablesResponse = Table;

export type PatchTablesError = CommonErrors;

export const patchTables: API.OperationMethod<PatchTablesRequest, PatchTablesResponse, PatchTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchTablesRequest,
  output: PatchTablesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyTablesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyTablesRequest>;

export type SetIamPolicyTablesResponse = Policy;
export const SetIamPolicyTablesResponse = Policy;

export type SetIamPolicyTablesError = CommonErrors;

export const setIamPolicyTables: API.OperationMethod<SetIamPolicyTablesRequest, SetIamPolicyTablesResponse, SetIamPolicyTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyTablesRequest,
  output: SetIamPolicyTablesResponse,
  errors: [],
}));

/** Updates information in an existing table. The update method replaces the entire Table resource, whereas the patch method only replaces fields that are provided in the submitted Table resource. */
export interface UpdateTablesRequest {
  /** Required. Table ID of the table to update */
  tableId: string;
  /** Required. Project ID of the table to update */
  projectId: string;
  /** Optional. When true will autodetect schema, else will keep original schema */
  autodetect_schema?: boolean;
  /** Required. Dataset ID of the table to update */
  datasetId: string;
  /** Request body */
  body?: Table;
}

export const UpdateTablesRequest = Schema.Struct({
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  autodetect_schema: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("autodetect_schema")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  body: Schema.optional(Table).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateTablesRequest>;

export type UpdateTablesResponse = Table;
export const UpdateTablesResponse = Table;

export type UpdateTablesError = CommonErrors;

export const updateTables: API.OperationMethod<UpdateTablesRequest, UpdateTablesResponse, UpdateTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateTablesRequest,
  output: UpdateTablesResponse,
  errors: [],
}));

/** Creates a new, empty table in the dataset. */
export interface InsertTablesRequest {
  /** Required. Dataset ID of the new table */
  datasetId: string;
  /** Required. Project ID of the new table */
  projectId: string;
  /** Request body */
  body?: Table;
}

export const InsertTablesRequest = Schema.Struct({
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(Table).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertTablesRequest>;

export type InsertTablesResponse = Table;
export const InsertTablesResponse = Table;

export type InsertTablesError = CommonErrors;

export const insertTables: API.OperationMethod<InsertTablesRequest, InsertTablesResponse, InsertTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertTablesRequest,
  output: InsertTablesResponse,
  errors: [],
}));

/** Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. */
export interface UpdateDatasetsRequest {
  /** Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, * Operations updating conditional access policy binding in datasets must specify version 3. Some of the operations are : - Adding a new access policy entry with condition. - Removing an access policy entry with condition. - Updating an access policy entry with condition. * But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM. */
  accessPolicyVersion?: number;
  /** Required. Project ID of the dataset being updated */
  projectId: string;
  /** Optional. Specifies the fields of dataset that update/patch operation is targeting By default, both metadata and ACL fields are updated. */
  updateMode?: "UPDATE_MODE_UNSPECIFIED" | "UPDATE_METADATA" | "UPDATE_ACL" | "UPDATE_FULL" | (string & {});
  /** Required. Dataset ID of the dataset being updated */
  datasetId: string;
  /** Request body */
  body?: Dataset;
}

export const UpdateDatasetsRequest = Schema.Struct({
  accessPolicyVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("accessPolicyVersion")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  updateMode: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMode")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  body: Schema.optional(Dataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "projects/{projectsId}/datasets/{datasetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateDatasetsRequest>;

export type UpdateDatasetsResponse = Dataset;
export const UpdateDatasetsResponse = Dataset;

export type UpdateDatasetsError = CommonErrors;

export const updateDatasets: API.OperationMethod<UpdateDatasetsRequest, UpdateDatasetsResponse, UpdateDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateDatasetsRequest,
  output: UpdateDatasetsResponse,
  errors: [],
}));

/** Returns the dataset specified by datasetID. */
export interface GetDatasetsRequest {
  /** Optional. The version of the access policy schema to fetch. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for conditional access policy binding in datasets must specify version 3. Dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. This field will be mapped to [IAM Policy version] (https://cloud.google.com/iam/docs/policies#versions) and will be used to fetch policy from IAM. If unset or if 0 or 1 value is used for dataset with conditional bindings, access entry with condition will have role string appended by 'withcond' string followed by a hash value. For example : { "access": [ { "role": "roles/bigquery.dataViewer_with_conditionalbinding_7a34awqsda", "userByEmail": "user@example.com", } ] } Please refer https://cloud.google.com/iam/docs/troubleshooting-withcond for more details. */
  accessPolicyVersion?: number;
  /** Required. Dataset ID of the requested dataset */
  datasetId: string;
  /** Required. Project ID of the requested dataset */
  projectId: string;
  /** Optional. Specifies the view that determines which dataset information is returned. By default, metadata and ACL information are returned. */
  datasetView?: "DATASET_VIEW_UNSPECIFIED" | "METADATA" | "ACL" | "FULL" | (string & {});
}

export const GetDatasetsRequest = Schema.Struct({
  accessPolicyVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("accessPolicyVersion")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetView: Schema.optional(Schema.String).pipe(T.HttpQuery("datasetView")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}" }),
  svc,
) as unknown as Schema.Schema<GetDatasetsRequest>;

export type GetDatasetsResponse = Dataset;
export const GetDatasetsResponse = Dataset;

export type GetDatasetsError = CommonErrors;

export const getDatasets: API.OperationMethod<GetDatasetsRequest, GetDatasetsResponse, GetDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDatasetsRequest,
  output: GetDatasetsResponse,
  errors: [],
}));

/** Creates a new empty dataset. */
export interface InsertDatasetsRequest {
  /** Required. Project ID of the new dataset */
  projectId: string;
  /** Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, * Requests with conditional access policy binding in datasets must specify version 3. * But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM. */
  accessPolicyVersion?: number;
  /** Request body */
  body?: Dataset;
}

export const InsertDatasetsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  accessPolicyVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("accessPolicyVersion")),
  body: Schema.optional(Dataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertDatasetsRequest>;

export type InsertDatasetsResponse = Dataset;
export const InsertDatasetsResponse = Dataset;

export type InsertDatasetsError = CommonErrors;

export const insertDatasets: API.OperationMethod<InsertDatasetsRequest, InsertDatasetsResponse, InsertDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertDatasetsRequest,
  output: InsertDatasetsResponse,
  errors: [],
}));

/** Undeletes a dataset which is within time travel window based on datasetId. If a time is specified, the dataset version deleted at that time is undeleted, else the last live version is undeleted. */
export interface UndeleteDatasetsRequest {
  /** Required. Dataset ID of dataset being deleted */
  datasetId: string;
  /** Required. Project ID of the dataset to be undeleted */
  projectId: string;
  /** Request body */
  body?: UndeleteDatasetRequest;
}

export const UndeleteDatasetsRequest = Schema.Struct({
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(UndeleteDatasetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteDatasetsRequest>;

export type UndeleteDatasetsResponse = Dataset;
export const UndeleteDatasetsResponse = Dataset;

export type UndeleteDatasetsError = CommonErrors;

export const undeleteDatasets: API.OperationMethod<UndeleteDatasetsRequest, UndeleteDatasetsResponse, UndeleteDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteDatasetsRequest,
  output: UndeleteDatasetsResponse,
  errors: [],
}));

/** Updates information in an existing dataset. The update method replaces the entire dataset resource, whereas the patch method only replaces fields that are provided in the submitted dataset resource. This method supports RFC5789 patch semantics. */
export interface PatchDatasetsRequest {
  /** Required. Project ID of the dataset being updated */
  projectId: string;
  /** Required. Dataset ID of the dataset being updated */
  datasetId: string;
  /** Optional. The version of the provided access policy schema. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. This version refers to the schema version of the access policy and not the version of access policy. This field's value can be equal or more than the access policy schema provided in the request. For example, * Operations updating conditional access policy binding in datasets must specify version 3. Some of the operations are : - Adding a new access policy entry with condition. - Removing an access policy entry with condition. - Updating an access policy entry with condition. * But dataset with no conditional role bindings in access policy may specify any valid value or leave the field unset. If unset or if 0 or 1 value is used for dataset with conditional bindings, request will be rejected. This field will be mapped to IAM Policy version (https://cloud.google.com/iam/docs/policies#versions) and will be used to set policy in IAM. */
  accessPolicyVersion?: number;
  /** Optional. Specifies the fields of dataset that update/patch operation is targeting By default, both metadata and ACL fields are updated. */
  updateMode?: "UPDATE_MODE_UNSPECIFIED" | "UPDATE_METADATA" | "UPDATE_ACL" | "UPDATE_FULL" | (string & {});
  /** Request body */
  body?: Dataset;
}

export const PatchDatasetsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  accessPolicyVersion: Schema.optional(Schema.Number).pipe(T.HttpQuery("accessPolicyVersion")),
  updateMode: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMode")),
  body: Schema.optional(Dataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "projects/{projectsId}/datasets/{datasetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchDatasetsRequest>;

export type PatchDatasetsResponse = Dataset;
export const PatchDatasetsResponse = Dataset;

export type PatchDatasetsError = CommonErrors;

export const patchDatasets: API.OperationMethod<PatchDatasetsRequest, PatchDatasetsResponse, PatchDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchDatasetsRequest,
  output: PatchDatasetsResponse,
  errors: [],
}));

/** Lists all datasets in the specified project to which the user has been granted the READER dataset role. */
export interface ListDatasetsRequest {
  /** Page token, returned by a previous call, to request the next page of results */
  pageToken?: string;
  /** An expression for filtering the results of the request by label. The syntax is `labels.[:]`. Multiple filters can be AND-ed together by connecting with a space. Example: `labels.department:receiving labels.active`. See [Filtering datasets using labels](https://cloud.google.com/bigquery/docs/filtering-labels#filtering_datasets_using_labels) for details. */
  filter?: string;
  /** Required. Project ID of the datasets to be listed */
  projectId: string;
  /** Whether to list all datasets, including hidden ones */
  all?: boolean;
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  maxResults?: number;
}

export const ListDatasetsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  all: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("all")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets" }),
  svc,
) as unknown as Schema.Schema<ListDatasetsRequest>;

export type ListDatasetsResponse = DatasetList;
export const ListDatasetsResponse = DatasetList;

export type ListDatasetsError = CommonErrors;

export const listDatasets = API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the dataset specified by the datasetId value. Before you can delete a dataset, you must delete all its tables, either manually or by specifying deleteContents. Immediately after deletion, you can create another dataset with the same name. */
export interface DeleteDatasetsRequest {
  /** Required. Project ID of the dataset being deleted */
  projectId: string;
  /** Required. Dataset ID of dataset being deleted */
  datasetId: string;
  /** If True, delete all the tables in the dataset. If False and the dataset contains tables, the request will fail. Default is False */
  deleteContents?: boolean;
}

export const DeleteDatasetsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  deleteContents: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleteContents")),
}).pipe(
  T.Http({ method: "DELETE", path: "projects/{projectsId}/datasets/{datasetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteDatasetsRequest>;

export interface DeleteDatasetsResponse {}
export const DeleteDatasetsResponse: Schema.Schema<DeleteDatasetsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteDatasetsResponse>;

export type DeleteDatasetsError = CommonErrors;

export const deleteDatasets: API.OperationMethod<DeleteDatasetsRequest, DeleteDatasetsResponse, DeleteDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteDatasetsRequest,
  output: DeleteDatasetsResponse,
  errors: [],
}));

/** Lists all row access policies on the specified table. */
export interface ListRowAccessPoliciesRequest {
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Required. Table ID of the table to list row access policies. */
  tableId: string;
  /** Required. Project ID of the row access policies to list. */
  projectId: string;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Required. Dataset ID of row access policies to list. */
  datasetId: string;
}

export const ListRowAccessPoliciesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies" }),
  svc,
) as unknown as Schema.Schema<ListRowAccessPoliciesRequest>;

export type ListRowAccessPoliciesResponse_Op = ListRowAccessPoliciesResponse;
export const ListRowAccessPoliciesResponse_Op = ListRowAccessPoliciesResponse;

export type ListRowAccessPoliciesError = CommonErrors;

export const listRowAccessPolicies = API.makePaginated(() => ({
  input: ListRowAccessPoliciesRequest,
  output: ListRowAccessPoliciesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a row access policy. */
export interface DeleteRowAccessPoliciesRequest {
  /** If set to true, it deletes the row access policy even if it's the last row access policy on the table and the deletion will widen the access rather narrowing it. */
  force?: boolean;
  /** Required. Table ID of the table to delete the row access policy. */
  tableId: string;
  /** Required. Policy ID of the row access policy. */
  policyId: string;
  /** Required. Project ID of the table to delete the row access policy. */
  projectId: string;
  /** Required. Dataset ID of the table to delete the row access policy. */
  datasetId: string;
}

export const DeleteRowAccessPoliciesRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
}).pipe(
  T.Http({ method: "DELETE", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies/{rowAccessPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRowAccessPoliciesRequest>;

export interface DeleteRowAccessPoliciesResponse {}
export const DeleteRowAccessPoliciesResponse: Schema.Schema<DeleteRowAccessPoliciesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteRowAccessPoliciesResponse>;

export type DeleteRowAccessPoliciesError = CommonErrors;

export const deleteRowAccessPolicies: API.OperationMethod<DeleteRowAccessPoliciesRequest, DeleteRowAccessPoliciesResponse, DeleteRowAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRowAccessPoliciesRequest,
  output: DeleteRowAccessPoliciesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsRowAccessPoliciesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsRowAccessPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies/{rowAccessPoliciesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsRowAccessPoliciesRequest>;

export type TestIamPermissionsRowAccessPoliciesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsRowAccessPoliciesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsRowAccessPoliciesError = CommonErrors;

export const testIamPermissionsRowAccessPolicies: API.OperationMethod<TestIamPermissionsRowAccessPoliciesRequest, TestIamPermissionsRowAccessPoliciesResponse, TestIamPermissionsRowAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsRowAccessPoliciesRequest,
  output: TestIamPermissionsRowAccessPoliciesResponse,
  errors: [],
}));

/** Deletes provided row access policies. */
export interface BatchDeleteRowAccessPoliciesRequest_Op {
  /** Required. Project ID of the table to delete the row access policies. */
  projectId: string;
  /** Required. Dataset ID of the table to delete the row access policies. */
  datasetId: string;
  /** Required. Table ID of the table to delete the row access policies. */
  tableId: string;
  /** Request body */
  body?: BatchDeleteRowAccessPoliciesRequest;
}

export const BatchDeleteRowAccessPoliciesRequest_Op = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  body: Schema.optional(BatchDeleteRowAccessPoliciesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteRowAccessPoliciesRequest_Op>;

export interface BatchDeleteRowAccessPoliciesResponse {}
export const BatchDeleteRowAccessPoliciesResponse: Schema.Schema<BatchDeleteRowAccessPoliciesResponse> = Schema.Struct({}) as any as Schema.Schema<BatchDeleteRowAccessPoliciesResponse>;

export type BatchDeleteRowAccessPoliciesError = CommonErrors;

export const batchDeleteRowAccessPolicies: API.OperationMethod<BatchDeleteRowAccessPoliciesRequest_Op, BatchDeleteRowAccessPoliciesResponse, BatchDeleteRowAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteRowAccessPoliciesRequest_Op,
  output: BatchDeleteRowAccessPoliciesResponse,
  errors: [],
}));

/** Creates a row access policy. */
export interface InsertRowAccessPoliciesRequest {
  /** Required. Project ID of the table to get the row access policy. */
  projectId: string;
  /** Required. Dataset ID of the table to get the row access policy. */
  datasetId: string;
  /** Required. Table ID of the table to get the row access policy. */
  tableId: string;
  /** Request body */
  body?: RowAccessPolicy;
}

export const InsertRowAccessPoliciesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  body: Schema.optional(RowAccessPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertRowAccessPoliciesRequest>;

export type InsertRowAccessPoliciesResponse = RowAccessPolicy;
export const InsertRowAccessPoliciesResponse = RowAccessPolicy;

export type InsertRowAccessPoliciesError = CommonErrors;

export const insertRowAccessPolicies: API.OperationMethod<InsertRowAccessPoliciesRequest, InsertRowAccessPoliciesResponse, InsertRowAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertRowAccessPoliciesRequest,
  output: InsertRowAccessPoliciesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyRowAccessPoliciesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyRowAccessPoliciesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies/{rowAccessPoliciesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyRowAccessPoliciesRequest>;

export type GetIamPolicyRowAccessPoliciesResponse = Policy;
export const GetIamPolicyRowAccessPoliciesResponse = Policy;

export type GetIamPolicyRowAccessPoliciesError = CommonErrors;

export const getIamPolicyRowAccessPolicies: API.OperationMethod<GetIamPolicyRowAccessPoliciesRequest, GetIamPolicyRowAccessPoliciesResponse, GetIamPolicyRowAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyRowAccessPoliciesRequest,
  output: GetIamPolicyRowAccessPoliciesResponse,
  errors: [],
}));

/** Updates a row access policy. */
export interface UpdateRowAccessPoliciesRequest {
  /** Required. Policy ID of the row access policy. */
  policyId: string;
  /** Required. Dataset ID of the table to get the row access policy. */
  datasetId: string;
  /** Required. Project ID of the table to get the row access policy. */
  projectId: string;
  /** Required. Table ID of the table to get the row access policy. */
  tableId: string;
  /** Request body */
  body?: RowAccessPolicy;
}

export const UpdateRowAccessPoliciesRequest = Schema.Struct({
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  body: Schema.optional(RowAccessPolicy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies/{rowAccessPoliciesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRowAccessPoliciesRequest>;

export type UpdateRowAccessPoliciesResponse = RowAccessPolicy;
export const UpdateRowAccessPoliciesResponse = RowAccessPolicy;

export type UpdateRowAccessPoliciesError = CommonErrors;

export const updateRowAccessPolicies: API.OperationMethod<UpdateRowAccessPoliciesRequest, UpdateRowAccessPoliciesResponse, UpdateRowAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRowAccessPoliciesRequest,
  output: UpdateRowAccessPoliciesResponse,
  errors: [],
}));

/** Gets the specified row access policy by policy ID. */
export interface GetRowAccessPoliciesRequest {
  /** Required. Table ID of the table to get the row access policy. */
  tableId: string;
  /** Required. Project ID of the table to get the row access policy. */
  projectId: string;
  /** Required. Dataset ID of the table to get the row access policy. */
  datasetId: string;
  /** Required. Policy ID of the row access policy. */
  policyId: string;
}

export const GetRowAccessPoliciesRequest = Schema.Struct({
  tableId: Schema.String.pipe(T.HttpPath("tableId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  policyId: Schema.String.pipe(T.HttpPath("policyId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/tables/{tablesId}/rowAccessPolicies/{rowAccessPoliciesId}" }),
  svc,
) as unknown as Schema.Schema<GetRowAccessPoliciesRequest>;

export type GetRowAccessPoliciesResponse = RowAccessPolicy;
export const GetRowAccessPoliciesResponse = RowAccessPolicy;

export type GetRowAccessPoliciesError = CommonErrors;

export const getRowAccessPolicies: API.OperationMethod<GetRowAccessPoliciesRequest, GetRowAccessPoliciesResponse, GetRowAccessPoliciesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRowAccessPoliciesRequest,
  output: GetRowAccessPoliciesResponse,
  errors: [],
}));

/** Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout. */
export interface QueryJobsRequest {
  /** Required. Project ID of the query request. */
  projectId: string;
  /** Request body */
  body?: QueryRequest;
}

export const QueryJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(QueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/queries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryJobsRequest>;

export type QueryJobsResponse = QueryResponse;
export const QueryJobsResponse = QueryResponse;

export type QueryJobsError = CommonErrors;

export const queryJobs: API.OperationMethod<QueryJobsRequest, QueryJobsResponse, QueryJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryJobsRequest,
  output: QueryJobsResponse,
  errors: [],
}));

/** Returns information about a specific job. Job information is available for a six month period after creation. Requires that you're the person who ran the job, or have the Is Owner project role. */
export interface GetJobsRequest {
  /** Required. Project ID of the requested job. */
  projectId: string;
  /** The geographic location of the job. You must specify the location to run the job for the following scenarios: * If the location to run a job is not in the `us` or the `eu` multi-regional location * If the job's location is in a single region (for example, `us-central1`) For more information, see how to [specify locations](https://cloud.google.com/bigquery/docs/locations#specify_locations). */
  location?: string;
  /** Required. Job ID of the requested job. */
  jobId: string;
}

export const GetJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetJobsRequest>;

export type GetJobsResponse = Job;
export const GetJobsResponse = Job;

export type GetJobsError = CommonErrors;

export const getJobs: API.OperationMethod<GetJobsRequest, GetJobsResponse, GetJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetJobsRequest,
  output: GetJobsResponse,
  errors: [],
}));

/** Starts a new asynchronous job. This API has two different kinds of endpoint URIs, as this method supports a variety of use cases. * The *Metadata* URI is used for most interactions, as it accepts the job configuration directly. * The *Upload* URI is ONLY for the case when you're sending both a load job configuration and a data stream together. In this case, the Upload URI accepts the job configuration and the data as two distinct multipart MIME parts. */
export interface InsertJobsRequest {
  /** Project ID of project that will be billed for the job. */
  projectId: string;
  /** Request body */
  body?: Job;
}

export const InsertJobsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertJobsRequest>;

export type InsertJobsResponse = Job;
export const InsertJobsResponse = Job;

export type InsertJobsError = CommonErrors;

export const insertJobs: API.OperationMethod<InsertJobsRequest, InsertJobsResponse, InsertJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertJobsRequest,
  output: InsertJobsResponse,
  errors: [],
}));

/** RPC to get the results of a query job. */
export interface GetQueryResultsJobsRequest {
  /** The geographic location of the job. You must specify the location to run the job for the following scenarios: * If the location to run a job is not in the `us` or the `eu` multi-regional location * If the job's location is in a single region (for example, `us-central1`) For more information, see how to [specify locations](https://cloud.google.com/bigquery/docs/locations#specify_locations). */
  location?: string;
  /** Required. Project ID of the query job. */
  projectId: string;
  /** Maximum number of results to read. */
  maxResults?: number;
  /** Optional. The API output format for a timestamp. This offers more explicit control over the timestamp output format as compared to the existing `use_int64_timestamp` option. */
  "formatOptions.timestampOutputFormat"?: "TIMESTAMP_OUTPUT_FORMAT_UNSPECIFIED" | "FLOAT64" | "INT64" | "ISO8601_STRING" | (string & {});
  /** Optional: Specifies the maximum amount of time, in milliseconds, that the client is willing to wait for the query to complete. By default, this limit is 10 seconds (10,000 milliseconds). If the query is complete, the jobComplete field in the response is true. If the query has not yet completed, jobComplete is false. You can request a longer timeout period in the timeoutMs field. However, the call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete. If jobComplete is false, you can continue to wait for the query to complete by calling the getQueryResults method until the jobComplete field in the getQueryResults response is true. */
  timeoutMs?: number;
  /** Zero-based index of the starting row. */
  startIndex?: string;
  /** Required. Job ID of the query job. */
  jobId: string;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Optional. Output timestamp as usec int64. Default is false. */
  "formatOptions.useInt64Timestamp"?: boolean;
}

export const GetQueryResultsJobsRequest = Schema.Struct({
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  "formatOptions.timestampOutputFormat": Schema.optional(Schema.String).pipe(T.HttpQuery("formatOptions.timestampOutputFormat")),
  timeoutMs: Schema.optional(Schema.Number).pipe(T.HttpQuery("timeoutMs")),
  startIndex: Schema.optional(Schema.String).pipe(T.HttpQuery("startIndex")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  "formatOptions.useInt64Timestamp": Schema.optional(Schema.Boolean).pipe(T.HttpQuery("formatOptions.useInt64Timestamp")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/queries/{queriesId}" }),
  svc,
) as unknown as Schema.Schema<GetQueryResultsJobsRequest>;

export type GetQueryResultsJobsResponse = GetQueryResultsResponse;
export const GetQueryResultsJobsResponse = GetQueryResultsResponse;

export type GetQueryResultsJobsError = CommonErrors;

export const getQueryResultsJobs: API.OperationMethod<GetQueryResultsJobsRequest, GetQueryResultsJobsResponse, GetQueryResultsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetQueryResultsJobsRequest,
  output: GetQueryResultsJobsResponse,
  errors: [],
}));

/** Requests that a job be cancelled. This call will return immediately, and the client will need to poll for the job status to see if the cancel completed successfully. Cancelled jobs may still incur costs. */
export interface CancelJobsRequest {
  /** The geographic location of the job. You must [specify the location](https://cloud.google.com/bigquery/docs/locations#specify_locations) to run the job for the following scenarios: * If the location to run a job is not in the `us` or the `eu` multi-regional location * If the job's location is in a single region (for example, `us-central1`) */
  location?: string;
  /** Required. Project ID of the job to cancel */
  projectId: string;
  /** Required. Job ID of the job to cancel */
  jobId: string;
}

export const CancelJobsRequest = Schema.Struct({
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/jobs/{jobsId}/cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelJobsRequest>;

export type CancelJobsResponse = JobCancelResponse;
export const CancelJobsResponse = JobCancelResponse;

export type CancelJobsError = CommonErrors;

export const cancelJobs: API.OperationMethod<CancelJobsRequest, CancelJobsResponse, CancelJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelJobsRequest,
  output: CancelJobsResponse,
  errors: [],
}));

/** Requests the deletion of the metadata of a job. This call returns when the job's metadata is deleted. */
export interface DeleteJobsRequest {
  /** Required. Job ID of the job for which metadata is to be deleted. If this is a parent job which has child jobs, the metadata from all child jobs will be deleted as well. Direct deletion of the metadata of child jobs is not allowed. */
  jobId: string;
  /** The geographic location of the job. Required. For more information, see how to [specify locations](https://cloud.google.com/bigquery/docs/locations#specify_locations). */
  location?: string;
  /** Required. Project ID of the job for which metadata is to be deleted. */
  projectId: string;
}

export const DeleteJobsRequest = Schema.Struct({
  jobId: Schema.String.pipe(T.HttpPath("jobId")),
  location: Schema.optional(Schema.String).pipe(T.HttpQuery("location")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "DELETE", path: "projects/{projectsId}/jobs/{jobsId}/delete" }),
  svc,
) as unknown as Schema.Schema<DeleteJobsRequest>;

export interface DeleteJobsResponse {}
export const DeleteJobsResponse: Schema.Schema<DeleteJobsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteJobsResponse>;

export type DeleteJobsError = CommonErrors;

export const deleteJobs: API.OperationMethod<DeleteJobsRequest, DeleteJobsResponse, DeleteJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteJobsRequest,
  output: DeleteJobsResponse,
  errors: [],
}));

/** Lists all jobs that you started in the specified project. Job information is available for a six month period after creation. The job list is sorted in reverse chronological order, by job creation time. Requires the Can View project role, or the Is Owner project role if you set the allUsers property. */
export interface ListJobsRequest {
  /** Min value for job creation time, in milliseconds since the POSIX epoch. If set, only jobs created after or at this timestamp are returned. */
  minCreationTime?: string;
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  maxResults?: number;
  /** Restrict information returned to a set of selected fields */
  projection?: "full" | "minimal" | (string & {});
  /** Whether to display jobs owned by all users in the project. Default False. */
  allUsers?: boolean;
  /** Project ID of the jobs to list. */
  projectId: string;
  /** If set, show only child jobs of the specified parent. Otherwise, show all top-level jobs. */
  parentJobId?: string;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Max value for job creation time, in milliseconds since the POSIX epoch. If set, only jobs created before or at this timestamp are returned. */
  maxCreationTime?: string;
  /** Filter for job state */
  stateFilter?: "done" | "pending" | "running" | (string & {})[];
}

export const ListJobsRequest = Schema.Struct({
  minCreationTime: Schema.optional(Schema.String).pipe(T.HttpQuery("minCreationTime")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  projection: Schema.optional(Schema.String).pipe(T.HttpQuery("projection")),
  allUsers: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allUsers")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  parentJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("parentJobId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxCreationTime: Schema.optional(Schema.String).pipe(T.HttpQuery("maxCreationTime")),
  stateFilter: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("stateFilter")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListJobsRequest>;

export type ListJobsResponse = JobList;
export const ListJobsResponse = JobList;

export type ListJobsError = CommonErrors;

export const listJobs = API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified model resource by model ID. */
export interface GetModelsRequest {
  /** Required. Project ID of the requested model. */
  projectId: string;
  /** Required. Dataset ID of the requested model. */
  datasetId: string;
  /** Required. Model ID of the requested model. */
  modelId: string;
}

export const GetModelsRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  modelId: Schema.String.pipe(T.HttpPath("modelId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<GetModelsRequest>;

export type GetModelsResponse = Model;
export const GetModelsResponse = Model;

export type GetModelsError = CommonErrors;

export const getModels: API.OperationMethod<GetModelsRequest, GetModelsResponse, GetModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetModelsRequest,
  output: GetModelsResponse,
  errors: [],
}));

/** Deletes the model specified by modelId from the dataset. */
export interface DeleteModelsRequest {
  /** Required. Model ID of the model to delete. */
  modelId: string;
  /** Required. Project ID of the model to delete. */
  projectId: string;
  /** Required. Dataset ID of the model to delete. */
  datasetId: string;
}

export const DeleteModelsRequest = Schema.Struct({
  modelId: Schema.String.pipe(T.HttpPath("modelId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
}).pipe(
  T.Http({ method: "DELETE", path: "projects/{projectsId}/datasets/{datasetsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteModelsRequest>;

export interface DeleteModelsResponse {}
export const DeleteModelsResponse: Schema.Schema<DeleteModelsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteModelsResponse>;

export type DeleteModelsError = CommonErrors;

export const deleteModels: API.OperationMethod<DeleteModelsRequest, DeleteModelsResponse, DeleteModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteModelsRequest,
  output: DeleteModelsResponse,
  errors: [],
}));

/** Lists all models in the specified dataset. Requires the READER dataset role. After retrieving the list of models, you can get information about a particular model by calling the models.get method. */
export interface ListModelsRequest {
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  maxResults?: number;
  /** Required. Project ID of the models to list. */
  projectId: string;
  /** Required. Dataset ID of the models to list. */
  datasetId: string;
  /** Page token, returned by a previous call to request the next page of results */
  pageToken?: string;
}

export const ListModelsRequest = Schema.Struct({
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/models" }),
  svc,
) as unknown as Schema.Schema<ListModelsRequest>;

export type ListModelsResponse_Op = ListModelsResponse;
export const ListModelsResponse_Op = ListModelsResponse;

export type ListModelsError = CommonErrors;

export const listModels = API.makePaginated(() => ({
  input: ListModelsRequest,
  output: ListModelsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Patch specific fields in the specified model. */
export interface PatchModelsRequest {
  /** Required. Model ID of the model to patch. */
  modelId: string;
  /** Required. Dataset ID of the model to patch. */
  datasetId: string;
  /** Required. Project ID of the model to patch. */
  projectId: string;
  /** Request body */
  body?: Model;
}

export const PatchModelsRequest = Schema.Struct({
  modelId: Schema.String.pipe(T.HttpPath("modelId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  body: Schema.optional(Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "projects/{projectsId}/datasets/{datasetsId}/models/{modelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchModelsRequest>;

export type PatchModelsResponse = Model;
export const PatchModelsResponse = Model;

export type PatchModelsError = CommonErrors;

export const patchModels: API.OperationMethod<PatchModelsRequest, PatchModelsResponse, PatchModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchModelsRequest,
  output: PatchModelsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyRoutinesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyRoutinesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyRoutinesRequest>;

export type GetIamPolicyRoutinesResponse = Policy;
export const GetIamPolicyRoutinesResponse = Policy;

export type GetIamPolicyRoutinesError = CommonErrors;

export const getIamPolicyRoutines: API.OperationMethod<GetIamPolicyRoutinesRequest, GetIamPolicyRoutinesResponse, GetIamPolicyRoutinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyRoutinesRequest,
  output: GetIamPolicyRoutinesResponse,
  errors: [],
}));

/** Creates a new routine in the dataset. */
export interface InsertRoutinesRequest {
  /** Required. Project ID of the new routine */
  projectId: string;
  /** Required. Dataset ID of the new routine */
  datasetId: string;
  /** Request body */
  body?: Routine;
}

export const InsertRoutinesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  body: Schema.optional(Routine).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/routines", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertRoutinesRequest>;

export type InsertRoutinesResponse = Routine;
export const InsertRoutinesResponse = Routine;

export type InsertRoutinesError = CommonErrors;

export const insertRoutines: API.OperationMethod<InsertRoutinesRequest, InsertRoutinesResponse, InsertRoutinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertRoutinesRequest,
  output: InsertRoutinesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyRoutinesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyRoutinesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyRoutinesRequest>;

export type SetIamPolicyRoutinesResponse = Policy;
export const SetIamPolicyRoutinesResponse = Policy;

export type SetIamPolicyRoutinesError = CommonErrors;

export const setIamPolicyRoutines: API.OperationMethod<SetIamPolicyRoutinesRequest, SetIamPolicyRoutinesResponse, SetIamPolicyRoutinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyRoutinesRequest,
  output: SetIamPolicyRoutinesResponse,
  errors: [],
}));

/** Gets the specified routine resource by routine ID. */
export interface GetRoutinesRequest {
  /** Required. Routine ID of the requested routine */
  routineId: string;
  /** Required. Dataset ID of the requested routine */
  datasetId: string;
  /** Required. Project ID of the requested routine */
  projectId: string;
  /** If set, only the Routine fields in the field mask are returned in the response. If unset, all Routine fields are returned. */
  readMask?: string;
}

export const GetRoutinesRequest = Schema.Struct({
  routineId: Schema.String.pipe(T.HttpPath("routineId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}" }),
  svc,
) as unknown as Schema.Schema<GetRoutinesRequest>;

export type GetRoutinesResponse = Routine;
export const GetRoutinesResponse = Routine;

export type GetRoutinesError = CommonErrors;

export const getRoutines: API.OperationMethod<GetRoutinesRequest, GetRoutinesResponse, GetRoutinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetRoutinesRequest,
  output: GetRoutinesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsRoutinesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsRoutinesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsRoutinesRequest>;

export type TestIamPermissionsRoutinesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsRoutinesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsRoutinesError = CommonErrors;

export const testIamPermissionsRoutines: API.OperationMethod<TestIamPermissionsRoutinesRequest, TestIamPermissionsRoutinesResponse, TestIamPermissionsRoutinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsRoutinesRequest,
  output: TestIamPermissionsRoutinesResponse,
  errors: [],
}));

/** Updates information in an existing routine. The update method replaces the entire Routine resource. */
export interface UpdateRoutinesRequest {
  /** Required. Project ID of the routine to update */
  projectId: string;
  /** Required. Routine ID of the routine to update */
  routineId: string;
  /** Required. Dataset ID of the routine to update */
  datasetId: string;
  /** Request body */
  body?: Routine;
}

export const UpdateRoutinesRequest = Schema.Struct({
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  routineId: Schema.String.pipe(T.HttpPath("routineId")),
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  body: Schema.optional(Routine).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateRoutinesRequest>;

export type UpdateRoutinesResponse = Routine;
export const UpdateRoutinesResponse = Routine;

export type UpdateRoutinesError = CommonErrors;

export const updateRoutines: API.OperationMethod<UpdateRoutinesRequest, UpdateRoutinesResponse, UpdateRoutinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateRoutinesRequest,
  output: UpdateRoutinesResponse,
  errors: [],
}));

/** Deletes the routine specified by routineId from the dataset. */
export interface DeleteRoutinesRequest {
  /** Required. Dataset ID of the routine to delete */
  datasetId: string;
  /** Required. Project ID of the routine to delete */
  projectId: string;
  /** Required. Routine ID of the routine to delete */
  routineId: string;
}

export const DeleteRoutinesRequest = Schema.Struct({
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
  routineId: Schema.String.pipe(T.HttpPath("routineId")),
}).pipe(
  T.Http({ method: "DELETE", path: "projects/{projectsId}/datasets/{datasetsId}/routines/{routinesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteRoutinesRequest>;

export interface DeleteRoutinesResponse {}
export const DeleteRoutinesResponse: Schema.Schema<DeleteRoutinesResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteRoutinesResponse>;

export type DeleteRoutinesError = CommonErrors;

export const deleteRoutines: API.OperationMethod<DeleteRoutinesRequest, DeleteRoutinesResponse, DeleteRoutinesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRoutinesRequest,
  output: DeleteRoutinesResponse,
  errors: [],
}));

/** Lists all routines in the specified dataset. Requires the READER dataset role. */
export interface ListRoutinesRequest {
  /** Required. Dataset ID of the routines to list */
  datasetId: string;
  /** Page token, returned by a previous call, to request the next page of results */
  pageToken?: string;
  /** If set, then only the Routine fields in the field mask, as well as project_id, dataset_id and routine_id, are returned in the response. If unset, then the following Routine fields are returned: etag, project_id, dataset_id, routine_id, routine_type, creation_time, last_modified_time, and language. */
  readMask?: string;
  /** If set, then only the Routines matching this filter are returned. The supported format is `routineType:{RoutineType}`, where `{RoutineType}` is a RoutineType enum. For example: `routineType:SCALAR_FUNCTION`. */
  filter?: string;
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  maxResults?: number;
  /** Required. Project ID of the routines to list */
  projectId: string;
}

export const ListRoutinesRequest = Schema.Struct({
  datasetId: Schema.String.pipe(T.HttpPath("datasetId")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  projectId: Schema.String.pipe(T.HttpPath("projectId")),
}).pipe(
  T.Http({ method: "GET", path: "projects/{projectsId}/datasets/{datasetsId}/routines" }),
  svc,
) as unknown as Schema.Schema<ListRoutinesRequest>;

export type ListRoutinesResponse_Op = ListRoutinesResponse;
export const ListRoutinesResponse_Op = ListRoutinesResponse;

export type ListRoutinesError = CommonErrors;

export const listRoutines = API.makePaginated(() => ({
  input: ListRoutinesRequest,
  output: ListRoutinesResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

