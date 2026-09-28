import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Cognito Identity Provider",
  target: "AWSCognitoIdentityProviderService",
  version: "2016-04-18",
  sigv4: "cognito-idp",
  protocol: awsJson1_1Protocol,
  xmlns: "http://cognito-idp.amazonaws.com/doc/2016-04-18/",
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
              if (Region === "us-east-1") {
                return e("https://cognito-idp-fips.us-east-1.amazonaws.com");
              }
              if (Region === "us-east-2") {
                return e("https://cognito-idp-fips.us-east-2.amazonaws.com");
              }
              if (Region === "us-west-1") {
                return e("https://cognito-idp-fips.us-west-1.amazonaws.com");
              }
              if (Region === "us-west-2") {
                return e("https://cognito-idp-fips.us-west-2.amazonaws.com");
              }
              return e(
                `https://cognito-idp-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cognito-idp-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              if ("aws" === _.getAttr(PartitionResult, "name")) {
                return e(`https://cognito-idp.${Region}.amazonaws.com`);
              }
              return e(
                `https://cognito-idp.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cognito-idp.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class AliasExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "AliasExistsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CodeDeliveryFailureException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeDeliveryFailureException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class CodeMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "CodeMismatchException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DeviceKeyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "DeviceKeyExistsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateProviderException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateProviderException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class EnableSoftwareTokenMFAException
  extends /*@__PURE__*/ TE.TaggedError(
    "EnableSoftwareTokenMFAException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ExpiredCodeException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExpiredCodeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class FeatureUnavailableInTierException
  extends /*@__PURE__*/ TE.TaggedError(
    "FeatureUnavailableInTierException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class GroupExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "GroupExistsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalErrorException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError("InternalServerException")<{
    readonly message?: string;
  }> {}
export class InvalidEmailRoleAccessPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEmailRoleAccessPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidLambdaResponseException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidLambdaResponseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidOAuthFlowException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidOAuthFlowException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidParameterException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly reasonCode?: string }> {}
export class InvalidPasswordException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidPasswordException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSmsRoleAccessPolicyException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSmsRoleAccessPolicyException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSmsRoleTrustRelationshipException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSmsRoleTrustRelationshipException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidUserPoolConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidUserPoolConfigurationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ManagedLoginBrandingExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ManagedLoginBrandingExistsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class MFAMethodNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "MFAMethodNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class NotAuthorizedException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotAuthorizedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class OperationNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotEnabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PasswordHistoryPolicyViolationException
  extends /*@__PURE__*/ TE.TaggedError(
    "PasswordHistoryPolicyViolationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PasswordResetRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "PasswordResetRequiredException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class PreconditionNotMetException
  extends /*@__PURE__*/ TE.TaggedError(
    "PreconditionNotMetException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class RefreshTokenReuseException
  extends /*@__PURE__*/ TE.TaggedError(
    "RefreshTokenReuseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ScopeDoesNotExistException
  extends /*@__PURE__*/ TE.TaggedError(
    "ScopeDoesNotExistException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class SoftwareTokenMFANotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "SoftwareTokenMFANotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TermsExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TermsExistsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TierChangeNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "TierChangeNotAllowedException",
    ["AuthError"],
    { status: 403 },
  )<{ readonly message?: string }> {}
export class TooManyFailedAttemptsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyFailedAttemptsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class UnexpectedLambdaException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnexpectedLambdaException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedIdentityProviderException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedIdentityProviderException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedOperationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedTokenTypeException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedTokenTypeException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedUserStateException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedUserStateException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UserImportInProgressException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserImportInProgressException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UserLambdaValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserLambdaValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UsernameExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "UsernameExistsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UserNotConfirmedException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserNotConfirmedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UserNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class UserPoolAddOnNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserPoolAddOnNotEnabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class UserPoolTaggingException
  extends /*@__PURE__*/ TE.TaggedError(
    "UserPoolTaggingException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WebAuthnChallengeNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "WebAuthnChallengeNotFoundException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WebAuthnClientMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "WebAuthnClientMismatchException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WebAuthnConfigurationMissingException
  extends /*@__PURE__*/ TE.TaggedError(
    "WebAuthnConfigurationMissingException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WebAuthnCredentialNotSupportedException
  extends /*@__PURE__*/ TE.TaggedError(
    "WebAuthnCredentialNotSupportedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WebAuthnNotEnabledException
  extends /*@__PURE__*/ TE.TaggedError(
    "WebAuthnNotEnabledException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WebAuthnOriginNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "WebAuthnOriginNotAllowedException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class WebAuthnRelyingPartyMismatchException
  extends /*@__PURE__*/ TE.TaggedError(
    "WebAuthnRelyingPartyMismatchException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type UserPoolIdType = string;
export type CustomAttributeNameType = string;
export type AttributeDataType =
  | "String"
  | "Number"
  | "DateTime"
  | "Boolean"
  | (string & {});
export type StringType = string;
export interface NumberAttributeConstraintsType {
  MinValue?: string;
  MaxValue?: string;
}
export interface StringAttributeConstraintsType {
  MinLength?: string;
  MaxLength?: string;
}
export interface SchemaAttributeType {
  Name?: string;
  AttributeDataType?: AttributeDataType;
  DeveloperOnlyAttribute?: boolean;
  Mutable?: boolean;
  Required?: boolean;
  NumberAttributeConstraints?: NumberAttributeConstraintsType;
  StringAttributeConstraints?: StringAttributeConstraintsType;
}
export type CustomAttributesListType = SchemaAttributeType[];
export interface AddCustomAttributesRequest {
  UserPoolId: string;
  CustomAttributes: SchemaAttributeType[];
}
export interface AddCustomAttributesResponse {}
export type ClientIdType = string | redacted.Redacted<string>;
export type ClientSecretType = string | redacted.Redacted<string>;
export interface AddUserPoolClientSecretRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
}
export type ClientSecretIdType = string;
export interface ClientSecretDescriptorType {
  ClientSecretId?: string;
  ClientSecretValue?: string | redacted.Redacted<string>;
  ClientSecretCreateDate?: Date;
}
export interface AddUserPoolClientSecretResponse {
  ClientSecretDescriptor?: ClientSecretDescriptorType;
}
export type UsernameType = string | redacted.Redacted<string>;
export type GroupNameType = string;
export interface AdminAddUserToGroupRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  GroupName: string;
}
export interface AdminAddUserToGroupResponse {}
export type ClientMetadataType = { [key: string]: string | undefined };
export interface AdminConfirmSignUpRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface AdminConfirmSignUpResponse {}
export type AttributeNameType = string;
export type AttributeValueType = string | redacted.Redacted<string>;
export interface AttributeType {
  Name: string;
  Value?: string | redacted.Redacted<string>;
}
export type AttributeListType = AttributeType[];
export type PasswordType = string | redacted.Redacted<string>;
export type ForceAliasCreation = boolean;
export type MessageActionType = "RESEND" | "SUPPRESS" | (string & {});
export type DeliveryMediumType = "SMS" | "EMAIL" | (string & {});
export type DeliveryMediumListType = DeliveryMediumType[];
export interface AdminCreateUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  UserAttributes?: AttributeType[];
  ValidationData?: AttributeType[];
  TemporaryPassword?: string | redacted.Redacted<string>;
  ForceAliasCreation?: boolean;
  MessageAction?: MessageActionType;
  DesiredDeliveryMediums?: DeliveryMediumType[];
  ClientMetadata?: { [key: string]: string | undefined };
}
export type UserStatusType =
  | "UNCONFIRMED"
  | "CONFIRMED"
  | "ARCHIVED"
  | "COMPROMISED"
  | "UNKNOWN"
  | "RESET_REQUIRED"
  | "FORCE_CHANGE_PASSWORD"
  | "EXTERNAL_PROVIDER"
  | (string & {});
export interface MFAOptionType {
  DeliveryMedium?: DeliveryMediumType;
  AttributeName?: string;
}
export type MFAOptionListType = MFAOptionType[];
export interface UserType {
  Username?: string | redacted.Redacted<string>;
  Attributes?: AttributeType[];
  UserCreateDate?: Date;
  UserLastModifiedDate?: Date;
  Enabled?: boolean;
  UserStatus?: UserStatusType;
  MFAOptions?: MFAOptionType[];
}
export interface AdminCreateUserResponse {
  User?: UserType;
}
export interface AdminDeleteSoftwareTokenRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export interface AdminDeleteSoftwareTokenResponse {}
export interface AdminDeleteUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export interface AdminDeleteUserResponse {}
export type AttributeNameListType = string[];
export interface AdminDeleteUserAttributesRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  UserAttributeNames: string[];
}
export interface AdminDeleteUserAttributesResponse {}
export type ProviderNameType = string;
export interface ProviderUserIdentifierType {
  ProviderName?: string;
  ProviderAttributeName?: string;
  ProviderAttributeValue?: string;
}
export interface AdminDisableProviderForUserRequest {
  UserPoolId: string;
  User: ProviderUserIdentifierType;
}
export interface AdminDisableProviderForUserResponse {}
export interface AdminDisableUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export interface AdminDisableUserResponse {}
export interface AdminEnableUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export interface AdminEnableUserResponse {}
export type DeviceKeyType = string;
export interface AdminForgetDeviceRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  DeviceKey: string;
}
export interface AdminForgetDeviceResponse {}
export interface AdminGetDeviceRequest {
  DeviceKey: string;
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export interface DeviceType {
  DeviceKey?: string;
  DeviceAttributes?: AttributeType[];
  DeviceCreateDate?: Date;
  DeviceLastModifiedDate?: Date;
  DeviceLastAuthenticatedDate?: Date;
}
export interface AdminGetDeviceResponse {
  Device: DeviceType;
}
export interface AdminGetUserRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export type UserMFASettingListType = string[];
export interface AdminGetUserResponse {
  Username: string | redacted.Redacted<string>;
  UserAttributes?: AttributeType[];
  UserCreateDate?: Date;
  UserLastModifiedDate?: Date;
  Enabled?: boolean;
  UserStatus?: UserStatusType;
  MFAOptions?: MFAOptionType[];
  PreferredMfaSetting?: string;
  UserMFASettingList?: string[];
}
export interface AdminGetUserAuthFactorsRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export type AuthFactorType =
  | "PASSWORD"
  | "EMAIL_OTP"
  | "SMS_OTP"
  | "WEB_AUTHN"
  | "SOFTWARE_TOKEN"
  | (string & {});
export type ConfiguredUserAuthFactorsListType = AuthFactorType[];
export interface AdminGetUserAuthFactorsResponse {
  Username: string | redacted.Redacted<string>;
  PreferredMfaSetting?: string;
  UserMFASettingList?: string[];
  ConfiguredUserAuthFactors?: AuthFactorType[];
}
export type AuthFlowType =
  | "USER_SRP_AUTH"
  | "REFRESH_TOKEN_AUTH"
  | "REFRESH_TOKEN"
  | "CUSTOM_AUTH"
  | "ADMIN_NO_SRP_AUTH"
  | "USER_PASSWORD_AUTH"
  | "ADMIN_USER_PASSWORD_AUTH"
  | "USER_AUTH"
  | (string & {});
export type AuthParametersType = { [key: string]: string | undefined };
export interface AnalyticsMetadataType {
  AnalyticsEndpointId?: string;
}
export interface HttpHeader {
  headerName?: string;
  headerValue?: string;
}
export type HttpHeaderList = HttpHeader[];
export interface ContextDataType {
  IpAddress: string;
  ServerName: string;
  ServerPath: string;
  HttpHeaders: HttpHeader[];
  EncodedData?: string;
}
export type SessionType = string | redacted.Redacted<string>;
export interface AdminInitiateAuthRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  AuthFlow: AuthFlowType;
  AuthParameters?: { [key: string]: string | undefined };
  ClientMetadata?: { [key: string]: string | undefined };
  AnalyticsMetadata?: AnalyticsMetadataType;
  ContextData?: ContextDataType;
  Session?: string | redacted.Redacted<string>;
}
export type ChallengeNameType =
  | "SMS_MFA"
  | "EMAIL_OTP"
  | "SOFTWARE_TOKEN_MFA"
  | "SELECT_MFA_TYPE"
  | "MFA_SETUP"
  | "PASSWORD_VERIFIER"
  | "CUSTOM_CHALLENGE"
  | "SELECT_CHALLENGE"
  | "DEVICE_SRP_AUTH"
  | "DEVICE_PASSWORD_VERIFIER"
  | "ADMIN_NO_SRP_AUTH"
  | "NEW_PASSWORD_REQUIRED"
  | "SMS_OTP"
  | "PASSWORD"
  | "WEB_AUTHN"
  | "PASSWORD_SRP"
  | (string & {});
export type ChallengeParametersType = { [key: string]: string | undefined };
export type TokenModelType = string | redacted.Redacted<string>;
export type IntegerType = number;
export interface NewDeviceMetadataType {
  DeviceKey?: string;
  DeviceGroupKey?: string;
}
export interface AuthenticationResultType {
  AccessToken?: string | redacted.Redacted<string>;
  ExpiresIn?: number;
  TokenType?: string;
  RefreshToken?: string | redacted.Redacted<string>;
  IdToken?: string | redacted.Redacted<string>;
  NewDeviceMetadata?: NewDeviceMetadataType;
}
export type AvailableChallengeListType = ChallengeNameType[];
export interface AdminInitiateAuthResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
  AvailableChallenges?: ChallengeNameType[];
}
export interface AdminLinkProviderForUserRequest {
  UserPoolId: string;
  DestinationUser: ProviderUserIdentifierType;
  SourceUser: ProviderUserIdentifierType;
}
export interface AdminLinkProviderForUserResponse {}
export type QueryLimitType = number;
export type SearchPaginationTokenType = string;
export interface AdminListDevicesRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  Limit?: number;
  PaginationToken?: string;
}
export type DeviceListType = DeviceType[];
export interface AdminListDevicesResponse {
  Devices?: DeviceType[];
  PaginationToken?: string;
}
export type PaginationKey = string;
export interface AdminListGroupsForUserRequest {
  Username: string | redacted.Redacted<string>;
  UserPoolId: string;
  Limit?: number;
  NextToken?: string;
}
export type DescriptionType = string;
export type ArnType = string;
export type PrecedenceType = number;
export interface GroupType {
  GroupName?: string;
  UserPoolId?: string;
  Description?: string;
  RoleArn?: string;
  Precedence?: number;
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export type GroupListType = GroupType[];
export interface AdminListGroupsForUserResponse {
  Groups?: GroupType[];
  NextToken?: string;
}
export interface AdminListUserAuthEventsRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  MaxResults?: number;
  NextToken?: string;
}
export type EventType =
  | "SignIn"
  | "SignUp"
  | "ForgotPassword"
  | "PasswordChange"
  | "ResendCode"
  | (string & {});
export type EventResponseType = "Pass" | "Fail" | "InProgress" | (string & {});
export type RiskDecisionType =
  | "NoRisk"
  | "AccountTakeover"
  | "Block"
  | (string & {});
export type RiskLevelType = "Low" | "Medium" | "High" | (string & {});
export type WrappedBooleanType = boolean;
export interface EventRiskType {
  RiskDecision?: RiskDecisionType;
  RiskLevel?: RiskLevelType;
  CompromisedCredentialsDetected?: boolean;
}
export type ChallengeName = "Password" | "Mfa" | (string & {});
export type ChallengeResponse = "Success" | "Failure" | (string & {});
export interface ChallengeResponseType {
  ChallengeName?: ChallengeName;
  ChallengeResponse?: ChallengeResponse;
}
export type ChallengeResponseListType = ChallengeResponseType[];
export interface EventContextDataType {
  IpAddress?: string;
  DeviceName?: string;
  Timezone?: string;
  City?: string;
  Country?: string;
}
export type FeedbackValueType = "Valid" | "Invalid" | (string & {});
export interface EventFeedbackType {
  FeedbackValue: FeedbackValueType;
  Provider: string;
  FeedbackDate?: Date;
}
export interface AuthEventType {
  EventId?: string;
  EventType?: EventType;
  CreationDate?: Date;
  EventResponse?: EventResponseType;
  EventRisk?: EventRiskType;
  ChallengeResponses?: ChallengeResponseType[];
  EventContextData?: EventContextDataType;
  EventFeedback?: EventFeedbackType;
}
export type AuthEventsType = AuthEventType[];
export interface AdminListUserAuthEventsResponse {
  AuthEvents?: AuthEventType[];
  NextToken?: string;
}
export interface AdminRemoveUserFromGroupRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  GroupName: string;
}
export interface AdminRemoveUserFromGroupResponse {}
export interface AdminResetUserPasswordRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface AdminResetUserPasswordResponse {}
export type ChallengeResponsesType = { [key: string]: string | undefined };
export interface AdminRespondToAuthChallengeRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ChallengeName: ChallengeNameType;
  ChallengeResponses?: { [key: string]: string | undefined };
  Session?: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  ContextData?: ContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface AdminRespondToAuthChallengeResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
}
export interface SMSMfaSettingsType {
  Enabled?: boolean;
  PreferredMfa?: boolean;
}
export interface SoftwareTokenMfaSettingsType {
  Enabled?: boolean;
  PreferredMfa?: boolean;
}
export interface EmailMfaSettingsType {
  Enabled?: boolean;
  PreferredMfa?: boolean;
}
export interface WebAuthnMfaSettingsType {
  Enabled?: boolean;
}
export interface AdminSetUserMFAPreferenceRequest {
  SMSMfaSettings?: SMSMfaSettingsType;
  SoftwareTokenMfaSettings?: SoftwareTokenMfaSettingsType;
  EmailMfaSettings?: EmailMfaSettingsType;
  WebAuthnMfaSettings?: WebAuthnMfaSettingsType;
  Username: string | redacted.Redacted<string>;
  UserPoolId: string;
}
export interface AdminSetUserMFAPreferenceResponse {}
export interface AdminSetUserPasswordRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  Password: string | redacted.Redacted<string>;
  Permanent?: boolean;
}
export interface AdminSetUserPasswordResponse {}
export interface AdminSetUserSettingsRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  MFAOptions: MFAOptionType[];
}
export interface AdminSetUserSettingsResponse {}
export type EventIdType = string;
export interface AdminUpdateAuthEventFeedbackRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  EventId: string;
  FeedbackValue: FeedbackValueType;
}
export interface AdminUpdateAuthEventFeedbackResponse {}
export type DeviceRememberedStatusType =
  | "remembered"
  | "not_remembered"
  | (string & {});
export interface AdminUpdateDeviceStatusRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  DeviceKey: string;
  DeviceRememberedStatus?: DeviceRememberedStatusType;
}
export interface AdminUpdateDeviceStatusResponse {}
export interface AdminUpdateUserAttributesRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  UserAttributes: AttributeType[];
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface AdminUpdateUserAttributesResponse {}
export interface AdminUserGlobalSignOutRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
}
export interface AdminUserGlobalSignOutResponse {}
export interface AssociateSoftwareTokenRequest {
  AccessToken?: string | redacted.Redacted<string>;
  Session?: string | redacted.Redacted<string>;
}
export type SecretCodeType = string | redacted.Redacted<string>;
export interface AssociateSoftwareTokenResponse {
  SecretCode?: string | redacted.Redacted<string>;
  Session?: string | redacted.Redacted<string>;
}
export interface ChangePasswordRequest {
  PreviousPassword?: string | redacted.Redacted<string>;
  ProposedPassword: string | redacted.Redacted<string>;
  AccessToken: string | redacted.Redacted<string>;
}
export interface ChangePasswordResponse {}
export type Document = unknown;
export interface CompleteWebAuthnRegistrationRequest {
  AccessToken: string | redacted.Redacted<string>;
  Credential: any;
}
export interface CompleteWebAuthnRegistrationResponse {}
export interface DeviceSecretVerifierConfigType {
  PasswordVerifier?: string;
  Salt?: string;
}
export type DeviceNameType = string;
export interface ConfirmDeviceRequest {
  AccessToken: string | redacted.Redacted<string>;
  DeviceKey: string;
  DeviceSecretVerifierConfig?: DeviceSecretVerifierConfigType;
  DeviceName?: string;
}
export interface ConfirmDeviceResponse {
  UserConfirmationNecessary?: boolean;
}
export type SecretHashType = string | redacted.Redacted<string>;
export type ConfirmationCodeType = string;
export interface UserContextDataType {
  IpAddress?: string;
  EncodedData?: string;
}
export interface ConfirmForgotPasswordRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  Username: string | redacted.Redacted<string>;
  ConfirmationCode: string;
  Password: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface ConfirmForgotPasswordResponse {}
export interface ConfirmSignUpRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  Username: string | redacted.Redacted<string>;
  ConfirmationCode: string;
  ForceAliasCreation?: boolean;
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
  Session?: string | redacted.Redacted<string>;
}
export interface ConfirmSignUpResponse {
  Session?: string | redacted.Redacted<string>;
}
export interface CreateGroupRequest {
  GroupName: string;
  UserPoolId: string;
  Description?: string;
  RoleArn?: string;
  Precedence?: number;
}
export interface CreateGroupResponse {
  Group?: GroupType;
}
export type ProviderNameTypeV2 = string;
export type IdentityProviderTypeType =
  | "SAML"
  | "Facebook"
  | "Google"
  | "LoginWithAmazon"
  | "SignInWithApple"
  | "OIDC"
  | (string & {});
export type ProviderDetailsType = { [key: string]: string | undefined };
export type AttributeMappingKeyType = string;
export type AttributeMappingType = { [key: string]: string | undefined };
export type IdpIdentifierType = string;
export type IdpIdentifiersListType = string[];
export interface CreateIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
  ProviderType: IdentityProviderTypeType;
  ProviderDetails: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
}
export interface IdentityProviderType {
  UserPoolId?: string;
  ProviderName?: string;
  ProviderType?: IdentityProviderTypeType;
  ProviderDetails?: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export interface CreateIdentityProviderResponse {
  IdentityProvider: IdentityProviderType;
}
export type AssetCategoryType =
  | "FAVICON_ICO"
  | "FAVICON_SVG"
  | "EMAIL_GRAPHIC"
  | "SMS_GRAPHIC"
  | "AUTH_APP_GRAPHIC"
  | "PASSWORD_GRAPHIC"
  | "PASSKEY_GRAPHIC"
  | "PAGE_HEADER_LOGO"
  | "PAGE_HEADER_BACKGROUND"
  | "PAGE_FOOTER_LOGO"
  | "PAGE_FOOTER_BACKGROUND"
  | "PAGE_BACKGROUND"
  | "FORM_BACKGROUND"
  | "FORM_LOGO"
  | "IDP_BUTTON_ICON"
  | (string & {});
export type ColorSchemeModeType = "LIGHT" | "DARK" | "DYNAMIC" | (string & {});
export type AssetExtensionType =
  | "ICO"
  | "JPEG"
  | "PNG"
  | "SVG"
  | "WEBP"
  | (string & {});
export type AssetBytesType = Uint8Array;
export type ResourceIdType = string;
export interface AssetType {
  Category: AssetCategoryType;
  ColorMode: ColorSchemeModeType;
  Extension: AssetExtensionType;
  Bytes?: Uint8Array;
  ResourceId?: string;
}
export type AssetListType = AssetType[];
export interface CreateManagedLoginBrandingRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  UseCognitoProvidedValues?: boolean;
  Settings?: any;
  Assets?: AssetType[];
}
export type ManagedLoginBrandingIdType = string;
export interface ManagedLoginBrandingType {
  ManagedLoginBrandingId?: string;
  UserPoolId?: string;
  UseCognitoProvidedValues?: boolean;
  Settings?: any;
  Assets?: AssetType[];
  CreationDate?: Date;
  LastModifiedDate?: Date;
}
export interface CreateManagedLoginBrandingResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export type ResourceServerIdentifierType = string;
export type ResourceServerNameType = string;
export type ResourceServerScopeNameType = string;
export type ResourceServerScopeDescriptionType = string;
export interface ResourceServerScopeType {
  ScopeName: string;
  ScopeDescription: string;
}
export type ResourceServerScopeListType = ResourceServerScopeType[];
export interface CreateResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
  Name: string;
  Scopes?: ResourceServerScopeType[];
}
export interface ResourceServerType {
  UserPoolId?: string;
  Identifier?: string;
  Name?: string;
  Scopes?: ResourceServerScopeType[];
}
export interface CreateResourceServerResponse {
  ResourceServer: ResourceServerType;
}
export type TermsNameType = string;
export type TermsSourceType = "LINK" | (string & {});
export type TermsEnforcementType = "NONE" | (string & {});
export type LanguageIdType = string;
export type LinkUrlType = string;
export type LinksType = { [key: string]: string | undefined };
export interface CreateTermsRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  TermsName: string;
  TermsSource: TermsSourceType;
  Enforcement: TermsEnforcementType;
  Links?: { [key: string]: string | undefined };
}
export type TermsIdType = string;
export interface TermsType {
  TermsId: string;
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  TermsName: string;
  TermsSource: TermsSourceType;
  Enforcement: TermsEnforcementType;
  Links: { [key: string]: string | undefined };
  CreationDate: Date;
  LastModifiedDate: Date;
}
export interface CreateTermsResponse {
  Terms?: TermsType;
}
export type UserImportJobNameType = string;
export type PasswordHashingAlgorithmType =
  | "BCRYPT"
  | "SCRYPT"
  | "ARGON2ID"
  | "PBKDF2_SHA256"
  | (string & {});
export interface CreateUserImportJobRequest {
  JobName: string;
  UserPoolId: string;
  CloudWatchLogsRoleArn: string;
  PasswordHashingAlgorithm?: PasswordHashingAlgorithmType;
}
export type UserImportJobIdType = string;
export type PreSignedUrlType = string;
export type UserImportJobStatusType =
  | "Created"
  | "Pending"
  | "InProgress"
  | "Stopping"
  | "Expired"
  | "Stopped"
  | "Failed"
  | "Succeeded"
  | (string & {});
export type LongType = number;
export type CompletionMessageType = string;
export interface UserImportJobType {
  JobName?: string;
  JobId?: string;
  UserPoolId?: string;
  PreSignedUrl?: string;
  CreationDate?: Date;
  StartDate?: Date;
  CompletionDate?: Date;
  Status?: UserImportJobStatusType;
  CloudWatchLogsRoleArn?: string;
  ImportedUsers?: number;
  SkippedUsers?: number;
  FailedUsers?: number;
  CompletionMessage?: string;
  PasswordHashingAlgorithm?: PasswordHashingAlgorithmType;
}
export interface CreateUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export type UserPoolNameType = string;
export type PasswordPolicyMinLengthType = number;
export type PasswordHistorySizeType = number;
export type TemporaryPasswordValidityDaysType = number;
export interface PasswordPolicyType {
  MinimumLength?: number;
  RequireUppercase?: boolean;
  RequireLowercase?: boolean;
  RequireNumbers?: boolean;
  RequireSymbols?: boolean;
  PasswordHistorySize?: number;
  TemporaryPasswordValidityDays?: number;
}
export type AllowedFirstAuthFactorsListType = AuthFactorType[];
export interface SignInPolicyType {
  AllowedFirstAuthFactors?: AuthFactorType[];
}
export interface UserPoolPolicyType {
  PasswordPolicy?: PasswordPolicyType;
  SignInPolicy?: SignInPolicyType;
}
export type DeletionProtectionType = "ACTIVE" | "INACTIVE" | (string & {});
export type PreTokenGenerationLambdaVersionType =
  | "V1_0"
  | "V2_0"
  | "V3_0"
  | (string & {});
export interface PreTokenGenerationVersionConfigType {
  LambdaVersion: PreTokenGenerationLambdaVersionType;
  LambdaArn: string;
}
export type CustomSMSSenderLambdaVersionType = "V1_0" | (string & {});
export interface CustomSMSLambdaVersionConfigType {
  LambdaVersion: CustomSMSSenderLambdaVersionType;
  LambdaArn: string;
}
export type CustomEmailSenderLambdaVersionType = "V1_0" | (string & {});
export interface CustomEmailLambdaVersionConfigType {
  LambdaVersion: CustomEmailSenderLambdaVersionType;
  LambdaArn: string;
}
export type InboundFederationLambdaVersionType = "V1_0" | (string & {});
export interface InboundFederationLambdaType {
  LambdaVersion: InboundFederationLambdaVersionType;
  LambdaArn: string;
}
export interface LambdaConfigType {
  PreSignUp?: string;
  CustomMessage?: string;
  PostConfirmation?: string;
  PreAuthentication?: string;
  PostAuthentication?: string;
  DefineAuthChallenge?: string;
  CreateAuthChallenge?: string;
  VerifyAuthChallengeResponse?: string;
  PreTokenGeneration?: string;
  UserMigration?: string;
  PreTokenGenerationConfig?: PreTokenGenerationVersionConfigType;
  CustomSMSSender?: CustomSMSLambdaVersionConfigType;
  CustomEmailSender?: CustomEmailLambdaVersionConfigType;
  KMSKeyID?: string;
  InboundFederation?: InboundFederationLambdaType;
}
export type VerifiedAttributeType = "phone_number" | "email" | (string & {});
export type VerifiedAttributesListType = VerifiedAttributeType[];
export type AliasAttributeType =
  | "phone_number"
  | "email"
  | "preferred_username"
  | (string & {});
export type AliasAttributesListType = AliasAttributeType[];
export type UsernameAttributeType = "phone_number" | "email" | (string & {});
export type UsernameAttributesListType = UsernameAttributeType[];
export type SmsVerificationMessageType = string;
export type EmailVerificationMessageType = string;
export type EmailVerificationSubjectType = string;
export type EmailVerificationMessageByLinkType = string;
export type EmailVerificationSubjectByLinkType = string;
export type DefaultEmailOptionType =
  | "CONFIRM_WITH_LINK"
  | "CONFIRM_WITH_CODE"
  | (string & {});
export interface VerificationMessageTemplateType {
  SmsMessage?: string;
  EmailMessage?: string;
  EmailSubject?: string;
  EmailMessageByLink?: string;
  EmailSubjectByLink?: string;
  DefaultEmailOption?: DefaultEmailOptionType;
}
export type UserPoolMfaType = "OFF" | "ON" | "OPTIONAL" | (string & {});
export type AttributesRequireVerificationBeforeUpdateType =
  VerifiedAttributeType[];
export interface UserAttributeUpdateSettingsType {
  AttributesRequireVerificationBeforeUpdate?: VerifiedAttributeType[];
}
export interface DeviceConfigurationType {
  ChallengeRequiredOnNewDevice?: boolean;
  DeviceOnlyRememberedOnUserPrompt?: boolean;
}
export type EmailAddressType = string;
export type EmailSendingAccountType =
  | "COGNITO_DEFAULT"
  | "DEVELOPER"
  | (string & {});
export type SESConfigurationSet = string;
export interface EmailConfigurationType {
  SourceArn?: string;
  ReplyToEmailAddress?: string;
  EmailSendingAccount?: EmailSendingAccountType;
  From?: string;
  ConfigurationSet?: string;
}
export type OptionalArnType = string;
export type RegionCodeType = string;
export interface EumsSmsConfigurationType {
  CallerArn: string;
  ExternalId?: string;
  OriginationIdentity?: string;
  ConfigurationSetName?: string;
  InEntityId?: string;
  InTemplateId?: string;
  Region?: string;
}
export interface SmsConfigurationType {
  SnsCallerArn?: string;
  ExternalId?: string;
  SnsRegion?: string;
  EumsSms?: EumsSmsConfigurationType;
}
export type TagKeysType = string;
export type TagValueType = string;
export type UserPoolTagsType = { [key: string]: string | undefined };
export type AdminCreateUserUnusedAccountValidityDaysType = number;
export type SmsInviteMessageType = string;
export type EmailInviteMessageType = string;
export interface MessageTemplateType {
  SMSMessage?: string;
  EmailMessage?: string;
  EmailSubject?: string;
}
export interface AdminCreateUserConfigType {
  AllowAdminCreateUserOnly?: boolean;
  UnusedAccountValidityDays?: number;
  InviteMessageTemplate?: MessageTemplateType;
}
export type SchemaAttributesListType = SchemaAttributeType[];
export type AdvancedSecurityModeType =
  | "OFF"
  | "AUDIT"
  | "ENFORCED"
  | (string & {});
export type AdvancedSecurityEnabledModeType =
  | "AUDIT"
  | "ENFORCED"
  | (string & {});
export interface AdvancedSecurityAdditionalFlowsType {
  CustomAuthMode?: AdvancedSecurityEnabledModeType;
}
export interface UserPoolAddOnsType {
  AdvancedSecurityMode: AdvancedSecurityModeType;
  AdvancedSecurityAdditionalFlows?: AdvancedSecurityAdditionalFlowsType;
}
export interface UsernameConfigurationType {
  CaseSensitive: boolean;
}
export type PriorityType = number;
export type RecoveryOptionNameType =
  | "verified_email"
  | "verified_phone_number"
  | "admin_only"
  | (string & {});
export interface RecoveryOptionType {
  Priority: number;
  Name: RecoveryOptionNameType;
}
export type RecoveryMechanismsType = RecoveryOptionType[];
export interface AccountRecoverySettingType {
  RecoveryMechanisms?: RecoveryOptionType[];
}
export type UserPoolTierType = "LITE" | "ESSENTIALS" | "PLUS" | (string & {});
export type EncryptionKeyType =
  | "AWS_OWNED_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
export type EncryptionKeyArnType = string;
export interface KeyConfigurationType {
  KeyType?: EncryptionKeyType;
  KmsKeyArn?: string;
}
export type IssuerType = "ORIGINAL" | "UPDATED" | (string & {});
export interface IssuerConfigurationType {
  Type?: IssuerType;
}
export interface CreateUserPoolRequest {
  PoolName: string;
  Policies?: UserPoolPolicyType;
  DeletionProtection?: DeletionProtectionType;
  LambdaConfig?: LambdaConfigType;
  AutoVerifiedAttributes?: VerifiedAttributeType[];
  AliasAttributes?: AliasAttributeType[];
  UsernameAttributes?: UsernameAttributeType[];
  SmsVerificationMessage?: string;
  EmailVerificationMessage?: string;
  EmailVerificationSubject?: string;
  VerificationMessageTemplate?: VerificationMessageTemplateType;
  SmsAuthenticationMessage?: string;
  MfaConfiguration?: UserPoolMfaType;
  UserAttributeUpdateSettings?: UserAttributeUpdateSettingsType;
  DeviceConfiguration?: DeviceConfigurationType;
  EmailConfiguration?: EmailConfigurationType;
  SmsConfiguration?: SmsConfigurationType;
  UserPoolTags?: { [key: string]: string | undefined };
  AdminCreateUserConfig?: AdminCreateUserConfigType;
  Schema?: SchemaAttributeType[];
  UserPoolAddOns?: UserPoolAddOnsType;
  UsernameConfiguration?: UsernameConfigurationType;
  AccountRecoverySetting?: AccountRecoverySettingType;
  UserPoolTier?: UserPoolTierType;
  KeyConfiguration?: KeyConfigurationType;
  IssuerConfiguration?: IssuerConfigurationType;
}
export type StatusType = "Enabled" | "Disabled" | (string & {});
export type DomainType = string;
export interface UserPoolType {
  Id?: string;
  Name?: string;
  Policies?: UserPoolPolicyType;
  DeletionProtection?: DeletionProtectionType;
  LambdaConfig?: LambdaConfigType;
  Status?: StatusType;
  LastModifiedDate?: Date;
  CreationDate?: Date;
  SchemaAttributes?: SchemaAttributeType[];
  AutoVerifiedAttributes?: VerifiedAttributeType[];
  AliasAttributes?: AliasAttributeType[];
  UsernameAttributes?: UsernameAttributeType[];
  SmsVerificationMessage?: string;
  EmailVerificationMessage?: string;
  EmailVerificationSubject?: string;
  VerificationMessageTemplate?: VerificationMessageTemplateType;
  SmsAuthenticationMessage?: string;
  UserAttributeUpdateSettings?: UserAttributeUpdateSettingsType;
  MfaConfiguration?: UserPoolMfaType;
  DeviceConfiguration?: DeviceConfigurationType;
  EstimatedNumberOfUsers?: number;
  EmailConfiguration?: EmailConfigurationType;
  SmsConfiguration?: SmsConfigurationType;
  UserPoolTags?: { [key: string]: string | undefined };
  SmsConfigurationFailure?: string;
  EmailConfigurationFailure?: string;
  Domain?: string;
  CustomDomain?: string;
  AdminCreateUserConfig?: AdminCreateUserConfigType;
  UserPoolAddOns?: UserPoolAddOnsType;
  UsernameConfiguration?: UsernameConfigurationType;
  Arn?: string;
  AccountRecoverySetting?: AccountRecoverySettingType;
  UserPoolTier?: UserPoolTierType;
  KeyConfiguration?: KeyConfigurationType;
  IssuerConfiguration?: IssuerConfigurationType;
}
export interface CreateUserPoolResponse {
  UserPool?: UserPoolType;
}
export type ClientNameType = string;
export type GenerateSecret = boolean;
export type RefreshTokenValidityType = number;
export type AccessTokenValidityType = number;
export type IdTokenValidityType = number;
export type TimeUnitsType =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | (string & {});
export interface TokenValidityUnitsType {
  AccessToken?: TimeUnitsType;
  IdToken?: TimeUnitsType;
  RefreshToken?: TimeUnitsType;
}
export type ClientPermissionType = string;
export type ClientPermissionListType = string[];
export type ExplicitAuthFlowsType =
  | "ADMIN_NO_SRP_AUTH"
  | "CUSTOM_AUTH_FLOW_ONLY"
  | "USER_PASSWORD_AUTH"
  | "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  | "ALLOW_CUSTOM_AUTH"
  | "ALLOW_USER_PASSWORD_AUTH"
  | "ALLOW_USER_SRP_AUTH"
  | "ALLOW_REFRESH_TOKEN_AUTH"
  | "ALLOW_USER_AUTH"
  | (string & {});
export type ExplicitAuthFlowsListType = ExplicitAuthFlowsType[];
export type SupportedIdentityProvidersListType = string[];
export type RedirectUrlType = string;
export type CallbackURLsListType = string[];
export type LogoutURLsListType = string[];
export type OAuthFlowType =
  | "code"
  | "implicit"
  | "client_credentials"
  | (string & {});
export type OAuthFlowsType = OAuthFlowType[];
export type ScopeType = string;
export type ScopeListType = string[];
export type HexStringType = string;
export interface AnalyticsConfigurationType {
  ApplicationId?: string;
  ApplicationArn?: string;
  RoleArn?: string;
  ExternalId?: string;
  UserDataShared?: boolean;
}
export type PreventUserExistenceErrorTypes =
  | "LEGACY"
  | "ENABLED"
  | (string & {});
export type AuthSessionValidityType = number;
export type FeatureType = "ENABLED" | "DISABLED" | (string & {});
export type RetryGracePeriodSecondsType = number;
export interface RefreshTokenRotationType {
  Feature: FeatureType;
  RetryGracePeriodSeconds?: number;
}
export interface CreateUserPoolClientRequest {
  UserPoolId: string;
  ClientName: string;
  GenerateSecret?: boolean;
  ClientSecret?: string | redacted.Redacted<string>;
  RefreshTokenValidity?: number;
  AccessTokenValidity?: number;
  IdTokenValidity?: number;
  TokenValidityUnits?: TokenValidityUnitsType;
  ReadAttributes?: string[];
  WriteAttributes?: string[];
  ExplicitAuthFlows?: ExplicitAuthFlowsType[];
  SupportedIdentityProviders?: string[];
  CallbackURLs?: string[];
  LogoutURLs?: string[];
  DefaultRedirectURI?: string;
  AllowedOAuthFlows?: OAuthFlowType[];
  AllowedOAuthScopes?: string[];
  AllowedOAuthFlowsUserPoolClient?: boolean;
  AnalyticsConfiguration?: AnalyticsConfigurationType;
  PreventUserExistenceErrors?: PreventUserExistenceErrorTypes;
  EnableTokenRevocation?: boolean;
  EnablePropagateAdditionalUserContextData?: boolean;
  AuthSessionValidity?: number;
  RefreshTokenRotation?: RefreshTokenRotationType;
}
export interface UserPoolClientType {
  UserPoolId?: string;
  ClientName?: string;
  ClientId?: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
  LastModifiedDate?: Date;
  CreationDate?: Date;
  RefreshTokenValidity?: number;
  AccessTokenValidity?: number;
  IdTokenValidity?: number;
  TokenValidityUnits?: TokenValidityUnitsType;
  ReadAttributes?: string[];
  WriteAttributes?: string[];
  ExplicitAuthFlows?: ExplicitAuthFlowsType[];
  SupportedIdentityProviders?: string[];
  CallbackURLs?: string[];
  LogoutURLs?: string[];
  DefaultRedirectURI?: string;
  AllowedOAuthFlows?: OAuthFlowType[];
  AllowedOAuthScopes?: string[];
  AllowedOAuthFlowsUserPoolClient?: boolean;
  AnalyticsConfiguration?: AnalyticsConfigurationType;
  PreventUserExistenceErrors?: PreventUserExistenceErrorTypes;
  EnableTokenRevocation?: boolean;
  EnablePropagateAdditionalUserContextData?: boolean;
  AuthSessionValidity?: number;
  RefreshTokenRotation?: RefreshTokenRotationType;
}
export interface CreateUserPoolClientResponse {
  UserPoolClient?: UserPoolClientType;
}
export type WrappedIntegerType = number;
export type SecurityPolicyType =
  | "TLS_V1"
  | "TLS_V1_2_2021"
  | "TLS_V1_3_2025"
  | (string & {});
export interface CustomDomainConfigType {
  CertificateArn: string;
  SecurityPolicy?: SecurityPolicyType;
}
export type RegionNameType = string;
export type HealthCheckIdType = string;
export interface FailoverType {
  SecondaryRegion: string;
  PrimaryRoute53HealthCheckId: string;
}
export interface RoutingType {
  Failover?: FailoverType;
}
export interface CreateUserPoolDomainRequest {
  Domain: string;
  UserPoolId: string;
  ManagedLoginVersion?: number;
  CustomDomainConfig?: CustomDomainConfigType;
  Routing?: RoutingType;
}
export interface CreateUserPoolDomainResponse {
  ManagedLoginVersion?: number;
  CloudFrontDomain?: string;
  Routing?: RoutingType;
}
export interface CreateUserPoolReplicaRequest {
  UserPoolId: string;
  RegionName: string;
  UserPoolTags?: { [key: string]: string | undefined };
}
export type ReplicaStatusType =
  | "CREATING"
  | "ACTIVE"
  | "INACTIVE"
  | "DELETING"
  | (string & {});
export type ReplicaRoleType = "PRIMARY" | "SECONDARY" | (string & {});
export interface UserPoolReplicaType {
  RegionName?: string;
  Status?: ReplicaStatusType;
  Role?: ReplicaRoleType;
  UserPoolArn?: string;
}
export interface CreateUserPoolReplicaResponse {
  UserPoolReplica?: UserPoolReplicaType;
}
export interface DeleteGroupRequest {
  GroupName: string;
  UserPoolId: string;
}
export interface DeleteGroupResponse {}
export interface DeleteIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
}
export interface DeleteIdentityProviderResponse {}
export interface DeleteManagedLoginBrandingRequest {
  ManagedLoginBrandingId: string;
  UserPoolId: string;
}
export interface DeleteManagedLoginBrandingResponse {}
export interface DeleteResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
}
export interface DeleteResourceServerResponse {}
export interface DeleteTermsRequest {
  TermsId: string;
  UserPoolId: string;
}
export interface DeleteTermsResponse {}
export interface DeleteUserRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export interface DeleteUserResponse {}
export interface DeleteUserAttributesRequest {
  UserAttributeNames: string[];
  AccessToken: string | redacted.Redacted<string>;
}
export interface DeleteUserAttributesResponse {}
export interface DeleteUserPoolRequest {
  UserPoolId: string;
}
export interface DeleteUserPoolResponse {}
export interface DeleteUserPoolClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
}
export interface DeleteUserPoolClientResponse {}
export interface DeleteUserPoolClientSecretRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ClientSecretId: string;
}
export interface DeleteUserPoolClientSecretResponse {}
export interface DeleteUserPoolDomainRequest {
  Domain: string;
  UserPoolId: string;
}
export interface DeleteUserPoolDomainResponse {}
export interface DeleteUserPoolReplicaRequest {
  UserPoolId: string;
  RegionName: string;
}
export interface DeleteUserPoolReplicaResponse {
  UserPoolReplica?: UserPoolReplicaType;
}
export interface DeleteWebAuthnCredentialRequest {
  AccessToken: string | redacted.Redacted<string>;
  CredentialId: string;
}
export interface DeleteWebAuthnCredentialResponse {}
export interface DescribeIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
}
export interface DescribeIdentityProviderResponse {
  IdentityProvider: IdentityProviderType;
}
export interface DescribeManagedLoginBrandingRequest {
  UserPoolId: string;
  ManagedLoginBrandingId: string;
  ReturnMergedResources?: boolean;
}
export interface DescribeManagedLoginBrandingResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export interface DescribeManagedLoginBrandingByClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ReturnMergedResources?: boolean;
}
export interface DescribeManagedLoginBrandingByClientResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export interface DescribeResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
}
export interface DescribeResourceServerResponse {
  ResourceServer: ResourceServerType;
}
export interface DescribeRiskConfigurationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
}
export type EventFilterType =
  | "SIGN_IN"
  | "PASSWORD_CHANGE"
  | "SIGN_UP"
  | (string & {});
export type EventFiltersType = EventFilterType[];
export type CompromisedCredentialsEventActionType =
  | "BLOCK"
  | "NO_ACTION"
  | (string & {});
export interface CompromisedCredentialsActionsType {
  EventAction: CompromisedCredentialsEventActionType;
}
export interface CompromisedCredentialsRiskConfigurationType {
  EventFilter?: EventFilterType[];
  Actions: CompromisedCredentialsActionsType;
}
export type EmailNotificationSubjectType = string;
export type EmailNotificationBodyType = string;
export interface NotifyEmailType {
  Subject: string;
  HtmlBody?: string;
  TextBody?: string;
}
export interface NotifyConfigurationType {
  From?: string;
  ReplyTo?: string;
  SourceArn: string;
  BlockEmail?: NotifyEmailType;
  NoActionEmail?: NotifyEmailType;
  MfaEmail?: NotifyEmailType;
}
export type AccountTakeoverActionNotifyType = boolean;
export type AccountTakeoverEventActionType =
  | "BLOCK"
  | "MFA_IF_CONFIGURED"
  | "MFA_REQUIRED"
  | "NO_ACTION"
  | (string & {});
export interface AccountTakeoverActionType {
  Notify: boolean;
  EventAction: AccountTakeoverEventActionType;
}
export interface AccountTakeoverActionsType {
  LowAction?: AccountTakeoverActionType;
  MediumAction?: AccountTakeoverActionType;
  HighAction?: AccountTakeoverActionType;
}
export interface AccountTakeoverRiskConfigurationType {
  NotifyConfiguration?: NotifyConfigurationType;
  Actions: AccountTakeoverActionsType;
}
export type BlockedIPRangeListType = string[];
export type SkippedIPRangeListType = string[];
export interface RiskExceptionConfigurationType {
  BlockedIPRangeList?: string[];
  SkippedIPRangeList?: string[];
}
export interface RiskConfigurationType {
  UserPoolId?: string;
  ClientId?: string | redacted.Redacted<string>;
  CompromisedCredentialsRiskConfiguration?: CompromisedCredentialsRiskConfigurationType;
  AccountTakeoverRiskConfiguration?: AccountTakeoverRiskConfigurationType;
  RiskExceptionConfiguration?: RiskExceptionConfigurationType;
  LastModifiedDate?: Date;
}
export interface DescribeRiskConfigurationResponse {
  RiskConfiguration: RiskConfigurationType;
}
export interface DescribeTermsRequest {
  TermsId: string;
  UserPoolId: string;
}
export interface DescribeTermsResponse {
  Terms?: TermsType;
}
export interface DescribeTermsByClientRequest {
  ClientId: string | redacted.Redacted<string>;
  UserPoolId: string;
  TermsName: string;
}
export interface DescribeTermsByClientResponse {
  Terms?: TermsType;
}
export interface DescribeUserImportJobRequest {
  UserPoolId: string;
  JobId: string;
}
export interface DescribeUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export interface DescribeUserPoolRequest {
  UserPoolId: string;
}
export interface DescribeUserPoolResponse {
  UserPool?: UserPoolType;
}
export interface DescribeUserPoolClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
}
export interface DescribeUserPoolClientResponse {
  UserPoolClient?: UserPoolClientType;
}
export interface DescribeUserPoolDomainRequest {
  Domain: string;
}
export type AWSAccountIdType = string;
export type S3BucketType = string;
export type DomainVersionType = string;
export type DomainStatusType =
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export interface DomainDescriptionType {
  UserPoolId?: string;
  AWSAccountId?: string;
  Domain?: string;
  S3Bucket?: string;
  CloudFrontDistribution?: string;
  Version?: string;
  Status?: DomainStatusType;
  CustomDomainConfig?: CustomDomainConfigType;
  ManagedLoginVersion?: number;
  Routing?: RoutingType;
}
export interface DescribeUserPoolDomainResponse {
  DomainDescription?: DomainDescriptionType;
}
export interface ForgetDeviceRequest {
  AccessToken?: string | redacted.Redacted<string>;
  DeviceKey: string;
}
export interface ForgetDeviceResponse {}
export interface ForgotPasswordRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  UserContextData?: UserContextDataType;
  Username: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface CodeDeliveryDetailsType {
  Destination?: string;
  DeliveryMedium?: DeliveryMediumType;
  AttributeName?: string;
}
export interface ForgotPasswordResponse {
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
}
export interface GetClientTokenRequest {
  ClientId: string | redacted.Redacted<string>;
  Secret: string | redacted.Redacted<string>;
  Scopes?: string[];
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface ClientAuthenticationResultType {
  AccessToken?: string | redacted.Redacted<string>;
  ExpiresIn?: number;
  TokenType?: string;
}
export interface GetClientTokenResponse {
  ClientAuthenticationResult?: ClientAuthenticationResultType;
}
export interface GetCSVHeaderRequest {
  UserPoolId: string;
}
export type ListOfStringTypes = string[];
export interface GetCSVHeaderResponse {
  UserPoolId?: string;
  CSVHeader?: string[];
}
export interface GetDeviceRequest {
  DeviceKey: string;
  AccessToken?: string | redacted.Redacted<string>;
}
export interface GetDeviceResponse {
  Device: DeviceType;
}
export interface GetGroupRequest {
  GroupName: string;
  UserPoolId: string;
}
export interface GetGroupResponse {
  Group?: GroupType;
}
export interface GetIdentityProviderByIdentifierRequest {
  UserPoolId: string;
  IdpIdentifier: string;
}
export interface GetIdentityProviderByIdentifierResponse {
  IdentityProvider: IdentityProviderType;
}
export interface GetLogDeliveryConfigurationRequest {
  UserPoolId: string;
}
export type LogLevel = "ERROR" | "INFO" | (string & {});
export type EventSourceName =
  | "userNotification"
  | "userAuthEvents"
  | (string & {});
export interface CloudWatchLogsConfigurationType {
  LogGroupArn?: string;
}
export type S3ArnType = string;
export interface S3ConfigurationType {
  BucketArn?: string;
}
export interface FirehoseConfigurationType {
  StreamArn?: string;
}
export interface LogConfigurationType {
  LogLevel: LogLevel;
  EventSource: EventSourceName;
  CloudWatchLogsConfiguration?: CloudWatchLogsConfigurationType;
  S3Configuration?: S3ConfigurationType;
  FirehoseConfiguration?: FirehoseConfigurationType;
}
export type LogConfigurationListType = LogConfigurationType[];
export interface LogDeliveryConfigurationType {
  UserPoolId: string;
  LogConfigurations: LogConfigurationType[];
}
export interface GetLogDeliveryConfigurationResponse {
  LogDeliveryConfiguration?: LogDeliveryConfigurationType;
}
export type LimitClass = "API_CATEGORY" | (string & {});
export type StringToStringMapType = { [key: string]: string | undefined };
export interface LimitDefinitionType {
  LimitClass: LimitClass;
  Attributes: { [key: string]: string | undefined };
}
export interface GetProvisionedLimitRequest {
  LimitDefinition: LimitDefinitionType;
}
export interface LimitType {
  LimitDefinition: LimitDefinitionType;
  ProvisionedLimitValue: number;
  FreeLimitValue: number;
}
export interface GetProvisionedLimitResponse {
  Limit: LimitType;
}
export interface GetSigningCertificateRequest {
  UserPoolId: string;
}
export interface GetSigningCertificateResponse {
  Certificate?: string;
}
export interface GetTokensFromRefreshTokenRequest {
  RefreshToken: string | redacted.Redacted<string>;
  ClientId: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
  DeviceKey?: string;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface GetTokensFromRefreshTokenResponse {
  AuthenticationResult?: AuthenticationResultType;
}
export interface GetUICustomizationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
}
export type ImageUrlType = string;
export type CSSType = string;
export type CSSVersionType = string;
export interface UICustomizationType {
  UserPoolId?: string;
  ClientId?: string | redacted.Redacted<string>;
  ImageUrl?: string;
  CSS?: string;
  CSSVersion?: string;
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export interface GetUICustomizationResponse {
  UICustomization: UICustomizationType;
}
export interface GetUserRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export interface GetUserResponse {
  Username: string | redacted.Redacted<string>;
  UserAttributes: AttributeType[];
  MFAOptions?: MFAOptionType[];
  PreferredMfaSetting?: string;
  UserMFASettingList?: string[];
}
export interface GetUserAttributeVerificationCodeRequest {
  AccessToken: string | redacted.Redacted<string>;
  AttributeName: string;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface GetUserAttributeVerificationCodeResponse {
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
}
export interface GetUserAuthFactorsRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export interface GetUserAuthFactorsResponse {
  Username: string | redacted.Redacted<string>;
  PreferredMfaSetting?: string;
  UserMFASettingList?: string[];
  ConfiguredUserAuthFactors?: AuthFactorType[];
}
export interface GetUserPoolMfaConfigRequest {
  UserPoolId: string;
}
export interface SmsMfaConfigType {
  SmsAuthenticationMessage?: string;
  SmsConfiguration?: SmsConfigurationType;
}
export interface SoftwareTokenMfaConfigType {
  Enabled?: boolean;
}
export type EmailMfaMessageType = string;
export type EmailMfaSubjectType = string;
export interface EmailMfaConfigType {
  Message?: string;
  Subject?: string;
}
export type RelyingPartyIdType = string;
export type UserVerificationType = "required" | "preferred" | (string & {});
export type WebAuthnFactorConfigurationType =
  | "SINGLE_FACTOR"
  | "MULTI_FACTOR_WITH_USER_VERIFICATION"
  | (string & {});
export interface WebAuthnConfigurationType {
  RelyingPartyId?: string;
  UserVerification?: UserVerificationType;
  FactorConfiguration?: WebAuthnFactorConfigurationType;
}
export interface GetUserPoolMfaConfigResponse {
  SmsMfaConfiguration?: SmsMfaConfigType;
  SoftwareTokenMfaConfiguration?: SoftwareTokenMfaConfigType;
  EmailMfaConfiguration?: EmailMfaConfigType;
  MfaConfiguration?: UserPoolMfaType;
  WebAuthnConfiguration?: WebAuthnConfigurationType;
}
export interface GlobalSignOutRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export interface GlobalSignOutResponse {}
export interface InitiateAuthRequest {
  AuthFlow: AuthFlowType;
  AuthParameters?: { [key: string]: string | undefined };
  ClientMetadata?: { [key: string]: string | undefined };
  ClientId: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  Session?: string | redacted.Redacted<string>;
}
export interface InitiateAuthResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
  AvailableChallenges?: ChallengeNameType[];
}
export interface ListDevicesRequest {
  AccessToken: string | redacted.Redacted<string>;
  Limit?: number;
  PaginationToken?: string;
}
export interface ListDevicesResponse {
  Devices?: DeviceType[];
  PaginationToken?: string;
}
export interface ListGroupsRequest {
  UserPoolId: string;
  Limit?: number;
  NextToken?: string;
}
export interface ListGroupsResponse {
  Groups?: GroupType[];
  NextToken?: string;
}
export type ListProvidersLimitType = number;
export type PaginationKeyType = string;
export interface ListIdentityProvidersRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ProviderDescription {
  ProviderName?: string;
  ProviderType?: IdentityProviderTypeType;
  LastModifiedDate?: Date;
  CreationDate?: Date;
}
export type ProvidersListType = ProviderDescription[];
export interface ListIdentityProvidersResponse {
  Providers: ProviderDescription[];
  NextToken?: string;
}
export type ListResourceServersLimitType = number;
export interface ListResourceServersRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceServersListType = ResourceServerType[];
export interface ListResourceServersResponse {
  ResourceServers: ResourceServerType[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export type ListTermsRequestMaxResultsInteger = number;
export interface ListTermsRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface TermsDescriptionType {
  TermsId: string;
  TermsName: string;
  Enforcement: TermsEnforcementType;
  CreationDate: Date;
  LastModifiedDate: Date;
}
export type TermsDescriptionListType = TermsDescriptionType[];
export interface ListTermsResponse {
  Terms: TermsDescriptionType[];
  NextToken?: string;
}
export type PoolQueryLimitType = number;
export interface ListUserImportJobsRequest {
  UserPoolId: string;
  MaxResults: number;
  PaginationToken?: string;
}
export type UserImportJobsListType = UserImportJobType[];
export interface ListUserImportJobsResponse {
  UserImportJobs?: UserImportJobType[];
  PaginationToken?: string;
}
export type QueryLimit = number;
export interface ListUserPoolClientsRequest {
  UserPoolId: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface UserPoolClientDescription {
  ClientId?: string | redacted.Redacted<string>;
  UserPoolId?: string;
  ClientName?: string;
}
export type UserPoolClientListType = UserPoolClientDescription[];
export interface ListUserPoolClientsResponse {
  UserPoolClients?: UserPoolClientDescription[];
  NextToken?: string;
}
export interface ListUserPoolClientSecretsRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  NextToken?: string;
}
export type ClientSecretDescriptorListType = ClientSecretDescriptorType[];
export interface ListUserPoolClientSecretsResponse {
  ClientSecrets?: ClientSecretDescriptorType[];
  NextToken?: string;
}
export interface ListUserPoolReplicasRequest {
  UserPoolId: string;
  NextToken?: string;
}
export type UserPoolReplicaListType = UserPoolReplicaType[];
export interface ListUserPoolReplicasResponse {
  UserPoolReplicas?: UserPoolReplicaType[];
  NextToken?: string;
}
export interface ListUserPoolsRequest {
  NextToken?: string;
  MaxResults: number;
}
export type ReplicaRegionsType = string[];
export interface UserPoolDescriptionType {
  Id?: string;
  Name?: string;
  LambdaConfig?: LambdaConfigType;
  Status?: StatusType;
  LastModifiedDate?: Date;
  CreationDate?: Date;
  ReplicaRegions?: string[];
}
export type UserPoolListType = UserPoolDescriptionType[];
export interface ListUserPoolsResponse {
  UserPools?: UserPoolDescriptionType[];
  NextToken?: string;
}
export type SearchedAttributeNamesListType = string[];
export type UserFilterType = string;
export interface ListUsersRequest {
  UserPoolId: string;
  AttributesToGet?: string[];
  Limit?: number;
  PaginationToken?: string;
  Filter?: string;
}
export type UsersListType = UserType[];
export interface ListUsersResponse {
  Users?: UserType[];
  PaginationToken?: string;
}
export interface ListUsersInGroupRequest {
  UserPoolId: string;
  GroupName: string;
  Limit?: number;
  NextToken?: string;
}
export interface ListUsersInGroupResponse {
  Users?: UserType[];
  NextToken?: string;
}
export type WebAuthnCredentialsQueryLimitType = number;
export interface ListWebAuthnCredentialsRequest {
  AccessToken: string | redacted.Redacted<string>;
  NextToken?: string;
  MaxResults?: number;
}
export type WebAuthnAuthenticatorAttachmentType = string;
export type WebAuthnAuthenticatorTransportType = string;
export type WebAuthnAuthenticatorTransportsList = string[];
export interface WebAuthnCredentialDescription {
  CredentialId: string;
  FriendlyCredentialName: string;
  RelyingPartyId: string;
  AuthenticatorAttachment?: string;
  AuthenticatorTransports: string[];
  CreatedAt: Date;
}
export type WebAuthnCredentialDescriptionListType =
  WebAuthnCredentialDescription[];
export interface ListWebAuthnCredentialsResponse {
  Credentials: WebAuthnCredentialDescription[];
  NextToken?: string;
}
export interface ResendConfirmationCodeRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  UserContextData?: UserContextDataType;
  Username: string | redacted.Redacted<string>;
  AnalyticsMetadata?: AnalyticsMetadataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface ResendConfirmationCodeResponse {
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
}
export interface RespondToAuthChallengeRequest {
  ClientId: string | redacted.Redacted<string>;
  ChallengeName: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeResponses?: { [key: string]: string | undefined };
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface RespondToAuthChallengeResponse {
  ChallengeName?: ChallengeNameType;
  Session?: string | redacted.Redacted<string>;
  ChallengeParameters?: { [key: string]: string | undefined };
  AuthenticationResult?: AuthenticationResultType;
}
export interface RevokeTokenRequest {
  Token: string | redacted.Redacted<string>;
  ClientId: string | redacted.Redacted<string>;
  ClientSecret?: string | redacted.Redacted<string>;
}
export interface RevokeTokenResponse {}
export interface SetLogDeliveryConfigurationRequest {
  UserPoolId: string;
  LogConfigurations: LogConfigurationType[];
}
export interface SetLogDeliveryConfigurationResponse {
  LogDeliveryConfiguration?: LogDeliveryConfigurationType;
}
export interface SetRiskConfigurationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
  CompromisedCredentialsRiskConfiguration?: CompromisedCredentialsRiskConfigurationType;
  AccountTakeoverRiskConfiguration?: AccountTakeoverRiskConfigurationType;
  RiskExceptionConfiguration?: RiskExceptionConfigurationType;
}
export interface SetRiskConfigurationResponse {
  RiskConfiguration: RiskConfigurationType;
}
export type ImageFileType = Uint8Array;
export interface SetUICustomizationRequest {
  UserPoolId: string;
  ClientId?: string | redacted.Redacted<string>;
  CSS?: string;
  ImageFile?: Uint8Array;
}
export interface SetUICustomizationResponse {
  UICustomization: UICustomizationType;
}
export interface SetUserMFAPreferenceRequest {
  SMSMfaSettings?: SMSMfaSettingsType;
  SoftwareTokenMfaSettings?: SoftwareTokenMfaSettingsType;
  EmailMfaSettings?: EmailMfaSettingsType;
  WebAuthnMfaSettings?: WebAuthnMfaSettingsType;
  AccessToken: string | redacted.Redacted<string>;
}
export interface SetUserMFAPreferenceResponse {}
export interface SetUserPoolMfaConfigRequest {
  UserPoolId: string;
  SmsMfaConfiguration?: SmsMfaConfigType;
  SoftwareTokenMfaConfiguration?: SoftwareTokenMfaConfigType;
  EmailMfaConfiguration?: EmailMfaConfigType;
  MfaConfiguration?: UserPoolMfaType;
  WebAuthnConfiguration?: WebAuthnConfigurationType;
}
export interface SetUserPoolMfaConfigResponse {
  SmsMfaConfiguration?: SmsMfaConfigType;
  SoftwareTokenMfaConfiguration?: SoftwareTokenMfaConfigType;
  EmailMfaConfiguration?: EmailMfaConfigType;
  MfaConfiguration?: UserPoolMfaType;
  WebAuthnConfiguration?: WebAuthnConfigurationType;
}
export interface SetUserSettingsRequest {
  AccessToken: string | redacted.Redacted<string>;
  MFAOptions: MFAOptionType[];
}
export interface SetUserSettingsResponse {}
export interface SignUpRequest {
  ClientId: string | redacted.Redacted<string>;
  SecretHash?: string | redacted.Redacted<string>;
  Username: string | redacted.Redacted<string>;
  Password?: string | redacted.Redacted<string>;
  UserAttributes?: AttributeType[];
  ValidationData?: AttributeType[];
  AnalyticsMetadata?: AnalyticsMetadataType;
  UserContextData?: UserContextDataType;
  ClientMetadata?: { [key: string]: string | undefined };
}
export interface SignUpResponse {
  UserConfirmed: boolean;
  CodeDeliveryDetails?: CodeDeliveryDetailsType;
  UserSub: string;
  Session?: string | redacted.Redacted<string>;
}
export interface StartUserImportJobRequest {
  UserPoolId: string;
  JobId: string;
}
export interface StartUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export interface StartWebAuthnRegistrationRequest {
  AccessToken: string | redacted.Redacted<string>;
}
export interface StartWebAuthnRegistrationResponse {
  CredentialCreationOptions: any;
}
export interface StopUserImportJobRequest {
  UserPoolId: string;
  JobId: string;
}
export interface StopUserImportJobResponse {
  UserImportJob?: UserImportJobType;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type UserPoolTagsListType = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAuthEventFeedbackRequest {
  UserPoolId: string;
  Username: string | redacted.Redacted<string>;
  EventId: string;
  FeedbackToken: string | redacted.Redacted<string>;
  FeedbackValue: FeedbackValueType;
}
export interface UpdateAuthEventFeedbackResponse {}
export interface UpdateDeviceStatusRequest {
  AccessToken: string | redacted.Redacted<string>;
  DeviceKey: string;
  DeviceRememberedStatus?: DeviceRememberedStatusType;
}
export interface UpdateDeviceStatusResponse {}
export interface UpdateGroupRequest {
  GroupName: string;
  UserPoolId: string;
  Description?: string;
  RoleArn?: string;
  Precedence?: number;
}
export interface UpdateGroupResponse {
  Group?: GroupType;
}
export interface UpdateIdentityProviderRequest {
  UserPoolId: string;
  ProviderName: string;
  ProviderDetails?: { [key: string]: string | undefined };
  AttributeMapping?: { [key: string]: string | undefined };
  IdpIdentifiers?: string[];
}
export interface UpdateIdentityProviderResponse {
  IdentityProvider: IdentityProviderType;
}
export interface UpdateManagedLoginBrandingRequest {
  UserPoolId?: string;
  ManagedLoginBrandingId?: string;
  UseCognitoProvidedValues?: boolean;
  Settings?: any;
  Assets?: AssetType[];
}
export interface UpdateManagedLoginBrandingResponse {
  ManagedLoginBranding?: ManagedLoginBrandingType;
}
export interface UpdateProvisionedLimitRequest {
  LimitDefinition: LimitDefinitionType;
  RequestedLimitValue: number;
}
export interface UpdateProvisionedLimitResponse {
  Limit: LimitType;
}
export interface UpdateResourceServerRequest {
  UserPoolId: string;
  Identifier: string;
  Name: string;
  Scopes?: ResourceServerScopeType[];
}
export interface UpdateResourceServerResponse {
  ResourceServer: ResourceServerType;
}
export interface UpdateTermsRequest {
  TermsId: string;
  UserPoolId: string;
  TermsName?: string;
  TermsSource?: TermsSourceType;
  Enforcement?: TermsEnforcementType;
  Links?: { [key: string]: string | undefined };
}
export interface UpdateTermsResponse {
  Terms?: TermsType;
}
export interface UpdateUserAttributesRequest {
  UserAttributes: AttributeType[];
  AccessToken: string | redacted.Redacted<string>;
  ClientMetadata?: { [key: string]: string | undefined };
}
export type CodeDeliveryDetailsListType = CodeDeliveryDetailsType[];
export interface UpdateUserAttributesResponse {
  CodeDeliveryDetailsList?: CodeDeliveryDetailsType[];
}
export interface UpdateUserPoolRequest {
  UserPoolId: string;
  Policies?: UserPoolPolicyType;
  DeletionProtection?: DeletionProtectionType;
  LambdaConfig?: LambdaConfigType;
  AutoVerifiedAttributes?: VerifiedAttributeType[];
  SmsVerificationMessage?: string;
  EmailVerificationMessage?: string;
  EmailVerificationSubject?: string;
  VerificationMessageTemplate?: VerificationMessageTemplateType;
  SmsAuthenticationMessage?: string;
  UserAttributeUpdateSettings?: UserAttributeUpdateSettingsType;
  MfaConfiguration?: UserPoolMfaType;
  DeviceConfiguration?: DeviceConfigurationType;
  EmailConfiguration?: EmailConfigurationType;
  SmsConfiguration?: SmsConfigurationType;
  UserPoolTags?: { [key: string]: string | undefined };
  AdminCreateUserConfig?: AdminCreateUserConfigType;
  UserPoolAddOns?: UserPoolAddOnsType;
  AccountRecoverySetting?: AccountRecoverySettingType;
  PoolName?: string;
  UserPoolTier?: UserPoolTierType;
  KeyConfiguration?: KeyConfigurationType;
  IssuerConfiguration?: IssuerConfigurationType;
}
export interface UpdateUserPoolResponse {}
export interface UpdateUserPoolClientRequest {
  UserPoolId: string;
  ClientId: string | redacted.Redacted<string>;
  ClientName?: string;
  RefreshTokenValidity?: number;
  AccessTokenValidity?: number;
  IdTokenValidity?: number;
  TokenValidityUnits?: TokenValidityUnitsType;
  ReadAttributes?: string[];
  WriteAttributes?: string[];
  ExplicitAuthFlows?: ExplicitAuthFlowsType[];
  SupportedIdentityProviders?: string[];
  CallbackURLs?: string[];
  LogoutURLs?: string[];
  DefaultRedirectURI?: string;
  AllowedOAuthFlows?: OAuthFlowType[];
  AllowedOAuthScopes?: string[];
  AllowedOAuthFlowsUserPoolClient?: boolean;
  AnalyticsConfiguration?: AnalyticsConfigurationType;
  PreventUserExistenceErrors?: PreventUserExistenceErrorTypes;
  EnableTokenRevocation?: boolean;
  EnablePropagateAdditionalUserContextData?: boolean;
  AuthSessionValidity?: number;
  RefreshTokenRotation?: RefreshTokenRotationType;
}
export interface UpdateUserPoolClientResponse {
  UserPoolClient?: UserPoolClientType;
}
export interface UpdateUserPoolDomainRequest {
  Domain: string;
  UserPoolId: string;
  ManagedLoginVersion?: number;
  CustomDomainConfig?: CustomDomainConfigType;
  Routing?: RoutingType;
}
export interface UpdateUserPoolDomainResponse {
  ManagedLoginVersion?: number;
  CloudFrontDomain?: string;
  Routing?: RoutingType;
}
export type UpdateReplicaStatusType = "ACTIVE" | "INACTIVE" | (string & {});
export interface UpdateUserPoolReplicaRequest {
  UserPoolId: string;
  RegionName: string;
  Status: UpdateReplicaStatusType;
}
export interface UpdateUserPoolReplicaResponse {
  UserPoolReplica?: UserPoolReplicaType;
}
export type SoftwareTokenMFAUserCodeType = string | redacted.Redacted<string>;
export interface VerifySoftwareTokenRequest {
  AccessToken?: string | redacted.Redacted<string>;
  Session?: string | redacted.Redacted<string>;
  UserCode: string | redacted.Redacted<string>;
  FriendlyDeviceName?: string;
}
export type VerifySoftwareTokenResponseType =
  | "SUCCESS"
  | "ERROR"
  | (string & {});
export interface VerifySoftwareTokenResponse {
  Status?: VerifySoftwareTokenResponseType;
  Session?: string | redacted.Redacted<string>;
}
export interface VerifyUserAttributeRequest {
  AccessToken: string | redacted.Redacted<string>;
  AttributeName: string;
  Code: string;
}
export interface VerifyUserAttributeResponse {}
export type MessageType = string;
export type InvalidParameterExceptionReasonCodeType = string;
export type AddCustomAttributesError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserImportInProgressException
  | CommonErrors;
/**
 * Adds additional user attributes to the user pool schema. Custom attributes can be
 * mutable or immutable and have a `custom:` or `dev:` prefix. For
 * more information, see Custom attributes.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const addCustomAttributes: API.OperationMethod<
  AddCustomAttributesRequest,
  AddCustomAttributesResponse,
  AddCustomAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, CustomAttributes: D.list(i_SchemaAttributeType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserImportInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCustomAttributes",
})) as any;

export type AddUserPoolClientSecretError =
  | AccessDeniedException
  | InternalServerException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new client secret for an existing confidential user pool app client. Supports up to 2 active secrets per app client for zero-downtime credential rotation workflows.
 */
export const addUserPoolClientSecret: API.OperationMethod<
  AddUserPoolClientSecretRequest,
  AddUserPoolClientSecretResponse,
  AddUserPoolClientSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0, ClientSecret: 0 },
    output: { ClientSecretDescriptor: o_ClientSecretDescriptorType },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddUserPoolClientSecret",
})) as any;

export type AdminAddUserToGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Adds a user to a group. A user who is in a group can present a preferred-role claim to
 * an identity pool, and populates a `cognito:groups` claim to their access and
 * identity tokens.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminAddUserToGroup: API.OperationMethod<
  AdminAddUserToGroupRequest,
  AdminAddUserToGroupResponse,
  AdminAddUserToGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, GroupName: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminAddUserToGroup",
})) as any;

export type AdminConfirmSignUpError =
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyFailedAttemptsException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Confirms user sign-up as an administrator.
 *
 * This request sets a user account active in a user pool that requires confirmation of new user accounts before they can sign in. You can
 * configure your user pool to not send confirmation codes to new users and instead confirm
 * them with this API operation on the back end.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 *
 * To configure your user pool to require administrative confirmation of users, set
 * `AllowAdminCreateUserOnly` to `true` in a
 * `CreateUserPool` or `UpdateUserPool` request.
 */
export const adminConfirmSignUp: API.OperationMethod<
  AdminConfirmSignUpRequest,
  AdminConfirmSignUpResponse,
  AdminConfirmSignUpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, ClientMetadata: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyFailedAttemptsException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminConfirmSignUp",
})) as any;

export type AdminCreateUserError =
  | CodeDeliveryFailureException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UnsupportedUserStateException
  | UserLambdaValidationException
  | UsernameExistsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Creates a new user in the specified user pool.
 *
 * If `MessageAction` isn't set, the default is to send a welcome message via
 * email or phone (SMS).
 *
 * This message is based on a template that you configured in your call to create or
 * update a user pool. This template includes your custom sign-up instructions and
 * placeholders for user name and temporary password.
 *
 * Alternatively, you can call `AdminCreateUser` with `SUPPRESS`
 * for the `MessageAction` parameter, and Amazon Cognito won't send any email.
 *
 * In either case, if the user has a password, they will be in the
 * `FORCE_CHANGE_PASSWORD` state until they sign in and set their password.
 * Your invitation message template must have the `{####}` password placeholder
 * if your users have passwords. If your template doesn't have this placeholder, Amazon Cognito
 * doesn't deliver the invitation message. In this case, you must update your message
 * template and resend the password with a new `AdminCreateUser` request with a
 * `MessageAction` value of `RESEND`.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminCreateUser: API.OperationMethod<
  AdminCreateUserRequest,
  AdminCreateUserResponse,
  AdminCreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      Username: 0,
      UserAttributes: D.list(i_AttributeType),
      ValidationData: D.list(i_AttributeType),
      TemporaryPassword: 0,
      ForceAliasCreation: 0,
      MessageAction: 0,
      DesiredDeliveryMediums: 0,
      ClientMetadata: 0,
    },
    output: { User: o_UserType },
  },
  errors: [
    CodeDeliveryFailureException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UnsupportedUserStateException,
    UserLambdaValidationException,
    UsernameExistsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminCreateUser",
})) as any;

