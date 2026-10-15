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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Marketplace Agreement",
  serviceShapeName: "AWSMPCommerceService_v20200301",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-03-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://agreement-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://agreement-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://agreement-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://agreement-marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://agreement-marketplace.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "AccessDeniedExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceType" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ResourceType" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      requestId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fields: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(929, __c29, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AgreementId = string;
export type AgreementCancellationRequestId = string;
export interface AcceptAgreementCancellationRequestInput {
  agreementId: string;
  agreementCancellationRequestId: string;
}
export type AgreementCancellationRequestStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "VALIDATION_FAILED"
  | (string & {});
export type AgreementCancellationRequestReasonCode =
  | "INCORRECT_TERMS_ACCEPTED"
  | "REPLACING_AGREEMENT"
  | "TEST_AGREEMENT"
  | "ALTERNATIVE_PROCUREMENT_CHANNEL"
  | "PRODUCT_DISCONTINUED"
  | "UNINTENDED_RENEWAL"
  | "BUYER_DISSATISFACTION"
  | "OTHER"
  | (string & {});
export type AgreementCancellationRequestDescription = string | redacted.Redacted<string>;
export interface AcceptAgreementCancellationRequestOutput {
  agreementId?: string;
  agreementCancellationRequestId?: string;
  status?: AgreementCancellationRequestStatus;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PaymentRequestId = string;
export type PurchaseOrderReference = string;
export interface AcceptAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
  purchaseOrderReference?: string;
}
export type PaymentRequestStatus =
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | (string & {});
export type PaymentRequestName = string;
export type PaymentRequestDescription = string | redacted.Redacted<string>;
export type PositiveAmountUpto8Decimals = string;
export type CurrencyCode = string;
export interface AcceptAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type AgreementRequestId = string;
export type ResourceId = string;
export type ChargeRevision = number;
export interface PurchaseOrder {
  chargeId: string;
  chargeRevision?: number;
  agreementId?: string;
  purchaseOrderReference?: string;
}
export type PurchaseOrders = PurchaseOrder[];
export interface AcceptAgreementRequestInput {
  agreementRequestId: string;
  purchaseOrders?: PurchaseOrder[];
}
export interface AcceptAgreementRequestOutput {
  agreementId?: string;
}
export type InvoiceId = string;
export type BillingAdjustmentReasonCode =
  | "INCORRECT_TERMS_ACCEPTED"
  | "INCORRECT_METERING"
  | "TEST_ENVIRONMENT_CHARGES"
  | "ALTERNATIVE_PROCUREMENT_CHANNEL"
  | "UNINTENDED_RENEWAL"
  | "BUYER_DISSATISFACTION"
  | "OTHER"
  | (string & {});
export type BillingAdjustmentDescription = string | redacted.Redacted<string>;
export type ClientToken = string;
export interface BatchCreateBillingAdjustmentRequestEntry {
  agreementId: string;
  originalInvoiceId: string;
  adjustmentAmount: string;
  currencyCode: string;
  adjustmentReasonCode: BillingAdjustmentReasonCode;
  description?: string | redacted.Redacted<string>;
  clientToken: string;
}
export type BatchCreateBillingAdjustmentRequestEntryList =
  BatchCreateBillingAdjustmentRequestEntry[];
export interface BatchCreateBillingAdjustmentRequestInput {
  billingAdjustmentRequestEntries: BatchCreateBillingAdjustmentRequestEntry[];
}
export type BillingAdjustmentRequestId = string;
export interface BatchCreateBillingAdjustmentItem {
  billingAdjustmentRequestId: string;
  clientToken: string;
}
export type BatchCreateBillingAdjustmentItemList = BatchCreateBillingAdjustmentItem[];
export type BillingAdjustmentErrorCode =
  | "CONFLICT_EXCEPTION"
  | "VALIDATION_EXCEPTION"
  | "RESOURCE_NOT_FOUND_EXCEPTION"
  | "INTERNAL_FAILURE"
  | (string & {});
export interface BatchCreateBillingAdjustmentError {
  code: BillingAdjustmentErrorCode;
  message: string;
  clientToken: string;
}
export type BatchCreateBillingAdjustmentErrorList = BatchCreateBillingAdjustmentError[];
export interface BatchCreateBillingAdjustmentRequestOutput {
  items: BatchCreateBillingAdjustmentItem[];
  errors: BatchCreateBillingAdjustmentError[];
}
export interface CancelAgreementInput {
  agreementId: string;
}
export interface CancelAgreementOutput {}
export type AgreementCancellationRequestCancellationReason = string | redacted.Redacted<string>;
export interface CancelAgreementCancellationRequestInput {
  agreementId: string;
  agreementCancellationRequestId: string;
  cancellationReason: string | redacted.Redacted<string>;
}
export type AgreementCancellationRequestStatusMessage = string;
export interface CancelAgreementCancellationRequestOutput {
  agreementCancellationRequestId?: string;
  agreementId?: string;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  status?: AgreementCancellationRequestStatus;
  statusMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CancelAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
}
export interface CancelAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type Intent = "NEW" | "AMEND" | "REPLACE" | (string & {});
export type TermId = string;
export type BoundedString = string;
export type ZeroValueInteger = number;
export interface Dimension {
  dimensionKey: string;
  dimensionValue: number;
}
export type DimensionList = Dimension[];
export interface ConfigurableUpfrontPricingTermConfiguration {
  selectorValue: string;
  dimensions: Dimension[];
}
export interface RenewalTermConfiguration {
  enableAutoRenew: boolean;
}
export type PaymentRequestApprovalStrategy =
  | "AUTO_APPROVE_ON_EXPIRATION"
  | "WAIT_FOR_APPROVAL"
  | (string & {});
export type ISO8601Duration = string;
export interface VariablePaymentTermConfiguration {
  paymentRequestApprovalStrategy: PaymentRequestApprovalStrategy;
  expirationDuration?: string;
}
export type RequestedTermConfiguration =
  | {
      configurableUpfrontPricingTermConfiguration: ConfigurableUpfrontPricingTermConfiguration;
      renewalTermConfiguration?: never;
      variablePaymentTermConfiguration?: never;
    }
  | {
      configurableUpfrontPricingTermConfiguration?: never;
      renewalTermConfiguration: RenewalTermConfiguration;
      variablePaymentTermConfiguration?: never;
    }
  | {
      configurableUpfrontPricingTermConfiguration?: never;
      renewalTermConfiguration?: never;
      variablePaymentTermConfiguration: VariablePaymentTermConfiguration;
    };
export interface RequestedTerm {
  id: string;
  configuration?: RequestedTermConfiguration;
}
export type RequestedTermList = RequestedTerm[];
export type AgreementProposalId = string;
export type TaxEstimation = "DISABLED" | "ENABLED" | (string & {});
export interface TaxConfiguration {
  taxEstimation?: TaxEstimation;
}
export interface CreateAgreementRequestInput {
  clientToken?: string;
  intent: Intent;
  requestedTerms: RequestedTerm[];
  sourceAgreementIdentifier?: string;
  agreementProposalIdentifier?: string;
  taxConfiguration?: TaxConfiguration;
}
export type Timing = "ON_ACCEPTANCE" | "SCHEDULED" | "BILLING_PERIOD" | (string & {});
export interface TaxBreakdownItem {
  amount?: string;
  rate?: string;
  type?: string;
}
export type TaxBreakdown = TaxBreakdownItem[];
export interface EstimatedTaxes {
  breakdown?: TaxBreakdownItem[];
  totalAmount?: string;
}
export interface ExpectedCharge {
  id?: string;
  time?: Date;
  amount?: string;
  amountAfterTax?: string;
  timing?: Timing;
  estimatedTaxes?: EstimatedTaxes;
}
export type ExpectedChargeList = ExpectedCharge[];
export interface ItemizedCharge {
  dimensionKey?: string;
  newQuantity?: number;
  oldQuantity?: number;
  chargeReference?: string;
  incrementalChargeAmount?: string;
}
export type ItemizedChargeList = ItemizedCharge[];
export interface InvoicingEntity {
  legalName?: string;
  branchName?: string;
}
export interface ChargeSummary {
  currencyCode?: string;
  newAgreementValue?: string;
  newAgreementValueAfterTax?: string;
  expectedCharges?: ExpectedCharge[];
  estimatedTaxes?: EstimatedTaxes;
  itemizedCharges?: ItemizedCharge[];
  invoicingEntity?: InvoicingEntity;
}
export interface CreateAgreementRequestOutput {
  agreementRequestId?: string;
  chargeSummary?: ChargeSummary;
}
export interface DescribeAgreementInput {
  agreementId: string;
}
export type AWSAccountId = string;
export interface Acceptor {
  accountId?: string;
}
export interface Proposer {
  accountId?: string;
}
export type AgreementType = string;
export interface EstimatedCharges {
  currencyCode?: string;
  agreementValue?: string;
}
export type AgreementResourceType = string;
export interface Resource {
  id?: string;
  type?: string;
}
export type Resources = Resource[];
export type OfferId = string;
export type OfferSetId = string;
export interface ProposalSummary {
  resources?: Resource[];
  offerId?: string;
  offerSetId?: string;
}
export type AgreementStatus =
  | "ACTIVE"
  | "ARCHIVED"
  | "CANCELLED"
  | "EXPIRED"
  | "RENEWED"
  | "REPLACED"
  | "ROLLED_BACK"
  | "SUPERSEDED"
  | "TERMINATED"
  | (string & {});
