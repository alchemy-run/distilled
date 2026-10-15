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
const ns = /*@__PURE__*/ T.XmlNamespace("http://monitoring.amazonaws.com/doc/2010-08-01/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudWatch",
  serviceShapeName: "GraniteServiceVersion20100801",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "monitoring" });
const ver = /*@__PURE__*/ T.ServiceVersion("2010-08-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(`https://monitoring.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://monitoring-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://monitoring-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://monitoring.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://monitoring.{R}.{D}","properties":{},"headers":{}}');

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "ConcurrentModificationException",
        httpResponseCode: 429,
      }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DashboardInvalidInputError
  extends /*@__PURE__*/ S.TaggedError<DashboardInvalidInputError>()(
    "DashboardInvalidInputError",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      dashboardValidationMessages: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "DashboardValidationMessages",
        }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterInput", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DashboardNotFoundError
  extends /*@__PURE__*/ S.TaggedError<DashboardNotFoundError>()(
    "DashboardNotFoundError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceFault
  extends /*@__PURE__*/ S.TaggedError<InternalServiceFault>()(
    "InternalServiceFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InternalServiceError", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidFormatFault
  extends /*@__PURE__*/ S.TaggedError<InvalidFormatFault>()(
    "InvalidFormatFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidFormat", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextToken
  extends /*@__PURE__*/ S.TaggedError<InvalidNextToken>()(
    "InvalidNextToken",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterCombination", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<KmsAccessDeniedException>()("KmsAccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class KmsKeyDisabledException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyDisabledException>()("KmsKeyDisabledException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class KmsKeyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyNotFoundException>()("KmsKeyNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceededException", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<LimitExceededFault>()(
    "LimitExceededFault",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ S.TaggedError<MissingRequiredParameterException>()(
    "MissingRequiredParameterException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "MissingParameter", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflict
  extends /*@__PURE__*/ S.TaggedError<ResourceConflict>()(
    "ResourceConflict",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceConflict", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFound>()(
    "ResourceNotFound",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ResourceType: /*@__PURE__*/ S.optional(S.String),
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ResourceNotFoundException", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperation
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperation>()("UnsupportedOperation", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ValidationError", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type DatasetIdentifier = string;
export type KmsKeyArn = string;
export interface AssociateDatasetKmsKeyInput {
  DatasetIdentifier?: string;
  KmsKeyArn?: string;
}
export interface AssociateDatasetKmsKeyOutput {}
export type ResourceArn = string;
export type MetricName = string;
export type MetricNameList = string[];
export interface ResourceMetricSelection {
  IncludeMetrics?: string[];
}
export type ResourceMetricSelectionList = ResourceMetricSelection[];
export interface CreateResourceMetricsConfigurationInput {
  ResourceArn?: string;
  MetricSelections?: ResourceMetricSelection[];
}
export interface ResourceMetricsConfiguration {
  ResourceArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  MetricSelections?: ResourceMetricSelection[];
}
export interface CreateResourceMetricsConfigurationOutput {
  ResourceMetricsConfiguration: ResourceMetricsConfiguration & {
    ResourceArn: ResourceArn;
    CreatedAt: Date;
    UpdatedAt: Date;
    MetricSelections: (ResourceMetricSelection & { IncludeMetrics: MetricNameList })[];
  };
}
export type Name = string;
export interface DeleteAlarmMuteRuleInput {
  AlarmMuteRuleName?: string;
}
export interface DeleteAlarmMuteRuleResponse {}
export type AlarmName = string;
export type AlarmNames = string[];
export interface DeleteAlarmsInput {
  AlarmNames?: string[];
}
export interface DeleteAlarmsResponse {}
export type AnomalyDetectorId = string;
export type Namespace = string;
export type DimensionName = string;
export type DimensionValue = string;
export interface Dimension {
  Name?: string;
  Value?: string;
}
export type Dimensions = Dimension[];
export type AnomalyDetectorMetricStat = string;
export type AccountId = string;
export interface SingleMetricAnomalyDetector {
  AccountId?: string;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
}
export type MetricId = string;
export interface Metric {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
}
export type Period = number;
export type Stat = string;
export type StandardUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export interface MetricStat {
  Metric?: Metric;
  Period?: number;
  Stat?: string;
  Unit?: StandardUnit;
}
export type MetricExpression = string;
export type MetricLabel = string;
export type ReturnData = boolean;
export interface MetricDataQuery {
  Id?: string;
  MetricStat?: MetricStat;
  Expression?: string;
  Label?: string;
  ReturnData?: boolean;
  Period?: number;
  AccountId?: string;
}
export type MetricDataQueries = MetricDataQuery[];
export interface MetricMathAnomalyDetector {
  MetricDataQueries?: MetricDataQuery[];
}
export interface DeleteAnomalyDetectorInput {
  AnomalyDetectorId?: string;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
}
export interface DeleteAnomalyDetectorOutput {}
export type DashboardName = string;
export type DashboardNames = string[];
export interface DeleteDashboardsInput {
  DashboardNames?: string[];
}
export interface DeleteDashboardsOutput {}
export type InsightRuleName = string;
export type InsightRuleNames = string[];
export interface DeleteInsightRulesInput {
  RuleNames?: string[];
}
export type FailureResource = string;
export type ExceptionType = string;
export type FailureCode = string;
export type FailureDescription = string;
export interface PartialFailure {
  FailureResource?: string;
  ExceptionType?: string;
  FailureCode?: string;
  FailureDescription?: string;
}
export type BatchFailures = PartialFailure[];
export interface DeleteInsightRulesOutput {
  Failures?: PartialFailure[];
}
export type MetricStreamName = string;
export interface DeleteMetricStreamInput {
  Name?: string;
}
export interface DeleteMetricStreamOutput {}
export interface DeleteResourceMetricsConfigurationInput {
  ResourceArn?: string;
}
export interface DeleteResourceMetricsConfigurationOutput {}
export type NextToken = string;
export interface DescribeAlarmContributorsInput {
  AlarmName?: string;
  NextToken?: string;
}
export type ContributorId = string;
export type AttributeName = string;
export type AttributeValue = string;
export type ContributorAttributes = { [key: string]: string | undefined };
export type StateReason = string;
export interface AlarmContributor {
  ContributorId?: string;
  ContributorAttributes?: { [key: string]: string | undefined };
  StateReason?: string;
  StateTransitionedTimestamp?: Date;
}
export type AlarmContributors = AlarmContributor[];
export interface DescribeAlarmContributorsOutput {
  AlarmContributors: (AlarmContributor & {
    ContributorId: ContributorId;
    ContributorAttributes: ContributorAttributes;
    StateReason: StateReason;
  })[];
  NextToken?: string;
}
export type AlarmType = "CompositeAlarm" | "MetricAlarm" | "LogAlarm" | (string & {});
export type AlarmTypes = AlarmType[];
export type HistoryItemType =
  | "ConfigurationUpdate"
  | "StateUpdate"
  | "Action"
  | "AlarmContributorStateUpdate"
  | "AlarmContributorAction"
  | (string & {});
export type MaxRecords = number;
export type ScanBy = "TimestampDescending" | "TimestampAscending" | (string & {});
export interface DescribeAlarmHistoryInput {
  AlarmName?: string;
  AlarmContributorId?: string;
  AlarmTypes?: AlarmType[];
  HistoryItemType?: HistoryItemType;
  StartDate?: Date;
  EndDate?: Date;
  MaxRecords?: number;
  NextToken?: string;
  ScanBy?: ScanBy;
}
export type HistorySummary = string;
export type HistoryData = string;
export interface AlarmHistoryItem {
  AlarmName?: string;
  AlarmContributorId?: string;
  AlarmType?: AlarmType;
  Timestamp?: Date;
  HistoryItemType?: HistoryItemType;
  HistorySummary?: string;
  HistoryData?: string;
  AlarmContributorAttributes?: { [key: string]: string | undefined };
}
export type AlarmHistoryItems = AlarmHistoryItem[];
export interface DescribeAlarmHistoryOutput {
  AlarmHistoryItems?: AlarmHistoryItem[];
  NextToken?: string;
}
export type AlarmNamePrefix = string;
export type StateValue = "OK" | "ALARM" | "INSUFFICIENT_DATA" | (string & {});
export type ActionPrefix = string;
export interface DescribeAlarmsInput {
  AlarmNames?: string[];
  AlarmNamePrefix?: string;
  AlarmTypes?: AlarmType[];
  ChildrenOfAlarmName?: string;
  ParentsOfAlarmName?: string;
  StateValue?: StateValue;
  ActionPrefix?: string;
  MaxRecords?: number;
  NextToken?: string;
}
export type ActionsEnabled = boolean;
export type ResourceName = string;
export type ResourceList = string[];
export type AlarmArn = string;
export type AlarmDescription = string;
export type AlarmRule = string;
export type StateReasonData = string;
export type ActionsSuppressedBy = "WaitPeriod" | "ExtensionPeriod" | "Alarm" | (string & {});
export type ActionsSuppressedReason = string;
export type SuppressorPeriod = number;
export interface CompositeAlarm {
  ActionsEnabled?: boolean;
  AlarmActions?: string[];
  AlarmArn?: string;
  AlarmConfigurationUpdatedTimestamp?: Date;
  AlarmDescription?: string;
  AlarmName?: string;
  AlarmRule?: string;
  InsufficientDataActions?: string[];
  OKActions?: string[];
  StateReason?: string;
  StateReasonData?: string;
  StateUpdatedTimestamp?: Date;
  StateValue?: StateValue;
  StateTransitionedTimestamp?: Date;
  ActionsSuppressedBy?: ActionsSuppressedBy;
  ActionsSuppressedReason?: string;
  ActionsSuppressor?: string;
  ActionsSuppressorWaitPeriod?: number;
  ActionsSuppressorExtensionPeriod?: number;
}
export type CompositeAlarms = CompositeAlarm[];
export type Statistic = "SampleCount" | "Average" | "Sum" | "Minimum" | "Maximum" | (string & {});
export type ExtendedStatistic = string;
export type EvaluationPeriods = number;
export type DatapointsToAlarm = number;
export type Threshold = number;
export type ComparisonOperator =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | "LessThanLowerOrGreaterThanUpperThreshold"
  | "LessThanLowerThreshold"
  | "GreaterThanUpperThreshold"
  | (string & {});
export type TreatMissingData = string;
export type EvaluateLowSampleCountPercentile = string;
export type EvaluationState =
  | "PARTIAL_DATA"
  | "EVALUATION_FAILURE"
  | "EVALUATION_ERROR"
  | (string & {});
export type Timezone = string;
export interface WallClockWindow {
  Timezone?: string;
}
export interface SlidingWindow {}
export type EvaluationWindow =
  | { WallClockWindow: WallClockWindow; SlidingWindow?: never }
  | { WallClockWindow?: never; SlidingWindow: SlidingWindow };
export type WarmUpPeriodDurationInMinutes = number;
export type OnlyStartEvaluatingAfterWarmUpPeriodEnds = boolean;
export interface WarmUpConfiguration {
  WarmUpPeriodDurationInMinutes?: number;
  OnlyStartEvaluatingAfterWarmUpPeriodEnds?: boolean;
}
export type Query = string;
export type PendingPeriod = number;
export type RecoveryPeriod = number;
export interface AlarmPromQLCriteria {
  Query?: string;
  PendingPeriod?: number;
  RecoveryPeriod?: number;
}
export type EvaluationCriteria = { PromQLCriteria: AlarmPromQLCriteria };
export type EvaluationInterval = number;
export interface MetricAlarm {
  AlarmName?: string;
  AlarmArn?: string;
  AlarmDescription?: string;
  AlarmConfigurationUpdatedTimestamp?: Date;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  StateValue?: StateValue;
  StateReason?: string;
  StateReasonData?: string;
  StateUpdatedTimestamp?: Date;
  MetricName?: string;
  Namespace?: string;
  Statistic?: Statistic;
  ExtendedStatistic?: string;
  Dimensions?: Dimension[];
  Period?: number;
  Unit?: StandardUnit;
  EvaluationPeriods?: number;
  DatapointsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  EvaluateLowSampleCountPercentile?: string;
  Metrics?: MetricDataQuery[];
  ThresholdMetricId?: string;
  EvaluationState?: EvaluationState;
  StateTransitionedTimestamp?: Date;
  EvaluationWindow?: EvaluationWindow;
  WarmUpConfiguration?: WarmUpConfiguration;
  EvaluationCriteria?: EvaluationCriteria;
  EvaluationInterval?: number;
}
export type MetricAlarms = MetricAlarm[];
export type QueryString = string;
export type AmazonResourceName = string;
export type LogGroupIdentifiers = string[];
export type ScheduleExpression = string;
export type StartTimeOffset = number;
export type EndTimeOffset = number;
export interface ScheduleConfiguration {
  ScheduleExpression?: string;
  StartTimeOffset?: number;
  EndTimeOffset?: number;
}
export type AggregationExpression = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export type TagList = Tag[];
export interface ScheduledQueryConfiguration {
  QueryString?: string;
  LogGroupIdentifiers?: string[];
  QueryARN?: string;
  ScheduledQueryRoleARN?: string;
  ScheduleConfiguration?: ScheduleConfiguration;
  AggregationExpression?: string;
  Tags?: Tag[];
}
export type QueryResultsToEvaluate = number;
export type QueryResultsToAlarm = number;
export type ActionLogLineCount = number;
export type ActionLogLineRoleArn = string;
export interface LogAlarm {
  AlarmName?: string;
  AlarmArn?: string;
  AlarmDescription?: string;
  AlarmConfigurationUpdatedTimestamp?: Date;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  StateValue?: StateValue;
  StateReason?: string;
  StateReasonData?: string;
  StateUpdatedTimestamp?: Date;
  ScheduledQueryConfiguration?: ScheduledQueryConfiguration;
  QueryResultsToEvaluate?: number;
  QueryResultsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  StateTransitionedTimestamp?: Date;
  EvaluationState?: EvaluationState;
  ActionLogLineCount?: number;
  ActionLogLineRoleArn?: string;
  WarmUpConfiguration?: WarmUpConfiguration;
}
export type LogAlarms = LogAlarm[];
export interface DescribeAlarmsOutput {
  CompositeAlarms?: CompositeAlarm[];
  MetricAlarms?: (MetricAlarm & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
    Metrics: (MetricDataQuery & {
      Id: MetricId;
      MetricStat: MetricStat & {
        Metric: Metric & {
          Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
        };
        Period: Period;
        Stat: Stat;
      };
    })[];
    WarmUpConfiguration: WarmUpConfiguration & {
      WarmUpPeriodDurationInMinutes: WarmUpPeriodDurationInMinutes;
    };
  })[];
  LogAlarms?: (LogAlarm & {
    ScheduledQueryConfiguration: ScheduledQueryConfiguration & {
      QueryString: QueryString;
      ScheduledQueryRoleARN: AmazonResourceName;
      ScheduleConfiguration: ScheduleConfiguration & {
        ScheduleExpression: ScheduleExpression;
        StartTimeOffset: StartTimeOffset;
      };
      AggregationExpression: AggregationExpression;
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    WarmUpConfiguration: WarmUpConfiguration & {
      WarmUpPeriodDurationInMinutes: WarmUpPeriodDurationInMinutes;
    };
  })[];
  NextToken?: string;
}
export interface DescribeAlarmsForMetricInput {
  MetricName?: string;
  Namespace?: string;
  Statistic?: Statistic;
  ExtendedStatistic?: string;
  Dimensions?: Dimension[];
  Period?: number;
  Unit?: StandardUnit;
}
export interface DescribeAlarmsForMetricOutput {
  MetricAlarms?: (MetricAlarm & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
    Metrics: (MetricDataQuery & {
      Id: MetricId;
      MetricStat: MetricStat & {
        Metric: Metric & {
          Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
        };
        Period: Period;
        Stat: Stat;
      };
    })[];
    WarmUpConfiguration: WarmUpConfiguration & {
      WarmUpPeriodDurationInMinutes: WarmUpPeriodDurationInMinutes;
    };
  })[];
}
export type AnomalyDetectorIds = string[];
export type MaxReturnedResultsCount = number;
export type AnomalyDetectorType = "SINGLE_METRIC" | "METRIC_MATH" | (string & {});
export type AnomalyDetectorTypes = AnomalyDetectorType[];
export interface DescribeAnomalyDetectorsInput {
  AnomalyDetectorIds?: string[];
  NextToken?: string;
  MaxResults?: number;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  AnomalyDetectorTypes?: AnomalyDetectorType[];
}
export interface Range {
  StartTime?: Date;
  EndTime?: Date;
}
export type AnomalyDetectorExcludedTimeRanges = Range[];
export type AnomalyDetectorMetricTimezone = string;
export interface AnomalyDetectorConfiguration {
  ExcludedTimeRanges?: Range[];
  MetricTimezone?: string;
}
export type AnomalyDetectorStateValue =
  | "PENDING_TRAINING"
  | "TRAINED_INSUFFICIENT_DATA"
  | "TRAINED"
  | (string & {});
export type PeriodicSpikes = boolean;
export interface MetricCharacteristics {
  PeriodicSpikes?: boolean;
}
export interface AnomalyDetector {
  AnomalyDetectorId?: string;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
  Configuration?: AnomalyDetectorConfiguration;
  StateValue?: AnomalyDetectorStateValue;
  MetricCharacteristics?: MetricCharacteristics;
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
}
export type AnomalyDetectors = AnomalyDetector[];
export interface DescribeAnomalyDetectorsOutput {
  AnomalyDetectors?: (AnomalyDetector & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
    Configuration: AnomalyDetectorConfiguration & {
      ExcludedTimeRanges: (Range & { StartTime: Date; EndTime: Date })[];
    };
    SingleMetricAnomalyDetector: SingleMetricAnomalyDetector & {
      Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
    };
    MetricMathAnomalyDetector: MetricMathAnomalyDetector & {
      MetricDataQueries: (MetricDataQuery & {
        Id: MetricId;
        MetricStat: MetricStat & {
          Metric: Metric & {
            Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
          };
          Period: Period;
          Stat: Stat;
        };
      })[];
    };
  })[];
  NextToken?: string;
}
export type InsightRuleMaxResults = number;
export interface DescribeInsightRulesInput {
  NextToken?: string;
  MaxResults?: number;
}
export type InsightRuleState = string;
export type InsightRuleSchema = string;
export type InsightRuleDefinition = string;
export type InsightRuleIsManaged = boolean;
export type InsightRuleOnTransformedLogs = boolean;
export interface InsightRule {
  Name?: string;
  State?: string;
  Schema?: string;
  Definition?: string;
  ManagedRule?: boolean;
  ApplyOnTransformedLogs?: boolean;
}
export type InsightRules = InsightRule[];
export interface DescribeInsightRulesOutput {
  NextToken?: string;
  InsightRules?: (InsightRule & {
    Name: InsightRuleName;
    State: InsightRuleState;
    Schema: InsightRuleSchema;
    Definition: InsightRuleDefinition;
  })[];
}
export interface DisableAlarmActionsInput {
  AlarmNames?: string[];
}
export interface DisableAlarmActionsResponse {}
export interface DisableInsightRulesInput {
  RuleNames?: string[];
}
export interface DisableInsightRulesOutput {
  Failures?: PartialFailure[];
}
export interface DisassociateDatasetKmsKeyInput {
  DatasetIdentifier?: string;
}
export interface DisassociateDatasetKmsKeyOutput {}
export interface EnableAlarmActionsInput {
  AlarmNames?: string[];
}
export interface EnableAlarmActionsResponse {}
export interface EnableInsightRulesInput {
  RuleNames?: string[];
}
export interface EnableInsightRulesOutput {
  Failures?: PartialFailure[];
}
export interface GetAlarmMuteRuleInput {
  AlarmMuteRuleName?: string;
}
export type Arn = string;
export type Expression = string;
export type Duration = string;
export interface Schedule {
  Expression?: string;
  Duration?: string;
  Timezone?: string;
}
export interface Rule {
  Schedule?: Schedule;
}
export type MuteTargetAlarmNameList = string[];
export interface MuteTargets {
  AlarmNames?: string[];
}
export type AlarmMuteRuleStatus = "SCHEDULED" | "ACTIVE" | "EXPIRED" | (string & {});
export type MuteType = string;
export interface GetAlarmMuteRuleOutput {
  Name?: string;
  AlarmMuteRuleArn?: string;
  Description?: string;
  Rule?: Rule & { Schedule: Schedule & { Expression: Expression; Duration: Duration } };
  MuteTargets?: MuteTargets & { AlarmNames: MuteTargetAlarmNameList };
  StartDate?: Date;
  ExpireDate?: Date;
  Status?: AlarmMuteRuleStatus;
  LastUpdatedTimestamp?: Date;
  MuteType?: string;
}
export interface GetDashboardInput {
  DashboardName?: string;
}
export type DashboardArn = string;
export type DashboardBody = string;
export interface GetDashboardOutput {
  DashboardArn?: string;
  DashboardBody?: string;
  DashboardName?: string;
}
export interface GetDatasetInput {
  DatasetIdentifier?: string;
}
export type DatasetId = string;
export type DatasetArn = string;
export interface GetDatasetOutput {
  DatasetId: string;
  Arn: string;
  KmsKeyArn?: string;
}
export type InsightRuleUnboundInteger = number;
export type InsightRuleMetricName = string;
export type InsightRuleMetricList = string[];
export type InsightRuleOrderBy = string;
export interface GetInsightRuleReportInput {
  RuleName?: string;
  StartTime?: Date;
  EndTime?: Date;
  Period?: number;
  MaxContributorCount?: number;
  Metrics?: string[];
  OrderBy?: string;
}
export type InsightRuleContributorKeyLabel = string;
export type InsightRuleContributorKeyLabels = string[];
export type InsightRuleAggregationStatistic = string;
export type InsightRuleUnboundDouble = number;
export type InsightRuleUnboundLong = number;
export type InsightRuleContributorKey = string;
export type InsightRuleContributorKeys = string[];
export interface InsightRuleContributorDatapoint {
  Timestamp?: Date;
  ApproximateValue?: number;
}
export type InsightRuleContributorDatapoints = InsightRuleContributorDatapoint[];
export interface InsightRuleContributor {
  Keys?: string[];
  ApproximateAggregateValue?: number;
  Datapoints?: InsightRuleContributorDatapoint[];
}
export type InsightRuleContributors = InsightRuleContributor[];
export interface InsightRuleMetricDatapoint {
  Timestamp?: Date;
  UniqueContributors?: number;
  MaxContributorValue?: number;
  SampleCount?: number;
  Average?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
}
export type InsightRuleMetricDatapoints = InsightRuleMetricDatapoint[];
export interface GetInsightRuleReportOutput {
  KeyLabels?: string[];
  AggregationStatistic?: string;
  AggregateValue?: number;
  ApproximateUniqueCount?: number;
  Contributors?: (InsightRuleContributor & {
    Keys: InsightRuleContributorKeys;
    ApproximateAggregateValue: InsightRuleUnboundDouble;
    Datapoints: (InsightRuleContributorDatapoint & {
      Timestamp: Date;
      ApproximateValue: InsightRuleUnboundDouble;
    })[];
  })[];
  MetricDatapoints?: (InsightRuleMetricDatapoint & { Timestamp: Date })[];
}
export type GetMetricDataMaxDatapoints = number;
export type GetMetricDataLabelTimezone = string;
export interface LabelOptions {
  Timezone?: string;
}
export interface GetMetricDataInput {
  MetricDataQueries?: MetricDataQuery[];
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  ScanBy?: ScanBy;
  MaxDatapoints?: number;
  LabelOptions?: LabelOptions;
}
export type Timestamps = Date[];
export type DatapointValue = number;
export type DatapointValues = number[];
export type StatusCode = "Complete" | "InternalError" | "PartialData" | "Forbidden" | (string & {});
export type MessageDataCode = string;
export type MessageDataValue = string;
export interface MessageData {
  Code?: string;
  Value?: string;
}
export type MetricDataResultMessages = MessageData[];
export interface MetricDataResult {
  Id?: string;
  Label?: string;
  Timestamps?: Date[];
  Values?: number[];
  StatusCode?: StatusCode;
  Messages?: MessageData[];
}
export type MetricDataResults = MetricDataResult[];
export interface GetMetricDataOutput {
  MetricDataResults?: MetricDataResult[];
  NextToken?: string;
  Messages?: MessageData[];
}
export type Statistics = Statistic[];
export type ExtendedStatistics = string[];
export interface GetMetricStatisticsInput {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  StartTime?: Date;
  EndTime?: Date;
  Period?: number;
  Statistics?: Statistic[];
  ExtendedStatistics?: string[];
  Unit?: StandardUnit;
}
export type DatapointValueMap = { [key: string]: number | undefined };
export interface Datapoint {
  Timestamp?: Date;
  SampleCount?: number;
  Average?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
  Unit?: StandardUnit;
  ExtendedStatistics?: { [key: string]: number | undefined };
}
export type Datapoints = Datapoint[];
export interface GetMetricStatisticsOutput {
  Label?: string;
  Datapoints?: Datapoint[];
}
export interface GetMetricStreamInput {
  Name?: string;
}
export type MetricStreamFilterMetricNames = string[];
export interface MetricStreamFilter {
  Namespace?: string;
  MetricNames?: string[];
}
export type MetricStreamFilters = MetricStreamFilter[];
export type MetricStreamState = string;
export type MetricStreamOutputFormat =
  | "json"
  | "opentelemetry0.7"
  | "opentelemetry1.0"
  | (string & {});
export interface MetricStreamStatisticsMetric {
  Namespace?: string;
  MetricName?: string;
}
export type MetricStreamStatisticsIncludeMetrics = MetricStreamStatisticsMetric[];
export type MetricStreamStatistic = string;
export type MetricStreamStatisticsAdditionalStatistics = string[];
export interface MetricStreamStatisticsConfiguration {
  IncludeMetrics?: MetricStreamStatisticsMetric[];
  AdditionalStatistics?: string[];
}
export type MetricStreamStatisticsConfigurations = MetricStreamStatisticsConfiguration[];
export type IncludeLinkedAccountsMetrics = boolean;
export interface GetMetricStreamOutput {
  Arn?: string;
  Name?: string;
  IncludeFilters?: MetricStreamFilter[];
  ExcludeFilters?: MetricStreamFilter[];
  FirehoseArn?: string;
  RoleArn?: string;
  State?: string;
  CreationDate?: Date;
  LastUpdateDate?: Date;
  OutputFormat?: MetricStreamOutputFormat;
  StatisticsConfigurations?: (MetricStreamStatisticsConfiguration & {
    IncludeMetrics: (MetricStreamStatisticsMetric & {
      Namespace: Namespace;
      MetricName: MetricName;
    })[];
    AdditionalStatistics: MetricStreamStatisticsAdditionalStatistics;
  })[];
  IncludeLinkedAccountsMetrics?: boolean;
}
export type MetricWidget = string;
export type OutputFormat = string;
export interface GetMetricWidgetImageInput {
  MetricWidget?: string;
  OutputFormat?: string;
}
export type MetricWidgetImage = Uint8Array;
export interface GetMetricWidgetImageOutput {
  MetricWidgetImage?: Uint8Array;
}
export interface GetOTelEnrichmentInput {}
export type OTelEnrichmentStatus = "Running" | "Stopped" | (string & {});
export type OTelEnrichmentMetricNameList = string[];
export interface OTelEnrichmentMetricSelector {
  Namespace?: string;
  MetricNames?: string[];
}
export type OTelEnrichmentMetricSelectorList = OTelEnrichmentMetricSelector[];
export interface GetOTelEnrichmentOutput {
  Status: OTelEnrichmentStatus;
  IncludeFilters?: (OTelEnrichmentMetricSelector & { Namespace: Namespace })[];
  ExcludeFilters?: (OTelEnrichmentMetricSelector & { Namespace: Namespace })[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetResourceMetricsConfigurationInput {
  ResourceArn?: string;
}
export interface GetResourceMetricsConfigurationOutput {
  ResourceMetricsConfiguration: ResourceMetricsConfiguration & {
    ResourceArn: ResourceArn;
    CreatedAt: Date;
    UpdatedAt: Date;
    MetricSelections: (ResourceMetricSelection & { IncludeMetrics: MetricNameList })[];
  };
}
export type AlarmMuteRuleStatuses = AlarmMuteRuleStatus[];
export interface ListAlarmMuteRulesInput {
  AlarmName?: string;
  Statuses?: AlarmMuteRuleStatus[];
  MaxRecords?: number;
  NextToken?: string;
}
export interface AlarmMuteRuleSummary {
  AlarmMuteRuleArn?: string;
  ExpireDate?: Date;
  Status?: AlarmMuteRuleStatus;
  MuteType?: string;
  LastUpdatedTimestamp?: Date;
}
export type AlarmMuteRuleSummaries = AlarmMuteRuleSummary[];
export interface ListAlarmMuteRulesOutput {
  AlarmMuteRuleSummaries?: AlarmMuteRuleSummary[];
  NextToken?: string;
}
export type DashboardNamePrefix = string;
export interface ListDashboardsInput {
  DashboardNamePrefix?: string;
  NextToken?: string;
}
export type LastModified = Date;
export type Size = number;
export interface DashboardEntry {
  DashboardName?: string;
  DashboardArn?: string;
  LastModified?: Date;
  Size?: number;
}
export type DashboardEntries = DashboardEntry[];
export interface ListDashboardsOutput {
  DashboardEntries?: DashboardEntry[];
  NextToken?: string;
}
export interface ListManagedInsightRulesInput {
  ResourceARN?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type TemplateName = string;
export interface ManagedRuleState {
  RuleName?: string;
  State?: string;
}
export interface ManagedRuleDescription {
  TemplateName?: string;
  ResourceARN?: string;
  RuleState?: ManagedRuleState;
}
export type ManagedRuleDescriptions = ManagedRuleDescription[];
export interface ListManagedInsightRulesOutput {
  ManagedRules?: (ManagedRuleDescription & {
    RuleState: ManagedRuleState & { RuleName: InsightRuleName; State: InsightRuleState };
  })[];
  NextToken?: string;
}
export interface DimensionFilter {
  Name?: string;
  Value?: string;
}
export type DimensionFilters = DimensionFilter[];
export type RecentlyActive = "PT3H" | (string & {});
export type IncludeLinkedAccounts = boolean;
export interface ListMetricsInput {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: DimensionFilter[];
  NextToken?: string;
  RecentlyActive?: RecentlyActive;
  IncludeLinkedAccounts?: boolean;
  OwningAccount?: string;
}
export type Metrics = Metric[];
export type OwningAccounts = string[];
export interface ListMetricsOutput {
  Metrics?: (Metric & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
  })[];
  NextToken?: string;
  OwningAccounts?: string[];
}
export type ListMetricStreamsMaxResults = number;
export interface ListMetricStreamsInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface MetricStreamEntry {
  Arn?: string;
  CreationDate?: Date;
  LastUpdateDate?: Date;
  Name?: string;
  FirehoseArn?: string;
  State?: string;
  OutputFormat?: MetricStreamOutputFormat;
}
export type MetricStreamEntries = MetricStreamEntry[];
export interface ListMetricStreamsOutput {
  NextToken?: string;
  Entries?: MetricStreamEntry[];
}
export interface ListTagsForResourceInput {
  ResourceARN?: string;
}
export interface ListTagsForResourceOutput {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export interface PutAlarmMuteRuleInput {
  Name?: string;
  Description?: string;
  Rule?: Rule;
  MuteTargets?: MuteTargets;
  Tags?: Tag[];
  StartDate?: Date;
  ExpireDate?: Date;
}
export interface PutAlarmMuteRuleResponse {}
export interface PutAnomalyDetectorInput {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
  Configuration?: AnomalyDetectorConfiguration;
  MetricCharacteristics?: MetricCharacteristics;
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
}
export interface PutAnomalyDetectorOutput {
  AnomalyDetectorId?: string;
}
export interface PutCompositeAlarmInput {
  ActionsEnabled?: boolean;
  AlarmActions?: string[];
  AlarmDescription?: string;
  AlarmName?: string;
  AlarmRule?: string;
  InsufficientDataActions?: string[];
  OKActions?: string[];
  Tags?: Tag[];
  ActionsSuppressor?: string;
  ActionsSuppressorWaitPeriod?: number;
  ActionsSuppressorExtensionPeriod?: number;
}
export interface PutCompositeAlarmResponse {}
export interface PutDashboardInput {
  DashboardName?: string;
  DashboardBody?: string;
  Tags?: Tag[];
}
export type DataPath = string;
export type Message = string;
export interface DashboardValidationMessage {
  DataPath?: string;
  Message?: string;
}
export type DashboardValidationMessages = DashboardValidationMessage[];
export interface PutDashboardOutput {
  DashboardValidationMessages?: DashboardValidationMessage[];
}
export interface PutInsightRuleInput {
  RuleName?: string;
  RuleState?: string;
  RuleDefinition?: string;
  Tags?: Tag[];
  ApplyOnTransformedLogs?: boolean;
}
export interface PutInsightRuleOutput {}
export interface PutLogAlarmInput {
  AlarmName?: string;
  AlarmDescription?: string;
  ScheduledQueryConfiguration?: ScheduledQueryConfiguration;
  ActionLogLineCount?: number;
  ActionLogLineRoleArn?: string;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  QueryResultsToEvaluate?: number;
  QueryResultsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  Tags?: Tag[];
  WarmUpConfiguration?: WarmUpConfiguration;
}
export interface PutLogAlarmResponse {}
export interface ManagedRule {
  TemplateName?: string;
  ResourceARN?: string;
  Tags?: Tag[];
}
export type ManagedRules = ManagedRule[];
export interface PutManagedInsightRulesInput {
  ManagedRules?: ManagedRule[];
}
export interface PutManagedInsightRulesOutput {
  Failures?: PartialFailure[];
}
export interface PutMetricAlarmInput {
  AlarmName?: string;
  AlarmDescription?: string;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  MetricName?: string;
  Namespace?: string;
  Statistic?: Statistic;
  ExtendedStatistic?: string;
  Dimensions?: Dimension[];
  Period?: number;
  Unit?: StandardUnit;
  EvaluationPeriods?: number;
  DatapointsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  EvaluateLowSampleCountPercentile?: string;
  Metrics?: MetricDataQuery[];
  Tags?: Tag[];
  ThresholdMetricId?: string;
  EvaluationWindow?: EvaluationWindow;
  WarmUpConfiguration?: WarmUpConfiguration;
  EvaluationCriteria?: EvaluationCriteria;
  EvaluationInterval?: number;
}
export interface PutMetricAlarmResponse {}
export interface StatisticSet {
  SampleCount?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
}
export type Values = number[];
export type Counts = number[];
export type StorageResolution = number;
export interface MetricDatum {
  MetricName?: string;
  Dimensions?: Dimension[];
  Timestamp?: Date;
  Value?: number;
  StatisticValues?: StatisticSet;
  Values?: number[];
  Counts?: number[];
  Unit?: StandardUnit;
  StorageResolution?: number;
}
export type MetricData = MetricDatum[];
export type EntityKeyAttributesMapKeyString = string;
export type EntityKeyAttributesMapValueString = string;
export type EntityKeyAttributesMap = { [key: string]: string | undefined };
export type EntityAttributesMapKeyString = string;
export type EntityAttributesMapValueString = string;
export type EntityAttributesMap = { [key: string]: string | undefined };
export interface Entity {
  KeyAttributes?: { [key: string]: string | undefined };
  Attributes?: { [key: string]: string | undefined };
}
export interface EntityMetricData {
  Entity?: Entity;
  MetricData?: MetricDatum[];
}
export type EntityMetricDataList = EntityMetricData[];
export type StrictEntityValidation = boolean;
export interface PutMetricDataInput {
  Namespace?: string;
  MetricData?: MetricDatum[];
  EntityMetricData?: EntityMetricData[];
  StrictEntityValidation?: boolean;
}
export interface PutMetricDataResponse {}
export interface PutMetricStreamInput {
  Name?: string;
  IncludeFilters?: MetricStreamFilter[];
  ExcludeFilters?: MetricStreamFilter[];
  FirehoseArn?: string;
  RoleArn?: string;
  OutputFormat?: MetricStreamOutputFormat;
  Tags?: Tag[];
  StatisticsConfigurations?: MetricStreamStatisticsConfiguration[];
  IncludeLinkedAccountsMetrics?: boolean;
}
export interface PutMetricStreamOutput {
  Arn?: string;
}
export interface SetAlarmStateInput {
  AlarmName?: string;
  StateValue?: StateValue;
  StateReason?: string;
  StateReasonData?: string;
}
export interface SetAlarmStateResponse {}
export type MetricStreamNames = string[];
export interface StartMetricStreamsInput {
  Names?: string[];
}
export interface StartMetricStreamsOutput {}
export interface StartOTelEnrichmentInput {
  IncludeFilters?: OTelEnrichmentMetricSelector[];
  ExcludeFilters?: OTelEnrichmentMetricSelector[];
}
export interface StartOTelEnrichmentOutput {
  IncludeFilters?: (OTelEnrichmentMetricSelector & { Namespace: Namespace })[];
  ExcludeFilters?: (OTelEnrichmentMetricSelector & { Namespace: Namespace })[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface StopMetricStreamsInput {
  Names?: string[];
}
export interface StopMetricStreamsOutput {}
export interface StopOTelEnrichmentInput {}
export interface StopOTelEnrichmentOutput {}
export interface TagResourceInput {
  ResourceARN?: string;
  Tags?: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceARN?: string;
  TagKeys?: string[];
}
export interface UntagResourceOutput {}
export interface UpdateOTelEnrichmentInput {
  IncludeFilters?: OTelEnrichmentMetricSelector[];
  ExcludeFilters?: OTelEnrichmentMetricSelector[];
}
export interface UpdateOTelEnrichmentOutput {
  IncludeFilters?: (OTelEnrichmentMetricSelector & { Namespace: Namespace })[];
  ExcludeFilters?: (OTelEnrichmentMetricSelector & { Namespace: Namespace })[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface UpdateResourceMetricsConfigurationInput {
  ResourceArn?: string;
  MetricSelections?: ResourceMetricSelection[];
}
export interface UpdateResourceMetricsConfigurationOutput {
  ResourceMetricsConfiguration: ResourceMetricsConfiguration & {
    ResourceArn: ResourceArn;
    CreatedAt: Date;
    UpdatedAt: Date;
    MetricSelections: (ResourceMetricSelection & { IncludeMetrics: MetricNameList })[];
  };
}
export type ErrorMessage = string;
export type ResourceType = string;
export type ResourceId = string;
export type FaultDescription = string;
export type AwsQueryErrorMessage = string;
export type ValidationExceptionMessage = string;
export type DashboardErrorMessage = string;
export type AssociateDatasetKmsKeyError =
  | ConflictException
  | KmsAccessDeniedException
  | KmsKeyDisabledException
  | KmsKeyNotFoundException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates an Amazon Web Services Key Management Service (Amazon Web Services KMS)
 * customer managed key with the specified dataset. After this operation completes, all
 * data published to the dataset is encrypted at rest using the specified KMS key.
 * Callers must have `kms:Decrypt` permission on the key to read the
 * encrypted data.
 *
 * Only the `default` dataset is supported. The `default` dataset
 * is implicit for every account in every Region -- you do not need to create it before
 * calling this operation.
 *
 * You can call `AssociateDatasetKmsKey` on a dataset that is already
 * associated with a KMS key to replace the existing key with a different one. The
 * caller must have `kms:Decrypt` permission on both the current key and
 * the new key.
 *
 * If the currently associated key has been deleted, is scheduled for deletion,
 * is pending import, is unavailable, or has been disabled, Amazon CloudWatch
 * does not require `kms:Decrypt` permission on the current key and
 * the rotation proceeds. If the key was only disabled, consider re-enabling it
 * instead of rotating, because re-enabling allows Amazon CloudWatch to
 * resume decrypting your existing metric data encrypted with that key.
 *
 * The KMS key that you specify must meet all of the following requirements:
 *
 * - It must be a symmetric encryption KMS key (key spec
 * `SYMMETRIC_DEFAULT`, key usage `ENCRYPT_DECRYPT`).
 * Asymmetric keys, HMAC keys, and key material types other than
 * `SYMMETRIC_DEFAULT` are not supported.
 *
 * - It must be enabled and not pending deletion.
 *
 * - Its key policy must grant the CloudWatch service principal
 * (`cloudwatch.amazonaws.com`) these permissions:
 * `kms:DescribeKey`, `kms:GenerateDataKey`,
 * `kms:Encrypt`, `kms:Decrypt`, and
 * `kms:ReEncrypt*`. Amazon CloudWatch requires these permissions
 * to manage the data on your behalf.
 *
 * - The calling principal must have `kms:Decrypt` permission on the
 * key.
 *
 * - It must be specified as a fully qualified key ARN. Key IDs, aliases, and
 * alias ARNs are not accepted.
 *
 * - It must be in the same Amazon Web Services Region as the dataset.
 *
 * Before completing the association, Amazon CloudWatch validates the key by
 * performing a series of dry-run KMS operations. Service-principal checks run first to
 * verify that the key policy grants the required access to Amazon CloudWatch. These
 * checks include `kms:DescribeKey`, `kms:GenerateDataKey`,
 * `kms:Encrypt`, `kms:Decrypt`, and `kms:ReEncrypt*`.
 * After those succeed, a `kms:Decrypt` dry-run is run with the caller's
 * credentials to verify that the calling principal can use the new key. When you are
 * replacing an existing key, the caller's `kms:Decrypt` dry-run is also run
 * on the current key.
 *
 * If any of these checks on the new key fails, the operation fails and the existing
 * key association (if any) remains unchanged. Common failure causes include the new key
 * being disabled, the key policy not granting the required permissions to
 * Amazon CloudWatch, or the caller lacking `kms:Decrypt` permission on
 * the new key.
 *
 * For more information about using customer managed keys with Amazon CloudWatch,
 * see Encryption at rest
 * with customer managed keys in the Amazon CloudWatch User
 * Guide.
 */
export const associateDatasetKmsKey: API.OperationMethod<
  AssociateDatasetKmsKeyInput,
  AssociateDatasetKmsKeyOutput,
  AssociateDatasetKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c1, 0) as any as S.Schema<AssociateDatasetKmsKeyInput>,
  output: __S(16, __c2, 0) as any as S.Schema<AssociateDatasetKmsKeyOutput>,
  errors: [
    ConflictException,
    KmsAccessDeniedException,
    KmsKeyDisabledException,
    KmsKeyNotFoundException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDatasetKmsKey",
}));

export type CreateResourceMetricsConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a resource metrics configuration for an Amazon Web Services resource. After you
 * create a configuration, Amazon CloudWatch collects detailed metrics for that
 * resource.
 *
 * Each Amazon Web Services resource can have only one resource metrics configuration. If a
 * configuration already exists for the specified resource ARN, this operation returns a
 * `ConflictException`. To modify an existing configuration, use UpdateResourceMetricsConfiguration.
 *
 * If the Amazon Web Services resource that you specify in `ResourceArn` does
 * not exist, this operation returns a `ResourceNotFoundException`. Verify that
 * the resource ARN is correct and that the resource exists before you retry the
 * request.
 *
 * To create a resource metrics configuration, you must have the
 * `cloudwatch:CreateResourceMetricsConfiguration` permission. For information about scoping
 * this permission to specific resources, see Condition keys for resource metrics configuration access in the
 * *Amazon CloudWatch User Guide*.
 */
export const createResourceMetricsConfiguration: API.OperationMethod<
  CreateResourceMetricsConfigurationInput,
  CreateResourceMetricsConfigurationOutput,
  CreateResourceMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateResourceMetricsConfigurationInput>,
  output: __S(43, __c5, 3) as any as S.Schema<CreateResourceMetricsConfigurationOutput>,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceMetricsConfiguration",
}));

export type DeleteAlarmMuteRuleError = CommonErrors;
/**
 * Deletes a specific alarm mute rule.
 *
 * When you delete a mute rule, any alarms that are currently being muted by that rule
 * are immediately unmuted. If those alarms are in an ALARM state, their configured actions
 * will trigger.
 *
 * This operation is idempotent. If you delete a mute rule that does not exist, the
 * operation succeeds without returning an error.
 *
 * **Permissions**
 *
 * To delete a mute rule, you need the `cloudwatch:DeleteAlarmMuteRule`
 * permission on the alarm mute rule resource.
 */
export const deleteAlarmMuteRule: API.OperationMethod<
  DeleteAlarmMuteRuleInput,
  DeleteAlarmMuteRuleResponse,
  DeleteAlarmMuteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<DeleteAlarmMuteRuleInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteAlarmMuteRuleResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarmMuteRule",
}));

export type DeleteAlarmsError = ResourceConflict | ResourceNotFound | CommonErrors;
/**
 * Deletes the specified alarms. You can delete up to 100 alarms in one operation.
 * However, this total can include no more than one composite alarm. For example, you could
 * delete 99 metric alarms and one composite alarms with one operation, but you can't
 * delete two composite alarms with one operation. Log alarms cannot be batch deleted.
 *
 * If you specify any incorrect alarm names, the alarms you specify with correct
 * names are still deleted. Other syntax errors might result in no alarms being deleted. To
 * confirm that alarms were deleted successfully, you can use the DescribeAlarms operation after using `DeleteAlarms`.
 *
 * It is possible to create a loop or cycle of composite alarms, where composite
 * alarm A depends on composite alarm B, and composite alarm B also depends on
 * composite alarm A. In this scenario, you can't delete any composite alarm that is
 * part of the cycle because there is always still a composite alarm that depends on
 * that alarm that you want to delete.
 *
 * To get out of such a situation, you must break the cycle by changing the rule of
 * one of the composite alarms in the cycle to remove a dependency that creates the
 * cycle. The simplest change to make to break a cycle is to change the
 * `AlarmRule` of one of the alarms to `false`.
 *
 * Additionally, the evaluation of composite alarms stops if CloudWatch
 * detects a cycle in the evaluation path.
 */
export const deleteAlarms: API.OperationMethod<
  DeleteAlarmsInput,
  DeleteAlarmsResponse,
  DeleteAlarmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<DeleteAlarmsInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteAlarmsResponse>,
  errors: [ResourceConflict, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarms",
}));

export type DeleteAnomalyDetectorError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified anomaly detection model from your account. For more information
 * about how to delete an anomaly detection model, see Deleting an anomaly detection model in the CloudWatch User
 * Guide.
 */
export const deleteAnomalyDetector: API.OperationMethod<
  DeleteAnomalyDetectorInput,
  DeleteAnomalyDetectorOutput,
  DeleteAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<DeleteAnomalyDetectorInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteAnomalyDetectorOutput>,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalyDetector",
}));

