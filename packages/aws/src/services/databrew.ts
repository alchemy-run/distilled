import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "DataBrew",
  target: "AWSGlueDataBrew",
  version: "2017-07-25",
  sigv4: "databrew",
  protocol: restJson1Protocol,
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
                `https://databrew-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-west-1") {
                return e("https://databrew.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://databrew-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://databrew.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://databrew.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DataBrewRoleNotAssumable
  extends /*@__PURE__*/ TE.TaggedError(
    "DataBrewRoleNotAssumable",
    ["BadRequestError", "RetryableError"],
    {
      synthetic: {
        from: "ValidationException",
        message: {
          includes: "is not a trusted entity for the data access role",
        },
      },
    },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type RecipeName = string;
export type RecipeVersion = string;
export type RecipeVersionList = string[];
export interface BatchDeleteRecipeVersionRequest {
  Name: string;
  RecipeVersions: string[];
}
export type ErrorCode = string;
export type RecipeErrorMessage = string;
export interface RecipeVersionErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
  RecipeVersion?: string;
}
export type RecipeErrorList = RecipeVersionErrorDetail[];
export interface BatchDeleteRecipeVersionResponse {
  Name: string;
  Errors?: RecipeVersionErrorDetail[];
}
export type DatasetName = string;
export type InputFormat =
  | "CSV"
  | "JSON"
  | "PARQUET"
  | "EXCEL"
  | "ORC"
  | (string & {});
export type MultiLine = boolean;
export interface JsonOptions {
  MultiLine?: boolean;
}
export type SheetName = string;
export type SheetNameList = string[];
export type SheetIndex = number;
export type SheetIndexList = number[];
export type HeaderRow = boolean;
export interface ExcelOptions {
  SheetNames?: string[];
  SheetIndexes?: number[];
  HeaderRow?: boolean;
}
export type Delimiter = string;
export interface CsvOptions {
  Delimiter?: string;
  HeaderRow?: boolean;
}
export interface FormatOptions {
  Json?: JsonOptions;
  Excel?: ExcelOptions;
  Csv?: CsvOptions;
}
export type Bucket = string;
export type Key = string;
export type BucketOwner = string;
export interface S3Location {
  Bucket: string;
  Key?: string;
  BucketOwner?: string;
}
export type CatalogId = string;
export type DatabaseName = string;
export type TableName = string;
export interface DataCatalogInputDefinition {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TempDirectory?: S3Location;
}
export type GlueConnectionName = string;
export type DatabaseTableName = string;
export type QueryString = string;
export interface DatabaseInputDefinition {
  GlueConnectionName: string;
  DatabaseTableName?: string;
  TempDirectory?: S3Location;
  QueryString?: string;
}
export type Arn = string;
export interface Metadata {
  SourceArn?: string;
}
export interface Input {
  S3InputDefinition?: S3Location;
  DataCatalogInputDefinition?: DataCatalogInputDefinition;
  DatabaseInputDefinition?: DatabaseInputDefinition;
  Metadata?: Metadata;
}
export type Expression = string;
export type ValueReference = string;
export type ConditionValue = string;
export type ValuesMap = { [key: string]: string | undefined };
export interface FilterExpression {
  Expression: string;
  ValuesMap: { [key: string]: string | undefined };
}
export type MaxFiles = number;
export type OrderedBy = "LAST_MODIFIED_DATE" | (string & {});
export type Order = "DESCENDING" | "ASCENDING" | (string & {});
export interface FilesLimit {
  MaxFiles: number;
  OrderedBy?: OrderedBy;
  Order?: Order;
}
export type PathParameterName = string;
export type ParameterType = "Datetime" | "Number" | "String" | (string & {});
export type DatetimeFormat = string;
export type TimezoneOffset = string;
export type LocaleCode = string;
export interface DatetimeOptions {
  Format: string;
  TimezoneOffset?: string;
  LocaleCode?: string;
}
export type CreateColumn = boolean;
export interface DatasetParameter {
  Name: string;
  Type: ParameterType;
  DatetimeOptions?: DatetimeOptions;
  CreateColumn?: boolean;
  Filter?: FilterExpression;
}
export type PathParametersMap = { [key: string]: DatasetParameter | undefined };
export interface PathOptions {
  LastModifiedDateCondition?: FilterExpression;
  FilesLimit?: FilesLimit;
  Parameters?: { [key: string]: DatasetParameter | undefined };
}
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateDatasetRequest {
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  PathOptions?: PathOptions;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateDatasetResponse {
  Name: string;
}
export type EncryptionKeyArn = string;
export type EncryptionMode = "SSE-KMS" | "SSE-S3" | (string & {});
export type JobName = string;
export type LogSubscription = "ENABLE" | "DISABLE" | (string & {});
export type MaxCapacity = number;
export type MaxRetries = number;
export type Statistic = string;
export type StatisticList = string[];
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export interface StatisticOverride {
  Statistic: string;
  Parameters: { [key: string]: string | undefined };
}
export type StatisticOverrideList = StatisticOverride[];
export interface StatisticsConfiguration {
  IncludedStatistics?: string[];
  Overrides?: StatisticOverride[];
}
export type ColumnName = string;
export interface ColumnSelector {
  Regex?: string;
  Name?: string;
}
export type ColumnSelectorList = ColumnSelector[];
export interface ColumnStatisticsConfiguration {
  Selectors?: ColumnSelector[];
  Statistics: StatisticsConfiguration;
}
export type ColumnStatisticsConfigurationList = ColumnStatisticsConfiguration[];
export type EntityType = string;
export type EntityTypeList = string[];
export interface AllowedStatistics {
  Statistics: string[];
}
export type AllowedStatisticList = AllowedStatistics[];
export interface EntityDetectorConfiguration {
  EntityTypes: string[];
  AllowedStatistics?: AllowedStatistics[];
}
export interface ProfileConfiguration {
  DatasetStatisticsConfiguration?: StatisticsConfiguration;
  ProfileColumns?: ColumnSelector[];
  ColumnStatisticsConfigurations?: ColumnStatisticsConfiguration[];
  EntityDetectorConfiguration?: EntityDetectorConfiguration;
}
export type ValidationMode = "CHECK_ALL" | (string & {});
export interface ValidationConfiguration {
  RulesetArn: string;
  ValidationMode?: ValidationMode;
}
export type ValidationConfigurationList = ValidationConfiguration[];
export type Timeout = number;
export type SampleMode = "FULL_DATASET" | "CUSTOM_ROWS" | (string & {});
export type JobSize = number;
export interface JobSample {
  Mode?: SampleMode;
  Size?: number;
}
export interface CreateProfileJobRequest {
  DatasetName: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  OutputLocation: S3Location;
  Configuration?: ProfileConfiguration;
  ValidationConfigurations?: ValidationConfiguration[];
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
  Timeout?: number;
  JobSample?: JobSample;
}
export interface CreateProfileJobResponse {
  Name: string;
}
export type ProjectName = string;
export type SampleSize = number;
export type SampleType = "FIRST_N" | "LAST_N" | "RANDOM" | (string & {});
export interface Sample {
  Size?: number;
  Type: SampleType;
}
export interface CreateProjectRequest {
  DatasetName: string;
  Name: string;
  RecipeName: string;
  Sample?: Sample;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface CreateProjectResponse {
  Name: string;
}
export type RecipeDescription = string;
export type Operation = string;
export interface RecipeAction {
  Operation: string;
  Parameters?: { [key: string]: string | undefined };
}
export type Condition = string;
export type TargetColumn = string;
export interface ConditionExpression {
  Condition: string;
  Value?: string;
  TargetColumn: string;
}
export type ConditionExpressionList = ConditionExpression[];
export interface RecipeStep {
  Action: RecipeAction;
  ConditionExpressions?: ConditionExpression[];
}
export type RecipeStepList = RecipeStep[];
export interface CreateRecipeRequest {
  Description?: string;
  Name: string;
  Steps: RecipeStep[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRecipeResponse {
  Name: string;
}
export type CompressionFormat =
  | "GZIP"
  | "LZ4"
  | "SNAPPY"
  | "BZIP2"
  | "DEFLATE"
  | "LZO"
  | "BROTLI"
  | "ZSTD"
  | "ZLIB"
  | (string & {});
export type OutputFormat =
  | "CSV"
  | "JSON"
  | "PARQUET"
  | "GLUEPARQUET"
  | "AVRO"
  | "ORC"
  | "XML"
  | "TABLEAUHYPER"
  | (string & {});
export type ColumnNameList = string[];
export type OverwriteOutput = boolean;
export interface CsvOutputOptions {
  Delimiter?: string;
}
export interface OutputFormatOptions {
  Csv?: CsvOutputOptions;
}
export type MaxOutputFiles = number;
export interface Output {
  CompressionFormat?: CompressionFormat;
  Format?: OutputFormat;
  PartitionColumns?: string[];
  Location: S3Location;
  Overwrite?: boolean;
  FormatOptions?: OutputFormatOptions;
  MaxOutputFiles?: number;
}
export type OutputList = Output[];
export interface S3TableOutputOptions {
  Location: S3Location;
}
export interface DatabaseTableOutputOptions {
  TempDirectory?: S3Location;
  TableName: string;
}
export interface DataCatalogOutput {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  S3Options?: S3TableOutputOptions;
  DatabaseOptions?: DatabaseTableOutputOptions;
  Overwrite?: boolean;
}
export type DataCatalogOutputList = DataCatalogOutput[];
export type DatabaseOutputMode = "NEW_TABLE" | (string & {});
export interface DatabaseOutput {
  GlueConnectionName: string;
  DatabaseOptions: DatabaseTableOutputOptions;
  DatabaseOutputMode?: DatabaseOutputMode;
}
export type DatabaseOutputList = DatabaseOutput[];
export interface RecipeReference {
  Name: string;
  RecipeVersion?: string;
}
export interface CreateRecipeJobRequest {
  DatasetName?: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  ProjectName?: string;
  RecipeReference?: RecipeReference;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
  Timeout?: number;
}
export interface CreateRecipeJobResponse {
  Name: string;
}
export type RulesetName = string;
export type RulesetDescription = string;
export type RuleName = string;
export type Disabled = boolean;
export type ThresholdValue = number;
export type ThresholdType =
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | (string & {});
export type ThresholdUnit = "COUNT" | "PERCENTAGE" | (string & {});
export interface Threshold {
  Value: number;
  Type?: ThresholdType;
  Unit?: ThresholdUnit;
}
export interface Rule {
  Name: string;
  Disabled?: boolean;
  CheckExpression: string;
  SubstitutionMap?: { [key: string]: string | undefined };
  Threshold?: Threshold;
  ColumnSelectors?: ColumnSelector[];
}
export type RuleList = Rule[];
export interface CreateRulesetRequest {
  Name: string;
  Description?: string;
  TargetArn: string;
  Rules: Rule[];
  Tags?: { [key: string]: string | undefined };
}
export interface CreateRulesetResponse {
  Name: string;
}
export type JobNameList = string[];
export type CronExpression = string;
export type ScheduleName = string;
export interface CreateScheduleRequest {
  JobNames?: string[];
  CronExpression: string;
  Tags?: { [key: string]: string | undefined };
  Name: string;
}
export interface CreateScheduleResponse {
  Name: string;
}
export interface DeleteDatasetRequest {
  Name: string;
}
export interface DeleteDatasetResponse {
  Name: string;
}
export interface DeleteJobRequest {
  Name: string;
}
export interface DeleteJobResponse {
  Name: string;
}
export interface DeleteProjectRequest {
  Name: string;
}
export interface DeleteProjectResponse {
  Name: string;
}
export interface DeleteRecipeVersionRequest {
  Name: string;
  RecipeVersion: string;
}
export interface DeleteRecipeVersionResponse {
  Name: string;
  RecipeVersion: string;
}
export interface DeleteRulesetRequest {
  Name: string;
}
export interface DeleteRulesetResponse {
  Name: string;
}
export interface DeleteScheduleRequest {
  Name: string;
}
export interface DeleteScheduleResponse {
  Name: string;
}
export interface DescribeDatasetRequest {
  Name: string;
}
export type CreatedBy = string;
export type LastModifiedBy = string;
export type Source = "S3" | "DATA-CATALOG" | "DATABASE" | (string & {});
export interface DescribeDatasetResponse {
  CreatedBy?: string;
  CreateDate?: Date;
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Source?: Source;
  PathOptions?: PathOptions;
  Tags?: { [key: string]: string | undefined };
  ResourceArn?: string;
}
export interface DescribeJobRequest {
  Name: string;
}
export type JobType = "PROFILE" | "RECIPE" | (string & {});
export interface DescribeJobResponse {
  CreateDate?: Date;
  CreatedBy?: string;
  DatasetName?: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  Type?: JobType;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  ProjectName?: string;
  ProfileConfiguration?: ProfileConfiguration;
  ValidationConfigurations?: ValidationConfiguration[];
  RecipeReference?: RecipeReference;
  ResourceArn?: string;
  RoleArn?: string;
  Tags?: { [key: string]: string | undefined };
  Timeout?: number;
  JobSample?: JobSample;
}
export type JobRunId = string;
export interface DescribeJobRunRequest {
  Name: string;
  RunId: string;
}
export type Attempt = number;
export type JobRunErrorMessage = string;
export type ExecutionTime = number;
export type JobRunState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMEOUT"
  | (string & {});
export type LogGroupName = string;
export type StartedBy = string;
export interface DescribeJobRunResponse {
  Attempt?: number;
  CompletedOn?: Date;
  DatasetName?: string;
  ErrorMessage?: string;
  ExecutionTime?: number;
  JobName: string;
  ProfileConfiguration?: ProfileConfiguration;
  ValidationConfigurations?: ValidationConfiguration[];
  RunId?: string;
  State?: JobRunState;
  LogSubscription?: LogSubscription;
  LogGroupName?: string;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  RecipeReference?: RecipeReference;
  StartedBy?: string;
  StartedOn?: Date;
  JobSample?: JobSample;
}
export interface DescribeProjectRequest {
  Name: string;
}
export type SessionStatus =
  | "ASSIGNED"
  | "FAILED"
  | "INITIALIZING"
  | "PROVISIONING"
  | "READY"
  | "RECYCLING"
  | "ROTATING"
  | "TERMINATED"
  | "TERMINATING"
  | "UPDATING"
  | (string & {});
export type OpenedBy = string;
export interface DescribeProjectResponse {
  CreateDate?: Date;
  CreatedBy?: string;
  DatasetName?: string;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Name: string;
  RecipeName?: string;
  ResourceArn?: string;
  Sample?: Sample;
  RoleArn?: string;
  Tags?: { [key: string]: string | undefined };
  SessionStatus?: SessionStatus;
  OpenedBy?: string;
  OpenDate?: Date;
}
export interface DescribeRecipeRequest {
  Name: string;
  RecipeVersion?: string;
}
export type PublishedBy = string;
export interface DescribeRecipeResponse {
  CreatedBy?: string;
  CreateDate?: Date;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ProjectName?: string;
  PublishedBy?: string;
  PublishedDate?: Date;
  Description?: string;
  Name: string;
  Steps?: RecipeStep[];
  Tags?: { [key: string]: string | undefined };
  ResourceArn?: string;
  RecipeVersion?: string;
}
export interface DescribeRulesetRequest {
  Name: string;
}
export interface DescribeRulesetResponse {
  Name: string;
  Description?: string;
  TargetArn?: string;
  Rules?: Rule[];
  CreateDate?: Date;
  CreatedBy?: string;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ResourceArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface DescribeScheduleRequest {
  Name: string;
}
export interface DescribeScheduleResponse {
  CreateDate?: Date;
  CreatedBy?: string;
  JobNames?: string[];
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ResourceArn?: string;
  CronExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Name: string;
}
export type MaxResults100 = number;
export type NextToken = string;
export interface ListDatasetsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type AccountId = string;
export interface Dataset {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Source?: Source;
  PathOptions?: PathOptions;
  Tags?: { [key: string]: string | undefined };
  ResourceArn?: string;
}
export type DatasetList = Dataset[];
export interface ListDatasetsResponse {
  Datasets: Dataset[];
  NextToken?: string;
}
export interface ListJobRunsRequest {
  Name: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface JobRun {
  Attempt?: number;
  CompletedOn?: Date;
  DatasetName?: string;
  ErrorMessage?: string;
  ExecutionTime?: number;
  JobName?: string;
  RunId?: string;
  State?: JobRunState;
  LogSubscription?: LogSubscription;
  LogGroupName?: string;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  RecipeReference?: RecipeReference;
  StartedBy?: string;
  StartedOn?: Date;
  JobSample?: JobSample;
  ValidationConfigurations?: ValidationConfiguration[];
}
export type JobRunList = JobRun[];
export interface ListJobRunsResponse {
  JobRuns: JobRun[];
  NextToken?: string;
}
export interface ListJobsRequest {
  DatasetName?: string;
  MaxResults?: number;
  NextToken?: string;
  ProjectName?: string;
}
export interface Job {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  DatasetName?: string;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  Type?: JobType;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  ProjectName?: string;
  RecipeReference?: RecipeReference;
  ResourceArn?: string;
  RoleArn?: string;
  Timeout?: number;
  Tags?: { [key: string]: string | undefined };
  JobSample?: JobSample;
  ValidationConfigurations?: ValidationConfiguration[];
}
export type JobList = Job[];
export interface ListJobsResponse {
  Jobs: Job[];
  NextToken?: string;
}
export interface ListProjectsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface Project {
  AccountId?: string;
  CreateDate?: Date;
  CreatedBy?: string;
  DatasetName?: string;
  LastModifiedDate?: Date;
  LastModifiedBy?: string;
  Name: string;
  RecipeName: string;
  ResourceArn?: string;
  Sample?: Sample;
  Tags?: { [key: string]: string | undefined };
  RoleArn?: string;
  OpenedBy?: string;
  OpenDate?: Date;
}
export type ProjectList = Project[];
export interface ListProjectsResponse {
  Projects: Project[];
  NextToken?: string;
}
export interface ListRecipesRequest {
  MaxResults?: number;
  NextToken?: string;
  RecipeVersion?: string;
}
export interface Recipe {
  CreatedBy?: string;
  CreateDate?: Date;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ProjectName?: string;
  PublishedBy?: string;
  PublishedDate?: Date;
  Description?: string;
  Name: string;
  ResourceArn?: string;
  Steps?: RecipeStep[];
  Tags?: { [key: string]: string | undefined };
  RecipeVersion?: string;
}
export type RecipeList = Recipe[];
export interface ListRecipesResponse {
  Recipes: Recipe[];
  NextToken?: string;
}
export interface ListRecipeVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
  Name: string;
}
export interface ListRecipeVersionsResponse {
  NextToken?: string;
  Recipes: Recipe[];
}
export interface ListRulesetsRequest {
  TargetArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type RuleCount = number;
export interface RulesetItem {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  Description?: string;
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  Name: string;
  ResourceArn?: string;
  RuleCount?: number;
  Tags?: { [key: string]: string | undefined };
  TargetArn: string;
}
export type RulesetItemList = RulesetItem[];
export interface ListRulesetsResponse {
  Rulesets: RulesetItem[];
  NextToken?: string;
}
export interface ListSchedulesRequest {
  JobName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Schedule {
  AccountId?: string;
  CreatedBy?: string;
  CreateDate?: Date;
  JobNames?: string[];
  LastModifiedBy?: string;
  LastModifiedDate?: Date;
  ResourceArn?: string;
  CronExpression?: string;
  Tags?: { [key: string]: string | undefined };
  Name: string;
}
export type ScheduleList = Schedule[];
export interface ListSchedulesResponse {
  Schedules: Schedule[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export interface PublishRecipeRequest {
  Description?: string;
  Name: string;
}
export interface PublishRecipeResponse {
  Name: string;
}
export type Preview = boolean;
export type StepIndex = number;
export type ClientSessionId = string | redacted.Redacted<string>;
export type StartColumnIndex = number;
export type ColumnRange = number;
export type HiddenColumnList = string[];
export type StartRowIndex = number;
export type RowRange = number;
export type AnalyticsMode = "ENABLE" | "DISABLE" | (string & {});
export interface ViewFrame {
  StartColumnIndex: number;
  ColumnRange?: number;
  HiddenColumns?: string[];
  StartRowIndex?: number;
  RowRange?: number;
  Analytics?: AnalyticsMode;
}
export interface SendProjectSessionActionRequest {
  Preview?: boolean;
  Name: string;
  RecipeStep?: RecipeStep;
  StepIndex?: number;
  ClientSessionId?: string | redacted.Redacted<string>;
  ViewFrame?: ViewFrame;
}
export type Result = string;
export type ActionId = number;
export interface SendProjectSessionActionResponse {
  Result?: string;
  Name: string;
  ActionId?: number;
}
export interface StartJobRunRequest {
  Name: string;
}
export interface StartJobRunResponse {
  RunId: string;
}
export type AssumeControl = boolean;
export interface StartProjectSessionRequest {
  Name: string;
  AssumeControl?: boolean;
}
export interface StartProjectSessionResponse {
  Name: string;
  ClientSessionId?: string | redacted.Redacted<string>;
}
export interface StopJobRunRequest {
  Name: string;
  RunId: string;
}
export interface StopJobRunResponse {
  RunId: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDatasetRequest {
  Name: string;
  Format?: InputFormat;
  FormatOptions?: FormatOptions;
  Input: Input;
  PathOptions?: PathOptions;
}
export interface UpdateDatasetResponse {
  Name: string;
}
export interface UpdateProfileJobRequest {
  Configuration?: ProfileConfiguration;
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  OutputLocation: S3Location;
  ValidationConfigurations?: ValidationConfiguration[];
  RoleArn: string;
  Timeout?: number;
  JobSample?: JobSample;
}
export interface UpdateProfileJobResponse {
  Name: string;
}
export interface UpdateProjectRequest {
  Sample?: Sample;
  RoleArn: string;
  Name: string;
}
export interface UpdateProjectResponse {
  LastModifiedDate?: Date;
  Name: string;
}
export interface UpdateRecipeRequest {
  Description?: string;
  Name: string;
  Steps?: RecipeStep[];
}
export interface UpdateRecipeResponse {
  Name: string;
}
export interface UpdateRecipeJobRequest {
  EncryptionKeyArn?: string;
  EncryptionMode?: EncryptionMode;
  Name: string;
  LogSubscription?: LogSubscription;
  MaxCapacity?: number;
  MaxRetries?: number;
  Outputs?: Output[];
  DataCatalogOutputs?: DataCatalogOutput[];
  DatabaseOutputs?: DatabaseOutput[];
  RoleArn: string;
  Timeout?: number;
}
export interface UpdateRecipeJobResponse {
  Name: string;
}
export interface UpdateRulesetRequest {
  Name: string;
  Description?: string;
  Rules: Rule[];
}
export interface UpdateRulesetResponse {
  Name: string;
}
export interface UpdateScheduleRequest {
  JobNames?: string[];
  CronExpression: string;
  Name: string;
}
export interface UpdateScheduleResponse {
  Name: string;
}
export type Message = string;
export type BatchDeleteRecipeVersionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes one or more versions of a recipe at a time.
 *
 * The entire request will be rejected if:
 *
 * - The recipe does not exist.
 *
 * - There is an invalid version identifier in the list of versions.
 *
 * - The version list is empty.
 *
 * - The version list size exceeds 50.
 *
 * - The version list contains duplicate entries.
 *
 * The request will complete successfully, but with partial failures, if:
 *
 * - A version does not exist.
 *
 * - A version is being used by a job.
 *
 * - You specify `LATEST_WORKING`, but it's being used by a
 * project.
 *
 * - The version fails to be deleted.
 *
 * The `LATEST_WORKING` version will only be deleted if the recipe has no
 * other versions. If you try to delete `LATEST_WORKING` while other versions
 * exist (or if they can't be deleted), then `LATEST_WORKING` will be listed as
 * partial failure in the response.
 */
export const batchDeleteRecipeVersion: API.OperationMethod<
  BatchDeleteRecipeVersionRequest,
  BatchDeleteRecipeVersionResponse,
  BatchDeleteRecipeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recipes/{Name}/batchDeleteRecipeVersion",
    input: { Name: 0, RecipeVersions: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteRecipeVersion",
})) as any;

export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new DataBrew dataset.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /datasets",
    input: {
      Name: 0,
      Format: 0,
      FormatOptions: i_FormatOptions,
      Input: i_Input,
      PathOptions: i_PathOptions,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
})) as any;

export type CreateProfileJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new job to analyze a dataset and create its data profile.
 */
export const createProfileJob: API.OperationMethod<
  CreateProfileJobRequest,
  CreateProfileJobResponse,
  CreateProfileJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profileJobs",
    input: {
      DatasetName: 0,
      EncryptionKeyArn: 0,
      EncryptionMode: 0,
      Name: 0,
      LogSubscription: 0,
      MaxCapacity: 0,
      MaxRetries: 0,
      OutputLocation: i_S3Location,
      Configuration: i_ProfileConfiguration,
      ValidationConfigurations: D.list(i_ValidationConfiguration),
      RoleArn: 0,
      Tags: 0,
      Timeout: 0,
      JobSample: i_JobSample,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfileJob",
})) as any;

export type CreateProjectError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new DataBrew project.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /projects",
    input: {
      DatasetName: 0,
      Name: 0,
      RecipeName: 0,
      Sample: i_Sample,
      RoleArn: 0,
      Tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
})) as any;

export type CreateRecipeError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new DataBrew recipe.
 */
export const createRecipe: API.OperationMethod<
  CreateRecipeRequest,
  CreateRecipeResponse,
  CreateRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recipes",
    input: { Description: 0, Name: 0, Steps: D.list(i_RecipeStep), Tags: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecipe",
})) as any;

export type CreateRecipeJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new job to transform input data, using steps defined in an existing Glue DataBrew recipe
 */
export const createRecipeJob: API.OperationMethod<
  CreateRecipeJobRequest,
  CreateRecipeJobResponse,
  CreateRecipeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recipeJobs",
    input: {
      DatasetName: 0,
      EncryptionKeyArn: 0,
      EncryptionMode: 0,
      Name: 0,
      LogSubscription: 0,
      MaxCapacity: 0,
      MaxRetries: 0,
      Outputs: D.list(i_Output),
      DataCatalogOutputs: D.list(i_DataCatalogOutput),
      DatabaseOutputs: D.list(i_DatabaseOutput),
      ProjectName: 0,
      RecipeReference: { Name: 0, RecipeVersion: 0 },
      RoleArn: 0,
      Tags: 0,
      Timeout: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecipeJob",
})) as any;

export type CreateRulesetError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new ruleset that can be used in a profile job to validate
 * the data quality of a dataset.
 */
export const createRuleset: API.OperationMethod<
  CreateRulesetRequest,
  CreateRulesetResponse,
  CreateRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /rulesets",
    input: {
      Name: 0,
      Description: 0,
      TargetArn: 0,
      Rules: D.list(i_Rule),
      Tags: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleset",
})) as any;

export type CreateScheduleError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new schedule for one or more DataBrew jobs. Jobs can be run at a specific
 * date and time, or at regular intervals.
 */
export const createSchedule: API.OperationMethod<
  CreateScheduleRequest,
  CreateScheduleResponse,
  CreateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /schedules",
    input: { JobNames: 0, CronExpression: 0, Tags: 0, Name: 0 },
    body: true,
  },
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchedule",
})) as any;

export type DeleteDatasetError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a dataset from DataBrew.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /datasets/{Name}",
    input: { Name: 0 },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
})) as any;

export type DeleteJobError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified DataBrew job.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /jobs/{Name}", input: { Name: 0 } },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
})) as any;

export type DeleteProjectError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing DataBrew project.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /projects/{Name}",
    input: { Name: 0 },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
})) as any;

export type DeleteRecipeVersionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a single version of a DataBrew recipe.
 */
export const deleteRecipeVersion: API.OperationMethod<
  DeleteRecipeVersionRequest,
  DeleteRecipeVersionResponse,
  DeleteRecipeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /recipes/{Name}/recipeVersion/{RecipeVersion}",
    input: { Name: 0, RecipeVersion: 0 },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecipeVersion",
})) as any;

export type DeleteRulesetError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a ruleset.
 */
export const deleteRuleset: API.OperationMethod<
  DeleteRulesetRequest,
  DeleteRulesetResponse,
  DeleteRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /rulesets/{Name}",
    input: { Name: 0 },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleset",
})) as any;

export type DeleteScheduleError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified DataBrew schedule.
 */
export const deleteSchedule: API.OperationMethod<
  DeleteScheduleRequest,
  DeleteScheduleResponse,
  DeleteScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /schedules/{Name}",
    input: { Name: 0 },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedule",
})) as any;

export type DescribeDatasetError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew dataset.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets/{Name}",
    input: { Name: 0 },
    output: { CreateDate: D.ts, LastModifiedDate: D.ts },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
})) as any;

export type DescribeJobError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew job.
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResponse,
  DescribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{Name}",
    input: { Name: 0 },
    output: { CreateDate: D.ts, LastModifiedDate: D.ts },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
})) as any;

export type DescribeJobRunError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Represents one run of a DataBrew job.
 */
export const describeJobRun: API.OperationMethod<
  DescribeJobRunRequest,
  DescribeJobRunResponse,
  DescribeJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{Name}/jobRun/{RunId}",
    input: { Name: 0, RunId: 0 },
    output: { CompletedOn: D.ts, StartedOn: D.ts },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobRun",
})) as any;

export type DescribeProjectError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew project.
 */
export const describeProject: API.OperationMethod<
  DescribeProjectRequest,
  DescribeProjectResponse,
  DescribeProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /projects/{Name}",
    input: { Name: 0 },
    output: { CreateDate: D.ts, LastModifiedDate: D.ts, OpenDate: D.ts },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProject",
})) as any;

export type DescribeRecipeError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew recipe corresponding to a particular
 * version.
 */
export const describeRecipe: API.OperationMethod<
  DescribeRecipeRequest,
  DescribeRecipeResponse,
  DescribeRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /recipes/{Name}",
    input: { Name: 0, RecipeVersion: D.m({ query: "recipeVersion" }) },
    output: { CreateDate: D.ts, LastModifiedDate: D.ts, PublishedDate: D.ts },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecipe",
})) as any;

export type DescribeRulesetError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves detailed information about the ruleset.
 */
export const describeRuleset: API.OperationMethod<
  DescribeRulesetRequest,
  DescribeRulesetResponse,
  DescribeRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /rulesets/{Name}",
    input: { Name: 0 },
    output: { CreateDate: D.ts, LastModifiedDate: D.ts },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleset",
})) as any;

export type DescribeScheduleError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the definition of a specific DataBrew schedule.
 */
export const describeSchedule: API.OperationMethod<
  DescribeScheduleRequest,
  DescribeScheduleResponse,
  DescribeScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /schedules/{Name}",
    input: { Name: 0 },
    output: { CreateDate: D.ts, LastModifiedDate: D.ts },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedule",
})) as any;

export type ListDatasetsError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew datasets.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  Dataset
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /datasets",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Datasets: D.list({ CreateDate: D.ts, LastModifiedDate: D.ts }) },
  },
  errors: [ValidationException, TooManyRequestsException],
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

export type ListJobRunsError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the previous runs of a particular DataBrew job.
 */
export const listJobRuns: API.PaginatedOperationMethod<
  ListJobRunsRequest,
  ListJobRunsResponse,
  ListJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs/{Name}/jobRuns",
    input: {
      Name: 0,
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { JobRuns: D.list({ CompletedOn: D.ts, StartedOn: D.ts }) },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew jobs that are defined.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /jobs",
    input: {
      DatasetName: D.m({ query: "datasetName" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      ProjectName: D.m({ query: "projectName" }),
    },
    output: { Jobs: D.list({ CreateDate: D.ts, LastModifiedDate: D.ts }) },
  },
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProjectsError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew projects that are defined.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  Project
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /projects",
    input: {
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      Projects: D.list({
        CreateDate: D.ts,
        LastModifiedDate: D.ts,
        OpenDate: D.ts,
      }),
    },
  },
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Projects",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecipesError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the DataBrew recipes that are defined.
 */
export const listRecipes: API.PaginatedOperationMethod<
  ListRecipesRequest,
  ListRecipesResponse,
  ListRecipesError,
  Credentials | HttpClient.HttpClient,
  Recipe
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /recipes",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      RecipeVersion: D.m({ query: "recipeVersion" }),
    },
    output: { Recipes: D.list(o_Recipe) },
  },
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecipes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recipes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecipeVersionsError =
  | ValidationException
  | TooManyRequestsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the versions of a particular DataBrew recipe, except for
 * `LATEST_WORKING`.
 */
export const listRecipeVersions: API.PaginatedOperationMethod<
  ListRecipeVersionsRequest,
  ListRecipeVersionsResponse,
  ListRecipeVersionsError,
  Credentials | HttpClient.HttpClient,
  Recipe
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /recipeVersions",
    input: {
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
      Name: D.m({ query: "name" }),
    },
    output: { Recipes: D.list(o_Recipe) },
  },
  errors: [
    ValidationException,
    TooManyRequestsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecipeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recipes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRulesetsError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all rulesets available in the current account or rulesets associated
 * with a specific resource (dataset).
 */
export const listRulesets: API.PaginatedOperationMethod<
  ListRulesetsRequest,
  ListRulesetsResponse,
  ListRulesetsError,
  Credentials | HttpClient.HttpClient,
  RulesetItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /rulesets",
    input: {
      TargetArn: D.m({ query: "targetArn" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Rulesets: D.list({ CreateDate: D.ts, LastModifiedDate: D.ts }) },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRulesets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rulesets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchedulesError =
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the DataBrew schedules that are defined.
 */
export const listSchedules: API.PaginatedOperationMethod<
  ListSchedulesRequest,
  ListSchedulesResponse,
  ListSchedulesError,
  Credentials | HttpClient.HttpClient,
  Schedule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /schedules",
    input: {
      JobName: D.m({ query: "jobName" }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: { Schedules: D.list({ CreateDate: D.ts, LastModifiedDate: D.ts }) },
  },
  errors: [ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchedules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schedules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all the tags for a DataBrew resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PublishRecipeError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Publishes a new version of a DataBrew recipe.
 */
export const publishRecipe: API.OperationMethod<
  PublishRecipeRequest,
  PublishRecipeResponse,
  PublishRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recipes/{Name}/publishRecipe",
    input: { Description: 0, Name: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishRecipe",
})) as any;

export type SendProjectSessionActionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Performs a recipe step within an interactive DataBrew session that's currently
 * open.
 */
export const sendProjectSessionAction: API.OperationMethod<
  SendProjectSessionActionRequest,
  SendProjectSessionActionResponse,
  SendProjectSessionActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /projects/{Name}/sendProjectSessionAction",
    input: {
      Preview: 0,
      Name: 0,
      RecipeStep: i_RecipeStep,
      StepIndex: 0,
      ClientSessionId: 0,
      ViewFrame: {
        StartColumnIndex: 0,
        ColumnRange: 0,
        HiddenColumns: 0,
        StartRowIndex: 0,
        RowRange: 0,
        Analytics: 0,
      },
    },
    body: true,
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendProjectSessionAction",
})) as any;

export type StartJobRunError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Runs a DataBrew job.
 */
export const startJobRun: API.OperationMethod<
  StartJobRunRequest,
  StartJobRunResponse,
  StartJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /jobs/{Name}/startJobRun",
    input: { Name: 0 },
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
})) as any;

export type StartProjectSessionError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an interactive session, enabling you to manipulate data in a DataBrew
 * project.
 */
export const startProjectSession: API.OperationMethod<
  StartProjectSessionRequest,
  StartProjectSessionResponse,
  StartProjectSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /projects/{Name}/startProjectSession",
    input: { Name: 0, AssumeControl: 0 },
    output: { ClientSessionId: D.secret },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartProjectSession",
})) as any;

export type StopJobRunError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a particular run of a job.
 */
export const stopJobRun: API.OperationMethod<
  StopJobRunRequest,
  StopJobRunResponse,
  StopJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /jobs/{Name}/jobRun/{RunId}/stopJobRun",
    input: { Name: 0, RunId: 0 },
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJobRun",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds metadata tags to a DataBrew resource, such as a dataset, project, recipe, job, or
 * schedule.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes metadata tags from a DataBrew resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDatasetError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew dataset.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /datasets/{Name}",
    input: {
      Name: 0,
      Format: 0,
      FormatOptions: i_FormatOptions,
      Input: i_Input,
      PathOptions: i_PathOptions,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
})) as any;

export type UpdateProfileJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Modifies the definition of an existing profile job.
 */
export const updateProfileJob: API.OperationMethod<
  UpdateProfileJobRequest,
  UpdateProfileJobResponse,
  UpdateProfileJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /profileJobs/{Name}",
    input: {
      Configuration: i_ProfileConfiguration,
      EncryptionKeyArn: 0,
      EncryptionMode: 0,
      Name: 0,
      LogSubscription: 0,
      MaxCapacity: 0,
      MaxRetries: 0,
      OutputLocation: i_S3Location,
      ValidationConfigurations: D.list(i_ValidationConfiguration),
      RoleArn: 0,
      Timeout: 0,
      JobSample: i_JobSample,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfileJob",
})) as any;

export type UpdateProjectError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /projects/{Name}",
    input: { Sample: i_Sample, RoleArn: 0, Name: 0 },
    output: { LastModifiedDate: D.ts },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
})) as any;

export type UpdateRecipeError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies the definition of the `LATEST_WORKING` version of a DataBrew
 * recipe.
 */
export const updateRecipe: API.OperationMethod<
  UpdateRecipeRequest,
  UpdateRecipeResponse,
  UpdateRecipeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /recipes/{Name}",
    input: { Description: 0, Name: 0, Steps: D.list(i_RecipeStep) },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecipe",
})) as any;

export type UpdateRecipeJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | DataBrewRoleNotAssumable
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew recipe job.
 */
export const updateRecipeJob: API.OperationMethod<
  UpdateRecipeJobRequest,
  UpdateRecipeJobResponse,
  UpdateRecipeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /recipeJobs/{Name}",
    input: {
      EncryptionKeyArn: 0,
      EncryptionMode: 0,
      Name: 0,
      LogSubscription: 0,
      MaxCapacity: 0,
      MaxRetries: 0,
      Outputs: D.list(i_Output),
      DataCatalogOutputs: D.list(i_DataCatalogOutput),
      DatabaseOutputs: D.list(i_DatabaseOutput),
      RoleArn: 0,
      Timeout: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecipeJob",
})) as any;

export type UpdateRulesetError =
  | ResourceNotFoundException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates specified ruleset.
 */
export const updateRuleset: API.OperationMethod<
  UpdateRulesetRequest,
  UpdateRulesetResponse,
  UpdateRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /rulesets/{Name}",
    input: { Name: 0, Description: 0, Rules: D.list(i_Rule) },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleset",
})) as any;

export type UpdateScheduleError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies the definition of an existing DataBrew schedule.
 */
export const updateSchedule: API.OperationMethod<
  UpdateScheduleRequest,
  UpdateScheduleResponse,
  UpdateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /schedules/{Name}",
    input: { JobNames: 0, CronExpression: 0, Name: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchedule",
})) as any;

const i_DataCatalogOutput: D.LazyStruct = () => ({
  CatalogId: 0,
  DatabaseName: 0,
  TableName: 0,
  S3Options: { Location: i_S3Location },
  DatabaseOptions: i_DatabaseTableOutputOptions,
  Overwrite: 0,
});
const i_DatabaseOutput: D.LazyStruct = () => ({
  GlueConnectionName: 0,
  DatabaseOptions: i_DatabaseTableOutputOptions,
  DatabaseOutputMode: 0,
});
const i_FormatOptions: D.LazyStruct = () => ({
  Json: { MultiLine: 0 },
  Excel: { SheetNames: 0, SheetIndexes: 0, HeaderRow: 0 },
  Csv: { Delimiter: 0, HeaderRow: 0 },
});
const i_Input: D.LazyStruct = () => ({
  S3InputDefinition: i_S3Location,
  DataCatalogInputDefinition: {
    CatalogId: 0,
    DatabaseName: 0,
    TableName: 0,
    TempDirectory: i_S3Location,
  },
  DatabaseInputDefinition: {
    GlueConnectionName: 0,
    DatabaseTableName: 0,
    TempDirectory: i_S3Location,
    QueryString: 0,
  },
  Metadata: { SourceArn: 0 },
});
const i_JobSample: D.LazyStruct = () => ({ Mode: 0, Size: 0 });
const i_Output: D.LazyStruct = () => ({
  CompressionFormat: 0,
  Format: 0,
  PartitionColumns: 0,
  Location: i_S3Location,
  Overwrite: 0,
  FormatOptions: { Csv: { Delimiter: 0 } },
  MaxOutputFiles: 0,
});
const i_PathOptions: D.LazyStruct = () => ({
  LastModifiedDateCondition: i_FilterExpression,
  FilesLimit: { MaxFiles: 0, OrderedBy: 0, Order: 0 },
  Parameters: D.map({
    Name: 0,
    Type: 0,
    DatetimeOptions: { Format: 0, TimezoneOffset: 0, LocaleCode: 0 },
    CreateColumn: 0,
    Filter: i_FilterExpression,
  }),
});
const i_ProfileConfiguration: D.LazyStruct = () => ({
  DatasetStatisticsConfiguration: i_StatisticsConfiguration,
  ProfileColumns: D.list(i_ColumnSelector),
  ColumnStatisticsConfigurations: D.list({
    Selectors: D.list(i_ColumnSelector),
    Statistics: i_StatisticsConfiguration,
  }),
  EntityDetectorConfiguration: {
    EntityTypes: 0,
    AllowedStatistics: D.list({ Statistics: 0 }),
  },
});
const i_RecipeStep: D.LazyStruct = () => ({
  Action: { Operation: 0, Parameters: 0 },
  ConditionExpressions: D.list({ Condition: 0, Value: 0, TargetColumn: 0 }),
});
const i_Rule: D.LazyStruct = () => ({
  Name: 0,
  Disabled: 0,
  CheckExpression: 0,
  SubstitutionMap: 0,
  Threshold: { Value: 0, Type: 0, Unit: 0 },
  ColumnSelectors: D.list(i_ColumnSelector),
});
const i_S3Location: D.LazyStruct = () => ({
  Bucket: 0,
  Key: 0,
  BucketOwner: 0,
});
const i_Sample: D.LazyStruct = () => ({ Size: 0, Type: 0 });
const i_ValidationConfiguration: D.LazyStruct = () => ({
  RulesetArn: 0,
  ValidationMode: 0,
});
const o_Recipe: D.LazyStruct = () => ({
  CreateDate: D.ts,
  LastModifiedDate: D.ts,
  PublishedDate: D.ts,
});
const i_ColumnSelector: D.LazyStruct = () => ({ Regex: 0, Name: 0 });
const i_DatabaseTableOutputOptions: D.LazyStruct = () => ({
  TempDirectory: i_S3Location,
  TableName: 0,
});
const i_FilterExpression: D.LazyStruct = () => ({
  Expression: 0,
  ValuesMap: 0,
});
const i_StatisticsConfiguration: D.LazyStruct = () => ({
  IncludedStatistics: 0,
  Overrides: D.list({ Statistic: 0, Parameters: 0 }),
});