export type EndTimeBehaviorType = "RENEW" | "REPLACE" | "EXPIRE" | (string & {});
export type EndTimeBehaviorReasonCode =
  | "PROPOSER_RENEW_OPTED_OUT"
  | "ACCEPTOR_RENEW_OPTED_OUT"
  | "NO_RENEWAL_TERM"
  | "RENEWAL_LIMIT_EXHAUSTED"
  | (string & {});
export interface RenewalSummary {
  offerId?: string;
}
export interface EndTimeBehavior {
  type: EndTimeBehaviorType;
  reasonCode?: EndTimeBehaviorReasonCode;
  renewalSummary?: RenewalSummary;
}
export interface DescribeAgreementOutput {
  agreementId?: string;
  acceptor?: Acceptor;
  proposer?: Proposer;
  startTime?: Date;
  endTime?: Date;
  acceptanceTime?: Date;
  agreementType?: string;
  estimatedCharges?: EstimatedCharges;
  proposalSummary?: ProposalSummary;
  status?: AgreementStatus;
  initialAgreementId?: string;
  endTimeBehavior?: EndTimeBehavior;
}
export interface GetAgreementCancellationRequestInput {
  agreementCancellationRequestId: string;
  agreementId: string;
}
export interface GetAgreementCancellationRequestOutput {
  agreementCancellationRequestId?: string;
  agreementId?: string;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  status?: AgreementCancellationRequestStatus;
  statusMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type MaxResults = number;
export type NextToken = string;
export interface GetAgreementEntitlementsInput {
  agreementId: string;
  maxResults?: number;
  nextToken?: string;
}
export type EntitlementType = string;
export type RegistrationToken = string;
export type AgreementEntitlementStatus =
  | "PROVISIONED"
  | "SCHEDULED"
  | "PENDING"
  | "FAILED"
  | "DEPROVISIONED"
  | (string & {});
export type AgreementEntitlementStatusReasonCode =
  | "PROVISIONING_IN_PROGRESS"
  | "FUTURE_START_DATE"
  | "INVALID_PAYMENT_INSTRUMENT"
  | "INCOMPATIBLE_CURRENCY"
  | "ACCOUNT_SUSPENDED"
  | "UNSUPPORTED_OPERATION"
  | "AGREEMENT_INACTIVE"
  | "AGREEMENT_ACTIVE"
  | "PRODUCT_RESTRICTED"
  | (string & {});
export type AwsArn = string;
export interface AgreementEntitlement {
  resource?: Resource;
  type?: string;
  registrationToken?: string;
  status?: AgreementEntitlementStatus;
  statusReasonCode?: AgreementEntitlementStatusReasonCode;
  licenseArn?: string;
}
export type AgreementEntitlementList = AgreementEntitlement[];
export interface GetAgreementEntitlementsOutput {
  agreementEntitlements?: AgreementEntitlement[];
  nextToken?: string;
}
export interface GetAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
}
export type PaymentRequestStatusMessage = string;
export type ChargeId = string;
export interface GetAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  statusMessage?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeId?: string;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GetAgreementTermsInput {
  agreementId: string;
  maxResults?: number;
  nextToken?: string;
}
export type UnversionedTermType = string;
export interface DocumentItem {
  type?: string;
  url?: string;
  version?: string;
}
export type DocumentList = DocumentItem[];
export interface LegalTerm {
  type?: string;
  id?: string;
  documents?: DocumentItem[];
}
export interface SupportTerm {
  type?: string;
  id?: string;
  refundPolicy?: string;
}
export type DayDuration = string;
export type PriceIncreasePercentage = string;
export interface FixedPercentage {
  value?: string;
}
export interface PercentageRange {
  minValue?: string;
  maxValue?: string;
  defaultValue?: string;
}
export type PriceIncrease =
  | { fixedPercentage: FixedPercentage; percentageRange?: never }
  | { fixedPercentage?: never; percentageRange: PercentageRange };
export type OffsetDuration = string;
export type ChargePercentage = string;
export interface PaymentScheduleEntry {
  chargeDateOffset?: string;
  chargePercentage?: string;
  dayOfMonth?: number;
}
export type PaymentScheduleEntryList = PaymentScheduleEntry[];
export interface PaymentScheduleTermTemplate {
  schedule?: PaymentScheduleEntry[];
}
export type TermTemplate = { paymentScheduleTermTemplate: PaymentScheduleTermTemplate };
export type TermTemplateList = TermTemplate[];
export interface RenewalTerm {
  type?: string;
  id?: string;
  configuration?: RenewalTermConfiguration;
  lockoutPeriod?: string;
  maxRenewals?: number;
  adjustmentDeadline?: string;
  priceIncrease?: PriceIncrease;
  termTemplates?: TermTemplate[];
}
export interface RateCardItem {
  dimensionKey?: string;
  price?: string;
}
export type RateCardList = RateCardItem[];
export interface UsageBasedRateCardItem {
  rateCard?: RateCardItem[];
}
export type UsageBasedRateCardList = UsageBasedRateCardItem[];
export interface UsageBasedPricingTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  rateCards?: UsageBasedRateCardItem[];
}
export interface Selector {
  type?: string;
  value?: string;
}
export interface Constraints {
  multipleDimensionSelection?: string;
  quantityConfiguration?: string;
}
export interface ConfigurableUpfrontRateCardItem {
  selector?: Selector;
  constraints?: Constraints;
  rateCard?: RateCardItem[];
}
export type ConfigurableUpfrontRateCardList = ConfigurableUpfrontRateCardItem[];
export interface ConfigurableUpfrontPricingTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  rateCards?: ConfigurableUpfrontRateCardItem[];
  configuration?: ConfigurableUpfrontPricingTermConfiguration;
}
export interface ByolPricingTerm {
  type?: string;
  id?: string;
}
export interface RecurringPaymentTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  billingPeriod?: string;
  price?: string;
}
export interface ValidityTerm {
  type?: string;
  id?: string;
  agreementDuration?: string;
  agreementStartDate?: Date;
  agreementEndDate?: Date;
}
export interface ScheduleItem {
  chargeDate?: Date;
  chargeAmount?: string;
}
export type ScheduleList = ScheduleItem[];
export interface PaymentScheduleTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  schedule?: ScheduleItem[];
}
export type PositiveIntegerWithDefaultValueOne = number;
export interface GrantItem {
  dimensionKey?: string;
  maxQuantity?: number;
}
export type GrantList = GrantItem[];
export interface FreeTrialPricingTerm {
  type?: string;
  id?: string;
  duration?: string;
  grants?: GrantItem[];
}
export interface FixedUpfrontPricingTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  duration?: string;
  price?: string;
  grants?: GrantItem[];
}
export interface VariablePaymentTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  maxTotalChargeAmount?: string;
  configuration?: VariablePaymentTermConfiguration;
}
export interface NetPaymentTerm {
  type?: string;
  id?: string;
  paymentDuePeriod?: string;
}
export type AcceptedTerm =
  | {
      legalTerm: LegalTerm;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm: SupportTerm;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm: RenewalTerm;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm: UsageBasedPricingTerm;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm: ByolPricingTerm;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm: RecurringPaymentTerm;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm: ValidityTerm;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm: PaymentScheduleTerm;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm: FreeTrialPricingTerm;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm: FixedUpfrontPricingTerm;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm: VariablePaymentTerm;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm: NetPaymentTerm;
    };
