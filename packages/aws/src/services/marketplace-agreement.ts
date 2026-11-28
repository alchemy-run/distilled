import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "MarketplaceAgreement",
  service: "MarketplaceAgreement",
  templates: false,
  propagate: TxXray.propagate,
} as const;

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
  ).pipe(C.withServerError, C.withRetryableError) {}
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
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
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
        /*@__PURE__*/ S.suspend(() => __S(1505, __c47, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AgreementApprovalId = string;
export type ChargeId = string;
export type PurchaseOrderReference = string;
export interface AgreementApprovalPurchaseOrder {
  chargeId: string;
  purchaseOrderReference?: string | undefined;
}
export type AgreementApprovalPurchaseOrders = AgreementApprovalPurchaseOrder[];
export type AgreementApprovalNote = string | redacted.Redacted<string>;
export type ApproverOutcomeId = string;
export interface BuyerAgreementApprovalApproverInput {
  agreementApprovalId: string;
  purchaseOrders?: AgreementApprovalPurchaseOrder[] | undefined;
  note?: string | redacted.Redacted<string> | undefined;
  approverOutcomeIdToOverride?: string | undefined;
}
export interface AcceptAgreementApprovalInput {
  buyerAgreementApprovalApproverInput?: BuyerAgreementApprovalApproverInput | undefined;
}
export interface AcceptAgreementApprovalOutput {}
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
  agreementId?: string | undefined;
  agreementCancellationRequestId?: string | undefined;
  status?: AgreementCancellationRequestStatus | undefined;
  reasonCode?: AgreementCancellationRequestReasonCode | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type PaymentRequestId = string;
export interface AcceptAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
  purchaseOrderReference?: string | undefined;
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
  paymentRequestId?: string | undefined;
  agreementId?: string | undefined;
  status?: PaymentRequestStatus | undefined;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  chargeAmount?: string | undefined;
  currencyCode?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type AgreementRequestId = string;
export type ResourceId = string;
export type ChargeRevision = number;
export interface PurchaseOrder {
  chargeId: string;
  chargeRevision?: number | undefined;
  agreementId?: string | undefined;
  purchaseOrderReference?: string | undefined;
}
export type PurchaseOrders = PurchaseOrder[];
export interface AcceptAgreementRequestInput {
  agreementRequestId: string;
  purchaseOrders?: PurchaseOrder[] | undefined;
}
export interface AcceptAgreementRequestOutput {
  agreementId?: string | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
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
  agreementCancellationRequestId?: string | undefined;
  agreementId?: string | undefined;
  reasonCode?: AgreementCancellationRequestReasonCode | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  status?: AgreementCancellationRequestStatus | undefined;
  statusMessage?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface CancelAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
}
export interface CancelAgreementPaymentRequestOutput {
  paymentRequestId?: string | undefined;
  agreementId?: string | undefined;
  status?: PaymentRequestStatus | undefined;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  chargeAmount?: string | undefined;
  currencyCode?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface CancelAgreementRequestInput {
  agreementRequestId: string;
}
export interface CancelAgreementRequestOutput {}
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
  expirationDuration?: string | undefined;
}
export type RequestedTermConfiguration =
  | {
      configurableUpfrontPricingTermConfiguration: ConfigurableUpfrontPricingTermConfiguration;
      renewalTermConfiguration?: undefined;
      variablePaymentTermConfiguration?: undefined;
    }
  | {
      configurableUpfrontPricingTermConfiguration?: undefined;
      renewalTermConfiguration: RenewalTermConfiguration;
      variablePaymentTermConfiguration?: undefined;
    }
  | {
      configurableUpfrontPricingTermConfiguration?: undefined;
      renewalTermConfiguration?: undefined;
      variablePaymentTermConfiguration: VariablePaymentTermConfiguration;
    };
export interface RequestedTerm {
  id: string;
  configuration?: RequestedTermConfiguration | undefined;
}
export type RequestedTermList = RequestedTerm[];
export type AgreementProposalId = string;
export type TaxEstimation = "DISABLED" | "ENABLED" | (string & {});
export interface TaxConfiguration {
  taxEstimation?: TaxEstimation | undefined;
}
export type PersonName = string | redacted.Redacted<string>;
export type EmailAddress = string | redacted.Redacted<string>;
export type ContactCompanyName = string | redacted.Redacted<string>;
export type CountryCode = string;
export interface AcceptorContact {
  firstName: string | redacted.Redacted<string>;
  lastName: string | redacted.Redacted<string>;
  emailAddress: string | redacted.Redacted<string>;
  companyName: string | redacted.Redacted<string>;
  countryCode: string;
}
export interface CreateAgreementRequestInput {
  clientToken?: string | undefined;
  intent: Intent;
  requestedTerms: RequestedTerm[];
  sourceAgreementIdentifier?: string | undefined;
  agreementProposalIdentifier?: string | undefined;
  taxConfiguration?: TaxConfiguration | undefined;
  acceptorContact?: AcceptorContact | undefined;
}
export type AgreementType = string;
export type Timing =
  | "ON_ACCEPTANCE"
  | "SCHEDULED"
  | "BILLING_PERIOD"
  | "NOT_APPLICABLE"
  | (string & {});
export interface TaxBreakdownItem {
  amount?: string | undefined;
  rate?: string | undefined;
  type?: string | undefined;
}
export type TaxBreakdown = TaxBreakdownItem[];
export interface EstimatedTaxes {
  breakdown?: TaxBreakdownItem[] | undefined;
  totalAmount?: string | undefined;
}
export interface ExpectedCharge {
  id?: string | undefined;
  time?: Date | undefined;
  amount?: string | undefined;
  amountAfterTax?: string | undefined;
  timing?: Timing | undefined;
  estimatedTaxes?: EstimatedTaxes | undefined;
  purchaseOrderReference?: string | undefined;
}
export type ExpectedChargeList = ExpectedCharge[];
export interface ItemizedCharge {
  dimensionKey?: string | undefined;
  newQuantity?: number | undefined;
  oldQuantity?: number | undefined;
  chargeReference?: string | undefined;
  incrementalChargeAmount?: string | undefined;
}
export type ItemizedChargeList = ItemizedCharge[];
export interface InvoicingEntity {
  legalName?: string | undefined;
  branchName?: string | undefined;
}
export interface ChargeSummary {
  currencyCode?: string | undefined;
  newAgreementValue?: string | undefined;
  newAgreementValueAfterTax?: string | undefined;
  expectedCharges?: ExpectedCharge[] | undefined;
  estimatedTaxes?: EstimatedTaxes | undefined;
  itemizedCharges?: ItemizedCharge[] | undefined;
  invoicingEntity?: InvoicingEntity | undefined;
}
export type AgreementRequestStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED"
  | (string & {});
export type ApprovalRequirement = "REQUIRED" | "NOT_REQUIRED" | (string & {});
export interface CreateAgreementRequestOutput {
  agreementRequestId?: string | undefined;
  agreementType?: string | undefined;
  chargeSummary?: ChargeSummary | undefined;
  status?: AgreementRequestStatus | undefined;
  approvalRequirement?: ApprovalRequirement | undefined;
  createdAt?: Date | undefined;
}
export interface DescribeAgreementInput {
  agreementId: string;
}
export type AWSAccountId = string;
export interface Acceptor {
  accountId?: string | undefined;
}
export interface Proposer {
  accountId?: string | undefined;
}
export interface EstimatedCharges {
  currencyCode?: string | undefined;
  agreementValue?: string | undefined;
}
export type AgreementResourceType = string;
export interface Resource {
  id?: string | undefined;
  type?: string | undefined;
}
export type Resources = Resource[];
export type OfferId = string;
export type OfferSetId = string;
export interface ProposalSummary {
  resources?: Resource[] | undefined;
  offerId?: string | undefined;
  offerSetId?: string | undefined;
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
  offerId?: string | undefined;
}
export interface EndTimeBehavior {
  type: EndTimeBehaviorType;
  reasonCode?: EndTimeBehaviorReasonCode | undefined;
  renewalSummary?: RenewalSummary | undefined;
}
export interface FreeTrialSummary {
  trialEndTime?: Date | undefined;
}
export interface DescribeAgreementOutput {
  agreementId?: string | undefined;
  acceptor?: Acceptor | undefined;
  proposer?: Proposer | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  acceptanceTime?: Date | undefined;
  agreementType?: string | undefined;
  estimatedCharges?: EstimatedCharges | undefined;
  proposalSummary?: ProposalSummary | undefined;
  status?: AgreementStatus | undefined;
  initialAgreementId?: string | undefined;
  endTimeBehavior?: EndTimeBehavior | undefined;
  freeTrialSummary?: FreeTrialSummary | undefined;
}
export interface GetAgreementApprovalInput {
  agreementApprovalId: string;
}
export type AgreementApprovalType = "BUYER_AGREEMENT_APPROVAL" | (string & {});
export type AgreementApprovalName = string;
export type AgreementApprovalStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED"
  | (string & {});
export interface AgreementApprovalRequester {
  accountId: string;
}
export type AgreementApprovalLevelName = string;
export interface BuyerAgreementApprovalCriteria {
  requiredApprovalCount: number;
}
export type ApproverOutcomeStatus =
  | "QUEUED"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "SKIPPED"
  | (string & {});
export type ApproverName = string | redacted.Redacted<string>;
export type PrincipalArn = string;
export interface CallerIdentity {
  principalArn: string;
}
export interface EmailApproverOutcome {
  note?: string | redacted.Redacted<string> | undefined;
  status: ApproverOutcomeStatus;
  updatedAt: Date;
  approverOutcomeId?: string | undefined;
  emailAddress: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string> | undefined;
  purchaseOrders?: AgreementApprovalPurchaseOrder[] | undefined;
  overriddenBy?: CallerIdentity | undefined;
}
export interface ProcurementToolApproverOutcome {
  note?: string | redacted.Redacted<string> | undefined;
  status: ApproverOutcomeStatus;
  updatedAt: Date;
  approverOutcomeId?: string | undefined;
  name: string | redacted.Redacted<string>;
  purchaseOrders?: AgreementApprovalPurchaseOrder[] | undefined;
  overriddenBy?: CallerIdentity | undefined;
}
export interface AwsOrganizationApproverOutcome {
  note?: string | redacted.Redacted<string> | undefined;
  status: ApproverOutcomeStatus;
  updatedAt: Date;
  approverOutcomeId?: string | undefined;
  purchaseOrders?: AgreementApprovalPurchaseOrder[] | undefined;
}
export type ApproverOutcome =
  | {
      emailApproverOutcome: EmailApproverOutcome;
      procurementToolApproverOutcome?: undefined;
      awsOrganizationApproverOutcome?: undefined;
    }
  | {
      emailApproverOutcome?: undefined;
      procurementToolApproverOutcome: ProcurementToolApproverOutcome;
      awsOrganizationApproverOutcome?: undefined;
    }
  | {
      emailApproverOutcome?: undefined;
      procurementToolApproverOutcome?: undefined;
      awsOrganizationApproverOutcome: AwsOrganizationApproverOutcome;
    };
export type BuyerApproverOutcomes = ApproverOutcome[];
export interface BuyerAgreementApprovalGroup {
  approvalCriteria: BuyerAgreementApprovalCriteria;
  approvers: ApproverOutcome[];
}
export type BuyerAgreementApprovalGroups = BuyerAgreementApprovalGroup[];
export interface BuyerAgreementApprovalLevel {
  name?: string | undefined;
  groups: BuyerAgreementApprovalGroup[];
}
export type BuyerAgreementApprovalLevels = BuyerAgreementApprovalLevel[];
export type AgreementApprovalPlanReference = string;
export interface BuyerAgreementApprovalPlanInput {
  planReference: string;
  requesterNote?: string | redacted.Redacted<string> | undefined;
}
export type ProposerLegalName = string;
export interface AgreementApprovalProposer {
  accountId: string;
  legalName: string;
}
export type AgreementApprovalOfferId = string;
export type AgreementApprovalOfferSetId = string;
export type AgreementApprovalResourceId = string;
export type AgreementApprovalResourceType = string;
export type AgreementApprovalResourceName = string;
export type AgreementApprovalDeployedOnAws = string;
export interface AgreementApprovalResource {
  id: string;
  type: string;
  name: string;
  deployedOnAws?: string | undefined;
}
export type AgreementApprovalResources = AgreementApprovalResource[];
export type OfferVisibilityScope = "PUBLIC" | "PRIVATE" | (string & {});
export interface AgreementApprovalProposalSummary {
  offerId: string;
  offerSetId?: string | undefined;
  resources?: AgreementApprovalResource[] | undefined;
  visibilityScope: OfferVisibilityScope;
}
export interface BuyerAgreementApproval {
  approvalType: AgreementApprovalType;
  agreementApprovalId: string;
  name: string;
  agreementRequestId: string;
  status: AgreementApprovalStatus;
  requester: AgreementApprovalRequester;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date | undefined;
  expiresAt?: Date | undefined;
  approvalNeededBy: Date;
  levels: BuyerAgreementApprovalLevel[];
  planInput: BuyerAgreementApprovalPlanInput;
  proposer: AgreementApprovalProposer;
  proposalSummary: AgreementApprovalProposalSummary;
}
export interface GetAgreementApprovalOutput {
  buyerAgreementApproval?: BuyerAgreementApproval | undefined;
}
export interface GetAgreementCancellationRequestInput {
  agreementCancellationRequestId: string;
  agreementId: string;
}
export interface GetAgreementCancellationRequestOutput {
  agreementCancellationRequestId?: string | undefined;
  agreementId?: string | undefined;
  reasonCode?: AgreementCancellationRequestReasonCode | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  status?: AgreementCancellationRequestStatus | undefined;
  statusMessage?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface GetAgreementContactsInput {
  agreementId: string;
}
export interface GetAgreementContactsOutput {
  acceptorContact?: AcceptorContact | undefined;
}
export type MaxResults = number;
export type NextToken = string;
export interface GetAgreementEntitlementsInput {
  agreementId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type EntitlementType = string;
export type RegistrationToken = string | redacted.Redacted<string>;
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
  resource?: Resource | undefined;
  type?: string | undefined;
  registrationToken?: string | redacted.Redacted<string> | undefined;
  status?: AgreementEntitlementStatus | undefined;
  statusReasonCode?: AgreementEntitlementStatusReasonCode | undefined;
  licenseArn?: string | undefined;
}
export type AgreementEntitlementList = AgreementEntitlement[];
export interface GetAgreementEntitlementsOutput {
  agreementEntitlements?: AgreementEntitlement[] | undefined;
  nextToken?: string | undefined;
}
export interface GetAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
}
export type PaymentRequestStatusMessage = string;
export interface GetAgreementPaymentRequestOutput {
  paymentRequestId?: string | undefined;
  agreementId?: string | undefined;
  status?: PaymentRequestStatus | undefined;
  statusMessage?: string | undefined;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  chargeId?: string | undefined;
  chargeAmount?: string | undefined;
  currencyCode?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface GetAgreementRequestInput {
  agreementRequestId: string;
}
export interface GetAgreementRequestOutput {
  agreementRequestId?: string | undefined;
  agreementType?: string | undefined;
  status?: AgreementRequestStatus | undefined;
  approvalRequirement?: ApprovalRequirement | undefined;
  agreementId?: string | undefined;
  intent?: Intent | undefined;
  createdAt?: Date | undefined;
  chargeSummary?: ChargeSummary | undefined;
  proposer?: Proposer | undefined;
  proposalSummary?: ProposalSummary | undefined;
}
export interface GetAgreementRequestApprovalPlansInput {
  agreementRequestId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type AgreementApprovalPlanName = string;
export interface EmailApprover {
  emailAddress: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string> | undefined;
}
export interface ProcurementToolApprover {
  name: string | redacted.Redacted<string>;
}
export type OrganizationId = string;
export interface AwsOrganizationAdminApprover {
  organizationId: string;
}
export type Approver =
  | {
      emailApprover: EmailApprover;
      procurementToolApprover?: undefined;
      awsOrganizationAdminApprover?: undefined;
    }
  | {
      emailApprover?: undefined;
      procurementToolApprover: ProcurementToolApprover;
      awsOrganizationAdminApprover?: undefined;
    }
  | {
      emailApprover?: undefined;
      procurementToolApprover?: undefined;
      awsOrganizationAdminApprover: AwsOrganizationAdminApprover;
    };
export type BuyerApprovers = Approver[];
export interface BuyerAgreementApprovalPlanGroup {
  approvalCriteria: BuyerAgreementApprovalCriteria;
  approvers: Approver[];
}
export type BuyerAgreementApprovalPlanGroups = BuyerAgreementApprovalPlanGroup[];
export interface BuyerAgreementApprovalPlanLevel {
  name?: string | undefined;
  groups: BuyerAgreementApprovalPlanGroup[];
}
export type BuyerAgreementApprovalPlanLevels = BuyerAgreementApprovalPlanLevel[];
export interface BuyerAgreementApprovalPlan {
  planReference: string;
  name?: string | undefined;
  levels: BuyerAgreementApprovalPlanLevel[];
}
export type AgreementApprovalPlan = { buyerAgreementApprovalPlan: BuyerAgreementApprovalPlan };
export type AgreementApprovalPlans = AgreementApprovalPlan[];
export interface GetAgreementRequestApprovalPlansOutput {
  items: AgreementApprovalPlan[];
  nextToken?: string | undefined;
}
export type AgreementRequestTermsMaxResults = number;
export interface GetAgreementRequestTermsInput {
  agreementRequestId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type UnversionedTermType = string;
export interface DocumentItem {
  type?: string | undefined;
  url?: string | undefined;
  version?: string | undefined;
}
export type DocumentList = DocumentItem[];
export interface LegalTerm {
  type?: string | undefined;
  id?: string | undefined;
  documents?: DocumentItem[] | undefined;
}
export interface SupportTerm {
  type?: string | undefined;
  id?: string | undefined;
  refundPolicy?: string | undefined;
}
export type DayDuration = string;
export type PriceIncreasePercentage = string;
export interface FixedPercentage {
  value?: string | undefined;
}
export interface PercentageRange {
  minValue?: string | undefined;
  maxValue?: string | undefined;
  defaultValue?: string | undefined;
}
export type PriceIncrease =
  | { fixedPercentage: FixedPercentage; percentageRange?: undefined }
  | { fixedPercentage?: undefined; percentageRange: PercentageRange };
export type OffsetDuration = string;
export type ChargePercentage = string;
export interface PaymentScheduleEntry {
  chargeDateOffset?: string | undefined;
  chargePercentage?: string | undefined;
  dayOfMonth?: number | undefined;
}
export type PaymentScheduleEntryList = PaymentScheduleEntry[];
export interface PaymentScheduleTermTemplate {
  schedule?: PaymentScheduleEntry[] | undefined;
}
export type TermTemplate = { paymentScheduleTermTemplate: PaymentScheduleTermTemplate };
export type TermTemplateList = TermTemplate[];
export interface RenewalTerm {
  type?: string | undefined;
  id?: string | undefined;
  configuration?: RenewalTermConfiguration | undefined;
  lockoutPeriod?: string | undefined;
  maxRenewals?: number | undefined;
  adjustmentDeadline?: string | undefined;
  priceIncrease?: PriceIncrease | undefined;
  termTemplates?: TermTemplate[] | undefined;
}
export type AWSRegion = string;
export interface RegionalPrice {
  region: string;
  price: string;
}
export type RegionalPriceList = RegionalPrice[];
export interface RateCardItem {
  dimensionKey?: string | undefined;
  price?: string | undefined;
  regionalPrices?: RegionalPrice[] | undefined;
}
export type RateCardList = RateCardItem[];
export interface UsageBasedRateCardItem {
  rateCard?: RateCardItem[] | undefined;
}
export type UsageBasedRateCardList = UsageBasedRateCardItem[];
export interface UsageBasedPricingTerm {
  type?: string | undefined;
  id?: string | undefined;
  currencyCode?: string | undefined;
  rateCards?: UsageBasedRateCardItem[] | undefined;
}
export interface Selector {
  type?: string | undefined;
  value?: string | undefined;
}
export interface Constraints {
  multipleDimensionSelection?: string | undefined;
  quantityConfiguration?: string | undefined;
}
export interface ConfigurableUpfrontRateCardItem {
  selector?: Selector | undefined;
  constraints?: Constraints | undefined;
  rateCard?: RateCardItem[] | undefined;
}
export type ConfigurableUpfrontRateCardList = ConfigurableUpfrontRateCardItem[];
export interface ConfigurableUpfrontPricingTerm {
  type?: string | undefined;
  id?: string | undefined;
  currencyCode?: string | undefined;
  rateCards?: ConfigurableUpfrontRateCardItem[] | undefined;
  configuration?: ConfigurableUpfrontPricingTermConfiguration | undefined;
}
export interface ByolPricingTerm {
  type?: string | undefined;
  id?: string | undefined;
}
export interface RecurringPaymentTerm {
  type?: string | undefined;
  id?: string | undefined;
  currencyCode?: string | undefined;
  billingPeriod?: string | undefined;
  price?: string | undefined;
}
export interface ValidityTerm {
  type?: string | undefined;
  id?: string | undefined;
  agreementDuration?: string | undefined;
  agreementStartDate?: Date | undefined;
  agreementEndDate?: Date | undefined;
}
export interface ScheduleItem {
  chargeDate?: Date | undefined;
  chargeAmount?: string | undefined;
}
export type ScheduleList = ScheduleItem[];
export interface PaymentScheduleTerm {
  type?: string | undefined;
  id?: string | undefined;
  currencyCode?: string | undefined;
  schedule?: ScheduleItem[] | undefined;
}
export type PositiveIntegerWithDefaultValueOne = number;
export interface GrantItem {
  dimensionKey?: string | undefined;
  maxQuantity?: number | undefined;
}
export type GrantList = GrantItem[];
export interface FreeTrialPricingTerm {
  type?: string | undefined;
  id?: string | undefined;
  duration?: string | undefined;
  grants?: GrantItem[] | undefined;
}
export interface FixedUpfrontPricingTerm {
  type?: string | undefined;
  id?: string | undefined;
  currencyCode?: string | undefined;
  duration?: string | undefined;
  price?: string | undefined;
  grants?: GrantItem[] | undefined;
}
export interface VariablePaymentTerm {
  type?: string | undefined;
  id?: string | undefined;
  currencyCode?: string | undefined;
  maxTotalChargeAmount?: string | undefined;
  configuration?: VariablePaymentTermConfiguration | undefined;
}
export interface NetPaymentTerm {
  type?: string | undefined;
  id?: string | undefined;
  paymentDuePeriod?: string | undefined;
}
export type AgreementRequestTerm =
  | {
      legalTerm: LegalTerm;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm: SupportTerm;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm: RenewalTerm;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm: UsageBasedPricingTerm;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm: ByolPricingTerm;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm: RecurringPaymentTerm;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm: ValidityTerm;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm: PaymentScheduleTerm;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm: FreeTrialPricingTerm;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm: FixedUpfrontPricingTerm;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm: VariablePaymentTerm;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm: NetPaymentTerm;
    };
export type AgreementRequestTermList = AgreementRequestTerm[];
export interface GetAgreementRequestTermsOutput {
  terms: AgreementRequestTerm[];
  nextToken?: string | undefined;
}
export interface GetAgreementTermsInput {
  agreementId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type AcceptedTerm =
  | {
      legalTerm: LegalTerm;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm: SupportTerm;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm: RenewalTerm;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm: UsageBasedPricingTerm;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm: ByolPricingTerm;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm: RecurringPaymentTerm;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm: ValidityTerm;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm: PaymentScheduleTerm;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm: FreeTrialPricingTerm;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm: FixedUpfrontPricingTerm;
      variablePaymentTerm?: undefined;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm: VariablePaymentTerm;
      netPaymentTerm?: undefined;
    }
  | {
      legalTerm?: undefined;
      supportTerm?: undefined;
      renewalTerm?: undefined;
      usageBasedPricingTerm?: undefined;
      configurableUpfrontPricingTerm?: undefined;
      byolPricingTerm?: undefined;
      recurringPaymentTerm?: undefined;
      validityTerm?: undefined;
      paymentScheduleTerm?: undefined;
      freeTrialPricingTerm?: undefined;
      fixedUpfrontPricingTerm?: undefined;
      variablePaymentTerm?: undefined;
      netPaymentTerm: NetPaymentTerm;
    };
export type AcceptedTermList = AcceptedTerm[];
export interface GetAgreementTermsOutput {
  acceptedTerms?: AcceptedTerm[] | undefined;
  nextToken?: string | undefined;
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
  description?: string | undefined;
  originalInvoiceId: string;
  adjustmentAmount: string;
  currencyCode: string;
  status: BillingAdjustmentStatus;
  statusMessage?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type Catalog = string;
export type AgreementApprovalPartyType = "REQUESTER" | "AWS_ORGANIZATION_ADMIN" | (string & {});
export interface ListAgreementApprovalsInput {
  catalog?: string | undefined;
  partyType: AgreementApprovalPartyType;
  agreementRequestId?: string | undefined;
  approvalType?: AgreementApprovalType | undefined;
  status?: AgreementApprovalStatus | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AgreementApprovalSummary {
  approvalType: AgreementApprovalType;
  agreementRequestId: string;
  agreementApprovalId: string;
  name: string;
  status: AgreementApprovalStatus;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date | undefined;
  expiresAt?: Date | undefined;
  approvalNeededBy: Date;
}
export type AgreementApprovalSummaries = AgreementApprovalSummary[];
export interface ListAgreementApprovalsOutput {
  items: AgreementApprovalSummary[];
  nextToken?: string | undefined;
}
export type PartyType = string;
export interface ListAgreementCancellationRequestsInput {
  partyType: string;
  agreementId?: string | undefined;
  status?: AgreementCancellationRequestStatus | undefined;
  agreementType?: string | undefined;
  catalog?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AgreementCancellationRequestSummary {
  agreementCancellationRequestId?: string | undefined;
  agreementId?: string | undefined;
  status?: AgreementCancellationRequestStatus | undefined;
  reasonCode?: AgreementCancellationRequestReasonCode | undefined;
  agreementType?: string | undefined;
  catalog?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type AgreementCancellationRequestSummaryList = AgreementCancellationRequestSummary[];
export interface ListAgreementCancellationRequestsOutput {
  nextToken?: string | undefined;
  items?: AgreementCancellationRequestSummary[] | undefined;
}
export interface ListAgreementChargesInput {
  catalog?: string | undefined;
  agreementId?: string | undefined;
  agreementType?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface Charge {
  id?: string | undefined;
  revision?: number | undefined;
  agreementId?: string | undefined;
  agreementType?: string | undefined;
  purchaseOrderReference?: string | undefined;
  currencyCode?: string | undefined;
  amount?: string | undefined;
  time?: Date | undefined;
}
export type Charges = Charge[];
export interface ListAgreementChargesOutput {
  items?: Charge[] | undefined;
  nextToken?: string | undefined;
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
  invoiceId?: string | undefined;
  invoiceType?: InvoiceType | undefined;
  invoiceBillingPeriod?: InvoiceBillingPeriod | undefined;
  beforeIssuedTime?: Date | undefined;
  afterIssuedTime?: Date | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PricingCurrencyAmount {
  amount?: string | undefined;
  maxAdjustmentAmount?: string | undefined;
  currencyCode?: string | undefined;
}
export interface AgreementInvoiceLineItemGroupSummary {
  agreementId?: string | undefined;
  invoiceId?: string | undefined;
  pricingCurrencyAmount?: PricingCurrencyAmount | undefined;
  invoiceBillingPeriod?: InvoiceBillingPeriod | undefined;
  issuedTime?: Date | undefined;
  invoiceType?: InvoiceType | undefined;
  invoicingEntity?: InvoicingEntity | undefined;
}
export type AgreementInvoiceLineItemGroupSummaries = AgreementInvoiceLineItemGroupSummary[];
export interface ListAgreementInvoiceLineItemsOutput {
  agreementInvoiceLineItemGroupSummaries?: AgreementInvoiceLineItemGroupSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListAgreementPaymentRequestsInput {
  partyType: string;
  agreementType?: string | undefined;
  catalog?: string | undefined;
  agreementId?: string | undefined;
  status?: PaymentRequestStatus | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface PaymentRequestSummary {
  paymentRequestId?: string | undefined;
  agreementId?: string | undefined;
  status?: PaymentRequestStatus | undefined;
  name?: string | undefined;
  chargeId?: string | undefined;
  chargeAmount?: string | undefined;
  currencyCode?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type PaymentRequestSummaryList = PaymentRequestSummary[];
export interface ListAgreementPaymentRequestsOutput {
  nextToken?: string | undefined;
  items: PaymentRequestSummary[];
}
export interface ListAgreementRequestsInput {
  catalog?: string | undefined;
  status?: AgreementRequestStatus | undefined;
  resourceId?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AgreementRequestSummary {
  agreementRequestId?: string | undefined;
  agreementType?: string | undefined;
  status?: AgreementRequestStatus | undefined;
  agreementId?: string | undefined;
  proposalSummary?: ProposalSummary | undefined;
}
export type AgreementRequestSummaryList = AgreementRequestSummary[];
export interface ListAgreementRequestsOutput {
  items?: AgreementRequestSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListBillingAdjustmentRequestsInput {
  agreementId?: string | undefined;
  status?: BillingAdjustmentStatus | undefined;
  createdAfter?: Date | undefined;
  createdBefore?: Date | undefined;
  maxResults?: number | undefined;
  catalog?: string | undefined;
  agreementType?: string | undefined;
  nextToken?: string | undefined;
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
  nextToken?: string | undefined;
  items: BillingAdjustmentSummary[];
}
export interface BuyerAgreementApprovalRejectionInput {
  agreementApprovalId: string;
  note: string | redacted.Redacted<string>;
  approverOutcomeIdToOverride?: string | undefined;
}
export interface RejectAgreementApprovalInput {
  buyerAgreementApprovalRejectionInput?: BuyerAgreementApprovalRejectionInput | undefined;
}
export interface RejectAgreementApprovalOutput {}
export type AgreementCancellationRequestRejectionReason = string | redacted.Redacted<string>;
export interface RejectAgreementCancellationRequestInput {
  agreementId: string;
  agreementCancellationRequestId: string;
  rejectionReason: string | redacted.Redacted<string>;
}
export interface RejectAgreementCancellationRequestOutput {
  agreementId?: string | undefined;
  agreementCancellationRequestId?: string | undefined;
  status?: AgreementCancellationRequestStatus | undefined;
  statusMessage?: string | undefined;
  reasonCode?: AgreementCancellationRequestReasonCode | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type PaymentRequestRejectionReason = string;
export interface RejectAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
  rejectionReason?: string | undefined;
}
export interface RejectAgreementPaymentRequestOutput {
  paymentRequestId?: string | undefined;
  agreementId?: string | undefined;
  status?: PaymentRequestStatus | undefined;
  statusMessage?: string | undefined;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  chargeAmount?: string | undefined;
  currencyCode?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export interface Filter {
  name?: string | undefined;
  values?: string[] | undefined;
}
export type FilterList = Filter[];
export type SortBy = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface Sort {
  sortBy?: string | undefined;
  sortOrder?: SortOrder | undefined;
}
export interface SearchAgreementsInput {
  catalog?: string | undefined;
  filters?: Filter[] | undefined;
  sort?: Sort | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface Entitlement {
  licenseArn?: string | undefined;
}
export type EntitlementList = Entitlement[];
export type ContactType = "ACCEPTOR" | (string & {});
export type ContactTypeList = ContactType[];
export interface AgreementViewSummary {
  agreementId?: string | undefined;
  acceptanceTime?: Date | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  lastUpdateTime?: Date | undefined;
  agreementType?: string | undefined;
  acceptor?: Acceptor | undefined;
  proposer?: Proposer | undefined;
  proposalSummary?: ProposalSummary | undefined;
  status?: AgreementStatus | undefined;
  entitlements?: Entitlement[] | undefined;
  initialAgreementId?: string | undefined;
  endTimeBehaviorType?: EndTimeBehaviorType | undefined;
  endTimeBehaviorReasonCode?: EndTimeBehaviorReasonCode | undefined;
  freeTrialEndTime?: Date | undefined;
  includesContactOfType?: ContactType[] | undefined;
}
export type AgreementViewSummaryList = AgreementViewSummary[];
export interface SearchAgreementsOutput {
  agreementViewSummaries?: AgreementViewSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface SendAgreementCancellationRequestInput {
  agreementId: string;
  reasonCode: AgreementCancellationRequestReasonCode;
  clientToken?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
}
export interface SendAgreementCancellationRequestOutput {
  agreementId?: string | undefined;
  agreementCancellationRequestId?: string | undefined;
  status?: AgreementCancellationRequestStatus | undefined;
  reasonCode?: AgreementCancellationRequestReasonCode | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface SendAgreementPaymentRequestInput {
  clientToken?: string | undefined;
  agreementId: string;
  termId: string;
  name: string;
  chargeAmount: string;
  description?: string | redacted.Redacted<string> | undefined;
}
export interface SendAgreementPaymentRequestOutput {
  paymentRequestId?: string | undefined;
  agreementId?: string | undefined;
  status?: PaymentRequestStatus | undefined;
  name?: string | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  chargeAmount?: string | undefined;
  currencyCode?: string | undefined;
  createdAt?: Date | undefined;
}
export type AgreementApprovalPlanInput = {
  buyerAgreementApprovalPlanInput: BuyerAgreementApprovalPlanInput;
};
export type AgreementApprovalPlanInputs = AgreementApprovalPlanInput[];
export interface StartAgreementApprovalsInput {
  agreementRequestId: string;
  planInputs: AgreementApprovalPlanInput[];
  purchaseOrders?: AgreementApprovalPurchaseOrder[] | undefined;
}
export interface StartAgreementApprovalsOutput {
  approvalSummaries: AgreementApprovalSummary[];
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
  | "AgreementApproval"
  | "AgreementRequestApprovalPlan"
  | (string & {});
export type ValidationExceptionReason =
  | "CLOSED_AGREEMENT_APPROVAL"
  | "QUEUED_AGREEMENT_APPROVAL"
  | "INVALID_AGREEMENT_APPROVAL_ID"
  | "MISSING_AGREEMENT_APPROVAL_ID"
  | "DUPLICATE_PLAN_REFERENCE"
  | "INVALID_PLAN_INPUTS"
  | "PENDING_APPROVAL_AGREEMENT_REQUEST"
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
  | "INVALID_ACCEPTOR_CONTACT"
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
  | "MISSING_AWS_LICENSE_MANAGER_USER_SUBSCRIPTIONS_SLR"
  | "MISSING_PURCHASE_ORDER_REFERENCE"
  | "INVALID_RESOURCE_ID"
  | "CLOSED_AGREEMENT_REQUEST"
  | "INCOMPATIBLE_AGREEMENT_REQUEST"
  | "REJECTED_BY_AGREEMENT_APPROVAL_POLICY"
  | "MISSING_PLAN_INPUTS"
  | "INVALID_APPROVER_OUTCOME_ID_TO_OVERRIDE"
  | "INVALID_NOTE"
  | "MISSING_NOTE"
  | "INVALID_APPROVAL_TYPE"
  | "MISSING_SORT_BY"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AcceptAgreementApprovalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows the management account or a delegated administrator of the buyer's AWS organization to approve an agreement approval that is in `PENDING_APPROVAL` status, as the organization administrator approver or on behalf of another approver. Once every level is approved, the agreement approval transitions to `APPROVED` status. You can optionally provide purchase order references and a note.
 */
export const acceptAgreementApproval: API.OperationMethod<
  AcceptAgreementApprovalInput & RegionInput,
  AcceptAgreementApprovalOutput,
  AcceptAgreementApprovalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1537, __c48, 1) as any as S.Schema<AcceptAgreementApprovalInput>,
  output: __S(1568, __c49, 0) as any as S.Schema<AcceptAgreementApprovalOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAgreementApproval",
  telemetry: TELEMETRY,
  span: "AcceptAgreementApproval",
}));

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
  AcceptAgreementCancellationRequestInput & RegionInput,
  AcceptAgreementCancellationRequestOutput,
  AcceptAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<AcceptAgreementCancellationRequestInput>,
  output: __S(1664, __c52, 0) as any as S.Schema<AcceptAgreementCancellationRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAgreementCancellationRequest",
  telemetry: TELEMETRY,
  span: "AcceptAgreementCancellationRequest",
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
  AcceptAgreementPaymentRequestInput & RegionInput,
  AcceptAgreementPaymentRequestOutput,
  AcceptAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<AcceptAgreementPaymentRequestInput>,
  output: __S(1728, __c54, 0) as any as S.Schema<AcceptAgreementPaymentRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAgreementPaymentRequest",
  telemetry: TELEMETRY,
  span: "AcceptAgreementPaymentRequest",
}));

export type AcceptAgreementRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts an agreement request to finalize the agreement. The acceptor can optionally provide purchase orders to associate with the agreement charges.
 */
export const acceptAgreementRequest: API.OperationMethod<
  AcceptAgreementRequestInput & RegionInput,
  AcceptAgreementRequestOutput,
  AcceptAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AcceptAgreementRequestInput>,
  output: __S(1, __c0, 1) as any as S.Schema<AcceptAgreementRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAgreementRequest",
  telemetry: TELEMETRY,
  span: "AcceptAgreementRequest",
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
  BatchCreateBillingAdjustmentRequestInput & RegionInput,
  BatchCreateBillingAdjustmentRequestOutput,
  BatchCreateBillingAdjustmentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(66, __c2, 2) as any as S.Schema<BatchCreateBillingAdjustmentRequestInput>,
  output: __S(71, __c2, 7) as any as S.Schema<BatchCreateBillingAdjustmentRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateBillingAdjustmentRequest",
  telemetry: TELEMETRY,
  span: "BatchCreateBillingAdjustmentRequest",
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
  CancelAgreementInput & RegionInput,
  CancelAgreementOutput,
  CancelAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<CancelAgreementInput>,
  output: __S(1568, __c49, 0) as any as S.Schema<CancelAgreementOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAgreement",
  telemetry: TELEMETRY,
  span: "CancelAgreement",
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
  CancelAgreementCancellationRequestInput & RegionInput,
  CancelAgreementCancellationRequestOutput,
  CancelAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<CancelAgreementCancellationRequestInput>,
  output: __S(160, __c5, 0) as any as S.Schema<CancelAgreementCancellationRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAgreementCancellationRequest",
  telemetry: TELEMETRY,
  span: "CancelAgreementCancellationRequest",
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
  CancelAgreementPaymentRequestInput & RegionInput,
  CancelAgreementPaymentRequestOutput,
  CancelAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<CancelAgreementPaymentRequestInput>,
  output: __S(1728, __c54, 0) as any as S.Schema<CancelAgreementPaymentRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAgreementPaymentRequest",
  telemetry: TELEMETRY,
  span: "CancelAgreementPaymentRequest",
}));

export type CancelAgreementRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to cancel an agreement request that is in `PENDING_APPROVAL` status, or in `APPROVED` status when no agreement has been created from it. Once cancelled, the agreement request transitions to `CANCELLED` status and its open agreement approvals are cancelled.
 */
export const cancelAgreementRequest: API.OperationMethod<
  CancelAgreementRequestInput & RegionInput,
  CancelAgreementRequestOutput,
  CancelAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<CancelAgreementRequestInput>,
  output: __S(1568, __c49, 0) as any as S.Schema<CancelAgreementRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAgreementRequest",
  telemetry: TELEMETRY,
  span: "CancelAgreementRequest",
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
  CreateAgreementRequestInput & RegionInput,
  CreateAgreementRequestOutput,
  CreateAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(260, __c8, 4) as any as S.Schema<CreateAgreementRequestInput>,
  output: __S(261, __c8, 5) as any as S.Schema<CreateAgreementRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgreementRequest",
  telemetry: TELEMETRY,
  span: "CreateAgreementRequest",
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
  DescribeAgreementInput & RegionInput,
  DescribeAgreementOutput,
  DescribeAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<DescribeAgreementInput>,
  output: __S(421, __c13, 5) as any as S.Schema<DescribeAgreementOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgreement",
  telemetry: TELEMETRY,
  span: "DescribeAgreement",
}));

export type GetAgreementApprovalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific agreement approval, including its approval levels, the approvers at each level, and the decision of each approver. The acceptor, or the management account or a delegated administrator of the acceptor's AWS organization, can call this operation.
 */
export const getAgreementApproval: API.OperationMethod<
  GetAgreementApprovalInput & RegionInput,
  GetAgreementApprovalOutput,
  GetAgreementApprovalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<GetAgreementApprovalInput>,
  output: __S(561, __c17, 17) as any as S.Schema<GetAgreementApprovalOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementApproval",
  telemetry: TELEMETRY,
  span: "GetAgreementApproval",
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
  GetAgreementCancellationRequestInput & RegionInput,
  GetAgreementCancellationRequestOutput,
  GetAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<GetAgreementCancellationRequestInput>,
  output: __S(160, __c5, 0) as any as S.Schema<GetAgreementCancellationRequestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementCancellationRequest",
  telemetry: TELEMETRY,
  span: "GetAgreementCancellationRequest",
}));

export type GetAgreementContactsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains details about the acceptor's contact information for an active agreement that you participate in as the proposer, acceptor, or manufacturer.
 *
 * If the acceptor's contact information isn't available, the operation succeeds but doesn't return `acceptorContact`. This happens when the acceptor didn't provide it, the information was removed, or the agreement isn't active.
 */
export const getAgreementContacts: API.OperationMethod<
  GetAgreementContactsInput & RegionInput,
  GetAgreementContactsOutput,
  GetAgreementContactsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<GetAgreementContactsInput>,
  output: __S(673, __c21, 1) as any as S.Schema<GetAgreementContactsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementContacts",
  telemetry: TELEMETRY,
  span: "GetAgreementContacts",
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
  GetAgreementEntitlementsInput & RegionInput,
  GetAgreementEntitlementsOutput,
  GetAgreementEntitlementsError,
  Credentials | HttpClient.HttpClient,
  AgreementEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<GetAgreementEntitlementsInput>,
  output: __S(707, __c22, 3) as any as S.Schema<GetAgreementEntitlementsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementEntitlements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementEntitlements",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetAgreementEntitlements",
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
  GetAgreementPaymentRequestInput & RegionInput,
  GetAgreementPaymentRequestOutput,
  GetAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<GetAgreementPaymentRequestInput>,
  output: __S(737, __c23, 1) as any as S.Schema<GetAgreementPaymentRequestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementPaymentRequest",
  telemetry: TELEMETRY,
  span: "GetAgreementPaymentRequest",
}));

export type GetAgreementRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific agreement request, including its status, intent, approval requirement, and charges. The acceptor, or the management account or a delegated administrator of the acceptor's AWS organization, can call this operation.
 */
export const getAgreementRequest: API.OperationMethod<
  GetAgreementRequestInput & RegionInput,
  GetAgreementRequestOutput,
  GetAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<GetAgreementRequestInput>,
  output: __S(769, __c24, 1) as any as S.Schema<GetAgreementRequestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementRequest",
  telemetry: TELEMETRY,
  span: "GetAgreementRequest",
}));

