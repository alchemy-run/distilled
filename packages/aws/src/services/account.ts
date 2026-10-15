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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Account", serviceShapeName: "Account" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "account" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-02-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
    const _p0 = (_0: unknown) => ({
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
          if (UseFIPS === true && UseDualStack === true) {
            if (
              true === _.getAttr(PartitionResult, "supportsFIPS") &&
              true === _.getAttr(PartitionResult, "supportsDualStack")
            ) {
              return e(
                `https://account-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
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
                `https://account-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://account.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://account.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p0(PartitionResult),
            {},
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://account.us-east-1.{D}","properties":{"authSchemes":[{"name":"sigv4","signingRegion":"us-east-1"}]},"headers":{}}',
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
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorType: /*@__PURE__*/ S.optional(S.String).pipe(
        /*@__PURE__*/ T.HttpHeader("x-amzn-ErrorType"),
      ),
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
      message: /*@__PURE__*/ SensitiveString.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(S.String),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(65, __c16, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AccountId = string;
export type PrimaryEmailAddress = string | redacted.Redacted<string>;
export type Otp = string | redacted.Redacted<string>;
export interface AcceptPrimaryEmailUpdateRequest {
  AccountId: string;
  PrimaryEmail: string | redacted.Redacted<string>;
  Otp: string | redacted.Redacted<string>;
}
export type PrimaryEmailUpdateStatus = string;
export interface AcceptPrimaryEmailUpdateResponse {
  Status?: string;
}
export type AlternateContactType = string;
export interface DeleteAlternateContactRequest {
  AlternateContactType: string;
  AccountId?: string;
}
export interface DeleteAlternateContactResponse {}
export type RegionName = string;
export interface DisableRegionRequest {
  AccountId?: string;
  RegionName: string;
}
export interface DisableRegionResponse {}
export interface EnableRegionRequest {
  AccountId?: string;
  RegionName: string;
}
export interface EnableRegionResponse {}
export interface GetAccountInformationRequest {
  AccountId?: string;
}
export type AccountName = string | redacted.Redacted<string>;
export type AccountCreatedDate = Date;
export type AccountState = string;
export interface GetAccountInformationResponse {
  AccountId?: string;
  AccountName?: string | redacted.Redacted<string>;
  AccountCreatedDate?: Date;
  AccountState?: string;
}
export interface GetAlternateContactRequest {
  AlternateContactType: string;
  AccountId?: string;
}
export type Name = string | redacted.Redacted<string>;
export type Title = string | redacted.Redacted<string>;
export type EmailAddress = string | redacted.Redacted<string>;
export type PhoneNumber = string | redacted.Redacted<string>;
export interface AlternateContact {
  Name?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  PhoneNumber?: string | redacted.Redacted<string>;
  AlternateContactType?: string;
}
export interface GetAlternateContactResponse {
  AlternateContact?: AlternateContact;
}
export interface GetContactInformationRequest {
  AccountId?: string;
}
export type FullName = string | redacted.Redacted<string>;
export type AddressLine = string | redacted.Redacted<string>;
export type City = string | redacted.Redacted<string>;
export type StateOrRegion = string | redacted.Redacted<string>;
export type DistrictOrCounty = string | redacted.Redacted<string>;
export type PostalCode = string | redacted.Redacted<string>;
export type CountryCode = string | redacted.Redacted<string>;
export type ContactInformationPhoneNumber = string | redacted.Redacted<string>;
export type CompanyName = string | redacted.Redacted<string>;
export type WebsiteUrl = string | redacted.Redacted<string>;
export interface ContactInformation {
  FullName: string | redacted.Redacted<string>;
  AddressLine1: string | redacted.Redacted<string>;
  AddressLine2?: string | redacted.Redacted<string>;
  AddressLine3?: string | redacted.Redacted<string>;
  City: string | redacted.Redacted<string>;
  StateOrRegion?: string | redacted.Redacted<string>;
  DistrictOrCounty?: string | redacted.Redacted<string>;
  PostalCode: string | redacted.Redacted<string>;
  CountryCode: string | redacted.Redacted<string>;
  PhoneNumber: string | redacted.Redacted<string>;
  CompanyName?: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
}
export type PhoneNumberVerificationStatus = string;
export interface GetContactInformationResponse {
  ContactInformation?: ContactInformation;
  VerificationStatus?: string;
}
export interface GetGovCloudAccountInformationRequest {
  StandardAccountId?: string;
}
export type AwsAccountState = string;
export interface GetGovCloudAccountInformationResponse {
  GovCloudAccountId: string;
  AccountState: string;
}
export interface GetPrimaryEmailRequest {
  AccountId: string;
}
export interface GetPrimaryEmailResponse {
  PrimaryEmail?: string | redacted.Redacted<string>;
}
export interface GetPrimaryEmailUpdateStatusRequest {
  AccountId?: string;
}
export interface GetPrimaryEmailUpdateStatusResponse {
  Status: string;
  UpdatedAt?: Date;
}
export interface GetRegionOptStatusRequest {
  AccountId?: string;
  RegionName: string;
}
export type RegionOptStatus = string;
export interface GetRegionOptStatusResponse {
  RegionName?: string;
  RegionOptStatus?: string;
}
export type RegionOptStatusList = string[];
export interface ListRegionsRequest {
  AccountId?: string;
  MaxResults?: number;
  NextToken?: string;
  RegionOptStatusContains?: string[];
}
export interface Region {
  RegionName?: string;
  RegionOptStatus?: string;
}
const Region = __S(76, __c19, 0) as any as S.Schema<Region>;
export type RegionOptList = Region[];
export interface ListRegionsResponse {
  NextToken?: string;
  Regions?: Region[];
}
export interface PutAccountNameRequest {
  AccountName: string | redacted.Redacted<string>;
  AccountId?: string;
}
export interface PutAccountNameResponse {}
export interface PutAlternateContactRequest {
  Name: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  EmailAddress: string | redacted.Redacted<string>;
  PhoneNumber: string | redacted.Redacted<string>;
  AlternateContactType: string;
  AccountId?: string;
}
export interface PutAlternateContactResponse {}
export interface PutContactInformationRequest {
  ContactInformation: ContactInformation;
  AccountId?: string;
}
export interface PutContactInformationResponse {}
export interface SendPhoneNumberVerificationRequest {
  AccountId?: string;
}
export interface SendPhoneNumberVerificationResponse {
  Status?: string;
}
export interface StartPrimaryEmailUpdateRequest {
  AccountId: string;
  PrimaryEmail: string | redacted.Redacted<string>;
}
export interface StartPrimaryEmailUpdateResponse {
  Status?: string;
}
export interface VerifyPhoneNumberRequest {
  AccountId?: string;
  Otp: string | redacted.Redacted<string>;
}
export interface VerifyPhoneNumberResponse {
  Status?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string | redacted.Redacted<string>;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AcceptPrimaryEmailUpdateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Accepts the request that originated from StartPrimaryEmailUpdate to update the primary email address (also known as the root user email address) for the specified account.
 */
export const acceptPrimaryEmailUpdate: API.OperationMethod<
  AcceptPrimaryEmailUpdateRequest,
  AcceptPrimaryEmailUpdateResponse,
  AcceptPrimaryEmailUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(68, __c17, 0) as any as S.Schema<AcceptPrimaryEmailUpdateRequest>,
  output: __S(72, __c18, 0) as any as S.Schema<AcceptPrimaryEmailUpdateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPrimaryEmailUpdate",
}));

export type DeleteAlternateContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified alternate contact from an Amazon Web Services account.
 *
 * For complete details about how to use the alternate contact operations, see Update the alternate contacts for your Amazon Web Services account.
 *
 * Before you can update the alternate contact information for an Amazon Web Services account that is managed by Organizations, you must first enable integration between Amazon Web Services Account Management and Organizations. For more information, see Enable trusted access for Amazon Web Services Account Management.
 */
export const deleteAlternateContact: API.OperationMethod<
  DeleteAlternateContactRequest,
  DeleteAlternateContactResponse,
  DeleteAlternateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c20, 0) as any as S.Schema<DeleteAlternateContactRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<DeleteAlternateContactResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlternateContact",
}));