export type DeleteDashboardsError =
  | ConflictException
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes all dashboards that you specify. You can specify up to 100 dashboards to
 * delete. If there is an error during this call, the operation attempts to delete as many
 * dashboards as possible.
 */
export const deleteDashboards: API.OperationMethod<
  DeleteDashboardsInput,
  DeleteDashboardsOutput,
  DeleteDashboardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DeleteDashboardsInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteDashboardsOutput>,
  errors: [ConflictException, InternalServiceFault, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboards",
}));

export type DeleteInsightRulesError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Permanently deletes the specified Contributor Insights rules.
 *
 * If you create a rule, delete it, and then re-create it with the same name, historical
 * data from the first time the rule was created might not be available.
 */
export const deleteInsightRules: API.OperationMethod<
  DeleteInsightRulesInput,
  DeleteInsightRulesOutput,
  DeleteInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<DeleteInsightRulesInput>,
  output: __S(122, __c15, 2) as any as S.Schema<DeleteInsightRulesOutput>,
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInsightRules",
}));

export type DeleteMetricStreamError =
  | InternalServiceFault
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Permanently deletes the metric stream that you specify.
 */
export const deleteMetricStream: API.OperationMethod<
  DeleteMetricStreamInput,
  DeleteMetricStreamOutput,
  DeleteMetricStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteMetricStreamInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteMetricStreamOutput>,
  errors: [InternalServiceFault, InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricStream",
}));

