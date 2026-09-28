import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "Cost Explorer",
  target: "AWSInsightsIndexService",
  version: "2017-10-25",
  sigv4: "ce",
  protocol: awsJson1_1Protocol,
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
    const _p0 = () => ({
      authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }],
    });
    const _p1 = (_0: unknown) => ({
      authSchemes: [
        {
          name: "sigv4",
          signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
        },
      ],
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
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              "https://ce.us-east-1.api.aws",
              { authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-cn" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              "https://ce.cn-northwest-1.api.amazonwebservices.com.cn",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "cn-northwest-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://ce.us-iso-east-1.c2s.ic.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-iso-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://ce.us-isob-east-1.sc2s.sgov.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isob-east-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://ce.eu-isoe-west-1.cloud.adc-e.uk",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "eu-isoe-west-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://ce.us-isof-south-1.csp.hci.ic.gov",
              {
                authSchemes: [
                  { name: "sigv4", signingRegion: "us-isof-south-1" },
                ],
              },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e(
              "https://ce.eusc-de-east-1.api.amazonwebservices.eu",
              _p0(),
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e(
              "https://ce.eusc-de-east-1.api.amazonwebservices.eu",
              _p0(),
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://ce-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://ce-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ce.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://ce.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p1(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AnalysisNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AnalysisNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class AnomalyMonitorAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "AnomalyMonitorAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "ValidationException",
        message: { includes: "same monitor name as an existing monitor" },
      },
    },
  )<{ readonly message?: string }> {}
export class AnomalySubscriptionAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "AnomalySubscriptionAlreadyExists",
    ["AlreadyExistsError", "ConflictError"],
    {
      synthetic: {
        from: "ValidationException",
        message: {
          includes: "same subscription name as an existing subscription",
        },
      },
    },
  )<{ readonly message?: string }> {}
export class BackfillLimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "BackfillLimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class BillExpirationException
  extends /*@__PURE__*/ TE.TaggedError("BillExpirationException")<{
    readonly message?: string;
  }> {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ TE.TaggedError("BillingViewHealthStatusException")<{
    readonly message?: string;
  }> {}
export class DataUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("DataUnavailableException")<{
    readonly message?: string;
  }> {}
export class GenerationExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "GenerationExistsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class RequestChangedException
  extends /*@__PURE__*/ TE.TaggedError("RequestChangedException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class RightsizingRecommendationNotEnabled
  extends /*@__PURE__*/ TE.TaggedError(
    "RightsizingRecommendationNotEnabled",
    [],
    {
      synthetic: {
        from: "AccessDeniedException",
        message: { includes: "opt-in only feature" },
      },
    },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly ResourceName?: string }> {}
export class UnknownMonitorException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnknownMonitorException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnknownSubscriptionException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnknownSubscriptionException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UnresolvableUsageUnitException
  extends /*@__PURE__*/ TE.TaggedError("UnresolvableUsageUnitException")<{
    readonly message?: string;
  }> {}
export type YearMonthDay = string;
export type MonitorType = "DIMENSIONAL" | "CUSTOM" | (string & {});
export type MonitorDimension =
  | "SERVICE"
  | "LINKED_ACCOUNT"
  | "TAG"
  | "COST_CATEGORY"
  | (string & {});
export type Expressions = Expression[];
export type Dimension =
  | "AZ"
  | "INSTANCE_TYPE"
  | "LINKED_ACCOUNT"
  | "PAYER_ACCOUNT"
  | "LINKED_ACCOUNT_NAME"
  | "OPERATION"
  | "PURCHASE_TYPE"
  | "REGION"
  | "SERVICE"
  | "SERVICE_CODE"
  | "USAGE_TYPE"
  | "USAGE_TYPE_GROUP"
  | "RECORD_TYPE"
  | "OPERATING_SYSTEM"
  | "TENANCY"
  | "SCOPE"
  | "PLATFORM"
  | "SUBSCRIPTION_ID"
  | "LEGAL_ENTITY_NAME"
  | "DEPLOYMENT_OPTION"
  | "DATABASE_ENGINE"
  | "CACHE_ENGINE"
  | "INSTANCE_TYPE_FAMILY"
  | "BILLING_ENTITY"
  | "RESERVATION_ID"
  | "RESOURCE_ID"
  | "RIGHTSIZING_TYPE"
  | "SAVINGS_PLANS_TYPE"
  | "SAVINGS_PLAN_ARN"
  | "PAYMENT_OPTION"
  | "AGREEMENT_END_DATE_TIME_AFTER"
  | "AGREEMENT_END_DATE_TIME_BEFORE"
  | "INVOICING_ENTITY"
  | "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
  | "ANOMALY_TOTAL_IMPACT_PERCENTAGE"
  | (string & {});
export type Value = string;
export type Values = string[];
export type MatchOption =
  | "EQUALS"
  | "ABSENT"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "CASE_SENSITIVE"
  | "CASE_INSENSITIVE"
  | "GREATER_THAN_OR_EQUAL"
  | (string & {});
export type MatchOptions = MatchOption[];
export interface DimensionValues {
  Key?: Dimension;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export type TagKey = string;
export interface TagValues {
  Key?: string;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export type CostCategoryName = string;
export interface CostCategoryValues {
  Key?: string;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export interface Expression {
  Or?: Expression[];
  And?: Expression[];
  Not?: Expression;
  Dimensions?: DimensionValues;
  Tags?: TagValues;
  CostCategories?: CostCategoryValues;
}
export type NonNegativeInteger = number;
export interface AnomalyMonitor {
  MonitorArn?: string;
  MonitorName: string;
  CreationDate?: string;
  LastUpdatedDate?: string;
  LastEvaluatedDate?: string;
  MonitorType: MonitorType;
  MonitorDimension?: MonitorDimension;
  MonitorSpecification?: Expression;
  DimensionalValueCount?: number;
}
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value: string;
}
export type ResourceTagList = ResourceTag[];
export interface CreateAnomalyMonitorRequest {
  AnomalyMonitor: AnomalyMonitor;
  ResourceTags?: ResourceTag[];
}
export interface CreateAnomalyMonitorResponse {
  MonitorArn: string;
}
export type Arn = string;
export type MonitorArnList = string[];
export type SubscriberAddress = string;
export type SubscriberType = "EMAIL" | "SNS" | (string & {});
export type SubscriberStatus = "CONFIRMED" | "DECLINED" | (string & {});
export interface Subscriber {
  Address?: string;
  Type?: SubscriberType;
  Status?: SubscriberStatus;
}
export type Subscribers = Subscriber[];
export type NullableNonNegativeDouble = number;
export type AnomalySubscriptionFrequency =
  | "DAILY"
  | "IMMEDIATE"
  | "WEEKLY"
  | (string & {});
export interface AnomalySubscription {
  SubscriptionArn?: string;
  AccountId?: string;
  MonitorArnList: string[];
  Subscribers: Subscriber[];
  Threshold?: number;
  Frequency: AnomalySubscriptionFrequency;
  SubscriptionName: string;
  ThresholdExpression?: Expression;
}
export interface CreateAnomalySubscriptionRequest {
  AnomalySubscription: AnomalySubscription;
  ResourceTags?: ResourceTag[];
}
export interface CreateAnomalySubscriptionResponse {
  SubscriptionArn: string;
}
export type ZonedDateTime = string;
export type CostCategoryRuleVersion =
  | "CostCategoryExpression.v1"
  | (string & {});
export type CostCategoryValue = string;
export type CostCategoryInheritedValueDimensionName =
  | "LINKED_ACCOUNT_NAME"
  | "TAG"
  | (string & {});
export interface CostCategoryInheritedValueDimension {
  DimensionName?: CostCategoryInheritedValueDimensionName;
  DimensionKey?: string;
}
export type CostCategoryRuleType =
  | "REGULAR"
  | "INHERITED_VALUE"
  | (string & {});
export interface CostCategoryRule {
  Value?: string;
  Rule?: Expression;
  InheritedValue?: CostCategoryInheritedValueDimension;
  Type?: CostCategoryRuleType;
}
export type CostCategoryRulesList = CostCategoryRule[];
export type CostCategorySplitChargeRuleTargetsList = string[];
export type CostCategorySplitChargeMethod =
  | "FIXED"
  | "PROPORTIONAL"
  | "EVEN"
  | (string & {});
export type CostCategorySplitChargeRuleParameterType =
  | "ALLOCATION_PERCENTAGES"
  | (string & {});
export type CostCategorySplitChargeRuleParameterValuesList = string[];
export interface CostCategorySplitChargeRuleParameter {
  Type: CostCategorySplitChargeRuleParameterType;
  Values: string[];
}
export type CostCategorySplitChargeRuleParametersList =
  CostCategorySplitChargeRuleParameter[];
export interface CostCategorySplitChargeRule {
  Source: string;
  Targets: string[];
  Method: CostCategorySplitChargeMethod;
  Parameters?: CostCategorySplitChargeRuleParameter[];
}
export type CostCategorySplitChargeRulesList = CostCategorySplitChargeRule[];
export interface CreateCostCategoryDefinitionRequest {
  Name: string;
  EffectiveStart?: string;
  RuleVersion: CostCategoryRuleVersion;
  Rules: CostCategoryRule[];
  DefaultValue?: string;
  SplitChargeRules?: CostCategorySplitChargeRule[];
  ResourceTags?: ResourceTag[];
}
export interface CreateCostCategoryDefinitionResponse {
  CostCategoryArn?: string;
  EffectiveStart?: string;
}
export interface DeleteAnomalyMonitorRequest {
  MonitorArn: string;
}
export interface DeleteAnomalyMonitorResponse {}
export interface DeleteAnomalySubscriptionRequest {
  SubscriptionArn: string;
}
export interface DeleteAnomalySubscriptionResponse {}
export interface DeleteCostCategoryDefinitionRequest {
  CostCategoryArn: string;
}
export interface DeleteCostCategoryDefinitionResponse {
  CostCategoryArn?: string;
  EffectiveEnd?: string;
}
export interface DescribeCostCategoryDefinitionRequest {
  CostCategoryArn: string;
  EffectiveOn?: string;
}
export type CostCategoryStatusComponent = "COST_EXPLORER" | (string & {});
export type CostCategoryStatus = "PROCESSING" | "APPLIED" | (string & {});
export interface CostCategoryProcessingStatus {
  Component?: CostCategoryStatusComponent;
  Status?: CostCategoryStatus;
}
export type CostCategoryProcessingStatusList = CostCategoryProcessingStatus[];
export interface CostCategory {
  CostCategoryArn: string;
  EffectiveStart: string;
  EffectiveEnd?: string;
  Name: string;
  RuleVersion: CostCategoryRuleVersion;
  Rules: CostCategoryRule[];
  SplitChargeRules?: CostCategorySplitChargeRule[];
  ProcessingStatus?: CostCategoryProcessingStatus[];
  DefaultValue?: string;
}
export interface DescribeCostCategoryDefinitionResponse {
  CostCategory?: CostCategory;
}
export interface AnomalyDateInterval {
  StartDate: string;
  EndDate?: string;
}
export type AnomalyFeedbackType =
  | "YES"
  | "NO"
  | "PLANNED_ACTIVITY"
  | (string & {});
export type NumericOperator =
  | "EQUAL"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "BETWEEN"
  | (string & {});
export interface TotalImpactFilter {
  NumericOperator: NumericOperator;
  StartValue: number;
  EndValue?: number;
}
export type NextPageToken = string;
export type PageSize = number;
export interface GetAnomaliesRequest {
  MonitorArn?: string;
  DateInterval: AnomalyDateInterval;
  Feedback?: AnomalyFeedbackType;
  TotalImpact?: TotalImpactFilter;
  NextPageToken?: string;
  MaxResults?: number;
}
export interface RootCauseImpact {
  Contribution: number;
}
export interface RootCause {
  Service?: string;
  Region?: string;
  LinkedAccount?: string;
  LinkedAccountName?: string;
  UsageType?: string;
  Impact?: RootCauseImpact;
}
export type RootCauses = RootCause[];
export interface AnomalyScore {
  MaxScore: number;
  CurrentScore: number;
}
export interface Impact {
  MaxImpact: number;
  TotalImpact?: number;
  TotalActualSpend?: number;
  TotalExpectedSpend?: number;
  TotalImpactPercentage?: number;
}
export interface Anomaly {
  AnomalyId: string;
  AnomalyStartDate?: string;
  AnomalyEndDate?: string;
  DimensionValue?: string;
  RootCauses?: RootCause[];
  AnomalyScore: AnomalyScore;
  Impact: Impact;
  MonitorArn: string;
  Feedback?: AnomalyFeedbackType;
}
export type Anomalies = Anomaly[];
export interface GetAnomaliesResponse {
  Anomalies: Anomaly[];
  NextPageToken?: string;
}
export interface GetAnomalyMonitorsRequest {
  MonitorArnList?: string[];
  NextPageToken?: string;
  MaxResults?: number;
}
export type AnomalyMonitors = AnomalyMonitor[];
export interface GetAnomalyMonitorsResponse {
  AnomalyMonitors: AnomalyMonitor[];
  NextPageToken?: string;
}
export interface GetAnomalySubscriptionsRequest {
  SubscriptionArnList?: string[];
  MonitorArn?: string;
  NextPageToken?: string;
  MaxResults?: number;
}
export type AnomalySubscriptions = AnomalySubscription[];
export interface GetAnomalySubscriptionsResponse {
  AnomalySubscriptions: AnomalySubscription[];
  NextPageToken?: string;
}
export type Granularity = "DAILY" | "MONTHLY" | "HOURLY" | (string & {});
export type UsageServices = string[];
export type ApproximationDimension = "SERVICE" | "RESOURCE" | (string & {});
export interface GetApproximateUsageRecordsRequest {
  Granularity: Granularity;
  Services?: string[];
  ApproximationDimension: ApproximationDimension;
}
export type NonNegativeLong = number;
export type ApproximateUsageRecordsPerService = {
  [key: string]: number | undefined;
};
export interface DateInterval {
  Start: string;
  End: string;
}
export interface GetApproximateUsageRecordsResponse {
  Services?: { [key: string]: number | undefined };
  TotalRecords?: number;
  LookbackPeriod?: DateInterval;
}
export type AnalysisId = string;
export interface GetCommitmentPurchaseAnalysisRequest {
  AnalysisId: string;
}
export type AnalysisStatus =
  | "SUCCEEDED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export type ErrorCode =
  | "NO_USAGE_FOUND"
  | "INTERNAL_FAILURE"
  | "INVALID_SAVINGS_PLANS_TO_ADD"
  | "INVALID_SAVINGS_PLANS_TO_EXCLUDE"
  | "INVALID_ACCOUNT_ID"
  | (string & {});
export interface RecommendationDetailHourlyMetrics {
  StartTime?: string;
  EstimatedOnDemandCost?: string;
  CurrentCoverage?: string;
  EstimatedCoverage?: string;
  EstimatedNewCommitmentUtilization?: string;
}
export type MetricsOverLookbackPeriod = RecommendationDetailHourlyMetrics[];
export interface SavingsPlansPurchaseAnalysisDetails {
  CurrencyCode?: string;
  LookbackPeriodInHours?: string;
  CurrentAverageCoverage?: string;
  CurrentAverageHourlyOnDemandSpend?: string;
  CurrentMaximumHourlyOnDemandSpend?: string;
  CurrentMinimumHourlyOnDemandSpend?: string;
  CurrentOnDemandSpend?: string;
  ExistingHourlyCommitment?: string;
  HourlyCommitmentToPurchase?: string;
  EstimatedAverageCoverage?: string;
  EstimatedAverageUtilization?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedOnDemandCost?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
  EstimatedROI?: string;
  EstimatedSavingsAmount?: string;
  EstimatedSavingsPercentage?: string;
  EstimatedCommitmentCost?: string;
  LatestUsageTimestamp?: string;
  UpfrontCost?: string;
  AdditionalMetadata?: string;
  MetricsOverLookbackPeriod?: RecommendationDetailHourlyMetrics[];
}
export interface AnalysisDetails {
  SavingsPlansPurchaseAnalysisDetails?: SavingsPlansPurchaseAnalysisDetails;
}
export type AccountScope = "PAYER" | "LINKED" | (string & {});
export type AccountId = string;
export type AnalysisType =
  | "MAX_SAVINGS"
  | "CUSTOM_COMMITMENT"
  | "TARGET_AVERAGE_COVERAGE"
  | (string & {});
export type PaymentOption =
  | "NO_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "ALL_UPFRONT"
  | "LIGHT_UTILIZATION"
  | "MEDIUM_UTILIZATION"
  | "HEAVY_UTILIZATION"
  | (string & {});
export type SupportedSavingsPlansType =
  | "COMPUTE_SP"
  | "EC2_INSTANCE_SP"
  | "SAGEMAKER_SP"
  | "DATABASE_SP"
  | (string & {});
export type TermInYears = "ONE_YEAR" | "THREE_YEARS" | (string & {});
export type SavingsPlansCommitment = number;
export interface SavingsPlans {
  PaymentOption?: PaymentOption;
  SavingsPlansType?: SupportedSavingsPlansType;
  Region?: string;
  InstanceFamily?: string;
  TermInYears?: TermInYears;
  SavingsPlansCommitment?: number;
  OfferingId?: string;
}
export type SavingsPlansToAdd = SavingsPlans[];
export type SavingsPlansId = string;
export type SavingsPlansToExclude = string[];
export type SavingsPlansTargetCoverage = number;
export interface SavingsPlansPurchaseAnalysisConfiguration {
  AccountScope?: AccountScope;
  AccountId?: string;
  AnalysisType: AnalysisType;
  SavingsPlansToAdd: SavingsPlans[];
  SavingsPlansToExclude?: string[];
  LookBackTimePeriod: DateInterval;
  SavingsPlansTargetCoverage?: number;
}
export interface CommitmentPurchaseAnalysisConfiguration {
  SavingsPlansPurchaseAnalysisConfiguration?: SavingsPlansPurchaseAnalysisConfiguration;
}
export interface GetCommitmentPurchaseAnalysisResponse {
  EstimatedCompletionTime: string;
  AnalysisCompletionTime?: string;
  AnalysisStartedTime: string;
  AnalysisId: string;
  AnalysisStatus: AnalysisStatus;
  ErrorCode?: ErrorCode;
  AnalysisDetails?: AnalysisDetails;
  CommitmentPurchaseAnalysisConfiguration: CommitmentPurchaseAnalysisConfiguration;
}
export type MetricName = string;
export type MetricNames = string[];
export type GroupDefinitionType =
  | "DIMENSION"
  | "TAG"
  | "COST_CATEGORY"
  | (string & {});
export type GroupDefinitionKey = string;
export interface GroupDefinition {
  Type?: GroupDefinitionType;
  Key?: string;
}
export type GroupDefinitions = GroupDefinition[];
export type BillingViewArn = string;
export interface GetCostAndUsageRequest {
  TimePeriod: DateInterval;
  Granularity: Granularity;
  Filter?: Expression;
  Metrics: string[];
  GroupBy?: GroupDefinition[];
  BillingViewArn?: string;
  NextPageToken?: string;
}
export type MetricAmount = string;
export type MetricUnit = string;
export interface MetricValue {
  Amount?: string;
  Unit?: string;
}
export type Metrics = { [key: string]: MetricValue | undefined };
export type Key = string;
export type Keys = string[];
export interface Group {
  Keys?: string[];
  Metrics?: { [key: string]: MetricValue | undefined };
}
export type Groups = Group[];
export type Estimated = boolean;
export interface ResultByTime {
  TimePeriod?: DateInterval;
  Total?: { [key: string]: MetricValue | undefined };
  Groups?: Group[];
  Estimated?: boolean;
}
export type ResultsByTime = ResultByTime[];
export type AttributeType = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export interface DimensionValuesWithAttributes {
  Value?: string;
  Attributes?: { [key: string]: string | undefined };
}
export type DimensionValuesWithAttributesList = DimensionValuesWithAttributes[];
export interface GetCostAndUsageResponse {
  NextPageToken?: string;
  GroupDefinitions?: GroupDefinition[];
  ResultsByTime?: ResultByTime[];
  DimensionValueAttributes?: DimensionValuesWithAttributes[];
}
export type CostAndUsageComparisonsMaxResults = number;
export interface GetCostAndUsageComparisonsRequest {
  BillingViewArn?: string;
  BaselineTimePeriod: DateInterval;
  ComparisonTimePeriod: DateInterval;
  MetricForComparison: string;
  Filter?: Expression;
  GroupBy?: GroupDefinition[];
  MaxResults?: number;
  NextPageToken?: string;
}
export interface ComparisonMetricValue {
  BaselineTimePeriodAmount?: string;
  ComparisonTimePeriodAmount?: string;
  Difference?: string;
  Unit?: string;
}
export type ComparisonMetrics = {
  [key: string]: ComparisonMetricValue | undefined;
};
export interface CostAndUsageComparison {
  CostAndUsageSelector?: Expression;
  Metrics?: { [key: string]: ComparisonMetricValue | undefined };
}
export type CostAndUsageComparisons = CostAndUsageComparison[];
export interface GetCostAndUsageComparisonsResponse {
  CostAndUsageComparisons?: CostAndUsageComparison[];
  TotalCostAndUsage?: { [key: string]: ComparisonMetricValue | undefined };
  NextPageToken?: string;
}
export interface GetCostAndUsageWithResourcesRequest {
  TimePeriod: DateInterval;
  Granularity: Granularity;
  Filter: Expression;
  Metrics?: string[];
  GroupBy?: GroupDefinition[];
  BillingViewArn?: string;
  NextPageToken?: string;
}
export interface GetCostAndUsageWithResourcesResponse {
  NextPageToken?: string;
  GroupDefinitions?: GroupDefinition[];
  ResultsByTime?: ResultByTime[];
  DimensionValueAttributes?: DimensionValuesWithAttributes[];
}
export type SearchString = string;
export type SortDefinitionKey = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface SortDefinition {
  Key: string;
  SortOrder?: SortOrder;
}
export type SortDefinitions = SortDefinition[];
export type MaxResults = number;
export interface GetCostCategoriesRequest {
  SearchString?: string;
  TimePeriod: DateInterval;
  CostCategoryName?: string;
  Filter?: Expression;
  SortBy?: SortDefinition[];
  BillingViewArn?: string;
  MaxResults?: number;
  NextPageToken?: string;
}
export type CostCategoryNamesList = string[];
export type CostCategoryValuesList = string[];
export interface GetCostCategoriesResponse {
  NextPageToken?: string;
  CostCategoryNames?: string[];
  CostCategoryValues?: string[];
  ReturnSize: number;
  TotalSize: number;
}
export type CostComparisonDriversMaxResults = number;
export interface GetCostComparisonDriversRequest {
  BillingViewArn?: string;
  BaselineTimePeriod: DateInterval;
  ComparisonTimePeriod: DateInterval;
  MetricForComparison: string;
  Filter?: Expression;
  GroupBy?: GroupDefinition[];
  MaxResults?: number;
  NextPageToken?: string;
}
export interface CostDriver {
  Type?: string;
  Name?: string;
  Metrics?: { [key: string]: ComparisonMetricValue | undefined };
}
export type CostDrivers = CostDriver[];
export interface CostComparisonDriver {
  CostSelector?: Expression;
  Metrics?: { [key: string]: ComparisonMetricValue | undefined };
  CostDrivers?: CostDriver[];
}
export type CostComparisonDrivers = CostComparisonDriver[];
export interface GetCostComparisonDriversResponse {
  CostComparisonDrivers?: CostComparisonDriver[];
  NextPageToken?: string;
}
export type Metric =
  | "BLENDED_COST"
  | "UNBLENDED_COST"
  | "AMORTIZED_COST"
  | "NET_UNBLENDED_COST"
  | "NET_AMORTIZED_COST"
  | "USAGE_QUANTITY"
  | "NORMALIZED_USAGE_AMOUNT"
  | (string & {});
export type PredictionIntervalLevel = number;
export interface GetCostForecastRequest {
  TimePeriod: DateInterval;
  Metric: Metric;
  Granularity: Granularity;
  Filter?: Expression;
  BillingViewArn?: string;
  PredictionIntervalLevel?: number;
}
export interface ForecastResult {
  TimePeriod?: DateInterval;
  MeanValue?: string;
  PredictionIntervalLowerBound?: string;
  PredictionIntervalUpperBound?: string;
}
export type ForecastResultsByTime = ForecastResult[];
export interface GetCostForecastResponse {
  Total?: MetricValue;
  ForecastResultsByTime?: ForecastResult[];
}
export type Context =
  | "COST_AND_USAGE"
  | "RESERVATIONS"
  | "SAVINGS_PLANS"
  | (string & {});
export interface GetDimensionValuesRequest {
  SearchString?: string;
  TimePeriod: DateInterval;
  Dimension: Dimension;
  Context?: Context;
  Filter?: Expression;
  SortBy?: SortDefinition[];
  BillingViewArn?: string;
  MaxResults?: number;
  NextPageToken?: string;
}
export interface GetDimensionValuesResponse {
  DimensionValues: DimensionValuesWithAttributes[];
  ReturnSize: number;
  TotalSize: number;
  NextPageToken?: string;
}
export interface GetReservationCoverageRequest {
  TimePeriod: DateInterval;
  GroupBy?: GroupDefinition[];
  Granularity?: Granularity;
  Filter?: Expression;
  Metrics?: string[];
  NextPageToken?: string;
  SortBy?: SortDefinition;
  MaxResults?: number;
}
export type OnDemandHours = string;
export type ReservedHours = string;
export type TotalRunningHours = string;
export type CoverageHoursPercentage = string;
export interface CoverageHours {
  OnDemandHours?: string;
  ReservedHours?: string;
  TotalRunningHours?: string;
  CoverageHoursPercentage?: string;
}
export type OnDemandNormalizedUnits = string;
export type ReservedNormalizedUnits = string;
export type TotalRunningNormalizedUnits = string;
export type CoverageNormalizedUnitsPercentage = string;
export interface CoverageNormalizedUnits {
  OnDemandNormalizedUnits?: string;
  ReservedNormalizedUnits?: string;
  TotalRunningNormalizedUnits?: string;
  CoverageNormalizedUnitsPercentage?: string;
}
export type OnDemandCost = string;
export interface CoverageCost {
  OnDemandCost?: string;
}
export interface Coverage {
  CoverageHours?: CoverageHours;
  CoverageNormalizedUnits?: CoverageNormalizedUnits;
  CoverageCost?: CoverageCost;
}
export interface ReservationCoverageGroup {
  Attributes?: { [key: string]: string | undefined };
  Coverage?: Coverage;
}
export type ReservationCoverageGroups = ReservationCoverageGroup[];
export interface CoverageByTime {
  TimePeriod?: DateInterval;
  Groups?: ReservationCoverageGroup[];
  Total?: Coverage;
}
export type CoveragesByTime = CoverageByTime[];
export interface GetReservationCoverageResponse {
  CoveragesByTime: CoverageByTime[];
  Total?: Coverage;
  NextPageToken?: string;
}
export type LookbackPeriodInDays =
  | "SEVEN_DAYS"
  | "THIRTY_DAYS"
  | "SIXTY_DAYS"
  | (string & {});
export type OfferingClass = "STANDARD" | "CONVERTIBLE" | (string & {});
export interface EC2Specification {
  OfferingClass?: OfferingClass;
}
export interface ServiceSpecification {
  EC2Specification?: EC2Specification;
}
export type RecommendationsPageSize = number;
export interface GetReservationPurchaseRecommendationRequest {
  AccountId?: string;
  Service: string;
  Filter?: Expression;
  AccountScope?: AccountScope;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  ServiceSpecification?: ServiceSpecification;
  PageSize?: number;
  NextPageToken?: string;
}
export interface ReservationPurchaseRecommendationMetadata {
  RecommendationId?: string;
  GenerationTimestamp?: string;
  AdditionalMetadata?: string;
}
export interface EC2InstanceDetails {
  Family?: string;
  InstanceType?: string;
  Region?: string;
  AvailabilityZone?: string;
  Platform?: string;
  Tenancy?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export interface RDSInstanceDetails {
  Family?: string;
  InstanceType?: string;
  Region?: string;
  DatabaseEngine?: string;
  DatabaseEdition?: string;
  DeploymentOption?: string;
  LicenseModel?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
  DeploymentModel?: string;
}
export interface RedshiftInstanceDetails {
  Family?: string;
  NodeType?: string;
  Region?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export interface ElastiCacheInstanceDetails {
  Family?: string;
  NodeType?: string;
  Region?: string;
  ProductDescription?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export interface ESInstanceDetails {
  InstanceClass?: string;
  InstanceSize?: string;
  Region?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export interface MemoryDBInstanceDetails {
  Family?: string;
  NodeType?: string;
  Region?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export interface InstanceDetails {
  EC2InstanceDetails?: EC2InstanceDetails;
  RDSInstanceDetails?: RDSInstanceDetails;
  RedshiftInstanceDetails?: RedshiftInstanceDetails;
  ElastiCacheInstanceDetails?: ElastiCacheInstanceDetails;
  ESInstanceDetails?: ESInstanceDetails;
  MemoryDBInstanceDetails?: MemoryDBInstanceDetails;
}
export interface DynamoDBCapacityDetails {
  CapacityUnits?: string;
  Region?: string;
}
export interface ReservedCapacityDetails {
  DynamoDBCapacityDetails?: DynamoDBCapacityDetails;
}
export interface ReservationPurchaseRecommendationDetail {
  AccountId?: string;
  InstanceDetails?: InstanceDetails;
  RecommendedNumberOfInstancesToPurchase?: string;
  RecommendedNormalizedUnitsToPurchase?: string;
  MinimumNumberOfInstancesUsedPerHour?: string;
  MinimumNormalizedUnitsUsedPerHour?: string;
  MaximumNumberOfInstancesUsedPerHour?: string;
  MaximumNormalizedUnitsUsedPerHour?: string;
  AverageNumberOfInstancesUsedPerHour?: string;
  AverageNormalizedUnitsUsedPerHour?: string;
  AverageUtilization?: string;
  EstimatedBreakEvenInMonths?: string;
  CurrencyCode?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedMonthlySavingsPercentage?: string;
  EstimatedMonthlyOnDemandCost?: string;
  EstimatedReservationCostForLookbackPeriod?: string;
  UpfrontCost?: string;
  RecurringStandardMonthlyCost?: string;
  ReservedCapacityDetails?: ReservedCapacityDetails;
  RecommendedNumberOfCapacityUnitsToPurchase?: string;
  MinimumNumberOfCapacityUnitsUsedPerHour?: string;
  MaximumNumberOfCapacityUnitsUsedPerHour?: string;
  AverageNumberOfCapacityUnitsUsedPerHour?: string;
}
export type ReservationPurchaseRecommendationDetails =
  ReservationPurchaseRecommendationDetail[];
export interface ReservationPurchaseRecommendationSummary {
  TotalEstimatedMonthlySavingsAmount?: string;
  TotalEstimatedMonthlySavingsPercentage?: string;
  CurrencyCode?: string;
}
export interface ReservationPurchaseRecommendation {
  AccountScope?: AccountScope;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  ServiceSpecification?: ServiceSpecification;
  RecommendationDetails?: ReservationPurchaseRecommendationDetail[];
  RecommendationSummary?: ReservationPurchaseRecommendationSummary;
}
export type ReservationPurchaseRecommendations =
  ReservationPurchaseRecommendation[];
export interface GetReservationPurchaseRecommendationResponse {
  Metadata?: ReservationPurchaseRecommendationMetadata;
  Recommendations?: ReservationPurchaseRecommendation[];
  NextPageToken?: string;
}
export interface GetReservationUtilizationRequest {
  TimePeriod: DateInterval;
  GroupBy?: GroupDefinition[];
  Granularity?: Granularity;
  Filter?: Expression;
  SortBy?: SortDefinition;
  NextPageToken?: string;
  MaxResults?: number;
}
export type ReservationGroupKey = string;
export type ReservationGroupValue = string;
export type UtilizationPercentage = string;
export type UtilizationPercentageInUnits = string;
export type PurchasedHours = string;
export type PurchasedUnits = string;
export type TotalActualHours = string;
export type TotalActualUnits = string;
export type UnusedHours = string;
export type UnusedUnits = string;
export type OnDemandCostOfRIHoursUsed = string;
export type NetRISavings = string;
export type TotalPotentialRISavings = string;
export type AmortizedUpfrontFee = string;
export type AmortizedRecurringFee = string;
export type TotalAmortizedFee = string;
export type RICostForUnusedHours = string;
export type RealizedSavings = string;
export type UnrealizedSavings = string;
export interface ReservationAggregates {
  UtilizationPercentage?: string;
  UtilizationPercentageInUnits?: string;
  PurchasedHours?: string;
  PurchasedUnits?: string;
  TotalActualHours?: string;
  TotalActualUnits?: string;
  UnusedHours?: string;
  UnusedUnits?: string;
  OnDemandCostOfRIHoursUsed?: string;
  NetRISavings?: string;
  TotalPotentialRISavings?: string;
  AmortizedUpfrontFee?: string;
  AmortizedRecurringFee?: string;
  TotalAmortizedFee?: string;
  RICostForUnusedHours?: string;
  RealizedSavings?: string;
  UnrealizedSavings?: string;
}
export interface ReservationUtilizationGroup {
  Key?: string;
  Value?: string;
  Attributes?: { [key: string]: string | undefined };
  Utilization?: ReservationAggregates;
}
export type ReservationUtilizationGroups = ReservationUtilizationGroup[];
export interface UtilizationByTime {
  TimePeriod?: DateInterval;
  Groups?: ReservationUtilizationGroup[];
  Total?: ReservationAggregates;
}
export type UtilizationsByTime = UtilizationByTime[];
export interface GetReservationUtilizationResponse {
  UtilizationsByTime: UtilizationByTime[];
  Total?: ReservationAggregates;
  NextPageToken?: string;
}
export type RecommendationTarget =
  | "SAME_INSTANCE_FAMILY"
  | "CROSS_INSTANCE_FAMILY"
  | (string & {});
export interface RightsizingRecommendationConfiguration {
  RecommendationTarget: RecommendationTarget;
  BenefitsConsidered: boolean;
}
export interface GetRightsizingRecommendationRequest {
  Filter?: Expression;
  Configuration?: RightsizingRecommendationConfiguration;
  Service: string;
  PageSize?: number;
  NextPageToken?: string;
}
export interface RightsizingRecommendationMetadata {
  RecommendationId?: string;
  GenerationTimestamp?: string;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  AdditionalMetadata?: string;
}
export interface RightsizingRecommendationSummary {
  TotalRecommendationCount?: string;
  EstimatedTotalMonthlySavingsAmount?: string;
  SavingsCurrencyCode?: string;
  SavingsPercentage?: string;
}
export type TagValuesList = TagValues[];
export interface EC2ResourceDetails {
  HourlyOnDemandRate?: string;
  InstanceType?: string;
  Platform?: string;
  Region?: string;
  Sku?: string;
  Memory?: string;
  NetworkPerformance?: string;
  Storage?: string;
  Vcpu?: string;
}
export interface ResourceDetails {
  EC2ResourceDetails?: EC2ResourceDetails;
}
export interface EBSResourceUtilization {
  EbsReadOpsPerSecond?: string;
  EbsWriteOpsPerSecond?: string;
  EbsReadBytesPerSecond?: string;
  EbsWriteBytesPerSecond?: string;
}
export interface DiskResourceUtilization {
  DiskReadOpsPerSecond?: string;
  DiskWriteOpsPerSecond?: string;
  DiskReadBytesPerSecond?: string;
  DiskWriteBytesPerSecond?: string;
}
export interface NetworkResourceUtilization {
  NetworkInBytesPerSecond?: string;
  NetworkOutBytesPerSecond?: string;
  NetworkPacketsInPerSecond?: string;
  NetworkPacketsOutPerSecond?: string;
}
export interface EC2ResourceUtilization {
  MaxCpuUtilizationPercentage?: string;
  MaxMemoryUtilizationPercentage?: string;
  MaxStorageUtilizationPercentage?: string;
  EBSResourceUtilization?: EBSResourceUtilization;
  DiskResourceUtilization?: DiskResourceUtilization;
  NetworkResourceUtilization?: NetworkResourceUtilization;
}
export interface ResourceUtilization {
  EC2ResourceUtilization?: EC2ResourceUtilization;
}
export interface CurrentInstance {
  ResourceId?: string;
  InstanceName?: string;
  Tags?: TagValues[];
  ResourceDetails?: ResourceDetails;
  ResourceUtilization?: ResourceUtilization;
  ReservationCoveredHoursInLookbackPeriod?: string;
  SavingsPlansCoveredHoursInLookbackPeriod?: string;
  OnDemandHoursInLookbackPeriod?: string;
  TotalRunningHoursInLookbackPeriod?: string;
  MonthlyCost?: string;
  CurrencyCode?: string;
}
export type RightsizingType = "TERMINATE" | "MODIFY" | (string & {});
export type PlatformDifference =
  | "HYPERVISOR"
  | "NETWORK_INTERFACE"
  | "STORAGE_INTERFACE"
  | "INSTANCE_STORE_AVAILABILITY"
  | "VIRTUALIZATION_TYPE"
  | (string & {});
export type PlatformDifferences = PlatformDifference[];
export interface TargetInstance {
  EstimatedMonthlyCost?: string;
  EstimatedMonthlySavings?: string;
  CurrencyCode?: string;
  DefaultTargetInstance?: boolean;
  ResourceDetails?: ResourceDetails;
  ExpectedResourceUtilization?: ResourceUtilization;
  PlatformDifferences?: PlatformDifference[];
}
export type TargetInstancesList = TargetInstance[];
export interface ModifyRecommendationDetail {
  TargetInstances?: TargetInstance[];
}
export interface TerminateRecommendationDetail {
  EstimatedMonthlySavings?: string;
  CurrencyCode?: string;
}
export type FindingReasonCode =
  | "CPU_OVER_PROVISIONED"
  | "CPU_UNDER_PROVISIONED"
  | "MEMORY_OVER_PROVISIONED"
  | "MEMORY_UNDER_PROVISIONED"
  | "EBS_THROUGHPUT_OVER_PROVISIONED"
  | "EBS_THROUGHPUT_UNDER_PROVISIONED"
  | "EBS_IOPS_OVER_PROVISIONED"
  | "EBS_IOPS_UNDER_PROVISIONED"
  | "NETWORK_BANDWIDTH_OVER_PROVISIONED"
  | "NETWORK_BANDWIDTH_UNDER_PROVISIONED"
  | "NETWORK_PPS_OVER_PROVISIONED"
  | "NETWORK_PPS_UNDER_PROVISIONED"
  | "DISK_IOPS_OVER_PROVISIONED"
  | "DISK_IOPS_UNDER_PROVISIONED"
  | "DISK_THROUGHPUT_OVER_PROVISIONED"
  | "DISK_THROUGHPUT_UNDER_PROVISIONED"
  | (string & {});
export type FindingReasonCodes = FindingReasonCode[];
export interface RightsizingRecommendation {
  AccountId?: string;
  CurrentInstance?: CurrentInstance;
  RightsizingType?: RightsizingType;
  ModifyRecommendationDetail?: ModifyRecommendationDetail;
  TerminateRecommendationDetail?: TerminateRecommendationDetail;
  FindingReasonCodes?: FindingReasonCode[];
}
export type RightsizingRecommendationList = RightsizingRecommendation[];
export interface GetRightsizingRecommendationResponse {
  Metadata?: RightsizingRecommendationMetadata;
  Summary?: RightsizingRecommendationSummary;
  RightsizingRecommendations?: RightsizingRecommendation[];
  NextPageToken?: string;
  Configuration?: RightsizingRecommendationConfiguration;
}
export type RecommendationDetailId = string;
export interface GetSavingsPlanPurchaseRecommendationDetailsRequest {
  RecommendationDetailId: string;
}
export interface RecommendationDetailData {
  AccountScope?: AccountScope;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  SavingsPlansType?: SupportedSavingsPlansType;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  AccountId?: string;
  CurrencyCode?: string;
  InstanceFamily?: string;
  Region?: string;
  OfferingId?: string;
  GenerationTimestamp?: string;
  LatestUsageTimestamp?: string;
  CurrentAverageHourlyOnDemandSpend?: string;
  CurrentMaximumHourlyOnDemandSpend?: string;
  CurrentMinimumHourlyOnDemandSpend?: string;
  EstimatedAverageUtilization?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedOnDemandCost?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
  EstimatedROI?: string;
  EstimatedSPCost?: string;
  EstimatedSavingsAmount?: string;
  EstimatedSavingsPercentage?: string;
  ExistingHourlyCommitment?: string;
  HourlyCommitmentToPurchase?: string;
  UpfrontCost?: string;
  CurrentAverageCoverage?: string;
  EstimatedAverageCoverage?: string;
  MetricsOverLookbackPeriod?: RecommendationDetailHourlyMetrics[];
}
export interface GetSavingsPlanPurchaseRecommendationDetailsResponse {
  RecommendationDetailId?: string;
  RecommendationDetailData?: RecommendationDetailData;
}
export interface GetSavingsPlansCoverageRequest {
  TimePeriod: DateInterval;
  GroupBy?: GroupDefinition[];
  Granularity?: Granularity;
  Filter?: Expression;
  Metrics?: string[];
  NextToken?: string;
  MaxResults?: number;
  SortBy?: SortDefinition;
}
export interface SavingsPlansCoverageData {
  SpendCoveredBySavingsPlans?: string;
  OnDemandCost?: string;
  TotalCost?: string;
  CoveragePercentage?: string;
}
export interface SavingsPlansCoverage {
  Attributes?: { [key: string]: string | undefined };
  Coverage?: SavingsPlansCoverageData;
  TimePeriod?: DateInterval;
}
export type SavingsPlansCoverages = SavingsPlansCoverage[];
export interface GetSavingsPlansCoverageResponse {
  SavingsPlansCoverages: SavingsPlansCoverage[];
  NextToken?: string;
}
export interface GetSavingsPlansPurchaseRecommendationRequest {
  SavingsPlansType: SupportedSavingsPlansType;
  TermInYears: TermInYears;
  PaymentOption: PaymentOption;
  AccountScope?: AccountScope;
  NextPageToken?: string;
  PageSize?: number;
  LookbackPeriodInDays: LookbackPeriodInDays;
  Filter?: Expression;
}
export interface SavingsPlansPurchaseRecommendationMetadata {
  RecommendationId?: string;
  GenerationTimestamp?: string;
  AdditionalMetadata?: string;
}
export interface SavingsPlansDetails {
  Region?: string;
  InstanceFamily?: string;
  OfferingId?: string;
}
export interface SavingsPlansPurchaseRecommendationDetail {
  SavingsPlansDetails?: SavingsPlansDetails;
  AccountId?: string;
  UpfrontCost?: string;
  EstimatedROI?: string;
  CurrencyCode?: string;
  EstimatedSPCost?: string;
  EstimatedOnDemandCost?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
  EstimatedSavingsAmount?: string;
  EstimatedSavingsPercentage?: string;
  HourlyCommitmentToPurchase?: string;
  EstimatedAverageUtilization?: string;
  EstimatedMonthlySavingsAmount?: string;
  CurrentMinimumHourlyOnDemandSpend?: string;
  CurrentMaximumHourlyOnDemandSpend?: string;
  CurrentAverageHourlyOnDemandSpend?: string;
  RecommendationDetailId?: string;
}
export type SavingsPlansPurchaseRecommendationDetailList =
  SavingsPlansPurchaseRecommendationDetail[];
export interface SavingsPlansPurchaseRecommendationSummary {
  EstimatedROI?: string;
  CurrencyCode?: string;
  EstimatedTotalCost?: string;
  CurrentOnDemandSpend?: string;
  EstimatedSavingsAmount?: string;
  TotalRecommendationCount?: string;
  DailyCommitmentToPurchase?: string;
  HourlyCommitmentToPurchase?: string;
  EstimatedSavingsPercentage?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
}
export interface SavingsPlansPurchaseRecommendation {
  AccountScope?: AccountScope;
  SavingsPlansType?: SupportedSavingsPlansType;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  SavingsPlansPurchaseRecommendationDetails?: SavingsPlansPurchaseRecommendationDetail[];
  SavingsPlansPurchaseRecommendationSummary?: SavingsPlansPurchaseRecommendationSummary;
}
export interface GetSavingsPlansPurchaseRecommendationResponse {
  Metadata?: SavingsPlansPurchaseRecommendationMetadata;
  SavingsPlansPurchaseRecommendation?: SavingsPlansPurchaseRecommendation;
  NextPageToken?: string;
}
export interface GetSavingsPlansUtilizationRequest {
  TimePeriod: DateInterval;
  Granularity?: Granularity;
  Filter?: Expression;
  SortBy?: SortDefinition;
}
export interface SavingsPlansUtilization {
  TotalCommitment?: string;
  UsedCommitment?: string;
  UnusedCommitment?: string;
  UtilizationPercentage?: string;
}
export interface SavingsPlansSavings {
  NetSavings?: string;
  OnDemandCostEquivalent?: string;
}
export interface SavingsPlansAmortizedCommitment {
  AmortizedRecurringCommitment?: string;
  AmortizedUpfrontCommitment?: string;
  TotalAmortizedCommitment?: string;
}
export interface SavingsPlansUtilizationByTime {
  TimePeriod: DateInterval;
  Utilization: SavingsPlansUtilization;
  Savings?: SavingsPlansSavings;
  AmortizedCommitment?: SavingsPlansAmortizedCommitment;
}
export type SavingsPlansUtilizationsByTime = SavingsPlansUtilizationByTime[];
export interface SavingsPlansUtilizationAggregates {
  Utilization: SavingsPlansUtilization;
  Savings?: SavingsPlansSavings;
  AmortizedCommitment?: SavingsPlansAmortizedCommitment;
}
export interface GetSavingsPlansUtilizationResponse {
  SavingsPlansUtilizationsByTime?: SavingsPlansUtilizationByTime[];
  Total: SavingsPlansUtilizationAggregates;
}
export type SavingsPlansDataType =
  | "ATTRIBUTES"
  | "UTILIZATION"
  | "AMORTIZED_COMMITMENT"
  | "SAVINGS"
  | (string & {});
export type SavingsPlansDataTypes = SavingsPlansDataType[];
export interface GetSavingsPlansUtilizationDetailsRequest {
  TimePeriod: DateInterval;
  Filter?: Expression;
  DataType?: SavingsPlansDataType[];
  NextToken?: string;
  MaxResults?: number;
  SortBy?: SortDefinition;
}
export type SavingsPlanArn = string;
export interface SavingsPlansUtilizationDetail {
  SavingsPlanArn?: string;
  Attributes?: { [key: string]: string | undefined };
  Utilization?: SavingsPlansUtilization;
  Savings?: SavingsPlansSavings;
  AmortizedCommitment?: SavingsPlansAmortizedCommitment;
}
export type SavingsPlansUtilizationDetails = SavingsPlansUtilizationDetail[];
export interface GetSavingsPlansUtilizationDetailsResponse {
  SavingsPlansUtilizationDetails: SavingsPlansUtilizationDetail[];
  Total?: SavingsPlansUtilizationAggregates;
  TimePeriod: DateInterval;
  NextToken?: string;
}
export interface GetTagsRequest {
  SearchString?: string;
  TimePeriod: DateInterval;
  TagKey?: string;
  Filter?: Expression;
  SortBy?: SortDefinition[];
  BillingViewArn?: string;
  MaxResults?: number;
  NextPageToken?: string;
}
export type Entity = string;
export type TagList = string[];
export interface GetTagsResponse {
  NextPageToken?: string;
  Tags: string[];
  ReturnSize: number;
  TotalSize: number;
}
export interface GetUsageForecastRequest {
  TimePeriod: DateInterval;
  Metric: Metric;
  Granularity: Granularity;
  Filter?: Expression;
  BillingViewArn?: string;
  PredictionIntervalLevel?: number;
}
export interface GetUsageForecastResponse {
  Total?: MetricValue;
  ForecastResultsByTime?: ForecastResult[];
}
export type AnalysesPageSize = number;
export type AnalysisIds = string[];
export interface ListCommitmentPurchaseAnalysesRequest {
  AnalysisStatus?: AnalysisStatus;
  NextPageToken?: string;
  PageSize?: number;
  AnalysisIds?: string[];
}
export interface AnalysisSummary {
  EstimatedCompletionTime?: string;
  AnalysisCompletionTime?: string;
  AnalysisStartedTime?: string;
  AnalysisStatus?: AnalysisStatus;
  ErrorCode?: ErrorCode;
  AnalysisId?: string;
  CommitmentPurchaseAnalysisConfiguration?: CommitmentPurchaseAnalysisConfiguration;
}
export type AnalysisSummaryList = AnalysisSummary[];
export interface ListCommitmentPurchaseAnalysesResponse {
  AnalysisSummaryList?: AnalysisSummary[];
  NextPageToken?: string;
}
export type CostAllocationTagsMaxResults = number;
export interface ListCostAllocationTagBackfillHistoryRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type CostAllocationTagBackfillStatus =
  | "SUCCEEDED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export interface CostAllocationTagBackfillRequest {
  BackfillFrom?: string;
  RequestedAt?: string;
  CompletedAt?: string;
  BackfillStatus?: CostAllocationTagBackfillStatus;
  LastUpdatedAt?: string;
}
export type CostAllocationTagBackfillRequestList =
  CostAllocationTagBackfillRequest[];
export interface ListCostAllocationTagBackfillHistoryResponse {
  BackfillRequests?: CostAllocationTagBackfillRequest[];
  NextToken?: string;
}
export type CostAllocationTagStatus = "Active" | "Inactive" | (string & {});
export type CostAllocationTagKeyList = string[];
export type CostAllocationTagType =
  | "AWSGenerated"
  | "UserDefined"
  | (string & {});
export interface ListCostAllocationTagsRequest {
  Status?: CostAllocationTagStatus;
  TagKeys?: string[];
  Type?: CostAllocationTagType;
  NextToken?: string;
  MaxResults?: number;
}
export interface CostAllocationTag {
  TagKey: string;
  Type: CostAllocationTagType;
  Status: CostAllocationTagStatus;
  LastUpdatedDate?: string;
  LastUsedDate?: string;
}
export type CostAllocationTagList = CostAllocationTag[];
export interface ListCostAllocationTagsResponse {
  CostAllocationTags?: CostAllocationTag[];
  NextToken?: string;
}
export type CostCategoryMaxResults = number;
export type ResourceType = string;
export type ResourceTypesFilterInput = string[];
export interface ListCostCategoryDefinitionsRequest {
  EffectiveOn?: string;
  NextToken?: string;
  MaxResults?: number;
  SupportedResourceTypes?: string[];
}
export type ResourceTypes = string[];
export interface CostCategoryReference {
  CostCategoryArn?: string;
  Name?: string;
  EffectiveStart?: string;
  EffectiveEnd?: string;
  NumberOfRules?: number;
  ProcessingStatus?: CostCategoryProcessingStatus[];
  Values?: string[];
  DefaultValue?: string;
  SupportedResourceTypes?: string[];
}
export type CostCategoryReferencesList = CostCategoryReference[];
export interface ListCostCategoryDefinitionsResponse {
  CostCategoryReferences?: CostCategoryReference[];
  NextToken?: string;
}
export interface ListCostCategoryResourceAssociationsRequest {
  CostCategoryArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type GenericArn = string;
export interface CostCategoryResourceAssociation {
  ResourceArn?: string;
  CostCategoryName?: string;
  CostCategoryArn?: string;
}
export type CostCategoryResourceAssociations =
  CostCategoryResourceAssociation[];
export interface ListCostCategoryResourceAssociationsResponse {
  CostCategoryResourceAssociations?: CostCategoryResourceAssociation[];
  NextToken?: string;
}
export type GenerationStatus =
  | "SUCCEEDED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export type RecommendationId = string;
export type RecommendationIdList = string[];
export interface ListSavingsPlansPurchaseRecommendationGenerationRequest {
  GenerationStatus?: GenerationStatus;
  RecommendationIds?: string[];
  PageSize?: number;
  NextPageToken?: string;
}
export interface GenerationSummary {
  RecommendationId?: string;
  GenerationStatus?: GenerationStatus;
  GenerationStartedTime?: string;
  GenerationCompletionTime?: string;
  EstimatedCompletionTime?: string;
}
export type GenerationSummaryList = GenerationSummary[];
export interface ListSavingsPlansPurchaseRecommendationGenerationResponse {
  GenerationSummaryList?: GenerationSummary[];
  NextPageToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTag[];
}
export interface ProvideAnomalyFeedbackRequest {
  AnomalyId: string;
  Feedback: AnomalyFeedbackType;
}
export interface ProvideAnomalyFeedbackResponse {
  AnomalyId: string;
}
export interface StartCommitmentPurchaseAnalysisRequest {
  CommitmentPurchaseAnalysisConfiguration: CommitmentPurchaseAnalysisConfiguration;
}
export interface StartCommitmentPurchaseAnalysisResponse {
  AnalysisId: string;
  AnalysisStartedTime: string;
  EstimatedCompletionTime: string;
}
export interface StartCostAllocationTagBackfillRequest {
  BackfillFrom: string;
}
export interface StartCostAllocationTagBackfillResponse {
  BackfillRequest?: CostAllocationTagBackfillRequest;
}
export interface StartSavingsPlansPurchaseRecommendationGenerationRequest {}
export interface StartSavingsPlansPurchaseRecommendationGenerationResponse {
  RecommendationId?: string;
  GenerationStartedTime?: string;
  EstimatedCompletionTime?: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  ResourceTags: ResourceTag[];
}
export interface TagResourceResponse {}
export type ResourceTagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  ResourceTagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAnomalyMonitorRequest {
  MonitorArn: string;
  MonitorName?: string;
}
export interface UpdateAnomalyMonitorResponse {
  MonitorArn: string;
}
export interface UpdateAnomalySubscriptionRequest {
  SubscriptionArn: string;
  Threshold?: number;
  Frequency?: AnomalySubscriptionFrequency;
  MonitorArnList?: string[];
  Subscribers?: Subscriber[];
  SubscriptionName?: string;
  ThresholdExpression?: Expression;
}
export interface UpdateAnomalySubscriptionResponse {
  SubscriptionArn: string;
}
export interface CostAllocationTagStatusEntry {
  TagKey: string;
  Status: CostAllocationTagStatus;
}
export type CostAllocationTagStatusList = CostAllocationTagStatusEntry[];
export interface UpdateCostAllocationTagsStatusRequest {
  CostAllocationTagsStatus: CostAllocationTagStatusEntry[];
}
export type ErrorMessage = string;
export interface UpdateCostAllocationTagsStatusError_ {
  TagKey?: string;
  Code?: string;
  Message?: string;
}
export type UpdateCostAllocationTagsStatusErrors =
  UpdateCostAllocationTagsStatusError_[];
export interface UpdateCostAllocationTagsStatusResponse {
  Errors?: UpdateCostAllocationTagsStatusError_[];
}
export interface UpdateCostCategoryDefinitionRequest {
  CostCategoryArn: string;
  EffectiveStart?: string;
  RuleVersion: CostCategoryRuleVersion;
  Rules: CostCategoryRule[];
  DefaultValue?: string;
  SplitChargeRules?: CostCategorySplitChargeRule[];
}
export interface UpdateCostCategoryDefinitionResponse {
  CostCategoryArn?: string;
  EffectiveStart?: string;
}
export type CreateAnomalyMonitorError =
  | LimitExceededException
  | AnomalyMonitorAlreadyExists
  | CommonErrors;
/**
 * Creates a new cost anomaly detection monitor with the requested type and monitor
 * specification.
 */
export const createAnomalyMonitor: API.OperationMethod<
  CreateAnomalyMonitorRequest,
  CreateAnomalyMonitorResponse,
  CreateAnomalyMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AnomalyMonitor: {
        MonitorArn: 0,
        MonitorName: 0,
        CreationDate: 0,
        LastUpdatedDate: 0,
        LastEvaluatedDate: 0,
        MonitorType: 0,
        MonitorDimension: 0,
        MonitorSpecification: i_Expression,
        DimensionalValueCount: 0,
      },
      ResourceTags: D.list(i_ResourceTag),
    },
  },
  errors: [LimitExceededException, AnomalyMonitorAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnomalyMonitor",
})) as any;

export type CreateAnomalySubscriptionError =
  | LimitExceededException
  | UnknownMonitorException
  | AnomalySubscriptionAlreadyExists
  | CommonErrors;
/**
 * Adds an alert subscription to a cost anomaly detection monitor. You can use each
 * subscription to define subscribers with email or SNS notifications. Email subscribers can set
 * an absolute or percentage threshold and a time frequency for receiving notifications.
 */
export const createAnomalySubscription: API.OperationMethod<
  CreateAnomalySubscriptionRequest,
  CreateAnomalySubscriptionResponse,
  CreateAnomalySubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AnomalySubscription: {
        SubscriptionArn: 0,
        AccountId: 0,
        MonitorArnList: 0,
        Subscribers: D.list(i_Subscriber),
        Threshold: 0,
        Frequency: 0,
        SubscriptionName: 0,
        ThresholdExpression: i_Expression,
      },
      ResourceTags: D.list(i_ResourceTag),
    },
  },
  errors: [
    LimitExceededException,
    UnknownMonitorException,
    AnomalySubscriptionAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnomalySubscription",
})) as any;

export type CreateCostCategoryDefinitionError =
  | LimitExceededException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new cost category with the requested name and rules.
 */
export const createCostCategoryDefinition: API.OperationMethod<
  CreateCostCategoryDefinitionRequest,
  CreateCostCategoryDefinitionResponse,
  CreateCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      EffectiveStart: 0,
      RuleVersion: 0,
      Rules: D.list(i_CostCategoryRule),
      DefaultValue: 0,
      SplitChargeRules: D.list(i_CostCategorySplitChargeRule),
      ResourceTags: D.list(i_ResourceTag),
    },
  },
  errors: [LimitExceededException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCostCategoryDefinition",
})) as any;