export type DisableRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Disables (opts-out) a particular Region for an account.
 *
 * The act of disabling a Region will remove all IAM access to any resources that reside in that Region.
 */
export const disableRegion: API.OperationMethod<
  DisableRegionRequest,
  DisableRegionResponse,
  DisableRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c22, 0) as any as S.Schema<DisableRegionRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<DisableRegionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableRegion",
}));

export type EnableRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Enables (opts-in) a particular Region for an account.
 */
export const enableRegion: API.OperationMethod<
  EnableRegionRequest,
  EnableRegionResponse,
  EnableRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<EnableRegionRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<EnableRegionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableRegion",
}));

export type GetAccountInformationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified account including its account name, account ID, account creation date and time, and account state. To use this API, an IAM user or role must have the `account:GetAccountInformation` IAM permission.
 */
export const getAccountInformation: API.OperationMethod<
  GetAccountInformationRequest,
  GetAccountInformationResponse,
  GetAccountInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<GetAccountInformationRequest>,
  output: __S(5, __c1, 1) as any as S.Schema<GetAccountInformationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountInformation",
}));

export type GetAlternateContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified alternate contact attached to an Amazon Web Services account.
 *
 * For complete details about how to use the alternate contact operations, see Update the alternate contacts for your Amazon Web Services account.
 *
 * Before you can update the alternate contact information for an Amazon Web Services account that is managed by Organizations, you must first enable integration between Amazon Web Services Account Management and Organizations. For more information, see Enable trusted access for Amazon Web Services Account Management.
 */
