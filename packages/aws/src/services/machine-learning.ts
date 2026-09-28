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
  sdkId: "Machine Learning",
  target: "AmazonML_20141212",
  version: "2014-12-12",
  sigv4: "machinelearning",
  protocol: awsJson1_1Protocol,
  xmlns: "http://machinelearning.amazonaws.com/doc/2014-12-12/",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://machinelearning.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://machinelearning.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "IdempotentParameterMismatchException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly code?: number }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly code?: number }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly code?: number }> {}
export class InvalidTagException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [], {
    status: 417,
  })<{ readonly message?: string; readonly code?: number }> {}
export class PredictorNotMountedException
  extends /*@__PURE__*/ TE.TaggedError(
    "PredictorNotMountedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly code?: number }> {}
export class TagLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("TagLimitExceededException")<{
    readonly message?: string;
  }> {}
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
export type MLModelType =
  | "REGRESSION"
  | "BINARY"
  | "MULTICLASS"
  | (string & {});
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
export type RealtimeEndpointStatus =
  | "NONE"
  | "READY"
  | "UPDATING"
  | "FAILED"
  | (string & {});
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
export type PerformanceMetricsProperties = {
  [key: string]: string | undefined;
};
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
export type DetailsAttributes =
  | "PredictiveModelType"
  | "Algorithm"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      Tags: D.list({ Key: 0, Value: 0 }),
      ResourceId: 0,
      ResourceType: 0,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      BatchPredictionId: 0,
      BatchPredictionName: 0,
      MLModelId: 0,
      BatchPredictionDataSourceId: 0,
      OutputUri: 0,
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchPrediction",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DataSourceId: 0,
      DataSourceName: 0,
      RDSData: {
        DatabaseInformation: { InstanceIdentifier: 0, DatabaseName: 0 },
        SelectSqlQuery: 0,
        DatabaseCredentials: { Username: 0, Password: 0 },
        S3StagingLocation: 0,
        DataRearrangement: 0,
        DataSchema: 0,
        DataSchemaUri: 0,
        ResourceRole: 0,
        ServiceRole: 0,
        SubnetId: 0,
        SecurityGroupIds: 0,
      },
      RoleARN: 0,
      ComputeStatistics: 0,
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromRDS",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DataSourceId: 0,
      DataSourceName: 0,
      DataSpec: {
        DatabaseInformation: { DatabaseName: 0, ClusterIdentifier: 0 },
        SelectSqlQuery: 0,
        DatabaseCredentials: { Username: 0, Password: 0 },
        S3StagingLocation: 0,
        DataRearrangement: 0,
        DataSchema: 0,
        DataSchemaUri: 0,
      },
      RoleARN: 0,
      ComputeStatistics: 0,
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromRedshift",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      DataSourceId: 0,
      DataSourceName: 0,
      DataSpec: {
        DataLocationS3: 0,
        DataRearrangement: 0,
        DataSchema: 0,
        DataSchemaLocationS3: 0,
      },
      ComputeStatistics: 0,
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSourceFromS3",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      EvaluationId: 0,
      EvaluationName: 0,
      MLModelId: 0,
      EvaluationDataSourceId: 0,
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEvaluation",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      MLModelId: 0,
      MLModelName: 0,
      MLModelType: 0,
      Parameters: 0,
      TrainingDataSourceId: 0,
      Recipe: 0,
      RecipeUri: 0,
    },
  },
  errors: [
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLModel",
})) as any;

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
  descriptor: {
    service: svc,
    input: { MLModelId: 0 },
    output: { RealtimeEndpointInfo: o_RealtimeEndpointInfo },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRealtimeEndpoint",
})) as any;

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
  descriptor: { service: svc, input: { BatchPredictionId: 0 } },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchPrediction",
})) as any;

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
  descriptor: { service: svc, input: { DataSourceId: 0 } },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSource",
})) as any;

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
  descriptor: { service: svc, input: { EvaluationId: 0 } },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvaluation",
})) as any;

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
  descriptor: { service: svc, input: { MLModelId: 0 } },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLModel",
})) as any;

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
  descriptor: {
    service: svc,
    input: { MLModelId: 0 },
    output: { RealtimeEndpointInfo: o_RealtimeEndpointInfo },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRealtimeEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    input: { TagKeys: 0, ResourceId: 0, ResourceType: 0 },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    InvalidTagException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      FilterVariable: 0,
      EQ: 0,
      GT: 0,
      LT: 0,
      GE: 0,
      LE: 0,
      NE: 0,
      Prefix: 0,
      SortOrder: 0,
      NextToken: 0,
      Limit: 0,
    },
    output: {
      Results: D.list({
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
        FinishedAt: D.ts,
        StartedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      FilterVariable: 0,
      EQ: 0,
      GT: 0,
      LT: 0,
      GE: 0,
      LE: 0,
      NE: 0,
      Prefix: 0,
      SortOrder: 0,
      NextToken: 0,
      Limit: 0,
    },
    output: {
      Results: D.list({
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
        FinishedAt: D.ts,
        StartedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      FilterVariable: 0,
      EQ: 0,
      GT: 0,
      LT: 0,
      GE: 0,
      LE: 0,
      NE: 0,
      Prefix: 0,
      SortOrder: 0,
      NextToken: 0,
      Limit: 0,
    },
    output: {
      Results: D.list({
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
        FinishedAt: D.ts,
        StartedAt: D.ts,
      }),
    },
  },
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

export type DescribeMLModelsError =
  | InternalServerException
  | InvalidInputException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      FilterVariable: 0,
      EQ: 0,
      GT: 0,
      LT: 0,
      GE: 0,
      LE: 0,
      NE: 0,
      Prefix: 0,
      SortOrder: 0,
      NextToken: 0,
      Limit: 0,
    },
    output: {
      Results: D.list({
        CreatedAt: D.ts,
        LastUpdatedAt: D.ts,
        EndpointInfo: o_RealtimeEndpointInfo,
        ScoreThresholdLastUpdatedAt: D.ts,
        FinishedAt: D.ts,
        StartedAt: D.ts,
      }),
    },
  },
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
  descriptor: { service: svc, input: { ResourceId: 0, ResourceType: 0 } },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
})) as any;

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
  descriptor: {
    service: svc,
    input: { BatchPredictionId: 0 },
    output: {
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      FinishedAt: D.ts,
      StartedAt: D.ts,
    },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchPrediction",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DataSourceId: 0, Verbose: 0 },
    output: {
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      FinishedAt: D.ts,
      StartedAt: D.ts,
    },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { EvaluationId: 0 },
    output: {
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      FinishedAt: D.ts,
      StartedAt: D.ts,
    },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvaluation",
})) as any;

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
  descriptor: {
    service: svc,
    input: { MLModelId: 0, Verbose: 0 },
    output: {
      CreatedAt: D.ts,
      LastUpdatedAt: D.ts,
      EndpointInfo: o_RealtimeEndpointInfo,
      ScoreThresholdLastUpdatedAt: D.ts,
      FinishedAt: D.ts,
      StartedAt: D.ts,
    },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLModel",
})) as any;

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
  descriptor: {
    service: svc,
    input: { MLModelId: 0, Record: 0, PredictEndpoint: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { BatchPredictionId: 0, BatchPredictionName: 0 },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBatchPrediction",
})) as any;

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
  descriptor: { service: svc, input: { DataSourceId: 0, DataSourceName: 0 } },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSource",
})) as any;

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
  descriptor: { service: svc, input: { EvaluationId: 0, EvaluationName: 0 } },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEvaluation",
})) as any;

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
  descriptor: {
    service: svc,
    input: { MLModelId: 0, MLModelName: 0, ScoreThreshold: 0 },
  },
  errors: [
    InternalServerException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMLModel",
})) as any;

const o_RealtimeEndpointInfo: D.LazyStruct = () => ({ CreatedAt: D.ts });