export type DeleteResourceMetricsConfigurationError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes the resource metrics configuration for an Amazon Web Services resource. After
 * you delete the configuration, Amazon CloudWatch stops collecting detailed metrics
 * for the resource. Metric data that Amazon CloudWatch already collected for the
 * resource is not deleted.
 *
 * This operation returns a `ResourceNotFoundException` if no resource metrics
 * configuration exists for the specified resource ARN. Verify that the resource ARN is
 * correct.
 *
 * To delete a resource metrics configuration, you must have the
 * `cloudwatch:DeleteResourceMetricsConfiguration` permission. For information about scoping
 * this permission to specific resources, see Condition keys for resource metrics configuration access in the
 * *Amazon CloudWatch User Guide*.
 */
export const deleteResourceMetricsConfiguration: API.OperationMethod<
  DeleteResourceMetricsConfigurationInput,
  DeleteResourceMetricsConfigurationOutput,
  DeleteResourceMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DeleteResourceMetricsConfigurationInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DeleteResourceMetricsConfigurationOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceMetricsConfiguration",
}));

export type DescribeAlarmContributorsError =
  | InvalidNextToken
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the information of the current alarm contributors that are in
 * `ALARM` state. This operation returns details about the individual time
 * series that contribute to the alarm's state.
 */
