import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Timestream Write",
  target: "Timestream_20181101",
  version: "2018-11-01",
  sigv4: "timestream",
  protocol: awsJson1_0Protocol,
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
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://timestream-ingest-fips.${Region}.api.aws`);
              }
              if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
                return e(`https://timestream-ingest.${Region}.api.aws`);
              }
              return e(
                `https://ingest.timestream-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://ingest.timestream.${Region}.amazonaws.com`);
              }
              return e(
                `https://ingest.timestream-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://timestream-ingest.${Region}.api.aws`);
              }
              if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
                return e(`https://timestream-ingest.${Region}.api.aws`);
              }
              return e(
                `https://ingest.timestream.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ingest.timestream.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class InvalidEndpointException
  extends /*@__PURE__*/ TE.TaggedError("InvalidEndpointException", [], {
    status: 421,
  })<{ readonly message?: string }> {}
export class RejectedRecordsException
  extends /*@__PURE__*/ TE.TaggedError("RejectedRecordsException", [], {
    status: 419,
  })<{
    readonly message?: string;
    readonly RejectedRecords?: RejectedRecord[];
  }> {}
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
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class TimestreamNotOnboarded
  extends /*@__PURE__*/ TE.TaggedError(
    "TimestreamNotOnboarded",
    ["AuthError"],
    {
      synthetic: {
        from: "AccessDeniedException",
        message: {
          includes: "Only existing Timestream for LiveAnalytics customers",
        },
      },
    },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type ClientRequestToken = string | redacted.Redacted<string>;
export type StringValue256 = string;
export type TimeUnit =
  | "MILLISECONDS"
  | "SECONDS"
  | "MICROSECONDS"
  | "NANOSECONDS"
  | (string & {});
export type SchemaName = string;
export interface DimensionMapping {
  SourceColumn?: string;
  DestinationColumn?: string;
}
export type DimensionMappings = DimensionMapping[];
export type ScalarMeasureValueType =
  | "DOUBLE"
  | "BIGINT"
  | "BOOLEAN"
  | "VARCHAR"
  | "TIMESTAMP"
  | (string & {});
export interface MultiMeasureAttributeMapping {
  SourceColumn: string;
  TargetMultiMeasureAttributeName?: string;
  MeasureValueType?: ScalarMeasureValueType;
}
export type MultiMeasureAttributeMappingList = MultiMeasureAttributeMapping[];
export interface MultiMeasureMappings {
  TargetMultiMeasureName?: string;
  MultiMeasureAttributeMappings: MultiMeasureAttributeMapping[];
}
export type MeasureValueType =
  | "DOUBLE"
  | "BIGINT"
  | "VARCHAR"
  | "BOOLEAN"
  | "TIMESTAMP"
  | "MULTI"
  | (string & {});
export interface MixedMeasureMapping {
  MeasureName?: string;
  SourceColumn?: string;
  TargetMeasureName?: string;
  MeasureValueType: MeasureValueType;
  MultiMeasureAttributeMappings?: MultiMeasureAttributeMapping[];
}
export type MixedMeasureMappingList = MixedMeasureMapping[];
export interface DataModel {
  TimeColumn?: string;
  TimeUnit?: TimeUnit;
  DimensionMappings: DimensionMapping[];
  MultiMeasureMappings?: MultiMeasureMappings;
  MixedMeasureMappings?: MixedMeasureMapping[];
  MeasureNameColumn?: string;
}
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface DataModelS3Configuration {
  BucketName?: string;
  ObjectKey?: string;
}
export interface DataModelConfiguration {
  DataModel?: DataModel;
  DataModelS3Configuration?: DataModelS3Configuration;
}
export interface DataSourceS3Configuration {
  BucketName: string;
  ObjectKeyPrefix?: string;
}
export type StringValue1 = string;
export interface CsvConfiguration {
  ColumnSeparator?: string;
  EscapeChar?: string;
  QuoteChar?: string;
  NullValue?: string;
  TrimWhiteSpace?: boolean;
}
export type BatchLoadDataFormat = "CSV" | (string & {});
export interface DataSourceConfiguration {
  DataSourceS3Configuration: DataSourceS3Configuration;
  CsvConfiguration?: CsvConfiguration;
  DataFormat: BatchLoadDataFormat;
}
export type S3ObjectKeyPrefix = string;
export type S3EncryptionOption = "SSE_S3" | "SSE_KMS" | (string & {});
export type StringValue2048 = string;
export interface ReportS3Configuration {
  BucketName: string;
  ObjectKeyPrefix?: string;
  EncryptionOption?: S3EncryptionOption;
  KmsKeyId?: string;
}
export interface ReportConfiguration {
  ReportS3Configuration?: ReportS3Configuration;
}
export type ResourceCreateAPIName = string;
export type RecordVersion = number;
export interface CreateBatchLoadTaskRequest {
  ClientToken?: string | redacted.Redacted<string>;
  DataModelConfiguration?: DataModelConfiguration;
  DataSourceConfiguration: DataSourceConfiguration;
  ReportConfiguration: ReportConfiguration;
  TargetDatabaseName: string;
  TargetTableName: string;
  RecordVersion?: number;
}
export type BatchLoadTaskId = string;
export interface CreateBatchLoadTaskResponse {
  TaskId: string;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateDatabaseRequest {
  DatabaseName: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export type ResourceName = string;
export interface Database {
  Arn?: string;
  DatabaseName?: string;
  TableCount?: number;
  KmsKeyId?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
}
export interface CreateDatabaseResponse {
  Database?: Database;
}
export type MemoryStoreRetentionPeriodInHours = number;
export type MagneticStoreRetentionPeriodInDays = number;
export interface RetentionProperties {
  MemoryStoreRetentionPeriodInHours: number;
  MagneticStoreRetentionPeriodInDays: number;
}
export interface S3Configuration {
  BucketName?: string;
  ObjectKeyPrefix?: string;
  EncryptionOption?: S3EncryptionOption;
  KmsKeyId?: string;
}
export interface MagneticStoreRejectedDataLocation {
  S3Configuration?: S3Configuration;
}
export interface MagneticStoreWriteProperties {
  EnableMagneticStoreWrites: boolean;
  MagneticStoreRejectedDataLocation?: MagneticStoreRejectedDataLocation;
}
export type PartitionKeyType = "DIMENSION" | "MEASURE" | (string & {});
export type PartitionKeyEnforcementLevel =
  | "REQUIRED"
  | "OPTIONAL"
  | (string & {});
export interface PartitionKey {
  Type: PartitionKeyType;
  Name?: string;
  EnforcementInRecord?: PartitionKeyEnforcementLevel;
}
export type PartitionKeyList = PartitionKey[];
export interface Schema {
  CompositePartitionKey?: PartitionKey[];
}
export interface CreateTableRequest {
  DatabaseName: string;
  TableName: string;
  RetentionProperties?: RetentionProperties;
  Tags?: Tag[];
  MagneticStoreWriteProperties?: MagneticStoreWriteProperties;
  Schema?: Schema;
}
export type TableStatus = "ACTIVE" | "DELETING" | "RESTORING" | (string & {});
export interface Table {
  Arn?: string;
  TableName?: string;
  DatabaseName?: string;
  TableStatus?: TableStatus;
  RetentionProperties?: RetentionProperties;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  MagneticStoreWriteProperties?: MagneticStoreWriteProperties;
  Schema?: Schema;
}
export interface CreateTableResponse {
  Table?: Table;
}
export interface DeleteDatabaseRequest {
  DatabaseName: string;
}
export interface DeleteDatabaseResponse {}
export interface DeleteTableRequest {
  DatabaseName: string;
  TableName: string;
}
export interface DeleteTableResponse {}
export interface DescribeBatchLoadTaskRequest {
  TaskId: string;
}
export interface BatchLoadProgressReport {
  RecordsProcessed?: number;
  RecordsIngested?: number;
  ParseFailures?: number;
  RecordIngestionFailures?: number;
  FileFailures?: number;
  BytesMetered?: number;
}
export type BatchLoadStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | "PROGRESS_STOPPED"
  | "PENDING_RESUME"
  | (string & {});
export interface BatchLoadTaskDescription {
  TaskId?: string;
  ErrorMessage?: string;
  DataSourceConfiguration?: DataSourceConfiguration;
  ProgressReport?: BatchLoadProgressReport;
  ReportConfiguration?: ReportConfiguration;
  DataModelConfiguration?: DataModelConfiguration;
  TargetDatabaseName?: string;
  TargetTableName?: string;
  TaskStatus?: BatchLoadStatus;
  RecordVersion?: number;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  ResumableUntil?: Date;
}
export interface DescribeBatchLoadTaskResponse {
  BatchLoadTaskDescription: BatchLoadTaskDescription;
}
export interface DescribeDatabaseRequest {
  DatabaseName: string;
}
export interface DescribeDatabaseResponse {
  Database?: Database;
}
export interface DescribeEndpointsRequest {}
export interface Endpoint {
  Address: string;
  CachePeriodInMinutes: number;
}
export type Endpoints = Endpoint[];
export interface DescribeEndpointsResponse {
  Endpoints: Endpoint[];
}
export interface DescribeTableRequest {
  DatabaseName: string;
  TableName: string;
}
export interface DescribeTableResponse {
  Table?: Table;
}
export type PageLimit = number;
export interface ListBatchLoadTasksRequest {
  NextToken?: string;
  MaxResults?: number;
  TaskStatus?: BatchLoadStatus;
}
export interface BatchLoadTask {
  TaskId?: string;
  TaskStatus?: BatchLoadStatus;
  DatabaseName?: string;
  TableName?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  ResumableUntil?: Date;
}
export type BatchLoadTaskList = BatchLoadTask[];
export interface ListBatchLoadTasksResponse {
  NextToken?: string;
  BatchLoadTasks?: BatchLoadTask[];
}
export type PaginationLimit = number;
export interface ListDatabasesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type DatabaseList = Database[];
export interface ListDatabasesResponse {
  Databases?: Database[];
  NextToken?: string;
}
export interface ListTablesRequest {
  DatabaseName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type TableList = Table[];
export interface ListTablesResponse {
  Tables?: Table[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface ResumeBatchLoadTaskRequest {
  TaskId: string;
}
export interface ResumeBatchLoadTaskResponse {}
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateDatabaseRequest {
  DatabaseName: string;
  KmsKeyId: string;
}
export interface UpdateDatabaseResponse {
  Database?: Database;
}
export interface UpdateTableRequest {
  DatabaseName: string;
  TableName: string;
  RetentionProperties?: RetentionProperties;
  MagneticStoreWriteProperties?: MagneticStoreWriteProperties;
  Schema?: Schema;
}
export interface UpdateTableResponse {
  Table?: Table;
}
export type SchemaValue = string;
export type DimensionValueType = "VARCHAR" | (string & {});
export interface Dimension {
  Name: string;
  Value: string;
  DimensionValueType?: DimensionValueType;
}
export type Dimensions = Dimension[];
export interface MeasureValue {
  Name: string;
  Value: string;
  Type: MeasureValueType;
}
export type MeasureValues = MeasureValue[];
export interface Record {
  Dimensions?: Dimension[];
  MeasureName?: string;
  MeasureValue?: string;
  MeasureValueType?: MeasureValueType;
  Time?: string;
  TimeUnit?: TimeUnit;
  Version?: number;
  MeasureValues?: MeasureValue[];
}
export type Records = Record[];
export interface WriteRecordsRequest {
  DatabaseName: string;
  TableName: string;
  CommonAttributes?: Record;
  Records: Record[];
}
export interface RecordsIngested {
  Total?: number;
  MemoryStore?: number;
  MagneticStore?: number;
}
export interface WriteRecordsResponse {
  RecordsIngested?: RecordsIngested;
}
export type ErrorMessage = string;
export type RecordIndex = number;
export interface RejectedRecord {
  RecordIndex?: number;
  Reason?: string;
  ExistingVersion?: number;
}
export type RejectedRecords = RejectedRecord[];
export type CreateBatchLoadTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Timestream batch load task. A batch load task processes data from
 * a CSV source in an S3 location and writes to a Timestream table. A mapping from
 * source to target is defined in a batch load task. Errors and events are written to a report
 * at an S3 location. For the report, if the KMS key is not specified, the
 * report will be encrypted with an S3 managed key when `SSE_S3` is the option.
 * Otherwise an error is thrown. For more information, see Amazon Web Services managed
 * keys. Service quotas apply. For
 * details, see code
 * sample.
 */
export const createBatchLoadTask: API.OperationMethod<
  CreateBatchLoadTaskRequest,
  CreateBatchLoadTaskResponse,
  CreateBatchLoadTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientToken: D.m({ idempotency: true }),
      DataModelConfiguration: {
        DataModel: {
          TimeColumn: 0,
          TimeUnit: 0,
          DimensionMappings: D.list({ SourceColumn: 0, DestinationColumn: 0 }),
          MultiMeasureMappings: {
            TargetMultiMeasureName: 0,
            MultiMeasureAttributeMappings: D.list(
              i_MultiMeasureAttributeMapping,
            ),
          },
          MixedMeasureMappings: D.list({
            MeasureName: 0,
            SourceColumn: 0,
            TargetMeasureName: 0,
            MeasureValueType: 0,
            MultiMeasureAttributeMappings: D.list(
              i_MultiMeasureAttributeMapping,
            ),
          }),
          MeasureNameColumn: 0,
        },
        DataModelS3Configuration: { BucketName: 0, ObjectKey: 0 },
      },
      DataSourceConfiguration: {
        DataSourceS3Configuration: { BucketName: 0, ObjectKeyPrefix: 0 },
        CsvConfiguration: {
          ColumnSeparator: 0,
          EscapeChar: 0,
          QuoteChar: 0,
          NullValue: 0,
          TrimWhiteSpace: 0,
        },
        DataFormat: 0,
      },
      ReportConfiguration: {
        ReportS3Configuration: {
          BucketName: 0,
          ObjectKeyPrefix: 0,
          EncryptionOption: 0,
          KmsKeyId: 0,
        },
      },
      TargetDatabaseName: 0,
      TargetTableName: 0,
      RecordVersion: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBatchLoadTask",
})) as any;

export type CreateDatabaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidEndpointException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | TimestreamNotOnboarded
  | CommonErrors;
/**
 * Creates a new Timestream database. If the KMS key is not
 * specified, the database will be encrypted with a Timestream managed KMS key located in your account. For more information, see Amazon Web Services managed keys. Service quotas apply. For
 * details, see code sample.
 */
export const createDatabase: API.OperationMethod<
  CreateDatabaseRequest,
  CreateDatabaseResponse,
  CreateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseName: 0, KmsKeyId: 0, Tags: D.list(i_Tag) },
    output: { Database: o_Database },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidEndpointException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    TimestreamNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatabase",
})) as any;

export type CreateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new table to an existing database in your account. In an Amazon Web Services account, table names must be at least unique within each Region if they are in the same
 * database. You might have identical table names in the same Region if the tables are in
 * separate databases. While creating the table, you must specify the table name, database
 * name, and the retention properties. Service quotas apply. See
 * code
 * sample for details.
 */
export const createTable: API.OperationMethod<
  CreateTableRequest,
  CreateTableResponse,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatabaseName: 0,
      TableName: 0,
      RetentionProperties: i_RetentionProperties,
      Tags: D.list(i_Tag),
      MagneticStoreWriteProperties: i_MagneticStoreWriteProperties,
      Schema: i_Schema,
    },
    output: { Table: o_Table },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
})) as any;

export type DeleteDatabaseError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given Timestream database. This is an irreversible
 * operation. After a database is deleted, the time-series data from its tables cannot be
 * recovered.
 *
 * All tables in the database must be deleted first, or a ValidationException error will
 * be thrown.
 *
 * Due to the nature of distributed retries, the operation can return either success or
 * a ResourceNotFoundException. Clients should consider them equivalent.
 *
 * See code sample
 * for details.
 */
export const deleteDatabase: API.OperationMethod<
  DeleteDatabaseRequest,
  DeleteDatabaseResponse,
  DeleteDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatabaseName: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatabase",
})) as any;

export type DeleteTableError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given Timestream table. This is an irreversible operation. After a
 * Timestream database table is deleted, the time-series data stored in the table
 * cannot be recovered.
 *
 * Due to the nature of distributed retries, the operation can return either success or
 * a ResourceNotFoundException. Clients should consider them equivalent.
 *
 * See code
 * sample for details.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableRequest,
  DeleteTableResponse,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DatabaseName: 0, TableName: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
})) as any;

export type DescribeBatchLoadTaskError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about the batch load task, including configurations, mappings,
 * progress, and other details. Service quotas apply. See
 * code
 * sample for details.
 */
export const describeBatchLoadTask: API.OperationMethod<
  DescribeBatchLoadTaskRequest,
  DescribeBatchLoadTaskResponse,
  DescribeBatchLoadTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TaskId: 0 },
    output: {
      BatchLoadTaskDescription: {
        CreationTime: D.ts,
        LastUpdatedTime: D.ts,
        ResumableUntil: D.ts,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBatchLoadTask",
})) as any;

export type DescribeDatabaseError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the database, including the database name, time that the
 * database was created, and the total number of tables found within the database. Service
 * quotas apply. See code sample
 * for details.
 */
export const describeDatabase: API.OperationMethod<
  DescribeDatabaseRequest,
  DescribeDatabaseResponse,
  DescribeDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseName: 0 },
    output: { Database: o_Database },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatabase",
})) as any;

export type DescribeEndpointsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | TimestreamNotOnboarded
  | CommonErrors;
/**
 * Returns a list of available endpoints to make Timestream API calls against.
 * This API operation is available through both the Write and Query APIs.
 *
 * Because the Timestream SDKs are designed to transparently work with the
 * service’s architecture, including the management and mapping of the service endpoints,
 * *we don't recommend that you use this API operation unless*:
 *
 * - You are using VPC endpoints (Amazon Web Services PrivateLink) with Timestream
 *
 * - Your application uses a programming language that does not yet have SDK
 * support
 *
 * - You require better control over the client-side implementation
 *
 * For detailed information on how and when to use and implement DescribeEndpoints, see
 * The
 * Endpoint Discovery Pattern.
 */
export const describeEndpoints: API.OperationMethod<
  DescribeEndpointsRequest,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InternalServerException,
    ThrottlingException,
    ValidationException,
    TimestreamNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
})) as any;

export type DescribeTableError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the table, including the table name, database name, retention
 * duration of the memory store and the magnetic store. Service quotas apply. See
 * code
 * sample for details.
 */
export const describeTable: API.OperationMethod<
  DescribeTableRequest,
  DescribeTableResponse,
  DescribeTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseName: 0, TableName: 0 },
    output: { Table: o_Table },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTable",
})) as any;

export type ListBatchLoadTasksError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of batch load tasks, along with the name, status, when the task is
 * resumable until, and other details. See code
 * sample for details.
 */
export const listBatchLoadTasks: API.PaginatedOperationMethod<
  ListBatchLoadTasksRequest,
  ListBatchLoadTasksResponse,
  ListBatchLoadTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, TaskStatus: 0 },
    output: {
      BatchLoadTasks: D.list({
        CreationTime: D.ts,
        LastUpdatedTime: D.ts,
        ResumableUntil: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchLoadTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatabasesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of your Timestream databases. Service quotas apply. See
 * code sample for
 * details.
 */
export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesRequest,
  ListDatabasesResponse,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { Databases: D.list(o_Database) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTablesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of tables, along with the name, status, and retention properties of each
 * table. See code sample
 * for details.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesRequest,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseName: 0, NextToken: 0, MaxResults: 0 },
    output: { Tables: D.list(o_Table) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags on a Timestream resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ResumeBatchLoadTaskError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 *
 */
export const resumeBatchLoadTask: API.OperationMethod<
  ResumeBatchLoadTaskRequest,
  ResumeBatchLoadTaskResponse,
  ResumeBatchLoadTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TaskId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeBatchLoadTask",
})) as any;

export type TagResourceError =
  | InvalidEndpointException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of tags with a Timestream resource. You can then activate
 * these user-defined tags so that they appear on the Billing and Cost Management console for
 * cost allocation tracking.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidEndpointException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of tags from a Timestream resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDatabaseError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the KMS key for an existing database. While updating the
 * database, you must specify the database name and the identifier of the new KMS key to be used (`KmsKeyId`). If there are any concurrent
 * `UpdateDatabase` requests, first writer wins.
 *
 * See code sample
 * for details.
 */
export const updateDatabase: API.OperationMethod<
  UpdateDatabaseRequest,
  UpdateDatabaseResponse,
  UpdateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DatabaseName: 0, KmsKeyId: 0 },
    output: { Database: o_Database },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatabase",
})) as any;

export type UpdateTableError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the retention duration of the memory store and magnetic store for your Timestream table. Note that the change in retention duration takes effect immediately.
 * For example, if the retention period of the memory store was initially set to 2 hours and
 * then changed to 24 hours, the memory store will be capable of holding 24 hours of data, but
 * will be populated with 24 hours of data 22 hours after this change was made. Timestream does not retrieve data from the magnetic store to populate the memory store.
 *
 * See code
 * sample for details.
 */
export const updateTable: API.OperationMethod<
  UpdateTableRequest,
  UpdateTableResponse,
  UpdateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatabaseName: 0,
      TableName: 0,
      RetentionProperties: i_RetentionProperties,
      MagneticStoreWriteProperties: i_MagneticStoreWriteProperties,
      Schema: i_Schema,
    },
    output: { Table: o_Table },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTable",
})) as any;

export type WriteRecordsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | RejectedRecordsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to write your time-series data into Timestream. You can specify a
 * single data point or a batch of data points to be inserted into the system. Timestream offers you a flexible schema that auto detects the column names and data
 * types for your Timestream tables based on the dimension names and data types of
 * the data points you specify when invoking writes into the database.
 *
 * Timestream supports eventual consistency read semantics. This means that when
 * you query data immediately after writing a batch of data into Timestream, the
 * query results might not reflect the results of a recently completed write operation. The
 * results may also include some stale data. If you repeat the query request after a short
 * time, the results should return the latest data. Service quotas apply.
 *
 * See code sample for
 * details.
 *
 * **Upserts**
 *
 * You can use the `Version` parameter in a `WriteRecords` request to
 * update data points. Timestream tracks a version number with each record.
 * `Version` defaults to `1` when it's not specified for the record
 * in the request. Timestream updates an existing record’s measure value along with
 * its `Version` when it receives a write request with a higher
 * `Version` number for that record. When it receives an update request where
 * the measure value is the same as that of the existing record, Timestream still
 * updates `Version`, if it is greater than the existing value of
 * `Version`. You can update a data point as many times as desired, as long as
 * the value of `Version` continuously increases.
 *
 * For example, suppose you write a new record without indicating `Version` in
 * the request. Timestream stores this record, and set `Version` to
 * `1`. Now, suppose you try to update this record with a
 * `WriteRecords` request of the same record with a different measure value but,
 * like before, do not provide `Version`. In this case, Timestream will
 * reject this update with a `RejectedRecordsException` since the updated record’s
 * version is not greater than the existing value of Version.
 *
 * However, if you were to resend the update request with `Version` set to
 * `2`, Timestream would then succeed in updating the record’s value,
 * and the `Version` would be set to `2`. Next, suppose you sent a
 * `WriteRecords` request with this same record and an identical measure value,
 * but with `Version` set to `3`. In this case, Timestream
 * would only update `Version` to `3`. Any further updates would need to
 * send a version number greater than `3`, or the update requests would receive a
 * `RejectedRecordsException`.
 */
export const writeRecords: API.OperationMethod<
  WriteRecordsRequest,
  WriteRecordsResponse,
  WriteRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DatabaseName: 0,
      TableName: 0,
      CommonAttributes: i_Record,
      Records: D.list(i_Record),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    RejectedRecordsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "WriteRecords",
})) as any;

const i_MagneticStoreWriteProperties: D.LazyStruct = () => ({
  EnableMagneticStoreWrites: 0,
  MagneticStoreRejectedDataLocation: {
    S3Configuration: {
      BucketName: 0,
      ObjectKeyPrefix: 0,
      EncryptionOption: 0,
      KmsKeyId: 0,
    },
  },
});
const i_MultiMeasureAttributeMapping: D.LazyStruct = () => ({
  SourceColumn: 0,
  TargetMultiMeasureAttributeName: 0,
  MeasureValueType: 0,
});
const i_Record: D.LazyStruct = () => ({
  Dimensions: D.list({ Name: 0, Value: 0, DimensionValueType: 0 }),
  MeasureName: 0,
  MeasureValue: 0,
  MeasureValueType: 0,
  Time: 0,
  TimeUnit: 0,
  Version: 0,
  MeasureValues: D.list({ Name: 0, Value: 0, Type: 0 }),
});
const i_RetentionProperties: D.LazyStruct = () => ({
  MemoryStoreRetentionPeriodInHours: 0,
  MagneticStoreRetentionPeriodInDays: 0,
});
const i_Schema: D.LazyStruct = () => ({
  CompositePartitionKey: D.list({ Type: 0, Name: 0, EnforcementInRecord: 0 }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Database: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdatedTime: D.ts,
});
const o_Table: D.LazyStruct = () => ({
  CreationTime: D.ts,
  LastUpdatedTime: D.ts,
});
