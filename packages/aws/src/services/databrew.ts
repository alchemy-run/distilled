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
  sdkId: "DataBrew",
  serviceShapeName: "AWSGlueDataBrew",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "databrew" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-07-25");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
            return e(`https://databrew-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://databrew.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://databrew.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://databrew.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DataBrewRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<DataBrewRoleNotAssumable>()(
    "DataBrewRoleNotAssumable",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "is not a trusted entity for the data access role" },
    }),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()("TooManyRequestsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type InputFormat = "CSV" | "JSON" | "PARQUET" | "EXCEL" | "ORC" | (string & {});
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
  input: __S(864, __c54, 0) as any as S.Schema<BatchDeleteRecipeVersionRequest>,
  output: __S(867, __c54, 3) as any as S.Schema<BatchDeleteRecipeVersionResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteRecipeVersion",
}));

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
  input: __S(896, __c56, 0) as any as S.Schema<CreateDatasetRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateDatasetResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateProfileJobRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateProfileJobResponse>,
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
}));

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
  input: __S(64, __c4, 0) as any as S.Schema<CreateProjectRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateProjectResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<CreateRecipeRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateRecipeResponse>,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecipe",
}));

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
  input: __S(144, __c9, 0) as any as S.Schema<CreateRecipeJobRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateRecipeJobResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<CreateRulesetRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateRulesetResponse>,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleset",
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<CreateScheduleRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateScheduleResponse>,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchedule",
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<DeleteDatasetRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<DeleteDatasetResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<DeleteJobRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<DeleteJobResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<DeleteProjectRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<DeleteProjectResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<DeleteRecipeVersionRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<DeleteRecipeVersionResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecipeVersion",
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<DeleteRulesetRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<DeleteRulesetResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleset",
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<DeleteScheduleRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<DeleteScheduleResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedule",
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<DescribeDatasetRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<DescribeDatasetResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<DescribeJobRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<DescribeJobResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<DescribeJobRunRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<DescribeJobRunResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobRun",
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<DescribeProjectRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<DescribeProjectResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProject",
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<DescribeRecipeRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<DescribeRecipeResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRecipe",
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<DescribeRulesetRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<DescribeRulesetResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleset",
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<DescribeScheduleRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<DescribeScheduleResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedule",
}));

export type ListDatasetsError = ValidationException | TooManyRequestsException | CommonErrors;
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
  input: __S(448, __c28, 0) as any as S.Schema<ListDatasetsRequest>,
  output: __S(451, __c28, 3) as any as S.Schema<ListDatasetsResponse>,
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
  input: __S(464, __c29, 0) as any as S.Schema<ListJobRunsRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListJobRunsResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
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

export type ListJobsError = ValidationException | TooManyRequestsException | CommonErrors;
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
  input: __S(480, __c30, 0) as any as S.Schema<ListJobsRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<ListJobsResponse>,
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

export type ListProjectsError = ValidationException | TooManyRequestsException | CommonErrors;
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
  input: __S(496, __c31, 0) as any as S.Schema<ListProjectsRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListProjectsResponse>,
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

export type ListRecipesError = ValidationException | TooManyRequestsException | CommonErrors;
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
  input: __S(512, __c32, 0) as any as S.Schema<ListRecipesRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<ListRecipesResponse>,
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
  input: __S(544, __c34, 0) as any as S.Schema<ListRecipeVersionsRequest>,
  output: __S(545, __c34, 1) as any as S.Schema<ListRecipeVersionsResponse>,
  errors: [ValidationException, TooManyRequestsException, ResourceNotFoundException],
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
  input: __S(560, __c35, 0) as any as S.Schema<ListRulesetsRequest>,
  output: __S(563, __c35, 3) as any as S.Schema<ListRulesetsResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
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

export type ListSchedulesError = ValidationException | TooManyRequestsException | CommonErrors;
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
  input: __S(576, __c36, 0) as any as S.Schema<ListSchedulesRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<ListSchedulesResponse>,
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
  input: __S(592, __c37, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<PublishRecipeRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<PublishRecipeResponse>,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishRecipe",
}));

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
  input: __S(625, __c39, 1) as any as S.Schema<SendProjectSessionActionRequest>,
  output: __S(626, __c39, 2) as any as S.Schema<SendProjectSessionActionResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendProjectSessionAction",
}));

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
  input: __S(640, __c40, 0) as any as S.Schema<StartJobRunRequest>,
  output: __S(656, __c41, 0) as any as S.Schema<StartJobRunResponse>,
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
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<StartProjectSessionRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<StartProjectSessionResponse>,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartProjectSession",
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<StopJobRunRequest>,
  output: __S(656, __c41, 0) as any as S.Schema<StopJobRunResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopJobRun",
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(736, __c46, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(720, __c45, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<UpdateDatasetRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<UpdateDatasetResponse>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<UpdateProfileJobRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<UpdateProfileJobResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<UpdateProjectRequest>,
  output: __S(785, __c49, 1) as any as S.Schema<UpdateProjectResponse>,
  errors: [
    ResourceNotFoundException,
    ValidationException,
    TooManyRequestsException,
    DataBrewRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
}));

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
  input: __S(800, __c50, 0) as any as S.Schema<UpdateRecipeRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<UpdateRecipeResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecipe",
}));

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
  input: __S(816, __c51, 0) as any as S.Schema<UpdateRecipeJobRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<UpdateRecipeJobResponse>,
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
}));

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
  input: __S(832, __c52, 0) as any as S.Schema<UpdateRulesetRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<UpdateRulesetResponse>,
  errors: [ResourceNotFoundException, ValidationException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleset",
}));

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
  input: __S(848, __c53, 0) as any as S.Schema<UpdateScheduleRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<UpdateScheduleResponse>,
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchedule",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.String,
          EncryptionKeyArn: S.optional(S.String),
          EncryptionMode: S.optional(S.String),
          Name: S.String,
          LogSubscription: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          OutputLocation: __S(944, __c59, 0),
          Configuration: S.optional(__S(56, __c3, 8)),
          ValidationConfigurations: S.optional(__S(33, __c2, 1)),
          RoleArn: S.String,
          Tags: S.optional(__S(928, __c58, 0)),
          Timeout: S.optional(S.Number),
          JobSample: S.optional(__S(34, __c2, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/profileJobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateProfileJobRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Regex: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "ColumnSelector" });
    case 1:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RulesetArn: S.String, ValidationMode: S.optional(S.String) }),
      ).annotate({ identifier: "ValidationConfiguration" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Mode: S.optional(S.String), Size: S.optional(S.Number) }),
      ).annotate({ identifier: "JobSample" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Statistic: S.String, Parameters: __S(928, __c58, 0) }),
      ).annotate({ identifier: "StatisticOverride" });
    case 1:
      return S.Array(__S(48, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IncludedStatistics: S.optional(__S(880, __c55, 0)),
          Overrides: S.optional(__S(49, __c3, 1)),
        }),
      ).annotate({ identifier: "StatisticsConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Selectors: S.optional(__S(17, __c1, 1)), Statistics: __S(50, __c3, 2) }),
      ).annotate({ identifier: "ColumnStatisticsConfiguration" });
    case 4:
      return S.Array(__S(51, __c3, 3));
    case 5:
      return S.suspend(() => S.Struct({ Statistics: __S(880, __c55, 0) })).annotate({
        identifier: "AllowedStatistics",
      });
    case 6:
      return S.Array(__S(53, __c3, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          EntityTypes: __S(880, __c55, 0),
          AllowedStatistics: S.optional(__S(54, __c3, 6)),
        }),
      ).annotate({ identifier: "EntityDetectorConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DatasetStatisticsConfiguration: S.optional(__S(50, __c3, 2)),
          ProfileColumns: S.optional(__S(17, __c1, 1)),
          ColumnStatisticsConfigurations: S.optional(__S(52, __c3, 4)),
          EntityDetectorConfiguration: S.optional(__S(55, __c3, 7)),
        }),
      ).annotate({ identifier: "ProfileConfiguration" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.String,
          Name: S.String,
          RecipeName: S.String,
          Sample: S.optional(__S(80, __c5, 0)),
          RoleArn: S.String,
          Tags: S.optional(__S(928, __c58, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/projects" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProjectRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Size: S.optional(S.Number), Type: S.String })).annotate({
        identifier: "Sample",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Name: S.String,
          Steps: __S(128, __c8, 0),
          Tags: S.optional(__S(928, __c58, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/recipes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRecipeRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Operation: S.String, Parameters: S.optional(__S(928, __c58, 0)) }),
      ).annotate({ identifier: "RecipeAction" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Condition: S.String, Value: S.optional(S.String), TargetColumn: S.String }),
      ).annotate({ identifier: "ConditionExpression" });
    case 2:
      return S.Array(__S(113, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Action: __S(112, __c7, 0),
          ConditionExpressions: S.optional(__S(114, __c7, 2)),
        }),
      ).annotate({ identifier: "RecipeStep" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(115, __c7, 3));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          EncryptionMode: S.optional(S.String),
          Name: S.String,
          LogSubscription: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          Outputs: S.optional(__S(179, __c11, 3)),
          DataCatalogOutputs: S.optional(__S(183, __c11, 7)),
          DatabaseOutputs: S.optional(__S(185, __c11, 9)),
          ProjectName: S.optional(S.String),
          RecipeReference: S.optional(__S(160, __c10, 0)),
          RoleArn: S.String,
          Tags: S.optional(__S(928, __c58, 0)),
          Timeout: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/recipeJobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRecipeJobRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, RecipeVersion: S.optional(S.String) }),
      ).annotate({ identifier: "RecipeReference" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Delimiter: S.optional(S.String) })).annotate({
        identifier: "CsvOutputOptions",
      });
    case 1:
      return S.suspend(() => S.Struct({ Csv: S.optional(__S(176, __c11, 0)) })).annotate({
        identifier: "OutputFormatOptions",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CompressionFormat: S.optional(S.String),
          Format: S.optional(S.String),
          PartitionColumns: S.optional(__S(880, __c55, 0)),
          Location: __S(944, __c59, 0),
          Overwrite: S.optional(S.Boolean),
          FormatOptions: S.optional(__S(177, __c11, 1)),
          MaxOutputFiles: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Output" });
    case 3:
      return S.Array(__S(178, __c11, 2));
    case 4:
      return S.suspend(() => S.Struct({ Location: __S(944, __c59, 0) })).annotate({
        identifier: "S3TableOutputOptions",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ TempDirectory: S.optional(__S(944, __c59, 0)), TableName: S.String }),
      ).annotate({ identifier: "DatabaseTableOutputOptions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          S3Options: S.optional(__S(180, __c11, 4)),
          DatabaseOptions: S.optional(__S(181, __c11, 5)),
          Overwrite: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DataCatalogOutput" });
    case 7:
      return S.Array(__S(182, __c11, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          GlueConnectionName: S.String,
          DatabaseOptions: __S(181, __c11, 5),
          DatabaseOutputMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatabaseOutput" });
    case 9:
      return S.Array(__S(184, __c11, 8));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          TargetArn: S.String,
          Rules: __S(210, __c13, 2),
          Tags: S.optional(__S(928, __c58, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/rulesets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRulesetRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.Number, Type: S.optional(S.String), Unit: S.optional(S.String) }),
      ).annotate({ identifier: "Threshold" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Disabled: S.optional(S.Boolean),
          CheckExpression: S.String,
          SubstitutionMap: S.optional(__S(928, __c58, 0)),
          Threshold: S.optional(__S(208, __c13, 0)),
          ColumnSelectors: S.optional(__S(17, __c1, 1)),
        }),
      ).annotate({ identifier: "Rule" });
    case 2:
      return S.Array(__S(209, __c13, 1));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobNames: S.optional(__S(880, __c55, 0)),
          CronExpression: S.String,
          Tags: S.optional(__S(928, __c58, 0)),
          Name: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/schedules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScheduleRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/datasets/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDatasetRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/jobs/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteJobRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/projects/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProjectRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          RecipeVersion: S.String.pipe(T.HttpLabel("RecipeVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/recipes/{Name}/recipeVersion/{RecipeVersion}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecipeVersionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.String, RecipeVersion: S.String })).annotate({
        identifier: "DeleteRecipeVersionResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/rulesets/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRulesetRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/schedules/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScheduleRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/datasets/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDatasetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedBy: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.String,
          Format: S.optional(S.String),
          FormatOptions: S.optional(__S(964, __c60, 4)),
          Input: __S(968, __c60, 8),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          Source: S.optional(S.String),
          PathOptions: S.optional(__S(974, __c60, 14)),
          Tags: S.optional(__S(928, __c58, 0)),
          ResourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeDatasetResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/jobs/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          DatasetName: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          EncryptionMode: S.optional(S.String),
          Name: S.String,
          Type: S.optional(S.String),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LogSubscription: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          Outputs: S.optional(__S(179, __c11, 3)),
          DataCatalogOutputs: S.optional(__S(183, __c11, 7)),
          DatabaseOutputs: S.optional(__S(185, __c11, 9)),
          ProjectName: S.optional(S.String),
          ProfileConfiguration: S.optional(__S(56, __c3, 8)),
          ValidationConfigurations: S.optional(__S(33, __c2, 1)),
          RecipeReference: S.optional(__S(160, __c10, 0)),
          ResourceArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Tags: S.optional(__S(928, __c58, 0)),
          Timeout: S.optional(S.Number),
          JobSample: S.optional(__S(34, __c2, 2)),
        }),
      ).annotate({ identifier: "DescribeJobResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          RunId: S.String.pipe(T.HttpLabel("RunId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/jobs/{Name}/jobRun/{RunId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeJobRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Attempt: S.optional(S.Number),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DatasetName: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ExecutionTime: S.optional(S.Number),
          JobName: S.String,
          ProfileConfiguration: S.optional(__S(56, __c3, 8)),
          ValidationConfigurations: S.optional(__S(33, __c2, 1)),
          RunId: S.optional(S.String),
          State: S.optional(S.String),
          LogSubscription: S.optional(S.String),
          LogGroupName: S.optional(S.String),
          Outputs: S.optional(__S(179, __c11, 3)),
          DataCatalogOutputs: S.optional(__S(183, __c11, 7)),
          DatabaseOutputs: S.optional(__S(185, __c11, 9)),
          RecipeReference: S.optional(__S(160, __c10, 0)),
          StartedBy: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobSample: S.optional(__S(34, __c2, 2)),
        }),
      ).annotate({ identifier: "DescribeJobRunResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/projects/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeProjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          DatasetName: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          Name: S.String,
          RecipeName: S.optional(S.String),
          ResourceArn: S.optional(S.String),
          Sample: S.optional(__S(80, __c5, 0)),
          RoleArn: S.optional(S.String),
          Tags: S.optional(__S(928, __c58, 0)),
          SessionStatus: S.optional(S.String),
          OpenedBy: S.optional(S.String),
          OpenDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DescribeProjectResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          RecipeVersion: S.optional(S.String).pipe(T.HttpQuery("recipeVersion")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/recipes/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRecipeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedBy: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProjectName: S.optional(S.String),
          PublishedBy: S.optional(S.String),
          PublishedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Name: S.String,
          Steps: S.optional(__S(128, __c8, 0)),
          Tags: S.optional(__S(928, __c58, 0)),
          ResourceArn: S.optional(S.String),
          RecipeVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRecipeResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/rulesets/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeRulesetRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          TargetArn: S.optional(S.String),
          Rules: S.optional(__S(210, __c13, 2)),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceArn: S.optional(S.String),
          Tags: S.optional(__S(928, __c58, 0)),
        }),
      ).annotate({ identifier: "DescribeRulesetResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/schedules/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeScheduleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          JobNames: S.optional(__S(880, __c55, 0)),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceArn: S.optional(S.String),
          CronExpression: S.optional(S.String),
          Tags: S.optional(__S(928, __c58, 0)),
          Name: S.String,
        }),
      ).annotate({ identifier: "DescribeScheduleResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/datasets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDatasetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.String,
          Format: S.optional(S.String),
          FormatOptions: S.optional(__S(964, __c60, 4)),
          Input: __S(968, __c60, 8),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          Source: S.optional(S.String),
          PathOptions: S.optional(__S(974, __c60, 14)),
          Tags: S.optional(__S(928, __c58, 0)),
          ResourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Dataset" });
    case 2:
      return S.Array(__S(449, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Datasets: __S(450, __c28, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDatasetsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/jobs/{Name}/jobRuns" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListJobRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Attempt: S.optional(S.Number),
          CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DatasetName: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ExecutionTime: S.optional(S.Number),
          JobName: S.optional(S.String),
          RunId: S.optional(S.String),
          State: S.optional(S.String),
          LogSubscription: S.optional(S.String),
          LogGroupName: S.optional(S.String),
          Outputs: S.optional(__S(179, __c11, 3)),
          DataCatalogOutputs: S.optional(__S(183, __c11, 7)),
          DatabaseOutputs: S.optional(__S(185, __c11, 9)),
          RecipeReference: S.optional(__S(160, __c10, 0)),
          StartedBy: S.optional(S.String),
          StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobSample: S.optional(__S(34, __c2, 2)),
          ValidationConfigurations: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "JobRun" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ JobRuns: __S(466, __c29, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobRunsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatasetName: S.optional(S.String).pipe(T.HttpQuery("datasetName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          ProjectName: S.optional(S.String).pipe(T.HttpQuery("projectName")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/jobs" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DatasetName: S.optional(S.String),
          EncryptionKeyArn: S.optional(S.String),
          EncryptionMode: S.optional(S.String),
          Name: S.String,
          Type: S.optional(S.String),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LogSubscription: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          Outputs: S.optional(__S(179, __c11, 3)),
          DataCatalogOutputs: S.optional(__S(183, __c11, 7)),
          DatabaseOutputs: S.optional(__S(185, __c11, 9)),
          ProjectName: S.optional(S.String),
          RecipeReference: S.optional(__S(160, __c10, 0)),
          ResourceArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          Timeout: S.optional(S.Number),
          Tags: S.optional(__S(928, __c58, 0)),
          JobSample: S.optional(__S(34, __c2, 2)),
          ValidationConfigurations: S.optional(__S(33, __c2, 1)),
        }),
      ).annotate({ identifier: "Job" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Jobs: __S(482, __c30, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListJobsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/projects" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProjectsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          CreatedBy: S.optional(S.String),
          DatasetName: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          Name: S.String,
          RecipeName: S.String,
          ResourceArn: S.optional(S.String),
          Sample: S.optional(__S(80, __c5, 0)),
          Tags: S.optional(__S(928, __c58, 0)),
          RoleArn: S.optional(S.String),
          OpenedBy: S.optional(S.String),
          OpenDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Project" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Projects: __S(498, __c31, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProjectsResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          RecipeVersion: S.optional(S.String).pipe(T.HttpQuery("recipeVersion")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/recipes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRecipesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Recipes: __S(529, __c33, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRecipesResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatedBy: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ProjectName: S.optional(S.String),
          PublishedBy: S.optional(S.String),
          PublishedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          Name: S.String,
          ResourceArn: S.optional(S.String),
          Steps: S.optional(__S(128, __c8, 0)),
          Tags: S.optional(__S(928, __c58, 0)),
          RecipeVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "Recipe" });
    case 1:
      return S.Array(__S(528, __c33, 0));
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          Name: S.String.pipe(T.HttpQuery("name")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/recipeVersions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRecipeVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Recipes: __S(529, __c33, 1) }),
      ).annotate({ identifier: "ListRecipeVersionsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetArn: S.optional(S.String).pipe(T.HttpQuery("targetArn")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/rulesets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRulesetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.String,
          ResourceArn: S.optional(S.String),
          RuleCount: S.optional(S.Number),
          Tags: S.optional(__S(928, __c58, 0)),
          TargetArn: S.String,
        }),
      ).annotate({ identifier: "RulesetItem" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Rulesets: __S(562, __c35, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRulesetsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobName: S.optional(S.String).pipe(T.HttpQuery("jobName")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/schedules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSchedulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          JobNames: S.optional(__S(880, __c55, 0)),
          LastModifiedBy: S.optional(S.String),
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResourceArn: S.optional(S.String),
          CronExpression: S.optional(S.String),
          Tags: S.optional(__S(928, __c58, 0)),
          Name: S.String,
        }),
      ).annotate({ identifier: "Schedule" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Schedules: __S(578, __c36, 2), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSchedulesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(928, __c58, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/recipes/{Name}/publishRecipe" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishRecipeRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartColumnIndex: S.Number,
          ColumnRange: S.optional(S.Number),
          HiddenColumns: S.optional(__S(880, __c55, 0)),
          StartRowIndex: S.optional(S.Number),
          RowRange: S.optional(S.Number),
          Analytics: S.optional(S.String),
        }),
      ).annotate({ identifier: "ViewFrame" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Preview: S.optional(S.Boolean),
          Name: S.String.pipe(T.HttpLabel("Name")),
          RecipeStep: S.optional(__S(115, __c7, 3)),
          StepIndex: S.optional(S.Number),
          ClientSessionId: S.optional(SensitiveString),
          ViewFrame: S.optional(__S(624, __c39, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/projects/{Name}/sendProjectSessionAction" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendProjectSessionActionRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Result: S.optional(S.String), Name: S.String, ActionId: S.optional(S.Number) }),
      ).annotate({ identifier: "SendProjectSessionActionResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/jobs/{Name}/startJobRun" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartJobRunRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RunId: S.String })).annotate({
        identifier: "StartJobRunResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          AssumeControl: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/projects/{Name}/startProjectSession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartProjectSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.String, ClientSessionId: S.optional(SensitiveString) }),
      ).annotate({ identifier: "StartProjectSessionResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          RunId: S.String.pipe(T.HttpLabel("RunId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/jobs/{Name}/jobRun/{RunId}/stopJobRun" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopJobRunRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(928, __c58, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(880, __c55, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Format: S.optional(S.String),
          FormatOptions: S.optional(__S(964, __c60, 4)),
          Input: __S(968, __c60, 8),
          PathOptions: S.optional(__S(974, __c60, 14)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/datasets/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDatasetRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Configuration: S.optional(__S(56, __c3, 8)),
          EncryptionKeyArn: S.optional(S.String),
          EncryptionMode: S.optional(S.String),
          Name: S.String.pipe(T.HttpLabel("Name")),
          LogSubscription: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          OutputLocation: __S(944, __c59, 0),
          ValidationConfigurations: S.optional(__S(33, __c2, 1)),
          RoleArn: S.String,
          Timeout: S.optional(S.Number),
          JobSample: S.optional(__S(34, __c2, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/profileJobs/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProfileJobRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Sample: S.optional(__S(80, __c5, 0)),
          RoleArn: S.String,
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/projects/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateProjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LastModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.String,
        }),
      ).annotate({ identifier: "UpdateProjectResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Name: S.String.pipe(T.HttpLabel("Name")),
          Steps: S.optional(__S(128, __c8, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/recipes/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRecipeRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EncryptionKeyArn: S.optional(S.String),
          EncryptionMode: S.optional(S.String),
          Name: S.String.pipe(T.HttpLabel("Name")),
          LogSubscription: S.optional(S.String),
          MaxCapacity: S.optional(S.Number),
          MaxRetries: S.optional(S.Number),
          Outputs: S.optional(__S(179, __c11, 3)),
          DataCatalogOutputs: S.optional(__S(183, __c11, 7)),
          DatabaseOutputs: S.optional(__S(185, __c11, 9)),
          RoleArn: S.String,
          Timeout: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/recipeJobs/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRecipeJobRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Description: S.optional(S.String),
          Rules: __S(210, __c13, 2),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/rulesets/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRulesetRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          JobNames: S.optional(__S(880, __c55, 0)),
          CronExpression: S.String,
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/schedules/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateScheduleRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          RecipeVersions: __S(880, __c55, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/recipes/{Name}/batchDeleteRecipeVersion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteRecipeVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          RecipeVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecipeVersionErrorDetail" });
    case 2:
      return S.Array(__S(865, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Errors: S.optional(__S(866, __c54, 2)) }),
      ).annotate({ identifier: "BatchDeleteRecipeVersionResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Format: S.optional(S.String),
          FormatOptions: S.optional(__S(964, __c60, 4)),
          Input: __S(968, __c60, 8),
          PathOptions: S.optional(__S(974, __c60, 14)),
          Tags: S.optional(__S(928, __c58, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/datasets" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatasetRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String })).annotate({
        identifier: "CreateDatasetResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String,
          Key: S.optional(S.String),
          BucketOwner: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Location" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MultiLine: S.optional(S.Boolean) })).annotate({
        identifier: "JsonOptions",
      });
    case 1:
      return S.Array(S.Number);
    case 2:
      return S.suspend(() =>
        S.Struct({
          SheetNames: S.optional(__S(880, __c55, 0)),
          SheetIndexes: S.optional(__S(961, __c60, 1)),
          HeaderRow: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ExcelOptions" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Delimiter: S.optional(S.String), HeaderRow: S.optional(S.Boolean) }),
      ).annotate({ identifier: "CsvOptions" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Json: S.optional(__S(960, __c60, 0)),
          Excel: S.optional(__S(962, __c60, 2)),
          Csv: S.optional(__S(963, __c60, 3)),
        }),
      ).annotate({ identifier: "FormatOptions" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          CatalogId: S.optional(S.String),
          DatabaseName: S.String,
          TableName: S.String,
          TempDirectory: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "DataCatalogInputDefinition" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          GlueConnectionName: S.String,
          DatabaseTableName: S.optional(S.String),
          TempDirectory: S.optional(__S(944, __c59, 0)),
          QueryString: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatabaseInputDefinition" });
    case 7:
      return S.suspend(() => S.Struct({ SourceArn: S.optional(S.String) })).annotate({
        identifier: "Metadata",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          S3InputDefinition: S.optional(__S(944, __c59, 0)),
          DataCatalogInputDefinition: S.optional(__S(965, __c60, 5)),
          DatabaseInputDefinition: S.optional(__S(966, __c60, 6)),
          Metadata: S.optional(__S(967, __c60, 7)),
        }),
      ).annotate({ identifier: "Input" });
    case 9:
      return S.suspend(() =>
        S.Struct({ Expression: S.String, ValuesMap: __S(928, __c58, 0) }),
      ).annotate({ identifier: "FilterExpression" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          MaxFiles: S.Number,
          OrderedBy: S.optional(S.String),
          Order: S.optional(S.String),
        }),
      ).annotate({ identifier: "FilesLimit" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Format: S.String,
          TimezoneOffset: S.optional(S.String),
          LocaleCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "DatetimeOptions" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Type: S.String,
          DatetimeOptions: S.optional(__S(971, __c60, 11)),
          CreateColumn: S.optional(S.Boolean),
          Filter: S.optional(__S(969, __c60, 9)),
        }),
      ).annotate({ identifier: "DatasetParameter" });
    case 13:
      return S.Record(S.String, /*@__PURE__*/ __S(972, __c60, 12).pipe(S.optional));
    case 14:
      return S.suspend(() =>
        S.Struct({
          LastModifiedDateCondition: S.optional(__S(969, __c60, 9)),
          FilesLimit: S.optional(__S(970, __c60, 10)),
          Parameters: S.optional(__S(973, __c60, 13)),
        }),
      ).annotate({ identifier: "PathOptions" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