export const describeAlarmContributors: API.OperationMethod<
  DescribeAlarmContributorsInput,
  DescribeAlarmContributorsOutput,
  DescribeAlarmContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DescribeAlarmContributorsInput>,
  output: __S(147, __c18, 3) as any as S.Schema<DescribeAlarmContributorsOutput>,
  errors: [InvalidNextToken, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmContributors",
}));

export type DescribeAlarmHistoryError = InvalidNextToken | CommonErrors;
/**
 * Retrieves the history for the specified alarm. You can filter the results by date
 * range or item type. If an alarm name is not specified, the histories for either all
 * metric alarms or all composite alarms are returned.
 *
 * CloudWatch retains the history of an alarm even if you delete the alarm.
 *
 * To use this operation and return information about a composite alarm, you must be
 * signed on with the `cloudwatch:DescribeAlarmHistory` permission that is
 * scoped to `*`. You can't return information about composite alarms if your
 * `cloudwatch:DescribeAlarmHistory` permission has a narrower scope.
 */
export const describeAlarmHistory: API.PaginatedOperationMethod<
  DescribeAlarmHistoryInput,
  DescribeAlarmHistoryOutput,
  DescribeAlarmHistoryError,
  Credentials | HttpClient.HttpClient,
  AlarmHistoryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DescribeAlarmHistoryInput>,
  output: __S(163, __c20, 3) as any as S.Schema<DescribeAlarmHistoryOutput>,
  errors: [InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AlarmHistoryItems",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeAlarmsError = InvalidNextToken | CommonErrors;
/**
 * Retrieves the specified alarms. You can filter the results by specifying a prefix
 * for the alarm name, the alarm state, or a prefix for any action.
 *
 * To use this operation and return information about composite alarms, you must be
 * signed on with the `cloudwatch:DescribeAlarms` permission that is scoped to
 * `*`. You can't return information about composite alarms if your
 * `cloudwatch:DescribeAlarms` permission has a narrower scope.
 */
export const describeAlarms: API.PaginatedOperationMethod<
  DescribeAlarmsInput,
  DescribeAlarmsOutput,
  DescribeAlarmsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DescribeAlarmsInput>,
  output: __S(181, __c22, 5) as any as S.Schema<DescribeAlarmsOutput>,
  errors: [InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeAlarmsForMetricError = CommonErrors;
/**
 * Retrieves the alarms for the specified metric. To filter the results, specify a
 * statistic, period, or unit.
 *
 * This operation retrieves only standard alarms that are based on the specified
 * metric. It does not return alarms based on math expressions that use the specified
 * metric, or composite alarms that use the specified metric.
 */
export const describeAlarmsForMetric: API.OperationMethod<
  DescribeAlarmsForMetricInput,
  DescribeAlarmsForMetricOutput,
  DescribeAlarmsForMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DescribeAlarmsForMetricInput>,
  output: __S(233, __c29, 1) as any as S.Schema<DescribeAlarmsForMetricOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmsForMetric",
}));

export type DescribeAnomalyDetectorsError =
  | InternalServiceFault
  | InvalidNextToken
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Lists the anomaly detection models that you have created in your account. For single
 * metric anomaly detectors, you can list all of the models in your account or filter the
 * results to only the models that are related to a certain namespace, metric name, or
 * metric dimension. For metric math anomaly detectors, you can list them by adding
 * `METRIC_MATH` to the `AnomalyDetectorTypes` array. This will
 * return all metric math anomaly detectors in your account.
 */
export const describeAnomalyDetectors: API.PaginatedOperationMethod<
  DescribeAnomalyDetectorsInput,
  DescribeAnomalyDetectorsOutput,
  DescribeAnomalyDetectorsError,
  Credentials | HttpClient.HttpClient,
  AnomalyDetector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<DescribeAnomalyDetectorsInput>,
  output: __S(243, __c30, 3) as any as S.Schema<DescribeAnomalyDetectorsOutput>,
  errors: [
    InternalServiceFault,
    InvalidNextToken,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnomalyDetectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnomalyDetectors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInsightRulesError = InvalidNextToken | UnsupportedOperation | CommonErrors;
/**
 * Returns a list of all the Contributor Insights rules in your account.
 *
 * For more information about Contributor Insights, see Using Contributor
 * Insights to Analyze High-Cardinality Data.
 */
export const describeInsightRules: API.PaginatedOperationMethod<
  DescribeInsightRulesInput,
  DescribeInsightRulesOutput,
  DescribeInsightRulesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<DescribeInsightRulesInput>,
  output: __S(259, __c32, 3) as any as S.Schema<DescribeInsightRulesOutput>,
  errors: [InvalidNextToken, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsightRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisableAlarmActionsError = CommonErrors;
/**
 * Disables the actions for the specified alarms. When an alarm's actions are
 * disabled, the alarm actions do not execute when the alarm state changes.
 */
export const disableAlarmActions: API.OperationMethod<
  DisableAlarmActionsInput,
  DisableAlarmActionsResponse,
  DisableAlarmActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<DisableAlarmActionsInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DisableAlarmActionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAlarmActions",
}));

export type DisableInsightRulesError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Disables the specified Contributor Insights rules. When rules are disabled, they do
 * not analyze log groups and do not incur costs.
 */
export const disableInsightRules: API.OperationMethod<
  DisableInsightRulesInput,
  DisableInsightRulesOutput,
  DisableInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<DisableInsightRulesInput>,
  output: __S(122, __c15, 2) as any as S.Schema<DisableInsightRulesOutput>,
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableInsightRules",
}));

export type DisassociateDatasetKmsKeyError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the customer managed Amazon Web Services Key Management Service
 * (Amazon Web Services KMS) key association from the specified dataset. After this
 * operation completes, data that you publish to the dataset is encrypted at rest using
 * an Amazon Web Services owned key managed by Amazon CloudWatch.
 *
 * Only the `default` dataset is supported. To call this operation, the
 * dataset must currently have a customer managed KMS key associated with it. If the
 * dataset has no associated KMS key, the operation fails with
 * `ResourceNotFoundException`.
 *
 * Amazon CloudWatch performs a dry-run `kms:Decrypt` call on the
 * currently associated key as part of this operation. The caller must have
 * `kms:Decrypt` permission on the currently associated key. If the key is
 * accessible but the caller lacks `kms:Decrypt` permission, the operation
 * fails with `AccessDeniedException`.
 *
 * If the currently associated key has been deleted, is scheduled for deletion,
 * is pending import, is unavailable, or has been disabled, Amazon CloudWatch
 * does not require `kms:Decrypt` permission on that key and the
 * disassociation proceeds. If the key was only disabled, consider re-enabling it
 * instead of disassociating, because re-enabling allows Amazon CloudWatch to
 * resume decrypting your existing metric data.
 *
 * Disassociating a KMS key from a dataset does not immediately remove the
 * `kms:Decrypt` requirement on data plane operations. For up to three
 * hours after disassociation, callers must continue to have
 * `kms:Decrypt` permission on the previously associated key. Some data
 * might still be encrypted with that key during this window. After this enforcement
 * window elapses, the `kms:Decrypt` requirement is lifted.
 *
 * For more information about using customer managed keys with Amazon CloudWatch,
 * see Encryption at rest
 * with customer managed keys in the Amazon CloudWatch User
 * Guide.
 */
export const disassociateDatasetKmsKey: API.OperationMethod<
  DisassociateDatasetKmsKeyInput,
  DisassociateDatasetKmsKeyOutput,
  DisassociateDatasetKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<DisassociateDatasetKmsKeyInput>,
  output: __S(16, __c2, 0) as any as S.Schema<DisassociateDatasetKmsKeyOutput>,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDatasetKmsKey",
}));

export type EnableAlarmActionsError = CommonErrors;
/**
 * Enables the actions for the specified alarms.
 */
export const enableAlarmActions: API.OperationMethod<
  EnableAlarmActionsInput,
  EnableAlarmActionsResponse,
  EnableAlarmActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<EnableAlarmActionsInput>,
  output: __S(16, __c2, 0) as any as S.Schema<EnableAlarmActionsResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAlarmActions",
}));

export type EnableInsightRulesError =
  | InvalidParameterValueException
  | LimitExceededException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Enables the specified Contributor Insights rules. When rules are enabled, they
 * immediately begin analyzing log data.
 */
export const enableInsightRules: API.OperationMethod<
  EnableInsightRulesInput,
  EnableInsightRulesOutput,
  EnableInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<EnableInsightRulesInput>,
  output: __S(122, __c15, 2) as any as S.Schema<EnableInsightRulesOutput>,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableInsightRules",
}));

export type GetAlarmMuteRuleError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves details for a specific alarm mute rule.
 *
 * This operation returns complete information about the mute rule, including its
 * configuration, status, targeted alarms, and metadata.
 *
 * The returned status indicates the current state of the mute rule:
 *
 * - **SCHEDULED**: The mute rule is configured and
 * will become active in the future
 *
 * - **ACTIVE**: The mute rule is currently muting
 * alarm actions
 *
 * - **EXPIRED**: The mute rule has passed its
 * expiration date and will no longer become active
 *
 * **Permissions**
 *
 * To retrieve details for a mute rule, you need the
 * `cloudwatch:GetAlarmMuteRule` permission on the alarm mute rule
 * resource.
 */
export const getAlarmMuteRule: API.OperationMethod<
  GetAlarmMuteRuleInput,
  GetAlarmMuteRuleOutput,
  GetAlarmMuteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<GetAlarmMuteRuleInput>,
  output: __S(305, __c38, 1) as any as S.Schema<GetAlarmMuteRuleOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlarmMuteRule",
}));

export type GetDashboardError =
  | DashboardNotFoundError
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Displays the details of the dashboard that you specify.
 *
 * To copy an existing dashboard, use `GetDashboard`, and then use the data
 * returned within `DashboardBody` as the template for the new dashboard when
 * you call `PutDashboard` to create the copy.
 *
 * You might have recently enabled an opt-in Region (Region that is disabled by default) for your account. In
 * that Region, `GetDashboard` can return an access denied error for up to 24
 * hours after you enable the Region. This delay occurs while dashboard data propagates.
 * The error does not
 * indicate a problem with your permissions. Because dashboards are global, you can call
 * `GetDashboard` in any other enabled Region, or retry after propagation
 * completes.
 */
export const getDashboard: API.OperationMethod<
  GetDashboardInput,
  GetDashboardOutput,
  GetDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<GetDashboardInput>,
  output: __S(321, __c40, 1) as any as S.Schema<GetDashboardOutput>,
  errors: [DashboardNotFoundError, InternalServiceFault, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboard",
}));

export type GetDatasetError = ResourceNotFoundException | CommonErrors;
/**
 * Returns information about the specified dataset. This includes its identifier,
 * Amazon Resource Name (ARN), and any customer managed Amazon Web Services Key
 * Management Service (Amazon Web Services KMS) key that is currently associated with
 * it.
 *
 * Only the `default` dataset is supported. The `default` dataset
 * is implicit for every account in every Region -- you can call `GetDataset`
 * for it without first creating it. If no customer managed KMS key has been associated
 * with the dataset, the response omits the `KmsKeyArn` field, indicating that
 * data is encrypted at rest using an Amazon Web Services owned key managed by
 * Amazon CloudWatch.
 *
 * To associate a customer managed KMS key with a dataset, use AssociateDatasetKmsKey. To remove the association, use DisassociateDatasetKmsKey.
 */
export const getDataset: API.OperationMethod<
  GetDatasetInput,
  GetDatasetOutput,
  GetDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<GetDatasetInput>,
  output: __S(329, __c41, 1) as any as S.Schema<GetDatasetOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataset",
}));

export type GetInsightRuleReportError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation returns the time series data collected by a Contributor Insights rule.
 * The data includes the identity and number of contributors to the log group.
 *
 * You can also optionally return one or more statistics about each data point in the
 * time series. These statistics can include the following:
 *
 * - `UniqueContributors` -- the number of unique contributors for each
 * data point.
 *
 * - `MaxContributorValue` -- the value of the top contributor for each
 * data point. The identity of the contributor might change for each data point in
 * the graph.
 *
 * If this rule aggregates by COUNT, the top contributor for each data point is
 * the contributor with the most occurrences in that period. If the rule aggregates
 * by SUM, the top contributor is the contributor with the highest sum in the log
 * field specified by the rule's `Value`, during that period.
 *
 * - `SampleCount` -- the number of data points matched by the
 * rule.
 *
 * - `Sum` -- the sum of the values from all contributors during the
 * time period represented by that data point.
 *
 * - `Minimum` -- the minimum value from a single observation during the
 * time period represented by that data point.
 *
 * - `Maximum` -- the maximum value from a single observation during the
 * time period represented by that data point.
 *
 * - `Average` -- the average value from all contributors during the
 * time period represented by that data point.
 */
export const getInsightRuleReport: API.OperationMethod<
  GetInsightRuleReportInput,
  GetInsightRuleReportOutput,
  GetInsightRuleReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<GetInsightRuleReportInput>,
  output: __S(343, __c42, 7) as any as S.Schema<GetInsightRuleReportOutput>,
  errors: [
    InvalidParameterValueException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightRuleReport",
}));