export type AdminDeleteSoftwareTokenError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes a user's registered time-based one-time password (TOTP) multi-factor
 * authentication (MFA) factor, also known as a software token. After this operation, the
 * user can no longer sign in with TOTP MFA, and can register a new TOTP factor with
 * `AssociateSoftwareToken`. Use this operation when a user loses access to
 * their TOTP-generating device, for example, a lost or reset phone, and needs to register
 * a new one.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDeleteSoftwareToken: API.OperationMethod<
  AdminDeleteSoftwareTokenRequest,
  AdminDeleteSoftwareTokenResponse,
  AdminDeleteSoftwareTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, Username: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDeleteSoftwareToken",
})) as any;

export type AdminDeleteUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes a user profile in your user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDeleteUser: API.OperationMethod<
  AdminDeleteUserRequest,
  AdminDeleteUserResponse,
  AdminDeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, Username: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDeleteUser",
})) as any;

export type AdminDeleteUserAttributesError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes attribute values from a user. This operation doesn't affect tokens for
 * existing user sessions. The next ID token that the user receives will no longer have the
 * deleted attributes.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDeleteUserAttributes: API.OperationMethod<
  AdminDeleteUserAttributesRequest,
  AdminDeleteUserAttributesResponse,
  AdminDeleteUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, UserAttributeNames: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDeleteUserAttributes",
})) as any;