export type GetAgreementRequestApprovalPlansError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the approval plans that apply to an agreement request. Only the acceptor of the agreement request can call this operation. Each approval plan lists its approval levels and the approvers at each level. Pass the `planReference` of an approval plan to `StartAgreementApprovals` to start an agreement approval for it.
 */
export const getAgreementRequestApprovalPlans: API.PaginatedOperationMethod<
  GetAgreementRequestApprovalPlansInput & RegionInput,
  GetAgreementRequestApprovalPlansOutput,
  GetAgreementRequestApprovalPlansError,
  Credentials | HttpClient.HttpClient,
  AgreementApprovalPlan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<GetAgreementRequestApprovalPlansInput>,
  output: __S(813, __c25, 13) as any as S.Schema<GetAgreementRequestApprovalPlansOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementRequestApprovalPlans",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetAgreementRequestApprovalPlans",
})) as any;

export type GetAgreementRequestTermsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the terms proposed for an agreement request, such as pricing, legal, and renewal terms. The acceptor, or the management account or a delegated administrator of the acceptor's AWS organization, can call this operation. This operation is similar to `GetAgreementTerms`, but it takes an `agreementRequestId` instead of an `agreementId`.
 */
export const getAgreementRequestTerms: API.PaginatedOperationMethod<
  GetAgreementRequestTermsInput & RegionInput,
  GetAgreementRequestTermsOutput,
  GetAgreementRequestTermsError,
  Credentials | HttpClient.HttpClient,
  AgreementRequestTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<GetAgreementRequestTermsInput>,
  output: __S(833, __c26, 1) as any as S.Schema<GetAgreementRequestTermsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementRequestTerms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "terms",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetAgreementRequestTerms",
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
 * - `TermType` - The type of term, such as `LegalTerm`, `RenewalTerm`, or `ConfigurableUpfrontPricingTerm`.
 *
 * - `TermID` - The ID of the particular term, which is common between offer and agreement.
 *
 * - `TermPayload` - The key information contained in the term, such as the EULA for `LegalTerm` or pricing and dimensions for various pricing terms, such as `ConfigurableUpfrontPricingTerm` or `UsageBasedPricingTerm`.
 *
 * - `Configuration` - The buyer/acceptor's selection at the time of agreement creation, such as the number of units purchased for a dimension or setting the `EnableAutoRenew` flag.
 */