export type GetMetricDataError = InvalidNextToken | CommonErrors;
/**
 * You can use the `GetMetricData` API to retrieve CloudWatch metric
 * values. The operation can also include a CloudWatch Metrics Insights query, and
 * one or more metric math functions.
 *
 * A `GetMetricData` operation that does not include a query can retrieve
 * as many as 500 different metrics in a single request, with a total of as many as 100,800
 * data points. You can also optionally perform metric math expressions on the values of
 * the returned statistics, to create new time series that represent new insights into your
 * data. For example, using Lambda metrics, you could divide the Errors metric by the
 * Invocations metric to get an error rate time series. For more information about metric
 * math expressions, see Metric Math Syntax and Functions in the Amazon CloudWatch User
 * Guide.
 *
 * If you include a Metrics Insights query, each `GetMetricData` operation can
 * include only one query. But the same `GetMetricData` operation can also
 * retrieve other metrics. Metrics Insights queries can query the most recent two weeks of
 * metric data. For alarm condition evaluations, Metrics Insights queries can query only
 * the most recent three hours of metric data. For more information about Metrics Insights,
 * see Query your metrics with CloudWatch Metrics Insights.
 *
 * Calls to the `GetMetricData` API have a different pricing structure than
 * calls to `GetMetricStatistics`. For more information about pricing, see
 * Amazon CloudWatch
 * Pricing.
 *
 * Amazon CloudWatch retains metric data as follows:
 *
 * - Data points with a period of less than 60 seconds are available for 3
 * hours. These data points are high-resolution metrics and are available only for
 * custom metrics that have been defined with a `StorageResolution` of
 * 1.
 *
 * - Data points with a period of 60 seconds (1-minute) are available for 15
 * days.
 *
 * - Data points with a period of 300 seconds (5-minute) are available for 63
 * days.
 *
 * - Data points with a period of 3600 seconds (1 hour) are available for 455
 * days (15 months).
 *
 * Data points that are initially published with a shorter period are aggregated
 * together for long-term storage. For example, if you collect data using a period of 1
 * minute, the data remains available for 15 days with 1-minute resolution. After 15 days,
 * this data is still available, but is aggregated and retrievable only with a resolution
 * of 5 minutes. After 63 days, the data is further aggregated and is available with a
 * resolution of 1 hour.
 *
 * If you omit `Unit` in your request, all data that was collected with any
 * unit is returned, along with the corresponding units that were specified when the data
 * was reported to CloudWatch. If you specify a unit, the operation returns only data that
 * was collected with that unit specified. If you specify a unit that does not match the
 * data collected, the results of the operation are null. CloudWatch does not perform unit
 * conversions.
 *
 * Using Metrics Insights queries with metric
 * math
 *
 * You can't mix a Metric Insights query and metric math syntax in the same expression,
 * but you can reference results from a Metrics Insights query within other Metric math
 * expressions. A Metrics Insights query without a GROUP
 * BY clause returns a single time-series (TS), and can be used as input for
 * a metric math expression that expects a single time series. A Metrics Insights query
 * with a **GROUP BY** clause returns an array of time-series
 * (TS[]), and can be used as input for a metric math expression that expects an array of
 * time series.
 */
export const getMetricData: API.PaginatedOperationMethod<
  GetMetricDataInput,
  GetMetricDataOutput,
  GetMetricDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<GetMetricDataInput>,
  output: __S(350, __c43, 6) as any as S.Schema<GetMetricDataOutput>,
  errors: [InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxDatapoints",
  } as const,
})) as any;

export type GetMetricStatisticsError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Gets statistics for the specified metric.
 *
 * The maximum number of data points returned from a single call is 1,440. If you
 * request more than 1,440 data points, CloudWatch returns an error. To reduce the number
 * of data points, you can narrow the specified time range and make multiple requests
 * across adjacent time ranges, or you can increase the specified period. Data points are
 * not returned in chronological order.
 *
 * CloudWatch aggregates data points based on the length of the period that you
 * specify. For example, if you request statistics with a one-hour period, CloudWatch
 * aggregates all data points with time stamps that fall within each one-hour period.
 * Therefore, the number of values aggregated by CloudWatch is larger than the number of
 * data points returned.
 *
 * CloudWatch needs raw data points to calculate percentile statistics. If you publish
 * data using a statistic set instead, you can only retrieve percentile statistics for this
 * data if one of the following conditions is true:
 *
 * - The SampleCount value of the statistic set is 1.
 *
 * - The Min and the Max values of the statistic set are equal.
 *
 * Percentile statistics are not available for metrics when any of the metric values
 * are negative numbers.
 *
 * Amazon CloudWatch retains metric data as follows:
 *
 * - Data points with a period of less than 60 seconds are available for 3
 * hours. These data points are high-resolution metrics and are available only for
 * custom metrics that have been defined with a `StorageResolution` of
 * 1.
 *
 * - Data points with a period of 60 seconds (1-minute) are available for 15
 * days.
 *
 * - Data points with a period of 300 seconds (5-minute) are available for 63
 * days.
 *
 * - Data points with a period of 3600 seconds (1 hour) are available for 455
 * days (15 months).
 *
 * Data points that are initially published with a shorter period are aggregated
 * together for long-term storage. For example, if you collect data using a period of 1
 * minute, the data remains available for 15 days with 1-minute resolution. After 15 days,
 * this data is still available, but is aggregated and retrievable only with a resolution
 * of 5 minutes. After 63 days, the data is further aggregated and is available with a
 * resolution of 1 hour.
 *
 * CloudWatch started retaining 5-minute and 1-hour metric data as of July 9,
 * 2016.
 *
 * For information about metrics and dimensions supported by Amazon Web Services
 * services, see the Amazon CloudWatch
 * Metrics and Dimensions Reference in the Amazon CloudWatch User
 * Guide.
 */
export const getMetricStatistics: API.OperationMethod<
  GetMetricStatisticsInput,
  GetMetricStatisticsOutput,
  GetMetricStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<GetMetricStatisticsInput>,
  output: __S(364, __c45, 4) as any as S.Schema<GetMetricStatisticsOutput>,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricStatistics",
}));

export type GetMetricStreamError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the metric stream that you specify.
 */
export const getMetricStream: API.OperationMethod<
  GetMetricStreamInput,
  GetMetricStreamOutput,
  GetMetricStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<GetMetricStreamInput>,
  output: __S(369, __c46, 1) as any as S.Schema<GetMetricStreamOutput>,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricStream",
}));

export type GetMetricWidgetImageError = CommonErrors;
/**
 * You can use the `GetMetricWidgetImage` API to retrieve a snapshot graph
 * of one or more Amazon CloudWatch metrics as a bitmap image. You can then embed this
 * image into your services and products, such as wiki pages, reports, and documents. You
 * could also retrieve images regularly, such as every minute, and create your own custom
 * live dashboard.
 *
 * The graph you retrieve can include all CloudWatch metric graph features, including
 * metric math and horizontal and vertical annotations.
 *
 * There is a limit of 20 transactions per second for this API. Each
 * `GetMetricWidgetImage` action has the following limits:
 *
 * - As many as 100 metrics in the graph.
 *
 * - Up to 100 KB uncompressed payload.
 */
export const getMetricWidgetImage: API.OperationMethod<
  GetMetricWidgetImageInput,
  GetMetricWidgetImageOutput,
  GetMetricWidgetImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<GetMetricWidgetImageInput>,
  output: __S(393, __c49, 1) as any as S.Schema<GetMetricWidgetImageOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricWidgetImage",
}));

export type GetOTelEnrichmentError = CommonErrors;
/**
 * Returns the current status of vended metric enrichment for the account, including
 * whether CloudWatch vended metrics are enriched with resource ARN and resource tag labels
 * and queryable using PromQL. For the list of supported resources, see Supported Amazon Web Services infrastructure metrics.
 */
export const getOTelEnrichment: API.OperationMethod<
  GetOTelEnrichmentInput,
  GetOTelEnrichmentOutput,
  GetOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<GetOTelEnrichmentInput>,
  output: __S(401, __c50, 1) as any as S.Schema<GetOTelEnrichmentOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOTelEnrichment",
}));

export type GetResourceMetricsConfigurationError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves the current resource metrics configuration for an Amazon Web Services
 * resource. The response includes the resource ARN, any metric selections, and the times
 * at which the configuration was created and last updated.
 *
 * This operation returns a `ResourceNotFoundException` if no resource metrics
 * configuration exists for the specified resource ARN. To create a configuration, use CreateResourceMetricsConfiguration.
 *
 * To retrieve a resource metrics configuration, you must have the
 * `cloudwatch:GetResourceMetricsConfiguration` permission. For information
 * about scoping this permission to specific resources, see Condition keys for resource metrics configuration access in the
 * *Amazon CloudWatch User Guide*.
 */
export const getResourceMetricsConfiguration: API.OperationMethod<
  GetResourceMetricsConfigurationInput,
  GetResourceMetricsConfigurationOutput,
  GetResourceMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<GetResourceMetricsConfigurationInput>,
  output: __S(43, __c5, 3) as any as S.Schema<GetResourceMetricsConfigurationOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceMetricsConfiguration",
}));

export type ListAlarmMuteRulesError = InvalidNextToken | ResourceNotFoundException | CommonErrors;
/**
 * Lists alarm mute rules in your Amazon Web Services account and region.
 *
 * You can filter the results by alarm name to find all mute rules targeting a specific
 * alarm, or by status to find rules that are scheduled, active, or expired.
 *
 * This operation supports pagination for accounts with many mute rules. Use the
 * `MaxRecords` and `NextToken` parameters to retrieve results in
 * multiple calls.
 *
 * **Permissions**
 *
 * To list mute rules, you need the `cloudwatch:ListAlarmMuteRules`
 * permission.
 */
export const listAlarmMuteRules: API.PaginatedOperationMethod<
  ListAlarmMuteRulesInput,
  ListAlarmMuteRulesOutput,
  ListAlarmMuteRulesError,
  Credentials | HttpClient.HttpClient,
  AlarmMuteRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<ListAlarmMuteRulesInput>,
  output: __S(419, __c52, 3) as any as S.Schema<ListAlarmMuteRulesOutput>,
  errors: [InvalidNextToken, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlarmMuteRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AlarmMuteRuleSummaries",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ListDashboardsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of the dashboards for your account. If you include
 * `DashboardNamePrefix`, only those dashboards with names starting with the
 * prefix are listed. Otherwise, all dashboards in your account are listed.
 *
 * `ListDashboards` returns up to 1000 results on one page. If there are
 * more than 1000 dashboards, you can call `ListDashboards` again and include
 * the value you received for `NextToken` in the first call, to receive the next
 * 1000 results.
 *
 * You might have recently enabled an opt-in Region (Region that is disabled by default) for your account. In
 * that Region, `ListDashboards` can return an access denied error for up to 24
 * hours after you enable the Region. This delay occurs while dashboard data propagates.
 * The error does not
 * indicate a problem with your permissions. Because dashboards are global, you can call
 * `ListDashboards` in any other enabled Region, or retry after propagation
 * completes.
 */
export const listDashboards: API.PaginatedOperationMethod<
  ListDashboardsInput,
  ListDashboardsOutput,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(424, __c53, 0) as any as S.Schema<ListDashboardsInput>,
  output: __S(427, __c53, 3) as any as S.Schema<ListDashboardsOutput>,
  errors: [InternalServiceFault, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DashboardEntries",
  } as const,
})) as any;

export type ListManagedInsightRulesError =
  | InvalidNextToken
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Returns a list that contains the number of managed Contributor Insights rules in your
 * account.
 */
export const listManagedInsightRules: API.PaginatedOperationMethod<
  ListManagedInsightRulesInput,
  ListManagedInsightRulesOutput,
  ListManagedInsightRulesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<ListManagedInsightRulesInput>,
  output: __S(436, __c54, 4) as any as S.Schema<ListManagedInsightRulesOutput>,
  errors: [InvalidNextToken, InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedInsightRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMetricsError = InternalServiceFault | InvalidParameterValueException | CommonErrors;
/**
 * List the specified metrics. You can use the returned metrics with GetMetricData or GetMetricStatistics to get statistical data.
 *
 * Up to 500 results are returned for any one call. To retrieve additional results,
 * use the returned token with subsequent calls.
 *
 * After you create a metric, allow up to 15 minutes for the metric to appear. To see
 * metric statistics sooner, use GetMetricData or GetMetricStatistics.
 *
 * If you are using CloudWatch cross-account observability, you can use this
 * operation in a monitoring account and view metrics from the linked source accounts. For
 * more information, see CloudWatch cross-account observability.
 *
 * `ListMetrics` doesn't return information about metrics if those metrics
 * haven't reported data in the past two weeks. To retrieve those metrics, use GetMetricData or GetMetricStatistics.
 */
export const listMetrics: API.PaginatedOperationMethod<
  ListMetricsInput,
  ListMetricsOutput,
  ListMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(440, __c55, 0) as any as S.Schema<ListMetricsInput>,
  output: __S(442, __c55, 2) as any as S.Schema<ListMetricsOutput>,
  errors: [InternalServiceFault, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetrics",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListMetricStreamsError =
  | InternalServiceFault
  | InvalidNextToken
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Returns a list of metric streams in this account.
 */
export const listMetricStreams: API.PaginatedOperationMethod<
  ListMetricStreamsInput,
  ListMetricStreamsOutput,
  ListMetricStreamsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<ListMetricStreamsInput>,
  output: __S(451, __c56, 3) as any as S.Schema<ListMetricStreamsOutput>,
  errors: [
    InternalServiceFault,
    InvalidNextToken,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceFault
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Displays the tags associated with a CloudWatch resource. Currently, alarms,
 * dashboards, metric streams and Contributor Insights rules support tagging.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(457, __c57, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [InternalServiceFault, InvalidParameterValueException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutAlarmMuteRuleError = LimitExceededFault | CommonErrors;
/**
 * Creates or updates an alarm mute rule.
 *
 * Alarm mute rules automatically mute alarm actions during predefined time windows. When
 * a mute rule is active, targeted alarms continue to evaluate metrics and transition
 * between states, but their configured actions (such as Amazon SNS notifications
 * or Auto Scaling actions) are muted.
 *
 * You can create mute rules with recurring schedules using `cron` expressions
 * or one-time mute windows using `at` expressions. Each mute rule can target up
 * to 100 specific alarms by name.
 *
 * If you specify a rule name that already exists, this operation updates the existing
 * rule with the new configuration.
 *
 * **Permissions**
 *
 * To create or update a mute rule, you must have the
 * `cloudwatch:PutAlarmMuteRule` permission on two types of resources: the
 * alarm mute rule resource itself, and each alarm that the rule targets.
 *
 * For example, If you want to allow a user to create mute rules that target only
 * specific alarms named "WebServerCPUAlarm" and "DatabaseConnectionAlarm", you would
 * create an IAM policy with one statement granting
 * `cloudwatch:PutAlarmMuteRule` on the alarm mute rule resource
 * (`arn:aws:cloudwatch:[REGION]:123456789012:alarm-mute-rule:*`), and
 * another statement granting `cloudwatch:PutAlarmMuteRule` on the targeted
 * alarm resources
 * (`arn:aws:cloudwatch:[REGION]:123456789012:alarm:WebServerCPUAlarm` and
 * `arn:aws:cloudwatch:[REGION]:123456789012:alarm:DatabaseConnectionAlarm`).
 *
 * You can also use IAM policy conditions to allow targeting alarms based on resource
 * tags. For example, you can restrict users to create/update mute rules to only target
 * alarms that have a specific tag key-value pair, such as `Team=TeamA`.
 */
export const putAlarmMuteRule: API.OperationMethod<
  PutAlarmMuteRuleInput,
  PutAlarmMuteRuleResponse,
  PutAlarmMuteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<PutAlarmMuteRuleInput>,
  output: __S(16, __c2, 0) as any as S.Schema<PutAlarmMuteRuleResponse>,
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlarmMuteRule",
}));

export type PutAnomalyDetectorError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates an anomaly detection model for a CloudWatch metric. You can use the model to
 * display a band of expected normal values when the metric is graphed.
 *
 * If you have enabled unified cross-account observability, and this account is a
 * monitoring account, the metric can be in the same account or a source account. You can
 * specify the account ID in the object you specify in the
 * `SingleMetricAnomalyDetector` parameter.
 *
 * For more information, see CloudWatch Anomaly Detection.
 */
export const putAnomalyDetector: API.OperationMethod<
  PutAnomalyDetectorInput,
  PutAnomalyDetectorOutput,
  PutAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<PutAnomalyDetectorInput>,
  output: __S(473, __c59, 1) as any as S.Schema<PutAnomalyDetectorOutput>,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAnomalyDetector",
}));

