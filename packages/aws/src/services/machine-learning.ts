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
const ns = /*@__PURE__*/ T.XmlNamespace("http://machinelearning.amazonaws.com/doc/2014-12-12/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Machine Learning",
  serviceShapeName: "AmazonML_20141212",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "machinelearning" });
const ver = /*@__PURE__*/ T.ServiceVersion("2014-12-12");
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
              `https://machinelearning-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://machinelearning-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://machinelearning.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://machinelearning.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://machinelearning.{R}.{D}","properties":{},"headers":{}}');

export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()("InvalidTagException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(417),
  ) {}
export class PredictorNotMountedException
  extends /*@__PURE__*/ S.TaggedError<PredictorNotMountedException>()(
    "PredictorNotMountedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      code: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TagLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededException>()("TagLimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export type EntityId = string;
export type TaggableResourceType =
  | "BatchPrediction"
  | "DataSource"
  | "Evaluation"
  | "MLModel"
  | (string & {});
export interface AddTagsInput {
  Tags: Tag[];
  ResourceId: string;
  ResourceType: TaggableResourceType;
}
export interface AddTagsOutput {
  ResourceId?: string;
  ResourceType?: TaggableResourceType;
}
export type EntityName = string;
export type S3Url = string;
export interface CreateBatchPredictionInput {
  BatchPredictionId: string;
  BatchPredictionName?: string;
  MLModelId: string;
  BatchPredictionDataSourceId: string;
  OutputUri: string;
}
export interface CreateBatchPredictionOutput {
  BatchPredictionId?: string;
}
export type RDSInstanceIdentifier = string;
export type RDSDatabaseName = string;
export interface RDSDatabase {
  InstanceIdentifier: string;
  DatabaseName: string;
}
export type RDSSelectSqlQuery = string;
export type RDSDatabaseUsername = string;
export type RDSDatabasePassword = string | redacted.Redacted<string>;
export interface RDSDatabaseCredentials {
  Username: string;
  Password: string | redacted.Redacted<string>;
}
export type DataRearrangement = string;
export type DataSchema = string;
export type EDPResourceRole = string;
export type EDPServiceRole = string;
export type EDPSubnetId = string;
export type EDPSecurityGroupId = string;
export type EDPSecurityGroupIds = string[];
export interface RDSDataSpec {
  DatabaseInformation: RDSDatabase;
  SelectSqlQuery: string;
  DatabaseCredentials: RDSDatabaseCredentials;
  S3StagingLocation: string;
  DataRearrangement?: string;
  DataSchema?: string;
  DataSchemaUri?: string;
  ResourceRole: string;
  ServiceRole: string;
  SubnetId: string;
  SecurityGroupIds: string[];
}
export type RoleARN = string;
export type ComputeStatistics = boolean;
export interface CreateDataSourceFromRDSInput {
  DataSourceId: string;
  DataSourceName?: string;
  RDSData: RDSDataSpec;
  RoleARN: string;
  ComputeStatistics?: boolean;
}
export interface CreateDataSourceFromRDSOutput {
  DataSourceId?: string;
}
export type RedshiftDatabaseName = string;
export type RedshiftClusterIdentifier = string;
export interface RedshiftDatabase {
  DatabaseName: string;
  ClusterIdentifier: string;
}
export type RedshiftSelectSqlQuery = string;
export type RedshiftDatabaseUsername = string;
export type RedshiftDatabasePassword = string | redacted.Redacted<string>;
export interface RedshiftDatabaseCredentials {
  Username: string;
  Password: string | redacted.Redacted<string>;
}
export interface RedshiftDataSpec {
  DatabaseInformation: RedshiftDatabase;
  SelectSqlQuery: string;
  DatabaseCredentials: RedshiftDatabaseCredentials;
  S3StagingLocation: string;
  DataRearrangement?: string;
  DataSchema?: string;
  DataSchemaUri?: string;
}
export interface CreateDataSourceFromRedshiftInput {
  DataSourceId: string;
  DataSourceName?: string;
  DataSpec: RedshiftDataSpec;
  RoleARN: string;
  ComputeStatistics?: boolean;
}
export interface CreateDataSourceFromRedshiftOutput {
  DataSourceId?: string;
}
export interface S3DataSpec {
  DataLocationS3: string;
  DataRearrangement?: string;
  DataSchema?: string;
  DataSchemaLocationS3?: string;
}
export interface CreateDataSourceFromS3Input {
  DataSourceId: string;
  DataSourceName?: string;
  DataSpec: S3DataSpec;
  ComputeStatistics?: boolean;
}
export interface CreateDataSourceFromS3Output {
  DataSourceId?: string;
}
export interface CreateEvaluationInput {
  EvaluationId: string;
  EvaluationName?: string;
  MLModelId: string;
  EvaluationDataSourceId: string;
}
export interface CreateEvaluationOutput {
  EvaluationId?: string;
}
export type MLModelType = "REGRESSION" | "BINARY" | "MULTICLASS" | (string & {});
export type StringType = string;
export type TrainingParameters = { [key: string]: string | undefined };
export type Recipe = string;
export interface CreateMLModelInput {
  MLModelId: string;
  MLModelName?: string;
  MLModelType: MLModelType;
  Parameters?: { [key: string]: string | undefined };
  TrainingDataSourceId: string;
  Recipe?: string;
  RecipeUri?: string;
}
export interface CreateMLModelOutput {
  MLModelId?: string;
}
export interface CreateRealtimeEndpointInput {
  MLModelId: string;
}
export type IntegerType = number;
export type EpochTime = Date;
export type VipURL = string;
export type RealtimeEndpointStatus = "NONE" | "READY" | "UPDATING" | "FAILED" | (string & {});
export interface RealtimeEndpointInfo {
  PeakRequestsPerSecond?: number;
  CreatedAt?: Date;
  EndpointUrl?: string;
  EndpointStatus?: RealtimeEndpointStatus;
}
export interface CreateRealtimeEndpointOutput {
  MLModelId?: string;
  RealtimeEndpointInfo?: RealtimeEndpointInfo;
}
export interface DeleteBatchPredictionInput {
  BatchPredictionId: string;
}
export interface DeleteBatchPredictionOutput {
  BatchPredictionId?: string;
}
export interface DeleteDataSourceInput {
  DataSourceId: string;
}
export interface DeleteDataSourceOutput {
  DataSourceId?: string;
}
export interface DeleteEvaluationInput {
  EvaluationId: string;
}
export interface DeleteEvaluationOutput {
  EvaluationId?: string;
}
export interface DeleteMLModelInput {
  MLModelId: string;
}
export interface DeleteMLModelOutput {
  MLModelId?: string;
}
export interface DeleteRealtimeEndpointInput {
  MLModelId: string;
}
export interface DeleteRealtimeEndpointOutput {
  MLModelId?: string;
  RealtimeEndpointInfo?: RealtimeEndpointInfo;
}
export type TagKeyList = string[];
export interface DeleteTagsInput {
  TagKeys: string[];
  ResourceId: string;
  ResourceType: TaggableResourceType;
}
export interface DeleteTagsOutput {
  ResourceId?: string;
  ResourceType?: TaggableResourceType;
}
export type BatchPredictionFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "IAMUser"
  | "MLModelId"
  | "DataSourceId"
  | "DataURI"
  | (string & {});
export type ComparatorValue = string;
export type SortOrder = "asc" | "dsc" | (string & {});
export type PageLimit = number;
export interface DescribeBatchPredictionsInput {
  FilterVariable?: BatchPredictionFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export type AwsUserArn = string;
export type EntityStatus =
  | "PENDING"
  | "INPROGRESS"
  | "FAILED"
  | "COMPLETED"
  | "DELETED"
  | (string & {});
export type Message = string;
export type LongType = number;
export interface BatchPrediction {
  BatchPredictionId?: string;
  MLModelId?: string;
  BatchPredictionDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  OutputUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  TotalRecordCount?: number;
  InvalidRecordCount?: number;
}
export type BatchPredictions = BatchPrediction[];
export interface DescribeBatchPredictionsOutput {
  Results?: BatchPrediction[];
  NextToken?: string;
}
export type DataSourceFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "DataLocationS3"
  | "IAMUser"
  | (string & {});
export interface DescribeDataSourcesInput {
  FilterVariable?: DataSourceFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export interface RedshiftMetadata {
  RedshiftDatabase?: RedshiftDatabase;
  DatabaseUserName?: string;
  SelectSqlQuery?: string;
}
export type EDPPipelineId = string;
export interface RDSMetadata {
  Database?: RDSDatabase;
  DatabaseUserName?: string;
  SelectSqlQuery?: string;
  ResourceRole?: string;
  ServiceRole?: string;
  DataPipelineId?: string;
}
export interface DataSource {
  DataSourceId?: string;
  DataLocationS3?: string;
  DataRearrangement?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  DataSizeInBytes?: number;
  NumberOfFiles?: number;
  Name?: string;
  Status?: EntityStatus;
  Message?: string;
  RedshiftMetadata?: RedshiftMetadata;
  RDSMetadata?: RDSMetadata;
  RoleARN?: string;
  ComputeStatistics?: boolean;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export type DataSources = DataSource[];
export interface DescribeDataSourcesOutput {
  Results?: DataSource[];
  NextToken?: string;
}
export type EvaluationFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "IAMUser"
  | "MLModelId"
  | "DataSourceId"
  | "DataURI"
  | (string & {});
export interface DescribeEvaluationsInput {
  FilterVariable?: EvaluationFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export type PerformanceMetricsPropertyKey = string;
export type PerformanceMetricsPropertyValue = string;
export type PerformanceMetricsProperties = { [key: string]: string | undefined };
export interface PerformanceMetrics {
  Properties?: { [key: string]: string | undefined };
}
export interface Evaluation {
  EvaluationId?: string;
  MLModelId?: string;
  EvaluationDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  PerformanceMetrics?: PerformanceMetrics;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export type Evaluations = Evaluation[];
export interface DescribeEvaluationsOutput {
  Results?: Evaluation[];
  NextToken?: string;
}
export type MLModelFilterVariable =
  | "CreatedAt"
  | "LastUpdatedAt"
  | "Status"
  | "Name"
  | "IAMUser"
  | "TrainingDataSourceId"
  | "RealtimeEndpointStatus"
  | "MLModelType"
  | "Algorithm"
  | "TrainingDataURI"
  | (string & {});
export interface DescribeMLModelsInput {
  FilterVariable?: MLModelFilterVariable;
  EQ?: string;
  GT?: string;
  LT?: string;
  GE?: string;
  LE?: string;
  NE?: string;
  Prefix?: string;
  SortOrder?: SortOrder;
  NextToken?: string;
  Limit?: number;
}
export type MLModelName = string;
export type Algorithm = "sgd" | (string & {});
export type ScoreThreshold = number;
export interface MLModel {
  MLModelId?: string;
  TrainingDataSourceId?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  SizeInBytes?: number;
  EndpointInfo?: RealtimeEndpointInfo;
  TrainingParameters?: { [key: string]: string | undefined };
  InputDataLocationS3?: string;
  Algorithm?: Algorithm;
  MLModelType?: MLModelType;
  ScoreThreshold?: number;
  ScoreThresholdLastUpdatedAt?: Date;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export type MLModels = MLModel[];
export interface DescribeMLModelsOutput {
  Results?: MLModel[];
  NextToken?: string;
}
export interface DescribeTagsInput {
  ResourceId: string;
  ResourceType: TaggableResourceType;
}
export interface DescribeTagsOutput {
  ResourceId?: string;
  ResourceType?: TaggableResourceType;
  Tags?: Tag[];
}
export interface GetBatchPredictionInput {
  BatchPredictionId: string;
}
export type PresignedS3Url = string;
export interface GetBatchPredictionOutput {
  BatchPredictionId?: string;
  MLModelId?: string;
  BatchPredictionDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  OutputUri?: string;
  LogUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  TotalRecordCount?: number;
  InvalidRecordCount?: number;
}
export type Verbose = boolean;
export interface GetDataSourceInput {
  DataSourceId: string;
  Verbose?: boolean;
}
export interface GetDataSourceOutput {
  DataSourceId?: string;
  DataLocationS3?: string;
  DataRearrangement?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  DataSizeInBytes?: number;
  NumberOfFiles?: number;
  Name?: string;
  Status?: EntityStatus;
  LogUri?: string;
  Message?: string;
  RedshiftMetadata?: RedshiftMetadata;
  RDSMetadata?: RDSMetadata;
  RoleARN?: string;
  ComputeStatistics?: boolean;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  DataSourceSchema?: string;
}
export interface GetEvaluationInput {
  EvaluationId: string;
}
export interface GetEvaluationOutput {
  EvaluationId?: string;
  MLModelId?: string;
  EvaluationDataSourceId?: string;
  InputDataLocationS3?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  PerformanceMetrics?: PerformanceMetrics;
  LogUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
}
export interface GetMLModelInput {
  MLModelId: string;
  Verbose?: boolean;
}
export interface GetMLModelOutput {
  MLModelId?: string;
  TrainingDataSourceId?: string;
  CreatedByIamUser?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Name?: string;
  Status?: EntityStatus;
  SizeInBytes?: number;
  EndpointInfo?: RealtimeEndpointInfo;
  TrainingParameters?: { [key: string]: string | undefined };
  InputDataLocationS3?: string;
  MLModelType?: MLModelType;
  ScoreThreshold?: number;
  ScoreThresholdLastUpdatedAt?: Date;
  LogUri?: string;
  Message?: string;
  ComputeTime?: number;
  FinishedAt?: Date;
  StartedAt?: Date;
  Recipe?: string;
  Schema?: string;
}
export type VariableName = string;
export type VariableValue = string;
export type Record = { [key: string]: string | undefined };
export interface PredictInput {
  MLModelId: string;
  Record: { [key: string]: string | undefined };
  PredictEndpoint: string;
}
export type Label = string;
export type FloatLabel = number;
export type ScoreValue = number;
export type ScoreValuePerLabelMap = { [key: string]: number | undefined };
export type DetailsAttributes = "PredictiveModelType" | "Algorithm" | (string & {});
export type DetailsValue = string;
export type DetailsMap = { [key in DetailsAttributes]?: string };
export interface Prediction {
  predictedLabel?: string;
  predictedValue?: number;
  predictedScores?: { [key: string]: number | undefined };
  details?: { [key: string]: string | undefined };
}
export interface PredictOutput {
  Prediction?: Prediction;
}
export interface UpdateBatchPredictionInput {
  BatchPredictionId: string;
  BatchPredictionName: string;
}
export interface UpdateBatchPredictionOutput {
  BatchPredictionId?: string;
}
export interface UpdateDataSourceInput {
  DataSourceId: string;
  DataSourceName: string;
}
export interface UpdateDataSourceOutput {
  DataSourceId?: string;
}
export interface UpdateEvaluationInput {
  EvaluationId: string;
  EvaluationName: string;
}
export interface UpdateEvaluationOutput {
  EvaluationId?: string;
}
export interface UpdateMLModelInput {
  MLModelId: string;
  MLModelName?: string;
  ScoreThreshold?: number;
}
export interface UpdateMLModelOutput {
  MLModelId?: string;
}
export type ErrorMessage = string;
export type ErrorCode = number;
export type AddTagsError =
  | InternalServerException
  | InvalidInputException
  | InvalidTagException
  | ResourceNotFoundException
  | TagLimitExceededException
  | CommonErrors;
/**
 * Adds one or more tags to an object, up to a limit of 10. Each tag consists of a key
 * and an optional value. If you add a tag using a key that is already associated with the ML object,
 * `AddTags` updates the tag's value.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<AddTagsInput>,
  output: __S(312, __c39, 0) as any as S.Schema<AddTagsOutput>,
  errors: [
    InternalServerException,
    InvalidInputException,
    InvalidTagException,
    ResourceNotFoundException,
    TagLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type CreateBatchPredictionError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Generates predictions for a group of observations. The observations to process exist in one or more data files referenced
 * by a `DataSource`. This operation creates a new `BatchPrediction`, and uses an `MLModel` and the data
 * files referenced by the `DataSource` as information sources.
 *
 * `CreateBatchPrediction` is an asynchronous operation. In response to `CreateBatchPrediction`,
 * Amazon Machine Learning (Amazon ML) immediately returns and sets the `BatchPrediction` status to `PENDING`.
 * After the `BatchPrediction` completes, Amazon ML sets the status to `COMPLETED`.
 *
 * You can poll for status updates by using the GetBatchPrediction operation and checking the `Status` parameter of the result. After the `COMPLETED` status appears,
 * the results are available in the location specified by the `OutputUri` parameter.
 */
export const createBatchPrediction: API.OperationMethod<
  CreateBatchPredictionInput,
  CreateBatchPredictionOutput,
  CreateBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<CreateBatchPredictionInput>,
  output: __S(336, __c42, 0) as any as S.Schema<CreateBatchPredictionOutput>,
  errors: [IdempotentParameterMismatchException, InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchPrediction",
}));

export type CreateDataSourceFromRDSError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a `DataSource` object from an Amazon Relational Database Service (Amazon RDS). A `DataSource` references data that can be used to perform `CreateMLModel`, `CreateEvaluation`, or `CreateBatchPrediction` operations.
 *
 * `CreateDataSourceFromRDS` is an asynchronous operation. In response to `CreateDataSourceFromRDS`,
 * Amazon Machine Learning (Amazon ML) immediately returns and sets the `DataSource` status to `PENDING`.
 * After the `DataSource` is created and ready for use, Amazon ML sets the `Status` parameter to `COMPLETED`.
 * `DataSource` in the `COMPLETED` or `PENDING` state can
 * be used only to perform `>CreateMLModel`>, `CreateEvaluation`, or `CreateBatchPrediction` operations.
 *
 * If Amazon ML cannot accept the input source, it sets the `Status` parameter to `FAILED` and includes an error message in the `Message` attribute of the `GetDataSource` operation response.
 */
export const createDataSourceFromRDS: API.OperationMethod<
  CreateDataSourceFromRDSInput,
  CreateDataSourceFromRDSOutput,
  CreateDataSourceFromRDSError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<CreateDataSourceFromRDSInput>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateDataSourceFromRDSOutput>,
  errors: [IdempotentParameterMismatchException, InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromRDS",
}));

export type CreateDataSourceFromRedshiftError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a `DataSource` from a database hosted on an Amazon Redshift cluster. A
 * `DataSource` references data that can be used to perform either `CreateMLModel`, `CreateEvaluation`, or `CreateBatchPrediction`
 * operations.
 *
 * `CreateDataSourceFromRedshift` is an asynchronous operation. In response to `CreateDataSourceFromRedshift`, Amazon Machine Learning (Amazon ML) immediately returns and sets the `DataSource` status to `PENDING`.
 * After the `DataSource` is created and ready for use, Amazon ML sets the `Status` parameter to `COMPLETED`.
 * `DataSource` in `COMPLETED` or `PENDING` states can be
 * used to perform only `CreateMLModel`, `CreateEvaluation`, or `CreateBatchPrediction` operations.
 *
 * If Amazon ML can't accept the input source, it sets the `Status` parameter to `FAILED` and includes an error message in the `Message`
 * attribute of the `GetDataSource` operation response.
 *
 * The observations should be contained in the database hosted on an Amazon Redshift cluster
 * and should be specified by a `SelectSqlQuery` query. Amazon ML executes an
 * `Unload` command in Amazon Redshift to transfer the result set of
 * the `SelectSqlQuery` query to `S3StagingLocation`.
 *
 * After the `DataSource` has been created, it's ready for use in evaluations and
 * batch predictions. If you plan to use the `DataSource` to train an
 * `MLModel`, the `DataSource` also requires a recipe. A recipe
 * describes how each input variable will be used in training an `MLModel`. Will
 * the variable be included or excluded from training? Will the variable be manipulated;
 * for example, will it be combined with another variable or will it be split apart into
 * word combinations? The recipe provides answers to these questions.
 *
 * You can't change an existing datasource, but you can copy and modify the settings from an
 * existing Amazon Redshift datasource to create a new datasource. To do so, call
 * `GetDataSource` for an existing datasource and copy the values to a
 * `CreateDataSource` call. Change the settings that you want to change and
 * make sure that all required fields have the appropriate values.
 */
export const createDataSourceFromRedshift: API.OperationMethod<
  CreateDataSourceFromRedshiftInput,
  CreateDataSourceFromRedshiftOutput,
  CreateDataSourceFromRedshiftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(41, __c5, 1) as any as S.Schema<CreateDataSourceFromRedshiftInput>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateDataSourceFromRedshiftOutput>,
  errors: [IdempotentParameterMismatchException, InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromRedshift",
}));

export type CreateDataSourceFromS3Error =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a `DataSource` object. A `DataSource` references data that
 * can be used to perform `CreateMLModel`, `CreateEvaluation`, or
 * `CreateBatchPrediction` operations.
 *
 * `CreateDataSourceFromS3` is an asynchronous operation. In response to
 * `CreateDataSourceFromS3`, Amazon Machine Learning (Amazon ML) immediately
 * returns and sets the `DataSource` status to `PENDING`. After the
 * `DataSource` has been created and is ready for use, Amazon ML sets the
 * `Status` parameter to `COMPLETED`. `DataSource` in
 * the `COMPLETED` or `PENDING` state can be used to perform only
 * `CreateMLModel`, `CreateEvaluation` or
 * `CreateBatchPrediction` operations.
 *
 * If Amazon ML can't accept the input source, it sets the `Status` parameter to
 * `FAILED` and includes an error message in the `Message`
 * attribute of the `GetDataSource` operation response.
 *
 * The observation data used in a `DataSource` should be ready to use; that is,
 * it should have a consistent structure, and missing data values should be kept to a
 * minimum. The observation data must reside in one or more .csv files in an Amazon Simple
 * Storage Service (Amazon S3) location, along with a schema that describes the data items
 * by name and type. The same schema must be used for all of the data files referenced by
 * the `DataSource`.
 *
 * After the `DataSource` has been created, it's ready to use in evaluations and
 * batch predictions. If you plan to use the `DataSource` to train an
 * `MLModel`, the `DataSource` also needs a recipe. A recipe
 * describes how each input variable will be used in training an `MLModel`. Will
 * the variable be included or excluded from training? Will the variable be manipulated;
 * for example, will it be combined with another variable or will it be split apart into
 * word combinations? The recipe provides answers to these questions.
 */
export const createDataSourceFromS3: API.OperationMethod<
  CreateDataSourceFromS3Input,
  CreateDataSourceFromS3Output,
  CreateDataSourceFromS3Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(57, __c7, 1) as any as S.Schema<CreateDataSourceFromS3Input>,
  output: __S(16, __c2, 0) as any as S.Schema<CreateDataSourceFromS3Output>,
  errors: [IdempotentParameterMismatchException, InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromS3",
}));

export type CreateEvaluationError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a new `Evaluation` of an `MLModel`. An `MLModel` is evaluated on a set of observations associated to a `DataSource`. Like a `DataSource`
 * for an `MLModel`, the `DataSource` for an `Evaluation` contains values for the `Target Variable`. The `Evaluation` compares the predicted result for each observation to the actual outcome and provides a
 * summary so that you know how effective the `MLModel` functions on the test
 * data. Evaluation generates a relevant performance metric, such as BinaryAUC, RegressionRMSE or MulticlassAvgFScore based on the corresponding `MLModelType`: `BINARY`, `REGRESSION` or `MULTICLASS`.
 *
 * `CreateEvaluation` is an asynchronous operation. In response to `CreateEvaluation`, Amazon Machine Learning (Amazon ML) immediately
 * returns and sets the evaluation status to `PENDING`. After the `Evaluation` is created and ready for use,
 * Amazon ML sets the status to `COMPLETED`.
 *
 * You can use the `GetEvaluation` operation to check progress of the evaluation during the creation operation.
 */
export const createEvaluation: API.OperationMethod<
  CreateEvaluationInput,
  CreateEvaluationOutput,
  CreateEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<CreateEvaluationInput>,
  output: __S(72, __c9, 0) as any as S.Schema<CreateEvaluationOutput>,
  errors: [IdempotentParameterMismatchException, InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEvaluation",
}));

export type CreateMLModelError =
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Creates a new `MLModel` using the `DataSource` and the recipe as
 * information sources.
 *
 * An `MLModel` is nearly immutable. Users can update only the
 * `MLModelName` and the `ScoreThreshold` in an
 * `MLModel` without creating a new `MLModel`.
 *
 * `CreateMLModel` is an asynchronous operation. In response to
 * `CreateMLModel`, Amazon Machine Learning (Amazon ML) immediately returns
 * and sets the `MLModel` status to `PENDING`. After the
 * `MLModel` has been created and ready is for use, Amazon ML sets the
 * status to `COMPLETED`.
 *
 * You can use the `GetMLModel` operation to check the progress of the
 * `MLModel` during the creation operation.
 *
 * `CreateMLModel` requires a `DataSource` with computed statistics,
 * which can be created by setting `ComputeStatistics` to `true` in
 * `CreateDataSourceFromRDS`, `CreateDataSourceFromS3`, or
 * `CreateDataSourceFromRedshift` operations.
 */
export const createMLModel: API.OperationMethod<
  CreateMLModelInput,
  CreateMLModelOutput,
  CreateMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<CreateMLModelInput>,
  output: __S(88, __c11, 0) as any as S.Schema<CreateMLModelOutput>,
  errors: [IdempotentParameterMismatchException, InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLModel",
}));

export type CreateRealtimeEndpointError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a real-time endpoint for the `MLModel`. The endpoint contains the URI of the `MLModel`; that is, the location to send real-time prediction requests for the specified `MLModel`.
 */
export const createRealtimeEndpoint: API.OperationMethod<
  CreateRealtimeEndpointInput,
  CreateRealtimeEndpointOutput,
  CreateRealtimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CreateRealtimeEndpointInput>,
  output: __S(112, __c14, 0) as any as S.Schema<CreateRealtimeEndpointOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRealtimeEndpoint",
}));

export type DeleteBatchPredictionError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the DELETED status to a `BatchPrediction`, rendering it unusable.
 *
 * After using the `DeleteBatchPrediction` operation, you can use the GetBatchPrediction
 * operation to verify that the status of the `BatchPrediction` changed to DELETED.
 *
 * **Caution:** The result of the `DeleteBatchPrediction` operation is irreversible.
 */
export const deleteBatchPrediction: API.OperationMethod<
  DeleteBatchPredictionInput,
  DeleteBatchPredictionOutput,
  DeleteBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteBatchPredictionInput>,
  output: __S(336, __c42, 0) as any as S.Schema<DeleteBatchPredictionOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchPrediction",
}));

export type DeleteDataSourceError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the DELETED status to a `DataSource`, rendering it unusable.
 *
 * After using the `DeleteDataSource` operation, you can use the GetDataSource operation to verify that the status of the `DataSource` changed to DELETED.
 *
 * **Caution:** The results of the `DeleteDataSource` operation are irreversible.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceInput,
  DeleteDataSourceOutput,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DeleteDataSourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteDataSourceOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
}));

export type DeleteEvaluationError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the `DELETED` status to an `Evaluation`, rendering it unusable.
 *
 * After invoking the `DeleteEvaluation` operation, you can use the
 * `GetEvaluation` operation to verify that the status of the `Evaluation` changed to `DELETED`.
 *
 * **Caution:** The results of the `DeleteEvaluation` operation are irreversible.
 */
export const deleteEvaluation: API.OperationMethod<
  DeleteEvaluationInput,
  DeleteEvaluationOutput,
  DeleteEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DeleteEvaluationInput>,
  output: __S(72, __c9, 0) as any as S.Schema<DeleteEvaluationOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvaluation",
}));

export type DeleteMLModelError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns the `DELETED` status to an `MLModel`, rendering it unusable.
 *
 * After using the `DeleteMLModel` operation, you can use the
 * `GetMLModel` operation to verify that the status of the `MLModel` changed to DELETED.
 *
 * **Caution:** The result of the `DeleteMLModel` operation is irreversible.
 */
export const deleteMLModel: API.OperationMethod<
  DeleteMLModelInput,
  DeleteMLModelOutput,
  DeleteMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DeleteMLModelInput>,
  output: __S(88, __c11, 0) as any as S.Schema<DeleteMLModelOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLModel",
}));

export type DeleteRealtimeEndpointError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a real time endpoint of an `MLModel`.
 */
export const deleteRealtimeEndpoint: API.OperationMethod<
  DeleteRealtimeEndpointInput,
  DeleteRealtimeEndpointOutput,
  DeleteRealtimeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DeleteRealtimeEndpointInput>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteRealtimeEndpointOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRealtimeEndpoint",
}));

export type DeleteTagsError =
  | InternalServerException
  | InvalidInputException
  | InvalidTagException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified tags associated with an ML object. After this operation is complete, you can't recover deleted tags.
 *
 * If you specify a tag that doesn't exist, Amazon ML ignores it.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsInput,
  DeleteTagsOutput,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DeleteTagsInput>,
  output: __S(312, __c39, 0) as any as S.Schema<DeleteTagsOutput>,
  errors: [
    InternalServerException,
    InvalidInputException,
    InvalidTagException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DescribeBatchPredictionsError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of `BatchPrediction` operations that match the search criteria in the request.
 */
export const describeBatchPredictions: API.PaginatedOperationMethod<
  DescribeBatchPredictionsInput,
  DescribeBatchPredictionsOutput,
  DescribeBatchPredictionsError,
  Credentials | HttpClient.HttpClient,
  BatchPrediction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DescribeBatchPredictionsInput>,
  output: __S(179, __c22, 3) as any as S.Schema<DescribeBatchPredictionsOutput>,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchPredictions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeDataSourcesError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of `DataSource` that match the search criteria in the request.
 */
export const describeDataSources: API.PaginatedOperationMethod<
  DescribeDataSourcesInput,
  DescribeDataSourcesOutput,
  DescribeDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DescribeDataSourcesInput>,
  output: __S(187, __c23, 3) as any as S.Schema<DescribeDataSourcesOutput>,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeEvaluationsError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of `DescribeEvaluations` that match the search criteria in the request.
 */
export const describeEvaluations: API.PaginatedOperationMethod<
  DescribeEvaluationsInput,
  DescribeEvaluationsOutput,
  DescribeEvaluationsError,
  Credentials | HttpClient.HttpClient,
  Evaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<DescribeEvaluationsInput>,
  output: __S(203, __c25, 3) as any as S.Schema<DescribeEvaluationsOutput>,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvaluations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeMLModelsError = InternalServerException | InvalidInputException | CommonErrors;
/**
 * Returns a list of `MLModel` that match the search criteria in the request.
 */
export const describeMLModels: API.PaginatedOperationMethod<
  DescribeMLModelsInput,
  DescribeMLModelsOutput,
  DescribeMLModelsError,
  Credentials | HttpClient.HttpClient,
  MLModel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<DescribeMLModelsInput>,
  output: __S(219, __c27, 3) as any as S.Schema<DescribeMLModelsOutput>,
  errors: [InternalServerException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMLModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "Limit",
  } as const,
})) as any;

export type DescribeTagsError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes one or more of the tags for your Amazon ML object.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsInput,
  DescribeTagsOutput,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DescribeTagsInput>,
  output: __S(225, __c28, 1) as any as S.Schema<DescribeTagsOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
}));

export type GetBatchPredictionError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `BatchPrediction` that includes detailed metadata, status, and data file information for a
 * `Batch Prediction` request.
 */
export const getBatchPrediction: API.OperationMethod<
  GetBatchPredictionInput,
  GetBatchPredictionOutput,
  GetBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<GetBatchPredictionInput>,
  output: __S(233, __c29, 1) as any as S.Schema<GetBatchPredictionOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchPrediction",
}));

export type GetDataSourceError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `DataSource` that includes metadata and data file information, as well as the current status of the `DataSource`.
 *
 * `GetDataSource` provides results in normal or verbose format. The verbose format
 * adds the schema description and the list of files pointed to by the DataSource to the normal format.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceInput,
  GetDataSourceOutput,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<GetDataSourceInput>,
  output: __S(241, __c30, 1) as any as S.Schema<GetDataSourceOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
}));

export type GetEvaluationError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an `Evaluation` that includes metadata as well as the current status of the `Evaluation`.
 */
export const getEvaluation: API.OperationMethod<
  GetEvaluationInput,
  GetEvaluationOutput,
  GetEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<GetEvaluationInput>,
  output: __S(249, __c31, 1) as any as S.Schema<GetEvaluationOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvaluation",
}));

export type GetMLModelError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an `MLModel` that includes detailed metadata, data source information, and the current status of the `MLModel`.
 *
 * `GetMLModel` provides results in normal or verbose format.
 */
export const getMLModel: API.OperationMethod<
  GetMLModelInput,
  GetMLModelOutput,
  GetMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<GetMLModelInput>,
  output: __S(257, __c32, 1) as any as S.Schema<GetMLModelOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLModel",
}));

export type PredictError =
  | InternalServerException
  | InvalidInputException
  | LimitExceededException
  | PredictorNotMountedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Generates a prediction for the observation using the specified `ML Model`.
 *
 * **Note:** Not all response parameters will be populated. Whether a
 * response parameter is populated depends on the type of model requested.
 */
export const predict: API.OperationMethod<
  PredictInput,
  PredictOutput,
  PredictError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<PredictInput>,
  output: __S(268, __c33, 4) as any as S.Schema<PredictOutput>,
  errors: [
    InternalServerException,
    InvalidInputException,
    LimitExceededException,
    PredictorNotMountedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Predict",
}));

export type UpdateBatchPredictionError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `BatchPredictionName` of a `BatchPrediction`.
 *
 * You can use the `GetBatchPrediction` operation to view the contents of the updated data element.
 */
export const updateBatchPrediction: API.OperationMethod<
  UpdateBatchPredictionInput,
  UpdateBatchPredictionOutput,
  UpdateBatchPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<UpdateBatchPredictionInput>,
  output: __S(336, __c42, 0) as any as S.Schema<UpdateBatchPredictionOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBatchPrediction",
}));

export type UpdateDataSourceError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `DataSourceName` of a `DataSource`.
 *
 * You can use the `GetDataSource` operation to view the contents of the updated data element.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceInput,
  UpdateDataSourceOutput,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<UpdateDataSourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<UpdateDataSourceOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
}));

export type UpdateEvaluationError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `EvaluationName` of an `Evaluation`.
 *
 * You can use the `GetEvaluation` operation to view the contents of the updated data element.
 */
export const updateEvaluation: API.OperationMethod<
  UpdateEvaluationInput,
  UpdateEvaluationOutput,
  UpdateEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<UpdateEvaluationInput>,
  output: __S(72, __c9, 0) as any as S.Schema<UpdateEvaluationOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEvaluation",
}));

export type UpdateMLModelError =
  | InternalServerException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `MLModelName` and the `ScoreThreshold` of an `MLModel`.
 *
 * You can use the `GetMLModel` operation to view the contents of the updated data element.
 */
export const updateMLModel: API.OperationMethod<
  UpdateMLModelInput,
  UpdateMLModelOutput,
  UpdateMLModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<UpdateMLModelInput>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateMLModelOutput>,
  errors: [InternalServerException, InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMLModel",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseInformation: __S(32, __c4, 0),
          SelectSqlQuery: S.String,
          DatabaseCredentials: __S(8, __c1, 0),
          S3StagingLocation: S.String,
          DataRearrangement: S.optional(S.String),
          DataSchema: S.optional(S.String),
          DataSchemaUri: S.optional(S.String),
          ResourceRole: S.String,
          ServiceRole: S.String,
          SubnetId: S.String,
          SecurityGroupIds: __S(24, __c3, 0),
        }),
      ).annotate({ identifier: "RDSDataSpec" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataSourceId: S.String,
          DataSourceName: S.optional(S.String),
          RDSData: __S(0, __c0, 0),
          RoleARN: S.String,
          ComputeStatistics: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataSourceFromRDSInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Username: S.String, Password: SensitiveString })).annotate({
        identifier: "RDSDatabaseCredentials",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DataSourceId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateDataSourceFromRDSOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InstanceIdentifier: S.String, DatabaseName: S.String }),
      ).annotate({ identifier: "RDSDatabase" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseInformation: __S(48, __c6, 0),
          SelectSqlQuery: S.String,
          DatabaseCredentials: __S(8, __c1, 0),
          S3StagingLocation: S.String,
          DataRearrangement: S.optional(S.String),
          DataSchema: S.optional(S.String),
          DataSchemaUri: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedshiftDataSpec" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataSourceId: S.String,
          DataSourceName: S.optional(S.String),
          DataSpec: __S(40, __c5, 0),
          RoleARN: S.String,
          ComputeStatistics: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataSourceFromRedshiftInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.String, ClusterIdentifier: S.String }),
      ).annotate({ identifier: "RedshiftDatabase" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DataLocationS3: S.String,
          DataRearrangement: S.optional(S.String),
          DataSchema: S.optional(S.String),
          DataSchemaLocationS3: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3DataSpec" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataSourceId: S.String,
          DataSourceName: S.optional(S.String),
          DataSpec: __S(56, __c7, 0),
          ComputeStatistics: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDataSourceFromS3Input" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EvaluationId: S.String,
          EvaluationName: S.optional(S.String),
          MLModelId: S.String,
          EvaluationDataSourceId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEvaluationInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ EvaluationId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateEvaluationOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MLModelId: S.String,
          MLModelName: S.optional(S.String),
          MLModelType: S.String,
          Parameters: S.optional(__S(96, __c12, 0)),
          TrainingDataSourceId: S.String,
          Recipe: S.optional(S.String),
          RecipeUri: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMLModelInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MLModelId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateMLModelOutput",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MLModelId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateRealtimeEndpointInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MLModelId: S.optional(S.String),
          RealtimeEndpointInfo: S.optional(__S(120, __c15, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateRealtimeEndpointOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PeakRequestsPerSecond: S.optional(S.Number),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndpointUrl: S.optional(S.String),
          EndpointStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "RealtimeEndpointInfo" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BatchPredictionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBatchPredictionInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataSourceId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDataSourceInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EvaluationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEvaluationInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MLModelId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMLModelInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MLModelId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRealtimeEndpointInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TagKeys: __S(24, __c3, 0), ResourceId: S.String, ResourceType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTagsInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FilterVariable: S.optional(S.String),
          EQ: S.optional(S.String),
          GT: S.optional(S.String),
          LT: S.optional(S.String),
          GE: S.optional(S.String),
          LE: S.optional(S.String),
          NE: S.optional(S.String),
          Prefix: S.optional(S.String),
          SortOrder: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeBatchPredictionsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BatchPredictionId: S.optional(S.String),
          MLModelId: S.optional(S.String),
          BatchPredictionDataSourceId: S.optional(S.String),
          InputDataLocationS3: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          OutputUri: S.optional(S.String),
          Message: S.optional(S.String),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalRecordCount: S.optional(S.Number),
          InvalidRecordCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BatchPrediction" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Results: S.optional(__S(178, __c22, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeBatchPredictionsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FilterVariable: S.optional(S.String),
          EQ: S.optional(S.String),
          GT: S.optional(S.String),
          LT: S.optional(S.String),
          GE: S.optional(S.String),
          LE: S.optional(S.String),
          NE: S.optional(S.String),
          Prefix: S.optional(S.String),
          SortOrder: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDataSourcesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataSourceId: S.optional(S.String),
          DataLocationS3: S.optional(S.String),
          DataRearrangement: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataSizeInBytes: S.optional(S.Number),
          NumberOfFiles: S.optional(S.Number),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          Message: S.optional(S.String),
          RedshiftMetadata: S.optional(__S(192, __c24, 0)),
          RDSMetadata: S.optional(__S(193, __c24, 1)),
          RoleARN: S.optional(S.String),
          ComputeStatistics: S.optional(S.Boolean),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "DataSource" });
    case 2:
      return S.Array(__S(185, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Results: S.optional(__S(186, __c23, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeDataSourcesOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RedshiftDatabase: S.optional(__S(48, __c6, 0)),
          DatabaseUserName: S.optional(S.String),
          SelectSqlQuery: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedshiftMetadata" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Database: S.optional(__S(32, __c4, 0)),
          DatabaseUserName: S.optional(S.String),
          SelectSqlQuery: S.optional(S.String),
          ResourceRole: S.optional(S.String),
          ServiceRole: S.optional(S.String),
          DataPipelineId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RDSMetadata" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FilterVariable: S.optional(S.String),
          EQ: S.optional(S.String),
          GT: S.optional(S.String),
          LT: S.optional(S.String),
          GE: S.optional(S.String),
          LE: S.optional(S.String),
          NE: S.optional(S.String),
          Prefix: S.optional(S.String),
          SortOrder: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeEvaluationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EvaluationId: S.optional(S.String),
          MLModelId: S.optional(S.String),
          EvaluationDataSourceId: S.optional(S.String),
          InputDataLocationS3: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          PerformanceMetrics: S.optional(__S(208, __c26, 0)),
          Message: S.optional(S.String),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Evaluation" });
    case 2:
      return S.Array(__S(201, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Results: S.optional(__S(202, __c25, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeEvaluationsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Properties: S.optional(__S(96, __c12, 0)) })).annotate({
        identifier: "PerformanceMetrics",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FilterVariable: S.optional(S.String),
          EQ: S.optional(S.String),
          GT: S.optional(S.String),
          LT: S.optional(S.String),
          GE: S.optional(S.String),
          LE: S.optional(S.String),
          NE: S.optional(S.String),
          Prefix: S.optional(S.String),
          SortOrder: S.optional(S.String),
          NextToken: S.optional(S.String),
          Limit: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeMLModelsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MLModelId: S.optional(S.String),
          TrainingDataSourceId: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          SizeInBytes: S.optional(S.Number),
          EndpointInfo: S.optional(__S(120, __c15, 0)),
          TrainingParameters: S.optional(__S(96, __c12, 0)),
          InputDataLocationS3: S.optional(S.String),
          Algorithm: S.optional(S.String),
          MLModelType: S.optional(S.String),
          ScoreThreshold: S.optional(S.Number),
          ScoreThresholdLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Message: S.optional(S.String),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MLModel" });
    case 2:
      return S.Array(__S(217, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Results: S.optional(__S(218, __c27, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeMLModelsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, ResourceType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTagsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          ResourceType: S.optional(S.String),
          Tags: S.optional(__S(321, __c40, 1)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeTagsOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BatchPredictionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBatchPredictionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BatchPredictionId: S.optional(S.String),
          MLModelId: S.optional(S.String),
          BatchPredictionDataSourceId: S.optional(S.String),
          InputDataLocationS3: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          OutputUri: S.optional(S.String),
          LogUri: S.optional(S.String),
          Message: S.optional(S.String),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TotalRecordCount: S.optional(S.Number),
          InvalidRecordCount: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "GetBatchPredictionOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataSourceId: S.String, Verbose: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDataSourceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DataSourceId: S.optional(S.String),
          DataLocationS3: S.optional(S.String),
          DataRearrangement: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataSizeInBytes: S.optional(S.Number),
          NumberOfFiles: S.optional(S.Number),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          LogUri: S.optional(S.String),
          Message: S.optional(S.String),
          RedshiftMetadata: S.optional(__S(192, __c24, 0)),
          RDSMetadata: S.optional(__S(193, __c24, 1)),
          RoleARN: S.optional(S.String),
          ComputeStatistics: S.optional(S.Boolean),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DataSourceSchema: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDataSourceOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EvaluationId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEvaluationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EvaluationId: S.optional(S.String),
          MLModelId: S.optional(S.String),
          EvaluationDataSourceId: S.optional(S.String),
          InputDataLocationS3: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          PerformanceMetrics: S.optional(__S(208, __c26, 0)),
          LogUri: S.optional(S.String),
          Message: S.optional(S.String),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetEvaluationOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MLModelId: S.String, Verbose: S.optional(S.Boolean) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMLModelInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MLModelId: S.optional(S.String),
          TrainingDataSourceId: S.optional(S.String),
          CreatedByIamUser: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          SizeInBytes: S.optional(S.Number),
          EndpointInfo: S.optional(__S(120, __c15, 0)),
          TrainingParameters: S.optional(__S(96, __c12, 0)),
          InputDataLocationS3: S.optional(S.String),
          MLModelType: S.optional(S.String),
          ScoreThreshold: S.optional(S.Number),
          ScoreThresholdLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LogUri: S.optional(S.String),
          Message: S.optional(S.String),
          ComputeTime: S.optional(S.Number),
          FinishedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Recipe: S.optional(S.String),
          Schema: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetMLModelOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MLModelId: S.String,
          Record: __S(96, __c12, 0),
          PredictEndpoint: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PredictInput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          predictedLabel: S.optional(S.String),
          predictedValue: S.optional(S.Number),
          predictedScores: S.optional(__S(265, __c33, 1)),
          details: S.optional(__S(266, __c33, 2)),
        }),
      ).annotate({ identifier: "Prediction" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Prediction: S.optional(__S(267, __c33, 3)) }).pipe(ns),
      ).annotate({ identifier: "PredictOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BatchPredictionId: S.String, BatchPredictionName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateBatchPredictionInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataSourceId: S.String, DataSourceName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDataSourceInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ EvaluationId: S.String, EvaluationName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateEvaluationInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MLModelId: S.String,
          MLModelName: S.optional(S.String),
          ScoreThreshold: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMLModelInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Tags: __S(321, __c40, 1), ResourceId: S.String, ResourceType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.optional(S.String), ResourceType: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "AddTagsOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(320, __c40, 0));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BatchPredictionId: S.String,
          BatchPredictionName: S.optional(S.String),
          MLModelId: S.String,
          BatchPredictionDataSourceId: S.String,
          OutputUri: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBatchPredictionInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BatchPredictionId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateBatchPredictionOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
