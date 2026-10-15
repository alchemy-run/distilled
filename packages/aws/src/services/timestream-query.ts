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
  sdkId: "Timestream Query",
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
              return e(`https://timestream-query-fips.${Region}.api.aws`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://timestream-query.${Region}.api.aws`);
            }
            return e(
              `https://query.timestream-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://query.timestream.${Region}.amazonaws.com`);
            }
            return e(
              `https://query.timestream-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://timestream-query.${Region}.api.aws`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://timestream-query.${Region}.api.aws`);
            }
            return e(
              `https://query.timestream.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://query.timestream.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://query.timestream.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "AccessDenied", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidEndpointException
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointException>()(
    "InvalidEndpointException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(421),
  ) {}
export class QueryExecutionException
  extends /*@__PURE__*/ S.TaggedError<QueryExecutionException>()(
    "QueryExecutionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ScheduledQueryArn: /*@__PURE__*/ S.optional(S.String),
    },
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
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TimestreamNotOnboarded
  extends /*@__PURE__*/ S.TaggedError<TimestreamNotOnboarded>()(
    "TimestreamNotOnboarded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "AccessDeniedException",
      message: { includes: "Only existing Timestream for LiveAnalytics customers" },
    }),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type QueryId = string;
export interface CancelQueryRequest {
  QueryId: string;
}
export interface CancelQueryResponse {
  CancellationMessage?: string;
}
export type ScheduledQueryName = string;
export type QueryString = string | redacted.Redacted<string>;
export type ScheduleExpression = string;
export interface ScheduleConfiguration {
  ScheduleExpression: string;
}
export type AmazonResourceName = string;
export interface SnsConfiguration {
  TopicArn: string;
}
export interface NotificationConfiguration {
  SnsConfiguration: SnsConfiguration;
}
export type ResourceName = string;
export type SchemaName = string;
export type DimensionValueType = "VARCHAR" | (string & {});
export interface DimensionMapping {
  Name: string;
  DimensionValueType: DimensionValueType;
}
export type DimensionMappingList = DimensionMapping[];
export type ScalarMeasureValueType =
  | "BIGINT"
  | "BOOLEAN"
  | "DOUBLE"
  | "VARCHAR"
  | "TIMESTAMP"
  | (string & {});
export interface MultiMeasureAttributeMapping {
  SourceColumn: string;
  TargetMultiMeasureAttributeName?: string;
  MeasureValueType: ScalarMeasureValueType;
}
export type MultiMeasureAttributeMappingList = MultiMeasureAttributeMapping[];
export interface MultiMeasureMappings {
  TargetMultiMeasureName?: string;
  MultiMeasureAttributeMappings: MultiMeasureAttributeMapping[];
}
export type MeasureValueType =
  | "BIGINT"
  | "BOOLEAN"
  | "DOUBLE"
  | "VARCHAR"
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
export interface TimestreamConfiguration {
  DatabaseName: string;
  TableName: string;
  TimeColumn: string;
  DimensionMappings: DimensionMapping[];
  MultiMeasureMappings?: MultiMeasureMappings;
  MixedMeasureMappings?: MixedMeasureMapping[];
  MeasureNameColumn?: string;
}
export interface TargetConfiguration {
  TimestreamConfiguration: TimestreamConfiguration;
}
export type ClientToken = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type StringValue2048 = string;
export type S3BucketName = string;
export type S3ObjectKeyPrefix = string;
export type S3EncryptionOption = "SSE_S3" | "SSE_KMS" | (string & {});
export interface S3Configuration {
  BucketName: string;
  ObjectKeyPrefix?: string;
  EncryptionOption?: S3EncryptionOption;
}
export interface ErrorReportConfiguration {
  S3Configuration: S3Configuration;
}
export interface CreateScheduledQueryRequest {
  Name: string;
  QueryString: string | redacted.Redacted<string>;
  ScheduleConfiguration: ScheduleConfiguration;
  NotificationConfiguration: NotificationConfiguration;
  TargetConfiguration?: TargetConfiguration;
  ClientToken?: string | redacted.Redacted<string>;
  ScheduledQueryExecutionRoleArn: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  ErrorReportConfiguration: ErrorReportConfiguration;
}
export interface CreateScheduledQueryResponse {
  Arn: string;
}
export interface DeleteScheduledQueryRequest {
  ScheduledQueryArn: string;
}
export interface DeleteScheduledQueryResponse {}
export interface DescribeAccountSettingsRequest {}
export type MaxQueryCapacity = number;
export type QueryPricingModel = "BYTES_SCANNED" | "COMPUTE_UNITS" | (string & {});
export type ComputeMode = "ON_DEMAND" | "PROVISIONED" | (string & {});
export type QueryTCU = number;
export interface AccountSettingsNotificationConfiguration {
  SnsConfiguration?: SnsConfiguration;
  RoleArn: string;
}
export type LastUpdateStatus = "PENDING" | "FAILED" | "SUCCEEDED" | (string & {});
export interface LastUpdate {
  TargetQueryTCU?: number;
  Status?: LastUpdateStatus;
  StatusMessage?: string;
}
export interface ProvisionedCapacityResponse {
  ActiveQueryTCU?: number;
  NotificationConfiguration?: AccountSettingsNotificationConfiguration;
  LastUpdate?: LastUpdate;
}
export interface QueryComputeResponse {
  ComputeMode?: ComputeMode;
  ProvisionedCapacity?: ProvisionedCapacityResponse;
}
export interface DescribeAccountSettingsResponse {
  MaxQueryTCU?: number;
  QueryPricingModel?: QueryPricingModel;
  QueryCompute?: QueryComputeResponse;
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
export interface DescribeScheduledQueryRequest {
  ScheduledQueryArn: string;
}
export type ScheduledQueryState = "ENABLED" | "DISABLED" | (string & {});
export type ScheduledQueryRunStatus =
  | "AUTO_TRIGGER_SUCCESS"
  | "AUTO_TRIGGER_FAILURE"
  | "MANUAL_TRIGGER_SUCCESS"
  | "MANUAL_TRIGGER_FAILURE"
  | (string & {});
export interface ExecutionStats {
  ExecutionTimeInMillis?: number;
  DataWrites?: number;
  BytesMetered?: number;
  CumulativeBytesScanned?: number;
  RecordsIngested?: number;
  QueryResultRows?: number;
}
export type PartitionKey = string;
export type PartitionKeyList = string[];
export interface QuerySpatialCoverageMax {
  Value?: number;
  TableArn?: string;
  PartitionKey?: string[];
}
export interface QuerySpatialCoverage {
  Max?: QuerySpatialCoverageMax;
}
export interface QueryTemporalRangeMax {
  Value?: number;
  TableArn?: string;
}
export interface QueryTemporalRange {
  Max?: QueryTemporalRangeMax;
}
export interface ScheduledQueryInsightsResponse {
  QuerySpatialCoverage?: QuerySpatialCoverage;
  QueryTemporalRange?: QueryTemporalRange;
  QueryTableCount?: number;
  OutputRows?: number;
  OutputBytes?: number;
}
export type S3ObjectKey = string;
export interface S3ReportLocation {
  BucketName?: string;
  ObjectKey?: string;
}
export interface ErrorReportLocation {
  S3ReportLocation?: S3ReportLocation;
}
export type ErrorMessage = string;
export interface ScheduledQueryRunSummary {
  InvocationTime?: Date;
  TriggerTime?: Date;
  RunStatus?: ScheduledQueryRunStatus;
  ExecutionStats?: ExecutionStats;
  QueryInsightsResponse?: ScheduledQueryInsightsResponse;
  ErrorReportLocation?: ErrorReportLocation;
  FailureReason?: string;
}
export type ScheduledQueryRunSummaryList = ScheduledQueryRunSummary[];
export interface ScheduledQueryDescription {
  Arn: string;
  Name: string;
  QueryString: string | redacted.Redacted<string>;
  CreationTime?: Date;
  State: ScheduledQueryState;
  PreviousInvocationTime?: Date;
  NextInvocationTime?: Date;
  ScheduleConfiguration: ScheduleConfiguration;
  NotificationConfiguration: NotificationConfiguration;
  TargetConfiguration?: TargetConfiguration;
  ScheduledQueryExecutionRoleArn?: string;
  KmsKeyId?: string;
  ErrorReportConfiguration?: ErrorReportConfiguration;
  LastRunSummary?: ScheduledQueryRunSummary;
  RecentlyFailedRuns?: ScheduledQueryRunSummary[];
}
export interface DescribeScheduledQueryResponse {
  ScheduledQuery: ScheduledQueryDescription;
}
export type ScheduledQueryInsightsMode = "ENABLED_WITH_RATE_CONTROL" | "DISABLED" | (string & {});
export interface ScheduledQueryInsights {
  Mode: ScheduledQueryInsightsMode;
}
export interface ExecuteScheduledQueryRequest {
  ScheduledQueryArn: string;
  InvocationTime: Date;
  ClientToken?: string | redacted.Redacted<string>;
  QueryInsights?: ScheduledQueryInsights;
}
export interface ExecuteScheduledQueryResponse {}
export type MaxScheduledQueriesResults = number;
export type NextScheduledQueriesResultsToken = string;
export interface ListScheduledQueriesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface TimestreamDestination {
  DatabaseName?: string;
  TableName?: string;
}
export interface TargetDestination {
  TimestreamDestination?: TimestreamDestination;
}
export interface ScheduledQuery {
  Arn: string;
  Name: string;
  CreationTime?: Date;
  State: ScheduledQueryState;
  PreviousInvocationTime?: Date;
  NextInvocationTime?: Date;
  ErrorReportConfiguration?: ErrorReportConfiguration;
  TargetDestination?: TargetDestination;
  LastRunStatus?: ScheduledQueryRunStatus;
}
export type ScheduledQueryList = ScheduledQuery[];
export interface ListScheduledQueriesResponse {
  ScheduledQueries: ScheduledQuery[];
  NextToken?: string;
}
export type MaxTagsForResourceResult = number;
export type NextTagsForResourceResultsToken = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Tags: Tag[];
  NextToken?: string;
}
export interface PrepareQueryRequest {
  QueryString: string | redacted.Redacted<string>;
  ValidateOnly?: boolean;
}
export type ScalarType =
  | "VARCHAR"
  | "BOOLEAN"
  | "BIGINT"
  | "DOUBLE"
  | "TIMESTAMP"
  | "DATE"
  | "TIME"
  | "INTERVAL_DAY_TO_SECOND"
  | "INTERVAL_YEAR_TO_MONTH"
  | "UNKNOWN"
  | "INTEGER"
  | (string & {});
export interface ColumnInfo {
  Name?: string;
  Type: Type;
}
export type ColumnInfoList = ColumnInfo[];
export interface Type {
  ScalarType?: ScalarType;
  ArrayColumnInfo?: ColumnInfo;
  TimeSeriesMeasureValueColumnInfo?: ColumnInfo;
  RowColumnInfo?: ColumnInfo[];
}
export interface SelectColumn {
  Name?: string;
  Type?: Type;
  DatabaseName?: string;
  TableName?: string;
  Aliased?: boolean;
}
export type SelectColumnList = SelectColumn[];
export interface ParameterMapping {
  Name: string;
  Type: Type;
}
export type ParameterMappingList = ParameterMapping[];
export interface PrepareQueryResponse {
  QueryString: string | redacted.Redacted<string>;
  Columns: SelectColumn[];
  Parameters: ParameterMapping[];
}
export type ClientRequestToken = string | redacted.Redacted<string>;
export type PaginationToken = string;
export type MaxQueryResults = number;
export type QueryInsightsMode = "ENABLED_WITH_RATE_CONTROL" | "DISABLED" | (string & {});
export interface QueryInsights {
  Mode: QueryInsightsMode;
}
export interface QueryRequest {
  QueryString: string | redacted.Redacted<string>;
  ClientToken?: string | redacted.Redacted<string>;
  NextToken?: string;
  MaxRows?: number;
  QueryInsights?: QueryInsights;
}
export type ScalarValue = string;
export interface TimeSeriesDataPoint {
  Time: string;
  Value: Datum;
}
export type TimeSeriesDataPointList = TimeSeriesDataPoint[];
export interface Datum {
  ScalarValue?: string;
  TimeSeriesValue?: TimeSeriesDataPoint[];
  ArrayValue?: Datum[];
  RowValue?: Row;
  NullValue?: boolean;
}
export type DatumList = Datum[];
export interface Row {
  Data: Datum[];
}
export type RowList = Row[];
export interface QueryStatus {
  ProgressPercentage?: number;
  CumulativeBytesScanned?: number;
  CumulativeBytesMetered?: number;
}
export interface QueryInsightsResponse {
  QuerySpatialCoverage?: QuerySpatialCoverage;
  QueryTemporalRange?: QueryTemporalRange;
  QueryTableCount?: number;
  OutputRows?: number;
  OutputBytes?: number;
  UnloadPartitionCount?: number;
  UnloadWrittenRows?: number;
  UnloadWrittenBytes?: number;
}
export interface QueryResponse {
  QueryId: string;
  NextToken?: string;
  Rows: Row[];
  ColumnInfo: ColumnInfo[];
  QueryStatus?: QueryStatus;
  QueryInsightsResponse?: QueryInsightsResponse;
}
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
export interface ProvisionedCapacityRequest {
  TargetQueryTCU: number;
  NotificationConfiguration?: AccountSettingsNotificationConfiguration;
}
export interface QueryComputeRequest {
  ComputeMode?: ComputeMode;
  ProvisionedCapacity?: ProvisionedCapacityRequest;
}
export interface UpdateAccountSettingsRequest {
  MaxQueryTCU?: number;
  QueryPricingModel?: QueryPricingModel;
  QueryCompute?: QueryComputeRequest;
}
export interface UpdateAccountSettingsResponse {
  MaxQueryTCU?: number;
  QueryPricingModel?: QueryPricingModel;
  QueryCompute?: QueryComputeResponse;
}
export interface UpdateScheduledQueryRequest {
  ScheduledQueryArn: string;
  State: ScheduledQueryState;
}
export interface UpdateScheduledQueryResponse {}
export type ServiceErrorMessage = string;
export type CancelQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a query that has been issued. Cancellation is provided only if the query has
 * not completed running before the cancellation request was issued. Because cancellation
 * is an idempotent operation, subsequent cancellation requests will return a
 * `CancellationMessage`, indicating that the query has already been
 * canceled. See code
 * sample for details.
 */
export const cancelQuery: API.OperationMethod<
  CancelQueryRequest,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelQueryRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CancelQueryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
}));

export type CreateScheduledQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidEndpointException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a scheduled query that will be run on your behalf at the configured schedule.
 * Timestream assumes the execution role provided as part of the
 * `ScheduledQueryExecutionRoleArn` parameter to run the query. You can use
 * the `NotificationConfiguration` parameter to configure notification for your
 * scheduled query operations.
 */
export const createScheduledQuery: API.OperationMethod<
  CreateScheduledQueryRequest,
  CreateScheduledQueryResponse,
  CreateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateScheduledQueryRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<CreateScheduledQueryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidEndpointException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledQuery",
}));

export type DeleteScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given scheduled query. This is an irreversible operation.
 */
export const deleteScheduledQuery: API.OperationMethod<
  DeleteScheduledQueryRequest,
  DeleteScheduledQueryResponse,
  DeleteScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteScheduledQueryRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteScheduledQueryResponse>,
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
  operationName: "DeleteScheduledQuery",
}));

export type DescribeAccountSettingsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the settings for your account that include the query pricing model and the configured maximum TCUs the service can use for your query workload.
 *
 * You're charged only for the duration of compute units used for your workloads.
 */
export const describeAccountSettings: API.OperationMethod<
  DescribeAccountSettingsRequest,
  DescribeAccountSettingsResponse,
  DescribeAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DescribeAccountSettingsRequest>,
  output: __S(164, __c10, 4) as any as S.Schema<DescribeAccountSettingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountSettings",
}));

export type DescribeEndpointsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | TimestreamNotOnboarded
  | CommonErrors;
/**
 * DescribeEndpoints returns a list of available endpoints to make Timestream
 * API calls against. This API is available through both Write and Query.
 *
 * Because the Timestream SDKs are designed to transparently work with the
 * service's architecture, including the management and mapping of the service endpoints,
 * *it is not recommended that you use this API unless*:
 *
 * - You are using VPC endpoints (Amazon Web Services PrivateLink) with Timestream
 *
 * - Your application uses a programming language that does not yet have SDK
 * support
 *
 * - You require better control over the client-side implementation
 *
 * For detailed information on how and when to use and implement DescribeEndpoints, see
 * The Endpoint Discovery Pattern.
 */
export const describeEndpoints: API.OperationMethod<
  DescribeEndpointsRequest,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DescribeEndpointsRequest>,
  output: __S(178, __c11, 2) as any as S.Schema<DescribeEndpointsResponse>,
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

export type DescribeScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides detailed information about a scheduled query.
 */
export const describeScheduledQuery: API.OperationMethod<
  DescribeScheduledQueryRequest,
  DescribeScheduledQueryResponse,
  DescribeScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DescribeScheduledQueryRequest>,
  output: __S(200, __c12, 8) as any as S.Schema<DescribeScheduledQueryResponse>,
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
  operationName: "DescribeScheduledQuery",
}));

export type ExecuteScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can use this API to run a scheduled query manually.
 *
 * If you enabled `QueryInsights`, this API also returns insights and metrics related to the query that you executed as part of an Amazon SNS notification. `QueryInsights` helps with performance tuning of your query. For more information about `QueryInsights`, see Using query insights to optimize queries in Amazon Timestream.
 */
export const executeScheduledQuery: API.OperationMethod<
  ExecuteScheduledQueryRequest,
  ExecuteScheduledQueryResponse,
  ExecuteScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ExecuteScheduledQueryRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<ExecuteScheduledQueryResponse>,
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
  operationName: "ExecuteScheduledQuery",
}));

export type ListScheduledQueriesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of all scheduled queries in the caller's Amazon account and Region.
 * `ListScheduledQueries` is eventually consistent.
 */
export const listScheduledQueries: API.PaginatedOperationMethod<
  ListScheduledQueriesRequest,
  ListScheduledQueriesResponse,
  ListScheduledQueriesError,
  Credentials | HttpClient.HttpClient,
  ScheduledQuery
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListScheduledQueriesRequest>,
  output: __S(277, __c17, 5) as any as S.Schema<ListScheduledQueriesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledQueries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduledQueries",
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
 * List all tags on a Timestream query resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PrepareQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A synchronous operation that allows you to submit a query with parameters to be stored
 * by Timestream for later running. Timestream only supports using this operation with
 * `ValidateOnly` set to `true`.
 */
export const prepareQuery: API.OperationMethod<
  PrepareQueryRequest,
  PrepareQueryResponse,
  PrepareQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<PrepareQueryRequest>,
  output: __S(309, __c19, 5) as any as S.Schema<PrepareQueryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PrepareQuery",
}));

export type QueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidEndpointException
  | QueryExecutionException
  | ThrottlingException
  | ValidationException
  | TimestreamNotOnboarded
  | CommonErrors;
/**
 * `Query` is a synchronous operation that enables you to run a query against
 * your Amazon Timestream data.
 *
 * If you enabled `QueryInsights`, this API also returns insights and metrics related to the query that you executed. `QueryInsights` helps with performance tuning of your query. For more information about `QueryInsights`, see Using query insights to optimize queries in Amazon Timestream.
 *
 * The maximum number of `Query` API requests you're allowed to make with `QueryInsights` enabled is 1 query per second (QPS). If you exceed this query rate, it might result in throttling.
 *
 * `Query` will time out after 60 seconds.
 * You must update the default timeout in the SDK to support a timeout of 60 seconds. See
 * the code
 * sample for details.
 *
 * Your query request will fail in the following cases:
 *
 * - If you submit a `Query` request with the same client token outside
 * of the 5-minute idempotency window.
 *
 * - If you submit a `Query` request with the same client token, but
 * change other parameters, within the 5-minute idempotency window.
 *
 * - If the size of the row (including the query metadata) exceeds 1 MB, then the
 * query will fail with the following error message:
 *
 * Query aborted as max page response size has been exceeded by the output
 * result row
 *
 * - If the IAM principal of the query initiator and the result reader are not the
 * same and/or the query initiator and the result reader do not have the same query
 * string in the query requests, the query will fail with an Invalid
 * pagination token error.
 */
export const query: API.PaginatedOperationMethod<
  QueryRequest,
  QueryResponse,
  QueryError,
  Credentials | HttpClient.HttpClient,
  Row
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<QueryRequest>,
  output: __S(345, __c21, 9) as any as S.Schema<QueryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidEndpointException,
    QueryExecutionException,
    ThrottlingException,
    ValidationException,
    TimestreamNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Query",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rows",
    pageSize: "MaxRows",
  } as const,
})) as any;

export type TagResourceError =
  | InvalidEndpointException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a set of tags with a Timestream resource. You can then activate these
 * user-defined tags so that they appear on the Billing and Cost Management console for
 * cost allocation tracking.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<TagResourceResponse>,
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
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of tags from a Timestream query resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountSettingsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Transitions your account to use TCUs for query pricing and modifies the maximum query compute units that you've configured. If you reduce the value of `MaxQueryTCU` to a desired configuration, the new value can take up to 24 hours to be effective.
 *
 * After you've transitioned your account to use TCUs for query pricing, you can't transition to using bytes scanned for query pricing.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  UpdateAccountSettingsResponse,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(386, __c24, 2) as any as S.Schema<UpdateAccountSettingsRequest>,
  output: __S(164, __c10, 4) as any as S.Schema<UpdateAccountSettingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a scheduled query.
 */
export const updateScheduledQuery: API.OperationMethod<
  UpdateScheduledQueryRequest,
  UpdateScheduledQueryResponse,
  UpdateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateScheduledQueryRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateScheduledQueryResponse>,
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
  operationName: "UpdateScheduledQuery",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelQueryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ CancellationMessage: S.optional(S.String) })).annotate({
        identifier: "CancelQueryResponse",
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
        S.Struct({
          Name: S.String,
          QueryString: SensitiveString,
          ScheduleConfiguration: __S(64, __c4, 0),
          NotificationConfiguration: __S(65, __c4, 1),
          TargetConfiguration: S.optional(__S(74, __c4, 10)),
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          ScheduledQueryExecutionRoleArn: S.String,
          Tags: S.optional(__S(97, __c6, 1)),
          KmsKeyId: S.optional(S.String),
          ErrorReportConfiguration: __S(81, __c5, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScheduledQueryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String })).annotate({
        identifier: "CreateScheduledQueryResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TopicArn: S.String })).annotate({
        identifier: "SnsConfiguration",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ScheduleExpression: S.String })).annotate({
        identifier: "ScheduleConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ SnsConfiguration: __S(48, __c3, 0) })).annotate({
        identifier: "NotificationConfiguration",
      });
    case 2:
      return S.suspend(() => S.Struct({ Name: S.String, DimensionValueType: S.String })).annotate({
        identifier: "DimensionMapping",
      });
    case 3:
      return S.Array(__S(66, __c4, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          SourceColumn: S.String,
          TargetMultiMeasureAttributeName: S.optional(S.String),
          MeasureValueType: S.String,
        }),
      ).annotate({ identifier: "MultiMeasureAttributeMapping" });
    case 5:
      return S.Array(__S(68, __c4, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          TargetMultiMeasureName: S.optional(S.String),
          MultiMeasureAttributeMappings: __S(69, __c4, 5),
        }),
      ).annotate({ identifier: "MultiMeasureMappings" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          MeasureName: S.optional(S.String),
          SourceColumn: S.optional(S.String),
          TargetMeasureName: S.optional(S.String),
          MeasureValueType: S.String,
          MultiMeasureAttributeMappings: S.optional(__S(69, __c4, 5)),
        }),
      ).annotate({ identifier: "MixedMeasureMapping" });
    case 8:
      return S.Array(__S(71, __c4, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          DatabaseName: S.String,
          TableName: S.String,
          TimeColumn: S.String,
          DimensionMappings: __S(67, __c4, 3),
          MultiMeasureMappings: S.optional(__S(70, __c4, 6)),
          MixedMeasureMappings: S.optional(__S(72, __c4, 8)),
          MeasureNameColumn: S.optional(S.String),
        }),
      ).annotate({ identifier: "TimestreamConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ TimestreamConfiguration: __S(73, __c4, 9) })).annotate({
        identifier: "TargetConfiguration",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.String,
          ObjectKeyPrefix: S.optional(S.String),
          EncryptionOption: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Configuration" });
    case 1:
      return S.suspend(() => S.Struct({ S3Configuration: __S(80, __c5, 0) })).annotate({
        identifier: "ErrorReportConfiguration",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduledQueryArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteScheduledQueryRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteScheduledQueryResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountSettingsRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SnsConfiguration: S.optional(__S(48, __c3, 0)), RoleArn: S.String }),
      ).annotate({ identifier: "AccountSettingsNotificationConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TargetQueryTCU: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "LastUpdate" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ActiveQueryTCU: S.optional(S.Number),
          NotificationConfiguration: S.optional(__S(160, __c10, 0)),
          LastUpdate: S.optional(__S(161, __c10, 1)),
        }),
      ).annotate({ identifier: "ProvisionedCapacityResponse" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ComputeMode: S.optional(S.String),
          ProvisionedCapacity: S.optional(__S(162, __c10, 2)),
        }),
      ).annotate({ identifier: "QueryComputeResponse" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MaxQueryTCU: S.optional(S.Number),
          QueryPricingModel: S.optional(S.String),
          QueryCompute: S.optional(__S(163, __c10, 3)),
        }),
      ).annotate({ identifier: "DescribeAccountSettingsResponse" });
  }
}
function __c11(j: number): any {
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
      return S.suspend(() => S.Struct({ Endpoints: __S(177, __c11, 1) })).annotate({
        identifier: "DescribeEndpointsResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduledQueryArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeScheduledQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ExecutionTimeInMillis: S.optional(S.Number),
          DataWrites: S.optional(S.Number),
          BytesMetered: S.optional(S.Number),
          CumulativeBytesScanned: S.optional(S.Number),
          RecordsIngested: S.optional(S.Number),
          QueryResultRows: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ExecutionStats" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          QuerySpatialCoverage: S.optional(__S(209, __c13, 1)),
          QueryTemporalRange: S.optional(__S(211, __c13, 3)),
          QueryTableCount: S.optional(S.Number),
          OutputRows: S.optional(S.Number),
          OutputBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScheduledQueryInsightsResponse" });
    case 3:
      return S.suspend(() =>
        S.Struct({ BucketName: S.optional(S.String), ObjectKey: S.optional(S.String) }),
      ).annotate({ identifier: "S3ReportLocation" });
    case 4:
      return S.suspend(() =>
        S.Struct({ S3ReportLocation: S.optional(__S(195, __c12, 3)) }),
      ).annotate({ identifier: "ErrorReportLocation" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          InvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TriggerTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RunStatus: S.optional(S.String),
          ExecutionStats: S.optional(__S(193, __c12, 1)),
          QueryInsightsResponse: S.optional(__S(194, __c12, 2)),
          ErrorReportLocation: S.optional(__S(196, __c12, 4)),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledQueryRunSummary" });
    case 6:
      return S.Array(__S(197, __c12, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          QueryString: SensitiveString,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.String,
          PreviousInvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NextInvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScheduleConfiguration: __S(64, __c4, 0),
          NotificationConfiguration: __S(65, __c4, 1),
          TargetConfiguration: S.optional(__S(74, __c4, 10)),
          ScheduledQueryExecutionRoleArn: S.optional(S.String),
          KmsKeyId: S.optional(S.String),
          ErrorReportConfiguration: S.optional(__S(81, __c5, 1)),
          LastRunSummary: S.optional(__S(197, __c12, 5)),
          RecentlyFailedRuns: S.optional(__S(198, __c12, 6)),
        }),
      ).annotate({ identifier: "ScheduledQueryDescription" });
    case 8:
      return S.suspend(() => S.Struct({ ScheduledQuery: __S(199, __c12, 7) })).annotate({
        identifier: "DescribeScheduledQueryResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.Number),
          TableArn: S.optional(S.String),
          PartitionKey: S.optional(__S(224, __c14, 0)),
        }),
      ).annotate({ identifier: "QuerySpatialCoverageMax" });
    case 1:
      return S.suspend(() => S.Struct({ Max: S.optional(__S(208, __c13, 0)) })).annotate({
        identifier: "QuerySpatialCoverage",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.Number), TableArn: S.optional(S.String) }),
      ).annotate({ identifier: "QueryTemporalRangeMax" });
    case 3:
      return S.suspend(() => S.Struct({ Max: S.optional(__S(210, __c13, 2)) })).annotate({
        identifier: "QueryTemporalRange",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduledQueryArn: S.String,
          InvocationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          QueryInsights: S.optional(__S(256, __c16, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ExecuteScheduledQueryRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Mode: S.String })).annotate({
        identifier: "ScheduledQueryInsights",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListScheduledQueriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DatabaseName: S.optional(S.String), TableName: S.optional(S.String) }),
      ).annotate({ identifier: "TimestreamDestination" });
    case 2:
      return S.suspend(() =>
        S.Struct({ TimestreamDestination: S.optional(__S(273, __c17, 1)) }),
      ).annotate({ identifier: "TargetDestination" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.String,
          CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          State: S.String,
          PreviousInvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NextInvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ErrorReportConfiguration: S.optional(__S(81, __c5, 1)),
          TargetDestination: S.optional(__S(274, __c17, 2)),
          LastRunStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduledQuery" });
    case 4:
      return S.Array(__S(275, __c17, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ ScheduledQueries: __S(276, __c17, 4), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListScheduledQueriesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: __S(97, __c6, 1), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ QueryString: SensitiveString, ValidateOnly: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PrepareQueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.optional(__S(322, __c20, 2)),
          DatabaseName: S.optional(S.String),
          TableName: S.optional(S.String),
          Aliased: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SelectColumn" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() => S.Struct({ Name: S.String, Type: __S(322, __c20, 2) })).annotate({
        identifier: "ParameterMapping",
      });
    case 4:
      return S.Array(__S(307, __c19, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          QueryString: SensitiveString,
          Columns: __S(306, __c19, 2),
          Parameters: __S(308, __c19, 4),
        }),
      ).annotate({ identifier: "PrepareQueryResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Type: S.suspend((): S.Schema<Type> => __S(322, __c20, 2)).annotate({
            identifier: "Type",
          }),
        }),
      ).annotate({ identifier: "ColumnInfo" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<ColumnInfo> => __S(320, __c20, 0)).annotate({
          identifier: "ColumnInfo",
        }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          ScalarType: S.optional(S.String),
          ArrayColumnInfo: S.optional(
            S.suspend((): S.Schema<ColumnInfo> => __S(320, __c20, 0)).annotate({
              identifier: "ColumnInfo",
            }),
          ),
          TimeSeriesMeasureValueColumnInfo: S.optional(
            S.suspend((): S.Schema<ColumnInfo> => __S(320, __c20, 0)).annotate({
              identifier: "ColumnInfo",
            }),
          ),
          RowColumnInfo: S.optional(
            S.suspend(() => __S(321, __c20, 1)).annotate({ identifier: "ColumnInfoList" }),
          ),
        }),
      ).annotate({ identifier: "Type" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          QueryString: SensitiveString,
          ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
          NextToken: S.optional(S.String),
          MaxRows: S.optional(S.Number),
          QueryInsights: S.optional(__S(256, __c16, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "QueryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Time: S.String,
          Value: S.suspend((): S.Schema<Datum> => __S(339, __c21, 3)).annotate({
            identifier: "Datum",
          }),
        }),
      ).annotate({ identifier: "TimeSeriesDataPoint" });
    case 2:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<TimeSeriesDataPoint> => __S(337, __c21, 1)).annotate({
          identifier: "TimeSeriesDataPoint",
        }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          ScalarValue: S.optional(S.String),
          TimeSeriesValue: S.optional(
            S.suspend(() => __S(338, __c21, 2)).annotate({ identifier: "TimeSeriesDataPointList" }),
          ),
          ArrayValue: S.optional(
            S.suspend(() => __S(340, __c21, 4)).annotate({ identifier: "DatumList" }),
          ),
          RowValue: S.optional(
            S.suspend((): S.Schema<Row> => __S(341, __c21, 5)).annotate({ identifier: "Row" }),
          ),
          NullValue: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Datum" });
    case 4:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Datum> => __S(339, __c21, 3)).annotate({
          identifier: "Datum",
        }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          Data: S.suspend(() => __S(340, __c21, 4)).annotate({ identifier: "DatumList" }),
        }),
      ).annotate({ identifier: "Row" });
    case 6:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Row> => __S(341, __c21, 5)).annotate({
          identifier: "Row",
        }),
      );
    case 7:
      return S.suspend(() =>
        S.Struct({
          ProgressPercentage: S.optional(S.Number),
          CumulativeBytesScanned: S.optional(S.Number),
          CumulativeBytesMetered: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueryStatus" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          QuerySpatialCoverage: S.optional(__S(209, __c13, 1)),
          QueryTemporalRange: S.optional(__S(211, __c13, 3)),
          QueryTableCount: S.optional(S.Number),
          OutputRows: S.optional(S.Number),
          OutputBytes: S.optional(S.Number),
          UnloadPartitionCount: S.optional(S.Number),
          UnloadWrittenRows: S.optional(S.Number),
          UnloadWrittenBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "QueryInsightsResponse" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          QueryId: S.String,
          NextToken: S.optional(S.String),
          Rows: __S(342, __c21, 6),
          ColumnInfo: __S(321, __c20, 1),
          QueryStatus: S.optional(__S(343, __c21, 7)),
          QueryInsightsResponse: S.optional(__S(344, __c21, 8)),
        }),
      ).annotate({ identifier: "QueryResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(97, __c6, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(224, __c14, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetQueryTCU: S.Number,
          NotificationConfiguration: S.optional(__S(160, __c10, 0)),
        }),
      ).annotate({ identifier: "ProvisionedCapacityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ComputeMode: S.optional(S.String),
          ProvisionedCapacity: S.optional(__S(384, __c24, 0)),
        }),
      ).annotate({ identifier: "QueryComputeRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MaxQueryTCU: S.optional(S.Number),
          QueryPricingModel: S.optional(S.String),
          QueryCompute: S.optional(__S(385, __c24, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAccountSettingsRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ScheduledQueryArn: S.String, State: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateScheduledQueryRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
