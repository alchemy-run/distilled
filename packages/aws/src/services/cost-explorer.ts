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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Cost Explorer",
  serviceShapeName: "AWSInsightsIndexService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "ce" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-10-25");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }] });
    const _p1 = (_0: unknown) => ({
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
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
              { authSchemes: [{ name: "sigv4", signingRegion: "cn-northwest-1" }] },
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
              { authSchemes: [{ name: "sigv4", signingRegion: "us-iso-east-1" }] },
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
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isob-east-1" }] },
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
              { authSchemes: [{ name: "sigv4", signingRegion: "eu-isoe-west-1" }] },
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
              { authSchemes: [{ name: "sigv4", signingRegion: "us-isof-south-1" }] },
              {},
            );
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === true
          ) {
            return e("https://ce.eusc-de-east-1.api.amazonwebservices.eu", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-eusc" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://ce.eusc-de-east-1.api.amazonwebservices.eu", _p0(), {});
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
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://ce.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
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
  '{"url":"https://ce.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
  [
    "us-gov-west-1",
    "us-gov-east-1",
    "aws-us-gov-global",
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AnalysisNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AnalysisNotFoundException>()(
    "AnalysisNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AnomalyMonitorAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<AnomalyMonitorAlreadyExists>()(
    "AnomalyMonitorAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "same monitor name as an existing monitor" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class AnomalySubscriptionAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<AnomalySubscriptionAlreadyExists>()(
    "AnomalySubscriptionAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "same subscription name as an existing subscription" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class BackfillLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<BackfillLimitExceededException>()(
    "BackfillLimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BillExpirationException
  extends /*@__PURE__*/ S.TaggedError<BillExpirationException>()("BillExpirationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ S.TaggedError<BillingViewHealthStatusException>()(
    "BillingViewHealthStatusException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class DataUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DataUnavailableException>()("DataUnavailableException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class GenerationExistsException
  extends /*@__PURE__*/ S.TaggedError<GenerationExistsException>()(
    "GenerationExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class RequestChangedException
  extends /*@__PURE__*/ S.TaggedError<RequestChangedException>()("RequestChangedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RightsizingRecommendationNotEnabled
  extends /*@__PURE__*/ S.TaggedError<RightsizingRecommendationNotEnabled>()(
    "RightsizingRecommendationNotEnabled",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "AccessDeniedException",
      message: { includes: "opt-in only feature" },
    }),
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnknownMonitorException
  extends /*@__PURE__*/ S.TaggedError<UnknownMonitorException>()(
    "UnknownMonitorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnknownSubscriptionException
  extends /*@__PURE__*/ S.TaggedError<UnknownSubscriptionException>()(
    "UnknownSubscriptionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnresolvableUsageUnitException
  extends /*@__PURE__*/ S.TaggedError<UnresolvableUsageUnitException>()(
    "UnresolvableUsageUnitException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
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
export type AnomalySubscriptionFrequency = "DAILY" | "IMMEDIATE" | "WEEKLY" | (string & {});
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
export type CostCategoryRuleVersion = "CostCategoryExpression.v1" | (string & {});
export type CostCategoryValue = string;
export type CostCategoryInheritedValueDimensionName = "LINKED_ACCOUNT_NAME" | "TAG" | (string & {});
export interface CostCategoryInheritedValueDimension {
  DimensionName?: CostCategoryInheritedValueDimensionName;
  DimensionKey?: string;
}
export type CostCategoryRuleType = "REGULAR" | "INHERITED_VALUE" | (string & {});
export interface CostCategoryRule {
  Value?: string;
  Rule?: Expression;
  InheritedValue?: CostCategoryInheritedValueDimension;
  Type?: CostCategoryRuleType;
}
export type CostCategoryRulesList = CostCategoryRule[];
export type CostCategorySplitChargeRuleTargetsList = string[];
export type CostCategorySplitChargeMethod = "FIXED" | "PROPORTIONAL" | "EVEN" | (string & {});
export type CostCategorySplitChargeRuleParameterType = "ALLOCATION_PERCENTAGES" | (string & {});
export type CostCategorySplitChargeRuleParameterValuesList = string[];
export interface CostCategorySplitChargeRuleParameter {
  Type: CostCategorySplitChargeRuleParameterType;
  Values: string[];
}
export type CostCategorySplitChargeRuleParametersList = CostCategorySplitChargeRuleParameter[];
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
export type AnomalyFeedbackType = "YES" | "NO" | "PLANNED_ACTIVITY" | (string & {});
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
export type ApproximateUsageRecordsPerService = { [key: string]: number | undefined };
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
export type AnalysisStatus = "SUCCEEDED" | "PROCESSING" | "FAILED" | (string & {});
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
export type GroupDefinitionType = "DIMENSION" | "TAG" | "COST_CATEGORY" | (string & {});
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
export type ComparisonMetrics = { [key: string]: ComparisonMetricValue | undefined };
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
export type Context = "COST_AND_USAGE" | "RESERVATIONS" | "SAVINGS_PLANS" | (string & {});
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
export type LookbackPeriodInDays = "SEVEN_DAYS" | "THIRTY_DAYS" | "SIXTY_DAYS" | (string & {});
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
export type ReservationPurchaseRecommendationDetails = ReservationPurchaseRecommendationDetail[];
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
export type ReservationPurchaseRecommendations = ReservationPurchaseRecommendation[];
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
export type RecommendationTarget = "SAME_INSTANCE_FAMILY" | "CROSS_INSTANCE_FAMILY" | (string & {});
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
export type CostAllocationTagBackfillStatus = "SUCCEEDED" | "PROCESSING" | "FAILED" | (string & {});
export interface CostAllocationTagBackfillRequest {
  BackfillFrom?: string;
  RequestedAt?: string;
  CompletedAt?: string;
  BackfillStatus?: CostAllocationTagBackfillStatus;
  LastUpdatedAt?: string;
}
export type CostAllocationTagBackfillRequestList = CostAllocationTagBackfillRequest[];
export interface ListCostAllocationTagBackfillHistoryResponse {
  BackfillRequests?: CostAllocationTagBackfillRequest[];
  NextToken?: string;
}
export type CostAllocationTagStatus = "Active" | "Inactive" | (string & {});
export type CostAllocationTagKeyList = string[];
export type CostAllocationTagType = "AWSGenerated" | "UserDefined" | (string & {});
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
export type CostCategoryResourceAssociations = CostCategoryResourceAssociation[];
export interface ListCostCategoryResourceAssociationsResponse {
  CostCategoryResourceAssociations?: CostCategoryResourceAssociation[];
  NextToken?: string;
}
export type GenerationStatus = "SUCCEEDED" | "PROCESSING" | "FAILED" | (string & {});
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
export type UpdateCostAllocationTagsStatusErrors = UpdateCostAllocationTagsStatusError_[];
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
  input: __S(0, __c0, 0) as any as S.Schema<CreateAnomalyMonitorRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<CreateAnomalyMonitorResponse>,
  errors: [LimitExceededException, AnomalyMonitorAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnomalyMonitor",
}));

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
  input: __S(192, __c6, 0) as any as S.Schema<CreateAnomalySubscriptionRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<CreateAnomalySubscriptionResponse>,
  errors: [LimitExceededException, UnknownMonitorException, AnomalySubscriptionAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnomalySubscription",
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<CreateCostCategoryDefinitionRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<CreateCostCategoryDefinitionResponse>,
  errors: [LimitExceededException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCostCategoryDefinition",
}));

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
  input: __S(416, __c13, 0) as any as S.Schema<DeleteAnomalyMonitorRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<DeleteAnomalyMonitorResponse>,
  errors: [LimitExceededException, UnknownMonitorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalyMonitor",
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<DeleteAnomalySubscriptionRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<DeleteAnomalySubscriptionResponse>,
  errors: [LimitExceededException, UnknownSubscriptionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalySubscription",
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteCostCategoryDefinitionRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<DeleteCostCategoryDefinitionResponse>,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCostCategoryDefinition",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<DescribeCostCategoryDefinitionRequest>,
  output: __S(546, __c17, 2) as any as S.Schema<DescribeCostCategoryDefinitionResponse>,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCostCategoryDefinition",
}));

export type GetAnomaliesError = InvalidNextTokenException | LimitExceededException | CommonErrors;
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
  input: __S(610, __c19, 2) as any as S.Schema<GetAnomaliesRequest>,
  output: __S(618, __c19, 10) as any as S.Schema<GetAnomaliesResponse>,
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
  input: __S(640, __c20, 0) as any as S.Schema<GetAnomalyMonitorsRequest>,
  output: __S(642, __c20, 2) as any as S.Schema<GetAnomalyMonitorsResponse>,
  errors: [InvalidNextTokenException, LimitExceededException, UnknownMonitorException],
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
  input: __S(672, __c21, 0) as any as S.Schema<GetAnomalySubscriptionsRequest>,
  output: __S(674, __c21, 2) as any as S.Schema<GetAnomalySubscriptionsResponse>,
  errors: [InvalidNextTokenException, LimitExceededException, UnknownSubscriptionException],
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
  input: __S(704, __c22, 0) as any as S.Schema<GetApproximateUsageRecordsRequest>,
  output: __S(706, __c22, 2) as any as S.Schema<GetApproximateUsageRecordsResponse>,
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApproximateUsageRecords",
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<GetCommitmentPurchaseAnalysisRequest>,
  output: __S(771, __c24, 3) as any as S.Schema<GetCommitmentPurchaseAnalysisResponse>,
  errors: [AnalysisNotFoundException, DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommitmentPurchaseAnalysis",
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<GetCostAndUsageRequest>,
  output: __S(933, __c29, 5) as any as S.Schema<GetCostAndUsageResponse>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<GetCostAndUsageComparisonsRequest>,
  output: __S(1059, __c33, 3) as any as S.Schema<GetCostAndUsageComparisonsResponse>,
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
  input: __S(1120, __c35, 0) as any as S.Schema<GetCostAndUsageWithResourcesRequest>,
  output: __S(933, __c29, 5) as any as S.Schema<GetCostAndUsageWithResourcesResponse>,
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
}));

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
  input: __S(1152, __c36, 0) as any as S.Schema<GetCostCategoriesRequest>,
  output: __S(1153, __c36, 1) as any as S.Schema<GetCostCategoriesResponse>,
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
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<GetCostComparisonDriversRequest>,
  output: __S(1253, __c39, 5) as any as S.Schema<GetCostComparisonDriversResponse>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<GetCostForecastRequest>,
  output: __S(1314, __c41, 2) as any as S.Schema<GetCostForecastResponse>,
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostForecast",
}));

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
  input: __S(1344, __c42, 0) as any as S.Schema<GetDimensionValuesRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<GetDimensionValuesResponse>,
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
}));

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
  input: __S(1376, __c43, 0) as any as S.Schema<GetReservationCoverageRequest>,
  output: __S(1385, __c43, 9) as any as S.Schema<GetReservationCoverageResponse>,
  errors: [DataUnavailableException, InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationCoverage",
}));

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
  input: __S(1410, __c44, 2) as any as S.Schema<GetReservationPurchaseRecommendationRequest>,
  output: __S(1424, __c44, 16) as any as S.Schema<GetReservationPurchaseRecommendationResponse>,
  errors: [DataUnavailableException, InvalidNextTokenException, LimitExceededException],
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
  input: __S(1472, __c46, 0) as any as S.Schema<GetReservationUtilizationRequest>,
  output: __S(1478, __c46, 6) as any as S.Schema<GetReservationUtilizationResponse>,
  errors: [DataUnavailableException, InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationUtilization",
}));

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
  input: __S(1505, __c47, 1) as any as S.Schema<GetRightsizingRecommendationRequest>,
  output: __S(1523, __c47, 19) as any as S.Schema<GetRightsizingRecommendationResponse>,
  errors: [InvalidNextTokenException, LimitExceededException, RightsizingRecommendationNotEnabled],
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
  input: __S(1536, __c48, 0) as any as S.Schema<GetSavingsPlanPurchaseRecommendationDetailsRequest>,
  output: __S(
    1538,
    __c48,
    2,
  ) as any as S.Schema<GetSavingsPlanPurchaseRecommendationDetailsResponse>,
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlanPurchaseRecommendationDetails",
}));