export type DeleteAnomalyMonitorError =
  | LimitExceededException
  | UnknownMonitorException
  | CommonErrors;
/**
 * Deletes a cost anomaly monitor.
 */
export const deleteAnomalyMonitor: API.OperationMethod<
  DeleteAnomalyMonitorRequest,
  DeleteAnomalyMonitorResponse,
  DeleteAnomalyMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MonitorArn: 0 } },
  errors: [LimitExceededException, UnknownMonitorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalyMonitor",
})) as any;

export type DeleteAnomalySubscriptionError =
  | LimitExceededException
  | UnknownSubscriptionException
  | CommonErrors;
/**
 * Deletes a cost anomaly subscription.
 */
export const deleteAnomalySubscription: API.OperationMethod<
  DeleteAnomalySubscriptionRequest,
  DeleteAnomalySubscriptionResponse,
  DeleteAnomalySubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SubscriptionArn: 0 } },
  errors: [LimitExceededException, UnknownSubscriptionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalySubscription",
})) as any;

export type DeleteCostCategoryDefinitionError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a cost category. Expenses from this month going forward will no longer be
 * categorized with this cost category.
 */
export const deleteCostCategoryDefinition: API.OperationMethod<
  DeleteCostCategoryDefinitionRequest,
  DeleteCostCategoryDefinitionResponse,
  DeleteCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CostCategoryArn: 0 } },
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCostCategoryDefinition",
})) as any;

