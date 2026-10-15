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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Invoicing", serviceShapeName: "Invoicing" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "invoicing" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-12-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
      authSchemes: [{ name: "sigv4", signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}` }],
    });
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://invoicing.us-east-1.api.aws","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvoicingAccessDenied", httpResponseCode: 403 }),
      /*@__PURE__*/ T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvoicingConflict", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvoicingInternalServer", httpResponseCode: 500 }),
      /*@__PURE__*/ T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvoicingResourceNotFound", httpResponseCode: 404 }),
      /*@__PURE__*/ T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "InvoicingServiceQuotaExceeded",
        httpResponseCode: 402,
      }),
      /*@__PURE__*/ T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvoicingThrottling", httpResponseCode: 429 }),
      /*@__PURE__*/ T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(321, __c20, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvoicingValidation", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export type SensitiveBasicStringWithoutSpace = string | redacted.Redacted<string>;
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
export type ProcurementPortalName = "SAP_BUSINESS_NETWORK" | "COUPA" | (string & {});
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
export type EinvoiceDeliveryAttachmentType = "INVOICE_PDF" | "RFP_PDF" | (string & {});
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
export interface MarketplacePunchOutPreference {
  ApprovalRequestRedirectUrl?: string;
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
  MarketplacePunchOutEnabled?: boolean;
  MarketplacePunchOutPreference?: MarketplacePunchOutPreference;
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
  MarketplacePunchOutEnabled?: boolean;
  MarketplacePunchOutPreference?: MarketplacePunchOutPreference;
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
export type ListInvoiceSummariesResourceType = "ACCOUNT_ID" | "INVOICE_ID" | (string & {});
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
export type InvoiceType = "INVOICE" | "CREDIT_MEMO" | "PAYMENT_RECEIPT" | (string & {});
export type EinvoiceDeliveryStatus = "DELIVERED" | "NOT_DELIVERED" | (string & {});
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
  MarketplacePunchOutEnabled?: boolean;
  EinvoiceDeliveryPreferenceStatus?: ProcurementPortalPreferenceStatus;
  EinvoiceDeliveryPreferenceStatusReason?: string;
  PurchaseOrderRetrievalPreferenceStatus?: ProcurementPortalPreferenceStatus;
  PurchaseOrderRetrievalPreferenceStatusReason?: string;
  Version: number;
  CreateDate: Date;
  LastUpdateDate: Date;
}
export type ProcurementPortalPreferenceSummaries = ProcurementPortalPreferenceSummary[];
export interface ListProcurementPortalPreferencesResponse {
  ProcurementPortalPreferences?: ProcurementPortalPreferenceSummary[];
  NextToken?: string;
}
export interface ListProcurementPortalsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type ProcurementPortalIdString = string;
export interface InvoiceConfiguration {
  DocumentTypes?: EinvoiceDeliveryDocumentType[];
  AttachmentTypes?: EinvoiceDeliveryAttachmentType[];
}
export interface FeatureConfigurations {
  InvoiceConfiguration?: InvoiceConfiguration;
}
export interface ProcurementPortal {
  PortalIdentifier: string;
  PortalName: ProcurementPortalName;
  PortalDisplayName?: string;
  DefaultFeatureConfigurations?: FeatureConfigurations;
}
export type ProcurementPortals = ProcurementPortal[];
export interface ListProcurementPortalsResponse {
  ProcurementPortals: ProcurementPortal[];
  NextToken?: string;
}
export interface ListProcurementPortalSuppliersRequest {
  PortalIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export type SupplierIdString = string;
export type CountryCode = string;
export type ProcurementPortalEnv = "PROD" | "TEST" | (string & {});
export interface ProcurementPortalSupplier {
  SupplierIdentifier: string;
  SellerOfRecord?: string;
  CountryCode?: string;
  Environment?: ProcurementPortalEnv;
}
export type ProcurementPortalSuppliers = ProcurementPortalSupplier[];
export interface ListProcurementPortalSuppliersResponse {
  ProcurementPortalSuppliers: ProcurementPortalSupplier[];
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
  MarketplacePunchOutEnabled?: boolean;
  MarketplacePunchOutPreference?: MarketplacePunchOutPreference;
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
  input: __S(336, __c21, 0) as any as S.Schema<BatchGetInvoiceProfileRequest>,
  output: __S(340, __c21, 4) as any as S.Schema<BatchGetInvoiceProfileResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<CreateInvoiceUnitRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<CreateInvoiceUnitResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvoiceUnit",
}));

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
  input: __S(432, __c27, 0) as any as S.Schema<CreateProcurementPortalPreferenceRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<CreateProcurementPortalPreferenceResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteInvoiceUnitRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<DeleteInvoiceUnitResponse>,
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
}));

export type DeleteProcurementPortalPreferenceError =
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
 * Deletes an existing procurement portal preference. This action cannot be undone. Active e-invoice delivery and PO retrieval configurations will be terminated.
 */
export const deleteProcurementPortalPreference: API.OperationMethod<
  DeleteProcurementPortalPreferenceRequest,
  DeleteProcurementPortalPreferenceResponse,
  DeleteProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<DeleteProcurementPortalPreferenceRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<DeleteProcurementPortalPreferenceResponse>,
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
  operationName: "DeleteProcurementPortalPreference",
}));

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
  input: __S(32, __c2, 0) as any as S.Schema<GetInvoicePDFRequest>,
  output: __S(36, __c2, 4) as any as S.Schema<GetInvoicePDFResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<GetInvoiceUnitRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<GetInvoiceUnitResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<GetProcurementPortalPreferenceRequest>,
  output: __S(83, __c5, 3) as any as S.Schema<GetProcurementPortalPreferenceResponse>,
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
}));

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
  input: __S(100, __c6, 4) as any as S.Schema<ListInvoiceSummariesRequest>,
  output: __S(110, __c6, 14) as any as S.Schema<ListInvoiceSummariesResponse>,
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
  input: __S(113, __c7, 1) as any as S.Schema<ListInvoiceUnitsRequest>,
  output: __S(115, __c7, 3) as any as S.Schema<ListInvoiceUnitsResponse>,
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
  input: __S(128, __c8, 0) as any as S.Schema<ListProcurementPortalPreferencesRequest>,
  output: __S(131, __c8, 3) as any as S.Schema<ListProcurementPortalPreferencesResponse>,
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

export type ListProcurementPortalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the Amazon Web Services-supported procurement portals for e-invoice delivery and purchase order retrieval. Each entry includes the portal identifier, name, and default feature configurations, which define the supported document and attachment types. For faster, more reliable responses, use pagination.
 */
export const listProcurementPortals: API.PaginatedOperationMethod<
  ListProcurementPortalsRequest,
  ListProcurementPortalsResponse,
  ListProcurementPortalsError,
  Credentials | HttpClient.HttpClient,
  ProcurementPortal
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<ListProcurementPortalsRequest>,
  output: __S(149, __c9, 5) as any as S.Schema<ListProcurementPortalsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProcurementPortals",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProcurementPortals",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProcurementPortalSuppliersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the suppliers configured for a specified procurement portal, including supplier identifiers and associated metadata. For faster, more reliable responses, use pagination.
 */
export const listProcurementPortalSuppliers: API.PaginatedOperationMethod<
  ListProcurementPortalSuppliersRequest,
  ListProcurementPortalSuppliersResponse,
  ListProcurementPortalSuppliersError,
  Credentials | HttpClient.HttpClient,
  ProcurementPortalSupplier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<ListProcurementPortalSuppliersRequest>,
  output: __S(163, __c10, 3) as any as S.Schema<ListProcurementPortalSuppliersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProcurementPortalSuppliers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProcurementPortalSuppliers",
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
  input: __S(176, __c11, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  input: __S(192, __c12, 0) as any as S.Schema<PutProcurementPortalPreferenceRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<PutProcurementPortalPreferenceResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<SendProcurementPortalValidationRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<SendProcurementPortalValidationResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<UntagResourceResponse>,
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
  input: __S(272, __c17, 0) as any as S.Schema<UpdateInvoiceUnitRequest>,
  output: __S(384, __c24, 0) as any as S.Schema<UpdateInvoiceUnitResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<UpdateProcurementPortalPreferenceStatusRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<UpdateProcurementPortalPreferenceStatusResponse>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<VerifyProcurementPortalValidationRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<VerifyProcurementPortalValidationResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InvoiceUnitArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteInvoiceUnitRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalPreferenceArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteProcurementPortalPreferenceRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ InvoiceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetInvoicePDFRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentType: S.optional(S.String),
          DocumentId: S.optional(S.String),
          DocumentUrl: S.optional(S.String),
          DocumentUrlExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SupplementalDocument" });
    case 2:
      return S.Array(__S(33, __c2, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          InvoiceId: S.optional(S.String),
          DocumentUrl: S.optional(S.String),
          DocumentUrlExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          SupplementalDocuments: S.optional(__S(34, __c2, 2)),
        }),
      ).annotate({ identifier: "InvoicePDF" });
    case 4:
      return S.suspend(() => S.Struct({ InvoicePDF: S.optional(__S(35, __c2, 3)) })).annotate({
        identifier: "GetInvoicePDFResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InvoiceUnitArn: S.String,
          AsOf: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetInvoiceUnitRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InvoiceUnitArn: S.optional(S.String),
          InvoiceReceiver: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          TaxInheritanceDisabled: S.optional(S.Boolean),
          Rule: S.optional(__S(400, __c25, 0)),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetInvoiceUnitResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProcurementPortalPreferenceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetProcurementPortalPreferenceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BuyerDomain: S.String,
          BuyerIdentifier: S.String,
          SupplierDomain: S.String,
          SupplierIdentifier: S.String,
          ProcurementPortalSharedSecret: S.optional(S.String),
          ProcurementPortalInstanceEndpoint: S.optional(S.String),
          PurchaseOrderRetrievalEndpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestEnvPreference" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AwsAccountId: S.String,
          ProcurementPortalPreferenceArn: S.String,
          ProcurementPortalName: S.String,
          BuyerDomain: S.String,
          BuyerIdentifier: S.String,
          SupplierDomain: S.String,
          SupplierIdentifier: S.String,
          Selector: S.optional(__S(464, __c29, 0)),
          ProcurementPortalSharedSecret: S.optional(S.String),
          ProcurementPortalInstanceEndpoint: S.optional(S.String),
          PurchaseOrderRetrievalEndpoint: S.optional(S.String),
          TestEnvPreference: S.optional(__S(81, __c5, 1)),
          EinvoiceDeliveryEnabled: S.Boolean,
          EinvoiceDeliveryPreference: S.optional(__S(498, __c31, 2)),
          PurchaseOrderRetrievalEnabled: S.Boolean,
          MarketplacePunchOutEnabled: S.optional(S.Boolean),
          MarketplacePunchOutPreference: S.optional(__S(499, __c31, 3)),
          Contacts: S.optional(__S(501, __c31, 5)),
          EinvoiceDeliveryPreferenceStatus: S.optional(S.String),
          EinvoiceDeliveryPreferenceStatusReason: S.optional(S.String),
          PurchaseOrderRetrievalPreferenceStatus: S.optional(S.String),
          PurchaseOrderRetrievalPreferenceStatusReason: S.optional(S.String),
          Version: S.Number,
          CreateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ProcurementPortalPreference" });
    case 3:
      return S.suspend(() => S.Struct({ ProcurementPortalPreference: __S(82, __c5, 2) })).annotate({
        identifier: "GetProcurementPortalPreferenceResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceType: S.String, Value: S.String })).annotate({
        identifier: "InvoiceSummariesSelector",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DateInterval" });
    case 2:
      return S.suspend(() => S.Struct({ Month: S.Number, Year: S.Number })).annotate({
        identifier: "BillingPeriod",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          TimeInterval: S.optional(__S(97, __c6, 1)),
          BillingPeriod: S.optional(__S(98, __c6, 2)),
          InvoicingEntity: S.optional(S.String),
          ReceiverRole: S.optional(S.String),
        }),
      ).annotate({ identifier: "InvoiceSummariesFilter" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Selector: __S(96, __c6, 0),
          Filter: S.optional(__S(99, __c6, 3)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInvoiceSummariesRequest" });
    case 5:
      return S.suspend(() =>
        S.Struct({ InvoicingEntity: S.optional(S.String), BillingEntity: S.optional(S.String) }),
      ).annotate({ identifier: "Entity" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Description: S.optional(S.String),
          Amount: S.optional(S.String),
          Rate: S.optional(S.String),
        }),
      ).annotate({ identifier: "DiscountsBreakdownAmount" });
    case 7:
      return S.Array(__S(102, __c6, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ Breakdown: S.optional(__S(103, __c6, 7)), TotalAmount: S.optional(S.String) }),
      ).annotate({ identifier: "DiscountsBreakdown" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          SubTotalAmount: S.optional(S.String),
          Discounts: S.optional(__S(104, __c6, 8)),
          Taxes: S.optional(__S(104, __c6, 8)),
          Fees: S.optional(__S(104, __c6, 8)),
        }),
      ).annotate({ identifier: "AmountBreakdown" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          SourceCurrencyCode: S.optional(S.String),
          TargetCurrencyCode: S.optional(S.String),
          Rate: S.optional(S.String),
        }),
      ).annotate({ identifier: "CurrencyExchangeDetails" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          TotalAmount: S.optional(S.String),
          TotalAmountBeforeTax: S.optional(S.String),
          CurrencyCode: S.optional(S.String),
          AmountBreakdown: S.optional(__S(105, __c6, 9)),
          CurrencyExchangeDetails: S.optional(__S(106, __c6, 10)),
        }),
      ).annotate({ identifier: "InvoiceCurrencyAmount" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          InvoiceId: S.optional(S.String),
          IssuedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DueDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          BillSourceAccounts: S.optional(__S(352, __c22, 0)),
          BillSourceAccountsTotalCount: S.optional(S.Number),
          ReceiverRole: S.optional(S.String),
          Entity: S.optional(__S(101, __c6, 5)),
          BillingPeriod: S.optional(__S(98, __c6, 2)),
          InvoiceFrequency: S.optional(S.String),
          BillType: S.optional(S.String),
          InvoiceType: S.optional(S.String),
          CommercialInvoiceId: S.optional(S.String),
          OriginalInvoiceId: S.optional(S.String),
          PurchaseOrderNumber: S.optional(S.String),
          EinvoiceDeliveryStatus: S.optional(S.String),
          TaxAuthorityStatus: S.optional(S.String),
          BaseCurrencyAmount: S.optional(__S(107, __c6, 11)),
          TaxCurrencyAmount: S.optional(__S(107, __c6, 11)),
          PaymentCurrencyAmount: S.optional(__S(107, __c6, 11)),
        }),
      ).annotate({ identifier: "InvoiceSummary" });
    case 13:
      return S.Array(__S(108, __c6, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({ InvoiceSummaries: __S(109, __c6, 13), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInvoiceSummariesResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Names: S.optional(__S(352, __c22, 0)),
          InvoiceReceivers: S.optional(__S(352, __c22, 0)),
          Accounts: S.optional(__S(352, __c22, 0)),
          BillSourceAccounts: S.optional(__S(352, __c22, 0)),
        }),
      ).annotate({ identifier: "Filters" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(112, __c7, 0)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          AsOf: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListInvoiceUnitsRequest" });
    case 2:
      return S.Array(__S(64, __c4, 0));
    case 3:
      return S.suspend(() =>
        S.Struct({ InvoiceUnits: S.optional(__S(114, __c7, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInvoiceUnitsResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProcurementPortalPreferencesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AwsAccountId: S.String,
          ProcurementPortalPreferenceArn: S.String,
          ProcurementPortalName: S.String,
          BuyerDomain: S.String,
          BuyerIdentifier: S.String,
          SupplierDomain: S.String,
          SupplierIdentifier: S.String,
          Selector: S.optional(__S(464, __c29, 0)),
          EinvoiceDeliveryEnabled: S.Boolean,
          PurchaseOrderRetrievalEnabled: S.Boolean,
          MarketplacePunchOutEnabled: S.optional(S.Boolean),
          EinvoiceDeliveryPreferenceStatus: S.optional(S.String),
          EinvoiceDeliveryPreferenceStatusReason: S.optional(S.String),
          PurchaseOrderRetrievalPreferenceStatus: S.optional(S.String),
          PurchaseOrderRetrievalPreferenceStatusReason: S.optional(S.String),
          Version: S.Number,
          CreateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          LastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ProcurementPortalPreferenceSummary" });
    case 2:
      return S.Array(__S(129, __c8, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalPreferences: S.optional(__S(130, __c8, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProcurementPortalPreferencesResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProcurementPortalsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DocumentTypes: S.optional(__S(480, __c30, 0)),
          AttachmentTypes: S.optional(__S(480, __c30, 0)),
        }),
      ).annotate({ identifier: "InvoiceConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({ InvoiceConfiguration: S.optional(__S(145, __c9, 1)) }),
      ).annotate({ identifier: "FeatureConfigurations" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PortalIdentifier: S.String,
          PortalName: S.String,
          PortalDisplayName: S.optional(S.String),
          DefaultFeatureConfigurations: S.optional(__S(146, __c9, 2)),
        }),
      ).annotate({ identifier: "ProcurementPortal" });
    case 4:
      return S.Array(__S(147, __c9, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ ProcurementPortals: __S(148, __c9, 4), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProcurementPortalsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PortalIdentifier: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListProcurementPortalSuppliersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SupplierIdentifier: S.String,
          SellerOfRecord: S.optional(S.String),
          CountryCode: S.optional(S.String),
          Environment: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProcurementPortalSupplier" });
    case 2:
      return S.Array(__S(161, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalSuppliers: __S(162, __c10, 2),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProcurementPortalSuppliersResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResourceTags: S.optional(__S(417, __c26, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalPreferenceArn: S.String,
          Selector: S.optional(__S(464, __c29, 0)),
          ProcurementPortalSharedSecret: S.optional(SensitiveString),
          ProcurementPortalInstanceEndpoint: S.optional(S.String),
          TestEnvPreference: S.optional(__S(512, __c32, 0)),
          EinvoiceDeliveryEnabled: S.Boolean,
          EinvoiceDeliveryPreference: S.optional(__S(498, __c31, 2)),
          PurchaseOrderRetrievalEnabled: S.Boolean,
          MarketplacePunchOutEnabled: S.optional(S.Boolean),
          MarketplacePunchOutPreference: S.optional(__S(499, __c31, 3)),
          Contacts: __S(501, __c31, 5),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutProcurementPortalPreferenceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalPreferenceArn: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendProcurementPortalValidationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, ResourceTags: __S(417, __c26, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, ResourceTagKeys: __S(352, __c22, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InvoiceUnitArn: S.String,
          Description: S.optional(S.String),
          TaxInheritanceDisabled: S.optional(S.Boolean),
          Rule: S.optional(__S(400, __c25, 0)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateInvoiceUnitRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalPreferenceArn: S.String,
          EinvoiceDeliveryPreferenceStatus: S.optional(S.String),
          EinvoiceDeliveryPreferenceStatusReason: S.optional(S.String),
          PurchaseOrderRetrievalPreferenceStatus: S.optional(S.String),
          PurchaseOrderRetrievalPreferenceStatusReason: S.optional(S.String),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProcurementPortalPreferenceStatusRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalPreferenceArn: S.String,
          Code: S.String,
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "VerifyProcurementPortalValidationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(320, __c20, 0));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountIds: __S(352, __c22, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetInvoiceProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AddressLine1: S.optional(S.String),
          AddressLine2: S.optional(S.String),
          AddressLine3: S.optional(S.String),
          DistrictOrCounty: S.optional(S.String),
          City: S.optional(S.String),
          StateOrRegion: S.optional(S.String),
          CountryCode: S.optional(S.String),
          CompanyName: S.optional(S.String),
          PostalCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ReceiverAddress" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          ReceiverName: S.optional(S.String),
          ReceiverAddress: S.optional(__S(337, __c21, 1)),
          ReceiverEmail: S.optional(SensitiveString),
          Issuer: S.optional(S.String),
          TaxRegistrationNumber: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "InvoiceProfile" });
    case 3:
      return S.Array(__S(338, __c21, 2));
    case 4:
      return S.suspend(() => S.Struct({ Profiles: S.optional(__S(339, __c21, 3)) })).annotate({
        identifier: "BatchGetInvoiceProfileResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          InvoiceReceiver: S.String,
          Description: S.optional(S.String),
          TaxInheritanceDisabled: S.optional(S.Boolean),
          Rule: __S(400, __c25, 0),
          ResourceTags: S.optional(__S(417, __c26, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateInvoiceUnitRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InvoiceUnitArn: S.optional(S.String) })).annotate({
        identifier: "CreateInvoiceUnitResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LinkedAccounts: S.optional(__S(352, __c22, 0)),
          BillSourceAccounts: S.optional(__S(352, __c22, 0)),
        }),
      ).annotate({ identifier: "InvoiceUnitRule" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(416, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProcurementPortalName: S.String,
          BuyerDomain: S.String,
          BuyerIdentifier: S.String,
          SupplierDomain: S.String,
          SupplierIdentifier: S.String,
          Selector: S.optional(__S(464, __c29, 0)),
          ProcurementPortalSharedSecret: S.optional(SensitiveString),
          ProcurementPortalInstanceEndpoint: S.optional(S.String),
          TestEnvPreference: S.optional(__S(512, __c32, 0)),
          EinvoiceDeliveryEnabled: S.Boolean,
          EinvoiceDeliveryPreference: S.optional(__S(498, __c31, 2)),
          PurchaseOrderRetrievalEnabled: S.Boolean,
          MarketplacePunchOutEnabled: S.optional(S.Boolean),
          MarketplacePunchOutPreference: S.optional(__S(499, __c31, 3)),
          Contacts: __S(501, __c31, 5),
          ResourceTags: S.optional(__S(417, __c26, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProcurementPortalPreferenceRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ProcurementPortalPreferenceArn: S.String })).annotate({
        identifier: "CreateProcurementPortalPreferenceResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          InvoiceUnitArns: S.optional(__S(352, __c22, 0)),
          SellerOfRecords: S.optional(__S(352, __c22, 0)),
        }),
      ).annotate({ identifier: "ProcurementPortalPreferenceSelector" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EinvoiceDeliveryDocumentType: S.optional(S.String),
          PurchaseOrderDataSourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "PurchaseOrderDataSource" });
    case 1:
      return S.Array(__S(496, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          EinvoiceDeliveryDocumentTypes: __S(480, __c30, 0),
          EinvoiceDeliveryAttachmentTypes: S.optional(__S(480, __c30, 0)),
          Protocol: S.String,
          PurchaseOrderDataSources: __S(497, __c31, 1),
          ConnectionTestingMethod: S.String,
          EinvoiceDeliveryActivationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "EinvoiceDeliveryPreference" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ApprovalRequestRedirectUrl: S.optional(S.String) }),
      ).annotate({ identifier: "MarketplacePunchOutPreference" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Email: S.optional(S.String) }),
      ).annotate({ identifier: "Contact" });
    case 5:
      return S.Array(__S(500, __c31, 4));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BuyerDomain: S.String,
          BuyerIdentifier: S.String,
          SupplierDomain: S.String,
          SupplierIdentifier: S.String,
          ProcurementPortalSharedSecret: S.optional(S.String),
          ProcurementPortalInstanceEndpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestEnvPreferenceInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