export type GetSavingsPlansCoverageError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the Savings Plans covered for your account. This enables you to see how much of
 * your cost is covered by a Savings Plan. An organization's management account can see the
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
  input: __S(1568, __c49, 0) as any as S.Schema<GetSavingsPlansCoverageRequest>,
  output: __S(1572, __c49, 4) as any as S.Schema<GetSavingsPlansCoverageResponse>,
  errors: [DataUnavailableException, InvalidNextTokenException, LimitExceededException],
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
  input: __S(1600, __c50, 0) as any as S.Schema<GetSavingsPlansPurchaseRecommendationRequest>,
  output: __S(1606, __c50, 6) as any as S.Schema<GetSavingsPlansPurchaseRecommendationResponse>,
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansPurchaseRecommendation",
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<GetSavingsPlansUtilizationRequest>,
  output: __S(1635, __c51, 3) as any as S.Schema<GetSavingsPlansUtilizationResponse>,
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansUtilization",
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<GetSavingsPlansUtilizationDetailsRequest>,
  output: __S(1699, __c53, 3) as any as S.Schema<GetSavingsPlansUtilizationDetailsResponse>,
  errors: [DataUnavailableException, InvalidNextTokenException, LimitExceededException],
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
  input: __S(1728, __c54, 0) as any as S.Schema<GetTagsRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<GetTagsResponse>,
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
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<GetUsageForecastRequest>,
  output: __S(1314, __c41, 2) as any as S.Schema<GetUsageForecastResponse>,
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
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<ListCommitmentPurchaseAnalysesRequest>,
  output: __S(1795, __c56, 3) as any as S.Schema<ListCommitmentPurchaseAnalysesResponse>,
  errors: [DataUnavailableException, InvalidNextTokenException, LimitExceededException],
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
  input: __S(1824, __c57, 0) as any as S.Schema<ListCostAllocationTagBackfillHistoryRequest>,
  output: __S(1826, __c57, 2) as any as S.Schema<ListCostAllocationTagBackfillHistoryResponse>,
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
  input: __S(1888, __c59, 0) as any as S.Schema<ListCostAllocationTagsRequest>,
  output: __S(1891, __c59, 3) as any as S.Schema<ListCostAllocationTagsResponse>,
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