export type DescribeCostCategoryDefinitionError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the name, Amazon Resource Name (ARN), rules, definition, and effective dates of a
 * cost category that's defined in the account.
 *
 * You have the option to use `EffectiveOn` to return a cost category that's
 * active on a specific date. If there's no `EffectiveOn` specified, you see a Cost
 * Category that's effective on the current date. If cost category is still effective,
 * `EffectiveEnd` is omitted in the response.
 */
export const describeCostCategoryDefinition: API.OperationMethod<
  DescribeCostCategoryDefinitionRequest,
  DescribeCostCategoryDefinitionResponse,
  DescribeCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { CostCategoryArn: 0, EffectiveOn: 0 } },
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCostCategoryDefinition",
})) as any;

export type GetAnomaliesError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves all of the cost anomalies detected on your account during the time period that's
 * specified by the `DateInterval` object. Anomalies are available for up to 90
 * days.
 */
export const getAnomalies: API.PaginatedOperationMethod<
  GetAnomaliesRequest,
  GetAnomaliesResponse,
  GetAnomaliesError,
  Credentials | HttpClient.HttpClient,
  Anomaly
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MonitorArn: 0,
      DateInterval: { StartDate: 0, EndDate: 0 },
      Feedback: 0,
      TotalImpact: { NumericOperator: 0, StartValue: 0, EndValue: 0 },
      NextPageToken: 0,
      MaxResults: 0,
    },
  },
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnomalies",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "Anomalies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetAnomalyMonitorsError =
  | InvalidNextTokenException
  | LimitExceededException
  | UnknownMonitorException
  | CommonErrors;
