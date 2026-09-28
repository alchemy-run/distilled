import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restJson1Protocol } from "../protocols/rest-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Account",
  target: "Account",
  version: "2021-02-01",
  sigv4: "account",
  protocol: restJson1Protocol,
  rules: (p, _) => {
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://account.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(PartitionResult),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
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
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
    headers: { errorType: "x-amzn-ErrorType" },
  })<{ readonly message: string; readonly errorType?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
    headers: { errorType: "x-amzn-ErrorType" },
  })<{ readonly message: string; readonly errorType?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { errorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly errorType?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404, headers: { errorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly errorType?: string }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("ResourceUnavailableException", [], {
    status: 424,
    headers: { errorType: "x-amzn-ErrorType" },
  })<{ readonly message: string; readonly errorType?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { errorType: "x-amzn-ErrorType" } },
  )<{ readonly message: string; readonly errorType?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string | redacted.Redacted<string>;
    readonly reason?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export interface GetContactInformationResponse {
  ContactInformation?: ContactInformation;
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
export interface StartPrimaryEmailUpdateRequest {
  AccountId: string;
  PrimaryEmail: string | redacted.Redacted<string>;
}
export interface StartPrimaryEmailUpdateResponse {
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
  descriptor: {
    service: svc,
    http: "POST /acceptPrimaryEmailUpdate",
    input: { AccountId: 0, PrimaryEmail: 0, Otp: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteAlternateContact",
    input: { AlternateContactType: 0, AccountId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /disableRegion",
    input: { AccountId: 0, RegionName: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /enableRegion",
    input: { AccountId: 0, RegionName: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getAccountInformation",
    input: { AccountId: 0 },
    output: { AccountName: D.secret, AccountCreatedDate: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountInformation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getAlternateContact",
    input: { AlternateContactType: 0, AccountId: 0 },
    output: {
      AlternateContact: {
        Name: D.secret,
        Title: D.secret,
        EmailAddress: D.secret,
        PhoneNumber: D.secret,
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getContactInformation",
    input: { AccountId: 0 },
    output: {
      ContactInformation: {
        FullName: D.secret,
        AddressLine1: D.secret,
        AddressLine2: D.secret,
        AddressLine3: D.secret,
        City: D.secret,
        StateOrRegion: D.secret,
        DistrictOrCounty: D.secret,
        PostalCode: D.secret,
        CountryCode: D.secret,
        PhoneNumber: D.secret,
        CompanyName: D.secret,
        WebsiteUrl: D.secret,
      },
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getGovCloudAccountInformation",
    input: { StandardAccountId: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getPrimaryEmail",
    input: { AccountId: 0 },
    output: { PrimaryEmail: D.secret },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getPrimaryEmailUpdateStatus",
    input: { AccountId: 0 },
    output: { UpdatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /getRegionOptStatus",
    input: { AccountId: 0, RegionName: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegionOptStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /listRegions",
    input: {
      AccountId: 0,
      MaxResults: 0,
      NextToken: 0,
      RegionOptStatusContains: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /putAccountName",
    input: { AccountName: 0, AccountId: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountName",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /putAlternateContact",
    input: {
      Name: 0,
      Title: 0,
      EmailAddress: 0,
      PhoneNumber: 0,
      AlternateContactType: 0,
      AccountId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlternateContact",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /putContactInformation",
    input: {
      ContactInformation: {
        FullName: 0,
        AddressLine1: 0,
        AddressLine2: 0,
        AddressLine3: 0,
        City: 0,
        StateOrRegion: 0,
        DistrictOrCounty: 0,
        PostalCode: 0,
        CountryCode: 0,
        PhoneNumber: 0,
        CompanyName: 0,
        WebsiteUrl: 0,
      },
      AccountId: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContactInformation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /startPrimaryEmailUpdate",
    input: { AccountId: 0, PrimaryEmail: 0 },
    body: true,
  },
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
})) as any;