export type PutCompositeAlarmError = LimitExceededFault | CommonErrors;
/**
 * Creates or updates a *composite alarm*. When you create a composite
 * alarm, you specify a rule expression for the alarm that takes into account the alarm
 * states of other alarms that you have created. The composite alarm goes into ALARM state
 * only if all conditions of the rule are met.
 *
 * The alarms specified in a composite alarm's rule expression can include metric alarms
 * and other composite alarms. The rule expression of a composite alarm can include as many
 * as 100 underlying alarms. Any single alarm can be included in the rule expressions of as
 * many as 150 composite alarms.
 *
 * Using composite alarms can reduce alarm noise. You can create multiple metric alarms,
 * and also create a composite alarm and set up alerts only for the composite alarm. For
 * example, you could create a composite alarm that goes into ALARM state only when more
 * than one of the underlying metric alarms are in ALARM state.
 *
 * Composite alarms can take the following actions:
 *
 * - Notify Amazon SNS topics.
 *
 * - Invoke Lambda functions.
 *
 * - Create OpsItems in Systems Manager Ops Center.
 *
 * - Create incidents in Systems Manager Incident Manager.
 *
 * It is possible to create a loop or cycle of composite alarms, where composite
 * alarm A depends on composite alarm B, and composite alarm B also depends on
 * composite alarm A. In this scenario, you can't delete any composite alarm that is
 * part of the cycle because there is always still a composite alarm that depends on
 * that alarm that you want to delete.
 *
 * To get out of such a situation, you must break the cycle by changing the rule of
 * one of the composite alarms in the cycle to remove a dependency that creates the
 * cycle. The simplest change to make to break a cycle is to change the
 * `AlarmRule` of one of the alarms to `false`.
 *
 * Additionally, the evaluation of composite alarms stops if CloudWatch detects a
 * cycle in the evaluation path.
 *
 * When this operation creates an alarm, the alarm state is immediately set to
 * `INSUFFICIENT_DATA`. The alarm is then evaluated and its state is set
 * appropriately. Any actions associated with the new state are then executed. For a
 * composite alarm, this initial time after creation is the only time that the alarm can be
 * in `INSUFFICIENT_DATA` state.
 *
 * When you update an existing alarm, its state is left unchanged, but the update
 * completely overwrites the previous configuration of the alarm.
 *
 * To use this operation, you must be signed on with the
 * `cloudwatch:PutCompositeAlarm` permission that is scoped to
 * `*`. You can't create a composite alarms if your
 * `cloudwatch:PutCompositeAlarm` permission has a narrower scope.
 *
 * If you are an IAM user, you must have
 * `iam:CreateServiceLinkedRole` to create a composite alarm that has
 * Systems Manager OpsItem actions.
 */
export const putCompositeAlarm: API.OperationMethod<
  PutCompositeAlarmInput,
  PutCompositeAlarmResponse,
  PutCompositeAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<PutCompositeAlarmInput>,
  output: __S(16, __c2, 0) as any as S.Schema<PutCompositeAlarmResponse>,
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCompositeAlarm",
}));

export type PutDashboardError =
  | ConflictException
  | DashboardInvalidInputError
  | InternalServiceFault
  | CommonErrors;
/**
 * Creates a dashboard if it does not already exist, or updates an existing dashboard.
 * If you update a dashboard, the entire contents are replaced with what you specify
 * here.
 *
 * All dashboards in your account are global, not region-specific.
 *
 * A simple way to create a dashboard using `PutDashboard` is to copy an
 * existing dashboard. To copy an existing dashboard using the console, you can load the
 * dashboard and then use the View/edit source command in the Actions menu to display the
 * JSON block for that dashboard. Another way to copy a dashboard is to use
 * `GetDashboard`, and then use the data returned within
 * `DashboardBody` as the template for the new dashboard when you call
 * `PutDashboard`.
 *
 * When you create a dashboard with `PutDashboard`, a good practice is to
 * add a text widget at the top of the dashboard with a message that the dashboard was
 * created by script and should not be changed in the console. This message could also
 * point console users to the location of the `DashboardBody` script or the
 * CloudFormation template used to create the dashboard.
 */
export const putDashboard: API.OperationMethod<
  PutDashboardInput,
  PutDashboardOutput,
  PutDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<PutDashboardInput>,
  output: __S(489, __c61, 1) as any as S.Schema<PutDashboardOutput>,
  errors: [ConflictException, DashboardInvalidInputError, InternalServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDashboard",
}));

export type PutInsightRuleError =
  | InvalidParameterValueException
  | LimitExceededException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates a Contributor Insights rule. Rules evaluate log events in a CloudWatch Logs
 * log group, enabling you to find contributor data for the log events in that log group.
 * For more information, see Using Contributor
 * Insights to Analyze High-Cardinality Data.
 *
 * If you create a rule, delete it, and then re-create it with the same name, historical
 * data from the first time the rule was created might not be available.
 */
export const putInsightRule: API.OperationMethod<
  PutInsightRuleInput,
  PutInsightRuleOutput,
  PutInsightRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c62, 0) as any as S.Schema<PutInsightRuleInput>,
  output: __S(16, __c2, 0) as any as S.Schema<PutInsightRuleOutput>,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInsightRule",
}));

export type PutLogAlarmError = LimitExceededFault | ResourceConflict | CommonErrors;
/**
 * Creates or updates a log alarm. A log alarm evaluates the results of a CloudWatch Logs scheduled query against the configured threshold and comparison operator to determine its state.
 *
 * When you create a log alarm, the operation creates a service-managed CloudWatch Logs scheduled query that runs the query string you provide on the schedule you configure. Each scheduled query execution returns one or more aggregated values determined by the `AggregationExpression`, and each aggregated value is compared against the alarm `Threshold` to determine the alarm state. The alarm uses M-out-of-N evaluation: if `QueryResultsToAlarm` out of the most recent `QueryResultsToEvaluate` query results breach the threshold, the alarm transitions to `ALARM`.
 *
 * Log alarms support the alarm states (`OK`, `ALARM`, `INSUFFICIENT_DATA`). Configure transition actions using `OKActions`, `AlarmActions`, and `InsufficientDataActions`.
 *
 * If you call this operation with the name of an existing log alarm, the operation replaces the previous configuration of that alarm.
 *
 * **Permissions**
 *
 * To create or update a log alarm, you must have the `cloudwatch:PutLogAlarm` permission. The IAM role specified in `ScheduledQueryRoleARN` must grant the CloudWatch Alarms service permission to execute scheduled queries on the specified log groups. If you set `ActionLogLineCount`, the role specified in `ActionLogLineRoleArn` must grant permission to retrieve log events for inclusion in alarm notifications.
 */
export const putLogAlarm: API.OperationMethod<
  PutLogAlarmInput,
  PutLogAlarmResponse,
  PutLogAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<PutLogAlarmInput>,
  output: __S(16, __c2, 0) as any as S.Schema<PutLogAlarmResponse>,
  errors: [LimitExceededFault, ResourceConflict],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLogAlarm",
}));

export type PutManagedInsightRulesError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates a managed Contributor Insights rule for a specified Amazon Web Services
 * resource. When you enable a managed rule, you create a Contributor Insights rule that
 * collects data from Amazon Web Services services. You cannot edit these rules with
 * `PutInsightRule`. The rules can be enabled, disabled, and deleted using
 * `EnableInsightRules`, `DisableInsightRules`, and
 * `DeleteInsightRules`. If a previously created managed rule is currently
 * disabled, a subsequent call to this API will re-enable it. Use
 * `ListManagedInsightRules` to describe all available rules.
 */
export const putManagedInsightRules: API.OperationMethod<
  PutManagedInsightRulesInput,
  PutManagedInsightRulesOutput,
  PutManagedInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(514, __c64, 2) as any as S.Schema<PutManagedInsightRulesInput>,
  output: __S(122, __c15, 2) as any as S.Schema<PutManagedInsightRulesOutput>,
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutManagedInsightRules",
}));

export type PutMetricAlarmError = LimitExceededFault | CommonErrors;
/**
 * Creates or updates an alarm and associates it with the specified metric, metric
 * math expression, anomaly detection model, Metrics Insights query, or PromQL query. For
 * more information about using a Metrics Insights query for an alarm, see Create
 * alarms on Metrics Insights queries.
 *
 * Alarms based on anomaly detection models cannot have Auto Scaling actions.
 *
 * When this operation creates an alarm, the alarm state is immediately set to
 * `INSUFFICIENT_DATA`. For PromQL alarms, the alarm state is instead
 * immediately set to `OK`. The alarm is then evaluated and its state is set
 * appropriately. Any actions associated with the new state are then executed.
 *
 * When you update an existing alarm, its state is left unchanged, but the update
 * completely overwrites the previous configuration of the alarm.
 *
 * If you are an IAM user, you must have Amazon EC2 permissions for
 * some alarm operations:
 *
 * - The `iam:CreateServiceLinkedRole` permission for all alarms with
 * EC2 actions
 *
 * - The `iam:CreateServiceLinkedRole` permissions to create an alarm
 * with Systems Manager OpsItem or response plan actions.
 *
 * The first time you create an alarm in the Amazon Web Services Management Console, the CLI, or by using the PutMetricAlarm API, CloudWatch creates the necessary
 * service-linked role for you. The service-linked roles are called
 * `AWSServiceRoleForCloudWatchEvents` and
 * `AWSServiceRoleForCloudWatchAlarms_ActionSSM`. For more information, see
 * Amazon Web Services service-linked role.
 *
 * Each `PutMetricAlarm` action has a maximum uncompressed payload of 120
 * KB.
 *
 * **Cross-account alarms**
 *
 * You can set an alarm on metrics in the current account, or in another account. To
 * create a cross-account alarm that watches a metric in a different account, you must have
 * completed the following pre-requisites:
 *
 * - The account where the metrics are located (the sharing
 * account) must already have a sharing role named **CloudWatch-CrossAccountSharingRole**. If it does not
 * already have this role, you must create it using the instructions in **Set up a sharing account** in Cross-account cross-Region CloudWatch console. The policy
 * for that role must grant access to the ID of the account where you are creating
 * the alarm.
 *
 * - The account where you are creating the alarm (the monitoring
 * account) must already have a service-linked role named **AWSServiceRoleForCloudWatchCrossAccount** to allow
 * CloudWatch to assume the sharing role in the sharing account. If it
 * does not, you must create it following the directions in **Set up a monitoring account** in Cross-account cross-Region CloudWatch console.
 */
export const putMetricAlarm: API.OperationMethod<
  PutMetricAlarmInput,
  PutMetricAlarmResponse,
  PutMetricAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<PutMetricAlarmInput>,
  output: __S(16, __c2, 0) as any as S.Schema<PutMetricAlarmResponse>,
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricAlarm",
}));

export type PutMetricDataError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Publishes metric data to Amazon CloudWatch. CloudWatch associates the data with the
 * specified metric. If the specified metric does not exist, CloudWatch creates the metric.
 * When CloudWatch creates a metric, it can take up to fifteen minutes for the metric to
 * appear in calls to ListMetrics.
 *
 * You can publish metrics with associated entity data (so that related telemetry can be
 * found and viewed together), or publish metric data by itself. To send entity data with
 * your metrics, use the `EntityMetricData` parameter. To send metrics without
 * entity data, use the `MetricData` parameter. The
 * `EntityMetricData` structure includes `MetricData` structures
 * for the metric data.
 *
 * You can publish either individual values in the `Value` field, or arrays of
 * values and the number of times each value occurred during the period by using the
 * `Values` and `Counts` fields in the `MetricData`
 * structure. Using the `Values` and `Counts` method enables you to
 * publish up to 150 values per metric with one `PutMetricData` request, and
 * supports retrieving percentile statistics on this data.
 *
 * Each `PutMetricData` request is limited to 1 MB in size for HTTP POST
 * requests. You can send a payload compressed by gzip. Each request is also limited to no
 * more than 1000 different metrics (across both the `MetricData` and
 * `EntityMetricData` properties).
 *
 * Although the `Value` parameter accepts numbers of type `Double`,
 * CloudWatch rejects values that are either too small or too large. Values must be in the
 * range of -2^360 to 2^360. In addition, special values (for example, NaN, +Infinity,
 * -Infinity) are not supported.
 *
 * You can use up to 30 dimensions per metric to further clarify what data the metric
 * collects. Each dimension consists of a Name and Value pair. For more information about
 * specifying dimensions, see Publishing
 * Metrics in the *Amazon CloudWatch User Guide*.
 *
 * You specify the time stamp to be associated with each data point. You can specify time
 * stamps that are as much as two weeks before the current date, and as much as 2 hours
 * after the current day and time.
 *
 * Data points with time stamps from 24 hours ago or longer can take at least 48 hours to
 * become available for GetMetricData or GetMetricStatistics from the time they are submitted. Data points with time
 * stamps between 3 and 24 hours ago can take as much as 2 hours to become available for
 * GetMetricData or GetMetricStatistics.
 *
 * CloudWatch needs raw data points to calculate percentile statistics. If you publish
 * data using a statistic set instead, you can only retrieve percentile statistics for this
 * data if one of the following conditions is true:
 *
 * - The `SampleCount` value of the statistic set is 1 and
 * `Min`, `Max`, and `Sum` are all
 * equal.
 *
 * - The `Min` and `Max` are equal, and `Sum`
 * is equal to `Min` multiplied by `SampleCount`.
 */
export const putMetricData: API.OperationMethod<
  PutMetricDataInput,
  PutMetricDataResponse,
  PutMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(534, __c66, 6) as any as S.Schema<PutMetricDataInput>,
  output: __S(16, __c2, 0) as any as S.Schema<PutMetricDataResponse>,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricData",
}));

export type PutMetricStreamError =
  | ConcurrentModificationException
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates or updates a metric stream. Metric streams can automatically stream CloudWatch
 * metrics to Amazon Web Services destinations, including Amazon S3, and to many third-party
 * solutions.
 *
 * For more information, see Using
 * Metric Streams.
 *
 * To create a metric stream, you must be signed in to an account that has the
 * `iam:PassRole` permission and either the
 * `CloudWatchFullAccess` policy or the
 * `cloudwatch:PutMetricStream` permission.
 *
 * When you create or update a metric stream, you choose one of the following:
 *
 * - Stream metrics from all metric namespaces in the account.
 *
 * - Stream metrics from all metric namespaces in the account, except for the
 * namespaces that you list in `ExcludeFilters`.
 *
 * - Stream metrics from only the metric namespaces that you list in
 * `IncludeFilters`.
 *
 * By default, a metric stream always sends the `MAX`, `MIN`,
 * `SUM`, and `SAMPLECOUNT` statistics for each metric that is
 * streamed. You can use the `StatisticsConfigurations` parameter to have the
 * metric stream send additional statistics in the stream. Streaming additional statistics
 * incurs additional costs. For more information, see Amazon CloudWatch Pricing.
 *
 * When you use `PutMetricStream` to create a new metric stream, the stream is
 * created in the `running` state. If you use it to update an existing stream,
 * the state of the stream is not changed.
 *
 * If you are using CloudWatch cross-account observability and you create a metric
 * stream in a monitoring account, you can choose whether to include metrics from source
 * accounts in the stream. For more information, see CloudWatch cross-account observability.
 */
export const putMetricStream: API.OperationMethod<
  PutMetricStreamInput,
  PutMetricStreamOutput,
  PutMetricStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<PutMetricStreamInput>,
  output: __S(537, __c67, 1) as any as S.Schema<PutMetricStreamOutput>,
  errors: [
    ConcurrentModificationException,
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricStream",
}));

export type SetAlarmStateError = InvalidFormatFault | ResourceNotFound | CommonErrors;
/**
 * Temporarily sets the state of an alarm for testing purposes. When the updated state
 * differs from the previous value, the action configured for the appropriate state is
 * invoked. For example, if your alarm is configured to send an Amazon SNS message when an
 * alarm is triggered, temporarily changing the alarm state to `ALARM` sends an
 * SNS message.
 *
 * Metric alarms returns to their actual state quickly, often within seconds. Because
 * the metric alarm state change happens quickly, it is typically only visible in the
 * alarm's **History** tab in the Amazon CloudWatch console or
 * through DescribeAlarmHistory.
 *
 * If you use `SetAlarmState` on a composite alarm, the composite alarm is
 * not guaranteed to return to its actual state. It returns to its actual state only once
 * any of its children alarms change state. It is also reevaluated if you update its
 * configuration.
 *
 * If an alarm triggers EC2 Auto Scaling policies or application Auto Scaling
 * policies, you must include information in the `StateReasonData` parameter to
 * enable the policy to take the correct action.
 */
export const setAlarmState: API.OperationMethod<
  SetAlarmStateInput,
  SetAlarmStateResponse,
  SetAlarmStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<SetAlarmStateInput>,
  output: __S(16, __c2, 0) as any as S.Schema<SetAlarmStateResponse>,
  errors: [InvalidFormatFault, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetAlarmState",
}));

export type StartMetricStreamsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Starts the streaming of metrics for one or more of your metric streams.
 */
