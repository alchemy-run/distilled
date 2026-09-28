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
  sdkId: "XRay",
  target: "AWSXRay",
  version: "2016-04-12",
  sigv4: "xray",
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
                `https://xray-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://xray-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://xray.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://xray.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class GroupAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "GroupAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: { matches: " already exists$" },
      },
    },
  )<{ readonly message?: string }> {}
export class GroupNotFound
  extends /*@__PURE__*/ TE.TaggedError("GroupNotFound", ["NotFoundError"], {
    synthetic: { from: "InvalidRequestException", message: "Group not found" },
  })<{ readonly message?: string }> {}
export class InvalidPolicyRevisionIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPolicyRevisionIdException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
  }> {}
export class LockoutPreventionException
  extends /*@__PURE__*/ TE.TaggedError(
    "LockoutPreventionException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ TE.TaggedError(
    "MalformedPolicyDocumentException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PolicyCountLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicyCountLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PolicySizeLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicySizeLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class RuleLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("RuleLimitExceededException")<{
    readonly message?: string;
  }> {}
export class SamplingRuleAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "SamplingRuleAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: "Sampling rule already exists",
      },
    },
  )<{ readonly message?: string }> {}
export class SamplingRuleNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "SamplingRuleNotFound",
    ["NotFoundError"],
    {
      synthetic: {
        from: "InvalidRequestException",
        message: "Sampling rule does not exist",
      },
    },
  )<{ readonly message?: string }> {}
export class ThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export type TraceId = string;
export type TraceIdList = string[];
export interface BatchGetTracesRequest {
  TraceIds: string[];
  NextToken?: string;
}
export type SegmentId = string;
export type SegmentDocument = string;
export interface Segment {
  Id?: string;
  Document?: string;
}
export type SegmentList = Segment[];
export interface Trace {
  Id?: string;
  Duration?: number;
  LimitExceeded?: boolean;
  Segments?: Segment[];
}
export type TraceList = Trace[];
export type UnprocessedTraceIdList = string[];
export interface BatchGetTracesResult {
  Traces?: Trace[];
  UnprocessedTraceIds?: string[];
  NextToken?: string;
}
export type RetrievalToken = string;
export interface CancelTraceRetrievalRequest {
  RetrievalToken: string;
}
export interface CancelTraceRetrievalResult {}
export type GroupName = string;
export type FilterExpression = string;
export interface InsightsConfiguration {
  InsightsEnabled?: boolean;
  NotificationsEnabled?: boolean;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateGroupRequest {
  GroupName: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
  Tags?: Tag[];
}
export interface Group {
  GroupName?: string;
  GroupARN?: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
}
export interface CreateGroupResult {
  Group?: Group;
}
export type RuleName = string;
export type ResourceARN = string;
export type Priority = number;
export type FixedRate = number;
export type ReservoirSize = number;
export type ServiceName = string;
export type ServiceType = string;
export type Host = string;
export type HTTPMethod = string;
export type URLPath = string;
export type Version = number;
export type AttributeKey = string;
export type AttributeValue = string;
export type AttributeMap = { [key: string]: string | undefined };
export type MaxRate = number;
export type CooldownWindowMinutes = number;
export interface SamplingRateBoost {
  MaxRate: number;
  CooldownWindowMinutes: number;
}
export interface SamplingRule {
  RuleName?: string;
  RuleARN?: string;
  ResourceARN: string;
  Priority: number;
  FixedRate: number;
  ReservoirSize: number;
  ServiceName: string;
  ServiceType: string;
  Host: string;
  HTTPMethod: string;
  URLPath: string;
  Version: number;
  Attributes?: { [key: string]: string | undefined };
  SamplingRateBoost?: SamplingRateBoost;
}
export interface CreateSamplingRuleRequest {
  SamplingRule: SamplingRule;
  Tags?: Tag[];
}
export interface SamplingRuleRecord {
  SamplingRule?: SamplingRule;
  CreatedAt?: Date;
  ModifiedAt?: Date;
}
export interface CreateSamplingRuleResult {
  SamplingRuleRecord?: SamplingRuleRecord;
}
export type GroupARN = string;
export interface DeleteGroupRequest {
  GroupName?: string;
  GroupARN?: string;
}
export interface DeleteGroupResult {}
export type PolicyName = string;
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyRequest {
  PolicyName: string;
  PolicyRevisionId?: string;
}
export interface DeleteResourcePolicyResult {}
export interface DeleteSamplingRuleRequest {
  RuleName?: string;
  RuleARN?: string;
}
export interface DeleteSamplingRuleResult {
  SamplingRuleRecord?: SamplingRuleRecord;
}
export interface GetEncryptionConfigRequest {}
export type EncryptionStatus = "UPDATING" | "ACTIVE" | (string & {});
export type EncryptionType = "NONE" | "KMS" | (string & {});
export interface EncryptionConfig {
  KeyId?: string;
  Status?: EncryptionStatus;
  Type?: EncryptionType;
}
export interface GetEncryptionConfigResult {
  EncryptionConfig?: EncryptionConfig;
}
export interface GetGroupRequest {
  GroupName?: string;
  GroupARN?: string;
}
export interface GetGroupResult {
  Group?: Group;
}
export type GetGroupsNextToken = string;
export interface GetGroupsRequest {
  NextToken?: string;
}
export interface GroupSummary {
  GroupName?: string;
  GroupARN?: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
}
export type GroupSummaryList = GroupSummary[];
export interface GetGroupsResult {
  Groups?: GroupSummary[];
  NextToken?: string;
}
export interface GetIndexingRulesRequest {
  NextToken?: string;
}
export interface ProbabilisticRuleValue {
  DesiredSamplingPercentage: number;
  ActualSamplingPercentage?: number;
}
export type IndexingRuleValue = { Probabilistic: ProbabilisticRuleValue };
export interface IndexingRule {
  Name?: string;
  ModifiedAt?: Date;
  Rule?: IndexingRuleValue;
}
export type IndexingRuleList = IndexingRule[];
export interface GetIndexingRulesResult {
  IndexingRules?: IndexingRule[];
  NextToken?: string;
}
export type InsightId = string;
export interface GetInsightRequest {
  InsightId: string;
}
export type ServiceNames = string[];
export interface ServiceId {
  Name?: string;
  Names?: string[];
  AccountId?: string;
  Type?: string;
}
export type InsightCategory = "FAULT" | (string & {});
export type InsightCategoryList = InsightCategory[];
export type InsightState = "ACTIVE" | "CLOSED" | (string & {});
export type InsightSummaryText = string;
export interface RequestImpactStatistics {
  FaultCount?: number;
  OkCount?: number;
  TotalCount?: number;
}
export interface AnomalousService {
  ServiceId?: ServiceId;
}
export type AnomalousServiceList = AnomalousService[];
export interface Insight {
  InsightId?: string;
  GroupARN?: string;
  GroupName?: string;
  RootCauseServiceId?: ServiceId;
  Categories?: InsightCategory[];
  State?: InsightState;
  StartTime?: Date;
  EndTime?: Date;
  Summary?: string;
  ClientRequestImpactStatistics?: RequestImpactStatistics;
  RootCauseServiceRequestImpactStatistics?: RequestImpactStatistics;
  TopAnomalousServices?: AnomalousService[];
}
export interface GetInsightResult {
  Insight?: Insight;
}
export type GetInsightEventsMaxResults = number;
export type Token = string;
export interface GetInsightEventsRequest {
  InsightId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type EventSummaryText = string;
export interface InsightEvent {
  Summary?: string;
  EventTime?: Date;
  ClientRequestImpactStatistics?: RequestImpactStatistics;
  RootCauseServiceRequestImpactStatistics?: RequestImpactStatistics;
  TopAnomalousServices?: AnomalousService[];
}
export type InsightEventList = InsightEvent[];
export interface GetInsightEventsResult {
  InsightEvents?: InsightEvent[];
  NextToken?: string;
}
export interface GetInsightImpactGraphRequest {
  InsightId: string;
  StartTime: Date;
  EndTime: Date;
  NextToken?: string;
}
export interface InsightImpactGraphEdge {
  ReferenceId?: number;
}
export type InsightImpactGraphEdgeList = InsightImpactGraphEdge[];
export interface InsightImpactGraphService {
  ReferenceId?: number;
  Type?: string;
  Name?: string;
  Names?: string[];
  AccountId?: string;
  Edges?: InsightImpactGraphEdge[];
}
export type InsightImpactGraphServiceList = InsightImpactGraphService[];
export interface GetInsightImpactGraphResult {
  InsightId?: string;
  StartTime?: Date;
  EndTime?: Date;
  ServiceGraphStartTime?: Date;
  ServiceGraphEndTime?: Date;
  Services?: InsightImpactGraphService[];
  NextToken?: string;
}
export type InsightStateList = InsightState[];
export type GetInsightSummariesMaxResults = number;
export interface GetInsightSummariesRequest {
  States?: InsightState[];
  GroupARN?: string;
  GroupName?: string;
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
}
export interface InsightSummary {
  InsightId?: string;
  GroupARN?: string;
  GroupName?: string;
  RootCauseServiceId?: ServiceId;
  Categories?: InsightCategory[];
  State?: InsightState;
  StartTime?: Date;
  EndTime?: Date;
  Summary?: string;
  ClientRequestImpactStatistics?: RequestImpactStatistics;
  RootCauseServiceRequestImpactStatistics?: RequestImpactStatistics;
  TopAnomalousServices?: AnomalousService[];
  LastUpdateTime?: Date;
}
export type InsightSummaryList = InsightSummary[];
export interface GetInsightSummariesResult {
  InsightSummaries?: InsightSummary[];
  NextToken?: string;
}
export interface GetRetrievedTracesGraphRequest {
  RetrievalToken: string;
  NextToken?: string;
}
export type RetrievalStatus =
  | "SCHEDULED"
  | "RUNNING"
  | "COMPLETE"
  | "FAILED"
  | "CANCELLED"
  | "TIMEOUT"
  | (string & {});
export interface ErrorStatistics {
  ThrottleCount?: number;
  OtherCount?: number;
  TotalCount?: number;
}
export interface FaultStatistics {
  OtherCount?: number;
  TotalCount?: number;
}
export interface EdgeStatistics {
  OkCount?: number;
  ErrorStatistics?: ErrorStatistics;
  FaultStatistics?: FaultStatistics;
  TotalCount?: number;
  TotalResponseTime?: number;
}
export interface HistogramEntry {
  Value?: number;
  Count?: number;
}
export type Histogram = HistogramEntry[];
export type AliasNames = string[];
export interface Alias {
  Name?: string;
  Names?: string[];
  Type?: string;
}
export type AliasList = Alias[];
export interface Edge {
  ReferenceId?: number;
  StartTime?: Date;
  EndTime?: Date;
  SummaryStatistics?: EdgeStatistics;
  ResponseTimeHistogram?: HistogramEntry[];
  Aliases?: Alias[];
  EdgeType?: string;
  ReceivedEventAgeHistogram?: HistogramEntry[];
}
export type EdgeList = Edge[];
export interface ServiceStatistics {
  OkCount?: number;
  ErrorStatistics?: ErrorStatistics;
  FaultStatistics?: FaultStatistics;
  TotalCount?: number;
  TotalResponseTime?: number;
}
export interface Service {
  ReferenceId?: number;
  Name?: string;
  Names?: string[];
  Root?: boolean;
  AccountId?: string;
  Type?: string;
  State?: string;
  StartTime?: Date;
  EndTime?: Date;
  Edges?: Edge[];
  SummaryStatistics?: ServiceStatistics;
  DurationHistogram?: HistogramEntry[];
  ResponseTimeHistogram?: HistogramEntry[];
}
export interface GraphLink {
  ReferenceType?: string;
  SourceTraceId?: string;
  DestinationTraceIds?: string[];
}
export type LinksList = GraphLink[];
export interface RetrievedService {
  Service?: Service;
  Links?: GraphLink[];
}
export type RetrievedServicesList = RetrievedService[];
export interface GetRetrievedTracesGraphResult {
  RetrievalStatus?: RetrievalStatus;
  Services?: RetrievedService[];
  NextToken?: string;
}
export interface GetSamplingRulesRequest {
  NextToken?: string;
}
export type SamplingRuleRecordList = SamplingRuleRecord[];
export interface GetSamplingRulesResult {
  SamplingRuleRecords?: SamplingRuleRecord[];
  NextToken?: string;
}
export interface GetSamplingStatisticSummariesRequest {
  NextToken?: string;
}
export interface SamplingStatisticSummary {
  RuleName?: string;
  Timestamp?: Date;
  RequestCount?: number;
  BorrowCount?: number;
  SampledCount?: number;
}
export type SamplingStatisticSummaryList = SamplingStatisticSummary[];
export interface GetSamplingStatisticSummariesResult {
  SamplingStatisticSummaries?: SamplingStatisticSummary[];
  NextToken?: string;
}
export type ClientID = string;
export type RequestCount = number;
export type SampledCount = number;
export type BorrowCount = number;
export interface SamplingStatisticsDocument {
  RuleName: string;
  ClientID: string;
  Timestamp: Date;
  RequestCount: number;
  SampledCount: number;
  BorrowCount?: number;
}
export type SamplingStatisticsDocumentList = SamplingStatisticsDocument[];
export type AnomalyCount = number;
export type TotalCount = number;
export type SampledAnomalyCount = number;
export interface SamplingBoostStatisticsDocument {
  RuleName: string;
  ServiceName: string;
  Timestamp: Date;
  AnomalyCount: number;
  TotalCount: number;
  SampledAnomalyCount: number;
}
export type SamplingBoostStatisticsDocumentList =
  SamplingBoostStatisticsDocument[];
export interface GetSamplingTargetsRequest {
  SamplingStatisticsDocuments: SamplingStatisticsDocument[];
  SamplingBoostStatisticsDocuments?: SamplingBoostStatisticsDocument[];
}
export interface SamplingBoost {
  BoostRate: number;
  BoostRateTTL: Date;
}
export interface SamplingTargetDocument {
  RuleName?: string;
  FixedRate?: number;
  ReservoirQuota?: number;
  ReservoirQuotaTTL?: Date;
  Interval?: number;
  SamplingBoost?: SamplingBoost;
}
export type SamplingTargetDocumentList = SamplingTargetDocument[];
export interface UnprocessedStatistics {
  RuleName?: string;
  ErrorCode?: string;
  Message?: string;
}
export type UnprocessedStatisticsList = UnprocessedStatistics[];
export interface GetSamplingTargetsResult {
  SamplingTargetDocuments?: SamplingTargetDocument[];
  LastRuleModification?: Date;
  UnprocessedStatistics?: UnprocessedStatistics[];
  UnprocessedBoostStatistics?: UnprocessedStatistics[];
}
export interface GetServiceGraphRequest {
  StartTime: Date;
  EndTime: Date;
  GroupName?: string;
  GroupARN?: string;
  NextToken?: string;
}
export type ServiceList = Service[];
export interface GetServiceGraphResult {
  StartTime?: Date;
  EndTime?: Date;
  Services?: Service[];
  ContainsOldGroupVersions?: boolean;
  NextToken?: string;
}
export type EntitySelectorExpression = string;
export interface GetTimeSeriesServiceStatisticsRequest {
  StartTime: Date;
  EndTime: Date;
  GroupName?: string;
  GroupARN?: string;
  EntitySelectorExpression?: string;
  Period?: number;
  ForecastStatistics?: boolean;
  NextToken?: string;
}
export interface ForecastStatistics {
  FaultCountHigh?: number;
  FaultCountLow?: number;
}
export interface TimeSeriesServiceStatistics {
  Timestamp?: Date;
  EdgeSummaryStatistics?: EdgeStatistics;
  ServiceSummaryStatistics?: ServiceStatistics;
  ServiceForecastStatistics?: ForecastStatistics;
  ResponseTimeHistogram?: HistogramEntry[];
}
export type TimeSeriesServiceStatisticsList = TimeSeriesServiceStatistics[];
export interface GetTimeSeriesServiceStatisticsResult {
  TimeSeriesServiceStatistics?: TimeSeriesServiceStatistics[];
  ContainsOldGroupVersions?: boolean;
  NextToken?: string;
}
export interface GetTraceGraphRequest {
  TraceIds: string[];
  NextToken?: string;
}
export interface GetTraceGraphResult {
  Services?: Service[];
  NextToken?: string;
}
export interface GetTraceSegmentDestinationRequest {}
export type TraceSegmentDestination = "XRay" | "CloudWatchLogs" | (string & {});
export type TraceSegmentDestinationStatus =
  | "PENDING"
  | "ACTIVE"
  | (string & {});
export interface GetTraceSegmentDestinationResult {
  Destination?: TraceSegmentDestination;
  Status?: TraceSegmentDestinationStatus;
}
export type TimeRangeType = "TraceId" | "Event" | "Service" | (string & {});
export type SamplingStrategyName = "PartialScan" | "FixedRate" | (string & {});
export interface SamplingStrategy {
  Name?: SamplingStrategyName;
  Value?: number;
}
export interface GetTraceSummariesRequest {
  StartTime: Date;
  EndTime: Date;
  TimeRangeType?: TimeRangeType;
  Sampling?: boolean;
  SamplingStrategy?: SamplingStrategy;
  FilterExpression?: string;
  NextToken?: string;
}
export interface Http {
  HttpURL?: string;
  HttpStatus?: number;
  HttpMethod?: string;
  UserAgent?: string;
  ClientIp?: string;
}
export type AnnotationKey = string;
export type AnnotationValue =
  | { NumberValue: number; BooleanValue?: never; StringValue?: never }
  | { NumberValue?: never; BooleanValue: boolean; StringValue?: never }
  | { NumberValue?: never; BooleanValue?: never; StringValue: string };
export type ServiceIds = ServiceId[];
export interface ValueWithServiceIds {
  AnnotationValue?: AnnotationValue;
  ServiceIds?: ServiceId[];
}
export type ValuesWithServiceIds = ValueWithServiceIds[];
export type Annotations = { [key: string]: ValueWithServiceIds[] | undefined };
export interface TraceUser {
  UserName?: string;
  ServiceIds?: ServiceId[];
}
export type TraceUsers = TraceUser[];
export interface ResourceARNDetail {
  ARN?: string;
}
export type TraceResourceARNs = ResourceARNDetail[];
export interface InstanceIdDetail {
  Id?: string;
}
export type TraceInstanceIds = InstanceIdDetail[];
export interface AvailabilityZoneDetail {
  Name?: string;
}
export type TraceAvailabilityZones = AvailabilityZoneDetail[];
export interface RootCauseException {
  Name?: string;
  Message?: string;
}
export type RootCauseExceptions = RootCauseException[];
export interface FaultRootCauseEntity {
  Name?: string;
  Exceptions?: RootCauseException[];
  Remote?: boolean;
}
export type FaultRootCauseEntityPath = FaultRootCauseEntity[];
export interface FaultRootCauseService {
  Name?: string;
  Names?: string[];
  Type?: string;
  AccountId?: string;
  EntityPath?: FaultRootCauseEntity[];
  Inferred?: boolean;
}
export type FaultRootCauseServices = FaultRootCauseService[];
export interface FaultRootCause {
  Services?: FaultRootCauseService[];
  ClientImpacting?: boolean;
}
export type FaultRootCauses = FaultRootCause[];
export interface ErrorRootCauseEntity {
  Name?: string;
  Exceptions?: RootCauseException[];
  Remote?: boolean;
}
export type ErrorRootCauseEntityPath = ErrorRootCauseEntity[];
export interface ErrorRootCauseService {
  Name?: string;
  Names?: string[];
  Type?: string;
  AccountId?: string;
  EntityPath?: ErrorRootCauseEntity[];
  Inferred?: boolean;
}
export type ErrorRootCauseServices = ErrorRootCauseService[];
export interface ErrorRootCause {
  Services?: ErrorRootCauseService[];
  ClientImpacting?: boolean;
}
export type ErrorRootCauses = ErrorRootCause[];
export interface ResponseTimeRootCauseEntity {
  Name?: string;
  Coverage?: number;
  Remote?: boolean;
}
export type ResponseTimeRootCauseEntityPath = ResponseTimeRootCauseEntity[];
export interface ResponseTimeRootCauseService {
  Name?: string;
  Names?: string[];
  Type?: string;
  AccountId?: string;
  EntityPath?: ResponseTimeRootCauseEntity[];
  Inferred?: boolean;
}
export type ResponseTimeRootCauseServices = ResponseTimeRootCauseService[];
export interface ResponseTimeRootCause {
  Services?: ResponseTimeRootCauseService[];
  ClientImpacting?: boolean;
}
export type ResponseTimeRootCauses = ResponseTimeRootCause[];
export interface TraceSummary {
  Id?: string;
  StartTime?: Date;
  Duration?: number;
  ResponseTime?: number;
  HasFault?: boolean;
  HasError?: boolean;
  HasThrottle?: boolean;
  IsPartial?: boolean;
  Http?: Http;
  Annotations?: { [key: string]: ValueWithServiceIds[] | undefined };
  Users?: TraceUser[];
  ServiceIds?: ServiceId[];
  ResourceARNs?: ResourceARNDetail[];
  InstanceIds?: InstanceIdDetail[];
  AvailabilityZones?: AvailabilityZoneDetail[];
  EntryPoint?: ServiceId;
  FaultRootCauses?: FaultRootCause[];
  ErrorRootCauses?: ErrorRootCause[];
  ResponseTimeRootCauses?: ResponseTimeRootCause[];
  Revision?: number;
  MatchedEventTime?: Date;
}
export type TraceSummaryList = TraceSummary[];
export interface GetTraceSummariesResult {
  TraceSummaries?: TraceSummary[];
  ApproximateTime?: Date;
  TracesProcessedCount?: number;
  NextToken?: string;
}
export type ResourcePolicyNextToken = string;
export interface ListResourcePoliciesRequest {
  NextToken?: string;
}
export type PolicyDocument = string;
export interface ResourcePolicy {
  PolicyName?: string;
  PolicyDocument?: string;
  PolicyRevisionId?: string;
  LastUpdatedTime?: Date;
}
export type ResourcePolicyList = ResourcePolicy[];
export interface ListResourcePoliciesResult {
  ResourcePolicies?: ResourcePolicy[];
  NextToken?: string;
}
export type TraceFormatType = "XRAY" | "OTEL" | (string & {});
export interface ListRetrievedTracesRequest {
  RetrievalToken: string;
  TraceFormat?: TraceFormatType;
  NextToken?: string;
}
export type SpanId = string;
export type SpanDocument = string;
export interface Span {
  Id?: string;
  Document?: string;
}
export type SpanList = Span[];
export interface RetrievedTrace {
  Id?: string;
  Duration?: number;
  Spans?: Span[];
}
export type TraceSpanList = RetrievedTrace[];
export interface ListRetrievedTracesResult {
  RetrievalStatus?: RetrievalStatus;
  TraceFormat?: TraceFormatType;
  Traces?: RetrievedTrace[];
  NextToken?: string;
}
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export type EncryptionKeyId = string;
export interface PutEncryptionConfigRequest {
  KeyId?: string;
  Type: EncryptionType;
}
export interface PutEncryptionConfigResult {
  EncryptionConfig?: EncryptionConfig;
}
export interface PutResourcePolicyRequest {
  PolicyName: string;
  PolicyDocument: string;
  PolicyRevisionId?: string;
  BypassPolicyLockoutCheck?: boolean;
}
export interface PutResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export interface BackendConnectionErrors {
  TimeoutCount?: number;
  ConnectionRefusedCount?: number;
  HTTPCode4XXCount?: number;
  HTTPCode5XXCount?: number;
  UnknownHostCount?: number;
  OtherCount?: number;
}
export interface TelemetryRecord {
  Timestamp: Date;
  SegmentsReceivedCount?: number;
  SegmentsSentCount?: number;
  SegmentsSpilloverCount?: number;
  SegmentsRejectedCount?: number;
  BackendConnectionErrors?: BackendConnectionErrors;
}
export type TelemetryRecordList = TelemetryRecord[];
export type EC2InstanceId = string;
export type Hostname = string;
export interface PutTelemetryRecordsRequest {
  TelemetryRecords: TelemetryRecord[];
  EC2InstanceId?: string;
  Hostname?: string;
  ResourceARN?: string;
}
export interface PutTelemetryRecordsResult {}
export type TraceSegmentDocument = string;
export type TraceSegmentDocumentList = string[];
export interface PutTraceSegmentsRequest {
  TraceSegmentDocuments: string[];
}
export interface UnprocessedTraceSegment {
  Id?: string;
  ErrorCode?: string;
  Message?: string;
}
export type UnprocessedTraceSegmentList = UnprocessedTraceSegment[];
export interface PutTraceSegmentsResult {
  UnprocessedTraceSegments?: UnprocessedTraceSegment[];
}
export type TraceIdListForRetrieval = string[];
export interface StartTraceRetrievalRequest {
  TraceIds: string[];
  StartTime: Date;
  EndTime: Date;
}
export interface StartTraceRetrievalResult {
  RetrievalToken?: string;
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
export interface UpdateGroupRequest {
  GroupName?: string;
  GroupARN?: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
}
export interface UpdateGroupResult {
  Group?: Group;
}
export interface ProbabilisticRuleValueUpdate {
  DesiredSamplingPercentage: number;
}
export type IndexingRuleValueUpdate = {
  Probabilistic: ProbabilisticRuleValueUpdate;
};
export interface UpdateIndexingRuleRequest {
  Name: string;
  Rule: IndexingRuleValueUpdate;
}
export interface UpdateIndexingRuleResult {
  IndexingRule?: IndexingRule;
}
export interface SamplingRuleUpdate {
  RuleName?: string;
  RuleARN?: string;
  ResourceARN?: string;
  Priority?: number;
  FixedRate?: number;
  ReservoirSize?: number;
  Host?: string;
  ServiceName?: string;
  ServiceType?: string;
  HTTPMethod?: string;
  URLPath?: string;
  Attributes?: { [key: string]: string | undefined };
  SamplingRateBoost?: SamplingRateBoost;
}
export interface UpdateSamplingRuleRequest {
  SamplingRuleUpdate: SamplingRuleUpdate;
}
export interface UpdateSamplingRuleResult {
  SamplingRuleRecord?: SamplingRuleRecord;
}
export interface UpdateTraceSegmentDestinationRequest {
  Destination?: TraceSegmentDestination;
}
export interface UpdateTraceSegmentDestinationResult {
  Destination?: TraceSegmentDestination;
  Status?: TraceSegmentDestinationStatus;
}
export type ErrorMessage = string;
export type BatchGetTracesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * You cannot find traces through this API if Transaction Search is enabled since trace is not indexed in X-Ray.
 *
 * Retrieves a list of traces specified by ID. Each trace is a collection of segment
 * documents that originates from a single request. Use `GetTraceSummaries` to get a
 * list of trace IDs.
 */
export const batchGetTraces: API.PaginatedOperationMethod<
  BatchGetTracesRequest,
  BatchGetTracesResult,
  BatchGetTracesError,
  Credentials | HttpClient.HttpClient,
  Trace
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /Traces",
    input: { TraceIds: 0, NextToken: 0 },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTraces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Traces",
  } as const,
})) as any;

export type CancelTraceRetrievalError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Cancels an ongoing trace retrieval job initiated by `StartTraceRetrieval` using the provided `RetrievalToken`. A successful cancellation will return an HTTP 200 response.
 */
export const cancelTraceRetrieval: API.OperationMethod<
  CancelTraceRetrievalRequest,
  CancelTraceRetrievalResult,
  CancelTraceRetrievalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CancelTraceRetrieval",
    input: { RetrievalToken: 0 },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTraceRetrieval",
})) as any;

export type CreateGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupAlreadyExists
  | CommonErrors;
/**
 * Creates a group resource with a name and a filter expression.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResult,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateGroup",
    input: {
      GroupName: 0,
      FilterExpression: 0,
      InsightsConfiguration: i_InsightsConfiguration,
      Tags: D.list(i_Tag),
    },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException, GroupAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

export type CreateSamplingRuleError =
  | InvalidRequestException
  | RuleLimitExceededException
  | ThrottledException
  | SamplingRuleAlreadyExists
  | CommonErrors;
/**
 * Creates a rule to control sampling behavior for instrumented applications. Services
 * retrieve rules with GetSamplingRules, and evaluate each rule in ascending
 * order of *priority* for each request. If a rule matches, the service
 * records a trace, borrowing it from the reservoir size. After 10 seconds, the service
 * reports back to X-Ray with GetSamplingTargets to get updated versions of
 * each in-use rule. The updated rule contains a trace quota that the service can use instead
 * of borrowing from the reservoir.
 */
export const createSamplingRule: API.OperationMethod<
  CreateSamplingRuleRequest,
  CreateSamplingRuleResult,
  CreateSamplingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /CreateSamplingRule",
    input: {
      SamplingRule: {
        RuleName: 0,
        RuleARN: 0,
        ResourceARN: 0,
        Priority: 0,
        FixedRate: 0,
        ReservoirSize: 0,
        ServiceName: 0,
        ServiceType: 0,
        Host: 0,
        HTTPMethod: 0,
        URLPath: 0,
        Version: 0,
        Attributes: 0,
        SamplingRateBoost: i_SamplingRateBoost,
      },
      Tags: D.list(i_Tag),
    },
    output: { SamplingRuleRecord: o_SamplingRuleRecord },
    body: true,
  },
  errors: [
    InvalidRequestException,
    RuleLimitExceededException,
    ThrottledException,
    SamplingRuleAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSamplingRule",
})) as any;

export type DeleteGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupNotFound
  | CommonErrors;
/**
 * Deletes a group resource.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResult,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteGroup",
    input: { GroupName: 0, GroupARN: 0 },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DeleteResourcePolicyError =
  | InvalidPolicyRevisionIdException
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Deletes a resource policy from the target Amazon Web Services account.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResult,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteResourcePolicy",
    input: { PolicyName: 0, PolicyRevisionId: 0 },
    body: true,
  },
  errors: [
    InvalidPolicyRevisionIdException,
    InvalidRequestException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteSamplingRuleError =
  | InvalidRequestException
  | ThrottledException
  | SamplingRuleNotFound
  | CommonErrors;
/**
 * Deletes a sampling rule.
 */
export const deleteSamplingRule: API.OperationMethod<
  DeleteSamplingRuleRequest,
  DeleteSamplingRuleResult,
  DeleteSamplingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /DeleteSamplingRule",
    input: { RuleName: 0, RuleARN: 0 },
    output: { SamplingRuleRecord: o_SamplingRuleRecord },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException, SamplingRuleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSamplingRule",
})) as any;

export type GetEncryptionConfigError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the current encryption configuration for X-Ray data.
 */
export const getEncryptionConfig: API.OperationMethod<
  GetEncryptionConfigRequest,
  GetEncryptionConfigResult,
  GetEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "POST /EncryptionConfig", input: {} },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEncryptionConfig",
})) as any;

export type GetGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupNotFound
  | CommonErrors;
/**
 * Retrieves group resource details.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResult,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetGroup",
    input: { GroupName: 0, GroupARN: 0 },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
})) as any;

export type GetGroupsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves all active group details.
 */
export const getGroups: API.PaginatedOperationMethod<
  GetGroupsRequest,
  GetGroupsResult,
  GetGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /Groups",
    input: { NextToken: 0 },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
  } as const,
})) as any;

export type GetIndexingRulesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves all indexing rules.
 *
 * Indexing rules are used to determine the server-side sampling rate for spans ingested through the CloudWatchLogs destination and indexed by X-Ray. For more information, see Transaction Search.
 */
export const getIndexingRules: API.OperationMethod<
  GetIndexingRulesRequest,
  GetIndexingRulesResult,
  GetIndexingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetIndexingRules",
    input: { NextToken: 0 },
    output: { IndexingRules: D.list(o_IndexingRule) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndexingRules",
})) as any;

export type GetInsightError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the summary information of an insight. This includes impact to clients and
 * root cause services, the top anomalous services, the category, the state of the insight,
 * and the start and end time of the insight.
 */
export const getInsight: API.OperationMethod<
  GetInsightRequest,
  GetInsightResult,
  GetInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /Insight",
    input: { InsightId: 0 },
    output: { Insight: { StartTime: D.ts, EndTime: D.ts } },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsight",
})) as any;

export type GetInsightEventsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * X-Ray reevaluates insights periodically until they're resolved, and records each intermediate state as an
 * event. You can review an insight's events in the Impact Timeline on the Inspect page in the X-Ray
 * console.
 */
export const getInsightEvents: API.PaginatedOperationMethod<
  GetInsightEventsRequest,
  GetInsightEventsResult,
  GetInsightEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /InsightEvents",
    input: { InsightId: 0, MaxResults: 0, NextToken: 0 },
    output: { InsightEvents: D.list({ EventTime: D.ts }) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetInsightImpactGraphError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a service graph structure filtered by the specified insight. The service graph is limited to only
 * structural information. For a complete service graph, use this API with the GetServiceGraph API.
 */
export const getInsightImpactGraph: API.OperationMethod<
  GetInsightImpactGraphRequest,
  GetInsightImpactGraphResult,
  GetInsightImpactGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /InsightImpactGraph",
    input: { InsightId: 0, StartTime: 0, EndTime: 0, NextToken: 0 },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      ServiceGraphStartTime: D.ts,
      ServiceGraphEndTime: D.ts,
    },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightImpactGraph",
})) as any;

export type GetInsightSummariesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the summaries of all insights in the specified group matching the provided filter values.
 */
export const getInsightSummaries: API.PaginatedOperationMethod<
  GetInsightSummariesRequest,
  GetInsightSummariesResult,
  GetInsightSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /InsightSummaries",
    input: {
      States: 0,
      GroupARN: 0,
      GroupName: 0,
      StartTime: 0,
      EndTime: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      InsightSummaries: D.list({
        StartTime: D.ts,
        EndTime: D.ts,
        LastUpdateTime: D.ts,
      }),
    },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetRetrievedTracesGraphError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a service graph for traces based on the specified `RetrievalToken` from the CloudWatch log group generated by Transaction Search. This API does not initiate a retrieval job. You must first execute `StartTraceRetrieval` to obtain the required `RetrievalToken`.
 *
 * The trace graph describes services that process incoming requests and any downstream services they call, which may include Amazon Web Services resources, external APIs, or databases.
 *
 * The response is empty until the `RetrievalStatus` is *COMPLETE*. Retry the request after the status changes from *RUNNING* or *SCHEDULED* to *COMPLETE* to access the full service graph.
 *
 * When CloudWatch log is the destination, this API can support cross-account observability and service graph retrieval across linked accounts.
 *
 * For retrieving graphs from X-Ray directly as opposed to the Transaction-Search Log group, see GetTraceGraph.
 */
export const getRetrievedTracesGraph: API.OperationMethod<
  GetRetrievedTracesGraphRequest,
  GetRetrievedTracesGraphResult,
  GetRetrievedTracesGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetRetrievedTracesGraph",
    input: { RetrievalToken: 0, NextToken: 0 },
    output: { Services: D.list({ Service: o_Service }) },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetrievedTracesGraph",
})) as any;

export type GetSamplingRulesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves all sampling rules.
 */
export const getSamplingRules: API.PaginatedOperationMethod<
  GetSamplingRulesRequest,
  GetSamplingRulesResult,
  GetSamplingRulesError,
  Credentials | HttpClient.HttpClient,
  SamplingRuleRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetSamplingRules",
    input: { NextToken: 0 },
    output: { SamplingRuleRecords: D.list(o_SamplingRuleRecord) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SamplingRuleRecords",
  } as const,
})) as any;

export type GetSamplingStatisticSummariesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves information about recent sampling results for all sampling rules.
 */
export const getSamplingStatisticSummaries: API.PaginatedOperationMethod<
  GetSamplingStatisticSummariesRequest,
  GetSamplingStatisticSummariesResult,
  GetSamplingStatisticSummariesError,
  Credentials | HttpClient.HttpClient,
  SamplingStatisticSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /SamplingStatisticSummaries",
    input: { NextToken: 0 },
    output: { SamplingStatisticSummaries: D.list({ Timestamp: D.ts }) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingStatisticSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SamplingStatisticSummaries",
  } as const,
})) as any;

export type GetSamplingTargetsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Requests a sampling quota for rules that the service is using to sample requests.
 */
export const getSamplingTargets: API.OperationMethod<
  GetSamplingTargetsRequest,
  GetSamplingTargetsResult,
  GetSamplingTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /SamplingTargets",
    input: {
      SamplingStatisticsDocuments: D.list({
        RuleName: 0,
        ClientID: 0,
        Timestamp: 0,
        RequestCount: 0,
        SampledCount: 0,
        BorrowCount: 0,
      }),
      SamplingBoostStatisticsDocuments: D.list({
        RuleName: 0,
        ServiceName: 0,
        Timestamp: 0,
        AnomalyCount: 0,
        TotalCount: 0,
        SampledAnomalyCount: 0,
      }),
    },
    output: {
      SamplingTargetDocuments: D.list({
        ReservoirQuotaTTL: D.ts,
        SamplingBoost: { BoostRateTTL: D.ts },
      }),
      LastRuleModification: D.ts,
    },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingTargets",
})) as any;

export type GetServiceGraphError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a document that describes services that process incoming requests, and
 * downstream services that they call as a result. Root services process incoming requests and
 * make calls to downstream services. Root services are applications that use the Amazon Web Services X-Ray SDK.
 * Downstream services can be other applications, Amazon Web Services resources, HTTP web APIs, or SQL
 * databases.
 */
export const getServiceGraph: API.PaginatedOperationMethod<
  GetServiceGraphRequest,
  GetServiceGraphResult,
  GetServiceGraphError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ServiceGraph",
    input: {
      StartTime: 0,
      EndTime: 0,
      GroupName: 0,
      GroupARN: 0,
      NextToken: 0,
    },
    output: { StartTime: D.ts, EndTime: D.ts, Services: D.list(o_Service) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceGraph",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
  } as const,
})) as any;

export type GetTimeSeriesServiceStatisticsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Get an aggregation of service statistics defined by a specific time
 * range.
 */
export const getTimeSeriesServiceStatistics: API.PaginatedOperationMethod<
  GetTimeSeriesServiceStatisticsRequest,
  GetTimeSeriesServiceStatisticsResult,
  GetTimeSeriesServiceStatisticsError,
  Credentials | HttpClient.HttpClient,
  TimeSeriesServiceStatistics
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /TimeSeriesServiceStatistics",
    input: {
      StartTime: 0,
      EndTime: 0,
      GroupName: 0,
      GroupARN: 0,
      EntitySelectorExpression: 0,
      Period: 0,
      ForecastStatistics: 0,
      NextToken: 0,
    },
    output: { TimeSeriesServiceStatistics: D.list({ Timestamp: D.ts }) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTimeSeriesServiceStatistics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TimeSeriesServiceStatistics",
  } as const,
})) as any;

export type GetTraceGraphError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a service graph for one or more specific trace IDs.
 */
export const getTraceGraph: API.PaginatedOperationMethod<
  GetTraceGraphRequest,
  GetTraceGraphResult,
  GetTraceGraphError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /TraceGraph",
    input: { TraceIds: 0, NextToken: 0 },
    output: { Services: D.list(o_Service) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceGraph",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
  } as const,
})) as any;

export type GetTraceSegmentDestinationError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the current destination of data sent to `PutTraceSegments` and *OpenTelemetry protocol (OTLP)* endpoint. The Transaction Search feature requires a CloudWatchLogs destination. For more information, see Transaction Search and OpenTelemetry.
 */
export const getTraceSegmentDestination: API.OperationMethod<
  GetTraceSegmentDestinationRequest,
  GetTraceSegmentDestinationResult,
  GetTraceSegmentDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /GetTraceSegmentDestination",
    input: {},
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceSegmentDestination",
})) as any;

export type GetTraceSummariesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves IDs and annotations for traces available for a specified time frame using an
 * optional filter. To get the full traces, pass the trace IDs to
 * `BatchGetTraces`.
 *
 * A filter expression can target traced requests that hit specific service nodes or
 * edges, have errors, or come from a known user. For example, the following filter expression
 * targets traces that pass through `api.example.com`:
 *
 * `service("api.example.com")`
 *
 * This filter expression finds traces that have an annotation named `account`
 * with the value `12345`:
 *
 * `annotation.account = "12345"`
 *
 * For a full list of indexed fields and keywords that you can use in filter expressions,
 * see Use filter
 * expressions in the *Amazon Web Services X-Ray Developer Guide*.
 */
export const getTraceSummaries: API.PaginatedOperationMethod<
  GetTraceSummariesRequest,
  GetTraceSummariesResult,
  GetTraceSummariesError,
  Credentials | HttpClient.HttpClient,
  TraceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /TraceSummaries",
    input: {
      StartTime: 0,
      EndTime: 0,
      TimeRangeType: 0,
      Sampling: 0,
      SamplingStrategy: { Name: 0, Value: 0 },
      FilterExpression: 0,
      NextToken: 0,
    },
    output: {
      TraceSummaries: D.list({ StartTime: D.ts, MatchedEventTime: D.ts }),
      ApproximateTime: D.ts,
    },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TraceSummaries",
  } as const,
})) as any;

export type ListResourcePoliciesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Returns the list of resource policies in the target Amazon Web Services account.
 */
export const listResourcePolicies: API.PaginatedOperationMethod<
  ListResourcePoliciesRequest,
  ListResourcePoliciesResult,
  ListResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  ResourcePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListResourcePolicies",
    input: { NextToken: 0 },
    output: { ResourcePolicies: D.list(o_ResourcePolicy) },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourcePolicies",
  } as const,
})) as any;

export type ListRetrievedTracesError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a list of traces for a given `RetrievalToken` from the CloudWatch log group generated by Transaction Search. For information on what each trace returns, see BatchGetTraces.
 *
 * This API does not initiate a retrieval process. To start a trace retrieval, use `StartTraceRetrieval`, which generates the required `RetrievalToken`.
 *
 * When the `RetrievalStatus` is not *COMPLETE*, the API will return an empty response. Retry the request once the retrieval has completed to access the full list of traces.
 *
 * For cross-account observability, this API can retrieve traces from linked accounts when CloudWatch log is set as the destination across relevant accounts. For more details, see CloudWatch cross-account observability.
 *
 * For retrieving data from X-Ray directly as opposed to the Transaction Search generated log group, see BatchGetTraces.
 */
export const listRetrievedTraces: API.OperationMethod<
  ListRetrievedTracesRequest,
  ListRetrievedTracesResult,
  ListRetrievedTracesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ListRetrievedTraces",
    input: { RetrievalToken: 0, TraceFormat: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetrievedTraces",
})) as any;

export type ListTagsForResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Returns a list of tags that are applied to the specified Amazon Web Services X-Ray group or sampling rule.
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
    http: "POST /ListTagsForResource",
    input: { ResourceARN: 0, NextToken: 0 },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
  } as const,
})) as any;

export type PutEncryptionConfigError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Updates the encryption configuration for X-Ray data.
 */
export const putEncryptionConfig: API.OperationMethod<
  PutEncryptionConfigRequest,
  PutEncryptionConfigResult,
  PutEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutEncryptionConfig",
    input: { KeyId: 0, Type: 0 },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEncryptionConfig",
})) as any;

export type PutResourcePolicyError =
  | InvalidPolicyRevisionIdException
  | LockoutPreventionException
  | MalformedPolicyDocumentException
  | PolicyCountLimitExceededException
  | PolicySizeLimitExceededException
  | ThrottledException
  | CommonErrors;
/**
 * Sets the resource policy to grant one or more Amazon Web Services services and accounts permissions to
 * access X-Ray. Each resource policy will be associated with a specific Amazon Web Services account.
 * Each Amazon Web Services account can have a maximum of 5 resource policies, and each policy name must be
 * unique within that account. The maximum size of each resource policy is 5KB.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResult,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /PutResourcePolicy",
    input: {
      PolicyName: 0,
      PolicyDocument: 0,
      PolicyRevisionId: 0,
      BypassPolicyLockoutCheck: 0,
    },
    output: { ResourcePolicy: o_ResourcePolicy },
    body: true,
  },
  errors: [
    InvalidPolicyRevisionIdException,
    LockoutPreventionException,
    MalformedPolicyDocumentException,
    PolicyCountLimitExceededException,
    PolicySizeLimitExceededException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type PutTelemetryRecordsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Used by the Amazon Web Services X-Ray daemon to upload telemetry.
 */
export const putTelemetryRecords: API.OperationMethod<
  PutTelemetryRecordsRequest,
  PutTelemetryRecordsResult,
  PutTelemetryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TelemetryRecords",
    input: {
      TelemetryRecords: D.list({
        Timestamp: 0,
        SegmentsReceivedCount: 0,
        SegmentsSentCount: 0,
        SegmentsSpilloverCount: 0,
        SegmentsRejectedCount: 0,
        BackendConnectionErrors: {
          TimeoutCount: 0,
          ConnectionRefusedCount: 0,
          HTTPCode4XXCount: 0,
          HTTPCode5XXCount: 0,
          UnknownHostCount: 0,
          OtherCount: 0,
        },
      }),
      EC2InstanceId: 0,
      Hostname: 0,
      ResourceARN: 0,
    },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTelemetryRecords",
})) as any;

export type PutTraceSegmentsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Uploads segment documents to Amazon Web Services X-Ray.
 * A segment document can be a completed segment, an in-progress segment, or an array of
 * subsegments.
 *
 * Segments must include the following fields. For the full segment document schema, see
 * Amazon Web Services X-Ray
 * Segment Documents in the *Amazon Web Services X-Ray Developer Guide*.
 *
 * **Required segment document fields**
 *
 * - `name` - The name of the service that handled the request.
 *
 * - `id` - A 64-bit identifier for the segment, unique among segments in the same trace, in 16
 * hexadecimal digits.
 *
 * - `trace_id` - A unique identifier that connects all segments and subsegments originating from
 * a single client request.
 *
 * - `start_time` - Time the segment or subsegment was created, in floating point seconds in
 * epoch time, accurate to milliseconds. For example, `1480615200.010` or
 * `1.480615200010E9`.
 *
 * - `end_time` - Time the segment or subsegment was closed. For example,
 * `1480615200.090` or `1.480615200090E9`. Specify either an `end_time` or
 * `in_progress`.
 *
 * - `in_progress` - Set to `true` instead of specifying an `end_time` to
 * record that a segment has been started, but is not complete. Send an in-progress segment when your application
 * receives a request that will take a long time to serve, to trace that the request was received. When the
 * response is sent, send the complete segment to overwrite the in-progress segment.
 *
 * A `trace_id` consists of three numbers separated by hyphens. For example,
 * 1-58406520-a006649127e371903a2de979. For trace IDs created by an X-Ray SDK, or by Amazon Web Services services
 * integrated with X-Ray, a trace ID includes:
 *
 * **Trace ID Format**
 *
 * - The version number, for instance, `1`.
 *
 * - The time of the original request, in Unix epoch time, in 8 hexadecimal digits. For
 * example, 10:00AM December 2nd, 2016 PST in epoch time is `1480615200` seconds,
 * or `58406520` in hexadecimal.
 *
 * - A 96-bit identifier for the trace, globally unique, in 24 hexadecimal
 * digits.
 *
 * Trace IDs created via OpenTelemetry have a different format based on the
 * W3C Trace Context specification.
 * A W3C trace ID must be formatted in the X-Ray trace ID format when sending to X-Ray. For example, a W3C
 * trace ID `4efaaf4d1e8720b39541901950019ee5` should be formatted as
 * `1-4efaaf4d-1e8720b39541901950019ee5` when sending to X-Ray. While X-Ray trace IDs include
 * the original request timestamp in Unix epoch time, this is not required or validated.
 */
export const putTraceSegments: API.OperationMethod<
  PutTraceSegmentsRequest,
  PutTraceSegmentsResult,
  PutTraceSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TraceSegments",
    input: { TraceSegmentDocuments: 0 },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTraceSegments",
})) as any;

export type StartTraceRetrievalError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Initiates a trace retrieval process using the specified time range and for the given trace IDs in the Transaction Search generated CloudWatch log group. For more information, see Transaction Search.
 *
 * API returns a `RetrievalToken`, which can be used with `ListRetrievedTraces` or `GetRetrievedTracesGraph` to fetch results. Retrievals will time out after 60 minutes. To execute long time ranges, consider segmenting into multiple retrievals.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation in a monitoring account to retrieve data from a linked source account, as long as both accounts have transaction search enabled.
 *
 * For retrieving data from X-Ray directly as opposed to the Transaction-Search Log group, see BatchGetTraces.
 */
export const startTraceRetrieval: API.OperationMethod<
  StartTraceRetrievalRequest,
  StartTraceRetrievalResult,
  StartTraceRetrievalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /StartTraceRetrieval",
    input: { TraceIds: 0, StartTime: 0, EndTime: 0 },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTraceRetrieval",
})) as any;

export type TagResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | TooManyTagsException
  | CommonErrors;
/**
 * Applies tags to an existing Amazon Web Services X-Ray group or sampling rule.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /TagResource",
    input: { ResourceARN: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Removes tags from an Amazon Web Services X-Ray group or sampling rule. You cannot edit or delete system
 * tags (those with an `aws:` prefix).
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UntagResource",
    input: { ResourceARN: 0, TagKeys: 0 },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupNotFound
  | CommonErrors;
/**
 * Updates a group resource.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResult,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateGroup",
    input: {
      GroupName: 0,
      GroupARN: 0,
      FilterExpression: 0,
      InsightsConfiguration: i_InsightsConfiguration,
    },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

export type UpdateIndexingRuleError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Modifies an indexing rule’s configuration.
 *
 * Indexing rules are used for determining the sampling rate for spans indexed from CloudWatch Logs. For more information, see Transaction Search.
 */
export const updateIndexingRule: API.OperationMethod<
  UpdateIndexingRuleRequest,
  UpdateIndexingRuleResult,
  UpdateIndexingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateIndexingRule",
    input: {
      Name: 0,
      Rule: { Probabilistic: { DesiredSamplingPercentage: 0 } },
    },
    output: { IndexingRule: o_IndexingRule },
    body: true,
  },
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndexingRule",
})) as any;

export type UpdateSamplingRuleError =
  | InvalidRequestException
  | ThrottledException
  | SamplingRuleNotFound
  | CommonErrors;
/**
 * Modifies a sampling rule's configuration.
 */
export const updateSamplingRule: API.OperationMethod<
  UpdateSamplingRuleRequest,
  UpdateSamplingRuleResult,
  UpdateSamplingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateSamplingRule",
    input: {
      SamplingRuleUpdate: {
        RuleName: 0,
        RuleARN: 0,
        ResourceARN: 0,
        Priority: 0,
        FixedRate: 0,
        ReservoirSize: 0,
        Host: 0,
        ServiceName: 0,
        ServiceType: 0,
        HTTPMethod: 0,
        URLPath: 0,
        Attributes: 0,
        SamplingRateBoost: i_SamplingRateBoost,
      },
    },
    output: { SamplingRuleRecord: o_SamplingRuleRecord },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException, SamplingRuleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSamplingRule",
})) as any;

export type UpdateTraceSegmentDestinationError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Modifies the destination of data sent to `PutTraceSegments`. The Transaction Search feature requires the CloudWatchLogs destination. For more information, see Transaction Search.
 */
export const updateTraceSegmentDestination: API.OperationMethod<
  UpdateTraceSegmentDestinationRequest,
  UpdateTraceSegmentDestinationResult,
  UpdateTraceSegmentDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /UpdateTraceSegmentDestination",
    input: { Destination: 0 },
    body: true,
  },
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTraceSegmentDestination",
})) as any;

const i_InsightsConfiguration: D.LazyStruct = () => ({
  InsightsEnabled: 0,
  NotificationsEnabled: 0,
});
const i_SamplingRateBoost: D.LazyStruct = () => ({
  MaxRate: 0,
  CooldownWindowMinutes: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_IndexingRule: D.LazyStruct = () => ({ ModifiedAt: D.ts });
const o_ResourcePolicy: D.LazyStruct = () => ({ LastUpdatedTime: D.ts });
const o_SamplingRuleRecord: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  ModifiedAt: D.ts,
});
const o_Service: D.LazyStruct = () => ({
  StartTime: D.ts,
  EndTime: D.ts,
  Edges: D.list({ StartTime: D.ts, EndTime: D.ts }),
});