/**
 * Retrieves the cost anomaly monitor definitions for your account. You can filter using a
 * list of cost anomaly monitor Amazon Resource Names (ARNs).
 */
export const getAnomalyMonitors: API.PaginatedOperationMethod<
  GetAnomalyMonitorsRequest,
  GetAnomalyMonitorsResponse,
  GetAnomalyMonitorsError,
  Credentials | HttpClient.HttpClient,
  AnomalyMonitor
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MonitorArnList: 0, NextPageToken: 0, MaxResults: 0 },
  },
  errors: [
    InvalidNextTokenException,
    LimitExceededException,
    UnknownMonitorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnomalyMonitors",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "AnomalyMonitors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetAnomalySubscriptionsError =
  | InvalidNextTokenException
  | LimitExceededException
  | UnknownSubscriptionException
  | CommonErrors;
/**
 * Retrieves the cost anomaly subscription objects for your account. You can filter using a
 * list of cost anomaly monitor Amazon Resource Names (ARNs).
 */
export const getAnomalySubscriptions: API.PaginatedOperationMethod<
  GetAnomalySubscriptionsRequest,
  GetAnomalySubscriptionsResponse,
  GetAnomalySubscriptionsError,
  Credentials | HttpClient.HttpClient,
  AnomalySubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionArnList: 0,
      MonitorArn: 0,
      NextPageToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    InvalidNextTokenException,
    LimitExceededException,
    UnknownSubscriptionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnomalySubscriptions",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "AnomalySubscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetApproximateUsageRecordsError =
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves estimated usage records for hourly granularity or resource-level data at daily
 * granularity.
 */
export const getApproximateUsageRecords: API.OperationMethod<
  GetApproximateUsageRecordsRequest,
  GetApproximateUsageRecordsResponse,
  GetApproximateUsageRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Granularity: 0, Services: 0, ApproximationDimension: 0 },
  },
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApproximateUsageRecords",
})) as any;

