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
  sdkId: "PI",
  target: "PerformanceInsightsv20180227",
  version: "2018-02-27",
  sigv4: "pi",
  protocol: awsJson1_1Protocol,
  xmlns: "http://pi.amazonaws.com/doc/2018-02-27/",
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
                `https://pi-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://pi-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://pi.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://pi.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalServiceError
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceError")<{
    readonly message?: string;
  }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgumentException")<{
    readonly message?: string;
  }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError("NotAuthorizedException")<{
    readonly message?: string;
  }> {}
export type ServiceType = "RDS" | "DOCDB" | (string & {});
export type IdentifierString = string;
export type ISOTimestamp = Date;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreatePerformanceAnalysisReportRequest {
  ServiceType: ServiceType;
  Identifier: string;
  StartTime: Date;
  EndTime?: Date;
  Tags?: Tag[];
}
export type AnalysisReportId = string;
export interface CreatePerformanceAnalysisReportResponse {
  AnalysisReportId?: string;
}
export interface DeletePerformanceAnalysisReportRequest {
  ServiceType: ServiceType;
  Identifier: string;
  AnalysisReportId: string;
}
export interface DeletePerformanceAnalysisReportResponse {}
export type RequestString = string;
export type SanitizedString = string;
export type SanitizedStringList = string[];
export type Limit = number;
export interface DimensionGroup {
  Group: string;
  Dimensions?: string[];
  Limit?: number;
}
export type AdditionalMetricsList = string[];
export type MetricQueryFilterMap = { [key: string]: string | undefined };
export type MaxResults = number;
export type NextToken = string;
export interface DescribeDimensionKeysRequest {
  ServiceType: ServiceType;
  Identifier: string;
  StartTime: Date;
  EndTime: Date;
  Metric: string;
  PeriodInSeconds?: number;
  GroupBy: DimensionGroup;
  AdditionalMetrics?: string[];
  PartitionBy?: DimensionGroup;
  Filter?: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export type DimensionMap = { [key: string]: string | undefined };
export interface ResponsePartitionKey {
  Dimensions: { [key: string]: string | undefined };
}
export type ResponsePartitionKeyList = ResponsePartitionKey[];
export type AdditionalMetricsMap = { [key: string]: number | undefined };
export type MetricValuesList = number[];
export interface DimensionKeyDescription {
  Dimensions?: { [key: string]: string | undefined };
  Total?: number;
  AdditionalMetrics?: { [key: string]: number | undefined };
  Partitions?: number[];
}
export type DimensionKeyDescriptionList = DimensionKeyDescription[];
export interface DescribeDimensionKeysResponse {
  AlignedStartTime?: Date;
  AlignedEndTime?: Date;
  PartitionKeys?: ResponsePartitionKey[];
  Keys?: DimensionKeyDescription[];
  NextToken?: string;
}
export type RequestedDimensionList = string[];
export interface GetDimensionKeyDetailsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  Group: string;
  GroupIdentifier: string;
  RequestedDimensions?: string[];
}
export type DetailStatus =
  | "AVAILABLE"
  | "PROCESSING"
  | "UNAVAILABLE"
  | (string & {});
export interface DimensionKeyDetail {
  Value?: string;
  Dimension?: string;
  Status?: DetailStatus;
}
export type DimensionKeyDetailList = DimensionKeyDetail[];
export interface GetDimensionKeyDetailsResponse {
  Dimensions?: DimensionKeyDetail[];
}
export type TextFormat = "PLAIN_TEXT" | "MARKDOWN" | (string & {});
export type AcceptLanguage = "EN_US" | (string & {});
export interface GetPerformanceAnalysisReportRequest {
  ServiceType: ServiceType;
  Identifier: string;
  AnalysisReportId: string;
  TextFormat?: TextFormat;
  AcceptLanguage?: AcceptLanguage;
}
export type AnalysisStatus = "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
export type ContextType = "CAUSAL" | "CONTEXTUAL" | (string & {});
export type Severity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type MarkdownString = string | redacted.Redacted<string>;
export interface Recommendation {
  RecommendationId?: string;
  RecommendationDescription?: string | redacted.Redacted<string>;
  RecommendationDetails?: string | redacted.Redacted<string>;
}
export type RecommendationList = Recommendation[];
export type DescriptiveString = string;
export type DescriptiveMap = { [key: string]: string | undefined };
export interface PerformanceInsightsMetric {
  Metric?: string;
  DisplayName?: string;
  Dimensions?: { [key: string]: string | undefined };
  Filter?: { [key: string]: string | undefined };
  Value?: number;
}
export interface Data {
  PerformanceInsightsMetric?: PerformanceInsightsMetric;
}
export type DataList = Data[];
export interface Insight {
  InsightId: string;
  InsightType?: string;
  Context?: ContextType;
  StartTime?: Date;
  EndTime?: Date;
  Severity?: Severity;
  SupportingInsights?: Insight[];
  Description?: string | redacted.Redacted<string>;
  Recommendations?: Recommendation[];
  InsightData?: Data[];
  BaselineData?: Data[];
}
export type InsightList = Insight[];
export interface AnalysisReport {
  AnalysisReportId: string;
  Identifier?: string;
  ServiceType?: ServiceType;
  CreateTime?: Date;
  StartTime?: Date;
  EndTime?: Date;
  Status?: AnalysisStatus;
  Insights?: Insight[];
}
export interface GetPerformanceAnalysisReportResponse {
  AnalysisReport?: AnalysisReport;
}
export interface GetResourceMetadataRequest {
  ServiceType: ServiceType;
  Identifier: string;
}
export type FeatureStatus =
  | "ENABLED"
  | "DISABLED"
  | "UNSUPPORTED"
  | "ENABLED_PENDING_REBOOT"
  | "DISABLED_PENDING_REBOOT"
  | "UNKNOWN"
  | (string & {});
export interface FeatureMetadata {
  Status?: FeatureStatus;
}
export type FeatureMetadataMap = { [key: string]: FeatureMetadata | undefined };
export interface GetResourceMetadataResponse {
  Identifier?: string;
  Features?: { [key: string]: FeatureMetadata | undefined };
}
export interface MetricQuery {
  Metric: string;
  GroupBy?: DimensionGroup;
  Filter?: { [key: string]: string | undefined };
}
export type MetricQueryList = MetricQuery[];
export type PeriodAlignment = "END_TIME" | "START_TIME" | (string & {});
export interface GetResourceMetricsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  MetricQueries: MetricQuery[];
  StartTime: Date;
  EndTime: Date;
  PeriodInSeconds?: number;
  MaxResults?: number;
  NextToken?: string;
  PeriodAlignment?: PeriodAlignment;
}
export interface ResponseResourceMetricKey {
  Metric: string;
  Dimensions?: { [key: string]: string | undefined };
}
export interface DataPoint {
  Timestamp: Date;
  Value: number;
}
export type DataPointsList = DataPoint[];
export interface MetricKeyDataPoints {
  Key?: ResponseResourceMetricKey;
  DataPoints?: DataPoint[];
}
export type MetricKeyDataPointsList = MetricKeyDataPoints[];
export interface GetResourceMetricsResponse {
  AlignedStartTime?: Date;
  AlignedEndTime?: Date;
  Identifier?: string;
  MetricList?: MetricKeyDataPoints[];
  NextToken?: string;
}
export type DimensionsMetricList = string[];
export type FineGrainedAction =
  | "DescribeDimensionKeys"
  | "GetDimensionKeyDetails"
  | "GetResourceMetrics"
  | (string & {});
export type AuthorizedActionsList = FineGrainedAction[];
export interface ListAvailableResourceDimensionsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  Metrics: string[];
  MaxResults?: number;
  NextToken?: string;
  AuthorizedActions?: FineGrainedAction[];
}
export interface DimensionDetail {
  Identifier?: string;
}
export type DimensionDetailList = DimensionDetail[];
export interface DimensionGroupDetail {
  Group?: string;
  Dimensions?: DimensionDetail[];
}
export type DimensionGroupDetailList = DimensionGroupDetail[];
export interface MetricDimensionGroups {
  Metric?: string;
  Groups?: DimensionGroupDetail[];
}
export type MetricDimensionsList = MetricDimensionGroups[];
export interface ListAvailableResourceDimensionsResponse {
  MetricDimensions?: MetricDimensionGroups[];
  NextToken?: string;
}
export type MetricTypeList = string[];
export interface ListAvailableResourceMetricsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  MetricTypes: string[];
  NextToken?: string;
  MaxResults?: number;
}
export type Description = string;
export interface ResponseResourceMetric {
  Metric?: string;
  Description?: string;
  Unit?: string;
}
export type ResponseResourceMetricList = ResponseResourceMetric[];
export interface ListAvailableResourceMetricsResponse {
  Metrics?: ResponseResourceMetric[];
  NextToken?: string;
}
export type RecommendationIdList = string[];
export interface ListPerformanceAnalysisReportRecommendationsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  AnalysisReportId: string;
  RecommendationIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export interface ListPerformanceAnalysisReportRecommendationsResponse {
  Recommendations?: Recommendation[];
  NextToken?: string;
}
export interface ListPerformanceAnalysisReportsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  NextToken?: string;
  MaxResults?: number;
  ListTags?: boolean;
}
export interface AnalysisReportSummary {
  AnalysisReportId?: string;
  CreateTime?: Date;
  StartTime?: Date;
  EndTime?: Date;
  Status?: AnalysisStatus;
  Tags?: Tag[];
}
export type AnalysisReportSummaryList = AnalysisReportSummary[];
export interface ListPerformanceAnalysisReportsResponse {
  AnalysisReports?: AnalysisReportSummary[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ServiceType: ServiceType;
  ResourceARN: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface TagResourceRequest {
  ServiceType: ServiceType;
  ResourceARN: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ServiceType: ServiceType;
  ResourceARN: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorString = string;
export type CreatePerformanceAnalysisReportError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Creates a new performance analysis report for a specific time period for the
 * DB instance.
 */
export const createPerformanceAnalysisReport: API.OperationMethod<
  CreatePerformanceAnalysisReportRequest,
  CreatePerformanceAnalysisReportResponse,
  CreatePerformanceAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      StartTime: 0,
      EndTime: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePerformanceAnalysisReport",
})) as any;

export type DeletePerformanceAnalysisReportError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Deletes a performance analysis report.
 */
export const deletePerformanceAnalysisReport: API.OperationMethod<
  DeletePerformanceAnalysisReportRequest,
  DeletePerformanceAnalysisReportResponse,
  DeletePerformanceAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceType: 0, Identifier: 0, AnalysisReportId: 0 },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePerformanceAnalysisReport",
})) as any;

export type DescribeDimensionKeysError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * For a specific time period, retrieve the top `N` dimension keys for a metric.
 *
 * Each response element returns a maximum of 500 bytes. For larger elements, such as SQL statements,
 * only the first 500 bytes are returned.
 */
export const describeDimensionKeys: API.PaginatedOperationMethod<
  DescribeDimensionKeysRequest,
  DescribeDimensionKeysResponse,
  DescribeDimensionKeysError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      StartTime: 0,
      EndTime: 0,
      Metric: 0,
      PeriodInSeconds: 0,
      GroupBy: i_DimensionGroup,
      AdditionalMetrics: 0,
      PartitionBy: i_DimensionGroup,
      Filter: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { AlignedStartTime: D.ts, AlignedEndTime: D.ts },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDimensionKeys",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDimensionKeyDetailsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Get the attributes of the specified dimension group for a DB instance or data source. For example, if you specify a SQL ID,
 * `GetDimensionKeyDetails` retrieves the full text of the dimension `db.sql.statement` associated with this ID.
 * This operation is useful because `GetResourceMetrics` and `DescribeDimensionKeys` don't support retrieval of large
 * SQL statement text, lock snapshots, and execution plans.
 */
export const getDimensionKeyDetails: API.OperationMethod<
  GetDimensionKeyDetailsRequest,
  GetDimensionKeyDetailsResponse,
  GetDimensionKeyDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      Group: 0,
      GroupIdentifier: 0,
      RequestedDimensions: 0,
    },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDimensionKeyDetails",
})) as any;

export type GetPerformanceAnalysisReportError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieves the report including the report ID, status, time details, and the insights
 * with recommendations. The report status can be `RUNNING`,
 * `SUCCEEDED`, or `FAILED`. The insights include the
 * `description` and `recommendation` fields.
 */
export const getPerformanceAnalysisReport: API.OperationMethod<
  GetPerformanceAnalysisReportRequest,
  GetPerformanceAnalysisReportResponse,
  GetPerformanceAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      AnalysisReportId: 0,
      TextFormat: 0,
      AcceptLanguage: 0,
    },
    output: {
      AnalysisReport: {
        CreateTime: D.ts,
        StartTime: D.ts,
        EndTime: D.ts,
        Insights: D.list(o_Insight),
      },
    },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPerformanceAnalysisReport",
})) as any;

export type GetResourceMetadataError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve the metadata for different features. For example, the metadata might indicate
 * that a feature is turned on or off on a specific DB instance.
 */
export const getResourceMetadata: API.OperationMethod<
  GetResourceMetadataRequest,
  GetResourceMetadataResponse,
  GetResourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceType: 0, Identifier: 0 } },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceMetadata",
})) as any;

export type GetResourceMetricsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve Performance Insights metrics for a set of data sources over a time period. You can provide
 * specific dimension groups and dimensions, and provide filtering criteria for each group. You must specify an aggregate function for
 * each metric.
 *
 * Each response element returns a maximum of 500 bytes. For larger elements, such as SQL statements,
 * only the first 500 bytes are returned.
 */
export const getResourceMetrics: API.PaginatedOperationMethod<
  GetResourceMetricsRequest,
  GetResourceMetricsResponse,
  GetResourceMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      MetricQueries: D.list({
        Metric: 0,
        GroupBy: i_DimensionGroup,
        Filter: 0,
      }),
      StartTime: 0,
      EndTime: 0,
      PeriodInSeconds: 0,
      MaxResults: 0,
      NextToken: 0,
      PeriodAlignment: 0,
    },
    output: {
      AlignedStartTime: D.ts,
      AlignedEndTime: D.ts,
      MetricList: D.list({ DataPoints: D.list({ Timestamp: D.ts }) }),
    },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailableResourceDimensionsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve the dimensions that can be queried for each specified metric type on a specified DB instance.
 */
export const listAvailableResourceDimensions: API.PaginatedOperationMethod<
  ListAvailableResourceDimensionsRequest,
  ListAvailableResourceDimensionsResponse,
  ListAvailableResourceDimensionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      Metrics: 0,
      MaxResults: 0,
      NextToken: 0,
      AuthorizedActions: 0,
    },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableResourceDimensions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailableResourceMetricsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve metrics of the specified types that can be queried for a specified DB instance.
 */
export const listAvailableResourceMetrics: API.PaginatedOperationMethod<
  ListAvailableResourceMetricsRequest,
  ListAvailableResourceMetricsResponse,
  ListAvailableResourceMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      MetricTypes: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableResourceMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPerformanceAnalysisReportRecommendationsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieves recommendations for a performance analysis report.
 */
export const listPerformanceAnalysisReportRecommendations: API.PaginatedOperationMethod<
  ListPerformanceAnalysisReportRecommendationsRequest,
  ListPerformanceAnalysisReportRecommendationsResponse,
  ListPerformanceAnalysisReportRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      AnalysisReportId: 0,
      RecommendationIds: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: { Recommendations: D.list(o_Recommendation) },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPerformanceAnalysisReportRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recommendations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPerformanceAnalysisReportsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Lists all the analysis reports created for the DB instance. The reports are sorted based on the start time of each report.
 */
export const listPerformanceAnalysisReports: API.PaginatedOperationMethod<
  ListPerformanceAnalysisReportsRequest,
  ListPerformanceAnalysisReportsResponse,
  ListPerformanceAnalysisReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ServiceType: 0,
      Identifier: 0,
      NextToken: 0,
      MaxResults: 0,
      ListTags: 0,
    },
    output: {
      AnalysisReports: D.list({
        CreateTime: D.ts,
        StartTime: D.ts,
        EndTime: D.ts,
      }),
    },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPerformanceAnalysisReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieves all the metadata tags associated with Amazon RDS Performance Insights resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ServiceType: 0, ResourceARN: 0 } },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Adds metadata tags to the Amazon RDS Performance Insights resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceType: 0, ResourceARN: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Deletes the metadata tags from the Amazon RDS Performance Insights resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ServiceType: 0, ResourceARN: 0, TagKeys: 0 },
  },
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_DimensionGroup: D.LazyStruct = () => ({
  Group: 0,
  Dimensions: 0,
  Limit: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_Insight: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  SupportingInsights: D.list(o_Insight),
  Description: D.secret,
  Recommendations: D.list(o_Recommendation),
});
const o_Recommendation: D.LazyStruct = () => ({
  RecommendationDescription: D.secret,
  RecommendationDetails: D.secret,
});
