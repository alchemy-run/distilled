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
  sdkId: "Invoicing",
  target: "Invoicing",
  version: "2024-12-01",
  sigv4: "invoicing",
  protocol: awsJson1_0Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://invoicing-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return e(
            `https://invoicing.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
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
    code: "InvoicingAccessDenied",
    status: 403,
  })<{ readonly message?: string; readonly resourceName?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    code: "InvoicingConflict",
    status: 409,
  })<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    {
      code: "InvoicingInternalServer",
      status: 500,
      headers: { retryAfterSeconds: ["Retry-After", "num"] },
    },
  )<{ readonly retryAfterSeconds?: number; readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { code: "InvoicingResourceNotFound", status: 404 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { code: "InvoicingServiceQuotaExceeded", status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { code: "InvoicingThrottling", status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { code: "InvoicingValidation", status: 400 },
  )<{
    readonly message?: string;
    readonly resourceName?: string;
    readonly reason?: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type AccountIdString = string;
export type AccountIdList = string[];
export interface BatchGetInvoiceProfileRequest {
  AccountIds: string[];
}
export type BasicStringWithoutSpace = string;
export type BasicString = string;
export interface ReceiverAddress {
  AddressLine1?: string;
  AddressLine2?: string;
  AddressLine3?: string;
  DistrictOrCounty?: string;
  City?: string;
  StateOrRegion?: string;
  CountryCode?: string;
  CompanyName?: string;
  PostalCode?: string;
}
export type SensitiveBasicStringWithoutSpace =
  | string
  | redacted.Redacted<string>;
export interface InvoiceProfile {
  AccountId?: string;
  ReceiverName?: string;
  ReceiverAddress?: ReceiverAddress;
  ReceiverEmail?: string | redacted.Redacted<string>;
  Issuer?: string;
  TaxRegistrationNumber?: string | redacted.Redacted<string>;
}
export type ProfileList = InvoiceProfile[];
export interface BatchGetInvoiceProfileResponse {
  Profiles?: InvoiceProfile[];
}
export type InvoiceUnitName = string;
export type DescriptionString = string;
export type TaxInheritanceDisabledFlag = boolean;
export type RuleAccountIdList = string[];
export interface InvoiceUnitRule {
  LinkedAccounts?: string[];
  BillSourceAccounts?: string[];
}
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value: string;
}
export type ResourceTagList = ResourceTag[];
export interface CreateInvoiceUnitRequest {
  Name: string;
  InvoiceReceiver: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule: InvoiceUnitRule;
  ResourceTags?: ResourceTag[];
  ClientToken?: string;
}
export type InvoiceUnitArnString = string;
export interface CreateInvoiceUnitResponse {
  InvoiceUnitArn?: string;
}
export type ProcurementPortalName =
  | "SAP_BUSINESS_NETWORK"
  | "COUPA"
  | (string & {});
export type BuyerDomain = "NetworkID" | (string & {});
export type SupplierDomain = "NetworkID" | (string & {});
export type InvoiceUnitArns = string[];
export type SellerOfRecords = string[];
export interface ProcurementPortalPreferenceSelector {
  InvoiceUnitArns?: string[];
  SellerOfRecords?: string[];
}
export interface TestEnvPreferenceInput {
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  ProcurementPortalSharedSecret?: string;
  ProcurementPortalInstanceEndpoint?: string;
}
export type EinvoiceDeliveryDocumentType =
  | "AWS_CLOUD_INVOICE"
  | "AWS_CLOUD_CREDIT_MEMO"
  | "AWS_MARKETPLACE_INVOICE"
  | "AWS_MARKETPLACE_CREDIT_MEMO"
  | "AWS_REQUEST_FOR_PAYMENT"
  | (string & {});
export type EinvoiceDeliveryDocumentTypes = EinvoiceDeliveryDocumentType[];
export type EinvoiceDeliveryAttachmentType =
  | "INVOICE_PDF"
  | "RFP_PDF"
  | (string & {});
export type EinvoiceDeliveryAttachmentTypes = EinvoiceDeliveryAttachmentType[];
export type Protocol = "CXML" | (string & {});
export type PurchaseOrderDataSourceType =
  | "ASSOCIATED_PURCHASE_ORDER_REQUIRED"
  | "PURCHASE_ORDER_NOT_REQUIRED"
  | (string & {});
export interface PurchaseOrderDataSource {
  EinvoiceDeliveryDocumentType?: EinvoiceDeliveryDocumentType;
  PurchaseOrderDataSourceType?: PurchaseOrderDataSourceType;
}
export type PurchaseOrderDataSources = PurchaseOrderDataSource[];
export type ConnectionTestingMethod =
  | "PROD_ENV_DOLLAR_TEST"
  | "TEST_ENV_REPLAY_TEST"
  | (string & {});
export interface EinvoiceDeliveryPreference {
  EinvoiceDeliveryDocumentTypes: EinvoiceDeliveryDocumentType[];
  EinvoiceDeliveryAttachmentTypes?: EinvoiceDeliveryAttachmentType[];
  Protocol: Protocol;
  PurchaseOrderDataSources: PurchaseOrderDataSource[];
  ConnectionTestingMethod: ConnectionTestingMethod;
  EinvoiceDeliveryActivationDate: Date;
}
export type EmailString = string;
export interface Contact {
  Name?: string;
  Email?: string;
}
export type Contacts = Contact[];
export interface CreateProcurementPortalPreferenceRequest {
  ProcurementPortalName: ProcurementPortalName;
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  Selector?: ProcurementPortalPreferenceSelector;
  ProcurementPortalSharedSecret?: string | redacted.Redacted<string>;
  ProcurementPortalInstanceEndpoint?: string;
  TestEnvPreference?: TestEnvPreferenceInput;
  EinvoiceDeliveryEnabled: boolean;
  EinvoiceDeliveryPreference?: EinvoiceDeliveryPreference;
  PurchaseOrderRetrievalEnabled: boolean;
  Contacts: Contact[];
  ResourceTags?: ResourceTag[];
  ClientToken?: string;
}
export type ProcurementPortalPreferenceArnString = string;
export interface CreateProcurementPortalPreferenceResponse {
  ProcurementPortalPreferenceArn: string;
}
export interface DeleteInvoiceUnitRequest {
  InvoiceUnitArn: string;
  ClientToken?: string;
}
export interface DeleteInvoiceUnitResponse {
  InvoiceUnitArn?: string;
}
export interface DeleteProcurementPortalPreferenceRequest {
  ProcurementPortalPreferenceArn: string;
  ClientToken?: string;
}
export interface DeleteProcurementPortalPreferenceResponse {
  ProcurementPortalPreferenceArn: string;
}
export type StringWithoutNewLine = string;
export interface GetInvoicePDFRequest {
  InvoiceId: string;
}
export type SupplementalDocumentType =
  | "GOVERNMENT_INVOICE"
  | "TAX_E_INVOICE"
  | "PAYMENT_RECEIPT"
  | "SUPPLEMENT"
  | (string & {});
export interface SupplementalDocument {
  DocumentType?: SupplementalDocumentType;
  DocumentId?: string;
  DocumentUrl?: string;
  DocumentUrlExpirationDate?: Date;
}
export type SupplementalDocuments = SupplementalDocument[];
export interface InvoicePDF {
  InvoiceId?: string;
  DocumentUrl?: string;
  DocumentUrlExpirationDate?: Date;
  SupplementalDocuments?: SupplementalDocument[];
}
export interface GetInvoicePDFResponse {
  InvoicePDF?: InvoicePDF;
}
export type AsOfTimestamp = Date;
export interface GetInvoiceUnitRequest {
  InvoiceUnitArn: string;
  AsOf?: Date;
}
export type LastModifiedTimestamp = Date;
export interface GetInvoiceUnitResponse {
  InvoiceUnitArn?: string;
  InvoiceReceiver?: string;
  Name?: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule?: InvoiceUnitRule;
  LastModified?: Date;
}
export interface GetProcurementPortalPreferenceRequest {
  ProcurementPortalPreferenceArn: string;
}
export interface TestEnvPreference {
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  ProcurementPortalSharedSecret?: string;
  ProcurementPortalInstanceEndpoint?: string;
  PurchaseOrderRetrievalEndpoint?: string;
}
export type ProcurementPortalPreferenceStatus =
  | "PENDING_VERIFICATION"
  | "VALIDATED"
  | "TEST_INITIALIZED"
  | "TEST_INITIALIZATION_FAILED"
  | "TEST_FAILED"
  | "ACTIVE"
  | "SUSPENDED"
  | (string & {});
export interface ProcurementPortalPreference {
  AwsAccountId: string;
  ProcurementPortalPreferenceArn: string;
  ProcurementPortalName: ProcurementPortalName;
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  Selector?: ProcurementPortalPreferenceSelector;
  ProcurementPortalSharedSecret?: string;
  ProcurementPortalInstanceEndpoint?: string;
  PurchaseOrderRetrievalEndpoint?: string;
  TestEnvPreference?: TestEnvPreference;
  EinvoiceDeliveryEnabled: boolean;
  EinvoiceDeliveryPreference?: EinvoiceDeliveryPreference;
  PurchaseOrderRetrievalEnabled: boolean;
  Contacts?: Contact[];
  EinvoiceDeliveryPreferenceStatus?: ProcurementPortalPreferenceStatus;
  EinvoiceDeliveryPreferenceStatusReason?: string;
  PurchaseOrderRetrievalPreferenceStatus?: ProcurementPortalPreferenceStatus;
  PurchaseOrderRetrievalPreferenceStatusReason?: string;
  Version: number;
  CreateDate: Date;
  LastUpdateDate: Date;
}
export interface GetProcurementPortalPreferenceResponse {
  ProcurementPortalPreference: ProcurementPortalPreference;
}
export type ListInvoiceSummariesResourceType =
  | "ACCOUNT_ID"
  | "INVOICE_ID"
  | (string & {});
export interface InvoiceSummariesSelector {
  ResourceType: ListInvoiceSummariesResourceType;
  Value: string;
}
export interface DateInterval {
  StartDate: Date;
  EndDate: Date;
}
export type Month = number;
export type Year = number;
export interface BillingPeriod {
  Month: number;
  Year: number;
}
export type ReceiverRole = "SELLER" | "RESELLER" | "BUYER" | (string & {});
export interface InvoiceSummariesFilter {
  TimeInterval?: DateInterval;
  BillingPeriod?: BillingPeriod;
  InvoicingEntity?: string;
  ReceiverRole?: ReceiverRole;
}
export type NextTokenString = string;
export type InvoiceSummariesMaxResults = number;
export interface ListInvoiceSummariesRequest {
  Selector: InvoiceSummariesSelector;
  Filter?: InvoiceSummariesFilter;
  NextToken?: string;
  MaxResults?: number;
}
export type BillSourceAccountList = string[];
export type BillingEntity = "AWS" | "AWS_MARKETPLACE" | (string & {});
export interface Entity {
  InvoicingEntity?: string;
  BillingEntity?: BillingEntity;
}
export type InvoiceFrequency = "ONE_TIME" | "RECURRING" | (string & {});
export type BillType = "ANNIVERSARY" | "PURCHASE" | "REFUND" | (string & {});
export type InvoiceType =
  | "INVOICE"
  | "CREDIT_MEMO"
  | "PAYMENT_RECEIPT"
  | (string & {});
export type EinvoiceDeliveryStatus =
  | "DELIVERED"
  | "NOT_DELIVERED"
  | (string & {});
export type TaxAuthorityStatus = "ISSUED" | "CANCELLED" | (string & {});
export type CurrencyCode = string;
export interface DiscountsBreakdownAmount {
  Description?: string;
  Amount?: string;
  Rate?: string;
}
export type DiscountsBreakdownAmountList = DiscountsBreakdownAmount[];
export interface DiscountsBreakdown {
  Breakdown?: DiscountsBreakdownAmount[];
  TotalAmount?: string;
}
export interface TaxesBreakdownAmount {
  Description?: string;
  Amount?: string;
  Rate?: string;
}
export type TaxesBreakdownAmountList = TaxesBreakdownAmount[];
export interface TaxesBreakdown {
  Breakdown?: TaxesBreakdownAmount[];
  TotalAmount?: string;
}
export interface FeesBreakdownAmount {
  Description?: string;
  Amount?: string;
  Rate?: string;
}
export type FeesBreakdownAmountList = FeesBreakdownAmount[];
export interface FeesBreakdown {
  Breakdown?: FeesBreakdownAmount[];
  TotalAmount?: string;
}
export interface AmountBreakdown {
  SubTotalAmount?: string;
  Discounts?: DiscountsBreakdown;
  Taxes?: TaxesBreakdown;
  Fees?: FeesBreakdown;
}
export interface CurrencyExchangeDetails {
  SourceCurrencyCode?: string;
  TargetCurrencyCode?: string;
  Rate?: string;
}
export interface InvoiceCurrencyAmount {
  TotalAmount?: string;
  TotalAmountBeforeTax?: string;
  CurrencyCode?: string;
  AmountBreakdown?: AmountBreakdown;
  CurrencyExchangeDetails?: CurrencyExchangeDetails;
}
export interface InvoiceSummary {
  AccountId?: string;
  InvoiceId?: string;
  IssuedDate?: Date;
  DueDate?: Date;
  BillSourceAccounts?: string[];
  BillSourceAccountsTotalCount?: number;
  ReceiverRole?: ReceiverRole;
  Entity?: Entity;
  BillingPeriod?: BillingPeriod;
  InvoiceFrequency?: InvoiceFrequency;
  BillType?: BillType;
  InvoiceType?: InvoiceType;
  CommercialInvoiceId?: string;
  OriginalInvoiceId?: string;
  PurchaseOrderNumber?: string;
  EinvoiceDeliveryStatus?: EinvoiceDeliveryStatus;
  TaxAuthorityStatus?: TaxAuthorityStatus;
  BaseCurrencyAmount?: InvoiceCurrencyAmount;
  TaxCurrencyAmount?: InvoiceCurrencyAmount;
  PaymentCurrencyAmount?: InvoiceCurrencyAmount;
}
export type InvoiceSummaries = InvoiceSummary[];
export interface ListInvoiceSummariesResponse {
  InvoiceSummaries: InvoiceSummary[];
  NextToken?: string;
}
export type InvoiceUnitNames = string[];
export interface Filters {
  Names?: string[];
  InvoiceReceivers?: string[];
  Accounts?: string[];
  BillSourceAccounts?: string[];
}
export type MaxResultsInteger = number;
export interface ListInvoiceUnitsRequest {
  Filters?: Filters;
  NextToken?: string;
  MaxResults?: number;
  AsOf?: Date;
}
export interface InvoiceUnit {
  InvoiceUnitArn?: string;
  InvoiceReceiver?: string;
  Name?: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule?: InvoiceUnitRule;
  LastModified?: Date;
}
export type InvoiceUnits = InvoiceUnit[];
export interface ListInvoiceUnitsResponse {
  InvoiceUnits?: InvoiceUnit[];
  NextToken?: string;
}
export type MaxResults = number;
export interface ListProcurementPortalPreferencesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ProcurementPortalPreferenceSummary {
  AwsAccountId: string;
  ProcurementPortalPreferenceArn: string;
  ProcurementPortalName: ProcurementPortalName;
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  Selector?: ProcurementPortalPreferenceSelector;
  EinvoiceDeliveryEnabled: boolean;
  PurchaseOrderRetrievalEnabled: boolean;
  EinvoiceDeliveryPreferenceStatus?: ProcurementPortalPreferenceStatus;
  EinvoiceDeliveryPreferenceStatusReason?: string;
  PurchaseOrderRetrievalPreferenceStatus?: ProcurementPortalPreferenceStatus;
  PurchaseOrderRetrievalPreferenceStatusReason?: string;
  Version: number;
  CreateDate: Date;
  LastUpdateDate: Date;
}
export type ProcurementPortalPreferenceSummaries =
  ProcurementPortalPreferenceSummary[];
export interface ListProcurementPortalPreferencesResponse {
  ProcurementPortalPreferences?: ProcurementPortalPreferenceSummary[];
  NextToken?: string;
}
export type TagrisArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTag[];
}
export interface PutProcurementPortalPreferenceRequest {
  ProcurementPortalPreferenceArn: string;
  Selector?: ProcurementPortalPreferenceSelector;
  ProcurementPortalSharedSecret?: string | redacted.Redacted<string>;
  ProcurementPortalInstanceEndpoint?: string;
  TestEnvPreference?: TestEnvPreferenceInput;
  EinvoiceDeliveryEnabled: boolean;
  EinvoiceDeliveryPreference?: EinvoiceDeliveryPreference;
  PurchaseOrderRetrievalEnabled: boolean;
  Contacts: Contact[];
  ClientToken?: string;
}
export interface PutProcurementPortalPreferenceResponse {
  ProcurementPortalPreferenceArn: string;
}
export interface SendProcurementPortalValidationRequest {
  ProcurementPortalPreferenceArn: string;
  ClientToken?: string;
}
export interface SendProcurementPortalValidationResponse {
  ProcurementPortalPreferenceArn: string;
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
export interface UpdateInvoiceUnitRequest {
  InvoiceUnitArn: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule?: InvoiceUnitRule;
  ClientToken?: string;
}
export interface UpdateInvoiceUnitResponse {
  InvoiceUnitArn?: string;
}
export interface UpdateProcurementPortalPreferenceStatusRequest {
  ProcurementPortalPreferenceArn: string;
  EinvoiceDeliveryPreferenceStatus?: ProcurementPortalPreferenceStatus;
  EinvoiceDeliveryPreferenceStatusReason?: string;
  PurchaseOrderRetrievalPreferenceStatus?: ProcurementPortalPreferenceStatus;
  PurchaseOrderRetrievalPreferenceStatusReason?: string;
  ClientToken?: string;
}
export interface UpdateProcurementPortalPreferenceStatusResponse {
  ProcurementPortalPreferenceArn: string;
}
export interface VerifyProcurementPortalValidationRequest {
  ProcurementPortalPreferenceArn: string;
  Code: string;
  ClientToken?: string;
}
export interface VerifyProcurementPortalValidationResponse {
  ProcurementPortalPreferenceArn: string;
}
export type ValidationExceptionReason =
  | "nonMemberPresent"
  | "maxAccountsExceeded"
  | "maxInvoiceUnitsExceeded"
  | "duplicateInvoiceUnit"
  | "mutualExclusionError"
  | "accountMembershipError"
  | "taxSettingsError"
  | "expiredNextToken"
  | "invalidNextToken"
  | "invalidInput"
  | "fieldValidationFailed"
  | "cannotParse"
  | "unknownOperation"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetInvoiceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This gets the invoice profile associated with a set of accounts. The accounts must be linked accounts under the requester management account organization.
 */
export const batchGetInvoiceProfile: API.OperationMethod<
  BatchGetInvoiceProfileRequest,
  BatchGetInvoiceProfileResponse,
  BatchGetInvoiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccountIds: 0 },
    output: {
      Profiles: D.list({
        ReceiverEmail: D.secret,
        TaxRegistrationNumber: D.secret,
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
  operationName: "BatchGetInvoiceProfile",
})) as any;

export type CreateInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This creates a new invoice unit with the provided definition.
 */
export const createInvoiceUnit: API.OperationMethod<
  CreateInvoiceUnitRequest,
  CreateInvoiceUnitResponse,
  CreateInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      InvoiceReceiver: 0,
      Description: 0,
      TaxInheritanceDisabled: 0,
      Rule: i_InvoiceUnitRule,
      ResourceTags: D.list(i_ResourceTag),
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "CreateInvoiceUnit",
})) as any;

export type CreateProcurementPortalPreferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Creates a procurement portal preference configuration for e-invoice delivery and purchase order retrieval. This preference defines how invoices are delivered to a procurement portal and how purchase orders are retrieved.
 */
export const createProcurementPortalPreference: API.OperationMethod<
  CreateProcurementPortalPreferenceRequest,
  CreateProcurementPortalPreferenceResponse,
  CreateProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProcurementPortalName: 0,
      BuyerDomain: 0,
      BuyerIdentifier: 0,
      SupplierDomain: 0,
      SupplierIdentifier: 0,
      Selector: i_ProcurementPortalPreferenceSelector,
      ProcurementPortalSharedSecret: 0,
      ProcurementPortalInstanceEndpoint: 0,
      TestEnvPreference: i_TestEnvPreferenceInput,
      EinvoiceDeliveryEnabled: 0,
      EinvoiceDeliveryPreference: i_EinvoiceDeliveryPreference,
      PurchaseOrderRetrievalEnabled: 0,
      Contacts: D.list(i_Contact),
      ResourceTags: D.list(i_ResourceTag),
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProcurementPortalPreference",
})) as any;

export type DeleteInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This deletes an invoice unit with the provided invoice unit ARN.
 */
export const deleteInvoiceUnit: API.OperationMethod<
  DeleteInvoiceUnitRequest,
  DeleteInvoiceUnitResponse,
  DeleteInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InvoiceUnitArn: 0, ClientToken: D.m({ idempotency: true }) },
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
  operationName: "DeleteInvoiceUnit",
})) as any;

export type DeleteProcurementPortalPreferenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Deletes an existing procurement portal preference. This action cannot be undone. Active e-invoice delivery and PO retrieval configurations will be terminated.
 */
export const deleteProcurementPortalPreference: API.OperationMethod<
  DeleteProcurementPortalPreferenceRequest,
  DeleteProcurementPortalPreferenceResponse,
  DeleteProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProcurementPortalPreferenceArn: 0,
      ClientToken: D.m({ idempotency: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProcurementPortalPreference",
})) as any;

export type GetInvoicePDFError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a URL to download the invoice document and supplemental documents associated with an invoice. The URLs are pre-signed and have expiration time. For special cases like Brazil, where Amazon Web Services generated invoice identifiers and government provided identifiers do not match, use the Amazon Web Services generated invoice identifier when making API requests. To grant IAM permission to use this operation, the caller needs the `invoicing:GetInvoicePDF` policy action.
 */
export const getInvoicePDF: API.OperationMethod<
  GetInvoicePDFRequest,
  GetInvoicePDFResponse,
  GetInvoicePDFError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InvoiceId: 0 },
    output: {
      InvoicePDF: {
        DocumentUrlExpirationDate: D.ts,
        SupplementalDocuments: D.list({ DocumentUrlExpirationDate: D.ts }),
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
  operationName: "GetInvoicePDF",
})) as any;

export type GetInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This retrieves the invoice unit definition.
 */
export const getInvoiceUnit: API.OperationMethod<
  GetInvoiceUnitRequest,
  GetInvoiceUnitResponse,
  GetInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { InvoiceUnitArn: 0, AsOf: 0 },
    output: { LastModified: D.ts },
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
  operationName: "GetInvoiceUnit",
})) as any;

export type GetProcurementPortalPreferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Retrieves the details of a specific procurement portal preference configuration.
 */
export const getProcurementPortalPreference: API.OperationMethod<
  GetProcurementPortalPreferenceRequest,
  GetProcurementPortalPreferenceResponse,
  GetProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProcurementPortalPreferenceArn: 0 },
    output: {
      ProcurementPortalPreference: {
        EinvoiceDeliveryPreference: { EinvoiceDeliveryActivationDate: D.ts },
        CreateDate: D.ts,
        LastUpdateDate: D.ts,
      },
    },
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
  operationName: "GetProcurementPortalPreference",
})) as any;

export type ListInvoiceSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves your invoice details programmatically, without line item details.
 */
export const listInvoiceSummaries: API.PaginatedOperationMethod<
  ListInvoiceSummariesRequest,
  ListInvoiceSummariesResponse,
  ListInvoiceSummariesError,
  Credentials | HttpClient.HttpClient,
  InvoiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Selector: { ResourceType: 0, Value: 0 },
      Filter: {
        TimeInterval: { StartDate: 0, EndDate: 0 },
        BillingPeriod: { Month: 0, Year: 0 },
        InvoicingEntity: 0,
        ReceiverRole: 0,
      },
      NextToken: 0,
      MaxResults: 0,
    },
    output: { InvoiceSummaries: D.list({ IssuedDate: D.ts, DueDate: D.ts }) },
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
  operationName: "ListInvoiceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InvoiceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInvoiceUnitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This fetches a list of all invoice unit definitions for a given account, as of the provided `AsOf` date.
 */
export const listInvoiceUnits: API.PaginatedOperationMethod<
  ListInvoiceUnitsRequest,
  ListInvoiceUnitsResponse,
  ListInvoiceUnitsError,
  Credentials | HttpClient.HttpClient,
  InvoiceUnit
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      Filters: {
        Names: 0,
        InvoiceReceivers: 0,
        Accounts: 0,
        BillSourceAccounts: 0,
      },
      NextToken: 0,
      MaxResults: 0,
      AsOf: 0,
    },
    output: { InvoiceUnits: D.list({ LastModified: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvoiceUnits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InvoiceUnits",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProcurementPortalPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Retrieves a list of procurement portal preferences associated with the Amazon Web Services account.
 */
export const listProcurementPortalPreferences: API.PaginatedOperationMethod<
  ListProcurementPortalPreferencesRequest,
  ListProcurementPortalPreferencesResponse,
  ListProcurementPortalPreferencesError,
  Credentials | HttpClient.HttpClient,
  ProcurementPortalPreferenceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      ProcurementPortalPreferences: D.list({
        CreateDate: D.ts,
        LastUpdateDate: D.ts,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProcurementPortalPreferences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProcurementPortalPreferences",
    pageSize: "MaxResults",
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
 * Lists the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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

export type PutProcurementPortalPreferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Updates an existing procurement portal preference configuration. This operation can modify settings for e-invoice delivery and purchase order retrieval.
 */
export const putProcurementPortalPreference: API.OperationMethod<
  PutProcurementPortalPreferenceRequest,
  PutProcurementPortalPreferenceResponse,
  PutProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProcurementPortalPreferenceArn: 0,
      Selector: i_ProcurementPortalPreferenceSelector,
      ProcurementPortalSharedSecret: 0,
      ProcurementPortalInstanceEndpoint: 0,
      TestEnvPreference: i_TestEnvPreferenceInput,
      EinvoiceDeliveryEnabled: 0,
      EinvoiceDeliveryPreference: i_EinvoiceDeliveryPreference,
      PurchaseOrderRetrievalEnabled: 0,
      Contacts: D.list(i_Contact),
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "PutProcurementPortalPreference",
})) as any;

export type SendProcurementPortalValidationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Sends a validation request for a procurement portal preference. This operation initiates the validation process by issuing a validation code that confirms ownership and connectivity of the configured procurement portal endpoint. Use `VerifyProcurementPortalValidation` to submit the received code and complete validation.
 */
export const sendProcurementPortalValidation: API.OperationMethod<
  SendProcurementPortalValidationRequest,
  SendProcurementPortalValidationResponse,
  SendProcurementPortalValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProcurementPortalPreferenceArn: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "SendProcurementPortalValidation",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
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
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, ResourceTagKeys: 0 } },
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

export type UpdateInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can update the invoice unit configuration at any time, and Amazon Web Services will use the latest configuration at the end of the month.
 */
export const updateInvoiceUnit: API.OperationMethod<
  UpdateInvoiceUnitRequest,
  UpdateInvoiceUnitResponse,
  UpdateInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      InvoiceUnitArn: 0,
      Description: 0,
      TaxInheritanceDisabled: 0,
      Rule: i_InvoiceUnitRule,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateInvoiceUnit",
})) as any;

export type UpdateProcurementPortalPreferenceStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Updates the status of a procurement portal preference, including the activation state of e-invoice delivery and purchase order retrieval features.
 */
export const updateProcurementPortalPreferenceStatus: API.OperationMethod<
  UpdateProcurementPortalPreferenceStatusRequest,
  UpdateProcurementPortalPreferenceStatusResponse,
  UpdateProcurementPortalPreferenceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProcurementPortalPreferenceArn: 0,
      EinvoiceDeliveryPreferenceStatus: 0,
      EinvoiceDeliveryPreferenceStatusReason: 0,
      PurchaseOrderRetrievalPreferenceStatus: 0,
      PurchaseOrderRetrievalPreferenceStatusReason: 0,
      ClientToken: D.m({ idempotency: true }),
    },
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
  operationName: "UpdateProcurementPortalPreferenceStatus",
})) as any;

export type VerifyProcurementPortalValidationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Submits a validation code to complete the validation of a procurement portal preference. Use this operation after calling `SendProcurementPortalValidation` to confirm ownership and connectivity of the configured procurement portal endpoint.
 */
export const verifyProcurementPortalValidation: API.OperationMethod<
  VerifyProcurementPortalValidationRequest,
  VerifyProcurementPortalValidationResponse,
  VerifyProcurementPortalValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProcurementPortalPreferenceArn: 0,
      Code: 0,
      ClientToken: D.m({ idempotency: true }),
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
  operationName: "VerifyProcurementPortalValidation",
})) as any;

const i_Contact: D.LazyStruct = () => ({ Name: 0, Email: 0 });
const i_EinvoiceDeliveryPreference: D.LazyStruct = () => ({
  EinvoiceDeliveryDocumentTypes: 0,
  EinvoiceDeliveryAttachmentTypes: 0,
  Protocol: 0,
  PurchaseOrderDataSources: D.list({
    EinvoiceDeliveryDocumentType: 0,
    PurchaseOrderDataSourceType: 0,
  }),
  ConnectionTestingMethod: 0,
  EinvoiceDeliveryActivationDate: 0,
});
const i_InvoiceUnitRule: D.LazyStruct = () => ({
  LinkedAccounts: 0,
  BillSourceAccounts: 0,
});
const i_ProcurementPortalPreferenceSelector: D.LazyStruct = () => ({
  InvoiceUnitArns: 0,
  SellerOfRecords: 0,
});
const i_ResourceTag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TestEnvPreferenceInput: D.LazyStruct = () => ({
  BuyerDomain: 0,
  BuyerIdentifier: 0,
  SupplierDomain: 0,
  SupplierIdentifier: 0,
  ProcurementPortalSharedSecret: 0,
  ProcurementPortalInstanceEndpoint: 0,
});
