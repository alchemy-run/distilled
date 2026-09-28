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
  sdkId: "Marketplace Agreement",
  target: "AWSMPCommerceService_v20200301",
  version: "2020-03-01",
  sigv4: "aws-marketplace",
  protocol: awsJson1_0Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://agreement-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://agreement-marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{
    readonly requestId?: string;
    readonly message?: string;
    readonly reason?: AccessDeniedExceptionReason;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly requestId?: string;
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: ResourceType;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly requestId?: string; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly requestId?: string;
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: ResourceType;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly requestId?: string;
    readonly message?: string;
    readonly quotaCode?: string;
    readonly serviceCode?: string;
    readonly resourceType?: string;
    readonly resourceId?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly requestId?: string; readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly requestId?: string;
    readonly message?: string;
    readonly reason?: ValidationExceptionReason;
    readonly fields?: ValidationExceptionField[];
  }> {}
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
export type AgreementCancellationRequestDescription =
  | string
  | redacted.Redacted<string>;
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
export type BatchCreateBillingAdjustmentItemList =
  BatchCreateBillingAdjustmentItem[];
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
export type BatchCreateBillingAdjustmentErrorList =
  BatchCreateBillingAdjustmentError[];
export interface BatchCreateBillingAdjustmentRequestOutput {
  items: BatchCreateBillingAdjustmentItem[];
  errors: BatchCreateBillingAdjustmentError[];
}
export interface CancelAgreementInput {
  agreementId: string;
}
export interface CancelAgreementOutput {}
export type AgreementCancellationRequestCancellationReason =
  | string
  | redacted.Redacted<string>;
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
export type Timing =
  | "ON_ACCEPTANCE"
  | "SCHEDULED"
  | "BILLING_PERIOD"
  | (string & {});
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
export interface RenewalTerm {
  type?: string;
  id?: string;
  configuration?: RenewalTermConfiguration;
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
export type BillingAdjustmentStatus =
  | "PENDING"
  | "VALIDATION_FAILED"
  | "COMPLETED"
  | (string & {});
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
export type AgreementCancellationRequestSummaryList =
  AgreementCancellationRequestSummary[];
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
export type AgreementInvoiceLineItemGroupSummaries =
  AgreementInvoiceLineItemGroupSummary[];
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
export type AgreementCancellationRequestRejectionReason =
  | string
  | redacted.Redacted<string>;
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
  agreementType?: string;
  acceptor?: Acceptor;
  proposer?: Proposer;
  proposalSummary?: ProposalSummary;
  status?: AgreementStatus;
  entitlements?: Entitlement[];
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
  descriptor: {
    service: svc,
    input: { agreementId: 0, agreementCancellationRequestId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { paymentRequestId: 0, agreementId: 0, purchaseOrderReference: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { agreementRequestId: 0, purchaseOrders: D.list(i_PurchaseOrder) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      billingAdjustmentRequestEntries: D.list({
        agreementId: 0,
        originalInvoiceId: 0,
        adjustmentAmount: 0,
        currencyCode: 0,
        adjustmentReasonCode: 0,
        description: 0,
        clientToken: 0,
      }),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { agreementId: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      agreementId: 0,
      agreementCancellationRequestId: 0,
      cancellationReason: 0,
    },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { paymentRequestId: 0, agreementId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      intent: 0,
      requestedTerms: D.list({
        id: 0,
        configuration: {
          configurableUpfrontPricingTermConfiguration: {
            selectorValue: 0,
            dimensions: D.list({ dimensionKey: 0, dimensionValue: 0 }),
          },
          renewalTermConfiguration: { enableAutoRenew: 0 },
          variablePaymentTermConfiguration: {
            paymentRequestApprovalStrategy: 0,
            expirationDuration: 0,
          },
        },
      }),
      sourceAgreementIdentifier: 0,
      agreementProposalIdentifier: 0,
      taxConfiguration: { taxEstimation: 0 },
    },
    output: { chargeSummary: { expectedCharges: D.list({ time: D.ts }) } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { agreementId: 0 },
    output: { startTime: D.ts, endTime: D.ts, acceptanceTime: D.ts },
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
  operationName: "DescribeAgreement",
})) as any;

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
  descriptor: {
    service: svc,
    input: { agreementCancellationRequestId: 0, agreementId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetAgreementCancellationRequest",
})) as any;

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
  descriptor: {
    service: svc,
    input: { agreementId: 0, maxResults: 0, nextToken: 0 },
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
  descriptor: {
    service: svc,
    input: { paymentRequestId: 0, agreementId: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetAgreementPaymentRequest",
})) as any;

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
 * - `TermType` – The type of term, such as `LegalTerm`, `RenewalTerm`, or `ConfigurableUpfrontPricingTerm`.
 *
 * - `TermID` – The ID of the particular term, which is common between offer and agreement.
 *
 * - `TermPayload` – The key information contained in the term, such as the EULA for `LegalTerm` or pricing and dimensions for various pricing terms, such as `ConfigurableUpfrontPricingTerm` or `UsageBasedPricingTerm`.
 *
 * - `Configuration` – The buyer/acceptor's selection at the time of agreement creation, such as the number of units purchased for a dimension or setting the `EnableAutoRenew` flag.
 */
export const getAgreementTerms: API.PaginatedOperationMethod<
  GetAgreementTermsInput,
  GetAgreementTermsOutput,
  GetAgreementTermsError,
  Credentials | HttpClient.HttpClient,
  AcceptedTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { agreementId: 0, maxResults: 0, nextToken: 0 },
    output: {
      acceptedTerms: D.list({
        validityTerm: { agreementStartDate: D.ts, agreementEndDate: D.ts },
        paymentScheduleTerm: { schedule: D.list({ chargeDate: D.ts }) },
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
  descriptor: {
    service: svc,
    input: { agreementId: 0, billingAdjustmentRequestId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetBillingAdjustmentRequest",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      partyType: 0,
      agreementId: 0,
      status: 0,
      agreementType: 0,
      catalog: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      agreementId: 0,
      agreementType: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ time: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      agreementId: 0,
      groupBy: 0,
      invoiceId: 0,
      invoiceType: 0,
      invoiceBillingPeriod: { month: 0, year: 0 },
      beforeIssuedTime: 0,
      afterIssuedTime: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      agreementInvoiceLineItemGroupSummaries: D.list({ issuedTime: D.ts }),
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
  descriptor: {
    service: svc,
    input: {
      partyType: 0,
      agreementType: 0,
      catalog: 0,
      agreementId: 0,
      status: 0,
      maxResults: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      agreementId: 0,
      status: 0,
      createdAfter: 0,
      createdBefore: 0,
      maxResults: 0,
      catalog: 0,
      agreementType: 0,
      nextToken: 0,
    },
    output: { items: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    input: {
      agreementId: 0,
      agreementCancellationRequestId: 0,
      rejectionReason: 0,
    },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { paymentRequestId: 0, agreementId: 0, rejectionReason: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

export type SearchAgreementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches across all agreements that a proposer or an acceptor has in AWS Marketplace. The search returns a list of agreements with basic agreement information.
 *
 * The following filter combinations are supported when the `PartyType` is `Proposer`:
 *
 * - `AgreementType`
 *
 * - `AgreementType` + `EndTime`
 *
 * - `AgreementType` + `ResourceType`
 *
 * - `AgreementType` + `ResourceType` + `EndTime`
 *
 * - `AgreementType` + `ResourceType` + `Status`
 *
 * - `AgreementType` + `ResourceType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier`
 *
 * - `AgreementType` + `ResourceIdentifier` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId`
 *
 * - `AgreementType` + `AcceptorAccountId` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `Status`
 *
 * - `AgreementType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `OfferId`
 *
 * - `AgreementType` + `OfferId` + `EndTime`
 *
 * - `AgreementType` + `OfferId` + `Status`
 *
 * - `AgreementType` + `OfferId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId`
 *
 * - `AgreementType` + `OfferSetId` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId` + `Status`
 *
 * - `AgreementType` + `OfferSetId` + `Status` + `EndTime`
 *
 * To filter by `EndTime`, you can use `BeforeEndTime` and/or `AfterEndTime`. Only `EndTime` is supported for sorting.
 *
 * The following filter combinations are supported when the `PartyType` is `Acceptor`:
 *
 * - `AgreementType`
 *
 * - `AgreementType` + `Status`
 *
 * - `AgreementType` + `EndTime`
 *
 * - `AgreementType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier`
 *
 * - `AgreementType` + `ResourceIdentifier` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status` + `EndTime`
 *
 * - `AgreementType` + `ResourceType`
 *
 * - `AgreementType` + `ResourceType` + `EndTime`
 *
 * - `AgreementType` + `OfferId`
 *
 * - `AgreementType` + `OfferId` + `EndTime`
 *
 * - `AgreementType` + `OfferId` + `Status`
 *
 * - `AgreementType` + `OfferId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId`
 *
 * - `AgreementType` + `OfferSetId` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId` + `Status`
 *
 * - `AgreementType` + `OfferSetId` + `Status` + `EndTime`
 */
export const searchAgreements: API.PaginatedOperationMethod<
  SearchAgreementsInput,
  SearchAgreementsOutput,
  SearchAgreementsError,
  Credentials | HttpClient.HttpClient,
  AgreementViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      catalog: 0,
      filters: D.list({ name: 0, values: 0 }),
      sort: { sortBy: 0, sortOrder: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      agreementViewSummaries: D.list({
        acceptanceTime: D.ts,
        startTime: D.ts,
        endTime: D.ts,
      }),
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
  descriptor: {
    service: svc,
    input: {
      agreementId: 0,
      reasonCode: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
    },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      clientToken: D.m({ idempotency: true }),
      agreementId: 0,
      termId: 0,
      name: 0,
      chargeAmount: 0,
      description: 0,
    },
    output: { description: D.secret, createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { purchaseOrders: D.list(i_PurchaseOrder) },
  },
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
})) as any;

const i_PurchaseOrder: D.LazyStruct = () => ({
  chargeId: 0,
  chargeRevision: 0,
  agreementId: 0,
  purchaseOrderReference: 0,
});
