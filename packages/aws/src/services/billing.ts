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
  sdkId: "Billing",
  target: "AWSBilling",
  version: "2023-09-07",
  sigv4: "billing",
  protocol: awsJson1_0Protocol,
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
      authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }],
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://billing.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p1(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    code: "BillingAccessDenied",
    status: 403,
  })<{ readonly message: string }> {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ TE.TaggedError(
    "BillingViewHealthStatusException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    code: "BillingConflict",
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { code: "BillingInternalServer", status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "BillingResourceNotFound", status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { code: "BillingServiceQuotaExceeded", status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { code: "BillingThrottling", status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { code: "BillingValidation", status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type BillingViewStatus =
  | "HEALTHY"
  | "UNHEALTHY"
  | "CREATING"
  | "UPDATING"
  | (string & {});
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
export type ApplicationType =
  | "BEFORE_CROSS_SERVICE_DISCOUNTS"
  | "AFTER_DISCOUNTS"
  | (string & {});
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
  descriptor: { service: svc, input: { arn: 0, sourceViews: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      sourceViews: 0,
      dataFilterExpression: i_Expression,
      clientToken: D.m({ idempotency: true }),
      resourceTags: D.list(i_ResourceTag),
    },
    output: { createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { arn: 0, force: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { arn: 0, sourceViews: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      nextToken: 0,
      maxResults: 0,
      features: 0,
      filters: D.list({ name: 0, value: 0 }),
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
  operationName: "GetBillingPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    input: { arn: 0 },
    output: {
      billingView: {
        name: D.secret,
        description: D.secret,
        dataFilterExpression: {
          timeRange: { beginDateInclusive: D.ts, endDateInclusive: D.ts },
        },
        createdAt: D.ts,
        updatedAt: D.ts,
        viewDefinitionLastUpdatedAt: D.ts,
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
  operationName: "GetBillingView",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      accountId: 0,
      creditId: 0,
      startDate: 0,
      endDate: 0,
      nextToken: 0,
      maxResults: 0,
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
  descriptor: {
    service: svc,
    input: { accountId: 0, startDate: 0, endDate: 0, payerAccountFlag: 0 },
    output: {
      credits: D.list({ startDate: D.ts, endDate: D.ts, exhaustDate: D.ts }),
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
  operationName: "GetCredits",
})) as any;

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
  descriptor: {
    service: svc,
    input: { billingMonth: 0 },
    output: {
      billingPeriodStartDate: D.ts,
      billingPeriodEndDate: D.ts,
      billDate: D.ts,
      supportEffectivePricingPlan: o_PricingPlan,
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
  operationName: "GetEnterpriseSupportChargeSummary",
})) as any;

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
  descriptor: {
    service: svc,
    input: { billingMonth: 0 },
    output: {
      supportReservedInstanceAmortizationStartDate: D.ts,
      supportSavingsPlansAmortizationStartDate: D.ts,
      supportProrateStartDate: D.ts,
      pricingPlans: D.list(o_PricingPlan),
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
  operationName: "GetEnterpriseSupportContractDetails",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      activeTimeRange: { activeAfterInclusive: 0, activeBeforeInclusive: 0 },
      arns: 0,
      billingViewTypes: 0,
      names: D.list({ searchOption: 0, searchValue: 0 }),
      ownerAccountId: 0,
      sourceAccountId: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { billingViews: D.list({ name: D.secret, description: D.secret }) },
  },
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
  descriptor: {
    service: svc,
    input: { billingMonth: 0, accountId: 0, maxResults: 0, nextToken: 0 },
    output: {
      linkedAccount: D.list({
        linkedTimePeriods: D.list(o_EnterpriseSupportTimePeriod),
        subscriptionTimePeriods: D.list(o_EnterpriseSupportTimePeriod),
      }),
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
  descriptor: { service: svc, input: { arn: 0, maxResults: 0, nextToken: 0 } },
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
  descriptor: { service: svc, input: { resourceArn: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { promoCode: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedeemCredits",
})) as any;

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
  descriptor: {
    service: svc,
    input: { resourceArn: 0, resourceTags: D.list(i_ResourceTag) },
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
  operationName: "TagResource",
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, resourceTagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      feature: 0,
      billingPreferencesPerKey: D.list({ key: 0, value: 0 }),
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
  operationName: "UpdateBillingPreferences",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      arn: 0,
      name: 0,
      description: 0,
      dataFilterExpression: i_Expression,
    },
    output: { updatedAt: D.ts },
  },
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
})) as any;

const i_Expression: D.LazyStruct = () => ({
  dimensions: { key: 0, values: 0 },
  tags: { key: 0, values: 0 },
  costCategories: { key: 0, values: 0 },
  timeRange: { beginDateInclusive: 0, endDateInclusive: 0 },
});
const i_ResourceTag: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_EnterpriseSupportTimePeriod: D.LazyStruct = () => ({
  beginDate: D.ts,
  endDate: D.ts,
});
const o_PricingPlan: D.LazyStruct = () => ({ startDate: D.ts, endDate: D.ts });