export type AdminDisableProviderForUserError =
  | AliasExistsException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Prevents the user from signing in with the specified external (SAML or social)
 * identity provider (IdP). If the user that you want to deactivate is a Amazon Cognito user pools
 * native username + password user, they can't use their password to sign in. If the user
 * to deactivate is a linked external IdP user, any link between that user and an existing
 * user is removed. When the external user signs in again, and the user is no longer
 * attached to the previously linked `DestinationUser`, the user must create a
 * new user account.
 *
 * The value of `ProviderName` must match the name of a user pool IdP.
 *
 * To deactivate a local user, set `ProviderName` to `Cognito` and
 * the `ProviderAttributeName` to `Cognito_Subject`. The
 * `ProviderAttributeValue` must be user's local username.
 *
 * The `ProviderAttributeName` must always be `Cognito_Subject` for
 * social IdPs. The `ProviderAttributeValue` must always be the exact subject
 * that was used when the user was originally linked as a source user.
 *
 * For de-linking a SAML identity, there are two scenarios. If the linked identity has
 * not yet been used to sign in, the `ProviderAttributeName` and
 * `ProviderAttributeValue` must be the same values that were used for the
 * `SourceUser` when the identities were originally linked using
 * AdminLinkProviderForUser call. This is also true if the linking was done with
 * `ProviderAttributeName` set to `Cognito_Subject`. If the user
 * has already signed in, the `ProviderAttributeName` must be
 * `Cognito_Subject` and `ProviderAttributeValue` must be the
 * `NameID` from their SAML assertion.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDisableProviderForUser: API.OperationMethod<
  AdminDisableProviderForUserRequest,
  AdminDisableProviderForUserResponse,
  AdminDisableProviderForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, User: i_ProviderUserIdentifierType },
  },
  errors: [
    AliasExistsException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDisableProviderForUser",
})) as any;

