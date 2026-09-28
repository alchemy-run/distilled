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
  sdkId: "PartnerCentral Benefits",
  target: "PartnerCentralBenefitsService",
  version: "2018-05-10",
  sigv4: "partnercentral-benefits",
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError", "RetryableError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly ResourceId: string;
    readonly ResourceType: string;
    readonly QuotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly Reason: ValidationExceptionReason;
    readonly FieldList?: ValidationExceptionField[];
  }> {}
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
export type BenefitAllocationStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "FULFILLED"
  | (string & {});
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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: 0,
      Revision: 0,
      Identifier: 0,
      AmendmentReason: 0,
      Amendments: D.list({ FieldPath: 0, NewValue: 0 }),
    },
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
  operationName: "AmendBenefitApplication",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, BenefitApplicationIdentifier: 0, ResourceArn: 0 },
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
  operationName: "AssociateBenefitApplicationResource",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, ClientToken: 0, Identifier: 0, Reason: 0 },
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
  operationName: "CancelBenefitApplication",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: 0,
      Name: 0,
      Description: 0,
      BenefitIdentifier: 0,
      FulfillmentTypes: 0,
      BenefitApplicationDetails: 0,
      Tags: D.list(i_Tag),
      AssociatedResources: 0,
      PartnerContacts: D.list(i_Contact),
      FileDetails: D.list(i_FileInput),
    },
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
  operationName: "CreateBenefitApplication",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, BenefitApplicationIdentifier: 0, ResourceArn: 0 },
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
  operationName: "DisassociateBenefitApplicationResource",
})) as any;

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
  descriptor: { service: svc, input: { Catalog: 0, Identifier: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: {
      FulfillmentDetail: {
        DisbursementDetails: { IssuanceDetails: o_IssuanceDetail },
        ConsumableDetails: { IssuanceDetails: o_IssuanceDetail },
        CreditDetails: { Codes: D.list({ IssuedAt: D.ts, ExpiresAt: D.ts }) },
      },
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      StartsAt: D.ts,
      ExpiresAt: D.ts,
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
  operationName: "GetBenefitAllocation",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Catalog: 0, Identifier: 0 },
    output: {
      CreatedAt: D.ts,
      UpdatedAt: D.ts,
      PartnerContacts: D.list({
        Email: D.secret,
        FirstName: D.secret,
        LastName: D.secret,
        Phone: D.secret,
      }),
      FileDetails: D.list({ CreatedAt: D.ts }),
    },
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
  operationName: "GetBenefitApplication",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      FulfillmentTypes: 0,
      BenefitIdentifiers: 0,
      BenefitApplicationIdentifiers: 0,
      Status: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      BenefitAllocationSummaries: D.list({ CreatedAt: D.ts, ExpiresAt: D.ts }),
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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Programs: 0,
      FulfillmentTypes: 0,
      BenefitIdentifiers: 0,
      Status: 0,
      Stages: 0,
      AssociatedResources: D.list({
        ResourceType: 0,
        ResourceIdentifier: 0,
        ResourceArn: 0,
      }),
      AssociatedResourceArns: 0,
      MaxResults: 0,
      NextToken: 0,
    },
    output: {
      BenefitApplicationSummaries: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      Programs: 0,
      FulfillmentTypes: 0,
      Status: 0,
      MaxResults: 0,
      NextToken: 0,
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
  descriptor: {
    service: svc,
    input: { Catalog: 0, ClientToken: 0, Identifier: 0, Reason: 0 },
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
  operationName: "RecallBenefitApplication",
})) as any;

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
  descriptor: { service: svc, input: { Catalog: 0, Identifier: 0 } },
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
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tags: D.list(i_Tag) } },
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
})) as any;

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
  descriptor: { service: svc, input: { resourceArn: 0, tagKeys: 0 } },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      Catalog: 0,
      ClientToken: 0,
      Name: 0,
      Description: 0,
      Identifier: 0,
      Revision: 0,
      BenefitApplicationDetails: 0,
      PartnerContacts: D.list(i_Contact),
      FileDetails: D.list(i_FileInput),
    },
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
  operationName: "UpdateBenefitApplication",
})) as any;

const i_Contact: D.LazyStruct = () => ({
  Email: 0,
  FirstName: 0,
  LastName: 0,
  BusinessTitle: 0,
  Phone: 0,
});
const i_FileInput: D.LazyStruct = () => ({ FileURI: 0, BusinessUseCase: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_IssuanceDetail: D.LazyStruct = () => ({ IssuedAt: D.ts });