export type GetCommitmentPurchaseAnalysisError =
  | AnalysisNotFoundException
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves a commitment purchase analysis result based on the
 * `AnalysisId`.
 */
export const getCommitmentPurchaseAnalysis: API.OperationMethod<
  GetCommitmentPurchaseAnalysisRequest,
  GetCommitmentPurchaseAnalysisResponse,
  GetCommitmentPurchaseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AnalysisId: 0 } },
  errors: [
    AnalysisNotFoundException,
    DataUnavailableException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommitmentPurchaseAnalysis",
})) as any;

export type GetCostAndUsageError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves cost and usage metrics for your account. You can specify which cost and
 * usage-related metric that you want the request to return. For example, you can specify
 * `BlendedCosts` or `UsageQuantity`. You can also filter and group your
 * data by various dimensions, such as `SERVICE` or `AZ`, in a specific
 * time range. For a complete list of valid dimensions, see the GetDimensionValues operation. Management account in an organization in Organizations have access to all member accounts.
 *
 * For information about filter limitations, see Quotas and restrictions
 * in the *Billing and Cost Management User Guide*.
 */
export const getCostAndUsage: API.OperationMethod<
  GetCostAndUsageRequest,
  GetCostAndUsageResponse,
  GetCostAndUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      Granularity: 0,
      Filter: i_Expression,
      Metrics: 0,
      GroupBy: D.list(i_GroupDefinition),
      BillingViewArn: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostAndUsage",
})) as any;

