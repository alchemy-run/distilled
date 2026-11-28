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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Payments", serviceShapeName: "AWSPayments" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "payments" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-09-23");
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
              `https://payments-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return e(
            `https://payments.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://payments.us-east-1.api.aws","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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
  prefix: "Payments",
  service: "Payments",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "AccessDeniedExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(17, __c1, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type FinancialRecordIdentifier = string;
export type InvoiceId = string;
export type FinancialRecordKey =
  | { identifier: string; invoiceIdentifier?: undefined }
  | { identifier?: undefined; invoiceIdentifier: string };
export type FinancialRecordKeyList = FinancialRecordKey[];
export interface BatchGetFinancialRecordRequest {
  keys: FinancialRecordKey[];
}
export type FinancialRecordId = string;
export type FinancialRecordType = "INVOICE" | "CREDIT_MEMO" | (string & {});
export type MerchantOfRecord = string;
export type LineOfBusiness =
  | "AWS_CLOUD_SERVICES"
  | "PROSERVE_MARKETING_AND_TRAINING"
  | "AWS_MARKETPLACE"
  | (string & {});
export interface BusinessUnit {
  merchantOfRecord: string;
  lineOfBusiness?: LineOfBusiness | undefined;
}
export type DecimalString = string;
export type CurrencyCode = string;
export interface CurrencyAmount {
  value: string;
  currency: string;
}
export interface Balances {
  outstanding: CurrencyAmount;
  processing: CurrencyAmount;
  settled: CurrencyAmount;
  canceled: CurrencyAmount;
}
export type SettlementStatus = "OPEN" | "CLOSED" | (string & {});
export type FinancialRecordStatus =
  | "OUTSTANDING"
  | "PROCESSING"
  | "SETTLED"
  | "CANCELED"
  | (string & {});
export type DueStatus = "DUE" | "PAST_DUE" | (string & {});
export interface BillingPeriod {
  startDate: Date;
  endDate: Date;
}
export type PaymentTerms = string;
export type InvoiceFrequency = "ONE_TIME" | "RECURRING" | (string & {});
export interface InvoiceDetails {
  invoiceId: string;
  dueStatus?: DueStatus | undefined;
  billingPeriod: BillingPeriod;
  dueDate: Date;
  paymentTerms?: string | undefined;
  invoiceFrequency: InvoiceFrequency;
}
export interface CreditMemoDetails {
  invoiceId: string;
  billingPeriod: BillingPeriod;
}
export type FinancialRecordDetails =
  | { invoiceDetails: InvoiceDetails; creditMemoDetails?: undefined }
  | { invoiceDetails?: undefined; creditMemoDetails: CreditMemoDetails };
export interface FinancialRecord {
  id: string;
  type: FinancialRecordType;
  businessUnit: BusinessUnit;
  amount: CurrencyAmount;
  balances: Balances;
  settlementStatus: SettlementStatus;
  status: FinancialRecordStatus;
  issuedAt: Date;
  closedAt?: Date | undefined;
  details: FinancialRecordDetails;
}
export type FinancialRecordList = FinancialRecord[];
export type BatchErrorCode = "NOT_FOUND" | "INTERNAL_ERROR" | (string & {});
export interface FinancialRecordError {
  key: FinancialRecordKey;
  code: BatchErrorCode;
  message: string;
}
export type FinancialRecordErrorList = FinancialRecordError[];
export interface BatchGetFinancialRecordResponse {
  financialRecords: FinancialRecord[];
  errors: FinancialRecordError[];
}
export type BalanceType =
  | "INVOICES_DUE"
  | "INVOICES_PAST_DUE"
  | "OUTSTANDING_CREDIT_MEMOS"
  | (string & {});
