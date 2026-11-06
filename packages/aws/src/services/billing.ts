import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "Billing",
  service: "Billing",
  templates: false,
  propagate: TxXray.propagate,
} as const;

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
        /*@__PURE__*/ S.suspend(() => __S(609, __c38, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "BillingValidation", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ArnString = string;
export type ContractDocumentId = string | redacted.Redacted<string>;
export interface AssociateContractRequest {
  contractArn: string;
  contractDocumentId: string | redacted.Redacted<string>;
}
export interface AssociateContractResponse {}
export type BillingViewArn = string;
export type BillingViewSourceViewsList = string[];
export interface AssociateSourceViewsRequest {
  arn: string;
  sourceViews: string[];
}
export interface AssociateSourceViewsResponse {
  arn: string;
}
export type IdentifierString = string;
export type CancellationReason = string;
export interface CancelContractualInvestmentAttestationRequest {
  attestationId: string;
  contractArn: string;
  reason: string;
}
export interface CancelContractualInvestmentAttestationResponse {}
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
export type SensitiveString = string | redacted.Redacted<string>;
export type SensitiveEmail = string | redacted.Redacted<string>;
export interface ApproverDetails {
  name: string | redacted.Redacted<string>;
  title: string | redacted.Redacted<string>;
  email: string | redacted.Redacted<string>;
}
export type CurrencyCode = string;
export type CurrencyAmount = string;
export interface Amount {
  currencyCode: string;
  currencyAmount: string;
}
export interface AttestationQuantity {
  attestationVolume: string;
  attestationUnit: string;
}
export type AttestationQuantities = AttestationQuantity[];
export type AttestationValue =
  | { attestationAmount: Amount; attestationQuantities?: never }
  | { attestationAmount?: never; attestationQuantities: AttestationQuantity[] };
export type AccountId = string;
export interface InvestmentDistribution {
  accountId: string;
  investmentAmount: Amount;
}
export type InvestmentDistributions = InvestmentDistribution[];
export interface AttestationDetails {
  attestationValue: AttestationValue;
  investmentDistributions?: InvestmentDistribution[];
}
export interface AdditionalRecipient {
  email: string | redacted.Redacted<string>;
}
export type AdditionalRecipients = AdditionalRecipient[];
export type AttestationClientToken = string;
export interface CreateContractualInvestmentAttestationRequest {
  contractArn: string;
  investmentSummaryId: string;
  investmentId: string;
  contractDocumentId: string | redacted.Redacted<string>;
  approverDetails: ApproverDetails;
  investmentDisbursedAt?: Date;
  attestationDetails: AttestationDetails;
  additionalRecipients?: AdditionalRecipient[];
  clientToken?: string;
}
export interface CreateContractualInvestmentAttestationResponse {
  attestationId: string;
}
export interface DeleteBillingViewRequest {
  arn: string;
  force?: boolean;
}
export interface DeleteBillingViewResponse {
  arn: string;
}
export interface DisassociateContractRequest {
  contractArn: string;
}
export interface DisassociateContractResponse {}
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
export interface GetContractInformationRequest {
  contractArn: string;
}
export interface Interval {
  startDateInclusive: Date;
  endDateInclusive: Date;
}
export type AccountList = string[];
export interface LegalEntity {
  legalEntityName: string | redacted.Redacted<string>;
}
export type LegalEntities = LegalEntity[];
export type ContractRestriction = "ATTESTATION_SELF_SERVICE_BLOCKED" | (string & {});
export type ContractRestrictions = ContractRestriction[];
export interface PrivatePricingAddendum {
  contractArn: string;
  contractTerm: Interval;
  eligiblePayerAccounts: string[];
  investmentAccounts: string[];
  legalEntities: LegalEntity[];
  contractRestrictions?: ContractRestriction[];
}
export type ContractDetails = { privatePricingAddendum: PrivatePricingAddendum };
export interface GetContractInformationResponse {
  contract: ContractDetails;
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
export interface ListContractsRequest {
  nextToken?: string;
  maxResults?: number;
}
export type ContractType = "Cross-Service" | "Service-Specific" | "Other" | (string & {});
export type AssociationStatus = "ASSOCIATED" | "NOT_ASSOCIATED" | (string & {});
export interface ContractSummary {
  contractArn: string;
  contractTerm: Interval;
  contractType?: ContractType;
  associationStatus: AssociationStatus;
  lastUpdatedAt?: Date;
}
export type ContractSummaries = ContractSummary[];
export interface ListContractsResponse {
  items: ContractSummary[];
  nextToken?: string;
}
export interface ListContractualInvestmentAttestationsRequest {
  contractArn: string;
  investmentSummaryId?: string;
  nextToken?: string;
  maxResults?: number;
}
export type InvestmentAttestationStatus =
  | "PENDING_REVIEW"
  | "PENDING_C_LEVEL_APPROVAL"
  | "PENDING_CANCELLATION"
  | "REJECTED"
  | "CANCELLED"
  | "DISBURSED"
  | (string & {});
export type RejectionReason = string;
export type RejectionReasons = string[];
export interface InvestmentAttestation {
  attestationId: string;
  investmentName: string;
  outcomeDescription: string;
  investmentSummaryId: string;
  investmentId: string;
  attestedAt: Date;
  updatedAt: Date;
  attestationStatus: InvestmentAttestationStatus;
  investmentDisbursedAt?: Date;
  attestedValue?: Amount;
  investmentDistributions?: InvestmentDistribution[];
  rejectionReasons?: string[];
  isCancellable?: boolean;
}
export type InvestmentAttestations = InvestmentAttestation[];
export interface ListContractualInvestmentAttestationsResponse {
  items: InvestmentAttestation[];
  nextToken?: string;
}
export interface ListContractualInvestmentsRequest {
  contractArn: string;
  investmentSummaryId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface MilestoneBasedInvestment {
  investmentId: string;
  investmentValue: Amount;
  investmentDisbursedAt: Date;
}
export interface InvestmentRestriction {
  amount: Amount;
}
export type InvestmentRestrictions = InvestmentRestriction[];
export type MultiplierType = "PERCENTAGE" | "CURRENCY_AMOUNT" | (string & {});
export interface InvestmentMultiplier {
  value: string;
  investmentAttestationInputUnit: string;
  multiplierType: MultiplierType;
}
export type InvestmentMultipliers = InvestmentMultiplier[];
export interface OutcomeBasedInvestment {
  investmentId: string;
  outcomeDescription: string;
  attestationWindow: Interval;
  investmentRestrictions?: InvestmentRestriction[];
  investmentMultipliers?: InvestmentMultiplier[];
  disbursedValue: Amount;
}
export type Investment =
  | { milestoneBasedInvestment: MilestoneBasedInvestment; outcomeBasedInvestment?: never }
  | { milestoneBasedInvestment?: never; outcomeBasedInvestment: OutcomeBasedInvestment };
export type Investments = Investment[];
export interface ListContractualInvestmentsResponse {
  items: Investment[];
  nextToken?: string;
}
export interface ListContractualInvestmentSummariesRequest {
  contractArn: string;
  nextToken?: string;
  maxResults?: number;
}
export type InvestmentType = "MILESTONE_BASED" | "OUTCOME_BASED" | (string & {});
export interface InvestmentSummary {
  investmentSummaryId: string;
  investmentName: string;
  investmentType: InvestmentType;
  maxAllowedInvestmentDisbursementValue?: Amount;
}
export type InvestmentSummaries = InvestmentSummary[];
export interface ListContractualInvestmentSummariesResponse {
  items: InvestmentSummary[];
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
export type ServiceCode = string;
export type QuotaCode = string;
export type AssociateContractError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Private Pricing contracts let eligible payer accounts manage private pricing agreements with Amazon Web Services. This operation associates a private pricing contract with the caller's Amazon Web Services account. The caller must be a payer (management) account listed on the contract. This operation is idempotent, so retrying a request that already succeeded is safe.
 */
export const associateContract: API.OperationMethod<
  AssociateContractRequest & RegionInput,
  AssociateContractResponse,
  AssociateContractError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<AssociateContractRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<AssociateContractResponse>,
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
  operationName: "AssociateContract",
  iam: {
    actions: ["billing:AssociateContract"],
    resources: {
      "billing:AssociateContract": ["arn:${Partition}:billing::${Account}:contract/${ContractId}"],
    },
  },
  telemetry: TELEMETRY,
  span: "AssociateContract",
}));

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
  AssociateSourceViewsRequest & RegionInput,
  AssociateSourceViewsResponse,
  AssociateSourceViewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<AssociateSourceViewsRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<AssociateSourceViewsResponse>,
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
  iam: {
    actions: ["billing:AssociateSourceViews", "billing:UseSourceView"],
    resources: {
      "billing:AssociateSourceViews": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "AssociateSourceViews",
}));

export type CancelContractualInvestmentAttestationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a contractual investment attestation. This operation is idempotent, so retrying is safe. You can cancel an attestation only while it is still pending (its `isCancellable` value is `true`).
 */
export const cancelContractualInvestmentAttestation: API.OperationMethod<
  CancelContractualInvestmentAttestationRequest & RegionInput,
  CancelContractualInvestmentAttestationResponse,
  CancelContractualInvestmentAttestationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CancelContractualInvestmentAttestationRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<CancelContractualInvestmentAttestationResponse>,
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
  operationName: "CancelContractualInvestmentAttestation",
  iam: {
    actions: ["billing:CancelContractualInvestmentAttestation"],
    resources: {
      "billing:CancelContractualInvestmentAttestation": [
        "arn:${Partition}:billing::${Account}:contract/${ContractId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "CancelContractualInvestmentAttestation",
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
  CreateBillingViewRequest & RegionInput,
  CreateBillingViewResponse,
  CreateBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<CreateBillingViewRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<CreateBillingViewResponse>,
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
  iam: {
    actions: ["billing:CreateBillingView", "billing:TagResource", "billing:UseSourceView"],
    resources: {
      "billing:CreateBillingView": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
      "billing:TagResource": ["arn:${Partition}:billing::${Account}:billingview/${ResourceId}"],
    },
    conditional: { "billing:TagResource": "resourceTags" },
  },
  telemetry: TELEMETRY,
  span: "CreateBillingView",
}));

export type CreateContractualInvestmentAttestationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an attestation that claims an investment award for a completed milestone or outcome within a private pricing contract. Supply a `clientToken` to make the request idempotent so a safe retry does not create a duplicate attestation. This operation starts an asynchronous review and returns an `attestationId` while the attestation is pending.
 */
export const createContractualInvestmentAttestation: API.OperationMethod<
  CreateContractualInvestmentAttestationRequest & RegionInput,
  CreateContractualInvestmentAttestationResponse,
  CreateContractualInvestmentAttestationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(71, __c4, 7) as any as S.Schema<CreateContractualInvestmentAttestationRequest>,
  output: __S(72, __c4, 8) as any as S.Schema<CreateContractualInvestmentAttestationResponse>,
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
  operationName: "CreateContractualInvestmentAttestation",
  iam: {
    actions: ["billing:CreateContractualInvestmentAttestation"],
    resources: {
      "billing:CreateContractualInvestmentAttestation": [
        "arn:${Partition}:billing::${Account}:contract/${ContractId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "CreateContractualInvestmentAttestation",
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
  DeleteBillingViewRequest & RegionInput,
  DeleteBillingViewResponse,
  DeleteBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteBillingViewRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DeleteBillingViewResponse>,
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
  iam: {
    actions: ["billing:DeleteBillingView"],
    resources: {
      "billing:DeleteBillingView": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "DeleteBillingView",
}));

export type DisassociateContractError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between a private pricing contract and your Amazon Web Services account. The account must have been associated with the contract previously. This operation is idempotent, so retrying is safe.
 */
export const disassociateContract: API.OperationMethod<
  DisassociateContractRequest & RegionInput,
  DisassociateContractResponse,
  DisassociateContractError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<DisassociateContractRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<DisassociateContractResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateContract",
  iam: {
    actions: ["billing:DisassociateContract"],
    resources: {
      "billing:DisassociateContract": [
        "arn:${Partition}:billing::${Account}:contract/${ContractId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "DisassociateContract",
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
  DisassociateSourceViewsRequest & RegionInput,
  DisassociateSourceViewsResponse,
  DisassociateSourceViewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DisassociateSourceViewsRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<DisassociateSourceViewsResponse>,
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
  iam: {
    actions: ["billing:DisassociateSourceViews"],
    resources: {
      "billing:DisassociateSourceViews": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "DisassociateSourceViews",
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
  GetBillingPreferencesRequest & RegionInput,
  GetBillingPreferencesResponse,
  GetBillingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(162, __c10, 2) as any as S.Schema<GetBillingPreferencesRequest>,
  output: __S(166, __c10, 6) as any as S.Schema<GetBillingPreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingPreferences",
  iam: { actions: ["billing:GetBillingPreferences", "aws-portal:ViewBilling"] },
  telemetry: TELEMETRY,
  span: "GetBillingPreferences",
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
  GetBillingViewRequest & RegionInput,
  GetBillingViewResponse,
  GetBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<GetBillingViewRequest>,
  output: __S(194, __c12, 2) as any as S.Schema<GetBillingViewResponse>,
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
  iam: {
    actions: ["billing:GetBillingView"],
    resources: {
      "billing:GetBillingView": ["arn:${Partition}:billing::${Account}:billingview/${ResourceId}"],
    },
  },
  telemetry: TELEMETRY,
  span: "GetBillingView",
}));

export type GetContractInformationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specific private pricing contract, including its term (duration), eligible payer accounts, investment accounts, and legal entities. This operation is read-only.
 */
export const getContractInformation: API.OperationMethod<
  GetContractInformationRequest & RegionInput,
  GetContractInformationResponse,
  GetContractInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<GetContractInformationRequest>,
  output: __S(229, __c14, 5) as any as S.Schema<GetContractInformationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContractInformation",
  iam: { actions: ["billing:GetContractInformation"] },
  telemetry: TELEMETRY,
  span: "GetContractInformation",
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
  GetCreditAllocationHistoryRequest & RegionInput,
  GetCreditAllocationHistoryResponse,
  GetCreditAllocationHistoryError,
  Credentials | HttpClient.HttpClient,
  CreditAllocationHistoryEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetCreditAllocationHistoryRequest>,
  output: __S(259, __c16, 3) as any as S.Schema<GetCreditAllocationHistoryResponse>,
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
  iam: { actions: ["billing:GetCreditAllocationHistory"] },
  telemetry: TELEMETRY,
  span: "GetCreditAllocationHistory",
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
  GetCreditsRequest & RegionInput,
  GetCreditsResponse,
  GetCreditsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetCreditsRequest>,
  output: __S(275, __c17, 3) as any as S.Schema<GetCreditsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredits",
  iam: { actions: ["billing:GetCredits", "aws-portal:ViewBilling"] },
  telemetry: TELEMETRY,
  span: "GetCredits",
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
  GetEnterpriseSupportChargeSummaryRequest & RegionInput,
  GetEnterpriseSupportChargeSummaryResponse,
  GetEnterpriseSupportChargeSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetEnterpriseSupportChargeSummaryRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetEnterpriseSupportChargeSummaryResponse>,
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
  iam: { actions: ["billing:GetEnterpriseSupportChargeSummary"] },
  telemetry: TELEMETRY,
  span: "GetEnterpriseSupportChargeSummary",
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
  GetEnterpriseSupportContractDetailsRequest & RegionInput,
  GetEnterpriseSupportContractDetailsResponse,
  GetEnterpriseSupportContractDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetEnterpriseSupportContractDetailsRequest>,
  output: __S(328, __c20, 8) as any as S.Schema<GetEnterpriseSupportContractDetailsResponse>,
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
  iam: { actions: ["billing:GetEnterpriseSupportContractDetails"] },
  telemetry: TELEMETRY,
  span: "GetEnterpriseSupportContractDetails",
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
  GetResourcePolicyRequest & RegionInput,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<GetResourcePolicyResponse>,
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
  iam: {
    actions: ["billing:GetResourcePolicy"],
    resources: {
      "billing:GetResourcePolicy": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "GetResourcePolicy",
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
  ListBillingViewsRequest & RegionInput,
  ListBillingViewsResponse,
  ListBillingViewsError,
  Credentials | HttpClient.HttpClient,
  BillingViewListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(355, __c22, 3) as any as S.Schema<ListBillingViewsRequest>,
  output: __S(358, __c22, 6) as any as S.Schema<ListBillingViewsResponse>,
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
  iam: { actions: ["billing:ListBillingViews"] },
  telemetry: TELEMETRY,
  span: { op: "ListBillingViews", attributes: { "url.template": "/" } },
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
  ListBillingViewSegmentsRequest & RegionInput,
  ListBillingViewSegmentsResponse,
  ListBillingViewSegmentsError,
  Credentials | HttpClient.HttpClient,
  BillingViewSegmentsListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(369, __c23, 1) as any as S.Schema<ListBillingViewSegmentsRequest>,
  output: __S(372, __c23, 4) as any as S.Schema<ListBillingViewSegmentsResponse>,
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
  iam: { actions: ["billing:ListBillingViewSegments"] },
  telemetry: TELEMETRY,
  span: "ListBillingViewSegments",
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
  ListBusinessSupportAccountChargesRequest & RegionInput,
  ListBusinessSupportAccountChargesResponse,
  ListBusinessSupportAccountChargesError,
  Credentials | HttpClient.HttpClient,
  BusinessSupportAccountCharge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ListBusinessSupportAccountChargesRequest>,
  output: __S(392, __c24, 8) as any as S.Schema<ListBusinessSupportAccountChargesResponse>,
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
  iam: { actions: ["billing:ListBusinessSupportAccountCharges"] },
  telemetry: TELEMETRY,
  span: "ListBusinessSupportAccountCharges",
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
  ListBusinessSupportSubscriptionHistoryRequest & RegionInput,
  ListBusinessSupportSubscriptionHistoryResponse,
  ListBusinessSupportSubscriptionHistoryError,
  Credentials | HttpClient.HttpClient,
  BusinessSupportSubscriptionContract
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListBusinessSupportSubscriptionHistoryRequest>,
  output: __S(403, __c25, 3) as any as S.Schema<ListBusinessSupportSubscriptionHistoryResponse>,
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
  iam: { actions: ["billing:ListBusinessSupportSubscriptionHistory"] },
  telemetry: TELEMETRY,
  span: "ListBusinessSupportSubscriptionHistory",
})) as any;

export type ListContractsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the private pricing contracts that your Amazon Web Services account is an eligible payer account of. This operation is read-only and paginated.
 */
export const listContracts: API.PaginatedOperationMethod<
  ListContractsRequest & RegionInput,
  ListContractsResponse,
  ListContractsError,
  Credentials | HttpClient.HttpClient,
  ContractSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<ListContractsRequest>,
  output: __S(419, __c26, 3) as any as S.Schema<ListContractsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContracts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  iam: { actions: ["billing:ListContracts"] },
  telemetry: TELEMETRY,
  span: "ListContracts",
})) as any;

export type ListContractualInvestmentAttestationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the investment attestations submitted under a specific private pricing contract. Use this operation to track attestation status, including the terminal statuses `DISBURSED`, `REJECTED`, and `CANCELLED`. This operation is read-only and paginated.
 */
export const listContractualInvestmentAttestations: API.PaginatedOperationMethod<
  ListContractualInvestmentAttestationsRequest & RegionInput,
  ListContractualInvestmentAttestationsResponse,
  ListContractualInvestmentAttestationsError,
  Credentials | HttpClient.HttpClient,
  InvestmentAttestation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ListContractualInvestmentAttestationsRequest>,
  output: __S(435, __c27, 3) as any as S.Schema<ListContractualInvestmentAttestationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContractualInvestmentAttestations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  iam: {
    actions: ["billing:ListContractualInvestmentAttestations"],
    resources: {
      "billing:ListContractualInvestmentAttestations": [
        "arn:${Partition}:billing::${Account}:contract/${ContractId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "ListContractualInvestmentAttestations",
})) as any;

export type ListContractualInvestmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the investments within a specific investment summary. This operation is read-only and paginated.
 */
export const listContractualInvestments: API.PaginatedOperationMethod<
  ListContractualInvestmentsRequest & RegionInput,
  ListContractualInvestmentsResponse,
  ListContractualInvestmentsError,
  Credentials | HttpClient.HttpClient,
  Investment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListContractualInvestmentsRequest>,
  output: __S(457, __c28, 9) as any as S.Schema<ListContractualInvestmentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContractualInvestments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  iam: {
    actions: ["billing:ListContractualInvestments"],
    resources: {
      "billing:ListContractualInvestments": [
        "arn:${Partition}:billing::${Account}:contract/${ContractId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "ListContractualInvestments",
})) as any;

export type ListContractualInvestmentSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the investment summaries within a specific private pricing contract. This operation is read-only and paginated.
 */
export const listContractualInvestmentSummaries: API.PaginatedOperationMethod<
  ListContractualInvestmentSummariesRequest & RegionInput,
  ListContractualInvestmentSummariesResponse,
  ListContractualInvestmentSummariesError,
  Credentials | HttpClient.HttpClient,
  InvestmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListContractualInvestmentSummariesRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListContractualInvestmentSummariesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContractualInvestmentSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  iam: {
    actions: ["billing:ListContractualInvestmentSummaries"],
    resources: {
      "billing:ListContractualInvestmentSummaries": [
        "arn:${Partition}:billing::${Account}:contract/${ContractId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "ListContractualInvestmentSummaries",
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
  ListEnterpriseSupportLinkedAccountChargesRequest & RegionInput,
  ListEnterpriseSupportLinkedAccountChargesResponse,
  ListEnterpriseSupportLinkedAccountChargesError,
  Credentials | HttpClient.HttpClient,
  LinkedAccountCharge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListEnterpriseSupportLinkedAccountChargesRequest>,
  output: __S(487, __c30, 7) as any as S.Schema<ListEnterpriseSupportLinkedAccountChargesResponse>,
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
  iam: { actions: ["billing:ListEnterpriseSupportLinkedAccountCharges"] },
  telemetry: TELEMETRY,
  span: "ListEnterpriseSupportLinkedAccountCharges",
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
  ListSourceViewsForBillingViewRequest & RegionInput,
  ListSourceViewsForBillingViewResponse,
  ListSourceViewsForBillingViewError,
  Credentials | HttpClient.HttpClient,
  BillingViewArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListSourceViewsForBillingViewRequest>,
  output: __S(497, __c31, 1) as any as S.Schema<ListSourceViewsForBillingViewResponse>,
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
  iam: {
    actions: ["billing:ListSourceViewsForBillingView"],
    resources: {
      "billing:ListSourceViewsForBillingView": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "ListSourceViewsForBillingView",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(513, __c32, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  iam: {
    actions: ["billing:ListTagsForResource"],
    resources: {
      "billing:ListTagsForResource": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
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
  RedeemCreditsRequest & RegionInput,
  RedeemCreditsResponse,
  RedeemCreditsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<RedeemCreditsRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<RedeemCreditsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedeemCredits",
  iam: { actions: ["aws-portal:ModifyBilling", "billing:RedeemCredits"] },
  telemetry: TELEMETRY,
  span: "RedeemCredits",
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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<TagResourceResponse>,
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
  iam: {
    actions: ["billing:TagResource"],
    resources: {
      "billing:TagResource": ["arn:${Partition}:billing::${Account}:billingview/${ResourceId}"],
    },
  },
  telemetry: TELEMETRY,
  span: "TagResource",
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<UntagResourceResponse>,
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
  iam: {
    actions: ["billing:UntagResource"],
    resources: {
      "billing:UntagResource": ["arn:${Partition}:billing::${Account}:billingview/${ResourceId}"],
    },
  },
  telemetry: TELEMETRY,
  span: "UntagResource",
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
  UpdateBillingPreferencesRequest & RegionInput,
  UpdateBillingPreferencesResponse,
  UpdateBillingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(578, __c36, 2) as any as S.Schema<UpdateBillingPreferencesRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<UpdateBillingPreferencesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillingPreferences",
  iam: { actions: ["aws-portal:ModifyBilling", "billing:UpdateBillingPreferences"] },
  telemetry: TELEMETRY,
  span: "UpdateBillingPreferences",
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
  UpdateBillingViewRequest & RegionInput,
  UpdateBillingViewResponse,
  UpdateBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<UpdateBillingViewRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<UpdateBillingViewResponse>,
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
  iam: {
    actions: ["billing:UpdateBillingView"],
    resources: {
      "billing:UpdateBillingView": [
        "arn:${Partition}:billing::${Account}:billingview/${ResourceId}",
      ],
    },
  },
  telemetry: TELEMETRY,
  span: "UpdateBillingView",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attestationId: S.String, contractArn: S.String, reason: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelContractualInvestmentAttestationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          sourceViews: __S(672, __c42, 0),
          dataFilterExpression: S.optional(__S(35, __c2, 3)),
          clientToken: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Client-Token"),
            T.IdempotencyToken(),
          ),
          resourceTags: S.optional(__S(49, __c3, 1)),
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
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, values: __S(672, __c42, 0) })).annotate({
        identifier: "DimensionValues",
      });
    case 1:
      return S.suspend(() => S.Struct({ key: S.String, values: __S(672, __c42, 0) })).annotate({
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
          dimensions: S.optional(__S(32, __c2, 0)),
          tags: S.optional(__S(33, __c2, 1)),
          costCategories: S.optional(__S(33, __c2, 1)),
          timeRange: S.optional(__S(34, __c2, 2)),
        }),
      ).annotate({ identifier: "Expression" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.optional(S.String) })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(48, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: SensitiveString, title: SensitiveString, email: SensitiveString }),
      ).annotate({ identifier: "ApproverDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({ attestationVolume: S.String, attestationUnit: S.String }),
      ).annotate({ identifier: "AttestationQuantity" });
    case 2:
      return S.Array(__S(65, __c4, 1));
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ attestationAmount: __S(80, __c5, 0) }),
        /*@__PURE__*/ S.Struct({ attestationQuantities: __S(66, __c4, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          attestationValue: __S(67, __c4, 3),
          investmentDistributions: S.optional(__S(97, __c6, 1)),
        }),
      ).annotate({ identifier: "AttestationDetails" });
    case 5:
      return S.suspend(() => S.Struct({ email: SensitiveString })).annotate({
        identifier: "AdditionalRecipient",
      });
    case 6:
      return S.Array(__S(69, __c4, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          contractArn: S.String,
          investmentSummaryId: S.String,
          investmentId: S.String,
          contractDocumentId: SensitiveString,
          approverDetails: __S(64, __c4, 0),
          investmentDisbursedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          attestationDetails: __S(68, __c4, 4),
          additionalRecipients: S.optional(__S(70, __c4, 6)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateContractualInvestmentAttestationRequest" });
    case 8:
      return S.suspend(() => S.Struct({ attestationId: S.String })).annotate({
        identifier: "CreateContractualInvestmentAttestationResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ currencyCode: S.String, currencyAmount: S.String }),
      ).annotate({ identifier: "Amount" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, investmentAmount: __S(80, __c5, 0) }),
      ).annotate({ identifier: "InvestmentDistribution" });
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, force: S.optional(S.Boolean) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBillingViewRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contractArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateContractRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, sourceViews: __S(672, __c42, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateSourceViewsRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), value: S.optional(__S(672, __c42, 0)) }),
      ).annotate({ identifier: "BillingFeatureFilter" });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          features: __S(176, __c11, 0),
          filters: S.optional(__S(161, __c10, 1)),
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
          billingPeriod: S.optional(__S(163, __c10, 3)),
        }),
      ).annotate({ identifier: "BillingPreferenceSummary" });
    case 5:
      return S.Array(__S(164, __c10, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ billingPreferences: __S(165, __c10, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetBillingPreferencesResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
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
          dataFilterExpression: S.optional(__S(35, __c2, 3)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          derivedViewCount: S.optional(S.Number),
          sourceViewCount: S.optional(S.Number),
          viewDefinitionLastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          healthStatus: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "BillingViewElement" });
    case 2:
      return S.suspend(() => S.Struct({ billingView: __S(193, __c12, 1) })).annotate({
        identifier: "GetBillingViewResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          statusCode: S.optional(S.String),
          statusReasons: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "BillingViewHealthStatus" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contractArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetContractInformationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ legalEntityName: SensitiveString })).annotate({
        identifier: "LegalEntity",
      });
    case 2:
      return S.Array(__S(225, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          contractArn: S.String,
          contractTerm: __S(240, __c15, 0),
          eligiblePayerAccounts: __S(672, __c42, 0),
          investmentAccounts: __S(672, __c42, 0),
          legalEntities: __S(226, __c14, 2),
          contractRestrictions: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "PrivatePricingAddendum" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ privatePricingAddendum: __S(227, __c14, 3) })]);
    case 5:
      return S.suspend(() => S.Struct({ contract: __S(228, __c14, 4) })).annotate({
        identifier: "GetContractInformationResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startDateInclusive: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endDateInclusive: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Interval" });
  }
}
function __c16(j: number): any {
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
          creditAmount: __S(80, __c5, 0),
          description: S.optional(S.String),
          accountId: S.String,
          appliedServiceName: S.String,
          billingMonth: S.String,
          isEstimatedBill: S.Boolean,
        }),
      ).annotate({ identifier: "CreditAllocationHistoryEntry" });
    case 2:
      return S.Array(__S(257, __c16, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          creditAllocationHistoryList: S.optional(__S(258, __c16, 2)),
          partialResults: S.Boolean,
          failedMonths: S.optional(__S(672, __c42, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCreditAllocationHistoryResponse" });
  }
}
function __c17(j: number): any {
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
          initialAmount: __S(80, __c5, 0),
          remainingAmount: __S(80, __c5, 0),
          estimatedAmount: S.optional(__S(80, __c5, 0)),
          applicableProductNames: S.optional(__S(672, __c42, 0)),
          description: S.String,
          startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          exhaustDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          applicationType: S.optional(S.String),
          shareableAccounts: S.optional(__S(672, __c42, 0)),
          accountHasCreditSharingEnabled: S.optional(S.Boolean),
          creditConsoleVisibility: S.optional(S.String),
          creditSharingType: S.optional(S.String),
          costCategoryArn: S.optional(S.String),
          ruleName: S.optional(S.String),
          creditStatus: S.optional(S.String),
          purchaseTypeApplications: S.optional(__S(672, __c42, 0)),
        }),
      ).annotate({ identifier: "CreditData" });
    case 2:
      return S.Array(__S(273, __c17, 1));
    case 3:
      return S.suspend(() => S.Struct({ credits: S.optional(__S(274, __c17, 2)) })).annotate({
        identifier: "GetCreditsResponse",
      });
  }
}
function __c18(j: number): any {
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
          supportEffectivePricingPlan: __S(306, __c19, 2),
        }),
      ).annotate({ identifier: "GetEnterpriseSupportChargeSummaryResponse" });
  }
}
function __c19(j: number): any {
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
      return S.Array(__S(304, __c19, 0));
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
          tiers: __S(305, __c19, 1),
        }),
      ).annotate({ identifier: "PricingPlan" });
  }
}
function __c20(j: number): any {
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
      return S.Array(__S(321, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accountId: S.String, chargePercentage: S.String }),
      ).annotate({ identifier: "ChargeAccount" });
    case 4:
      return S.Array(__S(323, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          description: S.String,
          amount: S.optional(S.String),
          chargeType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdditionalCharge" });
    case 6:
      return S.Array(__S(325, __c20, 5));
    case 7:
      return S.Array(__S(306, __c19, 2));
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
          contractPayerAccountIds: __S(322, __c20, 2),
          chargedPayerAccountIds: __S(324, __c20, 4),
          additionalSupportCharge: S.optional(__S(326, __c20, 6)),
          additionalSupportEligibleUsageSpend: S.optional(__S(326, __c20, 6)),
          pricingPlans: __S(327, __c20, 7),
        }),
      ).annotate({ identifier: "GetEnterpriseSupportContractDetailsResponse" });
  }
}
function __c21(j: number): any {
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
function __c22(j: number): any {
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
      return S.Array(__S(353, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          activeTimeRange: S.optional(__S(352, __c22, 0)),
          arns: S.optional(__S(672, __c42, 0)),
          billingViewTypes: S.optional(__S(176, __c11, 0)),
          names: S.optional(__S(354, __c22, 2)),
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
          healthStatus: S.optional(__S(208, __c13, 0)),
        }),
      ).annotate({ identifier: "BillingViewListElement" });
    case 5:
      return S.Array(__S(356, __c22, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ billingViews: __S(357, __c22, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBillingViewsResponse" });
  }
}
function __c23(j: number): any {
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
          timeRange: S.optional(__S(368, __c23, 0)),
          arn: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBillingViewSegmentsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          domain: S.optional(S.String),
          timeRange: S.optional(__S(368, __c23, 0)),
          billingTransferAccountId: S.optional(S.String),
          managementAccountId: S.optional(S.String),
          billingGroupPrimaryAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "BillingViewSegmentsListElement" });
    case 3:
      return S.Array(__S(370, __c23, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: __S(371, __c23, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBillingViewSegmentsResponse" });
  }
}
function __c24(j: number): any {
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
      return S.Array(__S(385, __c24, 1));
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
      return S.Array(__S(388, __c24, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          supportPlanName: S.String,
          totalCharge: S.String,
          totalUsageBasis: S.String,
          tierCharges: S.optional(__S(386, __c24, 2)),
          supportDiscount: S.optional(__S(387, __c24, 3)),
          supportEligibleSpendByService: S.optional(__S(389, __c24, 5)),
        }),
      ).annotate({ identifier: "BusinessSupportAccountCharge" });
    case 7:
      return S.Array(__S(390, __c24, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          billingMonth: S.String,
          isEstimated: S.Boolean,
          totalSupportCharge: S.String,
          totalSupportEligibleSpend: S.String,
          accountCount: S.Number,
          accountCharges: __S(391, __c24, 7),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBusinessSupportAccountChargesResponse" });
  }
}
function __c25(j: number): any {
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
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ subscriptionContracts: __S(402, __c25, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBusinessSupportSubscriptionHistoryResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListContractsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contractArn: S.String,
          contractTerm: __S(240, __c15, 0),
          contractType: S.optional(S.String),
          associationStatus: S.String,
          lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ContractSummary" });
    case 2:
      return S.Array(__S(417, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(418, __c26, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListContractsResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contractArn: S.String,
          investmentSummaryId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContractualInvestmentAttestationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          attestationId: S.String,
          investmentName: S.String,
          outcomeDescription: S.String,
          investmentSummaryId: S.String,
          investmentId: S.String,
          attestedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          attestationStatus: S.String,
          investmentDisbursedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          attestedValue: S.optional(__S(80, __c5, 0)),
          investmentDistributions: S.optional(__S(97, __c6, 1)),
          rejectionReasons: S.optional(__S(672, __c42, 0)),
          isCancellable: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InvestmentAttestation" });
    case 2:
      return S.Array(__S(433, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(434, __c27, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListContractualInvestmentAttestationsResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contractArn: S.String,
          investmentSummaryId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContractualInvestmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          investmentId: S.String,
          investmentValue: __S(80, __c5, 0),
          investmentDisbursedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "MilestoneBasedInvestment" });
    case 2:
      return S.suspend(() => S.Struct({ amount: __S(80, __c5, 0) })).annotate({
        identifier: "InvestmentRestriction",
      });
    case 3:
      return S.Array(__S(450, __c28, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          value: S.String,
          investmentAttestationInputUnit: S.String,
          multiplierType: S.String,
        }),
      ).annotate({ identifier: "InvestmentMultiplier" });
    case 5:
      return S.Array(__S(452, __c28, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          investmentId: S.String,
          outcomeDescription: S.String,
          attestationWindow: __S(240, __c15, 0),
          investmentRestrictions: S.optional(__S(451, __c28, 3)),
          investmentMultipliers: S.optional(__S(453, __c28, 5)),
          disbursedValue: __S(80, __c5, 0),
        }),
      ).annotate({ identifier: "OutcomeBasedInvestment" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ milestoneBasedInvestment: __S(449, __c28, 1) }),
        /*@__PURE__*/ S.Struct({ outcomeBasedInvestment: __S(454, __c28, 6) }),
      ]);
    case 8:
      return S.Array(__S(455, __c28, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ items: __S(456, __c28, 8), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListContractualInvestmentsResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contractArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListContractualInvestmentSummariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          investmentSummaryId: S.String,
          investmentName: S.String,
          investmentType: S.String,
          maxAllowedInvestmentDisbursementValue: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "InvestmentSummary" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(466, __c29, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListContractualInvestmentSummariesResponse" });
  }
}
function __c30(j: number): any {
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
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          serviceCode: S.optional(S.String),
          totalSupportEligibleSpend: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceLevelAccountUsage" });
    case 4:
      return S.Array(__S(483, __c30, 3));
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
          linkedTimePeriods: S.optional(__S(482, __c30, 2)),
          subscriptionTimePeriods: S.optional(__S(482, __c30, 2)),
          totalSupportEligibleReservedInstanceSpend: S.optional(S.String),
          totalSupportEligibleSavingsPlanSpend: S.optional(S.String),
          supportEligibleSpendByService: S.optional(__S(484, __c30, 4)),
        }),
      ).annotate({ identifier: "LinkedAccountCharge" });
    case 6:
      return S.Array(__S(485, __c30, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ linkedAccount: __S(486, __c30, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnterpriseSupportLinkedAccountChargesResponse" });
  }
}
function __c31(j: number): any {
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
        S.Struct({ sourceViews: __S(672, __c42, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSourceViewsForBillingViewResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceTags: S.optional(__S(49, __c3, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ promoCode: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RedeemCreditsRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourceTags: __S(49, __c3, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourceTagKeys: __S(672, __c42, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "BillingPreferenceForKey",
      });
    case 1:
      return S.Array(__S(576, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ feature: S.String, billingPreferencesPerKey: __S(577, __c36, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateBillingPreferencesRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          dataFilterExpression: S.optional(__S(35, __c2, 3)),
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
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(608, __c38, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ contractArn: S.String, contractDocumentId: SensitiveString }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateContractRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "AssociateContractResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, sourceViews: __S(672, __c42, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateSourceViewsRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String })).annotate({
        identifier: "AssociateSourceViewsResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