export type GetCostAndUsageComparisonsError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves cost and usage comparisons for your account between two periods within the last
 * 13 months. If you have enabled multi-year data at monthly granularity, you can go back up to
 * 38 months.
 */
export const getCostAndUsageComparisons: API.PaginatedOperationMethod<
  GetCostAndUsageComparisonsRequest,
  GetCostAndUsageComparisonsResponse,
  GetCostAndUsageComparisonsError,
  Credentials | HttpClient.HttpClient,
  CostAndUsageComparison
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      BillingViewArn: 0,
      BaselineTimePeriod: i_DateInterval,
      ComparisonTimePeriod: i_DateInterval,
      MetricForComparison: 0,
      Filter: i_Expression,
      GroupBy: D.list(i_GroupDefinition),
      MaxResults: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostAndUsageComparisons",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "CostAndUsageComparisons",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCostAndUsageWithResourcesError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves cost and usage metrics with resources for your account. You can specify which
 * cost and usage-related metric, such as `BlendedCosts` or
 * `UsageQuantity`, that you want the request to return. You can also filter and group
 * your data by various dimensions, such as `SERVICE` or `AZ`, in a
 * specific time range. For a complete list of valid dimensions, see the GetDimensionValues operation. Management account in an organization in Organizations have access to all member accounts.
 *
 * Hourly granularity is only available for EC2-Instances (Elastic Compute Cloud)
 * resource-level data. All other resource-level data is available at daily
 * granularity.
 *
 * This is an opt-in only feature. You can enable this feature from the Cost Explorer
 * Settings page. For information about how to access the Settings page, see Controlling
 * Access for Cost Explorer in the Billing and Cost Management User
 * Guide.
 */
export const getCostAndUsageWithResources: API.OperationMethod<
  GetCostAndUsageWithResourcesRequest,
  GetCostAndUsageWithResourcesResponse,
  GetCostAndUsageWithResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      Granularity: 0,
      Filter: i_Expression,
      Metrics: 0,
      GroupBy: D.list(i_GroupDefinition),
      BillingViewArn: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostAndUsageWithResources",
})) as any;

export type GetCostCategoriesError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves an array of cost category names and values incurred cost.
 *
 * If some cost category names and values are not associated with any cost, they will not
 * be returned by this API.
 */
export const getCostCategories: API.OperationMethod<
  GetCostCategoriesRequest,
  GetCostCategoriesResponse,
  GetCostCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SearchString: 0,
      TimePeriod: i_DateInterval,
      CostCategoryName: 0,
      Filter: i_Expression,
      SortBy: D.list(i_SortDefinition),
      BillingViewArn: 0,
      MaxResults: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostCategories",
})) as any;

export type GetCostComparisonDriversError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves key factors driving cost changes between two time periods within the last 13
 * months, such as usage changes, discount changes, and commitment-based savings. If you have
 * enabled multi-year data at monthly granularity, you can go back up to 38 months.
 */
export const getCostComparisonDrivers: API.PaginatedOperationMethod<
  GetCostComparisonDriversRequest,
  GetCostComparisonDriversResponse,
  GetCostComparisonDriversError,
  Credentials | HttpClient.HttpClient,
  CostComparisonDriver
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      BillingViewArn: 0,
      BaselineTimePeriod: i_DateInterval,
      ComparisonTimePeriod: i_DateInterval,
      MetricForComparison: 0,
      Filter: i_Expression,
      GroupBy: D.list(i_GroupDefinition),
      MaxResults: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostComparisonDrivers",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "CostComparisonDrivers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCostForecastError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a forecast for how much Amazon Web Services predicts that you will spend over
 * the forecast time period that you select, based on your past costs.
 */
export const getCostForecast: API.OperationMethod<
  GetCostForecastRequest,
  GetCostForecastResponse,
  GetCostForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      Metric: 0,
      Granularity: 0,
      Filter: i_Expression,
      BillingViewArn: 0,
      PredictionIntervalLevel: 0,
    },
  },
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostForecast",
})) as any;

export type GetDimensionValuesError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves all available filter values for a specified filter over a period of time. You
 * can search the dimension values for an arbitrary string.
 */