export const startMetricStreams: API.OperationMethod<
  StartMetricStreamsInput,
  StartMetricStreamsOutput,
  StartMetricStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<StartMetricStreamsInput>,
  output: __S(16, __c2, 0) as any as S.Schema<StartMetricStreamsOutput>,
  errors: [InternalServiceFault, InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetricStreams",
}));

export type StartOTelEnrichmentError = ValidationException | CommonErrors;
/**
 * Enables enrichment and PromQL access for CloudWatch vended metrics for supported Amazon Web Services resources in the account. Once enabled,
 * metrics that contain a resource identifier dimension (for example, EC2
 * `CPUUtilization` with an `InstanceId` dimension) are enriched
 * with resource ARN and resource tag labels and become queryable using PromQL.
 *
 * Before calling this operation, you must enable resource tags on telemetry for your
 * account. For more information, see Enable
 * resource tags on telemetry.
 *
 * Optionally, `IncludeFilters` and `ExcludeFilters` limit
 * enrichment to a subset of the account's metrics. These filters are stored only when this
 * operation starts enrichment. Calling `StartOTelEnrichment` for an account
 * where enrichment is already running has no effect and does not modify the filters that
 * are applied. To change them, use UpdateOTelEnrichment.
 */
export const startOTelEnrichment: API.OperationMethod<
  StartOTelEnrichmentInput,
  StartOTelEnrichmentOutput,
  StartOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<StartOTelEnrichmentInput>,
  output: __S(568, __c71, 0) as any as S.Schema<StartOTelEnrichmentOutput>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOTelEnrichment",
}));

export type StopMetricStreamsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Stops the streaming of metrics for one or more of your metric streams.
 */
export const stopMetricStreams: API.OperationMethod<
  StopMetricStreamsInput,
  StopMetricStreamsOutput,
  StopMetricStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<StopMetricStreamsInput>,
  output: __S(16, __c2, 0) as any as S.Schema<StopMetricStreamsOutput>,
  errors: [InternalServiceFault, InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMetricStreams",
}));

export type StopOTelEnrichmentError = CommonErrors;
/**
 * Disables enrichment and PromQL access for CloudWatch vended metrics for supported Amazon Web Services resources in the account. After disabling,
 * these metrics are no longer enriched with resource ARN and resource tag labels, and
 * cannot be queried using PromQL.
 */
export const stopOTelEnrichment: API.OperationMethod<
  StopOTelEnrichmentInput,
  StopOTelEnrichmentOutput,
  StopOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(584, __c73, 0) as any as S.Schema<StopOTelEnrichmentInput>,
  output: __S(16, __c2, 0) as any as S.Schema<StopOTelEnrichmentOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopOTelEnrichment",
}));

export type TagResourceError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceFault
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified CloudWatch resource.
 * Currently, the only CloudWatch resources that can be tagged are alarms, dashboards,
 * metric streams and Contributor Insights rules.
 *
 * Tags can help you organize and categorize your resources. You can also use them to
 * scope user permissions by granting a user permission to access or change only resources
 * with certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted
 * strictly as strings of characters.
 *
 * You can use the `TagResource` action with an alarm that already has tags.
 * If you specify a new tag key for the alarm, this tag is appended to the list of tags
 * associated with the alarm. If you specify a tag key that is already associated with the
 * alarm, the new tag value that you specify replaces the previous value for that
 * tag.
 *
 * You can associate as many as 50 tags with a CloudWatch resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<TagResourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    ConcurrentModificationException,
    ConflictException,
    InternalServiceFault,
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceFault
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource. Currently, alarms, dashboards,
 * metric streams and Contributor Insights rules support tagging.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(16, __c2, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    ConcurrentModificationException,
    ConflictException,
    InternalServiceFault,
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateOTelEnrichmentError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Replaces the filters that determine which CloudWatch vended metrics are enriched
 * with resource ARN and resource tag labels for the account. Enrichment must already be
 * running for the account. If it is not, this operation returns a
 * `ResourceNotFoundException`. To start enrichment, use StartOTelEnrichment.
 *
 * The filters in the request completely replace the stored filters; they are not
 * merged with them. `IncludeFilters` and `ExcludeFilters` are
 * replaced as a pair, so a request that specifies only `IncludeFilters` also
 * clears the stored `ExcludeFilters`, and a request that specifies neither
 * clears both.
 */
export const updateOTelEnrichment: API.OperationMethod<
  UpdateOTelEnrichmentInput,
  UpdateOTelEnrichmentOutput,
  UpdateOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<UpdateOTelEnrichmentInput>,
  output: __S(568, __c71, 0) as any as S.Schema<UpdateOTelEnrichmentOutput>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOTelEnrichment",
}));

export type UpdateResourceMetricsConfigurationError = ResourceNotFoundException | CommonErrors;
/**
 * Updates the resource metrics configuration for an Amazon Web Services resource. The
 * `MetricSelections` value that you provide replaces any existing metric
 * selections for the resource; it is not merged with them.
 *
 * If you omit `MetricSelections`, Amazon CloudWatch removes any existing
 * metric selection filter and collects all available detailed metrics for the
 * resource.
 *
 * This operation returns a `ResourceNotFoundException` if no resource metrics
 * configuration exists for the specified resource ARN. To create a configuration, use
 * CreateResourceMetricsConfiguration.
 *
 * To update a resource metrics configuration, you must have the
 * `cloudwatch:UpdateResourceMetricsConfiguration` permission. For information about scoping
 * this permission to specific resources, see Condition keys for resource metrics configuration access in the
 * *Amazon CloudWatch User Guide*.
 */