export type ListCostCategoryDefinitionsError = LimitExceededException | CommonErrors;
/**
 * Returns the name, Amazon Resource Name (ARN), `NumberOfRules` and effective
 * dates of all cost categories defined in the account. You have the option to use
 * `EffectiveOn` and `SupportedResourceTypes` to return a list of cost categories that were active on a specific
 * date. If there is no `EffectiveOn` specified, you'll see cost categories that are
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
  input: __S(1920, __c60, 0) as any as S.Schema<ListCostCategoryDefinitionsRequest>,
  output: __S(1923, __c60, 3) as any as S.Schema<ListCostCategoryDefinitionsResponse>,
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
  input: __S(1952, __c61, 0) as any as S.Schema<ListCostCategoryResourceAssociationsRequest>,
  output: __S(1955, __c61, 3) as any as S.Schema<ListCostCategoryResourceAssociationsResponse>,
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
  input: __S(
    1984,
    __c62,
    0,
  ) as any as S.Schema<ListSavingsPlansPurchaseRecommendationGenerationRequest>,
  output: __S(
    1987,
    __c62,
    3,
  ) as any as S.Schema<ListSavingsPlansPurchaseRecommendationGenerationResponse>,
  errors: [DataUnavailableException, InvalidNextTokenException, LimitExceededException],
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
  input: __S(2016, __c63, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<ProvideAnomalyFeedbackRequest>,
  output: __S(2049, __c64, 1) as any as S.Schema<ProvideAnomalyFeedbackResponse>,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvideAnomalyFeedback",
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<StartCommitmentPurchaseAnalysisRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<StartCommitmentPurchaseAnalysisResponse>,
  errors: [
    DataUnavailableException,
    GenerationExistsException,
    LimitExceededException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCommitmentPurchaseAnalysis",
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<StartCostAllocationTagBackfillRequest>,
  output: __S(2113, __c66, 1) as any as S.Schema<StartCostAllocationTagBackfillResponse>,
  errors: [BackfillLimitExceededException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCostAllocationTagBackfill",
}));

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
  input: __S(
    2144,
    __c67,
    0,
  ) as any as S.Schema<StartSavingsPlansPurchaseRecommendationGenerationRequest>,
  output: __S(
    2145,
    __c67,
    1,
  ) as any as S.Schema<StartSavingsPlansPurchaseRecommendationGenerationResponse>,
  errors: [
    DataUnavailableException,
    GenerationExistsException,
    LimitExceededException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSavingsPlansPurchaseRecommendationGeneration",
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<TagResourceResponse>,
  errors: [LimitExceededException, ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = LimitExceededException | ResourceNotFoundException | CommonErrors;
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
  input: __S(2208, __c69, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<UpdateAnomalyMonitorRequest>,
  output: __S(160, __c5, 0) as any as S.Schema<UpdateAnomalyMonitorResponse>,
  errors: [LimitExceededException, UnknownMonitorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomalyMonitor",
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<UpdateAnomalySubscriptionRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<UpdateAnomalySubscriptionResponse>,
  errors: [LimitExceededException, UnknownMonitorException, UnknownSubscriptionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomalySubscription",
}));

export type UpdateCostAllocationTagsStatusError = LimitExceededException | CommonErrors;
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
  input: __S(2306, __c72, 2) as any as S.Schema<UpdateCostAllocationTagsStatusRequest>,
  output: __S(2309, __c72, 5) as any as S.Schema<UpdateCostAllocationTagsStatusResponse>,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCostAllocationTagsStatus",
}));

export type UpdateCostCategoryDefinitionError =
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Updates an existing cost category. Changes made to the cost category rules will be used to
 * categorize the current month's expenses and future expenses. This won't change categorization
 * for the previous months.
 */