export type PaginationToken = string;
export type MaxResults = number;
export interface GetAccountBalanceRequest {
  balanceType: BalanceType;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AccountBalance {
  amount: CurrencyAmount;
  merchantOfRecord: string;
}
export type AccountBalanceList = AccountBalance[];
export interface GetAccountBalanceResponse {
  accountBalances: AccountBalance[];
  nextToken?: string | undefined;
}
export interface GetFinancialRecordRequest {
  identifier?: string | undefined;
  invoiceIdentifier?: string | undefined;
}
export interface GetFinancialRecordResponse {
  financialRecord: FinancialRecord;
}
export type PaymentInstrumentIdentifier = string;
export interface GetPaymentInstrumentRequest {
  identifier: string;
}
export type PaymentInstrumentArn = string;
export type PaymentMethod =
  | "CARD"
  | "US_ACH_BANK_ACCOUNT"
  | "SEPA_BANK_ACCOUNT"
  | "UK_BACS_BANK_ACCOUNT"
  | "IN_NET_BANKING"
  | "CN_BANK_REDIRECT"
  | "UPI"
  | "PIX"
  | "PAY_BY_INVOICE"
  | (string & {});
export type PaymentInstrumentStatus =
  | "ACTIVE"
  | "PENDING_SETUP"
  | "SETUP_IN_PROGRESS"
  | "INVALID"
  | (string & {});
export type CardBrand =
  | "VISA"
  | "MASTERCARD"
  | "AMEX"
  | "DISCOVER"
  | "JCB"
  | "RUPAY"
  | "CHINA_UNIONPAY"
  | (string & {});
export type Last4 = string | redacted.Redacted<string>;
export type ExpirationMonth = number;
export type ExpirationYear = number;
export type CardType = "CREDIT" | "DEBIT" | (string & {});
export type BankName = string;
export type CountryCode = string;
export interface Card {
  brand?: CardBrand | undefined;
  last4: string | redacted.Redacted<string>;
  expirationMonth?: number | undefined;
  expirationYear?: number | undefined;
  cardType?: CardType | undefined;
  issuingBank?: string | undefined;
  issuerCountry?: string | undefined;
}
export type BankAccountNumberTail = string | redacted.Redacted<string>;
export type AccountHolderName = string | redacted.Redacted<string>;
export type BankAccountType = "CHECKING" | "SAVINGS" | (string & {});
export interface UsAchBankAccount {
  accountNumberTail?: string | redacted.Redacted<string> | undefined;
  accountHolderName?: string | redacted.Redacted<string> | undefined;
  bankName?: string | undefined;
  accountType?: BankAccountType | undefined;
}
export interface SepaBankAccount {
  accountNumberTail?: string | redacted.Redacted<string> | undefined;
  accountHolderName?: string | redacted.Redacted<string> | undefined;
  bankName?: string | undefined;
  accountType?: BankAccountType | undefined;
}
export interface UkBacsBankAccount {
  accountNumberTail?: string | redacted.Redacted<string> | undefined;
  accountHolderName?: string | redacted.Redacted<string> | undefined;
  bankName?: string | undefined;
  accountType?: BankAccountType | undefined;
}
export type BankCode = string;
export interface InNetBanking {
  bankCode: string;
  bankName?: string | undefined;
}
export interface CnBankRedirect {
  bankCode?: string | undefined;
}
export type DisplayLabel = string;
export interface Upi {
  appName?: string | undefined;
}
export type PaymentInstrumentDetails =
  | {
      card: Card;
      usAchBankAccount?: undefined;
      sepaBankAccount?: undefined;
      ukBacsBankAccount?: undefined;
      inNetBanking?: undefined;
      cnBankRedirect?: undefined;
      upi?: undefined;
    }
  | {
      card?: undefined;
      usAchBankAccount: UsAchBankAccount;
      sepaBankAccount?: undefined;
      ukBacsBankAccount?: undefined;
      inNetBanking?: undefined;
      cnBankRedirect?: undefined;
      upi?: undefined;
    }
  | {
      card?: undefined;
      usAchBankAccount?: undefined;
      sepaBankAccount: SepaBankAccount;
      ukBacsBankAccount?: undefined;
      inNetBanking?: undefined;
      cnBankRedirect?: undefined;
      upi?: undefined;
    }
  | {
      card?: undefined;
      usAchBankAccount?: undefined;
      sepaBankAccount?: undefined;
      ukBacsBankAccount: UkBacsBankAccount;
      inNetBanking?: undefined;
      cnBankRedirect?: undefined;
      upi?: undefined;
    }
  | {
      card?: undefined;
      usAchBankAccount?: undefined;
      sepaBankAccount?: undefined;
      ukBacsBankAccount?: undefined;
      inNetBanking: InNetBanking;
      cnBankRedirect?: undefined;
      upi?: undefined;
    }
  | {
      card?: undefined;
      usAchBankAccount?: undefined;
      sepaBankAccount?: undefined;
      ukBacsBankAccount?: undefined;
      inNetBanking?: undefined;
      cnBankRedirect: CnBankRedirect;
      upi?: undefined;
    }
  | {
      card?: undefined;
      usAchBankAccount?: undefined;
      sepaBankAccount?: undefined;
      ukBacsBankAccount?: undefined;
      inNetBanking?: undefined;
      cnBankRedirect?: undefined;
      upi: Upi;
    };
export interface PaymentInstrument {
  arn: string;
  paymentMethod: PaymentMethod;
  status: PaymentInstrumentStatus;
  details?: PaymentInstrumentDetails | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface GetPaymentInstrumentResponse {
  paymentInstrument: PaymentInstrument;
}
export type FinancialRecordTypeList = FinancialRecordType[];
export type SettlementStatusList = SettlementStatus[];
export type FinancialRecordSortField = "ISSUED_AT" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListFinancialRecordsRequest {
  types: FinancialRecordType[];
  settlementStatuses?: SettlementStatus[] | undefined;
  issuedAfter?: Date | undefined;
  issuedBefore?: Date | undefined;
  sortBy?: FinancialRecordSortField | undefined;
  sortOrder?: SortOrder | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface FinancialRecordSummary {
  id: string;
  type: FinancialRecordType;
  businessUnit: BusinessUnit;
  amount: CurrencyAmount;
  balances: Balances;
  settlementStatus: SettlementStatus;
  status: FinancialRecordStatus;
  issuedAt: Date;
  closedAt?: Date | undefined;
}
export type FinancialRecordSummaryList = FinancialRecordSummary[];
export interface ListFinancialRecordsResponse {
  financialRecordSummaries: FinancialRecordSummary[];
  nextToken?: string | undefined;
}
export interface ListPaymentInstrumentsRequest {
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type PaymentInstrumentId = string;
export interface PaymentInstrumentSummary {
  id: string;
  arn: string;
  paymentMethod: PaymentMethod;
  status: PaymentInstrumentStatus;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type PaymentInstrumentSummaryList = PaymentInstrumentSummary[];
export interface ListPaymentInstrumentsResponse {
  paymentInstrumentSummaries: PaymentInstrumentSummary[];
  nextToken?: string | undefined;
}
export type AccessDeniedExceptionReason =
  | "NOT_AUTHORIZED"
  | "INVALID_ACCOUNT_STATE"
  | "OTHER"
  | (string & {});
export type ValidationExceptionReason =
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "INVALID_PAGINATION_TOKEN"
  | "UNSUPPORTED_ACTION"
  | "OTHER"
  | (string & {});
export type ValidationExceptionFieldName = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetFinancialRecordError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves up to 100 financial records in one request, including the details that are specific to each record's type. Identify each record by its ID or by its invoice ID. Results can be partial: each key that you request appears once in the response, either as a record in `financialRecords` or as an error in `errors`. A key that matches no record on your account is returned in `errors` and doesn't fail the request. This operation provides strongly consistent reads.
 *
 * To use this operation, you must have Amazon Web Services Identity and Access Management (IAM) permission for both `payments:BatchGetFinancialRecord` and `payments:GetPaymentStatus`.
 */
export const batchGetFinancialRecord: API.OperationMethod<
  BatchGetFinancialRecordRequest & RegionInput,
  BatchGetFinancialRecordResponse,
  BatchGetFinancialRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(34, __c2, 2) as any as S.Schema<BatchGetFinancialRecordRequest>,
  output: __S(38, __c2, 6) as any as S.Schema<BatchGetFinancialRecordResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFinancialRecord",
  telemetry: TELEMETRY,
  span: "BatchGetFinancialRecord",
}));

export type GetAccountBalanceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves one balance of your account, selected by balance type, as one amount for each merchant of record and currency. Each amount is the sum of the outstanding balances of your invoices or credit memos that have the status `OUTSTANDING`. Amounts are never added together across merchants of record or currencies. This operation is eventually consistent. Results are paginated. Use `nextToken` to retrieve more results.
 *
 * To use this operation, you must have Amazon Web Services Identity and Access Management (IAM) permission for both `payments:GetAccountBalance` and `payments:GetPaymentStatus`.
 */
export const getAccountBalance: API.PaginatedOperationMethod<
  GetAccountBalanceRequest & RegionInput,
  GetAccountBalanceResponse,
  GetAccountBalanceError,
  Credentials | HttpClient.HttpClient,
  AccountBalance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetAccountBalanceRequest>,
  output: __S(99, __c6, 3) as any as S.Schema<GetAccountBalanceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountBalance",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountBalances",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetAccountBalance",
})) as any;