export const getAgreementTerms: API.PaginatedOperationMethod<
  GetAgreementTermsInput & RegionInput,
  GetAgreementTermsOutput,
  GetAgreementTermsError,
  Credentials | HttpClient.HttpClient,
  AcceptedTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<GetAgreementTermsInput>,
  output: __S(929, __c29, 1) as any as S.Schema<GetAgreementTermsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementTerms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "acceptedTerms",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetAgreementTerms",
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
  GetBillingAdjustmentRequestInput & RegionInput,
  GetBillingAdjustmentRequestOutput,
  GetBillingAdjustmentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<GetBillingAdjustmentRequestInput>,
  output: __S(961, __c30, 1) as any as S.Schema<GetBillingAdjustmentRequestOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingAdjustmentRequest",
  telemetry: TELEMETRY,
  span: "GetBillingAdjustmentRequest",
}));

export type ListAgreementApprovalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists agreement approvals available to you as a buyer. Use `REQUESTER` as the `partyType` to list the agreement approvals that your account started. Use `AWS_ORGANIZATION_ADMIN` to list the agreement approvals in your AWS organization, if your account is the management account or a delegated administrator of the organization. You can filter the results by agreement request, approval type, and status.
 */
export const listAgreementApprovals: API.PaginatedOperationMethod<
  ListAgreementApprovalsInput & RegionInput,
  ListAgreementApprovalsOutput,
  ListAgreementApprovalsError,
  Credentials | HttpClient.HttpClient,
  AgreementApprovalSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<ListAgreementApprovalsInput>,
  output: __S(993, __c31, 1) as any as S.Schema<ListAgreementApprovalsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementApprovals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAgreementApprovals",
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
  ListAgreementCancellationRequestsInput & RegionInput,
  ListAgreementCancellationRequestsOutput,
  ListAgreementCancellationRequestsError,
  Credentials | HttpClient.HttpClient,
  AgreementCancellationRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<ListAgreementCancellationRequestsInput>,
  output: __S(1059, __c33, 3) as any as S.Schema<ListAgreementCancellationRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementCancellationRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAgreementCancellationRequests",
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
  ListAgreementChargesInput & RegionInput,
  ListAgreementChargesOutput,
  ListAgreementChargesError,
  Credentials | HttpClient.HttpClient,
  Charge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<ListAgreementChargesInput>,
  output: __S(1091, __c34, 3) as any as S.Schema<ListAgreementChargesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementCharges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAgreementCharges",
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
  ListAgreementInvoiceLineItemsInput & RegionInput,
  ListAgreementInvoiceLineItemsOutput,
  ListAgreementInvoiceLineItemsError,
  Credentials | HttpClient.HttpClient,
  AgreementInvoiceLineItemGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1121, __c35, 1) as any as S.Schema<ListAgreementInvoiceLineItemsInput>,
  output: __S(1125, __c35, 5) as any as S.Schema<ListAgreementInvoiceLineItemsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementInvoiceLineItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementInvoiceLineItemGroupSummaries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAgreementInvoiceLineItems",
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
  ListAgreementPaymentRequestsInput & RegionInput,
  ListAgreementPaymentRequestsOutput,
  ListAgreementPaymentRequestsError,
  Credentials | HttpClient.HttpClient,
  PaymentRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<ListAgreementPaymentRequestsInput>,
  output: __S(1155, __c36, 3) as any as S.Schema<ListAgreementPaymentRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementPaymentRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAgreementPaymentRequests",
})) as any;

