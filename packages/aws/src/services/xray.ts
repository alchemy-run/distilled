import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "XRay", serviceShapeName: "AWSXRay" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "xray" });
const ver = /*@__PURE__*/ T.ServiceVersion("2016-04-12");
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
              `https://xray-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://xray-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://xray.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://xray.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://xray.{R}.{D}","properties":{},"headers":{}}');

export class GroupAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<GroupAlreadyExists>()(
    "GroupAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: " already exists$" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class GroupNotFound
  extends /*@__PURE__*/ S.TaggedError<GroupNotFound>()(
    "GroupNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({ from: "InvalidRequestException", message: "Group not found" }),
  ).pipe(C.withNotFoundError) {}
export class InvalidPolicyRevisionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyRevisionIdException>()(
    "InvalidPolicyRevisionIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LockoutPreventionException
  extends /*@__PURE__*/ S.TaggedError<LockoutPreventionException>()(
    "LockoutPreventionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PolicyCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicyCountLimitExceededException>()(
    "PolicyCountLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PolicySizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicySizeLimitExceededException>()(
    "PolicySizeLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RuleLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RuleLimitExceededException>()("RuleLimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class SamplingRuleAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<SamplingRuleAlreadyExists>()(
    "SamplingRuleAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: "Sampling rule already exists",
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class SamplingRuleNotFound
  extends /*@__PURE__*/ S.TaggedError<SamplingRuleNotFound>()(
    "SamplingRuleNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequestException",
      message: "Sampling rule does not exist",
    }),
  ).pipe(C.withNotFoundError) {}
export class ThrottledException
  extends /*@__PURE__*/ S.TaggedError<ThrottledException>()(
    "ThrottledException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type SamplingBoostStatisticsDocumentList = SamplingBoostStatisticsDocument[];
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
export type TraceSegmentDestinationStatus = "PENDING" | "ACTIVE" | (string & {});
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
export type IndexingRuleValueUpdate = { Probabilistic: ProbabilisticRuleValueUpdate };
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
export type BatchGetTracesError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(0, __c0, 0) as any as S.Schema<BatchGetTracesRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<BatchGetTracesResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTraces",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Traces" } as const,
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
  input: __S(96, __c3, 0) as any as S.Schema<CancelTraceRetrievalRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<CancelTraceRetrievalResult>,
  errors: [InvalidRequestException, ResourceNotFoundException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTraceRetrieval",
}));

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
  input: __S(160, __c5, 0) as any as S.Schema<CreateGroupRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<CreateGroupResult>,
  errors: [InvalidRequestException, ThrottledException, GroupAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<CreateSamplingRuleRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<CreateSamplingRuleResult>,
  errors: [
    InvalidRequestException,
    RuleLimitExceededException,
    ThrottledException,
    SamplingRuleAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSamplingRule",
}));

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
  input: __S(384, __c12, 0) as any as S.Schema<DeleteGroupRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<DeleteGroupResult>,
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<DeleteResourcePolicyResult>,
  errors: [InvalidPolicyRevisionIdException, InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<DeleteSamplingRuleRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<DeleteSamplingRuleResult>,
  errors: [InvalidRequestException, ThrottledException, SamplingRuleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSamplingRule",
}));

export type GetEncryptionConfigError = InvalidRequestException | ThrottledException | CommonErrors;
/**
 * Retrieves the current encryption configuration for X-Ray data.
 */
export const getEncryptionConfig: API.OperationMethod<
  GetEncryptionConfigRequest,
  GetEncryptionConfigResult,
  GetEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<GetEncryptionConfigRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<GetEncryptionConfigResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEncryptionConfig",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<GetGroupRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<GetGroupResult>,
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type GetGroupsError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(576, __c18, 0) as any as S.Schema<GetGroupsRequest>,
  output: __S(578, __c18, 2) as any as S.Schema<GetGroupsResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroups",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Groups" } as const,
})) as any;

export type GetIndexingRulesError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(608, __c19, 0) as any as S.Schema<GetIndexingRulesRequest>,
  output: __S(610, __c19, 2) as any as S.Schema<GetIndexingRulesResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndexingRules",
}));

export type GetInsightError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(672, __c21, 0) as any as S.Schema<GetInsightRequest>,
  output: __S(674, __c21, 2) as any as S.Schema<GetInsightResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsight",
}));

export type GetInsightEventsError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(800, __c25, 0) as any as S.Schema<GetInsightEventsRequest>,
  output: __S(803, __c25, 3) as any as S.Schema<GetInsightEventsResult>,
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
  input: __S(832, __c26, 0) as any as S.Schema<GetInsightImpactGraphRequest>,
  output: __S(837, __c26, 5) as any as S.Schema<GetInsightImpactGraphResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightImpactGraph",
}));

export type GetInsightSummariesError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(864, __c27, 0) as any as S.Schema<GetInsightSummariesRequest>,
  output: __S(867, __c27, 3) as any as S.Schema<GetInsightSummariesResult>,
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
  input: __S(896, __c28, 0) as any as S.Schema<GetRetrievedTracesGraphRequest>,
  output: __S(901, __c28, 5) as any as S.Schema<GetRetrievedTracesGraphResult>,
  errors: [InvalidRequestException, ResourceNotFoundException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetrievedTracesGraph",
}));

export type GetSamplingRulesError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(992, __c31, 0) as any as S.Schema<GetSamplingRulesRequest>,
  output: __S(994, __c31, 2) as any as S.Schema<GetSamplingRulesResult>,
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
  input: __S(1024, __c32, 0) as any as S.Schema<GetSamplingStatisticSummariesRequest>,
  output: __S(1027, __c32, 3) as any as S.Schema<GetSamplingStatisticSummariesResult>,
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

export type GetSamplingTargetsError = InvalidRequestException | ThrottledException | CommonErrors;
/**
 * Requests a sampling quota for rules that the service is using to sample requests.
 */
export const getSamplingTargets: API.OperationMethod<
  GetSamplingTargetsRequest,
  GetSamplingTargetsResult,
  GetSamplingTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1060, __c33, 4) as any as S.Schema<GetSamplingTargetsRequest>,
  output: __S(1066, __c33, 10) as any as S.Schema<GetSamplingTargetsResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingTargets",
}));

export type GetServiceGraphError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(1088, __c34, 0) as any as S.Schema<GetServiceGraphRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<GetServiceGraphResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceGraph",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Services" } as const,
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
  input: __S(1152, __c36, 0) as any as S.Schema<GetTimeSeriesServiceStatisticsRequest>,
  output: __S(1156, __c36, 4) as any as S.Schema<GetTimeSeriesServiceStatisticsResult>,
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

export type GetTraceGraphError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(1184, __c37, 0) as any as S.Schema<GetTraceGraphRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<GetTraceGraphResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceGraph",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Services" } as const,
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
  input: __S(1216, __c38, 0) as any as S.Schema<GetTraceSegmentDestinationRequest>,
  output: __S(1248, __c39, 0) as any as S.Schema<GetTraceSegmentDestinationResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceSegmentDestination",
}));

export type GetTraceSummariesError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(1281, __c40, 1) as any as S.Schema<GetTraceSummariesRequest>,
  output: __S(1312, __c41, 0) as any as S.Schema<GetTraceSummariesResult>,
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

export type ListResourcePoliciesError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(1344, __c42, 0) as any as S.Schema<ListResourcePoliciesRequest>,
  output: __S(1346, __c42, 2) as any as S.Schema<ListResourcePoliciesResult>,
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
  input: __S(1408, __c44, 0) as any as S.Schema<ListRetrievedTracesRequest>,
  output: __S(1411, __c44, 3) as any as S.Schema<ListRetrievedTracesResult>,
  errors: [InvalidRequestException, ResourceNotFoundException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetrievedTraces",
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InvalidRequestException, ResourceNotFoundException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", items: "Tags" } as const,
})) as any;

export type PutEncryptionConfigError = InvalidRequestException | ThrottledException | CommonErrors;
/**
 * Updates the encryption configuration for X-Ray data.
 */
export const putEncryptionConfig: API.OperationMethod<
  PutEncryptionConfigRequest,
  PutEncryptionConfigResult,
  PutEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<PutEncryptionConfigRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<PutEncryptionConfigResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEncryptionConfig",
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(1505, __c47, 1) as any as S.Schema<PutResourcePolicyResult>,
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
}));

export type PutTelemetryRecordsError = InvalidRequestException | ThrottledException | CommonErrors;
/**
 * Used by the Amazon Web Services X-Ray daemon to upload telemetry.
 */
export const putTelemetryRecords: API.OperationMethod<
  PutTelemetryRecordsRequest,
  PutTelemetryRecordsResult,
  PutTelemetryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1539, __c48, 3) as any as S.Schema<PutTelemetryRecordsRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<PutTelemetryRecordsResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTelemetryRecords",
}));

export type PutTraceSegmentsError = InvalidRequestException | ThrottledException | CommonErrors;
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
  input: __S(1568, __c49, 0) as any as S.Schema<PutTraceSegmentsRequest>,
  output: __S(1571, __c49, 3) as any as S.Schema<PutTraceSegmentsResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTraceSegments",
}));

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
  input: __S(1600, __c50, 0) as any as S.Schema<StartTraceRetrievalRequest>,
  output: __S(1601, __c50, 1) as any as S.Schema<StartTraceRetrievalResult>,
  errors: [InvalidRequestException, ResourceNotFoundException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTraceRetrieval",
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InvalidRequestException, ResourceNotFoundException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<UpdateGroupRequest>,
  output: __S(256, __c8, 0) as any as S.Schema<UpdateGroupResult>,
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateIndexingRuleError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Modifies an indexing rule's configuration.
 *
 * Indexing rules are used for determining the sampling rate for spans indexed from CloudWatch Logs. For more information, see Transaction Search.
 */
export const updateIndexingRule: API.OperationMethod<
  UpdateIndexingRuleRequest,
  UpdateIndexingRuleResult,
  UpdateIndexingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1730, __c54, 2) as any as S.Schema<UpdateIndexingRuleRequest>,
  output: __S(1731, __c54, 3) as any as S.Schema<UpdateIndexingRuleResult>,
  errors: [InvalidRequestException, ResourceNotFoundException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndexingRule",
}));

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
  input: __S(1761, __c55, 1) as any as S.Schema<UpdateSamplingRuleRequest>,
  output: __S(352, __c11, 0) as any as S.Schema<UpdateSamplingRuleResult>,
  errors: [InvalidRequestException, ThrottledException, SamplingRuleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSamplingRule",
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<UpdateTraceSegmentDestinationRequest>,
  output: __S(1248, __c39, 0) as any as S.Schema<UpdateTraceSegmentDestinationResult>,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTraceSegmentDestination",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TraceIds: __S(32, __c1, 0), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/Traces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetTracesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Duration: S.optional(S.Number),
          LimitExceeded: S.optional(S.Boolean),
          Segments: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "Trace" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Traces: S.optional(__S(2, __c0, 2)),
          UnprocessedTraceIds: S.optional(__S(32, __c1, 0)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetTracesResult" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Document: S.optional(S.String) }),
      ).annotate({ identifier: "Segment" });
    case 1:
      return S.Array(__S(64, __c2, 0));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RetrievalToken: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CancelTraceRetrieval" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelTraceRetrievalRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelTraceRetrievalResult" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.String,
          FilterExpression: S.optional(S.String),
          InsightsConfiguration: S.optional(__S(224, __c7, 0)),
          Tags: S.optional(__S(193, __c6, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/CreateGroup" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGroupRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(192, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InsightsEnabled: S.optional(S.Boolean),
          NotificationsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InsightsConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          GroupARN: S.optional(S.String),
          FilterExpression: S.optional(S.String),
          InsightsConfiguration: S.optional(__S(224, __c7, 0)),
        }),
      ).annotate({ identifier: "Group" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Group: S.optional(__S(225, __c7, 1)) })).annotate({
        identifier: "CreateGroupResult",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SamplingRule: __S(322, __c10, 2), Tags: S.optional(__S(193, __c6, 1)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateSamplingRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSamplingRuleRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ MaxRate: S.Number, CooldownWindowMinutes: S.Number }),
      ).annotate({ identifier: "SamplingRateBoost" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleARN: S.optional(S.String),
          ResourceARN: S.String,
          Priority: S.Number,
          FixedRate: S.Number,
          ReservoirSize: S.Number,
          ServiceName: S.String,
          ServiceType: S.String,
          Host: S.String,
          HTTPMethod: S.String,
          URLPath: S.String,
          Version: S.Number,
          Attributes: S.optional(__S(320, __c10, 0)),
          SamplingRateBoost: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "SamplingRule" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SamplingRule: S.optional(__S(322, __c10, 2)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SamplingRuleRecord" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SamplingRuleRecord: S.optional(__S(323, __c10, 3)) }),
      ).annotate({ identifier: "CreateSamplingRuleResult" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.optional(S.String), GroupARN: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/DeleteGroup" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGroupRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PolicyName: S.String, PolicyRevisionId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteResourcePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleName: S.optional(S.String), RuleARN: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DeleteSamplingRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSamplingRuleRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/EncryptionConfig" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEncryptionConfigRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyId: S.optional(S.String),
          Status: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "EncryptionConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EncryptionConfig: S.optional(__S(512, __c16, 0)) }),
      ).annotate({ identifier: "GetEncryptionConfigResult" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.optional(S.String), GroupARN: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetGroup" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGroupRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/Groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGroupsRequest" });
    case 1:
      return S.Array(__S(225, __c7, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ Groups: S.optional(__S(577, __c18, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetGroupsResult" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetIndexingRules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIndexingRulesRequest" });
    case 1:
      return S.Array(__S(642, __c20, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IndexingRules: S.optional(__S(609, __c19, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetIndexingRulesResult" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DesiredSamplingPercentage: S.Number,
          ActualSamplingPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ProbabilisticRuleValue" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Probabilistic: __S(640, __c20, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Rule: S.optional(__S(641, __c20, 1)),
        }),
      ).annotate({ identifier: "IndexingRule" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InsightId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/Insight" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInsightRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InsightId: S.optional(S.String),
          GroupARN: S.optional(S.String),
          GroupName: S.optional(S.String),
          RootCauseServiceId: S.optional(__S(736, __c23, 0)),
          Categories: S.optional(__S(768, __c24, 0)),
          State: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Summary: S.optional(S.String),
          ClientRequestImpactStatistics: S.optional(__S(704, __c22, 0)),
          RootCauseServiceRequestImpactStatistics: S.optional(__S(704, __c22, 0)),
          TopAnomalousServices: S.optional(__S(706, __c22, 2)),
        }),
      ).annotate({ identifier: "Insight" });
    case 2:
      return S.suspend(() => S.Struct({ Insight: S.optional(__S(673, __c21, 1)) })).annotate({
        identifier: "GetInsightResult",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FaultCount: S.optional(S.Number),
          OkCount: S.optional(S.Number),
          TotalCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RequestImpactStatistics" });
    case 1:
      return S.suspend(() => S.Struct({ ServiceId: S.optional(__S(736, __c23, 0)) })).annotate({
        identifier: "AnomalousService",
      });
    case 2:
      return S.Array(__S(705, __c22, 1));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Names: S.optional(__S(32, __c1, 0)),
          AccountId: S.optional(S.String),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceId" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InsightId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/InsightEvents" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInsightEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Summary: S.optional(S.String),
          EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ClientRequestImpactStatistics: S.optional(__S(704, __c22, 0)),
          RootCauseServiceRequestImpactStatistics: S.optional(__S(704, __c22, 0)),
          TopAnomalousServices: S.optional(__S(706, __c22, 2)),
        }),
      ).annotate({ identifier: "InsightEvent" });
    case 2:
      return S.Array(__S(801, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InsightEvents: S.optional(__S(802, __c25, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetInsightEventsResult" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InsightId: S.String,
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/InsightImpactGraph" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInsightImpactGraphRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ReferenceId: S.optional(S.Number) })).annotate({
        identifier: "InsightImpactGraphEdge",
      });
    case 2:
      return S.Array(__S(833, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ReferenceId: S.optional(S.Number),
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          Names: S.optional(__S(32, __c1, 0)),
          AccountId: S.optional(S.String),
          Edges: S.optional(__S(834, __c26, 2)),
        }),
      ).annotate({ identifier: "InsightImpactGraphService" });
    case 4:
      return S.Array(__S(835, __c26, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          InsightId: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ServiceGraphStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ServiceGraphEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Services: S.optional(__S(836, __c26, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetInsightImpactGraphResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          States: S.optional(__S(768, __c24, 0)),
          GroupARN: S.optional(S.String),
          GroupName: S.optional(S.String),
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/InsightSummaries" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInsightSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InsightId: S.optional(S.String),
          GroupARN: S.optional(S.String),
          GroupName: S.optional(S.String),
          RootCauseServiceId: S.optional(__S(736, __c23, 0)),
          Categories: S.optional(__S(768, __c24, 0)),
          State: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Summary: S.optional(S.String),
          ClientRequestImpactStatistics: S.optional(__S(704, __c22, 0)),
          RootCauseServiceRequestImpactStatistics: S.optional(__S(704, __c22, 0)),
          TopAnomalousServices: S.optional(__S(706, __c22, 2)),
          LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "InsightSummary" });
    case 2:
      return S.Array(__S(865, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InsightSummaries: S.optional(__S(866, __c27, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetInsightSummariesResult" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RetrievalToken: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetRetrievedTracesGraph" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRetrievedTracesGraphRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReferenceType: S.optional(S.String),
          SourceTraceId: S.optional(S.String),
          DestinationTraceIds: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "GraphLink" });
    case 2:
      return S.Array(__S(897, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Service: S.optional(__S(964, __c30, 4)),
          Links: S.optional(__S(898, __c28, 2)),
        }),
      ).annotate({ identifier: "RetrievedService" });
    case 4:
      return S.Array(__S(899, __c28, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          RetrievalStatus: S.optional(S.String),
          Services: S.optional(__S(900, __c28, 4)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRetrievedTracesGraphResult" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ThrottleCount: S.optional(S.Number),
          OtherCount: S.optional(S.Number),
          TotalCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ErrorStatistics" });
    case 1:
      return S.suspend(() =>
        S.Struct({ OtherCount: S.optional(S.Number), TotalCount: S.optional(S.Number) }),
      ).annotate({ identifier: "FaultStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          OkCount: S.optional(S.Number),
          ErrorStatistics: S.optional(__S(928, __c29, 0)),
          FaultStatistics: S.optional(__S(929, __c29, 1)),
          TotalCount: S.optional(S.Number),
          TotalResponseTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EdgeStatistics" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.Number), Count: S.optional(S.Number) }),
      ).annotate({ identifier: "HistogramEntry" });
    case 4:
      return S.Array(__S(931, __c29, 3));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Names: S.optional(__S(32, __c1, 0)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "Alias" });
    case 1:
      return S.Array(__S(960, __c30, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ReferenceId: S.optional(S.Number),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SummaryStatistics: S.optional(__S(930, __c29, 2)),
          ResponseTimeHistogram: S.optional(__S(932, __c29, 4)),
          Aliases: S.optional(__S(961, __c30, 1)),
          EdgeType: S.optional(S.String),
          ReceivedEventAgeHistogram: S.optional(__S(932, __c29, 4)),
        }),
      ).annotate({ identifier: "Edge" });
    case 3:
      return S.Array(__S(962, __c30, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ReferenceId: S.optional(S.Number),
          Name: S.optional(S.String),
          Names: S.optional(__S(32, __c1, 0)),
          Root: S.optional(S.Boolean),
          AccountId: S.optional(S.String),
          Type: S.optional(S.String),
          State: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Edges: S.optional(__S(963, __c30, 3)),
          SummaryStatistics: S.optional(__S(930, __c29, 2)),
          DurationHistogram: S.optional(__S(932, __c29, 4)),
          ResponseTimeHistogram: S.optional(__S(932, __c29, 4)),
        }),
      ).annotate({ identifier: "Service" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetSamplingRules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSamplingRulesRequest" });
    case 1:
      return S.Array(__S(323, __c10, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({
          SamplingRuleRecords: S.optional(__S(993, __c31, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSamplingRulesResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/SamplingStatisticSummaries" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSamplingStatisticSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RequestCount: S.optional(S.Number),
          BorrowCount: S.optional(S.Number),
          SampledCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SamplingStatisticSummary" });
    case 2:
      return S.Array(__S(1025, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SamplingStatisticSummaries: S.optional(__S(1026, __c32, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSamplingStatisticSummariesResult" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          ClientID: S.String,
          Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RequestCount: S.Number,
          SampledCount: S.Number,
          BorrowCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SamplingStatisticsDocument" });
    case 1:
      return S.Array(__S(1056, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.String,
          ServiceName: S.String,
          Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          AnomalyCount: S.Number,
          TotalCount: S.Number,
          SampledAnomalyCount: S.Number,
        }),
      ).annotate({ identifier: "SamplingBoostStatisticsDocument" });
    case 3:
      return S.Array(__S(1058, __c33, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          SamplingStatisticsDocuments: __S(1057, __c33, 1),
          SamplingBoostStatisticsDocuments: S.optional(__S(1059, __c33, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/SamplingTargets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSamplingTargetsRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          BoostRate: S.Number,
          BoostRateTTL: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "SamplingBoost" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          FixedRate: S.optional(S.Number),
          ReservoirQuota: S.optional(S.Number),
          ReservoirQuotaTTL: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Interval: S.optional(S.Number),
          SamplingBoost: S.optional(__S(1061, __c33, 5)),
        }),
      ).annotate({ identifier: "SamplingTargetDocument" });
    case 7:
      return S.Array(__S(1062, __c33, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedStatistics" });
    case 9:
      return S.Array(__S(1064, __c33, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          SamplingTargetDocuments: S.optional(__S(1063, __c33, 7)),
          LastRuleModification: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UnprocessedStatistics: S.optional(__S(1065, __c33, 9)),
          UnprocessedBoostStatistics: S.optional(__S(1065, __c33, 9)),
        }),
      ).annotate({ identifier: "GetSamplingTargetsResult" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          GroupName: S.optional(S.String),
          GroupARN: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ServiceGraph" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceGraphRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Services: S.optional(__S(1120, __c35, 0)),
          ContainsOldGroupVersions: S.optional(S.Boolean),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetServiceGraphResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(964, __c30, 4));
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          GroupName: S.optional(S.String),
          GroupARN: S.optional(S.String),
          EntitySelectorExpression: S.optional(S.String),
          Period: S.optional(S.Number),
          ForecastStatistics: S.optional(S.Boolean),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/TimeSeriesServiceStatistics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTimeSeriesServiceStatisticsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FaultCountHigh: S.optional(S.Number), FaultCountLow: S.optional(S.Number) }),
      ).annotate({ identifier: "ForecastStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EdgeSummaryStatistics: S.optional(__S(930, __c29, 2)),
          ServiceSummaryStatistics: S.optional(__S(930, __c29, 2)),
          ServiceForecastStatistics: S.optional(__S(1153, __c36, 1)),
          ResponseTimeHistogram: S.optional(__S(932, __c29, 4)),
        }),
      ).annotate({ identifier: "TimeSeriesServiceStatistics" });
    case 3:
      return S.Array(__S(1154, __c36, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          TimeSeriesServiceStatistics: S.optional(__S(1155, __c36, 3)),
          ContainsOldGroupVersions: S.optional(S.Boolean),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTimeSeriesServiceStatisticsResult" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TraceIds: __S(32, __c1, 0), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TraceGraph" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTraceGraphRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Services: S.optional(__S(1120, __c35, 0)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetTraceGraphResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetTraceSegmentDestination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTraceSegmentDestinationRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Destination: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "GetTraceSegmentDestinationResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.Number) }),
      ).annotate({ identifier: "SamplingStrategy" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          TimeRangeType: S.optional(S.String),
          Sampling: S.optional(S.Boolean),
          SamplingStrategy: S.optional(__S(1280, __c40, 0)),
          FilterExpression: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TraceSummaries" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTraceSummariesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          HttpURL: S.optional(S.String),
          HttpStatus: S.optional(S.Number),
          HttpMethod: S.optional(S.String),
          UserAgent: S.optional(S.String),
          ClientIp: S.optional(S.String),
        }),
      ).annotate({ identifier: "Http" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ NumberValue: S.Number }),
        /*@__PURE__*/ S.Struct({ BooleanValue: S.Boolean }),
        /*@__PURE__*/ S.Struct({ StringValue: S.String }),
      ]);
    case 4:
      return S.Array(__S(736, __c23, 0));
    case 5:
      return S.suspend(() =>
        S.Struct({
          AnnotationValue: S.optional(__S(1283, __c40, 3)),
          ServiceIds: S.optional(__S(1284, __c40, 4)),
        }),
      ).annotate({ identifier: "ValueWithServiceIds" });
    case 6:
      return S.Array(__S(1285, __c40, 5));
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(1286, __c40, 6).pipe(S.optional));
    case 8:
      return S.suspend(() =>
        S.Struct({ UserName: S.optional(S.String), ServiceIds: S.optional(__S(1284, __c40, 4)) }),
      ).annotate({ identifier: "TraceUser" });
    case 9:
      return S.Array(__S(1288, __c40, 8));
    case 10:
      return S.suspend(() => S.Struct({ ARN: S.optional(S.String) })).annotate({
        identifier: "ResourceARNDetail",
      });
    case 11:
      return S.Array(__S(1290, __c40, 10));
    case 12:
      return S.suspend(() => S.Struct({ Id: S.optional(S.String) })).annotate({
        identifier: "InstanceIdDetail",
      });
    case 13:
      return S.Array(__S(1292, __c40, 12));
    case 14:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "AvailabilityZoneDetail",
      });
    case 15:
      return S.Array(__S(1294, __c40, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "RootCauseException" });
    case 17:
      return S.Array(__S(1296, __c40, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Exceptions: S.optional(__S(1297, __c40, 17)),
          Remote: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FaultRootCauseEntity" });
    case 19:
      return S.Array(__S(1298, __c40, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Names: S.optional(__S(32, __c1, 0)),
          Type: S.optional(S.String),
          AccountId: S.optional(S.String),
          EntityPath: S.optional(__S(1299, __c40, 19)),
          Inferred: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FaultRootCauseService" });
    case 21:
      return S.Array(__S(1300, __c40, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          Services: S.optional(__S(1301, __c40, 21)),
          ClientImpacting: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FaultRootCause" });
    case 23:
      return S.Array(__S(1302, __c40, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Coverage: S.optional(S.Number),
          Remote: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResponseTimeRootCauseEntity" });
    case 25:
      return S.Array(__S(1304, __c40, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Names: S.optional(__S(32, __c1, 0)),
          Type: S.optional(S.String),
          AccountId: S.optional(S.String),
          EntityPath: S.optional(__S(1305, __c40, 25)),
          Inferred: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResponseTimeRootCauseService" });
    case 27:
      return S.Array(__S(1306, __c40, 26));
    case 28:
      return S.suspend(() =>
        S.Struct({
          Services: S.optional(__S(1307, __c40, 27)),
          ClientImpacting: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResponseTimeRootCause" });
    case 29:
      return S.Array(__S(1308, __c40, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Duration: S.optional(S.Number),
          ResponseTime: S.optional(S.Number),
          HasFault: S.optional(S.Boolean),
          HasError: S.optional(S.Boolean),
          HasThrottle: S.optional(S.Boolean),
          IsPartial: S.optional(S.Boolean),
          Http: S.optional(__S(1282, __c40, 2)),
          Annotations: S.optional(__S(1287, __c40, 7)),
          Users: S.optional(__S(1289, __c40, 9)),
          ServiceIds: S.optional(__S(1284, __c40, 4)),
          ResourceARNs: S.optional(__S(1291, __c40, 11)),
          InstanceIds: S.optional(__S(1293, __c40, 13)),
          AvailabilityZones: S.optional(__S(1295, __c40, 15)),
          EntryPoint: S.optional(__S(736, __c23, 0)),
          FaultRootCauses: S.optional(__S(1303, __c40, 23)),
          ErrorRootCauses: S.optional(__S(1303, __c40, 23)),
          ResponseTimeRootCauses: S.optional(__S(1309, __c40, 29)),
          Revision: S.optional(S.Number),
          MatchedEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TraceSummary" });
    case 31:
      return S.Array(__S(1310, __c40, 30));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TraceSummaries: S.optional(__S(1311, __c40, 31)),
          ApproximateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          TracesProcessedCount: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTraceSummariesResult" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListResourcePolicies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourcePoliciesRequest" });
    case 1:
      return S.Array(__S(1376, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourcePolicies: S.optional(__S(1345, __c42, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourcePoliciesResult" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyName: S.optional(S.String),
          PolicyDocument: S.optional(S.String),
          PolicyRevisionId: S.optional(S.String),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ResourcePolicy" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RetrievalToken: S.String,
          TraceFormat: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListRetrievedTraces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRetrievedTracesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Duration: S.optional(S.Number),
          Spans: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "RetrievedTrace" });
    case 2:
      return S.Array(__S(1409, __c44, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          RetrievalStatus: S.optional(S.String),
          TraceFormat: S.optional(S.String),
          Traces: S.optional(__S(1410, __c44, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListRetrievedTracesResult" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, NextToken: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(193, __c6, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KeyId: S.optional(S.String), Type: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutEncryptionConfig" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEncryptionConfigRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PolicyName: S.String,
          PolicyDocument: S.String,
          PolicyRevisionId: S.optional(S.String),
          BypassPolicyLockoutCheck: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/PutResourcePolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourcePolicy: S.optional(__S(1376, __c43, 0)) }),
      ).annotate({ identifier: "PutResourcePolicyResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimeoutCount: S.optional(S.Number),
          ConnectionRefusedCount: S.optional(S.Number),
          HTTPCode4XXCount: S.optional(S.Number),
          HTTPCode5XXCount: S.optional(S.Number),
          UnknownHostCount: S.optional(S.Number),
          OtherCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BackendConnectionErrors" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          SegmentsReceivedCount: S.optional(S.Number),
          SegmentsSentCount: S.optional(S.Number),
          SegmentsSpilloverCount: S.optional(S.Number),
          SegmentsRejectedCount: S.optional(S.Number),
          BackendConnectionErrors: S.optional(__S(1536, __c48, 0)),
        }),
      ).annotate({ identifier: "TelemetryRecord" });
    case 2:
      return S.Array(__S(1537, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TelemetryRecords: __S(1538, __c48, 2),
          EC2InstanceId: S.optional(S.String),
          Hostname: S.optional(S.String),
          ResourceARN: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TelemetryRecords" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutTelemetryRecordsRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TraceSegmentDocuments: __S(32, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TraceSegments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutTraceSegmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnprocessedTraceSegment" });
    case 2:
      return S.Array(__S(1569, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ UnprocessedTraceSegments: S.optional(__S(1570, __c49, 2)) }),
      ).annotate({ identifier: "PutTraceSegmentsResult" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TraceIds: __S(32, __c1, 0),
          StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/StartTraceRetrieval" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTraceRetrievalRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RetrievalToken: S.optional(S.String) })).annotate({
        identifier: "StartTraceRetrievalResult",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, Tags: __S(193, __c6, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.String, TagKeys: __S(32, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          GroupARN: S.optional(S.String),
          FilterExpression: S.optional(S.String),
          InsightsConfiguration: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UpdateGroup" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateGroupRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DesiredSamplingPercentage: S.Number })).annotate({
        identifier: "ProbabilisticRuleValueUpdate",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ Probabilistic: __S(1728, __c54, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Rule: __S(1729, __c54, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateIndexingRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIndexingRuleRequest" });
    case 3:
      return S.suspend(() => S.Struct({ IndexingRule: S.optional(__S(642, __c20, 2)) })).annotate({
        identifier: "UpdateIndexingRuleResult",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleARN: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Priority: S.optional(S.Number),
          FixedRate: S.optional(S.Number),
          ReservoirSize: S.optional(S.Number),
          Host: S.optional(S.String),
          ServiceName: S.optional(S.String),
          ServiceType: S.optional(S.String),
          HTTPMethod: S.optional(S.String),
          URLPath: S.optional(S.String),
          Attributes: S.optional(__S(320, __c10, 0)),
          SamplingRateBoost: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "SamplingRuleUpdate" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SamplingRuleUpdate: __S(1760, __c55, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateSamplingRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSamplingRuleRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Destination: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateTraceSegmentDestination" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTraceSegmentDestinationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