export type GetFinancialRecordError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a single financial record, including the details that are specific to its type. Specify exactly one of the following:
 *
 * - The ID that Amazon Web Services Payments issued for the record, in `identifier`.
 *
 * - The invoice ID that Amazon Web Services Invoicing issued for an invoice or a credit memo, in `invoiceIdentifier`.
 *
 * If you specify both or neither, the request fails with `ValidationException`. If no record on your account matches, the request fails with `ResourceNotFoundException`.
 *
 * This operation provides strongly consistent reads.
 *
 * To use this operation, you must have Amazon Web Services Identity and Access Management (IAM) permission for both `payments:GetFinancialRecord` and `payments:GetPaymentStatus`.
 */
export const getFinancialRecord: API.OperationMethod<
  GetFinancialRecordRequest & RegionInput,
  GetFinancialRecordResponse,
  GetFinancialRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<GetFinancialRecordRequest>,
  output: __S(113, __c7, 1) as any as S.Schema<GetFinancialRecordResponse>,
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
  operationName: "GetFinancialRecord",
  telemetry: TELEMETRY,
  span: "GetFinancialRecord",
}));

export type GetPaymentInstrumentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a payment instrument on your account, including the details that are specific to its payment method, such as a card's last four digits. Identify the instrument by its Amazon Resource Name (ARN) or by its ID. `ListPaymentInstruments` returns both.
 *
 * To use this operation, you must have Amazon Web Services Identity and Access Management (IAM) permission for `payments:GetPaymentInstrument`. You can scope this permission to the instrument's ARN.
 */