export type ListAgreementRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists agreement requests available to you as a buyer (acceptor). You can filter the results by `catalog`, `status`, and `resourceId`.
 */
export const listAgreementRequests: API.PaginatedOperationMethod<
  ListAgreementRequestsInput & RegionInput,
  ListAgreementRequestsOutput,
  ListAgreementRequestsError,
  Credentials | HttpClient.HttpClient,
  AgreementRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<ListAgreementRequestsInput>,
  output: __S(1187, __c37, 3) as any as S.Schema<ListAgreementRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAgreementRequests",
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
  ListBillingAdjustmentRequestsInput & RegionInput,
  ListBillingAdjustmentRequestsOutput,
  ListBillingAdjustmentRequestsError,
  Credentials | HttpClient.HttpClient,
  BillingAdjustmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<ListBillingAdjustmentRequestsInput>,
  output: __S(1219, __c38, 3) as any as S.Schema<ListBillingAdjustmentRequestsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingAdjustmentRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListBillingAdjustmentRequests",
})) as any;

export type RejectAgreementApprovalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows the management account or a delegated administrator of the buyer's AWS organization to reject an agreement approval that is in `PENDING_APPROVAL` status, as the organization administrator approver or on behalf of another approver. Once rejected, the agreement approval and its agreement request transition to `REJECTED` status. You must provide a reason for the rejection.
 */