export type AcceptedTermList = AcceptedTerm[];
export interface GetAgreementTermsOutput {
  acceptedTerms?: AcceptedTerm[];
  nextToken?: string;
}
export interface GetBillingAdjustmentRequestInput {
  agreementId: string;
  billingAdjustmentRequestId: string;
}
export type BillingAdjustmentStatus = "PENDING" | "VALIDATION_FAILED" | "COMPLETED" | (string & {});
export type BillingAdjustmentStatusMessage = string;
export interface GetBillingAdjustmentRequestOutput {
  billingAdjustmentRequestId: string;
  agreementId: string;
  adjustmentReasonCode: BillingAdjustmentReasonCode;
  description?: string;
  originalInvoiceId: string;
  adjustmentAmount: string;
  currencyCode: string;
  status: BillingAdjustmentStatus;
  statusMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type PartyType = string;
export type Catalog = string;
export interface ListAgreementCancellationRequestsInput {
  partyType: string;
  agreementId?: string;
  status?: AgreementCancellationRequestStatus;
  agreementType?: string;
  catalog?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AgreementCancellationRequestSummary {
  agreementCancellationRequestId?: string;
  agreementId?: string;
  status?: AgreementCancellationRequestStatus;
  reasonCode?: AgreementCancellationRequestReasonCode;
  agreementType?: string;
  catalog?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type AgreementCancellationRequestSummaryList = AgreementCancellationRequestSummary[];
export interface ListAgreementCancellationRequestsOutput {
  nextToken?: string;
  items?: AgreementCancellationRequestSummary[];
}
export interface ListAgreementChargesInput {
  catalog?: string;
  agreementId?: string;
  agreementType?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface Charge {
  id?: string;
  revision?: number;
  agreementId?: string;
  agreementType?: string;
  purchaseOrderReference?: string;
  currencyCode?: string;
  amount?: string;
  time?: Date;
}
export type Charges = Charge[];
export interface ListAgreementChargesOutput {
  items?: Charge[];
  nextToken?: string;
}
export type LineItemGroupBy = "INVOICE_ID" | (string & {});
export type InvoiceType = "INVOICE" | "CREDIT_MEMO" | (string & {});
export interface InvoiceBillingPeriod {
  month: number;
  year: number;
}
export interface ListAgreementInvoiceLineItemsInput {
  agreementId: string;
  groupBy: LineItemGroupBy;
  invoiceId?: string;
  invoiceType?: InvoiceType;
  invoiceBillingPeriod?: InvoiceBillingPeriod;
  beforeIssuedTime?: Date;
  afterIssuedTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export interface PricingCurrencyAmount {
  amount?: string;
  maxAdjustmentAmount?: string;
  currencyCode?: string;
}
export interface AgreementInvoiceLineItemGroupSummary {
  agreementId?: string;
  invoiceId?: string;
  pricingCurrencyAmount?: PricingCurrencyAmount;
  invoiceBillingPeriod?: InvoiceBillingPeriod;
  issuedTime?: Date;
  invoiceType?: InvoiceType;
  invoicingEntity?: InvoicingEntity;
}
export type AgreementInvoiceLineItemGroupSummaries = AgreementInvoiceLineItemGroupSummary[];
export interface ListAgreementInvoiceLineItemsOutput {
  agreementInvoiceLineItemGroupSummaries?: AgreementInvoiceLineItemGroupSummary[];
  nextToken?: string;
}
export interface ListAgreementPaymentRequestsInput {
  partyType: string;
  agreementType?: string;
  catalog?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface PaymentRequestSummary {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  chargeId?: string;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PaymentRequestSummaryList = PaymentRequestSummary[];
export interface ListAgreementPaymentRequestsOutput {
  nextToken?: string;
  items: PaymentRequestSummary[];
}
export interface ListBillingAdjustmentRequestsInput {
  agreementId?: string;
  status?: BillingAdjustmentStatus;
  createdAfter?: Date;
  createdBefore?: Date;
  maxResults?: number;
  catalog?: string;
  agreementType?: string;
  nextToken?: string;
}
export interface BillingAdjustmentSummary {
  billingAdjustmentRequestId: string;
  originalInvoiceId: string;
  adjustmentAmount: string;
  currencyCode: string;
  status: BillingAdjustmentStatus;
  agreementId: string;
  createdAt: Date;
  updatedAt: Date;
  agreementType: string;
  catalog: string;
}
export type BillingAdjustmentSummaryList = BillingAdjustmentSummary[];
export interface ListBillingAdjustmentRequestsOutput {
  nextToken?: string;
  items: BillingAdjustmentSummary[];
}
export type AgreementCancellationRequestRejectionReason = string | redacted.Redacted<string>;
export interface RejectAgreementCancellationRequestInput {
  agreementId: string;
  agreementCancellationRequestId: string;
  rejectionReason: string | redacted.Redacted<string>;
}
export interface RejectAgreementCancellationRequestOutput {
  agreementId?: string;
  agreementCancellationRequestId?: string;
  status?: AgreementCancellationRequestStatus;
  statusMessage?: string;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PaymentRequestRejectionReason = string;
export interface RejectAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
  rejectionReason?: string;
}
export interface RejectAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  statusMessage?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export interface Filter {
  name?: string;
  values?: string[];
}
export type FilterList = Filter[];
export type SortBy = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface Sort {
  sortBy?: string;
  sortOrder?: SortOrder;
}
export interface SearchAgreementsInput {
  catalog?: string;
  filters?: Filter[];
  sort?: Sort;
  maxResults?: number;
  nextToken?: string;
}
export interface Entitlement {
  licenseArn?: string;
}
export type EntitlementList = Entitlement[];
export interface AgreementViewSummary {
  agreementId?: string;
  acceptanceTime?: Date;
  startTime?: Date;
  endTime?: Date;
  lastUpdateTime?: Date;
  agreementType?: string;
  acceptor?: Acceptor;
  proposer?: Proposer;
  proposalSummary?: ProposalSummary;
  status?: AgreementStatus;
  entitlements?: Entitlement[];
  initialAgreementId?: string;
  endTimeBehaviorType?: EndTimeBehaviorType;
  endTimeBehaviorReasonCode?: EndTimeBehaviorReasonCode;
}
export type AgreementViewSummaryList = AgreementViewSummary[];
export interface SearchAgreementsOutput {
  agreementViewSummaries?: AgreementViewSummary[];
  nextToken?: string;
}
export interface SendAgreementCancellationRequestInput {
  agreementId: string;
  reasonCode: AgreementCancellationRequestReasonCode;
  clientToken?: string;
  description?: string | redacted.Redacted<string>;
}
export interface SendAgreementCancellationRequestOutput {
  agreementId?: string;
  agreementCancellationRequestId?: string;
  status?: AgreementCancellationRequestStatus;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SendAgreementPaymentRequestInput {
  clientToken?: string;
  agreementId: string;
  termId: string;
  name: string;
  chargeAmount: string;
  description?: string | redacted.Redacted<string>;
}
export interface SendAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
}
export interface UpdatePurchaseOrdersInput {
  purchaseOrders: PurchaseOrder[];
}
export interface UpdatePurchaseOrdersOutput {}
export type RequestId = string;
export type ExceptionMessage = string;
export type AccessDeniedExceptionReason =
  | "INVALID_ACCOUNT_STATE"
  | "DENIED_BY_PRIVATE_MARKETPLACE_POLICY"
  | "FAILED_KYC_COMPLIANCE"
  | "MISSING_MFA"
  | "INVALID_ACCESS"
  | (string & {});
export type ResourceType =
  | "Agreement"
  | "AgreementRequest"
  | "AgreementProposal"
  | "Charge"
  | "PaymentRequest"
  | "Invoice"
  | "AgreementCancellationRequest"
  | "BillingAdjustmentRequest"
  | (string & {});
export type ValidationExceptionReason =
  | "MISSING_BILLING_ADJUSTMENTS"
  | "BILLING_ADJUSTMENTS_LIMIT_EXCEEDED"
  | "MISSING_INVOICE_ID"
  | "INVALID_ADJUSTMENT_AMOUNT"
  | "MISSING_ADJUSTMENT_AMOUNT"
  | "INVALID_REASON_CODE"
  | "MISSING_REASON_CODE"
  | "MISSING_DESCRIPTION"
  | "INVALID_INVOICE_ADJUSTMENT_PERIOD"
  | "INVALID_CURRENCY_CODE"
  | "MISSING_CURRENCY_CODE"
  | "EXCEEDED_MAXIMUM_ADJUSTMENT_AMOUNT"
  | "MISSING_BILLING_ADJUSTMENT_REQUEST_ENTRY"
  | "MULTIPLE_AGREEMENT_IDS"
  | "INVALID_AGREEMENT_CANCELLATION_REQUEST_ID"
  | "MISSING_AGREEMENT_CANCELLATION_REQUEST_ID"
  | "MISSING_REASON"
  | "INVALID_REASON"
  | "INVALID_STATUS"
  | "INVALID_AGREEMENT_ID"
  | "MISSING_AGREEMENT_ID"
  | "INVALID_CATALOG"
  | "INVALID_FILTERS"
  | "INVALID_FILTER_NAME"
  | "MISSING_FILTER_NAME"
  | "INVALID_FILTER_VALUES"
  | "MISSING_FILTER_VALUES"
  | "INVALID_SORT_BY"
  | "INVALID_SORT_ORDER"
  | "INVALID_NEXT_TOKEN"
  | "INVALID_MAX_RESULTS"
  | "INVALID_TERM_ID"
  | "MISSING_TERM_ID"
  | "MISSING_NAME"
  | "INVALID_NAME"
  | "INVALID_DESCRIPTION"
  | "MISSING_CHARGE_AMOUNT"
  | "INVALID_CHARGE_AMOUNT"
  | "MISSING_PAYMENT_REQUEST_ID"
  | "INVALID_PAYMENT_REQUEST_ID"
  | "MISSING_PARTY_TYPE"
  | "INVALID_PARTY_TYPE"
  | "UNSUPPORTED_FILTERS"
  | "INVALID_CLIENT_TOKEN"
  | "INVALID_INTENT"
  | "MISSING_INTENT"
  | "INVALID_SOURCE_AGREEMENT_IDENTIFIER"
  | "MISSING_SOURCE_AGREEMENT_IDENTIFIER"
  | "INVALID_AGREEMENT_PROPOSAL_IDENTIFIER"
  | "MISSING_AGREEMENT_PROPOSAL_IDENTIFIER"
  | "INVALID_REQUESTED_TERMS"
  | "MISSING_REQUESTED_TERMS"
  | "INVALID_REQUESTED_TERM_ID"
  | "MISSING_REQUESTED_TERM_ID"
  | "INVALID_REQUESTED_TERM_CONFIGURATION"
  | "MISSING_REQUESTED_TERM_CONFIGURATION"
  | "INVALID_AGREEMENT_REQUEST_ID"
  | "MISSING_AGREEMENT_REQUEST_ID"
  | "INVALID_PURCHASE_ORDERS"
  | "MISSING_PURCHASE_ORDERS"
  | "INVALID_CHARGE_ID"
  | "MISSING_CHARGE_ID"
  | "INVALID_CHARGE_REVISION"
  | "MISSING_CHARGE_REVISION"
  | "INVALID_AGREEMENT_TYPE"
  | "INVALID_PURCHASE_ORDER_REFERENCE"
  | "INACTIVE_AGREEMENT"
  | "SUPERSEDED_AGREEMENT_PROPOSAL"
  | "EXPIRED_AGREEMENT_PROPOSAL"
  | "MISSING_MANDATORY_TERMS"
  | "INCOMPATIBLE_TERMS"
  | "MISSING_USAGE_AGREEMENT"
  | "INVALID_INCREMENTAL_CHARGE"
  | "MISSING_ACCOUNT_ADDRESS"
  | "UNSUPPORTED_ACTION"
  | "INVALID_REJECTION_REASON"
  | "INVALID_PAYMENT_REQUEST_STATUS"
  | "OTHER"
  | "DUPLICATE_CHARGES"
  | "UNSUPPORTED_ACCOUNT_PLAN"
  | "DUPLICATE_AGREEMENT_IN_ORGANIZATION"
  | "MISSING_PURCHASE_ORDER_REFERENCE"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AcceptAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to accept a cancellation request that is in `PENDING_APPROVAL` status. Once accepted, the cancellation request transitions to `APPROVED` status and the agreement cancellation will be processed.
 *
 * Only cancellation requests in `PENDING_APPROVAL` status can be accepted. A `ConflictException` is thrown if the cancellation request is in any other status.
 */
export const acceptAgreementCancellationRequest: API.OperationMethod<
  AcceptAgreementCancellationRequestInput,
  AcceptAgreementCancellationRequestOutput,
  AcceptAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<AcceptAgreementCancellationRequestInput>,
  output: __S(992, __c31, 0) as any as S.Schema<AcceptAgreementCancellationRequestOutput>,
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
  operationName: "AcceptAgreementCancellationRequest",
}));

export type AcceptAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to accept a payment request that is in `PENDING_APPROVAL` status. Once accepted, the payment request transitions to `APPROVED` status and the charge will be processed. Buyers can optionally provide a purchase order reference for their internal tracking.
 *
 * Only payment requests in `PENDING_APPROVAL` status can be accepted. A `ConflictException` is thrown if the payment request is in any other status.
 */
export const acceptAgreementPaymentRequest: API.OperationMethod<
  AcceptAgreementPaymentRequestInput,
  AcceptAgreementPaymentRequestOutput,
  AcceptAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<AcceptAgreementPaymentRequestInput>,
  output: __S(1056, __c33, 0) as any as S.Schema<AcceptAgreementPaymentRequestOutput>,
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
  operationName: "AcceptAgreementPaymentRequest",
}));

export type AcceptAgreementRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts an agreement request to finalize the agreement. The acceptor can optionally provide purchase orders to associate with the agreement charges.
 */
export const acceptAgreementRequest: API.OperationMethod<
  AcceptAgreementRequestInput,
  AcceptAgreementRequestOutput,
  AcceptAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<AcceptAgreementRequestInput>,
  output: __S(1089, __c34, 1) as any as S.Schema<AcceptAgreementRequestOutput>,
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
  operationName: "AcceptAgreementRequest",
}));

export type BatchCreateBillingAdjustmentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to submit billing adjustment requests for one or more invoices within an agreement. Each entry in the batch specifies an invoice and the adjustment amount. The operation returns successfully created adjustment request IDs and any errors for entries that failed to process.
 *
 * Each entry requires a unique `clientToken` for idempotency.
 */
export const batchCreateBillingAdjustmentRequest: API.OperationMethod<
  BatchCreateBillingAdjustmentRequestInput,
  BatchCreateBillingAdjustmentRequestOutput,
  BatchCreateBillingAdjustmentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2, __c0, 2) as any as S.Schema<BatchCreateBillingAdjustmentRequestInput>,
  output: __S(7, __c0, 7) as any as S.Schema<BatchCreateBillingAdjustmentRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateBillingAdjustmentRequest",
}));

export type CancelAgreementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows an acceptor to cancel an active agreement. Not all agreements are eligible for cancellation. Use the error response to determine why a cancellation request was rejected.
 */
export const cancelAgreement: API.OperationMethod<
  CancelAgreementInput,
  CancelAgreementOutput,
  CancelAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<CancelAgreementInput>,
  output: __S(64, __c2, 0) as any as S.Schema<CancelAgreementOutput>,
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
  operationName: "CancelAgreement",
}));

export type CancelAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to withdraw an existing agreement cancellation request that is in a pending state. Once cancelled, the cancellation request transitions to `CANCELLED` status and can no longer be approved or rejected by the buyer.
 *
 * Only cancellation requests in `PENDING_APPROVAL` status can be cancelled. A `ConflictException` is thrown if the cancellation request is in any other status.
 */
