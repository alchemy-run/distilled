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
  sdkId: "PartnerCentral Benefits",
  serviceShapeName: "PartnerCentralBenefitsService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "partnercentral-benefits" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
              `https://partnercentral-benefits-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://partnercentral-benefits.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://partnercentral-benefits.{R}.api.aws","properties":{},"headers":{}}',
  [
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
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      QuotaCode: S.String,
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(402), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withQuotaError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      FieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(305, __c19, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CatalogName = string;
export type BenefitApplicationIdentifier = string;
export interface Amendment {
  FieldPath: string;
  NewValue: string;
}
export type AmendmentList = Amendment[];
export interface AmendBenefitApplicationInput {
  Catalog: string;
  ClientToken: string;
  Revision: string;
  Identifier: string;
  AmendmentReason: string;
  Amendments: Amendment[];
}
export interface AmendBenefitApplicationOutput {}
export type Arn = string;
export interface AssociateBenefitApplicationResourceInput {
  Catalog: string;
  BenefitApplicationIdentifier: string;
  ResourceArn: string;
}
export type BenefitApplicationId = string;
export interface AssociateBenefitApplicationResourceOutput {
  Id?: string;
  Arn?: string;
  Revision?: string;
}
export interface CancelBenefitApplicationInput {
  Catalog: string;
  ClientToken: string;
  Identifier: string;
  Reason?: string;
}
export interface CancelBenefitApplicationOutput {}
export type BenefitApplicationName = string;
export type BenefitApplicationDescription = string;
export type FulfillmentType = "CREDITS" | "CASH" | "ACCESS" | (string & {});
export type FulfillmentTypes = FulfillmentType[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type Tags = Tag[];
export type Arns = string[];
export type ContactEmail = string | redacted.Redacted<string>;
export type ContactFirstName = string | redacted.Redacted<string>;
export type ContactLastName = string | redacted.Redacted<string>;
export type ContactPhone = string | redacted.Redacted<string>;
export interface Contact {
  Email?: string | redacted.Redacted<string>;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  BusinessTitle?: string;
  Phone?: string | redacted.Redacted<string>;
}
export type Contacts = Contact[];
export type FileURI = string;
export interface FileInput {
  FileURI: string;
  BusinessUseCase?: string;
}
export type FileInputDetails = FileInput[];
export interface CreateBenefitApplicationInput {
  Catalog: string;
  ClientToken: string;
  Name?: string;
  Description?: string;
  BenefitIdentifier: string;
  FulfillmentTypes?: FulfillmentType[];
  BenefitApplicationDetails?: any;
  Tags?: Tag[];
  AssociatedResources?: string[];
  PartnerContacts?: Contact[];
  FileDetails?: FileInput[];
}
export interface CreateBenefitApplicationOutput {
  Id?: string;
  Arn?: string;
  Revision?: string;
}
export interface DisassociateBenefitApplicationResourceInput {
  Catalog: string;
  BenefitApplicationIdentifier: string;
  ResourceArn: string;
}
export interface DisassociateBenefitApplicationResourceOutput {
  Id?: string;
  Arn?: string;
  Revision?: string;
}
export interface GetBenefitInput {
  Catalog: string;
  Identifier: string;
}
export type Program = string;
export type Programs = string[];
export type BenefitStatus = "ACTIVE" | "INACTIVE" | (string & {});
export interface GetBenefitOutput {
  Id?: string;
  Catalog?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Programs?: string[];
  FulfillmentTypes?: FulfillmentType[];
  BenefitRequestSchema?: any;
  Status?: BenefitStatus;
}
export type BenefitAllocationIdentifier = string;
export interface GetBenefitAllocationInput {
  Catalog: string;
  Identifier: string;
}
export type BenefitAllocationId = string;
export type BenefitAllocationArn = string;
export type BenefitAllocationStatus = "ACTIVE" | "INACTIVE" | "FULFILLED" | (string & {});
export type BenefitId = string;
export type BenefitIdentifiers = string[];
export type CurrencyCode =
  | "AED"
  | "AMD"
  | "ARS"
  | "AUD"
  | "AWG"
  | "AZN"
  | "BBD"
  | "BDT"
  | "BGN"
  | "BMD"
  | "BND"
  | "BOB"
  | "BRL"
  | "BSD"
  | "BYR"
  | "BZD"
  | "CAD"
  | "CHF"
  | "CLP"
  | "CNY"
  | "COP"
  | "CRC"
  | "CZK"
  | "DKK"
  | "DOP"
  | "EEK"
  | "EGP"
  | "EUR"
  | "GBP"
  | "GEL"
  | "GHS"
  | "GTQ"
  | "GYD"
  | "HKD"
  | "HNL"
  | "HRK"
  | "HTG"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "ISK"
  | "JMD"
  | "JPY"
  | "KES"
  | "KHR"
  | "KRW"
  | "KYD"
  | "KZT"
  | "LBP"
  | "LKR"
  | "LTL"
  | "LVL"
  | "MAD"
  | "MNT"
  | "MOP"
  | "MUR"
  | "MVR"
  | "MXN"
  | "MYR"
  | "NAD"
  | "NGN"
  | "NIO"
  | "NOK"
  | "NZD"
  | "PAB"
  | "PEN"
  | "PHP"
  | "PKR"
  | "PLN"
  | "PYG"
  | "QAR"
  | "RON"
  | "RUB"
  | "SAR"
  | "SEK"
  | "SGD"
  | "SIT"
  | "SKK"
  | "THB"
  | "TND"
  | "TRY"
  | "TTD"
  | "TWD"
  | "TZS"
  | "UAH"
  | "USD"
  | "UYU"
  | "UZS"
  | "VND"
  | "XAF"
  | "XCD"
  | "XOF"
  | "XPF"
  | "ZAR"
  | (string & {});
export interface MonetaryValue {
  Amount: string;
  CurrencyCode: CurrencyCode;
}
export interface IssuanceDetail {
  IssuanceId?: string;
  IssuanceAmount?: MonetaryValue;
  IssuedAt?: Date;
}
export interface DisbursementDetails {
  DisbursedAmount?: MonetaryValue;
  IssuanceDetails?: IssuanceDetail;
}
export interface ConsumableDetails {
  AllocatedAmount?: MonetaryValue;
  RemainingAmount?: MonetaryValue;
  UtilizedAmount?: MonetaryValue;
  IssuanceDetails?: IssuanceDetail;
}
export interface CreditCode {
  AwsAccountId: string;
  Value: MonetaryValue;
  AwsCreditCode: string;
  Status: BenefitAllocationStatus;
  IssuedAt: Date;
  ExpiresAt: Date;
}
export type CreditCodes = CreditCode[];
export interface CreditDetails {
  AllocatedAmount: MonetaryValue;
  IssuedAmount: MonetaryValue;
  Codes: CreditCode[];
}
export interface AccessDetails {
  Description?: string;
}
export type FulfillmentDetails =
  | {
      DisbursementDetails: DisbursementDetails;
      ConsumableDetails?: never;
      CreditDetails?: never;
      AccessDetails?: never;
    }
  | {
      DisbursementDetails?: never;
      ConsumableDetails: ConsumableDetails;
      CreditDetails?: never;
      AccessDetails?: never;
    }
  | {
      DisbursementDetails?: never;
      ConsumableDetails?: never;
      CreditDetails: CreditDetails;
      AccessDetails?: never;
    }
  | {
      DisbursementDetails?: never;
      ConsumableDetails?: never;
      CreditDetails?: never;
      AccessDetails: AccessDetails;
    };
export interface GetBenefitAllocationOutput {
  Id?: string;
  Catalog?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Status?: BenefitAllocationStatus;
  StatusReason?: string;
  BenefitApplicationId?: string;
  BenefitId?: string;
  FulfillmentType?: FulfillmentType;
  ApplicableBenefitIds?: string[];
  FulfillmentDetail?: FulfillmentDetails;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  StartsAt?: Date;
  ExpiresAt?: Date;
}
export interface GetBenefitApplicationInput {
  Catalog: string;
  Identifier: string;
}
export type BenefitApplicationStatus =
  | "PENDING_SUBMISSION"
  | "IN_REVIEW"
  | "ACTION_REQUIRED"
  | "APPROVED"
  | "REJECTED"
  | "CANCELED"
  | (string & {});
export type BenefitApplicationStage = string;
export type StatusReasonCode = string;
export type StatusReasonCodes = string[];
export type FileType =
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/pdf"
  | "image/png"
  | "image/jpeg"
  | "image/svg+xml"
  | "text/csv"
  | (string & {});
export interface FileDetail {
  FileURI: string;
  BusinessUseCase?: string;
  FileName?: string;
  FileStatus?: string;
  FileStatusReason?: string;
  FileType?: FileType;
  CreatedBy?: string;
  CreatedAt?: Date;
}
export type FileDetails = FileDetail[];
export interface GetBenefitApplicationOutput {
  Id?: string;
  Arn?: string;
  Catalog?: string;
  BenefitId?: string;
  Name?: string;
  Description?: string;
  FulfillmentTypes?: FulfillmentType[];
  BenefitApplicationDetails?: any;
  Programs?: string[];
  Status?: BenefitApplicationStatus;
  Stage?: string;
  StatusReason?: string;
  StatusReasonCode?: string;
  StatusReasonCodes?: string[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Revision?: string;
  AssociatedResources?: string[];
  PartnerContacts?: Contact[];
  FileDetails?: FileDetail[];
}
export type BenefitApplicationIdentifierList = string[];
export type BenefitAllocationStatusList = BenefitAllocationStatus[];
export interface ListBenefitAllocationsInput {
  Catalog: string;
  FulfillmentTypes?: FulfillmentType[];
  BenefitIdentifiers?: string[];
  BenefitApplicationIdentifiers?: string[];
  Status?: BenefitAllocationStatus[];
  MaxResults?: number;
  NextToken?: string;
}
export type BenefitAllocationName = string;
export type BenefitIds = string[];
export interface BenefitAllocationSummary {
  Id?: string;
  Catalog?: string;
  Arn?: string;
  Status?: BenefitAllocationStatus;
  StatusReason?: string;
  Name?: string;
  BenefitId?: string;
  BenefitApplicationId?: string;
  FulfillmentTypes?: FulfillmentType[];
  CreatedAt?: Date;
  ExpiresAt?: Date;
  ApplicableBenefitIds?: string[];
}
export type BenefitAllocationSummaries = BenefitAllocationSummary[];
export interface ListBenefitAllocationsOutput {
  BenefitAllocationSummaries?: BenefitAllocationSummary[];
  NextToken?: string;
}
export type Statuses = BenefitApplicationStatus[];
export type Stages = string[];
export type ResourceType = "OPPORTUNITY" | "BENEFIT_ALLOCATION" | (string & {});
export interface AssociatedResource {
  ResourceType?: ResourceType;
  ResourceIdentifier?: string;
  ResourceArn?: string;
}
export type AssociatedResources = AssociatedResource[];
export interface ListBenefitApplicationsInput {
  Catalog: string;
  Programs?: string[];
  FulfillmentTypes?: FulfillmentType[];
  BenefitIdentifiers?: string[];
  Status?: BenefitApplicationStatus[];
  Stages?: string[];
  AssociatedResources?: AssociatedResource[];
  AssociatedResourceArns?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export type Attributes = { [key: string]: string | undefined };
export interface BenefitApplicationSummary {
  Catalog?: string;
  Name?: string;
  Id?: string;
  Arn?: string;
  BenefitId?: string;
  Programs?: string[];
  FulfillmentTypes?: FulfillmentType[];
  Status?: BenefitApplicationStatus;
  Stage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  BenefitApplicationDetails?: { [key: string]: string | undefined };
  AssociatedResources?: string[];
}
export type BenefitApplicationSummaries = BenefitApplicationSummary[];
export interface ListBenefitApplicationsOutput {
  BenefitApplicationSummaries?: BenefitApplicationSummary[];
  NextToken?: string;
}
export type BenefitStatuses = BenefitStatus[];
export interface ListBenefitsInput {
  Catalog: string;
  Programs?: string[];
  FulfillmentTypes?: FulfillmentType[];
  Status?: BenefitStatus[];
  MaxResults?: number;
  NextToken?: string;
}
export interface BenefitSummary {
  Id?: string;
  Catalog?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Programs?: string[];
  FulfillmentTypes?: FulfillmentType[];
  Status?: BenefitStatus;
}
export type BenefitSummaries = BenefitSummary[];
export interface ListBenefitsOutput {
  BenefitSummaries?: BenefitSummary[];
  NextToken?: string;
}
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface RecallBenefitApplicationInput {
  Catalog: string;
  ClientToken?: string;
  Identifier: string;
  Reason: string;
}
export interface RecallBenefitApplicationOutput {}
export interface SubmitBenefitApplicationInput {
  Catalog: string;
  Identifier: string;
}
export interface SubmitBenefitApplicationOutput {}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateBenefitApplicationInput {
  Catalog: string;
  ClientToken: string;
  Name?: string;
  Description?: string;
  Identifier: string;
  Revision: string;
  BenefitApplicationDetails?: any;
  PartnerContacts?: Contact[];
  FileDetails?: FileInput[];
}
export interface UpdateBenefitApplicationOutput {
  Id?: string;
  Arn?: string;
  Revision?: string;
}
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | "BUSINESS_VALIDATION_FAILED"
  | (string & {});
export type ValidationExceptionErrorCode =
  | "REQUIRED_FIELD_MISSING"
  | "INVALID_ENUM_VALUE"
  | "INVALID_STRING_FORMAT"
  | "INVALID_VALUE"
  | "NOT_ENOUGH_VALUES"
  | "TOO_MANY_VALUES"
  | "INVALID_RESOURCE_STATE"
  | "DUPLICATE_KEY_VALUE"
  | "VALUE_OUT_OF_RANGE"
  | "ACTION_NOT_PERMITTED"
  | (string & {});
export interface ValidationExceptionField {
  Name: string;
  Message: string;
  Code?: ValidationExceptionErrorCode;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AmendBenefitApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies an existing benefit application by applying amendments to specific fields while maintaining revision control.
 */
export const amendBenefitApplication: API.OperationMethod<
  AmendBenefitApplicationInput,
  AmendBenefitApplicationOutput,
  AmendBenefitApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(322, __c20, 2) as any as S.Schema<AmendBenefitApplicationInput>,
  output: __S(336, __c21, 0) as any as S.Schema<AmendBenefitApplicationOutput>,
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
  operationName: "AmendBenefitApplication",
}));

export type AssociateBenefitApplicationResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Links an AWS resource to an existing benefit application for tracking and management purposes.
 */
export const associateBenefitApplicationResource: API.OperationMethod<
  AssociateBenefitApplicationResourceInput,
  AssociateBenefitApplicationResourceOutput,
  AssociateBenefitApplicationResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<AssociateBenefitApplicationResourceInput>,
  output: __S(368, __c23, 0) as any as S.Schema<AssociateBenefitApplicationResourceOutput>,
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
  operationName: "AssociateBenefitApplicationResource",
}));

export type CancelBenefitApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a benefit application that is currently in progress, preventing further processing.
 */
export const cancelBenefitApplication: API.OperationMethod<
  CancelBenefitApplicationInput,
  CancelBenefitApplicationOutput,
  CancelBenefitApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<CancelBenefitApplicationInput>,
  output: __S(336, __c21, 0) as any as S.Schema<CancelBenefitApplicationOutput>,
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
  operationName: "CancelBenefitApplication",
}));

export type CreateBenefitApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new benefit application for a partner to request access to AWS benefits and programs.
 */
export const createBenefitApplication: API.OperationMethod<
  CreateBenefitApplicationInput,
  CreateBenefitApplicationOutput,
  CreateBenefitApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateBenefitApplicationInput>,
  output: __S(368, __c23, 0) as any as S.Schema<CreateBenefitApplicationOutput>,
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
  operationName: "CreateBenefitApplication",
}));

export type DisassociateBenefitApplicationResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between an AWS resource and a benefit application.
 */
export const disassociateBenefitApplicationResource: API.OperationMethod<
  DisassociateBenefitApplicationResourceInput,
  DisassociateBenefitApplicationResourceOutput,
  DisassociateBenefitApplicationResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DisassociateBenefitApplicationResourceInput>,
  output: __S(368, __c23, 0) as any as S.Schema<DisassociateBenefitApplicationResourceOutput>,
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
  operationName: "DisassociateBenefitApplicationResource",
}));

export type GetBenefitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific benefit available in the partner catalog.
 */
export const getBenefit: API.OperationMethod<
  GetBenefitInput,
  GetBenefitOutput,
  GetBenefitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<GetBenefitInput>,
  output: __S(113, __c7, 1) as any as S.Schema<GetBenefitOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBenefit",
}));

export type GetBenefitAllocationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific benefit allocation that has been granted to a partner.
 */
export const getBenefitAllocation: API.OperationMethod<
  GetBenefitAllocationInput,
  GetBenefitAllocationOutput,
  GetBenefitAllocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<GetBenefitAllocationInput>,
  output: __S(138, __c8, 10) as any as S.Schema<GetBenefitAllocationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBenefitAllocation",
}));

export type GetBenefitApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific benefit application.
 */
export const getBenefitApplication: API.OperationMethod<
  GetBenefitApplicationInput,
  GetBenefitApplicationOutput,
  GetBenefitApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<GetBenefitApplicationInput>,
  output: __S(147, __c9, 3) as any as S.Schema<GetBenefitApplicationOutput>,
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
  operationName: "GetBenefitApplication",
}));

export type ListBenefitAllocationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of benefit allocations based on specified filter criteria.
 */
export const listBenefitAllocations: API.PaginatedOperationMethod<
  ListBenefitAllocationsInput,
  ListBenefitAllocationsOutput,
  ListBenefitAllocationsError,
  Credentials | HttpClient.HttpClient,
  BenefitAllocationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<ListBenefitAllocationsInput>,
  output: __S(163, __c10, 3) as any as S.Schema<ListBenefitAllocationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBenefitAllocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BenefitAllocationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBenefitApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of benefit applications based on specified filter criteria.
 */
export const listBenefitApplications: API.PaginatedOperationMethod<
  ListBenefitApplicationsInput,
  ListBenefitApplicationsOutput,
  ListBenefitApplicationsError,
  Credentials | HttpClient.HttpClient,
  BenefitApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(178, __c11, 2) as any as S.Schema<ListBenefitApplicationsInput>,
  output: __S(182, __c11, 6) as any as S.Schema<ListBenefitApplicationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBenefitApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BenefitApplicationSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBenefitsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a paginated list of available benefits based on specified filter criteria.
 */
export const listBenefits: API.PaginatedOperationMethod<
  ListBenefitsInput,
  ListBenefitsOutput,
  ListBenefitsError,
  Credentials | HttpClient.HttpClient,
  BenefitSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<ListBenefitsInput>,
  output: __S(195, __c12, 3) as any as S.Schema<ListBenefitsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBenefits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BenefitSummaries",
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
 * Retrieves all tags associated with a specific resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type RecallBenefitApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Recalls a submitted benefit application, returning it to draft status for further modifications.
 */
export const recallBenefitApplication: API.OperationMethod<
  RecallBenefitApplicationInput,
  RecallBenefitApplicationOutput,
  RecallBenefitApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<RecallBenefitApplicationInput>,
  output: __S(336, __c21, 0) as any as S.Schema<RecallBenefitApplicationOutput>,
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
  operationName: "RecallBenefitApplication",
}));

export type SubmitBenefitApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits a benefit application for review and processing by AWS.
 */
export const submitBenefitApplication: API.OperationMethod<
  SubmitBenefitApplicationInput,
  SubmitBenefitApplicationOutput,
  SubmitBenefitApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<SubmitBenefitApplicationInput>,
  output: __S(336, __c21, 0) as any as S.Schema<SubmitBenefitApplicationOutput>,
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
  operationName: "SubmitBenefitApplication",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<TagResourceResponse>,
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
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(336, __c21, 0) as any as S.Schema<UntagResourceResponse>,
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
  operationName: "UntagResource",
}));

export type UpdateBenefitApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing benefit application with new information while maintaining revision control.
 */
export const updateBenefitApplication: API.OperationMethod<
  UpdateBenefitApplicationInput,
  UpdateBenefitApplicationOutput,
  UpdateBenefitApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<UpdateBenefitApplicationInput>,
  output: __S(368, __c23, 0) as any as S.Schema<UpdateBenefitApplicationOutput>,
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
  operationName: "UpdateBenefitApplication",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          BenefitIdentifier: S.String,
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          BenefitApplicationDetails: S.optional(S.Any),
          Tags: S.optional(__S(65, __c4, 1)),
          AssociatedResources: S.optional(__S(16, __c1, 0)),
          PartnerContacts: S.optional(__S(49, __c3, 1)),
          FileDetails: S.optional(__S(81, __c5, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CreateBenefitApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBenefitApplicationInput" });
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
      return S.Array(S.String);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Email: S.optional(SensitiveString),
          FirstName: S.optional(SensitiveString),
          LastName: S.optional(SensitiveString),
          BusinessTitle: S.optional(S.String),
          Phone: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "Contact" });
    case 1:
      return S.Array(__S(48, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(64, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FileURI: S.String, BusinessUseCase: S.optional(S.String) }),
      ).annotate({ identifier: "FileInput" });
    case 1:
      return S.Array(__S(80, __c5, 0));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          BenefitApplicationIdentifier: S.String,
          ResourceArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/DisassociateBenefitApplicationResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateBenefitApplicationResourceInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/GetBenefit" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBenefitInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Catalog: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Programs: S.optional(__S(16, __c1, 0)),
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          BenefitRequestSchema: S.optional(S.Any),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBenefitOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetBenefitAllocation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBenefitAllocationInput" });
    case 1:
      return S.suspend(() => S.Struct({ Amount: S.String, CurrencyCode: S.String })).annotate({
        identifier: "MonetaryValue",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IssuanceId: S.optional(S.String),
          IssuanceAmount: S.optional(__S(129, __c8, 1)),
          IssuedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "IssuanceDetail" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DisbursedAmount: S.optional(__S(129, __c8, 1)),
          IssuanceDetails: S.optional(__S(130, __c8, 2)),
        }),
      ).annotate({ identifier: "DisbursementDetails" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          AllocatedAmount: S.optional(__S(129, __c8, 1)),
          RemainingAmount: S.optional(__S(129, __c8, 1)),
          UtilizedAmount: S.optional(__S(129, __c8, 1)),
          IssuanceDetails: S.optional(__S(130, __c8, 2)),
        }),
      ).annotate({ identifier: "ConsumableDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          AwsAccountId: S.String,
          Value: __S(129, __c8, 1),
          AwsCreditCode: S.String,
          Status: S.String,
          IssuedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ExpiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreditCode" });
    case 6:
      return S.Array(__S(133, __c8, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          AllocatedAmount: __S(129, __c8, 1),
          IssuedAmount: __S(129, __c8, 1),
          Codes: __S(134, __c8, 6),
        }),
      ).annotate({ identifier: "CreditDetails" });
    case 8:
      return S.suspend(() => S.Struct({ Description: S.optional(S.String) })).annotate({
        identifier: "AccessDetails",
      });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ DisbursementDetails: __S(131, __c8, 3) }),
        /*@__PURE__*/ S.Struct({ ConsumableDetails: __S(132, __c8, 4) }),
        /*@__PURE__*/ S.Struct({ CreditDetails: __S(135, __c8, 7) }),
        /*@__PURE__*/ S.Struct({ AccessDetails: __S(136, __c8, 8) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Catalog: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          BenefitApplicationId: S.optional(S.String),
          BenefitId: S.optional(S.String),
          FulfillmentType: S.optional(S.String),
          ApplicableBenefitIds: S.optional(__S(16, __c1, 0)),
          FulfillmentDetail: S.optional(__S(137, __c8, 9)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          StartsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetBenefitAllocationOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GetBenefitApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBenefitApplicationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FileURI: S.String,
          BusinessUseCase: S.optional(S.String),
          FileName: S.optional(S.String),
          FileStatus: S.optional(S.String),
          FileStatusReason: S.optional(S.String),
          FileType: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "FileDetail" });
    case 2:
      return S.Array(__S(145, __c9, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Catalog: S.optional(S.String),
          BenefitId: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          BenefitApplicationDetails: S.optional(S.Any),
          Programs: S.optional(__S(16, __c1, 0)),
          Status: S.optional(S.String),
          Stage: S.optional(S.String),
          StatusReason: S.optional(S.String),
          StatusReasonCode: S.optional(S.String),
          StatusReasonCodes: S.optional(__S(16, __c1, 0)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Revision: S.optional(S.String),
          AssociatedResources: S.optional(__S(16, __c1, 0)),
          PartnerContacts: S.optional(__S(49, __c3, 1)),
          FileDetails: S.optional(__S(146, __c9, 2)),
        }),
      ).annotate({ identifier: "GetBenefitApplicationOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          BenefitIdentifiers: S.optional(__S(16, __c1, 0)),
          BenefitApplicationIdentifiers: S.optional(__S(16, __c1, 0)),
          Status: S.optional(__S(32, __c2, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListBenefitAllocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBenefitAllocationsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Catalog: S.optional(S.String),
          Arn: S.optional(S.String),
          Status: S.optional(S.String),
          StatusReason: S.optional(S.String),
          Name: S.optional(S.String),
          BenefitId: S.optional(S.String),
          BenefitApplicationId: S.optional(S.String),
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ExpiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          ApplicableBenefitIds: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "BenefitAllocationSummary" });
    case 2:
      return S.Array(__S(161, __c10, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BenefitAllocationSummaries: S.optional(__S(162, __c10, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBenefitAllocationsOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceType: S.optional(S.String),
          ResourceIdentifier: S.optional(S.String),
          ResourceArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociatedResource" });
    case 1:
      return S.Array(__S(176, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Programs: S.optional(__S(16, __c1, 0)),
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          BenefitIdentifiers: S.optional(__S(16, __c1, 0)),
          Status: S.optional(__S(32, __c2, 0)),
          Stages: S.optional(__S(16, __c1, 0)),
          AssociatedResources: S.optional(__S(177, __c11, 1)),
          AssociatedResourceArns: S.optional(__S(16, __c1, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListBenefitApplications" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBenefitApplicationsInput" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.optional(S.String),
          Name: S.optional(S.String),
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          BenefitId: S.optional(S.String),
          Programs: S.optional(__S(16, __c1, 0)),
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          Status: S.optional(S.String),
          Stage: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          UpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          BenefitApplicationDetails: S.optional(__S(179, __c11, 3)),
          AssociatedResources: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "BenefitApplicationSummary" });
    case 5:
      return S.Array(__S(180, __c11, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          BenefitApplicationSummaries: S.optional(__S(181, __c11, 5)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBenefitApplicationsOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          Programs: S.optional(__S(16, __c1, 0)),
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          Status: S.optional(__S(32, __c2, 0)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/ListBenefits" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListBenefitsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Catalog: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Programs: S.optional(__S(16, __c1, 0)),
          FulfillmentTypes: S.optional(__S(32, __c2, 0)),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "BenefitSummary" });
    case 2:
      return S.Array(__S(193, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          BenefitSummaries: S.optional(__S(194, __c12, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListBenefitsOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ListTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(65, __c4, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.optional(S.String),
          Identifier: S.String,
          Reason: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/RecallBenefitApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RecallBenefitApplicationInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Catalog: S.String, Identifier: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/SubmitBenefitApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SubmitBenefitApplicationInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(65, __c4, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/TagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(16, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/UntagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.String,
          Name: S.optional(S.String),
          Description: S.optional(S.String),
          Identifier: S.String,
          Revision: S.String,
          BenefitApplicationDetails: S.optional(S.Any),
          PartnerContacts: S.optional(__S(49, __c3, 1)),
          FileDetails: S.optional(__S(81, __c5, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/UpdateBenefitApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBenefitApplicationInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Message: S.String, Code: S.optional(S.String) }),
      ).annotate({ identifier: "ValidationExceptionField" });
    case 1:
      return S.Array(__S(304, __c19, 0));
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FieldPath: S.String, NewValue: S.String })).annotate({
        identifier: "Amendment",
      });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.String,
          Revision: S.String,
          Identifier: S.String,
          AmendmentReason: S.String,
          Amendments: __S(321, __c20, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AmendBenefitApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AmendBenefitApplicationInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "AmendBenefitApplicationOutput",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          BenefitApplicationIdentifier: S.String,
          ResourceArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/AssociateBenefitApplicationResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateBenefitApplicationResourceInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Revision: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateBenefitApplicationResourceOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Catalog: S.String,
          ClientToken: S.String,
          Identifier: S.String,
          Reason: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/CancelBenefitApplication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelBenefitApplicationInput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