export type AdminDisableUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deactivates a user profile and revokes all access tokens for the user. A deactivated
 * user can't sign in, but still appears in the responses to `ListUsers`
 * API requests.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminDisableUser: API.OperationMethod<
  AdminDisableUserRequest,
  AdminDisableUserResponse,
  AdminDisableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, Username: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminDisableUser",
})) as any;

export type AdminEnableUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Activates sign-in for a user profile that previously had sign-in access
 * disabled.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminEnableUser: API.OperationMethod<
  AdminEnableUserRequest,
  AdminEnableUserResponse,
  AdminEnableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, Username: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminEnableUser",
})) as any;

export type AdminForgetDeviceError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Forgets, or deletes, a remembered device from a user's profile. After you forget
 * the device, the user can no longer complete device authentication with that device and
 * when applicable, must submit MFA codes again. For more information, see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminForgetDevice: API.OperationMethod<
  AdminForgetDeviceRequest,
  AdminForgetDeviceResponse,
  AdminForgetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, DeviceKey: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminForgetDevice",
})) as any;

export type AdminGetDeviceError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the device key, returns details for a user's device. For more information,
 * see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminGetDevice: API.OperationMethod<
  AdminGetDeviceRequest,
  AdminGetDeviceResponse,
  AdminGetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeviceKey: 0, UserPoolId: 0, Username: 0 },
    output: { Device: o_DeviceType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminGetDevice",
})) as any;

export type AdminGetUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a username, returns details about a user profile in a user pool. You can specify
 * alias attributes in the `Username` request parameter.
 *
 * This operation contributes to your monthly active user (MAU) count for the purpose of
 * billing.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminGetUser: API.OperationMethod<
  AdminGetUserRequest,
  AdminGetUserResponse,
  AdminGetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0 },
    output: {
      Username: D.secret,
      UserAttributes: D.list(o_AttributeType),
      UserCreateDate: D.ts,
      UserLastModifiedDate: D.ts,
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminGetUser",
})) as any;

export type AdminGetUserAuthFactorsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Lists the authentication options for a user in a user pool. Returns the
 * following:
 *
 * - The user's multi-factor authentication (MFA) preferences.
 *
 * - The user's options for choice-based authentication with the
 * `USER_AUTH` flow.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminGetUserAuthFactors: API.OperationMethod<
  AdminGetUserAuthFactorsRequest,
  AdminGetUserAuthFactorsResponse,
  AdminGetUserAuthFactorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0 },
    output: { Username: D.secret },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminGetUserAuthFactors",
})) as any;

export type AdminInitiateAuthError =
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | MFAMethodNotFoundException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UnsupportedOperationException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Starts sign-in for applications with a server-side component, for example a
 * traditional web application. This operation specifies the authentication flow that
 * you'd like to begin. The authentication flow that you specify must be supported in
 * your app client configuration. For more information about authentication flows, see
 * Authentication flows.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminInitiateAuth: API.OperationMethod<
  AdminInitiateAuthRequest,
  AdminInitiateAuthResponse,
  AdminInitiateAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ClientId: 0,
      AuthFlow: 0,
      AuthParameters: 0,
      ClientMetadata: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      ContextData: i_ContextDataType,
      Session: 0,
    },
    output: {
      Session: D.secret,
      AuthenticationResult: o_AuthenticationResultType,
    },
  },
  errors: [
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    MFAMethodNotFoundException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UnsupportedOperationException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminInitiateAuth",
})) as any;

export type AdminLinkProviderForUserError =
  | AliasExistsException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Links an existing user account in a user pool, or `DestinationUser`, to an
 * identity from an external IdP, or `SourceUser`, based on a specified
 * attribute name and value from the external IdP.
 *
 * This operation connects a local user profile with a user identity who hasn't yet
 * signed in from their third-party IdP. When the user signs in with their IdP, they get
 * access-control configuration from the local user profile. Linked local users can also
 * sign in with SDK-based API operations like `InitiateAuth` after they sign in
 * at least once through their IdP. For more information, see Linking federated users.
 *
 * The maximum number of federated identities linked to a user is five.
 *
 * Because this API allows a user with an external federated identity to sign in as a
 * local user, it is critical that it only be used with external IdPs and linked
 * attributes that you trust.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminLinkProviderForUser: API.OperationMethod<
  AdminLinkProviderForUserRequest,
  AdminLinkProviderForUserResponse,
  AdminLinkProviderForUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      DestinationUser: i_ProviderUserIdentifierType,
      SourceUser: i_ProviderUserIdentifierType,
    },
  },
  errors: [
    AliasExistsException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminLinkProviderForUser",
})) as any;

export type AdminListDevicesError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists a user's registered devices. Remembered devices are used in authentication
 * services where you offer a "Remember me" option for users who you want to permit to sign
 * in without MFA from a trusted device. Users can bypass MFA while your application
 * performs device SRP authentication on the back end. For more information, see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminListDevices: API.OperationMethod<
  AdminListDevicesRequest,
  AdminListDevicesResponse,
  AdminListDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, Limit: 0, PaginationToken: 0 },
    output: { Devices: D.list(o_DeviceType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminListDevices",
})) as any;

export type AdminListGroupsForUserError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Lists the groups that a user belongs to. User pool groups are identifiers that you can
 * reference from the contents of ID and access tokens, and set preferred IAM roles for
 * identity-pool authentication. For more information, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminListGroupsForUser: API.PaginatedOperationMethod<
  AdminListGroupsForUserRequest,
  AdminListGroupsForUserResponse,
  AdminListGroupsForUserError,
  Credentials | HttpClient.HttpClient,
  GroupType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Username: 0, UserPoolId: 0, Limit: 0, NextToken: 0 },
    output: { Groups: D.list(o_GroupType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminListGroupsForUser",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "Limit",
  } as const,
})) as any;

export type AdminListUserAuthEventsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Requests a history of user activity and any risks detected as part of Amazon Cognito threat
 * protection. For more information, see Viewing user event history.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminListUserAuthEvents: API.PaginatedOperationMethod<
  AdminListUserAuthEventsRequest,
  AdminListUserAuthEventsResponse,
  AdminListUserAuthEventsError,
  Credentials | HttpClient.HttpClient,
  AuthEventType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, MaxResults: 0, NextToken: 0 },
    output: {
      AuthEvents: D.list({
        CreationDate: D.ts,
        EventFeedback: { FeedbackDate: D.ts },
      }),
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminListUserAuthEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AuthEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type AdminRemoveUserFromGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a username and a group name, removes them from the group. User pool groups are
 * identifiers that you can reference from the contents of ID and access tokens, and set
 * preferred IAM roles for identity-pool authentication. For more information, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminRemoveUserFromGroup: API.OperationMethod<
  AdminRemoveUserFromGroupRequest,
  AdminRemoveUserFromGroupResponse,
  AdminRemoveUserFromGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, GroupName: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminRemoveUserFromGroup",
})) as any;

export type AdminResetUserPasswordError =
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Begins the password reset process. Sets the requested user’s account into a
 * `RESET_REQUIRED` status, and sends them a password-reset code. Your user
 * pool also sends the user a notification with a reset code and the information that their
 * password has been reset. At sign-in, your application or the managed login session
 * receives a challenge to complete the reset by confirming the code and setting a new
 * password.
 *
 * To use this API operation, your user pool must have self-service account recovery
 * configured.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminResetUserPassword: API.OperationMethod<
  AdminResetUserPasswordRequest,
  AdminResetUserPasswordResponse,
  AdminResetUserPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, ClientMetadata: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminResetUserPassword",
})) as any;