export const getDimensionValues: API.OperationMethod<
  GetDimensionValuesRequest,
  GetDimensionValuesResponse,
  GetDimensionValuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SearchString: 0,
      TimePeriod: i_DateInterval,
      Dimension: 0,
      Context: 0,
      Filter: i_Expression,
      SortBy: D.list(i_SortDefinition),
      BillingViewArn: 0,
      MaxResults: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDimensionValues",
})) as any;

export type GetReservationCoverageError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the reservation coverage for your account, which you can use to see how much
 * of your Amazon Elastic Compute Cloud, Amazon ElastiCache, Amazon Relational Database Service,
 * or Amazon Redshift usage is covered by a reservation. An organization's management account can
 * see the coverage of the associated member accounts. This supports dimensions, cost categories,
 * and nested expressions. For any time period, you can filter data about reservation usage by
 * the following dimensions:
 *
 * - AZ
 *
 * - CACHE_ENGINE
 *
 * - DATABASE_ENGINE
 *
 * - DEPLOYMENT_OPTION
 *
 * - INSTANCE_TYPE
 *
 * - LINKED_ACCOUNT
 *
 * - OPERATING_SYSTEM
 *
 * - PLATFORM
 *
 * - REGION
 *
 * - SERVICE
 *
 * - TAG
 *
 * - TENANCY
 *
 * To determine valid values for a dimension, use the `GetDimensionValues`
 * operation.
 */
export const getReservationCoverage: API.OperationMethod<
  GetReservationCoverageRequest,
  GetReservationCoverageResponse,
  GetReservationCoverageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      GroupBy: D.list(i_GroupDefinition),
      Granularity: 0,
      Filter: i_Expression,
      Metrics: 0,
      NextPageToken: 0,
      SortBy: i_SortDefinition,
      MaxResults: 0,
    },
  },
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationCoverage",
})) as any;

export type GetReservationPurchaseRecommendationError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets recommendations for reservation purchases. These recommendations might help you to
 * reduce your costs. Reservations provide a discounted hourly rate (up to 75%) compared to
 * On-Demand pricing.
 *
 * Amazon Web Services generates your recommendations by identifying your On-Demand usage
 * during a specific time period and collecting your usage into categories that are eligible for
 * a reservation. After Amazon Web Services has these categories, it simulates every combination
 * of reservations in each category of usage to identify the best number of each type of Reserved
 * Instance (RI) to purchase to maximize your estimated savings.
 *
 * For example, Amazon Web Services automatically aggregates your Amazon EC2 Linux, shared
 * tenancy, and c4 family usage in the US West (Oregon) Region and recommends that you buy
 * size-flexible regional reservations to apply to the c4 family usage. Amazon Web Services
 * recommends the smallest size instance in an instance family. This makes it easier to purchase
 * a size-flexible Reserved Instance (RI). Amazon Web Services also shows the equal number of
 * normalized units. This way, you can purchase any instance size that you want. For this
 * example, your RI recommendation is for `c4.large` because that is the smallest size
 * instance in the c4 instance family.
 */
export const getReservationPurchaseRecommendation: API.PaginatedOperationMethod<
  GetReservationPurchaseRecommendationRequest,
  GetReservationPurchaseRecommendationResponse,
  GetReservationPurchaseRecommendationError,
  Credentials | HttpClient.HttpClient,
  ReservationPurchaseRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      AccountId: 0,
      Service: 0,
      Filter: i_Expression,
      AccountScope: 0,
      LookbackPeriodInDays: 0,
      TermInYears: 0,
      PaymentOption: 0,
      ServiceSpecification: { EC2Specification: { OfferingClass: 0 } },
      PageSize: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationPurchaseRecommendation",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "Recommendations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetReservationUtilizationError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the reservation utilization for your account. Management account in an
 * organization have access to member accounts. You can filter data by dimensions in a time
 * period. You can use `GetDimensionValues` to determine the possible dimension
 * values. Currently, you can group only by `SUBSCRIPTION_ID`.
 */
export const getReservationUtilization: API.OperationMethod<
  GetReservationUtilizationRequest,
  GetReservationUtilizationResponse,
  GetReservationUtilizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      GroupBy: D.list(i_GroupDefinition),
      Granularity: 0,
      Filter: i_Expression,
      SortBy: i_SortDefinition,
      NextPageToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationUtilization",
})) as any;

export type GetRightsizingRecommendationError =
  | InvalidNextTokenException
  | LimitExceededException
  | RightsizingRecommendationNotEnabled
  | CommonErrors;
/**
 * Creates recommendations that help you save cost by identifying idle and underutilized
 * Amazon EC2 instances.
 *
 * Recommendations are generated to either downsize or terminate instances, along with
 * providing savings detail and metrics. For more information about calculation and function, see
 * Optimizing Your Cost with Rightsizing Recommendations in the *Billing and Cost Management User Guide*.
 */
export const getRightsizingRecommendation: API.PaginatedOperationMethod<
  GetRightsizingRecommendationRequest,
  GetRightsizingRecommendationResponse,
  GetRightsizingRecommendationError,
  Credentials | HttpClient.HttpClient,
  RightsizingRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filter: i_Expression,
      Configuration: { RecommendationTarget: 0, BenefitsConsidered: 0 },
      Service: 0,
      PageSize: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    InvalidNextTokenException,
    LimitExceededException,
    RightsizingRecommendationNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRightsizingRecommendation",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "RightsizingRecommendations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetSavingsPlanPurchaseRecommendationDetailsError =
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the details for a Savings Plan recommendation. These details include the hourly
 * data-points that construct the cost, coverage, and utilization charts.
 */
export const getSavingsPlanPurchaseRecommendationDetails: API.OperationMethod<
  GetSavingsPlanPurchaseRecommendationDetailsRequest,
  GetSavingsPlanPurchaseRecommendationDetailsResponse,
  GetSavingsPlanPurchaseRecommendationDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { RecommendationDetailId: 0 } },
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlanPurchaseRecommendationDetails",
})) as any;

export type GetSavingsPlansCoverageError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the Savings Plans covered for your account. This enables you to see how much of
 * your cost is covered by a Savings Plan. An organization’s management account can see the
 * coverage of the associated member accounts. This supports dimensions, cost categories, and
 * nested expressions. For any time period, you can filter data for Savings Plans usage with the
 * following dimensions:
 *
 * - `LINKED_ACCOUNT`
 *
 * - `REGION`
 *
 * - `SERVICE`
 *
 * - `INSTANCE_FAMILY`
 *
 * To determine valid values for a dimension, use the `GetDimensionValues`
 * operation.
 */
export const getSavingsPlansCoverage: API.PaginatedOperationMethod<
  GetSavingsPlansCoverageRequest,
  GetSavingsPlansCoverageResponse,
  GetSavingsPlansCoverageError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      GroupBy: D.list(i_GroupDefinition),
      Granularity: 0,
      Filter: i_Expression,
      Metrics: 0,
      NextToken: 0,
      MaxResults: 0,
      SortBy: i_SortDefinition,
    },
  },
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansCoverage",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSavingsPlansPurchaseRecommendationError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the Savings Plans recommendations for your account. First use
 * `StartSavingsPlansPurchaseRecommendationGeneration` to generate a new set of
 * recommendations, and then use `GetSavingsPlansPurchaseRecommendation` to retrieve
 * them.
 */
export const getSavingsPlansPurchaseRecommendation: API.OperationMethod<
  GetSavingsPlansPurchaseRecommendationRequest,
  GetSavingsPlansPurchaseRecommendationResponse,
  GetSavingsPlansPurchaseRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SavingsPlansType: 0,
      TermInYears: 0,
      PaymentOption: 0,
      AccountScope: 0,
      NextPageToken: 0,
      PageSize: 0,
      LookbackPeriodInDays: 0,
      Filter: i_Expression,
    },
  },
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansPurchaseRecommendation",
})) as any;

export type GetSavingsPlansUtilizationError =
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the Savings Plans utilization for your account across date ranges with daily or
 * monthly granularity. Management account in an organization have access to member accounts. You
 * can use `GetDimensionValues` in `SAVINGS_PLANS` to determine the
 * possible dimension values.
 *
 * You can't group by any dimension values for
 * `GetSavingsPlansUtilization`.
 */
export const getSavingsPlansUtilization: API.OperationMethod<
  GetSavingsPlansUtilizationRequest,
  GetSavingsPlansUtilizationResponse,
  GetSavingsPlansUtilizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      Granularity: 0,
      Filter: i_Expression,
      SortBy: i_SortDefinition,
    },
  },
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansUtilization",
})) as any;

export type GetSavingsPlansUtilizationDetailsError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves attribute data along with aggregate utilization and savings data for a given
 * time period. This doesn't support granular or grouped data (daily/monthly) in response. You
 * can't retrieve data by dates in a single response similar to
 * `GetSavingsPlanUtilization`, but you have the option to make multiple calls to
 * `GetSavingsPlanUtilizationDetails` by providing individual dates. You can use
 * `GetDimensionValues` in `SAVINGS_PLANS` to determine the possible
 * dimension values.
 *
 * `GetSavingsPlanUtilizationDetails` internally groups data by
 * `SavingsPlansArn`.
 */
export const getSavingsPlansUtilizationDetails: API.PaginatedOperationMethod<
  GetSavingsPlansUtilizationDetailsRequest,
  GetSavingsPlansUtilizationDetailsResponse,
  GetSavingsPlansUtilizationDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      Filter: i_Expression,
      DataType: 0,
      NextToken: 0,
      MaxResults: 0,
      SortBy: i_SortDefinition,
    },
  },
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansUtilizationDetails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTagsError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Queries for available tag keys and tag values for a specified period. You can search
 * the tag values for an arbitrary string.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  GetTagsResponse,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SearchString: 0,
      TimePeriod: i_DateInterval,
      TagKey: 0,
      Filter: i_Expression,
      SortBy: D.list(i_SortDefinition),
      BillingViewArn: 0,
      MaxResults: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
})) as any;

export type GetUsageForecastError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | LimitExceededException
  | ResourceNotFoundException
  | UnresolvableUsageUnitException
  | CommonErrors;
/**
 * Retrieves a forecast for how much Amazon Web Services predicts that you will use
 * over the forecast time period that you select, based on your past usage.
 */
export const getUsageForecast: API.OperationMethod<
  GetUsageForecastRequest,
  GetUsageForecastResponse,
  GetUsageForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TimePeriod: i_DateInterval,
      Metric: 0,
      Granularity: 0,
      Filter: i_Expression,
      BillingViewArn: 0,
      PredictionIntervalLevel: 0,
    },
  },
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    LimitExceededException,
    ResourceNotFoundException,
    UnresolvableUsageUnitException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageForecast",
})) as any;

export type ListCommitmentPurchaseAnalysesError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the commitment purchase analyses for your account.
 */
export const listCommitmentPurchaseAnalyses: API.PaginatedOperationMethod<
  ListCommitmentPurchaseAnalysesRequest,
  ListCommitmentPurchaseAnalysesResponse,
  ListCommitmentPurchaseAnalysesError,
  Credentials | HttpClient.HttpClient,
  AnalysisSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { AnalysisStatus: 0, NextPageToken: 0, PageSize: 0, AnalysisIds: 0 },
  },
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommitmentPurchaseAnalyses",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "AnalysisSummaryList",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListCostAllocationTagBackfillHistoryError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves a list of your historical cost allocation tag backfill requests.
 */