export const getAlternateContact: API.OperationMethod<
  GetAlternateContactRequest,
  GetAlternateContactResponse,
  GetAlternateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<GetAlternateContactRequest>,
  output: __S(10, __c2, 2) as any as S.Schema<GetAlternateContactResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlternateContact",
}));

export type GetContactInformationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the primary contact information of an Amazon Web Services account.
 *
 * For complete details about how to use the primary contact operations, see Update the primary contact for your Amazon Web Services account.
 */
export const getContactInformation: API.OperationMethod<
  GetContactInformationRequest,
  GetContactInformationResponse,
  GetContactInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(12, __c3, 0) as any as S.Schema<GetContactInformationRequest>,
  output: __S(13, __c3, 1) as any as S.Schema<GetContactInformationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactInformation",
}));

export type GetGovCloudAccountInformationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the GovCloud account linked to the specified standard account (if it exists) including the GovCloud account ID and state. To use this API, an IAM user or role must have the `account:GetGovCloudAccountInformation` IAM permission.
 */
export const getGovCloudAccountInformation: API.OperationMethod<
  GetGovCloudAccountInformationRequest,
  GetGovCloudAccountInformationResponse,
  GetGovCloudAccountInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<GetGovCloudAccountInformationRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<GetGovCloudAccountInformationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGovCloudAccountInformation",
}));

export type GetPrimaryEmailError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the primary email address for the specified account.
 */
export const getPrimaryEmail: API.OperationMethod<
  GetPrimaryEmailRequest,
  GetPrimaryEmailResponse,
  GetPrimaryEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c6, 0) as any as S.Schema<GetPrimaryEmailRequest>,
  output: __S(25, __c6, 1) as any as S.Schema<GetPrimaryEmailResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrimaryEmail",
}));

export type GetPrimaryEmailUpdateStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status of the most recent primary email update for the specified account. For complete details about how to update the primary email address, see Update the primary email address for your AWS account.
 */