export type AdminRespondToAuthChallengeError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | MFAMethodNotFoundException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Some API operations in a user pool generate a challenge, like a prompt for an MFA
 * code, for device authentication that bypasses MFA, or for a custom authentication
 * challenge. An `AdminRespondToAuthChallenge` API request provides the answer
 * to that challenge, like a code or a secure remote password (SRP). The parameters of a
 * response to an authentication challenge vary with the type of challenge.
 *
 * For more information about custom authentication challenges, see Custom
 * authentication challenge Lambda triggers.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminRespondToAuthChallenge: API.OperationMethod<
  AdminRespondToAuthChallengeRequest,
  AdminRespondToAuthChallengeResponse,
  AdminRespondToAuthChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ClientId: 0,
      ChallengeName: 0,
      ChallengeResponses: 0,
      Session: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      ContextData: i_ContextDataType,
      ClientMetadata: 0,
    },
    output: {
      Session: D.secret,
      AuthenticationResult: o_AuthenticationResultType,
    },
  },
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    MFAMethodNotFoundException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminRespondToAuthChallenge",
})) as any;

export type AdminSetUserMFAPreferenceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Sets the user's multi-factor authentication (MFA) preference, including which MFA
 * options are activated, and if any are preferred. Only one factor can be set as
 * preferred. The preferred MFA factor will be used to authenticate a user if multiple
 * factors are activated. If multiple options are activated and no preference is set, a
 * challenge to choose an MFA option will be returned during sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminSetUserMFAPreference: API.OperationMethod<
  AdminSetUserMFAPreferenceRequest,
  AdminSetUserMFAPreferenceResponse,
  AdminSetUserMFAPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SMSMfaSettings: i_SMSMfaSettingsType,
      SoftwareTokenMfaSettings: i_SoftwareTokenMfaSettingsType,
      EmailMfaSettings: i_EmailMfaSettingsType,
      WebAuthnMfaSettings: i_WebAuthnMfaSettingsType,
      Username: 0,
      UserPoolId: 0,
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminSetUserMFAPreference",
})) as any;

export type AdminSetUserPasswordError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidPasswordException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Sets the specified user's password in a user pool. This operation administratively
 * sets a temporary or permanent password for a user. With this operation, you can bypass
 * self-service password changes and permit immediate sign-in with the password that you
 * set. To do this, set `Permanent` to `true`.
 *
 * You can also set a new temporary password in this request, send it to a user, and
 * require them to choose a new password on their next sign-in. To do this, set
 * `Permanent` to `false`.
 *
 * If the password is temporary, the user's `Status` becomes
 * `FORCE_CHANGE_PASSWORD`. When the user next tries to sign in, the
 * `InitiateAuth` or `AdminInitiateAuth` response includes the
 * `NEW_PASSWORD_REQUIRED` challenge. If the user doesn't sign in
 * before the temporary password expires, they can no longer sign in and you must repeat
 * this operation to set a temporary or permanent password for them.
 *
 * After the user sets a new password, or if you set a permanent password, their status
 * becomes `Confirmed`.
 *
 * `AdminSetUserPassword` can set a password for the user profile that Amazon Cognito
 * creates for third-party federated users. When you set a password, the federated user's
 * status changes from `EXTERNAL_PROVIDER` to `CONFIRMED`. A user in
 * this state can sign in as a federated user, and initiate authentication flows in the API
 * like a linked native user. They can also modify their password and attributes in
 * token-authenticated API requests like `ChangePassword` and
 * `UpdateUserAttributes`. As a best security practice and to keep users in
 * sync with your external IdP, don't set passwords on federated user profiles. To set up a
 * federated user for native sign-in with a linked native user, refer to Linking federated users to an existing user
 * profile.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminSetUserPassword: API.OperationMethod<
  AdminSetUserPasswordRequest,
  AdminSetUserPasswordResponse,
  AdminSetUserPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, Password: 0, Permanent: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidPasswordException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminSetUserPassword",
})) as any;

export type AdminSetUserSettingsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | UserNotFoundException
  | CommonErrors;
/**
 * *This action is no longer supported.* You can use it to configure
 * only SMS MFA. You can't use it to configure time-based one-time password (TOTP) software
 * token MFA.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminSetUserSettings: API.OperationMethod<
  AdminSetUserSettingsRequest,
  AdminSetUserSettingsResponse,
  AdminSetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, MFAOptions: D.list(i_MFAOptionType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminSetUserSettings",
})) as any;

export type AdminUpdateAuthEventFeedbackError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Provides the feedback for an authentication event generated by threat protection
 * features. Your response indicates that you think that the event either was from a valid
 * user or was an unwanted authentication attempt. This feedback improves the risk
 * evaluation decision for the user pool as part of Amazon Cognito threat protection.
 * To activate this setting, your user pool must be on the
 * Plus tier.
 *
 * To train the threat-protection model to recognize trusted and untrusted sign-in
 * characteristics, configure threat protection in audit-only mode and provide a mechanism
 * for users or administrators to submit feedback. Your feedback can tell Amazon Cognito that a risk
 * rating was assigned at a level you don't agree with.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminUpdateAuthEventFeedback: API.OperationMethod<
  AdminUpdateAuthEventFeedbackRequest,
  AdminUpdateAuthEventFeedbackResponse,
  AdminUpdateAuthEventFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Username: 0, EventId: 0, FeedbackValue: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUpdateAuthEventFeedback",
})) as any;

export type AdminUpdateDeviceStatusError =
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the status of a user's device so that it is marked as remembered or not
 * remembered for the purpose of device authentication. Device authentication is a
 * "remember me" mechanism that silently completes sign-in from trusted devices with a
 * device key instead of a user-provided MFA code. This operation changes the status of a
 * device without deleting it, so you can enable it again later. For more information about
 * device authentication, see Working with devices.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminUpdateDeviceStatus: API.OperationMethod<
  AdminUpdateDeviceStatusRequest,
  AdminUpdateDeviceStatusResponse,
  AdminUpdateDeviceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      Username: 0,
      DeviceKey: 0,
      DeviceRememberedStatus: 0,
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUpdateDeviceStatus",
})) as any;

export type AdminUpdateUserAttributesError =
  | AliasExistsException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the specified user's attributes. To delete an attribute from your user,
 * submit the attribute in your API request with a blank value.
 *
 * For custom attributes, you must add a `custom:` prefix to the attribute
 * name, for example `custom:department`.
 *
 * This operation can set a user's email address or phone number as verified and
 * permit immediate sign-in in user pools that require verification of these attributes. To
 * do this, set the `email_verified` or `phone_number_verified`
 * attribute to `true`.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const adminUpdateUserAttributes: API.OperationMethod<
  AdminUpdateUserAttributesRequest,
  AdminUpdateUserAttributesResponse,
  AdminUpdateUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      Username: 0,
      UserAttributes: D.list(i_AttributeType),
      ClientMetadata: 0,
    },
  },
  errors: [
    AliasExistsException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUpdateUserAttributes",
})) as any;

export type AdminUserGlobalSignOutError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | CommonErrors;
/**
 * Invalidates the identity, access, and refresh tokens that Amazon Cognito issued to a user. Call
 * this operation with your administrative credentials when your user signs out of your
 * app. This results in the following behavior.
 *
 * - Amazon Cognito no longer accepts *token-authorized* user operations
 * that you authorize with a signed-out user's access tokens. For more information,
 * see Using the Amazon Cognito user pools API and user pool
 * endpoints.
 *
 * Amazon Cognito returns an `Access Token has been revoked` error when your
 * app attempts to authorize a user pools API request with a revoked access token
 * that contains the scope `aws.cognito.signin.user.admin`.
 *
 * - Amazon Cognito no longer accepts a signed-out user's ID token in a GetId request to an identity pool with
 * `ServerSideTokenCheck` enabled for its user pool IdP
 * configuration in CognitoIdentityProvider.
 *
 * - Amazon Cognito no longer accepts a signed-out user's refresh tokens in refresh
 * requests.
 *
 * Other requests might be valid until your user's token expires. This operation
 * doesn't clear the managed login session cookie. To clear the session for
 * a user who signed in with managed login or the classic hosted UI, direct their browser
 * session to the logout endpoint.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const adminUserGlobalSignOut: API.OperationMethod<
  AdminUserGlobalSignOutRequest,
  AdminUserGlobalSignOutResponse,
  AdminUserGlobalSignOutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, Username: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdminUserGlobalSignOut",
})) as any;

export type AssociateSoftwareTokenError =
  | ConcurrentModificationException
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | CommonErrors;
/**
 * Begins setup of time-based one-time password (TOTP) multi-factor authentication (MFA)
 * for a user, with a unique private key that Amazon Cognito generates and returns in the API
 * response. You can authorize an `AssociateSoftwareToken` request with either
 * the user's access token, or a session string from a challenge response that you received
 * from Amazon Cognito.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 */
export const associateSoftwareToken: API.OperationMethod<
  AssociateSoftwareTokenRequest,
  AssociateSoftwareTokenResponse,
  AssociateSoftwareTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, Session: 0 },
    output: { SecretCode: D.secret, Session: D.secret },
  },
  errors: [
    ConcurrentModificationException,
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSoftwareToken",
})) as any;

export type ChangePasswordError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidPasswordException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Changes the password for the currently signed-in user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const changePassword: API.OperationMethod<
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangePasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PreviousPassword: 0, ProposedPassword: 0, AccessToken: 0 },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidPasswordException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChangePassword",
})) as any;

export type CompleteWebAuthnRegistrationError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | TooManyRequestsException
  | WebAuthnChallengeNotFoundException
  | WebAuthnClientMismatchException
  | WebAuthnCredentialNotSupportedException
  | WebAuthnNotEnabledException
  | WebAuthnOriginNotAllowedException
  | WebAuthnRelyingPartyMismatchException
  | CommonErrors;
/**
 * Completes registration of a passkey authenticator for the currently signed-in
 * user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 */
export const completeWebAuthnRegistration: API.OperationMethod<
  CompleteWebAuthnRegistrationRequest,
  CompleteWebAuthnRegistrationResponse,
  CompleteWebAuthnRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccessToken: 0, Credential: 0 } },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    TooManyRequestsException,
    WebAuthnChallengeNotFoundException,
    WebAuthnClientMismatchException,
    WebAuthnCredentialNotSupportedException,
    WebAuthnNotEnabledException,
    WebAuthnOriginNotAllowedException,
    WebAuthnRelyingPartyMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteWebAuthnRegistration",
})) as any;

export type ConfirmDeviceError =
  | DeviceKeyExistsException
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UsernameExistsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Confirms a device that a user wants to remember. A remembered device is a "Remember me
 * on this device" option for user pools that perform authentication with the device key of
 * a trusted device in the back end, instead of a user-provided MFA code. For more
 * information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const confirmDevice: API.OperationMethod<
  ConfirmDeviceRequest,
  ConfirmDeviceResponse,
  ConfirmDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AccessToken: 0,
      DeviceKey: 0,
      DeviceSecretVerifierConfig: { PasswordVerifier: 0, Salt: 0 },
      DeviceName: 0,
    },
  },
  errors: [
    DeviceKeyExistsException,
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UsernameExistsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmDevice",
})) as any;

export type ConfirmForgotPasswordError =
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | ResourceNotFoundException
  | TooManyFailedAttemptsException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * This public API operation accepts a confirmation code that Amazon Cognito sent to a user and
 * accepts a new password for that user.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const confirmForgotPassword: API.OperationMethod<
  ConfirmForgotPasswordRequest,
  ConfirmForgotPasswordResponse,
  ConfirmForgotPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientId: 0,
      SecretHash: 0,
      Username: 0,
      ConfirmationCode: 0,
      Password: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      UserContextData: i_UserContextDataType,
      ClientMetadata: 0,
    },
  },
  errors: [
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    ResourceNotFoundException,
    TooManyFailedAttemptsException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmForgotPassword",
})) as any;

export type ConfirmSignUpError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyFailedAttemptsException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Confirms the account of a new user. This public API operation submits a code that
 * Amazon Cognito sent to your user when they signed up in your user pool. After your user enters
 * their code, they confirm ownership of the email address or phone number that they
 * provided, and their user account becomes active. Depending on your user pool
 * configuration, your users will receive their confirmation code in an email or SMS
 * message.
 *
 * Local users who signed up in your user pool are the only type of user who can confirm
 * sign-up with a code. Users who federate through an external identity provider (IdP) have
 * already been confirmed by their IdP.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const confirmSignUp: API.OperationMethod<
  ConfirmSignUpRequest,
  ConfirmSignUpResponse,
  ConfirmSignUpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientId: 0,
      SecretHash: 0,
      Username: 0,
      ConfirmationCode: 0,
      ForceAliasCreation: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      UserContextData: i_UserContextDataType,
      ClientMetadata: 0,
      Session: 0,
    },
    output: { Session: D.secret },
  },
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyFailedAttemptsException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmSignUp",
})) as any;

export type CreateGroupError =
  | GroupExistsException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new group in the specified user pool. For more information about user pool
 * groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResponse,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GroupName: 0,
      UserPoolId: 0,
      Description: 0,
      RoleArn: 0,
      Precedence: 0,
    },
    output: { Group: o_GroupType },
  },
  errors: [
    GroupExistsException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
})) as any;

export type CreateIdentityProviderError =
  | DuplicateProviderException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a configuration and trust relationship between a third-party identity provider
 * (IdP) and a user pool. Amazon Cognito accepts sign-in with third-party identity providers through
 * managed login and OIDC relying-party libraries. For more information, see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createIdentityProvider: API.OperationMethod<
  CreateIdentityProviderRequest,
  CreateIdentityProviderResponse,
  CreateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ProviderName: 0,
      ProviderType: 0,
      ProviderDetails: 0,
      AttributeMapping: 0,
      IdpIdentifiers: 0,
    },
    output: { IdentityProvider: o_IdentityProviderType },
  },
  errors: [
    DuplicateProviderException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentityProvider",
})) as any;

export type CreateManagedLoginBrandingError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | ManagedLoginBrandingExistsException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new set of branding settings for a user pool style and associates it with an
 * app client. This operation is the programmatic option for the creation of a new style in
 * the branding editor.
 *
 * Provides values for UI customization in a `Settings` JSON object and image
 * files in an `Assets` array. To send the JSON object `Document`
 * type parameter in `Settings`, you might need to update to the most recent
 * version of your Amazon Web Services SDK. To create a new style with default settings, set
 * `UseCognitoProvidedValues` to `true` and don't provide
 * values for any other options.
 *
 * This operation has a 2-megabyte request-size limit and include the CSS settings and
 * image assets for your app client. Your branding settings might exceed 2MB in size. Amazon Cognito
 * doesn't require that you pass all parameters in one request and preserves existing
 * style settings that you don't specify. If your request is larger than 2MB, separate it
 * into multiple requests, each with a size smaller than the limit.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createManagedLoginBranding: API.OperationMethod<
  CreateManagedLoginBrandingRequest,
  CreateManagedLoginBrandingResponse,
  CreateManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ClientId: 0,
      UseCognitoProvidedValues: 0,
      Settings: 0,
      Assets: D.list(i_AssetType),
    },
    output: { ManagedLoginBranding: o_ManagedLoginBrandingType },
  },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    ManagedLoginBrandingExistsException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateManagedLoginBranding",
})) as any;

export type CreateResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new OAuth2.0 resource server and defines custom scopes within it. Resource
 * servers are associated with custom scopes and machine-to-machine (M2M) authorization.
 * For more information, see Access control with resource servers.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createResourceServer: API.OperationMethod<
  CreateResourceServerRequest,
  CreateResourceServerResponse,
  CreateResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      Identifier: 0,
      Name: 0,
      Scopes: D.list(i_ResourceServerScopeType),
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceServer",
})) as any;

export type CreateTermsError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TermsExistsException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates terms documents for the requested app client. When Terms and conditions and
 * Privacy policy documents are configured, the app client displays links to them in the
 * sign-up page of managed login for the app client.
 *
 * You can provide URLs for terms documents in the languages that are supported by managed login localization. Amazon Cognito directs users to the terms documents for
 * their current language, with fallback to `default` if no document exists for
 * the language.
 *
 * Each request accepts one type of terms document and a map of language-to-link for that
 * document type. You must provide both types of terms documents in at least one language
 * before Amazon Cognito displays your terms documents. Supply each type in separate
 * requests.
 *
 * For more information, see Terms documents.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createTerms: API.OperationMethod<
  CreateTermsRequest,
  CreateTermsResponse,
  CreateTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ClientId: 0,
      TermsName: 0,
      TermsSource: 0,
      Enforcement: 0,
      Links: 0,
    },
    output: { Terms: o_TermsType },
  },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TermsExistsException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTerms",
})) as any;

export type CreateUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a user import job. You can import users into user pools from a comma-separated
 * values (CSV) file without adding Amazon Cognito MAU costs to your Amazon Web Services bill.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserImportJob: API.OperationMethod<
  CreateUserImportJobRequest,
  CreateUserImportJobResponse,
  CreateUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      JobName: 0,
      UserPoolId: 0,
      CloudWatchLogsRoleArn: 0,
      PasswordHashingAlgorithm: 0,
    },
    output: { UserImportJob: o_UserImportJobType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserImportJob",
})) as any;

export type CreateUserPoolError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | TierChangeNotAllowedException
  | TooManyRequestsException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Creates a new Amazon Cognito user pool. This operation sets basic and advanced configuration
 * options.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPool: API.OperationMethod<
  CreateUserPoolRequest,
  CreateUserPoolResponse,
  CreateUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PoolName: 0,
      Policies: i_UserPoolPolicyType,
      DeletionProtection: 0,
      LambdaConfig: i_LambdaConfigType,
      AutoVerifiedAttributes: 0,
      AliasAttributes: 0,
      UsernameAttributes: 0,
      SmsVerificationMessage: 0,
      EmailVerificationMessage: 0,
      EmailVerificationSubject: 0,
      VerificationMessageTemplate: i_VerificationMessageTemplateType,
      SmsAuthenticationMessage: 0,
      MfaConfiguration: 0,
      UserAttributeUpdateSettings: i_UserAttributeUpdateSettingsType,
      DeviceConfiguration: i_DeviceConfigurationType,
      EmailConfiguration: i_EmailConfigurationType,
      SmsConfiguration: i_SmsConfigurationType,
      UserPoolTags: 0,
      AdminCreateUserConfig: i_AdminCreateUserConfigType,
      Schema: D.list(i_SchemaAttributeType),
      UserPoolAddOns: i_UserPoolAddOnsType,
      UsernameConfiguration: { CaseSensitive: 0 },
      AccountRecoverySetting: i_AccountRecoverySettingType,
      UserPoolTier: 0,
      KeyConfiguration: i_KeyConfigurationType,
      IssuerConfiguration: i_IssuerConfigurationType,
    },
    output: { UserPool: o_UserPoolType },
  },
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    TierChangeNotAllowedException,
    TooManyRequestsException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPool",
})) as any;

export type CreateUserPoolClientError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidOAuthFlowException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | ScopeDoesNotExistException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an app client in a user pool. This operation sets basic and advanced
 * configuration options.
 *
 * Unlike app clients created in the console, Amazon Cognito doesn't automatically assign a
 * branding style to app clients that you configure with this API operation. Managed login and classic hosted UI pages aren't
 * available for your client until after you apply a branding style.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPoolClient: API.OperationMethod<
  CreateUserPoolClientRequest,
  CreateUserPoolClientResponse,
  CreateUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ClientName: 0,
      GenerateSecret: 0,
      ClientSecret: 0,
      RefreshTokenValidity: 0,
      AccessTokenValidity: 0,
      IdTokenValidity: 0,
      TokenValidityUnits: i_TokenValidityUnitsType,
      ReadAttributes: 0,
      WriteAttributes: 0,
      ExplicitAuthFlows: 0,
      SupportedIdentityProviders: 0,
      CallbackURLs: 0,
      LogoutURLs: 0,
      DefaultRedirectURI: 0,
      AllowedOAuthFlows: 0,
      AllowedOAuthScopes: 0,
      AllowedOAuthFlowsUserPoolClient: 0,
      AnalyticsConfiguration: i_AnalyticsConfigurationType,
      PreventUserExistenceErrors: 0,
      EnableTokenRevocation: 0,
      EnablePropagateAdditionalUserContextData: 0,
      AuthSessionValidity: 0,
      RefreshTokenRotation: i_RefreshTokenRotationType,
    },
    output: { UserPoolClient: o_UserPoolClientType },
  },
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidOAuthFlowException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    ScopeDoesNotExistException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPoolClient",
})) as any;

export type CreateUserPoolDomainError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * A user pool domain hosts managed login, an authorization server and web server for
 * authentication in your application. This operation creates a new user pool prefix domain
 * or custom domain and sets the managed login branding version. Set the branding version
 * to `1` for hosted UI (classic) or `2` for managed login. When you
 * choose a custom domain, you must provide an SSL certificate in the US East (N. Virginia)
 * Amazon Web Services Region in your request.
 *
 * Your prefix domain might take up to one minute to take effect. Your custom domain is
 * online within five minutes, but it can take up to one hour to distribute your SSL
 * certificate.
 *
 * For more information about adding a custom domain to your user pool, see Configuring a user pool domain.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPoolDomain: API.OperationMethod<
  CreateUserPoolDomainRequest,
  CreateUserPoolDomainResponse,
  CreateUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Domain: 0,
      UserPoolId: 0,
      ManagedLoginVersion: 0,
      CustomDomainConfig: i_CustomDomainConfigType,
      Routing: i_RoutingType,
    },
  },
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPoolDomain",
})) as any;

export type CreateUserPoolReplicaError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Creates a replica of an existing user pool in a specified Amazon Web Services Region. The replica
 * enables multi-region replication for high availability and disaster recovery. To create
 * a replica, you must have permissions to create user pools in the target Region.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const createUserPoolReplica: API.OperationMethod<
  CreateUserPoolReplicaRequest,
  CreateUserPoolReplicaResponse,
  CreateUserPoolReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, RegionName: 0, UserPoolTags: 0 },
  },
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserPoolReplica",
})) as any;

export type DeleteGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a group from the specified user pool. When you delete a group, that group no
 * longer contributes to users' `cognito:preferred_group` or
 * `cognito:groups` claims, and no longer influence access-control decision
 * that are based on group membership. For more information about user pool groups, see
 * Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { GroupName: 0, UserPoolId: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
})) as any;

