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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Billing", serviceShapeName: "AWSBilling" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "billing" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-09-07");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
    const _p0 = () => ({ authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }] });
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
            return e("https://billing.us-east-1.api.aws", _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws" &&
            UseFIPS === false &&
            UseDualStack === false
          ) {
            return e("https://billing.us-east-1.api.aws", _p0(), {});
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://billing-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
                `https://billing-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://billing.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://billing.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p1(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://billing.us-east-1.api.aws","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingAccessDenied", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ S.TaggedError<BillingViewHealthStatusException>()(
    "BillingViewHealthStatusException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingConflict", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingInternalServer", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingResourceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingServiceQuotaExceeded", httpResponseCode: 402 }),
      /*@__PURE__*/ T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingThrottling", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(417, __c26, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingValidation", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type BillingViewArn = string;
export type BillingViewSourceViewsList = string[];
export interface AssociateSourceViewsRequest {
  arn: string;
  sourceViews: string[];
}
export interface AssociateSourceViewsResponse {
  arn: string;
}
export type BillingViewName = string | redacted.Redacted<string>;
export type BillingViewDescription = string | redacted.Redacted<string>;
export type Dimension = "LINKED_ACCOUNT" | (string & {});
export type Value = string;
export type Values = string[];
export interface DimensionValues {
  key: Dimension;
  values: string[];
}
export type TagKey = string;
export interface TagValues {
  key: string;
  values: string[];
}
export type CostCategoryName = string;
export interface CostCategoryValues {
  key: string;
  values: string[];
}
export interface TimeRange {
  beginDateInclusive?: Date;
  endDateInclusive?: Date;
}
export interface Expression {
  dimensions?: DimensionValues;
  tags?: TagValues;
  costCategories?: CostCategoryValues;
  timeRange?: TimeRange;
}
export type ClientToken = string;
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  key: string;
  value?: string;
}
export type ResourceTagList = ResourceTag[];
export interface CreateBillingViewRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  sourceViews: string[];
  dataFilterExpression?: Expression;
  clientToken?: string;
  resourceTags?: ResourceTag[];
}
export interface CreateBillingViewResponse {
  arn: string;
  createdAt?: Date;
}
export interface DeleteBillingViewRequest {
  arn: string;
  force?: boolean;
}
export interface DeleteBillingViewResponse {
  arn: string;
}
export interface DisassociateSourceViewsRequest {
  arn: string;
  sourceViews: string[];
}
export interface DisassociateSourceViewsResponse {
  arn: string;
}
export type PageToken = string;
export type BillingFeature =
  | "RI_SHARING"
  | "RI_SHARING_HISTORY"
  | "CREDIT_SHARING"
  | "CREDIT_SHARING_HISTORY"
  | "CREDIT_LEVEL_SHARING"
  | "BILLING_ALERTS"
  | "CREDIT_PREFERENCE_OPTIONS"
  | (string & {});
export type BillingFeatures = BillingFeature[];
export type BillingFeatureFilterName = "PREFERENCE_KEY" | (string & {});
export type BillingFeatureFilterValue = string;
export type BillingFeatureFilterValues = string[];
export interface BillingFeatureFilter {
  name?: BillingFeatureFilterName;
  value?: string[];
}
export type BillingFeatureFilters = BillingFeatureFilter[];
export interface GetBillingPreferencesRequest {
  nextToken?: string;
  maxResults?: number;
  features: BillingFeature[];
  filters?: BillingFeatureFilter[];
}
export type PreferenceKey = string;
export type PreferenceValue = "ENABLED" | "DISABLED" | (string & {});
export type AccountName = string;
export type AccountId = string;
export type BillingYear = number;
export type Month = number;
export interface BillingPeriod {
  year: number;
  month: number;
}
export interface BillingPreferenceSummary {
  feature: BillingFeature;
  key: string;
  value: PreferenceValue;
  accountName?: string;
  accountId?: string;
  billingPeriod?: BillingPeriod;
}
export type BillingPreferences = BillingPreferenceSummary[];
export interface GetBillingPreferencesResponse {
  billingPreferences: BillingPreferenceSummary[];
  nextToken?: string;
}
export interface GetBillingViewRequest {
  arn: string;
}
export type BillingViewType =
  | "PRIMARY"
  | "BILLING_GROUP"
  | "CUSTOM"
  | "BILLING_TRANSFER"
  | "BILLING_TRANSFER_SHOWBACK"
  | (string & {});
export type BillingViewStatus = "HEALTHY" | "UNHEALTHY" | "CREATING" | "UPDATING" | (string & {});
export type BillingViewStatusReason =
  | "SOURCE_VIEW_UNHEALTHY"
  | "SOURCE_VIEW_UPDATING"
  | "SOURCE_VIEW_ACCESS_DENIED"
  | "SOURCE_VIEW_NOT_FOUND"
  | "CYCLIC_DEPENDENCY"
  | "SOURCE_VIEW_DEPTH_EXCEEDED"
  | "AGGREGATE_SOURCE"
  | "VIEW_OWNER_NOT_MANAGEMENT_ACCOUNT"
  | (string & {});
export type BillingViewStatusReasons = BillingViewStatusReason[];
export interface BillingViewHealthStatus {
  statusCode?: BillingViewStatus;
  statusReasons?: BillingViewStatusReason[];
}
export interface BillingViewElement {
  arn?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  billingViewType?: BillingViewType;
  ownerAccountId?: string;
  sourceAccountId?: string;
  dataFilterExpression?: Expression;
  createdAt?: Date;
  updatedAt?: Date;
  derivedViewCount?: number;
  sourceViewCount?: number;
  viewDefinitionLastUpdatedAt?: Date;
  healthStatus?: BillingViewHealthStatus;
}
export interface GetBillingViewResponse {
  billingView: BillingViewElement;
}
export interface GetCreditAllocationHistoryRequest {
  accountId: string;
  creditId?: number;
  startDate: Date;
  endDate: Date;
  nextToken?: string;
  maxResults?: number;
}
export type CreditId = string;
export type CurrencyCode = string;
export type CurrencyAmount = string;
export interface Amount {
  currencyCode: string;
  currencyAmount: string;
}
export type BillingMonth = string;
export interface CreditAllocationHistoryEntry {
  creditId: string;
  creditAmount: Amount;
  description?: string;
  accountId: string;
  appliedServiceName: string;
  billingMonth: string;
  isEstimatedBill: boolean;
}
export type CreditAllocationHistoryList = CreditAllocationHistoryEntry[];
export type FailedMonthsList = string[];
export interface GetCreditAllocationHistoryResponse {
  creditAllocationHistoryList?: CreditAllocationHistoryEntry[];
  partialResults: boolean;
  failedMonths?: string[];
  nextToken?: string;
}
export interface GetCreditsRequest {
  accountId: string;
  startDate: Date;
  endDate?: Date;
  payerAccountFlag?: boolean;
}
export type ProductName = string;
export type ProductNames = string[];
export type ApplicationType = "BEFORE_CROSS_SERVICE_DISCOUNTS" | "AFTER_DISCOUNTS" | (string & {});
export type ShareableAccountIds = string[];
export type CreditSharingType =
  | "DEFAULT"
  | "DISABLED"
  | "CUSTOM"
  | "COST_CATEGORY_RULE"
  | (string & {});
export type CreditStatus = "ENABLED" | "DISABLED" | (string & {});
export type PurchaseType = string;
export type PurchaseTypeApplications = string[];
export interface CreditData {
  creditId: string;
  accountId: string;
  creditType: string;
  initialAmount: Amount;
  remainingAmount: Amount;
  estimatedAmount?: Amount;
  applicableProductNames?: string[];
  description: string;
  startDate: Date;
  endDate?: Date;
  exhaustDate?: Date;
  applicationType?: ApplicationType;
  shareableAccounts?: string[];
  accountHasCreditSharingEnabled?: boolean;
  creditConsoleVisibility?: string;
  creditSharingType?: CreditSharingType;
  costCategoryArn?: string;
  ruleName?: string;
  creditStatus?: CreditStatus;
  purchaseTypeApplications?: string[];
}
export type CreditDataList = CreditData[];
export interface GetCreditsResponse {
  credits?: CreditData[];
}
export type EnterpriseSupportBillingMonth = string;
export interface GetEnterpriseSupportChargeSummaryRequest {
  billingMonth: string;
}
export interface PricingPlanTier {
  tierMinimum: string;
  tierMaximum?: string;
  baseCharge: string;
  additionalPercentageOfAggregateCharges: string;
  aggregateChargesAdjustment: string;
  incremental: boolean;
  increment?: string;
  incrementCharge?: string;
}
export type PricingPlanTierList = PricingPlanTier[];
export interface PricingPlan {
  pricingPlanId?: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  planDiscountPercent?: string;
  discountAppliesToMinimumCharge?: boolean;
  minimumCharge?: string;
  tiered?: string;
  tiers: PricingPlanTier[];
}
export interface GetEnterpriseSupportChargeSummaryResponse {
  payerAccountId: string;
  billingMonth: string;
  billingPeriodStartDate: Date;
  billingPeriodEndDate: Date;
  isEstimated: boolean;
  billDate: Date;
  supportCharge: string;
  totalSupportCharge: string;
  supportDiscount: string;
  totalSupportEligibleSpend: string;
  totalSupportEligibleUsageSpend: string;
  totalSupportEligibleReservedInstanceSpend: string;
  totalSupportEligibleSavingsPlanSpend: string;
  supportChargePercentage: string;
  supportEffectivePricingPlan: PricingPlan;
}
export interface GetEnterpriseSupportContractDetailsRequest {
  billingMonth: string;
}
export interface ContractAccount {
  accountId: string;
  isGdn: boolean;
}
export type ContractAccountList = ContractAccount[];
export interface ChargeAccount {
  accountId: string;
  chargePercentage: string;
}
export type ChargeAccountList = ChargeAccount[];
export interface AdditionalCharge {
  description: string;
  amount?: string;
  chargeType?: string;
}
export type AdditionalChargeList = AdditionalCharge[];
export type PricingPlanList = PricingPlan[];
export interface GetEnterpriseSupportContractDetailsResponse {
  isContractActive?: boolean;
  supportAllocationMethod: string;
  supportReservedInstanceAmortizationStartDate?: Date;
  supportReservedInstanceTreatmentMethod?: string;
  supportSavingsPlansAmortizationStartDate?: Date;
  supportSavingsPlansTreatmentMethod?: string;
  supportProrateStartDate?: Date;
  contractPayerAccountIds: ContractAccount[];
  chargedPayerAccountIds: ChargeAccount[];
  additionalSupportCharge?: AdditionalCharge[];
  additionalSupportEligibleUsageSpend?: AdditionalCharge[];
  pricingPlans: PricingPlan[];
}
export type ResourceArn = string;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export type PolicyDocument = string;
export interface GetResourcePolicyResponse {
  resourceArn: string;
  policy?: string;
}
export interface ActiveTimeRange {
  activeAfterInclusive: Date;
  activeBeforeInclusive: Date;
}
export type BillingViewArnList = string[];
export type BillingViewTypeList = BillingViewType[];
export type SearchOption = "STARTS_WITH" | (string & {});
export type SearchValue = string;
export interface StringSearch {
  searchOption: SearchOption;
  searchValue: string;
}
export type StringSearches = StringSearch[];
export type BillingViewsMaxResults = number;
export interface ListBillingViewsRequest {
  activeTimeRange?: ActiveTimeRange;
  arns?: string[];
  billingViewTypes?: BillingViewType[];
  names?: StringSearch[];
  ownerAccountId?: string;
  sourceAccountId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface BillingViewListElement {
  arn?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  ownerAccountId?: string;
  sourceAccountId?: string;
  billingViewType?: BillingViewType;
  healthStatus?: BillingViewHealthStatus;
}
export type BillingViewList = BillingViewListElement[];
export interface ListBillingViewsResponse {
  billingViews: BillingViewListElement[];
  nextToken?: string;
}
export interface BillingViewSegmentTimeRange {
  beginDateInclusive?: Date;
  endDateExclusive?: Date;
}
export interface ListBillingViewSegmentsRequest {
  timeRange?: BillingViewSegmentTimeRange;
  arn?: string;
  maxResults?: number;
  nextToken?: string;
}
export type BillingDomain = "BILLABLE" | "PRO_FORMA" | (string & {});
export interface BillingViewSegmentsListElement {
  domain?: BillingDomain;
  timeRange?: BillingViewSegmentTimeRange;
  billingTransferAccountId?: string;
  managementAccountId?: string;
  billingGroupPrimaryAccountId?: string;
}
export type BillingViewSegmentsList = BillingViewSegmentsListElement[];
export interface ListBillingViewSegmentsResponse {
  items: BillingViewSegmentsListElement[];
  nextToken?: string;
}
export type BusinessSupportBillingMonth = string;
export interface ListBusinessSupportAccountChargesRequest {
  billingMonth: string;
  accountId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface BusinessSupportTierCharge {
  tierDescription: string;
  tierRate: string;
  usageSlice: string;
  tierCharge: string;
  chargePeriodStartDate?: Date;
  chargePeriodEndDate?: Date;
}
export type BusinessSupportTierChargeList = BusinessSupportTierCharge[];
export interface BusinessSupportDiscount {
  discountAmount?: string;
  discountPercentage?: string;
  discountType?: string;
  discountSource?: string;
}
export interface BusinessSupportServiceSpend {
  contributingService: string;
  itemType: string;
  description?: string;
  chargeAmount: string;
  currency: string;
}
export type BusinessSupportServiceSpendList = BusinessSupportServiceSpend[];
export interface BusinessSupportAccountCharge {
  accountId: string;
  supportPlanName: string;
  totalCharge: string;
  totalUsageBasis: string;
  tierCharges?: BusinessSupportTierCharge[];
  supportDiscount?: BusinessSupportDiscount;
  supportEligibleSpendByService?: BusinessSupportServiceSpend[];
}
export type BusinessSupportAccountChargeList = BusinessSupportAccountCharge[];
export interface ListBusinessSupportAccountChargesResponse {
  billingMonth: string;
  isEstimated: boolean;
  totalSupportCharge: string;
  totalSupportEligibleSpend: string;
  accountCount: number;
  accountCharges: BusinessSupportAccountCharge[];
  nextToken?: string;
}
export interface ListBusinessSupportSubscriptionHistoryRequest {
  billingMonth?: string;
  accountId?: string;
  startDate?: Date;
  endDate?: Date;
  maxResults?: number;
  nextToken?: string;
}
export interface BusinessSupportSubscriptionContract {
  accountId: string;
  planName: string;
  contractStartDate: Date;
  contractEndDate: Date;
}
export type BusinessSupportSubscriptionContractList = BusinessSupportSubscriptionContract[];
export interface ListBusinessSupportSubscriptionHistoryResponse {
  subscriptionContracts: BusinessSupportSubscriptionContract[];
  nextToken?: string;
}
export interface ListEnterpriseSupportLinkedAccountChargesRequest {
  billingMonth: string;
  accountId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface EnterpriseSupportTimePeriod {
  beginDate: Date;
  endDate?: Date;
}
export type TimePeriodList = EnterpriseSupportTimePeriod[];
export interface ServiceLevelAccountUsage {
  serviceCode?: string;
  totalSupportEligibleSpend?: string;
}
export type ServiceLevelAccountUsageList = ServiceLevelAccountUsage[];
export interface LinkedAccountCharge {
  accountId: string;
  payerAccountId: string;
  accountType?: string;
  billableSeconds: number;
  totalSeconds: number;
  totalSupportEligibleSpend: string;
  proratedTotalSupportEligibleSpend: string;
  linkedTimePeriods?: EnterpriseSupportTimePeriod[];
  subscriptionTimePeriods?: EnterpriseSupportTimePeriod[];
  totalSupportEligibleReservedInstanceSpend?: string;
  totalSupportEligibleSavingsPlanSpend?: string;
  supportEligibleSpendByService?: ServiceLevelAccountUsage[];
}
export type LinkedAccountChargeList = LinkedAccountCharge[];
export interface ListEnterpriseSupportLinkedAccountChargesResponse {
  linkedAccount: LinkedAccountCharge[];
  nextToken?: string;
}
export interface ListSourceViewsForBillingViewRequest {
  arn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListSourceViewsForBillingViewResponse {
  sourceViews: string[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  resourceTags?: ResourceTag[];
}
export type PromoCode = string;
export interface RedeemCreditsRequest {
  promoCode: string;
}
export interface RedeemCreditsResponse {}
export interface TagResourceRequest {
  resourceArn: string;
  resourceTags: ResourceTag[];
}
export interface TagResourceResponse {}
export type ResourceTagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  resourceTagKeys: string[];
}
export interface UntagResourceResponse {}
export interface BillingPreferenceForKey {
  key: string;
  value: PreferenceValue;
}
export type BillingPreferencesPerKey = BillingPreferenceForKey[];
export interface UpdateBillingPreferencesRequest {
  feature: BillingFeature;
  billingPreferencesPerKey: BillingPreferenceForKey[];
}
export interface UpdateBillingPreferencesResponse {}
export interface UpdateBillingViewRequest {
  arn: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  dataFilterExpression?: Expression;
}
export interface UpdateBillingViewResponse {
  arn: string;
  updatedAt?: Date;
}
export type ErrorMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export type FieldName = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateSourceViewsError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates one or more source billing views with an existing billing view. This allows creating aggregate billing views that combine data from multiple sources.
 */
export const associateSourceViews: API.OperationMethod<
  AssociateSourceViewsRequest,
  AssociateSourceViewsResponse,
  AssociateSourceViewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<AssociateSourceViewsRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<AssociateSourceViewsResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceViews",
}));

export type CreateBillingViewError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a billing view with the specified billing view attributes.
 */
export const createBillingView: API.OperationMethod<
  CreateBillingViewRequest,
  CreateBillingViewResponse,
  CreateBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<CreateBillingViewRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<CreateBillingViewResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingView",
}));

export type DeleteBillingViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified billing view.
 */
export const deleteBillingView: API.OperationMethod<
  DeleteBillingViewRequest,
  DeleteBillingViewResponse,
  DeleteBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteBillingViewRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteBillingViewResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingView",
}));

export type DisassociateSourceViewsError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between one or more source billing views and an existing billing view. This allows modifying the composition of aggregate billing views.
 */
export const disassociateSourceViews: API.OperationMethod<
  DisassociateSourceViewsRequest,
  DisassociateSourceViewsResponse,
  DisassociateSourceViewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<DisassociateSourceViewsRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DisassociateSourceViewsResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceViews",
}));

export type GetBillingPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves billing preferences for the specified feature. Each feature controls a distinct billing capability: which accounts can share Reserved Instances or credits, whether billing alerts are enabled, the historical record of sharing changes, and per-credit options.
 */
export const getBillingPreferences: API.OperationMethod<
  GetBillingPreferencesRequest,
  GetBillingPreferencesResponse,
  GetBillingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(34, __c2, 2) as any as S.Schema<GetBillingPreferencesRequest>,
  output: __S(38, __c2, 6) as any as S.Schema<GetBillingPreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingPreferences",
}));

export type GetBillingViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata associated to the specified billing view ARN.
 */
export const getBillingView: API.OperationMethod<
  GetBillingViewRequest,
  GetBillingViewResponse,
  GetBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<GetBillingViewRequest>,
  output: __S(66, __c4, 2) as any as S.Schema<GetBillingViewResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingView",
}));

export type GetCreditAllocationHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the per-billing-month allocation history for credits applied to an Amazon Web Services account's bills. Traverses the consolidated billing family to capture cross-account credit applications. Supports pagination and optional filtering to a single credit.
 */
export const getCreditAllocationHistory: API.PaginatedOperationMethod<
  GetCreditAllocationHistoryRequest,
  GetCreditAllocationHistoryResponse,
  GetCreditAllocationHistoryError,
  Credentials | HttpClient.HttpClient,
  CreditAllocationHistoryEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetCreditAllocationHistoryRequest>,
  output: __S(99, __c6, 3) as any as S.Schema<GetCreditAllocationHistoryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCreditAllocationHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "creditAllocationHistoryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCreditsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of Amazon Web Services account credits for the specified account. Each credit includes its identifier, type, monetary amounts, applicable products, expiration, sharing configuration, and current enabled status.
 *
 * When the caller is the management account of a consolidated billing family and `payerAccountFlag` is `true`, the response aggregates credits across the entire family. Otherwise, the response includes only credits owned by the account specified in `accountId`.
 */
export const getCredits: API.OperationMethod<
  GetCreditsRequest,
  GetCreditsResponse,
  GetCreditsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<GetCreditsRequest>,
  output: __S(131, __c8, 3) as any as S.Schema<GetCreditsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredits",
}));

export type GetEnterpriseSupportChargeSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a summary of Enterprise Support data aggregated across all accounts in the Enterprise Support profile.
 */
export const getEnterpriseSupportChargeSummary: API.OperationMethod<
  GetEnterpriseSupportChargeSummaryRequest,
  GetEnterpriseSupportChargeSummaryResponse,
  GetEnterpriseSupportChargeSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<GetEnterpriseSupportChargeSummaryRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<GetEnterpriseSupportChargeSummaryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnterpriseSupportChargeSummary",
}));

export type GetEnterpriseSupportContractDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns Enterprise Support contract details.
 */
export const getEnterpriseSupportContractDetails: API.OperationMethod<
  GetEnterpriseSupportContractDetailsRequest,
  GetEnterpriseSupportContractDetailsResponse,
  GetEnterpriseSupportContractDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<GetEnterpriseSupportContractDetailsRequest>,
  output: __S(184, __c11, 8) as any as S.Schema<GetEnterpriseSupportContractDetailsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnterpriseSupportContractDetails",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource-based policy document attached to the resource in `JSON` format.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListBillingViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the billing views available for a given time period.
 *
 * Every Amazon Web Services account has a unique `PRIMARY` billing view that represents the billing data available by default. Accounts that use Billing Conductor also have `BILLING_GROUP` billing views representing pro forma costs associated with each created billing group.
 */
export const listBillingViews: API.PaginatedOperationMethod<
  ListBillingViewsRequest,
  ListBillingViewsResponse,
  ListBillingViewsError,
  Credentials | HttpClient.HttpClient,
  BillingViewListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(211, __c13, 3) as any as S.Schema<ListBillingViewsRequest>,
  output: __S(214, __c13, 6) as any as S.Schema<ListBillingViewsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "billingViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillingViewSegmentsError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the segments of a billing view over a given time period. Each segment identifies the billing domain (`PRO_FORMA` or `BILLABLE`) and the account relationships that apply during its time range.
 *
 * If you don't provide an `arn`, the response includes segments for the caller's `PRIMARY` billing view.
 *
 * If a mid-period change occurs, the response includes multiple segments, each with its own time range. The response omits hidden segments, so the segments it returns might not cover the entire requested time period.
 */
export const listBillingViewSegments: API.PaginatedOperationMethod<
  ListBillingViewSegmentsRequest,
  ListBillingViewSegmentsResponse,
  ListBillingViewSegmentsError,
  Credentials | HttpClient.HttpClient,
  BillingViewSegmentsListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(225, __c14, 1) as any as S.Schema<ListBillingViewSegmentsRequest>,
  output: __S(228, __c14, 4) as any as S.Schema<ListBillingViewSegmentsResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingViewSegments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBusinessSupportAccountChargesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns Business Support charges broken down at the linked account level for a given billing month.
 */
export const listBusinessSupportAccountCharges: API.PaginatedOperationMethod<
  ListBusinessSupportAccountChargesRequest,
  ListBusinessSupportAccountChargesResponse,
  ListBusinessSupportAccountChargesError,
  Credentials | HttpClient.HttpClient,
  BusinessSupportAccountCharge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListBusinessSupportAccountChargesRequest>,
  output: __S(248, __c15, 8) as any as S.Schema<ListBusinessSupportAccountChargesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBusinessSupportAccountCharges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountCharges",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBusinessSupportSubscriptionHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the history of Business Support subscription contracts across accounts.
 */
export const listBusinessSupportSubscriptionHistory: API.PaginatedOperationMethod<
  ListBusinessSupportSubscriptionHistoryRequest,
  ListBusinessSupportSubscriptionHistoryResponse,
  ListBusinessSupportSubscriptionHistoryError,
  Credentials | HttpClient.HttpClient,
  BusinessSupportSubscriptionContract
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<ListBusinessSupportSubscriptionHistoryRequest>,
  output: __S(259, __c16, 3) as any as S.Schema<ListBusinessSupportSubscriptionHistoryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBusinessSupportSubscriptionHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptionContracts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnterpriseSupportLinkedAccountChargesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns Support-eligible spend broken down at linked account level.
 */
export const listEnterpriseSupportLinkedAccountCharges: API.PaginatedOperationMethod<
  ListEnterpriseSupportLinkedAccountChargesRequest,
  ListEnterpriseSupportLinkedAccountChargesResponse,
  ListEnterpriseSupportLinkedAccountChargesError,
  Credentials | HttpClient.HttpClient,
  LinkedAccountCharge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListEnterpriseSupportLinkedAccountChargesRequest>,
  output: __S(279, __c17, 7) as any as S.Schema<ListEnterpriseSupportLinkedAccountChargesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnterpriseSupportLinkedAccountCharges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "linkedAccount",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceViewsForBillingViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the source views (managed Amazon Web Services billing views) associated with the billing view.
 */
export const listSourceViewsForBillingView: API.PaginatedOperationMethod<
  ListSourceViewsForBillingViewRequest,
  ListSourceViewsForBillingViewResponse,
  ListSourceViewsForBillingViewError,
  Credentials | HttpClient.HttpClient,
  BillingViewArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListSourceViewsForBillingViewRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<ListSourceViewsForBillingViewResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceViewsForBillingView",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sourceViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags associated with the billing view resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RedeemCreditsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Redeems an Amazon Web Services promotional credit code on behalf of the calling account. On success, a new credit is added to the account's credit ledger with the amount, validity period, and applicable products defined by the promotion. The credit is then automatically applied to subsequent bills according to the standard credit application order.
 */
export const redeemCredits: API.OperationMethod<
  RedeemCreditsRequest,
  RedeemCreditsResponse,
  RedeemCreditsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<RedeemCreditsRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<RedeemCreditsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedeemCredits",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * An API operation for adding one or more tags (key-value pairs) to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from a resource. Specify only tag keys in your request. Don't specify the value.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateBillingPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates billing preferences for the specified feature. Each feature targets a distinct billing capability and has its own set of supported keys. The action sets the value for each provided key; keys not present in the request are unchanged.
 *
 * Sharing keys (`RI_SHARING`, `CREDIT_SHARING`, `CREDIT_LEVEL_SHARING`, and sharing keys under `CREDIT_PREFERENCE_OPTIONS`) may only be set by the management account of a consolidated billing family. The `credit/{creditId}/status` key may be set by member accounts for credits they own, or by the management account for any credit in the family.
 */
export const updateBillingPreferences: API.OperationMethod<
  UpdateBillingPreferencesRequest,
  UpdateBillingPreferencesResponse,
  UpdateBillingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(386, __c24, 2) as any as S.Schema<UpdateBillingPreferencesRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<UpdateBillingPreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillingPreferences",
}));

export type UpdateBillingViewError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * An API to update the attributes of the billing view.
 */
export const updateBillingView: API.OperationMethod<
  UpdateBillingViewRequest,
  UpdateBillingViewResponse,
  UpdateBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateBillingViewRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<UpdateBillingViewResponse>,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillingView",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, force: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBillingViewRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, sourceViews: __S(464, __c29, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateSourceViewsRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(__S(464, __c29, 0)) }),
      ).annotate({ identifier: "BillingFeatureFilter" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          features: __S(48, __c3, 0),
          filters: S.optional(__S(33, __c2, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetBillingPreferencesRequest" });
    case 3:
      return S.suspend(() => S.Struct({ year: S.Number, month: S.Number })).annotate({
        identifier: "BillingPeriod",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          feature: S.String,
          key: S.String,
          value: S.String,
          accountName: S.optional(S.String),
          accountId: S.optional(S.String),
          billingPeriod: S.optional(__S(35, __c2, 3)),
        }),
      ).annotate({ identifier: "BillingPreferenceSummary" });
    case 5:
      return S.Array(__S(36, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ billingPreferences: __S(37, __c2, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetBillingPreferencesResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBillingViewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          billingViewType: S.optional(S.String),
          ownerAccountId: S.optional(S.String),
          sourceAccountId: S.optional(S.String),
          dataFilterExpression: S.optional(__S(499, __c31, 3)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          derivedViewCount: S.optional(S.Number),
          sourceViewCount: S.optional(S.Number),
          viewDefinitionLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          healthStatus: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "BillingViewElement" });
    case 2:
      return S.suspend(() => S.Struct({ billingView: __S(65, __c4, 1) })).annotate({
        identifier: "GetBillingViewResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ statusCode: S.optional(S.String), statusReasons: S.optional(__S(48, __c3, 0)) }),
      ).annotate({ identifier: "BillingViewHealthStatus" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          creditId: S.optional(S.Number),
          startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCreditAllocationHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creditId: S.String,
          creditAmount: __S(112, __c7, 0),
          description: S.optional(S.String),
          accountId: S.String,
          appliedServiceName: S.String,
          billingMonth: S.String,
          isEstimatedBill: S.Boolean,
        }),
      ).annotate({ identifier: "CreditAllocationHistoryEntry" });
    case 2:
      return S.Array(__S(97, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          creditAllocationHistoryList: S.optional(__S(98, __c6, 2)),
          partialResults: S.Boolean,
          failedMonths: S.optional(__S(464, __c29, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCreditAllocationHistoryResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ currencyCode: S.String, currencyAmount: S.String }),
      ).annotate({ identifier: "Amount" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          payerAccountFlag: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetCreditsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          creditId: S.String,
          accountId: S.String,
          creditType: S.String,
          initialAmount: __S(112, __c7, 0),
          remainingAmount: __S(112, __c7, 0),
          estimatedAmount: S.optional(__S(112, __c7, 0)),
          applicableProductNames: S.optional(__S(464, __c29, 0)),
          description: S.String,
          startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          exhaustDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          applicationType: S.optional(S.String),
          shareableAccounts: S.optional(__S(464, __c29, 0)),
          accountHasCreditSharingEnabled: S.optional(S.Boolean),
          creditConsoleVisibility: S.optional(S.String),
          creditSharingType: S.optional(S.String),
          costCategoryArn: S.optional(S.String),
          ruleName: S.optional(S.String),
          creditStatus: S.optional(S.String),
          purchaseTypeApplications: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "CreditData" });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() => S.Struct({ credits: S.optional(__S(130, __c8, 2)) })).annotate({
        identifier: "GetCreditsResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ billingMonth: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnterpriseSupportChargeSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          payerAccountId: S.String,
          billingMonth: S.String,
          billingPeriodStartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          billingPeriodEndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          isEstimated: S.Boolean,
          billDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          supportCharge: S.String,
          totalSupportCharge: S.String,
          supportDiscount: S.String,
          totalSupportEligibleSpend: S.String,
          totalSupportEligibleUsageSpend: S.String,
          totalSupportEligibleReservedInstanceSpend: S.String,
          totalSupportEligibleSavingsPlanSpend: S.String,
          supportChargePercentage: S.String,
          supportEffectivePricingPlan: __S(162, __c10, 2),
        }),
      ).annotate({ identifier: "GetEnterpriseSupportChargeSummaryResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          tierMinimum: S.String,
          tierMaximum: S.optional(S.String),
          baseCharge: S.String,
          additionalPercentageOfAggregateCharges: S.String,
          aggregateChargesAdjustment: S.String,
          incremental: S.Boolean,
          increment: S.optional(S.String),
          incrementCharge: S.optional(S.String),
        }),
      ).annotate({ identifier: "PricingPlanTier" });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          pricingPlanId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          startDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          planDiscountPercent: S.optional(S.String),
          discountAppliesToMinimumCharge: S.optional(S.Boolean),
          minimumCharge: S.optional(S.String),
          tiered: S.optional(S.String),
          tiers: __S(161, __c10, 1),
        }),
      ).annotate({ identifier: "PricingPlan" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ billingMonth: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEnterpriseSupportContractDetailsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ accountId: S.String, isGdn: S.Boolean })).annotate({
        identifier: "ContractAccount",
      });
    case 2:
      return S.Array(__S(177, __c11, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, chargePercentage: S.String }),
      ).annotate({ identifier: "ChargeAccount" });
    case 4:
      return S.Array(__S(179, __c11, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          description: S.String,
          amount: S.optional(S.String),
          chargeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdditionalCharge" });
    case 6:
      return S.Array(__S(181, __c11, 5));
    case 7:
      return S.Array(__S(162, __c10, 2));
    case 8:
      return S.suspend(() =>
        S.Struct({
          isContractActive: S.optional(S.Boolean),
          supportAllocationMethod: S.String,
          supportReservedInstanceAmortizationStartDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          supportReservedInstanceTreatmentMethod: S.optional(S.String),
          supportSavingsPlansAmortizationStartDate: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          supportSavingsPlansTreatmentMethod: S.optional(S.String),
          supportProrateStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          contractPayerAccountIds: __S(178, __c11, 2),
          chargedPayerAccountIds: __S(180, __c11, 4),
          additionalSupportCharge: S.optional(__S(182, __c11, 6)),
          additionalSupportEligibleUsageSpend: S.optional(__S(182, __c11, 6)),
          pricingPlans: __S(183, __c11, 7),
        }),
      ).annotate({ identifier: "GetEnterpriseSupportContractDetailsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, policy: S.optional(S.String) }),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          activeAfterInclusive: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          activeBeforeInclusive: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ActiveTimeRange" });
    case 1:
      return S.suspend(() => S.Struct({ searchOption: S.String, searchValue: S.String })).annotate({
        identifier: "StringSearch",
      });
    case 2:
      return S.Array(__S(209, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          activeTimeRange: S.optional(__S(208, __c13, 0)),
          arns: S.optional(__S(464, __c29, 0)),
          billingViewTypes: S.optional(__S(48, __c3, 0)),
          names: S.optional(__S(210, __c13, 2)),
          ownerAccountId: S.optional(S.String),
          sourceAccountId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBillingViewsRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          ownerAccountId: S.optional(S.String),
          sourceAccountId: S.optional(S.String),
          billingViewType: S.optional(S.String),
          healthStatus: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "BillingViewListElement" });
    case 5:
      return S.Array(__S(212, __c13, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ billingViews: __S(213, __c13, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBillingViewsResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          beginDateInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endDateExclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BillingViewSegmentTimeRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timeRange: S.optional(__S(224, __c14, 0)),
          arn: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBillingViewSegmentsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          domain: S.optional(S.String),
          timeRange: S.optional(__S(224, __c14, 0)),
          billingTransferAccountId: S.optional(S.String),
          managementAccountId: S.optional(S.String),
          billingGroupPrimaryAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "BillingViewSegmentsListElement" });
    case 3:
      return S.Array(__S(226, __c14, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: __S(227, __c14, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBillingViewSegmentsResponse" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingMonth: S.String,
          accountId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBusinessSupportAccountChargesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          tierDescription: S.String,
          tierRate: S.String,
          usageSlice: S.String,
          tierCharge: S.String,
          chargePeriodStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          chargePeriodEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "BusinessSupportTierCharge" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          discountAmount: S.optional(S.String),
          discountPercentage: S.optional(S.String),
          discountType: S.optional(S.String),
          discountSource: S.optional(S.String),
        }),
      ).annotate({ identifier: "BusinessSupportDiscount" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          contributingService: S.String,
          itemType: S.String,
          description: S.optional(S.String),
          chargeAmount: S.String,
          currency: S.String,
        }),
      ).annotate({ identifier: "BusinessSupportServiceSpend" });
    case 5:
      return S.Array(__S(244, __c15, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          supportPlanName: S.String,
          totalCharge: S.String,
          totalUsageBasis: S.String,
          tierCharges: S.optional(__S(242, __c15, 2)),
          supportDiscount: S.optional(__S(243, __c15, 3)),
          supportEligibleSpendByService: S.optional(__S(245, __c15, 5)),
        }),
      ).annotate({ identifier: "BusinessSupportAccountCharge" });
    case 7:
      return S.Array(__S(246, __c15, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          billingMonth: S.String,
          isEstimated: S.Boolean,
          totalSupportCharge: S.String,
          totalSupportEligibleSpend: S.String,
          accountCount: S.Number,
          accountCharges: __S(247, __c15, 7),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBusinessSupportAccountChargesResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingMonth: S.optional(S.String),
          accountId: S.optional(S.String),
          startDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBusinessSupportSubscriptionHistoryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          planName: S.String,
          contractStartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          contractEndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "BusinessSupportSubscriptionContract" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ subscriptionContracts: __S(258, __c16, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBusinessSupportSubscriptionHistoryResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          billingMonth: S.String,
          accountId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEnterpriseSupportLinkedAccountChargesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          beginDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "EnterpriseSupportTimePeriod" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          serviceCode: S.optional(S.String),
          totalSupportEligibleSpend: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceLevelAccountUsage" });
    case 4:
      return S.Array(__S(275, __c17, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          payerAccountId: S.String,
          accountType: S.optional(S.String),
          billableSeconds: S.Number,
          totalSeconds: S.Number,
          totalSupportEligibleSpend: S.String,
          proratedTotalSupportEligibleSpend: S.String,
          linkedTimePeriods: S.optional(__S(274, __c17, 2)),
          subscriptionTimePeriods: S.optional(__S(274, __c17, 2)),
          totalSupportEligibleReservedInstanceSpend: S.optional(S.String),
          totalSupportEligibleSavingsPlanSpend: S.optional(S.String),
          supportEligibleSpendByService: S.optional(__S(276, __c17, 4)),
        }),
      ).annotate({ identifier: "LinkedAccountCharge" });
    case 6:
      return S.Array(__S(277, __c17, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ linkedAccount: __S(278, __c17, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnterpriseSupportLinkedAccountChargesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSourceViewsForBillingViewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ sourceViews: __S(464, __c29, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSourceViewsForBillingViewResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceTags: S.optional(__S(513, __c32, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ promoCode: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RedeemCreditsRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "RedeemCreditsResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourceTags: __S(513, __c32, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourceTagKeys: __S(464, __c29, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "BillingPreferenceForKey",
      });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ feature: S.String, billingPreferencesPerKey: __S(385, __c24, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateBillingPreferencesRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          dataFilterExpression: S.optional(__S(499, __c31, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateBillingViewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UpdateBillingViewResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(416, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, sourceViews: __S(464, __c29, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateSourceViewsRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "AssociateSourceViewsResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          sourceViews: __S(464, __c29, 0),
          dataFilterExpression: S.optional(__S(499, __c31, 3)),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          resourceTags: S.optional(__S(513, __c32, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBillingViewRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateBillingViewResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, values: __S(464, __c29, 0) })).annotate({
        identifier: "DimensionValues",
      });
    case 1:
      return S.suspend(() => S.Struct({ key: S.String, values: __S(464, __c29, 0) })).annotate({
        identifier: "TagValues",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          beginDateInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endDateInclusive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "TimeRange" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          dimensions: S.optional(__S(496, __c31, 0)),
          tags: S.optional(__S(497, __c31, 1)),
          costCategories: S.optional(__S(497, __c31, 1)),
          timeRange: S.optional(__S(498, __c31, 2)),
        }),
      ).annotate({ identifier: "Expression" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.optional(S.String) })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(512, __c32, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