export const getPaymentInstrument: API.OperationMethod<
  GetPaymentInstrumentRequest & RegionInput,
  GetPaymentInstrumentResponse,
  GetPaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<GetPaymentInstrumentRequest>,
  output: __S(136, __c8, 8) as any as S.Schema<GetPaymentInstrumentResponse>,
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
  operationName: "GetPaymentInstrument",
  telemetry: TELEMETRY,
  span: "GetPaymentInstrument",
}));

export type ListFinancialRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the financial records on your account, with the newest first by default. A financial record is an invoice or a credit memo. You must specify at least one record type in `types`. You can narrow the results further by settlement status and issue date. This operation returns summaries. To get the details that are specific to a record's type, use `GetFinancialRecord` or `BatchGetFinancialRecord`. Results are paginated. Use `nextToken` to retrieve more results.
 *
 * To use this operation, you must have Amazon Web Services Identity and Access Management (IAM) permission for both `payments:ListFinancialRecords` and `payments:GetPaymentStatus`.
 */
export const listFinancialRecords: API.PaginatedOperationMethod<
  ListFinancialRecordsRequest & RegionInput,
  ListFinancialRecordsResponse,
  ListFinancialRecordsError,
  Credentials | HttpClient.HttpClient,
  FinancialRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(145, __c9, 1) as any as S.Schema<ListFinancialRecordsRequest>,
  output: __S(148, __c9, 4) as any as S.Schema<ListFinancialRecordsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFinancialRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "financialRecordSummaries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFinancialRecords",
})) as any;

export type ListPaymentInstrumentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the payment instruments on your account. This operation returns summaries. To get the details that are specific to an instrument's payment method, use `GetPaymentInstrument`. Results are paginated. Use `nextToken` to retrieve more results.
 *
 * To use this operation, you must have Amazon Web Services Identity and Access Management (IAM) permission for `payments:ListPaymentInstruments`.
 */