export const cancelAgreementCancellationRequest: API.OperationMethod<
  CancelAgreementCancellationRequestInput,
  CancelAgreementCancellationRequestOutput,
  CancelAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<CancelAgreementCancellationRequestInput>,
  output: __S(128, __c4, 0) as any as S.Schema<CancelAgreementCancellationRequestOutput>,
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
  operationName: "CancelAgreementCancellationRequest",
}));

export type CancelAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to cancel a payment request that is in `PENDING_APPROVAL` status. Once cancelled, the payment request transitions to `CANCELLED` status and can no longer be accepted or rejected by the buyer.
 *
 * Only payment requests in `PENDING_APPROVAL` status can be cancelled. A `ConflictException` is thrown if the payment request is in any other status.
 */
export const cancelAgreementPaymentRequest: API.OperationMethod<
  CancelAgreementPaymentRequestInput,
  CancelAgreementPaymentRequestOutput,
  CancelAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<CancelAgreementPaymentRequestInput>,
  output: __S(1056, __c33, 0) as any as S.Schema<CancelAgreementPaymentRequestOutput>,
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
  operationName: "CancelAgreementPaymentRequest",
}));

export type CreateAgreementRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an agreement request that acts as a quote for the terms you want to accept. The agreement request captures the requested terms, calculates charges, and returns a summary. Use `AcceptAgreementRequest` with the returned `agreementRequestId` to finalize the agreement.
 */
export const createAgreementRequest: API.OperationMethod<
  CreateAgreementRequestInput,
  CreateAgreementRequestOutput,
  CreateAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(196, __c6, 4) as any as S.Schema<CreateAgreementRequestInput>,
  output: __S(205, __c6, 13) as any as S.Schema<CreateAgreementRequestOutput>,
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
  operationName: "CreateAgreementRequest",
}));

export type DescribeAgreementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides details about an agreement, such as the proposer, acceptor, start date, and end date.
 */
export const describeAgreement: API.OperationMethod<
  DescribeAgreementInput,
  DescribeAgreementOutput,
  DescribeAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<DescribeAgreementInput>,
  output: __S(292, __c9, 4) as any as S.Schema<DescribeAgreementOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgreement",
}));

export type GetAgreementCancellationRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific agreement cancellation request. Both sellers (proposers) and buyers (acceptors) can use this operation to view cancellation requests associated with their agreements.
 */
export const getAgreementCancellationRequest: API.OperationMethod<
  GetAgreementCancellationRequestInput,
  GetAgreementCancellationRequestOutput,
  GetAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<GetAgreementCancellationRequestInput>,
  output: __S(128, __c4, 0) as any as S.Schema<GetAgreementCancellationRequestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementCancellationRequest",
}));

export type GetAgreementEntitlementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains details about the entitlements of an agreement.
 */
export const getAgreementEntitlements: API.PaginatedOperationMethod<
  GetAgreementEntitlementsInput,
  GetAgreementEntitlementsOutput,
  GetAgreementEntitlementsError,
  Credentials | HttpClient.HttpClient,
  AgreementEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<GetAgreementEntitlementsInput>,
  output: __S(419, __c13, 3) as any as S.Schema<GetAgreementEntitlementsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementEntitlements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementEntitlements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAgreementPaymentRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific payment request. Both sellers (proposers) and buyers (acceptors) can use this operation to view payment requests associated with their agreements. The response includes the current status, charge details, timestamps, and the charge ID if the request has been approved.
 *
 * The calling identity must be either the acceptor or proposer of the payment request. A `ResourceNotFoundException` is returned if the payment request does not exist.
 */
export const getAgreementPaymentRequest: API.OperationMethod<
  GetAgreementPaymentRequestInput,
  GetAgreementPaymentRequestOutput,
  GetAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<GetAgreementPaymentRequestInput>,
  output: __S(449, __c14, 1) as any as S.Schema<GetAgreementPaymentRequestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementPaymentRequest",
}));

export type GetAgreementTermsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains details about the terms in an agreement that you participated in as proposer or acceptor.
 *
 * The details include:
 *
 * - `TermType` - The type of term, such as `LegalTerm`, `RenewalTerm`, or `ConfigurableUpfrontPricingTerm`.
 *
 * - `TermID` - The ID of the particular term, which is common between offer and agreement.
 *
 * - `TermPayload` - The key information contained in the term, such as the EULA for `LegalTerm` or pricing and dimensions for various pricing terms, such as `ConfigurableUpfrontPricingTerm` or `UsageBasedPricingTerm`.
 *
 * - `Configuration` - The buyer/acceptor's selection at the time of agreement creation, such as the number of units purchased for a dimension or setting the `EnableAutoRenew` flag.
 */
export const getAgreementTerms: API.PaginatedOperationMethod<
  GetAgreementTermsInput,
  GetAgreementTermsOutput,
  GetAgreementTermsError,
  Credentials | HttpClient.HttpClient,
  AcceptedTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<GetAgreementTermsInput>,
  output: __S(518, __c16, 6) as any as S.Schema<GetAgreementTermsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementTerms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "acceptedTerms",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBillingAdjustmentRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific billing adjustment request. Sellers (proposers) can use this operation to view the status and details of a billing adjustment request they submitted.
 */
export const getBillingAdjustmentRequest: API.OperationMethod<
  GetBillingAdjustmentRequestInput,
  GetBillingAdjustmentRequestOutput,
  GetBillingAdjustmentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetBillingAdjustmentRequestInput>,
  output: __S(545, __c17, 1) as any as S.Schema<GetBillingAdjustmentRequestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingAdjustmentRequest",
}));

export type ListAgreementCancellationRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists agreement cancellation requests available to you as a seller or buyer. Both sellers (proposers) and buyers (acceptors) can use this operation to find cancellation requests by specifying their party type and applying optional filters.
 *
 * `PartyType` is a required parameter. A `ValidationException` is returned if `PartyType` is not provided.
 */
export const listAgreementCancellationRequests: API.PaginatedOperationMethod<
  ListAgreementCancellationRequestsInput,
  ListAgreementCancellationRequestsOutput,
  ListAgreementCancellationRequestsError,
  Credentials | HttpClient.HttpClient,
  AgreementCancellationRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<ListAgreementCancellationRequestsInput>,
  output: __S(579, __c18, 3) as any as S.Schema<ListAgreementCancellationRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementCancellationRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgreementChargesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows acceptors to view charges and purchase orders that are associated with an agreement. The response includes details about all charges regardless of whether a purchase order is linked to each charge.
 */
export const listAgreementCharges: API.PaginatedOperationMethod<
  ListAgreementChargesInput,
  ListAgreementChargesOutput,
  ListAgreementChargesError,
  Credentials | HttpClient.HttpClient,
  Charge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<ListAgreementChargesInput>,
  output: __S(611, __c19, 3) as any as S.Schema<ListAgreementChargesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementCharges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgreementInvoiceLineItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to retrieve aggregated billing data from AWS Marketplace agreements using flexible grouping. Supports invoice-level aggregation with filtering by billing period, invoice type, and issued date.
 *
 * The `groupBy` parameter is required and supports only `INVOICE_ID` as a value. The `agreementId` parameter is required.
 */
export const listAgreementInvoiceLineItems: API.PaginatedOperationMethod<
  ListAgreementInvoiceLineItemsInput,
  ListAgreementInvoiceLineItemsOutput,
  ListAgreementInvoiceLineItemsError,
  Credentials | HttpClient.HttpClient,
  AgreementInvoiceLineItemGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(641, __c20, 1) as any as S.Schema<ListAgreementInvoiceLineItemsInput>,
  output: __S(645, __c20, 5) as any as S.Schema<ListAgreementInvoiceLineItemsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementInvoiceLineItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementInvoiceLineItemGroupSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgreementPaymentRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists payment requests available to you as a seller or buyer. Both sellers (proposers) and buyers (acceptors) can use this operation to find payment requests by specifying their party type and applying optional parameters.
 *
 * `PartyType` is a required parameter. A `ValidationException` is returned if `PartyType` is not provided. Pagination is supported through `maxResults` (1-50, default 50) and `nextToken` parameters.
 */