export const getPrimaryEmailUpdateStatus: API.OperationMethod<
  GetPrimaryEmailUpdateStatusRequest,
  GetPrimaryEmailUpdateStatusResponse,
  GetPrimaryEmailUpdateStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<GetPrimaryEmailUpdateStatusRequest>,
  output: __S(29, __c7, 1) as any as S.Schema<GetPrimaryEmailUpdateStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrimaryEmailUpdateStatus",
}));

export type GetRegionOptStatusError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the opt-in status of a particular Region.
 */
export const getRegionOptStatus: API.OperationMethod<
  GetRegionOptStatusRequest,
  GetRegionOptStatusResponse,
  GetRegionOptStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<GetRegionOptStatusRequest>,
  output: __S(76, __c19, 0) as any as S.Schema<GetRegionOptStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegionOptStatus",
}));

export type ListRegionsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Regions for a given account and their respective opt-in statuses. Optionally, this list can be filtered by the `region-opt-status-contains` parameter.
 */
export const listRegions: API.PaginatedOperationMethod<
  ListRegionsRequest,
  ListRegionsResponse,
  ListRegionsError,
  Credentials | HttpClient.HttpClient,
  Region
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(37, __c9, 1) as any as S.Schema<ListRegionsRequest>,
  output: __S(39, __c9, 3) as any as S.Schema<ListRegionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAccountNameError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the account name of the specified account. To use this API, IAM principals must have the `account:PutAccountName` IAM permission.
 */
export const putAccountName: API.OperationMethod<
  PutAccountNameRequest,
  PutAccountNameResponse,
  PutAccountNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<PutAccountNameRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<PutAccountNameResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountName",
}));

export type PutAlternateContactError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the specified alternate contact attached to an Amazon Web Services account.
 *
 * For complete details about how to use the alternate contact operations, see Update the alternate contacts for your Amazon Web Services account.
 *
 * Before you can update the alternate contact information for an Amazon Web Services account that is managed by Organizations, you must first enable integration between Amazon Web Services Account Management and Organizations. For more information, see Enable trusted access for Amazon Web Services Account Management.
 */
export const putAlternateContact: API.OperationMethod<
  PutAlternateContactRequest,
  PutAlternateContactResponse,
  PutAlternateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<PutAlternateContactRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<PutAlternateContactResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlternateContact",
}));

export type PutContactInformationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the primary contact information of an Amazon Web Services account.
 *
 * For complete details about how to use the primary contact operations, see Update the primary contact for your Amazon Web Services account.
 */
export const putContactInformation: API.OperationMethod<
  PutContactInformationRequest,
  PutContactInformationResponse,
  PutContactInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c12, 0) as any as S.Schema<PutContactInformationRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<PutContactInformationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContactInformation",
}));

export type SendPhoneNumberVerificationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Sends a one-time passcode to the phone number in the primary contact information of an Amazon Web Services account. Use VerifyPhoneNumber to submit the passcode and complete the verification.
 *
 * For complete details about how to use the primary contact operations, see Update the primary contact for your Amazon Web Services account.
 */
export const sendPhoneNumberVerification: API.OperationMethod<
  SendPhoneNumberVerificationRequest,
  SendPhoneNumberVerificationResponse,
  SendPhoneNumberVerificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<SendPhoneNumberVerificationRequest>,
  output: __S(72, __c18, 0) as any as S.Schema<SendPhoneNumberVerificationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendPhoneNumberVerification",
}));

export type StartPrimaryEmailUpdateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Starts the process to update the primary email address for the specified account.
 */
export const startPrimaryEmailUpdate: API.OperationMethod<
  StartPrimaryEmailUpdateRequest,
  StartPrimaryEmailUpdateResponse,
  StartPrimaryEmailUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<StartPrimaryEmailUpdateRequest>,
  output: __S(72, __c18, 0) as any as S.Schema<StartPrimaryEmailUpdateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPrimaryEmailUpdate",
}));

export type VerifyPhoneNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Verifies the phone number in the primary contact information of an Amazon Web Services account by submitting the one-time passcode that SendPhoneNumberVerification sent to that phone number.
 *
 * For complete details about how to use the primary contact operations, see Update the primary contact for your Amazon Web Services account.
 */