export const updateCostCategoryDefinition: API.OperationMethod<
  UpdateCostCategoryDefinitionRequest,
  UpdateCostCategoryDefinitionResponse,
  UpdateCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<UpdateCostCategoryDefinitionRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<UpdateCostCategoryDefinitionResponse>,
  errors: [LimitExceededException, ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCostCategoryDefinition",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AnomalyMonitor: __S(128, __c4, 0),
          ResourceTags: S.optional(__S(97, __c3, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAnomalyMonitorRequest" });
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
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Expression> => __S(68, __c2, 4)).annotate({
          identifier: "Expression",
        }),
      );
    case 1:
      return S.Array(S.String);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(32, __c1, 0)),
          MatchOptions: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "DimensionValues" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Values: S.optional(__S(32, __c1, 0)),
          MatchOptions: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "TagValues" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Or: S.optional(S.suspend(() => __S(64, __c2, 0)).annotate({ identifier: "Expressions" })),
          And: S.optional(
            S.suspend(() => __S(64, __c2, 0)).annotate({ identifier: "Expressions" }),
          ),
          Not: S.optional(
            S.suspend((): S.Schema<Expression> => __S(68, __c2, 4)).annotate({
              identifier: "Expression",
            }),
          ),
          Dimensions: S.optional(__S(66, __c2, 2)),
          Tags: S.optional(__S(67, __c2, 3)),
          CostCategories: S.optional(__S(67, __c2, 3)),
        }),
      ).annotate({ identifier: "Expression" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(96, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorArn: S.optional(S.String),
          MonitorName: S.String,
          CreationDate: S.optional(S.String),
          LastUpdatedDate: S.optional(S.String),
          LastEvaluatedDate: S.optional(S.String),
          MonitorType: S.String,
          MonitorDimension: S.optional(S.String),
          MonitorSpecification: S.optional(__S(68, __c2, 4)),
          DimensionalValueCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AnomalyMonitor" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ MonitorArn: S.String })).annotate({
        identifier: "CreateAnomalyMonitorResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AnomalySubscription: __S(224, __c7, 0),
          ResourceTags: S.optional(__S(97, __c3, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAnomalySubscriptionRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionArn: S.optional(S.String),
          AccountId: S.optional(S.String),
          MonitorArnList: __S(32, __c1, 0),
          Subscribers: __S(257, __c8, 1),
          Threshold: S.optional(S.Number),
          Frequency: S.String,
          SubscriptionName: S.String,
          ThresholdExpression: S.optional(__S(68, __c2, 4)),
        }),
      ).annotate({ identifier: "AnomalySubscription" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Address: S.optional(S.String),
          Type: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "Subscriber" });
    case 1:
      return S.Array(__S(256, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ SubscriptionArn: S.String })).annotate({
        identifier: "CreateAnomalySubscriptionResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          EffectiveStart: S.optional(S.String),
          RuleVersion: S.String,
          Rules: __S(354, __c11, 2),
          DefaultValue: S.optional(S.String),
          SplitChargeRules: S.optional(__S(358, __c11, 6)),
          ResourceTags: S.optional(__S(97, __c3, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateCostCategoryDefinitionRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DimensionName: S.optional(S.String), DimensionKey: S.optional(S.String) }),
      ).annotate({ identifier: "CostCategoryInheritedValueDimension" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Value: S.optional(S.String),
          Rule: S.optional(__S(68, __c2, 4)),
          InheritedValue: S.optional(__S(352, __c11, 0)),
          Type: S.optional(S.String),
        }),
      ).annotate({ identifier: "CostCategoryRule" });
    case 2:
      return S.Array(__S(353, __c11, 1));
    case 3:
      return S.suspend(() => S.Struct({ Type: S.String, Values: __S(32, __c1, 0) })).annotate({
        identifier: "CostCategorySplitChargeRuleParameter",
      });
    case 4:
      return S.Array(__S(355, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Source: S.String,
          Targets: __S(32, __c1, 0),
          Method: S.String,
          Parameters: S.optional(__S(356, __c11, 4)),
        }),
      ).annotate({ identifier: "CostCategorySplitChargeRule" });
    case 6:
      return S.Array(__S(357, __c11, 5));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CostCategoryArn: S.optional(S.String), EffectiveStart: S.optional(S.String) }),
      ).annotate({ identifier: "CreateCostCategoryDefinitionResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonitorArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAnomalyMonitorRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAnomalyMonitorResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubscriptionArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAnomalySubscriptionRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CostCategoryArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteCostCategoryDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CostCategoryArn: S.optional(S.String), EffectiveEnd: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteCostCategoryDefinitionResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CostCategoryArn: S.String, EffectiveOn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeCostCategoryDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CostCategoryArn: S.String,
          EffectiveStart: S.String,
          EffectiveEnd: S.optional(S.String),
          Name: S.String,
          RuleVersion: S.String,
          Rules: __S(354, __c11, 2),
          SplitChargeRules: S.optional(__S(358, __c11, 6)),
          ProcessingStatus: S.optional(__S(577, __c18, 1)),
          DefaultValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "CostCategory" });
    case 2:
      return S.suspend(() => S.Struct({ CostCategory: S.optional(__S(545, __c17, 1)) })).annotate({
        identifier: "DescribeCostCategoryDefinitionResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Component: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "CostCategoryProcessingStatus" });
    case 1:
      return S.Array(__S(576, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StartDate: S.String, EndDate: S.optional(S.String) }),
      ).annotate({ identifier: "AnomalyDateInterval" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NumericOperator: S.String,
          StartValue: S.Number,
          EndValue: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TotalImpactFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MonitorArn: S.optional(S.String),
          DateInterval: __S(608, __c19, 0),
          Feedback: S.optional(S.String),
          TotalImpact: S.optional(__S(609, __c19, 1)),
          NextPageToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAnomaliesRequest" });
    case 3:
      return S.suspend(() => S.Struct({ Contribution: S.Number })).annotate({
        identifier: "RootCauseImpact",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Service: S.optional(S.String),
          Region: S.optional(S.String),
          LinkedAccount: S.optional(S.String),
          LinkedAccountName: S.optional(S.String),
          UsageType: S.optional(S.String),
          Impact: S.optional(__S(611, __c19, 3)),
        }),
      ).annotate({ identifier: "RootCause" });
    case 5:
      return S.Array(__S(612, __c19, 4));
    case 6:
      return S.suspend(() => S.Struct({ MaxScore: S.Number, CurrentScore: S.Number })).annotate({
        identifier: "AnomalyScore",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          MaxImpact: S.Number,
          TotalImpact: S.optional(S.Number),
          TotalActualSpend: S.optional(S.Number),
          TotalExpectedSpend: S.optional(S.Number),
          TotalImpactPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Impact" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          AnomalyId: S.String,
          AnomalyStartDate: S.optional(S.String),
          AnomalyEndDate: S.optional(S.String),
          DimensionValue: S.optional(S.String),
          RootCauses: S.optional(__S(613, __c19, 5)),
          AnomalyScore: __S(614, __c19, 6),
          Impact: __S(615, __c19, 7),
          MonitorArn: S.String,
          Feedback: S.optional(S.String),
        }),
      ).annotate({ identifier: "Anomaly" });
    case 9:
      return S.Array(__S(616, __c19, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ Anomalies: __S(617, __c19, 9), NextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAnomaliesResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MonitorArnList: S.optional(__S(32, __c1, 0)),
          NextPageToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAnomalyMonitorsRequest" });
    case 1:
      return S.Array(__S(128, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ AnomalyMonitors: __S(641, __c20, 1), NextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAnomalyMonitorsResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionArnList: S.optional(__S(32, __c1, 0)),
          MonitorArn: S.optional(S.String),
          NextPageToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAnomalySubscriptionsRequest" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ AnomalySubscriptions: __S(673, __c21, 1), NextPageToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAnomalySubscriptionsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Granularity: S.String,
          Services: S.optional(__S(32, __c1, 0)),
          ApproximationDimension: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetApproximateUsageRecordsRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Services: S.optional(__S(705, __c22, 1)),
          TotalRecords: S.optional(S.Number),
          LookbackPeriod: S.optional(__S(736, __c23, 0)),
        }),
      ).annotate({ identifier: "GetApproximateUsageRecordsResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Start: S.String, End: S.String })).annotate({
        identifier: "DateInterval",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AnalysisId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetCommitmentPurchaseAnalysisRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CurrencyCode: S.optional(S.String),
          LookbackPeriodInHours: S.optional(S.String),
          CurrentAverageCoverage: S.optional(S.String),
          CurrentAverageHourlyOnDemandSpend: S.optional(S.String),
          CurrentMaximumHourlyOnDemandSpend: S.optional(S.String),
          CurrentMinimumHourlyOnDemandSpend: S.optional(S.String),
          CurrentOnDemandSpend: S.optional(S.String),
          ExistingHourlyCommitment: S.optional(S.String),
          HourlyCommitmentToPurchase: S.optional(S.String),
          EstimatedAverageCoverage: S.optional(S.String),
          EstimatedAverageUtilization: S.optional(S.String),
          EstimatedMonthlySavingsAmount: S.optional(S.String),
          EstimatedOnDemandCost: S.optional(S.String),
          EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
          EstimatedROI: S.optional(S.String),
          EstimatedSavingsAmount: S.optional(S.String),
          EstimatedSavingsPercentage: S.optional(S.String),
          EstimatedCommitmentCost: S.optional(S.String),
          LatestUsageTimestamp: S.optional(S.String),
          UpfrontCost: S.optional(S.String),
          AdditionalMetadata: S.optional(S.String),
          MetricsOverLookbackPeriod: S.optional(__S(801, __c25, 1)),
        }),
      ).annotate({ identifier: "SavingsPlansPurchaseAnalysisDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SavingsPlansPurchaseAnalysisDetails: S.optional(__S(769, __c24, 1)) }),
      ).annotate({ identifier: "AnalysisDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          EstimatedCompletionTime: S.String,
          AnalysisCompletionTime: S.optional(S.String),
          AnalysisStartedTime: S.String,
          AnalysisId: S.String,
          AnalysisStatus: S.String,
          ErrorCode: S.optional(S.String),
          AnalysisDetails: S.optional(__S(770, __c24, 2)),
          CommitmentPurchaseAnalysisConfiguration: __S(835, __c26, 3),
        }),
      ).annotate({ identifier: "GetCommitmentPurchaseAnalysisResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StartTime: S.optional(S.String),
          EstimatedOnDemandCost: S.optional(S.String),
          CurrentCoverage: S.optional(S.String),
          EstimatedCoverage: S.optional(S.String),
          EstimatedNewCommitmentUtilization: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationDetailHourlyMetrics" });
    case 1:
      return S.Array(__S(800, __c25, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PaymentOption: S.optional(S.String),
          SavingsPlansType: S.optional(S.String),
          Region: S.optional(S.String),
          InstanceFamily: S.optional(S.String),
          TermInYears: S.optional(S.String),
          SavingsPlansCommitment: S.optional(S.Number),
          OfferingId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlans" });
    case 1:
      return S.Array(__S(832, __c26, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountScope: S.optional(S.String),
          AccountId: S.optional(S.String),
          AnalysisType: S.String,
          SavingsPlansToAdd: __S(833, __c26, 1),
          SavingsPlansToExclude: S.optional(__S(32, __c1, 0)),
          LookBackTimePeriod: __S(736, __c23, 0),
          SavingsPlansTargetCoverage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SavingsPlansPurchaseAnalysisConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ SavingsPlansPurchaseAnalysisConfiguration: S.optional(__S(834, __c26, 2)) }),
      ).annotate({ identifier: "CommitmentPurchaseAnalysisConfiguration" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          Granularity: S.String,
          Filter: S.optional(__S(68, __c2, 4)),
          Metrics: __S(32, __c1, 0),
          GroupBy: S.optional(__S(897, __c28, 1)),
          BillingViewArn: S.optional(S.String),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCostAndUsageRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Key: S.optional(S.String) }),
      ).annotate({ identifier: "GroupDefinition" });
    case 1:
      return S.Array(__S(896, __c28, 0));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(960, __c30, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({ Keys: S.optional(__S(32, __c1, 0)), Metrics: S.optional(__S(928, __c29, 0)) }),
      ).annotate({ identifier: "Group" });
    case 2:
      return S.Array(__S(929, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: S.optional(__S(736, __c23, 0)),
          Total: S.optional(__S(928, __c29, 0)),
          Groups: S.optional(__S(930, __c29, 2)),
          Estimated: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResultByTime" });
    case 4:
      return S.Array(__S(931, __c29, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          NextPageToken: S.optional(S.String),
          GroupDefinitions: S.optional(__S(897, __c28, 1)),
          ResultsByTime: S.optional(__S(932, __c29, 4)),
          DimensionValueAttributes: S.optional(__S(993, __c31, 1)),
        }),
      ).annotate({ identifier: "GetCostAndUsageResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Amount: S.optional(S.String), Unit: S.optional(S.String) }),
      ).annotate({ identifier: "MetricValue" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), Attributes: S.optional(__S(1024, __c32, 0)) }),
      ).annotate({ identifier: "DimensionValuesWithAttributes" });
    case 1:
      return S.Array(__S(992, __c31, 0));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BillingViewArn: S.optional(S.String),
          BaselineTimePeriod: __S(736, __c23, 0),
          ComparisonTimePeriod: __S(736, __c23, 0),
          MetricForComparison: S.String,
          Filter: S.optional(__S(68, __c2, 4)),
          GroupBy: S.optional(__S(897, __c28, 1)),
          MaxResults: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCostAndUsageComparisonsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CostAndUsageSelector: S.optional(__S(68, __c2, 4)),
          Metrics: S.optional(__S(1089, __c34, 1)),
        }),
      ).annotate({ identifier: "CostAndUsageComparison" });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CostAndUsageComparisons: S.optional(__S(1058, __c33, 2)),
          TotalCostAndUsage: S.optional(__S(1089, __c34, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCostAndUsageComparisonsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BaselineTimePeriodAmount: S.optional(S.String),
          ComparisonTimePeriodAmount: S.optional(S.String),
          Difference: S.optional(S.String),
          Unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComparisonMetricValue" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(1088, __c34, 0).pipe(S.optional));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          Granularity: S.String,
          Filter: __S(68, __c2, 4),
          Metrics: S.optional(__S(32, __c1, 0)),
          GroupBy: S.optional(__S(897, __c28, 1)),
          BillingViewArn: S.optional(S.String),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCostAndUsageWithResourcesRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SearchString: S.optional(S.String),
          TimePeriod: __S(736, __c23, 0),
          CostCategoryName: S.optional(S.String),
          Filter: S.optional(__S(68, __c2, 4)),
          SortBy: S.optional(__S(1216, __c38, 0)),
          BillingViewArn: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCostCategoriesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextPageToken: S.optional(S.String),
          CostCategoryNames: S.optional(__S(32, __c1, 0)),
          CostCategoryValues: S.optional(__S(32, __c1, 0)),
          ReturnSize: S.Number,
          TotalSize: S.Number,
        }),
      ).annotate({ identifier: "GetCostCategoriesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, SortOrder: S.optional(S.String) })).annotate(
        { identifier: "SortDefinition" },
      );
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1184, __c37, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BillingViewArn: S.optional(S.String),
          BaselineTimePeriod: __S(736, __c23, 0),
          ComparisonTimePeriod: __S(736, __c23, 0),
          MetricForComparison: S.String,
          Filter: S.optional(__S(68, __c2, 4)),
          GroupBy: S.optional(__S(897, __c28, 1)),
          MaxResults: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCostComparisonDriversRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Type: S.optional(S.String),
          Name: S.optional(S.String),
          Metrics: S.optional(__S(1089, __c34, 1)),
        }),
      ).annotate({ identifier: "CostDriver" });
    case 2:
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CostSelector: S.optional(__S(68, __c2, 4)),
          Metrics: S.optional(__S(1089, __c34, 1)),
          CostDrivers: S.optional(__S(1250, __c39, 2)),
        }),
      ).annotate({ identifier: "CostComparisonDriver" });
    case 4:
      return S.Array(__S(1251, __c39, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CostComparisonDrivers: S.optional(__S(1252, __c39, 4)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCostComparisonDriversResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          Metric: S.String,
          Granularity: S.String,
          Filter: S.optional(__S(68, __c2, 4)),
          BillingViewArn: S.optional(S.String),
          PredictionIntervalLevel: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCostForecastRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: S.optional(__S(736, __c23, 0)),
          MeanValue: S.optional(S.String),
          PredictionIntervalLowerBound: S.optional(S.String),
          PredictionIntervalUpperBound: S.optional(S.String),
        }),
      ).annotate({ identifier: "ForecastResult" });
    case 1:
      return S.Array(__S(1312, __c41, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Total: S.optional(__S(960, __c30, 0)),
          ForecastResultsByTime: S.optional(__S(1313, __c41, 1)),
        }),
      ).annotate({ identifier: "GetCostForecastResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SearchString: S.optional(S.String),
          TimePeriod: __S(736, __c23, 0),
          Dimension: S.String,
          Context: S.optional(S.String),
          Filter: S.optional(__S(68, __c2, 4)),
          SortBy: S.optional(__S(1216, __c38, 0)),
          BillingViewArn: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDimensionValuesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DimensionValues: __S(993, __c31, 1),
          ReturnSize: S.Number,
          TotalSize: S.Number,
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDimensionValuesResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          GroupBy: S.optional(__S(897, __c28, 1)),
          Granularity: S.optional(S.String),
          Filter: S.optional(__S(68, __c2, 4)),
          Metrics: S.optional(__S(32, __c1, 0)),
          NextPageToken: S.optional(S.String),
          SortBy: S.optional(__S(1184, __c37, 0)),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetReservationCoverageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OnDemandHours: S.optional(S.String),
          ReservedHours: S.optional(S.String),
          TotalRunningHours: S.optional(S.String),
          CoverageHoursPercentage: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoverageHours" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          OnDemandNormalizedUnits: S.optional(S.String),
          ReservedNormalizedUnits: S.optional(S.String),
          TotalRunningNormalizedUnits: S.optional(S.String),
          CoverageNormalizedUnitsPercentage: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoverageNormalizedUnits" });
    case 3:
      return S.suspend(() => S.Struct({ OnDemandCost: S.optional(S.String) })).annotate({
        identifier: "CoverageCost",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          CoverageHours: S.optional(__S(1377, __c43, 1)),
          CoverageNormalizedUnits: S.optional(__S(1378, __c43, 2)),
          CoverageCost: S.optional(__S(1379, __c43, 3)),
        }),
      ).annotate({ identifier: "Coverage" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(1024, __c32, 0)),
          Coverage: S.optional(__S(1380, __c43, 4)),
        }),
      ).annotate({ identifier: "ReservationCoverageGroup" });
    case 6:
      return S.Array(__S(1381, __c43, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: S.optional(__S(736, __c23, 0)),
          Groups: S.optional(__S(1382, __c43, 6)),
          Total: S.optional(__S(1380, __c43, 4)),
        }),
      ).annotate({ identifier: "CoverageByTime" });
    case 8:
      return S.Array(__S(1383, __c43, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          CoveragesByTime: __S(1384, __c43, 8),
          Total: S.optional(__S(1380, __c43, 4)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetReservationCoverageResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ OfferingClass: S.optional(S.String) })).annotate({
        identifier: "EC2Specification",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ EC2Specification: S.optional(__S(1408, __c44, 0)) }),
      ).annotate({ identifier: "ServiceSpecification" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          Service: S.String,
          Filter: S.optional(__S(68, __c2, 4)),
          AccountScope: S.optional(S.String),
          LookbackPeriodInDays: S.optional(S.String),
          TermInYears: S.optional(S.String),
          PaymentOption: S.optional(S.String),
          ServiceSpecification: S.optional(__S(1409, __c44, 1)),
          PageSize: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetReservationPurchaseRecommendationRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Family: S.optional(S.String),
          InstanceType: S.optional(S.String),
          Region: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          Platform: S.optional(S.String),
          Tenancy: S.optional(S.String),
          CurrentGeneration: S.optional(S.Boolean),
          SizeFlexEligible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EC2InstanceDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Family: S.optional(S.String),
          InstanceType: S.optional(S.String),
          Region: S.optional(S.String),
          DatabaseEngine: S.optional(S.String),
          DatabaseEdition: S.optional(S.String),
          DeploymentOption: S.optional(S.String),
          LicenseModel: S.optional(S.String),
          CurrentGeneration: S.optional(S.Boolean),
          SizeFlexEligible: S.optional(S.Boolean),
          DeploymentModel: S.optional(S.String),
        }),
      ).annotate({ identifier: "RDSInstanceDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Family: S.optional(S.String),
          NodeType: S.optional(S.String),
          Region: S.optional(S.String),
          CurrentGeneration: S.optional(S.Boolean),
          SizeFlexEligible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RedshiftInstanceDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Family: S.optional(S.String),
          NodeType: S.optional(S.String),
          Region: S.optional(S.String),
          ProductDescription: S.optional(S.String),
          CurrentGeneration: S.optional(S.Boolean),
          SizeFlexEligible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ElastiCacheInstanceDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          InstanceClass: S.optional(S.String),
          InstanceSize: S.optional(S.String),
          Region: S.optional(S.String),
          CurrentGeneration: S.optional(S.Boolean),
          SizeFlexEligible: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ESInstanceDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          EC2InstanceDetails: S.optional(__S(1411, __c44, 3)),
          RDSInstanceDetails: S.optional(__S(1412, __c44, 4)),
          RedshiftInstanceDetails: S.optional(__S(1413, __c44, 5)),
          ElastiCacheInstanceDetails: S.optional(__S(1414, __c44, 6)),
          ESInstanceDetails: S.optional(__S(1415, __c44, 7)),
          MemoryDBInstanceDetails: S.optional(__S(1413, __c44, 5)),
        }),
      ).annotate({ identifier: "InstanceDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ CapacityUnits: S.optional(S.String), Region: S.optional(S.String) }),
      ).annotate({ identifier: "DynamoDBCapacityDetails" });
    case 10:
      return S.suspend(() =>
        S.Struct({ DynamoDBCapacityDetails: S.optional(__S(1417, __c44, 9)) }),
      ).annotate({ identifier: "ReservedCapacityDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          InstanceDetails: S.optional(__S(1416, __c44, 8)),
          RecommendedNumberOfInstancesToPurchase: S.optional(S.String),
          RecommendedNormalizedUnitsToPurchase: S.optional(S.String),
          MinimumNumberOfInstancesUsedPerHour: S.optional(S.String),
          MinimumNormalizedUnitsUsedPerHour: S.optional(S.String),
          MaximumNumberOfInstancesUsedPerHour: S.optional(S.String),
          MaximumNormalizedUnitsUsedPerHour: S.optional(S.String),
          AverageNumberOfInstancesUsedPerHour: S.optional(S.String),
          AverageNormalizedUnitsUsedPerHour: S.optional(S.String),
          AverageUtilization: S.optional(S.String),
          EstimatedBreakEvenInMonths: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          EstimatedMonthlySavingsAmount: S.optional(S.String),
          EstimatedMonthlySavingsPercentage: S.optional(S.String),
          EstimatedMonthlyOnDemandCost: S.optional(S.String),
          EstimatedReservationCostForLookbackPeriod: S.optional(S.String),
          UpfrontCost: S.optional(S.String),
          RecurringStandardMonthlyCost: S.optional(S.String),
          ReservedCapacityDetails: S.optional(__S(1418, __c44, 10)),
          RecommendedNumberOfCapacityUnitsToPurchase: S.optional(S.String),
          MinimumNumberOfCapacityUnitsUsedPerHour: S.optional(S.String),
          MaximumNumberOfCapacityUnitsUsedPerHour: S.optional(S.String),
          AverageNumberOfCapacityUnitsUsedPerHour: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservationPurchaseRecommendationDetail" });
    case 12:
      return S.Array(__S(1419, __c44, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          TotalEstimatedMonthlySavingsAmount: S.optional(S.String),
          TotalEstimatedMonthlySavingsPercentage: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservationPurchaseRecommendationSummary" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          AccountScope: S.optional(S.String),
          LookbackPeriodInDays: S.optional(S.String),
          TermInYears: S.optional(S.String),
          PaymentOption: S.optional(S.String),
          ServiceSpecification: S.optional(__S(1409, __c44, 1)),
          RecommendationDetails: S.optional(__S(1420, __c44, 12)),
          RecommendationSummary: S.optional(__S(1421, __c44, 13)),
        }),
      ).annotate({ identifier: "ReservationPurchaseRecommendation" });
    case 15:
      return S.Array(__S(1422, __c44, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(1440, __c45, 0)),
          Recommendations: S.optional(__S(1423, __c44, 15)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetReservationPurchaseRecommendationResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecommendationId: S.optional(S.String),
          GenerationTimestamp: S.optional(S.String),
          AdditionalMetadata: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservationPurchaseRecommendationMetadata" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          GroupBy: S.optional(__S(897, __c28, 1)),
          Granularity: S.optional(S.String),
          Filter: S.optional(__S(68, __c2, 4)),
          SortBy: S.optional(__S(1184, __c37, 0)),
          NextPageToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetReservationUtilizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UtilizationPercentage: S.optional(S.String),
          UtilizationPercentageInUnits: S.optional(S.String),
          PurchasedHours: S.optional(S.String),
          PurchasedUnits: S.optional(S.String),
          TotalActualHours: S.optional(S.String),
          TotalActualUnits: S.optional(S.String),
          UnusedHours: S.optional(S.String),
          UnusedUnits: S.optional(S.String),
          OnDemandCostOfRIHoursUsed: S.optional(S.String),
          NetRISavings: S.optional(S.String),
          TotalPotentialRISavings: S.optional(S.String),
          AmortizedUpfrontFee: S.optional(S.String),
          AmortizedRecurringFee: S.optional(S.String),
          TotalAmortizedFee: S.optional(S.String),
          RICostForUnusedHours: S.optional(S.String),
          RealizedSavings: S.optional(S.String),
          UnrealizedSavings: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReservationAggregates" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          Value: S.optional(S.String),
          Attributes: S.optional(__S(1024, __c32, 0)),
          Utilization: S.optional(__S(1473, __c46, 1)),
        }),
      ).annotate({ identifier: "ReservationUtilizationGroup" });
    case 3:
      return S.Array(__S(1474, __c46, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: S.optional(__S(736, __c23, 0)),
          Groups: S.optional(__S(1475, __c46, 3)),
          Total: S.optional(__S(1473, __c46, 1)),
        }),
      ).annotate({ identifier: "UtilizationByTime" });
    case 5:
      return S.Array(__S(1476, __c46, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          UtilizationsByTime: __S(1477, __c46, 5),
          Total: S.optional(__S(1473, __c46, 1)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetReservationUtilizationResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RecommendationTarget: S.String, BenefitsConsidered: S.Boolean }),
      ).annotate({ identifier: "RightsizingRecommendationConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filter: S.optional(__S(68, __c2, 4)),
          Configuration: S.optional(__S(1504, __c47, 0)),
          Service: S.String,
          PageSize: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRightsizingRecommendationRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecommendationId: S.optional(S.String),
          GenerationTimestamp: S.optional(S.String),
          LookbackPeriodInDays: S.optional(S.String),
          AdditionalMetadata: S.optional(S.String),
        }),
      ).annotate({ identifier: "RightsizingRecommendationMetadata" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TotalRecommendationCount: S.optional(S.String),
          EstimatedTotalMonthlySavingsAmount: S.optional(S.String),
          SavingsCurrencyCode: S.optional(S.String),
          SavingsPercentage: S.optional(S.String),
        }),
      ).annotate({ identifier: "RightsizingRecommendationSummary" });
    case 4:
      return S.Array(__S(67, __c2, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          HourlyOnDemandRate: S.optional(S.String),
          InstanceType: S.optional(S.String),
          Platform: S.optional(S.String),
          Region: S.optional(S.String),
          Sku: S.optional(S.String),
          Memory: S.optional(S.String),
          NetworkPerformance: S.optional(S.String),
          Storage: S.optional(S.String),
          Vcpu: S.optional(S.String),
        }),
      ).annotate({ identifier: "EC2ResourceDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({ EC2ResourceDetails: S.optional(__S(1509, __c47, 5)) }),
      ).annotate({ identifier: "ResourceDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          EbsReadOpsPerSecond: S.optional(S.String),
          EbsWriteOpsPerSecond: S.optional(S.String),
          EbsReadBytesPerSecond: S.optional(S.String),
          EbsWriteBytesPerSecond: S.optional(S.String),
        }),
      ).annotate({ identifier: "EBSResourceUtilization" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          DiskReadOpsPerSecond: S.optional(S.String),
          DiskWriteOpsPerSecond: S.optional(S.String),
          DiskReadBytesPerSecond: S.optional(S.String),
          DiskWriteBytesPerSecond: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiskResourceUtilization" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          NetworkInBytesPerSecond: S.optional(S.String),
          NetworkOutBytesPerSecond: S.optional(S.String),
          NetworkPacketsInPerSecond: S.optional(S.String),
          NetworkPacketsOutPerSecond: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetworkResourceUtilization" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          MaxCpuUtilizationPercentage: S.optional(S.String),
          MaxMemoryUtilizationPercentage: S.optional(S.String),
          MaxStorageUtilizationPercentage: S.optional(S.String),
          EBSResourceUtilization: S.optional(__S(1511, __c47, 7)),
          DiskResourceUtilization: S.optional(__S(1512, __c47, 8)),
          NetworkResourceUtilization: S.optional(__S(1513, __c47, 9)),
        }),
      ).annotate({ identifier: "EC2ResourceUtilization" });
    case 11:
      return S.suspend(() =>
        S.Struct({ EC2ResourceUtilization: S.optional(__S(1514, __c47, 10)) }),
      ).annotate({ identifier: "ResourceUtilization" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          ResourceId: S.optional(S.String),
          InstanceName: S.optional(S.String),
          Tags: S.optional(__S(1508, __c47, 4)),
          ResourceDetails: S.optional(__S(1510, __c47, 6)),
          ResourceUtilization: S.optional(__S(1515, __c47, 11)),
          ReservationCoveredHoursInLookbackPeriod: S.optional(S.String),
          SavingsPlansCoveredHoursInLookbackPeriod: S.optional(S.String),
          OnDemandHoursInLookbackPeriod: S.optional(S.String),
          TotalRunningHoursInLookbackPeriod: S.optional(S.String),
          MonthlyCost: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "CurrentInstance" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          EstimatedMonthlyCost: S.optional(S.String),
          EstimatedMonthlySavings: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          DefaultTargetInstance: S.optional(S.Boolean),
          ResourceDetails: S.optional(__S(1510, __c47, 6)),
          ExpectedResourceUtilization: S.optional(__S(1515, __c47, 11)),
          PlatformDifferences: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "TargetInstance" });
    case 14:
      return S.Array(__S(1517, __c47, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({ TargetInstances: S.optional(__S(1518, __c47, 14)) }),
      ).annotate({ identifier: "ModifyRecommendationDetail" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          EstimatedMonthlySavings: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "TerminateRecommendationDetail" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          CurrentInstance: S.optional(__S(1516, __c47, 12)),
          RightsizingType: S.optional(S.String),
          ModifyRecommendationDetail: S.optional(__S(1519, __c47, 15)),
          TerminateRecommendationDetail: S.optional(__S(1520, __c47, 16)),
          FindingReasonCodes: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "RightsizingRecommendation" });
    case 18:
      return S.Array(__S(1521, __c47, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(1506, __c47, 2)),
          Summary: S.optional(__S(1507, __c47, 3)),
          RightsizingRecommendations: S.optional(__S(1522, __c47, 18)),
          NextPageToken: S.optional(S.String),
          Configuration: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "GetRightsizingRecommendationResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RecommendationDetailId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSavingsPlanPurchaseRecommendationDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountScope: S.optional(S.String),
          LookbackPeriodInDays: S.optional(S.String),
          SavingsPlansType: S.optional(S.String),
          TermInYears: S.optional(S.String),
          PaymentOption: S.optional(S.String),
          AccountId: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          InstanceFamily: S.optional(S.String),
          Region: S.optional(S.String),
          OfferingId: S.optional(S.String),
          GenerationTimestamp: S.optional(S.String),
          LatestUsageTimestamp: S.optional(S.String),
          CurrentAverageHourlyOnDemandSpend: S.optional(S.String),
          CurrentMaximumHourlyOnDemandSpend: S.optional(S.String),
          CurrentMinimumHourlyOnDemandSpend: S.optional(S.String),
          EstimatedAverageUtilization: S.optional(S.String),
          EstimatedMonthlySavingsAmount: S.optional(S.String),
          EstimatedOnDemandCost: S.optional(S.String),
          EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
          EstimatedROI: S.optional(S.String),
          EstimatedSPCost: S.optional(S.String),
          EstimatedSavingsAmount: S.optional(S.String),
          EstimatedSavingsPercentage: S.optional(S.String),
          ExistingHourlyCommitment: S.optional(S.String),
          HourlyCommitmentToPurchase: S.optional(S.String),
          UpfrontCost: S.optional(S.String),
          CurrentAverageCoverage: S.optional(S.String),
          EstimatedAverageCoverage: S.optional(S.String),
          MetricsOverLookbackPeriod: S.optional(__S(801, __c25, 1)),
        }),
      ).annotate({ identifier: "RecommendationDetailData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RecommendationDetailId: S.optional(S.String),
          RecommendationDetailData: S.optional(__S(1537, __c48, 1)),
        }),
      ).annotate({ identifier: "GetSavingsPlanPurchaseRecommendationDetailsResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          GroupBy: S.optional(__S(897, __c28, 1)),
          Granularity: S.optional(S.String),
          Filter: S.optional(__S(68, __c2, 4)),
          Metrics: S.optional(__S(32, __c1, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          SortBy: S.optional(__S(1184, __c37, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSavingsPlansCoverageRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SpendCoveredBySavingsPlans: S.optional(S.String),
          OnDemandCost: S.optional(S.String),
          TotalCost: S.optional(S.String),
          CoveragePercentage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlansCoverageData" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Attributes: S.optional(__S(1024, __c32, 0)),
          Coverage: S.optional(__S(1569, __c49, 1)),
          TimePeriod: S.optional(__S(736, __c23, 0)),
        }),
      ).annotate({ identifier: "SavingsPlansCoverage" });
    case 3:
      return S.Array(__S(1570, __c49, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ SavingsPlansCoverages: __S(1571, __c49, 3), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetSavingsPlansCoverageResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SavingsPlansType: S.String,
          TermInYears: S.String,
          PaymentOption: S.String,
          AccountScope: S.optional(S.String),
          NextPageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
          LookbackPeriodInDays: S.String,
          Filter: S.optional(__S(68, __c2, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSavingsPlansPurchaseRecommendationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Region: S.optional(S.String),
          InstanceFamily: S.optional(S.String),
          OfferingId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlansDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SavingsPlansDetails: S.optional(__S(1601, __c50, 1)),
          AccountId: S.optional(S.String),
          UpfrontCost: S.optional(S.String),
          EstimatedROI: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          EstimatedSPCost: S.optional(S.String),
          EstimatedOnDemandCost: S.optional(S.String),
          EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
          EstimatedSavingsAmount: S.optional(S.String),
          EstimatedSavingsPercentage: S.optional(S.String),
          HourlyCommitmentToPurchase: S.optional(S.String),
          EstimatedAverageUtilization: S.optional(S.String),
          EstimatedMonthlySavingsAmount: S.optional(S.String),
          CurrentMinimumHourlyOnDemandSpend: S.optional(S.String),
          CurrentMaximumHourlyOnDemandSpend: S.optional(S.String),
          CurrentAverageHourlyOnDemandSpend: S.optional(S.String),
          RecommendationDetailId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlansPurchaseRecommendationDetail" });
    case 3:
      return S.Array(__S(1602, __c50, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          EstimatedROI: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          EstimatedTotalCost: S.optional(S.String),
          CurrentOnDemandSpend: S.optional(S.String),
          EstimatedSavingsAmount: S.optional(S.String),
          TotalRecommendationCount: S.optional(S.String),
          DailyCommitmentToPurchase: S.optional(S.String),
          HourlyCommitmentToPurchase: S.optional(S.String),
          EstimatedSavingsPercentage: S.optional(S.String),
          EstimatedMonthlySavingsAmount: S.optional(S.String),
          EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlansPurchaseRecommendationSummary" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AccountScope: S.optional(S.String),
          SavingsPlansType: S.optional(S.String),
          TermInYears: S.optional(S.String),
          PaymentOption: S.optional(S.String),
          LookbackPeriodInDays: S.optional(S.String),
          SavingsPlansPurchaseRecommendationDetails: S.optional(__S(1603, __c50, 3)),
          SavingsPlansPurchaseRecommendationSummary: S.optional(__S(1604, __c50, 4)),
        }),
      ).annotate({ identifier: "SavingsPlansPurchaseRecommendation" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Metadata: S.optional(__S(1440, __c45, 0)),
          SavingsPlansPurchaseRecommendation: S.optional(__S(1605, __c50, 5)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSavingsPlansPurchaseRecommendationResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          Granularity: S.optional(S.String),
          Filter: S.optional(__S(68, __c2, 4)),
          SortBy: S.optional(__S(1184, __c37, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSavingsPlansUtilizationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          Utilization: __S(1664, __c52, 0),
          Savings: S.optional(__S(1665, __c52, 1)),
          AmortizedCommitment: S.optional(__S(1666, __c52, 2)),
        }),
      ).annotate({ identifier: "SavingsPlansUtilizationByTime" });
    case 2:
      return S.Array(__S(1633, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SavingsPlansUtilizationsByTime: S.optional(__S(1634, __c51, 2)),
          Total: __S(1667, __c52, 3),
        }),
      ).annotate({ identifier: "GetSavingsPlansUtilizationResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TotalCommitment: S.optional(S.String),
          UsedCommitment: S.optional(S.String),
          UnusedCommitment: S.optional(S.String),
          UtilizationPercentage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlansUtilization" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NetSavings: S.optional(S.String),
          OnDemandCostEquivalent: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlansSavings" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AmortizedRecurringCommitment: S.optional(S.String),
          AmortizedUpfrontCommitment: S.optional(S.String),
          TotalAmortizedCommitment: S.optional(S.String),
        }),
      ).annotate({ identifier: "SavingsPlansAmortizedCommitment" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Utilization: __S(1664, __c52, 0),
          Savings: S.optional(__S(1665, __c52, 1)),
          AmortizedCommitment: S.optional(__S(1666, __c52, 2)),
        }),
      ).annotate({ identifier: "SavingsPlansUtilizationAggregates" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          Filter: S.optional(__S(68, __c2, 4)),
          DataType: S.optional(__S(65, __c2, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          SortBy: S.optional(__S(1184, __c37, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSavingsPlansUtilizationDetailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SavingsPlanArn: S.optional(S.String),
          Attributes: S.optional(__S(1024, __c32, 0)),
          Utilization: S.optional(__S(1664, __c52, 0)),
          Savings: S.optional(__S(1665, __c52, 1)),
          AmortizedCommitment: S.optional(__S(1666, __c52, 2)),
        }),
      ).annotate({ identifier: "SavingsPlansUtilizationDetail" });
    case 2:
      return S.Array(__S(1697, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          SavingsPlansUtilizationDetails: __S(1698, __c53, 2),
          Total: S.optional(__S(1667, __c52, 3)),
          TimePeriod: __S(736, __c23, 0),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetSavingsPlansUtilizationDetailsResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SearchString: S.optional(S.String),
          TimePeriod: __S(736, __c23, 0),
          TagKey: S.optional(S.String),
          Filter: S.optional(__S(68, __c2, 4)),
          SortBy: S.optional(__S(1216, __c38, 0)),
          BillingViewArn: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextPageToken: S.optional(S.String),
          Tags: __S(32, __c1, 0),
          ReturnSize: S.Number,
          TotalSize: S.Number,
        }),
      ).annotate({ identifier: "GetTagsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TimePeriod: __S(736, __c23, 0),
          Metric: S.String,
          Granularity: S.String,
          Filter: S.optional(__S(68, __c2, 4)),
          BillingViewArn: S.optional(S.String),
          PredictionIntervalLevel: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetUsageForecastRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AnalysisStatus: S.optional(S.String),
          NextPageToken: S.optional(S.String),
          PageSize: S.optional(S.Number),
          AnalysisIds: S.optional(__S(32, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCommitmentPurchaseAnalysesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EstimatedCompletionTime: S.optional(S.String),
          AnalysisCompletionTime: S.optional(S.String),
          AnalysisStartedTime: S.optional(S.String),
          AnalysisStatus: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          AnalysisId: S.optional(S.String),
          CommitmentPurchaseAnalysisConfiguration: S.optional(__S(835, __c26, 3)),
        }),
      ).annotate({ identifier: "AnalysisSummary" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AnalysisSummaryList: S.optional(__S(1794, __c56, 2)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCommitmentPurchaseAnalysesResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCostAllocationTagBackfillHistoryRequest" });
    case 1:
      return S.Array(__S(1856, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          BackfillRequests: S.optional(__S(1825, __c57, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCostAllocationTagBackfillHistoryResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BackfillFrom: S.optional(S.String),
          RequestedAt: S.optional(S.String),
          CompletedAt: S.optional(S.String),
          BackfillStatus: S.optional(S.String),
          LastUpdatedAt: S.optional(S.String),
        }),
      ).annotate({ identifier: "CostAllocationTagBackfillRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          TagKeys: S.optional(__S(32, __c1, 0)),
          Type: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCostAllocationTagsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TagKey: S.String,
          Type: S.String,
          Status: S.String,
          LastUpdatedDate: S.optional(S.String),
          LastUsedDate: S.optional(S.String),
        }),
      ).annotate({ identifier: "CostAllocationTag" });
    case 2:
      return S.Array(__S(1889, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CostAllocationTags: S.optional(__S(1890, __c59, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCostAllocationTagsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EffectiveOn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          SupportedResourceTypes: S.optional(__S(32, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCostCategoryDefinitionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CostCategoryArn: S.optional(S.String),
          Name: S.optional(S.String),
          EffectiveStart: S.optional(S.String),
          EffectiveEnd: S.optional(S.String),
          NumberOfRules: S.optional(S.Number),
          ProcessingStatus: S.optional(__S(577, __c18, 1)),
          Values: S.optional(__S(32, __c1, 0)),
          DefaultValue: S.optional(S.String),
          SupportedResourceTypes: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "CostCategoryReference" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CostCategoryReferences: S.optional(__S(1922, __c60, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCostCategoryDefinitionsResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CostCategoryArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListCostCategoryResourceAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          CostCategoryName: S.optional(S.String),
          CostCategoryArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CostCategoryResourceAssociation" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          CostCategoryResourceAssociations: S.optional(__S(1954, __c61, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCostCategoryResourceAssociationsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GenerationStatus: S.optional(S.String),
          RecommendationIds: S.optional(__S(32, __c1, 0)),
          PageSize: S.optional(S.Number),
          NextPageToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSavingsPlansPurchaseRecommendationGenerationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommendationId: S.optional(S.String),
          GenerationStatus: S.optional(S.String),
          GenerationStartedTime: S.optional(S.String),
          GenerationCompletionTime: S.optional(S.String),
          EstimatedCompletionTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "GenerationSummary" });
    case 2:
      return S.Array(__S(1985, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          GenerationSummaryList: S.optional(__S(1986, __c62, 2)),
          NextPageToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListSavingsPlansPurchaseRecommendationGenerationResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResourceTags: S.optional(__S(97, __c3, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AnomalyId: S.String, Feedback: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ProvideAnomalyFeedbackRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AnomalyId: S.String })).annotate({
        identifier: "ProvideAnomalyFeedbackResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CommitmentPurchaseAnalysisConfiguration: __S(835, __c26, 3) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartCommitmentPurchaseAnalysisRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnalysisId: S.String,
          AnalysisStartedTime: S.String,
          EstimatedCompletionTime: S.String,
        }),
      ).annotate({ identifier: "StartCommitmentPurchaseAnalysisResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ BackfillFrom: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartCostAllocationTagBackfillRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ BackfillRequest: S.optional(__S(1856, __c58, 0)) }),
      ).annotate({ identifier: "StartCostAllocationTagBackfillResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartSavingsPlansPurchaseRecommendationGenerationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RecommendationId: S.optional(S.String),
          GenerationStartedTime: S.optional(S.String),
          EstimatedCompletionTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartSavingsPlansPurchaseRecommendationGenerationResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, ResourceTags: __S(97, __c3, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, ResourceTagKeys: __S(32, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MonitorArn: S.String, MonitorName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAnomalyMonitorRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubscriptionArn: S.String,
          Threshold: S.optional(S.Number),
          Frequency: S.optional(S.String),
          MonitorArnList: S.optional(__S(32, __c1, 0)),
          Subscribers: S.optional(__S(257, __c8, 1)),
          SubscriptionName: S.optional(S.String),
          ThresholdExpression: S.optional(__S(68, __c2, 4)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAnomalySubscriptionRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TagKey: S.String, Status: S.String })).annotate({
        identifier: "CostAllocationTagStatusEntry",
      });
    case 1:
      return S.Array(__S(2304, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ CostAllocationTagsStatus: __S(2305, __c72, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateCostAllocationTagsStatusRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TagKey: S.optional(S.String),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateCostAllocationTagsStatusError" });
    case 4:
      return S.Array(__S(2307, __c72, 3));
    case 5:
      return S.suspend(() => S.Struct({ Errors: S.optional(__S(2308, __c72, 4)) })).annotate({
        identifier: "UpdateCostAllocationTagsStatusResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CostCategoryArn: S.String,
          EffectiveStart: S.optional(S.String),
          RuleVersion: S.String,
          Rules: __S(354, __c11, 2),
          DefaultValue: S.optional(S.String),
          SplitChargeRules: S.optional(__S(358, __c11, 6)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateCostCategoryDefinitionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
