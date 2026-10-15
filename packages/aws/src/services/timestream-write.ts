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
  sdkId: "Timestream Write",
  serviceShapeName: "Timestream_20181101",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "timestream" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
          return err("FIPS is enabled but this partition does not support FIPS");
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
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://ingest.timestream.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://ingest.timestream.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidEndpointException
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointException>()(
    "InvalidEndpointException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(421),
  ) {}
export class RejectedRecordsException
  extends /*@__PURE__*/ S.TaggedError<RejectedRecordsException>()(
    "RejectedRecordsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      RejectedRecords: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(433, __c27, 1)).annotate({
          identifier: "RejectedRecords",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(419),
  ) {}
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
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TimestreamNotOnboarded
  extends /*@__PURE__*/ S.TaggedError<TimestreamNotOnboarded>()(
    "TimestreamNotOnboarded",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "AccessDeniedException",
      message: { includes: "Only existing Timestream for LiveAnalytics customers" },
    }),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientRequestToken = string | redacted.Redacted<string>;
export type StringValue256 = string;
export type TimeUnit = "MILLISECONDS" | "SECONDS" | "MICROSECONDS" | "NANOSECONDS" | (string & {});
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
export type PartitionKeyEnforcementLevel = "REQUIRED" | "OPTIONAL" | (string & {});
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
const Endpoint = /*@__PURE__*/ __L.at(__c1, 0) as any as S.Schema<Endpoint>;
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateBatchLoadTaskRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateBatchLoadTaskResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<CreateDatabaseRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateDatabaseResponse>,
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
}));

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
  input: __S(112, __c7, 0) as any as S.Schema<CreateTableRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<CreateTableResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<DeleteDatabaseRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<DeleteDatabaseResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<DeleteTableRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<DeleteTableResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<DescribeBatchLoadTaskRequest>,
  output: __S(211, __c13, 3) as any as S.Schema<DescribeBatchLoadTaskResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<DescribeDatabaseRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<DescribeDatabaseResponse>,
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
}));

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
 * service's architecture, including the management and mapping of the service endpoints,
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
  input: __S(240, __c15, 0) as any as S.Schema<DescribeEndpointsRequest>,
  output: __S(242, __c15, 2) as any as S.Schema<DescribeEndpointsResponse>,
  errors: [
    InternalServerException,
    ThrottlingException,
    ValidationException,
    TimestreamNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<DescribeTableRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DescribeTableResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<ListBatchLoadTasksRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<ListBatchLoadTasksResponse>,
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
  input: __S(288, __c18, 0) as any as S.Schema<ListDatabasesRequest>,
  output: __S(290, __c18, 2) as any as S.Schema<ListDatabasesResponse>,
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
  input: __S(304, __c19, 0) as any as S.Schema<ListTablesRequest>,
  output: __S(306, __c19, 2) as any as S.Schema<ListTablesResponse>,
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
  input: __S(320, __c20, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<ResumeBatchLoadTaskRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<ResumeBatchLoadTaskResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(369, __c23, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<UpdateDatabaseRequest>,
  output: __S(96, __c6, 0) as any as S.Schema<UpdateDatabaseResponse>,
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
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<UpdateTableRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<UpdateTableResponse>,
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
}));

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
 * in the request. Timestream updates an existing record's measure value along with
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
 * reject this update with a `RejectedRecordsException` since the updated record's
 * version is not greater than the existing value of Version.
 *
 * However, if you were to resend the update request with `Version` set to
 * `2`, Timestream would then succeed in updating the record's value,
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
  input: __S(422, __c26, 6) as any as S.Schema<WriteRecordsRequest>,
  output: __S(424, __c26, 8) as any as S.Schema<WriteRecordsResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          DataModelConfiguration: S.optional(__S(41, __c2, 9)),
          DataSourceConfiguration: __S(44, __c2, 12),
          ReportConfiguration: __S(46, __c2, 14),
          TargetDatabaseName: S.String,
          TargetTableName: S.String,
          RecordVersion: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBatchLoadTaskRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TaskId: S.String })).annotate({
        identifier: "CreateBatchLoadTaskResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Address: S.String, CachePeriodInMinutes: S.Number }),
      ).annotate({ identifier: "Endpoint" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceColumn: S.optional(S.String), DestinationColumn: S.optional(S.String) }),
      ).annotate({ identifier: "DimensionMapping" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SourceColumn: S.String,
          TargetMultiMeasureAttributeName: S.optional(S.String),
          MeasureValueType: S.optional(S.String),
        }),
      ).annotate({ identifier: "MultiMeasureAttributeMapping" });
    case 3:
      return S.Array(__S(34, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          TargetMultiMeasureName: S.optional(S.String),
          MultiMeasureAttributeMappings: __S(35, __c2, 3),
        }),
      ).annotate({ identifier: "MultiMeasureMappings" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MeasureName: S.optional(S.String),
          SourceColumn: S.optional(S.String),
          TargetMeasureName: S.optional(S.String),
          MeasureValueType: S.String,
          MultiMeasureAttributeMappings: S.optional(__S(35, __c2, 3)),
        }),
      ).annotate({ identifier: "MixedMeasureMapping" });
    case 6:
      return S.Array(__S(37, __c2, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          TimeColumn: S.optional(S.String),
          TimeUnit: S.optional(S.String),
          DimensionMappings: __S(33, __c2, 1),
          MultiMeasureMappings: S.optional(__S(36, __c2, 4)),
          MixedMeasureMappings: S.optional(__S(38, __c2, 6)),
          MeasureNameColumn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DataModel" });
    case 8:
      return S.suspend(() =>
        S.Struct({ BucketName: S.optional(S.String), ObjectKey: S.optional(S.String) }),
      ).annotate({ identifier: "DataModelS3Configuration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          DataModel: S.optional(__S(39, __c2, 7)),
          DataModelS3Configuration: S.optional(__S(40, __c2, 8)),
        }),
      ).annotate({ identifier: "DataModelConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({ BucketName: S.String, ObjectKeyPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "DataSourceS3Configuration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          ColumnSeparator: S.optional(S.String),
          EscapeChar: S.optional(S.String),
          QuoteChar: S.optional(S.String),
          NullValue: S.optional(S.String),
          TrimWhiteSpace: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CsvConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          DataSourceS3Configuration: __S(42, __c2, 10),
          CsvConfiguration: S.optional(__S(43, __c2, 11)),
          DataFormat: S.String,
        }),
      ).annotate({ identifier: "DataSourceConfiguration" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.String,
          ObjectKeyPrefix: S.optional(S.String),
          EncryptionOption: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReportS3Configuration" });
    case 14:
      return S.suspend(() =>
        S.Struct({ ReportS3Configuration: S.optional(__S(45, __c2, 13)) }),
      ).annotate({ identifier: "ReportConfiguration" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          KmsKeyId: S.optional(S.String),
          Tags: S.optional(__S(65, __c4, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDatabaseRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(64, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableCount: S.optional(S.Number),
          KmsKeyId: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Database" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Database: S.optional(__S(80, __c5, 0)) })).annotate({
        identifier: "CreateDatabaseResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          RetentionProperties: S.optional(__S(128, __c8, 0)),
          Tags: S.optional(__S(65, __c4, 1)),
          MagneticStoreWriteProperties: S.optional(__S(131, __c8, 3)),
          Schema: S.optional(__S(134, __c8, 6)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTableRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MemoryStoreRetentionPeriodInHours: S.Number,
          MagneticStoreRetentionPeriodInDays: S.Number,
        }),
      ).annotate({ identifier: "RetentionProperties" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.optional(S.String),
          ObjectKeyPrefix: S.optional(S.String),
          EncryptionOption: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Configuration" });
    case 2:
      return S.suspend(() => S.Struct({ S3Configuration: S.optional(__S(129, __c8, 1)) })).annotate(
        { identifier: "MagneticStoreRejectedDataLocation" },
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          EnableMagneticStoreWrites: S.Boolean,
          MagneticStoreRejectedDataLocation: S.optional(__S(130, __c8, 2)),
        }),
      ).annotate({ identifier: "MagneticStoreWriteProperties" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          Name: S.optional(S.String),
          EnforcementInRecord: S.optional(S.String),
        }),
      ).annotate({ identifier: "PartitionKey" });
    case 5:
      return S.Array(__S(132, __c8, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ CompositePartitionKey: S.optional(__S(133, __c8, 5)) }),
      ).annotate({ identifier: "Schema" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          TableName: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableStatus: S.optional(S.String),
          RetentionProperties: S.optional(__S(128, __c8, 0)),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MagneticStoreWriteProperties: S.optional(__S(131, __c8, 3)),
          Schema: S.optional(__S(134, __c8, 6)),
        }),
      ).annotate({ identifier: "Table" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Table: S.optional(__S(135, __c8, 7)) })).annotate({
        identifier: "CreateTableResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDatabaseRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteDatabaseResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.String, TableName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTableRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeBatchLoadTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecordsProcessed: S.optional(S.Number),
          RecordsIngested: S.optional(S.Number),
          ParseFailures: S.optional(S.Number),
          RecordIngestionFailures: S.optional(S.Number),
          FileFailures: S.optional(S.Number),
          BytesMetered: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BatchLoadProgressReport" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          DataSourceConfiguration: S.optional(__S(44, __c2, 12)),
          ProgressReport: S.optional(__S(209, __c13, 1)),
          ReportConfiguration: S.optional(__S(46, __c2, 14)),
          DataModelConfiguration: S.optional(__S(41, __c2, 9)),
          TargetDatabaseName: S.optional(S.String),
          TargetTableName: S.optional(S.String),
          TaskStatus: S.optional(S.String),
          RecordVersion: S.optional(S.Number),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResumableUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BatchLoadTaskDescription" });
    case 3:
      return S.suspend(() => S.Struct({ BatchLoadTaskDescription: __S(210, __c13, 2) })).annotate({
        identifier: "DescribeBatchLoadTaskResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeDatabaseRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEndpointsRequest" });
    case 1:
      return S.Array(Endpoint);
    case 2:
      return S.suspend(() => S.Struct({ Endpoints: __S(241, __c15, 1) })).annotate({
        identifier: "DescribeEndpointsResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.String, TableName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTableRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          TaskStatus: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBatchLoadTasksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TaskId: S.optional(S.String),
          TaskStatus: S.optional(S.String),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ResumableUntil: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BatchLoadTask" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          BatchLoadTasks: S.optional(__S(274, __c17, 2)),
        }),
      ).annotate({ identifier: "ListBatchLoadTasksResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDatabasesRequest" });
    case 1:
      return S.Array(__S(80, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Databases: S.optional(__S(289, __c18, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDatabasesResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTablesRequest" });
    case 1:
      return S.Array(__S(135, __c8, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({ Tables: S.optional(__S(305, __c19, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTablesResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(65, __c4, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ResumeBatchLoadTaskRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(65, __c4, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(368, __c23, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.String, KmsKeyId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDatabaseRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          RetentionProperties: S.optional(__S(128, __c8, 0)),
          MagneticStoreWriteProperties: S.optional(__S(131, __c8, 3)),
          Schema: S.optional(__S(134, __c8, 6)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTableRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Value: S.String, DimensionValueType: S.optional(S.String) }),
      ).annotate({ identifier: "Dimension" });
    case 1:
      return S.Array(__S(416, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Value: S.String, Type: S.String }),
      ).annotate({ identifier: "MeasureValue" });
    case 3:
      return S.Array(__S(418, __c26, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Dimensions: S.optional(__S(417, __c26, 1)),
          MeasureName: S.optional(S.String),
          MeasureValue: S.optional(S.String),
          MeasureValueType: S.optional(S.String),
          Time: S.optional(S.String),
          TimeUnit: S.optional(S.String),
          Version: S.optional(S.Number),
          MeasureValues: S.optional(__S(419, __c26, 3)),
        }),
      ).annotate({ identifier: "Record" });
    case 5:
      return S.Array(__S(420, __c26, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          CommonAttributes: S.optional(__S(420, __c26, 4)),
          Records: __S(421, __c26, 5),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "WriteRecordsRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Total: S.optional(S.Number),
          MemoryStore: S.optional(S.Number),
          MagneticStore: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RecordsIngested" });
    case 8:
      return S.suspend(() =>
        S.Struct({ RecordsIngested: S.optional(__S(423, __c26, 7)) }),
      ).annotate({ identifier: "WriteRecordsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecordIndex: S.optional(S.Number),
          Reason: S.optional(S.String),
          ExistingVersion: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RejectedRecord" });
    case 1:
      return S.Array(__S(432, __c27, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