export const rejectAgreementApproval: API.OperationMethod<
  RejectAgreementApprovalInput & RegionInput,
  RejectAgreementApprovalOutput,
  RejectAgreementApprovalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1249, __c39, 1) as any as S.Schema<RejectAgreementApprovalInput>,
  output: __S(1568, __c49, 0) as any as S.Schema<RejectAgreementApprovalOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAgreementApproval",
  telemetry: TELEMETRY,
  span: "RejectAgreementApproval",
}));

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
  RejectAgreementCancellationRequestInput & RegionInput,
  RejectAgreementCancellationRequestOutput,
  RejectAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<RejectAgreementCancellationRequestInput>,
  output: __S(1281, __c40, 1) as any as S.Schema<RejectAgreementCancellationRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAgreementCancellationRequest",
  telemetry: TELEMETRY,
  span: "RejectAgreementCancellationRequest",
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
  RejectAgreementPaymentRequestInput & RegionInput,
  RejectAgreementPaymentRequestOutput,
  RejectAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<RejectAgreementPaymentRequestInput>,
  output: __S(1313, __c41, 1) as any as S.Schema<RejectAgreementPaymentRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAgreementPaymentRequest",
  telemetry: TELEMETRY,
  span: "RejectAgreementPaymentRequest",
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
  SearchAgreementsInput & RegionInput,
  SearchAgreementsOutput,
  SearchAgreementsError,
  Credentials | HttpClient.HttpClient,
  AgreementViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1348, __c42, 4) as any as S.Schema<SearchAgreementsInput>,
  output: __S(1354, __c42, 10) as any as S.Schema<SearchAgreementsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAgreements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementViewSummaries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchAgreements",
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
  SendAgreementCancellationRequestInput & RegionInput,
  SendAgreementCancellationRequestOutput,
  SendAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<SendAgreementCancellationRequestInput>,
  output: __S(1664, __c52, 0) as any as S.Schema<SendAgreementCancellationRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAgreementCancellationRequest",
  telemetry: TELEMETRY,
  span: "SendAgreementCancellationRequest",
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
  SendAgreementPaymentRequestInput & RegionInput,
  SendAgreementPaymentRequestOutput,
  SendAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<SendAgreementPaymentRequestInput>,
  output: __S(1409, __c44, 1) as any as S.Schema<SendAgreementPaymentRequestOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAgreementPaymentRequest",
  telemetry: TELEMETRY,
  span: "SendAgreementPaymentRequest",
}));