export const updateResourceMetricsConfiguration: API.OperationMethod<
  UpdateResourceMetricsConfigurationInput,
  UpdateResourceMetricsConfigurationOutput,
  UpdateResourceMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(616, __c77, 0) as any as S.Schema<UpdateResourceMetricsConfigurationInput>,
  output: __S(43, __c5, 3) as any as S.Schema<UpdateResourceMetricsConfigurationOutput>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceMetricsConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DataPath: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "DashboardValidationMessage" });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatasetIdentifier: S.optional(S.String), KmsKeyArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateDatasetKmsKeyInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AssociateDatasetKmsKeyOutput",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          MetricSelections: S.optional(__S(41, __c5, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResourceMetricsConfigurationInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IncludeMetrics: S.optional(__S(32, __c4, 0)) })).annotate({
        identifier: "ResourceMetricSelection",
      });
    case 1:
      return S.Array(__S(40, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MetricSelections: S.optional(__S(41, __c5, 1)),
        }),
      ).annotate({ identifier: "ResourceMetricsConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ResourceMetricsConfiguration: S.optional(__S(42, __c5, 2)) }).pipe(ns),
      ).annotate({ identifier: "CreateResourceMetricsConfigurationOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlarmMuteRuleName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAlarmMuteRuleInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlarmNames: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAlarmsInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AnomalyDetectorId: S.optional(S.String),
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Stat: S.optional(S.String),
          SingleMetricAnomalyDetector: S.optional(__S(96, __c12, 0)),
          MetricMathAnomalyDetector: S.optional(__S(97, __c12, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteAnomalyDetectorInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Dimension" });
    case 1:
      return S.Array(__S(72, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
        }),
      ).annotate({ identifier: "Metric" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Metric: S.optional(__S(80, __c10, 0)),
          Period: S.optional(S.Number),
          Stat: S.optional(S.String),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricStat" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          MetricStat: S.optional(__S(88, __c11, 0)),
          Expression: S.optional(S.String),
          Label: S.optional(S.String),
          ReturnData: S.optional(S.Boolean),
          Period: S.optional(S.Number),
          AccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricDataQuery" });
    case 2:
      return S.Array(__S(89, __c11, 1));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Stat: S.optional(S.String),
        }),
      ).annotate({ identifier: "SingleMetricAnomalyDetector" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MetricDataQueries: S.optional(__S(90, __c11, 2)) }),
      ).annotate({ identifier: "MetricMathAnomalyDetector" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DashboardNames: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDashboardsInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleNames: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteInsightRulesInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FailureResource: S.optional(S.String),
          ExceptionType: S.optional(S.String),
          FailureCode: S.optional(S.String),
          FailureDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "PartialFailure" });
    case 1:
      return S.Array(__S(120, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Failures: S.optional(__S(121, __c15, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeleteInsightRulesOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteMetricStreamInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourceMetricsConfigurationInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlarmName: S.optional(S.String), NextToken: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAlarmContributorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContributorId: S.optional(S.String),
          ContributorAttributes: S.optional(__S(152, __c19, 0)),
          StateReason: S.optional(S.String),
          StateTransitionedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AlarmContributor" });
    case 2:
      return S.Array(__S(145, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AlarmContributors: S.optional(__S(146, __c18, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAlarmContributorsOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          AlarmContributorId: S.optional(S.String),
          AlarmTypes: S.optional(__S(168, __c21, 0)),
          HistoryItemType: S.optional(S.String),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MaxRecords: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ScanBy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAlarmHistoryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          AlarmContributorId: S.optional(S.String),
          AlarmType: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          HistoryItemType: S.optional(S.String),
          HistorySummary: S.optional(S.String),
          HistoryData: S.optional(S.String),
          AlarmContributorAttributes: S.optional(__S(152, __c19, 0)),
        }),
      ).annotate({ identifier: "AlarmHistoryItem" });
    case 2:
      return S.Array(__S(161, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AlarmHistoryItems: S.optional(__S(162, __c20, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAlarmHistoryOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlarmNames: S.optional(__S(32, __c4, 0)),
          AlarmNamePrefix: S.optional(S.String),
          AlarmTypes: S.optional(__S(168, __c21, 0)),
          ChildrenOfAlarmName: S.optional(S.String),
          ParentsOfAlarmName: S.optional(S.String),
          StateValue: S.optional(S.String),
          ActionPrefix: S.optional(S.String),
          MaxRecords: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAlarmsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ActionsEnabled: S.optional(S.Boolean),
          AlarmActions: S.optional(__S(32, __c4, 0)),
          AlarmArn: S.optional(S.String),
          AlarmConfigurationUpdatedTimestamp: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          AlarmDescription: S.optional(S.String),
          AlarmName: S.optional(S.String),
          AlarmRule: S.optional(S.String),
          InsufficientDataActions: S.optional(__S(32, __c4, 0)),
          OKActions: S.optional(__S(32, __c4, 0)),
          StateReason: S.optional(S.String),
          StateReasonData: S.optional(S.String),
          StateUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StateValue: S.optional(S.String),
          StateTransitionedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ActionsSuppressedBy: S.optional(S.String),
          ActionsSuppressedReason: S.optional(S.String),
          ActionsSuppressor: S.optional(S.String),
          ActionsSuppressorWaitPeriod: S.optional(S.Number),
          ActionsSuppressorExtensionPeriod: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CompositeAlarm" });
    case 2:
      return S.Array(__S(177, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          AlarmArn: S.optional(S.String),
          AlarmDescription: S.optional(S.String),
          AlarmConfigurationUpdatedTimestamp: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          ActionsEnabled: S.optional(S.Boolean),
          OKActions: S.optional(__S(32, __c4, 0)),
          AlarmActions: S.optional(__S(32, __c4, 0)),
          InsufficientDataActions: S.optional(__S(32, __c4, 0)),
          StateValue: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonData: S.optional(S.String),
          StateUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ScheduledQueryConfiguration: S.optional(__S(225, __c28, 1)),
          QueryResultsToEvaluate: S.optional(S.Number),
          QueryResultsToAlarm: S.optional(S.Number),
          Threshold: S.optional(S.Number),
          ComparisonOperator: S.optional(S.String),
          TreatMissingData: S.optional(S.String),
          StateTransitionedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationState: S.optional(S.String),
          ActionLogLineCount: S.optional(S.Number),
          ActionLogLineRoleArn: S.optional(S.String),
          WarmUpConfiguration: S.optional(__S(200, __c25, 0)),
        }),
      ).annotate({ identifier: "LogAlarm" });
    case 4:
      return S.Array(__S(179, __c22, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CompositeAlarms: S.optional(__S(178, __c22, 2)),
          MetricAlarms: S.optional(__S(185, __c23, 1)),
          LogAlarms: S.optional(__S(180, __c22, 4)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAlarmsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          AlarmArn: S.optional(S.String),
          AlarmDescription: S.optional(S.String),
          AlarmConfigurationUpdatedTimestamp: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          ActionsEnabled: S.optional(S.Boolean),
          OKActions: S.optional(__S(32, __c4, 0)),
          AlarmActions: S.optional(__S(32, __c4, 0)),
          InsufficientDataActions: S.optional(__S(32, __c4, 0)),
          StateValue: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonData: S.optional(S.String),
          StateUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
          Statistic: S.optional(S.String),
          ExtendedStatistic: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Period: S.optional(S.Number),
          Unit: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          DatapointsToAlarm: S.optional(S.Number),
          Threshold: S.optional(S.Number),
          ComparisonOperator: S.optional(S.String),
          TreatMissingData: S.optional(S.String),
          EvaluateLowSampleCountPercentile: S.optional(S.String),
          Metrics: S.optional(__S(90, __c11, 2)),
          ThresholdMetricId: S.optional(S.String),
          EvaluationState: S.optional(S.String),
          StateTransitionedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EvaluationWindow: S.optional(__S(209, __c26, 1)),
          WarmUpConfiguration: S.optional(__S(200, __c25, 0)),
          EvaluationCriteria: S.optional(__S(211, __c26, 3)),
          EvaluationInterval: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MetricAlarm" });
    case 1:
      return S.Array(__S(184, __c23, 0));
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Timezone: S.optional(S.String) })).annotate({
        identifier: "WallClockWindow",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          WarmUpPeriodDurationInMinutes: S.optional(S.Number),
          OnlyStartEvaluatingAfterWarmUpPeriodEnds: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "WarmUpConfiguration" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "SlidingWindow" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ WallClockWindow: __S(192, __c24, 0) }),
        /*@__PURE__*/ S.Struct({ SlidingWindow: __S(208, __c26, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Query: S.optional(S.String),
          PendingPeriod: S.optional(S.Number),
          RecoveryPeriod: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AlarmPromQLCriteria" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ PromQLCriteria: __S(210, __c26, 2) })]);
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "Tag" });
    case 1:
      return S.Array(__S(216, __c27, 0));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ScheduleExpression: S.optional(S.String),
          StartTimeOffset: S.optional(S.Number),
          EndTimeOffset: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScheduleConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          QueryString: S.optional(S.String),
          LogGroupIdentifiers: S.optional(__S(32, __c4, 0)),
          QueryARN: S.optional(S.String),
          ScheduledQueryRoleARN: S.optional(S.String),
          ScheduleConfiguration: S.optional(__S(224, __c28, 0)),
          AggregationExpression: S.optional(S.String),
          Tags: S.optional(__S(217, __c27, 1)),
        }),
      ).annotate({ identifier: "ScheduledQueryConfiguration" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
          Statistic: S.optional(S.String),
          ExtendedStatistic: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Period: S.optional(S.Number),
          Unit: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAlarmsForMetricInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MetricAlarms: S.optional(__S(185, __c23, 1)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAlarmsForMetricOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AnomalyDetectorIds: S.optional(__S(32, __c4, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          AnomalyDetectorTypes: S.optional(__S(168, __c21, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAnomalyDetectorsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnomalyDetectorId: S.optional(S.String),
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Stat: S.optional(S.String),
          Configuration: S.optional(__S(250, __c31, 2)),
          StateValue: S.optional(S.String),
          MetricCharacteristics: S.optional(__S(251, __c31, 3)),
          SingleMetricAnomalyDetector: S.optional(__S(96, __c12, 0)),
          MetricMathAnomalyDetector: S.optional(__S(97, __c12, 1)),
        }),
      ).annotate({ identifier: "AnomalyDetector" });
    case 2:
      return S.Array(__S(241, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AnomalyDetectors: S.optional(__S(242, __c30, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAnomalyDetectorsOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Range" });
    case 1:
      return S.Array(__S(248, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ExcludedTimeRanges: S.optional(__S(249, __c31, 1)),
          MetricTimezone: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnomalyDetectorConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ PeriodicSpikes: S.optional(S.Boolean) })).annotate({
        identifier: "MetricCharacteristics",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeInsightRulesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          State: S.optional(S.String),
          Schema: S.optional(S.String),
          Definition: S.optional(S.String),
          ManagedRule: S.optional(S.Boolean),
          ApplyOnTransformedLogs: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InsightRule" });
    case 2:
      return S.Array(__S(257, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          InsightRules: S.optional(__S(258, __c32, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeInsightRulesOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlarmNames: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableAlarmActionsInput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleNames: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableInsightRulesInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatasetIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateDatasetKmsKeyInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlarmNames: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableAlarmActionsInput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RuleNames: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableInsightRulesInput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlarmMuteRuleName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAlarmMuteRuleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          AlarmMuteRuleArn: S.optional(S.String),
          Description: S.optional(S.String),
          Rule: S.optional(__S(313, __c39, 1)),
          MuteTargets: S.optional(__S(314, __c39, 2)),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpireDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          MuteType: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAlarmMuteRuleOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Expression: S.optional(S.String),
          Duration: S.optional(S.String),
          Timezone: S.optional(S.String),
        }),
      ).annotate({ identifier: "Schedule" });
    case 1:
      return S.suspend(() => S.Struct({ Schedule: S.optional(__S(312, __c39, 0)) })).annotate({
        identifier: "Rule",
      });
    case 2:
      return S.suspend(() => S.Struct({ AlarmNames: S.optional(__S(32, __c4, 0)) })).annotate({
        identifier: "MuteTargets",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DashboardName: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDashboardInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DashboardArn: S.optional(S.String),
          DashboardBody: S.optional(S.String),
          DashboardName: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDashboardOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DatasetIdentifier: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDatasetInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DatasetId: S.optional(S.String),
          Arn: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDatasetOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Period: S.optional(S.Number),
          MaxContributorCount: S.optional(S.Number),
          Metrics: S.optional(__S(32, __c4, 0)),
          OrderBy: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetInsightRuleReportInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ApproximateValue: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InsightRuleContributorDatapoint" });
    case 2:
      return S.Array(__S(337, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Keys: S.optional(__S(32, __c4, 0)),
          ApproximateAggregateValue: S.optional(S.Number),
          Datapoints: S.optional(__S(338, __c42, 2)),
        }),
      ).annotate({ identifier: "InsightRuleContributor" });
    case 4:
      return S.Array(__S(339, __c42, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UniqueContributors: S.optional(S.Number),
          MaxContributorValue: S.optional(S.Number),
          SampleCount: S.optional(S.Number),
          Average: S.optional(S.Number),
          Sum: S.optional(S.Number),
          Minimum: S.optional(S.Number),
          Maximum: S.optional(S.Number),
        }),
      ).annotate({ identifier: "InsightRuleMetricDatapoint" });
    case 6:
      return S.Array(__S(341, __c42, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          KeyLabels: S.optional(__S(32, __c4, 0)),
          AggregationStatistic: S.optional(S.String),
          AggregateValue: S.optional(S.Number),
          ApproximateUniqueCount: S.optional(S.Number),
          Contributors: S.optional(__S(340, __c42, 4)),
          MetricDatapoints: S.optional(__S(342, __c42, 6)),
        }).pipe(ns),
      ).annotate({ identifier: "GetInsightRuleReportOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MetricDataQueries: S.optional(__S(90, __c11, 2)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NextToken: S.optional(S.String),
          ScanBy: S.optional(S.String),
          MaxDatapoints: S.optional(S.Number),
          LabelOptions: S.optional(__S(192, __c24, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMetricDataInput" });
    case 1:
      return S.Array(/*@__PURE__*/ S.Date.pipe(/*@__PURE__*/ T.TimestampFormat("epoch-seconds")));
    case 2:
      return S.suspend(() =>
        S.Struct({ Code: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "MessageData" });
    case 3:
      return S.Array(__S(346, __c43, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Label: S.optional(S.String),
          Timestamps: S.optional(__S(345, __c43, 1)),
          Values: S.optional(__S(352, __c44, 0)),
          StatusCode: S.optional(S.String),
          Messages: S.optional(__S(347, __c43, 3)),
        }),
      ).annotate({ identifier: "MetricDataResult" });
    case 5:
      return S.Array(__S(348, __c43, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          MetricDataResults: S.optional(__S(349, __c43, 5)),
          NextToken: S.optional(S.String),
          Messages: S.optional(__S(347, __c43, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "GetMetricDataOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Period: S.optional(S.Number),
          Statistics: S.optional(__S(168, __c21, 0)),
          ExtendedStatistics: S.optional(__S(32, __c4, 0)),
          Unit: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMetricStatisticsInput" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SampleCount: S.optional(S.Number),
          Average: S.optional(S.Number),
          Sum: S.optional(S.Number),
          Minimum: S.optional(S.Number),
          Maximum: S.optional(S.Number),
          Unit: S.optional(S.String),
          ExtendedStatistics: S.optional(__S(361, __c45, 1)),
        }),
      ).annotate({ identifier: "Datapoint" });
    case 3:
      return S.Array(__S(362, __c45, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ Label: S.optional(S.String), Datapoints: S.optional(__S(363, __c45, 3)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetMetricStatisticsOutput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMetricStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          IncludeFilters: S.optional(__S(377, __c47, 1)),
          ExcludeFilters: S.optional(__S(377, __c47, 1)),
          FirehoseArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          State: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          OutputFormat: S.optional(S.String),
          StatisticsConfigurations: S.optional(__S(387, __c48, 3)),
          IncludeLinkedAccountsMetrics: S.optional(S.Boolean),
        }).pipe(ns),
      ).annotate({ identifier: "GetMetricStreamOutput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Namespace: S.optional(S.String), MetricNames: S.optional(__S(32, __c4, 0)) }),
      ).annotate({ identifier: "MetricStreamFilter" });
    case 1:
      return S.Array(__S(376, __c47, 0));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Namespace: S.optional(S.String), MetricName: S.optional(S.String) }),
      ).annotate({ identifier: "MetricStreamStatisticsMetric" });
    case 1:
      return S.Array(__S(384, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IncludeMetrics: S.optional(__S(385, __c48, 1)),
          AdditionalStatistics: S.optional(__S(32, __c4, 0)),
        }),
      ).annotate({ identifier: "MetricStreamStatisticsConfiguration" });
    case 3:
      return S.Array(__S(386, __c48, 2));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MetricWidget: S.optional(S.String), OutputFormat: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetMetricWidgetImageInput" });
    case 1:
      return S.suspend(() => S.Struct({ MetricWidgetImage: S.optional(T.Blob) }).pipe(ns)).annotate(
        { identifier: "GetMetricWidgetImageOutput" },
      );
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOTelEnrichmentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          IncludeFilters: S.optional(__S(377, __c47, 1)),
          ExcludeFilters: S.optional(__S(377, __c47, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "GetOTelEnrichmentOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourceMetricsConfigurationInput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          Statuses: S.optional(__S(168, __c21, 0)),
          MaxRecords: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAlarmMuteRulesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AlarmMuteRuleArn: S.optional(S.String),
          ExpireDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
          MuteType: S.optional(S.String),
          LastUpdatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AlarmMuteRuleSummary" });
    case 2:
      return S.Array(__S(417, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AlarmMuteRuleSummaries: S.optional(__S(418, __c52, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAlarmMuteRulesOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashboardNamePrefix: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDashboardsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DashboardName: S.optional(S.String),
          DashboardArn: S.optional(S.String),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Size: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DashboardEntry" });
    case 2:
      return S.Array(__S(425, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          DashboardEntries: S.optional(__S(426, __c53, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListDashboardsOutput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListManagedInsightRulesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ RuleName: S.optional(S.String), State: S.optional(S.String) }),
      ).annotate({ identifier: "ManagedRuleState" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          RuleState: S.optional(__S(433, __c54, 1)),
        }),
      ).annotate({ identifier: "ManagedRuleDescription" });
    case 3:
      return S.Array(__S(434, __c54, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ManagedRules: S.optional(__S(435, __c54, 3)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListManagedInsightRulesOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          NextToken: S.optional(S.String),
          RecentlyActive: S.optional(S.String),
          IncludeLinkedAccounts: S.optional(S.Boolean),
          OwningAccount: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMetricsInput" });
    case 1:
      return S.Array(__S(80, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Metrics: S.optional(__S(441, __c55, 1)),
          NextToken: S.optional(S.String),
          OwningAccounts: S.optional(__S(32, __c4, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "ListMetricsOutput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMetricStreamsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Name: S.optional(S.String),
          FirehoseArn: S.optional(S.String),
          State: S.optional(S.String),
          OutputFormat: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricStreamEntry" });
    case 2:
      return S.Array(__S(449, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Entries: S.optional(__S(450, __c56, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListMetricStreamsOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(217, __c27, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Rule: S.optional(__S(313, __c39, 1)),
          MuteTargets: S.optional(__S(314, __c39, 2)),
          Tags: S.optional(__S(217, __c27, 1)),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ExpireDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAlarmMuteRuleInput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Namespace: S.optional(S.String),
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Stat: S.optional(S.String),
          Configuration: S.optional(__S(250, __c31, 2)),
          MetricCharacteristics: S.optional(__S(251, __c31, 3)),
          SingleMetricAnomalyDetector: S.optional(__S(96, __c12, 0)),
          MetricMathAnomalyDetector: S.optional(__S(97, __c12, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutAnomalyDetectorInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AnomalyDetectorId: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "PutAnomalyDetectorOutput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ActionsEnabled: S.optional(S.Boolean),
          AlarmActions: S.optional(__S(32, __c4, 0)),
          AlarmDescription: S.optional(S.String),
          AlarmName: S.optional(S.String),
          AlarmRule: S.optional(S.String),
          InsufficientDataActions: S.optional(__S(32, __c4, 0)),
          OKActions: S.optional(__S(32, __c4, 0)),
          Tags: S.optional(__S(217, __c27, 1)),
          ActionsSuppressor: S.optional(S.String),
          ActionsSuppressorWaitPeriod: S.optional(S.Number),
          ActionsSuppressorExtensionPeriod: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutCompositeAlarmInput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DashboardName: S.optional(S.String),
          DashboardBody: S.optional(S.String),
          Tags: S.optional(__S(217, __c27, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutDashboardInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DashboardValidationMessages: S.optional(__S(1, __c0, 1)) }).pipe(ns),
      ).annotate({ identifier: "PutDashboardOutput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleName: S.optional(S.String),
          RuleState: S.optional(S.String),
          RuleDefinition: S.optional(S.String),
          Tags: S.optional(__S(217, __c27, 1)),
          ApplyOnTransformedLogs: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutInsightRuleInput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          AlarmDescription: S.optional(S.String),
          ScheduledQueryConfiguration: S.optional(__S(225, __c28, 1)),
          ActionLogLineCount: S.optional(S.Number),
          ActionLogLineRoleArn: S.optional(S.String),
          ActionsEnabled: S.optional(S.Boolean),
          OKActions: S.optional(__S(32, __c4, 0)),
          AlarmActions: S.optional(__S(32, __c4, 0)),
          InsufficientDataActions: S.optional(__S(32, __c4, 0)),
          QueryResultsToEvaluate: S.optional(S.Number),
          QueryResultsToAlarm: S.optional(S.Number),
          Threshold: S.optional(S.Number),
          ComparisonOperator: S.optional(S.String),
          TreatMissingData: S.optional(S.String),
          Tags: S.optional(__S(217, __c27, 1)),
          WarmUpConfiguration: S.optional(__S(200, __c25, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutLogAlarmInput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TemplateName: S.optional(S.String),
          ResourceARN: S.optional(S.String),
          Tags: S.optional(__S(217, __c27, 1)),
        }),
      ).annotate({ identifier: "ManagedRule" });
    case 1:
      return S.Array(__S(512, __c64, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ManagedRules: S.optional(__S(513, __c64, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutManagedInsightRulesInput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          AlarmDescription: S.optional(S.String),
          ActionsEnabled: S.optional(S.Boolean),
          OKActions: S.optional(__S(32, __c4, 0)),
          AlarmActions: S.optional(__S(32, __c4, 0)),
          InsufficientDataActions: S.optional(__S(32, __c4, 0)),
          MetricName: S.optional(S.String),
          Namespace: S.optional(S.String),
          Statistic: S.optional(S.String),
          ExtendedStatistic: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Period: S.optional(S.Number),
          Unit: S.optional(S.String),
          EvaluationPeriods: S.optional(S.Number),
          DatapointsToAlarm: S.optional(S.Number),
          Threshold: S.optional(S.Number),
          ComparisonOperator: S.optional(S.String),
          TreatMissingData: S.optional(S.String),
          EvaluateLowSampleCountPercentile: S.optional(S.String),
          Metrics: S.optional(__S(90, __c11, 2)),
          Tags: S.optional(__S(217, __c27, 1)),
          ThresholdMetricId: S.optional(S.String),
          EvaluationWindow: S.optional(__S(209, __c26, 1)),
          WarmUpConfiguration: S.optional(__S(200, __c25, 0)),
          EvaluationCriteria: S.optional(__S(211, __c26, 3)),
          EvaluationInterval: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutMetricAlarmInput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SampleCount: S.optional(S.Number),
          Sum: S.optional(S.Number),
          Minimum: S.optional(S.Number),
          Maximum: S.optional(S.Number),
        }),
      ).annotate({ identifier: "StatisticSet" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MetricName: S.optional(S.String),
          Dimensions: S.optional(__S(73, __c9, 1)),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Value: S.optional(S.Number),
          StatisticValues: S.optional(__S(528, __c66, 0)),
          Values: S.optional(__S(352, __c44, 0)),
          Counts: S.optional(__S(352, __c44, 0)),
          Unit: S.optional(S.String),
          StorageResolution: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MetricDatum" });
    case 2:
      return S.Array(__S(529, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          KeyAttributes: S.optional(__S(152, __c19, 0)),
          Attributes: S.optional(__S(152, __c19, 0)),
        }),
      ).annotate({ identifier: "Entity" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Entity: S.optional(__S(531, __c66, 3)),
          MetricData: S.optional(__S(530, __c66, 2)),
        }),
      ).annotate({ identifier: "EntityMetricData" });
    case 5:
      return S.Array(__S(532, __c66, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Namespace: S.optional(S.String),
          MetricData: S.optional(__S(530, __c66, 2)),
          EntityMetricData: S.optional(__S(533, __c66, 5)),
          StrictEntityValidation: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutMetricDataInput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          IncludeFilters: S.optional(__S(377, __c47, 1)),
          ExcludeFilters: S.optional(__S(377, __c47, 1)),
          FirehoseArn: S.optional(S.String),
          RoleArn: S.optional(S.String),
          OutputFormat: S.optional(S.String),
          Tags: S.optional(__S(217, __c27, 1)),
          StatisticsConfigurations: S.optional(__S(387, __c48, 3)),
          IncludeLinkedAccountsMetrics: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutMetricStreamInput" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "PutMetricStreamOutput",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AlarmName: S.optional(S.String),
          StateValue: S.optional(S.String),
          StateReason: S.optional(S.String),
          StateReasonData: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetAlarmStateInput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartMetricStreamsInput" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IncludeFilters: S.optional(__S(377, __c47, 1)),
          ExcludeFilters: S.optional(__S(377, __c47, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartOTelEnrichmentInput" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IncludeFilters: S.optional(__S(377, __c47, 1)),
          ExcludeFilters: S.optional(__S(377, __c47, 1)),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(ns),
      ).annotate({ identifier: "StartOTelEnrichmentOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Names: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopMetricStreamsInput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopOTelEnrichmentInput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String), Tags: S.optional(__S(217, __c27, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceARN: S.optional(S.String), TagKeys: S.optional(__S(32, __c4, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IncludeFilters: S.optional(__S(377, __c47, 1)),
          ExcludeFilters: S.optional(__S(377, __c47, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateOTelEnrichmentInput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          MetricSelections: S.optional(__S(41, __c5, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateResourceMetricsConfigurationInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
