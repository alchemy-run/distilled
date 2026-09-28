import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "DevOps Guru",
  target: "CapstoneControlPlaneService",
  version: "2020-12-01",
  sigv4: "devops-guru",
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
                `https://devops-guru-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://devops-guru-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://devops-guru.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://devops-guru.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly RetryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
  }> {}
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
    { status: 429, headers: { RetryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
    readonly RetryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export type TopicArn = string;
export interface SnsChannelConfig {
  TopicArn?: string;
}
export type InsightSeverity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type InsightSeverities = InsightSeverity[];
export type NotificationMessageType =
  | "NEW_INSIGHT"
  | "CLOSED_INSIGHT"
  | "NEW_ASSOCIATION"
  | "SEVERITY_UPGRADED"
  | "NEW_RECOMMENDATION"
  | (string & {});
export type NotificationMessageTypes = NotificationMessageType[];
export interface NotificationFilterConfig {
  Severities?: InsightSeverity[];
  MessageTypes?: NotificationMessageType[];
}
export interface NotificationChannelConfig {
  Sns: SnsChannelConfig;
  Filters?: NotificationFilterConfig;
}
export interface AddNotificationChannelRequest {
  Config: NotificationChannelConfig;
}
export type NotificationChannelId = string;
export interface AddNotificationChannelResponse {
  Id: string;
}
export type InsightId = string;
export interface DeleteInsightRequest {
  Id: string;
}
export interface DeleteInsightResponse {}
export interface DescribeAccountHealthRequest {}
export type NumOpenReactiveInsights = number;
export type NumOpenProactiveInsights = number;
export type NumMetricsAnalyzed = number;
export type ResourceHours = number;
export type AnalyzedResourceCount = number;
export interface DescribeAccountHealthResponse {
  OpenReactiveInsights: number;
  OpenProactiveInsights: number;
  MetricsAnalyzed: number;
  ResourceHours: number;
  AnalyzedResourceCount?: number;
}
export interface DescribeAccountOverviewRequest {
  FromTime: Date;
  ToTime?: Date;
}
export type NumReactiveInsights = number;
export type NumProactiveInsights = number;
export type MeanTimeToRecoverInMilliseconds = number;
export interface DescribeAccountOverviewResponse {
  ReactiveInsights: number;
  ProactiveInsights: number;
  MeanTimeToRecoverInMilliseconds: number;
}
export type AnomalyId = string;
export type AwsAccountId = string;
export interface DescribeAnomalyRequest {
  Id: string;
  AccountId?: string;
}
export type AnomalySeverity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type AnomalyStatus = "ONGOING" | "CLOSED" | (string & {});
export interface AnomalyTimeRange {
  StartTime: Date;
  EndTime?: Date;
}
export interface AnomalyReportedTimeRange {
  OpenTime: Date;
  CloseTime?: Date;
}
export interface PredictionTimeRange {
  StartTime: Date;
  EndTime?: Date;
}
export type CloudWatchMetricsMetricName = string;
export type CloudWatchMetricsNamespace = string;
export type CloudWatchMetricsDimensionName = string;
export type CloudWatchMetricsDimensionValue = string;
export interface CloudWatchMetricsDimension {
  Name?: string;
  Value?: string;
}
export type CloudWatchMetricsDimensions = CloudWatchMetricsDimension[];
export type CloudWatchMetricsStat =
  | "Sum"
  | "Average"
  | "SampleCount"
  | "Minimum"
  | "Maximum"
  | "p99"
  | "p90"
  | "p50"
  | (string & {});
export type CloudWatchMetricsUnit = string;
export type CloudWatchMetricsPeriod = number;
export type MetricValue = number;
export interface TimestampMetricValuePair {
  Timestamp?: Date;
  MetricValue?: number;
}
export type TimestampMetricValuePairList = TimestampMetricValuePair[];
export type CloudWatchMetricDataStatusCode =
  | "Complete"
  | "InternalError"
  | "PartialData"
  | (string & {});
export interface CloudWatchMetricsDataSummary {
  TimestampMetricValuePairList?: TimestampMetricValuePair[];
  StatusCode?: CloudWatchMetricDataStatusCode;
}
export interface CloudWatchMetricsDetail {
  MetricName?: string;
  Namespace?: string;
  Dimensions?: CloudWatchMetricsDimension[];
  Stat?: CloudWatchMetricsStat;
  Unit?: string;
  Period?: number;
  MetricDataSummary?: CloudWatchMetricsDataSummary;
}
export type CloudWatchMetricsDetails = CloudWatchMetricsDetail[];
export type PerformanceInsightsMetricDisplayName = string;
export type PerformanceInsightsMetricUnit = string;
export type PerformanceInsightsMetricName = string;
export type PerformanceInsightsMetricGroup = string;
export type PerformanceInsightsMetricDimension = string;
export type PerformanceInsightsMetricDimensions = string[];
export type PerformanceInsightsMetricLimitInteger = number;
export interface PerformanceInsightsMetricDimensionGroup {
  Group?: string;
  Dimensions?: string[];
  Limit?: number;
}
export type PerformanceInsightsMetricFilterKey = string;
export type PerformanceInsightsMetricFilterValue = string;
export type PerformanceInsightsMetricFilterMap = {
  [key: string]: string | undefined;
};
export interface PerformanceInsightsMetricQuery {
  Metric?: string;
  GroupBy?: PerformanceInsightsMetricDimensionGroup;
  Filter?: { [key: string]: string | undefined };
}
export type PerformanceInsightsReferenceName = string;
export type PerformanceInsightsValueDouble = number;
export interface PerformanceInsightsReferenceScalar {
  Value?: number;
}
export interface PerformanceInsightsReferenceMetric {
  MetricQuery?: PerformanceInsightsMetricQuery;
}
export interface PerformanceInsightsReferenceComparisonValues {
  ReferenceScalar?: PerformanceInsightsReferenceScalar;
  ReferenceMetric?: PerformanceInsightsReferenceMetric;
}
export interface PerformanceInsightsReferenceData {
  Name?: string;
  ComparisonValues?: PerformanceInsightsReferenceComparisonValues;
}
export type PerformanceInsightsReferenceDataList =
  PerformanceInsightsReferenceData[];
export type PerformanceInsightsStatType = string;
export interface PerformanceInsightsStat {
  Type?: string;
  Value?: number;
}
export type PerformanceInsightsStats = PerformanceInsightsStat[];
export interface PerformanceInsightsMetricsDetail {
  MetricDisplayName?: string;
  Unit?: string;
  MetricQuery?: PerformanceInsightsMetricQuery;
  ReferenceData?: PerformanceInsightsReferenceData[];
  StatsAtAnomaly?: PerformanceInsightsStat[];
  StatsAtBaseline?: PerformanceInsightsStat[];
}
export type PerformanceInsightsMetricsDetails =
  PerformanceInsightsMetricsDetail[];
export interface AnomalySourceDetails {
  CloudWatchMetrics?: CloudWatchMetricsDetail[];
  PerformanceInsightsMetrics?: PerformanceInsightsMetricsDetail[];
}
export type StackName = string;
export type StackNames = string[];
export interface CloudFormationCollection {
  StackNames?: string[];
}
export type AppBoundaryKey = string;
export type TagValue = string;
export type TagValues = string[];
export interface TagCollection {
  AppBoundaryKey: string;
  TagValues: string[];
}
export type TagCollections = TagCollection[];
export interface ResourceCollection {
  CloudFormation?: CloudFormationCollection;
  Tags?: TagCollection[];
}
export type AnomalyLimit = number;
export type AnomalySource = string;
export type ResourceName = string;
export type ResourceType = string;
export interface AnomalySourceMetadata {
  Source?: string;
  SourceResourceName?: string;
  SourceResourceType?: string;
}
export interface AnomalyResource {
  Name?: string;
  Type?: string;
}
export type AnomalyResources = AnomalyResource[];
export type AnomalyDescription = string;
export interface ProactiveAnomaly {
  Id?: string;
  Severity?: AnomalySeverity;
  Status?: AnomalyStatus;
  UpdateTime?: Date;
  AnomalyTimeRange?: AnomalyTimeRange;
  AnomalyReportedTimeRange?: AnomalyReportedTimeRange;
  PredictionTimeRange?: PredictionTimeRange;
  SourceDetails?: AnomalySourceDetails;
  AssociatedInsightId?: string;
  ResourceCollection?: ResourceCollection;
  Limit?: number;
  SourceMetadata?: AnomalySourceMetadata;
  AnomalyResources?: AnomalyResource[];
  Description?: string;
}
export type AnomalyType = "CAUSAL" | "CONTEXTUAL" | (string & {});
export type AnomalyName = string;
export interface ReactiveAnomaly {
  Id?: string;
  Severity?: AnomalySeverity;
  Status?: AnomalyStatus;
  AnomalyTimeRange?: AnomalyTimeRange;
  AnomalyReportedTimeRange?: AnomalyReportedTimeRange;
  SourceDetails?: AnomalySourceDetails;
  AssociatedInsightId?: string;
  ResourceCollection?: ResourceCollection;
  Type?: AnomalyType;
  Name?: string;
  Description?: string;
  CausalAnomalyId?: string;
  AnomalyResources?: AnomalyResource[];
}
export interface DescribeAnomalyResponse {
  ProactiveAnomaly?: ProactiveAnomaly;
  ReactiveAnomaly?: ReactiveAnomaly;
}
export interface DescribeEventSourcesConfigRequest {}
export type EventSourceOptInStatus = "ENABLED" | "DISABLED" | (string & {});
export interface AmazonCodeGuruProfilerIntegration {
  Status?: EventSourceOptInStatus;
}
export interface EventSourcesConfig {
  AmazonCodeGuruProfiler?: AmazonCodeGuruProfilerIntegration;
}
export interface DescribeEventSourcesConfigResponse {
  EventSources?: EventSourcesConfig;
}
export interface DescribeFeedbackRequest {
  InsightId?: string;
}
export type InsightFeedbackOption =
  | "VALID_COLLECTION"
  | "RECOMMENDATION_USEFUL"
  | "ALERT_TOO_SENSITIVE"
  | "DATA_NOISY_ANOMALY"
  | "DATA_INCORRECT"
  | (string & {});
export interface InsightFeedback {
  Id?: string;
  Feedback?: InsightFeedbackOption;
}
export interface DescribeFeedbackResponse {
  InsightFeedback?: InsightFeedback;
}
export interface DescribeInsightRequest {
  Id: string;
  AccountId?: string;
}
export type InsightName = string;
export type InsightStatus = "ONGOING" | "CLOSED" | (string & {});
export interface InsightTimeRange {
  StartTime: Date;
  EndTime?: Date;
}
export type SsmOpsItemId = string;
export type InsightDescription = string;
export interface ProactiveInsight {
  Id?: string;
  Name?: string;
  Severity?: InsightSeverity;
  Status?: InsightStatus;
  InsightTimeRange?: InsightTimeRange;
  PredictionTimeRange?: PredictionTimeRange;
  ResourceCollection?: ResourceCollection;
  SsmOpsItemId?: string;
  Description?: string;
}
export interface ReactiveInsight {
  Id?: string;
  Name?: string;
  Severity?: InsightSeverity;
  Status?: InsightStatus;
  InsightTimeRange?: InsightTimeRange;
  ResourceCollection?: ResourceCollection;
  SsmOpsItemId?: string;
  Description?: string;
}
export interface DescribeInsightResponse {
  ProactiveInsight?: ProactiveInsight;
  ReactiveInsight?: ReactiveInsight;
}
export type AccountIdList = string[];
export type OrganizationalUnitId = string;
export type OrganizationalUnitIdList = string[];
export interface DescribeOrganizationHealthRequest {
  AccountIds?: string[];
  OrganizationalUnitIds?: string[];
}
export interface DescribeOrganizationHealthResponse {
  OpenReactiveInsights: number;
  OpenProactiveInsights: number;
  MetricsAnalyzed: number;
  ResourceHours: number;
}
export interface DescribeOrganizationOverviewRequest {
  FromTime: Date;
  ToTime?: Date;
  AccountIds?: string[];
  OrganizationalUnitIds?: string[];
}
export interface DescribeOrganizationOverviewResponse {
  ReactiveInsights: number;
  ProactiveInsights: number;
}
export type OrganizationResourceCollectionType =
  | "AWS_CLOUD_FORMATION"
  | "AWS_SERVICE"
  | "AWS_ACCOUNT"
  | "AWS_TAGS"
  | (string & {});
export type UuidNextToken = string;
export type OrganizationResourceCollectionMaxResults = number;
export interface DescribeOrganizationResourceCollectionHealthRequest {
  OrganizationResourceCollectionType: OrganizationResourceCollectionType;
  AccountIds?: string[];
  OrganizationalUnitIds?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export interface InsightHealth {
  OpenProactiveInsights?: number;
  OpenReactiveInsights?: number;
  MeanTimeToRecoverInMilliseconds?: number;
}
export interface CloudFormationHealth {
  StackName?: string;
  Insight?: InsightHealth;
  AnalyzedResourceCount?: number;
}
export type CloudFormationHealths = CloudFormationHealth[];
export type ServiceName =
  | "API_GATEWAY"
  | "APPLICATION_ELB"
  | "AUTO_SCALING_GROUP"
  | "CLOUD_FRONT"
  | "DYNAMO_DB"
  | "EC2"
  | "ECS"
  | "EKS"
  | "ELASTIC_BEANSTALK"
  | "ELASTI_CACHE"
  | "ELB"
  | "ES"
  | "KINESIS"
  | "LAMBDA"
  | "NAT_GATEWAY"
  | "NETWORK_ELB"
  | "RDS"
  | "REDSHIFT"
  | "ROUTE_53"
  | "S3"
  | "SAGE_MAKER"
  | "SNS"
  | "SQS"
  | "STEP_FUNCTIONS"
  | "SWF"
  | (string & {});
export interface ServiceInsightHealth {
  OpenProactiveInsights?: number;
  OpenReactiveInsights?: number;
}
export interface ServiceHealth {
  ServiceName?: ServiceName;
  Insight?: ServiceInsightHealth;
  AnalyzedResourceCount?: number;
}
export type ServiceHealths = ServiceHealth[];
export interface AccountInsightHealth {
  OpenProactiveInsights?: number;
  OpenReactiveInsights?: number;
}
export interface AccountHealth {
  AccountId?: string;
  Insight?: AccountInsightHealth;
}
export type AccountHealths = AccountHealth[];
export interface TagHealth {
  AppBoundaryKey?: string;
  TagValue?: string;
  Insight?: InsightHealth;
  AnalyzedResourceCount?: number;
}
export type TagHealths = TagHealth[];
export interface DescribeOrganizationResourceCollectionHealthResponse {
  CloudFormation?: CloudFormationHealth[];
  Service?: ServiceHealth[];
  Account?: AccountHealth[];
  NextToken?: string;
  Tags?: TagHealth[];
}
export type ResourceCollectionType =
  | "AWS_CLOUD_FORMATION"
  | "AWS_SERVICE"
  | "AWS_TAGS"
  | (string & {});
export interface DescribeResourceCollectionHealthRequest {
  ResourceCollectionType: ResourceCollectionType;
  NextToken?: string;
}
export interface DescribeResourceCollectionHealthResponse {
  CloudFormation?: CloudFormationHealth[];
  Service?: ServiceHealth[];
  NextToken?: string;
  Tags?: TagHealth[];
}
export interface DescribeServiceIntegrationRequest {}
export type OptInStatus = "ENABLED" | "DISABLED" | (string & {});
export interface OpsCenterIntegration {
  OptInStatus?: OptInStatus;
}
export interface LogsAnomalyDetectionIntegration {
  OptInStatus?: OptInStatus;
}
export type KMSKeyId = string;
export type ServerSideEncryptionType =
  | "CUSTOMER_MANAGED_KEY"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export interface KMSServerSideEncryptionIntegration {
  KMSKeyId?: string;
  OptInStatus?: OptInStatus;
  Type?: ServerSideEncryptionType;
}
export interface ServiceIntegrationConfig {
  OpsCenter?: OpsCenterIntegration;
  LogsAnomalyDetection?: LogsAnomalyDetectionIntegration;
  KMSServerSideEncryption?: KMSServerSideEncryptionIntegration;
}
export interface DescribeServiceIntegrationResponse {
  ServiceIntegration?: ServiceIntegrationConfig;
}
export interface GetCostEstimationRequest {
  NextToken?: string;
}
export type CostEstimationStackNames = string[];
export interface CloudFormationCostEstimationResourceCollectionFilter {
  StackNames?: string[];
}
export type CostEstimationTagValues = string[];
export interface TagCostEstimationResourceCollectionFilter {
  AppBoundaryKey: string;
  TagValues: string[];
}
export type TagCostEstimationResourceCollectionFilters =
  TagCostEstimationResourceCollectionFilter[];
export interface CostEstimationResourceCollectionFilter {
  CloudFormation?: CloudFormationCostEstimationResourceCollectionFilter;
  Tags?: TagCostEstimationResourceCollectionFilter[];
}
export type CostEstimationStatus = "ONGOING" | "COMPLETED" | (string & {});
export type CostEstimationServiceResourceState =
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export type CostEstimationServiceResourceCount = number;
export type Cost = number;
export interface ServiceResourceCost {
  Type?: string;
  State?: CostEstimationServiceResourceState;
  Count?: number;
  UnitCost?: number;
  Cost?: number;
}
export type ServiceResourceCosts = ServiceResourceCost[];
export interface CostEstimationTimeRange {
  StartTime?: Date;
  EndTime?: Date;
}
export interface GetCostEstimationResponse {
  ResourceCollection?: CostEstimationResourceCollectionFilter;
  Status?: CostEstimationStatus;
  Costs?: ServiceResourceCost[];
  TimeRange?: CostEstimationTimeRange;
  TotalCost?: number;
  NextToken?: string;
}
export interface GetResourceCollectionRequest {
  ResourceCollectionType: ResourceCollectionType;
  NextToken?: string;
}
export interface CloudFormationCollectionFilter {
  StackNames?: string[];
}
export interface TagCollectionFilter {
  AppBoundaryKey: string;
  TagValues: string[];
}
export type TagCollectionFilters = TagCollectionFilter[];
export interface ResourceCollectionFilter {
  CloudFormation?: CloudFormationCollectionFilter;
  Tags?: TagCollectionFilter[];
}
export interface GetResourceCollectionResponse {
  ResourceCollection?: ResourceCollectionFilter;
  NextToken?: string;
}
export interface StartTimeRange {
  FromTime?: Date;
  ToTime?: Date;
}
export type ListAnomaliesForInsightMaxResults = number;
export type ServiceNames = ServiceName[];
export interface ServiceCollection {
  ServiceNames?: ServiceName[];
}
export interface ListAnomaliesForInsightFilters {
  ServiceCollection?: ServiceCollection;
}
export interface ListAnomaliesForInsightRequest {
  InsightId: string;
  StartTimeRange?: StartTimeRange;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
  Filters?: ListAnomaliesForInsightFilters;
}
export interface ProactiveAnomalySummary {
  Id?: string;
  Severity?: AnomalySeverity;
  Status?: AnomalyStatus;
  UpdateTime?: Date;
  AnomalyTimeRange?: AnomalyTimeRange;
  AnomalyReportedTimeRange?: AnomalyReportedTimeRange;
  PredictionTimeRange?: PredictionTimeRange;
  SourceDetails?: AnomalySourceDetails;
  AssociatedInsightId?: string;
  ResourceCollection?: ResourceCollection;
  Limit?: number;
  SourceMetadata?: AnomalySourceMetadata;
  AnomalyResources?: AnomalyResource[];
  Description?: string;
}
export type ProactiveAnomalies = ProactiveAnomalySummary[];
export interface ReactiveAnomalySummary {
  Id?: string;
  Severity?: AnomalySeverity;
  Status?: AnomalyStatus;
  AnomalyTimeRange?: AnomalyTimeRange;
  AnomalyReportedTimeRange?: AnomalyReportedTimeRange;
  SourceDetails?: AnomalySourceDetails;
  AssociatedInsightId?: string;
  ResourceCollection?: ResourceCollection;
  Type?: AnomalyType;
  Name?: string;
  Description?: string;
  CausalAnomalyId?: string;
  AnomalyResources?: AnomalyResource[];
}
export type ReactiveAnomalies = ReactiveAnomalySummary[];
export interface ListAnomaliesForInsightResponse {
  ProactiveAnomalies?: ProactiveAnomalySummary[];
  ReactiveAnomalies?: ReactiveAnomalySummary[];
  NextToken?: string;
}
export type ListAnomalousLogGroupsMaxResults = number;
export interface ListAnomalousLogGroupsRequest {
  InsightId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type LogGroupName = string;
export type NumberOfLogLinesScanned = number;
export type LogStreamName = string;
export type LogAnomalyType =
  | "KEYWORD"
  | "KEYWORD_TOKEN"
  | "FORMAT"
  | "HTTP_CODE"
  | "BLOCK_FORMAT"
  | "NUMERICAL_POINT"
  | "NUMERICAL_NAN"
  | "NEW_FIELD_NAME"
  | (string & {});
export type LogAnomalyToken = string;
export type LogEventId = string;
export type Explanation = string;
export type NumberOfLogLinesOccurrences = number;
export interface LogAnomalyClass {
  LogStreamName?: string;
  LogAnomalyType?: LogAnomalyType;
  LogAnomalyToken?: string;
  LogEventId?: string;
  Explanation?: string;
  NumberOfLogLinesOccurrences?: number;
  LogEventTimestamp?: Date;
}
export type LogAnomalyClasses = LogAnomalyClass[];
export interface LogAnomalyShowcase {
  LogAnomalyClasses?: LogAnomalyClass[];
}
export type LogAnomalyShowcases = LogAnomalyShowcase[];
export interface AnomalousLogGroup {
  LogGroupName?: string;
  ImpactStartTime?: Date;
  ImpactEndTime?: Date;
  NumberOfLogLinesScanned?: number;
  LogAnomalyShowcases?: LogAnomalyShowcase[];
}
export type AnomalousLogGroups = AnomalousLogGroup[];
export interface ListAnomalousLogGroupsResponse {
  InsightId: string;
  AnomalousLogGroups: AnomalousLogGroup[];
  NextToken?: string;
}
export interface EventTimeRange {
  FromTime: Date;
  ToTime: Date;
}
export type EventClass =
  | "INFRASTRUCTURE"
  | "DEPLOYMENT"
  | "SECURITY_CHANGE"
  | "CONFIG_CHANGE"
  | "SCHEMA_CHANGE"
  | (string & {});
export type EventSource = string;
export type EventDataSource =
  | "AWS_CLOUD_TRAIL"
  | "AWS_CODE_DEPLOY"
  | (string & {});
export interface ListEventsFilters {
  InsightId?: string;
  EventTimeRange?: EventTimeRange;
  EventClass?: EventClass;
  EventSource?: string;
  DataSource?: EventDataSource;
  ResourceCollection?: ResourceCollection;
}
export type ListEventsMaxResults = number;
export interface ListEventsRequest {
  Filters: ListEventsFilters;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export type EventId = string;
export type EventName = string;
export type EventResourceType = string;
export type EventResourceName = string;
export type EventResourceArn = string;
export interface EventResource {
  Type?: string;
  Name?: string;
  Arn?: string;
}
export type EventResources = EventResource[];
export interface Event {
  ResourceCollection?: ResourceCollection;
  Id?: string;
  Time?: Date;
  EventSource?: string;
  Name?: string;
  DataSource?: EventDataSource;
  EventClass?: EventClass;
  Resources?: EventResource[];
}
export type Events = Event[];
export interface ListEventsResponse {
  Events: Event[];
  NextToken?: string;
}
export type InsightType = "REACTIVE" | "PROACTIVE" | (string & {});
export interface ListInsightsOngoingStatusFilter {
  Type: InsightType;
}
export interface EndTimeRange {
  FromTime?: Date;
  ToTime?: Date;
}
export interface ListInsightsClosedStatusFilter {
  Type: InsightType;
  EndTimeRange: EndTimeRange;
}
export interface ListInsightsAnyStatusFilter {
  Type: InsightType;
  StartTimeRange: StartTimeRange;
}
export interface ListInsightsStatusFilter {
  Ongoing?: ListInsightsOngoingStatusFilter;
  Closed?: ListInsightsClosedStatusFilter;
  Any?: ListInsightsAnyStatusFilter;
}
export type ListInsightsMaxResults = number;
export interface ListInsightsRequest {
  StatusFilter: ListInsightsStatusFilter;
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceArn = string;
export type AssociatedResourceArns = string[];
export interface ProactiveInsightSummary {
  Id?: string;
  Name?: string;
  Severity?: InsightSeverity;
  Status?: InsightStatus;
  InsightTimeRange?: InsightTimeRange;
  PredictionTimeRange?: PredictionTimeRange;
  ResourceCollection?: ResourceCollection;
  ServiceCollection?: ServiceCollection;
  AssociatedResourceArns?: string[];
}
export type ProactiveInsights = ProactiveInsightSummary[];
export interface ReactiveInsightSummary {
  Id?: string;
  Name?: string;
  Severity?: InsightSeverity;
  Status?: InsightStatus;
  InsightTimeRange?: InsightTimeRange;
  ResourceCollection?: ResourceCollection;
  ServiceCollection?: ServiceCollection;
  AssociatedResourceArns?: string[];
}
export type ReactiveInsights = ReactiveInsightSummary[];
export interface ListInsightsResponse {
  ProactiveInsights?: ProactiveInsightSummary[];
  ReactiveInsights?: ReactiveInsightSummary[];
  NextToken?: string;
}
export type ResourcePermission =
  | "FULL_PERMISSION"
  | "MISSING_PERMISSION"
  | (string & {});
export type ResourceTypeFilter =
  | "LOG_GROUPS"
  | "CLOUDFRONT_DISTRIBUTION"
  | "DYNAMODB_TABLE"
  | "EC2_NAT_GATEWAY"
  | "ECS_CLUSTER"
  | "ECS_SERVICE"
  | "EKS_CLUSTER"
  | "ELASTIC_BEANSTALK_ENVIRONMENT"
  | "ELASTIC_LOAD_BALANCER_LOAD_BALANCER"
  | "ELASTIC_LOAD_BALANCING_V2_LOAD_BALANCER"
  | "ELASTIC_LOAD_BALANCING_V2_TARGET_GROUP"
  | "ELASTICACHE_CACHE_CLUSTER"
  | "ELASTICSEARCH_DOMAIN"
  | "KINESIS_STREAM"
  | "LAMBDA_FUNCTION"
  | "OPEN_SEARCH_SERVICE_DOMAIN"
  | "RDS_DB_INSTANCE"
  | "RDS_DB_CLUSTER"
  | "REDSHIFT_CLUSTER"
  | "ROUTE53_HOSTED_ZONE"
  | "ROUTE53_HEALTH_CHECK"
  | "S3_BUCKET"
  | "SAGEMAKER_ENDPOINT"
  | "SNS_TOPIC"
  | "SQS_QUEUE"
  | "STEP_FUNCTIONS_ACTIVITY"
  | "STEP_FUNCTIONS_STATE_MACHINE"
  | (string & {});
export type ResourceTypeFilters = ResourceTypeFilter[];
export interface ListMonitoredResourcesFilters {
  ResourcePermission: ResourcePermission;
  ResourceTypeFilters: ResourceTypeFilter[];
}
export type ListMonitoredResourcesMaxResults = number;
export interface ListMonitoredResourcesRequest {
  Filters?: ListMonitoredResourcesFilters;
  MaxResults?: number;
  NextToken?: string;
}
export type MonitoredResourceName = string;
export interface MonitoredResourceIdentifier {
  MonitoredResourceName?: string;
  Type?: string;
  ResourcePermission?: ResourcePermission;
  LastUpdated?: Date;
  ResourceCollection?: ResourceCollection;
}
export type MonitoredResourceIdentifiers = MonitoredResourceIdentifier[];
export interface ListMonitoredResourcesResponse {
  MonitoredResourceIdentifiers: MonitoredResourceIdentifier[];
  NextToken?: string;
}
export interface ListNotificationChannelsRequest {
  NextToken?: string;
}
export interface NotificationChannel {
  Id?: string;
  Config?: NotificationChannelConfig;
}
export type Channels = NotificationChannel[];
export interface ListNotificationChannelsResponse {
  Channels?: NotificationChannel[];
  NextToken?: string;
}
export type ListInsightsAccountIdList = string[];
export type ListInsightsOrganizationalUnitIdList = string[];
export interface ListOrganizationInsightsRequest {
  StatusFilter: ListInsightsStatusFilter;
  MaxResults?: number;
  AccountIds?: string[];
  OrganizationalUnitIds?: string[];
  NextToken?: string;
}
export interface ProactiveOrganizationInsightSummary {
  Id?: string;
  AccountId?: string;
  OrganizationalUnitId?: string;
  Name?: string;
  Severity?: InsightSeverity;
  Status?: InsightStatus;
  InsightTimeRange?: InsightTimeRange;
  PredictionTimeRange?: PredictionTimeRange;
  ResourceCollection?: ResourceCollection;
  ServiceCollection?: ServiceCollection;
}
export type ProactiveOrganizationInsights =
  ProactiveOrganizationInsightSummary[];
export interface ReactiveOrganizationInsightSummary {
  Id?: string;
  AccountId?: string;
  OrganizationalUnitId?: string;
  Name?: string;
  Severity?: InsightSeverity;
  Status?: InsightStatus;
  InsightTimeRange?: InsightTimeRange;
  ResourceCollection?: ResourceCollection;
  ServiceCollection?: ServiceCollection;
}
export type ReactiveOrganizationInsights = ReactiveOrganizationInsightSummary[];
export interface ListOrganizationInsightsResponse {
  ProactiveInsights?: ProactiveOrganizationInsightSummary[];
  ReactiveInsights?: ReactiveOrganizationInsightSummary[];
  NextToken?: string;
}
export type Locale =
  | "DE_DE"
  | "EN_US"
  | "EN_GB"
  | "ES_ES"
  | "FR_FR"
  | "IT_IT"
  | "JA_JP"
  | "KO_KR"
  | "PT_BR"
  | "ZH_CN"
  | "ZH_TW"
  | (string & {});
export interface ListRecommendationsRequest {
  InsightId: string;
  NextToken?: string;
  Locale?: Locale;
  AccountId?: string;
}
export type RecommendationDescription = string;
export type RecommendationLink = string;
export type RecommendationName = string;
export type RecommendationReason = string;
export type RecommendationRelatedEventName = string;
export type RecommendationRelatedEventResourceName = string;
export type RecommendationRelatedEventResourceType = string;
export interface RecommendationRelatedEventResource {
  Name?: string;
  Type?: string;
}
export type RecommendationRelatedEventResources =
  RecommendationRelatedEventResource[];
export interface RecommendationRelatedEvent {
  Name?: string;
  Resources?: RecommendationRelatedEventResource[];
}
export type RecommendationRelatedEvents = RecommendationRelatedEvent[];
export type RecommendationRelatedAnomalyResourceName = string;
export type RecommendationRelatedAnomalyResourceType = string;
export interface RecommendationRelatedAnomalyResource {
  Name?: string;
  Type?: string;
}
export type RecommendationRelatedAnomalyResources =
  RecommendationRelatedAnomalyResource[];
export type RecommendationRelatedCloudWatchMetricsSourceMetricName = string;
export type RecommendationRelatedCloudWatchMetricsSourceNamespace = string;
export interface RecommendationRelatedCloudWatchMetricsSourceDetail {
  MetricName?: string;
  Namespace?: string;
}
export type RecommendationRelatedCloudWatchMetricsSourceDetails =
  RecommendationRelatedCloudWatchMetricsSourceDetail[];
export interface RecommendationRelatedAnomalySourceDetail {
  CloudWatchMetrics?: RecommendationRelatedCloudWatchMetricsSourceDetail[];
}
export type RelatedAnomalySourceDetails =
  RecommendationRelatedAnomalySourceDetail[];
export interface RecommendationRelatedAnomaly {
  Resources?: RecommendationRelatedAnomalyResource[];
  SourceDetails?: RecommendationRelatedAnomalySourceDetail[];
  AnomalyId?: string;
}
export type RecommendationRelatedAnomalies = RecommendationRelatedAnomaly[];
export type RecommendationCategory = string;
export interface Recommendation {
  Description?: string;
  Link?: string;
  Name?: string;
  Reason?: string;
  RelatedEvents?: RecommendationRelatedEvent[];
  RelatedAnomalies?: RecommendationRelatedAnomaly[];
  Category?: string;
}
export type Recommendations = Recommendation[];
export interface ListRecommendationsResponse {
  Recommendations?: Recommendation[];
  NextToken?: string;
}
export interface PutFeedbackRequest {
  InsightFeedback?: InsightFeedback;
}
export interface PutFeedbackResponse {}
export interface RemoveNotificationChannelRequest {
  Id: string;
}
export interface RemoveNotificationChannelResponse {}
export type InsightStatuses = InsightStatus[];
export interface SearchInsightsFilters {
  Severities?: InsightSeverity[];
  Statuses?: InsightStatus[];
  ResourceCollection?: ResourceCollection;
  ServiceCollection?: ServiceCollection;
}
export type SearchInsightsMaxResults = number;
export interface SearchInsightsRequest {
  StartTimeRange: StartTimeRange;
  Filters?: SearchInsightsFilters;
  MaxResults?: number;
  NextToken?: string;
  Type: InsightType;
}
export interface SearchInsightsResponse {
  ProactiveInsights?: ProactiveInsightSummary[];
  ReactiveInsights?: ReactiveInsightSummary[];
  NextToken?: string;
}
export type SearchInsightsAccountIdList = string[];
export interface SearchOrganizationInsightsFilters {
  Severities?: InsightSeverity[];
  Statuses?: InsightStatus[];
  ResourceCollection?: ResourceCollection;
  ServiceCollection?: ServiceCollection;
}
export type SearchOrganizationInsightsMaxResults = number;
export interface SearchOrganizationInsightsRequest {
  AccountIds: string[];
  StartTimeRange: StartTimeRange;
  Filters?: SearchOrganizationInsightsFilters;
  MaxResults?: number;
  NextToken?: string;
  Type: InsightType;
}
export interface SearchOrganizationInsightsResponse {
  ProactiveInsights?: ProactiveInsightSummary[];
  ReactiveInsights?: ReactiveInsightSummary[];
  NextToken?: string;
}
export type ClientToken = string;
export interface StartCostEstimationRequest {
  ResourceCollection: CostEstimationResourceCollectionFilter;
  ClientToken?: string;
}
export interface StartCostEstimationResponse {}
export interface UpdateEventSourcesConfigRequest {
  EventSources?: EventSourcesConfig;
}
export interface UpdateEventSourcesConfigResponse {}
export type UpdateResourceCollectionAction = "ADD" | "REMOVE" | (string & {});
export type UpdateStackNames = string[];
export interface UpdateCloudFormationCollectionFilter {
  StackNames?: string[];
}
export type UpdateTagValues = string[];
export interface UpdateTagCollectionFilter {
  AppBoundaryKey: string;
  TagValues: string[];
}
export type UpdateTagCollectionFilters = UpdateTagCollectionFilter[];
export interface UpdateResourceCollectionFilter {
  CloudFormation?: UpdateCloudFormationCollectionFilter;
  Tags?: UpdateTagCollectionFilter[];
}
export interface UpdateResourceCollectionRequest {
  Action: UpdateResourceCollectionAction;
  ResourceCollection: UpdateResourceCollectionFilter;
}
export interface UpdateResourceCollectionResponse {}
export interface OpsCenterIntegrationConfig {
  OptInStatus?: OptInStatus;
}
export interface LogsAnomalyDetectionIntegrationConfig {
  OptInStatus?: OptInStatus;
}
export interface KMSServerSideEncryptionIntegrationConfig {
  KMSKeyId?: string;
  OptInStatus?: OptInStatus;
  Type?: ServerSideEncryptionType;
}
export interface UpdateServiceIntegrationConfig {
  OpsCenter?: OpsCenterIntegrationConfig;
  LogsAnomalyDetection?: LogsAnomalyDetectionIntegrationConfig;
  KMSServerSideEncryption?: KMSServerSideEncryptionIntegrationConfig;
}
export interface UpdateServiceIntegrationRequest {
  ServiceIntegration: UpdateServiceIntegrationConfig;
}
export interface UpdateServiceIntegrationResponse {}
export type ErrorMessageString = string;
export type ResourceIdString = string;
export type ResourceIdType = string;
export type RetryAfterSeconds = number;
export type ErrorQuotaCodeString = string;
export type ErrorServiceCodeString = string;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | "INVALID_PARAMETER_COMBINATION"
  | "PARAMETER_INCONSISTENT_WITH_SERVICE_STATE"
  | (string & {});
export type ErrorNameString = string;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export type ValidationExceptionFields = ValidationExceptionField[];
export type AddNotificationChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a notification channel to DevOps Guru. A notification channel is used to notify you
 * about important DevOps Guru events, such as when an insight is generated.
 *
 * If you use an Amazon SNS topic in another account, you must attach a policy to it that grants DevOps Guru permission
 * to send it notifications. DevOps Guru adds the required policy on your behalf to send notifications using Amazon SNS in your account. DevOps Guru only supports standard SNS topics.
 * For more information, see Permissions
 * for Amazon SNS topics.
 *
 * If you use an Amazon SNS topic that is encrypted by an Amazon Web Services Key Management Service customer-managed key (CMK), then you must add permissions
 * to the CMK. For more information, see Permissions for
 * Amazon Web Services KMS–encrypted Amazon SNS topics.
 */
export const addNotificationChannel: API.OperationMethod<
  AddNotificationChannelRequest,
  AddNotificationChannelResponse,
  AddNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /channels",
    input: {
      Config: {
        Sns: { TopicArn: 0 },
        Filters: { Severities: 0, MessageTypes: 0 },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddNotificationChannel",
})) as any;

export type DeleteInsightError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the insight along with the associated anomalies, events and recommendations.
 */
export const deleteInsight: API.OperationMethod<
  DeleteInsightRequest,
  DeleteInsightResponse,
  DeleteInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /insights/{Id}", input: { Id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInsight",
})) as any;

export type DescribeAccountHealthError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the number of open reactive insights, the number of open proactive insights,
 * and the number of metrics analyzed in your Amazon Web Services account. Use these numbers to gauge the
 * health of operations in your Amazon Web Services account.
 */
export const describeAccountHealth: API.OperationMethod<
  DescribeAccountHealthRequest,
  DescribeAccountHealthResponse,
  DescribeAccountHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /accounts/health", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountHealth",
})) as any;

export type DescribeAccountOverviewError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * For the time range passed in, returns the number of open reactive insight that were
 * created, the number of open proactive insights that were created, and the Mean Time to Recover (MTTR) for all
 * closed reactive insights.
 */
export const describeAccountOverview: API.OperationMethod<
  DescribeAccountOverviewRequest,
  DescribeAccountOverviewResponse,
  DescribeAccountOverviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /accounts/overview",
    input: { FromTime: 0, ToTime: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountOverview",
})) as any;

export type DescribeAnomalyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about an anomaly that you specify using its ID.
 */
export const describeAnomaly: API.OperationMethod<
  DescribeAnomalyRequest,
  DescribeAnomalyResponse,
  DescribeAnomalyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /anomalies/{Id}",
    input: { Id: 0, AccountId: D.m({ query: "AccountId" }) },
    output: {
      ProactiveAnomaly: {
        UpdateTime: D.ts,
        AnomalyTimeRange: o_AnomalyTimeRange,
        AnomalyReportedTimeRange: o_AnomalyReportedTimeRange,
        PredictionTimeRange: o_PredictionTimeRange,
        SourceDetails: o_AnomalySourceDetails,
      },
      ReactiveAnomaly: {
        AnomalyTimeRange: o_AnomalyTimeRange,
        AnomalyReportedTimeRange: o_AnomalyReportedTimeRange,
        SourceDetails: o_AnomalySourceDetails,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnomaly",
})) as any;

export type DescribeEventSourcesConfigError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the integration status of services that are integrated with DevOps Guru as Consumer
 * via EventBridge. The one service that can be integrated with DevOps Guru is Amazon CodeGuru
 * Profiler, which can produce proactive recommendations which can be stored and viewed in
 * DevOps Guru.
 */
export const describeEventSourcesConfig: API.OperationMethod<
  DescribeEventSourcesConfigRequest,
  DescribeEventSourcesConfigResponse,
  DescribeEventSourcesConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /event-sources", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSourcesConfig",
})) as any;

export type DescribeFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the most recent feedback submitted in the current Amazon Web Services account and Region.
 */
export const describeFeedback: API.OperationMethod<
  DescribeFeedbackRequest,
  DescribeFeedbackResponse,
  DescribeFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /feedback",
    input: { InsightId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFeedback",
})) as any;

export type DescribeInsightError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about an insight that you specify using its ID.
 */
export const describeInsight: API.OperationMethod<
  DescribeInsightRequest,
  DescribeInsightResponse,
  DescribeInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /insights/{Id}",
    input: { Id: 0, AccountId: D.m({ query: "AccountId" }) },
    output: {
      ProactiveInsight: {
        InsightTimeRange: o_InsightTimeRange,
        PredictionTimeRange: o_PredictionTimeRange,
      },
      ReactiveInsight: { InsightTimeRange: o_InsightTimeRange },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsight",
})) as any;

export type DescribeOrganizationHealthError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns active insights, predictive insights, and resource hours analyzed in last
 * hour.
 */
export const describeOrganizationHealth: API.OperationMethod<
  DescribeOrganizationHealthRequest,
  DescribeOrganizationHealthResponse,
  DescribeOrganizationHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/health",
    input: { AccountIds: 0, OrganizationalUnitIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationHealth",
})) as any;

export type DescribeOrganizationOverviewError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an overview of your organization's history based on the specified time range.
 * The overview includes the total reactive and proactive insights.
 */
export const describeOrganizationOverview: API.OperationMethod<
  DescribeOrganizationOverviewRequest,
  DescribeOrganizationOverviewResponse,
  DescribeOrganizationOverviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/overview",
    input: { FromTime: 0, ToTime: 0, AccountIds: 0, OrganizationalUnitIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationOverview",
})) as any;

export type DescribeOrganizationResourceCollectionHealthError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides an overview of your system's health. If additional member accounts are part
 * of your organization, you can filter those accounts using the `AccountIds`
 * field.
 */
export const describeOrganizationResourceCollectionHealth: API.PaginatedOperationMethod<
  DescribeOrganizationResourceCollectionHealthRequest,
  DescribeOrganizationResourceCollectionHealthResponse,
  DescribeOrganizationResourceCollectionHealthError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/health/resource-collection",
    input: {
      OrganizationResourceCollectionType: 0,
      AccountIds: 0,
      OrganizationalUnitIds: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationResourceCollectionHealth",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type DescribeResourceCollectionHealthError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the number of open proactive insights, open reactive insights, and the Mean Time to Recover (MTTR)
 * for all closed insights in resource collections in your account. You specify the type of
 * Amazon Web Services resources collection. The two types of Amazon Web Services resource collections supported are Amazon Web Services CloudFormation stacks and
 * Amazon Web Services resources that contain the same Amazon Web Services tag. DevOps Guru can be configured to analyze
 * the Amazon Web Services resources that are defined in the stacks or that are tagged using the same tag *key*. You can specify up to 500 Amazon Web Services CloudFormation stacks.
 */
export const describeResourceCollectionHealth: API.PaginatedOperationMethod<
  DescribeResourceCollectionHealthRequest,
  DescribeResourceCollectionHealthResponse,
  DescribeResourceCollectionHealthError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /accounts/health/resource-collection/{ResourceCollectionType}",
    input: {
      ResourceCollectionType: 0,
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceCollectionHealth",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type DescribeServiceIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the integration status of services that are integrated with DevOps Guru.
 * The one service that can be integrated with DevOps Guru
 * is Amazon Web Services Systems Manager, which can be used to create an OpsItem for each generated insight.
 */
export const describeServiceIntegration: API.OperationMethod<
  DescribeServiceIntegrationRequest,
  DescribeServiceIntegrationResponse,
  DescribeServiceIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /service-integrations", input: {} },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceIntegration",
})) as any;

export type GetCostEstimationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an estimate of the monthly cost for DevOps Guru to analyze your Amazon Web Services resources.
 * For more information,
 * see Estimate your
 * Amazon DevOps Guru costs and
 * Amazon DevOps Guru pricing.
 */
export const getCostEstimation: API.PaginatedOperationMethod<
  GetCostEstimationRequest,
  GetCostEstimationResponse,
  GetCostEstimationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /cost-estimation",
    input: { NextToken: D.m({ query: "NextToken" }) },
    output: { TimeRange: { StartTime: D.ts, EndTime: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostEstimation",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type GetResourceCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns lists Amazon Web Services resources that are of the specified resource collection type.
 * The two types of Amazon Web Services resource collections supported are Amazon Web Services CloudFormation stacks and
 * Amazon Web Services resources that contain the same Amazon Web Services tag. DevOps Guru can be configured to analyze
 * the Amazon Web Services resources that are defined in the stacks or that are tagged using the same tag *key*. You can specify up to 500 Amazon Web Services CloudFormation stacks.
 */
export const getResourceCollection: API.PaginatedOperationMethod<
  GetResourceCollectionRequest,
  GetResourceCollectionResponse,
  GetResourceCollectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /resource-collections/{ResourceCollectionType}",
    input: {
      ResourceCollectionType: 0,
      NextToken: D.m({ query: "NextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceCollection",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListAnomaliesForInsightError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the anomalies that belong to an insight that you specify using its
 * ID.
 */
export const listAnomaliesForInsight: API.PaginatedOperationMethod<
  ListAnomaliesForInsightRequest,
  ListAnomaliesForInsightResponse,
  ListAnomaliesForInsightError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /anomalies/insight/{InsightId}",
    input: {
      InsightId: 0,
      StartTimeRange: i_StartTimeRange,
      MaxResults: 0,
      NextToken: 0,
      AccountId: 0,
      Filters: { ServiceCollection: i_ServiceCollection },
    },
    output: {
      ProactiveAnomalies: D.list({
        UpdateTime: D.ts,
        AnomalyTimeRange: o_AnomalyTimeRange,
        AnomalyReportedTimeRange: o_AnomalyReportedTimeRange,
        PredictionTimeRange: o_PredictionTimeRange,
        SourceDetails: o_AnomalySourceDetails,
      }),
      ReactiveAnomalies: D.list({
        AnomalyTimeRange: o_AnomalyTimeRange,
        AnomalyReportedTimeRange: o_AnomalyReportedTimeRange,
        SourceDetails: o_AnomalySourceDetails,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnomaliesForInsight",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAnomalousLogGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of log groups that contain log anomalies.
 */
export const listAnomalousLogGroups: API.PaginatedOperationMethod<
  ListAnomalousLogGroupsRequest,
  ListAnomalousLogGroupsResponse,
  ListAnomalousLogGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /list-log-anomalies",
    input: { InsightId: 0, MaxResults: 0, NextToken: 0 },
    output: {
      AnomalousLogGroups: D.list({
        ImpactStartTime: D.ts,
        ImpactEndTime: D.ts,
        LogAnomalyShowcases: D.list({
          LogAnomalyClasses: D.list({ LogEventTimestamp: D.ts }),
        }),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnomalousLogGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the events emitted by the resources that are evaluated by DevOps Guru.
 * You can use filters to specify which events are returned.
 */
export const listEvents: API.PaginatedOperationMethod<
  ListEventsRequest,
  ListEventsResponse,
  ListEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /events",
    input: {
      Filters: {
        InsightId: 0,
        EventTimeRange: { FromTime: 0, ToTime: 0 },
        EventClass: 0,
        EventSource: 0,
        DataSource: 0,
        ResourceCollection: i_ResourceCollection,
      },
      MaxResults: 0,
      NextToken: 0,
      AccountId: 0,
    },
    output: { Events: D.list({ Time: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInsightsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of insights in your Amazon Web Services account. You can specify which insights are
 * returned by their start time and status (`ONGOING`, `CLOSED`, or
 * `ANY`).
 */
export const listInsights: API.PaginatedOperationMethod<
  ListInsightsRequest,
  ListInsightsResponse,
  ListInsightsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /insights",
    input: {
      StatusFilter: i_ListInsightsStatusFilter,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      ProactiveInsights: D.list(o_ProactiveInsightSummary),
      ReactiveInsights: D.list(o_ReactiveInsightSummary),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitoredResourcesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of all log groups that are being monitored and tagged by DevOps Guru.
 */
export const listMonitoredResources: API.PaginatedOperationMethod<
  ListMonitoredResourcesRequest,
  ListMonitoredResourcesResponse,
  ListMonitoredResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /monitoredResources",
    input: {
      Filters: { ResourcePermission: 0, ResourceTypeFilters: 0 },
      MaxResults: 0,
      NextToken: 0,
    },
    output: { MonitoredResourceIdentifiers: D.list({ LastUpdated: D.ts }) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitoredResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotificationChannelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of notification channels configured for DevOps Guru. Each notification
 * channel is used to notify you when DevOps Guru generates an insight that contains information
 * about how to improve your operations. The one
 * supported notification channel is Amazon Simple Notification Service (Amazon SNS).
 */
export const listNotificationChannels: API.PaginatedOperationMethod<
  ListNotificationChannelsRequest,
  ListNotificationChannelsResponse,
  ListNotificationChannelsError,
  Credentials | HttpClient.HttpClient,
  NotificationChannel
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /channels",
    input: { NextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotificationChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Channels",
  } as const,
})) as any;

export type ListOrganizationInsightsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of insights associated with the account or OU Id.
 */
export const listOrganizationInsights: API.PaginatedOperationMethod<
  ListOrganizationInsightsRequest,
  ListOrganizationInsightsResponse,
  ListOrganizationInsightsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/insights",
    input: {
      StatusFilter: i_ListInsightsStatusFilter,
      MaxResults: 0,
      AccountIds: 0,
      OrganizationalUnitIds: 0,
      NextToken: 0,
    },
    output: {
      ProactiveInsights: D.list({
        InsightTimeRange: o_InsightTimeRange,
        PredictionTimeRange: o_PredictionTimeRange,
      }),
      ReactiveInsights: D.list({ InsightTimeRange: o_InsightTimeRange }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of a specified insight's recommendations. Each recommendation includes
 * a list of related metrics and a list of related events.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /recommendations",
    input: { InsightId: 0, NextToken: 0, Locale: 0, AccountId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recommendations",
  } as const,
})) as any;

export type PutFeedbackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Collects customer feedback about the specified insight.
 */
export const putFeedback: API.OperationMethod<
  PutFeedbackRequest,
  PutFeedbackResponse,
  PutFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /feedback",
    input: { InsightFeedback: { Id: 0, Feedback: 0 } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFeedback",
})) as any;

export type RemoveNotificationChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a notification channel from DevOps Guru. A notification channel is used to notify
 * you when DevOps Guru generates an insight that contains information about how to improve your
 * operations.
 */
export const removeNotificationChannel: API.OperationMethod<
  RemoveNotificationChannelRequest,
  RemoveNotificationChannelResponse,
  RemoveNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /channels/{Id}", input: { Id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveNotificationChannel",
})) as any;

export type SearchInsightsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of insights in your Amazon Web Services account. You can specify which insights are
 * returned by their start time, one or more statuses (`ONGOING` or `CLOSED`), one or more severities
 * (`LOW`, `MEDIUM`, and `HIGH`), and type
 * (`REACTIVE` or `PROACTIVE`).
 *
 * Use the `Filters` parameter to specify status and severity search
 * parameters. Use the `Type` parameter to specify `REACTIVE` or
 * `PROACTIVE` in your search.
 */
export const searchInsights: API.PaginatedOperationMethod<
  SearchInsightsRequest,
  SearchInsightsResponse,
  SearchInsightsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /insights/search",
    input: {
      StartTimeRange: i_StartTimeRange,
      Filters: {
        Severities: 0,
        Statuses: 0,
        ResourceCollection: i_ResourceCollection,
        ServiceCollection: i_ServiceCollection,
      },
      MaxResults: 0,
      NextToken: 0,
      Type: 0,
    },
    output: {
      ProactiveInsights: D.list(o_ProactiveInsightSummary),
      ReactiveInsights: D.list(o_ReactiveInsightSummary),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchOrganizationInsightsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of insights in your organization. You can specify which insights are
 * returned by their start time, one or more statuses (`ONGOING`,
 * `CLOSED`, and `CLOSED`), one or more severities
 * (`LOW`, `MEDIUM`, and `HIGH`), and type
 * (`REACTIVE` or `PROACTIVE`).
 *
 * Use the `Filters` parameter to specify status and severity search
 * parameters. Use the `Type` parameter to specify `REACTIVE` or
 * `PROACTIVE` in your search.
 */
export const searchOrganizationInsights: API.PaginatedOperationMethod<
  SearchOrganizationInsightsRequest,
  SearchOrganizationInsightsResponse,
  SearchOrganizationInsightsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /organization/insights/search",
    input: {
      AccountIds: 0,
      StartTimeRange: i_StartTimeRange,
      Filters: {
        Severities: 0,
        Statuses: 0,
        ResourceCollection: i_ResourceCollection,
        ServiceCollection: i_ServiceCollection,
      },
      MaxResults: 0,
      NextToken: 0,
      Type: 0,
    },
    output: {
      ProactiveInsights: D.list(o_ProactiveInsightSummary),
      ReactiveInsights: D.list(o_ReactiveInsightSummary),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchOrganizationInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartCostEstimationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the creation of an estimate of the monthly cost to analyze your Amazon Web Services
 * resources.
 */
export const startCostEstimation: API.OperationMethod<
  StartCostEstimationRequest,
  StartCostEstimationResponse,
  StartCostEstimationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /cost-estimation",
    input: {
      ResourceCollection: {
        CloudFormation: { StackNames: 0 },
        Tags: D.list({ AppBoundaryKey: 0, TagValues: 0 }),
      },
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCostEstimation",
})) as any;

export type UpdateEventSourcesConfigError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables or disables integration with a service that can be integrated with DevOps Guru. The
 * one service that can be integrated with DevOps Guru is Amazon CodeGuru Profiler, which
 * can produce proactive recommendations which can be stored and viewed in DevOps Guru.
 */
export const updateEventSourcesConfig: API.OperationMethod<
  UpdateEventSourcesConfigRequest,
  UpdateEventSourcesConfigResponse,
  UpdateEventSourcesConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /event-sources",
    input: { EventSources: { AmazonCodeGuruProfiler: { Status: 0 } } },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventSourcesConfig",
})) as any;

export type UpdateResourceCollectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the collection of resources that DevOps Guru analyzes.
 * The two types of Amazon Web Services resource collections supported are Amazon Web Services CloudFormation stacks and
 * Amazon Web Services resources that contain the same Amazon Web Services tag. DevOps Guru can be configured to analyze
 * the Amazon Web Services resources that are defined in the stacks or that are tagged using the same tag *key*. You can specify up to 500 Amazon Web Services CloudFormation stacks. This method also creates the IAM role required for
 * you to use DevOps Guru.
 */
export const updateResourceCollection: API.OperationMethod<
  UpdateResourceCollectionRequest,
  UpdateResourceCollectionResponse,
  UpdateResourceCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /resource-collections",
    input: {
      Action: 0,
      ResourceCollection: {
        CloudFormation: { StackNames: 0 },
        Tags: D.list({ AppBoundaryKey: 0, TagValues: 0 }),
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceCollection",
})) as any;

export type UpdateServiceIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables or disables integration with a service that can be integrated with DevOps Guru. The
 * one service that can be integrated with DevOps Guru is Amazon Web Services Systems Manager, which can be used to create
 * an OpsItem for each generated insight.
 */
export const updateServiceIntegration: API.OperationMethod<
  UpdateServiceIntegrationRequest,
  UpdateServiceIntegrationResponse,
  UpdateServiceIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /service-integrations",
    input: {
      ServiceIntegration: {
        OpsCenter: { OptInStatus: 0 },
        LogsAnomalyDetection: { OptInStatus: 0 },
        KMSServerSideEncryption: { KMSKeyId: 0, OptInStatus: 0, Type: 0 },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceIntegration",
})) as any;

const i_ListInsightsStatusFilter: D.LazyStruct = () => ({
  Ongoing: { Type: 0 },
  Closed: { Type: 0, EndTimeRange: { FromTime: 0, ToTime: 0 } },
  Any: { Type: 0, StartTimeRange: i_StartTimeRange },
});
const i_ResourceCollection: D.LazyStruct = () => ({
  CloudFormation: { StackNames: 0 },
  Tags: D.list({ AppBoundaryKey: 0, TagValues: 0 }),
});
const i_ServiceCollection: D.LazyStruct = () => ({ ServiceNames: 0 });
const i_StartTimeRange: D.LazyStruct = () => ({ FromTime: 0, ToTime: 0 });
const o_AnomalyReportedTimeRange: D.LazyStruct = () => ({
  OpenTime: D.ts,
  CloseTime: D.ts,
});
const o_AnomalySourceDetails: D.LazyStruct = () => ({
  CloudWatchMetrics: D.list({
    MetricDataSummary: {
      TimestampMetricValuePairList: D.list({ Timestamp: D.ts }),
    },
  }),
});
const o_AnomalyTimeRange: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_InsightTimeRange: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_PredictionTimeRange: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
});
const o_ProactiveInsightSummary: D.LazyStruct = () => ({
  InsightTimeRange: o_InsightTimeRange,
  PredictionTimeRange: o_PredictionTimeRange,
});
const o_ReactiveInsightSummary: D.LazyStruct = () => ({
  InsightTimeRange: o_InsightTimeRange,
});