export type DeleteIdentityProviderError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnsupportedIdentityProviderException
  | CommonErrors;
/**
 * Deletes a user pool identity provider (IdP). After you delete an IdP, users can no
 * longer sign in to your user pool through that IdP. For more information about user pool
 * IdPs, see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteIdentityProvider: API.OperationMethod<
  DeleteIdentityProviderRequest,
  DeleteIdentityProviderResponse,
  DeleteIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, ProviderName: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnsupportedIdentityProviderException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityProvider",
})) as any;

export type DeleteManagedLoginBrandingError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a managed login branding style. When you delete a style, you delete the
 * branding association for an app client. When an app client doesn't have a style
 * assigned, your managed login pages for that app client are nonfunctional until you
 * create a new style or switch the domain branding version.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteManagedLoginBranding: API.OperationMethod<
  DeleteManagedLoginBrandingRequest,
  DeleteManagedLoginBrandingResponse,
  DeleteManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ManagedLoginBrandingId: 0, UserPoolId: 0 },
  },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteManagedLoginBranding",
})) as any;

export type DeleteResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a resource server. After you delete a resource server, users can no longer
 * generate access tokens with scopes that are associate with that resource server.
 *
 * Resource servers are associated with custom scopes and machine-to-machine (M2M)
 * authorization. For more information, see Access control with resource servers.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteResourceServer: API.OperationMethod<
  DeleteResourceServerRequest,
  DeleteResourceServerResponse,
  DeleteResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, Identifier: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceServer",
})) as any;

export type DeleteTermsError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the terms documents with the requested ID from your app client.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteTerms: API.OperationMethod<
  DeleteTermsRequest,
  DeleteTermsResponse,
  DeleteTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TermsId: 0, UserPoolId: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTerms",
})) as any;

export type DeleteUserError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes the profile of the currently signed-in user. A deleted user profile can no
 * longer be used to sign in and can't be restored.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccessToken: 0 } },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
})) as any;

export type DeleteUserAttributesError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Deletes attributes from the currently signed-in user. For example, your application
 * can submit a request to this operation when a user wants to remove their
 * `birthdate` attribute value.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const deleteUserAttributes: API.OperationMethod<
  DeleteUserAttributesRequest,
  DeleteUserAttributesResponse,
  DeleteUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserAttributeNames: 0, AccessToken: 0 },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserAttributes",
})) as any;

export type DeleteUserPoolError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserImportInProgressException
  | CommonErrors;
/**
 * Deletes a user pool. After you delete a user pool, users can no longer sign in to any
 * associated applications.
 *
 * When you delete a user pool, it's no longer visible or operational in your Amazon Web Services account. Amazon Cognito retains deleted user pools in an inactive state for 14
 * days, then begins a cleanup process that fully removes them from Amazon Web Services systems. In case
 * of accidental deletion, contact Amazon Web Services Support within 14 days for restoration
 * assistance.
 *
 * Amazon Cognito begins full deletion of all resources from deleted user pools after 14 days. In
 * the case of large user pools, the cleanup process might take significant additional time
 * before all user data is permanently deleted.
 */
export const deleteUserPool: API.OperationMethod<
  DeleteUserPoolRequest,
  DeleteUserPoolResponse,
  DeleteUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserImportInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPool",
})) as any;

export type DeleteUserPoolClientError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a user pool app client. After you delete an app client, users can no longer
 * sign in to the associated application.
 */
export const deleteUserPoolClient: API.OperationMethod<
  DeleteUserPoolClientRequest,
  DeleteUserPoolClientResponse,
  DeleteUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, ClientId: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolClient",
})) as any;

export type DeleteUserPoolClientSecretError =
  | InternalServerException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a specific client secret from a user pool app client. You cannot delete the last remaining secret for an app client.
 */
export const deleteUserPoolClientSecret: API.OperationMethod<
  DeleteUserPoolClientSecretRequest,
  DeleteUserPoolClientSecretResponse,
  DeleteUserPoolClientSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0, ClientSecretId: 0 },
  },
  errors: [
    InternalServerException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolClientSecret",
})) as any;

export type DeleteUserPoolDomainError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Given a user pool ID and domain identifier, deletes a user pool domain. After you
 * delete a user pool domain, your managed login pages and authorization server are no
 * longer available.
 */
export const deleteUserPoolDomain: API.OperationMethod<
  DeleteUserPoolDomainRequest,
  DeleteUserPoolDomainResponse,
  DeleteUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Domain: 0, UserPoolId: 0 } },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolDomain",
})) as any;

export type DeleteUserPoolReplicaError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a secondary replica user pool. You can only delete replicas that are in the
 * INACTIVE status. This operation must be called from the primary Region.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const deleteUserPoolReplica: API.OperationMethod<
  DeleteUserPoolReplicaRequest,
  DeleteUserPoolReplicaResponse,
  DeleteUserPoolReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, RegionName: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserPoolReplica",
})) as any;

export type DeleteWebAuthnCredentialError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a registered passkey, or WebAuthn, authenticator for the currently signed-in
 * user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const deleteWebAuthnCredential: API.OperationMethod<
  DeleteWebAuthnCredentialRequest,
  DeleteWebAuthnCredentialResponse,
  DeleteWebAuthnCredentialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccessToken: 0, CredentialId: 0 } },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebAuthnCredential",
})) as any;

export type DescribeIdentityProviderError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID and identity provider (IdP) name, returns details about the
 * IdP.
 */
export const describeIdentityProvider: API.OperationMethod<
  DescribeIdentityProviderRequest,
  DescribeIdentityProviderResponse,
  DescribeIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ProviderName: 0 },
    output: { IdentityProvider: o_IdentityProviderType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIdentityProvider",
})) as any;

export type DescribeManagedLoginBrandingError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the ID of a managed login branding style, returns detailed information about the
 * style.
 */
export const describeManagedLoginBranding: API.OperationMethod<
  DescribeManagedLoginBrandingRequest,
  DescribeManagedLoginBrandingResponse,
  DescribeManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ManagedLoginBrandingId: 0,
      ReturnMergedResources: 0,
    },
    output: { ManagedLoginBranding: o_ManagedLoginBrandingType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedLoginBranding",
})) as any;

export type DescribeManagedLoginBrandingByClientError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the ID of a user pool app client, returns detailed information about the style
 * assigned to the app client.
 */
export const describeManagedLoginBrandingByClient: API.OperationMethod<
  DescribeManagedLoginBrandingByClientRequest,
  DescribeManagedLoginBrandingByClientResponse,
  DescribeManagedLoginBrandingByClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0, ReturnMergedResources: 0 },
    output: { ManagedLoginBranding: o_ManagedLoginBrandingType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedLoginBrandingByClient",
})) as any;

export type DescribeResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes a resource server. For more information about resource servers, see Access control with resource servers.
 */
export const describeResourceServer: API.OperationMethod<
  DescribeResourceServerRequest,
  DescribeResourceServerResponse,
  DescribeResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, Identifier: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceServer",
})) as any;

export type DescribeRiskConfigurationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Given an app client or user pool ID where threat protection is configured, describes
 * the risk configuration. This operation returns details about adaptive authentication,
 * compromised credentials, and IP-address allow- and denylists. For more information about
 * threat protection, see Threat protection.
 */
export const describeRiskConfiguration: API.OperationMethod<
  DescribeRiskConfigurationRequest,
  DescribeRiskConfigurationResponse,
  DescribeRiskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0 },
    output: { RiskConfiguration: o_RiskConfigurationType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRiskConfiguration",
})) as any;

export type DescribeTermsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details for the requested terms documents ID. For more information, see Terms documents.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeTerms: API.OperationMethod<
  DescribeTermsRequest,
  DescribeTermsResponse,
  DescribeTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { TermsId: 0, UserPoolId: 0 },
    output: { Terms: o_TermsType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTerms",
})) as any;

export type DescribeTermsByClientError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details for the terms documents that are associated with an app client,
 * identified by the app client ID, user pool ID, and terms name. For
 * more information, see Terms documents.
 *
 * To call `DescribeTermsByClient`, you must have the
 * `cognito-idp:DescribeTermsByClient` Identity and Access Management (IAM) permission. This
 * operation additionally validates your permission for
 * `cognito-idp:DescribeTerms`, the action for . As a result, an IAM policy that denies
 * `cognito-idp:DescribeTerms` also denies requests to
 * `DescribeTermsByClient`.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeTermsByClient: API.OperationMethod<
  DescribeTermsByClientRequest,
  DescribeTermsByClientResponse,
  DescribeTermsByClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientId: 0, UserPoolId: 0, TermsName: 0 },
    output: { Terms: o_TermsType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTermsByClient",
})) as any;

export type DescribeUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describes a user import job. For more information about user CSV import, see Importing users from a CSV file.
 */
export const describeUserImportJob: API.OperationMethod<
  DescribeUserImportJobRequest,
  DescribeUserImportJobResponse,
  DescribeUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, JobId: 0 },
    output: { UserImportJob: o_UserImportJobType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserImportJob",
})) as any;

export type DescribeUserPoolError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Given a user pool ID, returns configuration information. This operation is useful when
 * you want to inspect an existing user pool and programmatically replicate the
 * configuration to another user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeUserPool: API.OperationMethod<
  DescribeUserPoolRequest,
  DescribeUserPoolResponse,
  DescribeUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0 },
    output: { UserPool: o_UserPoolType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserPool",
})) as any;

export type DescribeUserPoolClientError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given an app client ID, returns configuration information. This operation is useful
 * when you want to inspect an existing app client and programmatically replicate the
 * configuration to another app client. For more information about app clients, see App clients.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeUserPoolClient: API.OperationMethod<
  DescribeUserPoolClientRequest,
  DescribeUserPoolClientResponse,
  DescribeUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0 },
    output: { UserPoolClient: o_UserPoolClientType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserPoolClient",
})) as any;

export type DescribeUserPoolDomainError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Given a user pool domain name, returns information about the domain
 * configuration.
 *
 * This operation doesn't return results when you query a prefix domain in a
 * secondary Region. Prefix domains are Region-specific and can only be described in
 * the Region where they were created. To describe a prefix domain for a replica user
 * pool, make the request to the primary Region's endpoint.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const describeUserPoolDomain: API.OperationMethod<
  DescribeUserPoolDomainRequest,
  DescribeUserPoolDomainResponse,
  DescribeUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Domain: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserPoolDomain",
})) as any;

export type ForgetDeviceError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a device key, deletes a remembered device as the currently signed-in user. For
 * more information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const forgetDevice: API.OperationMethod<
  ForgetDeviceRequest,
  ForgetDeviceResponse,
  ForgetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccessToken: 0, DeviceKey: 0 } },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ForgetDevice",
})) as any;

export type ForgotPasswordError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Sends a password-reset confirmation code to the email address or phone number of the
 * requested username. The message delivery method is determined by the user's
 * available attributes and the `AccountRecoverySetting` configuration of the
 * user pool.
 *
 * For the `Username` parameter, you can use the username or an email, phone,
 * or preferred username alias.
 *
 * If neither a verified phone number nor a verified email exists, Amazon Cognito responds with an
 * `InvalidParameterException` error . If your app client has a client
 * secret and you don't provide a `SECRET_HASH` parameter, this API returns
 * `NotAuthorizedException`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const forgotPassword: API.OperationMethod<
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ForgotPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientId: 0,
      SecretHash: 0,
      UserContextData: i_UserContextDataType,
      Username: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      ClientMetadata: 0,
    },
  },
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ForgotPassword",
})) as any;

export type GetClientTokenError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Issues an access token for machine-to-machine (M2M) authorization. Your app client
 * provides its client ID and secret, and receives an access token that authorizes requests
 * to your resource servers. `GetClientToken` provides the same functionality as
 * the OAuth2 client-credentials grant; both authorize an application rather than a user.
 *
 * To use this operation, you must configure the app client with a client secret and
 * enable the `ALLOW_CLIENT_TOKEN_AUTH` authentication flow. The
 * `ALLOW_CLIENT_TOKEN_AUTH` flow is mutually exclusive with user authentication
 * flows. It must be the only authentication flow that you configure for the app client. For
 * more information, see Scopes, M2M, and resource servers.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const getClientToken: API.OperationMethod<
  GetClientTokenRequest,
  GetClientTokenResponse,
  GetClientTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ClientId: 0, Secret: 0, Scopes: 0, ClientMetadata: 0 },
    output: { ClientAuthenticationResult: { AccessToken: D.secret } },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClientToken",
})) as any;

export type GetCSVHeaderError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, generates a comma-separated value (CSV) list populated with
 * available user attributes in the user pool. This list is the header for the CSV file
 * that determines the users in a user import job. Save the content of
 * `CSVHeader` in the response as a `.csv` file and populate it
 * with the usernames and attributes of users that you want to import. For more information
 * about CSV user import, see Importing users from a CSV file.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getCSVHeader: API.OperationMethod<
  GetCSVHeaderRequest,
  GetCSVHeaderResponse,
  GetCSVHeaderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCSVHeader",
})) as any;

export type GetDeviceError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a device key, returns information about a remembered device for the current
 * user. For more information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const getDevice: API.OperationMethod<
  GetDeviceRequest,
  GetDeviceResponse,
  GetDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { DeviceKey: 0, AccessToken: 0 },
    output: { Device: o_DeviceType },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevice",
})) as any;

export type GetGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID and a group name, returns information about the user
 * group.
 *
 * For more information about user pool groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { GroupName: 0, UserPoolId: 0 },
    output: { Group: o_GroupType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
})) as any;

export type GetIdentityProviderByIdentifierError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the identifier of an identity provider (IdP), for example
 * `examplecorp`, returns information about the user pool configuration for
 * that IdP. For more information about IdPs, see Third-party IdP sign-in.
 */
export const getIdentityProviderByIdentifier: API.OperationMethod<
  GetIdentityProviderByIdentifierRequest,
  GetIdentityProviderByIdentifierResponse,
  GetIdentityProviderByIdentifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, IdpIdentifier: 0 },
    output: { IdentityProvider: o_IdentityProviderType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityProviderByIdentifier",
})) as any;

export type GetLogDeliveryConfigurationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns the logging configuration. User pools can export
 * message-delivery error and threat-protection activity logs to external Amazon Web Services services. For more information, see Exporting user pool logs.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getLogDeliveryConfiguration: API.OperationMethod<
  GetLogDeliveryConfigurationRequest,
  GetLogDeliveryConfigurationResponse,
  GetLogDeliveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLogDeliveryConfiguration",
})) as any;

export type GetProvisionedLimitError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the current provisioned limit for a specific API category.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getProvisionedLimit: API.OperationMethod<
  GetProvisionedLimitRequest,
  GetProvisionedLimitResponse,
  GetProvisionedLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LimitDefinition: i_LimitDefinitionType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedLimit",
})) as any;

export type GetSigningCertificateError =
  | InternalErrorException
  | InvalidParameterException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Given a user pool ID, returns the signing certificate for SAML 2.0 federation.
 *
 * Issued certificates are valid for 10 years from the date of issue. Amazon Cognito issues and
 * assigns a new signing certificate annually. This renewal process returns a new value in
 * the response to `GetSigningCertificate`, but doesn't invalidate the original
 * certificate.
 *
 * For more information, see Signing SAML requests.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getSigningCertificate: API.OperationMethod<
  GetSigningCertificateRequest,
  GetSigningCertificateResponse,
  GetSigningCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    OperationNotEnabledException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningCertificate",
})) as any;

export type GetTokensFromRefreshTokenError =
  | ForbiddenException
  | InternalErrorException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | RefreshTokenReuseException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given a refresh token, issues new ID, access, and optionally refresh tokens for the
 * user who owns the submitted token. This operation issues a new refresh token and
 * invalidates the original refresh token after an optional grace period when refresh token
 * rotation is enabled. If refresh token rotation is disabled, issues new ID and access
 * tokens only.
 */
export const getTokensFromRefreshToken: API.OperationMethod<
  GetTokensFromRefreshTokenRequest,
  GetTokensFromRefreshTokenResponse,
  GetTokensFromRefreshTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RefreshToken: 0,
      ClientId: 0,
      ClientSecret: 0,
      DeviceKey: 0,
      ClientMetadata: 0,
    },
    output: { AuthenticationResult: o_AuthenticationResultType },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    RefreshTokenReuseException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTokensFromRefreshToken",
})) as any;

export type GetUICustomizationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID or app client, returns information about classic hosted UI
 * branding that you applied, if any. Returns user-pool level branding information if no
 * app client branding is applied, or if you don't specify an app client ID. Returns
 * an empty object if you haven't applied hosted UI branding to either the client or
 * the user pool. For more information, see Hosted UI (classic) branding.
 */
export const getUICustomization: API.OperationMethod<
  GetUICustomizationRequest,
  GetUICustomizationResponse,
  GetUICustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0 },
    output: { UICustomization: o_UICustomizationType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUICustomization",
})) as any;

export type GetUserError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Gets user attributes and and MFA settings for the currently signed-in user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0 },
    output: { Username: D.secret, UserAttributes: D.list(o_AttributeType) },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
})) as any;

export type GetUserAttributeVerificationCodeError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Given an attribute name, sends a user attribute verification code for the specified
 * attribute name to the currently signed-in user.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const getUserAttributeVerificationCode: API.OperationMethod<
  GetUserAttributeVerificationCodeRequest,
  GetUserAttributeVerificationCodeResponse,
  GetUserAttributeVerificationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, AttributeName: 0, ClientMetadata: 0 },
  },
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserAttributeVerificationCode",
})) as any;

export type GetUserAuthFactorsError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Lists the authentication options for the currently signed-in user. Returns the
 * following:
 *
 * - The user's multi-factor authentication (MFA) preferences.
 *
 * - The user's options for choice-based authentication with the
 * `USER_AUTH` flow.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const getUserAuthFactors: API.OperationMethod<
  GetUserAuthFactorsRequest,
  GetUserAuthFactorsResponse,
  GetUserAuthFactorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0 },
    output: { Username: D.secret },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserAuthFactors",
})) as any;

export type GetUserPoolMfaConfigError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns configuration for sign-in with WebAuthn authenticators
 * and for multi-factor authentication (MFA). This operation describes the
 * following:
 *
 * - The WebAuthn relying party (RP) ID and user-verification settings.
 *
 * - The required, optional, or disabled state of MFA for all user pool
 * users.
 *
 * - The message templates for email and SMS MFA.
 *
 * - The enabled or disabled state of time-based one-time password (TOTP)
 * MFA.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const getUserPoolMfaConfig: API.OperationMethod<
  GetUserPoolMfaConfigRequest,
  GetUserPoolMfaConfigResponse,
  GetUserPoolMfaConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserPoolMfaConfig",
})) as any;

export type GlobalSignOutError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | CommonErrors;
/**
 * Invalidates the identity, access, and refresh tokens that Amazon Cognito issued to a user. Call
 * this operation when your user signs out of your app. This results in the following
 * behavior.
 *
 * - Amazon Cognito no longer accepts *token-authorized* user operations
 * that you authorize with a signed-out user's access tokens. For more information,
 * see Using the Amazon Cognito user pools API and user pool
 * endpoints.
 *
 * Amazon Cognito returns an `Access Token has been revoked` error when your
 * app attempts to authorize a user pools API request with a revoked access token
 * that contains the scope `aws.cognito.signin.user.admin`.
 *
 * - Amazon Cognito no longer accepts a signed-out user's ID token in a GetId request to an identity pool with
 * `ServerSideTokenCheck` enabled for its user pool IdP
 * configuration in CognitoIdentityProvider.
 *
 * - Amazon Cognito no longer accepts a signed-out user's refresh tokens in refresh
 * requests.
 *
 * Other requests might be valid until your user's token expires. This operation
 * doesn't clear the managed login session cookie. To clear the session for
 * a user who signed in with managed login or the classic hosted UI, direct their browser
 * session to the logout endpoint.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const globalSignOut: API.OperationMethod<
  GlobalSignOutRequest,
  GlobalSignOutResponse,
  GlobalSignOutError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccessToken: 0 } },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GlobalSignOut",
})) as any;

export type InitiateAuthError =
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UnsupportedOperationException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Declares an authentication flow and initiates sign-in for a user in the Amazon Cognito user
 * directory. Amazon Cognito might respond with an additional challenge or an
 * `AuthenticationResult` that contains the outcome of a successful
 * authentication. You can't sign in a user with a federated IdP with
 * `InitiateAuth`. For more information, see Authentication.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const initiateAuth: API.OperationMethod<
  InitiateAuthRequest,
  InitiateAuthResponse,
  InitiateAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AuthFlow: 0,
      AuthParameters: 0,
      ClientMetadata: 0,
      ClientId: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      UserContextData: i_UserContextDataType,
      Session: 0,
    },
    output: {
      Session: D.secret,
      AuthenticationResult: o_AuthenticationResultType,
    },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UnsupportedOperationException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitiateAuth",
})) as any;

export type ListDevicesError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Lists the devices that Amazon Cognito has registered to the currently signed-in user. For more
 * information about device authentication, see Working with user devices in your user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const listDevices: API.OperationMethod<
  ListDevicesRequest,
  ListDevicesResponse,
  ListDevicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, Limit: 0, PaginationToken: 0 },
    output: { Devices: D.list(o_DeviceType) },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
})) as any;

export type ListGroupsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns user pool groups and their details.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, Limit: 0, NextToken: 0 },
    output: { Groups: D.list(o_GroupType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListIdentityProvidersError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns information about configured identity providers (IdPs).
 * For more information about IdPs, see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listIdentityProviders: API.PaginatedOperationMethod<
  ListIdentityProvidersRequest,
  ListIdentityProvidersResponse,
  ListIdentityProvidersError,
  Credentials | HttpClient.HttpClient,
  ProviderDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, MaxResults: 0, NextToken: 0 },
    output: {
      Providers: D.list({ LastModifiedDate: D.ts, CreationDate: D.ts }),
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityProviders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Providers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceServersError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns all resource servers and their details. For more
 * information about resource servers, see Access control with resource servers.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listResourceServers: API.PaginatedOperationMethod<
  ListResourceServersRequest,
  ListResourceServersResponse,
  ListResourceServersError,
  Credentials | HttpClient.HttpClient,
  ResourceServerType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceServers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceServers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags that are assigned to an Amazon Cognito user pool. For more information, see
 * Tagging
 * resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTermsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about all terms documents for the requested user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listTerms: API.OperationMethod<
  ListTermsRequest,
  ListTermsResponse,
  ListTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, MaxResults: 0, NextToken: 0 },
    output: { Terms: D.list({ CreationDate: D.ts, LastModifiedDate: D.ts }) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTerms",
})) as any;

export type ListUserImportJobsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns user import jobs and their details. Import jobs are
 * retained in user pool configuration so that you can stage, stop, start, review, and
 * delete them. For more information about user import, see Importing users from a CSV file.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserImportJobs: API.OperationMethod<
  ListUserImportJobsRequest,
  ListUserImportJobsResponse,
  ListUserImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, MaxResults: 0, PaginationToken: 0 },
    output: { UserImportJobs: D.list(o_UserImportJobType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserImportJobs",
})) as any;

export type ListUserPoolClientsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, lists app clients. App clients are sets of rules for the access
 * that you want a user pool to grant to one application. For more information, see App clients.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserPoolClients: API.PaginatedOperationMethod<
  ListUserPoolClientsRequest,
  ListUserPoolClientsResponse,
  ListUserPoolClientsError,
  Credentials | HttpClient.HttpClient,
  UserPoolClientDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, MaxResults: 0, NextToken: 0 },
    output: { UserPoolClients: D.list({ ClientId: D.secret }) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPoolClients",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserPoolClients",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUserPoolClientSecretsError =
  | InternalServerException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all client secrets associated with a user pool app client. Returns metadata about the secrets. The response does not include pagination tokens as there are only 2 secrets at any given time and we return both with every ListUserPoolClientSecrets call. For security reasons, the response never reveals the actual secret value in ClientSecretValue.
 */
