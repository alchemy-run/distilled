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
  sdkId: "Timestream Query",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
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
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://query.timestream.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "AccessDenied",
    status: 403,
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidEndpointException
  extends /*@__PURE__*/ TE.TaggedError("InvalidEndpointException", [], {
    status: 421,
  })<{ readonly message?: string }> {}
export class QueryExecutionException
  extends /*@__PURE__*/ TE.TaggedError(
    "QueryExecutionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly ScheduledQueryArn?: string }> {}
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
  )<{ readonly message?: string }> {}
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
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type QueryPricingModel =
  | "BYTES_SCANNED"
  | "COMPUTE_UNITS"
  | (string & {});
export type ComputeMode = "ON_DEMAND" | "PROVISIONED" | (string & {});
export type QueryTCU = number;
export interface AccountSettingsNotificationConfiguration {
  SnsConfiguration?: SnsConfiguration;
  RoleArn: string;
}
export type LastUpdateStatus =
  | "PENDING"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
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
export type ScheduledQueryInsightsMode =
  | "ENABLED_WITH_RATE_CONTROL"
  | "DISABLED"
  | (string & {});
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
export type QueryInsightsMode =
  | "ENABLED_WITH_RATE_CONTROL"
  | "DISABLED"
  | (string & {});
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
  descriptor: { service: svc, input: { QueryId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      QueryString: 0,
      ScheduleConfiguration: { ScheduleExpression: 0 },
      NotificationConfiguration: { SnsConfiguration: i_SnsConfiguration },
      TargetConfiguration: {
        TimestreamConfiguration: {
          DatabaseName: 0,
          TableName: 0,
          TimeColumn: 0,
          DimensionMappings: D.list({ Name: 0, DimensionValueType: 0 }),
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
      },
      ClientToken: D.m({ idempotency: true }),
      ScheduledQueryExecutionRoleArn: 0,
      Tags: D.list(i_Tag),
      KmsKeyId: 0,
      ErrorReportConfiguration: {
        S3Configuration: {
          BucketName: 0,
          ObjectKeyPrefix: 0,
          EncryptionOption: 0,
        },
      },
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { ScheduledQueryArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountSettings",
})) as any;

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
 * service’s architecture, including the management and mapping of the service endpoints,
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
  descriptor: {
    service: svc,
    input: { ScheduledQueryArn: 0 },
    output: {
      ScheduledQuery: {
        QueryString: D.secret,
        CreationTime: D.ts,
        PreviousInvocationTime: D.ts,
        NextInvocationTime: D.ts,
        LastRunSummary: o_ScheduledQueryRunSummary,
        RecentlyFailedRuns: D.list(o_ScheduledQueryRunSummary),
      },
    },
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
  operationName: "DescribeScheduledQuery",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ScheduledQueryArn: 0,
      InvocationTime: 0,
      ClientToken: D.m({ idempotency: true }),
      QueryInsights: { Mode: 0 },
    },
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
  operationName: "ExecuteScheduledQuery",
})) as any;

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
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0 },
    output: {
      ScheduledQueries: D.list({
        CreationTime: D.ts,
        PreviousInvocationTime: D.ts,
        NextInvocationTime: D.ts,
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
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, MaxResults: 0, NextToken: 0 },
  },
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
  descriptor: {
    service: svc,
    input: { QueryString: 0, ValidateOnly: 0 },
    output: { QueryString: D.secret },
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
  operationName: "PrepareQuery",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      QueryString: 0,
      ClientToken: D.m({ idempotency: true }),
      NextToken: 0,
      MaxRows: 0,
      QueryInsights: { Mode: 0 },
    },
  },
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
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      MaxQueryTCU: 0,
      QueryPricingModel: 0,
      QueryCompute: {
        ComputeMode: 0,
        ProvisionedCapacity: {
          TargetQueryTCU: 0,
          NotificationConfiguration: {
            SnsConfiguration: i_SnsConfiguration,
            RoleArn: 0,
          },
        },
      },
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
  operationName: "UpdateAccountSettings",
})) as any;

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
  descriptor: { service: svc, input: { ScheduledQueryArn: 0, State: 0 } },
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
})) as any;

const i_MultiMeasureAttributeMapping: D.LazyStruct = () => ({
  SourceColumn: 0,
  TargetMultiMeasureAttributeName: 0,
  MeasureValueType: 0,
});
const i_SnsConfiguration: D.LazyStruct = () => ({ TopicArn: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_ScheduledQueryRunSummary: D.LazyStruct = () => ({
  InvocationTime: D.ts,
  TriggerTime: D.ts,
});