export const listCostAllocationTagBackfillHistory: API.PaginatedOperationMethod<
  ListCostAllocationTagBackfillHistoryRequest,
  ListCostAllocationTagBackfillHistoryResponse,
  ListCostAllocationTagBackfillHistoryError,
  Credentials | HttpClient.HttpClient,
  CostAllocationTagBackfillRequest
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostAllocationTagBackfillHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackfillRequests",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCostAllocationTagsError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Get a list of cost allocation tags. All inputs in the API are optional and serve as
 * filters. By default, all cost allocation tags are returned.
 */
export const listCostAllocationTags: API.PaginatedOperationMethod<
  ListCostAllocationTagsRequest,
  ListCostAllocationTagsResponse,
  ListCostAllocationTagsError,
  Credentials | HttpClient.HttpClient,
  CostAllocationTag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Status: 0, TagKeys: 0, Type: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostAllocationTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CostAllocationTags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCostCategoryDefinitionsError =
  | LimitExceededException
  | CommonErrors;
/**
 * Returns the name, Amazon Resource Name (ARN), `NumberOfRules` and effective
 * dates of all cost categories defined in the account. You have the option to use
 * `EffectiveOn` and `SupportedResourceTypes` to return a list of cost categories that were active on a specific
 * date. If there is no `EffectiveOn` specified, you’ll see cost categories that are
 * effective on the current date. If cost category is still effective, `EffectiveEnd`
 * is omitted in the response. `ListCostCategoryDefinitions` supports pagination. The
 * request can have a `MaxResults` range up to 100.
 */
export const listCostCategoryDefinitions: API.PaginatedOperationMethod<
  ListCostCategoryDefinitionsRequest,
  ListCostCategoryDefinitionsResponse,
  ListCostCategoryDefinitionsError,
  Credentials | HttpClient.HttpClient,
  CostCategoryReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      EffectiveOn: 0,
      NextToken: 0,
      MaxResults: 0,
      SupportedResourceTypes: 0,
    },
  },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostCategoryDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CostCategoryReferences",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCostCategoryResourceAssociationsError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns resource associations of all cost categories defined in the account. You have the option to use `CostCategoryArn` to get the association for a specific cost category. `ListCostCategoryResourceAssociations` supports pagination. The request can have a `MaxResults` range up to 100.
 */
export const listCostCategoryResourceAssociations: API.PaginatedOperationMethod<
  ListCostCategoryResourceAssociationsRequest,
  ListCostCategoryResourceAssociationsResponse,
  ListCostCategoryResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  CostCategoryResourceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { CostCategoryArn: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostCategoryResourceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CostCategoryResourceAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSavingsPlansPurchaseRecommendationGenerationError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves a list of your historical recommendation generations within the past 30
 * days.
 */
export const listSavingsPlansPurchaseRecommendationGeneration: API.PaginatedOperationMethod<
  ListSavingsPlansPurchaseRecommendationGenerationRequest,
  ListSavingsPlansPurchaseRecommendationGenerationResponse,
  ListSavingsPlansPurchaseRecommendationGenerationError,
  Credentials | HttpClient.HttpClient,
  GenerationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      GenerationStatus: 0,
      RecommendationIds: 0,
      PageSize: 0,
      NextPageToken: 0,
    },
  },
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSavingsPlansPurchaseRecommendationGeneration",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "GenerationSummaryList",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of resource tags associated with the resource specified by the Amazon
 * Resource Name (ARN).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ProvideAnomalyFeedbackError = LimitExceededException | CommonErrors;
/**
 * Modifies the feedback property of a given cost anomaly.
 */
export const provideAnomalyFeedback: API.OperationMethod<
  ProvideAnomalyFeedbackRequest,
  ProvideAnomalyFeedbackResponse,
  ProvideAnomalyFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AnomalyId: 0, Feedback: 0 } },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvideAnomalyFeedback",
})) as any;

export type StartCommitmentPurchaseAnalysisError =
  | DataUnavailableException
  | GenerationExistsException
  | LimitExceededException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Specifies the parameters of a planned commitment purchase and starts the generation of the
 * analysis. This enables you to estimate the cost, coverage, and utilization impact of your
 * planned commitment purchases.
 */
export const startCommitmentPurchaseAnalysis: API.OperationMethod<
  StartCommitmentPurchaseAnalysisRequest,
  StartCommitmentPurchaseAnalysisResponse,
  StartCommitmentPurchaseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CommitmentPurchaseAnalysisConfiguration: {
        SavingsPlansPurchaseAnalysisConfiguration: {
          AccountScope: 0,
          AccountId: 0,
          AnalysisType: 0,
          SavingsPlansToAdd: D.list({
            PaymentOption: 0,
            SavingsPlansType: 0,
            Region: 0,
            InstanceFamily: 0,
            TermInYears: 0,
            SavingsPlansCommitment: 0,
            OfferingId: 0,
          }),
          SavingsPlansToExclude: 0,
          LookBackTimePeriod: i_DateInterval,
          SavingsPlansTargetCoverage: 0,
        },
      },
    },
  },
  errors: [
    DataUnavailableException,
    GenerationExistsException,
    LimitExceededException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCommitmentPurchaseAnalysis",
})) as any;

export type StartCostAllocationTagBackfillError =
  | BackfillLimitExceededException
  | LimitExceededException
  | CommonErrors;
/**
 * Request a cost allocation tag backfill. This will backfill the activation status (either `active` or `inactive`) for all tag keys from `para:BackfillFrom` up to the time this request is made.
 *
 * You can request a backfill once every 24 hours.
 */
export const startCostAllocationTagBackfill: API.OperationMethod<
  StartCostAllocationTagBackfillRequest,
  StartCostAllocationTagBackfillResponse,
  StartCostAllocationTagBackfillError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { BackfillFrom: 0 } },
  errors: [BackfillLimitExceededException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCostAllocationTagBackfill",
})) as any;

export type StartSavingsPlansPurchaseRecommendationGenerationError =
  | DataUnavailableException
  | GenerationExistsException
  | LimitExceededException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Requests a Savings Plans recommendation generation. This enables you to calculate a fresh
 * set of Savings Plans recommendations that takes your latest usage data and current Savings
 * Plans inventory into account. You can refresh Savings Plans recommendations up to three times
 * daily for a consolidated billing family.
 *
 * `StartSavingsPlansPurchaseRecommendationGeneration` has no request syntax
 * because no input parameters are needed to support this operation.
 */
export const startSavingsPlansPurchaseRecommendationGeneration: API.OperationMethod<
  StartSavingsPlansPurchaseRecommendationGenerationRequest,
  StartSavingsPlansPurchaseRecommendationGenerationResponse,
  StartSavingsPlansPurchaseRecommendationGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    DataUnavailableException,
    GenerationExistsException,
    LimitExceededException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSavingsPlansPurchaseRecommendationGeneration",
})) as any;

export type TagResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * An API operation for adding one or more tags (key-value pairs) to a resource.
 *
 * You can use the `TagResource` operation with a resource that already has tags.
 * If you specify a new tag key for the resource, this tag is appended to the list of tags
 * associated with the resource. If you specify a tag key that is already associated with the
 * resource, the new tag value you specify replaces the previous value for that tag.
 *
 * Although the maximum number of array members is 200, user-tag maximum is 50. The remaining
 * are reserved for Amazon Web Services use.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, ResourceTags: D.list(i_ResourceTag) },
  },
  errors: [
    LimitExceededException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from a resource. Specify only tag keys in your request. Don't
 * specify the value.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, ResourceTagKeys: 0 } },
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAnomalyMonitorError =
  | LimitExceededException
  | UnknownMonitorException
  | CommonErrors;
/**
 * Updates an existing cost anomaly monitor. The changes made are applied going forward, and
 * doesn't change anomalies detected in the past.
 */
export const updateAnomalyMonitor: API.OperationMethod<
  UpdateAnomalyMonitorRequest,
  UpdateAnomalyMonitorResponse,
  UpdateAnomalyMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { MonitorArn: 0, MonitorName: 0 } },
  errors: [LimitExceededException, UnknownMonitorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomalyMonitor",
})) as any;

export type UpdateAnomalySubscriptionError =
  | LimitExceededException
  | UnknownMonitorException
  | UnknownSubscriptionException
  | CommonErrors;
/**
 * Updates an existing cost anomaly subscription. Specify the fields that you want to update.
 * Omitted fields are unchanged.
 *
 * The JSON below describes the generic construct for each type. See Request Parameters for possible values as they apply to
 * `AnomalySubscription`.
 */
export const updateAnomalySubscription: API.OperationMethod<
  UpdateAnomalySubscriptionRequest,
  UpdateAnomalySubscriptionResponse,
  UpdateAnomalySubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SubscriptionArn: 0,
      Threshold: 0,
      Frequency: 0,
      MonitorArnList: 0,
      Subscribers: D.list(i_Subscriber),
      SubscriptionName: 0,
      ThresholdExpression: i_Expression,
    },
  },
  errors: [
    LimitExceededException,
    UnknownMonitorException,
    UnknownSubscriptionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomalySubscription",
})) as any;

export type UpdateCostAllocationTagsStatusError =
  | LimitExceededException
  | CommonErrors;
/**
 * Updates status for cost allocation tags in bulk, with maximum batch size of 20. If the tag
 * status that's updated is the same as the existing tag status, the request doesn't fail.
 * Instead, it doesn't have any effect on the tag status (for example, activating the active
 * tag).
 */
export const updateCostAllocationTagsStatus: API.OperationMethod<
  UpdateCostAllocationTagsStatusRequest,
  UpdateCostAllocationTagsStatusResponse,
  UpdateCostAllocationTagsStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { CostAllocationTagsStatus: D.list({ TagKey: 0, Status: 0 }) },
  },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCostAllocationTagsStatus",
})) as any;

export type UpdateCostCategoryDefinitionError =
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Updates an existing cost category. Changes made to the cost category rules will be used to
 * categorize the current month’s expenses and future expenses. This won’t change categorization
 * for the previous months.
 */
export const updateCostCategoryDefinition: API.OperationMethod<
  UpdateCostCategoryDefinitionRequest,
  UpdateCostCategoryDefinitionResponse,
  UpdateCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CostCategoryArn: 0,
      EffectiveStart: 0,
      RuleVersion: 0,
      Rules: D.list(i_CostCategoryRule),
      DefaultValue: 0,
      SplitChargeRules: D.list(i_CostCategorySplitChargeRule),
    },
  },
  errors: [
    LimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCostCategoryDefinition",
})) as any;

const i_CostCategoryRule: D.LazyStruct = () => ({
  Value: 0,
  Rule: i_Expression,
  InheritedValue: { DimensionName: 0, DimensionKey: 0 },
  Type: 0,
});
const i_CostCategorySplitChargeRule: D.LazyStruct = () => ({
  Source: 0,
  Targets: 0,
  Method: 0,
  Parameters: D.list({ Type: 0, Values: 0 }),
});
const i_DateInterval: D.LazyStruct = () => ({ Start: 0, End: 0 });
const i_Expression: D.LazyStruct = () => ({
  Or: D.list(i_Expression),
  And: D.list(i_Expression),
  Not: i_Expression,
  Dimensions: { Key: 0, Values: 0, MatchOptions: 0 },
  Tags: { Key: 0, Values: 0, MatchOptions: 0 },
  CostCategories: { Key: 0, Values: 0, MatchOptions: 0 },
});
const i_GroupDefinition: D.LazyStruct = () => ({ Type: 0, Key: 0 });
const i_ResourceTag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_SortDefinition: D.LazyStruct = () => ({ Key: 0, SortOrder: 0 });
const i_Subscriber: D.LazyStruct = () => ({ Address: 0, Type: 0, Status: 0 });