export const listUserPoolClientSecrets: API.OperationMethod<
  ListUserPoolClientSecretsRequest,
  ListUserPoolClientSecretsResponse,
  ListUserPoolClientSecretsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0, NextToken: 0 },
    output: { ClientSecrets: D.list(o_ClientSecretDescriptorType) },
  },
  errors: [
    InternalServerException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPoolClientSecrets",
})) as any;

export type ListUserPoolReplicasError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all replicas for a user pool, including both primary and secondary replicas. We
 * recommend using pagination to ensure that the operation returns quickly and
 * successfully.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserPoolReplicas: API.OperationMethod<
  ListUserPoolReplicasRequest,
  ListUserPoolReplicasResponse,
  ListUserPoolReplicasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { UserPoolId: 0, NextToken: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPoolReplicas",
})) as any;

export type ListUserPoolsError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists user pools and their details in the current Amazon Web Services account.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUserPools: API.PaginatedOperationMethod<
  ListUserPoolsRequest,
  ListUserPoolsResponse,
  ListUserPoolsError,
  Credentials | HttpClient.HttpClient,
  UserPoolDescriptionType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: {
      UserPools: D.list({ LastModifiedDate: D.ts, CreationDate: D.ts }),
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "UserPools",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsersError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID, returns a list of users and their basic details in a user
 * pool.
 *
 * This operation is eventually consistent. You might experience a delay before results
 * are up-to-date. To validate the existence or configuration of an individual user, use
 * `AdminGetUser`.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  UserType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      AttributesToGet: 0,
      Limit: 0,
      PaginationToken: 0,
      Filter: 0,
    },
    output: { Users: D.list(o_UserType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "PaginationToken",
    outputToken: "PaginationToken",
    items: "Users",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListUsersInGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool ID and a group name, returns a list of users in the group. For more
 * information about user pool groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const listUsersInGroup: API.PaginatedOperationMethod<
  ListUsersInGroupRequest,
  ListUsersInGroupResponse,
  ListUsersInGroupError,
  Credentials | HttpClient.HttpClient,
  UserType
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, GroupName: 0, Limit: 0, NextToken: 0 },
    output: { Users: D.list(o_UserType) },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsersInGroup",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListWebAuthnCredentialsError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Generates a list of the currently signed-in user's registered passkey, or
 * WebAuthn, credentials.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const listWebAuthnCredentials: API.OperationMethod<
  ListWebAuthnCredentialsRequest,
  ListWebAuthnCredentialsResponse,
  ListWebAuthnCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, NextToken: 0, MaxResults: 0 },
    output: { Credentials: D.list({ CreatedAt: D.ts }) },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebAuthnCredentials",
})) as any;

export type ResendConfirmationCodeError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotFoundException
  | CommonErrors;
/**
 * Resends the code that confirms a new account for a user who has signed up in your user
 * pool. Amazon Cognito sends confirmation codes to the user attribute in the
 * `AutoVerifiedAttributes` property of your user pool. When you prompt new
 * users for the confirmation code, include a "Resend code" option that generates a call to
 * this API operation.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const resendConfirmationCode: API.OperationMethod<
  ResendConfirmationCodeRequest,
  ResendConfirmationCodeResponse,
  ResendConfirmationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientId: 0,
      SecretHash: 0,
      UserContextData: i_UserContextDataType,
      Username: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      ClientMetadata: 0,
    },
  },
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResendConfirmationCode",
})) as any;

export type RespondToAuthChallengeError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | InvalidUserPoolConfigurationException
  | MFAMethodNotFoundException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordHistoryPolicyViolationException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Some API operations in a user pool generate a challenge, like a prompt for an MFA
 * code, for device authentication that bypasses MFA, or for a custom authentication
 * challenge. A `RespondToAuthChallenge` API request provides the answer to that
 * challenge, like a code or a secure remote password (SRP). The parameters of a response
 * to an authentication challenge vary with the type of challenge.
 *
 * For more information about custom authentication challenges, see Custom
 * authentication challenge Lambda triggers.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const respondToAuthChallenge: API.OperationMethod<
  RespondToAuthChallengeRequest,
  RespondToAuthChallengeResponse,
  RespondToAuthChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientId: 0,
      ChallengeName: 0,
      Session: 0,
      ChallengeResponses: 0,
      AnalyticsMetadata: i_AnalyticsMetadataType,
      UserContextData: i_UserContextDataType,
      ClientMetadata: 0,
    },
    output: {
      Session: D.secret,
      AuthenticationResult: o_AuthenticationResultType,
    },
  },
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    InvalidUserPoolConfigurationException,
    MFAMethodNotFoundException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordHistoryPolicyViolationException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RespondToAuthChallenge",
})) as any;

export type RevokeTokenError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | OperationNotEnabledException
  | TooManyRequestsException
  | UnauthorizedException
  | UnsupportedOperationException
  | UnsupportedTokenTypeException
  | CommonErrors;
/**
 * Revokes all of the access tokens generated by, and at the same time as, the specified
 * refresh token. After a token is revoked, you can't use the revoked token to access Amazon Cognito
 * user APIs, or to authorize access to your resource server.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const revokeToken: API.OperationMethod<
  RevokeTokenRequest,
  RevokeTokenResponse,
  RevokeTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Token: 0, ClientId: 0, ClientSecret: 0 },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    OperationNotEnabledException,
    TooManyRequestsException,
    UnauthorizedException,
    UnsupportedOperationException,
    UnsupportedTokenTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeToken",
})) as any;

export type SetLogDeliveryConfigurationError =
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets up or modifies the logging configuration of a user pool. User pools can export
 * user notification logs and, when threat protection is active, user-activity logs. For
 * more information, see Exporting user
 * pool logs.
 */
export const setLogDeliveryConfiguration: API.OperationMethod<
  SetLogDeliveryConfigurationRequest,
  SetLogDeliveryConfigurationResponse,
  SetLogDeliveryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      LogConfigurations: D.list({
        LogLevel: 0,
        EventSource: 0,
        CloudWatchLogsConfiguration: { LogGroupArn: 0 },
        S3Configuration: { BucketArn: 0 },
        FirehoseConfiguration: { StreamArn: 0 },
      }),
    },
  },
  errors: [
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLogDeliveryConfiguration",
})) as any;

export type SetRiskConfigurationError =
  | CodeDeliveryFailureException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Configures threat protection for a user pool or app client. Sets configuration for the
 * following.
 *
 * - Responses to risks with adaptive authentication
 *
 * - Responses to vulnerable passwords with compromised-credentials
 * detection
 *
 * - Notifications to users who have had risky activity detected
 *
 * - IP-address denylist and allowlist
 *
 * To set the risk configuration for the user pool to defaults, send this request with
 * only the `UserPoolId` parameter. To reset the threat protection settings of
 * an app client to be inherited from the user pool, send `UserPoolId` and
 * `ClientId` parameters only. To change threat protection to audit-only or
 * off, update the value of `UserPoolAddOns` in an `UpdateUserPool`
 * request. To activate this setting, your user pool must be on the
 * Plus tier.
 *
 * In secondary regions for user pools with multi-region replication, only the
 * `SourceARN` and `From` attributes of
 * `NotifyConfiguration` can be modified to configure region-specific SES
 * integration. All other risk configuration settings must match the existing values to
 * maintain consistency across replicas.
 */
export const setRiskConfiguration: API.OperationMethod<
  SetRiskConfigurationRequest,
  SetRiskConfigurationResponse,
  SetRiskConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ClientId: 0,
      CompromisedCredentialsRiskConfiguration: {
        EventFilter: 0,
        Actions: { EventAction: 0 },
      },
      AccountTakeoverRiskConfiguration: {
        NotifyConfiguration: {
          From: 0,
          ReplyTo: 0,
          SourceArn: 0,
          BlockEmail: i_NotifyEmailType,
          NoActionEmail: i_NotifyEmailType,
          MfaEmail: i_NotifyEmailType,
        },
        Actions: {
          LowAction: i_AccountTakeoverActionType,
          MediumAction: i_AccountTakeoverActionType,
          HighAction: i_AccountTakeoverActionType,
        },
      },
      RiskExceptionConfiguration: {
        BlockedIPRangeList: 0,
        SkippedIPRangeList: 0,
      },
    },
    output: { RiskConfiguration: o_RiskConfigurationType },
  },
  errors: [
    CodeDeliveryFailureException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRiskConfiguration",
})) as any;

export type SetUICustomizationError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Configures UI branding settings for domains with the hosted UI (classic) branding
 * version. Your user pool must have a domain. Configure a domain with .
 *
 * Set the default configuration for all clients with a `ClientId` of
 * `ALL`. When the `ClientId` value is an app client ID, the
 * settings you pass in this request apply to that app client and override the default
 * `ALL` configuration.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const setUICustomization: API.OperationMethod<
  SetUICustomizationRequest,
  SetUICustomizationResponse,
  SetUICustomizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, ClientId: 0, CSS: 0, ImageFile: 0 },
    output: { UICustomization: o_UICustomizationType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUICustomization",
})) as any;

export type SetUserMFAPreferenceError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Set the user's multi-factor authentication (MFA) method preference, including which
 * MFA factors are activated and if any are preferred. Only one factor can be set as
 * preferred. The preferred MFA factor will be used to authenticate a user if multiple
 * factors are activated. If multiple options are activated and no preference is set, a
 * challenge to choose an MFA option will be returned during sign-in. If an MFA type is
 * activated for a user, the user will be prompted for MFA during all sign-in attempts
 * unless device tracking is turned on and the device has been trusted. If you want MFA to
 * be applied selectively based on the assessed risk level of sign-in attempts, deactivate
 * MFA for users and turn on Adaptive Authentication for the user pool.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const setUserMFAPreference: API.OperationMethod<
  SetUserMFAPreferenceRequest,
  SetUserMFAPreferenceResponse,
  SetUserMFAPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      SMSMfaSettings: i_SMSMfaSettingsType,
      SoftwareTokenMfaSettings: i_SoftwareTokenMfaSettingsType,
      EmailMfaSettings: i_EmailMfaSettingsType,
      WebAuthnMfaSettings: i_WebAuthnMfaSettingsType,
      AccessToken: 0,
    },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUserMFAPreference",
})) as any;

export type SetUserPoolMfaConfigError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets user pool multi-factor authentication (MFA) and passkey configuration. For more
 * information about user pool MFA, see Adding MFA. For more information about WebAuthn passkeys see Authentication flows.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const setUserPoolMfaConfig: API.OperationMethod<
  SetUserPoolMfaConfigRequest,
  SetUserPoolMfaConfigResponse,
  SetUserPoolMfaConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      SmsMfaConfiguration: {
        SmsAuthenticationMessage: 0,
        SmsConfiguration: i_SmsConfigurationType,
      },
      SoftwareTokenMfaConfiguration: { Enabled: 0 },
      EmailMfaConfiguration: { Message: 0, Subject: 0 },
      MfaConfiguration: 0,
      WebAuthnConfiguration: {
        RelyingPartyId: 0,
        UserVerification: 0,
        FactorConfiguration: 0,
      },
    },
  },
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUserPoolMfaConfig",
})) as any;

export type SetUserSettingsError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * *This action is no longer supported.* You can use it to configure
 * only SMS MFA. You can't use it to configure time-based one-time password (TOTP) software
 * token or email MFA.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const setUserSettings: API.OperationMethod<
  SetUserSettingsRequest,
  SetUserSettingsResponse,
  SetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, MFAOptions: D.list(i_MFAOptionType) },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetUserSettings",
})) as any;

export type SignUpError =
  | CodeDeliveryFailureException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidPasswordException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UsernameExistsException
  | CommonErrors;
/**
 * Registers a user with an app client and requests a user name, password, and user
 * attributes in the user pool.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * You might receive a `LimitExceeded` exception in response to this request
 * if you have exceeded a rate quota for email or SMS messages, and if your user pool
 * automatically verifies email addresses or phone numbers. When you get this exception in
 * the response, the user is successfully created and is in an `UNCONFIRMED`
 * state.
 */
export const signUp: API.OperationMethod<
  SignUpRequest,
  SignUpResponse,
  SignUpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ClientId: 0,
      SecretHash: 0,
      Username: 0,
      Password: 0,
      UserAttributes: D.list(i_AttributeType),
      ValidationData: D.list(i_AttributeType),
      AnalyticsMetadata: i_AnalyticsMetadataType,
      UserContextData: i_UserContextDataType,
      ClientMetadata: 0,
    },
    output: { Session: D.secret },
  },
  errors: [
    CodeDeliveryFailureException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidPasswordException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UsernameExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignUp",
})) as any;

export type StartUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Instructs your user pool to start importing users from a CSV file that contains their
 * usernames and attributes. For more information about importing users from a CSV file,
 * see Importing users from a CSV file.
 */
export const startUserImportJob: API.OperationMethod<
  StartUserImportJobRequest,
  StartUserImportJobResponse,
  StartUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, JobId: 0 },
    output: { UserImportJob: o_UserImportJobType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartUserImportJob",
})) as any;

export type StartWebAuthnRegistrationError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | TooManyRequestsException
  | WebAuthnConfigurationMissingException
  | WebAuthnNotEnabledException
  | CommonErrors;
/**
 * Requests credential creation options from your user pool for the currently signed-in
 * user. Returns information about the user pool, the user profile, and authentication
 * requirements. Users must provide this information in their request to enroll your
 * application with their passkey provider.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 */
export const startWebAuthnRegistration: API.OperationMethod<
  StartWebAuthnRegistrationRequest,
  StartWebAuthnRegistrationResponse,
  StartWebAuthnRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AccessToken: 0 } },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    TooManyRequestsException,
    WebAuthnConfigurationMissingException,
    WebAuthnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWebAuthnRegistration",
})) as any;

export type StopUserImportJobError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PreconditionNotMetException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Instructs your user pool to stop a running job that's importing users from a CSV
 * file that contains their usernames and attributes. For more information about importing
 * users from a CSV file, see Importing users from a CSV file.
 */
export const stopUserImportJob: API.OperationMethod<
  StopUserImportJobRequest,
  StopUserImportJobResponse,
  StopUserImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, JobId: 0 },
    output: { UserImportJob: o_UserImportJobType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PreconditionNotMetException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopUserImportJob",
})) as any;

export type TagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Assigns a set of tags to an Amazon Cognito user pool. A tag is a label that you can use to
 * categorize and manage user pools in different ways, such as by purpose, owner,
 * environment, or other criteria.
 *
 * Each tag consists of a key and value, both of which you define. A key is a general
 * category for more specific values. For example, if you have two versions of a user pool,
 * one for testing and another for production, you might assign an `Environment`
 * tag key to both user pools. The value of this key might be `Test` for one
 * user pool, and `Production` for the other.
 *
 * Tags are useful for cost tracking and access control. You can activate your tags so
 * that they appear on the Billing and Cost Management console, where you can track the
 * costs associated with your user pools. In an Identity and Access Management policy, you can constrain
 * permissions for user pools based on specific tags or tag values.
 *
 * You can use this action up to 5 times per second, per account. A user pool can have as
 * many as 50 tags.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given tag IDs that you previously assigned to a user pool, removes them.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAuthEventFeedbackError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotFoundException
  | UserPoolAddOnNotEnabledException
  | CommonErrors;
/**
 * Provides the feedback for an authentication event generated by threat protection
 * features. The user's response indicates that you think that the event either was from a
 * valid user or was an unwanted authentication attempt. This feedback improves the risk
 * evaluation decision for the user pool as part of Amazon Cognito threat protection.
 * To activate this setting, your user pool must be on the
 * Plus tier.
 *
 * This operation requires a `FeedbackToken` that Amazon Cognito generates and adds to
 * notification emails when users have potentially suspicious authentication events. Users
 * invoke this operation when they select the link that corresponds to
 * `{one-click-link-valid}` or `{one-click-link-invalid}` in your
 * notification template. Because `FeedbackToken` is a required parameter, you
 * can't make requests to `UpdateAuthEventFeedback` without the contents of
 * the notification email message.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const updateAuthEventFeedback: API.OperationMethod<
  UpdateAuthEventFeedbackRequest,
  UpdateAuthEventFeedbackResponse,
  UpdateAuthEventFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      Username: 0,
      EventId: 0,
      FeedbackToken: 0,
      FeedbackValue: 0,
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotFoundException,
    UserPoolAddOnNotEnabledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthEventFeedback",
})) as any;

export type UpdateDeviceStatusError =
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the status of a the currently signed-in user's device so that it is
 * marked as remembered or not remembered for the purpose of device authentication. Device
 * authentication is a "remember me" mechanism that silently completes sign-in from trusted
 * devices with a device key instead of a user-provided MFA code. This operation changes
 * the status of a device without deleting it, so you can enable it again later. For more
 * information about device authentication, see Working with devices.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const updateDeviceStatus: API.OperationMethod<
  UpdateDeviceStatusRequest,
  UpdateDeviceStatusResponse,
  UpdateDeviceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, DeviceKey: 0, DeviceRememberedStatus: 0 },
  },
  errors: [
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeviceStatus",
})) as any;

export type UpdateGroupError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given the name of a user pool group, updates any of the properties for precedence,
 * IAM role, or description. For more information about user pool groups, see Adding groups to a user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResponse,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      GroupName: 0,
      UserPoolId: 0,
      Description: 0,
      RoleArn: 0,
      Precedence: 0,
    },
    output: { Group: o_GroupType },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
})) as any;

export type UpdateIdentityProviderError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnsupportedIdentityProviderException
  | CommonErrors;
/**
 * Modifies the configuration and trust relationship between a third-party identity
 * provider (IdP) and a user pool. Amazon Cognito accepts sign-in with third-party identity
 * providers through managed login and OIDC relying-party libraries. For more information,
 * see Third-party IdP sign-in.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateIdentityProvider: API.OperationMethod<
  UpdateIdentityProviderRequest,
  UpdateIdentityProviderResponse,
  UpdateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ProviderName: 0,
      ProviderDetails: 0,
      AttributeMapping: 0,
      IdpIdentifiers: 0,
    },
    output: { IdentityProvider: o_IdentityProviderType },
  },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnsupportedIdentityProviderException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityProvider",
})) as any;

export type UpdateManagedLoginBrandingError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Configures the branding settings for a user pool style. This operation is the
 * programmatic option for the configuration of a style in the branding editor.
 *
 * Provides values for UI customization in a `Settings` JSON object and image
 * files in an `Assets` array.
 *
 * This operation has a 2-megabyte request-size limit and include the CSS settings and
 * image assets for your app client. Your branding settings might exceed 2MB in size. Amazon Cognito
 * doesn't require that you pass all parameters in one request and preserves existing
 * style settings that you don't specify. If your request is larger than 2MB, separate it
 * into multiple requests, each with a size smaller than the limit.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateManagedLoginBranding: API.OperationMethod<
  UpdateManagedLoginBrandingRequest,
  UpdateManagedLoginBrandingResponse,
  UpdateManagedLoginBrandingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ManagedLoginBrandingId: 0,
      UseCognitoProvidedValues: 0,
      Settings: 0,
      Assets: D.list(i_AssetType),
    },
    output: { ManagedLoginBranding: o_ManagedLoginBrandingType },
  },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedLoginBranding",
})) as any;

export type UpdateProvisionedLimitError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the provisioned limit for a specific API category. The value must be between the
 * default limit and your account-level maximum limit in Service Quotas.
 *
 * Managed login user pools don't support adjustments to the
 * `UserAuthentication` or `UserFederation` categories. To
 * increase these limits, submit a Service Quotas increase request.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateProvisionedLimit: API.OperationMethod<
  UpdateProvisionedLimitRequest,
  UpdateProvisionedLimitResponse,
  UpdateProvisionedLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LimitDefinition: i_LimitDefinitionType, RequestedLimitValue: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedLimit",
})) as any;

export type UpdateResourceServerError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the name and scopes of a resource server. All other fields are read-only. For
 * more information about resource servers, see Access control with resource servers.
 *
 * If you don't provide a value for an attribute, it is set to the default
 * value.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateResourceServer: API.OperationMethod<
  UpdateResourceServerRequest,
  UpdateResourceServerResponse,
  UpdateResourceServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      Identifier: 0,
      Name: 0,
      Scopes: D.list(i_ResourceServerScopeType),
    },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceServer",
})) as any;

export type UpdateTermsError =
  | ConcurrentModificationException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TermsExistsException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modifies existing terms documents for the requested app client. When Terms and
 * conditions and Privacy policy documents are configured, the app client displays links to
 * them in the sign-up page of managed login for the app client.
 *
 * You can provide URLs for terms documents in the languages that are supported by managed login localization. Amazon Cognito directs users to the terms documents for
 * their current language, with fallback to `default` if no document exists for
 * the language.
 *
 * Each request accepts one type of terms document and a map of language-to-link for that
 * document type. You must provide both types of terms documents in at least one language
 * before Amazon Cognito displays your terms documents. Supply each type in separate
 * requests.
 *
 * For more information, see Terms documents.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateTerms: API.OperationMethod<
  UpdateTermsRequest,
  UpdateTermsResponse,
  UpdateTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TermsId: 0,
      UserPoolId: 0,
      TermsName: 0,
      TermsSource: 0,
      Enforcement: 0,
      Links: 0,
    },
    output: { Terms: o_TermsType },
  },
  errors: [
    ConcurrentModificationException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TermsExistsException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTerms",
})) as any;

export type UpdateUserAttributesError =
  | AliasExistsException
  | CodeDeliveryFailureException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidLambdaResponseException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnexpectedLambdaException
  | UserLambdaValidationException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Updates the currently signed-in user's attributes. To delete an attribute from
 * the user, submit the attribute in your API request with a blank value.
 *
 * For custom attributes, you must add a `custom:` prefix to the attribute
 * name, for example `custom:department`.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 */