export const listAgreementPaymentRequests: API.PaginatedOperationMethod<
  ListAgreementPaymentRequestsInput,
  ListAgreementPaymentRequestsOutput,
  ListAgreementPaymentRequestsError,
  Credentials | HttpClient.HttpClient,
  PaymentRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<ListAgreementPaymentRequestsInput>,
  output: __S(675, __c21, 3) as any as S.Schema<ListAgreementPaymentRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementPaymentRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillingAdjustmentRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists billing adjustment requests for a specific agreement. Sellers (proposers) can use this operation to view all billing adjustment requests associated with an agreement.
 */
export const listBillingAdjustmentRequests: API.PaginatedOperationMethod<
  ListBillingAdjustmentRequestsInput,
  ListBillingAdjustmentRequestsOutput,
  ListBillingAdjustmentRequestsError,
  Credentials | HttpClient.HttpClient,
  BillingAdjustmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<ListBillingAdjustmentRequestsInput>,
  output: __S(707, __c22, 3) as any as S.Schema<ListBillingAdjustmentRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingAdjustmentRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RejectAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to reject a cancellation request that is in `PENDING_APPROVAL` status. Once rejected, the cancellation request transitions to `REJECTED` status and the agreement remains active. Buyers must provide a reason for the rejection.
 *
 * Only cancellation requests in `PENDING_APPROVAL` status can be rejected. A `ConflictException` is thrown if the cancellation request is in any other status.
 */
export const rejectAgreementCancellationRequest: API.OperationMethod<
  RejectAgreementCancellationRequestInput,
  RejectAgreementCancellationRequestOutput,
  RejectAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<RejectAgreementCancellationRequestInput>,
  output: __S(737, __c23, 1) as any as S.Schema<RejectAgreementCancellationRequestOutput>,
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
  operationName: "RejectAgreementCancellationRequest",
}));

export type RejectAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to reject a payment request that is in `PENDING_APPROVAL` status. Once rejected, the payment request transitions to `REJECTED` status and cannot be accepted. Buyers can optionally provide a reason for the rejection.
 *
 * Only payment requests in `PENDING_APPROVAL` status can be rejected. A `ConflictException` is thrown if the payment request is in any other status.
 */
export const rejectAgreementPaymentRequest: API.OperationMethod<
  RejectAgreementPaymentRequestInput,
  RejectAgreementPaymentRequestOutput,
  RejectAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<RejectAgreementPaymentRequestInput>,
  output: __S(769, __c24, 1) as any as S.Schema<RejectAgreementPaymentRequestOutput>,
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
  operationName: "RejectAgreementPaymentRequest",
}));

export type SearchAgreementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches across all agreements that a proposer or an acceptor has in AWS Marketplace. The search returns a list of agreements with basic agreement information.
 */
export const searchAgreements: API.PaginatedOperationMethod<
  SearchAgreementsInput,
  SearchAgreementsOutput,
  SearchAgreementsError,
  Credentials | HttpClient.HttpClient,
  AgreementViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(804, __c25, 4) as any as S.Schema<SearchAgreementsInput>,
  output: __S(809, __c25, 9) as any as S.Schema<SearchAgreementsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAgreements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementViewSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SendAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to submit a cancellation request for an active agreement. The cancellation request is created in `PENDING_APPROVAL` status, at which point the buyer can review it.
 */
export const sendAgreementCancellationRequest: API.OperationMethod<
  SendAgreementCancellationRequestInput,
  SendAgreementCancellationRequestOutput,
  SendAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<SendAgreementCancellationRequestInput>,
  output: __S(992, __c31, 0) as any as S.Schema<SendAgreementCancellationRequestOutput>,
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
  operationName: "SendAgreementCancellationRequest",
}));

export type SendAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to submit a payment request to buyers (acceptors) for a specific charge amount for an agreement that includes a `VariablePaymentTerm`. The payment request is created in `PENDING_APPROVAL` status, at which point the buyer can accept or reject it.
 *
 * The agreement must be active and have a `VariablePaymentTerm` to support payment requests. The `chargeAmount` must not exceed the remaining available balance under the `VariablePaymentTerm` `maxTotalChargeAmount`.
 */
export const sendAgreementPaymentRequest: API.OperationMethod<
  SendAgreementPaymentRequestInput,
  SendAgreementPaymentRequestOutput,
  SendAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<SendAgreementPaymentRequestInput>,
  output: __S(865, __c27, 1) as any as S.Schema<SendAgreementPaymentRequestOutput>,
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
  operationName: "SendAgreementPaymentRequest",
}));

export type UpdatePurchaseOrdersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows acceptors to associate purchase orders with agreement charges after an agreement is created.
 */
