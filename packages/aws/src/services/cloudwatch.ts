import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "CloudWatch",
  target: "GraniteServiceVersion20100801",
  version: "2010-08-01",
  sigv4: "monitoring",
  protocol: awsJson1_0Protocol,
  xmlns: "http://monitoring.amazonaws.com/doc/2010-08-01/",
  rules: (p, _) => {
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
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseFIPS === true &&
            UseDualStack === false
          ) {
            return e(
              `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DashboardInvalidInputError
  extends /*@__PURE__*/ TE.TaggedError(
    "DashboardInvalidInputError",
    ["BadRequestError"],
    { code: "InvalidParameterInput", status: 400 },
  )<{
    readonly message?: string;
    readonly dashboardValidationMessages?: DashboardValidationMessage[];
  }> {}
export class DashboardNotFoundError
  extends /*@__PURE__*/ TE.TaggedError(
    "DashboardNotFoundError",
    ["BadRequestError"],
    { code: "ResourceNotFound", status: 404 },
  )<{ readonly message?: string }> {}
export class InternalServiceFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServiceFault",
    ["ServerError"],
    { code: "InternalServiceError", status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidFormatFault
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidFormatFault",
    ["BadRequestError"],
    { code: "InvalidFormat", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextToken
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextToken",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterCombinationException",
    ["BadRequestError"],
    { code: "InvalidParameterCombination", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterValueException",
    ["BadRequestError"],
    { code: "InvalidParameterValue", status: 400 },
  )<{ readonly message?: string }> {}
export class KmsAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("KmsAccessDeniedException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class KmsKeyDisabledException
  extends /*@__PURE__*/ TE.TaggedError("KmsKeyDisabledException")<{
    readonly message?: string;
  }> {}
export class KmsKeyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("KmsKeyNotFoundException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededFault
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededFault",
    ["BadRequestError"],
    { code: "LimitExceeded", status: 400 },
  )<{ readonly message?: string }> {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "MissingRequiredParameterException",
    ["BadRequestError"],
    { code: "MissingParameter", status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceConflict
  extends /*@__PURE__*/ TE.TaggedError("ResourceConflict", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ResourceNotFound
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFound",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly ResourceType?: string;
    readonly ResourceId?: string;
    readonly message?: string;
  }> {}
export class UnsupportedOperation
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperation")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export type DatasetIdentifier = string;
export type KmsKeyArn = string;
export interface AssociateDatasetKmsKeyInput {
  DatasetIdentifier?: string;
  KmsKeyArn?: string;
}
export interface AssociateDatasetKmsKeyOutput {}
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
export type MetricName = string;
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
export type AlarmType =
  | "CompositeAlarm"
  | "MetricAlarm"
  | "LogAlarm"
  | (string & {});
export type AlarmTypes = AlarmType[];
export type HistoryItemType =
  | "ConfigurationUpdate"
  | "StateUpdate"
  | "Action"
  | "AlarmContributorStateUpdate"
  | "AlarmContributorAction"
  | (string & {});
export type MaxRecords = number;
export type ScanBy =
  | "TimestampDescending"
  | "TimestampAscending"
  | (string & {});
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
export type ActionsSuppressedBy =
  | "WaitPeriod"
  | "ExtensionPeriod"
  | "Alarm"
  | (string & {});
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
export type Statistic =
  | "SampleCount"
  | "Average"
  | "Sum"
  | "Minimum"
  | "Maximum"
  | (string & {});
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
          Dimensions: (Dimension & {
            Name: DimensionName;
            Value: DimensionValue;
          })[];
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
          Dimensions: (Dimension & {
            Name: DimensionName;
            Value: DimensionValue;
          })[];
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
export type AnomalyDetectorType =
  | "SINGLE_METRIC"
  | "METRIC_MATH"
  | (string & {});
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
      Dimensions: (Dimension & {
        Name: DimensionName;
        Value: DimensionValue;
      })[];
    };
    MetricMathAnomalyDetector: MetricMathAnomalyDetector & {
      MetricDataQueries: (MetricDataQuery & {
        Id: MetricId;
        MetricStat: MetricStat & {
          Metric: Metric & {
            Dimensions: (Dimension & {
              Name: DimensionName;
              Value: DimensionValue;
            })[];
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
export type AlarmMuteRuleStatus =
  | "SCHEDULED"
  | "ACTIVE"
  | "EXPIRED"
  | (string & {});
export type MuteType = string;
export interface GetAlarmMuteRuleOutput {
  Name?: string;
  AlarmMuteRuleArn?: string;
  Description?: string;
  Rule?: Rule & {
    Schedule: Schedule & { Expression: Expression; Duration: Duration };
  };
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
export type InsightRuleContributorDatapoints =
  InsightRuleContributorDatapoint[];
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
export type StatusCode =
  | "Complete"
  | "InternalError"
  | "PartialData"
  | "Forbidden"
  | (string & {});
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
export type MetricStreamStatisticsIncludeMetrics =
  MetricStreamStatisticsMetric[];
export type MetricStreamStatistic = string;
export type MetricStreamStatisticsAdditionalStatistics = string[];
export interface MetricStreamStatisticsConfiguration {
  IncludeMetrics?: MetricStreamStatisticsMetric[];
  AdditionalStatistics?: string[];
}
export type MetricStreamStatisticsConfigurations =
  MetricStreamStatisticsConfiguration[];
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
export interface GetOTelEnrichmentOutput {
  Status: OTelEnrichmentStatus;
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
    RuleState: ManagedRuleState & {
      RuleName: InsightRuleName;
      State: InsightRuleState;
    };
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
export interface StartOTelEnrichmentInput {}
export interface StartOTelEnrichmentOutput {}
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
export type ErrorMessage = string;
export type ResourceType = string;
export type ResourceId = string;
export type FaultDescription = string;
export type AwsQueryErrorMessage = string;
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
 * is implicit for every account in every Region — you do not need to create it before
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
  descriptor: { service: svc, input: { DatasetIdentifier: 0, KmsKeyArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { AlarmMuteRuleName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarmMuteRule",
})) as any;

export type DeleteAlarmsError =
  | ResourceConflict
  | ResourceNotFound
  | CommonErrors;
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
  descriptor: { service: svc, input: { AlarmNames: 0 } },
  errors: [ResourceConflict, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarms",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AnomalyDetectorId: 0,
      Namespace: 0,
      MetricName: 0,
      Dimensions: D.list(i_Dimension),
      Stat: 0,
      SingleMetricAnomalyDetector: i_SingleMetricAnomalyDetector,
      MetricMathAnomalyDetector: i_MetricMathAnomalyDetector,
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { DashboardNames: 0 } },
  errors: [
    ConflictException,
    InternalServiceFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboards",
})) as any;

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
  descriptor: { service: svc, input: { RuleNames: 0 } },
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInsightRules",
})) as any;

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
  descriptor: { service: svc, input: { Name: 0 } },
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricStream",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AlarmName: 0, NextToken: 0 },
    output: { AlarmContributors: D.list({ StateTransitionedTimestamp: D.ts }) },
  },
  errors: [InvalidNextToken, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmContributors",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AlarmName: 0,
      AlarmContributorId: 0,
      AlarmTypes: 0,
      HistoryItemType: 0,
      StartDate: 0,
      EndDate: 0,
      MaxRecords: 0,
      NextToken: 0,
      ScanBy: 0,
    },
    output: { AlarmHistoryItems: D.list({ Timestamp: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      AlarmNames: 0,
      AlarmNamePrefix: 0,
      AlarmTypes: 0,
      ChildrenOfAlarmName: 0,
      ParentsOfAlarmName: 0,
      StateValue: 0,
      ActionPrefix: 0,
      MaxRecords: 0,
      NextToken: 0,
    },
    output: {
      CompositeAlarms: D.list({
        AlarmConfigurationUpdatedTimestamp: D.ts,
        StateUpdatedTimestamp: D.ts,
        StateTransitionedTimestamp: D.ts,
      }),
      MetricAlarms: D.list(o_MetricAlarm),
      LogAlarms: D.list({
        AlarmConfigurationUpdatedTimestamp: D.ts,
        StateUpdatedTimestamp: D.ts,
        StateTransitionedTimestamp: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: {
      MetricName: 0,
      Namespace: 0,
      Statistic: 0,
      ExtendedStatistic: 0,
      Dimensions: D.list(i_Dimension),
      Period: 0,
      Unit: 0,
    },
    output: { MetricAlarms: D.list(o_MetricAlarm) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmsForMetric",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AnomalyDetectorIds: 0,
      NextToken: 0,
      MaxResults: 0,
      Namespace: 0,
      MetricName: 0,
      Dimensions: D.list(i_Dimension),
      AnomalyDetectorTypes: 0,
    },
    output: {
      AnomalyDetectors: D.list({
        Configuration: {
          ExcludedTimeRanges: D.list({ StartTime: D.ts, EndTime: D.ts }),
        },
      }),
    },
  },
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

export type DescribeInsightRulesError =
  | InvalidNextToken
  | UnsupportedOperation
  | CommonErrors;
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
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  descriptor: { service: svc, input: { AlarmNames: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAlarmActions",
})) as any;

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
  descriptor: { service: svc, input: { RuleNames: 0 } },
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableInsightRules",
})) as any;

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
  descriptor: { service: svc, input: { DatasetIdentifier: 0 } },
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDatasetKmsKey",
})) as any;

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
  descriptor: { service: svc, input: { AlarmNames: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAlarmActions",
})) as any;

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
  descriptor: { service: svc, input: { RuleNames: 0 } },
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableInsightRules",
})) as any;

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
  descriptor: {
    service: svc,
    input: { AlarmMuteRuleName: 0 },
    output: { StartDate: D.ts, ExpireDate: D.ts, LastUpdatedTimestamp: D.ts },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlarmMuteRule",
})) as any;

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
 */
export const getDashboard: API.OperationMethod<
  GetDashboardInput,
  GetDashboardOutput,
  GetDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { DashboardName: 0 } },
  errors: [
    DashboardNotFoundError,
    InternalServiceFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboard",
})) as any;

export type GetDatasetError = ResourceNotFoundException | CommonErrors;
/**
 * Returns information about the specified dataset. This includes its identifier,
 * Amazon Resource Name (ARN), and any customer managed Amazon Web Services Key
 * Management Service (Amazon Web Services KMS) key that is currently associated with
 * it.
 *
 * Only the `default` dataset is supported. The `default` dataset
 * is implicit for every account in every Region — you can call `GetDataset`
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
  descriptor: { service: svc, input: { DatasetIdentifier: 0 } },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataset",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      RuleName: 0,
      StartTime: 0,
      EndTime: 0,
      Period: 0,
      MaxContributorCount: 0,
      Metrics: 0,
      OrderBy: 0,
    },
    output: {
      Contributors: D.list({ Datapoints: D.list({ Timestamp: D.ts }) }),
      MetricDatapoints: D.list({ Timestamp: D.ts }),
    },
  },
  errors: [
    InvalidParameterValueException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightRuleReport",
})) as any;

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
 * retrieve other metrics. Metrics Insights queries can query only the most recent three
 * hours of metric data. For more information about Metrics Insights, see Query your metrics with CloudWatch Metrics Insights.
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
  descriptor: {
    service: svc,
    input: {
      MetricDataQueries: D.list(i_MetricDataQuery),
      StartTime: 0,
      EndTime: 0,
      NextToken: 0,
      ScanBy: 0,
      MaxDatapoints: 0,
      LabelOptions: { Timezone: 0 },
    },
    output: { MetricDataResults: D.list({ Timestamps: D.list(D.ts) }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      Namespace: 0,
      MetricName: 0,
      Dimensions: D.list(i_Dimension),
      StartTime: 0,
      EndTime: 0,
      Period: 0,
      Statistics: 0,
      ExtendedStatistics: 0,
      Unit: 0,
    },
    output: { Datapoints: D.list({ Timestamp: D.ts }) },
  },
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricStatistics",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Name: 0 },
    output: { CreationDate: D.ts, LastUpdateDate: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { MetricWidget: 0, OutputFormat: 0 },
    output: { MetricWidgetImage: D.blob },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricWidgetImage",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOTelEnrichment",
})) as any;

export type ListAlarmMuteRulesError =
  | InvalidNextToken
  | ResourceNotFoundException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { AlarmName: 0, Statuses: 0, MaxRecords: 0, NextToken: 0 },
    output: {
      AlarmMuteRuleSummaries: D.list({
        ExpireDate: D.ts,
        LastUpdatedTimestamp: D.ts,
      }),
    },
  },
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
 */
export const listDashboards: API.PaginatedOperationMethod<
  ListDashboardsInput,
  ListDashboardsOutput,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DashboardNamePrefix: 0, NextToken: 0 },
    output: { DashboardEntries: D.list({ LastModified: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: { ResourceARN: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InvalidNextToken,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedInsightRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMetricsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      Namespace: 0,
      MetricName: 0,
      Dimensions: D.list({ Name: 0, Value: 0 }),
      NextToken: 0,
      RecentlyActive: 0,
      IncludeLinkedAccounts: 0,
      OwningAccount: 0,
    },
  },
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
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { Entries: D.list({ CreationDate: D.ts, LastUpdateDate: D.ts }) },
  },
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
  descriptor: { service: svc, input: { ResourceARN: 0 } },
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      Description: 0,
      Rule: { Schedule: { Expression: 0, Duration: 0, Timezone: 0 } },
      MuteTargets: { AlarmNames: 0 },
      Tags: D.list(i_Tag),
      StartDate: 0,
      ExpireDate: 0,
    },
  },
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlarmMuteRule",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Namespace: 0,
      MetricName: 0,
      Dimensions: D.list(i_Dimension),
      Stat: 0,
      Configuration: {
        ExcludedTimeRanges: D.list({ StartTime: 0, EndTime: 0 }),
        MetricTimezone: 0,
      },
      MetricCharacteristics: { PeriodicSpikes: 0 },
      SingleMetricAnomalyDetector: i_SingleMetricAnomalyDetector,
      MetricMathAnomalyDetector: i_MetricMathAnomalyDetector,
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ActionsEnabled: 0,
      AlarmActions: 0,
      AlarmDescription: 0,
      AlarmName: 0,
      AlarmRule: 0,
      InsufficientDataActions: 0,
      OKActions: 0,
      Tags: D.list(i_Tag),
      ActionsSuppressor: 0,
      ActionsSuppressorWaitPeriod: 0,
      ActionsSuppressorExtensionPeriod: 0,
    },
  },
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCompositeAlarm",
})) as any;

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
  descriptor: {
    service: svc,
    input: { DashboardName: 0, DashboardBody: 0, Tags: D.list(i_Tag) },
  },
  errors: [ConflictException, DashboardInvalidInputError, InternalServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDashboard",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      RuleName: 0,
      RuleState: 0,
      RuleDefinition: 0,
      Tags: D.list(i_Tag),
      ApplyOnTransformedLogs: 0,
    },
  },
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInsightRule",
})) as any;

export type PutLogAlarmError =
  | LimitExceededFault
  | ResourceConflict
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      AlarmName: 0,
      AlarmDescription: 0,
      ScheduledQueryConfiguration: {
        QueryString: 0,
        LogGroupIdentifiers: 0,
        QueryARN: 0,
        ScheduledQueryRoleARN: 0,
        ScheduleConfiguration: {
          ScheduleExpression: 0,
          StartTimeOffset: 0,
          EndTimeOffset: 0,
        },
        AggregationExpression: 0,
        Tags: D.list(i_Tag),
      },
      ActionLogLineCount: 0,
      ActionLogLineRoleArn: 0,
      ActionsEnabled: 0,
      OKActions: 0,
      AlarmActions: 0,
      InsufficientDataActions: 0,
      QueryResultsToEvaluate: 0,
      QueryResultsToAlarm: 0,
      Threshold: 0,
      ComparisonOperator: 0,
      TreatMissingData: 0,
      Tags: D.list(i_Tag),
      WarmUpConfiguration: i_WarmUpConfiguration,
    },
  },
  errors: [LimitExceededFault, ResourceConflict],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLogAlarm",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      ManagedRules: D.list({
        TemplateName: 0,
        ResourceARN: 0,
        Tags: D.list(i_Tag),
      }),
    },
  },
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutManagedInsightRules",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      AlarmName: 0,
      AlarmDescription: 0,
      ActionsEnabled: 0,
      OKActions: 0,
      AlarmActions: 0,
      InsufficientDataActions: 0,
      MetricName: 0,
      Namespace: 0,
      Statistic: 0,
      ExtendedStatistic: 0,
      Dimensions: D.list(i_Dimension),
      Period: 0,
      Unit: 0,
      EvaluationPeriods: 0,
      DatapointsToAlarm: 0,
      Threshold: 0,
      ComparisonOperator: 0,
      TreatMissingData: 0,
      EvaluateLowSampleCountPercentile: 0,
      Metrics: D.list(i_MetricDataQuery),
      Tags: D.list(i_Tag),
      ThresholdMetricId: 0,
      EvaluationWindow: { WallClockWindow: { Timezone: 0 }, SlidingWindow: {} },
      WarmUpConfiguration: i_WarmUpConfiguration,
      EvaluationCriteria: {
        PromQLCriteria: { Query: 0, PendingPeriod: 0, RecoveryPeriod: 0 },
      },
      EvaluationInterval: 0,
    },
  },
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricAlarm",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Namespace: 0,
      MetricData: D.list(i_MetricDatum),
      EntityMetricData: D.list({
        Entity: { KeyAttributes: 0, Attributes: 0 },
        MetricData: D.list(i_MetricDatum),
      }),
      StrictEntityValidation: 0,
    },
  },
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricData",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      IncludeFilters: D.list(i_MetricStreamFilter),
      ExcludeFilters: D.list(i_MetricStreamFilter),
      FirehoseArn: 0,
      RoleArn: 0,
      OutputFormat: 0,
      Tags: D.list(i_Tag),
      StatisticsConfigurations: D.list({
        IncludeMetrics: D.list({ Namespace: 0, MetricName: 0 }),
        AdditionalStatistics: 0,
      }),
      IncludeLinkedAccountsMetrics: 0,
    },
  },
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
})) as any;

export type SetAlarmStateError =
  | InvalidFormatFault
  | ResourceNotFound
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { AlarmName: 0, StateValue: 0, StateReason: 0, StateReasonData: 0 },
  },
  errors: [InvalidFormatFault, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetAlarmState",
})) as any;

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
  descriptor: { service: svc, input: { Names: 0 } },
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetricStreams",
})) as any;

export type StartOTelEnrichmentError = CommonErrors;
/**
 * Enables enrichment and PromQL access for CloudWatch vended metrics for supported Amazon Web Services resources in the account. Once enabled,
 * metrics that contain a resource identifier dimension (for example, EC2
 * `CPUUtilization` with an `InstanceId` dimension) are enriched
 * with resource ARN and resource tag labels and become queryable using PromQL.
 *
 * Before calling this operation, you must enable resource tags on telemetry for your
 * account. For more information, see Enable
 * resource tags on telemetry.
 */
export const startOTelEnrichment: API.OperationMethod<
  StartOTelEnrichmentInput,
  StartOTelEnrichmentOutput,
  StartOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOTelEnrichment",
})) as any;

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
  descriptor: { service: svc, input: { Names: 0 } },
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMetricStreams",
})) as any;

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
  descriptor: { service: svc, input: {} },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopOTelEnrichment",
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, Tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { ResourceARN: 0, TagKeys: 0 } },
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
})) as any;

const i_Dimension: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_MetricDataQuery: D.LazyStruct = () => ({
  Id: 0,
  MetricStat: {
    Metric: { Namespace: 0, MetricName: 0, Dimensions: D.list(i_Dimension) },
    Period: 0,
    Stat: 0,
    Unit: 0,
  },
  Expression: 0,
  Label: 0,
  ReturnData: 0,
  Period: 0,
  AccountId: 0,
});
const i_MetricDatum: D.LazyStruct = () => ({
  MetricName: 0,
  Dimensions: D.list(i_Dimension),
  Timestamp: 0,
  Value: 0,
  StatisticValues: { SampleCount: 0, Sum: 0, Minimum: 0, Maximum: 0 },
  Values: 0,
  Counts: 0,
  Unit: 0,
  StorageResolution: 0,
});
const i_MetricMathAnomalyDetector: D.LazyStruct = () => ({
  MetricDataQueries: D.list(i_MetricDataQuery),
});
const i_MetricStreamFilter: D.LazyStruct = () => ({
  Namespace: 0,
  MetricNames: 0,
});
const i_SingleMetricAnomalyDetector: D.LazyStruct = () => ({
  AccountId: 0,
  Namespace: 0,
  MetricName: 0,
  Dimensions: D.list(i_Dimension),
  Stat: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_WarmUpConfiguration: D.LazyStruct = () => ({
  WarmUpPeriodDurationInMinutes: 0,
  OnlyStartEvaluatingAfterWarmUpPeriodEnds: 0,
});
const o_MetricAlarm: D.LazyStruct = () => ({
  AlarmConfigurationUpdatedTimestamp: D.ts,
  StateUpdatedTimestamp: D.ts,
  StateTransitionedTimestamp: D.ts,
});