export const updateUserAttributes: API.OperationMethod<
  UpdateUserAttributesRequest,
  UpdateUserAttributesResponse,
  UpdateUserAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserAttributes: D.list(i_AttributeType),
      AccessToken: 0,
      ClientMetadata: 0,
    },
  },
  errors: [
    AliasExistsException,
    CodeDeliveryFailureException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidLambdaResponseException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnexpectedLambdaException,
    UserLambdaValidationException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserAttributes",
})) as any;

export type UpdateUserPoolError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidEmailRoleAccessPolicyException
  | InvalidParameterException
  | InvalidSmsRoleAccessPolicyException
  | InvalidSmsRoleTrustRelationshipException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TierChangeNotAllowedException
  | TooManyRequestsException
  | UserImportInProgressException
  | UserPoolTaggingException
  | CommonErrors;
/**
 * Updates the configuration of a user pool. To avoid setting parameters to Amazon Cognito
 * defaults, construct this API request to pass the existing configuration of your user
 * pool, modified to include the changes that you want to make.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * In secondary regions for user pools with multi-region replication, regional
 * configurations for email, SMS, Lambda functions, and tags can be updated. Both global
 * and regional settings must be provided as inputs, with global settings required to match
 * existing values to maintain consistency across replicas.
 *
 * This action might generate an SMS text message. Starting June 1, 2021, US telecom carriers
 * require you to register an origination phone number before you can send SMS messages
 * to US phone numbers. If you use SMS text messages in Amazon Cognito, you must register a
 * phone number with Amazon Pinpoint.
 * Amazon Cognito uses the registered number automatically. Otherwise, Amazon Cognito users who must
 * receive SMS messages might not be able to sign up, activate their accounts, or sign
 * in.
 *
 * If you have never used SMS text messages with Amazon Cognito or any other Amazon Web Services service,
 * Amazon Simple Notification Service might place your account in the SMS sandbox. In
 * sandbox
 * mode
 * , you can send messages only to verified phone
 * numbers. After you test your app while in the sandbox environment, you can move out
 * of the sandbox and into production. For more information, see SMS message settings for Amazon Cognito user pools in the Amazon Cognito
 * Developer Guide.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPool: API.OperationMethod<
  UpdateUserPoolRequest,
  UpdateUserPoolResponse,
  UpdateUserPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      Policies: i_UserPoolPolicyType,
      DeletionProtection: 0,
      LambdaConfig: i_LambdaConfigType,
      AutoVerifiedAttributes: 0,
      SmsVerificationMessage: 0,
      EmailVerificationMessage: 0,
      EmailVerificationSubject: 0,
      VerificationMessageTemplate: i_VerificationMessageTemplateType,
      SmsAuthenticationMessage: 0,
      UserAttributeUpdateSettings: i_UserAttributeUpdateSettingsType,
      MfaConfiguration: 0,
      DeviceConfiguration: i_DeviceConfigurationType,
      EmailConfiguration: i_EmailConfigurationType,
      SmsConfiguration: i_SmsConfigurationType,
      UserPoolTags: 0,
      AdminCreateUserConfig: i_AdminCreateUserConfigType,
      UserPoolAddOns: i_UserPoolAddOnsType,
      AccountRecoverySetting: i_AccountRecoverySettingType,
      PoolName: 0,
      UserPoolTier: 0,
      KeyConfiguration: i_KeyConfigurationType,
      IssuerConfiguration: i_IssuerConfigurationType,
    },
  },
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidEmailRoleAccessPolicyException,
    InvalidParameterException,
    InvalidSmsRoleAccessPolicyException,
    InvalidSmsRoleTrustRelationshipException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TierChangeNotAllowedException,
    TooManyRequestsException,
    UserImportInProgressException,
    UserPoolTaggingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPool",
})) as any;

export type UpdateUserPoolClientError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidOAuthFlowException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | ScopeDoesNotExistException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Given a user pool app client ID, updates the configuration. To avoid setting
 * parameters to Amazon Cognito defaults, construct this API request to pass the existing
 * configuration of your app client, modified to include the changes that you want to
 * make.
 *
 * If you don't provide a value for an attribute, Amazon Cognito sets it to its default value.
 *
 * Unlike app clients created in the console, Amazon Cognito doesn't automatically assign a
 * branding style to app clients that you configure with this API operation. Managed login and classic hosted UI pages aren't
 * available for your client until after you apply a branding style.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPoolClient: API.OperationMethod<
  UpdateUserPoolClientRequest,
  UpdateUserPoolClientResponse,
  UpdateUserPoolClientError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UserPoolId: 0,
      ClientId: 0,
      ClientName: 0,
      RefreshTokenValidity: 0,
      AccessTokenValidity: 0,
      IdTokenValidity: 0,
      TokenValidityUnits: i_TokenValidityUnitsType,
      ReadAttributes: 0,
      WriteAttributes: 0,
      ExplicitAuthFlows: 0,
      SupportedIdentityProviders: 0,
      CallbackURLs: 0,
      LogoutURLs: 0,
      DefaultRedirectURI: 0,
      AllowedOAuthFlows: 0,
      AllowedOAuthScopes: 0,
      AllowedOAuthFlowsUserPoolClient: 0,
      AnalyticsConfiguration: i_AnalyticsConfigurationType,
      PreventUserExistenceErrors: 0,
      EnableTokenRevocation: 0,
      EnablePropagateAdditionalUserContextData: 0,
      AuthSessionValidity: 0,
      RefreshTokenRotation: i_RefreshTokenRotationType,
    },
    output: { UserPoolClient: o_UserPoolClientType },
  },
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidOAuthFlowException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    ScopeDoesNotExistException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPoolClient",
})) as any;

export type UpdateUserPoolDomainError =
  | ConcurrentModificationException
  | FeatureUnavailableInTierException
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * A user pool domain hosts managed login, an authorization server and web server for
 * authentication in your application. This operation updates the branding version for user
 * pool domains between `1` for hosted UI (classic) and `2` for
 * managed login. It also updates the SSL certificate for user pool custom domains.
 *
 * Changes to the domain branding version take up to one minute to take effect for a
 * prefix domain and up to five minutes for a custom domain.
 *
 * This operation doesn't change the name of your user pool domain. To change your
 * domain, delete it with `DeleteUserPoolDomain` and create a new domain with
 * `CreateUserPoolDomain`.
 *
 * You can pass the ARN of a new Certificate Manager certificate in this request. Typically, ACM
 * certificates automatically renew and you user pool can continue to use the same ARN. But
 * if you generate a new certificate for your custom domain name, replace the original
 * configuration with the new ARN in this request.
 *
 * ACM certificates for custom domains must be in the US East (N. Virginia)
 * Amazon Web Services Region. After you submit your request, Amazon Cognito requires up to 1 hour to distribute
 * your new certificate to your custom domain.
 *
 * For more information about adding a custom domain to your user pool, see Configuring a user pool domain.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPoolDomain: API.OperationMethod<
  UpdateUserPoolDomainRequest,
  UpdateUserPoolDomainResponse,
  UpdateUserPoolDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Domain: 0,
      UserPoolId: 0,
      ManagedLoginVersion: 0,
      CustomDomainConfig: i_CustomDomainConfigType,
      Routing: i_RoutingType,
    },
  },
  errors: [
    ConcurrentModificationException,
    FeatureUnavailableInTierException,
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPoolDomain",
})) as any;

export type UpdateUserPoolReplicaError =
  | InternalErrorException
  | InvalidParameterException
  | NotAuthorizedException
  | OperationNotEnabledException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates replica-specific settings for a user pool replica. You can modify the status
 * to activate or deactivate the replica. This request can be made in both primary and secondary
 * regions of the user pool.
 *
 * Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you must use IAM credentials to authorize requests, and you must
 * grant yourself the corresponding IAM permission in a policy.
 *
 * **Learn more**
 *
 * - Signing Amazon Web Services API Requests
 *
 * - Using the Amazon Cognito user pools API and user pool endpoints
 */
export const updateUserPoolReplica: API.OperationMethod<
  UpdateUserPoolReplicaRequest,
  UpdateUserPoolReplicaResponse,
  UpdateUserPoolReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UserPoolId: 0, RegionName: 0, Status: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidParameterException,
    NotAuthorizedException,
    OperationNotEnabledException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserPoolReplica",
})) as any;

export type VerifySoftwareTokenError =
  | CodeMismatchException
  | EnableSoftwareTokenMFAException
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | InvalidUserPoolConfigurationException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | SoftwareTokenMFANotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Registers the current user's time-based one-time password (TOTP) authenticator
 * with a code generated in their authenticator app from a private key that's supplied
 * by your user pool. Marks the user's software token MFA status as "verified" if
 * successful. The request takes an access token or a session string, but not both.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const verifySoftwareToken: API.OperationMethod<
  VerifySoftwareTokenRequest,
  VerifySoftwareTokenResponse,
  VerifySoftwareTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, Session: 0, UserCode: 0, FriendlyDeviceName: 0 },
    output: { Session: D.secret },
  },
  errors: [
    CodeMismatchException,
    EnableSoftwareTokenMFAException,
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    InvalidUserPoolConfigurationException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    SoftwareTokenMFANotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifySoftwareToken",
})) as any;

export type VerifyUserAttributeError =
  | AliasExistsException
  | CodeMismatchException
  | ExpiredCodeException
  | ForbiddenException
  | InternalErrorException
  | InvalidParameterException
  | LimitExceededException
  | NotAuthorizedException
  | OperationNotEnabledException
  | PasswordResetRequiredException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UserNotConfirmedException
  | UserNotFoundException
  | CommonErrors;
/**
 * Submits a verification code for a signed-in user who has added or changed a value of
 * an auto-verified attribute. When successful, the user's attribute becomes verified
 * and the attribute `email_verified` or `phone_number_verified`
 * becomes `true`.
 *
 * If your user pool requires verification before Amazon Cognito updates the attribute value,
 * this operation updates the affected attribute to its pending value.
 *
 * Authorize this action with a signed-in user's access token. It must include the scope `aws.cognito.signin.user.admin`.
 *
 * Amazon Cognito doesn't evaluate Identity and Access Management (IAM) policies in requests for this API operation. For
 * this operation, you can't use IAM credentials to authorize requests, and you can't
 * grant IAM permissions in policies. For more information about authorization models in
 * Amazon Cognito, see Using the Amazon Cognito user pools API and user pool endpoints.
 */
export const verifyUserAttribute: API.OperationMethod<
  VerifyUserAttributeRequest,
  VerifyUserAttributeResponse,
  VerifyUserAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { AccessToken: 0, AttributeName: 0, Code: 0 },
  },
  errors: [
    AliasExistsException,
    CodeMismatchException,
    ExpiredCodeException,
    ForbiddenException,
    InternalErrorException,
    InvalidParameterException,
    LimitExceededException,
    NotAuthorizedException,
    OperationNotEnabledException,
    PasswordResetRequiredException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UserNotConfirmedException,
    UserNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyUserAttribute",
})) as any;

const i_AccountRecoverySettingType: D.LazyStruct = () => ({
  RecoveryMechanisms: D.list({ Priority: 0, Name: 0 }),
});
const i_AccountTakeoverActionType: D.LazyStruct = () => ({
  Notify: 0,
  EventAction: 0,
});
const i_AdminCreateUserConfigType: D.LazyStruct = () => ({
  AllowAdminCreateUserOnly: 0,
  UnusedAccountValidityDays: 0,
  InviteMessageTemplate: { SMSMessage: 0, EmailMessage: 0, EmailSubject: 0 },
});
const i_AnalyticsConfigurationType: D.LazyStruct = () => ({
  ApplicationId: 0,
  ApplicationArn: 0,
  RoleArn: 0,
  ExternalId: 0,
  UserDataShared: 0,
});
const i_AnalyticsMetadataType: D.LazyStruct = () => ({
  AnalyticsEndpointId: 0,
});
const i_AssetType: D.LazyStruct = () => ({
  Category: 0,
  ColorMode: 0,
  Extension: 0,
  Bytes: 0,
  ResourceId: 0,
});
const i_AttributeType: D.LazyStruct = () => ({ Name: 0, Value: 0 });
const i_ContextDataType: D.LazyStruct = () => ({
  IpAddress: 0,
  ServerName: 0,
  ServerPath: 0,
  HttpHeaders: D.list({ headerName: 0, headerValue: 0 }),
  EncodedData: 0,
});
const i_CustomDomainConfigType: D.LazyStruct = () => ({
  CertificateArn: 0,
  SecurityPolicy: 0,
});
const i_DeviceConfigurationType: D.LazyStruct = () => ({
  ChallengeRequiredOnNewDevice: 0,
  DeviceOnlyRememberedOnUserPrompt: 0,
});
const i_EmailConfigurationType: D.LazyStruct = () => ({
  SourceArn: 0,
  ReplyToEmailAddress: 0,
  EmailSendingAccount: 0,
  From: 0,
  ConfigurationSet: 0,
});
const i_EmailMfaSettingsType: D.LazyStruct = () => ({
  Enabled: 0,
  PreferredMfa: 0,
});
const i_IssuerConfigurationType: D.LazyStruct = () => ({ Type: 0 });
const i_KeyConfigurationType: D.LazyStruct = () => ({
  KeyType: 0,
  KmsKeyArn: 0,
});
const i_LambdaConfigType: D.LazyStruct = () => ({
  PreSignUp: 0,
  CustomMessage: 0,
  PostConfirmation: 0,
  PreAuthentication: 0,
  PostAuthentication: 0,
  DefineAuthChallenge: 0,
  CreateAuthChallenge: 0,
  VerifyAuthChallengeResponse: 0,
  PreTokenGeneration: 0,
  UserMigration: 0,
  PreTokenGenerationConfig: { LambdaVersion: 0, LambdaArn: 0 },
  CustomSMSSender: { LambdaVersion: 0, LambdaArn: 0 },
  CustomEmailSender: { LambdaVersion: 0, LambdaArn: 0 },
  KMSKeyID: 0,
  InboundFederation: { LambdaVersion: 0, LambdaArn: 0 },
});
const i_LimitDefinitionType: D.LazyStruct = () => ({
  LimitClass: 0,
  Attributes: 0,
});
const i_MFAOptionType: D.LazyStruct = () => ({
  DeliveryMedium: 0,
  AttributeName: 0,
});
const i_NotifyEmailType: D.LazyStruct = () => ({
  Subject: 0,
  HtmlBody: 0,
  TextBody: 0,
});
const i_ProviderUserIdentifierType: D.LazyStruct = () => ({
  ProviderName: 0,
  ProviderAttributeName: 0,
  ProviderAttributeValue: 0,
});
const i_RefreshTokenRotationType: D.LazyStruct = () => ({
  Feature: 0,
  RetryGracePeriodSeconds: 0,
});
const i_ResourceServerScopeType: D.LazyStruct = () => ({
  ScopeName: 0,
  ScopeDescription: 0,
});
const i_RoutingType: D.LazyStruct = () => ({
  Failover: { SecondaryRegion: 0, PrimaryRoute53HealthCheckId: 0 },
});
const i_SMSMfaSettingsType: D.LazyStruct = () => ({
  Enabled: 0,
  PreferredMfa: 0,
});
const i_SchemaAttributeType: D.LazyStruct = () => ({
  Name: 0,
  AttributeDataType: 0,
  DeveloperOnlyAttribute: 0,
  Mutable: 0,
  Required: 0,
  NumberAttributeConstraints: { MinValue: 0, MaxValue: 0 },
  StringAttributeConstraints: { MinLength: 0, MaxLength: 0 },
});
const i_SmsConfigurationType: D.LazyStruct = () => ({
  SnsCallerArn: 0,
  ExternalId: 0,
  SnsRegion: 0,
  EumsSms: {
    CallerArn: 0,
    ExternalId: 0,
    OriginationIdentity: 0,
    ConfigurationSetName: 0,
    InEntityId: 0,
    InTemplateId: 0,
    Region: 0,
  },
});
const i_SoftwareTokenMfaSettingsType: D.LazyStruct = () => ({
  Enabled: 0,
  PreferredMfa: 0,
});
const i_TokenValidityUnitsType: D.LazyStruct = () => ({
  AccessToken: 0,
  IdToken: 0,
  RefreshToken: 0,
});
const i_UserAttributeUpdateSettingsType: D.LazyStruct = () => ({
  AttributesRequireVerificationBeforeUpdate: 0,
});
const i_UserContextDataType: D.LazyStruct = () => ({
  IpAddress: 0,
  EncodedData: 0,
});
const i_UserPoolAddOnsType: D.LazyStruct = () => ({
  AdvancedSecurityMode: 0,
  AdvancedSecurityAdditionalFlows: { CustomAuthMode: 0 },
});
const i_UserPoolPolicyType: D.LazyStruct = () => ({
  PasswordPolicy: {
    MinimumLength: 0,
    RequireUppercase: 0,
    RequireLowercase: 0,
    RequireNumbers: 0,
    RequireSymbols: 0,
    PasswordHistorySize: 0,
    TemporaryPasswordValidityDays: 0,
  },
  SignInPolicy: { AllowedFirstAuthFactors: 0 },
});
const i_VerificationMessageTemplateType: D.LazyStruct = () => ({
  SmsMessage: 0,
  EmailMessage: 0,
  EmailSubject: 0,
  EmailMessageByLink: 0,
  EmailSubjectByLink: 0,
  DefaultEmailOption: 0,
});
const i_WebAuthnMfaSettingsType: D.LazyStruct = () => ({ Enabled: 0 });
const o_AttributeType: D.LazyStruct = () => ({ Value: D.secret });
const o_AuthenticationResultType: D.LazyStruct = () => ({
  AccessToken: D.secret,
  RefreshToken: D.secret,
  IdToken: D.secret,
});
const o_ClientSecretDescriptorType: D.LazyStruct = () => ({
  ClientSecretValue: D.secret,
  ClientSecretCreateDate: D.ts,
});
const o_DeviceType: D.LazyStruct = () => ({
  DeviceAttributes: D.list(o_AttributeType),
  DeviceCreateDate: D.ts,
  DeviceLastModifiedDate: D.ts,
  DeviceLastAuthenticatedDate: D.ts,
});
const o_GroupType: D.LazyStruct = () => ({
  LastModifiedDate: D.ts,
  CreationDate: D.ts,
});
const o_IdentityProviderType: D.LazyStruct = () => ({
  LastModifiedDate: D.ts,
  CreationDate: D.ts,
});
const o_ManagedLoginBrandingType: D.LazyStruct = () => ({
  Assets: D.list({ Bytes: D.blob }),
  CreationDate: D.ts,
  LastModifiedDate: D.ts,
});
const o_RiskConfigurationType: D.LazyStruct = () => ({
  ClientId: D.secret,
  LastModifiedDate: D.ts,
});
const o_TermsType: D.LazyStruct = () => ({
  ClientId: D.secret,
  CreationDate: D.ts,
  LastModifiedDate: D.ts,
});
const o_UICustomizationType: D.LazyStruct = () => ({
  ClientId: D.secret,
  LastModifiedDate: D.ts,
  CreationDate: D.ts,
});
const o_UserImportJobType: D.LazyStruct = () => ({
  CreationDate: D.ts,
  StartDate: D.ts,
  CompletionDate: D.ts,
});
const o_UserPoolClientType: D.LazyStruct = () => ({
  ClientId: D.secret,
  ClientSecret: D.secret,
  LastModifiedDate: D.ts,
  CreationDate: D.ts,
});
const o_UserPoolType: D.LazyStruct = () => ({
  LastModifiedDate: D.ts,
  CreationDate: D.ts,
});
const o_UserType: D.LazyStruct = () => ({
  Username: D.secret,
  Attributes: D.list(o_AttributeType),
  UserCreateDate: D.ts,
  UserLastModifiedDate: D.ts,
});