export const updatePurchaseOrders: API.OperationMethod<
  UpdatePurchaseOrdersInput,
  UpdatePurchaseOrdersOutput,
  UpdatePurchaseOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<UpdatePurchaseOrdersInput>,
  output: __S(64, __c2, 0) as any as S.Schema<UpdatePurchaseOrdersOutput>,
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
  operationName: "UpdatePurchaseOrders",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.String,
          originalInvoiceId: S.String,
          adjustmentAmount: S.String,
          currencyCode: S.String,
          adjustmentReasonCode: S.String,
          description: S.optional(SensitiveString),
          clientToken: S.String,
        }),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentRequestEntry" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ billingAdjustmentRequestEntries: __S(1, __c0, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentRequestInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ billingAdjustmentRequestId: S.String, clientToken: S.String }),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentItem" });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ code: S.String, message: S.String, clientToken: S.String }),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentError" });
    case 6:
      return S.Array(__S(5, __c0, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ items: __S(4, __c0, 4), errors: __S(6, __c0, 6) }),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentRequestOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelAgreementInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelAgreementOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.String,
          agreementCancellationRequestId: S.String,
          cancellationReason: SensitiveString,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CancelAgreementCancellationRequestInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementCancellationRequestId: S.optional(S.String),
          agreementId: S.optional(S.String),
          reasonCode: S.optional(S.String),
          description: S.optional(SensitiveString),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CancelAgreementCancellationRequestOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ paymentRequestId: S.String, agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelAgreementPaymentRequestInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ configurableUpfrontPricingTermConfiguration: __S(226, __c7, 2) }),
        /*@__PURE__*/ S.Struct({ renewalTermConfiguration: __S(227, __c7, 3) }),
        /*@__PURE__*/ S.Struct({ variablePaymentTermConfiguration: __S(228, __c7, 4) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.String, configuration: S.optional(__S(192, __c6, 0)) }),
      ).annotate({ identifier: "RequestedTerm" });
    case 2:
      return S.Array(__S(193, __c6, 1));
    case 3:
      return S.suspend(() => S.Struct({ taxEstimation: S.optional(S.String) })).annotate({
        identifier: "TaxConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          intent: S.String,
          requestedTerms: __S(194, __c6, 2),
          sourceAgreementIdentifier: S.optional(S.String),
          agreementProposalIdentifier: S.optional(S.String),
          taxConfiguration: S.optional(__S(195, __c6, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAgreementRequestInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          amount: S.optional(S.String),
          rate: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaxBreakdownItem" });
    case 6:
      return S.Array(__S(197, __c6, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ breakdown: S.optional(__S(198, __c6, 6)), totalAmount: S.optional(S.String) }),
      ).annotate({ identifier: "EstimatedTaxes" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          amount: S.optional(S.String),
          amountAfterTax: S.optional(S.String),
          timing: S.optional(S.String),
          estimatedTaxes: S.optional(__S(199, __c6, 7)),
        }),
      ).annotate({ identifier: "ExpectedCharge" });
    case 9:
      return S.Array(__S(200, __c6, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          dimensionKey: S.optional(S.String),
          newQuantity: S.optional(S.Number),
          oldQuantity: S.optional(S.Number),
          chargeReference: S.optional(S.String),
          incrementalChargeAmount: S.optional(S.String),
        }),
      ).annotate({ identifier: "ItemizedCharge" });
    case 11:
      return S.Array(__S(202, __c6, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          currencyCode: S.optional(S.String),
          newAgreementValue: S.optional(S.String),
          newAgreementValueAfterTax: S.optional(S.String),
          expectedCharges: S.optional(__S(201, __c6, 9)),
          estimatedTaxes: S.optional(__S(199, __c6, 7)),
          itemizedCharges: S.optional(__S(203, __c6, 11)),
          invoicingEntity: S.optional(__S(256, __c8, 0)),
        }),
      ).annotate({ identifier: "ChargeSummary" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.optional(S.String),
          chargeSummary: S.optional(__S(204, __c6, 12)),
        }),
      ).annotate({ identifier: "CreateAgreementRequestOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dimensionKey: S.String, dimensionValue: S.Number }),
      ).annotate({ identifier: "Dimension" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ selectorValue: S.String, dimensions: __S(225, __c7, 1) }),
      ).annotate({ identifier: "ConfigurableUpfrontPricingTermConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ enableAutoRenew: S.Boolean })).annotate({
        identifier: "RenewalTermConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          paymentRequestApprovalStrategy: S.String,
          expirationDuration: S.optional(S.String),
        }),
      ).annotate({ identifier: "VariablePaymentTermConfiguration" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ legalName: S.optional(S.String), branchName: S.optional(S.String) }),
      ).annotate({ identifier: "InvoicingEntity" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAgreementInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ currencyCode: S.optional(S.String), agreementValue: S.optional(S.String) }),
      ).annotate({ identifier: "EstimatedCharges" });
    case 2:
      return S.suspend(() => S.Struct({ offerId: S.optional(S.String) })).annotate({
        identifier: "RenewalSummary",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          reasonCode: S.optional(S.String),
          renewalSummary: S.optional(__S(290, __c9, 2)),
        }),
      ).annotate({ identifier: "EndTimeBehavior" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          acceptor: S.optional(__S(352, __c11, 0)),
          proposer: S.optional(__S(352, __c11, 0)),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          acceptanceTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          agreementType: S.optional(S.String),
          estimatedCharges: S.optional(__S(289, __c9, 1)),
          proposalSummary: S.optional(__S(354, __c11, 2)),
          status: S.optional(S.String),
          initialAgreementId: S.optional(S.String),
          endTimeBehavior: S.optional(__S(291, __c9, 3)),
        }),
      ).annotate({ identifier: "DescribeAgreementOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "Resource" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ accountId: S.optional(S.String) })).annotate({
        identifier: "Acceptor",
      });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resources: S.optional(__S(353, __c11, 1)),
          offerId: S.optional(S.String),
          offerSetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProposalSummary" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementCancellationRequestId: S.String, agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAgreementCancellationRequestInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAgreementEntitlementsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resource: S.optional(__S(320, __c10, 0)),
          type: S.optional(S.String),
          registrationToken: S.optional(S.String),
          status: S.optional(S.String),
          statusReasonCode: S.optional(S.String),
          licenseArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgreementEntitlement" });
    case 2:
      return S.Array(__S(417, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          agreementEntitlements: S.optional(__S(418, __c13, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAgreementEntitlementsOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ paymentRequestId: S.String, agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAgreementPaymentRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          paymentRequestId: S.optional(S.String),
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          chargeId: S.optional(S.String),
          chargeAmount: S.optional(S.String),
          currencyCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetAgreementPaymentRequestOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAgreementTermsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          url: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentItem" });
    case 2:
      return S.Array(__S(481, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          documents: S.optional(__S(482, __c15, 2)),
        }),
      ).annotate({ identifier: "LegalTerm" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          refundPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SupportTerm" });
    case 5:
      return S.suspend(() => S.Struct({ value: S.optional(S.String) })).annotate({
        identifier: "FixedPercentage",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          minValue: S.optional(S.String),
          maxValue: S.optional(S.String),
          defaultValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "PercentageRange" });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fixedPercentage: __S(485, __c15, 5) }),
        /*@__PURE__*/ S.Struct({ percentageRange: __S(486, __c15, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          chargeDateOffset: S.optional(S.String),
          chargePercentage: S.optional(S.String),
          dayOfMonth: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PaymentScheduleEntry" });
    case 9:
      return S.Array(__S(488, __c15, 8));
    case 10:
      return S.suspend(() => S.Struct({ schedule: S.optional(__S(489, __c15, 9)) })).annotate({
        identifier: "PaymentScheduleTermTemplate",
      });
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ paymentScheduleTermTemplate: __S(490, __c15, 10) }),
      ]);
    case 12:
      return S.Array(__S(491, __c15, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          configuration: S.optional(__S(227, __c7, 3)),
          lockoutPeriod: S.optional(S.String),
          maxRenewals: S.optional(S.Number),
          adjustmentDeadline: S.optional(S.String),
          priceIncrease: S.optional(__S(487, __c15, 7)),
          termTemplates: S.optional(__S(492, __c15, 12)),
        }),
      ).annotate({ identifier: "RenewalTerm" });
    case 14:
      return S.suspend(() =>
        S.Struct({ dimensionKey: S.optional(S.String), price: S.optional(S.String) }),
      ).annotate({ identifier: "RateCardItem" });
    case 15:
      return S.Array(__S(494, __c15, 14));
    case 16:
      return S.suspend(() => S.Struct({ rateCard: S.optional(__S(495, __c15, 15)) })).annotate({
        identifier: "UsageBasedRateCardItem",
      });
    case 17:
      return S.Array(__S(496, __c15, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          rateCards: S.optional(__S(497, __c15, 17)),
        }),
      ).annotate({ identifier: "UsageBasedPricingTerm" });
    case 19:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Selector" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          multipleDimensionSelection: S.optional(S.String),
          quantityConfiguration: S.optional(S.String),
        }),
      ).annotate({ identifier: "Constraints" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          selector: S.optional(__S(499, __c15, 19)),
          constraints: S.optional(__S(500, __c15, 20)),
          rateCard: S.optional(__S(495, __c15, 15)),
        }),
      ).annotate({ identifier: "ConfigurableUpfrontRateCardItem" });
    case 22:
      return S.Array(__S(501, __c15, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          rateCards: S.optional(__S(502, __c15, 22)),
          configuration: S.optional(__S(226, __c7, 2)),
        }),
      ).annotate({ identifier: "ConfigurableUpfrontPricingTerm" });
    case 24:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), id: S.optional(S.String) }),
      ).annotate({ identifier: "ByolPricingTerm" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          billingPeriod: S.optional(S.String),
          price: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecurringPaymentTerm" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          agreementDuration: S.optional(S.String),
          agreementStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          agreementEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ValidityTerm" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          chargeDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          chargeAmount: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduleItem" });
    case 28:
      return S.Array(__S(507, __c15, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          schedule: S.optional(__S(508, __c15, 28)),
        }),
      ).annotate({ identifier: "PaymentScheduleTerm" });
    case 30:
      return S.suspend(() =>
        S.Struct({ dimensionKey: S.optional(S.String), maxQuantity: S.optional(S.Number) }),
      ).annotate({ identifier: "GrantItem" });
    case 31:
      return S.Array(__S(510, __c15, 30));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          duration: S.optional(S.String),
          grants: S.optional(__S(511, __c15, 31)),
        }),
      ).annotate({ identifier: "FreeTrialPricingTerm" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          duration: S.optional(S.String),
          price: S.optional(S.String),
          grants: S.optional(__S(511, __c15, 31)),
        }),
      ).annotate({ identifier: "FixedUpfrontPricingTerm" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          maxTotalChargeAmount: S.optional(S.String),
          configuration: S.optional(__S(228, __c7, 4)),
        }),
      ).annotate({ identifier: "VariablePaymentTerm" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          paymentDuePeriod: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetPaymentTerm" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ legalTerm: __S(483, __c15, 3) }),
        /*@__PURE__*/ S.Struct({ supportTerm: __S(484, __c15, 4) }),
        /*@__PURE__*/ S.Struct({ renewalTerm: __S(493, __c15, 13) }),
        /*@__PURE__*/ S.Struct({ usageBasedPricingTerm: __S(498, __c15, 18) }),
        /*@__PURE__*/ S.Struct({ configurableUpfrontPricingTerm: __S(503, __c15, 23) }),
        /*@__PURE__*/ S.Struct({ byolPricingTerm: __S(504, __c15, 24) }),
        /*@__PURE__*/ S.Struct({ recurringPaymentTerm: __S(505, __c15, 25) }),
        /*@__PURE__*/ S.Struct({ validityTerm: __S(506, __c15, 26) }),
        /*@__PURE__*/ S.Struct({ paymentScheduleTerm: __S(509, __c15, 29) }),
        /*@__PURE__*/ S.Struct({ freeTrialPricingTerm: __S(512, __c16, 0) }),
        /*@__PURE__*/ S.Struct({ fixedUpfrontPricingTerm: __S(513, __c16, 1) }),
        /*@__PURE__*/ S.Struct({ variablePaymentTerm: __S(514, __c16, 2) }),
        /*@__PURE__*/ S.Struct({ netPaymentTerm: __S(515, __c16, 3) }),
      ]);
    case 5:
      return S.Array(__S(516, __c16, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          acceptedTerms: S.optional(__S(517, __c16, 5)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAgreementTermsOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementId: S.String, billingAdjustmentRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBillingAdjustmentRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          billingAdjustmentRequestId: S.String,
          agreementId: S.String,
          adjustmentReasonCode: S.String,
          description: S.optional(S.String),
          originalInvoiceId: S.String,
          adjustmentAmount: S.String,
          currencyCode: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetBillingAdjustmentRequestOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          partyType: S.String,
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          agreementType: S.optional(S.String),
          catalog: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAgreementCancellationRequestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agreementCancellationRequestId: S.optional(S.String),
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          reasonCode: S.optional(S.String),
          agreementType: S.optional(S.String),
          catalog: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AgreementCancellationRequestSummary" });
    case 2:
      return S.Array(__S(577, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(578, __c18, 2)) }),
      ).annotate({ identifier: "ListAgreementCancellationRequestsOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.optional(S.String),
          agreementId: S.optional(S.String),
          agreementType: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAgreementChargesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          revision: S.optional(S.Number),
          agreementId: S.optional(S.String),
          agreementType: S.optional(S.String),
          purchaseOrderReference: S.optional(S.String),
          currencyCode: S.optional(S.String),
          amount: S.optional(S.String),
          time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Charge" });
    case 2:
      return S.Array(__S(609, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(610, __c19, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgreementChargesOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ month: S.Number, year: S.Number })).annotate({
        identifier: "InvoiceBillingPeriod",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.String,
          groupBy: S.String,
          invoiceId: S.optional(S.String),
          invoiceType: S.optional(S.String),
          invoiceBillingPeriod: S.optional(__S(640, __c20, 0)),
          beforeIssuedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          afterIssuedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAgreementInvoiceLineItemsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          amount: S.optional(S.String),
          maxAdjustmentAmount: S.optional(S.String),
          currencyCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "PricingCurrencyAmount" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          invoiceId: S.optional(S.String),
          pricingCurrencyAmount: S.optional(__S(642, __c20, 2)),
          invoiceBillingPeriod: S.optional(__S(640, __c20, 0)),
          issuedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          invoiceType: S.optional(S.String),
          invoicingEntity: S.optional(__S(256, __c8, 0)),
        }),
      ).annotate({ identifier: "AgreementInvoiceLineItemGroupSummary" });
    case 4:
      return S.Array(__S(643, __c20, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          agreementInvoiceLineItemGroupSummaries: S.optional(__S(644, __c20, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAgreementInvoiceLineItemsOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          partyType: S.String,
          agreementType: S.optional(S.String),
          catalog: S.optional(S.String),
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAgreementPaymentRequestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          paymentRequestId: S.optional(S.String),
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          name: S.optional(S.String),
          chargeId: S.optional(S.String),
          chargeAmount: S.optional(S.String),
          currencyCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PaymentRequestSummary" });
    case 2:
      return S.Array(__S(673, __c21, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(674, __c21, 2) }),
      ).annotate({ identifier: "ListAgreementPaymentRequestsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          createdAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          maxResults: S.optional(S.Number),
          catalog: S.optional(S.String),
          agreementType: S.optional(S.String),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListBillingAdjustmentRequestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          billingAdjustmentRequestId: S.String,
          originalInvoiceId: S.String,
          adjustmentAmount: S.String,
          currencyCode: S.String,
          status: S.String,
          agreementId: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          agreementType: S.String,
          catalog: S.String,
        }),
      ).annotate({ identifier: "BillingAdjustmentSummary" });
    case 2:
      return S.Array(__S(705, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(706, __c22, 2) }),
      ).annotate({ identifier: "ListBillingAdjustmentRequestsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.String,
          agreementCancellationRequestId: S.String,
          rejectionReason: SensitiveString,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RejectAgreementCancellationRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          agreementCancellationRequestId: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          reasonCode: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RejectAgreementCancellationRequestOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          paymentRequestId: S.String,
          agreementId: S.String,
          rejectionReason: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "RejectAgreementPaymentRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          paymentRequestId: S.optional(S.String),
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          chargeAmount: S.optional(S.String),
          currencyCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "RejectAgreementPaymentRequestOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(800, __c25, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(__S(801, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sortBy: S.optional(S.String), sortOrder: S.optional(S.String) }),
      ).annotate({ identifier: "Sort" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          catalog: S.optional(S.String),
          filters: S.optional(__S(802, __c25, 2)),
          sort: S.optional(__S(803, __c25, 3)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchAgreementsInput" });
    case 5:
      return S.suspend(() => S.Struct({ licenseArn: S.optional(S.String) })).annotate({
        identifier: "Entitlement",
      });
    case 6:
      return S.Array(__S(805, __c25, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          acceptanceTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          agreementType: S.optional(S.String),
          acceptor: S.optional(__S(352, __c11, 0)),
          proposer: S.optional(__S(352, __c11, 0)),
          proposalSummary: S.optional(__S(354, __c11, 2)),
          status: S.optional(S.String),
          entitlements: S.optional(__S(806, __c25, 6)),
          initialAgreementId: S.optional(S.String),
          endTimeBehaviorType: S.optional(S.String),
          endTimeBehaviorReasonCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgreementViewSummary" });
    case 8:
      return S.Array(__S(807, __c25, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          agreementViewSummaries: S.optional(__S(808, __c25, 8)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchAgreementsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.String,
          reasonCode: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          description: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendAgreementCancellationRequestInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          agreementId: S.String,
          termId: S.String,
          name: S.String,
          chargeAmount: S.String,
          description: S.optional(SensitiveString),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendAgreementPaymentRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          paymentRequestId: S.optional(S.String),
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          chargeAmount: S.optional(S.String),
          currencyCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SendAgreementPaymentRequestOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ purchaseOrders: __S(1121, __c35, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePurchaseOrdersInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(928, __c29, 0));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementId: S.String, agreementCancellationRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptAgreementCancellationRequestInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          agreementCancellationRequestId: S.optional(S.String),
          status: S.optional(S.String),
          reasonCode: S.optional(S.String),
          description: S.optional(SensitiveString),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AcceptAgreementCancellationRequestOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          paymentRequestId: S.String,
          agreementId: S.String,
          purchaseOrderReference: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptAgreementPaymentRequestInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          paymentRequestId: S.optional(S.String),
          agreementId: S.optional(S.String),
          status: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(SensitiveString),
          chargeAmount: S.optional(S.String),
          currencyCode: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "AcceptAgreementPaymentRequestOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.String,
          purchaseOrders: S.optional(__S(1121, __c35, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptAgreementRequestInput" });
    case 1:
      return S.suspend(() => S.Struct({ agreementId: S.optional(S.String) })).annotate({
        identifier: "AcceptAgreementRequestOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          chargeId: S.String,
          chargeRevision: S.optional(S.Number),
          agreementId: S.optional(S.String),
          purchaseOrderReference: S.optional(S.String),
        }),
      ).annotate({ identifier: "PurchaseOrder" });
    case 1:
      return S.Array(__S(1120, __c35, 0));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