export const listPaymentInstruments: API.PaginatedOperationMethod<
  ListPaymentInstrumentsRequest & RegionInput,
  ListPaymentInstrumentsResponse,
  ListPaymentInstrumentsError,
  Credentials | HttpClient.HttpClient,
  PaymentInstrumentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<ListPaymentInstrumentsRequest>,
  output: __S(3, __c0, 3) as any as S.Schema<ListPaymentInstrumentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPaymentInstruments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentInstrumentSummaries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListPaymentInstruments",
})) as any;

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPaymentInstrumentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          paymentMethod: S.String,
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PaymentInstrumentSummary" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ paymentInstrumentSummaries: __S(2, __c0, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPaymentInstrumentsResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(16, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ identifier: S.String }),
        /*@__PURE__*/ S.Struct({ invoiceIdentifier: S.String }),
      ]);
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ keys: __S(33, __c2, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetFinancialRecordRequest" });
    case 3:
      return S.Array(__S(68, __c4, 4));
    case 4:
      return S.suspend(() =>
        S.Struct({ key: __S(32, __c2, 0), code: S.String, message: S.String }),
      ).annotate({ identifier: "FinancialRecordError" });
    case 5:
      return S.Array(__S(36, __c2, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ financialRecords: __S(35, __c2, 3), errors: __S(37, __c2, 5) }),
      ).annotate({ identifier: "BatchGetFinancialRecordResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.String, currency: S.String })).annotate({
        identifier: "CurrencyAmount",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "BillingPeriod" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          invoiceId: S.String,
          dueStatus: S.optional(S.String),
          billingPeriod: __S(64, __c4, 0),
          dueDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          paymentTerms: S.optional(S.String),
          invoiceFrequency: S.String,
        }),
      ).annotate({ identifier: "InvoiceDetails" });
    case 2:
      return S.suspend(() =>
        S.Struct({ invoiceId: S.String, billingPeriod: __S(64, __c4, 0) }),
      ).annotate({ identifier: "CreditMemoDetails" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ invoiceDetails: __S(65, __c4, 1) }),
        /*@__PURE__*/ S.Struct({ creditMemoDetails: __S(66, __c4, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          businessUnit: __S(80, __c5, 0),
          amount: __S(48, __c3, 0),
          balances: __S(81, __c5, 1),
          settlementStatus: S.String,
          status: S.String,
          issuedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          closedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          details: __S(67, __c4, 3),
        }),
      ).annotate({ identifier: "FinancialRecord" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ merchantOfRecord: S.String, lineOfBusiness: S.optional(S.String) }),
      ).annotate({ identifier: "BusinessUnit" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          outstanding: __S(48, __c3, 0),
          processing: __S(48, __c3, 0),
          settled: __S(48, __c3, 0),
          canceled: __S(48, __c3, 0),
        }),
      ).annotate({ identifier: "Balances" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          balanceType: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAccountBalanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ amount: __S(48, __c3, 0), merchantOfRecord: S.String }),
      ).annotate({ identifier: "AccountBalance" });
    case 2:
      return S.Array(__S(97, __c6, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ accountBalances: __S(98, __c6, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetAccountBalanceResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.optional(S.String),
          invoiceIdentifier: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetFinancialRecordRequest" });
    case 1:
      return S.suspend(() => S.Struct({ financialRecord: __S(68, __c4, 4) })).annotate({
        identifier: "GetFinancialRecordResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPaymentInstrumentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          brand: S.optional(S.String),
          last4: SensitiveString,
          expirationMonth: S.optional(S.Number),
          expirationYear: S.optional(S.Number),
          cardType: S.optional(S.String),
          issuingBank: S.optional(S.String),
          issuerCountry: S.optional(S.String),
        }),
      ).annotate({ identifier: "Card" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          accountNumberTail: S.optional(SensitiveString),
          accountHolderName: S.optional(SensitiveString),
          bankName: S.optional(S.String),
          accountType: S.optional(S.String),
        }),
      ).annotate({ identifier: "UsAchBankAccount" });
    case 3:
      return S.suspend(() =>
        S.Struct({ bankCode: S.String, bankName: S.optional(S.String) }),
      ).annotate({ identifier: "InNetBanking" });
    case 4:
      return S.suspend(() => S.Struct({ bankCode: S.optional(S.String) })).annotate({
        identifier: "CnBankRedirect",
      });
    case 5:
      return S.suspend(() => S.Struct({ appName: S.optional(S.String) })).annotate({
        identifier: "Upi",
      });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ card: __S(129, __c8, 1) }),
        /*@__PURE__*/ S.Struct({ usAchBankAccount: __S(130, __c8, 2) }),
        /*@__PURE__*/ S.Struct({ sepaBankAccount: __S(130, __c8, 2) }),
        /*@__PURE__*/ S.Struct({ ukBacsBankAccount: __S(130, __c8, 2) }),
        /*@__PURE__*/ S.Struct({ inNetBanking: __S(131, __c8, 3) }),
        /*@__PURE__*/ S.Struct({ cnBankRedirect: __S(132, __c8, 4) }),
        /*@__PURE__*/ S.Struct({ upi: __S(133, __c8, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          paymentMethod: S.String,
          status: S.String,
          details: S.optional(__S(134, __c8, 6)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PaymentInstrument" });
    case 8:
      return S.suspend(() => S.Struct({ paymentInstrument: __S(135, __c8, 7) })).annotate({
        identifier: "GetPaymentInstrumentResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          types: __S(144, __c9, 0),
          settlementStatuses: S.optional(__S(144, __c9, 0)),
          issuedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          issuedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFinancialRecordsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          businessUnit: __S(80, __c5, 0),
          amount: __S(48, __c3, 0),
          balances: __S(81, __c5, 1),
          settlementStatus: S.String,
          status: S.String,
          issuedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          closedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "FinancialRecordSummary" });
    case 3:
      return S.Array(__S(146, __c9, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ financialRecordSummaries: __S(147, __c9, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFinancialRecordsResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