export type StartAgreementApprovalsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to start the approvals that their organization requires for an agreement request. You start one agreement approval for each approval plan that you specify. Use `GetAgreementRequestApprovalPlans` to retrieve the approval plans of the agreement request. Once the agreement approvals start, the agreement request transitions to `PENDING_APPROVAL` status.
 */
export const startAgreementApprovals: API.OperationMethod<
  StartAgreementApprovalsInput & RegionInput,
  StartAgreementApprovalsOutput,
  StartAgreementApprovalsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1442, __c45, 2) as any as S.Schema<StartAgreementApprovalsInput>,
  output: __S(1443, __c45, 3) as any as S.Schema<StartAgreementApprovalsOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAgreementApprovals",
  telemetry: TELEMETRY,
  span: "StartAgreementApprovals",
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
  UpdatePurchaseOrdersInput & RegionInput,
  UpdatePurchaseOrdersOutput,
  UpdatePurchaseOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<UpdatePurchaseOrdersInput>,
  output: __S(1568, __c49, 0) as any as S.Schema<UpdatePurchaseOrdersOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePurchaseOrders",
  telemetry: TELEMETRY,
  span: "UpdatePurchaseOrders",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.String,
          purchaseOrders: S.optional(__S(33, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AcceptAgreementRequestInput" });
    case 1:
      return S.suspend(() => S.Struct({ agreementId: S.optional(S.String) })).annotate({
        identifier: "AcceptAgreementRequestOutput",
      });
  }
}
function __c1(j: number): any {
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
      return S.Array(__S(32, __c1, 0));
  }
}
function __c2(j: number): any {
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
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ billingAdjustmentRequestEntries: __S(65, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentRequestInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({ billingAdjustmentRequestId: S.String, clientToken: S.String }),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentItem" });
    case 4:
      return S.Array(__S(67, __c2, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ code: S.String, message: S.String, clientToken: S.String }),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentError" });
    case 6:
      return S.Array(__S(69, __c2, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ items: __S(68, __c2, 4), errors: __S(70, __c2, 6) }),
      ).annotate({ identifier: "BatchCreateBillingAdjustmentRequestOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelAgreementInput" });
  }
}
function __c4(j: number): any {
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
function __c5(j: number): any {
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
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ paymentRequestId: S.String, agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelAgreementPaymentRequestInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelAgreementRequestInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ configurableUpfrontPricingTermConfiguration: __S(386, __c12, 2) }),
        /*@__PURE__*/ S.Struct({ renewalTermConfiguration: __S(387, __c12, 3) }),
        /*@__PURE__*/ S.Struct({ variablePaymentTermConfiguration: __S(388, __c12, 4) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ id: S.String, configuration: S.optional(__S(256, __c8, 0)) }),
      ).annotate({ identifier: "RequestedTerm" });
    case 2:
      return S.Array(__S(257, __c8, 1));
    case 3:
      return S.suspend(() => S.Struct({ taxEstimation: S.optional(S.String) })).annotate({
        identifier: "TaxConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          intent: S.String,
          requestedTerms: __S(258, __c8, 2),
          sourceAgreementIdentifier: S.optional(S.String),
          agreementProposalIdentifier: S.optional(S.String),
          taxConfiguration: S.optional(__S(259, __c8, 3)),
          acceptorContact: S.optional(__S(288, __c9, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAgreementRequestInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.optional(S.String),
          agreementType: S.optional(S.String),
          chargeSummary: S.optional(__S(327, __c10, 7)),
          status: S.optional(S.String),
          approvalRequirement: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CreateAgreementRequestOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          firstName: SensitiveString,
          lastName: SensitiveString,
          emailAddress: SensitiveString,
          companyName: SensitiveString,
          countryCode: S.String,
        }),
      ).annotate({ identifier: "AcceptorContact" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          amount: S.optional(S.String),
          rate: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "TaxBreakdownItem" });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ breakdown: S.optional(__S(321, __c10, 1)), totalAmount: S.optional(S.String) }),
      ).annotate({ identifier: "EstimatedTaxes" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          amount: S.optional(S.String),
          amountAfterTax: S.optional(S.String),
          timing: S.optional(S.String),
          estimatedTaxes: S.optional(__S(322, __c10, 2)),
          purchaseOrderReference: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExpectedCharge" });
    case 4:
      return S.Array(__S(323, __c10, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          dimensionKey: S.optional(S.String),
          newQuantity: S.optional(S.Number),
          oldQuantity: S.optional(S.Number),
          chargeReference: S.optional(S.String),
          incrementalChargeAmount: S.optional(S.String),
        }),
      ).annotate({ identifier: "ItemizedCharge" });
    case 6:
      return S.Array(__S(325, __c10, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          currencyCode: S.optional(S.String),
          newAgreementValue: S.optional(S.String),
          newAgreementValueAfterTax: S.optional(S.String),
          expectedCharges: S.optional(__S(324, __c10, 4)),
          estimatedTaxes: S.optional(__S(322, __c10, 2)),
          itemizedCharges: S.optional(__S(326, __c10, 6)),
          invoicingEntity: S.optional(__S(352, __c11, 0)),
        }),
      ).annotate({ identifier: "ChargeSummary" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ legalName: S.optional(S.String), branchName: S.optional(S.String) }),
      ).annotate({ identifier: "InvoicingEntity" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dimensionKey: S.String, dimensionValue: S.Number }),
      ).annotate({ identifier: "Dimension" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ selectorValue: S.String, dimensions: __S(385, __c12, 1) }),
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
function __c13(j: number): any {
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
          renewalSummary: S.optional(__S(418, __c13, 2)),
        }),
      ).annotate({ identifier: "EndTimeBehavior" });
    case 4:
      return S.suspend(() =>
        S.Struct({ trialEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))) }),
      ).annotate({ identifier: "FreeTrialSummary" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          acceptor: S.optional(__S(512, __c16, 0)),
          proposer: S.optional(__S(512, __c16, 0)),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          acceptanceTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          agreementType: S.optional(S.String),
          estimatedCharges: S.optional(__S(417, __c13, 1)),
          proposalSummary: S.optional(__S(481, __c15, 1)),
          status: S.optional(S.String),
          initialAgreementId: S.optional(S.String),
          endTimeBehavior: S.optional(__S(419, __c13, 3)),
          freeTrialSummary: S.optional(__S(420, __c13, 4)),
        }),
      ).annotate({ identifier: "DescribeAgreementOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), type: S.optional(S.String) }),
      ).annotate({ identifier: "Resource" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(448, __c14, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({
          resources: S.optional(__S(480, __c15, 0)),
          offerId: S.optional(S.String),
          offerSetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProposalSummary" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ accountId: S.optional(S.String) })).annotate({
        identifier: "Acceptor",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementApprovalId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAgreementApprovalInput" });
    case 1:
      return S.suspend(() => S.Struct({ accountId: S.String })).annotate({
        identifier: "AgreementApprovalRequester",
      });
    case 2:
      return S.suspend(() => S.Struct({ principalArn: S.String })).annotate({
        identifier: "CallerIdentity",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          note: S.optional(SensitiveString),
          status: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          approverOutcomeId: S.optional(S.String),
          emailAddress: SensitiveString,
          name: S.optional(SensitiveString),
          purchaseOrders: S.optional(__S(1601, __c50, 1)),
          overriddenBy: S.optional(__S(546, __c17, 2)),
        }),
      ).annotate({ identifier: "EmailApproverOutcome" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          note: S.optional(SensitiveString),
          status: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          approverOutcomeId: S.optional(S.String),
          name: SensitiveString,
          purchaseOrders: S.optional(__S(1601, __c50, 1)),
          overriddenBy: S.optional(__S(546, __c17, 2)),
        }),
      ).annotate({ identifier: "ProcurementToolApproverOutcome" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          note: S.optional(SensitiveString),
          status: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          approverOutcomeId: S.optional(S.String),
          purchaseOrders: S.optional(__S(1601, __c50, 1)),
        }),
      ).annotate({ identifier: "AwsOrganizationApproverOutcome" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ emailApproverOutcome: __S(547, __c17, 3) }),
        /*@__PURE__*/ S.Struct({ procurementToolApproverOutcome: __S(548, __c17, 4) }),
        /*@__PURE__*/ S.Struct({ awsOrganizationApproverOutcome: __S(549, __c17, 5) }),
      ]);
    case 7:
      return S.Array(__S(550, __c17, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ approvalCriteria: __S(576, __c18, 0), approvers: __S(551, __c17, 7) }),
      ).annotate({ identifier: "BuyerAgreementApprovalGroup" });
    case 9:
      return S.Array(__S(552, __c17, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), groups: __S(553, __c17, 9) }),
      ).annotate({ identifier: "BuyerAgreementApprovalLevel" });
    case 11:
      return S.Array(__S(554, __c17, 10));
    case 12:
      return S.suspend(() => S.Struct({ accountId: S.String, legalName: S.String })).annotate({
        identifier: "AgreementApprovalProposer",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          name: S.String,
          deployedOnAws: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgreementApprovalResource" });
    case 14:
      return S.Array(__S(557, __c17, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          offerId: S.String,
          offerSetId: S.optional(S.String),
          resources: S.optional(__S(558, __c17, 14)),
          visibilityScope: S.String,
        }),
      ).annotate({ identifier: "AgreementApprovalProposalSummary" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          approvalType: S.String,
          agreementApprovalId: S.String,
          name: S.String,
          agreementRequestId: S.String,
          status: S.String,
          requester: __S(545, __c17, 1),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          approvalNeededBy: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          levels: __S(555, __c17, 11),
          planInput: __S(608, __c19, 0),
          proposer: __S(556, __c17, 12),
          proposalSummary: __S(559, __c17, 15),
        }),
      ).annotate({ identifier: "BuyerAgreementApproval" });
    case 17:
      return S.suspend(() =>
        S.Struct({ buyerAgreementApproval: S.optional(__S(560, __c17, 16)) }),
      ).annotate({ identifier: "GetAgreementApprovalOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ requiredApprovalCount: S.Number })).annotate({
        identifier: "BuyerAgreementApprovalCriteria",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ planReference: S.String, requesterNote: S.optional(SensitiveString) }),
      ).annotate({ identifier: "BuyerAgreementApprovalPlanInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementCancellationRequestId: S.String, agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAgreementCancellationRequestInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAgreementContactsInput" });
    case 1:
      return S.suspend(() => S.Struct({ acceptorContact: S.optional(__S(288, __c9, 0)) })).annotate(
        { identifier: "GetAgreementContactsOutput" },
      );
  }
}
function __c22(j: number): any {
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
          resource: S.optional(__S(448, __c14, 0)),
          type: S.optional(S.String),
          registrationToken: S.optional(SensitiveString),
          status: S.optional(S.String),
          statusReasonCode: S.optional(S.String),
          licenseArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgreementEntitlement" });
    case 2:
      return S.Array(__S(705, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          agreementEntitlements: S.optional(__S(706, __c22, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAgreementEntitlementsOutput" });
  }
}
function __c23(j: number): any {
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAgreementRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.optional(S.String),
          agreementType: S.optional(S.String),
          status: S.optional(S.String),
          approvalRequirement: S.optional(S.String),
          agreementId: S.optional(S.String),
          intent: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          chargeSummary: S.optional(__S(327, __c10, 7)),
          proposer: S.optional(__S(512, __c16, 0)),
          proposalSummary: S.optional(__S(481, __c15, 1)),
        }),
      ).annotate({ identifier: "GetAgreementRequestOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAgreementRequestApprovalPlansInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ emailAddress: SensitiveString, name: S.optional(SensitiveString) }),
      ).annotate({ identifier: "EmailApprover" });
    case 2:
      return S.suspend(() => S.Struct({ name: SensitiveString })).annotate({
        identifier: "ProcurementToolApprover",
      });
    case 3:
      return S.suspend(() => S.Struct({ organizationId: S.String })).annotate({
        identifier: "AwsOrganizationAdminApprover",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ emailApprover: __S(801, __c25, 1) }),
        /*@__PURE__*/ S.Struct({ procurementToolApprover: __S(802, __c25, 2) }),
        /*@__PURE__*/ S.Struct({ awsOrganizationAdminApprover: __S(803, __c25, 3) }),
      ]);
    case 5:
      return S.Array(__S(804, __c25, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ approvalCriteria: __S(576, __c18, 0), approvers: __S(805, __c25, 5) }),
      ).annotate({ identifier: "BuyerAgreementApprovalPlanGroup" });
    case 7:
      return S.Array(__S(806, __c25, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), groups: __S(807, __c25, 7) }),
      ).annotate({ identifier: "BuyerAgreementApprovalPlanLevel" });
    case 9:
      return S.Array(__S(808, __c25, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          planReference: S.String,
          name: S.optional(S.String),
          levels: __S(809, __c25, 9),
        }),
      ).annotate({ identifier: "BuyerAgreementApprovalPlan" });
    case 11:
      return S.Union([/*@__PURE__*/ S.Struct({ buyerAgreementApprovalPlan: __S(810, __c25, 10) })]);
    case 12:
      return S.Array(__S(811, __c25, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ items: __S(812, __c25, 12), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAgreementRequestApprovalPlansOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAgreementRequestTermsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ terms: __S(902, __c28, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAgreementRequestTermsOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          url: S.optional(S.String),
          version: S.optional(S.String),
        }),
      ).annotate({ identifier: "DocumentItem" });
    case 1:
      return S.Array(__S(864, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          documents: S.optional(__S(865, __c27, 1)),
        }),
      ).annotate({ identifier: "LegalTerm" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          refundPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "SupportTerm" });
    case 4:
      return S.suspend(() => S.Struct({ value: S.optional(S.String) })).annotate({
        identifier: "FixedPercentage",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          minValue: S.optional(S.String),
          maxValue: S.optional(S.String),
          defaultValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "PercentageRange" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fixedPercentage: __S(868, __c27, 4) }),
        /*@__PURE__*/ S.Struct({ percentageRange: __S(869, __c27, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          chargeDateOffset: S.optional(S.String),
          chargePercentage: S.optional(S.String),
          dayOfMonth: S.optional(S.Number),
        }),
      ).annotate({ identifier: "PaymentScheduleEntry" });
    case 8:
      return S.Array(__S(871, __c27, 7));
    case 9:
      return S.suspend(() => S.Struct({ schedule: S.optional(__S(872, __c27, 8)) })).annotate({
        identifier: "PaymentScheduleTermTemplate",
      });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ paymentScheduleTermTemplate: __S(873, __c27, 9) })]);
    case 11:
      return S.Array(__S(874, __c27, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          configuration: S.optional(__S(387, __c12, 3)),
          lockoutPeriod: S.optional(S.String),
          maxRenewals: S.optional(S.Number),
          adjustmentDeadline: S.optional(S.String),
          priceIncrease: S.optional(__S(870, __c27, 6)),
          termTemplates: S.optional(__S(875, __c27, 11)),
        }),
      ).annotate({ identifier: "RenewalTerm" });
    case 13:
      return S.suspend(() => S.Struct({ region: S.String, price: S.String })).annotate({
        identifier: "RegionalPrice",
      });
    case 14:
      return S.Array(__S(877, __c27, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          dimensionKey: S.optional(S.String),
          price: S.optional(S.String),
          regionalPrices: S.optional(__S(878, __c27, 14)),
        }),
      ).annotate({ identifier: "RateCardItem" });
    case 16:
      return S.Array(__S(879, __c27, 15));
    case 17:
      return S.suspend(() => S.Struct({ rateCard: S.optional(__S(880, __c27, 16)) })).annotate({
        identifier: "UsageBasedRateCardItem",
      });
    case 18:
      return S.Array(__S(881, __c27, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          rateCards: S.optional(__S(882, __c27, 18)),
        }),
      ).annotate({ identifier: "UsageBasedPricingTerm" });
    case 20:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), value: S.optional(S.String) }),
      ).annotate({ identifier: "Selector" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          multipleDimensionSelection: S.optional(S.String),
          quantityConfiguration: S.optional(S.String),
        }),
      ).annotate({ identifier: "Constraints" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          selector: S.optional(__S(884, __c27, 20)),
          constraints: S.optional(__S(885, __c27, 21)),
          rateCard: S.optional(__S(880, __c27, 16)),
        }),
      ).annotate({ identifier: "ConfigurableUpfrontRateCardItem" });
    case 23:
      return S.Array(__S(886, __c27, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          rateCards: S.optional(__S(887, __c27, 23)),
          configuration: S.optional(__S(386, __c12, 2)),
        }),
      ).annotate({ identifier: "ConfigurableUpfrontPricingTerm" });
    case 25:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), id: S.optional(S.String) }),
      ).annotate({ identifier: "ByolPricingTerm" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          billingPeriod: S.optional(S.String),
          price: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecurringPaymentTerm" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          agreementDuration: S.optional(S.String),
          agreementStartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          agreementEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ValidityTerm" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          chargeDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          chargeAmount: S.optional(S.String),
        }),
      ).annotate({ identifier: "ScheduleItem" });
    case 29:
      return S.Array(__S(892, __c27, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          schedule: S.optional(__S(893, __c27, 29)),
        }),
      ).annotate({ identifier: "PaymentScheduleTerm" });
    case 31:
      return S.suspend(() =>
        S.Struct({ dimensionKey: S.optional(S.String), maxQuantity: S.optional(S.Number) }),
      ).annotate({ identifier: "GrantItem" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(895, __c27, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          duration: S.optional(S.String),
          grants: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "FreeTrialPricingTerm" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          duration: S.optional(S.String),
          price: S.optional(S.String),
          grants: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "FixedUpfrontPricingTerm" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          currencyCode: S.optional(S.String),
          maxTotalChargeAmount: S.optional(S.String),
          configuration: S.optional(__S(388, __c12, 4)),
        }),
      ).annotate({ identifier: "VariablePaymentTerm" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          id: S.optional(S.String),
          paymentDuePeriod: S.optional(S.String),
        }),
      ).annotate({ identifier: "NetPaymentTerm" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ legalTerm: __S(866, __c27, 2) }),
        /*@__PURE__*/ S.Struct({ supportTerm: __S(867, __c27, 3) }),
        /*@__PURE__*/ S.Struct({ renewalTerm: __S(876, __c27, 12) }),
        /*@__PURE__*/ S.Struct({ usageBasedPricingTerm: __S(883, __c27, 19) }),
        /*@__PURE__*/ S.Struct({ configurableUpfrontPricingTerm: __S(888, __c27, 24) }),
        /*@__PURE__*/ S.Struct({ byolPricingTerm: __S(889, __c27, 25) }),
        /*@__PURE__*/ S.Struct({ recurringPaymentTerm: __S(890, __c27, 26) }),
        /*@__PURE__*/ S.Struct({ validityTerm: __S(891, __c27, 27) }),
        /*@__PURE__*/ S.Struct({ paymentScheduleTerm: __S(894, __c27, 30) }),
        /*@__PURE__*/ S.Struct({ freeTrialPricingTerm: __S(897, __c28, 1) }),
        /*@__PURE__*/ S.Struct({ fixedUpfrontPricingTerm: __S(898, __c28, 2) }),
        /*@__PURE__*/ S.Struct({ variablePaymentTerm: __S(899, __c28, 3) }),
        /*@__PURE__*/ S.Struct({ netPaymentTerm: __S(900, __c28, 4) }),
      ]);
    case 6:
      return S.Array(__S(901, __c28, 5));
  }
}
function __c29(j: number): any {
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
          acceptedTerms: S.optional(__S(902, __c28, 6)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAgreementTermsOutput" });
  }
}
function __c30(j: number): any {
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
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.optional(S.String),
          partyType: S.String,
          agreementRequestId: S.optional(S.String),
          approvalType: S.optional(S.String),
          status: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAgreementApprovalsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ items: __S(1025, __c32, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgreementApprovalsOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          approvalType: S.String,
          agreementRequestId: S.String,
          agreementApprovalId: S.String,
          name: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          approvalNeededBy: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AgreementApprovalSummary" });
    case 1:
      return S.Array(__S(1024, __c32, 0));
  }
}
function __c33(j: number): any {
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
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: S.optional(__S(1058, __c33, 2)) }),
      ).annotate({ identifier: "ListAgreementCancellationRequestsOutput" });
  }
}
function __c34(j: number): any {
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
      return S.Array(__S(1089, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1090, __c34, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgreementChargesOutput" });
  }
}
function __c35(j: number): any {
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
          invoiceBillingPeriod: S.optional(__S(1120, __c35, 0)),
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
          pricingCurrencyAmount: S.optional(__S(1122, __c35, 2)),
          invoiceBillingPeriod: S.optional(__S(1120, __c35, 0)),
          issuedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          invoiceType: S.optional(S.String),
          invoicingEntity: S.optional(__S(352, __c11, 0)),
        }),
      ).annotate({ identifier: "AgreementInvoiceLineItemGroupSummary" });
    case 4:
      return S.Array(__S(1123, __c35, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          agreementInvoiceLineItemGroupSummaries: S.optional(__S(1124, __c35, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAgreementInvoiceLineItemsOutput" });
  }
}
function __c36(j: number): any {
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
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(1154, __c36, 2) }),
      ).annotate({ identifier: "ListAgreementPaymentRequestsOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          catalog: S.optional(S.String),
          status: S.optional(S.String),
          resourceId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAgreementRequestsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.optional(S.String),
          agreementType: S.optional(S.String),
          status: S.optional(S.String),
          agreementId: S.optional(S.String),
          proposalSummary: S.optional(__S(481, __c15, 1)),
        }),
      ).annotate({ identifier: "AgreementRequestSummary" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(1186, __c37, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgreementRequestsOutput" });
  }
}
function __c38(j: number): any {
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
      return S.Array(__S(1217, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), items: __S(1218, __c38, 2) }),
      ).annotate({ identifier: "ListBillingAdjustmentRequestsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementApprovalId: S.String,
          note: SensitiveString,
          approverOutcomeIdToOverride: S.optional(S.String),
        }),
      ).annotate({ identifier: "BuyerAgreementApprovalRejectionInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ buyerAgreementApprovalRejectionInput: S.optional(__S(1248, __c39, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectAgreementApprovalInput" });
  }
}
function __c40(j: number): any {
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
function __c41(j: number): any {
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
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), values: S.optional(__S(1344, __c42, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sortBy: S.optional(S.String), sortOrder: S.optional(S.String) }),
      ).annotate({ identifier: "Sort" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          catalog: S.optional(S.String),
          filters: S.optional(__S(1346, __c42, 2)),
          sort: S.optional(__S(1347, __c42, 3)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchAgreementsInput" });
    case 5:
      return S.suspend(() => S.Struct({ licenseArn: S.optional(S.String) })).annotate({
        identifier: "Entitlement",
      });
    case 6:
      return S.Array(__S(1349, __c42, 5));
    case 7:
      return S.Array(S.String);
    case 8:
      return S.suspend(() =>
        S.Struct({
          agreementId: S.optional(S.String),
          acceptanceTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          agreementType: S.optional(S.String),
          acceptor: S.optional(__S(512, __c16, 0)),
          proposer: S.optional(__S(512, __c16, 0)),
          proposalSummary: S.optional(__S(481, __c15, 1)),
          status: S.optional(S.String),
          entitlements: S.optional(__S(1350, __c42, 6)),
          initialAgreementId: S.optional(S.String),
          endTimeBehaviorType: S.optional(S.String),
          endTimeBehaviorReasonCode: S.optional(S.String),
          freeTrialEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          includesContactOfType: S.optional(__S(1351, __c42, 7)),
        }),
      ).annotate({ identifier: "AgreementViewSummary" });
    case 9:
      return S.Array(__S(1352, __c42, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          agreementViewSummaries: S.optional(__S(1353, __c42, 9)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "SearchAgreementsOutput" });
  }
}
function __c43(j: number): any {
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
function __c44(j: number): any {
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
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ buyerAgreementApprovalPlanInput: __S(608, __c19, 0) }),
      ]);
    case 1:
      return S.Array(__S(1440, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          agreementRequestId: S.String,
          planInputs: __S(1441, __c45, 1),
          purchaseOrders: S.optional(__S(1601, __c50, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartAgreementApprovalsInput" });
    case 3:
      return S.suspend(() => S.Struct({ approvalSummaries: __S(1025, __c32, 1) })).annotate({
        identifier: "StartAgreementApprovalsOutput",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ purchaseOrders: __S(33, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePurchaseOrdersInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(1504, __c47, 0));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agreementApprovalId: S.String,
          purchaseOrders: S.optional(__S(1601, __c50, 1)),
          note: S.optional(SensitiveString),
          approverOutcomeIdToOverride: S.optional(S.String),
        }),
      ).annotate({ identifier: "BuyerAgreementApprovalApproverInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ buyerAgreementApprovalApproverInput: S.optional(__S(1536, __c48, 0)) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptAgreementApprovalInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AcceptAgreementApprovalOutput",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ chargeId: S.String, purchaseOrderReference: S.optional(S.String) }),
      ).annotate({ identifier: "AgreementApprovalPurchaseOrder" });
    case 1:
      return S.Array(__S(1600, __c50, 0));
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agreementId: S.String, agreementCancellationRequestId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptAgreementCancellationRequestInput" });
  }
}
function __c52(j: number): any {
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
function __c53(j: number): any {
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
function __c54(j: number): any {
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
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