export const verifyPhoneNumber: API.OperationMethod<
  VerifyPhoneNumberRequest,
  VerifyPhoneNumberResponse,
  VerifyPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<VerifyPhoneNumberRequest>,
  output: __S(72, __c18, 0) as any as S.Schema<VerifyPhoneNumberResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyPhoneNumber",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), RegionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/enableRegion" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "EnableRegionRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getAccountInformation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountInformationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          AccountName: S.optional(SensitiveString),
          AccountCreatedDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          AccountState: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetAccountInformationResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlternateContactType: S.String, AccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getAlternateContact" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAlternateContactRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(SensitiveString),
          Title: S.optional(SensitiveString),
          EmailAddress: S.optional(SensitiveString),
          PhoneNumber: S.optional(SensitiveString),
          AlternateContactType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AlternateContact" });
    case 2:
      return S.suspend(() => S.Struct({ AlternateContact: S.optional(__S(9, __c2, 1)) })).annotate({
        identifier: "GetAlternateContactResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getContactInformation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContactInformationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContactInformation: S.optional(__S(16, __c4, 0)),
          VerificationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetContactInformationResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FullName: SensitiveString,
          AddressLine1: SensitiveString,
          AddressLine2: S.optional(SensitiveString),
          AddressLine3: S.optional(SensitiveString),
          City: SensitiveString,
          StateOrRegion: S.optional(SensitiveString),
          DistrictOrCounty: S.optional(SensitiveString),
          PostalCode: SensitiveString,
          CountryCode: SensitiveString,
          PhoneNumber: SensitiveString,
          CompanyName: S.optional(SensitiveString),
          WebsiteUrl: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "ContactInformation" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StandardAccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getGovCloudAccountInformation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGovCloudAccountInformationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GovCloudAccountId: S.String, AccountState: S.String }),
      ).annotate({ identifier: "GetGovCloudAccountInformationResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/getPrimaryEmail" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPrimaryEmailRequest" });
    case 1:
      return S.suspend(() => S.Struct({ PrimaryEmail: S.optional(SensitiveString) })).annotate({
        identifier: "GetPrimaryEmailResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getPrimaryEmailUpdateStatus" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPrimaryEmailUpdateStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetPrimaryEmailUpdateStatusResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), RegionName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/getRegionOptStatus" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRegionOptStatusRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          RegionOptStatusContains: S.optional(__S(36, __c9, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listRegions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRegionsRequest" });
    case 2:
      return S.Array(Region);
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Regions: S.optional(__S(38, __c9, 2)) }),
      ).annotate({ identifier: "ListRegionsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountName: SensitiveString, AccountId: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/putAccountName" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAccountNameRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: SensitiveString,
          Title: SensitiveString,
          EmailAddress: SensitiveString,
          PhoneNumber: SensitiveString,
          AlternateContactType: S.String,
          AccountId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/putAlternateContact" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAlternateContactRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ContactInformation: __S(16, __c4, 0), AccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/putContactInformation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutContactInformationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/sendPhoneNumberVerification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SendPhoneNumberVerificationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, PrimaryEmail: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/startPrimaryEmailUpdate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartPrimaryEmailUpdateRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), Otp: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/verifyPhoneNumber" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "VerifyPhoneNumberRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: SensitiveString })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(64, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.String, PrimaryEmail: SensitiveString, Otp: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/acceptPrimaryEmailUpdate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptPrimaryEmailUpdateRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "AcceptPrimaryEmailUpdateResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RegionName: S.optional(S.String), RegionOptStatus: S.optional(S.String) }),
      ).annotate({ identifier: "GetRegionOptStatusResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AlternateContactType: S.String, AccountId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteAlternateContact" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAlternateContactRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteAlternateContactResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AccountId: S.optional(S.String), RegionName: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/disableRegion" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisableRegionRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
